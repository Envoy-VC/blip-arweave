import React from 'react';
import { Steps } from 'antd';
import type { StepProps } from 'antd';
import { PiUpload, PiPenNib, PiNotePencil, PiSmiley } from 'react-icons/pi';

const StepTitle = ({ title }: { title: string }) => (
	<div className='hidden text-lg font-semibold text-white sm:flex'>{title}</div>
);

const StepItems: StepProps[] = [
	{
		title: <StepTitle title='Upload' />,
		icon: <PiUpload color='#fff' size={28} />,
		status: 'finish',
	},
	{
		title: <StepTitle title='License' />,
		icon: <PiPenNib color='#fff' size={28} />,
	},
	{
		title: <StepTitle title='Details' />,
		icon: <PiNotePencil color='#fff' size={28} />,
	},
	{
		title: <StepTitle title='Finalize' />,
		icon: <PiSmiley color='#fff' size={28} />,
	},
];

const UploadStepper = () => {
	return (
		<div>
			<Steps items={StepItems} responsive={false} />
		</div>
	);
};

export default UploadStepper;
