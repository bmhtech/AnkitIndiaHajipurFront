import { Component, OnInit } from '@angular/core';
import { Master } from '../../../../../../service/master.service';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { SalesQuoTaxModalComponent } from '../sales-quo-tax-modal/sales-quo-tax-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { SalesInvoice } from '../../../../../../Models/SalesTransaction/SalesInvoice';
import { DeliveryChallanPopUpComponent } from '../delivery-challan-pop-up/delivery-challan-pop-up.component';
import { SalesQcPopupComponent } from '../sales-qc-popup/sales-qc-popup.component';
import { forkJoin } from 'rxjs';
import { timer } from 'rxjs';
import { SalesBillPrintOptionsPopupComponent } from '../sales-bill-print-options-popup/sales-bill-print-options-popup.component';
import { SalesInvoiceAccountPostingComponent } from '../sales-invoice-account-posting/sales-invoice-account-posting.component';
import { MultiplediliverychallanComponent } from '../multiplediliverychallan/multiplediliverychallan.component';
import { Console } from 'console';
import { PageEvent } from '@angular/material';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { SalesInvoiceJobworkPopupComponent } from '../sales-invoice-jobwork-popup/sales-invoice-jobwork-popup.component';
import { SaleinvoicejobworkprintComponent } from '../saleinvoicejobworkprint/saleinvoicejobworkprint.component';
import { eInvoiceGenerate } from '../../../../../../Models/SalesTransaction/eInvoiceGenerate';
import { SalesInvoiceEinvoiceCancelComponent } from '../sales-invoice-einvoice-cancel/sales-invoice-einvoice-cancel.component';
import { UpdateArnNoComponent } from '../update-arn-no/update-arn-no.component';

@Component({
  selector: 'app-sales-invoice',
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.scss']
})

export class SalesInvoiceComponent implements OnInit {
  public userForm: FormGroup;
  model: SalesInvoice = new SalesInvoice();
  model1: eInvoiceGenerate = new eInvoiceGenerate();
  submitted = false;
  isHidden: any;
  currentDate: any;
  brokerNames: any = [];
  partyList: any = [];
  invoiceType: any = [];
  vehicleNoList: any = [];
  vehicleTypeList: any = [];
  Id: any;
  ledgerNames: any = [];
  item_codes: any = [];
  payTerms: any = [];
  acc_no: any;
  businesslists: any = [];
  trans_codes: any = [];
  bank_names: any = [];
  _customerId: any;
  payment_termsList: any = [];
  packingItem: any = [];
  company_name: any;
  item_sl_no = 1;
  broker_sl_no = 1;
  jobwork_sl_no = 1;
  listSalesInvoice: any[];
  sales_invoice_no: any;
  status: any;
  //username:any;
  show_Row: any;
  capacity: any = [];
  empty_bag_wt: any = [];
  _invoiceType: any;
  businessUnit: any;
  transporter_sl_no = 1;
  service_sl_no = 1;
  defaultValue: any;
  totalItem: number;
  totalDiscount: number;
  totalTaxAmt: number;
  grandTotal: number;
  appCharges: number;
  BuUnit = "0";
  adj1: number;
  adj2: number;
  tcsAmt: number;
  customerDelvAddList: any = [];
  financialYear: any;
  defaultChallan: any;
  action: any;
  salesinvoicesave: boolean = true;
  salesinvoiceupdate: boolean = true;
  salesinvoiceview: boolean = true;
  salesinvoicedelete: boolean = true;
  salesinvoiceprint: boolean = true;
  salesinvoiceposting: boolean = true;
  invoicePopupStatus: boolean = false;
  chargesIdList: any = [];
  myFiles: any = [];
  file_name: string;
  totalElements: number = 0;
  public userForm1: FormGroup;
  partyNameList: any = [];

  regsiterdgsi: boolean = false;
  einvoiceshow: boolean = false;
  isOpenJobwork: boolean = false;
  job_sl_no = 1;
  jobitemlist: any = [];
  selectedService: any = [];
  jobpackinglist: any = [];
  selectedJobItem: any = [];
  selectedJobPacking: any = [];
  item_services: any = [];
  Jobworkshow: boolean = false;
  taxcodelist: any = [];
  public einvoiceGeneration: FormGroup;
  public statusdto: FormGroup;
  public cancel: FormGroup;
  public ewaybillcreate: FormGroup;
  public ewaybillcancel: FormGroup;
  public responsedto: FormGroup;
  public ewaybillWOInvoiceGen: FormGroup;
  isOpenPolicy: boolean = false;
  onday: boolean = false;
  company_state:any;

