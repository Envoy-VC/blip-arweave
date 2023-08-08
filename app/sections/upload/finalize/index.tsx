import React from 'react';
import { BasicDetailsPreview, VideoPreview } from '@/components/upload';
import { FinalizeToolbar } from '@/components/upload/toolbar';

const Finalize = () => {
	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-col gap-4 lg:flex-row'>
				<div className='w-full basis-2/3'>
					<BasicDetailsPreview />
				</div>
				<div className='w-full basis-1/3'>
					<VideoPreview />
				</div>
			</div>
			<FinalizeToolbar />
		</div>
	);
};

export default Finalize;
