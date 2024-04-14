import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { TaxList } from '../../../../../../Models/InventoryModel/TaxCode';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

@Component({
  selector: 'app-othermaster-tax-popup',
  templateUrl: './othermaster-tax-popup.component.html',
  styleUrls: ['./othermaster-tax-popup.component.scss']
})

export class OthermasterTaxPopupComponent implements OnInit 
{
  public userForm1: FormGroup;
  taxlist:{};
  status = false;

  constructor( private fb: FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService, 
    private dialogRef: MatDialogRef<OthermasterTaxPopupComponent>,@Inject(MAT_DIALOG_DATA) data)
  {
    this.userForm1=fb.group({
      tax_id:[''],
      tax_name:[''],
      tax_rate:['']});
  }

  get tax_id(){ return this.userForm1.get("tax_id") as FormControl }           
  get tax_name(){ return this.userForm1.get("tax_name") as FormControl }    
  get tax_rate(){ return this.userForm1.get("tax_rate") as FormControl }           
      
  ngOnInit() 
  {
    this.DropDownListService.taxList().subscribe(data=>
    {
      this.taxlist  = data;
      this.status = true;
    });
  }

  rate:any;
  code:any;
  check1(taxlist:TaxList)
  {
    this.rate = taxlist.tax_id;
    this.code = taxlist.tax_rate;
  }

  SendDataToDifferentComponenet()
  {
    this.userForm1.patchValue({tax_id:this.rate, tax_rate: this.code});
    this.dialogRef.close(this.userForm1.value); 
  }
}















// @Component({
//   selector: 'app-othermaster-tax-popup',
//   templateUrl: './othermaster-tax-popup.component.html',
//   styleUrls: ['./othermaster-tax-popup.component.scss']
// })
// export class OthermasterTaxPopupComponent implements OnInit
//  {
//   public userForm1: FormGroup;
//   taxlist:{};
//   status = false;


//   constructor() { }

//   ngOnInit() {
//   }

// }
