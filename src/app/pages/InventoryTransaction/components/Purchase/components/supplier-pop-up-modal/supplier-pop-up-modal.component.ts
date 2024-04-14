import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
 import { suppPopUp } from '../../../../../../Models/InventoryModel/supplierMasterNcList';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

  @Component({
    selector: 'app-supplier-pop-up-modal',
    templateUrl: './supplier-pop-up-modal.component.html',
    styleUrls: ['./supplier-pop-up-modal.component.scss']})

  export class SupplierPopUpModalComponent implements OnInit 
  {
    public userForm1: FormGroup;
    model:suppPopUp = new suppPopUp();
    ncList:{};
    description:String;
    check : any;
    suppGroups:{};
    status = false;
    
  
    constructor( private fb: FormBuilder,private Service: Master,
     private DropDownListService: DropdownServiceService,
     private dialogRef: MatDialogRef<SupplierPopUpModalComponent>,@Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm1=fb.group
      ({
        group_type:[''],
        SupplierMasterNcList: this.fb.array([this.fb.group({
          checkbox:'',
          bp_name:'',
          bp_code:'',
          bp_Id:''})]),
  
      });
     
    }
     
    get SupplierMasterNcList(){{ return this.userForm1.get('SupplierMasterNcList') as FormArray;}}
     get group_type() {return this.userForm1.get('group_type') as FormControl;}
  
    ngOnInit()
    {
      this.status = false;
      this.DropDownListService.supplierNameCodeList().subscribe(data=>{this.suppGroups = data;});
      this.SupplierMasterNcList.removeAt(0);
      this.userForm1.patchValue({group_type: "0"});
    //  this.userForm1.patchValue({group_type:"0"});
      this.DropDownListService.supplierMAsterNCList().subscribe(data=>{
       for(let i=0;i<data.length;i++){ this.add(); }
       this.SupplierMasterNcList.patchValue(data);
       this.status = true;});
    }
  
    onchangeSupplierGroup(group:string)
    {
      this.status = false;
      while(this.SupplierMasterNcList.length)
      this.SupplierMasterNcList.removeAt(0);
  
      this.DropDownListService.supplierListByGroup(group).subscribe(data=>{
        this.status = true;
        for(let i=0;i<data.length;i++){ this.add(); }
        this.SupplierMasterNcList.patchValue(data);
        });
      
    }
  
    add()
    {
      this.SupplierMasterNcList.push(this.fb.group({
        checkbox: '',
        bp_name: '',
        bp_code: '',
        bp_Id:''}));
    }
  
    SendDataToDifferentComponenet()
    {
      this.dialogRef.close(this.SupplierMasterNcList.value);  
    }
  }
  
  
  
  