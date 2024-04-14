export class cust_bussiness_partner {
     id: any;
     cp_code: any;
     cp_Id: any;
     cp_type: any;
     //new
     unita: any;
     //
     cp_name: any;
     alt_name: any;
     business_unit: any;
     cp_active: any;
     group_type: any;
     broker_status: any;
     sub_group_type: any;
     trans_currency: any;
     block_active: any;
     reason: any;
     copy_bp_addr: any;
     checkbox: any;
     company_id: any;
     fin_year: any;
     username: any;
     print_to_name: any;
     constitution: any;
     ssi_app: any;
     ssi_regno: any;
     export: any;
     saleclosed: any;

     cust_bussiness_partner_bill_addr_dtls: Cust_bussiness_partner_bill_addr_dyn[];
     cust_bussiness_partner_docs: Cust_bussiness_partner_doc[];
     cust_bussiness_partner_accont: Cust_bussiness_partner_acc;
     cust_bussiness_partner_address: Cust_bussiness_partner_addr;
     cust_bussiness_partner_statutory: Cust_bussiness_partner_stat;
     cust_bussiness_partner_broker: Cust_bussiness_partner_brokers[];
     cust_bussiness_partner_delv_to: Cust_bussiness_partner_delv_to[];
     cust_bussiness_partner_bill_addr: Cust_bussiness_partner_bill_address;
     cust_bussiness_partner_addr_dtls: Cust_bussiness_partner_addr_dyn[];
     cust_bussiness_partner_shipping_addr_dtls: cust_bussiness_partner_shipping_addr_dtls[];
}

export class Cust_bussiness_partner_addr {
     website: any;
     country: any;
     postid: any;
     state: any;
     state_code: any;
     city_code: any;
     dist_code: any;
     pincode: any;
     add1: any;
     add2: any;
     add3: any;
     address: any;
}

export class Cust_bussiness_partner_addr_dyn {
     contact_person: any;
     designation: any;
     phone: any;
     mobile: any;
     fax: any;
     email: any;

}

export class Cust_bussiness_partner_bill_address {
     country: any;
     state_code: any;
     city_code: any;
     dist_code: any;
     postid: any;
     pincode: any;
     add1: any;
     add2: any;
     add3: any;
}

export class Cust_bussiness_partner_bill_addr_dyn {
     contact_person: any;
     designation: any;
     phone: any;
     mobile: any;
     fax: any;
     email: any;
}

export class Cust_bussiness_partner_delv_to {
     contact_person: any;
     designation: any;
     phone: any;
     mobile: any;
     fax: any;
     email: any;
     city: any;
     pincode: any;
     address: any;
     sl_no: any;
     b_unit_name: any;
     transport_own: any;
     transporters: any;
}

export class Cust_bussiness_partner_acc {
     pay_cont_acc: any;
     party_bankacc: any;
     pay_term: any;
     credit_lim: any;
     cash_lim_status: any;
     cash_limit: any;
     tcs_applicable: any;
     tcs_rate: any;
     tcs_date: any;
     mode_of_pay: any;
     accountholder: any;
     acc_no: any;
     bankname: any;
     ifsc: any;
     mobile: any;
     iban: any;
     bic_swift_code: any;
     party_nature: any;
     acc_type: any;
     acc_remarks: any;
     branch: any;
}

export class Cust_bussiness_partner_stat {
     registered: any;
     pan_no: any;
     tan_no: any;
     cin_no: any;
     gst_no: any;
     customer_type: any;
}

export class Cust_bussiness_partner_brokers {
     sl_no: any;
     ven_code_name: any;
     basis: any;
     based_on: any;
     rate: any;
     eff_date: any;
     tds_rate: any;
     remarks: any;
     brokerage_acc: any;
     tds_acc: any;
}

export class Cust_bussiness_partner_doc {
     doc_name: any;
}

export class ModalValue {
     bp_code: any;
     index: any;
}

export class cust_bussiness_partner_shipping_addr_dtls {
     slno: any;
     shipping_name: any;
     country_shipping: any;
     state_shipping: any;
     dist_code: any;
     city: any;
     pincode: any;
     address: any;
}










