import React from 'react';
import type { ReactElement } from 'react';
import { Layout } from '@/components';
import type { NextPageWithLayout } from './_app';

import { BlipContext } from '@/components/layout';

import { VideoCard } from '@/components/common';

const Home: NextPageWithLayout = () => {
	const { blipState } = React.useContext(BlipContext);
	return (
		<div className='p-8'>
			<div className='flex flex-row flex-wrap items-center justify-center gap-4 lg:items-start lg:justify-start'>
				{blipState.videos.map((video, index) => (
					<VideoCard {...video} key={index} />
				))}
			</div>
		</div>
	);
};

Home.getLayout = function getLayout(children: ReactElement) {
	return <Layout>{children}</Layout>;
};

export default Home;
