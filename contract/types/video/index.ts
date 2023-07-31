export interface Video {
	txId: string;
	title: string;
	timestamp: number;
	description?: string;
	thumbnail?: string;
	comments: Comment[];
	votes: Vote[];
}

export interface Comment {
	account: string;
	content: string;
	timestamp: number;
}

export interface Vote {
	account: string;
	type: 'up' | 'down';
}
