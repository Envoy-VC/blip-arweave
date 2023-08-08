import { Video } from './video';

export interface BlipState {
	videos: Video[];
}

export interface BlipAction {
	input: BlipInput;
	caller: string;
}

interface BlipInput {
	function: BlipFunctions;
	data: any;
}

type BlipFunctions = VideoFunctions | VideoActions;

type VideoFunctions = 'createVideo';
type VideoActions = 'comment' | 'addReaction' | 'removeReaction';
