import { Client } from '@hubspot/api-client'
import { PROP_MAPPINGS } from './mappings.js'
import { queryTickets } from './queries.js'

/**
 * Transform a ticket record into a Billing Request record
 */
function migrateTicketToBillingRequest(ticket: any) {
	const mapped: Record<string, any> = {}

	for (const [ticketProp, billingProp] of PROP_MAPPINGS) {
		if (ticket.properties?.[ticketProp] !== undefined) {
			mapped[billingProp] = ticket.properties[ticketProp]
		}
	}

	if (mapped['request_name'] == undefined) {
		mapped['request_name'] = 'No Name'
	}

	return mapped
}

/**
 * Example migration: copy tickets into billing requests
 */
export async function migrateTicketsToBillingRequests(
	client: Client,
	pageSize: number,
	internalName: string
) {
	// get tickets that meet criteria
	const tickets = await queryTickets(client, pageSize)

	// create request bodies
	const batchCreateObjects = tickets.map((ticket) => {
		const billingRequestProps = migrateTicketToBillingRequest(ticket)
		return { properties: billingRequestProps }
	})

	//  batch create
	try {
		const result = await client.crm.objects.batchApi.create(internalName, {
			inputs: batchCreateObjects,
		})
		console.log(`Created ${result.results.length} Billing Requests`)
	} catch (err) {
		console.error('Failed to create Billing Requests batch', err)
	}
}
