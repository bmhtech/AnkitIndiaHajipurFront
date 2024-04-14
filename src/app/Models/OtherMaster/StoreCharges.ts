    export class StoreCharges 
    {
        id:any;
        store_charge_id:any;
        store_charge_desc:any;
        company_id: any;
        fin_year: any;
        username:any;
        
        store_inv_charge_master_dtls:Store_inv_charge_master_dtls[];  
    }

    export class Store_inv_charge_master_dtls
    {
        store_charge_id:any;
        store_charge_name:any;
        store_charge_ac:any;
        store_charge_ac_name:any;
    }