import { Artist } from '../../../types/artist';
import { RhapsodyState } from '../../../types';

export interface ArtistProps extends Artist {}

/**
 * @param  RhapsodyState The Contract Mutable State
 * @param  account Account of the artist
 * @param  name Name of the artist
 * @param  bio Bio of the artist
 * @param  avatar Avatar of the artist
 * @param  socials Socials of the artist
 */
export const createArtist = async (
	state: RhapsodyState,
	{ account, name, bio, avatar, socials }: ArtistProps
) => {
	if (account !== SmartWeave.transaction.owner) {
		throw Error(`Only the owner of the transaction can create an artist`);
	}
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
	{ account, name, bio, avatar, socials }: ArtistProps
) => {
	let artist = state.artists.find(
		(artist) => artist.account === SmartWeave.transaction.owner
	);
	// check if artist exists
	if (!artist) {
		throw Error(`Artist with account ${account} does not exist`);
	}
	if (artist.account !== SmartWeave.transaction.owner) {
		throw Error(`Only the owner of the transaction can update artist details`);
	}
	artist = {
		account,
		name,
		bio,
		avatar,
		socials,
	};
	return { state };
};
