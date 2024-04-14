import { Component, OnInit } from '@angular/core';
import { Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Sales_Quotation, sales_Quotation_Item_Dtls } from '../../../../../../Models/SalesTransaction/Sales_Quotation';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { SalesInvoice } from '../../../../../../Models/SalesTransaction/SalesInvoice';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-billof-supply-print-popup',
  templateUrl: './billof-supply-print-popup.component.html',
  styleUrls: ['./billof-supply-print-popup.component.scss']
})
export class BillofSupplyPrintPopupComponent implements OnInit {

  Invoice_Id:any;
  MainId:any;
  public userForm:FormGroup;
  status:any;
  PrintMode:any=[];
  broker_sl_no = 1; 
  transporter_sl_no = 1;
  StateName:any;
  Original_bill:any;
  Duplicate_bill:any;
  Triplicate_bill:any;
  Party:any;
  gst_no:any;
  email:any;
  website:any;
  company_name:any;
  company_name1:any;
  cin_no:any;
  work_address:any;
  pin_no:any;
  state_name:any;
  city_name:any;
  businessUnit:any;

  constructor( private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,public dialog: MatDialog,
    private dialogRef: MatDialogRef<BillofSupplyPrintPopupComponent>, @Inject(MAT_DIALOG_DATA)data)
  { 
      
    this.Invoice_Id = data.InvoiceId;
    this.MainId = data.MainId;
    this.StateName = data.StateName;
    this.Party =data.Party;

    this.onUpdate(this.MainId,this.Invoice_Id);

    //bill option
  
    this.PrintMode = data.PrintMode.split(',');  
   // alert(" JSON : "+JSON.stringify(this.PrintMode))

    for(let i=0;i<this.PrintMode.length;i++) 
    {
       //alert("Split array :" +this.PrintMode[i]);
    }

   // alert(this.PrintMode)
    // this.Original_bill = data.Original_bill;
    // this.Duplicate_bill = data.Duplicate_bill;
    // this.Triplicate_bill = data.Triplicate_bill;
     // alert("Original_bill : "+this.Original_bill+"Duplicate_bill : "+ this.Duplicate_bill+"Triplicate_bill : "+this.Triplicate_bill)
  
    }

  get sales_Invoice_Payment_Dtls() { return this.userForm.get('sales_Invoice_Payment_Dtls') as FormGroup; }
  get sales_Invoice_Shipment_Dtls() { return this.userForm.get('sales_Invoice_Shipment_Dtls') as FormGroup; }
  get sales_Invoice_Tax_Info() { return this.userForm.get('sales_Invoice_Tax_Info') as FormGroup; }
  get sales_Invoice_Broker_Dtls(){return this.userForm.get("sales_Invoice_Broker_Dtls") as FormArray}; 
  get sales_Invoice_Item_Dtls(){return this.userForm.get("sales_Invoice_Item_Dtls") as FormArray};
  get sales_Invoice_Trans_Dtls(){return this.userForm.get("sales_Invoice_Trans_Dtls") as FormArray}; 
  get sales_Invoice_Docs(){return this.userForm.get("sales_Invoice_Docs") as FormArray};
  get item_groupwise_summ(){return this.userForm.get("item_groupwise_summ") as FormArray};
  get item_groupwise_taxsumm(){return this.userForm.get("item_groupwise_taxsumm") as FormArray};
  get sales_Invoice_BP_Dtls() { return this.userForm.get('sales_Invoice_BP_Dtls') as FormGroup; }


  _invoice_no:any;
  ngOnInit() {

    //this._invoice_no = "123456";

  }

