<script lang="ts">
	import { onMount } from 'svelte';
	import Header from './Header.svelte';
	import '@fontsource/poppins';

	onMount(() => {
		const setTheme = () => {
			if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		};

		// Set theme on initial load
		setTheme();

		// Watch for changes in the media query's value
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setTheme);

		return () => {
			// Cleanup listener on component destroy
			window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', setTheme);
		};
	});
</script>

<Header />
<slot />

<style>
	:global(:root) {
		--text: #211a12;
		--background: #f0ebe5;
		--primary: #273445;
		--secondary: #cecee3;
		--accent: #2b338c;
	}

	:global(:root.dark) {
		--text: #f0ebe5;
		--background: #211a12;
		--primary: #84b0e9;
		--secondary: #b2b2e1;
		--accent: #31317b;
	}

	:global(:root) {
		color: var(--text);
		background-color: var(--background);
		font-family: Poppins, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
			Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
	}

	:global(*, *:before, *:after) {
		box-sizing: inherit;
	}
</style>
