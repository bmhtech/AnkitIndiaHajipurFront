import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { forkJoin } from 'rxjs';
import { Storedashboard } from '../../../../Models/Storemodel/Storedashboard';
import { DropdownServiceService } from '../../../../service/dropdown-service.service';
import { Master } from '../../../../service/master.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-storedashboard',
  templateUrl: './storedashboard.component.html',
  styleUrls: ['./storedashboard.component.scss']
})
export class StoredashboardComponent implements OnInit {
  public userForm:FormGroup;
  model: Storedashboard = new Storedashboard();
  listRequisition:any = [];
  financialYear:any;
  item_sl_no = 1; 
  isHidden:any;
  status:any;
  Id:any;
  showsubmit:boolean=true;
  bussiness_unit_list:any=[];
  ShopFloorList: any=[];
  item_codes: any=[];
  packingItem:any=[];
  employeeNames:any=[];
  selectedItemName = [];
  selectedPackingItem:any = []; 
  currentDate:any;
  company_name:any;
  capacity:any = [];
  empty_bag_wt:any = [];
  tolerance:any = [];
  _item_qty:any;
  _packing_qty:any;
  user_role:any;
  pageblock:boolean=false;

  constructor(public fb:FormBuilder, public dialog: MatDialog,
    private Service : Master,private DropDownListService: DropdownServiceService)
   { 
    this.userForm=fb.group(
      {
        id: [''],
        dashboardid: [''],
        business_unit: [''],
        requisitionno: [''],
        requestedby: [''],
        shop_floor: [''],
        requesteddate: [''],
        approvedby:[''],
        company_id: [''],
        fin_year: [''],
        username: [''],
        reject:[''],
       
        storedashboard_Item_Dtls: this.fb.array([this.fb.group({
          slno:this.item_sl_no,
          item_code:'',
          item_name:'',
          packing_item:'',
          packing:'',
          itemqty:'',
          itemuom:'',
          packingqty:'',
          packinguom:'',
          priority:'',
          purpose:'',
          wheretouse:'',
          itemquality: '',
          remarks:'',
          toleranceqty:'0',
        })]),
      })
   }
   get id(){return this.userForm.get("id") as FormControl};
   get requisitionid(){return this.userForm.get("requisitionid") as FormControl};
   get business_unit(){return this.userForm.get("business_unit") as FormControl};
   get requisitionno(){return this.userForm.get("requisitionno") as FormControl};
   get requestedby(){return this.userForm.get("requestedby") as FormControl};
   get shop_floor(){return this.userForm.get("shop_floor") as FormControl};
   get requesteddate(){return this.userForm.get("requesteddate") as FormControl};
   get approvedby(){return this.userForm.get("approvedby") as FormControl};
   get company_id(){return this.userForm.get("company_id") as FormControl};
   get fin_year(){return this.userForm.get("fin_year") as FormControl};
   get username(){return this.userForm.get("username") as FormControl};
   get reject(){return this.userForm.get("reject") as FormControl};
   get storedashboard_Item_Dtls(){return this.userForm.get("storedashboard_Item_Dtls") as FormArray};

