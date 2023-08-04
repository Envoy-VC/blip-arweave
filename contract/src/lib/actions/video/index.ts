import { BlipState } from '../../../../types';
import { Reaction, Comment } from '../../../../types/video';
import { isUInt, isValidString } from '../../utils';

export interface CommentProps extends Comment {
	creatorAccount: string;
	transactionId: string;
}

/**
 * @param BlipState The Contract Mutable State
 * @param account Account of the Commenter
 * @param creatorAccount Account of the Creator
 * @param txId Transaction ID of the Video
 * @param content Content of the Comment
 */
export const comment = async (
	state: BlipState,
	{ account, creatorAccount, transactionId, content, timestamp }: CommentProps
) => {
	isValidString(account);
	isValidString(content);
	isUInt(timestamp);
	if (account !== SmartWeave.transaction.owner) {
		throw Error(`Only the owner of the transaction can comment`);
	}
	let creator = state.creators.find(
		(creator) => creator.account === creatorAccount
	);
	if (!creator) {
		throw Error(`Creator with account ${account} does not exist`);
	}
	let video = creator.videos.find(
		(video) => video.transactionId === transactionId
	);
	if (!video) {
		throw Error(`Video with txId ${transactionId} does not exist`);
	}
	video.comments.push({ account, content, timestamp });
	return { state };
};

export interface ReactionProps extends Reaction {
	creatorAccount: string;
	transactionId: string;
}

/**
 * @param BlipState The Contract Mutable State
 * @param account Account of the Voter
 * @param creatorAccount Account of the Creator
 * @param txId Transaction ID of the Video
 * @param type Type of the Vote
 */
export const addReaction = async (
	state: BlipState,
	{ account, creatorAccount, transactionId, type }: ReactionProps
) => {
	isValidString(account);
	if (account !== SmartWeave.transaction.owner) {
		throw Error(`Only the owner of the transaction can vote`);
	}
	let creator = state.creators.find(
		(creator) => creator.account === creatorAccount
	);
	if (!creator) {
		throw Error(`Creator with account ${account} does not exist`);
	}
	let video = creator.videos.find(
		(video) => video.transactionId === transactionId
	);
	if (!video) {
		throw Error(`Video with txId ${transactionId} does not exist`);
	}
	if (video.reactions.find((reaction) => reaction.account === account)) {
		throw Error(
			`Video with txId ${transactionId} has already been voted on by ${account}`
		);
	}
	video.reactions.push({ account, type });
	return { state };
};

/**
 * @param BlipState The Contract Mutable State
 * @param account Account of the Voter
 * @param creatorAccount Account of the Creator
 * @param txId Transaction ID of the Video
 * @param type Type of the Vote
 */
export const removeReaction = async (
	state: BlipState,
	{ account, creatorAccount, transactionId }: ReactionProps
) => {
	isValidString(account);
	if (account !== SmartWeave.transaction.owner) {
		throw Error(`Only the owner of the transaction can vote`);
	}
	let creator = state.creators.find(
		(creator) => creator.account === creatorAccount
	);
	if (!creator) {
		throw Error(`Creator with account ${account} does not exist`);
	}
	let video = creator.videos.find(
		(video) => video.transactionId === transactionId
	);
	if (
		!creator.videos.find((reaction) => reaction.transactionId === transactionId)
	) {
		throw Error(`Video with txId ${transactionId} does not exist`);
	}

	if (!video.reactions.find((reaction) => reaction.account === account)) {
		throw Error(
			`Video with txId ${transactionId} has not been voted on by ${account}`
		);
	}
	video.reactions = video.reactions.filter(
		(reaction) => reaction.account !== account
	);
	return { state };
};
