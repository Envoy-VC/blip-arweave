import React from 'react';
import { useRouter } from 'next/router';
import { NavbarLinks } from '..';

const NavbarDrawer = () => {
	const router = useRouter();
	return (
		<div className='flex flex-col gap-6 text-lg font-semibold'>
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
	);
};

export default NavbarDrawer;
