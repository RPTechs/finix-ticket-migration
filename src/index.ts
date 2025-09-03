import 'dotenv/config'
import { Client } from '@hubspot/api-client'
import { queryTickets } from './queries.js'

const PAGE_SIZE = 100
const TEN_SECOND_LIMIT = 75
const API_LIMITER_OPTIONS = {
	id: 'hubspot-client-limiter',
	maxConcurrent: 1,
	minTime: 100,
	reservoir: TEN_SECOND_LIMIT,
	reservoirRefreshAmount: TEN_SECOND_LIMIT,
	reservoirRefreshInterval: 10 * 1000,
}

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
