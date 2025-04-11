import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { PurchaseModuleServiceService } from '../../../../../../service/purchase-module-service.service';
import { PurchaseGRN } from '../../../../../../Models/transaction/PurchaseTransaction/PurchaseGRN';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UnloadAdvicePopUpComponent } from '../unload-advice-pop-up/unload-advice-pop-up.component';

import { MultiunloadadvicepopupComponent } from '../multiunloadadvicepopup/multiunloadadvicepopup/multiunloadadvicepopup.component';
import { formatDate } from '@angular/common';
import { forkJoin, Subscription } from 'rxjs';
import { TaxPopUpModalComponent } from '../tax-pop-up-modal/tax-pop-up-modal.component';
import { QcNormPopUpModalComponent } from '../qc-norm-pop-up-modal/qc-norm-pop-up-modal.component';
import { Console } from 'console';
import { GrnBillPrintComponent } from '../grn-bill-print/grn-bill-print.component';
import { PurchaseOrderGrnPopUpComponent } from '../purchase-order-grn-pop-up/purchase-order-grn-pop-up.component';
import { MultiunloadadvicepopupreviseComponent } from '../multiunloadadvicepopup/multiunloadadvicepopuprevise/multiunloadadvicepopuprevise.component';
import { StorePurchasePopupComponent } from '../store-purchase-popup/store-purchase-popup.component';
import { PageEvent } from '@angular/material';
import { Master } from '../../../../../../service/master.service';
import { PurchasegrndriverComponent } from '../purchasegrndriver/purchasegrndriver.component';
import { AddNewVechilePopUpComponentGrnComponent } from '../add-new-vechile-pop-up-component-gr/add-new-vechile-pop-up-component-gr.component';

@Component({
  selector: 'app-grn',
  templateUrl: './grn.component.html',
  styleUrls: ['./grn.component.scss']
})

export class GrnComponent implements OnInit {
  submitted = false;
  public userForm: FormGroup;
  model: PurchaseGRN = new PurchaseGRN();
  listPurchaseGRN: PurchaseGRN[];
  isHidden: any;
  GrnId: any;
  refType: {};
  GrnFor: any;
  ledgerNames: any = [];
  itemtypes: any = [];
  gitemname: {};
  supplierNames: any = [];
  delvAddrs: any = [];
  contAddrs: any = [];
  Addrs: any = [];
  payToDFrom: any = [];
  supplier_id = "";
  customUOMDyns: {};
  item_codes: any = [];
  brokerNames: {};
  transporterNames: any = [];
  transBrone: {};
  modeOfTransport: {};
  transRate: {};
  payModes: {};
  payTerms: any = [];
  brokerNameList: any = [];
  chargesIdList: {};
  item_types: {};
  warehouses: any = [];
  currentDate: any;
  bussiness_unit_list: any = [];
  status = false;
  isChecked4 = false;
  IsChecked = false;
  item_sl_no = 1;
  broker_sl_no = 1;
  seq_no: any;
  empty_bag_wt: any = [];
  empty_bag_wt_priceBasedOn: any = [];
  vehicleList: any = [];
  capacity: any = [];
  driver_names: any = [];
  ownTareWt: number;
  ownGrossWt: number;
  partyTareWt: number;
  partyGrossWt: number;
  company_name: any;
  action: any;
  puSubTypeList: any = [];
  pusubtype: any;
  itmType: any;
  itmSubType: any;
  businessUnit: any;
  suppli_id: any;
  ordate: any;
  grnsave: boolean = true;
  grnupdate: boolean = true;
  grnview: boolean = true;
  grnprint: boolean = true;
  grndelete: boolean = true;
  showunloadadvicepopupcriteria: boolean = false;
  b_unit_new: any;
  purchase_type_new: any;
  purchase_subtype_new: any;
  supplier_name_new: any;
  referance_type_new: any;
  vehicle_id_new: any;
  popupstatus: boolean = false;
  dynamicgrnstatus: boolean = true;
  tolerance: any = [];
  capacitynew: any = [];
  tolerancestatus: boolean = false;
  minimumvalue: any;
  maxvalue: any;
  calculatedqty: any;
  finalgrnqty: number;
  ptype_status: boolean = false;
  Purtype: any;
  pgrn_type_status: boolean = false;
  grnId: any;
  totalElements: number = 0;
  supplierNames_List: any = [];
  public userForm1: FormGroup;

  disvehicle: boolean = true;
  viewdriver: boolean = false;

  taxdata: any = [];
  tax_list: any = [];
  actualcgstrate: number = 0;
  actualsgstrate: number = 0;
  state: any;
  statestatus: number = 0;
  cgstvalue: any;
  sgstvalue: any;
  igstvalue: any;

  storepurchase: boolean = false;
  potype_packing: boolean = false;
  company_state:any;
  //businessUnit,suppli_id,itmtype,itmSubType,pusubtype,ordate


  constructor(public fb: FormBuilder, private Service: PurchaseModuleServiceService,
    private dialog: MatDialog, private DropDownListService: DropdownServiceService, private MasterService: Master) {
    this.userForm = fb.group({
      id: [''],
      grn_id: [''],
      b_unit: [''],

      item_type: [true],
      grn_date: [''],
      grn_no: [''],
      supplier_name: [''],
      referance_type: [''],
      vehicle_id: [''],
      sales_process: [''],
      sales_order: [''],
      applicable_charges_id: [''],
      remarks: [''],
      brokerage_active: [''],
      referance_id: [''],
      company_id: [''],
      fin_year: [''],
      username: [''],
      purchase_type: [''],
      purchase_subtype: [''],
      receipt_criteria: [''],
      multiunloadadvice: [''],

      pur_good_receipt_Business_Partner_details: this.fb.group({
        sp_name: '',
        sp_designation: '',
        sp_phone: '',
        sp_fax: '',
        sp_email: '',
        sp_address: '',
        cp_designation: '',
        cp_name: '',
        cp_phone: '',
        cp_fax: '',
        cp_email: '',
        cp_address: ''
      }),

      pur_good_receipt_item_details: this.fb.array([this.fb.group({
        slno: this.item_sl_no,
        adv_item_code: '',
        adv_item_name: '',
        classified_item_name: '',
        hsn_code: '',
        adv_packing: '',
        packing_item_code: '',
        packing_type: '',
        packing_size: '',
        packing_weight: '',
        adv_pack_qty: '',
        adv_pack_uom: '',
        adv_item_qty: '',
        con_factor: '',
        adv_mat_wt: '',
        adv_item_uom: '',
        rcv_pack_qty: '',
        rcv_pack_uom: '',
        rcv_item_qty: '',
        rcv_mat_wt: '',
        rcv_item_uom: '',
        pssd_pack_qty: '',
        pssd_pack_uom: '',
        pssd_item_qty: '',
        pssd_mat_wt: '',
        pssd_item_uom: '',
        unit_rate: '',
        price_based_on: '',
        amount: '',
        discount: '',
        discount_based_on: '',
        discount_amt: '',
        net_amt: '',
        qc_deduction: '',
        net_amt_after_qc: '',
        tax_code: '',
        tax_rate: '',
        cgstamt: '',
        sgstamt: '',
        igstamt: '',
        tax_amt: '',
        gross_amt: '',
        qc_norms: '',
        warehouse_name: '',
        rack: '',
        stack_uom: '',
        stack_qty: '',
        restwt: ''

      })]),
      pur_good_receipt_driver_dtls: this.fb.group({
        spot_trans: '',
        remarks: '',
        driver_name: '',
        phone: '',
        address: '',
        doc_type: '',
        doc_no: '',
        description: '',
        doc_img: '',
      }),


      pur_good_reciept_trans_info: this.fb.group({
        trans_borne_by: '',
        mode_of_trans: '',
        transporter_code: '',
        transportation_rate: '',
        payment_mode: '',
        payment_term: '',
        bank_name: '',
        cash_limit: '',
        acc_name: '',
        acc_no: '',
        branch: '',
        iban: '',
        bic_swift_code: ''
      }),

      pur_goods_receipt_other_information: this.fb.group({
        pty_gross_wt: '',
        pty_gross_uom: '',
        pty_tare_wt: '',
        pty_tare_uom: '',
        pty_net_wt: '',
        pty_net_uom: '',
        pty_weigh_bridge_name: '',
        pty_weigh_slip_no: '',
        pty_weigh_date: '',
        own_gross_wt: '',
        own_gross_uom: '',
        own_tare_wt: '',
        own_tare_uom: '',
        own_net_wt: '',
        own_net_uom: '',
        own_weigh_bridge_name: '',
        own_weigh_slip_no: '',
        own_weigh_date: '',
        adv_freight_charge: '',
        freight_paid_amt: '',
        dc_no: '',
        dc_date: '',
        cn_no: '',
        cn_date: '',
        arg_tax_dtl: '',
        arg_tax_amt: '',
        vehicle_id: '',
        bill_amt: '',
        checkpost_name: '',
        entry_date: '',
        remarks: ''
      }),

      pur_good_receipt_broker: this.fb.array([this.fb.group({
        sl_no: this.broker_sl_no,
        ven_code_name: '',
        ven_name: '',
        basis: '',
        rate: '',
        brokerage_acc: '',
        tds_acc: '',
        tds_rate: ''
      })]),

      pur_good_receipt_docs: this.fb.array([this.fb.group({
        doc_name: ''
      })]),

      pur_good_receipt_resource_cost: this.fb.array([this.fb.group({
        charge_name: '',
        rate_cal_method: '',
        amount: '',
        tax_rate: '',
        tax_amt: '',
        gross_amt: ''
      })])
    });
    this.userForm1 = fb.group(
      {
        order1_no: [''],
        fromdate: [''],
        todate: [''],
        supplier_name1: [''],
        pur_type1: ['']
      });
  }

  get order1_no() { return this.userForm1.get("order1_no") as FormControl }
  get fromdate() { return this.userForm1.get("fromdate") as FormControl }
  get todate() { return this.userForm1.get("todate") as FormControl }
  get supplier_name1() { return this.userForm1.get("supplier_name1") as FormControl }
  get pur_type1() { return this.userForm1.get("pur_type1") as FormControl }

  get id() { return this.userForm.get("id") as FormControl }
  get grn_id() { return this.userForm.get("grn_id") as FormControl }
  get b_unit() { return this.userForm.get("b_unit") as FormControl }

  get receipt_criteria() { return this.userForm.get("receipt_criteria") as FormControl }
  get multiunloadadvice() { return this.userForm.get("multiunloadadvice") as FormControl }


  get item_type() { return this.userForm.get("item_type") as FormControl }
  get grn_date() { return this.userForm.get("grn_date") as FormControl }
  get grn_no() { return this.userForm.get("grn_no") as FormControl }
  get supplier_name() { return this.userForm.get("supplier_name") as FormControl }
  get referance_type() { return this.userForm.get("referance_type") as FormControl }
  get vehicle_id() { return this.userForm.get("vehicle_id") as FormControl }
  get sales_process() { return this.userForm.get("sales_process") as FormControl }
  get sales_order() { return this.userForm.get("sales_order") as FormControl }
  get applicable_charges_id() { return this.userForm.get("applicable_charges_id") as FormControl }
  get remarks() { return this.userForm.get("remarks") as FormControl }
  get brokerage_active() { return this.userForm.get("brokerage_active") as FormControl }
  get referance_id() { return this.userForm.get("referance_id") as FormControl }
  get company_id() { return this.userForm.get("company_id") as FormControl }
  get fin_year() { return this.userForm.get("fin_year") as FormControl }

  get purchase_type() { return this.userForm.get("purchase_type") as FormControl }
  get purchase_subtype() { return this.userForm.get("purchase_subtype") as FormControl }



  get pur_good_receipt_driver_dtls() { return this.userForm.get('pur_good_receipt_driver_dtls') as FormGroup; }
  get pur_good_receipt_Business_Partner_details() { return this.userForm.get('pur_good_receipt_Business_Partner_details') as FormGroup; }
  get pur_good_receipt_item_details() { return this.userForm.get('pur_good_receipt_item_details') as FormArray; }
  get pur_good_reciept_trans_info() { return this.userForm.get('pur_good_reciept_trans_info') as FormGroup; }
  get pur_goods_receipt_other_information() { return this.userForm.get('pur_goods_receipt_other_information') as FormGroup; }
  get pur_good_receipt_resource_cost() { return this.userForm.get('pur_good_receipt_resource_cost') as FormArray; }
  get pur_good_receipt_docs() { return this.userForm.get('pur_good_receipt_docs') as FormArray; }
  get pur_good_receipt_broker() { return this.userForm.get('pur_good_receipt_broker') as FormArray; }

  get pur_good_receipt_item_detailsForms() {
    return this.pur_good_receipt_item_details.controls
  }

  //private salesProcessValChangeSub?: Subscription;

  ngOnInit() {
    /*this.salesProcessValChangeSub = this.sales_process.valueChanges.subscribe((newVal)=>{
      if(["Job Work", "Sale"].includes(newVal)) {
        this.pur_good_receipt_item_detailsForms.forEach((fg)=>{
          fg.patchValue({ warehouse_name: '', rack: '' });
          fg.get("warehouse_name").disable();
          fg.get("rack").disable();
        });
      } else {
        this.pur_good_receipt_item_detailsForms.forEach((fg)=>{
          fg.get("warehouse_name").enable();
          fg.get("rack").enable();
        });
      }
    });*/

    //this.getProducts({ page: "0", size: "10" });
    this.disvehicle = true;
    this.viewdriver = false;

    //For User Role
    let accessdata = JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
    this.grnsave = false;
    this.grnupdate = false;
    this.grnview = false;
    this.grnprint = false;
    this.grndelete = false;

    if (accessdata.includes('grn.save')) {
      this.grnsave = true;
    }
    if (accessdata.includes('grn.update')) {
      this.grnupdate = true;
    }
    if (accessdata.includes('grn.print')) {
      this.grnprint = true;
    }
    if (accessdata.includes('grn.view')) {
      this.grnview = true;
    }
    if (accessdata.includes('grn.delete')) {
      this.grndelete = true;
    }

    this.status = false;
    this.isHidden = false;
    // this.pusubtype= '0';
    this.itmType = true;
    this.itmSubType = '0';
    this.businessUnit = '0';
    this.ownTareWt = 0;
    this.ownGrossWt = 0;
    this.partyTareWt = 0;
    this.partyGrossWt = 0;
    this.action = 'update';
    this.empty_bag_wt_priceBasedOn = [];
    this.empty_bag_wt = [];
    this.packingItem = [];
    this.capacity = [];
    this.storepurchase = false;
    this.potype_packing = false;
    this.refType = ["FROM JOBWORK", "INVENTORY TRANSFER", "OPEN GRN", "UNLOAD ADVICE", "UNLOAD ADVICE WW", "PURCHASE ORDER"];
    this.transBrone = ["FOB", "FOR"];
    //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
    if ((this.currentDate >= formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en')) && (this.currentDate <= formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en'))) {
      //console.log("sucess");
    }
    else {
      alert("Current date is not in Selected Financial period!!!!!!")
      this.currentDate = formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
    }

    this.modeOfTransport = ["BY AIR", "BY ROAD", "BY SHIP", "BY TRAIN", "N/A"];
    this.transRate = ["PER TRUCK", "PER UOM"];
    this.payModes = ["CASH", "CHEQUE", "DD", "NEFT", "RTGS"];
    this.item_types = ["MATERIAL", "SERVICE"];
    // this.puSubTypeList=[{display: "Camp Purchase"},{display: "E-Open Purchase"},{display: "Hat Purchase"},{display: "PDS Purchase"}];
    this.company_name = localStorage.getItem("company_name");
    this.userForm.patchValue({ referance_id: '0' });

    this.purchase_type_new = '0';
    this.purchase_subtype_new = '0';
    this.supplier_name_new = '0';
    this.referance_type_new = '0';
    this.vehicle_id_new = '0';
    let finyear = localStorage.getItem("financial_year");
    this.salesOrderListShow = false;

    console.log("sales Order List:: ",this.salesOrderListShow);

