import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { grn_unload_code_list, grn_unload_item_list } from '../../../../../../Models/transaction/PurchaseTransaction/grnPopupModal';
import { forkJoin } from 'rxjs';
import { PurchaseModuleServiceService } from '../../../../../../service/purchase-module-service.service';
import { Console } from 'console';

@Component({
  selector: 'app-unload-advice-pop-up',
  templateUrl: './unload-advice-pop-up.component.html',
  styleUrls: ['./unload-advice-pop-up.component.scss']
})

export class UnloadAdvicePopUpComponent implements OnInit {
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
  Poitemnumber: any;

  constructor(private fb: FormBuilder, private Service: PurchaseModuleServiceService, private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<UnloadAdvicePopUpComponent>, @Inject(MAT_DIALOG_DATA) data) {


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
        poitemnumber: [''],


        grn_unload_item_list: this.fb.array([this.fb.group({
          checkbox: '',
          item_code: '',
          item_name: '',
          classified_item_name: '',
          packing: '',
          packing_name: '',
          packing_item_code: '',
          packing_type: '',
          packing_size: '',
          packing_weight: '',
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
          price_based_on:''
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
      packing_item_code: '',
      packing_type: '',
      packing_size: '',
      packing_weight: '',
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
      price_based_on:''
    }));
  }

  ngOnInit() {

    if (this.Id == 0)//on first time 
    {
     // console.log("item type:" + this.itemtype)
      this.showbutton = true;
      this.status = false;
      if (this.itemtype == true) {
        let type = "Item";
       // console.log("ancsdghdahasdh :: " + this.businessUnit + " / " + this.supplier + " / " + this.itemtype + " / " + this.purtype + " / " + this.pursubtype + " / " + this.orderdate);
        //this.DropDownListService.getUnloadAdvRefPOwt2Arg(this.businessUnit, this.supplier,type,this.purtype,this.pursubtype,this.orderdate).subscribe(data=>
        this.DropDownListService.getUnloadAdvRefPOwt2ArgFastAPI(this.businessUnit, this.supplier, type, this.purtype, this.pursubtype, this.orderdate).subscribe(data => {

          this.list = data;
        //  console.log("1111111" + JSON.stringify(data));
          this.status = true;
        });
      }
      //if(this.itemtype == false)
      else {
       // console.log("Enter Else:")
        let type = "Service";
      //  console.log("service :: " + this.businessUnit + " / " + this.supplier + " / " + this.itemtype + " / " + this.purtype + " / " + this.pursubtype + " / " + this.orderdate);
        //this.DropDownListService.getUnloadAdvRefPOwt2Arg(this.businessUnit, this.supplier,type,this.purtype,this.pursubtype,this.orderdate).subscribe(data=>
        this.DropDownListService.getUnloadAdvRefPOwt2ArgFastAPI(this.businessUnit, this.supplier, type, this.purtype, this.pursubtype, this.orderdate).subscribe(data => {
        //  console.log("22222222" + JSON.stringify(data));
          this.list = data;
          this.status = true;
        });
      }
    }
    else {
      this.showbutton = false;
      this.status = false;
      this.Service.retrivePurchaseGRNUnloadAdvicePopup(this.Id).subscribe(data => {
        console.log("chkdata1:" + JSON.stringify(data))
        this.staticArray.push(data);

        this.list = this.staticArray;

        this.Service.grnItemDtlsRetriveList(data["adv_po_tag_no"]).subscribe(itemdata => {
          console.log("bid here:" + JSON.stringify(itemdata))
          while (this.grn_unload_item_list.length) {
            this.grn_unload_item_list.removeAt(0);
          }
          for (let i = 0; i < itemdata.length; i++) {
            this.add();
            this.grn_unload_item_list.at(i).patchValue({
              item_name: itemdata[i]["adv_item_name"], packing_name: itemdata[i]["adv_packing_name"],
              quantity: itemdata[i]["adv_pack_qty"], uom: itemdata[i]["adv_pack_uom"], s_qty: itemdata[i]["adv_item_qty"], s_uom: itemdata[i]["adv_item_uom"],
              mat_wt: itemdata[i]["adv_mat_wt"], wearhouse_name: itemdata[i]["warehouse_name"],
              rack_name: itemdata[i]["rack"], con_factor: itemdata[i]["con_factor"], classified_item_name: itemdata[i]["classified_item_name"],
              packing_item_code: itemdata[i]["packing_item_code"],packing_size: itemdata[i]["packing_size"],packing_weight: itemdata[i]["packing_weight"],
              packing_type: itemdata[i]["packing_type"],price_based_on: itemdata[i]["price_based_on"]
            })

          }

          this.status = true;

        });
      });
    }

  }




  check1(unloadCodeList: grn_unload_code_list) {
    console.log("unload_status" + unloadCodeList.unload_status);
    this.showsubmitbutton = true;
    if (unloadCodeList.weighment_status == 2) {
      this.unadvice_id = unloadCodeList.unadviceid;
      this.status = false;
      forkJoin(
        this.DropDownListService.getUnloadItemList(this.unadvice_id),
        this.DropDownListService.getUnloadDetails(this.unadvice_id)
      ).subscribe(([itemData, unloadData]) => {

        console.log("itemData : " + JSON.stringify(itemData))
        console.log("unloadData : " + JSON.stringify(unloadData))
        this.order_id = unloadData["pur_orderid"];
        this.Poitemnumber = unloadData["poitemnumber"];
        while (this.grn_unload_item_list.length)
          this.grn_unload_item_list.removeAt(0);
        for (let i = 0; i < itemData.length; i++)
          this.add();
        this.grn_unload_item_list.patchValue(itemData);
        this.status = true;
      });
    }
    else {
      alert("Please Complete Unload Weighment First !!!!!!!!!!!");
      for (let j = 0; j < this.grn_unload_item_list.length; j++) {
        this.grn_unload_item_list.at(j).patchValue({ item_code: "", item_name: "", packing: "", packing_name: "", quantity: "", uom: "", s_qty: "", s_uom: "", mat_wt: "", wearhouse: "", wearhouse_name: "", rack: "", rack_name: "", base_qty: "" });
      }

    }

  }

  SendDataToDifferentComponenet() {

    // alert(JSON.stringify(this.grn_unload_item_list.value) + " / " +  this.grn_unload_item_list.at(0).get("checkbox").value)
    //      for(let i=0;i<this.grn_unload_item_list.length;i++)
    //      {

    //       if(this.grn_unload_item_list.at(i).get("checkbox").value == true)
    //       {
    //         this.submitstatus=true;
    //         this.dialogRef.disableClose = true;
    //       }
    //      }
    console.log("PO ::" + this.Poitemnumber);
    this.userForm1.patchValue({ unadviceid: this.unadvice_id, pur_orderid: this.order_id, poitemnumber: this.Poitemnumber });
    this.userForm1.patchValue(this.grn_unload_item_list.value)
    this.submitstatus();
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
        this.checkSubmit.push("true");
      }
    }
    if (this.checkSubmit.includes("true")) {
      //alert('hi');
      this.showsubmitbutton1 = true;

    }
  }



}

