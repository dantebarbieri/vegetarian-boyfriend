<script lang="ts">
	export let title: string;
	export let date: Date;
	export let content: string;
	export let imageSrcFallback: string;
	export let imageSrcWebp: string | undefined = undefined;
</script>

<article>
	<div class="inner-wrapper">
		<header>
			<h2>{title}</h2>
			<time datetime={date.toISOString()}>
				{date.toLocaleDateString(undefined, {
					month: 'long', // Display the full month name
					day: 'numeric' // Display the day as a number without leading 0s
				})}
			</time>
		</header>
		<div class="blog-image">
			<picture>
				<!-- WebP version -->
				{#if imageSrcWebp}
					<source src={imageSrcWebp} type="image/webp" />
				{/if}

				<!-- Fallback to JPEG/PNG for browsers that do not support WebP -->
				<img src={imageSrcFallback} alt={title} loading="lazy" />
			</picture>
		</div>
		<div class="content">
			{@html content}
		</div>
	</div>
</article>

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

	.content :global(p) {
		margin: 0;
	}

	@media screen and (max-width: 767px) and (orientation: portrait) {
		h2 {
			font-size: 2.5rem;
		}
	}

	@media screen and (max-width: 767px) {
		.inner-wrapper {
			flex-basis: 100%;
		}

		.blog-image {
			width: 100%;
		}

		.content {
			padding-left: 0;
			padding-right: 0;
		}
	}
</style>
