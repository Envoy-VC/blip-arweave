import { createVideo, CreateVideoProps } from './lib/video';
import { createProfile, CreateProfileProps } from './lib/creator';
import {
	followCreator,
	unFollowCreator,
	FollowCreatorProps,
} from './lib/actions/creator';
import {
	comment,
	CommentProps,
	addVote,
	removeVote,
	VoteProps,
} from './lib/actions/video';

import { BlipState, BlipAction } from '../types';

export function handle(state: BlipState, action: BlipAction) {
	const input = action.input;
	switch (input.function) {
		case 'createVideo':
			return createVideo(state, input.data as CreateVideoProps);
		case 'createProfile':
			return createProfile(state, input.data as CreateProfileProps);
		case 'followCreator':
			return followCreator(state, input.data as FollowCreatorProps);
		case 'unFollowCreator':
			return unFollowCreator(state, input.data as FollowCreatorProps);
		case 'comment':
			return comment(state, input.data as CommentProps);
		case 'addVote':
			return addVote(state, input.data as VoteProps);
		case 'removeVote':
			return removeVote(state, input.data as VoteProps);
		default:
			throw new Error(`No function supplied or function not recognized`);
	}
}
