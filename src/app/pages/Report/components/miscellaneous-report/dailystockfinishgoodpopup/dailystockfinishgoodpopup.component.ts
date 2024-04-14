import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExcelService } from '../../../../../service/excel.service';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { Master } from '../../../../../service/master.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dailystockfinishgoodpopup',
  templateUrl: './dailystockfinishgoodpopup.component.html',
  styleUrls: ['./dailystockfinishgoodpopup.component.scss']
})
export class DailystockfinishgoodpopupComponent implements OnInit {

  ID:any;
  company_name:any; 
  dailystockid:any;
  dailyreportlist:any=[];
  date:any;
  openingtotal:number=0;
  productiontotal:number=0;
  conversiontotal:number=0;
  saletotal:number=0;
  closingstocktotal:number=0;
  company:any;

  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<DailystockfinishgoodpopupComponent>, @Inject(MAT_DIALOG_DATA)data,private excelService:ExcelService) 
    { 

      this.ID=data["alldata"];
      this.dailystockid=data["dailystockid"];
      this.company_name=data["company_name"];
      this.date=data["date"];
    }

  ngOnInit() 
  {
    forkJoin(
    this.DropDownListService.getdailystockfinishedgoodsdtlslist(this.dailystockid),
    this.DropDownListService.getCompanyDetails(localStorage.getItem("company_name"))
    )
    .subscribe(([data,companydata])=>
      {
       this.dailyreportlist=data;
       this.company=companydata.company_name;

          data.forEach(element => {
            this.openingtotal+=Number(element["openingstock"]);
            this.productiontotal+=Number(element["production"]);
            this.conversiontotal+=Number(element["conversion"]);
            this.saletotal+=Number(element["sale"]);
            this.closingstocktotal+=Number(element["closingstock"]);
          });

       }); 
  }


  exportAsXLSX():void 
  {
    let element = document.getElementById('dynamictable'); 
    this.excelService.exportAsExcelFile(element, 'Daily Stock Finish Goods Report on '+this.date);
 }
}
