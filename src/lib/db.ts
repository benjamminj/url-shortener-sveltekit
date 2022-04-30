type Mapping = { slug: string; url: string; id: number };

const mappings: Record<string, Mapping> = {
	1: {
		id: 1,
		slug: 'test',
		url: 'https://test.com'
	}
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
