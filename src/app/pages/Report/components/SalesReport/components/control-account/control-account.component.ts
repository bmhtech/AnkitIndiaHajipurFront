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
import { ControlAccountPopupComponent } from '../control-account-popup/control-account-popup.component';


@Component({
  selector: 'app-control-account',
  templateUrl: './control-account.component.html',
  styleUrls: ['./control-account.component.scss']
})
export class ControlAccountComponent implements OnInit 
{
    public userForm:FormGroup;
    model: PartyBillPayment = new PartyBillPayment();
    businesslists:any=[];
    status = false;
    currentDate:any;
    ledgerNames:any = [];
    CustomerList:any =[];
    FromcurrentDate:any;
    currentDatehidden:any;
    
    constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService,public dialog: MatDialog,) 
    {
    this.userForm=fb.group({
      business_unit:[''],     
      ledgerid:[''],
      fromdate:[''],
      todate:[''],
      cdate:[''],
    });
   }
   
   get business_unit(){ return this.userForm.get("business_unit") as FormControl }
   get ledgerid(){ return this.userForm.get("ledgerid") as FormControl }
   get fromdate(){ return this.userForm.get("fromdate") as FormControl }
   get todate(){ return this.userForm.get("todate") as FormControl }
   get cdate(){ return this.userForm.get("cdate") as FormControl }

   company_name:any;
  
   ngOnInit() 
  { 
    this.company_name = localStorage.getItem("company_name");
    this.currentDatehidden = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.FromcurrentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.userForm.patchValue({business_unit:"0",ledgerid:"0"});
    forkJoin(
      this.DropDownListService.getCompanyBUMNCList(this.company_name),
      this.DropDownListService.ledgerNameList(),
     ).subscribe(([BuData,Ledgerdata])=>
       {
       this.businesslists = BuData
       this.ledgerNames = Ledgerdata;
       this.status = true; 
       });
  }

  LedgerName:any
  onChangeledger(event)
  {
    forkJoin(
      this.DropDownListService.getLedgerName(event),
     ).subscribe(([Ledgerdata])=>
       {
        this.LedgerName =Ledgerdata.ledgername;
        this.status = true; 
       });
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
    let ledgerId =this.userForm.get("ledgerid").value;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {LedgerName:this.LedgerName, FromDate:FromDate, ToDate:ToDate ,Business_Unit:Business_Unit,ledgerId:ledgerId};
    let dialogRef = this.dialog.open(ControlAccountPopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe( data => 
   {});    
  }
}
