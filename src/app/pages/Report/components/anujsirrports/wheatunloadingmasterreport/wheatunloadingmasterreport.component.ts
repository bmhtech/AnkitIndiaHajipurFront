import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-wheatunloadingmasterreport',
  templateUrl: './wheatunloadingmasterreport.component.html',
  styleUrls: ['./wheatunloadingmasterreport.component.scss']
})
export class WheatunloadingmasterreportComponent implements OnInit {

  public userForm10:FormGroup;

  pur_order_list:any=[];
  status = false;

  constructor(public fb:FormBuilder,private DropDownListService: DropdownServiceService,private excelService:ExcelService) { 
    this.userForm10=fb.group(
      {
        orderfromdate:[''],
        ordertodate:['']
      }); 

      
  
  }
  get orderfromdate(){return this.userForm10.get("orderfromdate") as FormControl};
      get ordertodate(){return this.userForm10.get("ordertodate") as FormControl};

  ngOnInit() {
  }


  searchPurOrder()
  {
    let fromdate=this.userForm10.get("orderfromdate").value;
    let todate=this.userForm10.get("ordertodate").value;

    this.status=false;

    this.DropDownListService.getPurOrderReport(formatDate(fromdate, 'yyyy-MM-dd', 'en'),formatDate(todate, 'yyyy-MM-dd', 'en')).subscribe(orderdata=>
      {
        //console.log(" Shree ::  "+ JSON.stringify(orderdata))
        this.pur_order_list = orderdata;

        let pur_bill_no="";
        this.pur_order_list.forEach(element => {
          
          if(pur_bill_no == element.pur_bill_no)
          {
            element.FREIGHT_ADV='0.00';
            element.MOISTURE='0.00';
            element.DALA_CHARGES='0.00';
            element.UP_BROKERAGE='0.00';
            element.QUALITY_CLAIM='0.00';
            element.WB_CHARGES='0.00';
            element.OFFICE_EXP='0.00';
            element.HDPE_BAG='0.00';
            element.TDS_194Q='0.00';
            element.FREIGHT_ADVANCE='0.00';
            element.payable_party='0.00';
          }
          else
          {
            pur_bill_no=element.pur_bill_no;
          }
          
        
        });


        this.status=true;
      });

  }

  exportAsXLSX10():void
  {
    let element = document.getElementById('dynamictable10'); 
    this.excelService.exportAsExcelFile(element, 'Purchase Order From ' + this.userForm10.get("orderfromdate").value +' to ' + this.userForm10.get("ordertodate").value);
  }
}
