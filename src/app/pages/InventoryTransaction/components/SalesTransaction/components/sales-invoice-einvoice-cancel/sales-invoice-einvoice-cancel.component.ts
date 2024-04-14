import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-sales-invoice-einvoice-cancel',
  templateUrl: './sales-invoice-einvoice-cancel.component.html',
  styleUrls: ['./sales-invoice-einvoice-cancel.component.scss']
})
export class SalesInvoiceEinvoiceCancelComponent implements OnInit {

  public userForm:FormGroup;
  status = false;
  constructor( private fb: FormBuilder,
    private dialogRef: MatDialogRef<SalesInvoiceEinvoiceCancelComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm=fb.group(
        {
          cencel_message: ['']
        });
    }
    get cencel_message(){ return this.userForm.get("cencel_message") as FormControl }

  ngOnInit() 
  {
    this.status=true;
  }

  SendDataToDifferentComponenet()
    {
      this.userForm.patchValue({cencel_message:this.userForm.get("cencel_message").value});
      this.dialogRef.close(this.userForm.value); 
    }
}
