<script lang="ts">
    import type { Component } from 'svelte';
	let { icon: Icon, name, class: givenClass }: { icon: any; name: string; class: any } = $props();
</script>

<div class="flex w-fit items-center gap-2 px-3 py-2 outline-1 outline-light">
	<Icon class="h-8 w-8 {givenClass}" />
	<span class="text-xl font-light text-dark dark:text-light">{name}</span>
</div>
