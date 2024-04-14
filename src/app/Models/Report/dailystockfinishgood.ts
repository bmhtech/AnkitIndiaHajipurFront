export class Dailystockfinishgood 

{
    id:any;
    dailystockid:any;
    date:any;
    business_unit:any;
    createdby:any;
    approvedby:any;
    company_id:any;
    fin_year:any;
    username:any;
    grandtotal:any;

    dailystockfinishgood_Dtls: dailystockfinishgood_Dtls[];
}

export class dailystockfinishgood_Dtls
    {
        dailystockid:any;
        slno:any;
        item_code:any;
        itemname:any;
        openingstock:any;
        production:any;
        sale:any;
        conversion:any;
        closingstock:any;
    }