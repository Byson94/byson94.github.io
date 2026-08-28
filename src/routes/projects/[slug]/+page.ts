import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const post = await import(`$lib/project/${params.slug}.md`);
		const rawPost = await import(`$lib/project/${params.slug}.md?raw`);

		const bodyText = rawPost.default.replace(/^---[\s\S]*?---/, '').trim();
		const wordCount = bodyText ? bodyText.split(/\s+/).length : 0;

		return {
			content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		error(404, `Could not find blog post: ${params.slug}`);
	}
}