  ngOnInit() {
    this.currentDate = formatDate(new Date(), 'dd-MM-yyyy', 'en');
    this.financialYear = localStorage.getItem("financial_year");
    this.selectedItemName = [];
    this.selectedPackingItem = [];
    this.company_name = localStorage.getItem("company_name");
    this.user_role=localStorage.getItem("user_role");
    this.status = true;
    this.isHidden = false;
    if(this.user_role == "RL00022")//ROLE_MILLER
    {
      this.pageblock=true;
      this.showsubmit=false;
    }
    else
    {
      this.pageblock=false;
    }
    this.DropDownListService.listRequisition().subscribe(data=>
      {
        //console.log("hello 1:: ")
        this.listRequisition=data;
       // console.log(JSON.stringify(data));
      })
  }
  showList(s:string)
  {
      if(s=="add")
      {
        this.status=false;
        this.isHidden = true;
        forkJoin(
          this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
          this.DropDownListService.getEmployeeNamenew(this.company_name),
          this.DropDownListService.getItemThruPurchase(),
          this.DropDownListService.getrequisitionnumber(this.financialYear)
          ).subscribe(([ bUnitData,employeeData,ItemData,reqnumber])=>
          {
            //console.log("bUnitData:"+JSON.stringify(bUnitData))
            //console.log("employeeData:"+JSON.stringify(employeeData))
            this.bussiness_unit_list=bUnitData;
            this.employeeNames = employeeData;
            this.item_codes=ItemData;
            this.status=true;
          });
          this.status=true;
      }
      if(s=="list")
      { 
        this.isHidden = false;
        this.userForm.reset();
       
        this.item_sl_no = 0;
        while (this.storedashboard_Item_Dtls.length) 
        this.storedashboard_Item_Dtls.removeAt(0);
        this.addItems();
        this.status=true;
      }
  }
  onChangeBuUnit(BuUnit:string)
  {    
    if(BuUnit!="0")
    {
      this.DropDownListService.getShopFloorThruBU(BuUnit).subscribe(data=>
      {
        this.ShopFloorList = data;
      });
    }  
  }

  onChangeItemName(index, itemId)
  {
    if(itemId.length)
    {
      this.selectedPackingItem[index] = [];
      this.storedashboard_Item_Dtls.at(index).patchValue({item_code: itemId});
     
      forkJoin(
        this.DropDownListService.getItemNameById(itemId,this.company_name),
        this.DropDownListService.getItemMasterPackMat(itemId)
      ).subscribe(([data, data1])=>
      {
          forkJoin(  
            this.DropDownListService.getUomName(data.mstock_unit)
            ).subscribe(([data])=>
          { 
            this.storedashboard_Item_Dtls.at(index).patchValue({itemuom:data.description}); 
            this.packingItem[index] = data1;
        
          });
      }); 
    }
  }

  onChangePackingItem(index, packingId)
  {
    if(packingId.length)
    {
      this.selectedPackingItem[index] = packingId;
      this.storedashboard_Item_Dtls.at(index).patchValue({packing: packingId})
      
      forkJoin(
      this.DropDownListService.getItemPackUom(this.storedashboard_Item_Dtls.at(index).get("item_code").value, packingId,this.company_name),
      this.DropDownListService.getItemNameByIdNew(packingId,this.company_name),
      )
      .subscribe(([data,packingdata])=>
      {  
         this.capacity[index] = data.capacity; 
         this.empty_bag_wt[index] = data.empty_big_wt;
         this.tolerance[index]=data.tolerance;
         this.storedashboard_Item_Dtls.at(index).patchValue({packinguom: packingdata.mstock_unit_name}); 
      });
    }
  }

