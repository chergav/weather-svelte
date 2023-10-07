<div class="mb-1 flex justify-between">
	<span class="text-amber-700 dark:text-amber-300">{dateFormat(weather.dt, weather.timezone)}</span>
	<div class="text-neutral-600 dark:text-neutral-400">
		<a
			class={!isImperial ? 'text-amber-700 dark:text-amber-300' : ''}
			href={`/geo:${weather.coord.lat},${weather.coord.lon}`}
		>°C, {$_('speed.m_s')}</a>
		<span class="mx-2"></span>
		<a
			class={isImperial ? 'text-amber-700 dark:text-amber-300' : ''}
			href={`/geo:${weather.coord.lat},${weather.coord.lon}/imperial`}
		>°F, {$_('speed.mph')}</a>
	</div>
</div>
<div
	class="
		px-3
		py-2
		flex
		flex-col
		bg-white
		dark:bg-neutral-900
		rounded-2xl
	"
>
	<div class="mb-6 flex flex-col">
		<div class="flex items-center">
			<img
				alt="weather"
				height="100"
				src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
				title={weather.weather[0].description}
				width="100"
			/>
			<span class="text-6xl font-light">{Math.round(weather.main.temp)}°</span>
			<span class="ml-4 text-lg">{weather.weather[0].description}</span>
		</div>
		<span class="text-sm">{$_('feels_like')} {Math.round(weather.main.feels_like)}°</span>
	</div>

	<div
		class="
			grid
			grid-cols-1
			md:grid-cols-2
			gap-2
			md:gap-x-4
			text-sm
			[&_svg]:mr-1
			[&>div]:whitespace-nowrap
		"
	>
		<div class="flex items-center justify-between gap-2">
			<span>
				<Icon class="inline-block" d={mdiWeatherWindy} />
				{$_('wind')}
			</span>
			<div class="flex items-center gap-2">
				{$_(`wind_dir.${degToDirection8(weather.wind.deg)}`, { default: '' })}
				<Icon
					style="transform: scale(-1) rotate({weather.wind.deg}deg);"
					class="inline-block !mr-0"
					d={mdiNavigationOutline}
					size="sm"
				/>
				<span>{weather.wind.speed.toFixed(1)} {unitOfSpeed}</span>
			</div>
		</div>
		<div class="flex items-center justify-between gap-2">
			<span>
				<Icon class="inline-block" d={mdiWater} />
				{$_('humidity')}
			</span>
			<span>{weather.main.humidity}%</span>
		</div>
		<div class="flex items-center justify-between gap-2">
			<span>
				<Icon class="inline-block" d={mdiGauge} />
				{$_('pressure')}
			</span>
			<span>
				{weather.main.pressure} {$_('pressure_unit.hpa')}
				({(weather.main.pressure * 0.75).toFixed(0)} {$_('pressure_unit.mm_hg')})
			</span>
		</div>
		<div class="flex items-center justify-between gap-2">
			<span>
				<Icon class="inline-block" d={mdiEyeOutline} />
				{$_('visibility')}
			</span>
			<span>{(weather.visibility / 1000).toFixed(1)} {$_('km')}</span>
		</div>
		<div class="flex items-center justify-between gap-2">
			<span>
				<Icon class="inline-block" d={mdiWeatherSunsetUp} />
				{$_('sunrise')}
			</span>
			<span>{timeFormat(weather.sys.sunrise, weather.timezone)}</span>
		</div>
		<div class="flex items-center justify-between gap-2">
			<span>
				<Icon class="inline-block" d={mdiWeatherSunsetDown} />
				{$_('sunset')}
			</span>
			<span>{timeFormat(weather.sys.sunset, weather.timezone)}</span>
		</div>
	</div>
</div>

<script>
import Icon from '$lib/components/Icon.svelte';
import {
	mdiWeatherSunsetUp,
	mdiWeatherSunsetDown,
	mdiWater,
	mdiWeatherWindy,
	mdiGauge,
	mdiEyeOutline,
	mdiNavigationOutline
} from '@mdi/js';
import { _ } from 'svelte-i18n';

export let weather;
export let units;

$: unitOfSpeed = units === 'imperial' ? $_('speed.mph') : $_('speed.m_s');
$: isImperial = units === 'imperial';

const dateFormat = (timestamp, timeZoneOffset) => {
	const date = new Intl.DateTimeFormat(undefined, {
		weekday: 'short',
		day: 'numeric',
		month: 'long',
		hour: 'numeric',
		minute: 'numeric',
		timeZone: 'UTC'
	});
	return date.format(new Date((timestamp + timeZoneOffset) * 1000));
};

const timeFormat = (timestamp, timeZoneOffset) => {
	const date = new Intl.DateTimeFormat(undefined, {
		timeStyle: 'short',
		timeZone: 'UTC'
	});
	return date.format(new Date((timestamp + timeZoneOffset) * 1000));
};

// const degToDirection16 = angle => {
// 	const directions = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
// 	return directions[Math.floor(angle / 22.5 + 0.5) % 16];
// }

const degToDirection8 = angle => {
	const directions = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];
	return directions[Math.floor(angle / 45) % 16];
};
</script>
