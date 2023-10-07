import { OPENWEATHERMAP_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, fetch }) {
	const { search } = await request.json();

	const [city, country] = search.split(',').map(i => i.trim());

	const q = `${city}${country ? `,${country}` : ''}`;

	const URL = 'https://api.openweathermap.org/geo/1.0/direct';
	const query = `q=${q}&appid=${OPENWEATHERMAP_API_KEY}&limit=5`;

	try {
		const res = await fetch(`${URL}?${query}`, { signal: AbortSignal.timeout(5000) });
		const citys = await res.json();
		// const citys = await new Promise(r => { setTimeout(async () => { r(await res.json()) }, 1000) });
		return json({ citys });
	} catch (error) {
		return json({ error: error.message });
	}
}
