import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { StockTransfer, stock_transfer_Item_Dtls} from '../../../../../../Models/StockTransfer/stock-transfer';

  @Component({
    selector: 'app-stock-transfer-pop-up-modal',
    templateUrl: './stock-transfer-pop-up-modal.component.html',
    styleUrls: ['./stock-transfer-pop-up-modal.component.scss']})

  export class StockTransferPopUpModalComponent implements OnInit 
  {
    public userForm1: FormGroup;
    list:any = [];
    stock_id = "0";
    status = false;
    advicedate:any;
    bunit:any;

    constructor( private fb: FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<StockTransferPopUpModalComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm1=fb.group
      ({
        order_id:[''],
        stock_transfer_Item_Dtls: this.fb.array([this.fb.group({
          checkbox: '',
          item_code:'',
          item_name: '',
          packing: '',
          packing_name: '',
          quantity: '',
          uom:'',
          squantity:'',
          suom:'',
          mat_wt: '',
          price: '',
          price_based_on:'',
          amount: '',
          gross_amt: '',
          tax_id:'',
          tax_rate:'',
          tax_amt:'',
          net_amt:'',
          acc_norms:'',	})]),
      });
      this.advicedate = data['advice_date'];
      this.bunit = data['b_unit'];
    }
     
    get stock_transfer_Item_Dtls(){{ return this.userForm1.get('stock_transfer_Item_Dtls') as FormArray;}}
  
    ngOnInit() 
    {
      this.status = false;
      this.DropDownListService.getStockTransOrds(this.advicedate, this.bunit).subscribe(data=>{this.list  = data; this.status = true;});
    }
    
    add()
    {
      this.stock_transfer_Item_Dtls.push(this.fb.group({
      checkbox: 'true',
      item_code: '',
      item_name: '',
      packing: '',
      packing_name: '',
      quantity: '',
      uom:'',
      squantity:'',
      suom:'',
      mat_wt: '',
      price: '',
      price_based_on:'',
      amount: '',
      gross_amt: '',
      tax_id:'',
      tax_rate:'',
      tax_amt:'',
      net_amt:'',
      acc_norms:''	}));
    }
  
    check1(stockTransferList:StockTransfer)
    {
      this.stock_id = stockTransferList.order_id;
      this.DropDownListService.getStockTransItemDlts(this.stock_id).subscribe(data=>
      {
        while (this.stock_transfer_Item_Dtls.length )
        this.stock_transfer_Item_Dtls.removeAt(0);

        for(let data1 of data)
        this.add();
        this.stock_transfer_Item_Dtls.patchValue(data);
        this.status = true; 
      });
    }

    SendDataToDifferentComponenet()
    {
      this.userForm1.patchValue({order_id: this.stock_id});
      this.userForm1.patchValue(this.stock_transfer_Item_Dtls.value);
      this.dialogRef.close(this.userForm1.value);  
    }
  }

