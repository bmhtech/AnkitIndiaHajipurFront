import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../../service/excel.service';
import { Master } from '../../../../../../service/master.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-purchaseordertrackdownpopup',
  templateUrl: './purchaseordertrackdownpopup.component.html',
  styleUrls: ['./purchaseordertrackdownpopup.component.scss']
})
export class PurchaseordertrackdownpopupComponent implements OnInit {

  poid:any = [];
  fromdate:any;
  todate:any;
  catagory:any;
  UnloadList:any=[];
  GrnList:any=[];
  PurBillList:any=[];
  unloadstatus:boolean=false;
  grnstatus:boolean=false;
  purchasestatus:boolean=false;


  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,private excelService:ExcelService,
    private dialogRef: MatDialogRef<PurchaseordertrackdownpopupComponent>, @Inject(MAT_DIALOG_DATA)data)
     { 
      this.poid=data['poid'];
      this.fromdate=data['fromdate'];
      this.todate=data['todate'];
      this.catagory=data['catagory'];
     }

  ngOnInit() 
  {

    let arr=[];
   
    arr= this.poid;
    this.unloadstatus=true;

    let unique = arr.filter((item, i, ar) => ar.indexOf(item) === i);

    forkJoin(
      
      this.DropDownListService.getUnloadListThroughPurOrderId(unique)
      ).subscribe(([data])=>
        {

           this.UnloadList=data;

        });




  }


  Grnshow(unadviceid)
  {
   // alert(unadviceid)
    this.DropDownListService.getGRNThroughUnloadId(unadviceid).subscribe(data=>
      {
       // alert(JSON.stringify(data))
       this.grnstatus=true;
        this.GrnList=data;
        this.unloadstatus=false;
      })
  }

  PurBillshow(grn_id)
  {
    this.DropDownListService.getBillThroughGRNId(grn_id).subscribe(data=>
      {
        this.grnstatus=false;
        this.purchasestatus=true;
        this.PurBillList=data;
      })
  }


  PurBillpopup(pur_bill_id,id)
  {

    window.open("#/pages/invTrans/purchase/purchase-bill");
   
    localStorage.setItem("svalue",'true');
    localStorage.setItem("sid",id);
    localStorage.setItem("sno",pur_bill_id);
    localStorage.setItem("saction",'view');
  }

  grndetails(grn_id,id)
  {
    window.open("#/pages/invTrans/purchase/grn");
   
    localStorage.setItem("svalue",'true');
    localStorage.setItem("sid",id);
    localStorage.setItem("sno",grn_id);
    localStorage.setItem("saction",'view');
  }
  Unloaddetails(unadviceid,id)
  {
    window.open("#/pages/invTrans/weighment/unloadAdvice");
   
    localStorage.setItem("svalue",'true');
    localStorage.setItem("sid",id);
    localStorage.setItem("sno",unadviceid);
    localStorage.setItem("saction",'view');
  }
  Back()
  {
    if(this.grnstatus==true)
    {
         this.unloadstatus=true;
         this.purchasestatus=false;
         this.grnstatus=false;
    }
    if(this.purchasestatus==true)
    {
         this.unloadstatus=false;
         this.grnstatus=true;
         this.purchasestatus=false;
    }
   
  }
}
