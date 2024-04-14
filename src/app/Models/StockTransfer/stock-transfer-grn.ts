export class StockTransferGrn 
    {
        id: any;
        stk_grn_id: any;
        stk_grn_date: any;	
		stk_grn_no: any;
		b_unit: any;
		b_unitname :any;
		vehicle_id: any;	
		company_id: any;
		fin_year: any;
		username: any;
		reference_id: any;
		applicable_charges_id:any;
		remarks:any;
		reference_status:any;
		receipt_criteria:any;
		rec_b_unit:any;

		stk_transfer_grn_item_details: Stk_Trans_grn_item_details[];
        stk_transfer_grn_trans_info: Stk_Trans_grn_trans_info;
        stk_transfer_grn_bu_dtls:Stk_Transfer_grn_bu_dtls;
		stk_transfer_grn_other_info: Stk_Trans_grn_other_information;
		stk_transfer_grn_resource_cost: Stk_Trans_grn_resource_cost[];
		stk_transfer_grn_docs:Stk_Trans_grn_docs[];
    }  
    
    export class Stk_Transfer_grn_bu_dtls
    {
        businessunit_name: any; 
        mobile_no: any; 
        email_id: any; 
        work_address: any; 
    }

	export class Stk_Trans_grn_item_details
	{
		slno: any; 	
		adv_item_code:any; 
		adv_item_name:any; 
		adv_packing_name:any;
		adv_packing:any; 
		adv_pack_qty:any; 
		adv_pack_uom:any; 
		adv_item_qty:any;
		adv_mat_wt:any; 
		adv_item_uom:any; 
		rcv_pack_qty:any; 
		rcv_pack_uom:any; 
		rcv_item_qty:any; 
		rcv_mat_wt:any; 
		rcv_item_uom:any; 
		pssd_pack_qty:any; 
		pssd_pack_uom:any; 
		pssd_item_qty:any; 
		pssd_mat_wt:any;
		pssd_item_uom:any; 
		unit_rate: any;
		price_based_on: any;	
		amount: any; 	
		discount: any;
		discount_based_on:any;
		discount_amt:any;
		net_amt:any;
		qc_deduction:any
		net_amt_after_qc:any;
		tax_code:any;
		tax_rate:any;	
		tax_amt:any;
		gross_amt:any;
		qc_norms:any;
		warehouse_name:any;	
		rack:any;
		warehouse:any;
		rack_name:any;
		stack_uom:any;
		stack_qty:any;

		grn_id:any;
		checkbox:any;
	}

	export class Stk_Trans_grn_trans_info
	{
		trans_borne_by: any;	
		cash_limit: any;
		mode_of_trans: any;	
		transporter_code: any; 
		transportation_rate: any;
		payment_mode: any;
		payment_term:any;
		bank_name: any;
		acc_name: any;
		acc_no: any;
		branch: any;
		iban: any;
		bic_swift_code: any;
	}
	

	export class Stk_Trans_grn_other_information
	{
		pty_gross_wt: any;	
		pty_gross_uom: any;
		pty_tare_wt: any; 
		pty_tare_uom: any;
		pty_net_wt: any;
		pty_net_uom: any;
		pty_weigh_bridge_name: any;
		pty_weigh_slip_no: any; 
		pty_weigh_date:any;
		own_gross_wt: any;
		own_gross_uom: any; 
		own_tare_wt: any;
		own_tare_uom: any;
		own_net_wt: any;  
		own_net_uom: any;
		own_weigh_bridge_name: any;
		own_weigh_slip_no: any;
		own_weigh_date:any;
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

	export class Stk_Trans_grn_resource_cost 
	{
		sl_no : any;  
		ven_code_name : any;  
		ven_name : any;  
		basis :any; 
		rate : any;  
		brokerage_acc:any;
		tds_rate:any;
		tds_acc:any;
	} 

	export class Stk_Trans_grn_docs
	{
		doc_name: any;
	}
