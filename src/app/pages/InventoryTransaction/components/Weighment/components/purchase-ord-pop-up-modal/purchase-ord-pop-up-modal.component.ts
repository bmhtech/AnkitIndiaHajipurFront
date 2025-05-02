import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { PurchaseOrder, PurchaseOrderItem } from '../../../../../../Models/transaction/PurchaseTransaction/PurchaseOrder';

@Component({
  selector: 'app-purchase-ord-pop-up-modal',
  templateUrl: './purchase-ord-pop-up-modal.component.html',
  styleUrls: ['./purchase-ord-pop-up-modal.component.scss']
})

export class PurchaseOrdPopUpModalComponent implements OnInit {
  public userForm1: FormGroup;
  list: any = [];
  reference_value: any;
  supplierId: any;
  business_unit: any;
  weightment_req: any;
  order_id = "0";
  status = false;
  //changes on 14-04-2022
  totalqty: any;
  uom: any;
  showsubmitbutton: boolean = true;

  checked_totalqty = "0";
  checked_uom = "0";
  showsubmitbutton1: boolean = false;
  checkSubmit: any = [];
  itemsubtype: any;
  poitemstatus: any;
  consignmenttype: any;
  ser_item_subtype_name: any;
  Item_subtype: any;

  //changes ends on 14-04-2022

  constructor(private fb: FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<PurchaseOrdPopUpModalComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.userForm1 = fb.group
      ({
        pur_orderid: [''],
        poitemnumber: [''],
        consignment_type: [''],
        ser_item_subtype: [''],
        //changes on 14-04-2022

        //changes ends on 14-04-2022
        PurchaseOrderItem: this.fb.array([this.fb.group({
          checkbox: '',
          item_code: '',
          item_name: '',
          classified_item_name: '',
          packing_item: '',
          packing_item_name: '',
          packing_item_code: '',
          packing_size: '',
          packing_weight: '',
          packing_type: '',
          packing_uom: '',
          packing_qty: '',
          stock_uom: '',
          stock_qty: '',
          price: '',
          con_factor: '',
          mat_weight: '',
          price_based_on: '',
          amount: '',
          discount: '',
          discount_basedon: '',
          discount_amount: '',
          net_amount: '',
          tax_code: '',
          tax_rate: '',
          tax_amount: '',
          total_amount: '',
          qc_norms: '',
          priority: '',
          delivery_date: '',
          purpose: '',
          to_be_used: '',
          remarks: '',

          final_mat_wt: '',
          no_advice_cal: '',
          id: '',

        })]),
        weightment_req: [''],
        total_qty_copy: [''],
        staticuom: [''],
        item_subtype: [''],

      });
    this.reference_value = data["ref_type"];
    this.supplierId = data["supplier_id"];
    this.business_unit = data["business_unit"];
    this.Item_subtype = data["item_subtype"];
    //  console.log("hello popup :: "+JSON.stringify(data));
  }

  get PurchaseOrderItem() { { return this.userForm1.get('PurchaseOrderItem') as FormArray; } }

  ngOnInit() {
       console.log("check here "+this.Item_subtype);
    this.status = false;
    if(this.Item_subtype=='ITMT00004')
    {
      this.DropDownListService.getPurOrdListOnlyStorePurchase(this.supplierId, this.business_unit).subscribe(data => {
        this.list = data;
        this.status = true;
        console.log("PO : : "+JSON.stringify(data));
        this.business_unit = data["business_unit"];
      });
    }
    else if(this.Item_subtype=='ITMT00002')
    {
      this.DropDownListService.getPurOrdListOnlyPacking(this.supplierId, this.business_unit).subscribe(data => {
        this.list = data;
        this.status = true;
        console.log("PO : : "+JSON.stringify(data));
        this.business_unit = data["business_unit"];
      });
    }
    else
    {
      //this.DropDownListService.getPurOrdAdvThruSupp(this.supplierId, this.business_unit).subscribe(data => {
      this.DropDownListService.getPurOrdAdvThruSuppFast(this.supplierId, this.business_unit).subscribe(data => {
        this.list = data;
        this.status = true;
        //console.log("PO : : "+JSON.stringify(data));
        this.business_unit = data["business_unit"];
      });
    }
    
  }

