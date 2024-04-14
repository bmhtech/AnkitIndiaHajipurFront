export class Purl1Selection{
    l1_doc_no: any;	
	date: any;	
	supplier_id: any;	
	remarks: any;   
	company_id: any;
    fin_year: any; 
	username:any;
    pur_L1_Selection_Dtls : PurLiSelectionDetails[];
}

export class PurLiSelectionDetails{
    sl_no: any;	
	pq_doc_no: any;	
	item_code: any;	
	item_name: any;	
	vendor_code: any;	
	vendor_name: any;	
	price: any;	
	req_date: any;	
	qout_date: any;	
	req_qty: any;	
	qout_qty: any;	
	amount: any;	
	status: any;	
	reason: any;	
	remarks: any;
}