import { Component, OnInit } from '@angular/core';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-salesdispatchreport',
  templateUrl: './salesdispatchreport.component.html',
  styleUrls: ['./salesdispatchreport.component.scss']
})
export class SalesdispatchreportComponent implements OnInit {

  
  public userForm:FormGroup;
  status = false;
  columnslist:any=[];
  datalist: any[];
  trialdata:any=[];
  weighmentshow: boolean = false;
  trialshow: boolean = false;

  constructor(public fb:FormBuilder,private DropDownListService: DropdownServiceService,private excelService:ExcelService)  {
    this.userForm=fb.group
    ({
      reportname:[''],  
      fromdate:[''],  
      todate:['']
    });
   }
 
  ngOnInit() {
    this.weighmentshow=false;
    this.trialshow=false;
  }

  send()
  {
      let Reportname = this.userForm.get("reportname").value;
      let fromdate= this.userForm.get("fromdate").value;
      let todate=this.userForm.get("todate").value;
      if(Reportname=='Trial 17.11.22 Del Challan')
          {
            this.weighmentshow=false;
            this.trialshow=true;
            this.DropDownListService.getTrialdata(fromdate,todate)
            .subscribe(tdata=>
              {
                this.trialdata=tdata;
                this.status = true;
                   
              });
          }
          else
          {
            this.weighmentshow=true;
            this.trialshow=false;
          this.DropDownListService.getSalesDynamicReportCol(Reportname)
          .subscribe(
            (data)=>
          {
            {
              this.columnslist = data
              this.promise(data)
              this.status = true; 
            }
          });
        }
      } 

  promise(data: string[]) { 
    console.log("check:"+data);
    let Reportname = this.userForm.get("reportname").value;
    let fromdate= this.userForm.get("fromdate").value;
    let todate=this.userForm.get("todate").value;

    this.DropDownListService.getSalesDynamicProcedure(Reportname,fromdate,todate)
    .subscribe(data=>
      {
              this.anotherPromise(data)
              this.status = true;
           }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));});
      }
 
  anotherPromise(data:any[]) {
    this.datalist = data;
      }

     exportAsXLSX():void {
       let element = document.getElementById('dynamictable'); 
       this.excelService.exportAsExcelFile(element, 'myExcelFile');
    }
}
