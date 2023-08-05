import React from 'react';
import type { ReactElement } from 'react';
import { Layout } from '@/components';
import type { NextPageWithLayout } from '../_app';

import { UploadStepper } from '@/components/upload';
import { License } from '@/sections/upload';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Upload: NextPageWithLayout = () => {
	return (
		<div
			className={`flex flex-col justify-start w-full gap-4 mx-auto max-w-screen-2xl ${inter.className}`}
		>
			<UploadStepper />
			<div className='mt-8'>
				<License />
			</div>
		</div>
	);
};

Upload.getLayout = function getLayout(children: ReactElement) {
	return <Layout>{children}</Layout>;
};

export default Upload;
