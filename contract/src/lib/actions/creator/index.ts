import { BlipState } from '../../../../types';
import { isValidString } from '../../utils';

export interface FollowCreatorProps {
	account: string;
	creatorAccount: string;
}

/**
 * @param BlipState The Contract Mutable State
 * @param account Account of the Follower
 * @param creatorAccount Account of the Creator
 */
export const followCreator = async (
	state: BlipState,
	{ account, creatorAccount }: FollowCreatorProps
) => {
	isValidString(account);
	if (account !== SmartWeave.transaction.owner) {
		throw Error(`Only the owner of the transaction can Follow Creators`);
	}
	let creator = state.creators.find(
		(creator) => creator.account === creatorAccount
	);
	if (!creator) {
		throw Error(`Creator with account ${account} does not exist`);
	}
	if (creator.followers.includes(account)) {
		throw Error(
			`Creator with account ${account} is already following ${creatorAccount}`
		);
	}
	creator.followers.push(account);
	return { state };
};

/**
 * @param BlipState The Contract Mutable State
 * @param account Account of the Follower
 * @param creatorAccount Account of the Creator
 */
export const unFollowCreator = async (
	state: BlipState,
	{ account, creatorAccount }: FollowCreatorProps
) => {
	isValidString(account);
	if (account !== SmartWeave.transaction.owner) {
		throw Error(`Only the owner of the transaction can Follow Creators`);
	}
	let creator = state.creators.find(
		(creator) => creator.account === creatorAccount
	);
	if (!creator) {
		throw Error(`Creator with account ${account} does not exist`);
	}
	if (!creator.followers.includes(account)) {
		throw Error(
			`Creator with account ${account} is already following ${creatorAccount}`
		);
	}
	creator.followers = creator.followers.filter(
		(follower) => follower !== account
	);
	return { state };
};
