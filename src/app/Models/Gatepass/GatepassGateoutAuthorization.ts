    export class GatepassGateoutAuthorization 
    { 
        id:any;
        vechileid: any;
        vehicle_verification: any;
        remarks: any;
        confirmed_by:any;
        company_id: any;
        fin_year: any;
        username:any;
        gatepass_confirmed_by:any;

        gatepassGateoutAuthorization_details:GatepassGateoutAuthorization_details[];
       
    }

   

    export class GatepassGateoutAuthorization_details
    {
        sl_no:any;
        checklist_code:any;
        checkin:any;
        description:any;  
    }