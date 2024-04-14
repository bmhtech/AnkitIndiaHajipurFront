import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';
import { Wheatacceptance } from '../../../../../Models/Report/Wheatacceptance';
import { formatDate } from '@angular/common';
import { WheatacceptanceprintpopupComponent } from '../wheatacceptanceprintpopup/wheatacceptanceprintpopup.component';

@Component({
  selector: 'app-wheatacceptancereport',
  templateUrl: './wheatacceptancereport.component.html',
  styleUrls: ['./wheatacceptancereport.component.scss']
})
export class WheatacceptancereportComponent implements OnInit {

  public userForm:FormGroup;
  public userForm1:FormGroup;
  model: Wheatacceptance = new Wheatacceptance();
  currentDate:any;
  isHidden:any;
  wheatacceptancelist:any = [];
  status = false;
  veh_nos:any=[];
  employeelist:any=[];
  company_name:any;
  Id:any;
  wheatacceptancesave:boolean=true;

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService,private excelService:ExcelService,private dialog: MatDialog) 
  { 
    this.userForm=fb.group({
      id:[''],
      acceptanceid:[''],
      date:[''],
      vehicle_id:[''],
      grade:[''],
      hlw:[''],
      moisture_dm:[''],
      moisture_am:[''],
      wet_gluten:[''],
      sv:[''],
      stone:[''],
      infestation:[''],
      odour:[''],
      stack_no:[''],
      master_hlw:[''],
      oven_moisture:[''],
      sixmm:[''],
      twomm:[''],
      ofg:[''],
      idk:[''],
      master_stone:[''],
      total_impurities:[''],
      broken_shirvilled:[''],
      grand_total:[''],
      potia:[''],
      kb:[''],
      master_infestation:[''],
      master_odour:[''],
      lab_chemist:[''],

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
   get vehicle_id(){ return this.userForm.get("vehicle_id") as FormControl }
   get grade(){ return this.userForm.get("grade") as FormControl }
   get hlw(){ return this.userForm.get("hlw") as FormControl }
   get moisture_dm(){ return this.userForm.get("moisture_dm") as FormControl }
   get moisture_am(){ return this.userForm.get("moisture_am") as FormControl }
   get wet_gluten(){ return this.userForm.get("wet_gluten") as FormControl }
   get sv(){ return this.userForm.get("sv") as FormControl }
   get stone(){ return this.userForm.get("stone") as FormControl }
   get infestation(){ return this.userForm.get("infestation") as FormControl }
   get odour(){ return this.userForm.get("odour") as FormControl }
   get stack_no(){ return this.userForm.get("stack_no") as FormControl }
   get master_hlw(){ return this.userForm.get("master_hlw") as FormControl }
   get oven_moisture(){ return this.userForm.get("oven_moisture") as FormControl }
   get sixmm(){ return this.userForm.get("sixmm") as FormControl }
   get twomm(){ return this.userForm.get("twomm") as FormControl }
   get ofg(){ return this.userForm.get("ofg") as FormControl }
   get idk(){ return this.userForm.get("idk") as FormControl }
   get master_stone(){ return this.userForm.get("master_stone") as FormControl }
   get total_impurities(){ return this.userForm.get("total_impurities") as FormControl }
   get broken_shirvilled(){ return this.userForm.get("broken_shirvilled") as FormControl }
   get grand_total(){ return this.userForm.get("grand_total") as FormControl }
   get potia(){ return this.userForm.get("potia") as FormControl }
   get kb(){ return this.userForm.get("kb") as FormControl }
   get master_infestation(){ return this.userForm.get("master_infestation") as FormControl }
   get master_odour(){ return this.userForm.get("master_odour") as FormControl }
   get lab_chemist(){ return this.userForm.get("lab_chemist") as FormControl }
   
   get company_id(){ return this.userForm.get("company_id") as FormControl }
   get fin_year(){ return this.userForm.get("fin_year") as FormControl }
   get username(){ return this.userForm.get("username") as FormControl }
   

   get fromdate(){ return this.userForm1.get("fromdate") as FormControl }
   get todate(){ return this.userForm1.get("todate") as FormControl }

  ngOnInit() 
  {
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.isHidden=false;
    this.status=true;
    
    this.company_name = localStorage.getItem("company_name");
    let finyear =localStorage.getItem("financial_year");
     this.wheatacceptancesave=true;
     forkJoin(
      this.DropDownListService.getWheatAcceptancelist(this.currentDate,finyear),
      this.DropDownListService.getVehicleNameCode(),
      this.DropDownListService.getEmployeeNamenew(this.company_name)
      )
     .subscribe(([acceptance,vehicledata,emplist])=>
      {
       // console.log("acceptance:"+JSON.stringify(acceptance))
          this.wheatacceptancelist = acceptance;
          this.veh_nos=vehicledata;
          this.employeelist=emplist;
      });
  }
  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
      this.wheatacceptancesave=true;
      this.userForm.reset();
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
        if(this.userForm.get("date").value == '' || this.userForm.get("date").value == 0 || this.userForm.get("date").value == null)
        {
          alert("Please Enter Date!")
          this.status=true;
          }
        else if(this.userForm.get("vehicle_id").value == '' || this.userForm.get("vehicle_id").value == 0 || this.userForm.get("vehicle_id").value == null)
        {
          alert("Please Select Shift!")
          this.status=true;
        }
          else
          {
            if(this.Id>0)
            {
              this.Service.updateWheatAcceptance(this.userForm.getRawValue(), this.Id).subscribe( data => 
                {
                  alert("Wheat Acceptance Report Updated successfully.");
                  this.userForm.reset();
                  this.isHidden = false;
                  this.showList('list');
                  this.ngOnInit();
                  this.status=true;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Wheat Acceptance Report !!! please Reload the page and try again....");
                }); 
            }
            else
            {
              this.Service.createWheatAcceptance(this.userForm.getRawValue())
              .subscribe(data =>
              {
                alert("Wheat Acceptance Report Saved successfully.");
                this.userForm.reset();
                this.showList('list');
                this.ngOnInit();
                this.status=true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Wheat Acceptance Report !!! please Reload the page and try again....");
              });
            }
          }
         
        }

       onDelete(id)
        {
          if(confirm("Are you sure to delete this Wheat Acceptance Report From List?"))
          { 
              this.userForm.patchValue({username: localStorage.getItem("username")});
              this.Service.deleteWheatAcceptance(this.userForm.getRawValue(),id).subscribe(data=> 
                {
                  alert("Wheat Acceptance Report Deleted successfully.");
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
            this.wheatacceptancesave=false;
          }
          if(action == "update")
          {
            this.wheatacceptancesave=true;
          }
      
          forkJoin(
            this.DropDownListService.retriveWheatAcceptance(id),
            this.DropDownListService.getVehicleNameCode(),
            this.DropDownListService.getEmployeeNamenew(this.company_name)
            ).subscribe(([wheatacceptance,vehicledata,empdata])=>
            {
              this.veh_nos=vehicledata;
              this.employeelist=empdata;
              this.userForm.patchValue(wheatacceptance);
              this.status = true;
            });
            this.status = true;
        }
      
      search()
      {
        let fromdate=this.userForm1.get("fromdate").value;
        let todate=this.userForm1.get("todate").value;
        
        let finyear =localStorage.getItem("financial_year");
        
        this.status=false;
        this.DropDownListService.searchWheatAcceptance("fromdate="+fromdate+"&todate="+todate+"&finyear="+finyear).subscribe(data=>
          {
        
            this.wheatacceptancelist =data;
            this.status=true;
    
          }, (error) => {this.status=true;
            alert("Wheat Acceptance Report Data Not Found !!!")
            this.wheatacceptancelist=[];
          })
      }
      
          
      print(acceptanceid)
      {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {  };
        
        let dialogRef = this.dialog.open(WheatacceptanceprintpopupComponent, {data: {acceptanceid: acceptanceid}, height: '80%',
        width: '80%'});
        dialogRef.afterClosed().subscribe( data => 
        {
        
        }); 
    
      }

}
