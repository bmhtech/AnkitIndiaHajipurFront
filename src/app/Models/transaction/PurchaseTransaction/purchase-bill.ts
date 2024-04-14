export class PurchaseBill 
 {
    id:any;
    item_type:any;
    referance_id:any;
    pur_bill_id:any;
    pur_bill_no:any;
    bill_date :  any;
    supplier_name :  any;
    ser_item_type : any;
    ser_item_subtype :  any;
    created_by : any;
    truck_no:any;
    payment_date:any;
    remarks:any;
    company_id: any;
    fin_year: any;   
    item_total:any;
    item_total_gl_ac:any;
    discount:any;
    discount_gl_ac :  any;
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
    purchase_type: any;
    purchase_subtype : any;
    business_unit : any;

    upfrontbrokerage: any;
    upfrontbrokerage_gl_ac: any;
    claim1: any;
    claim1_gl_ac: any;
    claim2: any;
    claim2_gl_ac: any;
    app_chgs_id: any;
    tot_amt: any;
    add1_remarks:any;
    add2_remarks:any;
    referance_type:any;
    supp_ref_doc:any;
    supp_ref_docno:any;
    supp_ref_doc_date:any;
    state:any;
    store_taxamt:any;
    store_charges:any;
    allstorecharges:any;
    store_frieghtcharges:any;
    store_frieghtcharges_gl_ac:any;

    pur_Bill_Item_Details : PurchaseBillItem[];
    pur_Bill_Musterroll_Details : pur_Bill_MusterRoll_Details[];
    pur_Bill_Tax_Info : pur_Bill_Tax_Info;
    pur_Bill_Broker_Details : pur_Bill_Broker_Details[];
    pur_Bill_Bp_Details:Pur_Bill_BPDetails;
    pur_Bill_Account_Info: pur_Bill_Account_Info;
    pur_Bill_Docs:pur_Bill_docs[];
    pur_Bill_app_chgs:pur_Bill_app_chgs[];
    pur_bill_store_chgs:pur_bill_store_chgs[];

    purchase_item_groupwise_summ:Purchase_item_groupwise_summ[];
    purchase_item_groupwise_taxsumm:Purchase_item_groupwise_taxsumm[];
    purchase_item_groupwise_hsnsumm:Purchase_item_groupwise_hsnsumm[];


}





export class Purchase_item_groupwise_taxsumm
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

export class Purchase_item_groupwise_hsnsumm
{
    hsn_code:any;
    amount:any;    
}

export class Purchase_item_groupwise_summ
{
    item_group:any;
    item_total:any;
    discount_amt:any;
    item_ledger:any;
    discount_ledger:any;
}

export class pur_Bill_docs{
    doc_name: any;}


export class pur_Bill_Account_Info {

    mode_of_pay:any;
    pay_term :any; 
    credit_lim :any;  
    bankname:any;
    accountholder:any;
    acc_no:any;
    ifsc:any;
    mobile:any;
    iban: any; 
    bic_swift_code: any; 
    branch: any; 
    payment_date:any; 
     
}

export class Pur_Bill_BPDetails
{
    supp_name: any;
    supp_phone: any;
    supp_fax: any;
    supp_email: any;
    supp_address: any;
    cp_designation:any;
    cp_name: any;
    cp_phone: any;
    cp_fax:any;
    cp_email:any;
    cp_address: any;

}

export class pur_Bill_Broker_Details
{
    sl_no: any;
    broker_name: any;
    brokerage_amt: any;
    broker_code:any;
    broker_other_info : any;
    up_brokerage_amt : any;
    total_brokerage :any;
}

export class pur_Bill_Tax_Info
{
    pan: any;
    gst : any;
    cin: any;
    tan: any;
}

export class pur_Bill_app_chgs{
    charges_name: any;
    add_less: any;
    rate_cal_method: any;
    app_rate: any;
    tax_rate: any;
    amount: any;
}

export class pur_Bill_MusterRoll_Details{
    muster_roll_name: any;}


export class PurchaseBillItem
{
    slno:any;	      
    adv_item_code:any;
    adv_item_name:any;
    classified_item_name:any;
    item_group:any;	
    adv_packing_item:any;
    adv_packing_item_name:any;
    hsn_code:any;
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
    gross_amt:any;
    tax_code:any;	
    tax_name:any;
    tax_rate: any;
    cgstamt:any;
    sgstamt:any;
    igstamt:any;
    tax_amt:any;	      	
    gl_acc:any;	 
    warehouse:any;	 	
    stack:any;	 
   
    checkbox:any;
}

export class  pur_bill_store_chgs
{
	charges_name: any;
	charges_acc:any;
	store_cgst:any;
	store_sgst:any;
	store_igst:any;
	store_amount:any;
	store_taxrate:any;
}









 
