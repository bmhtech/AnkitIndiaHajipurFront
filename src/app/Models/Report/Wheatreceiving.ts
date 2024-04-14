export class Wheatreceiving 

{
    id:any;
    wheatreceiveid:any;
    date:any;
    business_unit:any;
    createdby:any;
    company_id:any;
    fin_year:any;
    username:any;

    wheatstock_Dtls: wheatstock_Dtls[];
    wheatreceiving_Dtls: wheatreceiving_Dtls[];
    wheat_issue_Dtls:wheat_issue_Dtls[];
}

export class wheatstock_Dtls
    {
        wheatreceiveid:any;
        slno:any;
        stack:any;
        wheat_grade:any;
        openingbags:any;
        openingqty:any;
        openingloose:any;
        receiptbags:any;
        receiptqty:any;
        receiptloose:any;
        issuebags:any;
        issueqty:any;
        issueloose:any;
        closingbags:any;
        closingqty:any;
        closingloose:any;
    }
    
export class wheatreceiving_Dtls
    {
        wheatreceiveid:any;
        slno:any;
        truckno:any;
        hub:any;
        grade:any;
        sixtykgbags:any;
        sixtykgqty:any;
        ninetyfivekgbags:any;
        ninetyfivekgqty:any;
        total:any;
        stackno:any;
    }

    export class wheat_issue_Dtls
    {
        wheatreceiveid:any;
        slno:any;
        issue_grade:any;
        stack_no:any;
        issue_bags:any;
        issue_qty:any;
    }