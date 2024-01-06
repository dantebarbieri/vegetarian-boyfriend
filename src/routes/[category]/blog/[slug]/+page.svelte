<script lang="ts">
	import '@fontsource-variable/josefin-sans';
	import '@fontsource/poppins/400.css';
	import '@fontsource/poppins/300.css';
	import type { PageData } from './$types';
	import Post from '../../../Post.svelte';
	import Pagination from '../../../Pagination.svelte';

	export let data: PageData;
</script>

<svelte:head>
	{#if data.post}
		<title>{data.post.title} | The Vegetarian Boyfriend</title>
	{/if}
</svelte:head>

{#if data.post}
	<Post {...data.post} />
{:else}
	<h2>Loading...</h2>
{/if}

<Pagination {...data} />

<style>
	h2 {
		font-size: 4rem;
		font-weight: 500;
		font-family: 'Josefin Sans Variable', sans-serif;
		line-height: 1.4;
		margin: 0;
	}

	@media screen and (max-width: 767px) and (orientation: portrait) {
		h2 {
			font-size: 2.5rem;
		}
	}
</style>
