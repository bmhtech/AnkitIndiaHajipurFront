import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Trans_bussiness_partner } from '../../../../../../Models/SupplierModel/Trans_bussiness_partner';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { QcDetails } from '../../../../../../Models/InventoryModel/QcDetails';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

  @Component({
    selector: 'app-qc-norm-pop-up-modal',
    templateUrl: './qc-norm-pop-up-modal.component.html',
    styleUrls: ['./qc-norm-pop-up-modal.component.scss']})
    
  export class QcNormPopUpModalComponent implements OnInit 
  {
    public userForm1: FormGroup;
    qc_list:{};
    code:any;
    descript:any;
    status = false;

    constructor(  private fb: FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<QcNormPopUpModalComponent>,@Inject(MAT_DIALOG_DATA) data)
    {
      this.userForm1=fb.group({
        qc_code:[''],
        qc_description:[''] });

      this.userForm1.patchValue(data);

    //  this.DropDownListService.QcDetailsList(data.item_code,localStorage.getItem("company_name")).subscribe(data=>
    this.DropDownListService.getItemQCDetails(data.item_code,localStorage.getItem("company_name")).subscribe(data=>
      {
        this.qc_list  = data;
        this.status = true;
      });
    }

    get qc_code(){ return this.userForm1.get("qc_code") as FormControl }           
    get qc_description(){ return this.userForm1.get("qc_description") as FormControl } 

    ngOnInit() {}

    check1(qclist:QcDetails)
    {this.code = qclist.qc_code;}

    SendDataToDifferentComponenet()
    {
      this.userForm1.patchValue({qc_code:this.code});
      this.dialogRef.close(this.userForm1.value); 
    }
  }