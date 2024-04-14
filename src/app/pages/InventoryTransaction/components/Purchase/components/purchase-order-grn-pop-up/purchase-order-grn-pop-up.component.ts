import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin } from 'rxjs';
import { PurchaseModuleServiceService } from '../../../../../../service/purchase-module-service.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { grn_unload_code_list } from '../../../../../../Models/transaction/PurchaseTransaction/grnPopupModal';

@Component({
  selector: 'app-purchase-order-grn-pop-up',
  templateUrl: './purchase-order-grn-pop-up.component.html',
  styleUrls: ['./purchase-order-grn-pop-up.component.scss']
})
export class PurchaseOrderGrnPopUpComponent implements OnInit {


  public userForm1: FormGroup;
  ncList: {};
  list: {}
  description: String;
  unadvice_id = '0';
  itemtype: boolean = false;
  businessUnit: any;
  supplier: any;
  purtype: any;
  pursubtype: any;
  orderdate: any;
  checkboxStatus: any = [];
  showsubmitbutton: boolean = false;
  showsubmitbutton1: boolean = false;
  mcheck: any;
  status: any;
  order_id: any;
  checkSubmit: any = [];
  Id: any;
  showbutton: boolean = true;
  staticArray: any = [];
  unloadingdate: any;
  uomglobal: any;
  //changes ends on 14-04-2022

  constructor(private fb: FormBuilder, private Service: PurchaseModuleServiceService,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<PurchaseOrderGrnPopUpComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.businessUnit = data["b_unit"];
    this.supplier = data["supp_id"];
    this.itemtype = data["item_type"];
    this.purtype = data["pur_type"];
    this.pursubtype = data["pur_subtype"];
    this.orderdate = data["order_date"];
    this.Id = data["id"];

    this.userForm1 = fb.group
      ({
        unadviceid: [''],
        pur_orderid: [''],
        date: [''],
        global_uom: [''],

        grn_unload_item_list: this.fb.array([this.fb.group({
          checkbox: '',
          item_code: '',
          classified_item_name: '',
          item_name: '',
          packing: '',
          packing_name: '',
          quantity: '',
          uom: '',
          con_factor: '',
          s_qty: '',
          s_uom: '',
          mat_wt: '',
          wearhouse: '',
          wearhouse_name: '',
          rack: '',
          rack_name: '',
          base_qty: '',
          packing_item_code: '',
          packing_size : '',     
           packing_type : '',     
           packing_weight : ''
        })]),

      });


  }
  get grn_unload_item_list() { { return this.userForm1.get('grn_unload_item_list') as FormArray; } }
  add() {
    this.grn_unload_item_list.push(this.fb.group({
      checkbox: 'true',
      item_code: '',
      item_name: '',
      classified_item_name: '',
      packing: '',
      packing_name: '',
      quantity: '',
      con_factor: '',
      uom: '',
      s_qty: '',
      s_uom: '',
      mat_wt: '',
      wearhouse: '',
      wearhouse_name: '',
      rack: '',
      rack_name: '',
      base_qty: '',
      packing_item_code: '',
          packing_size : '',     
           packing_type : '',     
           packing_weight : ''
    }));
  }
  ngOnInit() {
    //   console.log("check here "+this.business_unit);
    if (this.Id == 0)//on first time 
    {
       console.log("here tuhin check " + this.purtype+" // "+ this.pursubtype)
      let type = "Item";
      this.showbutton = true;
      this.status = false;
      this.DropDownListService.getunloadstore(this.businessUnit, this.supplier, type, this.purtype, this.pursubtype, this.orderdate).subscribe(data => {

        this.list = data;
        //console.log("1111111"+JSON.stringify(data));
        this.status = true;
      });
    }
    else {

    }
  }


  check1(unloadCodeList: grn_unload_code_list) {
    console.log("unload_status" + unloadCodeList.unload_status);
    this.showsubmitbutton = true;

    this.unadvice_id = unloadCodeList.unadviceid;
    this.unloadingdate = unloadCodeList.ula_date;
    this.status = false;
    forkJoin(
      this.DropDownListService.getUnloadItemList(this.unadvice_id),
      this.DropDownListService.getUnloadDetails(this.unadvice_id)
    ).subscribe(([itemData, unloadData]) => {

      console.log("itemData : " + JSON.stringify(itemData))
      this.order_id = unloadData["pur_orderid"]
      while (this.grn_unload_item_list.length)
        this.grn_unload_item_list.removeAt(0);
      for (let i = 0; i < itemData.length; i++)
        this.add();
      this.grn_unload_item_list.patchValue(itemData);

      this.status = true;
    });


  }

  SendDataToDifferentComponenet() {

    this.submitstatus();

    this.userForm1.patchValue({ unadviceid: this.unadvice_id, pur_orderid: this.order_id, date: this.unloadingdate, global_uom: this.uomglobal });
    this.userForm1.patchValue(this.grn_unload_item_list.value)

    //alert(this.showsubmitbutton+","+this.showsubmitbutton1);
    if (this.showsubmitbutton == true && this.showsubmitbutton1 == true) {
      //alert(JSON.stringify(this.userForm1.value));
      this.dialogRef.close(this.userForm1.value);
    }
    else {
      alert("Please tick on checkbox!!!!");
    }

  }



  submitstatus() {

    this.checkSubmit = [];
    for (let i = 0; i < this.grn_unload_item_list.length; i++) {
      //alert(this.grn_unload_item_list.at(i).get("checkbox").value);

      if (this.grn_unload_item_list.at(i).get("checkbox").value == 'true' || this.grn_unload_item_list.at(i).get("checkbox").value == true) {
        //alert('Yes') ;
        this.uomglobal = this.grn_unload_item_list.at(i).get("s_uom").value;
        this.checkSubmit.push("true");
      }
    }
    if (this.checkSubmit.includes("true")) {
      //alert('hi');
      this.showsubmitbutton1 = true;

    }
  }



}

