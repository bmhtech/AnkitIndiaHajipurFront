import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { itemModalPopUp} from '../../../../../../Models/ItemModel/ItemMaster';

  @Component({
    selector: 'app-packing-list-pop-up',
    templateUrl: './packing-list-pop-up.component.html',
    styleUrls: ['./packing-list-pop-up.component.scss']
  })
  
  export class PackingListPopUpComponent implements OnInit 
  {
    public userForm:FormGroup;
    check:any;
    item_id:any;
    status = false;
    sales_quo:any = [];
    pagecall:any;

    constructor( private fb: FormBuilder,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<PackingListPopUpComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm=fb.group(
      {
        itemModalPopUp: this.fb.array([this.fb.group({
          checkbox:'',
          item_name: '',
          item_id: '',
        })]),
      });

      this.item_id = data.item_id;
     
      this.sales_quo = data.popup_data;
      this.pagecall=data.pagecall;
    }

     get itemModalPopUp(){{ return this.userForm.get('itemModalPopUp') as FormArray;}}

    ngOnInit() 
    {
      this.status = false;


      if(this.pagecall == "production")
      {
        //getItemThruType1
        this.DropDownListService.getItemThruType1("ITMFIXED02").subscribe(data=>
          {
           this.status = false;
           this.itemModalPopUp.removeAt(0);
            for(let data1 of data)
            {
              this.add(); 
            }
            this.itemModalPopUp.patchValue(data);
            this.status = true;
          });
    
         



      }
      else
      {
        this.DropDownListService.getItemByItemGroup(this.item_id).subscribe(data=>
          {
           this.status = false;
           this.itemModalPopUp.removeAt(0);
            for(let data1 of data)
            {
              this.add(); 
            }
            if(this.sales_quo.length == 0)
            this.itemModalPopUp.patchValue(data);
            else
            this.itemModalPopUp.patchValue(this.sales_quo);
            this.status = true;
          });
    
          this.status = true;
      }
      
    }

    add()
    {
      this.itemModalPopUp.push(this.fb.group({
        checkbox:'',
        item_name: '',
        item_id: '',
      }))
    }

  SendDataToDifferentComponenet()
  {
    this.dialogRef.close(this.itemModalPopUp.getRawValue());
  }

}
    

