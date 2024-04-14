    export class Acc_pay_term 
    {
        id:any;
        payterm_desc:any;
        ins_type:any;
        ins_period: any;
        payterm_active: any;
        payterm_id:any;
        company_id: any;
        fin_year: any;
        username:any;
        acc_pay_term_master_details:Dyn_Acc_pay_term[];
    }

    export class Dyn_Acc_pay_term
    {
        inst_no:any;
        inst_days:any;
        inst_percent:any;
    }