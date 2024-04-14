    export class salestransport
    {
        id: any;
        company_id: any;
        fin_year: any;
        username: any;
        trans_jv_no:any;
        jvdate:any;
        referance_no:any;
        challandate: any;
        challanno:any;
        buname: any;
        partyname: any;
        vehicleno: any;
        own_slip_no: any;
        own_slip_nonew: any;
        grosswt: any;
        grosswtnew: any;
        tarewt: any;
        tarewtnew: any;
        netwt: any;
        netwtnew: any;
        balancewt: any;
        deduction_basedon: any;
        allowed_shortage: any;
        mat_price: any;
        mat_amt: any;
        price: any;
        actual_amt: any;
        adv_pay: any;
        transname: any;
        app_chgs_id: any;
        remarks: any;
        chgs_dedu: any;
        balance_amt: any;
        tds_rate: any;
        tds_amt: any;
        tds_dedu_amt: any;
        round_off: any;
        pay_amt: any;
        final_pay: any;
        transportqty: any;
        loadingdate: any;
        detaintionfromdate: any;
        detaintiontodate: any;
        currentdate:any;
        transport_rate:any;
        bags:any;
        ailreturnweight:any;
        bulksupply:any;

        salestransport_app_chgs : Salestransport_app_chgs[];
    }

    export class Salestransport_app_chgs
	{
		charges_name:any;
		add_less:any;
		rate_cal_method:any;
		app_rate:any;
		amount:any;
		tax_rate:any;
	}

    



