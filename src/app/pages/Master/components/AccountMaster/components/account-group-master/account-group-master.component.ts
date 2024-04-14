import { Component, OnInit } from '@angular/core';
import { FormControl,ReactiveFormsModule , FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { acc_group } from '../../../../../../Models/Account-Master-Model/acc_group';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

  @Component({
    selector: 'app-account-group-master',
    templateUrl: './account-group-master.component.html',
    styleUrls: ['./account-group-master.component.scss']})

  export class AccountGroupMasterComponent implements OnInit 
  {
    model: acc_group = new acc_group();
    submitted = false;
    listacc_group: acc_group[];
    company_name:any;
    public userForm:FormGroup;
    bUnitCodes:{};
    groupClassification:{};
    test:{};
    isHidden=false;
    status = false;

    constructor(public fb:FormBuilder, private Service: Master,
      private DropDownListService: DropdownServiceService) 
    { 
      this.userForm=fb.group({ 
        group_code: [''],
        group_name: [''],
        group_active: [''],
        group_class: [''],
        group_under_cat: [''],        
        businessunit_name: [''],
        businessunit_code: [''],
        group_print: [''],
        ledger_details: [''],
        open_bal_amt: [''],
        curr_bal_amt: [''],
        company_id: [''],
        fin_year: [''],
        username: ['']});
    }
 
    get group_code(){ return this.userForm.get("group_code") as FormControl }
    get group_name(){ return this.userForm.get("group_name") as FormControl }
    get group_active(){ return this.userForm.get("group_active") as FormControl }
    get group_class(){ return this.userForm.get("group_class") as FormControl }
    get group_under_cat(){ return this.userForm.get("group_under_cat") as FormControl }
    get group_print(){ return this.userForm.get("group_print") as FormControl }
    get ledger_details(){ return this.userForm.get("ledger_details") as FormControl }
    get businessunit_code(){ return this.userForm.get("businessunit_code") as FormControl }
    get businessunit_name(){ return this.userForm.get("businessunit_name") as FormControl }
    get open_bal_amt(){ return this.userForm.get("open_bal_amt") as FormControl }
    get curr_bal_amt(){ return this.userForm.get("curr_bal_amt") as FormControl }

    ngOnInit() 
    {
      this.company_name = sessionStorage.getItem("company_name");
      this.Service.getAccountGroups().subscribe(data=>{ console.log("got list: "+JSON.stringify(data));this.listacc_group  = data;});
      this.DropDownListService.bUnitList(this.company_name).subscribe(data=>{ console.log("got bunitlist: "+JSON.stringify(data));this.bUnitCodes = data;});
      this.groupClassification=["asset","liabelity","equity","revenue","expense"];
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
        this.Service.createAccGroup(this.userForm.getRawValue()).subscribe(data=> 
        {
          console.log(this.userForm.value);
          alert("New Account Group Created Successfully.");
          //window.location.reload();
          this.userForm.reset();
          this.status = true;
          //refresh List;
          this.Service.getAccountGroups().subscribe(data=>{ console.log("got list: "+JSON.stringify(data));this.listacc_group  = data;});
          this.DropDownListService.bUnitList(this.company_name).subscribe(data=>{ console.log("got bunitlist: "+JSON.stringify(data));this.bUnitCodes = data;});
          this.groupClassification=["asset","liabelity","equity","revenue","expense"];                 
        });
      }
    }

  }
