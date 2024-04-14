    export class wareHouse 
    {
        id: any;
        warehouse_id:any;
        warehouse_code:any;
        warehouse_name:any;
        warehouse_active:any;
        state_code:any;
        city_code:any;
        warehouse_remarks:any;
        businessunit_code:any;
        maintain_stack:any;
        warehouse_address:any;
        country_name:any;
        state_name:any;
        city_name:any;
        pin_code:any;
        company_id:any;
        fin_year:any;
        username:any;

        warehouse_stack_dtls:warehouse_stack_dtls[];
    }

    export class warehouse_stack_dtls
    {
        slno:any;
        stack_no:any;
        packing_qty:any;
        packing_uom:any;
        item_qty:any;
        item_uom:any;
        opening_packing_qty:any;
        opening_item_qty:any;
        stack_date:any;
        
    }
