import React from 'react';
import { Player } from '@livepeer/react';

import { Image } from 'antd';

import { Video } from '@/types/video';

interface Props {
	title: string;
	thumbnailId: string;
	videoId: string;
}

const VideoPlayer = ({ title, transactionId, thumbnail }: Video) => {
	return (
		<div className='max-w-[1124px]'>
			<Player
				title={title}
				playbackId={transactionId}
				objectFit='cover'
				theme={{
					borderStyles: {
						containerBorderStyle: undefined,
					},
					colors: {
						accent: '#7E4AFD',
					},
					radii: {
						containerBorderRadius: '1rem',
					},
				}}
				aspectRatio='16to9'
				showPipButton
			/>
		</div>
	);
};

export default VideoPlayer;
