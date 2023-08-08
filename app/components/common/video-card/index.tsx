import React from 'react';
import { useRouter } from 'next/router';
import { useArweaveAccount } from '@/hooks';
import { Image, Avatar } from 'antd';
import { Video } from '@/types/video';

const VideoCard = ({
	title,
	creatorAddress,
	thumbnail,
	timestamp,
	transactionId,
}: Video) => {
	const router = useRouter();
	const { data, error, isLoading } = useArweaveAccount(creatorAddress);
	return (
		<div className='w-full max-w-[400px] p-3 shadow-xl  min-h-[340px]'>
			<div className='flex flex-col gap-3'>
				<Image
					src={`https://qhwwu7xzi43l35vol5bkrjilcnfaw37oy5mlustvbbrrhnbi6xha.arweave.net/${thumbnail}`}
					alt={title}
					className='max-w-md rounded-2xl max-h-56'
					preview={false}
				/>
				<div className='flex flex-col justify-around gap-1  min-h-[96px]'>
					<span
						className='text-lg font-medium transition-all duration-300 ease-linear cursor-pointer hover:text-gray-400'
						onClick={() => router.push(`/${transactionId}`)}
					>
						{title}
					</span>
					<div className='flex flex-row items-center gap-2'>
						<Avatar
							src={data?.profile?.avatarURL}
							size={32}
							className='border-2 border-[#8149FC]'
						/>
						<span className='text-lg font-medium text-[#929091]'>
							{data?.profile.name ||
								creatorAddress.slice(0, 5) + '...' + creatorAddress.slice(-5)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoCard;
