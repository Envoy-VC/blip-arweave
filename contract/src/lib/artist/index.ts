import { Artist } from '../../../types/artist';
import { RhapsodyState } from '../../../types';

/**
 * @param  RhapsodyState The Contract Mutable State
 * @param  account Account of the artist
 * @param  name Name of the artist
 * @param  bio Bio of the artist
 * @param  avatar Avatar of the artist
 * @param  socials Socials of the artist
 */
export const createArtist = (
	state: RhapsodyState,
	{ account, name, bio, avatar, socials }: Artist
) => {
	if (state.artists.find((artist) => artist.account === account)) {
		throw Error(`Artist with account ${account} already exists`);
	}
	const artist: Artist = {
		account,
		name,
		bio,
		avatar,
		socials,
	};
	state.artists.push(artist);
	return artist;
};

/**
 * @param  RhapsodyState The Contract Mutable State
 * @param  account Account of the artist
 * @param  name Name of the artist
 * @param  bio Bio of the artist
 * @param  avatar Avatar of the artist
 * @param  socials Socials of the artist
 * @returns Updated Artist
 */
export const updateArtist = (
	state: RhapsodyState,
	{ account, name, bio, avatar, socials }: Artist
) => {
	if (!state.artists.find((artist) => artist.account === account)) {
		throw Error(`Artist with account ${account} does not exist`);
	}

	let artist = state.artists.find((artist) => artist.account === account);
	artist = {
		account,
		name,
		bio,
		avatar,
		socials,
	};
	return artist;
};
