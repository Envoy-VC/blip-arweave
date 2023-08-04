import React from 'react';
import { useRouter } from 'next/router';
import { Avatar, Input, Button, Drawer } from 'antd';
import CustomConnectButton from '../custom-connect';

import NavbarDrawer from './nav-drawer';
import { BlipIcon } from '@/components/icons';
import { PiMagnifyingGlassBold, PiListBold, PiXBold } from 'react-icons/pi';

export const NavbarLinks = [
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

const Navbar = () => {
	const router = useRouter();
	const [open, setOpen] = React.useState<boolean>(false);

	const handleDrawerOpen = (state: boolean) => {
		setOpen(state);
	};

	return (
		<div className='flex flex-row items-center justify-between p-6 px-8 select-none font-righteous'>
			<div className='flex md:hidden'>
				<Button
					type='text'
					size='middle'
					className='p-[0px] animate-none'
					onClick={() => handleDrawerOpen(true)}
				>
					<PiListBold color='#fff' size={28} />
				</Button>
			</div>
			<div className='flex flex-row items-center gap-10 uppercase'>
				<div
					className='flex flex-row gap-5 cursor-pointer'
					onClick={() => router.push('/')}
				>
					<div className='max-w-[32px] max-h-[32px]'>
						<Avatar
							icon={<BlipIcon />}
							shape='square'
							size={{ sm: 32, md: 36 }}
							className='flex items-center justify-center'
							style={{ background: 'transparent' }}
						/>
					</div>
					<div className='text-2xl font-bold tracking-wide md:text-3xl'>
						blip
					</div>
				</div>
				<div className='flex-row gap-6 lg:text-[1rem] text-sm hidden md:flex'>
					{NavbarLinks.map((link, index) => (
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
			<CustomConnectButton />
			<Drawer
				title={null}
				placement='left'
				closable={true}
				width={300}
				onClose={() => handleDrawerOpen(false)}
				open={open}
				key='left'
				className='!bg-[#0d0d0f]'
				closeIcon={<PiXBold color='#fff' size={28} />}
			>
				<NavbarDrawer />
			</Drawer>
		</div>
	);
};

export default Navbar;
