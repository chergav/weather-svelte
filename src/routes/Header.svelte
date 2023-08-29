<header class="p-2 flex items-center justify-between">
	<h1 class="text-2xl">
		<a href="/">Weather</a>
	</h1>
	<Button
		round
		icon={themeClass === 'dark' ? mdiWeatherSunny : mdiWeatherNight}
		on:click={toggleTheme}
	/>
</header>

<script>
import { onMount } from 'svelte';
import Button from '$lib/components/Button.svelte';
import { mdiWeatherSunny, mdiWeatherNight } from '@mdi/js';

let themeClass = '',
	toggleTheme;

onMount(() => {
	let theme = '';

	try {
		theme = localStorage.getItem('theme') || 'system';
	} catch {
		theme = 'system';
	}

	const prefersColorScheme = () =>
		window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

	themeClass = theme === 'system' ? prefersColorScheme() : theme;

	const setTheme = theme => {
		document.documentElement.className = theme;
	};

	toggleTheme = () => {
		themeClass = themeClass === 'dark' ? 'light' : 'dark';

		setTheme(themeClass);

		try {
			localStorage.setItem('theme', themeClass);
		} catch {}
	};

	setTheme(themeClass);
});
</script>
