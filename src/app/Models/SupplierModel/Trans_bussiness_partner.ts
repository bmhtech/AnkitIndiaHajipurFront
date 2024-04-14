export class Trans_bussiness_partner {
    id:any;
    bp_Id:any;
    bp_code:any;
    trans_group:any;
    bp_type:any;
    bp_name:any;
    alt_name:any;
    bp_active:any;
    group_type:any;
    sub_group_type:any;                            
    trans_currency:any;
    block_active:any;
    pak_mat_replc:any;
    company_id: any;
    fin_year: any;
    broker_status:any;
    username:any;
    constitution:any;
      ssi_app:any;
      ssi_regno:any;
    //party_nature:any;
    //def_tds_nature:any;

  
   // fin_year:any;
    trans_bussiness_partner_address:Trans_bussiness_partner_address;
    trans_bussiness_partner_address_dtls:Trans_bussiness_partner_address_dlts[];
    //trans_bussiness_partner_bill_addr:Trans_bussiness_partner_bill_addr;
   // trans_bussiness_partner_delv:Trans_bussiness_partner_delv[];
    trans_bussiness_partner_accont :Trans_bussiness_partner_accont;
    trans_bussiness_partner_statutory:Trans_bussiness_partner_statutory;
    trans_bussiness_partner_broker:Trans_bussiness_partner_broker[];
    trans_bussiness_partner_vehicle_dtls:Trans_vehicle_detalis[];
    trans_bussiness_partner_doc:Trans_bussiness_partner_docs[];
    trans_bussiness_partner_tds:Trans_bussiness_partner_tds;
}
export class Trans_bussiness_partner_docs {

   doc_name:any;
  
}
 export class Trans_bussiness_partner_address 
 {
    website:any;
    country:any;
    post_office:any;
    state_code:any;
    dist_code:any;
    city_code:any;
    pincode:any;
    add1:any;
    add2:any;
    add3:any;
  
}


export class Trans_bussiness_partner_address_dlts 
{
   contact_person:any;
   designation:any;
   phone:any;
   mobile:any;
   fax:any;
   email:any;  
}





/*export class Trans_bussiness_partner_bill_addr {

   // bp_code:any;
   // company_id:any;
    contact_person:any;
    designation:any;
    phone:any;
    mobile:any;
    fax:any;
    email:any;
    country:any;
    state:any;
    district:any;
    city:any;
    pincode:any;
    add1:any;
    add2:any;
    add3:any;
   // fin_year:any;
}*/


/*export class Trans_bussiness_partner_delv {

  
    sl_no:any;
    contact_person:any;
    designation:any;
    address:any;
    city:any;
    pincode:any;
    phone:any;
    mobile:any;
    fax:any;
    email:any;
  
 
}*/


export class Trans_bussiness_partner_accont {
  // id:any;
  // prefered_bank_acc:any;
  /* pay_cont_acc :any;   
   party_bank_acc :any;
   pay_term :any;   
   credit_lim :any;    
   cash_lim_status :any;     
   cash_limit :any;
   mode_of_pay:any;
   accountholder:any;
   acc_no:any;
   bankname:any;
   ifsc:any;
   mobile:any;
   tds_account:any;

 advance_payment:any; 
 mode_advance_payment:any;
 max_advance_per_vehicle:any;
 party_nature:any;
 tds_rate:any;
 default_tds_nature:any; */

 pay_cont_acc:any; 
 // prefered_bank_acc:any; 
  party_bank_acc :any; 
  pay_term :any;    
  credit_lim :any;     
  cash_lim_status :any;      
  cash_limit :any; 
  tcs_applicable:any;
  tcs_rate:any;
  tcs_date:any;
  adv_pay:any;  
  adv_pay_mode:any; 
  mode_of_adv_pay:any; 
  max_adv_vehi:any; 
  acc_holder_name:any; 
  acc_no:any; 
  bank_name:any; 
  branch: any;
  ifsc_code:any; 
  mobile:any; 
  tds_account:any; 
  party_nature:any; 
  default_tds_nature:any;  
  tds_rate:any; 
  mode_of_pay:any; 
  iban: any;
  bic_swift_code: any;

  acc_type:any;
  acc_remarks:any;
}


export class Trans_bussiness_partner_statutory {

  //  id:any;
    registered:any;
    pan_no:any;
    gst_no:any;
    cin_no;
    tan_no:any;
   /* vat_no:any;
    tin_no:any;
    cst_no:any;
   
    service_tax:any;
    excise_app:any;
    ecc_no:any;

    ce_reg_no:any;
    ce_range:any;
    ce_dev:any;
    ce_comm:any;*/

   // fin_year:any;
 
}

export class Trans_bussiness_partner_broker  
{
    sl_no:any;
    ven_code_name:any;
    basis:any;
    based_on:any;
    rate:any;
    effective_date:any;
    remarks:any;
    brokerage_acc:any;
    tds_rate:any;
    tds_acc:any;   
}


export class Trans_vehicle_detalis {
//id:any;
vehicle_type:any;
vehicle_name:any;
// details:any;
}


export class Trans_bussiness_partner_tds 
{
   tds_id:any;
   tds_section:any;
   tds_rate:any;
   tds_acc:any;
}
