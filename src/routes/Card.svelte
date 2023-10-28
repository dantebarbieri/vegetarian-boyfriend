<script lang="ts">
	import '@fontsource-variable/josefin-sans';
	import '@fontsource/poppins/300.css';
	import '@fontsource/poppins/400.css';

	export let title: string;
	export let date: Date;
	export let description: string;
	export let imageSrcFallback: string;
	export let link: string;
	export let imageSrcWebp: string | undefined = undefined;
</script>

<div class="blog-card">
	<a class="blog-image" href={link}>
		<picture>
			<!-- WebP version -->
			{#if imageSrcWebp}
				<source src={imageSrcWebp} type="image/webp" />
			{/if}

			<!-- Fallback to JPEG/PNG for browsers that do not support WebP -->
			<img src={imageSrcFallback} alt={title} loading="lazy" />
		</picture>
	</a>
	<section class="blog-summary">
		<a class="blog-title" href={link}>
			<h2>{title}</h2>
		</a>
		<time datetime={date.toISOString()}>{date.toLocaleDateString()}</time>
		<p class="description">{description}</p>
		<a class="read-more" href={link}>Read More</a>
	</section>
</div>

<style>
	.blog-card {
		display: flex;
		gap: 4rem;
	}

	.blog-image {
		display: inline-flex;
		flex-basis: 55%;
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

	.blog-summary {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		text-align: left;
		font-weight: 300;
	}

	h2 {
		font-family: 'Josefin Sans Variable', sans-serif;
		font-weight: 500;
		font-size: 3rem;
		margin-top: 0;
		margin-bottom: 5px;
		line-height: 1.4;
	}

	.description {
		line-height: 1.8;
		white-space: pre-wrap;
		margin: 1rem 0;
	}

	time {
		line-height: 1;
		letter-spacing: 0.1em;
		font-weight: 400;
		margin-bottom: 15px;
		order: -1;
	}

	a {
		color: var(--text);
	}

	.blog-title {
		text-decoration: none;
	}

	.read-more {
		font-weight: 300;
		color: var(--accent);
		margin-bottom: 10px;
	}
</style>
