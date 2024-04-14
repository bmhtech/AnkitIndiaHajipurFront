import { Component, OnInit } from '@angular/core';
import { employee_master_list } from '../../../../../../Models/InventoryModel/employee';
import { Master } from '../../../../../../service/master.service';
import { FormGroup, FormBuilder,FormControl, FormArray } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit 
{

  submitted = false;
  public userForm:FormGroup;
  model: employee_master_list = new employee_master_list();
  listemployee_master_list:any=[];
  countries:any = [];
  countryName: any;
  Id: any;
  stateName: any;
  citiNames:{};
  states:any = [];
  RolesList:any = [];
  Dept_Id="0";
  City_Id="0";
  State_Id="0";
  Country_Id="0";
  Deptnames:{};
  status = false;
  isHidden = false;
  Concat_multi:any;
  dropdownSettings: any = {};
  ShowFilter = false;
  concat_json:string;
  dynamicList: any = [];
  userrole_acess:boolean=false;
  empsave:boolean=true;
  usernamelock:boolean=false;
  user_role:any;
  user_name:any;

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
      concat_multi: [''],
      preference: [''],
      // pan_no: [''],
      // aadhaar_no: [''], 
      // uan_no:[''],
      // employee_category:[''],
      // employee_grade:[''],
      company_id: [''],
      fin_year: [''],
      username: [''],
      user_role_id:[''],

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
   get concat_multi(){ return this.userForm.get("concat_multi") as FormControl }
   get preference(){ return this.userForm.get("preference") as FormControl }
   get user_role_id(){ return this.userForm.get("user_role_id") as FormControl }
  //  get pan_no(){ return this.userForm.get("pan_no") as FormControl }
  //  get uan_no(){ return this.userForm.get("uan_no") as FormControl }
  //  get aadhaar_no(){ return this.userForm.get("aadhaar_no") as FormControl }
  // // get employee_category(){ return this.userForm.get("employee_category") as FormControl }
  //  get employee_grade(){ return this.userForm.get("employee_grade") as FormControl } 
   get role() { return this.userForm.get('role') as FormArray; }
  
   showList(s:string)
    {
      if(s=="add")
      {
        //this.userForm.patchValue({dept_id:this.Dept_Id});
        this.isHidden=true;
        this.userrole_acess=false;
        this.empsave=true;
        this.userForm.reset(this.ResetAllValues().value);
        this.userForm.patchValue({dept_id:"0"});
        this.role.at(0).patchValue({user_role_id:"0"});
      }
      if(s=="list")
      {
        this.isHidden=false;
        this.userForm.reset(this.ResetAllValues().value);
        this.DropDownListService.getEmployeeSequenceId("prefix="+"EMP"+"&company="+this.company_name).subscribe(data=>{this.seq_no = data.sequenceid;});
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
      concat_multi: [''],
      preference: [''],
      // pan_no: [''],
      // aadhaar_no: [''], 
      // uan_no:[''],
      //employee_category:[''],
      //employee_grade:[''],
      company_id: [''],
      fin_year: [''],
      username: [''],
      user_role_id:[''],

       role: this.fb.array([this.fb.group({
         user_role_id :''})]),

    });

  }

  

   onChangeState(state_id:String)
   {
     if(state_id != "0")
     {
       this.status = false;            
       this.status = true;;
     }
   }

   company_name:any;
   seq_no:any;

  ngOnInit()
   {
    this.company_name = localStorage.getItem("company_name");
    this.empsave=true;
    this.user_name = localStorage.getItem("username");
    this.user_role=localStorage.getItem("user_role");
      if(this.user_role == 'RL00001')
       {
         this.usernamelock=true;
       }
       else
       {
         this.usernamelock=false;
       }

       forkJoin(
        this.DropDownListService.getEmployeeSequenceId("prefix="+"EMP"+"&company="+this.company_name),
        this.Service.getEmployees(),
        this.DropDownListService.deptNamesList(),
        this.DropDownListService.countryList(),
        this.DropDownListService.statelistByCountryUserprofile(),
        this.DropDownListService.citiNamesList(),
        this.DropDownListService.getroles()
       ).subscribe(([data,empdata,deptdata,countrydata,statesdata,citydata,roledata])=>{
        this.seq_no = data.sequenceid;
       // this.listemployee_master_list=empdata;
        this.Deptnames  = deptdata;
        this.countries  = countrydata;
        this.states  = statesdata;
        this.citiNames = citydata;
        this.RolesList  = roledata;
        console.log("list1:"+JSON.stringify(empdata))  
        empdata.forEach(element => 
          {
            
            if(this.user_role == 'RL00001')
            {
              this.listemployee_master_list=empdata;
            }
            else
            {
              console.log(this.user_name+" masterlist "+element.emp_username); 
              if(element.emp_username.toUpperCase() == this.user_name.toUpperCase())
              {
                this.listemployee_master_list.push(element);
              }
            }
            console.log("list:"+JSON.stringify(this.listemployee_master_list))   
          });
      });
   

    this.status = true; 
   
    

    this.dropdownSettings = {
          singleSelection: false,
           idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
          itemsShowLimit: 100,
          allowSearchFilter: this.ShowFilter
        };

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
   onUpdate(id,action)
   {
     this.isHidden = true;
     if(action == "view")
      {
        this.empsave=false;
      }
     if(action == "update")
      {
        this.empsave=true;
      }
     this.userrole_acess=true;
     forkJoin(
     this.Service.retriveEmployee(id),
     this.DropDownListService.countryList(),
     this.DropDownListService.statelistByCountryUserprofile(),
     this.DropDownListService.citiNamesList(),
     this.DropDownListService.deptNamesList(),
     this.DropDownListService.getroles()
     ).subscribe(([data,countrydata,statedata,citidata,dept,roles])=>
     {
      this.countries=countrydata;
      this.states=statedata;
      this.citiNames=citidata;
      this.Deptnames=dept;
      this.RolesList=roles;

      console.log(JSON.stringify(data))
      //console.log(JSON.stringify(roles)+" : :   HI HIN USER ")
       
       
       
        this.role.at(0).patchValue({user_role_id:data["user_role_id"]});
        this.userForm.patchValue(data);

       this.status = true;
     });
   }

   send()
   {
    this.Id= this.userForm.get("id").value as FormControl;
     this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
       fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
      this.submitted = true;
  /*   if(!this.userForm.valid) 
      {
       alert('Please fill all fields!')
       return false;
      }   
      else 
      {
        */
        if(this.Id>0)
          {
            this.status = false;
            //alert("hello "+this.role.at(0).get("user_role_id").value);
            this.userForm.patchValue({user_role_id:this.role.at(0).get("user_role_id").value});
            this.Service.updateEmployee(this.userForm.getRawValue(), this.Id).subscribe(data => 
            {
             console.log(this.userForm.value);
             alert("Employee Master Updated successfully.");
             this.listemployee_master_list=[];
             this.userForm.reset();
             this.showList('list');
             this.ngOnInit();
             this.isHidden=false;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});
          }  

          else
            {
              this.status = false;
              console.log("hello " + this.dynamicList)
              /*
                if(this.dynamicList == "" )
                {
                  var finaloutput="Na";
                // alert("hello ");
                  this.userForm.patchValue({preference:finaloutput});
                  //alert("hello preference "+ this.userForm.get("preference").value +" / ");
                  
                  this.userForm.patchValue({concat_multi:this.dynamicList});
                  //alert("hello con "+ this.userForm.get("concat_multi").value +" / ");
                }
                else
                {
                  let Concat_multi=this.userForm.get("concat_multi").value; 
                  for(let i=0; i<Concat_multi.length;i++)
                  {
                    let insideloop=JSON.stringify(Concat_multi[i].id);
                    this.concat_json += insideloop+",";
                  }
                  console.log( " hi "+ this.concat_json)
                  var finaloutput =this.concat_json.replace("undefined","");
              
              
                  this.userForm.patchValue({preference:finaloutput.substring(0,finaloutput.length-1)});

                }
*/
var finaloutput="Na";
 //alert("hello "+this.role.at(0).get("user_role_id").value);
  this.userForm.patchValue({preference:finaloutput,user_role_id:this.role.at(0).get("user_role_id").value});
  //alert("hello preference "+ this.userForm.get("preference").value +" / ");
  
  this.userForm.patchValue({concat_multi:this.dynamicList});
  //alert("hello con "+ this.userForm.get("concat_multi").value +" / ");
              //alert("1");
               this.Service.createEmployee(this.userForm.getRawValue()).subscribe(data => 
               {
                console.log(this.userForm.value);
                alert("New Employee Master created successfully.");
                this.userForm.reset();
                this.showList('list');
                this.ngOnInit();
                this.isHidden=false;
               }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
               this.ngOnInit()});
          //  }
      }
   } 
   
   onChangeRoleType(event)
   {
    this.dynamicList=[];
      this.DropDownListService.getRolesNameList(event)
       .subscribe(data=>
       {
         this.dynamicList  = data
         this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));});
    
    }

    onFocusOutEvent(event: any){

      console.log(event.target.value);
    
       this.DropDownListService.getUserEmailDuplicateCheck()
     .subscribe(data =>
        {
         if(data.includes(event.target.value))
        {
           alert("User Email must be Unique .Please try other Email !!!!!");
           this.userForm.reset();
         }   
       }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));});
      
    
    }

 }
