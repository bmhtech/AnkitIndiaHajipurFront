import { Component, OnInit } from '@angular/core';
import { Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Sales_Quotation, sales_Quotation_Item_Dtls } from '../../../../../../Models/SalesTransaction/Sales_Quotation';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Salesbillprintoptions } from '../../../../../../Models/SalesTransaction/salesbillprintoptions';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { forkJoin } from 'rxjs';
import { SalesBillPrintPopupComponent } from '../sales-bill-print-popup/sales-bill-print-popup.component';
import { BillofSupplyPrintPopupComponent } from '../billof-supply-print-popup/billof-supply-print-popup.component';
import { SaleinvoicejobworkprintComponent } from '../saleinvoicejobworkprint/saleinvoicejobworkprint.component';
import { SaleinvoicereviseprintComponent } from '../saleinvoicereviseprint/saleinvoicereviseprint.component';

@Component({
  selector: 'app-sales-bill-print-options-popup',
  templateUrl: './sales-bill-print-options-popup.component.html',
  styleUrls: ['./sales-bill-print-options-popup.component.scss']
})
export class SalesBillPrintOptionsPopupComponent implements OnInit {

  public userForm:FormGroup;
  model: Salesbillprintoptions = new Salesbillprintoptions();
  submitted = false;
  isHidden:any;
  Invoice_Id:any;
  MainId:any;
  StateName:any;
  Invoice_type:any;
  Party:any;
  business_unit:any;

    constructor( private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,public dialog: MatDialog,
    private dialogRef: MatDialogRef<SalesBillPrintOptionsPopupComponent>, @Inject(MAT_DIALOG_DATA)data)
  { 
    this.userForm=fb.group({       
      original_bill: [''],
      duplicate_bill: [''],
      triplicate_bill:[''],
      original_bill1: [''],
      duplicate_bill1: [''],
      triplicate_bill1:[''],
      select_all:['']
    });

    this.Invoice_Id = data.InvoiceId;
    this.MainId = data.MainId;
    this.StateName = data.StateName;
    this.Invoice_type = data.Invoice_type;
    this.Party = data.Party;
    this.business_unit=data.business_unit;
  }

  get select_all(){ return this.userForm.get("select_all") as FormControl }
  get original_bill(){ return this.userForm.get("original_bill") as FormControl }
  get duplicate_bill(){ return this.userForm.get("duplicate_bill") as FormControl }
  get triplicate_bill(){ return this.userForm.get("triplicate_bill") as FormControl }
  get original_bill1(){ return this.userForm.get("original_bill1") as FormControl }
  get duplicate_bill1(){ return this.userForm.get("duplicate_bill1") as FormControl }
  get triplicate_bill1(){ return this.userForm.get("triplicate_bill1") as FormControl }

  ngOnInit() {
  }

  onChangeSelectAll(event)
  {
    if(event)
    {
      this.userForm.patchValue({original_bill:true});
      this.userForm.patchValue({duplicate_bill:true,triplicate_bill:true});
    }
     else
     {
      this.userForm.patchValue({original_bill:false,duplicate_bill:false,triplicate_bill:false});
     }
  }


  SendDataToDifferentComponenet()
  {
 
    let PrintMode = "";
    let Original_bill =this.userForm.get("original_bill").value;
    let Duplicate_bill =this.userForm.get("duplicate_bill").value;
    let Triplicate_bill =this.userForm.get("triplicate_bill").value;
    if(Original_bill==true)
    {
      this.userForm.patchValue({original_bill1:"Original For Receiver"});
      
      PrintMode =PrintMode+"Original For Receiver,";
    }
    else
    {
      this.userForm.patchValue({original_bill1:""});
    }
    if(Duplicate_bill==true)
    {
      this.userForm.patchValue({duplicate_bill1:"Duplicate For Transporter"});
      PrintMode =PrintMode+"Duplicate For Transporter,";
    }
    else
    {
      this.userForm.patchValue({duplicate_bill1:""});
    }
    if(Triplicate_bill==true)
    {
      this.userForm.patchValue({triplicate_bill1:"Triplicate For SUppliers"});
      PrintMode =PrintMode+"Triplicate For Suppliers,";
    }
    else
    {
      this.userForm.patchValue({triplicate_bill1:""});
    }
    PrintMode=PrintMode.substring(0,PrintMode.length-1);
    let original_bill1 =this.userForm.get("original_bill1").value;
    let Duplicate_bill1 =this.userForm.get("duplicate_bill1").value;
    let Triplicate_bill1 =this.userForm.get("triplicate_bill1").value; 
  //  alert("concate: " +PrintMode);
  console.log("PrintMode "+PrintMode)
  if(this.Invoice_type=='BOSP00001')
  {
  
    this.dialogRef.close(this.userForm.value);  
    const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {StateName:this.StateName ,MainId: this.MainId, InvoiceId:this.Invoice_Id ,PrintMode:PrintMode,Original_bill:original_bill1,Duplicate_bill:Duplicate_bill1,Triplicate_bill:Triplicate_bill1,Party:this.Party};
      let dialogRef = this.dialog.open(BillofSupplyPrintPopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe( data => 
      {
       // this.sales_Invoice_Item_Dtls.at(index).patchValue({acc_norms: data["qc_code"]});
      }); 
  }
  else
  {
//console.log("Invoice_type::"+this.Invoice_type)
    if(this.Invoice_type == "INV00003")
    {
     // console.log("business_unit::"+this.business_unit)
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {MainId: this.MainId,invoiceid:this.Invoice_Id,business_unit:this.business_unit, PrintMode:PrintMode};
      let dialogRef = this.dialog.open(SaleinvoicejobworkprintComponent, dialogConfig);
        dialogRef.afterClosed().subscribe( data =>
        {

        });
    }
    else
    {
      this.dialogRef.close(this.userForm.value);  
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      
      dialogConfig.data = {StateName:this.StateName ,MainId: this.MainId, InvoiceId:this.Invoice_Id ,PrintMode:PrintMode,Original_bill:original_bill1,Duplicate_bill:Duplicate_bill1,Triplicate_bill:Triplicate_bill1,Party:this.Party,business_unit:this.business_unit};
     // let dialogRef = this.dialog.open(SalesBillPrintPopupComponent, dialogConfig);
    //let dialogRef = this.dialog.open(SaleinvoicereviseprintComponent, dialogConfig);


    let dialogRef = this.dialog.open(SaleinvoicereviseprintComponent, {data:  {StateName:this.StateName ,MainId: this.MainId, InvoiceId:this.Invoice_Id ,PrintMode:PrintMode,Original_bill:original_bill1,Duplicate_bill:Duplicate_bill1,Triplicate_bill:Triplicate_bill1,Party:this.Party,business_unit:this.business_unit}, height: '80%',
    width: '90%'});
      dialogRef.afterClosed().subscribe( data => 
      {
       // this.sales_Invoice_Item_Dtls.at(index).patchValue({acc_norms: data["qc_code"]});
      });
  

    }
  }  
 }
}
