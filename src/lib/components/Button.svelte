<button
	type="button"
	aria-label="button"
	class="
		inline-flex
		items-center
		justify-start
		text-gray-800
		dark:text-white
		{bg ? bg : 'enabled:hover:bg-black/10 enabled:dark:hover:bg-white/10'}
		disabled:text-neutral-900
		disabled:dark:text-neutral-600
		transition-all
		[&>*]:pointer-events-none
		{round ? 'rounded-full' : 'rounded-lg'}
		{classSize}
		{className}
	"
	{disabled}
	{title}
	on:click
>
	{#if icon}
		<Icon d={icon} />
	{/if}
	<slot />
	{#if label}
		<span class="px-2">{label}</span>
	{/if}
	{#if iconRight}
		<Icon d={iconRight} />
	{/if}
</button>

<script>
import Icon from '$lib/components/Icon.svelte';

export let label = '';
export let title = '';
export let disabled = false;
export let round = false;
export let icon = '';
export let iconRight = '';
export let bg = '';
export let size = 'md';
let className = '';
export { className as class };

const sizes = {
	sm: 'p-1 text-sm',
	md: 'p-2 text-base',
	lg: 'p-3 text-xl'
};
let classSize = sizes[size] || sizes.md;
</script>
