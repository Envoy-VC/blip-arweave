import React from 'react';
import { UploadContext } from '@/pages/upload';
import { useAddress } from '@thirdweb-dev/react';
import toast from 'react-hot-toast';
import { Button } from 'antd';

import { estimateFees } from '@/services/bundlr';

const EstimateFee = () => {
	const address = useAddress();
	const { uploadForm, setUploadForm } = React.useContext(UploadContext);
	const estimateBundlrFees = async () => {
		try {
			if (!address) {
				toast.error('Connect Ethereum Wallet');
				return;
			}
			if (!uploadForm.thumbnail?.size || !uploadForm.file?.size) {
				toast.error('Upload Thumbnail and File');
				return;
			}
			let totalFees = await estimateFees(
				(uploadForm.thumbnail?.size || 0) + (uploadForm.file?.size || 0)
			);
			setUploadForm({
				...uploadForm,
				estimateFees: totalFees,
			});
			toast.success('Estimated Fees');
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong');
		}
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
