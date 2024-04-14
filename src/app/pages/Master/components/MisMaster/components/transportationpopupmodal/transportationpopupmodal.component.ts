import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { TaxList } from '../../../../../../Models/InventoryModel/TaxCode';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

@Component({
  selector: 'app-transportationpopupmodal',
  templateUrl: './transportationpopupmodal.component.html',
  styleUrls: ['./transportationpopupmodal.component.scss']
})
export class TransportationpopupmodalComponent implements OnInit {

  public userForm1: FormGroup;
  taxlist:{};
  description:String;

  // constructor( public fb:FormBuilder, private DropDownListService: DropdownServiceService)
  constructor( private fb: FormBuilder,
    private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<TransportationpopupmodalComponent>,
    @Inject(MAT_DIALOG_DATA) data)
  {
    this.userForm1=fb.group({
      tax_id:[''],
      tax_name:[''],
      tax_rate:['']
    });

    this.description = data.description;
              //  console.log("json: "+JSON.stringify(data));
                // alert("index: "+data.id);
                this.userForm1.patchValue(data);
     this.DropDownListService.taxList().subscribe(data=>{
     // console.log("json1: "+JSON.stringify(data));
      this.taxlist  = data;});
   }

   get tax_id(){ return this.userForm1.get("tax_id") as FormControl }           
   get tax_name(){ return this.userForm1.get("tax_name") as FormControl }    
   get tax_rate(){ return this.userForm1.get("tax_rate") as FormControl }           
             
 
   rate:any;
   code:any;
   name:any;
   check1(taxlist:TaxList)
   {
     
       this.rate = taxlist.tax_id;
       this.code = taxlist.tax_rate;
       this.name = taxlist.tax_name;
      
   }

  ngOnInit() {
  }

  SendDataToDifferentComponenet()
            {
              this.userForm1.patchValue({tax_id:this.rate, tax_rate: this.code, tax_name: this.name});
              // this.userForm1.patchValue({bp_code:this.value.substr(0, this.value.length-1)});
              //alert("transporter code:"+ this.value.substr(0, this.value.length-1));
              //this.userForm1.patchValue(bp_code:this.value);
              this.dialogRef.close(this.userForm1.value); 
            }
}

