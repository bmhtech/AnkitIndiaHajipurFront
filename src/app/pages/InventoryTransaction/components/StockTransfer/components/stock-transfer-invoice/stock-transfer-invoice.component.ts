import { Component, OnInit } from '@angular/core';
import { Master } from '../../../../../../service/master.service';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { StockTransferInvoice} from '../../../../../../models/StockTransfer/stock-transfer-invoice';
import { StockQcPopupComponent } from '../stock-qc-popup/stock-qc-popup.component';
import { StockTaxPopupComponent } from '../stock-tax-popup/stock-tax-popup.component';
import { StockTransferChallanPopUpComponent } from '../../components/stock-transfer-challan-pop-up/stock-transfer-challan-pop-up.component';
import { timer } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';

  @Component({
    selector: 'app-stock-transfer-invoice',
    templateUrl: './stock-transfer-invoice.component.html',
    styleUrls: ['./stock-transfer-invoice.component.scss']})

  export class StockTransferInvoiceComponent implements OnInit 
  {
    model: StockTransferInvoice = new StockTransferInvoice();
    submitted = false;
    isHidden = false;
    basiss:{};
    company_name:any;
    stock_invoice_no:any;
    listStockTransferInvoice : StockTransferInvoice[];
    item_codes:{};
    trans_codes:{};
    businesslists:{};
    status:boolean;
    payment_termsList:{};
    packingItem:any=[];
    item_sl_no = 1; 
    ledgerNames:any=[];
    currentDate:any;
    public userForm:FormGroup;

    constructor(public fb:FormBuilder, public dialog: MatDialog,
      private Service : Master,private DropDownListService: DropdownServiceService)
    {
      this.userForm=fb.group(
      {
        stk_invoice_no:[''],
        stk_invoice_date:[''],
        business_unit:[''],
        payment_terms:[''],
        stk_invoice_order_no:[''],
        pay_due_days:[''],
        trans_code:[''],  
        narration:[''],
        remarks:[''],
        grand_total:[''],
        item_total:[''],
        item_total_gl_ac:[''],
        tax_total:[''],
        tax_total_gl_ac:[''],
        transporter_amt:[''],
        transporter_gl_ac:[''],
        applicable_amt:[''],
        applicable_gl_ac:[''],
        roundoff_amt:[''],
        roundoff_gl_ac:[''],
        adj1_amt:[''],
        adj1_gl_ac:[''],
        adj2_amt:[''],
        adj2_gl_ac:[''],
        net_r_value:[''],
        net_gl_ac:[''],
        company_id:[''],
        fin_year:[''],
        username:[''],

        stk_Transfer_Invoice_Docs: this.fb.array([this.fb.group({
          doc_name:''})]),

        stk_Transfer_Invoice_Item_Dtls: this.fb.array([this.fb.group({
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
          acc_norms:''})]),

        stk_Transfer_Invoice_Tax_Info: this.fb.group
        ({ 
          pan_no:'',
          gst_no: '',
          cst_no:'', 		
          servicetax_no: '',
          tin_no:''}),

        stk_Transfer_Invoice_Bu_Dtls: this.fb.group({ 
          businessunit_name: '',
          mobile_no: '',
          email_id: '',
          work_address: ''}),           
      });
    }

    get stk_invoice_no(){ return this.userForm.get("stk_invoice_no") as FormControl }
    get stk_invoice_date(){ return this.userForm.get("stk_invoice_date") as FormControl }
    get business_unit(){ return this.userForm.get("business_unit") as FormControl }
    get payment_terms(){ return this.userForm.get("payment_terms") as FormControl }
    get stk_invoice_order_no(){ return this.userForm.get("stk_invoice_order_no") as FormControl }
    get pay_due_days(){ return this.userForm.get("pay_due_days") as FormControl }
    get trans_code(){ return this.userForm.get("trans_code") as FormControl }
    get narration(){ return this.userForm.get("narration") as FormControl }
    get remarks(){ return this.userForm.get("remarks") as FormControl }
    get grand_total(){ return this.userForm.get("grand_total") as FormControl }      
    get item_total(){ return this.userForm.get("item_total") as FormControl }
    get item_total_gl_ac(){ return this.userForm.get("item_total_gl_ac") as FormControl }
    get tax_total(){ return this.userForm.get("tax_total") as FormControl }
    get tax_total_gl_ac(){ return this.userForm.get("tax_total_gl_ac") as FormControl }
    get transporter_amt(){ return this.userForm.get("transporter_amt") as FormControl }
    get transporter_gl_ac(){ return this.userForm.get("transporter_gl_ac") as FormControl }
    get applicable_amt(){ return this.userForm.get("applicable_amt") as FormControl }
    get applicable_gl_ac(){ return this.userForm.get("applicable_gl_ac") as FormControl }
    get roundoff_amt(){ return this.userForm.get("roundoff_amt") as FormControl }
    get roundoff_gl_ac(){ return this.userForm.get("roundoff_gl_ac") as FormControl }
    get adj1_amt(){ return this.userForm.get("adj1_amt") as FormControl }
    get adj1_gl_ac(){ return this.userForm.get("adj1_gl_ac") as FormControl }
    get adj2_amt(){ return this.userForm.get("adj2_amt") as FormControl }
    get adj2_gl_ac(){ return this.userForm.get("adj2_gl_ac") as FormControl }
    get net_r_value(){ return this.userForm.get("net_r_value") as FormControl }
    get net_gl_ac(){ return this.userForm.get("net_gl_ac") as FormControl }    
    get stk_Transfer_Invoice_Tax_Info() { return this.userForm.get('stk_Transfer_Invoice_Tax_Info') as FormGroup; }
    get stk_Transfer_Invoice_Item_Dtls(){return this.userForm.get("stk_Transfer_Invoice_Item_Dtls") as FormArray};
    get stk_Transfer_Invoice_Docs(){return this.userForm.get("stk_Transfer_Invoice_Docs") as FormArray};
    get stk_Transfer_Invoice_Bu_Dtls() { return this.userForm.get('stk_Transfer_Invoice_Bu_Dtls') as FormGroup; }

    ngOnInit() 
    {
      this.empty_bag_wt = [];
      this.capacity = [];
      this.packingItem = [];
      this.DropDownListService.getAccPayTerms().subscribe(data=>{this.payment_termsList  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
      this.DropDownListService.custometrBusList(this.company_name).subscribe(data=>{this.businesslists  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});     
      this.Service.getStockTransferInvoices().subscribe(data=>{this.listStockTransferInvoice  = data; }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});    
      this.DropDownListService.ledgerNameList().subscribe(data=>{this.ledgerNames  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
      this.company_name = localStorage.getItem("company_name");
      this.basiss=["%","UOM"];
      this.DropDownListService.itemNamesList().subscribe(data=>{this.item_codes = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
      this.DropDownListService.getSequenceId("STIN").subscribe(data=>{this.stock_invoice_no = data.sequenceid;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});    
      this.DropDownListService.transporterNamesList().subscribe(data=>{this.trans_codes = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});    
      //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      this.status = true;
    }

    showList(s:string)
    {
      if(s=="add")
      {this.isHidden=true;}
      if(s=="list")
      {this.isHidden=false;}
    }

    addItem()
    {
      this.item_sl_no =this.item_sl_no +1;    
      this.stk_Transfer_Invoice_Item_Dtls.push(this.fb.group({
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
        acc_norms:''}))
    }

    deleteItem(index) 
    {
      if(this.item_sl_no > 1)
      { 
        this.stk_Transfer_Invoice_Item_Dtls.removeAt(index);
        this.item_sl_no = this.item_sl_no - 1;
        this.packingItem[index + 1] = this.packingItem[index];
      }
      else
      {
        this.item_sl_no = 1;
        alert("can't delete all rows");
        this.stk_Transfer_Invoice_Item_Dtls.reset();
        this.stk_Transfer_Invoice_Item_Dtls.at(0).patchValue({slno:  this.item_sl_no});
        this.packingItem[index] = [];
      } 
      
      for(let i=1; i<=this.item_sl_no; i++)
        this.stk_Transfer_Invoice_Item_Dtls.at(i-1).patchValue({slno: i});    
        
      this.calculateNetAmt();
    }

    addDocument()
    {
      this.stk_Transfer_Invoice_Docs.push(this.fb.group({
        doc_name:'' }))
    }

    deleteDocument(index)
    {
      if(index)
      { this.stk_Transfer_Invoice_Docs.removeAt(index);}
      else
      {
        alert("Can not delete all rows");
        this.stk_Transfer_Invoice_Docs.reset();
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
          { this.stk_Transfer_Invoice_Item_Dtls.at(index).patchValue({uom:data.description}); });
          
          this.DropDownListService.getItemMasterPackMat(event.target.value).subscribe(data1=>{   
          this.packingItem[index] = data1; });

          this.DropDownListService.retriveItemMasterStatInfo(event.target.value,this.company_name).subscribe(data=>{   
          this.stk_Transfer_Invoice_Item_Dtls.at(index).patchValue({tax_code:data[0].tax_code, tax_rate:data[0].tax_rate}); });
    
          this.DropDownListService.getItemQCDetails(event.target.value,this.company_name).subscribe(data=>{   
          this.stk_Transfer_Invoice_Item_Dtls.at(index).patchValue({acc_norms:data[0].qc_code}); });  
        });
        this.status = true;
      }
    }

    capacity:any = [];
    itemId: any;
    packingQty:any;
    empty_bag_wt:any = [];
    onChangePackingItem(index,event)
    {
      if(event)
      {
        this.status = false;
        this.itemId =  this.stk_Transfer_Invoice_Item_Dtls.at(index).get("item_code").value as FormControl;
        this.DropDownListService.getItemPackUom(this.itemId, event.target.value,this.company_name).subscribe(data=>
        {  
          this.capacity[index] = data.capacity; 
          this.empty_bag_wt[index] = data.empty_big_wt;
          this.stk_Transfer_Invoice_Item_Dtls.at(index).patchValue({suom: data.uom1}); });
        this.status = true;
      }
    }

    calItemQty(packing_qty, index)
    {
      let itemQty = this.capacity * packing_qty.target.value;
      this.stk_Transfer_Invoice_Item_Dtls.at(index).patchValue({quantity: itemQty, mat_wt: itemQty - this.empty_bag_wt[index]});
    }

    _mrp:any;
    _taxrate:any;
    _item_qty:any;
    _packing_qty:any;
    _taxAmt:any;
    amt:any;
    totalAmt:any;
    onChangePriceBasedOn(price_based_on, index)
    {
      this._mrp = this.stk_Transfer_Invoice_Item_Dtls.at(index).get("price").value as FormControl;
      this._taxrate = this.stk_Transfer_Invoice_Item_Dtls.at(index).get('tax_rate').value as FormControl;
      if(price_based_on.target.value == "Packing")
      {
        this._packing_qty = this.stk_Transfer_Invoice_Item_Dtls.at(index).get("squantity").value as FormControl;
        this.amt = this._mrp * this._packing_qty;
      }
      if(price_based_on.target.value == "Item")
      {
        this._item_qty = this.stk_Transfer_Invoice_Item_Dtls.at(index).get("quantity").value as FormControl;
        this.amt = this._mrp * this._item_qty;
      }
      this._taxAmt = this.amt *(this._taxrate/100);
      let totalAmt = this._taxAmt + this.amt;
      this.stk_Transfer_Invoice_Item_Dtls.at(index).patchValue({amount: Math.round(this.amt * 100)/100, 
        tax_amt: Math.round(this._taxAmt * 100)/100, total_amt: Math.round(totalAmt * 100)/100});
      this.calculateNetAmt()
      // timer(3000).subscribe(data=>{this.calculateNetAmt()}); 
    }

    totalNetAmt:any;
    calculateNetAmt()
    {
      let tolatAmt = 0, totaltTaxAmt = 0;
      this.totalNetAmt = 0;
      for(let index = 0; index<this.stk_Transfer_Invoice_Item_Dtls.length; index++)
      {
        this.amt = this.stk_Transfer_Invoice_Item_Dtls.at(index).get("amount").value as FormControl;
        tolatAmt = tolatAmt + this.amt;
        this._taxAmt = this.stk_Transfer_Invoice_Item_Dtls.at(index).get("tax_amt").value as FormControl;
        totaltTaxAmt = totaltTaxAmt + this._taxAmt;
        this.totalAmt = this.stk_Transfer_Invoice_Item_Dtls.at(index).get("total_amt").value as FormControl;
        this.totalNetAmt = this.totalNetAmt + this.totalAmt;
      }
      this.userForm.patchValue({grand_total: Math.round(this.totalNetAmt * 100)/100, item_total: Math.round(tolatAmt * 100)/100, tax_total: Math.round(totaltTaxAmt * 100)/100})
      this.calRoundOfFigure(this.totalNetAmt + this.a_amt + this.t_amt +  this.adj1 -  this.adj2)
    }

    t_amt = 0;
    a_amt = 0;
    adj1 = 0;
    adj2 = 0;
    calNetAmt(event, types_of_amt:string)
    {
      if(types_of_amt == 'adj2_amt')
      {
        this.adj2 = 0;
        this.adj2 = parseFloat(event.target.value)
      }
      if(types_of_amt == 'adj1_amt')
      {
        this.adj1 = 0;
        this.adj1 = parseFloat(event.target.value)
      }
      if(types_of_amt == 'transporter_amt')
      {
        this.t_amt = 0;
        this.t_amt = parseFloat(event.target.value)
      }
      if(types_of_amt == 'applicable_amt')
      {
        this.a_amt = 0;
        this.a_amt = parseFloat(event.target.value)
      }
      this.calRoundOfFigure(this.totalNetAmt + this.a_amt + this.t_amt +  this.adj1 -  this.adj2);
    }

    calRoundOfFigure(totalamount)
    {
      let netAmt = Math.floor(totalamount)
      let roundOfAmt = Math.round(totalamount * 100) % 100;
      if(roundOfAmt >= 50)
      {
        netAmt = Math.ceil(totalamount);
        roundOfAmt = 100 - roundOfAmt;
        this.userForm.patchValue({roundoff_amt: roundOfAmt, net_r_value: netAmt})
      }
      else
      this.userForm.patchValue({roundoff_amt: 0 - roundOfAmt, net_r_value: netAmt})
    }

    businessUnitId = '0'
    onChangeBusinessUnit(b_id:string)
    {
      this.stk_Transfer_Invoice_Tax_Info.patchValue({pan_no: null, tin_no: null,
        gst_no: null, cst_no: null, servicetax_no: null});
      this.stk_Transfer_Invoice_Bu_Dtls.patchValue({businessunit_name: null,
        mobile_no: null, email_id: null, work_address: null})
      if(b_id != "0")
      {
        this.businessUnitId = b_id;
        this.status = false;
        this.DropDownListService.getCompanyBUAddress(b_id).subscribe(Data=>
        {
          this.stk_Transfer_Invoice_Tax_Info.patchValue({pan_no: Data.pan_no, tin_no: Data.tin_no,
            gst_no: Data.gstin_no, cst_no: Data.cst_no, servicetax_no: Data.servicetax_no});
          this.stk_Transfer_Invoice_Bu_Dtls.patchValue({businessunit_name: Data.businessunit_name,
            mobile_no: Data.mobile_no, email_id: Data.email_id, work_address: Data.work_address+", "+Data.city_name+
            ", "+Data.state_name+", "+Data.country_name+", "+Data.pin_code});
          this.status = true;
        })
      }
     } 
       
    showPopUp2(index)
    {
      this.itemId = this.stk_Transfer_Invoice_Item_Dtls.at(index).get('item_code').value as FormControl;    
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index, item_code: this.itemId};
      const dialogRef = this.dialog.open(StockQcPopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe( data => 
      {
        this.stk_Transfer_Invoice_Item_Dtls.at(index).patchValue({acc_norms: data["qc_code"],});
      }); 
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
        this.stk_Transfer_Invoice_Item_Dtls.at(index).patchValue({tax_code: data["tax_id"], tax_rate: data["tax_rate"]});
      }); 
    }
  
    challanId:any;
    showAddRow = true;
    openStockTransferChallan()
    {
      if(this.businessUnitId != '0')
      {
        const dialogRef = this.dialog.open(StockTransferChallanPopUpComponent, {data:{bussinessUnit_id: this.businessUnitId, file_name: "stock_transfer_invoice", date: this.currentDate}});
        dialogRef.afterClosed().subscribe(data => 
        {
          if(data["stk_challan_id"] != "0" && data["stk_challan_id"] != '' && data["stk_challan_id"] != undefined)
          {
            this.challanId = data["stk_challan_id"];
            let k = 0;
            this.packingItem = [];
            this.showAddRow = false;
            this.addItem();
            this.item_sl_no = 0;
            while(this.stk_Transfer_Invoice_Item_Dtls.length)
            this.stk_Transfer_Invoice_Item_Dtls.removeAt(0);

            for(let data1 of data.stk_challan__Item_Dtls)
            {
              if(data1.checkbox == true)
              {
                this.status = true;
                this.DropDownListService.getItemMasterPackMat(data1.item_code).subscribe(packingList=>
                {
                  this.status = true;
                  this.packingItem[k] = packingList;
                  this.challanId = data1.stk_challan_id;
                  this.addItem();
                  this.stk_Transfer_Invoice_Item_Dtls.at(k).patchValue(data1);
                  k = k + 1;
                  do
                  {
                    this.calculateNetAmt();
                    this.DropDownListService.getStkTransChallanTranInfo(this.challanId).subscribe(data=>
                      {this.userForm.patchValue({trans_code: data.trans_code, payment_terms: data.payment_term})});
                  }
                  while(this.stk_Transfer_Invoice_Item_Dtls.at(k).get("total_amt").value as FormControl != data1.total_amt);
                })
              }
            }
          }
        }); 
      }
      else
      alert("Select Business Unit First!...");
    }

    send()
    {
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
        this.Service.createStockTransferInvoice(this.userForm.getRawValue()).subscribe( data => 
        {
          console.log(this.userForm.value);
          alert("New Stock Transfer Invoice created successfully.");
          this.userForm.reset();
          this.status = true;
          //Refresh List
          this.Service.getStockTransferInvoices().subscribe(data=>{this.listStockTransferInvoice  = data; }); 
          this.DropDownListService.getAccPayTerms().subscribe(data=>{this.payment_termsList  = data;});
          this.DropDownListService.custometrBusList(this.company_name).subscribe(data=>{this.businesslists  = data;});   
          this.DropDownListService.ledgerNameList().subscribe(data=>{this.ledgerNames  = data;});
          this.basiss=["%","UOM"];
          this.DropDownListService.itemNamesList().subscribe(data=>{this.item_codes = data;});
          this.DropDownListService.getSequenceId("STIN").subscribe(data=>{this.stock_invoice_no = data.sequenceid;}); 
          this.DropDownListService.transporterNamesList().subscribe(data=>{this.trans_codes = data;}); 
          //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
          this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
          //Refresh Dynemic Table
          this.packingItem = [];
          this.item_sl_no = 0;
          while(this.stk_Transfer_Invoice_Item_Dtls.length)
          this.stk_Transfer_Invoice_Item_Dtls.removeAt(0);
          this.addItem();

          while(this.stk_Transfer_Invoice_Docs.length)
          this.stk_Transfer_Invoice_Docs.removeAt(0);
          this.addDocument();              
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});         
      }  
    }
  }
