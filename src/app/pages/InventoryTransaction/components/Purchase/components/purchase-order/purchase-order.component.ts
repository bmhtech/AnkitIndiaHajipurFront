import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PurchaseModuleServiceService } from '../../../../../../service/purchase-module-service.service';
import { PurchaseOrder } from '../../../../../../Models/transaction/PurchaseTransaction/PurchaseOrder';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { IndentOrderPopUpModalComponent } from '../../components/indent-order-pop-up-modal/indent-order-pop-up-modal.component';
import { PurchaseEnqPopUpModalComponent } from '../../components/purchase-enq-pop-up-modal/purchase-enq-pop-up-modal.component';
import { PurchaseQNPopUpModalComponent } from '../../components/purchase-qnpop-up-modal/purchase-qnpop-up-modal.component';
import { TaxPopUpModalComponent } from '../tax-pop-up-modal/tax-pop-up-modal.component';
import { QcNormPopUpModalComponent } from '../qc-norm-pop-up-modal/qc-norm-pop-up-modal.component';
import { formatDate } from '@angular/common';
import { Master } from '../../../../../../service/master.service';
import { forkJoin } from 'rxjs';
import { PurchaseorderprintComponent } from '../purchaseorderprint/purchaseorderprint.component';
import { PageEvent } from '@angular/material';
import { PurchasechannelpopupComponent } from '../purchasechannelpopup/purchasechannelpopup.component';
import { PurorderjwupdateComponent } from '../purorderjwupdate/purorderjwupdate.component';

