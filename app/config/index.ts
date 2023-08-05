export const GRAPHQL_ENDPOINT = 'https://arweave.dev/graphql';

export const THIRDWEB_CLIENT_ID =
	process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || '';

export const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '';

export const BundlrConfig = {
	url: 'https://devnet.bundlr.network',
	currency: 'matic',
	providerUrl: 'https://rpc-mumbai.maticvigil.com',
};
