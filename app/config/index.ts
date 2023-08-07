import { TagType } from '@/types/udl-license';

export const GRAPHQL_ENDPOINT = 'https://arweave.dev/graphql';

export const THIRDWEB_CLIENT_ID =
	process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || '';

export const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '';

export const LIVEPEER_API_KEY = process.env.NEXT_PUBLIC_LIVEPEER_API_KEY || '';

export const BundlrConfig = {
	url: 'https://devnet.bundlr.network',
	currency: 'matic',
	providerUrl: 'https://rpc-mumbai.maticvigil.com',
};

export const SMARTWEAVE_CONTRACT_ADDRESS =
	'a-mJI2Mb3puHbi1Md5TYNFMNVyvKDPwx1yHBafpE7mc';

export const DefaultTags: TagType[] = [
	{
		name: 'App-Name',
		value: 'Blip',
	},
	{
		name: 'App-Version',
		value: '0.1.0',
	},
	{
		name: 'License',
		value: 'yRj4a5KMctX_uOmKWCFJIjmY8DeJcusVk6-HzLiM_t8',
	},
];