  add() {
    this.PurchaseOrderItem.push(this.fb.group({
      checkbox: 'true',
      item_code: '',
      item_name: '',
      classified_item_name: '',
      packing_item: '',
      packing_item_name: '',
      packing_item_code: '',
      packing_size: '',
      packing_weight: '',
      packing_type: '',
      packing_uom: '',
      packing_qty: '',
      stock_uom: '',
      stock_qty: '',
      price: '',
      mat_weight: '',
      con_factor: '',
      price_based_on: '',
      amount: '',
      discount: '',
      discount_basedon: '',
      discount_amount: '',
      net_amount: '',
      tax_code: '',
      tax_rate: '',
      tax_amount: '',
      total_amount: '',
      qc_norms: '',
      priority: '',
      delivery_date: '',
      purpose: '',
      to_be_used: '',
      remarks: '',

      final_mat_wt: '',
      no_advice_cal: '',
      id: '',


    }));
  }

  check1(purOrderList: PurchaseOrder) {
    this.status = false;
    this.showsubmitbutton = true;
    this.order_id = purOrderList.pur_orderid;
    this.poitemstatus = purOrderList.poitemnumber;
    this.ser_item_subtype_name = purOrderList.ser_item_subtype;
    this.totalqty = purOrderList.total_qty;
    //console.log("orderid::" + purOrderList.pur_orderid + " CONGIS " + purOrderList.consignment_type)
    // this.totalqty = purOrderList.total_qty_copy;
    this.uom = purOrderList.staticuom;
    this.itemsubtype = purOrderList.ser_item_subtype;
    this.consignmenttype = purOrderList.consignment_type;
    this.weightment_req = purOrderList.weightment_req;
    // console.log("this.order_id :: "+ this.order_id + " // " +this.totalqty+" // "+this.uom +" // " +this.weightment_req);

    if (this.Item_subtype == 'ITMT00004') {
        this.DropDownListService.getpurorderstorepurchase(this.order_id).subscribe(data => {
          console.log("final store item:"+JSON.stringify(data))
          while (this.PurchaseOrderItem.length) { this.PurchaseOrderItem.removeAt(0); }
          for (let i = 0; i < data.length; i++) { this.add(); }
          this.PurchaseOrderItem.patchValue(data);
          this.status = true;
        });
    }
    else if(this.Item_subtype == 'ITMT00002')
    {
      this.DropDownListService.getpurorderpacking(this.order_id).subscribe(data => {
        console.log("final store item:"+JSON.stringify(data))
        while (this.PurchaseOrderItem.length) { this.PurchaseOrderItem.removeAt(0); }
        for (let i = 0; i < data.length; i++) { this.add(); }
        this.PurchaseOrderItem.patchValue(data);
        this.status = true;
      });
    } 
    else{
      this.DropDownListService.getPurOrdCNQUPList(this.order_id).subscribe(data => {
        while (this.PurchaseOrderItem.length) { this.PurchaseOrderItem.removeAt(0); }
        for (let i = 0; i < data.length; i++) { this.add(); }
        this.PurchaseOrderItem.patchValue(data);
        this.status = true;
      });
    }
  }

  SendDataToDifferentComponenet() {

    console.log("check data1 :" + this.consignmenttype);
    this.userForm1.patchValue({ pur_orderid: this.order_id })
    this.userForm1.patchValue({ poitemnumber: this.poitemstatus, consignment_type: this.consignmenttype, ser_item_subtype: this.ser_item_subtype_name })

    this.userForm1.patchValue(this.PurchaseOrderItem.value)
    this.userForm1.patchValue({ weightment_req: this.weightment_req })
    //changes on 14-04-2022
    this.userForm1.patchValue({ total_qty_copy: this.totalqty })
    this.userForm1.patchValue({ staticuom: this.uom })
    //
    this.userForm1.patchValue({ item_subtype: this.itemsubtype })
    //changes ends on 14-04-2022
    this.submitstatus();
    if (this.showsubmitbutton == true && this.showsubmitbutton1 == true) {

      this.dialogRef.close(this.userForm1.value);
    }
    else {
      alert("Please tick on checkbox!!!!");
    }

  }



  submitstatus() {
    this.checkSubmit = [];
    for (let i = 0; i < this.PurchaseOrderItem.length; i++) {

      if (this.PurchaseOrderItem.at(i).get("checkbox").value == true || this.PurchaseOrderItem.at(i).get("checkbox").value == "true") {
        this.checkSubmit.push("true");
        //this.showsubmitbutton=false;
      }
    }

    if (this.checkSubmit.includes("true")) {
      //alert('hi');
      this.showsubmitbutton1 = true;

    }
  }

}
