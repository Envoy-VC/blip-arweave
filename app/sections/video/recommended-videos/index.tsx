import React from 'react';
import { RecommendedCard } from '@/components/video-page';

const RecommendedVideos = () => {
	return (
		<div className='px-4'>
			<div className='mb-6 text-lg font-medium'>You may like</div>
			<div className='flex flex-col gap-4'>
				{Array(3)
					.fill(1)
					.map((video, index) => (
						<RecommendedCard key={index} />
					))}
			</div>
		</div>
	);
};

export default RecommendedVideos;
