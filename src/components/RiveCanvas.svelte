<script lang="ts">
	import * as rive from '@rive-app/canvas';
	import { onMount, onDestroy } from 'svelte';
	let canvas: HTMLCanvasElement;
	let cursor = $state(false);

	interface RiveProps {
		src: string;
		trigger?: rive.EventCallback,
		width?: number;
		height?: number;
		screen?: boolean;
		autoplay?: boolean;
		stateMachines?: string;
		layout?: rive.Layout;
		customClass?: string;
		input: Record<string, number>;
	}

	let {
		src,
		width,
		height,
		trigger = (riveEvent:rive.Event) => {
			//@ts-ignore
			if (riveEvent.data.url){
				//@ts-ignore
				window.open(riveEvent.data.url, '_blank');
			}	
		},
		screen = false,
		autoplay = true,
		layout,
		stateMachines,
		customClass = '',
		input = $bindable()
	}:RiveProps = $props();
	let stateInputs: rive.StateMachineInput[];
	let r: rive.Rive;

	function updateInputs(values: Record<string, number>) {
		stateInputs.forEach((state) => {
			if(state.name in values){
				state.value = values[state.name];
			}
		});
	}

	onMount(() => {
		if (screen) {
			height = window.innerHeight / window.devicePixelRatio;
			width = window.innerWidth / window.devicePixelRatio;
		}

		r = new rive.Rive({
			src: src,
			canvas: canvas,
			autoplay: autoplay,
			shouldDisableRiveListeners: false,
			layout: layout || new rive.Layout({
				fit: rive.Fit.Cover,
			}),
			stateMachines: stateMachines,
			onLoad: () => {
				r.resizeDrawingSurfaceToCanvas();
				if (stateMachines) {
					stateInputs = r.stateMachineInputs(stateMachines);
					r.setupRiveListeners();
					updateInputs(input);
				}
			},
			onStateChange: (state) => {
				if (!state.data) return;
				let name = (state.data as Array<string>)[0];
				cursor = name.toLowerCase().startsWith('cursor');
				console.log(name, cursor);
			}
		});

		r.on(rive.EventType.RiveEvent, trigger);
		window.onresize = () => {
			height = window.innerHeight / window.devicePixelRatio;
			width = window.innerWidth / window.devicePixelRatio;
			if (!r) return;
			setTimeout(()=>{
				r.resizeDrawingSurfaceToCanvas();
			}, 0)
		};
	});

	onDestroy(() => {
		if (r && r.cleanup) {
			r.cleanup();
		}
	});

	$effect(() => {
		if (input[Object.keys(input)[0]]) {
			if (!r || !stateInputs) return;
			r.resizeDrawingSurfaceToCanvas();
			updateInputs(input);
		}
	})
</script>

<canvas  class={customClass} class:cursor bind:this={canvas} {width} {height}></canvas>

<style lang="scss">
	.cursor {
		&:hover{
			cursor: pointer !important;
		}
	}
</style>
