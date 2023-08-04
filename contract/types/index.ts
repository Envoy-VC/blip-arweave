import { Creator } from './creator';

export interface BlipState {
	creators: Creator[];
}

export interface BlipAction {
	input: BlipInput;
	caller: string;
}

interface BlipInput {
	function: BlipFunctions;
	data: any;
}

type BlipFunctions =
	| VideoFunctions
	| CreatorFunctions
	| VideoActions
	| CreatorActions;

type VideoFunctions = 'createVideo';
type CreatorFunctions = 'createProfile' | 'getCreator';
type VideoActions = 'comment' | 'addReaction' | 'removeReaction';
type CreatorActions = 'followCreator' | 'unFollowCreator';
