import type { ReactElement } from 'react';
import { Layout } from '@/components';
import type { NextPageWithLayout } from '../_app';
import { useRouter } from 'next/router';
import { VideoPlayer, VideoDetails, Comments } from '@/components/video-page';
import { RecommendedVideos } from '@/sections/video';

import { Video } from '@/types/video';

export const data: Video = {
	creatorAddress: '9WQ7xH2LOuqfAccjGquck8eaKARg1vMhRJaOo3LJL14',
	transactionId: 'K8ZCDPQLa7pxhwL1dT9VSrsXSj_YE37bB0RYK494yhY',
	title: 'Pumpkin Party in Ohio',
	timestamp: 1691405199,
	description:
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis aspernatur unde quod, deserunt velit nisi similique, voluptatum assumenda nulla nesciunt sequi laudantium libero dicta tenetur natus ut odit, animi laborum. Earum quaerat nostrum exercitationem quisquam repellat obcaecati harum iusto impedit. Tempore mollitia ex repudiandae, ratione recusandae in fugit error delectus itaque quae molestiae eos ea maiores quod earum ut adipisci? Recusandae inventore consectetur expedita quia earum, itaque cum, deleniti aliquid autem dolores quas, neque ducimus. Est ratione, iste enim quis soluta eum, dolorum inventore, facere culpa cumque vel tempora cupiditate. Vel iure dolorem veritatis tempora qui exercitationem quos! Quod, fugiat perferendis et fugit placeat molestias delectus? Quas eveniet, aut rerum quam, provident dolorem distinctio necessitatibus veritatis laudantium, mollitia iure? Recusandae. Autem qui dolore sed vel officia perspiciatis quo rerum doloribus totam, voluptatem dolor distinctio, unde architecto repellendus ipsa. Possimus assumenda itaque dolore perferendis ut tempore minus rerum vel facere? Perspiciatis! Sunt magnam rem aut delectus totam harum nobis. Quos totam eum, sint ex unde autem iure ad nisi perferendis nemo sit inventore dolore rem necessitatibus consectetur. Quia quam delectus eius. Quae quam aspernatur obcaecati a vero in ratione, dolorum, impedit pariatur libero vel blanditiis voluptatem nesciunt explicabo molestias illo, laborum officia ipsa velit laboriosam! Id aspernatur repellendus consequuntur qui quibusdam.',
	thumbnail:
		'https://images.unsplash.com/photo-1566220036246-08bc2fc902a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	comments: [
		{
			account: 'M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA',
			content: 'This is a test comment for the following video',
			timestamp: 1691425967,
		},
	],
	reactions: [
		{
			account: 'M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA',
			type: 'like',
		},
	],
};

const VideoPage: NextPageWithLayout = () => {
	const router = useRouter();
	const { video } = router.query;

	return (
		<div className='flex flex-row gap-8'>
			<div className='basis-2/3'>
				<div className='flex flex-col gap-3'>
					<VideoPlayer {...data} />
					<VideoDetails {...data} />
					<Comments comments={data?.comments} />
				</div>
			</div>
			<div className='basis-1/3'>
				<RecommendedVideos />
			</div>
		</div>
	);
};

VideoPage.getLayout = function getLayout(children: ReactElement) {
	return <Layout>{children}</Layout>;
};

export default VideoPage;
