import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const post = await import(`$lib/blogs/${params.slug}.md`);
		const rawPost = await import(`$lib/blogs/${params.slug}.md?raw`);

		const bodyText = rawPost.default.replace(/^---[\s\S]*?---/, '').trim();
		const wordCount = bodyText ? bodyText.split(/\s+/).length : 0;
		const readingTime = Math.ceil(wordCount / 200);

		return {
			content: post.default,
			meta: post.metadata,
			readingTime
		};
	} catch (e) {
		error(404, `Could not find blog post: ${params.slug}`);
	}
}
