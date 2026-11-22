import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
        const globbedWorks = import.meta.glob('$lib/writing/*.md', { eager: true });
		const work = await import(`$lib/writing/${params.slug}.md`);
		const rawPost = await import(`$lib/writing/${params.slug}.md?raw`);
        const allWorks = Object.entries(globbedWorks).map(([path, mod]: [string, any]) => {
            const slug = path.split('/').pop()?.replace('.md', '');
            return { slug, ...mod.metadata };
        });

		return {
			content: work.default,
			meta: work.metadata,
            slug: params.slug,
            allWorks
		};
	} catch (e) {
		error(404, `Could not find writing: ${params.slug}`);
	}
}

