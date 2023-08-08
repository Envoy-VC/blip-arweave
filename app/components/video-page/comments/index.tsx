import React from 'react';
import { Select, Input, Button } from 'antd';
import CommentPill from '../comment-pill';

import { Comment } from '@/types/video';
import {
	PiFadersHorizontalBold,
	PiArrowFatLinesRightBold,
} from 'react-icons/pi';

interface Props {
	comments: Comment[];
}

const Comments = ({ comments }: Props) => {
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
						/>
					}
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
