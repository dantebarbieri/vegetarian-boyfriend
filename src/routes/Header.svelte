<script lang="ts">
	import '@fontsource-variable/josefin-sans';
	import '@fontsource/poppins/300.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import GitHub from './GitHub.svelte';
	import YouTube from './YouTube.svelte';
	import TheVegetarianCowgirl from './TheVegetarianCowgirl.svelte';
	import { capitalizeFirstLetterLocale } from '$lib';

	export let categories: string[];

	function setActiveLink(node: HTMLAnchorElement) {
		const path = node.getAttribute('href');

		const pathSegments = path!.split('/');

		const unsubscribe = page.subscribe(($page) => {
			// Check for an exact match first
			if ($page.route.id === path) {
				node.setAttribute('aria-current', 'page');
				return;
			}

			// Check for blog category links
			if ($page.route.id === '/[category]') {
				if (pathSegments[1] === $page.params.category) {
					node.setAttribute('aria-current', 'page');
					return;
				}
			}

			node.removeAttribute('aria-current');
		});

		// Cleanup function
		return {
			destroy: unsubscribe
		};
	}

	let dialog: HTMLDialogElement;

	let dummy: HTMLElement;

	onMount(() => {
		dummy.remove();
	});
</script>

<header>
	<div class="inner-container">
		<div class="nav">
			<a id="title" href="/">
				<h1><span class="responsive-hide">The </span>Vegetarian Boyfriend</h1>
			</a>
			<nav>
				<ul>
					<li><a href="/" use:setActiveLink>Blog</a></li>
					{#each categories.slice().sort().reverse() as category}
						<li>
							<a href="/{category}" use:setActiveLink>{capitalizeFirstLetterLocale(category)}</a>
						</li>
					{/each}
					<li><a href="/about" use:setActiveLink>About</a></li>
				</ul>
			</nav>
		</div>
		<div class="socials">
			<YouTube width="1.25em" height="1.25em" />
			<GitHub width="1.25em" height="1.25em" />
			<TheVegetarianCowgirl width="1.25em" height="1.25em" />
		</div>
		<dialog bind:this={dialog}>
			<div>
				<section class="modal header">
					<a id="title" href="/"><h1>The Vegetarian Boyfriend</h1></a>
					<button on:click={() => dialog.close()}>
						<div class="cross">
							<div class="forward" />
							<div class="back" />
						</div>
					</button>
				</section>
				<section class="modal content">
					<nav>
						<ul>
							<li><a href="/" use:setActiveLink on:click={() => dialog.close()}>Blog</a></li>
							{#each categories.slice().sort().reverse() as category}
								<li>
									<a href="/{category}" use:setActiveLink on:click={() => dialog.close()}>
										{capitalizeFirstLetterLocale(category)}
									</a>
								</li>
							{/each}
							<li><a href="/about" use:setActiveLink on:click={() => dialog.close()}>About</a></li>
						</ul>
					</nav>
				</section>
				<section class="modal footer">
					<div class="socials">
						<YouTube width="1.75em" height="1.75em" />
						<GitHub width="1.75em" height="1.75em" />
						<TheVegetarianCowgirl width="1.75em" height="1.75em" />
					</div>
				</section>
			</div>
		</dialog>
		<button on:click={() => dialog.showModal()}>
			<div class="burger">
				<div class="top-bun" />
				<div class="patty" />
				<div class="bottom-bun" />
			</div>
		</button>
	</div>
</header>

<div bind:this={dummy} class="nav modal content">
	<a href="#top" aria-current="page" style="display: none;"><span /></a>
</div>

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
			margin-bottom: 1.25rem;
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

	@media screen and (max-width: 399px) {
		.responsive-hide {
			display: none;
		}
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

	.nav nav {
		text-align: right;
		margin-left: auto;
		padding-left: 2.5vw;
	}

	nav ul {
		list-style: none;
	}

	.nav nav ul {
		display: inline-flex;
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

	button {
		display: none;
		cursor: pointer;
		appearance: button;
		-webkit-appearance: button;
		border: transparent;
		background-color: transparent;
	}

	dialog {
		width: 100%;
		height: 100%;
		border: transparent;
		color: var(--text);
		background-color: var(--background);
	}

	dialog > div {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.burger,
	.cross {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
	}

	.burger > *,
	.cross > * {
		position: absolute;
		display: block;
		top: 0;
		left: 0;
		bottom: 0;
		height: 1px;
		margin: auto;
		content: '';
		transition: transform 250ms cubic-bezier(0.2, 0.6, 0.3, 1),
			width 250ms cubic-bezier(0.2, 0.6, 0.3, 1);
		will-change: transform, width;
		background-color: var(--text);
	}

	.burger > * {
		width: 100%;
	}

	.cross > * {
		width: 1.8rem;
	}

	.top-bun {
		transform: translatey(-0.66rem);
	}

	.bottom-bun {
		transform: translatey(0.66rem);
	}

	.forward {
		transform: translatex(3.5px) rotate(-135deg);
	}

	.back {
		transform: translatex(3.5px) rotate(135deg);
	}

	.modal.header {
		display: flex;
		justify-content: space-between;
	}

	.modal.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.modal.content nav {
		display: block;
	}

	.modal.content nav ul {
		display: flex;
		flex-direction: column;
		text-align: center;
		margin: 0;
		padding: 0;
		gap: 3vw;
	}

	.modal.content li:has(a:not([aria-current='page']):hover) {
		border-bottom: 1px solid var(--primary);
		transition: border-bottom 0.2s ease-in-out;
	}

	.modal.content li:has(a[aria-current='page']) {
		border-bottom: 1px solid currentColor;
	}

	.modal.content a {
		font-size: 8.5vmin;
	}

	.modal.footer {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: 6vw;
	}

	.modal.footer > .socials {
		display: flex;
		gap: 2rem;
	}

	@media screen and (min-width: 576px) {
		.modal.content a {
			font-size: 6.6vmin;
		}
	}

	@media screen and (min-width: 768px) {
		.modal.content a {
			font-size: 6vmin;
		}
	}

	@media only screen and (pointer: coarse) and (max-width: 1024px), screen and (max-width: 799px) {
		nav,
		.socials {
			display: none;
		}

		button {
			display: flex;
		}
	}
</style>
