import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { forkJoin } from 'rxjs';
import { Gateinoutregister } from '../../../../../Models/Report/Gateinoutregister';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';

@Component({
  selector: 'app-gateinandoutregister',
  templateUrl: './gateinandoutregister.component.html',
  styleUrls: ['./gateinandoutregister.component.scss']
})
export class GateinandoutregisterComponent implements OnInit {

  public userForm:FormGroup;
  public userForm1:FormGroup;
  model: Gateinoutregister = new Gateinoutregister();
  isHidden:any;
  gateinoutlist:any = [];
  status = false;
  businesslists:any=[];
  company_name:any;
  Id:any;
  currentDate:any;
  BuUnit = "0";
  gateinoutregistersave:boolean=true;
  company:any;

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService,private excelService:ExcelService,private dialog: MatDialog) 
  { 
    this.userForm=fb.group({
      id:[''],
      gateinoutregisterid:[''],
      business_unit:[''],
      reg_date:[''],
        name:[''],
        dept:[''],
        intime:[''],
        outtime:[''],
        purpose:[''],
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
   get business_unit(){ return this.userForm.get("business_unit") as FormControl }
   get reg_date(){ return this.userForm.get("reg_date") as FormControl }
   get name(){ return this.userForm.get("name") as FormControl }
   get dept(){ return this.userForm.get("dept") as FormControl }
   get intime(){ return this.userForm.get("intime") as FormControl }
   get outtime(){ return this.userForm.get("outtime") as FormControl }
   get purpose(){ return this.userForm.get("purpose") as FormControl }

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
     this.gateinoutregistersave=true;

   forkJoin(
    this.DropDownListService.getGateinoutList(this.currentDate,finyear),
    this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
    this.DropDownListService.getCompanyDetails(localStorage.getItem("company_name"))
    )
   .subscribe(([gateinoutdata,budata,companydata])=>
    {
      console.log("bunit:"+JSON.stringify(gateinoutdata));
        this.gateinoutlist = gateinoutdata;
        this.businesslists=budata;
        this.company=companydata.company_name;
    });

  }
  
  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
      this.gateinoutregistersave=true;
    }
    if(s=="list")
    {
      this.isHidden=false;
      
    }
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
          else
          {
            if(this.Id>0)
            {
              this.Service.updateGateinout(this.userForm.getRawValue(), this.Id).subscribe( data => 
                {
                  alert("Gate In/Out Register Updated successfully.");
                  this.userForm.reset();
                  this.isHidden = false;
                  this.showList('list');
                  this.ngOnInit();
                  this.status=true;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured gate In/Out Register !!! please Reload the page and try again....");
                }); 
            }
            else
            {
              this.Service.createGateinout(this.userForm.getRawValue())
              .subscribe(data =>
              {
                alert("Gate In/Out Register Saved successfully.");
                this.userForm.reset();
                this.showList('list');
                this.ngOnInit();
                this.status=true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Gate In/Out Register !!! please Reload the page and try again....");
              });
            }
          }
          
        }
        
    onDelete(id)
    {
      if(confirm("Are you sure to delete this Gate In/Out Register List?"))
      { 
          this.userForm.patchValue({username: localStorage.getItem("username")});
          this.Service.deleteGateinout(this.userForm.getRawValue(),id).subscribe(data=> 
            {
              alert("Gate In/Out Register Deleted successfully.");
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
      this.gateinoutregistersave=false;
    }
    if(action == "update")
    {
      this.gateinoutregistersave=true;
    }

    forkJoin(
      this.DropDownListService.retriveGateinout(id),
      this.DropDownListService.getcompanyBUMNCListnew(this.company_name)
      ).subscribe(([gateinout,bUnitData])=>
      {
        this.businesslists=bUnitData;
        this.userForm.patchValue(gateinout);
       
        
           this.status = true;
       }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in Gate In/Out,please try again....");
       this.ngOnInit()});  

  }

  search()
  {
    let fromdate=this.userForm1.get("fromdate").value;
    let todate=this.userForm1.get("todate").value;
   
    let finyear =localStorage.getItem("financial_year");
    
    this.status=false;
    this.DropDownListService.searchgateinoutRegister("fromdate="+fromdate+"&todate="+todate+"&finyear="+finyear).subscribe(data=>
      {
    
        this.gateinoutlist =data;
        this.status=true;

      }, (error) => {this.status=true;
        alert("Gate In/Out Register Data Not Found !!!")
        this.gateinoutlist=[];
      })
  }
 
  exportAsXLSX():void 
  {
    let element = document.getElementById('dynamictable'); 
    this.excelService.exportAsExcelFile(element, 'Gate In/out Register');
 }

}
