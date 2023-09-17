import { dev } from '$app/environment';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ request }) {
	const fallbackCoord = { latitude: 59.8983, longitude: 30.2618 }; // SPb

	const { latitude, longitude } = dev ? fallbackCoord : request.cf; // cloudflare request geo

	throw redirect(308, `/geo:${latitude},${longitude}`);
}
