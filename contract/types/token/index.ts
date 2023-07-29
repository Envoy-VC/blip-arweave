import { Artist } from '../artist';

export interface MusicToken {
	tokenId: string;
	artist: Artist;
	metadata: TokenMetadata;
	floorPrice: number;
	totalSupply: number;
	balances: Record<string, number>;
}

export interface TokenMetadata {
	name: string;
	data: any;
	image?: string;
	artist: string;
	description?: string;
	external_url?: string;
	attributes?: Attribute[];
}

interface Attribute {
	type: string;
	value: string | number;
}
