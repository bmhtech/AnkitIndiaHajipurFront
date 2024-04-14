export class Issuestock 
{
    id:any;
    issueno:any;
    issuedatefrom:any;
    issuedateto:any;
    issuetype:any;
    requesteddate:any;
    business_unit:any;

    requisitionno:any;
    requestedby:any;
    approvedby:any;
   
    company_id: any;
    fin_year: any;
    username:any;
  
	issuestock_Item_Dtls : Issuestock_Item_Dtls[];   
    
}

export class Issuestock_Item_Dtls
{	
    requisitionid:any;
    requisitionno:any;
    slno:any;
    item_code:any;
    item_name:any;
    packing_item:any;
    packing:any;
    itemqty:any;
    itemuom:any;
    packingqty:any;
    packinguom:any;
    priority:any;
    purpose:any;
    wheretouse:any;
    itemquality: any;
    remarks:any;
    

}
