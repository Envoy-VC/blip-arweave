import React from 'react';
import { LicenseForm } from '@/components/upload';
import { LicenseToolbar } from '@/components/upload/toolbar';

const License = () => {
	return (
		<>
			<div className='rounded-xl bg-[#111111] p-8 w-full shadow-md '>
				<div className='my-8 text-2xl font-semibold'>
					Add License Tags to Video
				</div>
				<LicenseForm />
			</div>
			<LicenseToolbar />
		</>
	);
};

export default License;
