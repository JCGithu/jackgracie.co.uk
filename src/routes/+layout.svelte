<script lang="ts">
	import '../app.postcss';
	import '../app.scss';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<link rel="icon" sizes="any" href="./favicon.png" />
	<title>Jack Gracie</title>
</svelte:head>

{@render children?.()}
