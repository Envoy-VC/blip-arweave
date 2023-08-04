import ArLocal from 'arlocal';
import { JWKInterface } from 'arweave/node/lib/wallet';
import { LoggerFactory, Warp, WarpFactory, Contract } from 'warp-contracts';
import { BlipState } from '../types';
import { CreateVideoProps } from '../src/lib/video';
import fs from 'fs';
import path from 'path';
import { CommentProps, ReactionProps } from '../src/lib/actions/video';
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
			videos: [],
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
	it('Should Create a Video', async () => {
		blip = warp.contract<BlipState>(contractId).connect(user1Wallet);
		const video: CreateVideoProps = {
			creatorAddress: user1,
			transactionId: 'test',
			title: 'test',
			timestamp: 16347800,
			description: 'test',
			thumbnail: 'test',
			comments: [],
			reactions: [],
		};
		await blip.writeInteraction({
			function: 'createVideo',
			data: video,
		});
		let { cachedValue } = await blip.readState();
		let vid = cachedValue.state.videos.find(
			(v) => v.transactionId === video.transactionId
		);
		expect(vid).toMatchObject(video);
	});
	it('Should Like a Video', async () => {
		blip = warp.contract<BlipState>(contractId).connect(user2Wallet);
		let data: ReactionProps = {
			account: user2,
			transactionId: 'test',
			type: 'like',
		};
		await blip.writeInteraction({
			function: 'addReaction',
			data: data,
		});
		let { cachedValue } = await blip.readState();
		let vote = cachedValue.state.videos
			.find((v) => v.transactionId === data.transactionId)
			.reactions.find((v) => v.account === user2);
		expect(vote.type).toEqual('like');
	});
	it('Should Remove a Reaction', async () => {
		blip = warp.contract<BlipState>(contractId).connect(user2Wallet);
		let data: ReactionProps = {
			account: user2,
			transactionId: 'test',
			type: 'like',
		};
		await blip.writeInteraction({
			function: 'removeReaction',
			data: data,
		});
		let { cachedValue } = await blip.readState();
		let vote = cachedValue.state.videos
			.find((v) => v.transactionId === data.transactionId)
			.reactions.find((v) => v.account === user2);
		expect(vote).toEqual(undefined);
	});
	it('Should Dislike a Video', async () => {
		blip = warp.contract<BlipState>(contractId).connect(user2Wallet);
		let data: ReactionProps = {
			account: user2,
			transactionId: 'test',
			type: 'dislike',
		};
		await blip.writeInteraction({
			function: 'addReaction',
			data: data,
		});
		let { cachedValue } = await blip.readState();
		let vote = cachedValue.state.videos
			.find((v) => v.transactionId === data.transactionId)
			.reactions.find((v) => v.account === user2);
		expect(vote.type).toEqual('dislike');
	});
	it('Should Reject Add Like if already voted', async () => {
		blip = warp.contract<BlipState>(contractId).connect(user2Wallet);
		let data: ReactionProps = {
			account: user2,
			transactionId: 'test',
			type: 'like',
		};
		await expect(
			blip.writeInteraction(
				{
					function: 'addReaction',
					data: data,
				},
				{ strict: true }
			)
		).rejects.toThrowError(
			`Cannot create interaction: Error: Video with txId ${data.transactionId} has already been reacted on by ${user2}`
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
			data: { ...data, transactionId: 'test' },
		});
		let { cachedValue } = await blip.readState();
		let comment = cachedValue.state.videos
			.find((v) => v.transactionId === 'test')
			.comments.find(
				(v) => v.account === user2 && v.timestamp === data.timestamp
			);
		expect(comment).toMatchObject(data);
	});
});
