import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { itemModalPopUp } from '../../../../../../Models/ItemModel/ItemMaster';
import { delay } from 'rxjs/operators';

  @Component({
    selector: 'app-itemmodal',
    templateUrl: './itemmodal.component.html',
    styleUrls: ['./itemmodal.component.scss']
  })

  export class ItemmodalComponent implements OnInit 
  {
    public userForm1: FormGroup;
    itemList:{};
    item_group:any;
    ItemId:any;
    status = false;

    itemcheck:any;
    itemmulti:any=[];
    
    constructor(private fb: FormBuilder, private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<ItemmodalComponent>,@Inject(MAT_DIALOG_DATA) data ) 
    { 
      this.userForm1=fb.group({
        itemModalPopUp: this.fb.array([this.fb.group({
          checkbox:'',
          item_id: '',
          hsn_code:'',
          item_name:'',
          item_group:'',
          item_category:'',
          mstock_unit:'',
          group_name:'',
          category_name:'',
          uom_name:'',
        })])
      });
  
      this.item_group = data.itemGroup;
      this.ItemId = data.ItemId;

      this.itemcheck=data.itemcheck;

      this.itemModalPopUp.reset();
    }

    get itemModalPopUp(){{ return this.userForm1.get('itemModalPopUp') as FormArray;}}

    i=0;
    ngOnInit() 
    {
      this.itemmulti=this.itemcheck.split(",");
      
      
      this.DropDownListService.getItemListByGroup(this.item_group+"/"+this.ItemId).subscribe(data=>
      {
        this.itemModalPopUp.removeAt(0);

        for(let i=0;i<data.length;i++)
        {
          this.add();
          for(let j=0;j<this.itemmulti.length-1;j++)
          {
           // alert(data[i]["item_id"]+"///"+this.itemmulti[j])
           if(data[i]["item_id"]==this.itemmulti[j])
           {
            this.itemModalPopUp.at(i).patchValue({checkbox:true});
           }
           
          }
          
        }
        delay(2000)
        this.itemModalPopUp.patchValue(data);

        this.status = true;
      });
    }

    add()
    {
      this.itemModalPopUp.push(this.fb.group({
        checkbox:'',
        item_id:'',
        hsn_code:'',
        item_name:'',
        item_group:'',
        item_category:'',
        mstock_unit:'',
        group_name:'',
        category_name:'',
        uom_name:'',
      }));
    }

    check : any;
    send()
    {
      for(let i = 0; i<this.itemModalPopUp.length; i++)
      {
        this.check = this.itemModalPopUp.at(i).get("checkbox").value as FormControl;
        if(this.check == false)
        { this.itemModalPopUp.removeAt(i);}
      }
      this.dialogRef.close(this.itemModalPopUp.value);   
    }

  }


