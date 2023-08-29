<form
	on:submit|preventDefault={handleSearch}
	class="relative flex items-center"
	use:clickOutside
	on:click_outside={() => {
		cityListOpen = false;
	}}
>
	<input
		type="text"
		spellcheck="false"
		aria-label="Search city"
		class="
			w-full
			px-12
			py-3
			outline-none
			border
			border-neutral-200
			dark:border-neutral-800
			border-opacity-0
			dark:border-opacity-0
			focus:border-opacity-100
			dark:focus:border-opacity-100
			bg-white
			dark:bg-neutral-900
			{cityListOpen
			? 'rounded-t-3xl border-opacity-100 dark:border-opacity-100 shadow-lg'
			: 'rounded-full'}
			placeholder:text-neutral-500
			placeholder:text-sm
		"
		bind:value
		bind:this={input}
		on:focus={() => {
			if (searchPromise) cityListOpen = true;
		}}
		placeholder={$_('search_city')}
	/>

	<Icon d={mdiMagnify} class="absolute left-4 text-neutral-500" />

	<div class="absolute right-4 flex items-center gap-4">
		<button
			type="button"
			aria-label="Reset button"
			title="Clear"
			class="
				text-neutral-500
				{value ? '' : 'opacity-0'}
				transition-opacity
			"
			disabled={!value}
			on:click={() => {
				value = '';
				input.focus();
			}}
		>
			<Icon d={mdiClose} />
		</button>
	</div>

	{#await searchPromise}
		<div
			class="
				absolute
				right-12
				animate-spin
				w-5
				h-5
				rounded-full
				border-2
				border-neutral-200
				border-r-blue-600
				dark:border-neutral-800
				dark:border-r-blue-600
			"
		/>
	{:then searchResult}
		{#if searchResult?.citys && cityListOpen}
			<ul
				class="
					absolute
					top-12
					w-full
					p-2
					rounded-b-3xl
					border-x
					border-b
					border-neutral-200
					dark:border-neutral-800
					bg-white
					dark:bg-neutral-900
					shadow-lg
					z-10
				"
			>
				{#each searchResult.citys as city}
					<li
						on:click={() => {
							value = '';
						}}
						on:keypress
					>
						{@html createLink(city)}
					</li>
				{:else}
					<p class="text-sm text-gray-500">
						Not found. Try city's name, comma, 2-letter country code (ISO3166).
					</p>
				{/each}
			</ul>
		{:else if searchResult?.error}
			<p class="text-red-500">API Error: {searchResult.error}. Try later.</p>
		{/if}
	{:catch error}
		<p class="text-red-500">Something went wrong... Try later.</p>
	{/await}
</form>

<script>
import { onMount } from 'svelte';
import Icon from '$lib/components/Icon.svelte';
import { mdiMagnify, mdiClose } from '@mdi/js';
import { clickOutside } from '$lib/utilities/clickOutside';
import { _ } from 'svelte-i18n';

export let units;

let input;
let value = '';
let searchPromise;
let cityListOpen = false;
let loading = false;
let language;

$: if (!value) (searchPromise = null), (cityListOpen = false);

onMount(() => {
	language = navigator.language.slice(0, 2);
});

const searchCity = async () => {
	if (!value) return;

	loading = true;

	const response = await fetch('/api/search-city', {
		method: 'POST',
		body: JSON.stringify({ search: value }),
		headers: {
			'content-type': 'application/json',
		},
	});

	loading = false;
	cityListOpen = true;

	return response.json();
};

const handleSearch = () => {
	searchPromise = searchCity();
};

const createLink = city => {
	const { name, state, country, lat, lon, local_names } = city;
	const cityName =
		local_names && Object.hasOwn(city.local_names, language)
			? city.local_names[language]
			: name;

	return `
		<a
			class="
				px-4
				py-2
				flex
				items-center
				rounded-2xl
				hover:bg-black/10
				dark:hover:bg-white/10
				transition-colors
			"
			href=${`/city/${lat}/${lon}`}${units === 'imperial' ? '/imperial' : ''}
		>
			<span>${cityName}, ${state ? `${state}, ` : ''} ${country}</span>
			<img class="ml-1" src="https://openweathermap.org/images/flags/${country.toLowerCase()}.png" alt="flag">
		</a>
	`;
};
</script>
