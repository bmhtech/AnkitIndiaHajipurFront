export class prodsummary 
{
  id:any;
  prod_sum_id:any;
  date:any;
  totalrate:any;
  totalamount:any;
  totalbags:any;
  totalqty:any;
  company_id:any;
  fin_year:any;
  username:any;

  prod_summary_dtls:prod_summary_dtls[];
}

export class prod_summary_dtls
{
  sl_no:any;
  prod_sum_id:any;
  item:any;
  item_name:any;
  packing:any;
  packing_name:any;
  uom_basedon:any;
  capacity:any;
  empty_big_wt:any;
  empbagwt_based_on:any;
  packing_qty:any;
  production_qty:any;
  production_uom:any;
  packing_uom:any;
  rate:any;
  amount:any;
 // remarks:any;
  
}