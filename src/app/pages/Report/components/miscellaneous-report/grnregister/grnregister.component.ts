import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';
import { Grnregisterreport } from '../../../../../Models/Report/grnregisterreport';
import { formatDate } from '@angular/common';
import { forkJoin } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { GrnregisterreportpopupComponent } from '../grnregisterreportpopup/grnregisterreportpopup.component';

@Component({
  selector: 'app-grnregister',
  templateUrl: './grnregister.component.html',
  styleUrls: ['./grnregister.component.scss']
})
export class GrnregisterComponent implements OnInit {

  public userForm:FormGroup;
  public userForm1:FormGroup;
  model: Grnregisterreport = new Grnregisterreport();
  currentDate:any;
  currentTime:any;
  isHidden:any;
  grnregisterlist:any = [];
  status = false;
  company_name:any;
  Id:any;
  sl_no:number=1;
  grnregistersave:boolean=true;

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService,private excelService:ExcelService,private dialog: MatDialog) 
  { 
    this.userForm=fb.group({
      id:[''],
      grnregisterid:[''],
      grndate:[''],
      grnno:[''],
      billno:[''],
      adviceno:[''],
      suppliername:[''],
      vehicleno:[''],
      storeserialno:[''],
      company_id:[''],
      fin_year:[''],
      username:[''],
      
      grnregisterreport_Dtls: this.fb.array([this.fb.group({
        slno:this.sl_no,
        itemdesc:'',
        quantity:'',
        unit:'',
        rate:''
      })])
    });

    this.userForm1=fb.group(
      {
        fromdate:[''],
        todate:['']
      });
  }

  get id(){ return this.userForm.get("id") as FormControl }
  get grnregisterid(){ return this.userForm.get("grnregisterid") as FormControl }
  get grndate(){ return this.userForm.get("grndate") as FormControl }
  get grnno(){ return this.userForm.get("grnno") as FormControl }
  get billno(){ return this.userForm.get("billno") as FormControl }
  get adviceno(){ return this.userForm.get("adviceno") as FormControl }
  get suppliername(){ return this.userForm.get("suppliername") as FormControl }
 
  get vehicleno(){ return this.userForm.get("vehicleno") as FormControl }
  get storeserialno(){ return this.userForm.get("storeserialno") as FormControl }
  get company_id(){ return this.userForm.get("company_id") as FormControl }
  get fin_year(){ return this.userForm.get("fin_year") as FormControl }
  get username(){ return this.userForm.get("username") as FormControl }

  get grnregisterreport_Dtls(){return this.userForm.get("grnregisterreport_Dtls") as FormArray};

  get fromdate(){ return this.userForm1.get("fromdate") as FormControl }
   get todate(){ return this.userForm1.get("todate") as FormControl }

  ngOnInit() {
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.isHidden=false;
    this.status=true;
    this.company_name = localStorage.getItem("company_name");
    let finyear =localStorage.getItem("financial_year");
    this.sl_no=1;
    forkJoin(
      this.DropDownListService.getGRNRegisterReportlist(this.currentDate,finyear)
     // this.DropDownListService.grnRegisterAllDataList(this.currentDate,finyear)
    )
   .subscribe(([grnlist])=>
    {
      console.log(JSON.stringify(grnlist))
     this.grnregisterlist=grnlist;
    });
  }

  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
      
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
  return this.userForm=this.fb.group({
  id:[''],
  grnregisterid:[''],
  grndate:[''],
  grnno:[''],
  billno:[''],
  adviceno:[''],
  suppliername:[''],
  vehicleno:[''],
  storeserialno:[''],
  company_id:[''],
  fin_year:[''],
  username:[''],

  grnregisterreport_Dtls: this.fb.array([this.fb.group({
    slno:this.sl_no,
    itemdesc:'',
    quantity:'',
    unit:'',
    rate:''
  })])
});
}

