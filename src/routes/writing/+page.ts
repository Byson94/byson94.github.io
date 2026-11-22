import { error } from '@sveltejs/kit';

export async function load() {
	try {
		const globbedWorks = import.meta.glob('$lib/writing/*.md', { eager: true });

		const works = Object.entries(globbedWorks).map(([filepath, post]) => {
			const slug = filepath.split('/').pop().replace('.md', '');

			return {
				slug,
				...post.metadata
			};
		});

		works.sort((a, b) => new Date(b.meta?.date) - new Date(a.meta?.date));

        return {
            works
        };
	} catch (e) {
		error(500, 'Could not fetch writings');
	}
}

