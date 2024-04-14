export class ReturnApprovalNote 
    {
        id: any;
        inv_type:any;
        salesreturnid:any;
        salesreturntype:any;
        salesreturnno:any;
        partyname:any;       
        salesreturndate :any;
        businessunit:any;
        returncriteria:any;
        returnbasedon:any;
        salesreturnrefno:any;
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
        diliverylist:any;
        jobwork:any;

        return_approval_item_dtls:return_approval_Item_Dtls[];
        return_approval_trans_info: return_approval_Trans_Info;
        return_approval_broker_dtls: return_approval_Broker_Dtls[];
        return_approval_party_dtls:   return_approval_Party_Dtls[]
        return_approval_shipment_dtls:  return_approval_Shipment_Dtls;
        return_approval_weight_dtl:  return_approval_weight_dtl;
        return_approval_docs: return_approval_Docs[];
        return_approval_item_dtls_for_jobwork_price:return_approval_item_dtls_for_jobwork_price[];
        return_approval_item_dtls_for_jobwork:return_approval_item_dtls_for_jobwork[];
    }

    export class return_approval_Docs
    {
        docname:any;
    }

    export class return_approval_weight_dtl
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

    export class return_approval_Trans_Info
    {
       transborneby:any;
	   modeoftrans:any;
       vehicleid :any;
       freightamt:any;
       advpaid:any;
       chargecode:any;
       transcode:any;
    }

    export class return_approval_Shipment_Dtls
    {
        shipaddr:any;
        shipdetails:any;
        payaddr:any;
        paydetails:any;
    }

    export class return_approval_Item_Dtls
    {
        slno:any;
        itemcode:any;
        itemname:any;
        packing:any;
        packingname:any;
        hsn_code:any;
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
        cgstamt:any;
        sgstamt:any;
        igstamt:any;
        totalamt:any
        accnorms:any;
        checkbox:any;
        delivery_cid:any;
    }

    export class return_approval_Broker_Dtls
    {
        slno:any;
        brokercode:any;
        basis:any;
        rate:any;
    }

    export class return_approval_Party_Dtls
    {
        slno:any;
        pcode:any;
        cpname:any;
        cpcontact:any;
    }

    export class return_approval_Trans_dyn
    {
        transname:any;
        vehicletype:any;
        vehicleno:any;
        ewaybillno:any;
    }

    export class return_approval_item_dtls_for_jobwork_price
{
    slno: any;
    item_service: any;
    sac_code: any;
    job_price: any;
    tax_value: any;
    cgst_tax: any;
    cgst_amt: any;
    sgst_tax: any;
    sgst_amt: any;
    tot_amount: any;
    igst_tax: any;
    igst_amt: any;
    taxcode: any;
}

export class return_approval_item_dtls_for_jobwork
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

