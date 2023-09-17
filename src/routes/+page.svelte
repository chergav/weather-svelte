{#await data.owm.weather}
	Loading...
{:then weather}
	{#if weather.cod == 200}
		<h1 class="flex items-center text-2xl">{weather.name}, {weather.sys.country}</h1>
		<CurrentWeather {weather} />
	{/if}
{:catch error}
	{error.message}
{/await}

<div class="mb-2"/>

{#await data.owm.forecast}
	Loading...
{:then forecast}
	{#if forecast.cod == 200}
		<Forecast {forecast} />
	{/if}
{:catch error}
	{error.message}
{/await}

<svelte:head>
	{#await data.owm.weather then weather}
		{#if weather}
			<title>Weather {weather.name}</title>
		{:else}
			<title>Weather</title>
		{/if}
	{/await}
</svelte:head>

<script>
import { onMount } from 'svelte';
import CurrentWeather from '$lib/components/CurrentWeather.svelte';
import Forecast from '$lib/components/Forecast.svelte';

/** @type {import('./$types').PageData} */
export let data;
let language = '';

(async () => {
	console.log(await data.owm.weather);
	console.log(await data.owm.forecast);
})();

onMount(async () => {
	language = navigator.language.slice(0, 2);
	const weather = await data.owm.weather;
	if (weather) {
		history.pushState('', '', `geo:${weather.coord.lat},${weather.coord.lon}`);
	}
});
</script>
