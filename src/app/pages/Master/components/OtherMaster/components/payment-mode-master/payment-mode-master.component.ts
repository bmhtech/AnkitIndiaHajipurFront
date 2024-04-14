import { Component, OnInit } from '@angular/core';
import { FormControl,FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Acc_pay_mode } from '../../../../../../Models/OtherMaster/Acc_pay_mode';
import { Master } from '../../../../../../service/master.service';

  @Component({
    selector: 'app-payment-mode-master',
    templateUrl: './payment-mode-master.component.html',
    styleUrls: ['./payment-mode-master.component.scss']
  })

  export class PaymentModeMasterComponent implements OnInit 
  {
    submitted = false;
    public userForm:FormGroup;
    Acc_pay_mode: Acc_pay_mode = new Acc_pay_mode();
    listAcc_pay_mode: Acc_pay_mode[];
    isHidden=false;
    status = false;

    constructor(public fb:FormBuilder,private Service: Master) 
    {
      this.userForm=fb.group({ 
        id:[''],
        paymode_code: [''],
        paymode_name: [''],
        paymode_active: [''],
        buint_code: [''],
        bunit_name: [''],
        company_id: [''],
        fin_year: [''],
        username:['']});
    }

    get id(){ return this.userForm.get("id") as FormControl }
    get paymode_code(){ return this.userForm.get("paymode_code") as FormControl }
    get paymode_name(){ return this.userForm.get("paymode_name") as FormControl }
    get paymode_active(){ return this.userForm.get("paymode_active") as FormControl }
    get buint_code(){ return this.userForm.get("buint_code") as FormControl }
    get bunit_name(){ return this.userForm.get("bunit_name") as FormControl }

    ngOnInit()
    {
      this.Service.getAccPayModes().subscribe(data=>{this.listAcc_pay_mode  = data;});
      this.status = true;
    }

    showList(s:string)
    {
      if(s=="add")
      {
        this.isHidden=true;
        this.userForm.reset(this.ResetAllValues().value);
      }
      if(s=="list")
      {
        this.isHidden=false;
        this.userForm.reset(this.ResetAllValues().value);
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id:[''],
        paymode_code: [''],
        paymode_name: [''],
        paymode_active: [''],
        buint_code: [''],
        bunit_name: [''],
        company_id: [''],
        fin_year: [''],
        username: [''],});
    }

    onUpdate(id:any)
    {
      this.isHidden = true;
      this.status = false;
      this.Service.retriveAccPayModes(id).subscribe(data=>
      {
        this.userForm.patchValue(data); 
        this.status = true;
      });
    }
 
    Id:any;
    send()
    {
      this.Id= this.userForm.get("id").value as FormControl; 
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
        if(this.Id>0)
          {
            this.status = false;
            this.Service.updateAccPayMode(this.userForm.getRawValue(), this.Id).subscribe(data => 
            {
              console.log(this.userForm.value);
              alert("AccPayMode Updated successfully.");
              this.userForm.reset();
              //refresh List;
              this.ngOnInit();  
              this.isHidden = false;       
            });  
          }
          else
            {
              this.status = false;
              this.Service.createAccPayMode(this.userForm.getRawValue()).subscribe(data => 
              {
                console.log(this.userForm.value);
                alert("New AccPayMode created successfully.");
                this.userForm.reset();
                //refresh List;
                this.ngOnInit();  
                this.isHidden = false;       
              });  
            }
       }
    }

  }
