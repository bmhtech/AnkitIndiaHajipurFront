import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { TaxList } from '../../../../../../Models/InventoryModel/TaxCode';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';


@Component({
  selector: 'app-stock-tax-popup',
  templateUrl: './stock-tax-popup.component.html',
  styleUrls: ['./stock-tax-popup.component.scss']
})
export class StockTaxPopupComponent implements OnInit {

  public userForm1: FormGroup;
    taxlist:{};
    description:String;
    rate:any;
    code:any;
    cgst_act_val1:any;
    sgst_act_val1:any;
    igst_act_val1:any;
    taxstatus1:any;

  constructor( private fb: FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<StockTaxPopupComponent>,@Inject(MAT_DIALOG_DATA)data)
  {
    this.userForm1=fb.group({
      tax_id:[''],
      tax_name:[''],
      tax_rate:[''],
      cgst_act_val:[''],
      sgst_act_val:[''],
      igst_act_val:[''],
      taxstatus:[''] });

    this.description = data.description;
    console.log("json: "+JSON.stringify(data));
    // alert("index: "+data.id);
    this.userForm1.patchValue(data);
  }

  get tax_id(){ return this.userForm1.get("tax_id") as FormControl }           
  get tax_name(){ return this.userForm1.get("tax_name") as FormControl }    
  get tax_rate(){ return this.userForm1.get("tax_rate") as FormControl }  
  
  get cgst_act_val(){ return this.userForm1.get("cgst_act_val") as FormControl }           
  get sgst_act_val(){ return this.userForm1.get("sgst_act_val") as FormControl }    
  get igst_act_val(){ return this.userForm1.get("igst_act_val") as FormControl }   
  get taxstatus(){ return this.userForm1.get("taxstatus") as FormControl } 
    
  ngOnInit() 
  {this.DropDownListService.taxList().subscribe(data=>{this.taxlist  = data;});}
  
  check1(taxlist:TaxList)
  {
    this.rate = taxlist.tax_id;
    this.code = taxlist.tax_rate;

    this.cgst_act_val1 = taxlist.cgst_act_val;
    this.sgst_act_val1 = taxlist.sgst_act_val;
    this.igst_act_val1 = taxlist.igst_act_val;

    if(Number(this.igst_act_val1) == 0 || Number(this.igst_act_val1) == 0.00)
    {
      this.taxstatus1="NO"
    }
    else
    {
      this.taxstatus1="Yes"
    }
    
  }

  SendDataToDifferentComponenet()
  {
    this.userForm1.patchValue({tax_id:this.rate, tax_rate: this.code,
      cgst_act_val: this.cgst_act_val1,sgst_act_val: this.sgst_act_val1,
      igst_act_val: this.igst_act_val1,taxstatus: this.taxstatus1});
    this.dialogRef.close(this.userForm1.value); 
  }
  }
