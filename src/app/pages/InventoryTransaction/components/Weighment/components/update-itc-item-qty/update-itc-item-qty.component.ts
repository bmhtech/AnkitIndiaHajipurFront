import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-update-itc-item-qty',
  templateUrl: './update-itc-item-qty.component.html',
  styleUrls: ['./update-itc-item-qty.component.scss']
})
export class UpdateItcItemQtyComponent implements OnInit {
  public userForm: FormGroup;
  Unadviceid: any;
  Unadviceno: any;
  status: any;
  Id: any;
  item_sl_no=1;

  constructor(private fb: FormBuilder, private Service: Master,
     private DropDownListService: DropdownServiceService,
     private dialogRef: MatDialogRef<UpdateItcItemQtyComponent>, @Inject(MAT_DIALOG_DATA) data) { 

     this.Unadviceid = data["unadviceid"];
     this.Id = data["id"];
     this.Unadviceno = data["unadviceno"];
     console.log(this.Unadviceid + " / " + this.Id+" / "+this.Unadviceno)
     this.userForm = fb.group(
      {
        id: [''],
        reference_id: [''],
        unload_no: [''],
        unadviceid: [''],

        unload_Advice_Item_Dtls: this.fb.array([this.fb.group({
          slno: this.item_sl_no,
          item_code: '',
          item_name: '',
          packing: '',
          packing_name: '',
          quantity: '',
          squantity: '',
          itc_item_qty: '',
        })]),
       });
     }

     get id() { return this.userForm.get("id") as FormControl }
     get reference_id() { return this.userForm.get("reference_id") as FormControl }
     get invoice_no() { return this.userForm.get("invoice_no") as FormControl }
     get invoice_id() { return this.userForm.get("invoice_id") as FormControl }
     get unload_Advice_Item_Dtls() { return this.userForm.get("unload_Advice_Item_Dtls") as FormArray };

  ngOnInit() {
  this.status = false;
  this.userForm.patchValue({unload_no:this.Unadviceno});
  forkJoin([
    this.DropDownListService.getUnloadItemDtls(this.Id,this.Unadviceid),
  ]).subscribe(([unloadItem])=>{
    console.table(unloadItem);
    this.unload_Advice_Item_Dtls.at(0).patchValue({item_name:unloadItem[0].item_name, packing_name:unloadItem[0].packing_name,
      squantity:unloadItem[0].s_qty,quantity:unloadItem[0].quantity,itc_item_qty:unloadItem[0].itc_item_qty
    });
  });
  this.status = true;
  }

  SendDataToDifferentComponenet() {
    let itc_item_qty=this.unload_Advice_Item_Dtls.at(0).get("itc_item_qty").value;
    this.DropDownListService.updateItcitemQty(this.Unadviceid,itc_item_qty).subscribe(data=>
      {
        console.log("close check ITC QTY POPUP: "+JSON.stringify(data))
        this.dialogRef.close(data.status);
      });
  }

}
