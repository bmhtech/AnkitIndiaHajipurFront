
import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Vehicle } from '../../../../../../Models/InventoryModel/vehicle';

@Component({
  selector: 'app-add-new-vechile-pop-up',
  templateUrl: './add-new-vechile-pop-up.component.html',
  styleUrls: ['./add-new-vechile-pop-up.component.scss']
})
  
    export class AddNewVechilePopUpComponent implements OnInit 
    {
      public userForm:FormGroup;
      Vehicle: Vehicle = new Vehicle();
      bUnitCodes:{};
      customUOMs:{};
      company_name:any;
      vehicleCodes:{};
      transporterList:{}
      status = false;
      TransporterCode:any;
      errorMessage:any;
  
      constructor( private fb: FormBuilder, private Service: Master,
        private DropDownListService: DropdownServiceService,
        private dialogRef: MatDialogRef<AddNewVechilePopUpComponent>, @Inject(MAT_DIALOG_DATA)data)
      {
        this.userForm=fb.group({
          vehicle_no: [''],
          vehicle_active: [''],
          vehtype_code: [''],
          onwer_phoneno: [''],
          vehicle_aliasno: [''],
          vehicle_chassisno: [''],
          tareweight_qty: [''],
          tareweight_uom: [''],
          load_capacity: [''],
          loadcapacity_uom: [''],
          onwer_name: [''],
          onwer_address: [''],
          transporter: [''],
          username: ['']
        });
        if(data["TransporterCode"]!=0)
        {
          this.TransporterCode =data["TransporterCode"];
        }
        
      }
      
      get vehicle_no(){ return this.userForm.get("vehicle_no") as FormControl }
      get vehicle_active(){ return this.userForm.get("vehicle_active") as FormControl }
      get vehtype_code(){ return this.userForm.get("vehtype_code") as FormControl }
      get onwer_phoneno(){ return this.userForm.get("onwer_phoneno") as FormControl }
      get vehicle_aliasno(){ return this.userForm.get("vehicle_aliasno") as FormControl }
      get vehicle_chassisno(){ return this.userForm.get("vehicle_chassisno") as FormControl }
      get tareweight_qty(){ return this.userForm.get("tareweight_qty") as FormControl }
      get tareweight_uom(){ return this.userForm.get("tareweight_uom") as FormControl }
      get load_capacity(){ return this.userForm.get("load_capacity") as FormControl }
      get loadcapacity_uom(){ return this.userForm.get("loadcapacity_uom") as FormControl }
      get onwer_name(){ return this.userForm.get("onwer_name") as FormControl }
      get onwer_address(){ return this.userForm.get("onwer_address") as FormControl }
      get transporter(){return this.userForm.get("transporter") as FormControl}
      get username(){ return this.userForm.get("username") as FormControl }
     
      ngOnInit() 
      {
        this.company_name = localStorage.getItem("company_name");
        this.status = false;
        this.DropDownListService.bUnitList(this.company_name).subscribe(data=>{this.bUnitCodes = data;});
        this.DropDownListService.customUOMList().subscribe(data=>{this.customUOMs  = data;});
        this.DropDownListService.vehicleCodeList().subscribe(data=>{this.vehicleCodes  = data;});
        this.DropDownListService.transporterNamesList().subscribe(data=>{this.transporterList  = data;}); 
      
        this.status = true;
      }

  
      SendDataToDifferentComponenet()
      {
      //  if(this.transporter.value == '' || this.transporter.value == null || this.transporter.value == 0)
      //  {
      //    this.errorMessage=" Please input Valid TransportName";
      //  }
         if(this.vehicle_no.value == '' || this.vehicle_no.value == null)
        {
          this.errorMessage=" Please Enter Vehicle Number!!!";
        }
        else if(this.vehtype_code.value == '' || this.vehtype_code.value == null || this.transporter.value == 0)
        {
          this.errorMessage=" Please Select Vehicle Type Name!!!";
        }
        // else if(this.vehicle_aliasno.value == '' || this.vehicle_aliasno.value == null)
        // {
        //   this.errorMessage=" Please input Valid Vehicle Alias Number";
        // }
        // else if(this.vehicle_chassisno.value == '' || this.vehicle_chassisno.value == null)
        // {
        //   this.errorMessage=" Please input Valid Vehicle Chassis No.";
        // }
        // else if(this.tareweight_qty.value == '' || this.tareweight_qty.value == null)
        // {
        //   this.errorMessage=" Please input Valid Tare Weight Qty";
        // }
        // else if(this.tareweight_uom.value == '' || this.tareweight_uom.value == null)
        // {
        //   this.errorMessage=" Please input Valid TareWeight Uom";
        // }
        // else if(this.load_capacity.value == '' || this.load_capacity.value == null)
        // {
        //   this.errorMessage=" Please input Valid Load Capacity";
        // }
        // else if(this.loadcapacity_uom.value == '' || this.loadcapacity_uom.value == null)
        // {
        //   this.errorMessage=" Please input Valid Load Capacity Uom";
        // }
        // else if(this.onwer_name.value == '' || this.onwer_name.value == null)
        // {
        //   this.errorMessage=" Please input Valid Owner Name";
        // }
        // else if(this.onwer_address.value == '' || this.onwer_address.value == null)
        // {
        //   this.errorMessage=" Please input Valid Owner Address";
        // }
        // else if(this.onwer_phoneno.value == '' || this.onwer_phoneno.value == null)
        // {
        //   this.errorMessage=" Please input Valid Owner Phone No.";
        // }
      
        else
        {
          this.errorMessage="";
          this.userForm.patchValue({username: localStorage.getItem("username")});
          console.log(this.userForm.value);
          this.dialogRef.close(this.userForm.value);
        }
        
       
      }  

      groupstat1:any;
    onFocusoutCheckUnique(event: any)
    { 
          this.DropDownListService.chkVehicleNoStat(event.target.value).subscribe(data=>
            {
               this.groupstat1 = data.group_name;
              // this.status=true;
              //window.alert( data.group_name);
              if(this.groupstat1=='EXIST')
              {
                window.alert(event.target.value +" "+ " already exist please change !" );
                
                this.userForm.patchValue({vehicle_no:""});
                this.status=true;
              }
              else
              {
                this.status=true;
              }
              
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Please Input Valid Vehicle Number....");});
            this.groupstat1=''; 
            this.status=true;        
        }
  }