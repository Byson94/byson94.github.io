<script>
	import Container from '../components/Container.svelte';
	import NavBar from '../components/NavBar.svelte';

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
		<h1>All Posts</h1>
		<div class="space-y-2">
			{#each data.posts as post}
				<a
					href="/blog/{post.slug}"
					class="bg-canvas/80 grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg p-4 no-underline outline-1 outline-light"
				>
					<div class="min-w-0">
						<h2
							class="truncate text-base font-semibold text-current"
							style="margin: 0 !important; margin-top: 0.25rem !important;"
						>
							{post.meta.title}
						</h2>
						{#if post.meta?.description}
							<p
								class="mt-1 line-clamp-1 text-sm text-current/70"
								style="margin: 0 !important; margin-top: 0.25rem !important;"
							>
								{post.meta.description}
							</p>
						{/if}
					</div>

					{#if post.meta.date}
						<time class="self-start text-xs whitespace-nowrap text-current/50 sm:self-center">
							{formatDate(post.meta.date)}
						</time>
					{/if}
				</a>
			{:else}
				<p>No blog posts found.</p>
			{/each}
		</div>
	</div>
</Container>
