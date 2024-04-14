export class Indent{
	//new
	id:any;
	indent_id:any;
	indent_no: any;	
	indent_type:any;
	//end
	indent_date: any;	
	//required_date: any;	
	valid_until: any;	
	ser_item_type: any;	
	referance_type: any;	
	department: any;
	department_name:any;	
	indent_by: any;	
	fullfillment_type: any; 	
	fullfillment_by: any;	
	//unload_advice: any;	
	//weighment: any;	
	remarks: any;	
	confirmed_by: any;	
	approved: any;	
	reason: any;	
	packing_req: any;
	close: any;
	c_reason: any;
	company_id: any;
    fin_year: any;
	username:any;
   // doc_attachment: any;
	pur_Indent_Details : IndentorderDetails[];   
	pur_Indent_docs:pur_Indent_docs[];
	}

	export class IndentorderDetails
	{	
		srl_no:any;
		item_code:any;
		item_name:any;
		req_date:any;
		packing_item:any;
		packing_item_name:any;
		stock_item:any;
		stock_item_uom:any;
		stock_pack_uom:any;
		indent_pack_qty:any;
		indent_item_qty:any;
		stock_pack:any;
		packing_uom: any;
		item_uom:any;
		mat_weight:any;
		indicative_price:any;
		price_based_on:any;
		amount:any;
		mrp:any;  
		net_amount:any;	
		tax_code:any;	
		tax_rate:any;
		tax_amount:any;	
		total_amount:any;      
		qc_norms:any;
		priority:any;
		delivery_date:any;
		purpose:any;
		to_be_used:any;
		remarks:any;
		indent_no: any;	

}

export class getItemMasterPackMat
{
	item_id:any;
	item_code:any;
	uom1:any;
	uom2:any;
	
}
export class pur_Indent_docs
{
	doc_name:any;

}