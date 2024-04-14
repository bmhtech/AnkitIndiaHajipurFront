import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { item_opening_stk_pack_dtls} from '../../../../../../Models/ItemModel/item-opening-stock';
import { forkJoin } from 'rxjs';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-packing-item-details-popup',
  templateUrl: './packing-item-details-popup.component.html',
  styleUrls: ['./packing-item-details-popup.component.scss']
})
export class PackingItemDetailsPopupComponent implements OnInit 
{
  public userForm:FormGroup;
  status = false;
  Item_Id:any;
  item_codes:any = [];
  PackingList:any =[];
  ItemQty:any;
  Capacity:any;
  Packing_Qty:any;
  Item_Qty:any;
  ItemQtySum:any;
  Tolerance:any;
  MinItemQty:any;
  MaxItemQty:any;

  constructor( private fb: FormBuilder, private Service : Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<PackingItemDetailsPopupComponent>, @Inject(MAT_DIALOG_DATA)data)
  {
    this.userForm=fb.group(
      {
        item_qty_total:[''],
        item_opening_stk_pack_dtls: this.fb.array([this.fb.group({
          packing_id:'',
          item_id:'',
          open_packing_qty:'',
          packing_uom:'',
          open_item_qty:'',
          item_uom:'',
          tolerance:'', 
          capacity:''
        })]),
      });
      this.Item_Id=data.Item_Id;
  }
  get item_opening_stk_pack_dtls(){{ return this.userForm.get('item_opening_stk_pack_dtls') as FormArray;}}

  company_name:any;
  ngOnInit() 
  {
    this.company_name = localStorage.getItem("company_name");
    this.status = true;
    forkJoin(
      this.Service.findAllItems(), 
      this.DropDownListService.getItemMasterPackMat(this.Item_Id),
      this.DropDownListService.getItemMasterPackMaterials(this.Item_Id)   
    ).subscribe(([ItemList,packingData, ItemData])=>
    { 
      this.item_codes = ItemList;
      let i =0;
      this.add();
      while(this.item_opening_stk_pack_dtls.length)
      this.item_opening_stk_pack_dtls.removeAt(0);
      for(let data1 of ItemData)
      { 
        this.add();
        this.item_opening_stk_pack_dtls.at(i).patchValue({item_id: data1.item_id,packing_id:data1.item_code,
          item_uom:data1.item_uom,tolerance:data1.tolerance,packing_uom:data1.uom1, capacity:data1.capacity});
        i=i+1;
      }
      this.PackingList = packingData;
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
  }

  add()
  {
    this.item_opening_stk_pack_dtls.push(this.fb.group({
        packing_id:'',
        item_id:'',
        open_packing_qty:'',
        packing_uom:'',
        open_item_qty:'',
        item_uom:'',
        tolerance:'',
        capacity:'' 
    }))
  }

  getPackingQty(packingQty, index)
  {
    this.Capacity = this.item_opening_stk_pack_dtls.at(index).get("capacity").value;
    this.Tolerance = this.item_opening_stk_pack_dtls.at(index).get("tolerance").value;
    this.Packing_Qty = packingQty.target.value;
    this.Item_Qty = this.Capacity * this.Packing_Qty;
    this.item_opening_stk_pack_dtls.at(index).patchValue({open_item_qty:this.Item_Qty.toFixed(3)});
    this.ItemQtySum = 0;
    for(let i = 0; i<this.item_opening_stk_pack_dtls.length; i++)
    {
      this.ItemQtySum += Number(this.item_opening_stk_pack_dtls.at(i).get("open_item_qty").value);
      console.log(" itemsum : "+this.ItemQtySum);
    }
    if(this.Tolerance==0)
    {this.item_opening_stk_pack_dtls.at(index).get("open_item_qty").disable();}
    else
    {
      this.item_opening_stk_pack_dtls.at(index).get("open_item_qty").enable();
      this.ItemQty = this.item_opening_stk_pack_dtls.at(index).get("open_item_qty").value;
      let percentageValue = this.ItemQty*(this.Tolerance/100);
      console.log(" percentageValue : "+percentageValue);
      this.MaxItemQty =Number(this.ItemQty) + Number(percentageValue);     
      console.log(" MaxItemQty : "+this.MaxItemQty);
      this.MinItemQty = this.ItemQty - percentageValue;
      console.log(" MinItemQty : "+this.MinItemQty);   
    }
  }

  onchangeItemQty(ItemQty, index)
  {
     ItemQty = ItemQty.target.value;
     if(this.MaxItemQty>=ItemQty && this.MinItemQty<=ItemQty)
     {}
     else
     {
       alert("Item Qty must be within "+this.MinItemQty.toFixed(2)+" to "+this.MaxItemQty.toFixed(2));
       this.item_opening_stk_pack_dtls.at(index).patchValue({open_item_qty:null});
     }
  }

  SendDataToDifferentComponenet()
  {
    this.userForm.patchValue({item_qty_total:this.ItemQtySum});
    this.dialogRef.close(this.userForm.getRawValue());
  }
}
