export class PurchaseGRN {
	id: any;
	grn_id: any;
	b_unit: any;
	b_unitname: any;

	item_type: any;
	grn_date: any;
	grn_no: any;
	supplier_name: any;
	referance_type: any;
	sales_process: any;
	sales_order: any;
	vehicle_id: any;
	company_id: any;
	fin_year: any;
	username: any;
	applicable_charges_id: any;
	remarks: any;
	brokerage_active: any;
	purchase_type: any;
	purchase_subtype: any;
	receipt_criteria: any;
	//15-04-2022
	multiunloadadvice: any;

	pur_good_receipt_item_details: ReceiptItemDetails[];
	pur_good_receipt_Business_Partner_details: BusinessPartnerdetails;
	pur_good_reciept_trans_info: RecieptTransInfo;
	pur_goods_receipt_other_information: ReceiptOtherInformation;
	pur_good_receipt_resource_cost: ReceiptResourceCost[];
	pur_good_receipt_docs: pur_good_receipt_docs[];
	pur_good_receipt_broker: Pur_good_receipt_broker[];
	pur_good_receipt_driver_dtls: Pur_good_receipt_driver_dtls;
}

export class ReceiptItemDetails {
	slno: any;
	adv_item_code: any;
	adv_item_name: any;
	classified_item_name: any;
	hsn_code: any;
	adv_packing_name: any;
	adv_packing: any;
	packing_item_code: any;
	packing_type: any;
	packing_size: any;
	packing_weight: any;
	adv_pack_qty: any;
	adv_pack_uom: any;
	adv_item_qty: any;
	adv_mat_wt: any;
	adv_item_uom: any;
	rcv_pack_qty: any;
	rcv_pack_uom: any;
	rcv_item_qty: any;
	rcv_mat_wt: any;
	rcv_item_uom: any;
	pssd_pack_qty: any;
	pssd_pack_uom: any;
	pssd_item_qty: any;
	pssd_mat_wt: any;
	pssd_item_uom: any;
	con_factor: any;
	unit_rate: any;
	price_based_on: any;
	amount: any;
	discount: any;
	discount_based_on: any;
	discount_amt: any;
	net_amt: any;
	qc_deduction: any
	net_amt_after_qc: any;
	tax_code: any;
	tax_rate: any;
	cgstamt: any;
	sgstamt: any;
	igstamt: any;
	tax_amt: any;
	gross_amt: any;
	qc_norms: any;
	warehouse_name: any;
	rack: any;
	stack_uom: any;
	stack_qty: any;
	restwt: any;
	grn_id: any;
	checkbox: any;
}

export class Pur_good_receipt_driver_dtls {
	spot_trans: any;
	remarks: any;
	driver_name: any;
	phone: any;
	address: any;
	doc_type: any;
	doc_no: any;
	description: any;
	doc_img: any;
}


export class BusinessPartnerdetails {
	grn_id: any;
	sp_name: any;
	sp_designation: any;
	sp_phone: any;
	sp_fax: any;
	sp_email: any;
	sp_address: any;
	cp_name: any;
	cp_designation: any;
	cp_phone: any;
	cp_fax: any;
	cp_email: any;
	cp_address: any;
}


export class RecieptTransInfo {
	trans_borne_by: any;
	cash_limit: any;
	mode_of_trans: any;
	transporter_code: any;
	transportation_rate: any;
	payment_mode: any;
	payment_term: any;
	bank_name: any;
	acc_name: any;
	acc_no: any;
	branch: any;
	iban: any;
	bic_swift_code: any;
}


export class ReceiptOtherInformation {
	pty_gross_wt: any;
	pty_gross_uom: any;
	pty_tare_wt: any;
	pty_tare_uom: any;
	pty_net_wt: any;
	pty_net_uom: any;
	pty_weigh_bridge_name: any;
	pty_weigh_slip_no: any;
	pty_weigh_date: any;
	own_gross_wt: any;
	own_gross_uom: any;
	own_tare_wt: any;
	own_tare_uom: any;
	own_net_wt: any;
	own_net_uom: any;
	own_weigh_bridge_name: any;
	own_weigh_slip_no: any;
	own_weigh_date: any;
	adv_freight_charge: any;
	freight_paid_amt: any;
	dc_no: any;
	dc_date: any;
	cn_no: any;
	cn_date: any;
	arg_tax_dtl: any;
	arg_tax_amt: any;
	vehicle_id: any;
	bill_amt: any;
	checkpost_name: any;
	entry_date: any;
	remarks: any;
}

export class Pur_good_receipt_broker {
	sl_no: any;
	ven_code_name: any;
	ven_name: any;
	basis: any;
	rate: any;
	brokerage_acc: any;
	tds_rate: any;
	tds_acc: any;
}

export class ReceiptResourceCost {
	charge_name: any;
	rate_cal_method: any;
	amount: any;
	tax_rate: any;
	tax_amt: any;
	gross_amt: any;
}

export class pur_good_receipt_docs {
	doc_name: any;
}