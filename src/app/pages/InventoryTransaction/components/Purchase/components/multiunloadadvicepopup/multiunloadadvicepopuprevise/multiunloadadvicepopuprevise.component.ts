import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { forkJoin } from 'rxjs';
import { PurchaseModuleServiceService } from '../../../../../../../service/purchase-module-service.service';
import { DropdownServiceService } from '../../../../../../../service/dropdown-service.service';

@Component({
  selector: 'app-multiunloadadvicepopuprevise',
  templateUrl: './multiunloadadvicepopuprevise.component.html',
  styleUrls: ['./multiunloadadvicepopuprevise.component.scss']
})
export class MultiunloadadvicepopupreviseComponent implements OnInit {

  public userForm1: FormGroup;
  ncList: {};
  list: {};
  description: String;
  unadvice_id: any;
  itemtype: boolean = false;
  businessUnit: any;
  supplier: any;
  purtype: any;
  pursubtype: any;
  orderdate: any;
  Stringunloadadvice: any = [];
  showsubmitbutton: boolean = true;
  mcheck: any;
  status: any;
  order_id: any;
  checkingpurchaseid = '0';
  showsubmitbutton1: boolean = false;
  checkSubmit: any = [];
  Id: any;
  showbutton: boolean = true;
  staticArray: any = [];
  Stringwgmtid: any = [];
  Wgmtid: any;

