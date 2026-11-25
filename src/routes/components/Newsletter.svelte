<script>
	let email = $state('');
	let status = $state('idle'); // 'idle' | 'submitting' | 'success' | 'error'

	async function handleSubmit(event) {
		event.preventDefault();
		status = 'submitting';

		const formData = new FormData();
		formData.append('email_address', email);

		try {
			const res = await fetch('https://app.kit.com/forms/10241785/subscriptions', {
				method: 'POST',
				body: formData,
				headers: { Accept: 'application/json' }
			});

			if (res.ok) {
				status = 'success';
				email = '';
			} else {
				status = 'error';
			}
		} catch {
			status = 'error';
		}
	}
</script>

<section class="py-4">
	<h2 class="font-serif text-2xl tracking-tight text-stone-900 dark:text-stone-100">
		Letters &amp; New Work
	</h2>
	<p class="mt-2 max-w-md text-sm leading-relaxed text-stone-600 dark:text-stone-400">
		Subscribe to get my latest content by email. No spam.
	</p>

	{#if status === 'success'}
		<p role="status" class="mt-5 text-sm font-medium text-emerald-800 dark:text-emerald-400">
			Thank you! Please check your inbox to confirm your subscription.
		</p>
	{:else}
		<form onsubmit={handleSubmit} class="mt-5 flex max-w-md flex-col gap-3 sm:flex-row">
			<label for="email" class="sr-only">Email address</label>
			<input
				id="email"
				type="email"
				name="email_address"
				bind:value={email}
				placeholder="you@example.com"
				required
				class="flex-1 rounded-none border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-800 focus:outline-none focus:ring-0 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-stone-300"
			/>
			<button
				type="submit"
				disabled={status === 'submitting'}
				class="cursor-pointer bg-stone-900 px-5 py-2.5 text-sm font-medium text-stone-50 transition hover:bg-stone-700 disabled:opacity-60 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-stone-300"
			>
				{status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
			</button>
		</form>

		{#if status === 'error'}
			<p role="alert" class="mt-3 text-sm text-red-700 dark:text-red-400">
				Something went wrong. Please try again in a moment.
			</p>
		{/if}
	{/if}
</section>
