import React from 'react';
import { Button, Avatar } from 'antd';
import { useArweaveAccount } from '@/hooks';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';

import { Video } from '@/types/video';

const VideoDetails = ({ title, creatorAddress, description }: Video) => {
	const { data } = useArweaveAccount(creatorAddress);
	return (
		<div className='flex flex-col gap-4 py-4'>
			<div className='flex flex-row items-center justify-between'>
				<span className='text-2xl font-medium md:text-3xl'>{title}</span>
				<div className='flex flex-row gap-3 mx-4'>
					<Button
						type='text'
						size='large'
						icon={<MdThumbUp color='#fff' size={24} />}
					/>
					<Button
						type='text'
						size='large'
						icon={<MdThumbDown color='#fff' size={24} />}
					/>
				</div>
			</div>
			<div className='flex flex-row items-center gap-2'>
				<div className='max-w-[60px] max-h-[60px]'>
					<Avatar
						shape='square'
						size={{ xs: 48, sm: 48, md: 48, lg: 50, xl: 56, xxl: 60 }}
						src={data?.profile?.avatarURL}
						className='border-2 border-[#ff84ffd8] cursor-pointer flex items-center justify-center'
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<div className='flex flex-row items-center gap-6'>
						<span className='text-[1.2rem] font-medium text-white'>
							{data?.profile?.name}
						</span>
						<Button
							size='middle'
							className='border-2 flex flex-row justify-center items-center text-[1rem] font-medium hover:!text-[#7549FD] text-[#7549FD] border-[#7549FD] !py-0'
						>
							Follow
						</Button>
					</div>
					<div className='text-[#6B6869] font-semibold text-[1rem]'>
						223 Followers
					</div>
				</div>
			</div>
			<div className='flex flex-col gap-2'>
				<span className='text-xl font-medium'>Description</span>
				<div className='text-[1rem] whitespace-pre-wrap'>{description}</div>
			</div>
		</div>
	);
};

export default VideoDetails;
