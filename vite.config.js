import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) }
	},
	server: { port: 3000 }
});
