import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Bingroup } from '../../../../../../Models/InventoryModel/Bingroup';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-bingroup',
  templateUrl: './bingroup.component.html',
  styleUrls: ['./bingroup.component.scss']
})
export class BingroupComponent implements OnInit {

  public userForm:FormGroup;
  model: Bingroup = new Bingroup();
  status = false;
  isHidden:any;
  bingrouplist:any = [];
  businesslists:any=[];
  company_name:any;
  Id:any;
  BuUnit = "0";
  bingroupsave:boolean=true;

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService) 
  { 
    this.userForm=fb.group({
      id:[''],
      bingroupid:[''],
      bingroupname:[''],
      business_unit:[''],
      description:[''],
      company_id:[''],
      fin_year:[''],
      username:['']

    });
  }
  get id(){ return this.userForm.get("id") as FormControl }
  get bingroupname(){ return this.userForm.get("bingroupname") as FormControl }
  get business_unit(){ return this.userForm.get("business_unit") as FormControl }
  get description(){ return this.userForm.get("description") as FormControl }
  get company_id(){ return this.userForm.get("company_id") as FormControl }
  get fin_year(){ return this.userForm.get("fin_year") as FormControl }
  get username(){ return this.userForm.get("username") as FormControl }

  ngOnInit() {
    this.isHidden=false;
    this.status=true;
    
    this.company_name = localStorage.getItem("company_name");
    let finyear =localStorage.getItem("financial_year");
    this.BuUnit = "0";
     this.bingroupsave=true;

   forkJoin(
    this.DropDownListService.getBingrouplist(),
    this.DropDownListService.getcompanyBUMNCListnew(this.company_name)
    )
   .subscribe(([bingroup,budata])=>
    {
     // console.log("budata:"+JSON.stringify(budata))
        this.bingrouplist = bingroup;
        this.businesslists=budata;
    });
  }

  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
      this.bingroupsave=true;
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

      if(this.userForm.get("business_unit").value == '' || this.userForm.get("business_unit").value == 0 || this.userForm.get("business_unit").value == null)
      {
        alert("Please Select Bussiness Unit Name!")
        this.status=true;
        }
      else if(this.userForm.get("bingroupname").value == '' || this.userForm.get("bingroupname").value == 0 || this.userForm.get("bingroupname").value == null)
      {
        alert("Please Enter Bin Group!")
        this.status=true;
      }
      else
      {
          if(this.Id>0)
          {
            this.Service.updateBinGroup(this.userForm.getRawValue(), this.Id).subscribe( data => 
              {
                alert("Bin Group Updated successfully.");
                this.userForm.reset();
                this.isHidden = false;
                this.showList('list');
                this.ngOnInit();
                this.status=true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Bin Group !!! please Reload the page and try again....");
              }); 
          }
          else
          {
            this.Service.createBinGroup(this.userForm.getRawValue())
            .subscribe(data =>
            {
              alert("Bin Group Saved successfully.");
              this.userForm.reset();
              this.showList('list');
              this.ngOnInit();
              this.status=true;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Bin Group !!! please Reload the page and try again....");
            });
          }
       }
       
      }

      onDelete(id)
      {
        if(confirm("Are you sure to delete this Bin Group From List?"))
        { 
            this.userForm.patchValue({username: localStorage.getItem("username")});
            this.Service.deleteBinGroup(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                alert("Bin Group Deleted successfully.");
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
          this.bingroupsave=false;
        }
        if(action == "update")
        {
          this.bingroupsave=true;
        }
    
        forkJoin(
          this.DropDownListService.retriveBinGroup(id),
          this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
          ).subscribe(([bingroup,bUnitData])=>
          {
            this.businesslists=bUnitData;
            this.userForm.patchValue(bingroup);
            this.status = true;
          
           }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in Bin Group,please try again....");
           this.ngOnInit()}); 
      
      }
}