    forkJoin(
      this.DropDownListService.getChargeMasterList(),
      // this.DropDownListService.getCompanyBUMNCList(this.company_name),
      this.DropDownListService.getcompanyBUMNCListFastApi(this.company_name),
      //this.Service.getPurchaseGoodReceipt(),
      //this.DropDownListService.itemNamesList(),
      this.DropDownListService.itemNamesNewList(),
      //this.DropDownListService.itemTypeList(this.company_name),
      //this.DropDownListService.itemTypeListNew(this.company_name),
      this.DropDownListService.itemTypeListFastAPI(this.company_name),
      // this.DropDownListService.transporterNamesList(),
      this.DropDownListService.customUOMList(),
      this.DropDownListService.payTermNameList(),
      this.DropDownListService.ledgerNameList(),
      //this.DropDownListService.getVehcleno(),
      this.DropDownListService.getVehiclenoallNew(),
      // this.DropDownListService.supplierNamesList(this.company_name),
      this.DropDownListService.supplierNamesNewList(this.company_name),
      // this.DropDownListService.getGRNList(this.currentDate,finyear)
      this.DropDownListService.getGRNListData(this.currentDate, finyear),
      this.DropDownListService.taxList()
      //  ).subscribe(([chargesMasterData, companyBUMNCList, purGReceiptData, itemNameData,
    ).subscribe(([chargesMasterData, companyBUMNCList, itemNameData,
      itemTypeData, customUOMData, paytermData, ledgerData, vehicleData, suppData, gRNList, taxlist]) => {
      this.taxdata = taxlist;
      console.log("grn list::" + JSON.stringify(gRNList))
      this.supplierNames_List = suppData;
      this.chargesIdList = chargesMasterData;
      this.bussiness_unit_list = companyBUMNCList;
      //this.listPurchaseGRN  = purGReceiptData;
      this.listPurchaseGRN = gRNList;
      this.item_codes = itemNameData;
      this.itemtypes = itemTypeData;
      // this.transporterNames = transporterNameData;
      this.customUOMDyns = customUOMData;
      this.payTerms = paytermData;
      this.ledgerNames = ledgerData;
      this.vehicleList = vehicleData;
      this.userForm.patchValue({ b_unit: "0", item_sub_type: "0" });
      this.pur_good_receipt_item_details.at(0).patchValue({
        adv_item_qty: 0, adv_pack_qty: 0, rcv_item_qty: 0,
        rcv_pack_qty: 0, pssd_item_qty: 0, pssd_pack_qty: 0, unit_rate: 0, price_based_on: '0',
        discount_based_on: '0', qc_deduction: 0, adv_mat_wt: 0, rcv_mat_wt: 0, pssd_mat_wt: 0, discount: 0, con_factor: 0
      });
      this.b_unit_new = 'CBU00001';
      this.status = true;
      if (localStorage.getItem("svalue") == 'true') {
        //alert(localStorage.getItem("sid")+"//"+localStorage.getItem("sno")+"//"+localStorage.getItem("saction"));
        this.onUpdate(localStorage.getItem("sid"), localStorage.getItem("sno"), localStorage.getItem("saction"));
      }

    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });
  }

  getPartyGrossWt(event) {
    this.partyGrossWt = event.target.value;
    this.pur_goods_receipt_other_information.patchValue({ pty_net_wt: (Math.round(Math.abs(this.partyGrossWt - this.partyTareWt) * 100) / 100).toFixed(3) });
  }

  getPartyTareWt(event) {
    this.partyTareWt = event.target.value;
    this.pur_goods_receipt_other_information.patchValue({ pty_net_wt: (Math.round(Math.abs(this.partyGrossWt - this.partyTareWt) * 100) / 100).toFixed(3) });
  }

  getOwnGrossWt(event) {
    this.ownGrossWt = event.target.value;
    this.pur_goods_receipt_other_information.patchValue({ own_net_wt: (Math.round(Math.abs(this.ownGrossWt - this.ownTareWt) * 100) / 100).toFixed(3) });
  }

  getOwnTareWt(event) {
    this.ownTareWt = event.target.value;
    this.pur_goods_receipt_other_information.patchValue({ own_net_wt: (Math.round(Math.abs(this.ownGrossWt - this.ownTareWt) * 100) / 100).toFixed(3) });
  }

  addItem() {
    this.item_sl_no = this.item_sl_no + 1;
    this.pur_good_receipt_item_details.push(this.fb.group({
      slno: this.item_sl_no,
      adv_item_code: '',
      adv_item_name: '',
      classified_item_name: '',
      hsn_code: '',
      adv_packing: '',
      packing_item_code: '',
      packing_type: '',
      packing_size: '',
      packing_weight: '',
      adv_pack_qty: '',
      adv_pack_uom: '',
      adv_item_qty: '',
      adv_mat_wt: '',
      adv_item_uom: '',
      rcv_pack_qty: '',
      rcv_pack_uom: '',
      rcv_item_qty: '',
      rcv_mat_wt: '',
      rcv_item_uom: '',
      pssd_pack_qty: '',
      pssd_pack_uom: '',
      pssd_item_qty: '',
      pssd_mat_wt: '',
      pssd_item_uom: '',
      con_factor: '',
      unit_rate: '',
      price_based_on: '',
      amount: '',
      discount: '',
      discount_based_on: '',
      discount_amt: '',
      net_amt: '',
      qc_deduction: '',
      net_amt_after_qc: '',
      tax_code: '',
      tax_rate: '',
      cgstamt: '',
      sgstamt: '',
      igstamt: '',
      tax_amt: '',
      gross_amt: '',
      qc_norms: '',
      warehouse_name: '',
      rack: '',
      stack_uom: '',
      stack_qty: '',
      restwt: ''
    }));

    this.pur_good_receipt_item_details.at(this.item_sl_no - 1).patchValue({
      adv_item_qty: 0, hsn_code: '', classified_item_name: '', adv_pack_qty: 0, rcv_item_qty: 0,
      rcv_pack_qty: 0, pssd_item_qty: 0, pssd_pack_qty: 0, unit_rate: 0, price_based_on: '0',
      discount_based_on: '0', qc_deduction: 0, adv_mat_wt: 0, rcv_mat_wt: 0, pssd_mat_wt: 0, discount: 0, con_factor: 0, restwt: 0
    });
  }

  deleteItem(index) {
    if (this.item_sl_no > 1) {
      this.packingItem.slice(index, 1);
      this.capacity.slice(index, 1);
      this.pur_good_receipt_item_details.removeAt(index);
      this.item_sl_no = this.item_sl_no - 1;
    }
    else {
      this.item_sl_no = 1;
      alert("can't delete all rows");
      this.pur_good_receipt_item_details.reset();
      this.pur_good_receipt_item_details.at(0).patchValue({ slno: this.item_sl_no });
    }

    for (let i = 1; i <= this.item_sl_no; i++)
      this.pur_good_receipt_item_details.at(i - 1).patchValue({ slno: i });

  }

  add1() {
    this.pur_good_receipt_resource_cost.push(this.fb.group({
      charge_name: '',
      rate_cal_method: '',
      amount: '',
      tax_rate: '',
      tax_amt: '',
      gross_amt: ''
    }));
  }

  addBroker() {
    this.broker_sl_no = this.broker_sl_no + 1;
    this.pur_good_receipt_broker.push(this.fb.group({
      sl_no: this.broker_sl_no,
      ven_code_name: '',
      ven_name: '',
      basis: '',
      rate: '',
      brokerage_acc: '',
      tds_acc: '',
      tds_rate: ''
    }))
  }

  deleteBroker(index) {
    if (this.broker_sl_no > 1) {
      this.pur_good_receipt_broker.removeAt(index);
      this.broker_sl_no = this.broker_sl_no - 1;
    }
    else {
      this.broker_sl_no = 1;
      alert("can't delete all rows");
      this.pur_good_receipt_broker.reset();
      this.pur_good_receipt_broker.at(0).patchValue({ sl_no: this.broker_sl_no });
    }

    for (let i = 1; i <= this.broker_sl_no; i++)
      this.pur_good_receipt_broker.at(i - 1).patchValue({ sl_no: i });

  }

  addDocument() {
    this.pur_good_receipt_docs.push(this.fb.group({
      doc_name: ''
    }));
  }

  deleteDocument(index) {
    if (index) { this.pur_good_receipt_docs.removeAt(index); }
    else {
      alert("can't delete all rows");
      this.pur_good_receipt_docs.reset();
    }
  }

  check4(ev) {
    if (ev.checked)
      this.isChecked4 = true;
    else
      this.isChecked4 = false;
  }

  showList(s: string) {
    if (this.grnsave == true && this.grnupdate == true)//true exist  false not exist 
    {
      if (s == "add") {
        this.isHidden = true;
        this.storepurchase = false;
        this.potype_packing = false;
      }
    }
    if (this.grnsave == true && this.grnupdate == false) {
      if (s == "add") {
        this.isHidden = true;
        this.storepurchase = false;
        this.potype_packing = false;
      }
    }

    if (s == "list") {
      this.isHidden = false;
      this.storepurchase = false;
      this.potype_packing = false;
      this.action = 'update';
      this.userForm.reset();
      this.pur_good_receipt_item_details.reset();
      this.pur_good_receipt_Business_Partner_details.reset();
      this.pur_good_reciept_trans_info.reset();
      this.pur_goods_receipt_other_information.reset();
      this.selectedItemName = [];
      this.packingItem = [];
      this.item_sl_no = 0;
      while (this.pur_good_receipt_item_details.length)
        this.pur_good_receipt_item_details.removeAt(0);
      this.addItem();

      this.broker_sl_no = 0;
      while (this.pur_good_receipt_broker.length)
        this.pur_good_receipt_broker.removeAt(0);
      this.addBroker();

      while (this.pur_good_receipt_docs.length)
        this.pur_good_receipt_docs.removeAt(0);
      this.addDocument();

      while (this.pur_good_receipt_resource_cost.length)
        this.pur_good_receipt_resource_cost.removeAt(0);
      this.add1();
      //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      //window.location.reload()
    }
  }

  onChangeBussinessUnit(buss_id: string, operation) {
    this.warehouses = []
    this.stackList = [];


    this.businessUnit = buss_id;
    if (buss_id != '0') {
      if (this.pusubtype != '' && this.itmSubType != '0' && operation != 'update') { this.getGrnNo(this.businessUnit, this.itmType, this.itmSubType, this.pusubtype, this.currentDate) }
      this.status = false;
      forkJoin(
        this.DropDownListService.getWHListbyBUnitFastApi(buss_id),
        //this.DropDownListService.getSupplierThruBU(buss_id)
        this.DropDownListService.getSupplierThruBUNew(buss_id),
        this.DropDownListService.getCompanyBussinessUnitDetails(localStorage.getItem("company_name"),buss_id) 
      ).subscribe(([wearHouseData, supplierData,companystate]) => {
        console.log("Check :" + JSON.stringify(wearHouseData))
        this.warehouses = wearHouseData.concat([{ warehouse_code: 'MULTIPLE', warehouse_name: 'MULTIPLE' }]);
        this.supplierNames = supplierData;
        this.company_state=companystate["state_name"]
        this.status = true;
      })
      //  this.DropDownListService.getWHListbyBUnit(buss_id).subscribe(data1=>{            
      // });
    }
  }

  onChangeGrnDate(event) {
    this.currentDate = event.target.value;
    if ((this.currentDate >= formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en')) && (this.currentDate <= formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en'))) {
      if (this.pusubtype != '' && this.businessUnit != '0' && this.itmSubType != '0') { this.getGrnNo(this.businessUnit, this.itmType, this.itmSubType, this.pusubtype, this.currentDate) }
    }
    else {
      alert("Selected  date is not in Selected Financial period!!!!!!")
      this.currentDate = formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
    }
  }

  onChangeItemType(event) {
    this.itmType = event;
    if (this.businessUnit != '0' && this.itmSubType != '0' && this.pusubtype != '') { this.getGrnNo(this.businessUnit, this.itmType, this.itmSubType, this.pusubtype, this.currentDate) }
  }

  onChangeItemSubType(event, operation) {
    this.itmSubType = event;
    if (this.businessUnit != '0' && this.pusubtype != '' && this.itmSubType != '0' && operation != 'update') {
      //console.log("chk it:"+this.businessUnit+"//"+this.itmType+"//"+this.itmSubType+"//"+this.pusubtype+"//"+this.currentDate)
      this.getGrnNo(this.businessUnit, this.itmType, this.itmSubType, this.pusubtype, this.currentDate)
    }

    if (this.itmSubType != "0") {
      this.status = false;
      if (this.itmSubType == 'ITMT00008') {
        this.DropDownListService.getItemThruType("ITMT00001").subscribe(data => {
          this.item_codes = data;
          this.status = true;
        })
      }
      else {
        this.DropDownListService.getItemThruType(event).subscribe(data => {
          this.item_codes = data;
          this.status = true;
        })
      }
      if (this.itmSubType == 'ITMT00004') {
        console.log(" Store Purchase")
        this.userForm.patchValue({ multiunloadadvice: false }); //for store purchase multiple not done and disable
        this.storepurchase = true;
      }
      else {
        this.storepurchase = false;
      }
      if (this.itmSubType == 'ITMT00002') // packing
      {
        this.potype_packing = true;
      }
      else {
        this.potype_packing = false;
      }
    }
  }

  onChangeItemSubType1(ItemSubType, operation) {
    this.DropDownListService.getItemThruType(ItemSubType).subscribe(data => {
      this.item_codes = data;
    })

  }

  onChangePOSubType(event) {

    this.pusubtype = event.value;



    if (this.businessUnit != '0' && this.pusubtype != '' && this.itmSubType != '0') {
      console.log("chk it222:" + this.businessUnit + "//" + this.itmType + "//" + this.itmSubType + "//" + this.pusubtype + "//" + this.currentDate)
      this.getGrnNo(this.businessUnit, this.itmType, this.itmSubType, this.pusubtype, this.currentDate)
    }

  }

  getGrnNo(businessUnit, itmType, itmSubType, pusubType, grnDate) {
    this.status = false;
    // alert("bunit/"+businessUnit+"itype/"+itmType+"itmSubType/"+itmSubType+"pusubType/"+pusubType+"grnDate/"+grnDate);
    this.DropDownListService.getGRNSequenceId(businessUnit + "/" + itmType + "/" + itmSubType + "/" + pusubType + "/" + grnDate).subscribe(data => {
      this.seq_no = data.sequenceid;
      this.status = true;
    });
  }

  onChangeApplicableCharges(applicable_charges_id: string) {
    this.DropDownListService.getChargeMasterDtlsList(applicable_charges_id).subscribe(data => {
      let i = 0;
      while (this.pur_good_receipt_resource_cost.length) { this.pur_good_receipt_resource_cost.removeAt(0); }
      for (let data1 of data) {
        this.add1();
        this.pur_good_receipt_resource_cost.at(i).patchValue({
          charge_name: data1.charge_name, rate_cal_method: data1.method,
          tax_rate: data1.tax_rate
        });
        i = i + 1;
      }
    });
  }

  stackList: any = [];
  onChangeWarehouse(event, index) {
    this.status = false;
    if (event != '' && event != null) {
      console.log("11111  " + event)
      /*this.DropDownListService.getBinDescByWarehouse(event).subscribe(data1=>
      {      
        console.log("stackListData: "+JSON.stringify(data1))  
        this.status=true; 
        this.stackList[index] = data1;
      }); 
      */

      this.DropDownListService.getStackNoByWarehouse(event).subscribe(data1 => {
        console.log("stackListData: " + JSON.stringify(data1))
        this.status = true;
        this.stackList[index] = data1.concat([{ stack_no: 'MULTIPLE'}]);
      });
    }
  }

  onChangeRack(rack, index) {
    this.status = false;
    if (rack.length > 0 && rack != null) {
      //console.log("rack::"+rack)
      this.DropDownListService.getStackUom(rack).subscribe(data1 => {
        //console.log("stackListData: "+JSON.stringify(data1))  
        this.status = true;
        this.pur_good_receipt_item_details.at(index).patchValue({ stack_uom: data1["packing_uom"] });
      });
    }
  }

  //onchangeBrokerName(index, event)
  //{
  //  if(event)
  //  {
  //    this.DropDownListService.getBrokerDetailsByBrokerCode(event.target.value).subscribe(data=>
  //    {this.pur_good_receipt_broker.at(index).patchValue(data[0]);});
  //   }  
  // }

  onChangeBrokerName(index, broker_code: string) {
    this.pur_good_receipt_broker.at(index).patchValue({
      basis: null, rate: null,
      brokerage_acc: null, tds_rate: null, tds_acc: null
    });
    if (broker_code != '0') {
      this.status = false;
      this.DropDownListService.getBrokerDetailsByBrokerCode(broker_code).subscribe(data => {
        this.pur_good_receipt_broker.at(index).patchValue({
          basis: data[0].basis, based_on: data[0].based_on,
          rate: data[0].rate, brokerage_acc: data[0].brokerage_acc, tds_rate: data[0].tds_rate, tds_acc: data[0].tds_acc
        });
        this.status = true;
      });
    }
  }

  // onChangeSupplierName(supplier_code:string)
  // {
  //   if(supplier_code != "0")
  //   {
  //     this.status = false;
  //   // this.DropDownListService.getSupplierAddress(supplier_code).subscribe(data=>
  //   // {this.pur_Order_BPDetails.patchValue({supp_address: data.address});});

  //     this.DropDownListService.getBrokerListBySupplierCode(supplier_code).subscribe(data=>
  //     {
  //       this.brokerNameList = data;
  //       this.status = true;
  //     });

  //   // this.DropDownListService.getSupplierDetailsByCode(supplier_code).subscribe(data=>
  //   // {
  //   //   let i =0;
  //     // while(this.pur_Order_dtls.length){ this.pur_Order_dtls.removeAt(0);}
  //     // for(let data1 of data)
  //     // {
  //     //   this.add4();
  //     //   this.pur_Order_dtls.at(i).patchValue({
  //       //   cp_name: data1.contact_person, cp_designation: data1.designation,
  //       //   cp_phone: data1.phone, cp_mobile: data1.mobile, 
  //       //   cp_fax: data1.mobile, cp_email: data1.fax});          
  //     //  i=i+1;
  //     // }   
  //   //});    
  //   }
  // }

  onChangeSupplierName(suppid: string) {

    this.pur_good_receipt_Business_Partner_details.patchValue({
      cp_designation: null, cp_phone: null,
      cp_fax: null, cp_email: null, cp_address: null, supp_phone: null, supp_fax: null, supp_email: null, supp_address: null
    });
    this.userForm.patchValue({ pan_no: null, gst_no: null, cin_no: null, tan_no: null });
    //this.pur_Order_broker.reset();
    this.contAddrs = [];
    this.delvAddrs = [];
    this.transporterNames = [];
    this.onChangePaymentMode("0");
    // this.onChangeTcsApplicable("0");

    this.pur_good_reciept_trans_info.patchValue({
      payment_term: "0", acc_name: null,
      acc_no: null, bank_name: null, iban: null, bic_swift_code: null, branch: null
    });

    this.pur_good_reciept_trans_info.patchValue({
      bic_swift_code: null, iban: null, payment_mode: "0", payment_term: "0",
      bank_name: null, acc_name: null, acc_no: null, branch: null, cash_limit: 0
    });

    if (suppid.length && suppid != '0') {
      //alert(suppid)
      this.DropDownListService.getSupplierAddrFast(suppid).subscribe(address => {
       // console.log(this.company_state+"address::" + JSON.stringify(address))
        this.state = address.state;
        //if (this.state == 'BIHAR') { this.statestatus = 0; }
        if (this.state == this.company_state) { this.statestatus = 0; }
        else {
          this.statestatus = 1;
        }
      });

      this.DropDownListService.getSuppliertransport(suppid).subscribe(data12 => {

        if (data12[0].transport_own == 'YES') {



          this.status = false;
          this.supplier_id = suppid;
          forkJoin(
            this.DropDownListService.getBrokerListBySupplierCode(suppid),
            this.DropDownListService.getAddrById(suppid),
            this.DropDownListService.getSuppAddrById(suppid),
            this.DropDownListService.getDeliveryAddrById(suppid),
            this.DropDownListService.getSuppContactNameList(suppid),
            this.DropDownListService.getTransporterThruSupplier(suppid)
          ).subscribe(([BrokerData, data3, data4, data5, data6, data7]) => {
            this.brokerNameList = BrokerData;
            this.pur_good_receipt_Business_Partner_details.patchValue({ sp_address: data3["address"] });
            this.contAddrs = data4;
            this.delvAddrs = data5;
            this.payToDFrom = data6;
            this.transporterNames = data7;
            this.status = true;
          });

        }
        if (data12[0].transport_own == 'NO') {

          this.status = false;
          this.supplier_id = suppid;
          forkJoin(
            this.DropDownListService.getBrokerListBySupplierCode(suppid),
            this.DropDownListService.getAddrById(suppid),
            this.DropDownListService.getSuppAddrById(suppid),
            this.DropDownListService.getDeliveryAddrById(suppid),
            this.DropDownListService.getSuppContactNameList(suppid),
            // this.DropDownListService.getTransporterThruSupplier(suppid)
            //  ).subscribe(([BrokerData, data3, data4, data5, data6, data7])=>
          ).subscribe(([BrokerData, data3, data4, data5, data6]) => {
            this.brokerNameList = BrokerData;
            this.pur_good_receipt_Business_Partner_details.patchValue({ sp_address: data3["address"] });
            this.contAddrs = data4;
            this.delvAddrs = data5;
            this.payToDFrom = data6;
            //   this.transporterNames = data7;
            this.status = true;
          });



        }






      });






    }
  }

  OnChangeTransporterName(transporter_id: string) {

    this.pur_good_reciept_trans_info.patchValue({
      bic_swift_code: null, iban: null,
      payment_mode: null, payment_terms: null, bank_name: null, account_name: null,
      account_no: null, ifsc_code: null, mobile: null, branch: null, cash_limit: 0
    });
    if (transporter_id != "0") {
      this.status = false;
      this.DropDownListService.getTransAccount(transporter_id).subscribe(data => {
        this.pur_good_reciept_trans_info.patchValue({
          bic_swift_code: data["bic_swift_code"],
          iban: data["iban"], payment_mode: data["mode_of_pay"], payment_term: data["pay_term"],
          bank_name: data["bank_name"], acc_name: data["acc_holder_name"],
          acc_no: data["acc_no"], branch: data["branch"], cash_limit: data["cash_limit"]
        });

        if (data["mode_of_pay"] == "Cash") {
          this.is_cash_limit_active = true;
        }

        if (data["mode_of_pay"] != "Cash")
          this.pur_good_reciept_trans_info.patchValue({ cash_limit: 0 })
        this.status = true;
      });
    }
  }

  onChangeReferenceType(referenceNo: String) {
    //   alert(referenceNo)
    if (referenceNo == 'Open GRN' || referenceNo == 'OPEN GRN') {
      this.pur_goods_receipt_other_information.reset();
      this.pur_goods_receipt_other_information.patchValue({
        pty_gross_uom: "0", pty_tare_uom: "0", pty_net_uom: "0",
        own_gross_uom: "0", own_tare_uom: "0", own_net_uom: "0", vehicle_id: "0"
      });

      //here changes 09-05-2022
      //alert("first op"+this.dynamicgrnstatus );
      this.dynamicgrnstatus = true;
      //alert("second op" +this.dynamicgrnstatus);
      this.disvehicle = false;
      this.viewdriver = true;
      this.pur_good_receipt_driver_dtls.reset();
    }
    else {
      this.dynamicgrnstatus = false;
      this.disvehicle = true;
      this.viewdriver = false;
      this.pur_good_receipt_driver_dtls.reset();
      this.pur_good_receipt_driver_dtls.patchValue({
        spot_trans: '',
        remarks: '',
        driver_name: '',
        phone: '',
        address: '',
        doc_type: '',
        doc_no: '',
        description: '',
        doc_img: ''
      })
      // alert(this.dynamicgrnstatus);
    }



  }

  onChangeSuppInfoName(name: String) {
    this.pur_good_receipt_Business_Partner_details.patchValue({ sp_phone: null, sp_fax: null, sp_email: null });
    if (name == "" || name == null) {

    }
    else
    // if(name != "0")
    {
      console.log("ENTER  :: " + name)
      this.status = false;
      this.DropDownListService.getSupplierContDetails(this.supplier_id, name).subscribe(data => {
        this.pur_good_receipt_Business_Partner_details.patchValue({
          sp_phone: data["phone"],
          sp_fax: data["fax"], sp_email: data["email"]
        });
        this.status = true;
      });
    }

  }

  onChangeContInfoName(suppid: String) {
    this.pur_good_receipt_Business_Partner_details.patchValue({ cp_designation: null, cp_phone: null, cp_fax: null, cp_email: null, cp_address: null });
    if (suppid != '0') {
      this.status = false;
      this.DropDownListService.getSupplierDelvFromAdd(this.supplier_id, suppid).subscribe(data => {
        this.pur_good_receipt_Business_Partner_details.patchValue({
          cp_designation: data["designation"],
          cp_phone: data["phone"], cp_fax: data["fax"],
          cp_email: data["email"], cp_address: data["address"]
        });
        this.status = true;
      });
    }
  }

  is_cash_limit_active = false;
  onChangePaymentMode(payment_mode: string) {
    if (payment_mode == "Cash") {
      this.is_cash_limit_active = true;
    }
    else {
      this.is_cash_limit_active = false;
      this.pur_good_reciept_trans_info.patchValue({ cash_limit: 0 });
    }
  }

  getAdvPackingQty(packing_qty, index) {
    this.advPackQty = packing_qty.target.value;
    let alluom: any = [];
    alluom = JSON.parse(localStorage.getItem("ALLUOM"));
    if (this.userForm.get("purchase_type").value == 'ITMT00004' || this.userForm.get("purchase_type").value == 'ITMT00002') {
      if (this.pur_good_receipt_item_details.at(index).get("price_based_on").value == "Packing") {

        let compareqty: boolean = false;
        compareqty = Math.round(Number(this.pur_good_receipt_item_details.at(index).get("restwt").value))
          >= Math.round(Number(packing_qty.target.value));

        if (compareqty == true) {
          this.advPackQty = packing_qty.target.value;
        }
        else {
          alert("Material Weight exceeded in respect with purchase order :: " + this.pur_good_receipt_item_details.at(index).get("restwt").value);
          this.pur_good_receipt_item_details.at(index).patchValue({ adv_pack_qty: this.pur_good_receipt_item_details.at(index).get("restwt").value });
          this.advPackQty = this.pur_good_receipt_item_details.at(index).get("restwt").value;

        }
      }
    }
    else {
      //vineet Starts
      if (this.pur_good_receipt_item_details.at(index).get("adv_item_uom").value == "PCS") {
        this.advItemQty = Math.round(this.capacity[index] * packing_qty.target.value);
      }
      else {
        alluom.forEach(element => {
          if (element.description == this.pur_good_receipt_item_details.at(index).get("adv_item_uom").value) {
            this.advItemQty = Number(this.capacity[index] * packing_qty.target.value).toFixed(Number(element.decimalv));
          }
        });

      }

      if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') {
        this.advMatWt = this.advItemQty - (this.empty_bag_wt[index] * this.advPackQty);
      }
      else {
        this.advMatWt = this.advItemQty - (this.advItemQty * this.empty_bag_wt[index]) / 100;
      }
      //this.pur_good_receipt_item_details.at(index).patchValue({adv_item_qty: this.advItemQty, adv_mat_wt: (Math.round(this.advMatWt * 1000)/1000).toFixed(3)}); 
      this.pur_good_receipt_item_details.at(index).patchValue({ adv_item_qty: this.advItemQty, adv_mat_wt: (Math.round(this.advMatWt * 1000) / 1000).toFixed(3) });
      //vineet ends
      if (this.userForm.get("referance_type").value == "OPEN GRN") {

        if (this.userForm.get("purchase_type").value == "ITMT00004") {
          this.pur_good_receipt_item_details.at(index).patchValue({
            rcv_pack_qty: packing_qty.target.value, rcv_item_qty: this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value, rcv_mat_wt: this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value
            , pssd_pack_qty: packing_qty.target.value, pssd_item_qty: this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value, pssd_mat_wt: this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value
          });
        }
        if (this.userForm.get("purchase_type").value == "ITMT00005") {
          this.pur_good_receipt_item_details.at(index).patchValue({
            rcv_pack_qty: packing_qty.target.value, rcv_item_qty: this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value, rcv_mat_wt: this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value
            , pssd_pack_qty: packing_qty.target.value, pssd_item_qty: this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value, pssd_mat_wt: this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value
          });
        }
        if (this.userForm.get("purchase_type").value == "ITMT00007") {
          this.pur_good_receipt_item_details.at(index).patchValue({
            rcv_pack_qty: packing_qty.target.value, rcv_item_qty: this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value, rcv_mat_wt: this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value
            , pssd_pack_qty: packing_qty.target.value, pssd_item_qty: this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value, pssd_mat_wt: this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value
          });
        }
      }
    }

    this.rcvPackQty = this.pur_good_receipt_item_details.at(index).get("rcv_pack_qty").value as FormControl;
    this.rcvItemQty = this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value as FormControl;
    this.rcvMatWt = this.pur_good_receipt_item_details.at(index).get("rcv_mat_wt").value as FormControl;
    this.pssdPackQty = this.pur_good_receipt_item_details.at(index).get("pssd_pack_qty").value as FormControl;
    this.pssdItemQty = this.pur_good_receipt_item_details.at(index).get("pssd_item_qty").value as FormControl;
    this.pssdMatWt = this.pur_good_receipt_item_details.at(index).get("pssd_mat_wt").value as FormControl;
    this.price = this.pur_good_receipt_item_details.at(index).get("unit_rate").value as FormControl;
    this.based_on = this.pur_good_receipt_item_details.at(index).get("price_based_on").value as FormControl;
    this.discount = this.pur_good_receipt_item_details.at(index).get("discount").value as FormControl;
    this.discountBasedOn = this.pur_good_receipt_item_details.at(index).get("discount_based_on").value as FormControl;
    this.taxRate = this.pur_good_receipt_item_details.at(index).get("tax_rate").value as FormControl;
    this.qcDeduction = this.pur_good_receipt_item_details.at(index).get("qc_deduction").value as FormControl;
    //console.log(this.rcvPackQty + " // " + this.rcvItemQty + " // " + this.rcvMatWt)
    this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty,
      this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)

  }

  getRcvPackingQtyautocalculate(rcv_packing_qty, index) {

    this.rcvPackQty = rcv_packing_qty;//250


    //console.log("hello tuhin :: " + this.empty_bag_wt_priceBasedOn[index] +" /"+ this.rcvMatWt+" / "+this.empty_bag_wt[index]+" / " +this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value +" / " +this.capacity[index]);
    if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') {

      this.rcvMatWt = this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value - (this.empty_bag_wt[index] * this.rcvPackQty);
    }
    else {

      this.rcvMatWt = this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value - (this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value * this.empty_bag_wt[index]) / 100;
    }

    this.pur_good_receipt_item_details.at(index).patchValue({ rcv_item_qty: this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value, rcv_mat_wt: (Math.round(this.rcvMatWt * 1000) / 1000).toFixed(3) });


    var receipt_criteria = this.userForm.get("receipt_criteria").value;

    if (receipt_criteria == 'Advice Weight') {
      this.pur_good_receipt_item_details.at(index).patchValue({ pssd_pack_qty: this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value, pssd_pack_uom: this.pur_good_receipt_item_details.at(index).get("adv_pack_uom").value, pssd_item_qty: this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value, pssd_mat_wt: this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value })
    }
    if (receipt_criteria == 'Recieving Weight') {
      this.pur_good_receipt_item_details.at(index).patchValue({ pssd_pack_qty: this.pur_good_receipt_item_details.at(index).get("rcv_pack_qty").value, pssd_pack_uom: this.pur_good_receipt_item_details.at(index).get("rcv_pack_uom").value, pssd_item_qty: this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value, pssd_mat_wt: this.pur_good_receipt_item_details.at(index).get("rcv_mat_wt").value })
    }
    if (receipt_criteria == 'Lower Weight') {


      var recievingmaterial: number = this.pur_good_receipt_item_details.at(index).get("rcv_mat_wt").value
      var advancematerial: number = this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value

      //console.log("check data::"+recievingmaterial+"/"+advancematerial)
      if (advancematerial >= recievingmaterial) {
        // recievingmaterial    this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value
        // console.log("rec")
        this.pur_good_receipt_item_details.at(index).patchValue({ pssd_pack_qty: this.pur_good_receipt_item_details.at(index).get("rcv_pack_qty").value, pssd_pack_uom: this.pur_good_receipt_item_details.at(index).get("rcv_pack_uom").value, pssd_item_qty: this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value, pssd_mat_wt: this.pur_good_receipt_item_details.at(index).get("rcv_mat_wt").value })


      }
      if (advancematerial <= recievingmaterial) {
        console.log("adv")
        this.pur_good_receipt_item_details.at(index).patchValue({ pssd_pack_qty: this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value, pssd_pack_uom: this.pur_good_receipt_item_details.at(index).get("adv_pack_uom").value, pssd_item_qty: this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value, pssd_mat_wt: this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value })
        //advancematerial
      }



    }




    this.advPackQty = this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value as FormControl;
    this.advItemQty = this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value as FormControl;
    this.advMatWt = this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value as FormControl;
    this.pssdPackQty = this.pur_good_receipt_item_details.at(index).get("pssd_pack_qty").value as FormControl;
    this.pssdItemQty = this.pur_good_receipt_item_details.at(index).get("pssd_item_qty").value as FormControl;
    this.pssdMatWt = this.pur_good_receipt_item_details.at(index).get("pssd_mat_wt").value as FormControl;
    this.price = this.pur_good_receipt_item_details.at(index).get("unit_rate").value as FormControl;
    this.based_on = this.pur_good_receipt_item_details.at(index).get("price_based_on").value as FormControl;
    this.discount = this.pur_good_receipt_item_details.at(index).get("discount").value as FormControl;
    this.discountBasedOn = this.pur_good_receipt_item_details.at(index).get("discount_based_on").value as FormControl;
    this.taxRate = this.pur_good_receipt_item_details.at(index).get("tax_rate").value as FormControl;
    this.qcDeduction = this.pur_good_receipt_item_details.at(index).get("qc_deduction").value as FormControl;

    this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty,
      this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
  }

  getRcvPackingQty(rcv_packing_qty, index) {

    this.rcvPackQty = rcv_packing_qty.target.value;//250


    console.log("hello :: " + this.empty_bag_wt_priceBasedOn[index] + " /" + this.rcvMatWt + " / " + this.empty_bag_wt[index] + " / " + this.rcvItemQty + " / " + this.capacity[index]);
    if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') {

      this.rcvMatWt = this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value - (this.empty_bag_wt[index] * this.rcvPackQty);
    }
    else {

      this.rcvMatWt = this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value - (this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value * this.empty_bag_wt[index]) / 100;
    }

    this.pur_good_receipt_item_details.at(index).patchValue({ rcv_item_qty: this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value, rcv_mat_wt: (Math.round(this.rcvMatWt * 1000) / 1000).toFixed(3) });


    var receipt_criteria = this.userForm.get("receipt_criteria").value;

    if (receipt_criteria == 'Advice Weight') {
      this.pur_good_receipt_item_details.at(index).patchValue({ pssd_pack_qty: this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value, pssd_pack_uom: this.pur_good_receipt_item_details.at(index).get("adv_pack_uom").value, pssd_item_qty: this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value, pssd_mat_wt: this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value })
    }
    if (receipt_criteria == 'Recieving Weight') {
      this.pur_good_receipt_item_details.at(index).patchValue({ pssd_pack_qty: this.pur_good_receipt_item_details.at(index).get("rcv_pack_qty").value, pssd_pack_uom: this.pur_good_receipt_item_details.at(index).get("rcv_pack_uom").value, pssd_item_qty: this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value, pssd_mat_wt: this.pur_good_receipt_item_details.at(index).get("rcv_mat_wt").value })
    }
    if (receipt_criteria == 'Lower Weight') {


      var recievingmaterial: number = this.pur_good_receipt_item_details.at(index).get("rcv_mat_wt").value
      var advancematerial: number = this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value


      if (advancematerial > recievingmaterial) {
        // recievingmaterial    this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value
        console.log("rec")
        this.pur_good_receipt_item_details.at(index).patchValue({ pssd_pack_qty: this.pur_good_receipt_item_details.at(index).get("rcv_pack_qty").value, pssd_pack_uom: this.pur_good_receipt_item_details.at(index).get("rcv_pack_uom").value, pssd_item_qty: this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value, pssd_mat_wt: this.pur_good_receipt_item_details.at(index).get("rcv_mat_wt").value })


      }
      if (advancematerial < recievingmaterial) {
        console.log("adv")
        this.pur_good_receipt_item_details.at(index).patchValue({ pssd_pack_qty: this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value, pssd_pack_uom: this.pur_good_receipt_item_details.at(index).get("adv_pack_uom").value, pssd_item_qty: this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value, pssd_mat_wt: this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value })
        //advancematerial
      }
    }
    this.advPackQty = this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value as FormControl;
    this.advItemQty = this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value as FormControl;
    this.advMatWt = this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value as FormControl;
    this.pssdPackQty = this.pur_good_receipt_item_details.at(index).get("pssd_pack_qty").value as FormControl;
    this.pssdItemQty = this.pur_good_receipt_item_details.at(index).get("pssd_item_qty").value as FormControl;
    this.pssdMatWt = this.pur_good_receipt_item_details.at(index).get("pssd_mat_wt").value as FormControl;
    this.price = this.pur_good_receipt_item_details.at(index).get("unit_rate").value as FormControl;
    this.based_on = this.pur_good_receipt_item_details.at(index).get("price_based_on").value as FormControl;
    this.discount = this.pur_good_receipt_item_details.at(index).get("discount").value as FormControl;
    this.discountBasedOn = this.pur_good_receipt_item_details.at(index).get("discount_based_on").value as FormControl;
    this.taxRate = this.pur_good_receipt_item_details.at(index).get("tax_rate").value as FormControl;
    this.qcDeduction = this.pur_good_receipt_item_details.at(index).get("qc_deduction").value as FormControl;

    this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty,
      this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
  }
  //tuhin changes on 02-05-2022
  getRcvPackingQty3(rcv_packing_qty, index, tm) {

    this.rcvPackQty = rcv_packing_qty.target.value;//250


    console.log("hello :: " + this.empty_bag_wt_priceBasedOn[index] + " /" + this.rcvMatWt + " / " + this.empty_bag_wt[index] + " / " + this.rcvItemQty + " / " + this.capacity[index]);
    if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') {

      this.rcvMatWt = tm[index].controls.rcv_item_qty.value - (this.empty_bag_wt[index] * this.rcvPackQty);
    }
    else {

      this.rcvMatWt = tm[index].controls.rcv_item_qty.value - (tm[index].controls.rcv_item_qty.value * this.empty_bag_wt[index]) / 100;
    }

    this.pur_good_receipt_item_details.at(index).patchValue({ rcv_item_qty: tm[index].controls.rcv_item_qty.value, rcv_mat_wt: (Math.round(this.rcvMatWt * 1000) / 1000).toFixed(3) });


    var receipt_criteria = this.userForm.get("receipt_criteria").value;

    if (receipt_criteria == 'Advice Weight') {
      this.pur_good_receipt_item_details.at(index).patchValue({ pssd_pack_qty: tm[index].controls.adv_pack_qty.value, pssd_pack_uom: tm[index].controls.adv_pack_uom.value, pssd_item_qty: tm[index].controls.adv_item_qty.value, pssd_mat_wt: tm[index].controls.adv_mat_wt.value })
    }
    if (receipt_criteria == 'Recieving Weight') {
      this.pur_good_receipt_item_details.at(index).patchValue({ pssd_pack_qty: tm[index].controls.rcv_pack_qty.value, pssd_pack_uom: tm[index].controls.rcv_pack_uom.value, pssd_item_qty: tm[index].controls.rcv_item_qty.value, pssd_mat_wt: tm[index].controls.rcv_mat_wt.value })
    }
    if (receipt_criteria == 'Lower Weight') {

      var recievingmaterial: number = tm[index].controls.rcv_mat_wt.value
      var advancematerial: number = tm[index].controls.adv_mat_wt.value


      if (advancematerial > recievingmaterial) {
        // recievingmaterial
        console.log("rec")
        this.pur_good_receipt_item_details.at(index).patchValue({ pssd_pack_qty: tm[index].controls.rcv_pack_qty.value, pssd_pack_uom: tm[index].controls.rcv_pack_uom.value, pssd_item_qty: tm[index].controls.rcv_item_qty.value, pssd_mat_wt: tm[index].controls.rcv_mat_wt.value })


      }
      if (advancematerial < recievingmaterial) {
        console.log("adv")
        this.pur_good_receipt_item_details.at(index).patchValue({ pssd_pack_qty: tm[index].controls.adv_pack_qty.value, pssd_pack_uom: tm[index].controls.adv_pack_uom.value, pssd_item_qty: tm[index].controls.adv_item_qty.value, pssd_mat_wt: tm[index].controls.adv_mat_wt.value })
        //advancematerial
      }
    }

    this.advPackQty = this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value as FormControl;
    this.advItemQty = this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value as FormControl;
    this.advMatWt = this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value as FormControl;
    this.pssdPackQty = this.pur_good_receipt_item_details.at(index).get("pssd_pack_qty").value as FormControl;
    this.pssdItemQty = this.pur_good_receipt_item_details.at(index).get("pssd_item_qty").value as FormControl;
    this.pssdMatWt = this.pur_good_receipt_item_details.at(index).get("pssd_mat_wt").value as FormControl;
    this.price = this.pur_good_receipt_item_details.at(index).get("unit_rate").value as FormControl;
    this.based_on = this.pur_good_receipt_item_details.at(index).get("price_based_on").value as FormControl;
    this.discount = this.pur_good_receipt_item_details.at(index).get("discount").value as FormControl;
    this.discountBasedOn = this.pur_good_receipt_item_details.at(index).get("discount_based_on").value as FormControl;
    this.taxRate = this.pur_good_receipt_item_details.at(index).get("tax_rate").value as FormControl;
    this.qcDeduction = this.pur_good_receipt_item_details.at(index).get("qc_deduction").value as FormControl;

    this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty,
      this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
  }

  getPssdPackingQty(pssd_packing_qty, index) {
    this.pssdPackQty = pssd_packing_qty.target.value;
    this.pssdItemQty = this.capacity[index] * this.pssdPackQty;

    if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') { this.pssdMatWt = this.pssdItemQty - (this.empty_bag_wt[index] * this.pssdPackQty); }
    else { this.pssdMatWt = this.pssdItemQty - (this.pssdItemQty * this.empty_bag_wt[index]) / 100; }

    this.pur_good_receipt_item_details.at(index).patchValue({ pssd_item_qty: this.pssdItemQty, pssd_mat_wt: (Math.round(this.pssdMatWt * 1000) / 1000).toFixed(3) });
    this.advPackQty = this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value as FormControl;
    this.advItemQty = this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value as FormControl;
    this.advMatWt = this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value as FormControl;
    this.rcvPackQty = this.pur_good_receipt_item_details.at(index).get("rcv_pack_qty").value as FormControl;
    this.rcvItemQty = this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value as FormControl;
    this.rcvMatWt = this.pur_good_receipt_item_details.at(index).get("rcv_mat_wt").value as FormControl;
    this.price = this.pur_good_receipt_item_details.at(index).get("unit_rate").value as FormControl;
    this.based_on = this.pur_good_receipt_item_details.at(index).get("price_based_on").value as FormControl;
    this.discount = this.pur_good_receipt_item_details.at(index).get("discount").value as FormControl;
    this.discountBasedOn = this.pur_good_receipt_item_details.at(index).get("discount_based_on").value as FormControl;
    this.taxRate = this.pur_good_receipt_item_details.at(index).get("tax_rate").value as FormControl;
    this.qcDeduction = this.pur_good_receipt_item_details.at(index).get("qc_deduction").value as FormControl;

    this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty,
      this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
  }

  getAdvItemQty(item_qty, index) {
    this.advPackQty = this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value as FormControl;
    this.advItemQty = item_qty.target.value;

    if (this.userForm.get("purchase_type").value == 'ITMT00004' || this.userForm.get("purchase_type").value == 'ITMT00002') {
      if (this.pur_good_receipt_item_details.at(index).get("price_based_on").value == "Packing") {

      }
      else {

        let compareqty: boolean = false;
        compareqty = Math.round(Number(this.pur_good_receipt_item_details.at(index).get("restwt").value))
          >= Math.round(Number(item_qty.target.value));

        if (compareqty == true) {
          this.pur_good_receipt_item_details.at(index).patchValue({
            adv_item_qty: item_qty.target.value,
            adv_mat_wt: item_qty.target.value
          });
          this.advItemQty = item_qty.target.value;
          this.advMatWt = item_qty.target.value;
        }
        else {
          alert("Material Weight exceeded in respect with purchase order :: " + this.pur_good_receipt_item_details.at(index).get("restwt").value);
          this.pur_good_receipt_item_details.at(index).patchValue({
            adv_item_qty: this.pur_good_receipt_item_details.at(index).get("restwt").value,
            adv_mat_wt: this.pur_good_receipt_item_details.at(index).get("restwt").value
          });
          this.advItemQty = this.pur_good_receipt_item_details.at(index).get("restwt").value;
          this.advMatWt = this.pur_good_receipt_item_details.at(index).get("restwt").value;
        }

      }

    }
    else {

      if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') { this.advMatWt = this.advItemQty - (this.empty_bag_wt[index] * this.advPackQty); }
      else { this.advMatWt = this.advItemQty - (this.advItemQty * this.empty_bag_wt[index]) / 100; }

      this.pur_good_receipt_item_details.at(index).patchValue({ adv_mat_wt: (Math.round(this.advMatWt * 1000) / 1000).toFixed(0) });
      //alert(this.userForm.get("referance_type").value)
      if (this.userForm.get("referance_type").value == "OPEN GRN") {
        // alert(this.userForm.get("purchase_type").value)
        if (this.userForm.get("purchase_type").value == "ITMT00004") {
          this.pur_good_receipt_item_details.at(index).patchValue({
            rcv_pack_qty: this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value, rcv_item_qty: item_qty.target.value, rcv_mat_wt: this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value
            , pssd_pack_qty: this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value, pssd_item_qty: item_qty.target.value, pssd_mat_wt: this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value
          });
        }
        if (this.userForm.get("purchase_type").value == "ITMT00005") {
          this.pur_good_receipt_item_details.at(index).patchValue({
            rcv_pack_qty: this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value, rcv_item_qty: item_qty.target.value, rcv_mat_wt: this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value
            , pssd_pack_qty: this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value, pssd_item_qty: item_qty.target.value, pssd_mat_wt: this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value
          });
        }

        if (this.userForm.get("purchase_type").value == "ITMT00007") {
          this.pur_good_receipt_item_details.at(index).patchValue({
            rcv_pack_qty: this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value, rcv_item_qty: item_qty.target.value, rcv_mat_wt: this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value
            , pssd_pack_qty: this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value, pssd_item_qty: item_qty.target.value, pssd_mat_wt: this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value
          });
        }
      }
    }

    this.rcvPackQty = this.pur_good_receipt_item_details.at(index).get("rcv_pack_qty").value as FormControl;
    this.rcvItemQty = this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value as FormControl;
    this.rcvMatWt = this.pur_good_receipt_item_details.at(index).get("rcv_mat_wt").value as FormControl;
    this.pssdPackQty = this.pur_good_receipt_item_details.at(index).get("pssd_pack_qty").value as FormControl;
    this.pssdItemQty = this.pur_good_receipt_item_details.at(index).get("pssd_item_qty").value as FormControl;
    this.pssdMatWt = this.pur_good_receipt_item_details.at(index).get("pssd_mat_wt").value as FormControl;
    this.price = this.pur_good_receipt_item_details.at(index).get("unit_rate").value as FormControl;
    this.based_on = this.pur_good_receipt_item_details.at(index).get("price_based_on").value as FormControl;
    this.discount = this.pur_good_receipt_item_details.at(index).get("discount").value as FormControl;
    this.discountBasedOn = this.pur_good_receipt_item_details.at(index).get("discount_based_on").value as FormControl;
    this.taxRate = this.pur_good_receipt_item_details.at(index).get("tax_rate").value as FormControl;
    this.qcDeduction = this.pur_good_receipt_item_details.at(index).get("qc_deduction").value as FormControl;



    this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty,
      this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
  }

  getRcvItemQty(rcv_item_qty, index) {
    this.rcvPackQty = this.pur_good_receipt_item_details.at(index).get("rcv_pack_qty").value as FormControl;
    this.rcvItemQty = rcv_item_qty.target.value;
    console.log(" checkhere " + this.empty_bag_wt[index] + " / " + this.empty_bag_wt_priceBasedOn[index] + " / " + this.rcvItemQty + " / " + this.rcvMatWt);
    if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') { this.rcvMatWt = this.rcvItemQty - (this.empty_bag_wt[index] * this.rcvPackQty); }
    else { this.rcvMatWt = this.rcvItemQty - (this.rcvItemQty * this.empty_bag_wt[index]) / 100; }

    this.pur_good_receipt_item_details.at(index).patchValue({ rcv_mat_wt: (Math.round(this.rcvMatWt * 1000) / 1000).toFixed(3) });
    this.advPackQty = this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value as FormControl;
    this.advItemQty = this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value as FormControl;
    this.advMatWt = this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value as FormControl;
    this.pssdPackQty = this.pur_good_receipt_item_details.at(index).get("pssd_pack_qty").value as FormControl;
    this.pssdItemQty = this.pur_good_receipt_item_details.at(index).get("pssd_item_qty").value as FormControl;
    this.pssdMatWt = this.pur_good_receipt_item_details.at(index).get("pssd_mat_wt").value as FormControl;
    this.price = this.pur_good_receipt_item_details.at(index).get("unit_rate").value as FormControl;
    this.based_on = this.pur_good_receipt_item_details.at(index).get("price_based_on").value as FormControl;
    this.discount = this.pur_good_receipt_item_details.at(index).get("discount").value as FormControl;
    this.discountBasedOn = this.pur_good_receipt_item_details.at(index).get("discount_based_on").value as FormControl;
    this.taxRate = this.pur_good_receipt_item_details.at(index).get("tax_rate").value as FormControl;
    this.qcDeduction = this.pur_good_receipt_item_details.at(index).get("qc_deduction").value as FormControl;

    this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty,
      this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
  }

  getPssdItemQty(pssd_item_qty, index) {
    this.pssdPackQty = this.pur_good_receipt_item_details.at(index).get("pssd_pack_qty").value as FormControl;
    this.pssdItemQty = pssd_item_qty.target.value;

    if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') { this.pssdMatWt = this.pssdItemQty - (this.empty_bag_wt[index] * this.pssdPackQty); }
    else { this.pssdMatWt = this.pssdItemQty - (this.pssdItemQty * this.empty_bag_wt[index]) / 100; }

    this.pur_good_receipt_item_details.at(index).patchValue({ pssd_mat_wt: (Math.round(this.pssdMatWt * 1000) / 1000).toFixed(3) });
    this.advPackQty = this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value as FormControl;
    this.advItemQty = this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value as FormControl;
    this.advMatWt = this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value as FormControl;
    this.rcvPackQty = this.pur_good_receipt_item_details.at(index).get("rcv_pack_qty").value as FormControl;
    this.rcvItemQty = this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value as FormControl;
    this.rcvMatWt = this.pur_good_receipt_item_details.at(index).get("rcv_mat_wt").value as FormControl;
    this.price = this.pur_good_receipt_item_details.at(index).get("unit_rate").value as FormControl;
    this.based_on = this.pur_good_receipt_item_details.at(index).get("price_based_on").value as FormControl;
    this.discount = this.pur_good_receipt_item_details.at(index).get("discount").value as FormControl;
    this.discountBasedOn = this.pur_good_receipt_item_details.at(index).get("discount_based_on").value as FormControl;
    this.taxRate = this.pur_good_receipt_item_details.at(index).get("tax_rate").value as FormControl;
    this.qcDeduction = this.pur_good_receipt_item_details.at(index).get("qc_deduction").value as FormControl;

    this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty,
      this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
  }

  getUnitRate(rate, index) {
    this.advPackQty = this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value as FormControl;
    this.advItemQty = this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value as FormControl;
    this.advMatWt = this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value as FormControl;
    this.rcvPackQty = this.pur_good_receipt_item_details.at(index).get("rcv_pack_qty").value as FormControl;
    this.rcvItemQty = this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value as FormControl;
    this.rcvMatWt = this.pur_good_receipt_item_details.at(index).get("rcv_mat_wt").value as FormControl;
    this.pssdPackQty = this.pur_good_receipt_item_details.at(index).get("pssd_pack_qty").value as FormControl;
    this.pssdItemQty = this.pur_good_receipt_item_details.at(index).get("pssd_item_qty").value as FormControl;
    this.pssdMatWt = this.pur_good_receipt_item_details.at(index).get("pssd_mat_wt").value as FormControl;
    this.price = rate.target.value;
    this.based_on = this.pur_good_receipt_item_details.at(index).get("price_based_on").value as FormControl;
    this.discount = this.pur_good_receipt_item_details.at(index).get("discount").value as FormControl;
    this.discountBasedOn = this.pur_good_receipt_item_details.at(index).get("discount_based_on").value as FormControl;
    this.taxRate = this.pur_good_receipt_item_details.at(index).get("tax_rate").value as FormControl;
    this.qcDeduction = this.pur_good_receipt_item_details.at(index).get("qc_deduction").value as FormControl;

    this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty,
      this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
  }

  rcvPackQty: any;
  rcvMatWt: any;
  rcvItemQty: any;
  advPackQty: any;
  advMatWt: any;
  advItemQty: any
  pssdPackQty: any;
  pssdMatWt: any;
  pssdItemQty: any;
  price: any;
  based_on: any;
  discount: any;
  discountBasedOn: any;
  taxRate: any;
  qcDeduction: any;
  cgst: any;
  sgst: any;
  igst: any;
  getPriceBasedOn(price_based_on, index) {
    this.advPackQty = this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value as FormControl;
    this.advItemQty = this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value as FormControl;
    this.advMatWt = this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value as FormControl;
    this.rcvPackQty = this.pur_good_receipt_item_details.at(index).get("rcv_pack_qty").value as FormControl;
    this.rcvItemQty = this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value as FormControl;
    this.rcvMatWt = this.pur_good_receipt_item_details.at(index).get("rcv_mat_wt").value as FormControl;
    this.pssdPackQty = this.pur_good_receipt_item_details.at(index).get("pssd_pack_qty").value as FormControl;
    this.pssdItemQty = this.pur_good_receipt_item_details.at(index).get("pssd_item_qty").value as FormControl;
    this.pssdMatWt = this.pur_good_receipt_item_details.at(index).get("pssd_mat_wt").value as FormControl;
    this.price = this.pur_good_receipt_item_details.at(index).get("unit_rate").value as FormControl;
    this.based_on = price_based_on.target.value;
    this.discount = this.pur_good_receipt_item_details.at(index).get("discount").value as FormControl;
    this.discountBasedOn = this.pur_good_receipt_item_details.at(index).get("discount_based_on").value as FormControl;
    this.taxRate = this.pur_good_receipt_item_details.at(index).get("tax_rate").value as FormControl;
    this.qcDeduction = this.pur_good_receipt_item_details.at(index).get("qc_deduction").value as FormControl;

    this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty,
      this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
  }

  getdiscount(event, index) {
    this.advPackQty = this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value as FormControl;
    this.advItemQty = this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value as FormControl;
    this.advMatWt = this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value as FormControl;
    this.rcvPackQty = this.pur_good_receipt_item_details.at(index).get("rcv_pack_qty").value as FormControl;
    this.rcvItemQty = this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value as FormControl;
    this.rcvMatWt = this.pur_good_receipt_item_details.at(index).get("rcv_mat_wt").value as FormControl;
    this.pssdPackQty = this.pur_good_receipt_item_details.at(index).get("pssd_pack_qty").value as FormControl;
    this.pssdItemQty = this.pur_good_receipt_item_details.at(index).get("pssd_item_qty").value as FormControl;
    this.pssdMatWt = this.pur_good_receipt_item_details.at(index).get("pssd_mat_wt").value as FormControl;
    this.price = this.pur_good_receipt_item_details.at(index).get("unit_rate").value as FormControl;
    this.based_on = this.pur_good_receipt_item_details.at(index).get("price_based_on").value as FormControl;
    this.discount = event.target.value;
    this.discountBasedOn = this.pur_good_receipt_item_details.at(index).get("discount_based_on").value as FormControl;
    this.taxRate = this.pur_good_receipt_item_details.at(index).get("tax_rate").value as FormControl;
    this.qcDeduction = this.pur_good_receipt_item_details.at(index).get("qc_deduction").value as FormControl;

    this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty,
      this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
  }

  getDiscountBasedOn(event, index) {
    this.advPackQty = this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value as FormControl;
    this.advItemQty = this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value as FormControl;
    this.advMatWt = this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value as FormControl;
    this.rcvPackQty = this.pur_good_receipt_item_details.at(index).get("rcv_pack_qty").value as FormControl;
    this.rcvItemQty = this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value as FormControl;
    this.rcvMatWt = this.pur_good_receipt_item_details.at(index).get("rcv_mat_wt").value as FormControl;
    this.pssdPackQty = this.pur_good_receipt_item_details.at(index).get("pssd_pack_qty").value as FormControl;
    this.pssdItemQty = this.pur_good_receipt_item_details.at(index).get("pssd_item_qty").value as FormControl;
    this.pssdMatWt = this.pur_good_receipt_item_details.at(index).get("pssd_mat_wt").value as FormControl;
    this.price = this.pur_good_receipt_item_details.at(index).get("unit_rate").value as FormControl;
    this.based_on = this.pur_good_receipt_item_details.at(index).get("price_based_on").value as FormControl;
    this.discount = this.pur_good_receipt_item_details.at(index).get("discount").value as FormControl;
    this.discountBasedOn = event;
    this.taxRate = this.pur_good_receipt_item_details.at(index).get("tax_rate").value as FormControl;
    this.qcDeduction = this.pur_good_receipt_item_details.at(index).get("qc_deduction").value as FormControl;

    this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty,
      this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
  }

  getqcDeduction(event, index) {
    this.advPackQty = this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value as FormControl;
    this.advItemQty = this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value as FormControl;
    this.advMatWt = this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value as FormControl;
    this.rcvPackQty = this.pur_good_receipt_item_details.at(index).get("rcv_pack_qty").value as FormControl;
    this.rcvItemQty = this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value as FormControl;
    this.rcvMatWt = this.pur_good_receipt_item_details.at(index).get("rcv_mat_wt").value as FormControl;
    this.pssdPackQty = this.pur_good_receipt_item_details.at(index).get("pssd_pack_qty").value as FormControl;
    this.pssdItemQty = this.pur_good_receipt_item_details.at(index).get("pssd_item_qty").value as FormControl;
    this.pssdMatWt = this.pur_good_receipt_item_details.at(index).get("pssd_mat_wt").value as FormControl;
    this.price = this.pur_good_receipt_item_details.at(index).get("unit_rate").value as FormControl;
    this.based_on = this.pur_good_receipt_item_details.at(index).get("price_based_on").value as FormControl;
    this.discount = this.pur_good_receipt_item_details.at(index).get("discount").value as FormControl;
    this.discountBasedOn = this.pur_good_receipt_item_details.at(index).get("discount_based_on").value as FormControl;
    this.taxRate = this.pur_good_receipt_item_details.at(index).get("tax_rate").value as FormControl;
    this.qcDeduction = event.target.value;

    this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty,
      this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
  }

  getGst(index) {
    this.advPackQty = this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value as FormControl;
    this.advItemQty = this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value as FormControl;
    this.advMatWt = this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value as FormControl;
    this.rcvPackQty = this.pur_good_receipt_item_details.at(index).get("rcv_pack_qty").value as FormControl;
    this.rcvItemQty = this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value as FormControl;
    this.rcvMatWt = this.pur_good_receipt_item_details.at(index).get("rcv_mat_wt").value as FormControl;
    this.pssdPackQty = this.pur_good_receipt_item_details.at(index).get("pssd_pack_qty").value as FormControl;
    this.pssdItemQty = this.pur_good_receipt_item_details.at(index).get("pssd_item_qty").value as FormControl;
    this.pssdMatWt = this.pur_good_receipt_item_details.at(index).get("pssd_mat_wt").value as FormControl;
    this.price = this.pur_good_receipt_item_details.at(index).get("unit_rate").value as FormControl;
    this.based_on = this.pur_good_receipt_item_details.at(index).get("price_based_on").value as FormControl;
    this.discount = this.pur_good_receipt_item_details.at(index).get("discount").value as FormControl;
    this.discountBasedOn = this.pur_good_receipt_item_details.at(index).get("discount_based_on").value as FormControl;
    this.taxRate = this.pur_good_receipt_item_details.at(index).get("tax_rate").value as FormControl;
    this.qcDeduction = this.pur_good_receipt_item_details.at(index).get("qc_deduction").value as FormControl;
    this.cgst = this.pur_good_receipt_item_details.at(index).get("cgstamt").value as FormControl;
    this.sgst = this.pur_good_receipt_item_details.at(index).get("sgstamt").value as FormControl;
    this.igst = this.pur_good_receipt_item_details.at(index).get("igstamt").value as FormControl;

    this.calculateItemDataGstChange(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty,
      this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, this.cgst, this.sgst, this.igst, index)
  }

  calculateItemDataGstChange(advPackQty, advItemQty, advmatWt, rcvPackQty, rcvItemQty, rcvmatWt, pssdPackQty,
    pssdItemQty, pssdmatWt, price, PriceBasedOn, discount, discountBasedOn, taxrate, qcDeduction, cgst, sgst, igst, index) {
    if (PriceBasedOn == "Packing") { this.amt = price * pssdPackQty }

    if (PriceBasedOn == "With Packing") { this.amt = price * pssdItemQty }

    if (PriceBasedOn == "Without Packing") { this.amt = price * pssdmatWt }

    if (PriceBasedOn == "0") { this.amt = 0 }

    if (discountBasedOn == "Uom") { this.discountAmt = discount * Number(this.pur_good_receipt_item_details.at(index).get("pssd_mat_wt").value); }

    if (discountBasedOn == "%") { this.discountAmt = this.amt * (discount / 100); }

    if (discountBasedOn == "Manual") { this.discountAmt = discount; }

    if (discountBasedOn == "0") { this.discountAmt = 0 }

    let netAmt = this.amt - this.discountAmt;

    let tax_list: any = [];
    let tax_id: any;
    tax_list = this.taxdata;
    tax_list.forEach(element => {
      if (element.tax_name == this.pur_good_receipt_item_details.at(index).get("tax_code").value) {
        let taxamt = Number(cgst) + Number(sgst) + Number(igst);
        console.log(netAmt + "taxamt::" + taxamt)
        this.totalAmt = taxamt + netAmt;
        this.pur_good_receipt_item_details.at(index).patchValue({
          cgstamt: cgst, sgstamt: sgst, igstamt: igst, amount: (Math.round(this.amt * 100) / 100).toFixed(2),
          discount_amt: (Math.round(this.discountAmt * 100) / 100).toFixed(2), net_amt_after_qc: (Math.round(Number(netAmt - qcDeduction) * 100) / 100).toFixed(2),
          net_amt: (Math.round(netAmt * 100) / 100).toFixed(2), tax_amt: taxamt,
          total_amt: (Number(taxamt) + Number(netAmt)).toFixed(2), gross_amt: (Math.round(Number(netAmt + Number(taxamt) - qcDeduction) * 100) / 100).toFixed(2)
        });
      }

    });
  }

  /*  packingItem:any=[];
    onchangeItemName(index, event)
    {
      if(event.target.value != '0')
      {
        this.status = false;
        forkJoin(
          this.DropDownListService.getItemNameById(event.target.value,this.company_name),
          this.DropDownListService.getItemMasterPackMat(event.target.value),
          this.DropDownListService.retriveItemMasterStatInfo(event.target.value,this.company_name),
          this.DropDownListService.taxList()
        ).subscribe(([itemNameData, packingItemData,data3,taxlist])=>
        {      
          this.pur_good_receipt_item_details.at(index).patchValue({adv_item_name: itemNameData["item_name"],hsn_code:itemNameData["hsn_code"]});
          this.packingItem[index] = packingItemData;
          this.DropDownListService.getUomName(itemNameData["mstock_unit"]).subscribe(data=>
          { 
            this.pur_good_receipt_item_details.at(index).patchValue({adv_item_uom: data.description,
              rcv_item_uom: data.description, pssd_item_uom: data.description}); 
            this.status = true;
          });

          let tax_list:any=[];
          tax_list=taxlist;
              tax_list.forEach(element => 
                {
                    //console.log("foreach "+element.tax_id);
                      if(element.tax_id == data3[0].tax_code)
                      {
                        //console.log("foreach "+element.tax_name);
                        this.pur_good_receipt_item_details.at(index).patchValue({tax_code:element.tax_name});
                      }
                    
                });
                this.pur_good_receipt_item_details.at(index).patchValue({tax_rate:data3[0].tax_rate});

        });
      }
    }
*/
  packingItem: any = [];
  selectedItemName = [];
  onchangeItemName(index, itemId) {
    if (itemId.length && itemId != "0") {

      this.status = false;
      forkJoin(
        this.DropDownListService.getItemNameById(itemId, this.company_name),
        this.DropDownListService.getItemMasterPackMat(itemId),
        this.DropDownListService.retriveItemMasterStatInfo(itemId, this.company_name),
        this.DropDownListService.taxList()
      ).subscribe(([itemNameData, packingItemData, data3, taxlist]) => {
        //console.log("itemNameData::"+JSON.stringify(itemNameData))
        this.pur_good_receipt_item_details.at(index).patchValue({ hsn_code: itemNameData["hsn_code"], adv_item_code: itemId });
        this.packingItem[index] = packingItemData;
        this.DropDownListService.getUomName(itemNameData["mstock_unit"]).subscribe(data => {
          this.pur_good_receipt_item_details.at(index).patchValue({
            adv_item_uom: data.description,
            rcv_item_uom: data.description, pssd_item_uom: data.description
          });
          this.status = true;
        });


        this.tax_list = taxlist;
        this.tax_list.forEach(element => {
          //console.log("foreach "+element.tax_id);
          if (element.tax_id == data3[0].tax_code) {
            //console.log("foreach "+element.tax_name);
            this.actualcgstrate = element.cgst_act_val;
            this.actualsgstrate = element.sgst_act_val;
            console.log("foreach " + element.tax_name + "//" + this.actualcgstrate + "//" + this.actualsgstrate);
            this.pur_good_receipt_item_details.at(index).patchValue({ tax_code: element.tax_name });
          }

        });
        this.pur_good_receipt_item_details.at(index).patchValue({ tax_rate: data3[0].tax_rate });

      });
    }
  }

  itemId: any;
  onchangePackingItem(index, event) {
    if (event.target.value != '0') {
      this.itemId = this.pur_good_receipt_item_details.at(index).get("adv_item_code").value as FormControl;
      this.status = false;

      forkJoin(
        this.DropDownListService.getItemPackUom(this.itemId, event.target.value, this.company_name),
        this.DropDownListService.getItemNameByIdNew(event.target.value, this.company_name)

      )
        .subscribe(([data, packingdata]) => {

          this.capacity[index] = data.capacity;
          this.empty_bag_wt[index] = data.empty_big_wt;
          this.empty_bag_wt_priceBasedOn[index] = data.empbagwt_based_on;

          //this.pur_good_receipt_item_details.at(index).patchValue({adv_pack_uom: data.uom1, rcv_pack_uom: data.uom1, pssd_pack_uom: data.uom1}); 
          this.pur_good_receipt_item_details.at(index).patchValue({ adv_pack_uom: packingdata.mstock_unit_name, rcv_pack_uom: packingdata.mstock_unit_name, pssd_pack_uom: packingdata.mstock_unit_name });

          this.advPackQty = this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value as FormControl;
          this.advItemQty = this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value as FormControl;
          this.advMatWt = this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value as FormControl;
          this.rcvPackQty = this.pur_good_receipt_item_details.at(index).get("rcv_pack_qty").value as FormControl;
          this.rcvItemQty = this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value as FormControl;
          this.rcvMatWt = this.pur_good_receipt_item_details.at(index).get("rcv_mat_wt").value as FormControl;
          this.pssdPackQty = this.pur_good_receipt_item_details.at(index).get("pssd_pack_qty").value as FormControl;
          this.pssdItemQty = this.pur_good_receipt_item_details.at(index).get("pssd_item_qty").value as FormControl;
          this.pssdMatWt = this.pur_good_receipt_item_details.at(index).get("pssd_mat_wt").value as FormControl;
          this.price = this.pur_good_receipt_item_details.at(index).get("unit_rate").value as FormControl;
          this.based_on = this.pur_good_receipt_item_details.at(index).get("price_based_on").value as FormControl;
          this.discount = this.pur_good_receipt_item_details.at(index).get("discount").value as FormControl;
          this.discountBasedOn = this.pur_good_receipt_item_details.at(index).get("discount_based_on").value as FormControl;
          this.taxRate = this.pur_good_receipt_item_details.at(index).get("tax_rate").value as FormControl;
          this.qcDeduction = this.pur_good_receipt_item_details.at(index).get("qc_deduction").value as FormControl;

          this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty,
            this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
          this.status = true;
        });
    }
  }

  amt: any;
  discountAmt: any;
  taxAmt: any;
  totalAmt: any;
  calculateItemData(advPackQty, advItemQty, advmatWt, rcvPackQty, rcvItemQty, rcvmatWt, pssdPackQty,
    pssdItemQty, pssdmatWt, price, PriceBasedOn, discount, discountBasedOn, taxrate, qcDeduction, index) {
    if (PriceBasedOn == "Packing") { this.amt = price * pssdPackQty }

    if (PriceBasedOn == "With Packing") { this.amt = price * pssdItemQty }

    if (PriceBasedOn == "Without Packing") { this.amt = price * pssdmatWt }

    if (PriceBasedOn == "0") { this.amt = 0 }

    if (discountBasedOn == "Uom") { this.discountAmt = discount * Number(this.pur_good_receipt_item_details.at(index).get("pssd_mat_wt").value); }

    if (discountBasedOn == "%") { this.discountAmt = this.amt * (discount / 100); }

    if (discountBasedOn == "Manual") { this.discountAmt = discount; }

    if (discountBasedOn == "0") { this.discountAmt = 0 }

    let netAmt = this.amt - this.discountAmt;


    /* if(taxrate == 0)
     { this.taxAmt = 0;} 

     else {this.taxAmt = netAmt *(taxrate/100);}
       */

    let tax_list: any = [];
    let tax_id: any;
    tax_list = this.taxdata;
    tax_list.forEach(element => {
      if (element.tax_name == this.pur_good_receipt_item_details.at(index).get("tax_code").value) {

        if (this.statestatus == 0) {
          this.cgstvalue = (Number(netAmt * element.cgst_act_val) / 100).toFixed(2);

          this.sgstvalue = (Number(netAmt * element.sgst_act_val) / 100).toFixed(2);
          this.igstvalue = "0";
          console.log("netAmt" + netAmt + "//" + this.actualsgstrate + "//" + this.sgstvalue)
        }
        else {
          this.cgstvalue = '0';
          this.sgstvalue = '0';
          this.igstvalue = Number(netAmt * (this.pur_good_receipt_item_details.at(index).get("tax_rate").value / 100)).toFixed(2);

        }
        let taxamt = Number(this.cgstvalue) + Number(this.sgstvalue) + Number(this.igstvalue);
        console.log(netAmt + "taxamt::" + taxamt)
        this.totalAmt = taxamt + netAmt;
        this.pur_good_receipt_item_details.at(index).patchValue({
          cgstamt: this.cgstvalue, sgstamt: this.sgstvalue, igstamt: this.igstvalue, amount: (Math.round(this.amt * 100) / 100).toFixed(2),
          discount_amt: (Math.round(this.discountAmt * 100) / 100).toFixed(2), net_amt_after_qc: (Math.round(Number(netAmt - qcDeduction) * 100) / 100).toFixed(2),
          net_amt: (Math.round(netAmt * 100) / 100).toFixed(2), tax_amt: taxamt,
          total_amt: (Number(taxamt) + Number(netAmt)).toFixed(2), gross_amt: (Math.round(Number(netAmt + Number(taxamt) - qcDeduction) * 100) / 100).toFixed(2)
        });

        /*let cgst_amt =  element["cgst_act_val"];
        let sgst_amt = element["sgst_act_val"];
        let igst_amt = element["igst_act_val"];
        if( cgst_amt == 0 && sgst_amt == 0 && igst_amt == 0)
        {
            let taxamt = 0;
            console.log(" here 1 " + taxamt)
              this.totalAmt = taxamt + netAmt;
              this.pur_good_receipt_item_details.at(index).patchValue({amount: (Math.round(this.amt * 100) / 100).toFixed(2),
              discount_amt:  (Math.round(this.discountAmt * 100) / 100).toFixed(2), net_amt_after_qc: (Math.round(Number(netAmt - qcDeduction)* 100)/100).toFixed(2),
              net_amt: (Math.round(netAmt * 100) / 100).toFixed(2), tax_amt: taxamt, 
              total_amt: (Number(taxamt) + Number(netAmt)).toFixed(2), gross_amt: (Math.round(Number(netAmt +  Number(taxamt) - qcDeduction)*100)/100).toFixed(2)});
        
 
        }
        else if(cgst_amt == 0)
        {
         
             let taxamt =Number(netAmt *(this.pur_good_receipt_item_details.at(index).get("tax_rate").value/100)).toFixed(2);
             this.totalAmt = taxamt + netAmt;
             console.log(" here 2 " + taxamt)
              this.pur_good_receipt_item_details.at(index).patchValue({amount: (Math.round(this.amt * 100) / 100).toFixed(2),
              discount_amt:  (Math.round(this.discountAmt * 100) / 100).toFixed(2), net_amt_after_qc: (Math.round(Number(netAmt - qcDeduction)* 100)/100).toFixed(2),
              net_amt: (Math.round(netAmt * 100) / 100).toFixed(2), tax_amt: taxamt, 
              total_amt:(Number(taxamt) + Number(netAmt)).toFixed(2), gross_amt: (Math.round(Number(netAmt + Number(taxamt) - qcDeduction)*100)/100).toFixed(2)});
        }
        else
        {
          
            let csgt_final=Number(netAmt *(cgst_amt/100)).toFixed(2);
            let sgst_final=Number(netAmt *(sgst_amt/100)).toFixed(2);
            let taxamt = Number(csgt_final)+ Number(sgst_final);
        
            console.log(" here 3 " + taxamt)
            
              this.totalAmt = taxamt + netAmt;
              this.pur_good_receipt_item_details.at(index).patchValue({amount: (Math.round(this.amt * 100) / 100).toFixed(2),
              discount_amt:  (Math.round(this.discountAmt * 100) / 100).toFixed(2), net_amt_after_qc: (Math.round(Number(netAmt - qcDeduction)* 100)/100).toFixed(2),
              net_amt: (Math.round(netAmt * 100) / 100).toFixed(2), tax_amt: taxamt, 
              total_amt:(Number(taxamt) + Number(netAmt)).toFixed(2), gross_amt: (Math.round(Number(netAmt +  Number(taxamt) - qcDeduction)*100)/100).toFixed(2)});
       
            
        }*/



      }

    });



    /*     this.totalAmt = this.taxAmt + netAmt;
         this.pur_good_receipt_item_details.at(index).patchValue({amount: (Math.round(this.amt * 100) / 100).toFixed(2),
         discount_amt:  (Math.round(this.discountAmt * 100) / 100).toFixed(2), net_amt_after_qc: (Math.round(Number(netAmt - qcDeduction)* 100)/100).toFixed(2),
         net_amt: (Math.round(netAmt * 100) / 100).toFixed(2), tax_amt: (Math.round(this.taxAmt * 100) / 100).toFixed(2), 
         total_amt: (Math.round(this.totalAmt * 100) / 100).toFixed(2), gross_amt: (Math.round(Number(netAmt + this.taxAmt - qcDeduction)*100)/100).toFixed(2)});
   
   */
  }
  
  PSubtype: any;
  onClickShow() {
    this.showunloadadvicepopupcriteria = false;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.suppli_id = this.userForm.get("supplier_name").value as FormControl;
    this.ordate = this.userForm.get("grn_date").value as FormControl;
    this.PSubtype = this.userForm.get("purchase_subtype").value as FormControl;
    

    this.grnId = this.userForm.get("id").value;
    //  console.log("tuhin here12345stewtrw :: "+this.grnId)
    if (this.grnId == null || this.grnId == '') {
      this.grnId = 0;
      // console.log("tuhin here12345 :: "+this.grnId + " // " + this.userForm.get("referance_type").value)
    }

    let subtypestatus = "";
    if (this.userForm.get("purchase_type").value =="ITMT00004" || this.userForm.get("purchase_type").value=="ITMT00002") {
      subtypestatus="Yes";
    }
    else
    {
      subtypestatus="No";
    }
    dialogConfig.data = { index: 0, };
    let dialogref;

    //console.log(this.userForm.get("referance_type").value+"//"+this.suppli_id+"//"+this.PSubtype+"//"+this.itmSubType)
    if (this.businessUnit != '0' && this.itmSubType != "0") {
      if (this.userForm.get("referance_type").value == 'UNLOAD ADVICE' && (this.suppli_id == null || this.suppli_id == 0 || this.suppli_id == '') && (this.PSubtype == null || this.PSubtype == 0 || this.PSubtype == '')) {
        alert("Please Select Purchase Sub Type & Supplier Name For UNLOAD ADVICE");
        this.status = true;
      }
      else if (this.userForm.get("referance_type").value == 'PURCHASE ORDER' && (this.businessUnit == null || this.businessUnit == 0) && (this.itmSubType == null || this.itmSubType == 0)) {
        alert("Please Select Bussiness Unit & Purchase Type For PURCHASE ORDER");
        this.status = true;
      }
      else {
        if (this.userForm.get("referance_type").value == 'UNLOAD ADVICE') {
          this.pgrn_type_status = true;
          if (this.userForm.get("multiunloadadvice").value == true) {

            // dialogref=this.dialog.open(MultiunloadadvicepopupComponent, {data:{b_unit: this.businessUnit,supp_id:this.suppli_id,item_type:this.itmType,pur_type:this.itmSubType,pur_subtype:this.PSubtype,order_date:this.ordate,id:this.grnId} } );
            dialogref = this.dialog.open(MultiunloadadvicepopupreviseComponent, { data: { b_unit: this.businessUnit, supp_id: this.suppli_id, item_type: this.itmType, pur_type: this.itmSubType, pur_subtype: this.PSubtype, order_date: this.ordate, id: this.grnId } });
            dialogref.afterClosed().subscribe(data => {
              //console.log("check here tuhin " + JSON.stringify(data));

              let unloadid=[];
              if(data["unadviceid"].includes(","))
              {
                unloadid=data["unadviceid"].split(',');
              }
              else
              {
                unloadid=data["unadviceid"];
              }

              console.log("unload1:: "+unloadid);
              //this.arrSort(unloadid);

              const comparator = (a, b) => {
                return a.toString().localeCompare(b.toString(), 'en', { numeric: true })
              };
              unloadid.sort(comparator);

              console.log("unload2:: "+unloadid);
              
              //this.arrSort(unloadid);
             // console.log("unload3:: "+unloadid);
              
              

              if (data != '' && data["unadviceid"] != '0') {
                //this.userForm.patchValue({referance_id: data["unadviceid"]});
                //data["stringunloadadvice"].toString()
                //this.userForm.patchValue({ referance_id: data["unadviceid"] });
                this.userForm.patchValue({ referance_id: unloadid[0] });

                //console.log("refence id here " + data["stringunloadadvice"] + " / " + data["unadviceid"] + " / " + data["pur_orderid"])
                this.packingItem = [];
                let j = 0;
                let k=0;
                this.addItem();
                this.item_sl_no = 0;
                while (this.pur_good_receipt_item_details.length)
                  this.pur_good_receipt_item_details.removeAt(0);

                //console.log("GRN DATA:: "+JSON.stringify(data.grn_unload_item_list));

                //console.log("GRN Multi DATA:: "+JSON.stringify(data.multiunloadadvice_details));

                console.log("unloadid LOOP:: "+unloadid[k]);

                // Commented for Grn Multi
                for (let data1 of data.grn_unload_item_list) {
                  console.log("JJJJ: "+j);
                  console.log("KKKK: "+k);
                  //console.log("GRN Item DATA:: "+JSON.stringify(data1));
                  if (data1["checkbox"] == true || data1["checkbox"] == 'true') {
                    //  data["pur_orderid"] means refernceid id from unloadadvice
                    this.selectedItemName = [];
                    // console.log("itemcode "+data1["item_code"]);
                    this.status = false;
                    this.addItem();
                    forkJoin(
                      // this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                      this.DropDownListService.getItemMasterPackMatMultipopupNew(data1["item_code"]),
                      this.DropDownListService.getItemPackUomNew(data1["item_code"], data1["packing"], this.company_name),
                      //this.DropDownListService.getPurOrdItemDtls(data["pur_orderid"], data1["item_code"]),
                      //this.DropDownListService.getPurOrdItemDtlsnew(data["pur_orderid"], data1["item_code"], data1["packing"]),
                      this.DropDownListService.getPurOrdItemDtlsMultipleItemGRN(data["pur_orderid"], data1["item_code"]),
                      //here multipleunoadingmultipleitem fetch  
                      //   this.DropDownListService.getpssd_item_qty(data1["mat_wt"],data["unadviceid"],data["pur_orderid"]),
                      //this.DropDownListService.getpssd_item_qtymultiplepopup(data["unadviceid"]),
                      this.DropDownListService.getpssd_packing_item_qtymultiplepopup(unloadid[k]),
                      //this.DropDownListService.getpssd_packing_qtymultiplepopup(data["unadviceid"]),
                      this.DropDownListService.getPurOrdreceipt_criteriaNew(data["pur_orderid"]),
                      this.DropDownListService.getItemNameByIdNew(data1["item_code"], this.company_name)
                    ).subscribe(([packingList, capacityEmptyWt, purOrdData, itempackingdata, porc, ItemGrp]) => {       //podata, popackingdata,
                      console.log("itempackingdata :: " + JSON.stringify(itempackingdata));
                      this.status = true;
                      //this.onChangeWarehouse(data1.wearhouse, j);
                      if (data1.wearhouse == '' || data1.wearhouse == null || data1.wearhouse == '0') {

                      }
                      else {
                        this.onChangeWarehouse(data1.wearhouse, j);
                      }

                      this.finalgrnqty = Number(itempackingdata["net_weight"]);
                      // console.log(" capacityEmptyWt "+JSON.stringify(capacityEmptyWt))
                      if (porc[0].receipt_criteria == '0' || porc[0].receipt_criteria == null) {

                      }
                      else {
                        //reciecptcritea
                        this.showunloadadvicepopupcriteria = true;
                        if (porc[0].receipt_criteria == '1') {
                          var crivalue = 'Advice Weight';
                          console.log(crivalue);
                          this.userForm.patchValue({ receipt_criteria: crivalue });
                        }
                        if (porc[0].receipt_criteria == '2') {
                          var crivalue = 'Recieving Weight';
                          console.log(crivalue);
                          this.userForm.patchValue({ receipt_criteria: crivalue });
                        }
                        if (porc[0].receipt_criteria == '3') {
                          var crivalue = 'Lower Weight';
                          console.log(crivalue);
                          this.userForm.patchValue({ receipt_criteria: crivalue });
                        }

                      }
                     // console.log(" Pur here :: " +JSON.stringify(purOrdData));
                     
                      this.selectedItemName[j] = data1["item_code"];
                      //   ,empbagwt_based_on:capacityEmptyWt["empbagwt_based_on"]
                      // console.log(" here1 ::" + capacityEmptyWt["empbagwt_based_on"] + " / " + JSON.stringify(packingList) + " / "+  capacityEmptyWt["capacity"]+" // "+capacityEmptyWt["empty_big_wt"])
                      this.empty_bag_wt_priceBasedOn[j] = capacityEmptyWt["empbagwt_based_on"];//UOM
                      this.packingItem[j] = packingList;
                      this.capacity[j] = capacityEmptyWt["capacity"];//0.55
                      this.empty_bag_wt[j] = capacityEmptyWt["empty_big_wt"];//0.00665
                      this.pur_good_receipt_item_details.at(j).patchValue({
                        adv_item_code: data1["item_code"], adv_item_name: data1["item_name"],
                        adv_packing: data1["packing"], adv_pack_qty: data1["s_qty"], adv_pack_uom: data1["s_uom"],
                        adv_item_qty: data1["quantity"], adv_mat_wt: data1["mat_wt"], adv_item_uom: data1["uom"],
                        rcv_pack_uom: data1["s_uom"], rcv_item_uom: data1["uom"],
                        pssd_pack_uom: data1["s_uom"], rcv_pack_qty: itempackingdata[0]["tarebags"], rcv_item_qty: itempackingdata[0]["net_weight"], pssd_item_uom: data1["uom"], warehouse_name: data1["wearhouse"],
                        rack: data1["rack"],
                        unit_rate: purOrdData[0]["price"],
                        price_based_on: purOrdData[0]["price_based_on"], discount: purOrdData[0]["discount"], discount_based_on: purOrdData[0]["discount_basedon"],
                        tax_code: purOrdData[0]["tax_code"], tax_rate: purOrdData[0]["tax_rate"], hsn_code: ItemGrp["hsn_code"], classified_item_name: data1["classified_item_name"], qc_norms: data1["qc_norms"]
                      });
                      this.getRcvPackingQtyautocalculate(this.pur_good_receipt_item_details.at(j).get("rcv_pack_qty").value, j)
                      j = j + 1;
                    });
                  }
                  k++;
                }
                 // Commented for Grn Multi Ends

                //.log(" sysout " + JSON.stringify(data["stringunloadadvice"]))

                this.showpartymultiple(data["unadviceid"])
              }


            });

          }//ifmulti boolean true ends

          else {
            console.log(this.itmSubType + " / " + this.PSubtype)
            dialogref = this.dialog.open(UnloadAdvicePopUpComponent, { data: { b_unit: this.businessUnit, supp_id: this.suppli_id, item_type: this.itmType, pur_type: this.itmSubType, pur_subtype: this.PSubtype, order_date: this.ordate, id: this.grnId } });
            dialogref.disableClose = true;

            dialogref.afterClosed().subscribe(data => {


              if (data != '' && data["unadviceid"] != '0') {
                console.log("Bidhan" + JSON.stringify(data));
                this.userForm.patchValue({ referance_id: data["unadviceid"] });
                this.packingItem = [];
                let j = 0;
                this.addItem();
                this.item_sl_no = 0;




                console.log("GRN Item MM: : " + JSON.stringify(data.grn_unload_item_list))

                while (this.pur_good_receipt_item_details.length)
                  this.pur_good_receipt_item_details.removeAt(0);

                if (data["poitemnumber"] == "Yes") {

                  //ITMT00002
                  if(this.itmSubType=='ITMT00002')
                  {
                    for (let data1 of data.grn_unload_item_list) {


                      if (data1["checkbox"] == 'true' || data1["checkbox"] == true) {
                        this.status = false;
                        //alert('Avi');
                        this.selectedItemName = [];
                        this.status = false;
                        //alert("Check data:"+JSON.stringify(data1["item_code"])+"////"+data["pur_orderid"])
                        //console.log("checking data::"+data["unadviceid"]+"//"+data1['price_based_on']+"//"+subtypestatus)    
                        forkJoin(
                          this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                          this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name),
                          this.DropDownListService.getPurOrdItemDtlsnewpoitemnumber(data["pur_orderid"]),
                          //this.DropDownListService.getpssd_item_qty(data1["mat_wt"], data["unadviceid"], data["pur_orderid"]),
                          this.DropDownListService.getpssd_item_qtyrectify(data["unadviceid"], data1['price_based_on'], subtypestatus),
                          //this.DropDownListService.getpssd_packing_qty(data1["mat_wt"], data["unadviceid"], data["pur_orderid"]),
                          this.DropDownListService.getpssd_packing_qtyrectify(data["unadviceid"], data1['price_based_on'], subtypestatus),
                          this.DropDownListService.getPurOrdreceipt_criteria(data["pur_orderid"]),
                          this.DropDownListService.getPurOrdBroker(data["pur_orderid"]),
                          this.DropDownListService.getItemNameById(data1["item_code"], this.company_name),
  
                        ).subscribe(([packingList, capacityEmptyWt, purOrdData, podata, popackdata, porc, poBroker, ItemGrp]) => {
                          this.status = true;
                          this.status = true;
                         // console.log(" item data: " +JSON.stringify(podata))
                         // console.log(" popack data " +JSON.stringify(popackdata))
                          if (data1.wearhouse == '' || data1.wearhouse == null || data1.wearhouse == '0') {
  
                          }
                          else {
                            this.onChangeWarehouse(data1.wearhouse, j);
                          }
                          // this.onChangeWarehouse(data1.wearhouse, j);
  
  
                          console.log(" capacityEmptyWt " + JSON.stringify(capacityEmptyWt))
                          if (porc[0].receipt_criteria == '0' || porc[0].receipt_criteria == null) {
  
                          }
                          else {
                            //reciecptcritea
                            this.showunloadadvicepopupcriteria = true;
  
                            if (porc[0].receipt_criteria == '1') {
                              var crivalue = 'Advice Weight';
                              console.log(crivalue);
                              this.userForm.patchValue({ receipt_criteria: crivalue });
                            }
                            if (porc[0].receipt_criteria == '2') {
                              var crivalue = 'Recieving Weight';
                              console.log(crivalue);
                              this.userForm.patchValue({ receipt_criteria: crivalue });
                            }
                            if (porc[0].receipt_criteria == '3') {
                              var crivalue = 'Lower Weight';
                              console.log(crivalue);
                              this.userForm.patchValue({ receipt_criteria: crivalue });
                            }
  
                          }
                          //console.log("Tuhin : : " + JSON.stringify(data1));
                          // console.log("Tuhin 1 rcv_pack_qty : : " + JSON.stringify(popackdata));
                          // console.log("Tuhin 2 rcv_item_qty : : " + JSON.stringify(podata));
                          this.addItem();
                          this.finalgrnqty = Number(JSON.stringify(podata));
                          this.selectedItemName[j] = data1["item_code"];
                          this.empty_bag_wt_priceBasedOn[j] = capacityEmptyWt["empbagwt_based_on"];
                          this.packingItem[j] = packingList;
                          this.capacity[j] = capacityEmptyWt["capacity"];
                          this.empty_bag_wt[j] = capacityEmptyWt["empty_big_wt"];
                          this.pur_good_receipt_item_details.at(j).patchValue({
                            adv_item_code: data1["item_code"], adv_item_name: data1["item_name"],
                            adv_packing: data1["packing"], adv_pack_qty: data1["s_qty"], adv_pack_uom: data1["s_uom"],
                            adv_item_qty: data1["quantity"], adv_mat_wt: data1["mat_wt"], adv_item_uom: data1["uom"],
                            rcv_pack_uom: data1["s_uom"], rcv_item_uom: data1["uom"],
                            pssd_pack_uom: data1["s_uom"], rcv_pack_qty: popackdata, rcv_item_qty: podata, pssd_item_uom: data1["uom"], warehouse_name: data1["wearhouse"],
                            rack: data1["rack"], qc_norms: data1["qc_norms"],
                            unit_rate: purOrdData["price"],
                            price_based_on: purOrdData["price_based_on"], discount: purOrdData["discount"], discount_based_on: purOrdData["discount_basedon"],
                            tax_code: purOrdData["tax_code"], tax_rate: purOrdData["tax_rate"], con_factor: data1["con_factor"], hsn_code: ItemGrp["hsn_code"],
                            classified_item_name: data1["classified_item_name"]
                          });
                          console.log(this.pur_good_receipt_item_details.at(j).get("rcv_pack_qty").value + " / " + j);
                          //getiing passed weight values here 
                          this.getRcvPackingQtyautocalculate(this.pur_good_receipt_item_details.at(j).get("rcv_pack_qty").value, j)
                          j = j + 1;
  
                        });
                      }
                    }//end here 
                  }
                  else
                  {
                    for (let data1 of data.grn_unload_item_list) {


                      if (data1["checkbox"] == 'true' || data1["checkbox"] == true) {
                        this.status = false;
                        //alert('Avi');
                        this.selectedItemName = [];
                        this.status = false;
                        //alert("Check data:"+JSON.stringify(data1["item_code"])+"////"+data["pur_orderid"])
                        //console.log("checking data::"+data["unadviceid"]+"//"+data1['price_based_on']+"//"+subtypestatus)    
                        forkJoin(
                          this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                          this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name),
                          this.DropDownListService.getPurOrdItemDtlsnewpoitemnumber(data["pur_orderid"]),
                          this.DropDownListService.getpssd_item_qty(data1["mat_wt"], data["unadviceid"], data["pur_orderid"]),
                          //this.DropDownListService.getpssd_item_qtyrectify(data["unadviceid"], data1['price_based_on'], subtypestatus),
                          this.DropDownListService.getpssd_packing_qty(data1["mat_wt"], data["unadviceid"], data["pur_orderid"]),
                         // this.DropDownListService.getpssd_packing_qtyrectify(data["unadviceid"], data1['price_based_on'], subtypestatus),
                          this.DropDownListService.getPurOrdreceipt_criteria(data["pur_orderid"]),
                          this.DropDownListService.getPurOrdBroker(data["pur_orderid"]),
                          this.DropDownListService.getItemNameById(data1["item_code"], this.company_name),
  
                        ).subscribe(([packingList, capacityEmptyWt, purOrdData, podata, popackdata, porc, poBroker, ItemGrp]) => {
                          this.status = true;
                          this.status = true;
                         // console.log(" item data: " +JSON.stringify(podata))
                         // console.log(" popack data " +JSON.stringify(popackdata))
                          if (data1.wearhouse == '' || data1.wearhouse == null || data1.wearhouse == '0') {
  
                          }
                          else {
                            this.onChangeWarehouse(data1.wearhouse, j);
                          }
                          // this.onChangeWarehouse(data1.wearhouse, j);
  
  
                          console.log(" capacityEmptyWt " + JSON.stringify(capacityEmptyWt))
                          if (porc[0].receipt_criteria == '0' || porc[0].receipt_criteria == null) {
  
                          }
                          else {
                            //reciecptcritea
                            this.showunloadadvicepopupcriteria = true;
  
                            if (porc[0].receipt_criteria == '1') {
                              var crivalue = 'Advice Weight';
                              console.log(crivalue);
                              this.userForm.patchValue({ receipt_criteria: crivalue });
                            }
                            if (porc[0].receipt_criteria == '2') {
                              var crivalue = 'Recieving Weight';
                              console.log(crivalue);
                              this.userForm.patchValue({ receipt_criteria: crivalue });
                            }
                            if (porc[0].receipt_criteria == '3') {
                              var crivalue = 'Lower Weight';
                              console.log(crivalue);
                              this.userForm.patchValue({ receipt_criteria: crivalue });
                            }
  
                          }
                          //console.log("Tuhin : : " + JSON.stringify(data1));
                          // console.log("Tuhin 1 rcv_pack_qty : : " + JSON.stringify(popackdata));
                          // console.log("Tuhin 2 rcv_item_qty : : " + JSON.stringify(podata));
                          this.addItem();
                          this.finalgrnqty = Number(JSON.stringify(podata));
                          this.selectedItemName[j] = data1["item_code"];
                          this.empty_bag_wt_priceBasedOn[j] = capacityEmptyWt["empbagwt_based_on"];
                          this.packingItem[j] = packingList;
                          this.capacity[j] = capacityEmptyWt["capacity"];
                          this.empty_bag_wt[j] = capacityEmptyWt["empty_big_wt"];
                          this.pur_good_receipt_item_details.at(j).patchValue({
                            adv_item_code: data1["item_code"], adv_item_name: data1["item_name"],
                            adv_packing: data1["packing"], adv_pack_qty: data1["s_qty"], adv_pack_uom: data1["s_uom"],
                            adv_item_qty: data1["quantity"], adv_mat_wt: data1["mat_wt"], adv_item_uom: data1["uom"],
                            rcv_pack_uom: data1["s_uom"], rcv_item_uom: data1["uom"],
                            pssd_pack_uom: data1["s_uom"], rcv_pack_qty: popackdata, rcv_item_qty: podata, pssd_item_uom: data1["uom"], warehouse_name: data1["wearhouse"],
                            rack: data1["rack"], qc_norms: data1["qc_norms"],
                            unit_rate: purOrdData["price"],
                            price_based_on: purOrdData["price_based_on"], discount: purOrdData["discount"], discount_based_on: purOrdData["discount_basedon"],
                            tax_code: purOrdData["tax_code"], tax_rate: purOrdData["tax_rate"], con_factor: data1["con_factor"], hsn_code: ItemGrp["hsn_code"],
                            classified_item_name: data1["classified_item_name"]
                          });
                          console.log(this.pur_good_receipt_item_details.at(j).get("rcv_pack_qty").value + " / " + j);
                          //getiing passed weight values here 
                          this.getRcvPackingQtyautocalculate(this.pur_good_receipt_item_details.at(j).get("rcv_pack_qty").value, j)
                          j = j + 1;
  
                        });
                      }
                    }//end here 

                  }
                  
                }
                else {
                  if(this.itmSubType=='ITMT00002')
                  {
                    console.log("GRN Item Else: : " + JSON.stringify(data.grn_unload_item_list))
                    for (let data1 of data.grn_unload_item_list) {
  
  
                      if (data1["checkbox"] == 'true' || data1["checkbox"] == true) {
                        this.status = false;
                        //alert('Avi');
                        this.selectedItemName = [];
                        this.status = false;
                        console.log("checking data::"+data["unadviceid"]+"//"+data1['price_based_on']+"//"+subtypestatus)
                        //alert("Check data:"+JSON.stringify(data1["item_code"])+"////"+data["pur_orderid"])    
                        forkJoin(
                          this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                          this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name),
                          this.DropDownListService.getPurOrdItemDtlsnew(data["pur_orderid"], data1["item_code"], data1["packing"]),
                         // this.DropDownListService.getpssd_item_qty(data1["mat_wt"], data["unadviceid"], data["pur_orderid"]),
                         this.DropDownListService.getpssd_item_qtyrectify(data["unadviceid"], data1['price_based_on'], subtypestatus),
                         this.DropDownListService.getpssd_packing_qtyrectify(data["unadviceid"], data1['price_based_on'], subtypestatus),
                          //this.DropDownListService.getpssd_packing_qty(data1["mat_wt"], data["unadviceid"], data["pur_orderid"]),
                          this.DropDownListService.getPurOrdreceipt_criteria(data["pur_orderid"]),
                          this.DropDownListService.getPurOrdBroker(data["pur_orderid"]),
                          this.DropDownListService.getItemNameById(data1["item_code"], this.company_name),
  
                        ).subscribe(([packingList, capacityEmptyWt, purOrdData, podata, popackdata, porc, poBroker, ItemGrp]) => {
                          this.status = true;
                          this.status = true;
                          //console.log(" j " + data1.wearhouse)
                          console.log(" item data: " +JSON.stringify(podata))
                          console.log(" popack data " +JSON.stringify(popackdata))
                          if (data1.wearhouse == '' || data1.wearhouse == null || data1.wearhouse == '0') {
  
                          }
                          else {
                            this.onChangeWarehouse(data1.wearhouse, j);
                          }
                          // this.onChangeWarehouse(data1.wearhouse, j);
  
  
                          console.log(" capacityEmptyWt " + JSON.stringify(capacityEmptyWt))
                          if (porc[0].receipt_criteria == '0' || porc[0].receipt_criteria == null) {
  
                          }
                      
                          else {
                            //reciecptcritea
                            this.showunloadadvicepopupcriteria = true;
  
                            if (porc[0].receipt_criteria == '1') {
                              var crivalue = 'Advice Weight';
                              console.log(crivalue);
                              this.userForm.patchValue({ receipt_criteria: crivalue });
                            }
                            if (porc[0].receipt_criteria == '2') {
                              var crivalue = 'Recieving Weight';
                              console.log(crivalue);
                              this.userForm.patchValue({ receipt_criteria: crivalue });
                            }
                            if (porc[0].receipt_criteria == '3') {
                              var crivalue = 'Lower Weight';
                              console.log(crivalue);
                              this.userForm.patchValue({ receipt_criteria: crivalue });
                            }
  
                          }
  
                          this.addItem();
                          this.finalgrnqty = Number(JSON.stringify(podata));
                          this.selectedItemName[j] = data1["item_code"];
                          this.empty_bag_wt_priceBasedOn[j] = capacityEmptyWt["empbagwt_based_on"];
                          this.packingItem[j] = packingList;
                          this.capacity[j] = capacityEmptyWt["capacity"];
                          this.empty_bag_wt[j] = capacityEmptyWt["empty_big_wt"];
                          this.pur_good_receipt_item_details.at(j).patchValue({
                            adv_item_code: data1["item_code"], adv_item_name: data1["item_name"],
                            adv_packing: data1["packing"],
  
                            adv_pack_qty: data1["s_qty"], adv_pack_uom: data1["s_uom"],
                            adv_item_qty: data1["quantity"], adv_mat_wt: data1["mat_wt"], adv_item_uom: data1["uom"],
                            rcv_pack_uom: data1["s_uom"], rcv_item_uom: data1["uom"],
                            pssd_pack_uom: data1["s_uom"], rcv_pack_qty: popackdata, rcv_item_qty: podata, pssd_item_uom: data1["uom"], warehouse_name: data1["wearhouse"],
                            rack: data1["rack"], qc_norms: data1["qc_norms"],
                            unit_rate: purOrdData["price"],
                            price_based_on: purOrdData["price_based_on"], discount: purOrdData["discount"], discount_based_on: purOrdData["discount_basedon"],
                            tax_code: purOrdData["tax_code"], tax_rate: purOrdData["tax_rate"], con_factor: data1["con_factor"], hsn_code: ItemGrp["hsn_code"],
                            classified_item_name: data1["classified_item_name"], packing_item_code: data1["packing_item_code"], packing_size: data1["packing_size"],
                            packing_weight: data1["packing_weight"], packing_type: data1["packing_type"]
                          });
                          console.log(this.pur_good_receipt_item_details.at(j).get("rcv_pack_qty").value + " / " + j);
                          //getiing passed weight values here 
                          this.getRcvPackingQtyautocalculate(this.pur_good_receipt_item_details.at(j).get("rcv_pack_qty").value, j)
                          j = j + 1;
  
                        });
                      }
                    }//ends here
                  }
                  else
                  {
                    console.log("GRN Item Else: : " + JSON.stringify(data.grn_unload_item_list))
                    for (let data1 of data.grn_unload_item_list) {
  
  
                      if (data1["checkbox"] == 'true' || data1["checkbox"] == true) {
                        this.status = false;
                        //alert('Avi');
                        this.selectedItemName = [];
                        this.status = false;
                        console.log("checking data::"+data["unadviceid"]+"//"+data1['price_based_on']+"//"+subtypestatus)
                        //alert("Check data:"+JSON.stringify(data1["item_code"])+"////"+data["pur_orderid"])    
                        forkJoin(
                          this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                          this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name),
                          this.DropDownListService.getPurOrdItemDtlsnew(data["pur_orderid"], data1["item_code"], data1["packing"]),
                          this.DropDownListService.getpssd_item_qty(data1["mat_wt"], data["unadviceid"], data["pur_orderid"]),
                         //this.DropDownListService.getpssd_item_qtyrectify(data["unadviceid"], data1['price_based_on'], subtypestatus),
                         //this.DropDownListService.getpssd_packing_qtyrectify(data["unadviceid"], data1['price_based_on'], subtypestatus),
                          this.DropDownListService.getpssd_packing_qty(data1["mat_wt"], data["unadviceid"], data["pur_orderid"]),
                          this.DropDownListService.getPurOrdreceipt_criteria(data["pur_orderid"]),
                          this.DropDownListService.getPurOrdBroker(data["pur_orderid"]),
                          this.DropDownListService.getItemNameById(data1["item_code"], this.company_name),
  
                        ).subscribe(([packingList, capacityEmptyWt, purOrdData, podata, popackdata, porc, poBroker, ItemGrp]) => {
                          this.status = true;
                          this.status = true;
                          //console.log(" j " + data1.wearhouse)
                          console.log(" item data: " +JSON.stringify(podata))
                          console.log(" popack data " +JSON.stringify(popackdata))
                          if (data1.wearhouse == '' || data1.wearhouse == null || data1.wearhouse == '0') {
  
                          }
                          else {
                            this.onChangeWarehouse(data1.wearhouse, j);
                          }
                          // this.onChangeWarehouse(data1.wearhouse, j);
  
  
                          console.log(" capacityEmptyWt " + JSON.stringify(capacityEmptyWt))
                          if (porc[0].receipt_criteria == '0' || porc[0].receipt_criteria == null) {
  
                          }
                      
                          else {
                            //reciecptcritea
                            this.showunloadadvicepopupcriteria = true;
  
                            if (porc[0].receipt_criteria == '1') {
                              var crivalue = 'Advice Weight';
                              console.log(crivalue);
                              this.userForm.patchValue({ receipt_criteria: crivalue });
                            }
                            if (porc[0].receipt_criteria == '2') {
                              var crivalue = 'Recieving Weight';
                              console.log(crivalue);
                              this.userForm.patchValue({ receipt_criteria: crivalue });
                            }
                            if (porc[0].receipt_criteria == '3') {
                              var crivalue = 'Lower Weight';
                              console.log(crivalue);
                              this.userForm.patchValue({ receipt_criteria: crivalue });
                            }
  
                          }
  
                          this.addItem();
                          this.finalgrnqty = Number(JSON.stringify(podata));
                          this.selectedItemName[j] = data1["item_code"];
                          this.empty_bag_wt_priceBasedOn[j] = capacityEmptyWt["empbagwt_based_on"];
                          this.packingItem[j] = packingList;
                          this.capacity[j] = capacityEmptyWt["capacity"];
                          this.empty_bag_wt[j] = capacityEmptyWt["empty_big_wt"];
                          this.pur_good_receipt_item_details.at(j).patchValue({
                            adv_item_code: data1["item_code"], adv_item_name: data1["item_name"],
                            adv_packing: data1["packing"],
  
                            adv_pack_qty: data1["s_qty"], adv_pack_uom: data1["s_uom"],
                            adv_item_qty: data1["quantity"], adv_mat_wt: data1["mat_wt"], adv_item_uom: data1["uom"],
                            rcv_pack_uom: data1["s_uom"], rcv_item_uom: data1["uom"],
                            pssd_pack_uom: data1["s_uom"], rcv_pack_qty: popackdata, rcv_item_qty: podata, pssd_item_uom: data1["uom"], warehouse_name: data1["wearhouse"],
                            rack: data1["rack"], qc_norms: data1["qc_norms"],
                            unit_rate: purOrdData["price"],
                            price_based_on: purOrdData["price_based_on"], discount: purOrdData["discount"], discount_based_on: purOrdData["discount_basedon"],
                            tax_code: purOrdData["tax_code"], tax_rate: purOrdData["tax_rate"], con_factor: data1["con_factor"], hsn_code: ItemGrp["hsn_code"],
                            classified_item_name: data1["classified_item_name"], packing_item_code: data1["packing_item_code"], packing_size: data1["packing_size"],
                            packing_weight: data1["packing_weight"], packing_type: data1["packing_type"]
                          });
                          console.log(this.pur_good_receipt_item_details.at(j).get("rcv_pack_qty").value + " / " + j);
                          //getiing passed weight values here 
                          this.getRcvPackingQtyautocalculate(this.pur_good_receipt_item_details.at(j).get("rcv_pack_qty").value, j)
                          j = j + 1;
  
                        });
                      }
                    }//ends here
                  }

                 
                }


                this.showparty(data["unadviceid"]);

              }
            });


          }//if multiboolean false  ends

        }
        else if (this.userForm.get("referance_type").value == 'UNLOAD ADVICE WW' && (this.userForm.get("purchase_type").value == 'ITMT00004' || this.userForm.get("purchase_type").value == 'ITMT00005' || this.userForm.get("purchase_type").value == 'ITMT00002' || this.userForm.get("purchase_type").value == 'ITMT00007')) {
          this.Purtype = this.userForm.get("purchase_type").value as FormControl;
          dialogref = this.dialog.open(PurchaseOrderGrnPopUpComponent, { data: { b_unit: this.businessUnit, supp_id: this.suppli_id, item_type: this.itmType, pur_type: this.itmSubType, pur_subtype: this.PSubtype, order_date: this.ordate, id: this.grnId } });
          dialogref.disableClose = true;
          let unload_date: any;
          dialogref.afterClosed().subscribe(data => {
            console.log("chk static data:" + JSON.stringify(data))
            if (data != '' && data["unadviceid"] != '0') {
              this.pgrn_type_status = false;
              this.userForm.patchValue({ referance_id: data["unadviceid"], receipt_criteria: "NA" });
              unload_date = data["date"];

              this.packingItem = [];
              let j = 0;
              this.addItem();
              this.item_sl_no = 0;

              while (this.pur_good_receipt_item_details.length)
                this.pur_good_receipt_item_details.removeAt(0);
              console.log("tuhin dynamic " + JSON.stringify(data.grn_unload_item_list))
              let uomgolbal: any;
              for (let data1 of data.grn_unload_item_list) {


                if (data1["checkbox"] == 'true' || data1["checkbox"] == true) {
                  this.status = false;
                  this.selectedItemName = [];
                  forkJoin(
                    this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                    this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name),
                    //  this.DropDownListService.getPurOrdItemDtls(data["pur_orderid"], data1["item_code"]),
                    this.DropDownListService.getPurOrdItemDtlsnew(data["pur_orderid"], data1["item_code"], data1["packing"]),
                    this.DropDownListService.getPurOrdBroker(data["pur_orderid"]),
                    this.DropDownListService.retriveItemMasterStatInfo(data1["item_code"], this.company_name),
                    this.DropDownListService.getItemNameById(data1["item_code"], this.company_name)
                  ).subscribe(([packingList, capacityEmptyWt, purOrdData, poBroker, data3,ItemGrp]) => {
                    this.status = true;
                    //this.onChangeWarehouse(data1.wearhouse, j);
                    if (data1.wearhouse == '' || data1.wearhouse == null || data1.wearhouse == '0') {

                    }
                    else {
                      this.onChangeWarehouse(data1.wearhouse, j);
                    }

                    console.log(" capacityEmptyWt " + JSON.stringify(capacityEmptyWt))



                    this.addItem();
                    this.selectedItemName[j] = data1["item_code"];
                    //this.finalgrnqty=Number(JSON.stringify(podata));
                    this.empty_bag_wt_priceBasedOn[j] = capacityEmptyWt["empbagwt_based_on"];
                    this.packingItem[j] = packingList;
                    this.capacity[j] = capacityEmptyWt["capacity"];
                    this.empty_bag_wt[j] = capacityEmptyWt["empty_big_wt"];
                    this.pur_good_receipt_item_details.at(j).patchValue({
                      adv_item_code: data1["item_code"], adv_item_name: data1["item_name"],hsn_code: ItemGrp["hsn_code"],
                      adv_packing: data1["packing"], adv_pack_qty: data1["s_qty"], adv_pack_uom: data1["s_uom"],
                      adv_item_qty: data1["quantity"], adv_mat_wt: data1["mat_wt"], adv_item_uom: data1["uom"],
                      rcv_pack_uom: data1["s_uom"], rcv_item_uom: data1["uom"], pssd_item_qty: data1["quantity"], pssd_mat_wt: data1["mat_wt"],
                      pssd_pack_uom: data1["s_uom"], pssd_pack_qty: data1["s_qty"], rcv_pack_qty: 0, con_factor: data1["con_factor"],
                      pssd_item_uom: data1["uom"], warehouse_name: data1["wearhouse"],
                      rack: data1["rack"], qc_norms: data1["qc_norms"],
                      unit_rate: purOrdData["price"],
                      price_based_on: purOrdData["price_based_on"], discount: purOrdData["discount"], discount_based_on: purOrdData["discount_basedon"],
                      tax_code: purOrdData["tax_code"], tax_rate: purOrdData["tax_rate"], classified_item_name: data1["classified_item_name"],
                      packing_item_code: data1["packing_item_code"], packing_size: data1["packing_size"],
                      packing_weight: data1["packing_weight"], packing_type: data1["packing_type"], restwt: data1["restwt"]
                    });

                    this.taxdata.forEach(element => {
                      //console.log("foreach "+element.tax_id);
                      if (element.tax_id == data3[0].tax_code) {
                        //console.log("foreach "+element.tax_name);
                        this.actualcgstrate = element.cgst_act_val;
                        this.actualsgstrate = element.sgst_act_val;
                        console.log("foreach " + element.tax_name + "//" + this.actualcgstrate + "//" + this.actualsgstrate);
                        this.pur_good_receipt_item_details.at(j).patchValue({ tax_code: element.tax_name });
                      }

                    });

                    this.calculateItemData(data1["s_qty"], data1["quantity"], data1["mat_wt"], 0, 0, 0, data1["s_qty"],
                      data1["quantity"], data1["mat_wt"], purOrdData["price"], purOrdData["price_based_on"], purOrdData["discount"], purOrdData["discount_basedon"],
                      purOrdData["tax_rate"], 0, j)
                    uomgolbal = data1["s_uom"];
                    j = j + 1;

                  });
                }
              }

              this.showpartynoweigment(data["unadviceid"], unload_date, data["global_uom"]);
              this.status = true;

              //ends
            }
          });
        }
        else if (this.userForm.get("referance_type").value == 'PURCHASE ORDER' && (this.userForm.get("purchase_type").value == 'ITMT00004' || this.userForm.get("purchase_type").value == 'ITMT00005' || this.userForm.get("purchase_type").value == 'ITMT00002' || this.userForm.get("purchase_type").value == 'ITMT00007')) {

          this.Purtype = this.userForm.get("purchase_type").value as FormControl;
          dialogref = this.dialog.open(StorePurchasePopupComponent, { data: { b_unit: this.businessUnit, pur_type: this.Purtype, id: this.grnId } });
          dialogref.disableClose = true;

          dialogref.afterClosed().subscribe(data => {

            if (data["pur_orderid"] != "0" && data["pur_orderid"] != '' && data["pur_orderid"] != undefined) {
              this.pgrn_type_status = false;

              this.userForm.patchValue({ referance_id: data["pur_orderid"], receipt_criteria: "NA" });
              this.packingItem = [];
              let j = 0;
              this.addItem();
              this.item_sl_no = 0;



              while (this.pur_good_receipt_item_details.length)
                this.pur_good_receipt_item_details.removeAt(0);

              for (let data1 of data.pur_good_receipt_item_details) {

                console.log("pur data " + JSON.stringify(data.pur_good_receipt_item_details))
                if (data1["checkbox"] == 'true' || data1["checkbox"] == true) {
                  this.selectedItemName = [];
                  this.status = false;


                  forkJoin(
                    this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                    this.DropDownListService.retriveItemMasterStatInfo(data1["item_code"], this.company_name),
                    this.DropDownListService.getItemNameById(data1["item_code"], this.company_name)
                  ).subscribe(([packingList, data3, ItemGrp]) => {
                    this.selectedItemName[j] = data1["item_code"];

                    // this.onChangeWarehouse(data1.wearhouse, j);
                    if (data1.wearhouse == '' || data1.wearhouse == null || data1.wearhouse == '0') {

                    }
                    else {
                      this.onChangeWarehouse(data1.wearhouse, j);
                    }
                    this.packingItem[j] = packingList;
                    this.addItem();

                    this.pur_good_receipt_item_details.at(j).patchValue({
                      adv_item_code: data1["item_code"], hsn_code: ItemGrp["hsn_code"], classified_item_name: data1["classified_item_name"], adv_packing: data1["packing_item"], adv_pack_qty: data1["packing_qty"], adv_pack_uom: data1["packing_uom"],
                      adv_item_qty: data1["stock_qty"], adv_mat_wt: data1["mat_weight"], adv_item_uom: data1["stock_uom"],
                      rcv_item_qty: 0, rcv_pack_uom: data1["packing_uom"], rcv_item_uom: data1["stock_uom"], pssd_item_qty: data1["stock_qty"], pssd_mat_wt: data1["mat_weight"],
                      pssd_pack_uom: data1["packing_uom"], pssd_pack_qty: data1["packing_qty"], rcv_pack_qty: 0, con_factor: data1["con_factor"],
                      pssd_item_uom: data1["stock_uom"], warehouse_name: data1["wearhouse"],
                      rack: data1["rack"],
                      qc_norms: data1["qc_norms"], unit_rate: data1["price"],
                      price_based_on: data1["price_based_on"],
                      amount: data1["amount"],
                      discount: data1["discount"], discount_based_on: data1["discount_basedon"], discount_amt: data1["discount_amount"],
                      net_amt: data1["net_amount"], gross_amt: data1["total_amount"],
                      tax_code: data1["tax_code"], tax_rate: data1["tax_rate"], tax_amt: data1["tax_amount"], net_amt_after_qc: data1["net_amount"], packing_item_code: data1["packing_item_code"], packing_size: data1["packing_size"],
                      packing_weight: data1["packing_weight"], packing_type: data1["packing_type"], restwt: data1["final_mat_wt"]
                    });

                    this.taxdata.forEach(element => {
                      //console.log("foreach "+element.tax_id);
                      if (element.tax_id == data3[0].tax_code) {
                        //console.log("foreach "+element.tax_name);
                        this.actualcgstrate = element.cgst_act_val;
                        this.actualsgstrate = element.sgst_act_val;
                        console.log("foreach " + element.tax_name + "//" + this.actualcgstrate + "//" + this.actualsgstrate);
                        this.pur_good_receipt_item_details.at(j).patchValue({ tax_code: element.tax_name });
                      }

                    });


                    console.log("passed pack qty:" + data1["packing_qty"] + "//" + data1["price_based_on"])
                    this.calculateItemData(data1["s_qty"], data1["quantity"], data1["mat_wt"], 0, 0, 0, data1["packing_qty"],
                      data1["stock_qty"], data1["mat_wt"], data1["price"], data1["price_based_on"], data1["discount"], data1["discount_basedon"],
                      data1["tax_rate"], 0, j);
                    this.status = true;
                    j = j + 1;

                  });
                }
              }


              this.showOtherDetails(data["pur_orderid"], data["purchasedate"], data["staticuom"]);
              this.status = true;

            }
          });



        }
        else {
          this.status = true;
        }

        this.popupstatus = true;
      }

    }
    else { alert("Select Business Unit and Purchase Type First!") }
  }

  showOtherDetails(pur_ord_id: string, purchasedate, staticuom) {
    this.status = false;
    this.dynamicgrnstatus = true;
    this.contAddrs = [];
    this.delvAddrs = [];

    forkJoin(
      this.DropDownListService.getPurOrdBrokerNew(pur_ord_id),
      this.DropDownListService.checkmulticheck(pur_ord_id),
      this.DropDownListService.getPurOrdTrans(pur_ord_id),
      this.DropDownListService.purOrdBPDRetriveList(pur_ord_id),
      this.DropDownListService.getCustomUomsbyname(staticuom)
    ).subscribe(([brokerData, purOrddata, transData, bpData, cusuom]) => {

      forkJoin(
        this.DropDownListService.getBrokerListBySupplierCode(purOrddata["supplier_name"]),
        this.DropDownListService.getSuppAddrById(purOrddata["supplier_name"]),
        this.DropDownListService.getDeliveryAddrById(purOrddata["supplier_name"])
      ).subscribe
        (([brokerData, data4, data5]) => {
          this.brokerNameList = brokerData;
          this.contAddrs = data4;
          this.delvAddrs = data5;

        });
      //console.log("purOrddata:"+JSON.stringify(purOrddata))
      this.userForm.patchValue({ supplier_name: purOrddata["supplier_name"] })
      let i = 0;
      this.addBroker();
      this.broker_sl_no = 0;
      while (this.pur_good_receipt_broker.length)
        this.pur_good_receipt_broker.removeAt(0);
      this.isChecked4 = true;
      for (let data10 of brokerData) {
        this.addBroker();
        //console.log("brokerdata1:"+JSON.stringify(brokerData))
        this.pur_good_receipt_broker.at(i).patchValue({
          ven_code_name: data10["ven_code_name"], basis: data10["basis"], rate: data10["rate"],
          brokerage_acc: data10["brokerage_acc"], tds_acc: data10["tds_acc"], tds_rate: data10["tds_rate"], ven_name: data10["ven_name"]
        });
        i = i + 1;
      }

      //console.log("transData: "+JSON.stringify(transData));
      this.pur_good_reciept_trans_info.patchValue({
        trans_borne_by: transData["trans_borne_by"],
        mode_of_trans: transData["mode_of_trans"], transporter_code: transData["transporter_name"],
        transportation_rate: transData["transport_rate"], payment_mode: transData["payment_mode"],
        payment_term: transData["payment_terms"], bank_name: transData["bank_name"],
        acc_name: transData["account_name"], acc_no: transData["account_no"],
        branch: transData["branch"], iban: transData["iban"],
        bic_swift_code: transData["bic_swift_code"]
      });

      console.log("bpData: " + JSON.stringify(bpData));
      this.pur_good_receipt_Business_Partner_details.patchValue({
        sp_name: bpData["supp_name"], sp_phone: bpData["supp_phone"],
        sp_fax: bpData["supp_fax"], sp_email: bpData["supp_email"], sp_address: bpData["supp_address"],
        cp_name: bpData["cp_name"], cp_designation: bpData["cp_designation"], cp_phone: bpData["cp_phone"], cp_fax: bpData["cp_fax"],
        cp_email: bpData["cp_email"], cp_address: bpData["cp_address"]
      })

      this.pur_goods_receipt_other_information.patchValue({
        pty_gross_wt: 0, pty_tare_wt: 0, pty_net_wt: 0, own_gross_wt: 0, own_gross_uom: cusuom["customuom_id"],
        own_weigh_date: purchasedate, own_net_uom: cusuom["customuom_id"], own_net_wt: 0,
        own_tare_wt: 0, own_tare_uom: cusuom["customuom_id"], pty_gross_uom: cusuom["customuom_id"], pty_tare_uom: cusuom["customuom_id"], pty_net_uom: cusuom["customuom_id"]
      });

      this.status = true;
    });
  }
  getpssd_item_qty(unloadadvice, weighmentdata, purchaseid) {
    let output;
    this.DropDownListService.getpssd_item_qty(unloadadvice, weighmentdata, purchaseid)
      .subscribe(
        (data) => {
          console.log("Data :: " + JSON.stringify(data));
          output = data;

        }
      );
  }
  showpartymultiple(unadvice_id: string) {

    let staticunloadadvice: any;
    let check = "abcd";
    console.log("hello look here " + unadvice_id);

    if (unadvice_id.includes(",")) {
      let splitval = unadvice_id.split(",");

      staticunloadadvice = splitval[0];
    }
    else {
      staticunloadadvice = unadvice_id;
    }

    console.log("tuhin LOOK HERE ::" + staticunloadadvice + " / " + unadvice_id);

    this.status = false;
    forkJoin(
      this.DropDownListService.wmUnAdviceBpDtlsRetriveList(staticunloadadvice),
      //this.DropDownListService.wmUnAdvicePartyWmRetriveList(staticunloadadvice),//need to be new
      this.DropDownListService.wmUnAdvicePartyWmRetriveListmultipopup(unadvice_id),
      this.DropDownListService.wmUnAdviceTransInfoRetriveList(staticunloadadvice),
      this.DropDownListService.wmUnAdviceBrokerRetriveList(staticunloadadvice),
      this.DropDownListService.getUnloadDetails(staticunloadadvice)//getUnloadDetails//getUnloadDetailsmulti_popup
    ).subscribe(([bpData, partyWmData, transData, brokerData, unloadData]) => {
      this.onChangeSupplierName(unloadData["busi_partner"]);
      console.log("hey tuhin here  " + bpData["sp_name"] + " / " + bpData.sp_name)

      this.onChangeSuppInfoName(bpData["sp_name"]);


      //this.onChangeContInfoName(bpData["cp_name"]);
      this.pur_good_receipt_Business_Partner_details.patchValue(bpData)

      console.log("other info partyWmData: " + JSON.stringify(partyWmData));//needed to be change
      this.pur_goods_receipt_other_information.patchValue({
        pty_gross_uom: partyWmData["uom1"], pty_gross_wt: partyWmData["gross_wt"],
        pty_tare_wt: partyWmData["tare_wt"], pty_net_wt: (Math.round(partyWmData["net_wt"] * 100) / 100).toFixed(3),
        pty_weigh_date: partyWmData["pw_date"], pty_tare_uom: partyWmData["uom2"],
        pty_net_uom: partyWmData["uom3"], pty_weigh_bridge_name: partyWmData["wb_name"],
        pty_weigh_slip_no: partyWmData["slip_no"]
      });

      console.log("transData: " + JSON.stringify(transData));
      this.pur_good_reciept_trans_info.patchValue({
        trans_borne_by: transData["trans_borne_by"],
        mode_of_trans: transData["mode_of_trans"], transporter_code: transData["transporter_name"],
        transportation_rate: transData["transport_rate"], payment_mode: transData["payment_mode"],
        payment_term: transData["payment_terms"], bank_name: transData["bank_name"],
        acc_name: transData["account_name"], acc_no: transData["account_no"],
        branch: transData["branch"], iban: transData["iban"],
        bic_swift_code: transData["bic_swift_code"]
      });

      console.log("brokerData: " + JSON.stringify(brokerData));
      let i = 0;
      this.addBroker();
      this.broker_sl_no = 0;
      while (this.pur_good_receipt_broker.length)
        this.pur_good_receipt_broker.removeAt(0);
      this.isChecked4 = true;
      // for(let data1 of brokerData)
      // {
      //   this.addBroker();
      //   this.pur_good_receipt_broker.at(i).patchValue({ 
      //     ven_code_name: data1["ven_code_name"], basis: data1["basis"], rate:data1["rate"],
      //     brokerage_acc: data1["brokerage_acc"], tds_acc: data1["tds_acc"], tds_rate: data1["tds_rate"]});
      //   i = i + 1;
      // }
      // for(let data1 of brokerData)
      // this.addBroker();
      for (let data1 of brokerData) {
        this.addBroker();
        this.pur_good_receipt_broker.at(i).patchValue({
          ven_code_name: data1["ven_code_name"], basis: data1["basis"], rate: data1["rate"],
          brokerage_acc: data1["brokerage_acc"], tds_acc: data1["tds_acc"], tds_rate: data1["tds_rate"], ven_name: data1["ven_name"]
        });
        i = i + 1;
      }
      //this.pur_good_receipt_broker.patchValue(brokerData);




      console.log("unload Data: " + JSON.stringify(unloadData));
      this.userForm.patchValue({
        b_unit: unloadData["business_unit"], item_sub_type: unloadData["item_subtype"],
        supplier_name: unloadData["busi_partner"],
        vehicle_id: unloadData["vehicle_id"], remarks: unloadData["remarks"]
      })
      this.pur_goods_receipt_other_information.patchValue({ vehicle_id: unloadData["vehicle_id"] });
      this.status = false;
      forkJoin(
        this.DropDownListService.getPurOrdDetails(unloadData["pur_orderid"]),
        this.DropDownListService.getPurOrdAppChgs(unloadData["pur_orderid"]),
        //this.DropDownListService.getUnloadWeightmentWtmultipopup(staticunloadadvice)
        this.DropDownListService.getUnloadWeightmentWtmultipopupmultipleItem(unadvice_id)
      ).subscribe(([chargesData, appchargesData, weigmtData]) => {
        this.userForm.patchValue({ applicable_charges_id: chargesData["app_chgs_id"] });

        let k = 0;
        this.add1();
        while (this.pur_good_receipt_resource_cost.length)
          this.pur_good_receipt_resource_cost.removeAt(0)
        for (let data1 of appchargesData) {
          this.add1();
          this.pur_good_receipt_resource_cost.at(k).patchValue({
            charge_name: data1["charges_name"],
            rate_cal_method: data1["rate_cal_method"], amount: data1["amount"],
            tax_rate: data1["tax_rate"], tax_amt: data1["tax_amt"], gross_amt: data1["gross_amt"]
          });
          k = k + 1;
        }
        console.log("WGT :: "+JSON.stringify(weigmtData));
        this.pur_goods_receipt_other_information.patchValue({
          own_gross_wt: weigmtData[0]["gross_weight"], own_gross_uom: weigmtData[0]["gw_unit"],
          own_weigh_date: weigmtData[0]["gw_date"], own_net_uom: weigmtData[0]["nw_unit"], own_net_wt: (Math.round(weigmtData[0]["net_weight"] * 100) / 100).toFixed(3),
          own_tare_wt: weigmtData[0]["tare_weight"], own_tare_uom: weigmtData[0]["tw_unit"]
        });
        this.status = true;
      })

      this.status = true;
    });


  }


  showparty(unadvice_id: string) {
    this.status = false;
    forkJoin(
      this.DropDownListService.wmUnAdviceBpDtlsRetriveList(unadvice_id),
      this.DropDownListService.wmUnAdvicePartyWmRetriveList(unadvice_id),
      this.DropDownListService.wmUnAdviceTransInfoRetriveList(unadvice_id),
      this.DropDownListService.wmUnAdviceBrokerRetriveList(unadvice_id),
      this.DropDownListService.getUnloadDetails(unadvice_id)
    ).subscribe(([bpData, partyWmData, transData, brokerData, unloadData]) => {
      this.onChangeSupplierName(unloadData["busi_partner"]);
      console.log(JSON.stringify(bpData))
      this.onChangeSuppInfoName(bpData["sp_name"]);
      //this.onChangeContInfoName(bpData["cp_name"]);
      this.pur_good_receipt_Business_Partner_details.patchValue(bpData)

      console.log("other info partyWmData: " + JSON.stringify(partyWmData));
      this.pur_goods_receipt_other_information.patchValue({
        pty_gross_uom: partyWmData["uom1"], pty_gross_wt: partyWmData["gross_wt"],
        pty_tare_wt: partyWmData["tare_wt"], pty_net_wt: (Math.round(partyWmData["net_wt"] * 100) / 100).toFixed(3),
        pty_weigh_date: partyWmData["pw_date"], pty_tare_uom: partyWmData["uom2"],
        pty_net_uom: partyWmData["uom3"], pty_weigh_bridge_name: partyWmData["wb_name"],
        pty_weigh_slip_no: partyWmData["slip_no"]
      });

      console.log("transData: " + JSON.stringify(transData));
      this.pur_good_reciept_trans_info.patchValue({
        trans_borne_by: transData["trans_borne_by"],
        mode_of_trans: transData["mode_of_trans"], transporter_code: transData["transporter_name"],
        transportation_rate: transData["transport_rate"], payment_mode: transData["payment_mode"],
        payment_term: transData["payment_terms"], bank_name: transData["bank_name"],
        acc_name: transData["account_name"], acc_no: transData["account_no"],
        branch: transData["branch"], iban: transData["iban"],
        bic_swift_code: transData["bic_swift_code"]
      });

      console.log("brokerData: " + JSON.stringify(brokerData));
      let i = 0;
      this.addBroker();
      this.broker_sl_no = 0;
      while (this.pur_good_receipt_broker.length)
        this.pur_good_receipt_broker.removeAt(0);
      this.isChecked4 = true;
      for (let data1 of brokerData) {
        this.addBroker();
        this.pur_good_receipt_broker.at(i).patchValue({
          //changes here 09-05-2022  ven_code_name: data1["ven_code_name"], basis: data1["basis"], rate:data1["rate"],
          ven_code_name: data1["ven_code_name"], basis: data1["basis"], rate: data1["rate"],
          brokerage_acc: data1["brokerage_acc"], tds_acc: data1["tds_acc"], tds_rate: data1["tds_rate"], ven_name: data1["ven_name"]
        });
        i = i + 1;
      }

      console.log("unload Data: " + JSON.stringify(unloadData));
      this.userForm.patchValue({
        b_unit: unloadData["business_unit"], item_sub_type: unloadData["item_subtype"],
        supplier_name: unloadData["busi_partner"],
        vehicle_id: unloadData["vehicle_id"], remarks: unloadData["remarks"]
      })
      this.pur_goods_receipt_other_information.patchValue({ vehicle_id: unloadData["vehicle_id"] });
      this.status = false;
      forkJoin(
        this.DropDownListService.getPurOrdDetails(unloadData["pur_orderid"]),
        this.DropDownListService.getPurOrdAppChgs(unloadData["pur_orderid"]),
        this.DropDownListService.getUnloadWeightmentWt(unloadData["weighment_id"])
      ).subscribe(([chargesData, appchargesData, weigmtData]) => {
        this.userForm.patchValue({ applicable_charges_id: chargesData["app_chgs_id"] });

        let k = 0;
        this.add1();
        while (this.pur_good_receipt_resource_cost.length)
          this.pur_good_receipt_resource_cost.removeAt(0)
        for (let data1 of appchargesData) {
          this.add1();
          this.pur_good_receipt_resource_cost.at(k).patchValue({
            charge_name: data1["charges_name"],
            rate_cal_method: data1["rate_cal_method"], amount: data1["amount"],
            tax_rate: data1["tax_rate"], tax_amt: data1["tax_amt"], gross_amt: data1["gross_amt"]
          });
          k = k + 1;
        }

        this.pur_goods_receipt_other_information.patchValue({
          own_gross_wt: weigmtData["gross_weight"], own_gross_uom: weigmtData["gw_unit"],
          own_weigh_date: weigmtData["gw_date"], own_net_uom: weigmtData["nw_unit"], own_net_wt: (Math.round(weigmtData["net_weight"] * 100) / 100).toFixed(3),
          own_tare_wt: weigmtData["tare_weight"], own_tare_uom: weigmtData["tw_unit"]
        });
        this.status = true;
      })

      this.status = true;
      console.log("hello tuhin " + this.dynamicgrnstatus)
    });
  }


  showpartynoweigment(unadvice_id: string, date, uom) {
    console.log("Bisdhan da uom :: " + uom)
    this.status = false;
    forkJoin(
      this.DropDownListService.wmUnAdviceBpDtlsRetriveList(unadvice_id),
      this.DropDownListService.wmUnAdvicePartyWmRetriveList(unadvice_id),
      this.DropDownListService.wmUnAdviceTransInfoRetriveList(unadvice_id),
      this.DropDownListService.wmUnAdviceBrokerRetriveList(unadvice_id),
      this.DropDownListService.getUnloadDetails(unadvice_id)
    ).subscribe(([bpData, partyWmData, transData, brokerData, unloadData]) => {
      this.onChangeSupplierName(unloadData["busi_partner"]);

      this.onChangeSuppInfoName(bpData["sp_name"]);
      //this.onChangeContInfoName(bpData["cp_name"]);
      this.pur_good_receipt_Business_Partner_details.patchValue(bpData)

      console.log("other info partyWmData: " + JSON.stringify(partyWmData));
      this.pur_goods_receipt_other_information.patchValue({
        pty_gross_uom: partyWmData["uom1"], pty_gross_wt: partyWmData["gross_wt"],
        pty_tare_wt: partyWmData["tare_wt"], pty_net_wt: (Math.round(partyWmData["net_wt"] * 100) / 100).toFixed(3),
        pty_weigh_date: partyWmData["pw_date"], pty_tare_uom: partyWmData["uom2"],
        pty_net_uom: partyWmData["uom3"], pty_weigh_bridge_name: partyWmData["wb_name"],
        pty_weigh_slip_no: partyWmData["slip_no"]
      });

      console.log("transData: " + JSON.stringify(transData));
      this.pur_good_reciept_trans_info.patchValue({
        trans_borne_by: transData["trans_borne_by"],
        mode_of_trans: transData["mode_of_trans"], transporter_code: transData["transporter_name"],
        transportation_rate: transData["transport_rate"], payment_mode: transData["payment_mode"],
        payment_term: transData["payment_terms"], bank_name: transData["bank_name"],
        acc_name: transData["account_name"], acc_no: transData["account_no"],
        branch: transData["branch"], iban: transData["iban"],
        bic_swift_code: transData["bic_swift_code"]
      });

      console.log("brokerData: " + JSON.stringify(brokerData));
      let i = 0;
      this.addBroker();
      this.broker_sl_no = 0;
      while (this.pur_good_receipt_broker.length)
        this.pur_good_receipt_broker.removeAt(0);
      this.isChecked4 = true;
      for (let data1 of brokerData) {
        this.addBroker();
        this.pur_good_receipt_broker.at(i).patchValue({
          //changes here 09-05-2022  ven_code_name: data1["ven_code_name"], basis: data1["basis"], rate:data1["rate"],
          ven_code_name: data1["ven_code_name"], basis: data1["basis"], rate: data1["rate"],
          brokerage_acc: data1["brokerage_acc"], tds_acc: data1["tds_acc"], tds_rate: data1["tds_rate"], ven_name: data1["ven_name"]
        });
        i = i + 1;
      }

      console.log("unload Data: " + JSON.stringify(unloadData));
      this.userForm.patchValue({
        b_unit: unloadData["business_unit"], item_sub_type: unloadData["item_subtype"],
        supplier_name: unloadData["busi_partner"],
        vehicle_id: unloadData["vehicle_id"], remarks: unloadData["remarks"]
      })
      this.pur_goods_receipt_other_information.patchValue({ vehicle_id: unloadData["vehicle_id"] });
      this.status = false;
      forkJoin(
        this.DropDownListService.getPurOrdDetails(unloadData["pur_orderid"]),
        this.DropDownListService.getPurOrdAppChgs(unloadData["pur_orderid"]),
        this.DropDownListService.getCustomUomsbyname(uom)
      ).subscribe(([chargesData, appchargesData, cusuom]) => {
        this.userForm.patchValue({ applicable_charges_id: chargesData["app_chgs_id"] });
        console.log("bidhan da data cuom  " + JSON.stringify(cusuom))
        let k = 0;
        this.add1();
        while (this.pur_good_receipt_resource_cost.length)
          this.pur_good_receipt_resource_cost.removeAt(0)
        for (let data1 of appchargesData) {
          this.add1();
          this.pur_good_receipt_resource_cost.at(k).patchValue({
            charge_name: data1["charges_name"],
            rate_cal_method: data1["rate_cal_method"], amount: data1["amount"],
            tax_rate: data1["tax_rate"], tax_amt: data1["tax_amt"], gross_amt: data1["gross_amt"]
          });
          k = k + 1;
        }
        //cusuom
        console.log("tuhin data " + cusuom["customuom_id"])
        this.pur_goods_receipt_other_information.patchValue({
          own_gross_wt: 0, own_gross_uom: cusuom["customuom_id"],
          own_weigh_date: date, own_net_uom: cusuom["customuom_id"], own_net_wt: 0,
          own_tare_wt: 0, own_tare_uom: cusuom["customuom_id"], pty_gross_uom: cusuom["customuom_id"], pty_tare_uom: cusuom["customuom_id"], pty_net_uom: cusuom["customuom_id"]
        });
        this.status = true;
      })

      this.status = true;
    });
  }


  showPopUp1(index) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: index };
    const dialogRef = this.dialog.open(TaxPopUpModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.pur_good_receipt_item_details.at(index).patchValue({ tax_code: data["tax_id"], tax_rate: data["tax_rate"] });
      this.advPackQty = this.pur_good_receipt_item_details.at(index).get("adv_pack_qty").value as FormControl;
      this.advItemQty = this.pur_good_receipt_item_details.at(index).get("adv_item_qty").value as FormControl;
      this.advMatWt = this.pur_good_receipt_item_details.at(index).get("adv_mat_wt").value as FormControl;
      this.rcvPackQty = this.pur_good_receipt_item_details.at(index).get("rcv_pack_qty").value as FormControl;
      this.rcvItemQty = this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value as FormControl;
      this.rcvMatWt = this.pur_good_receipt_item_details.at(index).get("rcv_mat_wt").value as FormControl;
      this.pssdPackQty = this.pur_good_receipt_item_details.at(index).get("pssd_pack_qty").value as FormControl;
      this.pssdItemQty = this.pur_good_receipt_item_details.at(index).get("pssd_item_qty").value as FormControl;
      this.pssdMatWt = this.pur_good_receipt_item_details.at(index).get("pssd_mat_wt").value as FormControl;
      this.price = this.pur_good_receipt_item_details.at(index).get("unit_rate").value as FormControl;
      this.based_on = this.pur_good_receipt_item_details.at(index).get("price_based_on").value as FormControl;
      this.discount = this.pur_good_receipt_item_details.at(index).get("discount").value as FormControl;
      this.discountBasedOn = this.pur_good_receipt_item_details.at(index).get("discount_based_on").value as FormControl;
      this.taxRate = data["tax_rate"];
      this.qcDeduction = this.pur_good_receipt_item_details.at(index).get('qc_deduction').value as FormControl;

      this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty,
        this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
    });
  }

  itemCode: any;
  showPopUp2(index) {
    this.itemCode = this.pur_good_receipt_item_details.at(index).get('adv_item_code').value as FormControl;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: index, item_code: this.itemCode };
    const dialogRef = this.dialog.open(QcNormPopUpModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      this.pur_good_receipt_item_details.at(index).patchValue({ qc_norms: data["qc_code"] });
    });
  }

  onUpdate(id: any, grn_id: string, action) {
    this.grnsave = true;
    this.userForm.patchValue({ id: id });
    this.status = false;
    this.isHidden = true;
    this.packingItem = [];
    console.log(this.isHidden)
    if (action == 'view') { this.action = 'view'; }
    else { this.action = 'update'; }

    forkJoin(
      this.Service.retrivePurchaseGoodReceipt(id),
     // this.Service.grnItemDtlsRetriveList(grn_id),
     this.Service.grnItemDtlsRetriveListFast(grn_id),
     // this.Service.grnOtherInfoRetriveList(grn_id),
     this.Service.grnOtherInfoRetriveListFast(grn_id),
     // this.Service.grnBrokerRetriveList(grn_id),
     this.Service.grnBrokerRetriveListFast(grn_id),
      //this.Service.grnTransInfoRetriveList(grn_id),
      this.Service.grnTransInfoRetriveListFast(grn_id),
     // this.Service.grnBPDtlsRetriveList(grn_id),
     this.Service.grnBPDtlsRetriveListFast(grn_id),
     // this.Service.grnResourceCostRetriveList(grn_id),
     this.Service.grnResourceCostRetriveListFast(grn_id),
      //this.Service.grnDocRetriveList(grn_id),
      this.Service.grnDocRetriveListFast(grn_id),
      //this.Service.grndriverdetails(grn_id)
      this.Service.grndriverdetailsFast(grn_id)

    ).subscribe(([GrnData, itemData, OtherInfoData, BrokerData,
      TransData, BpDetails, ResourceCostData, docData, driverdetails]) => {

      this.currentDate = GrnData["grn_date"];
      this.itmSubType = GrnData["item_sub_type"];
      this.itmType = GrnData["item_type"];
      this.businessUnit = GrnData["b_unit"];
      this.onChangeBussinessUnit(GrnData["b_unit"], 'update');
      this.onChangeSupplierName(GrnData["supplier_name"]);
      this.onChangeItemSubType(GrnData["purchase_type"], 'update');

      if (GrnData["referance_type"] == 'OPEN GRN') {
        this.dynamicgrnstatus = true;
        this.disvehicle = false;
        this.viewdriver = true;
      }
      if (GrnData["referance_type"] == 'PURCHASE ORDER') {
        this.dynamicgrnstatus = true;
      }
      else {
        this.dynamicgrnstatus = false;
      }

      if (GrnData["referance_type"] == 'UNLOAD ADVICE') {
        this.popupstatus = true;
      }
      if (GrnData["item_type"] == true) {
        this.userForm.patchValue({ item_type: "true" });
        // this.orderFor = "true";
      }
      else {
        this.userForm.patchValue({ item_type: "false" });
        // this.orderFor = "false";
      }
      // SalesOrder Starts
      if(this.salesProcess==GrnData["sales_process"]){
        this.salesOrderListShow = false;
        console.log("sales Order List Update:: ",this.salesOrderListShow);
        this.userForm.patchValue({sales_order:"NA"});
      }
      else{
        this.salesOrderListShow = true;
        forkJoin(
          this.DropDownListService.getSalesOrderList(GrnData["sales_process"],localStorage.getItem("financial_year")),
        ).subscribe(([soList]) => {
          console.log("SO List::" + JSON.stringify(soList));
          console.log("sales Order List Update:: ",this.salesOrderListShow);
          this.soNoList = soList;
        });
      }
      // SalesOrder Ends
      this.userForm.patchValue({
        id: GrnData["id"], grn_id: GrnData["grn_id"], b_unit: GrnData["b_unit"],
        item_sub_type: GrnData["item_sub_type"], grn_date: GrnData["grn_date"], purchase_type: GrnData["purchase_type"],
        grn_no: GrnData["grn_no"], supplier_name: GrnData["supplier_name"], referance_type: GrnData["referance_type"],
        vehicle_id: GrnData["vehicle_id"],sales_process: GrnData["sales_process"],sales_order: GrnData["sales_order"], company_id: GrnData["company_id"], fin_year: GrnData["fin_year"], purchase_subtype: GrnData["purchase_subtype"],
        applicable_charges_id: GrnData["applicable_charges_id"], remarks: GrnData["remarks"], brokerage_active: GrnData["brokerage_active"], receipt_criteria: GrnData["receipt_criteria"], multiunloadadvice: GrnData["multiunloadadvice"]
      });
      console.log("GrnData Details: " + JSON.stringify(GrnData));

      // console.log("itemData: "+  JSON.stringify(itemData));
      let k = 0;
      this.addItem()

      this.item_sl_no = 0;
      while (this.pur_good_receipt_item_details.length)
        this.pur_good_receipt_item_details.removeAt(0);
      for (let data1 of itemData) {
        this.selectedItemName = [];
        this.status = false;
        forkJoin(
          this.DropDownListService.getItemMasterPackMat(data1["adv_item_code"]),
          this.DropDownListService.getItemPackUom(data1["adv_item_code"], data1["adv_packing"], this.company_name)
        ).subscribe(([packingList, capacityEmptyWt]) => {
          this.status = true;
          this.addItem();
          this.selectedItemName[k] = data1["adv_item_code"];
          this.onChangeWarehouse(data1.warehouse_name, k);
          console.log("CHECK  ::  " + data1.warehouse_name)
          this.packingItem[k] = packingList;
          this.capacity[k] = capacityEmptyWt["capacity"];
          this.empty_bag_wt[k] = capacityEmptyWt["empty_big_wt"];
          this.pur_good_receipt_item_details.at(k).patchValue(data1);
          k = k + 1;
        });
      }

      //console.log("Other details: "+  JSON.stringify(OtherInfoData));
      this.pur_goods_receipt_other_information.patchValue(OtherInfoData);

      this.isChecked4 = true;
      // console.log("BrokerData: "+  JSON.stringify(BrokerData));
      let j = 0;
      this.addBroker();
      this.broker_sl_no = 0;
      while (this.pur_good_receipt_broker.length)
        this.pur_good_receipt_broker.removeAt(0);
      for (let data1 of BrokerData) {
        this.addBroker();
        this.brokerNameList[j] = data1["ven_code_name"];
        this.pur_good_receipt_broker.at(j).patchValue(data1);
        j = j + 1;
      }




      this.pur_good_receipt_broker.patchValue(BrokerData);
      //console.log("brokerData: "+JSON.stringify(BrokerData));


      //  console.log("trans data: "+  JSON.stringify(TransData));
      this.pur_good_reciept_trans_info.patchValue(TransData);

      //console.log("Driver data: "+  JSON.stringify(driverdetails));
      this.pur_good_receipt_driver_dtls.patchValue(driverdetails);

      //console.log("Bp data: "+  JSON.stringify(BpDetails));
      this.pur_good_receipt_Business_Partner_details.patchValue(BpDetails);

      this.add1()
      while (this.pur_good_receipt_resource_cost.length)
        this.pur_good_receipt_resource_cost.removeAt(0);
      for (let data1 of ResourceCostData)
        this.add1();
      this.pur_good_receipt_resource_cost.patchValue(ResourceCostData);
      // console.log("ResourceCostData: "+JSON.stringify(ResourceCostData));

      this.addDocument()
      while (this.pur_good_receipt_docs.length)
        this.pur_good_receipt_docs.removeAt(0);
      for (let data1 of docData)
        this.addDocument();
      this.pur_good_receipt_docs.patchValue(docData);
      // console.log("docData: "+JSON.stringify(docData));

      this.status = true;
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });

    if (localStorage.getItem("svalue") == 'true') {
      localStorage.setItem("svalue", 'false');
    }
  }

  send() {
    this.GrnFor = this.userForm.get("item_type").value as FormControl
    let totalamount: number = 0;
    if (this.GrnFor == undefined) {
      this.userForm.patchValue({ item_type: "true" })
    };
    this.GrnId = this.userForm.get("id").value as FormControl
    this.userForm.patchValue({
      company_id: this.company_name, fin_year: localStorage.getItem("financial_year"),
      username: localStorage.getItem("username")
    });
    this.submitted = true;
    let vechilestatus: boolean = false;
    if (this.userForm.get("referance_type").value == "OPEN GRN") {
      this.popupstatus = true;
      this.userForm.patchValue({ receipt_criteria: 'NA' })

      if (this.userForm.get("vehicle_id").value == "" || this.userForm.get("vehicle_id").value == null) {
        vechilestatus = false;
      }
      else {
        vechilestatus = true;
      }
    }
    else {
    }
    if (!this.userForm.valid) {
      alert('Please fill all fields!')
      return false;
    }
    else {

      if (this.GrnId > 0) {
        this.status = false;
        if (this.userForm.get("b_unit").value == 0) {
          alert("Please select Business Unit Name!");
          this.status = true;
        }
        else if (this.userForm.get("purchase_type").value == 0) {
          alert("Please select Purchase Type!");
          this.status = true;
        }
        else if (this.userForm.get("purchase_subtype").value == 0) {
          alert("Please select Purchase-Sub Type!");
          this.status = true;
        }
        else if (this.userForm.get("supplier_name").value == 0) {
          alert("Please select Supplier Name!");
          this.status = true;
        }
        else if (this.userForm.get("referance_type").value == 0) {
          alert("Please select Referance Type!");
          this.status = true;
        }
        else if (this.userForm.get("sales_process").value == 0 || this.userForm.get("sales_process").value == "0" || this.userForm.get("sales_process").value == "" || this.userForm.get("sales_process").value == null) {
          alert("Please select Sales Process!");
          this.status = true;
        }
        else if (this.salesOrderListShow = true && (this.userForm.get("sales_order").value == 0 || this.userForm.get("sales_order").value == "0" || this.userForm.get("sales_order").value == "" || this.userForm.get("sales_order").value == null)) {
          alert("Please select Sales Order No!");
          this.status = true;
        }
        else if (vechilestatus == true && this.pur_good_receipt_driver_dtls.get("driver_name").value == 0) {
          alert("Please select Driver Name!");  //open grn alert off on 19112022
          this.status = true;
        }
        else {

          let heroFound = false;
          let warehouse = false;
          let stack = false;

          for (let i = 0; i < this.pur_good_receipt_item_details.length; i++) {
            if (this.pur_good_receipt_item_details.at(i).get("hsn_code").value == "0" || this.pur_good_receipt_item_details.at(i).get("hsn_code").value == "" || this.pur_good_receipt_item_details.at(i).get("hsn_code").value == null) {
              heroFound = true;
            }
            if ((this.pur_good_receipt_item_details.at(i).get("warehouse_name").value == "0" || this.pur_good_receipt_item_details.at(i).get("warehouse_name").value == "" || this.pur_good_receipt_item_details.at(i).get("warehouse_name").value == null)) {
              warehouse = true;
            }
            if ((this.pur_good_receipt_item_details.at(i).get("rack").value == "0" || this.pur_good_receipt_item_details.at(i).get("rack").value == "" || this.pur_good_receipt_item_details.at(i).get("rack").value == null)) {
              stack = true;
            }
            totalamount += Number(this.pur_good_receipt_item_details.at(i).get("gross_amt").value);
          }
          if (heroFound == true) {
            alert("Please Enter HSN code in Item master and Make sure to check TAX Code in Statutory Information tab");
            this.status = true;
          }
          else if (this.salesOrderListShow=false && warehouse == true) {
            alert("Please Select Warehouse Name !!!!");
            this.status = true;
          }
          else if (this.salesOrderListShow=false && stack == true) {
            alert("Please Select Stack Name !!!!");
            this.status = true;
          }
          else {


            this.tolerance = [];
            this.capacitynew = []

            forkJoin(
              this.DropDownListService.getItemPackUom(this.pur_good_receipt_item_details.at(0).get("adv_item_code").value, this.pur_good_receipt_item_details.at(0).get("adv_packing").value, this.company_name)
            ).subscribe(([data]) => {

              this.capacitynew[0] = data.capacity;
              this.tolerance[0] = data.tolerance;

              let calculated_itemqty = Number(this.capacitynew[0]) * Number(this.pur_good_receipt_item_details.at(0).get("rcv_pack_qty").value);
              this.calculatedqty = calculated_itemqty;

              let minqty: number = (Number(calculated_itemqty) * ((100 - Number(this.tolerance[0])) / 100));
              let maxqty: number = (Number(calculated_itemqty) * ((100 + Number(this.tolerance[0])) / 100));
              this.minimumvalue = minqty;
              this.maxvalue = maxqty;

              let itemstatus: boolean = true, itemstatusmin: boolean = true;

              itemstatusmin = Number(this.pur_good_receipt_item_details.at(0).get("rcv_item_qty").value) >= minqty;
              itemstatus = Number(this.pur_good_receipt_item_details.at(0).get("rcv_item_qty").value) <= maxqty;

              if (itemstatus == true && itemstatusmin == true) {
                this.tolerancestatus = true;
              }
              else {

                this.tolerancestatus = false;
              }
              //need to change afterwards                  
              if (this.userForm.get("purchase_type").value == "ITMT00004" || this.userForm.get("purchase_type").value == "ITMT00005" || this.userForm.get("purchase_type").value == "ITMT00002" || this.userForm.get("purchase_type").value == "ITMT00007" || this.userForm.get("purchase_type").value == "ITMT00010") {
                this.tolerancestatus = true;
              }
              
              if (this.tolerancestatus == true) {


                if (this.popupstatus == true) {
                  this.status = false;

                  this.DropDownListService.purchasechecktotaltranslimitupdate(totalamount, this.userForm.get("supplier_name").value, localStorage.getItem("financial_year"), this.GrnId).subscribe(limit => {
                    if (limit["status"] == "No") {
                      this.Service.updatePurchaseGoodReceipt(this.userForm.getRawValue(), this.GrnId).subscribe(data => {
                        this.status = true;
                        console.log(this.userForm.value);
                        alert("GRN Updated successfully.");
                        this.userForm.reset();
                        this.ngOnInit();
                        this.isHidden = false;
                        //Refresh Dynemic Table 
                        this.packingItem = [];
                        this.item_sl_no = 0;
                        while (this.pur_good_receipt_item_details.length)
                          this.pur_good_receipt_item_details.removeAt(0);
                        this.addItem();

                        while (this.pur_good_receipt_resource_cost.length)
                          this.pur_good_receipt_resource_cost.removeAt(0);
                        this.add1();

                        this.broker_sl_no = 0;
                        while (this.pur_good_receipt_broker.length)
                          this.pur_good_receipt_broker.removeAt(0);
                        this.addBroker();

                        while (this.pur_good_receipt_docs.length)
                          this.pur_good_receipt_docs.removeAt(0);
                        this.addDocument();
                      }, (error) => {
                        this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
                        this.ngOnInit()
                      });
                    }
                    else {
                      alert("Amount exceeded 50 Lakh !!!!!!!!!");
                      this.status;
                    }

                  });


                }
                else {
                  alert("Please Select Respective Item details from Show Button !!!!!!!!!");
                  this.status = true
                }


              }
              else {

                alert("Recieving Weight  exceeds/lower Tolerance !!!!!! Range Upto " + this.minimumvalue.toFixed(3) + " to " + this.maxvalue.toFixed(3) + " Actual weight = " + this.calculatedqty);

                this.status = true;
              }



            });



          }


        }
      }

      else {
        // alert("check here  :: " + vechilestatus +" // "+ this.pur_good_receipt_driver_dtls.get("driver_name").value)
        // alert(" check " + this.userForm.get("referance_type").value+" vechile " +vechilestatus +" // " + this.pur_good_receipt_driver_dtls.get("driver_name").value == "")
        this.status = false;
        let totalamount: number = 0;
        if (this.userForm.get("b_unit").value == 0) {
          alert("Please select Business Unit Name!");
          this.status = true;
        }

        else if (this.userForm.get("purchase_type").value == 0) {
          alert("Please select Purchase Type!");
          this.status = true;
        }
        else if (this.userForm.get("purchase_subtype").value == 0) {
          alert("Please select Purchase-Sub Type!");
          this.status = true;
        }
        else if (this.userForm.get("supplier_name").value == 0) {
          alert("Please select Supplier Name!");
          this.status = true;
        }
        else if (this.userForm.get("referance_type").value == 0) {
          alert("Please select Referance Type!");
          this.status = true;
        }
        else if (this.userForm.get("sales_process").value == 0 || this.userForm.get("sales_process").value == "0" || this.userForm.get("sales_process").value == "" || this.userForm.get("sales_process").value == null) {
          alert("Please select Sales Process!");
          this.status = true;
        }
        else if (this.salesOrderListShow = true && (this.userForm.get("sales_order").value == 0 || this.userForm.get("sales_order").value == "0" || this.userForm.get("sales_order").value == "" || this.userForm.get("sales_order").value == null)) {
          alert("Please select Sales Order No!");
          this.status = true;
        }
        else if (vechilestatus == true && this.pur_good_receipt_driver_dtls.get("driver_name").value == 0) {
          alert("Please select Driver Name!");//open grn alert off on 19112022
          this.status = true;
        }
        else {

          let heroFound = false;
          let warehouse = false;
          let stack = false;

          for (let i = 0; i < this.pur_good_receipt_item_details.length; i++) {
            if (this.pur_good_receipt_item_details.at(i).get("hsn_code").value == "0" || this.pur_good_receipt_item_details.at(i).get("hsn_code").value == "" || this.pur_good_receipt_item_details.at(i).get("hsn_code").value == null) {
              heroFound = true;
            }
            if (this.pur_good_receipt_item_details.at(i).get("warehouse_name").value == "0" || this.pur_good_receipt_item_details.at(i).get("warehouse_name").value == "" || this.pur_good_receipt_item_details.at(i).get("warehouse_name").value == null) {
              warehouse = true;
            }
            if (this.pur_good_receipt_item_details.at(i).get("rack").value == "0" || this.pur_good_receipt_item_details.at(i).get("rack").value == "" || this.pur_good_receipt_item_details.at(i).get("rack").value == null) {
              stack = true;
            }
            totalamount += Number(this.pur_good_receipt_item_details.at(i).get("gross_amt").value);
          }
          if (heroFound == true) {
            alert("Please Enter HSN code in Item master and Make sure to check TAX Code in Statutory Information tab");
            this.status = true;
          }
          else if (this.salesOrderListShow=false && warehouse == true) {
            alert("Please Select Warehouse Name !!!!");
            this.status = true;
          }
          else if (this.salesOrderListShow=false && stack == true) {
            alert("Please Select Stack Name !!!!");
            this.status = true;
          }
          else {

            this.tolerance = [];
            this.capacitynew = []


            //console.log(" here packing id :: " +  this.pur_good_receipt_item_details.at(0).get("adv_item_code").value + " / " +  this.pur_good_receipt_item_details.at(0).get("adv_packing").value + " / " + this.company_name );
            forkJoin(
              this.DropDownListService.getItemPackUom(this.pur_good_receipt_item_details.at(0).get("adv_item_code").value, this.pur_good_receipt_item_details.at(0).get("adv_packing").value, this.company_name)
            ).subscribe(([data]) => {
              // console.log(JSON.stringify(data))
              this.capacitynew[0] = data.capacity;
              this.tolerance[0] = data.tolerance;

              let calculated_itemqty = Number(this.capacitynew[0]) * Number(this.pur_good_receipt_item_details.at(0).get("rcv_pack_qty").value);
              this.calculatedqty = calculated_itemqty;
              //125 
              //117 
              let minqty: number = (Number(calculated_itemqty) * ((100 - Number(this.tolerance[0])) / 100));
              let maxqty: number = (Number(calculated_itemqty) * ((100 + Number(this.tolerance[0])) / 100));
              this.minimumvalue = minqty;
              this.maxvalue = maxqty;
              //calculated_itemqty
              //console.log(" calculation s "+ minqty +" / "+ maxqty +" / " + this.pur_good_receipt_item_details.at(0).get("rcv_item_qty").value + " / " + this.pur_good_receipt_item_details.at(0).get("rcv_pack_qty").value +" / " + this.capacitynew[0] + " / " + this.tolerance[0] + " / " + calculated_itemqty);
              let itemstatus: boolean = true, itemstatusmin: boolean = true;
              //this.pur_good_receipt_item_details.at(0).get("rcv_item_qty").value
              itemstatusmin = Number(this.pur_good_receipt_item_details.at(0).get("rcv_item_qty").value) >= minqty;
              itemstatus = Number(this.pur_good_receipt_item_details.at(0).get("rcv_item_qty").value) <= maxqty;
              //console.log("itemstatusmin "+ itemstatusmin +" / " + itemstatusmin);
              if (itemstatus == true && itemstatusmin == true) {
                this.tolerancestatus = true;
                // console.log("true");
              }
              else {
                // console.log("false")
                this.tolerancestatus = false;
              }
              //need to change afterwards                  
              //this.tolerancestatus = true;
              //console.log("this.tolerancestatus "+ this.tolerancestatus)


              if (this.userForm.get("purchase_type").value == "ITMT00004" || this.userForm.get("purchase_type").value == "ITMT00005" || this.userForm.get("purchase_type").value == "ITMT00002" || this.userForm.get("purchase_type").value == "ITMT00007" || this.userForm.get("purchase_type").value == "ITMT00010") {
                this.tolerancestatus = true;
              }
              if (this.tolerancestatus == true) {


                if (this.popupstatus == true) {
                  this.status = false;



                  // totalamount
                  /*  this.DropDownListService.purchasechecktotaltranslimit(totalamount,this.userForm.get("supplier_name").value,localStorage.getItem("financial_year")).subscribe(limit=>
                    {
                       if(limit["status"] =="No")
                       { */
                  this.Service.createPurchaseGoodReceipt(this.userForm.getRawValue()).subscribe(data => {
                    this.status = true;
                    console.log(this.userForm.value);
                    alert("New GRN created successfully.");
                    this.userForm.reset();
                    this.ngOnInit();
                    this.isHidden = false;
                    this.showList("list");
                    //Refresh Dynemic Table 

                  }, (error) => {
                    this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");

                  });
                  /* }
                  else
                  {

                   alert("Amount exceeded 50 Lakh !!!!!!!!!");
                   this.status;
                  }
               })*/




                }
                else {
                  alert("Please Select Respective Item details from Show Button !!!!!!!!!");
                  this.status = true
                }




              }
              else {

                alert("Recieving Weight  exceeds/lower Tolerance !!!!!! Range Upto " + this.minimumvalue.toFixed(3) + " to " + this.maxvalue.toFixed(3) + " Actual weight = " + this.calculatedqty);

                this.status = true;
              }



            });






          }

        }
      }

    }
  }


  checktolerance(company) {
    this.tolerance = [];
    this.capacitynew = []
    let tolerancestatus: boolean = false;
    console.log(" here packing id :: " + this.pur_good_receipt_item_details.at(0).get("adv_item_code").value + " / " + this.pur_good_receipt_item_details.at(0).get("adv_packing").value + " / " + company);
    forkJoin(
      this.DropDownListService.getItemPackUom(this.pur_good_receipt_item_details.at(0).get("adv_item_code").value, this.pur_good_receipt_item_details.at(0).get("adv_packing").value, company)
    ).subscribe(([data]) => {
      console.log(JSON.stringify(data))
      this.capacitynew[0] = data.capacity;
      this.tolerance[0] = data.tolerance;
      this.status = true;
    });



    let calculated_itemqty = Number(this.capacitynew[0]) * Number(this.pur_good_receipt_item_details.at(0).get("rcv_pack_qty").value);


    let minqty: number = (Number(this.pur_good_receipt_item_details.at(0).get("rcv_item_qty").value) * ((100 - Number(this.tolerance[0])) / 100));
    let maxqty: number = (Number(this.pur_good_receipt_item_details.at(0).get("rcv_item_qty").value) * ((100 + Number(this.tolerance[0])) / 100));


    console.log(" calculation s " + minqty + " / " + maxqty + " / " + this.pur_good_receipt_item_details.at(0).get("rcv_item_qty").value + " / " + this.pur_good_receipt_item_details.at(0).get("rcv_pack_qty").value + " / " + this.capacitynew[0] + " / " + this.tolerance[0]);
    let itemstatus: boolean = true, itemstatusmin: boolean = true;

    itemstatusmin = Number(calculated_itemqty) >= minqty;
    itemstatus = Number(calculated_itemqty) <= maxqty;

    if (itemstatus == true && itemstatusmin == true) {
      tolerancestatus = true;
    }
    else {
      tolerancestatus = false;
    }

    return tolerancestatus;
  }


  onclickprint(id, grn_id) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: 0, };
    let dialogref;
    let comp = this.company_name;

    dialogref = this.dialog.open(GrnBillPrintComponent, { data: { id: id, grn_id: grn_id, company_name: comp } });
    dialogref.afterClosed().subscribe(data => {




    });

  }

  onDelete(id: any, grn_id) {
    this.status = false;
    if (confirm("Are you sure to delete this GRN ?")) {
      this.userForm.patchValue({ username: localStorage.getItem("username") });
      this.DropDownListService.checkGRNUsage(grn_id).subscribe(checkGRN => {
        ///let dataq=JSON.parse(checkItem);
        //alert("bidhan here::"+checkGRN.status);
        if (checkGRN.status == 'No') {
          this.Service.deleteGRN(this.userForm.getRawValue(), id).subscribe(data => {
            alert("GRN Deleted successfully.");
            this.userForm.reset();
            this.status = true;
            this.isHidden = false;
            this.ngOnInit();
            this.showList("list");
          });
        }
        else {
          alert("This GRN is Already Used,Can not be Deleted!! ");
        }
      });
    }
    this.status = true;
  }
  getProducts(request) {
    // console.log("tuhin req "+request.size);
    this.DropDownListService.getPurGRNPagination(request.page, request.size)
      .subscribe(data => {
        this.listPurchaseGRN = data['content'];
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
    let pur_type1 = this.userForm1.get("pur_type1").value;
    let finyear = localStorage.getItem("financial_year");

    this.status = false;
    this.DropDownListService.searchGRNFast("orderno=" + order1_no + "&fromdate=" + fromdate + "&todate=" + todate + "&supplier_name1=" + supplier_name1 + "&pur_type1=" + pur_type1 + "&finyear=" + finyear).subscribe(data => {
      console.log("here data comses " + JSON.stringify(data))
      this.listPurchaseGRN = data;
      this.status = true;

    }, (error) => {
      this.status = true;
      alert("Purchase GRN Not Found !!!")
      this.listPurchaseGRN = [];
    })
  }

  getPassPackingQty(packing_qty, index) {
    this.pssdPackQty = packing_qty.target.value;
    //console.log(" hello "+ passed)
    this.pssdItemQty = this.capacity[index] * this.pssdPackQty;
    this.pur_good_receipt_item_details.at(index).patchValue({ pssd_item_qty: this.pssdItemQty })
    //let _passedmat:any;
    if (this.empty_bag_wt_priceBasedOn[index] == 'UOM') {
      this.pssdMatWt = this.pssdItemQty - (this.empty_bag_wt[index] * this.pssdPackQty);
      this.pur_good_receipt_item_details.at(index).patchValue({ pssd_mat_wt: Number(this.pssdMatWt).toFixed(3) })
    }
    else {
      this.pssdMatWt = this.pssdItemQty - (this.pssdItemQty * this.empty_bag_wt[index]) / 100;
      this.pur_good_receipt_item_details.at(index).patchValue({ pssd_mat_wt: Number(this.pssdMatWt).toFixed(3) })
    }
    this.rcvPackQty = this.pur_good_receipt_item_details.at(index).get("rcv_pack_qty").value as FormControl;
    this.rcvItemQty = this.pur_good_receipt_item_details.at(index).get("rcv_item_qty").value as FormControl;
    this.rcvMatWt = this.pur_good_receipt_item_details.at(index).get("rcv_mat_wt").value as FormControl;
    this.pssdPackQty = this.pur_good_receipt_item_details.at(index).get("pssd_pack_qty").value as FormControl;
    this.pssdItemQty = this.pur_good_receipt_item_details.at(index).get("pssd_item_qty").value as FormControl;
    this.pssdMatWt = this.pur_good_receipt_item_details.at(index).get("pssd_mat_wt").value as FormControl;
    this.price = this.pur_good_receipt_item_details.at(index).get("unit_rate").value as FormControl;
    this.based_on = this.pur_good_receipt_item_details.at(index).get("price_based_on").value as FormControl;
    this.discount = this.pur_good_receipt_item_details.at(index).get("discount").value as FormControl;
    this.discountBasedOn = this.pur_good_receipt_item_details.at(index).get("discount_based_on").value as FormControl;
    this.taxRate = this.pur_good_receipt_item_details.at(index).get("tax_rate").value as FormControl;
    this.qcDeduction = this.pur_good_receipt_item_details.at(index).get("qc_deduction").value as FormControl;

    this.calculateItemData(this.advPackQty, this.advItemQty, this.advMatWt, this.rcvPackQty, this.rcvItemQty, this.rcvMatWt, this.pssdPackQty,
      this.pssdItemQty, this.pssdMatWt, this.price, this.based_on, this.discount, this.discountBasedOn, this.taxRate, this.qcDeduction, index)
  }

  onChangeVechileNo(vechile_id) {
    if (vechile_id.length) {

      if (this.userForm.get("id").value > 0) {
        this.DropDownListService.getDriverByVehicle(vechile_id).subscribe(data => {
          console.log("Driver list " + JSON.stringify(data));
          this.driver_names = data;
          if (this.userForm.get("id").value > 0) {
            // console.log("tuhin here  :: " + this.userForm.get("vehicle_id").value)
          }
          else {
            this.pur_good_receipt_driver_dtls.patchValue({ driver_name: "0" });
          }

          this.status = true;
        });

      }
      else {
        this.DropDownListService.getDriverByVehicle(vechile_id).subscribe(data => {
          console.log("Driver list " + JSON.stringify(data));
          this.driver_names = data;
          if (this.userForm.get("id").value > 0) {

          }
          else {
            this.pur_good_receipt_driver_dtls.patchValue({ driver_name: "0" });
          }

          this.status = true;
        });

      }

    }
  }

  createNewDriver() {

    let VehicleId = this.userForm.get("vehicle_id").value;

    // console.log("VehicleId get :: "+VehicleId);

    if (VehicleId == null || VehicleId == '0' || VehicleId == '') {
      alert("Select Vehicle No First!");
    }
    else {
      console.log(VehicleId.length);
      if (VehicleId.length) {


        let dialogref = this.dialog.open(PurchasegrndriverComponent, { data: { vehicle_id: VehicleId } });
        dialogref.afterClosed().subscribe(result => {
          // console.log(" formdata "+JSON.stringify(result));
          if (result == '' || result == null) {
            this.status = true;

          }
          else {

            this.status = false;
            this.Service.createDriverpopup(result).subscribe(data => {
              console.log("Driver Details: " + JSON.stringify(result));
              alert("New Driver master created successfully.");
              this.status = true;
              this.DropDownListService.getDriverByVehicle(VehicleId).subscribe(data => {
                this.driver_names = data;
                this.status = true;

              }, (error) => { this.status = true; console.log("ERROR get: " + JSON.stringify(error)); }
              )
            });
          }
        });
      }
      else {
        this.status = true;
      }
    }

  }

  onChangeDriverName(driver_id: String) {
    this.pur_good_receipt_driver_dtls.patchValue({
      phone: null, address: null,
      identity: null, doc_type: null, doc_no: null
    });
    if (driver_id != '0') {
      this.status = false;
      this.DropDownListService.DriverDetails(driver_id).subscribe(data => {

        console.log(" driver data :: " + JSON.stringify(data));
        this.pur_good_receipt_driver_dtls.patchValue({
          phone: data["phone_no"], address: data["address"],
          identity: data["identity"], doc_type: data["doc_type"], doc_no: data["doc_no"], doc_img: data["doc_img"]
        });
        //console.log(" driver data  12 ::"+ this.wm_unload_advice_driver_dtls.controls.doc_img.value)
        /*console.log(" this.wm_unload_advice_driver_dtls.controls.doc_img.value  "+this.pur_good_receipt_driver_dtls.controls.doc_img.value);
        
                    if(this.pur_good_receipt_driver_dtls.controls.doc_img.value == null || this.pur_good_receipt_driver_dtls.controls.doc_img.value =="")
                     {
          
                     }
                     else
                     {
                     // this.getdriverImage(this.wm_unload_advice_driver_dtls.controls.doc_img.value);
                     }
                   
        */

        this.status = true;
      });



    }
  }
  addNewVechile() {
    let TransporterCode = "";

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: 0, TransporterCode: TransporterCode };
    const dialogRef = this.dialog.open(AddNewVechilePopUpComponentGrnComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result != '') {
        this.status = false;

        this.Service.createVehiclepopup(result).subscribe(data => {

          alert("New Vehicle Created Successfully.");



          this.DropDownListService.getVehiclenoall().subscribe(vehicleData1 => {

            this.vehicleList = vehicleData1;
            this.status = true;
          })


        });
      }

      this.pur_good_receipt_driver_dtls.patchValue({ driver_name: "0" })
      this.status = true;
    });
  }

  salesProcess:any;
  salesOrderListShow : boolean = false;
  soNoList:any=[];

  onChangeSalesProcess(event) {
    console.log("Event Sales::",event.value);
    this.salesProcess = event.value;
    if(this.salesProcess.length){
      if(this.salesProcess=='Stock'){
        this.salesOrderListShow = false;
        console.log("sales Order List:: ",this.salesOrderListShow);
        this.userForm.patchValue({sales_order:"NA"});
      }
      else{
        this.salesOrderListShow = true;
        forkJoin(
          this.DropDownListService.getSalesOrderList(this.salesProcess,localStorage.getItem("financial_year")),
        ).subscribe(([soList]) => {
          console.log("SO List::" + JSON.stringify(soList));
          console.log("sales Order List:: ",this.salesOrderListShow);
          this.soNoList = soList;
        });
      }
    }
  } 

  onClickDeliveryChallan(id, grn_id,sale_order_id,sales_process) 
  {
    //console.log("/id/ ",id,"/grn_id/ ",grn_id,"/sale_order_id/ ",sale_order_id,"/sales_process/ ",sales_process);
    if(sales_process=='Sale' || sales_process=='Job Work')
      {
        window.open("#/pages/invTrans/salestransaction/DeliveryChallan");
        localStorage.setItem("svalue",'Yes');
        localStorage.setItem("sid",grn_id);
        localStorage.setItem("sno",sale_order_id);
      }
  }

  /*ngOnDestroy(): void {
    if(this.salesProcessValChangeSub)
      this.salesProcessValChangeSub.unsubscribe();
  }*/
}
