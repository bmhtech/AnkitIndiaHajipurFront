    export class taxType 
    {
        id:any;
        taxtype_name:any;
        taxtype_code:any;
        company_id:any;
        fin_year:any;
        username:any;
        gst_input_output_ledger_dtls:Gst_Input_Output_Ledger_Dtls[];
    
    }

    export class Gst_Input_Output_Ledger_Dtls
    {
        cgst_input_ledger :any;
        cgst_output_ledger :any;
        sgst_input_ledger :any;
        sgst_output_ledger :any;
        igst_input_ledger :any;
        igst_output_ledger :any;
    }
