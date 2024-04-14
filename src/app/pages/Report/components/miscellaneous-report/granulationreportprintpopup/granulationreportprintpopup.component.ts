import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-granulationreportprintpopup',
  templateUrl: './granulationreportprintpopup.component.html',
  styleUrls: ['./granulationreportprintpopup.component.scss']
})
export class GranulationreportprintpopupComponent implements OnInit {
  granulationlist:any = [];
  granulationreportid:any;
  date:any;
  business_unitname:any;
  item_name:any;
  shift:any;
  approvedby_name:any; 
  company_name:any;
  
  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<GranulationreportprintpopupComponent>, @Inject(MAT_DIALOG_DATA)data,private excelService:ExcelService) 
    { 
      this.granulationreportid=data["granulationreportid"];
      this.date=data["date"];
      this.business_unitname=data["business_unitname"];
      this.item_name=data["item_name"];
      this.shift=data["shift"];
      this.approvedby_name=data["approvedby_name"];
    }

  ngOnInit() {
    forkJoin(
    this.DropDownListService.retriveGranulationDetails(this.granulationreportid),
    this.DropDownListService.getCompanyDetails(localStorage.getItem("company_name"))
    ).subscribe(([details,companydata])=>{
      this.company_name=companydata.company_name;
      this.granulationlist=details;
      });
  
    }
  
    exportAsXLSX():void 
    {
      let element = document.getElementById('dynamictable'); 
      this.excelService.exportAsExcelFile(element, 'Granulation Report');
   }
}
