import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { Master } from '../../../../../service/master.service';
import { PowerCutReport } from '../../../../../Models/Report/power-cut-report';
import { formatDate } from '@angular/common';
import { PageEvent } from '@angular/material';
import { forkJoin } from 'rxjs';
import { ExcelService } from '../../../../../service/excel.service';

@Component({
  selector: 'app-power-cut-report',
  templateUrl: './power-cut-report.component.html',
  styleUrls: ['./power-cut-report.component.scss']
})
export class PowerCutReportComponent implements OnInit {

  

  public userForm:FormGroup;
  public userForm1:FormGroup;
  model: PowerCutReport = new PowerCutReport();
  currentDate:any;
  currentDate1:any;
  currentTime:any;
  currentTime1:any;
  isHidden:any;
  powercutlist:any = [];
  totalElements: number = 0;
  status = false;
  businesslists:any=[];
  company_name:any;
  BuUnit:any;
  powercutsave:boolean=true;
  company:any;
  
  Id:any;

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService,private excelService:ExcelService) 
  {
        this.userForm=fb.group({
          id:[''],
          business_unit:[''],     
          powercutdate:[''],
          powercuttime:[''],
          powerondate:[''],
          powerontime:[''],
          diffpower:[''],
          remarks:[''],
          company_id: [''],
          fin_year: [''], 
          username: [''] 
        });

        this.userForm1=fb.group(
          {
            fromdate:[''],
            todate:['']
          });
   }

   get id(){ return this.userForm.get("id") as FormControl }
   get business_unit(){ return this.userForm.get("business_unit") as FormControl }
   get powercutdate(){ return this.userForm.get("powercutdate") as FormControl }
   get powercuttime(){ return this.userForm.get("powercuttime") as FormControl }
   get powerondate(){ return this.userForm.get("powerondate") as FormControl }
   
   get powerontime(){ return this.userForm.get("powerontime") as FormControl }
   get diffpower(){ return this.userForm.get("diffpower") as FormControl }
   get remarks(){ return this.userForm.get("remarks") as FormControl }
   get company_id(){ return this.userForm.get("company_id") as FormControl }
   get fin_year(){ return this.userForm.get("fin_year") as FormControl }
   get username(){ return this.userForm.get("username") as FormControl }

   get fromdate(){ return this.userForm1.get("fromdate") as FormControl }
   get todate(){ return this.userForm1.get("todate") as FormControl }
   


  ngOnInit() {
    let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
    this.powercutsave=false;
    
   
     this.powercutsave = true;
   

    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentDate1=formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentTime = new Date().toString().substr(16, 5);
    this.currentTime1 = new Date().toString().substr(16, 5);
    this.isHidden=false;
    this.status=true;
    this.company_name = localStorage.getItem("company_name");
    let finyear =localStorage.getItem("financial_year");
      //this.getProducts({ page: "0", size: "10" });
    forkJoin(
      this.DropDownListService.getpowercutDatalist(this.currentDate,finyear),
      this.DropDownListService.getCompanyDetails(localStorage.getItem("company_name"))
      ).subscribe(([cutdata,companydata]) => {
        console.log("cutdata::"+JSON.stringify(cutdata))
        this.company=companydata.company_name;
         this.powercutlist = cutdata;
     });
  }

  showList(s:string)
  {
    let finyear =localStorage.getItem("financial_year");
    if(s=="add")
    {
      this.isHidden=true;
      this.DropDownListService.getcompanyBUMNCListnew(this.company_name).subscribe(data=>
      //this.DropDownListService.getCompanyBUMNCList(this.company_name).subscribe(data=>
        {
          this.businesslists= data;
        });
        this.BuUnit = "0";
    }
    if(s=="list")
    { 
      this.isHidden=false;
      
      this.userForm.reset();
    }
  }




  getProducts(request) 
  {
 
    this.DropDownListService.getpowercutlist(request.page,request.size)
     .subscribe(data => {
         this.powercutlist = data['content'];
         this.totalElements = data['totalElements'];
     }
     
     );
  }
  nextPage(event: PageEvent) 
  {
      const request = {};
      request['page'] = event.pageIndex.toString();
      request['size'] = event.pageSize.toString();
      this.getProducts(request);
  }




  search()
  {
    let fromdate=this.userForm1.get("fromdate").value;
    let todate=this.userForm1.get("todate").value;
   
    let finyear =localStorage.getItem("financial_year");
    
    this.status=false;
    this.DropDownListService.searchpowercut("fromdate="+fromdate+"&todate="+todate+"&finyear="+finyear).subscribe(data=>
      {
    console.log("power data::"+JSON.stringify(data))
        this.powercutlist =data;
        this.status=true;

      }, (error) => {this.status=true;
        alert("Power Cut Data Not Found !!!")
        this.powercutlist=[];
      })
  }

  send()
  {
    this.Id= this.userForm.get("id").value as FormControl  
    this.userForm.patchValue({ company_id: this.company_name,
      fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
      this.status=false;
      if(this.userForm.get("business_unit").value =='' ||this.userForm.get("business_unit").value ==null  || this.userForm.get("business_unit").value =='0' )
      {
        alert("Please Select Bussiness Unit Name !!!!!!!");
        this.status=true;
      }
      else{

        if(this.Id>0)
        {
          this.Service.updatepowercut(this.userForm.getRawValue(), this.Id).subscribe( data => 
            {
              console.log("check: "+JSON.stringify(this.userForm.getRawValue()));
              alert("Power Cut Report Updated successfully.");
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
          this.Service.createpowercut(this.userForm.getRawValue())
          .subscribe(data =>
          {
            alert("Power Cut Report Saved successfully.");
            this.userForm.reset();
            this.showList('list');
            this.ngOnInit();
            this.status=true;


          });
        }
      }
  }

  onChangepowercutdate(powercutdate)
  {
      let firsttime = powercutdate.target.value +" " + this.userForm.get("powercuttime").value;
       let secondtime = this.userForm.get("powerondate").value +" " + this.userForm.get("powerontime").value;

        let date1 = new Date(firsttime);
        let date2 = new Date(secondtime);
        
        let date_diff = Number(date2.getTime() - date1.getTime())
        //alert("final "+date_diff/ (1000 * 60 * 60 * 24))
        let diffDays = Math.floor(date_diff / 86400000); // days
        let diffHrs = Math.floor((date_diff % 86400000) / 3600000); // hours
        let diffMins = Math.round(((date_diff % 86400000) % 3600000) / 60000);
        
        let final_output="";
        if(Number(diffDays)>0)
        {
          final_output+=diffDays + " days ";
        }
        if(Number(diffHrs)>0)
        {
          final_output+=diffHrs + " hours ";
        }
        if(Number(diffMins)>0)
        {
          final_output+=diffMins +" minutes";
        }
       // final_output=diffDays + " days, " + diffHrs + " hours, " + diffMins +"minutes";
      
        this.userForm.patchValue({diffpower:final_output})
   }

  
  onChangepowerondate(powerondate)
  {
    let firsttime = this.userForm.get("powercutdate").value +" " + this.userForm.get("powercuttime").value;
     let secondtime = powerondate.target.value +" " + this.userForm.get("powerontime").value;

      let date1 = new Date(firsttime);
      let date2 = new Date(secondtime);
      
      let date_diff = Number(date2.getTime() - date1.getTime())
      //alert("final "+date_diff/ (1000 * 60 * 60 * 24))
      let diffDays = Math.floor(date_diff / 86400000); // days
      let diffHrs = Math.floor((date_diff % 86400000) / 3600000); // hours
      let diffMins = Math.round(((date_diff % 86400000) % 3600000) / 60000);
      
      let final_output="";
      if(Number(diffDays)>0)
      {
        final_output+=diffDays + " days ";
      }
      if(Number(diffHrs)>0)
      {
        final_output+=diffHrs + " hours ";
      }
      if(Number(diffMins)>0)
      {
        final_output+=diffMins +" minutes";
      }
     // final_output=diffDays + " days, " + diffHrs + " hours, " + diffMins +"minutes";
      this.userForm.patchValue({diffpower:final_output})
  }

  onChangepowercuttime(powercuttime)
  {
    let firsttime = this.userForm.get("powercutdate").value +" " +  powercuttime.target.value ;
     let secondtime = this.userForm.get("powerondate").value +" " + this.userForm.get("powerontime").value;

      let date1 = new Date(firsttime);
      let date2 = new Date(secondtime);
      
      let date_diff = Number(date2.getTime() - date1.getTime())
      //alert("final "+date_diff/ (1000 * 60 * 60 * 24))
      let diffDays = Math.floor(date_diff / 86400000); // days
      let diffHrs = Math.floor((date_diff % 86400000) / 3600000); // hours
      let diffMins = Math.round(((date_diff % 86400000) % 3600000) / 60000);
      let final_output="";
      if(Number(diffDays)>0)
      {
        final_output+=diffDays + " days ";
      }
      if(Number(diffHrs)>0)
      {
        final_output+=diffHrs + " hours ";
      }
      if(Number(diffMins)>0)
      {
        final_output+=diffMins +" minutes";
      }
     // final_output=diffDays + " days, " + diffHrs + " hours, " + diffMins +"minutes";
      this.userForm.patchValue({diffpower:final_output})
  }

  onChangepowerontime(powerontime)
  {
     
    let firsttime = this.userForm.get("powercutdate").value +" " + this.userForm.get("powercuttime").value;
    let secondtime = this.userForm.get("powerondate").value +" " +  powerontime.target.value;

     let date1 = new Date(firsttime);
     let date2 = new Date(secondtime);
     
     let date_diff = Number(date2.getTime() - date1.getTime())
     //alert("final "+date_diff/ (1000 * 60 * 60 * 24))
     let diffDays = Math.floor(date_diff / 86400000); // days
     let diffHrs = Math.floor((date_diff % 86400000) / 3600000); // hours
     let diffMins = Math.round(((date_diff % 86400000) % 3600000) / 60000);
     let final_output="";
        if(Number(diffDays)>0)
        {
          final_output+=diffDays + " days ";
        }
        if(Number(diffHrs)>0)
        {
          final_output+=diffHrs + " hours ";
        }
        if(Number(diffMins)>0)
        {
          final_output+=diffMins +" minutes";
        }
       // final_output=diffDays + " days, " + diffHrs + " hours, " + diffMins +"minutes";
     this.userForm.patchValue({diffpower:final_output})
  }

  onUpdate(id,grn_id,action)
  {
    this.isHidden=true;
    if(action == "view")
    {
      this.powercutsave=false;
    }
    if(action == "update")
    {
      this.powercutsave=true;
    }
    forkJoin(
    this.DropDownListService.retrivePowerCut(id),
    this.DropDownListService.getcompanyBUMNCListnew(this.company_name)
    ).subscribe(([powerCutList,bUnitData])=>
    {
      this.businesslists=bUnitData;
      console.log("powerCutList"+powerCutList["business_unit"])
      this.userForm.patchValue({id: powerCutList["id"],powercutid: powerCutList["powercutid"],business_unit: powerCutList["business_unit"],powercutdate:powerCutList["powercutdate"],powercuttime:powerCutList["powercuttime"],
      powerondate:powerCutList["powerondate"],powerontime:powerCutList["powerontime"],diffpower:powerCutList["diffpower"],remarks:powerCutList["remarks"]});

         this.status = true;
     }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in power cut,please try again....");
     this.ngOnInit()}); 

  }

  onDelete(id)
      {
        this.status = false;
        if(confirm("Are you sure to delete this Power Cut Report List?"))
        { 
          this.userForm.patchValue({username: localStorage.getItem("username")});
              this.Service.deletePowerCutReport(this.userForm.getRawValue(),id).subscribe(data=> 
                {
                //  console.log("Broker :"+data.broker_code);
                  if(data.powercutid=='' || data.powercutid==null)
                  {
                    alert("Opps!!! Can't delete this Power Cut Report !!!");
                  }else{
                    alert("Power Cut Report Deleted successfully.");
                  }
                  this.userForm.reset();
                  this.status = true;
                  this.isHidden = false;
                  this.ngOnInit();
                  this.showList("list");
                });
  
             
        }  
        this.status = true;
      }

      exportAsXLSX():void {
        let element = document.getElementById('dynamictable'); 
        this.excelService.exportAsExcelFile(element, 'myExcelFile');
     }

}
