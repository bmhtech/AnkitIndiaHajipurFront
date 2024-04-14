import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Master } from '../../../../../../service/master.service';
import { formatDate } from '@angular/common';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { PurReturnNote} from '../../../../../../models/transaction/PurchaseTransaction/pur-return-note';
import { PurReturnApprovalNotePopUpComponent } from '../pur-return-approval-note-pop-up/pur-return-approval-note-pop-up.component';
import { QcNormPopUpModalComponent } from '../qc-norm-pop-up-modal/qc-norm-pop-up-modal.component';

  @Component({
    selector: 'app-pur-return-note',
    templateUrl: './pur-return-note.component.html',
    styleUrls: ['./pur-return-note.component.scss']})
    
  export class PurReturnNoteComponent implements OnInit 
  {
    status:any;
    isHidden:any;
    submitted = false;
    public userForm:FormGroup;
    item_sl_no = 1; 
    broker_sl_no = 1;
    Id:any
    supplier_sl_no = 1;
    model: PurReturnNote = new PurReturnNote();
    listPurReturnNote: PurReturnNote[];
    item_types:{};
    bussinessUnitList:any = [];
    customList:any = [];
    brokerNameList:any = [];
    supplierList:any = [];
    suppContactList:any = [];
    payToDFrom:any = [];
    transporterNames:any = [];
    modeOfTransport:any = [];
    vehicleList:any = [];
    employeeNames:any = [];
    reasonList:any = [];
    approve:any = [];
    packingItem:any = [];
    capacity:any = [];
    empty_bag_wt:any = [];
    item_codes:any = [];
    itemtypes:any = [];
    currentDate:any;
    company_id:any;
    financialYear:any;
    _businessunit:any;
    _supplier:any;
    PurReturnNoteNo:any;
    serItemType:any;
    serItemSubType:any;
    _grandtotal:number;
    purreturnnotesave:boolean = true;
    purreturnnoteupdate:boolean = true;

    constructor(public fb:FormBuilder, public dialog: MatDialog,
      private Service : Master,private DropDownListService: DropdownServiceService)
      {
        this.userForm=fb.group(
        {
          id : [''],
          purreturnnoteid: [''],
          purreturnnoteno:[''],
          supplierid:[''], 
          suppliername:[''],     
          purreturnnotedate :[''],
          businessunit:[''],
          businessunitname:[''],
          cust_ref_doc_no:[''],
          date2:[''],
          purreturnnoterefno:[''],
          remark:[''],   
          confirmedby:[''],
          approval:[''],
          reason :[''],
          grandtotal:[''],
          company_id: [''],
          fin_year: [''],
          username: [''],
          referance_id: [''],
  
          pur_return_note_item_dtls: this.fb.array([this.fb.group({
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
            net_amount:'',	
            qc_deduction :'',
            net_amt_after_qc :'',
            gross_amt:'',
            accnorms:''})]),
  
          pur_return_note_broker_dtls: this.fb.array([this.fb.group({
            slno:this.broker_sl_no,
            brokercode:'',
            basis:'',
            rate:''})]),
  
          pur_return_note_supplier_dtls:this.fb.array([this.fb.group({
            slno : this.supplier_sl_no, 
            spcode:'',
            spname:'',
            spcontact:''})]),
  
          pur_return_note_docs:this.fb.array([this.fb.group({
            docname:''})]),
  
          pur_return_note_shipment_dtls:this.fb.group({
            shipaddr:'',
            shipdetails:'',
            payaddr:'',
            paydetails:'' }),
  
          pur_return_note_trans_info:this.fb.group({
            transborneby:'',
            modeoftrans:'',
            vehicleno:'',
            freightamt:'',
            advpaid:'',
            chargecode:'',
            transcode:''}),
  
          pur_return_note_weight_dtl:this.fb.group({
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
    get purreturnnoteid() {return this.userForm.get("purreturnnoteid") as FormControl};    
    get purreturnnoteno() {return this.userForm.get("purreturnnoteno") as FormControl};
    get supplierid() {return this.userForm.get("supplierid") as FormControl};
    get suppliername() {return this.userForm.get("suppliername") as FormControl};
    get purreturnnotedate(){return this.userForm.get("purreturnnotedate") as FormControl};
    get businessunit(){return this.userForm.get("businessunit") as FormControl};
    get businessunitname(){return this.userForm.get("businessunitname") as FormControl};
    get cust_ref_doc_no(){return this.userForm.get("cust_ref_doc_no") as FormControl};
    get date2(){return this.userForm.get("date2") as FormControl};
    get purreturnnoterefno(){return this.userForm.get("purreturnnoterefno") as FormControl};
    get remark(){return this.userForm.get("remark") as FormControl};
    get confirmedby(){return this.userForm.get("confirmedby") as FormControl};
    get approval(){return this.userForm.get("approval") as FormControl};
    get reason(){return this.userForm.get("reason") as FormControl};
    get grandtotal(){return this.userForm.get("grandtotal") as FormControl};
    get pur_return_note_item_dtls(){return this.userForm.get("pur_return_note_item_dtls") as FormArray};
    get pur_return_note_broker_dtls(){return this.userForm.get("pur_return_note_broker_dtls") as FormArray};
    get pur_return_note_supplier_dtls(){return this.userForm.get("pur_return_note_supplier_dtls") as FormArray};
    get pur_return_note_shipment_dtls(){return this.userForm.get("pur_return_note_shipment_dtls") as FormGroup};
    get pur_return_note_trans_info(){return this.userForm.get("pur_return_note_trans_info") as FormGroup};
    get pur_return_note_weight_dtl(){return this.userForm.get("pur_return_note_weight_dtl") as FormGroup};
    get pur_return_note_docs(){return this.userForm.get("pur_return_note_docs") as FormArray};

    company_name:any;
    ngOnInit() 
    {
      //For User Role
    let user_role=localStorage.getItem("user_role")+"tuhinabcd"+"purchase_inventory";
    this.DropDownListService.getRoleItemMaster(user_role).subscribe(data=>{
    let accessdata=JSON.stringify(data);
    this.purreturnnotesave=false;
    this.purreturnnoteupdate=false;
    if(accessdata.includes('purchase_return_note.save'))
    {
     this.purreturnnotesave = true;
    }
   if(accessdata.includes('purchase_return_note.update'))
    { 
      this.purreturnnoteupdate=true;
    }
    
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
    
      this.status = false;
      this.isHidden = false;
      this._businessunit = "0";
      this._supplier = "0";
      this.serItemType = "0";
      this.serItemSubType = "0"
      this._grandtotal = 0;
      this.brokerNameList = [];
      this.supplierList = [];
      this.suppContactList = [];
      this.payToDFrom = [];
      this.transporterNames = [];
      this.packingItem = [];
      this.capacity = [];
      this.empty_bag_wt  = [];
      this.item_codes = [];
      this.DropDownListService.getAllItems().subscribe(data=>
            {
              this.item_codes = data;
              this.status = true;
            })
      //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      if((this.currentDate>=formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en'))  && (this.currentDate<=formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en')))
      {
        
      }
     else
     {
       alert("Selected  date is not in Selected Financial period!!!!!!")
       this.currentDate=formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
     }

      this.financialYear = localStorage.getItem("financial_year");
      this.company_id = localStorage.getItem("company_name");
      this.item_types=["MATERIAL","SERVICE"];
      this.modeOfTransport=["BY AIR","BY ROAD","BY SHIP","BY TRAIN","N/A"];
      this.approve=["NO","PENDING","YES"];
      this.userForm.patchValue({referance_id: "0", id: 0});
      forkJoin(
        this.DropDownListService.getCompanyBUMNCList(this.company_id),
        this.DropDownListService.getVehicleNameCode(),
        this.DropDownListService.getWeighmentCustomUOM(),
        this.DropDownListService.employeeNamesList(this.company_id),
        this.DropDownListService.getPurTermReasons(),
  //this.DropDownListService.itemTypeList(this.company_id),
        this.Service.getPurReturnNote(this.company_id, this.financialYear)
      ).subscribe(([BUMNCData, vehicleData, customUomData, employeeData,
          reasonData, purReturnNoteData])=>
        {
          this.bussinessUnitList  = BUMNCData;
          this.vehicleList  = vehicleData;
          this.customList = customUomData;
          this.employeeNames = employeeData;
          this.reasonList = reasonData;
          //this.itemtypes  = itemTypedata;
          this.listPurReturnNote = purReturnNoteData;
          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});    
    }

    getSeqId(currentDate)
    {
      if(this.currentDate != '0' )
      {
        this.status = false;
        this.DropDownListService.getPRNSequenceId(this.currentDate).subscribe(data=>
        {
          this.PurReturnNoteNo = data.sequenceid;
          this.status = true;
        }); 
      }
    }

    // onChangeServicesItemType(event, operation)
    // {
    //   this.serItemType = event;
    //   this.getSeqId(this.serItemType, this.serItemSubType, operation);
    // }

    // onChangeServicesItemSubType(event, operation)
    // {
    //   this.serItemSubType = event;
    //   if(event != '0')
    //   {
    //     this.status = false;
    //     this.packingItem = [];
    //     this.capacity = [];
    //     this.empty_bag_wt = [];
    //     this.DropDownListService.getItemThruType(event).subscribe(data=>
    //     {
    //       this.item_codes = data;
    //       this.status = true;
    //     })
    //     this.getSeqId(this.serItemType, this.serItemSubType, operation);
    //   }
    // }

    onChangeDate(event)
    {
      this.currentDate = event;
      if((this.currentDate>=formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en'))  && (this.currentDate<=formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en')))
      {
        this.getSeqId(this.currentDate);
      }
     else
     {
       alert("Selected  date is not in Selected Financial period!!!!!!")
       this.currentDate=formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
     }
      
    }

    onChangeBusinessUnit(event)
    {
      this._businessunit = event;
      this.brokerNameList = [];
      if(event.length && event != "0")
      {
        this.status = false;
        this.DropDownListService.getSupplierThruBU(event).subscribe(data=>
        {
          this.supplierList = data;
          this.status = true;
        });
      }
    }

    onChangeBrokerName(index, event)
    {
      if(event != "0")
      {
        this.status = false;
        this.DropDownListService.getBrokerDetailsByBrokerCode(event).subscribe(data=>          
        {
          this.pur_return_note_broker_dtls.at(index).patchValue({basis: data[0].basis, rate: data[0].rate});
          this.status = true;
        });
      }  
    }

    onChangeSupplierName(suppid:string)
    {
      this._supplier = suppid;
      if(suppid.length && suppid != '0')
      {
        this.pur_return_note_supplier_dtls.at(0).patchValue({spcode: suppid})
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
                       // this.DropDownListService.getTransporterThruSupplier(suppid),
                     // ).subscribe(([brokerList, contactData, payToData, transData])=>
                        ).subscribe(([brokerList, contactData, payToData])=>
                        {
                          this.brokerNameList = brokerList;
                          this.suppContactList = contactData;
                          this.payToDFrom = payToData;
                         // this.transporterNames = transData;
                          this.status = true;
                        })


                
               }
              
          })


       


      }
    }

    onChangeContactName(event, index)
    {
      if(event != "0" && this._supplier != "0")
      {
        this.status = false;
        this.DropDownListService.getSupplierContDetails(this._supplier, event).subscribe(data=>
        {
          this.pur_return_note_supplier_dtls.at(index).patchValue({spcontact: data.mobile});
          this.status = true;
        })
      }
    }

    onChangePayToDForm(dForm: string)
    {
      this.pur_return_note_shipment_dtls.patchValue({paydetails: null});
      if(dForm != '0')
      {
        this.status = false;
        this.DropDownListService.getSuppDelvAddress(this._supplier, dForm).subscribe(data=>
        {
          this.pur_return_note_shipment_dtls.patchValue({paydetails: data["address"]+", "+data["city"]+", "+data["pincode"]});
          this.status = true;
        });
      }
    }

    onChangeShipToAddId(businessunit_code: String)
    {
      this.pur_return_note_shipment_dtls.patchValue({shipdetails: null});
      if(businessunit_code != '0')
      {
        this.status = false;
        this.DropDownListService.getCompanyBUAddress(businessunit_code).subscribe(data=>
        {
          this.pur_return_note_shipment_dtls.patchValue({shipdetails: data["add"]});
          this.status = true;
        });
      }
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
          this.pur_return_note_item_dtls.at(index).patchValue({itemname: itemNameData["item_name"]});
          this.packingItem[index] = packingItemData;
          this.DropDownListService.getUomName(itemNameData["mstock_unit"]).subscribe(data=>
          { 
            this.pur_return_note_item_dtls.at(index).patchValue({uom: data.description}); 
            this.status = true;
          });
        });
      }
    }

    onchangeItemName1(index, itemcode)
    {
      if(itemcode != '0')
      {
        this.status = false;
        forkJoin(
          this.DropDownListService.getItemNameById(itemcode,this.company_id),
          this.DropDownListService.getItemMasterPackMat(itemcode)
        ).subscribe(([itemNameData, packingItemData])=>
        {      
          this.pur_return_note_item_dtls.at(index).patchValue({itemname: itemNameData["item_name"]});
          this.packingItem[index] = packingItemData;
          this.DropDownListService.getUomName(itemNameData["mstock_unit"]).subscribe(data=>
          { 
            this.pur_return_note_item_dtls.at(index).patchValue({uom: data.description}); 
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
        this.itemId =  this.pur_return_note_item_dtls.at(index).get("itemcode").value as FormControl; 
        this.status = false;
        this.DropDownListService.getItemPackUom(this.itemId, event.target.value,this.company_id).subscribe(data=>
        {  
          this.capacity[index] = data.capacity; 
          this.empty_bag_wt[index] =  data.empty_big_wt;
          this.pur_return_note_item_dtls.at(index).patchValue({suom: data.uom1}); 
          this.status = true;
        }); 
      }
    }

    addItem()
    {
      this.item_sl_no =this.item_sl_no +1;
      this.pur_return_note_item_dtls.push(this.fb.group({
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
        }))  
    }

    deleteItem(index) 
    {
      if(this.item_sl_no > 1)
      { 
        this.pur_return_note_item_dtls.removeAt(index);
        this.item_sl_no = this.item_sl_no - 1;
      }
      else
      {
        this.item_sl_no = 1;
        alert("can't delete all rows");
        this.pur_return_note_item_dtls.reset();
        this.pur_return_note_item_dtls.at(0).patchValue({slno:  this.item_sl_no});
      } 
      
      for(let i=1; i<=this.item_sl_no; i++)
        this.pur_return_note_item_dtls.at(i-1).patchValue({slno: i});  
    }

    addBroker()
    {
      this.broker_sl_no=this.broker_sl_no+1;
      this.pur_return_note_broker_dtls.push(this.fb.group({
        slno:this.broker_sl_no,	
        brokercode:'',
        basis:'',
        rate:''}))
    }

    deleteBroker(index) 
    {
      if(this.broker_sl_no > 1)
      { 
        this.pur_return_note_broker_dtls.removeAt(index);
        this.broker_sl_no = this.broker_sl_no - 1;
      }
      else
      {
        this.broker_sl_no = 1;
        alert("can't delete all rows");
        this.pur_return_note_broker_dtls.reset();
        this.pur_return_note_broker_dtls.at(0).patchValue({slno:  this.broker_sl_no});
      } 
      
      for(let i=1; i<=this.broker_sl_no; i++)
        this.pur_return_note_broker_dtls.at(i-1).patchValue({slno: i});
      
    }

    addSupplier()
    {
      this.supplier_sl_no=this.supplier_sl_no+1;
      this.pur_return_note_supplier_dtls.push(this.fb.group({
        slno : this.supplier_sl_no,  
        spcode:'',
        spname:'',
        spcontact:'' }))
    }

    deleteSupplier(index) 
    {
      if(this.supplier_sl_no > 1)
      { 
        this.pur_return_note_supplier_dtls.removeAt(index);
        this.supplier_sl_no = this.supplier_sl_no - 1;
      }
      else
      {
        this.supplier_sl_no = 1;
        alert("can't delete all rows");
        this.pur_return_note_supplier_dtls.reset();
        this.pur_return_note_supplier_dtls.at(0).patchValue({slno:  this.supplier_sl_no});
      }     
      for(let i=1; i<=this.supplier_sl_no; i++)
        this.pur_return_note_supplier_dtls.at(i-1).patchValue({slno: i});   
    }

    addDocument()
    {
      this.pur_return_note_docs.push(this.fb.group({
        docname:''}))
    }

    deleteDocument(index)
    {
      if(index)
      { this.pur_return_note_docs.removeAt(index);}
      else
      {
        alert("Can not delete all rows");
        this.pur_return_note_docs.reset();
      } 
    }

    showList(s:string)
    {
      if(this.purreturnnotesave == true  && this.purreturnnoteupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
          this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
          this.status = false;
          this.DropDownListService.getPRNSequenceId(this.currentDate).subscribe(data=>
          {
            this.PurReturnNoteNo = data.sequenceid;
            this.status = true;
          }); 
          this.isHidden=true;
          this.userForm.reset(this.ResetAllValues().value);
        }
      }
      if(this.purreturnnotesave == true  && this.purreturnnoteupdate == false)
      {
        if(s=="add")
        {
          //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
          this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
          this.status = false;
          this.DropDownListService.getPRNSequenceId(this.currentDate).subscribe(data=>
          {
            this.PurReturnNoteNo = data.sequenceid;
            this.status = true;
          }); 
          this.isHidden=true;
          this.userForm.reset(this.ResetAllValues().value);
        }
      }
      
      if(s=="list")
      {
        this.isHidden=false;
        this.userForm.reset(this.ResetAllValues().value);
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
         id : [''],
          purreturnnoteid: [''],
          purreturnnoteno:[''],
          supplierid:[''], 
          suppliername:[''],     
          purreturnnotedate :[''],
          businessunit:[''],
          businessunitname:[''],
          cust_ref_doc_no:[''],
          date2:[''],
          purreturnnoterefno:[''],
          remark:[''],   
          confirmedby:[''],
          approval:[''],
          reason :[''],
          grandtotal:[''],
          company_id: [''],
          fin_year: [''],
          username: [''],
          referance_id: [''],
  
          pur_return_note_item_dtls: this.fb.array([this.fb.group({
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
            gross_amt:'',})]),
  
          pur_return_note_broker_dtls: this.fb.array([this.fb.group({
            slno:this.broker_sl_no,
            brokercode:'',
            basis:'',
            rate:''})]),
  
          pur_return_note_supplier_dtls:this.fb.array([this.fb.group({
            slno : this.supplier_sl_no, 
            spcode:'',
            spname:'',
            spcontact:''})]),
  
          pur_return_note_docs:this.fb.array([this.fb.group({
            docname:''})]),
  
          pur_return_note_shipment_dtls:this.fb.group({
            shipaddr:'',
            shipdetails:'',
            payaddr:'',
            paydetails:'' }),
  
          pur_return_note_trans_info:this.fb.group({
            transborneby:'',
            modeoftrans:'',
            vehicleno:'',
            freightamt:'',
            advpaid:'',
            chargecode:'',
            transcode:''}),
  
          pur_return_note_weight_dtl:this.fb.group({
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

    showPopUp2(index)
    {
      this.itemId = this.pur_return_note_item_dtls.at(index).get('itemcode').value as FormControl;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index, item_code: this.itemId};
      const dialogRef = this.dialog.open(QcNormPopUpModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => 
      { this.pur_return_note_item_dtls.at(index).patchValue({accnorms: data["qc_code"]});}); 
    }

    onClickShow()
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {b_unit: this._businessunit, supplier: this._supplier, item_type: this.serItemType, item_sub_type: this.serItemSubType,
        date: this.currentDate, company_id: this.company_id, fin_year: this.financialYear, file_name: 'Purchase Return Note'};
      if(this._businessunit != "0" && this._supplier != "0" )
      {
        const dialogRef = this.dialog.open(PurReturnApprovalNotePopUpComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => 
        {
          if(data != '' && data["purreturnid"] != "0")
          {
            this.DropDownListService.getAllItems().subscribe(data=>
              {
                this.item_codes = data;
                this.status = true;
              })

            this._grandtotal = 0;
            this.packingItem = [];
            let  j=0;
            this.userForm.patchValue({referance_id: data["purreturnid"]});
            this.addItem();
            this.item_sl_no = 0;
            while(this.pur_return_note_item_dtls.length)
            this.pur_return_note_item_dtls.removeAt(0); 

            for(let data1 of data.pur_return_approval_item_dtls)
            {
              if(data1.checkbox == true)
              {
                this.status = false;
                forkJoin(
                  this.DropDownListService.getItemPackUom(data1["itemcode"], data1["packing"],this.company_id),
                  this.DropDownListService.getItemMasterPackMat(data1["itemcode"]),
                ).subscribe(([packUomData, packingList])=>
                  {
                    this.status = true; 
                    this.onchangeItemName1(j,data1["itemcode"])
                    this.addItem();
                    this.capacity[j] = packUomData["capacity"]; 
                    this.empty_bag_wt[j] = packUomData["empty_big_wt"]; 
                    this.packingItem[j] = packingList;  
                    this._grandtotal = this._grandtotal + data1["totalamt"];
                    this.pur_return_note_item_dtls.at(j).patchValue({
                      itemcode: data1["itemcode"], packing: data1["packing"], quantity: data1["quantity"],
                      uom: data1["uom"], squantity: data1["squantity"], suom: data1["suom"], matwt: data1["matwt"],
                      price: data1["price"], pricebasedon: data1["pricebasedon"], amount: data1["amount"],
                      discountrate: data1["discountrate"], discounttype: data1["discounttype"], 
                      discountamt: data1["discountamt"], taxcode: data1["taxcode"], taxrate: data1["taxrate"], 
                      taxamt: data1["taxamt"], totalamt: data1["totalamt"], accnorms: data1["accnorms"], 
                      net_amount: data1['net_amount'], qc_deduction: data1['qc_deduction'], 
                      net_amt_after_qc: data1['net_amt_after_qc'], gross_amt: data1['gross_amt']});
                    j = j + 1;
                    this.userForm.patchValue({grandtotal: (Math.round(this._grandtotal * 1000)/1000).toFixed(3)});
                  }); 
              }
            }

            this.status = false;
            forkJoin(
              this.DropDownListService.getPurRtnAppNoteDtls("purreturnid="+data["purreturnid"]),
              this.DropDownListService.getPurReturnAppTI(data["purreturnid"]),
              this.DropDownListService.getPurReturnAppBD(data["purreturnid"]),
              this.DropDownListService.getPurReturnAppSD(data["purreturnid"]),
              this.DropDownListService.getPurReturnAppDoc(data["purreturnid"]),
              this.DropDownListService.getPurReturnAppSuppDtls(data["purreturnid"]),
              this.DropDownListService.getPurReturnAppWD(data["purreturnid"]),
            ).subscribe(([purRetAppNoteData, transData, brokerData, shipDtlsData, docData, supplierdata, wgmntData])=>
              {
                this.Id= this.userForm.get("id").value as FormControl;
                console.log("purRetNoteData "+JSON.stringify(purRetAppNoteData))
                this.userForm.patchValue(purRetAppNoteData);
                this.userForm.patchValue({id: this.Id, referance_id: data["purreturnid"]})
                console.log("transData "+JSON.stringify(transData))
                this.pur_return_note_trans_info.patchValue(transData)

                console.log("brokerData "+JSON.stringify(brokerData))
                let k = 0;
                this.addBroker();
                this.broker_sl_no = 0;
                while(this.pur_return_note_broker_dtls.length)
                this.pur_return_note_broker_dtls.removeAt(0); 
                for(let data1 of brokerData)
                { 
                  this.addBroker();
                  this.pur_return_note_broker_dtls.at(k).patchValue({brokercode: data1['brokercode'],
                    basis: data1['basis'], rate: data1['rate']});
                  k = k + 1;
                }

                console.log("docData "+JSON.stringify(docData))
                this.addDocument();
                while(this.pur_return_note_docs.length)
                this.pur_return_note_docs.removeAt(0);
                for(let data1 of docData)
                this.addDocument();
                this.pur_return_note_docs.patchValue(docData);
                
                console.log("shipDtlsData "+JSON.stringify(shipDtlsData))
                this.pur_return_note_shipment_dtls.patchValue(shipDtlsData)
                console.log("wgmntData "+JSON.stringify(wgmntData));
                this.pur_return_note_weight_dtl.patchValue(wgmntData);
                console.log("supplierdata "+JSON.stringify(supplierdata));
                this.pur_return_note_supplier_dtls.at(0).patchValue({spcode: supplierdata['spcode'], 
                  spname: supplierdata['spname'], spcontact: supplierdata['spcontact']});

                 this.DropDownListService.getUnloadWeightmentWt(purRetAppNoteData["weighment_id"]).subscribe(weigmtData=>
                {
                  console.log("weigmtData: "+JSON.stringify(weigmtData));
                  this.pur_return_note_weight_dtl.patchValue({owngross: weigmtData["gross_weight"], ownuom: weigmtData["gw_unit"],
                  owndate: weigmtData["gw_date"], ownnet: (Math.round( weigmtData["net_weight"] * 100) / 100).toFixed(3), 
                  owntare: weigmtData["tare_weight"]});
                  this.status = true;
                })
            }); 
          }
        });
      }else{alert("Select BusinessUnit, Item Types, Item Sub Types and Supplier First!")}
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
        if(this.Id>0)
          {
            this.status = false; 
            this.Service.updatePurReturn(this.userForm.getRawValue(), this.Id).subscribe(data => 
            {
              console.log(this.userForm.value);
              alert( "Purchase Return Note Updated successfully.");
              this.userForm.reset();
              this.status = true;
              this.ngOnInit();            
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});    
          } 
          else
            {
              this.status = false; 
              this.Service.createPurReturnNote(this.userForm.getRawValue()).subscribe(data => 
              {
                console.log(this.userForm.value);
                alert("New Purchase Return Note created successfully.");
                this.userForm.reset();
                this.status = true;
                this.ngOnInit();            
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
              this.ngOnInit()});    
            }
      }  
    }

   onUpdate(id:any,purreturnnoteid:string)
  {
    this.purreturnnotesave = true;
     this.userForm.patchValue({id: id});
     this.status = false;
     this.isHidden = true;
     this.packingItem = [];
     //this.selectedPackingItem = [];
    forkJoin(
      this.Service.retrivePurRtnNote(id),
      this.Service.getPurRtnNoteItemDtls(purreturnnoteid),      
      this.Service.getPurRtnNoteTransInfo(purreturnnoteid),
      this.Service.getPurRtnNoteSuppDtls(purreturnnoteid),
      this.Service.getPurRtnNoteDocs(purreturnnoteid),
      this.Service.getPurRtnNoteWeigtmentDtls(purreturnnoteid),
      this.Service.getPurRtnNoteShipDtls(purreturnnoteid),
      this.Service.getPurRtnNoteBroDtls(purreturnnoteid),
    ).subscribe(([PurReturnNotedata, itemData, transData,
      supplierData, docData, weightData, shipmentData, brokerData])=>
      {
       this.onChangeBusinessUnit(PurReturnNotedata["businessunit"]);
       this.onChangeSupplierName(PurReturnNotedata["supplierid"]);
       this.currentDate = PurReturnNotedata["currentDate"];

       this.userForm.patchValue({id: PurReturnNotedata["id"],purreturnnoteid: PurReturnNotedata["purreturnnoteid"], ser_item_subtype: PurReturnNotedata["ser_item_subtype"],
         purreturnnoteno: PurReturnNotedata["purreturnnoteno"],date2: PurReturnNotedata["date2"], cust_ref_doc_no: PurReturnNotedata["cust_ref_doc_no"],
         referance_id: PurReturnNotedata["referance_id"], supplierid: PurReturnNotedata["supplierid"], purreturnnotedate: PurReturnNotedata["purreturnnotedate"],
         businessunit: PurReturnNotedata["businessunit"],purreturnnoterefno: PurReturnNotedata["purreturnnoterefno"], remark: PurReturnNotedata["remark"], businessunitname: PurReturnNotedata["businessunitname"],
         confirmedby: PurReturnNotedata["confirmedby"],approval: PurReturnNotedata["approval"], reason: PurReturnNotedata["reason"], suppliername:PurReturnNotedata["suppliername"],
         grandtotal: PurReturnNotedata["grandtotal"],company_id: PurReturnNotedata["company_id"], fin_year: PurReturnNotedata["fin_year"], username: PurReturnNotedata["username"],});
         console.log("order Details: "+  JSON.stringify(PurReturnNotedata));

          let k = 0;
          this.addItem();
          this.item_sl_no = 0;
          while (this.pur_return_note_item_dtls.length) 
          this.pur_return_note_item_dtls.removeAt(0);
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
               //  this.selectedPackingItem[k] = data1["packing"];
                 this.packingItem[k] = packingList; 
                 this.pur_return_note_item_dtls.at(k).patchValue(data1);
                 k = k + 1;
                 this.status = true;
              });
           }

           console.log("transData: "+  JSON.stringify(transData));
           this.pur_return_note_trans_info.patchValue(transData);

           console.log("supplierData: "+JSON.stringify(supplierData));
           this.addSupplier();
           this.supplier_sl_no = 0;
           while(this.pur_return_note_supplier_dtls.length)
           this.pur_return_note_supplier_dtls.removeAt(0);
           this.addSupplier();
           this.pur_return_note_supplier_dtls.at(0).patchValue(supplierData);

           this.addDocument();
           while (this.pur_return_note_docs.length)
           this.pur_return_note_docs.removeAt(0);
           for(let data1 of docData)
           this.addDocument();
           this.pur_return_note_docs.patchValue(docData);
           console.log("docData: "+JSON.stringify(docData));
  
           console.log("weightData: "+  JSON.stringify(weightData));
           this.pur_return_note_weight_dtl.patchValue(weightData);

           this.pur_return_note_shipment_dtls.patchValue({shipaddr: shipmentData["shipaddr"],
           shipdetails: shipmentData["shipdetails"],payaddr: shipmentData["payaddr"],paydetails: shipmentData["paydetails"],});
           console.log("shipmentData: "+  JSON.stringify(shipmentData));
         
           this.addBroker();
           while (this.pur_return_note_broker_dtls.length)
           this.pur_return_note_broker_dtls.removeAt(0);
           for(let data1 of brokerData)
           this.addBroker();
           this.pur_return_note_broker_dtls.patchValue(brokerData);
           console.log("brokerData: "+JSON.stringify(brokerData));

           this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});                               
      }  


}
