export class ItemOpeningStock 
{
    id :any;
    transe_id:any;
    business_unit:any;
    tdate:any;
    item_type:any;
    company_id:any;
    fin_year:any;
    username:any;
    item_opening_stk_dtls:ItemOpeningStockDetails[];
}

export class ItemOpeningStockDetails
{
    checkbox:any;
    item_id:any;
    open_item_gr_qty:any;
    item_uom:any;
    pack_dtls:any;
}

export class item_opening_stk_pack_dtls
{
    packing_id:any;
    item_id:any;
    open_packing_qty:any;
    packing_uom:any;
    open_item_qty:any;
    item_uom:any;
    tolerance:any; 
    capacity:any;
}