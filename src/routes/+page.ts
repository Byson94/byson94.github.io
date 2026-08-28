import { error } from '@sveltejs/kit';

export async function load() {
	try {
		const globbedPosts = import.meta.glob('$lib/blogs/*.md', { eager: true });

		const posts = Object.entries(globbedPosts).map(([filepath, post]) => {
			const slug = filepath.split('/').pop().replace('.md', '');

			return {
				slug,
				meta: post.metadata
			};
		});

		posts.sort((a, b) => new Date(b.meta?.date) - new Date(a.meta?.date));
		posts.splice(3);

		return {
			posts
		};
	} catch (e) {
		error(500, 'Could not fetch blog posts');
	}
}
