import React from 'react';
import { useActiveAddress } from 'arweave-wallet-kit';
import { Select, Input, Button } from 'antd';
import toast from 'react-hot-toast';
import { writeBlipContract } from '@/services/warp';

import CommentPill from '../comment-pill';

import {
	PiFadersHorizontalBold,
	PiArrowFatLinesRightBold,
} from 'react-icons/pi';

import { Video } from '@/types/video';

const Comments = ({ comments, transactionId }: Video) => {
	const address = useActiveAddress();
	const [comment, setComment] = React.useState<string>('');

	const handleSendComment = async () => {
		try {
			if (!comment) {
				toast.error('Comment cannot be empty');
				return;
			}
			if (!address) {
				toast.error('Connect your Arweave wallet');
				return;
			}
			let now = Math.floor(Date.now() / 1000);
			let data = {
				account: address,
				content: comment,
				timestamp: now,
				transactionId: transactionId,
			};
			console.log(data);

			let res = await writeBlipContract({
				functionName: 'comment',
				data: data,
			});
			toast.success(`Transaction sent ${res}`);
		} catch (error) {
			console.log(error);
		} finally {
			setComment('');
		}
	};
	return (
		<div>
			<div className='flex flex-col gap-2'>
				<div className='flex flex-row items-center justify-between'>
					<span className='text-lg font-medium'>{`${comments.length} Comments`}</span>
					<div className='flex flex-row items-center gap-2'>
						<Select
							defaultValue='new'
							style={{ width: 120 }}
							bordered={false}
							options={[
								{ value: 'new', label: 'Newest First' },
								{ value: 'old', label: 'Oldest First' },
							]}
						/>
						<PiFadersHorizontalBold size={20} color='#fff' />
					</div>
				</div>
				<Input
					size='large'
					placeholder='Enter your comment here'
					className='mb-4'
					suffix={
						<Button
							size='large'
							icon={<PiArrowFatLinesRightBold size={20} color='#fff' />}
							className='bg-[#7549FD] hover:!bg-[#7549FD] border-none flex flex-row justify-center items-center text-xl font-medium hover:!text-white text-white'
							onClick={handleSendComment}
						/>
					}
					onChange={(e) => setComment(e.target.value)}
				/>
				<div className='flex flex-col gap-3'>
					{comments.map((comment, index) => (
						<CommentPill key={index} {...comment} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Comments;
