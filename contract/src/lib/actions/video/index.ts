import { BlipState } from '../../../../types';
import { Vote, Comment } from '../../../../types/video';
import { isValidString } from '../../utils';

export interface CommentProps extends Comment {
	creatorAccount: string;
	txId: string;
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
	{ account, creatorAccount, txId, content }: CommentProps
) => {
	isValidString(account);
	isValidString(content);
	if (account !== SmartWeave.transaction.owner) {
		throw Error(`Only the owner of the transaction can comment`);
	}
	let creator = state.creators.find(
		(creator) => creator.account === creatorAccount
	);
	if (!creator) {
		throw Error(`Creator with account ${account} does not exist`);
	}
	let video = creator.videos.find((video) => video.txId === txId);
	if (!video) {
		throw Error(`Video with txId ${txId} does not exist`);
	}
	video.comments.push({ account, content });
	return { state };
};

export interface VoteProps extends Vote {
	creatorAccount: string;
	txId: string;
}

/**
 * @param BlipState The Contract Mutable State
 * @param account Account of the Voter
 * @param creatorAccount Account of the Creator
 * @param txId Transaction ID of the Video
 * @param type Type of the Vote
 */
export const addVote = async (
	state: BlipState,
	{ account, creatorAccount, txId, type }: VoteProps
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
	let video = creator.videos.find((video) => video.txId === txId);
	if (!video) {
		throw Error(`Video with txId ${txId} does not exist`);
	}
	if (video.votes.find((vote) => vote.account === account)) {
		throw Error(
			`Video with txId ${txId} has already been voted on by ${account}`
		);
	}
	video.votes.push({ account, type });
	return { state };
};

/**
 * @param BlipState The Contract Mutable State
 * @param account Account of the Voter
 * @param creatorAccount Account of the Creator
 * @param txId Transaction ID of the Video
 * @param type Type of the Vote
 */
export const removeVote = async (
	state: BlipState,
	{ account, creatorAccount, txId }: VoteProps
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
	let video = creator.videos.find((video) => video.txId === txId);
	if (!video) {
		throw Error(`Video with txId ${txId} does not exist`);
	}
	if (!video.votes.find((vote) => vote.account === account)) {
		throw Error(`Video with txId ${txId} has not been voted on by ${account}`);
	}
	video.votes = video.votes.filter((vote) => vote.account !== account);
	return { state };
};
