import { Component, OnInit } from '@angular/core';
import { Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { forkJoin } from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-control-account-popup',
  templateUrl: './control-account-popup.component.html',
  styleUrls: ['./control-account-popup.component.scss']
})

export class ControlAccountPopupComponent implements OnInit 
{

  FromDate:any;
  ToDate:any;
  Business_Unit:any;
  LedgerId:any;
  PartyLedgerList:any=[];
  Entrydate:any;
  DueDate:any;
  RevDueDate:any;
  PartyName:any;
  LedgerName:any;

constructor( private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,public dialog: MatDialog,
    private dialogRef: MatDialogRef<ControlAccountPopupComponent>, @Inject(MAT_DIALOG_DATA)data)    
  { 
  this.FromDate =data.FromDate;
  this.ToDate =data.ToDate;
  this.Business_Unit =data.Business_Unit;
  this.LedgerId =data.ledgerId;
  this.RevDueDate  = formatDate(data.ToDate, 'dd-MM-yyyy', 'en');
  this.DueDate="TOTAL DUE AMOUNT as on "+this.RevDueDate;
  this.LedgerName=data.LedgerName;
 }

 ListAlldata:any=[];
 Sl_no:any;
 Debit:any;
 ngOnInit()
 {
   this.DropDownListService.getControlAccPayDetails("bunit="+this.Business_Unit+"&ledger="+this.LedgerId+"&fdate="+this.FromDate+"&tdate="+this.ToDate).subscribe(data=>{
     this.ListAlldata  = data;
     console.log("getControlAccPayDetails: "+JSON.stringify(data) );
     for(let data1 of data)
     {    
       if(data1.slno==0){data1.slno="";}
       if(data1.credit==0){data1.credit="";}
       if(data1.debit==0){data1.debit="";}
       if(data1.entrydate==''){data1.entrydate="`";}  
     }     
     this.PartyLedgerList  = data;
     this.Debit = data[data.length-2].debit;
     //this.Entrydate = data[data.length-2].entrydate;
     // this.Entrydate =this.Entrydate.substring(0,this.Entrydate.length-17);
     // this.DueDate=this.DueDate.substring(0,this.DueDate.length-17);
   // console.log("Final: "+JSON.stringify(this.PartyLedgerList) );
   }, (error) => {console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....")});
 
  //  this.DropDownListService.getCustomerName(this.Customer).subscribe(data=>{
  //    this.PartyName = data.cp_name;
  //  }, (error) => {console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....")});
 }

}
