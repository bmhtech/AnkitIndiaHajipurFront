export class TransportationChgsMatrix {
    id: any;
    tcm_id:any;
    tcm_code:any;
    tcm_description:any;
    tcm_effectivedate:any;
    tcm_active:any;  
    businessunit_code:any;
    businessunit_name:any;
    trans_mode:any;
    trans_charges_appl:any;
    gst_pay_own_rev_charges:any;
    company_id:any;
    fin_year:any;
    
    transportation_chgs_matrix_details:transportation_chgs_matrix_details[];
    transportation_area_list:transportation_area_list;
}

export class transportation_chgs_matrix_details {
    trans_charge_code :any;
    transportation_from :any;
    transportation_to:any;
    distance_in_km:any;
    vehicles_type:any;
    full_truck_load_rate:any;
    rate_uom:any;
    uom:any;
    tax_code:any;
    tax_rate:any;
    transportation_acc:any;
    tds_code:any;
    tds_acc:any;
    tds_rate:any;
    transporter:any;
    transporter_array:any;
    allowed_shortage:any;
    deduction_basedon:any;
}
export class transportcode{
    bp_Id:any;
    bp_code:any;
    bp_name:any;
}

export class transportation_area_list
{
    area_id:any;
    area_name:any;
    description:any;
}