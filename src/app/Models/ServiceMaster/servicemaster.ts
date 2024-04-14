export class Servicemaster 

{
  id:any;
  service_category:any;
  service_no:any;
  service_acc_code:any;
  service_group:any;
  service_type:any;
  service_subtype:any;
  service_ac:any;
  description:any;
  tax_name:any;
  tax_id:any;
  tax_rate:any;
  service_item_type:any;
  remarks:any;
  
  company_id:any;
  fin_year:any;
  username:any;

  service_masterdtls:service_details[];
}
export class service_details
    {
      sl_no:any;
      service_name:any;
      remarks_a:any;
    }