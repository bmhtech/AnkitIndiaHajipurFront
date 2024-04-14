import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ExcelService } from '../../../../../../service/excel.service';
import { Purchaseregistration } from '../../../../../../Models/transaction/PurchaseTransaction/Purchaseregistration';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-purchase-report-fields',
  templateUrl: './purchase-report-fields.component.html',
  styleUrls: ['./purchase-report-fields.component.scss']
})
export class PurchaseReportFieldsComponent implements OnInit {
  public userForm:FormGroup;
  model:Purchaseregistration =new Purchaseregistration();
  status = false;
  purchase_reportlists:any=[];
  reportnamelists:any=[];
  dropdownsettings;
  columnslist:any=[];
  datalist: any[];

  constructor(public fb:FormBuilder,private DropDownListService: DropdownServiceService,private Service: Master,private excelService:ExcelService,)
   { 
    this.userForm=fb.group({
     
      purchase_report:[''],
      reportname:[''],  
      columns:[''],  
      data:[''],  
    })
   }
   get purchase_report(){return this.userForm.get("purchase_report") as FormControl }
   get reportname(){return this.userForm.get("reportname") as FormControl }

  ngOnInit() {

    
    this.status =true;
    forkJoin(
      this.DropDownListService.getPurchasereport(),
      this.Service.getPurchaseRegisterList(),
     
     ).subscribe(([BuData])=>
       {
       this.purchase_reportlists = BuData
       
       this.status = true; 
       });
      }
  
 onChangeGroup(event)
  {
    
    this.DropDownListService.getPurReportNameList(event)
    .subscribe(data=>
      {
        this.reportnamelists  = data
        
        this.status = true;
     }, (error) => {this.status=true;
      console.log("ERROR get: "+JSON.stringify(error));
    });
  }
     
  send()
  {
    let purchase_report = this.userForm.get("purchase_report").value;
    let Reportname = this.userForm.get("reportname").value;
      this.DropDownListService.getPurReportCol(purchase_report,Reportname)
      .subscribe(
        (data)=>
       {
        {
          let abc=data[0];
          console.log(" abc "+abc)
          this.columnslist = abc.split(",")
          this.promise(data)
          
          this.status = true; 
        }
      }
        )
        
        ;

} 
promise(data: string[]) {
  //let dataarray[]=data.split(",");
  
  //this.columnslist = data.split(",");
  //console.log(data);
 //this.columnslist = ["partyname","challan","id"];
  let purchase_report = this.userForm.get("purchase_report").value;
  let Reportname = this.userForm.get("reportname").value;
  this.DropDownListService.getPurReportDynamic(purchase_report,Reportname)
  .subscribe(data=>
    {
            this.anotherPromise(data)
            
            this.status = true;
         }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));});
    }
    anotherPromise(data:any[]) {

      this.datalist = data;
      //console.log("tuhin column " +this.columnslist);
      //console.log("tuhin data"+this.datalist);
  
        }
  
        exportAsXLSX():void {
          let element = document.getElementById('dynamictable'); 
          this.excelService.exportAsExcelFile(element, 'myExcelFile');
       }
  
 
}
