import React from 'react';
import { UploadContext } from '@/pages/upload';
import { uploadFile } from '@/services/bundlr';
import { Modal, Button, Upload, Spin } from 'antd';
import { useActiveAddress, useApi } from 'arweave-wallet-kit';

import { writeContract } from 'arweavekit/contract';

import { SMARTWEAVE_CONTRACT_ADDRESS } from '@/config';

import { PiUploadBold, PiCheckCircleFill, PiXFill } from 'react-icons/pi';
import { LoadingOutlined } from '@ant-design/icons';

import { Video } from '@/types/video';

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
	const arAddress = useActiveAddress();
	const api = useApi();
	const { uploadForm, setUploadForm } = React.useContext(UploadContext);
	const [isUploading, setIsUploading] = React.useState<boolean>(false);
	const [uploadState, setUploadState] = React.useState<UploadState>('idle');

	const uploadFiles = async () => {
		try {
			setIsUploading(true);
			setUploadState('uploading-video');
			let videoTxId = uploadForm.fileTxId || '';
			let thumbnailTxId = uploadForm.thumbnailTxId || '';
			if (uploadForm.fileTxId === '') {
				videoTxId = await uploadFile(uploadForm.file!, uploadForm.tags);
				setUploadForm({
					...uploadForm,
					fileTxId: videoTxId,
				});
			}
			setUploadState('uploading-thumbnail');
			if (uploadForm.thumbnailTxId === '') {
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

			const res = await writeContract({
				environment: 'mainnet',
				contractTxId: SMARTWEAVE_CONTRACT_ADDRESS,
				options: { function: 'createVideo', data: video },
				wallet: 'use_wallet',
			});
			console.log(res);
			setUploadState('success');
		} catch (error) {
			console.log(error);
			setUploadState('error');
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<Modal
			title='Upload Video'
			open={modalOpen}
			footer={null}
			closable={!isUploading}
			onCancel={() => setModalOpen(false)}
			maskClosable={!isUploading}
			keyboard={!isUploading}
		>
			<div className='flex flex-col items-center gap-4 p-8'>
				<Button
					size='large'
					type='text'
					className='bg-[#8149FC] text-white text-xl font-semibold hover:!bg-[#8149FC] hover:!scale-[102%] flex flex-row gap-2 items-center'
					onClick={uploadFiles}
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
						<PiCheckCircleFill size={24} color='#00D26A' />
					)}
					{uploadState === 'error' && <PiXFill size={24} color='#F92F60' />}
					{uploadState === 'idle' && <PiUploadBold size={24} />}
					{uploadState === 'idle' && 'Upload'}
					{uploadState === 'uploading-video' && 'Uploading Video'}
					{uploadState === 'uploading-thumbnail' && 'Uploading Thumbnail'}
					{uploadState === 'creating-tx' && 'Creating Transaction'}
					{uploadState === 'success' && 'Success'}
					{uploadState === 'error' && 'Error'}
				</Button>
			</div>
		</Modal>
	);
};

export default UploadModal;
