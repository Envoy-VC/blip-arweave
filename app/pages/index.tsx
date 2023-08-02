import type { ReactElement } from 'react';
import { Layout } from '@/components';
import type { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
	return <p>hello world</p>;
};

Home.getLayout = function getLayout(children: ReactElement) {
	return <Layout>{children}</Layout>;
};

export default Home;
