import { type T_ASSOCIATIONS_MAP, type T_MAPPING } from './types.js'

const secondsToMilliseconds = (seconds: number) => seconds * 1000

export const BILLING_REQUEST_OBECT_TYPE_ID = '2-49298689'
export const PAGE_SIZE = 100
export const SEND_CHUNK_SIZE = 100
const TEN_SECOND_LIMIT = 75
const SINGLE_REQUEST_MIN_TIME_MILLISECONDS = 100
export const API_LIMITER_OPTIONS = {
	id: 'hubspot-client-limiter',
	maxConcurrent: 1,
	minTime: SINGLE_REQUEST_MIN_TIME_MILLISECONDS,
	reservoir: TEN_SECOND_LIMIT,
	reservoirRefreshAmount: TEN_SECOND_LIMIT,
	reservoirRefreshInterval: secondsToMilliseconds(10),
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
