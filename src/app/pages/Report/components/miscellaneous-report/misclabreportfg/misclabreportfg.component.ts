import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';
import { Misclabreportfg } from '../../../../../Models/Report/Misclabreportfg';
import { formatDate } from '@angular/common';
import { forkJoin } from 'rxjs';
import { MisclabreportfgprintpopupComponent } from '../misclabreportfgprintpopup/misclabreportfgprintpopup.component';

@Component({
  selector: 'app-misclabreportfg',
  templateUrl: './misclabreportfg.component.html',
  styleUrls: ['./misclabreportfg.component.scss']
})
export class MisclabreportfgComponent implements OnInit {

  public userForm:FormGroup;
  public userForm1:FormGroup;
  model: Misclabreportfg = new Misclabreportfg();
  isHidden:any;
  misclabreportfglist:any = [];
  status = false;
  businesslists:any=[];
  employeelist:any=[];
  company_name:any;
  Id:any;
  currentDate:any;
  BuUnit = "0";
  misclabreportfgsave:boolean=true;
  sl_no:number=1;
  itemList:any=[];

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService,private excelService:ExcelService,private dialog: MatDialog) 
  { 
    this.userForm=fb.group({
      id:[''],
      date:[''],
      misclabreportfgid:[''],
      business_unit:[''],
      shift:[''],
      approvedby:[''],
      closed:[''],
      company_id:[''],
      fin_year:[''],
      username:[''],

      misclabreportfg_Dtls: this.fb.array([this.fb.group({
        slno:this.sl_no,
        itemid:'',
        batchno:'',
        time:'',
        moisture:'',
        colour:'',
        psd:'',
        wet_gluten:'',
        dry_gluten:'',
        qty_gluten:'',
        sv:'',
        c2cl4:'',
        odour:'',
        infestation:''
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

   get misclabreportfg_Dtls(){return this.userForm.get("misclabreportfg_Dtls") as FormArray};
   

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
     this.misclabreportfgsave=true;

   forkJoin(
    this.DropDownListService.getLabReportlist(this.currentDate,finyear),
    this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
    this.DropDownListService.getEmployeeNamenew(this.company_name)
    )
   .subscribe(([labdata,budata,emplist])=>
    {
        this.misclabreportfglist = labdata;
        this.businesslists=budata;
        this.employeelist=emplist;
    });
  }

  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
      this.misclabreportfgsave=true;
      this.userForm.reset();
      this.ResetAllValues();
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
    misclabreportfgid:[''],
    business_unit:[''],
    shift:[''],
    approvedby:[''],
    closed:[''],
    company_id:[''],
    fin_year:[''],
    username:[''],

    misclabreportfg_Dtls: this.fb.array([this.fb.group({
      slno:this.sl_no,
      itemid:'',
      batchno:'',
      time:'',
      moisture:'',
      colour:'',
      psd:'',
      wet_gluten:'',
      dry_gluten:'',
      qty_gluten:'',
      sv:'',
      c2cl4:'',
      odour:'',
      infestation:''
      })])
    });
  }

  addItems()
  {
   this.sl_no =this.misclabreportfg_Dtls.length +1; 
    this.misclabreportfg_Dtls.push(this.fb.group({
      slno:this.sl_no,
      itemid:'',
      batchno:'',
      time:'',
      moisture:'',
      colour:'',
      psd:'',
      wet_gluten:'',
      dry_gluten:'',
      qty_gluten:'',
      sv:'',
      c2cl4:'',
      odour:'',
      infestation:''}))
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
        this.misclabreportfg_Dtls.at(index).patchValue({itemid: itemId});
      }
    }
    delete(index) 
    {
      if(index)
      {
        this.misclabreportfg_Dtls.removeAt(index);
        for( let i=0;i<=this.misclabreportfg_Dtls.length;i++)
        {
          this.misclabreportfg_Dtls.at(i).patchValue({slno:i+1})
        }

      }
      else
      {
        if(this.misclabreportfg_Dtls.length>1)
        {
          this.misclabreportfg_Dtls.removeAt(index);
          for( let i=0;i<=this.misclabreportfg_Dtls.length;i++)
        {
          this.misclabreportfg_Dtls.at(i).patchValue({slno:i+1})
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
          
          for(let b=0;b<this.misclabreportfg_Dtls.length;b++)
          {
            if(this.misclabreportfg_Dtls.at(b).get("itemid").value == null || this.misclabreportfg_Dtls.at(b).get("itemid").value == '' || this.misclabreportfg_Dtls.at(b).get("itemid").value == 0)
            {
              item = true; 
            }
          }
          if(item ==true)
          {
            alert("Please Select Item Name in Misc Lab Details Tab!!!");
            this.status = true;
          }
          else
          {
            if(this.Id>0)
            {
              this.Service.updateLabReport(this.userForm.getRawValue(), this.Id).subscribe( data => 
                {
                  alert("Lab Report Updated successfully.");
                  this.userForm.reset();
                  this.isHidden = false;
                  this.showList('list');
                  this.ngOnInit();
                  this.status=true;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Lab Report !!! please Reload the page and try again....");
                }); 
            }
            else
            {
              this.Service.createLabReport(this.userForm.getRawValue())
              .subscribe(data =>
              {
                alert("Lab Report Saved successfully.");
                this.userForm.reset();
                this.showList('list');
                this.ngOnInit();
                this.status=true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Lab Report !!! please Reload the page and try again....");
              });
            }
          }
          
        }
          
        }

        onDelete(id)
        {
          if(confirm("Are you sure to delete this Lab Report From List?"))
          { 
              this.userForm.patchValue({username: localStorage.getItem("username")});
              this.Service.deleteLabReport(this.userForm.getRawValue(),id).subscribe(data=> 
                {
                  alert("Lab Report Deleted successfully.");
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
            this.misclabreportfgsave=false;
          }
          if(action == "update")
          {
            this.misclabreportfgsave=true;
          }
      
          forkJoin(
            this.DropDownListService.retriveLabReport(id),
            this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
            this.DropDownListService.getEmployeeNamenew(this.company_name)
            ).subscribe(([labdata,bUnitData,empdata])=>
            {
              this.businesslists=bUnitData;
              this.employeelist=empdata;
              this.userForm.patchValue(labdata);
              forkJoin(
                  this.DropDownListService.retriveLabReportDetails(labdata['misclabreportfgid']),
                 this.DropDownListService.getLabItemlist(labdata['business_unit'])
                  ).subscribe(([dynamicdetails,item_list])=>  
                    {
                      this.selectedItemName = [];
                      this.itemList=item_list;
                      let k=0;
                      this.sl_no = 0;
                      while (this.misclabreportfg_Dtls.length) 
                      this.misclabreportfg_Dtls.removeAt(0);
                      for(let data1 of dynamicdetails)
                      {   
                        this.addItems();
                        this.selectedItemName[k] = data1["itemid"];
                        this.misclabreportfg_Dtls.patchValue(dynamicdetails);
                        k++;
                      }
                      this.status = true;
                    });
              
            
        
                 this.status = true;
             }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in Lab Report,please try again....");
             this.ngOnInit()}); 
        
      
      
        }
      
        search()
        {
          let fromdate=this.userForm1.get("fromdate").value;
          let todate=this.userForm1.get("todate").value;
         
          let finyear =localStorage.getItem("financial_year");
          
          this.status=false;
          this.DropDownListService.searcLabReport("fromdate="+fromdate+"&todate="+todate+"&finyear="+finyear).subscribe(data=>
            {
          
              this.misclabreportfglist =data;
              this.status=true;
      
            }, (error) => {this.status=true;
              alert("Lab Report Data Not Found !!!")
              this.misclabreportfglist=[];
            })
        }
       
          
            print(misclabreportfgid,business_unitname,shift,approvedby_name,date)
            {
              const dialogConfig = new MatDialogConfig();
              dialogConfig.disableClose = true;
              dialogConfig.autoFocus = true;
              dialogConfig.data = {  }; 
              
              let dialogRef = this.dialog.open(MisclabreportfgprintpopupComponent, {data: {misclabreportfgid: misclabreportfgid,business_unitname:business_unitname,shift:shift,approvedby_name:approvedby_name,date:date}, height: '80%',
              width: '80%'});
              dialogRef.afterClosed().subscribe( data => 
              {
              
              }); 
          
            }
          
          
}
