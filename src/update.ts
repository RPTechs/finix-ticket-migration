import { Client } from '@hubspot/api-client'
import type { SimplePublicObject } from '@hubspot/api-client/lib/codegen/crm/companies/index.js'

export async function updateBillingRequest(
	client: Client,
	request: SimplePublicObject
): Promise<void> {
	console.log('updateBillingRequest')
}
