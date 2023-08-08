import React from 'react';
import { TagType } from '@/types/udl-license';

const TagPill = ({ name, value }: TagType) => (
	<div className='flex flex-row gap-2 px-6 py-2 text-[1rem] font-medium  rounded-3xl bg-[#242424]'>
		<span className='text-gray-400'>{name}:</span>
		<span className='text-gray-100'>{value}</span>
	</div>
);

export default TagPill;
