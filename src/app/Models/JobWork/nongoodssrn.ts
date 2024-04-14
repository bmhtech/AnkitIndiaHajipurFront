export class nongoodssrn
{
  id:any;
  srnid:any;
  srnno:any;
  ordertype:any;
  b_unit:any;
  party:any;
  srndate:any;
  remarks:any;
  orderid:any;
  pan_no:any;
  gst_no:any;
  cin_no:any;
  tan_no:any;
  app_chgs_id:any;
  company_id:any;
  fin_year:any;
  username:any;

  nongoodssrn_item_details: nongoodssrn_item_details[];
  nongoodssrn_time_service: nongoodssrn_time_service[];
  nongoodssrn_docs: nongoodssrn_docs[];

 }
 export class nongoodssrn_item_details
 {
   nongoodsserviceid:any;
   slno:any;
   service_types:any;
   services:any;
   account_code:any;
   details:any;
   service_uom:any;
   service_quantity:any;
   price:any;
   amount:any;
   taxable_amount:any;
   discount:any;
   discount_basedon:any;
   discount_amount:any;
   net_amount:any;
   tax_code:any;
   tax_rate:any;
   tax_amount:any;
   total_amount:any;
   nonservicesrn_desc_details: nonservicesrn_desc_details[];
 }

 export class nonservicesrn_desc_details
  {
    slno:any;
    desc_name:any;
    bill_period:any;
    bill_on:any;
    amount_change:any;
    desc_qty:any;
    desc_uom:any;
    desc_price:any;
    desc_total:any;
    billing_from:any;
    billing_to:any;
    duedate:any;
    remarks:any;
    nongoodsserviceid:any;
    serviceno:any;
  }

  export class nongoodssrn_time_service
  {
    slno:any;
    description :any;
  }

  export class nongoodssrn_docs
  {
    doc_name:any;
  }

