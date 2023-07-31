export interface Video {
	txId: string;
	comments: Comment[];
	votes: Vote[];
}

export interface Comment {
	account: string;
	content: string;
}

export interface Vote {
	account: string;
	type: 'up' | 'down';
}
