import { Component, OnInit } from '@angular/core';
import { Department1 } from '../../../../../../Models/InventoryModel/department1';
import { FormGroup,FormBuilder, FormControl } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

  @Component({
    selector: 'app-department',
    templateUrl: './department.component.html',
    styleUrls: ['./department.component.scss']
  })

  export class DepartmentComponent implements OnInit 
  {
    submitted= false;
    bUnitCodes:{};
    Id: any;
    company_name:any;
    public userForm: FormGroup;
    model:Department1=new Department1();
    listDepartment1:Department1[];
    isHidden=false;
    status = false;
    departmentmastersave:boolean = true;
    departmentmasterupdate:boolean = true;
    departmentmasterdelete:boolean = true;
    departmentmasterview:boolean = true;

    constructor(private Service:Master, public fb:FormBuilder,
      private DropDownListService:DropdownServiceService)
    {
      this.userForm=fb.group({
        id: [''],  
        department_name: [''],
        department_active: [''],
        department_remarks: [''],
        businessunit_code: [''],
        businessunit_name: [''],
        company_id: [''],
        fin_year: [''],
        username: ['']});
    }
    get id(){ return this.userForm.get("id") as FormControl }
    get department_name(){ return this.userForm.get("department_name") as FormControl }
    get department_active(){ return this.userForm.get("department_active") as FormControl }
    get department_remarks(){ return this.userForm.get("department_remarks") as FormControl }
    get businessunit_code(){ return this.userForm.get("businessunit_code") as FormControl }
    get businessunit_name(){ return this.userForm.get("businessunit_name") as FormControl }

    ngOnInit() 
    {
      //For User Role
      let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));

     this.departmentmastersave=false;
     this.departmentmasterupdate=false;
     this.departmentmasterdelete=false;
     this.departmentmasterview=false;

        if(accessdata.includes('department_master.save'))
           {
            this.departmentmastersave = true;
           }
          if(accessdata.includes('department_master.update'))
           { 
             this.departmentmasterupdate=true;
           }
           if(accessdata.includes('department_master.delete'))
           {
             this.departmentmasterdelete=true;
           }
           if(accessdata.includes('department_master.view'))
           {
             this.departmentmasterview=true;
           }
     
     
      this.company_name = localStorage.getItem("company_name");
      this.Service.getDepartments().subscribe(data=>{this.listDepartment1  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.DropDownListService.bUnitList(this.company_name).subscribe(data=>{this.bUnitCodes = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.status = true;   
    }
  
    showList(s:string)
    {
      if(this.departmentmastersave == true  && this.departmentmasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.reset(this.ResetAllValues().value);
        }
      }
      if(this.departmentmastersave == true  && this.departmentmasterupdate == false)
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
        this.departmentmastersave = true;
        this.userForm.reset(this.ResetAllValues().value);
      }
    }

    ResetAllValues()
  {
    return this.userForm=this.fb.group({
      id: [''],  
      department_name: [''],
      department_active: [''],
      department_remarks: [''],
      businessunit_code: [''],
      businessunit_name: [''],
      company_id: [''],
      fin_year: [''],
      username: ['']});
  }

    onchangeBUnitName(businessunit_code:String)
    {
      if(businessunit_code != "0")
      {
        this.status = false;
        this.DropDownListService.nameListByBUnitCode(businessunit_code).subscribe(data=>
        {
          this.userForm.patchValue({businessunit_name:data.businessunit_name});
          this.status =true;
        });  
      }
    }

    onUpdate(id:any,action)
    {
      if(action == 'update')
      {
        this.departmentmastersave=true;
      }
      else
      {
        this.departmentmastersave=false;
      }
      //tuhin here // this.departmentmastersave=true;
      this.isHidden = true;
      this.status = false;
      this.Service.retriveDepartment(id).subscribe(data=>
      { 
        this.userForm.patchValue(data); 
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
    }

    search(event)
    {
      let serchText = event.target.value;
      if(event.key == "Enter")
      {
        this.status = false;
        if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
        {
          this.DropDownListService.findDepartment('0').subscribe(data=>
          {
            this.listDepartment1 = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findDepartment(serchText).subscribe(data=>
          {
            this.listDepartment1 = data;
            this.status = true;
          });     
        }
      }
    }
  
    onDelete(id:any,department_code)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Department ?"))
      {
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.DropDownListService.checkMisleniousDeletation(department_code,"departmentMaster").subscribe(checkBUData=> 
          {
          //alert("check::"+checkBUData.status)
           if(checkBUData.status=='No')
           {
            this.Service.deleteDepartment(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                console.log("Cat department_name:"+data.department_name);
        
                if(data.department_name=='' || data.department_name==null)
                {
                  alert("Opps!!! Can't delete this Department !!!");
                }else{
                  alert("Department deleted successfully.");
                }
                this.status = true;
                this.ngOnInit()
              });
           }
           else{
            alert("This Department is Already Used,Can not be Deleted!! ");
           }
          });
         
      }  
      this.status = true;
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
        this.status = false;
        if(this.userForm.get("department_name").value == '' || this.userForm.get("department_name").value == 0 || this.userForm.get("department_name").value == null)
        {
          alert("Please Enter Department Name");
          this.status=true;
        }
        else if(this.userForm.get("businessunit_code").value == '' || this.userForm.get("businessunit_code").value == null || this.userForm.get("businessunit_code").value == 0)
        {
          alert("Please Select Business Unit Name");
          this.status=true;
        }
        else
        {
          if(this.Id>0)
          {
            this.Service.updateDepartment(this.userForm.getRawValue(), this.Id).subscribe(data => 
            {
              console.log(this.userForm.getRawValue());
              alert("Department master Updated successfully.");
              this.userForm.reset();
              //Refresh List
               this.ngOnInit();  
               this.isHidden = false;                   
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});
            
          }
        
          else
          {
              this.Service.createDepartment(this.userForm.getRawValue()).subscribe(data => 
              {
                JSON.stringify(console.log(this.userForm.getRawValue()));
                alert("New Department master created successfully.");
                this.userForm.reset();
                //Refresh List
                 this.ngOnInit();  
                 this.isHidden = false;                   
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
              this.ngOnInit()}); 
            }
        }
        
            
        } 
     }
   }

