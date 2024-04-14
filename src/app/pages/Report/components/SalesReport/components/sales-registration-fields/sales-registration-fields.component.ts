import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { Salesregistration } from '../../../../../../Models/SalesTransaction/sales-registration';
import { forkJoin } from 'rxjs';
import {ExcelService} from '../../../../../../service/excel.service';
@Component({
  selector: 'app-sales-registration-fields',
  templateUrl: './sales-registration-fields.component.html',
  styleUrls: ['./sales-registration-fields.component.scss']
})
export class SalesRegistrationFieldsComponent implements OnInit {
  public userForm:FormGroup;
  model:Salesregistration =new Salesregistration();
  status = false;
  sales_reportlists:any=[];
  reportnamelists:any=[];
  dropdownsettings;
  columnslist:any=[];
  datalist: any[];

  constructor(public fb:FormBuilder,private DropDownListService: DropdownServiceService,private Service: Master,private excelService:ExcelService,) 
  { 
    this.userForm=fb.group({
     
      sales_report:[''],
      reportname:[''],  
      columns:[''],  
      data:[''],  
    })


  }

  get sales_report(){return this.userForm.get("sales_report") as FormControl }
  get reportname(){return this.userForm.get("reportname") as FormControl }
 

  ngOnInit() 
  {
    this.status =true;
    forkJoin(
      this.DropDownListService.getSalesreport(),
     this.Service.getSalesRegisterList(),
     ).subscribe(([BuData])=>
       {
       this.sales_reportlists = BuData
       
       this.status = true; 
       });
  
  
  
  
  
  
      };

  onChangeGroup(event)
  {
    
    this.DropDownListService.getReportNameList(event)
    .subscribe(data=>
      {
        this.reportnamelists  = data
        
        this.status = true;
     }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));});
    

  }

  send()
  {
    let Sales_report = this.userForm.get("sales_report").value;
    let Reportname = this.userForm.get("reportname").value;
      this.DropDownListService.getSalesCol(Sales_report,Reportname)
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
    console.log("check:"+data);
   //this.columnslist = ["partyname","challan","id"];
    let Sales_report = this.userForm.get("sales_report").value;
    let Reportname = this.userForm.get("reportname").value;
    this.DropDownListService.getSalesInvoicesr(Sales_report,Reportname)
    .subscribe(data=>
      {
              this.anotherPromise(data)
              
              this.status = true;
           }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));});
      }
  
  
  
      anotherPromise(data:any[]) {

    this.datalist = data;
    console.log("tuhin column " +this.columnslist);
    console.log("tuhin data"+this.datalist);

      }
  
  
      exportAsXLSX():void {
        let element = document.getElementById('dynamictable'); 
        this.excelService.exportAsExcelFile(element, 'myExcelFile');
     }

}