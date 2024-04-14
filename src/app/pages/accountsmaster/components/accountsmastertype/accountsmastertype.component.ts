import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../service/dropdown-service.service';
import { Master } from '../../../../service/master.service';
import { Accounts_type_master } from '../../../../Models/AccountsMaster/AccountsType';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-accountsmastertype',
  templateUrl: './accountsmastertype.component.html',
  styleUrls: ['./accountsmastertype.component.scss']
})
export class AccountsmastertypeComponent implements OnInit 
{
  public userForm:FormGroup;
  model:Accounts_type_master=new Accounts_type_master();
  
  listAccts_type_master:any=[];
  subclassification:any=[];
  catagory:any=[];
  status = false;
  isHidden = false;

  itemtypesave: boolean = true;
  itemtypeview:boolean = true;

  finYear:any;
  seq_no:any;

  constructor(public fb:FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService) 
    { 
      this.userForm=fb.group
      ({       
        id: [''],
        acc_type_code: [''],
        acc_type_name:[''],
        acc_type_classification:[''],
        acc_type_sub_classification:[''],
        acc_type_catagory:[''],
        company_id: [''],
        fin_year: [''],
        username: [''],
        user_role: [''],
      });
    }

        get id(){ return this.userForm.get("id") as FormControl }
        get accts_code(){ return this.userForm.get("acc_type_code") as FormControl }
        get acc_type_name(){ return this.userForm.get("acc_type_name") as FormControl }
        get acc_type_classification(){ return this.userForm.get("acc_type_classification") as FormControl }
        get acc_type_sub_classification(){ return this.userForm.get("acc_type_sub_classification") as FormControl }
        get acc_type_catagory(){ return this.userForm.get("acc_type_catagory") as FormControl }
        get company_id(){ return this.userForm.get("company_id") as FormControl }
        get fin_year(){ return this.userForm.get("fin_year") as FormControl }
        get username(){ return this.userForm.get("username") as FormControl }
        get user_role(){ return this.userForm.get("user_role") as FormControl }

  ngOnInit() 
  {
    this.finYear = localStorage.getItem("financial_year");
    this.status = true;
    forkJoin
    (
   
    this.DropDownListService.getAccountsTypeList()
    )
   
   .subscribe(([tlist])=>
      {
      
        this.listAccts_type_master=tlist;
      });

      this.subclassification=["BY AIR","BY ROAD","BY SHIP","BY TRAIN","N/A"];
  }

  showList(s:string)
  {
      if(s=="add")
      {
        this.isHidden=true;
        this.itemtypesave=true;
        this.DropDownListService.getATSequenceId(this.finYear).subscribe(slno=>
          {
            this.seq_no=slno.sequenceid;
          })
       
      }
      if(s=="list")
      {
        this.isHidden=false;
        this.itemtypesave=false;
        this.userForm.reset();
     
      }
  }

  send()
    {
          this.userForm.patchValue({company_id: localStorage.getItem("company_name"), fin_year: localStorage.getItem("financial_year"),username: localStorage.getItem("username")});

          this.Service.createAccountstype(this.userForm.getRawValue()).subscribe(data=> 
            {
              alert("New Accounts Type Created Successfully.....");
              this.status = true;
              this.userForm.reset(); 
              this.ngOnInit();
              this.isHidden=false;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));
                alert("New Accounts Type Creation Unsuccessfull...");
          });
        }

        onUpdate(id,action)
        {
           this.status=false;
           if(action=='view')
           {
            this.itemtypesave=false;
           }
           else
           {
            this.itemtypesave=true;
           }
            this.DropDownListService.retriveaccountstype(id).subscribe(accouttype=>
            {
                this.isHidden=true;
                console.log(" response " + JSON.stringify(accouttype))
                this.userForm.patchValue(accouttype);
                this.seq_no=accouttype["accts_code"];
                //console.log(this.userForm.get("accts_code").value + " / " + accouttype["accts_code"])
                this.status=true;
            });

        }

        onDelete(id,accts_id)
        {
        this.status=false;
        if(confirm("Are you sure to delete this Account Type?"))
        {
          this.userForm.patchValue({username: localStorage.getItem("username")});
         this.DropDownListService.checkAccTypeUsage(accts_id).subscribe(checktype=> 
          {
           //alert("bidhan here::"+checktype.status);
           if(checktype.status=='No')
           {
              this.Service.deleteaccountstype(this.userForm.getRawValue(),id).subscribe(data=> 
                {
                  alert("Account Type Deleted successfully.");
                  this.userForm.reset();
                  this.status = true;
                  this.isHidden = false;
                  this.ngOnInit();
                  this.showList("list");
                }); 
            }
            else
              {
                alert("This Account Type is Already Used,Can not be Deleted!! ");
              }
            }); 
          }
          this.status=true;   
        }


        onChangeclassification(classification)
        {
             if(classification.length)
             {
              if(classification == "ASSETS"  || classification == "LIABILTY")
              {
                this.subclassification=["Long Term","Short Term"];
                this.catagory=["Balance Sheet"];
                this.userForm.patchValue({acc_type_catagory:'Balance Sheet'})
              }
              else 
              {
                this.subclassification=["Operating","Non Operating"];
                this.catagory=["Manufacturing Account","Trading Account","Profit And Loss"];
              }
             
             }  
        }        
}
