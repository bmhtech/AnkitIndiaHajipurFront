	export class Enquiry
	{
		id:any;
		enquiry_no: any;	
		enquiry_id:any;
		enquiry_date:   any;	
		required_date:   any;	
		valid_until:   any;	  
		enquiry_type: any;	
		mode_of_enq:   any;	
		enquiry_status:   any;	
		service_type:   any;	
		referance_type:   any;	
		dept:   any;	
		remarks:   any;	
		fullfillment_by:   any;	
		fullfillment_type:   any;	
		payment_term:   any;	
		trans_born_by:   any;	
		loc_of_delivery:   any;	
		security_doc:   any;
		packing_req: any;	
		confirmed_by: any;
		approved: any;
		reason: any;
		company_id: any;
		fin_year: any; 
		referance_id:any; 	
		username:any;

		pur_Enquiry_Service_Details : EnquiryServiceDetails[];
		pur_Enquiry_BPartner_Details : EnquiryBPDetails[];
		pur_Enquiry_docs:pur_Enquiry_docs[];
	}

	export class EnquiryServiceDetails
	{
		checkbox:any;
		sl_no:any;	 
		item_code:any;	 
		packing_item:any;	 
		packing_uom:any;	 
		packing_qty:any;	 
		item_uom:any;	 
		item_qty:any;
		mat_weight:any;	 	
		mrp:any;	 	
		price_based_on:any;	 
		amount:any;	 
		net_amount:any;	
		tax_code:any;	
		tax_rate:any;
		tax_amount:any;	
		total_amount:any; 	 
		qc_norms:any;	
		priority:any;	 
		delivery_date:any;	
		required_date:any; 
		purpose:any;	 
		to_be_used:any;	 
		remarks:any;
		packing_list_req:any;
		packing_list:any;	
		enquiry_no:any;
		enquiry_id:any;

	}

	export class EnquiryBPDetails
	{
		sl_no: any;	
		bp_code: any;		
		cp_name: any;	
		cp_mobile: any;
		send_via: any;
	}

	export class PurchageEnqDocList
	{
		indent_no: any;
		indent_date: any;
		enquiry_id:any;
		inserted_by: any;
		PurchageEnqDocsLists: PurchageEnqDocsLists[];
	}

	export class pur_Enquiry_docs{
		doc_name: any;}

	export class PurchageEnqDocsLists
	{
		checkbox: any;
		indent_no: any;
		item_name: any;
		uom1: any;
		quantity: any;
		priority: any;
	}


