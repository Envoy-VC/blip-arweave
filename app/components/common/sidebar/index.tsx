import React from 'react';
import { Button } from 'antd';

import { Home, Plus, Setting, Chart, Category } from 'react-iconly';

import { ISidebarItem, SidebarItem } from '@/types';

interface Props {
	isMobile?: boolean;
}

const Sidebar = ({ isMobile = false }: Props) => {
	const [activeItem, setActiveItem] = React.useState<SidebarItem>('home');

	const handleTabChange = (item: SidebarItem) => {
		setActiveItem(item);
	};

	const SidebarItems: ISidebarItem[] = [
		{
			name: 'Home',
			icon: (
				<Home
					primaryColor={activeItem === 'home' ? '#FF8CFF' : '#fff'}
					stroke='bold'
					size={24}
				/>
			),
			path: '/',
		},
		{
			name: 'Trending',
			icon: (
				<Chart
					primaryColor={activeItem === 'trending' ? '#FF8CFF' : '#fff'}
					stroke='bold'
					size={24}
				/>
			),
			path: '/trending',
		},
		{
			name: 'Categories',
			icon: (
				<Category
					primaryColor={activeItem === 'categories' ? '#FF8CFF' : '#fff'}
					stroke='bold'
					size={24}
				/>
			),
			path: '/categories',
		},
		{
			name: 'Upload',
			icon: (
				<Plus
					primaryColor={activeItem === 'upload' ? '#FF8CFF' : '#fff'}
					stroke='bold'
					size={24}
				/>
			),
			path: '/upload',
		},
		{
			name: 'Dashboard',
			icon: (
				<Setting
					primaryColor={activeItem === 'dashboard' ? '#FF8CFF' : '#fff'}
					stroke='bold'
					size={24}
				/>
			),
			path: '/dashboard',
		},
	];

	return (
		<div className={`max-h-full ${!isMobile && 'mt-4'} w-full`}>
			<div
				className={`flex w-full items-center ${
					isMobile
						? 'flex-row justify-around gap-0'
						: 'flex-col justify-start gap-2'
				}`}
			>
				{SidebarItems.map((item, index) => (
					<div
						className={`flex grow items-center justify-center ${
							activeItem === item.name.toLocaleLowerCase()
								? isMobile
									? 'border-b-4 border-[#E473FF]'
									: 'border-l-4 border-[#E473FF]'
								: !isMobile && 'pl-[28px]'
						} ${isMobile ? 'mx-6' : 'px-3 py-[2px] pl-6 my-2'}`}
						key={index}
					>
						<Button
							title={item.name}
							icon={item.icon}
							type='link'
							onClick={() =>
								handleTabChange(item.name.toLowerCase() as SidebarItem)
							}
							className={`${isMobile && 'mb-2'}`}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Sidebar;
