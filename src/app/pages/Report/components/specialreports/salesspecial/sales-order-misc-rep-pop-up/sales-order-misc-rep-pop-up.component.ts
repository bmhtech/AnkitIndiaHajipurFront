import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { ExcelService } from '../../../../../../service/excel.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sales-order-misc-rep-pop-up',
  templateUrl: './sales-order-misc-rep-pop-up.component.html',
  styleUrls: ['./sales-order-misc-rep-pop-up.component.scss']
})
export class SalesOrderMiscRepPopUpComponent implements OnInit {
 
  soid:any = [];
  fromdate:any;
  todate:any;
  catagory:any;

  loadList:any = [];
  ChallanList:any = [];
  InvoiceList:any = [];


  loadstatus:boolean=false;
  Challanstatus:boolean=false;
  Invoicestatus:boolean=false;

  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,private excelService:ExcelService,
    private dialogRef: MatDialogRef<SalesOrderMiscRepPopUpComponent>, @Inject(MAT_DIALOG_DATA)data) 
    {
      this.soid=data['soid'];
      this.fromdate=data['fromdate'];
      this.todate=data['todate'];
      this.catagory=data['catagory'];

      
     }

  ngOnInit()
   {
    let arr=[];
   
    arr= this.soid;
  
    this.loadstatus=true;
    let unique = arr.filter((item, i, ar) => ar.indexOf(item) === i);

     forkJoin
     (
      this.DropDownListService.getLoadingAdviceReportThrouhgSO(unique)
     ).subscribe(([data])=>
    {

      this.loadList=data;

    });
   }

   challanshow(advice_id)
   {
    this.DropDownListService.getDeliveryChallanReportThrouhgLA(advice_id).subscribe(data=>
    {
   
     
      this.ChallanList=data;
      this.Challanstatus=true;
      this.Invoicestatus=false;
      this.loadstatus=false;
    })

   }
   invoiceshow(delivery_cid)
   {
    this.DropDownListService.getInvoiceReportThroughChallan(delivery_cid).subscribe(data=>
      {
      
     
        this.InvoiceList=data;
        this.Invoicestatus=true;
        this.Challanstatus=false;
        this.loadstatus=false;
      })
   }


   Loaddetails(advice_id,id)
      {

        window.open("#/pages/invTrans/weighment/loadingAdvice");
      
        localStorage.setItem("svalue",'true');
        localStorage.setItem("sid",id);
        localStorage.setItem("sno",advice_id);
        localStorage.setItem("saction",'view');
      }

      Challandetails(delivery_cid,id)
      {
        window.open("#/pages/invTrans/salestransaction/DeliveryChallan");
      
        localStorage.setItem("svalue",'true');
        localStorage.setItem("sid",id);
        localStorage.setItem("sno",delivery_cid);
        localStorage.setItem("saction",'view');
      }
      Invoicedetails(invoice_id,id)
      {
        window.open("#/pages/invTrans/salestransaction/SalesInvoice");
      
        localStorage.setItem("svalue",'true');
        localStorage.setItem("sid",id);
        localStorage.setItem("sno",invoice_id);
        localStorage.setItem("saction",'view');
      }


   Back()
   {
    if(this.Challanstatus==true)
    {
      this.loadstatus=true;
      this.Challanstatus=false;
      this.Invoicestatus=false;
    }
    if(this.Invoicestatus==true)
    {
      this.loadstatus=false;
      this.Challanstatus=true;
      this.Invoicestatus=false;
    }
   }

}
