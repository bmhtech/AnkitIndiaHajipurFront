export class TagAdviceWithPo 
 {
    adv_po_tag_no:any;
    po_number:any;
    advice_no:any
    item_type: any; 
    veh_no:any; 
    item_subtype: any;  
    busi_partner: any;  
    ul_date: any;
    we_req: any;   
    we_chg_app:true;
    supp_ref_doc:true;
    supp_ref_docno: any;  
    ula_date: any;  
    grn_req: any;  
    business_unit: any; 
    vehicle_id: any;   
    total_qty:true;
    uom:true;
    return_type: any;  
    return_remarks: any;  
    remarks: any; 
    transporter_name:any;
    transporter_code:any; 
    brokerage_active:any;
    app_chgs_id:any;
    advice_id:any;
    weighment_status:any;
    company_id:any;
    fin_year:any;
    username:any;
     
    tag_advice_withpo_item_dtls:tag_advice_withpo_item_dtls[];
    tag_advice_withpo_party_wm:tag_advice_withpo_party_wm;
    tag_advice_withpo_driver_dtls:tag_advice_withpo_driver_dtls;
    tag_advice_withpo_broker_dtls:tag_advice_withpo_broker_dtls[];
    tag_advice_withpo_trans_info:tag_advice_withpo_trans_info
    tag_advice_withpo_terms_con:tag_advice_withpo_terms_con;
    tag_advice_withpo_bp_dtls:tag_advice_withpo_bp_dtls;
    tag_advice_withpo_docs:tag_advice_withpo_docs[];
    tag_advice_withpo_app_chgs:tag_advice_withpo_app_chgs[];
  }

  export class tag_advice_withpo_item_dtls
  {
    sl_no:any;
    item_code:any;
    // item_name: any;  
    packing: any;  
    quantity: any;  
    uom: any;  
    s_qty: any;  
    s_uom: any; 
    mat_wt: any; 
    qc_norms:any;  
    wearhouse: any;  
    rack: any; 
    base_qty: any;  
    //no need to add in database

  }

  export class tag_advice_withpo_party_wm
  {
    gross_wt: any;  
    uom1: any;  
    tare_wt: any;  
    uom2: any;  
    net_wt: any; 
    uom3: any;   
    slip_no:true;
    pw_date:true;
    wb_name: any;      
  }

  export class tag_advice_withpo_driver_dtls
  {
    spot_trans:any;  
    remarks:any;  
    driver_name:any;  
    phone:any;  
    address:any;  
    doc_type:any;  
    doc_no:any;  
    description:any;  
  }

  export class tag_advice_withpo_broker_dtls
  {
    sl_no:any;
    ven_code_name:any;
    basis:any;
    rate:any;
    brokerage_acc:any;
    tds_rate:any;
    tds_acc:any;
  }

  export class tag_advice_withpo_trans_info
  {
    trans_borne_by: any; 
    transporter_name:any; 
    mode_of_trans: any;  
    transport_rate: any;  
    charge_code: any;  
    rate_value: any;  
    payment_mode: any;  
    payment_terms: any;  
    bank_name: any;  
    account_name: any;  
    account_no: any;  
    branch: any;  
    iban: any;  
    bic_swift_code: any;  
    mobile:any;
    ifsc_code:any;
    cash_limit:any;   
  }

  export class tag_advice_withpo_terms_con
  {
    payment_mode: any;   
    payment_terms:  any;   
    bank_name: any;   
    account_name:  any;   
    account_no:  any;   
    branch: any;   
    iban: any;   
    bic_swift_code:  any;   
    cash_limit:any;
    ifsc:any;
    mobile:any;
    tcs_applicable:any;
    tcs_rate:any;
    // app_chgs_id:  any;       
  }

  export class tag_advice_withpo_bp_dtls
  {
    sp_name: any;
    sp_phone: any;	
    sp_fax: any;	
    sp_email: any;	
    sp_address: any;
    cp_name:any;
    cp_designation:any;
    cp_phone:any;
    cp_fax:any;
    cp_email:any;
    cp_address: any;                                  
  }

  export class tag_advice_withpo_docs{
    doc_name: any;}

  export class tag_advice_withpo_app_chgs
  {
    charges_name: any;   
    rate_cal_method: any;   
    tax_rate:any;   
    amount: any;      
  }
