<script>
	import Container from '../../components/Container.svelte';
	import NavBar from '../../components/NavBar.svelte';
    import Footer from '../../components/Footer.svelte';

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
    <div class="mt-10 flex" id="page"> 
        <article class="prose mx-auto w-full max-w-2xl p-2 dark:prose-invert">
            {#if data.meta}
                <h1 class="mb-1!">{data.meta.title}</h1>

                <div class="text-current/70 flex items-center space-x-2 text-sm mb-1">
                    {#if data.meta.date}
                        <time datetime={data.meta.date}>{formatDate(data.meta.date)}</time>
                    {/if}

                    {#if data.meta.date && data.meta.category}
                        <span>-</span>
                    {/if}

                    {#if data.meta.category}
                        <span class="uppercase">
                            {data.meta.category}
                        </span>
                    {/if}
                </div>


                <hr class="border-dark/10 dark:border-light/20!" />
            {/if}

            <div class={data.meta?.category === 'poetry' ? 'whitespace-pre-line font-serif text-lg leading-relaxed' : ''}>
                <data.content />
            </div>
        </article>
    </div>
</Container>

<Footer />


