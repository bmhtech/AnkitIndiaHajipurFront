export class CreditNote 

{
    id:any;
    creditnoteid:any;
    invoice_type:any;
    business_unit:any;
    creditnoteno:any;
    creditnotetype:any;
    creditnotedate:any;
    party:any;
    challan:any;
    e_invoice_no:any;
    item_total:any;
    item_total_gl_ac:any;
    discount:any;
    state:any;
    discount_gl_ac:any;
    net_total:any;
    net_total_gl_ac:any;
    tax_total:any;
    tax_total_gl_ac:any;
    total_bill_amt:any;
    total_bill_amt_gl_ac:any;
    referance_id:any;
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
    company_id: any;
    fin_year: any;
    username:any;
    tcsamt:any;
    tcsglac:any;
    salesorderno:any;
    salesorderdate:any;
    allsalesreturndate:any;
    allsalesorderdate:any;
    refchallanno:any;
    refchallandate:any;
    grand_total:any;
    waybill:any;
    
    sales_credit_note_payment_dtls:sales_credit_note_payment_dtls;
    sales_credit_note_broker_dtls:sales_credit_note_broker_dtls[];
    sales_credit_note_item_dtls:sales_credit_note_item_dtls[];
    sales_credit_note_docs: sales_credit_note_docs[];
    sales_credit_note_tax_info :sales_credit_note_tax_info;
    sales_credit_note_bp_dtls:sales_credit_note_bp_dtls;
    sales_credit_note_trans_dtls:sales_credit_note_trans_dtls[];
    sales_credit_note_shipment_dtls:sales_credit_note_shipment_dtls;

    credit_item_groupwise_summ:Item_groupwise_summ[];
    credit_item_groupwise_taxsumm:Item_Groupwise_taxsumm[];
    credit_item_groupwise_hsnsumm:Item_Groupwise_Hsnsumm[];

    sales_credit_note_item_dtls_for_jobwork:sales_credit_note_item_dtls_for_jobwork[];
    sales_credit_note_item_dtls_for_jobwork_price:sales_credit_note_item_dtls_for_jobwork_price[];
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

export class sales_credit_note_payment_dtls
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
 
}


export class sales_credit_note_shipment_dtls
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

export class sales_credit_note_trans_dtls
{
    slno: any; 
    transname: any; 	
    vehicletype: any; 	
    vehicleno: any; 	
    ewaybillno: any; 
    ewaybilldate: any; 
 
}

export class sales_credit_note_tax_info
{
    panno:any;
    gstno:any;
    cinno:any;
    tanno:any;   
}

export class sales_credit_note_bp_dtls
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

export class sales_credit_note_item_dtls
{
    slno:any;
    item_code:any;
    item_name:any;
    packing:any;
    item_group:any;
    hsn_code:any;
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
    salesreturnnoteno:any;
    salesreturnnoteid:any;
}

export class sales_credit_note_docs
{
    doc_name:any;
}

export class sales_credit_note_broker_dtls
{
    slno:any;
    brokercode:any;
    basis:any;
    rate:any;
}

export class sales_credit_note_item_dtls_for_jobwork_price
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

export class sales_credit_note_item_dtls_for_jobwork
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