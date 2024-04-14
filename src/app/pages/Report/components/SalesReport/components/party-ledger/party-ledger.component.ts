import { Component, OnInit,ViewChild } from '@angular/core';
import { Master } from '../../../../../../service/master.service';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { PartyBillPayment } from '../../../../../../Models/SalesTransaction/party-bill-payment';
import { forkJoin } from 'rxjs';
import { timer } from 'rxjs';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';
import { PartyLedgerPopupComponent } from '../party-ledger-popup/party-ledger-popup.component';

@Component({
  selector: 'app-party-ledger',
  templateUrl: './party-ledger.component.html',
  styleUrls: ['./party-ledger.component.scss']
})
export class PartyLedgerComponent implements OnInit 
{
    public userForm:FormGroup;
    model: PartyBillPayment = new PartyBillPayment();
    businesslists:any=[];
    status = false;
    currentDate:any;
    customerNames:any = [];
    CustomerList:any =[];
    FromcurrentDate:any;
    currentDatehidden:any;
    
    constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService,public dialog: MatDialog,) 
    {
    this.userForm=fb.group({
      business_unit:[''],     
      customer_group:[''],
      customer:[''],
      fromdate:[''],
      todate:[''],
      cdate:[''],
    });
   }  
   get business_unit(){ return this.userForm.get("business_unit") as FormControl }
   get customer_group(){ return this.userForm.get("customer_group") as FormControl }
   get customer(){ return this.userForm.get("customer") as FormControl }
   get fromdate(){ return this.userForm.get("fromdate") as FormControl }
   get todate(){ return this.userForm.get("todate") as FormControl }
   get cdate(){ return this.userForm.get("cdate") as FormControl }
  
   company_name:any;
   ngOnInit() 
   {
     this.status =true;
     this.company_name = localStorage.getItem("company_name");
     this.currentDatehidden = formatDate(new Date(), 'yyyy-MM-dd', 'en');
     this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
     this.FromcurrentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
     this.userForm.patchValue({party:"0",pledgerid:"0",business_unit:"0"});
 
     forkJoin(
      this.DropDownListService.getCompanyBUMNCList(this.company_name),
      this.DropDownListService.custNameList(),
     ).subscribe(([BuData,CustGrp])=>
       {
       this.businesslists = BuData
       this.customerNames = CustGrp;
       this.status = true; 
       });
   }

   onChangeGroup(event)
   {
    let Business_Unit =this.userForm.get("business_unit").value;
    this.DropDownListService.getCustomerThruBUGrp("bunit="+Business_Unit+"&custgrp="+event).subscribe(data=>{this.CustomerList  = data}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....")});
   }

   onChangeToDate()
   {
    let FromDate =this.userForm.get("fromdate").value;
    let ToDate =this.userForm.get("todate").value;
    let Cdate =this.userForm.get("cdate").value;
    if(ToDate < FromDate)
    {
      alert("From Date Can not be greater than To date");
      this.userForm.patchValue({todate:formatDate(new Date(), 'yyyy-MM-dd', 'en')});
    }

    if(ToDate>Cdate)
    {
      alert("To Date Can not be greater Current Date");
      this.userForm.patchValue({todate:formatDate(new Date(), 'yyyy-MM-dd', 'en')});
    }

   }

   send()
   {
     let FromDate = this.userForm.get("fromdate").value;
     let ToDate = this.userForm.get("todate").value;
     let Business_Unit =this.userForm.get("business_unit").value;
     let Customer =this.userForm.get("customer").value;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { FromDate:FromDate, ToDate:ToDate ,Business_Unit:Business_Unit,Customer:Customer};
    let dialogRef = this.dialog.open(PartyLedgerPopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe( data => 
    {
    // this.sales_Invoice_Item_Dtls.at(index).patchValue({acc_norms: data["qc_code"]});
    }); 
     
   }

}
