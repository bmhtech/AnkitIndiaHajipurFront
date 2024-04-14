export class IndentOrder 
{
    id:any;
    indent_id:any;
    indent_no: any;
    indent_date: any;	
    referance_type: any;	
    business_unit:any;
    refer_by:any;
    service_item:any;
    department: any;
    indent_status:any;
    valid_until: any;	
    remarks: any;	
    confirmed_by: any;
    approved: any;	
    reason: any;	
    approved_remarks:any;
    company_id: any;
    fin_year: any;
    username:any;

	stock_Indent_Item_Details : IndentorderDetail[];   
    stock_Indent_docs:stock_Indent_docs[];
    stock_Indent_Terminations_dyn:stock_Transfer_Terminations_dyn[];
    stock_Indent_Terminations:stock_Terminations;
}

	export class IndentorderDetail
	{	
          indent_id:any;
          indent_no:any;
          checkbox:any;
	      srl_no:any;
          item_code:any;
          req_date:any;
          packing_item:any;
          stock_item:any;
          stock_item_uom:any;
          stock_pack_uom:any;
		  indent_pack_qty:any;
		  indent_item_qty:any;
		  stock_pack:any;
		  packing_uom: any;
          item_uom:any;
          indicative_price:any;
          price_based_on:any;
          amount:any;        
          qc_norms:any;
          priority:any;
          delivery_date:any;
          purpose:any;
          to_be_used:any;
          remarks:any;
          //new 
          net_amount:any;
          tax_code:any;
          tax_rate:any;
          tax_amount:any;
          total_amount:any;
        
          item_name:any;
          packing_item_name:any;

}
export class stock_Indent_docs
{
	doc_name:any;

}

export class stock_Transfer_Terminations_dyn
{
  charge_name:any;
  termination_cal:any;
  cal_qty:any;
  amount:any;
  method: any;
  tax_rate:any;
 
}

export class stock_Terminations{
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

