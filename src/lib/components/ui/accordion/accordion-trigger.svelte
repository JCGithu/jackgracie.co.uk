<script lang="ts">
	import { Accordion as AccordionPrimitive, type WithoutChild } from "bits-ui";
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		level = 3,
		children,
		...restProps
	}: WithoutChild<AccordionPrimitive.TriggerProps> & {
		level?: AccordionPrimitive.HeaderProps["level"];
	} = $props();
</script>

<AccordionPrimitive.Header {level} class="flex">
	<AccordionPrimitive.Trigger
		bind:ref
		class={cn(
			"flex flex-1 items-center justify-between py-1 font-medium transition-all hover:underline underline-offset-4 decoration-orange-400 [&[data-state=open]>svg]:rotate-180 text-left",
			className
		)}
		{...restProps}
	>
			<span class="grow text-left text-xl">
		{@render children?.()}
			</span>
		<ChevronDown class="size-8 shrink-0 transition-transform duration-200" />
	</AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
