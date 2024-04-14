     export class otherPartner 
     {
          bp_code :any;
          bp_type : any;
          bp_name :any;
          alt_name :any;
          bp_active :any;
          group_type :any;
          sub_group_type :any;
          area :any;
          trans_currency :any;
          block_active : any;   
          reason : any;
          copy_bp_addr : any;
          party_nature : any;
          def_tds_nature : any;
          doc_name : any;
          company_id: any;
          fin_year: any;
          username:any;
          
          op_bussiness_partner_address : Op_bussiness_partner_address;
          op_bussiness_partner_bill_addr : Op_bussiness_partner_bill_addr;
          op_bussiness_partner_delv_from : Op_bussiness_partner_delv_from[];
          op_bussiness_partner_accont : Op_bussiness_partner_accont;
          op_bussiness_partner_statutory : Op_bussiness_partner_statutory;
          op_bussiness_partner_broker : Op_bussiness_partner_broker[];
     }

     export class Op_bussiness_partner_address 
     {
          contact_person : any;
          designation :any;
          phone :any;
          mobile :any;
          fax : any;
          email :any;
          website : any;      
          country : any;
          state : any;
          district : any;
          city : any;
          pincode : any;
          add1 : any;
          add2 : any;
          add3 : any;
     }

     export class Op_bussiness_partner_bill_addr 
     {
          contact_person : any;
          designation :any;
          phone :any;
          mobile :any;
          fax : any;
          email :any;      
          country : any;
          state : any;
          district : any;
          city : any;
          pincode : any;
          add1 : any;
          add2 : any;
          add3 : any;
     }

     export class Op_bussiness_partner_delv_from 
     {
          sl_no : any;
          contact_person :any;
          designation :any;
          address :any;
          city : any;
          pincode :any;
          phone : any;      
          mobile : any;
          fax : any;
          email : any; 
     }

     export class Op_bussiness_partner_accont 
     {
          pay_cont_acc :any;
          adv_pay_acc :any;
          pay_term :any;
          discount :any;
          credit_lim :any;
          credit_days :any;
          cash_lim_status :any;
          cash_limit :any; 
     }

     export class Op_bussiness_partner_statutory 
     {
          registered :any;
          pan_no :any;
          vat_no :any;
          tin_no :any;
          cst_no :any;
          tan_no :any; 
          service_tax :any;
          excise_app :any;
          ecc_no :any;
          ce_reg_no :any;
          ce_range :any;
          ce_dev :any;
          ce_comm :any;
     }

     export class Op_bussiness_partner_broker 
     {  
          sl_no :any;
          broker_name :any;
          broker_code :any;
          
     }