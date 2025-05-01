import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';

@Component({
  selector: 'app-aisalesreport',
  templateUrl: './aisalesreport.component.html',
  styleUrls: ['./aisalesreport.component.scss']
})
export class AisalesreportComponent implements OnInit {
  public userForm: FormGroup;

  status = false;
  SalesTransportation: any = [];

  TransTo: any;
  SalesTransFromDate: any;
  SalesTransToDate: any;

  constructor(public fb: FormBuilder, private DropDownListService: DropdownServiceService, private excelService: ExcelService) 
  { 
    this.userForm = fb.group(
      {
        salestransfromdate: [''],
        salestranstodate: [''],
        trans_to: ['']
      });
  }

  get salestransfromdate() { return this.userForm.get("salestransfromdate") as FormControl };
  get salestranstodate() { return this.userForm.get("salestranstodate") as FormControl };
  get trans_to() { return this.userForm.get("trans_to") as FormControl };

  ngOnInit() {
    this.status = true;
  }

  searchSalesTrans() {

    this.SalesTransFromDate = this.userForm.get("salestransfromdate").value;
    this.SalesTransToDate = this.userForm.get("salestranstodate").value;
    this.TransTo = this.userForm.get("trans_to").value;

    this.status = false;

    if (this.SalesTransFromDate == null || this.SalesTransFromDate == '' || this.SalesTransFromDate == 0) {
      alert("Select From Date ....");
      this.status = true;
    }
    else if (this.SalesTransToDate == null || this.SalesTransToDate == '' || this.SalesTransToDate == 0) {
      alert("Select To Date ....");
      this.status = true;
    }
    else if (this.TransTo == null || this.TransTo == '' || this.TransTo == 0) {
      alert("Select Transportated To ....");
      this.status = true;
    }
    else {
      this.DropDownListService.getSalesTransportationReport(this.SalesTransFromDate,this.SalesTransToDate,this.TransTo).subscribe(data => {
        console.log(" Sales Transportation:: " + JSON.stringify(data));
        this.SalesTransportation = data;
        this.status = true;
      });
    }
  }

  exportAsXLSX(): void {
    let element = document.getElementById('dynamictable');
    this.excelService.tableToExcelwtFormat(element, 'Sales Transportation of '+this.TransTo+' from '+ this.SalesTransFromDate+' to '+this.SalesTransToDate);
  }

}