  item_sl_no = 1; 
  addItem()
  {
    this.item_sl_no =this.item_sl_no +1;
    this.sales_Invoice_Item_Dtls.push(this.fb.group({
      slno: this.item_sl_no,
      item_code:'',
      item_group:'',
      packing:'',
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
    this.sales_Invoice_Item_Dtls.at(this.item_sl_no - 1).patchValue({squantity: 0, quantity: 0,
      mat_wt: 0, price: 0, price_based_on: "0", discount_rate: 0, discount_type: "0", 
      tax_rate: 0, amount: 0.00, discount_amt: 0.00, tax_amt: 0.00});
  }











  _invoice_date:any;
  _salesorderno:any;
  _refchallanno:any;
  _refchallandate:any;
  _partyname:any;
  _vehicleno:any=[];
  _vehicleno_ = "";
  _ewaybillno_ ="";
  _slno_ = "";
  _slno:any;
  _ewaybillno:any;
  _e_invoice_no:any;
  _shipdtls:any;
  _paytodtls:any;
  _gstno:any;
  _item_name_= "";
  _item_name:any;
  _hsn_code_ = "";
  _hsn_code:any;
  _price_based_on_= "";
  _quantity_="";
  _uom_="";
  _quantity:any;
  _uom:any;
  _squantity_="";
  _suom_="";
  _squantity:any;
  _suom:any;
  ItemAllData:any=[];
  HsnAllData:any=[];
  TaxSummAllData:any=[];
  SubTotal:any;
  Statename:any;
  _tax_total:any;
  _totalamt:any;
  Cgst:any;
  Sgst:any;
  _roundoff_amt:any;
  _payable_amt:any;
  _payable_amt_words:any;
  _tcsamt:any;
  netAmount:any;
  Buunit:any;
  TotalCgst:any;
  TaxableAmt:any;
  NewTotalCgst:any;
  NewSgst:any;
  TotalSgst:any;
  Grandtotaltax:any;
  TotalIgst:any;
  _party:any;
  _shipaddr:any;
  ShipDetails:any=[];
 

  onUpdate(id,Invoice_Id)
  {
    this.company_name=localStorage.getItem("company_name");
    forkJoin(
      this.Service.retriveSalesInv(this.MainId),
      this.Service.getSalesInvItmDtls(this.Invoice_Id),      
       this.Service.getSalesInvTaxInfo(this.Invoice_Id),
      // this.Service.getSalesInvBpDtls(this.Invoice_Id),
       this.Service.getSalesInvTransDtls(this.Invoice_Id),
      this.Service.getSalesInvShipmentDtls(this.Invoice_Id),
      this.Service.getInvHsnSum(this.Invoice_Id),
      this.Service.getInvTaxSum(this.Invoice_Id),
      this.Service.custStatutoryRetriveList(this.Party),
      this.DropDownListService.getCompanyDetails(this.company_name)
    
    ).subscribe(([SalesInvoiceData,Itemdata,TaxData ,TransData,ShipmentData,Hsndata,TaxSummData,Taxgstno,compdetails])=>
      {
         // console.log(JSON.stringify(compdetails))
         this.company_name1=compdetails.company_name;
         this.cin_no=compdetails.tin_no;
         this.gst_no=compdetails.gstin_no;
         this.email=compdetails.email_id;
         this.website=compdetails.website_name;
         this.work_address=compdetails.work_address;

        console.log("ShipmentData : "+ JSON.stringify(ShipmentData))
        this._party = SalesInvoiceData["partyname"];
        this._invoice_no = SalesInvoiceData["invoice_no"];
        this._tax_total = Number(SalesInvoiceData["tax_total"]).toFixed(2);
        this._roundoff_amt = SalesInvoiceData["roundoff_amt"];
        this.Cgst = (this._tax_total/2).toFixed(2);
        this.Sgst =  this.Cgst;
       
        this._invoice_date = SalesInvoiceData["invoice_date"];
        this._salesorderno = SalesInvoiceData["salesorderno"];
       this._refchallanno = SalesInvoiceData["refchallanno"];
       this._refchallandate = SalesInvoiceData["refchallandate"];
       this._partyname = SalesInvoiceData["partyname"];
       this._e_invoice_no = SalesInvoiceData["e_invoice_no"];
       this._gstno = Taxgstno["gst_no"];
       this._payable_amt = Number(SalesInvoiceData["payable_amt"]).toFixed(2);
       this._payable_amt_words=SalesInvoiceData["payable_amt_inword"];
       this._tcsamt = Number(SalesInvoiceData["tcsamt"]).toFixed(2);
       this.netAmount = (this._payable_amt - this._tcsamt).toFixed(2);
       this.Statename = SalesInvoiceData["state"];
       this.ItemAllData =Itemdata;
       this.HsnAllData = Hsndata;
       console.log(" TaxSummData: "+JSON.stringify(TaxSummData) )
       this.TaxSummAllData = TaxSummData;

       let m =0;
       this.TaxableAmt =0;
       this.TotalCgst = 0;
       this.TotalSgst = 0;
       this.TotalIgst = 0;
       for(let data1 of TaxSummData)
       {
         this.TaxableAmt += Number(data1.taxable_amt);     
         this.TotalCgst +=(Number(data1.cgst));
         this.TotalSgst += (Number(data1.sgst));
         this.TotalIgst += (Number(data1.igst));
         m=m+1;
       }

       this.TaxableAmt =this.TaxableAmt.toFixed(2)
       this.NewTotalCgst=this.TotalCgst.toFixed(2);
       this.NewSgst =this.TotalSgst.toFixed(2);
       this.TotalIgst =  this.TotalIgst.toFixed(2);
       this.Grandtotaltax =(Number (this.NewTotalCgst) + Number(this.NewSgst)).toFixed(2);

       this.DropDownListService.getCompanyBUAddress(SalesInvoiceData["business_unit"]).subscribe(data=>{
         this.Buunit = data["add"];
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....")});

        this.SubTotal =0;
       let j = 0;
       for(let data1 of Itemdata)
       { 

        this.SubTotal = Number(this.SubTotal)  + Number(data1.amount - data1.discount_amt);
         this._slno_ =data1.slno;
         this._item_name_ = data1.item_name;
         this._hsn_code_ = data1.hsn_code;
         this._price_based_on_ = data1.price_based_on;
         this._quantity_ = data1.quantity;
         this._uom_ = data1.uom;
         this._squantity_ = data1.squantity;
         this._suom_ = data1.suom;
         
        //this._ewaybillno_ = data1.ewaybillno;
         j = j + 1;
       }
       
       if( this._price_based_on_ =="Item")
       {
        this._quantity = this._quantity_;
        this._uom = this._uom_;
       }

       else
       {
          this._uom =this._suom_;
          this._quantity = this._squantity_ ;
       }

       this._slno = this._slno_;
       this._item_name = this._item_name_;
       this._hsn_code =  this._hsn_code_;

       let k = 0;
       for(let data1 of TransData)
       { 
         this._vehicleno_ =data1.vehicleno;
         this._ewaybillno_ = data1.ewaybillno;
         k = k + 1;
       }
       this._vehicleno = this._vehicleno_;
       this._ewaybillno = this._ewaybillno_;    
       this._shipaddr =   ShipmentData["shipaddr"];

       this.ShipDetails =ShipmentData["shipdtls"].split(",");      
       let ship='';
        for(let n=1;n<this.ShipDetails.length;n++)
        {
          ship =ship+this.ShipDetails[n]+",";   
        }
       this._shipdtls = ship.substring(0,ship.length-1);
       this._paytodtls = ShipmentData["paytodtls"];
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});                            
  }   

  SendDataToDifferentComponenet()
  {
    
  }

}
