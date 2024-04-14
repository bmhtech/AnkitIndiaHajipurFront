import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { forkJoin } from 'rxjs';
import { Binreport } from '../../../../../../Models/Report/binreports';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../../service/excel.service';
import { Master } from '../../../../../../service/master.service';
import { BinreportspopupComponent } from '../binreportspopup/binreportspopup.component';

@Component({
  selector: 'app-binreports',
  templateUrl: './binreports.component.html',
  styleUrls: ['./binreports.component.scss']
})
export class BinreportsComponent implements OnInit {
 
  public userForm:FormGroup;
  status = false;
  isHidden:any;
  model: Binreport = new Binreport();
  businesslists:any=[];
  employeelist:any=[];
  currentDate:any;
  BuUnit = "0";
  company_name:any;
  binlist:any=[];
  bingrouplist:any=[];
  Id:any;
  billreportlist:any=[];

  constructor(public fb:FormBuilder,private Service: Master, private DropDownListService: DropdownServiceService,private excelService:ExcelService,private dialog: MatDialog) 
  {
    this.userForm=fb.group(
      {
        id:[''],
        binreportid:[''],
        business_unit:[''],     
        date:[''],
        approvedby:[''],
        company_id:[''],
        fin_year:[''],
        username:[''],

        binreportdetails: this.fb.array([this.fb.group(
          {
            bingroupid:'',
            bingroupname:'',
            binid:'',
            binname:'',
            dip:'',
            mt:'',
            prevdip:'',
            prevmt:''
          })])

      });
  }
  
  get id(){ return this.userForm.get("id") as FormControl }
  get binreportid(){ return this.userForm.get("binreportid") as FormControl }
  get approvedby(){ return this.userForm.get("approvedby") as FormControl }
  get business_unit(){ return this.userForm.get("business_unit") as FormControl }
  get date(){ return this.userForm.get("date") as FormControl }

  get company_id(){ return this.userForm.get("company_id") as FormControl }
  get fin_year(){ return this.userForm.get("fin_year") as FormControl }
  get username(){ return this.userForm.get("username") as FormControl }
  get binreportdetails() { return this.userForm.get('binreportdetails') as FormArray;}
  
 
  ngOnInit() 
  {
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.isHidden=false;
    this.status=true;
    this.company_name = localStorage.getItem("company_name");
    let finyear =localStorage.getItem("financial_year");
    this.BuUnit = "0";
    

   forkJoin(
    this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
    this.DropDownListService.getEmployeeNamenew(this.company_name),
    this.DropDownListService.getBingrouplist(),
    this.DropDownListService.getbinlist(),
    this.DropDownListService.getbillreportlist(finyear)
    )
   .subscribe(([budata,emplist,bingroup,binlistfull,billreportdetails])=>
    {
    
        this.businesslists=budata;
        this.employeelist=emplist;
        this.bingrouplist=bingroup;
        this.binlist=binlistfull;
        this.billreportlist=billreportdetails;
        
    });
  }

  
  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
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
      binreportid:[''],
      business_unit:[''],     
      date:[''],
     
      approvedby:[''],
      company_id:[''],
      fin_year:[''],
      username:[''],

