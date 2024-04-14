export class StockTransferSalesInvoice
 {
    id:any;
    business_unit:any;
    stk_sales_inv_id:any;
    stk_sales_inv_no:any;
    stk_sales_inv_date:any;
    stk_sales_inv_order_no:any;
    stk_sales_inv_order_date:any;
    challan:any;
    e_invoice_no:any;
    refchallanno:any;
    refchallandate:any;
    item_total:any;
    item_total_gl_ac:any;
    discount:any;
    discount_gl_ac:any;
    net_total:any;
    net_total_gl_ac:any;
    tax_total:any;
    tax_total_gl_ac:any;
    total_bill_amt:any;
    total_bill_amt_gl_ac:any;
    applicable_amt:any;
    applicable_gl_ac:any;
    adj1_amt:any;
    adj1_gl_ac:any;
    adj2_amt:any;
    adj2_gl_ac:any;
    roundoff_amt:any;
    roundoff_gl_ac:any;
    final_bill_amt:any;
    final_bill_amt_gl_ac:any;
    payable_amt:any;
    payable_amt_gl_ac:any;
    tcsamt:any;
    tcsglac:any;
    grand_total:any;
    reference_id:any;
    company_id: any;
    fin_year: any;
    username:any;
    remarks:any;
    stk_sales_mutlipledates:any;
    multiplechallandate:any;
    
    stk_transfer_sales_inv_item_dtls:Stk_Transfer_sales_inv_item_dtls[];
    stk_transfer_sales_inv_docs: Stk_Transfer_sales_inv_docs[];
    stk_transfer_sales_inv_tax_info :Stk_Transfer_sales_inv_tax_info;
    stk_transfer_sales_inv_bu_dtls:Stk_Transfer_sales_inv_bu_dtls;
    stk_transfer_sales_inv_trans_dtls:Stk_Transfer_sales_inv_trans_dtls[];
    stk_transfer_sales_inv_shipment_dtls:Stk_Transfer_sales_inv_shipment_dtls;
    stocksaleitem_groupwise_hsnsumm: Stocksaleitem_groupwise_hsnsumm[];
    stocksaleitem_groupwise_summ: Stocksaleitem_groupwise_summ[];
    stk_transfer_stocksaleitem_groupwise_taxsummsales_inv_docs: Stocksaleitem_groupwise_taxsumm[];
}

export class Stk_Transfer_sales_inv_bu_dtls
{
    businessunit_name: any; 
    mobile_no: any; 
    email_id: any; 
    work_address: any; 
}

export class Stk_Transfer_sales_inv_shipment_dtls
{
    shipaddr:any;
    shipdtls:any;
    paytoaddr:any;
    paytodtls:any;
}

export class Stk_Transfer_sales_inv_trans_dtls
{
    slno: any; 
    transname: any; 	
    vehicletype: any; 	
    vehicleno: any; 	
    ewaybillno: any; 
    ewaybilldate: any; 
 
}

export class Stk_Transfer_sales_inv_tax_info
{
    panno:any;
    gstno:any;
    cinno:any;
    tanno:any;   
}

export class Stk_Transfer_sales_inv_item_dtls
{
    slno:any;
    item_code:any;
    hsn_code:any;
    item_name:any;
    item_group:any;
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
    discount_type:any;
    discount_rate:any;
    discount_amt: any;
    tax_code:any;
    tax_rate: any;
    tax_amt:any;
    total_amt:any;
    acc_norms:any;
    checkbox:any;
}

export class Stk_Transfer_sales_inv_docs
{
    doc_name:any;
}

export class Stocksaleitem_groupwise_hsnsumm
{
    hsn_code:any;
    amount:any;
}

export class Stocksaleitem_groupwise_summ
{
    item_group:any;
    item_total:any;
    discount_amt:any;
    item_ledger:any;
    discount_ledger:any;
}

export class Stocksaleitem_groupwise_taxsumm
{
      tax_code:any;
      tax_rate:any;
      tax_amt:any;
      percentage:any;
      cgst:any;
      sgst:any;
      igst:any;
      cgstledgerid:any;
      sgstledgerid:any;
      igstledgerid:any;
      taxable_amt:any;
}