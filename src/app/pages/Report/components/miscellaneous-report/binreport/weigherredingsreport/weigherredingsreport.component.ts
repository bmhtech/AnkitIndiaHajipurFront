import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../../service/excel.service';
import { Master } from '../../../../../../service/master.service';
import { Weigherreding } from '../../../../../../Models/Report/Weigherreding';

@Component({
  selector: 'app-weigherredingsreport',
  templateUrl: './weigherredingsreport.component.html',
  styleUrls: ['./weigherredingsreport.component.scss']
})
export class WeigherredingsreportComponent implements OnInit {
  
  public userForm:FormGroup;
  public userForm1:FormGroup;
  model: Weigherreding = new Weigherreding();
  weigherredinglist:any=[];
  isHidden:any;;
  status = false;
  businesslists:any=[];
  company_name:any;
  Id:any;
  currentDate:any;
  BuUnit = "0";
  weigherredingsave:boolean=true;
  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService,private excelService:ExcelService) 
  {
    this.userForm=fb.group({
      id:[''],
      date:[''],
      millbreakdownid:[''],
      business_unit:[''],
      msdtopen:[''],
      msdtclose:[''],
      msdtbalance:[''],
      cleaningopen:[''],
      cleaningclose:[''],
      cleaningbalance:[''],
      b1weigheropen:[''],
      b1weigherclose:[''],
      b1weigherbalance:[''],
      branweigheropen:[''],
      branweigherclose:[''],
      branweigherbalance:[''],
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
   get date(){ return this.userForm.get("date") as FormControl }
   get business_unit(){ return this.userForm.get("business_unit") as FormControl }
   get msdtopen(){ return this.userForm.get("msdtopen") as FormControl }
   get msdtclose(){ return this.userForm.get("msdtclose") as FormControl }
   get msdtbalance(){ return this.userForm.get("msdtbalance") as FormControl }
   get cleaningopen(){ return this.userForm.get("cleaningopen") as FormControl }
   get cleaningclose(){ return this.userForm.get("cleaningclose") as FormControl }
   get cleaningbalance(){ return this.userForm.get("cleaningbalance") as FormControl }
   get b1weigheropen(){ return this.userForm.get("b1weigheropen") as FormControl }
   get b1weigherclose(){ return this.userForm.get("b1weigherclose") as FormControl }
   get b1weigherbalance(){ return this.userForm.get("b1weigherbalance") as FormControl }
   get branweigheropen(){ return this.userForm.get("branweigheropen") as FormControl }
   get branweigherclose(){ return this.userForm.get("branweigherclose") as FormControl }
   get branweigherbalance(){ return this.userForm.get("branweigherbalance") as FormControl }
   
   get company_id(){ return this.userForm.get("company_id") as FormControl }
   get fin_year(){ return this.userForm.get("fin_year") as FormControl }
   get username(){ return this.userForm.get("username") as FormControl }

   get fromdate(){ return this.userForm1.get("fromdate") as FormControl }
   get todate(){ return this.userForm1.get("todate") as FormControl }

  ngOnInit() {
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.isHidden=false;
    this.status=true;
   
    this.company_name = localStorage.getItem("company_name");
    let finyear =localStorage.getItem("financial_year");
    this.BuUnit = "0";
     this.weigherredingsave=true;

   forkJoin(
    this.DropDownListService.getWeigherReadingList(this.currentDate,finyear),
    this.DropDownListService.getcompanyBUMNCListnew(this.company_name)
    )
   .subscribe(([otherdata,budata])=>
    {
      //console.log("budata:"+JSON.stringify(budata))
        this.weigherredinglist = otherdata;
        this.businesslists=budata;
    });
  }

  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
      this.weigherredingsave=true;
      this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    }
    if(s=="list")
    {
      this.isHidden=false;
      this.userForm.reset();
    }
  }
 

    msdtcal()
    {
     let total=0;
     total=Number(this.userForm.get("msdtopen").value) - Number(this.userForm.get("msdtclose").value)
     this.userForm.patchValue({msdtbalance:total});
    }
  
    cleaningcal()
    {
     let total1=0;
     total1=Number(this.userForm.get("cleaningopen").value) - Number(this.userForm.get("cleaningclose").value)
     this.userForm.patchValue({cleaningbalance:total1});
    }

    weighercal()
    {
     let total2=0;
     total2=Number(this.userForm.get("b1weigheropen").value) - Number(this.userForm.get("b1weigherclose").value)
     this.userForm.patchValue({b1weigherbalance:total2});
    }

    branweighercal()
    {
     let total3=0;
     total3=Number(this.userForm.get("branweigheropen").value) - Number(this.userForm.get("branweigherclose").value)
     this.userForm.patchValue({branweigherbalance:total3});
    }
   
    send()
    {
      this.Id= this.userForm.get("id").value as FormControl; 
      this.userForm.patchValue({ company_id: localStorage.getItem("company_name"),
        fin_year:localStorage.getItem("financial_year"), 
        username: localStorage.getItem("username")});
        this.status=false;
        if(this.userForm.get("business_unit").value == '' || this.userForm.get("business_unit").value == 0 || this.userForm.get("business_unit").value == null)
        {
          alert("Please Select Bussiness Unit Name!")
          this.status=true;
        }
        else if(this.userForm.get("msdtopen").value == '' || this.userForm.get("msdtopen").value == 0 || this.userForm.get("msdtopen").value == null)
        {
          alert("Please Enter MSDT-500 Opening!")
          this.status=true;
        }
        else if(this.userForm.get("msdtclose").value == '' || this.userForm.get("msdtclose").value == 0 || this.userForm.get("msdtclose").value == null)
        {
          alert("Please Enter MSDT-500 Closing!")
          this.status=true;
        }
        else if(this.userForm.get("cleaningopen").value == '' || this.userForm.get("cleaningopen").value == 0 || this.userForm.get("cleaningopen").value == null)
        {
          alert("Please Enter 1st Cleaning Opening!")
          this.status=true;
        }
        else if(this.userForm.get("cleaningclose").value == '' || this.userForm.get("cleaningclose").value == 0 || this.userForm.get("cleaningclose").value == null)
        {
          alert("Please Enter 1st Cleaning Closing!")
          this.status=true;
        }
        else if(this.userForm.get("b1weigheropen").value == '' || this.userForm.get("b1weigheropen").value == 0 || this.userForm.get("b1weigheropen").value == null)
        {
          alert("Please Enter B1 Weigher Opening!")
          this.status=true;
        }
        else if(this.userForm.get("b1weigherclose").value == '' || this.userForm.get("b1weigherclose").value == 0 || this.userForm.get("b1weigherclose").value == null)
        {
          alert("Please Enter B1 Weigher Closing!")
          this.status=true;
        }
        else if(this.userForm.get("branweigheropen").value == '' || this.userForm.get("branweigheropen").value == 0 || this.userForm.get("branweigheropen").value == null)
        {
          alert("Please Enter Bran Weigher Opening!")
          this.status=true;
        }
        else if(this.userForm.get("branweigherclose").value == '' || this.userForm.get("branweigherclose").value == 0 || this.userForm.get("branweigherclose").value == null)
        {
          alert("Please Enter Bran Weigher Closing!")
          this.status=true;
        }
        else
        {
         
            if(this.Id>0)
            {
              this.Service.updateWeigherReading(this.userForm.getRawValue(), this.Id).subscribe( data => 
                {
                  alert("Weigher Reading Report Updated successfully.");
                  this.userForm.reset();
                  this.isHidden = false;
                  this.showList('list');
                  this.ngOnInit();
                  this.status=true;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Weigher Reading Report !!! please Reload the page and try again....");
                }); 
            }
            else
            {
              this.Service.createWeigherReading(this.userForm.getRawValue())
              .subscribe(data =>
              {
                alert("Weigher Reading Report Saved successfully.");
                this.userForm.reset();
                this.showList('list');
                this.ngOnInit();
                this.status=true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Weigher Reading Report !!! please Reload the page and try again....");
              });
            }
        
        }
      }

        onDelete(id)
        {
          if(confirm("Are you sure to delete this Weigher Reading Report From List?"))
          { 
              this.userForm.patchValue({username: localStorage.getItem("username")});
              this.Service.deleteWeigherReading(this.userForm.getRawValue(),id).subscribe(data=> 
                {
                  alert("Weigher Reading Report Deleted successfully.");
                  this.userForm.reset();
                  this.status = true;
                  this.ngOnInit();
                });
      
          }
        }
       
        onUpdate(id,action)
        {
          this.isHidden=true;
          if(action == "view")
          {
            this.weigherredingsave=false;
          }
          if(action == "update")
          {
            this.weigherredingsave=true;
          }
      
          forkJoin(
            this.DropDownListService.retriveWeigherReading(id),
            this.DropDownListService.getcompanyBUMNCListnew(this.company_name)
            ).subscribe(([weigherreading,bUnitData,])=>
            {
              this.businesslists=bUnitData;
              this.userForm.patchValue(weigherreading);
                 this.status = true;
             }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in Weigher Reading Report,please try again....");
             this.ngOnInit()}); 
        }
      
        search()
        {
          let fromdate=this.userForm1.get("fromdate").value;
          let todate=this.userForm1.get("todate").value;
         
          let finyear =localStorage.getItem("financial_year");
          
          this.status=false;
          this.DropDownListService.searcWeigherReading("fromdate="+fromdate+"&todate="+todate+"&finyear="+finyear).subscribe(data=>
            {
          
              this.weigherredinglist =data;
              this.status=true;
      
            }, (error) => {this.status=true;
              alert("Weigher Reading Report Data Not Found !!!")
              this.weigherredinglist=[];
            })
        }

}
