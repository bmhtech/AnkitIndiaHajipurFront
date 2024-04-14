import { Component, OnInit } from '@angular/core';
import { PurReturnApprovalNote } from '../../../../../../Models/transaction/PurchaseTransaction/pur-return-approval-note';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { formatDate} from '@angular/common';
import { Master } from '../../../../../../service/master.service';
import { forkJoin } from 'rxjs';
import { PurchaseOrderPopUpComponent } from '../purchase-order-pop-up/purchase-order-pop-up.component';
import { PurchaseBillPopUpComponent } from '../purchase-bill-pop-up/purchase-bill-pop-up.component';
import { GrnPopUpComponent } from '../../components/grn-pop-up/grn-pop-up.component';
import { QcNormPopUpModalComponent } from '../qc-norm-pop-up-modal/qc-norm-pop-up-modal.component';
import { PurorderReturnapprovalPopupComponent } from '../purorder-returnapproval-popup/purorder-returnapproval-popup.component';

  @Component({
    selector: 'app-pur-return-approval-note',
    templateUrl: './pur-return-approval-note.component.html',
    styleUrls: ['./pur-return-approval-note.component.scss']})

  export class PurReturnApprovalNoteComponent implements OnInit
  {
    isHidden:any;
    submitted = false;
    public userForm:FormGroup;
    model: PurReturnApprovalNote = new PurReturnApprovalNote();
    listPurReturnApprovalNote: PurReturnApprovalNote[];
    status:any;
    item_sl_no = 1; 
    PurAppReturnNo:any;
    selectedPackingItem:any = [];
    returnbaseOn:any;
    item_types:{};
    selectedSupplierName:any=[];
    selectedContName:any = [];
    returnBaseOnList:any = [];
    customList:any = [];
    modeOfTransport:any = [];
    vehicleList:any = []; 
    returnCriteria:any = []; 
    bussinessUnitList:any = [];
    supplierList:any = [];
    suppContactList:any = [];
    brokerNameList:any = [];
    payToDFrom:any = [];
    packingItem:any = [];
    capacity:any = [];
    selectedItemName:any = [];
    empty_bag_wt:any = [];
    item_codes:any = [];
    itemtypes:any = [];
    reasonList:any = [];
    employeeNames:any = [];
    transporterNames:any = [];
    approve:any = [];
    broker_sl_no = 1;
    Id:any;
    supplier_sl_no = 1;
    serItemType:any;
    serItemSubType:any;
    _supplier:any;
    retAppDate:any;
    currentDate:any;
    currentDate1:any;
    financialYear:any;
    company_id:any;
    purRetType:any;
    _businessunit:any;
    _grandtotal:number;
    editable: boolean = false;
    PriceReadOnly:boolean = false;
    PackingQty:boolean = false;
    purreturnrefno1:any;
    ReturnBasedOn : string;
    puSubTypeList:any=[];
    //ser_item_type1:any;
    pur_subtype:any;
    purreturnapprovesave:boolean = true;
    purreturnapproveupdate:boolean = true;
    purreturnapproveview:boolean = true;
    purreturnapprovedelete:boolean = true;

    
    constructor(public fb:FormBuilder, public dialog: MatDialog,
      private Service : Master,private DropDownListService: DropdownServiceService)
    {
      this.userForm=fb.group(
      {
        id : [''],
        referance_id: [''],
        purreturnid: [''],
        purreturntype:[''],
        purreturnno:[''],   
        supplier:[''],
        suppliername:[''], 
        purreturndate :[''],
        businessunit:[''],
        returncriteria:[''],
        returnbasedon:[''],
        purchase_subtype : [''],
        ser_item_subtype : [''],
        purreturnrefno:[''],
        remark:[''],   
        confirmedby:[''],
        approval:[''],
        reason :[''],
        grandtotal:[''],
        grand_total:[''],
        company_id: [''],
        fin_year: [''],
        username: [''],
        refdate: [''],
        grnlist:[''],
  
        pur_return_approval_item_dtls: this.fb.array([this.fb.group({
          slno:this.item_sl_no,
          itemcode:'',
          packing:'',
          quantity:'',
          uom:'',
          squantity:'',
          suom:'',
          matwt:'',
          price:'',
          pricebasedon:'',
          amount:'',
          discounttype:'',
          discountrate:'',
          discountamt: '',
          taxcode:'',
          taxrate: '',
          taxamt:'',
          totalamt:'',
          accnorms:'',
          net_amount:'',	
          qc_deduction :'',
          net_amt_after_qc :'',
          gross_amt:'',
          warehouse:'',
          stack:''})]),
  
        pur_return_approval_broker_dtls: this.fb.array([this.fb.group({
        slno:this.broker_sl_no,
        brokercode:'',
        basis:'',
        rate:''})]),
  
        pur_return_approval_supplier_dtls:this.fb.array([this.fb.group({
          slno : this.supplier_sl_no, 
          spcode:'',
          spname:'',
          spcontact:''})]),
  
        pur_return_approval_docs:this.fb.array([this.fb.group({
          docname:''})]),
  
        pur_return_approval_shipment_dtls:this.fb.group({
          shipaddr:'',
          shipdetails:'',
          payaddr:'',
          paydetails:'' }),

        pur_return_approval_trans_info:this.fb.group({
          transborneby:'',
          modeoftrans:'',
          //transportername:'',
          vehicleno:'',
          freightamt:'',
          advpaid:'',
          chargecode:'',
          transcode:''}),
  
        pur_return_approval_weight_dtl:this.fb.group({
          ownuom:'',
          owngross:'',
          owntare:'',
          ownnet :'',
          ownpermitno:'',
          owndate:'',
          ownslipno:'',
          partyuom:'',
          partygross:'',
          partytare :'',
          partynet:'',
          partydate:'',
          partyslipno:''})
      });
    }

    get id() {return this.userForm.get("id") as FormControl};
    get purreturnid() {return this.userForm.get("purreturnid") as FormControl};
    get purreturntype() {return this.userForm.get("purreturntype") as FormControl};
    get purreturnno() {return this.userForm.get("purreturnno") as FormControl};
    get supplier() {return this.userForm.get("supplier") as FormControl};
    get suppliername() {return this.userForm.get("suppliername") as FormControl};
    get purchase_subtype() {return this.userForm.get("purchase_subtype") as FormControl};
    get ser_item_subtype() {return this.userForm.get("ser_item_subtype") as FormControl};
    get purreturndate(){return this.userForm.get("purreturndate") as FormControl};
    get businessunit(){return this.userForm.get("businessunit") as FormControl};
    get returncriteria(){return this.userForm.get("returncriteria") as FormControl};
    get returnbasedon(){return this.userForm.get("returnbasedon") as FormControl};
    get purreturnrefno(){return this.userForm.get("purreturnrefno") as FormControl};
    get remark(){return this.userForm.get("remark") as FormControl};
    get confirmedby(){return this.userForm.get("confirmedby") as FormControl};
    get approval(){return this.userForm.get("approval") as FormControl};
    get reason(){return this.userForm.get("reason") as FormControl};
    get grandtotal(){return this.userForm.get("grandtotal") as FormControl};
    get refdate(){ return this.userForm.get("refdate") as FormControl };
    
    get pur_return_approval_item_dtls(){return this.userForm.get("pur_return_approval_item_dtls") as FormArray};
    get pur_return_approval_broker_dtls(){return this.userForm.get("pur_return_approval_broker_dtls") as FormArray};
    get pur_return_approval_supplier_dtls(){return this.userForm.get("pur_return_approval_supplier_dtls") as FormArray};
    get pur_return_approval_shipment_dtls(){return this.userForm.get("pur_return_approval_shipment_dtls") as FormGroup};
    get pur_return_approval_trans_info(){return this.userForm.get("pur_return_approval_trans_info") as FormGroup};
    get pur_return_approval_weight_dtl(){return this.userForm.get("pur_return_approval_weight_dtl") as FormGroup};
    get pur_return_approval_docs(){return this.userForm.get("pur_return_approval_docs") as FormArray};
  
    company_name:any;
    ngOnInit() 
    {
      //For User Role
    let user_role=localStorage.getItem("user_role")+"tuhinabcd"+"purchase_inventory";
    this.DropDownListService.getRoleItemMaster(user_role).subscribe(data=>{
    let accessdata=JSON.stringify(data);
    this.purreturnapprovesave= false;
    this.purreturnapproveupdate=false;
    this.purreturnapproveview = false;
    this.purreturnapprovedelete = false;

    if(accessdata.includes('purchase_return_approval.save'))
    {
     this.purreturnapprovesave = true;
    }
   if(accessdata.includes('purchase_return_approval.update'))
    { 
      this.purreturnapproveupdate=true;
    }
    if(accessdata.includes('purchase_return_approval.view'))
    { 
      this.purreturnapproveview=true;
    }
    if(accessdata.includes('purchase_return_approval.delete'))
    { 
      this.purreturnapprovedelete=true;
    }
  
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
    
      this.status = true;
      this.isHidden = false;
      this.returnbaseOn = '';
      this.serItemType = "0";
      this.serItemSubType = "0";
      this._supplier = "0";
      this.purRetType = "0"
      this._businessunit = "0";
      this.suppContactList = [];
      this.brokerNameList = [];
      this.payToDFrom = [];
     // this.packingItem = [];
      this.capacity = [];
      this.empty_bag_wt = [];
      this.item_codes = [];
      this._grandtotal = 0;
      //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      //this.currentDate1 = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      this.currentDate1 = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      if((this.currentDate>=formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en'))  && (this.currentDate<=formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en')))
      {
       //console.log("sucess");
      }
     else
     {
       alert("Selected  date is not in Selected Financial period!!!!!!")
       this.currentDate=formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
     }
      this.retAppDate = this.currentDate;
      this.returnCriteria=["FULL RETURN","PARTIAL RETURN"];
      this.company_name = localStorage.getItem("company_name");
     // this.item_types=["Service","Material"];
     // this.ser_item_type1="Material";
     this.approve=["NO","PENDING","YES"];
      this.modeOfTransport=["BY AIR","BY ROAD","BY SHIP","BY TRAIN","N/A"];
     // this.puSubTypeList=[{display: "Camp Purchase"},{display: "E-Open Purchase"},{display: "Hat Purchase"},{display: "PDS Purchase"}];
     
      this.financialYear = localStorage.getItem("financial_year");
      this.company_id = localStorage.getItem("company_name");
      this.userForm.patchValue({referance_id: "0", id: "0"});
      forkJoin
      (
        this.DropDownListService.getCompanyBUMNCList(this.company_id),
        this.Service.getPurReturnAppNote("company="+this.company_id+"&finyear="+this.financialYear),
        this.DropDownListService.itemTypeList(this.company_id),
        this.DropDownListService.employeeNamesList(this.company_name),
        this.DropDownListService.getPurTermReasons(),
        this.DropDownListService.getVehicleNameCode(),
        this.DropDownListService.getWeighmentCustomUOM(),
      ).subscribe(([BUMNCData, PurRtnAppData ,itemTypedata, employeeData, reasonData, vehicleData, customUomData])=>
        {
          this.bussinessUnitList  = BUMNCData;
          this.listPurReturnApprovalNote = PurRtnAppData;
          this.itemtypes  = itemTypedata;
          this.employeeNames = employeeData;
          this.reasonList = reasonData;
          this.vehicleList  = vehicleData;
          this.customList = customUomData;
          this.userForm.patchValue({businessunit: "0"})
          this.pur_return_approval_weight_dtl.patchValue({ownuom: "0", partyuom: "0"});
          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});    
    }

    showList(s:string)
    {
      if(this.purreturnapprovesave == true  && this.purreturnapproveupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
         // this.userForm.reset(this.ResetAllValues().value);
        }
      }
      if(this.purreturnapprovesave == true  && this.purreturnapproveupdate == false)
      {
        if(s=="add")
        {
          this.isHidden=true;
          //this.userForm.reset(this.ResetAllValues().value);
        }
      }
      if(s=="list")
      {
        this.isHidden=false;
        this.purreturnapprovesave = true;
        //this.userForm.reset(this.ResetAllValues().value);
      }
    }

    onChangeDate(event)
    {
      this.currentDate = event;
      if((this.currentDate>=formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en'))  && (this.currentDate<=formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en')))
      {
        if(this.purRetType!='0')
        {
        this.getSeqId(this.purRetType, this.currentDate,'create');
        }
      }
     else
     {
       alert("Selected  date is not in Selected Financial period!!!!!!")
       this.currentDate=formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
     }  
    }

    onChangeBusinessUnit(business_id)
    {
      this._businessunit = business_id;
      //alert(business_id)
      this.brokerNameList = [];
      if( business_id != "0")
      {
        this.status = false;
        //this.DropDownListService.getSupplierThruBU(business_id).subscribe(data=>
        this.DropDownListService.getSupplierThruBUNew(business_id).subscribe(data=>
        {
          this.supplierList = data;
          this.status = true;
        });
      }
    }

    onChangeBusinessUnit1(business_id)
    {
      this._businessunit = business_id;
      //alert(business_id)
      this.brokerNameList = [];
      {
        this.status = false;
        this.DropDownListService.getSupplierThruBU(business_id).subscribe(data=>
        {
          this.supplierList = data;
          this.status = true;
        });
      }
    }

    onChangeSupplierName(suppid)
    {
      this._supplier = suppid;
      if(suppid.length && suppid != '0')
      {
        this.pur_return_approval_supplier_dtls.at(0).patchValue({spcode: suppid})
        this.status = false;

        this.DropDownListService.getSuppliertransport(suppid).subscribe(data12=>
        {
              if(data12[0].transport_own == 'YES')
              {
                forkJoin(
                  this.DropDownListService.getBrokerListBySupplierCode(suppid),
                  this.DropDownListService.getSupplierDetailsByCode(suppid),
                  this.DropDownListService.getSuppContactNameList(suppid),
                  this.DropDownListService.getTransporterThruSupplier(suppid),
                ).subscribe(([brokerList, contactData, payToData, transData])=>
                  {
                    this.brokerNameList = brokerList;
                    this.suppContactList = contactData;
                    this.payToDFrom = payToData;
                    this.transporterNames = transData;
                    this.status = true;
                  })

              }
              if(data12[0].transport_own == 'NO')
              {
                forkJoin(
                  this.DropDownListService.getBrokerListBySupplierCode(suppid),
                  this.DropDownListService.getSupplierDetailsByCode(suppid),
                  this.DropDownListService.getSuppContactNameList(suppid),
                //  this.DropDownListService.getTransporterThruSupplier(suppid),
                //).subscribe(([brokerList, contactData, payToData, transData])=>
                ).subscribe(([brokerList, contactData, payToData])=>
                  {
                    this.brokerNameList = brokerList;
                    this.suppContactList = contactData;
                    this.payToDFrom = payToData;
                   // this.transporterNames = transData;
                    this.status = true;
                  })


              }     
        });

       
      }
    }

   onChangeServicesItemSubType(event)
     { 
      this.serItemSubType = event;
      if(event != '0')
      {
        this.status = false;
         //this.packingItem = [];
         this.capacity = [];
        this.empty_bag_wt = [];
        this.DropDownListService.getItemThruType(event).subscribe(data=>
        {
          this.item_codes = data;
          this.status = true;
       })
      }
   }

   onChangeServicesItemSubType1(Item)
   { 
    this.serItemSubType = Item;
      this.status = false;
       this.packingItem = [];
       this.capacity = [];
      this.empty_bag_wt = [];
      this.DropDownListService.getItemThruType(Item).subscribe(data=>
      {
        this.item_codes = data;
        this.status = true;
     })
    
 }

    onchangeItemName(index, event)
    {
      if(event.target.value != '0')
      {
        this.status = false;
        forkJoin(
          this.DropDownListService.getItemNameById(event.target.value,this.company_id),
          this.DropDownListService.getItemMasterPackMat(event.target.value)
        ).subscribe(([itemNameData, packingItemData])=>
        {      
          this.pur_return_approval_item_dtls.at(index).patchValue({itemname: itemNameData["item_name"]});
          this.packingItem[index] = packingItemData;
          this.DropDownListService.getUomName(itemNameData["mstock_unit"]).subscribe(data=>
          { 
            this.pur_return_approval_item_dtls.at(index).patchValue({uom: data.description}); 
            this.status = true;
          });
        });
      }
    }

    onchangeItemName1(index, itemcode:string)
    {
      if(itemcode != '0')
      {
        this.status = false;
        forkJoin(
          this.DropDownListService.getItemNameById(itemcode,this.company_id),
          this.DropDownListService.getItemMasterPackMat(itemcode)
        ).subscribe(([itemNameData, packingItemData])=>
        {      
          this.pur_return_approval_item_dtls.at(index).patchValue({itemname: itemNameData["item_name"]});
          this.packingItem[index] = packingItemData;
          this.DropDownListService.getUomName(itemNameData["mstock_unit"]).subscribe(data=>
          { 
            this.pur_return_approval_item_dtls.at(index).patchValue({uom: data.description}); 
            this.status = true;
          });
        });
      }
    }

    itemId:any;
    onchangePackingItem(index, event)
    {
      if(event.target.value != '0')
      {
        this.itemId =  this.pur_return_approval_item_dtls.at(index).get("itemcode").value as FormControl; 
        this.status = false;
        this.DropDownListService.getItemPackUom(this.itemId, event.target.value,this.company_id).subscribe(data=>
        {  
          this.capacity[index] = data.capacity; 
          this.empty_bag_wt[index] =  data.empty_big_wt;
          this.pur_return_approval_item_dtls.at(index).patchValue({suom: data.uom1}); 
          this.status = true;
        }); 
      }
    }

    onChangeContactName(event, index)
    {
      if(event != "0" && this._supplier != "0")
      {
        this.status = false;
        this.DropDownListService.getSupplierContDetails(this._supplier, event).subscribe(data=>
        {
          this.pur_return_approval_supplier_dtls.at(index).patchValue({spcontact: data.mobile});
          this.status = true;
        })
      }
    }

    onChangeBrokerName(index, event)
    {
      
      if(event != "0")
      {
        this.status = false;
        this.DropDownListService.getBrokerDetailsByBrokerCode(event).subscribe(data=>          
        {
         
          this.pur_return_approval_broker_dtls.at(index).patchValue({basis: data[0].basis, rate: data[0].rate});
          this.status = true;
        });
      }  
    }

    onChangeShipToAddId(businessunit_code: String)
    {
      this.pur_return_approval_shipment_dtls.patchValue({shipdetails: null});
      if(businessunit_code != '0')
      {
        this.status = false;
        this.DropDownListService.getCompanyBUAddress(businessunit_code).subscribe(data=>
        {
          this.pur_return_approval_shipment_dtls.patchValue({shipdetails: data["add"]});
          this.status = true;
        });
      }
    }

    onChangePayToDForm(dForm: string)
    {
      this.pur_return_approval_shipment_dtls.patchValue({paydetails: null});
      if(dForm != '0')
      {
        this.status = false;
        this.DropDownListService.getSuppDelvAddress(this._supplier, dForm).subscribe(data=>
        {
          this.pur_return_approval_shipment_dtls.patchValue({paydetails: data["address"]+", "+data["city"]+", "+data["pincode"]});
          this.status = true;
        });
      }
    }


    addBroker()
    {
      this.broker_sl_no = this.broker_sl_no+1;
      this.pur_return_approval_broker_dtls.push(this.fb.group({
        slno:this.broker_sl_no,	
        brokercode:'',
        basis:'',
        rate:''}))
    }

    deleteBroker(index) 
    {
      if(this.broker_sl_no > 1)
      { 
        this.pur_return_approval_broker_dtls.removeAt(index);
        this.broker_sl_no = this.broker_sl_no - 1;
      }
      else
      {
        this.broker_sl_no = 1;
        alert("can't delete all rows");
        this.pur_return_approval_broker_dtls.reset();
        this.pur_return_approval_broker_dtls.at(0).patchValue({slno:  this.broker_sl_no});
      } 
      
      for(let i=1; i<=this.broker_sl_no; i++)
        this.pur_return_approval_broker_dtls.at(i-1).patchValue({slno: i});
      
    }

    addSupplier()
    {
      this.supplier_sl_no = this.supplier_sl_no + 1;
      this.pur_return_approval_supplier_dtls.push(this.fb.group({
        slno : this.supplier_sl_no,  
        spcode:'',
        spname:'',
        spcontact:'' }))
    }

    deleteSupplier(index) 
    {
      if(this.supplier_sl_no > 1)
      { 
        this.pur_return_approval_supplier_dtls.removeAt(index);
        this.supplier_sl_no = this.supplier_sl_no - 1;
      }
      else
      {
        this.supplier_sl_no = 1;
        alert("can't delete all rows");
        this.pur_return_approval_supplier_dtls.reset();
        this.pur_return_approval_supplier_dtls.at(0).patchValue({slno:  this.supplier_sl_no});
      }     
      for(let i=1; i<=this.supplier_sl_no; i++)
        this.pur_return_approval_supplier_dtls.at(i-1).patchValue({slno: i});   
    }

    addDocument()
    {
      this.pur_return_approval_docs.push(this.fb.group({
        docname:'',
        }))
    }

    deleteDocument(index)
    {
      if(index)
      { this.pur_return_approval_docs.removeAt(index);}
      else
      {
        alert("Can not delete all rows");
        this.pur_return_approval_docs.reset();
      } 
    }

    addItem()
    {
      this.item_sl_no =this.item_sl_no +1;
      this.pur_return_approval_item_dtls.push(this.fb.group({
        slno:this.item_sl_no,
        itemcode:'',
        packing:'',
        quantity:'',
        uom:'',
        squantity:'',
        suom:'',
        matwt:'',
        price:'',
        pricebasedon:'',
        amount:'',
        discounttype:'',
        discountrate:'',
        discountamt: '',
        taxcode:'',
        taxrate: '',
        taxamt:'',
        totalamt:'',
        accnorms:'',
        net_amount:'',	
        qc_deduction :'',
        net_amt_after_qc :'',
        gross_amt:'',
        warehouse:'',
        stack:''
        }))
    }

    deleteItem(index) 
    {
      if(this.item_sl_no > 1)
      { 
        this.pur_return_approval_item_dtls.removeAt(index);
        this.item_sl_no = this.item_sl_no - 1;
      }
      else
      {
        this.item_sl_no = 1;
        alert("can't delete all rows");
        this.pur_return_approval_item_dtls.reset();
        this.pur_return_approval_item_dtls.at(0).patchValue({slno:  this.item_sl_no});
      }     
      for(let i=1; i<=this.item_sl_no; i++)
        this.pur_return_approval_item_dtls.at(i-1).patchValue({slno: i});   
    }
 

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id : [''],
        referance_id: [''],
        purreturnid: [''],
        purreturntype:[''],
        purreturnno:[''],   
        supplier:[''],
        suppliername:[''], 
        purreturndate :[''],
        refdate :[''],
        businessunit:[''],
        returncriteria:[''],
        returnbasedon:[''],
        //ser_item_type : [''],
        ser_item_subtype : [''],
        purreturnrefno:[''],
        remark:[''],   
        confirmedby:[''],
        approval:[''],
        reason :[''],
        grandtotal:[''],
        grand_total:[''],
        company_id: [''],
        fin_year: [''],
        username: [''],
        // inv_type: [''],
  
        pur_return_approval_item_dtls: this.fb.array([this.fb.group({
          slno:this.item_sl_no,
          itemcode:'',
          packing:'',
          quantity:'',
          uom:'',
          squantity:'',
          suom:'',
          matwt:'',
          price:'',
          pricebasedon:'',
          amount:'',
          discounttype:'',
          discountrate:'',
          discountamt: '',
          taxcode:'',
          taxrate: '',
          taxamt:'',
          totalamt:'',
          accnorms:'',
          net_amount:'',	
          qc_deduction :'',
          net_amt_after_qc :'',
          gross_amt:'',
          warehouse:'',
          stack:''})]),
  
        pur_return_approval_broker_dtls: this.fb.array([this.fb.group({
        slno:this.broker_sl_no,
        brokercode:'',
        basis:'',
        rate:''})]),
  
        pur_return_approval_supplier_dtls:this.fb.array([this.fb.group({
          slno : this.supplier_sl_no, 
          spcode:'',
          spname:'',
          spcontact:''})]),
  
        pur_return_approval_docs:this.fb.array([this.fb.group({
          docname:''})]),
  
        pur_return_approval_shipment_dtls:this.fb.group({
          shipaddr:'',
          shipdetails:'',
          payaddr:'',
          paydetails:'' }),

        pur_return_approval_trans_info:this.fb.group({
          transborneby:'',
          modeoftrans:'',
          //transportername:'',
          vehicleno:'',
          freightamt:'',
          advpaid:'',
          chargecode:'',
          transcode:''}),
  
        pur_return_approval_weight_dtl:this.fb.group({
          ownuom:'',
          owngross:'',
          owntare:'',
          ownnet :'',
          ownpermitno:'',
          owndate:'',
          ownslipno:'',
          partyuom:'',
          partygross:'',
          partytare :'',
          partynet:'',
          partydate:'',
          partyslipno:''})
      });
    }

    itype1:any;
    getSeqId(rtntype, rtndate,operation)
    {
      
       if(rtntype != "0" && operation == 'create')
            {
              this.status = false;
              this.DropDownListService.getPRANSequenceId(rtntype+"/"+rtndate).subscribe(data=>
              {
                this.PurAppReturnNo = data.sequenceid;
                this.status = true;
              }); 
            }
          
    }

    ReCriteria:any;
    PurreturnType:any;
    returndate:any;
    onChangePurReturnType(event)
    {
      this.ReCriteria= this.userForm.get("returncriteria").value as FormControl;
      this.userForm.patchValue({returncriteria: null,returnbasedon:null});
      this.purRetType = event;
      if(event != "0")
      {
        this.returnbaseOn = ''; 
        if(event == 'Acceptance of Lower Rate')
        {
          this.returnCriteria=["FULL RETURN"];
          this.userForm.patchValue({returncriteria:'FULL RETURN'});
          this.returnBaseOnList=["Purchase Bill"];
          this.ReturnBasedOn="Purchase Bill";
          this.editable = true;
          this.PriceReadOnly=false;  
          this.PackingQty = true;
          this.onChangeReturnBasedOn(event);
        }
        else
        {
          this.returnCriteria=["FULL RETURN","PARTIAL RETURN"];
         this.editable = false;
         this.PriceReadOnly=false; 
         this.PackingQty = false; 
        }
       // this.returndate=this.userForm.get("")
       this.getSeqId(event, this.currentDate,'create')
      }
    }

    onChangeReturnCriteria(event, operation)
    {
      this.userForm.patchValue({returnbasedon:null});
      this.PurreturnType= this.userForm.get("purreturntype").value as FormControl;
      if(event != "0")
      {
        this.returnbaseOn = ''; 
        if(this.PurreturnType=='Goods Return Due To Rejection' && event == 'PARTIAL RETURN')
          {
            this.returnBaseOnList=["GRN","Purchase Order"];
            this.editable = true;
            this.PriceReadOnly=false;  
            this.PackingQty = false;
            this.onChangeReturnBasedOn(event);
          }

         else if(this.PurreturnType=='Goods Return Due To Rejection' && event == 'FULL RETURN')
          {
            this.returnBaseOnList=["GRN"];
            this.ReturnBasedOn="GRN";
            this.editable = true;
            this.PriceReadOnly=true; 
            this.PackingQty = true;
            this.onChangeReturnBasedOn(event);        
          }

         else
           {
             this.editable = false;
             this.PriceReadOnly=false; 
             this.PackingQty = false;    
           }
      }
    }

    onChangeReturnCriteria1(ReturnCriteria:string)
    {    
            this.returnBaseOnList=["GRN","Purchase Order"];
            this.editable = true;
            this.PriceReadOnly=false;  
            this.PackingQty = false;
          
            this.returnBaseOnList=["GRN"];
            this.ReturnBasedOn="GRN";
            this.editable = true;
            this.PriceReadOnly=true; 
            this.PackingQty = true;
             this.editable = false;
             this.PriceReadOnly=false; 
             this.PackingQty = false;    
           
    } 

    onChangeReturnBasedOn(event)
    {
      if(event != 'Choose An Options')
      this.returnbaseOn = event;
      else
      this.returnbaseOn = '';
    }

    showPopUp2(index)
    {
      this.itemId = this.pur_return_approval_item_dtls.at(index).get('itemcode').value as FormControl;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index, item_code: this.itemId};
      const dialogRef = this.dialog.open(QcNormPopUpModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => 
      { this.pur_return_approval_item_dtls.at(index).patchValue({accnorms: data["qc_code"]});}); 
    }


    return_criteria:any;
    referencedate1:any;
    returnbaseOn1:any;
    onClickShow()
    {
      
      this.returnbaseOn=this.userForm.get("returnbasedon").value as FormControl;
     // window.alert(this.returnbaseOn);
      this.referencedate1 = this.userForm.get("refdate").value as FormControl;
    // window.alert(this.referencedate1);

      this.Id=this.userForm.get("id").value;
    
      if(this.Id == null || this.Id =='')
      {
        this.Id=0;
     
      }
      
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {supplier_id: this._supplier, item_type: this.serItemType, item_sub_type: this.serItemSubType,
       company_id: this.company_id, fin_year: this.financialYear, date: this.referencedate1, bunit: this._businessunit,id:this.Id};
     
       
     
       if(this._supplier != ""  && this._businessunit != "0")
      {
        if(this.returnbaseOn == "Purchase Order")
        {
         // const dialogRef = this.dialog.open(PurchaseOrderPopUpComponent, dialogConfig);
         const dialogRef = this.dialog.open(PurorderReturnapprovalPopupComponent, dialogConfig);
          dialogRef.afterClosed().subscribe(data => 
          {
            if(data != '' && data["pur_orderid"] != '0')
            {
              this._grandtotal = 0;
              this.userForm.patchValue({referance_id: data["pur_orderid"],grnlist:data["grn_id"]});

              forkJoin(
                this.DropDownListService.getPurOrdDetails(data["pur_orderid"]),
               
              ).subscribe(([porderData])=>
                {
                  this.onChangeServicesItemSubType(porderData['ser_item_subtype']);
                }); 

              this.packingItem = [];
              let  k=0;
              this.addItem();
              this.item_sl_no = 0;
              while(this.pur_return_approval_item_dtls.length)
              this.pur_return_approval_item_dtls.removeAt(0); 
           //   for(let data1 of data.PurchaseOrderItem)//
              for(let data1 of data.pur_Order_Item_Details)
              {
                if(data1.checkbox == true)
                {
                  this.status = false;
                  forkJoin(
                    //this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                    //this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing_item"],this.company_id)
                    this.DropDownListService.getItemMasterPackMat(data1["adv_item_code"]),
                    this.DropDownListService.getItemPackUom(data1["adv_item_code"], data1["adv_packing"],this.company_id)
                  ).subscribe(([packingList, capacityEmptyWt])=>
                    {
                      this.status = true;
                    /*  this.onchangeItemName1(k,data1["item_code"]);
                      this.capacity[k] = capacityEmptyWt.capacity;
                      this.empty_bag_wt[k] =  capacityEmptyWt.empty_big_wt;
                      this.packingItem[k] = packingList; 
                      this.addItem();
                      this._grandtotal = this._grandtotal + data1['total_amount'];
                      this.pur_return_approval_item_dtls.at(k).patchValue({itemcode: data1['item_code'], packing: data1['packing_item'],
                       quantity: data1['stock_qty'], uom: data1['stock_uom'], squantity: data1['packing_qty'], suom: data1['packing_uom'], matwt: data1['mat_weight'],
                       price: data1['price'], pricebasedon: data1['price_based_on'], amount: data1['amount'], discounttype: data1['discount_basedon'],
                       discountrate: data1['discount'], discountamt: data1['discount_amount'], taxcode: data1['tax_code'], taxrate: data1['tax_rate'],
                       taxamt: data1['tax_amount'], totalamt: data1['total_amount'], accnorms: data1['qc_norms']});          
                      k = k + 1;
                      this.userForm.patchValue({grandtotal: (Math.round(this._grandtotal * 1000)/1000).toFixed(3)});
                    */
                      this.onchangeItemName1(k,data1["adv_item_code"]);
                      this.capacity[k] = capacityEmptyWt.capacity;
                      this.empty_bag_wt[k] =  capacityEmptyWt.empty_big_wt;
                      this.packingItem[k] = packingList; 
                      this.addItem();
                      this._grandtotal = this._grandtotal + data1['gross_amt'];
                      this.pur_return_approval_item_dtls.at(k).patchValue({itemcode: data1['adv_item_code'], packing: data1['adv_packing'],
                       quantity: data1['pssd_item_qty'], uom: data1['pssd_item_uom'], squantity: data1['pssd_pack_qty'], suom: data1['pssd_pack_uom'], matwt: data1['pssd_mat_wt'],
                       price: data1['unit_rate'], pricebasedon: data1['price_based_on'], amount: data1['amount'], discounttype: data1['discount_based_on'],
                       discountrate: data1['discount'], discountamt: data1['discount_amt'], taxcode: data1['tax_code'], taxrate: data1['tax_rate'],
                       taxamt: data1['tax_amt'], totalamt: data1['gross_amt'], accnorms: data1['qc_norms']});          
                      k = k + 1;
                      this.userForm.patchValue({grandtotal: (Math.round(this._grandtotal * 1000)/1000).toFixed(3)});
                    });
                 }
              } 

              this.status = false;
              forkJoin(
                this.DropDownListService.getPurOrdDetails(data["pur_orderid"]),
                this.DropDownListService.getPurOrdBrokerList(data["pur_orderid"]),
                this.DropDownListService.purOrdDocRetriveList(data["pur_orderid"]),
                this.DropDownListService.getPurOrdTrans(data["pur_orderid"]),
              ).subscribe(([purOrderData, brokerData, docData, transData])=>
                {
                  this.userForm.patchValue({confirmedby: purOrderData['confirmed_by'],purreturnrefno:purOrderData['pur_order_no'],
                   approval: purOrderData['approved'], reason: purOrderData['reason'], remarks: purOrderData['remarks'],purchase_subtype:purOrderData["pur_ord_type"],ser_item_subtype:purOrderData["ser_item_subtype"]});
                  this.pur_return_approval_shipment_dtls.patchValue({shipaddr:this.userForm.get("supplier").value, 
                    shipdetails: purOrderData['ship_to_addr'], payaddr: purOrderData['pay_to_addr_id'], paydetails: purOrderData['pay_to_addr']});
                  this.pur_return_approval_trans_info.patchValue({transborneby: transData['trans_borne_by'],
                   modeoftrans: transData['mode_of_trans'], chargecode: transData['charge_code'], transcode: transData['transporter_name']});
                  
                  let i = 0;
                  this.addBroker();
                  this.broker_sl_no = 0;
                  while(this.pur_return_approval_broker_dtls.length)
                  this.pur_return_approval_broker_dtls.removeAt(0);
                  for(let data1 of brokerData)
                  {
                    this.addBroker();
                    this.pur_return_approval_broker_dtls.at(i).patchValue({brokercode: data1['ven_code_name'],
                     basis: data1['basis'], rate: data1['rate']});
                    i = i + 1;
                  }

                  let j = 0;
                  this.addDocument();
                  while(this.pur_return_approval_docs.length)
                  this.pur_return_approval_docs.removeAt(0)
                  for(let data1 of docData)
                  {
                    this.addDocument();
                    this.pur_return_approval_docs.at(j).patchValue({docname: data1['doc_name']});
                    j = j + 1;
                  }
                  this.status = true;
                });
            }
          });
        }

        if(this.returnbaseOn == "Purchase Bill")
        {
          const dialogRef = this.dialog.open(PurchaseBillPopUpComponent, dialogConfig);
          dialogRef.afterClosed().subscribe(data => 
          {
            if(data != '' && data["pur_bill_id"] != '0')
            {

              forkJoin(
                this.DropDownListService.getPurBillDetails("pbillid="+data["pur_bill_id"]+"&company="+this.company_id+"&finyear="+this.financialYear),                            
               
              ).subscribe(([purBillData])=>
                {
                  this.onChangeServicesItemSubType(purBillData['purchase_type']);                                       
                });    
              this._grandtotal = 0;
              this.userForm.patchValue({referance_id: data["pur_bill_id"]});
             // this.packingItem = [];
              let  k=0;
              this.addItem();
              this.item_sl_no = 0;
              while(this.pur_return_approval_item_dtls.length)
              this.pur_return_approval_item_dtls.removeAt(0); 
              for(let data1 of data.PurchaseBillItem)
              {
              
                  this.status = false;
                  forkJoin(
                    this.DropDownListService.getItemMasterPackMat(data1["adv_item_code"]),
                    this.DropDownListService.getItemPackUom(data1["adv_item_code"], data1["adv_packing_item"],this.company_id)
                  ).subscribe(([packingList, capacityEmptyWt])=>
                    {
                      this.status = true;
                      
                      this.onchangeItemName1(k,data1["adv_item_code"]);
                      this.capacity[k] = capacityEmptyWt.capacity;
                      this.empty_bag_wt[k] =  capacityEmptyWt.empty_big_wt;
                      this.packingItem[k] = packingList; 
                      this.addItem();
                      this._grandtotal = this._grandtotal + data1['amount'] + data1['tax_amt'] - data1['discount_amount'];
                      this.pur_return_approval_item_dtls.at(k).patchValue({itemcode: data1['adv_item_code'], packing: data1['adv_packing_item'],
                       quantity: data1['passed_item_qty'], uom: data1['passed_item_uom'], squantity: data1['passed_packing_qty'], 
                       suom: data1['passed_packing_uom'], matwt: data1['passed_mat_weight'],
                       price: data1['unit_rate'], pricebasedon: data1['price_based_on'], amount: data1['amount'], 
                       discounttype: data1['discount_basedon'],  warehouse: data1['warehouse'], stack: data1['stack'],
                       discountrate: data1['discount'], discountamt: data1['discount_amount'], 
                       taxcode: data1['tax_code'], taxrate: data1['tax_rate'],
                       taxamt: data1['tax_amt'], totalamt: data1['amount'] + data1['tax_amt'] - data1['discount_amount'],
                       net_amount: data1['net_amount'], qc_deduction: data1['qc_deduction'], 
                       net_amt_after_qc: data1['net_amt_after_qc'], gross_amt: data1['gross_amt']});       
                      k = k + 1;
                      this.userForm.patchValue({grandtotal: (Math.round(this._grandtotal * 1000)/1000).toFixed(3)});
                    });
                 
              } 
              this.status = false;
              forkJoin(
                this.DropDownListService.getPurBillDetails("pbillid="+data["pur_bill_id"]+"&company="+this.company_id+"&finyear="+this.financialYear),
                this.DropDownListService.purBillBrokerRetriveList(data["pur_bill_id"]),
                this.DropDownListService.purBillDocRetriveList(data["pur_bill_id"])
              ).subscribe(([purBillData, brokerData, docData])=>
                {
                  this.userForm.patchValue({remarks: purBillData['remarks'],purreturnrefno:purBillData['pur_bill_no'],ser_item_subtype:purBillData["purchase_type"],purchase_subtype:purBillData["purchase_subtype"],});
                 
                  let i = 0;
                  this.addBroker();
                  this.broker_sl_no = 0;
                  while(this.pur_return_approval_broker_dtls.length)
                  this.pur_return_approval_broker_dtls.removeAt(0);
                  for(let data1 of brokerData)
                  {
                    this.addBroker();
                    this.pur_return_approval_broker_dtls.at(i).patchValue({brokercode: data1['broker_code']});
                    
                    this.onChangeBrokerName(i, data1['broker_code']);
                    i = i + 1;
                  }
                
                  let j = 0;
                  this.addDocument();
                  while(this.pur_return_approval_docs.length)
                  this.pur_return_approval_docs.removeAt(0)
                  for(let data1 of docData)
                  {
                    this.addDocument();
                    this.pur_return_approval_docs.at(j).patchValue({docname: data1['doc_name']});
                    j = j + 1;
                  }
                  
                  console.log("purBillData ref id: "+purBillData["referance_id"]);
                  if(purBillData["referance_id"] != "0")
                  {
                    this.status = false;
                    forkJoin(
                      this.DropDownListService.grnTransInfoRetriveList(purBillData["referance_id"]),
                      this.DropDownListService.getPurGoodRcptDtls(purBillData["referance_id"])
                    ).subscribe(([transData, grnData])=>
                      {
                        this.pur_return_approval_trans_info.patchValue({transborneby: transData['trans_borne_by'],
                          modeoftrans: transData['mode_of_trans'], transcode: transData['transporter_code'], vehicleno: grnData['vehicle_id']});
                        this.status = true;
                        //console.log("grn reference id: "+grnData['referance_id']+",  grn ref type: "+grnData['referance_type'])
                        if(grnData['referance_id'] != "0" && grnData['referance_type'] == 'UNLOAD ADVICE')
                        {
                          this.status = false;
                          this.DropDownListService.getUnloadDetails(grnData['referance_id']).subscribe(unloadData=>
                          {
                            //console.log("unloadData: "+JSON.stringify(unloadData)+" unloadData1: "+unloadData['ref_type']);
                            this.DropDownListService.getUnloadWeightmentWt(unloadData["weighment_id"]).subscribe(weigmtData=>
                            {
                             // console.log("unload reference id: "+unloadData['referance_id']+",  unload ref type: "+unloadData['referance_type']);
                              //console.log("weigmtData: "+JSON.stringify(weigmtData)+" unloadData: "+JSON.stringify(unloadData));
                              this.pur_return_approval_weight_dtl.patchValue({owngross: weigmtData["gross_weight"], ownuom: weigmtData["gw_unit"],
                              owndate: weigmtData["gw_date"], ownnet: (Math.round( weigmtData["net_weight"] * 100) / 100).toFixed(3), 
                              owntare: weigmtData["tare_weight"]});
                              this.status = true;
                            })
                            if(unloadData['ref_type'] == 'Purchase Order' && unloadData['referance_id'] != "0")
                            {
                              this.status = false;
                              this.DropDownListService.getPurOrdDetails(unloadData['referance_id']).subscribe(purOrderData=>
                              {
                                //console.log("purOrderData:"+purOrderData['ship_to_addr']+"//"+this.userForm.get("supplier").value)
                                this.pur_return_approval_shipment_dtls.patchValue({shipaddr:this.userForm.get("supplier").value, 
                                  shipdetails: purOrderData['ship_to_addr'], payaddr: purOrderData['pay_to_addr_id'], paydetails: purOrderData['pay_to_addr']});
                                this.status = true;
                              })
                            }
                          })
                        }
                      })
                    }
                });
 
            }
          });
        }
        


        if(this.returnbaseOn == "GRN")
        {
          this.return_criteria=this.userForm.get("returncriteria").value as FormControl;
         
          dialogConfig.data = {supplier_id: this._supplier, item_type: this.serItemType, item_sub_type: this.serItemSubType,
           company_id: this.company_id, fin_year: this.financialYear, date: this.referencedate1, bunit: this._businessunit, retcriteria:this.return_criteria , file_name: "PurchaseReturnApproval"};
          const dialogRef = this.dialog.open(GrnPopUpComponent, dialogConfig);
          dialogRef.afterClosed().subscribe(data => 
          {

            if(this.return_criteria=="FULL RETURN")
            {

                        if(data != '' && data["grn_id"] != '0')
                                    {
                                      this._grandtotal = 0;
                                      this.userForm.patchValue({referance_id: data["grn_id"]});

                                      this.status = false;
                                      forkJoin(
                                        this.DropDownListService.getPurGoodRcptDtls(data["grn_id"]),                             
                                       
                                      ).subscribe(([grnData])=>
                                        {
                                          this.onChangeServicesItemSubType(grnData['purchase_type']);                                       
                                        });     

                                      this.packingItem = [];
                                      let  k=0;
                                      this.addItem();
                                      this.item_sl_no = 0;
                                      while(this.pur_return_approval_item_dtls.length)
                                      this.pur_return_approval_item_dtls.removeAt(0); 
                                      for(let data1 of data.pur_good_receipt_item_details)
                                      {
                                        //  if(data1.checkbox == true)
                                        //  {
                                          this.status = false;
                                          forkJoin(
                                            this.DropDownListService.getItemMasterPackMat(data1["adv_item_code"]),
                                            this.DropDownListService.getItemPackUom(data1["adv_item_code"], data1["adv_packing"],this.company_id)
                                          ).subscribe(([packingList, capacityEmptyWt])=>
                                            {
                                              this.status = true;
                                              this.onchangeItemName1(k,data1["adv_item_code"]);
                                              this.capacity[k] = capacityEmptyWt.capacity;
                                              this.empty_bag_wt[k] =  capacityEmptyWt.empty_big_wt;
                                              this.packingItem[k] = packingList; 
                                              this.addItem();
                                              this._grandtotal = this._grandtotal + data1['amount'] + data1['tax_amt'] - data1['discount_amt'];
                                              this._grandtotal = this._grandtotal + data1['amount'] + data1['tax_amt'] - data1['discount_amt'];
                                              this.pur_return_approval_item_dtls.at(k).patchValue({itemcode: data1['adv_item_code'], packing: data1['adv_packing'],
                                              quantity: data1['pssd_item_qty'], uom: data1['pssd_item_uom'], squantity: data1['pssd_pack_qty'], suom: data1['pssd_pack_uom'],
                                              matwt: data1['pssd_mat_wt'], price: data1['unit_rate'], pricebasedon: data1['price_based_on'], amount: data1['amount'],
                                              discounttype: data1['discount_based_on'], discountrate: data1['discount'], discountamt: data1['discount_amt'], 
                                              taxcode: data1['tax_code'], taxrate: data1['tax_rate'], taxamt: data1['tax_amt'], 
                                              totalamt: data1['amount'] + data1['tax_amt'] - data1['discount_amt'], accnorms: data1['qc_norms'],       
                                              net_amount: data1['net_amt'], qc_deduction: data1['qc_deduction'], warehouse: data1['warehouse_name'], stack: data1['rack'], 
                                              net_amt_after_qc: data1['net_amt_after_qc'], gross_amt: data1['gross_amt']});
                                              k = k + 1;
                                              this.userForm.patchValue({grandtotal: (Math.round(this._grandtotal * 1000)/1000).toFixed(3)});
                                            });
                                        // }
                                      } 

                                      
                                      this.status = false;
                                      forkJoin(
                                        this.DropDownListService.getPurGoodRcptDtls(data["grn_id"]),
                                        this.DropDownListService.getPurGoodRcptBrokerList(data["grn_id"]),
                                        this.DropDownListService.getPurGoodRcptDocList(data["grn_id"]),
                                        this.DropDownListService.grnTransInfoRetriveList(data["grn_id"]),
                                        this.DropDownListService.grnOtherInfoRetriveList(data["grn_id"]),
                                      ).subscribe(([grnData, brokerData, docData, transData, otherInfoData])=>
                                        {
                                        // console.log("else data under for:"+JSON.stringify(grnData))
                                        this.userForm.patchValue({remarks: grnData['remarks'],purreturnrefno:grnData['grn_no'],ser_item_subtype:grnData["purchase_type"],purchase_subtype:grnData["purchase_subtype"],})                              
                                    
                                          this.pur_return_approval_trans_info.patchValue({transborneby: transData['trans_borne_by'],
                                          modeoftrans: transData['mode_of_trans'], transcode: transData['transporter_code'], vehicleno: grnData['vehicle_id'],
                                          })
                                          
                                        //  console.log("otherInfoData: "+JSON.stringify(otherInfoData));
                                          this.pur_return_approval_weight_dtl.patchValue({partyuom: otherInfoData['pty_gross_uom'], 
                                          partygross: otherInfoData['pty_gross_wt'], partytare: otherInfoData['pty_tare_wt'],
                                          partynet: otherInfoData['pty_net_wt'], partydate: otherInfoData['pty_weigh_date'], partyslipno: otherInfoData['pty_weigh_slip_no']})

                                          let i = 0;
                                          this.addBroker();
                                          this.broker_sl_no = 0;
                                          while(this.pur_return_approval_broker_dtls.length)
                                          this.pur_return_approval_broker_dtls.removeAt(0);
                                          for(let data1 of brokerData)
                                          {
                                            this.addBroker();
                                            this.pur_return_approval_broker_dtls.at(i).patchValue({brokercode: data1['ven_code_name'],
                                            basis: data1['basis'], rate: data1['rate']});
                                            i = i + 1;
                                          }

                                          let j = 0;
                                          this.addDocument();
                                          while(this.pur_return_approval_docs.length)
                                          this.pur_return_approval_docs.removeAt(0)
                                          for(let data1 of docData)
                                          {
                                            this.addDocument();
                                            this.pur_return_approval_docs.at(j).patchValue({docname: data1['doc_name']});
                                            j = j + 1;
                                          }

                                        //  console.log("grn reference id: "+grnData['referance_id']+",  grn ref type: "+grnData['referance_type'])
                                          if(grnData['referance_id'] != "0" && grnData['referance_type'] == 'Unload Advice')
                                          {
                                            this.status = false;
                                            this.DropDownListService.getUnloadDetails(grnData['referance_id']).subscribe(unloadData=>
                                            {
                                              this.DropDownListService.getUnloadWeightmentWt(unloadData["weighment_id"]).subscribe(weigmtData=>
                                              {
                                              //  console.log("unload reference id: "+unloadData['referance_id']+",  unload ref type: "+unloadData['ref_type'])
                                              //  console.log("weigmtData: "+JSON.stringify(weigmtData)+" unloadData: "+JSON.stringify(unloadData));
                                                this.pur_return_approval_weight_dtl.patchValue({owngross: weigmtData["gross_weight"], ownuom: weigmtData["gw_unit"],
                                                owndate: weigmtData["gw_date"], ownnet: (Math.round( weigmtData["net_weight"] * 100) / 100).toFixed(3), 
                                                owntare: weigmtData["tare_weight"]});
                                                this.status = true;
                                              })
                                              if(unloadData['ref_type'] == 'Purchase Order' && unloadData['referance_id'] != "0")
                                              {
                                                this.status = false;
                                                this.DropDownListService.getPurOrdDetails(unloadData['referance_id']).subscribe(purOrderData=>
                                                {
                                                 // console.log("ship dtls: "+JSON.stringify(purOrderData))
                                                  
                                                  this.pur_return_approval_shipment_dtls.patchValue({shipaddr:this.userForm.get("supplier").value, 
                                                    shipdetails: purOrderData['ship_to_addr'], payaddr: purOrderData['pay_to_addr_id'], paydetails: purOrderData['pay_to_addr']});
                                                  this.status = true;
                                                })
                                              }
                                            })
                                          }
                                        
                                        });
                                    }
            }
            else
            {
        //console.log("else data:"+data["grn_id"])
              if(data != '' && data["grn_id"] != '0')
              {
                this._grandtotal = 0;
                this.userForm.patchValue({referance_id: data["grn_id"]});

                forkJoin(
                  this.DropDownListService.getPurGoodRcptDtls(data["grn_id"]),                             
                 
                ).subscribe(([grnData])=>
                  {
                    this.onChangeServicesItemSubType(grnData['purchase_type']);                                       
                  }); 

                this.packingItem = [];
                let  k=0;
                this.addItem();
                this.item_sl_no = 0;
                while(this.pur_return_approval_item_dtls.length)
                this.pur_return_approval_item_dtls.removeAt(0); 
                for(let data1 of data.pur_good_receipt_item_details)
                {
                 // console.log("else data under for:"+JSON.stringify(data))
                   // if(data1.checkbox == true)
                    //{
                    this.status = false;
                    forkJoin(
                      this.DropDownListService.getItemMasterPackMat(data1["adv_item_code"]),
                      this.DropDownListService.getItemPackUom(data1["adv_item_code"], data1["adv_packing"],this.company_id)
                    ).subscribe(([packingList, capacityEmptyWt])=>
                      {
                        this.status = true;
                       // console.log("pack data::"+JSON.stringify(packingList))
                        //console.log("pack data::"+data1["adv_packing"])
                        this.capacity[k] = capacityEmptyWt.capacity;
                        this.empty_bag_wt[k] =  capacityEmptyWt.empty_big_wt;
                        this.packingItem[k] = packingList; 
                        this.addItem();
                        this._grandtotal = this._grandtotal + data1['amount'] + data1['tax_amt'] - data1['discount_amt'];
                        this._grandtotal = this._grandtotal + data1['amount'] + data1['tax_amt'] - data1['discount_amt'];
                        this.pur_return_approval_item_dtls.at(k).patchValue({itemcode: data1['adv_item_code'], packing: data1['adv_packing'],
                        quantity: data1['pssd_item_qty'], uom: data1['pssd_item_uom'], squantity: data1['pssd_pack_qty'], suom: data1['pssd_pack_uom'],
                        matwt: data1['pssd_mat_wt'], price: data1['unit_rate'], pricebasedon: data1['price_based_on'], amount: data1['amount'],
                        discounttype: data1['discount_based_on'], discountrate: data1['discount'], discountamt: data1['discount_amt'], 
                        taxcode: data1['tax_code'], taxrate: data1['tax_rate'], taxamt: data1['tax_amt'], 
                        totalamt: data1['amount'] + data1['tax_amt'] - data1['discount_amt'], accnorms: data1['qc_norms'],       
                        net_amount: data1['net_amt'], qc_deduction: data1['qc_deduction'], 
                        net_amt_after_qc: data1['net_amt_after_qc'], gross_amt: data1['gross_amt']});
                        k = k + 1;
                        this.userForm.patchValue({grandtotal: (Math.round(this._grandtotal * 1000)/1000).toFixed(3)});
                      });
                  // }
                } 
                this.status = false;
                forkJoin(
                  this.DropDownListService.getPurGoodRcptDtls(data["grn_id"]),
                  this.DropDownListService.getPurGoodRcptBrokerList(data["grn_id"]),
                  this.DropDownListService.getPurGoodRcptDocList(data["grn_id"]),
                  this.DropDownListService.grnTransInfoRetriveList(data["grn_id"]),
                  this.DropDownListService.grnOtherInfoRetriveList(data["grn_id"]),
                ).subscribe(([grnData, brokerData, docData, transData, otherInfoData])=>
                  {
                   // console.log("else data under for:"+JSON.stringify(grnData))
                    this.userForm.patchValue({remarks: grnData['remarks'],purreturnrefno:grnData['grn_no']})
                    this.pur_return_approval_trans_info.patchValue({transborneby: transData['trans_borne_by'],
                    modeoftrans: transData['mode_of_trans'], transcode: transData['transporter_code'], vehicleno: grnData['vehicle_id']})
                    
                  //  console.log("otherInfoData: "+JSON.stringify(otherInfoData));
                    this.pur_return_approval_weight_dtl.patchValue({partyuom: otherInfoData['pty_gross_uom'], 
                    partygross: otherInfoData['pty_gross_wt'], partytare: otherInfoData['pty_tare_wt'],
                    partynet: otherInfoData['pty_net_wt'], partydate: otherInfoData['pty_weigh_date'], partyslipno: otherInfoData['pty_weigh_slip_no']})

                    let i = 0;
                    this.addBroker();
                    this.broker_sl_no = 0;
                    while(this.pur_return_approval_broker_dtls.length)
                    this.pur_return_approval_broker_dtls.removeAt(0);
                    for(let data1 of brokerData)
                    {
                      this.addBroker();
                      this.pur_return_approval_broker_dtls.at(i).patchValue({brokercode: data1['ven_code_name'],
                      basis: data1['basis'], rate: data1['rate']});
                      i = i + 1;
                    }

                    let j = 0;
                    this.addDocument();
                    while(this.pur_return_approval_docs.length)
                    this.pur_return_approval_docs.removeAt(0)
                    for(let data1 of docData)
                    {
                      this.addDocument();
                      this.pur_return_approval_docs.at(j).patchValue({docname: data1['doc_name']});
                      j = j + 1;
                    }

                   // console.log("grn reference id: "+grnData['referance_id']+",  grn ref type: "+grnData['referance_type'])
                    if(grnData['referance_id'] != "0" && grnData['referance_type'] == 'Unload Advice')
                    {
                      this.status = false;
                      this.DropDownListService.getUnloadDetails(grnData['referance_id']).subscribe(unloadData=>
                      {
                        this.DropDownListService.getUnloadWeightmentWt(unloadData["weighment_id"]).subscribe(weigmtData=>
                        {
                        //  console.log("unload reference id: "+unloadData['referance_id']+",  unload ref type: "+unloadData['ref_type'])
                         // console.log("weigmtData: "+JSON.stringify(weigmtData)+" unloadData: "+JSON.stringify(unloadData));
                          this.pur_return_approval_weight_dtl.patchValue({owngross: weigmtData["gross_weight"], ownuom: weigmtData["gw_unit"],
                          owndate: weigmtData["gw_date"], ownnet: (Math.round( weigmtData["net_weight"] * 100) / 100).toFixed(3), 
                          owntare: weigmtData["tare_weight"]});
                          this.status = true;
                        })
                        if(unloadData['ref_type'] == 'Purchase Order' && unloadData['referance_id'] != "0")
                        {
                          this.status = false;
                          this.DropDownListService.getPurOrdDetails(unloadData['referance_id']).subscribe(purOrderData=>
                          {
                            //console.log("ship dtls: "+JSON.stringify(purOrderData))
                            
                            this.pur_return_approval_shipment_dtls.patchValue({shipaddr:this.userForm.get("supplier").value, 
                              shipdetails: purOrderData['ship_to_addr'], payaddr: purOrderData['pay_to_addr_id'], paydetails: purOrderData['pay_to_addr']});
                            this.status = true;
                          })
                        }
                      })
                    }
                  
                  });
              }

            }

          });
        }
      }else{alert("Select  Business Unit, reference date and supplier!...")}
    }

    send()
    {
      this.Id= this.userForm.get("id").value as FormControl;
      this.userForm.patchValue({
        company_id: localStorage.getItem("company_name"), fin_year: localStorage.getItem("financial_year"),
        username: localStorage.getItem("username")});
      this.submitted = true;
      if(!this.userForm.valid)
      {
      alert('Please fill all fields!')
      return false;
      } 
      else
      { 
        this.status = false;
        if(this.userForm.get("purreturntype").value == '' || this.userForm.get("purreturntype").value == null || this.userForm.get("purreturntype").value == 0)
        {
          alert("Please Select Purchase Return Type");
          this.status=true;
        }
        else if(this.userForm.get("purreturnno").value == '' || this.userForm.get("purreturnno").value == null || this.userForm.get("purreturnno").value == 0)
        {
          alert("Please Enter Purchase Return No");
          this.status=true;
        }
        else if(this.userForm.get("businessunit").value == '' || this.userForm.get("businessunit").value == null || this.userForm.get("businessunit").value == 0)
        {
          alert("Please Select Bussiness Unit");
          this.status=true;
        }
        else if(this.userForm.get("supplier").value == '' || this.userForm.get("supplier").value == null || this.userForm.get("supplier").value == 0)
        {
          alert("Please Select Supplier");
          this.status=true;
        }
        else if(this.userForm.get("returncriteria").value == '' || this.userForm.get("returncriteria").value == null || this.userForm.get("returncriteria").value == 0)
        {
          alert("Please Select Return Criteria");
          this.status=true;
        }
        else if(this.userForm.get("returnbasedon").value == '' || this.userForm.get("returnbasedon").value == null || this.userForm.get("returnbasedon").value == 0)
        {
          alert("Please Select Return Based On");
          this.status=true;
        }
        else if(this.userForm.get("ser_item_subtype").value == '' || this.userForm.get("ser_item_subtype").value == null || this.userForm.get("ser_item_subtype").value == 0)
        {
          alert("Please Select Purchase Type");
          this.status=true;
        }
        else if(this.userForm.get("purchase_subtype").value == '' || this.userForm.get("purchase_subtype").value == null || this.userForm.get("purchase_subtype").value == 0)
        {
          alert("Please Select Purchase Sub Type");
          this.status=true;
        }
        else if(this.userForm.get("purreturnrefno").value == '' || this.userForm.get("purreturnrefno").value == null || this.userForm.get("purreturnrefno").value == 0)
        {
          alert("Please Enter Reference No.");
          this.status=true;
        }
        else
        {
          let itemcheck = false;
          let packingcheck = false;
          let packingqtycheck = false;
          let itemqtycheck = false;
          let pricebasedonCheck = false;
          let brokernamecheck = false;
          let partynamecheck = false;

          for(let k=0;k<this.pur_return_approval_item_dtls.length;k++)
          {
            if(this.pur_return_approval_item_dtls.at(k).get("itemcode").value=='' || this.pur_return_approval_item_dtls.at(k).get("itemcode").value==null || this.pur_return_approval_item_dtls.at(k).get("itemcode").value==0)
            {
              itemcheck = true;
            }
            if(this.pur_return_approval_item_dtls.at(k).get("packing").value=='' || this.pur_return_approval_item_dtls.at(k).get("packing").value==null || this.pur_return_approval_item_dtls.at(k).get("packing").value==0)
            {
              packingcheck = true;
            }
            if(this.pur_return_approval_item_dtls.at(k).get("squantity").value=='' || this.pur_return_approval_item_dtls.at(k).get("squantity").value==null || this.pur_return_approval_item_dtls.at(k).get("squantity").value==0)
            {
              packingqtycheck = true;
            }
            if(this.pur_return_approval_item_dtls.at(k).get("quantity").value=='' || this.pur_return_approval_item_dtls.at(k).get("quantity").value==null || this.pur_return_approval_item_dtls.at(k).get("quantity").value==0)
            {
              itemqtycheck = true;
            }
            if(this.pur_return_approval_item_dtls.at(k).get("pricebasedon").value=='' || this.pur_return_approval_item_dtls.at(k).get("pricebasedon").value==null || this.pur_return_approval_item_dtls.at(k).get("pricebasedon").value==0)
            {
              pricebasedonCheck = true;
            }
          }
           for(let e=0;e<this.pur_return_approval_broker_dtls.length;e++)
           {
             if(this.pur_return_approval_broker_dtls.at(e).get("brokercode").value=='' || this.pur_return_approval_broker_dtls.at(e).get("brokercode").value==null ||this.pur_return_approval_broker_dtls.at(e).get("brokercode").value==0)
             {
               brokernamecheck=true;
             }
           }
           for(let s=0;s<this.pur_return_approval_supplier_dtls.length;s++)
           {
             if(this.pur_return_approval_supplier_dtls.at(s).get("spcode").value=='' || this.pur_return_approval_supplier_dtls.at(s).get("spcode").value==null || this.pur_return_approval_supplier_dtls.at(s).get("spcode").value==0)
             {
               partynamecheck=true;
             }
           }
          
          if(itemcheck == true)
          {
            alert("Please Enter Item Name in Item Details Tab");
            this.status=true;
          }
          else if(packingcheck == true)
          {
            alert("Please Select Packing Name in Item Details Tab");
            this.status=true;
          }
          else if(packingqtycheck == true)
          {
            alert("Please Please Enter PACKING QTY. in Item Details Tab");
            this.status=true;
          }
          else if(itemqtycheck == true)
          {
            alert("Please Please Enter ITEM QTY. in Item Details Tab");
            this.status=true;
          }
          else if(pricebasedonCheck == true)
          {
            alert("Please Please Enter PRICE BASED ON in Item Details Tab");
            this.status=true;
          }
           else if(brokernamecheck == true)
           {
             alert("Please Select BROKER NAME in Broker Details Tab!!!");this.status = true;
           }
           else if(partynamecheck == true)
           {
             alert("Please Select Party Name in Party Details Tab!!!");this.status = true;
           }
          else if(this.userForm.get("confirmedby").value == '' || this.userForm.get("confirmedby").value == null || this.userForm.get("confirmedby").value == 0)
          {
            alert("Please Select Confirmed By in APPROVAL Tab");
            this.status=true;
          }
          else if(this.userForm.get("approval").value == '' || this.userForm.get("approval").value == null || this.userForm.get("approval").value == 0)
          {
            alert("Please Select Approved in APPROVAL Tab");
            this.status=true;
          }
          else if(this.userForm.get("reason").value == '' || this.userForm.get("reason").value == null || this.userForm.get("reason").value == 0)
          {
            alert("Please Select Reason in APPROVAL Tab");
            this.status=true;
          }
          else{
            if(this.Id>0)
            {  
              console.log("userform: "+JSON.stringify(this.userForm.value));
              this.Service.updatePurReturnAppNote(this.userForm.getRawValue(), this.Id).subscribe(data => 
              {
                alert("Purchase Return Approval Note Updated Successfully.");
                this.userForm.reset();
                this.ngOnInit();            
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
              this.ngOnInit()});     
            }
          else  
            { 
              console.log("userform: "+JSON.stringify(this.userForm.value));
              this.Service.createPurReturnAppNote(this.userForm.getRawValue()).subscribe(data => 
              {
                alert("New Purchase Return Approval Note Created Successfully.");
                this.userForm.reset();
                this.ngOnInit();            
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
              this.ngOnInit()});    
            }
          }
        }
        
      }  
    }

    onUpdate(id:any,purreturnid:string,action)
    {
      if(action == 'view')
      {
        this.purreturnapprovesave=false;
      }
      else
      {this.purreturnapprovesave=true;}
      
       this.userForm.patchValue({id: id});
       this.status = false;
       this.isHidden = true;
       this.packingItem = [];
       this.selectedItemName = [];
       this.selectedPackingItem = [];
       this.item_codes = [];
      forkJoin(
        this.Service.retrivePurReturnApprovalNote(id),
        this.Service.getPurReturnApprovalID(purreturnid),      
        this.Service.getPurReturnApprovalTI(purreturnid),
        this.Service.getPurReturnApprovalSuppD(purreturnid),
        this.Service.getPurReturnApprovalD(purreturnid),
        this.Service.getPurReturnApprovalWD(purreturnid),
        this.Service.getPurReturnApprovalSD(purreturnid),
        this.Service.getPurReturnApprovalBD(purreturnid),
      ).subscribe(([ReturnApprovalData, itemData, transData,
        supplierData, docData, weightData, shipmentData, brokerData])=>
        {
          this.onChangeServicesItemSubType1(ReturnApprovalData["ser_item_subtype"],)
         //this.onChangeBusinessUnit1(ReturnApprovalData["businessunit"]);
         this.onChangeBusinessUnit(ReturnApprovalData["businessunit"]);
         this.onChangeReturnCriteria1(ReturnApprovalData["returnbasedon"]);
         this.onChangeSupplierName(ReturnApprovalData["supplier"]);
         this.onChangePurReturnType(ReturnApprovalData["purreturntype"]);
         this.returnbaseOn = ReturnApprovalData['returnbasedon'];
           this.userForm.patchValue({id: ReturnApprovalData["id"],purreturnid: ReturnApprovalData["purreturnid"], inv_type: ReturnApprovalData["inv_type"],
           purreturntype: ReturnApprovalData["purreturntype"],purreturnno: ReturnApprovalData["purreturnno"], suppliername: ReturnApprovalData["suppliername"], supplier:ReturnApprovalData["supplier"],
           purreturndate: ReturnApprovalData["purreturndate"],businessunit: ReturnApprovalData["businessunit"], returncriteria: ReturnApprovalData["returncriteria"],  purreturnrefno:ReturnApprovalData["purreturnrefno"],
           returnbasedon: ReturnApprovalData["returnbasedon"],salesreturnrefno: ReturnApprovalData["salesreturnrefno"], remark: ReturnApprovalData["remark"],ser_item_subtype:ReturnApprovalData["ser_item_subtype"],
           confirmedby: ReturnApprovalData["confirmedby"],approval: ReturnApprovalData["approval"], reason: ReturnApprovalData["reason"], referance_id: ReturnApprovalData["referance_id"], 
           grandtotal: ReturnApprovalData["grandtotal"],company_id: ReturnApprovalData["company_id"], fin_year: ReturnApprovalData["fin_year"],username: ReturnApprovalData["username"] });
             console.log("ReturnApprovalData Details: "+  JSON.stringify(ReturnApprovalData));
 
            console.log("itemData Details: "+  JSON.stringify(itemData));
            let k = 0;
            this.addItem();
            this.item_sl_no = 0;
            while (this.pur_return_approval_item_dtls.length) 
            this.pur_return_approval_item_dtls.removeAt(0);
            for(let data1 of itemData)
            { 
              this.status = false;
              this.addItem();
              forkJoin(
                this.DropDownListService.getItemMasterPackMat(data1["itemcode"]),
                this.DropDownListService.getItemPackUom(data1["itemcode"], data1["packing"],this.company_id)
              ).subscribe(([packingList, capacityEmptyWt])=>
                {
                   this.capacity[k] = capacityEmptyWt.capacity;
                   this.empty_bag_wt[k] =  capacityEmptyWt.empty_big_wt;
                   this.selectedPackingItem[k] = data1["packing"];
                   this.item_codes[k] = data1["itemcode"];
                   this.packingItem[k] = packingList; 
                   this.pur_return_approval_item_dtls.at(k).patchValue(data1);
                   k = k + 1;
                   this.status = true;
                });
             }
 
             console.log("transData: "+  JSON.stringify(transData));
             this.pur_return_approval_trans_info.patchValue(transData);
 
             console.log("SupplierData: "+JSON.stringify(supplierData));
             this.addSupplier();
             this.supplier_sl_no = 0;
             while (this.pur_return_approval_supplier_dtls.length) 
             this.pur_return_approval_supplier_dtls.removeAt(0);
            this.addSupplier();
            this.selectedSupplierName[0] = supplierData["spcode"];
            this.selectedContName[0] = supplierData["spname"];
            this.pur_return_approval_supplier_dtls.at(0).patchValue(supplierData);
              
            this.addDocument();
            while (this.pur_return_approval_docs.length)
            this.pur_return_approval_docs.removeAt(0);
            for(let data1 of docData)
            this.addDocument();
            this.pur_return_approval_docs.patchValue(docData);
            console.log("docData: "+JSON.stringify(docData));
    
            console.log("weightData: "+  JSON.stringify(weightData));
            this.pur_return_approval_weight_dtl.patchValue(weightData);

            this.pur_return_approval_shipment_dtls.patchValue({shipdetails: shipmentData["shipdetails"],
            shipaddr: shipmentData["shipaddr"],payaddr: shipmentData["payaddr"],paydetails: shipmentData["paydetails"],});
            console.log("shipment Details: "+  JSON.stringify(shipmentData));
           
            this.addBroker();
            while (this.pur_return_approval_broker_dtls.length)
            this.pur_return_approval_broker_dtls.removeAt(0);
            for(let data1 of brokerData)
            this.addBroker();
            this.pur_return_approval_broker_dtls.patchValue(brokerData);
            console.log("brokerData: "+JSON.stringify(brokerData));
 
            this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});                                
        } 

        packing_qty:any;
        item_qty:any;
        matweight:any;
        pricebase:any;
        price:any;
        amt:any;
        dis:any;
        distype:any;
        disamt:any;
        tax_rate:any;
        tax_amt:any;
        tot_amt:any;
        net_amt:any;
        qc_ded:any;
        net_amt_qc:any;
        grs_amt:any;

       getReturnItemQty(itemprice, index)
        {
          this.price=itemprice.target.value;
          this.packing_qty = this.pur_return_approval_item_dtls.at(index).get("squantity").value as FormControl;
          this.item_qty=this.pur_return_approval_item_dtls.at(index).get("quantity").value as FormControl;
          this.matweight=this.pur_return_approval_item_dtls.at(index).get("matwt").value as FormControl;
          this.pricebase=this.pur_return_approval_item_dtls.at(index).get("pricebasedon").value as FormControl;          
          this.amt=this.pur_return_approval_item_dtls.at(index).get("amount").value as FormControl;
          this.dis=this.pur_return_approval_item_dtls.at(index).get("discountrate").value as FormControl;
          this.distype=this.pur_return_approval_item_dtls.at(index).get("discounttype").value as FormControl;
          this.disamt=this.pur_return_approval_item_dtls.at(index).get("discountamt").value as FormControl;
          this.tax_rate=this.pur_return_approval_item_dtls.at(index).get("taxrate").value as FormControl;
          this.tax_amt=this.pur_return_approval_item_dtls.at(index).get("taxamt").value as FormControl;
          this.tot_amt=this.pur_return_approval_item_dtls.at(index).get("totalamt").value as FormControl;
          this.net_amt=this.pur_return_approval_item_dtls.at(index).get("net_amount").value as FormControl;
          this.qc_ded=this.pur_return_approval_item_dtls.at(index).get("qc_deduction").value as FormControl;
          this.net_amt_qc=this.pur_return_approval_item_dtls.at(index).get("net_amt_after_qc").value as FormControl;
          this.grs_amt=this.pur_return_approval_item_dtls.at(index).get("gross_amt").value as FormControl;

          this.calculateItemData(index,this.packing_qty,this.item_qty,this.matweight,this.pricebase,this.price,this.dis,this.distype,this.disamt,this.tax_rate,this.qc_ded)
         
        }


       



        
       _item_qty:any;
      _empty_bag_wt:any = [];
      packingid:any;
      itemid:any;
    getPackQty(packingqty,index)
    {
     // window.alert(index);
      this.itemid=this.pur_return_approval_item_dtls.at(index).get("itemcode").value as FormControl;
      this.packingid=this.pur_return_approval_item_dtls.at(index).get("packing").value as FormControl;
        
        this.DropDownListService.getItemPackUom(this.itemid, this.packingid,this.company_id).subscribe(data=>
        {  
          this.capacity[index] = data.capacity;
         
          this._empty_bag_wt[index] =  data.empty_big_wt;
         // window.alert(this.capacity[index]);
          
          
          this._item_qty = this.capacity[index] *  packingqty.target.value;
         // window.alert( this._item_qty);
          this.pur_return_approval_item_dtls.at(index).patchValue({quantity:this._item_qty, matwt:(this.capacity[index] *  packingqty.target.value - this._empty_bag_wt[index]).toFixed(3)});
           
          this.packing_qty=packingqty.target.value;
          this.item_qty = this._item_qty
          this.matweight = (this.capacity[index] *  packingqty.target.value - this._empty_bag_wt[index]).toFixed(3)
          this.pricebase=this.pur_return_approval_item_dtls.at(index).get("pricebasedon").value as FormControl;
          this.price=this.pur_return_approval_item_dtls.at(index).get("price").value as FormControl;

          this.dis= this.pur_return_approval_item_dtls.at(index).get("discountrate").value as FormControl;
          this.distype = this.pur_return_approval_item_dtls.at(index).get("discounttype").value as FormControl;
          this.disamt = this.pur_return_approval_item_dtls.at(index).get("discountamt").value as FormControl;
          this.tax_rate = this.pur_return_approval_item_dtls.at(index).get("taxrate").value as FormControl;
          this.qc_ded = this.pur_return_approval_item_dtls.at(index).get("qc_deduction").value as FormControl;
          
         

         // window.alert(this.calculateItemData(index,this.packing_qty,this.item_qty,this.matweight,this.pricebase,this.price,this.dis,this.distype,this.disamt,this.tax_rate,this.qc_ded));
         this.calculateItemData(index,this.packing_qty,this.item_qty,this.matweight,this.pricebase,this.price,this.dis,this.distype,this.disamt,this.tax_rate,this.qc_ded)
          //  this.calculateItemData(this._packing_qty, this._item_qty, this._Indicative_price, this._priceBasedOn, this._taxrate, index)
         // this.status = true;
        });  
        
        
        
      
    }

    _amt:any;
    _tax_amt:any;
    _tomt:any;
    _netamt:any;
    _ntamtaftrqc:any;
    _grsamt:any;
    _disamt:any;
    _size: number;
    _grand:any;
    calculateItemData(index,packingqty,itemqty,matweit,pricebase,price,dis,distype,disamt,tax_rate,qc_ded)
    {

     

     this._size=this.pur_return_approval_item_dtls.controls.length;

    

          if(pricebase=="Packing")
          {
              this._amt=(price*packingqty).toFixed(2);
              //window.alert(price+" * "+packingqty+" = "+this._amt);
                      if(distype=="%")
                      {
                        this._disamt=((dis/100)*this._amt).toFixed(2);
                      }
                      else if(distype=="Uom")
                      {
                        this._disamt=disamt;
                      }
                      else
                      {
                        this._disamt=0;
                      }

              this._tax_amt=(tax_rate/100*(this._amt-this._disamt)).toFixed(2);
              this._tomt = (((this._amt/100)*100)+((this._tax_amt/100)*100)).toFixed(2);
              this._netamt=((this._amt/100)*100).toFixed(2);
              this._ntamtaftrqc=(this._netamt - (qc_ded/100*100)).toFixed(2);
              this._grsamt= (((this._ntamtaftrqc/100)*100) + ((this._tax_amt/100)*100)).toFixed(2);

            
              

             // window.alert(this._amt+" - "+disamt+ " * "+tax_rate+" / 100 +"+this._tax_amt+" = "+this._tomt );
          }
          else if(pricebase=="With Packing")
          {


                                this._amt=(price*itemqty).toFixed(2);

                                if(distype=="%")
                                {
                                  this._disamt=((dis/100)*this._amt).toFixed(2);
                                }
                                else if(distype=="Uom")
                                {
                                  this._disamt=disamt;
                                }
                                else
                                {
                                  this._disamt=0;
                                }

                        this._tax_amt=(tax_rate/100*(this._amt-this._disamt)).toFixed(2);
                        this._tomt = (((this._amt/100)*100)+((this._tax_amt/100)*100)).toFixed(2);
                        this._netamt=((this._amt/100)*100).toFixed(2);
                        this._ntamtaftrqc=(this._netamt - (qc_ded/100*100)).toFixed(2);
                        this._grsamt= (((this._ntamtaftrqc/100)*100) + ((this._tax_amt/100)*100)).toFixed(2);


          }
          else if(pricebase=="Without Packing")
          {

                            this._amt=(price*matweit).toFixed(2);

                            if(distype=="%")
                            {
                              this._disamt=((dis/100)*this._amt).toFixed(2);
                            }
                            else if(distype=="Uom")
                            {
                              this._disamt=disamt;
                            }
                            else
                            {
                              this._disamt=0;
                            }

                    this._tax_amt=(tax_rate/100*(this._amt-this._disamt)).toFixed(2);
                    this._tomt = (((this._amt/100)*100)+((this._tax_amt/100)*100)).toFixed(2);
                    this._netamt=((this._amt/100)*100).toFixed(2);
                    this._ntamtaftrqc=(this._netamt - (qc_ded/100*100)).toFixed(2);
                    this._grsamt= (((this._ntamtaftrqc/100)*100) + ((this._tax_amt/100)*100)).toFixed(2);




          }
          else
          {
              window.alert("check price based on");
          }

         

          this.pur_return_approval_item_dtls.at(index).patchValue({amount:this._amt,discountamt:this._disamt,taxamt:this._tax_amt,totalamt:this._tomt,net_amount:this._netamt,net_amt_after_qc:this._ntamtaftrqc,gross_amt:this._grsamt});

          let sum: number = 0;
         
          
          for (let i = 0; i < this._size; i++) {

           

            this._grand=this.pur_return_approval_item_dtls.at(i).get("totalamt").value as FormControl;
            
            sum=sum+((this._grand*100)/100);
            
          }
          
          this.userForm.patchValue({grandtotal:sum.toFixed(2)});


    }

}
