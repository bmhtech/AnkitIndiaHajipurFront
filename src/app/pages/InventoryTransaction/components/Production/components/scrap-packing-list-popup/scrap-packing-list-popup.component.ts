import { Component, Inject, OnInit } from '@angular/core';
import { FormArray,FormControl ,FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { PackingListPopUpComponent } from '../../../SalesTransaction/components/packing-list-pop-up/packing-list-pop-up.component';
import { itemModalPopUp} from '../../../../../../Models/ItemModel/ItemMaster';
import { ItemList } from '../../../../../../Models/InventoryModel/TaxCode';
import { Console } from 'console';
@Component({
  selector: 'app-scrap-packing-list-popup',
  templateUrl: './scrap-packing-list-popup.component.html',
  styleUrls: ['./scrap-packing-list-popup.component.scss']
})
export class ScrapPackingListPopupComponent implements OnInit {

  public userForm:FormGroup;
    check:any;
    Itemlist:{};
    ItemId:any;
    status = false;
    sales_quo:any = [];
    pagecall:any;
    Item_name:any;
    Item_id:any;
    bunit:any;

    constructor( private fb: FormBuilder,
      private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<PackingListPopUpComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm=fb.group(
      {
        item_name:[''],
        item_id:[''],     
      });
      
      this.ItemId = data.item_id;
      this.sales_quo = data.popup_data;
      this.pagecall=data.pagecall;
      this.bunit=data.bunit;
    }
    
      get item_name(){ return this.userForm.get("item_name") as FormControl }           
      get item_id(){ return this.userForm.get("item_id") as FormControl }    
    
    // get itemModalPopUp(){{ return this.userForm.get('itemModalPopUp') as FormArray;}}

    ngOnInit() 
    {
      this.status = false;
      if(this.pagecall == "production")
      {
        //this.DropDownListService.getItemThruType1("ITMFIXED02").subscribe(data=>
        this.DropDownListService.getItemThruType3("ITMT00006").subscribe(data=>
         // this.DropDownListService.getItemThruTypeForUsedItem(this.bunit,"PACKING MATERIAL SALE").subscribe(data=>
          {
            console.log("data::"+JSON.stringify(data));
            
            this.Itemlist = data;
            this.status = true;
          });  
      }     
    }

    check1(Itemlist:ItemList)
    {
      this.Item_name = Itemlist.item_name;
      this.Item_id = Itemlist.item_id;
    }

  SendDataToDifferentComponenet()
  {
    this.userForm.patchValue({item_name:this.Item_name, item_id: this.Item_id});
    this.dialogRef.close(this.userForm.value); 
  }

}
