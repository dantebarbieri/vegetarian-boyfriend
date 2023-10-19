<script lang="ts">
	import '@fontsource-variable/josefin-sans';
	import '@fontsource/poppins/300.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import GitHub from './GitHub.svelte';
	import YouTube from './YouTube.svelte';
	import TheVegetarianCowgirl from './TheVegetarianCowgirl.svelte';

	function setActiveLink(node: HTMLAnchorElement) {
		// Deriving the path from the href attribute
		const path = node.getAttribute('href');

		const unsubscribe = page.subscribe(($page) => {
			if ($page.route.id === path) {
				node.setAttribute('aria-current', 'page');
			} else {
				node.removeAttribute('aria-current');
			}
		});

		// Cleanup function
		return {
			destroy: unsubscribe
		};
	}

	let dummy: HTMLAnchorElement;

	onMount(() => {
		dummy.remove();
	});
</script>

<header>
	<div class="inner-container">
		<div class="nav">
			<a id="title" href="/"><h1>The Vegetarian Boyfriend</h1></a>
			<nav>
				<ul>
					<li><a href="/" use:setActiveLink>Blog</a></li>
					<li><a href="/travel" use:setActiveLink>Travel</a></li>
					<li><a href="/tech" use:setActiveLink>Tech</a></li>
					<li><a href="/life" use:setActiveLink>Life</a></li>
					<li><a href="/about" use:setActiveLink>About</a></li>
				</ul>
			</nav>
		</div>
		<div class="socials">
			<YouTube width="1.25em" height="1.25em" />
			<GitHub width="1.25em" height="1.25em" />
			<TheVegetarianCowgirl width="1.25em" height="1.25em" />
		</div>
	</div>
</header>

<a href="#top" bind:this={dummy} aria-current="page" style="display: none;"><span /></a>

<style>
	header {
		position: relative;
		z-index: 2;
		width: 100%;
		padding: 4vw 6vw;
		pointer-events: auto;
	}

	@media only screen and (pointer: coarse) and (max-width: 1024px), screen and (max-width: 800px) {
		header {
			padding: 6vw;
		}
	}

	.inner-container {
		padding: 0;
		max-width: 1700px;
		margin: 0 auto;
		z-index: 1;
		display: flex;
		align-items: center;
		width: 100%;
		height: inherit;
		gap: 2.5vw;
	}

	.nav {
		display: flex;
		flex-wrap: nowrap;
		flex: 1 0 67%;
		align-items: center;
		justify-content: flex-start;
	}

	@media only screen and (pointer: coarse) and (max-width: 1024px), screen and (max-width: 799px) {
		.nav {
			flex: 1 0 calc(100% - 75px * 2 - 2.5vw);
		}
	}

	#title {
		flex-grow: 0;
		flex-shrink: 0;
		backface-visibility: hidden;
	}

	h1 {
		font-size: 1.5rem;
		font-family: 'Josefin Sans Variable', sans-serif;
		font-weight: 500;
		margin: 0;
	}

	a {
		color: var(--text);
		text-decoration: none;
		cursor: pointer;
		font-weight: 300;
		padding: 0.1em 0;
	}

	nav a:not([aria-current='page']):hover {
		border-bottom: 1px solid var(--primary);
		transition: border-bottom 0.2s ease-in-out;
	}

	a[aria-current='page'] {
		border-bottom: 1px solid currentColor;
	}

	nav {
		text-align: right;
		margin-left: auto;
		padding-left: 2.5vw;
	}

	nav ul {
		display: inline-flex;
		list-style: none;
		justify-content: flex-end;
		flex-wrap: wrap;
		gap: 1.4vw;
	}

	.socials {
		display: inline-flex;
		flex-grow: 0;
		flex-shrink: 1;
		align-items: center;
		justify-content: flex-end;
		gap: 1.4vw;
	}
</style>
