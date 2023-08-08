import React from 'react';
import { UploadContext } from '@/pages/upload';
import { uploadFile } from '@/services/bundlr';
import { Modal, Button, Spin } from 'antd';
import { useActiveAddress } from 'arweave-wallet-kit';
import { useRouter } from 'next/router';

import { PiUploadBold, PiCheckCircleFill, PiXFill } from 'react-icons/pi';
import { LoadingOutlined } from '@ant-design/icons';

import { Video } from '@/types/video';

import { writeBlipContract } from '@/services/warp';
import Link from 'next/link';

interface Props {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type UploadState =
	| 'idle'
	| 'uploading-video'
	| 'uploading-thumbnail'
	| 'creating-tx'
	| 'success'
	| 'error';

const UploadModal = ({ modalOpen, setModalOpen }: Props) => {
	const router = useRouter();
	const arAddress = useActiveAddress();
	const { uploadForm, setUploadForm } = React.useContext(UploadContext);
	const [isUploading, setIsUploading] = React.useState<boolean>(false);
	const [uploadState, setUploadState] = React.useState<UploadState>('idle');
	const [txId, setTxId] = React.useState<string>('');

	const uploadFiles = async () => {
		try {
			setIsUploading(true);
			setUploadState('uploading-video');
			let videoTxId = uploadForm.fileTxId || '';
			let thumbnailTxId = uploadForm.thumbnailTxId || '';
			if (videoTxId === '') {
				videoTxId = await uploadFile(uploadForm.file!, uploadForm.tags);
				setUploadForm({
					...uploadForm,
					fileTxId: videoTxId,
				});
			}
			setUploadState('uploading-thumbnail');
			if (thumbnailTxId === '') {
				thumbnailTxId = await uploadFile(uploadForm.thumbnail!, []);
				setUploadForm({
					...uploadForm,
					thumbnailTxId: thumbnailTxId,
				});
			}
			console.log(videoTxId, thumbnailTxId);
			if (!videoTxId || !thumbnailTxId) throw new Error('Error uploading file');

			// Write SmartWeave Contract
			setUploadState('creating-tx');
			const now = Math.floor(Date.now() / 1000);

			const video: Video = {
				creatorAddress: arAddress!,
				transactionId: videoTxId,
				title: uploadForm.title!,
				timestamp: now,
				description: uploadForm.description!,
				thumbnail: thumbnailTxId,
				comments: [],
				reactions: [],
			};

			const res = await writeBlipContract({
				functionName: 'createVideo',
				data: video,
			});
			setTxId(res);
			console.log(res);

			setUploadState('success');
		} catch (error) {
			console.log(error);
			setUploadState('error');
		} finally {
			setIsUploading(false);
		}
	};

	const handleDone = () => {
		setUploadState('idle');
		setUploadForm({
			step: 0,
			title: '',
			description: '',
			file: undefined,
			fileTxId: '',
			thumbnail: undefined,
			thumbnailTxId: '',
			tags: [],
		});
		setModalOpen(false);
		router.push('/');
	};

	const handleClose = () => {
		setUploadState('idle');
		setModalOpen(false);
	};

	return (
		<Modal
			title='Upload Video'
			open={modalOpen}
			footer={
				uploadState === 'success' && (
					<div className='flex flex-row justify-end w-full'>
						<Button
							size='large'
							type='text'
							className='bg-[#8149FC] text-white text-xl font-semibold hover:!bg-[#8149FC] hover:!scale-[102%] flex flex-row gap-2 items-center'
							onClick={handleDone}
						>
							Done
						</Button>
					</div>
				)
			}
			closable={!isUploading}
			onCancel={handleClose}
			maskClosable={!isUploading}
			keyboard={!isUploading}
		>
			<div className='flex flex-col items-center gap-4 p-8'>
				<Button
					size='large'
					type='text'
					className='bg-[#8149FC] text-white text-xl font-semibold hover:!bg-[#8149FC] hover:!scale-[102%] flex flex-row gap-2 items-center'
					onClick={uploadFiles}
					disabled={isUploading || uploadState !== 'idle'}
				>
					{['uploading-video', 'uploading-thumbnail', 'creating-tx'].includes(
						uploadState
					) && (
						<Spin
							indicator={
								<LoadingOutlined
									color='#fff'
									style={{ fontSize: 24, color: '#fff' }}
									spin
								/>
							}
						/>
					)}
					{uploadState === 'success' && (
						<PiCheckCircleFill size={24} color='#fff' />
					)}
					{uploadState === 'error' && <PiXFill size={24} color='#fff' />}
					{uploadState === 'idle' && <PiUploadBold size={24} />}
					{uploadState === 'idle' && 'Upload'}
					{uploadState === 'uploading-video' && 'Uploading Video'}
					{uploadState === 'uploading-thumbnail' && 'Uploading Thumbnail'}
					{uploadState === 'creating-tx' && 'Creating Transaction'}
					{uploadState === 'success' && 'Success'}
					{uploadState === 'error' && 'Error'}
				</Button>
				{uploadState === 'success' && (
					<div className='flex flex-col w-full gap-2 my-2'>
						<span className='text-lg font-medium'>Transaction Sent</span>
						<span className='text-sm font-medium text-gray-400'>
							Estimated time till confirmation ~20min
						</span>
						<Link
							href={`https://viewblock.io/arweave/tx/${txId}`}
							target='_blank'
						>
							<div className='text-[1rem] hover:text-[#8149FC]'>{`https://viewblock.io/arweave/tx/${txId}`}</div>
						</Link>
					</div>
				)}
			</div>
		</Modal>
	);
};

export default UploadModal;
