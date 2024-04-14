export class PurReturnApprovalNote 
{
    id: any;
    inv_type:any;
    purreturnid:any;
    purreturntype:any;
    purchase_subtype : any;
    ser_item_subtype : any;
    purreturnno:any;
    suppliername:any;  
    supplier:any;     
    purreturndate :any;
    businessunit:any;
    returncriteria:any;
    returnbasedon:any;
    purreturnrefno:any;
    remark:any;   
    confirmedby:any;
    approval:any;
    reason :any; 
    grandtotal:any;
    referance_id:any;
    company_id: any;
    fin_year: any;
    username:any;
    weighment_id:any;
    refdate:any;
    grnlist:any;
 
    pur_return_approval_item_dtls:pur_return_approval_item_dtls[];
    pur_return_approval_trans_info: pur_return_approval_trans_info;
    pur_return_approval_broker_dtls: pur_return_approval_broker_dtls[];
    pur_return_approval_supplier_dtls: pur_return_approval_supplier_dtls[]
    pur_return_approval_shipment_dtls: pur_return_approval_shipment_dtls;
    pur_return_approval_weight_dtl:  pur_return_approval_weight_dtl;
    pur_return_approval_docs: pur_return_approval_docs[];
}

export class pur_return_approval_docs
{
    docname:any;
}

export class pur_return_approval_weight_dtl
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

export class pur_return_approval_trans_info
{
   transborneby:any;
   modeoftrans:any;
   vehicleno :any;
   freightamt:any;
   advpaid:any;
   chargecode:any;
   transcode:any;
}

export class pur_return_approval_shipment_dtls
{
    shipaddr:any;
    shipdetails:any;
    payaddr:any;
    paydetails:any;
}

export class pur_return_approval_item_dtls
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
    warehouse:any;
    stack:any;
}

export class pur_return_approval_broker_dtls
{
    slno:any;
    brokercode:any;
    basis:any;
    rate:any;
}

export class pur_return_approval_supplier_dtls
{
    slno:any;
    spcode:any;
    spname:any;
    spcontact:any;
}

export class return_approval_Trans_dyn
{
    transname:any;
    vehicletype:any;
    vehicleno:any;
    ewaybillno:any;
}

