export class Dailyweigher 

{
    id:any;
    dwg_id:any;
    b_unit:any;
    machine:any;
    oacumwt:any;
    cacumwt:any;
    oacumpcs:any;
    cacumpcs:any;
    totalbags:any;
    totalkgs:any;
    differencebags:any;
    differencekgs:any;
    company_id:any;
    fin_year:any;
    username:any;
    weigherdate:any;
    dailyweigher_Dtls:dailyweigher_Dtls[];

}

export class dailyweigher_Dtls 
{
        slno:any;
        dwg_id:any;
        item_code:any;
        packing_item:any;
        bags:any;
        kgs:any;
}