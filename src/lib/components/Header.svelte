<header class="p-2 flex items-center justify-between">
	<h1 class="text-2xl">
		<a href="/">Weather</a>
	</h1>
	<Button
		icon={theme === 'dark' ? mdiWeatherSunny : mdiWeatherNight}
		round
		on:click={toggleTheme}
	/>
</header>

<svelte:head>
	<script>
		const preferTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		let theme = preferTheme();
		try {
			theme = localStorage.getItem('theme') ?? preferTheme();
		} catch {}
		document.documentElement.className = theme;
	</script>
</svelte:head>

<script>
import { onMount } from 'svelte';
import Button from '$lib/components/Button.svelte';
import { mdiWeatherSunny, mdiWeatherNight } from '@mdi/js';

let theme;

const setTheme = theme => {
	document.documentElement.className = theme;

	try {
		localStorage.setItem('theme', theme);
	} catch { /* empty */ }
};

const toggleTheme = () => {
	theme = theme === 'dark' ? 'light' : 'dark';

	setTheme(theme);
};

onMount(() => {
	const preferTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

	theme = preferTheme();

	try {
		theme = localStorage.getItem('theme') ?? preferTheme();
	} catch { /* empty */ }
});
</script>
