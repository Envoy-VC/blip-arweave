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
	fileTxId?: string;
	thumbnail?: File;
	thumbnailTxId?: string;
	estimateFees?: string;
	tags: TagType[];
	title?: string;
	description?: string;
}
