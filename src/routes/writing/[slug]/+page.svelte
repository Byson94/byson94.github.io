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

    let similarWorks = $derived.by(() => {
        if (!data.allWorks || !data.meta) return [];

        const sameGroup = data.allWorks
            .filter((work) => work.category === data.meta.category)
            .sort((a, b) => new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime());

        if (sameGroup.length <= 5) {
            return sameGroup.filter((w) => w.slug !== data.slug);
        }

        const currentIndex = sameGroup.findIndex((w) => w.slug === data.slug);
        if (currentIndex === -1) return [];

        let targetBefore = 1;
        let targetAfter = 4;

        let start = currentIndex - targetBefore;
        let end = currentIndex + targetAfter;

        if (end >= sameGroup.length) {
            let overflow = end - (sameGroup.length - 1);
            start = Math.max(0, start - overflow);
            end = sameGroup.length - 1;
        }

        if (start < 0) {
            let underflow = 0 - start;
            end = Math.min(sameGroup.length - 1, end + underflow);
            start = 0;
        }

        return sameGroup
            .slice(start, end + 1)
            .filter((w) => w.slug !== data.slug);
    });
</script>

<NavBar />

<Container>
    <div class="mt-10 flex" id="page"> 
        <article class="prose w-full max-w-none p-2 dark:prose-invert">
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
        <aside class="toc-sidebar w-[260px] shrink-0 pl-6 border-l border-dark/10 dark:border-light/20 md:block hidden">
            <nav class="sticky top-18">
                <h3 class="text-base font-mono uppercase tracking-widest text-current mb-4">
                    Similar Works
                </h3>
                <ul class="list-none p-0 space-y-4">
                    {#each similarWorks as work (work.slug)}
                        <li>
                            <a href="/writing/{work.slug}" class="group block no-underline">
                                <span class="block text-sm font-medium no-underline text-current/70 group-hover:text-current transition-colors leading-snug">
                                    {work.title}
                                </span>
                                {#if work.date}
                                    <time class="text-[11px] text-current/40 group-hover:text-current/70 mt-0.5 block transition-colors">
                                        {formatDate(work.date)}
                                    </time>
                                {/if}
                            </a>
                        </li>
                    {:else}
                        <li class="text-xs text-current/40 italic">
                            No other works in this shelf yet.
                        </li>
                    {/each}
                </ul>
            </nav>
        </aside>
    </div>
</Container>

<Footer />