  constructor(private fb: FormBuilder, private Service: PurchaseModuleServiceService, private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<MultiunloadadvicepopupreviseComponent>, @Inject(MAT_DIALOG_DATA) data) {

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
        wgmtid: [''],
        stringunloadadvice: [''],
        stringwgmtid: [''],

        multiunloadadvice_details: this.fb.array([this.fb.group({
          checkbox: '',
          referance_id: '',
          unadviceno: '',
          weigmentno: '',
          item_subtypename: '',
          supp_name: '',
          unadviceid: '',
          total_qty_check: '',
          total_stock_qtycheck: '',
          total_mtwt_check: '',
          total_base_check: '',
        })]),



        grn_unload_item_list: this.fb.array([this.fb.group({
          checkbox: '',
          item_code: '',
          item_name: '',
          classified_item_name: '',
          packing: '',
          packing_name: '',
          quantity: '',
          uom: '',
          s_qty: '',
          s_uom: '',
          mat_wt: '',
          wearhouse: '',
          wearhouse_name: '',
          rack: '',
          rack_name: '',
          base_qty: '',

        })]),

      });
  }

  get multiunloadadvice_details() { { return this.userForm1.get('multiunloadadvice_details') as FormArray; } }
  get grn_unload_item_list() { { return this.userForm1.get('grn_unload_item_list') as FormArray; } }


  add() {
    this.multiunloadadvice_details.push(this.fb.group({
      checkbox: 'true',
      referance_id: '',
      unadviceno: '',
      weigmentno: '',
      item_subtypename: '',
      supp_name: '',
      unadviceid: '',
      total_qty_check: '',
      total_stock_qtycheck: '',
      total_mtwt_check: '',
      total_base_check: '',
    }));


  }

  ngOnInit() {
    if (this.Id == 0)//on first time 
    {
      this.showbutton = true;
      this.status = false;
      if (this.itemtype == true) {
        let type = "Item";
        let k: number = 0;
        // console.log("ancsdghdahasdh :: "+this.businessUnit+" / " +  this.supplier+" / " + this.itemtype +" / " + this.purtype + " / " + this.pursubtype + " / " + this.orderdate);
        //this.DropDownListService.getUnloadAdvRefPOwt2Argnew(this.businessUnit, this.supplier,type,this.purtype,this.pursubtype,this.orderdate).subscribe(data=>
        this.DropDownListService.getUnloadAdvRefPOwt2ArgnewMultiItemGRN(this.businessUnit, this.supplier, type, this.purtype, this.pursubtype, this.orderdate).subscribe(data => {
          console.log("dataview  :: " + JSON.stringify(data))
          while (this.multiunloadadvice_details.length)
            this.multiunloadadvice_details.removeAt(0);
          for (let v = 0; v < data.length; v++) {

            this.add();
            this.multiunloadadvice_details.at(v).patchValue({ checkbox: false, referance_id: data[v].pur_orderid, unadviceno: data[v].unadviceno, weigmentno: data[v].weighment_id, item_subtypename: data[v].item_subtypename, supp_name: data[v].supp_name, unadviceid: data[v].unadviceid, total_qty_check: '0', total_stock_qtycheck: '0', total_mtwt_check: '0', total_base_check: '0' });
            this.DropDownListService.checkmulticheck(data[v].pur_orderid).subscribe(data12 => {
              if (data12.madvice_sin_grn == true) {
                console.log(data[v].weighment_id);
              }
              else { }
            });
          }
          this.status = true;
        });
      }
      if (this.itemtype == false) {
        let k = 0;
        let type = "Service";
        this.DropDownListService.getUnloadAdvRefPOwt2Argnew(this.businessUnit, this.supplier, type, this.purtype, this.pursubtype, this.orderdate).subscribe(data => {
          while (this.multiunloadadvice_details.length)
            this.multiunloadadvice_details.removeAt(0);
          for (let v = 0; v < data.length; v++) {
            this.DropDownListService.checkmulticheck(data[v].pur_orderid).subscribe(data12 => {
              if (data12.madvice_sin_grn == 0) {
              }
              else {
                this.add();
                this.multiunloadadvice_details.at(v).patchValue({ checkbox: false, referance_id: data[v].pur_orderid, unadviceno: data[v].unadviceno, item_subtypename: data[v].item_subtypename, supp_name: data[v].supp_name, unadviceid: data[v].unadviceid, total_qty_check: '0', total_stock_qtycheck: '0', total_mtwt_check: '0', total_base_check: '0' });
              }
            });
          }
          this.status = true;
        });
      }
    }
    else {
      this.showbutton = false;
      this.status = false;
      forkJoin(
        this.Service.retrivePurchaseGRNMultipleUnloadAdvicePopup(this.Id),
        this.Service.retriveGRNItemFormultiple(this.Id)
      ).subscribe(([data, itemData]) => {
        console.log("Data12:" + JSON.stringify(data))
        console.log("chkdata12:" + JSON.stringify(itemData))
        while (this.multiunloadadvice_details.length)
          this.multiunloadadvice_details.removeAt(0);
        for (let v = 0; v < data.length; v++) {
          this.add();
          this.multiunloadadvice_details.at(v).patchValue({ checkbox: true, referance_id: data[v].pur_orderid, unadviceno: data[v].unadviceno, weigmentno: data[v].weighment_id, item_subtypename: data[v].item_subtypename, supp_name: data[v].supp_name, unadviceid: data[v].unadviceid, total_qty_check: '0', total_stock_qtycheck: '0', total_mtwt_check: '0', total_base_check: '0' });
        }

        while (this.grn_unload_item_list.length)
          this.grn_unload_item_list.removeAt(0);
        this.add2();
        for (let data1 of itemData) {
          this.grn_unload_item_list.patchValue(itemData);
          this.grn_unload_item_list.at(0).patchValue({ checkbox: true });
        }
        this.status = true;
      });

    }

  }

  add2() {
    this.grn_unload_item_list.push(this.fb.group({
      checkbox: 'true',
      item_code: '',
      item_name: '',
      classified_item_name: '',
      packing: '',
      packing_name: '',
      quantity: '',
      uom: '',
      s_qty: '',
      s_uom: '',
      mat_wt: '',
      wearhouse: '',
      wearhouse_name: '',
      rack: '',
      rack_name: '',
      base_qty: '',
    }));
  }

  check1(index, event) {
    if (this.checkingpurchaseid == '0') {
      this.checkingpurchaseid = this.multiunloadadvice_details.at(index).get("referance_id").value;
      this.unadvice_id = this.multiunloadadvice_details.at(index).get("unadviceid").value as FormControl;
    }
    if (event.checked == true) {
      if (this.checkingpurchaseid == this.multiunloadadvice_details.at(index).get("referance_id").value) {
        let unadviceid_list = "", finalunadviceid = "";
        let wgmtid_list = "", cur_wgmtid = "";
        for (let i = 0; i < this.multiunloadadvice_details.length; i++) {
          if (this.multiunloadadvice_details.at(i).get("checkbox").value == true || this.multiunloadadvice_details.at(i).get("checkbox").value == 'true') {
            unadviceid_list += this.multiunloadadvice_details.at(i).get("unadviceid").value + ",";
            wgmtid_list += this.multiunloadadvice_details.at(i).get("weigmentno").value + ",";
          }
        }
        finalunadviceid = unadviceid_list.substring(0, unadviceid_list.length - 1);
        cur_wgmtid = wgmtid_list.substring(0, wgmtid_list.length - 1);
        console.log("tuhin here " + finalunadviceid + ' // ' + cur_wgmtid);
        this.unadvice_id = finalunadviceid;
        this.Stringunloadadvice == finalunadviceid;
        this.Stringwgmtid = cur_wgmtid;
        this.Wgmtid = cur_wgmtid;

        this.DropDownListService.getUnloadItemListrevise(finalunadviceid).subscribe(itemData => {
          console.log(" ITEM::  " + JSON.stringify(itemData));
          while (this.grn_unload_item_list.length)
            this.grn_unload_item_list.removeAt(0);
          for (let i = 0; i < itemData.length; i++)
            this.add2();
          /* for(let data1 of itemData)
          { */
          this.grn_unload_item_list.patchValue(itemData);

          /* } */

          for (let i = 0; i < this.grn_unload_item_list.length; i++) {
            this.grn_unload_item_list.at(i).patchValue({ checkbox: true });
          }
        });

      }
      else {
        alert("Purchase order Number Should be same ");
        event.checked = false;
        this.multiunloadadvice_details.at(index).patchValue({ checkbox: false });
      }
    }
    if (event.checked == false) {
      let unadviceid_list = "", finalunadviceid = "";
      let wgmtid_list = "", cur_wgmtid = "";
      for (let i = 0; i < this.multiunloadadvice_details.length; i++) {
        if (this.multiunloadadvice_details.at(i).get("checkbox").value == true || this.multiunloadadvice_details.at(i).get("checkbox").value == 'true') {
          unadviceid_list += this.multiunloadadvice_details.at(i).get("unadviceid").value + ",";
          wgmtid_list += this.multiunloadadvice_details.at(i).get("weigmentno").value + ",";
        }
      }
      finalunadviceid = unadviceid_list.substring(0, unadviceid_list.length - 1);
      cur_wgmtid = wgmtid_list.substring(0, wgmtid_list.length - 1);
      this.unadvice_id = finalunadviceid;
      this.Stringunloadadvice == finalunadviceid;
      this.Stringwgmtid == cur_wgmtid;
      this.Wgmtid = cur_wgmtid;
      console.log("tuhin here else " + finalunadviceid + ' // ' + cur_wgmtid);

      this.DropDownListService.getUnloadItemListrevise(finalunadviceid).subscribe(itemData => {
        while (this.grn_unload_item_list.length)
          this.grn_unload_item_list.removeAt(0);
        this.add2();
        for (let data1 of itemData) {
          this.grn_unload_item_list.patchValue(itemData);
        }
        for (let i = 0; i < this.grn_unload_item_list.length; i++) {
          this.grn_unload_item_list.at(i).patchValue({ checkbox: true });
        }
      });
    }
  }

  SendDataToDifferentComponenet() {
    this.userForm1.patchValue({ unadviceid: this.unadvice_id, pur_orderid: this.checkingpurchaseid, stringunloadadvice: this.Stringunloadadvice, stringwgmtid: this.Stringwgmtid, wgmtid: this.Wgmtid });
    this.userForm1.patchValue(this.grn_unload_item_list.value)

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
    for (let i = 0; i < this.grn_unload_item_list.length; i++) {

      if (this.grn_unload_item_list.at(i).get("checkbox").value == true || this.grn_unload_item_list.at(i).get("checkbox").value == "true") {
        this.checkSubmit.push("true");
      }
    }
    if (this.checkSubmit.includes("true")) {
      this.showsubmitbutton1 = true;
    }
  }


}

