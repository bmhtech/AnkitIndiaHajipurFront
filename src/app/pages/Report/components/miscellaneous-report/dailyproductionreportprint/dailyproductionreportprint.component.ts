import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';

@Component({
  selector: 'app-dailyproductionreportprint',
  templateUrl: './dailyproductionreportprint.component.html',
  styleUrls: ['./dailyproductionreportprint.component.scss']
})
export class DailyproductionreportprintComponent implements OnInit {

  dailyproductionid:any;
  dailyproductionlist:any = [];
  dailyproductionlist1:any = [];

  date:any;
  business_unit:any;
  remarks:any;
  shopfloor:any;
  company_name:any;

  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<DailyproductionreportprintComponent>, @Inject(MAT_DIALOG_DATA)data,private excelService:ExcelService) 
    { 
      this.date=data["date"];
      this.business_unit=data["bunit"];
      this.remarks=data["remarks"];
      this.dailyproductionid=data["productionid"];
      this.shopfloor=data["shopfloor"]
    }

  ngOnInit() {
    forkJoin(
    this.DropDownListService.retriveProductionDetails(this.dailyproductionid),
    this.DropDownListService.retriveProductionDetails1(this.dailyproductionid),
    this.DropDownListService.getCompanyDetails(localStorage.getItem("company_name"))

    ).subscribe(([details,details1,companydata])=>{
      this.company_name=companydata.company_name;
      this.dailyproductionlist=details;
      this.dailyproductionlist1=details1;
    });
  }
  exportAsXLSX():void 
  {
    let element = document.getElementById('print-section'); 
    this.excelService.exportAsExcelFile(element, 'daily Production Report ');
 }
}
