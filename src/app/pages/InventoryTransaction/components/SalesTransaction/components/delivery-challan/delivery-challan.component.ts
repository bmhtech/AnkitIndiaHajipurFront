import { Component, OnInit, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { Master } from '../../../../../../service/master.service';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { DeliveryChallan } from '../../../../../../Models/SalesTransaction/DeliveryChallan';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SalesQuoTaxModalComponent } from '../sales-quo-tax-modal/sales-quo-tax-modal.component';
import { DelChallanSOrderPopUpComponent } from '../../components/del-challan-sorder-pop-up/del-challan-sorder-pop-up.component';
import { DelChallanLoadingAdvPopUpComponent } from '../../components/del-challan-loading-adv-pop-up/del-challan-loading-adv-pop-up.component';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';
//import { PurchagepopupmodelComponent } from '../../../Purchase/components/purchagepopupmodel/purchagepopupmodel.component';
import { SalesQcPopupComponent } from '../sales-qc-popup/sales-qc-popup.component';
import { forkJoin } from 'rxjs';
import { DeliveryChallanPrintPopupComponent } from '../delivery-challan-print-popup/delivery-challan-print-popup.component';
import { PageEvent } from '@angular/material';
import { DeliveryChallanJobworkPopupComponent } from '../delivery-challan-jobwork-popup/delivery-challan-jobwork-popup.component';
import { DelChallanDistancePopUpComponent } from '../del-challan-distance-pop-up/del-challan-distance-pop-up.component';
import { DelChallanSalesOrdByGrnPopupComponent } from '../del-challan-sales-ord-by-grn-popup/del-challan-sales-ord-by-grn-popup.component';
import { DchallanWeighmentFromGrnPrintComponent } from '../dchallan-weighment-from-grn-print/dchallan-weighment-from-grn-print.component';
import { DelChallanSalesOrdByGrnJobworkPopupComponent } from '../del-challan-sales-ord-by-grn-jobwork-popup/del-challan-sales-ord-by-grn-jobwork-popup.component';
import { UpdateGatepassComponent } from '../update-gatepass/update-gatepass.component';

@Component({
  selector: 'app-delivery-challan',
  templateUrl: './delivery-challan.component.html',
  styleUrls: ['./delivery-challan.component.scss']
})

export class DeliveryChallanComponent implements OnInit {
  @ViewChild(SelectAutocompleteComponent) multiSelect: SelectAutocompleteComponent;
  brokerReq = false;
  isHidden: any;
  submitted = false;
  public userForm: FormGroup;
  model: DeliveryChallan = new DeliveryChallan();
  item_codes: any = [];
  brokerNames: any = [];
  businesslists: any = [];
  partyList: any = [];
  status: any;
  packingItem: any = [];
  PartyAllList: any = [];
  customUOMs: any = [];
  Id: any;
  bussiness_unit_list: any = [];
  reasonIdList: any = [];
  contNameList: any = [];
  employeeNames: any = [];
  company_name: any;
  trans_codes: any = [];
  item_sl_no = 1;
  broker_sl_no = 1;
  party_sl_no = 1;
  jobwork_sl_no = 1;
  listDeliveryChallan: DeliveryChallan[];
  partyNameList: any = [];
  currentDate: any;
  challanNo: any;
  Confirmed_By = "0";
  Reason = "0";
  grandTotal: any;
  veh_nos: any = [];
  capacity: any = [];
  empty_bag_wt: any = [];
  selectedItemName: any = [];
  selectedPackingItem: any = [];
  selectedPartyName: any = [];
  selectedContName: any = [];
  customerDelvAddList: any = [];
  invoiceType: any = [];
  modeOfTransport: any = [];
  Business_Unit = "0";
  financialYear: any;
  action: any;
  deliverychallansave: boolean = true;
  deliverychallanupdate: boolean = true;
  deliverychallanview: boolean = true;
  deliverychallanprint: boolean = true;
  deliverychallandelete: boolean = true;
  delvChallanPopupStatus: boolean = false;
  totalElements: number = 0;
  public userForm1: FormGroup;
  transRate: any = [];
  tax_list: any = [];
  actualcgstrate: number = 0;
  actualsgstrate: number = 0;
  state: any;
  statestatus: number = 0;
  cgstvalue: any;
  sgstvalue: any;
  igstvalue: any;
  areaList: any = [];
  ChargeList: any = [];
  chgs_sl_no = 1;
  ledgerNames: any = [];
  selectedTransacc = [];
  selectedTdsacc = [];
  selectedChgCode = [];
  listCharges: any = [];
  uoms: any = [];
  myFiles: any = [];
  Transportchargeschange: boolean = true;
  Transportrate: any;
  jobitemlist: any = [];
  jobpackinglist: any = [];
  selectedJobItem: any = [];
  selectedJobPacking: any = [];
  Jobworkshow: boolean = false;
  gatepassShow:boolean=false;
  //transChgsDyn:boolean=false;

  user_roles: any;
  usernamelock: boolean = false;
  DisableTransportChgs: boolean = false;
  sale_order_id: any;
  grn_id: any;

  constructor(public fb: FormBuilder, public dialog: MatDialog,
    private Service: Master, private DropDownListService: DropdownServiceService) {
    this.userForm = fb.group(
      {
        id: [''],
        delivery_cid: [''],
        challan_no: [''],
        business_unit: [''],
        challan_date: [''],
        bro_info_req: [''],
        price_term: [''],
        cust_ref_doc_no: [''],
        date2: [''],
        remark: [''],
        confirmed_by: [''],
        approval: [''],
        reason: [''],
        ref_type: [''],
        party: [''],
        grand_total: [''],
        company_id: [''],
        fin_year: [''],
        referance_id: [''],
        inv_type: [''],
        username: [''],
        jobwork: [''],
        gatepass:[''],


        delivery_challan_Item_Dtls: this.fb.array([this.fb.group({
          slno: this.item_sl_no,
          item_code: '',
          packing: '',
          hsn_code: '',
          quantity: '',
          uom: '',
          squantity: '',
          suom: '',
          mat_wt: '',
          price: '',
          price_based_on: '',
          amount: '',
          discount_type: '',
          discount_rate: '',
          discount_amt: '',
          tax_code: '',
          tax_rate: '',
          cgstamt: '',
          sgstamt: '',
          igstamt: '',
          tax_amt: '',
          total_amt: '',
          acc_norms: '',
        })]),

        delivery_challan_Broker_Dtls: this.fb.array([this.fb.group({
          slno: this.broker_sl_no,
          broker_code: '',
          basis: '',
          rate: ''
        })]),

        delivery_challan_Party_Dtls: this.fb.array([this.fb.group({
          sl_no: this.party_sl_no,
          p_code: '',
          cp_name: '',
          cp_contact: ''
        })]),

        delivery_challan_Docs: this.fb.array([this.fb.group({
          doc_name: '',
          doc_pdf: '',
          doc_file_name: ''
        })]),

        delivery_challan_docs_list: this.fb.array([this.fb.group({
        doc_name: '',
        doc_pdf: '',
        doc_file_name: ''
        })]),

        delivery_challan_Shipment_Dtls: this.fb.group({
          ship_addr: '',
          ship_details: '',
          pay_addr: '',
          pay_details: ''
        }),

        delivery_challan_Trans_Info: this.fb.group({
          trans_borne_by: '',
          mode_of_trans: '',
          transporter_name: '',
          vehle_no: '',
          freight_amt: '',
          adv_paid: '',
          charge_code: '',
          trans_code: '',
          transport_rate: '',
          transportchargesadd: ''
        }),

        delivery_challan_Chgs_dyn: this.fb.array([this.fb.group({
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

        delivery_challan_weight_dtl: this.fb.group({
          own_uom: '',
          own_gross: '',
          own_tare: '',
          own_net: '',
          own_permit_no: '',
          own_date: '',
          own_slip_no: '',
          party_uom: '',
          party_gross: '',
          party_tare: '',
          party_net: '',
          party_date: '',
          party_slip_no: ''
        }),

        delivery_challan_Item_Dtls_for_jobwork: this.fb.array([this.fb.group({
          sl_no: this.jobwork_sl_no,
          job_item: '',
          job_item_name: '',
          job_packing: '',
          job_packing_name: '',
          job_hsn: '',
          pack_qty: '',
          pack_uom: '',
          price_based_on: '',
          item_qty: '',
          item_uom: '',
          mat_wt: '',
          tolerance: ''
        })]),
      });
    this.userForm1 = fb.group(
      {
        order1_no: [''],
        fromdate: [''],
        todate: [''],
        party1: ['']
      });
  }

  get order1_no() { return this.userForm1.get("order1_no") as FormControl };
  get fromdate() { return this.userForm1.get("fromdate") as FormControl };
  get todate() { return this.userForm1.get("todate") as FormControl };
  get party1() { return this.userForm1.get("party1") as FormControl };

  get id() { return this.userForm.get("id") as FormControl };
  get delivery_cid() { return this.userForm.get("delivery_cid") as FormControl };
  get grand_total() { return this.userForm.get("grand_total") as FormControl };
  get business_unit() { return this.userForm.get("business_unit") as FormControl };
  get challan_no() { return this.userForm.get("challan_no") as FormControl };
  get challan_date() { return this.userForm.get("challan_date") as FormControl };
  get bro_info_req() { return this.userForm.get("bro_info_req") as FormControl };
  get price_term() { return this.userForm.get("price_term") as FormControl };
  get cust_ref_doc_no() { return this.userForm.get("cust_ref_doc_no") as FormControl };
  get date2() { return this.userForm.get("date2") as FormControl };
  get remark() { return this.userForm.get("remark") as FormControl };
  get confirmed_by() { return this.userForm.get("confirmed_by") as FormControl };
  get approval() { return this.userForm.get("approval") as FormControl };
  get reason() { return this.userForm.get("reason") as FormControl };
  get ref_type() { return this.userForm.get("ref_type") as FormControl };
  get party() { return this.userForm.get("party") as FormControl; }
  get inv_type() { return this.userForm.get("inv_type") as FormControl; }
  get jobwork() { return this.userForm.get("jobwork") as FormControl; }
  get gatepass() { return this.userForm.get("gatepass") as FormControl; }



  get delivery_challan_Chgs_dyn() { return this.userForm.get("delivery_challan_Chgs_dyn") as FormArray };

  get delivery_challan_Item_Dtls() { return this.userForm.get("delivery_challan_Item_Dtls") as FormArray };
  get delivery_challan_Item_Dtls_for_jobwork() { return this.userForm.get("delivery_challan_Item_Dtls_for_jobwork") as FormArray };
  get delivery_challan_Broker_Dtls() { return this.userForm.get("delivery_challan_Broker_Dtls") as FormArray };
  get delivery_challan_Party_Dtls() { return this.userForm.get("delivery_challan_Party_Dtls") as FormArray };
  get delivery_challan_Shipment_Dtls() { return this.userForm.get("delivery_challan_Shipment_Dtls") as FormGroup };
  get delivery_challan_Trans_Info() { return this.userForm.get("delivery_challan_Trans_Info") as FormGroup };
  get delivery_challan_weight_dtl() { return this.userForm.get("delivery_challan_weight_dtl") as FormGroup };

  get delivery_challan_Docs() { return this.userForm.get("delivery_challan_Docs") as FormArray };
  get delivery_challan_docs_list() { return this.userForm.get('delivery_challan_docs_list') as FormArray; }

  ngOnInit() {
    this.user_roles = localStorage.getItem("user_role");

    if (this.user_roles == 'RL00025') {
      this.usernamelock = true;
    }
    else {
      this.usernamelock = false;
    }
    //For User Role
    let accessdata = JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
    this.deliverychallansave = false;
    this.deliverychallanupdate = false;
    this.deliverychallanview = false;
    this.deliverychallanprint = false;
    this.deliverychallandelete = false;

    if (accessdata.includes('delivery_challan.save')) {
      this.deliverychallansave = true;
    }
    if (accessdata.includes('delivery_challan.update')) {
      this.deliverychallanupdate = true;
    }
    if (accessdata.includes('delivery_challan.view')) {
      this.deliverychallanview = true;
    }
    if (accessdata.includes('delivery_challan.print')) {
      this.deliverychallanprint = true;
    }
    if (accessdata.includes('delivery_challan.delete')) {
      this.deliverychallandelete = true;
    }


    this.status = false;
    this.isHidden = false;
    this.grandTotal = 0;
    this.Business_Unit = "0";
    this.Confirmed_By = "0";
    this.Reason = "0";
    this.Jobworkshow = false;
    this.gatepassShow=false;
    this.delivery_challan_weight_dtl.patchValue({ own_uom: "0", party_uom: "0" });
    for (let i = 0; i < this.delivery_challan_Party_Dtls.length; i++) {
      this.delivery_challan_Party_Dtls.at(i).patchValue({ p_code: "0" });
    }
    this.delivery_challan_Shipment_Dtls.patchValue({ pay_addr: "0" });
    this.delivery_challan_Trans_Info.patchValue({ trans_code: "0", vehle_no: "0" })
    this.packingItem = [];
    this.capacity = [];
    this.empty_bag_wt = [];
    this.selectedItemName = [];
    this.selectedPackingItem = [];
    this.selectedPartyName = [];
    this.selectedContName = [];
    this.action = 'update';
    this.transRate = ["PER TRUCK", "PER UOM"];

    //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');

    console.log(localStorage.getItem("user_role"))
    if ((this.currentDate >= formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en')) && (this.currentDate <= formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en'))) {
      console.log("sucess");
    }
    else {
      alert("Current date is not in Selected Financial period!!!!!!")
      this.currentDate = formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
    }

    this.Transportchargeschange = true;
    //this.DisableTransportChgs=false;
    this.userForm.patchValue({ id: 0, referance_id: 0, confirmed_by: "0", reason: "0" });
    this.company_name = localStorage.getItem("company_name");
    this.financialYear = localStorage.getItem("financial_year");
    this.modeOfTransport = ["By Air", "By Rail", "By Road", "By Ship", "By Train", "By Vehicle", "By Water", "By Other"];
    // this.getProducts({ page: "0", size: "10" });
    forkJoin(
      this.DropDownListService.getInvSalesTypes(),
      //this.DropDownListService.customerNameCodeList(this.company_name),
      this.DropDownListService.newcustomerList(this.company_name),
      this.DropDownListService.getVehicleThruWeighment(),
      this.DropDownListService.reasonList(),
      //  this.Service.getDeliveryChallans(),
      //this.DropDownListService.getCompanyBUMNCList(this.company_name),
      this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
      // this.DropDownListService.itemNamesList(),
      // this.DropDownListService.brokerNameList(),
      this.DropDownListService.brokerNameListFast(),
      this.DropDownListService.transporterNamesList(),
      this.DropDownListService.employeeNamesList(this.company_name),
      this.DropDownListService.getWeighmentCustomUOM(),
      // this.DropDownListService.customerNameCodeList(this.company_name),
      // ).subscribe(([invoiceData, customerData, vehicleData, reasonData, DCData,
      //this.DropDownListService.getDeliveryChallanDataList(this.currentDate,this.financialYear)
      this.DropDownListService.getDeliveryChallanFastList(this.currentDate, this.financialYear),
      this.DropDownListService.taxList(),
      this.DropDownListService.areaList(),
      this.DropDownListService.ledgerNameListNew(),
      this.DropDownListService.getCharges(),
      this.DropDownListService.getItemThruSalesThruBUFastApi("CBU00001", this.company_name)
    ).subscribe(([invoiceData, customerData, vehicleData, reasonData,
      //  BUMNCData, brokerData, transData, empData, customData,PartyallData])=>
      BUMNCData, brokerData, transData, empData, customData, deliveryChallanData, tax, area, ledgerData, chargematrix, itemNameData]) => {
      console.log("HALLO CHECK : : " + JSON.stringify(deliveryChallanData))
      this.status = true;
      this.listCharges = chargematrix;
      this.tax_list = tax;
      this.invoiceType = invoiceData;
      this.partyNameList = customerData,
        this.partyList = customerData;
      this.veh_nos = vehicleData;
      this.reasonIdList = reasonData;
      this.listDeliveryChallan = deliveryChallanData;
      this.bussiness_unit_list = BUMNCData;
      this.businesslists = BUMNCData;
      this.areaList = area;
      //this.item_codes = itemNameData;
      this.brokerNames = brokerData;
      this.trans_codes = transData;
      this.employeeNames = empData;
      this.ledgerNames = ledgerData;
      this.customUOMs = customData;
      this.uoms = customData;
      this.PartyAllList = customerData;
      this.userForm.patchValue({ inv_type: "0", party: "0", });
      this.delivery_challan_Item_Dtls.at(0).patchValue({
        item_code: "0", packing: "0", squantity: 0, quantity: 0, price_based_on: "0",
        amount: 0, discount_type: "0", discount_amt: 0, net_amount: 0, taxable_amount: 0, tax_amount: 0, total_amt: 0
      });
      this.capacity[0] = 1;
      this.empty_bag_wt[0] = 0;

      this.delivery_challan_weight_dtl.patchValue({ own_uom: "0", party_uom: "0" });

      // this.PartyAllList = PartyallData;
      this.PartyAllList = customerData;
      this.status = true;

      if (localStorage.getItem("svalue") == 'true') {
        //alert(localStorage.getItem("sid")+"//"+localStorage.getItem("sno")+"//"+localStorage.getItem("saction"));
        this.onUpdate(localStorage.getItem("sid"), localStorage.getItem("sno"), localStorage.getItem("saction"));

        localStorage.removeItem("sid");
        localStorage.removeItem("sno");
        localStorage.removeItem("saction");
        localStorage.removeItem("svalue");
      }
      if (localStorage.getItem("svalue") == 'Yes') {  // For Delivery Challan with GRN & Sale Order id
        //alert(localStorage.getItem("sid")+"//"+localStorage.getItem("sno"));
        this.grn_id=localStorage.getItem("sid");
        this.sale_order_id=localStorage.getItem("sno");

        localStorage.removeItem("sid");
        localStorage.removeItem("sno");
        localStorage.removeItem("svalue");
        //this.ngOnInit();
        this.showList("add");
      }
      console.log("/grn_id/ ",this.grn_id,"/sale_order_id/ ",this.sale_order_id);
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });

  }

  showList(s: string) {
    if (this.deliverychallansave == true && this.deliverychallanupdate == true)//true exist  false not exist 
    {
      if (s == "add") {
        this.Business_Unit = "0";
        this.Confirmed_By = "0";
        this.Reason = "0";
        this.loadingAllStatus = false;
        this.DisableTransportChgs = false;
        this.userForm.patchValue({ party: "0", inv_type: "0" });
        this.delivery_challan_Shipment_Dtls.patchValue({ pay_addr: "0" });
        this.delivery_challan_weight_dtl.patchValue({ own_uom: "0", party_uom: "0" });
        this.userForm.patchValue({ confirmed_by: "0", reason: "0" });
        this.Jobworkshow = false;
        //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
        for (let i = 0; i < this.delivery_challan_Party_Dtls.length; i++) {
          this.delivery_challan_Party_Dtls.at(i).patchValue({ p_code: "0" });
        }
        this.userForm.patchValue({ challan_date: this.currentDate });
        this.isHidden = true;
      }
    }
    if (this.deliverychallansave == true && this.deliverychallanupdate == false) {
      if (s == "add") {
        this.Business_Unit = "0";
        this.Confirmed_By = "0";
        this.loadingAllStatus = false;
        this.DisableTransportChgs = false;
        this.Reason = "0";
        this.userForm.patchValue({ party: "0", inv_type: "0" });
        this.delivery_challan_Shipment_Dtls.patchValue({ pay_addr: "0" });
        this.delivery_challan_weight_dtl.patchValue({ own_uom: "0", party_uom: "0" });
        this.userForm.patchValue({ confirmed_by: "0", reason: "0" });
        this.Jobworkshow = false;
        //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
        for (let i = 0; i < this.delivery_challan_Party_Dtls.length; i++) {
          this.delivery_challan_Party_Dtls.at(i).patchValue({ p_code: "0" });
        }
        this.userForm.patchValue({ challan_date: this.currentDate });
        this.isHidden = true;
      }
    }

    if (s == "list") {
      this.isHidden = false;
      this.action = 'update';
      this.Confirmed_By = "0";
      this.loadingAllStatus = false;
      this.DisableTransportChgs = false;
      this.Reason = "0";
      this.Jobworkshow = false;
      //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      this.delivery_challan_Shipment_Dtls.patchValue({ pay_addr: "0" });
      this.delivery_challan_weight_dtl.patchValue({ own_uom: "0", party_uom: "0" });
      this.userForm.patchValue({ confirmed_by: "0", reason: "0" });
      // this.userForm.reset();
      this.Business_Unit = "0";
      for (let i = 0; i < this.delivery_challan_Party_Dtls.length; i++) {
        this.delivery_challan_Party_Dtls.at(i).patchValue({ p_code: "0" });
      }
      this.userForm.get("party").reset();
      this.userForm.get("challan_no").reset();
      this.userForm.get("inv_type").reset();
      this.userForm.get("ref_type").reset();
      this.userForm.get("price_term").reset();
      this.userForm.get("cust_ref_doc_no").reset();
      this.userForm.get("date2").reset();
      this.userForm.get("date2").reset();
      // this.userForm.get("bro_info_req").reset();
      this.userForm.get("challan_date").reset();
      this.userForm.reset();
      this.delivery_challan_Trans_Info.reset();
      this.delivery_challan_Shipment_Dtls.reset();
      this.delivery_challan_weight_dtl.reset();
      this.packingItem = [];
      this.selectedPackingItem = [];
      this.selectedItemName = [];
      this.item_sl_no = 0;
      while (this.delivery_challan_Item_Dtls.length)
        this.delivery_challan_Item_Dtls.removeAt(0);
      this.addItem();

      this.selectedPartyName = [];
      this.selectedContName = [];
      this.party_sl_no = 0;
      this.jobwork_sl_no = 0;
      this.chgs_sl_no = 0;

      while (this.delivery_challan_Party_Dtls.length)
        this.delivery_challan_Party_Dtls.removeAt(0);
      this.addParty();

      this.broker_sl_no = 0;
      while (this.delivery_challan_Broker_Dtls.length)
        this.delivery_challan_Broker_Dtls.removeAt(0);
      this.addBroker();

      while (this.delivery_challan_Docs.length)
        this.delivery_challan_Docs.removeAt(0);
      this.addDocument();

      while (this.delivery_challan_docs_list.length)
        this.delivery_challan_docs_list.removeAt(0);
      this.addDocumentlist();

      while (this.delivery_challan_Chgs_dyn.length)
        this.delivery_challan_Chgs_dyn.removeAt(0);
      this.addChgs();

      this.userForm.patchValue({ party: "0", inv_type: "0" });

      let accessdata = JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
      this.deliverychallansave = false;
      this.deliverychallanupdate = false;
      this.deliverychallanview = false;
      this.deliverychallanprint = false;

      if (accessdata.includes('delivery_challan.save')) {
        this.deliverychallansave = true;
      }
      if (accessdata.includes('delivery_challan.update')) {
        this.deliverychallanupdate = true;
      }
      if (accessdata.includes('delivery_challan.view')) {
        this.deliverychallanview = true;
      }
      if (accessdata.includes('delivery_challan.print')) {
        this.deliverychallanprint = true;
      }

    }
  }

  onChangeChallanDate(challandate) {

    this.currentDate = challandate.target.value;

    if ((this.currentDate >= formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en')) && (this.currentDate <= formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en'))) {
      //console.log("sucess");
    }
    else {
      alert("Selected  date is not in Selected Financial period!!!!!!")
      this.currentDate = formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
    }
  }

  onChangeSalesInvoiceType(invoiceType) {
    if (invoiceType.length && invoiceType != "0") {
      this.status = false;
      this.DropDownListService.getDCSequenceId(this.financialYear + "/" + invoiceType).subscribe(data => {
        this.challanNo = data.sequenceid;
        this.status = true;
      });
    }
  }


  GetDeliveryBuisnessUnit(businessunit_code: string) {
    //alert(businessunit_code+","+this.sales_Order_Shipment_Dtls.get("pay_addr").value);
    if (businessunit_code != '0') {
      this.status = false;

      this.DropDownListService.getCustDelvFromAdd(this.delivery_challan_Shipment_Dtls.get("pay_addr").value, businessunit_code).subscribe(data => {
        this.delivery_challan_Shipment_Dtls.patchValue({ ship_details: data["ship_to"] });
        this.status = true;
      });
    }
  }

  itemCode: any;
  showPopUp2(index) {
    this.itemCode = this.delivery_challan_Item_Dtls.at(index).get('item_code').value as FormControl;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: index, item_code: this.itemCode };
    const dialogRef = this.dialog.open(SalesQcPopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      this.delivery_challan_Item_Dtls.at(index).patchValue({ acc_norms: data["qc_code"] });
    });
  }

