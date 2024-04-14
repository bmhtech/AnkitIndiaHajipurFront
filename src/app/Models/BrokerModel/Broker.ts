     export class Broker 
     {
          id:any;
          broker_Id:any;
          broker_type: any;  
          broker_code: any;  
          name: any;  
          alt_name: any;  
          group_type: any;  
          sub_group_type: any; 
          trans_curr: any;   
          broker_active:true;
          broker_block:true;
          company_id: any;
          fin_year: any;
          username:any;
          doc_list:any;

          constitution: any;
          ssi_app: any;
          ssi_regno: any;

          broker_master_add:Broker_master_add;
          broker_master_add_dtls:broker_master_add_dyn[];  
          broker_master_oth:Broker_master_oth[];
          broker_master_pty:Broker_master_pty[];
          broker_master_vdr:Broker_master_vdr[];
          broker_master_statutory: broker_master_stu_details;
          broker_master_transporter: Broker_master_transporter[];
          broker_master_account:broker_master_acc;
          broker_master_doc:broker_master_doc[];
     }

     export class Broker_master_add 
     {
          website:any;  
          country:any;  
          state_code:any;  
          dist_code:any;  
          city_code:any;  
          postid:any;
          pin:any;  
          address1:any;  
          address2:any;  
          address3:any;  
     }

     export class broker_master_add_dyn
     {
          contact_person:any;   
          designation:any;   
          tell_no:any;   
          mob_no:any;   
          fax_no:any;   
          email:any;   
     }

     export class Broker_master_oth 
     {
          srl_no :any;
          oth_code_name : any;
          oth_name : any;
          basis : any;
          rate :any;
          eff_date : any;
          remarks : any;
     }

     export class Broker_master_pty 
     {
          srl_no :any;
          pty_code_name : any;
          basis : any;
          based_on:any;
          rate :any;
          eff_date : any;
          remarks : any;
          brokerage_acc:any;
          tds_rate:any;
          tds_acc:any;
     }

     export class Broker_master_transporter 
     {
          srl_no:any;
          trans_code_name:any;
          basis:any;
          based_on:any;
          rate:any;
          eff_date:any;
          remarks:any;
          brokerage_acc:any;
          tds_rate:any;
          tds_acc:any;
     }
     
     export class Broker_master_vdr 
     {
          srl_no :any;
          vdr_code_name : any;
          basis : any;
          based_on:any;
          rate :any;
          eff_date : any;
          remarks : any;
          brokerage_acc:any;
          tds_rate:any;
          tds_acc:any;
     }

     export class broker_master_stu_details
     {
          registered :any;
          pan_no :any;
          gst_no :any;
          cin_no :any;
          tan_no :any;
     }

     export class broker_master_acc
     {
          pay_cont_acc:any;
          pref_bank_acc:any;
          pay_term:any;
          credit_lim:any;
          cash_lim:any;
          cash_lim_active:any;
          pay_mode:any;
          acc_holder_name:any;
          acc_no:any;
          bank_name:any;
          ifsc_code:any;
          mobile:any;
          acc_type: any;
          acc_remarks: any;     
     }

     export class broker_master_doc{
          doc_name :any;}
