import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StackMaintain } from '../../../../../../Models/transaction/PurchaseTransaction/StackMaintain';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { formatDate } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-stack-maintain',
  templateUrl: './stack-maintain.component.html',
  styleUrls: ['./stack-maintain.component.scss']
})
export class StackMaintainComponent implements OnInit {
  isHidden = false;
  stackMaintainList:any= [];
   model:StackMaintain=new StackMaintain();
   bussiness_unit_list:any=[];
   grnList:any=[];
   supplierNames:any=[];  
   vehicleList:any=[];
   item_codes:any=[];
   packingItem:any=[];
   warehouses:any=[];
   stackList:any=[];
   capacity: any = [];
   empty_bag_wt: any = [];
   selectedItemName:any=[];
   public userForm: FormGroup;
   Id:any;
   status: boolean = false;
   stackMaintainSave:boolean=false;
   company_name:any;
   Username:any;
   financialYear:any;
   currentDate: any;
   item_sl_no = 1;
 
  constructor(public fb: FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService) {
      this.userForm=fb.group({
        id:[''],
        stack_id:[''],
        b_unit:[''],
        stack_date:[''],
        grn_id:[''],
        supplier:[''],
        vehicle_id:[''],
        total_grn_pkt:[''],
        total_grn_item: [''],
        company_id: [''],
        fin_year: [''],
        username: [''],

        stack_maintain_details: this.fb.array([this.fb.group({
          slno:this.item_sl_no,
          stack_id:'',
          item_code:'',
          packing:'',
          warehouse:'',
          stack:'',
          stack_pack_qty:'',
          stack_item_qty:''})])
      });
    }

    get id(){ return this.userForm.get("id") as FormControl }
      get stack_id(){ return this.userForm.get("stack_id") as FormControl }
      get b_unit(){ return this.userForm.get("b_unit") as FormControl }
      get stack_date(){ return this.userForm.get("stack_date") as FormControl }
      get grn_id(){ return this.userForm.get("grn_id") as FormControl }
      get supplier(){ return this.userForm.get("supplier") as FormControl }
      get vehicle_id(){ return this.userForm.get("vehicle_id") as FormControl }
      get total_grn_pkt(){ return this.userForm.get("total_grn_pkt") as FormControl }
      get total_grn_item(){ return this.userForm.get("total_grn_item") as FormControl }
  
      get company_id(){ return this.userForm.get("company_id") as FormControl }
      get fin_year(){ return this.userForm.get("fin_year") as FormControl }
      get username(){ return this.userForm.get("username") as FormControl }
      
      get stack_maintain_details(){return this.userForm.get('stack_maintain_details') as FormArray;}

  ngOnInit() {
    
    this.stackMaintainSave=true;
    this.company_name = localStorage.getItem("company_name");
    this.Username = localStorage.getItem("username");
    this.financialYear = localStorage.getItem("financial_year");
    this.empty_bag_wt = [];
    this.packingItem = [];
    this.capacity = [];
    this.isHidden = false;
    this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
    this.status = true;

    forkJoin(
    this.DropDownListService.stackMaintainList(this.currentDate),
    this.DropDownListService.getcompanyBUMNCListFastApi(this.company_name),
    this.DropDownListService.getGrnList(),
    this.DropDownListService.supplierNamesNewList(this.company_name),
    this.DropDownListService.getVehiclenoallNew(),
    ).subscribe(([stackData,buData,grnData,supplierData,vehicleData])=>
    {
      console.log("grnData:"+JSON.stringify(grnData))
      this.stackMaintainList=stackData;
      this.bussiness_unit_list=buData;
      this.grnList=grnData;
      this.supplierNames=supplierData;
      this.vehicleList=vehicleData;
      this.status = true;
    });
    this.status = true;
  }
  showList(s:string)
  {
    if(s=="add")
      {
        this.isHidden=true;
      }
      
    if(s=="list")
      {
      this.isHidden=false;
      this.stackMaintainSave=true;
      this.selectedItemName = [];
      this.packingItem = [];
      this.item_sl_no = 0;
    }
    this.userForm.reset(this.ResetAllValues().value);
      this.status=true;
  }

  ResetAllValues()
  {
    return this.userForm=this.fb.group({
      id:[''],
      stack_id:[''],
      b_unit:[''],
      stack_date:[''],
      grn_id:[''],
      supplier:[''],
      vehicle_id:[''],
      total_grn_pkt:[''],
      total_grn_item: [''],
      company_id: [''],
      fin_year: [''],
      username: [''],

      stack_maintain_details: this.fb.array([this.fb.group({
        slno:this.item_sl_no,
        stack_id:'',
        item_code:'',
        packing:'',
        warehouse:'',
        stack:'',
        stack_pack_qty:'',
        stack_item_qty:''})])
    });
  }

