  export class UnloadAdvice 
  {
    id: any;
    pur_orderid:any;
    item_type: any; 
    veh_no:any; 
    item_subtype: any;  
    busi_partner: any;  
    ref_type: any;  
    ul_date: any;
    we_req: any;   
    we_chg_app:any;
    supp_ref_doc:true;
    supp_ref_docno: any;  
    supp_ref_doc_date:any;
    ula_date: any;   
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
    referance_id:any;
    weighment_id:any;
    customer:any;
    business_unitname:any;
    item_subtypename:any;
    supp_name:any;
    poitemnumber:any;
    jobwork:any;
    looseitem:any;

    unadviceno:any;
    unadviceid:any;
    
    weighment_status:any;
    advice_type:any;
    qc_required: any;
    company_id:any;
    fin_year:any;
    username:any;
    total_qty_copy:any;
    weight_bridge_location:any;
    wm_unload_advice_item_dtls:Wm_unload_advice_item_dtls[];
    wm_unload_advice_party_wm:Wm_unload_advice_party_wm;
    wm_unload_advice_driver_dtls:Wm_unload_advice_driver_dtls;
    wm_unload_advice_broker_dtls:Wm_unload_advice_broker_dtls[];
    wm_unload_advice_trans_info:Wm_unload_advice_trans_info;
    wm_unload_advice_terms_con:Wm_unload_advice_terms_con;
    wm_unload_advice_bp_dtls:Wm_unload_advice_bp_dtls;
    wm_unload_advice_docs:Wm_unload_advice_doc[];
    wm_unload_advice_app_chgs:wm_unload_advice_app_chgs[];

    wm_unload_advice_item_dtls_for_jobwork:Wm_unload_advice_item_dtls_for_jobwork[];
  }

  export class Wm_unload_advice_item_dtls
  {
    sl_no:any;
    item_code:any;
    item_name: any;  
    classified_item_name:any;
    packing: any; 
    packing_name: any; 
    packing_item_code: any; 
    packing_size: any; 
    packing_weight: any; 
    packing_type: any; 
    quantity: any;  
    uom: any;  
    s_qty: any;  
    s_uom: any; 
    con_factor:any;

    mat_wt: any;   
    qc_norms:any;
    wearhouse: any;  
    rack: any; 
    base_uom:any;
    base_qty: any;  
    //no need to add in database
    unadviceno:any;
    unadviceid:any; 
    checkbox:any;

    pur_dyn_id:any;
    price_based_on:any;
  }

  export class Wm_unload_advice_party_wm
  {
    gross_wt: any;  
    uom1: any;  
    tare_wt: any;  
    uom2: any;  
    net_wt: any; 
    uom3: any;   
    slip_no: any;
    pw_date: any;
    wb_name: any;      
  }

  export class Wm_unload_advice_driver_dtls
  {
    spot_trans:any;  
    remarks:any;  
    driver_name:any;  
    phone:any;  
    address:any;  
    doc_type:any;  
    doc_no:any;  
    description:any;  
    doc_img:any;
  }

  export class Wm_unload_advice_broker_dtls
  {
    sl_no:any;
    ven_code_name:any;
    basis:any;
    rate:any;
    brokerage_acc:any;
    tds_rate:any;
    tds_acc:any;
  }

  export class Wm_unload_advice_trans_info
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

  export class Wm_unload_advice_terms_con
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

  export class Wm_unload_advice_bp_dtls
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

  export class Wm_unload_advice_doc{
    doc_name: any;}

  export class wm_unload_advice_app_chgs
  {
    charges_name: any;   
    rate_cal_method: any;   
    tax_rate:any;   
    amount: any;      
  }

  export class Wm_unload_advice_item_dtls_for_jobwork
  { 
      sl_no: any;
      job_item: any;
      job_packing: any;
      job_hsn: any;
      pack_qty: any;
      pack_uom: any;
      price_based_on: any;
      item_uom: any;
      mat_wt: any;
      tolerance: any;
  }

  

 







