import { writable } from 'svelte/store';

const data = {
	geoip: null
};

export const store = writable(data);
