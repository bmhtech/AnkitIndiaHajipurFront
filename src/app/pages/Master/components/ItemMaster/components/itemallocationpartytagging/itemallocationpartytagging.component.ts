import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-itemallocationpartytagging',
  templateUrl: './itemallocationpartytagging.component.html',
  styleUrls: ['./itemallocationpartytagging.component.scss']
})
export class ItemallocationpartytaggingComponent implements OnInit {
  public userForm: FormGroup;
  party: any;
  party_name: any;
  jw_grn_tag: any;
  allocated_qty: any;
  partyitem_qty: any;
  id: any;
  item_sl_no = 1;
  itemList: any = [];
  selectedItemName: any = [];
  deletedisable: any = [];
  msg: any;

  constructor(private fb: FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<ItemallocationpartytaggingComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    console.log("ENTRY POINT " + JSON.stringify(data))
    this.party = data["party"];
    this.party_name = data["party_name"];
    this.jw_grn_tag = data["jw_grn_tag"];
    this.allocated_qty = data["allocated_qty"];
    this.id = data["id"];
    this.partyitem_qty = data["partyitem_qty"];
    this.userForm = fb.group
      ({
        partyitem_qty: '',
        jw_grn_partywitem_details: this.fb.array([this.fb.group({
          slno: this.item_sl_no,
          jw_grn_tag: this.jw_grn_tag,
          party: this.party,
          party_name: this.party_name,
          job_item: '',
          job_item_name: '',
          qty: '',
          block: ''
        })]),
      });

    if (this.partyitem_qty > 0) {

      while (this.jw_grn_partywitem_details.length)
        this.jw_grn_partywitem_details.removeAt(0);
      let i = 0;
      for (let data12 of data["jw_grn_partywitem_details"]) {
        this.addDetails();
        this.jw_grn_partywitem_details.at(i).patchValue(data12)
        this.selectedItemName[i] = data12["job_item"];
        if (data12["block"] == "Yes") {
          this.deletedisable[i] = true
        }
        i++;
      }
    }
  }
  get jw_grn_partywitem_details() { return this.userForm.get('jw_grn_partywitem_details') as FormArray; }

  ngOnInit() {
    this.DropDownListService.getJobItemList().subscribe(itemlist => {
      this.itemList = itemlist;
      this.validAllotQtyMsg = "For Party '" + this.party_name + "' Alloted Quantity is " + this.allocated_qty;
    });
  }

  addDetails() {
    this.item_sl_no = this.jw_grn_partywitem_details.length + 1;

    this.jw_grn_partywitem_details.push(this.fb.group({
      slno: this.item_sl_no,
      jw_grn_tag: this.jw_grn_tag,
      party: this.party,
      party_name: this.party_name,
      job_item: '',
      job_item_name: '',
      qty: '',
      block: '',
    }));
    this.deletedisable[this.jw_grn_partywitem_details.length] = false;
    console.log(this.deletedisable[this.jw_grn_partywitem_details.length])
  }

  deletedetails(index) {
    if (this.item_sl_no > 1) {
      this.jw_grn_partywitem_details.removeAt(index);
      this.item_sl_no = this.item_sl_no - 1;

      this.selectedItemName.splice(index, 1);
      this.deletedisable.splice(index, 1);
    }
    else {
      this.item_sl_no = 1;
      alert("can't delete all rows");
      this.jw_grn_partywitem_details.reset();
      this.jw_grn_partywitem_details.at(0).patchValue({ slno: this.item_sl_no });
    }

    for (let i = 1; i <= this.item_sl_no; i++)
      this.jw_grn_partywitem_details.at(i - 1).patchValue({ slno: i });
  }

  onChangeItemName(index, item) {
    if (item.length && item != null) {
      this.itemList.forEach(element => {
        if (element.item_id == item) {
          this.jw_grn_partywitem_details.at(index).patchValue({ job_item: element.item_id, job_item_name: element.item_name });
        }
      });

      for (let h = 0; h < this.jw_grn_partywitem_details.length; h++) {
        if (this.jw_grn_partywitem_details.at(index).get("job_item").value == this.jw_grn_partywitem_details.at(h).get("job_item").value && h != index) {
          window.alert("Duplicate Row");
          this.deletedetails(index);
          this.selectedItemName[index] = '';

        }
      }
    }
  }

  validAllotQtyMsg: any;
  SendDataToDifferentComponenet() {

    let totalqty = 0;
    for (let i = 0; i < this.jw_grn_partywitem_details.length; i++) {
      totalqty += Number(this.jw_grn_partywitem_details.at(i).get("qty").value);
    }

    this.userForm.patchValue({ partyitem_qty: totalqty.toFixed(3) })
    if (Number(this.allocated_qty) == Number(totalqty.toFixed(3))) {
      this.dialogRef.close(this.userForm.getRawValue());
    }
    else {
      alert("Allocate Party Item Quantity And Total Job Item Quantity Not Matched.")

    }
  }

  checkqty(index, qty: number) {
    if (this.id > 0) {
      if (this.jw_grn_partywitem_details.at(index).get("block").value == "Yes") {
        this.DropDownListService.checkjw_itemallocation(this.party,
          this.jw_grn_partywitem_details.at(index).get("job_item").value,
          qty, this.jw_grn_partywitem_details.at(index).get("jw_grn_tag").value).subscribe(data => {

            if (data["status"] == "No") {
              this.jw_grn_partywitem_details.at(index).patchValue({ qty: data["cancel_message"] });
              this.msg = "Minimum Qty " + data["cancel_message"] + " is Required for " + this.jw_grn_partywitem_details.at(index).get("job_item_name").value;
            }
            else {
              this.msg = "";
            }

            if (this.jw_grn_partywitem_details.at(index).get("qty").value == 0 && this.jw_grn_partywitem_details.at(index).get("block").value == "Yes") {
              this.deletedisable[index] = false;
            }
          });
      }



    }

  }

}
