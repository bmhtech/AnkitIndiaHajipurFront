export class nongoodsservice 
{
  id:any;
  nongoodsserviceid:any;
  service_type:any;
  serviceno:any;
  ordertype:any;
  b_unit:any;
  billing_from:any;
  billing_to:any;
  billdate:any;
  remarks:any;
  app_chgs_id:any;
  confirmed_by:any;
  approved:any;
  reason:any;
  party:any;
  company_id:any;
  fin_year:any;
  username:any;
  pan_no:any;
  gst_no:any;
  cin_no:any;
  tan_no:any;

  nongoodsservice_item_details: nongoodsservice_item_details[];
  nongoodsservice_terms_con: nongoodsservice_terms_con;
  nongoodsservice_party_dtls: nongoodsservice_party_dtls[];
  nongoodsservice_bank_dtls: nongoodsservice_bank_dtls;
  nongoodsservice_summary: nongoodsservice_summary;
  nongoodsservice_summary_dyn: nongoodsservice_summary_dyn[];
  nongoodsservice_time_service: nongoodsservice_time_service[];
  nongoodsservice_docs: nongoodsservice_docs[];
  nongoodsservice_exit_clause: nongoodsservice_exit_clause;
  nongoodsservice_exit_clause_dyn: nongoodsservice_exit_clause_dyn[];
}
  export class nongoodsservice_item_details
  {
    nongoodsserviceid:any;
    slno:any;
    service_types:any;
    services:any;
    account_code:any;
    details:any;
    service_uom:any;
    service_quantity:any;
    price:any;
    amount:any;
    taxable_amount:any;
    discount:any;
    discount_basedon:any;
    discount_amount:any;
    net_amount:any;
    tax_code:any;
    tax_rate:any;
    tax_amount:any;
    total_amount:any;
    nonservice_desc_details: nonservice_desc_details[];
  }

  export class nonservice_desc_details
  {
    slno:any;
    desc_name:any;
    bill_period:any;
    bill_on:any;
    amount_change:any;
    desc_qty:any;
    desc_uom:any;
    desc_price:any;
    desc_total:any;
    billing_from:any;
    billing_to:any;
    duedate:any;
    remarks:any;
    serviceno:any;
  }

  export class nongoodsservice_terms_con
  {
    paymenttype:any;
    payment_mode:any;
    cash_limit :any;
    tcs_applicable:any;
    tcs_rate:any;
    payment_terms:any;
    bank_name:any; 
    account_name:any; 
    account_no:any;
    branch:any;
    ifsc:any;
    mobile:any;
    iban:any; 
    bic_swift_code:any;
  }

  export class nongoodsservice_party_dtls
  {
    sl_no :any; 
    party_name:any;
    cp_name:any;
    cp_contact:any;
    send_via:any;
    tcs_applicable:any;
    tcs_rate:any;
  }

  export class nongoodsservice_bank_dtls
  {
    pay_mode:any;
    pay_term:any;
    bank_name:any;
    account_no:any;
    ifsc_code:any;
    cash_limit:any;
    account_name:  any;  
    branch:  any;   
    iban:  any;   
    bic_swift_code:any;
  }

  export class nongoodsservice_summary
  {
    item_total:any;
    discount:any;
    tax_total:any;
    net_amount:any;
    app_brokerage:any;
    net_r_value:any;
  }

  export class nongoodsservice_summary_dyn
  {
    charge_name:any;
    add_less:any;
    rate_cal_method:any;
    app_rate:any;
    tax_rate:any;
  }

  export class nongoodsservice_time_service
  {
    slno:any;
   // term_check : any;
    description :any;
  }

  export class nongoodsservice_docs
  {
    doc_name:any;
  }

  export class nongoodsservice_exit_clause
  {
    term_nongoods_service: any;
    order_by: any;
    charges_descpt:any;
    reason: any;
    remarks: any;
    tot_term_chg: any;
    term_add: any;
    term_deduct: any;
    net_term_chg:any;
  }

  export class nongoodsservice_exit_clause_dyn
  {
    charge_name:any;
    termination_cal:any;
    method: any;
    cal_qty:any;
    qty:any;
    amount:any; 
    rate: any;
    gl_account: any;
    tax_rate: any;
    tax_amount: any;
    total_amount:any;
  }