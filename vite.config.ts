import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import remarkHeadings from '@vcarl/remark-headings';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex-svelte';
import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import { codeToHtml } from 'shiki';
import GithubSlugger from 'github-slugger';

/** Plugin to expose extracted headings inside mdsvex metadata */
    function attachHeadingsToMeta() {
    return (tree, vfile) => {
        vfile.data.fm = vfile.data.fm || {};
        if (vfile.data.headings) {
            const slugger = new GithubSlugger();

            vfile.data.fm.headings = vfile.data.headings.map((h) => ({
                id: slugger.slug(h.value),
                text: h.value,
                depth: h.depth
            }));
        }
    };
}

export default defineConfig({
	plugins: [
		tailwindcss(),
		Icons({ compiler: 'svelte' }),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			preprocess: [mdsvex({ 
                extensions: ['.svx', '.md'],
                remarkPlugins: [remarkHeadings, attachHeadingsToMeta, remarkMath],
                rehypePlugins: [rehypeSlug, rehypeKatex],
                highlight: {
                    highlighter: async (code, lang = 'text') => {
                        let html;
                        let themes = {
                            dark: 'dark-plus',
                            light: 'catppuccin-latte'
                        };

                        try {
                            html = await codeToHtml(code, {
                                lang,
                                themes: themes,
                            });
                        } catch (e) {
                             html = await codeToHtml(code, {
                                lang: "text",
                                themes: themes,
                            });
                        }
                        return `{@html ${JSON.stringify(html)}}`;
                    }
                }
            })],
			extensions: ['.svelte', '.svx', '.md']
		})
	]
});
