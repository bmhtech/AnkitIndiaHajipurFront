import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Vehicle } from '../../../../../../models/InventoryModel/vehicle';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

@Component({
  selector: 'app-trans-master-pop-up-modal',
  templateUrl: './trans-master-pop-up-modal.component.html',
  styleUrls: ['./trans-master-pop-up-modal.component.scss']
})
export class TransMasterPopUpModalComponent implements OnInit {
  public userForm: FormGroup;
  description:string;
  vechileDetails: {};
  Vehicle: Vehicle = new Vehicle();
  status=false;
  constructor( fb: FormBuilder,
    private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<TransMasterPopUpModalComponent>,
    @Inject(MAT_DIALOG_DATA) data)
    {
      this.userForm=fb.group({
        vehicle_no: [''],
        vehicle_active: [''],
        vehtype_code: [''],
       // vehtype_name: [''],
        //businessunit_code: [''],
        onwer_phoneno: [''],
        //businessunit_name: [''],
        vehicle_aliasno: [''],
        vehicle_chassisno: [''],
        tareweight_qty: [''],
        tareweight_uom: [''],
        load_capacity: [''],
        loadcapacity_uom: [''],
        onwer_name: [''],
        onwer_address: [''],
      });


      this.description = data.vechile_id;
      
     
      
    
    }

    get vehicle_no() {return this.userForm.get("vehicle_no") as FormControl;}
    get vehicle_active() {return this.userForm.get("vehicle_active") as FormControl;}
    get vehtype_code() {return this.userForm.get("vehtype_code") as FormControl;}
   // get vehtype_name() {return this.userForm.get("vehtype_name") as FormControl;}
   // get businessunit_code() {return this.userForm.get("businessunit_code") as FormControl;}
    get onwer_phoneno() {return this.userForm.get("onwer_phoneno") as FormControl;}
  //  get businessunit_name() {return this.userForm.get("businessunit_name") as FormControl;}
    get vehicle_aliasno() {return this.userForm.get("vehicle_aliasno") as FormControl;}
    get vehicle_chassisno() {return this.userForm.get("vehicle_chassisno") as FormControl;}
    get tareweight_qty() {return this.userForm.get("tareweight_qty") as FormControl;}
    get tareweight_uom() {return this.userForm.get("tareweight_uom") as FormControl;}
    get load_capacity() {return this.userForm.get("load_capacity") as FormControl;}
    get loadcapacity_uom() {return this.userForm.get("loadcapacity_uom") as FormControl;}
    get onwer_name() {return this.userForm.get("onwer_name") as FormControl;}
    get onwer_address() {return this.userForm.get("onwer_address") as FormControl;}


  ngOnInit() {
   // alert("inside ng oninit");
    this.DropDownListService.getVehicleDetails(this.description).subscribe(data=>{
      // alert(JSON.stringify(data));
      this.vechileDetails = data;
      this.userForm.patchValue(data);
      this.status=true;
    });
    
  }

 

}
