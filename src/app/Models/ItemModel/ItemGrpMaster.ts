export class Item_group_master 
{    
    item_group_id :any;
    item_group_code :any;
    group_active :any;
    group_name :any;
    parent_group :any;
    main_group :any;
    group_type:any;
    // sales_acc:any;
    // sales_ret_ass:any;
    // pur_acc:any;
    // pur_ret_acc:any;
    // stk_trans_sale:any;
    // stk_trans_purchase:any;
    id :any;
    company_id :any;
    fin_year :any; 
    username :any;
    

    item_group_master_sales_acc : Item_group_master_sales_acc;
    item_group_master_pur_acc : Item_group_master_pur_acc;
    item_group_master_sales_retacc: Item_group_master_sales_ret_acc;
    item_group_master_pur_retacc :Item_group_master_pur_ret_acc;
    item_group_master_stk_trans_pur :Item_group_master_stk_trans_pur;
    item_group_master_stk_trans_sale :Item_group_master_stk_trans_sale;
    item_group_jobwork_sales_acc:Item_group_jobwork_sales_acc;
    item_group_jobwork_sales_return_acc:Item_group_jobwork_sales_return_acc;
}

export class Item_group_master_sales_acc 
{
    item_total :any;
    discount:any;
    //net_total :any;
    //total_bill_amt :any;
    adjplus :any;
    adjminus :any;
    //final_bill_amt :any;      
}

export class Item_group_master_sales_ret_acc 
{
    item_total :any;
    discount :any;
    //net_total :any;
   // total_bill_amt :any;
    adjplus :any;
    adjminus :any;
   // final_bill_amt :any;      
}

export class Item_group_master_stk_trans_sale
{
    item_total :any;
    discount :any;
   // net_total :any;
    //total_bill_amt :any;
    adjplus :any;
    adjminus :any;
    //final_bill_amt :any;      
}


export class Item_group_master_pur_acc 
{
   item_total_gl_ac  :any;
   item_total_asset_gl_ac:any;
   discount_gl_ac  :any;
   net_amt_gl_ac  :any;
   amt_after_deduction_gl_ac  :any;
   post_tax_amt_gl_ac  :any;
   payable_amt_gl_ac  :any;
   already_paid_gl_ac  :any;
   adjplus  :any;
   adjminus  :any;
   payable_party_gl_ac  :any;
   net_payable_party_gl_ac  :any;
}

export class Item_group_master_pur_ret_acc 
{
   item_total_gl_ac  :any;
   discount_gl_ac  :any;
   net_amt_gl_ac  :any;
   amt_after_deduction_gl_ac  :any;
   post_tax_amt_gl_ac  :any;
   payable_amt_gl_ac  :any;
   already_paid_gl_ac  :any;
   adjplus  :any;
   adjminus  :any;
   payable_party_gl_ac  :any;
   net_payable_party_gl_ac  :any;
}

export class Item_group_master_stk_trans_pur
{
   item_total_gl_ac  :any;
   discount_gl_ac  :any;
   net_amt_gl_ac  :any;
   amt_after_deduction_gl_ac  :any;
   post_tax_amt_gl_ac  :any;
   payable_amt_gl_ac  :any;
   already_paid_gl_ac  :any;
   adjplus  :any;
   adjminus  :any;
   payable_party_gl_ac  :any;
   net_payable_party_gl_ac  :any;
}

export class ledger
{
    ledgerid :any;
    ledgername :any;
}

export class Item_group_jobwork_sales_acc
{
    jw_item_total :any;
    jw_item_array:any
    jw_discount :any;
    jw_adjplus :any;
    jw_adjminus :any;      
}
export class Item_group_jobwork_sales_return_acc
{
    jw_sr_item_total :any;
    jw_sr_item_array:any;
    jw_sr_discount :any;
    jw_sr_adjplus :any;
    jw_sr_adjminus :any;      
}
