	export class Quotation
	{
		id:any;
		quotation_id:any;
		quotation_no: any;	
		quotation_date: any;	
		required_date: any;	
		valid_until: any;	
		quotation_type: any;	
		mode_of_quotation: any;	
		quotation_status: any;	
		quotation_service: any;	
		quotation_refeance_type: any;	
		department: any;	
		supplier_name: any;	
		delivery_terms: any;	
		delivery_perior: any;	
		transport_borne_by: any;	
		mode_of_transport: any;	
		transport_name: any;	
		remarks: any;
		loc_of_delivery:any;
		payment_term:any;
		fullfillment_type:any;
		fullfillment_by:any;
		packing_req: any;
		doc_no:any;
		doc_date:any;
		confirmed_by: any;
		approved: any;
		reason: any;
		company_id: any;
		fin_year: any;
		referance_id:any;
		username:any;
	// doc_attachment: any;
		
		pur_Quotation_Service : QuotationDetails[];
		pur_quotation_Business_Partner_details: Business_Partner_details;
		pur_Quotation_docs:pur_Quotation_docs[];
		pur_Quotation_Broker: pur_Quotation_Broker[];
		
	}

	export class QuotationDetails
	{
		slno:any;	
		item_code:any;
		item_name:any;
		packing_item_name:any;	
		packing_item:any;	
		packing_uom:any;	
		packing_qty:any;	
		stock_uom:any;	
		stock_qty:any;	
		price:any;
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
		tax_amount:any;	
		total_amount:any;	
		qc_norms:any;
		qc_id:any;	
		priority:any;	
		delivery_date:any;	
		purpose:any;	
		to_be_used:any;	
		remarks:any;	
		packing_list_req:any;
		packing_list:any;
		quotation_no:  any;
		checkbox: any;
	}

	export class pur_Quotation_Broker
	{
		sl_no : any; 
		ven_code_name: any;  
		basis: any;  
		rate: any;     
		brokerage_acc: any;
		tds_acc: any;
		tds_rate: any;
	}

	export class pur_Quotation_docs{
		doc_name:any;}


	export class Business_Partner_details
	{
		sp_name: any;	
		sp_phone: any;	
		sp_fax: any;
		sp_email: any;
		sp_address: any;
		cp_designation: any;	
		cp_name: any;
		cp_phone: any;	
		cp_fax: any;	
		cp_email: any;	
		cp_address: any;	
	}
