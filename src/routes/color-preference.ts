import { z } from 'zod';

export const ColorPreference = z.enum(['light', 'dark', 'system']);

export const COLOR_PREFERENCE_KEY = 'theme';

export const post = async ({ request }) => {
	const body = await request.formData();
	const preference = ColorPreference.parse(body.get('preference'));
	const hasClientJs = Boolean(body.get('__hasClientJs__'));

	const cookieHeaders = {
		'Set-Cookie': `${COLOR_PREFERENCE_KEY}=${preference}; path=/; path=/; max-age=31536000;`
	};

	if (hasClientJs) {
		return {
			status: 200,
			headers: cookieHeaders,
			body: {
				preference
			}
		};
	}

	return {
		status: 301,
		headers: {
			location: '/',
			'set-cookie': `${COLOR_PREFERENCE_KEY}=${preference}; path=/; max-age=31536000`
		}
	};
};
