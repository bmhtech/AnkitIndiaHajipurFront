    export class Charges 
    {
        id:any;
        charge_id:any;
        screen_id:any;
        charge_desc:any;
        company_id: any;
        fin_year: any;
        
        charge_masterdtls:charges_details[];  
    }

    export class charges_details
    {
        charge_name:any;
        charge_ac:any;
        rate_cal:any;
        method:any;
        tax_code:any;
        tax_rate:any;
        required:any;
        app_rate:any;
    }