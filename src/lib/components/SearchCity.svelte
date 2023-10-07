<form
	class="relative flex items-center"
	on:submit|preventDefault={handleSearch}
	on:click_outside={() => {
		cityListOpen = false;
	}}
	use:clickOutside
>
	<input
		bind:this={input}
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
		aria-label="Search city"
		placeholder={$_('search_city')}
		spellcheck="false"
		type="text"
		bind:value
		on:focus={() => {
			if (searchPromise) cityListOpen = true;
		}}
	/>

	<Icon class="absolute left-4 text-neutral-500" d={mdiMagnify} />

	<div class="absolute right-4 flex items-center gap-4">
		<button
			class="
				text-neutral-500
				{value ? '' : 'opacity-0'}
				transition-opacity
			"
			aria-label="Reset button"
			disabled={!value}
			title="Clear"
			type="button"
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
					<li>
						<SearchCityAnchor
							{city}
							{units}
							on:click={() => {
								value = '';
							}}
						/>
					</li>
				{:else}
					<p class="p-1 text-sm text-gray-500">
						Not found. Try city's name, comma, 2-letter country code (ISO3166).
					</p>
				{/each}
			</ul>
		{:else if searchResult?.error}
			<p class="text-red-500">API Error: {searchResult.error}. Try later.</p>
		{/if}
	{:catch error}
		<p class="text-red-500">Something went wrong... Error: {error}. Try later.</p>
	{/await}
</form>

<script>
import SearchCityAnchor from '$lib/components/SearchCityAnchor.svelte';
import Icon from '$lib/components/Icon.svelte';
import { mdiMagnify, mdiClose } from '@mdi/js';
import { clickOutside } from '$lib/utilities/clickOutside';
import { _ } from 'svelte-i18n';

export let units;

let input;
let value = '';
let searchPromise;
let cityListOpen = false;

$: if (!value) (searchPromise = null), (cityListOpen = false);

const searchCity = async () => {
	if (!value) return;

	const response = await fetch('/api/search-city', {
		method: 'POST',
		body: JSON.stringify({ search: value }),
		headers: {
			'content-type': 'application/json'
		}
	});

	cityListOpen = true;

	return response.json();
};

const handleSearch = () => {
	searchPromise = searchCity();
};
</script>
