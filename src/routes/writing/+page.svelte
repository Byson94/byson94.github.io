<script>
	import Container from '../components/Container.svelte';
	import NavBar from '../components/NavBar.svelte';
    import Footer from '../components/Footer.svelte';
    import Newsletter from '../components/Newsletter.svelte';

	let { data } = $props();

    let activeTab = $state('all');
    let sortOrder = $state('newest');
    let selectedCollection = $state(null);

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

    let collections = $derived.by(() => {
        const groups = {};
        for (const work of data.works) {
            if (!work.collection) continue;
            if (!groups[work.collection]) {
                groups[work.collection] = [];
            }
            groups[work.collection].push(work);
        }
        return Object.entries(groups).map(([name, items]) => ({
            name,
            items,
            count: items.length,
            cover: items.find((i) => i.cover)?.cover || null,
            date: items[0]?.date
        }));
    });

    let filteredWorks = $derived.by(() => {
        if (activeTab === 'all') return data.works;
        return data.works.filter((work) => work.category === activeTab);
    });

    let sortedWorks = $derived.by(() => {
        let list = [...filteredWorks];
        return list.sort((a, b) => {
            const dateA = new Date(a.date || 0).getTime();
            const dateB = new Date(b.date || 0).getTime();
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });
    });
</script>

<NavBar />

