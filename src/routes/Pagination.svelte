<script lang="ts">
	import type { PostSlugAndTitle } from '$lib/server/database';

	export let previous: PostSlugAndTitle | null;
	export let next: PostSlugAndTitle | null;
</script>

<section id="pagination">
	<a
		class:hidden={!previous}
		href={`/blog/${previous?.slug ?? ''}`}
		aria-label="Previous: {previous?.title}"
		rel="prev"
	>
		<svg viewBox="0 0 9 16">
			<polyline stroke-miterlimit="10" points="7.3,14.7 2.5,8 7.3,1.2" />
		</svg>
		<h3>{previous?.title}</h3>
	</a>
	<a
		class:hidden={!next}
		href={`/blog/${next?.slug ?? ''}`}
		aria-label="Next: {next?.title}"
		rel="next"
	>
		<h3>{next?.title}</h3>
		<svg viewBox="0 0 9 16">
			<polyline stroke-miterlimit="10" points="1.6,1.2 6.5,7.9 1.6,14.7" />
		</svg>
	</a>
</section>

<style>
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

	#pagination a:first-child {
		text-align: left;
	}

	#pagination a:last-child {
		text-align: right;
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

	@media screen and (max-width: 767px) and (orientation: portrait) {
		h3 {
			font-size: 1.6rem;
		}
	}
</style>
