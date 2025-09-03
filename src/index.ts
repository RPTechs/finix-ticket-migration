import 'dotenv/config'
import { Client } from '@hubspot/api-client'
import * as consts from './consts.js'
import { getAssociationsForMappings } from './associations.js'
import {
	createApiBillingRequestObjectsFromFetchedTickets,
	batchCreateBillingRequests,
} from './migrate.js'
import { fetchOneTicketPage, fetchTickets } from './queries.js'

function pprint(content: any): void {
	console.dir(content, { depth: null, colors: true })
}

async function main() {
	const API_TOKEN = process.env.API_TOKEN!
	if (API_TOKEN == '') {
		throw new Error('missing API_TOKEN')
	}

	const client: Client = new Client({
		accessToken: API_TOKEN,
		limiterOptions: consts.API_LIMITER_OPTIONS,
	})

	// const tickets = await fetchOneTicketPage(client, 100)

	const tickets = await fetchTickets(client, consts.PAGE_SIZE)
	console.log(`tickets found: ${tickets.length}`)

	const reqObjects = createApiBillingRequestObjectsFromFetchedTickets(tickets)

	const mappings = await batchCreateBillingRequests(
		client,
		reqObjects,
		consts.BILLING_REQUEST_OBECT_TYPE_ID,
		consts.SEND_CHUNK_SIZE
	)
	console.log(mappings)

	// const mappings = [consts.TEST_MAPPING]
	// const mappingsWithAssociations = await getAssociationsForMappings(
	// 	mappings,
	// 	client
	// )
	// console.log(mappingsWithAssociations)

	// for each mapping:
	//   for each association:
	//		for each record id:
	//		  - unassign from source
	//		  - assign to dest
}

try {
	await main()

	console.log('program exited successfully')
} catch (e: any) {
	console.log('error in program execution:')
	pprint(e)
}
