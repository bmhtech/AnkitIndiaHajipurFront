import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import {formatDate} from '@angular/common';
import { TagAdviceWithPo } from '../../../../../../Models/Weightment/tag-advice-with-po';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { MatDialogRef, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { UnloadAdviceDrivingPopupComponent } from '../unload-advice-driving-popup/unload-advice-driving-popup.component';
import { forkJoin } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PurchageOrderItemDtlsPopUpComponent } from '../../components/purchage-order-item-dtls-pop-up/purchage-order-item-dtls-pop-up.component';
import { PageEvent } from '@angular/material';
  
  @Component({
    selector: 'app-tag-advice-with-po',
    templateUrl: './tag-advice-with-po.component.html',
    styleUrls: ['./tag-advice-with-po.component.scss']
  })

  export class TagAdviceWithPoComponent implements OnInit
  {
    public userForm:FormGroup;
    submitted = false;
    showAdd = false;
    status:any;
    isHidden:any;
    isBrokerDtlsHidden = true;
    listTagAdviceWithPo: TagAdviceWithPo[];
    model: TagAdviceWithPo = new TagAdviceWithPo();
    itemtypes:any = [];
    ledgerNames:any=[];
    supplierNames:any = [];
    vehclenos:any = [];
    customUOMs:{};
    item_codes:any = [];
    adivceNoList:any = [];
    contAddrs:any = [];
    brokerNames: {};
    chargesIdList:{};
    transBrone:any [];
    transporterNames:any = [];
    bussiness_unit_list:any = [];
    modeOfTransport:any = [];
    transRate:any = [];
    payModes:any = [];
    payTerms:any = [];
    brokerNameList:any = [];
    driver_names:any = [];
    warehouses:any = [];   
    chargesList:any = [];
    isChecked4 = false;
    item_sl_no = 1; 
    broker_sl_no = 1;
    seq_no:string;
    currentDate:any;
    isChecked = false;
    PONumber:any;
    tagadvicewithposave:boolean = true;
    tagAdviceview:boolean=true;
    tagAdvicedelete:boolean=true;
    purchaseorderitemid:any = [];
    global_pur_id:any;
    advice_id_new:any;
    po_number_new:any;
    action:any;
    public userForm1:FormGroup;
    business_Partner_List:any=[];
    totalElements: number = 0;

    constructor(public fb:FormBuilder,private Service:Master,
      private DropDownListService :DropdownServiceService,  private dialog: MatDialog)
    { 
      this.userForm=fb.group({
      item_type: [''], 
      adv_po_tag_no: [''], 
      po_number: [''], 
      advice_id: [''], 
      transporter_code:[''],
      item_subtype: [''],  
      busi_partner: [''],  
      ul_date: [''], 
      we_req: [''],   
      we_chg_app:[''],
      supp_ref_doc:[''],
      supp_ref_docno: [''],  
      ula_date: [''],  
      grn_req: [''],  
      business_unit: [''], 
      vehicle_id: [''],   
      total_qty:[''],
      uom:[''],
      return_type: [''],  
      return_remarks: [''],  
      remarks: [''],
      brokerage_active:[''], 
      app_chgs_id:[''],
      company_id: [''],
      fin_year: [''],
      balancedtotalqty: [''],
      username: [''],

      tag_advice_withpo_item_dtls:this.fb.array([this.fb.group({    
        sl_no: this.item_sl_no,   
        item_code: '',  
        packing:  '', 
        quantity: '',  
        uom: '',
        s_qty: '', 
        s_uom: '', 
        mat_wt: '',  
        qc_norms:'',
        wearhouse: '',
        rack: '', 
        base_qty: ''})]),

      tag_advice_withpo_party_wm: this.fb.group({
        gross_wt: '',   
        uom1: '',   
        tare_wt: '',   
        uom2: '',   
        net_wt:'',  
        uom3: '',    
        slip_no:'', 
        pw_date:'', 
        wb_name: ''}),

      tag_advice_withpo_driver_dtls: this.fb.group({
        spot_trans:'',    
        remarks:'',    
        driver_name:'',    
        phone:'',    
        address:'',    
        doc_type:'',    
        doc_no:'',    
        description:''}),
    
      tag_advice_withpo_broker_dtls: this.fb.array([this.fb.group({
        sl_no: this.broker_sl_no,  
        ven_code_name:'',  
        basis:'',  
        rate:'',  
        brokerage_acc:'',  
        tds_rate:'',  
        tds_acc:''})]),

      tag_advice_withpo_trans_info: this.fb.group({
        trans_borne_by:  '', 
        transporter_name:  '', 
        mode_of_trans:  '', 
        transport_rate:  '',   
        charge_code:  '',  
        rate_value:  '',   
        payment_mode:  '',  
        payment_terms:  '',  
        bank_name:  '',  
        account_name:  '',  
        account_no:  '',   
        branch:  '',   
        iban:  '',   
        bic_swift_code: '',
        mobile:'',
        ifsc_code:'',
        cash_limit:''}),

      tag_advice_withpo_terms_con: this.fb.group({
        payment_mode:  '', 
        payment_terms: '', 
        bank_name:  '', 
        account_name:  '', 
        account_no: '', 
        branch: '', 
        iban:  '', 
        bic_swift_code:  '',
        cash_limit:'',
        ifsc:'',
        mobile:'',
        tcs_applicable:'',
        tcs_rate:'',}),

      tag_advice_withpo_bp_dtls: this.fb.group({ 
        sp_name: '',
        sp_phone: '',	
        sp_fax: '',	
        sp_email: '',	
        sp_address: '',  
        cp_name:'',
        cp_designation:'',  
        cp_phone:'',  
        cp_fax: '',  
        cp_email: '',  
        cp_address: '' }),

      tag_advice_withpo_app_chgs: this.fb.array([this.fb.group({  
        charges_name: '',
        rate_cal_method: '',
        tax_rate: '',
        amount: ''})]),

      tag_advice_withpo_docs:this.fb.array([this.fb.group({    
        doc_name:  ''})]) });

        this.userForm1=fb.group({
          advice1_no:[''],
          po1_no:[''],
          fromdate:[''],
          todate:[''],
          busi_partner1:['']
  
        });

    }
    
    get advice1_no(){return this.userForm1.get("advice1_no") as FormControl}
    get po1_no(){return this.userForm1.get("po1_no") as FormControl}
    get fromdate(){return this.userForm1.get("fromdate") as FormControl}
    get todate(){return this.userForm1.get("todate") as FormControl}
    get busi_partner1(){return this.userForm1.get("busi_partner1") as FormControl}


    get balancedtotalqty(){return this.userForm.get("balancedtotalqty") as FormControl}
    get username(){return this.userForm.get("username") as FormControl}
    get transporter_code(){return this.userForm.get("transporter_code") as FormControl}
    get transporter_name() { return this.userForm.get("transporter_name") as FormControl }
    get item_type(){return this.userForm.get("item_type") as FormControl}
    get item_subtype() { return this.userForm.get("item_subtype") as FormControl }
    get busi_partner() { return this.userForm.get("busi_partner") as FormControl }
    get bus_partner() { return this.userForm.get("bus_partner") as FormControl }
    get advice_id() { return this.userForm.get("advice_id") as FormControl }
    get adv_po_tag_no() { return this.userForm.get("adv_po_tag_no") as FormControl }
    get po_number() { return this.userForm.get("po_number") as FormControl }
    get ul_date() { return this.userForm.get("ul_date") as FormControl }
    get we_req() { return this.userForm.get("we_req") as FormControl }
    get we_chg_app() { return this.userForm.get("we_chg_app") as FormControl }
    get supp_ref_doc() { return this.userForm.get("supp_ref_doc") as FormControl }
    get supp_ref_docno() { return this.userForm.get("supp_ref_docno") as FormControl } 
    get ula_date() { return this.userForm.get("ula_date") as FormControl }
    get grn_req() { return this.userForm.get("grn_req") as FormControl }
    get business_unit() { return this.userForm.get("business_unit") as FormControl }
    get vehicle_no() { return this.userForm.get("vehicle_no") as FormControl }
    get total_qty() { return this.userForm.get("total_qty") as FormControl }
    get uom() { return this.userForm.get("uom") as FormControl }
    get return_type() { return this.userForm.get("return_type") as FormControl }
    get return_remarks() { return this.userForm.get("return_remarks") as FormControl }
    get remarks() { return this.userForm.get("remarks") as FormControl }
    get brokerage_active() { return this.userForm.get("brokerage_active") as FormControl }
    get app_chgs_id() { return this.userForm.get("app_chgs_id") as FormControl }
    get tag_advice_withpo_item_dtls() { return this.userForm.get('tag_advice_withpo_item_dtls') as FormArray; }
    get tag_advice_withpo_party_wm() { return this.userForm.get('tag_advice_withpo_party_wm') as FormGroup; }
    get tag_advice_withpo_driver_dtls() { return this.userForm.get('tag_advice_withpo_driver_dtls') as FormGroup; }
    get tag_advice_withpo_broker_dtls() { return this.userForm.get('tag_advice_withpo_broker_dtls') as FormArray; }
    get tag_advice_withpo_terms_con() { return this.userForm.get('tag_advice_withpo_terms_con') as FormGroup; }
    get tag_advice_withpo_bp_dtls() { return this.userForm.get('tag_advice_withpo_bp_dtls') as FormGroup; }
    get tag_advice_withpo_docs() { return this.userForm.get('tag_advice_withpo_docs') as FormArray; }
    get tag_advice_withpo_trans_info()  { return this.userForm.get('tag_advice_withpo_trans_info') as FormGroup; }
    get tag_advice_withpo_app_chgs() { return this.userForm.get('tag_advice_withpo_app_chgs') as FormArray; }
    
    company_name:any;
    referenceTypeList:any = [];
    ngOnInit() 
    {
      //For User Role
      this.action='save'
    let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
    this.tagadvicewithposave=false;
    this.tagAdviceview=false;
    this.tagAdvicedelete = false;

    if(accessdata.includes('tag_advice_with_po.save'))
    {
    this.tagadvicewithposave = true;
    }
    if(accessdata.includes('tag_advice_with_po.view'))
    {
    this.tagAdviceview = true;
    }
    if(accessdata.includes('tag_advice_with_po.delete'))
    {
      this.tagAdvicedelete=true;
    }

      this.status = false;
      this.isHidden = false;
      this.company_name = localStorage.getItem("company_name");
      this.PONumber = '0';
      this.company_name = localStorage.getItem("company_name");
      this.transBrone=["Own Account","Party Account"];
      this.modeOfTransport=["By Road","By Train","By Ship","By Air", "By Rail","N/A"];
      this.transRate=["per UOM","per Truck"];
      this.payModes=["Cash","RTGS","DD","Cheque","NEFT", "Card"];
      //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      this.advice_id_new='0';
      this.po_number_new='0';
      forkJoin(
        //this.DropDownListService.getUnloadAdvRefOpenAdvwt2(),
        this.DropDownListService.getUnloadAdvRefOpenAdvwt2New(),
        this.DropDownListService.getWeighmentCharges(),
        this.DropDownListService.ledgerNameList(),
        //this.Service.getTagAdvWithPO("company="+this.company_name),
       // this.DropDownListService.payTermNameList(),
        this.DropDownListService.payTermNameListFast(),
        this.DropDownListService.getTagAdvPOSequenceId("APOT"),
        this.DropDownListService.itemTypeList(this.company_name),
       // this.DropDownListService.supplierNamesList(this.company_name),
       this.DropDownListService.supplierNamesNewList(this.company_name),
        //this.DropDownListService.itemNamesList(),
        this.DropDownListService.itemNamesNewList(),
        this.DropDownListService.customUOMList(),
        this.DropDownListService.getCompanyBUMNCList(this.company_name),
        this.DropDownListService.getChargeMasterList(),
        //this.DropDownListService.supplierNamesList(this.company_name),
        this.DropDownListService.supplierNamesNewList(this.company_name),
        this.DropDownListService.getTagAdviceWithPoList(this.currentDate,localStorage.getItem("financial_year"))
        //this.DropDownListService.newsupplierNamesList(this.company_name),
        //this.DropDownListService.gettaggedadvice_pagination(0,10)
     // ).subscribe(([adviceNoData, WeighmentChargesData, ledgerData, TagAdvData ,payTermData, sequenceData,
     ).subscribe(([adviceNoData, WeighmentChargesData, ledgerData ,payTermData, sequenceData,
          itemTypeData, supplierData, itemNamesData, customUOMData, companyBUMNCList, chargeMasterData,newsupplier,TagAdvData])=> 
        {
          //console.log("TagAdvData::"+JSON.stringify(TagAdvData))
          this.adivceNoList = adviceNoData;
          this.chargesList = WeighmentChargesData;
          this.ledgerNames  = ledgerData;
          this.listTagAdviceWithPo  = TagAdvData;
          this.payTerms = payTermData;
          this.seq_no = sequenceData["sequenceid"];
          this.itemtypes  = itemTypeData;
          this.supplierNames  = supplierData;
          this.item_codes = itemNamesData;
          this.customUOMs  = customUOMData;
          this.bussiness_unit_list  = companyBUMNCList;
          this.chargesIdList  = chargeMasterData;

          
          this.business_Partner_List=newsupplier;

         // this.listTagAdviceWithPo  = pagination['content'];
          //this.totalElements = pagination['totalElements'];

          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});    
    }
    
    addItem() 
    {
      this.item_sl_no = this.item_sl_no + 1;
      this.tag_advice_withpo_item_dtls.push(this.fb.group({
        sl_no: this.item_sl_no,   
        item_code: '',  
        packing:  '', 
        quantity: '',  
        uom: '',
        s_qty: '', 
        s_uom: '', 
        mat_wt: '', 
        qc_norms:'', 
        wearhouse: '',
        rack: '', 
        base_qty: ''}));
    }

    deleteItem(index) 
    {
      if(this.item_sl_no > 1)
      { 
        this.packingItem.slice(index, 1);
        this.capacity.slice(index, 1);
        this.empty_bag_wt.slice(index, 1);
        this.tag_advice_withpo_item_dtls.removeAt(index);
        this.item_sl_no = this.item_sl_no - 1;
      }
      else
      {
        this.item_sl_no = 1;
        alert("can't delete all rows");
        this.tag_advice_withpo_item_dtls.reset();
        this.tag_advice_withpo_item_dtls.at(0).patchValue({sl_no:  this.item_sl_no});
      } 
      
      for(let i=1; i<=this.item_sl_no; i++)
        this.tag_advice_withpo_item_dtls.at(i-1).patchValue({sl_no: i});
      
    }

    addBroker() 
    {
      this.broker_sl_no = this.broker_sl_no + 1;
      this.tag_advice_withpo_broker_dtls.push(this.fb.group({
        sl_no: this.broker_sl_no,  
        ven_code_name: '',
        basis: '',
        rate: '',
        brokerage_acc: '',
        tds_rate: '',
        tds_acc: ''}));
    }

    deleteBroker(index) 
    {
      if(this.broker_sl_no > 1)
      { 
        this.tag_advice_withpo_broker_dtls.removeAt(index);
        this.broker_sl_no = this.broker_sl_no - 1;
      }
      else
      {
        this.broker_sl_no = 1;
        alert("can't delete all rows");
        this.tag_advice_withpo_broker_dtls.reset();
        this.tag_advice_withpo_broker_dtls.at(0).patchValue({sl_no:  this.broker_sl_no});
      } 
      
      for(let i=1; i<=this.broker_sl_no; i++)
        this.tag_advice_withpo_broker_dtls.at(i-1).patchValue({sl_no: i});
      
    }

    addDocument() 
    {
      this.tag_advice_withpo_docs.push(this.fb.group({
        doc_name:  ''}));
    }

    deleteDocument(index) 
    {
      if(index)
      {this.tag_advice_withpo_docs.removeAt(index);}
      else
      {
        alert("can't delete all rows");
        this.tag_advice_withpo_docs.reset();
      } 
    }

    addAppCharges()
    {
      this.tag_advice_withpo_app_chgs.push(this.fb.group({
        charges_name:'',
        rate_cal_method:'',
        amount:'',
        tax_rate: ''}));
    }

    stackList:any=[];
    onChangeWarehouse(warehouse_code, index)
    {
      this.stackList[index] = [];
      if(warehouse_code != "0")
      {
        this.status = false;
        this.DropDownListService.getBinDescByWarehouse(warehouse_code).subscribe(data=>
        {      
          this.stackList[index]=data ;  
          this.status=true; 
        });
      }     
    }

    onChangeTInfoTransporterName(transporter_id: string)
    {
      this.tag_advice_withpo_trans_info.reset();
      if(transporter_id != "0")
      {
        this.status = false;
        this.DropDownListService.getTransAccount(transporter_id).subscribe(data=>
        {
          this.tag_advice_withpo_trans_info.patchValue({bic_swift_code: data["bic_swift_code"],
          iban: data["iban"], payment_mode: data["mode_of_pay"], payment_terms: data["pay_term"],
          bank_name: data["bank_name"], account_name: data["acc_holder_name"], 
          account_no: data["acc_no"], ifsc_code: data["ifsc_code"], mobile: data["mobile"],
          branch: data["branch"], cash_limit: data["cash_limit"]});

          if(data["mode_of_pay"] != "Cash")
          this.tag_advice_withpo_trans_info.patchValue({cash_limit: 0})
          this.status = true;
        });
      }
    }

    isTranporterInfoIsDisabled = false;
    onChangeTransportBorneBy(transBornBy: string)
    {
      if(transBornBy == 'Party Account')
      {
        this.isTranporterInfoIsDisabled = true;
        this.tag_advice_withpo_trans_info.patchValue({transporter_name: null, mode_of_trans: null,
          transport_rate: null, charge_code: null, rate_value: null, payment_mode: null,
          payment_terms: null, bank_name: null, account_name: null, account_no: null,
          branch: null, iban: null, bic_swift_code: null, mobile: null, ifsc_code: null, cash_limit: null});
      }
      else
      {this.isTranporterInfoIsDisabled = false;}
    }

    PONoList:any = [];
    dateType = "date";
    unloadAdviceId:any;
    onChangeAdviceNo(adviceNo: string)
    {

      this.PONumber = '0';
      this.dateType = "date";

      this.item_sl_no = 0;
      this.packingItem = [];
      this.tag_advice_withpo_item_dtls.reset();
      while( this.tag_advice_withpo_item_dtls.length)
      this.tag_advice_withpo_item_dtls.removeAt(0);
      this.addItem();

      this.tag_advice_withpo_party_wm.reset();
      this.onChangeVechileNo('0');
      this.onChangeSupplierName('0');
      this.onChangeTransporterName('0');
      this.onChangeBusinessUnit('0');

      this.tag_advice_withpo_docs.reset();
      while(this.tag_advice_withpo_docs.length-1)
      this.tag_advice_withpo_docs.removeAt(0);

      this.tag_advice_withpo_app_chgs.reset();
      while(this.tag_advice_withpo_app_chgs.length-1)
      this.tag_advice_withpo_app_chgs.removeAt(0)

      if(adviceNo != '0')
      {
        this.unloadAdviceId = adviceNo;
        this.dateType = 'text';
        this.status = false;
        forkJoin(
          this.DropDownListService.getUnloadDetails(adviceNo),
          this.DropDownListService.getUnloadItemList(adviceNo),
          this.DropDownListService.wmUnAdvicePartyWmRetriveList(adviceNo),
          this.DropDownListService.wmUnAdviceDriverDtlsRetriveList(adviceNo), 
          this.DropDownListService.wmUnAdviceBpDtlsRetriveList(adviceNo),
          this.DropDownListService.wmUnAdviceDocRetriveList(adviceNo)
        
          ).subscribe(([data, data1, data2, data3, data4, data5,])=> 
          {
            this.onChangeSupplierName(data.busi_partner);


            
        //   console.log("hello :: "+ data.transporter_code +" / "+data["total_qty"]+" / " + data.busi_partner);
        console.log("data.transporter_code :: " + data.transporter_code)
            if(data.transporter_code == null || data.transporter_code == "0")
            {
              //this.DropDownListService.getVehiclenoall()
              this.DropDownListService.getVehiclenoallNew()
              .subscribe(datatuhin=>
                {
                  this.vehclenos = datatuhin;
                  this.status = true;
                });

                this.userForm.patchValue({vehicle_id:data["vehicle_id"]});
            }
            else
            {
            
              this.onChangeTransporterName(data.transporter_code);
            
              this.userForm.patchValue({vehicle_id:data["vehicle_id"]});

              
            }
            this.onChangeVechileNo(data.vehicle_id);
          
            this.onChangeBusinessUnit(data.business_unit);
            console.log("userform Dtls: "+JSON.stringify(data))
          // this.userForm.patchValue(data);
          this.userForm.patchValue({company_id:data["company_id"],item_type:data["item_type"],item_subtype:data["item_subtype"],uom:data["uom"],
            busi_partner:data["busi_partner"],we_req:data["we_req"],we_chg_app:data["we_chg_app"],supp_ref_doc:data["supp_ref_doc"],
            supp_ref_docno:data["supp_ref_docno"],ula_date:data["ula_date"],grn_req:data["grn_req"],business_unit:data["business_unit"],
          //  transporter_code:data["transporter_code"],vehicle_id:data["vehicle_id"],total_qty:data["total_qty"],return_type:data["return_type"],
          transporter_code:data["transporter_code"],total_qty:data["total_qty"],return_type:data["return_type"],
            return_remarks:data["return_remarks"],remarks:data["remarks"],brokerage_active:data["brokerage_active"],app_chgs_id:data["app_chgs_id"],
          })

            console.log("item Dtls: "+JSON.stringify(data1))
            this.item_sl_no = 0;
            this.packingItem = [];
            let k = 0;
            while(this.tag_advice_withpo_item_dtls.length)
            this.tag_advice_withpo_item_dtls.removeAt(0);
            for(let list of data1)
            {
              this.status = false;
              this.DropDownListService.getItemMasterPackMat(list.item_code).subscribe(packingList=>
              {
                this.addItem();
//changeson 21-04-2022 as warehouse has been not made clear 
              // this.onChangeWarehouse(list.wearhouse, k);
//changes closed             
              this.packingItem[k] = packingList;
                this.tag_advice_withpo_item_dtls.at(k).patchValue(list);
                k = k + 1;
                this.status = true;
              })
            }

            console.log("party Dtls: "+JSON.stringify(data2))
            this.tag_advice_withpo_party_wm.patchValue(data2);
            console.log("driver Dtls: "+JSON.stringify(data3))
            this.tag_advice_withpo_driver_dtls.patchValue(data3);
            console.log("B P Dtls: "+JSON.stringify(data4))
            this.tag_advice_withpo_bp_dtls.patchValue(data4);

            console.log("Document Dtls: "+JSON.stringify(data5))
            while(this.tag_advice_withpo_docs.length)
            this.tag_advice_withpo_docs.removeAt(0)
            for(let list of data5)
            {this.addDocument();}
            this.tag_advice_withpo_docs.patchValue(data5);
          });

      }
    }

    onChangeBusinessUnit(b_id:string)
    {
      this.warehouses = [];
      if(b_id != "0")
      {
        this.status = false;
        this.DropDownListService.getWHListbyBUnit(b_id).subscribe(data1=>
        {
          this.warehouses = data1;
          this.status = true;
        });
      }
    }

    transporter_id:any;
    onChangeTransporterName(transporter_id: string)
    {
      this.tag_advice_withpo_driver_dtls.reset();
      this.driver_names = [];
      this.vehclenos = [];
      if(transporter_id != "0")
      {
        this.status = false;
        this.transporter_id = transporter_id;
        this.DropDownListService.getVehicleThruTransporter(transporter_id).subscribe(data=>
        {
          this.vehclenos = data;
          this.status = true;
        });
      }
    }

    onChangeTcsApplicable(tcs_appl:string)
    {
      if(tcs_appl == 'Yes')
      this.isChecked=true;
      else
      this.isChecked=false;
    }

    is_cash_limit_active = false;
    onChangePaymentMode(payment_mode: string)
    {
      if(payment_mode == "Cash")
      {
          this.is_cash_limit_active = true;
      }
      else
      {
        this.is_cash_limit_active = false;
        this.tag_advice_withpo_terms_con.patchValue({cash_limit: 0});
      }
    }

    createNewDriver()
    {
      if(this.vehicleId != '0')
      {
        let dialogref=this.dialog.open(UnloadAdviceDrivingPopupComponent, {data: {transporter_id: this.transporter_id, vehicle_id: this.vehicleId}});
        dialogref.afterClosed().subscribe(result => 
        {
          if(result != '')
          {
            this.status = false;
            this.Service.createDriver(result).subscribe(data=> 
            {
              console.log("Driver Details: "+JSON.stringify(result));
              alert("New Driver master created successfully."); 
              this.DropDownListService.getDriverByVehicle(this.vehicleId).subscribe(data=>
              { 
                this.driver_names = data;
                this.status = true;
              })
            }); 
          }
        });
      }
      else
      {alert("Select Vehicle No First!");}
    }

    Addrs:{};
    delvAddrs:any = [];
    supplier_id = "";
    onChangeSupplierName(suppid:string)
    {
      this.contAddrs = [];
      this.delvAddrs = [];
      this.transporterNames = [];
      this.onChangePaymentMode("0");
      this.onChangeTcsApplicable("0");
      this.tag_advice_withpo_bp_dtls.reset();

      this.broker_sl_no = 0;
      while(this.tag_advice_withpo_broker_dtls.length)
      this.tag_advice_withpo_broker_dtls.removeAt(0);
      this.addBroker();

      this.tag_advice_withpo_terms_con.reset();
      this.tag_advice_withpo_trans_info.reset();
      if(suppid != "0")
      {

        this.DropDownListService.getSuppliertransport(suppid).subscribe(data12=>
        {

          if(data12[0].transport_own == 'YES')
          {

            this.status = false;
            this.supplier_id = suppid;
            forkJoin(
              this.DropDownListService.getSuppBPAcc(suppid),
            //  this.DropDownListService.getTransporterThruSupplier(suppid),
              this.DropDownListService.getDeliveryAddrById(suppid),
              this.DropDownListService.getSuppAddrById(suppid),
              this.DropDownListService.getAddrById(suppid),
              this.DropDownListService.getBrokerListBySupplierCode(suppid),
            this.DropDownListService.getPurOrdThruSuppAdvReq(suppid)
          // ).subscribe(([data, data1, data2, data3, data4, data5, data6])=>
            ).subscribe(([data, data2, data3, data4, data5,data6])=>
              {
                this.onChangePaymentMode(data["mode_of_pay"]);
                this.onChangeTcsApplicable(data["tcs_applicable"]);
                this.tag_advice_withpo_terms_con.patchValue({payment_mode: data["mode_of_pay"],
                payment_terms: data["pay_term"], cash_limit: data["cash_limit"], 
                tcs_applicable: data["tcs_applicable"], tcs_rate: data["tcs_rate"],
                account_name: data["accountholder"], account_no: data["acc_no"],
                bank_name: data["bankname"], ifsc: data["ifsc"], mobile: data["mobile"], 
                iban: data["iban"], bic_swift_code: data["bic_swift_code"], branch: data["branch"]}); 
    
                //this.transporterNames = data1;
                this.delvAddrs  = data2;
                this.contAddrs  = data3;
    

                this.tag_advice_withpo_bp_dtls.patchValue({sp_address: data4["address"]});
                this.brokerNameList = data5;
                console.log("bidhan //"+JSON.stringify(data6));
                this.global_pur_id=data6.pur_orderid;
                this.PONoList=data6;
                this.status = true;
              }); 


          }

            if(data12[0].transport_own == 'NO')
            {

              this.status = false;
              this.supplier_id = suppid;
              forkJoin(
                this.DropDownListService.getSuppBPAcc(suppid),
              // this.DropDownListService.getTransporterThruSupplier(suppid),
                this.DropDownListService.getDeliveryAddrById(suppid),
                this.DropDownListService.getSuppAddrById(suppid),
                this.DropDownListService.getAddrById(suppid),
                this.DropDownListService.getBrokerListBySupplierCode(suppid),
                this.DropDownListService.getPurOrdThruSuppAdvReq(suppid)
              //).subscribe(([data, data1, data2, data3, data4, data5, data6])=>
              ).subscribe(([data, data2, data3, data4, data5,data6])=>
                {
                  this.onChangePaymentMode(data["mode_of_pay"]);
                  this.onChangeTcsApplicable(data["tcs_applicable"]);
                  this.tag_advice_withpo_terms_con.patchValue({payment_mode: data["mode_of_pay"],
                  payment_terms: data["pay_term"], cash_limit: data["cash_limit"], 
                  tcs_applicable: data["tcs_applicable"], tcs_rate: data["tcs_rate"],
                  account_name: data["accountholder"], account_no: data["acc_no"],
                  bank_name: data["bankname"], ifsc: data["ifsc"], mobile: data["mobile"], 
                  iban: data["iban"], bic_swift_code: data["bic_swift_code"], branch: data["branch"]}); 
      
                // this.transporterNames = data1;
                  this.delvAddrs  = data2;
                  this.contAddrs  = data3;
      
                  this.tag_advice_withpo_bp_dtls.patchValue({sp_address: data4["address"]});
                  this.brokerNameList = data5;
                  console.log("bidhan //"+JSON.stringify(data6));
                  this.global_pur_id=data6.pur_orderid;
                  this.PONoList=data6;
                  this.status = true;
                }); 
            }


        });
        
        
      }  
    }

    onChangeSuppInfoName(name:string)
    {
      this.tag_advice_withpo_bp_dtls.patchValue({sp_phone:null, sp_fax:null, sp_email:null});
      if(name != "0")
      {
        this.status = false;
        this.DropDownListService.getSupplierContDetails(this.supplier_id, name).subscribe(data=>
        {
          this.tag_advice_withpo_bp_dtls.patchValue({sp_phone:data["phone"], sp_fax:data["fax"],sp_email:data["email"]});
          this.status = true;
        });
      }
    }

    onChangeContInfoName(name:string)
    {
      this.tag_advice_withpo_bp_dtls.patchValue({cp_designation: null, cp_phone: null,
        cp_fax: null, cp_email: null,cp_address: null}); 
      if(name != "0")
      {
        this.status = false;
        this.DropDownListService.getSupplierDelvFromAdd(this.supplier_id, name).subscribe(data=>
        {
          this.tag_advice_withpo_bp_dtls.patchValue({cp_designation:data["designation"],
          cp_phone:data["phone"],cp_fax:data["fax"],
          cp_email:data["email"],cp_address:data["address"]}); 
          this.status = true;
        });
      }
    }

    onChangeBrokerName(index, broker_code)
    {
      this.tag_advice_withpo_broker_dtls.at(index).patchValue({basis: null, based_on: null,
        rate: null, brokerage_acc: null, tds_rate: null, tds_acc: null});
      if(broker_code != "0")
      {
        this.status = false;
        this.DropDownListService.getBrokerDetailsByBrokerCode(broker_code).subscribe(data=>          
        {
          this.tag_advice_withpo_broker_dtls.at(index).patchValue({basis: data[0].basis, based_on: data[0].based_on,
            rate: data[0].rate, brokerage_acc: data[0].brokerage_acc, tds_rate: data[0].tds_rate, tds_acc: data[0].tds_acc});
          this.status = true;
        });
      } 
    }

    vehicleId = '0';
    onChangeVechileNo(vechile_id:string)
    {
      this.tag_advice_withpo_driver_dtls.reset();
      this.driver_names = [];
      this.vehicleId = '0';

      if(vechile_id != "0")
      {
        this.status = false;
        this.vehicleId = vechile_id;
        this.DropDownListService.getDriverByVehicle(vechile_id).subscribe(data=>
        { 
          this.driver_names = data;
          this.status = true;
        });      
      }
    }

    onChangeDriverName(driver_id:String)
    {
      this.tag_advice_withpo_driver_dtls.patchValue({phone: null,address: null,
        identity: null,doc_type: null,doc_no: null});
      if(driver_id)
      {
        this.status = false;
        this.DropDownListService.DriverDetails(driver_id).subscribe(data=>
        {
          this.status = true;
          this.tag_advice_withpo_driver_dtls.patchValue({phone:data["phone_no"],address:data["address"],
            identity:data["identity"],doc_type:data["doc_type"],doc_no:data["doc_no"]});
        });
      }
    }

    onChangeApplicableCharges(applicable_charges_id:string)
    {
      this.tag_advice_withpo_app_chgs.reset();
      while(this.tag_advice_withpo_app_chgs.length-1)
      this.tag_advice_withpo_app_chgs.removeAt(0);

      if(applicable_charges_id != "0")
      {
        this.status =false;
        this.DropDownListService.getChargeMasterDtlsList(applicable_charges_id).subscribe(data=>
        {
          let i =0;
          while(this.tag_advice_withpo_app_chgs.length)
          { this.tag_advice_withpo_app_chgs.removeAt(0);}

          for(let data1 of data)
          {
            this.addAppCharges();
            this.tag_advice_withpo_app_chgs.at(i).patchValue({charges_name: data1.charge_name,
            rate_cal_method: data1.rate_cal,tax_rate: data1.tax_rate});
            i=i+1;
          }
          this.status = true;
        });
      } 
    }

    showList(s:string)
    {
      
      if(this.tagadvicewithposave == true)//true exist  false not exist 
      {
        if(s=="add")
        { this.isHidden=true;}
      }
      
      if(s=="list")
      {this.isHidden=false;}
    }

    check4(ev)
    {
      if(ev.checked)
        this.isChecked4 = true;
      else
        this.isChecked4 = false;
    }

    packingItem:any=[];
    onChangeItemName(index, item_id:string)
    {
      this.packingItem[index] = [];
      this.tag_advice_withpo_item_dtls.at(index).patchValue({uom: null}); 
      if(item_id != "0")
      {
        this.status = false;
        this.itemId =  item_id;
        forkJoin(
          this.DropDownListService.getItemNameById(item_id,this.company_name),
          this.DropDownListService.getItemMasterPackMat(item_id),
          this.DropDownListService.getItemQCDetails(item_id, this.company_name)
        ).subscribe(([data, data1, data2])=>
          {   
            this.DropDownListService.getUomName(data.mstock_unit).subscribe(data=>
            {
              this.tag_advice_withpo_item_dtls.at(index).patchValue({uom:data.description}); 
              this.status = true;
            });
            this.packingItem[index] = data1;  
          this.tag_advice_withpo_item_dtls.at(index).patchValue({qc_norms: data2[0].qc_code});
          });
      }
    }

    capacity:any;
    itemId: any;
    packingQty:any;
    empty_bag_wt:any;
    onChangePackingItem(index, packing_code)
    {
      this.empty_bag_wt = 0;
      if(packing_code.target.value != "0")
      {
        this.status = false;
        this.DropDownListService.getItemPackUom(this.itemId, packing_code.target.value,this.company_name).subscribe(data=>
        { 
          this.capacity = data.capacity;
          this.empty_bag_wt =  data.empty_big_wt;
          this.tag_advice_withpo_item_dtls.at(index).patchValue({s_uom: data.uom1}); 
          this.status = true;
        });     
      }
    }

    calItemQty(packing_qty,index){
      this.tag_advice_withpo_item_dtls.at(index).patchValue({quantity: this.capacity * packing_qty.target.value,
        mat_wt: this.capacity * packing_qty.target.value - this.empty_bag_wt});
    }

    onChangePONumber(PoNo:string)
    {
      //tuhin
      this.purchaseorderitemid=[];
      this.PONumber = '0';
      if(PoNo != '0')
      {


      
        this.PONumber = PoNo;
        this.status = false;
        forkJoin(
          this.DropDownListService.getPurOrdDetails(PoNo),
          this.DropDownListService.getPurOrdBrokerList(PoNo),
          this.DropDownListService.getPurOrdTrans(PoNo),
          this.DropDownListService.getPurOrdAppChgs(PoNo),
          this.DropDownListService.getPurOrdcheckingwAdvice(PoNo,this.userForm.get("advice_id").value),
          this.DropDownListService.balancedtotalquantity(PoNo)

        ).subscribe(([purOrdData, brokarData, transData, appChargesData,checking,balancetotalqty])=>
        {
          
          this.userForm.patchValue({balancedtotalqty:balancetotalqty["total_qty"]})


            for(let i=0;i<this.tag_advice_withpo_item_dtls.length;i++)
            {
              console.log("Value: "+ checking[i])
              console.log(checking[i].mat_wt + " // " +  this.tag_advice_withpo_item_dtls.at(i).get("quantity").value)
                
                    if(this.tag_advice_withpo_item_dtls.at(i).get("quantity").value<=checking[i].mat_wt)
                      {
                        
                      }
                      else
                      {
                        alert("Material Weight of advice number And Purchase Order Doesnt Satify !!!!!");
                      let newseq= this.seq_no;
                        this.userForm.reset();
                      // console.log("seq ::"+this.seq_no + " / " + newseq)
                        this.tag_advice_withpo_item_dtls.removeAt(0);
                        //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
                        this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
                        this.userForm.patchValue({adv_po_tag_no:newseq,ula_date:this.currentDate});
                      }
            }
            let itemstatus:boolean=false;

            for(let v=0;v<this.tag_advice_withpo_item_dtls.length;v++)
            {
                if(this.tag_advice_withpo_item_dtls.at(v).get("item_code").value == checking[v]["item_code"])
                {
                  itemstatus=true;
                  this.status=true;
                }
            }
        if(itemstatus == false)
        {
                alert("Unload Item Name Does not matched with Purchase Order Item Name!!!!!!!!!");
                let newseq= this.seq_no;
                this.userForm.reset();
               // console.log("seq ::"+this.seq_no + " / " + newseq)
                this.tag_advice_withpo_item_dtls.removeAt(0);
                //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
                this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
                this.userForm.patchValue({adv_po_tag_no:newseq,ula_date:this.currentDate});
        }

          //console.log("Pur Order  dtls: "+JSON.stringify(purOrdData))
          this.userForm.patchValue({app_chgs_id: purOrdData["app_chgs_id"]});

         // console.log("Broker dtls: "+JSON.stringify(brokarData))
          this.isChecked4 = true;
          this.addBroker()
          this.broker_sl_no = 0;
          while(this.tag_advice_withpo_broker_dtls.length)
          this.tag_advice_withpo_broker_dtls.removeAt(0);
          
          for(let data1 of brokarData)
          this.addBroker();
          this.tag_advice_withpo_broker_dtls.patchValue(brokarData);

         // console.log("transport dtls: "+JSON.stringify(transData))
          this.tag_advice_withpo_trans_info.patchValue(transData);

         // console.log("app charges: "+JSON.stringify(appChargesData))
          this.addAppCharges()
          while(this.tag_advice_withpo_app_chgs.length)
          this.tag_advice_withpo_app_chgs.removeAt(0);

          for(let data1 of appChargesData)
          this.addAppCharges()
          this.tag_advice_withpo_app_chgs.patchValue(appChargesData);

          this.status = true
        })

      }
    }

    openPurOrdItemDtls()
    {
      if(this.PONumber != '0')
      {
        const dialogref=this.dialog.open(PurchageOrderItemDtlsPopUpComponent, {data: {pur_ord_id: this.PONumber, unloadAdviceId: this.unloadAdviceId}});
        dialogref.afterClosed().subscribe(data => {});
      }
      else
      {alert("Select PO Number First...")}
    }

    send()
    {   
      this.userForm.patchValue({
        company_id: localStorage.getItem("company_name"), fin_year:localStorage.getItem("financial_year")})
      this.submitted = true;
      if(!this.userForm.valid) 
      {
        alert('Please fill all fields!')
        return false;
      } 
      else 
      {
        this.status = false;
        //alert("check here:"+this.userForm.get("po_number").value)
        if(this.userForm.get("advice_id").value == 0 )
        {
          alert("Please select Advice Number");
          this.status = true;
      }
        else if(this.userForm.get("po_number").value == 0 )
        {
            alert("Please select PO Number");this.status = true;
        }
        else
        {


        
              let Newmat_wt:number=0;
              for(let i=0;i<this.tag_advice_withpo_item_dtls.length;i++)
              {
                Newmat_wt+=this.tag_advice_withpo_item_dtls.at(i).get("mat_wt").value
              }
            
              console.log("calculation :: " + Newmat_wt + " / " + this.userForm.get("balancedtotalqty").value)
                        
              let compareqty:boolean=false;

              compareqty=Math.round(Newmat_wt) <= Math.round(Number(this.userForm.get("balancedtotalqty").value));
            //  compareqty=Math.round(Number(this.userForm.get("balancedtotalqty").value))<= Math.round(Newmat_wt) ;
                if(compareqty == false )
                { 
                  alert("Material Weight exceeded in respect with purchase order :: "+this.userForm.get("balancedtotalqty").value);
                  this.status=true;
                }
                else
                {
                       this.Service.createTagAdvWithPO(this.userForm.value).subscribe( data => 
                          {
                              let pur_type="Purchase Order";
                            this.DropDownListService.getUnload_advice_updation(this.userForm.get("po_number").value,pur_type)
                              .subscribe(dataewe =>
                                {
                                    // console.log("Unload advice1111: "+JSON.stringify(purid+reftype))
                                    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
                                this.ngOnInit()}); 
                            
                  
                            console.log("Unload advice: "+this.userForm.value)
                            alert("New Tag Advice with PO created successfully.");
                            this.userForm.reset();
                            this.ngOnInit();
                            //Refresh Dynemic Table
                            this.packingItem = [];
                            this.item_sl_no = 0;
                            while(this.tag_advice_withpo_item_dtls.length) 
                            this.tag_advice_withpo_item_dtls.removeAt(0);
                            this.addItem();
                  
                            this.broker_sl_no = 0;
                            while(this.tag_advice_withpo_broker_dtls.length)
                            this.tag_advice_withpo_broker_dtls.removeAt(0);
                            this.addBroker();
                  
                            while(this.tag_advice_withpo_docs.length-1)
                            this.tag_advice_withpo_docs.removeAt(0);
                            
                          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
                          this.ngOnInit()});  
                }
        }      
      }
    }


    onUpdate(id:any)
    { 
      //this.action = 'view';
    
      this.action = 'view';
      this.isHidden = true;


      forkJoin(
      
        this.DropDownListService.getWeighmentCharges(),
        this.DropDownListService.ledgerNameList(),

        //this.DropDownListService.payTermNameList(),
        this.DropDownListService.payTermNameListFast(),
        this.DropDownListService.itemTypeList(this.company_name),
        //this.DropDownListService.supplierNamesList(this.company_name),
        this.DropDownListService.supplierNamesNewList(this.company_name),
        //this.DropDownListService.itemNamesList(),
        this.DropDownListService.itemNamesNewList(),
        this.DropDownListService.customUOMList(),
        this.DropDownListService.getCompanyBUMNCList(this.company_name),
        this.DropDownListService.getChargeMasterList(),
        this.Service.tagadviceRetrive(id)
      ).subscribe(([ WeighmentChargesData, ledgerData ,payTermData, 
          itemTypeData, supplierData, itemNamesData, customUOMData, companyBUMNCList, chargeMasterData,tagData])=> 
        {
        
          this.chargesList = WeighmentChargesData;
          this.ledgerNames  = ledgerData;
        
          this.payTerms = payTermData;
      
          this.itemtypes  = itemTypeData;
          this.supplierNames  = supplierData;
          this.item_codes = itemNamesData;
          this.customUOMs  = customUOMData;
          this.bussiness_unit_list  = companyBUMNCList;
          this.chargesIdList  = chargeMasterData;


          this.onChangeAdviceNo(tagData["advice_id"]);
          this.onChangePONumber(tagData["po_number"]);
          this.userForm.patchValue({advice_id:tagData["advice_no"],po_number:tagData["pur_orderno"],adv_po_tag_no:tagData["adv_po_tag_no"]}); 


          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});  





      }

      onDelete(id:any,adviceno,pur_orderno)
      {
        this.status=false;

        if(confirm("Are you sure to delete this Tag Advice ?"))
        {
          console.log("adviceno"+adviceno)
          this.userForm.patchValue({username: localStorage.getItem("username")});
          this.DropDownListService.checkTagAdvicePoUsage(adviceno).subscribe(checkTagadvice=> 
          //  this.DropDownListService.checkTagAdvicePoUsageingrn(pur_orderno).subscribe(checkTagadvice=> //po 
            {
             ///let dataq=JSON.parse(checkItem);
             //alert("bidhan here::"+checkTagadvice.status);
             console.log("adviceno"+checkTagadvice.status)
             if(checkTagadvice.status=='No')
             {
              this.Service.deleteTagadvice(this.userForm.getRawValue(),id).subscribe(data=> 
                {
                  alert("Tag Advice Deleted successfully.");
                  this.userForm.reset();
                  this.status = true;
                  this.isHidden = false;
                  this.ngOnInit();
                  this.showList("list");
                });
             }
             else
             {
              alert("This Advice is Already Used in Grn,Can not be Deleted!! ");
             }
            });
          }
         this.status=true;
           
      }

      getProducts(request) {
        // console.log("tuhin req "+request.size);
         this.DropDownListService.gettaggedadvice_pagination(request.page,request.size)
         .subscribe(data => {
          this.listTagAdviceWithPo  = data['content'];
             this.totalElements = data['totalElements'];
         }
         , error => {
             console.log(error.error.message);
         }
         );
      }
      nextPage(event: PageEvent) {
        const request = {};
        request['page'] = event.pageIndex.toString();
        request['size'] = event.pageSize.toString();
        this.getProducts(request);
      }
      
          searchsaleorder(event)
          {
            this.status=true;
          let serchText = event.target.value;
          if(event.key == "Enter")
          {
              
              if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
              {
                this.getProducts({ page: "0", size: "10" });
                this.status=true;
              }
              else
              {
                console.log("2" + serchText);
                this.DropDownListService.findsaleorder(serchText).subscribe(data=>
                {
                  this.listTagAdviceWithPo  =data
                 
                  this.status = true;
                });     
              }
          }
        
          }

      search()
      {
        let order1_no=this.userForm1.get("advice1_no").value;
        let po1_no=this.userForm1.get("po1_no").value;
        let todate=this.userForm1.get("todate").value;
        let fromdate=this.userForm1.get("fromdate").value;
        let bus_partner1=this.userForm1.get("busi_partner1").value;
        let finyear =localStorage.getItem("financial_year");
      
        this.status=false;
        this.DropDownListService.searchtaggedadviceFast("orderno="+order1_no+"&pono="+po1_no+"&fromdate="+fromdate+"&todate="+todate+"&bus_partner1="+bus_partner1+"&finyear="+finyear).subscribe(data=>
          {
            console.log("here data comses " + JSON.stringify(data))
            this.listTagAdviceWithPo =data;
            this.status=true;
  
          }, (error) => {this.status=true;
            alert(" Tag Advice Data Not Found !!!")
            this.listTagAdviceWithPo=[];
          })
      }

  }
