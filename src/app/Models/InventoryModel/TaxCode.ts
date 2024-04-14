
  export class TaxCode 
  {
    id: any;
    tax_code:any;
    tax_description:any;
    company_id:any;
    fin_year:any;
    tax_code_details:Tax_code_details[];
  }

  export class Tax_code_details 
  {
    tax_id:any;
    srno:any;
    cess:any;
    tax_name:any;
    tax_rate:any;
    cgst:any;
    cgst_act_val:any;
    sgst:any;
    sgst_act_val:any;
    igst:any;
    igst_act_val:any;
    input_ledger:any;
    output_ledger:any;
    igst_output_ledger:any;
    igst_input_ledger:any;
    cgst_output_ledger:any;
    cgst_input_ledger:any;
  }

  export class TaxList
  {
    tax_id:any;
    tax_name:any;
    tax_rate:any;
    cgst_act_val:any;
      sgst_act_val:any;
      igst_act_val:any;
  }

  export class ItemList
  {
    item_name: any;
    item_id: any;
  }

  export class PurIndentDDCList
  {
    indent_no: any;
    indent_date:any;
    inserted_by: any;
  }

  export class indentdls
  {
    indent_no:any;
    item_code: any;
    item_name:any;
    uom1:any;
    quantity:any;
    priority: any;
  }

