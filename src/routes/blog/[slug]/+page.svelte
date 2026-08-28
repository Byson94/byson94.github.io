<script>
	import Container from '../../components/Container.svelte';
	import NavBar from '../../components/NavBar.svelte';

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
	<article class="prose w-full max-w-none rounded-lg p-2 outline-1 outline-light dark:prose-invert">
		{#if data.meta}
			<h1 class="mb-0!">{data.meta.title}</h1>
            <p>{data.meta.description}</p>

			<div class="text-current/70 mb-4 flex items-center space-x-2 text-sm">
				{#if data.meta.date}
					<time datetime={data.meta.date}>{formatDate(data.meta.date)}</time>
				{/if}

				{#if data.meta.date && data.readingTime}
					<span>-</span>
				{/if}

				{#if data.readingTime}
					<span>{data.readingTime} minute read</span>
				{/if}
			</div>

			<hr />
		{/if}

		<data.content />
	</article>
</Container>
