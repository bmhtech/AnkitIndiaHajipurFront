import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Master } from '../../../../../../../service/master.service';

@Component({
  selector: 'app-deletesalestransportremarkpopup',
  templateUrl: './deletesalestransportremarkpopup.component.html',
  styleUrls: ['./deletesalestransportremarkpopup.component.scss']
})
export class DeletesalestransportremarkpopupComponent implements OnInit {
  public userForm: FormGroup;
  status = false;
  id: any;
  obj: any;

  constructor(private fb: FormBuilder, private Service: Master,
    private dialogRef: MatDialogRef<DeletesalestransportremarkpopupComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.userForm = fb.group(
      {
        del_remarks: [''],
      });
    this.id = data['id'];
    this.obj = data['obj'];
  }

  ngOnInit() {
    this.status = true;
    console.log("DATA :: " + JSON.stringify(this.obj));
    console.log("ID :: " + JSON.stringify(this.id));
  }

  SendDataToDifferentComponenet() {
    let reason = this.userForm.get("del_remarks").value;
    this.status = false;
    if (reason == '' || reason == "NA" || reason == null || reason == '0' || reason == '') {
      alert("Please Provide Reason of Deletion...");
      this.status = true;
    }
    else {
      this.Service.deleteSalesTransport(this.obj, this.id, reason).subscribe(data => {
        alert("Sales Transport Deleted Successfully..");
        this.status = true;
        this.ngOnInit();
        this.dialogRef.close();
      });
    }
  }
}