  onChangePartyName(party_id: string, index) {
    this.contNameList[index] = [];
    this.delivery_challan_Party_Dtls.at(index).patchValue({ cp_contact: null });
    if (party_id != "0" && party_id != undefined) {
      this.status = false;
      this.DropDownListService.custAddDtlsRetriveList(party_id, this.company_name).subscribe(contactName => {
        this.status = true;
        this.contNameList[index] = contactName;
      });
    }
  }

  partyId: any;
  onChangeContactName(index, event) {
    this.delivery_challan_Party_Dtls.at(index).patchValue({ cp_contact: null });
    if (event.target.value != "0") {
      this.status = false;
      this.partyId = this.delivery_challan_Party_Dtls.at(index).get("p_code").value as FormControl;
      this.DropDownListService.custContactByName(this.partyId, event.target.value, this.company_name).subscribe(data => {
        this.delivery_challan_Party_Dtls.at(index).patchValue({ cp_contact: data.mobile });
        this.status = true;
      });
    }
  }

  loadingAllStatus: boolean = true;

  onChangeRefType(event: string) {
    console.log("CHECK :: " + event);
    if (event == "Open Delivery Challan") {
      this.DropDownListService.getItemThruSalesThruBUFastApi("CBU00001", this.company_name).subscribe(itemList => {
        this.item_codes[this.delivery_challan_Item_Dtls.length] = itemList;
      })
      this.loadingAllStatus = false;
      this.addItem();
      this.item_sl_no = 0;
      while (this.delivery_challan_Item_Dtls.length)
        this.delivery_challan_Item_Dtls.removeAt(0);
      this.addItem();

      this.addBroker();
      this.broker_sl_no = 0;
      while (this.delivery_challan_Broker_Dtls.length)
        this.delivery_challan_Broker_Dtls.removeAt(0);
      this.addBroker();

      this.addParty();
      this.party_sl_no = 0;
      while (this.delivery_challan_Party_Dtls.length)
        this.delivery_challan_Party_Dtls.removeAt(0);
      this.addParty();

      this.addChgs();
      this.chgs_sl_no = 0;
      while (this.delivery_challan_Chgs_dyn.length)
        this.delivery_challan_Chgs_dyn.removeAt(0);
      this.addChgs();

      console.log("Length : :" + this.partyList.length)
      for (let data1 of this.partyList) {
        if (data1.cp_Id == this.partyId) {
          this.status = false;
          if (this.partyId != "0" && this.partyId != undefined) {
            this.DropDownListService.custAddDtlsRetriveList(this.partyId, this.company_name).subscribe(data => {
              this.contNameList[0] = data;
              this.delivery_challan_Party_Dtls.at(0).patchValue({ p_code: this.partyId });
              this.status = true;
            });
          }
          break;
        }
      }
    }
    else {
      console.log("MENU :: ");
      this.loadingAllStatus = true;
      if (event == "GRN")
      {
        this.gatepassShow=true;
      }
      else{
        this.gatepassShow=false;
        this.userForm.patchValue({gatepass:'NA'});
      }
    }
  }

  _total_amt: any
  addItem() {
    this.item_sl_no = this.item_sl_no + 1;
    this.delivery_challan_Item_Dtls.push(this.fb.group({
      slno: this.item_sl_no,
      item_code: '',
      packing: '',
      hsn_code: '',
      quantity: '',
      uom: '',
      squantity: '',
      suom: '',
      mat_wt: '',
      price: '',
      price_based_on: '',
      amount: '',
      discount_type: '',
      discount_rate: '',
      discount_amt: '',
      tax_code: '',
      tax_rate: '',
      cgstamt: '',
      sgstamt: '',
      igstamt: '',
      tax_amt: '',
      total_amt: '',
      acc_norms: '',
    }))

    this.delivery_challan_Item_Dtls.at(this.item_sl_no - 1).patchValue({
      item_code: "0", packing: "0", squantity: 0, quantity: 0, price_based_on: "0",
      amount: 0, discount_type: "0", discount_amt: 0, net_amount: 0, taxable_amount: 0, tax_amount: 0, total_amt: 0
    });
  }

  deleteItem(index) {
    if (this.item_sl_no > 1) {
      this._total_amt = this.delivery_challan_Item_Dtls.at(index).get("total_amt").value as FormControl;
      this.grandTotal = Number(this.grandTotal) - Number(this._total_amt);
      this.userForm.patchValue({ grand_total: this.grandTotal.toFixed(2) });

      this.delivery_challan_Item_Dtls.removeAt(index);
      this.packingItem.splice(index, 1);
      this.item_sl_no = this.item_sl_no - 1;
    }
    else {
      this.item_sl_no = 1;
      this.grandTotal = 0;
      alert("can't delete all rows");
      this.delivery_challan_Item_Dtls.reset();
      this.delivery_challan_Item_Dtls.at(0).patchValue({ slno: this.item_sl_no });
      this.userForm.patchValue({ grand_total: this.grandTotal.toFixed(2) });
      this.delivery_challan_Item_Dtls.at(this.item_sl_no - 1).patchValue({
        item_code: "0", packing: "0", squantity: 0, quantity: 0, price_based_on: "0",
        amount: 0, discount_type: "0", discount_amt: 0, net_amount: 0, taxable_amount: 0, tax_amount: 0, total_amt: 0
      });
    }

    for (let i = 1; i <= this.item_sl_no; i++)
      this.delivery_challan_Item_Dtls.at(i - 1).patchValue({ slno: i });

  }

  addJobworkItem() {
    this.jobwork_sl_no = this.jobwork_sl_no + 1;
    this.delivery_challan_Item_Dtls_for_jobwork.push(this.fb.group({
      sl_no: this.jobwork_sl_no,
      job_item: '',
      job_item_name: '',
      job_packing: '',
      job_packing_name: '',
      job_hsn: '',
      pack_qty: '',
      pack_uom: '',
      price_based_on: '',
      item_qty: '',
      item_uom: '',
      mat_wt: '',
      tolerance: ''

    }));

    this.delivery_challan_Item_Dtls_for_jobwork.at(this.jobwork_sl_no - 1).patchValue({
      job_item: '',
      job_item_name: '',
      job_packing: '',
      job_packing_name: '',
      job_hsn: '',
      pack_qty: '',
      pack_uom: '',
      price_based_on: '',
      item_qty: '',
      item_uom: '',
      mat_wt: '',
      tolerance: ''
    });

  }

  deleteJobworkItem(index) {
    if (this.jobwork_sl_no > 1) {
      this.delivery_challan_Item_Dtls_for_jobwork.removeAt(index);
      this.jobwork_sl_no = this.jobwork_sl_no - 1;
    }
    else {
      this.jobwork_sl_no = 1;

      alert("can't delete all rows");
      this.delivery_challan_Item_Dtls_for_jobwork.reset();
      this.delivery_challan_Item_Dtls_for_jobwork.at(0).patchValue({ sl_no: this.jobwork_sl_no });

      this.delivery_challan_Item_Dtls_for_jobwork.at(this.jobwork_sl_no - 1).patchValue({
        job_item: '',
        job_item_name: '',
        job_packing: '',
        job_packing_name: '',
        job_hsn: '',
        pack_qty: '',
        pack_uom: '',
        price_based_on: '',
        item_qty: '',
        item_uom: '',
        mat_wt: '',
        tolerance: ''
      });
    }

    for (let i = 1; i <= this.jobwork_sl_no; i++)
      this.delivery_challan_Item_Dtls_for_jobwork.at(i - 1).patchValue({ sl_no: i });

  }


  addBroker() {
    this.broker_sl_no = this.broker_sl_no + 1;
    this.delivery_challan_Broker_Dtls.push(this.fb.group({
      slno: this.broker_sl_no,
      broker_code: '',
      basis: '',
      rate: ''
    }))
  }

  deleteBroker(index) {
    if (this.broker_sl_no > 1) {
      this.delivery_challan_Broker_Dtls.removeAt(index);
      this.broker_sl_no = this.broker_sl_no - 1;
    }
    else {
      this.broker_sl_no = 1;
      alert("can't delete all rows");
      this.delivery_challan_Broker_Dtls.reset();
      this.delivery_challan_Broker_Dtls.at(0).patchValue({ slno: this.broker_sl_no });
    }

    for (let i = 1; i <= this.broker_sl_no; i++)
      this.delivery_challan_Broker_Dtls.at(i - 1).patchValue({ slno: i });

  }

