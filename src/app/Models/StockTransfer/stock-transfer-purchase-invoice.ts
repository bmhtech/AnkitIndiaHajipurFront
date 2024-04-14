export class StockTransferPurchaseInvoice 
    {
        id:any;
        reference_id:any;
        stk_trans_pur_inv_id:any;
        stk_trans_pur_inv_no:any;
        stk_trans_pur_inv_date :any;
        business_unit: any;
        created_by : any;
        vehicle_id: any;
        remarks: any;
        company_id: any;
        fin_year: any;   
        item_total:any;
        item_total_gl_ac:any;
        discount:any;
        discount_gl_ac : any;
        qc_deduction :  any;
        net_amt :any;
        net_amt_gl_ac : any;
        qc_deduction_gl_ac : any;
        amt_after_deduction :any;
        amt_after_deduction_gl_ac : any;
        add_tax  : any;
        add_tax_gl_ac : any;
        post_tax_amt :any;
        post_tax_amt_gl_ac :any;
        other_charges : any;
        other_charges_gl_ac : any;
        payable_amt: any;
        payable_amt_gl_ac: any;
        add1 : any;
        add1_gl_ac : any;
        add2 : any;
        add2_gl_ac : any;
        roundoff_amt : any;
        roundoff_gl_ac : any;
        payable_party : any; 
        payable_party_gl_ac : any;
        already_paid : any;
        already_paid_gl_ac : any;
        net_payable_party :any;
        net_payable_party_gl_ac : any;
        username:any;
        send_business_unit:any;
    
        stk_transfer_pur_inv_item_dtls : Stk_Transfer_pur_inv_item_dtls[];
        stk_transfer_pur_inv_musterroll_dtls : Stk_Transfer_pur_inv_musterroll_dtls[];
        stk_transfer_pur_inv_tax_info : Stk_Transfer_pur_inv_tax_info;
        stk_transfer_pur_inv_bu_dtls:Stk_Transfer_pur_inv_bu_dtls;
        stk_transfer_pur_inv_docs:Stk_Transfer_pur_inv_docs[];
    }
    
    export class Stk_Transfer_pur_inv_docs{
        doc_name: any;}
    
    export class Stk_Transfer_pur_inv_bu_dtls
    {
        businessunit_name: any; 
        mobile_no: any; 
        email_id: any; 
        work_address: any; 
    }
   
    
    export class Stk_Transfer_pur_inv_tax_info
    {
        pan: any;
        gst : any;
        cin: any;
        tan: any;
    }
    
    export class Stk_Transfer_pur_inv_musterroll_dtls{
        muster_roll_name: any;}
    
    
    export class Stk_Transfer_pur_inv_item_dtls
    {
        slno:any;	      
        adv_item_code:any;
        adv_item_name:any;	
        adv_packing_item:any;
        adv_packing_item_name:any;
        passed_packing_qty:any;	
        passed_packing_uom:any;	
        passed_item_qty:any;	
        passed_mat_weight:any;	
        passed_item_uom:any;	
        unit_rate:any;	
        price_based_on:any;
        amount:any;	
        discount:any;	
        discount_basedon:any;	
        discount_amount:any;	 
        net_amount:any;	
        qc_deduction :any;
        net_amt_after_qc :any;
        tax_code:any;	
        tax_rate: any;
        tax_amt:any;	     
        gross_amt:any;	
        gl_acc:any;
       
        checkbox:any;
        stk_grn_id:any;
    }
    
  
