import React from 'react';
import { theme, ConfigProvider } from 'antd';
import { Navbar, Sidebar } from '../common';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ThirdwebProvider } from '@thirdweb-dev/react';

import { ArweaveWalletKit } from 'arweave-wallet-kit';

import { GRAPHQL_ENDPOINT, THIRDWEB_CLIENT_ID } from '@/config';

const client = new ApolloClient({
	uri: GRAPHQL_ENDPOINT,
	cache: new InMemoryCache(),
});

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<ThirdwebProvider
			activeChain='mumbai'
			clientId={THIRDWEB_CLIENT_ID}
			theme='dark'
		>
			<ApolloProvider client={client}>
				<ArweaveWalletKit
					config={{
						permissions: [
							'ACCESS_ADDRESS',
							'ACCESS_ALL_ADDRESSES',
							'ACCESS_PUBLIC_KEY',
							'DISPATCH',
							'SIGN_TRANSACTION',
						],
						ensurePermissions: true,
					}}
				>
					<ConfigProvider
						theme={{
							algorithm: theme.darkAlgorithm,
							token: {
								colorPrimary: '#8149FC',
								colorPrimaryHover: '#8149FC',
							},
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
							<div className='sticky bottom-0 flex w-full md:hidden'>
								<Sidebar isMobile />
							</div>
						</main>
					</ConfigProvider>
				</ArweaveWalletKit>
			</ApolloProvider>
		</ThirdwebProvider>
	);
};

export default Layout;