  addParty() {
    this.party_sl_no = this.party_sl_no + 1;
    this.delivery_challan_Party_Dtls.push(this.fb.group({
      sl_no: this.party_sl_no,
      p_code: '',
      cp_name: '',
      cp_contact: ''
    }))
    for (let i = 0; i < this.delivery_challan_Party_Dtls.length; i++) {
      this.delivery_challan_Party_Dtls.at(i).patchValue({ p_code: "0" });
    }
  }

  deleteParty(index) {
    if (this.party_sl_no > 1) {
      this.delivery_challan_Party_Dtls.removeAt(index);
      this.party_sl_no = this.party_sl_no - 1;
    }
    else {
      this.party_sl_no = 1;
      alert("can't delete all rows");
      this.delivery_challan_Party_Dtls.reset();
      this.delivery_challan_Party_Dtls.at(0).patchValue({ sl_no: this.party_sl_no });
    }
    for (let i = 1; i <= this.party_sl_no; i++)
      this.delivery_challan_Party_Dtls.at(i - 1).patchValue({ sl_no: i });
  }

  addDocument() {
    this.delivery_challan_Docs.push(this.fb.group({
      doc_name: '',
      doc_pdf: '',
      doc_file_name: ''
    }));
  }
  addDocumentlist() {
    this.delivery_challan_docs_list.push(this.fb.group({
      doc_name: '',
      doc_pdf: '',
      doc_file_name: ''
    }));
  }

  deleteDocument(index) {
    if (index) { this.delivery_challan_Docs.removeAt(index); }
    else {
      alert("Can not delete all rows");
      this.delivery_challan_Docs.reset();
    }
  }
  deleteDocumentlist(index) {
    this.delivery_challan_docs_list.removeAt(index);
  }


  getTransName(bp_code: String) {
    if (bp_code) {
      this.status = false;
      this.DropDownListService.nameListByTransCode(bp_code).subscribe(data => {
        this.delivery_challan_Trans_Info.patchValue({ transporter_name: data["bp_name"] });
        this.status = true;
      });
    }
  }

  // onChangeBrokerRequired(event)
  // {
  //   if(event.checked)
  //   {
  //     this.brokerReq = true;
  //     this.userForm.patchValue({bro_info_req: true});
  //   }
  //   else
  //   {
  //     this.brokerReq = false;
  //     this.userForm.patchValue({bro_info_req: false});
  //   }
  // }

  onChangeBrokerName(index, event) {
    let Party = this.userForm.get("party").value
    if (event) {
      this.status = false;
      this.DropDownListService.getCustomerBrokerDtls(Party, event.target.value).subscribe(data => {
        //  console.log("onChangeBrokerName : "+JSON.stringify(data))
        this.delivery_challan_Broker_Dtls.at(index).patchValue({ basis: data.basis, rate: data.rate });
        this.status = true;
      });
    }
  }



