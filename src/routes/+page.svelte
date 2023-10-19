<script>
	import Card from './Card.svelte';

	import ColoradoHiking from '$lib/assets/colorado-hiking.jpg';
	import FonduelandBackpack from '$lib/assets/fondueland-backpack.jpg';
</script>

<div class="cards">
	<Card
		title="Colorado Hiking"
		description="Discover the serenity of Colorado's wilderness: Where every step reveals nature's majesty and every view takes your breath away. Join me on a journey through the Rockies!"
		date={new Date(2023, 7, 16)}
		link="/colorado-hiking"
		imageSrcFallback={ColoradoHiking}
	/>
	<Card
		title="Fondue Land (Gstaad) Backpack"
		description="Discover the serenity of Colorado's wilderness: Where every step reveals nature's majesty and every view takes your breath away. Join me on a journey through the Rockies!"
		date={new Date(2023, 6, 10)}
		link="/colorado-hiking"
		imageSrcFallback={FonduelandBackpack}
	/>
</div>

<style>
	.cards {
		/* padding: 1rem; remove me */
		display: flex;
		flex-direction: column;
		gap: 6rem;
	}
</style>
