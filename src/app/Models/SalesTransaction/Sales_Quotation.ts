    export class Sales_Quotation
    {
        id:any;
        referance_id:any;
        quotation_no:any;
        quotation_id:any;
	    quo_type:any;
        quotation_date:any;
        valid_till:any;
        price_term:any;
        pro_order:any;
        cust_channel:any;
        cust_ref:any;
        receipt_ct:any;
        we_uom:any;
        business_unit:any;
        delivery:any;
        q_status:any;
        shipment_mode:any;
        ref_type:any;
        sales_person:any;
       // delivery_mode:any;
        delivery_term:any;
        remarks:any;
        confirmed_by:any;
        approved:any;
        inv_type:any;
        reason:any;
        app_chgs_id:any;
        company_id: any;
        fin_year: any;
        customer: any;
        brokerage_app: any;
        username:any;
        sale_orderused:any;
        quotationcheckpoint:any;
        terminate:any;
        
        sales_Quotation_Item_Dtls: sales_Quotation_Item_Dtls[];
        sales_Quotation_Broker_Dtls: sales_Quotation_Broker_Dtls[];
        sales_Quotation_Summary: sales_Quotation_Summary;
        sales_Quotation_Trans_Info: sales_Quotation_Trans_Info;
        sales_Quotation_Terms_Con: sales_Quotation_Terms_Con;
        sales_Quotation_Party_Dtls: Sales_Quotation_Party_Dtls[];
        sales_Quotation_Shipment_Dtls: sales_Quotation_Shipment_Dtls;
      //  sales_Quotation_Termination: sales_Quotation_Termination;
        sales_Quotation_Summary_dyn: sales_Quotation_Summary_dyn[];
        sales_Quotation_Docs:sales_Quotation_Docs[];
    }


    export class sales_Quotation_Docs
    {
      doc_name:any;
    }

    export class sales_Quotation_Item_Dtls
    {
        slno:any;
        item_code:any;
        item_name:any;
        packing:any;
        packing_name:any;
        quantity:any;
        uom:any;
        squantity:any;
        suom:any;
        con_factor:any;
        mat_wt:any;
        hsn_code:any;
        price:any;
        price_based_on:any;
        amount:any;
        discount_type:any;
        discount_rate:any;
        tolerance:any;
        tax_code:any;
        tax_rate:any;
        acc_norms:any;
        packing_list_req:any;
        packing_list:any;
        discount_amt:any;
        tax_amt:any;
        total_amt:any;
        cgst_amt:any;
          sgst_amt:any;
          igst_amt:any;
        checkbox:any;
        quotation_id:any;
    }

    export class sales_Quotation_Broker_Dtls
    {
        slno:any;
        broker_code:any;
        broker_name:any;
        basis:any;
        rate:any;
        based_on:any;
    }

    export class sales_Quotation_Summary
    {
        item_total:any;
        discount:any;
        tax_total:any;
        net_amount:any;
        app_brokerage:any;
        net_r_value:any;
    }

    export class sales_Quotation_Summary_dyn
    {
        charge_name:any;
        rate_cal_method:any;
        amount:any;
        tax_rate:any;
        app_brokerage:any;
        net_r_value:any;

    }

    export class sales_Quotation_Trans_Info
    {
        trans_borne_by:any;
        mode_of_trans:any;
        trans_code:any;
        charge_code:any;
        transporters:any;
    }

    export class sales_Quotation_Terms_Con
    {
          payment_mode:any;
          payment_term:any;
          bank_name:any;
          account_no:any;
          ifsc_code:any;
          cash_limit:any;
          account_name: any;
          branch: any;
          iban:any;
          bic_swift_code:any;
    }

    export class Sales_Quotation_Party_Dtls
    {
        sl_no:any;
        p_code:any;
        cp_name:any;
        cp_contact:any;
        send_via:any;
        tcs_applicable:any;
        tcs_rate:any;
    }

    export class sales_Quotation_Shipment_Dtls
    { 
        ship_addr:any;
        ship_details:any;
        pay_addr:any;
        pay_details:any;
    }

    

    