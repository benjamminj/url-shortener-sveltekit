import { getMapping, getMappings } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	const mapping = await getMapping(params.slug);
	return {
		status: 301,
		headers: {
			location: mapping.url
		}
	};
};
