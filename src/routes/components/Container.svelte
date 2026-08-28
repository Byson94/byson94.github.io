<script>
	let { children } = $props();
</script>

<div
	class="text-fg-color dark:text-fg-color mx-auto my-[0.6em] prose w-full max-w-[70vw] break-words dark:prose-invert"
>
	{@render children()}
</div>
