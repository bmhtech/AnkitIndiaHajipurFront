import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';
import { Otherparameterreport } from '../../../../../Models/Report/Otherparameterreport';
import { formatDate } from '@angular/common';
import { forkJoin } from 'rxjs';
import { OtherparameterreportprintpopupComponent } from '../otherparameterreportprintpopup/otherparameterreportprintpopup.component';

@Component({
  selector: 'app-otherparameterreport',
  templateUrl: './otherparameterreport.component.html',
  styleUrls: ['./otherparameterreport.component.scss']
})
export class OtherparameterreportComponent implements OnInit {
  
  public userForm:FormGroup;
  public userForm1:FormGroup;
  model: Otherparameterreport = new Otherparameterreport();
  isHidden:any;
  otherparameterlist:any = [];
  status = false;
  businesslists:any=[];
  employeelist:any=[];
  company_name:any;
  Id:any;
  currentDate:any;
  BuUnit = "0";
  otherparametersave:boolean=true;
  sl_no:number=1;
  itemList:any=[];

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService,private excelService:ExcelService,private dialog: MatDialog) 
  { 
    this.userForm=fb.group({
      id:[''],
      date:[''],
      otherparameterid:[''],
      business_unit:[''],
      shift:[''],
      approvedby:[''],
      closed:[''],
      company_id:[''],
      fin_year:[''],
      username:[''],

      otherparameterreport_Dtls: this.fb.array([this.fb.group({
        slno:this.sl_no,
        itemid:'',
        ash:'',
        aia:'',
        alcohol:''
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
   get shift(){ return this.userForm.get("shift") as FormControl }
   get approvedby(){ return this.userForm.get("approvedby") as FormControl }
   get closed(){ return this.userForm.get("closed") as FormControl }
   
   get company_id(){ return this.userForm.get("company_id") as FormControl }
   get fin_year(){ return this.userForm.get("fin_year") as FormControl }
   get username(){ return this.userForm.get("username") as FormControl }

   get otherparameterreport_Dtls(){return this.userForm.get("otherparameterreport_Dtls") as FormArray};
   

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
     this.otherparametersave=true;

   forkJoin(
    this.DropDownListService.getOtherParameterlist(this.currentDate,finyear),
    this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
    this.DropDownListService.getEmployeeNamenew(this.company_name)
    )
   .subscribe(([otherdata,budata,emplist])=>
    {
      //console.log("budata:"+JSON.stringify(budata))
        this.otherparameterlist = otherdata;
        this.businesslists=budata;
        this.employeelist=emplist;
    });
  }

  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
      this.otherparametersave=true;
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
    date:[''],
    otherparameterid:[''],
    business_unit:[''],
    shift:[''],
    approvedby:[''],
    closed:[''],
    company_id:[''],
    fin_year:[''],
    username:[''],

    otherparameterreport_Dtls: this.fb.array([this.fb.group({
      slno:this.sl_no,
      itemid:'',
      ash:'',
      aia:'',
      alcohol:''
      })])
    });
  }

  addItems()
  {
   this.sl_no =this.otherparameterreport_Dtls.length +1; 
    this.otherparameterreport_Dtls.push(this.fb.group({
      slno:this.sl_no,
      itemid:'',
      ash:'',
      aia:'',
      alcohol:''}))
    }

    selectedItemName = [];
    getitemname(businessunit_id)
    {
        if(businessunit_id.length)
        {
            this.DropDownListService.getLabItemlist(businessunit_id).subscribe(data=>
            {
              this.itemList=data;
            });        
        }
    }
    onchangeItemNamestock(index, itemId)
    {
      
      if(itemId.length && itemId != "0")
      {
        this.otherparameterreport_Dtls.at(index).patchValue({itemid: itemId});
      }
    }
    delete(index) 
    {
      if(index)
      {
        this.otherparameterreport_Dtls.removeAt(index);
        for( let i=0;i<=this.otherparameterreport_Dtls.length;i++)
        {
          this.otherparameterreport_Dtls.at(i).patchValue({slno:i+1})
        }

      }
      else
      {
        if(this.otherparameterreport_Dtls.length>1)
        {
          this.otherparameterreport_Dtls.removeAt(index);
          for( let i=0;i<=this.otherparameterreport_Dtls.length;i++)
        {
          this.otherparameterreport_Dtls.at(i).patchValue({slno:i+1})
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
        if(this.userForm.get("business_unit").value == '' || this.userForm.get("business_unit").value == 0 || this.userForm.get("business_unit").value == null)
        {
          alert("Please Select Bussiness Unit Name!")
          this.status=true;
        }
        else if(this.userForm.get("shift").value == '' || this.userForm.get("shift").value == 0 || this.userForm.get("shift").value == null)
        {
          alert("Please Select Shift!")
          this.status=true;
        }
        else if(this.userForm.get("closed").value == '' || this.userForm.get("closed").value == 0 || this.userForm.get("closed").value == null)
        {
          alert("Please Select Closed!")
          this.status=true;
        }
        else
        {
          let item = false;
          
          for(let b=0;b<this.otherparameterreport_Dtls.length;b++)
          {
            if(this.otherparameterreport_Dtls.at(b).get("itemid").value == null || this.otherparameterreport_Dtls.at(b).get("itemid").value == '' || this.otherparameterreport_Dtls.at(b).get("itemid").value == 0)
            {
              item = true; 
            }
          }
          if(item ==true)
          {
            alert("Please Select Item Name in Other Parameter Details Tab!!!");
            this.status = true;
          }
          else
          {
            if(this.Id>0)
            {
              this.Service.updateOtherParameter(this.userForm.getRawValue(), this.Id).subscribe( data => 
                {
                  alert("Other parameter Report Updated successfully.");
                  this.userForm.reset();
                  this.isHidden = false;
                  this.showList('list');
                  this.ngOnInit();
                  this.status=true;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Other Parameter Report !!! please Reload the page and try again....");
                }); 
            }
            else
            {
              this.Service.createOtherParameter(this.userForm.getRawValue())
              .subscribe(data =>
              {
                alert("Other Parameter Report Saved successfully.");
                this.userForm.reset();
                this.showList('list');
                this.ngOnInit();
                this.status=true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Other Parameter Report !!! please Reload the page and try again....");
              });
            }
          } 
        }
      }

        onDelete(id)
        {
          if(confirm("Are you sure to delete this Other Parameter Report From List?"))
          { 
              this.userForm.patchValue({username: localStorage.getItem("username")});
              this.Service.deleteOtherParameter(this.userForm.getRawValue(),id).subscribe(data=> 
                {
                  alert("Other Parameter Report Deleted successfully.");
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
            this.otherparametersave=false;
          }
          if(action == "update")
          {
            this.otherparametersave=true;
          }
      
          forkJoin(
            this.DropDownListService.retriveOtherParameter(id),
            this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
            this.DropDownListService.getEmployeeNamenew(this.company_name)
            ).subscribe(([otherdata,bUnitData,empdata])=>
            {
              this.businesslists=bUnitData;
              this.employeelist=empdata;
              this.userForm.patchValue(otherdata);
              forkJoin(
                  this.DropDownListService.retriveOtherParameterDetails(otherdata['otherparameterid']),
                 this.DropDownListService.getLabItemlist(otherdata['business_unit'])
                  ).subscribe(([dynamicdetails,item_list])=>  
                    {
                      this.selectedItemName = [];
                      this.itemList=item_list;
                      let k=0;
                      this.sl_no = 0;
                      while (this.otherparameterreport_Dtls.length) 
                      this.otherparameterreport_Dtls.removeAt(0);
                      for(let data1 of dynamicdetails)
                      {   
                        this.addItems();
                        this.selectedItemName[k] = data1["itemid"];
                        this.otherparameterreport_Dtls.patchValue(dynamicdetails);
                        k++;
                      }
                      this.status = true;
                    });
              
            
        
                 this.status = true;
             }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in Other Parameter Report,please try again....");
             this.ngOnInit()}); 
        
      
      
        }
      
        search()
        {
          let fromdate=this.userForm1.get("fromdate").value;
          let todate=this.userForm1.get("todate").value;
         
          let finyear =localStorage.getItem("financial_year");
          
          this.status=false;
          this.DropDownListService.searcOtherparameter("fromdate="+fromdate+"&todate="+todate+"&finyear="+finyear).subscribe(data=>
            {
          
              this.otherparameterlist =data;
              this.status=true;
      
            }, (error) => {this.status=true;
              alert("Other Parameter Report Data Not Found !!!")
              this.otherparameterlist=[];
            })
        }
       
          
        print(otherparameterid,business_unitname,shift,approvedby_name)
        {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.data = {  };
          
          let dialogRef = this.dialog.open(OtherparameterreportprintpopupComponent, {data: {otherparameterid: otherparameterid,business_unitname:business_unitname,shift:shift,approvedby_name:approvedby_name}, height: '80%',
          width: '80%'});
          dialogRef.afterClosed().subscribe( data => 
          {
          
          }); 
      
        }
          

}
