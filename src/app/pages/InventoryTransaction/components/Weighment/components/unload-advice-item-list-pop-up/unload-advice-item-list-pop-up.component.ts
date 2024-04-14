import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { UnloadAdvice, Wm_unload_advice_item_dtls } from '../../../../../../Models/Weightment/unload-advice';

@Component({
  selector: 'app-unload-advice-item-list-pop-up',
  templateUrl: './unload-advice-item-list-pop-up.component.html',
  styleUrls: ['./unload-advice-item-list-pop-up.component.scss']
})

export class UnloadAdviceItemListPopUpComponent implements OnInit {
  public userForm: FormGroup;
  adviceId: any;
  status = false;
  itemList: any = [];
  warehouses: any = [];
  stackList: any = [];
  item_sl_no = 1;

  constructor(private fb: FormBuilder,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<UnloadAdviceItemListPopUpComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.userForm = fb.group(
      {
        Wm_unload_advice_item_dtls: this.fb.array([this.fb.group({
          sl_no: this.item_sl_no,
          item_name: '',
          packing_name: '',
          quantity: '',
          uom: '',
          s_qty: '',
          s_uom: '',
          mat_wt: '',
          wearhouse: '',
          rack: '',
          base_qty: '',
          unadviceno: ''
        })]),
      });

    this.adviceId = data["advice_id"];
  }

  get Wm_unload_advice_item_dtls() { { return this.userForm.get('Wm_unload_advice_item_dtls') as FormArray; } }

  ngOnInit() {
    this.status = false;
    console.log(this.adviceId)
    this.Wm_unload_advice_item_dtls.removeAt(0);
    this.DropDownListService.wareHCodeList().subscribe(data => { this.warehouses = data; });
    this.DropDownListService.getUnloadItemList(this.adviceId).subscribe(data => {
    //this.DropDownListService.getUnloadItemListrevise(this.adviceId).subscribe(data => {
      this.status = true;
      this.item_sl_no = 0;
      let k = 0;
      for (let data1 of data) {

        //changes on 21-04-2022 bcz warehouse not included     
        /*if(data1.wearhouse !='0' || data1.wearhouse!=null || data1.wearhouse!='')
        {
          this.DropDownListService.getBinDescByWarehouse(data1.wearhouse).subscribe(stackList=>
          {      
            console.log("hello ");
            this.stackList[k]=stackList ;  
            this.add();
            k = k + 1;
            this.Wm_unload_advice_item_dtls.patchValue(data);
            this.status=true; 
          });
        }
*/
        //changes ends  on 21-04-2022 bcz warehouse not included 

        console.log("ITEM Unload:: " + JSON.stringify(data));
        this.add();
        k = k + 1;
        this.Wm_unload_advice_item_dtls.patchValue(data);
        this.status = true;

      }
    });
  }


  add() {
    this.item_sl_no = this.item_sl_no + 1;
    this.Wm_unload_advice_item_dtls.push(this.fb.group({
      sl_no: this.item_sl_no,
      item_name: '',
      packing_name: '',
      quantity: '',
      uom: '',
      s_qty: '',
      s_uom: '',
      mat_wt: '',
      wearhouse: '',
      rack: '',
      base_qty: '',
      unadviceno: '',
    }))
  }

  SendDataToDifferentComponenet() { }

}
