import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Charges } from '../../../../../../Models/OtherMaster/charges';

  @Component({
    selector: 'app-charge-code-pop-up',
    templateUrl: './charge-code-pop-up.component.html',
    styleUrls: ['./charge-code-pop-up.component.scss']
  })

  export class ChargeCodePopUpComponent implements OnInit 
  {
    public userForm1: FormGroup;
    list:any = [];
    charges_id:any;
    status = false;

    constructor(  private fb: FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<ChargeCodePopUpComponent>,@Inject(MAT_DIALOG_DATA) data)
    {
      this.userForm1=fb.group({
        charge_id:[''],
        charge_desc:[''] });

    }
  
    get charge_id(){ return this.userForm1.get("charge_id") as FormControl }           
    get charge_desc(){ return this.userForm1.get("charge_desc") as FormControl } 
  
    ngOnInit() 
    {
      this.status = false;
      this.DropDownListService.getChargeMasterList().subscribe(data=>
      {
        this.list  = data;
        this.status = true;
      });
    }
  
    check1(list:Charges)
    {this.charges_id = list.charge_id;}
  
    SendDataToDifferentComponenet()
    {
      this.userForm1.patchValue({charge_id:this.charges_id});
      this.dialogRef.close(this.userForm1.value); 
    }
  }
  