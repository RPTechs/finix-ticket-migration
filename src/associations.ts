import type { T_MAPPING, T_MAPPING_WITH_ASSOCIATIONS } from './types.js'
import * as consts from './consts.js'
import { Client } from '@hubspot/api-client'

export async function getAssociationsForMappings(
	mappings: T_MAPPING[],
	client: Client
) {
	const allMappingsWithAssociations: T_MAPPING_WITH_ASSOCIATIONS[] = []

	for (const mapping of mappings) {
		const mappingWithAssociations: T_MAPPING_WITH_ASSOCIATIONS = {
			...mapping,
			associations: new Map(),
		}

		const res = await client.crm.tickets.basicApi.getById(
			mapping.source,
			undefined,
			undefined,
			consts.ASSOCIATION_KEYS.map(
				(key) => consts.ASSOCIATIONS_MAP.get(key)!.api_name
			)
		)

		for (const key of consts.ASSOCIATION_KEYS) {
			const results =
				res.associations?.[
					consts.ASSOCIATIONS_MAP.get(key)!.property_name
				]?.results || []

			mappingWithAssociations.associations.set(
				key,
				results.map((res) => res.id)
			)
		}

		allMappingsWithAssociations.push(mappingWithAssociations)
	}

	return allMappingsWithAssociations
}
