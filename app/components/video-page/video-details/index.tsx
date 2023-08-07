import React from 'react';
import { Button, Avatar } from 'antd';

import { MdThumbUp, MdThumbDown } from 'react-icons/md';

import { Video } from '@/types/video';

const VideoDetails = ({ title }: Video) => {
	return (
		<div className='flex flex-col gap-4 py-4'>
			<div className='flex flex-row items-center justify-between'>
				<span className='text-3xl font-medium'>{title}</span>
				<div className='flex flex-row gap-2'>
					<Button
						size='large'
						icon={<MdThumbUp color='#fff' size={28} />}
						className='bg-[#7549FD] hover:!bg-[#7549FD] border-none flex flex-row justify-center items-center text-xl font-medium hover:!text-white text-white'
					>
						Like
					</Button>
					<Button
						size='large'
						icon={<MdThumbDown color='#fff' size={28} />}
						className='bg-[#7549FD] hover:!bg-[#7549FD] border-none flex flex-row justify-center items-center text-xl font-medium hover:!text-white text-white'
					>
						Dislike
					</Button>
				</div>
			</div>
			<div className='flex flex-row items-center gap-2'>
				<div className='max-w-[60px] max-h-[60px]'>
					<Avatar
						shape='square'
						size={{ xs: 48, sm: 48, md: 48, lg: 50, xl: 56, xxl: 60 }}
						src='https://arweave.net/5wtyJNQzeOyypiqrNrBXPZnFo1CKD6PKR-mwrjHw4fA'
						className='border-2 border-[#ff84ffd8] cursor-pointer flex items-center justify-center'
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<div className='flex flex-row items-center gap-6'>
						<span className='text-[1.2rem] font-medium text-white'>
							Mike Fisher
						</span>
						<Button
							size='middle'
							className='border-2 flex flex-row justify-center items-center text-[1rem] font-medium hover:!text-[#7549FD] text-[#7549FD] border-[#7549FD] !py-0'
						>
							Follow
						</Button>
					</div>
					<div className='text-[#6B6869] font-semibold text-[1rem]'>
						5,518,223 Followers
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoDetails;
