import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { PurchaseModuleServiceService } from '../../../../../../service/purchase-module-service.service';
import { Indent} from '../../../../../../models/transaction/PurchaseTransaction/IndentOrder';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { QcNormPopUpModalComponent } from '../qc-norm-pop-up-modal/qc-norm-pop-up-modal.component';
import { formatDate } from '@angular/common';
import { fork } from 'cluster';
import { Master } from '../../../../../../service/master.service';
import { forkJoin } from 'rxjs';
import { Console } from 'console';

  @Component({
    selector: 'app-levels-1-1',
    templateUrl: './IndentOrder.component.html',
    styleUrls: ['./IndentOrder.component.scss'] })

  export class IndentOrderComponent implements OnInit 
  {
    submitted = false;
    public userForm:FormGroup;
    model: Indent = new Indent();
    listIndent: Indent[];
    itemtypes:any = [];
    employeeNames:any = [];
    departments:any = [];
    priorities:{};
    purposes:{};
    to_be_useds:{};
    customUOMDyns:{};
    item_codes:any = [];
    gitemname:{};
    empNames:any = [];
    getuom1:{};
    getuom2:{};
    reasonList:any = [];
    seq_no:string;
    item_sl_no = 1;
    currentDate:any;
    isHidden:any;
    status:any;
    isPackingReq:any;
    packingItem:any;
    stockPack:any;
    stockPackUom:any;
    indentPackQty:any;
    packingUom:any;
    priceBasedOn:any;
    amount:any;
    taxAmount:any;
    netAmount:any;
    totalAmount:any;
    capacity:any;
    indentType:any;
    packingItemList:any;
    priceBasedOnList:any;
    isCloseIsYes:any;
    empty_bag_wt_priceBasedOn:any = []
    company_name:any;
    action:any;
    indentordersave:boolean=true;
    indentorderupdate:boolean=true;
    indentorderview:boolean=true;

    constructor(public fb:FormBuilder,private Service: PurchaseModuleServiceService,
      private UpdateService: Master, private dialog: MatDialog,private DropDownListService: DropdownServiceService) 
    { 
      this.userForm=fb.group(
      {
        id:[''],
        indent_id: [''],
        indent_no:[''],
        indent_type:[''],
        indent_date: [''],	
        valid_until: [''],	
        ser_item_type: [''],	
        referance_type: [''],	
        department: [''],	
        indent_by: [''],	
        fullfillment_type: [''], 	
        fullfillment_by: [''],	
        remarks: [''],	
        confirmed_by: [''],	
        approved: [''],	
        reason: [''],	
        packing_req: [''],
        close: [''],
        c_reason: [''],
        company_id: [''],
        fin_year: [''],
        username: [''],
        
        pur_Indent_docs: this.fb.array(
          [this.fb.group(
            {
              doc_name : ''
              
            }
          )]
          
          
          ),
      
        pur_Indent_Details: this.fb.array([this.fb.group({
          srl_no:this.item_sl_no,
          item_code:'',
          req_date:'',
          packing_item:'',
          stock_item:'',
          stock_item_uom:'',
          indent_item_qty:'',
          stock_pack_uom:'',
          stock_pack:'',
          indent_pack_qty:'',
          packing_uom:'',
          item_uom:'',
          mat_weight:'',
          mrp:'',
          indicative_price:'',
          price_based_on:'',
          amount:'',         
          qc_norms:'',
          priority:'',
          delivery_date:'',
          purpose:'',
          to_be_used:'',
          remarks:'',
          net_amount:'',	
          tax_code:'',	
          tax_rate:'',
          tax_amount:'',
          total_amount:'',
          
        })])
      });
    }
    get id(){ return this.userForm.get("id") as FormControl }
    get indent_no(){ return this.userForm.get("indent_no") as FormControl }
    get indent_date(){ return this.userForm.get("indent_date") as FormControl }
    get indent_type(){ return this.userForm.get("indent_type") as FormControl }
    get valid_until(){ return this.userForm.get("valid_until") as FormControl }
    get ser_item_type(){ return this.userForm.get("ser_item_type") as FormControl }
    get referance_type(){ return this.userForm.get("referance_type") as FormControl }
    get department(){ return this.userForm.get("department") as FormControl }
    get indent_by(){ return this.userForm.get("indent_by") as FormControl }
    get fullfillment_type(){ return this.userForm.get("fullfillment_type") as FormControl }
    get fullfillment_by(){ return this.userForm.get("fullfillment_by") as FormControl }
    get remarks(){ return this.userForm.get("remarks") as FormControl }
    get confirmed_by(){ return this.userForm.get("confirmed_by") as FormControl }
    get close(){ return this.userForm.get("close") as FormControl }
    get reason(){ return this.userForm.get("reason") as FormControl }
    get c_reason(){ return this.userForm.get("c_reason") as FormControl }
    get pur_Indent_Details() { return this.userForm.get('pur_Indent_Details') as FormArray;}
    get pur_Indent_docs() { return this.userForm.get('pur_Indent_docs') as FormArray;}
    
    ngOnInit() 
    {
      //For User Role
     let user_role=localStorage.getItem("user_role")+"tuhinabcd"+"purchase_inventory";
     this.DropDownListService.getRoleItemMaster(user_role).subscribe(data=>{
     let accessdata=JSON.stringify(data);

     this.indentordersave=false;
     this.indentorderupdate=false;
     this.indentorderview=false;
   
          if(accessdata.includes('indent_order.save'))
           {
            this.indentordersave = true;
           }
          if(accessdata.includes('indent_order.update'))
           { 
             this.indentorderupdate=true;
           }
           if(accessdata.includes('indent_order.view'))
           {
             this.indentorderview=true;
           }

     }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
     this.ngOnInit()});

      this.isHidden = false;
      this.userForm.patchValue({id: 0});
      this.status = false;
      this.userForm.patchValue({indent_by: "0",confirmed_by:"0" ,ser_item_type: "0", fullfillment_by: "0", department: "0"});
      this.isCloseIsYes = false;
      this.isPackingReq = true;
      this.indentType = "";
      this.packingItem = [], this.stockPack = [], this.stockPackUom = [], this.indentPackQty = [];
      this.packingUom = [], this.priceBasedOn = [], 
      this.amount = [],  this.taxAmount = [], this.netAmount = [], this.totalAmount = [];
      this.capacity = [];
      this.packingItemList = [];
      this.empty_bag_wt_priceBasedOn = [];
      this.action = 'update';
      this.empty_bag_wt = [];
      this.priorities=["HIGH","IMMEDIATE","LOW"];
      this.priceBasedOnList = [{display: "ITEM", value: "Item"},{display: "PACKING", value: "Packing"}]
      //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      this.company_name = localStorage.getItem("company_name");
      forkJoin(
        this.DropDownListService.getReasonIndent(),
        this.DropDownListService.itemTypeList(this.company_name),
        this.DropDownListService.employeeNamesList(this.company_name),
        this.Service.getPurchaseIndents(),
        this.DropDownListService.deptNamesList(),
        this.DropDownListService.purposesList(),
        this.DropDownListService.customUOMList(),
        this.DropDownListService.getItemThruPurchase()
      ).subscribe(([reasonData, itemTypeData, employeedata, indentData, deptData,
        purposeData, customUOMData, ItemCodeData])=>
        {
          this.reasonList = reasonData;
          this.itemtypes = itemTypeData;
          this.employeeNames = employeedata;
          this.listIndent  = indentData;
          this.departments = deptData,  this.to_be_useds = deptData;
          this.purposes = purposeData;
          this.customUOMDyns  = customUOMData;
          this.item_codes = ItemCodeData;

          this.pur_Indent_Details.at(0).patchValue({indent_pack_qty: 0, indent_item_qty: 0, price_based_on: "0",
            mat_weight: 0, indicative_price: 0, tax_rate: 0});
            
          this.pur_Indent_Details.at(0).patchValue({to_be_used:"0"});
          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});      
    }

    addItem() 
    {
      this.item_sl_no = this.item_sl_no + 1;     
      this.pur_Indent_Details.push(this.fb.group({
        srl_no:this.item_sl_no,
        item_code:'',
        req_date:'',
        packing_item:'',
        stock_item:'',
        stock_item_uom:'',
        stock_pack:'',
        stock_pack_uom:'',
        indent_pack_qty:'',
        packing_uom:'',
        item_uom:'',
        mat_weight:'',
        mrp:'',
        indent_item_qty:'',
        indicative_price:'',
        price_based_on:'',
        amount:'',         
        qc_norms:'',
        priority:'',
        delivery_date:'',
        purpose:'',
        to_be_used:'',
        remarks:'',
        net_amount:'',	
        tax_code:'',	
        tax_rate:'',
        tax_amount:'',
        total_amount:''}));

      this.selectPackingReq(this.packingReq);
      this.pur_Indent_Details.at(this.item_sl_no - 1).patchValue({indent_pack_qty: 0, indent_item_qty: 0, price_based_on: "0",
        mat_weight: 0, indicative_price: 0, tax_rate: 0});
    }

    deleteItem(index) 
    {
      if(this.item_sl_no > 1)
      {
        this.packingItemList.splice(index, 1);
        this.capacity.splice(index, 1);
        
        this.pur_Indent_Details.removeAt(index);
        this.item_sl_no = this.item_sl_no - 1;
      }
      else
      {
        this.item_sl_no = 1;
        this.packingItemList.splice(index, 1);
        this.capacity.splice(index, 1);
        alert("can't delete all rows");
        this.pur_Indent_Details.reset();
        this.pur_Indent_Details.at(0).patchValue({srl_no: this.item_sl_no});
      } 
      
      for(let i=1; i<=this.item_sl_no; i++)
        this.pur_Indent_Details.at(i-1).patchValue({srl_no: i});
      
    }

    addDocument() 
    {
      this.pur_Indent_docs.push(this.fb.group({
        doc_name : ''}));
    }

    deleteDocument(index) 
    {
      if(index)
      { this.pur_Indent_docs.removeAt(index);}
      else
      {
        alert("can't delete all rows");
        this.pur_Indent_docs.reset();
      }
    }

    onChangeClose(event)
    {
      this.isCloseIsYes = false;
      if(event == 'Yes')
      { this.isCloseIsYes = true;}
    }

    getIndentNo(indentDate, indentType)
    {
      this.status = false;
      this.DropDownListService.getIndSequenceId("IND/"+indentDate+"/"+indentType).subscribe(data=>
      {
        this.seq_no = data.sequenceid;
        this.status = true;
      });   
    }

    onChangeIndentType(type:string)
    {
      this.indentType = type;
      this.getIndentNo(this.currentDate , type)
    }

    deliveryDate:any;
    requiredDate:any;
    onChangeIndentDate(indentDate)
    {
      this.currentDate = indentDate.target.value;
      for(let i = 0; i<this.pur_Indent_Details.length; i++)
      {
        this.deliveryDate =  this.pur_Indent_Details.at(i).get("delivery_date").value as FormControl;
        this.onChangeDeliveryDate(this.deliveryDate, i+1, 'CFC');
        this.requiredDate =  this.pur_Indent_Details.at(i).get("req_date").value as FormControl;
        this.onChangeRequiredDate(this.requiredDate, i+1, 'CFC');
      }
      if(this.indentType != "")
      {this.getIndentNo(this.currentDate, this.indentType)}
    }

    onChangeDeliveryDate(dDate, index, call:string)
    {
      if(call == 'CFT')
      {
        if((dDate.target.value).valueOf() < this.currentDate.valueOf())
        {
          alert("Delivery Date Must be Greater than Indent date, Select another date...");
          this.pur_Indent_Details.at(index).patchValue({delivery_date: null})
        }
      }
      if(call == 'CFC' && dDate != "" && dDate != null)
      {
        if(dDate.valueOf() < this.currentDate.valueOf())
        {
          alert("Delivery Date Must be Greater than Indent date at row "+ index +", Select another date...");
          this.pur_Indent_Details.at(index-1).patchValue({delivery_date: null})
        }
      }
    }

    onChangeRequiredDate(rDate, index, call:string)
    {
      if(call == 'CFT')
      {
        if((rDate.target.value).valueOf() < this.currentDate.valueOf())
        {
          alert("Required Date Must be Greater than Indent date, Select another date...");
          this.pur_Indent_Details.at(index).patchValue({req_date: null})
        }
      }
      if(call == 'CFC' && rDate != "" && rDate != null)
      {
        if(rDate.valueOf() < this.currentDate.valueOf())
        {
          alert("Required Date Must be Greater than Indent date at row "+ index +", Select another date...");
          this.pur_Indent_Details.at(index-1).patchValue({req_date: null})
        }
      }
    }

    onChangeServicesItemType(itemType:string)
    {
      if(itemType.length != 0 && itemType != "0")
      {
        this.status = false;
        this.packingItem =  [];
        this.capacity = [];
        this.empty_bag_wt = [];
        this.empty_bag_wt_priceBasedOn = [];
        this.DropDownListService.getItemThruType(itemType).subscribe(data=>
        {
          this.item_codes = data;
          this.status = true;
        })
      }
    }

    packingReq: any;
    selectPackingReq(event:string)
    {
      this.packingReq = event;
      // if(event == 'No')
      // {
      //   this.isPackingReq = false;
      //   this.priceBasedOnList = [{display: "-Select-", value: "0"},{display: "Item", value: "Item"}];
      //   for(let i=0; i<this.pur_Indent_Details.length; i++)
      //   {
      //     this.pur_Indent_Details.at(i).patchValue({packing_item: "0", stock_pack: "",
      //      stock_pack_uom: "", indent_pack_qty: "", packing_uom: "0"});

      //     if(this.priceBasedOn[i] == 'Packing')
      //     this.pur_Indent_Details.at(i).patchValue({price_based_on: "0", amount: "",
      //     tax_amount: 0, total_amount: 0, net_amount: 0});
      //   }  
      // }
      // else if(event == 'Yes')
      // {  
      //   this.isPackingReq = true;
      //   this.priceBasedOnList = [{display: "Packing", value: "Packing"}, {display: "Item", value: "Item"}]
      //   for(let i=0; i<this.pur_Indent_Details.length; i++)
      //   {
      //     this.pur_Indent_Details.at(i).patchValue({packing_item: this.packingItem[i], stock_pack: this.stockPack[i],
      //       stock_pack_uom: this.stockPackUom[i], indent_pack_qty: this.indentPackQty[i], packing_uom: this.packingUom[i],
      //       price_based_on: this.priceBasedOn[i], amount: this.amount[i], tax_amount: this.taxAmount[i],
      //       net_amount: this.netAmount[i], total_amount: this.totalAmount[i]});
      //   } 
      // }
    }

    showList(s:string)
    {
      if(this.indentordersave == true  && this.indentorderupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        { 
          this.userForm.patchValue({indent_by: "0",confirmed_by:"0" ,ser_item_type: "0", fullfillment_by: "0", department: "0"});
          this.isHidden=true;
        }
      }
      if(this.indentordersave == true  && this.indentorderupdate == false)
      {
        if(s=="add")
        { 
          this.userForm.patchValue({indent_by: "0",confirmed_by:"0" ,ser_item_type: "0", fullfillment_by: "0", department: "0"});
          this.isHidden=true;
        }
      }
      
      if(s=="list")
      {
        this.isHidden=false;
        this.action = 'update';
        this.userForm.reset();
        this.userForm.patchValue({indent_date: this.currentDate}); 

        this.packingItem = [];
        this.selectedItemName = [];
        this.selectedPackingItem = [];
        this.item_sl_no = 0;
        while(this.pur_Indent_Details.length)
        this.pur_Indent_Details.removeAt(0);
        this.addItem();

        while(this.pur_Indent_docs.length)
        this.pur_Indent_docs.removeAt(0);
        this.addDocument();
      }
    }

    _item_qty:any;
    _packing_qty:any;
    _Indicative_price:any;
    amt:any;
    _priceBasedOn:any;
    _taxrate:any;
    _taxAmt:any;
    _totalAmt:any;
    getIndentPackQty(packingQty, index)
    {
      this._packing_qty = packingQty.target.value;
      this._item_qty = this.capacity[index] *  this._packing_qty;
      this.indentPackQty[index] =  this._packing_qty;
      this.pur_Indent_Details.at(index).patchValue({indent_item_qty: this._item_qty});

      if(this.empty_bag_wt_priceBasedOn[index] == 'UOM')
      { this.pur_Indent_Details.at(index).patchValue({mat_weight: (Math.round((this._item_qty - (this.empty_bag_wt[index] * this._packing_qty))*1000)/1000).toFixed(3)});}
      else{this.pur_Indent_Details.at(index).patchValue({mat_weight: ((Math.round((this._item_qty - (this._item_qty * this.empty_bag_wt[index])/100) * 1000))/1000).toFixed(3) });}

      this._Indicative_price = this.pur_Indent_Details.at(index).get("indicative_price").value as FormControl;
      this._priceBasedOn = this.pur_Indent_Details.at(index).get('price_based_on').value as FormControl;
      this._taxrate = this.pur_Indent_Details.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._Indicative_price, this._priceBasedOn, this._taxrate, index)   
    }

    getIndentItemQty(itemQty, index)
    {
      this._packing_qty = this.pur_Indent_Details.at(index).get("indent_pack_qty").value as FormControl;
      this._item_qty = itemQty.target.value;

      if(this.empty_bag_wt_priceBasedOn[index] == 'UOM')
      { this.pur_Indent_Details.at(index).patchValue({mat_weight: (Math.round((this._item_qty - (this.empty_bag_wt[index] * this._packing_qty))*1000)/1000).toFixed(3)});}
      else{this.pur_Indent_Details.at(index).patchValue({mat_weight: ((Math.round((this._item_qty - (this._item_qty * this.empty_bag_wt[index])/100) * 1000))/1000).toFixed(3) });}

      this._Indicative_price = this.pur_Indent_Details.at(index).get("indicative_price").value as FormControl;
      this._priceBasedOn = this.pur_Indent_Details.at(index).get('price_based_on').value as FormControl;
      this._taxrate = this.pur_Indent_Details.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._Indicative_price, this._priceBasedOn, this._taxrate, index)   
    }

    getIndicativePrice(price, index)
    {
      this._packing_qty = this.pur_Indent_Details.at(index).get("indent_pack_qty").value as FormControl;
      this._item_qty = this.pur_Indent_Details.at(index).get("indent_item_qty").value as FormControl;
      this._Indicative_price =  price.target.value;
      this._priceBasedOn = this.pur_Indent_Details.at(index).get('price_based_on').value as FormControl;
      this._taxrate = this.pur_Indent_Details.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._Indicative_price, this._priceBasedOn, this._taxrate, index)
    }

    onChangePriceBasedOn(price_based_on, index)
    {
      this._packing_qty = this.pur_Indent_Details.at(index).get("indent_pack_qty").value as FormControl;
      this._item_qty = this.pur_Indent_Details.at(index).get("indent_item_qty").value as FormControl;
      this._Indicative_price = this.pur_Indent_Details.at(index).get("indicative_price").value as FormControl;
      this._priceBasedOn = price_based_on.target.value;
      this._taxrate = this.pur_Indent_Details.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._Indicative_price, this._priceBasedOn, this._taxrate, index)
    }

    calculateItemData(packingQty, ItemQty, Indicative_price, PriceBasedOn, taxrate, index)
    {
      if(PriceBasedOn == "Packing")
      {this.amt = Indicative_price * packingQty}

      if(PriceBasedOn == "Item")
      {this.amt = Indicative_price * ItemQty}

      if(PriceBasedOn == "0")
      {this.amt = 0}  

      let netAmt = this.amt;
      if(taxrate == 0)
      {this._taxAmt = 0;} 
      else  
      {this._taxAmt = netAmt *(taxrate/100);}
      this._totalAmt = this._taxAmt + netAmt;
      this.priceBasedOn[index] = PriceBasedOn;
      this.amount[index] = this.amt;
      this.taxAmount[index] = this._taxAmt;
      this.netAmount[index] = netAmt;
      this.totalAmount[index] = this._totalAmt;
      this.pur_Indent_Details.at(index).patchValue({amount: (Math.round(this.amt * 100) / 100).toFixed(2), 
        net_amount: (Math.round(netAmt * 100) / 100).toFixed(2), tax_amount: (Math.round(this._taxAmt * 100) / 100).toFixed(2), 
        total_amount: (Math.round(this._totalAmt * 100) / 100).toFixed(2)});
    }

    selectedItemName = [];
    selectedPackingItem = [];
    onchangeItemName(index, itemId)
    {
     console.log(" itemId : "+ itemId);
      if(itemId.length && itemId != "0")
      {
        this.status = false;
        this.selectedPackingItem[index] = [];
        this.pur_Indent_Details.at(index).patchValue({item_code: itemId});
        forkJoin(
          this.DropDownListService.getItemNameById(itemId,this.company_name),
          this.DropDownListService.getItemMasterPackMat(itemId),
          this.DropDownListService.getItemMasterInvData1(itemId,this.company_name),
          this.DropDownListService.retriveItemMasterStatInfo(itemId,this.company_name),
          this.DropDownListService.getItemQCDetails(itemId,this.company_name)
        ).subscribe(([data, data1, data2, data3, data4])=>
        {
          this.pur_Indent_Details.at(index).patchValue({indicative_price: data["standard_rate"]});
          this.DropDownListService.getUomName(data.mstock_unit).subscribe(data=>
          { this.pur_Indent_Details.at(index).patchValue({stock_item_uom :data.description, stock_item: 0, item_uom: data.description}); });
console.log("data1 : "+data1);
          this.packingItemList[index] = data1;
          this.pur_Indent_Details.at(index).patchValue({mrp: data2["mrp"]});
          this.pur_Indent_Details.at(index).patchValue({tax_code: data3[0].tax_code, tax_rate: data3[0].tax_rate});
          this.pur_Indent_Details.at(index).patchValue({qc_norms: data4[0].qc_code});
          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});    
      }
    }

    itemId: any;
    packingQty:any;
    empty_bag_wt:any = [];
    onchangePackingItem(index, packingId)
    {
      if(packingId.length && packingId != "0")
      {
        this.status = false;
        this.pur_Indent_Details.at(index).patchValue({packing_item: packingId})
        this.itemId =  this.pur_Indent_Details.at(index).get("item_code").value as FormControl;
        this._packing_qty = this.pur_Indent_Details.at(index).get("indent_pack_qty").value as FormControl;
        this._Indicative_price = this.pur_Indent_Details.at(index).get("indicative_price").value as FormControl;
        this._priceBasedOn = this.pur_Indent_Details.at(index).get('price_based_on').value as FormControl;
        this._taxrate = this.pur_Indent_Details.at(index).get('tax_rate').value as FormControl;
        this.DropDownListService.getItemPackUom(this.itemId, packingId,this.company_name).subscribe(data=>
        {  
          this.capacity[index] = data.capacity;
          this.packingUom[index] = data.uom1;
          this.empty_bag_wt[index] =  data.empty_big_wt;
          this.empty_bag_wt_priceBasedOn[index] = data.empbagwt_based_on;
          this.pur_Indent_Details.at(index).patchValue({stock_pack_uom: data.uom1, stock_pack:0, packing_uom: data.uom1}); 
          this.stockPackUom[index] = data.uom1;
          this.stockPack[index] = 0;
          this._item_qty = this.capacity[index] *  this._packing_qty;
          this.pur_Indent_Details.at(index).patchValue({indent_item_qty:  this._item_qty,
            mat_weight: this.capacity[index] *  this._packing_qty - this.empty_bag_wt[index]});
          this.calculateItemData(this._packing_qty, this._item_qty, this._Indicative_price, this._priceBasedOn, this._taxrate, index)
          this.status = true;
        });   
      }
    }

    onchangePackingUom(index,event)
    {
      this.packingUom[index] = event;
    }

    itemCode:any;
    showPopUp2(index)
    {
      this.itemCode = this.pur_Indent_Details.at(index).get('item_code').value as FormControl;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index, item_code: this.itemCode};
      const dialogRef = this.dialog.open(QcNormPopUpModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data =>
      {
        this.pur_Indent_Details.at(index).patchValue({qc_norms: data["qc_code"]});
      }); 
    }

    IndentNo:any;
    send()
    {
      this.IndentNo= this.userForm.get("id").value as FormControl;
      this.userForm.patchValue({
        company_id: this.company_name, fin_year:localStorage.getItem("financial_year"),
        username: localStorage.getItem("username")});
      this.submitted = true;
      if(!this.userForm.valid) 
      {
        alert('Please fill all fields!')
        return false;
      } 
      else 
      {
        if(this.IndentNo != 0)
          {
          this.status = false;
          this.Service.updatePurIndent(this.userForm.getRawValue(),this.IndentNo).subscribe( data => 
          {
            console.log(this.userForm.value);
            alert("Indent Order Updated successfully.");
            this.userForm.reset();
            this.item_sl_no = 1;
            this.status = true;
            //refresh List;
            this.ngOnInit();
            //Refresh dynemic table
            this.packingItemList =[]; 
            this.item_sl_no = 0;
            while(this.pur_Indent_Details.length)
            this.pur_Indent_Details.removeAt(0);
            this.addItem();

            while(this.pur_Indent_docs.length)
            this.pur_Indent_docs.removeAt(0);
            this.addDocument();                  
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});    
        }
        else
         {
          this.status = false;
          this.Service.createPurchaseIndent(this.userForm.getRawValue()).subscribe( data => 
          {
            console.log(this.userForm.value);
            alert("New Indent Order created successfully.");
            this.userForm.reset();
            this.item_sl_no = 1;
            this.status = true;
            //refresh List;
            this.ngOnInit();
            //Refresh dynemic table
            this.packingItemList =[]; 
            this.item_sl_no = 0;
            while(this.pur_Indent_Details.length)
            this.pur_Indent_Details.removeAt(0);
            this.addItem();

            while(this.pur_Indent_docs.length)
            this.pur_Indent_docs.removeAt(0);
            this.addDocument();                  
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});    

         }
      }
    }

    onUpdate(id:any,indent_id:string, action)
    {
      this.indentordersave=true;
      this.userForm.patchValue({id: id});
      this.status = false;
      this.packingItemList = [];
      this.selectedItemName = [];
      this.selectedPackingItem = [];
      this.isHidden = true;
      if(action == 'view')
      {this.action = 'view';}
      else
      {this.action = 'update'; }
      forkJoin(
        this.UpdateService.PurIndentOrderRetrive(id),
        this.UpdateService.GetPurIndentDetailsList(indent_id),
        this.UpdateService.IndentOrderDocRetriveList(indent_id)
      ).subscribe(([indentDetails, itemData, DocDetails])=>
        {
          this.onChangeServicesItemType(indentDetails["ser_item_type"]);
          this.indentType = indentDetails["indent_type"];
          this.onChangeClose(indentDetails["close"]);
          this.userForm.patchValue(indentDetails)
          console.log("indentDetails: "+  JSON.stringify(indentDetails));

          console.log("itemData: "+  JSON.stringify(itemData));
          let k = 0;
          this.item_sl_no = 0;
          while (this.pur_Indent_Details.length) 
          {this.pur_Indent_Details.removeAt(0);}
          for(let data1 of itemData)
          { 
            this.status = false;
            this.addItem();
            forkJoin(
              this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
              this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing_item"],this.company_name)
            ).subscribe(([packingList, capacityEmptyWt])=>
              {
                this.status = true;
                this.packingItemList[k] = packingList; 
                this.capacity[k] = capacityEmptyWt.capacity;
                this.empty_bag_wt[k] =  capacityEmptyWt.empty_big_wt;
                this.selectedItemName[k] = data1["item_code"];
                this.selectedPackingItem[k] = data1["packing_item"];
                this.pur_Indent_Details.at(k).patchValue(data1);
                k = k + 1;
              });
          }

          while (this.pur_Indent_docs.length ) 
          {this.pur_Indent_docs.removeAt(0);}
          for(let i=0;i<DocDetails.length;i++)
          {this.addDocument();}
          this.pur_Indent_docs.patchValue(DocDetails);
          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});    
    }
  }