addItems()
  {
   this.sl_no =this.grnregisterreport_Dtls.length +1; 
    this.grnregisterreport_Dtls.push(this.fb.group({
      slno:this.sl_no,
      itemdesc:'',
      quantity:'',
      unit:'',
      rate:''}))
    }

    delete(index) 
    {
      if(index)
      {
        this.grnregisterreport_Dtls.removeAt(index);
        for( let i=0;i<=this.grnregisterreport_Dtls.length;i++)
        {
          this.grnregisterreport_Dtls.at(i).patchValue({slno:i+1})
        }

      }
      else
      {
        if(this.grnregisterreport_Dtls.length>1)
        {
          this.grnregisterreport_Dtls.removeAt(index);
          for( let i=0;i<=this.grnregisterreport_Dtls.length;i++)
        {
          this.grnregisterreport_Dtls.at(i).patchValue({slno:i+1})
        }

        }
        else
        {
          alert("can't delete all rows");
        }} 
    }

  send()
  {
    this.Id= this.userForm.get("id").value as FormControl; 
    this.userForm.patchValue({ company_id: localStorage.getItem("company_name"),
      fin_year:localStorage.getItem("financial_year"), 
      username: localStorage.getItem("username")});
      this.status=false;

      if(this.Id>0)
      {
       
        this.Service.updategrnregisterreport(this.userForm.getRawValue(), this.Id).subscribe( data => 
          {
          
            alert("GRN Register Report Updated successfully.");
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
        
        this.Service.creategrnregisterreport(this.userForm.getRawValue())
        .subscribe(data =>
        {
          alert("GRN Register Report Saved successfully.");
          this.userForm.reset();
          this.showList('list');
          this.ngOnInit();
          this.status=true;

        });
      }
  }

  onDelete(id)
  {
    if(confirm("Are you sure to delete this GRN Register Report List?"))
    { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        
        this.Service.deletegrnReport(this.userForm.getRawValue(),id).subscribe(data=> 
          {
            alert("GRN Register Deleted successfully.");
            this.userForm.reset();
            this.status = true;
            this.ngOnInit();
          });
    }
  }

  

 search()
 {
   let fromdate=this.userForm1.get("fromdate").value;
   let todate=this.userForm1.get("todate").value;
  
   let finyear =localStorage.getItem("financial_year");
   
   this.status=false;
   this.DropDownListService.searchGRNRegisterReport("fromdate="+fromdate+"&todate="+todate+"&finyear="+finyear).subscribe(data=>
     {
   
      this.grnregisterlist=data;
       this.status=true;

     }, (error) => {this.status=true;
       alert("GRN Register Data Not Found !!!")
       this.grnregisterlist=[];
     })
 }

 onUpdate(id,action)
 {
   this.isHidden=true;
   if(action == "view")
  {
    this.grnregistersave=false;
  }
  if(action == "update")
  {
    this.grnregistersave=true;
  }
   forkJoin(
   this.DropDownListService.retriveGRNRegister(id)
   ).subscribe(([grndata])=>
   {   
     this.userForm.patchValue(grndata);

     forkJoin(
      this.DropDownListService.retriveGrnRegisterDetails(grndata['grnregisterid'])
      ).subscribe(([dynamicdetails])=>
        {
          let k=0;
          this.sl_no = 0;
          while (this.grnregisterreport_Dtls.length) 
          this.grnregisterreport_Dtls.removeAt(0);
          for(let data1 of dynamicdetails)
          {   
            this.addItems();
            this.grnregisterreport_Dtls.patchValue(dynamicdetails);
            k++;
          }
          this.status = true;
        });

        this.status = true;
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in power cut,please try again....");
    this.ngOnInit()}); 

 }
 
 priview()
      {
      
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {  };
       
        let fromdate:string=this.userForm1.get("fromdate").value;
        let todate:string=this.userForm1.get("todate").value;
        
        let currdate=formatDate(new Date(), 'yyyy-MM-dd', 'en');
       // console.log(fromdate+"//"+todate);
        if((fromdate == null && todate == null) || (fromdate == '' && todate == ''))
        {
         
          fromdate=currdate;
          todate=currdate;
        }
        else{
          
        }

        let dialogRef = this.dialog.open(GrnregisterreportpopupComponent, {data: {fromdate:fromdate,todate:todate}, height: '80%',
        width: '80%'});
        dialogRef.afterClosed().subscribe( data => 
        {
        
        }); 

      }
}