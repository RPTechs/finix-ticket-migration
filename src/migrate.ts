import { PROP_MAPPINGS } from './mappings.js'
import { Client } from '@hubspot/api-client'
import type { T_MAPPING } from './types.js'

function createApiBillingRequestObjectProperties(ticket: any) {
	const mapped: Record<string, any> = {}

	for (const [ticketProp, billingProp] of PROP_MAPPINGS) {
		if (ticket.properties?.[ticketProp] !== undefined) {
			mapped[billingProp] = ticket.properties[ticketProp]
		}
	}

	// handle unnamed
	if (mapped['request_name'] == undefined) {
		mapped['request_name'] = 'No Name'
	}
	// Billing Requst Pipeline = "Billing Requests"
	mapped['hs_pipeline'] = '768306582'

	mapped['source_ticket_id'] = ticket.id

	return mapped
}

export const createApiBillingRequestObjectsFromFetchedTickets = (
	tickets: any[]
) =>
	tickets.map((t) => {
		return { properties: createApiBillingRequestObjectProperties(t) }
	})

export async function batchCreateBillingRequests(
	client: Client,
	reqObjects: any[],
	internalName: string,
	sendBatchMax: number
) {
	const results: T_MAPPING[] = []

	for (let i = 0; i < reqObjects.length; i += sendBatchMax) {
		const chunk = reqObjects.slice(i, i + sendBatchMax)
		const response = await client.crm.objects.batchApi.create(
			internalName,
			{
				inputs: chunk,
			}
		)

		results.push(
			...response.results.map((r) => ({
				source: r.properties['source_ticket_id']!,
				dest: r.id,
			}))
		)
	}

	return results
}
