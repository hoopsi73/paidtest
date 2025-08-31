import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';

export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
	const { slug } = await params;

	let fullSlug = slug ? slug.join('/') : 'home';

	let sbParams = {
		version: 'draft',
	};

	try {
	const storyblokApi = getStoryblokApi();
	let { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, sbParams);

	return <StoryblokStory story={data.story} />;
	} catch (error) {
		console.error('Storyblok API Error:', error);
		return (
			<div style={{ padding: '20px', textAlign: 'center' }}>
				<h1>Content Loading Error</h1>
				<p>Unable to load content from Storyblok. Please check your access token.</p>
			</div>
		);
	}
}
