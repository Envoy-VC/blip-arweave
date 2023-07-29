import { Artist } from './artist';
import { MusicToken } from './token';

export interface RhapsodyState {
	artists: Artist[];
	tokens: MusicToken[];
}
