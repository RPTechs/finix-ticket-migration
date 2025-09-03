import type { Client } from '@hubspot/api-client'
import type { PublicObjectSearchRequest } from '@hubspot/api-client/lib/codegen/crm/deals/models/all.js'
import { FilterOperatorEnum } from '@hubspot/api-client/lib/codegen/crm/exports/models/all.js'
import { PROP_MAPPINGS } from './mappings.js'

export async function queryTickets(client: Client, pageSize: number) {
	const tickets: any[] = []
	let after: string | undefined = undefined

	do {
		const objectSearchRequest: PublicObjectSearchRequest = {
			filterGroups: [
				{
					filters: [
						{
							propertyName: 'hs_pipeline',
							operator: FilterOperatorEnum.Eq,
							value: '94158235',
						},
						{
							propertyName: 'hs_pipeline_stage',
							operator: FilterOperatorEnum.In,
							values: ['173020599', '173020600', '173020601'],
						},
					],
				},
			],
			properties: PROP_MAPPINGS.map(([m, _]) => m),
			limit: pageSize,
			after,
		}

		const res =
			await client.crm.tickets.searchApi.doSearch(objectSearchRequest)

		tickets.push(...res.results)

		after = res.paging?.next?.after
	} while (after)

	return tickets
}
