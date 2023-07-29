import { balanceOf, balanceOfBatch, BalanceOfProps } from './lib/balance';
import { createArtist, updateArtist, ArtistProps } from './lib/artist';
import { RhapsodyState, RhapsodyAction } from '../types';

export function handle(state: RhapsodyState, action: RhapsodyAction) {
	const input = action.input;
	switch (input.function) {
		case 'balanceOf':
			return balanceOf(state, input.data as BalanceOfProps);
		case 'balanceOfBatch':
			return balanceOfBatch(state, input.data as BalanceOfProps[]);
		case 'createArtist':
			return createArtist(state, input.data as ArtistProps);
		case 'updateArtist':
			return updateArtist(state, input.data as ArtistProps);
	}
}
