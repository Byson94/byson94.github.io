<script>
	import Container from './components/Container.svelte';
	import NavBar from './components/NavBar.svelte';
	import About from '$lib/about.md';

	import EwwiiBanner from '$lib/assets/ewwii-runtime.webp';
	import BuzzayBanner from '$lib/assets/buzzay.webp';
	import NbclBanner from '$lib/assets/nbcl.webp';

	import TechItem from './components/TechItem.svelte';
	import Rust from '~icons/devicon/rust';
	import CLang from '~icons/devicon/c';
	import Python from '~icons/devicon/python';
	import TypeScript from '~icons/devicon/typescript';
	import Golang from '~icons/devicon/go';
	import Ziglang from '~icons/devicon/zig';
	import SvelteFramework from '~icons/devicon/svelte';
	import AstroFramework from '~icons/devicon/astro';
	import TailwindCSS from '~icons/devicon/tailwindcss';
	import Markdown from '~icons/devicon/markdown';
	import Latex from '~icons/devicon/latex';
	import GitTool from '~icons/devicon/git';
	import GitHub from '~icons/devicon/github';
	import GhActions from '~icons/devicon/githubactions';
	import Docker from '~icons/devicon/docker';
	import Mongodb from '~icons/devicon/mongodb';
	import Supabase from '~icons/devicon/supabase';
	import Vercel from '~icons/devicon/vercel';

	const projects = [
		{
			name: 'Ewwii',
			description:
				'A fork of eww rewritten to be more powerful, performant, flexible, and extensible.',
			tags: ['Rust', 'Wayland', 'Gtk4'],
			href: '/projects/ewwii/',
			img: EwwiiBanner
		},
		{
			name: 'Buzzay',
			description: 'A plugin-first wayland compositor.',
			tags: ['C', 'Wayland', 'wlroots'],
			href: '/projects/buzzay/',
			img: BuzzayBanner
		},
		{
			name: 'NBCL',
			description:
				'A general purpose embedded configuration language with scripting capabilities for Rust ecosystem.',
			tags: ['Rust'],
			href: '/projects/nbcl/',
			img: NbclBanner
		}
	];

	let { data } = $props();

	function formatDate(dateString) {
		if (!dateString) return '';
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			timeZone: 'UTC'
		}).format(date);
	}
</script>

<NavBar />

<Container>
	<div class="mb-4 rounded-lg p-2 outline-1 outline-light">
		<About />
	</div>

	<div class="mb-4 rounded-lg p-2 outline-1 outline-light">
		<h1>Tech Stack</h1>
		<div class="grid grid-cols-1 gap-10 md:grid-cols-2">
			<div>
				<p class="border-b-1">Programming Languages</p>
				<div class="flex flex-wrap gap-2">
					<TechItem icon={Rust} name="Rust" class="dark:invert" />
					<TechItem icon={CLang} name="C" />
					<TechItem icon={TypeScript} name="TypeScript" />
					<TechItem icon={Python} name="Python" />
				</div>
			</div>
			<div>
				<p class="border-b-1">Tools & Platforms</p>
				<div class="flex flex-wrap gap-2">
					<TechItem icon={GitTool} name="Git" />
					<TechItem icon={GitHub} name="GitHub" class="dark:invert" />
					<TechItem icon={Docker} name="Docker" />
					<TechItem icon={GhActions} name="GitHub Actions" />
				</div>
			</div>
			<div>
				<p class="border-b-1">Database & Hosting</p>
				<div class="flex flex-wrap gap-2">
					<TechItem icon={Mongodb} name="MongoDB" />
					<TechItem icon={Supabase} name="Supabase" />
					<TechItem icon={Vercel} name="Vercel" />
					<TechItem icon={GitHub} name="GitHub Pages" , class="dark:invert" />
				</div>
			</div>
			<div>
				<p class="border-b-1">Web & Markup</p>
				<div class="flex flex-wrap gap-2">
					<TechItem icon={SvelteFramework} name="Svelte" />
					<TechItem icon={AstroFramework} name="Astro" />
					<TechItem icon={TailwindCSS} name="Tailwind CSS" />
					<TechItem icon={Markdown} name="Markdown" class="dark:invert" />
					<TechItem icon={Latex} name="LaTeX" class="dark:invert" />
				</div>
			</div>
			<div>
				<p class="border-b-1">Currently Exploring</p>
				<div class="flex flex-wrap gap-2">
					<TechItem icon={Golang} name="Go" />
					<TechItem icon={Ziglang} name="Zig" />
				</div>
			</div>
		</div>
	</div>

	<div class="mb-4 rounded-lg p-2 outline-1 outline-light">
		<h1>Featured Projects</h1>
		<div class="flex flex-col gap-4">
			{#each projects as project}
				<a href={project.href} class="no-underline">
					<div
						class="group bg-background relative col-span-3 flex min-h-[300px] transform-gpu flex-col justify-between overflow-hidden rounded-xl [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] outline-1 outline-light [border:1px_solid_rgba(255,255,255,.1)] sm:min-h-[400px] md:min-h-[500px]"
					>
						<div>
							<img
								class="absolute top-0 left-0 m-0! h-full w-full border-none object-cover opacity-90 transition-all duration-300 ease-out group-hover:scale-105"
								src={project.img}
								alt=""
							/>
							<div
								class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
							></div>
						</div>
						<div
							class="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-4"
						>
							<h2 style="margin: 0 !important; margin-top: 0.25rem !important;" class="text-white">
								{project.name}
							</h2>
							<div class="mt-2 mb-2 flex gap-2">
								{#each project.tags as tag}
									<p
										class="rounded-full pr-3 pl-3 text-white outline-1 outline-light"
										style="margin: 0 !important; margin-top: 0.25rem !important;"
									>
										{tag}
									</p>
								{/each}
							</div>
							<p
								class="text-white/70"
								style="margin: 0 !important; margin-top: 0.25rem !important;"
							>
								{project.description}
							</p>
							<div
								class="group grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]"
							>
								<div class="overflow-hidden">
									<p
										class="text-white opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100"
										style="margin: 0 !important;"
									>
										Learn more...
									</p>
								</div>
							</div>
						</div>
					</div>
				</a>
			{/each}

			<a class="text-center" href="/projects/">See more</a>
		</div>
	</div>
</Container>
