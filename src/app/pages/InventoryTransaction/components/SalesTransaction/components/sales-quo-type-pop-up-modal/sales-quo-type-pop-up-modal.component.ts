import { Component, OnInit, Inject, ɵConsole} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { cust_bussiness_partner } from '../../../../../../Models/CustomerModel/cust_bussiness_partner';

@Component({
  selector: 'app-sales-quo-type-pop-up-modal',
  templateUrl: './sales-quo-type-pop-up-modal.component.html',
  styleUrls: ['./sales-quo-type-pop-up-modal.component.scss']
})
  export class SalesQuoTypePopUpModalComponent implements OnInit 
  {
    public userForm:FormGroup;
    customerList:{};
    cp_name:any;
    cp_Id:any;
    constructor(public fb:FormBuilder, private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<SalesQuoTypePopUpModalComponent>,@Inject(MAT_DIALOG_DATA)data)
      {
        this.userForm=fb.group({ 
         
          cust_bussiness_partner: this.fb.group({
            cp_Id :[''],
            cp_name :[''],
          })
        });
      }
 
    get cust_bussiness_partner() { return this.userForm.get('cust_bussiness_partner') as FormGroup;}
    
    company_name:any;
    ngOnInit() 
    {
      this.company_name = localStorage.getItem("company_name");
      this.DropDownListService.customerNameCodeList(this.company_name).subscribe(data=>{this.customerList = data});
    }

    check1(custList:cust_bussiness_partner)
    {
      this.cp_Id = custList.cp_Id;
      this.cp_name = custList.cp_name;
    }
    
    SendDataToDifferentComponenet()
    {
      this.userForm.patchValue({cp_Id:this.cp_Id, cp_name: this.cp_name});
      this.dialogRef.close({cp_Id:this.cp_Id, cp_name: this.cp_name}); 
      // this.dialogRef.close(this.userForm.value);
    }


}

