import React from 'react';
import { UploadContext } from '@/pages/upload';
import { TagType } from '../../../types/udl-license/index';

const restrictedTags = ['App-Name', 'App-Version', 'License'];

const TagPill = ({ name, value }: TagType) => (
	<div className='flex flex-row gap-2 px-6 py-2 text-[1rem] font-medium  rounded-3xl bg-[#242424]'>
		<span className='text-gray-400'>{name}:</span>
		<span className='text-gray-100'>{value}</span>
	</div>
);

const BasicDetailsPreview = () => {
	const { uploadForm } = React.useContext(UploadContext);
	return (
		<div className='rounded-xl bg-[#111111] p-8 w-full shadow-md'>
			<div className='mb-4 text-2xl font-medium'>Basic Details</div>
			<div className='flex flex-col gap-2'>
				<div className='text-xl font-medium text-gray-300'>Title</div>
				<div className='text-xl'>{uploadForm?.title}</div>
				<div className='text-xl font-medium text-gray-300'>Description</div>
				<div className='text-[1rem] text-gray-200  whitespace-pre-wrap'>
					{uploadForm?.description}
				</div>
				<div className='my-4 text-xl font-medium text-gray-300'>Tags</div>
				<div className='flex flex-row flex-wrap gap-3'>
					{uploadForm?.tags
						?.filter((tag) => !restrictedTags.includes(tag.name))
						.map((tag, index) => (
							<TagPill key={index} name={tag.name} value={tag.value} />
						))}
				</div>
			</div>
		</div>
	);
};

export default BasicDetailsPreview;
