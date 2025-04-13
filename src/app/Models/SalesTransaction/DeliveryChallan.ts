    export class DeliveryChallan
    {
        id: any;
        challan_no:any;
        challan_date:any;
        bro_info_req:any;       
        business_unit:any;
        price_term :any;
        cust_ref_doc_no:any;
        date2:any;
        remark:any;
        confirmed_by:any;
        approval:any;
        reason :any;      
        ref_type:any;
        party:any;
        grand_total:any;
        delivery_cid:any;
        company_id: any;
        fin_year: any;
        inv_type:any;
        username:any;
        salesorderno:any; 
        salesorderdate:any;
        jobwork:any;
        gatepass:any;
        
        delivery_challan_Item_Dtls: delivery_challan_Item_Dtls[];
        delivery_challan_Trans_Info:delivery_challan_Trans_Info;
        delivery_challan_Broker_Dtls: delivery_challan_Broker_Dtls[];
        delivery_challan_Party_Dtls:  delivery_challan_Party_Dtls[]
        delivery_challan_Shipment_Dtls: delivery_challan_Shipment_Dtls;
        delivery_challan_weight_dtl:delivery_challan_weight_dtl;
        delivery_challan_Docs:delivery_challan_Docs[];
        delivery_challan_Chgs_dyn:delivery_challan_Chgs_dyn[];
        delivery_challan_Item_Dtls_for_jobwork:delivery_challan_Item_Dtls_for_jobwork[];
    }

    export class delivery_challan_Docs
    {
        doc_name:any;
        doc_pdf:any;
        doc_file_name:any;
    }

    export class delivery_challan_weight_dtl
    {
        own_uom:any;
        own_gross:any;
        own_tare:any;
        own_net :any;
        own_permit_no:any;
        own_date:any;
        own_slip_no:any;
        party_uom:any;
        party_gross:any;
        party_tare :any;
        party_net:any;
        party_date:any;
        party_slip_no:any
    }

    export class delivery_challan_Trans_Info
    {
       trans_borne_by:any;
	   mode_of_trans:any;
      // transporter_name:any;
       vehle_no :any;
       freight_amt:any;
       adv_paid:any;
       charge_code:any;
       trans_code:any;
       transport_rate:any;
       transportchargesadd:any;
    }

    export class delivery_challan_Shipment_Dtls
    {
        ship_addr:any;
        ship_details:any;
        pay_addr:any;
        pay_details:any;
    }

    export class delivery_challan_Item_Dtls
    {
        slno:any;
        item_code:any;
        item_name:any;
        hsn_code:any;
        packing:any;
        packing_name:any;
        quantity:any;
        uom:any;
        squantity:any;
        suom:any;
        mat_wt:any;
        price:any;
        price_based_on:any;
        amount:any;
        discount_type:any;
        discount_rate:any;
        discount_amt:any;
        tax_code:any;
        tax_rate:any;
        cgstamt:any;
		sgstamt:any;
		igstamt	:any;
        tax_amt:any;
        total_amt:any
        acc_norms:any;
        checkbox:any;
    }

    export class delivery_challan_Broker_Dtls
    {
        slno:any;
        broker_code:any;
        basis:any;
        rate:any;
    }

    export class delivery_challan_Party_Dtls
    {
        sl_no:any;
        p_code:any;
        cp_name:any;
        cp_contact:any;
    }

    export class delivery_challan_Chgs_dyn
	{
		slno: any;
		mode_of_trans:any;
		transport_from:any;
		transport_to:any;
		transporter_name:any;
		transport_rate:any;
		charge_code:any;
		chgs_rate_value:any;
		chgs_remarks:any;
		distance_in_km:any;
		uom:any;
		tax_code:any;
		tax_rate:any;
		transportation_acc:any;
		tds_code:any;
		tds_rate:any;
		tds_acc:any;
		allowed_shortage:any;
		deduction_basedon:any;
		charge_id:any;
	}
    export class delivery_challan_Item_Dtls_for_jobwork
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

  
    



