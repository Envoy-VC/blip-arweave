import React from 'react';
import { Button } from 'antd';
import { UploadContext } from '@/pages/upload';
import { useDropzone } from 'react-dropzone';

import { getFileSize } from '@/utils';

import { PiUploadBold } from 'react-icons/pi';

const VideoDropzone = () => {
	const { uploadForm, setUploadForm } = React.useContext(UploadContext);

	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		maxFiles: 1,
		accept: { 'video/*': [] },
		onDrop: async (acceptedFiles) => {
			let file = acceptedFiles[0];
			setUploadForm({
				...uploadForm,
				file,
			});
		},
	});

	return (
		<div className='flex flex-col items-start gap-4 xl:flex-row w-fit'>
			<div
				{...getRootProps({
					className:
						'flex flex-col items-center p-6 border-2 rounded-md border-[#8149FC] border-dashed bg-[#111111] text-[#fff] hover:border-[#ab49fc] transition duration-300 ease-in-out max-w-[300px] text-center flex items-center justify-center',
				})}
			>
				<input {...getInputProps()} />
				<PiUploadBold color='#8149FC' size={42} />
				<p className='mt-2 bg-[#111111]'>
					Click or drag and file to this area to upload
				</p>
			</div>
			<div className='mt-4 sm:mt-0'>
				{uploadForm.file && (
					<div className='flex flex-col items-start gap-4 lg:items-start lg:flex-row'>
						<video
							controls
							autoPlay={false}
							muted
							src={URL.createObjectURL(uploadForm.file)}
							width={300}
							height={160}
							className='rounded-2xl max-w-[300px]'
						/>
						<div className='h-full font-medium'>
							<div className='flex gap-2'>
								<span className='text-[#bebebe]'>Name: </span>
								<div>{uploadForm.file.name}</div>
							</div>
							<div className='flex gap-2'>
								<span className='text-[#bebebe]'>Size: </span>
								<div>{getFileSize(uploadForm.file.size)}</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default VideoDropzone;
