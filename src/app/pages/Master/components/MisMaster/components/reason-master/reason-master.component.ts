import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { reasonMaster } from '../../../../../../Models/InventoryModel/ReasonMaster';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

  @Component({
    selector: 'app-reason-master',
    templateUrl: './reason-master.component.html',
    styleUrls: ['./reason-master.component.scss']
  })

  export class ReasonMasterComponent implements OnInit 
  {
    isHidden=false;
    public userForm:FormGroup;
    model: reasonMaster = new reasonMaster();
    screenList:{};
    Id: any;
    submitted = false;
    listreasonMaster : reasonMaster[];
    status = false;
    reasonmastersave:boolean=true;
    reasonmasterupdate:boolean=true;
    reasonmasterdelete:boolean=true;
    reasonmasterview:boolean=true;

    constructor(public fb:FormBuilder, private Service: Master, private DropDownListService: DropdownServiceService)
    {
      this.userForm=fb.group({
        screen_code: [''],
        id: [''],
        reason: [''], 
        company_id: [''],
        fin_year: [''],
        username: ['']});
    }
    get id(){ return this.userForm.get("id") as FormControl }
    get screen_code(){ return this.userForm.get("screen_code") as FormControl }
    get reason(){ return this.userForm.get("reason") as FormControl }
  
    ngOnInit() 
    {
      //For User Role
     let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
     this.reasonmastersave=false;
     this.reasonmasterupdate=false;
     this.reasonmasterdelete=false;
     this.reasonmasterview=false;

     if(accessdata.includes('reason_master.save'))
     {
      this.reasonmastersave = true;
     }
    if(accessdata.includes('reason_master.update'))
     { 
       this.reasonmasterupdate=true;
     }
     if(accessdata.includes('reason_master.delete'))
     {
       this.reasonmasterdelete=true;
     }
     if(accessdata.includes('reason_master.view'))
     {
       this.reasonmasterview=true;
     }
     
      this.Service.getReasonMaster().subscribe(data=>{this.listreasonMaster  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.DropDownListService.screenList().subscribe(data=>{this.screenList  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.status = true;
    }

    showList(s:string)
    {
      if(this.reasonmastersave == true  && this.reasonmasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.reset(this.ResetAllValues().value);
        }
      }
      if(this.reasonmastersave == true  && this.reasonmasterupdate == false)
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
        this.reasonmastersave=true;
        this.userForm.reset(this.ResetAllValues().value);
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        screen_code: [''],
        id: [''],
        reason: [''], 
        company_id: [''],
        fin_year: [''],
        username:['']});
    }

    search(event)
    {
      let serchText = event.target.value;
      if(event.key == "Enter")
      {
        this.status = false;
        if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
        {
          this.DropDownListService.findReason('0').subscribe(data=>
          {
            this.listreasonMaster = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findReason(serchText).subscribe(data=>
          {
            this.listreasonMaster = data;
            this.status = true;
          });     
        }
      }
    }
  
    onDelete(id:any)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Reason ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.Service.deleteReason(this.userForm.getRawValue(),id).subscribe(data=> 
        {
          console.log("Cat reason:"+data.reason);
  
          if(data.reason=='' || data.reason==null)
          {
            alert("Opps!!! Can't delete this Reason !!!");
          }else{
            alert("Reason deleted successfully.");
          }
          this.status = true;
          this.ngOnInit()
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
        if(this.userForm.get("screen_code").value == '' || this.userForm.get("screen_code").value == null || this.userForm.get("screen_code").value == 0)
        {
          alert("Please Select Screen Name!!");
          this.status=true;
        }
        else if(this.userForm.get("reason").value == '' || this.userForm.get("reason").value == null || this.userForm.get("reason").value == 0)
        {
          alert("Please Enter Reason!!");
          this.status=true;
        }
        else
        {
          if(this.Id>0)
          {
            this.status = false;
            this.Service.updateReason(this.userForm.getRawValue(), this.Id).subscribe(data => 
            {
              console.log(this.userForm.value);
              alert("Reason master Updated successfully.");
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
              this.Service.createReasonMaster(this.userForm.getRawValue()).subscribe(data => 
              {
                console.log(this.userForm.value);
                alert("New Reason master created successfully.");
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
    onUpdate(id:any,action)
    {
     // this.reasonmastersave=true;
     if(action=='update')
     {
      this.reasonmastersave=true;
     }
     else
     {
      this.reasonmastersave=false;
     }
      this.isHidden = true;
      this.status = false;
      this.Service.retriveReason(id).subscribe(data=>
      {
        //console.log("retive:"+JSON.stringify(data))
       // console.log(this.screenList);
        this.userForm.patchValue({screen_code:data["screen_code"],reason:data["reason"]}); 
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
    }

}