<Container>
	<div class="mb-4 rounded-lg p-2">
        <div class="m-8">
            <h1 class="text-center mb-2! mt-5">Writing</h1>
            <p class="text-center text-current/70">My literary works, books, and researches.</p>
        </div>

        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 my-6 border-b border-dark/10 dark:border-light/20 pb-4">
            <div class="w-full overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <div class="inline-flex space-x-1 rounded-full bg-neutral-300/50 p-1 dark:bg-white/10">
                    {#each ['all', 'research', 'books', 'poetry', 'collections'] as tab}
                        <button 
                            class="rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer {activeTab === tab ? 'bg-neutral-300/80 dark:bg-black/40 text-current' : 'hover:bg-neutral-300/80 dark:hover:bg-black/40'}"
                            onclick={() => {
                                activeTab = tab;
                                selectedCollection = null;
                            }}>
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    {/each}
                </div>
            </div>

            <div class="flex items-center gap-2 text-sm text-current/70">
                <span class="whitespace-nowrap">Sort by:</span>
                <select 
                    bind:value={sortOrder} 
                    class="border border-dark/20 dark:border-light/20 rounded-md px-3 py-1 pr-8 text-sm focus:ring-0 focus:outline-none text-current bg-[length:1rem_1rem] cursor-pointer dark:bg-neutral-900 dark:text-white"
                >
                    <option value="newest" class="text-current dark:bg-neutral-900 dark:text-white">Newest First</option>
                    <option value="oldest" class="text-current dark:bg-neutral-900 dark:text-white">Oldest First</option>
                </select>
            </div>
        </div>

        {#if activeTab === 'collections'}
            {#if selectedCollection}
                <div class="mb-6 flex items-center justify-between border-b border-dark/10 dark:border-light/20 pb-3">
                    <button 
                        onclick={() => selectedCollection = null}
                        class="text-sm text-current/70 hover:text-current flex items-center gap-1.5 cursor-pointer"
                    >
                        &lArr; Back to Collections
                    </button>
                    <span class="text-xs font-mono uppercase tracking-wider text-current/50">
                        {selectedCollection.name} ({selectedCollection.count})
                    </span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {#each selectedCollection.items as work (work.slug || work.title)}
                        <a 
                            href="/writing/{work.slug}"
                            class="bg-canvas/80 border border-dark/30 dark:border-light/30 transition-all dark:hover:border-light hover:border-dark rounded-xl overflow-hidden shadow-xs transition-colors flex flex-col group no-underline"
                        >
                            <div class="aspect-[3/4] bg-dark/5 dark:bg-light/5 overflow-hidden relative">
                                {#if work.cover}
                                    <img 
                                        src={work.cover} 
                                        alt={work.title} 
                                        class="absolute inset-0 w-full h-full object-cover" 
                                    />
                                {:else}
                                    <div class="flex flex-col justify-center h-full text-center my-auto bg-[#f4ebd0] dark:bg-[#2b241e] text-[#4a3b32] dark:text-[#e6dcc3] relative overflow-hidden gap-1 p-6">
                                        <span class="text-base text-current line-clamp-4 leading-snug font-serif font-medium tracking-tight break-words">
                                            {work.title}
                                        </span>
                                        <span class="text-xs uppercase tracking-widest text-current/40 font-mono mb-3">
                                            {work.category} {work.date ? `- ${new Date(work.date).getFullYear()}` : ''}
                                        </span>
                                    </div>
                                {/if}
                                <div class="absolute top-3 left-3 flex flex-row gap-2">
                                    <span class="rounded-full px-2 py-0.5 text-xs font-medium text-current/80 outline-1 outline-light uppercase">
                                        {work.category}
                                    </span>
                                </div>
                            </div>

                            <div class="p-4 flex flex-col flex-grow justify-between">
                                <div>
                                    {#if work.date}
                                        <time class="text-xs text-current/50 uppercase tracking-wider block mb-1">
                                            {formatDate(work.date)}
                                        </time>
                                    {/if}
                                    <h2 class="text-base font-semibold text-current flex items-center justify-between" style="margin: 0 !important;">
                                        {work.title}
                                    </h2>
                                    {#if work.description}
                                        <p class="mt-1 line-clamp-2 text-sm text-current/70" style="margin: 0 !important; margin-top: 0.25rem !important;">
                                            {work.description}
                                        </p>
                                    {/if}
                                </div>
                            </div>
                        </a>
                    {/each}
                </div>
            {:else}
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {#each collections as folder (folder.name)}
                        <button
                            onclick={() => selectedCollection = folder}
                            class="text-left bg-canvas/80 border border-dark/30 dark:border-light/30 hover:border-dark dark:hover:border-light rounded-xl overflow-hidden shadow-xs transition-colors flex flex-col group cursor-pointer"
                        >
                            <div class="aspect-[3/4] bg-[#f4ebd0] dark:bg-[#2b241e] text-[#4a3b32] dark:text-[#e6dcc3] p-6 flex flex-col justify-between relative border-b border-[#d8c5a2] dark:border-[#3e332a]">
                                <div class="flex items-center justify-between opacity-70">
                                    <span class="text-[10px] font-mono uppercase tracking-widest">Collection</span>
                                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                                    </svg>
                                </div>

                                <div class="my-auto py-4">
                                    <h3 class="text-lg font-serif font-medium tracking-tight leading-snug break-words">
                                        {folder.name}
                                    </h3>
                                </div>

                                <div class="pt-3 border-t border-[#d8c5a2] dark:border-[#3e332a] flex justify-between items-center text-[11px] font-mono opacity-75">
                                    <span>{folder.count} {folder.count === 1 ? 'piece' : 'pieces'}</span>
                                </div>
                            </div>
                        </button>
                    {:else}
                        <p class="col-span-full text-center text-current/50 py-12">No collections created yet.</p>
                    {/each}
                </div>
            {/if}
        {:else}
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {#each sortedWorks as work (work.slug || work.title)}
                    <a 
                        href="/writing/{work.slug}"
                        class="bg-canvas/80 border border-dark/30 dark:border-light/30 transition-all dark:hover:border-light hover:border-dark rounded-xl overflow-hidden shadow-xs transition-colors flex flex-col group no-underline"
                    >
                            <div class="aspect-[3/4] bg-dark/5 dark:bg-light/5 overflow-hidden relative">
                                {#if work.cover}
                                    <img 
                                        src={work.cover} 
                                        alt={work.title} 
                                        class="absolute inset-0 w-full h-full object-cover" 
                                    />
                                {:else}
                                    <div class="flex flex-col justify-center h-full text-center my-auto bg-[#f4ebd0] dark:bg-[#2b241e] text-[#4a3b32] dark:text-[#e6dcc3] relative overflow-hidden gap-1 p-6">
                                        <span class="text-base text-current line-clamp-4 leading-snug font-serif font-medium tracking-tight break-words">
                                            {work.title}
                                        </span>
                                        <span class="text-xs uppercase tracking-widest text-current/40 font-mono mb-3">
                                            {work.category} - {new Date(work.date).getFullYear()}
                                        </span>
                                    </div>
                                {/if}
                                <div class="absolute top-3 left-3 flex flex-row gap-2">
                                    <span class="rounded-full px-2 py-0.5 text-xs font-medium text-current/80 outline-1 outline-light uppercase">
                                        {work.category}
                                    </span>
                                    {#if work.collection}
                                    <span class="rounded-full px-2 py-0.5 text-xs font-medium text-current/80 outline-1 outline-light uppercase">
                                        COL:{work.collection}
                                    </span>
                                    {/if}
                                </div>
                            </div>

                        <div class="p-4 flex flex-col flex-grow justify-between">
                            <div>
                                {#if work.date}
                                    <time class="text-xs text-current/50 uppercase tracking-wider block mb-1">
                                        {formatDate(work.date)}
                                    </time>
                                {/if}
                                <h2 class="text-base font-semibold text-current flex items-center justify-between" style="margin: 0 !important;">
                                    {work.title}
                                </h2>
                                {#if work.description}
                                    <p class="mt-1 line-clamp-2 text-sm text-current/70" style="margin: 0 !important; margin-top: 0.25rem !important;">
                                        {work.description}
                                    </p>
                                {/if}
                            </div>
                        </div>
                    </a>
                {:else}
                    <p class="col-span-full text-center text-current/50 py-12">No writings found in this category.</p>
                {/each}
            </div>
        {/if}

        <div class="mx-auto mt-16 mb-10 max-w-3xl rounded-xl border border-dark/15 bg-neutral-200/40 px-6 py-4 dark:border-light/15 dark:bg-white/[0.04]">
            <Newsletter />
        </div>
	</div>
</Container>

<Footer />
