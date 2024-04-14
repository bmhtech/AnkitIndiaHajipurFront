export class JW_Grn_ItemTagging
{
    id:any;
    jw_grn_tag:any;
    grn_id:any;
    grn_no:any;
    grn_date:any;
    supplier_name:any;
    totalqty: any;
    company_id: any;
    fin_year: any;
    username: any;

    jw_grn_partytag_details:jw_grn_partytag_details[];
}


export class jw_grn_partytag_details
{
    slno:any;
    jw_grn_tag:any;
    customername:any;
    qty:any;
    allocated_qty:any;
    jw_grn_partywitem_details:jw_grn_partywitem_details[];
}


export class jw_grn_partywitem_details
{
    slno:any;
    jw_grn_tag:any;
    party:any;
    party_name:any;
    job_item:any;
    job_item_name:any;
    qty:any;
}