  constructor(public fb: FormBuilder, public dialog: MatDialog,
    private Service: Master, private DropDownListService: DropdownServiceService) {
    this.userForm = fb.group(
      {
        id: [''],
        reference_id: [''],
        invoice_no: [''],
        invoice_id: [''],
        invoice_type: [''],
        business_unit: [''],
        invoice_date: [''],
        party: [''],
        state: [''],
        challan: [''],
        e_invoice_no: [''],
        remarks: [''],
        grand_total: [''],
        brokage_app: [''],
        item_total: [''],
        item_total_gl_ac: [''],
        discount: [''],
        discount_gl_ac: [''],
        tax_total: [''],
        tax_total_gl_ac: [''],
        applicable_amt: [''],
        applicable_gl_ac: [''],
        adj1_amt: [''],
        adj1_gl_ac: [''],
        adj2_amt: [''],
        adj2_gl_ac: [''],
        roundoff_amt: [''],
        roundoff_gl_ac: [''],
        tcsamt: [''],
        tcsglac: [''],
        payable_amt: [''],
        payable_amt_gl_ac: [''],
        salesorderno: [''],
        salesorderdate: [''],
        refchallanno: [''],
        refchallandate: [''],
        company_id: [''],
        fin_year: [''],
        username: [''],
        app_chgs_id: [''],
        tot_amt: [''],
        cust_refdocno: [''],
        cust_ref_doc_date: [''],
        waybill: [''],
        job_tot_amt: [''],
        jobwork: [''],
        policyno: [''],
        asn_no:[''],
        sales_Invoice_Trans_Dtls: this.fb.array([this.fb.group({
          slno: this.transporter_sl_no,
          transname: '',
          vehicletype: '',
          vehicleid: '',
          ewaybillno: '',
          ewaybilldate: '',

        })]),

        sales_Invoice_Docs: this.fb.array([this.fb.group({
          doctype: '',
          doc_name: '',
          doc_pdf: '',
          doc_file_name: ''
        })]),

        sales_Invoice_Docs_list: this.fb.array([this.fb.group({
          doctype: '',
          doc_name: '',
          doc_pdf: '',
          doc_file_name: ''
        })]),

        item_groupwise_summ: this.fb.array([this.fb.group({
          item_group: '',
          item_total: '',
          discount_amt: '',
          item_ledger: '',
          discount_ledger: ''
        })]),

        item_groupwise_hsnsumm: this.fb.array([this.fb.group({
          hsn_code: '',
          amount: '',
        })]),

        item_groupwise_taxsumm: this.fb.array([this.fb.group({
          tax_code: '',
          tax_rate: '',
          tax_amt: '',
          percentage: '',
          cgst: '',
          sgst: '',
          igst: '',
          cgstledgerid: '',
          sgstledgerid: '',
          igstledgerid: '',
          taxable_amt: ''
        })]),

        sales_Invoice_Item_Dtls: this.fb.array([this.fb.group({
          slno: this.item_sl_no,
          item_code: '',
          item_group: '',
          hsn_code: '',
          packing: '',
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

        sales_Invoice_Tax_Info: this.fb.group
          ({
            panno: '',
            tanno: '',
            cinno: '',
            gstno: '',
          }),

        sales_Invoice_Shipment_Dtls: this.fb.group({
          shipaddr: '',
          shipdtls: '',
          paytoaddr: '',
          paytodtls: '',
        }),

        sales_Invoice_Payment_Dtls: this.fb.group({
          mode_of_payment: '',
          payment_term: '',
          bank_name: '',
          account_name: '',
          account_no: '',
          branch: '',
          iban: '',
          bic_swift_code: '',
          adv_payment: '',
          ifsc_code: '',
          cash_limit: '',
          mobile: '',
          days: ''
        }),

        sales_Invoice_BP_Dtls: this.fb.group({
          sp_name: '',
          sp_phone: '',
          sp_fax: '',
          sp_email: '',
          sp_address: '',
          cp_name: '',
          cp_designation: '',
          cp_phone: '',
          cp_fax: '',
          cp_email: '',
          cp_address: ''
        }),

        sales_Invoice_Broker_Dtls: this.fb.array([this.fb.group(
          {
            slno: this.broker_sl_no,
            brokercode: '',
            basis: '',
            rate: ''
          })]),

        sales_Invoice_app_chgs: this.fb.array([this.fb.group({
          charges_name: '',
          add_less: '',
          rate_cal_method: '',
          app_rate: '',
          tax_rate: '0',
          amount: '0',
        })]),

        sales_Invoice_job_work: this.fb.array([this.fb.group({
          slno: this.job_sl_no,
          item_ledger: '',
          job_amount: '',
          cgst_amt: '',
          sgst_amt: '',
          igst_amt: ''
        })]),

        sales_Invoice_Item_Dtls_for_jobwork: this.fb.array([this.fb.group({
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
        sales_Invoice_Item_Dtls_for_jobwork_price: this.fb.array([this.fb.group({
          slno: this.service_sl_no,
          item_service: '',
          sac_code: '',
          job_price: '',
          tax_value: '',
          cgst_tax: '',
          cgst_amt: '',
          sgst_tax: '',
          sgst_amt: '',
          tot_amount: '',
          igst_tax: '',
          igst_amt: '',
          taxcode: ''
        })])


      });

    this.userForm1 = fb.group(
      {
        order1_no: [''],
        fromdate: [''],
        todate: [''],
        party1: [''],
      });

    this.einvoiceGeneration = fb.group(
      {
        Version: ['1.1'],
        ShipDtls: [''],
        TranDtls: this.fb.group({
          TaxSch: 'GST',
          SupTyp: '',
          IgstOnIntra: '',
          RegRev: '',
          EcmGstin: ''
        }),
        DocDtls: this.fb.group({
          Typ: 'INV',
          No: '',
          Dt: ''
        }),
        SellerDtls: this.fb.group({
          Gstin: '',
          LglNm: '',
          TrdNm: '',
          Addr1: '',
          Addr2: '',
          Loc: '',
          Pin: '',
          Stcd: '',
          Ph: '',
          Em: ''
        }),
        BuyerDtls: this.fb.group({
          Gstin: '',
          LglNm: '',
          TrdNm: '',
          Pos: '',
          Addr1: '',
          Addr2: '',
          Loc: '',
          Pin: '',
          Stcd: '',
          Ph: '',
          Em: ''
        }),
        ValDtls: this.fb.group({
          AssVal: '',
          IgstVal: '',
          CgstVal: '',
          SgstVal: '',
          StCesVal: '',
          Discount: '',
          OthChrg: '',
          RndOffAmt: '',
          TotInvVal: ''
        }),
        ItemList: this.fb.array([this.fb.group({
          SlNo: '',
          PrdDesc: '',
          IsServc: '',
          HsnCd: '',
          Qty: '',
          Unit: '',
          UnitPrice: '',
          TotAmt: '',
          Discount: '',
          PreTaxVal: '',
          AssAmt: '',
          GstRt: '',
          IgstAmt: '',
          CgstAmt: '',
          SgstAmt: '',
          CesRt: '',
          CesAmt: '',
          CesNonAdvlAmt: '',
          StateCesRt: '',
          StateCesAmt: '',
          StateCesNonAdvlAmt: '',
          OthChrg: '',
          TotItemVal: ''
        })]),

      });
    this.statusdto = fb.group(
      {
        status: ['']
      });

    this.cancel = fb.group(
      {
        Irn: [''],
        CnlRsn: [''],
        CnlRem: [''],
      });

    this.ewaybillcreate = fb.group(
      {
        Irn: [''],
        Distance: [''],
        TransMode: [''],
        TransId: [''],
        TransName: [''],
        TrnDocDt: [''],
        TrnDocNo: [''],
        VehNo: [''],
        VehType: [''],

      });

    this.ewaybillcancel = fb.group(
      {
        ewbNo: [''],
        cancelRsnCode: [''],
        cancelRmrk: [''],
      });

    this.responsedto = fb.group(
      {
        status: [''],
        cancel_message: ['']
      });

    this.ewaybillWOInvoiceGen = fb.group(
      {
        supplyType: [''],
        subSupplyType: [''],
        subSupplyDesc: [''],
        docType: [''],
        docNo: [''],
        docDate: [''],
        fromGstin: [''],
        fromTrdName: [''],
        fromAddr1: [''],
        fromAddr2: [''],
        fromPlace: [''],
        fromPincode: [''],
        actFromStateCode: [''],
        fromStateCode: [''],
        toGstin: [''],
        toTrdName: [''],
        toAddr1: [''],
        toAddr2: [''],
        toPlace: [''],
        toPincode: [''],
        actToStateCode: [''],
        toStateCode: [''],
        transactionType: [''],
        dispatchFromGSTIN: [''],
        dispatchFromTradeName: [''],
        shipToGSTIN: [''],
        shipToTradeName: [''],
        otherValue: [''],
        totalValue: [''],
        cgstValue: [''],
        sgstValue: [''],
        igstValue: [''],
        cessValue: [''],
        cessNonAdvolValue: [''],
        totInvValue: [''],
        transporterId: [''],
        transporterName: [''],
        transDocNo: [''],
        transMode: [''],
        transDistance: [''],
        transDocDate: [''],
        vehicleNo: [''],
        vehicleType: [''],
        ItemList: this.fb.array([this.fb.group({
          productName: '',
          productDesc: '',
          hsnCode: '',
          quantity: '',
          qtyUnit: '',
          cgstRate: '',
          sgstRate: '',
          igstRate: '',
          cessRate: '',
          cessNonAdvol: '',
          taxableAmount: ''
        })]),

      });
  }
  get order1_no() { return this.userForm1.get("order1_no") as FormControl }
  get fromdate() { return this.userForm1.get("fromdate") as FormControl }
  get todate() { return this.userForm1.get("todate") as FormControl }
  get party1() { return this.userForm1.get("party1") as FormControl }

  get asn_no() { return this.userForm.get("asn_no") as FormControl }
  get waybill() { return this.userForm.get("waybill") as FormControl }
  get id() { return this.userForm.get("id") as FormControl }
  get invoice_id() { return this.userForm.get("invoice_id") as FormControl }
  get invoice_no() { return this.userForm.get("invoice_no") as FormControl }
  get state() { return this.userForm.get("state") as FormControl }
  get invoice_date() { return this.userForm.get("invoice_date") as FormControl }
  get invoice_type() { return this.userForm.get("invoice_type") as FormControl }
  get business_unit() { return this.userForm.get("business_unit") as FormControl }
  get e_invoice_no() { return this.userForm.get("e_invoice_no") as FormControl }
  get party() { return this.userForm.get("party") as FormControl }
  get salesorderno() { return this.userForm.get("salesorderno") as FormControl }
  get salesorderdate() { return this.userForm.get("salesorderdate") as FormControl }
  get refchallanno() { return this.userForm.get("refchallanno") as FormControl }
  get refchallandate() { return this.userForm.get("refchallandate") as FormControl }
  get brokage_app() { return this.userForm.get("brokage_app") as FormControl }
  get remarks() { return this.userForm.get("remarks") as FormControl }
  get challan() { return this.userForm.get("challan") as FormControl }
  get grand_total() { return this.userForm.get("grand_total") as FormControl }
  get item_total() { return this.userForm.get("item_total") as FormControl }
  get item_total_gl_ac() { return this.userForm.get("item_total_gl_ac") as FormControl }
  get discount() { return this.userForm.get("discount") as FormControl }
  get discount_gl_ac() { return this.userForm.get("discount_gl_ac") as FormControl }
  get tax_total() { return this.userForm.get("tax_total") as FormControl }
  get tax_total_gl_ac() { return this.userForm.get("tax_total_gl_ac") as FormControl }
  get applicable_amt() { return this.userForm.get("applicable_amt") as FormControl }
  get applicable_gl_ac() { return this.userForm.get("applicable_gl_ac") as FormControl }
  get adj1_amt() { return this.userForm.get("adj1_amt") as FormControl }
  get adj1_gl_ac() { return this.userForm.get("adj1_gl_ac") as FormControl }
  get adj2_amt() { return this.userForm.get("adj2_amt") as FormControl }
  get adj2_gl_ac() { return this.userForm.get("adj2_gl_ac") as FormControl }
  get roundoff_amt() { return this.userForm.get("roundoff_amt") as FormControl }
  get roundoff_gl_ac() { return this.userForm.get("roundoff_gl_ac") as FormControl }
  get tcsamt() { return this.userForm.get("tcsamt") as FormControl }
  get tcsglac() { return this.userForm.get("tcsglac") as FormControl }
  get payable_amt() { return this.userForm.get("payable_amt") as FormControl }
  get payable_amt_gl_ac() { return this.userForm.get("payable_amt_gl_ac") as FormControl }
  get app_chgs_id() { return this.userForm.get("app_chgs_id") as FormControl }
  get tot_amt() { return this.userForm.get("tot_amt") as FormControl }
  get job_tot_amt() { return this.userForm.get("job_tot_amt") as FormControl }
  get jobwork() { return this.userForm.get("jobwork") as FormControl }
  get policyno() { return this.userForm.get("policyno") as FormControl }

  get sales_Invoice_Payment_Dtls() { return this.userForm.get('sales_Invoice_Payment_Dtls') as FormGroup; }
  get sales_Invoice_Shipment_Dtls() { return this.userForm.get('sales_Invoice_Shipment_Dtls') as FormGroup; }
  get sales_Invoice_Tax_Info() { return this.userForm.get('sales_Invoice_Tax_Info') as FormGroup; }
  get sales_Invoice_Broker_Dtls() { return this.userForm.get("sales_Invoice_Broker_Dtls") as FormArray };

  get sales_Invoice_Item_Dtls_for_jobwork() { return this.userForm.get("sales_Invoice_Item_Dtls_for_jobwork") as FormArray };
  get sales_Invoice_Item_Dtls_for_jobwork_price() { return this.userForm.get("sales_Invoice_Item_Dtls_for_jobwork_price") as FormArray };

  get sales_Invoice_Item_Dtls() { return this.userForm.get("sales_Invoice_Item_Dtls") as FormArray };
  get sales_Invoice_Trans_Dtls() { return this.userForm.get("sales_Invoice_Trans_Dtls") as FormArray };
  get sales_Invoice_Docs() { return this.userForm.get("sales_Invoice_Docs") as FormArray };
  get sales_Invoice_Docs_list() { return this.userForm.get('sales_Invoice_Docs_list') as FormArray; }
  get item_groupwise_summ() { return this.userForm.get("item_groupwise_summ") as FormArray };
  get item_groupwise_taxsumm() { return this.userForm.get("item_groupwise_taxsumm") as FormArray };
  get sales_Invoice_BP_Dtls() { return this.userForm.get('sales_Invoice_BP_Dtls') as FormGroup; }
  get item_groupwise_hsnsumm() { return this.userForm.get("item_groupwise_hsnsumm") as FormArray };
  get sales_Invoice_app_chgs() { return this.userForm.get('sales_Invoice_app_chgs') as FormArray; }
  get sales_Invoice_job_work() { return this.userForm.get('sales_Invoice_job_work') as FormArray; }
  get cust_refdocno() { return this.userForm.get("cust_refdocno") as FormControl }
  get cust_ref_doc_date() { return this.userForm.get("cust_ref_doc_date") as FormControl }


  get Version() { return this.einvoiceGeneration.get("Version") as FormControl }
  get ShipDtls() { return this.einvoiceGeneration.get("ShipDtls") as FormControl }
  get TranDtls() { return this.einvoiceGeneration.get('TranDtls') as FormGroup; }
  get DocDtls() { return this.einvoiceGeneration.get('DocDtls') as FormGroup; }
  get SellerDtls() { return this.einvoiceGeneration.get('SellerDtls') as FormGroup; }
  get BuyerDtls() { return this.einvoiceGeneration.get('BuyerDtls') as FormGroup; }
  get ValDtls() { return this.einvoiceGeneration.get('ValDtls') as FormGroup; }

  get ItemList() { return this.einvoiceGeneration.get('ItemList') as FormArray; }

  get ItemList1() { return this.ewaybillWOInvoiceGen.get('ItemList') as FormArray; }

  ngOnInit() {
    //For User Role
    this.einvoiceshow = false;
    let accessdata = JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
    this.salesinvoicesave = false;
    this.salesinvoiceupdate = false;
    this.salesinvoiceview = false;
    this.salesinvoicedelete = false;
    this.salesinvoiceprint = false;
    this.salesinvoiceposting = false;

    if (accessdata.includes('sales_invoice.save')) {
      this.salesinvoicesave = true;
    }
    if (accessdata.includes('sales_invoice.update')) {
      this.salesinvoiceupdate = true;
    }
    if (accessdata.includes('sales_invoice.view')) {
      this.salesinvoiceview = true;
    }
    if (accessdata.includes('sales_invoice.delete')) {
      this.salesinvoicedelete = true;
    }
    if (accessdata.includes('sales_invoice.print')) {
      this.salesinvoiceprint = true;
    }
    if (accessdata.includes('sales_invoice.posting')) {
      this.salesinvoiceposting = true;
    }

    this.status = false;
    this.isHidden = false;
    this.acc_no = "NA"
    this.show_Row = false;
    this.capacity = [];
    this.empty_bag_wt = [];
    this.packingItem = [];
    this.grandTotal = 0;
    this._invoiceType = "0";
    this.businessUnit = "0";
    this.defaultValue = 0;
    this.totalItem = 0;
    this.totalDiscount = 0;
    this.totalTaxAmt = 0;
    this.appCharges = 0;
    this.adj1 = 0;
    this.adj2 = 0;
    this.tcsAmt = 0;
    this._customerId = "0";
    this.BuUnit = "0";
    this.defaultChallan = 'Single';
    this.action = 'update';
    this.isOpenJobwork = false;
    // this.getProducts({ page: "0", size: "10" });
    for (let i = 0; i < this.sales_Invoice_Broker_Dtls.length; i++) {
      this.sales_Invoice_Broker_Dtls.at(i).patchValue({ brokercode: "0" });
    }

    for (let i = 0; i < this.sales_Invoice_Trans_Dtls.length; i++) {
      this.sales_Invoice_Trans_Dtls.at(i).patchValue({ transname: "0", vehicletype: "0", vehicleid: "0" });
    }

    this.company_name = localStorage.getItem("company_name");
    // this.username = localStorage.getItem("username");
    this.financialYear = localStorage.getItem("financial_year");
    //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
    if ((this.currentDate >= formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en')) && (this.currentDate <= formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en'))) {
      //console.log("sucess");
    }
    else {
      alert("Selected  date is not in Selected Financial period!!!!!!")
      this.currentDate = formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
    }
    forkJoin(
      this.DropDownListService.getInvSalesTypes(),
      this.DropDownListService.getAccPayTerms(),
      this.DropDownListService.payTermNameList(),
      this.DropDownListService.getBankLedger(),
      //this.DropDownListService.custometrBusList(this.company_name),
      this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
      this.DropDownListService.ledgerNameList(),
      //this.DropDownListService.brokerNameList(),
      this.DropDownListService.brokerNameListFast(),
      //this.Service.getSalesInvoice("company="+this.company_name),
      //this.DropDownListService.transporterNamesList(),
      this.DropDownListService.getTransporterMNCListFast(),
      //this.DropDownListService.getVehicleThruWeighment(),
      // this.DropDownListService.getVehicleThruWeighmentfast(),
      this.DropDownListService.allVechileList(),
      this.DropDownListService.vehicleCodeList(),
      this.DropDownListService.getChargeMasterList(),
      // this.DropDownListService.customerNameCodeList(this.company_name)
      this.DropDownListService.newcustomerList(this.company_name),
      this.DropDownListService.getSalesInvoiceDataList(this.currentDate, this.financialYear)
      //this.DropDownListService.getSalesInvoiceDataListFast(this.currentDate, this.financialYear)
    ).subscribe(([invoiceData, accPayTermsData, payTermData, bankList,
      custometrBusListData, ledgerData, brokerNameList,
      //  salesInvoiceList, transporterData, vehNoData, vehTypeList,ChargeMasterData])=>
      transporterData, vehNoData, vehTypeList, ChargeMasterData, customerData, salesInvoiceDataList]) => {
      // console.log("vehicle list::"+JSON.stringify(vehNoData))
      this.partyNameList = customerData;
      this.invoiceType = invoiceData;
      this.payment_termsList = accPayTermsData;
      this.payTerms = payTermData;
      this.bank_names = bankList;
      this.businesslists = custometrBusListData;
      this.ledgerNames = ledgerData;

      this.brokerNames = brokerNameList;
      this.listSalesInvoice = salesInvoiceDataList;
      this.trans_codes = transporterData;
      this.vehicleNoList = vehNoData;
      this.vehicleTypeList = vehTypeList;
      this.chargesIdList = ChargeMasterData;
      console.log("list data:" + JSON.stringify(salesInvoiceDataList))
      this.userForm.patchValue({ party: "0", invoice_type: "0", reference_id: "0" });
      this.sales_Invoice_Shipment_Dtls.patchValue({ paytoaddr: "0" });
      this.sales_Invoice_Payment_Dtls.patchValue({ payment_term: "0" })
      this.sales_Invoice_Item_Dtls.at(0).patchValue({
        squantity: 0, quantity: 0,
        mat_wt: 0, price: 0, price_based_on: "0", discount_rate: 0, discount_type: "0",
        tax_rate: 0, amount: 0.00, discount_amt: 0.00, tax_amt: 0.00
      });
      this.userForm.patchValue({
        item_total_gl_ac: "0", applicable_gl_ac: "0",
        discount_gl_ac: "0", tax_total_gl_ac: "0",
        // roundoff_gl_ac:"IA00001", cash_dis_gl_ac:"0",
        roundoff_gl_ac: "0",
        cash_dis_gl_ac: "0",
        adj1_gl_ac: "0", adj2_gl_ac: "0", net_gl_ac: "0",
        tcsglac: "CC00300004", payable_amt_gl_ac: "0", business_unit: "0"
      });
      this.status = true;
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });

    if (localStorage.getItem("svalue") == 'true') {
      this.onUpdate(localStorage.getItem("sid"), localStorage.getItem("sno"), localStorage.getItem("saction"));
    }
  }

  showList(s: string) {
    if (this.salesinvoicesave == true && this.salesinvoiceupdate == true)//true exist  false not exist
    {
      if (s == "add") {
        this.Jobworkshow = false;
        this.isHidden = true;
        this.einvoiceshow = false;
        console.log(" invoice " + this.einvoiceshow)
        this.BuUnit = "0";
        for (let i = 0; i < this.sales_Invoice_Trans_Dtls.length; i++) {
          this.sales_Invoice_Trans_Dtls.at(i).patchValue({ transname: "0", vehicletype: "0", vehicleid: "0" });
        }
        for (let i = 0; i < this.sales_Invoice_Broker_Dtls.length; i++) {
          this.sales_Invoice_Broker_Dtls.at(i).patchValue({ brokercode: "0" });
        }
        this.userForm.patchValue({
          item_total_gl_ac: "0", applicable_gl_ac: "0",
          discount_gl_ac: "0", tax_total_gl_ac: "0",
          // roundoff_gl_ac:"IA00001", cash_dis_gl_ac:"0",
          cash_dis_gl_ac: "0",
          adj1_gl_ac: "0", adj2_gl_ac: "0", net_gl_ac: "0",
          tcsglac: "0", payable_amt_gl_ac: "0", business_unit: "0", roundoff_gl_ac: "IB00001"
        });
      }
    }
    if (this.salesinvoicesave == true && this.salesinvoiceupdate == false) {

      if (s == "add") {
        this.isHidden = true;
        this.Jobworkshow = false;
        this.einvoiceshow = false;

        console.log(" invoice " + this.einvoiceshow)
        this.BuUnit = "0";
        for (let i = 0; i < this.sales_Invoice_Trans_Dtls.length; i++) {
          this.sales_Invoice_Trans_Dtls.at(i).patchValue({ transname: "0", vehicletype: "0", vehicleid: "0" });
        }
        for (let i = 0; i < this.sales_Invoice_Broker_Dtls.length; i++) {
          this.sales_Invoice_Broker_Dtls.at(i).patchValue({ brokercode: "0" });
        }
        this.userForm.patchValue({
          item_total_gl_ac: "0", applicable_gl_ac: "0",
          discount_gl_ac: "0", tax_total_gl_ac: "0",
          // roundoff_gl_ac:"IA00001", cash_dis_gl_ac:"0",
          cash_dis_gl_ac: "0",
          adj1_gl_ac: "0", adj2_gl_ac: "0", net_gl_ac: "0",
          tcsglac: "CC00300004", payable_amt_gl_ac: "0", business_unit: "0", roundoff_gl_ac: "IB00001"
        });
      }
    }

    if (s == "list") {
      this.isHidden = false;
      this.einvoiceshow = false;
      this.Jobworkshow = false;
      this.BuUnit = "0";

      for (let i = 0; i < this.sales_Invoice_Trans_Dtls.length; i++) {
        this.sales_Invoice_Trans_Dtls.at(i).patchValue({ transname: "0", vehicletype: "0", vehicleid: "0" });
      }
      for (let i = 0; i < this.sales_Invoice_Broker_Dtls.length; i++) {
        this.sales_Invoice_Broker_Dtls.at(i).patchValue({ brokercode: "0" });
      }
      this.userForm.reset();
      this.sales_Invoice_Payment_Dtls.reset();
      this.sales_Invoice_Tax_Info.reset();
      this.sales_Invoice_BP_Dtls.reset();
      this.sales_Invoice_Shipment_Dtls.reset();

      this.packingItem = [];
      this.item_sl_no = 0;
      this.job_sl_no = 0;
      while (this.sales_Invoice_Item_Dtls.length)
        this.sales_Invoice_Item_Dtls.removeAt(0);
      this.addItem();

      this.broker_sl_no = 0;
      while (this.sales_Invoice_Broker_Dtls.length)
        this.sales_Invoice_Broker_Dtls.removeAt(0);
      this.addBrokers();

      while (this.sales_Invoice_Docs.length)
        this.sales_Invoice_Docs.removeAt(0);
      this.addDocument();

      this.transporter_sl_no = 0;
      while (this.sales_Invoice_Trans_Dtls.length)
        this.sales_Invoice_Trans_Dtls.removeAt(0);
      this.addTransporter();

      while (this.item_groupwise_taxsumm.length)
        this.item_groupwise_taxsumm.removeAt(0);
      this.addItemGrpTax();

      while (this.item_groupwise_hsnsumm.length)
        this.item_groupwise_hsnsumm.removeAt(0);
      this.addItemGrpHsn();

      while (this.item_groupwise_summ.length)
        this.item_groupwise_summ.removeAt(0);
      this.addItemGrp();

      //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      let accessdata = JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
      this.salesinvoicesave = false;
      this.salesinvoiceupdate = false;
      this.salesinvoiceview = false;
      this.salesinvoicedelete = false;
      this.salesinvoiceprint = false;
      this.salesinvoiceposting = false;

      if (accessdata.includes('sales_invoice.save')) {
        this.salesinvoicesave = true;
      }
      if (accessdata.includes('sales_invoice.update')) {
        this.salesinvoiceupdate = true;
      }
      if (accessdata.includes('sales_invoice.view')) {
        this.salesinvoiceview = true;
      }
      if (accessdata.includes('sales_invoice.delete')) {
        this.salesinvoicedelete = true;
      }
      if (accessdata.includes('sales_invoice.print')) {
        this.salesinvoiceprint = true;
      }
      if (accessdata.includes('sales_invoice.posting')) {
        this.salesinvoiceposting = true;
      }

    }
  }
  getApplicableCharges(event) {
    this.appCharges = parseFloat(event.target.value);
    this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
      this.appCharges, this.adj1, this.adj2, this.tcsAmt)
  }

  getAdj1(event) {
    this.adj1 = parseFloat(event.target.value);
    this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
      this.appCharges, this.adj1, this.adj2, this.tcsAmt)
  }

  getAdj2(event) {
    this.adj2 = parseFloat(event.target.value);
    this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
      this.appCharges, this.adj1, this.adj2, this.tcsAmt)
  }

  getTcs(event) {
    this.tcsAmt = parseFloat(event.target.value);
    this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
      this.appCharges, this.adj1, this.adj2, this.tcsAmt)
  }

  calculateFinalBillAmt(amt, dscAmt, taxAmt, appCharges, adj1, adj2, tcs) {
    let Amt = amt;
    //console.log(" final amount " + Amt)
    let netAmt = amt - dscAmt;
    let totalAmt = netAmt + taxAmt;
    let finalBillamount = totalAmt + appCharges + adj1 - adj2;
    this.userForm.patchValue({
      item_total: Amt.toFixed(2),
      discount: dscAmt.toFixed(2),
      tax_total: taxAmt.toFixed(2)
    })

    //  this.calRoundOfFigure(finalBillamount, tcs);


    let PartyName: any;
    PartyName = this.userForm.get("party").value as FormControl;

    let totlround = Math.round(finalBillamount);

    let totlWithoutround = finalBillamount.toFixed(2);
    this.RoundOff = (totlround - Number(totlWithoutround)).toFixed(2);

    this.userForm.patchValue({ payable_amt: totlround.toFixed(2) })
    console.log("payable_amt " + this.userForm.get("payable_amt").value)
    this.Service.custAccountRetriveList(PartyName).subscribe(data => {

      this.TcsAmt1 = (Number(totlround * data.tcs_rate) / 100).toFixed(2);
      this.userForm.patchValue({ tcsamt: this.TcsAmt1 });
      let t = Number(totlround) + Number(this.TcsAmt1)
      // this.userForm.patchValue({payable_amt:t.toFixed(2)})
      //  console.log("payable_amt "+this.userForm.get("payable_amt").value)
    }
    );
    // this.userForm.patchValue({roundoff_amt:this.RoundOff});//offon 19092022

    let roundOfAmt = Math.round(finalBillamount * 100) % 100;
    //start here 19092022
    if (roundOfAmt >= 50) {
      roundOfAmt = 100 - roundOfAmt;
      // console.log("roundOfAmt if "+ roundOfAmt)
      this.userForm.patchValue({ roundoff_amt: Number(Number(roundOfAmt) / 100).toFixed(2) })
    }
    else {
      this.userForm.patchValue({ roundoff_amt: Number(0 - Number(roundOfAmt) / 100).toFixed(2) });
    };



  }

  RoundOff: any;


  onChangeInvoiceType(event) {

    if (event.length) {
      this._invoiceType = event;
      // alert(this._invoiceType)
      this.status = false;
      if (this.userForm.get("id").value > 0) {
        console.log(" True ")
      }
      else {
        console.log(" False ")
        this.DropDownListService.getSISequenceId(this.financialYear + "/" + event).subscribe(data => {
          this.sales_invoice_no = data.sequenceid;
          this.status = true;
        });
      }
      if (event == 'INV00003') {
        this.isOpenJobwork = true;
        this.Service.taxCodeDtlsRetriveList("TC00002").subscribe(taxlist => {
          this.taxcodelist = taxlist;
          this.status = true;
        });

      }
      else {
        this.isOpenJobwork = false;
      }
    }
  }

  onChangeBusinessUnit(event) {

    if (event.length && event != "0") {
      this.businessUnit = event;
      this.status = false;
      //this.DropDownListService.getCustomerThruBU(event).subscribe(data=>
      this.DropDownListService.getCustomerThruBUnewlist(event).subscribe(data => {
        this.partyList = data;
        console.log(" True " + JSON.stringify(data));
        this.status = true;
      });
    }
  }



  addItemGrp() {
    this.item_groupwise_summ.push(this.fb.group({
      item_group: '',
      item_total: '',
      discount_amt: '',
      item_ledger: '',
      discount_ledger: ''
    }))
  }

  addItemGrpTax() {
    this.item_groupwise_taxsumm.push(this.fb.group({
      tax_code: '',
      tax_rate: '',
      tax_amt: '',
      percentage: '',
      cgst: '',
      sgst: '',
      igst: '',
      cgstledgerid: '',
      sgstledgerid: '',
      igstledgerid: '',
      taxable_amt: ''
    }))
  }

  addItemGrpHsn() {
    this.item_groupwise_hsnsumm.push(this.fb.group({
      hsn_code: '',
      amount: '',
    }))
  }
  addAppCharfes() {
    this.sales_Invoice_app_chgs.push(this.fb.group({
      charges_name: '',
      add_less: '',
      rate_cal_method: '',
      app_rate: '',
      tax_rate: '0',
      amount: '0'
    }));
  }
  addJobWork() {
    this.job_sl_no = this.job_sl_no + 1;
    this.sales_Invoice_job_work.push(this.fb.group({
      slno: this.job_sl_no,
      item_ledger: '',
      job_amount: '',
      cgst_amt: '',
      sgst_amt: '',
      igst_amt: ''
    }));
  }

  addItem() {
    this.item_sl_no = this.item_sl_no + 1;
    this.sales_Invoice_Item_Dtls.push(this.fb.group({
      slno: this.item_sl_no,
      item_code: '',
      item_group: '',
      hsn_code: '',
      packing: '',
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
      acc_norms: ''
    }))
    this.sales_Invoice_Item_Dtls.at(this.item_sl_no - 1).patchValue({
      squantity: 0, quantity: 0,
      mat_wt: 0, price: 0, price_based_on: "0", discount_rate: 0, discount_type: "0",
      tax_rate: 0, amount: 0.00, discount_amt: 0.00, tax_amt: 0.00
    });
  }

  deleteItem(index) {
    if (this.item_sl_no > 1) {
      this.amt = this.sales_Invoice_Item_Dtls.at(index).get("amount").value as FormControl;
      this._discount = this.sales_Invoice_Item_Dtls.at(index).get("discount_amt").value as FormControl;
      this._taxAmt = this.sales_Invoice_Item_Dtls.at(index).get("tax_amt").value as FormControl;
      this.grandTotal = this.grandTotal - (this.amt + this._taxAmt - this._discount);
      this.totalItem = this.totalItem - this.amt;
      this.totalDiscount = this.totalDiscount - this._discount;
      this.totalTaxAmt = this.totalTaxAmt - this._taxAmt;
      this.packingItem.splice(index, 1);
      this.capacity.splice(index, 1);
      // this.empty_bag_wt(index, 1)
      this.sales_Invoice_Item_Dtls.removeAt(index);
      this.item_sl_no = this.item_sl_no - 1;
    }
    else {
      this.item_sl_no = 1;
      alert("can't delete all rows");
      this.sales_Invoice_Item_Dtls.reset();
      this.sales_Invoice_Item_Dtls.at(0).patchValue({ slno: this.item_sl_no });
      this.totalItem = 0;
      this.totalDiscount = 0;
      this.totalTaxAmt = 0;
      this.appCharges = 0;
      this.adj1 = 0;
      this.adj2 = 0;
      this.tcsAmt = 0;
      this.userForm.patchValue({
        grand_total: 0.00, item_total: 0, discount: 0,
        tax_total: 0, applicable_amt: 0,
        adj1_amt: 0, adj2_amt: 0, roundoff_amt: 0, tcsamt: 0, payable_amt: 0
      })

      this.sales_Invoice_Item_Dtls.at(this.item_sl_no - 1).patchValue({
        squantity: 0, quantity: 0,
        mat_wt: 0, price: 0, price_based_on: "0", discount_rate: 0, discount_type: "0",
        tax_rate: 0, amount: 0.00, discount_amt: 0.00, tax_amt: 0.00
      });
    }

    for (let i = 1; i <= this.item_sl_no; i++)
      this.sales_Invoice_Item_Dtls.at(i - 1).patchValue({ slno: i });

  }

  addBrokers() {
    this.broker_sl_no = this.broker_sl_no + 1;
    this.sales_Invoice_Broker_Dtls.push(this.fb.group({
      slno: this.broker_sl_no,
      brokercode: '',
      basis: '',
      rate: '',
    }))
    for (let i = 0; i < this.sales_Invoice_Broker_Dtls.length; i++) {
      this.sales_Invoice_Broker_Dtls.at(i).patchValue({ brokercode: "0" });
    }
  }

  deleteBrokers(index) {
    if (this.broker_sl_no > 1) {
      this.sales_Invoice_Broker_Dtls.removeAt(index);
      this.broker_sl_no = this.broker_sl_no - 1;
    }
    else {
      this.broker_sl_no = 1;
      alert("can't delete all rows");
      this.sales_Invoice_Broker_Dtls.reset();
      this.sales_Invoice_Broker_Dtls.at(0).patchValue({ slno: this.broker_sl_no });
    }

    for (let i = 1; i <= this.broker_sl_no; i++)
      this.sales_Invoice_Broker_Dtls.at(i - 1).patchValue({ slno: i });
  }

  addTransporter() {
    this.transporter_sl_no = this.transporter_sl_no + 1;
    this.sales_Invoice_Trans_Dtls.push(this.fb.group({
      slno: this.transporter_sl_no,
      transname: '',
      vehicletype: '',
      vehicleid: '',
      ewaybillno: '',
      ewaybilldate: ''
    }))
    for (let i = 0; i < this.sales_Invoice_Trans_Dtls.length; i++) {
      this.sales_Invoice_Trans_Dtls.at(i).patchValue({ transname: "0", vehicletype: "0", vehicleid: "0" });
    }
  }

  deleteTransporter(index) {
    if (this.transporter_sl_no > 1) {
      this.sales_Invoice_Trans_Dtls.removeAt(index);
      this.transporter_sl_no = this.transporter_sl_no - 1;
    }
    else {
      this.transporter_sl_no = 1;
      alert("can't delete all rows");
      this.sales_Invoice_Trans_Dtls.reset();
      this.sales_Invoice_Trans_Dtls.at(0).patchValue({ slno: this.transporter_sl_no });
    }

    for (let i = 1; i <= this.transporter_sl_no; i++)
      this.sales_Invoice_Trans_Dtls.at(i - 1).patchValue({ slno: i });
  }

  addDocument() {
    this.sales_Invoice_Docs.push(this.fb.group({
      doctype: '',
      doc_name: '',
      doc_pdf: '',
      doc_file_name: ''
    }))
  }
  addDocumentlist() {
    this.sales_Invoice_Docs_list.push(this.fb.group({
      doctype: '',
      doc_name: '',
      doc_pdf: '',
      doc_file_name: ''
    }));
  }

  deleteDocument(index) {
    if (index) { this.sales_Invoice_Docs.removeAt(index); }
    else {
      alert("Can not delete all rows");
      this.sales_Invoice_Docs.reset();
    }
  }
  deleteDocumentlist(index) {
    this.sales_Invoice_Docs_list.removeAt(index);
  }

  onChangeBuUnit(BuUnit: string) {
    this.status = false;
    if (BuUnit.length) {
      //  console.log("BuUnit  "+ BuUnit)
      forkJoin(
        //this.DropDownListService.getCustomerThruBU(BuUnit),
        this.DropDownListService.getCustomerThruBUnewlist(BuUnit),
        //this.DropDownListService.getItemThruSalesThruBU(BuUnit, this.company_name),
        this.DropDownListService.getItemThruSalesThruBUFastApi(BuUnit, this.company_name),
        this.DropDownListService.getCompanyBussinessUnitDetails(localStorage.getItem("company_name"),BuUnit)
      ).subscribe(([PartyData, ItemData,companystate]) => {
        //console.log(" hello tuhin 1" + JSON.stringify(PartyData))
        console.log(" hello tuhin 2" + JSON.stringify(ItemData))
       //console.log(companystate["state_name"]+"comp state:"+JSON.stringify(companystate))
        this.partyList = PartyData;
        // console.log(" True 22 22 : : "+JSON.stringify(PartyData) )
        this.item_codes = ItemData;
        this.company_state=companystate["state_name"]
        this.status = true;
      });
    }
  }

  onChangeItemName(index, event) {
    if (event.target.value != "0") {
      this.status = false;
      forkJoin(
        this.DropDownListService.getItemNameById(event.target.value, this.company_name),
        this.DropDownListService.getItemMasterPackMat(event.target.value),
        this.DropDownListService.getItemMasterInvData1(event.target.value, this.company_name),
        this.DropDownListService.retriveItemMasterStatInfo(event.target.value, this.company_name),
        this.DropDownListService.getItemQCDetails(event.target.value, this.company_name)
      ).subscribe(([data, data1, data2, data3, data4]) => {
        this.sales_Invoice_Item_Dtls.at(index).patchValue({ item_group: data.item_group, hsn_code: data.hsn_code });

        //   let ItemsGrp='';
        //  for(let i=0; i<this.sales_Invoice_Item_Dtls.length; i++)
        //  {
        //     let ItemGrp= this.sales_Invoice_Item_Dtls.at(i).get("item_group").value as FormControl;
        //     ItemsGrp +=ItemGrp+",";
        //  }
        //  console.log("ItemsGrp: "+ItemsGrp.substring(0,ItemsGrp.length-1));
        //  let substringItemGrp = ItemsGrp.substring(0,ItemsGrp.length-1);
        //  this.ItemGroup[index] = substringItemGrp;
        //  console.log("ItemGroupIndex : "+this.ItemGroup[index])
        //  const unique = [new Set(this.ItemGroup[index])];
        //  console.log("unique : "+unique)


        //     let outputArray = this.ItemGroup[index].filter(function(v, i, self)
        //     {
        //           alert(outputArray)
        //         // It returns the index of the first
        //         // instance of each value

        //         return i == self.indexOf(v);

        //     });

        //     return outputArray;

        // console.log("outputArray : "+outputArray)

        this.DropDownListService.getUomName(data.mstock_unit).subscribe(data => {
          this.sales_Invoice_Item_Dtls.at(index).patchValue({ uom: data.description });
          this.status = true;
        });
        this.packingItem[index] = data1;
        this.sales_Invoice_Item_Dtls.at(index).patchValue({ price: data2["mrp"] });
        this.sales_Invoice_Item_Dtls.at(index).patchValue({ tax_code: data3[0].tax_code, tax_rate: data3[0].tax_rate });
        this.sales_Invoice_Item_Dtls.at(index).patchValue({ acc_norms: data4[0].qc_code });
      })
    }
    let Items = '';
    for (let i = 0; i < this.sales_Invoice_Item_Dtls.length; i++) {
      let ItemName = this.sales_Invoice_Item_Dtls.at(i).get("item_code").value as FormControl;
      Items += ItemName + ",";
    }
    // console.log("Items: "+Items.substring(0,Items.length-1));
    let substringItem = Items.substring(0, Items.length - 1);

    forkJoin(
      this.DropDownListService.getGroupSalesAccThruItems("items=" + substringItem)
    ).subscribe(([SubItemdata]) => {
      this.userForm.patchValue({
        item_total_gl_ac: SubItemdata["item_total"], discount_gl_ac: SubItemdata["discount"],
        adj1_gl_ac: SubItemdata["adjplus"], adj2_gl_ac: SubItemdata["adjminus"]
      });
    })
  }

  itemId: any;
  onChangePackingItem(index, event) {
    if (event.target.value != "0") {
      this.status = false;
      this.itemId = this.sales_Invoice_Item_Dtls.at(index).get("item_code").value as FormControl;
      this._packing_qty = this.sales_Invoice_Item_Dtls.at(index).get("squantity").value as FormControl;
      this.DropDownListService.getItemPackUom(this.itemId, event.target.value, this.company_name).subscribe(data => {
        this.status = true;
        this.capacity[index] = data.capacity;
        this.empty_bag_wt[index] = data.empty_big_wt;
        this._item_qty = this.capacity[index] * this._packing_qty;
        this._mat_weight = this._item_qty - this.empty_bag_wt[index];
        this.sales_Invoice_Item_Dtls.at(index).patchValue({ suom: data.uom1, quantity: this._item_qty, mat_wt: this._mat_weight });
        this._mrp = this.sales_Invoice_Item_Dtls.at(index).get("price").value as FormControl;
        this._mat_weight = this.sales_Invoice_Item_Dtls.at(index).get("mat_wt").value as FormControl;
        this._priceBasedOn = this.sales_Invoice_Item_Dtls.at(index).get('price_based_on').value as FormControl;
        this._discount = this.sales_Invoice_Item_Dtls.at(index).get('discount_rate').value as FormControl;
        this._discountBasadOn = this.sales_Invoice_Item_Dtls.at(index).get('discount_type').value as FormControl;
        this._taxrate = this.sales_Invoice_Item_Dtls.at(index).get('tax_rate').value as FormControl;
        this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
          this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
      });
    }
  }

  _mrp: any;
  _priceBasedOn: any;
  _mat_weight: any;
  _taxrate: any;
  _netAmt: any;
  _item_qty: any;
  _packing_qty: any;
  _discount: any;
  _discountBasadOn: any;
  _taxAmt: any;
  amt: any;
  _totalAmt: any;
  getPackingQty(packingQty, index) {
    this._packing_qty = packingQty.target.value;
    this._item_qty = this.capacity[index] * this._packing_qty;
    this.sales_Invoice_Item_Dtls.at(index).patchValue({
      quantity: this._item_qty,
      mat_wt: (Number(this._item_qty) - Number(this.empty_bag_wt[index])).toFixed(3)
    });
    this._mrp = this.sales_Invoice_Item_Dtls.at(index).get("price").value as FormControl;
    this._mat_weight = this.sales_Invoice_Item_Dtls.at(index).get("mat_wt").value as FormControl;
    this._priceBasedOn = this.sales_Invoice_Item_Dtls.at(index).get('price_based_on').value as FormControl;
    this._discount = this.sales_Invoice_Item_Dtls.at(index).get('discount_rate').value as FormControl;
    this._discountBasadOn = this.sales_Invoice_Item_Dtls.at(index).get('discount_type').value as FormControl;
    this._taxrate = this.sales_Invoice_Item_Dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  getItemQty(itemQty, index) {
    this._packing_qty = this.sales_Invoice_Item_Dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = itemQty.target.value;
    this.sales_Invoice_Item_Dtls.at(index).patchValue({
      mat_wt: (Number(this._item_qty) - Number(this.empty_bag_wt[index])).toFixed(3)
    });

    this._mrp = this.sales_Invoice_Item_Dtls.at(index).get("price").value as FormControl;
    this._mat_weight = this.sales_Invoice_Item_Dtls.at(index).get("mat_wt").value as FormControl;
    this._priceBasedOn = this.sales_Invoice_Item_Dtls.at(index).get('price_based_on').value as FormControl;
    this._discount = this.sales_Invoice_Item_Dtls.at(index).get('discount_rate').value as FormControl;
    this._discountBasadOn = this.sales_Invoice_Item_Dtls.at(index).get('discount_type').value as FormControl;
    this._taxrate = this.sales_Invoice_Item_Dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  getMatWt(matwt, index) {
    this._packing_qty = this.sales_Invoice_Item_Dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.sales_Invoice_Item_Dtls.at(index).get("quantity").value as FormControl;
    this._mrp = this.sales_Invoice_Item_Dtls.at(index).get("price").value as FormControl;
    this._mat_weight = matwt.target.value;
    this._priceBasedOn = this.sales_Invoice_Item_Dtls.at(index).get('price_based_on').value as FormControl;
    this._discount = this.sales_Invoice_Item_Dtls.at(index).get('discount_rate').value as FormControl;
    this._discountBasadOn = this.sales_Invoice_Item_Dtls.at(index).get('discount_type').value as FormControl;
    this._taxrate = this.sales_Invoice_Item_Dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  getPrice(price, index) {
    this._packing_qty = this.sales_Invoice_Item_Dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.sales_Invoice_Item_Dtls.at(index).get("quantity").value as FormControl;
    this._mrp = price.target.value;
    this._mat_weight = this.sales_Invoice_Item_Dtls.at(index).get("mat_wt").value as FormControl;
    this._priceBasedOn = this.sales_Invoice_Item_Dtls.at(index).get('price_based_on').value as FormControl;
    this._discount = this.sales_Invoice_Item_Dtls.at(index).get('discount_rate').value as FormControl;
    this._discountBasadOn = this.sales_Invoice_Item_Dtls.at(index).get('discount_type').value as FormControl;
    this._taxrate = this.sales_Invoice_Item_Dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  onChangePriceBasedOn(price_based_on, index) {
    this._packing_qty = this.sales_Invoice_Item_Dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.sales_Invoice_Item_Dtls.at(index).get("quantity").value as FormControl;
    this._mrp = this.sales_Invoice_Item_Dtls.at(index).get("price").value as FormControl;
    this._mat_weight = this.sales_Invoice_Item_Dtls.at(index).get("mat_wt").value as FormControl;
    this._priceBasedOn = price_based_on.target.value;
    this._discount = this.sales_Invoice_Item_Dtls.at(index).get('discount_rate').value as FormControl;
    this._discountBasadOn = this.sales_Invoice_Item_Dtls.at(index).get('discount_type').value as FormControl;
    this._taxrate = this.sales_Invoice_Item_Dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  getDiscount(discount, index) {
    this._packing_qty = this.sales_Invoice_Item_Dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.sales_Invoice_Item_Dtls.at(index).get("quantity").value as FormControl;
    this._mrp = this.sales_Invoice_Item_Dtls.at(index).get("price").value as FormControl;
    this._mat_weight = this.sales_Invoice_Item_Dtls.at(index).get("mat_wt").value as FormControl;
    this._priceBasedOn = this.sales_Invoice_Item_Dtls.at(index).get('price_based_on').value as FormControl;
    this._discount = discount.target.value;
    this._discountBasadOn = this.sales_Invoice_Item_Dtls.at(index).get('discount_type').value as FormControl;
    this._taxrate = this.sales_Invoice_Item_Dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  onchangeDiscountBasedOn(dis_based_on, index) {
    this._packing_qty = this.sales_Invoice_Item_Dtls.at(index).get("squantity").value as FormControl;
    this._item_qty = this.sales_Invoice_Item_Dtls.at(index).get("quantity").value as FormControl;
    this._mrp = this.sales_Invoice_Item_Dtls.at(index).get("price").value as FormControl;
    this._mat_weight = this.sales_Invoice_Item_Dtls.at(index).get("mat_wt").value as FormControl;
    this._priceBasedOn = this.sales_Invoice_Item_Dtls.at(index).get('price_based_on').value as FormControl;
    this._discount = this.sales_Invoice_Item_Dtls.at(index).get('discount_rate').value as FormControl;
    this._discountBasadOn = dis_based_on.target.value;
    this._taxrate = this.sales_Invoice_Item_Dtls.at(index).get('tax_rate').value as FormControl;
    this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
      this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
  }

  _total_amt: any
  discountAmt: any;
  GlobalTcs_rate: any;
  calculateItemData(packingQty, ItemQty, price, matWt, PriceBasedOn, discount, discountBasedOn, taxrate, index) {
    this.grandTotal = 0;
    if (PriceBasedOn == "Packing") { this.amt = price * packingQty }

    if (PriceBasedOn == "item") { this.amt = price * ItemQty }

    if (PriceBasedOn == "0") { this.amt = 0 }

    if (discountBasedOn == "Uom") { this.discountAmt = discount; }

    if (discountBasedOn == "%") { this.discountAmt = this.amt * (discount / 100); }

    if (discountBasedOn == "0") { this.discountAmt = 0 }

    let netAmt = this.amt - this.discountAmt;
    if (taxrate == 0) { this._taxAmt = 0; }
    else { this._taxAmt = netAmt * (taxrate / 100); }
    this._totalAmt = this._taxAmt + netAmt;
    this.sales_Invoice_Item_Dtls.at(index).patchValue({
      amount: this.amt.toFixed(2),
      discount_amt: this.discountAmt.toFixed(2), tax_amt: this._taxAmt.toFixed(2),
      total_amt: this._totalAmt.toFixed(2)
    });

    for (let i = 0; i < this.sales_Invoice_Item_Dtls.length; i++) {
      this.amt = this.sales_Invoice_Item_Dtls.at(i).get("amount").value as FormControl;
      this.totalItem = this.totalItem + this.amt;
      this.discountAmt = this.sales_Invoice_Item_Dtls.at(i).get("discount_amt").value as FormControl;
      this.totalDiscount = this.totalDiscount + this.discountAmt;
      this._taxAmt = this.sales_Invoice_Item_Dtls.at(i).get("tax_amt").value as FormControl;
      this.totalTaxAmt = this.totalTaxAmt + this._taxAmt;
      this._total_amt = this.sales_Invoice_Item_Dtls.at(i).get("total_amt").value as FormControl;
      this.grandTotal = Number(this.grandTotal) + Number(this._total_amt);
      this.userForm.patchValue({ grand_total: this.grandTotal.toFixed(2) });
      this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
        this.appCharges, this.adj1, this.adj2, this.tcsAmt)
    }
  }

  itemCode: any;
  showPopUp2(index) {
    this.itemCode = this.sales_Invoice_Item_Dtls.at(index).get('item_code').value as FormControl;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: index, item_code: this.itemCode };
    const dialogRef = this.dialog.open(SalesQcPopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      this.sales_Invoice_Item_Dtls.at(index).patchValue({ acc_norms: data["qc_code"] });
    });
  }

  delvAddrs: any = [];
  contAddrs: any = [];
  onChangePartyName(custid: string) {

    this._customerId = custid;
    //alert(custid)

    if (custid.length) {

      this.sales_Invoice_BP_Dtls.patchValue({
        cp_designation: null, cp_phone: null,
        cp_fax: null, cp_email: null, cp_address: null, sp_phone: null, sp_fax: null, sp_email: null
      });


      this.status = false;
      this.sales_Invoice_Shipment_Dtls.patchValue({ shipaddr: this._customerId });
      forkJoin(
        this.DropDownListService.getCustDelvFromList(custid),
        this.DropDownListService.custAddDtlsRetriveList(custid, this.company_name),
        this.DropDownListService.getCustomerAddress(custid),
        this.Service.custStatutoryRetriveList(custid),
        this.Service.custAddRetriveList(custid),
        this.DropDownListService.getCustomerControlAccounts(custid),
        this.Service.custBillAddRetriveList(custid),
       // this.Service.custShipAddDtlsRetriveList(custid),
      //).subscribe(([data, data1, data2, data3, CustAdd, ControlAccdata, CustAddress,shiptodata]) => {
        ).subscribe(([data, data1, data2, data3, CustAdd, ControlAccdata, CustAddress]) => {
        //registered
        // console.log(" hello tuhin 1" + JSON.stringify(data))
        // console.log(" hello tuhin 2" + JSON.stringify(data1))
        // console.log(" hello tuhin 3" + JSON.stringify(data2))
        // console.log(" hello tuhin 4" + JSON.stringify(data3))
        // console.log(" hello tuhin 5" + JSON.stringify(CustAdd))
        // console.log(" hello tuhin 6" + JSON.stringify(ControlAccdata))
        // console.log(" hello tuhin 7" + JSON.stringify(CustAddress))
        //console.log(" hello::" + JSON.stringify(shiptodata))

       // console.log("register:" + data3["registered"])
        if (data3["registered"] == true)//registered
        {
          this.regsiterdgsi = true;
          //if(this.userForm.get("invoice_type").value == 'INV00002' || this.userForm.get("invoice_type").value == 'INV00004')
          //if (this.userForm.get("invoice_type").value == 'INV00002' || this.userForm.get("invoice_type").value == 'INV00004' || this.userForm.get("invoice_type").value == 'INV00003') {
          if (this.userForm.get("invoice_type").value == 'INV00002' || this.userForm.get("invoice_type").value == 'INV00004' || this.userForm.get("invoice_type").value == 'INV00003' || this.userForm.get("invoice_type").value == 'INV00005') {
            this.einvoiceshow = true;
          }
          else {
            this.einvoiceshow = false;
          }

        }
        else {
          this.regsiterdgsi = false;
          this.einvoiceshow = false;
        }
        //regsiterdgsi
        //this.customerDelvAddList = shiptodata;
        this.customerDelvAddList = data;
        this.delvAddrs = data;
        this.contAddrs = data1;
        this.sales_Invoice_BP_Dtls.patchValue({ sp_address: data2["address"] });

        this.sales_Invoice_Tax_Info.patchValue({
          panno: data3["pan_no"],
          tanno: data3["tan_no"], cinno: data3['cin_no'], gstno: data3['gst_no']
        });
        this.userForm.patchValue({ state: CustAdd.state, payable_amt_gl_ac: ControlAccdata.ctrl_acc });
        this.sales_Invoice_Shipment_Dtls.patchValue({ shipdtls: CustAddress.address });
        this.status = true;
      });
    }
  }

  isChecked1 = false;
  isChecked = false;
  isBankNameDisabled = false;
  onChangePaymentMode(event: string) {
    let gotbank = event
    if (gotbank == "RTGS" || gotbank == "NEFT") {
      this.isBankNameDisabled = true;
      this.isChecked = true;
    }
    else {
      this.sales_Invoice_Payment_Dtls.patchValue({ bank_name: null });
      this.isBankNameDisabled = false;
      this.sales_Invoice_Payment_Dtls.patchValue({ account_no: this.acc_no });
      this.isChecked = false;
      this.sales_Invoice_Payment_Dtls.patchValue({ ifsc_code: null });
      this.sales_Invoice_Payment_Dtls.patchValue({ account_name: null });
      this.sales_Invoice_Payment_Dtls.patchValue({ branch: null });
      this.sales_Invoice_Payment_Dtls.patchValue({ iban: null });
      this.sales_Invoice_Payment_Dtls.patchValue({ bic_swift_code: null });
    }
    if (gotbank == 'Cash') {
      this.isChecked1 = true;
    }
    else {
      this.isChecked1 = false;
    }
  }

  onChangeBankName(bank_name: string) {
    if (bank_name == 'NA') {
      this.isChecked = false;
    }
    else {
      this.isChecked = true;
    }
  }

  onChangePartyInfoName(custname: String) {

    if (custname != "0" && this._customerId != "0") {
      this.sales_Invoice_BP_Dtls.patchValue({ sp_phone: null, sp_fax: null, sp_email: null });
      this.status = false;
      this.DropDownListService.getCustContDetails(this._customerId, custname).subscribe(data => {
        this.sales_Invoice_BP_Dtls.patchValue({ sp_phone: data["phone"], sp_fax: data["fax"], sp_email: data["email"] });
        this.status = true;
      });
    }
  }

  onChangeContInfoName(custname: String) {

    if (custname != "0" && this._customerId != "0") {
      this.sales_Invoice_BP_Dtls.patchValue({
        cp_designation: null, cp_phone: null,
        cp_fax: null, cp_email: null, cp_address: null
      });
      this.status = false;
      this.DropDownListService.getCustDelvFromAdd(this._customerId, custname).subscribe(data => {
        this.sales_Invoice_BP_Dtls.patchValue({
          cp_designation: data["designation"], cp_phone: data["phone"],
          cp_fax: data["fax"], cp_email: data["email"], cp_address: data["address"]
        });
        this.status = true;
      });
    }
  }

  onChangeShipToAddId(addId: String) {
    this.sales_Invoice_Shipment_Dtls.patchValue({ ship_details: '' })
    if (addId.length != 0 && this._customerId != "0") {
      this.status = false;
      this.DropDownListService.getCustDelvFromAdd(this._customerId, addId).subscribe(data => {
        this.sales_Invoice_Shipment_Dtls.patchValue({ shipdtls: data.address })
        this.status = true;
      })
    }
  }

  onChangePayToFromAddId(businessunit_code: string) {
    if (businessunit_code.length) {
      this.status = false;
      this.DropDownListService.getCompanyBUAddress(businessunit_code).subscribe(data => {
        this.sales_Invoice_Shipment_Dtls.patchValue({ paytodtls: data["add"] });
        this.status = true;
      });
    }
  }

  onChangeBrokerName(index, event) {
    let Party = this.userForm.get("party").value
    if (event) {
      this.DropDownListService.getCustomerBrokerDtls(Party, event.target.value).subscribe(data => {
        this.sales_Invoice_Broker_Dtls.at(index).patchValue({ broker_name: data.ven_name });
      });
    }
  }

  onChangeDate(event) {
    this.currentDate = event;
    if ((this.currentDate >= formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en')) && (this.currentDate <= formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en'))) {
      //console.log("sucess");
    }
    else {
      alert("Selected  date is not in Selected Financial period!!!!!!")
      this.currentDate = formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
    }
  }

  round(num, decimalPlaces = 0) {
    var p = Math.pow(10, decimalPlaces);
    var n = (num * p) * (1 + Number.EPSILON);
    return Math.round(n) / p;
  }

  Tax_Amt: any;
  ItemGr = [];
  Tax_Rate: any;
  TaxCode = [];
  TaxRate = [];
  HsnCode = [];
  StateName: any;
  NewItemGrp: any = [];
  TaxCodee: any;
  Percentage: any;
  TcsAmt: any;
  //START HERE
  onClickShow() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    if (this.userForm.get("business_unit").value == 0) {
      alert("Select Business Unit Before Clicking Show Challan!");
      this.status = true;
    }
    else if (this.userForm.get("party").value == 0) {
      alert("Select Party Name Before Clicking Show Challan!");
      this.status = true;
    }
    else if (this.userForm.get("challan").value == null) {
      alert("Select Challan Before Clicking Show Challan!");
      this.status = true;
    }
    else {
      this.Id = this.userForm.get("id").value;
      //  console.log("tuhin here  :: "+this.Id)

      if (this.Id == null || this.Id == '') {
        this.Id = 0;
        //  console.log("tuhin here12345 :: "+this.Id)
      }
      if (this.userForm.get("challan").value == 'Multiple') {

        dialogConfig.data = { invoice_type: this._invoiceType, party_id: this._customerId, company_id: this.company_name, date: this.currentDate, parent_model: 'Sales Invoice', id: this.Id };
        if (this._invoiceType != "0" && this._customerId != "0") {
          const dialogRef = this.dialog.open(MultiplediliverychallanComponent, dialogConfig);
          dialogRef.afterClosed().subscribe(data => {
            if (data != '' && data.alldeliveryid != "0") {
              this.ledgerNames.forEach(element => {
                if (element.ledgername == this.userForm.get("party").value) {
                  this.userForm.patchValue({ payable_amt_gl_ac: element.ledgerid })

                }
              });




              //starts here
              this.invoicePopupStatus = true;
              this.userForm.patchValue({ reference_id: data.alldeliveryid });
              let PartyName = this.userForm.get("party").value;
              let splitval = data.alldeliveryid.toString().split(",");
              // if (this.userForm.get("state").value == 'BIHAR') {
              if (this.userForm.get("state").value == this.company_state) {
                this.isOpenPolicy = false;
                this.userForm.patchValue({ policyno: '' })
              }
              else {
                this.isOpenPolicy = true;
                this.userForm.patchValue({ policyno: '0000000034939414' });


              }

              this.totalItem = 0;
              this.totalDiscount = 0;
              this.totalTaxAmt = 0;
              this.grandTotal = 0;
              this.packingItem = [];
              let i = 0;
              let k = 0;
              this.addItem();
              this.item_sl_no = 0;
              while (this.sales_Invoice_Item_Dtls.length)
                this.sales_Invoice_Item_Dtls.removeAt(0);

              //let ItemGr=[];
              for (let data1 of data.delivery_challan_Item_Dtls) {
                this.status = false;

                forkJoin(

                  this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                  this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name),
                  this.DropDownListService.getItemNameById(data1["item_code"], this.company_name),
                  this.Service.custAccountRetriveList(PartyName)
                ).subscribe(([packingList, capacityEmptyWt, ItemGrp, tcs]) => {

                  this.status = true;
                  this.show_Row = true;
                  this.capacity[i] = capacityEmptyWt.capacity;
                  this.empty_bag_wt[i] = capacityEmptyWt.empty_big_wt;
                  this.packingItem[i] = packingList;
                  this.addItem();

                  this.userForm.patchValue({ item_total_gl_ac: data1["sub_group"] });

                  this.amt += data1["amount"];
                  this.totalItem = this.totalItem + this.amt;
                  this.discountAmt += data1["discount_amt"];
                  this.totalDiscount = this.totalDiscount + this.discountAmt;
                  this._taxAmt += data1["tax_amt"];
                  this.totalTaxAmt = this.totalTaxAmt + this._taxAmt;

                  //this.calculateFinalBillAmt(this.totalItem, this.totalDiscount, this.totalTaxAmt,
                  // this.appCharges, this.adj1, this.adj2, this.tcsAmt)
                  let Amt = this.totalItem;

                  let netAmt = this.totalItem - this.totalDiscount;
                  let totalAmt = netAmt + this.totalTaxAmt;
                  let finalBillamount = totalAmt + this.appCharges + this.adj1 - this.adj2;
                  this.userForm.patchValue({
                    item_total: Amt.toFixed(2),
                    discount: this.totalDiscount.toFixed(2),
                    tax_total: this.totalTaxAmt.toFixed(2)
                  })
                  let totlround = Math.round(finalBillamount);
                  let totlWithoutround = finalBillamount.toFixed(2);
                  this.RoundOff = (totlround - Number(totlWithoutround)).toFixed(2);
                  console.log("payable_amt " + this.userForm.get("payable_amt").value)
                  this.TcsAmt1 = (Number(totlround * tcs.tcs_rate) / 100).toFixed(2);
                  this.userForm.patchValue({ tcsamt: this.TcsAmt1 });
                  let t = Number(totlround) + Number(this.TcsAmt1)
                  this.userForm.patchValue({ payable_amt: totlround.toFixed(2) })
                  let roundOfAmt = Math.round(finalBillamount * 100) % 100;
                  if (roundOfAmt >= 50) {
                    roundOfAmt = 100 - roundOfAmt;
                    this.userForm.patchValue({ roundoff_amt: Number(Number(roundOfAmt) / 100).toFixed(2) })
                  }
                  else {
                    this.userForm.patchValue({ roundoff_amt: Number(0 - Number(roundOfAmt) / 100).toFixed(2) });
                  };


                  this.grandTotal = Number(this.grandTotal) + Number(data1["total_amt"]);
                  this.sales_Invoice_Item_Dtls.at(i).patchValue({ item_group: ItemGrp["item_group"] })
                  this.userForm.patchValue({ grand_total: this.grandTotal.toFixed(2) });
                  this.ItemGr.push(ItemGrp["item_group"]);
                  this.TaxCode.push(data1["tax_code"]);
                  this.HsnCode.push(data1["hsn_code"]);
                  this.TaxRate.push(data1["tax_rate"]);
                  this.sales_Invoice_Item_Dtls.at(i).patchValue(data1);

                  if (this.userForm.get("discount").value > 0) {
                    //this.userForm.patchValue({});
                    //discount add later
                  }
                  if (this.userForm.get("tax_total").value > 0) {
                    //this.userForm.patchValue({});
                    //tax_total add later
                  }
                  if (this.userForm.get("applicable_amt").value > 0) {
                    //this.userForm.patchValue({});
                    //applicable_gl_ac add later
                  }
                  if (this.userForm.get("adj1_amt").value > 0) {
                    //this.userForm.patchValue({});
                    //adj1_gl_ac add later
                  }
                  if (this.userForm.get("adj2_amt").value > 0) {
                    //this.userForm.patchValue({});
                    //adj2_gl_ac add later
                  }
                  if (this.userForm.get("roundoff_amt").value > 0) {
                    this.userForm.patchValue({ roundoff_gl_ac: 'IB00001' });
                    //tax_total add later
                  }
                  if (this.userForm.get("tcsamt").value > 0) {
                    //this.userForm.patchValue({});
                    //tcsglac add later
                  }




                  //for hsn
                  timer(3000).subscribe
                    (x => {
                      const distinctArrayHsnCode: any = [] = this.HsnCode.filter((n, i) => this.HsnCode.indexOf(n) === i);
                      // console.log("distinctArrayHsnCode: "+distinctArrayHsnCode);
                      this.addItemGrpHsn();
                      while (this.item_groupwise_hsnsumm.length)
                        this.item_groupwise_hsnsumm.removeAt(0);
                      for (let j = 0; j < distinctArrayHsnCode.length; j++) {
                        let DiscountAmt = 0;
                        for (let k = 0; k < this.sales_Invoice_Item_Dtls.length; k++) {
                          if (this.sales_Invoice_Item_Dtls.at(k).get("hsn_code").value == distinctArrayHsnCode[j]) {
                            DiscountAmt += this.sales_Invoice_Item_Dtls.at(k).get("amount").value - this.sales_Invoice_Item_Dtls.at(k).get("discount_amt").value;
                            //   console.log("DiscountAmt:"+DiscountAmt);
                          }
                        }
                        this.addItemGrpHsn();
                        // console.log("hsn_code  :"+distinctArrayHsnCode[j]); // 1, "string", false
                        this.item_groupwise_hsnsumm.at(j).patchValue({ hsn_code: distinctArrayHsnCode[j], amount: DiscountAmt });
                      }
                    }
                    )

                  timer(3500).subscribe
                    (x => {
                      const distinctArray: any = [] = this.ItemGr.filter((n, i) => this.ItemGr.indexOf(n) === i);

                      //let j=0
                      this.addItemGrp();
                      while (this.item_groupwise_summ.length)
                        this.item_groupwise_summ.removeAt(0)
                      for (let j = 0; j < distinctArray.length; j++) {
                        let Amt = 0;
                        let Discount = 0;

                        for (let k = 0; k < this.sales_Invoice_Item_Dtls.length; k++) {

                          if (this.sales_Invoice_Item_Dtls.at(k).get("item_group").value == distinctArray[j]) {
                            Amt += this.sales_Invoice_Item_Dtls.at(k).get("amount").value;
                            Discount += this.sales_Invoice_Item_Dtls.at(k).get("discount_amt").value;
                            // console.log("Amt:"+Amt);
                            // console.log("Discount : "+Discount);
                          }
                        }
                        this.addItemGrp();
                        //console.log("Item  :"+distinctArray[j]); // 1, "string", false
                        this.item_groupwise_summ.at(j).patchValue({ item_group: distinctArray[j], item_total: Amt, discount_amt: Discount });

                        forkJoin(
                          this.Service.getItemGroupSalesAcc(distinctArray[j]),
                        ).subscribe(([ItemgrpLedger]) => {
                          this.item_groupwise_summ.at(j).patchValue({ item_ledger: ItemgrpLedger.item_total, discount_ledger: ItemgrpLedger.discount });

                          this.status = true;
                        });
                      }
                    }
                    )

                  timer(4000).subscribe
                    (x => {
                      this.StateName = this.userForm.get("state").value;
                      const distinctArrayTax: any = [] = this.TaxCode.filter((n, i) => this.TaxCode.indexOf(n) === i);

                      this.addItemGrpTax();
                      while (this.item_groupwise_taxsumm.length)
                        this.item_groupwise_taxsumm.removeAt(0)
                      for (let j = 0; j < distinctArrayTax.length; j++) {
                        let TaxRate = 0;
                        let TaxAmt = 0;

                        for (let k = 0; k < this.sales_Invoice_Item_Dtls.length; k++) {

                          if (this.sales_Invoice_Item_Dtls.at(k).get("tax_code").value == distinctArrayTax[j]) {
                            TaxRate = this.sales_Invoice_Item_Dtls.at(k).get("tax_rate").value;
                            TaxAmt += this.sales_Invoice_Item_Dtls.at(k).get("tax_amt").value;
                          }
                        }
                        this.addItemGrpTax();
                        this.item_groupwise_taxsumm.at(j).patchValue({ tax_code: distinctArrayTax[j], tax_rate: TaxRate.toFixed(2), tax_amt: TaxAmt.toFixed(2) });

                        if (distinctArrayTax[j] != '' && distinctArrayTax[j] != null) {
                          forkJoin(
                            this.DropDownListService.getTaxCodeDetails(distinctArrayTax[j]),
                          ).subscribe(([TaxData]) => {

                            if (TaxData) {
                              this.item_groupwise_taxsumm.at(j).patchValue({
                                percentage: TaxData.cgst, cgstledgerid: TaxData.cgst_output_ledger
                                , sgstledgerid: TaxData.output_ledger, igstledgerid: TaxData.igst_output_ledger
                              });

                              this.status = true;

                              this.Tax_Rate = this.item_groupwise_taxsumm.at(j).get("tax_rate").value;
                              this.StateName = this.userForm.get("state").value;
                              this.Tax_Amt = this.item_groupwise_taxsumm.at(j).get("tax_amt").value as FormControl;
                              //if (this.StateName == 'BIHAR') {
                              if (this.StateName == this.company_state) {
                                let Cgst = (this.Tax_Amt * (TaxData.cgst / 100));
                                let Sgst = (this.Tax_Amt - Cgst);
                                this.item_groupwise_taxsumm.at(j).patchValue({ igst: 0, cgst: Cgst.toFixed(2), sgst: Sgst.toFixed(2) });
                              }
                              else { this.item_groupwise_taxsumm.at(j).patchValue({ igst: this.Tax_Amt, cgst: 0, sgst: 0 }); }


                              const distinctArrayTaxRate: any = [] = this.TaxRate.filter((n, i) => this.TaxRate.indexOf(n) === i);

                              for (let j = 0; j < distinctArrayTaxRate.length; j++) {
                                let Amount = 0;
                                let DiscountAmt = 0;
                                let Taxable_Amnt = 0;

                                for (let k = 0; k < this.sales_Invoice_Item_Dtls.length; k++) {

                                  if (this.sales_Invoice_Item_Dtls.at(k).get("tax_rate").value == distinctArrayTaxRate[j]) {
                                    Amount += this.sales_Invoice_Item_Dtls.at(k).get("amount").value;
                                    DiscountAmt += this.sales_Invoice_Item_Dtls.at(k).get("discount_amt").value;
                                    Taxable_Amnt = Number(Amount.toFixed(2)) - Number(DiscountAmt.toFixed(2));
                                    //  console.log("Taxable_Amnt : " +Taxable_Amnt)
                                    // console.log("TaxDistAmount : " +Amount+ "..."+ "DiscountAmt : "+DiscountAmt)
                                  }
                                }
                                this.item_groupwise_taxsumm.at(j).patchValue({ taxable_amt: Taxable_Amnt.toFixed(2) });
                              }
                            }

                            else {
                              //.pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))
                              alert("something error is happened");
                            }

                          });
                        }


                      }
                    })

                  i = i + 1;
                });
              }


              let Party = this.userForm.get("party").value;
              forkJoin(
                this.DropDownListService.getDeliveryChallanDtls("delivery_cid=" + splitval[0]),
                //this.DropDownListService.getDlvChallanShipmentDtls(splitval[0]),
                this.DropDownListService.getDlvChallanShipmentDtlsFast(splitval[0]),
                this.DropDownListService.getMultipleDlvChlnTransInfo(data.alldeliveryid),//here multipletransporter fetch
                this.DropDownListService.getDlvChallanBrokerDtls(splitval[0]),
                this.DropDownListService.getDlvChallanDoc(splitval[0]),
                this.Service.custAccountRetriveList(Party),
                this.DropDownListService.getChargesMatrixSalesdetails(splitval[0]),
                this.DropDownListService.getAppChargesSalesdetails(splitval[0]),
                this.DropDownListService.getSalesOrderDetailsthdeliverchallan(splitval[0])
              ).subscribe(([challanData, shipmentdata, transData, brokerData, docsData, PartyTcs, chargesData, appcharges, saleorderdetails]) => {
                // console.log("tuhin here look please"+challanData["challan_no"]);
                //  console.log("look here " + JSON.stringify(challanData))
                this.userForm.patchValue({
                  salesorderno: challanData["salesorderno"], salesorderdate: challanData["salesorderdate"],
                  refchallanno: challanData["challan_no"], refchallandate: challanData["challan_date"], app_chgs_id: appcharges["app_chgs_id"]
                  , cust_refdocno: saleorderdetails["cust_refdocno"], cust_ref_doc_date: saleorderdetails["cust_ref_doc_date"]
                });

                let PayableAmount: any;
                let Tcs_rate: any;
                PayableAmount = this.userForm.get("payable_amt").value as FormControl;

                Tcs_rate = PartyTcs.tcs_rate;

                this.TcsAmt = (Number(PayableAmount * Tcs_rate) / 100).toFixed(2);
                this.sales_Invoice_Shipment_Dtls.patchValue({ paytoaddr: shipmentdata.pay_addr, paytodtls: shipmentdata.pay_details, shipaddr: shipmentdata.ship_addr, shipdtls: shipmentdata.ship_details });

                let i = 0;
                this.addBrokers();
                this.broker_sl_no = 0;
                while (this.sales_Invoice_Broker_Dtls.length)
                  this.sales_Invoice_Broker_Dtls.removeAt(0);

                for (let data1 of brokerData) {
                  this.addBrokers();
                  this.sales_Invoice_Broker_Dtls.at(i).patchValue({
                    brokercode: data1.broker_code,
                    basis: data1.basis, rate: data1.rate,
                  });
                  i = i + 1;
                }
                //console.log("3")

                let k = 0;
                this.addTransporter();
                this.transporter_sl_no = 0;
                while (this.sales_Invoice_Trans_Dtls.length)
                  this.sales_Invoice_Trans_Dtls.removeAt(0);

                for (let data1 of transData) {
                  this.addTransporter();
                  this.sales_Invoice_Trans_Dtls.at(k).patchValue({
                    transname: data1.transname,
                    vehicletype: data1.vehicletype, vehicleid: data1.vehicleno, ewaybillno: data1.ewaybillno
                  });
                  k = k + 1;
                }

                let j = 0;
                this.addDocument();
                while (this.sales_Invoice_Docs.length)
                  this.sales_Invoice_Docs.removeAt(0)

                for (let data1 of docsData) {
                  this.addDocument();
                  this.sales_Invoice_Docs.at(j).patchValue({ doc_name: data1.doc_name });
                  j = j + 1;
                }

                let p = 0;
                this.addAppCharfes();
                while (this.sales_Invoice_app_chgs.length)
                  this.sales_Invoice_app_chgs.removeAt(0)
                for (let appchargedata of chargesData) {
                  this.addAppCharfes();

                  this.sales_Invoice_app_chgs.at(p).patchValue({ charges_name: appchargedata["charge_name"], add_less: appchargedata["add_less"], rate_cal_method: appchargedata["rate_cal_method"], app_rate: appchargedata["app_rate"], tax_rate: appchargedata["tax_rate"] });
                  p = p + 1;
                }
                this.chargematrixdata();
              })
              //ends here
            }
          });
        }
        else {

          alert("Select Party and Invoice Type First!");

        }
      }
      else {


        if (this.userForm.get("jobwork").value == true) {
          let itemgrpmulti = "";
          dialogConfig.data = { invoice_type: this._invoiceType, party_id: this._customerId, company_id: this.company_name, date: this.currentDate, id: this.Id };
          if (this._invoiceType != "0" && this._customerId != "0") {
          //console.log("comp_state:"+this.company_state)
            let itemtoal: number = 0;
            const dialogRef = this.dialog.open(SalesInvoiceJobworkPopupComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(data => {
              console.log(JSON.stringify(data))
              console.log("CHALLAN ID " + JSON.stringify(data["delivery_cid"]))
             
              if (data != '' && data["delivery_cid"].length) {
                //if (this.userForm.get("state").value == 'BIHAR') {
                if (this.userForm.get("state").value == this.company_state) {
                  this.isOpenPolicy = false;
                  this.userForm.patchValue({ policyno: '' })
                }
                else {
                  this.isOpenPolicy = true;
                  this.userForm.patchValue({ policyno: '0000000034939414' });


                }
                this.ledgerNames.forEach(element => {
                  if (element.ledgername == this.userForm.get("party").value) {
                    this.userForm.patchValue({ payable_amt_gl_ac: element.ledgerid })
                  }
                });

                let PartyName = this.userForm.get("party").value;
                this.invoicePopupStatus = true;
                this.userForm.patchValue({ reference_id: data.delivery_cid, brokage_app: 'true' });
                console.log(" inside tuhin ");

                this.status = true;
                forkJoin(
                  this.DropDownListService.getItemThruSalesThruBU_inv_type(this.userForm.get("business_unit").value, this.company_name, this.userForm.get("invoice_type").value),
                  this.DropDownListService.getItemServiceList(this.company_name),
                  this.DropDownListService.getsaleorderjobworkprice(data["delivery_cid"]),
                  this.Service.custAddRetriveList(this.userForm.get("party").value)

                ).subscribe(([itemlist, service, saleorderjobprice, state]) => {
                  this.status = false;
                  this.jobitemlist = itemlist;
                  this.item_services = service;
                  let u = 0;
                  this.jobpackinglist = [];
                  this.selectedJobItem = [];
                  this.selectedJobPacking = [];
                  this.TaxCode = [];
                  this.TaxRate = [];

                  this.selectedService = [];
                  this.totalItem = 0;
                  this.totalDiscount = 0;
                  this.totalTaxAmt = 0;
                  this.grandTotal = 0;
                  this._taxAmt = 0;


                  this.addJobworkItemservice();
                  this.service_sl_no = 0;
                  while (this.sales_Invoice_Item_Dtls_for_jobwork_price.length) { this.sales_Invoice_Item_Dtls_for_jobwork_price.removeAt(0); }
                  let jp = 0;
                  let grandtotal: number = 0;
                  for (let data1 of saleorderjobprice) {
                    let totjobprice = 0;

                    this.addJobworkItemservice();
                    this.selectedService[jp] = data1["item_service"];
                    //  this.sales_Invoice_Item_Dtls_for_jobwork_price.patchValue(saleorderjobprice);
                    totjobprice = Number(data["job_price_total"]) * Number(data1["job_price"]);
                    let igstamt: any = 0, cgstAmount: any = 0, sgstAmount: any = 0, taxAmount: any = 0, totalAmount: any = 0;
                    // if (state["state"] == "BIHAR") {
                    if (state["state"] == this.company_state) {
                      cgstAmount = Number(this.round(Number(totjobprice * (data1["cgst_tax"] / 100)), 2));
                      sgstAmount = Number(this.round(Number(totjobprice * (data1["sgst_tax"] / 100)), 2));
                      igstamt = 0;
                    }
                    else {
                      cgstAmount = 0;
                      sgstAmount = 0;
                      igstamt = Number(this.round(Number(totjobprice * (data1["igst_tax"] / 100)), 2));
                    }



                    taxAmount = Number(cgstAmount) + Number(sgstAmount) + Number(igstamt);

                    totalAmount = Number(taxAmount) + Number(totjobprice);

                    this.sales_Invoice_Item_Dtls_for_jobwork_price.at(jp).patchValue({
                      slno: data1["slno"], item_service: data1["item_service"],
                      sac_code: data1["sac_code"], job_price: data1["job_price"], tax_value: Number(this.round(totjobprice, 2)), cgst_tax: data1["cgst_tax"], cgst_amt: cgstAmount,
                      sgst_tax: data1["sgst_tax"], sgst_amt: sgstAmount, tot_amount: Number(this.round(totalAmount, 2)), igst_tax: data1["igst_tax"], igst_amt: igstamt, taxcode: data1["taxcode"]
                    });

                    this.totalItem += Number(totjobprice);

                    this._taxAmt += (Number(totalAmount) - Number(totjobprice));
                    this.TaxCode.push(data1["taxcode"]);
                    this.TaxRate.push(data1["igst_tax"]);
                    jp++;

                  }
                  this.userForm.patchValue({ grand_total: Number(this.round(this.totalItem, 2)) })
                  //starts here 
                  let Amt = this.totalItem;

                  this.totalTaxAmt = this.totalTaxAmt + this._taxAmt;

                  let netAmt = this.totalItem - this.totalDiscount;
                  let totalAmt = netAmt + this.totalTaxAmt;
                  let finalBillamount = totalAmt + this.appCharges + this.adj1 - this.adj2;
                  this.userForm.patchValue({
                    item_total: Amt.toFixed(2),
                    discount: this.totalDiscount.toFixed(2),
                    tax_total: this.totalTaxAmt.toFixed(2)
                  })
                  let totlround = Math.round(finalBillamount);
                  let totlWithoutround = finalBillamount.toFixed(2);
                  this.RoundOff = (totlround - Number(totlWithoutround)).toFixed(2);




                  this.TcsAmt1 = 0;
                  this.userForm.patchValue({ tcsamt: this.TcsAmt1 });
                  let t = Number(totlround) + Number(this.TcsAmt1)
                  this.userForm.patchValue({ payable_amt: totlround.toFixed(2) })
                  let roundOfAmt = Math.round(finalBillamount * 100) % 100;
                  if (roundOfAmt >= 50) {
                    roundOfAmt = 100 - roundOfAmt;
                    this.userForm.patchValue({ roundoff_amt: Number(Number(roundOfAmt) / 100).toFixed(2) })
                  }
                  else {
                    this.userForm.patchValue({ roundoff_amt: Number(0 - Number(roundOfAmt) / 100).toFixed(2) });
                  };

                  //STARTS HERE
                  timer(0).subscribe
                    (x => {
                      this.StateName = this.userForm.get("state").value;
                      const distinctArrayTax: any = [] = this.TaxCode.filter((n, i) => this.TaxCode.indexOf(n) === i);
                      this.addItemGrpTax();
                      while (this.item_groupwise_taxsumm.length)
                        this.item_groupwise_taxsumm.removeAt(0)
                      for (let j = 0; j < distinctArrayTax.length; j++) {
                        let TaxRate = 0;
                        let TaxAmt = 0;
                        for (let k = 0; k < this.sales_Invoice_Item_Dtls_for_jobwork_price.length; k++) {
                          if (this.sales_Invoice_Item_Dtls_for_jobwork_price.at(k).get("taxcode").value == distinctArrayTax[j]) {
                            TaxRate = this.sales_Invoice_Item_Dtls_for_jobwork_price.at(k).get("igst_tax").value;
                            //if (this.StateName == 'BIHAR') {
                            if (this.StateName == this.company_state) {
                              TaxAmt += (Number(this.sales_Invoice_Item_Dtls_for_jobwork_price.at(k).get("cgst_amt").value) + Number(this.sales_Invoice_Item_Dtls_for_jobwork_price.at(k).get("sgst_amt").value));
                            }
                            else {
                              TaxAmt += this.sales_Invoice_Item_Dtls_for_jobwork_price.at(k).get("igst_amt").value;
                            }

                          }
                        }
                        this.addItemGrpTax();
                        this.item_groupwise_taxsumm.at(j).patchValue({ tax_code: distinctArrayTax[j], tax_rate: TaxRate.toFixed(2), tax_amt: TaxAmt.toFixed(2) });

                        if (distinctArrayTax[j] != '' && distinctArrayTax[j] != null) {
                          forkJoin(
                            this.DropDownListService.getTaxCodeDetails(distinctArrayTax[j]),
                          ).subscribe(([TaxData]) => {
                            if (TaxData) {
                              this.item_groupwise_taxsumm.at(j).patchValue({ percentage: TaxData.cgst, cgstledgerid: TaxData.cgst_output_ledger, sgstledgerid: TaxData.output_ledger, igstledgerid: TaxData.igst_output_ledger });
                              this.status = true;
                              this.Tax_Rate = this.item_groupwise_taxsumm.at(j).get("tax_rate").value;
                              this.StateName = this.userForm.get("state").value;
                              this.Tax_Amt = this.item_groupwise_taxsumm.at(j).get("tax_amt").value as FormControl;
                              //if (this.StateName == 'BIHAR') {
                              if (this.StateName == this.company_state) {
                                let Cgst = (this.Tax_Amt * (TaxData.cgst / 100));
                                let Sgst = (this.Tax_Amt - Cgst);
                                this.item_groupwise_taxsumm.at(j).patchValue({ igst: 0, cgst: Cgst.toFixed(2), sgst: Sgst.toFixed(2) });
                              }
                              else {
                                this.item_groupwise_taxsumm.at(j).patchValue({ igst: this.Tax_Amt, cgst: 0, sgst: 0 });
                              }
                              const distinctArrayTaxRate: any = [] = this.TaxRate.filter((n, i) => this.TaxRate.indexOf(n) === i);
                              for (let j = 0; j < distinctArrayTaxRate.length; j++) {
                                let Amount = 0;
                                let DiscountAmt = 0;
                                let Taxable_Amnt = 0;
                                for (let k = 0; k < this.sales_Invoice_Item_Dtls_for_jobwork_price.length; k++) {

                                  if (this.sales_Invoice_Item_Dtls_for_jobwork_price.at(k).get("igst_tax").value == distinctArrayTaxRate[j]) {
                                    Amount += this.sales_Invoice_Item_Dtls_for_jobwork_price.at(k).get("tax_value").value;
                                    //DiscountAmt+=this.sales_Invoice_Item_Dtls_for_jobwork_price.at(k).get("discount_amt").value;
                                    //Taxable_Amnt = Number(Amount.toFixed(2))-Number(DiscountAmt.toFixed(2));
                                    Taxable_Amnt = Number(Amount.toFixed(2));
                                  }
                                }
                                this.item_groupwise_taxsumm.at(j).patchValue({ taxable_amt: Taxable_Amnt.toFixed(2) });
                              }
                            }
                            else {

                              alert("something error is happened");
                            }
                          });
                        }
                      }
                    })
                  //ENDS HERE 
                  this.addJobworkItem();
                  this.jobwork_sl_no = 0;
                  while (this.sales_Invoice_Item_Dtls_for_jobwork.length) { this.sales_Invoice_Item_Dtls_for_jobwork.removeAt(0); }

                  for (let data1 of data.delivery_challan_Item_Dtls_for_jobwork) {
                    console.log(JSON.stringify(data.delivery_challan_Item_Dtls_for_jobwork))

                    if (data1.checkbox == true || data1.checkbox == "true") {
                      this.status = false;
                      console.log("insideim ")


                      this.DropDownListService.getItemMasterPackMat(data1["job_item"])
                        .subscribe(packingList => {
                          this.addJobworkItem();
                          this.jobpackinglist[u] = packingList;
                          this.selectedJobItem[u] = data1["job_item"];
                          this.selectedJobPacking[u] = data1["job_packing"];
                          this.sales_Invoice_Item_Dtls_for_jobwork.patchValue(data.delivery_challan_Item_Dtls_for_jobwork);
                          u++;
                          this.status = true;
                        });
                    }

                  }


                });


                let Party = this.userForm.get("party").value;
                forkJoin(
                  this.DropDownListService.getDeliveryChallanDtls("delivery_cid=" + data["delivery_cid"]),
                  //this.DropDownListService.getDlvChallanShipmentDtls(data["delivery_cid"]),
                  this.DropDownListService.getDlvChallanShipmentDtlsFast(data["delivery_cid"]),
                  this.DropDownListService.getDlvChlnTransInfo(data["delivery_cid"]),

                  this.DropDownListService.getDlvChallanBrokerDtls(data["delivery_cid"]),
                  this.DropDownListService.getDlvChallanDoc(data["delivery_cid"]),
                  this.Service.custAccountRetriveList(Party),
                  this.DropDownListService.getChargesMatrixSalesdetails(data["delivery_cid"]),
                  this.DropDownListService.getAppChargesSalesdetails(data["delivery_cid"]),
                  this.DropDownListService.getSalesOrderDetailsthdeliverchallan(data["delivery_cid"]),
                  this.DropDownListService.getLoadingAdviceTransDtls(data["delivery_cid"]),

                ).subscribe(([challanData, shipmentdata, transData, brokerData, docsData, PartyTcs, chargesData, appcharges, saleorderdetails, loadingtrans]) => {

                  this.userForm.patchValue({
                    salesorderno: challanData["salesorderno"], salesorderdate: challanData["salesorderdate"],
                    refchallanno: challanData["challan_no"], refchallandate: challanData["challan_date"], app_chgs_id: appcharges["app_chgs_id"]
                    , cust_refdocno: saleorderdetails["cust_refdocno"], cust_ref_doc_date: saleorderdetails["cust_ref_doc_date"]
                  });
                  // this.customerDelvAddList= custDelvData;
                  let PayableAmount: any;
                  let Tcs_rate: any;
                  PayableAmount = this.userForm.get("payable_amt").value as FormControl;

                  Tcs_rate = PartyTcs.tcs_rate;

                  this.TcsAmt = (Number(PayableAmount * Tcs_rate) / 100).toFixed(2);
                  //this.userForm.patchValue({tcsamt:this.TcsAmt});
                  if (loadingtrans["payment_term"] == 'APT00001') {
                    this.onday = false;
                  }
                  else {
                    this.onday = true;
                  }
                  this.sales_Invoice_Payment_Dtls.patchValue({ mode_of_payment: loadingtrans["mode_of_payment"], payment_term: loadingtrans["payment_term"], days: loadingtrans["days"] })

                  this.sales_Invoice_Shipment_Dtls.patchValue({ paytoaddr: shipmentdata.pay_addr, paytodtls: shipmentdata.pay_details, shipaddr: shipmentdata.ship_addr, shipdtls: shipmentdata.ship_details });

                  console.log("Broker : : " + JSON.stringify(brokerData))
                  console.log("Transport : : " + JSON.stringify(transData))
                  let i = 0;
                  this.addBrokers();
                  this.broker_sl_no = 0;
                  while (this.sales_Invoice_Broker_Dtls.length)
                    this.sales_Invoice_Broker_Dtls.removeAt(0);

                  for (let data1 of brokerData) {
                    this.addBrokers();
                    this.sales_Invoice_Broker_Dtls.at(i).patchValue({
                      brokercode: data1.broker_code,
                      basis: data1.basis, rate: data1.rate,
                    });
                    i = i + 1;
                  }


                  let k = 0;
                  this.addTransporter();
                  this.transporter_sl_no = 0;
                  while (this.sales_Invoice_Trans_Dtls.length)
                    this.sales_Invoice_Trans_Dtls.removeAt(0);

                  for (let data1 of transData) {
                    this.addTransporter();
                    this.sales_Invoice_Trans_Dtls.at(k).patchValue({
                      transname: data1.transname,
                      vehicletype: data1.vehicletype, vehicleid: data1.vehicleno, ewaybillno: data1.ewaybillno
                    });
                    k = k + 1;
                  }


                  let j = 0;
                  this.addDocument();
                  while (this.sales_Invoice_Docs.length)
                    this.sales_Invoice_Docs.removeAt(0)

                  for (let data1 of docsData) {
                    this.addDocument();
                    this.sales_Invoice_Docs.at(j).patchValue({ doc_name: data1.doc_name });
                    j = j + 1;
                  }
                })
              }
            });


          }
        }
        else {
          let itemgrpmulti = "";
          dialogConfig.data = { invoice_type: this._invoiceType, party_id: this._customerId, company_id: this.company_name, date: this.currentDate, parent_model: 'Sales Invoice', id: this.Id };
          if (this._invoiceType != "0" && this._customerId != "0") {
            let itemtoal: number = 0;
            const dialogRef = this.dialog.open(DeliveryChallanPopUpComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(data => {
              if (data != '' && data.delivery_cid != "0") {
                this.ledgerNames.forEach(element => {
                  if (element.ledgername == this.userForm.get("party").value) {
                    this.userForm.patchValue({ payable_amt_gl_ac: element.ledgerid })

                  }
                });

                let PartyName = this.userForm.get("party").value;
                this.invoicePopupStatus = true;
                this.userForm.patchValue({ reference_id: data.delivery_cid, brokage_app: 'true' });
                this.totalItem = 0;
                this.totalDiscount = 0;
                this.totalTaxAmt = 0;
                this.grandTotal = 0;
                this.packingItem = [];
                let i = 0;
                let k = 0;
                this.addItem();
                this.item_sl_no = 0;
                while (this.sales_Invoice_Item_Dtls.length)
                  this.sales_Invoice_Item_Dtls.removeAt(0);
                // if (this.userForm.get("state").value == 'BIHAR') {
                if (this.userForm.get("state").value == this.company_state) {
                  this.isOpenPolicy = false;
                  this.userForm.patchValue({ policyno: '' })
                }
                else {
                  this.isOpenPolicy = true;
                  this.userForm.patchValue({ policyno: '0000000034939414' });


                }

                //let ItemGr=[];
                for (let data1 of data.delivery_challan_Item_Dtls) {


                  this.status = false;

                  forkJoin(

                    this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                    this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name),
                    this.DropDownListService.getItemNameById(data1["item_code"], this.company_name),
                    this.Service.custAccountRetriveList(PartyName)
                  ).subscribe(([packingList, capacityEmptyWt, ItemGrp, tcs]) => {

                    this.status = true;
                    this.show_Row = true;
                    this.capacity[i] = capacityEmptyWt.capacity;
                    this.empty_bag_wt[i] = capacityEmptyWt.empty_big_wt;
                    this.packingItem[i] = packingList;
                    this.addItem();
                    //console.log("first " + itemtoal);
                    itemtoal = itemtoal + Number(data1["amount"]);
                    //nconsole.log("second " + itemtoal);
                    this.amt = itemtoal;
                    //this.einvoiceshow=true;

                    this.totalItem = itemtoal;
                    this.discountAmt = data1["discount_amt"];
                    this.totalDiscount = this.totalDiscount + this.discountAmt;
                    this._taxAmt = data1["tax_amt"];
                    this.totalTaxAmt = this.totalTaxAmt + this._taxAmt;
                    let Amt = this.totalItem;

                    let netAmt = this.totalItem - this.totalDiscount;
                    let totalAmt = netAmt + this.totalTaxAmt;
                    let finalBillamount = totalAmt + this.appCharges + this.adj1 - this.adj2;
                    this.userForm.patchValue({
                      item_total: Amt.toFixed(2),
                      discount: this.totalDiscount.toFixed(2),
                      //tax_total:  this.totalTaxAmt.toFixed(2)});
                      tax_total: Number(this.round(this.totalTaxAmt, 2))
                    });

                    let totlround = Math.round(finalBillamount);
                    let totlWithoutround = finalBillamount.toFixed(2);
                    this.RoundOff = (totlround - Number(totlWithoutround)).toFixed(2);



                    this.TcsAmt1 = (Number(totlround * tcs.tcs_rate) / 100).toFixed(2);

                    this.userForm.patchValue({ tcsamt: this.TcsAmt1 });

                    let t = Number(totlround) + Number(this.TcsAmt1)

                    if (this.einvoiceshow == true) {
                      this.userForm.patchValue({ payable_amt: finalBillamount.toFixed(2), roundoff_amt: 0 })


                    }
                    else {
                      this.userForm.patchValue({ payable_amt: totlround.toFixed(2) })

                      let roundOfAmt = Math.round(finalBillamount * 100) % 100;
                      if (roundOfAmt >= 50) {
                        roundOfAmt = 100 - roundOfAmt;
                        this.userForm.patchValue({ roundoff_amt: Number(Number(roundOfAmt) / 100).toFixed(2) })
                      }
                      else {
                        this.userForm.patchValue({ roundoff_amt: Number(0 - Number(roundOfAmt) / 100).toFixed(2) });
                      };

                    }
                    /*
                    this.userForm.patchValue({payable_amt:totlround.toFixed(2)})

                    let roundOfAmt = Math.round(finalBillamount * 100) % 100;
                    if(roundOfAmt >= 50)
                    {
                      roundOfAmt = 100 - roundOfAmt;
                      this.userForm.patchValue({roundoff_amt: Number(Number(roundOfAmt)/100).toFixed(2)})
                    }
                    else
                    {
                      this.userForm.patchValue({roundoff_amt: Number(0 - Number(roundOfAmt)/100).toFixed(2)});
                    };
                    //here ends
                    */
                    this.grandTotal = Number(this.grandTotal) + Number(data1["total_amt"]);

                    //HERE MAKING

                    if (this.userForm.get("discount").value > 0) {
                      //this.userForm.patchValue({});
                      //discount add later
                    }
                    if (this.userForm.get("tax_total").value > 0) {
                      //this.userForm.patchValue({});
                      //tax_total add later
                    }
                    if (this.userForm.get("applicable_amt").value > 0) {
                      //this.userForm.patchValue({});
                      //applicable_gl_ac add later
                    }
                    if (this.userForm.get("adj1_amt").value > 0) {
                      //this.userForm.patchValue({});
                      //adj1_gl_ac add later
                    }
                    if (this.userForm.get("adj2_amt").value > 0) {
                      //this.userForm.patchValue({});
                      //adj2_gl_ac add later
                    }
                    if (this.userForm.get("roundoff_amt").value > 0) {
                      this.userForm.patchValue({ roundoff_gl_ac: 'IB00001' });
                      //tax_total add later
                    }
                    if (this.userForm.get("tcsamt").value > 0) {
                      //this.userForm.patchValue({});
                      //tcsglac add later
                    }


                    this.sales_Invoice_Item_Dtls.at(i).patchValue({ item_group: ItemGrp["item_group"] })

                    this.userForm.patchValue({ grand_total: this.grandTotal.toFixed(2) });


                    this.ItemGr.push(ItemGrp["item_group"]);

                    this.TaxCode.push(data1["tax_code"]);
                    this.HsnCode.push(data1["hsn_code"]);
                    this.TaxRate.push(data1["tax_rate"]);
                    //  console.log("////////"+JSON.stringify(data1))
                    this.sales_Invoice_Item_Dtls.at(i).patchValue(data1);

                    itemgrpmulti += ItemGrp["item_group"];
                    if (this.userForm.get("invoice_type").value == 'INV00003') {
                      // alert(itemgrpmulti)
                      this.DropDownListService.getGroupItemLedgerForJob(itemgrpmulti).subscribe(data => {
                        console.log("ledger group::" + JSON.stringify(data))
                        this.status = true;
                      });
                    }
                    else {
                      itemgrpmulti = "";
                    }
                    //for hsn
                    timer(0).subscribe
                      (x => {
                        const distinctArrayHsnCode: any = [] = this.HsnCode.filter((n, i) => this.HsnCode.indexOf(n) === i);

                        this.addItemGrpHsn();
                        while (this.item_groupwise_hsnsumm.length)
                          this.item_groupwise_hsnsumm.removeAt(0);
                        for (let j = 0; j < distinctArrayHsnCode.length; j++) {
                          let DiscountAmt = 0;
                          for (let k = 0; k < this.sales_Invoice_Item_Dtls.length; k++) {

                            if (this.sales_Invoice_Item_Dtls.at(k).get("hsn_code").value == distinctArrayHsnCode[j]) {
                              DiscountAmt += this.sales_Invoice_Item_Dtls.at(k).get("amount").value - this.sales_Invoice_Item_Dtls.at(k).get("discount_amt").value;

                            }
                          }
                          this.addItemGrpHsn();

                          this.item_groupwise_hsnsumm.at(j).patchValue({ hsn_code: distinctArrayHsnCode[j], amount: DiscountAmt });
                        }
                      }
                      )

                    timer(0).subscribe
                      (x => {


                        const distinctArray: any = [] = this.ItemGr.filter((n, i) => this.ItemGr.indexOf(n) === i);

                        this.addItemGrp();
                        while (this.item_groupwise_summ.length)
                          this.item_groupwise_summ.removeAt(0)
                        for (let j = 0; j < distinctArray.length; j++) {
                          let Amt = 0;
                          let Discount = 0;

                          for (let k = 0; k < this.sales_Invoice_Item_Dtls.length; k++) {

                            if (this.sales_Invoice_Item_Dtls.at(k).get("item_group").value == distinctArray[j]) {
                              Amt += this.sales_Invoice_Item_Dtls.at(k).get("amount").value;
                              Discount += this.sales_Invoice_Item_Dtls.at(k).get("discount_amt").value;

                            }
                          }
                          this.addItemGrp();

                          this.item_groupwise_summ.at(j).patchValue({ item_group: distinctArray[j], item_total: Amt, discount_amt: Discount });

                          forkJoin(
                            this.Service.getItemGroupSalesAcc(distinctArray[j]),
                          ).subscribe(([ItemgrpLedger]) => {
                            this.item_groupwise_summ.at(j).patchValue({ item_ledger: ItemgrpLedger.item_total, discount_ledger: ItemgrpLedger.discount });

                            this.status = true;
                          });
                        }
                      }
                      )

                    timer(0).subscribe
                      (x => {
                        this.StateName = this.userForm.get("state").value;

                        const distinctArrayTax: any = [] = this.TaxCode.filter((n, i) => this.TaxCode.indexOf(n) === i);


                        this.addItemGrpTax();
                        while (this.item_groupwise_taxsumm.length)
                          this.item_groupwise_taxsumm.removeAt(0)
                        for (let j = 0; j < distinctArrayTax.length; j++) {
                          let TaxRate = 0;
                          let TaxAmt = 0;

                          for (let k = 0; k < this.sales_Invoice_Item_Dtls.length; k++) {

                            if (this.sales_Invoice_Item_Dtls.at(k).get("tax_code").value == distinctArrayTax[j]) {
                              TaxRate = this.sales_Invoice_Item_Dtls.at(k).get("tax_rate").value;
                              TaxAmt += this.sales_Invoice_Item_Dtls.at(k).get("tax_amt").value;

                            }
                          }
                          this.addItemGrpTax();


                          this.item_groupwise_taxsumm.at(j).patchValue({ tax_code: distinctArrayTax[j], tax_rate: TaxRate.toFixed(2), tax_amt: TaxAmt.toFixed(2) });

                          if (distinctArrayTax[j] != '' && distinctArrayTax[j] != null) {
                            forkJoin(
                              this.DropDownListService.getTaxCodeDetails(distinctArrayTax[j]),
                            ).subscribe(([TaxData]) => {

                              if (TaxData) {
                                this.item_groupwise_taxsumm.at(j).patchValue({
                                  percentage: TaxData.cgst, cgstledgerid: TaxData.cgst_output_ledger
                                  , sgstledgerid: TaxData.output_ledger, igstledgerid: TaxData.igst_output_ledger
                                });

                                this.status = true;

                                this.Tax_Rate = this.item_groupwise_taxsumm.at(j).get("tax_rate").value;
                                this.StateName = this.userForm.get("state").value;
                                this.Tax_Amt = this.item_groupwise_taxsumm.at(j).get("tax_amt").value as FormControl;

                                //if (this.StateName == 'BIHAR') {
                                if (this.StateName == this.company_state) {
                                  let Cgst = (this.Tax_Amt * (TaxData.cgst / 100));
                                  let Sgst = (this.Tax_Amt - Cgst);
                                  //  this.item_groupwise_taxsumm.at(j).patchValue({igst:0, cgst: Cgst.toFixed(2), sgst: Sgst.toFixed(2)});
                                  this.item_groupwise_taxsumm.at(j).patchValue({ igst: 0, cgst: Number(this.round(Cgst, 2)), sgst: Number(this.round(Sgst, 2)) });
                                }
                                else { this.item_groupwise_taxsumm.at(j).patchValue({ igst: this.Tax_Amt, cgst: 0, sgst: 0 }); }


                                const distinctArrayTaxRate: any = [] = this.TaxRate.filter((n, i) => this.TaxRate.indexOf(n) === i);

                                for (let j = 0; j < distinctArrayTaxRate.length; j++) {
                                  let Amount = 0;
                                  let DiscountAmt = 0;
                                  let Taxable_Amnt = 0;

                                  for (let k = 0; k < this.sales_Invoice_Item_Dtls.length; k++) {

                                    if (this.sales_Invoice_Item_Dtls.at(k).get("tax_rate").value == distinctArrayTaxRate[j]) {
                                      Amount += this.sales_Invoice_Item_Dtls.at(k).get("amount").value;
                                      DiscountAmt += this.sales_Invoice_Item_Dtls.at(k).get("discount_amt").value;
                                      Taxable_Amnt = Number(Amount.toFixed(2)) - Number(DiscountAmt.toFixed(2));

                                    }
                                  }
                                  this.item_groupwise_taxsumm.at(j).patchValue({ taxable_amt: Taxable_Amnt.toFixed(2) });
                                }
                              }

                              else {

                                alert("something error is happened");
                              }

                            }, (error) => {
                              this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");


                            });
                          }
                          if (data.taxdif == true || data.taxdif == 'true' || data.taxdif == 1) {



                          }

                        }
                      })
                    //this.item_groupwise_summ.at(i).patchValue({item_group:ItemGrp.item_group,item_total:this.amt});
                    i = i + 1;
                  });
                }

                // console.log("1")
                let Party = this.userForm.get("party").value;
                forkJoin(
                  this.DropDownListService.getDeliveryChallanDtls("delivery_cid=" + data["delivery_cid"]),
                  //this.DropDownListService.getDlvChallanShipmentDtls(data["delivery_cid"]),
                  this.DropDownListService.getDlvChallanShipmentDtlsFast(data["delivery_cid"]),
                  this.DropDownListService.getDlvChlnTransInfo(data["delivery_cid"]),
                  //this.DropDownListService.getDlvChallanPartyDtls(data["delivery_cid"]),
                  this.DropDownListService.getDlvChallanBrokerDtls(data["delivery_cid"]),
                  this.DropDownListService.getDlvChallanDoc(data["delivery_cid"]),
                  this.Service.custAccountRetriveList(Party),
                  this.DropDownListService.getChargesMatrixSalesdetails(data["delivery_cid"]),
                  this.DropDownListService.getAppChargesSalesdetails(data["delivery_cid"]),
                  this.DropDownListService.getSalesOrderDetailsthdeliverchallan(data["delivery_cid"]),
                  this.DropDownListService.getLoadingAdviceTransDtls(data["delivery_cid"]),
                  // ).subscribe(([challanData, shipmentdata, transData, partyData, brokerData, docsData, PartyTcs]) =>
                ).subscribe(([challanData, shipmentdata, transData, brokerData, docsData, PartyTcs, chargesData, appcharges, saleorderdetails, loadingtrans]) => {

                  this.userForm.patchValue({
                    salesorderno: challanData["salesorderno"], salesorderdate: challanData["salesorderdate"],
                    refchallanno: challanData["challan_no"], refchallandate: challanData["challan_date"], app_chgs_id: appcharges["app_chgs_id"]
                    , cust_refdocno: saleorderdetails["cust_refdocno"], cust_ref_doc_date: saleorderdetails["cust_ref_doc_date"]
                  });
                  // this.customerDelvAddList= custDelvData;
                  let PayableAmount: any;
                  let Tcs_rate: any;
                  PayableAmount = this.userForm.get("payable_amt").value as FormControl;

                  Tcs_rate = PartyTcs.tcs_rate;

                  this.TcsAmt = (Number(PayableAmount * Tcs_rate) / 100).toFixed(2);
                  //this.userForm.patchValue({tcsamt:this.TcsAmt});
                  console.log("shipmentdata" + JSON.stringify(shipmentdata))
                  if (loadingtrans["payment_term"] == 'APT00001') {
                    this.onday = false;
                  }
                  else {
                    this.onday = true;
                  }
                  this.sales_Invoice_Payment_Dtls.patchValue({ mode_of_payment: loadingtrans["mode_of_payment"], payment_term: loadingtrans["payment_term"], days: loadingtrans["days"] })
                  
                  this.sales_Invoice_Shipment_Dtls.patchValue({ paytoaddr: shipmentdata.pay_addr, paytodtls: shipmentdata.pay_details, shipaddr: shipmentdata.ship_addr, shipdtls: shipmentdata.ship_details });
                 /* this.sales_Invoice_Shipment_Dtls.patchValue({ paytoaddr: shipmentdata.pay_addr, paytodtls: shipmentdata.pay_details});
                  this.customerDelvAddList.forEach(element => {
                    if (element.shipping_name == this.userForm.get("party").value) {
                     // let ship_address=
                      this.sales_Invoice_Shipment_Dtls.patchValue({shipaddr: element.shipping_name, shipdtls: element.address})
    
                    }
                  });*/
                  // console.log("2")
                  let i = 0;
                  this.addBrokers();
                  this.broker_sl_no = 0;
                  while (this.sales_Invoice_Broker_Dtls.length)
                    this.sales_Invoice_Broker_Dtls.removeAt(0);

                  for (let data1 of brokerData) {
                    this.addBrokers();
                    this.sales_Invoice_Broker_Dtls.at(i).patchValue({
                      brokercode: data1.broker_code,
                      basis: data1.basis, rate: data1.rate,
                    });
                    i = i + 1;
                  }

                  let k = 0;
                  this.addTransporter();
                  this.transporter_sl_no = 0;
                  while (this.sales_Invoice_Trans_Dtls.length)
                    this.sales_Invoice_Trans_Dtls.removeAt(0);

                  for (let data1 of transData) {
                    this.addTransporter();
                    this.sales_Invoice_Trans_Dtls.at(k).patchValue({
                      transname: data1.transname,
                      vehicletype: data1.vehicletype, vehicleid: data1.vehicleno, ewaybillno: data1.ewaybillno
                    });
                    k = k + 1;
                  }


                  let j = 0;
                  this.addDocument();
                  while (this.sales_Invoice_Docs.length)
                    this.sales_Invoice_Docs.removeAt(0)

                  for (let data1 of docsData) {
                    this.addDocument();
                    this.sales_Invoice_Docs.at(j).patchValue({ doc_name: data1.doc_name });
                    j = j + 1;
                  }

                  let p = 0;
                  this.addAppCharfes();
                  while (this.sales_Invoice_app_chgs.length)
                    this.sales_Invoice_app_chgs.removeAt(0)
                  for (let appchargedata of chargesData) {
                    this.addAppCharfes();

                    this.sales_Invoice_app_chgs.at(p).patchValue({ charges_name: appchargedata["charge_name"], add_less: appchargedata["add_less"], rate_cal_method: appchargedata["rate_cal_method"], app_rate: appchargedata["app_rate"], tax_rate: appchargedata["tax_rate"] });
                    p = p + 1;
                  }
                  this.chargematrixdata();
                })

              }
            });
          }
          else {
            alert("Select Party and Invoice Type First!")
          }
          //ends here



        }



      }

    }



  }
  //ENDS HERE

  TcsAmt1: any;
  calRoundOfFigure(finalBillamount, tcs) {
    let PartyName: any;
    PartyName = this.userForm.get("party").value as FormControl;

    let totlround = Math.round(finalBillamount);

    let totlWithoutround = finalBillamount.toFixed(2);
    this.RoundOff = (totlround - Number(totlWithoutround)).toFixed(2);

    this.Service.custAccountRetriveList(PartyName).subscribe(data => {

      this.TcsAmt1 = (Number(totlround * data.tcs_rate) / 100).toFixed(2);
      this.userForm.patchValue({ tcsamt: this.TcsAmt1 });
      let t = Number(totlround) + Number(this.TcsAmt1)
      this.userForm.patchValue({ payable_amt: t.toFixed(2) })
      console.log("payable_amt " + this.userForm.get("payable_amt").value)
    }
    );
    // this.userForm.patchValue({roundoff_amt:this.RoundOff});//offon 19092022

    let roundOfAmt = Math.round(finalBillamount * 100) % 100;
    //start here 19092022
    if (roundOfAmt >= 50) {
      roundOfAmt = 100 - roundOfAmt;
      // console.log("roundOfAmt if "+ roundOfAmt)
      this.userForm.patchValue({ roundoff_amt: Number(Number(roundOfAmt) / 100).toFixed(2) })
    }
    else {
      this.userForm.patchValue({ roundoff_amt: Number(0 - Number(roundOfAmt) / 100).toFixed(2) });
    };

  }

  MainId: any;
  onClickBillPrint(id: any, invoice_id: string, Invoice_type: string, Party: any,business_unit) {
    this.Service.custAddRetriveList(Party).subscribe(data => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = { MainId: id, InvoiceId: invoice_id, StateName: data.state.toUpperCase(), Invoice_type: Invoice_type, Party: Party,business_unit:business_unit };
      let dialogRef = this.dialog.open(SalesBillPrintOptionsPopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => {

      });
      ;
    });
  }

  onClickBillPrintjobwork(id, invoice_id,bunit) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { MainId: id, invoiceid: invoice_id,bunit:bunit };
    let dialogRef = this.dialog.open(SaleinvoicejobworkprintComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {

    });


  }

  Payable_Amount: any;
  Item_Total: any;
  Item_Discount: any;
  Tax_Amtt: any;
  ValidatetotalAmt: any;
  RoundOFF_Amt: any;

  OnCalcute() {
    // timer(1000).subscribe
    // (x=>
    //    {
    this.StateName = this.userForm.get("state").value;
    // console.log("TaxCodeLength: "+this.TaxCode.length);
    const distinctArrayTax: any = [] = this.TaxCode.filter((n, i) => this.TaxCode.indexOf(n) === i);
    // console.log("distinctArrayTax: "+distinctArrayTax);

    this.addItemGrpTax();
    while (this.item_groupwise_taxsumm.length)
      this.item_groupwise_taxsumm.removeAt(0)
    for (let j = 0; j < distinctArrayTax.length; j++) {
      let TaxRate = 0;
      let TaxAmt = 0;

      for (let k = 0; k < this.sales_Invoice_Item_Dtls.length; k++) {

        if (this.sales_Invoice_Item_Dtls.at(k).get("tax_code").value == distinctArrayTax[j]) {
          TaxRate = this.sales_Invoice_Item_Dtls.at(k).get("tax_rate").value;
          TaxAmt += this.sales_Invoice_Item_Dtls.at(k).get("tax_amt").value;
          //  console.log("TaxRate:"+TaxRate);
          //  console.log("TaxAmt : "+TaxAmt);
        }
      }
      this.addItemGrpTax();
      //  console.log("TaxItemvv  :"+TaxItem); // 1, "string", false
      this.item_groupwise_taxsumm.at(j).patchValue({ tax_code: distinctArrayTax[j], tax_rate: TaxRate.toFixed(2), tax_amt: TaxAmt.toFixed(2) });
      if (distinctArrayTax[j] != '' && distinctArrayTax[j] != null) {
        forkJoin(
          this.DropDownListService.getTaxCodeDetails(distinctArrayTax[j]),
          this.DropDownListService.getCompanyBussinessUnitDetails(localStorage.getItem("company_name"),this.userForm.get("business_unit").value)
        ).subscribe(([TaxData,companystate]) => {
         // this.company_state=companystate["state_name"];
          this.item_groupwise_taxsumm.at(j).patchValue({
            percentage: TaxData.cgst, cgstledgerid: TaxData.cgst_output_ledger
            , sgstledgerid: TaxData.output_ledger, igstledgerid: TaxData.igst_output_ledger
          });

          this.status = true;

          this.Tax_Rate = this.item_groupwise_taxsumm.at(j).get("tax_rate").value;
          this.StateName = this.userForm.get("state").value;
          this.Tax_Amt = this.item_groupwise_taxsumm.at(j).get("tax_amt").value as FormControl;
          //if (this.StateName == 'BIHAR') {
          if (this.StateName == this.company_state) {
            let Cgst = (this.Tax_Amt * (TaxData.cgst / 100));
            let Sgst = (this.Tax_Amt - Cgst);
            this.item_groupwise_taxsumm.at(j).patchValue({ igst: 0, cgst: Cgst.toFixed(2), sgst: Sgst.toFixed(2) });
          }
          else { this.item_groupwise_taxsumm.at(j).patchValue({ igst: this.Tax_Amt, cgst: 0, sgst: 0 }); }
        });
      }
    }

    //taxrate
    const distinctArrayTaxRate: any = [] = this.TaxRate.filter((n, i) => this.TaxRate.indexOf(n) === i);

    for (let j = 0; j < distinctArrayTaxRate.length; j++) {
      let Amount = 0;
      let DiscountAmt = 0;
      let Taxable_Amnt = 0;

      for (let k = 0; k < this.sales_Invoice_Item_Dtls.length; k++) {

        if (this.sales_Invoice_Item_Dtls.at(k).get("tax_rate").value == distinctArrayTaxRate[j]) {
          Amount += this.sales_Invoice_Item_Dtls.at(k).get("amount").value;
          DiscountAmt += this.sales_Invoice_Item_Dtls.at(k).get("discount_amt").value;
          Taxable_Amnt = Number(Amount.toFixed(2)) - Number(DiscountAmt.toFixed(2));
          // console.log("Taxable_Amnt : " +Taxable_Amnt)
          // console.log("TaxDistAmount : " +Amount+ "..."+ "DiscountAmt : "+DiscountAmt)
        }
      }
      this.item_groupwise_taxsumm.at(j).patchValue({ taxable_amt: Taxable_Amnt.toFixed(2) });
    }
    //  console.log("distinctArrayTaxRate: "+distinctArrayTaxRate);


    this.Item_Total = 0;
    this.Item_Discount = 0;
    this.RoundOFF_Amt = this.userForm.get("roundoff_amt").value as FormControl;
    for (let i = 0; i < this.item_groupwise_summ.length; i++) {
      this.Item_Total += this.item_groupwise_summ.at(i).get("item_total").value;
      this.Item_Discount += this.item_groupwise_summ.at(i).get("discount_amt").value;
    }


    this.Tax_Amtt = 0;
    for (let k = 0; k < this.item_groupwise_taxsumm.length; k++) {
      this.Tax_Amtt = Number(this.Tax_Amtt) + Number(this.item_groupwise_taxsumm.at(k).get("tax_amt").value);
    }

    //console.log(" Item_Total: "+this.Item_Total);
    //console.log(" Item_Discount: "+this.Item_Discount);
    //console.log(" Tax_Amtt: "+this.Tax_Amtt);


    this.ValidatetotalAmt = Number(this.Item_Total) + Number(this.Tax_Amtt) - Number(this.Item_Discount) + Number(this.RoundOFF_Amt);
    // console.log(" ValidatetotalAmt: "+this.ValidatetotalAmt);

  }

  showPopUp(index) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: index, };
    const dialogRef = this.dialog.open(SalesQuoTaxModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data != '') {
        this.sales_Invoice_Item_Dtls.at(index).patchValue({ tax_code: data["tax_id"], tax_rate: data["tax_rate"] });
        this._taxrate = data['tax_rate'];
        this._packing_qty = this.sales_Invoice_Item_Dtls.at(index).get("squantity").value as FormControl;
        this._item_qty = this.sales_Invoice_Item_Dtls.at(index).get("quantity").value as FormControl;
        this._mrp = this.sales_Invoice_Item_Dtls.at(index).get('price').value as FormControl;
        this._mat_weight = this.sales_Invoice_Item_Dtls.at(index).get("mat_wt").value as FormControl;
        this._priceBasedOn = this.sales_Invoice_Item_Dtls.at(index).get('price_based_on').value as FormControl;
        this._discount = this.sales_Invoice_Item_Dtls.at(index).get('discount_rate').value as FormControl;
        this._discountBasadOn = this.sales_Invoice_Item_Dtls.at(index).get('discount_type').value as FormControl;
        this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, this._mat_weight,
          this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
      }
    });
  }

  onDelete(id: any) {
    this.status = false;
    if (confirm("Are you sure to delete this Invoice ?")) {
      this.userForm.patchValue({ username: localStorage.getItem("username") });
      this.Service.deleteSalesInvoice(this.userForm.getRawValue(), id).subscribe(data => {
        // console.log("Cat id:"+data.invoice_id);

        if (data.invoice_id == '' || data.invoice_id == null) {
          alert("Opps!!! Can't delete this Invoice !!!");
        } else {
          alert("Invoice Deleted successfully.");
        }
        this.status = true;
        this.ngOnInit()
      });
    }
    this.status = true;
  }

  ValidateTcsAmt: any;
  Id1: any;
  TaxTotal: any;

  send() {
    if (this.userForm.get("invoice_type").value == "" || this.userForm.get("invoice_type").value == null || this.userForm.get("invoice_type").value == 0) {
      alert("Please Select Invoice Type");
      this.status = true;
    }
    else if (this.userForm.get("business_unit").value == "" || this.userForm.get("business_unit").value == null || this.userForm.get("business_unit").value == 0) {
      alert("Please Select Business Unit");
      this.status = true;
    }
    else if (this.userForm.get("invoice_no").value == "" || this.userForm.get("invoice_no").value == null || this.userForm.get("invoice_no").value == 0) {
      alert("Please Enter Invoice Number");
      this.status = true;
    }
    else if (this.userForm.get("invoice_date").value == "" || this.userForm.get("invoice_date").value == null || this.userForm.get("invoice_date").value == 0) {
      alert("Please Enter Invoice Date");
      this.status = true;
    }
    else if (this.userForm.get("party").value == "" || this.userForm.get("party").value == null || this.userForm.get("party").value == 0) {
      alert("Please Select Party Name");
      this.status = true;
    }
    else if (this.userForm.get("challan").value == "" || this.userForm.get("challan").value == null || this.userForm.get("challan").value == 0) {
      alert("Please Select Challan");
      this.status = true;
    }
    else if (this.einvoiceshow == true && (this.userForm.get("e_invoice_no").value.length != 15 || this.userForm.get("e_invoice_no").value == "" || this.userForm.get("e_invoice_no").value == null)) {
      alert("Please Enter 15 digit e-invoice no");
      this.status = true;
    }
    else if ((this.userForm.get("invoice_type").value == 'INV00002' || this.userForm.get("invoice_type").value == 'INV00004') && this.userForm.get("payable_amt").value > 50000 && (this.userForm.get("waybill").value == "" || this.userForm.get("waybill").value == null)) {
      alert("Please Enter E-way bill ");
      this.status = true;
    }
    else if (this.userForm.get("salesorderno").value == "" || this.userForm.get("salesorderno").value == null || this.userForm.get("salesorderno").value == 0) {
      alert("Please Enter Sales Order No");
      this.status = true;
    }
    else {
      let itemcheck = false;
      let packingcheck = false;
      let itemqty = false;
      let packingqty = false;
      let waybillreq = false;
      let gstno = false;

      if (this.sales_Invoice_Tax_Info.get("gstno").value == "" || this.sales_Invoice_Tax_Info.get("gstno").value == null) {
        gstno = false;
      }
      else {
        gstno = true;
      }
      //console.log(" check here plz :  "+this.sales_Invoice_Tax_Info.get("gstno").value + " // " + gstno)
      for (let b = 0; b < this.sales_Invoice_Item_Dtls.length; b++) {
        if (this.userForm.get("jobwork").value != true && (this.sales_Invoice_Item_Dtls.at(b).get("item_code").value == null || this.sales_Invoice_Item_Dtls.at(b).get("item_code").value == '' || this.sales_Invoice_Item_Dtls.at(b).get("item_code").value == 0)) {
          itemcheck = true;
        }
        if (this.userForm.get("jobwork").value != true && (this.sales_Invoice_Item_Dtls.at(b).get("packing").value == null || this.sales_Invoice_Item_Dtls.at(b).get("packing").value == '' || this.sales_Invoice_Item_Dtls.at(b).get("packing").value == 0)) {
          packingcheck = true;
        }
        if (this.userForm.get("jobwork").value != true && (this.sales_Invoice_Item_Dtls.at(b).get("squantity").value == null || this.sales_Invoice_Item_Dtls.at(b).get("squantity").value == '' || this.sales_Invoice_Item_Dtls.at(b).get("squantity").value == 0 || this.sales_Invoice_Item_Dtls.at(b).get("squantity").value == "0")) {
          itemqty = true;
        }
        if (this.userForm.get("jobwork").value != true && (this.sales_Invoice_Item_Dtls.at(b).get("quantity").value == null || this.sales_Invoice_Item_Dtls.at(b).get("quantity").value == '' || this.sales_Invoice_Item_Dtls.at(b).get("quantity").value == 0 || this.sales_Invoice_Item_Dtls.at(b).get("quantity").value == "0")) {
          packingqty = true;
        }
        if (this.userForm.get("jobwork").value != true && (this.sales_Invoice_Item_Dtls.at(b).get("tax_amt").value > 0)) {
          waybillreq = true;
        }
      }

      if (itemcheck == true && this.userForm.get("jobwork").value == false) {
        alert("Please Select Item Name in Item Details Tab!!!"); this.status = true;
      }
      else if (packingcheck == true && this.userForm.get("jobwork").value == false) {
        alert("Please Select Item Name in Item Details Tab!!!"); this.status = true;
      }
      else if (itemqty == true && this.userForm.get("jobwork").value == false) {
        alert("Item Qty cannot be Zero in Item Details Tab!!!"); this.status = true;
      }
      else if (packingqty == true && this.userForm.get("jobwork").value == false) {
        alert("Packing Qty cannot be Zero in Item Details Tab!!!"); this.status = true;
      }
      else if ((waybillreq == true && gstno == true) && (this.userForm.get("waybill").value == "" || this.userForm.get("waybill").value == null)) {
        alert("Please Enter Way Bill !!!"); this.status = true;
      }
      /*   else if(waybillreq ==true && (this.sales_Invoice_Tax_Info.get("gstno").value == "" || this.sales_Invoice_Tax_Info.get("gstno").value == null ))
         {
           alert("Please Enter GST NO. in Tax Information Tab !!!");this.status = true;
         }*/
      else {

        this.Id1 = this.userForm.get("id").value as FormControl;
        timer(1000).subscribe
          (x => {

            this.Id = this.userForm.get("id").value as FormControl;

            this.Payable_Amount = this.userForm.get("payable_amt").value as FormControl;
            this.ValidateTcsAmt = this.userForm.get("tcsamt").value as FormControl;
            this.TaxTotal = this.userForm.get("tax_total").value as FormControl;




            this.Item_Total = 0;
            this.Item_Discount = 0;
            this.RoundOFF_Amt = this.userForm.get("roundoff_amt").value as FormControl;

            //  for(let i=0;i<this.item_groupwise_summ.length;i++)
            //  {
            //    this.Item_Total += Number(this.item_groupwise_summ.at(i).get("item_total").value) ;
            //    this.Item_Discount +=Number(this.item_groupwise_summ.at(i).get("discount_amt").value) ;
            //  }

            if (this.userForm.get("jobwork").value == true) {



              this.Tax_Amtt = 0;
              for (let k = 0; k < this.sales_Invoice_Item_Dtls_for_jobwork_price.length; k++) {
                this.Item_Total += Number(this.sales_Invoice_Item_Dtls_for_jobwork_price.at(k).get("tax_value").value);
                this.Tax_Amtt = Number(this.Tax_Amtt) + (Number(this.sales_Invoice_Item_Dtls_for_jobwork_price.at(k).get("tot_amount").value) - this.sales_Invoice_Item_Dtls_for_jobwork_price.at(k).get("tax_value").value);
              }

            }
            else {
              for (let i = 0; i < this.sales_Invoice_Item_Dtls.length; i++) {
                this.Item_Total += Number(this.sales_Invoice_Item_Dtls.at(i).get("amount").value);
                this.Item_Discount += Number(this.sales_Invoice_Item_Dtls.at(i).get("discount_amt").value);
              }

              this.Tax_Amtt = 0;
              for (let k = 0; k < this.item_groupwise_taxsumm.length; k++) {
                this.Tax_Amtt = Number(this.Tax_Amtt) + Number(this.item_groupwise_taxsumm.at(k).get("tax_amt").value);
              }
            }




            // console.log(" Item_Total: "+this.Item_Total);
            // console.log(" Item_Discount: "+this.Item_Discount);
            // console.log(" Tax_Amtt: "+this.Tax_Amtt);
            let adj_amt: number = 0;
            let adj2_amt: number = 0;
            if (this.userForm.get("adj1_amt").value == null || this.userForm.get("adj1_amt").value == '') {
              adj_amt = 0;
            }
            else {
              adj_amt = this.userForm.get("adj1_amt").value;
            }
            if (this.userForm.get("adj2_amt").value == null || this.userForm.get("adj2_amt").value == '') {
              adj2_amt = 0;
            }
            else {
              adj2_amt = this.userForm.get("adj2_amt").value;
            }

            this.ValidatetotalAmt = (Number(this.Item_Total) + Number(this.TaxTotal) - Number(this.Item_Discount) + Number(this.RoundOFF_Amt) + Number(this.ValidateTcsAmt) + adj_amt - adj2_amt).toFixed(2);
            console.log("1  " + this.Item_Total + "/ " + this.TaxTotal + " / " + this.Item_Discount)
            //   console.log("2" + this.RoundOFF_Amt + " / " + this.ValidateTcsAmt + " / " + this.userForm.get("adj1_amt").value + " / "+ this.userForm.get("adj2_amt").value)
            //  console.log("3 " + adj_amt + " / " + adj2_amt)
            console.log(" ValidatetotalAmt: " + this.ValidatetotalAmt);
            console.log(" Payable_Amount: " + this.Payable_Amount);

            this.userForm.patchValue({
              company_id: localStorage.getItem("company_name"), fin_year: localStorage.getItem("financial_year"), username: localStorage.getItem("username")
            });
            this.submitted = true;
            if (!this.userForm.valid) {
              alert('Please fill all fields!')
              return false;
            }

            else if (this.Payable_Amount != this.ValidatetotalAmt) {
              alert('Please check all Mathematical Operation first..!');
              return false;
            }
            else if ((Number(this.userForm.get("roundoff_amt").value) > 0 || Number(this.userForm.get("roundoff_amt").value) < 0) && (this.userForm.get("roundoff_gl_ac").value == null || this.userForm.get("roundoff_gl_ac").value == 0)) {
              alert("Pleasse Select Round Off Ledger");
              this.status = true;
            }
            else {
              if (this.invoicePopupStatus == false) {
                alert("Please Select Show Buton");
              }
              else {
                //start
                this.status = false;
                let eincoicecheking: boolean = false;
                if (this.userForm.get("invoice_type").value == "INV00002" || this.userForm.get("invoice_type").value == "INV00004") {

                  eincoicecheking = true;
                }
                console.log("Check :: " + eincoicecheking);
                console.log("Check 2 :: " + this.Id);
                if (eincoicecheking == true) {
                  let invoiceno = "NA";
                  if (this.Id == '' || this.Id == null) {
                    //console.log("HERE");
                    this.Id = 0;
                  }
                  else {
                    invoiceno = this.userForm.get("invoice_no").value;
                  }
                  this.DropDownListService.geteinvoicestatus_saleinv(this.Id, invoiceno).subscribe(data => {
                    console.log("GGGSHJHSJ IRN  :: " + data[0]["irn_no"]);
                    console.log("CHECKCHECK  :: " + Number(data[0]["einvoicelength"]));
                    if (data[0]["irn_no"] != "NA") 
                    {
                      if (this.Id > 0) {
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
                        // this.Service.updateSalesInv(this.userForm.getRawValue(), this.Id).subscribe(data =>
                        this.Service.updateSalesInv(frmData).subscribe(data => {
                          //  console.log(this.userForm.getRawValue());
                          alert("Sales Invoice Updated successfully.");
                          this.userForm.reset();
                          this.ngOnInit();

                          this.item_sl_no = 0;
                          while (this.sales_Invoice_Item_Dtls.length)
                            this.sales_Invoice_Item_Dtls.removeAt(0);
                          this.addItem();

                          this.broker_sl_no = 0;
                          while (this.sales_Invoice_Broker_Dtls.length)
                            this.sales_Invoice_Broker_Dtls.removeAt(0);
                          this.addBrokers();


                          while (this.sales_Invoice_Docs.length)
                            this.sales_Invoice_Docs.removeAt(0);
                          this.addDocument();

                          while (this.item_groupwise_summ.length)
                            this.item_groupwise_summ.removeAt(0);
                          this.addItemGrp();

                          while (this.item_groupwise_taxsumm.length)
                            this.item_groupwise_taxsumm.removeAt(0);
                          this.addItemGrpTax();

                          while (this.item_groupwise_hsnsumm.length)
                            this.item_groupwise_hsnsumm.removeAt(0);
                          this.addItemGrpHsn();

                          this.transporter_sl_no = 0;
                          while (this.sales_Invoice_Trans_Dtls.length)
                            this.sales_Invoice_Trans_Dtls.removeAt(0);
                          this.addTransporter();

                        }, (error) => {
                          this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
                          // this.ngOnInit()
                        });
                      }
                      else {
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
                        this.Service.createSalesInvoice(frmData).subscribe(data => {
                          //console.log(this.userForm.getRawValue());
                          alert("Sales Invoice created successfully.");
                          this.userForm.reset();
                          this.ngOnInit();
                          this.item_sl_no = 0;
                          while (this.sales_Invoice_Item_Dtls.length)
                            this.sales_Invoice_Item_Dtls.removeAt(0);
                          this.addItem();

                          this.broker_sl_no = 0;
                          while (this.sales_Invoice_Broker_Dtls.length)
                            this.sales_Invoice_Broker_Dtls.removeAt(0);
                          this.addBrokers();

                          while (this.sales_Invoice_Docs.length)
                            this.sales_Invoice_Docs.removeAt(0);
                          this.addDocument();

                          while (this.item_groupwise_summ.length)
                            this.item_groupwise_summ.removeAt(0);
                          this.addItemGrp();

                          while (this.item_groupwise_taxsumm.length)
                            this.item_groupwise_taxsumm.removeAt(0);
                          this.addItemGrpTax();

                          while (this.item_groupwise_hsnsumm.length)
                            this.item_groupwise_hsnsumm.removeAt(0);
                          this.addItemGrpHsn();

                          this.transporter_sl_no = 0;
                          while (this.sales_Invoice_Trans_Dtls.length)
                            this.sales_Invoice_Trans_Dtls.removeAt(0);
                          this.addTransporter();
                          //. window.location.reload();
                          this.status = true;
                        }, (error) => {
                          this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
                          //this.ngOnInit()
                        });
                      }
                    }
                    else {
                      alert(" Please update Bill Number " + data[0]["invoiceno"] + " with e-invoice number !!!!!");
                      this.status = true;

                    }

                  });
                }
                else {

                  if (this.Id > 0) {
                    const InputData = this.userForm.getRawValue();
                    console.log("input update: " + JSON.stringify(InputData));
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
                    console.log("Form data updatee: " + frmData);
                    this.status = false;
                    // this.Service.updateSalesInv(this.userForm.getRawValue(), this.Id).subscribe(data =>
                    this.Service.updateSalesInv(frmData).subscribe(data => {
                      //  console.log(this.userForm.getRawValue());
                      alert("Sales Invoice Updated successfully.");
                      this.userForm.reset();
                      this.ngOnInit();

                      this.item_sl_no = 0;
                      while (this.sales_Invoice_Item_Dtls.length)
                        this.sales_Invoice_Item_Dtls.removeAt(0);
                      this.addItem();

                      this.broker_sl_no = 0;
                      while (this.sales_Invoice_Broker_Dtls.length)
                        this.sales_Invoice_Broker_Dtls.removeAt(0);
                      this.addBrokers();


                      while (this.sales_Invoice_Docs.length)
                        this.sales_Invoice_Docs.removeAt(0);
                      this.addDocument();

                      while (this.item_groupwise_summ.length)
                        this.item_groupwise_summ.removeAt(0);
                      this.addItemGrp();

                      while (this.item_groupwise_taxsumm.length)
                        this.item_groupwise_taxsumm.removeAt(0);
                      this.addItemGrpTax();

                      while (this.item_groupwise_hsnsumm.length)
                        this.item_groupwise_hsnsumm.removeAt(0);
                      this.addItemGrpHsn();

                      this.transporter_sl_no = 0;
                      while (this.sales_Invoice_Trans_Dtls.length)
                        this.sales_Invoice_Trans_Dtls.removeAt(0);
                      this.addTransporter();

                    }, (error) => {
                      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error in Sales Invoice Update....");
                      // this.ngOnInit()
                    });
                  }
                  else {
                    const InputData = this.userForm.getRawValue();
                    console.log("input input: " + JSON.stringify(InputData));
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
                    console.log("Form data input: " + frmData);
                    this.status = false;
                    this.Service.createSalesInvoice(frmData).subscribe(data => {
                      //console.log(this.userForm.getRawValue());
                      alert("Sales Invoice created successfully.");
                      this.userForm.reset();
                      this.ngOnInit();
                      this.item_sl_no = 0;
                      while (this.sales_Invoice_Item_Dtls.length)
                        this.sales_Invoice_Item_Dtls.removeAt(0);
                      this.addItem();

                      this.broker_sl_no = 0;
                      while (this.sales_Invoice_Broker_Dtls.length)
                        this.sales_Invoice_Broker_Dtls.removeAt(0);
                      this.addBrokers();

                      while (this.sales_Invoice_Docs.length)
                        this.sales_Invoice_Docs.removeAt(0);
                      this.addDocument();

                      while (this.item_groupwise_summ.length)
                        this.item_groupwise_summ.removeAt(0);
                      this.addItemGrp();

                      while (this.item_groupwise_taxsumm.length)
                        this.item_groupwise_taxsumm.removeAt(0);
                      this.addItemGrpTax();

                      while (this.item_groupwise_hsnsumm.length)
                        this.item_groupwise_hsnsumm.removeAt(0);
                      this.addItemGrpHsn();

                      this.transporter_sl_no = 0;
                      while (this.sales_Invoice_Trans_Dtls.length)
                        this.sales_Invoice_Trans_Dtls.removeAt(0);
                      this.addTransporter();
                      //. window.location.reload();
                      this.status = true;
                    }, (error) => {
                      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
                      //this.ngOnInit()
                    });
                  }


                }
                //end
              }

            }

          })
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

  viewpdf(i, tm) {

    var values = tm[i].controls.doc_file_name.value
    //var values=tm[i].controls.doc_pdf.value
    console.log("values:" + values)
    //this.file_name=values.substring(35,tm[i].controls.doc_pdf.length);
    this.file_name = values;
    // alert(this.file_name);
    this.DropDownListService.downloadFileSystem(this.file_name).subscribe(response => {

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
    this.Service.getdeletefileSalesInvoice(dataid).subscribe(data => {

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
    this.DropDownListService.getdocumentListwithfileSalesInvoice(this.file_name)
      .subscribe(data => {

        console.log("data " + JSON.stringify(data[0].id));
        this.deletepdfwithid(data[0].id, i);

        this.status = true;
      }, (error) => { this.status = true; console.log("ERROR get: " + JSON.stringify(error)); });

    // alert(JSON.stringify(this.process_no.value)); 
  }

  HsnCode1 = [];
  TaxCode1 = [];
  TaxRate1 = [];
  ItemGr1 = [];
  StateName1: any;
  onUpdate(id: any, invoice_id: string, action) {
    this.salesinvoicesave = true;
    this.userForm.patchValue({ id: id });

    this.status = false;
    this.isHidden = true;
    this.packingItem = [];

    this.totalItem = 0;
    this.totalDiscount = 0;
    this.totalTaxAmt = 0;
    //this.showList('add');
    if (action == 'view') {
      this.action = 'view';
      this.salesinvoicesave = false;
    }
    else { this.action = 'update'; }
    // this.selectedItemName = [];
    //this.selectedPackingItem = [];
    this.company_name = localStorage.getItem("company_name");

    forkJoin(
      this.Service.retriveSalesInv(id),
      this.Service.getSalesInvItmDtls(invoice_id),
      this.Service.getSalesInvBrkDtls(invoice_id),
      this.Service.getSalesInvDocs(invoice_id),
      this.Service.getSalesInvTaxInfo(invoice_id),
      this.Service.getSalesInvBpDtls(invoice_id),
      this.Service.getSalesInvTransDtls(invoice_id),
      this.Service.getSalesInvShipmentDtls(invoice_id),
      this.Service.getSalesInvPaymentDtls(invoice_id),
      this.DropDownListService.ledgerNameList(),
      this.DropDownListService.getInvSalesTypes(),

      //this.DropDownListService.custometrBusList(this.company_name)
      this.DropDownListService.getcompanyBUMNCListnew(this.company_name)
    ).subscribe(([SalesInvoiceData, itemData, brokerData,
      docData, TaxData, BPData, TransData, ShipmentData, PaymentData, ledgerData, invoiceData, BUUNIT]) => {
      //console.log("EINVOICE :: "+JSON.stringify(docData));
      this.DropDownListService.getCompanyBussinessUnitDetails(localStorage.getItem("company_name"),SalesInvoiceData["business_unit"]).subscribe(companystate=>{
        this.company_state=companystate["state_name"];
       // console.log("com state:"+this.company_state)
      this.invoiceType = invoiceData;
      // console.log("ITEM  :: "+JSON.stringify(itemData));
      // console.log("EINVOICE 3:: "+JSON.stringify(BUUNIT));
      // console.log("EINVOICE2:: "+JSON.stringify(ledgerData));
      this.invoicePopupStatus = true;
      this.businesslists = BUUNIT;

      this.ledgerNames = ledgerData;
      this.onChangePartyName(SalesInvoiceData["party"]);
      this.onChangeBuUnit(SalesInvoiceData["business_unit"]);
      this.onChangeInvoiceType(SalesInvoiceData["invoice_type"])
      // console.log(" hello tuhin 2222 : : " + id )
      this.appCharges = SalesInvoiceData["applicable_amt"];
      this.tcsAmt = SalesInvoiceData["tcsamt"];
      this.adj1 = SalesInvoiceData["adj1_amt"];
      this.adj2 = SalesInvoiceData["adj2_amt"];
      this.totalItem = SalesInvoiceData["item_total"];
      this.discountAmt = SalesInvoiceData["discount"];
      this.totalTaxAmt = SalesInvoiceData["tax_total"];
      this.currentDate = SalesInvoiceData["invoice_date"];

      //console.log(" Check :: "+ SalesInvoiceData["e_invoice_no"]);

      this.userForm.patchValue({
        id: SalesInvoiceData["id"], invoice_id: SalesInvoiceData["invoice_id"], invoice_type: SalesInvoiceData["invoice_type"], brokage_app: SalesInvoiceData["brokage_app"],
        invoice_no: SalesInvoiceData["invoice_no"], invoice_date: SalesInvoiceData["invoice_date"], party: SalesInvoiceData["party"], business_unit: SalesInvoiceData["business_unit"],
        challan: SalesInvoiceData["challan"], item_total: SalesInvoiceData["item_total"], item_total_gl_ac: SalesInvoiceData["item_total_gl_ac"], e_invoice_no: SalesInvoiceData["e_invoice_no"],
        waybill: SalesInvoiceData["waybill"], discount: SalesInvoiceData["discount"], discount_gl_ac: SalesInvoiceData["discount_gl_ac"],
        tax_total: SalesInvoiceData["tax_total"], tax_total_gl_ac: SalesInvoiceData["tax_total_gl_ac"], remarks: SalesInvoiceData["remarks"],
        applicable_amt: SalesInvoiceData["applicable_amt"], applicable_gl_ac: SalesInvoiceData["applicable_gl_ac"], adj1_amt: SalesInvoiceData["adj1_amt"],
        adj1_gl_ac: SalesInvoiceData["adj1_gl_ac"], adj2_amt: SalesInvoiceData["adj2_amt"], adj2_gl_ac: SalesInvoiceData["adj2_gl_ac"], grand_total: Number(this.round(SalesInvoiceData["grand_total"], 2)),
        roundoff_amt: SalesInvoiceData["roundoff_amt"], roundoff_gl_ac: SalesInvoiceData["roundoff_gl_ac"],
        payable_amt: SalesInvoiceData["payable_amt"], payable_amt_gl_ac: SalesInvoiceData["payable_amt_gl_ac"], company_id: SalesInvoiceData["company_id"],
        fin_year: SalesInvoiceData["fin_year"], username: SalesInvoiceData["username"], tcsamt: SalesInvoiceData["tcsamt"], tcsglac: SalesInvoiceData["tcsglac"],
        salesorderno: SalesInvoiceData["salesorderno"], salesorderdate: SalesInvoiceData["salesorderdate"], refchallanno: SalesInvoiceData["refchallanno"], refchallandate: SalesInvoiceData["refchallandate"],
        cust_refdocno: SalesInvoiceData["cust_refdocno"], cust_ref_doc_date: SalesInvoiceData["cust_ref_doc_date"], reference_id: SalesInvoiceData["reference_id"], jobwork: SalesInvoiceData["jobwork"],
        policyno: SalesInvoiceData["policyno"],asn_no: SalesInvoiceData["asn_no"]
      });
      // if (this.userForm.get("state").value == 'BIHAR') {
      if (this.userForm.get("state").value == this.company_state) {
        this.isOpenPolicy = false;
      }
      else {
        this.isOpenPolicy = true;
      }

      // console.log("static s"+JSON.stringify(SalesInvoiceData))
      //  console.log( "hi "+this.userForm.get("invoice_type").value)
      //console.log("itemData : "+  JSON.stringify(itemData));
      if (SalesInvoiceData["jobwork"] == true) {
        this.Jobworkshow = true;
        forkJoin(
          this.DropDownListService.getInvoiceJobItemDtls(invoice_id),
          this.DropDownListService.getInvoiceTServiceItem(invoice_id),
          this.DropDownListService.getItemThruSalesThruBU_inv_type(this.userForm.get("business_unit").value, this.company_name, SalesInvoiceData["invoice_type"]),
          this.DropDownListService.getItemServiceList(this.company_name),
          this.Service.taxCodeDtlsRetriveList("TC00002")
        ).subscribe(([jobData, servicedata, itemlist, servicelist, taxlist]) => {
          this.TaxCode = [];
          this.TaxRate = [];
          let u = 0;
          this.selectedService = [];
          this.totalItem = 0;
          this.totalDiscount = 0;
          this.totalTaxAmt = 0;
          this.grandTotal = 0;
          this._taxAmt = 0;
          // console.log("jobData:"+JSON.stringify(jobData))
          this.jobitemlist = itemlist;
          this.taxcodelist = taxlist;
          let j1 = 0;
          this.addJobworkItem();
          this.jobwork_sl_no = 0;
          while (this.sales_Invoice_Item_Dtls_for_jobwork.length)
            this.sales_Invoice_Item_Dtls_for_jobwork.removeAt(0);

          for (let data12 of jobData) {

            forkJoin(
              this.DropDownListService.getItemMasterPackMat(data12["job_item"])).subscribe(([packingList]) => {
                // console.log("jobpackinglist:"+JSON.stringify(packingList))
                this.addJobworkItem();
                this.jobpackinglist[j1] = packingList;

                this.selectedJobItem[j1] = data12["job_item"];
                this.selectedJobPacking[j1] = data12["job_packing"];
                console.log("packing" + data12["job_packing"])
                this.sales_Invoice_Item_Dtls_for_jobwork.at(j1).patchValue({
                  job_item: data12["job_item"], job_packing: data12["job_packing"],
                  job_hsn: data12["job_hsn"], pack_qty: data12["pack_qty"], pack_uom: data12["pack_uom"], price_based_on: data12["price_based_on"],
                  item_qty: data12["item_qty"], item_uom: data12["item_uom"], tolerance: data12["tolerance"]
                });
                j1 = j1 + 1;
                this.status = true;
              });

          }
          this.item_services = servicelist;
          //console.log("servicedata:"+JSON.stringify(servicedata))
          let j2 = 0;
          this.addJobworkItemservice();
          this.service_sl_no = 0;
          while (this.sales_Invoice_Item_Dtls_for_jobwork_price.length)
            this.sales_Invoice_Item_Dtls_for_jobwork_price.removeAt(0);
          for (let data11 of servicedata) {
            this.addJobworkItemservice();
            this.selectedService[j2] = data11["item_service"];

            this.totalItem += Number(data11["tax_value"]);

            this._taxAmt += (Number(data11["tot_amount"]) - Number(data11["tax_value"]));
            this.TaxCode.push(data11["taxcode"]);
            this.TaxRate.push(data11["igst_tax"]);

            this.sales_Invoice_Item_Dtls_for_jobwork_price.at(j2).patchValue({
              item_service: data11["item_service"], sac_code: data11["sac_code"],
              job_price: data11["job_price"], taxcode: data11["taxcode"], tax_value: Number(this.round(data11["tax_value"], 2)), cgst_tax: data11["cgst_tax"], cgst_amt: data11["cgst_amt"],
              sgst_tax: data11["sgst_tax"], sgst_amt: data11["sgst_amt"], tot_amount: Number(this.round(data11["tot_amount"], 2)), igst_amt: data11["igst_amt"], igst_tax: data11["igst_tax"]
            });
            j2 = j2 + 1;
          }
          this.userForm.patchValue({ grand_total: Number(this.round(this.totalItem, 2)) })
          //starts here 
          let Amt = this.totalItem;

          this.totalTaxAmt = this.totalTaxAmt + this._taxAmt;

          let netAmt = this.totalItem - this.totalDiscount;
          let totalAmt = netAmt + this.totalTaxAmt;
          let finalBillamount = totalAmt + this.appCharges + this.adj1 - this.adj2;
          this.userForm.patchValue({
            item_total: Amt.toFixed(2),
            discount: this.totalDiscount.toFixed(2),
            tax_total: this.totalTaxAmt.toFixed(2)
          })
          let totlround = Math.round(finalBillamount);
          let totlWithoutround = finalBillamount.toFixed(2);
          this.RoundOff = (totlround - Number(totlWithoutround)).toFixed(2);




          this.TcsAmt1 = 0;
          this.userForm.patchValue({ tcsamt: this.TcsAmt1 });
          let t = Number(totlround) + Number(this.TcsAmt1)
          if (this.einvoiceshow == true) {
            this.userForm.patchValue({ payable_amt: finalBillamount.toFixed(2), roundoff_amt: 0 })
          }
          else {
            this.userForm.patchValue({ payable_amt: totlround.toFixed(2) })
            let roundOfAmt = Math.round(finalBillamount * 100) % 100;
            if (roundOfAmt >= 50) {
              roundOfAmt = 100 - roundOfAmt;
              this.userForm.patchValue({ roundoff_amt: Number(Number(roundOfAmt) / 100).toFixed(2) })
            }
            else {
              this.userForm.patchValue({ roundoff_amt: Number(0 - Number(roundOfAmt) / 100).toFixed(2) });
            };
          }


          /* this.userForm.patchValue({payable_amt:totlround.toFixed(2)})
           let roundOfAmt = Math.round(finalBillamount * 100) % 100;
           if(roundOfAmt >= 50)
           {
             roundOfAmt = 100 - roundOfAmt;
             this.userForm.patchValue({roundoff_amt: Number(Number(roundOfAmt)/100).toFixed(2)})
           }
           else
           {
             this.userForm.patchValue({roundoff_amt: Number(0 - Number(roundOfAmt)/100).toFixed(2)});
           };
            */
          //STARTS HERE
          timer(0).subscribe
            (x => {
              this.StateName = this.userForm.get("state").value;
              const distinctArrayTax: any = [] = this.TaxCode.filter((n, i) => this.TaxCode.indexOf(n) === i);
              this.addItemGrpTax();
              while (this.item_groupwise_taxsumm.length)
                this.item_groupwise_taxsumm.removeAt(0)
              for (let j = 0; j < distinctArrayTax.length; j++) {
                let TaxRate = 0;
                let TaxAmt = 0;
                for (let k = 0; k < this.sales_Invoice_Item_Dtls_for_jobwork_price.length; k++) {
                  if (this.sales_Invoice_Item_Dtls_for_jobwork_price.at(k).get("taxcode").value == distinctArrayTax[j]) {
                    TaxRate = this.sales_Invoice_Item_Dtls_for_jobwork_price.at(k).get("igst_tax").value;
                   //if (this.StateName == 'BIHAR') {
                    if (this.StateName == this.company_state) {
                      TaxAmt += (Number(this.sales_Invoice_Item_Dtls_for_jobwork_price.at(k).get("cgst_amt").value) + Number(this.sales_Invoice_Item_Dtls_for_jobwork_price.at(k).get("sgst_amt").value));
                    }
                    else {
                      TaxAmt += this.sales_Invoice_Item_Dtls_for_jobwork_price.at(k).get("igst_amt").value;
                    }

                  }
                }
                this.addItemGrpTax();
                this.item_groupwise_taxsumm.at(j).patchValue({ tax_code: distinctArrayTax[j], tax_rate: Number(TaxRate).toFixed(2), tax_amt: TaxAmt.toFixed(2) });

                if (distinctArrayTax[j] != '' && distinctArrayTax[j] != null) {
                  forkJoin(
                    this.DropDownListService.getTaxCodeDetails(distinctArrayTax[j]),
                  ).subscribe(([TaxData]) => {
                    // console.log(distinctArrayTax[j]+"TaxData::"+JSON.stringify(TaxData))
                    if (TaxData) {

                      this.item_groupwise_taxsumm.at(j).patchValue({ percentage: TaxData.cgst, cgstledgerid: TaxData.cgst_output_ledger, sgstledgerid: TaxData.output_ledger, igstledgerid: TaxData.igst_output_ledger });

                      this.Tax_Rate = this.item_groupwise_taxsumm.at(j).get("tax_rate").value;
                      this.StateName = this.userForm.get("state").value;
                      this.Tax_Amt = this.item_groupwise_taxsumm.at(j).get("tax_amt").value as FormControl;
                      //if (this.StateName == 'BIHAR') {
                      if (this.StateName == this.company_state) {
                        let Cgst = (this.Tax_Amt * (TaxData.cgst / 100));
                        let Sgst = (this.Tax_Amt - Cgst);
                        this.item_groupwise_taxsumm.at(j).patchValue({ igst: 0, cgst: Cgst.toFixed(2), sgst: Sgst.toFixed(2) });
                      }
                      else {
                        this.item_groupwise_taxsumm.at(j).patchValue({ igst: this.Tax_Amt, cgst: 0, sgst: 0 });
                      }

                      const distinctArrayTaxRate: any = [] = this.TaxRate.filter((n, i) => this.TaxRate.indexOf(n) === i);

                      for (let j = 0; j < distinctArrayTaxRate.length; j++) {
                        let Amount = 0;
                        let DiscountAmt = 0;
                        let Taxable_Amnt = 0;

                        for (let k = 0; k < this.sales_Invoice_Item_Dtls_for_jobwork_price.length; k++) {
                          // console.log("igst_tax:"+this.sales_Invoice_Item_Dtls_for_jobwork_price.at(k).get("igst_tax").value+"//"+distinctArrayTaxRate[j])
                          if (this.sales_Invoice_Item_Dtls_for_jobwork_price.at(k).get("igst_tax").value == distinctArrayTaxRate[j]) {
                            //console.log(distinctArrayTax[j]+"total tax amt::"+this.sales_Invoice_Item_Dtls_for_jobwork_price.at(k).get("tax_value").value)
                            Amount += this.sales_Invoice_Item_Dtls_for_jobwork_price.at(k).get("tax_value").value;
                            //DiscountAmt+=this.sales_Invoice_Item_Dtls_for_jobwork_price.at(k).get("discount_amt").value;
                            //Taxable_Amnt = Number(Amount.toFixed(2))-Number(DiscountAmt.toFixed(2));
                            // console.log("Amt total tax amt::"+Amount)
                            Taxable_Amnt = Number(Amount.toFixed(2));
                          }
                        }
                        // console.log("Taxable_Amnt:"+Taxable_Amnt)
                        this.item_groupwise_taxsumm.at(j).patchValue({ taxable_amt: Taxable_Amnt.toFixed(2) });
                        this.status = true;
                      }
                    }
                    else {
                      alert("something error is happened");
                    }
                  });
                }
              }
            })

        });

      }
      else {
        this.Jobworkshow = false;
        this.Item_Total = 0;
        this.Item_Discount = 0;
        let k = 0;
        this.addItem();
        this.item_sl_no = 0;
        // console.log("Length :: "+this.sales_Invoice_Item_Dtls.length)
        while (this.sales_Invoice_Item_Dtls.length)
          this.sales_Invoice_Item_Dtls.removeAt(0);
        for (let data1 of itemData) {
          this.status = false;
          this.addItem();
          forkJoin(
            this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
            this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"], this.company_name)
          ).subscribe(([packingList, capacityEmptyWt]) => {
            //console.log("Item json:: "+JSON.stringify(data1));
            //// console.log("EINVOICE2:: "+JSON.stringify(capacityEmptyWt));
            this.capacity[k] = capacityEmptyWt.capacity;
            this.empty_bag_wt[k] = capacityEmptyWt.empty_big_wt;
            this.packingItem[k] = packingList;
            this.sales_Invoice_Item_Dtls.at(k).patchValue(data1);
            //console.log("data1"+data1["amount"]+"//"+data1["discount_amt"])
            this.Item_Total += Number(data1["amount"]);
            this.Item_Discount += Number(data1["discount_amt"]);
            // console.log("1" +this.Item_Total + " / "+ this.Item_Discount)

            this.status = true;
            this.HsnCode1.push(data1["hsn_code"]);
            this.TaxCode1.push(data1["tax_code"]);
            this.TaxRate1.push(data1["tax_rate"]);
            this.ItemGr1.push(data1["item_group"]);
            //console.log(this.TaxCode1+"tax code item"+this.TaxCode1.length)
            //console.log(this.TaxRate1+"tax rate item"+data1["tax_rate"])



            // calculation

            timer(1000).subscribe
              (x => {
                const distinctArrayHsnCode: any = [] = this.HsnCode1.filter((n, i) => this.HsnCode1.indexOf(n) === i);
                // console.log("distinctArrayHsnCode: "+distinctArrayHsnCode);
                this.addItemGrpHsn();
                while (this.item_groupwise_hsnsumm.length)
                  this.item_groupwise_hsnsumm.removeAt(0);
                for (let j = 0; j < distinctArrayHsnCode.length; j++) {
                  let DiscountAmt = 0;
                  for (let k = 0; k < this.sales_Invoice_Item_Dtls.length; k++) {

                    if (this.sales_Invoice_Item_Dtls.at(k).get("hsn_code").value == distinctArrayHsnCode[j]) {
                      DiscountAmt += this.sales_Invoice_Item_Dtls.at(k).get("amount").value - this.sales_Invoice_Item_Dtls.at(k).get("discount_amt").value;
                      //  console.log("DiscountAmt:"+DiscountAmt);
                    }
                  }
                  this.addItemGrpHsn();
                  // console.log("hsn_code  :"+distinctArrayHsnCode[j]); // 1, "string", false
                  this.item_groupwise_hsnsumm.at(j).patchValue({ hsn_code: distinctArrayHsnCode[j], amount: DiscountAmt.toFixed(2) });
                }
              }
              )

            timer(1000).subscribe
              (x => {

                //  console.log("ItemGrLength: "+this.ItemGr1.length);
                const distinctArray: any = [] = this.ItemGr1.filter((n, i) => this.ItemGr1.indexOf(n) === i);
                // console.log("distinctArray: "+distinctArray);
                //let j=0
                this.addItemGrp();
                while (this.item_groupwise_summ.length)
                  this.item_groupwise_summ.removeAt(0)
                for (let j = 0; j < distinctArray.length; j++) {
                  let Amt = 0;
                  let Discount = 0;

                  for (let k = 0; k < this.sales_Invoice_Item_Dtls.length; k++) {

                    if (this.sales_Invoice_Item_Dtls.at(k).get("item_group").value == distinctArray[j]) {
                      Amt += this.sales_Invoice_Item_Dtls.at(k).get("amount").value;
                      Discount += this.sales_Invoice_Item_Dtls.at(k).get("discount_amt").value;
                      // console.log("Amt:"+Amt);
                      // console.log("Discount : "+Discount);
                    }
                  }
                  this.addItemGrp();
                  //console.log("Item  :"+distinctArray[j]); // 1, "string", false
                  this.item_groupwise_summ.at(j).patchValue({ item_group: distinctArray[j], item_total: Amt.toFixed(2), discount_amt: Discount.toFixed(2) });

                  forkJoin(
                    this.Service.getItemGroupSalesAcc(distinctArray[j]),
                  ).subscribe(([ItemgrpLedger]) => {
                    // console.log("Discount : "+JSON.stringify(ItemgrpLedger));
                    this.item_groupwise_summ.at(j).patchValue({ item_ledger: ItemgrpLedger.item_total, discount_ledger: ItemgrpLedger.discount });

                    this.status = true;
                  });
                }
              }
              )


            timer(1000).subscribe
              (x => {
                this.StateName1 = this.userForm.get("state").value;
                // console.log("TaxCodeLength: "+this.TaxCode1.length);
                const distinctArrayTax: any = [] = this.TaxCode1.filter((n, i) => this.TaxCode1.indexOf(n) === i);
                // console.log("distinctArrayTax: "+distinctArrayTax);

                this.addItemGrpTax();
                while (this.item_groupwise_taxsumm.length)
                  this.item_groupwise_taxsumm.removeAt(0)
                for (let j = 0; j < distinctArrayTax.length; j++) {
                  let TaxRate = 0;
                  let TaxAmt = 0;

                  for (let k = 0; k < this.sales_Invoice_Item_Dtls.length; k++) {

                    if (this.sales_Invoice_Item_Dtls.at(k).get("tax_code").value == distinctArrayTax[j]) {
                      TaxRate = this.sales_Invoice_Item_Dtls.at(k).get("tax_rate").value;
                      TaxAmt += this.sales_Invoice_Item_Dtls.at(k).get("tax_amt").value;

                    }
                  }
                  this.addItemGrpTax();
                  //console.log(TaxRate+"TaxItemvv  :"+TaxAmt+" tax code:"+distinctArrayTax[j]); // 1, "string", false
                  this.item_groupwise_taxsumm.at(j).patchValue({ tax_code: distinctArrayTax[j], tax_rate: TaxRate.toFixed(2), tax_amt: TaxAmt.toFixed(2) });

                  if (distinctArrayTax[j] != '' && distinctArrayTax[j] != null) {
                    forkJoin(
                      this.DropDownListService.getTaxCodeDetails(distinctArrayTax[j]),
                    ).subscribe(([TaxData]) => {
                      //console.log("TaxItemvv 1   :"+JSON.stringify(TaxData));
                      if (TaxData) {
                        this.item_groupwise_taxsumm.at(j).patchValue({
                          percentage: TaxData.cgst, cgstledgerid: TaxData.cgst_output_ledger
                          , sgstledgerid: TaxData.output_ledger, igstledgerid: TaxData.igst_output_ledger
                        });

                        this.status = true;

                        this.Tax_Rate = this.item_groupwise_taxsumm.at(j).get("tax_rate").value;
                        this.StateName1 = this.userForm.get("state").value;
                        this.Tax_Amt = this.item_groupwise_taxsumm.at(j).get("tax_amt").value as FormControl;

                        //console.log("tax amt:"+this.Tax_Amt)
                        //if (this.StateName1 == 'BIHAR') {
                        if (this.StateName1 == this.company_state) {
                          let Cgst = (this.Tax_Amt * (TaxData.cgst / 100));
                          let Sgst = (this.Tax_Amt - Cgst);
                          //console.log("cgst tax:"+Cgst.toFixed(2))
                          //console.log("sgst tax:"+Sgst.toFixed(2))
                          this.item_groupwise_taxsumm.at(j).patchValue({ igst: 0, cgst: Cgst.toFixed(2), sgst: Sgst.toFixed(2) });
                        }
                        else { this.item_groupwise_taxsumm.at(j).patchValue({ igst: this.Tax_Amt, cgst: 0, sgst: 0 }); }


                        const distinctArrayTaxRate: any = [] = this.TaxRate1.filter((n, i) => this.TaxRate1.indexOf(n) === i);

                        for (let j = 0; j < distinctArrayTaxRate.length; j++) {
                          let Amount = 0;
                          let DiscountAmt = 0;
                          let Taxable_Amnt = 0;

                          for (let k = 0; k < this.sales_Invoice_Item_Dtls.length; k++) {

                            if (this.sales_Invoice_Item_Dtls.at(k).get("tax_rate").value == distinctArrayTaxRate[j]) {
                              Amount += this.sales_Invoice_Item_Dtls.at(k).get("amount").value;
                              DiscountAmt += this.sales_Invoice_Item_Dtls.at(k).get("discount_amt").value;
                              Taxable_Amnt = Number(Amount.toFixed(2)) - Number(DiscountAmt.toFixed(2));
                              // console.log("Taxable_Amnt : " +Taxable_Amnt)
                              // console.log("TaxDistAmount : " +Amount+ "..."+ "DiscountAmt : "+DiscountAmt)
                            }
                          }
                          this.item_groupwise_taxsumm.at(j).patchValue({ taxable_amt: Taxable_Amnt.toFixed(2) });
                        }
                      }

                      else {
                        //.pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}))
                        alert("something error is happened");
                      }

                    });
                  }

                }
              })
            k = k + 1;
          });
        }
      }


      //  console.log("brokerData: "+  JSON.stringify(brokerData));
      let j = 0;
      this.addBrokers();
      this.broker_sl_no = 0;
      while (this.sales_Invoice_Broker_Dtls.length)
        this.sales_Invoice_Broker_Dtls.removeAt(0);
      for (let data1 of brokerData) {
        this.addBrokers();
        this.sales_Invoice_Broker_Dtls.at(j).patchValue(data1);
      }

      this.addDocument();
      while (this.sales_Invoice_Docs.length)
        this.sales_Invoice_Docs.removeAt(0);
      this.sales_Invoice_Docs_list.removeAt(0);
      this.addDocument();
      for (let data1 of docData)
        //this.sales_Invoice_Docs.patchValue(docData);
        //  console.log("docData: "+JSON.stringify(docData));
        this.addDocumentlist();
      this.sales_Invoice_Docs_list.patchValue(docData);

      // console.log("taxData11: "+  JSON.stringify(TaxData));
      this.sales_Invoice_Tax_Info.patchValue(TaxData);

      // console.log("taxData: "+  JSON.stringify(BPData));
      this.sales_Invoice_BP_Dtls.patchValue(BPData);

      // console.log("TransData: "+  JSON.stringify(TransData));
      let i = 0;
      this.addTransporter();
      this.broker_sl_no = 0;
      while (this.sales_Invoice_Trans_Dtls.length)
        this.sales_Invoice_Trans_Dtls.removeAt(0);
      for (let data1 of TransData) {
        this.addTransporter();
        this.sales_Invoice_Trans_Dtls.at(i).patchValue(data1);
      }

      //console.log("ShipmentData: "+  JSON.stringify(ShipmentData));

      this.sales_Invoice_Shipment_Dtls.patchValue(ShipmentData);

      // console.log("PaymentData: "+  JSON.stringify(PaymentData));
      this.sales_Invoice_Payment_Dtls.patchValue(PaymentData);
      this.status = true;
    });
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });

    if (localStorage.getItem("svalue") == 'true') {
      localStorage.setItem("svalue", 'false');
    }



    this.TaxTotal = this.userForm.get("tax_total").value;

    this.RoundOFF_Amt = this.userForm.get("roundoff_amt").value;
    this.ValidateTcsAmt = this.userForm.get("tcsamt").value;

  }

  chargematrixdata() {
    let totalamount: number = 0, totalchargematrix: number = 0;

    for (let i = 0; i < this.sales_Invoice_Item_Dtls.length; i++) {

      if (this.sales_Invoice_Item_Dtls.at(i).get("price_based_on").value == "Packing") {
        totalamount += Number(this.sales_Invoice_Item_Dtls.at(i).get("mat_wt").value);
      }

      if (this.sales_Invoice_Item_Dtls.at(i).get("price_based_on").value == "Item") {
        totalamount += Number(this.sales_Invoice_Item_Dtls.at(i).get("mat_wt").value);
      }


      for (let v = 0; v < this.sales_Invoice_app_chgs.length; v++) {
        if (this.sales_Invoice_app_chgs.at(v).get("rate_cal_method").value == "UOM") {

          this.sales_Invoice_app_chgs.at(v).patchValue({ amount: Number(totalamount * (Number(this.sales_Invoice_app_chgs.at(v).get("app_rate").value))).toFixed(2) })
        }
        if (this.sales_Invoice_app_chgs.at(v).get("rate_cal_method").value == "%") {
          this.sales_Invoice_app_chgs.at(v).patchValue({ amount: Number(totalamount * (Number(this.sales_Invoice_app_chgs.at(v).get("app_rate").value) / 100)).toFixed(2) })
        }
        if (this.sales_Invoice_app_chgs.at(v).get("rate_cal_method").value == "Fixed") {
          this.sales_Invoice_app_chgs.at(v).patchValue({ amount: Number(this.sales_Invoice_app_chgs.at(v).get("app_rate").value).toFixed(2) })
        }

        totalchargematrix += Number(this.sales_Invoice_app_chgs.at(v).get("amount").value);
      }

    }


    this.userForm.patchValue({ tot_amt: Number(totalchargematrix).toFixed(2) });

  }
  delete(index) {
    if (index) {
      this.sales_Invoice_app_chgs.removeAt(index);
      this.chargematrixcalculation();
    }
    else { alert("can't delete all rows"); }
  }

  chargematrixcalculation() {
    let totalchargematrix: number = 0;

    for (let v = 0; v < this.sales_Invoice_app_chgs.length; v++) {
      totalchargematrix += Number(this.sales_Invoice_app_chgs.at(v).get("amount").value);
    }

    this.userForm.patchValue({ tot_amt: Number(totalchargematrix).toFixed(2) });


  }

  accountpostingpopup(id, invoiceid, invoice_type) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: 0, };
    let dialogref;
    //alert(id+"//"+invoiceid);
    dialogref = this.dialog.open(SalesInvoiceAccountPostingComponent, {
      data: { id: id, invoiceid: invoiceid, invoice_type: invoice_type }, height: '80%',
      width: '60%'
    });
    dialogref.afterClosed().subscribe(data => {
      //console.log("return::"+JSON.stringify(data))
      if(data.response_return)
        {
          this.listSalesInvoice.find(data => {
            return data.invoice_id == invoiceid;
          }).export = data.response_return;
        }
    });

  }

  getProducts(request) {
    // console.log("tuhin req "+request.size);
    this.DropDownListService.getSales_Invoice_pagination(request.page, request.size)
      .subscribe(data => {
        this.listSalesInvoice = data['content'];
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
        // console.log("2" + serchText);
        this.DropDownListService.findsaleorder(serchText).subscribe(data => {
          this.listSalesInvoice = data

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

    this.status = false;
    this.DropDownListService.searchSalesInvoiceFast("orderno=" + order1_no + "&fromdate=" + fromdate + "&todate=" + todate + "&party1=" + party1 + "&finyear=" + finyear).subscribe(data => {
      console.log("here data comses " + JSON.stringify(data))
      this.listSalesInvoice = data;
      this.status = true;

    }, (error) => {
      this.status = true;
      alert("Sales Invoice Not Found !!!")
      this.listSalesInvoice = [];
    })
  }

  doctypeExists: boolean = false;
  onChangeDoctype(index) {
    for (let p = 0; p < this.sales_Invoice_Docs.length; p++) {
      //console.log(p+"///"+index+"doctype1:"+this.sales_Invoice_Docs.at(p).get("doctype").value)
      if (this.sales_Invoice_Docs.at(p).get("doctype").value == 'Transport' && p != index) {
        this.doctypeExists = true;
      }
      //console.log("Enter : : "+this.doctypeExists)
    }
    if (this.doctypeExists == true && this.sales_Invoice_Docs.at(index).get("doctype").value == 'Transport') {
      this.doctypeExists = false;
      this.sales_Invoice_Docs.at(index).patchValue({ doctype: '0', doc_name: '' });
      this.deleteDocument(index);
      alert("Doc Type 'Transport' Can't Use Twice,Please Change...");
      //console.log("Enter 2 : : "+this.doctypeExists)
      this.status = true;
    }
  }



  addJobworkItemservice() {
    this.service_sl_no = this.service_sl_no + 1;
    this.sales_Invoice_Item_Dtls_for_jobwork_price.push(this.fb.group({
      slno: this.service_sl_no,
      item_service: '',
      sac_code: '',
      job_price: '',
      tax_value: '',
      cgst_tax: '',
      cgst_amt: '',
      sgst_tax: '',
      sgst_amt: '',
      tot_amount: '',
      igst_tax: '',
      igst_amt: '',
      taxcode: ''

    }));

    this.sales_Invoice_Item_Dtls_for_jobwork_price.at(this.service_sl_no - 1).patchValue({
      item_service: '',
      sac_code: '',
      job_price: '',
      tax_value: '',
      cgst_tax: '',
      cgst_amt: '',
      sgst_tax: '',
      sgst_amt: '',
      tot_amount: '',
      igst_tax: '',
      igst_amt: '',
      taxcode: ''
    });

  }

  deleteJobworkItemservice(index) {
    if (this.service_sl_no > 1) {
      this.sales_Invoice_Item_Dtls_for_jobwork_price.removeAt(index);
      this.service_sl_no = this.service_sl_no - 1;
    }
    else {
      this.service_sl_no = 1;

      alert("can't delete all rows");
      this.sales_Invoice_Item_Dtls_for_jobwork_price.reset();
      this.sales_Invoice_Item_Dtls_for_jobwork_price.at(0).patchValue({ sl_no: this.service_sl_no });

      this.sales_Invoice_Item_Dtls_for_jobwork_price.at(this.service_sl_no - 1).patchValue({
        item_service: '',
        sac_code: '',
        job_price: '',
        tax_value: '',
        cgst_tax: '',
        cgst_amt: '',
        sgst_tax: '',
        sgst_amt: '',
        tot_amount: '',
        igst_tax: '',
        igst_amt: '',
        taxcode: ''
      });
    }

    for (let i = 1; i <= this.service_sl_no; i++)
      this.sales_Invoice_Item_Dtls_for_jobwork_price.at(i - 1).patchValue({ sl_no: i });

  }



  addJobworkItem() {
    this.jobwork_sl_no = this.jobwork_sl_no + 1;
    this.sales_Invoice_Item_Dtls_for_jobwork.push(this.fb.group({
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

    this.sales_Invoice_Item_Dtls_for_jobwork.at(this.jobwork_sl_no - 1).patchValue({
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
      this.sales_Invoice_Item_Dtls_for_jobwork.removeAt(index);
      this.jobwork_sl_no = this.jobwork_sl_no - 1;
    }
    else {
      this.jobwork_sl_no = 1;

      alert("can't delete all rows");
      this.sales_Invoice_Item_Dtls_for_jobwork.reset();
      this.sales_Invoice_Item_Dtls_for_jobwork.at(0).patchValue({ sl_no: this.jobwork_sl_no });

      this.sales_Invoice_Item_Dtls_for_jobwork.at(this.jobwork_sl_no - 1).patchValue({
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
      this.sales_Invoice_Item_Dtls_for_jobwork.at(i - 1).patchValue({ sl_no: i });

  }

  jobworkshow(event) {
    if (event.checked) {
      this.Jobworkshow = true;
      this.addItem();
      this.item_sl_no = 0;
      while (this.sales_Invoice_Item_Dtls.length) { this.sales_Invoice_Item_Dtls.removeAt(0); }
      this.packingItem = [];
      this.packingItem = [];
      this.addItem();

    }
    else {
      this.Jobworkshow = false;
      this.addJobworkItem();
      this.jobwork_sl_no = 0;
      while (this.sales_Invoice_Item_Dtls_for_jobwork.length) { this.sales_Invoice_Item_Dtls_for_jobwork.removeAt(0); }

      this.jobpackinglist = [];
      this.selectedJobItem = [];
      this.selectedJobPacking = [];
      this.addJobworkItem();

      this.addJobworkItemservice();
      this.service_sl_no = 0;
      while (this.sales_Invoice_Item_Dtls_for_jobwork_price.length) { this.sales_Invoice_Item_Dtls_for_jobwork_price.removeAt(0); }
      this.selectedService = [];
      this.addJobworkItemservice();

    }
  }

  einvoiceCreate(id, invoice_id, party) {
    this.status = false;
    forkJoin(
      this.Service.retriveSalesInv(id),
      this.Service.getSalesInvShipmentDtls(invoice_id),
      this.Service.getInvTaxSum(invoice_id),
      this.Service.custStatutoryRetriveList(party),
      this.DropDownListService.getCustomerAddressDetails(party)
    ).subscribe(([SalesInvoiceData, shipmentData, taxData, partydetails, customeraddress]) => {

      this.einvoiceGeneration.patchValue({ Version: '1.1', ShipDtls: null });
      this.TranDtls.patchValue({
        TaxSch: 'GST',
        SupTyp: 'B2B',
        IgstOnIntra: 'N',
        RegRev: null,
        EcmGstin: null
      })

      this.DocDtls.patchValue({
        Typ: 'INV',
        No: SalesInvoiceData.invoice_no,
        //Dt: formatDate(SalesInvoiceData.invoice_date, 'dd/MM/yyyy', 'en')})
        Dt: formatDate(SalesInvoiceData.invoice_date, 'dd/MM/yyyy', 'en')
      })

      this.SellerDtls.patchValue({
        Gstin: '10AATCA7447B1ZV',
        LglNm: 'AAYOG AGRO PRIVATE LIMITED',
        TrdNm: 'AAYOG AGRO PRIVATE LIMITED',
        Addr1: '802 MAHUA ROAD BELKUNDA',
        Addr2: 'BHOJPATTI VAISHALI',
        Loc: 'HAJIPUR',
        Pin: '844125',
        Stcd: '10',
        Ph: null,
        Em: null
      })
      let address: any;
      if (customeraddress["add1"].legth > 103) {
        address = customeraddress["add1"].substring(101, 200);
      }
      else {
       // address = "Not Required";
        address = null;
      }
      this.BuyerDtls.patchValue({
        Gstin: partydetails.gst_no,
        LglNm: SalesInvoiceData["partyname"],
        TrdNm: SalesInvoiceData["partyname"],
        Pos: partydetails.gst_no.substring(0, 2),
        Addr1: customeraddress["add1"].substring(0, 100),
        Addr2: address,
        Loc: customeraddress["district"],
        Pin: customeraddress["pincode"],
        Stcd: partydetails.gst_no.substring(0, 2),
        Ph: null,
        Em: null
      })
      // console.log("taxData:"+JSON.stringify(SalesInvoiceData))
      this.ValDtls.patchValue({
        AssVal: SalesInvoiceData.item_total,
        //IgstVal: taxData[0]["cgst"]+taxData[0]["sgst"],
        IgstVal: taxData[0]["igst"],
        CgstVal: taxData[0]["cgst"],
        SgstVal: taxData[0]["sgst"],
        StCesVal: 0,
        Discount: 0,
        OthChrg: 0,
        RndOffAmt: SalesInvoiceData.roundoff_amt,
        //TotInvVal: SalesInvoiceData["grand_total"]
        TotInvVal: SalesInvoiceData["payable_amt"]
      })
      //console.log("SalesInvoiceData.invoice_type"+SalesInvoiceData.invoice_type)
      if (SalesInvoiceData.invoice_type == 'INV00003') {
        forkJoin(
          this.DropDownListService.getInvoiceJobItemDtls(invoice_id),
          this.DropDownListService.getInvoiceTServiceItem(invoice_id)
        ).subscribe(([jobitem, serviceitem]) => {
          //console.log("Job Item:"+JSON.stringify(jobitem))
          //console.log("SERVICE Item:"+JSON.stringify(serviceitem))
          this.addItemList();
          while (this.ItemList.length)
            this.ItemList.removeAt(0);
          this.addItemList();

          this.ItemList.at(0).patchValue({
            SlNo: '1',
            PrdDesc: serviceitem[0].item_service_name,
            IsServc: 'Y',
            HsnCd: serviceitem[0].sac_code,
            Qty: jobitem[0].item_qty,
            UnitPrice: serviceitem[0].job_price,
            TotAmt: serviceitem[0].tax_value,
            Discount: 0,
            PreTaxVal: '0',
            AssAmt: this.round(Number(serviceitem[0].tax_value), 2),
            GstRt: serviceitem[0].igst_tax,
            // IgstAmt:serviceitem[0].cgst_amt+serviceitem[0].sgst_amt,
            IgstAmt: serviceitem[0].igst_amt,
            CgstAmt: serviceitem[0].cgst_amt,
            SgstAmt: serviceitem[0].sgst_amt,
            CesRt: 0,
            CesAmt: 0,
            CesNonAdvlAmt: 0,
            StateCesRt: 0,
            StateCesAmt: 0,
            StateCesNonAdvlAmt: 0,
            OthChrg: 0,
            TotItemVal: serviceitem[0].tot_amount
          })
          if (jobitem[0].price_based_on == "Packing") {
            this.ItemList.at(0).patchValue({ Qty: jobitem[0].pack_qty, Unit: jobitem[0].pack_uom })
          }
          else {
            if (jobitem[0].item_uom == "QTLS") {
              this.ItemList.at(0).patchValue({ Qty: jobitem[0].item_qty, Unit: 'QTL' })
            }
            else {
              this.ItemList.at(0).patchValue({ Qty: jobitem[0].item_qty, Unit: jobitem[0].item_uom })
            }
          }
          /*this.Service.createEinvoiceGeneration(id,this.einvoiceGeneration.getRawValue()).subscribe( data => 
          {
            alert("E-Inv Generation Done.")
            this.status=true;
          });*/
          this.statusdto.patchValue({ status: JSON.stringify(this.einvoiceGeneration.getRawValue()) })
          this.Service.createEinvoiceGeneration(this.statusdto.getRawValue(), id, localStorage.getItem("username")).subscribe(data => {

            //console.log("Status1:"+data.status)
            let message = data.status.substring(4, data.status.length);
            // console.log("message"+message)
            if (data.status.includes('Yes')) {
              alert(message);
            }
            else {
              alert(data.status)
            }
            this.ngOnInit();
            this.status = true;
          });
        });
      }
      else {
        //console.log("enter else:")
        this.Service.getSalesInvItmDtls(invoice_id).subscribe(itemData => {
          this.addItemList();
          let k = 0;
          while (this.ItemList.length)
            this.ItemList.removeAt(0);
          for (let item of itemData) {
            this.addItemList();
            this.ItemList.at(k).patchValue({
              SlNo: "" + Number(k + 1),
              PrdDesc: item.item_name,
              IsServc: 'N',
              HsnCd: item.hsn_code,
              // Qty:item.quantity,
              UnitPrice: item.price,
              TotAmt: item.amount,
              Discount: item.discount_amt,
              PreTaxVal: 0,
              AssAmt: this.round(Number(item.amount + item.discount_amt), 2),
              GstRt: item.tax_rate,
              IgstAmt: item.igstamt,
              CgstAmt: item.cgstamt,
              SgstAmt: item.sgstamt,
              CesRt: 0,
              CesAmt: 0,
              CesNonAdvlAmt: 0,
              StateCesRt: 0,
              StateCesAmt: 0,
              StateCesNonAdvlAmt: 0,
              OthChrg: 0,
              TotItemVal: item.total_amt
            })

            if (item.price_based_on == "Packing") {
              this.ItemList.at(k).patchValue({ Qty: item.squantity, Unit: item.suom })
            }
            else {
              if (item.uom == "QTLS") {
                this.ItemList.at(k).patchValue({ Qty: item.quantity, Unit: 'QTL' })
              }
              else {
                this.ItemList.at(k).patchValue({ Qty: item.quantity, Unit: item.uom })
              }
            }


            k++;
          }
          //console.log("json::"+JSON.stringify(this.einvoiceGeneration.getRawValue()))
          /* this.Service.createEinvoiceGeneration(id,this.einvoiceGeneration.getRawValue()).subscribe( data => 
           {
             alert("E-Inv Generation Done.")
             this.status=true;
           });*/
          this.statusdto.patchValue({ status: JSON.stringify(this.einvoiceGeneration.getRawValue()) })
          this.Service.createEinvoiceGeneration(this.statusdto.getRawValue(), id, localStorage.getItem("username")).subscribe(data => {
            //console.log("Status1:"+data.status)
            let message = data.status.substring(4, data.status.length);
            //console.log("message"+message)
            if (data.status.includes('Yes')) {
              alert(message);
            }
            else {
              alert(data.status)
            }
            this.ngOnInit();
            this.status = true;
          });
        });
      }

    });
  }


  einvoiceCencel(invoice_id, id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: 0, };
    let dialogref;
    //alert(id+"//"+invoiceid);
    dialogref = this.dialog.open(SalesInvoiceEinvoiceCancelComponent, {
      data: {}, height: '60%',
      width: '40%'
    });
    dialogref.afterClosed().subscribe(datamsg => {
      this.status = false;
      console.log("cencel_message:" + datamsg.cencel_message)
      this.DropDownListService.geteinvoicedetails(invoice_id).subscribe(data => {
        //ack_no//invoice_id
        this.cancel.patchValue(
          {
            Irn: data['irn_no'],
            CnlRsn: "1",
            CnlRem: "Wrong entry",
          });
        // console.log(" :: " + JSON.stringify(data) )
        this.responsedto.patchValue({ status: JSON.stringify(this.cancel.getRawValue()), cancel_message: datamsg.cencel_message })
        this.Service.createEinvoicecancel(this.responsedto.getRawValue(), id, localStorage.getItem("username")).subscribe(data => {
          //console.log("check status::"+data.status)
          if (data.status == 'Done') {
            alert("E-Invoice Cancellation Done.")
          }
          else {
            alert(data.status)
          }
          this.ngOnInit();
          this.status = true;
        });
      })
    });
  }

  trans_name:any;

  ewaybill_create(invoice_id, id, invoice_date, delivery_cid) {
    this.status = false;
    forkJoin(
      this.DropDownListService.geteinvoicedetails(invoice_id),
      this.Service.getSalesInvTransDtls(invoice_id),
      this.Service.getDelivery_challan_Chgs_dynDtls(delivery_cid)
    )

      .subscribe(([data, transdata, transcharges]) => {
        //console.log(JSON.stringify(transdata))
        if(transdata[0]["transportername"]==0 || transdata[0]["transportername"]=='')
        {
          this.trans_name=null;
        }
        else
        {
          this.trans_name=transdata[0]["transportername"];
        }
        this.ewaybillcreate.patchValue({
          Irn: data['irn_no'],
          // Distance: transcharges[0]['distance_in_km'],
          Distance: 0,
          TransMode: "1",
          TransId: null,
          //TransName: transdata[0]["transportername"],
         // TransName: this.trans_name,
          TransName: null,
          TrnDocDt: formatDate(invoice_date, 'dd/MM/yyyy', 'en'),
          TrnDocNo: null,
          VehNo: transdata[0]["vehicleno"].replaceAll(' ', ''),
          VehType: "R"
        })
        this.statusdto.patchValue({ status: JSON.stringify(this.ewaybillcreate.getRawValue()) })
        this.Service.ewaybillcreate(this.statusdto.getRawValue(), id, localStorage.getItem("username")).subscribe(data => {
          //console.log("status::::"+data.status)
          let message = data.status.substring(5, data.status.length);
          //console.log("message"+message)
          if (data.status.includes('Done')) {
            alert(message);
          }
          else if (data.status.includes('None')) {
            alert("E-way Bill has not been Created!!!!!!")
          }
          else {
            alert(data.status)
          }
          this.ngOnInit();
          this.status = true;
        });
      });
  }

  ewaybill_cancel(invoice_id, id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: 0, };
    let dialogref;
    //alert(id+"//"+invoiceid);
    dialogref = this.dialog.open(SalesInvoiceEinvoiceCancelComponent, {
      data: {}, height: '60%',
      width: '40%'
    });
    dialogref.afterClosed().subscribe(datamsg => {
      this.status = false;
      console.log("cencel_message:" + datamsg.cencel_message)
      this.DropDownListService.geteinvoicedetails(invoice_id).subscribe(data => {
        this.ewaybillcancel.patchValue(
          {
            ewbNo: data['eway_bill_no'],
            cancelRsnCode: 2,
            cancelRmrk: "Cancelled the order"
          });
        // console.log(" :: " + JSON.stringify(data) )
        this.responsedto.patchValue({ status: JSON.stringify(this.ewaybillcancel.getRawValue()), cancel_message: datamsg.cencel_message })
        this.Service.ewaybillcancel(this.responsedto.getRawValue(), id, localStorage.getItem("username")).subscribe(data => {
          //console.log("check status::"+data.status)
          if (data.status == 'Done') {
            alert("E-Waybill Cancellation Done.")
          }
          else {
            alert(data.status)
          }
          this.ngOnInit();
          this.status = true;
        });

      })

    });

  }



  ewaybill_wo_invoice_create(id, invoice_id, party,bunit) {
    this.status = false;
    forkJoin(
      this.Service.retriveSalesInv(id),
      this.Service.getInvTaxSum(invoice_id),
      this.Service.custStatutoryRetriveList(party),
      this.DropDownListService.getCustomerAddressDetails(party),
      this.Service.getSalesInvTransDtls(invoice_id),
      this.DropDownListService.getCompanyBussinessUnitDetails(localStorage.getItem("company_name"),bunit)
    ).subscribe(([SalesInvoiceData, taxData, partydetails, customeraddress, transporter,companystate]) => {
      //console.log("SalesInvoiceData:"+JSON.stringify(SalesInvoiceData))
      //console.log("taxData:"+JSON.stringify(taxData))
      //console.log("partydetails:"+JSON.stringify(partydetails))
      //console.log("com state:"+companystate["state_name"])
      // console.log("transporter:"+JSON.stringify(transporter))
      this.company_state=companystate["state_name"];
      let address: any;
      if (customeraddress["add1"].legth > 103) {
        address = customeraddress["add1"].substring(101, 200);
      }
      else {
       // address = "Not Required";
        address = null;
      }
      //console.log("address:"+address)
      this.ewaybillWOInvoiceGen.patchValue({
        supplyType: 'O',
        subSupplyType: '1',
        subSupplyDesc: null,
        docType: 'INV',
        docNo: SalesInvoiceData.invoice_no,
        docDate: formatDate(SalesInvoiceData.invoice_date, 'dd/MM/yyyy', 'en'),
       
       /* fromGstin: '34AACCC1596Q002',
        fromTrdName: 'NIC company pvt ltd',
        fromAddr1: '5th block, kuvempu layout',
        fromAddr2: 'kuvempu layout',
        fromPlace: 'GANDHINAGAR',
        fromPincode: '605001',
        actFromStateCode: 34,
        fromStateCode: 34,*/
         fromGstin: '10AATCA7447B1ZV',
        fromTrdName: 'AAYOG AGRO PRIVATE LIMITED',
        fromAddr1: '802 MAHUA ROAD BELKUNDA',
        fromAddr2: 'BHOJPATTI VAISHALI',
        fromPlace: 'HAJIPUR',
        fromPincode: '844125',
        actFromStateCode: 10,
        fromStateCode: 10,
        
        //toGstin: partydetails.gst_no,
        toGstin: 'URP',
        toTrdName: SalesInvoiceData["partyname"],
        toAddr1: customeraddress["add1"].substring(0, 100),
        toAddr2: address,
        toPlace: customeraddress["district"],
        toPincode: customeraddress["pincode"],
        //actToStateCode: partydetails.gst_no.substring(0, 2),
        //toStateCode: partydetails.gst_no.substring(0, 2),
        actToStateCode: customeraddress.state_code.substring(5,7),
        toStateCode: customeraddress.state_code.substring(5,7),
        transactionType: '4',
        dispatchFromGSTIN: null,
        dispatchFromTradeName: null,
        shipToGSTIN: null,
        shipToTradeName: null,
        otherValue: 0,
        totalValue: SalesInvoiceData.item_total,
        cgstValue: taxData[0]["cgst"],
        sgstValue: taxData[0]["sgst"],
        igstValue: taxData[0]["igst"],
        cessValue: 0,
        cessNonAdvolValue: 0,
        totInvValue: SalesInvoiceData["grand_total"],
        transporterId: null,
        //transporterName: transporter[0]["transportername"],
        transporterName: null,
        transDocNo: SalesInvoiceData.invoice_no,
        transMode: '1',
        transDistance: '0',
        transDocDate: formatDate(SalesInvoiceData.invoice_date, 'dd/MM/yyyy', 'en'),
        vehicleNo: transporter[0]["vehicleno"].replaceAll(' ', ''),
        vehicleType: "R"
      });
      //console.log("State BIHAR : "+customeraddress["state"])
      //console.log("State BIHAR Cust : "+customeraddress.state)
      let cgstrate = 0;
      let sgstrate = 0;
      let igstrate = 0;
      /* if (Number(10) == Number(partydetails.gst_no.substring(0, 2))) {
        cgstrate = Number(taxData[0]["tax_rate"]) / 2;
        sgstrate = Number(taxData[0]["tax_rate"]) / 2;
        igstrate = 0;
      } */
      //if(customeraddress.state == "BIHAR")
      if(customeraddress.state == this.company_state)
      {
        //console.log("State BIHAR")
        cgstrate = Number(taxData[0]["tax_rate"]) / 2;
        sgstrate = Number(taxData[0]["tax_rate"]) / 2;
        igstrate = 0;
      }
      else {
        /* if(customeraddress.state == "BIHAR")
        {
          //console.log("State BIHAR")
          cgstrate = Number(taxData[0]["tax_rate"]) / 2;
          sgstrate = Number(taxData[0]["tax_rate"]) / 2;
          igstrate = 0;
        }
        else
        {
          //console.log("State IGST")
          cgstrate = 0;
          sgstrate = 0;
          igstrate = Number(taxData[0]["tax_rate"]);
        } */
        cgstrate = 0;
        sgstrate = 0;
        igstrate = Number(taxData[0]["tax_rate"]);
      }

      //console.log("SalesInvoiceData.invoice_type"+SalesInvoiceData.invoice_type)
    /*  if (SalesInvoiceData.invoice_type == 'INV00003') { //for job work ewaybill not create
        forkJoin(
          this.DropDownListService.getInvoiceJobItemDtls(invoice_id),
          this.DropDownListService.getInvoiceTServiceItem(invoice_id)
        ).subscribe(([jobitem, serviceitem]) => {
          //console.log("Job Item:"+JSON.stringify(jobitem))
          //console.log("SERVICE Item:"+JSON.stringify(serviceitem))
          this.addItemWithOutInvoiceList();
          while (this.ItemList1.length)
            this.ItemList1.removeAt(0);
          this.addItemWithOutInvoiceList();

          this.ItemList1.at(0).patchValue({
            productName: serviceitem[0].item_service_name,
            productDesc: serviceitem[0].item_service_name,
            hsnCode: serviceitem[0].sac_code,
            igstRate: igstrate,
            cgstRate: cgstrate,
            sgstRate: sgstrate,
            cessRate: 0,
            cessNonAdvol: 0,
            taxableAmount: serviceitem[0].tot_amount
          })

          if (jobitem[0].price_based_on == "Packing") {
            this.ItemList1.at(0).patchValue({ quantity: jobitem[0].pack_qty, qtyUnit: jobitem[0].pack_uom })

          }
          else {
            if (jobitem[0].item_uom == "QTLS") {
              this.ItemList1.at(0).patchValue({ quantity: jobitem[0].qtyUnit, Unit: 'QTL' })
            }
            else {
              this.ItemList1.at(0).patchValue({ quantity: jobitem[0].qtyUnit, Unit: jobitem[0].item_uom })
            }
          }

          this.statusdto.patchValue({ status: JSON.stringify(this.ewaybillWOInvoiceGen.getRawValue()) })
          this.Service.createEwaybillWOInvoiceCreate(this.statusdto.getRawValue(), id, localStorage.getItem("username")).subscribe(data => {

            //console.log("Status1:"+data.status)
            let message = data.status.substring(4, data.status.length);
            // console.log("message"+message)
            if (data.status.includes('Yes')) {
              alert(message);
            }
            else {
              alert(data.status)
            }
            this.ngOnInit();
            this.status = true;
          });
        });
      }
      else { */
        console.log("enter else:")
        this.Service.getSalesInvItmDtls(invoice_id).subscribe(itemData => {
          this.addItemWithOutInvoiceList();
          let k = 0;

          while (this.ItemList1.length)
            this.ItemList1.removeAt(0);
          for (let item of itemData) {
            this.addItemWithOutInvoiceList();
            this.ItemList1.at(k).patchValue({
              productName: item.item_name,
              productDesc: item.item_name,
              hsnCode: item.hsn_code,
              taxableAmount: this.round(Number(item.amount + item.discount_amt), 2),
              igstRate: igstrate,
              cgstRate: cgstrate,
              sgstRate: sgstrate,
              cessRate: 0,
              cessNonAdvol: 0,
            })

            if (item.price_based_on == "Packing") {
              this.ItemList1.at(k).patchValue({ quantity: item.squantity, qtyUnit: item.suom })
            }
            else {
              if (item.uom == "QTLS") {
                this.ItemList1.at(k).patchValue({ quantity: item.quantity, qtyUnit: 'QTL' })
              }
              else {
                this.ItemList1.at(k).patchValue({ quantity: item.quantity, qtyUnit: item.uom })
              }
            }
            k++;
          }
          console.log("total json::" + JSON.stringify(this.ewaybillWOInvoiceGen.getRawValue()))
          this.statusdto.patchValue({ status: JSON.stringify(this.ewaybillWOInvoiceGen.getRawValue()) })
          console.log("ID : "+id)
          this.Service.createEwaybillWOInvoiceCreate(this.statusdto.getRawValue(), id, localStorage.getItem("username")).subscribe(data => {
            console.log("Status1:"+data.status)
            let message = data.status.substring(4, data.status.length);
            console.log("message"+message)
            if (data.status.includes('Yes')) {
              alert(message);
            }
            else {
              alert(data.status)
            }
            this.ngOnInit();
            this.status = true;
          });
        });
    //  }

    });
  }


  addItemList() {

    this.ItemList.push(this.fb.group({
      SlNo: '',
      PrdDesc: '',
      IsServc: '',
      HsnCd: '',
      Qty: '',
      Unit: '',
      UnitPrice: '',
      TotAmt: '',
      Discount: '',
      PreTaxVal: '',
      AssAmt: '',
      GstRt: '',
      IgstAmt: '',
      CgstAmt: '',
      SgstAmt: '',
      CesRt: '',
      CesAmt: '',
      CesNonAdvlAmt: '',
      StateCesRt: '',
      StateCesAmt: '',
      StateCesNonAdvlAmt: '',
      OthChrg: '',
      TotItemVal: ''
    }));
  }

  addItemWithOutInvoiceList() {
    this.ItemList1.push(this.fb.group({
      productName: '',
      productDesc: '',
      hsnCode: '',
      quantity: '',
      qtyUnit: '',
      cgstRate: '',
      sgstRate: '',
      igstRate: '',
      cessRate: '',
      cessNonAdvol: '',
      taxableAmount: ''
    }));
  }
  
  updateArnNo(id,invoiceno,asn_no) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { id: id, invoiceno: invoiceno,asn_no:asn_no};
    const dialogRef = this.dialog.open(UpdateArnNoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      //console.log("close:"+JSON.stringify(data))
      if(data==true)
      {
        alert("ASN No Updated Successfully..");
      }
    });
  }

}