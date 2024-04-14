import { Component, OnInit, Injectable, ViewChild  } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { Quotation} from '../../../../../../models/transaction/PurchaseTransaction/PurchaseQuotation';
import { PurchaseModuleServiceService } from '../../../../../../service/purchase-module-service.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import {TaxPopUpModalComponent} from '../tax-pop-up-modal/tax-pop-up-modal.component';
import {QcNormPopUpModalComponent} from '../qc-norm-pop-up-modal/qc-norm-pop-up-modal.component';
import { IndentOrderPopUpModalComponent } from '../../components/indent-order-pop-up-modal/indent-order-pop-up-modal.component';
import { PurchaseEnqPopUpModalComponent } from '../../components/purchase-enq-pop-up-modal/purchase-enq-pop-up-modal.component';
import { formatDate } from '@angular/common';
import { Master } from '../../../../../../service/master.service';
import { PackingListPopUpComponent } from '../../components/packing-list-pop-up/packing-list-pop-up.component';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';
import { PurchaseQNPopUpModalComponent } from '../../components/purchase-qnpop-up-modal/purchase-qnpop-up-modal.component';

  @Component({
  selector: 'app-purchase-quotation',
  templateUrl: './purchase-quotation.component.html',
  styleUrls: ['./purchase-quotation.component.scss']
  })

  export class PurchaseQuotationComponent implements OnInit 
  {
    @ViewChild(SelectAutocompleteComponent) multiSelect: SelectAutocompleteComponent;
    submitted = false;
    nj
    public userForm:FormGroup;
    model: Quotation = new Quotation();
    listQuotation: Quotation[];
    itemtype:any;
    itemtypes:any = [];
    deptNames:any = [];
    customUOMDyns:{};
    supplierNames:any = [];
    modeofquotations:{}
    employeeNames:any = [];
    delvTerms:{};
    transBrones:{};
    modeofTrans:{};
    transporterNames:any = [];
    brokerNameList:any = [];
    ledgerNames:any = [];
    reasonList:any =[];
    purposes:{};
    priorities:{};
    purchaseQuotationId:any
    isHidden:any;
    payTerms:any = [];
    approve:any = [];
    businesslists:any = [];
    item_codes:any = [];
    delvAddrs:{};
    contAddrs:{};
    sp_name: any;
    item_sl_no = 1;
    status:any;
    currentDate: any;
    isPackingListReq:any = [];
    empty_bag_wt_priceBasedOn:any = [];
    broker_sl_no = 1;
    seq_no:string;
    QUType:any;
    packingItem:any = [];
    capacity:any = [];
    company_name:any;
    supplier_id:any;
    seritemtype:any;
    action:any;
    purchasequotationsave:boolean=true;
    purchasequotationview:boolean=true;
    purchasequotationupdate:boolean=true;
 
    constructor(public fb:FormBuilder,private Service: PurchaseModuleServiceService,
      private UpdateService: Master, private dialog: MatDialog, private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group(
      {
        quotation_no:[''],	
        quotation_id:[''],	
        id:[''],
        quotation_date:[''],	
        required_date:[''],	
        valid_until:[''],	
        quotation_type:[''],	
        mode_of_quotation:[''],	
        quotation_status:[''],	
        quotation_service:[''],	
        quotation_refeance_type:[''],	
        department:[''],	
        supplier_name:[''],	
        delivery_terms:[''],	
        delivery_perior:[''],	
        transport_borne_by:[''],	
        mode_of_transport:[''],	
        transport_name:[''],	
        remarks:[''],	
        fullfillment_by:[''],	
        fullfillment_type:[''],	
        payment_term:[''],		
        loc_of_delivery:[''],	
        packing_req:[''],
        doc_no:[''],
        doc_date: [''],
        confirmed_by: [''],
        approved: [''],
        reason: [''],
        company_id: [''],
        fin_year: [''],
        referance_id: [''],
        username: [''],

        pur_Quotation_Service: this.fb.array([this.fb.group({
          slno:this.item_sl_no,	
          item_code:'',	
          packing_item:'',	
          packing_uom:'',	
          packing_qty:'',	
          stock_uom:'',	
          stock_qty:'',	
          price:'',	
          mat_weight:'',
          price_based_on:'',	
          amount:'',	
          taxable_amount: '',
          discount:'',	
          discount_basedon:'',	
          discount_amount:'',	
          net_amount:'',	
          tax_code:'',	
          tax_amount:'',	
          total_amount:'',	
          qc_norms:'',	
          priority:'',	
          delivery_date:'',	
          purpose:'',	
          to_be_used:'',	
          remarks:'',	
          tax_rate:'',
          packing_list_req:'',
          packing_list:'',
        })]),

        pur_Quotation_Broker: this.fb.array([this.fb.group({    
          sl_no : this.broker_sl_no,  
          ven_code_name : '',  
          basis : '',  
          rate : '',     
          brokerage_acc:'',
          tds_acc:'',
          tds_rate:'' })]),

        pur_Quotation_docs: this.fb.array([this.fb.group({
         doc_name:''})]),

        pur_quotation_Business_Partner_details: this.fb.group({
          sp_name:'',
          sp_phone:'',	
          sp_fax:'',
          sp_email:'',
          sp_address:'',
          cp_designation:'',	
          cp_name:'',
          cp_phone:'',
          cp_fax:'',
          cp_email:'',	
          cp_address:''})
      });
    }
    get id() { return this.userForm.get("id") as FormControl }
    get quotation_no(){ return this.userForm.get("quotation_no") as FormControl }
    get quotation_id(){ return this.userForm.get("quotation_id") as FormControl }
    get referance_id(){ return this.userForm.get("referance_id") as FormControl }
    get doc_no() { return this.userForm.get("doc_no") as FormControl }
    get quotation_date(){ return this.userForm.get("quotation_date") as FormControl }
    get required_date(){ return this.userForm.get("required_date") as FormControl }
    get valid_until(){ return this.userForm.get("valid_until") as FormControl }
    get quotation_type(){ return this.userForm.get("quotation_type") as FormControl }
    get mode_of_quotation(){ return this.userForm.get("mode_of_quotation") as FormControl }
    get quotation_status(){ return this.userForm.get("quotation_status") as FormControl }
    get quotation_service(){ return this.userForm.get("quotation_service") as FormControl }
    get quotation_refeance_type(){ return this.userForm.get("quotation_refeance_type") as FormControl }
    get department(){ return this.userForm.get("department") as FormControl }
    get supplier_name(){ return this.userForm.get("supplier_name") as FormControl }
    get delivery_terms(){ return this.userForm.get("delivery_terms") as FormControl }
    get doc_date(){return this.userForm.get("doc_date") as FormControl;}
    get delivery_perior(){ return this.userForm.get("delivery_perior") as FormControl }
    get transport_borne_by(){ return this.userForm.get("transport_borne_by") as FormControl }
    get mode_of_transport(){ return this.userForm.get("mode_of_transport") as FormControl }
    get transport_name(){ return this.userForm.get("transport_name") as FormControl }
    get confirmed_by(){ return this.userForm.get("confirmed_by") as FormControl}
    get approved(){ return this.userForm.get("approved") as FormControl}
    get reason(){ return this.userForm.get("reason") as FormControl}
    get remarks(){ return this.userForm.get("remarks") as FormControl }
    get fullfillment_by(){ return this.userForm.get("fullfillment_by") as FormControl }
    get fullfillment_type(){ return this.userForm.get("fullfillment_type") as FormControl }
    get payment_term(){ return this.userForm.get("payment_term") as FormControl }
    get loc_of_delivery(){ return this.userForm.get("loc_of_delivery") as FormControl }
    get pur_Quotation_Service() {return this.userForm.get('pur_Quotation_Service') as FormArray; }
    get pur_Quotation_docs() {return this.userForm.get('pur_Quotation_docs') as FormArray;}
    get pur_Quotation_Broker(){return  this.userForm.get("pur_Quotation_Broker") as FormArray;}
    get pur_quotation_Business_Partner_details() {return this.userForm.get('pur_quotation_Business_Partner_details') as FormControl;}
  
    ngOnInit() 
    {
      //For User Role
     let user_role=localStorage.getItem("user_role")+"tuhinabcd"+"purchase_inventory";
     this.DropDownListService.getRoleItemMaster(user_role).subscribe(data=>{
     let accessdata=JSON.stringify(data);
     
     this.purchasequotationsave=false;
     this.purchasequotationview=false;
     this.purchasequotationupdate=false;

     if(accessdata.includes('item_catagory.save'))
     {
      this.purchasequotationsave = true;
     }
    if(accessdata.includes('item_catagory.update'))
     { 
       this.purchasequotationupdate=true;
     }
     if(accessdata.includes('item_catagory.delete'))
     {
       this.purchasequotationview=true;
     }
   
     }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
     this.ngOnInit()});
     
      this.status = false;
      this.QUType = "";
      this.packingItem = [];
      this.capacity = [];
      this.empty_bag_wt = [];
      this.empty_bag_wt_priceBasedOn = [];
      this.isPackingListReq[0] = "false";
      this.isHidden = false;
      this.seritemtype = "0";
      this.supplier_id = "0";
      this.action = 'update';
      // this.modeofquotations= [{display: "EMAIL", value: "Email"},{display: "FAX", value: "Fax"},,{display: "IN PERSON", value: "In person"},{display: "TELEPHONE", value: "Telephone"},    
      // {display: "WEBSITE", value: "Website"}, {display: "OTHER", value: "Other"}];
      this.approve=["NO","PENDING","YES"];
      //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      this.delvTerms=["MILL DELIVERY","MIDWAY DELIVERY","PARTY SIDE DELIVERY"];
      this.transBrones=["OWN ACCOUNT","PARTY ACCOUNT"]; 
      this.modeofTrans=["BY ROAD","BY RAIL","BY WATER","BY AIR","BY OTHER"];
      this.priorities=["HIGH","IMMEDIATE","LOW"];
      this.userForm.patchValue({id: 0, referance_id: 0});
      this.company_name = localStorage.getItem("company_name");
      forkJoin(
        this.DropDownListService.getPurTermReasons(),
        this.DropDownListService.employeeNamesList(this.company_name),
        this.DropDownListService.ledgerNameList(),
        this.Service.getPurchaseQuotations(),
        this.DropDownListService.itemTypeList(this.company_name),
        this.DropDownListService.deptNamesList(),
        this.DropDownListService.purposesList(),
        this.DropDownListService.supplierNamesList(this.company_name),
        this.DropDownListService.customUOMList(),
        this.DropDownListService.payTermNameList(),
        this.DropDownListService.custometrBusList(this.company_name),
        this.DropDownListService.getItemThruPurchase()
      ).subscribe(([reasonData, employeeData, ledgerData, PurQuData, itemTypeData,
          deptData, purposeData, supplierData, customUOMData, payTermData, custometrBusData, itemData])=>
        {
          this.reasonList = reasonData;
          this.employeeNames = employeeData;
          this.ledgerNames = ledgerData;
          this.listQuotation  = PurQuData;
          this.itemtypes  = itemTypeData;
          this.deptNames  = deptData;
          this.purposes  = purposeData;
          this.supplierNames  = supplierData;
          this.customUOMDyns  = customUOMData;
          this.payTerms  = payTermData;
          this.businesslists  = custometrBusData;
          this.item_codes = itemData;
          this.userForm.patchValue({fullfillment_by: "0", quotation_service: "0"})
          this.pur_Quotation_Service.at(0).patchValue({packing_qty: 0, stock_qty: 0, price_based_on: "0",
            mat_weight: 0, price: 0, tax_rate: 0, discount: 0, discount_basedon: "0"});
          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});    
    }

    getQuotationNo(quDate, quType)
    {
      this.status = false;
      this.DropDownListService.getQuotSequenceId("QU/"+quDate+"/"+quType).subscribe(data=>
      {
        this.seq_no = data.sequenceid;
        this.status = true;
      });   
    }

    onChangeQUType(type:string)
    {
      this.QUType = type;
      this.getQuotationNo(this.currentDate , type)
    }

    deliveryDate:any;
    onChangeQUDate(enqDate)
    {
      this.currentDate = enqDate.target.value;
      for(let i = 0; i<this.pur_Quotation_Service.length; i++)
      {
        this.deliveryDate =  this.pur_Quotation_Service.at(i).get("delivery_date").value as FormControl;
        this.onChangeDeliveryDate(this.deliveryDate, i+1, 'CFC');
      }
      if(this.QUType != "")
      {this.getQuotationNo(this.currentDate, this.QUType)}
    }

    onChangeDeliveryDate(dDate, index, call:string)
    {
      if(call == 'CFT')
      {
        if((dDate.target.value).valueOf() < this.currentDate.valueOf())
        {
          alert("Delivery Date Must be Greater than Quotation date, Select another date...");
          this.pur_Quotation_Service.at(index).patchValue({delivery_date: null})
        }
      }
      if(call == 'CFC' && dDate != "" && dDate != null)
      {
        if(dDate.valueOf() < this.currentDate.valueOf())
        {
          alert("Delivery Date Must be Greater than Quotation date at row "+ index +", Select another date...");
          this.pur_Quotation_Service.at(index-1).patchValue({delivery_date: null})
        }
      }
    }

    onChangeRefType(reference_type:string)
    {
      this.referenceNo = reference_type;
    }

    onchangePackingReqList(packing_req, index)
    {
      if(packing_req.target.value == "Yes")
      this.isPackingListReq[index] = "true";
      else
      { 
        this.isPackingListReq[index] = "false";
        this.pur_Quotation_Service.at(index).patchValue({packing_list: null});
      }
    }
  
    packingReq: any;
    selectPackingReq(event:string)
    {
      this.packingReq = event;
      // if(event == 'No')
      // {
      //   for(let i=0; i<this.pur_Quotation_Service.length; i++)
      //   {
      //     this.pur_Quotation_Service.at(i).get('packing_item').disable();
      //     this.pur_Quotation_Service.at(i).get('packing_uom').disable();
      //     this.pur_Quotation_Service.at(i).get('packing_qty').disable();
      //   }
      // }
    }

    onChangeSupplierName(suppid:string)
    {
      this.pur_quotation_Business_Partner_details.patchValue({cp_designation:null, cp_phone:null,
        cp_fax:null,cp_email:null,cp_address:null, sp_phone:null, sp_fax:null,sp_email:null});   
      this.transporterNames = [];
      this.contAddrs = [];
      this.delvAddrs = [];
       this.supplier_id = suppid;
      
      if(suppid.length != 0 && suppid != "0")
      {
        this.status = false;
        this.DropDownListService.getBrokerListBySupplierCode(suppid).subscribe(data=>{this.brokerNameList = data;});  
        this.DropDownListService.getTransporterThruSupplier(suppid).subscribe(data=>{this.transporterNames = data});
        this.DropDownListService.getDeliveryAddrById(suppid).subscribe(data=>{this.delvAddrs  = data;});
        this.DropDownListService.getSuppAddrById(suppid).subscribe(data=>{this.contAddrs  = data; });
        this.DropDownListService.getAddrById(suppid).subscribe(data=>
        {this.pur_quotation_Business_Partner_details.patchValue({ sp_address: data["address"]}); });
        this.status = true;  
      }
    }

    onChangeBrokerName(index, broker_code:string)
    {
      this.pur_Quotation_Broker.at(index).patchValue({basis: null, rate: null,
        brokerage_acc: null, tds_rate: null, tds_acc: null});
      if(broker_code)
      {
        this.status = false;
        this.DropDownListService.getBrokerDetailsByBrokerCode(broker_code).subscribe(data=>
        {
          this.pur_Quotation_Broker.at(index).patchValue({basis: data[0].basis, based_on: data[0].based_on,
            rate: data[0].rate, brokerage_acc: data[0].brokerage_acc, tds_rate: data[0].tds_rate, tds_acc: data[0].tds_acc});
          this.status = true;
        });
      } 
    }

    onChangeContInfoName(name:string)
    {
      if(name != "0")
      {
        this.status = false;
        this.DropDownListService.getSupplierDelvFromAdd(this.supplier_id, name).subscribe(data=>
        {
          this.pur_quotation_Business_Partner_details.patchValue({
            cp_designation:data["designation"], cp_phone:data["phone"],
            cp_fax:data["fax"],cp_email:data["email"],cp_address:data["address"]}); 
          this.status = true;
        });
      }
    }

    onChangeSuppInfoName(name:String)
    {
      if(name != "0")
      {
        this.status = false;
        this.DropDownListService.getSupplierContDetails(this.supplier_id, name).subscribe(data=>
        {
          this.pur_quotation_Business_Partner_details.patchValue({
            sp_phone:data["phone"], sp_fax:data["fax"],sp_email:data["email"]}); 
          this.status = true;
        });
      }
    }
 
    onChangeServicesItemType(itemType:string)
    {
      this.seritemtype = itemType;
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

    showList(s:string)
    {
      if(this.purchasequotationsave == true  && this.purchasequotationupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        { this.isHidden=true;
          this.modeofquotations= [{display: "EMAIL", value: "Email"},{display: "FAX", value: "Fax"},,{display: "IN PERSON", value: "In person"},{display: "TELEPHONE", value: "Telephone"},    
          {display: "WEBSITE", value: "Website"}, {display: "OTHER", value: "Other"}];
        }
      }
      if(this.purchasequotationsave == true  && this.purchasequotationupdate == false)
      {
        if(s=="add")
        { this.isHidden=true;
          this.modeofquotations= [{display: "EMAIL", value: "Email"},{display: "FAX", value: "Fax"},,{display: "IN PERSON", value: "In person"},{display: "TELEPHONE", value: "Telephone"},    
          {display: "WEBSITE", value: "Website"}, {display: "OTHER", value: "Other"}];
        }
      }
     
      if(s=="list")
      { 
        this.isHidden=false;
        this.action = 'update';
        this.userForm.reset();
        this.pur_quotation_Business_Partner_details.reset();

        this.packingItem = [];
        this.selectedPackingItem = [];
        this.selectedItemName = [];
        this.item_sl_no = 0;
        while(this.pur_Quotation_Service.length)
        this.pur_Quotation_Service.removeAt(0);
        this.addItem();

        this.broker_sl_no = 0;
        while(this.pur_Quotation_Broker.length)
        this.pur_Quotation_Broker.removeAt(0);
        this.addBroker();

        while(this.pur_Quotation_docs.length)
        this.pur_Quotation_docs.removeAt(0);
        this.addDocument();

        
      }
    }

    addItem() 
    {
      this.isPackingListReq[this.item_sl_no] = "false";
      this.item_sl_no =this.item_sl_no +1;
      this.pur_Quotation_Service.push(this.fb.group({
        slno:this.item_sl_no,	
        item_code:'',	
        packing_item:'',	
        packing_uom:'',	
        packing_qty:'',	
        stock_uom:'',	
        stock_qty:'',	
        mat_weight:'',
        price:'',	
        price_based_on:'',	
        amount:'',	
        taxable_amount: '',
        discount:'',	
        discount_basedon:'',	
        discount_amount:'',	
        net_amount:'',	
        tax_code:'',	
        tax_amount:'',	
        total_amount:'',	
        qc_norms:'',	
        priority:'',	
        delivery_date:'',	
        purpose:'',	
        to_be_used:'',	
        remarks:'',	
        tax_rate:'',
        packing_list_req:'',
        packing_list:'',}));

      this.selectPackingReq(this.packingReq);
      this.pur_Quotation_Service.at(this.item_sl_no - 1).patchValue({packing_qty: 0, stock_qty: 0, price_based_on: "0",
        mat_weight: 0, price: 0, tax_rate: 0, discount: 0, discount_basedon: "0"});
    }

    delete(index) 
    {
      if(this.item_sl_no > 1)
      { 
        this.packingItem.splice(index, 1);
        this.capacity.splice(index, 1);

        this.pur_Quotation_Service.removeAt(index);
        this.item_sl_no = this.item_sl_no - 1;
        this.isPackingListReq[index - 1] = "false";
      }
      else
      {
        this.item_sl_no = 1;
        alert("can't delete all rows");
        this.pur_Quotation_Service.reset();
        this.pur_Quotation_Service.at(0).patchValue({slno:  this.item_sl_no});
        this.isPackingListReq[0] = "false";
      } 
      
      for(let i=1; i<=this.item_sl_no; i++)
        this.pur_Quotation_Service.at(i-1).patchValue({slno: i});
      
    }

    addBroker() 
    {
      this.broker_sl_no=this.broker_sl_no+1;
      this.pur_Quotation_Broker.push(this.fb.group({ 
       sl_no : this.broker_sl_no,  
       ven_code_name : '',  
       basis : '',  
       rate : '',     
       brokerage_acc:'',
       tds_acc:'',
       tds_rate:''}));
    }

    deleteBroker(index) 
    {
      if(this.broker_sl_no > 1)
      { 
        this.pur_Quotation_Broker.removeAt(index);
        this.broker_sl_no = this.broker_sl_no - 1;
      }
      else
      {
        this.broker_sl_no = 1;
        alert("can't delete all rows");
        this.pur_Quotation_Broker.reset();
        this.pur_Quotation_Broker.at(0).patchValue({sl_no:  this.broker_sl_no});
      } 
      
      for(let i=1; i<=this.broker_sl_no; i++)
        this.pur_Quotation_Broker.at(i-1).patchValue({sl_no: i});
      
    }

    addDocument() 
    {
      this.pur_Quotation_docs.push(this.fb.group({
        doc_name : '' }));
    }

    deleteDocument(index) 
    {
      if(index)
      {  this.pur_Quotation_docs.removeAt(index); }
      else
      {
        alert("can't delete all rows");
        this.pur_Quotation_docs.reset();
      }
    }

    selectedItemName = [];
    selectedPackingItem = [];
    onchangeItemName(index, itemId)
    {
      if(itemId.length && itemId != "0")
      {
        this.status = false;
        this.selectedPackingItem[index] = [];
        this.pur_Quotation_Service.at(index).patchValue({item_code: itemId});
        forkJoin(
          this.DropDownListService.getItemNameById(itemId,this.company_name),
          this.DropDownListService.getItemMasterPackMat(itemId),
          this.DropDownListService.getItemMasterInvData1(itemId,this.company_name),
          this.DropDownListService.retriveItemMasterStatInfo(itemId,this.company_name),
          this.DropDownListService.getItemQCDetails(itemId,this.company_name)
        ).subscribe(([data, data1, data2, data3, data4])=>
        {
          this.DropDownListService.getUomName(data.mstock_unit).subscribe(data=>
          { this.pur_Quotation_Service.at(index).patchValue({stock_uom: data.description}); });

          this.packingItem[index] = data1;
          this.pur_Quotation_Service.at(index).patchValue({price: data2["mrp"]});
          this.pur_Quotation_Service.at(index).patchValue({tax_code: data3[0].tax_code, tax_rate: data3[0].tax_rate});
          this.pur_Quotation_Service.at(index).patchValue({qc_norms: data4[0].qc_code});
          this.status = true;
        }); 
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
        this.pur_Quotation_Service.at(index).patchValue({packing_item: packingId})
        this.itemId =  this.pur_Quotation_Service.at(index).get("item_code").value as FormControl;
        this._packing_qty =  this.pur_Quotation_Service.at(index).get("packing_qty").value as FormControl;
        this._mrp = this.pur_Quotation_Service.at(index).get("price").value as FormControl;
        this._mat_weight = this.pur_Quotation_Service.at(index).get("mat_weight").value as FormControl;
        this._priceBasedOn = this.pur_Quotation_Service.at(index).get('price_based_on').value as FormControl;
        this._discount = this.pur_Quotation_Service.at(index).get('discount').value as FormControl;
        this._discountBasadOn = this.pur_Quotation_Service.at(index).get('discount_basedon').value as FormControl;
        this._taxrate = this.pur_Quotation_Service.at(index).get('tax_rate').value as FormControl;
      
        this.DropDownListService.getItemPackUom(this.itemId, packingId,this.company_name).subscribe(data=>
        {  
          console.log("empty bag wt: "+JSON.stringify(data))
          this.capacity[index] = data.capacity;
          this.empty_bag_wt[index] =  data.empty_big_wt;
          this.empty_bag_wt_priceBasedOn[index] = data.empbagwt_based_on;
          this.pur_Quotation_Service.at(index).patchValue({packing_uom: data.uom1}); 
          this._item_qty = this.capacity[index] *  this._packing_qty;

          if(this.empty_bag_wt_priceBasedOn[index] == 'UOM')
          { this.pur_Quotation_Service.at(index).patchValue({mat_weight: this._item_qty - (this.empty_bag_wt[index] * this._packing_qty)});}
          else{this.pur_Quotation_Service.at(index).patchValue({mat_weight: this._item_qty - (this._item_qty * this.empty_bag_wt[index])/100});}

          this.pur_Quotation_Service.at(index).patchValue({stock_qty:  this._item_qty});
          this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight, 
            this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)   
          this.status = true;
        });   
      }
    }

    _item_qty:any;
    _packing_qty:any;
    _mat_weight:any;
    _mrp:any;
    _taxrate:any;
    _taxAmt:any;
    _totalAmt:any;
    _priceBasedOn:any;
    _discountBasadOn:any;
    discountAmt:any;
    getPackingQty(packingQty, index)
    {
      this._packing_qty = packingQty.target.value;
      this._item_qty = this.capacity[index] *  this._packing_qty;
      this.pur_Quotation_Service.at(index).patchValue({stock_qty: this._item_qty});

      if(this.empty_bag_wt_priceBasedOn[index] == 'UOM')
      { this.pur_Quotation_Service.at(index).patchValue({mat_weight: (Math.round((this._item_qty - (this.empty_bag_wt[index] * this._packing_qty))*1000)/1000).toFixed(3)});}
      else{this.pur_Quotation_Service.at(index).patchValue({mat_weight: ((Math.round((this._item_qty - (this._item_qty * this.empty_bag_wt[index])/100) * 1000))/1000).toFixed(3) });}

      this._mrp = this.pur_Quotation_Service.at(index).get("price").value as FormControl;
      this._mat_weight = this.pur_Quotation_Service.at(index).get("mat_weight").value as FormControl;
      this._priceBasedOn = this.pur_Quotation_Service.at(index).get('price_based_on').value as FormControl;
      this._discount = this.pur_Quotation_Service.at(index).get('discount').value as FormControl;
      this._discountBasadOn = this.pur_Quotation_Service.at(index).get('discount_basedon').value as FormControl;
      this._taxrate = this.pur_Quotation_Service.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)   
    }

    getItemQty(itemQty, index)
    {
      this._packing_qty = this.pur_Quotation_Service.at(index).get("packing_qty").value as FormControl;
      this._item_qty = itemQty.target.value;

      if(this.empty_bag_wt_priceBasedOn[index] == 'UOM')
      { this.pur_Quotation_Service.at(index).patchValue({mat_weight: (Math.round((this._item_qty - (this.empty_bag_wt[index] * this._packing_qty))*1000)/1000).toFixed(3)});}
      else{this.pur_Quotation_Service.at(index).patchValue({mat_weight: ((Math.round((this._item_qty - (this._item_qty * this.empty_bag_wt[index])/100) * 1000))/1000).toFixed(3) });}

      this._mrp = this.pur_Quotation_Service.at(index).get("price").value as FormControl;
      this._mat_weight = this.pur_Quotation_Service.at(index).get("mat_weight").value as FormControl;
      this._priceBasedOn = this.pur_Quotation_Service.at(index).get('price_based_on').value as FormControl;
      this._discount = this.pur_Quotation_Service.at(index).get('discount').value as FormControl;
      this._discountBasadOn = this.pur_Quotation_Service.at(index).get('discount_basedon').value as FormControl;
      this._taxrate = this.pur_Quotation_Service.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)   
    }

    getMatWt(matwt, index)
    {
      this._packing_qty = this.pur_Quotation_Service.at(index).get("packing_qty").value as FormControl;
      this._item_qty = this.pur_Quotation_Service.at(index).get("stock_qty").value as FormControl;
      this._mrp = this.pur_Quotation_Service.at(index).get("price").value as FormControl;
      this._mat_weight = matwt.target.value;
      this._priceBasedOn = this.pur_Quotation_Service.at(index).get('price_based_on').value as FormControl;
      this._discount = this.pur_Quotation_Service.at(index).get('discount').value as FormControl;
      this._discountBasadOn = this.pur_Quotation_Service.at(index).get('discount_basedon').value as FormControl;
      this._taxrate = this.pur_Quotation_Service.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
    }

    getPrice(price, index)
    {
      this._packing_qty = this.pur_Quotation_Service.at(index).get("packing_qty").value as FormControl;
      this._item_qty = this.pur_Quotation_Service.at(index).get("stock_qty").value as FormControl;
      this._mrp =  price.target.value;
      this._mat_weight = this.pur_Quotation_Service.at(index).get("mat_weight").value as FormControl;
      this._priceBasedOn = this.pur_Quotation_Service.at(index).get('price_based_on').value as FormControl;
      this._discount = this.pur_Quotation_Service.at(index).get('discount').value as FormControl;
      this._discountBasadOn = this.pur_Quotation_Service.at(index).get('discount_basedon').value as FormControl;
      this._taxrate = this.pur_Quotation_Service.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
    }

    onChangePriceBasedOn(price_based_on, index)
    {
      this._packing_qty = this.pur_Quotation_Service.at(index).get("packing_qty").value as FormControl;
      this._item_qty = this.pur_Quotation_Service.at(index).get("stock_qty").value as FormControl;
      this._mrp = this.pur_Quotation_Service.at(index).get("price").value as FormControl;
      this._mat_weight = this.pur_Quotation_Service.at(index).get("mat_weight").value as FormControl;
      this._priceBasedOn = price_based_on.target.value;
      this._discount = this.pur_Quotation_Service.at(index).get('discount').value as FormControl;
      this._discountBasadOn = this.pur_Quotation_Service.at(index).get('discount_basedon').value as FormControl;
      this._taxrate = this.pur_Quotation_Service.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
    }

    getDiscount(discount, index)
    {
      this._packing_qty = this.pur_Quotation_Service.at(index).get("packing_qty").value as FormControl;
      this._item_qty = this.pur_Quotation_Service.at(index).get("stock_qty").value as FormControl;
      this._mrp = this.pur_Quotation_Service.at(index).get("price").value as FormControl;
      this._mat_weight = this.pur_Quotation_Service.at(index).get("mat_weight").value as FormControl;
      this._priceBasedOn = this.pur_Quotation_Service.at(index).get('price_based_on').value as FormControl;
      this._discount = discount.target.value;
      this._discountBasadOn = this.pur_Quotation_Service.at(index).get('discount_basedon').value as FormControl;
      this._taxrate = this.pur_Quotation_Service.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
    }

    onchangeDiscountBasedOn(dis_based_on, index)
    {
      this._packing_qty = this.pur_Quotation_Service.at(index).get("packing_qty").value as FormControl;
      this._item_qty = this.pur_Quotation_Service.at(index).get("stock_qty").value as FormControl;
      this._mrp = this.pur_Quotation_Service.at(index).get("price").value as FormControl;
      this._mat_weight = this.pur_Quotation_Service.at(index).get("mat_weight").value as FormControl;
      this._priceBasedOn = this.pur_Quotation_Service.at(index).get('price_based_on').value as FormControl;
      this._discount = this.pur_Quotation_Service.at(index).get('discount').value as FormControl;
      this._discountBasadOn = dis_based_on.target.value;
      this._taxrate = this.pur_Quotation_Service.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
    }

    calculateItemData(packingQty, ItemQty, price, matWt, PriceBasedOn, discount, discountBasedOn, taxrate, index)
    {
      if(PriceBasedOn == "Packing")
      {this.amt = price * packingQty}

      if(PriceBasedOn == "With Packing")
      {this.amt = price * ItemQty}

      if(PriceBasedOn == "Without Packing")
      {this.amt = price * matWt}

      if(PriceBasedOn == "0")
      {this.amt = 0}    

      if(discountBasedOn == "Uom")
      {this.discountAmt = discount;}

      if(discountBasedOn == "%")
      {this.discountAmt =  this.amt * (discount / 100);}

      if(discountBasedOn == "0")
      {this.discountAmt = 0}

      let netAmt = this.amt - this.discountAmt;
      if(taxrate == 0)
      {this._taxAmt = 0;} 
      else
      {this._taxAmt = netAmt *(taxrate/100);}
      this._totalAmt = this._taxAmt + netAmt;
      this.pur_Quotation_Service.at(index).patchValue({amount: (Math.round(this.amt * 100) / 100).toFixed(2),
       discount_amount:  (Math.round(this.discountAmt * 100) / 100).toFixed(2), net_amount: (Math.round(netAmt * 100) / 100).toFixed(2),
        taxable_amount: (Math.round(this.amt * 100) / 100).toFixed(2), tax_amount: (Math.round(this._taxAmt * 100) / 100).toFixed(2), 
        total_amount: (Math.round(this._totalAmt * 100) / 100).toFixed(2)});
    }

    amt:any;
    taxAmt:any;
    _discount:any;
    showPopUp1(index)
    {
      this._discount = this.pur_Quotation_Service.at(index).get('discount').value as FormControl;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index};
      const dialogRef = this.dialog.open(TaxPopUpModalComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(data => 
      {
        this.pur_Quotation_Service.at(index).patchValue({tax_code: data["tax_id"], tax_rate: data["tax_rate"]});
      
        this._packing_qty = this.pur_Quotation_Service.at(index).get("packing_qty").value as FormControl;
        this._item_qty = this.pur_Quotation_Service.at(index).get("stock_qty").value as FormControl;
        this._mrp =  this.pur_Quotation_Service.at(index).get("price").value as FormControl;;
        this._mat_weight = this.pur_Quotation_Service.at(index).get("mat_weight").value as FormControl;
        this._priceBasedOn = this.pur_Quotation_Service.at(index).get('price_based_on').value as FormControl;
        this._discount = this.pur_Quotation_Service.at(index).get('discount').value as FormControl;
        this._discountBasadOn = this.pur_Quotation_Service.at(index).get('discount_basedon').value as FormControl;
        this._taxrate = data["tax_rate"];
        this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight, 
          this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
      }); 
    }
 
    itemCode:any;
    showPopUp2(index)
    {
      this.itemCode = this.pur_Quotation_Service.at(index).get('item_code').value as FormControl;    
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index, item_code: this.itemCode};
      const dialogRef = this.dialog.open(QcNormPopUpModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe( data => 
      {
        this.pur_Quotation_Service.at(index).patchValue({qc_norms: data["qc_code"]});
      }); 
    }

    type = "date";
    referenceNo:any;
    onClick()
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = { index: 0, ref_type: this.referenceNo};
      if(this.seritemtype != "0")
      {
        if(this.referenceNo == "pur002")
        {
          let dialogref=this.dialog.open(IndentOrderPopUpModalComponent, {data:{ref_type: "pur002", item_type: this.seritemtype}});
          dialogref.afterClosed().subscribe(data => 
          { 
            if(data != '' && data["indent_id"] != "0")
            {
              this.userForm.patchValue({referance_id: data["indent_id"]});
              this.type = "text";
              let i=0;
              this.packingItem = [];
              this.selectedItemName = [];
              this.selectedPackingItem = [];
          
              this.addItem();
              this.item_sl_no = 0;
              while(this.pur_Quotation_Service.length)
              this.pur_Quotation_Service.removeAt(0);
            
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
                      this.packingItem[i] = packingList; 
                      this.addItem();
                      this.pur_Quotation_Service.at(i).patchValue({item_code: data1["item_code"],
                        packing_item: data1["packing_item"], price: data1["indicative_price"], price_based_on:  data1["price_based_on"],
                        packing_uom: data1["stock_pack_uom"], packing_qty: data1["indent_pack_qty"], stock_uom: data1["stock_item_uom"], 
                        stock_qty: data1["indent_item_qty"], mat_weight: data1["mat_weight"],
                        taxable_amount: data1["amount"], amount:data1["amount"], net_amount: data1["net_amount"], tax_code: data1["tax_code"],
                        tax_rate: data1["tax_rate"], tax_amount: data1["tax_amount"], total_amount: data1["total_amount"],
                        qc_norms: data1["qc_norms"], priority: data1["priority"], delivery_date: data1["delivery_date"],
                        purpose: data1["purpose"], to_be_used: data1["to_be_used"], remarks: data1["remarks"],
                        });
                      if(data1["price_based_on"] == "Item")
                      this.pur_Quotation_Service.at(i).patchValue({price_based_on: "With Packing"});
                      i = i + 1; 
                    });
                }
              }

              this.status = false;
              this.DropDownListService.getPurIndentDtls(data.indent_id).subscribe(data=>
              {
                this.status = true;
                this.userForm.patchValue({remarks: data["remarks"], fullfillment_by:data["fullfillment_by"],
                  packing_req: data["packing_req"], quotation_service: data["ser_item_type"],
                  department: data["department"], valid_until: data["valid_until"]});
              });
            }
          }); 
        }

        if(this.referenceNo == "pur003")
        {
          if(this.supplier_id == "0" || this.supplier_id == '')
          { alert("Select Supplier name First....")}
          else 
          {
            let dialogref=this.dialog.open(PurchaseEnqPopUpModalComponent, {data:{ref_type: "pur003", supplier_id: this.supplier_id, item_type: this.seritemtype}});
            dialogref.afterClosed().subscribe(data => 
            { 
              if(data != '' && data["enquiry_id"] != "0")
              {
                this.userForm.patchValue({referance_id: data["enquiry_id"]});
                let i=0;
                this.packingItem = [];
                this.selectedItemName = [];
                this.selectedPackingItem = [];

                this.addItem();
                this.item_sl_no = 0;
                while(this.pur_Quotation_Service.length)
                this.pur_Quotation_Service.removeAt(0);

                for(let data1 of data.EnquiryServiceDetails)
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
                        this.packingItem[i] = packingList; 
                        this.addItem();
                        this.pur_Quotation_Service.at(i).patchValue({item_code: data1["item_code"], packing_item: data1["packing_item"] ,
                          packing_uom: data1["packing_uom"], packing_qty: data1["packing_qty"], stock_uom: data1["item_uom"], 
                          stock_qty: data1["item_qty"], mat_weight: data1["mat_weight"], price: data1["mrp"],
                          price_based_on: data1['price_based_on'], amount: data1["amount"], taxable_amount:data1["amount"],
                          net_amount: data1["net_amount"], tax_code: data1["tax_code"], tax_rate: data1["tax_rate"], 
                          tax_amount: data1["tax_amount"], total_amount: data1["total_amount"], qc_norms: data1["qc_norms"],priority: data1["priority"],
                          delivery_date: data1["delivery_date"], purpose: data1["purpose"], to_be_used: data1["to_be_used"], remarks: data1["remarks"],
                          packing_list_req: data1["packing_list_req"], packing_list: data1["packing_list"]});
                        if(data1.price_based_on == "Item")
                        this.pur_Quotation_Service.at(i).patchValue({price_based_on: "With Packing"});  
                        i = i + 1;
                      });
                  }
                }

                this.status = false;
                this.DropDownListService.getPurEnquiryDetails(data["enquiry_id"]).subscribe(data=>
                {
                  this.status = true;
                  this.userForm.patchValue({remarks: data["remarks"], mode_of_quotation: data["mode_of_enq"],
                    fullfillment_by: data["fullfillment_by"], quotation_service: data["service_type"],
                    payment_term: data["payment_term"], transport_borne_by: data["trans_born_by"], 
                    loc_of_delivery: data["loc_of_delivery"], department: data["dept"]});
                });
              }
            }); 
          }
        }
      }else{ alert("Select Item Sub Type First....")} 


      if(this.referenceNo == "Previous Quotation")
      {
        let dialogref=this.dialog.open(PurchaseQNPopUpModalComponent, {data:{ref_type: "Previous Quotation"}});
        dialogref.afterClosed().subscribe(data => 
        { 
          if(data != '' && data["quotation_id"] != "0")
          {
             let i=0;
            this.status = false;
            this.packingItem = [];
            this.selectedItemName = [];
            this.selectedPackingItem = [];
            this.userForm.patchValue({referance_id: data["quotation_id"]});

            this.addItem();
            this.item_sl_no = 0;
            while(this.pur_Quotation_Service.length)
            this.pur_Quotation_Service.removeAt(0);

            for(let data1 of data.QuotationDetails)
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
                    this.packingItem[i] = packingList; 
                    this.addItem(); 
                    this.pur_Quotation_Service.at(i).patchValue(data1);
                    i = i + 1;
                  });   
              }
            }

            this.status = false;
            forkJoin(
              this.DropDownListService.getPurQuotDetails(data["quotation_id"]),
              this.DropDownListService.gePurQuotBPDetails(data["quotation_id"]),
              this.DropDownListService.getPurQuotBrokerDtls(data["quotation_id"])
            ).subscribe(([quData, bpData, brokerData])=>
              {
                this.onChangeSupplierName(quData["supplier_name"]);
                this.userForm.patchValue(quData);
                this.status = false;
                this.DropDownListService.getQuotSequenceId("QU/"+quData["quotation_date"]+"/"+quData["quotation_type"]).subscribe(data=>
                {
                  this.seq_no = data.sequenceid;
                  this.userForm.patchValue({quotation_no: this.seq_no, doc_no: quData["quotation_no"], id: 0});
                  this.status = true;
                }); 
                
                this.pur_quotation_Business_Partner_details.patchValue(bpData);

                this.addBroker();
                this.broker_sl_no = 0;
                while(this.pur_Quotation_Broker.length)
                this.pur_Quotation_Broker.removeAt(0);
                for(let data1 of brokerData)
                this.addBroker();
                this.pur_Quotation_Broker.patchValue(brokerData);
    
                this.status = true;
              });
          }
        }); 
      }      
    }

    popup_data:any=[];
    packingListPopUp(index)
    {
      this.itemCode = this.pur_Quotation_Service.at(index).get('item_code').value as FormControl;  
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index, item_id: this.itemCode, popup_data: this.popup_data};
      const dialogRef = this.dialog.open(PackingListPopUpComponent, dialogConfig);
      dialogRef.afterClosed().subscribe( data => 
      {
        this.popup_data = data;
        let list = "";
        for(let data1 of data)
        {
          if(data1["checkbox"] == true)
          list = list + data1.item_id + ",";
        }
        this.pur_Quotation_Service.at(index).patchValue({packing_list: list.substr(0, list.length-1)});
      }); 
    }

    send()
    {
      this.purchaseQuotationId= this.userForm.get("id").value as FormControl
      this.userForm.patchValue({company_id: this.company_name, fin_year:localStorage.getItem("financial_year"),
        username: localStorage.getItem("username")});
      this.submitted = true;
        if(!this.userForm.valid) {
          alert('Please fill all fields!')
          return false;} 
        else 
       {
        if(this.purchaseQuotationId>0)
        {
            this.status = false;
            this.Service.updatePurQuotation(this.userForm.getRawValue(),this.purchaseQuotationId).subscribe( data => 
            {
              console.log(this.userForm.value);
              alert("Purchase Quotation Updated successfully.");
              this.userForm.reset();
              this.ngOnInit();
              //Refresh Dynemic Table
              this.packingItem = [];

              this.item_sl_no = 0;
              while(this.pur_Quotation_Service.length)
              this.pur_Quotation_Service.removeAt(0);
              this.addItem();

              this.broker_sl_no = 0;
              while(this.pur_Quotation_Broker.length)
              this.pur_Quotation_Broker.removeAt(0);
              this.addBroker();

              while(this.pur_Quotation_docs.length)
              this.pur_Quotation_docs.removeAt(0);
              this.addDocument();
                                      
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});    
        }

        else
          {
            this.status = false;
            this.Service.createPurchaseQuotation(this.userForm.getRawValue()).subscribe( data => 
            {
              console.log(this.userForm.value);
              alert("New Purchase Quotation created successfully.");
              this.userForm.reset();
              this.ngOnInit();
              //Refresh Dynemic Table
              this.packingItem = [];

              this.item_sl_no = 0;
              while(this.pur_Quotation_Service.length)
              this.pur_Quotation_Service.removeAt(0);
              this.addItem();

              this.broker_sl_no = 0;
              while(this.pur_Quotation_Broker.length)
              this.pur_Quotation_Broker.removeAt(0);
              this.addBroker();

              while(this.pur_Quotation_docs.length)
              this.pur_Quotation_docs.removeAt(0);
              this.addDocument();                                     
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});    
          }
      }
    } 
 
    onUpdate(id:any, quotation_id:string, action)
    {
      this.purchasequotationsave=true;
      this.userForm.patchValue({id: id});
      this.status = false;
      this.isHidden = true;
      this.packingItem = [];
      this.selectedItemName = [];
      this.selectedPackingItem = [];
      if(action == 'view')
      {this.action = 'view';}
      else
      {this.action = 'update'; }

      forkJoin(
        this.UpdateService.purQuotationRetrive(id),
        this.UpdateService.purQuotServRetriveList(quotation_id),
        this.UpdateService.getPurQuotBrokerDtls(quotation_id),
        this.UpdateService.gePurQuotBPDetails(quotation_id),
        this.UpdateService.getPurQuotDocs(quotation_id),
      ).subscribe(([purQuotation, itemData,  brokerData,
        bpData, docData,])=>
        {
          this.QUType = purQuotation["quotation_type"];
          this.currentDate = purQuotation["quotation_date"];
          this.referenceNo = purQuotation['quotation_refeance_type'];
          this.seritemtype = purQuotation['quotation_service'];
          this.onChangeSupplierName(purQuotation["supplier_name"]);
          this.onChangeServicesItemType(purQuotation["quotation_service"]);
          this.userForm.patchValue({id:purQuotation["id"], quotation_id:purQuotation["quotation_id"], quotation_no: purQuotation["quotation_no"], company_id: purQuotation["company_id"],
          quotation_date: purQuotation["quotation_date"], required_date: purQuotation["required_date"], valid_until: purQuotation["valid_until"],
          quotation_type: purQuotation["quotation_type"], mode_of_quotation: purQuotation["mode_of_quotation"], quotation_status: purQuotation["quotation_status"],
          quotation_service: purQuotation["quotation_service"], quotation_refeance_type: purQuotation["quotation_refeance_type"], department: purQuotation["department"],
            supplier_name: purQuotation["supplier_name"], delivery_terms: purQuotation["delivery_terms"], delivery_perior: purQuotation["delivery_perior"],
            transport_borne_by: purQuotation["transport_borne_by"], mode_of_transport: purQuotation["mode_of_transport"], transport_name: purQuotation["transport_name"],         
            remarks: purQuotation["remarks"], fullfillment_by: purQuotation["fullfillment_by"], fullfillment_type: purQuotation["fullfillment_type"], payment_term: purQuotation["payment_term"],
            loc_of_delivery: purQuotation["loc_of_delivery"], packing_req: purQuotation["packing_req"], doc_no: purQuotation["doc_no"],
            doc_date: purQuotation["doc_date"], confirmed_by: purQuotation["confirmed_by"], approved: purQuotation["approved"], reason: purQuotation["reason"],
            fin_year: purQuotation["fin_year"],
            });
          console.log("order Details: "+  JSON.stringify(purQuotation));

          console.log("itemData: "+  JSON.stringify(itemData));
          let k = 0;
          this.item_sl_no = 0;
          while (this.pur_Quotation_Service.length) 
          { this.pur_Quotation_Service.removeAt(0);}
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
                this.packingItem[k] = packingList; 
                this.pur_Quotation_Service.at(k).patchValue(data1);
                k = k + 1;
              });
          }

          console.log("brokerData: "+  JSON.stringify(brokerData));
          this.addBroker();
          this.broker_sl_no = 0;
          while (this.pur_Quotation_Broker.length) 
          this.pur_Quotation_Broker.removeAt(0);
          for(let data1 of brokerData)
          this.addBroker();
          this.pur_Quotation_Broker.patchValue(brokerData);

          console.log("bpData: "+  JSON.stringify(bpData));
          this.pur_quotation_Business_Partner_details.patchValue(bpData);

          console.log("docData: "+  JSON.stringify(docData));
          this.addDocument();
          while (this.pur_Quotation_docs.length) 
          this.pur_Quotation_docs.removeAt(0);
          for(let data1 of docData)
          this.addDocument();
          this.pur_Quotation_docs.patchValue(docData);
          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});                                
       }

  }