  getItemQty(itemQty, index)
  {
    if(Number(this.userForm.get("id").value)>0)
    {
      console.log("here")

      if(this.storedashboard_Item_Dtls.at(index).get("toleranceqty").value =="0" || this.storedashboard_Item_Dtls.at(index).get("toleranceqty").value ==0)//first time item qty
      {

        console.log("here 1")
      }
      else
      {
        console.log("here 2")
        this._item_qty=itemQty.target.value;
        let itemstatus:boolean=true,itemstatusmin:boolean=true;
        let minqty:number=(Number(this.storedashboard_Item_Dtls.at(index).get("toleranceqty").value) * ((100-Number(this.tolerance[index]))/100));
        let maxqty:number=(Number(this.storedashboard_Item_Dtls.at(index).get("toleranceqty").value) * ((100+Number(this.tolerance[index]))/100)) ;
         console.log(" // "+ this.storedashboard_Item_Dtls.at(index).get("toleranceqty").value + " // " + this.tolerance[index]  + " // " +minqty +" // " + maxqty)
        itemstatusmin=Number(this._item_qty) >=minqty;
        itemstatus= Number(this._item_qty) <= maxqty;

        if( itemstatus==true && itemstatusmin ==true)
        {

        }
        else
        {
          alert("Item Quantity is not Valid according to tolerance.Range must be in between  " + minqty +" to " + maxqty.toFixed(3));
          this.storedashboard_Item_Dtls.at(index).patchValue({itemqty: Number(this.storedashboard_Item_Dtls.at(index).get("toleranceqty").value).toFixed(3)}); 
          this.storedashboard_Item_Dtls.at(index).patchValue({packingqty: Math.round(this.storedashboard_Item_Dtls.at(index).get("toleranceqty").value/this.capacity[index])});

        }
      }


    }
    else
    {
      if(this.storedashboard_Item_Dtls.at(index).get("toleranceqty").value =="0" || this.storedashboard_Item_Dtls.at(index).get("toleranceqty").value ==0)//first time item qty
      {


      }
      else
      {
        this._item_qty=itemQty.target.value;
        let itemstatus:boolean=true,itemstatusmin:boolean=true;
        let minqty:number=(Number(this.storedashboard_Item_Dtls.at(index).get("toleranceqty").value) * ((100-Number(this.tolerance[index]))/100));
        let maxqty:number=(Number(this.storedashboard_Item_Dtls.at(index).get("toleranceqty").value) * ((100+Number(this.tolerance[index]))/100)) ;
         console.log(" // "+ this.storedashboard_Item_Dtls.at(index).get("toleranceqty").value + " // " + this.tolerance[index]  + " // " +minqty +" // " + maxqty)
        itemstatusmin=Number(this._item_qty) >=minqty;
        itemstatus= Number(this._item_qty) <= maxqty;

        if( itemstatus==true && itemstatusmin ==true)
        {

        }
        else
        {
          alert("Item Quantity is not Valid according to tolerance.Range must be in between  " + minqty +" to " + maxqty.toFixed(3));
          this.storedashboard_Item_Dtls.at(index).patchValue({itemqty: Number(this.storedashboard_Item_Dtls.at(index).get("toleranceqty").value).toFixed(3)}); 
          this.storedashboard_Item_Dtls.at(index).patchValue({packingqty: Math.round(this.storedashboard_Item_Dtls.at(index).get("toleranceqty").value/this.capacity[index])});

        }
      }
    }
  }

  getPackingQty(packingQty, index)
  {
    if(Number(this.userForm.get("id").value)>0)
    {
      this._packing_qty = packingQty.target.value;
      this._item_qty = this.capacity[index] * this._packing_qty;
      this.storedashboard_Item_Dtls.at(index).patchValue({itemqty: Number(this._item_qty).toFixed(3),toleranceqty: Number(this._item_qty).toFixed(3),packingqty:packingQty.target.value}); 
    
    }
    else
    {
      this._packing_qty = packingQty.target.value;
      this._item_qty = this.capacity[index] * this._packing_qty;
      this.storedashboard_Item_Dtls.at(index).patchValue({itemqty: Number(this._item_qty).toFixed(3),toleranceqty: Number(this._item_qty).toFixed(3),packingqty:packingQty.target.value}); 
    }

  }

  addItems()
  {
    
    this.item_sl_no =this.item_sl_no +1;
    
    this.storedashboard_Item_Dtls.push(this.fb.group({
      slno:this.item_sl_no,
      item_code:'',
      item_name:'',
      packing_item:'',
      packing:'',
      itemqty:'',
      itemuom:'',
      packingqty:'',
      packinguom:'',
      priority:'',
      purpose:'',
      wheretouse:'',
      itemquality: '',
      remarks:'',
      toleranceqty:'0'}))

    this.storedashboard_Item_Dtls.at(this.item_sl_no - 1).patchValue({
      item_code:'',
      item_name:'',
      packing_item:'',
      packing:'',
      itemqty:'',
      itemuom:'',
      packingqty:'',
      packinguom:'',
      priority:'',
      purpose:'',
      wheretouse:'',
      itemquality: '',
      remarks:'',
      toleranceqty:'0'
    });
  }

