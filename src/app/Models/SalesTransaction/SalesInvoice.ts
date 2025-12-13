export class SalesInvoice
{
    id:any;
    invoice_id:any;
    invoice_type:any;
    state:any;
    business_unit:any;
    invoice_no:any;
    invoice_date:any;
    party:any;
    brokage_app:any;
    challan:any;
    e_invoice_no:any;
    item_total:any;
    item_total_gl_ac:any;
    discount:any;
    discount_gl_ac:any;
    tax_total:any;
    tax_total_gl_ac:any;
    applicable_amt:any;
    applicable_gl_ac:any;
    adj1_amt:any;
    adj1_gl_ac:any;
    adj2_amt:any;
    adj2_gl_ac:any;
    roundoff_amt:any;
    roundoff_gl_ac:any;
    payable_amt:any;
    payable_amt_gl_ac:any;
    company_id: any;
    fin_year: any;
    username:any;
    tcsamt:any;
    tcsglac:any;
    salesorderno:any;
    salesorderdate:any;
    refchallanno:any;
    refchallandate:any;
    grand_total:any;
    reference_id:any;
    app_chgs_id:any;
    cust_refdocno:any;
    cust_ref_doc_date:any;
    waybill:any;
    job_tot_amt:any;
    jobwork:any;
    policyno:any;
    barcode_dispatch_status:any;
    barcode_remarks:any;
    
    sales_Invoice_Payment_Dtls:sales_Invoice_Payment_Dtls;
    sales_invoice_Broker_Dtls:sales_invoice_Broker_Dtls[];
    sales_Invoice_Item_Dtls:sales_Invoice_Item_Dtls[];
    sales_Invoice_Docs: sales_Invoice_Docs[];
    sales_Invoice_Tax_Info :sales_invoice_tax_info;
    sales_Invoice_BP_Dtls:sales_invoice_bp_dtls;
    sales_Invoice_Trans_Dtls:sales_Invoice_Trans_Dtls[];
    sales_Invoice_Shipment_Dtls:sales_Invoice_Shipment_Dtls;
    item_groupwise_summ:Item_groupwise_summ[];
    item_groupwise_taxsumm:Item_Groupwise_taxsumm[];
    item_groupwise_hsnsumm:Item_Groupwise_Hsnsumm[];
    sales_Invoice_app_chgs:Sales_Invoice_App_Chgs[];
    sales_Invoice_job_work:Sales_Invoice_job_work[];
    sales_Invoice_Item_Dtls_for_jobwork_price:Sales_Invoice_Item_Dtls_for_jobwork_price[];
    sales_Invoice_Item_Dtls_for_jobwork:Sales_Invoice_Item_Dtls_for_jobwork[];
}

export class Item_Groupwise_taxsumm
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
}

export class Item_Groupwise_Hsnsumm
{
    hsn_code:any;
    amount:any;    
}

export class Item_groupwise_summ
{
    item_group:any;
    item_total:any;
    discount_amt:any;
    item_ledger:any;
    discount_ledger:any;
}

export class sales_Invoice_Payment_Dtls
{
    mode_of_payment: any;
    payment_term: any;
    bank_name: any;
    account_name: any;
    account_no: any; 
    branch: any; 
    iban: any; 
    bic_swift_code:any;
    adv_payment:any;
    ifsc_code:any;
    cash_limit:any;
    mobile: any;
    days:any;
}


export class sales_Invoice_Shipment_Dtls
{
    // (remove)
    // ship_addr: any; 
    // ship_details: any; 

    //(add)
    shipaddr:any;
    shipdtls:any;
    paytoaddr:any;
    paytodtls:any;
}

export class sales_Invoice_Trans_Dtls
{
    slno: any; 
    transname: any; 	
    vehicletype: any; 	
    vehicleid: any; 	
    ewaybillno: any; 
    ewaybilldate: any; 
 
}

export class sales_invoice_tax_info
{
    panno:any;
    gstno:any;
    cinno:any;
    tanno:any;   
}

export class sales_invoice_bp_dtls
{

    sp_name: any; 
    sp_phone: any; 	
    sp_fax: any; 	
    sp_email: any; 	
    sp_address: any;   
    cp_name:any; 
    cp_designation:any;   
    cp_phone:any;   
    cp_fax: any;   
    cp_email: any;   
    cp_address: any;

}

export class sales_Invoice_Item_Dtls
{
    slno:any;
    item_code:any;
    item_group:any;
    item_name:any;
    hsn_code:any;
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
    cgstamt: any;
    sgstamt: any;
    igstamt: any;
    tax_amt:any;
    total_amt:any;
    acc_norms:any;
    checkbox:any;
}

export class sales_Invoice_Docs
{
    doctype:any;
    doc_name:any;
}

export class sales_invoice_Broker_Dtls
{
    slno:any;
    brokercode:any;
    basis:any;
    rate:any;
}

export class Sales_Invoice_App_Chgs
{
    charges_name:any;
    add_less:any;
    rate_cal_method:any;
    app_rate:any;
    tax_rate:any;
    amount:any;
}
export class Sales_Invoice_job_work
{
    item_ledger:any;
    job_amount:any;
    cgst_amt:any;
    sgst_amt:any;
    igst_amt:any;
}


export class Sales_Invoice_Item_Dtls_for_jobwork_price
{
    slno: any;
    item_service: any;
    sac_code: any;
    job_price: any;
    tax_value: any;
    cgst_tax: any;
    cgst_amt: any;
    sgst_tax: any;
    sgst_amt: any;
    tot_amount: any;
    igst_tax: any;
    igst_amt: any;
    taxcode: any;
}

export class Sales_Invoice_Item_Dtls_for_jobwork
{
    sl_no : any;
    job_item: any;
    job_item_name: any;
    job_packing: any;
    job_packing_name: any;
    job_hsn: any;
    pack_qty: any;
    pack_uom: any;
    price_based_on: any;
    item_qty: any;
    item_uom: any;
    mat_wt: any;
    tolerance: any;
}