import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { IndentOrder, IndentorderDetail} from '../../../../../../models/StockTransfer/indent-order';

  @Component({
    selector: 'app-stock-item-popup',
    templateUrl: './stock-item-popup.component.html',
    styleUrls: ['./stock-item-popup.component.scss']
  })

  export class StockItemPopupComponent implements OnInit 
  {
    public userForm:FormGroup;
    stockDocsList:any = [];
    _indent_id:any;
    check : any;
    status=false;

    constructor(public fb:FormBuilder, private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<StockItemPopupComponent>,
      @Inject(MAT_DIALOG_DATA) data)
    {
      this.userForm=fb.group
      ({     
        IndentorderDetail: this.fb.array([this.fb.group({
        indent_no:'',
        indent_id:'',
        item_code:'',
        item_name:'',
        packing_item_name:'',
        req_date:'',
        packing_item:'',
        indent_item_qty:'',
        indent_pack_qty:'',
        stock_pack_uom:'',
        stock_item_uom:'',
        item_qty:'',
        indicative_price:'',
        price_based_on:'',
        amount:'',         
        qc_norms:'',
        priority:'',
        delivery_date:'',
        purpose:'',
        to_be_used:'',
        remarks:'',
        checkbox:'',
        net_amount:'',
        tax_code:'',
        tax_rate:'',
        tax_amount:'',
        total_amount:'',
      })])
      });
    }

    get IndentorderDetail(){ return this.userForm.get('IndentorderDetail') as FormArray;}

    ngOnInit() 
    {
      this.status = false;
      this.DropDownListService.getStkIndOrder().subscribe(data=>
      {
        this.stockDocsList  = data;
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
    }

    add()
    {
      this.IndentorderDetail.push(this.fb.group({
        indent_no:'',
        indent_id:'',
        item_code:'',
        item_name:'',
        packing_item_name:'',
        req_date:'',
        packing_item:'',
        indent_item_qty:'',
        indent_pack_qty:'',
        stock_pack_uom:'',
        stock_item_uom:'',
        item_qty:'',
        indicative_price:'',
        price_based_on:'',
        amount:'',         
        qc_norms:'',
        priority:'',
        delivery_date:'',
        purpose:'',
        to_be_used:'',
        remarks:'',
        checkbox:'',
        net_amount:'',
        tax_code:'',
        tax_rate:'',
        tax_amount:'',
        total_amount:'',}));
    }

    check1(indentList:IndentOrder)
    {
      this._indent_id = indentList.indent_id;
      this.status = false;
      this.DropDownListService.getStkIndentOrderDetailsList(this._indent_id).subscribe(data=>
      {
        while (this.IndentorderDetail.length ) {this.IndentorderDetail.removeAt(0);}
        for(let i=0;i<data.length;i++){this.add(); }
        this.IndentorderDetail.patchValue(data);
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
    }
     
    SendDataToDifferentComponenet()
    {
    
      this.dialogRef.close(this.IndentorderDetail.value);  
    }

  }
