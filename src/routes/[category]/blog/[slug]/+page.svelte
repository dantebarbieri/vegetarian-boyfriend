<script lang="ts">
	import '@fontsource-variable/josefin-sans';
	import '@fontsource/poppins/400.css';
	import '@fontsource/poppins/300.css';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;
</script>

<svelte:head>
	{#if data.post}
		<title>{data.post.title} | The Vegetarian Boyfriend</title>
	{/if}
</svelte:head>

<article>
	<div class="inner-wrapper">
		{#if data.post}
			<header>
				<h2>{data.post.title}</h2>
				<time datetime={data.post.date.toISOString()}
					>{data.post.date.toLocaleDateString(undefined, {
						month: 'long', // Display the full month name
						day: 'numeric' // Display the day as a number without leading 0s
					})}</time
				>
			</header>
			<div class="blog-image">
				<picture>
					<!-- WebP version -->
					{#if data.post.imageSrcWebp}
						<source src={data.post.imageSrcWebp} type="image/webp" />
					{/if}

					<!-- Fallback to JPEG/PNG for browsers that do not support WebP -->
					<img src={data.post.imageSrcFallback} alt={data.post.title} loading="lazy" />
				</picture>
			</div>
			<div class="content">
				{#if data.post.content instanceof Array}
					{#each data.post.content as paragraph}
						<p>{paragraph}</p>
					{/each}
				{:else}
					<p>{data.post.content}</p>
				{/if}
			</div>
		{:else}
			<h2>Loading...</h2>
		{/if}
	</div>
</article>
<slot />
<section id="pagination">
	<a
		class:hidden={data.previous === null}
		href={`/${$page.params.category}/blog/${data.previous?.slug ?? ''}`}
		aria-label="Previous: {data.previous?.title}"
		rel="prev"
	>
		<svg viewBox="0 0 9 16">
			<polyline stroke-miterlimit="10" points="7.3,14.7 2.5,8 7.3,1.2" />
		</svg>
		<h3>{data.previous?.title}</h3>
	</a>
	<a
		class:hidden={data.next === null}
		href={`/${$page.params.category}/blog/${data.next?.slug ?? ''}`}
		aria-label="Next: {data.next?.title}"
		rel="next"
	>
		<h3>{data.next?.title}</h3>
		<svg viewBox="0 0 9 16">
			<polyline stroke-miterlimit="10" points="1.6,1.2 6.5,7.9 1.6,14.7" />
		</svg>
	</a>
</section>

<style>
	article {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 6vw;
		padding-bottom: 6vw;
	}

	.inner-wrapper {
		flex-basis: 50%;
		max-width: 1700px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	header {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.blog-image {
		width: 90%;
		display: flex;
		overflow: hidden;
		position: relative;
		aspect-ratio: 6185 / 4650;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: absolute;
		top: 0;
		left: 0;
		image-rendering: auto;
	}

	h2 {
		font-size: 4rem;
		font-weight: 500;
		font-family: 'Josefin Sans Variable', sans-serif;
		line-height: 1.4;
		margin: 0;
	}

	time {
		order: -1;
		margin-bottom: 2rem;
		font-weight: 400;
		line-height: 1;
		letter-spacing: 0.01em;
	}

	.content {
		width: 100%;
		margin-bottom: 3vw;
		padding-left: 1rem;
		padding-right: 1rem;
		line-height: 1.8;
		word-wrap: break-word;
		font-weight: 300;
		display: inline-flex;
		flex-direction: column;
		gap: 1rem;
		text-align: justify;
	}

	p {
		margin: 0;
	}

	#pagination {
		display: flex;
		padding: 3vw 0;
		justify-content: space-between;
		align-items: center;
	}

	#pagination a {
		text-decoration: none;
		color: var(--text);
		display: inline-flex;
		flex-direction: row;
		max-width: 50%;
	}

	.hidden {
		visibility: hidden;
		pointer-events: none;
	}

	h3 {
		margin: 0;
		line-height: 1;
		font-size: 2.2rem;
		font-weight: 500;
		font-family: 'Josefin Sans Variable', sans-serif;
	}

	svg {
		height: 2em;
		fill: transparent;
		stroke-width: 1px;
		stroke: currentColor;
	}

	a:first-child svg {
		padding-right: 1.5em;
	}

	a:last-child svg {
		padding-left: 1.5em;
	}
</style>
