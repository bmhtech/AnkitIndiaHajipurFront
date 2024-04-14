import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';

@Component({
  selector: 'app-saleorderreport',
  templateUrl: './saleorderreport.component.html',
  styleUrls: ['./saleorderreport.component.scss']
})
export class SaleorderreportComponent implements OnInit {

  public userForm:FormGroup;
  status = false;
  salesOrderList:any=[];
  pertruck:boolean=true;

  constructor(public fb:FormBuilder,private DropDownListService: DropdownServiceService,private excelService:ExcelService,private Service : Master) 
  { 
    this.userForm=fb.group(
    {
      salesfromdate:[''],
      salestodate:['']
    });
  }

  get salesfromdate(){return this.userForm.get("salesfromdate") as FormControl};
  get salestodate(){return this.userForm.get("salestodate") as FormControl};

  ngOnInit() 
  {
    this.status=true;
  }

  searchsalesorder()
  {
    this.status=false;

    let fromdate=this.userForm.get("salesfromdate").value;
    let todate=this.userForm.get("salestodate").value;
    this.DropDownListService.getSalesOrderReport(fromdate,todate).subscribe(SOdata=>
      {
        //console.log("Sales Check ::  "+ JSON.stringify(SOdata))
        this.salesOrderList = SOdata;
        this.status=true;
      }); 
  }

  exportAsXLSX():void 
  {
    let element = document.getElementById('dynamictable'); 
    this.excelService.exportAsExcelFile(element, 'Sales Order Report From ' + this.userForm.get("salesfromdate").value +' to ' + this.userForm.get("salestodate").value);
  }

}
