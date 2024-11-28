<script lang="ts">
	//Svelte
	import { onMount } from 'svelte';
	import RiveCanvas from '../components/RiveCanvas.svelte';
	
	let riveInput: Record<string,number> = $state({
		Scroll: 0
	});

	onMount(() => {
		let difference = window.document.body.scrollHeight - window.innerHeight;
		document.addEventListener('scroll', () => {
			riveInput.Scroll = (window.scrollY / difference) * 100;
		});
	});
</script>

<main>
	<RiveCanvas src="homepage.riv" stateMachines="Scrolling" screen={true} bind:input={riveInput} />
</main>

<style lang="scss">
	main {
		background-color: transparent;
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		z-index: 2;
	}
</style>
