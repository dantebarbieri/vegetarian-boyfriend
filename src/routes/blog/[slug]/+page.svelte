<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	{#if data.post}
		<title>The Vegetarian Boyfriend - {data.post.title}</title>
	{/if}
</svelte:head>

<article>
	{#if data.post}
		<h2>{data.post.title}</h2>
		<time datetime={data.post.date.toISOString()}>{data.post.date.toLocaleDateString()}</time>
		<p class="content">{data.post.content}</p>
	{:else}
		<h2>Loading...</h2>
	{/if}
</article>
