import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';
import { formatDate } from '@angular/common';
import { GrnComponent } from '../../../../../pages/InventoryTransaction/components/Purchase/components/grn/grn.component';
import { Router } from '@angular/router';
import { timer } from 'rxjs';


@Component({
  selector: 'app-stocktracking',
  templateUrl: './stocktracking.component.html',
  styleUrls: ['./stocktracking.component.scss'],
  providers: [GrnComponent],
})
export class StocktrackingComponent implements OnInit {

  public userForm:FormGroup;

  headers:any=[];
  rows:any=[];
  rowsdetails:any=[];
  details:boolean=false;
  openingqty:any;
  openingpckqty:any;
  inwardqty:any; 
  inwardpack:any;
  outwardqty:any;
  outwardpck:any; 
  itemname:any;
  status:boolean=true;
  closingmt:any;
  closingpck:any;
  packingtable:boolean=false;
  itemtable:boolean=false;
  bothtable:boolean=false;

  detailsitem:boolean=false;
  detailspacking:boolean=false;

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService,private excelService:ExcelService
    ,private GrnComponent:GrnComponent,private router: Router) 
  {
    this.userForm=fb.group(
      {
        fromdate:[''],
        todate:[''],
        reportcatagory:[''],
        reporttype:['']
      });
  }

  get fromdate(){ return this.userForm.get("fromdate") as FormControl }
  get todate(){ return this.userForm.get("todate") as FormControl }
  get reportcatagory(){ return this.userForm.get("reportcatagory") as FormControl }
  get reporttype(){ return this.userForm.get("reporttype") as FormControl }

  ngOnInit() 
  {
    this.details=false;
  }

  search()
  {
    let fromdate=this.userForm.get("fromdate").value;
    let todate=this.userForm.get("todate").value;
    let reportcatagory=this.userForm.get("reportcatagory").value;
    let reporttype=this.userForm.get("reporttype").value;
    let startdate=formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
    if(reporttype=='' || reporttype==null || reporttype==0)
    {
      this.userForm.patchValue({reporttype:'Both'})
    }
    
this.status=false;
    this.DropDownListService.getstocktrackingReport(fromdate,todate,reportcatagory,startdate,).subscribe(reports=>
      {
        this.details=false;
        this.rows=reports;
        this.status=true;
       // console.log(JSON.stringify(reports))
      });

      if(reporttype=='Packing')
      {
        this.packingtable=true;
        this.itemtable=false;
        this.bothtable=false;
      }
      else if(reporttype=='Item')
      {
        this.packingtable=false;
        this.itemtable=true;
        this.bothtable=false;
      }
      else
      {
        this.packingtable=false;
        this.itemtable=false;
        this.bothtable=true;
      }
     
  }

  onChangeType(reporttype)
  {
    if(reporttype=='Packing')
      {
        this.packingtable=true;
        this.itemtable=false;
        this.bothtable=false;

        this.detailsitem=false;
        this.detailspacking=true;
      }
      else if(reporttype=='Item')
      {
        this.packingtable=false;
        this.itemtable=true;
        this.bothtable=false;

        this.detailsitem=true;
        this.detailspacking=false;
      }
      else
      {
        this.packingtable=false;
        this.itemtable=false;
        this.bothtable=true;

        this.detailsitem=true;
        this.detailspacking=true;
      }
    
      
  }

  onview(itemcode,packingcode,opening_qty,opening_pck_qty,itemname,closing_mat_wt,closing_pack_qty)
  {
    this.details=true;
    let fromdate=this.userForm.get("fromdate").value;
    let todate=this.userForm.get("todate").value;
    let catagory=this.userForm.get("reportcatagory").value;
    this.status=false;
    this.DropDownListService.getalltransactionfromitem(itemcode,packingcode,fromdate,todate,catagory).subscribe(reportsdetails=>
      {
        this.details=true;
         this.rowsdetails=reportsdetails;
        // console.log(JSON.stringify(reportsdetails)) 
        this.openingqty=opening_qty;
        this.openingpckqty=opening_pck_qty;
        this.status=true;
        this.itemname=itemname;
        this.closingmt=closing_mat_wt;
        this.closingpck=closing_pack_qty;


        this.inwardqty=0;     
        this.inwardpack=0;
        this.outwardqty=0;
        this.outwardpck=0;

        reportsdetails.forEach(element => {
          this.inwardqty+=Number(element.inwardqty)      
          this.inwardpack+=Number(element.inwardpack) 
          this.outwardqty+=Number(element.outwardqty) 
          this.outwardpck+=Number(element.outwardpck) 
         
        });
      });

      this.inwardqty=this.inwardqty.toFixed(3);
      this.outwardqty= this.outwardqty.toFixed(3);
  }
 
  onviewdetails(id,voucherref,vouchertype)
  {
    if(vouchertype=='GRN')
    {
      window.open("#/pages/invTrans/purchase/grn");
      //this.router.navigate(['/pages/invTrans/purchase/grn']);
      localStorage.setItem("svalue",'true');
      localStorage.setItem("sid",id);
      localStorage.setItem("sno",voucherref);
      localStorage.setItem("saction",'view');
    }
    if(vouchertype=='PRODUCTION')
    {
      window.open("#/pages/invTrans/production/production-transaction");
      //this.router.navigate(['/pages/invTrans/production/production-transaction']);
      localStorage.setItem("svalue",'true');
      localStorage.setItem("sid",id);
      localStorage.setItem("sno",voucherref);
      localStorage.setItem("saction",'view');
    }
    if(vouchertype=='CHALLAN')
    {
      window.open("#/pages/invTrans/salestransaction/DeliveryChallan");
      //this.router.navigate(['/pages/invTrans/salestransaction/DeliveryChallan']);
      localStorage.setItem("svalue",'true');
      localStorage.setItem("sid",id);
      localStorage.setItem("sno",voucherref);
      localStorage.setItem("saction",'view');
    }
    if(vouchertype=='SALER')
    {
      window.open("#/pages/invTrans/salestransaction/SalesReturnNote");
     // this.router.navigate(['/pages/invTrans/salestransaction/DeliveryChallan']);
      localStorage.setItem("svalue",'true');
      localStorage.setItem("sid",id);
      localStorage.setItem("sno",voucherref);
      localStorage.setItem("saction",'view');
    }
    if(vouchertype=='PRODUCTION SPECIAL')
    {
      window.open("#/pages/invTrans/production/production-transaction-special");
      localStorage.setItem("svalue",'true');
      localStorage.setItem("sid",id);
      localStorage.setItem("sno",voucherref);
      localStorage.setItem("saction",'view');
    }
   
  }
  BACK()
  {
    this.details=false;
  }

  exportAsXLSX():void
  {
    let type=this.userForm.get("reporttype").value;
    let packingdynamictable = document.getElementById('packingdynamictable'); 
    let itemdynamictable = document.getElementById('itemdynamictable'); 
    let bothdynamictable = document.getElementById('bothdynamictable'); 
    
    if(type=='Packing')
    {
      this.excelService.exportAsExcelFile(packingdynamictable,'Item Reports');
    }
    else if(type=='Item')
    {
      this.excelService.exportAsExcelFile(itemdynamictable,'Item Reports');
    }
    else{
      this.excelService.exportAsExcelFile(bothdynamictable,'Item Reports');
    }
    
  }

  exportAsXLSX1():void
  {
    let element = document.getElementById('dynamictable1'); 
    this.excelService.exportAsExcelFile(element,'Voucher Reports');
  }
}
