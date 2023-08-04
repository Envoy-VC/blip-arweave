export interface Video {
	transactionId: string;
	title: string;
	timestamp: number;
	description?: string;
	thumbnail?: string;
	comments: Comment[];
	reactions: Reaction[];
}

export interface Comment {
	account: string;
	content: string;
	timestamp: number;
}

export interface Reaction {
	account: string;
	type: 'like' | 'dislike';
}
