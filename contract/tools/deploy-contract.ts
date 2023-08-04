import fs from 'fs';
import path from 'path';
import { WarpFactory } from 'warp-contracts';
import { BlipState } from '../types';
// import jwk from '../keys/jwk.json';

(async () => {
	const warp = WarpFactory.forLocal(1984);
	const contractSrc = fs.readFileSync(
		path.join(__dirname, '../dist/contract.js'),
		'utf8'
	);
	const initialState: BlipState = {
		videos: [],
	};

	// Wallet
	let ownerWallet: any, owner: string;
	({ jwk: ownerWallet, address: owner } = await warp.testing.generateWallet());
	try {
		console.log('Deployment started');
		let contractTxId: string;
		({ contractTxId } = await warp.createContract.deploy({
			wallet: ownerWallet,
			initState: JSON.stringify(initialState),
			src: contractSrc,
		}));
		console.log(contractTxId);
	} catch (error) {
		console.log(error);
	}
})();
