export type SidebarItem =
	| 'home'
	| 'trending'
	| 'categories'
	| 'upload'
	| 'dashboard';

export interface ISidebarItem {
	name: string;
	path: string;
	icon: React.ReactNode;
}
