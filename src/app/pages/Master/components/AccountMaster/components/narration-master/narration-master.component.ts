import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, } from '@angular/forms';
import { acc_narration } from '../../../../../../Models/Account-Master-Model/acc_narration';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

  @Component({
    selector: 'app-narration-master',
    templateUrl: './narration-master.component.html',
    styleUrls: ['./narration-master.component.scss']
  })

  export class NarrationMasterComponent implements OnInit 
  {
    submitted = false;
    model: acc_narration = new acc_narration();
    public userForm:FormGroup;
    listacc_narration: acc_narration[];
    bUnitCodes:{};
    company_name:any;
    isHidden=false;
    status = false;
  
    constructor(public fb:FormBuilder, private Service: Master,
      private DropDownListService: DropdownServiceService) 
    { 
      this.userForm=fb.group({
        narration_code: [''],
        narration_name: [''],
        narration_active: [''],
        description_head: [''],
        narration_line1: [''],
        narration_line2: [''],
        narration_line3: [''],
        narration_line4: [''],
        narration_line5: [''],
        businessunit_code: [''],
        businessunit_name: [''],
        company_id: [''],
        fin_year: [''],
        username: ['']});
    }

    get narration_code(){ return this.userForm.get("narration_code") as FormControl }
    get narration_name(){ return this.userForm.get("narration_name") as FormControl }
    get narration_active(){ return this.userForm.get("narration_active") as FormControl }
    get description_head(){ return this.userForm.get("description_head") as FormControl }
    get narration_line1(){ return this.userForm.get("narration_line1") as FormControl }
    get narration_line2(){ return this.userForm.get("narration_line2") as FormControl }
    get narration_line3(){ return this.userForm.get("narration_line3") as FormControl }
    get narration_line4(){ return this.userForm.get("narration_line4") as FormControl }
    get narration_line5(){ return this.userForm.get("narration_line5") as FormControl }
    get businessunit_code(){ return this.userForm.get("businessunit_code") as FormControl }
    get businessunit_name(){ return this.userForm.get("businessunit_name") as FormControl }

    ngOnInit() 
    {
      this.company_name = sessionStorage.getItem("company_name");
      this.Service.getAccNarrations().subscribe(data=>{this.listacc_narration  = data;});
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
        this.Service.createAccNarration(this.userForm.getRawValue()).subscribe(data => 
        {
          console.log(this.userForm.value);
          alert("New Account Narration created successfully.");
          //window.location.reload();
          this.userForm.reset();
           this.status = true;
          //refresh List;
          this.Service.getAccNarrations().subscribe(data=>{this.listacc_narration  = data;});
          this.DropDownListService.bUnitList(this.company_name).subscribe(data=>{this.bUnitCodes = data;});                
        });
      }
    }
  
  }
