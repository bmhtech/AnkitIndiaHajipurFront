import { Component, OnInit } from '@angular/core';
import { mise } from '../../../../../../models/InventoryModel/Mise';
import { Master } from '../../../../../../service/master.service';
import { FormGroup, FormBuilder, } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

  @Component({
    selector: 'app-misc-master',
    templateUrl: './misc-master.component.html',
    styleUrls: ['./misc-master.component.scss']
  })

  export class MiscMasterComponent implements OnInit 
  {
    submitted = false;
    public userForm:FormGroup;
    mise: mise = new mise();
    Id: any;
    bUnitCodes:{};
    company_name:any;
    masterTypeNameList:{};
    isHidden = false;
    listmise : mise[];
    status  = false;
    mismastersave:boolean = true;
    mismasterupdate:boolean = true;
    mismasterdelete:boolean = true;
    mismasterview:boolean=true;

    constructor(private Service: Master,public fb:FormBuilder,
      private DropDownListService: DropdownServiceService) 
     {
      this.userForm=fb.group({  
        id: [''],  
        mastertype_name: [''],
        description_head: [''],
        mastertype_active: [''],
        mastertype_remarks: [''],
        businessunit_code: [''],
        businessunit_name: [''], 
        company_id: [''],
        fin_year: [''],
        username: ['']});
     }
    get id(){ return this.userForm.get("id") as FormControl }
    get mastertype_name(){ return this.userForm.get("mastertype_name") as FormControl }
    get description_head(){ return this.userForm.get("description_head") as FormControl }
    get mastertype_active(){ return this.userForm.get("mastertype_active") as FormControl }
    get mastertype_remarks(){ return this.userForm.get("mastertype_remarks") as FormControl }
    get businessunit_code(){ return this.userForm.get("businessunit_code") as FormControl }
    get businessunit_name(){ return this.userForm.get("businessunit_name") as FormControl }
  
    ngOnInit() 
    {
      //For User Role
      let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));

     this.mismastersave=false
     this.mismasterupdate=false;
     this.mismasterdelete=false;
     this.mismasterview=false;

        if(accessdata.includes('misc_master.save'))
           {
            this.mismastersave = true;
           }
          if(accessdata.includes('misc_master.update'))
           { 
             this.mismasterupdate=true;
           }
           if(accessdata.includes('misc_master.delete'))
           {
             this.mismasterdelete=true;
           }
           if(accessdata.includes('misc_master.view'))
           {
             this.mismasterview=true;
           }
     
     
      this.company_name = localStorage.getItem("company_name");
      this.Service.getMiscs().subscribe(data=>{this.listmise  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.DropDownListService.bUnitList(this.company_name).subscribe(data=>{this.bUnitCodes = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.masterTypeNameList=["ACCEPTANCE NORMS PARAMETER", "MACHINE","MODE OF TRANSPORT","QC PARAMETER","SUPPLIER WEBRIDGE","WHERE TO BE USED"];
      this.status = true;
    }

    ResetAllValues()
  {
    return this.userForm=this.fb.group({
      id: [''],  
      mastertype_name: [''],
      description_head: [''],
      mastertype_active: [''],
      mastertype_remarks: [''],
      businessunit_code: [''],
      businessunit_name: [''], 
      company_id: [''],
      fin_year: [''],
      username: ['']});
  }

    showList(s:string)
    {
      if(this.mismastersave == true  && this.mismasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.reset(this.ResetAllValues().value);
        }
      }
      if(this.mismastersave == true  && this.mismasterupdate == false)
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
        this.mismastersave = true;
        this.userForm.reset(this.ResetAllValues().value);
      }
    }

    onchangeBUnitName(businessunit_code: String)
    {
      if(businessunit_code != "0")
      {
        this.status = false;
        this.DropDownListService.nameListByBUnitCode(businessunit_code).subscribe(data=>
        {
          this.userForm.patchValue({businessunit_name : data.businessunit_name});
          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});
      }
    }
    
    onUpdate(id:any,action)
    {
      if(action=='update')
      {
        this.mismastersave=true;
      }
      else
      {
        this.mismastersave=false;
      }
      //tuhin here 
      this.isHidden = true;
      this.status = false;
      this.showList("add");
      this.Service.retriveMisc(id).subscribe(data=>
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
          this.DropDownListService.findMisc('0').subscribe(data=>
          {
            this.listmise = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findMisc(serchText).subscribe(data=>
          {
            this.listmise = data;
            this.status = true;
          });     
        }
      }
    }
  
    onDelete(id:any,mastertype_code)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Miscellaneous Master ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.DropDownListService.checkMisleniousDeletation(mastertype_code,"miscMaster").subscribe(checkBUData=> 
          {
          //alert("check::"+checkBUData.status)
           if(checkBUData.status=='No')
           {
            this.Service.deleteMisc(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                console.log("Cat Miscellaneous:"+data.mastertype_name);
        
                if(data.mastertype_name=='' || data.mastertype_name==null)
                {
                  alert("Opps!!! Can't delete this Miscellaneous Master !!!");
                }else{
                  alert("Miscellaneous Master deleted successfully.");
                }
                this.status = true;
                this.ngOnInit()
              });
           }
           else{
            alert("This Misc is Already Used,Can not be Deleted!! ");
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
        if(this.userForm.get("mastertype_name").value == '' || this.userForm.get("mastertype_name").value == null || this.userForm.get("mastertype_name").value == 0)
        {
          alert("Please Select Master Type Name");
          this.status=true;
        }
        else if(this.userForm.get("description_head").value == '' || this.userForm.get("description_head").value == null || this.userForm.get("description_head").value == 0)
        {
          alert("Please Enter Description Head");
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
            this.Service.updateMisc(this.userForm.getRawValue(), this.Id).subscribe(data => 
             {
               console.log(this.userForm.value);
               alert("Mise master Updated successfully.");
               this.userForm.reset();
               //refresh List;
               this.ngOnInit();
               this.isHidden = false;
             }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
             this.ngOnInit()});
          }
          else
            {
               this.Service.createMisc(this.userForm.value).subscribe(data => 
               {
                 console.log(this.userForm.value);
                 alert("New Mise master created successfully.");
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
