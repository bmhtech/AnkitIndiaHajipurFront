import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { forkJoin } from 'rxjs';
import { Gatepassregister } from '../../../../../Models/Report/Gatepassregister';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';

@Component({
  selector: 'app-gatepassregister',
  templateUrl: './gatepassregister.component.html',
  styleUrls: ['./gatepassregister.component.scss']
})
export class GatepassregisterComponent implements OnInit {
 
  public userForm:FormGroup;
  public userForm1:FormGroup;
  model: Gatepassregister = new Gatepassregister();
  isHidden:any;
  gatepassregisterlist:any = [];
  status = false;
  employeelist:any=[];
  company_name:any;
  Id:any;
  currentDate:any;
  gatepassregistersave:boolean=true;
  company:any;

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService,private excelService:ExcelService,private dialog: MatDialog) 
  { 
    this.userForm=fb.group({
      id:[''],
      gatepassregisterid:[''],
      gp_slno:[''],
      gp_date:[''],
      name:[''],
      vehicle:[''],
      paidnonpaid:[''],
      particulars:[''],
      rate:[''],
      amount:[''],
      approvedby:[''],
      indate:[''],
      remarks:[''],
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
   get gp_slno(){ return this.userForm.get("gp_slno") as FormControl }
   get gp_date(){ return this.userForm.get("gp_date") as FormControl }
   get name(){ return this.userForm.get("name") as FormControl }
   get vehicle(){ return this.userForm.get("vehicle") as FormControl }
   get paidnonpaid(){ return this.userForm.get("paidnonpaid") as FormControl }
   get particulars(){ return this.userForm.get("particulars") as FormControl }
   get rate(){ return this.userForm.get("rate") as FormControl }
   get amount(){ return this.userForm.get("amount") as FormControl }
   get approvedby(){ return this.userForm.get("approvedby") as FormControl }
   get indate(){ return this.userForm.get("indate") as FormControl }
   get remarks(){ return this.userForm.get("remarks") as FormControl }

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
     this.gatepassregistersave=true;

   forkJoin(
    this.DropDownListService.getGatepassRegisterList(this.currentDate,finyear),
    this.DropDownListService.getEmployeeNamenew(this.company_name),
    this.DropDownListService.getCompanyDetails(localStorage.getItem("company_name"))
    )
   .subscribe(([gatepassdata,emplist,companydata])=>
    {
      console.log("bunit:"+JSON.stringify(gatepassdata));
        this.gatepassregisterlist = gatepassdata;
        this.employeelist=emplist;
        this.company=companydata.company_name;
    });

  }
  
  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
      this.gatepassregistersave=true;
      this.userForm.reset();
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
        if(this.userForm.get("name").value == '' || this.userForm.get("name").value == 0 || this.userForm.get("name").value == null)
        {
          alert("Please Enter Name!")
          this.status=true;
        }
        else if(this.userForm.get("approvedby").value == '' || this.userForm.get("approvedby").value == 0 || this.userForm.get("approvedby").value == null)
        {
          alert("Please Select Approved By!")
          this.status=true;
        }
        else
        {
          if(this.Id>0)
          {
            this.Service.updateGatepassRegister(this.userForm.getRawValue(), this.Id).subscribe( data => 
              {
                alert("GatePass Register Updated successfully.");
                this.userForm.reset();
                this.isHidden = false;
                this.showList('list');
                this.ngOnInit();
                this.status=true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured GatePass Register !!! please Reload the page and try again....");
              }); 
          }
          else
          {
            this.Service.createGatepassRegister(this.userForm.getRawValue())
            .subscribe(data =>
            {
              alert("GatePass Register Saved successfully.");
              this.userForm.reset();
              this.showList('list');
              this.ngOnInit();
              this.status=true;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured GatePass Register !!! please Reload the page and try again....");
            });
          }
        }
          
        }
        
    onDelete(id)
    {
      if(confirm("Are you sure to delete this GatePass Register List?"))
      { 
          this.userForm.patchValue({username: localStorage.getItem("username")});
          this.Service.deleteGatePassRegister(this.userForm.getRawValue(),id).subscribe(data=> 
            {
              alert("GatePass Register Deleted successfully.");
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
      this.gatepassregistersave=false;
    }
    if(action == "update")
    {
      this.gatepassregistersave=true;
    }

    forkJoin(
      this.DropDownListService.retriveGatePassRegister(id),
      this.DropDownListService.getEmployeeNamenew(this.company_name)
      ).subscribe(([gatepass,emplist])=>
      {
        this.employeelist=emplist;
        this.userForm.patchValue(gatepass);
       
        
           this.status = true;
       }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in Gatepass Register,please try again....");
       this.ngOnInit()});  

  }

  search()
  {
    let fromdate=this.userForm1.get("fromdate").value;
    let todate=this.userForm1.get("todate").value;
   
    let finyear =localStorage.getItem("financial_year");
    
    this.status=false;
    this.DropDownListService.searchgatePassRegister("fromdate="+fromdate+"&todate="+todate+"&finyear="+finyear).subscribe(data=>
      {
    
        this.gatepassregisterlist =data;
        this.status=true;

      }, (error) => {this.status=true;
        alert("GatePass Register Data Not Found !!!")
        this.gatepassregisterlist=[];
      })
  }
 
  exportAsXLSX():void 
  {
    let element = document.getElementById('dynamictable'); 
    this.excelService.exportAsExcelFile(element, 'GatePass Register');
 }

}

