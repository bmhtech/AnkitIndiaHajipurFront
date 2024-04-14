import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { LoadingAdvice } from '../../../../../../Models/Weightment/loading-advice';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-delivery-challan-jobwork-popup',
  templateUrl: './delivery-challan-jobwork-popup.component.html',
  styleUrls: ['./delivery-challan-jobwork-popup.component.scss']
})
export class DeliveryChallanJobworkPopupComponent implements OnInit {

  public userForm: FormGroup;
  challanDate: any;
  partyid: any;
  Id: any;
  inv_type: any;
  AdviceList: any = [];
  showbutton: boolean = false;
  _advice_id: any;
  status = false;
  showsubmitbutton: boolean = true;
  showsubmitbutton1: boolean = false;
  checkSubmit: any = [];


  constructor(private fb: FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<DeliveryChallanJobworkPopupComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.challanDate = data["delivery_date"];
    this.partyid = data.partyid;
    this.Id = data['id'];
    this.inv_type = data['inv_type'];

    this.userForm = fb.group(
      {
        advice_id: [''],

        wm_loading_advice_Item_Dtls_for_jobwork: this.fb.array([this.fb.group({
          job_item: '',
          job_item_name: '',
          job_packing: '',
          job_packing_name: '',
          job_hsn: '',
          pack_qty: '',
          pack_uom: '',
          price_based_on: '',
          item_qty: '',
          item_uom: '',
          mat_wt: '',
          tolerance: '',
          checkbox: ''
        })]),



      });

  }

  get wm_loading_advice_Item_Dtls_for_jobwork() { { return this.userForm.get('wm_loading_advice_Item_Dtls_for_jobwork') as FormArray; } }

  ngOnInit() {
    if (this.Id == 0)//on first time 
    {

      this.DropDownListService.getLoadAdvThruWeighment(this.challanDate, this.partyid, this.inv_type).subscribe(data => {
        this.showbutton = true;
        this.AdviceList = data;
        this.status = true;
      });
    }

  }


  add() {
    this.wm_loading_advice_Item_Dtls_for_jobwork.push(this.fb.group({
      job_item: '',
      job_item_name: '',
      job_packing: '',
      job_packing_name: '',
      job_hsn: '',
      pack_qty: '',
      pack_uom: '',
      price_based_on: '',
      item_qty: '',
      item_uom: '',
      mat_wt: '',
      tolerance: '',
      checkbox: 'true'
    }))
  }



  check1(loadingAdviceList: LoadingAdvice) {
    this._advice_id = loadingAdviceList.advice_id;
    this.status = false;

    forkJoin(
      //this.DropDownListService.checkjobworkrestwt(this._advice_id),
      this.DropDownListService.loadingItemjobworkRetriveList(this._advice_id)
    )
      .subscribe(([data]) => {    // res, 
        //if (res["status"] == 'Yes') {
          
          while (this.wm_loading_advice_Item_Dtls_for_jobwork.length)
            this.wm_loading_advice_Item_Dtls_for_jobwork.removeAt(0);
          for (let i = 0; i < data.length; i++)
            this.add();
          this.wm_loading_advice_Item_Dtls_for_jobwork.patchValue(data);
          this.status = true;
        //}
        /* else {
          alert("Please Contact Jitesh Sir for JobWork Item Allocation Update in PO.");
          this.status = true;
        } */


      });


  }

  SendDataToDifferentComponenet() {

    this.userForm.patchValue({ advice_id: this._advice_id })
    this.userForm.patchValue(this.wm_loading_advice_Item_Dtls_for_jobwork.value)

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
    for (let i = 0; i < this.wm_loading_advice_Item_Dtls_for_jobwork.length; i++) {

      if (this.wm_loading_advice_Item_Dtls_for_jobwork.at(i).get("checkbox").value == true || this.wm_loading_advice_Item_Dtls_for_jobwork.at(i).get("checkbox").value == "true") {
        this.checkSubmit.push("true");

      }
    }

    if (this.checkSubmit.includes("true")) {

      this.showsubmitbutton1 = true;

    }
  }



}
