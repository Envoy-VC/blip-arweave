import { BlipState } from '../../../types';
import { Video } from '../../../types/video';
import { isValidString } from '../utils';

export interface CreateVideoProps extends Video {}

/**
 * @param  BlipState The Contract Mutable State
 * @param  account Account of the Creator
 * @param  txId Transaction ID of the Video
 */
export const createVideo = async (
	state: BlipState,
	{
		creatorAddress,
		transactionId,
		title,
		timestamp,
		description,
		thumbnail,
	}: CreateVideoProps
) => {
	isValidString(transactionId);
	isValidString(thumbnail);
	isValidString(title);
	if (creatorAddress !== SmartWeave.transaction.owner) {
		throw Error(`Only the owner of the transaction can create Videos`);
	}
	let video: Video = {
		creatorAddress,
		transactionId,
		title,
		timestamp,
		description,
		thumbnail,
		comments: [],
		reactions: [],
	};
	state.videos.push(video);
	return { state };
};
