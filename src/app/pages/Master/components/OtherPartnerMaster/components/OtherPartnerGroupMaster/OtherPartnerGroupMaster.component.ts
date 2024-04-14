import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import { Otherpartner_group } from '../../../../../../Models/OtherPartnerMaster/OtherpartnerGroup';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

  @Component({
    selector: 'app-itemcategorymaster',
    templateUrl: './OtherPartnerGroupMaster.component.html',
    styleUrls: ['./OtherPartnerGroupMaster.component.scss']
  })

  export class OtherPartnerGroupMasterComponent implements OnInit 
  {
    submitted = false;
    public userForm:FormGroup;
    model:Otherpartner_group=new Otherpartner_group();
    listOtherpartner_group: Otherpartner_group[];
    subGroupNames:{};
    isHidden=false;
    status = false;
    otherpartnersave:boolean=true;
  
    constructor(public fb:FormBuilder, private Service: Master,
      private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group({
        op_code: [''],
        op_type: [''],
        op_grp_name: [''],
        op_active: [''],
        control_acc: [''],
        company_id: [''],
        fin_year: [''],
        username:['']});
    }

    get op_code(){ return this.userForm.get("op_code") as FormControl }
    get op_type(){ return this.userForm.get("op_type") as FormControl }
    get op_grp_name(){ return this.userForm.get("op_grp_name") as FormControl }
    get op_active(){ return this.userForm.get("op_active") as FormControl }
    get control_acc(){ return this.userForm.get("control_acc") as FormControl }

    ngOnInit() 
    {
      //For User Role
      let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
      this.otherpartnersave=false;
      if(accessdata.includes('other_partner_group.save'))
      {
       this.otherpartnersave = true;
      }
      

      this.Service.getOtherPartnerGroup().subscribe(data=>{this.listOtherpartner_group  = data;});
      this.DropDownListService.controlAccList().subscribe(data=>{this.subGroupNames  = data;});
      this.status = true;
    }

    showList(s:string)
    {
      if(this.otherpartnersave == true )//true exist  false not exist 
      {
        if(s=="add")
        {this.isHidden=true;}
      }
     
      if(s=="list")
      {this.isHidden=false;}
    }

    send()
    {
      this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
        fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
      this.submitted = true;
      if(!this.userForm.valid) 
      {
        alert('Please fill all fields!')
        return false;
      } 
      else 
      {
        this.status = false;
        if(this.userForm.get("op_type").value == '' || this.userForm.get("op_type").value == null || this.userForm.get("op_type").value == 0)
        {
          alert("Please Select Other Partner Type");
          this.status=true;
        }
        else if(this.userForm.get("op_grp_name").value == '' || this.userForm.get("op_grp_name").value == null || this.userForm.get("op_grp_name").value == 0)
        {
          alert("Please Enter Group Name");
          this.status=true;
        }
        else
        {
          this.Service.createOtherPartnerGroup(this.userForm.getRawValue()).subscribe(data=> 
            {
              console.log(this.userForm.value);
              alert("New OtherPartnerGroup created successfully.");
              this.userForm.reset();
              //refresh List;
              this.ngOnInit();                   
            });
        }
          
      }
    }

  }
