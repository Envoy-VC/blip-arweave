import React from 'react';
import { StepType, UploadContext } from '@/pages/upload';
import toast from 'react-hot-toast';
import { Button } from 'antd';

import {
	PiArrowFatLineRightBold,
	PiArrowFatLineLeftBold,
} from 'react-icons/pi';

const LicenseToolbar = () => {
	const { uploadForm, setUploadForm } = React.useContext(UploadContext);

	const handleClick = (type: StepType) => {
		try {
			let paymentAddressTag = uploadForm.tags.filter(
				(tag) => tag.name === 'Payment-Address'
			);
			console.log(paymentAddressTag);

			if (paymentAddressTag.length === 0) {
				toast.error('License tags not saved');
				return;
			}
			setUploadForm({ ...uploadForm, step: type });
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className='p-4 m-4'>
			<div className='flex flex-row items-center justify-end gap-6'>
				<Button
					size='large'
					type='text'
					onClick={() => handleClick(StepType.FUND)}
					className='bg-[#8149FC] text-white text-xl font-semibold hover:!bg-[#8149FC] hover:!scale-[102%] flex flex-row gap-2 items-center'
				>
					<PiArrowFatLineLeftBold size={24} />
					Back
				</Button>
				<Button
					size='large'
					type='text'
					onClick={() => handleClick(StepType.BASIC_DETAILS)}
					className='bg-[#8149FC] text-white text-xl font-semibold hover:!bg-[#8149FC] hover:!scale-[102%] flex flex-row gap-2 items-center'
				>
					Next
					<PiArrowFatLineRightBold size={24} />
				</Button>
			</div>
		</div>
	);
};

export default LicenseToolbar;
