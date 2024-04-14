export class PurchaseOrder
{
	id:any;
	pur_orderid:any;
	pur_order_no:any;
	ord_date :  any;
	ser_item_type : any;
	ser_item_subtype :  any;
	supplier_name :  any;
	businessunit : any;
	po_fullfillment : any;
	no_of_advice : any;
	broker_info : any;
	advice_req : any;
	referance_type :  any;
	pref_doc_no :  any;
	madvice_sin_grn: any;	
	weightment_req: any; 
	pan_no: any;
	gst_no: any;
	cin_no: any;
	tan_no: any;
	brokerage_active:any;
	ship_to_addr_id: any;
	ship_to_addr: any;
	pay_to_addr_id: any;
	pay_to_addr: any;
	broker_name: any;
	gl_account: any;
	remarks: any;
	doc_upload: any;
	confirmed_by: any;
	approved: any;
	reason: any;
	term_pur_ord: any;
	pur_ord_type:any;
	master_roll_required:any;
	app_chgs_id:any;
	all_unit:any;
	company_id: any;
	fin_year: any;
	referance_id:any;
	username:any;
	receipt_criteria:any;
//changes on 14-04-2022
	total_qty:any;
	staticuom:any;
	total_qty_copy:any;
	tagadvice_status:any;
//changesends  on 14-04-2022
	//brokerage_app: any;
	//ser_tax_reg_no: any;
	//cst_no: any;
	// registered: any;
	//company_id : any;
	po_status:any;
	channel_req:any;
	sup_channel:any;
	sup_channel_list:any;
	poitemnumber:any;
	consignment_type:any;
	trans_borne_by_chgs:any;
	document_no:any;
	store_charges:any;

	pur_Order_Item_Details : PurchaseOrderItem[];
	pur_Order_BPDetails:BPDetails;
	pur_Order_Terminations:PO_Terminations;
	pur_Order_Terminations_dyn:pur_Order_Terminations_dyn[];
	pur_Order_Trans_Infos:PO_Trans_Infos;
	pur_Order_docs:pur_Order_docs[];
	pur_Order_broker:pur_bussiness_partner_brokers[];
	AccNorms:AccNorms[];
	pur_Order_app_chgs:pur_Order_app_chgs[];
	pur_Order_Terms_Con:pur_Order_Terms_Con;
	pur_Order_Trans_Chgs_dyn:pur_Order_Trans_Chgs_dyn[];
	pur_Order_Terms_Conditon_dyn:pur_Order_Terms_Conditon_dyn[];
	pur_order_store_chgs:Pur_order_store_chgs[];
}

export class pur_Order_Terminations_dyn
{
	charge_name:any;
	termination_cal:any;
	cal_qty:any;
	amount:any;
	method: any;
	tax_rate:any;
	qty:any;
	rate:any;
	gl_account:any;
	tax_amount:any;
	total_amount:any;
}

export class PurchaseOrderItem
{
	slno:any;	      
	item_code:any;
	item_name:any;	
	packing_item:any;	
	classified_item_name:any;	
	packing_item_name:any;
	packing_item_code:any;
	packing_size:any;
	packing_weight:any;
	packing_type:any;
	packing_uom:any;	
	packing_qty:any;	
	stock_uom:any;	
	stock_qty:any;	
	price:any;	
	con_factor:any;
	mat_weight:any;
	price_based_on:any;	
	amount:any;	
	taxable_amount:any;
	discount:any;	
	discount_basedon:any;	
	discount_amount:any;	
	net_amount:any;	
	tax_code:any;
	tax_rate:any;
	cess:any;	
	tax_amount:any;	
	total_amount:any;	
	qc_norms:any;	
	priority:any;	
	delivery_date:any;	
	purpose:any;	
	to_be_used:any;	
	remarks:any;	
	packing_list_req:any;
	packing_list:any;
	checkbox:any;
	pur_order_no:any;
	adjusted_qty:any;
	adjusted_remarks:any;

	//weight_tolerance:any;
}

export class pur_bussiness_partner_brokers 
{
	sl_no : any;  
	ven_code_name : any;  
	basis :any; 
	rate : any; 
	amount : any;
	tax_rate : any;
	tax_amount : any;
	total_amount : any;
	brokerage_acc:any;
	tds_rate:any;
	tds_acc:any;
}

export class BPDetails
{
	supp_name: any;
	supp_phone: any;
	supp_fax: any;
	supp_email: any;
	supp_address: any;
	cp_designation:any;
	cp_name: any;
	cp_phone: any;
	cp_fax:any;
	cp_email:any;
	cp_address: any;

}

export class pur_Order_docs{
	doc_name: any;}

export class PO_Terminations
{
	term_pur_ord:any;
	order_by: any;
	reason: any;
	remarks: any;
	tot_term_chg: any;
	term_add: any;
	term_deduct: any;
	net_term_chg: any;
	charges_descpt:any;
}

export class PO_Trans_Infos
{
	trans_borne_by: any;
	mode_of_trans: any;
	transport_from: any;
	transport_to: any;
	transporter_name: any;
	transport_rate: any;
	//charge_code: any;
	rate_value: any;
	payment_mode: any;
	payment_terms: any;
	bank_name: any;
	account_name: any;
	account_no: any;
	branch: any;
	iban: any;
	bic_swift_code: any;
	cash_limit:any;
	ifsc_code:any;
	mobile:any
}

export class Uom
{
	item_id:any;
	item_code:any;
	uom1:any;
}

export class  accNorms
{
	anm_id: any;
	anm_code: any;
	anm_description: any;
	anm_active: any;
}

export class purchase
{
	bp_Id: any;
	company_id:any;
	sl_no:any;
	bu_name: any;
	contact_person:any;
	designation: any;
	address:any;
	city:any;
	pincode:any;
	fax:any;
	email:any;
	phone: any;
	mobile: any;
}

export class AccNorms
{
	anmd_code: any;
	anm_parameter:any;
	calculation_basis: any;
	basis_amt_uom: any;
	anm_min: any;
	anm_max: any;
}

export class pur_Order_app_chgs
{
	charges_name:any;
	add_less:any;
	rate_cal_method:any;
	app_rate:any;
	amount:any;
	tax_rate:any;
	required:any;
}

export class pur_Order_Terms_Con
{
	payment_mode: any; 
	payment_terms: any; 
	bank_name: any; 
	account_name: any; 
	account_no: any;
	branch: any; 
	iban: any; 
	bic_swift_code: any; 
	cash_limit :any;
	tcs_applicable:any;
	tcs_rate:any;
	ifsc:any;
	mobile:any;
}

export class pur_Order_Trans_Chgs_dyn
{
	slno: any;
	mode_of_trans:any;
	transport_from:any;
	transport_to:any;
	transporter_name:any;
	transport_rate:any;
	charge_code:any;
	chgs_rate_value:any;
	chgs_remarks:any;
	distance_in_km:any;
	uom:any;
	tax_code:any;
	tax_rate:any;
	transportation_acc:any;
	tds_code:any;
	tds_codename:any;
	tds_rate:any;
	tds_acc:any;
	tds_accname:any;
	allowed_shortage:any;
	deduction_basedon:any;
	charge_id:any;
}

export class pur_Order_Terms_Conditon_dyn
{
	slno: any;
	description:any;
	terms_name:any;
}

export class Pur_order_store_chgs
{
	charges_name: any;
	charges_acc:any;
	store_cgst:any;
	store_sgst:any;
	store_igst:any;
	store_amount:any;
	store_taxrate:any;
}