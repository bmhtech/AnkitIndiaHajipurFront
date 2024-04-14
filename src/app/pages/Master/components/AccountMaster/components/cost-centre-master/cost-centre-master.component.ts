import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { acc_cost_centre } from '../../../../../../Models/Account-Master-Model/acc_cost_centre';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

  @Component({
    selector: 'app-cost-centre-master',
    templateUrl: './cost-centre-master.component.html',
    styleUrls: ['./cost-centre-master.component.scss']
  })

  export class CostCentreMasterComponent implements OnInit 
  {
    model: acc_cost_centre = new acc_cost_centre();
    submitted = false;
    public userForm:FormGroup;
    listacc_cost_centre: acc_cost_centre[];
    bUnitCodes:{};
    userCostCenters:{};
    costCatagoryCodes:{};
    company_name:any;
    transactiontypeList:{};
    isHidden=false;
    status = false;

    constructor(public fb:FormBuilder, private Service: Master,
      private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group({  
        costcentre_code: [''],
        costcentre_name: [''],
        costcentre_active: [''],
        costcat_code: [''],
        costcat_name: [''],     
        under_costcentre: [''],
        job_cost: [''],
        pro_bank_dts: [''],
        businessunit_name: [''],
        businessunit_code: [''],
        transaction_type: [''],
        acc_number: [''],
        ifsc_code: [''],
        bank_name: [''],
        company_id: [''],
        fin_year: [''],
        username: ['']});
    }

    get costcentre_code(){ return this.userForm.get("costcentre_code") as FormControl }
    get costcentre_name(){ return this.userForm.get("costcentre_name") as FormControl }
    get costcentre_active(){ return this.userForm.get("costcentre_active") as FormControl }
    get costcat_code(){ return this.userForm.get("costcat_code") as FormControl }
    get costcat_name(){ return this.userForm.get("costcat_name") as FormControl }
    get under_costcentre(){ return this.userForm.get("under_costcentre") as FormControl }
    get job_cost(){ return this.userForm.get("job_cost") as FormControl }
    get pro_bank_dts(){ return this.userForm.get("pro_bank_dts") as FormControl }
    get businessunit_code(){ return this.userForm.get("businessunit_code") as FormControl }
    get businessunit_name(){ return this.userForm.get("businessunit_name") as FormControl }
    get transaction_type(){ return this.userForm.get("transaction_type") as FormControl }
    get acc_number(){ return this.userForm.get("acc_number") as FormControl }
    get ifsc_code(){ return this.userForm.get("ifsc_code") as FormControl }
    get bank_name(){ return this.userForm.get("bank_name") as FormControl }

    ngOnInit() 
    {
      this.company_name = sessionStorage.getItem("company_name");
      this.Service.getAccCostCentres().subscribe(data=>{this.listacc_cost_centre  = data;});
      this.DropDownListService.bUnitList(this.company_name).subscribe(data=>{this.bUnitCodes = data;});
      this.DropDownListService.userCostCenterList().subscribe(data=>{this.userCostCenters = data;});
      this.DropDownListService.costCatagoryCodeList().subscribe(data=>{this.costCatagoryCodes = data;});
      this.transactiontypeList=["Cheque","Efund Transfer","Others"];
      this.status = true;
    }

    onchangeBUnitName(businessunit_code: String)
    {
      if(businessunit_code)
      {
        this.status = false;;
        this.DropDownListService.nameListByBUnitCode(businessunit_code).subscribe(data=>
        {
          this.userForm.patchValue(data);
          this.status = true;
        });     
      }
    }

    onchangeCostCatagoryName(costcat_code: String)
    {
      if(costcat_code)
      {
        this.status = false;
        this.DropDownListService.nameListByCostCatagoryCode(costcat_code).subscribe(data=>
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
        this.Service.createAccCostCentre(this.userForm.getRawValue()).subscribe(data => 
        {
          console.log(this.userForm.value);
          alert("New AccCostCentre created successfully.");
          //window.location.reload();
          this.userForm.reset();
          this.status = true;
          //refresh List;
          this.Service.getAccCostCentres().subscribe(data=>{this.listacc_cost_centre  = data;});
          this.DropDownListService.bUnitList(this.company_name).subscribe(data=>{this.bUnitCodes = data;});
          this.DropDownListService.userCostCenterList().subscribe(data=>{this.userCostCenters = data;});
          this.DropDownListService.costCatagoryCodeList().subscribe(data=>{this.costCatagoryCodes = data;});
          this.transactiontypeList=["Cheque","Efund Transfer","Others"];
        });
      }
    }

  }
