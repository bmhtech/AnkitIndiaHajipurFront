import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TaxList } from '../../../../../Models/InventoryModel/TaxCode';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { Master } from '../../../../../service/master.service';
import { ItemMasterTaxCodeModalComponent } from '../../ItemMaster/components/item-master-tax-code-modal/item-master-tax-code-modal.component';

@Component({
  selector: 'app-servicetaxcodepopup',
  templateUrl: './servicetaxcodepopup.component.html',
  styleUrls: ['./servicetaxcodepopup.component.scss']
})
export class ServicetaxcodepopupComponent implements OnInit {

  public userForm1: FormGroup;
    taxlist:any = [];
    status = true;

  constructor(private fb: FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<ServicetaxcodepopupComponent>, @Inject(MAT_DIALOG_DATA) data)
   { 
    this.userForm1=fb.group({ 
      tax_id:[''],
      tax_name:[''],
      tax_rate:[''],
     });

    this.userForm1.patchValue(data);
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
   taxid:any;
  
   check1(taxlist:TaxList)
   { 
     this.code = taxlist.tax_name;
     this.taxid = taxlist.tax_id;
     this.rate = taxlist.tax_rate;
     
   }

   SendDataToDifferentComponenet()
   {
     this.userForm1.patchValue({tax_id:this.taxid,tax_name:this.code, tax_rate: this.rate});
     this.dialogRef.close(this.userForm1.value); 
   }

 }