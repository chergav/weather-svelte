import { OPENWEATHERMAP_API_KEY } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, request, params }) {
	const { latitude, longitude, units } = params;

	const lang = request.headers.get('accept-language').slice(0, 2);

	const setUnits = unit => unit === 'imperial' ? 'imperial' : 'metric';

	const getOWM = async ({ latitude = '', longitude = '', path = '', lang = 'en' } = {}) => {
		const URL = 'https://api.openweathermap.org/data/2.5';
		// eslint-disable-next-line max-len
		const query = `lat=${latitude}&lon=${longitude}&appid=${OPENWEATHERMAP_API_KEY}&units=${setUnits(units)}&lang=${lang}`;

		const owm = await fetch(`${URL}/${path}?${query}`, { signal: AbortSignal.timeout(5000) });
		return owm.json();
	};

	const getOWMGeo = async ({ latitude = '', longitude = '' } = {}) => {
		const URL = 'https://api.openweathermap.org/geo/1.0/reverse';
		const query = `lat=${latitude}&lon=${longitude}&appid=${OPENWEATHERMAP_API_KEY}`;

		const geo = await fetch(`${URL}?${query}`, { signal: AbortSignal.timeout(5000) });
		return geo.json();
	};

	return {
		units,
		owm: {
			geo: getOWMGeo({ latitude, longitude }),
			weather: getOWM({ latitude, longitude, path: 'weather', lang }),
			forecast: getOWM({ latitude, longitude, path: 'forecast', lang })
		}
	};
}
