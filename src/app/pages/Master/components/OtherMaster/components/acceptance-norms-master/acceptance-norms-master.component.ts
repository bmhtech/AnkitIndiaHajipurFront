import { Component, OnInit,} from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { Acc_acceptance_norms } from '../../../../../../Models/OtherMaster/Acc_acceptance_norms';
import { Master } from '../../../../../../service/master.service';
import { forkJoin } from 'rxjs';

  @Component({
    selector: 'app-acceptance-norms-master',
    templateUrl: './acceptance-norms-master.component.html',
    styleUrls: ['./acceptance-norms-master.component.scss']
  })

  export class AcceptanceNormsMasterComponent implements OnInit 
  {
    submitted = false;
    public userForm:FormGroup;
    model: Acc_acceptance_norms = new Acc_acceptance_norms();
    listAcc_acceptance_norms: Acc_acceptance_norms[];
    isHidden=false;
    
    status = false;

    constructor(public fb:FormBuilder,private Service: Master) 
    { 
      this.userForm=fb.group({
        id:[''],
        anm_id:[''],
        anm_code: [''],
        anm_description: [''],
        anm_remarks: [''],
        anm_active: [''],
        businessunit_code:[''],
        businessunit_name:[''] ,
        company_id: [''],
        fin_year: [''],
        username: [''],

        acc_acceptance_norms_master_dts: this.fb.array([this.fb.group({
          anm_parameter:'',
          calculation_basis:'',
          basis_amt_uom:'',
          anm_min:'',
          anm_max:''})])
      });
    }

    get id(){ return this.userForm.get("id") as FormControl }
    get anm_id(){ return this.userForm.get("anm_id") as FormControl }
    get anm_code(){ return this.userForm.get("anm_code") as FormControl }
    get anm_description(){ return this.userForm.get("anm_description") as FormControl }
    get anm_remarks(){ return this.userForm.get("anm_remarks") as FormControl }
    get anm_active(){ return this.userForm.get("anm_active") as FormControl }
    get businessunit_code(){ return this.userForm.get("businessunit_code") as FormControl }
    get businessunit_name(){ return this.userForm.get("businessunit_name") as FormControl }
    get acc_acceptance_norms_master_dts(){return this.userForm.get('acc_acceptance_norms_master_dts') as FormArray;}
  
    ngOnInit() 
    {
      this.Service.getAccAcceptanceNorms().subscribe(data=>
      {
        this.listAcc_acceptance_norms  = data; 
        this.status = true;
      }); 
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
        anm_id:[''],
        anm_code: [''],
        anm_description: [''],
        anm_remarks: [''],
        anm_active: [''],
        businessunit_code:[''],
        businessunit_name:[''] ,
        company_id: [''],
        fin_year: [''],
        username: [''],

        acc_acceptance_norms_master_dts: this.fb.array([this.fb.group({
          anm_parameter:'',
          calculation_basis:'',
          basis_amt_uom:'',
          anm_min:'',
          anm_max:''})])
      });
    }
   
    add() 
    {
      this.acc_acceptance_norms_master_dts.push(this.fb.group({
        anm_parameter:'',
        calculation_basis:'',
        basis_amt_uom:'',
        anm_min:'',
        anm_max:''}));
    }

    delete(index) 
    {
      if(index)
      {this.acc_acceptance_norms_master_dts.removeAt(index);}
      else
      {alert("can't delete all rows");} 
    }

    onUpdate(id:any, anm_id:string)
    {
      this.userForm.patchValue({id: id});
      this.isHidden = true;
      this.status = false;
    
      forkJoin(
        this.Service.retriveAccAcceptanceNorms(id),
        this.Service.accAcceptanceNormsRetriveList(anm_id)
      ).subscribe(([AccAcceptanceNormsData, AcceptanceNormsRetriveList])=>
        {
          this.userForm.patchValue(AccAcceptanceNormsData);
          console.log("AccAcceptanceNormsData: "+JSON.stringify(AccAcceptanceNormsData));       
 
        while (this.acc_acceptance_norms_master_dts.length ) 
        {this.acc_acceptance_norms_master_dts.removeAt(0);}
        for(let i=0;i<AcceptanceNormsRetriveList.length;i++)
        {this.add();}
        this.acc_acceptance_norms_master_dts.patchValue(AcceptanceNormsRetriveList);
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
            this.Service.updateAccAcceptanceNorms(this.userForm.getRawValue(), this.Id).subscribe(data => 
            {
              console.log(this.userForm.value);
              alert("Acc_acceptance_norms Updated successfully.");
              this.userForm.reset();
              //refresh List;
              this.ngOnInit();
              this.isHidden = false;
    
              //Refresh Dynemic table
              while(this.acc_acceptance_norms_master_dts.length)
              this.acc_acceptance_norms_master_dts.removeAt(0);
              this.add();
            }); 
          } 
          
          else
            {
              this.status = false;
              this.Service.createAccAcceptanceNorms(this.userForm.getRawValue()).subscribe(data => 
              {
                console.log(this.userForm.value);
                alert("New Acc_acceptance_norms created successfully.");
                this.userForm.reset();
                //refresh List;
                this.ngOnInit();
                this.isHidden = false;
      
                //Refresh Dynemic table
                while(this.acc_acceptance_norms_master_dts.length)
                this.acc_acceptance_norms_master_dts.removeAt(0);
                this.add();
              }); 
            }
      }
    }

  }
