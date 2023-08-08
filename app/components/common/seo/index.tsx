import React from 'react';
import { NextSeo } from 'next-seo';

const description =
	'Upload and store your videos securely on the blockchain, ensuring permanence.';

export const seoData = {
	title: undefined,
	description:
		'Upload and store your videos securely on the blockchain, ensuring permanence.',
	ogImage: 'https://i.ibb.co/6rqcSv8/og.png',
};

interface Props {
	title?: string;
	description?: string;
	ogImage?: string;
}

const SEO = ({
	title = seoData.title,
	description = seoData.description,
	ogImage = seoData.ogImage,
}: Props) => {
	return (
		<NextSeo
			title={title}
			titleTemplate='%s | Blip'
			defaultTitle='Blip'
			description={description}
			openGraph={{
				url: 'https://blip-play.vercel.app/',
				title: 'Blip',
				description:
					'Upload and store your videos securely on the blockchain, ensuring permanence. Manage content rights effortlessly with the Universal Data License.',
				images: [
					{
						url: ogImage,
						width: 1200,
						height: 630,
						alt: 'Blip OG Image',
						type: 'image/png',
					},
				],
				siteName: 'Blip',
			}}
			twitter={{
				handle: '@Envoy_1084',
				site: '@Envoy_1084',
				cardType: 'summary_large_image',
			}}
		/>
	);
};

export default SEO;
