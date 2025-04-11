  export class UnloadWeightment 
  {
    id:any;
    wgment_no:any;    
    weight1: any;  
    weight2: any; 
    wgment_date: any;  
    wgment_for: any;  
    ref_doc_no: any;  
    ref_doc_date: any; 
    vehicle_id: any; 
    vehicle_no: any;  
    veh_type:any;
    gross_weight: any;  
    gw_unit: any;  
    gw_date: any;  
    gw_time: any; 
    gw_remarks: any;   
    tare_weight:any;
    tw_unit:any;
    tw_date: any;  
    tw_time: any;  
    tw_remarks: any; 
    net_weight: any;   
    nw_unit:true;
    digital_weight: any;  
    digital_weight1: any;  
    wgment_charge: any;  
    wgment_rs: any;
    we_status:any;  
    company_id:any;
    fin_year:any; 
    username:any;
    wgment_id:any;
    port_value:any;
    vehicle_ref_name:any;
    // company_id: any; 
   // customer:true;
   tarebags:any;
   firstbags:any;
   nopartyname:any;
   noitemname:any;
   remarks:any;
   tare_weight_bulker:any;
   net_weight_bulker:any;
   weight_bridge_location:any;


    wm_unload_wgmnt_dtls:Wm_unload_wgmnt_dtls[];
    weighment_doc:weighment_doc[];

  }

  export class Wm_unload_wgmnt_dtls
  {
    sl_no: any;  
    customer: any; 
    supplier: any;
    business_unit:any;
    advice: any;  
    wgment_date:any;
    advice_no:any;
  }
  export class weighment_doc
  { 
     doc_name:any;
     doc_pdf:any;
    // fetch_doc:any;
  }