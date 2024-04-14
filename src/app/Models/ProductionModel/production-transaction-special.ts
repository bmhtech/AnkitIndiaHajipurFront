export class ProductionTransactionSpecial 
    {
        id: any;
        prod_trans_code: any;
        prod_trans_id: any;
        prod_trans_date: any;
        business_unit: any;
        shop_floor: any;
        prod_process: any;
        prod_desc: any;
        prod_type: any;
        prod_description:any;
        entry_mode: any;
        company_id: any;
        fin_year: any;
        username: any;
        process: any;

        production_transaction_spl_input_details: Production_Transaction_Spl_Input_Details[];
        production_transaction_spl_output_details:Production_Transaction_Spl_Output_Details[]
    }

    export class Production_Transaction_Spl_Input_Details
    {
        sl_no: any;
         item: any;
         packing: any;
         packing_uom: any;
         item_uom: any;
         production_uom: any;
         con_factor: any;
         item_qty: any;
         packing_qty: any;
         production_qty: any;
         uom_basedon: any;
         ratio: any;
         deviation: any;
         scrap_packing:any;
         input_qty: any;

    }

    export class Production_Transaction_Spl_Output_Details
        {
            sl_no: any;
            item: any;
            packing: any;
            packing_uom: any;
            item_uom: any;
            production_uom: any;
            con_factor: any;
            item_qty: any;
            packing_qty: any;
            production_qty: any;
            uom_basedon: any;
            ratio: any;
            deviation: any;
            output_qty:any;
        }
