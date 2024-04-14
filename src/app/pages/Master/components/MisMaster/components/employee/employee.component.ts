import { Component, OnInit } from '@angular/core';
import { employee_master_list } from '../../../../../../models/InventoryModel/employee';
import { Master } from '../../../../../../service/master.service';
import { FormGroup, FormBuilder,FormControl, FormArray } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit 
 {
  submitted = false;
  public userForm:FormGroup;
  model: employee_master_list = new employee_master_list();
  listemployee_master_list : employee_master_list[];
  countries:any = [];
  countryName: any;
  Id: any;
  stateName: any;
  citiNames:{};
  states:any = [];
  RolesList:any = [];
  Deptnames:{};
  status = false;
  isHidden = false;
 
  constructor(private Service: Master, public fb:FormBuilder,
    private DropDownListService: DropdownServiceService) 
   {
    this.userForm=fb.group({ 
      id: [''],      
      emp_code: [''],
      emp_name: [''],
      country_id: [''],     
      state_id: [''],
      emp_username:[''],
      password:[''],
      city_id: [''],
      address: [''],        
      dept_id: [''],
      email_id: [''],
      mobile_no: [''],
      pan_no: [''],
      aadhaar_no: [''], 
      uan_no:[''],
      // employee_category:[''],
      // employee_grade:[''],
      company_id: [''],
      fin_year: [''],
      username: [''],

      role: this.fb.array([this.fb.group({
        user_role_id :''})]),

    });

   }
   get id(){ return this.userForm.get("id") as FormControl }
   get emp_code(){ return this.userForm.get("emp_code") as FormControl }
   get emp_username(){ return this.userForm.get("emp_username") as FormControl }
   get password(){ return this.userForm.get("password") as FormControl }
   get emp_name(){ return this.userForm.get("emp_name") as FormControl }
   get country_id(){ return this.userForm.get("country_id") as FormControl }  
   get state_id(){ return this.userForm.get("state_id") as FormControl }
   get city_id(){ return this.userForm.get("city_id") as FormControl }
   get address(){ return this.userForm.get("address") as FormControl }
   get dept_id(){ return this.userForm.get("dept_id") as FormControl }
   get email_id(){ return this.userForm.get("email_id") as FormControl }
   get mobile_no(){ return this.userForm.get("mobile_no") as FormControl }
   get pan_no(){ return this.userForm.get("pan_no") as FormControl }
   get uan_no(){ return this.userForm.get("uan_no") as FormControl }
   get aadhaar_no(){ return this.userForm.get("aadhaar_no") as FormControl }
  // get employee_category(){ return this.userForm.get("employee_category") as FormControl }
   get employee_grade(){ return this.userForm.get("employee_grade") as FormControl } 
   get role() { return this.userForm.get('role') as FormArray; }
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
      id: [''],      
      emp_code: [''],
      emp_name: [''],
      country_id: [''],     
      state_id: [''],
      emp_username:[''],
      password:[''],
      city_id: [''],
      address: [''],        
      dept_id: [''],
      email_id: [''],
      mobile_no: [''],
      pan_no: [''],
      aadhaar_no: [''], 
      uan_no:[''],
      //employee_category:[''],
      //employee_grade:[''],
      company_id: [''],
      fin_year: [''],
      username: [''],

      role: this.fb.array([this.fb.group({
        user_role_id :''})]),

    });

  }

   onChangeCountry(country_id: String)
   {
     this.states = [];
     if(country_id != "0")
     {
       this.status= false;
       this.DropDownListService.stateListByCountry(country_id).subscribe(data=>
       {
         this.states  = data;
         this.status = true;
       });
     }
   }

   onChangeState(state_id:String)
   {
     if(state_id != "0")
     {
       this.status = false;            
       this.status = true;;
     }
   }

  ngOnInit()
   {
    this.Service.getEmployees().subscribe(data=>{this.listemployee_master_list  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
    this.DropDownListService.deptNamesList().subscribe(data=>{this.Deptnames  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
    this.DropDownListService.countryList().subscribe(data=>{this.countries  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
    this.DropDownListService.citiNamesList().subscribe(data=>{this.citiNames = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});

    this.DropDownListService.getroles().subscribe(data=>{this.RolesList  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));});
    this.status = true;  
   }
   deleteRole(index) 
   {
     if (index) 
     {this.role.removeAt(index);}
     else 
     {alert("can't delete all rows");}
   }

   addRole() 
   {
     this.role.push(this.fb.group({
      user_role_id: ''}));
   }
   onUpdate(id:any)
   {
     this.isHidden = true;
     this.status = false;
     this.Service.retriveEmployee(id).subscribe(data=>
     {
       this.countryName = data["country_id"];
       this.stateName = data["state_id"];
       this.onChangeCountry(this.countryName); 
       this.onChangeState(this.stateName); 
       this.userForm.patchValue(data); 
       this.status = true;
     }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
     this.ngOnInit()});
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
        if(this.Id>0)
          {
            this.status = false;
            this.Service.updateEmployee(this.userForm.getRawValue(), this.Id).subscribe(data => 
            {
             console.log(this.userForm.value);
             alert("Employee Master Updated successfully.");
             this.userForm.reset();
             //refresh List;
             this.ngOnInit();
             this.isHidden=false;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});
          }  

          else
            {
              this.status = false;
              this.Service.createEmployee(this.userForm.getRawValue()).subscribe(data => 
              {
               console.log(this.userForm.value);
               alert("New Employee Master created successfully.");
               this.userForm.reset();
               //refresh List;
               this.ngOnInit();
               this.isHidden=false;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
              this.ngOnInit()});
            }
      }
   } 
   

 }