@Component({
  selector: 'app-purchase-order',
  // templateUrl: './a.html',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})

export class PurchaseOrderComponent implements OnInit {
  serItemType = true
  submitted = false;
  public userForm: FormGroup;
  model: PurchaseOrder = new PurchaseOrder();
  listPurchaseOrder: PurchaseOrder[];
  itemtypes: any = [];
  basislist: any = [];
  chargesIdList: any = [];
  purposes: any = [];
  deptNames: any = [];
  priorities: any = [];
  supplierNames: any = [];
  customUOMDyns: any = [];
  poSubTypeList: any = [];
  payModes: any = [];
  payTerms: any = [];
  ledgerNames: any = [];
  transBrone: any = [];
  modeOfTransport: any = [];
  transRate: any = [];
  transporterNames: any = [];
  employeeNames: any = [];
  approve: any = [];
  reasonList: any = [];
  itemList: any = [];
  brokerNameList: any = [];
  designationlists: any = [];
  ReferenceTypeList: any = [];
  bussiness_unit_list: any = [];
  empty_bag_wt_priceBasedOn: any = [];
  ChargeList: any = [];
  areaList: any = [];
  classified_item_namelist: any = [];
  selectedItemNameclassified: any = [];
  isHidden: any;
  isChecked: any;
  // musterRollRequiredIsChecked:any;
  suppaddr: any;
  status: any;
  item_sl_no = 1;
  broker_sl_no = 1;
  chgs_sl_no = 1;
  terms_conditions_sl_no = 0;
  seq_no: string;
  currentDate: any;
  prefDocNo: any;
  chargeCode: any;
  financialYear: any;
  packingItem: any;
  capacity: any;
  empty_bag_wt: any;
  defaultValueOfSrvItemType: any;
  refNo: any;
  _referenceNo: any;
  company_name: any;
  orderFor: any;
  poType: any;
  poSubype: any;
  action: any;
  purchaseordersave: boolean = true;
  purchaseorderview: boolean = true;
  purchaseorderupdate: boolean = true;
  purchaseorderdelete: boolean = true;
  show_no_advance: boolean = true;
  showBrokerDetails: boolean = false;
  isReadOnly: boolean = true;
  transportownstatus: any;
  totalnumberofquantity: any;
  finalglobalqty: any;
  selected: any;
  tagadvice: any;
  advicereq: any;
  pofullfillment: any;
  noofadvice: any;
  totalqty: any;
  staticuoms: any;
  purordtype: any;
  suppliername: any;
  referancetype: any;
  receiptcriteria: any;
  itemdynastatus: any = [];
  packingdynastatus: any = [];
  brokerdetailsstatus: any = [];
  po_fullfillment1: any;
  brokerage_active1: boolean = false;
  //changes on 14-04-2022
  customUOMs: {};
  disablerow: boolean = false;
  myFiles: any = [];
  tolerance: any;
  backupitemqty: any;
  backuppackingqty: any;
  disabeWeighment: boolean = false;
  disabebroker: boolean = false;
  appchargesgloble: any;
  potype_status: boolean = false;
  nouom: boolean = false;
  norwamaterial: boolean = false;
  totalElements: number = 0;
  public userForm1: FormGroup;
  globaladviceused: boolean = false;
  showchannel: boolean = false;
  channel_master_list: any = [];
  supplierNamesnew: any = [];
  Channelreq: any;
  requiredmatrixdisable: any = [];
  storepurchase: boolean = false;
  frompolist: any = [];

  BuUnit: any;
  po_itemnumber: any;
  Consignment_type: any;
  cgst_amt: any = [];
  sgst_amt: any = [];
  igst_amt: any = [];
  //changes ends on 14-04-2022
  selectedTransacc = [];
  selectedTdsacc = [];
  uoms: any = [];
  tdscode: any = [];
  listCharges: any = [];
  transportCharges: boolean = false;
  selectedChgCode = [];
  storeChargesList:any=[];
  allfin:any=[];
  fyear:any;
  company_state:any;

  constructor(public fb: FormBuilder, private Service: PurchaseModuleServiceService,
    private UpdateService: Master, private dialog: MatDialog, private DropDownListService: DropdownServiceService) {
    this.userForm = fb.group(
      {
        id: [''],
        pur_orderid: [''],
        pur_order_no: [''],
        ord_date: [''],
        ser_item_type: [true],
        ser_item_subtype: [''],
        supplier_name: [''],
        businessunit: [''],
        po_fullfillment: [''],
        no_of_advice: [''],
        broker_info: [''],
        advice_req: [''],
        referance_type: [''],
        pref_doc_no: [''],
        madvice_sin_grn: [''],
        weightment_req: [''],
        pan_no: [''],
        gst_no: [''],
        cin_no: [''],
        brokerage_active: [''],
        tan_no: [''],
        ship_to_addr_id: [''],
        ship_to_addr: [''],
        pay_to_addr_id: [''],
        pay_to_addr: [''],
        broker_name: [''],
        gl_account: [''],
        remarks: [''],
        doc_upload: [''],
        confirmed_by: [''],
        approved: [''],
        reason: [''],
        term_pur_ord: [''],
        master_roll_required: [],
        pur_ord_type: [],
        app_chgs_id: [''],
        all_unit: [''],
        company_id: [''],
        fin_year: [''],
        referance_id: [''],
        username: [''],
        receipt_criteria: [''],
        total_qty: [''],
        staticuom: [''],
        tagadvice_status: [''],
        channel_req: [''],
        sup_channel: [''],
        sup_channel_list: [''],
        poitemnumber: [''],
        consignment_type: [''],
        trans_borne_by_chgs: [''],
        document_no:[''],
        store_charges:[''],

        pur_Order_Item_Details: this.fb.array([this.fb.group({
          slno: this.item_sl_no,
          item_code: '',
          classified_item_name: '',
          packing_item: '',

          packing_item_code: '',
          packing_size: '',
          packing_weight: '',
          packing_type: '',

          packing_uom: '',
          packing_qty: '',
          stock_uom: '',
          stock_qty: '',
          toleranceqty: '0',

          price: '',
          con_factor: '0',
          mat_weight: '',
          price_based_on: '',
          amount: '',
          taxable_amount: '',
          discount: '',
          discount_basedon: '',
          discount_amount: '',
          net_amount: '',
          tax_code: '',
          tax_amount: '',
          total_amount: '',
          qc_norms: '',
          priority: '',
          delivery_date: '',
          purpose: '',
          to_be_used: '',
          remarks: '',
          tax_rate: '',
      
          packing_list_req: '',
          packing_list: '',
          adjusted_remarks: '',
          adjusted_qty: ''
         // weight_tolerance: ''
        })]),

        pur_Order_broker: this.fb.array([this.fb.group({
          sl_no: this.broker_sl_no,
          ven_code_name: '',
          basis: '',
          rate: '',
          amount: '',
          tax_rate: '',
          tax_amount: '',
          total_amount: '',
          brokerage_acc: '',
          tds_acc: '',
          tds_rate: ''
        })]),

        pur_Order_docs: this.fb.array([this.fb.group({
          doc_name: ''
        })]),

        pur_Order_Terms_Con: this.fb.group({
          payment_mode: '',
          cash_limit: '',
          tcs_applicable: '',
          tcs_rate: '',
          payment_terms: '',
          bank_name: '',
          account_name: '',
          account_no: '',
          branch: '',
          ifsc: '',
          mobile: '',
          iban: '',
          bic_swift_code: ''
        }),

        pur_Order_app_chgs: this.fb.array([this.fb.group({
          charges_name: '',
          add_less: '',
          rate_cal_method: '',
          app_rate: '',
          tax_rate: '',
          amount: '',
          required: ''
        })]),

        pur_order_terms_conditions: this.fb.array([this.fb.group({
          slno: this.terms_conditions_sl_no,
          terms_name: '',
          description: '',
        })]),

        pur_Order_BPDetails: this.fb.group({
          supp_name: '',
          supp_phone: '',
          supp_fax: '',
          supp_email: '',
          supp_address: '',
          cp_name: '',
          cp_phone: '',
          cp_fax: '',
          cp_email: '',
          cp_address: '',
          cp_designation: ''
        }),

        pur_Order_Terminations: this.fb.group({
          term_pur_ord: '',
          order_by: '',
          reason: '',
          remarks: '',
          tot_term_chg: '',
          term_add: '',
          term_deduct: '',
          net_term_chg: '',
          charges_descpt: ''
        }),

        pur_Order_Terminations_dyn: this.fb.array([this.fb.group({
          charge_name: '',
          termination_cal: '',
          cal_qty: '',
          amount: '',
          method: '',
          tax_rate: '',
          qty: '',
          rate: '',
          gl_account: '',
          tax_amount: '',
          total_amount: '',
        })]),

        pur_Order_Trans_Infos: this.fb.group({
          trans_borne_by: '',
          mode_of_trans: '',
          transport_from: '',
          transport_to: '',
          transporter_name: '',
          transport_rate: '',
          // charge_code: '',
          rate_value: '',
          payment_mode: '',
          payment_terms: '',
          bank_name: '',
          account_name: '',
          account_no: '',
          branch: '',
          iban: '',
          bic_swift_code: '',
          cash_limit: '',
          ifsc_code: '',
          mobile: ''
        }),

        pur_Order_Trans_Chgs_dyn: this.fb.array([this.fb.group({
          slno: this.chgs_sl_no,
          mode_of_trans: '',
          transport_from: '',
          transport_to: '',
          transporter_name: '',
          transport_rate: '',
          charge_code: '',
          chgs_rate_value: '',
          chgs_remarks: '',
          distance_in_km: '',
          uom: '',
          tax_code: '',
          tax_rate: '',
          transportation_acc: '',
          tds_code: '',
          tds_codename: '',
          tds_rate: '',
          tds_acc: '',
          tds_accname: '',
          allowed_shortage: '',
          deduction_basedon: '',
          charge_id: ''
        })]),

        pur_order_store_chgs: this.fb.array([this.fb.group({
          charges_name: '',
		      charges_acc: '',
          store_cgst: '',
          store_sgst: '',
          store_igst: '',
          store_amount:'',
          store_taxrate:''
        })]),

      });
    this.userForm1 = fb.group(
      {
        order1_no: [''],
        fromdate: [''],
        todate: [''],
        supplier_name1: [''],
      });
  }

  get order1_no() { return this.userForm1.get("order1_no") as FormControl }
  get fromdate() { return this.userForm1.get("fromdate") as FormControl }
  get todate() { return this.userForm1.get("todate") as FormControl }
  get supplier_name1() { return this.userForm1.get("supplier_name1") as FormControl }

  get receipt_criteria() { return this.userForm.get("receipt_criteria") as FormControl }
  get poitemnumber() { return this.userForm.get("poitemnumber") as FormControl }

  get consignment_type() { return this.userForm.get("consignment_type") as FormControl }

  get trans_borne_by_chgs() { return this.userForm.get("trans_borne_by_chgs") as FormControl }


  get channel_req() { return this.userForm.get("channel_req") as FormControl }
  get sup_channel() { return this.userForm.get("sup_channel") as FormControl }
  get sup_channel_list() { return this.userForm.get("sup_channel_list") as FormControl }

  get total_qty() { return this.userForm.get("total_qty") as FormControl }
  get staticuom() { return this.userForm.get("staticuom") as FormControl }
  get tagadvice_status() { return this.userForm.get("tagadvice_status") as FormControl }

  get referance_id() { return this.userForm.get("referance_id") as FormControl }
  get id() { return this.userForm.get("id") as FormControl }
  get brokerage_active() { return this.userForm.get("brokerage_active") as FormControl }
  get ord_date() { return this.userForm.get("ord_date") as FormControl }
  get ser_item_type() { return this.userForm.get("ser_item_type") as FormControl }
  get ser_item_subtype() { return this.userForm.get("ser_item_subtype") as FormControl }
  get supplier_name() { return this.userForm.get("supplier_name") as FormControl }
  get businessunit() { return this.userForm.get("businessunit") as FormControl }
  get po_fullfillment() { return this.userForm.get("po_fullfillment") as FormControl }
  get no_of_advice() { return this.userForm.get("no_of_advice") as FormControl }
  get broker_info() { return this.userForm.get("broker_info") as FormControl }
  get advice_req() { return this.userForm.get("advice_req") as FormControl }
  get referance_type() { return this.userForm.get("referance_type") as FormControl }
  get pref_doc_no() { return this.userForm.get("pref_doc_no") as FormControl }
  get madvice_sin_grn() { return this.userForm.get("madvice_sin_grn") as FormControl }
  get weightment_req() { return this.userForm.get("weightment_req") as FormControl }
  get pan_no() { return this.userForm.get("pan_no") as FormControl }
  get gst_no() { return this.userForm.get("gst_no") as FormControl }
  get cin_no() { return this.userForm.get("cin_no") as FormControl }
  get tan_no() { return this.userForm.get("tan_no") as FormControl }
  get ship_to_addr_id() { return this.userForm.get("ship_to_addr_id") as FormControl }
  get ship_to_addr() { return this.userForm.get("ship_to_addr") as FormControl }
  get pay_to_addr_id() { return this.userForm.get("pay_to_addr_id") as FormControl }
  get pay_to_addr() { return this.userForm.get("pay_to_addr") as FormControl }
  get broker_name() { return this.userForm.get("broker_name") as FormControl }
  get gl_account() { return this.userForm.get("gl_account") as FormControl }
  get remarks() { return this.userForm.get("remarks") as FormControl }
  get doc_upload() { return this.userForm.get("doc_upload") as FormControl }
  get confirmed_by() { return this.userForm.get("confirmed_by") as FormControl }
  get approved() { return this.userForm.get("approved") as FormControl }
  get reason() { return this.userForm.get("reason") as FormControl }
  get term_pur_ord() { return this.userForm.get("term_pur_ord") as FormControl }
  get pur_ord_type() { return this.userForm.get("pur_ord_type") as FormControl }
  get master_roll_required() { return this.userForm.get("master_roll_required") as FormControl }
  get document_no() { return this.userForm.get("document_no") as FormControl }
  get store_charges() { return this.userForm.get("store_charges") as FormControl }

  get pur_Order_docs() { return this.userForm.get('pur_Order_docs') as FormArray; }
  get pur_Order_Item_Details() { return this.userForm.get('pur_Order_Item_Details') as FormArray; }
  get pur_Order_BPDetails() { return this.userForm.get('pur_Order_BPDetails') as FormGroup; }
  get pur_Order_Terminations() { return this.userForm.get('pur_Order_Terminations') as FormGroup; }
  get pur_Order_Terminations_dyn() { return this.userForm.get('pur_Order_Terminations_dyn') as FormArray; }
  get pur_Order_Trans_Infos() { return this.userForm.get('pur_Order_Trans_Infos') as FormGroup; }
  get pur_Order_app_chgs() { return this.userForm.get('pur_Order_app_chgs') as FormArray; }
  get pur_order_terms_conditions() { return this.userForm.get('pur_order_terms_conditions') as FormArray; }
  get pur_Order_broker() { return this.userForm.get('pur_Order_broker') as FormArray; }
  get pur_Order_Terms_Con() { return this.userForm.get('pur_Order_Terms_Con') as FormGroup; }
  get pur_Order_Trans_Chgs_dyn() { return this.userForm.get('pur_Order_Trans_Chgs_dyn') as FormArray; }
  get pur_order_store_chgs() { return this.userForm.get('pur_order_store_chgs') as FormArray; }
  ngOnInit() {

    // this.getProducts({ page: "0", size: "10" });
    this.onNoadviceButtonShow();
    //For User Role
    let user_role = localStorage.getItem("user_role") + "tuhinabcd" + "purchase_inventory";

    this.DropDownListService.getRoleItemMaster(user_role).subscribe(data => {
      let accessdata = JSON.stringify(data);

      this.purchaseordersave = false;
      this.purchaseorderupdate = false;
      this.purchaseorderview = false;
      this.purchaseorderdelete = false;



      if (accessdata.includes('purchase_order.save')) {
        this.purchaseordersave = true;
      }
      if (accessdata.includes('purchase_order.update')) {
        this.purchaseorderupdate = true;
      }
      if (accessdata.includes('purchase_order.view')) {
        this.purchaseorderview = true;
      }
      if (accessdata.includes('purchase_order.delete')) {
        this.purchaseorderdelete = true;
      }

    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });

    this.status = false;
    this.isHidden = false;
    this.orderFor = "true";
    this.poType = "0";
    this.poSubype = "0";
    this.norwamaterial = false;
    this.suppliername = "0";
    this.refNo = false;
    this.staticuoms = "0";
    this._referenceNo = "0";
    this.isChecked = false;
    this.empty_bag_wt_priceBasedOn = [];
    this.packingItem = [];
    this.classified_item_namelist = [];
    this.appchargesgloble = '0';
    this.show_no_advance = true;
    this.storepurchase = false;
    this.empty_bag_wt = [];

    this.capacity = [];
    this.tolerance = [];
    this.backupitemqty = [];
    this.backuppackingqty = [];
    // this.musterRollRequiredIsChecked = true;
    this.prefDocNo = "No";
    this.tagadvice = "No";
    this.po_itemnumber = "No";
    this.Consignment_type = "No";
    this.nouom = true;
    this.totalqty = "0";
    this.purordtype = "0";
    this.referancetype = "0";
    this.receiptcriteria = "0";
    this.po_fullfillment1 = "0";
    this.Channelreq = "No";
    this.potype_packing = false;

    this.onChangeReferenceType(this.referancetype);

    //this.chargeCode = "Phase II";      date 01/04/2022 need discuss
    this.action = 'update';
    this.defaultValueOfSrvItemType = 0;
    this.packingItem = [];
    this.classified_item_namelist = [];
    this.userForm.patchValue({ app_chgs_id: "0", confirmed_by: "0" });
    this.pur_Order_Terms_Con.patchValue({ payment_terms: "0" });
    this.pur_Order_Terminations.patchValue({ order_by: "0", charges_descpt: "0" })
    this.financialYear = localStorage.getItem("financial_year");
    // this.poSubTypeList=[{display: "Camp Purchase"},{display: "E-Open Purchase"},{display: "Hat Purchase"},{display: "PDS Purchase"}];
    this.payModes = ["CASH", "CARD", "CHEQUE", "DD", "NEFT", "RTGS"];
    this.transBrone = ["FOB", "FOR"];
    //this.modeOfTransport=["BY AIR","BY ROAD","BY SHIP","BY TRAIN","N/A"];
    this.modeOfTransport = ["By Air", "By Rail", "By Road", "By Ship", "By Train", "By Vehicle", "By Water", "By Other"];
    this.transRate = ["PER TRUCK", "PER UOM"];
    this.approve = ["NO", "PENDING", "YES"];
    //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    
    this.priorities = ["HIGH", "IMMEDIATE", "LOW"];
    this.basislist = ["Fixed", "%", "UOM"];

    this.userForm.patchValue({ id: 0, referance_id: 0 });
    this.company_name = localStorage.getItem("company_name");
    this.DropDownListService.getfinyearlist().subscribe(finyearlist=>
      {
        this.allfin=finyearlist;
        this.allfin.forEach(element => {
          if(element.year_active)
          {
            this.fyear=element.finyear;
          // console.log("fyear:"+this.fyear+"//"+this.financialYear)
            if(this.fyear==this.financialYear)
            {
              this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
            }
            else{
              this.currentDate='0000-00-00';
            }
          } 
        });

    forkJoin(
      this.DropDownListService.payTermNameList(),
      // this.Service.getPurchaseOrders(),
      // this.DropDownListService.itemTypeList(this.company_name),
      // this.DropDownListService.itemTypeListNew(this.company_name),
      this.DropDownListService.itemTypeListFastAPI(this.company_name),
      //this.DropDownListService.supplierNamesList(this.company_name),
      this.DropDownListService.supplierNamesNewList(this.company_name),
      //this.DropDownListService.designationList(),
      this.DropDownListService.designationListNew(),
      //this.DropDownListService.ledgerNameList(),
      this.DropDownListService.ledgerNameListNew(),
      //this.DropDownListService.getCompanyBUMNCList(this.company_name),
      this.DropDownListService.getcompanyBUMNCListFastApi(this.company_name),
      //this.DropDownListService.employeeNamesList(this.company_name),
      this.DropDownListService.getEmployeeNamenew(this.company_name),
      this.DropDownListService.customUOMList(),
      this.DropDownListService.deptNamesList(),
      // this.DropDownListService.getItemThruPurchase(),
      this.DropDownListService.getItemThruPurchasenew(),
      this.DropDownListService.purposesList(),
      this.DropDownListService.getChargeMasterList(),
      this.DropDownListService.getPurTermReasons(),
      //this.DropDownListService.getPurchaseOrderList(this.currentDate,this.financialYear),
      //this.DropDownListService.getPurchaseOrderListFastApi(this.currentDate,this.financialYear),
      this.DropDownListService.getPurchaseOrderListFastApi(this.currentDate, this.financialYear),
      this.DropDownListService.getCustomUOMs("WUOM"),
      this.DropDownListService.tdsCode(),
      this.DropDownListService.getCharges(),
      this.DropDownListService.getStoreChargesList(),
      //).subscribe(([payTermData, purOrdData, itemTypeData, supplierData, designationData, ledgerData,
    ).subscribe(([payTermData, itemTypeData, supplierData, designationData, ledgerData,
      businessUnitData, employeeData, customUOMData, deptData, ItemData, purposeData, 
      ChargeMasterData, reasonData, porderData, uomdata, tdsdata, chargematrix,storedata]) => 
      {
      this.storeChargesList=storedata;
      this.listCharges = chargematrix;
      //console.log("ItemData::"+JSON.stringify(ItemData))
      this.payTerms = payTermData;
      this.tdscode = tdsdata;
      //this.listPurchaseOrder  = purOrdData;
      this.listPurchaseOrder = porderData;
      this.itemtypes = itemTypeData;
      this.supplierNames = supplierData;
      this.supplierNamesnew = supplierData;
      console.log("supplierData" + JSON.stringify(supplierData))
      this.designationlists = designationData;
      console.log("ledgerData" + JSON.stringify(ledgerData))
      this.ledgerNames = ledgerData;
      this.bussiness_unit_list = businessUnitData;
      this.employeeNames = employeeData;
      this.customUOMDyns = customUOMData;
      this.uoms = uomdata;
      this.BuUnit = 'CBU00001';
      //changes on 14-04-2022
      //CHANGE ON 14-05-2022
      //  this.customUOMs  = customUOMData;
      //changes ends on 14-04-2022
      this.deptNames = deptData;
      this.itemList = ItemData;
      this.purposes = purposeData;
      this.chargesIdList = ChargeMasterData;
      this.reasonList = reasonData;
      this.userForm.patchValue({ ser_item_subtype: "0", ser_item_type: "0", supplier_name: "0", businessunit: "0" });
      this.pur_Order_Item_Details.at(0).patchValue({
        packing_qty: 0, stock_qty: 0, price_based_on: "0",
        mat_weight: 0, price: 0, tax_rate: 0, discount: 0, discount_basedon: "0"
      });
      // Purchase Order Terms & Conditions Start 

      this.DropDownListService.getTermsConditionsDtlsList().subscribe(data => {
        let i = 0;
        while (this.pur_order_terms_conditions.length) { this.pur_order_terms_conditions.removeAt(0); }
        for (let data1 of data) {
          this.addTerms();
          this.pur_order_terms_conditions.at(i).patchValue({
            slno: data1.id, terms_name: data1.terms_name, description: data1.description
          });
          //console.log("list "+this.terms_conditions_sl_no)
          i = i + 1;
        }
        this.status = true;
      });

      // Purchase Order Terms & Conditions End 
      this.status = true;
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });
   });
    if (localStorage.getItem("svalue") == 'true') {

      this.onUpdate(localStorage.getItem("sid"), localStorage.getItem("sno"), localStorage.getItem("saction"));
    }
  }

  deliveryDate: any;
  srvItemTypeIs: any;
  onChangeOrderDate(enqDate) {
    this.currentDate = enqDate.target.value;

    if ((this.currentDate >= formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en')) && (this.currentDate <= formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en'))) {
      this.getPONo(this.currentDate, this.orderFor, this.poType, this.poSubype)

      for (let i = 0; i < this.pur_Order_Item_Details.length; i++) {
        this.deliveryDate = this.pur_Order_Item_Details.at(i).get("delivery_date").value as FormControl;
        this.onChangeDeliveryDate(this.deliveryDate, i + 1, 'CFC');
      }
    }
    else {
      alert("Selected  date is not in Selected Financial period!!!!!!")
      this.currentDate = formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
    }

  }

  onChangeOrderFor(order_for) {
    this.orderFor = order_for;
    this.getPONo(this.currentDate, this.orderFor, this.poType, this.poSubype)
  }

  @ViewChild('displayoptions') displayoptions: ElementRef;

  potype_packing: boolean = false;

  onChangePOType(itemType: string, operation) {
    this.poType = itemType;
    //console.log("this.poType :: "+ this.poType);
    console.log("dfghg:" + this.userForm.get("ser_item_type").value)
    if (itemType.length != 0 && itemType != "0") {
      //raw material now setting staitc 
      if (this.poType == 'ITMT00001' || this.poType == 'ITMT00010' || this.poType == 'ITMT00002' || this.poType == 'ITMT00008' || this.poType == 'ITMT00009') {

        this.userForm.patchValue({ advice_req: 'Yes' });
      }
      else {
        this.userForm.patchValue({ advice_req: 'No' });
      }

      if (this.poType == 'ITMT00002')//packing
      {
        this.potype_packing = true;
        this.userForm.patchValue({ po_fullfillment: 'No' });
        this.displayoptions.nativeElement.hidden = true;

        this.DropDownListService.getCustomUOMs("SUOM").subscribe(data => {
          this.customUOMs = data;
          this.status = true;
        });
        //
      }
      else {
        this.potype_packing = false;
        this.displayoptions.nativeElement.hidden = false;
      }

      if (this.poType == 'ITMT00001' || this.poType == 'ITMT00010' || this.poType == 'ITMT00008' || this.poType == 'ITMT00009')//raw
      {

        this.DropDownListService.getCustomUOMs("WUOM").subscribe(data => {

          this.customUOMs = data;
          this.status = true;
        });
      }

      if (this.poType != 'ITMT00001' || this.poType != 'ITMT00010' || this.poType != 'ITMT00008' || this.poType == 'ITMT00009') // Raw Material not Selected
      {
        this.userForm.patchValue({ pur_ord_type: 'E-Open Purchase' });
        this.norwamaterial = true;
      }
      else {
        this.userForm.patchValue({ pur_ord_type: '0' });
        this.norwamaterial = false;
      }

      if ((this.poType == 'ITMT00001' || this.poType == 'ITMT00010' || this.poType == 'ITMT00008' || this.poType == 'ITMT00009') && this.advice_req.value == 'Yes') {
        this.userForm.patchValue({ weightment_req: true });
        this.userForm.patchValue({ broker_info: true });
        this.disabeWeighment = true;
        this.brokerage_active1 = true;
        this.showBrokerDetails = true;
        this.nouom = false;
      }
      else {
        this.userForm.patchValue({ weightment_req: false });
        this.userForm.patchValue({ broker_info: false });
        this.disabeWeighment = false;
        this.brokerage_active1 = false;
        this.showBrokerDetails = false;
        this.nouom = true;
      }

      // new work on 22082022 starts
      //  console.log("potype:"+this.poType)

      if (this.poType == 'ITMT00004' || this.poType == 'ITMT00005' || this.poType == 'ITMT00007') //direct grn entry
      {

        this.userForm.patchValue({ advice_req: 'No', receipt_criteria: 'NA' });
        this.userForm.patchValue({ weightment_req: false });
        this.disabeWeighment = true;
        //this.potype_status=true;
        this.potype_status = false;
        this.DropDownListService.getCustomUOMs("WUOM").subscribe(uOMdata => {
          console.log("data get:" + JSON.stringify(uOMdata))
          this.customUOMs = uOMdata;
          this.status = true;
        });
        // console.log("potype status:"+this.potype_status)
        this.nouom = true;
      }
      else {
        //this.potype_status=false;
        this.potype_status = true;
        console.log("potype status else:" + this.potype_status)
      }
      //work on 22082022 ends

      this.status = false;
      this.packingItem = [];
      this.classified_item_namelist = [];
      this.capacity = [];
      this.empty_bag_wt = [];
      this.tolerance = [];
      this.backupitemqty = [];
      this.backuppackingqty = [];
      if (operation != 'update') {
        console.log("Vineet ::  ")
        this.getPONo(this.currentDate, this.orderFor, this.poType, this.poSubype)
      }
      if (this.poType == 'ITMT00008') {
        this.DropDownListService.getItemThruType("ITMT00001").subscribe(data => {
          this.itemList = data;
          this.status = true;
        })

      }
      else {
        this.DropDownListService.getItemThruType(itemType).subscribe(data => {
          console.log("itemType:" + JSON.stringify(itemType))
          this.itemList = data;
          this.status = true;
        })


      }
    }
    if (this.userForm.get("pur_ord_type").value == "E-Open Purchase") {
      this.onChangePOSubType(this.userForm.get("pur_ord_type").value)
    }

    if (this.poType == 'ITMT00004' || this.poType == 'ITMT00005' || this.poType == 'ITMT00002' || this.poType == 'ITMT00007') {
      this.nouom = true;
    }
    else {
      this.nouom = false;
    }
    if (this.poType == 'ITMT00004') {
      console.log(" Store Purchase")
      this.storepurchase = true;
    }
    else {
      this.storepurchase = false;
    }
  }

  getPackingQtyNew(index) {
    console.log("index:" + index)
    this.userForm.patchValue({ total_qty: this.pur_Order_Item_Details.at(index).get("packing_qty").value });
  }

  onChangePOSubType(event) {
    //alert("event :: "+event)
    if (event.length) {
      console.log("VINEEt 2")
      this.poSubype = event;
      if (Number(this.userForm.get("id").value) > 0) {

      }
      else {
        this.getPONo(this.currentDate, this.orderFor, this.poType, this.poSubype);
      }
      //Camp Purchase,hat Purchase now setting static
      if (this.poSubype == 'Camp Purchase' || this.poSubype == 'Hat Purchase') {
        this.userForm.patchValue({ master_roll_required: true });
      }
      else {
        this.userForm.patchValue({ master_roll_required: false });
      }

    }


  }

  getPONo(orderdate, orderfor, potype, posubtype) {


    if (potype != "0" && posubtype != "0" && orderdate != null) {
      // alert("PO/"+orderdate+"/"+orderfor+"/"+potype+"/"+posubtype);
      this.status = false;
      this.DropDownListService.getPOSequenceId("PO/" + orderdate + "/" + orderfor + "/" + potype + "/" + posubtype).subscribe(data => {
        this.seq_no = data["sequenceid"];
        this.status = true;
      })
    }
  }
  onChangeTransBrone(transbrone) {
    if (transbrone == "FOB") {
      this.transportCharges = true;
    }
    else {
      this.transportCharges = false;
    }
  }

  onChangeDeliveryDate(dDate, index, call: string) {
    if (call == 'CFT') {
      if ((dDate.target.value).valueOf() < this.currentDate.valueOf()) {
        alert("Delivery Date Must be Greater than Order date, Select another date...");
        this.pur_Order_Item_Details.at(index).patchValue({ delivery_date: null })
      }
    }
    if (call == 'CFC' && dDate != "" && dDate != null) {
      if (dDate.valueOf() < this.currentDate.valueOf()) {
        alert("Delivery Date Must be Greater than Order date at row " + index + ", Select another date...");
        this.pur_Order_Item_Details.at(index - 1).patchValue({ delivery_date: null })
      }
    }
  }

  is_tporder_checked = false;
  onChangeTPOrder(event, calFrom) {
    let tporder;
    if (calFrom == 'CFT')
      tporder = event.checked;
    else
      tporder = event;

    if (tporder == true) {
      this.is_tporder_checked = true;
    }
    else {
      this.is_tporder_checked = false;
      this.pur_Order_Terminations.patchValue({
        order_by: "0", charges_descpt: "0", reason: "0",
        remarks: "", tot_term_chg: 0, term_add: 0, term_deduct: 0, net_term_chg: 0
      });

      while (this.pur_Order_Terminations_dyn.length)
        this.pur_Order_Terminations_dyn.removeAt(0);
      this.add8();
    }
  }

  is_cash_limit_active = false;
  onChangePaymentMode(payment_mode: string) {
    if (payment_mode == "Cash") {
      this.is_cash_limit_active = true;
    }
    else {
      this.is_cash_limit_active = false;
      this.pur_Order_Terms_Con.patchValue({ cash_limit: 0 });
    }
  }

  onChangeTcsApplicable(tcs_appl: string) {
    if (tcs_appl == 'Yes')
      this.isChecked = true;
    else
      this.isChecked = false;
  }

  onChangeReason(applicable_charges_id: string) {
    if (applicable_charges_id != '0') {
      this.status = false;
      this.DropDownListService.getChargeMasterDtlsList(applicable_charges_id).subscribe(data => {
        let i = 0;
        while (this.pur_Order_Terminations_dyn.length) { this.pur_Order_Terminations_dyn.removeAt(0); }

        for (let data1 of data) {
          this.add8();
          this.pur_Order_Terminations_dyn.at(i).patchValue({
            charge_name: data1.charge_name, tax_rate: data1.tax_rate,
            method: data1.method, termination_cal: data1.rate_cal
          });
          i = i + 1;
        }
        this.status = true;
      });
    }
  }

  onChangeApplicableCharges(applicable_charges_id: string) {
    if (applicable_charges_id != '0') {
      this.status = false
      this.DropDownListService.getChargeMasterDtlsList(applicable_charges_id).subscribe(data => {
        let i = 0;
        this.requiredmatrixdisable = [];
        while (this.pur_Order_app_chgs.length) { this.pur_Order_app_chgs.removeAt(0); }
        for (let data1 of data) {
          this.add7();
          if (data1.required == "Yes")//requiredmatrixdisable
          {
            this.requiredmatrixdisable[i] = true;
          }
          else {
            this.requiredmatrixdisable[i] = false;
          }
          this.pur_Order_app_chgs.at(i).patchValue({
            charges_name: data1.charge_name, add_less: data1.method, rate_cal_method: data1.rate_cal,
            tax_rate: data1.tax_rate, required: data1.required, app_rate: data1.app_rate
          });
          i = i + 1;
        }
        this.status = true;
      });
    }
    else {
      this.requiredmatrixdisable = [];
      while (this.pur_Order_app_chgs.length)
        this.pur_Order_app_chgs.removeAt(0);
      this.add7();
    }
  }

  onChangeStoreCharges(store_charges_id: string) {
    if (store_charges_id != '0') {
      this.status = false
      this.DropDownListService.getStoreChargeMasterDtlsList(store_charges_id).subscribe(data => {
        let i = 0;
       
        while (this.pur_order_store_chgs.length) { this.pur_order_store_chgs.removeAt(0); }
        for (let data1 of data) {
          this.addStoreCharge();
          
          this.pur_order_store_chgs.at(i).patchValue({charges_name: data1.store_charge_name,
            charges_acc: data1.store_charge_ac_name,store_cgst:0,store_sgst:0,store_igst:0,store_amount:0});
          i = i + 1;
        }
        this.status = true;
      });
    }
    else {
      while (this.pur_order_store_chgs.length)
        this.pur_order_store_chgs.removeAt(0);
      this.addStoreCharge();
    }
  }

  cgstvalue: any;
  sgstvalue: any;
  igstvalue: any;
  onChangeStoreTax(index)
  {
    let storetax=this.pur_order_store_chgs.at(index).get("store_taxrate").value;
    let storeamt=this.pur_order_store_chgs.at(index).get("store_amount").value;
    forkJoin(
    this.DropDownListService.getSupplierAddrFast(this.userForm.get("supplier_name").value),
    this.DropDownListService.getCompanyBussinessUnitDetails(localStorage.getItem("company_name"),this.userForm.get("businessunit").value)
    ).subscribe(([data,companystate]) =>
       {
        this.company_state=companystate["state_name"];
        //console.log(this.company_state+"state:"+data.state)
        //if (data.state == 'BIHAR') {
          if (data.state == this.company_state) {
          this.cgstvalue = (Number(storeamt * (storetax/2)) / 100).toFixed(2);
    
          this.sgstvalue = (Number(storeamt * (storetax/2)) / 100).toFixed(2);
          this.igstvalue = "0";
          console.log("netAmt" + storeamt + "//" + this.sgstvalue)
        }
        else {
          this.cgstvalue = '0';
          this.sgstvalue = '0';
          this.igstvalue = (Number(storeamt * storetax) / 100).toFixed(2);
    
        }
        this.pur_order_store_chgs.at(index).patchValue({store_cgst:this.cgstvalue,store_sgst:this.sgstvalue,store_igst:this.igstvalue});
       });

  }

  OnChangeTransporterName(transporter_id: String) {
    this.pur_Order_Trans_Infos.patchValue({
      bic_swift_code: null, iban: null,
      payment_mode: null, payment_terms: null, bank_name: null, account_name: null,
      account_no: null, ifsc_code: null, mobile: null, branch: null, cash_limit: 0
    });

    if (transporter_id != "0") {
      console.log("FRY : : " + this.pur_Order_Trans_Infos.get("transport_from").value)
      this.status = false;
      if (this.pur_Order_Trans_Infos.get("transport_from").value == null || this.pur_Order_Trans_Infos.get("transport_from").value == "0" || this.pur_Order_Trans_Infos.get("transport_from").value == "") {
        alert("Please Select Transport From in Transport Information Tab !!!");
        this.status = true;
      }
      else if (this.pur_Order_Trans_Infos.get("transport_to").value == null || this.pur_Order_Trans_Infos.get("transport_to").value == "0" || this.pur_Order_Trans_Infos.get("transport_to").value == "") {
        alert("Please Select Transport To in Transport Information Tab !!!");
        this.status = true;
      }
      forkJoin(
        this.DropDownListService.getTransAccount(transporter_id),
        this.DropDownListService.getTransChargeCode(transporter_id, this.pur_Order_Trans_Infos.get("transport_from").value, this.pur_Order_Trans_Infos.get("transport_to").value, "Purchase"),
      )
        .subscribe(([data, Charges]) => {
          this.pur_Order_Trans_Infos.patchValue({
            bic_swift_code: data["bic_swift_code"],
            iban: data["iban"], payment_mode: data["mode_of_pay"], payment_terms: data["pay_term"],
            bank_name: data["bank_name"], account_name: data["acc_holder_name"],
            account_no: data["acc_no"], ifsc_code: data["ifsc_code"], mobile: data["mobile"],
            branch: data["branch"], cash_limit: data["cash_limit"]
          });

          if (data["mode_of_pay"] != "Cash")
            this.pur_Order_Trans_Infos.patchValue({ cash_limit: 0 })

          console.log(" JAI SHREE RAM :: " + JSON.stringify(Charges));
          this.ChargeList = Charges;
          this.status = true;
        });
    }
  }
  OnChangeTransporterNameChgs(transporter_id, index) {
    console.log("RAM JEE : : " + transporter_id)
    if (transporter_id.length) {
      let transport_from = this.pur_Order_Trans_Chgs_dyn.at(index).get("transport_from").value;
      let transport_to = this.pur_Order_Trans_Chgs_dyn.at(index).get("transport_to").value;

      forkJoin(
        this.DropDownListService.getTransChargeCode(transporter_id, transport_from, transport_to, 'Purchase'),
        this.DropDownListService.getTranstds(transporter_id)
      )

        .subscribe(([chgs, tds]) => {
          console.log("chgs::" + JSON.stringify(chgs))
          this.ChargeList[index] = chgs;
          //this.status=true;
          this.pur_Order_Trans_Chgs_dyn.at(index).patchValue({
            tds_code: tds['tds_id'],
            tds_codename: tds['tds_type'],
            tds_rate: tds['tds_rate'],
            tds_acc: tds['tds_acc'],
            tds_accname: tds['tds_accname']
          })
          this.status = true;
        });



    }
  }
  onchangeChargeCode(chargeId) {
    if (chargeId.length) {
      console.log("MOHAN : : " + chargeId)
      this.ChargeList.forEach(e => {
        if (e.trans_charge_code == chargeId) {
          this.pur_Order_Trans_Infos.patchValue({ rate_value: e.full_truck_load_rate });
        }
      })
    }

  }

  onchangeTransChargeCode(index, chargeId) {
    if (chargeId.length) {
      this.ChargeList[index].forEach(ele => {
        if (ele.trans_charge_code == chargeId) {

          if (this.pur_Order_Trans_Chgs_dyn.at(index).get("transport_rate").value == "PER TRUCK") {
            this.selectedTransacc[index] = ele.transportation_acc;
            this.selectedTdsacc[index] = ele.tds_acc;
            this.pur_Order_Trans_Chgs_dyn.at(index).patchValue({
              chgs_rate_value: ele.full_truck_load_rate, distance_in_km: ele.distance_in_km,
              uom: ele.uom,
              tax_code: ele.tax_code,
              tax_rate: ele.tax_rate,
              transportation_acc: ele.transportation_acc,

              allowed_shortage: ele.allowed_shortage,
              deduction_basedon: ele.deduction_basedon
            });

          }
          else {
            this.selectedTransacc[index] = ele.transportation_acc;
            this.selectedTdsacc[index] = ele.tds_acc;
            this.pur_Order_Trans_Chgs_dyn.at(index).patchValue({
              chgs_rate_value: ele.rate_uom, distance_in_km: ele.distance_in_km,
              uom: ele.uom,
              tax_code: ele.tax_code,
              tax_rate: ele.tax_rate,
              transportation_acc: ele.transportation_acc,

              allowed_shortage: ele.allowed_shortage,
              deduction_basedon: ele.deduction_basedon
            });
          }


        }
      })
      this.pur_Order_Trans_Chgs_dyn.at(index).patchValue({ charge_code: chargeId });
    }
  }

  delvAddrs: any = [];
  contAddrs: any = [];
  Addrs: any = [];
  payToDFrom: any = [];
  supplier_id = "";
  //id:any;
  onChangeSupplierName(suppid: string) {

    this.pur_Order_BPDetails.patchValue({
      cp_designation: null, cp_phone: null,
      cp_fax: null, cp_email: null, cp_address: null, supp_phone: null, supp_fax: null, supp_email: null, supp_address: null
    });
    this.userForm.patchValue({ pan_no: null, gst_no: null, cin_no: null, tan_no: null });

    this.addBroker();
    this.broker_sl_no = 0;
    while (this.pur_Order_broker.length)
      this.pur_Order_broker.removeAt(0);
    this.addBroker();

    this.contAddrs = [];
    this.delvAddrs = [];
    this.transporterNames = [];
    this.onChangePaymentMode("0");
    this.onChangeTcsApplicable("0");

    this.pur_Order_Terms_Con.patchValue({
      payment_terms: "0", account_name: null,
      account_no: null, bank_name: null, ifsc: null, mobile: null, iban: null, bic_swift_code: null, branch: null
    });

    this.pur_Order_Trans_Infos.patchValue({
      bic_swift_code: null, iban: null, payment_mode: "0", payment_terms: "0",
      bank_name: null, account_name: null, account_no: null, ifsc_code: null, mobile: null, branch: null, cash_limit: 0
    });

    if (suppid.length) {



      if (suppid == "0") {

      }
      else {

        this.DropDownListService.getSuppliertransport(suppid).subscribe(data12 => {



          if (data12[0].transport_own == 'YES') {
            //  this.status = false;
            this.supplier_id = suppid;
            forkJoin(
              this.DropDownListService.getSuppBPAcc(suppid),
              this.DropDownListService.getSupplierStatDtls(suppid),
              this.DropDownListService.getBrokerListBySupplierCode(suppid),
              this.DropDownListService.getAddrById(suppid),
              this.DropDownListService.getSuppAddrById(suppid),
              this.DropDownListService.getDeliveryAddrById(suppid),
              this.DropDownListService.getSuppContactNameList(suppid),
              this.DropDownListService.getTransporterThruSupplier(suppid)
            ).subscribe(([data, data1, data2, data3, data4, data5, data6, data7]) => {

              //console.log('Avijit');
              this.onChangePaymentMode(data["mode_of_pay"]);
              this.onChangeTcsApplicable(data["tcs_applicable"]);
              this.pur_Order_Terms_Con.patchValue({
                payment_mode: data["mode_of_pay"],
                payment_terms: data["pay_term"], cash_limit: data["cash_limit"],
                tcs_applicable: data["tcs_applicable"], tcs_rate: data["tcs_rate"],
                account_name: data["accountholder"], account_no: data["acc_no"],
                bank_name: data["bankname"], ifsc: data["ifsc"], mobile: data["mobile"],
                iban: data["iban"], bic_swift_code: data["bic_swift_code"], branch: data["branch"]
              });

              this.userForm.patchValue({
                pan_no: data1["pan_no"], gst_no: data1["gst_no"], cin_no: data1["cin_no"],
                tan_no: data1["tan_no"]
              });
              console.log("hello " + JSON.stringify(data2[0]["ven_code_name"]))
              if (data2[0]["ven_code_name"] == "0") {
                alert("Please Attach Broker Details in Supplier Master First !!!!!!!!!!!!");
                this.userForm.patchValue({ supplier_name: "" });

              } else {
                this.brokerNameList = data2;
              }





              this.pur_Order_BPDetails.patchValue({ supp_address: data3["address"] });

              if (data4["contact_person"] == "NA") {
                alert("Please Attach Contact Person Details in Supplier Master First !!!!!!!!!!!!");
                this.userForm.patchValue({ supplier_name: "" });

              } else {
                this.contAddrs = data4;
              }

              this.delvAddrs = data5;
              this.payToDFrom = data6;
              this.transporterNames = data7;
              this.status = true;
            });


          }

          if (data12[0].transport_own == 'NO') {
            //  this.status = false;
            this.supplier_id = suppid;
            forkJoin(
              this.DropDownListService.getSuppBPAcc(suppid),
              this.DropDownListService.getSupplierStatDtls(suppid),
              this.DropDownListService.getBrokerListBySupplierCode(suppid),
              this.DropDownListService.getAddrById(suppid),
              this.DropDownListService.getSuppAddrById(suppid),
              this.DropDownListService.getDeliveryAddrById(suppid),
              this.DropDownListService.getSuppContactNameList(suppid),
              // this.DropDownListService.getTransporterThruSupplier(suppid)
              // ).subscribe(([data, data1, data2, data3, data4, data5, data6, data7])=>
            ).subscribe(([data, data1, data2, data3, data4, data5, data6]) => {
              console.log("hello no transporter" + JSON.stringify(data2))
              this.onChangePaymentMode(data["mode_of_pay"]);
              this.onChangeTcsApplicable(data["tcs_applicable"]);
              this.pur_Order_Terms_Con.patchValue({
                payment_mode: data["mode_of_pay"],
                payment_terms: data["pay_term"], cash_limit: data["cash_limit"],
                tcs_applicable: data["tcs_applicable"], tcs_rate: data["tcs_rate"],
                account_name: data["accountholder"], account_no: data["acc_no"],
                bank_name: data["bankname"], ifsc: data["ifsc"], mobile: data["mobile"],
                iban: data["iban"], bic_swift_code: data["bic_swift_code"], branch: data["branch"]
              });

              this.userForm.patchValue({
                pan_no: data1["pan_no"], gst_no: data1["gst_no"], cin_no: data1["cin_no"],
                tan_no: data1["tan_no"]
              });

              console.log("hello " + JSON.stringify(data2[0]["ven_code_name"]))
              if (data2[0]["ven_code_name"] == "0") {
                alert("Please Attach Broker Details in Supplier Master First !!!!!!!!!!!!");
                this.userForm.patchValue({ supplier_name: "" });

              } else {
                this.brokerNameList = data2;
              }


              //this.brokerNameList = data2;
              this.pur_Order_BPDetails.patchValue({ supp_address: data3["address"] });


              if (data4["contact_person"] == "NA") {
                alert("Please Attach Contact Person Details in Supplier Master First !!!!!!!!!!!!");
                this.userForm.patchValue({ supplier_name: "" });

              } else {
                this.contAddrs = data4;
              }
              //   this.contAddrs  = data4;
              this.delvAddrs = data5;
              this.payToDFrom = data6;
              //this.transporterNames = data7;
              this.status = true;
            });


          }



        });

      }




    }
  }

  onChangeSuppInfoName(name: String) {
    this.pur_Order_BPDetails.patchValue({ supp_phone: null, supp_fax: null, supp_email: null });
    if (name != "0") {
      this.status = false;
      this.DropDownListService.getSupplierContDetails(this.supplier_id, name).subscribe(data => {
        this.pur_Order_BPDetails.patchValue({
          supp_phone: data["phone"],
          supp_fax: data["fax"], supp_email: data["email"]
        });
        this.status = true;
      });
    }
  }

  onChangeContInfoName(suppid: String) {
    this.pur_Order_BPDetails.patchValue({ cp_designation: null, cp_phone: null, cp_fax: null, cp_email: null, cp_address: null });
    if (suppid != '0') {
      this.status = false;
      this.DropDownListService.getSupplierDelvFromAdd(this.supplier_id, suppid).subscribe(data => {
        this.pur_Order_BPDetails.patchValue({
          cp_designation: data["designation"],
          cp_phone: data["phone"], cp_fax: data["fax"],
          cp_email: data["email"], cp_address: data["address"]
        });
        this.status = true;
      });
    }
  }

  onChangeBrokerName(index, broker_code: string) {
    this.pur_Order_broker.at(index).patchValue({
      basis: null, rate: null,
      brokerage_acc: null, tds_rate: null, tds_acc: null
    });
    if (broker_code != '0') {
      this.status = false;
      // this.DropDownListService.getBrokerDetailsByBrokerCode(broker_code).subscribe(data=>

      this.DropDownListService.getBrokerDetailsByBrokerCodenew(broker_code, this.supplier_id).subscribe(data => {
        console.log(" po  broker " + JSON.stringify(data))
        this.pur_Order_broker.at(index).patchValue({
          basis: data[0].basis, based_on: data[0].based_on,
          rate: data[0].rate, brokerage_acc: data[0].brokerage_acc, tds_rate: data[0].tds_rate, tds_acc: data[0].tds_acc
        });
        this.status = true;
      });
    }
  }



  _item_qty: any;
  _packing_qty: any;
  _mat_weight: any;
  _mrp: any;
  _taxrate: any;

  _taxAmt: any;
  _totalAmt: any;
  _priceBasedOn: any;
  _discountBasadOn: any;
  discountAmt: any;


  getPackingQty(packingQty, index) {

    let alluom: any = [];
    alluom = JSON.parse(localStorage.getItem("ALLUOM"));


    if (Number(this.userForm.get("id").value) > 0) {
     // if (this.userForm.get("ser_item_subtype").value == 'ITMT00002' || this.userForm.get("ser_item_subtype").value == 'ITMT00004') {
      if (this.userForm.get("ser_item_subtype").value == 'ITMT00004') {

        this.totalnumberofquantity = 0;

        this._packing_qty = packingQty.target.value;
        this._item_qty = this.pur_Order_Item_Details.at(index).get("stock_qty").value as FormControl;
        this._mrp = this.pur_Order_Item_Details.at(index).get("price").value as FormControl;
        this._mat_weight = this.pur_Order_Item_Details.at(index).get("mat_weight").value as FormControl;
        this._priceBasedOn = this.pur_Order_Item_Details.at(index).get('price_based_on').value as FormControl;
        this._discount = this.pur_Order_Item_Details.at(index).get('discount').value as FormControl;
        this._discountBasadOn = this.pur_Order_Item_Details.at(index).get('discount_basedon').value as FormControl;
        this._taxrate = this.pur_Order_Item_Details.at(index).get('tax_rate').value as FormControl;


        this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
          this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)



        for (let v = 0; v < this.pur_Order_Item_Details.length; v++) {


          this.totalnumberofquantity += Number(this.pur_Order_Item_Details.at(v).get("stock_qty").value);
        }

        this.userForm.patchValue({ total_qty: this.totalnumberofquantity });
      }
      else {
        //starts here
        //alert("hi: "+this.finalglobalqty);
        this.userForm.patchValue({ total_qty: this.finalglobalqty });


        this.totalnumberofquantity = 0;
        //console.log("pck qty/"+packingQty.target.value+"/"+this.capacity[index] + " / " + this.empty_bag_wt_priceBasedOn[index]+" / "+this.empty_bag_wt[index]+" / "+this.capacity[index]);
        this._packing_qty = packingQty.target.value;
        // this._item_qty = this.capacity[index] * this._packing_qty;


        //vineet starts here 
        if (this.pur_Order_Item_Details.at(index).get("stock_uom").value == "PCS") {
          //console.log("CHECK  1111");
          this._item_qty = Math.round(this.capacity[index] * this._packing_qty);
        }
        else {
          //console.log("CHECK  2222");
          alluom.forEach(element => {
            if (element.description == this.pur_Order_Item_Details.at(index).get("stock_uom").value) {
              this._item_qty = Number(this.capacity[index] * this._packing_qty).toFixed(Number(element.decimalv));
            }
          });

        }
        this.pur_Order_Item_Details.at(index).patchValue({ stock_qty: this._item_qty, toleranceqty: this._item_qty });
        //this.pur_Order_Item_Details.at(index).patchValue({stock_qty: Number(this._item_qty).toFixed(3),toleranceqty: Number(this._item_qty).toFixed(3)}); 

        //vineet ends



        if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') {

          this.pur_Order_Item_Details.at(index).patchValue({ mat_weight: (Math.round((this._item_qty - (this.empty_bag_wt[index] * this._packing_qty)) * 1000) / 1000).toFixed(3) });

        }

        else {

          this.pur_Order_Item_Details.at(index).patchValue({ mat_weight: ((Math.round((this._item_qty - (this._item_qty * this.empty_bag_wt[index]) / 100) * 1000)) / 1000).toFixed(3) });

        }
        // console.log("check1"+ this.pur_Order_Item_Details.at(index).get("mat_weight").value);



        this._mrp = this.pur_Order_Item_Details.at(index).get("price").value as FormControl;
        this._mat_weight = this.pur_Order_Item_Details.at(index).get("mat_weight").value as FormControl;
        this._priceBasedOn = this.pur_Order_Item_Details.at(index).get('price_based_on').value as FormControl;
        this._discount = this.pur_Order_Item_Details.at(index).get('discount').value as FormControl;
        this._discountBasadOn = this.pur_Order_Item_Details.at(index).get('discount_basedon').value as FormControl;
        this._taxrate = this.pur_Order_Item_Details.at(index).get('tax_rate').value as FormControl;


        this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
          this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)

        let unloadadvice_exist: boolean = false;
        this.DropDownListService.getPurchaseOrdernetWeightnew(this.userForm.get("pur_orderid").value, this.pur_Order_Item_Details.at(index).get("item_code").value, this.pur_Order_Item_Details.at(index).get("packing_item").value).subscribe(data => {
          console.log("purpose  :: " + data["purpose"])
          if (data["purpose"] == "true") {
            unloadadvice_exist = true;
          }
          else {
            unloadadvice_exist = false;
          }



          console.log(JSON.stringify(data))
          console.log(this.pur_Order_Item_Details.at(index).get("mat_weight").value + " / " + data["mat_weight"])

          console.log("exist " + unloadadvice_exist)
          if (unloadadvice_exist == true) {

            if (data["mat_weight"] > this.pur_Order_Item_Details.at(index).get("mat_weight").value) {
              alert("Material weight Lower Than Unloading advice Material weight please Insert Proper Data " + data["mat_weight"]);

              this.pur_Order_Item_Details.at(index).patchValue({ packing_qty: 0, stock_qty: 0, mat_weight: 0 })
            }

            let Netweight: number = 0;
            for (let b = 0; b < this.pur_Order_Item_Details.length; b++) {

              // Netweight+=Number(this.pur_Order_Item_Details.at(b).get("mat_weight").value);

              Netweight += Number(this.pur_Order_Item_Details.at(b).get("stock_qty").value);

            }
            console.log(this.finalglobalqty + " / " + Netweight)

            if (Number(this.finalglobalqty) >= Netweight) {

            }
            else {
              alert("Material weight Exceeded from Unloading advice Total Quantity please Insert Proper Data " + this.finalglobalqty);
              this.pur_Order_Item_Details.at(index).patchValue({ packing_qty: 0, stock_qty: 0, mat_weight: 0 });
            }

          }
          else {

            let Netweight: number = 0;
            console.log(" length " + this.pur_Order_Item_Details.length)
            for (let b = 0; b < this.pur_Order_Item_Details.length; b++) {
              console.log(" value " + this.pur_Order_Item_Details.at(b).get("stock_qty").value)
              Netweight += Number(this.pur_Order_Item_Details.at(b).get("stock_qty").value);
            }
            console.log(Netweight);
            this.userForm.patchValue({ total_qty: Netweight })
            this.finalglobalqty = Netweight;
          }

          this.status = true;
        });

        this.getchargesrateupdate(this.pur_Order_app_chgs.at(0).get("app_rate").value, 0)
        //ends here 
      }
    }
    else {
     // if (this.userForm.get("ser_item_subtype").value == 'ITMT00002' || this.userForm.get("ser_item_subtype").value == 'ITMT00004') {
      if (this.userForm.get("ser_item_subtype").value == 'ITMT00004') {

        this.totalnumberofquantity = 0;

        this._packing_qty = packingQty.target.value;
        this._item_qty = this.pur_Order_Item_Details.at(index).get("stock_qty").value as FormControl;
        this._mrp = this.pur_Order_Item_Details.at(index).get("price").value as FormControl;
        this._mat_weight = this.pur_Order_Item_Details.at(index).get("mat_weight").value as FormControl;
        this._priceBasedOn = this.pur_Order_Item_Details.at(index).get('price_based_on').value as FormControl;
        this._discount = this.pur_Order_Item_Details.at(index).get('discount').value as FormControl;
        this._discountBasadOn = this.pur_Order_Item_Details.at(index).get('discount_basedon').value as FormControl;
        this._taxrate = this.pur_Order_Item_Details.at(index).get('tax_rate').value as FormControl;


        this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
          this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)



        for (let v = 0; v < this.pur_Order_Item_Details.length; v++) {


          this.totalnumberofquantity += Number(this.pur_Order_Item_Details.at(v).get("stock_qty").value);
        }

        this.userForm.patchValue({ total_qty: this.totalnumberofquantity });
      }
      else {
        //starts here 

        this.totalnumberofquantity = 0;

        this._packing_qty = packingQty.target.value;
        //this._item_qty = this.capacity[index] * this._packing_qty;
        //toleranceqty new

        //vineet starts here

        //this.pur_Order_Item_Details.at(index).patchValue({stock_qty: Number(this._item_qty).toFixed(3),toleranceqty: Number(this._item_qty).toFixed(3),price_based_on:'With Packing'}); 
        //console.log("Enter  :: "+ this.pur_Order_Item_Details.at(index).get("stock_uom").value)
        if (this.pur_Order_Item_Details.at(index).get("stock_uom").value == "PCS") {
          this._item_qty = Math.round(this.capacity[index] * this._packing_qty);
          //console.log("VINEET   ::")
        }
        else {

          alluom.forEach(element => {
            //console.log(" DESC  ::  " + element.description);
            if (element.description == this.pur_Order_Item_Details.at(index).get("stock_uom").value) {
              //console.log(" TESt 222 ")
              let decivalue: number = element.decimalv;
              this._item_qty = Number(this.capacity[index] * this._packing_qty).toFixed(decivalue);
              //console.log("Check Value:::"+ this._item_qty)
            }
          });

        }
        this.pur_Order_Item_Details.at(index).patchValue({ stock_qty: this._item_qty, toleranceqty: this._item_qty, price_based_on: 'With Packing' });
        //vineet ends

        console.log(this.empty_bag_wt_priceBasedOn[index] + " // " + this.capacity[index])

        if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') {
          this.pur_Order_Item_Details.at(index).patchValue({ mat_weight: (Math.round((this._item_qty - (this.empty_bag_wt[index] * this._packing_qty)) * 1000) / 1000).toFixed(3), price_based_on: 'With Packing' });
        }
        else {
          this.pur_Order_Item_Details.at(index).patchValue({ mat_weight: ((Math.round((this._item_qty - (this._item_qty * this.empty_bag_wt[index]) / 100) * 1000)) / 1000).toFixed(3), price_based_on: 'With Packing' });
        }




        this._mrp = this.pur_Order_Item_Details.at(index).get("price").value as FormControl;
        this._mat_weight = this.pur_Order_Item_Details.at(index).get("mat_weight").value as FormControl;
        this._priceBasedOn = this.pur_Order_Item_Details.at(index).get('price_based_on').value as FormControl;
        this._discount = this.pur_Order_Item_Details.at(index).get('discount').value as FormControl;
        this._discountBasadOn = this.pur_Order_Item_Details.at(index).get('discount_basedon').value as FormControl;
        this._taxrate = this.pur_Order_Item_Details.at(index).get('tax_rate').value as FormControl;


        this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
          this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)



        for (let v = 0; v < this.pur_Order_Item_Details.length; v++) {


          this.totalnumberofquantity += Number(this.pur_Order_Item_Details.at(v).get("stock_qty").value);
        }

        this.userForm.patchValue({ total_qty: this.totalnumberofquantity });
        //ends here 
      }


    }


  }

  getItemQty(itemQty, index) {


    if (Number(this.userForm.get("id").value) > 0) {
      if (this.userForm.get("ser_item_subtype").value == 'ITMT00002' || this.userForm.get("ser_item_subtype").value == 'ITMT00004') {
        this.totalnumberofquantity = 0;
        this._packing_qty = this.pur_Order_Item_Details.at(index).get("packing_qty").value as FormControl;
        this._item_qty = itemQty.target.value;
        this.pur_Order_Item_Details.at(index).patchValue({ mat_weight: itemQty.target.value });
        this._mrp = this.pur_Order_Item_Details.at(index).get("price").value as FormControl;
        this._mat_weight = this.pur_Order_Item_Details.at(index).get("mat_weight").value as FormControl;
        this._priceBasedOn = this.pur_Order_Item_Details.at(index).get('price_based_on').value as FormControl;
        this._discount = this.pur_Order_Item_Details.at(index).get('discount').value as FormControl;
        this._discountBasadOn = this.pur_Order_Item_Details.at(index).get('discount_basedon').value as FormControl;
        this._taxrate = this.pur_Order_Item_Details.at(index).get('tax_rate').value as FormControl;
        this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
          this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)

        let unloadadvice_exist: boolean = false;
        this.DropDownListService.getPurchaseOrdernetWeightnew(this.userForm.get("pur_orderid").value, this.pur_Order_Item_Details.at(index).get("item_code").value, this.pur_Order_Item_Details.at(index).get("packing_item").value).subscribe(data => {

          if (data["purpose"] == "true") {
            unloadadvice_exist = true;
          }
          else {
            unloadadvice_exist = false;
          }
          //starts here 

          if (unloadadvice_exist == true) {


            if (data["mat_weight"] > this.pur_Order_Item_Details.at(index).get("mat_weight").value) {
              alert("Material weight Lower Than Unloading advice Material weight please Insert Proper Data " + data["mat_weight"]);

              this.pur_Order_Item_Details.at(index).patchValue({ packing_qty: 0, stock_qty: 0, mat_weight: 0, price_based_on: 'With Packing' })
            }


            let Netweight: number = 0;
            for (let b = 0; b < this.pur_Order_Item_Details.length; b++) {
              //Netweight+=Number(this.pur_Order_Item_Details.at(b).get("mat_weight").value);
              Netweight += Number(this.pur_Order_Item_Details.at(b).get("stock_qty").value);
            }
            console.log(this.finalglobalqty + " / " + Netweight)

            if (Number(this.finalglobalqty) >= Netweight) {

            }
            else {
              alert("Material weight Exceeded from Unloading advice Total Quantity please Insert Proper Data " + this.finalglobalqty);
              this.pur_Order_Item_Details.at(index).patchValue({ packing_qty: 0, stock_qty: 0, mat_weight: 0 });
            }


          }
          else {

            let Netweight: number = 0;
            console.log("length else " + this.pur_Order_Item_Details.length)
            for (let b = 0; b < this.pur_Order_Item_Details.length; b++) {
              console.log("value item " + this.pur_Order_Item_Details.at(b).get("stock_qty").value)
              Netweight += Number(this.pur_Order_Item_Details.at(b).get("stock_qty").value);
            }
            console.log(" net weight value " + Netweight);
            this.userForm.patchValue({ total_qty: Netweight });
            console.log("over after net we " + Netweight)
            this.finalglobalqty = Netweight;
            console.log("here check  " + this.finalglobalqty);
          }

          //ends here 
        });


        //  for (let v = 0; v < this.pur_Order_Item_Details.length; v++) {
        // this.totalnumberofquantity += Number(this.pur_Order_Item_Details.at(v).get("stock_qty").value);
        //}
        // this.userForm.patchValue({ total_qty: this.totalnumberofquantity });

      }
      else {
        //starts here 
        this.totalnumberofquantity = 0;
        this._packing_qty = this.pur_Order_Item_Details.at(index).get("packing_qty").value as FormControl;
        this._item_qty = itemQty.target.value;
        let itemstatus: boolean = true, itemstatusmin: boolean = true;

        //tolerance work 
        console.log(" this.pur_Order_Item_Details." + this.pur_Order_Item_Details.at(index).get("toleranceqty").value);
        if (this.pur_Order_Item_Details.at(index).get("toleranceqty").value == "0" || this.pur_Order_Item_Details.at(index).get("toleranceqty").value == 0)//first time item qty
        {
          //   this.pur_Order_Item_Details.at(index).patchValue({packing_qty: Math.round(itemQty.target.value/this.capacity[index])});

          if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') {

            this.pur_Order_Item_Details.at(index).patchValue({ mat_weight: (Math.round((this._item_qty - (this.empty_bag_wt[index] * (itemQty.target.value / this.capacity[index]))) * 1000) / 1000).toFixed(3), price_based_on: 'With Packing' });
            //this.pur_Order_Item_Details.at(index).patchValue({mat_weight: (this._item_qty - Math.round(this.empty_bag_wt[index]* (this.pur_Order_Item_Details.at(index).get("packing_qty").value)*1000)/1000).toFixed(3),price_based_on:'With Packing'});
          }
          else {
            this.pur_Order_Item_Details.at(index).patchValue({ mat_weight: ((Math.round((this._item_qty - (this._item_qty * this.empty_bag_wt[index]) / 100) * 1000)) / 1000).toFixed(3), price_based_on: 'With Packing' });
            // this.pur_Order_Item_Details.at(index).patchValue({mat_weight: Number(this._item_qty - (this._item_qty * this.empty_bag_wt[index])/100).toFixed(3),price_based_on:'With Packing'});
          }

          this._mrp = this.pur_Order_Item_Details.at(index).get("price").value as FormControl;
          this._mat_weight = this.pur_Order_Item_Details.at(index).get("mat_weight").value as FormControl;
          this._priceBasedOn = this.pur_Order_Item_Details.at(index).get('price_based_on').value as FormControl;
          this._discount = this.pur_Order_Item_Details.at(index).get('discount').value as FormControl;
          this._discountBasadOn = this.pur_Order_Item_Details.at(index).get('discount_basedon').value as FormControl;
          this._taxrate = this.pur_Order_Item_Details.at(index).get('tax_rate').value as FormControl;


          this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
            this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)

          let unloadadvice_exist: boolean = false;



          this.DropDownListService.getPurchaseOrdernetWeightnew(this.userForm.get("pur_orderid").value, this.pur_Order_Item_Details.at(index).get("item_code").value, this.pur_Order_Item_Details.at(index).get("packing_item").value).subscribe(data => {


            if (data["purpose"] == "true") {
              unloadadvice_exist = true;
            }
            else {
              unloadadvice_exist = false;
            }


            console.log(JSON.stringify(data))
            console.log(this.pur_Order_Item_Details.at(index).get("mat_weight").value + " / " + data["mat_weight"])
            console.log("exist " + unloadadvice_exist)
            if (unloadadvice_exist == true) {


              if (data["mat_weight"] > this.pur_Order_Item_Details.at(index).get("mat_weight").value) {
                alert("Material weight Lower Than Unloading advice Material weight please Insert Proper Data " + data["mat_weight"]);

                this.pur_Order_Item_Details.at(index).patchValue({ packing_qty: 0, stock_qty: 0, mat_weight: 0, price_based_on: 'With Packing' })
              }


              let Netweight: number = 0;
              for (let b = 0; b < this.pur_Order_Item_Details.length; b++) {
                //Netweight+=Number(this.pur_Order_Item_Details.at(b).get("mat_weight").value);
                Netweight += Number(this.pur_Order_Item_Details.at(b).get("stock_qty").value);
              }
              console.log(this.finalglobalqty + " / " + Netweight)

              if (Number(this.finalglobalqty) >= Netweight) {

              }
              else {
                alert("Material weight Exceeded from Unloading advice Total Quantity please Insert Proper Data " + this.finalglobalqty);
                this.pur_Order_Item_Details.at(index).patchValue({ packing_qty: 0, stock_qty: 0, mat_weight: 0, price_based_on: 'With Packing' });
              }


            }
            else {

              let Netweight: number = 0;
              console.log("length else " + this.pur_Order_Item_Details.length)
              for (let b = 0; b < this.pur_Order_Item_Details.length; b++) {
                console.log("value item " + this.pur_Order_Item_Details.at(b).get("stock_qty").value)
                Netweight += Number(this.pur_Order_Item_Details.at(b).get("stock_qty").value);
              }
              console.log(" net weight value " + Netweight);
              this.userForm.patchValue({ total_qty: Netweight });
              console.log("over after net we " + Netweight)
              this.finalglobalqty = Netweight;
              console.log("here check  " + this.finalglobalqty);
            }






            this.status = true;
          });




        }
        else {
          let minqty: number = (Number(this.pur_Order_Item_Details.at(index).get("toleranceqty").value) * ((100 - Number(this.tolerance[index])) / 100));
          let maxqty: number = (Number(this.pur_Order_Item_Details.at(index).get("toleranceqty").value) * ((100 + Number(this.tolerance[index])) / 100));

          itemstatusmin = Number(this._item_qty) >= minqty;
          itemstatus = Number(this._item_qty) <= maxqty;
          console.log("qty " + minqty + " / " + maxqty + " / " + this._item_qty + " / " + this.backupitemqty[index])

          if (itemstatus == true && itemstatusmin == true) {


            //     this.pur_Order_Item_Details.at(index).patchValue({packing_qty: Math.round(itemQty.target.value/this.capacity[index])});

            if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') {

              this.pur_Order_Item_Details.at(index).patchValue({ mat_weight: (Math.round((this._item_qty - (this.empty_bag_wt[index] * (itemQty.target.value / this.capacity[index]))) * 1000) / 1000).toFixed(3), price_based_on: 'With Packing' });
              //this.pur_Order_Item_Details.at(index).patchValue({mat_weight: (this._item_qty - Math.round(this.empty_bag_wt[index]* (this.pur_Order_Item_Details.at(index).get("packing_qty").value)*1000)/1000).toFixed(3),price_based_on:'With Packing'});
            }
            else {
              this.pur_Order_Item_Details.at(index).patchValue({ mat_weight: ((Math.round((this._item_qty - (this._item_qty * this.empty_bag_wt[index]) / 100) * 1000)) / 1000).toFixed(3), price_based_on: 'With Packing' });
              //this.pur_Order_Item_Details.at(index).patchValue({mat_weight: Number(this._item_qty - (this._item_qty * this.empty_bag_wt[index])/100).toFixed(3),price_based_on:'With Packing'});
            }

            this._mrp = this.pur_Order_Item_Details.at(index).get("price").value as FormControl;
            this._mat_weight = this.pur_Order_Item_Details.at(index).get("mat_weight").value as FormControl;
            this._priceBasedOn = this.pur_Order_Item_Details.at(index).get('price_based_on').value as FormControl;
            this._discount = this.pur_Order_Item_Details.at(index).get('discount').value as FormControl;
            this._discountBasadOn = this.pur_Order_Item_Details.at(index).get('discount_basedon').value as FormControl;
            this._taxrate = this.pur_Order_Item_Details.at(index).get('tax_rate').value as FormControl;


            this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
              this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)

            let unloadadvice_exist: boolean = false;



            this.DropDownListService.getPurchaseOrdernetWeightnew(this.userForm.get("pur_orderid").value, this.pur_Order_Item_Details.at(index).get("item_code").value, this.pur_Order_Item_Details.at(index).get("packing_item").value).subscribe(data => {

              if (data["purpose"] == "true") {
                unloadadvice_exist = true;
              }
              else {
                unloadadvice_exist = false;
              }


              //  console.log(JSON.stringify(data))
              // console.log(this.pur_Order_Item_Details.at(index).get("mat_weight").value + " / " + data["mat_weight"])
              // console.log("exist " + unloadadvice_exist)
              if (unloadadvice_exist == true) {


                if (data["mat_weight"] > this.pur_Order_Item_Details.at(index).get("mat_weight").value) {
                  alert("Material weight Lower Than Unloading advice Material weight please Insert Proper Data " + data["mat_weight"]);

                  this.pur_Order_Item_Details.at(index).patchValue({ packing_qty: 0, stock_qty: 0, mat_weight: 0, price_based_on: 'With Packing' })
                }


                let Netweight: number = 0;
                for (let b = 0; b < this.pur_Order_Item_Details.length; b++) {
                  //Netweight+=Number(this.pur_Order_Item_Details.at(b).get("mat_weight").value);
                  Netweight += Number(this.pur_Order_Item_Details.at(b).get("stock_qty").value);
                }
                console.log(this.finalglobalqty + " / " + Netweight)

                if (Number(this.finalglobalqty) >= Netweight) {

                }
                else {
                  alert("Material weight Exceeded from Unloading advice Total Quantity please Insert Proper Data " + this.finalglobalqty);
                  this.pur_Order_Item_Details.at(index).patchValue({ packing_qty: 0, stock_qty: 0, mat_weight: 0, price_based_on: 'With Packing' });
                }


              }
              else {

                let Netweight: number = 0;
                console.log("length" + this.pur_Order_Item_Details.length)
                for (let b = 0; b < this.pur_Order_Item_Details.length; b++) {
                  console.log("value" + this.pur_Order_Item_Details.at(b).get("stock_qty").value)
                  Netweight += Number(this.pur_Order_Item_Details.at(b).get("stock_qty").value);
                }
                console.log(Netweight)
                this.userForm.patchValue({ total_qty: Netweight })
                this.finalglobalqty = Netweight;
              }


              this.status = true;
            });



          }
          else {

            alert("Item Quantity is not Valid according to tolerance.Range must be in between  " + minqty + " to " + maxqty.toFixed(3));

            this.pur_Order_Item_Details.at(index).patchValue({ stock_qty: Number(this.pur_Order_Item_Details.at(index).get("toleranceqty").value).toFixed(3) });



            this.pur_Order_Item_Details.at(index).patchValue({ packing_qty: Math.round(this.pur_Order_Item_Details.at(index).get("toleranceqty").value / this.capacity[index]) });

            if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') {

              this.pur_Order_Item_Details.at(index).patchValue({ mat_weight: (Math.round((this.pur_Order_Item_Details.at(index).get("toleranceqty").value - (this.empty_bag_wt[index] * (this.pur_Order_Item_Details.at(index).get("toleranceqty").value / this.capacity[index]))) * 1000) / 1000).toFixed(3), price_based_on: 'With Packing' });
            }
            else { this.pur_Order_Item_Details.at(index).patchValue({ mat_weight: ((Math.round((this.pur_Order_Item_Details.at(index).get("toleranceqty").value - (this.pur_Order_Item_Details.at(index).get("toleranceqty").value * this.empty_bag_wt[index]) / 100) * 1000)) / 1000).toFixed(3), price_based_on: 'With Packing' }); }

            this._mrp = this.pur_Order_Item_Details.at(index).get("price").value as FormControl;
            this._mat_weight = this.pur_Order_Item_Details.at(index).get("mat_weight").value as FormControl;
            this._priceBasedOn = this.pur_Order_Item_Details.at(index).get('price_based_on').value as FormControl;
            this._discount = this.pur_Order_Item_Details.at(index).get('discount').value as FormControl;
            this._discountBasadOn = this.pur_Order_Item_Details.at(index).get('discount_basedon').value as FormControl;
            this._taxrate = this.pur_Order_Item_Details.at(index).get('tax_rate').value as FormControl;


            this.calculateItemData(this._packing_qty, this.pur_Order_Item_Details.at(index).get("toleranceqty").value, this._mrp, this._mat_weight,
              this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)

            let unloadadvice_exist: boolean = false;



            this.DropDownListService.getPurchaseOrdernetWeightnew(this.userForm.get("pur_orderid").value, this.pur_Order_Item_Details.at(index).get("item_code").value, this.pur_Order_Item_Details.at(index).get("packing_item").value).subscribe(data => {


              if (data["purpose"] == "true") {
                unloadadvice_exist = true;
              }
              else {
                unloadadvice_exist = false;
              }


              console.log(JSON.stringify(data))
              console.log(this.pur_Order_Item_Details.at(index).get("mat_weight").value + " / " + data["mat_weight"])
              console.log("exist " + unloadadvice_exist)
              if (unloadadvice_exist == true) {


                if (data["mat_weight"] > this.pur_Order_Item_Details.at(index).get("mat_weight").value) {
                  alert("Material weight Lower Than Unloading advice Material weight please Insert Proper Data " + data["mat_weight"]);

                  this.pur_Order_Item_Details.at(index).patchValue({ packing_qty: 0, stock_qty: 0, mat_weight: 0, toleranceqty: 0, price_based_on: 'With Packing' })
                }


                let Netweight: number = 0;
                for (let b = 0; b < this.pur_Order_Item_Details.length; b++) {
                  //Netweight+=Number(this.pur_Order_Item_Details.at(b).get("mat_weight").value);
                  Netweight += Number(this.pur_Order_Item_Details.at(b).get("stock_qty").value);
                }
                console.log(this.finalglobalqty + " / " + Netweight)

                if (Number(this.finalglobalqty) >= Netweight) {

                }
                else {
                  alert("Material weight Exceeded from Unloading advice Total Quantity please Insert Proper Data " + this.finalglobalqty);
                  this.pur_Order_Item_Details.at(index).patchValue({ packing_qty: 0, stock_qty: 0, mat_weight: 0, toleranceqty: 0, price_based_on: 'With Packing' });
                }


              }
              else {

                let Netweight: number = 0;
                console.log("length" + this.pur_Order_Item_Details.length)
                for (let b = 0; b < this.pur_Order_Item_Details.length; b++) {
                  console.log("value" + this.pur_Order_Item_Details.at(b).get("stock_qty").value)
                  Netweight += Number(this.pur_Order_Item_Details.at(b).get("stock_qty").value);
                }
                console.log(Netweight)
                this.userForm.patchValue({ total_qty: Netweight })
              }

              this.status = true;
            });



          }



        }
        //   alert(index + " / " + this.pur_Order_app_chgs.at(0).get("app_rate").value)
        this.getchargesrateupdate(this.pur_Order_app_chgs.at(0).get("app_rate").value, 0)
      }
      //ends here 

    }
    else {

      //here needs to change
      if (this.userForm.get("ser_item_subtype").value == 'ITMT00002' || this.userForm.get("ser_item_subtype").value == 'ITMT00004') {
        this.totalnumberofquantity = 0;
        this._packing_qty = this.pur_Order_Item_Details.at(index).get("packing_qty").value as FormControl;
        this._item_qty = itemQty.target.value;
        this.pur_Order_Item_Details.at(index).patchValue({ mat_weight: itemQty.target.value });
        this._mrp = this.pur_Order_Item_Details.at(index).get("price").value as FormControl;
        this._mat_weight = this.pur_Order_Item_Details.at(index).get("mat_weight").value as FormControl;
        this._priceBasedOn = this.pur_Order_Item_Details.at(index).get('price_based_on').value as FormControl;
        this._discount = this.pur_Order_Item_Details.at(index).get('discount').value as FormControl;
        this._discountBasadOn = this.pur_Order_Item_Details.at(index).get('discount_basedon').value as FormControl;
        this._taxrate = this.pur_Order_Item_Details.at(index).get('tax_rate').value as FormControl;
        this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
          this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
        for (let v = 0; v < this.pur_Order_Item_Details.length; v++) {
          this.totalnumberofquantity += Number(this.pur_Order_Item_Details.at(v).get("stock_qty").value);
        }
        this.userForm.patchValue({ total_qty: this.totalnumberofquantity });

      }
      else {
        this.totalnumberofquantity = 0;
        this._packing_qty = this.pur_Order_Item_Details.at(index).get("packing_qty").value as FormControl;
        this._item_qty = itemQty.target.value;
        let itemstatus: boolean = true, itemstatusmin: boolean = true;
        if (this.pur_Order_Item_Details.at(index).get("toleranceqty").value == "0" || this.pur_Order_Item_Details.at(index).get("toleranceqty").value == 0)//first time item qty
        {
          if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') {
            this.pur_Order_Item_Details.at(index).patchValue({ mat_weight: (this._item_qty - Math.round(this.empty_bag_wt[index] * (this.pur_Order_Item_Details.at(index).get("packing_qty").value) * 1000) / 1000).toFixed(3), price_based_on: 'With Packing' });
          }
          else {
            this.pur_Order_Item_Details.at(index).patchValue({ mat_weight: Number(this._item_qty - (this._item_qty * this.empty_bag_wt[index]) / 100).toFixed(3), price_based_on: 'With Packing' });
          }
          this._mrp = this.pur_Order_Item_Details.at(index).get("price").value as FormControl;
          this._mat_weight = this.pur_Order_Item_Details.at(index).get("mat_weight").value as FormControl;
          this._priceBasedOn = this.pur_Order_Item_Details.at(index).get('price_based_on').value as FormControl;
          this._discount = this.pur_Order_Item_Details.at(index).get('discount').value as FormControl;
          this._discountBasadOn = this.pur_Order_Item_Details.at(index).get('discount_basedon').value as FormControl;
          this._taxrate = this.pur_Order_Item_Details.at(index).get('tax_rate').value as FormControl;
          this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
            this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
          for (let v = 0; v < this.pur_Order_Item_Details.length; v++) {
            this.totalnumberofquantity += Number(this.pur_Order_Item_Details.at(v).get("stock_qty").value);
          }
          this.userForm.patchValue({ total_qty: this.totalnumberofquantity });
        }
        else {
          let minqty: number = (Number(this.pur_Order_Item_Details.at(index).get("toleranceqty").value) * ((100 - Number(this.tolerance[index])) / 100));
          let maxqty: number = (Number(this.pur_Order_Item_Details.at(index).get("toleranceqty").value) * ((100 + Number(this.tolerance[index])) / 100));
          itemstatusmin = Number(this._item_qty) >= minqty;
          itemstatus = Number(this._item_qty) <= maxqty;
          if (itemstatus == true && itemstatusmin == true) {
            if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') {

              this.pur_Order_Item_Details.at(index).patchValue({ mat_weight: (this._item_qty - Math.round(this.empty_bag_wt[index] * (this.pur_Order_Item_Details.at(index).get("packing_qty").value) * 1000) / 1000).toFixed(3), price_based_on: 'With Packing' });
            }
            else {
              this.pur_Order_Item_Details.at(index).patchValue({ mat_weight: Number(this._item_qty - (this._item_qty * this.empty_bag_wt[index]) / 100).toFixed(3), price_based_on: 'With Packing' });
            }
            this._mrp = this.pur_Order_Item_Details.at(index).get("price").value as FormControl;
            this._mat_weight = this.pur_Order_Item_Details.at(index).get("mat_weight").value as FormControl;
            this._priceBasedOn = this.pur_Order_Item_Details.at(index).get('price_based_on').value as FormControl;
            this._discount = this.pur_Order_Item_Details.at(index).get('discount').value as FormControl;
            this._discountBasadOn = this.pur_Order_Item_Details.at(index).get('discount_basedon').value as FormControl;
            this._taxrate = this.pur_Order_Item_Details.at(index).get('tax_rate').value as FormControl;

            this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
              this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)

            for (let v = 0; v < this.pur_Order_Item_Details.length; v++) {
              this.totalnumberofquantity += Number(this.pur_Order_Item_Details.at(v).get("stock_qty").value);
            }
            this.userForm.patchValue({ total_qty: this.totalnumberofquantity });

          }
          else {
            alert("Item Quantity is not Valid according to tolerance.Range must be in between  " + minqty + " to " + maxqty.toFixed(3));
            this.pur_Order_Item_Details.at(index).patchValue({ stock_qty: Number(this.pur_Order_Item_Details.at(index).get("toleranceqty").value).toFixed(3) });
            this.pur_Order_Item_Details.at(index).patchValue({ packing_qty: Math.round(this.pur_Order_Item_Details.at(index).get("toleranceqty").value / this.capacity[index]) });
            if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') {

              this.pur_Order_Item_Details.at(index).patchValue({ mat_weight: (Math.round((this.pur_Order_Item_Details.at(index).get("toleranceqty").value - (this.empty_bag_wt[index] * (this.pur_Order_Item_Details.at(index).get("toleranceqty").value / this.capacity[index]))) * 1000) / 1000).toFixed(3), price_based_on: 'With Packing' });
            }
            else { this.pur_Order_Item_Details.at(index).patchValue({ mat_weight: ((Math.round((this.pur_Order_Item_Details.at(index).get("toleranceqty").value - (this.pur_Order_Item_Details.at(index).get("toleranceqty").value * this.empty_bag_wt[index]) / 100) * 1000)) / 1000).toFixed(3), price_based_on: 'With Packing' }); }

            this._mrp = this.pur_Order_Item_Details.at(index).get("price").value as FormControl;
            this._mat_weight = this.pur_Order_Item_Details.at(index).get("mat_weight").value as FormControl;
            this._priceBasedOn = this.pur_Order_Item_Details.at(index).get('price_based_on').value as FormControl;
            this._discount = this.pur_Order_Item_Details.at(index).get('discount').value as FormControl;
            this._discountBasadOn = this.pur_Order_Item_Details.at(index).get('discount_basedon').value as FormControl;
            this._taxrate = this.pur_Order_Item_Details.at(index).get('tax_rate').value as FormControl;

            this.calculateItemData(this._packing_qty, this.pur_Order_Item_Details.at(index).get("toleranceqty").value, this._mrp, this._mat_weight,
              this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)

            for (let v = 0; v < this.pur_Order_Item_Details.length; v++) {
              this.totalnumberofquantity += Number(this.pur_Order_Item_Details.at(v).get("stock_qty").value);
            }
            this.userForm.patchValue({ total_qty: this.totalnumberofquantity });
          }
        }
      }
      //starts here
      //ends here
    }
  }

  getMatWt(matwt, index) {
    this._packing_qty = this.pur_Order_Item_Details.at(index).get("packing_qty").value as FormControl;
    this._item_qty = this.pur_Order_Item_Details.at(index).get("stock_qty").value as FormControl;
    this._mrp = this.pur_Order_Item_Details.at(index).get("price").value as FormControl;
    this._mat_weight = matwt.target.value;
    this._priceBasedOn = this.pur_Order_Item_Details.at(index).get('price_based_on').value as FormControl;
    this._discount = this.pur_Order_Item_Details.at(index).get('discount').value as FormControl;
    this._discountBasadOn = this.pur_Order_Item_Details.at(index).get('discount_basedon').value as FormControl;
    this._taxrate = this.pur_Order_Item_Details.at(index).get('tax_rate').value as FormControl;


    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  getPrice(price, index) {
    this._packing_qty = this.pur_Order_Item_Details.at(index).get("packing_qty").value as FormControl;
    this._item_qty = this.pur_Order_Item_Details.at(index).get("stock_qty").value as FormControl;
    this._mrp = price.target.value;
    this._mat_weight = this.pur_Order_Item_Details.at(index).get("mat_weight").value as FormControl;
    this._priceBasedOn = this.pur_Order_Item_Details.at(index).get('price_based_on').value as FormControl;
    this._discount = this.pur_Order_Item_Details.at(index).get('discount').value as FormControl;
    this._discountBasadOn = this.pur_Order_Item_Details.at(index).get('discount_basedon').value as FormControl;
    this._taxrate = this.pur_Order_Item_Details.at(index).get('tax_rate').value as FormControl;


    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  onChangePriceBasedOn(price_based_on, index) {
    this._packing_qty = this.pur_Order_Item_Details.at(index).get("packing_qty").value as FormControl;
    this._item_qty = this.pur_Order_Item_Details.at(index).get("stock_qty").value as FormControl;
    this._mrp = this.pur_Order_Item_Details.at(index).get("price").value as FormControl;
    this._mat_weight = this.pur_Order_Item_Details.at(index).get("mat_weight").value as FormControl;
    this._priceBasedOn = price_based_on.target.value;
    this._discount = this.pur_Order_Item_Details.at(index).get('discount').value as FormControl;
    this._discountBasadOn = this.pur_Order_Item_Details.at(index).get('discount_basedon').value as FormControl;
    this._taxrate = this.pur_Order_Item_Details.at(index).get('tax_rate').value as FormControl;


    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  getDiscount(discount, index) {
    this._packing_qty = this.pur_Order_Item_Details.at(index).get("packing_qty").value as FormControl;
    this._item_qty = this.pur_Order_Item_Details.at(index).get("stock_qty").value as FormControl;
    this._mrp = this.pur_Order_Item_Details.at(index).get("price").value as FormControl;
    this._mat_weight = this.pur_Order_Item_Details.at(index).get("mat_weight").value as FormControl;
    this._priceBasedOn = this.pur_Order_Item_Details.at(index).get('price_based_on').value as FormControl;
    this._discount = discount.target.value;
    this._discountBasadOn = this.pur_Order_Item_Details.at(index).get('discount_basedon').value as FormControl;
    this._taxrate = this.pur_Order_Item_Details.at(index).get('tax_rate').value as FormControl;


    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  onchangeDiscountBasedOn(dis_based_on, index) {
    this._packing_qty = this.pur_Order_Item_Details.at(index).get("packing_qty").value as FormControl;
    this._item_qty = this.pur_Order_Item_Details.at(index).get("stock_qty").value as FormControl;
    this._mrp = this.pur_Order_Item_Details.at(index).get("price").value as FormControl;
    this._mat_weight = this.pur_Order_Item_Details.at(index).get("mat_weight").value as FormControl;
    this._priceBasedOn = this.pur_Order_Item_Details.at(index).get('price_based_on').value as FormControl;
    this._discount = this.pur_Order_Item_Details.at(index).get('discount').value as FormControl;
    this._discountBasadOn = dis_based_on.target.value;
    this._taxrate = this.pur_Order_Item_Details.at(index).get('tax_rate').value as FormControl;


    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  calculateItemData(packingQty, ItemQty, price, matWt, PriceBasedOn, discount, discountBasedOn, taxrate, index) {
    if (PriceBasedOn == "Packing") { this.amt = price * packingQty }

    if (PriceBasedOn == "With Packing") { this.amt = price * ItemQty }
    if (PriceBasedOn == "Without Packing") { this.amt = price * matWt }

    if (PriceBasedOn == "0") { this.amt = 0 }

    if (discountBasedOn == "Uom") {
      //this.discountAmt = discount;
      this.discountAmt = discount * Number(this.pur_Order_Item_Details.at(index).get("mat_weight").value)
    }

    if (discountBasedOn == "%") { this.discountAmt = this.amt * (discount / 100); }

    if (discountBasedOn == "0") { this.discountAmt = 0 }

    let netAmt = this.amt - this.discountAmt;

    if (taxrate == 0) {
      this._taxAmt = 0;
    }
    else {
      this._taxAmt = netAmt * (taxrate / 100);
    }

    if (taxrate == 0 || this.cgst_amt[index] == null) {
      this._taxAmt = 0;
    }
    else {

      let cgst_amt = this.cgst_amt[index];
      let sgst_amt = this.sgst_amt[index];
      let igst_amt = this.igst_amt[index];


      if (cgst_amt == 0 && sgst_amt == 0 && igst_amt == 0) {
        this._taxAmt = 0;
      }
      else if (cgst_amt == 0) {
        this._taxAmt = Number(netAmt * (taxrate / 100)).toFixed(2);
      }
      else {
        let csgt_final = Number(netAmt * (cgst_amt / 100)).toFixed(2);
        let sgst_final = Number(netAmt * (sgst_amt / 100)).toFixed(2);
        this._taxAmt = Number(csgt_final) + Number(sgst_final);
      }
    }

    this._totalAmt = this._taxAmt + netAmt;
    console.log("Total amt :: " + this._totalAmt + " / " + netAmt + " / " + this._taxAmt)
    this.pur_Order_Item_Details.at(index).patchValue({
      amount: (Math.round(this.amt * 100) / 100).toFixed(2),
      discount_amount: (Math.round(this.discountAmt * 100) / 100).toFixed(2),
      net_amount: (Math.round(netAmt * 100) / 100).toFixed(2), taxable_amount: (Math.round(this.amt * 100) / 100).toFixed(2),
      tax_amount: Number(this._taxAmt.toFixed(2)), total_amount: Number((this._totalAmt * 100) / 100).toFixed(2)
    });
  }

  onchangeStoreItem(index, itemId) {
    if (itemId.length && itemId != "0") {
      console.log("Enter here" + itemId)
      let paclingitem = this.pur_Order_Item_Details.at(index).get("packing_item").value
      let checkstoreitemalreadyexist: boolean = false;
      for (let p = 0; p < this.pur_Order_Item_Details.length; p++) {
        if (this.pur_Order_Item_Details.at(p).get("classified_item_name").value == itemId && this.pur_Order_Item_Details.at(p).get("packing_item").value == paclingitem
        && this.pur_Order_Item_Details.at(index).get("item_code").value == this.pur_Order_Item_Details.at(p).get("item_code").value
         && p != index && this.userForm.get("ser_item_subtype").value == 'ITMT00004') {
          checkstoreitemalreadyexist = true;
        }
      }
      if (checkstoreitemalreadyexist == true) {
        this.pur_Order_Item_Details.at(index).patchValue({ classified_item_name: '' });
        this.selectedItemName[index] = "0";
        this.selectedPackingItem[index] = "0";

        alert("Item Name And Store Item And Packing Item are Same,Please Change....");
        this.deleteItem(index);
        this.status = true;
      }
      else {
        this.selectedItemNameclassified[index] = itemId;
        this.pur_Order_Item_Details.at(index).patchValue({ classified_item_name: itemId });
      }
      //console.log("index:"+ this.selectedItemNameclassified[index] )
      //console.log("Enter value here"+this.pur_Order_Item_Details.at(index).get("classified_item_name").value)
    }
  }

  selectedItemName = [];
  onchangeItemName(index, itemId) {

    if (itemId.length && itemId != "0") {
      this.status = false;
      let checkitemalreadyexist: boolean = false;
      for (let p = 0; p < this.pur_Order_Item_Details.length; p++) {
        if (this.pur_Order_Item_Details.at(p).get("item_code").value == itemId && p != index && this.userForm.get("ser_item_subtype").value != 'ITMT00004' && this.userForm.get("ser_item_subtype").value != 'ITMT00002') {
          checkitemalreadyexist = true;
        }
      }
      if (checkitemalreadyexist == true) {
        this.pur_Order_Item_Details.at(index).patchValue({ item_code: "0" });
        //this.selectedItemName[index]="0";
        this.deleteItem(index);
        alert("Item Name already exist,Please Change....");
        this.status = true;
      }
      else {
        this.selectedPackingItem[index] = [];
        this.selectedItemNameclassified[index] = [];
        this.pur_Order_Item_Details.at(index).patchValue({ item_code: itemId });
        forkJoin(
          this.DropDownListService.getItemNameById(itemId, this.company_name),
          this.DropDownListService.getItemMasterPackMat(itemId),
          this.DropDownListService.getItemMasterInvData1(itemId, this.company_name),
          this.DropDownListService.retriveItemMasterStatInfo(itemId, this.company_name),
          this.DropDownListService.getItemQCDetails(itemId, this.company_name),
          this.DropDownListService.taxList(),
          this.DropDownListService.retriveClassifiedItem(itemId, this.company_name),
        ).subscribe(([data, data1, data2, data3, data4, taxlist, storeitemlist]) => {
          this.DropDownListService.getUomName(data.mstock_unit).subscribe(data => {
            //  console.log("data.description // " + data["customuom_id"] + " / " + this.userForm.get("staticuom").value)
            //  if(this.userForm.get("ser_item_subtype").value == 'ITMT00001' ||this.userForm.get("ser_item_subtype").value == 'ITMT00002' )//changed by tuhin for packing bcz it need to done in store purchase
            if (this.userForm.get("ser_item_subtype").value == 'ITMT00001' || this.userForm.get("ser_item_subtype").value == 'ITMT00010' || this.userForm.get("ser_item_subtype").value == 'ITMT00008' || this.userForm.get("ser_item_subtype").value == 'ITMT00009') {
              if (data["customuom_id"] == this.userForm.get("staticuom").value) {

                this.pur_Order_Item_Details.at(index).patchValue({ stock_uom: data.description });
              }
              else {

                alert("Item Uom doesnt matched With Item Master Uom ");
                this.selectedItemName[index] = ['0'];

              }
            }
            if (this.userForm.get("ser_item_subtype").value == 'ITMT00004' || this.userForm.get("ser_item_subtype").value == 'ITMT00005' || this.userForm.get("ser_item_subtype").value == 'ITMT00002' || this.userForm.get("ser_item_subtype").value == 'ITMT00007') {
              //if ( this.userForm.get("ser_item_subtype").value == 'ITMT00005' || this.userForm.get("ser_item_subtype").value == 'ITMT00007') {
              this.pur_Order_Item_Details.at(index).patchValue({ stock_uom: data.description });
            }
            //tuhin added this bcz store entry will go through advice if weighment is checked true and they ahve to do conv factor
            if (this.userForm.get("ser_item_subtype").value == 'ITMT00002' && this.userForm.get("weightment_req").value == true) {
              this.pur_Order_Item_Details.at(index).patchValue({ stock_uom: data.description });
            }
          });

          if (this.userForm.get("ser_item_subtype").value == 'ITMT00004') {
            this.classified_item_namelist[index] = storeitemlist;
          } else { this.classified_item_namelist = []; }

          // console.log("data1::" + JSON.stringify(data1))
          this.packingItem[index] = data1;

          this.pur_Order_Item_Details.at(index).patchValue({ price: data2["mrp"] });

          let tax_list: any = [];
          tax_list = taxlist;
          tax_list.forEach(element => {
            console.log("foreach " + element.tax_id);
            if (element.tax_id == data3[0].tax_code) {

              this.pur_Order_Item_Details.at(index).patchValue({ tax_code: element.tax_name });
            }

          });

          this.pur_Order_Item_Details.at(index).patchValue({ tax_rate: data3[0].tax_rate });
          this.pur_Order_Item_Details.at(index).patchValue({ qc_norms: data4[0].qc_code });


          this.status = true;

          this.DropDownListService.taxlistbycode(data3[0].tax_code).subscribe(taxcatagory => {

            this.cgst_amt[index] = taxcatagory["cgst_act_val"];
            this.sgst_amt[index] = taxcatagory["sgst_act_val"]
            this.igst_amt[index] = taxcatagory["igst_act_val"]

          })


        });
      }
    }
  }


  itemId: any;
  packingQty: any;
  selectedPackingItem: any = [];
  packingItemCode: any = [];
  onchangePackingItem(index, packingId) {
    if (packingId.length && packingId != "0") {
      let check: boolean = true;
      let checkpackingItem: boolean = true;
      for (let v = 0; v < this.pur_Order_Item_Details.length; v++) {
        if (this.pur_Order_Item_Details.at(index).get("classified_item_name").value == this.pur_Order_Item_Details.at(v).get("classified_item_name").value
          && this.pur_Order_Item_Details.at(index).get("item_code").value == this.pur_Order_Item_Details.at(v).get("item_code").value
          && packingId == this.pur_Order_Item_Details.at(v).get("packing_item").value && index != v && this.userForm.get("ser_item_subtype").value == 'ITMT00004') {
          check = false;
        }
      /*  if (this.pur_Order_Item_Details.at(index).get("packing_item_code").value == this.pur_Order_Item_Details.at(v).get("packing_item_code").value
        && this.pur_Order_Item_Details.at(index).get("item_code").value == this.pur_Order_Item_Details.at(v).get("item_code").value
          && this.pur_Order_Item_Details.at(index).get("packing_type").value == this.pur_Order_Item_Details.at(v).get("packing_type").value
          && packingId == this.pur_Order_Item_Details.at(v).get("packing_item").value && index != v && this.userForm.get("ser_item_subtype").value == 'ITMT00002') {
          checkpackingItem = false;
        }*/
      }
      if (check == false) {
        alert("Item Name And Store Item And Packing Item are Same,Please Change....");
        this.pur_Order_Item_Details.at(index).patchValue({ classified_item_name: '' });
        this.selectedItemName[index] = "0";
        this.selectedPackingItem[index] = "0";
        this.deleteItem(index);
        this.status = true;
      }
     /* else if (checkpackingItem == false) {
        alert("Item Name And Packing Item And Code And Laminated/Non-laminated are Same,Please Change....");
        this.pur_Order_Item_Details.at(index).patchValue({ classified_item_name: '' });
        this.selectedItemName[index] = "0";
        this.selectedPackingItem[index] = "0";
        this.deleteItem(index);
        this.status = true;
      }*/
      else {
        this.status = false;
        this.pur_Order_Item_Details.at(index).patchValue({ packing_item: packingId })
        this.itemId = this.pur_Order_Item_Details.at(index).get("item_code").value as FormControl;
        this._packing_qty = this.pur_Order_Item_Details.at(index).get("packing_qty").value as FormControl;
        this._mrp = this.pur_Order_Item_Details.at(index).get("price").value as FormControl;
        this._mat_weight = this.pur_Order_Item_Details.at(index).get("mat_weight").value as FormControl;
        this._priceBasedOn = this.pur_Order_Item_Details.at(index).get('price_based_on').value as FormControl;
        this._discount = this.pur_Order_Item_Details.at(index).get('discount').value as FormControl;
        this._discountBasadOn = this.pur_Order_Item_Details.at(index).get('discount_basedon').value as FormControl;
        this._taxrate = this.pur_Order_Item_Details.at(index).get('tax_rate').value as FormControl;

        forkJoin(
          this.DropDownListService.getItemPackUom(this.itemId, packingId, this.company_name),
          this.DropDownListService.getItemNameByIdNew(packingId, this.company_name),
          this.DropDownListService.getPackingMasterCode(this.itemId, packingId)
        )
          .subscribe(([data, packingdata, pMasterCode]) => {

            console.log("data check1111 " + JSON.stringify(data) + data["tolerance"])

            this.packingItemCode[index] = pMasterCode;

            this.capacity[index] = data.capacity;

            this.tolerance[index] = data["tolerance"];



            this.empty_bag_wt[index] = data.empty_big_wt;
            this.empty_bag_wt_priceBasedOn[index] = data.empbagwt_based_on;//here setting  this.empty_bag_wt_priceBasedOn
            //this.pur_Order_Item_Details.at(index).patchValue({packing_uom: data.uom1}); 
            this.pur_Order_Item_Details.at(index).patchValue({ packing_uom: packingdata.mstock_unit_name });
            this._item_qty = this.capacity[index] * this._packing_qty;

            if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') { this.pur_Order_Item_Details.at(index).patchValue({ mat_weight: Number(this._item_qty - (this.empty_bag_wt[index] * this._packing_qty)).toFixed(3) }); }
            else { this.pur_Order_Item_Details.at(index).patchValue({ mat_weight: Number(this._item_qty - (this._item_qty * this.empty_bag_wt[index]) / 100).toFixed(3) }); }

            this.pur_Order_Item_Details.at(index).patchValue({ stock_qty: Number(this._item_qty).toFixed(3) });


            this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
              this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
            this.status = true;
          });
      }
    }
  }

  onchangePackingItemUom(index, packingId) {
    if (packingId.length && packingId != "0") {

      this.itemId = this.pur_Order_Item_Details.at(index).get("item_code").value as FormControl;
      this.DropDownListService.getItemPackUom(this.itemId, packingId, this.company_name).subscribe(data => {
        console.log("data check1111 " + JSON.stringify(data) + data["uom1"])

        this.pur_Order_Item_Details.at(index).patchValue({ packing_uom: data.uom1, packing_item: packingId });
        console.log("chk item pack:" + this.pur_Order_Item_Details.at(index).get("packing_item").value)
      });

    }

  }



  showList(s: string) {
    // alert(this.purchaseordersave+","+this.purchaseorderupdate+","+this.isHidden)
    if (this.purchaseordersave == true && this.purchaseorderupdate == true)//true exist  false not exist 
    {

      if (s == "add") {
        this.DropDownListService.areaList()
          .subscribe(data => {
            this.areaList = data;
          },
            (error) => {
              this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
              this.ngOnInit()
            });
        this.isHidden = true;
        this.referancetype = "0";
        this.BuUnit = 'CBU00001';
        this.storepurchase = false;
        this.potype_packing = false;
      }
    }
    if (this.purchaseordersave == true && this.purchaseorderupdate == false) {
      if (s == "add") {
        this.DropDownListService.areaList()
          .subscribe(data => {
            this.areaList = data;
          },
            (error) => {
              this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
              this.ngOnInit()
            });
        this.storepurchase = false;
        this.potype_packing = false;
        this.isHidden = true;
        this.referancetype = "0";
        this.BuUnit = 'CBU00001';

      }
    }

    if (s == "list") {
      //this.ngOnInit();

      this.isHidden = false;
      this.referancetype = "0";
      //window.location.reload();
      this.storepurchase = false;
      this.potype_packing = false;



      //this.ngOnInit();
      this.action = 'update';
      this.userForm.reset();
      //this.userForm.get("pur_order_no").reset();
      // this.userForm.get("pur_order_no").reset();

      //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      //this.poType = "0";


      this.pur_Order_Trans_Infos.reset();
      this.pur_Order_Terms_Con.reset();
      this.pur_Order_Terminations.reset();
      this.pur_Order_BPDetails.reset();


      this.packingItem = [];
      this.classified_item_namelist = [];
      this.selectedItemName = [];
      this.selectedPackingItem = [];
      this.selectedItemNameclassified = [];
      this.item_sl_no = 0;

      while (this.pur_Order_Item_Details.length)
        this.pur_Order_Item_Details.removeAt(0);
      this.addItem();

      this.broker_sl_no = 0;
      while (this.pur_Order_broker.length)
        this.pur_Order_broker.removeAt(0);
      this.addBroker();

      while (this.pur_Order_docs.length)
        this.pur_Order_docs.removeAt(0);
      this.addDocument();

      while (this.pur_Order_Terminations_dyn.length)
        this.pur_Order_Terminations_dyn.removeAt(0);
      this.add8();

      while (this.pur_Order_app_chgs.length)
        this.pur_Order_app_chgs.removeAt(0);
      this.add7();

      this.ngOnInit();



    }
  }

  add7() {
    this.pur_Order_app_chgs.push(this.fb.group({
      charges_name: '',
      add_less: '',
      rate_cal_method: '',
      app_rate: '',
      tax_rate: '',
      amount: '',
      required: ''
    }));
  }

  add8() {
    this.pur_Order_Terminations_dyn.push(this.fb.group({
      charge_name: '',
      termination_cal: '',
      cal_qty: '',
      amount: '',
      method: '',
      tax_rate: '',
      qty: '',
      rate: '',
      gl_account: '',
      tax_amount: '',
      total_amount: '',
    }));
  }
  
  addItem() {
    this.item_sl_no = this.item_sl_no + 1;

    this.pur_Order_Item_Details.push(this.fb.group({
      slno: this.item_sl_no,
      item_code: '',
      classified_item_name: '',
      packing_item: '',
      packing_item_code: '',
      packing_size: '',
      packing_weight: '',
      packing_type: '',
      packing_uom: '',
      packing_qty: '',
      stock_uom: '',
      stock_qty: '',
      toleranceqty: '0',
      price: '',
      con_factor: '0',
      mat_weight: '',
      price_based_on: '',
      amount: '',
      taxable_amount: '',
      discount: '',
      discount_basedon: '',
      discount_amount: '',
      net_amount: '',
      tax_code: '',
      tax_amount: '',
      total_amount: '',
      qc_norms: '',
      priority: '',
      delivery_date: '',
      purpose: '',
      to_be_used: '',
      remarks: '',
      tax_rate: '',
      packing_list_req: '',
      packing_list: '',
      adjusted_remarks: '',
      adjusted_qty: ''
      // weight_tolerance: ''
    }));


    if (Number(this.userForm.get("id").value) > 0) {

    }
    else {
      this.empty_bag_wt[this.item_sl_no - 1] = 0;
      this.capacity[this.item_sl_no - 1] = 1;
      this.tolerance[this.item_sl_no - 1] = 0;
      this.backupitemqty[this.item_sl_no - 1] = 0;
      this.backuppackingqty[this.item_sl_no - 1] = 0;
    }

    this.pur_Order_Item_Details.at(this.item_sl_no - 1).patchValue({
      packing_qty: 0, stock_qty: 0, toleranceqty: 0, price_based_on: "0",
      mat_weight: 0, price: 0, tax_rate: 0, discount: 0, discount_basedon: "0",adjusted_qty:0
      // weight_tolerance: 0
    });
  }

  deleteItem(index) {
    if (this.item_sl_no > 1) {
      /* this.itemList.splice(index, 1);
       this.packingItem.splice(index, 1);
       this.classified_item_namelist.splice(index, 1);*/
      this.capacity.splice(index, 1);
      this.tolerance.splice(index, 1);

      this.cgst_amt.splice(index, 1);
      this.sgst_amt.splice(index, 1);
      this.igst_amt.splice(index, 1);

      this.backupitemqty.splice(index, 1);
      this.backuppackingqty.splice(index, 1);

      this.pur_Order_Item_Details.removeAt(index);
      this.item_sl_no = this.item_sl_no - 1;
    }
    else {
      this.item_sl_no = 1;
      alert("can't delete all rows");
      this.pur_Order_Item_Details.reset();
      this.pur_Order_Item_Details.at(0).patchValue({ slno: this.item_sl_no });
    }

    for (let i = 1; i <= this.item_sl_no; i++)
      this.pur_Order_Item_Details.at(i - 1).patchValue({ slno: i });


    //changes on 14-04-2022
    //alert(this.pur_Order_Item_Details.length);
    this.totalnumberofquantity = 0;
    for (let v = 0; v < this.pur_Order_Item_Details.length; v++) {
      this.totalnumberofquantity += Number(this.pur_Order_Item_Details.at(v).get("mat_weight").value);
    }

    this.userForm.patchValue({ total_qty: this.totalnumberofquantity });
    //changes ends on 14-04-2022

  }

  addBroker() {
    this.broker_sl_no = this.broker_sl_no + 1;
    this.pur_Order_broker.push(this.fb.group({
      sl_no: this.broker_sl_no,
      ven_code_name: '',
      basis: '',
      rate: '',
      amount: '',
      tax_rate: '',
      tax_amount: '',
      total_amount: '',
      brokerage_acc: '',
      tds_acc: '',
      tds_rate: ''
    }));
  }

  deleteBroker(index) {
    if (this.broker_sl_no > 1) {
      this.pur_Order_broker.removeAt(index);
      this.broker_sl_no = this.broker_sl_no - 1;
    }
    else {
      this.broker_sl_no = 1;
      alert("can't delete all rows");
      this.pur_Order_broker.reset();
      this.pur_Order_broker.at(0).patchValue({ sl_no: this.broker_sl_no });
    }

    for (let i = 1; i <= this.broker_sl_no; i++)
      this.pur_Order_broker.at(i - 1).patchValue({ sl_no: i });

  }

  addChgs() {
    this.chgs_sl_no = this.chgs_sl_no + 1;

    this.pur_Order_Trans_Chgs_dyn.push(this.fb.group({
      slno: this.chgs_sl_no,
      mode_of_trans: '',
      transport_from: '',
      transport_to: '',
      transporter_name: '',
      transport_rate: '',
      charge_code: '',
      chgs_rate_value: '',
      chgs_remarks: '',
      distance_in_km: '',
      uom: '',
      tax_code: '',
      tax_rate: '',
      transportation_acc: '',
      tds_code: '',
      tds_codename: '',
      tds_rate: '',
      tds_acc: '',
      tds_accname: '',
      allowed_shortage: '',
      deduction_basedon: '',
      charge_id: ''

    }));
  }

  deleteChgs(index) {
    this.ChargeList.splice(index, 1);

    this.pur_Order_Trans_Chgs_dyn.removeAt(index);
    this.chgs_sl_no = this.chgs_sl_no - 1;
  }

  addStoreCharge() {
    this.pur_order_store_chgs.push(this.fb.group({
      charges_name: '',
      charges_acc: '',
      store_cgst: '',
      store_sgst: '',
      store_igst: '',
      store_amount:'',
      store_taxrate:''
    }));
  }
 
  deleteStoreCharge(index) 
  {
    if(index)
    {this.pur_order_store_chgs.removeAt(index);}
    else
    {alert("can't delete all rows");} 
  }

  addDocument() {
    this.pur_Order_docs.push(this.fb.group({
      doc_name: ''
    }));
  }

  // deleteDocument(index) 
  // {
  //   if(index)
  //   {this.pur_Order_docs.removeAt(index);}
  //   else
  //   {
  //     alert("can't delete all rows");
  //     this.pur_Order_docs.reset();
  //   }
  // }

  onchangeAddress(ship_to_addr_id: String) {
    if (ship_to_addr_id) {
      this.status = false;
      this.DropDownListService.getAddrById(ship_to_addr_id).subscribe(data => {
        this.userForm.patchValue({ ship_to_addr: data["address"] });
        this.status = true;
      });
    }
  }

  isTranporterInfoIsDisabled = false;
  onChangeTransportBorneBy(transBornBy: string) {
    // console.log("transBornBy"+transBornBy)
    if (transBornBy == 'FOB')  //Company Pay the fare
    {
      //  console.log("Vineet :: "+transBornBy);
      this.isTranporterInfoIsDisabled = false;
      this.userForm.patchValue({ trans_borne_by_chgs: 'FOB' });
      this.transportCharges = true;
      /* this.pur_Order_Trans_Infos.patchValue({mode_of_trans: null, transporter_name: null,
        transport_rate: null, charge_code: null, rate_value: null, payment_mode: null,
        payment_terms: null, bank_name: null, account_name: null, account_no: null,
        branch: null, iban: null, bic_swift_code: null, cash_limit: null, ifsc_code: null, mobile: null}) */
    }
    else {
      this.isTranporterInfoIsDisabled = true;
      this.userForm.patchValue({ trans_borne_by_chgs: 'FOR' });    ////Company not Pay the fare(Free)
      this.transportCharges = false;
      //this.pur_Order_Trans_Infos.patchValue({charge_code:"Phase II"});
    }
  }

  onChangeShipToAddId(businessunit_code: String) {
    this.userForm.patchValue({ ship_to_addr: null });
    if (businessunit_code != '0') {
      this.status = false;
      this.DropDownListService.getCompanyBUAddress(businessunit_code).subscribe(data => {
        console.log(" CHECK : : " + JSON.stringify(data))
        this.userForm.patchValue({ ship_to_addr: data["add"] });
        this.status = true;
      });
    }
  }

  onChangePayToDForm(dForm: string) {
    this.userForm.patchValue({ pay_to_addr: null });
    if (dForm != '0') {
      this.status = false;
      this.DropDownListService.getSuppDelvAddress(this.supplier_id, dForm).subscribe(data => {
        this.userForm.patchValue({ pay_to_addr: data["address"] + ", " + data["city"] + ", " + data["pincode"] });
        this.status = true;
      });
    }
  }

  onChangeReferenceType(reference_type: string) {
    this._referenceNo = reference_type;

    if (reference_type == '0') {
      this.isReadOnly = false;
      this.userForm.patchValue({ pref_doc_no: '' });
      this.capacity = [];
      this.empty_bag_wt = [];
      this.tolerance = [];
      this.empty_bag_wt_priceBasedOn = [];
      this.selectedItemName = [];
      this.selectedPackingItem = [];
      this.selectedItemNameclassified = [];
      this.packingItem = [];
      this.classified_item_namelist = [];
    }
    else if (reference_type == 'frompo') {
      this.isReadOnly = false;
      this.userForm.patchValue({ pref_doc_no: '' });
      if (this.userForm.get("supplier_name").value == "" || this.userForm.get("supplier_name").value == null) {
        alert("Please Select Supplier Name ");
      }
      else {
        forkJoin
          (
            this.DropDownListService.getLastPOThruSupItemDtls(this.userForm.get("supplier_name").value),
            this.DropDownListService.getLastPOThruSupPurDtls(this.userForm.get("supplier_name").value)
          )
          .subscribe(([itemData, SupPurDtls]) => {
            //console.log("Enter  "+JSON.stringify(SupPurDtls[0]));
            //this.userForm.patchValue(SupPurDtls[0]);
            this.userForm.patchValue({
              ser_item_subtype: SupPurDtls[0]["ser_item_subtype"],
              pur_ord_type: SupPurDtls[0]["pur_ord_type"],
              supplier_name: SupPurDtls[0]["supplier_name"],
              businessunit: SupPurDtls[0]["businessunit"],
              po_fullfillment: SupPurDtls[0]["po_fullfillment"],
              no_of_advice: SupPurDtls[0]["no_of_advice"],
              referance_type: SupPurDtls[0]["referance_type"],
              pref_doc_no: SupPurDtls[0]["pref_doc_no"],
              receipt_criteria: SupPurDtls[0]["receipt_criteria"],
              tagadvice_status: SupPurDtls[0]["tagadvice_status"],
              broker_info: SupPurDtls[0]["broker_info"],
              staticuom: SupPurDtls[0]["staticuom"],
              total_qty: SupPurDtls[0]["total_qty"]
            })
            this.capacity = [];
            this.empty_bag_wt = [];
            this.tolerance = [];
            this.empty_bag_wt_priceBasedOn = [];
            this.selectedItemName = [];
            this.selectedPackingItem = [];
            this.selectedItemNameclassified = [];
            this.packingItem = [];
            this.classified_item_namelist = [];
            let k = 0;
            this.addItem();
            this.item_sl_no = 0;
            while (this.pur_Order_Item_Details.length)
              this.pur_Order_Item_Details.removeAt(0);
            for (let data1 of itemData) {
              this.status = false;
              forkJoin(
                this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing_item"], this.company_name),
                this.DropDownListService.retriveClassifiedItem(data1["item_code"], this.company_name),
              ).subscribe(([packingList, capacityEmptyWt, stockitemList]) => {
                // console.log("chen empty bag/"+JSON.stringify(capacityEmptyWt));
                this.status = true;
                this.capacity[k] = capacityEmptyWt.capacity;
                this.empty_bag_wt[k] = capacityEmptyWt.empty_big_wt;
                this.tolerance[k] = capacityEmptyWt.tolerance;
                // console.log("chen empty bag/"+this.empty_bag_wt[k]);
                this.empty_bag_wt_priceBasedOn[k] = capacityEmptyWt.empbagwt_based_on;//changes made 20-04-2022
                this.selectedItemName[k] = data1["item_code"];
                this.selectedPackingItem[k] = data1["packing_item"];
                // console.log("packingList " + JSON.stringify(packingList))
                this.packingItem[k] = packingList;
                this.addItem();
                //console.log("chen empty bag/"+this.empty_bag_wt[k]);
                this.pur_Order_Item_Details.at(k).patchValue(data1);
                this.pur_Order_Item_Details.at(k).get("packing_item").value;
                if (SupPurDtls[0]["ser_item_subtype"] == 'ITMT00004') {
                  this.selectedItemNameclassified[k] = data1["classified_item_name"];
                  this.classified_item_namelist[k] = stockitemList;
                }
                else {
                  this.selectedItemNameclassified = [];
                  this.classified_item_namelist = [];
                }
                k = k + 1;
              });

            }
          });
      }


      //this.frompolist

    }
    else {
      this.isReadOnly = true;
      this.userForm.patchValue({ pref_doc_no: 'No' });
      this.capacity = [];
      this.empty_bag_wt = [];
      this.tolerance = [];
      this.empty_bag_wt_priceBasedOn = [];
      this.selectedItemName = [];
      this.selectedPackingItem = [];
      this.selectedItemNameclassified = [];
      this.packingItem = [];
      this.classified_item_namelist = [];
    }

  }
  uomchanged(event) {
    if (event.checked == true) {
      this.nouom = false;

      //tuhin changes here starts 
      if (this.poType == 'ITMT00002' || this.poType == 'ITMT00004' || this.poType == 'ITMT00005' || this.poType == 'ITMT00007') //direct grn entry
      {
        this.userForm.patchValue({ receipt_criteria: 'NA' });
        this.potype_status = false;
        this.DropDownListService.getCustomUOMs("WUOM").subscribe(uOMdata => {

          this.customUOMs = uOMdata;
          this.status = true;
        });

        this.nouom = false;
      }
      else {
        this.potype_status = true;
      }

      //tuhin changes here ends  
    }
    if (event.checked == false) {
      this.nouom = true;
      this.userForm.patchValue({ staticuom: '0' });
    }

  }
  onChangeAdvice(advice) {
    //weighment req checque uncheque
    if ((this.poType == 'ITMT00001' || this.poType == 'ITMT00010' || this.poType == 'ITMT00008' || this.poType == 'ITMT00009') && advice == 'Yes') {
      this.userForm.patchValue({ weightment_req: true });
      this.disabeWeighment = true;
      this.nouom = true;
    }
    else {
      this.userForm.patchValue({ weightment_req: false });
      this.disabeWeighment = true;
      this.nouom = false;

    }

    if (advice == 'Yes' && this.po_fullfillment.value == 'Yes') {
      //this.show_no_advance = true;
      this.show_no_advance = false;
      if (this.userForm.get("weightment_req").value == true || this.userForm.get("weightment_req").value == "true") {
        this.nouom = false;
      }
      else {
        this.nouom = true;
      }
    }
    else {
      //this.show_no_advance = false;
      this.show_no_advance = true;
      this.userForm.patchValue({ no_of_advice: "" });

      if (this.userForm.get("weightment_req").value == true || this.userForm.get("weightment_req").value == "true") {
        this.nouom = false;
      }
      else {
        this.nouom = true;
      }
    }
    //work on 22082022 starts
    if ((this.userForm.get("ser_item_subtype").value == 'ITMT00004' || this.userForm.get("ser_item_subtype").value == 'ITMT00005' || this.userForm.get("ser_item_subtype").value == 'ITMT00002' || this.userForm.get("ser_item_subtype").value == 'ITMT00007') && advice == 'No') {
      this.userForm.patchValue({ weightment_req: false });
      this.disabeWeighment = true;
      this.nouom = true;
      console.log("1st" + this.nouom)
    }
    else {
      this.disabeWeighment = false;
      if (this.userForm.get("weightment_req").value == true || this.userForm.get("weightment_req").value == "true") {
        this.nouom = false;
      }
      else {
        this.nouom = true;
      }
      console.log("2nd" + this.nouom)
    }
    //work on 22082022 ends
  }

  onChangeAdviceCount(advice_count) {
    if (advice_count == 'Yes' && this.advice_req.value == 'Yes') {
      //this.show_no_advance = true;
      this.show_no_advance = false;


    }
    else {
      //this.show_no_advance = false;
      this.show_no_advance = true;

      this.userForm.patchValue({ no_of_advice: "" });
    }
  }
  onNoadviceButtonShow() {
    if (this.advice_req.value != 'Yes' && this.po_fullfillment.value != 'Yes') { this.show_no_advance = false; }
  }
  // onChangeReferenceType(referenceNo:String)
  // {
  //   if(referenceNo.length)
  //   {
  //     this._referenceNo = referenceNo;
  //     if(referenceNo == '0')
  //     {this.refNo = false;}
  //     else
  //     {this.refNo = true;}
  //   }
  // }

  taxRate: any;
  taxId: any
  amt: any;
  taxAmt: any;
  _discount: any;
  showPopUp1(index) {
    this._discount = this.pur_Order_Item_Details.at(index).get('discount').value as FormControl;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: index };
    const dialogRef = this.dialog.open(TaxPopUpModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      this.taxRate = data["tax_rate"];
      this.taxId = data["tax_id"];
      this.pur_Order_Item_Details.at(index).patchValue({ tax_code: this.taxId, tax_rate: this.taxRate });
      this._packing_qty = this.pur_Order_Item_Details.at(index).get("packing_qty").value as FormControl;
      this._item_qty = this.pur_Order_Item_Details.at(index).get("stock_qty").value as FormControl;
      this._mrp = this.pur_Order_Item_Details.at(index).get("price").value as FormControl;
      this._mat_weight = this.pur_Order_Item_Details.at(index).get("mat_weight").value as FormControl;
      this._priceBasedOn = this.pur_Order_Item_Details.at(index).get('price_based_on').value as FormControl;
      this._discount = this.pur_Order_Item_Details.at(index).get('discount').value as FormControl;
      this._discountBasadOn = this.pur_Order_Item_Details.at(index).get('discount_basedon').value as FormControl;
      this._taxrate = data["tax_rate"];

      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index);
      this.pur_Order_Trans_Chgs_dyn.at(index).patchValue({ tax_code: data["tax_id"], tax_rate: data["tax_rate"] });

    });
  }

  itemCode: any;
  showPopUp2(index) {
    this.itemCode = this.pur_Order_Item_Details.at(index).get('item_code').value as FormControl;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: index, item_code: this.itemCode };
    const dialogRef = this.dialog.open(QcNormPopUpModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => { this.pur_Order_Item_Details.at(index).patchValue({ qc_norms: data["qc_code"] }); });
  }

  onClickShow() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: 0 };
    if (this.poType != "0") {
      if (this._referenceNo == "pur003") {
        let dialogref;
        dialogref = this.dialog.open(IndentOrderPopUpModalComponent, { data: { ref_type: "pur003", item_type: this.poType } });
        dialogref.afterClosed().subscribe(data => {
          if (data != '' && data["indent_id"] != "0") {
            this.userForm.patchValue({ referance_id: data["indent_id"] });
            this.packingItem = [];
            this.classified_item_namelist = [];
            this.selectedPackingItem = [];
            this.selectedItemNameclassified = [];
            this.selectedItemName = [];
            let i = 0;

            this.addItem();
            this.item_sl_no = 0;
            while (this.pur_Order_Item_Details.length)
              this.pur_Order_Item_Details.removeAt(0);

            for (let data1 of data.pur_Indent_Details) {
              if (data1.checkbox == true) {
                this.status = false;
                forkJoin(
                  this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                  this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing_item"], this.company_name)
                ).subscribe(([packingList, capacityEmptyWt]) => {
                  this.status = true;
                  this.capacity[i] = capacityEmptyWt.capacity;
                  this.empty_bag_wt[i] = capacityEmptyWt.empty_big_wt;
                  this.selectedItemName[i] = data1["item_code"];
                  this.selectedPackingItem[i] = data1["packing_item"];
                  this.packingItem[i] = packingList;
                  this.addItem();
                  this.pur_Order_Item_Details.at(i).patchValue({
                    item_code: data1.item_code, packing_item: data1.packing_item,
                    packing_uom: data1.stock_pack_uom, packing_qty: data1.indent_pack_qty, stock_uom: data1.stock_item_uom,
                    stock_qty: data1.indent_item_qty, mat_weight: data1["mat_weight"],
                    price: data1.indicative_price, price_based_on: data1.price_based_on, amount: data1.amount,
                    taxable_amount: data1.amount, net_amount: data1.net_amount, tax_code: data1.tax_code,
                    tax_rate: data1.tax_rate, tax_amount: data1.tax_amount, total_amount: data1.total_amount,
                    qc_norms: data1.qc_norms, priority: data1.priority, delivery_date: data1.delivery_date,
                    purpose: data1.purpose, to_be_used: data1.to_be_used, remarks: data1.remarks
                  });
                  if (data1.price_based_on == "Item")
                    this.pur_Order_Item_Details.at(i).patchValue({ price_based_on: "With Packing" });
                  i = i + 1;
                });
              }
            }

            this.status = false;
            this.DropDownListService.getPurIndentDtls(data.indent_id).subscribe(data => {
              this.status = true;
              this.userForm.patchValue({ remarks: data.remarks, ser_item_subtype: data.ser_item_type });
            });
          }
        });
      }

      if (this.supplier_id != "") {
        if (this._referenceNo == "pur004") {
          let dialogref;
          dialogref = this.dialog.open(PurchaseEnqPopUpModalComponent, { data: { ref_type: "pur004", supplier_id: this.supplier_id, item_type: this.poType } });
          dialogref.afterClosed().subscribe(data => {
            if (data != '' && data["enquiry_id"] != "0") {
              this.userForm.patchValue({ referance_id: data["enquiry_id"] });
              this.packingItem = [];
              this.classified_item_namelist = [];
              this.selectedItemName = [];
              this.selectedPackingItem = [];
              this.selectedItemNameclassified = [];
              let i = 0;

              this.addItem();
              this.item_sl_no = 0;
              while (this.pur_Order_Item_Details.length)
                this.pur_Order_Item_Details.removeAt(0);

              for (let data1 of data.EnquiryServiceDetails) {
                if (data1.checkbox == true) {
                  this.status = false;
                  forkJoin(
                    this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                    this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing_item"], this.company_name)
                  ).subscribe(([packingList, capacityEmptyWt]) => {
                    this.status = true;
                    this.capacity[i] = capacityEmptyWt.capacity;
                    this.empty_bag_wt[i] = capacityEmptyWt.empty_big_wt;
                    this.selectedItemName[i] = data1["item_code"];
                    this.selectedPackingItem[i] = data1["packing_item"];
                    this.packingItem[i] = packingList;
                    this.addItem();
                    this.pur_Order_Item_Details.at(i).patchValue({
                      item_code: data1.item_code, packing_item: data1.packing_item, packing_uom: data1.packing_uom,
                      packing_qty: data1.packing_qty, stock_uom: data1.item_uom, mat_weight: data1["mat_weight"],
                      stock_qty: data1.item_qty, price: data1.mrp, price_based_on: data1.price_based_on,
                      amount: data1.amount, taxable_amount: data1.amount, net_amount: data1.net_amount, tax_rate: data1.tax_rate,
                      tax_amount: data1.tax_amount, total_amount: data1.total_amount, qc_norms: data1.qc_norms,
                      priority: data1.priority, delivery_date: data1.delivery_date,
                      purpose: data1.purpose, to_be_used: data1.to_be_used, remarks: data1.remarks,
                      packing_list_req: data1.packing_list_req, packing_list: data1.packing_list
                    });
                    if (data1.price_based_on == "Item")
                      this.pur_Order_Item_Details.at(i).patchValue({ price_based_on: "With Packing" });
                    i = i + 1;
                  });
                }
              }

              this.status = false;
              this.DropDownListService.getPurEnquiryDetails(data["enquiry_id"]).subscribe(data => {
                this.status = true;
                this.userForm.patchValue({ ser_item_subtype: data.service_type, remarks: data.remarks });
                this.pur_Order_Trans_Infos.patchValue({ payment_terms: data.payment_term, trans_borne_by: data.trans_born_by });
                this.onChangeTransportBorneBy(data.trans_born_by)
              });
            }
          });
        }

        if (this._referenceNo == "pur006") {
          let dialogref;
          dialogref = this.dialog.open(PurchaseQNPopUpModalComponent, { data: { ref_type: "pur006", supplier_id: this.supplier_id, item_type: this.poType } });
          dialogref.afterClosed().subscribe(data => {
            if (data != '' && data["quotation_id"] != "0") {
              this.userForm.patchValue({ referance_id: data["quotation_id"] });
              this.status = false;
              this.classified_item_namelist = [];
              this.packingItem = [];
              this.selectedItemName = [];
              this.selectedPackingItem = [];
              this.selectedItemNameclassified = [];
              let i = 0;

              this.addItem();
              this.item_sl_no = 0;
              while (this.pur_Order_Item_Details.length)
                this.pur_Order_Item_Details.removeAt(0);

              for (let data1 of data.QuotationDetails) {
                if (data1.checkbox == true) {
                  this.status = false;
                  forkJoin(
                    this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                    this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing_item"], this.company_name)
                  ).subscribe(([packingList, capacityEmptyWt]) => {
                    this.status = true;
                    this.capacity[i] = capacityEmptyWt.capacity;
                    this.empty_bag_wt[i] = capacityEmptyWt.empty_big_wt;
                    this.selectedItemName[i] = data1["item_code"];
                    this.selectedPackingItem[i] = data1["packing_item"];
                    this.packingItem[i] = packingList;
                    this.addItem();
                    this.pur_Order_Item_Details.at(i).patchValue(data1);
                    i = i + 1;
                  });
                }
              }

              this.status = false;
              forkJoin(
                this.DropDownListService.getPurQuotDetails(data["quotation_id"]),
                this.DropDownListService.gePurQuotBPDetails(data["quotation_id"]),
                this.DropDownListService.getPurQuotBrokerDtls(data["quotation_id"])
              ).subscribe(([quotationDtls, bpDetails, brokerData]) => {
                this.userForm.patchValue({
                  ser_item_subtype: quotationDtls["quotation_service"],
                  supplier_name: quotationDtls["supplier_name"], remarks: quotationDtls["remarks"],
                  confirmed_by: quotationDtls["confirmed_by"], approved: quotationDtls["approved"],
                  reason: quotationDtls["reason"]
                });

                this.pur_Order_Trans_Infos.patchValue({
                  trans_borne_by: quotationDtls["transport_borne_by"],
                  payment_terms: quotationDtls["payment_term"], mode_of_trans: quotationDtls["mode_of_transport"],
                  transporter_name: quotationDtls["transport_name"]
                });
                this.onChangeTransportBorneBy(quotationDtls["transport_borne_by"]);
                this.OnChangeTransporterName(quotationDtls["transport_name"]);

                this.pur_Order_BPDetails.patchValue({
                  supp_name: bpDetails["sp_name"], supp_phone: bpDetails["sp_phone"],
                  supp_fax: bpDetails["sp_fax"], supp_email: bpDetails["sp_email"], supp_address: bpDetails["sp_address"],
                  cp_designation: bpDetails["cp_designation"], cp_name: bpDetails["cp_name"], cp_phone: bpDetails["cp_phone"],
                  cp_fax: bpDetails["cp_fax"], cp_email: bpDetails["cp_email"], cp_address: bpDetails["cp_address"]
                });

                this.addBroker();
                this.broker_sl_no = 0;
                while (this.pur_Order_broker.length)
                  this.pur_Order_broker.removeAt(0);
                for (let data1 of brokerData)
                  this.addBroker();
                this.pur_Order_broker.patchValue(brokerData);

                this.status = true;
              });
            }
          });
        }
      }
      else if (this._referenceNo != "pur003")
        alert("Select Supplier Name First");
    } else { alert("Select PO Type First"); }
  }

  PurchaseOrderId: any

  send() {
    this.status = false;
    this.itemdynastatus = [];
    this.packingdynastatus = [];
    this.brokerdetailsstatus = [];
    this.advicereq = this.userForm.get("advice_req").value as FormControl
    this.pofullfillment = this.userForm.get("po_fullfillment").value as FormControl
    this.noofadvice = this.userForm.get("no_of_advice").value as FormControl
    this.totalqty = this.userForm.get("total_qty").value as FormControl
    //this.staticuom


    //alert("staticuom: "+ this.userForm.get("staticuom").value);     

    this.srvItemTypeIs = this.userForm.get("ser_item_type").value as FormControl
    if (this.srvItemTypeIs == undefined)
      this.userForm.patchValue({ ser_item_type: "true" });
    this.PurchaseOrderId = this.userForm.get("id").value as FormControl
    this.userForm.patchValue({
      company_id: this.company_name, fin_year: this.financialYear,
      username: localStorage.getItem("username")
    });
    //this.userForm.patchValue({pref_doc_no: this.prefDocNo, charge_code: this.chargeCode});
    //this.userForm.patchValue({pref_doc_no: this.prefDocNo});
    let check_rec: boolean = true;
    let uom_checkvalidation: boolean = false;;
    if (this.userForm.get("advice_req").value == "Yes" && (this.userForm.get("weightment_req").value == true || this.userForm.get("weightment_req").value == "true") && this.userForm.get("receipt_criteria").value == "NA") {
      check_rec = false
    }
    if ((this.userForm.get("ser_item_subtype").value == "ITMT00001" || this.userForm.get("ser_item_subtype").value == 'ITMT00010' || this.userForm.get("ser_item_subtype").value == "ITMT00002" || this.userForm.get("ser_item_subtype").value == 'ITMT00009') && this.userForm.get("weightment_req").value == true) {
      uom_checkvalidation = true;
    }
    let check_packingmatforsaleentries: boolean = false;
    if ((this.userForm.get("ser_item_subtype").value == 'ITMT00004' || this.userForm.get("ser_item_subtype").value == 'ITMT00005' || this.userForm.get("ser_item_subtype").value == 'ITMT00002' || this.userForm.get("ser_item_subtype").value == 'ITMT00007') && this.userForm.get("advice_req").value == 'Yes') {
      check_packingmatforsaleentries = true;

    }
    let uomconmust: boolean = false;
    if (check_packingmatforsaleentries == true && this.userForm.get("weightment_req").value == true) {
      uomconmust = true;
    }
    /* if(this.userForm.get("ser_item_subtype").value == "ITMT00001" && (this.userForm.get("app_chgs_id").value==null || this.userForm.get("app_chgs_id").value=='0' || this.userForm.get("app_chgs_id").value==''))
    {
     alert("Please Select Charges in Terms and Condition Tab !!!");
     this.status=true;
    } */
    // this.submitted = false;//change today 25-04-2022
    this.submitted = true;
    if (!this.userForm.valid) {
      alert('Please fill all fields!')
      return false;
    }
    else {

      console.log("chk paking item:" + this.pur_Order_Item_Details.at(0).get("packing_item").value + "//this.PurchaseOrderId: " + this.PurchaseOrderId)
      if (this.PurchaseOrderId != 0) {
        console.log("1st");
        // this.status = false;
        let totalntwt: number = 0;

        for (let i = 0; i < this.pur_Order_Item_Details.length; i++) {

          totalntwt += Number(this.pur_Order_Item_Details.at(i).get("stock_qty").value)
        }
        console.log("tuhin chekc here " + this.finalglobalqty + " / " + totalntwt);
        //new added on 10-03-2023            
        //this.globaladviceused if true means it is used in unlaod advice if false then its new  
        let quantitymatched: boolean = false;
        if (Number(this.finalglobalqty.toFixed(4)) == Number(totalntwt.toFixed(4))) {
          quantitymatched = true
        }

        //new added ends on 10-03-2023  
        // if(Number(this.finalglobalqty.toFixed(4)) == Number(totalntwt.toFixed(4)))
        console.log(" checking her  " + quantitymatched + " // " + this.globaladviceused)
        if (this.globaladviceused == false) {

          if (this.userForm.get("ser_item_subtype").value == 0) {
            alert("Please select PO Type");
            this.status = true;
          }
          else if (this.userForm.get("pur_ord_type").value == 0) {
            alert("Please select PO Sub Type"); this.status = true;
          }
          //channel_req 
          else if (this.userForm.get("channel_req").value == null) {
            alert("Please Select Channel Requried !!!!!!!!!!"); this.status = true;
          }
          else if (this.userForm.get("channel_req").value == 'Yes' && (this.userForm.get("sup_channel").value == null || this.userForm.get("sup_channel").value == '')) {
            alert("Please Select Supplier Channel Name"); this.status = true;
          }
          else if (this.userForm.get("supplier_name").value == 0) {
            alert("Please Select  Supplier Name"); this.status = true;
          }
          else if (this.userForm.get("businessunit").value == 0) {
            alert("Please Select  Bussiness Unit"); this.status = true;
          }

          else if (this.userForm.get("po_fullfillment").value == 0) {
            alert("Please Select  PO Fulfillment By Advice Count"); this.status = true;
          }
          else if (this.userForm.get("advice_req").value == 'Yes' && this.userForm.get("po_fullfillment").value == 'Yes' && this.userForm.get("no_of_advice").value == null) {
            alert("Please Enter No of Advice "); this.status = true;
          }
          else if (this.userForm.get("referance_type").value == 1) {
            alert("Please Select  Reference Type"); this.status = true;
          }

          else if (this.userForm.get("receipt_criteria").value == 0 || check_rec == false) {
            alert("Please Select Receipt Criteria"); this.status = true;
          }

          //  else if((this.userForm.get("ser_item_subtype").value == "ITMT00001" || this.userForm.get("ser_item_subtype").value == "ITMT00002" )) 
          //  {  
          //    if(this.userForm.get("staticuom").value == 0)
          //    {
          //      alert("Please Select UoM");this.status = true;
          //    }

          // }        
          else if (uom_checkvalidation == true && this.userForm.get("staticuom").value == 0) {
            alert("Please Select UoM"); this.status = true;
          }
          else if (this.userForm.get("poitemnumber").value == '' || this.userForm.get("poitemnumber").value == null) {
            alert("Please Select Single Item"); this.status = true;
          }
          else if (this.totalqty == "0") {
            alert("Please Enter The Item Name in  Service / Item Details Tab"); this.status = true;
          }


          else {
            console.log("final else comes here ")
            let heroFound = false;
            let heroFound1 = false;
            let heroFound2 = false;
            let pbasedon = false;
            let apprate = false;
            let confact = false;
            let rateblank = false;
            for (let b = 0; b < this.pur_Order_Item_Details.length; b++) {

              if (this.pur_Order_Item_Details.at(b).get("item_code").value == null || this.pur_Order_Item_Details.at(b).get("item_code").value == '') {
                heroFound = true;

                //this.itemdynastatus.push("false")
              }
              if (this.pur_Order_Item_Details.at(b).get("packing_item").value == null || this.pur_Order_Item_Details.at(b).get("packing_item").value == '' || this.pur_Order_Item_Details.at(b).get("packing_item").value == "0") {
                heroFound1 = true;
                //this.packingdynastatus.push("false")
              }
              if (this.pur_Order_Item_Details.at(b).get("price").value == 0 || this.pur_Order_Item_Details.at(b).get("price").value == '' || this.pur_Order_Item_Details.at(b).get("price").value == '0') {
                // alert("Please Select PRICE BASED ON in SERVICE / ITEM DETAILS Tab");this.status = true;
                //this.packingdynastatus.push("false")
                rateblank = true;
              }
              if (this.pur_Order_Item_Details.at(b).get("price_based_on").value == 0 || this.pur_Order_Item_Details.at(b).get("price_based_on").value == '') {
                // alert("Please Select PRICE BASED ON in SERVICE / ITEM DETAILS Tab");this.status = true;
                //this.packingdynastatus.push("false")
                pbasedon = true;
              }
              if (this.pur_Order_Item_Details.at(b).get("con_factor").value == 0 || this.pur_Order_Item_Details.at(b).get("con_factor").value == '' || this.pur_Order_Item_Details.at(b).get("con_factor").value == null) {

                confact = true;
              }


            }
            for (let k = 0; k < this.pur_Order_app_chgs.length; k++) {
              if (this.pur_Order_app_chgs.at(k).get("app_rate").value == null || this.pur_Order_app_chgs.at(k).get("app_rate").value == '') {
                apprate = true;
              }
            }
            if (this.userForm.get("broker_info").value == true) {

              for (let c = 0; c < this.pur_Order_broker.length; c++) {
                if (this.pur_Order_broker.at(c).get("ven_code_name").value == "" || this.pur_Order_broker.at(c).get("ven_code_name").value == null || this.pur_Order_broker.at(c).get("ven_code_name").value == "0") {
                  alert("Please Select Broker NAME in Broker Details Tab"); this.status = true;
                  heroFound2 = true;
                  this.brokerdetailsstatus.push("false")
                }
              }

            }
            if (this.userForm.get("app_chgs_id").value == 0 || this.userForm.get("app_chgs_id").value == '0') {
              apprate = false;
            }
            if (heroFound == true) {
              alert("Please Select Item Name in  Service / Item Details Tab!!!"); this.status = true;
            }
            else if (heroFound1 == true) {
              alert("Please Select Packing Item in  Service / Item Details Tab!!!"); this.status = true;
            }
            else if (this.totalqty == "0") {
              alert("Please Enter The Packing Qty in  Service / Item Details Tab!!!"); this.status = true;
            }
            /*else if(confact == true && this.nouom  == false)
            {
              alert("Please Select Conversion Factor in  Service / Item Details Tab!!!");this.status = true;
            }*/
            //
            else if (confact == true && uomconmust == true) {
              alert("Please Select Conversion Factor in  Service / Item Details Tab!!!"); this.status = true;
            }
            else if (rateblank == true) {
              alert("Please Put Rate in Service / Item Details Tab"); this.status = true;
            }
            else if (pbasedon == true) {
              alert("Please Select PRICE BASED ON in Service / Item Details Tab"); this.status = true;
            }
            else if (apprate == true) {
              alert("Please Check Applicable Charges in Terms & Condition Tab!!!"); this.status = true;
            }
            else if (heroFound2 == true) {
              alert("Please Select Broker NAME in Broker Details Tab!!!"); this.status = true;
            }
            // else if(this.pur_Order_Trans_Infos.get("trans_borne_by").value==null || this.pur_Order_Trans_Infos.get("trans_borne_by").value=="" || this.pur_Order_Trans_Infos.get("trans_borne_by").value==0 )
            // {
            //   alert("Please choose Transport Borne By in Transport Information Tab.....")
            //   this.status=true;
            // }
            // else if(this.pur_Order_Trans_Infos.get("trans_borne_by").value == 'FOB' && (this.pur_Order_Trans_Infos.get("transporter_name").value == '' || this.pur_Order_Trans_Infos.get("transporter_name").value == null || this.pur_Order_Trans_Infos.get("transporter_name").value == 0))
            // {
            //   alert("Tansport Brone By 'FOB' , Please Select Transporter Name in Transport Information Tab!!");
            //   this.status=true;
            // }
            else if (this.userForm.get("confirmed_by").value == '' || this.userForm.get("confirmed_by").value == null) {
              alert("Please Select Confirmed By In Approval Tab"); this.status = true;
            }
            else if (this.userForm.get("approved").value == '' || this.userForm.get("approved").value == null) {
              alert("Please Select Approved In Approval Tab"); this.status = true;
            }
            else if (this.userForm.get("reason").value == '' || this.userForm.get("reason").value == null) {
              alert("Please Select Reason In Approval Tab"); this.status = true;
            }
            else if ((this.userForm.get("ser_item_subtype").value == "ITMT00001" || this.userForm.get("ser_item_subtype").value == 'ITMT00010') && (this.userForm.get("app_chgs_id").value == null || this.userForm.get("app_chgs_id").value == '0' || this.userForm.get("app_chgs_id").value == '')) {
              alert("Please Select Charges in Terms and Condition Tab !!!");
              this.status = true;
            }
            /*else if( this.itemdynastatus.includes("false") || this.packingdynastatus.includes("false") || this.brokerdetailsstatus.includes("false"))
               {
                 this.status = true;
               }*/
            else {
              //starts 25-04-2022             
              this.Service.updatePurOrder(this.userForm.getRawValue(), this.PurchaseOrderId).subscribe(data => {
                console.log("1. " + this.userForm.value);
                alert("Purchase Order Items Updated successfully.");
                this.ngOnInit();
                this.userForm.reset();
                console.log("2. " + this.userForm.value);
                //refresh List;
                //this.ngOnInit();
                //Refresh Dynemic table
                this.packingItem = [];
                this.classified_item_namelist = [];
                this.item_sl_no = 0;
                while (this.pur_Order_Item_Details.length)
                  this.pur_Order_Item_Details.removeAt(0);
                this.addItem();

                this.broker_sl_no = 0;
                while (this.pur_Order_broker.length)
                  this.pur_Order_broker.removeAt(0);
                this.addBroker();

                while (this.pur_Order_docs.length)
                  this.pur_Order_docs.removeAt(0);
                this.addDocument();

                while (this.pur_Order_app_chgs.length)
                  this.pur_Order_app_chgs.removeAt(0)
                this.add7();

                while (this.pur_Order_Terminations_dyn.length)
                  this.pur_Order_Terminations_dyn.removeAt(0);
                this.add8();
                this.status = true;
              }, (error) => {
                this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
                this.ngOnInit()
              });

            }
          }
          //changes ends 25-04-2022                     
        }
        else {
          alert("Total Quantity value mismatched with Material Weight total quantity");
          // this.ngOnInit();
          this.status = true;
        }
      }
      else {
        console.log("2nd")

        if (this.userForm.get("ser_item_subtype").value == 0) {
          alert("Please select PO Type");
          this.status = true;
        }
        else if (this.userForm.get("pur_ord_type").value == 0) {
          alert("Please select PO Sub Type"); this.status = true;
        }
        else if (this.userForm.get("channel_req").value == 'Yes' && (this.userForm.get("sup_channel").value == null || this.userForm.get("sup_channel").value == '')) {
          alert("Please Select Supplier Channel Name"); this.status = true;
        }
        else if (this.userForm.get("supplier_name").value == 0) {
          alert("Please Select  Supplier Name"); this.status = true;
        }
        else if (this.userForm.get("businessunit").value == 0) {
          alert("Please Select  Bussiness Unit"); this.status = true;
        }

        else if (this.userForm.get("po_fullfillment").value == 0) {
          alert("Please Select PO Fulfillment By Advice Count"); this.status = true;
        }

        else if (this.userForm.get("advice_req").value == 'Yes' && this.userForm.get("po_fullfillment").value == 'Yes' && this.userForm.get("no_of_advice").value == null) {
          alert("Please Enter No of Advice "); this.status = true;
        }

        else if (this.userForm.get("referance_type").value == 1) {
          alert("Please Select  Reference Type"); this.status = true;
        }

        else if (this.userForm.get("receipt_criteria").value == 0 || check_rec == false) {
          alert("Please Select Receipt Criteria"); this.status = true;
        }
        //tuhin 0810  
        /*   else if((this.userForm.get("ser_item_subtype").value == "ITMT00001" || this.userForm.get("ser_item_subtype").value == "ITMT00002" )) 
                   {  
                     if(this.userForm.get("staticuom").value == 0)
                     {
                       alert("Please Select UoM");this.status = true;
                     }
                     
                  } 
                  */
        //tuhin0810ens 
        else if (uom_checkvalidation == true && this.userForm.get("staticuom").value == 0) {
          alert("Please Select UoM"); this.status = true;
        }
        else if (this.userForm.get("poitemnumber").value == '' || this.userForm.get("poitemnumber").value == null) {
          alert("Please Select Single Item"); this.status = true;
        }
        //  else if(this.pur_Order_Item_Details.length)
        // {

        //      for(let b=0;b<this.pur_Order_Item_Details.length;b++)
        //      {
        //        if(this.pur_Order_Item_Details.at(b).get("item_code").value == null || this.pur_Order_Item_Details.at(b).get("item_code").value == '')
        //        {
        //          alert("Please Select ITEM NAME ");this.status = true;
        //       }
        //       else if(this.pur_Order_Item_Details.at(b).get("packing_item").value == null || this.pur_Order_Item_Details.at(b).get("packing_item").value == '')
        //        {
        //          alert("Please Select Packing NAME ");this.status = true;
        //        }
        //      }
        //  }


        else {

          //   this.status = false;
          let chargecode3 = this.userForm.value as FormControl;

          let heroFound = false;
          let heroFound1 = false;
          let heroFound2 = false;
          let pbasedon = false;
          let apprate = false;
          let confact = false;
          let rateblank = false;


          for (let b = 0; b < this.pur_Order_Item_Details.length; b++) {
            console.log("check item sub type:" + this.pur_Order_Item_Details.at(b).get("packing_item").value)
            if (this.pur_Order_Item_Details.at(b).get("item_code").value == null || this.pur_Order_Item_Details.at(b).get("item_code").value == '') {
              heroFound = true;

              //this.itemdynastatus.push("false")
            }
            if (this.pur_Order_Item_Details.at(b).get("packing_item").value == null || this.pur_Order_Item_Details.at(b).get("packing_item").value == '') {
              heroFound1 = true;
              //this.packingdynastatus.push("false")
            }
            if (this.pur_Order_Item_Details.at(b).get("price").value == 0 || this.pur_Order_Item_Details.at(b).get("price").value == '' || this.pur_Order_Item_Details.at(b).get("price").value == '0') {
              // alert("Please Select PRICE BASED ON in SERVICE / ITEM DETAILS Tab");this.status = true;
              //this.packingdynastatus.push("false")
              rateblank = true;
            }
            if (this.pur_Order_Item_Details.at(b).get("price_based_on").value == 0 || this.pur_Order_Item_Details.at(b).get("price_based_on").value == '') {
              // alert("Please Select PRICE BASED ON in SERVICE / ITEM DETAILS Tab");this.status = true;
              //this.packingdynastatus.push("false")
              pbasedon = true;
            }
            if (this.pur_Order_Item_Details.at(b).get("con_factor").value == 0 || this.pur_Order_Item_Details.at(b).get("con_factor").value == '' || this.pur_Order_Item_Details.at(b).get("con_factor").value == null) {

              confact = true;
            }

          }

          for (let k = 0; k < this.pur_Order_app_chgs.length; k++) {
            if (this.pur_Order_app_chgs.at(k).get("app_rate").value == null || this.pur_Order_app_chgs.at(k).get("app_rate").value == '') {
              apprate = true;
            }
          }
          if (this.userForm.get("broker_info").value == true) {

            for (let c = 0; c < this.pur_Order_broker.length; c++) {
              if (this.pur_Order_broker.at(c).get("ven_code_name").value == "" || this.pur_Order_broker.at(c).get("ven_code_name").value == null || this.pur_Order_broker.at(c).get("ven_code_name").value == "0") {
                //alert("Please Select Broker NAME in Broker Details Tab");this.status = true;
                heroFound2 = true;
                //this.brokerdetailsstatus.push("false")
              }
            }

          }
          if (this.userForm.get("app_chgs_id").value == 0 || this.userForm.get("app_chgs_id").value == '0') {
            apprate = false;
          }
          if (heroFound == true) {
            alert("Please Select Item Name in  Service / Item Details Tab!!!"); this.status = true;
          }
          else if (heroFound1 == true) {
            alert("Please Select Packing Item in  Service / Item Details Tab!!!"); this.status = true;
          }
          else if (this.totalqty == "0") {
            alert("Please Enter The Packing Qty in  Service / Item Details Tab!!!"); this.status = true;
          }
          //tuhin 0810
          /*  else if(confact == true && this.nouom  == false)
 
 
              {
                alert("Please Select Conversion Factor in  Service / Item Details Tab!!!");this.status = true;
              }
              */
          //tuhin 0810 ends
          else if (confact == true && uomconmust == true) {
            alert("Please Select Conversion Factor in  Service / Item Details Tab!!!"); this.status = true;
          }
          else if (rateblank == true) {
            alert("Please Put Rate in Service / Item Details Tab"); this.status = true;
          }
          else if (pbasedon == true) {
            alert("Please Select PRICE BASED ON in Service / Item Details Tab"); this.status = true;
          }
          else if (apprate == true) {
            alert("Please Check Applicable Charges in Terms & Condition Tab!!!"); this.status = true;
          }
          else if (heroFound2 == true) {
            alert("Please Select Broker NAME in Broker Details Tab!!!"); this.status = true;
          }
          // else if(this.pur_Order_Trans_Infos.get("trans_borne_by").value==null || this.pur_Order_Trans_Infos.get("trans_borne_by").value=="" || this.pur_Order_Trans_Infos.get("trans_borne_by").value==0 )
          // {
          //   alert("Please choose Transport Borne By in Transport Information Tab.....")
          //   this.status=true;
          // }
          // else if(this.pur_Order_Trans_Infos.get("trans_borne_by").value == 'FOB' && (this.pur_Order_Trans_Infos.get("transporter_name").value == '' || this.pur_Order_Trans_Infos.get("transporter_name").value == null || this.pur_Order_Trans_Infos.get("transporter_name").value == 0))
          // {
          //   alert("Tansport Brone By 'FOB' , Please Select Transporter Name in Transport Information Tab!!");
          //   this.status=true;
          // }
          else if (this.userForm.get("confirmed_by").value == '' || this.userForm.get("confirmed_by").value == null) {
            alert("Please Select Confirmed By In Approval Tab"); this.status = true;
          }
          else if (this.userForm.get("approved").value == '' || this.userForm.get("approved").value == null) {
            alert("Please Select Approved In Approval Tab"); this.status = true;
          }
          else if (this.userForm.get("reason").value == '' || this.userForm.get("reason").value == null) {
            alert("Please Select Reason In Approval Tab"); this.status = true;
          }
          else if ((this.userForm.get("ser_item_subtype").value == "ITMT00001" || this.userForm.get("ser_item_subtype").value == 'ITMT00010') && (this.userForm.get("app_chgs_id").value == null || this.userForm.get("app_chgs_id").value == '0' || this.userForm.get("app_chgs_id").value == '')) {
            alert("Please Select Charges in Terms and Condition Tab !!!");
            this.status = true;
          }
          /*else if( this.itemdynastatus.includes("false") || this.packingdynastatus.includes("false") || this.brokerdetailsstatus.includes("false"))
             {
               this.status = true;
             }*/
          else {
            // this.status = false;
            const InputData = this.userForm.getRawValue();
            console.log("input: " + JSON.stringify(InputData));
            const frmData = new FormData();
            console.log(" length " + this.myFiles.length);
            for (let i = 0; i < this.myFiles.length; i++) {

              frmData.append("files", this.myFiles[i]);
              console.log();
              if (i == 0) {
                console.log(i + ",files: " + this.myFiles[i])
              }
            }
            frmData.append("Input", JSON.stringify(InputData));



            console.log("Form data: " + frmData);


            // this.Service.createPurchaseOrder(this.userForm.getRawValue()).subscribe( data =>
            this.Service.createPurchaseOrder(frmData).subscribe(data =>
            // this.Service.createPurchaseOrder(this.userForm.getRawValue()).subscribe( data =>
            {
              console.log(this.userForm.value);
              alert("New Purchase Order Items created successfully.");
              this.userForm.reset();
              this.status = true;
              // this.ngOnInit();
              //    //Refresh Dynemic table
              this.packingItem = [];
              this.classified_item_namelist = [];
              this.item_sl_no = 0;
              while (this.pur_Order_Item_Details.length)
                this.pur_Order_Item_Details.removeAt(0);
              this.addItem();

              this.broker_sl_no = 0;
              while (this.pur_Order_broker.length)
                this.pur_Order_broker.removeAt(0);
              this.addBroker();

              while (this.pur_Order_docs.length)
                this.pur_Order_docs.removeAt(0);
              this.addDocument();

              while (this.pur_Order_app_chgs.length)
                this.pur_Order_app_chgs.removeAt(0)
              this.add7();

              while (this.pur_Order_Terminations_dyn.length)
                this.pur_Order_Terminations_dyn.removeAt(0);
              this.add8();
              this.ngOnInit();
              this.status = true;
            }, (error) => {
              this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
              //this.ngOnInit()
            });
          }

          //starts 25-04-2022         
          //console.log("chargecode/"+JSON.stringify(chargecode3))



          //ends 25-04-2022 

        }









      }

    }
  }

  changeno(a, b, c) {
    if (a == 'Yes' && b == 'Yes') {
      // no_of_advice: purOrderData["no_of_advice"]
      this.show_no_advance = false;
      this.userForm.patchValue({ no_of_advice: c });

    }
    else {
      this.show_no_advance = true;
    }
  }
  OnChangeTransportatinRate(transporter_rate, index) {
    console.log("enter")
    let chargecode = this.pur_Order_Trans_Chgs_dyn.at(index).get("charge_code").value;
    if (transporter_rate.length) {
      this.ChargeList[index].forEach(ele => {
        if (ele.trans_charge_code == chargecode) {
          if (this.pur_Order_Trans_Chgs_dyn.at(index).get("transport_rate").value == "PER TRUCK") {
            this.pur_Order_Trans_Chgs_dyn.at(index).patchValue({ chgs_rate_value: ele.full_truck_load_rate });
          }
          else {
            this.pur_Order_Trans_Chgs_dyn.at(index).patchValue({ chgs_rate_value: ele.rate_uom });
          }
        }
      })
    }
  }
  onUpdate(id: any, pur_order_id: string, action) {
    this.purchaseordersave = true;
    this.userForm.patchValue({ id: id });
    // this.status = false;//tuhin 0910
    this.isHidden = true;
    this.packingItem = [];
    this.classified_item_namelist = [];
    this.selectedItemName = [];
    this.selectedPackingItem = [];
    this.selectedItemNameclassified = [];
    this.selectedTransacc = [];
    this.selectedTdsacc = [];
    this.selectedChgCode = [];

    this.cgst_amt = [];
    this.sgst_amt = [];
    this.igst_amt = [];

    if (action == 'view') { this.action = 'view'; }
    else { this.action = 'update'; }


    forkJoin(
      this.UpdateService.purOrderRetrive(id),
      this.UpdateService.purOrdItemRetriveList(pur_order_id),
      this.UpdateService.getPurOrdAppChgs(pur_order_id),
      this.UpdateService.purOrdTransConRetriveList(pur_order_id),
      this.UpdateService.getPurOrdTrans(pur_order_id),
      this.UpdateService.getPurOrdBrokerList(pur_order_id),
      this.UpdateService.purOrdBPDRetriveList(pur_order_id),
      this.UpdateService.purOrdDocRetriveList(pur_order_id),
      this.UpdateService.getPurOrdTermList(pur_order_id),
      this.UpdateService.purOrdTerminateRetriveList(pur_order_id),
      this.UpdateService.getPurOrdTransChgsDynList(pur_order_id),
      this.UpdateService.getPurOrdTermsCondDynList(pur_order_id),
      this.UpdateService.getPurOrdStoreDynList(pur_order_id),
      this.DropDownListService.areaList()
    ).subscribe(([purOrderData, itemData, appChgData, tcData, transData, brokerData,
      bpData, docData, dynTerminationData, staticTerminationData, chgDyndata, termsCondsData,
      storeList,arealist]) => {
      // new work on 22082022 starts
      if (purOrderData["ser_item_subtype"] == 'ITMT00004' || purOrderData["ser_item_subtype"] == 'ITMT00005' || purOrderData["ser_item_subtype"] == 'ITMT00002' || purOrderData["ser_item_subtype"] == 'ITMT00007') //direct grn entry//
      {
        this.disabeWeighment = true;
        this.potype_status = false;
      }
      else {
        this.potype_status = true;
      }
      //work on 22082022 ends

      // console.log("chgDyndata :: "+ JSON.stringify(chgDyndata));
      this.finalglobalqty = purOrderData["total_qty"];
      this.areaList = arealist;
      if (purOrderData["unload_status"] == 1) {
        this.globaladviceused = true;
      }
      this.currentDate = purOrderData["ord_date"];
      // this.poType = purOrderData["pur_ord_type"];//itm
      // this.poSubype = purOrderData["ser_item_subtype"];//e open 

      this.poType = purOrderData["ser_item_subtype"];//itm
      this.poSubype = purOrderData["pur_ord_type"];//e open 

      //this.suppliername=purOrderData["supplier_name"];
      // on update goes to pan number
      this.onChangeSupplierName(purOrderData["supplier_name"]);


      this.onChangePOType(purOrderData["ser_item_subtype"], 'update')
      if (purOrderData["ser_item_type"] == true) {
        this.userForm.patchValue({ ser_item_type: "true" });
        this.orderFor = "true";
      }
      else {
        this.userForm.patchValue({ ser_item_type: "false" });
        this.orderFor = "false";
      }

      this.userForm.patchValue({
        pur_orderid: purOrderData["pur_orderid"], pur_order_no: purOrderData["pur_order_no"], company_id: purOrderData["company_id"],
        ord_date: purOrderData["ord_date"], ser_item_subtype: purOrderData["ser_item_subtype"],
        pur_ord_type: purOrderData["pur_ord_type"], supplier_name: purOrderData["supplier_name"], businessunit: purOrderData["businessunit"],
        advice_req: purOrderData["advice_req"], po_fullfillment: purOrderData["po_fullfillment"],
        referance_type: purOrderData["referance_type"], pref_doc_no: purOrderData["pref_doc_no"], master_roll_required: purOrderData["master_roll_required"],
        broker_info: purOrderData["broker_info"], madvice_sin_grn: purOrderData["madvice_sin_grn"], weightment_req: purOrderData["weightment_req"],
        pan_no: purOrderData["pan_no"], gst_no: purOrderData["gst_no"], cin_no: purOrderData["cin_no"], tan_no: purOrderData["tan_no"],
        ship_to_addr_id: purOrderData["ship_to_addr_id"], ship_to_addr: purOrderData["ship_to_addr"], pay_to_addr_id: purOrderData["pay_to_addr_id"],
        pay_to_addr: purOrderData["pay_to_addr"], remarks: purOrderData["remarks"], confirmed_by: purOrderData["confirmed_by"], approved: purOrderData["approved"],
        reason: purOrderData["reason"], app_remarks: purOrderData["app_remarks"], brokerage_active: purOrderData["brokerage_active"],
        app_chgs_id: purOrderData["app_chgs_id"], fin_year: purOrderData["fin_year"], receipt_criteria: purOrderData["receipt_criteria"],
        total_qty: purOrderData["total_qty"], staticuom: purOrderData["staticuom"], tagadvice_status: purOrderData["tagadvice_status"],
        channel_req: purOrderData["channel_req"], sup_channel: purOrderData["sup_channel"],
        poitemnumber: purOrderData["poitemnumber"], consignment_type: purOrderData["consignment_type"],
        trans_borne_by_chgs: purOrderData["trans_borne_by_chgs"],document_no:purOrderData["document_no"],store_charges:purOrderData["store_charges"]
      });
      // console.log("order Details: "+  JSON.stringify(purOrderData));



      this.changeno(purOrderData["advice_req"], purOrderData["po_fullfillment"], purOrderData["no_of_advice"]);
      this.onChangechannelreq(purOrderData["channel_req"])
      if (purOrderData["channel_req"] == 'Yes') {
        this.onChangeSupplierChannel(purOrderData["sup_channel"]);
      }


      if (purOrderData["madvice_sin_grn"] == '1') {
        this.disablerow = true;
      }
      if (purOrderData["weightment_req"] == '1' || purOrderData["weightment_req"] == 1) {
        this.nouom = false
      }
      if (purOrderData["ser_item_subtype"] == 'ITMT00004' || purOrderData["ser_item_subtype"] == 'ITMT00005' || purOrderData["ser_item_subtype"] == 'ITMT00002' || purOrderData["ser_item_subtype"] == 'ITMT00007') {
        this.potype_status = false;
      }

      if (purOrderData["trans_borne_by_chgs"] == 'FOB') { this.transportCharges = true; }
      else { this.transportCharges = false; }
      let y = 0;
      this.addChgs();
      this.chgs_sl_no = 0;
      while (this.pur_Order_Trans_Chgs_dyn.length) { this.pur_Order_Trans_Chgs_dyn.removeAt(0); }
      for (let chgsdyndata of chgDyndata) {
        this.addChgs();
        this.selectedTransacc[y] = chgsdyndata["transportation_acc"];
        this.selectedTdsacc[y] = chgsdyndata["tds_acc"];
        this.selectedChgCode[y] = chgsdyndata["charge_code"];
        // console.log("Enter update:"+chgsdyndata["charge_code"]);
        this.pur_Order_Trans_Chgs_dyn.at(y).patchValue({ transport_from: chgsdyndata["transport_from"], transport_to: chgsdyndata["transport_to"] });
        if (this.transportCharges == true) {
          this.OnChangeTransporterNameChgs(chgsdyndata["transporter_name"], y);
        }


        this.pur_Order_Trans_Chgs_dyn.at(y).patchValue(chgsdyndata);
        y = y + 1;
      }

      //potype_status
      // console.log("itemData: "+  JSON.stringify(itemData));
      let k = 0;
      this.addItem();
      this.item_sl_no = 0;
      while (this.pur_Order_Item_Details.length)
        this.pur_Order_Item_Details.removeAt(0);
      for (let data1 of itemData) {
        this.status = false;
        forkJoin(
          this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
          this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing_item"], this.company_name),
          this.DropDownListService.retriveItemMasterStatInfo(data1["item_code"], this.company_name),
          this.DropDownListService.retriveClassifiedItem(data1["item_code"], this.company_name),
        ).subscribe(([packingList, capacityEmptyWt, data3, stockitemList]) => {
          // console.log("chen empty bag/"+JSON.stringify(capacityEmptyWt));
          this.status = true;
          this.capacity[k] = capacityEmptyWt.capacity;
          this.empty_bag_wt[k] = capacityEmptyWt.empty_big_wt;
          this.tolerance[k] = capacityEmptyWt.tolerance;
          // console.log("chen empty bag/"+this.empty_bag_wt[k]);
          this.empty_bag_wt_priceBasedOn[k] = capacityEmptyWt.empbagwt_based_on;//changes made 20-04-2022
          this.selectedItemName[k] = data1["item_code"];
          this.selectedPackingItem[k] = data1["packing_item"];
          // console.log("packingList " + JSON.stringify(packingList))
          this.packingItem[k] = packingList;
          this.classified_item_namelist[k] = stockitemList;
          this.selectedItemNameclassified[k] = data1["classified_item_name"];

          this.addItem();
          console.log("classified" + data1["classified_item_name"]);
          this.pur_Order_Item_Details.at(k).patchValue(data1);
          this.pur_Order_Item_Details.at(k).get("packing_item").value;
          this.pur_Order_Item_Details.at(k).patchValue({ classified_item_name: data1["classified_item_name"] });
          this.DropDownListService.getPackingMasterCode(data1["item_code"], data1["packing_item"])
            .subscribe(pMasterCode => {
              this.packingItemCode[k] = pMasterCode;
            });

          this.DropDownListService.taxlistbycode(data3[0].tax_code).subscribe(taxcatagory => {
            this.cgst_amt[k] = taxcatagory["cgst_act_val"];
            this.sgst_amt[k] = taxcatagory["sgst_act_val"];
            this.igst_amt[k] = taxcatagory["igst_act_val"];

          })

          k = k + 1;
        });

      }


      // console.log("appChgData: "+  JSON.stringify(appChgData));
      this.add7();
      while (this.pur_Order_app_chgs.length)
        this.pur_Order_app_chgs.removeAt(0);
      for (let data1 of appChgData)
        this.add7();
      this.pur_Order_app_chgs.patchValue(appChgData);

      //   console.log("tcData: "+  JSON.stringify(tcData));
      this.pur_Order_Terms_Con.patchValue(tcData);

      //console.log("transData: "+  JSON.stringify(transData));
      this.pur_Order_Trans_Infos.patchValue(transData);

      // console.log("brokerData: "+  JSON.stringify(brokerData));
      this.addBroker();
      this.broker_sl_no = 0;
      while (this.pur_Order_broker.length)
        this.pur_Order_broker.removeAt(0);
      for (let data1 of brokerData)
        this.addBroker();
      this.pur_Order_broker.patchValue(brokerData);

      //broker details not show on update time start
      if (purOrderData["broker_info"] == '1') {
        this.showBrokerDetails = true;
      }
      else {
        this.showBrokerDetails = false;
      }
      //broker details not show on update time end
      // console.log("bpData: "+  JSON.stringify(bpData));
      this.pur_Order_BPDetails.patchValue(bpData);

      //console.log("docData: "+  JSON.stringify(docData));
      this.addDocument();
      while (this.pur_Order_docs.length)
        this.pur_Order_docs.removeAt(0);
      for (let data1 of docData)
        this.addDocument();
      this.pur_Order_docs.patchValue(docData);

      //console.log("staticTerminationData: "+  JSON.stringify(staticTerminationData));
      this.pur_Order_Terminations.patchValue(staticTerminationData);
      this.onChangeTPOrder(staticTerminationData["term_pur_ord"], 'CFC');

      //console.log("dynTerminationData: "+  JSON.stringify(dynTerminationData));
      this.add8();
      while (this.pur_Order_Terminations_dyn.length)
        this.pur_Order_Terminations_dyn.removeAt(0);
      for (let data1 of dynTerminationData)
        this.add8();
      this.pur_Order_Terminations_dyn.patchValue(dynTerminationData);

      let z = 0;
      this.addTerms();
      this.terms_conditions_sl_no = 0;
      while (this.pur_order_terms_conditions.length) { this.pur_order_terms_conditions.removeAt(0); }
      for (let termsCondData of termsCondsData) {
        this.addTerms();

        console.log("Enter Terms update:" + JSON.stringify(termsCondData));

        this.pur_order_terms_conditions.at(z).patchValue(termsCondData);
        z = z + 1;
      }

      
       console.log("storeList: "+  JSON.stringify(storeList));
      this.addStoreCharge();
      while (this.pur_order_store_chgs.length)
        this.pur_order_store_chgs.removeAt(0);
      for (let storedata of storeList)
        this.addStoreCharge();
      this.pur_order_store_chgs.patchValue(storeList);

      this.status = true;
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });

    if (localStorage.getItem("svalue") == 'true') {
      localStorage.setItem("svalue", 'false');
    }
  }


  onChangeBrokerDetailsDisplay(broker_info) {
    // alert("Hi"+broker_info);
    // console.log(broker_info.checked);
    //  this.userForm.patchValue({broker_info:broker_info.checked});
    var supp_name = this.userForm.get("supplier_name").value as FormControl

    if (this.userForm.get("supplier_name").value == null || this.userForm.get("supplier_name").value == "") {
      alert("Please Select Supplier Name Before Checking Broker Info. Required !!");
      this.userForm.patchValue({ broker_info: false });
    }
    else {
      if (broker_info.checked == true) {
        this.showBrokerDetails = true;
        //this.userForm.patchValue({brokerage_active:true});
        this.brokerage_active1 = true;
      }
      else {
        this.showBrokerDetails = false;
      }
    }

  }

  //changes on 14-04-2022
  hideitemrow(event) {
    // alert(this.action) 


    if (event.checked == true) {
      this.disablerow = true;
      if (this.pur_Order_Item_Details.length > 1) {
        for (let v = 0; v < this.pur_Order_Item_Details.length; v++) {
          this.pur_Order_Item_Details.removeAt(v);
        }
      }


    }

    if (event.checked == false) {
      this.disablerow = false;
    }
  }

  //changes on 14-04-2022     


  onChangeBrokerbasis(event) {
    console.log("event :: " + event);
    if (event == "CUM00003")//CUM00003 qunintals made in static
    {
      this.pur_Order_broker.at(0).patchValue({ basis: "QTLS" })
    }
  }
  noofadv() {
    if (this.userForm.get("no_of_advice").value == 0) {
      alert("Please check No of advice, It should be greater than one"); this.status = true;
      this.userForm.patchValue({ no_of_advice: "" })

    }
  }


  printpo(id, purchaseid,businessunit) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = { index: 0, };
    let dialogref;

    dialogref = this.dialog.open(PurchaseorderprintComponent, {
      data: { id: id, purchaseid: purchaseid,businessunit:businessunit }, height: '90%',
      width: '80%'
    });
    dialogref.afterClosed().subscribe(data => {


    });


  }
  onFileSelected(e, i, tm) {

    this.myFiles.push(e.target.files[0]);//abc

    for (let v = 0; v < this.myFiles.length; v++)//v hoache files array length
    {

      if (this.myFiles.length > tm.length) {
        if (v == i)//if size greater than 1
        {

          this.myFiles[i] = e.target.files[0];

          this.myFiles.pop();

        }
      }

    }



  }

  deleteDocument(index) {
    if (index) {

      this.pur_Order_docs.removeAt(index);
      this.myFiles.splice(index, 1);
    }
    else {
      alert("can't delete all rows");
      this.pur_Order_docs.reset();

    }
  }


  getchargesrate(rate, index) {
    // alert("hello here "+rate.target.value);

    if (this.pur_Order_app_chgs.at(index).get("rate_cal_method").value == "UOM") {

      let totalamount: number = 0;
      for (let i = 0; i < this.pur_Order_Item_Details.length; i++) {

        if (this.pur_Order_Item_Details.at(i).get("price_based_on").value == "Packing") {
          totalamount += Number(this.pur_Order_Item_Details.at(i).get("packing_qty").value);
        }
        if (this.pur_Order_Item_Details.at(i).get("price_based_on").value == "With Packing") {
          totalamount += Number(this.pur_Order_Item_Details.at(i).get("stock_qty").value);
        }
        if (this.pur_Order_Item_Details.at(i).get("price_based_on").value == "Without Packing") {
          totalamount += Number(this.pur_Order_Item_Details.at(i).get("mat_weight").value);
        }




      }

      this.pur_Order_app_chgs.at(index).patchValue({ amount: Number(totalamount * Number(rate.target.value)).toFixed(2) })
    }
    else if (this.pur_Order_app_chgs.at(index).get("rate_cal_method").value == "%") {

      let totalamount: number = 0;
      for (let i = 0; i < this.pur_Order_Item_Details.length; i++) {
        /*
                                  if(this.pur_Order_Item_Details.at(i).get("price_based_on").value == "Packing")
                                  {
                                    totalamount+=Number(this.pur_Order_Item_Details.at(i).get("packing_qty").value);
                                  }
                                  if(this.pur_Order_Item_Details.at(i).get("price_based_on").value == "With Packing" )
                                  {
                                    totalamount+=Number(this.pur_Order_Item_Details.at(i).get("stock_qty").value);
                                  }
                                  if(this.pur_Order_Item_Details.at(i).get("price_based_on").value == "Without Packing")
                                  {
                                    totalamount+=Number(this.pur_Order_Item_Details.at(i).get("mat_weight").value);
                                  }
        */
        totalamount += Number(this.pur_Order_Item_Details.at(i).get("amount").value);


      }


      this.pur_Order_app_chgs.at(index).patchValue({ amount: Number(totalamount * (Number(rate.target.value) / 100)).toFixed(2) })
    }
    else {


      this.pur_Order_app_chgs.at(index).patchValue({ amount: 0 })

    }



  }



  getchargesrateupdate(rate, index) {


    if (this.pur_Order_app_chgs.at(index).get("rate_cal_method").value == "UOM") {

      let totalamount: number = 0;
      for (let i = 0; i < this.pur_Order_Item_Details.length; i++) {

        if (this.pur_Order_Item_Details.at(i).get("price_based_on").value == "Packing") {
          totalamount += Number(this.pur_Order_Item_Details.at(i).get("packing_qty").value);
        }
        if (this.pur_Order_Item_Details.at(i).get("price_based_on").value == "With Packing") {
          totalamount += Number(this.pur_Order_Item_Details.at(i).get("stock_qty").value);
        }
        if (this.pur_Order_Item_Details.at(i).get("price_based_on").value == "Without Packing") {
          totalamount += Number(this.pur_Order_Item_Details.at(i).get("mat_weight").value);
        }




      }

      this.pur_Order_app_chgs.at(index).patchValue({ amount: Number(totalamount * Number(rate)).toFixed(2) })
    }
    else if (this.pur_Order_app_chgs.at(index).get("rate_cal_method").value == "%") {

      let totalamount: number = 0;
      for (let i = 0; i < this.pur_Order_Item_Details.length; i++) {
        /*
                                  if(this.pur_Order_Item_Details.at(i).get("price_based_on").value == "Packing")
                                  {
                                    totalamount+=Number(this.pur_Order_Item_Details.at(i).get("packing_qty").value);
                                  }
                                  if(this.pur_Order_Item_Details.at(i).get("price_based_on").value == "With Packing" )
                                  {
                                    totalamount+=Number(this.pur_Order_Item_Details.at(i).get("stock_qty").value);
                                  }
                                  if(this.pur_Order_Item_Details.at(i).get("price_based_on").value == "Without Packing")
                                  {
                                    totalamount+=Number(this.pur_Order_Item_Details.at(i).get("mat_weight").value);
                                  }
        */
        totalamount += Number(this.pur_Order_Item_Details.at(i).get("amount").value);


      }


      this.pur_Order_app_chgs.at(index).patchValue({ amount: Number(totalamount * (Number(rate) / 100)).toFixed(2) })
    }
    else {


      this.pur_Order_app_chgs.at(index).patchValue({ amount: 0 })

    }



  }

  onChangeRateCal(index, ratecaltype: string) {
    if (this.pur_Order_app_chgs.at(index).get("app_rate").value != "") {
      if (ratecaltype == "UOM") {
        let totalamount: number = 0;
        for (let i = 0; i < this.pur_Order_Item_Details.length; i++) {

          if (this.pur_Order_Item_Details.at(i).get("price_based_on").value == "Packing") {
            totalamount += Number(this.pur_Order_Item_Details.at(i).get("packing_qty").value);
          }
          if (this.pur_Order_Item_Details.at(i).get("price_based_on").value == "With Packing") {
            totalamount += Number(this.pur_Order_Item_Details.at(i).get("stock_qty").value);
          }
          if (this.pur_Order_Item_Details.at(i).get("price_based_on").value == "Without Packing") {
            totalamount += Number(this.pur_Order_Item_Details.at(i).get("mat_weight").value);
          }

        }

        this.pur_Order_app_chgs.at(index).patchValue({ amount: Number(totalamount * Number(this.pur_Order_app_chgs.at(index).get("app_rate").value)).toFixed(2) })
      }
      else if (ratecaltype == "%") {
        let totalamount: number = 0;
        for (let i = 0; i < this.pur_Order_Item_Details.length; i++) {
          totalamount += Number(this.pur_Order_Item_Details.at(i).get("amount").value);
        }
        this.pur_Order_app_chgs.at(index).patchValue({ amount: Number(totalamount * (Number(this.pur_Order_app_chgs.at(index).get("app_rate").value) / 100)).toFixed(2) })
      }
      else {
        this.pur_Order_app_chgs.at(index).patchValue({ amount: 0 });
      }
    }
    else {
      this.pur_Order_app_chgs.at(index).patchValue({ amount: 0 });
    }

  }

  onChangeBrokerchecked(event) {
    //console.log("event :: "+event);
    if (event == "Yes") {
      this.userForm.patchValue({ broker_info: true });
      //this.disabebroker = true;
      this.showBrokerDetails = true;
    }
    else {
      this.userForm.patchValue({ broker_info: false });
      //this.disabebroker = false;
      this.showBrokerDetails = false;
    }
  }

  delete(index) {
    console.log(index)
    if (index) { this.pur_Order_app_chgs.removeAt(index); }
    else {
      if (this.pur_Order_app_chgs.length > 1) {
        this.pur_Order_app_chgs.removeAt(index);
      }
      else {
        alert("can't delete all rows");
      }

    }
  }

  onDelete(id: any, pur_ord_id) {
    this.status = false;
    if (confirm("Are you sure to delete this Purchase Order ?")) {
      this.userForm.patchValue({ username: localStorage.getItem("username") });

      this.DropDownListService.checkPurchaseOrderUsage(pur_ord_id).subscribe(checkPurOrd => {
        ///let dataq=JSON.parse(checkItem);
        //  alert("bidhan here::"+checkPurOrd.status);
        if (checkPurOrd.status == 'No') {
          this.userForm.patchValue({ ser_item_type: true })
          this.Service.deletePurchaseOrder(this.userForm.getRawValue(), id).subscribe(data => {
            //  console.log("Pur :"+data.pur_orderid);
            if (data.pur_orderid == '' || data.pur_orderid == null) {
              alert("Opps!!! Can't delete this Purchase Order !!!");
            } else {
              alert("Purchase Order Deleted successfully.");
            }
            this.userForm.reset();
            this.status = true;
            this.isHidden = false;
            this.ngOnInit();
            this.showList("list");
          });

        }
        else {
          alert("This Purchase Order is Already Used,Can not be Deleted!! ");
        }
      });
    }
    this.status = true;
  }

  getProducts(request) {
    // console.log("tuhin req "+request.size);
    this.DropDownListService.getPurOrderPagination(request.page, request.size)
      .subscribe(data => {
        console.log("list data:" + JSON.stringify(data))
        this.listPurchaseOrder = data['content'];
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

  search() {
    let order1_no = this.userForm1.get("order1_no").value;
    let todate = this.userForm1.get("todate").value;
    let fromdate = this.userForm1.get("fromdate").value;
    let supplier_name1 = this.userForm1.get("supplier_name1").value;
    let finyear = localStorage.getItem("financial_year");

    this.status = false;
    this.DropDownListService.searchPurchaseOrderFast("orderno=" + order1_no + "&fromdate=" + fromdate + "&todate=" + todate + "&supplier_name1=" + supplier_name1 + "&finyear=" + finyear).subscribe(data => {
      console.log("here data comses " + JSON.stringify(data))
      this.listPurchaseOrder = data;
      this.status = true;

    }, (error) => {
      this.status = true;
      alert("Purchase Order Not Found !!!")
      this.listPurchaseOrder = [];
    })
  }

  /*
   myFilesstate:any=[];
    onFileSelectedstatemaster(e)
    {
      this.myFilesstate=[];
    
      this.myFilesstate.push(e.target.files[0]);
      console.log(this.myFilesstate)
      const frmData = new FormData();
      frmData.append("files",this.myFilesstate)
      console.log("frmData :: "+frmData)
      this.Service.uploadstatemasterexcel(frmData).subscribe(data => 
        {
          console.log(JSON.stringify(data))
        });
  
    }
    */

  openSupplierDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: 0 };
    const dialogRef = this.dialog.open(PurchasechannelpopupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data != '' && data["cp_Id"] != "0") {
        this.userForm.patchValue({ supplier_name: data["cp_Id"] });
        this.onChangeSupplierName(data["cp_Id"]);
      }
    });
  }


  onChangechannelreq(channelreq) {
    if (channelreq.length) {
      if (channelreq == 'Yes') {
        this.showchannel = true;
        this.DropDownListService.getChannelCustDesc().subscribe(channelCustDescData => {
          let channel: any = [];

          channel = channelCustDescData;
          channel.forEach(element => {
            if (element.channeltype == "Purchase") {
              this.channel_master_list.push(element)
            }
          });

        })

      }
      else {
        this.showchannel = false;
        this.channel_master_list = [];
        this.supplierNames = this.supplierNamesnew;
        this.userForm.patchValue({ sup_channel: '', channelsuplist: '' })
      }
    }
  }

  onChangeSupplierChannel(sup_channel) {
    if (sup_channel.length) {
      this.status = false;
      //this.DropDownListService.getSupplierByChannel(sup_channel).subscribe(data => {
        this.DropDownListService.getSupplierByChannelFastApi(sup_channel).subscribe(data => {
          console.log("cust list :: "+JSON.stringify(data));
        this.supplierNames = data;
        

        let channelsup: any = [];
        channelsup = this.supplierNames;
        let channelsuplist = '';

        channelsup.forEach(element => {
          channelsuplist += element.bp_Id + ',';
        });

        this.userForm.patchValue({ sup_channel_list: channelsuplist.substring(0, channelsuplist.length - 1) });
        console.log(" here tuhin " + channelsuplist.substring(0,channelsuplist.length-1));
        this.status = true;
      });
      

    }
  }

  

  getTransacc(transacc, index) {
    //console.log("transacc:"+transacc)
    if (transacc.length) {
      this.pur_Order_Trans_Chgs_dyn.at(index).patchValue({ transportation_acc: transacc })
    }
  }

  getTdsacc(trans, index) {
    if (trans.length) {
      this.pur_Order_Trans_Chgs_dyn.at(index).patchValue({ tds_acc: trans })
    }
  }
  onchangeTdsCode(event, index) {
    if (event.target.value != "0") {
      this.status = false;
      this.DropDownListService.tdsAccount(event.target.value).subscribe(data => {
        this.pur_Order_Trans_Chgs_dyn.at(index).patchValue({ tds_rate: data.tds_rate });
        this.status = true;
      });
    }
  }

  deleteTerms(index) {
    //console.log("delete"+this.terms_conditions_sl_no)
    if (this.terms_conditions_sl_no > 1) {
      //console.log("delete if"+this.terms_conditions_sl_no)
      this.terms_conditions_sl_no = this.terms_conditions_sl_no - 1;
      this.selectedItemName.splice(index, 1);
      this.pur_order_terms_conditions.removeAt(index);
      //console.log("delete if last"+this.terms_conditions_sl_no)
    }
    else {
      //console.log("delete"+this.terms_conditions_sl_no)
      this.terms_conditions_sl_no = 1;
      this.pur_order_terms_conditions.reset();
      this.pur_order_terms_conditions.at(0).patchValue({ slno: this.terms_conditions_sl_no });
      alert("Can't Delete All Rows");
    }

    for (let i = 1; i <= this.terms_conditions_sl_no; i++)
      this.pur_order_terms_conditions.at(i - 1).patchValue({ slno: i });
    //console.log("delete for loop"+this.terms_conditions_sl_no)

  }

  addTerms() {
    this.terms_conditions_sl_no = this.terms_conditions_sl_no + 1;
    //console.log("add : : "+this.terms_conditions_sl_no)

    this.pur_order_terms_conditions.push(this.fb.group({
      slno: this.terms_conditions_sl_no,
      terms_name: '',
      description: '',
    }));
  }

  onchangePackingItemCode(packingMasterCode, index) {

    if (packingMasterCode.target.value.length) {
      this.packingItemCode[index].forEach(element => {
        if (element.master_code == packingMasterCode.target.value) {
          this.pur_Order_Item_Details.at(index).patchValue({ packing_size: element.item_size, packing_weight: element.item_weight });
        }
      });
      /* this.DropDownListService.retrivePackingDtls(packingMasterCode.target.value,
         this.pur_Order_Item_Details.at(index).get("packing_item").value
         ).subscribe(data => {
           console.log("Check Pack :: "+JSON.stringify(data))
           this.pur_Order_Item_Details.at(index).patchValue({packing_size:data["item_size"],packing_weight:data["item_weight"],packing_type:data["status"]});
       });*/
      let checkLaminate: boolean = true;
      for (let v = 0; v < this.pur_Order_Item_Details.length; v++) {
        if (this.pur_Order_Item_Details.at(index).get("packing_type").value == this.pur_Order_Item_Details.at(v).get("packing_type").value
          && this.pur_Order_Item_Details.at(index).get("item_code").value == this.pur_Order_Item_Details.at(v).get("item_code").value
          && this.pur_Order_Item_Details.at(index).get("packing_item").value == this.pur_Order_Item_Details.at(v).get("packing_item").value
          && packingMasterCode.target.value == this.pur_Order_Item_Details.at(v).get("packing_item_code").value && index != v && this.userForm.get("ser_item_subtype").value == 'ITMT00002') {
          checkLaminate = false;
        }
      }
     /* if (checkLaminate == false) {
        alert("Item Name And Packing Item And Code And Laminated/Non-laminated are Same,Please Change....");
        this.pur_Order_Item_Details.at(index).patchValue({ classified_item_name: '' });
        this.selectedItemName[index] = "0";
        this.selectedPackingItem[index] = "0";
        this.deleteItem(index);
        this.status = true;
      }*/
    }
  }

  onchangeLaminate(laminate, index) {
    if (laminate.target.value.length && laminate != "0") {
      let checkLaminate: boolean = true;
      console.log("laminate:" + laminate.target.value)
      for (let v = 0; v < this.pur_Order_Item_Details.length; v++) {
        if (this.pur_Order_Item_Details.at(index).get("packing_item_code").value == this.pur_Order_Item_Details.at(v).get("packing_item_code").value
          && this.pur_Order_Item_Details.at(index).get("item_code").value == this.pur_Order_Item_Details.at(v).get("item_code").value
          && this.pur_Order_Item_Details.at(index).get("packing_item").value == this.pur_Order_Item_Details.at(v).get("packing_item").value
          && laminate.target.value == this.pur_Order_Item_Details.at(v).get("packing_type").value && index != v && this.userForm.get("ser_item_subtype").value == 'ITMT00002') {
          checkLaminate = false;
        }
      }
      //console.log("checkLaminate:" + checkLaminate)
     /* if (checkLaminate == false) {
        alert("Item Name And Packing Item And Code And Laminated/Non-laminated are Same,Please Change....");
        this.pur_Order_Item_Details.at(index).patchValue({ classified_item_name: '' });
        this.selectedItemName[index] = "0";
        this.selectedPackingItem[index] = "0";
        this.deleteItem(index);
        this.status = true;
      }*/
    }
  }


  
  adjustjw(id,pur_orderid)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: 0, };
    let dialogref;

    dialogref = this.dialog.open(PurorderjwupdateComponent, { data: { id: id, pur_orderid: pur_orderid} });
    dialogref.disableClose = true;

    dialogref.afterClosed().subscribe(data => {
      this.ngOnInit();
      this.userForm.reset();
  
      this.packingItem = [];
      this.classified_item_namelist = [];
      this.item_sl_no = 0;
      while (this.pur_Order_Item_Details.length)
        this.pur_Order_Item_Details.removeAt(0);
      this.addItem();

      this.broker_sl_no = 0;
      while (this.pur_Order_broker.length)
        this.pur_Order_broker.removeAt(0);
      this.addBroker();

      while (this.pur_Order_docs.length)
        this.pur_Order_docs.removeAt(0);
      this.addDocument();

      while (this.pur_Order_app_chgs.length)
        this.pur_Order_app_chgs.removeAt(0)
      this.add7();

      while (this.pur_Order_Terminations_dyn.length)
        this.pur_Order_Terminations_dyn.removeAt(0);
      this.add8();
      this.status = true;
  });
  }
}
