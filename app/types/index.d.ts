import { StepType } from '@/pages/upload';
import { TagType } from './udl-license';

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

export interface UploadFormProps {
	step: StepType;
	file?: File;
	thumbnail?: File;
	estimateFees?: string;
	tags: TagType[];
}
