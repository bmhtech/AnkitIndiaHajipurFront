import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../../service/excel.service';
import { element } from 'protractor';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-inverterwisesolarpowergeneration',
  templateUrl: './inverterwisesolarpowergeneration.component.html',
  styleUrls: ['./inverterwisesolarpowergeneration.component.scss']
})
export class InverterwisesolarpowergenerationComponent implements OnInit {
  public userForm:FormGroup;
  status = false;
  listsolar:any = [];
  bussiness_unit_list:any=[];
  currentDate:any;
  BuUnit:any;
  total:any;
  headingtop:any;
  company_name:any;

  constructor(public fb:FormBuilder, private DropDownListService: DropdownServiceService,private excelService:ExcelService)
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

  ngOnInit() {
    this.status=true; 
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    forkJoin(
    this.DropDownListService.getcompanyBUMNCListnew(localStorage.getItem("company_name")),
    this.DropDownListService.getCompanyDetails(localStorage.getItem("company_name"))
    ).subscribe(([data,companydata])=>
    {
      this.bussiness_unit_list=data;
      this.company_name=companydata.company_name;
    });
    this.BuUnit="CBU00001";
  }
  search()
  {
    this.status=false;
    let business_unit= this.userForm.get("business_unit").value;
    let fromdate=this.userForm.get("fromdate").value;
    let todate=this.userForm.get("todate").value;
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
    
    else{
        this.DropDownListService.getInverterSolarPowerGeneration(business_unit,fromdate,todate).subscribe(data=>
        {
          //console.log(" report1  :: "+JSON.stringify(data))
            this.listsolar=data;
            data.forEach(element =>
              {
                this.total=(Number(element["no_one"]) + Number(element["no_two"]) + Number(element["no_three"]) + Number(element["no_four"]) + Number(element["no_five"]) + Number(element["no_six"]) + Number(element["no_seven"]) + Number(element["no_eight"]) + Number(element["no_nine"]) + Number(element["no_ten"]) + Number(element["no_eleven"])).toFixed(2);
              });
            
            this.headingtop=('RM DETAILS OF INVERTERWISE SOLAR POWER GENERATION IN PERCENTAGE AS ON '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' AT '+ new Date().toString().substr(16, 5)+' REPORT FROM ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' TO ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
            
            this.status=true;

        }, (error) => {this.status=true;
          alert("Data Not Found !!!")
          this.listsolar=[];
        });
      }
    }

    exportAsXLSX():void 
    {
      let element = document.getElementById('dynamictable'); 
      
        this.excelService.exportAsExcelFile(element, 'RM DETAILS OF INVERTERWISE SOLAR POWER GENERATION IN PERCENTAGE As ON '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' AT '+ new Date().toString().substr(16, 5)+' REPORT FROM ' + formatDate(this.userForm.get("fromdate").value, 'dd-MM-yyyy', 'en') +' TO ' + formatDate(this.userForm.get("todate").value, 'dd-MM-yyyy', 'en'));
     
   }

}
