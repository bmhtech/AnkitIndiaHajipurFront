import { Component, OnInit } from '@angular/core';
import { vehicleType } from '../../../../../../models/InventoryModel/vehicle-type-master';
import { Master } from '../../../../../../service/master.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { MatDialogRef, MatDialog, MatDialogConfig} from '@angular/material/dialog';

  @Component({
    selector: 'app-vehicle-type-master',
    templateUrl: './vehicle-type-master.component.html',
    styleUrls: ['./vehicle-type-master.component.scss']
  })

  export class VehicleTypeMasterComponent implements OnInit 
  {
    submitted = false;
    public userForm:FormGroup;
    vehicleType: vehicleType = new vehicleType();
    bUnitCodes:{};
    company_name:any;
    Id:any;
    isHidden = false;
    seq_no:string;
    listvehicleType : vehicleType[];
    status = false;
    vehicletypemastersave:boolean = true;
    vehicletypemasterupdate:boolean = true;
    vehicletypemasterdelete:boolean = true;
    vehicletypemasterview:boolean=true;

    constructor(private Service: Master, public fb:FormBuilder,
      private DropDownListService: DropdownServiceService) 
    { 
      this.userForm=fb.group({ 
        id: [''], 
        vehtype_code: [''],
        vehtype_name: [''],
        vehtype_active: [''],     
        noofwheels: [''],
        vehtype_remarks: [''],   
        businessunit_code: [''],
        //businessunit_name: [''],
        company_id: [''],
        fin_year: [''],
        username: ['']});
    }
    get id(){ return this.userForm.get("id") as FormControl }
    get vehtype_code(){ return this.userForm.get("vehtype_code") as FormControl }
    get vehtype_name(){ return this.userForm.get("vehtype_name") as FormControl }
    get vehtype_active(){ return this.userForm.get("vehtype_active") as FormControl }
    get noofwheels(){ return this.userForm.get("noofwheels") as FormControl }
    get vehtype_remarks(){ return this.userForm.get("vehtype_remarks") as FormControl }
    get businessunit_code(){ return this.userForm.get("businessunit_code") as FormControl }
    //get businessunit_name(){ return this.userForm.get("businessunit_name") as FormControl }
  
    ngOnInit() 
    {
      //For User Role
      let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
     
     this.vehicletypemastersave=false;
     this.vehicletypemasterupdate=false;
     this.vehicletypemasterdelete=false;
     this.vehicletypemasterview=false;
     
     if(accessdata.includes('vehicle_type_master.save'))
     {
      this.vehicletypemastersave = true;
     }
    if(accessdata.includes('vehicle_type_master.update'))
     { 
       this.vehicletypemasterupdate=true;
     }
     if(accessdata.includes('vehicle_type_master.delete'))
     {
       this.vehicletypemasterdelete=true;
     }
     if(accessdata.includes('vehicle_type_master.view'))
     {
       this.vehicletypemasterview=true;
     }
   
     
      this.company_name = localStorage.getItem("company_name");
      this.DropDownListService.getVtypeSequenceId("VT").subscribe(data=>{this.seq_no = data.sequenceid;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.Service.getVehicleTypes().subscribe(data=>{this.listvehicleType  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.DropDownListService.getCompanyBUMNCList(this.company_name).subscribe(data=>{this.bUnitCodes = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      // this.DropDownListService.bUnitList(this.company_name).subscribe(data=>{this.bUnitCodes = data;});
      this.status = true;
    }

    showList(s:string)
    {
      if(this.vehicletypemastersave == true  && this.vehicletypemasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.reset(this.ResetAllValues().value);
          this.userForm.patchValue({businessunit_code:"0"});
        }
      }
      if(this.vehicletypemastersave == true  && this.vehicletypemasterupdate == false)
      {
        if(s=="add")
      {
        this.isHidden=true;
        this.userForm.reset(this.ResetAllValues().value);
        this.userForm.patchValue({businessunit_code:"0"});
      }
      }
     
      if(s=="list")
      {
        this.isHidden=false;
        this.vehicletypemastersave = true;
     this.userForm.reset(this.ResetAllValues().value);
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id: [''], 
        vehtype_code: [''],
        vehtype_name: [''],
        vehtype_active: [''],     
        noofwheels: [''],
        vehtype_remarks: [''],   
        businessunit_code: [''],
      //  businessunit_name: [''],
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
          this.DropDownListService.findVehicleType('0').subscribe(data=>
          {
            this.listvehicleType = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findVehicleType(serchText).subscribe(data=>
          {
            this.listvehicleType = data;
            this.status = true;
          });     
        }
      }
    }
  
    onDelete(id:any,vehtype_code)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Vehicle Type ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.DropDownListService.checkMisleniousDeletation(vehtype_code,"vehicleTypeMaster").subscribe(checkBUData=> 
          {
          //alert("check::"+checkBUData.status)
           if(checkBUData.status=='No')
           {
            this.Service.deleteVehicleType(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                console.log("Cat vehtype_name:"+data.vehtype_name);
        
                if(data.vehtype_name=='' || data.vehtype_name==null)
                {
                  alert("Opps!!! Can't delete this Vehicle Type !!!");
                }else{
                  alert("Vehicle Type deleted successfully.");
                }
                this.status = true;
                this.ngOnInit()
              });
           }
           else{
            alert("This Vehicle Type is Already Used,Can not be Deleted!! ");
           }
          }); 
      }  
      this.status = true;
    }

    onUpdate(id:any,action)
    {
      if(action=='update')
      {
        this.vehicletypemastersave=true;
      }
      else
      {
        this.vehicletypemastersave=false;
      }
      //tuhin here//this.vehicletypemastersave=true;
      this.isHidden = true;
      this.status = false;
      this.Service.retriveVehicleType(id).subscribe(data=>
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
        if(this.userForm.get("vehtype_name").value == '' || this.userForm.get("vehtype_name").value == null || this.userForm.get("vehtype_name").value ==0)
        {
          alert("Please Enter Vehicle Type Name");
          this.status=true;
        }
        else if(this.userForm.get("noofwheels").value == '' || this.userForm.get("noofwheels").value == null || this.userForm.get("noofwheels").value ==0)
        {
          alert("Please Enter Number of Wheels");
          this.status=true;
        }
        else if(this.userForm.get("businessunit_code").value == '' || this.userForm.get("businessunit_code").value == null || this.userForm.get("businessunit_code").value ==0)
        {
          alert("Please Select Bussiness Unit Name");
          this.status=true;
        }
        else
        {
          if(this.Id>0)
          {
            this.status = false;
            this.Service.updateVehicleType(this.userForm.getRawValue(), this.Id).subscribe(data => 
            {
              console.log(this.userForm.value);
              alert("VehicleType Updated successfully.");
              this.userForm.reset();
              //refresh List;
              this.ngOnInit(); 
              this.isHidden = false                   
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});
          }
          else
            {
              this.status = false;
              this.Service.createVehicleType(this.userForm.getRawValue()).subscribe(data => 
              {
                console.log(this.userForm.value);
                alert("New VehicleType created successfully.");
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
