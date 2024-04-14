export class Millbreakdownreport 

{
    id:any;
    millbreakdownid:any;
    date:any;
    bussiness_unit;
    totalnobreakdown:any;
    totalhoursbreakdown:any;
    company_id:any;
    fin_year:any;
    username:any;

    millbreakdownreport_Dtls: millbreakdownreport_Dtls[];
}

export class millbreakdownreport_Dtls
    {
        millbreakdownid:any;
        slno:any;
        breakdowncount:any;
        startdate:any;
        starttime:any;
        enddate:any;
        endtime:any;
        timediff:any;
        shift:any;
        remarks:any;
        date_diff:any;
    }