import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatCheckboxChange } from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { SalesOrder, sales_Order_Item_Dtls } from '../../../../../../Models/SalesTransaction/SalesOrder';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sales-order-pop-up-modal',
  templateUrl: './sales-order-pop-up-modal.component.html',
  styleUrls: ['./sales-order-pop-up-modal.component.scss']
})

export class SalesOrderPopUpModalComponent implements OnInit {
  public userForm: FormGroup;
  salesOrderList: {};
  model: sales_Order_Item_Dtls = new sales_Order_Item_Dtls();
  check: any;
  _order_id = "0";
  status = false;
  item_codes: any = [];
  packingItem: any = [];
  advice_date: any;
  BUnit: any;
  Party: any;
  MainId: any;
  itemId: any;
  pack_Item: any;
  PckQty: any;
  JsonPack_Qty: any;
  order_id: any;
  AdviceId: any;
  showsubmitbutton: boolean = true;
  showsubmitbutton1: boolean = false;
  checkSubmit: any = [];
  Uom: any;
  invType: any;
  statusmsg: any;
  Trans_borne_by_chgs: any;
  Payment_mode: any;
  Refraction: any;

  constructor(private fb: FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<SalesOrderPopUpModalComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.userForm = fb.group(
      {
        order_id: [''],
        salesuom: [''],
        inv_type: [''],
        trans_borne_by_chgs: [''],
        payment_mode: [''],

        sales_Order_Item_Dtls: this.fb.array([this.fb.group({
          order_id: '',
          hsn_code: '',
          item_code: '',
          item_name: '',
          packing: '',
          packing_name: '',
          quantity: '',
          uom: '',
          squantity: '',
          suom: '',
          mat_wt: '',
          price: '',
          price_based_on: '',
          amount: '',
          discount_type: '',
          discount_rate: '',
          tax_code: '',
          tax_rate: '',
          tax_amt: '',
          total_amt: '',
          acc_norms: '',
          discount_amt: '',
          tolerance: '',
          checkbox: ''
        })]),
      });

    this.advice_date = data.advice_date;
    this.BUnit = data.BUnit;
    this.Party = data.Party;
    this.AdviceId = data.AdviceId;
    this.MainId = data.MainId;
    this.Refraction = data.refraction;
  }
  get sales_Order_Item_Dtls() { { return this.userForm.get('sales_Order_Item_Dtls') as FormArray; } }

  company_name: any;
  ngOnInit() {
    this.company_name = localStorage.getItem("company_name");
    console.log("Refraction :: " + this.Refraction)
    this.status = false;
    if (this.Refraction) {
      forkJoin(

        this.DropDownListService.findSalesOrdersRefraction("bunit=" + this.BUnit + "&party=" + this.Party + "&invdate=" + this.advice_date)
      ).subscribe(([saleOrdData]) => {
        //console.log("tuhin here"+JSON.stringify(saleOrdData))
        this.salesOrderList = saleOrdData;
        this.status = true;

      });
    }
    else {
      forkJoin(
        //this.DropDownListService.findSalesOrders("bunit="+this.BUnit+"&party="+this.Party+"&invdate="+this.advice_date)
        this.DropDownListService.findSalesOrdersModified("bunit=" + this.BUnit + "&party=" + this.Party + "&invdate=" + this.advice_date)
      ).subscribe(([saleOrdData]) => {
        //console.log("tuhin here" + JSON.stringify(saleOrdData))
        this.salesOrderList = saleOrdData;
        this.status = true;

      });
    }
  }

  add() {
    this.sales_Order_Item_Dtls.push(this.fb.group({
      order_id: '',
      item_code: '',
      item_name: '',
      hsn_code: '',
      packing: '',
      packing_name: '',
      quantity: '',
      uom: '',
      squantity: '',
      suom: '',
      mat_wt: '',
      price: '',
      price_based_on: '',
      amount: '',
      discount_type: '',
      discount_rate: '',
      tax_code: '',
      tax_rate: '',
      tax_amt: '',
      total_amt: '',
      acc_norms: '',
      discount_amt: '',
      tolerance: '',
      checkbox: 'true'
    }));
  }

