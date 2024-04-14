export class ProductionTransaction 
    {
        id: any;
        prod_trans_code: any;
        prod_trans_id: any;
        prod_trans_date: any;
        business_unit: any;
        shop_floor: any;
        prod_process: any;
        prod_shift_date:any;
        prod_desc: any;
        prod_type: any;
        io_ratio:any;
        dev_percent:any;
        prod_description:any;
        entry_mode: any;
        company_id: any;
        fin_year: any;
        username: any;
        
      

        production_transaction_input_details: Production_Transaction_Input_Details[];
        production_transaction_output_details:Production_Transaction_Output_Details[]
        
    }

    export class Production_Transaction_Input_Details
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

        // production_transaction_input_popup_details: production_transaction_input_popup_details[];

    }

    export class Production_Transaction_Output_Details
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
        

    /*export class production_transaction_input_popup_details
    {
          checkbox:any;
          mainslno:any;
          shifttime:any;
          itemqty:any;
          packingqty:any;
          sl_no:any;
    }*/