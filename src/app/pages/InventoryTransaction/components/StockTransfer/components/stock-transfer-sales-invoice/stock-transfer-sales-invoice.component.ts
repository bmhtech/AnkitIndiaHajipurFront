import { Component, OnInit } from '@angular/core';
import { Master } from '../../../../../../service/master.service';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { forkJoin, timer } from 'rxjs';
import { StockTransferSalesInvoice} from '../../../../../../Models/StockTransfer/stock-transfer-sales-invoice';
import { StockQcPopupComponent } from '../stock-qc-popup/stock-qc-popup.component';
import { StockTaxPopupComponent } from '../stock-tax-popup/stock-tax-popup.component';
import { StockTransferChallanPopUpComponent } from '../../components/stock-transfer-challan-pop-up/stock-transfer-challan-pop-up.component';
import { StockTransferSalesInvoiceAccountpostingComponent } from '../stock-transfer-sales-invoice-accountposting/stock-transfer-sales-invoice-accountposting.component';
import { StocktransfersalesinvoicemultiplechallanComponent } from '../stocktransfersalesinvoicemultiplechallan/stocktransfersalesinvoicemultiplechallan.component';
import { StockTransferSaleInvoicePrintoptionComponent } from '../stock-transfer-sale-invoice-printoption/stock-transfer-sale-invoice-printoption.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

  @Component({
    selector: 'app-stock-transfer-sales-invoice',
    templateUrl: './stock-transfer-sales-invoice.component.html',
    styleUrls: ['./stock-transfer-sales-invoice.component.scss']
  })

  export class StockTransferSalesInvoiceComponent implements OnInit 
  {
    public userForm:FormGroup;
    model: StockTransferSalesInvoice = new StockTransferSalesInvoice();
    listStockTransferSalesInvoice:StockTransferSalesInvoice[];
    submitted = false;
    isHidden:any;
    status:any; 
    ledgerNames:any=[];
    businesslists:any = [];
    transporterList:any = [];
    company_name:any;
    fin_year:any;
    currentDate:any;
    item_sl_no = 1; 
    transporter_sl_no = 1;
    Id:any;
    _businessunit:any;
    stkTransferSalesInvNo:any;
    item_codes:any = [];
    packingItem:any = [];
    empty_bag_wt:any = [];
    vehicleNoList:any = []
    vehicleTypeList:any = [];
    capacity:any = [];
    defaultValue:any;
    totalItem:number;
    totalDiscount:number;
    totalTaxAmt:number;
    grandTotal:number;
    appCharges:number;
    adj1:number;
    adj2:number;
    tcsAmt:number;
    stocktransfersalesinvoicesave:boolean = true;
    stocktransfersalesinvoiceupdate: boolean = true;
    stocktransfersalesinvoiceview:boolean = true;
    stocktransfersalesinvoicedelete:boolean = true;
    refTypeStatus:boolean=false;
    stocktransfersalesinvoiceprint:boolean = true;
    stocktransfersalesinvoiceposting:boolean = true;
    myFiles:any = [];

    constructor(public fb:FormBuilder, public dialog: MatDialog,
      private Service : Master,private DropDownListService: DropdownServiceService)
    {
      this.userForm=fb.group(
      {
        id:[''],
        reference_id: [''],
        stk_sales_inv_no:[''],
        stk_sales_inv_id:[''],
        business_unit:[''],
        stk_sales_inv_date:[''],
        challan:[''],
        e_invoice_no:[''],
        remarks:[''],
        grand_total:[''],
        item_total:[''],
        item_total_gl_ac:[''],
        discount:[''],
        discount_gl_ac:[''],
        net_total:[''],
        net_total_gl_ac:[''],
        tax_total:[''],
        tax_total_gl_ac:[''],
        total_bill_amt:[''],
        total_bill_amt_gl_ac:[''],
        applicable_amt:[''],
        applicable_gl_ac:[''],
        adj1_amt:[''],
        adj1_gl_ac:[''],
        adj2_amt:[''],
        adj2_gl_ac:[''],
        roundoff_amt:[''],
        roundoff_gl_ac:[''],
        final_bill_amt:[''],
        final_bill_amt_gl_ac:[''],
        tcsamt:[''],
        tcsglac:[''],
        payable_amt:[''],
        payable_amt_gl_ac:[''], 
        stk_sales_inv_order_no:[''], 
        stk_sales_inv_order_date:[''], 
        refchallanno:[''], 
        refchallandate:[''], 
        company_id: [''],
        fin_year: [''],
        username: [''],
        stk_sales_mutlipledates:[''],
        multiplechallandate:[''],
      
        stk_transfer_sales_inv_trans_dtls: this.fb.array([this.fb.group({
          slno: this.transporter_sl_no,
          transname: '',	
          vehicletype: '',	
          vehicleno: '',	
          ewaybillno: '',
          ewaybilldate: ''})]),

        stk_transfer_sales_inv_docs: this.fb.array([this.fb.group({
          doc_name:''})]),
      
        stk_transfer_sales_inv_item_dtls: this.fb.array([this.fb.group({
          slno:this.item_sl_no,
          item_code:'',
          item_group:'',
          packing:'',
          hsn_code:'',
          quantity:'',
          uom:'',
          squantity:'',
          suom:'',
          mat_wt:'',
          price:'',
          price_based_on:'',
          amount:'',
          discount_type:'',
          discount_rate:'',
          discount_amt: '',
          tax_code:'',
          tax_rate: '',
          tax_amt:'',
          total_amt:'',
          acc_norms:''})]),

        stk_transfer_sales_inv_tax_info: this.fb.group({ 
          panno: '',
          tanno: '',
          cinno: '',
          gstno: ''}),
          
        stk_transfer_sales_inv_shipment_dtls: this.fb.group({ 
          shipaddr: '',
          shipdtls: '',
          paytoaddr: '',
          paytodtls: '', }),

        stk_transfer_sales_inv_bu_dtls: this.fb.group({ 
          businessunit_name: '',
          mobile_no: '',
          email_id: '',
          work_address: ''}),  

        stocksaleitem_groupwise_hsnsumm: this.fb.array([this.fb.group({
          hsn_code:'',
          amount:''})]),
            
        stocksaleitem_groupwise_summ: this.fb.array([this.fb.group({ 
          item_group:'',
          item_total:'',
          discount_amt:'',
          item_ledger:'',
          discount_ledger:''})]),

          stocksaleitem_groupwise_taxsumm: this.fb.array([this.fb.group({
            tax_code:'',
            tax_rate:'',
            tax_amt:'',
            percentage:'',
            cgst:'',
            sgst:'',
            igst:'',
            cgstledgerid:'',
            sgstledgerid:'',
            igstledgerid:'',
            taxable_amt:''})]),
      });
    }

    get id(){ return this.userForm.get("id") as FormControl }
    get multiplechallandate(){ return this.userForm.get("multiplechallandate") as FormControl }
    get stk_sales_inv_id(){ return this.userForm.get("stk_sales_inv_id") as FormControl }
    get stk_sales_inv_no(){ return this.userForm.get("stk_sales_inv_no") as FormControl }
    get stk_sales_inv_date(){ return this.userForm.get("stk_sales_inv_date") as FormControl }
    get business_unit(){ return this.userForm.get("business_unit") as FormControl }
    get e_invoice_no(){ return this.userForm.get("e_invoice_no") as FormControl }
    get stk_sales_inv_order_no(){ return this.userForm.get("stk_sales_inv_order_no") as FormControl }
    get stk_sales_inv_order_date(){ return this.userForm.get("stk_sales_inv_order_date") as FormControl }
    get refchallanno(){ return this.userForm.get("refchallanno") as FormControl }
    get refchallandate(){ return this.userForm.get("refchallandate") as FormControl }
    get brokage_app(){ return this.userForm.get("brokage_app") as FormControl }     
    get remarks(){ return this.userForm.get("remarks") as FormControl }
    get stk_sales_mutlipledates(){ return this.userForm.get("stk_sales_mutlipledates") as FormControl }
    get challan(){ return this.userForm.get("challan") as FormControl }
    get grand_total(){ return this.userForm.get("grand_total") as FormControl }
    get item_total(){ return this.userForm.get("item_total") as FormControl }
    get item_total_gl_ac(){ return this.userForm.get("item_total_gl_ac") as FormControl }
    get discount(){ return this.userForm.get("discount") as FormControl }
    get discount_gl_ac(){ return this.userForm.get("discount_gl_ac") as FormControl } 
    get net_total(){ return this.userForm.get("net_total") as FormControl }
    get net_total_gl_ac(){ return this.userForm.get("net_total_gl_ac") as FormControl } 
    get tax_total(){ return this.userForm.get("tax_total") as FormControl }
    get tax_total_gl_ac(){ return this.userForm.get("tax_total_gl_ac") as FormControl }  
    get total_bill_amt(){ return this.userForm.get("total_bill_amt") as FormControl }
    get total_bill_amt_gl_ac(){ return this.userForm.get("total_bill_amt_gl_ac") as FormControl }
    get applicable_amt(){ return this.userForm.get("applicable_amt") as FormControl }
    get applicable_gl_ac(){ return this.userForm.get("applicable_gl_ac") as FormControl }
    get adj1_amt(){ return this.userForm.get("adj1_amt") as FormControl }
    get adj1_gl_ac(){ return this.userForm.get("adj1_gl_ac") as FormControl }
    get adj2_amt(){ return this.userForm.get("adj2_amt") as FormControl }
    get adj2_gl_ac(){ return this.userForm.get("adj2_gl_ac") as FormControl }
    get roundoff_amt(){ return this.userForm.get("roundoff_amt") as FormControl }
    get roundoff_gl_ac(){ return this.userForm.get("roundoff_gl_ac") as FormControl }    
    get final_bill_amt(){ return this.userForm.get("final_bill_amt") as FormControl }
    get final_bill_amt_gl_ac(){ return this.userForm.get("final_bill_amt_gl_ac") as FormControl } 
    get tcsamt(){ return this.userForm.get("tcsamt") as FormControl }
    get tcsglac(){ return this.userForm.get("tcsglac") as FormControl }    
    get payable_amt(){ return this.userForm.get("payable_amt") as FormControl }
    get payable_amt_gl_ac(){ return this.userForm.get("payable_amt_gl_ac") as FormControl }
    get stk_transfer_sales_inv_shipment_dtls() { return this.userForm.get('stk_transfer_sales_inv_shipment_dtls') as FormGroup; }
    get stk_transfer_sales_inv_tax_info() { return this.userForm.get('stk_transfer_sales_inv_tax_info') as FormGroup; }
    get stk_transfer_sales_inv_item_dtls(){return this.userForm.get("stk_transfer_sales_inv_item_dtls") as FormArray};
    get stk_transfer_sales_inv_trans_dtls(){return this.userForm.get("stk_transfer_sales_inv_trans_dtls") as FormArray}; 
    get stk_transfer_sales_inv_docs(){return this.userForm.get("stk_transfer_sales_inv_docs") as FormArray};
    get stk_transfer_sales_inv_bu_dtls() { return this.userForm.get('stk_transfer_sales_inv_bu_dtls') as FormGroup; }

    get stocksaleitem_groupwise_hsnsumm(){return this.userForm.get("stocksaleitem_groupwise_hsnsumm") as FormArray};
    get stocksaleitem_groupwise_summ(){return this.userForm.get("stocksaleitem_groupwise_summ") as FormArray};
    get stocksaleitem_groupwise_taxsumm(){return this.userForm.get("stocksaleitem_groupwise_taxsumm") as FormArray};


    ngOnInit()
    {
      //For User Role
    let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
    this.stocktransfersalesinvoicesave = false;
    this.stocktransfersalesinvoiceupdate = false;
    this.stocktransfersalesinvoiceview = false;
    this.stocktransfersalesinvoicedelete = false;
    this.stocktransfersalesinvoiceprint = false;
    this.stocktransfersalesinvoiceposting = false;

    if(accessdata.includes('stock_transfer_sales_inv.save'))
    {
     this.stocktransfersalesinvoicesave = true;
    }
   if(accessdata.includes('stock_transfer_sales_inv.update'))
    { 
      this.stocktransfersalesinvoiceupdate=true;
    }
    if(accessdata.includes('stock_transfer_sales_inv.view'))
    { 
      this.stocktransfersalesinvoiceview=true;
    }
    if(accessdata.includes('stock_transfer_sales_inv.delete'))
    { 
      this.stocktransfersalesinvoicedelete=true;
    }
    if(accessdata.includes('stock_transfer_sales_inv.print'))
    {
     this.stocktransfersalesinvoiceprint = true;
    }
    if(accessdata.includes('stock_transfer_sales_inv.posting'))
    {
     this.stocktransfersalesinvoiceposting = true;
    }
  
      this.status = false;
      this.isHidden = false;
      this._businessunit = "0";
      this.packingItem = [];
      this.empty_bag_wt = [];
      this.capacity = [];
      this.defaultValue = 0;
      this.totalItem = 0;
      this.totalDiscount = 0;
      this.totalTaxAmt = 0;
      this.appCharges = 0;
      this.adj1 = 0;
      this.adj2 = 0;
      this.tcsAmt = 0;
      this.company_name = localStorage.getItem("company_name");
      this.fin_year = localStorage.getItem("financial_year");
      //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      forkJoin(
        this.Service.getStkTranSaleInvs("company="+this.company_name+"&finyear="+this.fin_year),
        this.DropDownListService.ledgerNameList(),
        this.DropDownListService.custometrBusList(this.company_name),
       // this.DropDownListService.itemNamesList(),
        this.DropDownListService.itemNamesNewList(),
        this.DropDownListService.transporterNamesList(),
        this.DropDownListService.getVehicleThruWeighment(),
        this.DropDownListService.vehicleCodeList(),
      ).subscribe(([stkTransSalesInvdata, ledgerdata, bunitData, itemData, 
        transporteData, vehNoData, vehTypeList])=>
        {
          this.listStockTransferSalesInvoice  = stkTransSalesInvdata;
          this.ledgerNames  = ledgerdata;
          this.businesslists  = bunitData;
          this.item_codes = itemData;
          this.transporterList = transporteData;
          this.vehicleNoList = vehNoData;
          this.vehicleTypeList = vehTypeList;
          this.userForm.patchValue({business_unit: "0", item_total_gl_ac: "0",
            discount_gl_ac: "0", net_total_gl_ac: "0", tax_total_gl_ac: "0",
            total_bill_amt_gl_ac: "0", applicable_gl_ac: "0", adj1_gl_ac: "0",
            adj2_gl_ac: "0", roundoff_gl_ac: "0", final_bill_amt_gl_ac: "0",
            payable_amt_gl_ac: "0", tcsglac: "0"});

            this.stk_transfer_sales_inv_item_dtls.at(0).patchValue({item_code: "0", quantity: 0,
              squantity: 0, mat_wt: 0, price: 0, price_based_on: "0", amount: 0,
              discount_type: "0", discount_rate: 0, discount_amt: 0, tax_rate: 0,
              tax_amt: 0, total_amt: 0})
          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});     
    }

    onChangeDate(event)
    {
      this.currentDate = event;
      this.getseqId(this._businessunit, this.currentDate);
    }

    onChangeBusinessUnit(event)
    {
      this._businessunit = event;
      this.getseqId(this._businessunit, this.currentDate);
      this.stk_transfer_sales_inv_bu_dtls.patchValue({businessunit_name: event});
      if(event != "0")
      {
        this.status = false;
        this.DropDownListService.getCompanyBUAddress(event).subscribe(data=>
        {
          this.stk_transfer_sales_inv_tax_info.patchValue({panno: data["pan_no"], gstno: data["gstin_no"]})
          this.stk_transfer_sales_inv_bu_dtls.patchValue({mobile_no: data["mobile_no"],
            email_id: data["email_id"], work_address: data["work_address"]});
          this.status = true;
        })
      }
    }

    getseqId(bunit, stkTransSalesInvDate)
    {
      if(bunit != "0")
      {
        this.status = false;
        this.DropDownListService.getSTSISequenceId(stkTransSalesInvDate+"/"+bunit).subscribe(data=>
        {
          this.stkTransferSalesInvNo = data.sequenceid;
          this.status = true;
        })
      }
    }

    onChangeItemName(index,event)
    {
      if(event)
      {
        this.status = false;
        this.DropDownListService.getItemNameById(event.target.value,this.company_name).subscribe(data=>
        {      
          this.DropDownListService.getUomName(data.mstock_unit).subscribe(data=>
          { this.stk_transfer_sales_inv_item_dtls.at(index).patchValue({uom: data.description}); });
          
          this.DropDownListService.getItemMasterPackMat(event.target.value).subscribe(data1=>{   
           this.packingItem[index] = data1; });

          this.DropDownListService.retriveItemMasterStatInfo(event.target.value,this.company_name).subscribe(data=>{   
           this.stk_transfer_sales_inv_item_dtls.at(index).patchValue({tax_code: data[0].tax_code, tax_rate: data[0].tax_rate}); });
    
          this.DropDownListService.getItemQCDetails(event.target.value,this.company_name).subscribe(data=>{   
           this.stk_transfer_sales_inv_item_dtls.at(index).patchValue({acc_norms: data[0].qc_code}); });  
        });
        this.status = true;
      }
    }

    itemId: any;
    packingQty:any;
    onChangePackingItem(index,event,)
    {
      if(event)
      {
        this.status = false;
        this.itemId =  this.stk_transfer_sales_inv_item_dtls.at(index).get("item_code").value as FormControl;
        this._packing_qty =  this.stk_transfer_sales_inv_item_dtls.at(index).get("squantity").value as FormControl;
        this.DropDownListService.getItemPackUom(this.itemId, event.target.value,this.company_name).subscribe(data=>
        {  
          this.capacity[index] = data.capacity; 
          this.empty_bag_wt[index] = data.empty_big_wt;
          this._item_qty = this.capacity[index] * this._packing_qty;
          this._mat_weight =  this._item_qty - this.empty_bag_wt[index];
          this.stk_transfer_sales_inv_item_dtls.at(index).patchValue({suom: data.uom1, quantity: this._item_qty, mat_wt: this._mat_weight}); 
          this._mrp = this.stk_transfer_sales_inv_item_dtls.at(index).get("price").value as FormControl;
          this._mat_weight = this.stk_transfer_sales_inv_item_dtls.at(index).get("mat_wt").value as FormControl;
          this._priceBasedOn = this.stk_transfer_sales_inv_item_dtls.at(index).get('price_based_on').value as FormControl;
          this._discount = this.stk_transfer_sales_inv_item_dtls.at(index).get('discount_rate').value as FormControl;
          this._discountBasadOn = this.stk_transfer_sales_inv_item_dtls.at(index).get('discount_type').value as FormControl;
          this._taxrate = this.stk_transfer_sales_inv_item_dtls.at(index).get('tax_rate').value as FormControl;
          this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight, 
            this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)  
          this.status = true;
        });
      }
    }

    onChangeShipToAddId(businessunit_code: String)
    {
      if(businessunit_code != "0")
      {
        this.status = false;
        this.DropDownListService.getCompanyBUAddress(businessunit_code).subscribe(data=>
        {
          this.stk_transfer_sales_inv_shipment_dtls.patchValue({shipdtls: data["add"]});
          this.status = true;
        });
      }
    }

    onChangePayToAddId(businessunit_code: String)
    {
      if(businessunit_code != "0")
      {
        this.status = false;
        this.DropDownListService.getCompanyBUAddress(businessunit_code).subscribe(data=>
        {
          this.stk_transfer_sales_inv_shipment_dtls.patchValue({paytodtls: data["add"]});
          this.status = true;
        });
      }
    }

    _packing_qty:any;
    _item_qty:any;
    _mrp:any;
    _mat_weight:any;
    _priceBasedOn:any;
    _discount:any;
    _discountBasadOn:any;
    _taxrate:any;
     getPackingQty(packingQty, index)
    {
      this._packing_qty = packingQty.target.value;
      this._item_qty = this.capacity[index] * this._packing_qty;
      this.stk_transfer_sales_inv_item_dtls.at(index).patchValue({quantity: this._item_qty, 
        mat_wt: (Math.round((this._item_qty - this.empty_bag_wt[index])*1000)/1000).toFixed(3)});
      this._mrp = this.stk_transfer_sales_inv_item_dtls.at(index).get("price").value as FormControl;
      this._mat_weight = this.stk_transfer_sales_inv_item_dtls.at(index).get("mat_wt").value as FormControl;
      this._priceBasedOn = this.stk_transfer_sales_inv_item_dtls.at(index).get('price_based_on').value as FormControl;
      this._discount = this.stk_transfer_sales_inv_item_dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = this.stk_transfer_sales_inv_item_dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.stk_transfer_sales_inv_item_dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)   
    }

    getItemQty(itemQty, index)
    {
      this._packing_qty = this.stk_transfer_sales_inv_item_dtls.at(index).get("squantity").value as FormControl;
      this._item_qty = itemQty.target.value;
      this.stk_transfer_sales_inv_item_dtls.at(index).patchValue({ 
        mat_wt: (Math.round((this._item_qty - this.empty_bag_wt[index])*1000)/1000).toFixed(3)});
     
      this._mrp = this.stk_transfer_sales_inv_item_dtls.at(index).get("price").value as FormControl;
      this._mat_weight = this.stk_transfer_sales_inv_item_dtls.at(index).get("mat_wt").value as FormControl;
      this._priceBasedOn = this.stk_transfer_sales_inv_item_dtls.at(index).get('price_based_on').value as FormControl;
      this._discount = this.stk_transfer_sales_inv_item_dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = this.stk_transfer_sales_inv_item_dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.stk_transfer_sales_inv_item_dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)   
    }

    getMatWt(matwt, index)
    {
      this._packing_qty = this.stk_transfer_sales_inv_item_dtls.at(index).get("squantity").value as FormControl;
      this._item_qty = this.stk_transfer_sales_inv_item_dtls.at(index).get("quantity").value as FormControl;
      this._mrp = this.stk_transfer_sales_inv_item_dtls.at(index).get("price").value as FormControl;
      this._mat_weight = matwt.target.value;
      this._priceBasedOn = this.stk_transfer_sales_inv_item_dtls.at(index).get('price_based_on').value as FormControl;
      this._discount = this.stk_transfer_sales_inv_item_dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = this.stk_transfer_sales_inv_item_dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.stk_transfer_sales_inv_item_dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)   
    }

    getPrice(price, index)
    {
      this._packing_qty = this.stk_transfer_sales_inv_item_dtls.at(index).get("squantity").value as FormControl;
      this._item_qty = this.stk_transfer_sales_inv_item_dtls.at(index).get("quantity").value as FormControl;
      this._mrp =  price.target.value;
      this._mat_weight = this.stk_transfer_sales_inv_item_dtls.at(index).get("mat_wt").value as FormControl;
      this._priceBasedOn = this.stk_transfer_sales_inv_item_dtls.at(index).get('price_based_on').value as FormControl;
      this._discount = this.stk_transfer_sales_inv_item_dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = this.stk_transfer_sales_inv_item_dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.stk_transfer_sales_inv_item_dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)   
    }

    onChangePriceBasedOn(price_based_on, index)
    {
      this.Total_Amt  = this.stk_transfer_sales_inv_item_dtls.at(index).get("total_amt").value as FormControl;
      this._packing_qty = this.stk_transfer_sales_inv_item_dtls.at(index).get("squantity").value as FormControl;
      this._item_qty = this.stk_transfer_sales_inv_item_dtls.at(index).get("quantity").value as FormControl;
      this._mrp = this.stk_transfer_sales_inv_item_dtls.at(index).get("price").value as FormControl;
      this._mat_weight = this.stk_transfer_sales_inv_item_dtls.at(index).get("mat_wt").value as FormControl;
      this._priceBasedOn = price_based_on.target.value;
      this._discount = this.stk_transfer_sales_inv_item_dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = this.stk_transfer_sales_inv_item_dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.stk_transfer_sales_inv_item_dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(parseFloat(this._packing_qty), parseFloat(this._item_qty), parseFloat(this._mrp), 
        parseFloat(this._mat_weight), this._priceBasedOn, parseFloat(this._discount), 
        this._discountBasadOn, parseFloat(this._taxrate), index)
   
        this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
          this.appCharges, this.adj1, this.adj2, this.tcsAmt)

        this.setOnGrandTotal( this.Total_Amt,index); 
    }

    getDiscount(discount, index)
    {
      this._packing_qty = this.stk_transfer_sales_inv_item_dtls.at(index).get("squantity").value as FormControl;
      this._item_qty = this.stk_transfer_sales_inv_item_dtls.at(index).get("quantity").value as FormControl;
      this._mrp = this.stk_transfer_sales_inv_item_dtls.at(index).get("price").value as FormControl;
      this._mat_weight = this.stk_transfer_sales_inv_item_dtls.at(index).get("mat_wt").value as FormControl;
      this._priceBasedOn = this.stk_transfer_sales_inv_item_dtls.at(index).get('price_based_on').value as FormControl;
      this._discount = discount.target.value;
      this._discountBasadOn = this.stk_transfer_sales_inv_item_dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.stk_transfer_sales_inv_item_dtls.at(index).get('tax_rate').value as FormControl;
     this.calculateItemData(parseFloat(this._packing_qty), parseFloat(this._item_qty), parseFloat(this._mrp), 
        parseFloat(this._mat_weight), this._priceBasedOn, parseFloat(this._discount), 
        this._discountBasadOn, parseFloat(this._taxrate), index)
   
        this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
          this.appCharges, this.adj1, this.adj2, this.tcsAmt)
      }

    Total_Amt:any;
    onchangeDiscountBasedOn(dis_based_on, index)
    {
      this.Total_Amt  = this.stk_transfer_sales_inv_item_dtls.at(index).get("total_amt").value as FormControl;
      this._packing_qty = this.stk_transfer_sales_inv_item_dtls.at(index).get("squantity").value as FormControl;
      this._item_qty = this.stk_transfer_sales_inv_item_dtls.at(index).get("quantity").value as FormControl;
      this._mrp = this.stk_transfer_sales_inv_item_dtls.at(index).get("price").value as FormControl;
      this._mat_weight = this.stk_transfer_sales_inv_item_dtls.at(index).get("mat_wt").value as FormControl;
      this._priceBasedOn = this.stk_transfer_sales_inv_item_dtls.at(index).get('price_based_on').value as FormControl;
      this._discount = this.stk_transfer_sales_inv_item_dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = dis_based_on.target.value;
      this._taxrate = this.stk_transfer_sales_inv_item_dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(parseFloat(this._packing_qty), parseFloat(this._item_qty), parseFloat(this._mrp), 
        parseFloat(this._mat_weight), this._priceBasedOn, parseFloat(this._discount), 
        this._discountBasadOn, parseFloat(this._taxrate), index)
  
        this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
          this.appCharges, this.adj1, this.adj2, this.tcsAmt)

        this.setOnGrandTotal( this.Total_Amt,index);
      }

      TotalAddition:any;
      _Amount:any;
      _Discount:any;
      _TaxTotal:any;
      setOnGrandTotal(itemqty, index)
      {
        this.TotalAddition=0,this._Amount = 0,this._Discount = 0,this._TaxTotal = 0;
        for(let i = 0; i<this.stk_transfer_sales_inv_item_dtls.length; i++)
        {
          this.TotalAddition += Number(this.stk_transfer_sales_inv_item_dtls.at(i).get("total_amt").value);
          this._Amount += Number(this.stk_transfer_sales_inv_item_dtls.at(i).get("amount").value);
          this._Discount += Number(this.stk_transfer_sales_inv_item_dtls.at(i).get("discount_amt").value);
          this._TaxTotal += Number(this.stk_transfer_sales_inv_item_dtls.at(i).get("tax_amt").value);
          console.log(" total_amt: "+this.TotalAddition);
        }
        this.userForm.patchValue({grand_total: this.TotalAddition,item_total: this._Amount.toFixed(2),total_bill_amt: this.TotalAddition.toFixed(2),
          discount:this._Discount.toFixed(2), net_total: (this._Amount - this._Discount).toFixed(2),tax_total: this._TaxTotal.toFixed(2),
          final_bill_amt:this.TotalAddition.toFixed(2),payable_amt:this.TotalAddition.toFixed(2)});

      }

    _totalAmt:any
    discountAmt:any;
    amt:any;
    _taxAmt:any;
    calculateItemData(packingQty, ItemQty, price, matWt, PriceBasedOn, discount, discountBasedOn, taxrate, index)
    {
      if(PriceBasedOn == "Packing")
      {this.amt = price * packingQty}

      if(PriceBasedOn == "item")
      {this.amt = price * ItemQty}

      if(PriceBasedOn == "0")
      {this.amt = 0}   

      if(discountBasedOn == "Uom")
      {this.discountAmt = discount;}

      if(discountBasedOn == "%")
      {this.discountAmt =  this.amt * (discount / 100);}

      if(discountBasedOn == "0")
      {this.discountAmt = 0}

      let netAmt = this.amt - this.discountAmt;
      if(taxrate == 0)
      {this._taxAmt = 0;} 
      else
      {this._taxAmt = netAmt *(taxrate/100);}
      this._totalAmt = this._taxAmt + netAmt;
      this.stk_transfer_sales_inv_item_dtls.at(index).patchValue({amount: (Math.round(this.amt * 100) / 100).toFixed(2), 
        discount_amt:  (Math.round(this.discountAmt * 100) / 100).toFixed(2), tax_amt: (Math.round(this._taxAmt * 100) / 100).toFixed(2), 
        total_amt: (Math.round(this._totalAmt * 100) / 100).toFixed(2)});
      
      for(let i=0; i<=this.stk_transfer_sales_inv_item_dtls.length; i++)
      {
        if(i == 0)
        {
          this.totalItem = 0;
          this.totalDiscount = 0;
          this.totalTaxAmt = 0;
        }
        else
        {
          this.amt = this.stk_transfer_sales_inv_item_dtls.at(i-1).get("amount").value as FormControl;
          this.totalItem = this.totalItem + this.amt;
          this.discountAmt = this.stk_transfer_sales_inv_item_dtls.at(i-1).get("discount_amt").value as FormControl;
          this.totalDiscount = this.totalDiscount + this.discountAmt;
          this._taxAmt = this.stk_transfer_sales_inv_item_dtls.at(i-1).get("tax_amt").value as FormControl;
          this.totalTaxAmt = this.totalTaxAmt + this._taxAmt;
          this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt, 
            this.appCharges, this.adj1, this.adj2, this.tcsAmt)
        }
      }
    }

    total_Bill_Amt:any;total_Discount_Amt:any;total_Tax_Amt:any;applicable_Amt:any;
    Adj1:any;Adj2:any;tcs_Amt:any;

    calPayableAmount(event)
    {
      this.total_Bill_Amt = this.userForm.get("total_bill_amt").value as FormControl;
      this.total_Discount_Amt = this.userForm.get("discount").value as FormControl;
      this.total_Tax_Amt = this.userForm.get("tax_total").value as FormControl;
     // this.applicable_Amt = this.userForm.get("applicable_amt").value as FormControl; 
      this.appCharges = parseFloat(event.target.value); 
      this.Adj1 = this.userForm.get("adj1_amt").value as FormControl;
      this.Adj2 = this.userForm.get("adj2_amt").value as FormControl;
      this.tcs_Amt = this.userForm.get("tcsamt").value as FormControl;

    
      this.calculateFinalBillAmt(this.total_Bill_Amt, this.total_Discount_Amt, this.total_Tax_Amt,
        this.appCharges, this.Adj1, this.Adj2, this.tcs_Amt)
    }

    getApplicableCharges(event)
    {

      this.appCharges = parseFloat(event.target.value);
      this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
        this.appCharges, this.adj1, this.adj2, this.tcsAmt)
    }

    getAdj1(event)
    {
      this.adj1 = parseFloat(event.target.value);
      this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
        this.appCharges, this.adj1, this.adj2, this.tcsAmt)
    }

    getAdj2(event)
    {
      this.adj2 = parseFloat(event.target.value);
      this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
        this.appCharges, this.adj1, this.adj2, this.tcsAmt)
    }

    getTcs(event)
    {
      this.tcsAmt = parseFloat(event.target.value);
      this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
        this.appCharges, this.adj1, this.adj2, this.tcsAmt)
    }

    _netAmt:number;
    calculateFinalBillAmt(amt:number, dscAmt:number, taxAmt:number, appCharges:number, adj1:number, adj2:number, tcs:number)
    {
      this._netAmt   = amt - dscAmt;
      this._totalAmt = amt + taxAmt - dscAmt;
      let finalBillamount = this._totalAmt + appCharges + adj1 - adj2;
      this.userForm.patchValue({item_total: (Math.round(amt * 100)/100).toFixed(2),
        discount: (Math.round(dscAmt * 100)/100).toFixed(2), net_total: (Math.round(this._netAmt * 100)/100).toFixed(2),
        tax_total: (Math.round(taxAmt * 100)/100).toFixed(2), total_bill_amt: (Math.round(this._totalAmt * 100)/100).toFixed(2), 
        grand_total: (Math.round(this._totalAmt * 1000)/1000).toFixed(3)});
      
      this.calRoundOfFigure(finalBillamount, tcs);
    }

    calRoundOfFigure(finalBillamount:number, tcs:number)
    {
      let roundOfAmt = Math.round(finalBillamount * 100) % 100;
      if(roundOfAmt >= 50)
      {
        roundOfAmt = 100 - roundOfAmt;
        this.userForm.patchValue({roundoff_amt: (roundOfAmt)/100, final_bill_amt: Math.round(finalBillamount).toFixed(2), payable_amt: Math.round(finalBillamount + tcs).toFixed(2)})
      }
      else
      {this.userForm.patchValue({roundoff_amt: (0 - roundOfAmt)/100, final_bill_amt: Math.round(finalBillamount).toFixed(2), payable_amt: Math.round(finalBillamount + tcs).toFixed(2)})};
    }

    addItem()
    {
      this.item_sl_no = this.item_sl_no + 1;
      this.stk_transfer_sales_inv_item_dtls.push(this.fb.group({
        slno: this.item_sl_no,
        item_code:'',
        item_group:'',
        packing:'',
        hsn_code:'',
        quantity:'',
        uom:'',
        squantity:'',
        suom:'',
        mat_wt:'',
        price:'',
        price_based_on:'',
        amount:'',
        discount_type:'',
        discount_rate:'',
        discount_amt: '',
        tax_code:'',
        tax_rate: '',
        tax_amt:'',
        total_amt:'',
        acc_norms:''}))
      this.stk_transfer_sales_inv_item_dtls.at(this.item_sl_no - 1).patchValue({item_code: "0", quantity: 0,
        squantity: 0, mat_wt: 0, price: 0, price_based_on: "0", amount: 0, discount_type: "0", 
        discount_rate: 0, discount_amt: 0, tax_rate: 0, tax_amt: 0, total_amt: 0});
    }

    addItemGrpHsn()
    { 
     this.stocksaleitem_groupwise_hsnsumm.push(this.fb.group({
       hsn_code:'',
       amount:'',
     }))
    }

    addItemGrp()
    { 
     this.stocksaleitem_groupwise_summ.push(this.fb.group({
       item_group:'',
       item_total:'',
       discount_amt:'',
       item_ledger:'',
       discount_ledger:''
     }))
    }
    addItemGrpTax()
    { 
     this.stocksaleitem_groupwise_taxsumm.push(this.fb.group({
       tax_code:'',
       tax_rate:'',
       tax_amt:'',
       percentage:'',
       cgst:'',
       sgst:'',
       igst:'',
       cgstledgerid:'',
       sgstledgerid:'',
       igstledgerid:'',
       taxable_amt:''
     }))
    }

    deleteItem(index) 
    {
      if(this.item_sl_no > 1)
      { 
        this.amt = this.stk_transfer_sales_inv_item_dtls.at(index).get("amount").value as FormControl;
        this._discount = this.stk_transfer_sales_inv_item_dtls.at(index).get("discount_amt").value as FormControl;
        this._taxAmt = this.stk_transfer_sales_inv_item_dtls.at(index).get("tax_amt").value as FormControl;
        this.grandTotal = this.grandTotal - (this.amt + this._taxAmt - this._discount);
        this.totalItem = this.totalItem - this.amt;
        this.totalDiscount = this.totalDiscount - this._discount;
        this.totalTaxAmt =  this.totalTaxAmt - this._taxAmt;
        this.packingItem.splice(index, 1);
        this.capacity.splice(index, 1);
       // this.empty_bag_wt(index, 1)
        this.stk_transfer_sales_inv_item_dtls.removeAt(index);
        this.item_sl_no = this.item_sl_no - 1;
      }
      else
      {
        this.item_sl_no = 1;
        alert("can't delete all rows");
        this.stk_transfer_sales_inv_item_dtls.reset();
        this.stk_transfer_sales_inv_item_dtls.at(0).patchValue({slno:  this.item_sl_no});
        this.totalItem = 0;
        this.totalDiscount = 0;
        this.totalTaxAmt = 0;
        this.appCharges = 0;
        this.adj1 = 0;
        this.adj2 = 0;
        this.tcsAmt = 0;
        // this.userForm.patchValue({grand_total: 0.00, item_total: 0, discount: 0,
        //   net_total: 0, tax_total: 0, total_bill_amt: 0, applicable_amt: 0,
        //   adj1_amt: 0, adj2_amt: 0, roundoff_amt: 0, final_bill_amt: 0, tcsamt: 0,payable_amt: 0 })
        
        this.stk_transfer_sales_inv_item_dtls.at(this.item_sl_no - 1).patchValue({squantity: 0, quantity: 0,
          mat_wt: 0, price: 0, price_based_on: "0", discount_rate: 0, discount_type: "0", 
          tax_rate: 0, amount: 0.00, discount_amt: 0.00, tax_amt: 0.00});
      } 
      for(let i=1; i<=this.item_sl_no; i++)
        this.stk_transfer_sales_inv_item_dtls.at(i-1).patchValue({slno: i});
      
    }

    addTransporter()
    {
      this.transporter_sl_no = this.transporter_sl_no + 1;
      this.stk_transfer_sales_inv_trans_dtls.push(this.fb.group({
        slno: this.transporter_sl_no,
        transname: '',	
        vehicletype: '',	
        vehicleno: '',	
        ewaybillno: '',
        ewaybilldate: '', }))
    }

    deleteTransporter(index) 
    {
      if(this.transporter_sl_no > 1)
      { 
        this.stk_transfer_sales_inv_trans_dtls.removeAt(index);
        this.transporter_sl_no = this.transporter_sl_no - 1;
      }
      else
      {
        this.transporter_sl_no = 1;
        alert("can't delete all rows");
        this.stk_transfer_sales_inv_trans_dtls.reset();
        this.stk_transfer_sales_inv_trans_dtls.at(0).patchValue({slno: this.transporter_sl_no});
      } 
      
      for(let i=1; i<=this.transporter_sl_no; i++)
        this.stk_transfer_sales_inv_trans_dtls.at(i-1).patchValue({slno: i});     
    }

    addDocument()
    {
      this.stk_transfer_sales_inv_docs.push(this.fb.group({
        doc_name:'' }))
    }

    deleteDocument(index)
    {
      if(index)
      { this.stk_transfer_sales_inv_docs.removeAt(index);}
      else
      {
        alert("Can not delete all rows");
        this.stk_transfer_sales_inv_docs.reset();
      } 
    }

    showList(s:string)
    {
      if(this.stocktransfersalesinvoicesave == true  && this.stocktransfersalesinvoiceupdate == true)//true exist  false not exist 
      {
        if(s=="add")
         { this.isHidden=true;}
      }
      if(this.stocktransfersalesinvoicesave == true  && this.stocktransfersalesinvoiceupdate == false)
      {
        if(s=="add")
          { this.isHidden=true;}
      }
      
      if(s=="list")
      {
        this.isHidden=false;
        this.stocktransfersalesinvoicesave=true;
        this.userForm.reset();
        //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');

        this.item_sl_no = 0;
          while (this.stk_transfer_sales_inv_item_dtls.length) 
          { this.stk_transfer_sales_inv_item_dtls.removeAt(0);}
		    this.addItem();

        this.transporter_sl_no=0;
        while (this.stk_transfer_sales_inv_trans_dtls.length) 
          this.stk_transfer_sales_inv_trans_dtls.removeAt(0);
          this.addTransporter();
      }
    }

    showPopUp(index)
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index};

      const dialogRef = this.dialog.open(StockTaxPopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => 
      {
        this.stk_transfer_sales_inv_item_dtls.at(index).patchValue({tax_code: data["tax_id"], tax_rate: data["tax_rate"]});
        this._packing_qty = this.stk_transfer_sales_inv_item_dtls.at(index).get("squantity").value as FormControl;
        this._item_qty = this.stk_transfer_sales_inv_item_dtls.at(index).get("quantity").value as FormControl;
        this._mrp = this.stk_transfer_sales_inv_item_dtls.at(index).get("price").value as FormControl;
        this._mat_weight = this.stk_transfer_sales_inv_item_dtls.at(index).get("mat_wt").value as FormControl;
        this._priceBasedOn = this.stk_transfer_sales_inv_item_dtls.at(index).get('price_based_on').value as FormControl;
        this._discount = this.stk_transfer_sales_inv_item_dtls.at(index).get('discount_rate').value as FormControl;
        this._discountBasadOn = this.stk_transfer_sales_inv_item_dtls.at(index).get('discount_type').value as FormControl;
        this._taxrate =  data["tax_rate"];
        this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight, 
          this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
      }); 
    }

    showPopUp2(index)
    {
      this.itemId = this.stk_transfer_sales_inv_item_dtls.at(index).get('item_code').value as FormControl;    
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index, item_code: this.itemId};
      const dialogRef = this.dialog.open(StockQcPopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe( data => 
      {
        this.stk_transfer_sales_inv_item_dtls.at(index).patchValue({acc_norms: data["qc_code"],});
      }); 
    }
   
   
    Tax_Amt:any;
    ItemGr=[];
    Tax_Rate:any;
    TaxCode=[];
    TaxRate=[];
    HsnCode=[];
    StateName:any;
    NewItemGrp:any=[];
    TaxCodee:any;
    Percentage:any;
    TcsAmt:any;
    openStkTransChallanPopUp()
    {
       if(this._businessunit != '0')
      {
        this.Id=this.userForm.get("id").value;
      // console.log("tuhin here12345stewtrw :: "+this.Id)
        if(this.Id == null || this.Id =='')
        {
          this.Id=0;
        //  console.log("tuhin here12345 :: "+this.Id)
        }
//challan//Multiple
        if(this.userForm.get("challan").value == 'Multiple')
        {
          //multiple
              const dialogRef = this.dialog.open(StocktransfersalesinvoicemultiplechallanComponent, {data:{bussinessUnit_id: this._businessunit,  date: this.currentDate,id:this.Id}});
              dialogRef.afterClosed().subscribe(data => 
              {
                if(data["stk_challan_id"] != "0" && data["stk_challan_id"] != '' && data["stk_challan_id"] != undefined)
                {
                  this.totalItem = 0;
                  this.totalDiscount = 0;
                  this.totalTaxAmt = 0;
                  

                  if(this.userForm.get("business_unit").value  == data["recieving_bu"])
                  {
                    this.StateName ="Yes";
                  }
                  else
                  {
                    this.StateName ="No";
                  }
                 // let splitval=data.alldeliveryid.toString().split(",");
                 let splitval=data["stk_challan_id"].toString().split(",");

                  let k = 0;
                  this.packingItem = [];
                  this.addItem();
                  this.item_sl_no = 0;
                  while(this.stk_transfer_sales_inv_item_dtls.length)
                  this.stk_transfer_sales_inv_item_dtls.removeAt(0);
      
                  for(let data1 of data.stk_challan__Item_Dtls)
                  {
                    if(data1.checkbox == true || data1.checkbox == 'true')
                    {
                      this.status = true;
                      forkJoin(
                      this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                      this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"],this.company_name),
                      this.DropDownListService.getItemNameById(data1["item_code"],this.company_name)
                      ).subscribe(([packingList, capacityEmptyWt,ItemGrp])=>
                      {
                        this.status = true;
                        this.capacity[k] = capacityEmptyWt.capacity;
                        this.empty_bag_wt[k] =  capacityEmptyWt.empty_big_wt;
                        this.packingItem[k] = packingList; 
                        this.addItem();
                        this.amt = data1["amount"];
                        this.totalItem = this.totalItem + this.amt;
                        this.totalDiscount = 0;
                        this._taxAmt = data1["tax_amt"];
                        this.totalTaxAmt = this.totalTaxAmt + this._taxAmt;
                        this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
                          this.appCharges, this.adj1, this.adj2, this.tcsAmt)
                        this.stk_transfer_sales_inv_item_dtls.at(k).patchValue(data1);

//starts here 
                          this.stk_transfer_sales_inv_item_dtls.at(k).patchValue({item_group:ItemGrp["item_group"],hsn_code:ItemGrp["hsn_code"]});
                          this.ItemGr.push(ItemGrp["item_group"]); 
                          this.TaxCode.push(data1["tax_code"]);
                          this.HsnCode.push(ItemGrp["hsn_code"]);
                          this.TaxRate.push(data1["tax_rate"]);



                          //starts here 

                              //for hsn
                              timer(2000).subscribe
                              (x=>
                              {
                                const distinctArrayHsnCode:any=[] = this.HsnCode.filter((n, i) => this.HsnCode.indexOf(n) === i);
                                console.log("distinctArrayHsnCode: "+distinctArrayHsnCode);
                                this.addItemGrpHsn();
                                while(this.stocksaleitem_groupwise_hsnsumm.length)
                                this.stocksaleitem_groupwise_hsnsumm.removeAt(0);
                                for (let j=0;j<distinctArrayHsnCode.length;j++) 
                                { 
                                  let DiscountAmt =0;
                                  for(let k = 0; k<this.stk_transfer_sales_inv_item_dtls.length; k++)   
                                    { 
                                      if(this.stk_transfer_sales_inv_item_dtls.at(k).get("hsn_code").value==distinctArrayHsnCode[j])
                                      {
                                        DiscountAmt+= this.stk_transfer_sales_inv_item_dtls.at(k).get("amount").value - this.stk_transfer_sales_inv_item_dtls.at(k).get("discount_amt").value;
                                        console.log("DiscountAmt:"+DiscountAmt);              
                                      }                    
                                    }                  
                                    this.addItemGrpHsn();
                                    console.log("hsn_code  :"+distinctArrayHsnCode[j]); // 1, "string", false
                                    this.stocksaleitem_groupwise_hsnsumm.at(j).patchValue({hsn_code:distinctArrayHsnCode[j],amount:DiscountAmt});
                                } 
                              }
                              )

                              timer(2500).subscribe
                              (x=>
                              {
                                  const distinctArray:any=[] = this.ItemGr.filter((n, i) => this.ItemGr.indexOf(n) === i);
                                  
                                  //let j=0
                                  this.addItemGrp();
                                  while(this.stocksaleitem_groupwise_summ.length)
                                  this.stocksaleitem_groupwise_summ.removeAt(0)            
                                  for (let j=0;j<distinctArray.length;j++) 
                                  { 
                                      let Amt =0;
                                      let Discount=0;

                                      for(let k = 0; k<this.stk_transfer_sales_inv_item_dtls.length; k++)   
                                        { 

                                          if(this.stk_transfer_sales_inv_item_dtls.at(k).get("item_group").value==distinctArray[j])
                                          {
                                            Amt+= this.stk_transfer_sales_inv_item_dtls.at(k).get("amount").value;
                                            Discount+=this.stk_transfer_sales_inv_item_dtls.at(k).get("discount_amt").value;
                                            console.log("Amt:"+Amt);   
                                            console.log("Discount : "+Discount);                    
                                          }                    
                                        }                  
                                      this.addItemGrp();
                                      console.log("Item  :"+distinctArray[j]); // 1, "string", false
                                      this.stocksaleitem_groupwise_summ.at(j).patchValue({item_group:distinctArray[j],item_total:Amt,discount_amt:Discount});
                                      
                                      forkJoin(        
                                        this.Service.getItemGroupSalesAcc(distinctArray[j]),
                                        ).subscribe(([ItemgrpLedger])=>
                                          {      
                                                this.stocksaleitem_groupwise_summ.at(j).patchValue({item_ledger:ItemgrpLedger.item_total,discount_ledger:ItemgrpLedger.discount});
                                              
                                            this.status = true;
                                          });
                                  }
                              }
                              ) 
                          
                              timer(3000).subscribe
                              (x=>
                              {
                                    //this.StateName =this.userForm.get("state").value;
                                    const distinctArrayTax:any=[] = this.TaxCode.filter((n, i) => this.TaxCode.indexOf(n) === i);
                            
                                    this.addItemGrpTax();
                                    while(this.stocksaleitem_groupwise_taxsumm.length)
                                    this.stocksaleitem_groupwise_taxsumm.removeAt(0)            
                                    for (let j=0;j<distinctArrayTax.length;j++) 
                                    { 
                                        let TaxRate =0;
                                        let TaxAmt=0;
                            
                                        for(let k = 0; k<this.stk_transfer_sales_inv_item_dtls.length; k++)   
                                        { 

                                          if(this.stk_transfer_sales_inv_item_dtls.at(k).get("tax_code").value==distinctArrayTax[j])
                                          {
                                              TaxRate= this.stk_transfer_sales_inv_item_dtls.at(k).get("tax_rate").value;
                                              TaxAmt+=this.stk_transfer_sales_inv_item_dtls.at(k).get("tax_amt").value;
                                          }                    
                                        }                  
                                        this.addItemGrpTax();
                                        this.stocksaleitem_groupwise_taxsumm.at(j).patchValue({tax_code:distinctArrayTax[j],tax_rate:TaxRate.toFixed(2),tax_amt:TaxAmt.toFixed(2)});
                                
                                        if(distinctArrayTax[j] !='' && distinctArrayTax[j] !=null)
                                        {
                                        forkJoin(        
                                          this.DropDownListService.getTaxCodeDetails(distinctArrayTax[j]),
                                          ).subscribe(([TaxData])=>
                                            {    
                                              
                                              if(TaxData)
                                              {
                                                this.stocksaleitem_groupwise_taxsumm.at(j).patchValue({percentage:TaxData.cgst,cgstledgerid:TaxData.cgst_output_ledger
                                                  ,sgstledgerid:TaxData.output_ledger,igstledgerid:TaxData.igst_output_ledger});
                                  
                                              this.status = true;
                                              
                                              this.Tax_Rate=this.stocksaleitem_groupwise_taxsumm.at(j).get("tax_rate").value;
                                              //this.StateName =this.userForm.get("state").value;               
                                              this.Tax_Amt=this.stocksaleitem_groupwise_taxsumm.at(j).get("tax_amt").value as FormControl;
                                  
                                  
                                              if(this.StateName=='Yes')
                                              {                         
                                                let  Cgst =(this.Tax_Amt*(TaxData.cgst/100));               
                                                let Sgst =(this.Tax_Amt - Cgst);
                                                this.stocksaleitem_groupwise_taxsumm.at(j).patchValue({igst:0, cgst: Cgst.toFixed(2), sgst: Sgst.toFixed(2)});
                                              }                  
                                              else
                                              {this.stocksaleitem_groupwise_taxsumm.at(j).patchValue({igst:this.Tax_Amt, cgst: 0, sgst: 0});}
                                            
                                
                                              const distinctArrayTaxRate:any=[] = this.TaxRate.filter((n, i) => this.TaxRate.indexOf(n) === i);
                                
                                              for (let j=0;j<distinctArrayTaxRate.length;j++) 
                                              { 
                                                let Amount=0;
                                                let DiscountAmt=0;
                                                let Taxable_Amnt=0;
                                      
                                                for(let k = 0; k<this.stk_transfer_sales_inv_item_dtls.length; k++)   
                                                { 
                                      
                                                  if(this.stk_transfer_sales_inv_item_dtls.at(k).get("tax_rate").value==distinctArrayTaxRate[j])
                                                  {
                                                    Amount+=this.stk_transfer_sales_inv_item_dtls.at(k).get("amount").value;
                                                    DiscountAmt+=this.stk_transfer_sales_inv_item_dtls.at(k).get("discount_amt").value;
                                                    Taxable_Amnt = Number(Amount.toFixed(2))-Number(DiscountAmt.toFixed(2));
                                                    console.log("Taxable_Amnt : " +Taxable_Amnt)  
                                                  // console.log("TaxDistAmount : " +Amount+ "..."+ "DiscountAmt : "+DiscountAmt)          
                                                  }
                                                }
                                                this.stocksaleitem_groupwise_taxsumm.at(j).patchValue({taxable_amt:Taxable_Amnt.toFixed(2)});
                                              }
                                              }
                                
                                              else
                                              {
                                                //.pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))
                                                alert("something error is happened");
                                              }       
                                            
                                            },(error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
                                            
                                          
                                          }); 
                                        }
                                      
                              
                                    }
                              })

                          //ends here                     





//ends here 
                        k = k + 1;
                        this.userForm.patchValue({grand_total:Number(this.userForm.get("grand_total").value).toFixed(2)})
                      })
                    }
                  }
      
                  this.status = false;
                  forkJoin(
                    this.DropDownListService.getMultipleStkTransChallanDtls(data["stk_challan_id"]),
                    this.DropDownListService.getStkTransChallanShipDtls(splitval[0]),
                    this.DropDownListService.getStkTransChallanDocs(data["stk_challan_id"]),
                    this.DropDownListService.getStkTransChallanTranInfos(data["stk_challan_id"]),
                    this.DropDownListService.getMultipleStkOrderDetails(data["stk_challan_id"]) 
                  ).subscribe(([challanDtls, shipmentData, docsData, transData,ordData])=>
                  {
                   // this.userForm.patchValue({grand_total: challanDtls["grand_total"], refchallanno: challanDtls["stk_challan_no"],
                      this.userForm.patchValue({refchallanno: challanDtls["stk_challan_no"],
                      refchallandate: challanDtls["stk_challan_date"], remarks: challanDtls["remark"]});
                 
                      
                     // this.userForm.patchValue({stk_sales_inv_order_no: ordData["cust_ref_doc_no"], stk_sales_inv_order_date: ordData["reason"],stk_sales_mutlipledates:ordData["stk_challan_date"]});
                      this.userForm.patchValue({stk_sales_inv_order_no: ordData["cust_ref_doc_no"], 
                      stk_sales_inv_order_date: ordData["reason"],stk_sales_mutlipledates:ordData["stk_challan_date"],
                      refchallanno:ordData["stk_challan_no"],
                      refchallandate:ordData["remark"],
                      multiplechallandate:ordData["stk_challan_date2"] });



                    this.stk_transfer_sales_inv_shipment_dtls.patchValue({shipaddr: shipmentData["ship_addr"],
                      shipdtls: shipmentData["ship_details"], paytoaddr: shipmentData["pay_addr"], paytodtls: shipmentData["pay_details"]});
                  
                    let i = 0;
                    this.addTransporter();
                    this.transporter_sl_no = 0;
                    while(this.stk_transfer_sales_inv_trans_dtls.length)
                    this.stk_transfer_sales_inv_trans_dtls.removeAt(0);
                    for(let data1 of transData)
                    {
                      this.addTransporter();
                      this.stk_transfer_sales_inv_trans_dtls.at(i).patchValue(data1);
                      i = i + 1;
                    }
      
                    if(JSON.stringify(docsData) == '[]')//for null
                    {
                       
                      
                    }
                     else
                     {
                       this.addDocument();
                       while(this.stk_transfer_sales_inv_docs.length)
                       this.stk_transfer_sales_inv_docs.removeAt(0);
                       for(let data of docsData)
                       this.addDocument();
                       this.stk_transfer_sales_inv_docs.patchValue(docsData);
                     }

                    // this.addDocument();
                    // while(this.stk_transfer_sales_inv_docs.length)
                    // this.stk_transfer_sales_inv_docs.removeAt(0);
                    // for(let data of docsData)
                    // this.addDocument();
                    // this.stk_transfer_sales_inv_docs.patchValue(docsData);
      
                    this.status = true;
                  })
                  this.userForm.patchValue({reference_id: data["stk_challan_id"]});
                }
              });









        }
        else if(this.userForm.get("challan").value == 'Single')//single
        {

          const dialogRef = this.dialog.open(StockTransferChallanPopUpComponent, {data:{bussinessUnit_id: this._businessunit, file_name: "stock_transfer_sales_invoice", date: this.currentDate,id:this.Id}});
          dialogRef.afterClosed().subscribe(data => 
          {
            if(data["stk_challan_id"] != "0" && data["stk_challan_id"] != '' && data["stk_challan_id"] != undefined)
            {
              this.totalItem = 0;
              this.totalDiscount = 0;
              this.totalTaxAmt = 0;
              if(this.userForm.get("business_unit").value  == data["recieving_bu"])
              {
                this.StateName ="Yes";
              }
              else
              {
                this.StateName ="No";
              }
              let k = 0;
              this.packingItem = [];
              this.addItem();
              this.item_sl_no = 0;
              while(this.stk_transfer_sales_inv_item_dtls.length)
              this.stk_transfer_sales_inv_item_dtls.removeAt(0);
  
              for(let data1 of data.stk_challan__Item_Dtls)
              {
                if(data1.checkbox == true)
                {
                  this.status = true;
                  forkJoin(
                  this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                  this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"],this.company_name),
                  this.DropDownListService.getItemNameById(data1["item_code"],this.company_name)
                 
                  ).subscribe(([packingList, capacityEmptyWt,ItemGrp])=>
                  {
                    this.status = true;
                    this.capacity[k] = capacityEmptyWt.capacity;
                    this.empty_bag_wt[k] =  capacityEmptyWt.empty_big_wt;
                    this.packingItem[k] = packingList; 
                    this.addItem();
                    this.amt = data1["amount"];
                    this.totalItem = this.totalItem + this.amt;
                    this.totalDiscount = 0;
                    this._taxAmt = data1["tax_amt"];
                    this.totalTaxAmt = this.totalTaxAmt + this._taxAmt;
                    this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
                      this.appCharges, this.adj1, this.adj2, this.tcsAmt)

                      this.stk_transfer_sales_inv_item_dtls.at(k).patchValue(data1);
                    this.stk_transfer_sales_inv_item_dtls.at(k).patchValue({item_group:ItemGrp["item_group"],hsn_code:ItemGrp["hsn_code"]});
                    this.ItemGr.push(ItemGrp["item_group"]); 
                    this.TaxCode.push(data1["tax_code"]);
                    this.HsnCode.push(ItemGrp["hsn_code"]);
                    this.TaxRate.push(data1["tax_rate"]);



//starts here 

                         //for hsn
                         timer(2000).subscribe
                         (x=>
                         {
                           const distinctArrayHsnCode:any=[] = this.HsnCode.filter((n, i) => this.HsnCode.indexOf(n) === i);
                           console.log("distinctArrayHsnCode: "+distinctArrayHsnCode);
                           this.addItemGrpHsn();
                           while(this.stocksaleitem_groupwise_hsnsumm.length)
                           this.stocksaleitem_groupwise_hsnsumm.removeAt(0);
                           for (let j=0;j<distinctArrayHsnCode.length;j++) 
                           { 
                             let DiscountAmt =0;
                             for(let k = 0; k<this.stk_transfer_sales_inv_item_dtls.length; k++)   
                               { 
                                 if(this.stk_transfer_sales_inv_item_dtls.at(k).get("hsn_code").value==distinctArrayHsnCode[j])
                                 {
                                   DiscountAmt+= this.stk_transfer_sales_inv_item_dtls.at(k).get("amount").value - this.stk_transfer_sales_inv_item_dtls.at(k).get("discount_amt").value;
                                   console.log("DiscountAmt:"+DiscountAmt);              
                                 }                    
                               }                  
                               this.addItemGrpHsn();
                               console.log("hsn_code  :"+distinctArrayHsnCode[j]); // 1, "string", false
                               this.stocksaleitem_groupwise_hsnsumm.at(j).patchValue({hsn_code:distinctArrayHsnCode[j],amount:DiscountAmt});
                           } 
                         }
                         )

                         timer(2500).subscribe
                         (x=>
                         {
                             const distinctArray:any=[] = this.ItemGr.filter((n, i) => this.ItemGr.indexOf(n) === i);
                             
                             //let j=0
                             this.addItemGrp();
                             while(this.stocksaleitem_groupwise_summ.length)
                             this.stocksaleitem_groupwise_summ.removeAt(0)            
                             for (let j=0;j<distinctArray.length;j++) 
                             { 
                                 let Amt =0;
                                 let Discount=0;
                 
                                 for(let k = 0; k<this.stk_transfer_sales_inv_item_dtls.length; k++)   
                                   { 
                 
                                     if(this.stk_transfer_sales_inv_item_dtls.at(k).get("item_group").value==distinctArray[j])
                                     {
                                       Amt+= this.stk_transfer_sales_inv_item_dtls.at(k).get("amount").value;
                                       Discount+=this.stk_transfer_sales_inv_item_dtls.at(k).get("discount_amt").value;
                                       console.log("Amt:"+Amt);   
                                       console.log("Discount : "+Discount);                    
                                     }                    
                                   }                  
                                 this.addItemGrp();
                                 console.log("Item  :"+distinctArray[j]); // 1, "string", false
                                 this.stocksaleitem_groupwise_summ.at(j).patchValue({item_group:distinctArray[j],item_total:Amt,discount_amt:Discount});
                                 
                                 forkJoin(        
                                   this.Service.getItemGroupSalesAcc(distinctArray[j]),
                                   ).subscribe(([ItemgrpLedger])=>
                                     {      
                                           this.stocksaleitem_groupwise_summ.at(j).patchValue({item_ledger:ItemgrpLedger.item_total,discount_ledger:ItemgrpLedger.discount});
                                         
                                       this.status = true;
                                     });
                             }
                         }
                         ) 
                     
                         timer(3000).subscribe
                         (x=>
                         {
                               //this.StateName =this.userForm.get("state").value;
                               const distinctArrayTax:any=[] = this.TaxCode.filter((n, i) => this.TaxCode.indexOf(n) === i);
                       
                               this.addItemGrpTax();
                               while(this.stocksaleitem_groupwise_taxsumm.length)
                               this.stocksaleitem_groupwise_taxsumm.removeAt(0)            
                               for (let j=0;j<distinctArrayTax.length;j++) 
                               { 
                                   let TaxRate =0;
                                   let TaxAmt=0;
                       
                                   for(let k = 0; k<this.stk_transfer_sales_inv_item_dtls.length; k++)   
                                   { 
               
                                     if(this.stk_transfer_sales_inv_item_dtls.at(k).get("tax_code").value==distinctArrayTax[j])
                                     {
                                         TaxRate= this.stk_transfer_sales_inv_item_dtls.at(k).get("tax_rate").value;
                                         TaxAmt+=this.stk_transfer_sales_inv_item_dtls.at(k).get("tax_amt").value;
                                     }                    
                                   }                  
                                   this.addItemGrpTax();
                                   this.stocksaleitem_groupwise_taxsumm.at(j).patchValue({tax_code:distinctArrayTax[j],tax_rate:TaxRate.toFixed(2),tax_amt:TaxAmt.toFixed(2)});
                           
                                   if(distinctArrayTax[j] !='' && distinctArrayTax[j] !=null)
                                   {
                                   forkJoin(        
                                     this.DropDownListService.getTaxCodeDetails(distinctArrayTax[j]),
                                     ).subscribe(([TaxData])=>
                                       {    
                                         
                                         if(TaxData)
                                         {
                                           this.stocksaleitem_groupwise_taxsumm.at(j).patchValue({percentage:TaxData.cgst,cgstledgerid:TaxData.cgst_output_ledger
                                             ,sgstledgerid:TaxData.output_ledger,igstledgerid:TaxData.igst_output_ledger});
                             
                                         this.status = true;
                                         
                                         this.Tax_Rate=this.stocksaleitem_groupwise_taxsumm.at(j).get("tax_rate").value;
                                         //this.StateName =this.userForm.get("state").value;               
                                         this.Tax_Amt=this.stocksaleitem_groupwise_taxsumm.at(j).get("tax_amt").value as FormControl;
                             
                             
                                         if(this.StateName=='Yes')
                                         {                         
                                           let  Cgst =(this.Tax_Amt*(TaxData.cgst/100));               
                                           let Sgst =(this.Tax_Amt - Cgst);
                                           this.stocksaleitem_groupwise_taxsumm.at(j).patchValue({igst:0, cgst: Cgst.toFixed(2), sgst: Sgst.toFixed(2)});
                                         }                  
                                         else
                                         {this.stocksaleitem_groupwise_taxsumm.at(j).patchValue({igst:this.Tax_Amt, cgst: 0, sgst: 0});}
                                       
                           
                                         const distinctArrayTaxRate:any=[] = this.TaxRate.filter((n, i) => this.TaxRate.indexOf(n) === i);
                           
                                         for (let j=0;j<distinctArrayTaxRate.length;j++) 
                                         { 
                                           let Amount=0;
                                           let DiscountAmt=0;
                                           let Taxable_Amnt=0;
                                 
                                           for(let k = 0; k<this.stk_transfer_sales_inv_item_dtls.length; k++)   
                                           { 
                                 
                                             if(this.stk_transfer_sales_inv_item_dtls.at(k).get("tax_rate").value==distinctArrayTaxRate[j])
                                             {
                                               Amount+=this.stk_transfer_sales_inv_item_dtls.at(k).get("amount").value;
                                               DiscountAmt+=this.stk_transfer_sales_inv_item_dtls.at(k).get("discount_amt").value;
                                               Taxable_Amnt = Number(Amount.toFixed(2))-Number(DiscountAmt.toFixed(2));
                                               console.log("Taxable_Amnt : " +Taxable_Amnt)  
                                             // console.log("TaxDistAmount : " +Amount+ "..."+ "DiscountAmt : "+DiscountAmt)          
                                             }
                                           }
                                           this.stocksaleitem_groupwise_taxsumm.at(j).patchValue({taxable_amt:Taxable_Amnt.toFixed(2)});
                                         }
                                         }
                           
                                         else
                                         {
                                           //.pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))
                                           alert("something error is happened");
                                         }       
                                       
                                       },(error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
                                       
                                     
                                     }); 
                                   }
                                 
                         
                               }
                         })

//ends here                     
                    k = k + 1;
                  })
                }
              }
  
              this.status = false;
              forkJoin(
                this.DropDownListService.getStkTransChallanDtls("stkchlnid="+data["stk_challan_id"]),
                this.DropDownListService.getStkTransChallanShipDtls(data["stk_challan_id"]),
                this.DropDownListService.getStkTransChallanDocs(data["stk_challan_id"]),
                this.DropDownListService.getStkTransChallanTranInfos(data["stk_challan_id"]),
                this.DropDownListService.getStkOrderDetails(data["stk_challan_id"])
              ).subscribe(([challanDtls, shipmentData, docsData, transData,ordData])=>
              {
                this.userForm.patchValue({grand_total: challanDtls["grand_total"], refchallanno: challanDtls["stk_challan_no"],
                  refchallandate: challanDtls["stk_challan_date"], remarks: challanDtls["remark"]});
                this.userForm.patchValue({stk_sales_inv_order_no: ordData["cust_ref_doc_no"], stk_sales_inv_order_date: ordData["stk_challan_date"]});
                if(ordData["ref_type"]=="Open Stock Transfer Challan")
                {
                  this.refTypeStatus=true;
                }
                this.stk_transfer_sales_inv_shipment_dtls.patchValue({shipaddr: shipmentData["ship_addr"],
                  shipdtls: shipmentData["ship_details"], paytoaddr: shipmentData["pay_addr"], paytodtls: shipmentData["pay_details"]});
               
                let i = 0;
                this.addTransporter();
                this.transporter_sl_no = 0;
                while(this.stk_transfer_sales_inv_trans_dtls.length)
                this.stk_transfer_sales_inv_trans_dtls.removeAt(0);
                for(let data1 of transData)
                {
                  this.addTransporter();
                  this.stk_transfer_sales_inv_trans_dtls.at(i).patchValue(data1);
                  i = i + 1;
                }
  
                this.addDocument();
                while(this.stk_transfer_sales_inv_docs.length)
                this.stk_transfer_sales_inv_docs.removeAt(0);
                for(let data of docsData)
                this.addDocument();
                this.stk_transfer_sales_inv_docs.patchValue(docsData);
  
                this.status = true;
              })
              this.userForm.patchValue({reference_id: data["stk_challan_id"]});
            }
          }); 
        }   
        else
        {
          alert("Please Select Challan ");
        }
       
      }
      else
      alert("Select Business Unit First!...");
    }

    onUpdate(id:any, stk_sales_invoice_id:string,action)
    {
      this.stocktransfersalesinvoicesave = true;
      this.userForm.patchValue({id: id});
      this.status = false;
      this.isHidden = true;
      this.packingItem = [];
      if(action == 'view')
      {
        this.stocktransfersalesinvoicesave=false;
      }
      if(action == 'update')
      {
        this.stocktransfersalesinvoicesave=true;
      }
      // this.selectedItemName = [];
      // this.selectedPackingItem = [];
  
      forkJoin(
        this.Service.getStkTransSalesInvById(id),
        this.Service.getStkTransSalesInvItemDtls(stk_sales_invoice_id),      
        this.Service.getStkTransSalesInvTransDtls(stk_sales_invoice_id),
        this.Service.getStkTransSalesInvBUDtls(stk_sales_invoice_id),
        this.Service.getStkTransSalesInvDocs(stk_sales_invoice_id),
        this.Service.getStkTransSalesInvShipDtls(stk_sales_invoice_id),
        this.Service.getStkTransSalesInvTaxInfo(stk_sales_invoice_id)
        //hsn 3 table api hasnt been made bcz there no update at this moment
      ).subscribe(([StkTransSalesIData, itemData,transData, 
          BuData,Docsdata,ShipmentData,TaxData])=>
        {
          this.currentDate = StkTransSalesIData["stk_challan_date"];
          //this.onChangeBusinessUnit(StkTransSalesIData["business_unit"]);
          this._businessunit=StkTransSalesIData["business_unit"];
          this.userForm.patchValue({id: StkTransSalesIData["id"],stk_sales_inv_id: StkTransSalesIData["stk_sales_inv_id"], stk_sales_inv_no: StkTransSalesIData["stk_sales_inv_no"], stk_sales_inv_date: StkTransSalesIData["stk_sales_inv_date"],
            stk_sales_inv_order_no: StkTransSalesIData["stk_sales_inv_order_no"], stk_sales_inv_order_date: StkTransSalesIData["stk_sales_inv_order_date"], challan: StkTransSalesIData["challan"],
            e_invoice_no: StkTransSalesIData["e_invoice_no"], refchallanno: StkTransSalesIData["refchallanno"], refchallandate: StkTransSalesIData["refchallandate"],
            item_total: StkTransSalesIData["item_total"], item_total_gl_ac: StkTransSalesIData["item_total_gl_ac"], discount: StkTransSalesIData["discount"],
            discount_gl_ac: StkTransSalesIData["discount_gl_ac"], net_total: StkTransSalesIData["net_total"], business_unit: StkTransSalesIData["business_unit"],
            net_total_gl_ac: StkTransSalesIData["net_total_gl_ac"], tax_total: StkTransSalesIData["tax_total"], tax_total_gl_ac: StkTransSalesIData["tax_total_gl_ac"], total_bill_amt: StkTransSalesIData["total_bill_amt"],       
            total_bill_amt_gl_ac: StkTransSalesIData["total_bill_amt_gl_ac"], applicable_amt: StkTransSalesIData["applicable_amt"], applicable_gl_ac: StkTransSalesIData["applicable_gl_ac"],
            adj1_amt: StkTransSalesIData["adj1_amt"], adj1_gl_ac: StkTransSalesIData["adj1_gl_ac"], adj2_amt: StkTransSalesIData["adj2_amt"],final_bill_amt: StkTransSalesIData["final_bill_amt"],
            adj2_gl_ac: StkTransSalesIData["adj2_gl_ac"], roundoff_amt: StkTransSalesIData["roundoff_amt"], roundoff_gl_ac: StkTransSalesIData["roundoff_gl_ac"], 
            final_bill_amt_gl_ac: StkTransSalesIData["final_bill_amt_gl_ac"], payable_amt: StkTransSalesIData["payable_amt"], payable_amt_gl_ac: StkTransSalesIData["payable_amt_gl_ac"],
            tcsamt: StkTransSalesIData["tcsamt"], tcsglac: StkTransSalesIData["tcsglac"], grand_total: StkTransSalesIData["grand_total"],remarks: StkTransSalesIData["remarks"],
            reference_id: StkTransSalesIData["reference_id"], company_id: StkTransSalesIData["company_id"], fin_year: StkTransSalesIData["fin_year"], username: StkTransSalesIData["username"],
            stk_sales_mutlipledates:StkTransSalesIData["stk_sales_mutlipledates"],multiplechallandate:StkTransSalesIData["multiplechallandate"]});
           // console.log("order Details: "+  JSON.stringify(StkTransSalesIData));
          
          let k = 0;
          this.addItem();
          this.item_sl_no = 0;
          while (this.stk_transfer_sales_inv_item_dtls.length) 
          { this.stk_transfer_sales_inv_item_dtls.removeAt(0);}
          for(let data1 of itemData)
          { 
            this.status = false;
            this.addItem();
            forkJoin(
              this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
              this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"],this.company_name)
            ).subscribe(([packingList, capacityEmptyWt])=>
              {
                this.status = true;
                this.capacity[k] = capacityEmptyWt.capacity;
                this.empty_bag_wt[k] =  capacityEmptyWt.empty_big_wt;
                // this.selectedPackingItem[k] = data1["packing"];
                // this.selectedItemName[k] = data1["item_code"];
                this.packingItem[k] = packingList; 
                this.stk_transfer_sales_inv_item_dtls.at(k).patchValue(data1);
                k = k + 1;
              });
            }

            //console.log("transData: "+  JSON.stringify(transData));
            while (this.stk_transfer_sales_inv_trans_dtls.length) 
            this.stk_transfer_sales_inv_trans_dtls.removeAt(0);
            for(let data1 of transData) 
            this.addTransporter();
            this.stk_transfer_sales_inv_trans_dtls.patchValue(transData);
      
           // console.log("BuData: "+  JSON.stringify(BuData));
            this.stk_transfer_sales_inv_bu_dtls.patchValue(BuData)
           
            //console.log("Docsdata: "+  JSON.stringify(Docsdata));
            while (this.stk_transfer_sales_inv_docs.length) 
            this.stk_transfer_sales_inv_docs.removeAt(0);
            for(let data1 of Docsdata) 
            this.addDocument();
            this.stk_transfer_sales_inv_docs.patchValue(Docsdata);

            //console.log("ShipmentData: "+  JSON.stringify(ShipmentData));
            this.stk_transfer_sales_inv_shipment_dtls.patchValue(ShipmentData);

            //console.log("TaxData: "+  JSON.stringify(TaxData));
            this.stk_transfer_sales_inv_tax_info.patchValue(TaxData);

            this.status = true;
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});                                
        }

    send()
    {     
      this.Id= this.userForm.get("id").value as FormControl;
      this.userForm.patchValue({
        company_id: localStorage.getItem("company_name"), fin_year:localStorage.getItem("financial_year"), 
        username: localStorage.getItem("username")});  
      this.submitted = true;
      if(!this.userForm.valid) 
      {
        alert('Please fill all fields!')
        return false;
      } 
      else 
      {
        this.status = false;
        if(this.userForm.get("business_unit").value == null || this.userForm.get("business_unit").value == 0)
        {
          alert("Please Select Business Unit");
          this.status=true;
        }
        else if(this.userForm.get("challan").value == null || this.userForm.get("challan").value == 0)
        {
          alert("Please Select Challan");
          this.status=true;
        }
        // else if(this.userForm.get("e_invoice_no").value == null || this.userForm.get("e_invoice_no").value == 0)
        // {
        //   alert("Please Enter E-Invoice No");
        //   this.status=true;
        // }
        else if(this.userForm.get("stk_sales_inv_order_no").value == null || this.userForm.get("stk_sales_inv_order_no").value == 0)
        {
          alert("Please Enter Stk Trans Order No");
          this.status=true;
        }
        else if(this.userForm.get("refchallanno").value == null || this.userForm.get("refchallanno").value == 0)
        {
          alert("Please Enter Ref Challan No");
          this.status=true;
        }
        else
        {
          let itemcheck = false;
          let packingcheck = false;
          let itemquantity = false;
          let packingquantity = false;
          let price = false;
          let pricebasedon = false;
          // let transname = false;
          // let vehtype = false;
          // let vehicle = false;

          for(let b=0;b<this.stk_transfer_sales_inv_item_dtls.length;b++)
          {
            if(this.stk_transfer_sales_inv_item_dtls.at(b).get("item_code").value == null || this.stk_transfer_sales_inv_item_dtls.at(b).get("item_code").value == 0)
            {
              itemcheck = true;
            }
            if(this.stk_transfer_sales_inv_item_dtls.at(b).get("packing").value == null || this.stk_transfer_sales_inv_item_dtls.at(b).get("packing").value == 0)
            {
              packingcheck = true;
            }
            if(this.stk_transfer_sales_inv_item_dtls.at(b).get("quantity").value == null || this.stk_transfer_sales_inv_item_dtls.at(b).get("quantity").value == 0)
            {
              itemquantity = true;
            }
            if(this.stk_transfer_sales_inv_item_dtls.at(b).get("squantity").value == null || this.stk_transfer_sales_inv_item_dtls.at(b).get("squantity").value == 0)
            {
              packingquantity = true;
            }
            if(this.stk_transfer_sales_inv_item_dtls.at(b).get("price").value == null || this.stk_transfer_sales_inv_item_dtls.at(b).get("price").value == 0)
            {
              price = true;
            }
            if(this.stk_transfer_sales_inv_item_dtls.at(b).get("price_based_on").value == null || this.stk_transfer_sales_inv_item_dtls.at(b).get("price_based_on").value == 0)
            {
              pricebasedon = true;
            }
          }
          // for(let w=0;w<this.stk_transfer_sales_inv_trans_dtls.length;w++)
          // {
          //   if(this.stk_transfer_sales_inv_trans_dtls.at(w).get("transname").value == null || this.stk_transfer_sales_inv_trans_dtls.at(w).get("transname").value == 0)
          //   {
          //     transname = true;
          //   }
          //   if(this.stk_transfer_sales_inv_trans_dtls.at(w).get("vehicletype").value == null || this.stk_transfer_sales_inv_trans_dtls.at(w).get("vehicletype").value == 0)
          //   {
          //     vehtype = true;
          //   }
          //   if(this.stk_transfer_sales_inv_trans_dtls.at(w).get("vehicleno").value == null || this.stk_transfer_sales_inv_trans_dtls.at(w).get("vehicleno").value == 0)
          //   {
          //     vehicle = true;
          //   }
          // }
          if(itemcheck == true)
          {
            alert("Please Select ITEM NAME in ITEM DETAILS Tab!!!");this.status = true;
          }
          else if(packingcheck == true)
          {
            alert("Please Select PACKING ITEM in ITEM DETAILS Tab!!!");this.status = true;
          }
          else if(packingquantity == true)
          {
            alert("Please Enter PACKING QTY in ITEM DETAILS Tab!!!");this.status = true;
          }
          else if(itemquantity == true)
          {
            alert("Please Enter ITEM QTY in ITEM DETAILS Tab!!!");this.status = true;
          }
          else if(price == true)
          {
            alert("Please Enter PRICE in ITEM DETAILS Tab!!!");this.status = true;
          }
          else if(pricebasedon == true)
          {
            alert("Please Select PRICE BASED ON in ITEM DETAILS Tab!!!");this.status = true;
          }
          else if(this.stk_transfer_sales_inv_tax_info.get("panno").value == null || this.stk_transfer_sales_inv_tax_info.get("panno").value == 0)
          {
            alert("Please Enter PAN No in Tax Information Tab!!!");this.status = true;
          }
          else if(this.stk_transfer_sales_inv_tax_info.get("gstno").value == null || this.stk_transfer_sales_inv_tax_info.get("gstno").value == 0)
          {
            alert("Please Enter GST No in Tax Information Tab!!!");this.status = true;
          }
          // else if(transname == true)
          // {
          //   alert("Please Select Transporter Name in Transporter Details Tab!!!");this.status = true;
          // }
          // else if(vehtype == true)
          // {
          //   alert("Please Select Vehicle Type in Transporter Details Tab!!!");this.status = true;
          // }
          // else if(vehicle == true)
          // {
          //   alert("Please Select Vehicle No. in Transporter Details Tab!!!");this.status = true;
          // }
          else
          {
            if(this.Id > 0)
            {
              const InputData = this.userForm.getRawValue(); 
                          console.log("input: "+JSON.stringify(InputData));
                          const frmData = new FormData();
                          console.log(" length "+this.myFiles.length);
                          for (let i = 0; i < this.myFiles.length; i++) {  
                          
                              frmData.append("files", this.myFiles[i]);   
                              console.log();
                            if (i == 0) {  
                              console.log(i+",files: "+this.myFiles[i])
                            }              
                          }  
                          frmData.append("Input update", JSON.stringify(InputData));
                          console.log("Form data: "+frmData);
             // this.Service.updateSalesInv(this.userForm.getRawValue(), this.Id).subscribe(data => 
              this.Service.updateSalesInv(frmData).subscribe(data => 
              {
                console.log(this.userForm.getRawValue());
                alert("Sales Invoice Updated successfully.");
                this.userForm.reset();
                this.ngOnInit();                     
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
              //this.ngOnInit()
            });     
            }
            else
            {
               this.Service.createStkTranSaleInv(this.userForm.getRawValue()).subscribe(data=> 
               {
                 console.log(this.userForm.getRawValue());
                 alert("Sales Invoice created successfully.");
                 this.userForm.reset();
                 this.ngOnInit();                      
               }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
              // this.ngOnInit()
              
              });      
            } 
          }
        }
      }
    }
    
    onFileSelected(e,i,tm)
    {
   
      this.myFiles.push(e.target.files[0]);//abc
  
      for(let v =0;v<this.myFiles.length; v++)//v hoache files array length
      {
      
        if(this.myFiles.length>tm.length)
        {
            if(v == i)//if size greater than 1
                {

                 this.myFiles[i]=e.target.files[0];
                  
                  this.myFiles.pop();

                }
        }
     
      }

     
    }

    onClickBillPrint(id,stk_sales_inv_id)
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = { index: 0,};
      let dialogref;
    
      dialogref=this.dialog.open(StockTransferSalesInvoiceAccountpostingComponent, {data:{id: id,stk_sales_inv_id:stk_sales_inv_id},height: '80%',
      width: '60%' } );
      dialogref.afterClosed().subscribe(data =>
      { 

      });
    }


    onDelete(id)
    {
      this.status=false;
      if(confirm("Are you sure to delete this Stock Transfer Sales Invoice ?"))
      {
      this.userForm.patchValue({username: localStorage.getItem("username")});
       this.Service.deleteStockTransferSalesInvoice(this.userForm.getRawValue(),id).subscribe(data=> 
            {
              alert("Stock Transfer Sales Invoice Deleted successfully.");
              this.userForm.reset();
              this.status = true;
              this.isHidden = false;
              this.ngOnInit();
              this.showList("list");
            }); 
      }
      this.status=true;
    }
    MainId:any;
    onClickBillPrintpage(id:any, invoice_id:string)
    {
        this.Service.getstockrecivingbuunit(id).subscribe(taxtype=> 
          {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.disableClose = true;
                dialogConfig.autoFocus = true;
               
                
                let Taxtype="";
                if(taxtype["business_unit"] == taxtype["business_unitname"])//taxtype["business_unit"] sending business unit //taxtype["business_unitname"] recieving business unit
                {
                  Taxtype="No";
                }
                else
                {
                  Taxtype="Yes";
                }
                dialogConfig.data = {MainId:id, InvoiceId:invoice_id,StateName:Taxtype,Party:taxtype["business_unitname"]};
                let dialogRef = this.dialog.open(StockTransferSaleInvoicePrintoptionComponent, dialogConfig);

                dialogRef.afterClosed().subscribe( data => 
                {
                  
                }); 
          
          });
    }

  }
