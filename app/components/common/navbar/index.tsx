import React from 'react';
import { useRouter } from 'next/router';
import { Avatar, Input, ConfigProvider } from 'antd';

import { BlipIcon } from '@/components/icons';
import { Chat, Notification } from 'react-iconly';
import { PiMagnifyingGlassBold } from 'react-icons/pi';

const Navbar = () => {
	const router = useRouter();
	const links = [
		{
			name: 'Categories',
			path: '/categories',
		},
		{
			name: 'Trending',
			path: '/trending',
		},
		{
			name: 'For you',
			path: '/for-you',
		},
	];
	return (
		<div className='flex flex-row items-center justify-between p-6 select-none font-righteous'>
			<div className='flex flex-row items-center gap-10 uppercase'>
				<div
					className='flex flex-row gap-5 cursor-pointer'
					onClick={() => router.push('/')}
				>
					<Avatar
						icon={<BlipIcon />}
						shape='square'
						size={{ sm: 32, md: 36 }}
						className='flex items-center justify-center'
						style={{ background: 'transparent' }}
					/>
					<div className='text-2xl font-bold tracking-wide md:text-3xl'>
						blip
					</div>
				</div>
				<div className='flex-row gap-6 lg:text-[1rem] text-sm hidden md:flex'>
					{links.map((link, index) => (
						<div
							key={index}
							onClick={() => router.push(link.path)}
							className='cursor-pointer hover:underline decoration-2'
						>
							{link.name}
						</div>
					))}
				</div>
			</div>
			<Input
				size='large'
				className='max-w-[350px] bg-[#1C1D1F] hover:bg-[#1C1D1F] py-2 hidden xl:flex'
				prefix={
					<PiMagnifyingGlassBold color='#93989B' size={22} className='mr-2' />
				}
				bordered={false}
				placeholder='Search'
			/>
			<div className='flex flex-row items-center gap-8'>
				<div className='flex-row items-center hidden gap-8 sm:flex'>
					<Chat set='light' primaryColor='#B4B8BD' size={28} />
					<Notification set='light' primaryColor='#B4B8BD' size={28} />
				</div>

				<div className='flex flex-row items-center gap-8'>
					<span className='hidden text-xl sm:flex'>Mikael</span>
					<Avatar
						shape='square'
						size={{ xs: 38, sm: 38, md: 42 }}
						src='https://i.insider.com/5be9ede366be501cf82e377b?width=600&format=jpeg&auto=webp'
						className='border-2 border-[#FF84FF]'
					/>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
