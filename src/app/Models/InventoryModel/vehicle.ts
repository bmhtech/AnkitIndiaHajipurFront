    export class Vehicle 
    {
        id: any;
        vehicle_id:any;
        vehicle_no:any;
        vehicle_active:any;
        vehtype_code:any;
        vehicle_aliasno:any;
        vehicle_chassisno:any;
        tareweight_qty:any;
        tareweight_uom:any;
        load_capacity:any;
        loadcapacity_uom:any;
        onwer_name:any;
        onwer_address:any;
        onwer_phoneno:any;
        transporter:string;
        company_id:any;
        username:any;
        fin_year:any;
        vehicle_master_doc_details:Vehicle_master_docs_details[];
    }

    export class Vehicle_master_docs_details
    {
        slno:any;
        description:any;
    }