  deleteItems(index) 
  {
    if(this.item_sl_no > 1)
    { 
      this.storedashboard_Item_Dtls.removeAt(index);
      if(this.packingItem[index] != undefined)
      { 
        this.packingItem.splice(index, 1);
        this.selectedPackingItem.splice(index, 1);
        this.capacity.splice(index, 1);
        this.empty_bag_wt.splice(index, 1);
        this.tolerance.splice(index, 1);
      }
      this.item_sl_no = this.item_sl_no - 1;

      for(let v=0 ;v<=this.storedashboard_Item_Dtls.length;v++)
      {
        this.storedashboard_Item_Dtls.at(v).patchValue({slno: v+1});
      }
    }
    else
    {
      this.item_sl_no = 1;
      alert("can't delete all rows");
      this.selectedItemName[index] = "0";
      this.selectedPackingItem[index] = "0";
      this.storedashboard_Item_Dtls.reset();
      this.storedashboard_Item_Dtls.at(0).patchValue({slno:  this.item_sl_no});
     
      this.storedashboard_Item_Dtls.at(0).patchValue({
        item_code:'',
        item_name:'',
        packing_item:'',
        packing:'',
        itemqty:'',
        itemuom:'',
        packingqty:'',
        packinguom:'',
        priority:'',
        purpose:'',
        wheretouse:'',
        itemquality: '',
        remarks:'',
        toleranceqty:'0'
      });
    
    for(let i=1; i<=this.item_sl_no; i++)
      this.storedashboard_Item_Dtls.at(i-1).patchValue({slno: i});
    
  }
}

  onUpdate(id,requisitionno,action)
  {
 
      this.status=false;
      this.isHidden=true;
      if(action=='update')
      { 
        this.showsubmit=true;  
        console.log(" button :: "+this.showsubmit)
      }
      else
      {  
        this.showsubmit=false;
        console.log(" button else:: "+this.showsubmit)
      }
    
      forkJoin(
        this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
        this.DropDownListService.getEmployeeNamenew(this.company_name),
        this.DropDownListService.getItemThruPurchase(),
        this.DropDownListService.getRequisitiondetails(id),
        this.DropDownListService.getRequisitionitemdetails(requisitionno),
        ).subscribe(([ bUnitData,employeeData,ItemData,requisition,requisitionitem])=>
        {
         // console.log(" statsic" + JSON.stringify(bUnitData))
         // console.log(" statsic1" + JSON.stringify(employeeData))
          //console.log(" statsic2" + JSON.stringify(ItemData))
         // console.log(" statsic3" + JSON.stringify(requisition))
          //console.log(" dynamic" + JSON.stringify(requisitionitem))
          this.bussiness_unit_list=bUnitData;
          this.employeeNames = employeeData;
          this.item_codes=ItemData;
          this.onChangeBuUnit(requisition["business_unit"]);
          this.userForm.patchValue(requisition);
          
          this.selectedItemName = [];
          this.selectedPackingItem = [];
          
          let k = 0;
          this.addItems();
          this.item_sl_no = 0;
          while (this.storedashboard_Item_Dtls.length) 
          {
             this.storedashboard_Item_Dtls.removeAt(0);
          }
          for(let data1 of requisitionitem)
          { 
            this.status = false;
            this.addItems();
            forkJoin(
              this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
              this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"],this.company_name)
            ).subscribe(([packingList, capacityEmptyWt])=>
              {
                this.status = true;
                this.capacity[k] = capacityEmptyWt.capacity;
                this.empty_bag_wt[k] =  capacityEmptyWt.empty_big_wt;
                this.tolerance[k]=capacityEmptyWt.tolerance;

                this.selectedPackingItem[k] = data1["packing"];
                this.selectedItemName[k] = data1["item_code"];

                this.packingItem[k] = packingList; 
                this.storedashboard_Item_Dtls.at(k).patchValue(data1);
                this.storedashboard_Item_Dtls.at(k).patchValue({toleranceqty:data1["itemqty"]})
                k = k + 1;
              });
          }
          
            this.status=true;

        });
 
        this.status=true;

  }

}
