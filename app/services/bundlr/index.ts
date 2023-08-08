import { WebBundlr } from '@bundlr-network/client';
import { providers } from 'ethers';

// @ts-ignore
import fileReaderStream from 'filereader-stream';

import { BundlrConfig } from '@/config';
import { TagType } from '@/types/udl-license';

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
	return bundlr.utils.fromAtomic(funds).toFixed(6).toString();
};

export const fundBundlr = async (amount: string) => {
	const bundlr = await getBundlr();
	const tx = await bundlr.fund(amount);
	return tx;
};

export const estimateFees = async (fileSize: number) => {
	const bundlr = await getBundlr();
	let fees = await bundlr.getPrice(fileSize);
	return bundlr.utils.fromAtomic(fees).toFixed(6).toString();
};

export const hasEnoughFunds = async (fileSize: number) => {
	const bundlr = await getBundlr();
	let fees = await bundlr.getPrice(fileSize);
	let funds = await bundlr.getLoadedBalance();
	return funds.gte(fees);
};

export const uploadFile = async (file: File, tags: TagType[]) => {
	let updatedTags = tags;
	updatedTags.push({
		name: 'Content-Type',
		value: file.type,
	});
	console.log(updatedTags);
	const dataStream = fileReaderStream(file);
	const bundlr = await getBundlr();
	const tx = await bundlr.upload(dataStream, {
		tags: updatedTags,
	});

	return tx.id;
};
