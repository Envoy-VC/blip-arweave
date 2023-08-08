import React from 'react';
import { Image, Avatar } from 'antd';
import { Video } from '@/types/video';
import { useArweaveAccount } from '@/hooks';

import { formatTimestamp } from '@/utils';

const RecommendedCard = ({
	creatorAddress,
	thumbnail,
	title,
	timestamp,
}: Video) => {
	const {
		data: profile,
		error,
		isLoading,
	} = useArweaveAccount(creatorAddress);
	return (
		<div>
			<div className='flex flex-row items-start gap-2'>
				<div className='max-w-[180px] max-h-[108px]'>
					<Image
						src={`https://qhwwu7xzi43l35vol5bkrjilcnfaw37oy5mlustvbbrrhnbi6xha.arweave.net/${thumbnail}`}
						preview={false}
						alt={title}
						width={180}
						height={108}
						className='rounded-2xl'
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<div className='text-[1rem] font-medium'>{title.slice(0, 24) + '...'}</div>
					<div className='flex flex-row items-center gap-1'>
						<div className='max-h-[34px] max-w-[34px]'>
							<Avatar
								shape='square'
								size={{ xs: 30, sm: 30, md: 32, lg: 32, xl: 34, xxl: 34 }}
								src={profile?.profile?.avatarURL}
								className='flex items-center justify-center cursor-pointer'
							/>
						</div>
						<div className='text-[0.925rem] font-medium'>
							{profile?.profile?.name}
						</div>
					</div>
					<div className='text-[#99999A] text-sm font-medium mt-4'>
						{formatTimestamp(timestamp)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecommendedCard;
