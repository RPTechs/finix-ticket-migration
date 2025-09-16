import { Client } from '@hubspot/api-client'
import { AssociationSpecAssociationCategoryEnum } from '@hubspot/api-client/lib/codegen/crm/deals/models/all.js'

export async function updateBillingRequests(
	client: Client,
	requests: string[][]
): Promise<void> {
	for (const request of requests) {
		try {
			await client.crm.associations.v4.basicApi.create(
				'2-49298689',
				request[0]!,
				'ticket',
				request[1]!,
				[
					{
						associationCategory:
							AssociationSpecAssociationCategoryEnum.UserDefined,
						associationTypeId: 61,
					},
				]
			)
		} catch (e: any) {
			console.log(`association error: ${e}`)
		}
	}
}
