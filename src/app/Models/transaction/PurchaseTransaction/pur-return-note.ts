export class PurReturnNote 
{
    id: any;
    purreturnnoteid:any;
    purreturnnoteno:any;
    suppliername:any;  
    referance_id:any;     
    supplierid:any;  
    businessunitname:any; 
    purreturnnotedate :any;
    businessunit:any;
    purreturnnoterefno:any;
    remark:any; 
    cust_ref_doc_no:any;  
    date2:any;
    confirmedby:any;
    approval:any;
    reason :any; 
    grandtotal:any;
    company_id: any;
    fin_year: any;
    username:any;

pur_return_note_item_dtls:pur_return_note_Item_Dtls[];
pur_return_note_trans_info: pur_return_note_Trans_Info;
pur_return_note_broker_dtls: pur_return_note_Broker_Dtls[];
pur_return_note_supplier_dtls: pur_return_note_supplier_Dtls[]
pur_return_note_shipment_dtls: pur_return_note_Shipment_Dtls;
pur_return_note_weight_dtl: pur_return_note_weight_dtl;
pur_return_note_docs: pur_return_note_Docs[];
}

export class pur_return_note_Docs
{
    docname:any;
}

export class pur_return_note_weight_dtl
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

export class pur_return_note_Trans_Info
{
    transborneby:any;
    modeoftrans:any;
    vehicleno :any;
    freightamt:any;
    advpaid:any;
    chargecode:any;
    transcode:any;
}

export class pur_return_note_Shipment_Dtls
{
    shipaddr:any;
    shipdetails:any;
    payaddr:any;
    paydetails:any;
}

export class pur_return_note_Item_Dtls
{
    slno:any;
    itemcode:any;
    itemname:any;
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
    taxamt:any;
    totalamt:any
    accnorms:any;
    net_amount:any;	
    qc_deduction :any;
    net_amt_after_qc :any;
    gross_amt:any;
    checkbox:any;
}

export class pur_return_note_Broker_Dtls
{
    slno:any;
    brokercode:any;
    basis:any;
    rate:any;
}

export class pur_return_note_supplier_Dtls
{
    slno:any;
    spcode:any;
    spname:any;
    spcontact:any;
}

export class sales_return_note_Trans_dyn
{
    transname:any;
    vehicletype:any;
    vehicleno :any;
    ewaybillno:any;
}
