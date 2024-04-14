export class eInvoiceGenerate
{
    Version: any;
    ShipDtls:any;
    
    TranDtls:TranDtls;
    DocDtls:DocDtls;
    SellerDtls:SellerDtls;
    BuyerDtls:BuyerDtls;
    ValDtls:ValDtls;
    ItemList:ItemList[];
}

export class TranDtls
{
    TaxSch:any;
    SupTyp:any;
    IgstOnIntra:any;
    RegRev:any;
    EcmGstin:any;
}

export class DocDtls
{
    Typ:any;
    No:any;
    Dt:any;    
}

export class SellerDtls
{
    Gstin:any; 
    LglNm:any; 
    TrdNm:any; 
    Addr1:any; 
    Addr2:any; 
    Loc:any; 
    Pin:any; 
    Stcd:any; 
    Ph:any; 
    Em:any; 
}

export class BuyerDtls
{
    Gstin:any;
    LglNm:any;
    TrdNm:any;
    Pos:any;
    Addr1:any;
    Addr2:any;
    Loc:any;
    Pin:any;
    Stcd:any;
    Ph:any;
    Em:any;
 
}


export class ValDtls
{
    AssVal:any;
    IgstVal:any;
    CgstVal:any;
    SgstVal:any;
    StCesVal:any;
    Discount:any;
    OthChrg:any;
    RndOffAmt:any;
    TotInvVal:any;
}

export class ItemList
{
    SlNo:any;
    PrdDesc:any;
    IsServc:any;
    HsnCd:any;
    Qty:any;
    Unit:any;
    UnitPrice:any;
    TotAmt:any;
    Discount:any;
    PreTaxVal:any;
    AssAmt:any;
    GstRt:any;
    IgstAmt:any;
    CgstAmt:any;
    SgstAmt:any;
    CesRt:any;
    CesAmt:any;
    CesNonAdvlAmt:any;
    StateCesRt:any;
    StateCesAmt:any;
    StateCesNonAdvlAmt:any;
    OthChrg:any;
    TotItemVal:any; 
 
}
