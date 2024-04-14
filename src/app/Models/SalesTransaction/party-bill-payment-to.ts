export class PartyBillPaymentTo 
{
    fromdate:any;
    ledgerid:any;

    id:any;
    party:any;
    total_billamt:any;
    total_adjamt:any;
    total_dueamt:any;
    total_payamt:any;
    business_unit:any;
    pledgerid:any;
    pay_to:any;
    entrydate:any;
    company_id:any;
    fin_year:any;
    username:any;
    customer_group:any;
    party_bill_payment_to_details: Party_Bill_Payment_To_details[];
}

export class Party_Bill_Payment_To_details 
{
    invoice_no:any;
    invoice_number:any;
    invoice_date:any;
    bill_amt:any;
    adj_amt:any;
    due_amt:any;
    payable_amt:any;
    remarks:any;
}