<SearchCity units={data.units} />

{#await data.owm.geo}
	<Loader />
{:then geo}
	<h1 class="my-5 text-2xl">{createHeader(geo[0])}</h1>
{:catch error}
	{error.message}
{/await}

{#await data.owm.weather}
	<Loader />
{:then weather}
	{#if +weather.cod === 200}
		<CurrentWeather units={data.units} {weather} />
	{:else}
		<div class="text-red-500">Weather api error: {weather.message}</div>
	{/if}
{:catch error}
	{error.message}
{/await}

{#await data.owm.forecast}
	<Loader />
{:then forecast}
	{#if +forecast.cod === 200}
		<Forecast {forecast} />
	{:else}
		<div class="text-red-500">Forecast api error: {forecast.message}</div>
	{/if}
{:catch error}
	{error.message}
{/await}

<svelte:head>
	{#await data.owm.geo then geo}
		{#if geo}
			<title>{$_('page_title_in')} {createHeader(geo[0])}</title>
		{:else}
			<title>{$_('page_title')}</title>
		{/if}
	{/await}
</svelte:head>

<script>
import { onMount } from 'svelte';
import SearchCity from '$lib/components/SearchCity.svelte';
import CurrentWeather from '$lib/components/CurrentWeather.svelte';
import Forecast from '$lib/components/Forecast.svelte';
import Loader from '$lib/components/Loader.svelte';
import { _ } from 'svelte-i18n';

/** @type {import('./$types').PageData} */
export let data;
let language = '';

onMount(async () => {
	language = navigator.language.slice(0, 2);
});

const createHeader = geo => {
	const { name, state, country } = geo;
	const localName =
		Object.hasOwn(geo, 'local_names') && Object.hasOwn(geo.local_names, language)
			? geo.local_names[language]
			: name;

	return `${localName}, ${state ? `${state}, ` : ''} ${country}`;
};
</script>
