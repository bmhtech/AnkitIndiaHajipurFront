import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray } from '@angular/forms';
import { ItemOpeningStock } from '../../../../../../Models/ItemModel/item-opening-stock';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { areIterablesEqual } from '@angular/core/src/change_detection/change_detection_util';
import { forkJoin } from 'rxjs';
import { formatDate } from '@angular/common';
import { MatCheckboxChange, MatDialogConfig } from '@angular/material';
import { PackingItemDetailsPopupComponent } from '../packing-item-details-popup/packing-item-details-popup.component';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-item-opening-stock',
  templateUrl: './item-opening-stock.component.html',
  styleUrls: ['./item-opening-stock.component.scss']
})
export class ItemOpeningStockComponent implements OnInit 
{
  submitted = false;
  public userForm:FormGroup;
  model:ItemOpeningStock=new ItemOpeningStock();
  listItemOpeningStock: ItemOpeningStock[];
  status = false;
  isHidden = false;
  bussiness_unit_list:any=[];
  itemtypes:any =[];
  company_name:any;
  Id:any; 
  Itemtype:any;
  BuUnit:any;
  item_codes:any = [];
  ItemUomList:any =[];
  currentDate:any;
  customUOMs: {};
 
  constructor(public fb:FormBuilder,
    private Service : Master,private DropDownListService: DropdownServiceService,
    public dialog: MatDialog) 
  { 
    this.userForm=fb.group
      ({
        id:[''],
        transe_id:[''],
        business_unit: [''],
        tdate: [''],
        item_type:[''],
        company_id: [''],
        fin_year: [''],
        username: [''],

        item_opening_stk_dtls: this.fb.array([this.fb.group({
          checkbox:'',
          item_id:'',
          open_item_gr_qty:'',
          item_uom:'',
          pack_dtls:'',
        })]),
        });
  }

  get transe_id(){return this.userForm.get("transe_id") as FormControl}
  get id(){return this.userForm.get("id") as FormControl}
  get business_unit(){ return this.userForm.get("business_unit") as FormControl }
  get tdate(){return this.userForm.get("tdate") as FormControl}
  get item_type(){return this.userForm.get("item_type") as FormControl}
  get company_id(){return this.userForm.get("company_id") as FormControl}
  get fin_year(){ return this.userForm.get("fin_year") as FormControl }
  get username(){ return this.userForm.get("username") as FormControl }
  get item_opening_stk_dtls() { return this.userForm.get('item_opening_stk_dtls') as FormArray;}

  ngOnInit() 
  {
    this.status = true;
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.company_name = localStorage.getItem("company_name");
    forkJoin(
      this.DropDownListService.getCompanyBUMNCList(this.company_name),  
      this.DropDownListService.itemTypeList(this.company_name),
      this.Service.findAllItems(),
      this.Service.getCustomUoms(),
      this.Service.getItemOpeningStk()
    ).subscribe(([companyBuData,ItemTypedata, ItemList,CustomUom,itemStkList])=>
    {
      this.bussiness_unit_list = companyBuData;
      this.itemtypes = ItemTypedata;
      this.item_codes = ItemList;
      this.ItemUomList = CustomUom;
      this.listItemOpeningStock = itemStkList;
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()}); 
  }

  addItem() 
  {
    this.item_opening_stk_dtls.push(this.fb.group(
    {
      checkbox:'',
      item_id:'',
      open_item_gr_qty:'',
      item_uom:'',
      pack_dtls:'',
    }));
  }

  onClickItamType()
  {
    this.Itemtype = this.userForm.get("item_type").value;
    this.BuUnit = this.userForm.get("business_unit").value;
    this.DropDownListService.getItemOpening("bunit="+this.BuUnit+"&itype="+this.Itemtype+"&tdate="+this.currentDate).subscribe(data=>
    {
      let i =0;
      this.addItem();
      while(this.item_opening_stk_dtls.length)
      this.item_opening_stk_dtls.removeAt(0);
      for(let data1 of data)
      { 
        this.addItem();
        this.item_opening_stk_dtls.at(i).patchValue({item_id: data1.item_id,item_uom:data1.mstock_unit});
        i=i+1;
      }
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()}); 
  }

  onChangeCheckbox(event:MatCheckboxChange,index): void 
  {
    let ItemType =this.userForm.get("item_type").value;
    let Item_Id = this.item_opening_stk_dtls.at(index).get("item_id").value;
    console.log("checked: "+event.checked);

    if(event.checked==true && ItemType !="Packing Items")
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index, Item_Id:Item_Id};
     let dialogref=this.dialog.open(PackingItemDetailsPopupComponent,dialogConfig);
     dialogref.afterClosed().subscribe(result => 
     {
       this.item_opening_stk_dtls.at(index).patchValue({open_item_gr_qty:result.item_qty_total});
       delete result["item_qty_total"];
       console.log("After closed"+JSON.stringify(result));
       let JsonData = JSON.stringify(result);
       this.item_opening_stk_dtls.at(index).patchValue({pack_dtls:JsonData});
     });
    }
  }

  send()
  {
    this.Id= this.userForm.get("id").value as FormControl;  
    this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
      fin_year:localStorage.getItem("financial_year"),
      username: localStorage.getItem("username")});
    this.submitted = true;
    if(!this.userForm.valid) 
    {
      alert('Please fill all fields!')
      return false;
    } 
    else 
    {
      if(this.Id>0)
        {
          this.status = false;
          this.Service.updateItemGroup(this.userForm.getRawValue(),this.Id).subscribe(data => 
          {
            console.log("Item Group: "+this.userForm.value);
            alert("Item Opening Stock Updated successfully.");
            this.status = true;
            this.userForm.reset();
            //refresh List;
            this.ngOnInit();             
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          });  
        }  

        else
          {
            this.status = false;
            this.Service.createItemOpeningStk(this.userForm.getRawValue()).subscribe(data => 
            {
              console.log("Item Group: "+this.userForm.value);
              alert("Item Opening Stock created successfully.");
              this.status = true;
              this.userForm.reset();
              //refresh List;
              this.ngOnInit();                 
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            });
          }
        } 
     }
}
