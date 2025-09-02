import 'dotenv/config'
import { Client } from '@hubspot/api-client'
import { queryTickets } from './queries.js'

const API_LIMITER_OPTIONS = {
	id: 'hubspot-client-limiter',
	maxConcurrent: 1,
	minTime: 333,
	reservoir: 50,
	reservoirRefreshAmount: 50,
	reservoirRefreshInterval: 10 * 1000,
}

const PAGE_SIZE = 100

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
		limiterOptions: API_LIMITER_OPTIONS,
	})

	const tickets = await queryTickets(client, PAGE_SIZE)
}

try {
	await main()

	console.log('program exited successfully')
} catch (e: any) {
	console.log('error in program execution:')
	console.log(e)
}
