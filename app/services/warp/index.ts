// @ts-ignore
const { WarpFactory } = require('warp-contracts');
import { SMARTWEAVE_CONTRACT_ADDRESS } from '@/config';

import { BlipState } from '@/types';

export const getBlipState = async () => {
	let blip;
	const warp = await WarpFactory.forMainnet();
	blip = warp.contract(SMARTWEAVE_CONTRACT_ADDRESS).connect('use_wallet');
	const { sortKey, cachedValue } = await blip.readState();
	return cachedValue?.state as BlipState;
};
export const writeBlipContract = async ({
	functionName,
	data,
}: {
	functionName: string;
	data: any;
}) => {
	let blip;
	const warp = await WarpFactory.forMainnet();
	blip = warp.contract(SMARTWEAVE_CONTRACT_ADDRESS).connect('use_wallet');
	await blip.writeInteraction({
		function: functionName,
		data: data,
	});
};