      binreportdetails: this.fb.array([this.fb.group(
        {
          bingroupid:'',
          bingroupname:'',
          binid:'',
          binname:'',
          dip:'',
          mt:'',
          prevdip:'',
          prevmt:''
        })])
    });
  }

  addbindetails()
  {
     
      this.binreportdetails.push(this.fb.group({
        bingroupid:'',
        bingroupname:'',
        binid:'',
        binname:'',
        dip:'',
        mt:'',
        prevdip:'',
        prevmt:''
      }))
  }
  selectedgroup=[];
  selectedbin=[];
  getBinperBusinessunit(businessunit_id)
    {
        if(businessunit_id.length)
        {
          this.DropDownListService.getbinreportlist(businessunit_id,localStorage.getItem("financial_year")).subscribe(data=>
          {
            this.selectedgroup = [];
            this.selectedbin = [];
            let k=0;
            while (this.binreportdetails.length) 
            this.binreportdetails.removeAt(0);
            console.log(JSON.stringify(data))
            for(let data1 of data)
            {  
             // console.log("here "+data1["bingroupid"])
              this.addbindetails();
              this.selectedgroup[k] = data1["bingroupid"];
              this.selectedbin[k] = data1["binid"];
              this.binreportdetails.at(k).patchValue({bingroupid:data1["bingroupid"],binid:data1["binid"],
              dip:data1["dip"],mt:data1["mt"],prevdip:data1["prevdip"],prevmt:data1["prevmt"]});
              //console.log(this.binreportdetails.at(k).get("bingroupid").value + " // " + this.binreportdetails.at(k).get("binid").value)
              k++;
            }
           });        
        }
    }

    onchangeDirtyBinName(index, bin_id)
    {
      
      if(bin_id.length && bin_id != "0")
      {
        this.binreportdetails.at(index).patchValue({binid: bin_id});
      }
    }


    send()
    {
      this.Id= this.userForm.get("id").value as FormControl; 
      this.userForm.patchValue({company_id: localStorage.getItem("company_name"),
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
              this.Service.updatebinreport(this.userForm.getRawValue(), this.Id).subscribe( data => 
                {
                  alert("Bin Report Updated successfully.");
                  this.userForm.reset();
                  this.isHidden = false;
                  this.showList('list');
                  this.ngOnInit();
                  this.status=true;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Bin Report !!! please Reload the page and try again....");
                }); 
            }
            else
            {
              this.Service.createbinreport(this.userForm.getRawValue())
              .subscribe(data =>
              {
                alert("Bin Report Saved successfully.");
                this.userForm.reset();
                this.showList('list');
                this.ngOnInit();
                this.status=true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Bin Report !!! please Reload the page and try again....");
              });
            }
      }

    }

    onUpdate(id,action)
    {
      this.isHidden=true;
      /* if(action == "view")
      {
        this.billreportsave=false;
      }
      if(action == "update")
      {
        this.billreportsave=true;
      }*/
      forkJoin(
        this.DropDownListService.retrivebillreport(id),
        this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
        this.DropDownListService.getEmployeeNamenew(this.company_name),
        this.DropDownListService.getBingrouplist(),
        this.DropDownListService.getbinlist()
        ).subscribe(([billreport,bUnitData,emplist,bingroup,binlistfull])=>
        {
              this.businesslists=bUnitData;
              this.employeelist=emplist;
              this.bingrouplist=bingroup;
              this.binlist=binlistfull;
              this.userForm.patchValue(billreport);
              forkJoin(
                this.DropDownListService.retrivebillreportDetails(billreport['binreportid'])
                ).subscribe(([dynamicdetails])=>  
                  { 
                    let k=0;
                    while (this.binreportdetails.length) 
                    this.binreportdetails.removeAt(0);
                  
                    for(let data1 of dynamicdetails)
                    {  
                      this.addbindetails();
                      this.selectedgroup[k] = data1["bingroupid"];
                      this.selectedbin[k] = data1["binid"];
                      this.binreportdetails.at(k).patchValue({bingroupid:data1["bingroupid"],binid:data1["binid"],
                      dip:data1["dip"],mt:data1["mt"],prevdip:data1["prevdip"],prevmt:data1["prevmt"]});
                      k++;
                    }
                  }
                );


        });

    }
   
    onDelete(id)
    {
      if(confirm("Are you sure to delete this Bin Report From List?"))
      { 
          this.userForm.patchValue({username: localStorage.getItem("username")});
          this.Service.deletebinreport(this.userForm.getRawValue(),id).subscribe(data=> 
            {
              alert("Bin Report Deleted successfully.");
              this.userForm.reset();
              this.ResetAllValues();
              this.status = true;
              this.ngOnInit();
            });
  
      }
    }

    /*getBinpergrouplist(bingroupid)
    {
      if(bingroupid.length)
      {
        this.DropDownListService.getbinlistbygroup(bingroupid,localStorage.getItem("financial_year")).subscribe(data=>
        {
          this.binlist=data;

        });
      }
    }*/

    getBin(binid,index)
    {
      if(binid.length)
      {
        console.log(binid+" // " + index)
             let checkitemalreadyexist:boolean=false;
             for(let i=0;i<this.binreportdetails.length;i++)
             {
                  if(((this.binreportdetails.at(i).get("binid").value == binid) && (this.binreportdetails.at(i).get("bingroupid").value==this.binreportdetails.at(index).get("bingroupid").value)) && (i !=index))
                  {
                    checkitemalreadyexist=true;
                  }
             }

             if(checkitemalreadyexist==true)
             {
                 alert("Bin Name Name Already Exist in same bin Group Catagory!!!!!!!!");
                 this.binreportdetails.at(index).patchValue({binid:''});
             }
             else
             {

                this.DropDownListService.checkbingroup(this.binreportdetails.at(index).get("bingroupid").value,binid,localStorage.getItem("financial_year")).subscribe(data=>
                {
                    if(data["status"] == "NO")
                    {
                      alert("Selected Bin Name Name Doesnot Exist in Selected Bin Group Catagory!!!!!!!!");
                      this.binreportdetails.at(index).patchValue({binid:''});
                    }
                   
                  
                });

             }
      }
    }

    getMatWt(dip, index)
    {
      //dip.target.value;
      this.DropDownListService.bincalculation(this.binreportdetails.at(index).get("binid").value,dip.target.value).subscribe(data=>
      {
         this.binreportdetails.at(index).patchValue({mt:data["status"]});
      });


    }
    
    onPrint(id,binreportid)
    {
    
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {  };
      let comp=this.company_name;
      let dialogRef = this.dialog.open(BinreportspopupComponent, {data: {alldata: id,binreportid:binreportid}, height: '80%',
      width: '80%'});
      dialogRef.afterClosed().subscribe( data => 
      {
      
      }); 

    }
}
