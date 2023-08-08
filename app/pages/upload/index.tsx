import React from 'react';
import type { ReactElement } from 'react';
import { Layout } from '@/components';
import type { NextPageWithLayout } from '../_app';

import { useActiveAddress } from 'arweave-wallet-kit';

import { UploadStepper } from '@/components/upload';
import { Fund, License, BasicDetails, Finalize } from '@/sections/upload';
import { SEO } from '@/components/common';
import { DefaultTags } from '@/config';

import { UploadFormProps } from '@/types';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export enum StepType {
	FUND = 0,
	LICENSE,
	BASIC_DETAILS,
	FINALIZE,
}

export const UploadContext = React.createContext<{
	uploadForm: UploadFormProps;
	setUploadForm: React.Dispatch<React.SetStateAction<UploadFormProps>>;
}>({
	uploadForm: {
		step: StepType.FUND,
		tags: DefaultTags,
	},
	setUploadForm: () => {},
});

const Upload: NextPageWithLayout = () => {
	const arAddress = useActiveAddress();

	const [uploadForm, setUploadForm] = React.useState<UploadFormProps>({
		step: StepType.FUND,
		tags: DefaultTags,
	});

	if (!arAddress) {
		return (
			<>
				<SEO />

				<div className='mt-16 text-lg font-semibold text-center'>
					Connect Arweave Wallet to Upload Videos
				</div>
			</>
		);
	}

	if (arAddress)
		return (
			<UploadContext.Provider
				value={{
					uploadForm: uploadForm,
					setUploadForm: setUploadForm,
				}}
			>
				<>
					<SEO />
					<div
						className={`flex flex-col justify-start w-full gap-4 mx-auto max-w-screen-2xl ${inter.className}`}
					>
						<UploadStepper />
						<div className='mt-8'>
							{uploadForm.step === StepType.FUND && <Fund />}
							{uploadForm.step === StepType.LICENSE && <License />}
							{uploadForm.step === StepType.BASIC_DETAILS && <BasicDetails />}
							{uploadForm.step === StepType.FINALIZE && <Finalize />}
						</div>
					</div>
				</>
			</UploadContext.Provider>
		);
};

Upload.getLayout = function getLayout(children: ReactElement) {
	return <Layout>{children}</Layout>;
};

export default Upload;