  _item_qty: any;
  _packing_qty: any;
  _mrp: any;
  _taxrate: any;
  _taxAmt: any;
  _netAmt: any;
  _discount: any;
  _totalAmt: any;
  _priceBasedOn: any;
  _discountBasadOn: any;
  discountAmt: any;
  amt: any;
  getPackingQty(packingQty, index) {
    this._packing_qty = packingQty.target.value;
    //this._item_qty = this.capacity[index] * this._packing_qty;

    //changes on 09-03-2023
    //this.delivery_challan_Item_Dtls.at(index).patchValue({quantity: this._item_qty.toFixed(3), mat_wt: this._item_qty - this.empty_bag_wt[index]});


    let alluom: any = [];
    alluom = JSON.parse(localStorage.getItem("ALLUOM"));

    //vineet Starts
    if (this.delivery_challan_Item_Dtls.at(index).get("uom").value == "PCS") {
      this._item_qty = Math.round(this.capacity[index] * this._packing_qty);
    }
    else {
      alluom.forEach(element => {
        if (element.description == this.delivery_challan_Item_Dtls.at(index).get("uom").value) {
          this._item_qty = Number(this.capacity[index] * this._packing_qty).toFixed(Number(element.decimalv));
        }
      });

    }
    //this.delivery_challan_Item_Dtls.at(index).patchValue({quantity: this._item_qty.toFixed(3), mat_wt: this._item_qty.toFixed(3)});
    this.delivery_challan_Item_Dtls.at(index).patchValue({ quantity: this._item_qty, mat_wt: this._item_qty });

    //vineet ends


    //this.delivery_challan_Item_Dtls.at(index).patchValue({quantity: this._item_qty.toFixed(3), mat_wt: (this._item_qty - this.empty_bag_wt[index]).toFixed(3)});

    this._mrp = this.delivery_challan_Item_Dtls.at(index).get("price").value as FormControl;
    this._priceBasedOn = this.delivery_challan_Item_Dtls.at(index).get('price_based_on').value as FormControl;
    this._discount = this.delivery_challan_Item_Dtls.at(index).get('discount_rate').value as FormControl;
    this._discountBasadOn = this.delivery_challan_Item_Dtls.at(index).get('discount_type').value as FormControl;
    this._taxrate = this.delivery_challan_Item_Dtls.at(index).get('tax_rate').value as FormControl;

    //alert("_mrp: "+this._mrp+"_priceBasedOn : "+this._priceBasedOn +"_discount: "+this._discount +"_taxrate : "+this._taxrate)
    //alert("_discountBasadOn: "+this._discountBasadOn+"_priceBasedOn : "+this._priceBasedOn +"_discount: "+this._discount +"_taxrate : "+this._taxrate)
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  getItemQty(itemQty, index) {
    this._packing_qty = this.delivery_challan_Item_Dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = itemQty.target.value;
    this._mrp = this.delivery_challan_Item_Dtls.at(index).get("price").value as FormControl;
    this._priceBasedOn = this.delivery_challan_Item_Dtls.at(index).get('price_based_on').value as FormControl;
    this._discount = this.delivery_challan_Item_Dtls.at(index).get('discount_rate').value as FormControl;
    this._discountBasadOn = this.delivery_challan_Item_Dtls.at(index).get('discount_type').value as FormControl;
    this._taxrate = this.delivery_challan_Item_Dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  getPrice(price, index) {
    this._packing_qty = this.delivery_challan_Item_Dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.delivery_challan_Item_Dtls.at(index).get("quantity").value as FormControl;
    this._mrp = price.target.value;
    this._priceBasedOn = this.delivery_challan_Item_Dtls.at(index).get('price_based_on').value as FormControl;
    this._discount = this.delivery_challan_Item_Dtls.at(index).get('discount_rate').value as FormControl;
    this._discountBasadOn = this.delivery_challan_Item_Dtls.at(index).get('discount_type').value as FormControl;
    this._taxrate = this.delivery_challan_Item_Dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  onChangePriceBasedOn(price_based_on, index) {
    this._packing_qty = this.delivery_challan_Item_Dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.delivery_challan_Item_Dtls.at(index).get("quantity").value as FormControl;
    this._mrp = this.delivery_challan_Item_Dtls.at(index).get("price").value as FormControl;
    this._priceBasedOn = price_based_on.target.value;
    this._discount = this.delivery_challan_Item_Dtls.at(index).get('discount_rate').value as FormControl;
    this._discountBasadOn = this.delivery_challan_Item_Dtls.at(index).get('discount_type').value as FormControl;
    this._taxrate = this.delivery_challan_Item_Dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  getDiscount(discount, index) {
    this._packing_qty = this.delivery_challan_Item_Dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.delivery_challan_Item_Dtls.at(index).get("quantity").value as FormControl;
    this._mrp = this.delivery_challan_Item_Dtls.at(index).get("price").value as FormControl;
    this._priceBasedOn = this.delivery_challan_Item_Dtls.at(index).get('price_based_on').value as FormControl;
    this._discount = discount.target.value;
    this._discountBasadOn = this.delivery_challan_Item_Dtls.at(index).get('discount_type').value as FormControl;
    this._taxrate = this.delivery_challan_Item_Dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  onChangeDiscountBasedOn(dis_based_on, index) {
    this._packing_qty = this.delivery_challan_Item_Dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.delivery_challan_Item_Dtls.at(index).get("quantity").value as FormControl;
    this._mrp = this.delivery_challan_Item_Dtls.at(index).get("price").value as FormControl;
    this._priceBasedOn = this.delivery_challan_Item_Dtls.at(index).get('price_based_on').value as FormControl;
    this._discount = this.delivery_challan_Item_Dtls.at(index).get('discount_rate').value as FormControl;
    this._discountBasadOn = this.delivery_challan_Item_Dtls.at(index).get('discount_type').value as FormControl;
    this._taxrate = this.delivery_challan_Item_Dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  onChangeItemName(index, event) {
    if (event.target.value != "0") {
      this.status = false;
      forkJoin(
        this.DropDownListService.getItemNameById(event.target.value, this.company_name),
        this.DropDownListService.getItemMasterInvData1(event.target.value, this.company_name),
        this.DropDownListService.getItemMasterPackMat(event.target.value),
        this.DropDownListService.retriveItemMasterStatInfo(event.target.value, this.company_name),
        this.DropDownListService.getItemQCDetails(event.target.value, this.company_name),
        this.DropDownListService.taxList()
      ).subscribe(([itemData, invData, packingData, statInfoData, qcData, taxlist]) => {
        this.delivery_challan_Item_Dtls.at(index).patchValue({ hsn_code: itemData.hsn_code });
        this.DropDownListService.getUomName(itemData["mstock_unit"]).subscribe(data => {
          this.delivery_challan_Item_Dtls.at(index).patchValue({ uom: data.description });
          this.status = true;
        });
        this.delivery_challan_Item_Dtls.at(index).patchValue({ price: invData["mrp"] });
        this.packingItem[index] = packingData;
        this.delivery_challan_Item_Dtls.at(index).patchValue({
          tax_code: statInfoData[0].tax_code,
          tax_rate: statInfoData[0].tax_rate
        });
        this.delivery_challan_Item_Dtls.at(index).patchValue({ acc_norms: qcData[0].qc_code });

        this.tax_list = taxlist;
        this.tax_list.forEach(element => {
          //console.log("foreach "+element.tax_id);
          if (element.tax_id == statInfoData[0].tax_code) {
            //console.log("foreach "+element.tax_name);
            this.actualcgstrate = element.cgst_act_val;
            this.actualsgstrate = element.sgst_act_val;
            //console.log("foreach "+element.tax_name+"//"+ this.actualcgstrate+"//"+this.actualsgstrate);
            this.delivery_challan_Item_Dtls.at(index).patchValue({ tax_code: element.tax_name });
          }

        });
        this.delivery_challan_Item_Dtls.at(index).patchValue({ tax_rate: statInfoData[0].tax_rate });

      });
    }
  }

  itemId: any;
  packingQty: any;
  ItemQty: any;
  price: any;
  PriceBasedOn: any;
  discount: any;
  discountBasedOn: any;
  taxrate: any;
  totalAmt: any;

  onChangePackingItem(index, event) {
    if (event) {
      this.status = false;
      this.itemId = this.delivery_challan_Item_Dtls.at(index).get("item_code").value as FormControl;
      this.packingQty = this.delivery_challan_Item_Dtls.at(index).get("squantity").value as FormControl;
      this.DropDownListService.getItemPackUom(this.itemId, event.target.value, this.company_name).subscribe(data => {
        this.capacity[index] = data.capacity;
        this.empty_bag_wt[index] = data.empty_big_wt;
        this.delivery_challan_Item_Dtls.at(index).patchValue({ suom: data.uom1, quantity: this.capacity * parseInt(this.packingQty) });

        this.packingQty = this.delivery_challan_Item_Dtls.at(index).get("squantity").value;
        this.ItemQty = this.delivery_challan_Item_Dtls.at(index).get("quantity").value;
        this.price = this.delivery_challan_Item_Dtls.at(index).get("price").value;
        this.PriceBasedOn = this.delivery_challan_Item_Dtls.at(index).get("price_based_on").value;
        this.discount = this.delivery_challan_Item_Dtls.at(index).get("discount_rate").value;
        this.discountBasedOn = this.delivery_challan_Item_Dtls.at(index).get("discount_type").value;
        this.taxrate = this.delivery_challan_Item_Dtls.at(index).get("tax_rate").value;

        this.calculateItemData(this.packingQty, this.ItemQty, this.price, this.PriceBasedOn, this.discount, this.discountBasedOn, this.taxrate, index)

        this.status = true;
      });
    }
  }
  round(num, decimalPlaces = 0) {
    var p = Math.pow(10, decimalPlaces);
    var n = (num * p) * (1 + Number.EPSILON);
    return Math.round(n) / p;
  }

  calculateItemData(packingQty, ItemQty, price, PriceBasedOn, discount, discountBasedOn, taxrate, index) {
    if (PriceBasedOn == "Packing") { this.amt = price * packingQty }

    if (PriceBasedOn == "Item") { this.amt = price * ItemQty }

    if (PriceBasedOn == "0") { this.amt = 0 }

    if (discountBasedOn == "Uom") { this.discountAmt = discount; }

    if (discountBasedOn == "%") { this.discountAmt = this.amt * (discount / 100); }

    if (discountBasedOn == "0") { this.discountAmt = 0 }

    let netAmt = this.amt - this.discountAmt;

    // this.DropDownListService.taxlistbycode(this.delivery_challan_Item_Dtls.at(index).get("tax_code").value).subscribe(taxcode=>
    // {

    let taxdata: any = [];
    let tax_id: any;
    taxdata = this.tax_list;
    //console.log("taxcode"+JSON.stringify(this.tax_list)+" //////// "+JSON.stringify(taxdata))
    taxdata.forEach(element => {
      //console.log("taxname:"+element.tax_id+"//"+this.delivery_challan_Item_Dtls.at(index).get("tax_code").value)
      if (element.tax_id == this.delivery_challan_Item_Dtls.at(index).get("tax_code").value) {
        //console.log("statestatus:"+this.statestatus)
        if (this.statestatus == 0) {
          // this.cgstvalue=(Number(netAmt*element["cgst_act_val"])/100).toFixed(2);
          //this.sgstvalue=(Number(netAmt*element["sgst_act_val"])/100).toFixed(2);
          this.cgstvalue = Number(this.round((Number(netAmt * element["cgst_act_val"]) / 100), 2));
          this.sgstvalue = Number(this.round((Number(netAmt * element["sgst_act_val"]) / 100), 2));

          this.igstvalue = "0";
          // console.log("netAmt"+netAmt+"//"+this.cgstvalue+"//"+this.sgstvalue)
        }
        else {
          this.cgstvalue = '0';
          this.sgstvalue = '0';
          //this.igstvalue=Number(netAmt *(this.delivery_challan_Item_Dtls.at(index).get("tax_rate").value/100)).toFixed(2);
          this.igstvalue = Number(this.round(Number(netAmt * (this.delivery_challan_Item_Dtls.at(index).get("tax_rate").value / 100)), 2));
          // console.log("netAmt"+netAmt+"//"+this.igstvalue)
        }
        let taxamt = Number(this.cgstvalue) + Number(this.sgstvalue) + Number(this.igstvalue);
        //console.log(netAmt+"taxamt::"+taxamt)
        this.totalAmt = taxamt + netAmt;
        this.delivery_challan_Item_Dtls.at(index).patchValue({
          cgstamt: this.cgstvalue, sgstamt: this.sgstvalue, igstamt: this.igstvalue, amount: (Math.round(this.amt * 100) / 100).toFixed(2),
          discount_amt: (Math.round(this.discountAmt * 100) / 100).toFixed(2), net_amt_after_qc: (Math.round(Number(netAmt) * 100) / 100).toFixed(2),
          net_amt: (Math.round(netAmt * 100) / 100).toFixed(2), tax_amt: taxamt,
          total_amt: (Number(taxamt) + Number(netAmt)).toFixed(2), gross_amt: (Math.round(Number(netAmt + Number(taxamt)) * 100) / 100).toFixed(2)
        });


      }

    });
    this.grandTotal = 0;
    for (let y = 0; y < this.delivery_challan_Item_Dtls.length; y++) {
      this._total_amt = this.delivery_challan_Item_Dtls.at(y).get("total_amt").value as FormControl;
      this.grandTotal = Number(this.grandTotal) + Number(this._total_amt);
      this.userForm.patchValue({ grand_total: this.grandTotal.toFixed(2) });
    }

    /* let cgst_amt =  taxcode["cgst_act_val"];
     let sgst_amt = taxcode["sgst_act_val"];
     let igst_amt = taxcode["igst_act_val"];

     if( cgst_amt == 0 && sgst_amt == 0 && igst_amt == 0)
     {
          let taxamt = 0;
        //  this.delivery_challan_Item_Dtls.at(index).patchValue({total_amt:(Number(taxamt) + Number(netAmt)).toFixed(2),tax_amt:taxamt});
          this.delivery_challan_Item_Dtls.at(index).patchValue({amount: this.amt.toFixed(2),discount_amt:this.discountAmt.toFixed(2),net_amount: netAmt.toFixed(2),taxable_amount:this.amt.toFixed(2)
           ,tax_amt: taxamt,total_amt:(Number(taxamt) + Number(netAmt)).toFixed(2)});
     }
     else if(cgst_amt == 0)
     {
         let taxamt =Number(netAmt *(this.delivery_challan_Item_Dtls.at(index).get("tax_rate").value/100)).toFixed(2);
        // this.delivery_challan_Item_Dtls.at(index).patchValue({total_amt:(Number(taxamt) + Number(netAmt)).toFixed(2),tax_amt:taxamt});
         this.delivery_challan_Item_Dtls.at(index).patchValue({amount: this.amt.toFixed(2),discount_amt:this.discountAmt.toFixed(2),net_amount: netAmt.toFixed(2),taxable_amount:this.amt.toFixed(2)
           ,tax_amt: taxamt,total_amt:(Number(taxamt) + Number(netAmt)).toFixed(2)});
     }
     else
     {
         let csgt_final=Number(netAmt *(cgst_amt/100)).toFixed(2);
         let sgst_final=Number(netAmt *(sgst_amt/100)).toFixed(2);
         let taxamt = Number(csgt_final)+ Number(sgst_final);
         console.log(" tax here "+csgt_final + " // " +sgst_final + "  // " + taxamt + " // " + (Number(netAmt)).toFixed(2))
         //this.delivery_challan_Item_Dtls.at(index).patchValue({total_amt:(Number(taxamt) + Number(netAmt)).toFixed(2),tax_amt:taxamt});
         this.delivery_challan_Item_Dtls.at(index).patchValue({amount: this.amt.toFixed(2),discount_amt:this.discountAmt.toFixed(2),net_amount: netAmt.toFixed(2),taxable_amount:this.amt.toFixed(2)
           ,tax_amt: taxamt,total_amt:(Number(taxamt) + Number(netAmt)).toFixed(2)});
         
     }
     this.grandTotal = 0;
     for(let i=0; i<this.delivery_challan_Item_Dtls.length; i++)
     {
       this._total_amt = this.delivery_challan_Item_Dtls.at(i).get("total_amt").value as FormControl;
       this.grandTotal = Number(this.grandTotal) + Number(this._total_amt);
       this.userForm.patchValue({grand_total:this.grandTotal.toFixed(2)});
     }*/
    // });
  }

  cgst: any;
  sgst: any;
  igst: any;

  getGst(index) {
    this.packingQty = this.delivery_challan_Item_Dtls.at(index).get("squantity").value;
    this.ItemQty = this.delivery_challan_Item_Dtls.at(index).get("quantity").value;
    this.price = this.delivery_challan_Item_Dtls.at(index).get("price").value;
    this.PriceBasedOn = this.delivery_challan_Item_Dtls.at(index).get("price_based_on").value;
    this.discount = this.delivery_challan_Item_Dtls.at(index).get("discount_rate").value;
    this.discountBasedOn = this.delivery_challan_Item_Dtls.at(index).get("discount_type").value;
    this.taxrate = this.delivery_challan_Item_Dtls.at(index).get("tax_rate").value;

    this.cgst = this.delivery_challan_Item_Dtls.at(index).get("cgstamt").value;
    this.sgst = this.delivery_challan_Item_Dtls.at(index).get("sgstamt").value;
    this.igst = this.delivery_challan_Item_Dtls.at(index).get("igstamt").value;

    this.calculateItemDataGstChange(this.packingQty, this.ItemQty, this.price, this.PriceBasedOn, this.discount, this.discountBasedOn, this.taxrate, this.cgst, this.sgst, this.igst, index)
  }

  calculateItemDataGstChange(packingQty, ItemQty, price, PriceBasedOn, discount, discountBasedOn, taxrate, cgst, sgst, igst, index) {
    if (PriceBasedOn == "Item") { this.amt = price * ItemQty }

    if (PriceBasedOn == "0") { this.amt = 0 }

    if (discountBasedOn == "Uom") { this.discountAmt = discount; }

    if (discountBasedOn == "%") { this.discountAmt = this.amt * (discount / 100); }

    if (discountBasedOn == "0") { this.discountAmt = 0 }

    let netAmt = this.amt - this.discountAmt;
    ;

    let taxdata: any = [];
    let tax_id: any;
    taxdata = this.tax_list;
    taxdata.forEach(element => {
      if (element.tax_name == this.delivery_challan_Item_Dtls.at(index).get("tax_code").value) {
        let taxamt = Number(cgst) + Number(sgst) + Number(igst);
        // console.log(netAmt+"taxamt::"+taxamt)
        this.totalAmt = taxamt + netAmt;
        this.delivery_challan_Item_Dtls.at(index).patchValue({
          cgstamt: cgst, sgstamt: sgst, igstamt: igst, amount: (Math.round(this.amt * 100) / 100).toFixed(2),
          discount_amt: (Math.round(this.discountAmt * 100) / 100).toFixed(2), net_amt_after_qc: (Math.round(Number(netAmt) * 100) / 100).toFixed(2),
          net_amt: (Math.round(netAmt * 100) / 100).toFixed(2), tax_amt: taxamt,
          total_amt: (Number(taxamt) + Number(netAmt)).toFixed(2), gross_amt: (Math.round(Number(netAmt + Number(taxamt)) * 100) / 100).toFixed(2)
        });
      }

    });
  }

  onChangeParty(party_id: string) {
    this.partyId = party_id;
    if (party_id != '0' && party_id != undefined) {
      this.status = true;
      // this.DropDownListService.getCustDelvFromList(party_id).subscribe(custDelvData=>
      // {
      //   this.customerDelvAddList = custDelvData;
      //   this.status = true;
      // });
      this.addParty();
      this.party_sl_no = 0;
      while (this.delivery_challan_Party_Dtls.length)
        this.delivery_challan_Party_Dtls.removeAt(0);
      this.addParty();
      this.delivery_challan_Party_Dtls.at(0).patchValue({ p_code: party_id });
      this.onChangePartyName(party_id, 0);

      if (party_id.length && party_id != "0") {
        this.status = false;
        forkJoin(
          this.DropDownListService.getCustDelvFromList(party_id),
          this.Service.custBillAddRetriveList(party_id),
          this.DropDownListService.getCompanyBussinessUnitDetails(localStorage.getItem("company_name"),this.userForm.get("business_unit").value),
          this.DropDownListService.getDCSequenceIdforDefence(this.financialYear + "/" + this.userForm.get("inv_type").value + "/" + party_id)
        ).subscribe(([custDelvData, CustAddress,companystate,defenceSqNo]) => {
          // console.log(CustAddress["state"]+" address::"+JSON.stringify(CustAddress))
         // console.log(companystate["state_name"]+"comp state:"+JSON.stringify(companystate))
          this.state = CustAddress["state"];
          this.challanNo = defenceSqNo.sequenceid;
         // if (this.state == 'BIHAR') { this.statestatus = 0; }
          if (this.state == companystate["state_name"]) { this.statestatus = 0; }
          else {
            this.statestatus = 1;
          }
          console.log("CustState:: ",CustAddress["state"]+" ::invType:: "+this.userForm.get("inv_type").value);
          console.log("pay_details:: ",CustAddress["address"]+" ::pay_addr:: "+this.partyId);
          //this.onChangeSalesInvoiceType(this.userForm.get("inv_type").value);
          this.customerDelvAddList = custDelvData;
          this.delivery_challan_Shipment_Dtls.patchValue({ pay_addr: this.partyId, pay_details: CustAddress["address"] });
          this.status = true;
        });
      }

    }
  }


  onChangePayToFromAddId(businessunit_code: string) {
    if (businessunit_code.length) {
      this.status = false;
      this.DropDownListService.getCompanyBUAddress(businessunit_code).subscribe(data => {
        this.delivery_challan_Shipment_Dtls.patchValue({ pay_details: data["add"] });
        this.status = true;
      });
    }
  }

  onChangeBuUnit(BuUnit: string) {
    this.status = false;
    if (BuUnit != "0") {
      forkJoin(
        //this.DropDownListService.getCustomerThruBU(BuUnit),
        this.DropDownListService.getCustomerThruBUnewlist(BuUnit),
        // this.DropDownListService.getItemThruSalesThruBU(BuUnit,this.company_name)
        this.DropDownListService.getItemThruSalesThruBUFastApi(BuUnit, this.company_name)
      ).subscribe(([PartyData, ItemData]) => {
        this.partyList = PartyData;
        // this.item_codes = ItemData;
        this.status = true;
      });
    }
  }

  reference_type: any;
  partyid: any;
  sales_order_id = "0";
  Challan_Date: any;
  empty_bag_wt_priceBasedOn: any = [];
  onClickShow() {
    this.reference_type = this.userForm.get("ref_type").value as FormControl;
    this.partyid = this.userForm.get("party").value as FormControl;
    this.Challan_Date = this.userForm.get("challan_date").value as FormControl;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.Id = this.userForm.get("id").value;
    this.Transportrate = 0;
    //console.log("tuhin here12345stewtrw :: "+this.Id)
    if (this.Id == null || this.Id == '') {
      this.Id = 0;
      //  console.log("tuhin here12345 :: "+this.Id)
    }
    if (this.reference_type == "Sales Order" && this.partyid != undefined && this.partyid != "") {
      dialogConfig.data = { partyid: this.partyid, Challan_Date: this.Challan_Date, Company: this.company_name, id: this.Id };
      const dialogRef = this.dialog.open(DelChallanSOrderPopUpComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => {

        this.sales_order_id = data["order_id"]
        if (data != '' && data["order_id"] != "0") {
          let i = 0;
          this.packingItem = [];
          this.grandTotal = 0;

          this.userForm.patchValue({ referance_id: data["order_id"] });
          // this.onChangeBrokerRequired(true);

          this.addItem();
          this.item_sl_no = 0;
          while (this.delivery_challan_Item_Dtls.length)
            this.delivery_challan_Item_Dtls.removeAt(0);

          for (let data1 of data.sales_Order_Item_Dtls) {
            if (data1.checkbox == true) {
              this.status = false;
              forkJoin(
                this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name)
              ).subscribe(([packingList, capacityEmptyWt]) => {
                this.addItem();
                this.status = true;
                this.packingItem[i] = packingList;
                this.capacity[i] = capacityEmptyWt["capacity"];
                this.empty_bag_wt[i] = capacityEmptyWt["empty_big_wt"];
                this.grandTotal = this.grandTotal + data1["total_amt"];
                this.delivery_challan_Item_Dtls.at(i).patchValue(data1);
                //console.log("squantity:"+data1.squantity+" quantity:"+data1.quantity+" price:"+data1.price+" price_based_on:"+data1.price_based_on+" discount_rate:"+data1.discount_rate+" discount_type:"+data1.discount_type+" tax_rate:"+data1.tax_rate+"//"+i)
                this.calculateItemData(data1.squantity, data1.quantity, data1.price, data1.price_based_on, data1.discount_rate, data1.discount_type, data1.tax_rate, i)
                i = i + 1;
                this.userForm.patchValue({ grand_total: this.grandTotal.toFixed(2) });
              })
            }
          }

          this.status = false;
          forkJoin(
            this.DropDownListService.getSalesOrderDetails(data["order_id"]),
            this.DropDownListService.getSalesOrdShipDtls(data["order_id"]),
            this.DropDownListService.getSalesOrdBrokerDtls(data["order_id"]),
            this.DropDownListService.getSalesOrdTransInfo(data["order_id"]),
            this.DropDownListService.getSalesOrdPartyDtls(data["order_id"])
          ).subscribe(([salesOrdData, shipDtlsData, brokerData, transData, partyData]) => {
            this.partyId = salesOrdData["customer"];

            this.userForm.patchValue({ remark: salesOrdData["remarks"], price_term: salesOrdData["price_term"], cust_ref_doc_no: salesOrdData["cust_refdocno"] })

            this.status = true;
            if (salesOrdData["customer"] != "" && salesOrdData["customer"] != undefined && salesOrdData["customer"] != undefined) {
              this.DropDownListService.getCustDelvFromList(salesOrdData["customer"]).subscribe(custDelvData => {
                this.customerDelvAddList = custDelvData;
                this.status = true;
              });
            }

            this.delivery_challan_Shipment_Dtls.patchValue(shipDtlsData);

            this.addBroker();
            this.broker_sl_no = 0;
            while (this.delivery_challan_Broker_Dtls.length)
              this.delivery_challan_Broker_Dtls.removeAt(0);
            for (let data1 of brokerData)
              this.addBroker();
            this.delivery_challan_Broker_Dtls.patchValue(brokerData);

            this.delivery_challan_Trans_Info.patchValue({
              trans_borne_by: transData["trans_borne_by"],
              mode_of_trans: transData["mode_of_trans"], trans_code: transData["trans_code"], charge_code: transData["charge_code"]
            });

            this.addParty();
            this.party_sl_no = 0;
            while (this.delivery_challan_Party_Dtls.length)
              this.delivery_challan_Party_Dtls.removeAt(0);
            for (let data1 of partyData)
              this.addParty();
            this.delivery_challan_Party_Dtls.patchValue(partyData);

            this.status = true;
          });
        }
      });
    }

    else if (this.reference_type == "Loading Advice" && this.partyid != undefined && this.partyid != "") {
      if (this.userForm.get("jobwork").value == true) {


        dialogConfig.data = { index: 0, delivery_date: this.currentDate, partyid: this.partyid, id: this.Id, inv_type: this.userForm.get("inv_type").value };
        const dialogRef = this.dialog.open(DeliveryChallanJobworkPopupComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => {
          if (data != '' && data["advice_id"] != "0") {

            this.delvChallanPopupStatus = true;
            let i = 0;
            this.selectedPackingItem = [];
            this.selectedItemName = [];
            this.packingItem = [];
            this.grandTotal = 0;
            this.userForm.patchValue({ referance_id: data["advice_id"] });

            this.addItem();
            this.item_sl_no = 0;
            while (this.delivery_challan_Item_Dtls.length) { this.delivery_challan_Item_Dtls.removeAt(0); }

            this.addJobworkItem();
            this.jobwork_sl_no = 0;
            while (this.delivery_challan_Item_Dtls_for_jobwork.length) { this.delivery_challan_Item_Dtls_for_jobwork.removeAt(0); }

            this.DropDownListService.getItemThruSalesThruBU_inv_type(this.userForm.get("business_unit").value, this.company_name, this.userForm.get("inv_type").value)
              .subscribe(itemlist => {

                this.jobitemlist = itemlist;
                let grandtotal: number = 0;
                let u = 0;
                this.jobpackinglist = [];
                this.selectedJobItem = [];
                this.selectedJobPacking = [];
                for (let data1 of data.wm_loading_advice_Item_Dtls_for_jobwork) {
                  if (data1.checkbox == true || data1.checkbox == "true") {
                    this.status = false;

                    this.DropDownListService.getItemMasterPackMat(data1["job_item"])
                      .subscribe(packingList => {
                        this.addJobworkItem();
                        this.jobpackinglist[u] = packingList;
                        this.selectedJobItem[u] = data1["job_item"];
                        this.selectedJobPacking[u] = data1["job_packing"];
                        this.delivery_challan_Item_Dtls_for_jobwork.patchValue(data.wm_loading_advice_Item_Dtls_for_jobwork);

                        u++;

                      });
                  }
                }

              });


            //second part here start

            this.status = false;
            forkJoin(
              this.DropDownListService.getLoadingDetails(data["advice_id"]),
              this.DropDownListService.getLoadingAdvTransinfo(data["advice_id"]),
              this.DropDownListService.getLoadingAdvShipDtls(data["advice_id"]),
            ).subscribe(([loadingData, transData, shipDtlsData]) => {
              this.status = false;
              this.partyId = loadingData["customer"];
              this.userForm.patchValue({
                remarks: loadingData["remarks"],
                price_term: loadingData["price_term"], cust_ref_doc_no: loadingData["cust_refdocno"]
              })

              this.DropDownListService.getUnloadWeightmentWt(loadingData["weighment_id"]).subscribe(wgmtDtls => {
                this.delivery_challan_weight_dtl.patchValue({
                  own_uom: wgmtDtls["gw_unit"], own_gross: wgmtDtls["gross_weight"],
                  own_tare: wgmtDtls["tare_weight"], own_net: wgmtDtls["net_weight"], own_slip_no: wgmtDtls["wgment_no"],
                  own_date: wgmtDtls["gw_date"]
                });
                this.status = true;
              })

              this.delivery_challan_Trans_Info.patchValue({
                vehle_no: loadingData["vehicle_id"],
                trans_borne_by: transData["trans_borne_by"], trans_code: transData["transporter_name"]
              });
              this.delivery_challan_Chgs_dyn.at(0).patchValue({ transporter_name: transData["transporter_name"] });

              console.log("TransPort : : " + JSON.stringify(transData));

              this.delivery_challan_Shipment_Dtls.patchValue(shipDtlsData)



              if (loadingData["ref_doc_type"] == 'Sales Order') {
                this.status = false;

                forkJoin(
                  this.DropDownListService.getCustDelvFromList(loadingData["customer"]),
                  this.DropDownListService.getLoadingAdvBrokerDtls(data["advice_id"]),
                  this.DropDownListService.getLoadingAdvPartyDtls(data["advice_id"]),
                  this.DropDownListService.getLoadingAdvShipDtls(data["advice_id"]),
                ).subscribe(([custDelvData, brokerData, partyData, shipmentData]) => {

                  this.customerDelvAddList = custDelvData;

                  let k = 0;
                  this.addBroker();
                  this.broker_sl_no = 0;
                  while (this.delivery_challan_Broker_Dtls.length)
                    this.delivery_challan_Broker_Dtls.removeAt(0);
                  for (let data1 of brokerData) {
                    console.log("CHECK :: " + JSON.stringify(data1))
                    this.addBroker();
                    this.delivery_challan_Broker_Dtls.at(k).patchValue({
                      broker_code: data1["broker_code"],
                      basis: data1["basis"], rate: data1["rate"]
                    });
                    k = k + 1;
                  }
                  let j = 0;
                  this.addParty();
                  this.party_sl_no = 0;
                  while (this.delivery_challan_Party_Dtls.length)
                    this.delivery_challan_Party_Dtls.removeAt(0);
                  for (let data1 of partyData) {
                    this.addParty();
                    this.selectedPartyName[j] = data1.p_code;
                    j = j + 1;
                  }
                  this.delivery_challan_Party_Dtls.patchValue(partyData);
                  this.delivery_challan_Shipment_Dtls.patchValue({ shipmentData });

                  this.status = true;
                });
              }

            });
            //second part end here 
          }
        });



      }
      else {

        dialogConfig.data = { index: 0, delivery_date: this.currentDate, partyid: this.partyid, id: this.Id, inv_type: this.userForm.get("inv_type").value };
        const dialogRef = this.dialog.open(DelChallanLoadingAdvPopUpComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => {
          if (data != '' && data["advice_id"] != "0") {
            this.delvChallanPopupStatus = true;
            let i = 0;
            this.selectedPackingItem = [];
            this.selectedItemName = [];
            this.packingItem = [];
            this.grandTotal = 0;
            this.userForm.patchValue({ referance_id: data["advice_id"] });

            this.addItem();
            this.item_sl_no = 0;
            while (this.delivery_challan_Item_Dtls.length) { this.delivery_challan_Item_Dtls.removeAt(0); }

            const sortedData = data.Wm_loading_advice_itm_dtls.sort((a, b) => {
              // Sort by item_code or any other property that ensures the correct order
              return String(a.slno).localeCompare(String(b.slno));  // Or any other sorting criteria
            });
            console.log('Sorted Data: ', sortedData);

            //for (let data1 of data.Wm_loading_advice_itm_dtls) {
            for (let data1 of sortedData) {
              if (data1.checkbox == true || data1.checkbox == "true") {
                console.log("TEST :: " + JSON.stringify(data1))
                this.status = false;
                forkJoin(
                  this.DropDownListService.getItemMasterPackMat(data1["alter_item_code"]),
                  this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name),
                  this.DropDownListService.getAlternativeItemList(data1["item_code"]),
                  this.DropDownListService.getItemNameById(data1["item_code"], this.company_name)
                ).subscribe(([packingList, capacityEmptyWt, alteritem, hsn]) => {
                  console.log("every Item:" + JSON.stringify(alteritem))
                  this.item_codes[i] = alteritem;
                  this.addItem();
                  this.status = true;
                  this.selectedItemName[i] = data1["item_code"];
                  this.selectedPackingItem[i] = data1["packing"];
                  this.packingItem[i] = packingList;
                  this.capacity[i] = capacityEmptyWt["capacity"];
                  this.empty_bag_wt[i] = capacityEmptyWt["empty_big_wt"];
                  this.grandTotal = this.grandTotal + data1["total_amt"];
                  this.delivery_challan_Item_Dtls.at(i).patchValue({
                    item_code: data1["alter_item_code"], hsn_code: hsn["hsn_code"],
                    packing: data1["alter_packing"], quantity: data1["quantity"], uom: data1["uom"], squantity: data1["s_quantity"],
                    suom: data1["s_uom"], mat_wt: data1["mat_wt"], price: data1["price"].toFixed(2), price_based_on: data1["price_based_on"],
                    amount: data1["amount"].toFixed(2), discount_rate: data1["discount_rate"].toFixed(2), discount_type: data1["discount_type"],
                    discount_amt: data1["discount_amt"].toFixed(2), tax_code: data1["tax_code"], tax_rate: data1["tax_rate"].toFixed(2),
                    tax_amt: data1["tax_amt"].toFixed(2), total_amt: data1["total_amt"].toFixed(2), acc_norms: data1["acc_norms"]
                  });


                  this.calculateItemData(data1["s_quantity"], data1.quantity, data1.price, data1.price_based_on, data1.discount_rate, data1.discount_type, data1.tax_rate, i)


                  i = i + 1;
                  this.userForm.patchValue({ grand_total: this.grandTotal.toFixed(2) });
                })
              }
            }

            this.status = false;
            forkJoin(
              this.DropDownListService.getLoadingDetails(data["advice_id"]),
              this.DropDownListService.getLoadingAdvTransinfo(data["advice_id"]),
              this.DropDownListService.getLoadingAdvShipDtls(data["advice_id"]),
            ).subscribe(([loadingData, transData, shipDtlsData]) => {
              this.status = false;
              this.partyId = loadingData["customer"];
              this.userForm.patchValue({
                remarks: loadingData["remarks"],
                price_term: loadingData["price_term"], cust_ref_doc_no: loadingData["cust_refdocno"]
              })

              this.DropDownListService.getUnloadWeightmentWt(loadingData["weighment_id"]).subscribe(wgmtDtls => {
                this.delivery_challan_weight_dtl.patchValue({
                  own_uom: wgmtDtls["gw_unit"], own_gross: wgmtDtls["gross_weight"],
                  own_tare: wgmtDtls["tare_weight"], own_net: wgmtDtls["net_weight"], own_slip_no: wgmtDtls["wgment_no"],
                  own_date: wgmtDtls["gw_date"]
                });
                this.status = true;
              })

              this.delivery_challan_Trans_Info.patchValue({
                vehle_no: loadingData["vehicle_id"],
                trans_borne_by: transData["trans_borne_by"], trans_code: transData["transporter_name"]
              });
              this.delivery_challan_Chgs_dyn.at(0).patchValue({ transporter_name: transData["transporter_name"] });

              console.log("TransPort : : " + JSON.stringify(transData));

              this.delivery_challan_Shipment_Dtls.patchValue(shipDtlsData)

              if (transData["trans_borne_by"] == "FOR") {
                this.DisableTransportChgs = false;
              }
              else {
                this.DisableTransportChgs = true;
              }


              if (loadingData["ref_doc_type"] == 'Sales Order') {
                this.status = false;

                forkJoin(
                  this.DropDownListService.getCustDelvFromList(loadingData["customer"]),
                  this.DropDownListService.getLoadingAdvBrokerDtls(data["advice_id"]),
                  this.DropDownListService.getLoadingAdvPartyDtls(data["advice_id"]),
                  this.DropDownListService.getLoadingAdvShipDtls(data["advice_id"]),
                ).subscribe(([custDelvData, brokerData, partyData, shipmentData]) => {

                  this.customerDelvAddList = custDelvData;

                  let k = 0;
                  this.addBroker();
                  this.broker_sl_no = 0;
                  while (this.delivery_challan_Broker_Dtls.length)
                    this.delivery_challan_Broker_Dtls.removeAt(0);
                  for (let data1 of brokerData) {
                    console.log("CHECK :: " + JSON.stringify(data1))
                    this.addBroker();
                    this.delivery_challan_Broker_Dtls.at(k).patchValue({
                      broker_code: data1["broker_code"],
                      basis: data1["basis"], rate: data1["rate"]
                    });
                    k = k + 1;
                  }
                  let j = 0;
                  this.addParty();
                  this.party_sl_no = 0;
                  while (this.delivery_challan_Party_Dtls.length)
                    this.delivery_challan_Party_Dtls.removeAt(0);
                  for (let data1 of partyData) {
                    this.addParty();
                    this.selectedPartyName[j] = data1.p_code;
                    j = j + 1;
                  }
                  this.delivery_challan_Party_Dtls.patchValue(partyData);
                  this.delivery_challan_Shipment_Dtls.patchValue({ shipmentData });
                  this.status = true;
                });
              }
            });
          }
        });
      }
    }

    else if (this.reference_type == "GRN") {
     /* if (this.userForm.get("jobwork").value == true) {

        dialogConfig.data = { index: 0, delivery_date: this.currentDate, partyid: this.partyid, id: this.Id, inv_type: this.userForm.get("inv_type").value };
        const dialogRef = this.dialog.open(DelChallanSalesOrdByGrnJobworkPopupComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => {
          if (data != '' && data["advice_id"] != "0") {

            this.delvChallanPopupStatus = true;
            let i = 0;
            this.selectedPackingItem = [];
            this.selectedItemName = [];
            this.packingItem = [];
            this.grandTotal = 0;
            this.userForm.patchValue({ referance_id: data["advice_id"] });

            this.addItem();
            this.item_sl_no = 0;
            while (this.delivery_challan_Item_Dtls.length) { this.delivery_challan_Item_Dtls.removeAt(0); }

            this.addJobworkItem();
            this.jobwork_sl_no = 0;
            while (this.delivery_challan_Item_Dtls_for_jobwork.length) { this.delivery_challan_Item_Dtls_for_jobwork.removeAt(0); }

            this.DropDownListService.getItemThruSalesThruBU_inv_type(this.userForm.get("business_unit").value, this.company_name, this.userForm.get("inv_type").value)
              .subscribe(itemlist => {

                this.jobitemlist = itemlist;
                let grandtotal: number = 0;
                let u = 0;
                this.jobpackinglist = [];
                this.selectedJobItem = [];
                this.selectedJobPacking = [];
                for (let data1 of data.wm_loading_advice_Item_Dtls_for_jobwork) {
                  if (data1.checkbox == true || data1.checkbox == "true") {
                    this.status = false;

                    this.DropDownListService.getItemMasterPackMat(data1["job_item"])
                      .subscribe(packingList => {
                        this.addJobworkItem();
                        this.jobpackinglist[u] = packingList;
                        this.selectedJobItem[u] = data1["job_item"];
                        this.selectedJobPacking[u] = data1["job_packing"];
                        this.delivery_challan_Item_Dtls_for_jobwork.patchValue(data.wm_loading_advice_Item_Dtls_for_jobwork);

                        u++;

                      });
                  }
                }

              });


            //second part here start

            this.status = false;
            forkJoin(
              this.DropDownListService.getLoadingDetails(data["advice_id"]),
              this.DropDownListService.getLoadingAdvTransinfo(data["advice_id"]),
              this.DropDownListService.getLoadingAdvShipDtls(data["advice_id"]),
            ).subscribe(([loadingData, transData, shipDtlsData]) => {
              this.status = false;
              this.partyId = loadingData["customer"];
              this.userForm.patchValue({
                remarks: loadingData["remarks"],
                price_term: loadingData["price_term"], cust_ref_doc_no: loadingData["cust_refdocno"]
              })

              this.DropDownListService.getUnloadWeightmentWt(loadingData["weighment_id"]).subscribe(wgmtDtls => {
                this.delivery_challan_weight_dtl.patchValue({
                  own_uom: wgmtDtls["gw_unit"], own_gross: wgmtDtls["gross_weight"],
                  own_tare: wgmtDtls["tare_weight"], own_net: wgmtDtls["net_weight"], own_slip_no: wgmtDtls["wgment_no"],
                  own_date: wgmtDtls["gw_date"]
                });
                this.status = true;
              })

              this.delivery_challan_Trans_Info.patchValue({
                vehle_no: loadingData["vehicle_id"],
                trans_borne_by: transData["trans_borne_by"], trans_code: transData["transporter_name"]
              });
              this.delivery_challan_Chgs_dyn.at(0).patchValue({ transporter_name: transData["transporter_name"] });

              console.log("TransPort : : " + JSON.stringify(transData));

              this.delivery_challan_Shipment_Dtls.patchValue(shipDtlsData)



              if (loadingData["ref_doc_type"] == 'Sales Order') {
                this.status = false;

                forkJoin(
                  this.DropDownListService.getCustDelvFromList(loadingData["customer"]),
                  this.DropDownListService.getLoadingAdvBrokerDtls(data["advice_id"]),
                  this.DropDownListService.getLoadingAdvPartyDtls(data["advice_id"]),
                  this.DropDownListService.getLoadingAdvShipDtls(data["advice_id"]),
                ).subscribe(([custDelvData, brokerData, partyData, shipmentData]) => {

                  this.customerDelvAddList = custDelvData;

                  let k = 0;
                  this.addBroker();
                  this.broker_sl_no = 0;
                  while (this.delivery_challan_Broker_Dtls.length)
                    this.delivery_challan_Broker_Dtls.removeAt(0);
                  for (let data1 of brokerData) {
                    console.log("CHECK :: " + JSON.stringify(data1))
                    this.addBroker();
                    this.delivery_challan_Broker_Dtls.at(k).patchValue({
                      broker_code: data1["broker_code"],
                      basis: data1["basis"], rate: data1["rate"]
                    });
                    k = k + 1;
                  }
                  let j = 0;
                  this.addParty();
                  this.party_sl_no = 0;
                  while (this.delivery_challan_Party_Dtls.length)
                    this.delivery_challan_Party_Dtls.removeAt(0);
                  for (let data1 of partyData) {
                    this.addParty();
                    this.selectedPartyName[j] = data1.p_code;
                    j = j + 1;
                  }
                  this.delivery_challan_Party_Dtls.patchValue(partyData);
                  this.delivery_challan_Shipment_Dtls.patchValue({ shipmentData });

                  this.status = true;
                });
              }

            });
            //second part end here 
          }
        });



      }
      else {*/
        dialogConfig.data = { index: 0,id: this.Id,sale_order_id:this.sale_order_id,grn_id:this.grn_id};
        const dialogRef = this.dialog.open(DelChallanSalesOrdByGrnPopupComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => {
          if (data != '' && data["order_id"] != "0") {
            this.delvChallanPopupStatus = true;
            let i = 0;
            this.selectedPackingItem = [];
            this.selectedItemName = [];
            this.packingItem = [];
            this.grandTotal = 0;
            this.userForm.patchValue({ referance_id: this.grn_id });

            this.addItem();
            this.item_sl_no = 0;
            while (this.delivery_challan_Item_Dtls.length) { this.delivery_challan_Item_Dtls.removeAt(0); }



            for (let data1 of data.sales_Order_Item_Dtls) {
              if (data1.checkbox == true || data1.checkbox == "true") {
                console.log("TEST :: " + JSON.stringify(data1))
                this.status = false;
                forkJoin(
                  this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                  this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name),
                  this.DropDownListService.getAlternativeItemList(data1["item_code"]),
                  this.DropDownListService.getItemNameById(data1["item_code"], this.company_name),
                  this.DropDownListService.getItemThruSalesThruBU_inv_type(data.b_unit, this.company_name, data.inv_type),
                ).subscribe(([packingList, capacityEmptyWt, alteritem, hsn,itemlist]) => {
                  //console.log("Sales Item:" + JSON.stringify(data.sales_Order_Item_Dtls))
                  console.log("Sales Item capacityEmptyWt:" + JSON.stringify(capacityEmptyWt))
                  //this.item_codes[i] = alteritem;
                  this.item_codes[i] = itemlist;
                  this.addItem();
                  this.status = true;
                  this.selectedItemName[i] = data1["item_code"];
                  this.selectedPackingItem[i] = data1["packing"];
                  this.packingItem[i] = packingList;
                  this.capacity[i] = capacityEmptyWt["capacity"];
                  this.empty_bag_wt[i] = capacityEmptyWt["empty_big_wt"];
                  this.grandTotal = this.grandTotal + data1["total_amt"];
                  this.empty_bag_wt_priceBasedOn[i] = capacityEmptyWt["empbagwt_based_on"];

                  let alluom: any = [];
                  alluom = JSON.parse(localStorage.getItem("ALLUOM"));

                  if (data1.uom == "PCS") {
                    this._item_qty = Math.round(this.capacity[i] * data1.squantity);
                    console.log("_item_qty1: ",this._item_qty,"//",this.capacity[i],"//",data1.squantity)
                  }
                  else {
                    alluom.forEach(element => {
                      if (element.description == data1.uom) {
                        this._item_qty = Number(this.capacity[i] * data1.squantity).toFixed(Number(element.decimalv));
                      }
                    });
                    console.log("_item_qty2: ",this._item_qty,"//",this.capacity[i],"//",data1.squantity)
                  }
                  console.log("_item_qty: ",this._item_qty)

                  if (this.empty_bag_wt_priceBasedOn[i] == 'UOM') {
                    this.delivery_challan_Item_Dtls.at(i).patchValue({ mat_wt: (Number((data1["quantity"] - (this.empty_bag_wt[i] * data1["squantity"])))).toFixed(3) });
                    console.log("Mat Qt UoM: " + (data1["quantity"] - (this.empty_bag_wt[i] * data1["squantity"])));
                  }
                  else {
                    this.delivery_challan_Item_Dtls.at(i).patchValue({ mat_wt: ((Number((data1["quantity"] - (data1["quantity"] * this.empty_bag_wt[i]) / 100)))).toFixed(3) });
                    console.log("Mat Qt %: " + ((Number((data1["quantity"] - (data1["quantity"] * this.empty_bag_wt[i]) / 100)))).toFixed(3));
                  }
                  
                  console.log(this._item_qty + " / " + data1["quantity"] + " / " + this.empty_bag_wt[i] + " / " + data1["squantity"] + " / " + Number(this.empty_bag_wt[i] * data1["squantity"]) + " // " + this.capacity[i]);

                  if (data1.price_based_on == "Packing") { this.amt = data1.price * data1.squantity }

                  if (data1.price_based_on == "Item") { this.amt = data1.price * data1.quantity }
    
                  this.delivery_challan_Item_Dtls.at(i).patchValue({
                    item_code: data1["item_code"], hsn_code: hsn["hsn_code"],
                    packing: data1["packing"], quantity: data1["quantity"], uom: data1["uom"], squantity: data1["squantity"],
                    suom: data1["suom"], price: data1["price"].toFixed(2), price_based_on: data1["price_based_on"],
                    //mat_wt: Number(this._item_qty).toFixed(2), 
                    amount: Number(this.amt).toFixed(2), discount_rate: data1["discount_rate"].toFixed(2), discount_type: data1["discount_type"],
                    discount_amt: 0, tax_code: data1["tax_code"], tax_rate: data1["tax_rate"].toFixed(2),
                    tax_amt: data1["tax_amt"].toFixed(2), total_amt: Number(this._item_qty).toFixed(2), acc_norms: data1["acc_norms"]
                  });

                  this.calculateItemData(data1.squantity,data1.quantity,data1.price,data1.price_based_on,data1.discount_rate,data1.discount_type,data1.tax_rate,i)

                  i = i + 1;
                  this.userForm.patchValue({ grand_total: this.grandTotal.toFixed(2) });
                })
              }
            }

            this.status = false;
            forkJoin(
              this.DropDownListService.getSalesOrderDetails(data["order_id"]),
              this.DropDownListService.getSalesOrdShipDtls(data["order_id"]),
              this.DropDownListService.getSalesOrdBrokerDtls(data["order_id"]),
              this.DropDownListService.getSalesOrdTransInfo(data["order_id"]),
              this.DropDownListService.getSalesOrdPartyDtls(data["order_id"]),
              this.DropDownListService.getGrnWeighment(this.grn_id)
            ).subscribe(([salesOrdData, shipDtlsData, brokerData, transData, partyData,grnData]) => {
              this.partyId = salesOrdData["customer"];
  
              this.userForm.patchValue({inv_type:salesOrdData.inv_type,party:salesOrdData.customer,business_unit:salesOrdData.business_unit,
                cust_ref_doc_no:salesOrdData.cust_refdocno,date2:salesOrdData.cust_ref_doc_date,
                 remark: salesOrdData["remarks"], price_term: salesOrdData["price_term"]});

                this.onChangeSalesInvoiceType(salesOrdData.inv_type);

              this.status = true;
              if (salesOrdData["customer"] != "" && salesOrdData["customer"] != undefined && salesOrdData["customer"] != undefined) {
                this.DropDownListService.getCustDelvFromList(salesOrdData["customer"]).subscribe(custDelvData => {
                  this.customerDelvAddList = custDelvData;
                  this.status = true;
                });
              }
              console.log("Ship Data GRN:" + JSON.stringify(shipDtlsData))
              this.delivery_challan_Shipment_Dtls.patchValue(shipDtlsData);
              
              this.addBroker();
              this.broker_sl_no = 0;
              while (this.delivery_challan_Broker_Dtls.length)
                this.delivery_challan_Broker_Dtls.removeAt(0);
              for (let data1 of brokerData)
                this.addBroker();
              this.delivery_challan_Broker_Dtls.patchValue(brokerData);
  
              this.delivery_challan_Trans_Info.patchValue({
                vehle_no: grnData["vehicle_id"],
                trans_borne_by: transData["trans_borne_by"], trans_code: transData["transporter_name"], charge_code: transData["charge_code"]});
              this.delivery_challan_Chgs_dyn.at(0).patchValue({ transporter_name: transData["transporter_name"] });

              console.log("TransPort : : " + JSON.stringify(transData));

              this.delivery_challan_Shipment_Dtls.patchValue(shipDtlsData)

              if (transData["trans_borne_by"] == "FOR") {
                this.DisableTransportChgs = false;
              }
              else {
                this.DisableTransportChgs = true;
              }
  
              this.DropDownListService.getUnloadWeightmentWt(grnData["weighment_id"]).subscribe(wgmtDtls => {
                this.delivery_challan_weight_dtl.patchValue({
                  own_uom: wgmtDtls["gw_unit"], own_gross: wgmtDtls["gross_weight"],
                  own_tare: wgmtDtls["tare_weight"], own_net: wgmtDtls["net_weight"], own_slip_no: wgmtDtls["wgment_no"],
                  own_date: wgmtDtls["gw_date"]
                });
                this.status = true;
              })
              this.addParty();
              this.party_sl_no = 0;
              while (this.delivery_challan_Party_Dtls.length)
                this.delivery_challan_Party_Dtls.removeAt(0);
              for (let data1 of partyData)
                this.addParty();
              this.delivery_challan_Party_Dtls.patchValue(partyData);
  
              this.status = true;
            });
          }
        });

     // }


    }
    
    else {
      alert("Select Party Name..!")
    }
  }

  onchangeTransname(event) {
    console.log(" MUKESH : : " + event);
    if (event.length && event != "0") {
      this.status = false;
      this.DropDownListService.getVehicleThruTransporter(event).subscribe(data => {
        this.veh_nos = data;
        this.status = true;
      });
    }
  }



  taxAmt: any;


  showPopUp(index) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: index, };
    const dialogRef = this.dialog.open(SalesQuoTaxModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data != '') {
        this.delivery_challan_Item_Dtls.at(index).patchValue({ tax_code: data["tax_id"], tax_rate: data["tax_rate"] });
        this._taxrate = data['tax_rate'];
        this._packing_qty = this.delivery_challan_Item_Dtls.at(index).get("squantity").value as FormControl;
        this._item_qty = this.delivery_challan_Item_Dtls.at(index).get("quantity").value as FormControl;
        this._mrp = this.delivery_challan_Item_Dtls.at(index).get('price').value as FormControl;
        //this._mat_weight = this.delivery_challan_Item_Dtls.at(index).get("mat_wt").value as FormControl;
        this._priceBasedOn = this.delivery_challan_Item_Dtls.at(index).get('price_based_on').value as FormControl;
        this._discount = this.delivery_challan_Item_Dtls.at(index).get('discount_rate').value as FormControl;
        this._discountBasadOn = this.delivery_challan_Item_Dtls.at(index).get('discount_type').value as FormControl;
        this.calculateItemData(this._packing_qty, this._item_qty, this._mrp,
          this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
      }
    });
  }

