import 'dotenv/config'
import { Client } from '@hubspot/api-client'
import pprint from './pprint.js'
import { getMigratedBillingRequests } from './queries.js'
import { updateBillingRequest } from './update.js'
import * as consts from './consts.js'

interface I_MAIN {
	getMigratedBillingRequests(
		client: Client,
		pageSize: number
	): Promise<string[][]>

	updateBillingRequest(client: Client, request: string[][]): Promise<void>
}

async function main(impl: I_MAIN) {
	const API_TOKEN = process.env.API_TOKEN!
	if (API_TOKEN == '') {
		throw new Error('missing API_TOKEN')
	}

	const client: Client = new Client({
		accessToken: API_TOKEN,
		limiterOptions: consts.API_LIMITER_OPTIONS,
	})

	const requests = await impl.getMigratedBillingRequests(
		client,
		consts.PAGE_SIZE
	)

	// for (const req of requests) {
	// 	await impl.updateBillingRequest(client, req)
	// }
}

try {
	await main({ getMigratedBillingRequests, updateBillingRequest })

	console.log('program exited successfully')
} catch (e: any) {
	console.log('error in program execution:')
	pprint(e)
}
