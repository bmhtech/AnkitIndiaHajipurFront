import { formatDate, NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../../service/excel.service';
import { Master } from '../../../../../../service/master.service';
import { Millbreakdownreport } from '../../../../../../Models/Report/Millbreakdownreport';

@Component({
  selector: 'app-millbreakdownreport',
  templateUrl: './millbreakdownreport.component.html',
  styleUrls: ['./millbreakdownreport.component.scss']
})
export class MillbreakdownreportComponent implements OnInit {
  public userForm:FormGroup;
  public userForm1:FormGroup;
  model: Millbreakdownreport = new Millbreakdownreport();
  millbreakdownlist:any=[];
  isHidden:any;;
  status = false;
  businesslists:any=[];
  company_name:any;
  Id:any;
  currentDate:any;
  BuUnit = "0";
  millbreakdownresave:boolean=true;
  sl_no:number=1;

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService,private excelService:ExcelService,private dialog: MatDialog) 
  {
    this.userForm=fb.group({
      id:[''],
      date:[''],
      millbreakdownid:[''],
      business_unit:[''],
      totalnobreakdown:[''],
      totalhoursbreakdown:[''],
      company_id:[''],
      fin_year:[''],
      username:[''],

      millbreakdownreport_Dtls: this.fb.array([this.fb.group({
        slno:this.sl_no,
        breakdowncount:this.sl_no+' Breakdown',
        startdate:'',
        starttime:'',
        enddate:'',
        endtime:'',
        timediff:'',
        shift:'',
        remarks:'',
        date_diff:''
      })])

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
   get totalnobreakdown(){ return this.userForm.get("totalnobreakdown") as FormControl }
   get totalhoursbreakdown(){ return this.userForm.get("totalhoursbreakdown") as FormControl }
   
   get company_id(){ return this.userForm.get("company_id") as FormControl }
   get fin_year(){ return this.userForm.get("fin_year") as FormControl }
   get username(){ return this.userForm.get("username") as FormControl }

   get millbreakdownreport_Dtls(){return this.userForm.get("millbreakdownreport_Dtls") as FormArray};
   
   get fromdate(){ return this.userForm1.get("fromdate") as FormControl }
   get todate(){ return this.userForm1.get("todate") as FormControl }

  ngOnInit() {
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.isHidden=false;
    this.status=true;
    this.sl_no=1;
    
    this.company_name = localStorage.getItem("company_name");
    let finyear =localStorage.getItem("financial_year");
    this.BuUnit = "0";
     this.millbreakdownresave=true;

   forkJoin(
    this.DropDownListService.getMillBreakdownlist(this.currentDate,finyear),
    this.DropDownListService.getcompanyBUMNCListnew(this.company_name)
    )
   .subscribe(([otherdata,budata])=>
    {
      //console.log("budata:"+JSON.stringify(budata))
        this.millbreakdownlist = otherdata;
        this.businesslists=budata;
    });
  }
  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
      this.millbreakdownresave=true;
      this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    }
    if(s=="list")
    {
      this.isHidden=false;
      this.userForm.reset();
      this.ResetAllValues();
      
    }
  }

  ResetAllValues()
  {
    this.sl_no=1;
    return this.userForm=this.fb.group({
    id:[''],
    date:[''],
    millbreakdownid:[''],
    business_unit:[''],
    totalnobreakdown:[''],
    totalhoursbreakdown:[''],
    company_id:[''],
    fin_year:[''],
    username:[''],

    millbreakdownreport_Dtls: this.fb.array([this.fb.group({
      slno:this.sl_no,
      breakdowncount:this.sl_no+' Breakdown',
      startdate:'',
      starttime:'',
      endtime:'',
      enddate:'',
      timediff:'',
      shift:'',
      remarks:'',
      date_diff:''
      })])
    });
  }

  addItems()
  {
   this.sl_no =this.millbreakdownreport_Dtls.length +1; 
    this.millbreakdownreport_Dtls.push(this.fb.group({
      slno:this.sl_no,
      breakdowncount:this.sl_no+' Breakdown',
      startdate:'',
      starttime:'',
      enddate:'',
      endtime:'',
      timediff:'',
      shift:'',
      remarks:'',
      date_diff:''}))
    }

    delete(index) 
    {
      if(index)
      {
        this.millbreakdownreport_Dtls.removeAt(index);
        for( let i=0;i<=this.millbreakdownreport_Dtls.length;i++)
        {
          this.millbreakdownreport_Dtls.at(i).patchValue({slno:i+1,breakdowncount:i+1+" Breakdown"})
        }
        this.getTotal();
      }
      else
      {
        if(this.millbreakdownreport_Dtls.length>1)
        {
          this.millbreakdownreport_Dtls.removeAt(index);
          for( let i=0;i<=this.millbreakdownreport_Dtls.length;i++)
        {
          this.millbreakdownreport_Dtls.at(i).patchValue({slno:i+1,breakdowncount:i+1+" Breakdown"})
        }
        this.getTotal();
        }
        else
        {
          alert("can't delete all rows");
        }} 
    }
   
    ShutdownStartDate(index,startdate)
    {
         let firsttime = startdate.at(index).target.value +" " + this.millbreakdownreport_Dtls.at(index).get("starttime").value;
         let secondtime = this.millbreakdownreport_Dtls.at(index).get("enddate").value +" " + this.millbreakdownreport_Dtls.at(index).get("endtime").value;
  
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
        
          this.millbreakdownreport_Dtls.at(index).patchValue({timediff:final_output,date_diff:date_diff});
          this.getTotal();
     }

     ShutdownEndDate(index,enddate)
    {
       let firsttime = this.millbreakdownreport_Dtls.at(index).get("startdate").value +" " + this.millbreakdownreport_Dtls.at(index).get("starttime").value;
       let secondtime = enddate.target.value +" " + this.millbreakdownreport_Dtls.at(index).get("endtime").value;

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
        this.millbreakdownreport_Dtls.at(index).patchValue({timediff:final_output,date_diff:date_diff});
        this.getTotal();
    }
  
    ShutdownStartTime(index,starttime)
    {
      let firsttime = this.millbreakdownreport_Dtls.at(index).get("startdate").value +" " +  starttime.target.value ;
      let secondtime = this.millbreakdownreport_Dtls.at(index).get("enddate").value +" " + this.millbreakdownreport_Dtls.at(index).get("endtime").value;
  
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
        this.millbreakdownreport_Dtls.at(index).patchValue({timediff:final_output,date_diff:date_diff});
        this.getTotal();
    }
  
    ShutdownEndTime(index,endtime)
    {
      let firsttime = this.millbreakdownreport_Dtls.at(index).get("startdate").value +" " + this.millbreakdownreport_Dtls.at(index).get("starttime").value;
      let secondtime = this.millbreakdownreport_Dtls.at(index).get("enddate").value +" " +  endtime.target.value;

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
       this.millbreakdownreport_Dtls.at(index).patchValue({timediff:final_output,date_diff:date_diff});
       this.getTotal();
    }

    getTotal()
    {
      let total=0;
      for(let i=0;i<this.millbreakdownreport_Dtls.length;i++)
      {
     
        total+=Number(this.millbreakdownreport_Dtls.at(i).get("date_diff").value);
        console.log("chk::"+this.millbreakdownreport_Dtls.at(i).get("date_diff").value+"//"+total)
      }
      let diffDays = Math.floor(total / 86400000); // days
      let diffHrs = Math.floor((total % 86400000) / 3600000); // hours
      let diffMins = Math.round(((total % 86400000) % 3600000) / 60000);
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
      this.userForm.patchValue({totalhoursbreakdown:final_output,totalnobreakdown:this.millbreakdownreport_Dtls.length});
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
          let startdate = false;
          let start = false;
          let enddate = false;
          let end = false;
          let shift=false;

          for(let b=0;b<this.millbreakdownreport_Dtls.length;b++)
          {
            if(this.millbreakdownreport_Dtls.at(b).get("startdate").value == null || this.millbreakdownreport_Dtls.at(b).get("startdate").value == '' || this.millbreakdownreport_Dtls.at(b).get("startdate").value == 0)
            {
              startdate = true; 
            }
            if(this.millbreakdownreport_Dtls.at(b).get("starttime").value == null || this.millbreakdownreport_Dtls.at(b).get("starttime").value == '' || this.millbreakdownreport_Dtls.at(b).get("starttime").value == 0)
            {
              start = true; 
            }
            if(this.millbreakdownreport_Dtls.at(b).get("enddate").value == null || this.millbreakdownreport_Dtls.at(b).get("enddate").value == '' || this.millbreakdownreport_Dtls.at(b).get("enddate").value == 0)
            {
              enddate = true; 
            }
            if(this.millbreakdownreport_Dtls.at(b).get("endtime").value == null || this.millbreakdownreport_Dtls.at(b).get("endtime").value == '' || this.millbreakdownreport_Dtls.at(b).get("endtime").value == 0)
            {
              end = true; 
            }
            if(this.millbreakdownreport_Dtls.at(b).get("shift").value == null || this.millbreakdownreport_Dtls.at(b).get("shift").value == '' || this.millbreakdownreport_Dtls.at(b).get("shift").value == 0)
            {
              shift = true; 
            }
          }
          if(startdate ==true)
          {
            alert("Please Enter Start Date in Mill Breakdown Details Tab!!!");
            this.status = true;
          }
          else if(start ==true)
          {
            alert("Please Enter Start Time in Mill Breakdown Details Tab!!!");
            this.status = true;
          }
          else if(enddate ==true)
          {
            alert("Please Enter End Date in Mill Breakdown Details Tab!!!");
            this.status = true;
          }
          else if(end ==true)
          {
            alert("Please Enter End Time in Mill Breakdown Details Tab!!!");
            this.status = true;
          }
          else if(shift ==true)
          {
            alert("Please Select Shift in Mill Breakdown Details Tab!!!");
            this.status = true;
          }
          else
          {
            if(this.Id>0)
            {
              this.Service.updateMillBreakdown(this.userForm.getRawValue(), this.Id).subscribe( data => 
                {
                  alert("Mill Breakdown Report Updated successfully.");
                  this.userForm.reset();
                  this.isHidden = false;
                  this.showList('list');
                  this.ngOnInit();
                  this.status=true;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Mill Breakdown Report !!! please Reload the page and try again....");
                }); 
            }
            else
            {
              this.Service.createMillBreakdown(this.userForm.getRawValue())
              .subscribe(data =>
              {
                alert("Mill Breakdown Report Saved successfully.");
                this.userForm.reset();
                this.showList('list');
                this.ngOnInit();
                this.status=true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Mill Breakdown Report !!! please Reload the page and try again....");
              });
            }
          } 
        }
      }

        onDelete(id)
        {
          if(confirm("Are you sure to delete this Mill Breakdown Report From List?"))
          { 
              this.userForm.patchValue({username: localStorage.getItem("username")});
              this.Service.deleteMillBreakdown(this.userForm.getRawValue(),id).subscribe(data=> 
                {
                  alert("Mill Breakdown Report Deleted successfully.");
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
            this.millbreakdownresave=false;
          }
          if(action == "update")
          {
            this.millbreakdownresave=true;
          }
      
          forkJoin(
            this.DropDownListService.retriveMillBreakdown(id),
            this.DropDownListService.getcompanyBUMNCListnew(this.company_name)
            ).subscribe(([millbreakdown,bUnitData])=>
            {
              this.businesslists=bUnitData;
              this.userForm.patchValue(millbreakdown);
              forkJoin(
                  this.DropDownListService.retriveMillBreakdownDetails(millbreakdown['millbreakdownid'])
                  ).subscribe(([dynamicdetails])=>  
                    {
                      let k=0;
                      this.sl_no = 0;
                      while (this.millbreakdownreport_Dtls.length) 
                      this.millbreakdownreport_Dtls.removeAt(0);
                      for(let data1 of dynamicdetails)
                      {   
                        this.addItems();
                        this.millbreakdownreport_Dtls.patchValue(dynamicdetails);
                        k++;
                      }
                      this.status = true;
                    });
                 this.status = true;
             }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in Mill Breakdown Report,please try again....");
             this.ngOnInit()}); 
        
      
        }
      
        search()
        {
          let fromdate=this.userForm1.get("fromdate").value;
          let todate=this.userForm1.get("todate").value;
         
          let finyear =localStorage.getItem("financial_year");
          
          this.status=false;
          this.DropDownListService.searcMillBreakdown("fromdate="+fromdate+"&todate="+todate+"&finyear="+finyear).subscribe(data=>
            {
          
              this.millbreakdownlist =data;
              this.status=true;
      
            }, (error) => {this.status=true;
              alert("Mill Breakdown Report Data Not Found !!!")
              this.millbreakdownlist=[];
            })
        }
       
          
           /* print(wheatreceiveid)
            {
              const dialogConfig = new MatDialogConfig();
              dialogConfig.disableClose = true;
              dialogConfig.autoFocus = true;
              dialogConfig.data = {  };
              
              let dialogRef = this.dialog.open(WheatreceivingreportprintpopupComponent, {data: {alldata: wheatreceiveid}, height: '80%',
              width: '80%'});
              dialogRef.afterClosed().subscribe( data => 
              {
              
              }); 
          
            }*/
}
