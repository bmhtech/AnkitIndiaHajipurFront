import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../../service/excel.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-binreportspopup',
  templateUrl: './binreportspopup.component.html',
  styleUrls: ['./binreportspopup.component.scss']
})

export class BinreportspopupComponent implements OnInit {
  
  ID:any;
  company_name:any; 
  binreportid:any;
  grouplist:any=[];
  binname:any=[];

  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<BinreportspopupComponent>, @Inject(MAT_DIALOG_DATA)data,private excelService:ExcelService) 
    {
      
      this.ID=data["alldata"];
      this.binreportid=data["binreportid"];


    }

    ngOnInit() 
    {

      forkJoin(
        this.DropDownListService.retrivebillreportDetails(this.binreportid),
        this.DropDownListService.retrivebillreportcolumnDetails(this.binreportid)
        ).subscribe(([dynamicdetails,columndata])=>  
          { 
              this.binname=dynamicdetails;
              this.grouplist=columndata;
              console.log("columndata "+JSON.stringify(columndata))
          });
    }

}
