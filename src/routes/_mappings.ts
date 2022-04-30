import { z, ZodEffects, type ZodEffectsDef, type ZodOptionalDef, type ZodStringDef } from 'zod';

export const Mapping = z.object({
	id: z.preprocess((x) => Number(x), z.number().nonnegative()),
	slug: z.string().min(1),
	url: z
		.string()
		.nonempty('Required')
		.url()
		.refine((x) => x !== 'http://localhost:3000')
});

/**
 * @todo attributes to support
 *
 * - ✅ required
 * - ✅ minlength
 * - ⬜️ maxlength
 */
export const getDefAttributes = (
	def: ZodStringDef | ZodOptionalDef<z.ZodString> | ZodEffectsDef<z.ZodString>
) => {
	// const checks = def.checks;

	// TODO: input attributes??
	const attributes: Record<string, any> = {};

	const optional = def.typeName === 'ZodOptional';
	if (!optional) {
		// handle optional
		attributes.required = true;
	}

	let checks: ZodStringDef['checks'] = [];

	// TODO: may need to clean up here...
	if (optional) {
		checks = def.innerType._def.checks;
	}

	if (def.typeName === 'ZodEffects') {
		checks = def.schema._def.checks;
	}

	for (const check of checks) {
		if (check.kind === 'url') {
			attributes.type = 'url';
		}

		if (check.kind === 'min' && def.typeName === z.ZodFirstPartyTypeKind.ZodString) {
			attributes.minlength = check.value;
		}
	}

	return attributes;
};

export const getMappingSchemaHtmlAttributes = () => {
	return {
		url: getDefAttributes(Mapping.shape.url._def),
		slug: getDefAttributes(Mapping.shape.slug._def)
	};
};
