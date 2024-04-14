import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { SalesOrder } from '../../../../../../Models/SalesTransaction/SalesOrder';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

@Component({
  selector: 'app-liew-saleorder-popup',
  templateUrl: './liew-saleorder-popup.component.html',
  styleUrls: ['./liew-saleorder-popup.component.scss']
})
export class LiewSaleorderPopupComponent implements OnInit {


  public userForm:FormGroup;
    saleorderlist:any = [];
    saleid:any;


    
  constructor(private fb: FormBuilder,private DropDownListService: DropdownServiceService,private dialogRef: MatDialogRef<LiewSaleorderPopupComponent>) 
  {
    this.userForm=fb.group(
      {
        sale_id: [''],
        sale_order_id:['']
      });
   }
   get sale_id(){return this.userForm.get("sale_id") as FormControl};
   get sale_order_id(){return this.userForm.get("sale_order_id") as FormControl};
  ngOnInit()
   {
    this.DropDownListService.getliewterminationsalelist().subscribe(data=>
      {
        console.log(JSON.stringify(data));
        this.saleorderlist=data;

      });
  }

  check1(salesOrdList:SalesOrder)
  {
         this.saleid=salesOrdList.id
         this.userForm.patchValue({sale_id:salesOrdList.id,sale_order_id:salesOrdList.order_id})
  }

  send()
  {
    this.dialogRef.close(this.userForm.getRawValue());
  }

}
