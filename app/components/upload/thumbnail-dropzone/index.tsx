import React from 'react';
import { Button, Image } from 'antd';
import { UploadContext } from '@/pages/upload';
import { useDropzone } from 'react-dropzone';

import { getFileSize } from '@/utils';

import { PiUploadBold } from 'react-icons/pi';

const ThumbnailDropzone = () => {
	const { uploadForm, setUploadForm } = React.useContext(UploadContext);

	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		maxFiles: 1,
		accept: { 'image/*': [] },
		onDrop: async (acceptedFiles) => {
			let thumbnail = acceptedFiles[0];
			setUploadForm({
				...uploadForm,
				thumbnail,
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
				{uploadForm.thumbnail && (
					<div className='flex flex-col items-start gap-4 lg:items-start lg:flex-row'>
						<Image
							alt={uploadForm.thumbnail.name}
							src={URL.createObjectURL(uploadForm.thumbnail)}
							width={300}
							height={160}
							className='rounded-2xl'
						/>
						<div className='h-full font-medium'>
							<div className='flex gap-2'>
								<span className='text-[#bebebe]'>Name: </span>
								<div>{uploadForm.thumbnail.name}</div>
							</div>
							<div className='flex gap-2'>
								<span className='text-[#bebebe]'>Size: </span>
								<div>{getFileSize(uploadForm.thumbnail.size)}</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ThumbnailDropzone;
