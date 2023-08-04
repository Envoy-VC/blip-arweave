import { BlipState } from '../../../types';
import { Video } from '../../../types/video';
import { isValidString } from '../utils';

export interface CreateVideoProps extends Video {
	account: string;
}

/**
 * @param  BlipState The Contract Mutable State
 * @param  account Account of the Creator
 * @param  txId Transaction ID of the Video
 */
export const createVideo = async (
	state: BlipState,
	{
		account,
		transactionId,
		title,
		timestamp,
		description,
		thumbnail,
	}: CreateVideoProps
) => {
	isValidString(transactionId);
	isValidString(title);
	if (account !== SmartWeave.transaction.owner) {
		throw Error(`Only the owner of the transaction can create Videos`);
	}
	let creator = state.creators.find((creator) => creator.account === account);
	if (!creator) {
		throw Error(`Creator with account ${account} does not exist`);
	}
	let video: Video = {
		transactionId,
		title,
		timestamp,
		description,
		thumbnail,
		comments: [],
		reactions: [],
	};
	creator.videos.push(video);
	return { state };
};
