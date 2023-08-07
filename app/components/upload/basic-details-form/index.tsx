import React from 'react';
import { Input, Button } from 'antd';
import toast from 'react-hot-toast';
import { UploadContext } from '@/pages/upload';

const BasicDetailsForm = () => {
	const { uploadForm, setUploadForm } = React.useContext(UploadContext);
	const [title, setTitle] = React.useState('');
	const [description, setDescription] = React.useState('');

	const handleSave = () => {
		try {
			if (!title) {
				toast.error('Title is required');
				return;
			}
			setUploadForm({ ...uploadForm, title, description });
			toast.success('Saved');
		} catch (error) {
			toast.error('Failed to save');
		}
	};
	return (
		<div className='flex flex-col gap-4 mt-8'>
			<Input
				size='large'
				placeholder='Title (required)'
				className='text-lg'
				onChange={(e) => setTitle(e.target.value)}
			/>
			<Input.TextArea
				placeholder='Description (optional)\nTell viewers about your video'
				autoSize={{ minRows: 10, maxRows: 20 }}
				className='text-lg'
				onChange={(e) => setDescription(e.target.value)}
			/>
			<div className='flex flex-row justify-end'>
				<Button
					size='large'
					type='text'
					className='bg-[#8149FC] text-white text-xl font-semibold hover:!bg-[#8149FC] hover:!scale-[102%]'
					onClick={handleSave}
				>
					Save
				</Button>
			</div>
		</div>
	);
};

export default BasicDetailsForm;
