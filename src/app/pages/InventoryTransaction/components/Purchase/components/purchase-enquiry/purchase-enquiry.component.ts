import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Enquiry} from '../../../../../../models/transaction/PurchaseTransaction/PurchaseEnquiry';
import { PurchaseModuleServiceService } from '../../../../../../service/purchase-module-service.service';
import { IndentOrderPopUpModalComponent } from '../../components/indent-order-pop-up-modal/indent-order-pop-up-modal.component';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { QcNormPopUpModalComponent} from '../qc-norm-pop-up-modal/qc-norm-pop-up-modal.component';
import { SupplierPopUpModalComponent } from '../supplier-pop-up-modal/supplier-pop-up-modal.component';
import { Supp_bussiness_partner_addr_dyn, Supp_bussiness_partner } from '../../../../../../Models/SupplierModel/Supp_bussiness_partner';
import { formatDate } from '@angular/common';
import { PackingListPopUpComponent } from '../../components/packing-list-pop-up/packing-list-pop-up.component';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';
import { Master } from '../../../../../../service/master.service';
import { forkJoin } from 'rxjs';

  @Component({
  selector: 'app-purchase-enquiry',
  templateUrl: './purchase-enquiry.component.html',
  styleUrls: ['./purchase-enquiry.component.scss']
 })
 
  export class PurchaseEnquiryComponent implements OnInit 
  {
    @ViewChild(SelectAutocompleteComponent) multiSelect: SelectAutocompleteComponent;
    submitted = false;
    public userForm:FormGroup;
    model: Enquiry = new Enquiry();
    listEnquiry: Enquiry[];
    referenceTypes:{};
    itemtypes:any = [];
    deptNames:any = [];
    supplierList:any = [];
    paymentTermList:any = [];
    customUOMDyns:{};
    isHidden:any;
    enqMode:any = [];
    priorities:{};
    purposes:{};
    fullFillBy:{};
    enqTpes:{};
    enqStatus:{};
    transborns:{};
    businesslists:any = [];
    reasonList:any = [];
    empNames:any = [];
    item_codes:any = [];
    item_sl_no = 1;
    bp_sl_no = 1;
    currentDate:any;
    status:any;
    packingReq: any;
    isPackingListReq:any = [];
    seq_no:string;
    send_via_list:{};
    approve:any = [];
    enquiryType:any;
    isPackingReq:any;
    packingItem:any;
    packingUom:any;
    packingQuantity:any;
    priceBasedOn:any;
    amount:any;
    taxAmount:any;
    netAmount:any;
    totalAmount:any;
    capacity:any;
    packingItemList:any;
    itemId: any;
    priceBasedOnList:any;
    empty_bag_wt_priceBasedOn:any = [];
    company_name:any;
    seritemtype:any;
    action:any;
    purchaseenquirysave:boolean = true;
    purchaseenquiryview:boolean = true;
    purchaseenquiryupdate:boolean = true;
  
    constructor(public fb:FormBuilder,public dialog: MatDialog,private Service: PurchaseModuleServiceService,
      private UpdateService: Master, private DropDownListService: DropdownServiceService)
    { 
      this.userForm=fb.group(
      {
        enquiry_id:[''],
        id:[''],
        enquiry_no:[''],
        enquiry_date:[''],
        valid_until:[''],  
        enquiry_type:[''],
        mode_of_enq:[''],
        enquiry_status:[''],
        service_type:[''],
        referance_type:[''],
        dept:[''],
        remarks:[''],
        fullfillment_by:[''],
        fullfillment_type:[''],
        payment_term:[''],
        trans_born_by:[''],
        loc_of_delivery:[''],
        security_doc:[''],
        packing_req:[''],
        confirmed_by: [''],
        approved: [''],
        reason: [''],
        company_id: [''],
        fin_year: [''],
        referance_id: [''],
        username: [''],
      
        pur_Enquiry_Service_Details: this.fb.array([this.fb.group({
          sl_no:this.item_sl_no,
          item_code:'',
          packing_item:'',
          packing_uom:'',
          packing_qty:'',
          item_uom:'',
          item_qty:'',
          mat_weight: '',
          mrp:'',
          price_based_on:'',
          amount:'',
          net_amount:'',	
          tax_code:'',	
          tax_rate:'',
          tax_amount:'',
          total_amount:'',
          qc_norms:'',
          priority:'',
          delivery_date:'',
          required_date:'',
          purpose:'',
          to_be_used:'',
          remarks:'',
          packing_list_req:'',
          packing_list:'',})]),

        pur_Enquiry_BPartner_Details: this.fb.array([this.fb.group({
          sl_no:this.bp_sl_no,
          bp_code:'',
          cp_name:'',
          cp_mobile:'',
          send_via:''
        })]),

        pur_Enquiry_docs: this.fb.array([this.fb.group({
          doc_name:'' })])

      });
    }

    get referance_id(){ return this.userForm.get("referance_id") as FormControl }
    get id(){ return this.userForm.get("id") as FormControl }
    get enquiry_no(){ return this.userForm.get("enquiry_no") as FormControl }
    get enquiry_date(){ return this.userForm.get("enquiry_date") as FormControl }
    get valid_until(){ return this.userForm.get("valid_until") as FormControl }
    get enquiry_type(){ return this.userForm.get("enquiry_type") as FormControl }
    get mode_of_enq(){ return this.userForm.get("mode_of_enq") as FormControl }
    get enquiry_status(){ return this.userForm.get("enquiry_status") as FormControl }
    get service_type(){ return this.userForm.get("service_type") as FormControl }
    get referance_type(){ return this.userForm.get("referance_type") as FormControl }
    get dept(){ return this.userForm.get("dept") as FormControl }
    get remarks(){ return this.userForm.get("remarks") as FormControl }
    get security_doc(){ return this.userForm.get("security_doc") as FormControl }
    get loc_of_delivery(){ return this.userForm.get("loc_of_delivery") as FormControl }
    get trans_born_by(){ return this.userForm.get("trans_born_by") as FormControl }
    get payment_term(){ return this.userForm.get("payment_term") as FormControl }
    get fullfillment_type(){ return this.userForm.get("fullfillment_type") as FormControl }
    get fullfillment_by(){ return this.userForm.get("fullfillment_by") as FormControl }
    get confirmed_by(){ return this.userForm.get("confirmed_by") as FormControl}
    get approved(){ return this.userForm.get("approved") as FormControl}
    get reason(){ return this.userForm.get("reason") as FormControl}
    get pur_Enquiry_Service_Details(){return this.userForm.get('pur_Enquiry_Service_Details') as FormArray;}
    get pur_Enquiry_BPartner_Details()
    {return this.userForm.get('pur_Enquiry_BPartner_Details') as FormArray; }
    get pur_Enquiry_docs()
    {return this.userForm.get('pur_Enquiry_docs') as FormArray;}
  
    ngOnInit()
    {
      //For User Role
     let user_role=localStorage.getItem("user_role")+"tuhinabcd"+"purchase_inventory";
     this.DropDownListService.getRoleItemMaster(user_role).subscribe(data=>{
     let accessdata=JSON.stringify(data);

     this.purchaseenquirysave=false;
     this.purchaseenquiryview=false;
     this.purchaseenquiryupdate=false;

     if(accessdata.includes('purchase_enquiry.save'))
           {
            this.purchaseenquirysave = true;
           }
          if(accessdata.includes('purchase_enquiry.update'))
           { 
             this.purchaseenquiryupdate=true;
           }
           if(accessdata.includes('purchase_enquiry.view'))
           {
             this.purchaseenquiryview=true;
           }
   
     }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
     this.ngOnInit()});
     
      this.status = false;
      this.isPackingListReq[0] = "false";
      this.enquiryType = "";
      this.isPackingReq = true;
      this.isHidden = false;
      this.seritemtype = "0";
      this.packingItem = [], this.packingUom = [], this.packingQuantity = [], this.priceBasedOn = [], 
      this.amount = [],  this.taxAmount = [], this.netAmount = [], this.totalAmount = [];
      this.capacity = [];
      this.packingItemList = [];
      this.itemId = [];
      this.action = 'update';
      this.priceBasedOnList = [{display: "-Select-", value: "0"},{display: "ITEM", value: "Item"},{display: "PACKING", value: "Packing"}]
      
      // this.enqMode=[{display: "EMAIL", value: "Email"},{display: "FAX", value: "Fax"},,{display: "IN PERSON", value: "In person"},{display: "TELEPHONE", value: "Telephone"},    
      // {display: "WEBSITE", value: "Website"}, {display: "OTHER", value: "Other"}];
     
      this.approve=["NO","PENDING","YES"];
      this.priorities=["HIGH","IMMEDIATE","LOW"];
      this.fullFillBy=["FULL FILLMENT BY"];
      //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      this.enqStatus=["CLOSE","OPEN"];
      this.transborns=["OWN ACCOUNT","PARTY ACCOUNT"];  
      this.send_via_list=["COURIER","EMAIL","FAX","OTHER"];
      this.userForm.patchValue({id: 0, referance_id: 0});
      this.company_name = localStorage.getItem("company_name");
      forkJoin(
        this.DropDownListService.getPurTermReasons(),
        this.DropDownListService.getAccPayTerms(),
        this.DropDownListService.supplierMAsterNCList(),
        this.Service.getPurchaseEnquiries(),
        this.DropDownListService.itemTypeList(this.company_name),
        this.DropDownListService.deptNamesList(),
        this.DropDownListService.purposesList(),
        this.DropDownListService.customUOMList(),
        this.DropDownListService.custometrBusList(this.company_name),
        this.DropDownListService.employeeNameList(this.company_name),
        this.DropDownListService.getItemThruPurchase()
      ).subscribe(([reasonData, payTermData, supplierMasterNcData, purEnqData, itemTypedata, deptdata,
         purposeData, customUOMData, custometrBusData, employeeData, itemCodeData])=>
        {
          this.reasonList = reasonData;
          this.paymentTermList = payTermData;
          this.supplierList = supplierMasterNcData;
          this.listEnquiry  = purEnqData;
          this.itemtypes  = itemTypedata;
          this.deptNames  = deptdata;
          this.purposes  = purposeData;
          this.customUOMDyns  = customUOMData;
          this.businesslists = custometrBusData;
          this.empNames = employeeData;
          this.item_codes = itemCodeData;
          this.pur_Enquiry_Service_Details.at(0).patchValue({packing_item:"0"})
          this.userForm.patchValue({service_type: "0", fullfillment_by: "0", dept:"0", loc_of_delivery:"0", confirmed_by:"0"})
          this.pur_Enquiry_Service_Details.at(0).patchValue({packing_qty: 0, item_qty: 0, price_based_on: "0",
            mat_weight: 0, mrp: 0, tax_rate: 0});
          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});    
    }

    onChangeServicesItemType(event)
    {
      this.seritemtype = event;
      if(event.length != 0 && event != "0")
      {
        this.packingItem =  [];
        this.capacity = [];
        this.empty_bag_wt = [];
        this.empty_bag_wt_priceBasedOn = [];
        this.status = false;
        this.DropDownListService.getItemThruType(event).subscribe(data=>
        {
          this.item_codes = data;
          this.status = true;
        })
      }
    }

    getEnquiryNo(enqDate, enqType)
    {
      this.status = false;
      this.DropDownListService.getEnqSequenceId("ENQ/"+enqDate+"/"+enqType).subscribe(data=>
      {
        this.seq_no = data.sequenceid;
        this.status = true;
      });   
    }

    onChangeEnquiryType(type:string)
    {
      this.enquiryType = type;
      this.getEnquiryNo(this.currentDate , type)
    }

    deliveryDate:any;
    requiredDate:any;
    onChangeEnquiryDate(enqDate)
    {
      this.currentDate = enqDate.target.value;
      for(let i = 0; i<this.pur_Enquiry_Service_Details.length; i++)
      {
        this.deliveryDate =  this.pur_Enquiry_Service_Details.at(i).get("delivery_date").value as FormControl;
        this.onChangeDeliveryDate(this.deliveryDate, i+1, 'CFC');
        this.requiredDate =  this.pur_Enquiry_Service_Details.at(i).get("required_date").value as FormControl;
        this.onChangeRequiredDate(this.requiredDate, i+1, 'CFC');
      }
      if(this.enquiryType != "")
      {this.getEnquiryNo(this.currentDate, this.enquiryType)}
    }

    onChangeDeliveryDate(dDate, index, call:string)
    {
      if(call == 'CFT')
      {
        if((dDate.target.value).valueOf() < this.currentDate.valueOf())
        {
          alert("Delivery Date Must be Greater than Enquiry date, Select another date...");
          this.pur_Enquiry_Service_Details.at(index).patchValue({delivery_date: null})
        }
      }
      if(call == 'CFC' && dDate != "" && dDate != null)
      {
        if(dDate.valueOf() < this.currentDate.valueOf())
        {
          alert("Delivery Date Must be Greater than Enquiry date at row "+ index +", Select another date...");
          this.pur_Enquiry_Service_Details.at(index-1).patchValue({delivery_date: null})
        }
      }
    }

    onChangeRequiredDate(rDate, index, call:string)
    {
      if(call == 'CFT')
      {
        if((rDate.target.value).valueOf() < this.currentDate.valueOf())
        {
          alert("Required Date Must be Greater than Enquiry date, Select another date...");
          this.pur_Enquiry_Service_Details.at(index).patchValue({required_date: null})
        }
      }
      if(call == 'CFC' && rDate != "" && rDate != null)
      {
        if(rDate.valueOf() < this.currentDate.valueOf())
        {
          alert("Required Date Must be Greater than Enquiry date at row "+ index +", Select another date...");
          this.pur_Enquiry_Service_Details.at(index-1).patchValue({required_date: null})
        }
      }
    }

    onchangePackingReqList(packing_req, index)
    {
      if(packing_req.target.value == "Yes")
      this.isPackingListReq[index] = "true";
      else
      {
        this.isPackingListReq[index] = "false";
        this.pur_Enquiry_Service_Details.at(index).patchValue({packing_list: null});
      }
    }

    selectPackingReq(event:string)
    {
      this.packingReq = event;
      // if(event == 'No')
      // {
      //   this.isPackingReq = false;
      //   this.priceBasedOnList = [{display: "-Select-", value: "0"}, {display: "Item", value: "Item"}];
      //   for(let i=0; i<this.pur_Enquiry_Service_Details.length; i++)
      //   {
      //     this.pur_Enquiry_Service_Details.at(i).patchValue({packing_item: "0", packing_uom: "",
      //     packing_qty: ""});

      //     if(this.priceBasedOn[i] == 'Packing')
      //     this.pur_Enquiry_Service_Details.at(i).patchValue({price_based_on: "0", amount: "",
      //     tax_amount: 0, total_amount: 0, net_amount: 0});
      //   }
      // }
      // else if(event == 'Yes')
      // {  
      //   this.isPackingReq = true;
      //   this.priceBasedOnList = [{display: "-Select-", value: "0"},{display: "Packing", value: "Packing"}, {display: "Item", value: "Item"}]
      //   for(let i=0; i<this.pur_Enquiry_Service_Details.length; i++)
      //   {
      //     this.pur_Enquiry_Service_Details.at(i).patchValue({packing_item: this.packingItem[i], packing_uom: this.packingUom[i],
      //       packing_qty: this.packingQuantity[i], price_based_on: this.priceBasedOn[i],
      //       amount: this.amount[i], tax_amount: this.taxAmount[i], net_amount: this.netAmount[i], total_amount: this.totalAmount[i]});
      //   } 
      // }
    }

    bpId:any;
    onchangeContactName(index, event)
    {
      if(event.target.value)
      {
        this.bpId = this.pur_Enquiry_BPartner_Details.at(index).get('bp_code').value as FormControl;
        this.DropDownListService.getContNoBySuppID(this.bpId, event.target.value).subscribe(data=>{
        this.pur_Enquiry_BPartner_Details.at(index).patchValue({cp_mobile: data.mobile});   });
      }
      else
      {this.pur_Enquiry_BPartner_Details.at(index).patchValue({cp_mobile: ""}); }
   
    }
 
    _item_qty:any;
    _packing_qty:any;
    _mrp:any;
    amt:any;
    _priceBasedOn:any;
    _taxrate:any;
    _taxAmt:any;
    _totalAmt:any;
    getPackingQty(packingQty, index)
    {
      this._packing_qty = packingQty.target.value;
      this._item_qty = this.capacity[index] *  this._packing_qty;
      this.packingQuantity[index] =  this._packing_qty;
      this.pur_Enquiry_Service_Details.at(index).patchValue({item_qty: this._item_qty});
      
      if(this.empty_bag_wt_priceBasedOn[index] == 'UOM')
      { this.pur_Enquiry_Service_Details.at(index).patchValue({mat_weight: (Math.round((this._item_qty - (this.empty_bag_wt[index] * this._packing_qty))*1000)/1000).toFixed(3)});}
      else{this.pur_Enquiry_Service_Details.at(index).patchValue({mat_weight: ((Math.round((this._item_qty - (this._item_qty * this.empty_bag_wt[index])/100) * 1000))/1000).toFixed(3) });}

      this._mrp = this.pur_Enquiry_Service_Details.at(index).get("mrp").value as FormControl;
      this._priceBasedOn = this.pur_Enquiry_Service_Details.at(index).get('price_based_on').value as FormControl;
      this._taxrate = this.pur_Enquiry_Service_Details.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._priceBasedOn, this._taxrate, index)   
    }

    getItemQty(itemQty, index)
    {
      this._packing_qty = this.pur_Enquiry_Service_Details.at(index).get("packing_qty").value as FormControl;
      this._item_qty = itemQty.target.value;

      if(this.empty_bag_wt_priceBasedOn[index] == 'UOM')
      { this.pur_Enquiry_Service_Details.at(index).patchValue({mat_weight: (Math.round((this._item_qty - (this.empty_bag_wt[index] * this._packing_qty))*1000)/1000).toFixed(3)});}
      else{this.pur_Enquiry_Service_Details.at(index).patchValue({mat_weight: ((Math.round((this._item_qty - (this._item_qty * this.empty_bag_wt[index])/100) * 1000))/1000).toFixed(3) });}

      this._mrp = this.pur_Enquiry_Service_Details.at(index).get("mrp").value as FormControl;
      this._priceBasedOn = this.pur_Enquiry_Service_Details.at(index).get('price_based_on').value as FormControl;
      this._taxrate = this.pur_Enquiry_Service_Details.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._priceBasedOn, this._taxrate, index)   
    }

    getMrp(price, index)
    {
      this._packing_qty = this.pur_Enquiry_Service_Details.at(index).get("packing_qty").value as FormControl;
      this._item_qty = this.pur_Enquiry_Service_Details.at(index).get("item_qty").value as FormControl;
      this._mrp =  price.target.value;
      this._priceBasedOn = this.pur_Enquiry_Service_Details.at(index).get('price_based_on').value as FormControl;
      this._taxrate = this.pur_Enquiry_Service_Details.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._priceBasedOn, this._taxrate, index)
    }

    onChangePriceBasedOn(price_based_on, index)
    {
      this._packing_qty = this.pur_Enquiry_Service_Details.at(index).get("packing_qty").value as FormControl;
      this._item_qty = this.pur_Enquiry_Service_Details.at(index).get("item_qty").value as FormControl;
      this._mrp = this.pur_Enquiry_Service_Details.at(index).get("mrp").value as FormControl;
      this._priceBasedOn = price_based_on.target.value;
      this._taxrate = this.pur_Enquiry_Service_Details.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._priceBasedOn, this._taxrate, index)
    }

    calculateItemData(packingQty, ItemQty, price, PriceBasedOn, taxrate, index)
    {
      if(PriceBasedOn == "Packing")
      {this.amt = price * packingQty}

      if(PriceBasedOn == "Item")
      {this.amt = price * ItemQty}

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
      this.pur_Enquiry_Service_Details.at(index).patchValue({amount: (Math.round(this.amt * 100) / 100).toFixed(2), 
        net_amount: (Math.round(netAmt * 100) / 100).toFixed(2), tax_amount: (Math.round(this._taxAmt * 100) / 100).toFixed(2), 
        total_amount: (Math.round(this._totalAmt * 100) / 100).toFixed(2)});
    }

    selectedItemName = [];
    selectedPackingItem = [];
    onchangeItemName(index, itemId)
    {
      if(itemId.length && itemId != "0")
      {
        this.status = false;
        this.selectedPackingItem[index] = [];
        this.pur_Enquiry_Service_Details.at(index).patchValue({item_code: itemId});
        forkJoin(
          this.DropDownListService.getItemNameById(itemId,this.company_name),
          this.DropDownListService.getItemMasterPackMat(itemId),
          this.DropDownListService.getItemMasterInvData1(itemId,this.company_name),
          this.DropDownListService.retriveItemMasterStatInfo(itemId,this.company_name),
          this.DropDownListService.getItemQCDetails(itemId,this.company_name)
        ).subscribe(([data, data1, data2, data3, data4])=>
        {
          this.DropDownListService.getUomName(data.mstock_unit).subscribe(data=>
          { this.pur_Enquiry_Service_Details.at(index).patchValue({item_uom: data.description}); });

          this.packingItemList[index] = data1;
          this.pur_Enquiry_Service_Details.at(index).patchValue({mrp: data2["mrp"]});
          this.pur_Enquiry_Service_Details.at(index).patchValue({tax_code: data3[0].tax_code, tax_rate: data3[0].tax_rate});
          this.pur_Enquiry_Service_Details.at(index).patchValue({qc_norms: data4[0].qc_code});
          this.status = true;
        }); 
      }  
    }

    packingQty:any;
    empty_bag_wt:any = [];
    onchangePackingItem(index, packingId)
    {
      if(packingId.length && packingId != "0")
      {
        this.status = false;
        this.pur_Enquiry_Service_Details.at(index).patchValue({packing_item: packingId})
        this.itemId =  this.pur_Enquiry_Service_Details.at(index).get("item_code").value as FormControl;
        this._mrp = this.pur_Enquiry_Service_Details.at(index).get("mrp").value as FormControl;
        this._priceBasedOn = this.pur_Enquiry_Service_Details.at(index).get('price_based_on').value as FormControl;
        this._taxrate = this.pur_Enquiry_Service_Details.at(index).get('tax_rate').value as FormControl;
        this._packing_qty =  this.pur_Enquiry_Service_Details.at(index).get("packing_qty").value as FormControl;
        this.DropDownListService.getItemPackUom(this.itemId, packingId,this.company_name).subscribe(data=>
        {  
          this.capacity[index] = data.capacity;
          this.packingUom[index] = data.uom1;
          this.empty_bag_wt[index] =  data.empty_big_wt;
          this.empty_bag_wt_priceBasedOn[index] = data.empbagwt_based_on;
          this.pur_Enquiry_Service_Details.at(index).patchValue({packing_uom: data.uom1}); 
          this._item_qty = this.capacity[index] *  this._packing_qty;
          this.pur_Enquiry_Service_Details.at(index).patchValue({item_qty: this._item_qty,
            mat_weight: this.capacity[index] *  this._packing_qty - this.empty_bag_wt[index]});
          this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._priceBasedOn, this._taxrate, index) 
          this.status = true;
        });   
      }
    }

    showList(s:string)
    {
      if(this.purchaseenquirysave == true  && this.purchaseenquiryupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
        }
      }
      if(this.purchaseenquirysave == true  && this.purchaseenquiryupdate == false)
      {
        if(s=="add")
        {
          this.isHidden=true;
        }
      }
      
      if(s=="list")
      {
        this.isHidden=false;
        this.action = 'update';
        this.userForm.reset();

        this.item_sl_no = 0;
        this.packingItem = [];
        this.selectedItemName = [];
        this.selectedPackingItem = [];
        while(this.pur_Enquiry_Service_Details.length)
        this.pur_Enquiry_Service_Details.removeAt(0);
        this.addItem();

        this.bp_sl_no = 0;
        while(this.pur_Enquiry_BPartner_Details.length)
        this.pur_Enquiry_BPartner_Details.removeAt(0);
        this.addBPartner();

        while(this.pur_Enquiry_docs.length)
        this.pur_Enquiry_docs.removeAt(0);
        this.addDocument();
      }
    }

    addItem()
    {
      this.isPackingListReq[this.item_sl_no] = "false";
      this.item_sl_no = this.item_sl_no +1;
      this.pur_Enquiry_Service_Details.push(this.fb.group(
      {
        sl_no: this.item_sl_no, 
        item_code:'',
        packing_item:'',
        packing_uom:'',
        packing_qty:'',
        item_uom:'',
        item_qty:'',
        mat_weight: '',
        mrp:'',
        price_based_on:'',
        amount:'',
        net_amount:'',	
        tax_code:'',	
        tax_rate:'',
        tax_amount:'',
        total_amount:'',
        qc_norms:'',
        priority:'',
        delivery_date:'',
        required_date:'',
        purpose:'',
        to_be_used:'',
        remarks:'',
        packing_list_req:'',
        packing_list:'',
      }));

      this.selectPackingReq(this.packingReq);
      this.capacity[this.item_sl_no - 1] = 1;
      this.empty_bag_wt[this.item_sl_no - 1] = 0;
      this.pur_Enquiry_Service_Details.at(this.item_sl_no - 1).patchValue({packing_qty: 0, item_qty: 0, price_based_on: "0",
        mat_weight: 0, mrp: 0, tax_rate: 0});
    }

    deleteItem(index) 
    {
      if(this.item_sl_no > 1)
      { 
        this.packingItem.splice(index, 1);
        this.capacity.splice(index, 1);

        this.pur_Enquiry_Service_Details.removeAt(index);
        this.item_sl_no = this.item_sl_no - 1;
        this.isPackingListReq[index - 1] = "false";
      }
      else
      {
        this.item_sl_no = 1;
        alert("can't delete all rows");
        this.pur_Enquiry_Service_Details.reset();
        this.pur_Enquiry_Service_Details.at(0).patchValue({sl_no:  this.item_sl_no});
        this.isPackingListReq[index - 1] = "false";
      } 
      
      for(let i=1; i<=this.item_sl_no; i++)
        this.pur_Enquiry_Service_Details.at(i-1).patchValue({sl_no: i});
      
    }

    addBPartner() 
    {
      this.bp_sl_no = this.bp_sl_no +1;
      this.pur_Enquiry_BPartner_Details.push(this.fb.group(
      {
        sl_no: this.bp_sl_no,
        bp_code:'',
        cp_name:'',
        cp_mobile:'',
        send_via:''
      }));
    }

    deleteBPartner(index) 
    {
      if(this.bp_sl_no > 1)
      { 
        this.pur_Enquiry_BPartner_Details.removeAt(index);
        this.bp_sl_no = this.bp_sl_no - 1;
      }
      else
      {
        this.bp_sl_no = 1;
        alert("can't delete all rows");
        this.pur_Enquiry_BPartner_Details.reset();
        this.pur_Enquiry_BPartner_Details.at(0).patchValue({sl_no:  this.bp_sl_no});
      } 
      
      for(let i=1; i<=this.bp_sl_no; i++)
        this.pur_Enquiry_BPartner_Details.at(i-1).patchValue({sl_no: i});
      
    }

    addDocument()
    {
      this.pur_Enquiry_docs.push(this.fb.group({
      doc_name : '' }));
    }

    deleteDocument(index)
    {
      if(index)
      { this.pur_Enquiry_docs.removeAt(index); }
      else
      {
        alert("can't delete all rows");
        this.pur_Enquiry_docs.reset();
      }
    }

    onchangeBPName(index, bp_id:string)
    {
      if(bp_id)
     { 
        this.status = false;
        this.DropDownListService.getContNameBySppId(bp_id).subscribe(data=>
        {
          this.status = true;
          this.contNameList[index]  = data;
        });
      }
    }

    itemCode:any;
    showPopUp2(index)
    {
      this.itemCode = this.pur_Enquiry_Service_Details.at(index).get('item_code').value as FormControl;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index, item_code: this.itemCode};

      const dialogRef = this.dialog.open(QcNormPopUpModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => 
      { this.pur_Enquiry_Service_Details.at(index).patchValue({qc_norms: data["qc_code"]}); }); 
    }

    contNameList:any=[];
    onClickShow()
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: 0
      };
      const dialogRef = this.dialog.open(SupplierPopUpModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => 
      {
        let  j=0;
        this.bp_sl_no = 0;
        this.contNameList = [];
       
        while(this.pur_Enquiry_BPartner_Details.length)
        { this.pur_Enquiry_BPartner_Details.removeAt(0);}

        for(let data1 of data)
        {
          if(data1.checkbox == true)
          {
            this.addBPartner();
            this.onchangeBPName(j, data1["bp_Id"]);
            this.pur_Enquiry_BPartner_Details.at(j).patchValue({bp_code: data1["bp_Id"]});
            j = j + 1;      
          }
        }
      });
    }

    type = "date";
    openDialog()
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      if(this.seritemtype != "0")
      {
        dialogConfig.data = { index: 0, ref_type: "pur001", item_type: this.seritemtype};
        const dialogRef = this.dialog.open(IndentOrderPopUpModalComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => 
        {  
          console.log("ewewr: "+ JSON.stringify (data));
          if(data != '' && data["indent_id"] != "0" && data["indent_id"] != undefined)
          {
            this.userForm.patchValue({referance_id: data["indent_id"]});
            this.type = "text";
            this.selectedItemName = [];
            this.selectedPackingItem = [];
            this.packingItemList = [];
            let  i=0;
            this.addItem();
            this.item_sl_no = 0;
            while(this.pur_Enquiry_Service_Details.length)
            this.pur_Enquiry_Service_Details.removeAt(0);

            for(let data1 of data.pur_Indent_Details)
            {
              if(data1.checkbox == true)
              {
                this.status = false;
                forkJoin(
                  this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                  this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing_item"],this.company_name)
                ).subscribe(([packingList, capacityEmptyWt])=>
                  {
                    this.status = true;
                    this.capacity[i] = capacityEmptyWt.capacity;
                    this.empty_bag_wt[i] =  capacityEmptyWt.empty_big_wt;
                    this.selectedItemName[i] = data1["item_code"];
                    this.selectedPackingItem[i] = data1["packing_item"];
                    this.packingItemList[i] = packingList; 
                    this.addItem();
                    this.pur_Enquiry_Service_Details.at(i).patchValue({item_code: data1["item_code"],
                      packing_item: data1["packing_item"], packing_uom: data1["stock_pack_uom"], packing_qty: data1["indent_pack_qty"],
                      item_uom: data1["stock_item_uom"], item_qty: data1["indent_item_qty"],
                      mat_weight: data1["mat_weight"], mrp: data1["indicative_price"], price_based_on: data1["price_based_on"],
                      qc_norms: data1["qc_norms"], priority: data1["priority"], 
                      delivery_date: data1["delivery_date"], purpose: data1["purpose"], to_be_used: data1["to_be_used"],
                      remarks:data1["remarks"], amount:data1["amount"], required_date: data1["req_date"],  
                      net_amount: data1["net_amount"], tax_code: data1["tax_code"],
                      tax_rate: data1["tax_rate"], tax_amount: data1["tax_amount"], total_amount: data1["total_amount"]});
                    i = i + 1;
                  });
              }
            }
          
            this.status = false;
            this.DropDownListService.getPurIndentDtls(data["indent_id"]).subscribe(data=>
            {
              this.status = true;
              this.userForm.patchValue({remarks: data.remarks, fullfillment_by:data.fullfillment_by, dept: data.department,
                packing_req: data.packing_req, service_type:data.ser_item_type, valid_until: data.valid_until});
            })
          }  
        }); 
      }else{alert("Select Item Sub Type First...")}
    }

    popup_data:any=[];
    packingListPopUp(index)
    {
      this.itemCode = this.pur_Enquiry_Service_Details.at(index).get('item_code').value as FormControl;  
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index, item_id: this.itemCode, popup_data: this.popup_data};
      const dialogRef = this.dialog.open(PackingListPopUpComponent, dialogConfig);
      dialogRef.afterClosed().subscribe( data => 
      {
        this.pur_Enquiry_Service_Details.at(index).patchValue({packing_list: "NA"});
        this.popup_data = data;
        let list = "";
        for(let data1 of data)
        {
          if(data1["checkbox"] == true)
          list = list + data1.item_id + ",";
        }
        this.pur_Enquiry_Service_Details.at(index).patchValue({packing_list: list.substr(0, list.length-1)});
      }); 
    }

    EnquiryId:any
    send()
    {
      this.EnquiryId= this.userForm.get("id").value as FormControl
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
        if(this.EnquiryId != 0)
          {
            this.status = false;
            this.Service.updatePurEnquiry(this.userForm.getRawValue(),this.EnquiryId).subscribe( data => 
            {
              console.log(this.userForm.value);
              alert("Purchase Enquiry Updated successfully.");
              this.userForm.reset();
              this.ngOnInit();
              //Refresh Dynemic Table
              this.packingItemList = [];
              this.contNameList = [];
              this.item_sl_no = 0;
              while(this.pur_Enquiry_Service_Details.length)
              this.pur_Enquiry_Service_Details.removeAt(0);
              this.addItem();

              this.bp_sl_no = 0;
              while(this.pur_Enquiry_BPartner_Details.length)
              this.pur_Enquiry_BPartner_Details.removeAt(0);
              this.addBPartner();

              while(this.pur_Enquiry_docs.length)
              this.pur_Enquiry_docs.removeAt(0);
              this.addDocument();
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
              this.ngOnInit()});    
           }

        else
        {
          this.status = false;
            this.Service.createPurchaseEnquiry(this.userForm.getRawValue()).subscribe( data => 
            {
              console.log(this.userForm.value);
              alert("New Purchase Enquiry created successfully.");
              this.userForm.reset();
              this.ngOnInit();
              //Refresh Dynemic Table
              this.packingItemList = [];
              this.contNameList = [];
              this.item_sl_no = 0;
              while(this.pur_Enquiry_Service_Details.length)
              this.pur_Enquiry_Service_Details.removeAt(0);
              this.addItem();

              this.bp_sl_no = 0;
              while(this.pur_Enquiry_BPartner_Details.length)
              this.pur_Enquiry_BPartner_Details.removeAt(0);
              this.addBPartner();

              while(this.pur_Enquiry_docs.length)
              this.pur_Enquiry_docs.removeAt(0);
              this.addDocument();

              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
              this.ngOnInit()});    

        }
      }
    }

    onUpdate(id:any, enquiry_id:string, action)
    {
      this.purchaseenquirysave=true;
      this.userForm.patchValue({id: id});
      this.isHidden = true;
      this.status = false;
      this.packingItemList = [];
      this.selectedItemName = [];
      this.selectedPackingItem = [];
      this.contNameList = [];
      if(action == 'view')
      {this.action = 'view';}
      else
      {this.action = 'update'; }
      forkJoin(
        this.UpdateService.purEnquiryRetrive(id),
        this.UpdateService.getPurEnquiryItemDtlsList(enquiry_id),
        this.UpdateService.getPurEnquiryBPDetails(enquiry_id),
        this.UpdateService.getPurEnquiryDocList(enquiry_id)
      ).subscribe(([purEnqdata, itemData, bpData, docData])=>
        {
          this.enquiryType = purEnqdata["enquiry_type"];
          this.currentDate = purEnqdata["enquiry_date"];
          this.onChangeServicesItemType(purEnqdata["service_type"])
          this.userForm.patchValue(purEnqdata);
          console.log("Enq: "+JSON.stringify(purEnqdata));

          console.log("itemData: "+  JSON.stringify(itemData));
          let k = 0;
          this.addItem();
          this.item_sl_no = 0;
          while (this.pur_Enquiry_Service_Details.length) 
          { this.pur_Enquiry_Service_Details.removeAt(0);}
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
                this.capacity[k] = capacityEmptyWt.capacity;
                this.empty_bag_wt[k] =  capacityEmptyWt.empty_big_wt;
                this.selectedItemName[k] = data1["item_code"];
                this.selectedPackingItem[k] = data1["packing_item"];
                this.packingItemList[k] = packingList; 
                this.pur_Enquiry_Service_Details.at(k).patchValue(data1);
                k = k + 1;
              });
          }

          let i = 0;
          console.log("bpData: "+JSON.stringify(bpData));
          this.addBPartner();
          this.bp_sl_no = 0;
          while (this.pur_Enquiry_BPartner_Details.length) 
          this.pur_Enquiry_BPartner_Details.removeAt(0);
          for(let data1 of bpData)
          { 
            this.status = false;
            this.DropDownListService.getContNameBySppId(data1["bp_code"]).subscribe(cName=>
            {
              this.contNameList[i]  = cName;
              this.addBPartner();
              this.pur_Enquiry_BPartner_Details.at(i).patchValue(data1);
              i= i + 1;
              this.status = true;
            });  
          }

          this.addDocument();
          while (this.pur_Enquiry_docs.length) 
          this.pur_Enquiry_docs.removeAt(0);
          for(let data1 of docData)
          this.addDocument();
          this.pur_Enquiry_docs.patchValue(docData);

          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});      
     }
  }


