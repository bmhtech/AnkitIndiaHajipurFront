    export class LoadingAdvice 
    {
        id : any;
        advice_id : any;
        advice_no:any;
        advice_type: any;   
        advice_date: any;  
        bus_partner: any;  
      //  wereq_active: any;  
        b_unit: any; 
        load_point: any;   
        vehicle_id:any;
        load_by:any; 
        erp_usr_name: any;  
        ref_doc_type: any;  
        doc_no: any; 
        doc_date: any;  
        weighment_status:any; 
        weighment_id:any;
        company_id:any;
        fin_year:any;
       // wchrgapp_active:any;
        remarks:any; 
        //when ref type is sales order
        confirmed_by:any;
        approval:any;
        reason:any;
        customer:any;
        price_term: any;
        cust_refdocno: any;
        //when ref type is stock transfer
        unloading_point:any;
        delivery_business_unit:any;
        referance_id:any;
        username:any;
        supplier:any;
        billing_req:any;
        staticuom:any;
        multipleloading:any;
        looseitem:any;
        payment_mode:any;
        refraction:any;
        weight_bridge_location:any;
    
        wm_loading_advice_bp_dtls:Wm_loading_advice_bp_dtls;
        wm_loading_advice_doc_attch:Wm_loading_advice_doc_attch[];
        wm_loading_advice_driver_dtls:Wm_loading_advice_driver_dtls;
        wm_loading_advice_itm_dtls:Wm_loading_advice_itm_dtls[];
        wm_loading_advice_trans_info:Wm_loading_advice_trans_info;
        wm_loading_advice_broker_dtls: wm_loading_advice_broker_dtls[];
        wm_loading_advice_Party_Dtls: wm_loading_advice_Party_Dtls[];
        wm_loading_advice_Shipment_Dtls: wm_loading_advice_Shipment_Dtls;
        wm_loading_advice_Item_Dtls_for_jobwork: wm_loading_advice_Item_Dtls_for_jobwork;
    }

    export class Wm_loading_advice_bp_dtls
    {
        cust_name: any;  
        cust_ph: any;  
        cust_fax: any;  
        cust_mail: any;  
        cust_add: any; 
        supp_name: any;
		supp_phone: any;
		supp_fax: any;
		supp_email: any;
		supp_address: any;
        cp_desg: any;   
        cp_name:any;
        cp_ph:any; 
        cp_fax: any;  
        cp_mail: any;  
        cp_add: any;  
    }

    export class Wm_loading_advice_doc_attch
    {
        doc_name: any;  
    }

    export class Wm_loading_advice_driver_dtls
    { 
        dri_part_dtls: any;  
        dri_pay_remark:any;
        driver_name:any;  
        phone:any;  
        address:any;  
        doc_type:any;  
        doc_no:any;  
        description:any; 
    }

    export class Wm_loading_advice_itm_dtls 
    {
        sl_no: any;  
        item_code: any;  
        item_name: any; 
        hsn_code: any;
        alter_item_code: any;
        alter_item_name: any;   
        packing: any; 
        alter_packing: any;  
        packing_name: any; 
        alter_packing_name: any;
        quantity: any;   
        uom:any;
        s_quantity:any; 
        s_uom: any;  
        mat_wt: any;   
        warehouse:any;
        stack_rack:any; 
        base_qty:any;
        price:any;
        pricecal:any;
        price_based_on:any;
        amount:any;
        discount_rate:any;
        discount_type:any;
        discount_amt:any;
        tolerance:any;
        tax_code:any;
        tax_rate:any;
        tax_amt:any;
        total_amt:any;
        acc_norms:any;

        //no need to add in the database
        advice_no:any;
        advice_id:any;
        checkbox:any;

        item_tolerance:any;
        tolerance_qty:any;
    }

    export class Wm_loading_advice_trans_info
    {
        trans_borne_by: any;  
        mode_of_trans:any;
        transporter_name: any;  
        transport_rate: any;  
        charge_code: any;  
        rate_value: any;  
        mode_of_payment: any;  
        payment_term: any;  
        bank_name: any;  
        account_name: any;  
        account_no: any;  
        branch: any;  
        iban: any;  
        cash_limit:any;
        bic_swift_code: any;
        adv_payment: any;
        ifsc_code:any;
        mobile:any;
        days:any;
    }

    
    export class wm_loading_advice_broker_dtls
    {
        slno:any;
	    broker_code:any;
        basis:any;
        based_on:any;
	    rate:any;
    }

    export class wm_loading_advice_Party_Dtls
    {
        sl_no:any;
        p_code:any;
        p_name:any;
        cp_name:any;
        cp_contact:any;
        send_via:any;
    }

    export class wm_loading_advice_Shipment_Dtls
    {
        ship_addr:any;
        ship_details:any;
        pay_addr:any;
        pay_details:any;
    }


    export class wm_loading_advice_Item_Dtls_for_jobwork
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
        job_tolerance_qty:any;
    }

