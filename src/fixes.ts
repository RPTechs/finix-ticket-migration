import pprint from './pprint.js'

interface I_MAIN {
	getMigratedBillingRequests(): Promise<any[]>
	updateBillingRequest(request: any): Promise<void>
}

async function main(main: I_MAIN) {
	const requests = await main.getMigratedBillingRequests()

	for (const req of requests) {
		await main.updateBillingRequest(req)
	}
}

try {
	await main()

	console.log('program exited successfully')
} catch (e: any) {
	console.log('error in program execution:')
	pprint(e)
}
