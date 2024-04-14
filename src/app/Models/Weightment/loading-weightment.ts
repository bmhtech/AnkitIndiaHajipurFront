    export class LoadingWeightment 
    {
        //New
        wgment_no: any;
        company_id:any;
        fin_year:any;
        weight: any;  
        wgment_date: any;  
        wgment_for: any;  
        ref_doc_no: any;  
        ref_doc_date: any; 
        veh_no: any;   
        veh_type:true;
        customer:true;
        gross_weight: any;  
        gw_unit: any;
        gw_date: any;  
        gw_time: any; 
        gw_remarks: any;   
        tare_weight:true;
        tw_unit:true;
        tw_date: any;  
        tw_time: any;  
        tw_remarks: any; 
        net_weight: any;  
        nw_unit: any; 
        digital_weight: any; 
        wgment_charge: any;  
        wgment_rs: any; 
        username:any;
    
        wm_loading_wgmnt_dtls:Wm_loading_wgmnt_dtls[];
    }

    export class Wm_loading_wgmnt_dtls
    {
        sl_no: any; 
        customer: any;  
        advice: any; 
        wgment_date: any; 
    }


