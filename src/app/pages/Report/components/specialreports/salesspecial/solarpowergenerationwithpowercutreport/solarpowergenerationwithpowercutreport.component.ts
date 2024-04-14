import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../../service/excel.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-solarpowergenerationwithpowercutreport',
  templateUrl: './solarpowergenerationwithpowercutreport.component.html',
  styleUrls: ['./solarpowergenerationwithpowercutreport.component.scss']
})
export class SolarpowergenerationwithpowercutreportComponent implements OnInit 
{
  public userForm:FormGroup;
  businesslists:any=[];
  solarpowerlist:any=[];
  currentDate:any;
  BuUnit:any;
  status = false;

  constructor(public fb:FormBuilder,private Service: Master, private DropDownListService: DropdownServiceService,private excelService:ExcelService) 
  { 
    this.userForm=fb.group(
      {
        business_unit:[''],
        fromdate:[''],
        todate:['']
      });
  }

  get business_unit(){return this.userForm.get("business_unit") as FormControl};
  get fromdate(){return this.userForm.get("fromdate") as FormControl};
  get todate(){return this.userForm.get("todate") as FormControl};

  ngOnInit() 
  {
    this.status=true;
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

    this.DropDownListService.getcompanyBUMNCListnew(localStorage.getItem("company_name"))
    .subscribe(bunit=>
      {
        this.businesslists=bunit;
        this.BuUnit = 'CBU00001';
      })
  }

  search()
  {
    let business_unit=this.userForm.get("business_unit").value;
    let fromdate=this.userForm.get("fromdate").value;
    let todate=this.userForm.get("todate").value;

    this.status = false;

    if(business_unit == '' || business_unit == null || business_unit == 0)
    {
      alert("Please Select Bussiness Unit Name");
      this.status=true;
    }
    else if(fromdate == '' || fromdate == null || fromdate == 0)
    {
      alert("Please Select From Date");
      this.status=true;
    }
    else if(todate == '' || todate == null || todate == 0)
    {
      alert("Please Select To Date");
      this.status=true;
    }
    this.DropDownListService.getSolarPowerWithPowerCutList(fromdate,todate,business_unit).subscribe(data=>
      {
        console.log("data:;"+JSON.stringify(data))
      this.solarpowerlist=data;
      this.status=true;

      }, (error) => {this.status=true;
        alert("Data Not Found !!!")
        this.solarpowerlist=[];
      });
  }

  exportAsXLSX():void 
  {
    let element = document.getElementById('dynamictable'); 
    
    this.excelService.exportAsExcelFile(element, 'SOLAR POWER GENERATION '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
   
  }

}
