import type { ReactElement } from 'react';
import { Layout } from '@/components';
import type { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
	return <div>hello world</div>;
};

Home.getLayout = function getLayout(children: ReactElement) {
	return <Layout>{children}</Layout>;
};

export default Home;
