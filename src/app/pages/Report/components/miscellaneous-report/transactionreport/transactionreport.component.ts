import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';

@Component({
  selector: 'app-transactionreport',
  templateUrl: './transactionreport.component.html',
  styleUrls: ['./transactionreport.component.scss']
})
export class TransactionreportComponent implements OnInit {

  public userForm:FormGroup;
  headers:any=[];
  rows:any=[];
  Saleinvoice:boolean=false;
  Purchasebill:boolean=false;
  CreditNote:boolean=false;
  reports:any=[];
  status:boolean=true;

  constructor(public fb:FormBuilder,private DropDownListService: DropdownServiceService,private excelService:ExcelService) 
  {
    this.userForm=fb.group(
      {
        fromdate:[''],
        todate:[''],
        reportcatagory:['']
      });
  }

  get fromdate(){return this.userForm.get("fromdate") as FormControl};
   get todate(){return this.userForm.get("todate") as FormControl};
   get reportcatagory(){return this.userForm.get("reportcatagory") as FormControl};

  ngOnInit() 
  {}


  search()
  {
    let fromdate=this.userForm.get("fromdate").value;
    let todate=this.userForm.get("todate").value;
    let catagory=this.userForm.get("reportcatagory").value;
     this.status=false;
    this.DropDownListService.gettransactionalReport(fromdate,todate,catagory).subscribe(reports=>
      {
        this.status=true;
     
      if(catagory=="Saleinvoice")
      {
        this.Saleinvoice=true;
        this.Purchasebill=false;
        this.CreditNote=false;
      }
      if(catagory=="Purchasebill")
      {
        this.Purchasebill=true;
        this.Saleinvoice=false;
        this.CreditNote=false;
      }
      if(catagory=="CreditNote")
      {
        this.CreditNote=true;
        this.Purchasebill=false;
        this.Saleinvoice=false;
      }
      
       // console.log(reports);
      /*  for (const x in reports[0]) {
          
          console.log(x)
          this.headers.push(x)
       
        }
        console.log("headers "+this.headers)
        this.rows=reports;
        */
       this.reports=reports;
      });


  }

  exportAsXLSX():void {

    

    
    
    
    if(this.Saleinvoice=true)
    {
      let element = document.getElementById('invoice'); 
      this.excelService.exportAsExcelFile(element, 'myExcelFile');
    }
    if(this.Purchasebill=true)
    {
      let element = document.getElementById('bill'); 
      this.excelService.exportAsExcelFile(element, 'myExcelFile');
    }
    if(this.CreditNote=true)
    {
      let element = document.getElementById('cnote'); 
      this.excelService.exportAsExcelFile(element, 'myExcelFile');
    }
    ;
   
   
 }
}