  add() 
    {this.item_sl_no = this.item_sl_no + 1;
      this.stack_maintain_details.push(this.fb.group({
        slno: this.item_sl_no,
        stack_id:'',
        item_code:'',
        packing:'',
        warehouse:'',
        stack:'',
        stack_pack_qty:'',
        stack_item_qty:''}));
    }
    delete(index) {
      if (this.item_sl_no > 1) {
        this.packingItem.slice(index, 1);
        this.stack_maintain_details.removeAt(index);
        this.item_sl_no = this.item_sl_no - 1;
      }
      else {
        this.item_sl_no = 1;
        alert("can't delete all rows");
        this.stack_maintain_details.reset();
        this.stack_maintain_details.at(0).patchValue({ slno: this.item_sl_no });
      }
  
      for (let i = 1; i <= this.item_sl_no; i++)
        this.stack_maintain_details.at(i - 1).patchValue({ slno: i });
  
    }
    
  onChangeBussinessUnit(buss_id: string) {
    this.warehouses = []
    this.stackList = [];
    if (buss_id != '0') {
      forkJoin(
        this.DropDownListService.getWHListbyBUnitFastApi(buss_id)
      ).subscribe(([wearHouseData]) => {
        this.warehouses = wearHouseData;
        this.status = true;
      })
    }
  }

  onChangeGrnNo(grnid)
  {
    if (grnid.length) {
     // console.log("grnid  " + grnid)
      forkJoin(
        this.DropDownListService.getGrnDetailsById(grnid),
        this.DropDownListService.getItemListByGrnId(grnid)
      ).subscribe(([data1,itemData]) => {
        this.userForm.patchValue({ supplier:data1.supplier_name,vehicle_id:data1.vehicle_id,total_grn_pkt:data1.total_grn_pkt,total_grn_item:data1.total_grn_item });
        this.item_codes=itemData;
        this.status = true;
      })
      
    }
  }
  onChangeWarehouse(event, index) {
    this.status = false;
    if (event != '' && event != null) {
     // console.log("11111  " + event)

      this.DropDownListService.getStackNoByWarehouse(event).subscribe(data1 => {
       // console.log("stackListData: " + JSON.stringify(data1))
        this.status = true;
        this.stackList[index] = data1;
        //this.stackList[index] = [{ stack_no: 'MULTIPLE'}].concat(data1);
      });
    }
  }
onChangeStack(event, index) {
  if (event.length) {
        let checkpackingalreadyexist: boolean = false;
       // console.log("Enter 4: : " + checkpackingalreadyexist)
        for (let p = 0; p < this.stack_maintain_details.length; p++) {
          if (this.stack_maintain_details.at(p).get("item_code").value == this.stack_maintain_details.at(index).get("item_code").value
           && p != index && this.stack_maintain_details.at(p).get("packing").value == this.stack_maintain_details.at(index).get("packing").value 
           && this.stack_maintain_details.at(p).get("warehouse").value == this.stack_maintain_details.at(index).get("warehouse").value 
           && this.stack_maintain_details.at(p).get("stack").value == event) {
            checkpackingalreadyexist = true;
          }
        //  console.log("Enter : : " + checkpackingalreadyexist)
        }
        if (checkpackingalreadyexist == true) {
          this.stack_maintain_details.at(index).patchValue({ item_code: '0', packing: '0' });
          //this.selectedItemName[index]="0";
          this.delete(index);
          alert("Item, Packing, Warehouse And Stack Are Same,Please Change...");
         // console.log("Enter 2 : : " + checkpackingalreadyexist)
          this.status = true;
        }
      }
}
  onchangeItemName(index, itemId) {
    if (itemId.length && itemId != "0") {

      this.packingItem[index]=[];
      forkJoin(
       this.DropDownListService.getItemNameByIdNew(itemId, this.company_name),
       // this.DropDownListService.getItemMasterPackMatNew(itemId)
       this.DropDownListService.getPackingItemByGrn(itemId,this.userForm.get("grn_id").value),
      ).subscribe(([itemNameData, packingItemData,]) => {
        //console.log("itemNameData::"+JSON.stringify(itemNameData))
        this.stack_maintain_details.at(index).patchValue({ item_code: itemId });
        //console.log("itemid1:: " + itemId,"//",this.stack_maintain_details.at(index).get("item_code").value)
       //this.selectedItemName[index] = itemId;
        this.packingItem[index] = packingItemData;
        

      });
    }
  }
  
