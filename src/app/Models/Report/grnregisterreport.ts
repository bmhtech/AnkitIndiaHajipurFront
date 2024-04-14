export class Grnregisterreport 

{
    id:any;
    grnregisterid:any;
    grndate:any;
    grnno:any;
    billno:any;
    adviceno:any;
    suppliername:any;
   
    vehicleno:any;
    storeserialno:any;
    company_id:any;
    fin_year:any;
    username:any;

    grnregisterreport_Dtls: grnregisterreport_Dtls[];
}

export class grnregisterreport_Dtls
    {
        grnregisterid:any;
        slno:any;
        grndate:any;
        itemdesc:any;
        quantity:any;
        unit:any;
        rate:any;
    }