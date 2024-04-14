import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-grnregisterreportpopup',
  templateUrl: './grnregisterreportpopup.component.html',
  styleUrls: ['./grnregisterreportpopup.component.scss']
})
export class GrnregisterreportpopupComponent implements OnInit {
  
  grnregisterlist:any=[];
  fromdate:any;
  todate:any;
  status=false;
  company_name:any;

  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<GrnregisterreportpopupComponent>, @Inject(MAT_DIALOG_DATA)data,private excelService:ExcelService) 
    { 
      this.fromdate=data["fromdate"];
      this.todate=data["todate"];
    }

  ngOnInit() {
    let finyear =localStorage.getItem("financial_year");
   // console.log(this.fromdate+"///"+this.todate)
   forkJoin(
    this.DropDownListService.searchGRNRegisterReportPriview("fromdate="+this.fromdate+"&todate="+this.todate+"&finyear="+finyear),
    this.DropDownListService.getCompanyDetails(localStorage.getItem("company_name"))
   ).subscribe(([data,companydata])=>
      {
    //console.log("data:"+JSON.stringify(data))
    this.company_name=companydata.company_name;
       this.grnregisterlist=data;
        this.status=true;
 
      }, (error) => {this.status=true;
        alert("GRN Register Data Not Found !!!")
        this.grnregisterlist=[];
      })
  }

  exportAsXLSX():void 
  {
    let element = document.getElementById('dynamictable'); 
    this.excelService.exportAsExcelFile(element, 'GRN Register Report');
 }
}
