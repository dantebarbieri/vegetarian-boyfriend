<script lang="ts">
	export let width: number | string;
	export let height: number | string;
</script>

<a
	href="https://youtube.com/@thevegetarianboyfriend"
	target="_blank"
	rel="noopener noreferrer"
	aria-label="The Vegetarian Boyfriend YouTube Channel"
	style="width: {width}; height: {height};"
>
	<svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176 124">
		<title>YouTube Logo</title>
		<path
			d="m172.32,19.36c-2.02-7.62-7.99-13.62-15.56-15.66C143.04,0,88,0,88,0c0,0-55.04,0-68.76,3.7-7.57,2.04-13.54,8.04-15.56,15.66C0,33.18,0,62,0,62c0,0,0,28.82,3.68,42.64,2.02,7.62,7.99,13.62,15.56,15.66,13.73,3.7,68.76,3.7,68.76,3.7,0,0,55.04,0,68.76-3.7,7.57-2.04,13.54-8.04,15.56-15.66,3.68-13.81,3.68-42.64,3.68-42.64,0,0,0-28.82-3.68-42.64Zm-102.32,68.81v-52.34l46,26.17-46,26.17Z"
		/>
	</svg>
</a>

<style>
	a {
		display: inline-flex;
		margin: 0;
		padding: 0;
		transition: scale 0.2s ease-in-out;
	}

	a:hover {
		scale: 1.1;
	}

	svg {
		fill: var(--text);
	}
</style>
