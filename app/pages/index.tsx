import type { ReactElement } from 'react';
import { Layout } from '@/components';
import type { NextPageWithLayout } from './_app';

import { VideoCard } from '@/components/common';

import { data } from './[...video]';

const Home: NextPageWithLayout = () => {
	console.log(wrap);
	return (
		<div className='p-8'>
			<div className='flex flex-row flex-wrap items-center justify-center gap-4 lg:justify-start'>
				{Array(6)
					.fill(1)
					.map((video, index) => (
						<VideoCard {...data} key={index} />
					))}
			</div>
		</div>
	);
};

Home.getLayout = function getLayout(children: ReactElement) {
	return <Layout>{children}</Layout>;
};

export default Home;
