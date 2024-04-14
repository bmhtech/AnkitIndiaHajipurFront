export class StockTransferInvoice {
    stk_invoice_no:any;
    stk_invoice_date:any;
    business_unit:any;
    payment_terms:any;
    stk_invoice_order_no:any;
    pay_due_days:any;
    trans_code:any;
    narration:any;
    item_total:any;
    item_total_gl_ac:any;
    tax_total:any;
    tax_total_gl_ac:any;
    transporter_amt:any;
    transporter_gl_ac:any;
    applicable_amt:any;
    applicable_gl_ac:any;
    roundoff_amt:any;
    roundoff_gl_ac:any;
    adj1_amt:any;
    adj1_gl_ac:any;
    adj2_amt:any;
    adj2_gl_ac:any;
    net_r_value:any;
    net_gl_ac:any;
    grand_total:any;
    company_id: any;
    fin_year: any;
    username:any;

    stk_Transfer_Invoice_Item_Dtls:stock_Invoice_Item_Dtls[];
    stk_Transfer_Invoice_Docs: stock_Invoice_Docs[];
    stk_Transfer_Invoice_Bu_Dtls:stock_invoice_bu_dtls;
    stk_Transfer_Invoice_Tax_Info:stock_invoice_tax_info;
}
export class stock_invoice_tax_info
{
    pan_no: any; 
    gst_no:any;
    cst_no: any; 		
    servicetax_no: any;   
    tin_no:any;    
}

export class stock_invoice_bu_dtls
{
    businessunit_name;
	mobile_no;
	email_id;
	work_address;
}

export class stock_Invoice_Item_Dtls
{
    slno:any;
    item_code:any;
    packing:any;
    quantity:any;
    uom:any;
    squantity:any;
    suom:any;
    mat_wt:any;
    price:any;
    price_based_on:any;
    amount:any;
    tax_code:any;
    tax_rate: any;
    tax_amt:any;
    total_amt:any;
    acc_norms:any;
}

export class stock_Invoice_Docs
{
    doc_name:any;
}