  send() {
    this.Id = this.userForm.get("id").value as FormControl;
    this.userForm.patchValue({
      company_id: localStorage.getItem("company_name"), fin_year: localStorage.getItem("financial_year"),
      username: localStorage.getItem("username")
    });
    this.submitted = true;
    if (!this.userForm.valid) {
      alert('Please fill all fields!')
      return false;
    }
    else {
      this.status = false;

      if (this.userForm.get("inv_type").value == "" || this.userForm.get("inv_type").value == null || this.userForm.get("inv_type").value == 0) {
        alert("Please Select Sales Invoice Type");
        this.status = true;
      }
      else if (this.userForm.get("challan_date").value == "" || this.userForm.get("challan_date").value == null || this.userForm.get("challan_date").value == 0) {
        alert("Please Enter Challan Date");
        this.status = true;
      }
      else if (this.userForm.get("challan_no").value == "" || this.userForm.get("challan_no").value == null || this.userForm.get("challan_no").value == 0) {
        alert("Please Enter Challan No");
        this.status = true;
      }
      else if (this.userForm.get("business_unit").value == "" || this.userForm.get("business_unit").value == null || this.userForm.get("business_unit").value == 0) {
        alert("Please Select Business Unit");
        this.status = true;
      }
      else if (this.userForm.get("party").value == "" || this.userForm.get("party").value == null || this.userForm.get("party").value == 0) {
        alert("Please Select Party");
        this.status = true;
      }
      else if (this.userForm.get("ref_type").value == "" || this.userForm.get("ref_type").value == null || this.userForm.get("ref_type").value == 0) {
        alert("Please Select Reference Type");
        this.status = true;
      }
      else if (this.userForm.get("price_term").value == "" || this.userForm.get("price_term").value == null || this.userForm.get("price_term").value == 0) {
        alert("Please Select Price Term");
        this.status = true;
      }
      else if (this.userForm.get("ref_type").value == 'GRN' && (this.userForm.get("gatepass").value == "" || this.userForm.get("gatepass").value == null || this.userForm.get("gatepass").value == 0)) {
        alert("Please Enter Gatepass No.");
        this.status = true;
      }
      /* else if(this.delivery_challan_Trans_Info.get("trans_borne_by").value == 'FOR' && (this.delivery_challan_Trans_Info.get("transporter_name").value == null || this.delivery_challan_Trans_Info.get("transporter_name").value == '' || this.delivery_challan_Trans_Info.get("transporter_name").value == 0))
      {
          alert("Please Select Transporter Name In Transport Charges Tab")
          this.status=true;
      } */
      else if (this.delivery_challan_Trans_Info.get("trans_borne_by").value == 'FOR' && (this.delivery_challan_Trans_Info.get("charge_code").value == null || this.delivery_challan_Trans_Info.get("charge_code").value == '' || this.delivery_challan_Trans_Info.get("charge_code").value == 0)) {
        alert("Please Select Charge Code  In Transport Charges Tab")
        this.status = true;
      }
      else if (this.delivery_challan_Trans_Info.get("trans_borne_by").value == 'FOR' && (this.delivery_challan_Trans_Info.get("freight_amt").value == null || this.delivery_challan_Trans_Info.get("freight_amt").value == '' || this.delivery_challan_Trans_Info.get("freight_amt").value == 0)) {
        alert("Please Enter Rate Value In Transport Charges Tab")
        this.status = true;
      }
      else if (this.delivery_challan_Trans_Info.get("trans_borne_by").value == 'FOR' && (this.delivery_challan_Trans_Info.get("adv_paid").value == null || this.delivery_challan_Trans_Info.get("adv_paid").value == '')) {
        alert("Please Enter Advance In Transport Charges Tab")
        this.status = true;
      }
      else {

        let itemcheck = false;
        let packingcheck = false;
        let brokercheck = false;
        let itemqty = false;
        let packingqty = false;
        for (let b = 0; b < this.delivery_challan_Item_Dtls.length; b++) {
          if (this.userForm.get("jobwork").value != true && (this.delivery_challan_Item_Dtls.at(b).get("item_code").value == null || this.delivery_challan_Item_Dtls.at(b).get("item_code").value == '' || this.delivery_challan_Item_Dtls.at(b).get("item_code").value == 0)) {
            itemcheck = true;
          }
          if (this.userForm.get("jobwork").value != true && (this.delivery_challan_Item_Dtls.at(b).get("packing").value == null || this.delivery_challan_Item_Dtls.at(b).get("packing").value == '' || this.delivery_challan_Item_Dtls.at(b).get("packing").value == 0)) {
            packingcheck = true;
          }

          if (this.userForm.get("jobwork").value != true && (this.delivery_challan_Item_Dtls.at(b).get("quantity").value == null || this.delivery_challan_Item_Dtls.at(b).get("quantity").value == '' || this.delivery_challan_Item_Dtls.at(b).get("quantity").value == 0)) {
            itemqty = true;
          }
          if (this.userForm.get("jobwork").value != true && (this.delivery_challan_Item_Dtls.at(b).get("squantity").value == null || this.delivery_challan_Item_Dtls.at(b).get("squantity").value == '' || this.delivery_challan_Item_Dtls.at(b).get("squantity").value == 0)) {
            packingqty = true;
          }

        }

        if (this.userForm.get("ref_type").value == "Loading Advice") {

          for (let b = 0; b < this.delivery_challan_Broker_Dtls.length; b++) {
            if (this.delivery_challan_Broker_Dtls.at(b).get("broker_code").value == null || this.delivery_challan_Broker_Dtls.at(b).get("broker_code").value == '' || this.delivery_challan_Broker_Dtls.at(b).get("broker_code").value == 0) {
              brokercheck = true;
            }
          }
        }

        if (itemcheck == true) {
          alert("Please Select Item Name in Item Details Tab!!!"); this.status = true;
        }
        else if (packingcheck == true) {
          alert("Please Select Item Name in Item Details Tab!!!"); this.status = true;
        }
        else if (itemqty == true) {
          alert("Item Quantity cannot be zero in Item Details Tab!!!"); this.status = true;
        }
        else if (packingqty == true) {
          alert("Packing Quantity cannot be zero in Item Details Tab!!!"); this.status = true;
        }
        else if (this.userForm.get("ref_type").value == "Loading Advice" && brokercheck == true) {
          alert("Please Select Broker Name in Broker Details Tab!!!"); this.status = true;
        }
        else if (this.userForm.get("confirmed_by").value == null || this.userForm.get("confirmed_by").value == '' || this.userForm.get("confirmed_by").value == 0) {
          alert("Please Select Confirmed By");
          this.status = true;
        }
        else if (this.userForm.get("approval").value == null || this.userForm.get("approval").value == '' || this.userForm.get("approval").value == 0) {
          alert("Please Select Approved");
          this.status = true;
        }
        else if (this.userForm.get("reason").value == null || this.userForm.get("reason").value == '' || this.userForm.get("reason").value == 0) {
          alert("Please Select Reason");
          this.status = true;
        }
        else {
          if (this.userForm.get("ref_type").value == "Loading Advice" && this.delvChallanPopupStatus == false) {
            alert("Please Select Show Buton");
          }
          else {
            //start

            let remarksforrate: boolean = false;
            if (this.userForm.get("ref_type").value == "Loading Advice") {
              if (Number(this.Transportrate) == Number(this.delivery_challan_Trans_Info.get("freight_amt").value)) {
                remarksforrate = false;
              }
              else {
                remarksforrate = true;
              }
            }

            /* if(remarksforrate == true && (this.userForm.get("remark").value==null || this.userForm.get("remark").value=='') && this.Transportchargeschange==true)
            {
                 alert("Please Provide remarks for rate change ");
                 this.status=true;
            }*/

            /* else
            { */
            if (this.Id > 0) {
              if (this.userForm.get("jobwork").value == true) {
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
                console.log("Form data update: " + frmData);
                //this.Service.updateDlvChallan(this.userForm.getRawValue(), this.Id).subscribe(data => {
                this.Service.updateDlvChallan(frmData).subscribe(data => {

                  alert("Delivery-Challan Updated successfully.");
                  this.userForm.reset();
                  this.ngOnInit();
                }, (error) => {
                  this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
                  this.ngOnInit()
                });
              }
              else {
                this.DropDownListService.checkcashchallan(this.userForm.get("challan_date").value, this.userForm.get("grand_total").value, this.Id, this.userForm.get("party").value, this.userForm.get("referance_id").value).subscribe(data => {
                  if (data["status"] == "Yes") {

                    if (this.Transportchargeschange == true) {
                    
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
                      console.log("Form data update: " + frmData);
                      //this.Service.updateDlvChallan(this.userForm.getRawValue(), this.Id).subscribe(data => {
                        this.Service.updateDlvChallan(frmData).subscribe(data => {
                        alert("Delivery-Challan Updated successfully.");
                        this.userForm.reset();
                        this.ngOnInit();
                      }, (error) => {
                        this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
                        this.ngOnInit()
                      });
                    }
                    else {

                      this.Service.updateDlvChallantransport(this.userForm.getRawValue(), this.Id).subscribe(data => {

                        alert("Delivery-Challan Updated successfully.");
                        this.userForm.reset();
                        this.ngOnInit();
                      }, (error) => {
                        this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
                        this.ngOnInit()
                      });
                    }





                  }
                  else {
                    alert("Payment mode cannot exceed rs 2 lakh if it is set as Cash!!!!");
                    this.status = true;
                  }
                });
              }

            }
            else {

              if (this.userForm.get("jobwork").value == true) {
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
                        this.status = false;
                        this.Service.createDeliveryChallan(frmData).subscribe(data => {
                //this.Service.createDeliveryChallan(this.userForm.getRawValue()).subscribe(data => {

                  alert("New Delivery-Challan created successfully.");
                  this.userForm.reset();
                  this.ngOnInit();
                }, (error) => {
                  this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
                  this.ngOnInit()
                });
              }
              else {
                this.DropDownListService.checkcashchallan(this.userForm.get("challan_date").value, this.userForm.get("grand_total").value, 0, this.userForm.get("party").value, this.userForm.get("referance_id").value).subscribe(data => {
                  if (data["status"] == "Yes") {

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
                        this.status = false;
                        this.Service.createDeliveryChallan(frmData).subscribe(data => {

                   // this.Service.createDeliveryChallan(this.userForm.getRawValue()).subscribe(data => {

                      alert("New Delivery-Challan created successfully.");
                      this.userForm.reset();
                      this.ngOnInit();
                    }, (error) => {
                      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
                      this.ngOnInit()
                    });
                  }
                  else {

                    alert("Payment mode cannot exceed rs 2 lakh if it is set as Cash!!!!");
                    this.status = true;
                  }
                });
              }




            }

            /*  }  */


            //end
          }

        }

      }

    }
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

  onUpdate(id: any, delivery_cid: string, action) {
    this.deliverychallansave = true;
    this.userForm.patchValue({ id: id });
    this.status = false;
    this.isHidden = true;
    this.packingItem = [];
    this.selectedItemName = [];
    this.selectedPackingItem = [];
    this.selectedContName = [];
    this.selectedPartyName = [];
    this.selectedTransacc = [];
    this.selectedTdsacc = [];
    this.selectedChgCode = [];
    this.DisableTransportChgs = true;
    this.gatepassShow=false;
    if (action == 'view') {
      this.action = 'view';
      this.deliverychallansave = false;
    }
    else { action = 'update'; }

    forkJoin(
      this.Service.retriveDeliveryChallan(id),
      this.Service.getDlvChallanItemDtls(delivery_cid),
      this.Service.getDlvChallanTransInfo(delivery_cid),
      this.Service.getDlvChallanPartyDtls(delivery_cid),
      this.Service.getDlvChallanDoc(delivery_cid),
      this.Service.getDlvChallanWeightDtls(delivery_cid),
      this.Service.getDlvChallanShipmentDtls(delivery_cid),
      this.Service.getDlvChallanBrokerDtls(delivery_cid),
      this.Service.getDelivery_challan_Chgs_dynDtls(delivery_cid),
    ).subscribe(([deliveryChallanData, itemData, transData,
      partyData, docData, weightData, shipmentData, brokerData, transportcharges]) => {

      if (deliveryChallanData["ref_type"] == "Loading Advice") {
        this.delvChallanPopupStatus = true;
        this.loadingAllStatus = true;
      }
      else {
        this.loadingAllStatus = false; this.Jobworkshow = true
      }

      /* this.DropDownListService.getLoadingDetails(deliveryChallanData["referance_id"]).subscribe(loading=>
        {
          console.log("Vechile DATA :  "+  loading["vehicle_id"]);
          this.delivery_challan_Trans_Info.patchValue({vehle_no: loading["vehicle_id"]});
        }) */

      console.log(JSON.stringify(deliveryChallanData));
      this.userForm.patchValue({
        id: deliveryChallanData["id"], challan_no: deliveryChallanData["challan_no"], inv_type: deliveryChallanData["inv_type"],
        challan_date: deliveryChallanData["challan_date"], price_term: deliveryChallanData["price_term"],
        cust_ref_doc_no: deliveryChallanData["cust_ref_doc_no"], date2: deliveryChallanData["date2"], remark: deliveryChallanData["remark"],
        confirmed_by: deliveryChallanData["confirmed_by"], approval: deliveryChallanData["approval"], reason: deliveryChallanData["reason"],
        ref_type: deliveryChallanData["ref_type"], party: deliveryChallanData["party"], grand_total: deliveryChallanData["grand_total"], business_unit: deliveryChallanData["business_unit"],
        delivery_cid: deliveryChallanData["delivery_cid"], company_id: deliveryChallanData["company_id"], fin_year: deliveryChallanData["fin_year"], referance_id: deliveryChallanData["referance_id"], 
        jobwork: deliveryChallanData["jobwork"],gatepass:deliveryChallanData["gatepass"]
      });
      // console.log("order Details: "+  JSON.stringify(deliveryChallanData)); 
      
      if (deliveryChallanData["ref_type"] == "GRN")
        {
          this.gatepassShow=true;
        }else{this.gatepassShow=false;}

      this.onChangeBuUnit(deliveryChallanData["business_unit"]);
      this.onChangeParty(deliveryChallanData["party"]);
      if (deliveryChallanData["jobwork"] == true) {
        this.Jobworkshow = true;
        forkJoin(
          this.DropDownListService.getItemThruSalesThruBU_inv_type(this.userForm.get("business_unit").value, this.company_name, 'INV00003'),
          this.DropDownListService.deliverychallanjobworkRetriveList(delivery_cid),
        ).subscribe(([itemlist, jobData]) => {
          console.log("jobData::" + JSON.stringify(jobData))
          this.jobitemlist = itemlist;
          let j1 = 0;
          this.addJobworkItem();
          this.jobwork_sl_no = 0;
          while (this.delivery_challan_Item_Dtls_for_jobwork.length)
            this.delivery_challan_Item_Dtls_for_jobwork.removeAt(0);
          for (let data12 of jobData) {
            forkJoin(
              this.DropDownListService.getItemMasterPackMat(data12["job_item"])).subscribe(([packingList]) => {
                this.addJobworkItem();
                this.jobpackinglist[j1] = packingList;
                this.selectedJobItem[j1] = data12["job_item"];
                this.selectedJobPacking[j1] = data12["job_packing"];
                this.delivery_challan_Item_Dtls_for_jobwork.at(j1).patchValue({
                  job_item: data12["job_item"], job_packing: data12["job_packing"],
                  job_hsn: data12["job_hsn"], pack_qty: data12["pack_qty"], pack_uom: data12["pack_uom"], price_based_on: data12["price_based_on"],
                  item_qty: data12["item_qty"], item_uom: data12["item_uom"], tolerance: data12["tolerance"]
                });

                j1 = j1 + 1;
                this.status = true;
              });
          }
        });
      }
      else {
        this.Jobworkshow = false;
        let k = 0;
        this.addItem();
        this.item_sl_no = 0;
        while (this.delivery_challan_Item_Dtls.length)
          this.delivery_challan_Item_Dtls.removeAt(0);
        for (let data1 of itemData) {
          this.status = false;

          if (this.loadingAllStatus = true) {
            this.addItem();
            forkJoin(
              this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
              this.DropDownListService.getAlternativeItemList(data1["item_code"]),
              this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name)
            ).subscribe(([packingList, alteritem, capacityEmptyWt]) => {
              this.item_codes[k] = alteritem;
              this.capacity[k] = capacityEmptyWt.capacity;
              this.empty_bag_wt[k] = capacityEmptyWt.empty_big_wt;
              this.selectedPackingItem[k] = data1["packing"];
              this.selectedItemName[k] = data1["item_code"];
              this.packingItem[k] = packingList;
              this.delivery_challan_Item_Dtls.at(k).patchValue(data1);
              k = k + 1;
              this.status = true;
            });
          }
          else {
            this.addItem();
            forkJoin(
              this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
              this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name)
            ).subscribe(([packingList, capacityEmptyWt]) => {
              this.capacity[k] = capacityEmptyWt.capacity;
              this.empty_bag_wt[k] = capacityEmptyWt.empty_big_wt;
              this.selectedPackingItem[k] = data1["packing"];
              this.selectedItemName[k] = data1["item_code"];
              this.packingItem[k] = packingList;
              this.delivery_challan_Item_Dtls.at(k).patchValue(data1);
              k = k + 1;
              this.status = true;
            });
          }
        }
      }


      console.log("Transport DATA :  " + JSON.stringify(transData));
      this.delivery_challan_Trans_Info.patchValue(transData);

      this.Transportrate = transData["freight_amt"];
      /* if(transData["delivery_term"]=='FOR')
      {this.transChgsDyn=true;}
      else
      {this.transChgsDyn=false;} */
      /* let y = 0;
      this.addChgs();
      this.chgs_sl_no = 0;
      while (this.delivery_challan_Chgs_dyn.length)
      {this.delivery_challan_Chgs_dyn.removeAt(0);}
      for(let chgsdyndata of transportcharges)
      { 
      this.DropDownListService.getTransChargeCode(chgsdyndata['transporter_name'],chgsdyndata['transport_from'],chgsdyndata['transport_to'],'Sales').subscribe(chrgcode=>
      {
        this.ChargeList[y]=chrgcode;
        console.log("Charges DATA :  "+  JSON.stringify(chrgcode));
        this.addChgs();
        this.selectedTransacc[y] = chgsdyndata["transportation_acc"];
        this.selectedTdsacc[y] = chgsdyndata["tds_acc"];
        this.selectedChgCode[y] = chgsdyndata["charge_code"];
    
        this.delivery_challan_Chgs_dyn.at(y).patchValue({transport_from:chgsdyndata["transport_from"],transport_to:chgsdyndata["transport_to"]});
        
        this.delivery_challan_Chgs_dyn.at(y).patchValue(chgsdyndata);
        y = y + 1;
      })
      } */

      // console.log("partyData: "+JSON.stringify(partyData));
      let i = 0;
      this.addParty();
      this.party_sl_no = 0;
      while (this.delivery_challan_Party_Dtls.length)
        this.delivery_challan_Party_Dtls.removeAt(0);
      for (let data1 of partyData) {
        this.status = false;
        this.DropDownListService.custAddDtlsRetriveList(data1["p_code"], this.company_name).subscribe(cName => {
          this.addParty();
          this.contNameList[i] = cName;
          this.selectedPartyName[i] = data1["p_code"];
          this.selectedContName[i] = data1["cp_name"];
          this.delivery_challan_Party_Dtls.at(i).patchValue(data1);
          i = i + 1;
          this.status = true;
        });
      }

      this.addDocument();
      while (this.delivery_challan_Docs.length)
        this.delivery_challan_Docs.removeAt(0);
      for (let data1 of docData)
        this.addDocument();
      this.delivery_challan_Docs.patchValue(docData);

      for (let data2 of docData)
        this.addDocumentlist();
      this.delivery_challan_docs_list.patchValue(docData);
      //console.log("docData: "+JSON.stringify(docData));

      //console.log("termsconData: "+  JSON.stringify(weightData));
      this.delivery_challan_weight_dtl.patchValue(weightData);

      this.delivery_challan_Shipment_Dtls.patchValue({
        ship_addr: shipmentData["ship_addr"],
        ship_details: shipmentData["ship_details"], pay_addr: shipmentData["pay_addr"], pay_details: shipmentData["pay_details"],
      });
      console.log("shipmentData: "+  JSON.stringify(shipmentData));

      let j = 0;
      this.addBroker();
      this.broker_sl_no = 0;
      while (this.delivery_challan_Broker_Dtls.length)
        this.delivery_challan_Broker_Dtls.removeAt(0);
      for (let data1 of brokerData) {
        this.addBroker();
        this.delivery_challan_Broker_Dtls.at(j).patchValue(data1);
        j = j + 1;
      }



      if (this.delivery_challan_Trans_Info.get("trans_borne_by").value == "FOR") {

        /* this.Service.getDelivery_challan_Chgs_dyn(delivery_cid).subscribe(transportcharges=> */
        this.Service.getDelivery_challan_Chgs_dynDtls(delivery_cid).subscribe(transportcharges => {


          let y = 0;
          this.addChgs();
          this.chgs_sl_no = 0;
          while (this.delivery_challan_Chgs_dyn.length) { this.delivery_challan_Chgs_dyn.removeAt(0); }
          for (let chgsdyndata of transportcharges) {

            this.DropDownListService.getTransChargeCode(chgsdyndata['transporter_name'], chgsdyndata['transport_from'], chgsdyndata['transport_to'], 'Sales').subscribe(chrgcode => {
              this.ChargeList[y] = chrgcode;
              this.addChgs();
              this.selectedTransacc[y] = chgsdyndata["transportation_acc"];
              this.selectedTdsacc[y] = chgsdyndata["tds_acc"];
              this.selectedChgCode[y] = chgsdyndata["charge_code"];

              this.delivery_challan_Chgs_dyn.at(y).patchValue({ transport_from: chgsdyndata["transport_from"], transport_to: chgsdyndata["transport_to"] });
              this.OnChangeTransporterNameChgs(chgsdyndata["transporter_name"], y);
              this.delivery_challan_Chgs_dyn.at(y).patchValue(chgsdyndata);
              y = y + 1;
            })



          }
        })



      }
      else {


      }


      // console.log("brokerData: "+JSON.stringify(brokerData));
      if (localStorage.getItem("svalue") == 'true') {
        localStorage.setItem("svalue", 'false');
      }
      this.status = true;
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });
  }

  file_name: string;
  viewpdf(i, tm) {

    var values = tm[i].controls.doc_file_name.value
    //var values=tm[i].controls.doc_pdf.value
    console.log("values:" + values)
    //this.file_name=values.substring(35,tm[i].controls.doc_pdf.length);
    this.file_name = values;
    // alert(this.file_name);
    this.DropDownListService.downloadFileSystemDC(this.file_name).subscribe(response => {

      // console.log("backend data"+response);
      var binaryData = [];
      binaryData.push(response.data);
      var url = window.URL.createObjectURL(new Blob(binaryData, { type: "application/*" }));
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.setAttribute('target', 'blank');
      a.href = url;
      a.download = response.filename;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();

    }, error => {

      console.log(error);
    });

  }

  deletepdfwithid(dataid, i) {
    console.log("dataid " + JSON.stringify(dataid));//here getting id now procede delte process
    //  alert(JSON.stringify(dataid.id));
    this.Service.getdeletefileDelvChallan(dataid).subscribe(data => {

      alert("Pdf Has Been Deleted successfully.");
      //alert(" i " + i);
      //this.process_master_doc_list.removeAt(i);
      this.deleteDocumentlist(i);

      // this.loaddocumentlist(this.process_id.value)
      this.status = true;
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });
  }

  deletepdf(i, tm) {
    //var values=tm[i].controls.doc_pdf.value
    var values = tm[i].controls.doc_file_name.value
    this.file_name = values;
    //this.file_name=values.substring(35,tm[i].controls.doc_pdf.length);
    this.DropDownListService.getdocumentListwithfileDelvChallan(this.file_name)
      .subscribe(data => {

        console.log("data " + JSON.stringify(data[0].id));
        this.deletepdfwithid(data[0].id, i);

        this.status = true;
      }, (error) => { this.status = true; console.log("ERROR get: " + JSON.stringify(error)); });

    // alert(JSON.stringify(this.process_no.value)); 
  }


  onUpdatetransportcharge(id: any, delivery_cid: string, action, BuUnit) {

    this.Transportchargeschange = false;
    this.deliverychallansave = true;
    this.userForm.patchValue({ id: id });
    this.status = false;
    this.isHidden = true;
    this.packingItem = [];
    this.selectedItemName = [];
    this.selectedPackingItem = [];
    this.selectedContName = [];
    this.selectedPartyName = [];
    this.selectedTransacc = [];
    this.selectedTdsacc = [];
    this.selectedChgCode = [];

    if (action == 'view') {
      this.action = 'view';
      this.deliverychallansave = false;
    }
    else { action = 'update'; }

    forkJoin(
      this.Service.retriveDeliveryChallan(id),
      this.Service.getDlvChallanItemDtls(delivery_cid),
      this.Service.getDlvChallanTransInfo(delivery_cid),
      this.Service.getDlvChallanPartyDtls(delivery_cid),
      this.Service.getDlvChallanDoc(delivery_cid),
      this.Service.getDlvChallanWeightDtls(delivery_cid),
      this.Service.getDlvChallanShipmentDtls(delivery_cid),
      this.Service.getDlvChallanBrokerDtls(delivery_cid),
      this.DropDownListService.getItemThruSalesThruBUFastApi(BuUnit, this.company_name)
    ).subscribe(([deliveryChallanData, itemData, transData,
      partyData, docData, weightData, shipmentData, brokerData, ItemData]) => {
      this.item_codes = ItemData;
      if (deliveryChallanData["ref_type"] == "Loading Advice") {
        this.delvChallanPopupStatus = true;
      }
      console.log(JSON.stringify(deliveryChallanData));
      this.userForm.patchValue({
        id: deliveryChallanData["id"], challan_no: deliveryChallanData["challan_no"], inv_type: deliveryChallanData["inv_type"],
        challan_date: deliveryChallanData["challan_date"], price_term: deliveryChallanData["price_term"],
        cust_ref_doc_no: deliveryChallanData["cust_ref_doc_no"], date2: deliveryChallanData["date2"], remark: deliveryChallanData["remark"],
        confirmed_by: deliveryChallanData["confirmed_by"], approval: deliveryChallanData["approval"], reason: deliveryChallanData["reason"],
        ref_type: deliveryChallanData["ref_type"], party: deliveryChallanData["party"], grand_total: deliveryChallanData["grand_total"], business_unit: deliveryChallanData["business_unit"],
        delivery_cid: deliveryChallanData["delivery_cid"], company_id: deliveryChallanData["company_id"], fin_year: deliveryChallanData["fin_year"], referance_id: deliveryChallanData["referance_id"]
      });
      // console.log("order Details: "+  JSON.stringify(deliveryChallanData)); 

      this.onChangeBuUnit(deliveryChallanData["business_unit"]);
      this.onChangeParty(deliveryChallanData["party"]);
      let k = 0;
      this.addItem();
      this.item_sl_no = 0;
      while (this.delivery_challan_Item_Dtls.length)
        this.delivery_challan_Item_Dtls.removeAt(0);
      for (let data1 of itemData) {
        this.status = false;
        this.addItem();
        forkJoin(
          this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
          this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name)
        ).subscribe(([packingList, capacityEmptyWt]) => {
          this.capacity[k] = capacityEmptyWt.capacity;
          this.empty_bag_wt[k] = capacityEmptyWt.empty_big_wt;
          this.selectedPackingItem[k] = data1["packing"];
          this.selectedItemName[k] = data1["item_code"];
          this.packingItem[k] = packingList;
          this.delivery_challan_Item_Dtls.at(k).patchValue(data1);
          k = k + 1;
          this.status = true;
        });
      }

      //console.log("transData: "+  JSON.stringify(transData));
      this.delivery_challan_Trans_Info.patchValue(transData);

      // console.log("partyData: "+JSON.stringify(partyData));
      let i = 0;
      this.addParty();
      this.party_sl_no = 0;
      while (this.delivery_challan_Party_Dtls.length)
        this.delivery_challan_Party_Dtls.removeAt(0);
      for (let data1 of partyData) {
        this.status = false;
        this.DropDownListService.custAddDtlsRetriveList(data1["p_code"], this.company_name).subscribe(cName => {
          this.addParty();
          this.contNameList[i] = cName;
          this.selectedPartyName[i] = data1["p_code"];
          this.selectedContName[i] = data1["cp_name"];
          this.delivery_challan_Party_Dtls.at(i).patchValue(data1);
          i = i + 1;
          this.status = true;
        });
      }

      this.addDocument();
      while (this.delivery_challan_Docs.length)
        this.delivery_challan_Docs.removeAt(0);
      for (let data1 of docData)
        this.addDocument();
      this.delivery_challan_Docs.patchValue(docData);
      for (let data2 of docData)
        this.addDocumentlist();
      this.delivery_challan_docs_list.patchValue(docData);
      //console.log("docData: "+JSON.stringify(docData));

      //console.log("termsconData: "+  JSON.stringify(weightData));
      this.delivery_challan_weight_dtl.patchValue(weightData);

      this.delivery_challan_Shipment_Dtls.patchValue({
        ship_addr: shipmentData["ship_addr"],
        ship_details: shipmentData["ship_details"], pay_addr: shipmentData["pay_addr"], pay_details: shipmentData["pay_details"],
      });
      //  console.log("shipmentData: "+  JSON.stringify(shipmentData));

      let j = 0;
      this.addBroker();
      this.broker_sl_no = 0;
      while (this.delivery_challan_Broker_Dtls.length)
        this.delivery_challan_Broker_Dtls.removeAt(0);
      for (let data1 of brokerData) {
        this.addBroker();
        this.delivery_challan_Broker_Dtls.at(j).patchValue(data1);
        j = j + 1;
      }

      this.delivery_challan_Trans_Info.patchValue({ transportchargesadd: true, trans_borne_by: 'FOR' })


      if (this.delivery_challan_Trans_Info.get("trans_borne_by").value == "FOR") {

        /* this.Service.getDelivery_challan_Chgs_dyn(delivery_cid).subscribe(transportcharges=> */
        this.Service.getDelivery_challan_Chgs_dynDtls(delivery_cid).subscribe(transportcharges => {


          let y = 0;
          this.addChgs();
          this.chgs_sl_no = 0;
          while (this.delivery_challan_Chgs_dyn.length) { this.delivery_challan_Chgs_dyn.removeAt(0); }
          for (let chgsdyndata of transportcharges) {

            this.DropDownListService.getTransChargeCode(chgsdyndata['transporter_name'], chgsdyndata['transport_from'], chgsdyndata['transport_to'], 'Sales').subscribe(chrgcode => {
              this.ChargeList[y] = chrgcode;
              this.addChgs();
              this.selectedTransacc[y] = chgsdyndata["transportation_acc"];
              this.selectedTdsacc[y] = chgsdyndata["tds_acc"];
              this.selectedChgCode[y] = chgsdyndata["charge_code"];

              this.delivery_challan_Chgs_dyn.at(y).patchValue({ transport_from: chgsdyndata["transport_from"], transport_to: chgsdyndata["transport_to"] });

              this.delivery_challan_Chgs_dyn.at(y).patchValue(chgsdyndata);
              y = y + 1;
            })



          }
        })



      }
      else {


      }




      // console.log("brokerData: "+JSON.stringify(brokerData));
      if (localStorage.getItem("svalue") == 'true') {
        localStorage.setItem("svalue", 'false');
      }
      this.status = true;
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });
  }

  onPrint(id, delivery_cid,bunit) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {};
    let comp = this.company_name;
    let dialogRef = this.dialog.open(DeliveryChallanPrintPopupComponent, {
      data: { alldata: id, deliveryid: delivery_cid, company_name: comp,bunit:bunit }, height: '80%',
      width: '80%'
    });
    dialogRef.afterClosed().subscribe(data => {
      // this.sales_Invoice_Item_Dtls.at(index).patchValue({acc_norms: data["qc_code"]});
    });
  }
  
  onWeighmentPrint(grnid) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {};
    let comp = this.company_name;
    let dialogRef = this.dialog.open(DchallanWeighmentFromGrnPrintComponent, {
      data: { grnid: grnid, company_name: comp }, height: '80%',
      width: '80%'
    });
    dialogRef.afterClosed().subscribe(data => {
      // this.sales_Invoice_Item_Dtls.at(index).patchValue({acc_norms: data["qc_code"]});
    });
  }

  onDelete(id, delivery_cid) {
    this.status = false;
    if (confirm("Are you sure to delete this Delivery Challan ?")) {
      this.userForm.patchValue({ username: localStorage.getItem("username") });
      this.DropDownListService.checkDeliveryChallanUsage(delivery_cid).subscribe(checkDelvChallan => {
        ///let dataq=JSON.parse(checkItem);
        // alert("bidhan here::"+checkDelvChallan.status);
        if (checkDelvChallan.status == 'No') {
          this.Service.deleteDeliveryChallan(this.userForm.getRawValue(), id).subscribe(data => {
            alert("Delivery Challan Deleted successfully.");
            this.userForm.reset();
            this.status = true;
            this.isHidden = false;
            this.ngOnInit();
            this.showList("list");
          });
        }
        else {
          alert("This Delivery Challan is Already Used,Can not be Deleted!! ");
        }
      });
    }
    this.status = true;
  }

  getProducts(request) {
    // console.log("tuhin req "+request.size);
    this.DropDownListService.getDeliveryChallans_pagination(request.page, request.size)
      .subscribe(data => {
        this.listDeliveryChallan = data['content'];
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

  searchsaleorder(event) {
    this.status = true;
    let serchText = event.target.value;
    if (event.key == "Enter") {

      if (serchText == null || serchText == undefined || serchText == '' || serchText == '0') {
        this.getProducts({ page: "0", size: "10" });
        this.status = true;
      }
      else {
        //console.log("2" + serchText);
        this.DropDownListService.findsaleorder(serchText).subscribe(data => {
          this.listDeliveryChallan = data

          this.status = true;
        });
      }
    }

  }

  search() {
    let order1_no = this.userForm1.get("order1_no").value;
    let todate = this.userForm1.get("todate").value;
    let fromdate = this.userForm1.get("fromdate").value;
    let party1 = this.userForm1.get("party1").value;
    let finyear = localStorage.getItem("financial_year");
    // console.log("here " + JSON.stringify(order1_no+"fromdate"+fromdate+"todate"+todate+"party1"+party1+"finyear"+finyear))
    this.status = false;
    this.DropDownListService.searchDeliveryChallanFast("orderno=" + order1_no + "&fromdate=" + fromdate + "&todate=" + todate + "&party1=" + party1 + "&finyear=" + finyear).subscribe(data => {
      // console.log("here data comses " + JSON.stringify(data))
      this.listDeliveryChallan = data;
      this.status = true;

    }, (error) => {
      this.status = true;
      alert("Delivery Challan Not Found !!!")
      this.listDeliveryChallan = [];
    })
  }

  OnChangeModeofTransporter(mode) {
    if (mode.length) {
      this.delivery_challan_Trans_Info.patchValue({ mode_of_trans: mode })
    }
  }

  OnChangeTransporterNameChgs(transporter_id, index) {

    if (transporter_id.length) {
      this.delivery_challan_Trans_Info.patchValue({ trans_code: transporter_id })
      let transport_from = this.delivery_challan_Chgs_dyn.at(index).get("transport_from").value;
      let transport_to = this.delivery_challan_Chgs_dyn.at(index).get("transport_to").value;
      forkJoin
        (
          this.DropDownListService.getTransChargeCode(transporter_id, transport_from, transport_to, 'Sales'),
          this.Service.getTranstds(transporter_id)
        )
        .subscribe(([chgs, tds]) => {

          this.ChargeList[index] = chgs;
          this.delivery_challan_Chgs_dyn.at(index).patchValue({
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


  addChgs() {
    this.chgs_sl_no = this.chgs_sl_no + 1;

    this.delivery_challan_Chgs_dyn.push(this.fb.group({
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
    if (this.chgs_sl_no > 1) {
      this.delivery_challan_Chgs_dyn.removeAt(index);
      this.chgs_sl_no = this.chgs_sl_no - 1;
      this.delivery_challan_Chgs_dyn.at(index).patchValue({ slno: this.chgs_sl_no });
    }
    else {
      this.chgs_sl_no = 1;
      alert("can't delete all rows");
      this.delivery_challan_Chgs_dyn.reset();
      this.delivery_challan_Chgs_dyn.at(0).patchValue({ slno: this.chgs_sl_no });
    }
    for (let i = 1; i <= this.chgs_sl_no; i++)
      this.delivery_challan_Chgs_dyn.at(i - 1).patchValue({ slno: i });
  }


  onchangeTransChargeCode(index, chargeId) {
    if (chargeId.length) {
      this.delivery_challan_Trans_Info.patchValue({ charge_code: chargeId })
      this.ChargeList[index].forEach(ele => {
        if (ele.trans_charge_code == chargeId) {

          if (this.delivery_challan_Chgs_dyn.at(index).get("transport_rate").value == "PER TRUCK") {
            this.selectedTransacc[index] = ele.transportation_acc;
            this.selectedTdsacc[index] = ele.tds_acc;
            this.delivery_challan_Chgs_dyn.at(index).patchValue({
              chgs_rate_value: ele.full_truck_load_rate, distance_in_km: ele.distance_in_km,
              uom: ele.uom,
              tax_code: ele.tax_code,
              tax_rate: ele.tax_rate,
              transportation_acc: ele.transportation_acc,
              allowed_shortage: ele.allowed_shortage,
              deduction_basedon: ele.deduction_basedon
            });

            this.delivery_challan_Trans_Info.patchValue({ freight_amt: ele.full_truck_load_rate });

          }
          else {
            this.selectedTransacc[index] = ele.transportation_acc;
            this.selectedTdsacc[index] = ele.tds_acc;
            this.delivery_challan_Chgs_dyn.at(index).patchValue({
              chgs_rate_value: ele.rate_uom, distance_in_km: ele.distance_in_km,
              uom: ele.uom,
              tax_code: ele.tax_code,
              tax_rate: ele.tax_rate,
              transportation_acc: ele.transportation_acc,
              allowed_shortage: ele.allowed_shortage,
              deduction_basedon: ele.deduction_basedon
            });

            this.delivery_challan_Trans_Info.patchValue({ freight_amt: ele.rate_uom });
          }


        }
      })
      this.delivery_challan_Chgs_dyn.at(index).patchValue({ charge_code: chargeId });
    }
  }

  getTransacc(transacc, index) {
    //console.log("transacc:"+transacc)
    if (transacc.length) {
      this.delivery_challan_Chgs_dyn.at(index).patchValue({ transportation_acc: transacc })
    }
  }

  OnChangeTransportatinRate(transporter_rate, index) {
    console.log("enter")
    let chargecode = this.delivery_challan_Chgs_dyn.at(index).get("charge_code").value;
    this.OnChangeTransporterNameChgs(this.delivery_challan_Chgs_dyn.at(index).get("transporter_name").value, 0);
    if (transporter_rate.length) {
      this.delivery_challan_Trans_Info.patchValue({ transport_rate: transporter_rate })
      this.ChargeList[index].forEach(ele => {
        if (ele.trans_charge_code == chargecode) {
          if (this.delivery_challan_Chgs_dyn.at(index).get("transport_rate").value == "PER TRUCK") {
            this.delivery_challan_Chgs_dyn.at(index).patchValue({ chgs_rate_value: ele.full_truck_load_rate });
            this.delivery_challan_Trans_Info.patchValue({ freight_amt: ele.full_truck_load_rate });
          }
          else {
            this.delivery_challan_Chgs_dyn.at(index).patchValue({ chgs_rate_value: ele.rate_uom });
            this.delivery_challan_Trans_Info.patchValue({ freight_amt: ele.rate_uom });
          }
        }
      })
    }
  }
  changerate(rate) {
    console.log(rate)
    if (this.userForm.get("ref_type").value == "Loading Advice" && this.delivery_challan_Trans_Info.get("trans_borne_by").value == "FOR") {
      this.delivery_challan_Chgs_dyn.at(0).patchValue({ chgs_rate_value: rate });
    }
  }

  changeChgsRate(rate) {
    this.delivery_challan_Trans_Info.patchValue({ freight_amt: rate });
  }

  jobworkshow(event) {
    if (event.checked) {
      this.Jobworkshow = true;
      this.addItem();
      this.item_sl_no = 0;
      while (this.delivery_challan_Item_Dtls.length) { this.delivery_challan_Item_Dtls.removeAt(0); }
      this.selectedPackingItem = [];
      this.selectedItemName = [];
      this.packingItem = [];
      this.addItem();

    }
    else {
      this.Jobworkshow = false;
      this.addJobworkItem();
      this.jobwork_sl_no = 0;
      while (this.delivery_challan_Item_Dtls_for_jobwork.length) { this.delivery_challan_Item_Dtls_for_jobwork.removeAt(0); }

      this.jobpackinglist = [];
      this.selectedJobItem = [];
      this.selectedJobPacking = [];
      this.addJobworkItem();
    }
  }

  onClickShowDistance(id, delivery_cid) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {};

    let dialogRef = this.dialog.open(DelChallanDistancePopUpComponent, {
      data: { id: id, deliveryid: delivery_cid }, height: '80%',
      width: '80%'
    });
    dialogRef.afterClosed().subscribe(data => {

    });
  }
  onUpdateGatepass(id,challan,gatepass) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = { id: id, challan: challan,gatepass:gatepass};
      const dialogRef = this.dialog.open(UpdateGatepassComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => {
        //console.log("close:"+JSON.stringify(data))
        if(data=="Yes")
        {
          alert("Gatepass Updated Successfully..");
        }
      });
    }
}

