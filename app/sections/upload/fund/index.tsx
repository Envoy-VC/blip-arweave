import React from 'react';

import {
	BundlrConfig,
	VideoDropzone,
	ThumbnailDropzone,
	EstimateFee,
} from '@/components/upload';
import { FundToolbar } from '@/components/upload/toolbar';

const Fund = () => {
	return (
		<>
			<div className='flex flex-col w-full gap-4 mb-24 lg:flex-row'>
				<div className='w-full lg:basis-1/3'>
					<BundlrConfig />
					<EstimateFee />
				</div>
				<div className='w-full lg:basis-2/3'>
					<div className='rounded-xl bg-[#111111] p-8 shadow-md w-full flex flex-col gap-4'>
						<span className='mb-4 text-2xl font-semibold tracking-wide'>
							Upload Thumbnail
						</span>
						<ThumbnailDropzone />
						<span className='my-4 text-2xl font-semibold tracking-wide'>
							Upload Video
						</span>
						<VideoDropzone />
					</div>
				</div>
			</div>
			<FundToolbar />
		</>
	);
};

export default Fund;
