import React from 'react';
import { Button, Avatar } from 'antd';
import { useArweaveAccount } from '@/hooks';
import { useActiveAddress } from 'arweave-wallet-kit';
import toast from 'react-hot-toast';
import { writeBlipContract } from '@/services/warp';
import { TagPill } from '@/components/common';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import { useQuery } from '@apollo/client';
import { Video } from '@/types/video';
import { TagType } from '@/types/udl-license';
import { getTags } from '@/services/grqphql';

const restrictedTags = ['App-Name', 'App-Version', 'License', 'Content-Type'];

const VideoDetails = ({
	title,
	creatorAddress,
	description,
	reactions,
	transactionId,
}: Video) => {
	const { data } = useArweaveAccount(creatorAddress);
	const address = useActiveAddress();

	const { loading, error, data: tagData } = useQuery(getTags(transactionId));
	console.log(tagData);

	let reaction = reactions.find((reaction) => reaction.account === address);
	const getLikeColor = () => {
		if (!address) return '#fff';
		if (!reaction) return '#fff';
		if (reaction.type === 'like') return '#8149FC';
	};
	const getDisLikeColor = () => {
		if (!address) return '#fff';
		if (!reaction) return '#fff';
		if (reaction.type === 'dislike') return '#8149FC';
	};

	const handleSendReaction = async (type: 'like' | 'dislike') => {
		try {
			if (!address) {
				toast.error('Connect your Arweave wallet');
				return;
			}
			let data = {
				account: address,
				transactionId: transactionId,
				type: type,
			};
			let functionName =
				reaction === undefined
					? 'addReaction'
					: reaction.type === 'like'
					? 'removeReaction'
					: 'addReaction';

			let res = await writeBlipContract({
				functionName: functionName,
				data: data,
			});
			toast.success(`Transaction sent ${res}`);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className='flex flex-col gap-4 py-4'>
			<div className='flex flex-row items-center justify-between'>
				<span className='text-2xl font-medium md:text-3xl'>{title}</span>
				<div className='flex flex-row gap-3 mx-4'>
					<Button
						type='text'
						size='large'
						icon={<MdThumbUp color={getLikeColor()} size={24} />}
						onClick={() => handleSendReaction('like')}
					/>
					<Button
						type='text'
						size='large'
						icon={<MdThumbDown color={getDisLikeColor()} size={24} />}
						onClick={() => handleSendReaction('dislike')}
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
			<div className='flex flex-col gap-2'>
				<span className='text-xl font-medium'>Tags</span>
				<div className='flex flex-row flex-wrap gap-3'>
					{tagData?.transactions?.edges
						?.at(0)
						?.node.tags?.filter(
							(tag: TagType) => !restrictedTags.includes(tag.name)
						)
						.map((tag: TagType, index: number) => (
							<TagPill key={index} name={tag.name} value={tag.value} />
						))}
				</div>
			</div>
		</div>
	);
};

export default VideoDetails;
