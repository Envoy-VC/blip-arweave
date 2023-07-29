export interface Artist {
	account: string;
	name: string;
	bio?: string;
	avatar?: string;
	socials?: Socials[];
}

export interface Socials {
	name: string;
	url: string;
}
