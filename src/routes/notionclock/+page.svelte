<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { useSearchParams } from "runed/kit";
  import clockUpdate from "$lib/utils/clockUpdate.js";
  import { z } from "zod";

  const params = useSearchParams(
    z.object({
      bg: z.string().default("#191919"),
      bghex: z.string().default(""),
      text: z.string().default("#ffffff"),
      texthex: z.string().default(""),
      font: z.string().default("Poppins"),
      align: z.string().default("left"),
      format: z.string().default("DDD, ds MMM, yyyy"),
      time: z.string().default("H:mm P"),
      scale: z.coerce.number().default(1),
      padding: z.coerce.number().nullable().default(null),
      paddingTop: z.coerce.number().nullable().default(null),
      paddingBottom: z.coerce.number().nullable().default(null),
      paddingLeft: z.coerce.number().nullable().default(null),
      paddingRight: z.coerce.number().nullable().default(null),
      timePadding: z.coerce.number().nullable().default(null),
    })
  );

  // Now that we have defaults, we can use the params directly
  let format = $derived(params.format);
  let time = $derived(params.time);

  let paddingStyle = $derived.by(() => {
    const basePadding = params.padding !== null ? params.padding : 0.5;
    const top = params.paddingTop !== null ? params.paddingTop : basePadding;
    const bottom = params.paddingBottom !== null ? params.paddingBottom : basePadding;
    const left = params.paddingLeft !== null ? params.paddingLeft : basePadding;
    const right = params.paddingRight !== null ? params.paddingRight : basePadding;

    return `padding: ${top}rem ${right}rem ${bottom}rem ${left}rem;`;
  });

  let timePadding = $derived(params.timePadding !== null ? `padding: ${params.timePadding}rem;` : "");

  let align = $derived(params.align === "right" ? `text-align: right; justify-content: flex-end;` : params.align === "center" ? `text-align: center; justify-content: center;` : `text-align: left; justify-content: start;`);

  let textColor = $derived(params.texthex ? `#${params.texthex}` : params.text);
  let bgColor = $derived(params.bghex ? `#${params.bghex}` : params.bg);
  let fontParse: string = $derived(`font-family: "${params.font.replaceAll("_", " ")}";`);
  let clockScale = $derived(`font-size: ${params.scale}rem; line-height: ${params.scale}rem;`);
  let timeScale = $derived(`font-size: ${params.scale * 1.8}rem; line-height: ${params.scale * 1.8}rem;`);

  const frameStyle = $derived(`color: red; height: 100vh; background-color: ${bgColor};`);
  const clockStyle = $derived(`color: ${textColor}; ${fontParse} ${clockScale} ${paddingStyle} ${align}`);
  const timeStyle = $derived(`${timeScale} ${timePadding}`);
  const dateStyle = ``;

  // Debug URL parameters
  $inspect(params);
  $inspect(params.padding);
  $inspect(params.scale);

  let timeData = $state({ time: "", date: "" });
  let timer: NodeJS.Timeout | null = null;

  onMount(() => {
    timeData = clockUpdate(format, time);
    timer = setInterval(() => {
      timeData = clockUpdate(format, time);
    }, 1000);
  });

  onDestroy(() => {
    if (timer) {
      clearInterval(timer);
    }
  });
</script>

<div id="frame" style={frameStyle}>
  <div id="clock" style={clockStyle}>
    <span id="time" style={timeStyle}>
      {timeData.time}
    </span>
    <span id="date" style={dateStyle}>{timeData.date}</span>
  </div>
</div>

<style>
  :global(body) {
    margin: 0px !important;
    padding: 0px !important;
    overflow: hidden !important;
  }
  #clock {
    width: 100%;
    overflow: hidden;
    padding: 0.5rem;
    display: flex;
    text-align: left;
    justify-content: start;
    font-family: Poppins;
    flex-direction: column;
    color: white;
    line-height: 1rem;
  }
  #time {
    font-weight: bold;
    font-size: 1.8rem;
    line-height: 1.8rem;
  }
</style>
