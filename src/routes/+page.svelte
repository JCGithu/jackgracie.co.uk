<script lang="ts">
	//Svelte
	import type {Event} from '@rive-app/canvas';
	import { onMount } from 'svelte';
	import { draggable } from '@neodrag/svelte';
	import RiveCanvas from '../components/RiveCanvas.svelte';
	let { data } = $props();

	let name = 'jack gracie';
	
	let riveInput: Record<string,number> = $state({
		Scroll: 0
	});

	onMount(() => {
		let difference = window.document.body.scrollHeight - window.innerHeight;
		document.addEventListener('scroll', () => {
			riveInput.Scroll = (window.scrollY / difference) * 100;
		});
	});

	function copyEmail() {
		navigator.clipboard.writeText('contact@jackgracie.co.uk');
	}

</script>

<section>
	<!-- <div class="titleBanner">
		<div class="titleBox">
			<h1>
				{#each Array(name.length) as _, i}
					<span>{name[i]}</span>
				{/each}
			</h1>
			<div class="underline"></div>
			<p
				class="mini"
				id="email"
				title="Click to copy me!"
				onkeypress={copyEmail}
				onclick={copyEmail}
			>
				contact@jackgracie.co.uk
			</p>
			<div use:draggable>
				<span
					class="cv"
				>
					<button
						onclick={() => {
							window.open('/cv.pdf', '_blank');
						}}>CV</button
					>
				</span>
			</div>
		</div>
	</div> -->
</section>
<main>
	<RiveCanvas src="homepage.riv" stateMachines="Scrolling" screen={true} bind:input={riveInput} />
</main>

<style lang="scss">
	section {
		overflow: 0;
		margin: 0;
		padding: 0;
		width: 100vw;
		z-index: 2;
		opacity: 0;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		animation: fadeIn 2s ease-in-out forwards;
	}
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

	h1 {
		font-size: 4rem;
		margin-bottom: -0.15rem;
		&::selection {
			background: hsl(348, 100%, 75%) !important;
		}
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	.underline {
		width: 0rem;
		opacity: 0;
		background: white;
		height: 0.2rem;
		border-radius: 1rem;
		left: 2.2rem;
		bottom: 1rem;
		position: relative;
		z-index: -1;
		animation: underline 1s cubic-bezier(0.33, 1, 0.68, 1) forwards;
	}

	.titleBanner {
		height: 80vh;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		//background-color: rgba(47, 35, 49, 0.3);
	}

	.titleBox {
		color: white;
		text-align: center;
		position: relative;
	}

	.cv {
		position: absolute;
		background-color: beige;
		color: #2f2331;
		width: min-content;
		font-weight: bold;
		opacity: 0.8;
		box-shadow:
			1px 1px #232323,
			2px 2px #232323,
			3px 3px #232323,
			0px 0px 30px rgba(beige, 0);
		padding: 1rem;
		right: -1rem;
		border-radius: 0.25rem;
		animation: bob 2s ease-in-out infinite forwards;
		transition: 0.5s ease all;
		&:hover {
			opacity: 1;
			box-shadow:
				1px 1px #232323,
				2px 2px #232323,
				3px 3px #232323,
				0px 0px 30px rgba(beige, 0.3);
		}
		cursor: pointer;
	}
	@keyframes bob {
		0% {
			transform: rotate(10deg);
		}
		50% {
			transform: rotate(12deg) translateY(-5px);
		}
		100% {
			transform: rotate(10deg);
		}
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.mini {
		font-size: 0.75rem;
		opacity: 0.8;
		margin: 0;
		margin-top: -0.2rem;
		margin-bottom: 0.4rem;
		font-family: 'Poppins';
		cursor: pointer;
		color: white;
		&::selection {
			background: #ff809a !important;
		}
	}

	button {
		border: none;
		background-color: transparent;
		background-image: none;
		pointer-events: none;
	}
</style>
