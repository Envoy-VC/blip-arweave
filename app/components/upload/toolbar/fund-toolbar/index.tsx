import React from 'react';
import { StepType, UploadContext } from '@/pages/upload';
import { useAddress } from '@thirdweb-dev/react';
import toast from 'react-hot-toast';
import { Button } from 'antd';

import { hasEnoughFunds } from '@/services/bundlr';

import { PiArrowFatLineRightBold } from 'react-icons/pi';

const FundToolbar = () => {
	const address = useAddress();
	const { uploadForm, setUploadForm } = React.useContext(UploadContext);

	const handleClick = async () => {
		try {
			if (!address) {
				toast.error('Connect your Ethereum Wallet');
				return;
			}
			if (!uploadForm.file?.size || !uploadForm.thumbnail?.size) {
				toast.error('Upload a file and thumbnail');
				return;
			}
			let hasFunds = await hasEnoughFunds(
				uploadForm.file.size + uploadForm.thumbnail.size
			);
			if (!hasFunds) {
				toast.error('Not enough funds, Fund Bundlr Node');
				return;
			}
			setUploadForm({ ...uploadForm, step: StepType.LICENSE });
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className='p-4 m-4'>
			<div className='flex flex-row items-center justify-end'>
				<Button
					size='large'
					type='text'
					onClick={handleClick}
					className='bg-[#8149FC] text-white text-xl font-semibold hover:!bg-[#8149FC] hover:!scale-[102%] flex flex-row gap-2 items-center'
				>
					Next
					<PiArrowFatLineRightBold size={24} />
				</Button>
			</div>
		</div>
	);
};

export default FundToolbar;
