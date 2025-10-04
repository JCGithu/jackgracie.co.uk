<script lang="ts">
	import { onMount } from 'svelte';
	import anime from 'animejs';

	export let copy = '';

	let textContainer: HTMLElement;

	onMount(() => {
		anime({
			targets: textContainer.children,
			opacity: [0, 1],
			easing: 'easeInOutSine',
			duration: 2250,
			delay: (el, i) => 150 * (i + 1),
		});
	});
</script>

<div bind:this={textContainer}>
	{#each copy.split('') as char, index}
		<span aria-hidden="true">{char}</span>
	{/each}
</div>
