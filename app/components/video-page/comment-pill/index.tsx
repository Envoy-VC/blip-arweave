import React from 'react';
import { Avatar } from 'antd';
import { useArweaveAccount } from '@/hooks';
import { Comment } from '@/types/video';

import { formatTimestamp } from '@/utils';

const CommentPill = ({ account, timestamp, content }: Comment) => {
	const { data } = useArweaveAccount(account);
	return (
		<div className='flex flex-row items-center gap-3'>
			<div className='max-w-[52px] max-h-[52px]'>
				<Avatar
					shape='square'
					size={{ xs: 46, sm: 46, md: 48, lg: 48, xl: 48, xxl: 52 }}
					src={data?.profile?.avatarURL}
					className='flex items-center justify-center cursor-pointer'
				/>
			</div>
			<div className='flex flex-col gap-1'>
				<div className='flex flex-row items-center gap-2'>
					<div className='text-[1rem] font-medium'>
						{data?.profile?.name ||
							account.slice(0, 5) + '...' + account.slice(-5)}
					</div>
					<div className='w-2 h-2 rounded-full bg-[#99999A]' />
					<span className='text-[#99999A] text-sm'>
						{formatTimestamp(timestamp)}
					</span>
				</div>

				<div className='text-[#99999A] font-medium'>{content}</div>
			</div>
		</div>
	);
};

export default CommentPill;
