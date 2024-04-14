import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Dieselusedimport } from '../../../../../Models/Report/dieselusedimport';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';

@Component({
  selector: 'app-dieselusedimportreport',
  templateUrl: './dieselusedimportreport.component.html',
  styleUrls: ['./dieselusedimportreport.component.scss']
})
export class DieselusedimportreportComponent implements OnInit {

  public userForm:FormGroup;
  public userForm1:FormGroup;
  model: Dieselusedimport = new Dieselusedimport();
  currentDate:any;
  currentTime:any;
  isHidden:any;
  dieselusedlist:any = [];
  status = false; 
  businesslists:any=[];
  company_name:any;
  BuUnit:any;
  Id:any;
  dieselusedsave:boolean=true;
  company:any;

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService,private excelService:ExcelService) 
  { 
    this.userForm=fb.group({
      id:[''],
      dieselusedimportid:[''],
      business_unit:[''],   
      date:[''],
      litter_opening:[''],
      opening_percentage:[''],
      use_litter:['0'],
      use_percentage:['0'],
      litter_balance:['0'],
      balance_percentage:['0'],
      hours:[''],
      average:[''],
      stock:[''],
      company_id:[''],
      fin_year:[''],
      username:['']
    });

    this.userForm1=fb.group(
      {
        fromdate:[''],
        todate:['']
      });

  }

  get id(){ return this.userForm.get("id") as FormControl }
  get dieselusedimportid(){ return this.userForm.get("dieselusedimportid") as FormControl }
  get business_unit(){ return this.userForm.get("business_unit") as FormControl }
  get date(){ return this.userForm.get("date") as FormControl }
  get litter_opening(){ return this.userForm.get("litter_opening") as FormControl }
  get use_litter(){ return this.userForm.get("use_litter") as FormControl }
  get use_percentage(){ return this.userForm.get("use_percentage") as FormControl }
  get litter_balance(){ return this.userForm.get("litter_balance") as FormControl }
  get balance_percentage(){ return this.userForm.get("balance_percentage") as FormControl }
  get hours(){ return this.userForm.get("hours") as FormControl }
  get average(){ return this.userForm.get("average") as FormControl }
  get stock(){ return this.userForm.get("stock") as FormControl }
  get company_id(){ return this.userForm.get("company_id") as FormControl }
  get fin_year(){ return this.userForm.get("fin_year") as FormControl }
  get username(){ return this.userForm.get("username") as FormControl }

  get fromdate(){ return this.userForm1.get("fromdate") as FormControl }
   get todate(){ return this.userForm1.get("todate") as FormControl }

  ngOnInit() 
  {
    this.dieselusedsave=true;
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.isHidden=false;
    this.status=true;
    this.company_name = localStorage.getItem("company_name");
    let finyear =localStorage.getItem("financial_year");
    this.BuUnit = "0";
    
  


    forkJoin(
      this.DropDownListService.getDieselusedimportlist(this.currentDate,finyear),
      this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
      this.DropDownListService.getCompanyDetails(localStorage.getItem("company_name"))
    )
   .subscribe(([diesellist,budata,companydata])=>
    {
      console.log(JSON.stringify(diesellist))
     this.dieselusedlist=diesellist;
        this.businesslists=budata;
        this.company=companydata.company_name;
    });
  }

  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
      this.dieselusedsave=true;
    }
    if(s=="list")
    {
      this.isHidden=false;
      this.userForm.reset();
      
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
        
        

        this.Service.updatedieselusedimport(this.userForm.getRawValue(), this.Id).subscribe( data => 
          {
          
            alert("Diesel Used Report Updated successfully.");
            this.userForm.reset();
            this.isHidden = false;
            this.showList('list');
            this.ngOnInit();
            this.status=true;
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Diesel Used Report !!! please Reload the page and try again....");
          }); 


      
      }
      else
      {
        
        
        this.Service.createdieselusedimport(this.userForm.getRawValue())
        .subscribe(data =>
        {
          alert("Diesel Used Report Saved successfully.");
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
    if(confirm("Are you sure to delete this Diesel Used Report List?"))
    { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        
        this.Service.deletedieselusedimport(this.userForm.getRawValue(),id).subscribe(data=> 
          {
            alert("Diesel Used Report Deleted successfully.");
            this.userForm.reset();
            this.status = true;
            this.ngOnInit();
          });
    }
  }

  exportAsXLSX():void 
  {
    let element = document.getElementById('dynamictable'); 
    this.excelService.exportAsExcelFile(element, 'Diesel Used Import Report ');
 }

 search()
 {
   let fromdate=this.userForm1.get("fromdate").value;
   let todate=this.userForm1.get("todate").value;
  
   let finyear =localStorage.getItem("financial_year");
   
   this.status=false;
   this.DropDownListService.searchDieselusedimportReport("fromdate="+fromdate+"&todate="+todate+"&finyear="+finyear).subscribe(data=>
     {
   
      this.dieselusedlist=data;
       this.status=true;

     }, (error) => {this.status=true;
       alert("Diesel Used Data Not Found !!!")
       this.dieselusedlist=[];
     })
 }

 onUpdate(id,action)
 {
   this.isHidden=true;
   if(action == "view")
   {
     this.dieselusedsave=false;
   }
   if(action == "update")
   {
     this.dieselusedsave=true;
   }
   
   forkJoin(
   this.DropDownListService.retrivedieselusedimport(id),
   this.DropDownListService.getcompanyBUMNCListnew(this.company_name)
   ).subscribe(([dieselusedlist,bUnitData])=>
   {
     this.businesslists=bUnitData;
    
     this.userForm.patchValue(dieselusedlist);

        this.status = true;
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in Diesel used,please try again....");
    this.ngOnInit()}); 

 }

 getOpeningLitter()
 {

    
    let open_percen=(Number(this.userForm.get("litter_opening").value)*100)/150;
    let used_percen=(Number(this.userForm.get("use_litter").value)*100)/150;
    this.userForm.patchValue({opening_percentage:open_percen.toFixed(2),use_percentage:used_percen.toFixed(2)});

    let bal=Number(this.userForm.get("litter_opening").value)-Number(this.userForm.get("use_litter").value);
    let per=Number(this.userForm.get("opening_percentage").value)-Number(this.userForm.get("use_percentage").value);
    this.userForm.patchValue({litter_balance:bal.toFixed(2),balance_percentage:per.toFixed(2)});

 }
 
 getUseLitter()
 {
  let uselitter=this.userForm.get("use_litter").value;
  let litter_opening=this.userForm.get("litter_opening").value;
  
  //let per=(Number(uselitter)/Number(litter_opening))*100;
  let per=(Number(uselitter)/150)*100;
  this.userForm.patchValue({use_percentage:per.toFixed(2)});
  let bal=Number(this.userForm.get("litter_opening").value)-Number(this.userForm.get("use_litter").value);
  let balper=Number(this.userForm.get("opening_percentage").value-Number(this.userForm.get("use_percentage").value));
  this.userForm.patchValue({litter_balance:bal.toFixed(2),balance_percentage:balper});


 }



}
