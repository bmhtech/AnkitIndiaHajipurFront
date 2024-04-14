export class itemStock 
{   
    id :any;
    company_id :any;
    fin_year :any; 
    username :any;
    stockid: any;
    entryperson :any;
    entrydate :any;
    item_stock_dtls: item_stock_dtls[];
}

export class item_stock_dtls
    {
        stockid:any;
        slno:any;
        itemname:any;
        itemcode:any;
        packingname:any;
        packingcode:any;
        itemtype:any;
        openitembal:any;
        openpackingbal:any;
        openingdate:any;
        openingfinyear:any;
    }

