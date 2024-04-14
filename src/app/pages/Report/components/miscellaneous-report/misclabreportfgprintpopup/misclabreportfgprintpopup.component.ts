import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-misclabreportfgprintpopup',
  templateUrl: './misclabreportfgprintpopup.component.html',
  styleUrls: ['./misclabreportfgprintpopup.component.scss']
})
export class MisclabreportfgprintpopupComponent implements OnInit {
  
  misclabreportfglist:any = [];
  misclabreportfgid:any;
  business_unitname:any;
  shift:any;
  approvedby_name:any;
  date:any;
  company_name:any;

  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<MisclabreportfgprintpopupComponent>, @Inject(MAT_DIALOG_DATA)data,private excelService:ExcelService) 
    {
      this.misclabreportfgid=data["misclabreportfgid"];
      this.business_unitname=data["business_unitname"];
      this.shift=data["shift"];
      this.approvedby_name=data["approvedby_name"];
      this.date=data["date"];
    }

  ngOnInit() {
    forkJoin(
    this.DropDownListService.retriveLabReportDetails(this.misclabreportfgid),
    this.DropDownListService.getCompanyDetails(localStorage.getItem("company_name"))
    ).subscribe(([details,companydata])=>{
      this.company_name=companydata.company_name;
    this.misclabreportfglist=details;
    });

  }

  exportAsXLSX():void 
  {
    let element = document.getElementById('dynamictable'); 
    this.excelService.exportAsExcelFile(element, 'Misc Lab Report Finished Goods');
 }
}