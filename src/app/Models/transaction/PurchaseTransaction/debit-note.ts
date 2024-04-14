export class DebitNote 
{
        id:any;
        referance_id:any;
        debitnoteid:any;
        debitnoteno:any;
        debitnotetype:any;
        debitnotedate :  any;
        supplier_name :  any;
        supplier_id:any;
        created_by : any;
        truck_no:any;
        remarks:any;
        company_id: any;
        fin_year: any;   
        item_total:any;
        item_total_gl_ac:any;
        discount:any;
        discount_gl_ac :  any;
        qc_deduction :  any;
        net_amt :any;
        net_amt_gl_ac : any;
        qc_deduction_gl_ac : any;
        amt_after_deduction :any;
        amt_after_deduction_gl_ac : any;
        add_tax  : any;
        add_tax_gl_ac : any;
        post_tax_amt :any;
        post_tax_amt_gl_ac :any;
        other_charges : any;
        other_charges_gl_ac : any;
        payable_amt: any;
        payable_amt_gl_ac: any;
        add1 : any;
        add1_gl_ac : any;
        add2 : any;
        add2_gl_ac : any;
        roundoff_amt : any;
        roundoff_gl_ac : any;
        payable_party : any; 
        payable_party_gl_ac : any;
        already_paid : any;
        already_paid_gl_ac : any;
        net_payable_party :any;
        net_payable_party_gl_ac : any;
        username:any;
        businessunit:any;

        pur_debit_note_item_details : Pur_debit_note_item_details[];
        pur_debit_note_musterroll_details : Pur_debit_note_musterroll_details[];
        pur_debit_note_tax_info : Pur_debit_note_tax_info;
        pur_debit_note_broker_details : Pur_debit_note_broker_details[];
        pur_debit_note_bp_details:Pur_debit_note_bp_details;
        pur_debit_note_account_info: Pur_debit_note_account_info;
        pur_debit_note_docs:Pur_debit_note_docs[];
}

        export class Pur_debit_note_docs{
        doc_name: any;}


        export class Pur_debit_note_account_info 
        {
                mode_of_pay:any;
                pay_term :any; 
                credit_lim :any;  
                bankname:any;
                accountholder:any;
                acc_no:any;
                ifsc:any;
                mobile:any;
                iban: any; 
                bic_swift_code: any; 
                branch: any;    
        
        }

        export class Pur_debit_note_bp_details
        {
                supp_name: any;
                supp_phone: any;
                supp_fax: any;
                supp_email: any;
                supp_address: any;
                cp_designation:any;
                cp_name: any;
                cp_phone: any;
                cp_fax:any;
                cp_email:any;
                cp_address: any;

        }

        export class Pur_debit_note_broker_details
        {
                sl_no: any;
                broker_name: any;
                brokerage_amt: any;
                broker_other_info : any;
                up_brokerage_amt : any;
                total_brokerage :any;
        }

        export class Pur_debit_note_tax_info
        {
                pan: any;
                gst : any;
                cin: any;
                tan: any;
        }

        export class Pur_debit_note_musterroll_details{
        muster_roll_name: any;}


        export class Pur_debit_note_item_details
        {
                slno:any;	      
                adv_item_code:any;
                adv_item_name:any;	
                adv_packing_item:any;
                adv_packing_item_name:any;
                passed_packing_qty:any;	
                passed_packing_uom:any;	
                passed_item_qty:any;	
                passed_mat_weight:any;	
                passed_item_uom:any;	
                unit_rate:any;	
                price_based_on:any;
                amount:any;	
                discount:any;	
                discount_basedon:any;	
                discount_amount:any;	 
                net_amount:any;	
                qc_deduction :any;
                net_amt_after_qc :any;
                tax_code:any;	
                tax_rate: any;
                tax_amt:any;	     
                gross_amt:any;	
                gl_acc:''
                checkbox:any;
}



