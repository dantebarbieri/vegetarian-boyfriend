<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data}
	<pre>{JSON.stringify(data, null, 2)}</pre>
{:else}
	<p>Loading...</p>
{/if}
