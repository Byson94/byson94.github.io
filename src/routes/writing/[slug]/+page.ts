import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const work = await import(`$lib/writing/${params.slug}.md`);
		const rawPost = await import(`$lib/writing/${params.slug}.md?raw`);

		return {
			content: work.default,
			meta: work.metadata,
            headings: work.metadata.headings || [],
		};
	} catch (e) {
		error(404, `Could not find writing: ${params.slug}`);
	}
}

