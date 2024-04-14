export class StockTransferChallan 
{
    stk_challan_id:any;
    stk_challan_no:any;
    stk_challan_date:any;   
    cust_ref_doc_no:any;
    stk_challan_date2:any;
    remark:any;
    confirmed_by:any;
    approval:any;
    reference_id:any;
    passing_wt:any;
    billing_req:any;
    order_point:any;
    reason :any;      
    ref_type:any;
    business_unit:any;
    delivery_business_unit:any;
    grand_total:any;
    company_id: any;
    fin_year: any;
    username:any;
    weighment_required:any;
    vehicle_type:any;
   
    
    stk_Transfer_Challan_Item_Dtls: stk_challan__Item_Dtls[];
    stk_Transfer_Challan_BusinessUnit_Dtls:  stk_challan_business_unit_Dtls[]
    stk_Transfer_Challan_Shipment_Dtls: stk_challan__Shipment_Dtls;
    stk_Transfer_Challan_Trans_Info:stk_challan__Trans_Info;
    stk_Transfer_Challan_Weight_Dtl:stk_challan__weight_dtl;
    stk_Transfer_Challan_Docs:stk_challan__Docs[];
}

export class stk_challan__Docs
{
    doc_name:any;
}

export class stk_challan__weight_dtl
{
    own_uom:any;
    own_gross:any;
    own_tare:any;
    own_net :any;
    eway_bill_no:any;
    own_date:any;
    own_slip_no:any;
}

export class stk_challan__Trans_Info
{
   trans_borne_by:any;
   mode_of_trans:any;
   vehicle_no :any;
   freight_amt:any;
   adv_paid:any;
   charge_code:any;
   trans_code:any;
   payment_term:any;

   vehicle_id:any;
}

export class stk_challan__Shipment_Dtls
{
    ship_addr:any;
    ship_details:any;
    pay_addr:any;
    pay_details:any;
}

export class stk_challan__Item_Dtls
{
    slno:any;
    item_code:any;
    item_name:any;
    packing:any;
    packing_name:any;
    quantity:any;
    uom:any;
    squantity:any;
    suom:any;
    mat_wt:any;
    price:any;
    price_based_on:any;
    amount:any;
    tax_code:any;
    tax_rate:any;
    tax_amt:any;
    total_amt:any
    acc_norms:any;
    checkbox:any;
    stk_challan_id:any;
    cgst_amt:any;
    sgst_amt:any;
    igst_amt:any;
}
export class stk_challan_business_unit_Dtls
{
    sl_no:any;
    business_unit:any;
    cp_name:any;
    cp_contact:any;
}







