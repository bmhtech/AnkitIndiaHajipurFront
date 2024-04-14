import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-otherparameterreportprintpopup',
  templateUrl: './otherparameterreportprintpopup.component.html',
  styleUrls: ['./otherparameterreportprintpopup.component.scss']
})
export class OtherparameterreportprintpopupComponent implements OnInit {
  business_unitname:any;
  shift:any;
  approvedby_name:any;
  otherparameterid:any;
  dynamiclist:any=[];
  company_name:any;
  
  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<OtherparameterreportprintpopupComponent>, @Inject(MAT_DIALOG_DATA)data,private excelService:ExcelService) 
    {
      this.business_unitname=data["business_unitname"];
      this.shift=data["shift"];
      this.approvedby_name=data["approvedby_name"];
      this.otherparameterid=data["otherparameterid"];
    }

  ngOnInit() 
  {
    forkJoin(
    this.DropDownListService.retriveOtherParameterDetails(this.otherparameterid),
    this.DropDownListService.getCompanyDetails(localStorage.getItem("company_name"))
    ).subscribe(([data,companydata])=>
      {
        this.company_name=companydata.company_name;
          this.dynamiclist=data;
      });
  }

  
  exportAsXLSX():void 
  {
    let element = document.getElementById('dynamictable'); 
    this.excelService.exportAsExcelFile(element, 'Other Parameter Report');
 }
}
