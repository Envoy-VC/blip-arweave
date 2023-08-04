import { createVideo, CreateVideoProps } from './lib/video';
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
