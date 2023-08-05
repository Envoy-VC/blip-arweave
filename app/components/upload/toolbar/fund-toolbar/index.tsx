import React from 'react';
import { StepType, UploadContext } from '@/pages/upload';
import { Button } from 'antd';

import { PiArrowFatLineRightBold } from 'react-icons/pi';

const FundToolbar = () => {
	const { uploadForm, setUploadForm } = React.useContext(UploadContext);

	const handleClick = () => {
		setUploadForm({ ...uploadForm, step: StepType.LICENSE });
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
