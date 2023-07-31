import { Video } from '../video';

export interface Creator {
	account: string;
	videos: Video[];
	followers: string[];
}
