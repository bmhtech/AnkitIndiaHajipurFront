import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl,FormArray } from '@angular/forms';
import { Acc_pay_term } from '../../../../../../Models/OtherMaster/Acc_pay_term';
import { Master } from '../../../../../../service/master.service';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
  @Component({
    selector: 'app-payment-term-master',
    templateUrl: './payment-term-master.component.html',
    styleUrls: ['./payment-term-master.component.scss']
  })

  export class PaymentTermMasterComponent implements OnInit 
  {
    submitted = false;
    public userForm:FormGroup;
    model: Acc_pay_term = new Acc_pay_term();
    listAcc_pay_term: Acc_pay_term[];
    isHidden=false;
    Id:any;
    InstList:{};
    status = false;
    paytermsave:boolean=true;
    paytermupdate:boolean=true;
    paytermdelete:boolean=true;
    paytermview:boolean=true;

    constructor(public fb:FormBuilder,private Service: Master, private DropDownListService: DropdownServiceService) 
    { 
      this.userForm=fb.group({ 
        id:[''],
        payterm_desc: [''],
        ins_type: [''],    
        ins_period: [''],
        payterm_active: ['1'],
        payterm_id:[''],
        company_id: [''],
        fin_year: [''],
        username: [''],
    
        acc_pay_term_master_details: this.fb.array([this.fb.group({
          inst_no:'',
          inst_days:'',
          inst_percent:''})])
      });
    }

    get id(){ return this.userForm.get("id") as FormControl }
    get payterm_desc(){ return this.userForm.get("payterm_desc") as FormControl }
    get ins_type(){ return this.userForm.get("ins_type") as FormControl }
    get ins_period(){ return this.userForm.get("ins_period") as FormControl }
    get payterm_active(){ return this.userForm.get("payterm_active") as FormControl }
    get payterm_id(){ return this.userForm.get("payterm_id") as FormControl }
    get acc_pay_term_master_details() { return this.userForm.get('acc_pay_term_master_details') as FormArray; }

    ngOnInit()
    {  
      //For User Role
     let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
     this.paytermsave=false;
     this.paytermupdate=false;
     this.paytermdelete=false;
     this.paytermview = false;

     if(accessdata.includes('payment_term_master.save'))
     {
      this.paytermsave = true;
     }
     if(accessdata.includes('payment_term_master.update'))
     {
      this.paytermupdate = true;
     }
     if(accessdata.includes('payment_term_master.delete'))
     {
      this.paytermdelete = true;
     }
     if(accessdata.includes('payment_term_master.view'))
     {
      this.paytermview = true;
     }
     
    
     
      this.Service.getAccPayTerms().subscribe(data=>{this.listAcc_pay_term  = data;});
      this.InstList = ["Days", "Month","Year"]; 
      this.status = true;
    }

    showList(s:string)
    {
      if(this.paytermsave == true  && this.paytermupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.reset(this.ResetAllValues().value);
        } 
      }
      if(this.paytermsave == true  && this.paytermupdate == false)
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.reset(this.ResetAllValues().value);
        }  
      }
     
      if(s=="list")
      {
        this.isHidden=false;
        this.paytermsave=true;
        this.userForm.reset(this.ResetAllValues().value);
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id:[''],
        payterm_desc: [''],
        ins_type: [''],    
        ins_period: [''],
        payterm_active: ['1'],
        payterm_id:[''],
        company_id: [''],
        fin_year: [''],
        username: [''],
    
        acc_pay_term_master_details: this.fb.array([this.fb.group({
          inst_no:'',
          inst_days:'',
          inst_percent:''})])
      });
    }

    add() 
    {
      this.acc_pay_term_master_details.push(this.fb.group({
        inst_no:'',
        inst_days:'',
        inst_percent:''}));
    }

    delete(index) 
    {
      if(index)
      {this.acc_pay_term_master_details.removeAt(index);}
      else
      {alert("can't delete all rows");} 
    }

    search(event)
    {
      let serchText = event.target.value;
      if(event.key == "Enter")
      {
        this.status = false;
        if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
        {
          this.DropDownListService.findAccPayTerm('0').subscribe(data=>
          {
            this.listAcc_pay_term = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findAccPayTerm(serchText).subscribe(data=>
          {
            this.listAcc_pay_term = data;
            this.status = true;
          });  
          this.status = true;   
        }
      }
    }
  
    onDelete(id:any,payterm_id)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Payment term ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.DropDownListService.checkPayTermUsage(payterm_id).subscribe(checkPayterm=> 
          {
           // alert("bidhan here::"+checkPayterm.status);
            if(checkPayterm.status=='No')
            {
              this.Service.deleteAccPayTerm(this.userForm.getRawValue(),id).subscribe(data=> 
                {
                  //console.log("Cat id:"+data.payterm_desc);
          
                  if(data.payterm_desc=='' || data.payterm_desc==null)
                  {
                    alert("Opps!!! Can't delete this Payment Term !!!");
                  }else{
                    alert("Payment Term deleted successfully.");
                  }
                  this.status = true;
                  this.ngOnInit()
                }); 
            }
            else
            {
              alert("This Payment Term is Already Used,Can not be Deleted!! ");
            }
          });
      }  
      this.status = true;
    }

    onUpdate(id:any, payterm_id:string,action)
    {
      if(action == 'update')
      {
        this.paytermsave=true;
      }
      else
      {
        this.paytermsave=false;
      }
     
      this.userForm.patchValue({id: id});
      this.isHidden = true;
      this.status = false;
    
      forkJoin(
        this.Service.retriveAccPayTerms(id),
        this.Service.accPayTermsRetriveList(payterm_id)
      ).subscribe(([PaytermData, PaytermRetriveList])=>
        {
          this.userForm.patchValue(PaytermData);
          console.log("PaytermData: "+JSON.stringify(PaytermData));       
 
        while (this.acc_pay_term_master_details.length ) 
        {this.acc_pay_term_master_details.removeAt(0);}
        for(let i=0;i<PaytermRetriveList.length;i++)
        {this.add();}
        this.acc_pay_term_master_details.patchValue(PaytermRetriveList);
        this.status = true;
      });
     }

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
        if(this.userForm.get("payterm_desc").value == '' || this.userForm.get("payterm_desc").value == null || this.userForm.get("payterm_desc").value == 0)
        {
          alert("Please Enter Description");
          this.status=true;
        }
        else if(this.userForm.get("ins_type").value == '' || this.userForm.get("ins_type").value == null || this.userForm.get("ins_type").value == 0)
        {
          alert("Please Select Installment Type");
          this.status=true;
        }
        else if(this.userForm.get("ins_period").value == '' || this.userForm.get("ins_period").value == null || this.userForm.get("ins_period").value == 0)
        {
          alert("Please Enter Period of Installment");
          this.status=true;
        }
        else
        {
            if(this.Id>0)
            {
              this.status = false;
              this.Service.updateAccPayTerms(this.userForm.getRawValue(), this.Id).subscribe(data => 
              {
               // console.log(this.userForm.value);
                alert("Acc_PayTerms Updated successfully.");
                this.userForm.reset();
                //refresh List;
                this.ngOnInit();   
                this.isHidden = false;          
              });
            }
            else
              {
                this.status = false;
                this.Service.createAccPayTerm(this.userForm.getRawValue()).subscribe(data => 
                {
                // console.log(this.userForm.value);
                  alert("New Acc_PayTerms created successfully.");
                  this.userForm.reset();
                  //refresh List;
                  this.ngOnInit();   
                  this.isHidden = false;          
                });
              }
          }
        
        }
    }

  }
