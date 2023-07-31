import ArLocal from 'arlocal';
import { JWKInterface } from 'arweave/node/lib/wallet';
import { LoggerFactory, Warp, WarpFactory, Contract } from 'warp-contracts';
import { Creator } from '../types/creator';
import { BlipState } from '../types';
import fs from 'fs';
import path from 'path';

jest.setTimeout(30000);

describe('Testing Rhapsody Contract', () => {
	let ownerWallet: JWKInterface;
	let owner: string;

	let user1Wallet: JWKInterface;
	let user1: string;

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
	it('Should Reject if Artist already exists', async () => {
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
	/*
	it('Should Update a Profile', async () => {
		rhapsody = warp.contract<RhapsodyState>(contractId).connect(user1Wallet);
		const artist: Artist = {
			account: user1,
			name: 'Test Artist Updated',
			bio: 'test bio',
			socials: [
				{
					name: 'github',
					url: 'https://github.com/Envoy-VC',
				},
			],
		};
		await rhapsody.writeInteraction(
			{
				function: 'updateArtist',
				data: artist,
			},
			{ strict: true }
		);
		let state = await rhapsody.readState();
		expect(state.cachedValue.state.artists[0]).toMatchObject(artist);
	});*/
	/*
	it('Should properly Read Balances of user', async () => {
		console.log(owner);
		const balance = await rhapsody.viewState({
			function: 'balanceOf',
			tokenId: '1',
			account: owner,
		});
		console.log(balance);
	});*/
});
