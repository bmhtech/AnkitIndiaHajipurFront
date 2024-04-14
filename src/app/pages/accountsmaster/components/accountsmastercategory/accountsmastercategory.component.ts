import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../service/dropdown-service.service';
import { Master } from '../../../../service/master.service';
import { Accounts_category_master } from '../../../../Models/AccountsMaster/AccountsCategory';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-accountsmastercategory',
  templateUrl: './accountsmastercategory.component.html',
  styleUrls: ['./accountsmastercategory.component.scss']
})
export class AccountsmastercategoryComponent implements OnInit 
{
  public userForm:FormGroup;
  model:Accounts_category_master=new Accounts_category_master();

  listAccts_category_master:any=[];
  acctstypes:any =[];
  
  isHidden=false;
  status = false;
  seq_no: string;
  finYear:any;
  Id:any;
  acctscatagorymastersave:boolean=true;
  // acctscatagorymastersave:boolean=true;
  // acctscatagorymasterupdate:boolean=true;
  // acctscatagorymasterdelete:boolean=true;
  // acctscatagorymasterview:boolean=true; 

  constructor(public fb:FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService) 
    { 
      this.userForm=fb.group
      ({
        id:[''],
        accts_catagory_code: [''],
        accts_catagory_name: [''],
        accts_type: [''],
        accts_active: [''],
        company_id: [''],
        fin_year: [''],
        username: ['']
      });
    }

        get id(){ return this.userForm.get("id") as FormControl }
        get accts_catagory_code(){ return this.userForm.get("accts_catagory_code") as FormControl }
        get accts_catagory_name(){ return this.userForm.get("accts_catagory_name") as FormControl }
        get accts_type(){ return this.userForm.get("accts_type") as FormControl }
        get accts_active(){ return this.userForm.get("accts_active") as FormControl }

  ngOnInit() 
  {

    this.status = true;
    this.finYear = localStorage.getItem("financial_year");
    this.status = true;
    forkJoin(
      this.DropDownListService.getAccountsCategoryList(),
      this.DropDownListService.getAccountsTypeList()
    )
   .subscribe(([acc_catogory,typelist])=>
    {
       this.listAccts_category_master=acc_catogory;
       this.acctstypes=typelist;
    });
   

  }

  showList(s:string)
    {
      if(s=="add")
      {       
        this.isHidden=true; 
        this.acctscatagorymastersave=true;   
        this.DropDownListService.getAccountCatagorySequenceId(this.finYear).subscribe(slno=>
          {
            this.seq_no=slno.sequenceid;
          })
      }
    
      if(s=="list")
      {
        this.isHidden=false;
        this.userForm.reset();
        this.ngOnInit();
      }
    }
  
  send()
  {
       this.userForm.patchValue({company_id: localStorage.getItem("company_name"), fin_year: localStorage.getItem("financial_year"),username: localStorage.getItem("username")});
       this.Id= this.userForm.get("id").value as FormControl;    
       if(this.Id>0)
        {
          this.Service.updateAccCatagory(this.userForm.getRawValue(),this.Id).subscribe(data=> 
            {
              alert("New Accounts Catagory Updated Successfully.....");
              this.status = true;
              this.userForm.reset(); 
              this.ngOnInit();
              this.isHidden=false;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));
                alert("New Accounts Catagory Creation Unsuccessfull...");
          });
        }
        else
        {
          this.Service.createAccCatagory(this.userForm.getRawValue()).subscribe(data=> 
            {
              alert("New Accounts Catagory Created Successfully.....");
              this.status = true;
              this.userForm.reset(); 
              this.ngOnInit();
              this.isHidden=false;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));
                alert("New Accounts Catagory Creation Unsuccessfull...");
          });
        }    
  }

  onUpdate(id,action)
  {
    if(action=='view')
    {
      this.acctscatagorymastersave=false;   
    }
    else
    {
      this.acctscatagorymastersave=true;   
    }
      this.DropDownListService.retriveaccountscatagory(id).subscribe(accoutcatagory=>
      {
          this.isHidden=true;
          console.log(JSON.stringify(accoutcatagory))
          this.userForm.patchValue(accoutcatagory);
          this.userForm.patchValue({id: id});
          this.seq_no=accoutcatagory["accts_catagory_code"];
          this.status=true;
      });

  }

    onDelete(id,accts_catagory_id)
    {
      this.status=false;
      if(confirm("Are you sure to delete this Account Catagory?"))
      {
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.DropDownListService.checkAccCatagoryUsage(accts_catagory_id).subscribe(checkgrp=> 
        {
          //alert("bidhan here::"+checkgrp.status);
          if(checkgrp.status=='No')
          {
            this.Service.deleteAccCatagoryMaster(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                alert("Account Catagory Deleted successfully.");
                this.userForm.reset();
                this.status = true;
                this.isHidden = false;
                this.ngOnInit();
                this.showList("list");
              }); 
          }
          else
            {
              alert("This Account Catagory is Already Used,Can not be Deleted!! ");
            }
          }); 
        }
        this.status=true;
      }

}
