<script lang="ts">
	import { onMount } from 'svelte';
	let { data } = $props();
	onMount(() => {
		let baseURL = window.location.protocol + '//' + window.location.host;
		window.location.replace(data.url ? data.url : baseURL);
	});
</script>
