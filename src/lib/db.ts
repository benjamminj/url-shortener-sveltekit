import { dev } from '$app/env';

type Mapping = { slug: string; url: string; id: number };

const mappings: Record<string, Mapping> = {};

export const db = (namespace: KVNamespace): KVNamespace => {
	if (dev) {
		const get = async (key: string) => JSON.stringify(mappings[key]);
		const getWithMetadata = async (key: string) => ({
			value: JSON.stringify(mappings[key]),
			metadata: null
		});
		const put = async (key: string, value: string) => {
			mappings[key] = JSON.parse(value);
		};
		const del = async (key: string) => {
			delete mappings[key];
		};
		const list = async () => {
			return {
				keys: Object.keys(mappings).map((name) => ({ name })),
				list_complete: true,
				cursor: ''
			};
		};
		return {
			list: list as KVNamespace['list'],
			get: get as KVNamespace['get'],
			getWithMetadata: getWithMetadata as KVNamespace['getWithMetadata'],
			put: put as KVNamespace['put'],
			delete: del as KVNamespace['delete']
		};
	}

	return namespace;
};

export const getMappings = async (): Promise<Mapping[]> => {
	return Object.values(mappings);
};

export const getMapping = async (slug: string) => {
	const mapping = Object.values(mappings).find((m: Mapping) => m.slug === slug);
	if (!mapping) throw new Error(`Slug ${slug} doesn't exist`);
	return mapping;
};

let _id = 2;
export const addMapping = async ({ slug, url }: { slug: string; url: string }) => {
	// TODO: dupe slugs
	const id = ++_id;
	mappings[id] = { id, slug, url };
	return { slug, url };
};

export const updateMapping = async ({ id, slug, url }: Mapping) => {
	if (!mappings[id]) throw new Error('Mapping not found');
	mappings[id] = { slug, url, id };
	return { slug, url };
};
