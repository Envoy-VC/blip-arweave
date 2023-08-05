import { WebBundlr } from '@bundlr-network/client';
import { BigNumber, BigNumberish, ethers, providers } from 'ethers';

import { BundlrConfig } from '@/config';

export const getBundlr = async () => {
	const provider = new providers.Web3Provider(window.ethereum);
	const { url, currency, providerUrl } = BundlrConfig;
	const bundlr = new WebBundlr(url, currency, provider, {
		providerUrl,
	});
	await bundlr.ready();
	return bundlr;
};

export const getAvailableFunds = async () => {
	const bundlr = await getBundlr();
	let funds = await bundlr.getLoadedBalance();
	return bundlr.utils.fromAtomic(funds).toString();
	return funds.dividedBy(10 ** 18).toString();
};

export const fundBundlr = async (amount: string) => {
	const bundlr = await getBundlr();
	const tx = await bundlr.fund(amount);
	return tx;
};
