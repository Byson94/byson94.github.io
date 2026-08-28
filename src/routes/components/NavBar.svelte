<script>
	import { page } from '$app/state';

	let checkboxEl = $state(null);
    let y = $state(0);
	let lastY = $state(0);
	let isHidden = $state(false);

	function applyTheme(theme) {
		const root = document.documentElement;

		if (theme === 'dark') {
			root.classList.add('dark-mode');
			root.classList.remove('light-mode');
		} else {
			root.classList.add('light-mode');
			root.classList.remove('dark-mode');
		}
	}

	$effect(() => {
        if (y > lastY && y > 60) {
			isHidden = true;
		} else if (y < lastY) {
			isHidden = false;
		}
		lastY = y;

		const saved = localStorage.getItem('theme') || 'dark';
		applyTheme(saved);

		if (checkboxEl) {
			checkboxEl.checked = saved === 'light';
		}
	});

	function toggleTheme(e) {
		const isLight = e.target.checked;
		const theme = isLight ? 'light' : 'dark';
		applyTheme(theme);
		localStorage.setItem('theme', theme);
	}
</script>

<svelte:window bind:scrollY={y} />

<div
	class="bg-canvas/90 sticky top-2 z-50 m-1 md:m-5 grid grid-cols-[auto_1fr_auto] md:grid-cols-3 items-center rounded-lg p-2 outline-1 outline-light backdrop-blur-md select-none transition-transform duration-300 {isHidden ? '-translate-y-24' : 'translate-y-0'}"
>
	<a href="/" class="justify-self-start font-bold text-black no-underline dark:text-white"
		>Nilay Byju</a
	>

	<div class="inline-flex space-x-1 justify-self-end md:justify-self-center mr-1 md:mr-0 rounded-full bg-neutral-300/50 p-1 dark:bg-white/10">
		<a
			href="/"
			class="rounded-full px-1 md:px-3 py-1 text-sm font-medium transition-colors hover:bg-neutral-300/80 dark:hover:bg-black/40"
			>Home</a
		>
		<a
			href="/projects/"
			class="rounded-full px-1 md:px-3 py-1 text-sm font-medium transition-colors hover:bg-neutral-300/80 dark:hover:bg-black/40"
			>Projects</a
		>
		<a
			href="/blog/"
			class="rounded-full px-1 md:px-3 py-1 text-sm font-medium transition-colors hover:bg-neutral-300/80 dark:hover:bg-black/40"
			>Blog</a
		>
	</div>

	<div class="flex items-center justify-self-end">
		<label class="swap-rotate cursor-pointer">
			<!-- Hidden checkbox controls the state -->
			<input
				bind:this={checkboxEl}
				type="checkbox"
				class="theme-controller"
				onchange={toggleTheme}
			/>

			<!-- Moon icon -->
			<svg
				class="swap-on h-5 w-5 fill-current"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
			>
				<path
					d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
				/>
			</svg>

			<!-- Sun icon -->
			<svg
				class="swap-off h-5 w-5 fill-current"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
			>
				<path
					d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
				/>
			</svg>
		</label>
	</div>
</div>

<style>
	.swap-rotate {
		position: relative;
		display: inline-grid;
	}

	.swap-rotate input {
		display: none;
	}

	.swap-on,
	.swap-off {
		grid-column: 1;
		grid-row: 1;
		transition:
			transform 0.3s ease,
			opacity 0.3s ease;
	}

	.swap-off {
		transform: rotate(0deg);
		opacity: 1;
	}

	.swap-on {
		transform: rotate(45deg);
		opacity: 0;
	}

	.swap-rotate input:checked ~ .swap-on {
		transform: rotate(0deg);
		opacity: 1;
	}

	.swap-rotate input:checked ~ .swap-off {
		transform: rotate(-45deg);
		opacity: 0;
	}
</style>
