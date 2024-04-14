import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dailyweigherreportpopup',
  templateUrl: './dailyweigherreportpopup.component.html',
  styleUrls: ['./dailyweigherreportpopup.component.scss']
})
export class DailyweigherreportpopupComponent implements OnInit {
  
  //status = false;
  machine:any;
  weigherdate:any;
  DailyWeigherList:any=[];
  totalbags:any;
  totalkgs:any;
  oacumwt:any;
  cacumwt:any;
  differencekgs:any;
  oacumpcs:any;
  cacumpcs:any;
  differencebags:any;
  differencepcs:any;
  differencewt:any;

  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,private excelService:ExcelService,
    private dialogRef: MatDialogRef<DailyweigherreportpopupComponent>, @Inject(MAT_DIALOG_DATA)data) 
  { 
    //console.log("JSON DATA: "+JSON.stringify(data))
    this.machine=data['machine'];
    this.weigherdate=data['weigherdate'];
  }

  ngOnInit() 
  {
    console.log("FFFF ::"+this.machine);
    console.log("WWWW ::"+this.weigherdate);
    this.DropDownListService.getDailyWeigherReport(this.weigherdate,this.machine).subscribe(data=>
      {
        console.log(JSON.stringify(data));
        this.DailyWeigherList=data;
        this.totalbags=data[0]["totalbags"];
        this.totalkgs=data[0]["totalkgs"];
        this.oacumwt=data[0]["oacumwt"];
        this.cacumwt=data[0]["cacumwt"];
        this.differencekgs=data[0]["differencekgs"];
        this.oacumpcs=data[0]["oacumpcs"];
        this.cacumpcs=data[0]["cacumpcs"];
        this.differencebags=data[0]["differencebags"];

        this.differencewt=Number(this.differencekgs-this.totalkgs);
        this.differencepcs=Number(this.differencebags-this.totalbags);
                
        //console.log("BBBB ::"+this.totalbags+" KKKK :: "+this.totalkgs);
      });
  }

  exportAsXLSX():void 
  {
    let element = document.getElementById('dynamictable');
    
    this.excelService.exportAsExcelFile(element, 'Daily Weigher Report As On '+ formatDate(this.weigherdate, 'dd-MM-yyyy', 'en'));
   
  }

}
