    export class SalesOrder
    {
        id:any;
        q_status:any;
        business_unit:any;
        order_id:any;
        order_no:any;
        pro_order:any;
        order_date:any;
        order_type:any;
        price_term:any;
        cust_channel:any;
        ref_type:any;
        cust_refdocno:any;
        receipt_criteria:any;
        we_uom:any;
        valid_till :any;
        delivery_date:any;  
        brokerage_app:any;
        remarks:any;
        confirmed_by:any;
        approval:any;
        reason:any;
        app_chgs_id:any;
        delivery_term:any;
        company_id: any;
        fin_year: any;
        customer: any;
        inv_type: any;
        referance_id:any;
        customer_name:any;
        username:any;
        cust_ref_doc_date:any;
        cust_channel_list:any;
		trans_borne_by_chgs:any;
        tolerancecheckpoint:any;
        tolerancecheckpointremarks:any;
        total_job_amt:any;
        terminate:any;
        payment_mode:any;


        sales_Order_Item_Dtls: sales_Order_Item_Dtls[];
        sales_Order_Broker_Dtls: sales_Order_Broker_Dtls[];
        sales_Order_Summary: sales_Order_Summary;
        sales_Order_Trans_Info: sales_Order_Trans_Info;
        Sales_Order_Party_Dtls:  Sales_Order_Party_Dtls[];
        sales_Order_Terms_Con: sales_Order_Terms_Con;
        sales_Order_Docs: sales_Order_Docs[];
       // sales_Order_Termination: sales_Order_Termination;
        sales_Order_Summary_dyn: sales_Order_Summary_dyn[];
        sales_Order_Shipment_Dtls: sales_Order_Shipment_Dtls;
        sales_Order_Trans_Chgs_dyn:sales_Order_Trans_Chgs_dyn[];
        sales_Order_Item_Dtls_for_jobwork:Sales_Order_Item_Dtls_for_jobwork[];
        sales_Order_Item_Dtls_for_jobwork_price:Sales_Order_Item_Dtls_for_jobwork_price[];
    }


    


    export class sales_Order_Shipment_Dtls
    {
        ship_addr:any;
        ship_details:any;
        pay_addr:any;
        pay_details:any;
    }

    export class sales_Order_Item_Dtls
    {
        slno:any;
        item_code:any;
        item_name:any;
        packing:any;
        hsn_code:any;
        packing_name:any;
        quantity:any;
        uom:any;
        squantity:any;
        suom:any;
        con_factor:any;
        mat_wt:any;
        price:any;
        price_based_on:any;
        amount:any;
        discount_type:any;
        discount_rate:any;
        tolerance:any;
        tax_code:any; 
        tax_rate:any;
        acc_norms:any;
        discount_amt:any;
        tax_amt:any;
        total_amt:any;
        packing_list_req:any;
        packing_list:any;

        ratechartamt:any;
        ratecharttol:any;
        rateres:any;

        //no need to add in database
        checkbox:any;
        order_id:any;
        item_tolerance:any;
        tolerance_qty:any;
    }

    export class sales_Order_Broker_Dtls
    {
        slno:any;
        p_code:any;
	    broker_code:any;
	   // broker_name:any;
        basis:any;
        based_on:any;
	    rate:any;
    }

    export class sales_Order_Summary
    {
	    item_total:any;
	    discount:any;
	    tax_total:any;
        net_amount:any;
        app_brokerage:any;
        net_r_value:any;
    }

    export class sales_Order_Summary_dyn
    {
        // charge_name:any;
        // rate_cal_method:any;
        // amount:any;
        // tax_rate:any;


        charge_name:any;
		add_less:any;
		rate_cal_method:any;
		app_rate:any;
		amount:any;
		tax_rate:any;
    }

    export class sales_Order_Trans_Info
    {
	   trans_borne_by:any;
	   mode_of_trans:any;
       charge_code:any;
       trans_code:any;
       transporters:any;
    }

    export class Sales_Order_Party_Dtls
    {
        sl_no:any;
        p_code:any;
        cp_name:any;
        cp_contact:any;
        cp_city:any;
        city_approved:any;
        send_via:any;
        tcs_applicable:any;
        tcs_rate:any;
    }

    export class sales_Order_Terms_Con
    {	
        payment_mode:any;
        payment_term:any;
        bank_name:any;
        account_no:any;
        ifsc_code:any;
        cash_limit:any;
        account_name: any; 
        branch: any;
        iban: any;
        bic_swift_code:any;
        days:any;
    }

    export class sales_Order_Docs
    {
	    doc_name:any;
    }

    export class sales_Order_Trans_Chgs_dyn
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
    export class Sales_Order_Item_Dtls_for_jobwork
    {
        slno: any;
        job_item: any;
        job_packing: any;
        job_hsn: any;
        pack_qty: any;
        pack_uom: any;
        price_based_on: any;
        item_uom: any;
        mat_wt: any;
        tolerance: any;
    }
    export class Sales_Order_Item_Dtls_for_jobwork_price
    {
        slno: any;
        item_service: any;
        sac_code: any;
        job_price: any;
        tax_value: any;
        taxcode: any;
        cgst_tax: any;
        cgst_amt: any;
        sgst_tax: any;
        sgst_amt: any;
        igst_tax: any;
        igst_amt: any;
        tot_amount: any;
    }
    // export class sales_Order_Termination
    // {
	//     tsales_order:any;
	//     order_by:any;
	//     reason:any;
	//     remarks:any;
    // }