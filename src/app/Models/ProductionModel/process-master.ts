export class Process_master 
{
    id :any;
    process_id:any;
    process_no: any;
    business_unit: any;
    shop_floor: any;
    process_desc: any;
    process_type: any;
    process_freq: any;
    perd_day: any;
    process_mntnce: any;
    process_type1:any;
    shift_no: any;
    shift_mntnce: any;
    shift_start_time: any;
    shift_end_time: any;
    process_active: any;
    company_id:any;
    fin_year:any;
    username:any;
    tot_shift_hrs:any;
    item_group:any;
    item_grouparray:any;
    itemgroup_array:any;

    process_master_doc:process_master_doc[];
    process_master_shift_details:Process_Master_Shift_Details[];
}

export class process_master_doc
    { 
       doc_name:any;
       doc_pdf:any;
      // fetch_doc:any;
    }

export class   Process_Master_Shift_Details
{
    shiftno:any;
}