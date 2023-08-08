import React from 'react';
import type { ReactElement } from 'react';
import { Layout } from '@/components';
import type { NextPageWithLayout } from '../_app';
import { useRouter } from 'next/router';
import { VideoPlayer, VideoDetails, Comments } from '@/components/video-page';
import { RecommendedVideos } from '@/sections/video';

import { BlipContext } from '@/components/layout';

import { Video } from '@/types/video';

const VideoPage: NextPageWithLayout = () => {
	const router = useRouter();
	const { video: txId } = router.query;
	const { blipState } = React.useContext(BlipContext);
	const [video, setVideo] = React.useState<Video>();

	React.useEffect(() => {
		console.log('useEffect Start');
		console.log(txId);
		const data = blipState.videos.find(
			(video) => video.transactionId === txId![0]
		);
		console.log(blipState);
		setVideo(data);
		console.log('useEffect End');
	}, [txId, blipState]);

	if (video)
		return (
			<div className='flex flex-col gap-8 lg:flex-row'>
				<div className='w-full basis-2/3'>
					<div className='flex flex-col gap-3'>
						<VideoPlayer {...video} />
						<VideoDetails {...video} />
						<Comments {...video} />
					</div>
				</div>
				<div className='w-full basis-1/3'>
					<RecommendedVideos />
				</div>
			</div>
		);
};

VideoPage.getLayout = function getLayout(children: ReactElement) {
	return <Layout>{children}</Layout>;
};

export default VideoPage;
