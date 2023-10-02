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
	href="/geo:{lat},{lon}{units === 'imperial' ? '/imperial' : ''}"
	on:click
>
	<span>{cityName}, {state ? `${state}, ` : ''} {country}</span>
	<img
		class="ml-1"
		src="https://openweathermap.org/images/flags/{country.toLowerCase()}.png"
		alt="flag"
	/>
</a>

<script>
import { onMount } from 'svelte';

export let units;
export let city;

const { name, state, country, lat, lon, local_names } = city;
let language;

onMount(() => {
	language = navigator.language.slice(0, 2);
});

$: cityName = local_names && Object.hasOwn(local_names, language) ? local_names[language] : name;
</script>
