export interface Artist {
	name: string;
	bio?: string;
	avatar?: string;
	socials?: Socials[];
}

export interface Socials {
	name: string;
	url: string;
}
