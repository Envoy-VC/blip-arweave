import React from 'react';
import { theme, ConfigProvider } from 'antd';
import { Navbar, Sidebar } from '../common';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Toaster } from 'react-hot-toast';
import {
	LivepeerConfig,
	ThemeConfig,
	createReactClient,
	studioProvider,
} from '@livepeer/react';

import { ArweaveWalletKit } from 'arweave-wallet-kit';
import { BlipState } from '../../types/index';

import {
	GRAPHQL_ENDPOINT,
	THIRDWEB_CLIENT_ID,
	LIVEPEER_API_KEY,
} from '@/config';

const client = new ApolloClient({
	uri: GRAPHQL_ENDPOINT,
	cache: new InMemoryCache(),
});

const livepeerClient = createReactClient({
	provider: studioProvider({
		apiKey: LIVEPEER_API_KEY,
	}),
});

const livepeerTheme: ThemeConfig = {
	colors: {
		accent: 'rgb(0, 145, 255)',
		containerBorderColor: 'rgba(0, 145, 255, 0.9)',
	},
	fonts: {
		display: 'Inter',
	},
};

export const BlipContext = React.createContext<{
	blipState: BlipState;
	setBlipState: React.Dispatch<React.SetStateAction<BlipState>>;
}>({
	blipState: { videos: [] },
	setBlipState: () => {},
});

import { getBlipState } from '@/services/warp';

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	const [blipState, setBlipState] = React.useState<BlipState>({ videos: [] });

	React.useEffect(() => {
		getBlipState().then((state) => {
			console.log(state);
			setBlipState(state);
		});
	}, []);

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
							'SIGNATURE',
						],
						ensurePermissions: true,
					}}
				>
					<LivepeerConfig client={livepeerClient} theme={livepeerTheme}>
						<ConfigProvider
							theme={{
								algorithm: theme.darkAlgorithm,
								token: {
									colorPrimary: '#8149FC',
									colorPrimaryHover: '#8149FC',
								},
							}}
						>
							<BlipContext.Provider value={{ blipState, setBlipState }}>
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
									<Toaster position='bottom-center' />
								</main>
							</BlipContext.Provider>
						</ConfigProvider>
					</LivepeerConfig>
				</ArweaveWalletKit>
			</ApolloProvider>
		</ThirdwebProvider>
	);
};

export default Layout;
