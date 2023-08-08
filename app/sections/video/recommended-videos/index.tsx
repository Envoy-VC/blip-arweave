import React from 'react';
import { RecommendedCard } from '@/components/video-page';
import { BlipContext } from '@/components/layout';

const RecommendedVideos = () => {
	const { blipState } = React.useContext(BlipContext);
	return (
		<div className='px-4'>
			<div className='mb-6 text-lg font-medium'>You may like</div>
			<div className='flex flex-col gap-4'>
				{blipState.videos.map((video, index) => (
					<RecommendedCard key={index} {...video} />
				))}
			</div>
		</div>
	);
};

export default RecommendedVideos;
