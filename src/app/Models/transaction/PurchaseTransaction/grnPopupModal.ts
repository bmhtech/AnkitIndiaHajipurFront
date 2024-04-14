export class grn_unload_code_list
{
        unadviceid: any;
        unadviceno:any;
        vehicle_no: any;
        ul_date: any;
        ula_date: any;
        inserted_by: any;
        supp_name:any;
        we_chg_app:any;
        grn_unload_item_list:grn_unload_item_list[];
        bp_Id:any;
        unload_status:any;
        weighment_status:any;
        
  
}

export class grn_unload_item_list
{
    trans_borne_by: any;
    mode_of_trans: any;
    transporter_name: any;
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
   
    company_id: any;
    gross_wt:any;
    uom1: any;
    tare_wt:any;
    uom2: any;
    net_wt: any;
    uom3: any;
    slip_no: any;
    pw_date: any;
    wb_name: any;

    checkbox:any;
    unadviceid: any;
    unadviceno:any;
    item_code: any;
    item_name:any;
    packing: any;
    packing_name: any;
	packing_item_code: any;
	packing_type: any;
	packing_size: any;
	packing_weight: any;
    quantity: any;
    uom:any;
    s_qty: any;
    s_uom: any;
    mat_wt: any;
    wearhouse: any;
    wearhouse_name:any;
    rack:any;
    rack_name:any;
    base_qty: any;
    sl_no: any;
    ven_code_name: any;
    ven_name: any;
    basis: any;
    rate: any;
    brokerage_acc:any;
    tds_rate: any;
    tds_acc: any;

}

export class Vechile_type_Name
{
    vehicle_id: any;
    vehicle_no: any;
    vehicle_active: any;
    vehtype_code: any;
    vehtype_name:any;
    businessunit_code: any;
    businessunit_name: any;
    vehicle_aliasno: any;
    vehicle_chassisno: any;
    tareweight_qty: any;
    tareweight_uom: any;
    load_capacity: any;
    loadcapacity_uom:any;
    onwer_name: any;
    onwer_address: any;
    onwer_phoneno: any;
}

export class unload_code
{
    unadviceid: any;
    unadviceno: any;
    vehicle_no: any;
    supp_ref_docno: any;
    ul_date: any;
    ula_date:any;
    inserted_by: any;
    supp_name: any;
    we_chg_app: any;
}

export class unload_bp_details
{
    sp_name:  any;
    sp_phone:  any;
    sp_fax:  any;
    sp_email:  any;
    sp_address:  any;
    cp_designation: any;
    cp_name:  any;
    cp_phone:  any;
    cp_fax:  any;
    cp_email:  any;
    cp_address: any;
}