  itemId: any;
 onchangePackingItem(index, event) {
    if (event.target.value != '0') {
      this.itemId = this.stack_maintain_details.at(index).get("item_code").value as FormControl;
      this.status = false;
      //console.log("itemid:: " + this.itemId,"//",this.stack_maintain_details.at(index).get("item_code").value)
      forkJoin(
        this.DropDownListService.getItemPackUom(this.itemId, event.target.value, this.company_name),
        this.DropDownListService.getItemNameByIdNew(event.target.value, this.company_name)
      )
        .subscribe(([data, packingdata]) => {
         // console.log("Packing Item UOM :" + JSON.stringify(data));
          this.capacity[index] = data.capacity;
          this.empty_bag_wt[index] = data.empty_big_wt;
          this.status = true;
        });
    }
  }

  _item_qty: any;
  _packing_qty:any;
  //total_item_qty: number=0.00;
  total_packing_qty: number=0;
getPackingQty(index) {
  this._packing_qty = this.stack_maintain_details.at(index).get("stack_pack_qty").value as FormControl;
  this._item_qty=Number(this.capacity[index] * this._packing_qty).toFixed(2);
  //console.log(this.uom[index],"packingQty",this._packing_qty ,"//",this.capacity[index],"//",this._item_qty);
  this.stack_maintain_details.at(index).patchValue({ stack_item_qty: this._item_qty });
  this.total_packing_qty=0;
  for (let p = 0; p < this.stack_maintain_details.length; p++) {
   // this.total_item_qty+=this.stack_maintain_details.at(p).get("stack_item_qty").value;
    this.total_packing_qty+=this.stack_maintain_details.at(p).get("stack_pack_qty").value;
  }
  if(this.userForm.get("total_grn_pkt").value<this.total_packing_qty) 
    {
      this.stack_maintain_details.at(index).patchValue({ stack_pack_qty: 0,stack_item_qty: 0 });
    }
}

  send()
    {
      this.Id= this.userForm.get("id").value as FormControl; 
      this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
      fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
      
          this.status = false;
          if(this.userForm.get("grn_id").value == '' || this.userForm.get("grn_id").value == 0 || this.userForm.get("grn_id").value == null)
            {
              alert("Please Select GRN No!!!");
              this.status = true;
            }
          else
          {
            let item = false;
            let packing = false;
            let warehouse = false;
            let stack = false;
            let stack_pack_qty = false;
            let stack_item_qty = false;
            let chname = false;
            let chname1 = false;
            for(let i=0;i<this.stack_maintain_details.length;i++)
            {
              if(this.stack_maintain_details.at(i).get("item_code").value == null || this.stack_maintain_details.at(i).get("item_code").value == 0 || this.stack_maintain_details.at(i).get("item_code").value == '')
              {
                item = true;
              }
              if(this.stack_maintain_details.at(i).get("packing").value == null || this.stack_maintain_details.at(i).get("packing").value == 0 || this.stack_maintain_details.at(i).get("packing").value == '')
              {
                packing = true;
              }
              if(this.stack_maintain_details.at(i).get("warehouse").value == null || this.stack_maintain_details.at(i).get("warehouse").value == 0 || this.stack_maintain_details.at(i).get("warehouse").value == '')
              {
                warehouse = true;
              }
              if(this.stack_maintain_details.at(i).get("stack").value == null || this.stack_maintain_details.at(i).get("stack").value == 0 || this.stack_maintain_details.at(i).get("stack").value == '')
              {
                stack = true;
              }
              if(this.stack_maintain_details.at(i).get("stack_pack_qty").value == null || this.stack_maintain_details.at(i).get("stack_pack_qty").value == 0 || this.stack_maintain_details.at(i).get("stack_pack_qty").value == '')
              {
                stack_pack_qty = true;
              }
              if(this.stack_maintain_details.at(i).get("stack_item_qty").value == null || this.stack_maintain_details.at(i).get("stack_item_qty").value == 0 || this.stack_maintain_details.at(i).get("stack_item_qty").value == '')
              {
                stack_item_qty = true;
              }
            }   
            if( item == true)
            {
              alert("Please Select Item in Item Details Tab!!");
              this.status = true;
            }
            else if( packing == true)
            {
              alert("Please Select Packing in Item Details Tab!!");
              this.status = true;
            }
            else if( warehouse == true)
            {
              alert("Please Select warehouse in Item Details Tab!!");
              this.status = true;
            }
            else if( stack == true)
            {
              alert("Please Select Stack in Item Details Tab!!");
              this.status = true;
            }
            else if( stack_pack_qty == true)
            {
              alert("Please Enter Packing Qty in Item Details Tab!!");
              this.status = true;
            }
            else if( stack_item_qty == true)
            {
              alert("Please Enter Item Qty in Item Details Tab!!");
              this.status = true;
            }
            else{
              if(this.Id>0)
              {
                this.Service.updateStackMaintain(this.userForm.getRawValue(), this.Id).subscribe(data => 
                  {
                    //(this.userForm.getRawValue());
                    alert("Stack Maintain Updated successfully.");
                    this.userForm.reset();
                    //refresh dropdown list
                    this.ngOnInit();
                    this.isHidden = false;
                    this.status = true;
                    //Refresh Dynemic table
                    while(this.stack_maintain_details.length)
                    this.stack_maintain_details.removeAt(0);
                    this.add();
                  });
              }
              else
              {
                this.Service.createStackMaintain(this.userForm.getRawValue()).subscribe(data => 
                  {
                   // console.log(this.userForm.value);
                    alert("New Stack Maintain created successfully.");
                    this.userForm.reset();
                    //refresh dropdown list
                    this.ngOnInit();
                    this.isHidden = false;
                    this.status = true;
                    //Refresh Dynemic table
                    while(this.stack_maintain_details.length)
                    this.stack_maintain_details.removeAt(0);
                    this.add();
                  });
              }
            }
        }
      
    } 

