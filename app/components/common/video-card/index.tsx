import React from 'react';
import { Image, Avatar } from 'antd';

import { Video } from '@/types/video';

const VideoCard = ({
	title,
	creatorAddress,
	thumbnail,
	timestamp,
	transactionId,
}: Video) => {
	return (
		<div className='w-full max-w-[400px] p-3 shadow-xl'>
			<div className='flex flex-col gap-3'>
				<Image
					src={thumbnail}
					alt={title}
					className='max-w-md rounded-2xl max-h-56'
					preview={false}
				/>
				<div className='flex flex-col gap-1'>
					<span className='text-lg font-regular'>{title}</span>
					<div className='flex flex-row items-center gap-2'>
						<Avatar src='https://arweave.net/5wtyJNQzeOyypiqrNrBXPZnFo1CKD6PKR-mwrjHw4fA' />
						<span className='text-[1rem] font-medium text-[#6C6A6B]'>
							Envoy1084
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoCard;
