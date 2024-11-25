<script lang="ts">
	import { onMount } from 'svelte';
	let clockSettings = $state({
		formatCode: 'DDD, ds MMM, yyyy',
		formatTime:'H:mm P',
		frameBG: '#191919',
		clockText: '#D4D4D4',
		clockFont: 'Poppins',
		clockScale: 1,
		center: false,
		right: false,
		timePadding: '0px',
		padding: '0px',
		paddingTop: '',
		paddingBottom: '',
		paddingRight: '',
		paddingLeft: '',
	});
	let timeNow = $state(new Date());	
	let time = $derived(timeFormatter(timeNow));
	let date = $derived(dateFormatter(timeNow));

	function ordinal_suffix_of(i: number) {
		var j = i % 10,
			k = i % 100;
		if (j === 1 && k !== 11) return i + 'st';
		if (j === 2 && k !== 12) return i + 'nd';
		if (j === 3 && k !== 13) return i + 'rd';
		return i + 'th';
	}

	function clockConvert(hours: string, double?: boolean) {
		let newHours = parseInt(hours.replace(/\D/g, ''));
		newHours = newHours > 12 ? newHours - 12 : newHours;
		if (double) return newHours.toLocaleString('default', { minimumIntegerDigits: 2 });
		return newHours.toString();
	}

	function timeFormatter(inputTime: Date) {
		let timeHours = inputTime.getHours();
		let timeMinutes = inputTime.getMinutes();
		let timeSeconds = inputTime.getSeconds();

		const map:Record<string, string> = {
			h: inputTime.getHours().toLocaleString('default'),
			hh: inputTime.getHours().toLocaleString('default', { minimumIntegerDigits: 2 }),
			H: clockConvert(inputTime.toLocaleString('default', { hour: 'numeric' })),
			HH: clockConvert(inputTime.toLocaleString('default', { hour: '2-digit'}),true),
			m: timeMinutes.toLocaleString('default'),
			mm: timeMinutes.toLocaleString('default', { minimumIntegerDigits: 2 }),
			s: timeSeconds.toLocaleString('default'),
			ss: timeSeconds.toLocaleString('default', { minimumIntegerDigits: 2 }),
			P: timeHours >= 12 ? 'PM' : 'AM',
			E: timeHours > 19 || timeHours < 5 ? '🌙' : '☀️'
		};

		return clockSettings.formatTime.replace(
			/h{1,2}|H{1,2}|m{1,2}|s{1,2}|P|E/g,
			(matched: string) => map[matched]
		);
	}

	function dateFormatter(inputTime: Date) {
		const map: Record<string, string> = {
			m: inputTime.toLocaleString('default', { month: 'numeric' }),
			mm: inputTime.toLocaleString('default', { month: '2-digit' }),
			M: inputTime.toLocaleString('default', { month: 'narrow' }),
			MM: inputTime.toLocaleString('default', { month: 'short' }),
			MMM: inputTime.toLocaleString('default', { month: 'long' }),
			d: inputTime.toLocaleString('default', { day: 'numeric' }),
			dd: inputTime.toLocaleString('default', { day: '2-digit' }),
			ds: ordinal_suffix_of(parseInt(inputTime.toLocaleString('default', { day: 'numeric' }))),
			dds: ordinal_suffix_of(parseInt(inputTime.toLocaleString('default', { day: '2-digit' }))),
			D: inputTime.toLocaleString('default', { weekday: 'narrow' }),
			DD: inputTime.toLocaleString('default', { weekday: 'short' }),
			DDD: inputTime.toLocaleString('default', { weekday: 'long' }),
			yy: inputTime.toLocaleString('default', { year: '2-digit' }),
			yyyy: inputTime.getFullYear().toString(),
			E: inputTime.getHours() > 19 || inputTime.getHours() < 5 ? '🌙' : '☀️'
		};

		return clockSettings.formatCode.replace(
			/m{1,2}|M{1,3}|d{1,2}(?![ds])|ds|dds|D{1,3}|yy(?![y])|y{4}|E/g,
			(matched) => map[matched]
		);
	}

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		urlParams.forEach((value, param) => {
			if (param === 'bg') clockSettings.frameBG = value;
			if (param === 'bghex') clockSettings.frameBG = `#${value}`;
			if (param === 'text') clockSettings.clockText = value;
			if (param === 'texthex') clockSettings.clockText = `#${value}`;
			if (param === 'font') clockSettings.clockFont = value.replaceAll('_', ' ');
			if (param === 'format') clockSettings.formatCode = value;
			if (param === 'time') clockSettings.formatTime = value;
			if (param === 'scale') clockSettings.clockScale = parseFloat(value);
			if (param === 'align' && value === 'right') clockSettings.right = true;
			if (param === 'align' && value === 'center') clockSettings.center = true;
			if (param === 'padding') clockSettings.padding = `${value}px`;
			if (param === 'paddingTop') clockSettings.paddingTop = `${value}px`;
			if (param === 'paddingBottom') clockSettings.paddingBottom = `${value}px`;
			if (param === 'paddingLeft') clockSettings.paddingLeft = `${value}px`;
			if (param === 'paddingRight') clockSettings.paddingRight = `${value}px`;
			if (param === 'timePadding') clockSettings.timePadding = `${value}px`;
		});
		if (urlParams.has('time')) clockSettings.formatTime = urlParams.get('time') || clockSettings.formatTime;
		if (urlParams.has('format')) clockSettings.formatCode = urlParams.get('format') || clockSettings.formatCode;
	});

	$effect(() => {
		setInterval(() => timeNow = (new Date()), 1000);
	});
	$inspect(clockSettings);
</script>

<svelte:head>
	<style>
		body {
			background: none !important;
		}
	</style>
</svelte:head>

<div id="frame" style:background-color={clockSettings.frameBG}>
	<div
		id="clock"
		style:color={clockSettings.clockText}
		style:--clockScale= {clockSettings.clockScale + 'rem'}
		class:right = {clockSettings.right}
		class:center = {clockSettings.center}
		style:--p={clockSettings.padding}
		style:--pb={clockSettings.paddingBottom}
		style:--pl={clockSettings.paddingLeft}
		style:--pr={clockSettings.paddingRight}
		style:--pt={clockSettings.paddingTop}
		class:pb = {clockSettings.paddingBottom.length}
		class:pl = {clockSettings.paddingLeft.length}
		class:pr = {clockSettings.paddingRight.length}
		class:pt = {clockSettings.paddingTop.length}
	>
		<span id="time" style:padding={clockSettings.timePadding}>
			{time}
		</span>
		<span id="date">{date}</span>
	</div>
</div>

<style lang="scss">
	#frame {
		height: 100vh;
		//background: none !important;
	}
	#clock {
		width: 100%;
		overflow: hidden;
		padding: var(--p);
		display: flex;
		text-align: left;
		justify-content: start;
		font-family: 'Poppins';
		flex-direction: column;
		line-height: 1rem;
		line-height: var(--clockScale);
		font-size: var(--clockScale);
	}
	.pb {
		padding-bottom: var(--pb);
	}
	.pl {
		padding-left: var(--pl);
	}
	.pr {
		padding-right: var(--pr);
	}
	.pt {
		padding-top: var(--pt);
	}
	#time {
		font-weight: bold;
		font-size: calc(var(--clockScale) * 1.8) rem;
		line-height: calc(var(--clockScale) * 1.8) rem;
		padding: var(--ptime);
	}
	.right {
		text-align: right !important;
		justify-content: flex-end !important;
	}
	.center {
		text-align: center !important;
		justify-content: center !important;
	}
</style>
