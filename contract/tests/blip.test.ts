import ArLocal from 'arlocal';
import { JWKInterface } from 'arweave/node/lib/wallet';
import { LoggerFactory, Warp, WarpFactory, Contract } from 'warp-contracts';
import { Creator } from '../types/creator';
import { BlipState } from '../types';
import fs from 'fs';
import path from 'path';
import { FollowCreatorProps } from '../src/lib/actions/creator';
import { VoteProps } from '../src/lib/actions/video';
import { Comment } from '../types/video';

jest.setTimeout(30000);

describe('Testing Blip Contract', () => {
	let ownerWallet: JWKInterface;
	let owner: string;

	let user1Wallet: JWKInterface;
	let user1: string;

	let user2Wallet: JWKInterface;
	let user2: string;

	let initialState: BlipState;

	let arLocal: ArLocal;
	let warp: Warp;
	let blip: Contract<BlipState>;
	let contractSrc: string;
	let contractId: string;

	beforeAll(async () => {
		arLocal = new ArLocal(1820, false);
		await arLocal.start();
		LoggerFactory.INST.logLevel('fatal');

		warp = WarpFactory.forLocal(1820);

		({ jwk: ownerWallet, address: owner } =
			await warp.testing.generateWallet());

		({ jwk: user1Wallet, address: user1 } =
			await warp.testing.generateWallet());

		({ jwk: user2Wallet, address: user2 } =
			await warp.testing.generateWallet());

		initialState = {
			creators: [],
		};

		contractSrc = fs.readFileSync(
			path.join(__dirname, '../dist/contract.js'),
			'utf8'
		);

		({ contractTxId: contractId } = await warp.createContract.deploy({
			wallet: ownerWallet,
			initState: JSON.stringify(initialState),
			src: contractSrc,
		}));
		console.log('Deployed contract: ', contractId);
		blip = warp.contract<BlipState>(contractId).connect(ownerWallet);
	});

	afterAll(async () => {
		await arLocal.stop();
	});

	it('Should Deploy Contract', async () => {
		const contractTx = await warp.arweave.transactions.get(contractId);
		expect(contractTx).not.toBeNull();
	});
	it('Should Set Initial State', async () => {
		let state = await blip.readState();
		expect(state.cachedValue.state).toEqual(initialState);
	});
	it('Should Create an Profile', async () => {
		blip = warp.contract<BlipState>(contractId).connect(user1Wallet);
		const creator: Creator = {
			account: user1,
			videos: [],
			followers: [],
		};
		await blip.writeInteraction({
			function: 'createProfile',
			data: creator,
		});
		let { cachedValue } = await blip.readState();
		let res = cachedValue.state.creators.find(
			(creator) => creator.account === user1
		);
		expect(res).toMatchObject(creator);
	});
	it('Should Reject if Creator already exists', async () => {
		blip = warp.contract<BlipState>(contractId).connect(user1Wallet);
		const creator: Creator = {
			account: user1,
			videos: [],
			followers: [],
		};

		await expect(
			blip.writeInteraction(
				{
					function: 'createProfile',
					data: creator,
				},
				{ strict: true }
			)
		).rejects.toThrowError(
			`Cannot create interaction: Error: Creator with account ${user1} already exists`
		);
	});
	it('Should Create a Video', async () => {
		blip = warp.contract<BlipState>(contractId).connect(user1Wallet);
		const video = {
			txId: 'test',
			title: 'test',
			timestamp: 16347800,
			description: 'test',
			thumbnail: 'test',
			comments: [],
			votes: [],
		};
		await blip.writeInteraction({
			function: 'createVideo',
			data: { ...video, account: user1 },
		});
		let { cachedValue } = await blip.readState();
		let res = cachedValue.state.creators.find(
			(creator) => creator.account === user1
		);
		let vid = res.videos.find((v) => v.txId === video.txId);
		expect(vid).toMatchObject(video);
	});
	it('Should Follow a Creator', async () => {
		blip = warp.contract<BlipState>(contractId).connect(user2Wallet);
		let data: FollowCreatorProps = {
			account: user2,
			creatorAccount: user1,
		};
		await blip.writeInteraction({
			function: 'followCreator',
			data: data,
		});
		let { cachedValue } = await blip.readState();
		let res = cachedValue.state.creators.find(
			(creator) => creator.account === user1
		);
		expect(res.followers.includes(user2)).toEqual(true);
	});
	it('Should UnFollow a Creator', async () => {
		blip = warp.contract<BlipState>(contractId).connect(user2Wallet);
		let data: FollowCreatorProps = {
			account: user2,
			creatorAccount: user1,
		};
		await blip.writeInteraction({
			function: 'unFollowCreator',
			data: data,
		});
		let { cachedValue } = await blip.readState();
		let res = cachedValue.state.creators.find(
			(creator) => creator.account === user1
		);
		expect(res.followers.includes(user2)).toEqual(false);
	});
	it('Should Reject unFollow if not following', async () => {
		blip = warp.contract<BlipState>(contractId).connect(user2Wallet);
		let data: FollowCreatorProps = {
			account: user2,
			creatorAccount: user1,
		};
		await expect(
			blip.writeInteraction(
				{
					function: 'unFollowCreator',
					data: data,
				},
				{ strict: true }
			)
		).rejects.toThrowError(
			`Cannot create interaction: Error: Creator with account ${user2} is already following ${user1}`
		);
	});
	it('Should Upvote a Video', async () => {
		blip = warp.contract<BlipState>(contractId).connect(user2Wallet);
		let data: VoteProps = {
			account: user2,
			creatorAccount: user1,
			txId: 'test',
			type: 'up',
		};
		await blip.writeInteraction({
			function: 'addVote',
			data: data,
		});
		let { cachedValue } = await blip.readState();
		let res = cachedValue.state.creators.find(
			(creator) => creator.account === user1
		);
		let vote = res.videos
			.find((v) => v.txId === data.txId)
			.votes.find((v) => v.account === user2);
		expect(vote.type).toEqual('up');
	});
	it('Should Remove a Vote', async () => {
		blip = warp.contract<BlipState>(contractId).connect(user2Wallet);
		let data: VoteProps = {
			account: user2,
			creatorAccount: user1,
			txId: 'test',
			type: 'up',
		};
		await blip.writeInteraction({
			function: 'removeVote',
			data: data,
		});
		let { cachedValue } = await blip.readState();
		let res = cachedValue.state.creators.find(
			(creator) => creator.account === user1
		);
		let vote = res.videos
			.find((v) => v.txId === data.txId)
			.votes.find((v) => v.account === user2);
		expect(vote).toEqual(undefined);
	});
	it('Should Down Vote a Video', async () => {
		blip = warp.contract<BlipState>(contractId).connect(user2Wallet);
		let data: VoteProps = {
			account: user2,
			creatorAccount: user1,
			txId: 'test',
			type: 'down',
		};
		await blip.writeInteraction({
			function: 'addVote',
			data: data,
		});
		let { cachedValue } = await blip.readState();
		let res = cachedValue.state.creators.find(
			(creator) => creator.account === user1
		);
		let vote = res.videos
			.find((v) => v.txId === data.txId)
			.votes.find((v) => v.account === user2);
		expect(vote.type).toEqual('down');
	});
	it('Should Reject Add Vote if already voted', async () => {
		blip = warp.contract<BlipState>(contractId).connect(user2Wallet);
		let data: VoteProps = {
			account: user2,
			creatorAccount: user1,
			txId: 'test',
			type: 'up',
		};
		await expect(
			blip.writeInteraction(
				{
					function: 'addVote',
					data: data,
				},
				{ strict: true }
			)
		).rejects.toThrowError(
			`Cannot create interaction: Error: Video with txId ${data.txId} has already been voted on by ${user2}`
		);
	});
	it('Should Add Comment', async () => {
		blip = warp.contract<BlipState>(contractId).connect(user2Wallet);
		let data: Comment = {
			account: user2,
			content: 'test comment',
			timestamp: 123,
		};
		await blip.writeInteraction({
			function: 'comment',
			data: { ...data, txId: 'test', creatorAccount: user1 },
		});
		let { cachedValue } = await blip.readState();
		let res = cachedValue.state.creators.find(
			(creator) => creator.account === user1
		);
		let comment = res.videos
			.find((v) => v.txId === 'test')
			.comments.find(
				(v) => v.account === user2 && v.timestamp === data.timestamp
			);
		expect(comment).toMatchObject(data);
	});
});