    onUpdate(id,stack_id,action)
    {
      this.isHidden = true;
      this.status = false;
      if(action=='update')
      {
        this.stackMaintainSave=true;
      }
      else
      {
        this.stackMaintainSave=false;
      }
      forkJoin([
        this.DropDownListService.retriveStackMaintain(id),
        this.DropDownListService.getcompanyBUMNCListFastApi(this.company_name),
        this.DropDownListService.getGrnAllList(),
        this.DropDownListService.supplierNamesNewList(this.company_name),
        this.DropDownListService.getVehiclenoallNew(),
        this.DropDownListService.itemNamesNewList(),
        this.DropDownListService.stackItemRetriveList(stack_id),
        ]).subscribe(([stackData,buData,grnData,supplierData,vehicleData,itemList,itemData])=>
        {
          //console.log("storelist:"+JSON.stringify(storelist))
          this.bussiness_unit_list=buData;
          this.grnList=grnData;
          this.supplierNames=supplierData;
          this.vehicleList=vehicleData;
          this.item_codes=itemList;
          this.onChangeBussinessUnit(stackData.b_unit);
          this.userForm.patchValue(stackData);
         //console.log("Transdetails: "+JSON.stringify(storeInventory));       
 
         let k = 0;
         this.add()
   
         this.item_sl_no = 0;
         while (this.stack_maintain_details.length)
           this.stack_maintain_details.removeAt(0);
         for (let data1 of itemData) {
           this.selectedItemName = [];
           this.status = false;
           this.onChangeWarehouse(data1.warehouse, k);
           this.add();
           forkJoin(
             //this.DropDownListService.getItemMasterPackMat(data1["adv_item_code"]),
             this.DropDownListService.getItemMasterPackMatNew(data1["item_code"]),
             this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name)
           ).subscribe(([packingList, capacityEmptyWt]) => {
             this.status = true;
             //this.addItem();
             this.selectedItemName[k] = data1["item_code"];
             this.onChangeWarehouse(data1.warehouse, k);
             this.packingItem[k] = packingList;
             this.capacity[k] = capacityEmptyWt["capacity"];
             this.empty_bag_wt[k] = capacityEmptyWt["empty_big_wt"];
             this.stack_maintain_details.at(k).patchValue({slno:data1.slno,item_code:data1.item_code,packing:data1.packing,
              warehouse:data1.warehouse,stack:data1.stack,stack_pack_qty:data1.stack_pack_qty,stack_item_qty:data1.stack_item_qty});
            
             k = k + 1;
           });
         }
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured on Stack Maintain,please try again....");
      this.ngOnInit()});
     }


    onDelete(id:any,chargecode)
     {
       this.status = false;

       if(confirm("Are you sure to delete this Stack Maintain ?"))
       { 
        this.userForm.patchValue({username: localStorage.getItem("username")});

             this.Service.deleteStackMaintain(this.userForm.getRawValue(),id).subscribe(data=> 
              {
        
                if(data.stack_id=='' || data.stack_id==null)
                {
                  alert("Opps!!! Can't delete this Stack Maintain !!!");
                }else{
                  alert("Stack Maintain deleted successfully.");
                }
                this.userForm.reset();
                this.status = true;
                this.isHidden = false;
                this.ngOnInit();
                this.showList("list");
              });
       }  
       this.status = true;
     }

     search(event) {
      let serchText = event.target.value;
      if (event.key == "Enter") {
        this.status = false;
        if (
          serchText == null || serchText == undefined || serchText == "" || serchText == "0"
        ) {
          this.DropDownListService.findStackMaintain("0").subscribe((data) => {
            this.stackMaintainList = data;
            this.status = true;
          });
        } else {
          this.DropDownListService.findStackMaintain(serchText).subscribe(
            (data) => {
              this.stackMaintainList = data;
              this.status = true;
            }
          );
          this.status = true;
        }
      }
    }

}



