import React from 'react';
import { theme, ConfigProvider } from 'antd';
import { Navbar, Sidebar } from '../common';

import { ArweaveWalletKit } from 'arweave-wallet-kit';

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<ConfigProvider
			theme={{
				algorithm: theme.darkAlgorithm,
			}}
		>
			<ArweaveWalletKit
				config={{
					permissions: [
						'ACCESS_ADDRESS',
						'ACCESS_ALL_ADDRESSES',
						'ACCESS_PUBLIC_KEY',
					],
					ensurePermissions: true,
				}}
			>
				<main className='flex flex-col'>
					<Navbar />
					<div className='flex flex-row'>
						<div className='hidden md:flex'>
							<Sidebar />
						</div>
						<div className='w-full mx-6 my-2 md:my-6'>{children}</div>
					</div>
					<div className='absolute bottom-0 flex w-full md:hidden'>
						<Sidebar isMobile />
					</div>
				</main>
			</ArweaveWalletKit>
		</ConfigProvider>
	);
};

export default Layout;
