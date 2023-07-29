import { Artist } from './artist';
import { MusicToken } from './token';

export interface RhapsodyState {
	artists: Artist[];
	tokens: MusicToken[];
}

export interface RhapsodyAction {
	input: RhapsodyInput;
	caller: string;
}

interface RhapsodyInput {
	function: RhapsodyFunction;
	data: any;
}

type RhapsodyFunction = TokenFunctions | ArtistFunctions;

type TokenFunctions = 'balanceOf' | 'balanceOfBatch';
type ArtistFunctions = 'createArtist' | 'updateArtist';
