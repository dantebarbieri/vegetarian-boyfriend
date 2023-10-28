<script>
	import GitHub from './GitHub.svelte';
	import TheVegetarianCowgirl from './TheVegetarianCowgirl.svelte';
	import YouTube from './YouTube.svelte';
</script>

<footer>
	<nav>
		<ul>
			<li><YouTube width="1.5em" height="1.5em" /></li>
			<li><GitHub width="1.5em" height="1.5em" /></li>
			<li><TheVegetarianCowgirl width="1.5em" height="1.5em" /></li>
		</ul>
	</nav>
	<p>Sign up to receive news and updates.</p>
	<form>
		<input type="email" placeholder="Email Address" />
		<button type="submit" value="Sign Up">Submit</button>
	</form>
	<p id="copyright">&copy; 2023 The Vegetarian Boyfriend. All rights reserved.</p>
</footer>

<style lang="scss">
	footer {
		margin: 0 auto;
		margin-top: auto;
		align-items: flex-start;
		min-height: 33vh;
		display: flex;
		flex-direction: column;
		padding: 3.3vmax 0;
		justify-content: center;
		width: 100%;
		padding: 0 6vw;
	}

	nav ul {
		display: inline-flex;
		list-style: none;
		flex-wrap: wrap;
		gap: 1.4vw;
		padding: 0;
	}

	form {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	form * {
		padding: 1.4rem 2rem;
		line-height: 1.2rem;
	}

	input {
		border: 1px solid #0000001f;
		background-color: var(--background);
		color: var(--text);
		font-family: Poppins, inherit;
		font-weight: 300;
		min-width: 18rem;
		padding: 0.5rem, 0.25rem, 0.5rem, 0;
	}

	:global(.dark) input {
		border: 1px solid #ffffff1f;
	}

	button {
		padding: 0.5rem, 0.25rem, 0.5rem, 0;
		border-color: transparent;
		border-radius: 0;
		background-color: var(--primary);
		color: var(--text);
	}

	button:hover {
		background-color: var(--secondary);
	}
</style>
