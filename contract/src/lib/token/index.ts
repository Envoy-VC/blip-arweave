import { RhapsodyState } from '../../../types';
import { MusicToken, TokenMetadata } from '../../../types/token';

export interface CreateTokenProps extends MusicToken {}

export const createToken = (
	state: RhapsodyState,
	{ tokenId, artist, metadata, floorPrice, balances }: CreateTokenProps
) => {};
