export class SalesEnq 
{
    id: any;
    enquiry_no: any;
    enquiry_id:any;
    enq_date:any;
    enq_type:  any;
    mode_of_enq: any;
    enq_status: any;
    sales_person:  any;
    pre_closing: any;
    app_deal_val:  any;
    referred_by: any;
    remarks: any;
    businessunit: any;
    company_id: any;
    fin_year: any;
    username:any;
    sales_Enquiry_Docs:sales_Enquiry_Docs[];
    sales_Enquiry_Party_Dtls:sales_Enquiry_Party_Dtls[];
    sales_Enquiry_Item_Dtls:sales_Enquiry_Item_Dtls[];
}

export class sales_Enquiry_Docs{
    doc_name:any;
} 

export class sales_Enquiry_Party_Dtls{
    sl_no:any;
    p_code:any;
    cp_name:any;
    cp_contact:any;
    tcs_applicable:any;
    tcs_rate:any;
    mode_of_enq:any;
}
export class sales_Enquiry_Item_Dtls{

    slno: any;
    item_code: any;
    item_name: any;
    quantity:any;
    uom: any;
    packing_item:any;
    packing_item_name:any;
    packing_quantity: any;
    packing_uom:any;
    remarks:  any;
    qc_norms: any;
    mat_wt:any;
    price:any;
    tax_code:any;
    tax_rate:any;
  
    //no need to add in database
    checkbox: any;
    enquiry_id: any;

}

export class SequenceId
{
    sequenceid:any;
    company_id:any;
}
export class Group_name
{
   group_name:any;
}
export class Status
{
    status:any;
}

