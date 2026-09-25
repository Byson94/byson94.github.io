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
	<div class="mb-4 rounded-lg p-2">
        <div class="m-8">
            <h1 class="text-center mb-2!">Blog</h1>
            <p class="text-center">Jolting my thoughts down!</p>
        </div>
		<div class="space-y-2">
			{#each data.posts as post}
                <hr class="p-0! m-0! my-6! border-dark/10 dark:border-light/20!" />
				<a
					href="/blog/{post.slug}"
					class="bg-canvas/80 grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg no-underline group"
				>
					<div class="min-w-0">
						<h2
							class="truncate text-base font-semibold text-current group-hover:opacity-80"
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
                        {#if post.meta.date}
                            <time class="self-start text-xs whitespace-nowrap text-current/30 sm:self-center uppercase md:hidden block mt-2">
                                {formatDate(post.meta.date)}
                            </time>
                        {/if}
					</div>
                    {#if post.meta.date}
                        <time class="self-start text-xs whitespace-nowrap text-current/30 sm:self-center uppercase md:block hidden">
                            {formatDate(post.meta.date)}
                        </time>
                    {/if}
				</a>
			{:else}
				<p>No blog posts found.</p>
			{/each}
            <hr class="p-0! m-0! my-6! border-[#262626]!"/>
		</div>
	</div>
</Container>
