export class GatePass 
{
    challan_date:any;
    advive_no: any;
    status:any;
    narration:any;
    trans_name:  any;
    driver_name: any;
    truck_no: any;
    company_id: any;
    fin_year: any;
    username:any;
    
    gate_Pass_Item_Dtls:gatPass_Item_Dtls[];
    gate_pass_Docs:gate_pass_Docs[];
}


export class gatPass_Item_Dtls
{
    sl_no:any;
    item_name:any;
    pack_mat:  any;
    pack_qty: any;
    pack_uom: any;
    item_qty: any;
    item_uom: any;
}

export class gate_pass_Docs
{
    slno:any;
    doc_no:any;
    doc_name:any;
    doc_date:any;
    applicable:any;
    checked:any;
}
