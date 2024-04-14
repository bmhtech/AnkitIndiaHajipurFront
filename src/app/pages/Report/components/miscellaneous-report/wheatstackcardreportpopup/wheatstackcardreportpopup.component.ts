import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-wheatstackcardreportpopup',
  templateUrl: './wheatstackcardreportpopup.component.html',
  styleUrls: ['./wheatstackcardreportpopup.component.scss']
})
export class WheatstackcardreportpopupComponent implements OnInit {
  wheatstackid:any;
  wheatstackcardlist:any = [];

  godownname:any;
  stack:any;
  company_name:any;


  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<WheatstackcardreportpopupComponent>, @Inject(MAT_DIALOG_DATA)data,private excelService:ExcelService) 
    {
      this.godownname=data["alldata"];
      this.wheatstackid=data["wheatstackid"];
      this.stack=data["stack"];
    }

  ngOnInit() {
    forkJoin(
    this.DropDownListService.retrievewheatstackcard_details(this.wheatstackid),
    this.DropDownListService.getCompanyDetails(localStorage.getItem("company_name"))
    ).subscribe(([details,companydata])=>{
      this.company_name=companydata.company_name;
      this.wheatstackcardlist=details;
    });

  }

  exportAsXLSX():void 
  {
    let element = document.getElementById('dynamictable'); 
    this.excelService.exportAsExcelFile(element, 'Wheat Stack Card Report ');
 }

}
