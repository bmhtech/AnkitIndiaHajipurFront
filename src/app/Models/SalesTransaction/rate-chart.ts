export class Ratechart 
{
  id:any;
  rate_code:any;
  b_unit:any;
  date:any;

  
  company_id:any;
  fin_year:any;
  username:any;

  item_rate_dtls:rate_details[];
}

export class rate_details
{
  sl_no:any;
  item_code:any;
  item_name:any;
  packing:any;
  item_uom:any;
  packing_uom:any;
  price_based_on:any;
  qty:any;
  qty_uom:any;
  rate:any;
  tolerance:any;
  sales_status:any;
}