import React from 'react';
import { UploadContext } from '@/pages/upload';
import { Button } from 'antd';

import { estimateFees } from '@/services/bundlr';

const EstimateFee = () => {
	const { uploadForm, setUploadForm } = React.useContext(UploadContext);
	const estimateBundlrFees = async () => {
		let totalFees = await estimateFees(
			(uploadForm.thumbnail?.size || 0) + (uploadForm.file?.size || 0)
		);
		setUploadForm({
			...uploadForm,
			estimateFees: totalFees,
		});
	};
	return (
		<div className='rounded-xl bg-[#111111] p-8 w-full shadow-md mt-6 flex flex-col gap-4'>
			<div className='flex flex-col items-center justify-center'>
				<p className='text-[1rem] font-semibold text-white'>Estimated Fees</p>
				<p className='text-lg font-bold text-[#cccccc]'>{`${
					uploadForm.estimateFees || 0
				} MATIC`}</p>
			</div>
			<Button
				size='large'
				type='text'
				className='bg-[#8149FC] text-white text-xl font-semibold hover:!bg-[#8149FC] hover:!scale-[102%]'
				onClick={estimateBundlrFees}
			>
				Estimate
			</Button>
		</div>
	);
};

export default EstimateFee;
