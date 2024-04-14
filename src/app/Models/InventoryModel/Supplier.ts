export class Supplier {
    //supplier_id:any;
    supplier_code:any;
    supplier_name:any;
    bpgroup_code:any;
    bpgroup_name:any;  
    sup_alt_name:any;
    supplier_active:any;
    trans_currency:any;
    sup_block_allow:any;
    sup_block_reason:any;
    businessunit_code:any;
    businessunit_name:any;
    billing_dtls_req:any;
    stat_dtls_req:any;
    broke_dtls_req:any;
    tds_dtls_req:any;
    accounting_req:any;
  
    maintain_bal_bill:any;
    def_crdt_prd_indays:any;
    dur_vou_ent_days:any;
    inv_val_affected:any;
    cost_center_app:any;
    activate_int_cal:any;
    provide_bank_dtls:any;
    
    sup_bill_name:any;
    sup_bill_addr1:any;
    sup_bill_addr2:any;

    sup_bill_addr3:any;
    sup_bill_country:any;
    sup_bill_state:any;
    sup_bill_city:any;
    sup_bill_pin:any;
    sup_del_name:any;
    sup_del_addr1:any;
    sup_del_addr2:any;
    sup_del_addr3:any;
    sup_del_country:any;
    sup_del_state:any;
    sup_del_city:any;
    sup_del_pin:any;
    stat_pan_no:any;
    stat_gst_no:any;
    stat_tin_no:any;
   
    stat_cst_no:any;
    stat_tan_no:any;
    stat_stax_regno:any;

    broker_name:any;
    broker_code:any;
    party_nature:any;
    deflt_tds_nature:any;
    payble_contl_acc:any;
    advance_pay_acc:any;
    party_acc:any;
    payment_term:any;
    discount_per:any;

    creadit_limit:any;
    creadit_days:any;
    cash_limit:any;
    trans_type:any;

    doc_list:any;
    doc_name:any;

    supplier_master_addr_details: supplier_master_addr_details[];
}
//dynamic
export class supplier_master_addr_details{
cont_per_name:any;
cont_per_desig:any;
cont_per_phone:any;
cont_per_mobile:any;

cont_per_email:any;
cont_per_website:any;
cont_per_addr1:any;
cont_per_addr2:any;

cont_per_addr3:any;
cont_per_country:any;
cont_per_state:any;
cont_per_city:any;
cont_per_pin:any;
copybpAddr_bill:any;



}