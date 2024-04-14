export class Production_planning 
{
    id :any;
    prod_plan_code: any;
    prod_plan_id: any;
    business_unit: any;
    pred_from: any;
    pred_to: any;
    prod_plan_desc:any;
    company_id:any;
    fin_year:any;
    username:any;
    production_planning_shop_floor_dtls:Production_Planning_shop_floor_dtls[];
    production_planning_special_dtls:Production_Planning_Special_Dtls[];
}

export class Production_Planning_shop_floor_dtls
    {
        sl_no:any;
        shop_floor:any;
        active:any;
        process:any;
        production:any;
        process_date:any;
        shift:any;

        //hidden
        prod_plan_id:any;
        
        // constructor(sl_no: any, shop_floor: any,active: any,
        //             process: any, production: any,process_date:any,
        //             shift: any, prod_id:any, prod_code:any
        //             ){
        //     this.sl_no = sl_no;
        //     this.shop_floor = shop_floor;
        //     this.active = active;
        //     this.process = process;
        //     this.production = production;
        //     this.process_date = process_date;
        //     this.shift = shift;
        //     this.prod_id = prod_id;
        //     this.prod_code = prod_code;

        //   }
    }


    export class Production_Planning_Special_Dtls
    {
        sl_no:any;
        shop_floor:any;
        active:any;
        process:any;
        production:any;
        process_date:any;
        prod_plan_id:any;
    }