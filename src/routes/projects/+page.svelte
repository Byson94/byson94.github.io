<script>
	import Container from '../components/Container.svelte';
	import NavBar from '../components/NavBar.svelte';

	const projects = [
		{
			name: 'Ewwii',
			description:
				'A fork of eww rewritten to be more powerful, performant, flexible, and extensible.',
			tags: ['Rust', 'Wayland', 'Gtk4'],
			href: 'https://github.com/Ewwii-sh/ewwii'
		},
		{
			name: 'Buzzay',
			description: 'A plugin-first wayland compositor focused  stability and eye-candy.',
			tags: ['C', 'Wayland', 'wlroots'],
			href: 'https://github.com/byson94/buzzay'
		},
		{
			name: 'Nbcl',
			description:
				'A general purpose embedded configuration language with scripting capabilities for Rust ecosystem.',
			tags: ['Rust'],
			href: 'https://github.com/NBCL-Lang'
		},
		{
			name: 'Ferrum',
			description: 'A cozy & minimal personal website with chat and forum-like facilities.',
			tags: ['Supabase', 'Svelte'],
			href: 'https://byson94.is-a.dev/ferrum'
		},
		{
			name: 'Theom',
			description: 'A lightweight desktop environment based on i3wm for AxOS.',
			tags: ['Shell', 'X11'],
			href: 'https://github.com/AxOS-Project/Theom'
		},
		{
			name: 'Eiipm',
			description: 'A simple and minimal package manager for ewwii.',
			tags: ['Rust', 'Git'],
			href: 'https://github.com/Ewwii-sh/eiipm'
		},
		{
			name: 'rhai_trace',
			description: 'A rust library made to improve errors that rhai throws.',
			tags: ['Rust'],
			href: 'https://github.com/Byson94/rhai_trace'
		},
		{
			name: 'rusty-exec',
			description: 'A rust program for prototyping with rust quickly, locally, offline.',
			tags: ['Rust'],
			href: 'https://github.com/Byson94/rusty-exec'
		},
		{
			name: 'soshell',
			description:
				'A simple C++ based program for opening and calling exposed symbols in shared object files.',
			tags: ['C++'],
			href: 'https://github.com/Byson94/soshell'
		},
		{
			name: 'Xfsrtray',
			description:
				'A customizable system tray for Linux X11. Its meant to be toggled and is smooth an efficient in that matter compared to other system trays.',
			tags: ['Rust'],
			href: 'https://github.com/Byson94/xfsrtray'
		},
		{
			name: 'GitClone',
			description:
				'An experimental rewrite of core git functions in nodejs for understanding the internals of git.',
			tags: ['NodeJS'],
			href: 'https://github.com/Byson94/gitclone'
		},
		{
			name: 'Biszbo',
			description:
				'An experimental chatapp written in react with MongoDB for message storing and Supabase for authentication.',
			tags: ['React', 'MongoDB', 'Supabase'],
			href: 'https://github.com/Byson94/Biszbo'
		}
	];
</script>

<NavBar />

<Container>
	<div class="mb-4 rounded-lg p-2 outline-1 outline-light">
		<h1>All Projects</h1>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each projects as project}
				<a
					href={project.href}
					class="bg-canvas/80 flex flex-col justify-between rounded-lg p-4 no-underline outline-1 outline-light transition-all duration-200 hover:scale-[1.02]"
				>
					<div class="min-w-0">
						<h2
							class="text-base font-semibold text-current"
							style="margin: 0 !important; margin-top: 0.25rem !important;"
						>
							{project.name}
						</h2>
						{#if project.description}
							<p
								class="mt-1 line-clamp-2 text-sm text-current/70"
								style="margin: 0 !important; margin-top: 0.25rem !important;"
							>
								{project.description}
							</p>
						{/if}
					</div>

					{#if project.tags && project.tags.length > 0}
						<div class="mt-4 flex flex-wrap gap-1.5">
							{#each project.tags as tag}
								<span
									class="rounded-full px-2 py-0.5 text-xs font-medium text-current/80 outline-1 outline-light"
								>
									{tag}
								</span>
							{/each}
						</div>
					{/if}
				</a>
			{/each}
		</div>
	</div></Container
>
