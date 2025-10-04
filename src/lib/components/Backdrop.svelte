<script lang="ts">
	import { onMount } from 'svelte';
	import lottie from 'lottie-web';
	import backdrop from '../../lottie/backdrop.json';

	let animationContainer: HTMLElement;

	onMount(() => {
		const animation = lottie.loadAnimation({
			container: animationContainer,
			animationData: backdrop,
		});

		function windowResize() {
			if (animationContainer) {
				const lott = animationContainer.children[0] as HTMLElement;
				if (window.outerWidth >= window.outerHeight * 1.78) {
					lott.setAttribute('preserveAspectRatio', 'xMinYMid meet');
				} else {
					lott.setAttribute('preserveAspectRatio', 'xMidYMax slice');
				}
				if (animationContainer.children[1]) {
					const del = animationContainer.children[1];
					animationContainer.removeChild(del);
				}
			}
		}

		window.addEventListener('resize', windowResize);
		windowResize();

		return () => {
			animation.destroy();
			window.removeEventListener('resize', windowResize);
		};
	});
</script>

<div id="backdrop" bind:this={animationContainer} class="backdrop"></div>