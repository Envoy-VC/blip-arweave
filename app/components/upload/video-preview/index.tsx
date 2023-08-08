import React from 'react';
import { Image } from 'antd';
import { UploadContext } from '@/pages/upload';
import { getFileSize } from '@/utils';

const VideoPreview = () => {
	const { uploadForm } = React.useContext(UploadContext);
	return (
		<div className='rounded-xl bg-[#111111] p-4 w-full shadow-md pb-6'>
			<div className='my-4 text-2xl font-medium'>Video</div>
			<div className='flex flex-col gap-2'>
				<video
					controls
					autoPlay={false}
					muted
					src={URL.createObjectURL(uploadForm.file!)}
					width={376}
					height={220}
					className='rounded-2xl max-w-[376px]'
				/>
				<div className='flex flex-col text-[1rem]'>
					<div className='flex flex-row gap-2 '>
						<span className='text-gray-300'>Name:</span>
						<span className='text-gray-100'>{uploadForm.file!.name}</span>
					</div>
					<div className='flex flex-row gap-2'>
						<span className='text-gray-300'>Size:</span>
						<span className='text-gray-100'>
							{getFileSize(uploadForm.file!.size)}
						</span>
					</div>
				</div>
			</div>
			<div className='my-4 text-2xl font-medium'>Thumbnail</div>
			<div className='flex flex-col gap-2'>
				<Image
					alt={uploadForm.thumbnail!.name}
					src={URL.createObjectURL(uploadForm.thumbnail!)}
					width={300}
					height={160}
					className='rounded-2xl'
				/>
				<div className='flex flex-col text-[1rem]'>
					<div className='flex flex-row gap-2'>
						<span className='text-gray-300'>Name:</span>
						<span className='text-gray-100'>{uploadForm.thumbnail!.name}</span>
					</div>
					<div className='flex flex-row gap-2'>
						<span className='text-gray-300'>Size:</span>
						<span className='text-gray-100'>
							{getFileSize(uploadForm.thumbnail!.size)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoPreview;
