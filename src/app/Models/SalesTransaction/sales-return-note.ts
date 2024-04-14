export class SalesReturnNote 
{
    id: any;
    salesreturnnoteid:any;
    inv_type:any;
    salesreturnnoteno:any;
    partyname:any;
    price_term:any;  
    referance_id:any;     
    party:any;   
    salesreturnnotedate :any;
    businessunit:any;
    salesreturnnoterefno:any;
    remark:any;   
    confirmedby:any;
    approval:any;
    reason :any; 
    grandtotal:any;
    company_id: any;
    fin_year: any;
    username:any;
    salesreturnid:any;
 
    sales_return_note_item_dtls:sales_return_note_Item_Dtls[];
    sales_return_note_trans_info: sales_return_note_Trans_Info;
    sales_return_note_broker_dtls: sales_return_note_Broker_Dtls[];
    sales_return_note_party_dtls: sales_return_note_Party_Dtls[]
    sales_return_note_shipment_dtls: sales_return_note_Shipment_Dtls;
    sales_return_note_weight_dtl: sales_return_note_weight_dtl;
    sales_return_note_docs: sales_return_note_Docs[];
    sales_return_note_item_dtls_for_jobwork: Sales_return_note_item_dtls_for_jobwork[];
}

export class sales_return_note_Docs
{
    docname:any;
}

export class sales_return_note_weight_dtl
{
    ownuom:any;
    owngross:any;
    owntare:any;
    ownnet :any;
    ownpermitno:any;
    owndate:any;
    ownslipno:any;
    partyuom:any;
    partygross:any;
    partytare :any;
    partynet:any;
    partydate:any;
    partyslipno:any
}

export class sales_return_note_Trans_Info
{
   transborneby:any;
   modeoftrans:any;
   vehicleno :any;
   freightamt:any;
   advpaid:any;
   chargecode:any;
   transcode:any;
}

export class sales_return_note_Shipment_Dtls
{
    shipaddr:any;
    shipdetails:any;
    payaddr:any;
    paydetails:any;
}

export class sales_return_note_Item_Dtls
{
    slno:any;
    itemcode:any;
    itemname:any;
    hsn_code:any;
    packing:any;
    packingname:any;
    quantity:any;
    uom:any;
    squantity:any;
    suom:any;
    matwt:any;
    price:any;
    pricebasedon:any;
    amount:any;
    discounttype:any;
    discountrate:any;
    discountamt:any;
    taxcode:any;
    taxrate:any;
    cgstamt:any;
    sgstamt:any;
    igstamt:any;
    taxamt:any;
    totalamt:any
    accnorms:any;
    checkbox:any;
}

export class sales_return_note_Broker_Dtls
{
    slno:any;
    brokercode:any;
    basis:any;
    rate:any;
}

export class sales_return_note_Party_Dtls
{
    slno:any;
    pcode:any;
    cpname:any;
    cpcontact:any;
}
export class sales_return_note_Trans_dyn
{
   transname:any;
   vehicletype:any;
   vehicleno :any;
   ewaybillno:any;
}

export class Sales_return_note_item_dtls_for_jobwork
	{
        sl_no : any;
        job_item: any;
        job_item_name: any;
        job_packing: any;
        job_packing_name: any;
        job_hsn: any;
        pack_qty: any;
        pack_uom: any;
        price_based_on: any;
        item_qty: any;
        item_uom: any;
        mat_wt: any;
        tolerance: any;
    }


