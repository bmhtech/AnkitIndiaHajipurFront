import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Master } from '../../../../../../service/master.service';
import { IndentOrder} from '../../../../../../models/StockTransfer/indent-order';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { StockQcPopupComponent } from '../stock-qc-popup/stock-qc-popup.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-indent-order',
  templateUrl: './indent-order.component.html',
  styleUrls: ['./indent-order.component.scss']
})
export class IndentOrderComponent implements OnInit {
  status = false; 
  employeeNames:{};
  listIndentOrder: IndentOrder[];
  item_sl_no = 1;
  purposes:{};
  priorities:{};
  basislist: {};
  to_be_useds:{};
  customUOMDyns:{};
  item_codes:{};
  departments:{};
  businesslists:{};
  //businesslists:any=[];
  chargesIdList:{};
  currentDate:any;
  submitted = false;
  seq_no:string;
  company_name:any;
  reasonIdList: {};
  public userForm:FormGroup;
  isHidden = false;
  Reason="0";
  model: IndentOrder = new IndentOrder();
  constructor(public fb:FormBuilder,private Service: Master,
    private dialog: MatDialog,private DropDownListService: DropdownServiceService)
     { 
      this.userForm=fb.group(
        {
          id:[""],
          indent_id:[""],
          indent_no:[''],
          indent_date: [''],	
          referance_type: [''],	
          business_unit:[''],
          refer_by:[''],
          service_item:[''],
          department: [''],
          indent_status:[''],
          valid_until: [''],	
          remarks: [''],	
          confirmed_by: [''],
          approved: [''],	
          reason: [''],	
          approved_remarks:[''],
          company_id: [''],
          fin_year: [''],
          username: [''],
          
          stock_Indent_docs: this.fb.array([this.fb.group({
            doc_name : ''})]),

            stock_Indent_Terminations:this.fb.group({
              term_pur_ord: '',
              order_by: '',
              reason: '',
              remarks: '',
              tot_term_chg: '',
              term_add: '',
              term_deduct: '',
              net_term_chg: '',
              charges_descpt:'' }),
            
              stock_Indent_Terminations_dyn:this.fb.array([this.fb.group({
              charge_name:'',
              termination_cal:'',
              cal_qty:'',
              amount:'', 
              method: '',
              tax_rate: '' })]),
        
            stock_Indent_Item_Details: this.fb.array([this.fb.group({
              srl_no:this.item_sl_no,
                item_code:'',
                req_date:'',
                packing_item:'',
                stock_item:'',
                stock_item_uom:'',
                stock_pack_uom:'',
                indent_pack_qty:'',
                indent_item_qty:'',
                stock_pack:'',
                packing_uom: '',
                item_uom:'',
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
      get indent_id(){ return this.userForm.get("indent_id") as FormControl }
      get indent_no(){ return this.userForm.get("indent_no") as FormControl }
      get indent_date(){ return this.userForm.get("indent_date") as FormControl }
      get referance_type(){ return this.userForm.get("referance_type") as FormControl }
      get business_unit(){ return this.userForm.get("business_unit") as FormControl }
      get refer_by(){ return this.userForm.get("refer_by") as FormControl }
      get service_item(){ return this.userForm.get("service_item") as FormControl }
      get department(){ return this.userForm.get("department") as FormControl }
      get indent_status(){ return this.userForm.get("indent_status") as FormControl }
      get valid_until(){ return this.userForm.get("valid_until") as FormControl }
      get remarks(){ return this.userForm.get("remarks") as FormControl }
      get confirmed_by(){ return this.userForm.get("confirmed_by") as FormControl }
      get approved(){ return this.userForm.get("approved") as FormControl }
      get reason(){ return this.userForm.get("reason") as FormControl }
      get approved_remarks(){ return this.userForm.get("approved_remarks") as FormControl }
      get stock_Indent_Item_Details() { return this.userForm.get('stock_Indent_Item_Details') as FormArray;}
      get stock_Indent_Terminations() { return this.userForm.get('stock_Indent_Terminations') as FormGroup;}
      get stock_Indent_Terminations_dyn() {return this.userForm.get('stock_Indent_Terminations_dyn') as FormArray;}
      get stock_Indent_docs() { return this.userForm.get('stock_Indent_docs') as FormArray;}
  
      docsAdd() 
      {
        this.stock_Indent_docs.push(this.fb.group({
          doc_name : '' }));
      }
  
      docsDelete(index) 
      {
        if(index)
        {
        this.stock_Indent_docs.removeAt(index);
        }
        else
        {
          alert("can't delete all rows");
          this.stock_Indent_docs.reset();
        }
      }

      addItem() 
      {
        this.item_sl_no = this.item_sl_no + 1;     
        this.stock_Indent_Item_Details.push(this.fb.group({
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
            total_amount:'',
         
        }));
        //this.selectPackingReq(this.packingReq);
      }
  
      deleteItem(index) 
      {
        if(this.item_sl_no > 1)
        { 
          this.stock_Indent_Item_Details.removeAt(index);
          this.item_sl_no = this.item_sl_no - 1;
        }
        else
        {
          alert("can't delete all rows");
          this.stock_Indent_Item_Details.reset();
          this.stock_Indent_Item_Details.at(0).patchValue({srl_no: 1});
        } 
        
        for(let i=1; i<=this.item_sl_no; i++)
          this.stock_Indent_Item_Details.at(i-1).patchValue({srl_no: i});
        
      }

      addTerminations()
    {
      this.stock_Indent_Terminations_dyn.push(this.fb.group({
        charge_name:'',
        termination_cal:'',
        cal_qty:'',
        amount:'', 
        method: '',
        tax_rate: ''}));
    }

      onChangeReason(applicable_charges_id:string)
      {
        this.DropDownListService.getChargeMasterDtlsList(applicable_charges_id).subscribe(data=>
        {
          let i =0;
          while(this.stock_Indent_Terminations_dyn.length)
          {this.stock_Indent_Terminations_dyn.removeAt(0);}
      
          for(let data1 of data)
          {
            this.addTerminations();
            this.stock_Indent_Terminations_dyn.at(i).patchValue({
             charge_name: data1.charge_name, tax_rate: data1.tax_rate,
              method: data1.method, termination_cal: data1.rate_cal});
            i=i+1;
          }
        });
      }

    itemCode:any;
    showPopUp2(index)
    {
      this.itemCode = this.stock_Indent_Item_Details.at(index).get('item_code').value as FormControl;    
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index, item_code: this.itemCode};
      const dialogRef = this.dialog.open(StockQcPopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe( data => 
      {
        this.stock_Indent_Item_Details.at(index).patchValue({qc_norms: data["qc_code"]});
      }); 
    }

      calItemQty(packing_qty, index)
      {
        this.stock_Indent_Item_Details.at(index).patchValue({indent_item_qty: this.capacity * packing_qty.target.value});
      }

    capacity:any;
    packingItem:any = [];
    onchangeItemName(index,event)
    {
      this.status = false;
      this.DropDownListService.getItemNameById(event.target.value,this.company_name).subscribe(data=>
      {      
       
        this.DropDownListService.getUomName(data.mstock_unit).subscribe(data=>{
          this.stock_Indent_Item_Details.at(index).patchValue({stock_item_uom :data.description, stock_item: 0});  });
      
        this.DropDownListService.getItemMasterPackMat(event.target.value).subscribe(data1=>{   
          this.packingItem[index] = data1;});

         this.DropDownListService.retriveItemMasterStatInfo(event.target.value,this.company_name).subscribe(data=>{   
         this.stock_Indent_Item_Details.at(index).patchValue({tax_code:data[0].tax_code, tax_rate:data[0].tax_rate}); });

        this.DropDownListService.getItemQCDetails(event.target.value,this.company_name).subscribe(data=>{   
          this.stock_Indent_Item_Details.at(index).patchValue({qc_norms:data[0].qc_code}); });  

        this.status = true;
      }); 
    }

    onchangeItemName1(index,Item:string)
    {
        this.DropDownListService.getItemMasterPackMat(Item).subscribe(data1=>{   
         this.packingItem[index] = data1;})
    }

    itemId: any;
    onchangePackingItem(index,event,)
    {
      if(event)
      {
        this.status = false;
        this.itemId =  this.stock_Indent_Item_Details.at(index).get("item_code").value as FormControl;
        this.DropDownListService.getItemPackUom(this.itemId, event.target.value,this.company_name).subscribe(data=>
        {   
          this.capacity = data.capacity;
          this.stock_Indent_Item_Details.at(index).patchValue({stock_pack_uom: data.uom1, stock_pack:0});
          this.status = true;
        });
      }
    }

    amt:any;
    _item_qty:any;
    _mrp:any;
    _packing_qty:any;
    _Indicative_price:any;
    _taxrate:any;
    _taxAmt:any;
    _totalAmt:any;
    onChangePriceBasedOn(price_based_on, index)
    {
      this._mrp = this.stock_Indent_Item_Details.at(index).get("indicative_price").value as FormControl;
      this._taxrate = this.stock_Indent_Item_Details.at(index).get('tax_rate').value as FormControl;

      if(price_based_on.target.value == "Packing")
      {
        this._packing_qty = this.stock_Indent_Item_Details.at(index).get("indent_pack_qty").value as FormControl;
        this.amt = this._mrp * this._packing_qty;
      }
      if(price_based_on.target.value == "Item")
      {
        this._item_qty = this.stock_Indent_Item_Details.at(index).get("indent_item_qty").value as FormControl;
        this.amt = this._mrp * this._item_qty;
      }
      let netAmt = this.amt;
      this._taxAmt = netAmt *(this._taxrate/100);
      this._totalAmt = this._taxAmt + netAmt;
      this.stock_Indent_Item_Details.at(index).patchValue({amount: this.amt, net_amount: netAmt,
        tax_amount: this._taxAmt, total_amount: this._totalAmt});
    }
  
    Refer_by:any;
      ngOnInit() 
      {
        this.userForm.patchValue({refer_by:"0"});
        this.Refer_by= this.userForm.get("refer_by").value as FormControl;
        this.userForm.patchValue({refer_by:this.Refer_by});
        this.stock_Indent_Terminations.patchValue({order_by:"0",charges_descpt:"0"});
        this.isHidden = false;
        this.basislist = ["%", "UOM","Fixed"];  
        this.Service.getStockIndentOrder().subscribe(data=>{this.listIndentOrder  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});   
        this.priorities=["High","Low","Immediate"];
        this.DropDownListService.purposesList().subscribe(data=>{this.purposes = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});   
        this.company_name = localStorage.getItem("company_name");
        this.DropDownListService.customUOMList().subscribe(data=>{this.customUOMDyns  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});   
        this.DropDownListService.deptNamesList().subscribe(data=>{this.to_be_useds = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});   
        this.DropDownListService.getItemThruPurchase().subscribe(data=>{this.item_codes = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});   
        this.DropDownListService.custometrBusList(this.company_name).subscribe(data=>{this.businesslists  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});      
        this.DropDownListService.deptNamesList().subscribe(data=>{this.departments = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});   
        //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
        this.DropDownListService.getSTISequenceId(this.currentDate).subscribe(data=>{this.seq_no = data.sequenceid;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});    
        this.DropDownListService.getPurTermReasons().subscribe(data=>{this.reasonIdList = data}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});   
        this.DropDownListService.getChargeMasterList().subscribe(data=>{this.chargesIdList  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});   
        this.DropDownListService.employeeNamesList(this.company_name).subscribe(data=>{this.employeeNames = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});   
        this.status = true; 
        this.userForm.patchValue({business_unit:"0",department:"0",confirmed_by:"0",reason:this.Reason});
      }


    onChangeStkIndentDate(indentDate)
    {
      this.currentDate = indentDate.target.value;
     this.getStkIndentNo(this.currentDate)
    }

    getStkIndentNo(indentDate)
    {
      this.status = false;
      this.DropDownListService.getSTISequenceId(indentDate).subscribe(data=>
      {
        this.seq_no = data.sequenceid;
        this.status = true;
      });   
    }

  showList(s:string)
  { 
    this.Refer_by= this.userForm.get("refer_by").value as FormControl;
    if(s=="add")
    { 
      this.userForm.patchValue({business_unit:"0",refer_by: this.Refer_by,
      department:"0",confirmed_by:"0",reason:"0"});
      this.stock_Indent_Terminations.patchValue({order_by:"0",charges_descpt:"0"});
      this.isHidden=true;
    }
    if(s=="list")
    {this.isHidden=false;}
  }

  send()
  {
    this.userForm.patchValue({ 
      company_id: localStorage.getItem("company_name"), fin_year:localStorage.getItem("financial_year"),
      username: localStorage.getItem("username")});
    this.submitted = true;
    if(!this.userForm.valid) 
    {
      alert('Please fill all fields!')
      return false;
    } else {

      this.status = false;
      if(this.userForm.get("referance_type").value == null || this.userForm.get("referance_type").value == 0)
      {
        alert("Please Select Referance Type");
        this.status=true;
      }
      else if(this.userForm.get("business_unit").value == null || this.userForm.get("business_unit").value == 0)
      {
        alert("Please Select Business Unit");
        this.status=true;
      }
      else if(this.userForm.get("refer_by").value == null || this.userForm.get("refer_by").value == 0)
      {
        alert("Please Select Refered by");
        this.status=true;
      }
      else if(this.userForm.get("service_item").value == null || this.userForm.get("service_item").value == 0)
      {
        alert("Please Select Service/Item");
        this.status=true;
      }
      else if(this.userForm.get("department").value == null || this.userForm.get("department").value == 0)
      {
        alert("Please Select Department");
        this.status=true;
      }
      else if(this.userForm.get("indent_status").value == null || this.userForm.get("indent_status").value == 0)
      {
        alert("Please Select Status");
        this.status=true;
      }
      else
      {
        let itemcheck = false;
        let packingcheck = false;
        let itemquantity = false;
        let packingquantity = false;
        let price = false;
        let pricebasedon = false;
        for(let b=0;b<this.stock_Indent_Item_Details.length;b++)
          {
            if(this.stock_Indent_Item_Details.at(b).get("item_code").value == null || this.stock_Indent_Item_Details.at(b).get("item_code").value == 0)
            {
               itemcheck = true;
            }
            if(this.stock_Indent_Item_Details.at(b).get("packing_item").value == null || this.stock_Indent_Item_Details.at(b).get("packing_item").value == 0)
            {
               packingcheck = true;
            }
            if(this.stock_Indent_Item_Details.at(b).get("indent_item_qty").value == null || this.stock_Indent_Item_Details.at(b).get("indent_item_qty").value == 0)
            {
               itemquantity = true;
            }
            if(this.stock_Indent_Item_Details.at(b).get("indent_pack_qty").value == null || this.stock_Indent_Item_Details.at(b).get("indent_pack_qty").value == 0)
            {
               packingquantity = true;
            }
            if(this.stock_Indent_Item_Details.at(b).get("indicative_price").value == null || this.stock_Indent_Item_Details.at(b).get("indicative_price").value == 0)
            {
               price = true;
            }
            if(this.stock_Indent_Item_Details.at(b).get("price_based_on").value == null || this.stock_Indent_Item_Details.at(b).get("price_based_on").value == 0)
            {
               pricebasedon = true;
            }
          }

          if(itemcheck == true)
          {
            alert("Please Select Item Name in Item Details Tab!!!");this.status = true;
          }
          else if(packingcheck == true)
          {
            alert("Please Select PACKING ITEM in Item Details Tab!!!");this.status = true;
          }
          else if(packingquantity == true)
          {
            alert("Please Enter Packing Quantity in Item Details Tab!!!");this.status = true;
          }
          else if(itemquantity == true)
          {
            alert("Please Enter Item Quantity in Item Details Tab!!!");this.status = true;
          }
          else if(price == true)
          {
            alert("Please Enter Indicative Price in Item Details Tab!!!");this.status = true;
          }
          else if(pricebasedon == true)
          {
            alert("Please Select Price Based On in Item Details Tab!!!");this.status = true;
          }
          else if(this.userForm.get("confirmed_by").value == null || this.userForm.get("confirmed_by").value == 0)
          {
            alert("Please Select Confirmed By in Approval Tab!!!");
            this.status = true;
          }
          else if(this.userForm.get("approved").value == null || this.userForm.get("approved").value == 0)
          {
            alert("Please Select Approved in Approval Tab!!!");
            this.status = true;
          }
          else if(this.userForm.get("reason").value == null || this.userForm.get("reason").value == 0)
          {
            alert("Please Select Reason in Approval Tab!!!");
            this.status = true;
          }
          else
          {
             this.Service.createStockIndentOrder(this.userForm.getRawValue())
           .subscribe( data => {
             console.log(this.userForm.getRawValue());
             alert("New Indent Order created successfully.");
             this.userForm.reset();
             this.isHidden = false ;     
             this.status = true;
             this.ngOnInit();
           }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
           this.ngOnInit()});  
            }
      }
           
    }
  }

  onUpdate(id:any,indent_id:string, action)
  {
    this.isHidden = true;


    forkJoin(
      this.Service.retriveStkIndentOrd(id),
      this.Service.getStkIndentOrdItemDtlsList(indent_id),
      this.Service.getStkIndentDocsList(indent_id),
      this.Service.getStkIndentTermDtlsList(indent_id),
      this.Service.getStkIndTermDtls(indent_id)
    ).subscribe(([IndentData,itemData,DocDetails,TermsDtlsList,TermsDtls])=>
      {
        this.userForm.patchValue({id:IndentData["id"],indent_id:IndentData["indent_id"],indent_no:IndentData["indent_no"],indent_date:IndentData["indent_date"],
        referance_type:IndentData["referance_type"],business_unit:IndentData["business_unit"],    
        refer_by:IndentData["refer_by"],service_item:IndentData["service_item"],department:IndentData["department"],indent_status:IndentData["indent_status"],
        valid_until:IndentData["valid_until"],remarks:IndentData["remarks"],
        confirmed_by:IndentData["confirmed_by"],approved:IndentData["approved"],reason:IndentData["reason"],approved_remarks:IndentData["approved_remarks"],
        company_id:IndentData["company_id"],fin_year:IndentData["fin_year"],
        username:IndentData["username"]
      });
        console.log("IndentData: "+  JSON.stringify(IndentData));
      
        console.log("itemData: "+  JSON.stringify(itemData));
        let k = 0;
        this.item_sl_no = 0;
        while (this.stock_Indent_Item_Details.length) 
        {this.stock_Indent_Item_Details.removeAt(0);}
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
              this.onchangeItemName1(k,data1["item_code"])
              this.stock_Indent_Item_Details.at(k).patchValue(data1);
              k = k + 1;
            });
        }

          console.log("DocDetails: "+  JSON.stringify(DocDetails));
          while (this.stock_Indent_docs.length) 
          this.stock_Indent_docs.removeAt(0);
          for(let data1 of DocDetails) 
          this.docsAdd();
          this.stock_Indent_docs.patchValue(DocDetails);

          console.log("TermsDtlsList: "+  JSON.stringify(TermsDtlsList));
          while (this.stock_Indent_Terminations_dyn.length) 
          this.stock_Indent_Terminations_dyn.removeAt(0);
          for(let data1 of TermsDtlsList) 
          this.addTerminations();
          this.stock_Indent_Terminations_dyn.patchValue(TermsDtlsList);

          console.log("TermsDtls: "+  JSON.stringify(TermsDtls));
          this.stock_Indent_Terminations.patchValue(TermsDtls);  
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});   
  }

}
