import React from 'react';
import { BasicDetailsForm } from '@/components/upload';
import { BasicDetailsToolbar } from '@/components/upload/toolbar';

const BasicDetails = () => {
	return (
		<>
			<div className='rounded-xl bg-[#111111] p-8 w-full shadow-md'>
				<div className='text-2xl font-semibold'>Basic Details</div>
				<BasicDetailsForm />
			</div>
			<BasicDetailsToolbar />
		</>
	);
};

export default BasicDetails;
