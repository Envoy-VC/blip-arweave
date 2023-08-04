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
	addReaction,
	removeReaction,
	ReactionProps,
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
		case 'addReaction':
			return addReaction(state, input.data as ReactionProps);
		case 'removeReaction':
			return removeReaction(state, input.data as ReactionProps);
		default:
			throw new Error(`No function supplied or function not recognized`);
	}
}
