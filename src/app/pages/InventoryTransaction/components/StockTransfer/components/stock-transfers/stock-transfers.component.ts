import { Component, OnInit } from '@angular/core';
import { Master } from '../../../../../../service/master.service';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { StockTransfer} from '../../../../../../models/StockTransfer/stock-transfer';
import { StockQcPopupComponent } from '../stock-qc-popup/stock-qc-popup.component';
import { StockItemPopupComponent } from '../stock-item-popup/stock-item-popup.component';
import { StockTaxPopupComponent } from '../stock-tax-popup/stock-tax-popup.component';
import { inherits } from 'util';
import { forkJoin } from 'rxjs';
// import { timingSafeEqual } from 'crypto';

  @Component({
    selector: 'app-stock-transfers',
    templateUrl: './stock-transfers.component.html',
    styleUrls: ['./stock-transfers.component.scss']})

  export class StockTransfersComponent implements OnInit 
  {
    status = false;
    model: StockTransfer = new StockTransfer();
    listStockTransfer: StockTransfer[];
    public userForm:FormGroup;
    trans_codes:{};
    company_name:any;
    currentDate:any;
    basislist:any = [];
    employeeNames:any = [];
    reasonList:any =[];
    packingItem:any=[];
    selectedItemName = [];
    modeOfTransport:any = [];
    Id: any;
    ledgerNames:any = [];
    paymentTermsList:any = [];
    delbusinesslists:any = [];
    UnloadinPointList:any = [];
    loadinPointList:any = [];
    item_codes:{};
    OrderPt:any;
    chargesIdList:{};
    AppchargeList:any = [];
    businesslists:{};
    devbusinesslists:{}
    selectedPackingItem:any = [];
    reasonIdList: {};
    seq_no:string;
    submitted = false;
    transBrone:{};
    RefType:any;
    item_sl_no = 1; 
    isHidden = false;
    _businessunit:any;
    orderPoint:any;
    stocktransferordersave:boolean = true;
    stocktransferorderupdate:boolean = true;
    stocktransferorderview:boolean = true;
    stocktransferorderdelete:boolean = true;

    constructor(public fb:FormBuilder, public dialog: MatDialog,
      private Service : Master,private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group(
      {
        id:[''],
        order_id:[''],
        order_no:[''],
        ref_type:[''],
        order_date:[''],
        order_point:[''],
        business_unit:[''],
        delivery_business_unit:[''],
        loading_point:[''],
        unloading_point:[''],
        weightment_req:[''],
        tax_info:[''],
        enway_bill:[''],
        shipment_mode:[''],
        order_status:[''],
        reference:[''],
        billing_req:[''],
        remarks:[''],
        confirmed_by:[''],
        approval:[''],
        reason:[''],
        approved_remarks:[''],
        applicable_charges_id:[''],
        passing_wt:[''],
        app_chgs_id:[''],
        company_id:[''],
        fin_year:[''],
        username:[''],
        reference_id:[''],
    
        stock_Transfer_Item_Dtls: this.fb.array([this.fb.group({
          slno:this.item_sl_no,
          item_code:'',
          packing: '',
          quantity: '',
          uom:'',
          squantity:'',
          suom:'',
          mat_wt: '',
          price: '',
          price_based_on:'',
          amount: '',
          gross_amt: '',
          tax_id:'',
          tax_rate:'',
          tax_amt:'',
          net_amt:'',
          acc_norms:'',
          remarks:'',
          warehouse:'',
          rack:'',
          cgst_amt:'',
          sgst_amt:'',
          igst_amt:''})]), 
          
          stock_transfer_terminations:this.fb.group({
            term_stk_ord: '',
            order_by: '',
            reason: '',
            remarks: '',
            tot_term_chg: '',
            term_add: '',
            term_deduct: '',
            net_term_chg: '',
            charges_descpt:'' }),
          
            stock_transfer_terminations_dyn:this.fb.array([this.fb.group({
            charge_name:'',
            termination_cal:'',
            cal_qty:'',
            amount:'', 
            method: '',
            tax_rate: '',
            qty:'',
            rate: '',
            gl_account: '',
            tax_amount: '',
            total_amount:'', })]),

        stock_Transfer_Summary:this.fb.group({
          item_total:'',
          discount:'',
          tax_total:'',
          net_amount:'',
          app_brokerage:'',
          net_r_value:''}),
    
        stock_Transfer_Summary_dyn: this.fb.array([this.fb.group({
          charge_name:'',
          rate_cal_method:'',
          amount:'',
          tax_rate: '' })]),

       stock_transfer_doc: this.fb.array([this.fb.group({
        doc_name:''})]),
 
        stock_Transfer_Trans_Info:this.fb.group({
          mode_of_trans:'',
          trans_code:'',
          charge_code:'',
          payment_term: ''}),
          
          stock_transfer_resource_cost: this.fb.array([this.fb.group({	
            charge_name:'',
            rate_cal_method:'',
            amount:'',
            tax_rate: '',
            tax_amt: '',
            gross_amt: '',})])
      });
    }

    get id(){return this.userForm.get("id") as FormControl};
    get order_id(){return this.userForm.get("order_id") as FormControl};
    get order_no(){return this.userForm.get("order_no") as FormControl};
    get ref_type(){return this.userForm.get("ref_type") as FormControl};
    get order_date(){return this.userForm.get("order_date") as FormControl};
    get order_point(){return this.userForm.get("order_point") as FormControl};
    get business_unit(){return this.userForm.get("business_unit") as FormControl};
    get passing_wt(){return this.userForm.get("passing_wt") as FormControl};
    get delivery_business_unit(){return this.userForm.get("delivery_business_unit") as FormControl};
    get loading_point(){return this.userForm.get("loading_point") as FormControl};
    get billing_req(){return this.userForm.get("billing_req") as FormControl};
    get unloading_point(){return this.userForm.get("unloading_point") as FormControl}; 
    get applicable_charges_id(){return this.userForm.get("applicable_charges_id") as FormControl};
    get weightment_req(){return this.userForm.get("weightment_req") as FormControl};
    get tax_info(){return this.userForm.get("tax_info") as FormControl};
    get enway_bill(){return this.userForm.get("enway_bill") as FormControl}; 
    get service_item(){return this.userForm.get("service_item") as FormControl};
    get shipment_mode(){return this.userForm.get("shipment_mode") as FormControl};
    get order_status(){return this.userForm.get("order_status") as FormControl};
    get reference(){return this.userForm.get("reference") as FormControl};
    get remarks(){return this.userForm.get("remarks") as FormControl};
    get confirmed_by(){return this.userForm.get("confirmed_by") as FormControl};
    get approval(){return this.userForm.get("approval") as FormControl};
    get reason(){return this.userForm.get("reason") as FormControl}; 
    get approved_remarks(){return this.userForm.get("approved_remarks") as FormControl};
    get app_chgs_id(){return this.userForm.get("app_chgs_id") as FormControl};
    get stock_Transfer_Item_Dtls(){return this.userForm.get("stock_Transfer_Item_Dtls") as FormArray};
    get stock_Transfer_Summary(){return this.userForm.get("stock_Transfer_Summary") as FormGroup};
    get stock_Transfer_Summary_dyn() {return this.userForm.get('stock_Transfer_Summary_dyn') as FormArray;}
    get stock_Transfer_Trans_Info(){return this.userForm.get("stock_Transfer_Trans_Info") as FormGroup};
    get stock_transfer_resource_cost() { return this.userForm.get('stock_transfer_resource_cost') as FormArray;}
    get stock_transfer_doc() { return this.userForm.get('stock_transfer_doc') as FormArray;}
    get stock_transfer_terminations_dyn() {return this.userForm.get('stock_transfer_terminations_dyn') as FormArray;}
    get stock_transfer_terminations(){return this.userForm.get("stock_transfer_terminations") as FormGroup};
    
    ngOnInit() 
    {
    let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
    this.stocktransferordersave = false;
    this.stocktransferorderupdate = false;
    this.stocktransferorderview = false;
    this.stocktransferorderdelete = false;

    if(accessdata.includes('stock_transfer_order.save'))
    {
     this.stocktransferordersave = true;
    }
    if(accessdata.includes('stock_transfer_order.update'))
    { 
      this.stocktransferorderupdate=true;
    }
    if(accessdata.includes('stock_transfer_order.view'))
    { 
      this.stocktransferorderview=true;
    }
    if(accessdata.includes('stock_transfer_order.delete'))
    { 
      this.stocktransferorderdelete=true;
    }
      this.company_name = localStorage.getItem("company_name");
      this.empty_bag_wt = [];
      this.capacity = [];
      this.packingItem = [];
      this.UnloadinPointList = [];
      this.loadinPointList = []; 
      this.userForm.patchValue({business_unit:"0",delivery_business_unit:"0"});
      this._businessunit = "0";
      this.orderPoint = "0";
      this.DropDownListService.getAccPayTerms().subscribe(data=>{this.paymentTermsList = data}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
      this.modeOfTransport=["By Road","By Train","By Ship","By Air", "By Rail","By Water", "By Vehicle", "By Other"];  
      this.basislist = ["%", "UOM","Fixed"];
      //this.DropDownListService.getItemThruSales()
      this.DropDownListService.getItemThruSaleNew()
      .subscribe(data=>{this.item_codes = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
      this.DropDownListService.getChargeMasterList().subscribe(data=>{this.AppchargeList = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
      this.DropDownListService.getPurTermReasons().subscribe(data=>{this.reasonIdList = data}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
      this.DropDownListService.employeeNamesList(this.company_name).subscribe(data=>{this.employeeNames = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});     
      this.DropDownListService.getPurTermReasons().subscribe(data=>{this.reasonList = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});          
      this.DropDownListService.ledgerNameList().subscribe(data=>{this.ledgerNames = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});      
      //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      this.DropDownListService.getChargeMasterList().subscribe(data=>{this.chargesIdList  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
      this.company_name = localStorage.getItem("company_name");
      this.DropDownListService.transporterNamesList().subscribe(data=>{this.trans_codes = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});     
      this.DropDownListService.custometrBusList(this.company_name).subscribe(data=>{this.businesslists  = data; this.delbusinesslists = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});     
      this.transBrone=["Own Account","Party Account"];
      this.Service.getStockTransfer().subscribe(data=>{this.listStockTransfer  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
      this.status = true;
    }

    onChangeReason(applicable_charges_id:string)
    {
      if(applicable_charges_id != '0')
      { 
        this.status = false;
         this.DropDownListService.getChargeMasterDtlsList(applicable_charges_id).subscribe(data=>
        {
          let i =0;
          while(this.stock_transfer_terminations_dyn.length)
          {this.stock_transfer_terminations_dyn.removeAt(0);}
          
          for(let data1 of data)
          {
            this.add8();
            this.stock_transfer_terminations_dyn.at(i).patchValue({
            charge_name: data1.charge_name, tax_rate: data1.tax_rate,
              method: data1.method, termination_cal: data1.rate_cal});
            i=i+1;
          }
          this.status = true;
        });
      }
    }

   
    onChangeStkTransDate(StktransDate)
    {
      this.OrderPt= this.userForm.get("order_point").value as FormControl;

      this.currentDate = StktransDate.target.value;
      if(this.OrderPt!="")
      {
        this.getStkTrnasOrderNo(this.currentDate,this.OrderPt);
      }
    }

    getStkTrnasOrderNo(StktransDate,order_point)
    {
      this.status = false;
      this.DropDownListService.getSTOSequenceId(this.currentDate+"/"+order_point).subscribe(data=>
        {
          this.seq_no = data.sequenceid;
          this.status = true;
        }); 
    }


    addItem()
    {
      this.item_sl_no =this.item_sl_no +1; 
      if( this.taxInfo == 'Intra')
      this.stock_Transfer_Item_Dtls.push(this.fb.group({
        slno:this.item_sl_no,
        item_code:'',
        packing: '',
        quantity: '',
        uom:'',
        squantity:'',
        suom:'',
        mat_wt: '',
        price: '',
        price_based_on:'',
        amount: '',
        gross_amt: '',
        tax_id:'',
        tax_rate:'',
        tax_amt:0,
        net_amt:'',
        acc_norms:'',
        remarks:'',
        warehouse:'',
        rack:'',
        cgst_amt:'',
        sgst_amt:'',
        igst_amt:''}));
      
      else
        this.stock_Transfer_Item_Dtls.push(this.fb.group({
          slno:this.item_sl_no,
          item_code:'',
          packing: '',
          quantity: '',
          uom:'',
          squantity:'',
          suom:'',
          mat_wt: '',
          price: '',
          price_based_on:'',
          amount: '',
          gross_amt: '',
          tax_id:'',
          tax_rate:'',
          tax_amt:'',
          net_amt:'',
          acc_norms:'',
          remarks:'',
          warehouse:'',
          rack:'',
          cgst_amt:'',
          sgst_amt:'',
          igst_amt:''}));
    }
  
    deleteItem(index) 
    {
      if(this.item_sl_no > 1)
      { 
        this.stock_Transfer_Item_Dtls.removeAt(index);
        this.item_sl_no = this.item_sl_no - 1;  
      }
      else
      {
        this.item_sl_no = 1;
        alert("can't delete all rows");
        this.stock_Transfer_Item_Dtls.reset();
        this.stock_Transfer_Item_Dtls.at(index).patchValue({slno:  this.item_sl_no}); 
      } 
      
      for(let i=1; i<=this.item_sl_no; i++)
      this.stock_Transfer_Item_Dtls.at(i-1).patchValue({slno: i});
    }

    addDocument() 
    {
      this.stock_transfer_doc.push(this.fb.group({
        doc_name : ''}));
    }

    deleteDocument(index) 
    {
      if(index)
      {this.stock_transfer_doc.removeAt(index);}
      else
      {
        alert("can't delete all rows");
        this.stock_transfer_doc.reset();
      }
    }

    addAppCharges()
    {
      this.stock_Transfer_Summary_dyn.push(this.fb.group({
        charge_name:'',
        rate_cal_method:'',
        amount:'',
        tax_rate: '' }));
    }

    add1() 
    {
      this.stock_transfer_resource_cost.push(this.fb.group({
        charge_name:'',
        rate_cal_method:'',
        amount:'',
        tax_rate: '',
        tax_amt: '',
		    gross_amt: '' }));
    }

    add8()
    {
      this.stock_transfer_terminations_dyn.push(this.fb.group({
        charge_name:'',
        termination_cal:'',
        cal_qty:'',
        amount:'', 
        method: '',
        tax_rate: '',
        qty:'',
        rate: '',
        gl_account: '',
        tax_amount: '',
        total_amount:'',}));
    }


    showList(s:string)
    {
      if(this.stocktransferordersave == true  && this.stocktransferorderupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        { 
          this.isHidden=true;
          //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
          this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
          this.userForm.patchValue({business_unit:"0",delivery_business_unit:"0"});
        }
      }
      if(this.stocktransferordersave == true  && this.stocktransferorderupdate == false)
      {
        if(s=="add")
        { 
          this.isHidden=true;
          //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
          this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
          this.userForm.patchValue({business_unit:"0",delivery_business_unit:"0"});
        }
      }
      
      if(s=="list")
      { 
        this.isHidden=false;
        this.userForm.reset();
        this.stocktransferordersave = true;
      }
    }

    is_tporder_checked = false;
    onChangeTSTOrder(event, calFrom)
    {
      let tporder;
      if(calFrom == 'CFT')
      tporder = event.checked;
      else
      tporder = event;

      if(tporder == true)
      {
        this.is_tporder_checked = true;
      }
      else
      {
        this.is_tporder_checked = false;
        this.stock_transfer_terminations.patchValue({order_by: "0", charges_descpt: "0", reason: "0",
          remarks: "", tot_term_chg: 0, term_add: 0, term_deduct: 0, net_term_chg: 0});

        while(this.stock_transfer_terminations_dyn.length)
        this.stock_transfer_terminations_dyn.removeAt(0);
        this.add8();
      }
    }
  
    capacity:any;
    onChangeItemName(index,event)
    {
      this.packingItem[index] = [];
      if(event.target.value != "0")
      {
        this.status = false;
        this.DropDownListService.getItemNameById(event.target.value,this.company_name).subscribe(data=>
        {       
          this.DropDownListService.getUomName(data.mstock_unit).subscribe(data=>
          {this.stock_Transfer_Item_Dtls.at(index).patchValue({uom:data.description}); });
          
          this.DropDownListService.getItemMasterPackMat(event.target.value).subscribe(data1=>
          {this.packingItem[index] = data1});

          this.DropDownListService.retriveItemMasterStatInfo(event.target.value,this.company_name).subscribe(data=>
          {this.stock_Transfer_Item_Dtls.at(index).patchValue({tax_id:data[0].tax_code, tax_rate:data[0].tax_rate}); });
    
          this.DropDownListService.getItemQCDetails(event.target.value,this.company_name).subscribe(data=>
          {this.stock_Transfer_Item_Dtls.at(index).patchValue({acc_norms:data[0].qc_code})});  

          this.status = true;
        });   
      }
    }

    itemId: any;
    packingQty:any;
    empty_bag_wt:any = [];
    onChangePackingItem(index,event,)
    {
      if(event.target.value != "0")
      {
        this.status = false;
        this.itemId =  this.stock_Transfer_Item_Dtls.at(index).get("item_code").value as FormControl;
        this.packingQty =  this.stock_Transfer_Item_Dtls.at(index).get("squantity").value as FormControl;
        this.DropDownListService.getItemPackUom(this.itemId, event.target.value,this.company_name).subscribe(data=>
        { 
          this.capacity[index] = data.capacity; 
          this.empty_bag_wt[index] = data.empty_big_wt;
          this.stock_Transfer_Item_Dtls.at(index).patchValue({suom: data.uom1, 
            quantity: this.capacity[index] * this.packingQty, mat_wt: Number(this.capacity[index] * this.packingQty - (this.empty_bag_wt * this.packingQty)).toFixed(2)}); 
          this.status = true;
        });
      }
    }

    calItemQty(packing_qty, index)
    {
      let itemQty = this.capacity * packing_qty.target.value
      this.stock_Transfer_Item_Dtls.at(index).patchValue({quantity: itemQty, mat_wt: Number(itemQty - this.empty_bag_wt[index]).toFixed(2)});
    }

    amt:any;
    _mrp:any;
    _taxrate:any;
    _taxAmt:any;
    _totalAmt:any;
    _netAmt:any;
    _item_qty:any;
    _packing_qty:any;
    onChangePriceBasedOn(price_based_on, index)
    {
      this._taxrate = this.stock_Transfer_Item_Dtls.at(index).get('tax_rate').value as FormControl;
      this._mrp = this.stock_Transfer_Item_Dtls.at(index).get("price").value as FormControl;

      if(price_based_on.target.value == "Packing")
      {
        this._packing_qty = this.stock_Transfer_Item_Dtls.at(index).get("squantity").value as FormControl;
        this.amt = this._mrp * this._packing_qty;
      }

      if(price_based_on.target.value == "Item")
      {
        this._item_qty = this.stock_Transfer_Item_Dtls.at(index).get("quantity").value as FormControl;
        this.amt = this._mrp * this._item_qty;
      }
      if(this.taxInfo == 'Intra')
      this._taxAmt = 0;
      else
      this._taxAmt = this.amt *(this._taxrate/100);
      this._totalAmt = this._taxAmt + this.amt;
      this.stock_Transfer_Item_Dtls.at(index).patchValue({amount: this.amt, tax_amt: this._taxAmt, net_amt: this._totalAmt, gross_amt: this._totalAmt});

//new starts here 

      let totalAmt = 0;
      let totalTaxAmt = 0;
      let totalNetAmt = 0;

      for(let index=0; index<this.stock_Transfer_Item_Dtls.length; index++)
      {
        this.amt = this.stock_Transfer_Item_Dtls.at(index).get('amount').value as FormControl;
        totalAmt = totalAmt + this.amt;
        this._taxAmt = this.stock_Transfer_Item_Dtls.at(index).get('tax_amt').value as FormControl;
        totalTaxAmt = totalTaxAmt + this._taxAmt;
        this._netAmt = this.stock_Transfer_Item_Dtls.at(index).get('net_amt').value as FormControl;
        totalNetAmt = totalNetAmt + this._netAmt;
      }
      this.stock_Transfer_Summary.patchValue({item_total: totalAmt, tax_total: totalTaxAmt, net_amount: totalNetAmt,
        net_r_value: totalAmt});

//ends here 



    }

    onChangeApplicableCharges(applicable_charges_id:string)
    {
      this.DropDownListService.getChargeMasterDtlsList(applicable_charges_id).subscribe(data=>
      {
        let i =0;
        while(this.stock_Transfer_Summary_dyn.length)
        {this.stock_Transfer_Summary_dyn.removeAt(0);}

        for(let data1 of data)
        {
          this.addAppCharges();
          this.stock_Transfer_Summary_dyn.at(i).patchValue({charge_name: data1.charge_name,
            rate_cal_method: data1.method, tax_rate: data1.tax_rate});
          i=i+1;
        }
      });
    }

    onChangeApplicable(applicable_charges_id:string)
    {
      this.DropDownListService.getChargeMasterDtlsList(applicable_charges_id).subscribe(data=>
      {
        let i =0;
        while(this.stock_transfer_resource_cost.length)
        { this.stock_transfer_resource_cost.removeAt(0);}
        for(let data1 of data)
        {
          this.add1();
          this.stock_transfer_resource_cost.at(i).patchValue({
            charge_name: data1.charge_name, rate_cal_method: data1.method,
            tax_rate: data1.tax_rate});
          i=i+1;
        }
      });
    }

    onChangeMatTab(event)
    {
      if(event.index == 2)
      {
     // changes on 27-07-2022 // this. calNetAmt();
      }
    }

    discountAmt:any;
    calNetAmt()
    {
      let totalAmt = 0;
      let totalTaxAmt = 0;
      let totalNetAmt = 0;

      for(let index=0; index<this.stock_Transfer_Item_Dtls.length; index++)
      {
        this.amt = this.stock_Transfer_Item_Dtls.at(index).get('amount').value as FormControl;
        totalAmt = totalAmt + this.amt;
        this._taxAmt = this.stock_Transfer_Item_Dtls.at(index).get('tax_amt').value as FormControl;
        totalTaxAmt = totalTaxAmt + this._taxAmt;
        this._netAmt = this.stock_Transfer_Item_Dtls.at(index).get('net_amt').value as FormControl;
        totalNetAmt = totalNetAmt + this._netAmt;
      }
      this.stock_Transfer_Summary.patchValue({item_total: totalAmt, tax_total: totalTaxAmt, net_amount: totalNetAmt,
        net_r_value: totalAmt, discount: 0, app_brokerage: 0});
      
    }

    warehouses:any=[];
    stackList:any=[];
    StateStatus:any;
    DBU:any;
    onChangeBussinessUnit(b_code:string)
    { 
      this.DBU = this.userForm.get("delivery_business_unit").value as FormControl; 
      this._businessunit = b_code;
      if(b_code != "0")
      {
        this.status = false;
        this.DropDownListService.getLoadingPointThruBU(b_code).subscribe(data=>{this.loadinPointList  = data;}); 
        if(this.orderPoint == 'Intra')
        {
          this.userForm.patchValue({delivery_business_unit: b_code});
          this.DropDownListService.custometrBusList(this.company_name).subscribe(data=>
          {
            this.delbusinesslists = data;
            this.status = true;   
          });   
        }
        else if(this.orderPoint == 'Inter')
        {
          this.DropDownListService.getCompBusinessUnitDiff(b_code).subscribe(data=>
          {
            this.delbusinesslists = data;
            this.status = true;
          }); 

          //TaxInfo set...
          if(this.DBU != "0" && b_code !="0")
          {
            forkJoin(
              this.DropDownListService.getBusiUnitStateStatus(this.DBU+"/"+b_code)
            ).subscribe(([StatusCheck])=>
              {
                this.StateStatus = StatusCheck["status"];
                
                if(this.StateStatus =="Diff")
                {
                  this.userForm.patchValue({tax_info:"Yes",enway_bill:"Yes"});
                  this.taxReadOnly = false;
                }
                else
                {
                  this.userForm.patchValue({tax_info:null});
                  this.taxReadOnly = true;
                }

                this.status=true;
              })
          }
        }

        forkJoin(
          this.DropDownListService.getWHListbyBUnit(b_code),
        ).subscribe(([wearHouseData])=>
          {
            this.warehouses = wearHouseData;        
            this.status=true;
          })
      }
    
    }

    onChangeWarehouse(event, index)
    {
      this.stackList[index] = null;
      if(event !="0")
        {
          this.status = false;
        this.DropDownListService.getBinDescByWarehouse(event).subscribe(data1=>
        {      
          console.log("stackListData: "+JSON.stringify(data1))  
          this.status=true; 
          this.stackList[index] = data1;
        });        
       }
    }

    BU:any;
    taxReadOnly = true;
    onChangeDevBussinessUnit(b_code:string)
    {  
      this.BU = this.userForm.get("business_unit").value as FormControl; 
      if(b_code != "0")
      {
        this.status = false;
        this.DropDownListService.getLoadingPointThruBU(b_code).subscribe(data=>
        {
          this.UnloadinPointList = data;
          this.status = true;
        });           
      }
        //TaxInfo set...
        if(this.orderPoint == 'Inter' && this.BU != "0" && b_code !="0" && this.BU !=undefined && b_code !=undefined)
        {
          forkJoin(
            this.DropDownListService.getBusiUnitStateStatus(this.BU+"/"+b_code)
          ).subscribe(([StatusCheck])=>
            {
              this.StateStatus = StatusCheck["status"];
              
              if(this.StateStatus =="Diff")
              {
                this.userForm.patchValue({tax_info:"Yes"});
                this.taxReadOnly = false;
              }
              else
              {
                this.userForm.patchValue({tax_info:null});
                this.taxReadOnly = true;
              }

              this.status=true;
            })
        }
    }

    onChangeLoadingPoint(event)
    {
      if(event != "0" && this._businessunit != "0" && this.orderPoint == 'Intra')
      {
        this.status = false;
        this.DropDownListService.getLoadingPointThruBUDiff(this._businessunit, event).subscribe(data=>
        {
          this.UnloadinPointList = data;
          this.status = true;
        });  
      }
    }

    taxInfo = '';
    onChangeOrderPoint(order_point:string)
    {
      this.status = false;
      this.DropDownListService.getSTOSequenceId(this.currentDate+"/"+order_point).subscribe(data=>
      {
        this.seq_no = data.sequenceid;
        this.status = true;
      }); 
      if(order_point == 'Intra')
      {
        this.orderPoint = 'Intra';
        this.onCangeTaxInfo('No');
        this.userForm.patchValue({tax_info: 'No', loading_point: "0", delivery_business_unit: this._businessunit, unloading_point: "0"});
        this.modeOfTransport = ['No Vehicle', 'By Vehicle'];
      }
      else
      {
        this.HiddenLoading_Pt = true;
        this.userForm.patchValue({shipment_mode:"0",weightment_req:'Yes'});
        this.orderPoint = 'Inter';
        //this.onCangeTaxInfo('Yes');
        if(this._businessunit != "0")
        {
          this.DropDownListService.getCompBusinessUnitDiff(this._businessunit).subscribe(data=>
          {
            this.delbusinesslists = data;
            this.status = true;   
          }); 
        }
        this.userForm.patchValue({tax_info: null, delivery_business_unit: "0", unloading_point: "0"});
        this.modeOfTransport = ["By Road","By Train","By Ship","By Air","N/A"];
      }
    }
    onChangeOrderPointUpdate(order_point)
    {
      if(order_point == 'Intra')
      {
        this.orderPoint = 'Intra';
        this.onCangeTaxInfo('No');
        this.userForm.patchValue({tax_info: 'No', loading_point: "0", delivery_business_unit: this._businessunit, unloading_point: "0"});
        this.modeOfTransport = ['No Vehicle', 'By Vehicle'];
      }
      else
      {
        this.HiddenLoading_Pt = true;
        this.userForm.patchValue({shipment_mode:"0"});
        this.orderPoint = 'Inter';
        //this.onCangeTaxInfo('Yes');
        if(this._businessunit != "0")
        {
          this.DropDownListService.getCompBusinessUnitDiff(this._businessunit).subscribe(data=>
          {
            this.delbusinesslists = data;
            this.status = true;   
          }); 
        }
        this.userForm.patchValue({tax_info: null, delivery_business_unit: "0", unloading_point: "0"});
        this.modeOfTransport = ["By Road","By Train","By Ship","By Air","N/A"];
      }
    }
    onCangeTaxInfo(tax_info:string)
    {
      if(tax_info == 'Yes')
      {
        this.userForm.patchValue({enway_bill:"Yes"});
        this.taxInfo = 'Inter';
        for(let index = 0; index<this.stock_Transfer_Item_Dtls.length; index++)
        {
          this.amt = this.stock_Transfer_Item_Dtls.at(index).get("amount").value as FormControl;
          this._taxrate = this.stock_Transfer_Item_Dtls.at(index).get("tax_rate").value as FormControl;
          this.stock_Transfer_Item_Dtls.at(index).patchValue({tax_amt: this.amt * (this._taxrate/100)});
        }
      }
      else
      {
        this.userForm.patchValue({enway_bill:null});
        this.taxInfo = 'Intra';
        for(let index = 0; index<this.stock_Transfer_Item_Dtls.length; index++)
        {
          this.stock_Transfer_Item_Dtls.at(index).patchValue({tax_amt: 0});
        }
      }
    }
  
    HiddenLoading_Pt = true;
    OrderPoint:any;
    onChangeshipment(shipment_mode:string)
    { 
      this.OrderPoint= this.userForm.get("order_point").value as FormControl;
      if(shipment_mode == 'No Vehicle') 
      {this.userForm.patchValue({weightment_req: 'No'});}
      else
      {this.userForm.patchValue({weightment_req: 'Yes'});}

      if( this.OrderPoint =='Intra' && shipment_mode == 'No Vehicle')
        {
          this.HiddenLoading_Pt = false;
          this.userForm.patchValue({loading_point:"0",unloading_point:"0"});
        }
      else
        {
          this.HiddenLoading_Pt = true;
        }  

      this.stock_Transfer_Trans_Info.patchValue({mode_of_trans: shipment_mode}); 
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
        
        this.stock_Transfer_Item_Dtls.at(index).patchValue({tax_id: data["tax_id"], tax_rate: data["tax_rate"],
        cgst_amt: data["cgst_act_val"],sgst_amt: data["sgst_act_val"],igst_amt: data["igst_act_val"]});

//starts here 

                  this._taxrate1 = this.stock_Transfer_Item_Dtls.at(index).get('tax_rate').value;
                  this._mrp1 = this.stock_Transfer_Item_Dtls.at(index).get("price").value;
//
                  if(this.stock_Transfer_Item_Dtls.at(index).get("price_based_on").value == "Packing")
                  {
                    this._packing_qty1 = this.stock_Transfer_Item_Dtls.at(index).get("squantity").value as FormControl;
                    this.amt1 = this._mrp1 * this._packing_qty1;
                  }

                  if(this.stock_Transfer_Item_Dtls.at(index).get("price_based_on").value == "Item")
                  {
                    this._item_qty1 = this.stock_Transfer_Item_Dtls.at(index).get("quantity").value as FormControl;
                    this.amt1 = this._mrp1 * this._item_qty1;
                  }
                  // if(this.userForm.get("order_point").value == 'Intra') //as per discussion with rajesh sir
                  // this._taxAmt1 = 0;
                  // else
//new starts here 
                  if(this._taxrate1 == 0  || this.stock_Transfer_Item_Dtls.at(index).get("cgst_amt").value==null)
                  {
                    this._taxAmt1 = 0;
                  }  
                  else
                  {
            
                    let cgst_amt = this.stock_Transfer_Item_Dtls.at(index).get("cgst_amt").value;
                    let sgst_amt = this.stock_Transfer_Item_Dtls.at(index).get("sgst_amt").value;
                    let igst_amt = this.stock_Transfer_Item_Dtls.at(index).get("igst_amt").value;
            
                    if( cgst_amt == 0 && sgst_amt == 0 && igst_amt == 0)
                    {
                      console.log("1")
                      this._taxAmt = 0;
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
                  this.stock_Transfer_Item_Dtls.at(index).patchValue({amount: this.amt1, tax_amt: this._taxAmt1, net_amt: this._totalAmt1, gross_amt: this._totalAmt1});



                  let totalAmt = 0;
                  let totalTaxAmt = 0;
                  let totalNetAmt = 0;

                  for(let index=0; index<this.stock_Transfer_Item_Dtls.length; index++)
                  {
                    this.amt1 = this.stock_Transfer_Item_Dtls.at(index).get('amount').value as FormControl;
                    totalAmt = totalAmt + this.amt1;
                    this._taxAmt1 = this.stock_Transfer_Item_Dtls.at(index).get('tax_amt').value as FormControl;
                    totalTaxAmt = totalTaxAmt + this._taxAmt1;
                    this._netAmt1 = this.stock_Transfer_Item_Dtls.at(index).get('net_amt').value as FormControl;
                    totalNetAmt = totalNetAmt + this._netAmt1;
                  }
                  this.stock_Transfer_Summary.patchValue({item_total: totalAmt, tax_total: totalTaxAmt, net_amount: totalNetAmt,
                    net_r_value: totalAmt});




//ends here 
      }); 
    }

    showPopUp2(index)
    {
      this.itemId = this.stock_Transfer_Item_Dtls.at(index).get('item_code').value as FormControl;    
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index, item_code: this.itemId};
      const dialogRef = this.dialog.open(StockQcPopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe( data => 
      {
        this.stock_Transfer_Item_Dtls.at(index).patchValue({acc_norms: data["qc_code"]});
      }); 
    }
    
    indentId:any;
    indentNo:any;
    show_Row = false;
    EnqId:any;
    onClickShow()
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: 0,};
      const dialogRef = this.dialog.open(StockItemPopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => 
      {
        this.packingItem = [];
        let  k=0;
        this.item_sl_no = 0;
      
        while(this.stock_Transfer_Item_Dtls.length && data.length > 0)
        this.stock_Transfer_Item_Dtls.removeAt(0); 

        for(let data1 of data)
        {
          if(data1.checkbox == true)
          {
            this.status = false;
            this.indentId = data1["indent_id"];
            this.indentNo = data1["indent_no"];
             this.userForm.patchValue({reference_id: data1["indent_id"]});
          
            this.DropDownListService.getItemMasterPackMat(data1.item_code).subscribe(packingList=>
            { 
              this.DropDownListService.getItemPackUom(data1.item_code, data1.packing_item,this.company_name).subscribe(mat_Weight=>
              { 
                this.status = true;
                this.packingItem[k] = packingList; 
                this.addItem();
                  
                this.stock_Transfer_Item_Dtls.at(k).patchValue({
                  item_code: data1.item_code, packing: data1.packing_item, suom: data1.stock_pack_uom,
                  squantity: data1.indent_pack_qty, uom: data1.stock_item_uom, quantity: data1.indent_item_qty, price: data1.indicative_price,
                  price_based_on: data1.price_based_on, amount: data1.amount,
                  gross_amt: data1.net_amount,tax_id: data1.tax_code, tax_rate: data1.tax_rate, tax_amt: data1.tax_amount,
                  net_amt: data1.total_amount, acc_norms: data1.qc_norms, mat_wt: Number(data1.indent_item_qty - mat_Weight.empty_big_wt).toFixed(2)});
                k = k + 1;
              });      
            });  
          }            
        }

        this.RefType = this.userForm.get("ref_type").value as FormControl;
        this.DropDownListService.getStkIndOrdDtls(this.indentId).subscribe(data=>
        {
          this.userForm.patchValue({delivery_business_unit:data["business_unit"],reference:data["indent_no"]}); 

          if(this.RefType=='Stock Indent Order')
            {
              this.businesslists=null;
              this.DropDownListService.getCompBusinessUnitDiff(data["business_unit"]).subscribe(data=>
                {
                  this.businesslists = data;
                  this.status = true;   
                }); 
            }

          else
            {


            }
          this.onChangeDevBussinessUnit(data["business_unit"]);
        });
      });         
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
        if(this.userForm.get("order_point").value == null || this.userForm.get("order_point").value == 0)
        {
          alert("Please Select Order Point");
          this.status=true;
        }
        else if(this.userForm.get("ref_type").value == null || this.userForm.get("ref_type").value == 0)
        {
          alert("Please Select Reference Type");
          this.status=true;
        }
        else if(this.userForm.get("business_unit").value == null || this.userForm.get("business_unit").value == 0)
        {
          alert("Please Select Sending Business Unit");
          this.status=true;
        }
        else if(this.userForm.get("delivery_business_unit").value == null || this.userForm.get("delivery_business_unit").value == 0)
        {
          alert("Please Select Receiving Business Unit");
          this.status=true;
        }
        else if(this.userForm.get("shipment_mode").value == null || this.userForm.get("shipment_mode").value == 0)
        {
          alert("Please Select Shipment Mode");
          this.status=true;
        }
         else if((this.userForm.get("loading_point").value == null || this.userForm.get("loading_point").value == 0) && this.userForm.get("order_point").value =='Inter')
         {
           alert("Please Select Loading Point");
           this.status=true;
         }
         else if((this.userForm.get("unloading_point").value == null || this.userForm.get("unloading_point").value == 0) && this.userForm.get("order_point").value =='Inter')
         {
           alert("Please Select Unloading Point");
           this.status=true;
         }
        else if(this.userForm.get("weightment_req").value == null || this.userForm.get("weightment_req").value == 0)
        {
          alert("Please Select Weighment Required");
          this.status=true;
        }
        else if(this.userForm.get("tax_info").value == null || this.userForm.get("tax_info").value == 0)
        {
          alert("Please Select Tax Information");
          this.status=true;
        }
        else if(this.userForm.get("enway_bill").value == null || this.userForm.get("enway_bill").value == 0)
        {
          alert("Please Select Eway Bill");
          this.status=true;
        }
        else if(this.userForm.get("order_status").value == null || this.userForm.get("order_status").value == 0)
        {
          alert("Please Select Order Status");
          this.status=true;
        }
      /*  else if(this.userForm.get("reference").value == null || this.userForm.get("reference").value == 0)
        {
          alert("Please Enter Reference");
          this.status=true;
        }
        */
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

          for(let b=0;b<this.stock_Transfer_Item_Dtls.length;b++)
          {
            if(this.stock_Transfer_Item_Dtls.at(b).get("item_code").value == null || this.stock_Transfer_Item_Dtls.at(b).get("item_code").value == 0)
            {
               itemcheck = true;
            }
            if(this.stock_Transfer_Item_Dtls.at(b).get("packing").value == null || this.stock_Transfer_Item_Dtls.at(b).get("packing").value == 0)
            {
               packingcheck = true;
            }
            if(this.stock_Transfer_Item_Dtls.at(b).get("quantity").value == null || this.stock_Transfer_Item_Dtls.at(b).get("quantity").value == 0)
            {
               itemquantity = true;
            }
            if(this.stock_Transfer_Item_Dtls.at(b).get("squantity").value == null || this.stock_Transfer_Item_Dtls.at(b).get("squantity").value == 0)
            {
               packingquantity = true;
            }
            if(this.stock_Transfer_Item_Dtls.at(b).get("price").value == null || this.stock_Transfer_Item_Dtls.at(b).get("price").value == 0)
            {
               price = true;
            }
            if(this.stock_Transfer_Item_Dtls.at(b).get("price_based_on").value == null || this.stock_Transfer_Item_Dtls.at(b).get("price_based_on").value == 0)
            {
               pricebasedon = true;
            }
          }

          if(itemcheck == true)
          {
            alert("Please Select Item Name in Item Details Tab!!!");this.status = true;
          }
          else if(packingcheck == true)
          {
            alert("Please Select Packing Name in Item Details Tab!!!");this.status = true;
          }
          else if(packingquantity == true)
          {
            alert("Please Enter Packing Quantity in Item Details Tab!!!");this.status = true;
          }
          else if(itemquantity == true)
          {
            alert("Please Enter Item Quantity in Item Details Tab!!!");this.status = true;
          }
          else if(price == true)
          {
            alert("Please Enter Price in Item Details Tab!!!");this.status = true;
          }
          else if(pricebasedon == true)
          {
            alert("Please Select Price Based On in Item Details Tab!!!");this.status = true;
          }
        /*  else if(this.stock_Transfer_Trans_Info.get("trans_code").value == null || this.stock_Transfer_Trans_Info.get("trans_code").value == 0)
          {
            alert("Please Select Transporter Name in Transport information Tab!!!");
            this.status = true;
          }
          */
          else if(this.userForm.get("confirmed_by").value == null || this.userForm.get("confirmed_by").value == 0)
          {
            alert("Please Select Confirmed By in Approval Tab!!!");
            this.status = true;
          }
          else if(this.userForm.get("approval").value == null || this.userForm.get("approval").value == 0)
          {
            alert("Please Select Approved in Approval Tab!!!");
            this.status = true;
          }
          else if(this.userForm.get("reason").value == null || this.userForm.get("reason").value == 0)
          {
            alert("Please Select Reason in Approval Tab!!!");
            this.status = true;
          }
          else
          {
            if(this.Id>0)   
            {
            this.Service.updateStockTransOrders(this.userForm.getRawValue(), this.Id).subscribe( data => 
              {
                console.log(this.userForm.getRawValue());
                alert("Stock Transfer Updated successfully.");
                this.userForm.reset();
                this.status = true;
                this.ngOnInit();
                this.isHidden=false; 
                
                //Refresh Dynemic Table
                this.packingItem = [];
                this.item_sl_no = 0;
                while(this.stock_Transfer_Item_Dtls.length)
                this.stock_Transfer_Item_Dtls.removeAt(0);
                this.addItem();   

                while(this.stock_Transfer_Summary_dyn.length)
                this.stock_Transfer_Summary_dyn.removeAt(0);
                this.addAppCharges();
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
              this.ngOnInit()});    
            }

            else
            {
              this.status = false;
              this.Service.createStockTransfer(this.userForm.getRawValue()).subscribe( data => 
              {
                console.log(this.userForm.getRawValue());
                alert("New Stock Transfer created successfully.");
                this.userForm.reset();
                this.status = true;
                this.ngOnInit();
                this.isHidden=false; 
                
                //Refresh Dynemic Table
                this.packingItem = [];
                this.item_sl_no = 0;
                while(this.stock_Transfer_Item_Dtls.length)
                this.stock_Transfer_Item_Dtls.removeAt(0);
                this.addItem();   

                while(this.stock_Transfer_Summary_dyn.length)
                this.stock_Transfer_Summary_dyn.removeAt(0);
                this.addAppCharges();
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
              this.ngOnInit()});  
            }
          }

        }
        
      }
    }

    onUpdate(id:any, order_id:string,action)
    {
//this.stocktransferordersave = true;
      this.userForm.patchValue({id: id});
      this.status = false;
      this.isHidden = true;
      this.packingItem = [];
      this.selectedItemName = [];
      this.selectedPackingItem = [];
       if(action == 'view')
       {this.stocktransferordersave = false;}
       else
       {this.stocktransferordersave = true; }
      
      forkJoin(
        this.Service.retriveStkTrans(id),
        this.Service.StkTransItemRetriveList(order_id),      
        this.Service.StkTransTransferRetriveList(order_id),
        this.Service.StkTransSummaryRetriveList(order_id),
        this.Service.StkTransSummaryDtlsRetriveList(order_id),
        this.Service.StkTransResourceCostDtlsRetriveList(order_id),
        this.Service.getStkTransTerms(order_id),
        this.Service.getStockTransTermDtls(order_id),
        this.Service.getStockTransDoc(order_id)
      ).subscribe(([StkTransData, itemData,transData, summData,
        summdynData,ResourceCostdata,staticTerminationData,dynTerminationData,DocData])=>
        {
          // this.currentDate = StkTransData["order_date"];
          this.onChangeOrderPointUpdate(StkTransData["order_point"]);
          this.onChangeBussinessUnit(StkTransData["business_unit"]);
          this.onChangeDevBussinessUnit(StkTransData["delivery_business_unit"]);
          this.onChangeLoadingPoint(StkTransData["loading_point"]);
          this.onChangeshipment(StkTransData["shipment_mode"]);
          this.onCangeTaxInfo(StkTransData["tax_info"]);
console.log("chk data:"+JSON.stringify(StkTransData));
          this.userForm.patchValue({id: StkTransData["id"],order_no: StkTransData["order_no"], order_id: StkTransData["order_id"], ref_type: StkTransData["ref_type"],
            order_date: StkTransData["order_date"], order_point: StkTransData["order_point"], business_unit: StkTransData["business_unit"],
            delivery_business_unit: StkTransData["delivery_business_unit"], loading_point: StkTransData["loading_point"], unloading_point: StkTransData["unloading_point"],
            weightment_req: StkTransData["weightment_req"], tax_info: StkTransData["tax_info"], enway_bill: StkTransData["enway_bill"],passing_wt: StkTransData["passing_wt"],
            shipment_mode: StkTransData["shipment_mode"], order_status: StkTransData["order_status"],
            reference: StkTransData["reference"], remarks: StkTransData["remarks"], confirmed_by: StkTransData["confirmed_by"],billing_req: StkTransData["billing_req"],
            approval: StkTransData["approval"], reason: StkTransData["reason"], approved_remarks: StkTransData["approved_remarks"], app_chgs_id: StkTransData["app_chgs_id"],
            company_id: StkTransData["company_id"], fin_year: StkTransData["fin_year"], username: StkTransData["username"],applicable_charges_id: StkTransData["applicable_charges_id"]});
            //console.log("order Details: "+  JSON.stringify(StkTransData));

          let k = 0;
          this.addItem();
          this.item_sl_no = 0;
          while (this.stock_Transfer_Item_Dtls.length) 
          { this.stock_Transfer_Item_Dtls.removeAt(0);}
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
                this.stock_Transfer_Item_Dtls.at(k).patchValue(data1);
                k = k + 1;
              });
            }

            //console.log("transData: "+  JSON.stringify(transData));
            this.stock_Transfer_Trans_Info.patchValue(transData);

       
           // console.log("SummData: "+  JSON.stringify(summData));
            this.stock_Transfer_Summary.patchValue(summData);
            
            while (this.stock_Transfer_Summary_dyn.length) 
            this.stock_Transfer_Summary_dyn.removeAt(0);
            for(let data1 of summdynData) 
            this.addAppCharges();
            this.stock_Transfer_Summary_dyn.patchValue(summdynData);
           // console.log("chk sum discount after1::"+this.stock_Transfer_Summary.get("discount").value)
           // console.log("ResourceCostdata: "+  JSON.stringify(ResourceCostdata));
            while (this.stock_transfer_resource_cost.length) 
            this.stock_transfer_resource_cost.removeAt(0);
            for(let data1 of ResourceCostdata) 
            this.add1();
            this.stock_transfer_resource_cost.patchValue(ResourceCostdata);

          //  console.log("staticTerminationData: "+  JSON.stringify(staticTerminationData));
            this.onChangeTSTOrder(staticTerminationData["term_stk_ord"],'CFC');
            this.stock_transfer_terminations.patchValue(staticTerminationData);
         
           // console.log("chk sum discount after2::"+this.stock_Transfer_Summary.get("discount").value)
           // console.log("dynTerminationData: "+  JSON.stringify(dynTerminationData));
            this.add8();
            while (this.stock_transfer_terminations_dyn.length) 
            this.stock_transfer_terminations_dyn.removeAt(0);
            for(let data1 of dynTerminationData)
            this.add8();
            this.stock_transfer_terminations_dyn.patchValue(dynTerminationData);

            //console.log("DocData: "+  JSON.stringify(DocData));
            this.addDocument();
            while (this.stock_transfer_doc.length) 
            this.stock_transfer_doc.removeAt(0);
            for(let data1 of DocData)
            this.addDocument();
            this.stock_transfer_doc.patchValue(DocData);
          //  console.log("chk sum discount after3::"+this.stock_Transfer_Summary.get("discount").value)
            this.status = true;

          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});  
                                   
        }

        deletesummarydyn(index) 
        {
          if(index)
          {this.stock_Transfer_Summary_dyn.removeAt(index);}
          else
          {
            if(this.stock_Transfer_Summary_dyn.length>1)
            {
              this.stock_Transfer_Summary_dyn.removeAt(index);
            }
            else
            {
              alert("can't delete all rows");
            }} 
        }
        
        deleteresource(index) 
        {
          if(index)
          {this.stock_transfer_resource_cost.removeAt(index);}
          else
          {
            if(this.stock_transfer_resource_cost.length>1)
            {
              this.stock_transfer_resource_cost.removeAt(index);
            }
            else
            {
              alert("can't delete all rows");
            }} 
        }

        deletetermination(index) 
        {
          if(index)
          {this.stock_transfer_terminations_dyn.removeAt(index);}
          else
          {
            if(this.stock_transfer_terminations_dyn.length>1)
            {
              this.stock_transfer_terminations_dyn.removeAt(index);
            }
            else
            {
              alert("can't delete all rows");
            }} 
        }

     onDelete(id:any)
      {
        this.status = false;
        if(confirm("Are you sure to delete this Stock Transfer ?"))
        { 
          this.userForm.patchValue({username: localStorage.getItem("username")});
          this.Service.deleteStocktransferOrder(this.userForm.getRawValue(),id).subscribe(data=> 
          {        
            console.log("Cat id:"+data.order_id);

            if(data.order_id=='' || data.order_id==null)
            {
              alert("Opps!!! Can't delete this Stock Transfer !!!");
            }else{
              alert("This Stock Transfer Deleted successfully.");
            }
            this.status = true;
            this.ngOnInit()
          }); 
        }  
        this.status = true;
      }
  }
