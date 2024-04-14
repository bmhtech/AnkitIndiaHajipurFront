    export class Qc_rules_setup 
    {
        id:any;
        qc_code:any;
        qc_name:any;
        remarks:any;
        qc_active:any;
        company_id: any;
        fin_year: any;
        qc_id:any;
        qc_rules_setup_dtls:qc_rules_setup_dtls[];
    }

    export class qc_rules_setup_dtls
    {
        qc_param:any;
        cal_basis:any;
        basis_amt_UoM:any;
        min:any;
        max:any;
        qty_chkbox:any;
    }