import { Creator } from '../../../types/creator';
import { BlipState } from '../../../types';

export interface CreateProfileProps extends Creator {}

/**
 * @param  BlipState The Contract Mutable State
 * @param  account Account of the Creator
 */
export const createProfile = async (
	state: BlipState,
	{ account }: CreateProfileProps
) => {
	if (account !== SmartWeave.transaction.owner) {
		throw Error(`Only the owner of the transaction can create an profile`);
	}
	if (state.creators.find((creator) => creator.account === account)) {
		throw Error(`Creator with account ${account} already exists`);
	}
	const creator: Creator = {
		account,
		videos: [],
		followers: [],
	};
	state.creators.push(creator);
	return { state };
};

/**
 * @param  BlipState The Contract Mutable State
 * @param  account Account of the Creator
 */
export const getCreator = (
	state: BlipState,
	{ account }: { account: string }
) => {
	let creator = state.creators.find((creator) => creator.account === account);
	if (!creator) {
		throw Error(`Artist with account ${account} does not exist`);
	}
	return creator;
};
