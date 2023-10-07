{#each Object.entries(listToDays(forecast.list)) as [day, weather]}
{@const temps = weather.reduce((a, v) => [...a, v.main.temp], [])}
	<div class="mt-2 mb-1 text-amber-700 dark:text-amber-300">{day}</div>
	<div
		class="
			relative
			px-3
			py-2
			flex
			flex-col
			bg-white
			dark:bg-neutral-900
			rounded-2xl
			overflow-x-auto
		"
	>
		<div class="flex gap-5">
			{#each weather as w}
				<div class="w-[50px] flex flex-col flex-shrink-0 items-center">
					<span
						class="text-sm font-light whitespace-nowrap"
					>{timeFormat(w.dt, forecast.city.timezone)}</span>
					<img
						alt="weather"
						height="50"
						src={`https://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png`}
						title={w.weather[0].description}
						width="50"
					/>
					<span class="text-xl font-light">{Math.round(w.main.temp)}°</span>
					<div
						class="mt-12 text-sky-700 dark:text-sky-300 whitespace-nowrap"
						title={$_('probability_of_precipitation')}
					>
						<Icon class="inline-block" d={w.pop >= 0.5 ? mdiWater : mdiWaterOutline} size="sm" />
						<span class="text-xs font-light">{(w.pop * 100).toFixed(0)}%</span>
					</div>
				</div>
			{/each}
		</div>
		<div class="absolute top-28">
			<ChartTemp {temps} />
		</div>
	</div>
{/each}

<script>
import Icon from '$lib/components/Icon.svelte';
import ChartTemp from '$lib/components/ChartTemp.svelte';
import { mdiWater, mdiWaterOutline } from '@mdi/js';
import { _ } from 'svelte-i18n';

export let forecast;

const timeFormat = (timestamp, timeZoneOffset) => {
	const date = new Intl.DateTimeFormat(undefined, {
		hour: 'numeric',
		minute: 'numeric',
		timeZone: 'UTC'
	});
	return date.format(new Date((timestamp + timeZoneOffset) * 1000));
};

const dateFormat = timestamp => {
	const date = new Intl.DateTimeFormat(undefined, {
		weekday: 'short',
		day: 'numeric',
		month: 'long',
		timeZone: 'UTC'
	});
	return date.format(new Date(timestamp));
};

const getRelativeDate = (timestamp, timeZoneOffset) => {
	const date = dateFormat((timestamp + timeZoneOffset) * 1000);
	const today = dateFormat(Date.now() + timeZoneOffset * 1000);
	const tomorrow = dateFormat(Date.now() + timeZoneOffset * 1000 + 86400000);

	return date === today ? $_('today') : date === tomorrow ? $_('tomorrow') : date;
};

const listToDays = list => {
	return list.reduce((acc, v) => {
		const date = getRelativeDate(v.dt, forecast.city.timezone);

		if (!acc[date]) {
			acc[date] = [];
		}

		acc[date].push(v);

		return acc;
	}, {});
};
</script>
