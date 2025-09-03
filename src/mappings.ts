// internal names
// [Ticket, Billing Request]
export const PROP_MAPPINGS = [
	// working
	['amount', 'amount'],
	['subject', 'request_name'],
	['finance_ticket_reason', 'billing_request_reason'],
	['billing_start_date', 'billing_start_date'],
	['billing_street_address', 'billing_street_address'],
	['content', 'description'],
	['hs_lastmodifieddate', 'hs_lastmodifieddate'],
	['hs_merged_object_ids', 'hs_merged_object_ids'],
	['finance_review_status', 'billing_review_status'],
	['buyer_id', 'buyer_id'],
	['canceled_reason', 'canceled_reason'],
	[
		'finance_approval_process_initiated',
		'finance_approval_process_initiated',
	],
	['manager_review_status', 'manager_review_status'],
	['rejection_reason', 'rejection_reason'],
	['billing_city', 'billing_city'],
	['billing_country', 'billing_country'],
	['billing_email', 'billing_email'],
	['billing_first_name', 'billing_first_name'],
	['billing_last_name', 'billing_last_name'],
	['billing_note_details', 'billing_note_details'],
	['billing_zip_code', 'billing_zip_code'],
	['final_bill_date', 'final_bill_date'],

	// testing
	// ['original_ticket_owner', 'billing_request_submitter'],
	// ['hs_created_by_user_id', 'hs_created_by_user_id'],
	// ['effective_date', 'effective_date'],
	// ['hs_pipeline_stage', 'hs_pipeline_stage'],

	// calculated
	// ['merchant_id', 'merchant_id'],
	// ['package', 'package'],

	// mismatch
	// ['billing_state', 'billing_state'],

	// read only
	// ['hs_object_source_detail_1', 'hs_object_source_detail_1'],
	// ['hs_object_source_detail_2', 'hs_object_source_detail_2'],
	// ['hs_object_source_detail_3', 'hs_object_source_detail_3'],
	// ['createdate', 'hs_createdate'],
	// ['hs_shared_team_ids', 'hs_shared_team_ids'],
	// ['hs_shared_user_ids', 'hs_shared_user_ids'],
	// ['hs_updated_by_user_id', 'hs_updated_by_user_id'],
	// ['hubspot_owner_assigneddate', 'hubspot_owner_assigneddate'],
	// ['hubspot_owner_id', 'hubspot_owner_id'],
	// ['outstanding_invoice_instructions', 'outstanding_invoice_instructions'],
	// ['refund_credit_channel', 'refund_credit_channels'],
	// ['close_date', 'close_date'],
	// ['hs_object_source_label', 'hs_object_source_label'],
	// ['time_to_close', 'time_to_close'],
]
