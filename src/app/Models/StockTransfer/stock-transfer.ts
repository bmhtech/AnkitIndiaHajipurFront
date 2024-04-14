export class StockTransfer 
 {
    id:any;
    order_id:any;
    order_no:any;
    ref_type:any;
    order_date:any;
    order_point:any;
    business_unit:any;
    delivery_business_unit:any;
    loading_point:any;
    unloading_point:any;
    weightment_req:any
    tax_info:any;
    enway_bill:any;
    shipment_mode:any;
    order_status:any;
    reference:any;
    remarks:any;
    confirmed_by:any;
    approval:any;
    reason:any;
    approved_remarks:any;
    app_chgs_id:any;
    company_id: any;
    fin_year: any;
    username:any;
    reference_id:any;

    //new add
    billing_req:any;
    applicable_charges_id:any
    passing_wt:any;

    stock_Transfer_Item_Dtls: stock_transfer_Item_Dtls[];
    stock_Transfer_Summary:  stock_transfer_Summary;
    stock_Transfer_Summary_dyn:stock_transfer_Summary_dyn[];
    stock_Transfer_Trans_Info:stock_transfer_Trans_Info;
    stock_transfer_resource_cost: StktransReceiptResourceCost[];
    stock_transfer_doc: Stock_transfer_Doc[];
    stock_transfer_terminations_dyn:Stock_Transfer_Terminations_dyn[];
    stock_transfer_terminations:Stock_Transfer_Terminations;
}

export class Stock_Transfer_Terminations_dyn
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

export class Stock_Transfer_Terminations
{
    term_stk_ord:any;
    order_by: any;
    reason: any;
    remarks: any;
    tot_term_chg: any;
    term_add: any;
    term_deduct: any;
    net_term_chg: any;
    charges_descpt:any;
}


export class Stock_transfer_Doc
    {
        doc_name:any;
    }

//new add
export class StktransReceiptResourceCost
{
    charge_name:any;
    rate_cal_method:any;
    amount:any;
    tax_rate:any;
    tax_amt:any;
    gross_amt:any;
}

//end

export class stock_transfer_Item_Dtls
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
    gross_amt:any;
    tax_id:any;
    tax_rate:any;
    tax_amt:any;
    net_amt:any;
    acc_norms:any;
    checkbox:any;
    order_id:any;
    warehouse:any;
    rack:any;
    remarks:any;
    cgst_amt:any;
    sgst_amt:any;
    igst_amt:any;

}

export class stock_transfer_Summary
{
    item_total:any;
    discount:any;
    tax_total:any;
    net_amount:any;
    app_brokerage:any;
    net_r_value:any;
}

export class stock_transfer_Summary_dyn
{
    charge_name:any;
    rate_cal_method:any;
    amount:any;
    tax_rate:any;
}

export class stock_transfer_Trans_Info
{
   //trans_borne_by:any;
   mode_of_trans:any;
   charge_code:any;
   trans_code:any;
   payment_term:any;
  // transporters:any;
}