export class Production_master 
{
    id: any;
    production_code: any;
    production_id: any;
    business_unit: any;
    shop_floor: any;
    prod_desc: any;
    prod_type: any;
    entry_mode: any;
    io_ratio: any;
    prod_uom: any;
    dev_percent: any;
    prod_process: any;
    ratio_applicable: any;
    applicable_charges_id: any;
    company_id: any;
    fin_year: any;
    username: any;
    outtotratio : any;
    totratio : any;

    bom_input_details: Bom_Input_Details[];
    bom_output_details: Bom_Output_Details[];
    bom_resource_cost:Bom_Resource_Cost[]
    //Store Consumption pending......
}

export class Bom_Input_Details
    {
         sl_no: any;
         item: any;
         packing: any;
         packing_uom: any;
         item_uom: any;
         production_uom: any;
         con_factor: any;
         uom_basedon: any;
         ratio: any;
         deviation: any;
         packing_scrap: any;
         scrap_packing: any;
         shiftreq:any;

    }

    export class Bom_Output_Details
        {
              sl_no: any;
              item: any;
              packing: any;
              packing_uom: any;
              item_uom: any;
              production_uom: any;
              con_factor: any;
              uom_basedon: any;
              ratio: any;
              deviation: any;
              shiftreq:any;
        }

    export class Bom_Resource_Cost
	    {
            charge_name: any;
            rate_cal_method: any;
            amount: any;
            tax_rate: any;
            tax_amt: any;
            gross_amt: any;
	    }