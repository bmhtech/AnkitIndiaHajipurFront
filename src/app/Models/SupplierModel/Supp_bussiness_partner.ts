export class Supp_bussiness_partner {
     bp_Id:any;
     id:any;
     bp_type: any;  
     bp_code: any;  
     bp_name: any;  
     alt_name: any;  
     bp_active:true;
     group_type: any;  
     sub_group_type: any;  
     trans_currency: any;  
     block_active:true;;
     broker_status:any;
     reason: any;  
     business_unit : any;
     copy_bp_addr: any;  
     party_nature: any;  
     def_tds_nature: any;  
     address: any;
     company_id: any;
     fin_year: any;
     username:any;
    
     constitution: any;
     ssi_app: any;
     ssi_regno: any;
     export:any;
    

     supp_bussiness_partner_address :Supp_bussiness_partner_addr;
     supp_bussiness_partner_bill_addr :Supp_bussiness_partner_bill_address;
     supp_bussiness_partner_delv_from :Supp_bussiness_partner_delv_froms[];
     supp_bussiness_partner_accont :Supp_bussiness_partner_acc;
     supp_bussiness_partner_statutory :Supp_bussiness_partner_stat;
     supp_bussiness_partner_broker :Supp_bussiness_partner_brokers[];
     supp_bussiness_partner_addr_dtls:Supp_bussiness_partner_addr_dyn[];
     supp_bussiness_partner_bill_addr_dtls:Supp_bussiness_partner_bill_addr_dyn[];
     supp_bussiness_partner_docs:Supp_bussiness_partner_doc[];
}


export class Supp_bussiness_partner_addr {
   
     website : any;  
     country :any;
     state_code:any; 
     city_code:any; 
     dist_code:any; 
     postid:any;
     pincode : any;   
     add1 : any;  
     add2 :any;  
     add3 :any;
     address:any;
     city:any;
     state:any;
     district:any;
}
export class Supp_bussiness_partner_addr_dyn {
     contact_person : any;  
     designation : any;  
     phone : any;   
     mobile : any;  
     fax : any;   
     email :any;

}

export class Supp_bussiness_partner_bill_address {

     country :any;
     state_code:any; 
     city_code:any; 
     dist_code:any; 
     postid:any;
     pincode :any;  
     add1 : any;  
     add2 :any;
     add3 :any; 
}

export class Supp_bussiness_partner_bill_addr_dyn {
      contact_person : any;  
      designation : any;  
      phone :any;
      mobile : any;  
      fax :any; 
}

export class Supp_bussiness_partner_delv_froms {

   
     contact_person : any;  
     designation : any;  
     phone :any;
     mobile : any;  
     fax :any; 
     email :any; 
     city : any;  
     pincode :any;
     address :any;
     sl_no :any;  
     bu_name:any;
     transport_own:any;
     transporters:any;
}


export class Supp_bussiness_partner_acc {

     mode_of_pay:any;
     pay_term :any; 
     bankname:any;
     accountholder:any;
     acc_no:any;
     cash_limit :any;
     tcs_applicable:any;
     tcs_rate:any;
     tcs_date:any;
     pay_cont_acc :any;   
     party_bankacc :any;  
     credit_lim :any;    
     cash_lim_status :any;     
     ifsc:any;
     mobile:any;
     iban: any; 
     bic_swift_code: any; 
     branch: any;

     acc_type: any;
     acc_remarks: any;     

      
}

export class Supp_bussiness_partner_stat {

     registered : any;  
     pan_no : any;  
     tan_no :any; 
     cin_no : any;  
     gst_no :any; 
     supplier_type:any;

}

export class Supp_bussiness_partner_brokers {
  
     sl_no : any;  
     ven_code_name : any;  
     ven_name : any;  
     basis :any; 
     based_on:any;
     rate : any;  
     eff_date :any; 
     remarks:any;
     brokerage_acc:any;
     tds_rate:any;
     tds_acc:any;

}

export class Supp_bussiness_partner_doc {
      doc_name : any;       
  }
  
  export class broker_name{
     broker_Id:any;
     name:any;
     broker_code:any;
  }


  export class Unit{
     unit:any;
  }