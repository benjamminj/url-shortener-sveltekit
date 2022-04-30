import { addMapping, getMappings, updateMapping } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';
import { ZodError } from 'zod';
import { Mapping } from './_mappings';

export const get: RequestHandler = async () => {
	const mappings = await getMappings();
	return {
		status: 200,
		body: {
			data: {
				mappings
			}
		}
	};
};

// TODO: separate edit / update payloads?
const EditPayload = Mapping;
const CreatePayload = Mapping.omit({ id: true });

// TODO: try/catch for zod errors?
export const post: RequestHandler = async ({ request }) => {
	const body = await request.formData();

	const intent = body.get('intent');
	const slug = body.get('slug');
	const url = body.get('url');
	const id = body.get('id');

	try {
		if (intent === 'edit') {
			const mapping = EditPayload.parse({ slug, url, id });

			return {
				status: 200,
				body: {
					form: {
						editable: mapping.slug
					}
				}
			};
		}

		if (intent === 'update') {
			const mapping = EditPayload.parse({ slug, url, id });
			// if (typeof id !== 'string') throw new Error('No id provided');
			await updateMapping(mapping);
			return {
				status: 200,
				body: {
					form: {}
				}
			};
		}

		if (intent === 'add') {
			const mapping = CreatePayload.parse({ slug, url });
			await addMapping(mapping);

			return {
				status: 201,
				body: {
					form: {
						url: null,
						slug: null
					}
				}
			};
		}

		// TODO: return the values back to the user.
		return {
			status: 500
		};
	} catch (error) {
		if (error instanceof ZodError) {
			return {
				status: 400,
				body: {
					form: {
						errors: error.format()
					}
				}
			};
		}
	}

	return { status: 500 };
};