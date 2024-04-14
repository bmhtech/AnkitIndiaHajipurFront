import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {FormBuilder,FormControl } from '@angular/forms';
import { Designation } from '../../../../../../models/InventoryModel/designation';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

  @Component({
    selector: 'app-designation-master',
    templateUrl: './designation-master.component.html',
    styleUrls: ['./designation-master.component.scss']
  })

  export class DesignationMasterComponent implements OnInit 
  {
    submitted = false;
    model: Designation = new Designation();
    public userForm:FormGroup;
    isHidden=false;
    Id: any;
    listDesignation: Designation[];
    status = false;
    designationmastersave:boolean=true;
    designationmasterupdate:boolean=true;
    designationmasterdelete:boolean=true;
    designationmasterview:boolean=true;

    constructor(private Service: Master, public fb:FormBuilder,
      private DropDownListService: DropdownServiceService) 
    { 
      this.userForm=fb.group({
        id: [''],
        desig_name: [''],
        description: [''],
        company_id: [''],
        fin_year: [''],
        username: ['']});
    }
    get id(){ return this.userForm.get("id") as FormControl }
    get desig_name(){ return this.userForm.get("desig_name") as FormControl }
    get description(){ return this.userForm.get("description") as FormControl }
  
    ngOnInit() 
    {
      //For User Role
      let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
   
     this.designationmastersave=false;
     this.designationmasterupdate=false;
     this.designationmasterdelete=false;
     this.designationmasterview=false;

     if(accessdata.includes('designation_master.save'))
     {
      this.designationmastersave = true;
     }
    if(accessdata.includes('designation_master.update'))
     { 
       this.designationmasterupdate=true;
     }
     if(accessdata.includes('designation_master.delete'))
     {
       this.designationmasterdelete=true;
     }
     if(accessdata.includes('designation_master.view'))
     {
       this.designationmasterview=true;
     }

     
      this.Service.getDesignations().subscribe(data=>
      {
        this.listDesignation  = data;
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
    }

    showList(s:string)
    {
      if(this.designationmastersave == true  && this.designationmasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
          {
            this.isHidden=true;
            this.userForm.reset(this.ResetAllValues().value);
          }
      }
      if(this.designationmastersave == true  && this.designationmasterupdate == false)
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
        this.designationmastersave=true;
        this.userForm.reset(this.ResetAllValues().value);
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id: [''],
        desig_name: [''],
        description: [''],
        company_id: [''],
        fin_year: [''],
        username: ['']});
    }

    search(event)
    {
      let serchText = event.target.value;
      if(event.key == "Enter")
      {
        this.status = false;
        if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
        {
          this.DropDownListService.findDesignation('0').subscribe(data=>
          {
            this.listDesignation = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findDesignation(serchText).subscribe(data=>
          {
            this.listDesignation = data;
            this.status = true;
          });     
        }
      }
    }
  
    onDelete(id:any,desig_id)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Designation ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.DropDownListService.checkMisleniousDeletation(desig_id,"designationMaster").subscribe(checkBUData=> 
          {
          //alert("check::"+checkBUData.status)
           if(checkBUData.status=='No')
           {
            this.Service.deleteDesignation(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                console.log("Cat Designation:"+data.desig_name);
        
                if(data.desig_name=='' || data.desig_name==null)
                {
                  alert("Opps!!! Can't delete this Designation !!!");
                }else{
                  alert("Designation deleted successfully.");
                }
                this.status = true;
                this.ngOnInit()
              });
           }
           else{
            alert("This Designation is Already Used,Can not be Deleted!! ");
           }
          }); 
      }  
      this.status = true;
    }

    onUpdate(id:any,action)
    {
      if(action =='update')
      {
        this.designationmastersave=true;
      }
      else
      {
        this.designationmastersave=false;
      }
     //tuhin here // this.designationmastersave=true;
      this.isHidden = true;
      this.status = false;
      this.Service.retriveDesignation(id).subscribe(data=>
      {
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
        if(this.userForm.get("desig_name").value == '' || this.userForm.get("desig_name").value == null)
        {
          alert("Please Enter Designation Name")
          this.status=true;
        }
        else
        {
          if(this.Id>0)
          {
            this.status = false;
           this.Service.updateDesignation(this.userForm.getRawValue(), this.Id).subscribe(data => 
           {
            console.log(this.userForm.value);
            alert("Designation Updated successfully.");
            this.userForm.reset();
            //refresh List;
            this.ngOnInit(); 
            this.isHidden = false;                     
           }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
           this.ngOnInit()});
          }
          
          else
            {
              this.status = false;
             this.Service.createDesignation(this.userForm.getRawValue()).subscribe(data => 
             {
              console.log(this.userForm.value);
              alert("New Designation created successfully.");
              this.userForm.reset();
              //refresh List;
              this.ngOnInit(); 
              this.isHidden = false;                     
             }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
             this.ngOnInit()});
           }
        }
        
      }   
    }

  }
