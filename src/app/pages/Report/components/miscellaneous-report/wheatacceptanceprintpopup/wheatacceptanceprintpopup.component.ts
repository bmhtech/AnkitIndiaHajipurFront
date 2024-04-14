import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-wheatacceptanceprintpopup',
  templateUrl: './wheatacceptanceprintpopup.component.html',
  styleUrls: ['./wheatacceptanceprintpopup.component.scss']
})
export class WheatacceptanceprintpopupComponent implements OnInit {

  wheatacceptancelist:any = [];
  acceptanceid:any;
  company_name:any;

  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<WheatacceptanceprintpopupComponent>, @Inject(MAT_DIALOG_DATA)data,private excelService:ExcelService) 
    {
      this.acceptanceid=data["acceptanceid"];
    }

  ngOnInit() {
          forkJoin(
          this.DropDownListService.getWheatAcceptancePrintList(this.acceptanceid),
          this.DropDownListService.getCompanyDetails(localStorage.getItem("company_name"))
          ).subscribe(([wheatacceptance,companydata])=>
            {
              this.company_name=companydata.company_name;
              //console.log("data:"+JSON.stringify(wheatacceptance))
              this.wheatacceptancelist=wheatacceptance;
            });
  }
  exportAsXLSX():void 
    {
      let element = document.getElementById('print-section'); 
      this.excelService.exportAsExcelFile(element, 'Wheat Acceptance Report');
   }

}
