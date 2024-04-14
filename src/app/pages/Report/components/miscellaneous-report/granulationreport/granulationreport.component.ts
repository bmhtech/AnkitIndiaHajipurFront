import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';
import { Granulationreport } from '../../../../../Models/Report/Granulationreport';
import { GranulationreportprintpopupComponent } from '../granulationreportprintpopup/granulationreportprintpopup.component';

@Component({
  selector: 'app-granulationreport',
  templateUrl: './granulationreport.component.html',
  styleUrls: ['./granulationreport.component.scss']
})
export class GranulationreportComponent implements OnInit {

  public userForm:FormGroup;
  public userForm1:FormGroup;
  model: Granulationreport = new Granulationreport();
  status = false;
  isHidden:any;
  granulationlist:any = [];
  businesslists:any=[];
  employeelist:any=[];
  company_name:any;
  Id:any;
  currentDate:any;
  BuUnit = "0";
  granulationsave:boolean=true;
  sl_no:number=1;
  itemList:any=[];
  seivesList:any[];

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService,private excelService:ExcelService,private dialog: MatDialog) 
  { 
    this.userForm=fb.group({
      id:[''],
      granulationreportid:[''],
      date:[''],
      business_unit:[''],
      shift:[''],
      itemid:[''],
      approvedby:[''],
      closed:[''],
      company_id:[''],
      fin_year:[''],
      username:[''],

      granulation_Dtls: this.fb.array([this.fb.group({
        slno:this.sl_no,
        seivesid:'',
        eight:'',
        nine:'',
        ten:'',
        eleven:'',
        twelve:'',
        one:'',
        two:'',
        three:'',
        four:'',
        five:'',
        six:'',
        seven:''
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
   get itemid(){ return this.userForm.get("itemid") as FormControl }
   get approvedby(){ return this.userForm.get("approvedby") as FormControl }
   get closed(){ return this.userForm.get("closed") as FormControl }
   
   get company_id(){ return this.userForm.get("company_id") as FormControl }
   get fin_year(){ return this.userForm.get("fin_year") as FormControl }
   get username(){ return this.userForm.get("username") as FormControl }

   get granulation_Dtls(){return this.userForm.get("granulation_Dtls") as FormArray};
   

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
     this.granulationsave=true;

   forkJoin(
    this.DropDownListService.getGranulationlist(this.currentDate,finyear),
    this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
    this.DropDownListService.getEmployeeNamenew(this.company_name)
    )
   .subscribe(([granulation,budata,emplist])=>
    {
      console.log("granulation:"+JSON.stringify(granulation))
        this.granulationlist = granulation;
        this.businesslists=budata;
        this.employeelist=emplist;
    });
  }

  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
      this.granulationsave=true;
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
    granulationreportid:[''],
      date:[''],
      business_unit:[''],
      shift:[''],
      itemid:[''],
      approvedby:[''],
      closed:[''],
      company_id:[''],
      fin_year:[''],
      username:[''],

    granulation_Dtls: this.fb.array([this.fb.group({
      slno:this.sl_no,
        seivesid:'',
        eight:'',
        nine:'',
        ten:'',
        eleven:'',
        twelve:'',
        one:'',
        two:'',
        three:'',
        four:'',
        five:'',
        six:'',
        seven:''
      })])
    });
  }

  addItems()
  {
   this.sl_no =this.granulation_Dtls.length +1; 
    this.granulation_Dtls.push(this.fb.group({
      slno:this.sl_no,
      seivesid:'',
        eight:'',
        nine:'',
        ten:'',
        eleven:'',
        twelve:'',
        one:'',
        two:'',
        three:'',
        four:'',
        five:'',
        six:'',
        seven:''}))
    }

    selectedItemName:any;
    selectedSeivesName=[];
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
    onchangeItemNamestock(itemId)
    {
      if(itemId.length && itemId != "0")
      {
        this.userForm.patchValue({itemid: itemId});
      }
    }

    

    getSeivesname(itemid)
    {
        if(itemid.length)
        {
            this.DropDownListService.getSeiveslistByitemid(itemid).subscribe(data=>
            {
             //console.log(""+JSON.stringify(data))
              this.seivesList=data;
              let k=0;
              this.sl_no = 0;
              while (this.granulation_Dtls.length) 
              this.granulation_Dtls.removeAt(0);
              for(let data1 of data)
              {  
                this.addItems();
                this.selectedSeivesName[k] = data1["seives_name"];
                this.granulation_Dtls.at(k).patchValue({seivesid:data1["seives_name"]});
                k++;
              }
            });        
        }
    }

    delete(index) 
    {
      if(index)
      {
        this.granulation_Dtls.removeAt(index);
        for( let i=0;i<=this.granulation_Dtls.length;i++)
        {
          this.granulation_Dtls.at(i).patchValue({slno:i+1})
        }

      }
      else
      {
        if(this.granulation_Dtls.length>1)
        {
          this.granulation_Dtls.removeAt(index);
          for( let i=0;i<=this.granulation_Dtls.length;i++)
        {
          this.granulation_Dtls.at(i).patchValue({slno:i+1})
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
        else if(this.userForm.get("itemid").value == '' || this.userForm.get("itemid").value == 0 || this.userForm.get("itemid").value == null)
        {
          alert("Please Select Item Name!")
          this.status=true;
        }
        else if(this.userForm.get("closed").value == '' || this.userForm.get("closed").value == 0 || this.userForm.get("closed").value == null)
        {
          alert("Please Select Closed!")
          this.status=true;
        }
        else
        {
          let seives = false;
         // alert(this.granulation_Dtls.length)
          for(let b=0;b<this.granulation_Dtls.length;b++)
          {
            console.log("chk"+this.granulation_Dtls.at(b).get("seivesid").value)
            if(this.granulation_Dtls.at(b).get("seivesid").value == null || this.granulation_Dtls.at(b).get("seivesid").value == '' || this.granulation_Dtls.at(b).get("seivesid").value == 0)
            {
              
              seives = true; 
            }
          }
          if(seives ==true)
          {
            alert("Please Select Seives Name in Granulation report Details Tab!!!");
            this.status = true;
          }
          else
          {
            if(this.Id>0)
            {
              this.Service.updateGranulation(this.userForm.getRawValue(), this.Id).subscribe( data => 
                {
                  alert("Granulation Report Updated successfully.");
                  this.userForm.reset();
                  this.isHidden = false;
                  this.showList('list');
                  this.ngOnInit();
                  this.status=true;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Granulation Report !!! please Reload the page and try again....");
                }); 
            }
            else
            {
              this.Service.createGranulation(this.userForm.getRawValue())
              .subscribe(data =>
              {
                alert("Granulation Report Saved successfully.");
                this.userForm.reset();
                this.showList('list');
                this.ngOnInit();
                this.status=true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Granulation Report !!! please Reload the page and try again....");
              });
            }
          }
         }
        }

        onDelete(id)
        {
          if(confirm("Are you sure to delete this Granulation Report From List?"))
          { 
              this.userForm.patchValue({username: localStorage.getItem("username")});
              this.Service.deleteGranulation(this.userForm.getRawValue(),id).subscribe(data=> 
                {
                  alert("Granulation Report Deleted successfully.");
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
            this.granulationsave=false;
          }
          if(action == "update")
          {
            this.granulationsave=true;
          }
      
          forkJoin(
            this.DropDownListService.retriveGranulationReport(id),
            this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
            this.DropDownListService.getEmployeeNamenew(this.company_name)
            ).subscribe(([granulation,bUnitData,empdata])=>
            {
              this.businesslists=bUnitData;
              this.employeelist=empdata;
              this.userForm.patchValue(granulation);
              forkJoin(
                  this.DropDownListService.retriveGranulationDetails(granulation['granulationreportid']),
                 this.DropDownListService.getLabItemlist(granulation['business_unit'])
                  ).subscribe(([dynamicdetails,item_list])=>  
                    {
                      this.selectedSeivesName = [];
                      this.itemList=item_list;
                      //console.log("item_list:"+JSON.stringify(item_list))
                      let k=0;
                      this.sl_no = 0;
                      while (this.granulation_Dtls.length) 
                      this.granulation_Dtls.removeAt(0);
                      for(let data1 of dynamicdetails)
                      {  
                        this.selectedItemName=data1["itemid"]; 
                        this.addItems();
                        this.selectedSeivesName[k] = data1["seivesid"];
                        this.granulation_Dtls.patchValue(dynamicdetails);
                        k++;
                      }
                      this.status = true;
                    });
              
            
        
                 this.status = true;
             }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in Granulation Report,please try again....");
             this.ngOnInit()}); 
        
      
      
        }
      
        search()
        {
          let fromdate=this.userForm1.get("fromdate").value;
          let todate=this.userForm1.get("todate").value;
         
          let finyear =localStorage.getItem("financial_year");
          
          this.status=false;
          this.DropDownListService.searchGranulationReport("fromdate="+fromdate+"&todate="+todate+"&finyear="+finyear).subscribe(data=>
            {
          
              this.granulationlist =data;
              this.status=true;
      
            }, (error) => {this.status=true;
              alert("Granulation Report Data Not Found !!!")
              this.granulationlist=[];
            })
        }
       
          
            print(granulationreportid,date,business_unitname,item_name,shift,approvedby_name)
            {
              const dialogConfig = new MatDialogConfig();
              dialogConfig.disableClose = true;
              dialogConfig.autoFocus = true;
              dialogConfig.data = {  };
              
              let dialogRef = this.dialog.open(GranulationreportprintpopupComponent, {data: {granulationreportid: granulationreportid,date:date,business_unitname:business_unitname,item_name:item_name,shift:shift,approvedby_name:approvedby_name}, height: '80%',
              width: '80%'});
              dialogRef.afterClosed().subscribe( data => 
              {
              
              }); 
          
            }

}
