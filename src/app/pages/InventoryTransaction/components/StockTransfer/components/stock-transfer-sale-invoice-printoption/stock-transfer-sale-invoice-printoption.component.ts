import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StockTransferSaleInvoicePrintoption } from '../../../../../../Models/StockTransfer/stockTransferSaleInvoicePrintoption';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { StockTransferSaleInvoicePrintComponent } from '../stock-transfer-sale-invoice-print/stock-transfer-sale-invoice-print.component';

@Component({
  selector: 'app-stock-transfer-sale-invoice-printoption',
  templateUrl: './stock-transfer-sale-invoice-printoption.component.html',
  styleUrls: ['./stock-transfer-sale-invoice-printoption.component.scss']
})
export class StockTransferSaleInvoicePrintoptionComponent implements OnInit {

  

  public userForm:FormGroup;
  model: StockTransferSaleInvoicePrintoption = new StockTransferSaleInvoicePrintoption();
  submitted = false;
  isHidden:any;
  Invoice_Id:any;
  MainId:any;
  StateName:any;
  Party:any;
 
 
  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,public dialog: MatDialog,
    private dialogRef: MatDialogRef<StockTransferSaleInvoicePrintoptionComponent>, @Inject(MAT_DIALOG_DATA)data) 
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
    this.Party=data.Party;
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
 
    this.dialogRef.close(this.userForm.value);  
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {StateName:this.StateName ,MainId: this.MainId, InvoiceId:this.Invoice_Id ,PrintMode:PrintMode,Original_bill:original_bill1,Duplicate_bill:Duplicate_bill1,Triplicate_bill:Triplicate_bill1,Party:this.Party};
   let dialogRef = this.dialog.open(StockTransferSaleInvoicePrintComponent, dialogConfig);
    dialogRef.afterClosed().subscribe( data => 
    {
    
    });
    
 
 }
}
