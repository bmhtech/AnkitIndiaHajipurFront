export class Binreport 

{
    id:any;
    binreportid:any;
    business_unit:any;     
    date:any;
    approvedby:any;
    company_id:any;
    fin_year:any;
    username:any;

    binreportdetails: binreportdetails[];
    
}

export class binreportdetails
{
    binreportid:any;
    bingroupid:any;
    bingroupname:any;
    binid:any;
    binname:any;
    dip:any;
    mt:any;
    prevdip:any;
    prevmt:any;
}
