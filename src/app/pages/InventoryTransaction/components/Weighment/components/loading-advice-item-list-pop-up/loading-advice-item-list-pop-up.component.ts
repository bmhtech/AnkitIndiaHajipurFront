import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { LoadingAdvice, Wm_loading_advice_itm_dtls } from '../../../../../../Models/Weightment/loading-advice';

@Component({
  selector: 'app-loading-advice-item-list-pop-up',
  templateUrl: './loading-advice-item-list-pop-up.component.html',
  styleUrls: ['./loading-advice-item-list-pop-up.component.scss']
})

export class LoadingAdviceItemListPopUpComponent implements OnInit {
  public userForm: FormGroup;
  adviceId: any;
  status = false;
  itemList: any = [];
  warehouses: any = [];
  stackList: any = [];
  item_sl_no = 1;

  constructor(private fb: FormBuilder,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<LoadingAdviceItemListPopUpComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.userForm = fb.group(
      {
        total_weight: [''],
        Wm_loading_advice_itm_dtls: this.fb.array([this.fb.group({
          sl_no: this.item_sl_no,
          item_name: '',
          packing_name: '',
          quantity: '',
          uom: '',
          s_quantity: '',
          s_uom: '',
          mat_wt: '',
          warehouse: '',
          stack_rack: '',
          base_qty: '',
          advice_no: ''
        })]),
      });

    this.adviceId = data["advice_id"];
  }

  get Wm_loading_advice_itm_dtls() { { return this.userForm.get('Wm_loading_advice_itm_dtls') as FormArray; } }

  ngOnInit() {
    this.status = false;
    this.Wm_loading_advice_itm_dtls.removeAt(0);
    this.DropDownListService.wareHCodeList().subscribe(data => { this.warehouses = data; });
    this.DropDownListService.loadingItemRetriveList(this.adviceId).subscribe(data => {
      this.status = true;
      this.item_sl_no = 0;
      let totalweighr: number = 0;
      let k = 0;
      console.log("ITEM load :: " + JSON.stringify(data));
      for (let data1 of data) {
        this.DropDownListService.getBinDescByWarehouse(data1.warehouse).subscribe(stackList => {
          this.stackList[k] = stackList;
          this.add();
          totalweighr += data1["mat_wt"]
          k = k + 1;
          this.Wm_loading_advice_itm_dtls.patchValue(data);
          this.userForm.patchValue({ total_weight: Number(this.round(totalweighr, 2)) })
          this.status = true;
        });
      }
    });
  }

  round(num, decimalPlaces = 0) {
    var p = Math.pow(10, decimalPlaces);
    var n = (num * p) * (1 + Number.EPSILON);
    return Math.round(n) / p;
  }

  add() {
    this.item_sl_no = this.item_sl_no + 1;
    this.Wm_loading_advice_itm_dtls.push(this.fb.group({
      sl_no: this.item_sl_no,
      item_name: '',
      packing_name: '',
      quantity: '',
      uom: '',
      s_quantity: '',
      s_uom: '',
      mat_wt: '',
      warehouse: '',
      stack_rack: '',
      base_qty: '',
      advice_no: '',
    }))
  }

  SendDataToDifferentComponenet() { }

}
