<script>
	import Container from '../../components/Container.svelte';
	import NavBar from '../../components/NavBar.svelte';

	let { data } = $props();
</script>

<NavBar />

<Container>
	<article class="prose w-full max-w-none rounded-lg p-2 outline-1 outline-light dark:prose-invert">
		{#if data.meta}
			<h1 class="mb-5!">{data.meta.title}</h1>
			<hr />
		{/if}

		<data.content />
	</article>
</Container>
