import { type T_ASSOCIATIONS_MAP, type T_MAPPING } from './types.js'

export const BILLING_REQUEST_OBECT_TYPE_ID = '2-47710664'
export const PAGE_SIZE = 100
export const TEN_SECOND_LIMIT = 75
export const API_LIMITER_OPTIONS = {
	id: 'hubspot-client-limiter',
	maxConcurrent: 1,
	minTime: 100,
	reservoir: TEN_SECOND_LIMIT,
	reservoirRefreshAmount: TEN_SECOND_LIMIT,
	reservoirRefreshInterval: 10 * 1000,
}

export const TEST_MAPPING: T_MAPPING = {
	source: '29423557386',
	dest: '34068760974',
}
export enum E_ASSOCIATION_KEY {
	emails = 'emails',
	notes = 'notes',
}
export const ASSOCIATION_KEYS: string[] = [
	E_ASSOCIATION_KEY.emails,
	E_ASSOCIATION_KEY.notes,
]
export const ASSOCIATIONS_MAP: T_ASSOCIATIONS_MAP = new Map([
	[E_ASSOCIATION_KEY.emails, { api_name: 'email', property_name: 'emails' }],
	[E_ASSOCIATION_KEY.notes, { api_name: 'note', property_name: 'notes' }],
])
