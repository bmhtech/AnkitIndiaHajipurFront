import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { acc_gen_ledger } from '../../../../../../Models/Account-Master-Model/acc_gen_ledger';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

  @Component({
    selector: 'app-general-account-ledger-master',
    templateUrl: './general-account-ledger-master.component.html',
    styleUrls: ['./general-account-ledger-master.component.scss']
  })

  export class GeneralAccountLedgerMasterComponent implements OnInit 
  {
    submitted = false;
    public userForm:FormGroup;
    listacc_gen_ledger: acc_gen_ledger[];
    model: acc_gen_ledger = new acc_gen_ledger();
    bUnitCodes:{};
    company_name:any;
    acGroupCodes:{};
    acSubGroupCodes:{};
    openblnceList:{};
    isHidden=false;
    status = false;
  
    constructor(public fb:FormBuilder, private Service: Master,
      private DropDownListService: DropdownServiceService) 
    { 
      this.userForm=fb.group({  
        galedger_code: [''],
        galedger_name: [''],
        galedger_active: [''],
        galedger_alias: [''],
        asubgroup_code: [''],     
        subgroupname: [''],
        groupname: [''],
        businessunit_code: [''],
        businessunit_name: [''],
        inventory_val: [''],
        cost_center_app: [''],
        open_bal_amt: [''],
        open_bal_type: [''],
        curr_bal_amt: [''],
        company_id: [''],
        fin_year: [''],
        username: ['']});
    }

    get galedger_code(){ return this.userForm.get("galedger_code") as FormControl }
    get galedger_name(){ return this.userForm.get("galedger_name") as FormControl }
    get galedger_active(){ return this.userForm.get("galedger_active") as FormControl }
    get galedger_alias(){ return this.userForm.get("galedger_alias") as FormControl }
    get asubgroup_code(){ return this.userForm.get("asubgroup_code") as FormControl }
    get subgroupname(){ return this.userForm.get("subgroupname") as FormControl }
    get groupname(){ return this.userForm.get("groupname") as FormControl }
    get businessunit_code(){ return this.userForm.get("businessunit_code") as FormControl }
    get businessunit_name(){ return this.userForm.get("businessunit_name") as FormControl }
    get inventory_val(){ return this.userForm.get("inventory_val") as FormControl }
    get cost_center_app(){ return this.userForm.get("cost_center_app") as FormControl }
    get open_bal_amt(){ return this.userForm.get("open_bal_amt") as FormControl }
    get open_bal_type(){ return this.userForm.get("open_bal_type") as FormControl }
    get curr_bal_amt(){ return this.userForm.get("curr_bal_amt") as FormControl }

    ngOnInit() 
    {
      this.company_name = sessionStorage.getItem("company_name");
      this.Service.getAccGenLedgers().subscribe(data=>{this.listacc_gen_ledger  = data; });
      this.DropDownListService.bUnitList(this.company_name).subscribe(data=>{this.bUnitCodes = data;});
      this.DropDownListService.aSubGroupList().subscribe(data=>{this.acSubGroupCodes = data;});
      this.openblnceList=["Credit","Debit"];
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

    onchangeAcSubGroupName(asubgroup_code: String)
    {
      if(asubgroup_code)
      {
        this.status = false;
        this.DropDownListService.nameListByAcSubGroupCode(asubgroup_code).subscribe(data=>
        {this.userForm.patchValue(data)});
        let gr=asubgroup_code.substring(0,2);
        this.DropDownListService.nameListByAcGroupCode(gr).subscribe(data=>
        {this.userForm.patchValue(data);});
        this.status = true;
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
        this.Service.createAccGenLedger(this.userForm.getRawValue()).subscribe(data => 
        {
          console.log(this.userForm.value);
          alert("New AccGenLedger created successfully.");
          //window.location.reload();
          this.userForm.reset();
          this.status = true;
          //refresh List;
          this.Service.getAccGenLedgers().subscribe(data=>{this.listacc_gen_ledger  = data; });
          this.DropDownListService.bUnitList(this.company_name).subscribe(data=>{this.bUnitCodes = data;});
          this.DropDownListService.aSubGroupList().subscribe(data=>{this.acSubGroupCodes = data;});
          this.openblnceList=["Credit","Debit"];
        }); 
      }
    }

  }
