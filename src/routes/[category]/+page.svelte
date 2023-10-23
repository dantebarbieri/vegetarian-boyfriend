<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { capitalizeFirstLetterLocale } from '$lib';
	import Card from '../Card.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>{capitalizeFirstLetterLocale($page.params.category)} | The Vegetarian Boyfriend</title>
</svelte:head>

<div class="cards">
	{#each data.posts as post}
		<Card
			title={post.title}
			description={post.description}
			date={post.date}
			link={`/${post.category}/blog/${post.slug}`}
			imageSrcFallback={post.imageSrcFallback}
			imageSrcWebp={post.imageSrcWebp}
		/>
	{/each}
</div>

<style>
	.cards {
		/* padding: 1rem; remove me */
		display: flex;
		flex-direction: column;
		gap: 6rem;
	}
</style>
