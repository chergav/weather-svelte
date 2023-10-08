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
	<meta property="og:url" content="[og:url]">
	<meta property="og:title" content="[og:title]">
	<meta property="og:description" content="[og:description]">
	<meta property="og:image" content="https://placehold.co/1200x630/black/orange/png/?text=Weather+app+Svelte&font=roboto">
	<meta name="twitter:title" content="[twitter:title]">
	<meta name="twitter:description" content="[twitter:description]">
	<meta name="twitter:image" content="https://placehold.co/1200x630/black/orange/png/?text=Weather+app+Svelte&font=roboto">
	<meta name="twitter:card" content="summary_large_image">
</svelte:head>

<script>
import Header from '$lib/components/Header.svelte';
import '~/app.css';
</script>
