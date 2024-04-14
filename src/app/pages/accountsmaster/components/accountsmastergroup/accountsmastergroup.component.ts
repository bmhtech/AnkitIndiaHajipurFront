import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../service/dropdown-service.service';
import { Master } from '../../../../service/master.service';
import { Accounts_group_master } from '../../../../Models/AccountsMaster/AccountsGroup';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-accountsmastergroup',
  templateUrl: './accountsmastergroup.component.html',
  styleUrls: ['./accountsmastergroup.component.scss']
})
export class AccountsmastergroupComponent implements OnInit 
{
  public userForm:FormGroup;
  model:Accounts_group_master=new Accounts_group_master();

  listSupplierGroup:any=[];
  AcctsGroupNames:any=[];
  userParentGroups:any=[];
  listAccountsGroup:any=[];
  accountsTypes:any=[];
  accountsCatagory:any=[];
  isHidden=false;
  status = false;
  seq_no: string;
  Id:any;
  accountsType:any=[];
  acctsgroupsave:boolean=true;
  acctsgroupdelete:boolean=true;
  acctsgroupupdate:boolean=true;
  acctsgroupview:boolean=true;

  constructor(public fb:FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService) 
  { 
    this.userForm=fb.group
    ({
      id:[''],
      accts_group_code: [''],
    
      accts_id: [''],
      accts_grp_name: [''],
      parent_group: [''],
      accts_grp_active: [''],
      company_id: [''],
      fin_year: [''],
      username: ['']
    });
  }

      get id(){ return this.userForm.get("id") as FormControl }
      get accts_group_code(){ return this.userForm.get("accts_group_code") as FormControl }
     
      get accts_id(){ return this.userForm.get("accts_id") as FormControl }
      get accts_grp_name(){ return this.userForm.get("accts_grp_name") as FormControl }
      get parent_group(){ return this.userForm.get("parent_group") as FormControl }
      get accts_grp_active(){ return this.userForm.get("accts_grp_active") as FormControl }

  ngOnInit() 
  {
    this.acctsgroupsave=true;
    forkJoin(
    this.DropDownListService.getSeqNoForAccGrp("prefix="+localStorage.getItem("financial_year")+"&company="+localStorage.getItem("company_name")),
    this.DropDownListService.accountGroupList(),
   // this.DropDownListService.accountCatagoryList(),
    this.DropDownListService.accountTypeList(),
    this.DropDownListService.accountParentGroupList()
    ).subscribe(([Seq_No,acgrplist,acctype,accgroup])=>
        { 
          this.seq_no = Seq_No.sequenceid;
          this.listAccountsGroup=acgrplist;
          //this.accountsCatagory=acccatagory;
          this.accountsType=acctype;
          this.userParentGroups=accgroup;

        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});
    this.status = true;
  }

  showList(s:string)
    {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.reset();
        }  
      
        if(s=="list")
        {
          this.isHidden=false;
          this.userForm.reset();
          this.ngOnInit();
        }
    }

    /*onChangeCatagory(catagory)
    {
      if(catagory.length)
      {
        this.status = false;
        this.DropDownListService.accGroupList(localStorage.getItem("company_name"),catagory).subscribe(grpList=>
        {
          this.userParentGroups  = grpList;
          this.status = true;
        });
      }
    }*/
    
    send()
    {
      this.Id= this.userForm.get("id").value as FormControl;
      this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
        fin_year:localStorage.getItem("financial_year"),
        username: localStorage.getItem("username")}); 
        if(this.userForm.get("parent_group").value=='')
        {
          this.userForm.patchValue({parent_group:"NA"});
        }
        else{
          this.userForm.patchValue({parent_group:this.userForm.get("parent_group").value});
        }
      if(!this.userForm.valid) 
      {
        alert('Please fill all fields!')
        return false;
      } 
      else 
      {
        this.status=false;
        if(this.Id>0)
             {
                this.Service.updateAccGroups(this.userForm.getRawValue(), this.Id).subscribe(data => 
                {
                  console.log(this.userForm.value);
                  alert("Account Group updated successfully.");
                  this.userForm.reset();
                  //refresh List;
                  this.status=true;
                  this.ngOnInit();
                  this.isHidden=false;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Account Group updation Unsuccessfull...");
               // this.ngOnInit()
               }); 
              }
              else{
                this.Service.createAccGroups(this.userForm.getRawValue()).subscribe(data => 
                {
                  console.log(this.userForm.value);
                  if(data.accts_group_code =='' || data.accts_group_code ==null)
                  {
                    alert("Opps !!! Can't save this Item Category !!!");
                  }else{
                    alert("Account Group created successfully.");
                  }
                  this.userForm.reset();
                  this.status=true;
                  this.ngOnInit();
                  this.isHidden=false;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Account Group creation Unsuccessfull...");
                //this.ngOnInit()
              });
            }
          }  
      }

      onUpdate(id,action)
      {
        if(action == 'view')
        {
          this.acctsgroupsave = false;
        }
        else
        {
          this.acctsgroupsave = true;
        }
        this.userForm.patchValue({id: id});	
      this.status = false;
      this.isHidden = true;
      forkJoin(
        this.DropDownListService.retriveAccGroup(id),
       // this.DropDownListService.accountCatagoryList(),
        this.DropDownListService.accountTypeList(),
      ).subscribe(([grpdata,acctype])=>
        {
          console.log("update:"+JSON.stringify(grpdata))
          this.userForm.patchValue(grpdata);
          this.userForm.patchValue({id: grpdata["id"]});
          //this.accountsCatagory=acccatagory;
          this.accountsType=acctype;
          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});      
      }

      onDelete(id,accts_group_id)
      {
        this.status=false;
        if(confirm("Are you sure to delete this Account Group?"))
        {
          this.userForm.patchValue({username: localStorage.getItem("username")});
         this.DropDownListService.checkAccGroupUsage(accts_group_id).subscribe(checkgrp=> 
          {
           //alert("bidhan here::"+checkgrp.status);
           if(checkgrp.status=='No')
           {
              this.Service.deleteAccGrpMaster(this.userForm.getRawValue(),id).subscribe(data=> 
                {
                  alert("Account Group Deleted successfully.");
                  this.userForm.reset();
                  this.status = true;
                  this.isHidden = false;
                  this.ngOnInit();
                  this.showList("list");
                }); 
            }
            else
              {
                alert("This Account Group is Already Used,Can not be Deleted!! ");
              }
            }); 
          }
          this.status=true;
        }


        posting(id)
        {
          this.status=false;
          this.DropDownListService.postingaccountsgroup(id).subscribe(data=>
            {
              if(data["export"] == 1)
              {
                alert("Data has been Exported Sucessfully !!!!!!!!!!!!! ");
              }
              else
              {
                let responsestring=data["response"];
      
                let split=responsestring.split("LINEERROR>");
               console.log("array "+split[1] );
                let mssg=split[1];
                let finalmssg=mssg.toString().substring(13,mssg.length-24);
                console.log("finalmssg " + finalmssg)
      
                alert("Data Didn't Exported  !!!!!!!!!!!!! " + finalmssg + " LEDGER missing");
                
              }
              this.status=true;
            })
          
        }
}
