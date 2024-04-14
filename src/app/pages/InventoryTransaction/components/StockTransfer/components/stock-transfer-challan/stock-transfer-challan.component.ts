import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import { Master } from '../../../../../../service/master.service';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';
import { StockTransferChallan} from '../../../../../../models/StockTransfer/stock-transfer-challan';
import { StockQcPopupComponent } from '../stock-qc-popup/stock-qc-popup.component';
import { StockTaxPopupComponent } from '../stock-tax-popup/stock-tax-popup.component';
import { StkChallanStkTransferPopupComponent } from '../stk-challan-stk-transfer-popup/stk-challan-stk-transfer-popup.component';
import { StockTransferLoadingAdvicePopupComponent } from '../stock-transfer-loading-advice-popup/stock-transfer-loading-advice-popup.component';
import { forkJoin } from 'rxjs';
import { StockTransferChallanPrintPopUpComponent } from '../stock-transfer-challan-print-pop-up/stock-transfer-challan-print-pop-up.component';

  @Component({
    selector: 'app-stock-transfer-challan',
    templateUrl: './stock-transfer-challan.component.html',
    styleUrls: ['./stock-transfer-challan.component.scss']
  })

  export class StockTransferChallanComponent implements OnInit 
  {
    public userForm:FormGroup;
    model: StockTransferChallan = new StockTransferChallan();
    listStockTransferChallan: StockTransferChallan[];
    isHidden = false;
    submitted = false;
    packingItem:any=[];
    customUOMs:{};
    transBorneBy = 'Own Account';
    transCode:any;
    Business_Unit:any;
    status = false;
    selectedPackingItem:any = [];
    payTerms:any = [];
    bussiness_unit_list:any = [];
    reasonIdList: {};
    businesslists:any = [];
    item_codes:{};
    company_name:any;
    brokerNames:{};
    partyList:any=[];
    selectedItemName = [];
    contNameList:any=[];
    employeeNames:{};
    StkChallanId:any;
    trans_codes:{};
    item_sl_no = 1; 
    broker_sl_no = 1;
    seq_no:string;
    party_sl_no = 1;
    currentDate:any;
    challanNo:any;
    grandTotal = 0 ;
    veh_nos:any[];
    stocktransferchallansave:boolean = true;
    stocktransferchallanupdate:boolean = true;
    stocktransferchallanview:boolean = true;
    stocktransferchallandelete:boolean = true;
    checkRefType:boolean=false;
    delbusinesslists:any = [];
    receiving_bu_status:boolean=false;
    stocktransferchallanprint:boolean=true;


    constructor(public fb:FormBuilder, public dialog: MatDialog,
      private Service : Master,private DropDownListService: DropdownServiceService)
    {
      this.userForm=fb.group(
      { 
        id:[''],
        stk_challan_no:[''],
        stk_challan_id:[''],
        stk_challan_date:[''],
        cust_ref_doc_no:[''],
        stk_challan_date2:[''],
        remark:[''],
        confirmed_by:[''],
        approval:[''],
        reason :[''],  
        ref_type: [''],
        business_unit:[''],
        delivery_business_unit:[''],
        grand_total:[''],
        order_point:[''],
        billing_req:[''],
        passing_wt:[''],
        reference_id:[''],
        company_id: [''],
        fin_year: [''],
        username:[''],
        weighment_required:[''],
        vehicle_type:[''],
        

        stk_Transfer_Challan_Item_Dtls: this.fb.array([this.fb.group({
          slno:this.item_sl_no,
          item_code:'',
          packing:'',
          quantity:'',
          uom:'',
          squantity:'',
          suom:'',
          mat_wt:'',
          price:'',
          price_based_on:'',
          amount:'',
          tax_code:'',
          tax_rate: '',
          tax_amt:'',
          total_amt:'',
          acc_norms:'',
          cgst_amt:'',
          sgst_amt:'',
          igst_amt:''})]),
  
          stk_Transfer_Challan_BusinessUnit_Dtls:this.fb.array([this.fb.group({
          sl_no : this.party_sl_no, 
          business_unit:'',
          cp_name:'',
          cp_contact:''})]),

          stk_Transfer_Challan_Docs:this.fb.array([this.fb.group({
          doc_name:''})]),

          stk_Transfer_Challan_Shipment_Dtls:this.fb.group({
          ship_addr:'',
          ship_details:'',
          pay_addr:'',
          pay_details:'' }),

          stk_Transfer_Challan_Trans_Info:this.fb.group({
          trans_borne_by:this.transBorneBy,
          mode_of_trans:'',
          vehicle_no:'',
          freight_amt:'',
          adv_paid:'',
          charge_code:'',
          trans_code:'',
          payment_term:'',
          vehicle_id:''}),

          stk_Transfer_Challan_Weight_Dtl:this.fb.group({
          own_uom:'',
          own_gross:'',
          own_tare:'',
          own_net :'',
          eway_bill_no:'',
          own_date:'',
          own_slip_no:'',
         })
      });
    }

    get id() {return this.userForm.get("id") as FormControl};
    get stk_challan_id() {return this.userForm.get("stk_challan_id") as FormControl};
    get grand_total() {return this.userForm.get("grand_total") as FormControl};
    get weighment_required() {return this.userForm.get("weighment_required") as FormControl};
    get vehicle_type() {return this.userForm.get("vehicle_type") as FormControl}; 
    get stk_challan_date(){return this.userForm.get("stk_challan_date") as FormControl};
    get stk_challan_no(){return this.userForm.get("stk_challan_no") as FormControl};
    get price_term(){return this.userForm.get("price_term") as FormControl};
    get cust_ref_doc_no(){return this.userForm.get("cust_ref_doc_no") as FormControl};
    get stk_challan_date2(){return this.userForm.get("stk_challan_date2") as FormControl};
    get remark(){return this.userForm.get("remark") as FormControl};
    get confirmed_by(){return this.userForm.get("confirmed_by") as FormControl};
    get approval(){return this.userForm.get("approval") as FormControl};
    get order_point(){return this.userForm.get("order_point") as FormControl};
    get billing_req(){return this.userForm.get("billing_req") as FormControl};
    get passing_wt(){return this.userForm.get("passing_wt") as FormControl};
    get reference_id(){return this.userForm.get("reference_id") as FormControl};
    get reason(){return this.userForm.get("reason") as FormControl};
    get ref_type(){return this.userForm.get("ref_type") as FormControl};
    get business_unit() { return this.userForm.get("business_unit") as FormControl};
    get delivery_business_unit() { return this.userForm.get("delivery_business_unit") as FormControl};
    get stk_Transfer_Challan_Item_Dtls(){return this.userForm.get("stk_Transfer_Challan_Item_Dtls") as FormArray};
    get stk_Transfer_Challan_BusinessUnit_Dtls(){return this.userForm.get("stk_Transfer_Challan_BusinessUnit_Dtls") as FormArray};
    get stk_Transfer_Challan_Shipment_Dtls(){return this.userForm.get("stk_Transfer_Challan_Shipment_Dtls") as FormGroup};
    get stk_Transfer_Challan_Trans_Info(){return this.userForm.get("stk_Transfer_Challan_Trans_Info") as FormGroup};
    get stk_Transfer_Challan_Weight_Dtl(){return this.userForm.get("stk_Transfer_Challan_Weight_Dtl") as FormGroup};
    get stk_Transfer_Challan_Docs(){return this.userForm.get("stk_Transfer_Challan_Docs") as FormArray};
     
    ngOnInit()  
    {
       //For User Role
    let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
    this.stocktransferchallansave = false;
    this.stocktransferchallanupdate = false;
    this.stocktransferchallanview = false;
    this.stocktransferchallanprint = false;

    if(accessdata.includes('stock_transfer_challan.save'))
    {
     this.stocktransferchallansave = true;
    }
   if(accessdata.includes('stock_transfer_challan.update'))
    { 
      this.stocktransferchallanupdate=true;
    }
    if(accessdata.includes('stock_transfer_challan.view'))
    { 
      this.stocktransferchallanview=true;
    }
    if(accessdata.includes('stock_transfer_challan.delete'))
    { 
      this.stocktransferchallandelete=true;
    }
    if(accessdata.includes('stock_transfer_challan.print'))
    { 
      this.stocktransferchallanprint=true;
    }

      this.status = false;
      this.capacity = [];
      this.packingItem = [];
      this.empty_bag_wt = [];
      this.grandTotal = 0 ; 
      this.company_name = localStorage.getItem("company_name");
      //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      this.DropDownListService.reasonList().subscribe(data=>{this.reasonIdList = data}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
      this.DropDownListService.getVehicleThruWeighment().subscribe(vehicleData=>{this.veh_nos = vehicleData;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
      this.Service.getStockTransferChallans().subscribe(data=>{this.listStockTransferChallan  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
      this.DropDownListService.getCompanyBUMNCList(this.company_name).subscribe(data=>{this.bussiness_unit_list  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
      this.DropDownListService.itemNamesList().subscribe(data=>{this.item_codes = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});     
      this.DropDownListService.brokerNameList().subscribe(data=>{this.brokerNames = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
      this.DropDownListService.payTermNameList().subscribe(data=>{this.payTerms = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
      this.DropDownListService.customerNameCodeList(this.company_name).subscribe(data=>{this.partyList = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
      this.DropDownListService.transporterNamesList().subscribe(data=>{this.trans_codes = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});     
      this.DropDownListService.employeeNamesList(this.company_name).subscribe(data=>{this.employeeNames = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
      this.DropDownListService.getWeighmentCustomUOM().subscribe(data=>{this.customUOMs  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.DropDownListService.custometrBusList(this.company_name).subscribe(data=>{this.businesslists  = data; this.delbusinesslists = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
      this.status = true;
    }

    showList(s:string)
    {
      if(this.stocktransferchallansave == true  && this.stocktransferchallanupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.reset(this.ResetAllValues().value);
        }
      }
      if(this.stocktransferchallansave == true  && this.stocktransferchallanupdate == false)
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.reset(this.ResetAllValues().value);
        }
      }
     
      if(s=="list")
      {
        this.isHidden=false;
        this.stocktransferchallansave = true;
        this.userForm.reset(this.ResetAllValues().value);
        //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id:[''],
        stk_challan_no:[''],
        stk_challan_id:[''],
        stk_challan_date:[''],
        cust_ref_doc_no:[''],
        stk_challan_date2:[''],
        remark:[''],
        confirmed_by:[''],
        approval:[''],
        reason :[''],  
        ref_type: [''],
        business_unit:[''],
        delivery_business_unit:[''],
        grand_total:[''],
        order_point:[''],
        billing_req:[''],
        passing_wt:[''],
        reference_id:[''],
        company_id: [''],
        fin_year: [''],
        username:[''],
        weighment_required:[''],
        vehicle_type:[''],

        stk_Transfer_Challan_Item_Dtls: this.fb.array([this.fb.group({
          slno:this.item_sl_no,
          item_code:'',
          packing:'',
          quantity:'',
          uom:'',
          squantity:'',
          suom:'',
          mat_wt:'',
          price:'',
          price_based_on:'',
          amount:'',
          tax_code:'',
          tax_rate: '',
          tax_amt:'',
          total_amt:'',
          acc_norms:'',
          cgst_amt:'',
          sgst_amt:'',
          igst_amt:''})]),
  
          stk_Transfer_Challan_BusinessUnit_Dtls:this.fb.array([this.fb.group({
          sl_no : this.party_sl_no, 
          business_unit:'',
          cp_name:'',
          cp_contact:''})]),

          stk_Transfer_Challan_Docs:this.fb.array([this.fb.group({
          doc_name:''})]),

          stk_Transfer_Challan_Shipment_Dtls:this.fb.group({
          ship_addr:'',
          ship_details:'',
          pay_addr:'',
          pay_details:'' }),

          stk_Transfer_Challan_Trans_Info:this.fb.group({
          trans_borne_by:this.transBorneBy,
          mode_of_trans:'',
          vehicle_no:'',
          freight_amt:'',
          adv_paid:'',
          charge_code:'',
          trans_code:'',
          payment_term:'',
          vehicle_id:''}),

          stk_Transfer_Challan_Weight_Dtl:this.fb.group({
          own_uom:'',
          own_gross:'',
          own_tare:'',
          own_net :'',
          eway_bill_no:'',
          own_date:'',
          own_slip_no:'',
         })
      });
    }
    
    _total_amt:any
    addItem()
    {
      this.item_sl_no =this.item_sl_no +1;
      this.stk_Transfer_Challan_Item_Dtls.push(this.fb.group({
        slno:this.item_sl_no,
        item_code:'',
        packing:'',
        quantity:'',
        uom:'',
        squantity:'',
        suom:'',
        mat_wt:'',
        price:'',
        price_based_on:'',
        amount:'',
        tax_code:'',
        tax_rate: '',
        tax_amt:'',
        total_amt:'',
        acc_norms:'',
        cgst_amt:'',
        sgst_amt:'',
        igst_amt:''}))
    }

    deleteItem(index) 
    {
      if(this.item_sl_no > 1)
      { 
        this._total_amt = this.stk_Transfer_Challan_Item_Dtls.at(index).get("total_amt").value as FormControl;
        this.grandTotal = this.grandTotal - this._total_amt;
        this.userForm.patchValue({grand_total: this.grandTotal});
        this.stk_Transfer_Challan_Item_Dtls.removeAt(index);
        this.item_sl_no = this.item_sl_no - 1;
        this.packingItem[this.item_sl_no-2] = this.packingItem[this.item_sl_no-1];
      }
      else
      {
        this.item_sl_no = 1;
        this.grandTotal = 0 ;
        alert("can't delete all rows");
        this.stk_Transfer_Challan_Item_Dtls.reset();
        this.stk_Transfer_Challan_Item_Dtls.at(0).patchValue({slno:  this.item_sl_no});
        this.userForm.patchValue({grand_total: this.grandTotal});
      } 
      
      for(let i=1; i<=this.item_sl_no; i++)
        this.stk_Transfer_Challan_Item_Dtls.at(i-1).patchValue({slno: i});
      
    }

    addDocument()
    {
      this.stk_Transfer_Challan_Docs.push(this.fb.group({
        doc_name:'',
        }))
    }

    deleteDocument(index)
    {
      if(index)
      { this.stk_Transfer_Challan_Docs.removeAt(index);}
      else
      {
        alert("Can not delete all rows");
        this.stk_Transfer_Challan_Docs.reset();
      } 
    }
    addBusinessUnit()
    {
      this.party_sl_no=this.party_sl_no+1;
      this.stk_Transfer_Challan_BusinessUnit_Dtls.push(this.fb.group({
        sl_no : this.party_sl_no,  
        business_unit:'',
        cp_name:'',
        cp_contact:'' }))
    }

    deleteBusinessUnit(index) 
    {
      if(this.party_sl_no > 1)
      { 
        this.stk_Transfer_Challan_BusinessUnit_Dtls.removeAt(index);
        this.party_sl_no = this.party_sl_no - 1;
      }
      else
      {
        this.party_sl_no = 1;
        alert("can't delete all rows");
        this.stk_Transfer_Challan_BusinessUnit_Dtls.reset();
        this.stk_Transfer_Challan_BusinessUnit_Dtls.at(0).patchValue({sl_no:  this.party_sl_no});
      }     
      for(let i=1; i<=this.party_sl_no; i++)
        this.stk_Transfer_Challan_BusinessUnit_Dtls.at(i-1).patchValue({sl_no: i});   
    }

    capacity:any = [];
    calItemQty(packing_qty, index)
    {
      //let itemQty = this.capacity * packing_qty.target.value;
      let itemQty = this.capacity[index] * packing_qty.target.value;
      this.stk_Transfer_Challan_Item_Dtls.at(index).patchValue({quantity: itemQty, mat_wt: Number(itemQty - this.empty_bag_wt[index]).toFixed(2)});
    }

    onChangeItemName(index,event)
    {
      if(event)
      {
        this.status = false;
        this.DropDownListService.getItemNameById(event.target.value,this.company_name).subscribe(data=>
        {      
          this.DropDownListService.getUomName(data.mstock_unit).subscribe(data=>
          { this.stk_Transfer_Challan_Item_Dtls.at(index).patchValue({uom:data.description}); });
          
          this.DropDownListService.getItemMasterPackMat(event.target.value).subscribe(data1=>{   
           this.packingItem[index] = data1; });

          this.DropDownListService.retriveItemMasterStatInfo(event.target.value,this.company_name).subscribe(data=>{   
           this.stk_Transfer_Challan_Item_Dtls.at(index).patchValue({tax_code:data[0].tax_code, tax_rate:data[0].tax_rate}); });
    
          this.DropDownListService.getItemQCDetails(event.target.value,this.company_name).subscribe(data=>{   
           this.stk_Transfer_Challan_Item_Dtls.at(index).patchValue({acc_norms:data[0].qc_code}); });  
        });
        this.status = true;
      }
    }

    itemId: any;
    packingQty:any;
    empty_bag_wt:any = [];
    onChangePackingItem(index,event,)
    {
      if(event)
      {
        this.status = false;
        this.itemId =  this.stk_Transfer_Challan_Item_Dtls.at(index).get("item_code").value as FormControl;
        this.packingQty =  this.stk_Transfer_Challan_Item_Dtls.at(index).get("squantity").value as FormControl;
        this.DropDownListService.getItemPackUom(this.itemId, event.target.value,this.company_name).subscribe(data=>
        {  
          this.capacity[index] = data.capacity; 
          this.empty_bag_wt[index] = data.empty_big_wt;
          this.stk_Transfer_Challan_Item_Dtls.at(index).patchValue({suom: data.uom1, quantity: this.capacity * parseInt(this.packingQty)}); });
        this.status = true;
      }
    }

    _mrp:any;
    _taxrate:any;
    _netAmt:any;
    _item_qty:any;
    _packing_qty:any;
    _discount:any;
    _taxAmt:any;
    amt:any;
    onChangePriceBasedOn(price_based_on, index)
    {
      this._mrp = this.stk_Transfer_Challan_Item_Dtls.at(index).get("price").value as FormControl;
      this._taxrate = this.stk_Transfer_Challan_Item_Dtls.at(index).get('tax_rate').value as FormControl;
      if(price_based_on.target.value == "Packing")
      {
        this._packing_qty = this.stk_Transfer_Challan_Item_Dtls.at(index).get("squantity").value as FormControl;
        this.amt = this._mrp * this._packing_qty;
      }
      if(price_based_on.target.value == "Item")
      {
        this._item_qty = this.stk_Transfer_Challan_Item_Dtls.at(index).get("quantity").value as FormControl;
        this.amt = this._mrp * this._item_qty;
      }
      this._taxAmt = this.amt *(this._taxrate/100);
      this._total_amt = this._taxAmt + this.amt;
      this.stk_Transfer_Challan_Item_Dtls.at(index).patchValue({amount: this.amt, tax_amt:  this._taxAmt, total_amt: this._total_amt});
      this.calculateGrandTotal();
    }

    calculateGrandTotal()
    {
      this.grandTotal = 0;
      for(let i=0; i<=this.stk_Transfer_Challan_Item_Dtls.length; i++)
      {       
        this._total_amt = this.stk_Transfer_Challan_Item_Dtls.at(i).get("total_amt").value as FormControl;
       // console.log("this._total_amt:"+this._total_amt)
        this.grandTotal = this.grandTotal + this._total_amt;
        this.userForm.patchValue({grand_total: this.grandTotal});
      }
    }

     onChangeBusinessUnit(b_id:string)
     {
       this.Business_Unit = b_id;
       this.getStkChallantNo(this.currentDate,b_id)
      if(b_id != "0")
       {
         this.stk_Transfer_Challan_BusinessUnit_Dtls.at(0).patchValue({business_unit: b_id});
         this.onChangeBusinessUnitDtls(b_id, 0);
       }
     }

    onChangeorderpoint(order:string)
    { 
 
      if(this.userForm.get("business_unit").value != "0")
      {
        this.status = false;
        if(this.userForm.get("ref_type").value=='Open Stock Transfer Challan')
        {
          this.checkRefType=true;
          this.status = true;
        }
        //console.log(this.userForm.get("order_point").value)
       
        if(this.userForm.get("order_point").value == 'Intra')
        {
          this.userForm.patchValue({delivery_business_unit: this.userForm.get("business_unit").value});
          this.receiving_bu_status=true;
          this.DropDownListService.custometrBusList(this.company_name).subscribe(data=>
          {
            this.delbusinesslists = data;
            this.status = true;   
          });   
        }
        else if(this.userForm.get("order_point").value == 'Inter')
        {
          this.receiving_bu_status=false;
          this.DropDownListService.getCompBusinessUnitDiff(this.userForm.get("business_unit").value).subscribe(data=>
          {
            this.delbusinesslists = data;
            this.status = true;
          }); 
        }
        else{
          this.status=true;
        }
      
      }
    
    }

    onChangerefType(reftype:string)
    { 
      if(reftype=='Open Stock Transfer Challan')
      {
        this.userForm.patchValue({weighment_required:"No"});
        this.checkRefType=true;
      }
      else
      {
        this.checkRefType=false;
       // this.userForm.patchValue({delivery_business_unit: ''});
       if(this.userForm.get("id").value > 0)
       {

       }else
       {
         this.userForm.patchValue({delivery_business_unit: ''});
       }
      }
    }

    onChangeBusinessUnitDtls(b_id:string, index)
    {
      if(b_id != "0")
      {
        this.status = false;
        this.DropDownListService.getCompanyBUAddress(b_id).subscribe(data=>          
        {
          this.stk_Transfer_Challan_BusinessUnit_Dtls.at(0).patchValue({
            cp_name: data.sales_inhouse_responsibleperson,
            cp_contact: data.mobile_no});
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
          this.stk_Transfer_Challan_Shipment_Dtls.patchValue({ship_details: data["add"]});
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
          this.stk_Transfer_Challan_Shipment_Dtls.patchValue({pay_details: data["add"]});
          this.status = true;
        });
      }
    }

    onChangeStkChallanDate(challanDate)
    {
      this.currentDate = challanDate.target.value;
      if(this.Business_Unit != "")
      {this.getStkChallantNo(this.currentDate,this.Business_Unit)}
    }

    getStkChallantNo(challanDate, Business_Unit)
    {
      this.status = false;
      this.DropDownListService.getSTCSequenceId(challanDate, this.Business_Unit).subscribe(data=>
      {
        this.challanNo = data.sequenceid;
        this.status = true;
      });   
    }
    amt1:any;
    _mrp1:any;
    _taxrate1:any;
    _taxAmt1:any;
    _totalAmt1:any;
    _netAmt1:any;
    _item_qty1:any;
    _packing_qty1:any;

    showPopUp(index)
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index};

      const dialogRef = this.dialog.open(StockTaxPopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => 
      {
        this.stk_Transfer_Challan_Item_Dtls.at(index).patchValue({tax_id: data["tax_id"], tax_rate: data["tax_rate"],
        cgst_amt: data["cgst_act_val"],sgst_amt: data["sgst_act_val"],igst_amt: data["igst_act_val"]});

//starts here 

                  this._taxrate1 = this.stk_Transfer_Challan_Item_Dtls.at(index).get('tax_rate').value;
                  this._mrp1 = this.stk_Transfer_Challan_Item_Dtls.at(index).get("price").value;
//
                  if(this.stk_Transfer_Challan_Item_Dtls.at(index).get("price_based_on").value == "Packing")
                  {
                    this._packing_qty1 = this.stk_Transfer_Challan_Item_Dtls.at(index).get("squantity").value as FormControl;
                    this.amt1 = this._mrp1 * this._packing_qty1;
                  }

                  if(this.stk_Transfer_Challan_Item_Dtls.at(index).get("price_based_on").value == "Item")
                  {
                    this._item_qty1 = this.stk_Transfer_Challan_Item_Dtls.at(index).get("quantity").value as FormControl;
                    this.amt1 = this._mrp1 * this._item_qty1;
                  }
                  // if(this.userForm.get("order_point").value == 'Intra')
                  // this._taxAmt1 = 0;
                  // else
//new starts here 
                  if(this._taxrate1 == 0  || this.stk_Transfer_Challan_Item_Dtls.at(index).get("cgst_amt").value==null)
                  {
                    this._taxAmt1 = 0;
                  }  
                  else
                  {
            
                    let cgst_amt = this.stk_Transfer_Challan_Item_Dtls.at(index).get("cgst_amt").value;
                    let sgst_amt = this.stk_Transfer_Challan_Item_Dtls.at(index).get("sgst_amt").value;
                    let igst_amt = this.stk_Transfer_Challan_Item_Dtls.at(index).get("igst_amt").value;
            //console.log("cgst_amt:"+cgst_amt+"sgst_amt:"+sgst_amt+"igst_amt:"+igst_amt)
                    if( cgst_amt == 0 && sgst_amt == 0 && igst_amt == 0)
                    {
                      console.log("1")
                      this._taxAmt = 0;
                     // console.log("all gst 0"+this._taxAmt)
                    }
                    else if(cgst_amt == 0)//igst
                    {
                      console.log("2")
                      
                      this._taxAmt1 = Number(this.amt1 *(this._taxrate1/100)).toFixed(2);
                    }
                    else//cgst and sgst
                    {
                      console.log("3")
                    
                      let csgt_final=Number(this.amt1 *(cgst_amt/100)).toFixed(2);
                     
                      
                      let sgst_final=Number(this.amt1 *(sgst_amt/100)).toFixed(2);
                      this._taxAmt1 = Number(csgt_final)+ Number(sgst_final);
                      console.log(this._taxAmt1 + "  // " + Number(csgt_final)+ Number(sgst_final));
                    }
            
                  }

//new ends here 

                 // this._taxAmt1 = this.amt1 *(this._taxrate1/100);
                  this._totalAmt1 = this._taxAmt1 + this.amt1;
                  //this.stk_Transfer_Challan_Item_Dtls.at(index).patchValue({amount: this.amt1, tax_amt: this._taxAmt1, net_amt: this._totalAmt1, gross_amt: this._totalAmt1});
                  this.stk_Transfer_Challan_Item_Dtls.at(index).patchValue({amount: this.amt1, tax_amt: this._taxAmt1, total_amt: this._totalAmt1, gross_amt: this._totalAmt1});



                  let totalAmt = 0;
                  let totalTaxAmt = 0;
                  let totalNetAmt = 0;

                  for(let index=0; index<this.stk_Transfer_Challan_Item_Dtls.length; index++)
                  {
                    this.amt1 = this.stk_Transfer_Challan_Item_Dtls.at(index).get('amount').value as FormControl;
                    totalAmt = totalAmt + this.amt1;
                    this._taxAmt1 = this.stk_Transfer_Challan_Item_Dtls.at(index).get('tax_amt').value as FormControl;
                    totalTaxAmt = totalTaxAmt + this._taxAmt1;
                    //this._netAmt1 = this.stk_Transfer_Challan_Item_Dtls.at(index).get('net_amt').value as FormControl;
                    this._netAmt1 = this.stk_Transfer_Challan_Item_Dtls.at(index).get('total_amt').value as FormControl;
                    totalNetAmt = totalNetAmt + this._netAmt1;
                  }
                 
//ends here 
              this.userForm.patchValue({grand_total: this._netAmt1}); 
       
      }); 
    }

    showPopUp2(index)
    {
      this.itemId = this.stk_Transfer_Challan_Item_Dtls.at(index).get('item_code').value as FormControl;    
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index, item_code: this.itemId};
      const dialogRef = this.dialog.open(StockQcPopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe( data => 
      {
        this.stk_Transfer_Challan_Item_Dtls.at(index).patchValue({acc_norms: data["qc_code"],});
      }); 
    }

    loadingAdvId:any;
    reference_type:any;
    stockId:any;
    stockNo:any;
    show_Row = false;
    onClickShow()
    {
      this.reference_type=this.userForm.get("ref_type").value as FormControl;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.StkChallanId=this.userForm.get("id").value;
      console.log("tuhin here12345stewtrw :: "+this.StkChallanId)
      if(this.StkChallanId == null || this.StkChallanId =='')
      {
        this.StkChallanId=0;
        console.log("tuhin here12345 :: "+this.StkChallanId)
      }
      dialogConfig.data = {id:this.StkChallanId }; //from id
      if (this.reference_type=="Goods Stock Transfer")
      {
        const dialogRef = this.dialog.open(StkChallanStkTransferPopupComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data =>
        {
          if(data["order_id"] != "0" && data["order_id"] != '' && data["order_id"] != undefined)
          {
            this.receiving_bu_status=true;
              this.packingItem = [];
              let  k=0;
              this.item_sl_no = 0;
              this.grandTotal = 0;
              console.log("chk order no:"+data["order_no"])
              this.userForm.patchValue({grand_total: null}); 
              this.userForm.patchValue({reference_id: data["order_id"],delivery_business_unit:data["rcv_bu"]});

              while(this.stk_Transfer_Challan_Item_Dtls.length)
              this.stk_Transfer_Challan_Item_Dtls.removeAt(0); 
              this.stk_Transfer_Challan_Trans_Info.reset();

              for(let data1 of data.StkTransferDetail)
              {
                if(data1.checkbox == true || data1.checkbox == 'true')
                {
                  this.status = false;
                  //this.stockId = data["order_id"];
                  //this.stockNo = data["order_no"];
                  this.DropDownListService.getItemMasterPackMat(data1.item_code).subscribe(packingList=>
                  {  
                    this.status = true;
                    this.packingItem[k] = packingList; 
                    this.addItem();
                   //  console.log("data1::"+JSON.stringify(data1)) 
                    this.stk_Transfer_Challan_Item_Dtls.at(k).patchValue(
                    {
                      item_code: data1.item_code, packing: data1.packing, suom: data1.suom, mat_wt: Number(data1.mat_wt).toFixed(2),
                      squantity: data1.squantity, uom: data1.uom, quantity: data1.quantity, price: data1.price,
                      price_based_on: data1.price_based_on, amount: data1.amount,
                      tax_code: data1.tax_id, tax_rate: data1.tax_rate, tax_amt: data1.tax_amt,
                      total_amt: data1.net_amt, acc_norms: data1.acc_norms
                    });
                    this.grandTotal = this.grandTotal + data1.net_amt;
                    this.userForm.patchValue({grand_total: this.grandTotal}); 
                    k = k + 1;              
                  }); 
                }
              }
              
             // this.DropDownListService.getStockTransDtls(this.stockId).subscribe(data=>
             forkJoin(
              this.DropDownListService.getStockTransDtls(data["order_id"]),
              this.DropDownListService.getStkTransTranInfo(data["order_id"])
              ).subscribe(([transData,transInfo])=>
              {
                this.onChangeShipToAddId(transData.business_unit);
                  this.onChangePayToAddId(transData.delivery_business_unit);
                  this.stk_Transfer_Challan_Shipment_Dtls.patchValue({ship_addr: transData.business_unit, pay_addr: transData.delivery_business_unit}); 
                  this.userForm.patchValue({order_point:transData["order_point"],passing_wt:transData["passing_wt"],billing_req:transData["billing_req"],weighment_required:transData["weightment_req"],vehicle_type:transData["shipment_mode"]});

                  this.onChangeTransporterName(transInfo.trans_code);
                  this.stk_Transfer_Challan_Trans_Info.patchValue(transInfo);

              });
/*
             this.DropDownListService.getStockTransDtls(data["order_id"]).subscribe(data=>
                { 
                  this.onChangeShipToAddId(data.business_unit);
                  this.onChangePayToAddId(data.delivery_business_unit);
                  this.stk_Transfer_Challan_Shipment_Dtls.patchValue({ship_addr: data.business_unit, pay_addr: data.delivery_business_unit}); 
                });

              this.DropDownListService.getStkTransTranInfo(this.stockId).subscribe(data=>
              { 
                this.onChangeTransporterName(data.trans_code);
                this.stk_Transfer_Challan_Trans_Info.patchValue(data)}); 

                */
          }




           
        });
      }

      if (this.reference_type=="Loading Advice")
      {
        const dialogRef = this.dialog.open(StockTransferLoadingAdvicePopupComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => 
        {
          if(data != '' && data["advice_id"] != '0')
          {
            this.receiving_bu_status=true;
            this.userForm.patchValue({reference_id: data["advice_id"]});
            this.loadingAdvId = data["advice_id"];
            this.packingItem = [];
            let  k=0;
            this.grandTotal = 0; 
            this.addItem();
            this.item_sl_no = 0;
            while(this.stk_Transfer_Challan_Item_Dtls.length)
            this.stk_Transfer_Challan_Item_Dtls.removeAt(0);   

            for(let data1 of data.Wm_loading_advice_itm_dtls)
            {
              if(data1.checkbox == true)
              {
                this.status = false;
                forkJoin(
                this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"],this.company_name)
                ).subscribe(([packingList, capacityEmptyWt])=>
                {
                  this.status = true;
                  this.capacity[k] = capacityEmptyWt.capacity;
                  this.empty_bag_wt[k] =  capacityEmptyWt.empty_big_wt;
                  this.packingItem[k] = packingList; 
                  this.addItem();
                  this.stk_Transfer_Challan_Item_Dtls.at(k).patchValue({
                    item_code: data1.item_code, packing: data1.packing, suom: data1.s_uom, mat_wt: Number(data1.mat_wt).toFixed(2),
                    squantity: data1.s_quantity, uom: data1.uom, quantity: data1.quantity, price: data1.price,
                    price_based_on: data1.price_based_on, amount: data1.amount,
                    tax_code: data1.tax_code, tax_rate: data1.tax_rate, tax_amt: data1.tax_amt,
                    total_amt: data1.total_amt, acc_norms: data1.acc_norms});
                  k = k + 1;
                  this.grandTotal = this.grandTotal + data1.total_amt;
                  //console.log("data1::"+JSON.stringify(data1)) 
                  this.userForm.patchValue({grand_total: this.grandTotal}); 
                });
              }
            }

            this.status = false;
            forkJoin(
            this.DropDownListService.loadingAdviceVehicle(this.loadingAdvId),
            this.DropDownListService.getLoadingDetails(this.loadingAdvId),
             this.DropDownListService.getLoadingAdvTransinfo(this.loadingAdvId),
             this.DropDownListService.getReceivingBuLoadingAdvice(this.loadingAdvId)
            ).subscribe(([vehicleData, loadingData, transData,buData])=>
            { 
              this.userForm.patchValue({delivery_business_unit:buData['delivery_business_unit']})
              this.onChangeShipToAddId(vehicleData["b_unit"]);
              this.onChangePayToAddId(vehicleData["delivery_business_unit"]);

              this.stk_Transfer_Challan_Trans_Info.patchValue({mode_of_trans: transData["mode_of_trans"], 
                charge_code: transData["charge_code"], trans_code: transData["transporter_name"]});

              this.stk_Transfer_Challan_Trans_Info.patchValue({vehicle_no: loadingData["vehicle_id"]});

              this.status = false;
              forkJoin(
                this.DropDownListService.getUnloadWeightmentWt(loadingData["weighment_id"]), 
                this.DropDownListService.getStockTransDtls(loadingData["referance_id"]),
              ).subscribe(([weigmtData, stockTransData])=>
              {
                console.log("weigmtData: "+JSON.stringify(weigmtData)+" data: "+JSON.stringify(data));
                this.stk_Transfer_Challan_Weight_Dtl.patchValue({own_uom: weigmtData["gw_unit"], own_gross: weigmtData["gross_weight"],
                own_tare: weigmtData["tare_weight"],own_net: weigmtData["net_weight"],own_date: weigmtData["wgment_date"]});

                console.log("Data: "+JSON.stringify(stockTransData)+" data: "+JSON.stringify(stockTransData));
                this.userForm.patchValue({order_point: stockTransData["order_point"], billing_req: stockTransData["billing_req"],
                  passing_wt: stockTransData["passing_wt"],weighment_required:stockTransData["weightment_req"],vehicle_type:stockTransData["shipment_mode"]});

                this.onChangeShipToAddId(stockTransData["business_unit"]);
                this.onChangePayToAddId(stockTransData["delivery_business_unit"]);
                this.stk_Transfer_Challan_Shipment_Dtls.patchValue({ship_addr: stockTransData["business_unit"],
                  pay_addr: stockTransData["delivery_business_unit"]}); 
                this.status = true;
              })

            });
         
          }
        });
      }
    }

    onChangeTransporterName(t_code:string)
    {   
      // this.veh_nos = [];
      // if(t_code != "0")
      // {
      //   this.status = false;
      //   this.DropDownListService.getVehicleTransporter(t_code).subscribe(data=>
      //   {
      //     this.veh_nos  = data;
      //     this.status = true;
      //   });           
      // }
    }
    
    send()
    { 
      this.StkChallanId= this.userForm.get("id").value as FormControl;
      this.userForm.patchValue({ 
        company_id: localStorage.getItem("company_name"), fin_year:localStorage.getItem("financial_year"),
        username: localStorage.getItem("username")});
      this.stk_Transfer_Challan_Trans_Info.patchValue({trans_borne_by: this.transBorneBy})
      this.submitted = true;
      if(!this.userForm.valid)
       {
        alert('Please fill all fields!')
        return false;
       } 
      else
       {
        this.status=false;
        if(this.userForm.get("business_unit").value == null || this.userForm.get("business_unit").value == 0)
        {
          alert("Please Select Sending Business Unit");
          this.status=true;
        }
        else if(this.userForm.get("ref_type").value == null || this.userForm.get("ref_type").value == 0)
        {
          alert("Please Select Reference Type");
          this.status=true;
        }
      /*  else if(this.userForm.get("cust_ref_doc_no").value == null || this.userForm.get("cust_ref_doc_no").value == 0)
        {
          alert("Please Enter Customer Ref. Document No");
          this.status=true;
        }
        */
        else if(this.userForm.get("order_point").value == null || this.userForm.get("order_point").value == 0)
        {
          alert("Please Select Order Point");
          this.status=true;
        }
        else if(this.userForm.get("ref_type").value == 'Open Stock Transfer Challan' && (this.userForm.get("delivery_business_unit").value == null || this.userForm.get("delivery_business_unit").value == 0))
        {
          alert("Please Select Receiving Business Unit");
          this.status=true;
        }
        else if(this.userForm.get("billing_req").value == null || this.userForm.get("billing_req").value == 0)
        {
          alert("Please Select Billing Required");
          this.status=true;
        }
        else if(this.userForm.get("passing_wt").value == null || this.userForm.get("passing_wt").value == 0)
        {
          alert("Please Select Passing Weight");
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

          for(let b=0;b<this.stk_Transfer_Challan_Item_Dtls.length;b++)
          {
            if(this.stk_Transfer_Challan_Item_Dtls.at(b).get("item_code").value == null || this.stk_Transfer_Challan_Item_Dtls.at(b).get("item_code").value == 0)
            {
              itemcheck = true;
            }
            if(this.stk_Transfer_Challan_Item_Dtls.at(b).get("packing").value == null || this.stk_Transfer_Challan_Item_Dtls.at(b).get("packing").value == 0)
            {
              packingcheck = true;
            }
            if(this.stk_Transfer_Challan_Item_Dtls.at(b).get("quantity").value == null || this.stk_Transfer_Challan_Item_Dtls.at(b).get("quantity").value == 0)
            {
              itemquantity = true;
            }
            if(this.stk_Transfer_Challan_Item_Dtls.at(b).get("squantity").value == null || this.stk_Transfer_Challan_Item_Dtls.at(b).get("squantity").value == 0)
            {
              packingquantity = true;
            }
            if(this.stk_Transfer_Challan_Item_Dtls.at(b).get("price").value == null || this.stk_Transfer_Challan_Item_Dtls.at(b).get("price").value == 0)
            {
              price = true;
            }
            if(this.stk_Transfer_Challan_Item_Dtls.at(b).get("price_based_on").value == null || this.stk_Transfer_Challan_Item_Dtls.at(b).get("price_based_on").value == 0)
            {
              pricebasedon = true;
            }
          }

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
          // else if(this.userForm.get("order_point").value =='Inter' && (this.stk_Transfer_Challan_Trans_Info.get("vehicle_no").value == null || this.stk_Transfer_Challan_Trans_Info.get("vehicle_no").value == 0))
         // else if(((this.userForm.get("weighment_required").value =='Yes' || this.userForm.get("order_point").value =='Inter') && (this.userForm.get("ref_type").value =='Goods Stock Transfer' || this.userForm.get("ref_type").value =='Loading Advice')) && (this.stk_Transfer_Challan_Trans_Info.get("vehicle_no").value == null || this.stk_Transfer_Challan_Trans_Info.get("vehicle_no").value == 0))
         else if((this.userForm.get("weighment_required").value =='Yes' && (this.userForm.get("ref_type").value =='Goods Stock Transfer' || this.userForm.get("ref_type").value =='Loading Advice')) && (this.stk_Transfer_Challan_Trans_Info.get("vehicle_no").value == null || this.stk_Transfer_Challan_Trans_Info.get("vehicle_no").value == 0))
          {
            alert("Please Select Vehicle Number in Transport Information Tab!!!");this.status = true;
          }
          else if(this.userForm.get("order_point").value =='Inter' && (this.stk_Transfer_Challan_Trans_Info.get("vehicle_no").value == null || this.stk_Transfer_Challan_Trans_Info.get("vehicle_no").value == 0))
          {
            alert("Please Select Vehicle Number in Transport Information Tab!!!");this.status = true;
          }
          else if(this.userForm.get("confirmed_by").value == null || this.userForm.get("confirmed_by").value == 0)
          {
            alert("Please Select Confirm By in Approval Tab!!!");this.status = true;
          }
          else if(this.userForm.get("approval").value == null || this.userForm.get("approval").value == 0)
          {
            alert("Please Select Approved in Approval Tab!!!");this.status = true;
          }
          else if(this.userForm.get("reason").value == null || this.userForm.get("reason").value == 0)
          {
            alert("Please Select Reason in Approval Tab!!!");this.status = true;
          }
          else
          {
            if(this.StkChallanId>0)    
            {      
              this.Service.updateStkTransChallan(this.userForm.getRawValue(), this.StkChallanId).subscribe(data => 
              {
                console.log(this.userForm.value);
                alert("Stock Transfer Challan Updated successfully.");
                this.userForm.reset();
                this.status = true;
                this.ngOnInit();
                this.isHidden=false; 
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
              this.ngOnInit()});    
            }

            else
              {     
                this.Service.createStockTransferChallan(this.userForm.getRawValue()).subscribe(data => 
                {
                  console.log(this.userForm.value);
                  alert("New Stock Transfer Challan created successfully.");
                  this.userForm.reset();
                  this.status = true;
                  this.ngOnInit();
                  this.isHidden=false;    
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
                this.ngOnInit()});  
              }
          }
        }
          
       }  
    }

    onUpdate(id:any, stk_challan_id:string,action)
    {
      if(action=='view')
      {
        this.stocktransferchallansave = false;
      }
      if(action=='update')
      {
        this.stocktransferchallansave = true;
      }
      this.userForm.patchValue({id: id});
      this.status = false;
      this.isHidden = true;
      this.packingItem = [];
      this.selectedItemName = [];
      this.selectedPackingItem = [];
  
      
      forkJoin(
        this.Service.getStockTransChlnById(id),
        this.Service.getStkTransChallanItemDlts(stk_challan_id),      
        this.Service.getStkTransChallanTranInfo(stk_challan_id),
        this.Service.getStkTransBUDtls(stk_challan_id),
        this.Service.getStkTransChallanDocs(stk_challan_id),
        this.Service.getStkTransChallanShipDtls(stk_challan_id),
        this.Service.getStkTransChallanWtDtls(stk_challan_id)
      ).subscribe(([StkTransChallanData, itemData,transData, 
          BuData,Docsdata,ShipmentData,weightmentData])=>
        {
          this.currentDate = StkTransChallanData["stk_challan_date"];
        //  this.onChangeBusinessUnit(StkTransChallanData["business_unit"]);
          //console.log("StkTransChallanData:"+JSON.stringify(StkTransChallanData))
          if(StkTransChallanData["ref_type"] == 'Open Stock Transfer Challan')
          {
            this.userForm.patchValue({delivery_business_unit:StkTransChallanData["delivery_business_unit"]});
            this.checkRefType=true;
           // console.log("chksdgh:"+StkTransChallanData["delivery_business_unit"])
           
          }
          else if(StkTransChallanData["ref_type"] == 'Goods Stock Transfer')
          {
            this.userForm.patchValue({delivery_business_unit:StkTransChallanData["delivery_business_unit"]});
            this.checkRefType=true;
           // console.log("chksdgh:"+StkTransChallanData["delivery_business_unit"])
           
          }
          else
          {
            this.checkRefType=false;
          }
          this.userForm.patchValue({id: StkTransChallanData["id"],stk_challan_id: StkTransChallanData["stk_challan_id"], stk_challan_no: StkTransChallanData["stk_challan_no"], stk_challan_date: StkTransChallanData["stk_challan_date"],
            cust_ref_doc_no: StkTransChallanData["cust_ref_doc_no"], stk_challan_date2: StkTransChallanData["stk_challan_date2"], remark: StkTransChallanData["remark"],
            confirmed_by: StkTransChallanData["confirmed_by"], approval: StkTransChallanData["approval"], reference_id: StkTransChallanData["reference_id"],
            passing_wt: StkTransChallanData["passing_wt"], billing_req: StkTransChallanData["billing_req"], order_point: StkTransChallanData["order_point"],
            reason: StkTransChallanData["reason"], ref_type: StkTransChallanData["ref_type"], business_unit: StkTransChallanData["business_unit"],
            grand_total: StkTransChallanData["grand_total"], company_id: StkTransChallanData["company_id"], fin_year: StkTransChallanData["fin_year"], username: StkTransChallanData["username"],weighment_required:StkTransChallanData["weighment_required"],vehicle_type:StkTransChallanData["vehicle_type"]});
 
            console.log("order Details: "+  JSON.stringify(StkTransChallanData));

          let k = 0;
          this.addItem();
          this.item_sl_no = 0;
          while (this.stk_Transfer_Challan_Item_Dtls.length) 
          { this.stk_Transfer_Challan_Item_Dtls.removeAt(0);}
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
                this.selectedPackingItem[k] = data1["packing"];
                this.selectedItemName[k] = data1["item_code"];
                this.packingItem[k] = packingList; 
                this.stk_Transfer_Challan_Item_Dtls.at(k).patchValue(data1);
                k = k + 1;
              });
            }

            this.stk_Transfer_Challan_Trans_Info.patchValue({mode_of_trans: transData["mode_of_trans"],trans_code: transData["trans_code"], vehicle_no: transData["vehicle_no"], vehicle_id: transData["vehicle_id"] ,charge_code: transData["charge_code"],
            freight_amt: transData["freight_amt"], payment_term: transData["payment_term"],adv_paid:transData["adv_paid"]});

           // console.log("BuData: "+  JSON.stringify(BuData));
            this.stk_Transfer_Challan_BusinessUnit_Dtls.patchValue(BuData)
           
            console.log("Docsdata: "+  JSON.stringify(Docsdata));
            while (this.stk_Transfer_Challan_Docs.length) 
            this.stk_Transfer_Challan_Docs.removeAt(0);
            for(let data1 of Docsdata) 
            this.addDocument();
            this.stk_Transfer_Challan_Docs.patchValue(Docsdata);

            //console.log("ShipmentData: "+  JSON.stringify(ShipmentData));
            this.stk_Transfer_Challan_Shipment_Dtls.patchValue(ShipmentData);

          //  console.log("weightmentData: "+  JSON.stringify(weightmentData));
            this.stk_Transfer_Challan_Weight_Dtl.patchValue(weightmentData);

            this.status = true;

            console.log("tuhin here " +  this.userForm.get("delivery_business_unit").value)
          }, (error) => {this.status= true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});                                 
        }

        onDelete(id:any)
        {
          this.status = false;
          if(confirm("Are you sure to delete this Stock Transfer Challan ?"))
          { 
            //normal delete process is done but checking usage in different table is pending
            this.userForm.patchValue({username: localStorage.getItem("username")});
            this.Service.deleteStocktransferChallan(this.userForm.getRawValue(),id).subscribe(data=> 
            {        
              alert("Stock Transfer Challan Deleted successfully.");
              this.userForm.reset();
              this.status = true;
              this.isHidden = false;
              this.ngOnInit();
              this.showList("list");
            }); 
          }  
          this.status = true;
        }

        onPrint(id,challan_id)
        {   
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.data = {  };
          let dialogRef = this.dialog.open(StockTransferChallanPrintPopUpComponent, {data: {alldata: id,challan_id:challan_id}, height: '80%',
          width: '80%'});
          dialogRef.afterClosed().subscribe( data => 
          {
          
          });      
      }

}
