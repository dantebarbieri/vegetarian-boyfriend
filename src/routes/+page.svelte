<script lang="ts">
	import Card from './Card.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>The Vegetarian Boyfriend</title>
</svelte:head>

<div class="cards">
	{#each data.posts as post}
		<Card
			title={post.title}
			description={post.description}
			date={post.date}
			link={`/blog/${post.slug}`}
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
