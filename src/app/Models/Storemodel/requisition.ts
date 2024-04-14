export class Requisition 
{
    id:any;
   	requisitionid:any;
    business_unit:any;
    requisitionno:any;
    requestedby:any;
    shop_floor:any;
    requesteddate:any;
    company_id: any;
    fin_year: any;
    username:any;
    approvedby:any;
    approvedbyname:any;
    reject:any;
	requisition_Item_Dtls : Requisition_Item_Dtls[];   
    
}

export class Requisition_Item_Dtls
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
