import React from 'react';
import { StepType, UploadContext } from '@/pages/upload';
import { Button } from 'antd';
import { UploadModal } from '../..';

import {
	PiArrowFatLineRightBold,
	PiArrowFatLineLeftBold,
} from 'react-icons/pi';

const FinalizeToolbar = () => {
	const { uploadForm, setUploadForm } = React.useContext(UploadContext);
	const [modalOpen, setModalOpen] = React.useState<boolean>(false);

	const handleClick = (type: StepType) => {
		setUploadForm({ ...uploadForm, step: type });
	};

	return (
		<div className='p-4 m-4'>
			<div className='flex flex-row items-center justify-end gap-6'>
				<Button
					size='large'
					type='text'
					onClick={() => handleClick(StepType.BASIC_DETAILS)}
					className='bg-[#8149FC] text-white text-xl font-semibold hover:!bg-[#8149FC] hover:!scale-[102%] flex flex-row gap-2 items-center'
				>
					<PiArrowFatLineLeftBold size={24} />
					Back
				</Button>
				<Button
					size='large'
					type='text'
					className='bg-[#8149FC] text-white text-xl font-semibold hover:!bg-[#8149FC] hover:!scale-[102%] flex flex-row gap-2 items-center'
					onClick={() => setModalOpen(true)}
				>
					Upload
					<PiArrowFatLineRightBold size={24} />
				</Button>
			</div>
			<UploadModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
		</div>
	);
};

export default FinalizeToolbar;
