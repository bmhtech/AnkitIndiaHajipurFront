export class Wheatstackcardreport 

{
    id:any;
    wheatstackid:any;
    business_unit:any;
    godowncode:any;     
    godownname:any;
    stackno:any;
    closed:any;
    company_id:any;
    fin_year:any;
    username:any;

    
    wheatstackcardreportdetails: Wheatstackcardreportdetails[];
}

export class Wheatstackcardreportdetails
    {
        wheatstackid:any;
        date:any;
        openingbags:any;
        openingloosebags:any;
        openingmt:any;
        truckno:any;
        variety:any;
        origin:any;
        receiptbags:any;
        receiptloosebags:any;
        receiptmt:any;
        issuebags:any;
        issueloosebags:any;
        issuemt:any;
        closingbags:any;
        closingloosebags:any;
        closingmt:any;
        savedstatus:any;
    }