  check1(salesEnqList: SalesOrder) {
    this.invType = salesEnqList.remarks;
    this._order_id = salesEnqList.order_id;
    this.Uom = salesEnqList.we_uom;
    this.Payment_mode = salesEnqList.payment_mode;
    // console.log("trans_borne_by_chgs" + salesEnqList.trans_borne_by_chgs)
    this.Trans_borne_by_chgs = salesEnqList.trans_borne_by_chgs;
    this.status = false;
    while (this.sales_Order_Item_Dtls.length)
      this.sales_Order_Item_Dtls.removeAt(0);

    this.DropDownListService.checkcustomeramount(this._order_id, localStorage.getItem("financial_year")).subscribe(res => {
      //  console.log(" res " + JSON.stringify(res) )
      if (res["status"] == "No")//no means exceed 45lakh 
      {

        if (res["msg"] == "Cash") {
          // console.log(" cannot ")
          this.status = true;
          this.statusmsg = "Amount Exceeded from 45 lakh  ";
        }
        else {

          if (this.Refraction)
          {
            this.DropDownListService.getSalesOrdItemDtlsRefraction(this._order_id).subscribe(data => {
              for (let data1 of data)
                this.add();
              this.sales_Order_Item_Dtls.patchValue(data);
              this.status = true;
            });
          }
          else
          {
            this.DropDownListService.getSalesOrdItemDtlsNew(this._order_id).subscribe(data => {
              // console.log("tuhin here "+JSON.stringify(data))
              for (let data1 of data)
                this.add();
              this.sales_Order_Item_Dtls.patchValue(data);
              this.statusmsg = "Amount Exceeded from 45 lakh  with bank account";
              this.status = true;
            });
          }
        }
      }
      else {
        if (this.Refraction)
        {
          this.DropDownListService.getSalesOrdItemDtlsRefraction(this._order_id).subscribe(data => {
            for (let data1 of data)
              this.add();
            this.sales_Order_Item_Dtls.patchValue(data);
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.getSalesOrdItemDtlsNew(this._order_id).subscribe(data => {
            //console.log("tuhin here "+JSON.stringify(data))
            for (let data1 of data)
              this.add();
            this.sales_Order_Item_Dtls.patchValue(data);
            this.status = true;
          });
        }
      }
    });
  }

  onChangeCheckbox(event: MatCheckboxChange, index): void {
    this.itemId = this.sales_Order_Item_Dtls.at(index).get("item_code").value;
    this.pack_Item = this.sales_Order_Item_Dtls.at(index).get("packing").value;
    this.order_id = this.sales_Order_Item_Dtls.at(index).get("order_id").value;
    this.DropDownListService.getItemPackUom(this.itemId, this.pack_Item, this.company_name).subscribe(data => { this.capacity[index] = data.capacity; });

    console.log("checked: " + event.checked);
    if (event.checked) {
      if (this.MainId > 0) {
        //this.sales_Order_Item_Dtls.at(index).get("quantity").enable();
        this.sales_Order_Item_Dtls.at(index).get("squantity").enable();
        forkJoin(
          this.DropDownListService.getSalesStockDetailsThruLoad("orderid=" + this.order_id + "&bunit=" + this.BUnit + "&itemid=" + this.itemId + "&packingid=" + this.pack_Item + "&loadingid=" + this.AdviceId),
          this.DropDownListService.getItemPackUom(this.itemId, this.pack_Item, this.company_name)
        ).subscribe(([saleOrdData, forCapacity]) => {
          this.sales_Order_Item_Dtls.at(index).patchValue({ squantity: saleOrdData.sales_pack_qty });
          this.JsonPack_Qty = saleOrdData.sales_pack_qty;

          this._packing_qty = saleOrdData.sales_pack_qty;
          this._item_qty = forCapacity.capacity * saleOrdData.sales_pack_qty;

          this._item_uom = this.sales_Order_Item_Dtls.at(index).get("uom").value as FormControl;
          this.sales_Order_Item_Dtls.at(index).patchValue({ quantity: this._item_qty, mat_wt: this._item_qty });

          this._mrp = this.sales_Order_Item_Dtls.at(index).get("price").value as FormControl;
          this._priceBasedOn = this.sales_Order_Item_Dtls.at(index).get('price_based_on').value as FormControl;
          this._discount = this.sales_Order_Item_Dtls.at(index).get('discount_rate').value as FormControl;
          this._discountBasadOn = this.sales_Order_Item_Dtls.at(index).get('discount_type').value as FormControl;
          this._taxrate = this.sales_Order_Item_Dtls.at(index).get('tax_rate').value as FormControl;
          this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index);
          this.status = true;
        });
      }
      else {
        //this.sales_Order_Item_Dtls.at(index).get("quantity").enable();
        this.sales_Order_Item_Dtls.at(index).get("squantity").enable();
        forkJoin(
          this.DropDownListService.getSalesStockDetails("orderid=" + this.order_id + "&bunit=" + this.BUnit + "&itemid=" + this.itemId + "&packingid=" + this.pack_Item),
          this.DropDownListService.getItemPackUom(this.itemId, this.pack_Item, this.company_name)
        ).subscribe(([saleOrdData, forCapacity]) => {
          console.log()
          this.sales_Order_Item_Dtls.at(index).patchValue({ squantity: saleOrdData.sales_pack_qty });
          this.JsonPack_Qty = saleOrdData.sales_pack_qty;

          this._packing_qty = saleOrdData.sales_pack_qty;
          this._item_qty = forCapacity.capacity * saleOrdData.sales_pack_qty;

          this._item_uom = this.sales_Order_Item_Dtls.at(index).get("uom").value as FormControl;
          this.sales_Order_Item_Dtls.at(index).patchValue({ quantity: this._item_qty, mat_wt: this._item_qty });

          this._mrp = this.sales_Order_Item_Dtls.at(index).get("price").value as FormControl;
          this._priceBasedOn = this.sales_Order_Item_Dtls.at(index).get('price_based_on').value as FormControl;
          this._discount = this.sales_Order_Item_Dtls.at(index).get('discount_rate').value as FormControl;
          this._discountBasadOn = this.sales_Order_Item_Dtls.at(index).get('discount_type').value as FormControl;
          this._taxrate = this.sales_Order_Item_Dtls.at(index).get('tax_rate').value as FormControl;
          //this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index); 
          this.status = true;
        });
      }
    }
    else {
      //this.sales_Order_Item_Dtls.at(index).get("quantity").disable();
      this.sales_Order_Item_Dtls.at(index).get("squantity").disable();
    }
  }

  _item_qty: any;
  _packing_qty: any;
  _mrp: any;
  _taxrate: any;
  _taxAmt: any;
  _totalAmt: any;
  _netAmt: any;
  _priceBasedOn: any;
  _discount: any;
  _discountBasadOn: any;
  _item_uom: any;
  discountAmt: any;
  JsonQty: any;

  getPackingQty(packingQty, index) {
    let Checkbox = this.sales_Order_Item_Dtls.at(index).get("checkbox").value;
    let itemId1 = this.sales_Order_Item_Dtls.at(index).get("item_code").value;
    let pack_Item1 = this.sales_Order_Item_Dtls.at(index).get("packing").value;

    for (let i = 0; i < this.sales_Order_Item_Dtls.length; i++) {
      this.PckQty = this.sales_Order_Item_Dtls.at(index).get("squantity").value;
      console.log("PckQty: " + this.PckQty)
    }
    if (this.PckQty <= this.JsonQty && this.PckQty >= 1) {
      this._packing_qty = packingQty.target.value;
      this._item_qty = this.capacity[index] * packingQty.target.value;

      this._item_uom = this.sales_Order_Item_Dtls.at(index).get("uom").value as FormControl;
      this.sales_Order_Item_Dtls.at(index).patchValue({ quantity: this._item_qty.toFixed(3), mat_wt: this._item_qty.toFixed(3) });

      this._mrp = this.sales_Order_Item_Dtls.at(index).get("price").value as FormControl;
      this._priceBasedOn = this.sales_Order_Item_Dtls.at(index).get('price_based_on').value as FormControl;
      this._discount = this.sales_Order_Item_Dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = this.sales_Order_Item_Dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.sales_Order_Item_Dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index);
    }
    else {
      this.DropDownListService.getSalesStockDetails("orderid=" + this.order_id + "&bunit=" + this.BUnit + "&itemid=" + itemId1 + "&packingid=" + pack_Item1).subscribe(data => {
        this.JsonQty = data.sales_pack_qty
        alert("Packing Qty must be less or equal to " + data.sales_pack_qty + " !!!");
        this.sales_Order_Item_Dtls.at(index).get("squantity").reset();
      });
    }

  }
  getItemQty(itemQty, index) {
    this._packing_qty = this.sales_Order_Item_Dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = itemQty.target.value;
    this._mrp = this.sales_Order_Item_Dtls.at(index).get("price").value as FormControl;
    this._priceBasedOn = this.sales_Order_Item_Dtls.at(index).get('price_based_on').value as FormControl;
    this._discount = this.sales_Order_Item_Dtls.at(index).get('discount_rate').value as FormControl;
    this._discountBasadOn = this.sales_Order_Item_Dtls.at(index).get('discount_type').value as FormControl;
    this._taxrate = this.sales_Order_Item_Dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  getPrice(price, index) {
    this._packing_qty = this.sales_Order_Item_Dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.sales_Order_Item_Dtls.at(index).get("quantity").value as FormControl;
    this._mrp = price.target.value;
    this._priceBasedOn = this.sales_Order_Item_Dtls.at(index).get('price_based_on').value as FormControl;
    this._discount = this.sales_Order_Item_Dtls.at(index).get('discount_rate').value as FormControl;
    this._discountBasadOn = this.sales_Order_Item_Dtls.at(index).get('discount_type').value as FormControl;
    this._taxrate = this.sales_Order_Item_Dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  onChangePriceBasedOn(price_based_on, index) {
    this._packing_qty = this.sales_Order_Item_Dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.sales_Order_Item_Dtls.at(index).get("quantity").value as FormControl;
    this._mrp = this.sales_Order_Item_Dtls.at(index).get('price').value as FormControl;
    this._priceBasedOn = price_based_on.target.value;
    this._discount = this.sales_Order_Item_Dtls.at(index).get('discount_rate').value as FormControl;
    this._discountBasadOn = this.sales_Order_Item_Dtls.at(index).get('discount_type').value as FormControl;
    this._taxrate = this.sales_Order_Item_Dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  getDiscount(discount, index) {
    this._packing_qty = this.sales_Order_Item_Dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.sales_Order_Item_Dtls.at(index).get("quantity").value as FormControl;
    this._mrp = this.sales_Order_Item_Dtls.at(index).get('price').value as FormControl;
    this._priceBasedOn = this.sales_Order_Item_Dtls.at(index).get('price_based_on').value as FormControl;
    this._discount = discount.target.value;
    this._discountBasadOn = this.sales_Order_Item_Dtls.at(index).get('discount_type').value as FormControl;
    this._taxrate = this.sales_Order_Item_Dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  onChangeDiscountBasedOn(dis_based_on, index) {
    this._packing_qty = this.sales_Order_Item_Dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.sales_Order_Item_Dtls.at(index).get("quantity").value as FormControl;
    this._mrp = this.sales_Order_Item_Dtls.at(index).get('price').value as FormControl;
    this._priceBasedOn = this.sales_Order_Item_Dtls.at(index).get('price_based_on').value as FormControl;
    this._discount = this.sales_Order_Item_Dtls.at(index).get('discount_rate').value as FormControl;
    this._discountBasadOn = dis_based_on.target.value;
    this._taxrate = this.sales_Order_Item_Dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  amt: any;
  taxAmt: any;
  calculateItemData(packingQty, ItemQty, price, PriceBasedOn, discount, discountBasedOn, taxrate, index) {
    if (PriceBasedOn == "Packing") { this.amt = price * packingQty }

    if (PriceBasedOn == "Item") { this.amt = price * ItemQty }

    if (PriceBasedOn == "0") { this.amt = 0 }

    if (discountBasedOn == "Uom") { this.discountAmt = discount; }

    if (discountBasedOn == "%") { this.discountAmt = this.amt * (discount / 100); }

    if (discountBasedOn == "0") { this.discountAmt = 0 }

    let netAmt = this.amt - this.discountAmt;
    if (taxrate == 0) { this._taxAmt = 0; }
    else { this._taxAmt = netAmt * (taxrate / 100); }
    this._totalAmt = this._taxAmt + netAmt;
    this.sales_Order_Item_Dtls.at(index).patchValue({
      amount: (Math.round(this.amt * 100) / 100).toFixed(2),
      discount_amt: (Math.round(this.discountAmt * 100) / 100).toFixed(2), tax_amt: (Math.round(this._taxAmt * 100) / 100).toFixed(2),
      total_amt: (Math.round(this._totalAmt * 100) / 100).toFixed(2)
    });

    if (this.JsonPack_Qty == 0) {
      alert("All orders already loaded !!!..");
      this.sales_Order_Item_Dtls.removeAt(index);
    }
  }
  capacity: any = [];


  SendDataToDifferentComponenet() {
    // alert(this.sales_Order_Item_Dtls.length + " / " + this._order_id)
    this.userForm.patchValue({
      order_id: this._order_id, salesuom: this.Uom, inv_type: this.invType,
      trans_borne_by_chgs: this.Trans_borne_by_chgs, payment_mode: this.Payment_mode
    });
    this.userForm.patchValue(this.sales_Order_Item_Dtls.value);
    //  this.dialogRef.close(this.userForm.value); 

    this.submitstatus();
    if (this.showsubmitbutton == true && this.showsubmitbutton1 == true) {

      this.dialogRef.close(this.userForm.value);
    }
    else {
      alert("Please tick on checkbox!!!!");
    }
  }


  submitstatus() {
    this.checkSubmit = [];
    for (let i = 0; i < this.sales_Order_Item_Dtls.length; i++) {

      if (this.sales_Order_Item_Dtls.at(i).get("checkbox").value == true || this.sales_Order_Item_Dtls.at(i).get("checkbox").value == "true") {
        this.checkSubmit.push("true");

      }
    }

    if (this.checkSubmit.includes("true")) {

      this.showsubmitbutton1 = true;

    }
  }

}