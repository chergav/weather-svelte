<div
	class="
		h-full
		min-h-screen
		bg-neutral-100
		dark:bg-black
		text-gray-900
		dark:text-white
	"
>
	<Header />

	<main class="m-auto p-2 max-w-[590px]">
		<slot />
	</main>

	<!-- <footer></footer> -->
</div>

<svelte:head>
	<meta name="description" content="Svelte weather app" />
</svelte:head>

<script>
import Header from './Header.svelte';
import '~/app.css';
</script>
