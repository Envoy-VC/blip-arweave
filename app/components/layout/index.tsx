import React from 'react';
import { theme, ConfigProvider } from 'antd';
import { Navbar, Sidebar } from '../common';

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
			<main className='flex flex-col'>
				<Navbar />
				<div className='flex flex-row'>
					<Sidebar />
					{children}
				</div>
			</main>
		</ConfigProvider>
	);
};

export default Layout;
