import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { acc_cost_category } from '../../../../../../Models/Account-Master-Model/acc_cost_category';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

  @Component({
    selector: 'app-cost-category-master',
    templateUrl: './cost-category-master.component.html',
    styleUrls: ['./cost-category-master.component.scss']})

  export class CostCategoryMasterComponent implements OnInit 
  {
    model: acc_cost_category = new acc_cost_category();
    submitted = false;
    public userForm:FormGroup;
    listacc_cost_category: acc_cost_category[];
    bUnitCodes:{};
    isHidden=false;
    company_name:any;
    status = false;

    constructor(public fb:FormBuilder, private Service: Master,
      private DropDownListService: DropdownServiceService) 
    { 
      this.userForm=fb.group({  
      costcat_code: [''],
      costcat_name: [''],
      costcat_active: [''],
      allo_rev_items: [''],
      allo_non_rev_items: [''],     
      businessunit_name: [''],
      businessunit_code: [''],
      company_id: [''],
      fin_year: [''],
      username: ['']});
    }

    get costcat_code(){ return this.userForm.get("costcat_code") as FormControl }
    get costcat_name(){ return this.userForm.get("costcat_name") as FormControl }
    get costcat_active(){ return this.userForm.get("costcat_active") as FormControl }
    get allo_rev_items(){ return this.userForm.get("allo_rev_items") as FormControl }
    get allo_non_rev_items(){ return this.userForm.get("allo_non_rev_items") as FormControl }
    get businessunit_code(){ return this.userForm.get("businessunit_code") as FormControl }
    get businessunit_name(){ return this.userForm.get("businessunit_name") as FormControl }

    ngOnInit() 
    {
      this.company_name = sessionStorage.getItem("company_name");
      this.Service.getAccCostCategories().subscribe(data=>{this.listacc_cost_category  = data;});
      this.DropDownListService.bUnitList(this.company_name).subscribe(data=>{this.bUnitCodes = data;});
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
        this.Service.createAccCostCategory(this.userForm.getRawValue()).subscribe(data => 
        {
          console.log(this.userForm.value);
          alert("New AccCostCategory created successfully.");
          // window.location.reload();
          this.userForm.reset();
          this.status = true;
          //refresh List;
          this.Service.getAccCostCategories().subscribe(data=>{this.listacc_cost_category  = data;});
          this.DropDownListService.bUnitList(this.company_name).subscribe(data=>{this.bUnitCodes = data;});                
        }); 
      }
    }
   
  }
