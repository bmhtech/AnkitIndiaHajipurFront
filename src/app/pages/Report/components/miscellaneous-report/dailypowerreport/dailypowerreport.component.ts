import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';
import { Dailypowerreport } from '../../../../../Models/Report/dailypowerreport';
import { formatDate } from '@angular/common';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-dailypowerreport',
  templateUrl: './dailypowerreport.component.html',
  styleUrls: ['./dailypowerreport.component.scss']
})
export class DailypowerreportComponent implements OnInit {

  public userForm:FormGroup;
  public userForm1:FormGroup;
  model: Dailypowerreport = new Dailypowerreport();
  currentDate:any;
  currentTime:any;
  isHidden:any;
  dailypowerreportlist:any = [];
  status = false;
  businesslists:any=[];
  daliypowerlist:any=[];
  company_name:any;
  BuUnit:any;
  Id:any;
  date_export:any;
  daliypowersave:boolean=true;
  company:any;

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService,private excelService:ExcelService) 
   { 

    this.userForm=fb.group({
      id:[''],
      dailyreportid:[''],
      business_unit:[''],    
      date:[''],
      time:[''],
      am_pm:[''],
      mwh:[''],
      mvah:[''],
      differencemvah:[''],
      differencemwh:[''],
      unit:[''],
      company_id:[''],
      fin_year:[''],
      username:[''],
    });


    this.userForm1=fb.group(
      {
        fromdate:[''],
        todate:['']
      });
   }

   get id(){ return this.userForm.get("id") as FormControl }
   get dailyreportid(){ return this.userForm.get("dailyreportid") as FormControl }
   get business_unit(){ return this.userForm.get("business_unit") as FormControl }
   get date(){ return this.userForm.get("date") as FormControl }
   get time(){ return this.userForm.get("time") as FormControl }
   get am_pm(){ return this.userForm.get("am_pm") as FormControl }
   get mwh(){ return this.userForm.get("mwh") as FormControl }
   get mvah(){ return this.userForm.get("mvah") as FormControl }
   get differencemvah(){ return this.userForm.get("differencemvah") as FormControl }
   get differencemwh(){ return this.userForm.get("differencemwh") as FormControl }
   get unit(){ return this.userForm.get("unit") as FormControl }
   get company_id(){ return this.userForm.get("company_id") as FormControl }
   get fin_year(){ return this.userForm.get("fin_year") as FormControl }
   get username(){ return this.userForm.get("username") as FormControl }

   
   get fromdate(){ return this.userForm1.get("fromdate") as FormControl }
   get todate(){ return this.userForm1.get("todate") as FormControl }

  ngOnInit()
  {
    this.daliypowersave=true;
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.isHidden=false;
    this.status=true;
    this.company_name = localStorage.getItem("company_name");
    let finyear =localStorage.getItem("financial_year");
    this.BuUnit = "0";

    // console.log(" 500.515 : "+Number("500.515").toFixed(2) + " /500.545: " + Number("500.545").toFixed(2) )
    // console.log(" 500.525 : "+Number("500.525").toFixed(2)+" 500.535 : "+Number("500.535").toFixed(2))

    console.log(" 500.515 : "+ Math.round(Number("500.515")*100)/100 + " /500.545: " +  Math.round(Number("500.545")*100)/100)
    // console.log(" 500.525 : "+ Math.round(Number("500.525")*100)/100+" 500.535 : "+ Math.round(Number("500.535")*100)/100)


    // console.log(" 500.514 : "+ Math.round(Number("500.514")*100)/100 + " /500.544: " +  Math.round(Number("500.544")*100)/100)
    // console.log(" 500.524 : "+ Math.round(Number("500.524")*100)/100+" 500.534 : "+ Math.round(Number("500.534")*100)/100)

    //let numa= 107.755;
    //let precision = 2;

   
    //console.log('math round 2', this.round(numa,2));
  
    forkJoin(
      this.DropDownListService.getdailypowerreportlist(this.currentDate,finyear),
      this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
      this.DropDownListService.getCompanyDetails(localStorage.getItem("company_name"))
    )
   .subscribe(([dailylist,budata,companydata])=>
    {
        this.daliypowerlist=dailylist;
        this.businesslists=budata;
        this.company=companydata.company_name;
       // console.log("company name::"+this.company)
    });


  }

  round(number, decimals = 0) {
    let strNum = '' + number;
    let negCoef = number < 0 ? -1 : 1;
    let dotIndex = strNum.indexOf('.');
    let start = dotIndex + decimals + 1;
    let dec = Number.parseInt(strNum.substring(start, start + 1));
    let remainder = dec >= 5 ? 1 / Math.pow(10, decimals) : 0;
    let result = Number.parseFloat(strNum.substring(0, start)) + remainder * negCoef;
    return result.toFixed(decimals);
}

  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
      this.daliypowersave=true;
      
    }
    if(s=="list")
    {
      this.isHidden=false;
      
    }
  }
  
  onChangeampm(currentTime)
  {
   let hours = currentTime.target.value 
    var timesubs = hours.substring(0,2)
    
    if(timesubs>=12)
    {
      this.userForm.patchValue({am_pm:'PM'});
    }
    if(timesubs<=12){
      this.userForm.patchValue({am_pm:'AM'});
    }
  }


  send()
  {
    this.Id= this.userForm.get("id").value as FormControl; 
    this.userForm.patchValue({ company_id: localStorage.getItem("company_name"),
      fin_year:localStorage.getItem("financial_year"), 
      username: localStorage.getItem("username")});
      this.status=false;

      if(this.userForm.get("business_unit").value =='' ||this.userForm.get("business_unit").value ==null  || this.userForm.get("business_unit").value =='0' )
      {
        alert("Please Select Bussiness Unit Name !!!!!!!");
        this.status=true;
      }
    
      else
      {
        if(this.Id>0)
        {
          
          

          this.Service.updatedailypowerreport(this.userForm.getRawValue(), this.Id).subscribe( data => 
            {
            
              alert("Daily Power Report Updated successfully.");
              this.userForm.reset();
              this.isHidden = false;
              this.showList('list');
              this.ngOnInit();
              this.status=true;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Power Cut Report !!! please Reload the page and try again....");
            }); 


        
        }
        else
        {
          
          
          this.Service.createdailypowerreport(this.userForm.getRawValue())
          .subscribe(data =>
          {
            alert("Daily Power Report Saved successfully.");
            this.userForm.reset();
            this.showList('list');
            this.ngOnInit();
            this.status=true;

          });
        }
      }


  }

  onDelete(id)
  {
    if(confirm("Are you sure to delete this Daily Power Report List?"))
    { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        
        this.Service.deletedailypowerreport(this.userForm.getRawValue(),id).subscribe(data=> 
          {
            alert("Daily Power Report Deleted successfully.");
            this.userForm.reset();
            this.status = true;
            this.ngOnInit();
          });
    }
  }

  

  exportAsXLSX():void 
  {
    let element = document.getElementById('dynamictable'); 
    this.excelService.exportAsExcelFile(element, 'Daily Power Report ');
 }

 search()
 {
   let fromdate=this.userForm1.get("fromdate").value;
   let todate=this.userForm1.get("todate").value;
  
   let finyear =localStorage.getItem("financial_year");
   
   this.status=false;
   this.DropDownListService.searchdailypowerreport("fromdate="+fromdate+"&todate="+todate+"&finyear="+finyear).subscribe(data=>
     {
   
      this.daliypowerlist=data;
       this.status=true;

     }, (error) => {this.status=true;
       alert("Daily Power Data Not Found !!!")
       this.daliypowerlist=[];
     })
 }

 onUpdate(id,action)
 {
   this.isHidden=true;
   if(action == "view")
   {
     this.daliypowersave=false;
   }
   if(action == "update")
   {
     this.daliypowersave=true;
   }
   forkJoin(
   this.DropDownListService.retrivedailypowerreport(id),
   this.DropDownListService.getcompanyBUMNCListnew(this.company_name)
   ).subscribe(([dalyreportlist,bUnitData])=>
   {
     this.businesslists=bUnitData;
    
     this.userForm.patchValue(dalyreportlist);

        this.status = true;
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in power cut,please try again....");
    this.ngOnInit()}); 

 }

}
