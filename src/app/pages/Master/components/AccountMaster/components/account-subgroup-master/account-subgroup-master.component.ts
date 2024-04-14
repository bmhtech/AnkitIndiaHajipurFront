import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,  } from '@angular/forms';
import { acc_subgroup } from '../../../../../../Models/Account-Master-Model/acc_subgroup';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

  @Component({
    selector: 'app-account-subgroup-master',
    templateUrl: './account-subgroup-master.component.html',
    styleUrls: ['./account-subgroup-master.component.scss']})

  export class AccountSubgroupMasterComponent implements OnInit 
  {
    model: acc_subgroup = new acc_subgroup();
    submitted = false;
    public userForm:FormGroup;
    listacc_subgroup: acc_subgroup[];
    bUnitCodes:{};
    acGroupCodes:{};
    company_name:any;
    isHidden=false;
    status = false;
  
    constructor(public fb:FormBuilder, private Service: Master,
      private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group({ 
      subgroup_code: [''],
      subgroup_name: [''],
      subgroup_active: [''],
      group_code: [''],
      groupname: [''],        
      businessunit_name: [''],
      businessunit_code: [''],
      open_bal_amt: [''],
      curr_bal_amt: [''],
      company_id: [''],
      fin_year: [''],
      username: ['']});
    }

    get subgroup_code(){ return this.userForm.get("subgroup_code") as FormControl }
    get subgroup_name(){ return this.userForm.get("subgroup_name") as FormControl }
    get subgroup_active(){ return this.userForm.get("subgroup_active") as FormControl }
    get group_code(){ return this.userForm.get("group_code") as FormControl }
    get groupname(){ return this.userForm.get("groupname") as FormControl }
    get businessunit_code(){ return this.userForm.get("businessunit_code") as FormControl }
    get businessunit_name(){ return this.userForm.get("businessunit_name") as FormControl }
    get open_bal_amt(){ return this.userForm.get("open_bal_amt") as FormControl }
    get curr_bal_amt(){ return this.userForm.get("curr_bal_amt") as FormControl }

   
    ngOnInit() 
    {
      this.company_name = sessionStorage.getItem("company_name");
      this.Service.getAccAccSubGroups().subscribe(data=>{ this.listacc_subgroup  = data;});
      this.DropDownListService.bUnitList(this.company_name).subscribe(data=>{this.bUnitCodes = data;});
      this.DropDownListService.aGroupList().subscribe(data=>{this.acGroupCodes = data;});
      this.status = true;
    }
 
    onchangeBUnitName(businessunit_code: String)
    {
      if(businessunit_code)
      {
        this.status = false;
        this.DropDownListService.nameListByBUnitCode(businessunit_code).subscribe(data=>
        { 
          this.userForm.patchValue(data);
          this.status = true;
        });   
      }
    }

    onchangeAcGroupName(group_code: String)
    {
      if(group_code)
      {
        this.status = false;
        this.DropDownListService.nameListByAcGroupCode(group_code).subscribe(data=>
        {
          this.userForm.patchValue(data);
          this.status = true;
        });  
      }
    }

    showList(s:string)
    {
      if(s=="add")
      {this.isHidden=true;}
      if(s=="list")
      {this.isHidden=false;}
    }
  
    send()
    {
      this.userForm.patchValue({company_id: sessionStorage.getItem("company_name"), 
        fin_year:sessionStorage.getItem("financial_year"), username: sessionStorage.getItem("username")});
      this.submitted = true;
      if(!this.userForm.valid) 
      {
        alert('Please fill all fields!')
        return false;
      } 
      else 
      {
        this.status = false;
        this.Service.createAccSubGroup(this.model).subscribe(data => 
        {
          console.log(this.userForm.value);
          alert("New AccSubGroup created successfully.");
          //  window.location.reload();
          this.userForm.reset();
          this.status = true;
          //refresh List;
           this.Service.getAccAccSubGroups().subscribe(data=>{ this.listacc_subgroup  = data;});
           this.DropDownListService.bUnitList(this.company_name).subscribe(data=>{this.bUnitCodes = data;});
           this.DropDownListService.aGroupList().subscribe(data=>{this.acGroupCodes = data;});                 
        });
      }
    }
  
  }