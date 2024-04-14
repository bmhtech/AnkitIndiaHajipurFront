import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { PurchaseOrder, PurchaseOrderItem } from '../../../../../../models/transaction/PurchaseTransaction/PurchaseOrder';

  @Component({
    selector: 'app-purchage-order-item-dtls-pop-up',
    templateUrl: './purchage-order-item-dtls-pop-up.component.html',
    styleUrls: ['./purchage-order-item-dtls-pop-up.component.scss']
  })

  export class PurchageOrderItemDtlsPopUpComponent implements OnInit 
  {
    list:any = [];
    purOrderId:any;
    unloadAdviceId:any;
    status = false;

    constructor( private fb: FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<PurchageOrderItemDtlsPopUpComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.purOrderId = data["pur_ord_id"];
      this.unloadAdviceId = data["unloadAdviceId"];
    }
  
     ngOnInit() 
     {
        this.status = false;
        this.DropDownListService.getUnloadAdvPOItemDtls(this.unloadAdviceId, this.purOrderId).subscribe(data=>
        {
          this.list  = data;
          this.status = true;
        });
     }

  }
