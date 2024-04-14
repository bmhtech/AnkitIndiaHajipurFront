import { Component, OnInit, Injectable, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { cust_bussiness_partner } from '../../../../../../Models/CustomerModel/cust_bussiness_partner';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { stringify } from 'querystring';
import { MastermodalComponent } from '../mastermodal/mastermodal.component'
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-supplier-master',
  templateUrl: './CustomersMaster.component.html',
  styleUrls: ['./CustomersMaster.component.scss']
})

export class CustomersMasterComponent implements OnInit {
  submitted = false;
  public userForm: FormGroup;
  public userForm1: FormGroup;
  model: cust_bussiness_partner = new cust_bussiness_partner();
  listcust_bussiness_partner: any = [];
  countriesList: any = [];
  statesList: any = [];
  UnitA: any
  districtsList: any = [];
  citiesList: any = [];
  businesslists: any = [];
  isTypeChecked = false;
  statesListOfBilling: any = [];
  districtsListOfBilling: any = [];
  citiesListOfBilling: {};
  tdsnatures: {};
  Id: any
  company_name: any;
  _pan_no: any;
  basiss: {};
  designationlists: {};
  subGroupNames: {};
  ledgerNames: {};
  ledgerName: {};
  citiNames: {};
  brokerNames: {};
  brokerCodess: {};
  payTermNames: {};
  transCurrencis: {};
  ledgerbankacc: {};
  customerNames: any = [];
  customerNames_List: any = [];
  payTerms: {};
  isChecked1 = false;
  isRegisteredChecked = false;
  registercheck: boolean = false;
  statutoryinsert: boolean = false;
  statutoryupdate: boolean = false;
  scontact_person: any
  sdesignation: any
  sphone: any
  smobile: any
  sfax: any
  semail: any
  Constitution = "0";
  Ssi_App = "0";
  swebsite: any
  scountry: any
  sstate: any
  sdistrict: any
  scity: any
  spincode: any
  sadd1: any
  sadd2: any
  sadd3: any
  isHidden = false;
  status = false;
  suppGroups: {};
  gbrokername: any;
  exportedIndex: any;
  broker_sl_no = 1;
  dlv_to_sl_no = 1;
  seq_no: any;
  basedOnList: any = [];
  isAcctype = false;
  isRegister = false;
  trans_currency1 = "INR";
  activeIsChecked: any;
  // isValid=false;
  group_type1 = "0";
  unita1: any;
  cp_type1: any;
  Country = "INDIA";
  Country1 = "INDIA";
  isValid: boolean = false;
  customermasterupdate: boolean = true;
  customermasterdelete: boolean = true;
  customermastersave: boolean = true;
  customermasterview: boolean = true;
  action: any;
  showtransporterown: boolean = false;
  customermasterposting: boolean = true;
  lockcustomername: boolean = false;
  isAdmin: boolean = false;
  transportstatus: any = [];
  brokerstatus: any = [];
  user_name: any;
  usernamelock: boolean = false;
  user_role: any;
  GstPanCheck: boolean = false;
  errormsggstn: any;
  shipping_sl_no = 1;
  districtsListOfShip: any = [];
  selectedDistrictName:any=[];

  @ViewChild('iCodeInput') _CustCode: ElementRef;

  constructor(public fb: FormBuilder, private Service: Master,
    public dialog: MatDialog, private DropDownListService: DropdownServiceService) {
    this.userForm = fb.group({
      cp_code: [''],
      cp_Id: [""],
      id: [''],
      cp_type: [''],
      cp_name: [''],
      alt_name: [''],
      unita: [''],
      print_to_name: [''],
      cp_active: [''],
      group_type: [''],
      broker_status: ['true'],
      sub_group_type: [''],
      trans_currency: [''],
      block_active: [''],
      reason: [''],
      copy_bp_addr: [''],
      company_id: [''],
      fin_year: [''],
      business_unit: [''],
      username: [''],
      constitution: [''],
      ssi_app: [''],
      ssi_regno: [''],
      saleclosed: [''],

      cust_bussiness_partner_address: this.fb.group({
        website: '',
        country: '',
        postid: '',
        state_code: '',
        city_code: '',
        dist_code: '',
        pincode: '',
        add1: '',
        add2: '',
        add3: ''
      }),

      cust_bussiness_partner_delv_to: this.fb.array([this.fb.group({
        sl_no: this.dlv_to_sl_no,
        contact_person: '',
        designation: '',
        phone: '',
        mobile: '',
        fax: '',
        email: '',
        city: '',
        pincode: '',
        address: '',
        b_unit_name: '',
        transport_own: '',
        transporters: ''
      })]),

      cust_bussiness_partner_docs: this.fb.array([this.fb.group({
        doc_name: ''
      })]),

      cust_bussiness_partner_bill_addr_dtls: this.fb.array([this.fb.group({
        contact_person: '',
        designation: '',
        phone: '',
        mobile: '',
        fax: '',
        email: ''
      })]),

      cust_bussiness_partner_accont: this.fb.group({
        pay_cont_acc: '',
        party_bankacc: '',
        pay_term: '',
        credit_lim: '',
        tcs_applicable: '',
        tcs_rate: '',
        tcs_date: '',
        cash_lim_status: '',
        cash_limit: '',
        mode_of_pay: '',
        accountholder: '',
        acc_no: '',
        iban: '',
        bic_swift_code: '',
        branch: '',
        bankname: '',
        ifsc: '',
        mobile: '',
        acc_type: '',
        acc_remarks: '',
        party_nature: ''
      }),

      cust_bussiness_partner_bill_addr: this.fb.group({
        country: '',
        postid: '',
        pincode: '',
        state_code: '',
        city_code: '',
        dist_code: '',
        add1: '',
        add2: '',
        add3: ''
      }),

      cust_bussiness_partner_statutory: this.fb.group({
        registered: '',
        pan_no: '',
        tan_no: '',
        cin_no: '',
        gst_no: '',
        customer_type: ''
      }),

      cust_bussiness_partner_broker: this.fb.array([this.fb.group({
        sl_no: this.broker_sl_no,
        ven_code_name: '',
        basis: '',
        based_on: '',
        rate: '',
        eff_date: '',
        remarks: '',
        brokerage_acc: '',
        tds_acc: '',
        tds_rate: ''
      })]),

      cust_bussiness_partner_addr_dtls: this.fb.array([this.fb.group({
        contact_person: '',
        designation: '',
        phone: '',
        mobile: '',
        fax: '',
        email: ''
      })]),

      customer_transporterList: this.fb.array([this.fb.group({
        transporterid: '',
        transportercode: '',
        transportername: ''
      })
      ]),
      cust_bussiness_partner_shipping_addr_dtls: this.fb.array([this.fb.group({
        slno: this.shipping_sl_no,
        shipping_name: '',
        country_shipping: 'INDIA',
        state_shipping: '',
        dist_code: '',
        city: '',
        pincode: '',
        address: ''
      })])

    });

    this.userForm1 = fb.group(
      {
        customer_name1: [''],
        cust_group: [''],
        cust_type: [''],
      });
  }

  get customer_name1() { return this.userForm1.get("customer_name1") as FormControl }
  get cust_group() { return this.userForm1.get("cust_group") as FormControl }
  get cust_type() { return this.userForm1.get("cust_type") as FormControl }

  get company_id() { return this.userForm.get("company_id") as FormControl }
  get fin_year() { return this.userForm.get("fin_year") as FormControl }
  get business_unit() { return this.userForm.get("business_unit") as FormControl }
  get cp_Id() { return this.userForm.get("cp_Id") as FormControl }

  get saleclosed() { return this.userForm.get("saleclosed") as FormControl }

  get print_to_name() { return this.userForm.get("print_to_name") as FormControl }
  get unita() { return this.userForm.get("unita") as FormControl }
  get cp_code() { return this.userForm.get("cp_code") as FormControl }
  get id() { return this.userForm.get("id") as FormControl }
  get cp_type() { return this.userForm.get("cp_type") as FormControl }
  get cp_name() { return this.userForm.get("cp_name") as FormControl }
  get alt_name() { return this.userForm.get("alt_name") as FormControl }
  get cp_active() { return this.userForm.get("cp_active") as FormControl }
  get broker_status() { return this.userForm.get("broker_status") as FormControl }
  get group_type() { return this.userForm.get("group_type") as FormControl }
  get trans_currency() { return this.userForm.get("trans_currency") as FormControl }
  get block_active() { return this.userForm.get("block_active") as FormControl }
  get reason() { return this.userForm.get("reason") as FormControl }
  get copy_bp_addr() { return this.userForm.get("copy_bp_addr") as FormControl }
  get sub_group_type() { return this.userForm.get("sub_group_type") as FormControl }
  get constitution() { return this.userForm.get("constitution") as FormControl }
  get ssi_app() { return this.userForm.get("ssi_app") as FormControl }
  get ssi_regno() { return this.userForm.get("ssi_regno") as FormControl }

  get cust_bussiness_partner_address() { return this.userForm.get('cust_bussiness_partner_address') as FormGroup; }
  get cust_bussiness_partner_bill_addr() { return this.userForm.get('cust_bussiness_partner_bill_addr') as FormGroup; }
  get cust_bussiness_partner_addr_dtls() { return this.userForm.get('cust_bussiness_partner_addr_dtls') as FormArray; }
  get cust_bussiness_partner_docs() { return this.userForm.get('cust_bussiness_partner_docs') as FormArray; }
  get cust_bussiness_partner_delv_to() { return this.userForm.get('cust_bussiness_partner_delv_to') as FormArray; }
  get cust_bussiness_partner_accont() { return this.userForm.get('cust_bussiness_partner_accont') as FormControl; }
  get cust_bussiness_partner_statutory() { return this.userForm.get('cust_bussiness_partner_statutory') as FormControl; }
  get cust_bussiness_partner_broker() { return this.userForm.get('cust_bussiness_partner_broker') as FormArray; }
  get cust_bussiness_partner_bill_addr_dtls() { return this.userForm.get('cust_bussiness_partner_bill_addr_dtls') as FormArray; }
  get customer_transporterList() { return this.userForm.get('customer_transporterList') as FormArray; }
  get cust_bussiness_partner_shipping_addr_dtls() { return this.userForm.get('cust_bussiness_partner_shipping_addr_dtls') as FormArray; }

  ngOnInit() {
    this.action = 'save';
    //For User Role
    let user_role = localStorage.getItem("user_role") + "tuhinabcd" + "cusromer_master";
    this.DropDownListService.getRoleItemMaster(user_role).subscribe(data => {
      let accessdata = JSON.stringify(data);

      this.customermastersave = false;
      this.customermasterupdate = false;
      this.customermasterdelete = false;
      this.customermasterview = false;
      this.customermasterposting = false;
      this.lockcustomername = false;

      //this.registercheck = false;
      this.statutoryinsert = true;
      this.statutoryupdate = false;

      if (accessdata.includes('customer_master.save')) {
        this.customermastersave = true;
      }
      if (accessdata.includes('customer_master.update')) {
        this.customermasterupdate = true;
      }
      if (accessdata.includes('customer_master.delete')) {
        this.customermasterdelete = true;
      }
      if (accessdata.includes('customer_master.view')) {
        this.customermasterview = true;
      }
      if (accessdata.includes('customer_master.posting')) {
        this.customermasterposting = true;
      }

    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });

    this.activeIsChecked = true;

    this.cp_type1 = "0";

    this.user_name = localStorage.getItem("username");
    this.user_role = localStorage.getItem("user_role");
    /*  if(this.user_role == 'RL00001')
   {
     this.usernamelock=true;
   }
   else
   {
     this.usernamelock=false;
   }*/
    this.usernamelock = true;// all users update 

    this.group_type1 = "0";
    this.company_name = localStorage.getItem("company_name");
    this.cust_bussiness_partner_address.patchValue({ country: "INDIA" });
    this.cust_bussiness_partner_bill_addr.patchValue({ country: "INDIA" });
    //this.DropDownListService.getCustSequenceId("prefix="+"CST"+"&company="+this.company_name).subscribe(data=>{this.seq_no = data.sequenceid;});
    this.DropDownListService.countryList().subscribe(data => { this.countriesList = data; }, (error) => { this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again...."); this.ngOnInit() });
    this.Service.getCustomerBussinessPartnerFastApi(this.company_name).subscribe(custdata => { this.listcust_bussiness_partner = custdata; }, (error) => { this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again...."); this.ngOnInit() });
    this.cust_bussiness_partner_accont.patchValue({ party_bankacc: "0", pay_term: "0" })
    this.DropDownListService.controlAccList().subscribe(data => { this.subGroupNames = data; }, (error) => { this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again...."); this.ngOnInit() });
    //this.DropDownListService.custometrBusList(this.company_name).subscribe(data=>{this.businesslists = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");this.ngOnInit()});
    this.businesslists = JSON.parse(localStorage.getItem("businessunit"));

    this.DropDownListService.newcustomerList(this.company_name).subscribe(data => { this.customerNames_List = data; }, (error) => { this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again...."); this.ngOnInit() });
    this.DropDownListService.citiNamesList().subscribe(data => { this.citiNames = data; }, (error) => { this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again...."); this.ngOnInit() });
    this.DropDownListService.brokerNamesList().subscribe(data => { this.brokerNames = data; }, (error) => { this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again...."); this.ngOnInit() });
    this.DropDownListService.ledgerList().subscribe(data => { this.ledgerName = data; }, (error) => { this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again...."); this.ngOnInit() });
    this.DropDownListService.payTermList().subscribe(data => { this.payTermNames = data; }, (error) => { this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again...."); this.ngOnInit() });
    this.DropDownListService.supplierNameCodeList().subscribe(data => { this.suppGroups = data; }, (error) => { this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again...."); this.ngOnInit() });
    this.DropDownListService.custNameList().subscribe(data => { this.customerNames = data; }, (error) => { this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again...."); this.ngOnInit() });
    this.DropDownListService.ledgerList().subscribe(data => { this.ledgerbankacc = data; }, (error) => { this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again...."); this.ngOnInit() });
    this.DropDownListService.payTermNameList().subscribe(data => { this.payTerms = data; }, (error) => { this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again...."); this.ngOnInit() });
    this.DropDownListService.designationList().subscribe(data => { this.designationlists = data; }, (error) => { this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again...."); this.ngOnInit() });
    this.transCurrencis = ["INR"];
    this.trans_currency1 = "INR";
    this.tdsnatures = ["COMPANY", "FIRM", "INDIVIDUAL"];
    this.basiss = ["%", "UOM"];
    this.broker_sl_no = 1;
    this.dlv_to_sl_no = 1;
    this.status = true;
    this.DropDownListService.payTermNameList().subscribe(data => { this.payTerms = data; }, (error) => { this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again...."); this.ngOnInit() });

    this.isBrokerDtlsChecked = true;
  }

  con_acc: any;
  groupstat1: any;
  onFocusoutCheckUnique2(event: any) {
    this.DropDownListService.chkCustNameStat(event.target.value).subscribe(data => {
      this.groupstat1 = data.group_name;
      // this.status=true;
      //window.alert( data.group_name);
      if (this.groupstat1 == 'EXIST') {
        //window.alert(event.target.value +"  "+ "already exist please change" );
        //this.customermastersave=false;
        //this.userForm.patchValue({cp_name:"",print_to_name:""});
      }
      else {
        //this.customermastersave=true;
        this.userForm.patchValue({ print_to_name: event.target.value });
      }

    });
    this.groupstat1 = '';


  }

  nameExist: any;
  onFocusoutCheckUnique(event) {
    this.nameExist = "";
    let cname = event.target.value.toUpperCase();
    for (let name of this.listcust_bussiness_partner) {
      if (cname == (name["cp_name"])) {
        this.nameExist = " Name Already Exist!!! Please Change";
        break;
      }
      else {
        this.nameExist = "";
        this.cust_bussiness_partner_shipping_addr_dtls.at(0).patchValue({shipping_name:cname });
      }
    }
  }

  selectCusttype(value: any) {
    this.DropDownListService.getCustSequenceId("prefix=" + "CST" + "&company=" + this.company_name + "&wtype=" + value).subscribe(data => { this.seq_no = data.sequenceid; });
  }

  onChangeAcctype(s: string) {
    if (s == 'OTHERS') {
      this.isAcctype = true;
    }
    else {
      this.isAcctype = false;
    }
  }

  selectssiapp(s: string) {
    if (s == 'YES') {
      this.isRegister = true;
    }
    else {
      this.isRegister = false;
    }

  }


  /* search(event)
   {
     let serchText = event.target.value;
     serchText=this.Service.replaceAllSpl(serchText,"&","ampersand");
     serchText=this.Service.replaceAllSpl(serchText,"/","backslash");
     
     if(event.key == "Enter")
     {
       this.status = false;
       if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
       {
         this.DropDownListService.findCustomers('0').subscribe(data=>
         {
           this.listcust_bussiness_partner = data;
           this.status = true;
         });
       }
       else
       {
         this.DropDownListService.findCustomers(serchText).subscribe(data=>
         {
           this.listcust_bussiness_partner = data;
           this.status = true;
         });     
       }
     }
   }*/

  err_message = "";
  isTcsAppIsYes = "No";
  onChangeTcsApplicable(tcs_appl: string) {
    if (tcs_appl == 'YES') {
      this.isTcsAppIsYes = "Yes";
      this.err_message = "You have selected TCS applicable('Yes') so, here PAN No. is must..";
      this.cust_bussiness_partner_statutory.patchValue({ registered: true });
      this.isRegisteredChecked = true;
    }
    else {
      this.err_message = "";
      this.cust_bussiness_partner_statutory.patchValue({ registered: false });
      this.isRegisteredChecked = false;
      this.isTcsAppIsYes = "No";
    }
  }

  _basis: any;
  onChangeBasis(event, index) {
    this._basis = event;
    if (event == 'UOM')
      this.basedOnList[index] = [{ display: "Gross Amt", value: "Gross Amt." }, { display: "Net Amt", value: "Net Amt" }];
    if (event == '%')
      this.basedOnList[index] = [{ display: "Item UOM", value: "Item UOM" }, { display: "Packing UOM", value: "Packing UOM" }];
  }

  isCashLimitIsHidden = true;
  onChangePaymentMode(payment_mode: string) {
    if (payment_mode == "CASH") { this.isCashLimitIsHidden = false; }
    else {
      this.isCashLimitIsHidden = true;
      this.cust_bussiness_partner_accont.patchValue({ cash_lim_status: false, cash_limit: 0 })
    }
  }

  showList(s: string) {
    if (this.customermastersave == true && this.customermasterupdate == true)//true exist  false not exist 
    {
      if (s == "add") {
        // this.ngOnInit();  

        //this.UnitA=this.businesslists[0].businessunit_id;
        // this.unita1= [this.UnitA];

        if (localStorage.getItem("username") == 'JITESH' || localStorage.getItem("username") == 'ANUJ' || localStorage.getItem("username") == 'RADHIKA' || localStorage.getItem("username") == 'KHUSBOO' || localStorage.getItem("username") == 'superaayog') {
          this.isAdmin = true;
        }
        else {
          this.isAdmin = false;
        }




        this.isTypeChecked = true;
        this.isHidden = true;
        this.cust_bussiness_partner_address.patchValue({ country: "INDIA" });
        this.group_type1 = "0";
        this.cust_bussiness_partner_broker.at(0).patchValue({ sl_no: this.broker_sl_no });
        this.cust_bussiness_partner_delv_to.at(0).patchValue({ sl_no: this.dlv_to_sl_no });
        this.trans_currency1 = "INR";
        this.Ssi_App = "0";
        this.Constitution = "0";
        this.onChangeBrokerDtlsStatus(false);
        this.cust_bussiness_partner_bill_addr.patchValue({ country: "INDIA" });
        this.cust_bussiness_partner_delv_to.at(0).patchValue({ transport_own: "NO" });
        this.DropDownListService.stateListByCountry(this.Country).subscribe(data => {
          this.statesList = data;
          this.status = true;
        });

        this.DropDownListService.stateListByCountry(this.Country1).subscribe(data => {
          this.statesListOfBilling = data;
          this.status = true;
        });
        this.status = true;
      }
    }
    if (this.customermastersave == true && this.customermasterupdate == false) {
      if (s == "add") {


        //  this.UnitA=this.businesslists[0].businessunit_id;
        // this.unita1= [this.UnitA];
        if (localStorage.getItem("username") == 'JITESH' || localStorage.getItem("username") == 'ANUJ' || localStorage.getItem("username") == 'RADHIKA' || localStorage.getItem("username") == 'KHUSBOO' || localStorage.getItem("username") == 'superaayog') {
          this.isAdmin = true;
        }
        else {
          this.isAdmin = false;
        }

        this.isTypeChecked = true;
        this.isHidden = true;
        this.cust_bussiness_partner_address.patchValue({ country: "INDIA" });
        this.group_type1 = "0";
        this.cust_bussiness_partner_broker.at(0).patchValue({ sl_no: this.broker_sl_no });
        this.cust_bussiness_partner_delv_to.at(0).patchValue({ sl_no: this.dlv_to_sl_no });
        this.trans_currency1 = "INR";
        this.Ssi_App = "0";
        this.Constitution = "0";
        this.onChangeBrokerDtlsStatus(false);
        this.cust_bussiness_partner_bill_addr.patchValue({ country: "INDIA" });
        this.cust_bussiness_partner_delv_to.at(0).patchValue({ transport_own: "NO" });
        this.DropDownListService.stateListByCountry(this.Country).subscribe(data => {
          this.statesList = data;
          this.status = true;
        });

        this.DropDownListService.stateListByCountry(this.Country1).subscribe(data => {
          this.statesListOfBilling = data;
          this.status = true;
        });
        this.status = true;
      }
    }

    if (s == "list") {
      if (localStorage.getItem("username") == 'JITESH' || localStorage.getItem("username") == 'ANUJ' || localStorage.getItem("username") == 'RADHIKA' || localStorage.getItem("username") == 'KHUSBOO' || localStorage.getItem("username") == 'superaayog') {
        this.isAdmin = true;
      }
      else {
        this.isAdmin = false;
      }
      this.isHidden = false;
      this.lockcustomername = false;
      this.userForm.reset();
      this.cust_bussiness_partner_address.patchValue({ country: "INDIA" });
      this.group_type1 = "0";
      this.cust_bussiness_partner_bill_addr.patchValue({ country: "INDIA" });
      this.trans_currency1 = "INR";
      this.broker_sl_no = 1;
      this.cust_bussiness_partner_broker.at(0).patchValue({ sl_no: this.broker_sl_no });
      this.cust_bussiness_partner_delv_to.at(0).patchValue({ sl_no: this.dlv_to_sl_no });
      this.onChangeBrokerDtlsStatus(false);
      this.dlv_to_sl_no = 1;
      this.Ssi_App = "0";
      this.Constitution = "0";
      this.activeIsChecked = true;
      this.ngOnInit();

      // this.userForm.reset(this.ResetAllValues().value);
    }
  }

  ResetAllValues() {
    return this.userForm = this.fb.group({
      cp_code: [''],
      cp_Id: [""],
      id: [''],
      print_to_name: [''],
      unita: [''],
      cp_type: [''],
      cp_name: [''],
      alt_name: [''],
      cp_active: [''],
      group_type: [''],
      broker_status: ['true'],
      sub_group_type: [''],
      trans_currency: [''],
      block_active: [''],
      reason: [''],
      copy_bp_addr: [''],
      company_id: [''],
      fin_year: [''],
      business_unit: [''],
      constitution: [''],
      ssi_app: [''],
      ssi_regno: [''],
      username: [''],

      cust_bussiness_partner_address: this.fb.group({
        website: '',
        country: '',
        state: '',
        district: '',
        postid: '',
        city: '',
        pincode: '',
        add1: '',
        add2: '',
        add3: ''
      }),

      cust_bussiness_partner_delv_to: this.fb.array([this.fb.group({
        sl_no: this.dlv_to_sl_no,
        contact_person: '',
        designation: '',
        phone: '',
        mobile: '',
        fax: '',
        email: '',
        city: '',
        pincode: '',
        address: '',
        b_unit_name: '',
        transport_own: '',
        transporters: ''
      })]),

      cust_bussiness_partner_docs: this.fb.array([this.fb.group({
        doc_name: ''
      })]),

      cust_bussiness_partner_bill_addr_dtls: this.fb.array([this.fb.group({
        contact_person: '',
        designation: '',
        phone: '',
        mobile: '',
        fax: '',
        email: ''
      })]),

      cust_bussiness_partner_accont: this.fb.group({
        pay_cont_acc: '',
        party_bankacc: '',
        pay_term: '',
        credit_lim: '',
        tcs_applicable: '',
        tcs_rate: '',
        tcs_date: '',
        cash_lim_status: '',
        cash_limit: '',
        mode_of_pay: '',
        accountholder: '',
        acc_no: '',
        iban: '',
        bic_swift_code: '',
        branch: '',
        bankname: '',
        ifsc: '',
        mobile: '',
        acc_type: '',
        acc_remarks: '',
        party_nature: ''
      }),

      cust_bussiness_partner_bill_addr: this.fb.group({
        country: '',
        state: '',
        district: '',
        city: '',
        postid: '',
        pincode: '',
        add1: '',
        add2: '',
        add3: ''
      }),

      cust_bussiness_partner_statutory: this.fb.group({
        registered: '',
        pan_no: '',
        tan_no: '',
        cin_no: '',
        gst_no: '',
        customer_type: ''
      }),

      cust_bussiness_partner_broker: this.fb.array([this.fb.group({
        sl_no: this.broker_sl_no,
        ven_code_name: '',
        basis: '',
        based_on: '',
        rate: '',
        eff_date: '',
        remarks: '',
        brokerage_acc: '',
        tds_acc: '',
        tds_rate: ''
      })]),

      cust_bussiness_partner_addr_dtls: this.fb.array([this.fb.group({
        contact_person: '',
        designation: '',
        phone: '',
        mobile: '',
        fax: '',
        email: ''
      })]),

      customer_transporterList: this.fb.array([this.fb.group({
        transporterid: '',
        transportercode: '',
        transportername: ''
      })
      ]),
      cust_bussiness_partner_shipping_addr_dtls: this.fb.array([this.fb.group({
        slno: this.shipping_sl_no,
        shipping_name: '',
        country_shipping: '',
        state_shipping: '',
        dist_code: '',
        city: '',
        pincode: '',
        address: ''
      })]) 

    });
  }


  isBrokerDtlsChecked = false;
  onChangeBrokerDtlsStatus(event) {
    if (event.checked == true)
      this.isBrokerDtlsChecked = true;
    else
      this.isBrokerDtlsChecked = false;
  }

  onChangeRegisteredStatus(event) {
    if (event.checked == true)
      this.isRegisteredChecked = true;
    else
      this.isRegisteredChecked = false;
  }
  PostOffice: any;
  onChangeCopyBpAddrStatus(event) {
    if (event.checked) {
      this.scountry = this.cust_bussiness_partner_address.get('country').value as FormControl;
      this.sstate = this.cust_bussiness_partner_address.get('state_code').value as FormControl;
      this.sdistrict = this.cust_bussiness_partner_address.get('dist_code').value as FormControl;
      this.scity = this.cust_bussiness_partner_address.get('city_code').value as FormControl;
      this.spincode = this.cust_bussiness_partner_address.get('pincode').value as FormControl;
      this.sadd1 = this.cust_bussiness_partner_address.get('add1').value as FormControl;
      this.sadd2 = this.cust_bussiness_partner_address.get('add2').value as FormControl;
      this.sadd3 = this.cust_bussiness_partner_address.get('add3').value as FormControl;
      this.PostOffice = this.cust_bussiness_partner_address.get('postid').value as FormControl;

      /*  if(this.scountry!="")
        {
          this.DropDownListService.stateListByCountry(this.scountry).subscribe(data=>
            {
              this.statesListOfBilling = data;
              this.status = true;
            });
        }
           
        if(this.sstate!="")
          {
          this.DropDownListService.getDistrictThruState(this.sstate).subscribe(data=>
              {
                this.districtsListOfBilling = data;
                this.status = true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
              this.ngOnInit()});
          }

          if(this.spincode!="")
          {
            this.DropDownListService.findPostOffice(this.spincode,this.sdistrict).subscribe(data=>
              {
                this.PostOfficeListBill = data;
                this.status = true;
              });
          }
          
          // if(this.sdistrict!="")
          // {  
          //   this.DropDownListService.getPostOfficeThruDist(this.sdistrict).subscribe(data=>
          //     {
          //       this.PostOfficeListBill  = data;
          //       this.status = true;
          //     }); 
          // }

          if(this.sdistrict!="")
          {  
            this.DropDownListService.getCityListThruDistrict(this.sdistrict).subscribe(data=>
                  {
                    this.citiesListOfBilling = data;
                    this.status = true;
                  }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
                  this.ngOnInit()});
          }
*/
      this.citiesListOfBilling = this.citiesList;
      this.districtsListOfBilling = this.districtsList;
      this.statesListOfBilling = this.statesList;


      this.selectedCityBill = this.scity;
      this.selectedDistBill = this.sdistrict;
      this.selectedPostOfficeBill = this.PostOffice;
      this.cust_bussiness_partner_bill_addr.patchValue({
        country: this.scountry,
        state_code: this.sstate, dist_code: this.sdistrict, pincode: this.spincode,
        city_code: this.scity, add1: this.sadd1, add2: this.sadd2, add3: this.sadd3, postid: this.PostOffice
      });

      for (let i = 0; i < this.cust_bussiness_partner_addr_dtls.length; i++) {
        if (i != 0) { this.add4() }
        this.scontact_person = this.cust_bussiness_partner_addr_dtls.at(i).get('contact_person').value as FormControl;
        this.sdesignation = this.cust_bussiness_partner_addr_dtls.at(i).get('designation').value as FormControl;
        this.sphone = this.cust_bussiness_partner_addr_dtls.at(i).get('phone').value as FormControl;
        this.smobile = this.cust_bussiness_partner_addr_dtls.at(i).get('mobile').value as FormControl;
        this.sfax = this.cust_bussiness_partner_addr_dtls.at(i).get('fax').value as FormControl;
        this.semail = this.cust_bussiness_partner_addr_dtls.at(i).get('email').value as FormControl;
        this.cust_bussiness_partner_bill_addr_dtls.at(i).patchValue({
          contact_person: this.scontact_person,
          designation: this.sdesignation, phone: this.sphone, mobile: this.smobile, fax: this.sfax, email: this.semail
        });
      }
    }
    else {
      this.scountry = "", this.sstate = "", this.sdistrict = "", this.scity = "", this.spincode = "", this.sadd1 = "",
        this.sadd2 = "", this.sadd3 = "", this.scontact_person = "", this.sdesignation = "", this.sphone = "",
        this.smobile = "", this.smobile = "", this.semail = "", this.sfax = "", this.PostOffice = "";


      this.cust_bussiness_partner_bill_addr.patchValue({
        country: "INDIA",
        state_code: "0", dist_code: "0", pincode: this.spincode,
        city_code: "0", add1: null, add2: null, add3: null, postid: "0"
      });
      while (this.cust_bussiness_partner_bill_addr_dtls.length) { this.cust_bussiness_partner_bill_addr_dtls.removeAt(0); }
      this.add4();
    }
  }

  add1() {
    this.dlv_to_sl_no = this.dlv_to_sl_no + 1;
    this.cust_bussiness_partner_delv_to.push(this.fb.group({
      sl_no: this.dlv_to_sl_no,
      contact_person: '',
      designation: '',
      phone: '',
      mobile: '',
      fax: '',
      email: '',
      city: '',
      pincode: '',
      address: '',
      b_unit_name: '',
      transport_own: '',
      transporters: ''
    }));
  }
  addtransporterlistown() {
    this.customer_transporterList.push(this.fb.group({
      transporterid: '',
      transportercode: '',
      transportername: ''

    }));
  }

  delete1(index) {
    if (this.dlv_to_sl_no > 1) {
      this.cust_bussiness_partner_delv_to.removeAt(index);
      this.dlv_to_sl_no = this.dlv_to_sl_no - 1;
    }
    else {
      this.dlv_to_sl_no = 1;
      alert("can't delete all rows");
      this.cust_bussiness_partner_delv_to.reset();
      this.cust_bussiness_partner_delv_to.at(0).patchValue({ sl_no: this.dlv_to_sl_no });
    }

    for (let i = 1; i <= this.dlv_to_sl_no; i++)
      this.cust_bussiness_partner_delv_to.at(i - 1).patchValue({ sl_no: i });
  }

  addBroker() {
    this.broker_sl_no = this.broker_sl_no + 1;
    this.cust_bussiness_partner_broker.push(this.fb.group({
      sl_no: this.broker_sl_no,
      ven_code_name: '',
      basis: '',
      based_on: '',
      rate: '',
      eff_date: '',
      remarks: '',
      tds_acc: '',
      brokerage_acc: '',
      tds_rate: ''
    }));
  }

  deleteBroker(index) {
    if (this.broker_sl_no > 1) {
      this.cust_bussiness_partner_broker.removeAt(index);
      this.broker_sl_no = this.broker_sl_no - 1;
    }
    else {
      this.broker_sl_no = 1;
      alert("can't delete all rows");
      this.cust_bussiness_partner_broker.reset();
      this.cust_bussiness_partner_broker.at(0).patchValue({ sl_no: this.broker_sl_no });
    }

    for (let i = 1; i <= this.broker_sl_no; i++)
      this.cust_bussiness_partner_broker.at(i - 1).patchValue({ sl_no: i });
  }

  add3() {
    this.cust_bussiness_partner_addr_dtls.push(this.fb.group({
      contact_person: '',
      designation: '',
      phone: '',
      mobile: '',
      fax: '',
      email: ''
    }));
  }

  delete3(index) {
    if (index) { this.cust_bussiness_partner_addr_dtls.removeAt(index); }
    else { alert("can't delete all rows"); }
  }

  add4() {
    this.cust_bussiness_partner_bill_addr_dtls.push(this.fb.group({
      contact_person: '',
      designation: '',
      phone: '',
      mobile: '',
      fax: '',
      email: ''
    }));
  }

  delete4(index) {
    if (index) { this.cust_bussiness_partner_bill_addr_dtls.removeAt(index); }
    else { alert("can't delete all rows"); }
  }

  addDocument() {
    this.cust_bussiness_partner_docs.push(this.fb.group({
      doc_name: ''
    }));
  }

  deleteDocument(index) {
    if (index) { this.cust_bussiness_partner_docs.removeAt(index); }
    else { alert("can't delete all rows"); }
  }

  onChangeCountry(country_name) {
    // this.selectedPostOffice = [];
    this.statesList = [], this.districtsList = [], this.citiesList = [];
    this.cust_bussiness_partner_address.patchValue({ state_code: null, dist_code: null, city_code: null });
    if (country_name.length) {
      this.status = false;
      //this.cust_bussiness_partner_shipping_addr_dtls.at(0).patchValue({country_shipping:country_name });
      this.DropDownListService.stateListByCountry(country_name).subscribe(data => {
        this.statesList = data;
        this.status = true;
      });
    }
  }

 selectedDistrict(distId,index){
   // console.log("distId:"+distId)
    if (distId.length && distId != "0") {
      this.selectedDistrictName[index]=distId;
      this.cust_bussiness_partner_shipping_addr_dtls.at(index).patchValue({ dist_code: distId });
    }
  }
  selectedCity: any = [];
  selectedDist: any = [];
  stateName:any="";
  onChangeState(state_name) {
    this.districtsList = [], this.citiesList = [];
    this.selectedDist = [];
    this.selectedCity = [];
    //  this.selectedPostOffice = [];
    this.cust_bussiness_partner_address.patchValue({ dist_code: null, city_code: null });
    if (state_name.length) {
      this.status = false;

      /* for(let state of this.statesList)
      {
        if(state_name==state["state_code"])
        {
          this.stateName=state["state_name"];
          break;
        }
      } */

      this.statesList.forEach(element => {
        if (element.state_code == state_name) {
          this.stateName = element.state_name;
        }
      });
      //console.log("State Name: "+this.stateName);
      this.cust_bussiness_partner_shipping_addr_dtls.at(0).patchValue({state_shipping:this.stateName });

      this.DropDownListService.getDistrictThruState(state_name).subscribe(data => {
        this.districtsList = data;
        this.districtsListOfShip = data;
        this.status = true;
      });
    }
  }

  PostOfficeList: any = [];
  onChangeDistrict(district_name: String) {
   // this.citiesList = [];
    //this.selectedCity = [];
    // this.selectedPostOffice = [];
   // this.cust_bussiness_partner_address.patchValue({ city_code: null });
    if (district_name.length) {
     // this.status = false;
      //console.log("district_name:"+district_name)
      this.selectedDistrictName[0] =district_name;
      this.cust_bussiness_partner_shipping_addr_dtls.at(0).patchValue({dist_code:district_name });
      // this.DropDownListService.getCityListThruDistrict(district_name).subscribe(data => {
      //   this.citiesList = data;
      //   this.status = true;
      // });
      
      // this.DropDownListService.getPostOfficeThruDist(district_name).subscribe(data=>
      //   {
      //     this.PostOfficeList  = data;
      //     this.status = true;
      //   }); 
    }
  }

  getCity(city) {
    if (city.target.value.length) {
      //console.log("city:"+city.target.value)
      this.cust_bussiness_partner_shipping_addr_dtls.at(0).patchValue({city:city.target.value });
    }
  }
  getPincode(pincode) {
    if (pincode.target.value.length) {
      //console.log("pincode:"+pincode.target.value)
      this.cust_bussiness_partner_shipping_addr_dtls.at(0).patchValue({pincode:pincode.target.value});
    }
  }
  getAddress(address) {
   
    if (address.target.value.length) {
      //console.log("address:"+address.target.value)
      this.cust_bussiness_partner_shipping_addr_dtls.at(0).patchValue({address:address.target.value});
    }
  }
  
  handlePincode(event: any) {
    if (event.target.value.length > 6) {
      //alert("Please Enter 6 digit Pincode !!!");
      let x = event.target.value.substring(0, 6);
      this.cust_bussiness_partner_address.patchValue({ pincode: x });
    }
  }

  handlePincodeBill(event: any) {
    if (event.target.value.length > 6) {
      //alert("Please Enter 6 digit Pincode !!!");
      let x = event.target.value.substring(0, 6);
      this.cust_bussiness_partner_bill_addr.patchValue({ pincode: x });
    }
  }

  onChangePinCode(event) {
    this.status = false;
    this.sdistrict = this.cust_bussiness_partner_address.get('dist_code').value as FormControl;
    if (event.target.value != '' && event.target.value != "0") {
      this.DropDownListService.findPostOffice(event.target.value, this.sdistrict).subscribe(data => {
        this.PostOfficeList = data;
        this.status = true;
      });
    } else {
      this.status = true;
      this.cust_bussiness_partner_address.patchValue({ postid: "0" })
    };
  }

  onChangePinCodeBill(event) {
    this.status = false;
    this.sdistrict = this.cust_bussiness_partner_bill_addr.get('dist_code').value as FormControl;
    if (event.target.value != '' && event.target.value != "0") {
      this.DropDownListService.findPostOffice(event.target.value, this.sdistrict).subscribe(data => {
        this.PostOfficeListBill = data;
        this.status = true;
      });
    } else {
      this.status = true;
      this.cust_bussiness_partner_bill_addr.patchValue({ postid: "0" })
    };
  }
  selectedPostOffice: any = [];
  // onChangePostOffice(event)
  // {
  //   // this.citiesList = [];
  //   //this.selectedDist = [];
  //   // this.selectedCity = [];
  //   //this.selectedPostOffice = [];

  //  if(event.length)
  //  {
  //     this.status = false;
  //   this.DropDownListService.getPincodeThruPO(event).subscribe(data=>
  //     {
  //      this.cust_bussiness_partner_address.patchValue({pincode:data.pincode});
  //       this.status = true;
  //     });
  //  }   
  // }

  selectedPostOfficeBill: any = [];
  // onChangePostOfficeBill(event)
  // {
  //   if(event.length)
  //   {
  //      this.status = false;
  //    this.DropDownListService.getPincodeThruPO(event).subscribe(data=>
  //      {
  //       this.cust_bussiness_partner_bill_addr.patchValue({pincode:data.pincode});
  //        this.status = true;
  //      });
  //   }   
  // }

  onChangeCountryBill(country_name: String) {
    this.statesListOfBilling = [], this.districtsListOfBilling = [], this.citiesListOfBilling = []; this.PostOfficeListBill = [];
    this.cust_bussiness_partner_bill_addr.patchValue({ state_code: null, dist_code: null, city_code: null });
    if (country_name.length) {
      this.status = false;
      this.DropDownListService.stateListByCountry(country_name).subscribe(data => {
        this.statesListOfBilling = data;
        this.status = true;
      });
    }
  }

  selectedCityBill: any = [];
  selectedDistBill: any = [];
  onChangeStateBill(state_name: String) {
    this.districtsListOfBilling = [], this.citiesListOfBilling = [];
    this.selectedCityBill = [];
    this.selectedDistBill = [];
    this.cust_bussiness_partner_bill_addr.patchValue({ dist_code: null, city_code: null });
    if (state_name.length) {
      this.status = false;
      this.DropDownListService.getDistrictThruState(state_name).subscribe(data => {
        this.districtsListOfBilling = data;
        this.status = true;
      }, (error) => {
        this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
        this.ngOnInit()
      });
    }
  }

  PostOfficeListBill: any = []
  onChangeDistrictBill(district_name) {
    this.selectedCityBill = [];
    this.citiesListOfBilling = [];
    this.cust_bussiness_partner_bill_addr.patchValue({ city_code: null });
    if (district_name.length) {
      this.status = false;
      this.DropDownListService.getCityListThruDistrict(district_name).subscribe(data => {
        this.citiesListOfBilling = data;
        this.status = true;
      }, (error) => {
        this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
        this.ngOnInit()
      });

      // this.DropDownListService.getPostOfficeThruDist(district_name).subscribe(data=>
      //   {
      //     this.PostOfficeListBill  = data;
      //     this.status = true;
      //   }); 
    }
  }

  onchangeLedger(ledger_name: String) {
    if (ledger_name) {
      this.status = false;
      this.DropDownListService.ledgerListBySubGroup(ledger_name).subscribe(data => {
        this.ledgerNames = data;
        this.status = true;
      }, (error) => {
        this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
        this.ngOnInit()
      });
    }
  }

  onDelete(id: any, custid) {
    this.status = false;
    if (confirm("Are you sure to delete this Customer ?")) {
      this.userForm.patchValue({ username: localStorage.getItem("username") });
      //alert(custid)
      this.DropDownListService.checkCustomerMasterUsage(custid).subscribe(checkCustomer => {
        ///let dataq=JSON.parse(checkItem);
        // alert("bidhan here::"+checkCustomer.status);
        if (checkCustomer.status == 'No') {
          this.Service.deleteCustomerMaster(this.userForm.getRawValue(), id).subscribe(data => {
            console.log("Customer :" + data.cp_code);
            if (data.cp_code == '' || data.cp_code == null) {
              alert("Opps!!! Can't delete this Customer !!!");
            } else {
              alert("Customer Deleted successfully.");
            }
            this.status = true;
            this.ngOnInit()
          });
        }
        else {
          alert("This Customer is Already Used,Can not be Deleted!! ");
        }
      });
    }
    this.status = true;
  }

  onChangeGroup(group_type: String) {
    if (group_type != "0") {
      this.status = false;
      this.DropDownListService.nameListByCustomerCode(group_type).subscribe(data => {
        this.userForm.patchValue({ sub_group_type: data["grp_name"] });
        this.cust_bussiness_partner_accont.patchValue({ pay_cont_acc: data["grp_name"] });


        this.status = true;
      }, (error) => {
        this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
        this.ngOnInit()
      });
    }
  }

  trans: any;

  Transcode: any;
  showPopUp(index) {
    this.trans = this.cust_bussiness_partner_delv_to.at(index).get('transport_own').value as FormControl;
    if (this.trans == "YES") {
      this.showtransporterown = true;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = { index: index };
      const dialogRef = this.dialog.open(MastermodalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => {



        if (data == "" || data == null || data.bp_code == "") {
          alert("Please Check Transporter Name from Transporter List !!!!!!!!");
          this.cust_bussiness_partner_delv_to.at(0).patchValue({ transport_own: "NO" })

        }
        else {
          this.Transcode = data["bp_code"];

          this.cust_bussiness_partner_delv_to.at(index).patchValue({ transporters: data["bp_code"] });
          //  customer_transporterList



          this.DropDownListService.transporterownlist(this.cust_bussiness_partner_delv_to.at(0).get("transporters").value)
            .subscribe(data123 => {
              let k = 0;
              console.log(JSON.stringify(data123))
              this.addtransporterlistown()
              while (this.customer_transporterList.length)
                this.customer_transporterList.removeAt(0);
              for (let data12 of data123) {

                this.addtransporterlistown();
                this.customer_transporterList.at(k).patchValue({ transporterid: data12["bp_Id"], transportercode: data12["bp_code"], transportername: data12["bp_name"] })
                k = k + 1;

              }
            });









        }

      }



      );




    }
    //  this.cust_bussiness_partner_delv_to.at(index).patchValue({transporters: "NA"});     
    else {
      this.showtransporterown = false;
      this.cust_bussiness_partner_delv_to.at(index).patchValue({ transporters: "" });
    }

  }




  removeowntransporterlist(index) {
    this.customer_transporterList.removeAt(index);
    console.log("finaltrans :: " + this.customer_transporterList.length);
    if (this.customer_transporterList.length > 0) {
      let finaltrans: string;

      for (let i = 0; i < this.customer_transporterList.length; i++) {
        finaltrans += this.customer_transporterList.at(i).get("transporterid").value + ","
      }

      //let output:string=finaltrans.substring(finaltrans.length-1, finaltrans.length);
      let output: string = finaltrans.substring(9, finaltrans.length);
      console.log("finaltrans :: " + output);
      console.log("finaltrans2 :: " + output.slice(0, -1));
      this.cust_bussiness_partner_delv_to.at(0).patchValue({ transporters: output.slice(0, -1) })

    }
    else {
      alert("You Have deleted All transported and the Transporter Own Is set To Nothing!!!");
      this.cust_bussiness_partner_delv_to.at(0).patchValue({ transport_own: "0", transporters: "" })
      this.showtransporterown = false;

    }


  }





  Mobile_No: any;
  PinCode: any;
  BillpinCode: any;
  DelvPincode: any;
  send() {
    let UnitAb = this.userForm.get("unita").value;


    console.log("UnitAb :: " + this.userForm.get("unita").value)
    this.transportstatus = [];
    this.brokerstatus = [];

    for (let i = 0; i < this.cust_bussiness_partner_delv_to.length; i++) {
      this.Mobile_No = this.cust_bussiness_partner_delv_to.at(i).get("mobile").value;
      this.DelvPincode = this.cust_bussiness_partner_delv_to.at(i).get("pincode").value;
    }

    this.PinCode = this.cust_bussiness_partner_address.get("pincode").value;
    this.BillpinCode = this.cust_bussiness_partner_bill_addr.get("pincode").value;


    this.Id = this.userForm.get("id").value as FormControl;
    this.userForm.patchValue({
      company_id: localStorage.getItem("company_name"),
      fin_year: localStorage.getItem("financial_year"),
      username: localStorage.getItem("username")
    });
    this.submitted = true;
    this._pan_no = this.cust_bussiness_partner_statutory.get("pan_no").value as FormControl;
    console.log("Check : :" + JSON.stringify(this.userForm.getRawValue()));
    console.log("HALLU : : " + this.userForm.valid);
    console.log("User :: " + localStorage.getItem("username"));
    if (!this.userForm.valid) {
      alert('Please fill all fields!')
      return false;
    }
    else {
      if (this.isTcsAppIsYes == 'Yes' && this._pan_no != '' || this.isTcsAppIsYes == 'No') {
        let UnitA = this.userForm.get("unita").value;
        if (this.userForm.get("cp_type").value == null || this.userForm.get("cp_type").value == 0) {
          alert("Please Select Type!!!!  ");
          this.status = true;
        }
        else if (this.userForm.get("cp_name").value == null || this.userForm.get("cp_name").value == "") {
          alert("Please Enter Name");
          this.status = true;

        }
        else if (this.userForm.get("group_type").value == null || this.userForm.get("group_type").value == 0) {

          alert(" Please Select Group !!!!! ");
          this.status = true;
        }
        else if (UnitAb == null || UnitAb == "") {
          alert("Please Select Bussiness Unit !!")
          this.status = true;
        }

        else if (this.userForm.get("constitution").value == null || this.userForm.get("constitution").value == "" || this.userForm.get("constitution").value == 0) {
          alert(" Please Select Constitution ");
          this.status = true;
        }
        else if (this.cust_bussiness_partner_address.get('country').value == null || this.cust_bussiness_partner_address.get('country').value == "" || this.cust_bussiness_partner_address.get('country').value == 0) {
          alert(" Please Select Country Name In Address Tab!!!");
          this.status = true;
        }
        else if (this.cust_bussiness_partner_address.get('state_code').value == null || this.cust_bussiness_partner_address.get('state_code').value == "" || this.cust_bussiness_partner_address.get('state_code').value == 0) {
          alert(" Please Select State Name In Address Tab!!!");
          this.status = true;
        }
        else if (this.cust_bussiness_partner_address.get('dist_code').value == null || this.cust_bussiness_partner_address.get('dist_code').value == "" || this.cust_bussiness_partner_address.get('dist_code').value == 0) {
          alert("  Please Select District In Address Tab!!!");
          this.status = true;
        }
        else if (this.cust_bussiness_partner_address.get('city_code').value == null || this.cust_bussiness_partner_address.get('city_code').value == "" || this.cust_bussiness_partner_address.get('city_code').value == 0) {
          alert(" Please Enter City In Address Tab!!!");
          this.status = true;
        }
        else if (this.cust_bussiness_partner_address.get('pincode').value == null || this.cust_bussiness_partner_address.get('pincode').value == "" || this.cust_bussiness_partner_address.get('pincode').value == 0) {
          alert(" Please Enter Pin Code In Address Tab!!!");
          this.status = true;
        }
        else if (this.cust_bussiness_partner_addr_dtls.at(0).get('mobile').value == null || this.cust_bussiness_partner_addr_dtls.at(0).get('mobile').value == "" || this.cust_bussiness_partner_addr_dtls.at(0).get('mobile').value == 0 ||
          this.cust_bussiness_partner_addr_dtls.at(0).get("contact_person").value == null || this.cust_bussiness_partner_addr_dtls.at(0).get("contact_person").value == "" || this.cust_bussiness_partner_addr_dtls.at(0).get('contact_person').value == 0) {
          alert(" Please Enter Contact Person & Mob No. In Address Tab!!!");
          this.status = true;
        }
        else if (this.cust_bussiness_partner_bill_addr.get('country').value == null || this.cust_bussiness_partner_bill_addr.get('country').value == "" || this.cust_bussiness_partner_bill_addr.get('country').value == 0) {
          alert(" Please Select Country Name In Billing Address Tab!!!");
          this.status = true;
        }
        else if (this.cust_bussiness_partner_bill_addr.get('state_code').value == null || this.cust_bussiness_partner_bill_addr.get('state_code').value == "" || this.cust_bussiness_partner_bill_addr.get('state_code').value == 0) {
          alert(" Please Select State Name In Billing Address Tab!!!");
          this.status = true;
        }
        else if (this.cust_bussiness_partner_bill_addr.get('dist_code').value == null || this.cust_bussiness_partner_bill_addr.get('dist_code').value == "" || this.cust_bussiness_partner_bill_addr.get('dist_code').value == 0) {
          alert("Please Select District In Billing Address Tab!!!");
          this.status = true;
        }
        else if (this.cust_bussiness_partner_bill_addr.get('city_code').value == null || this.cust_bussiness_partner_bill_addr.get('city_code').value == "" || this.cust_bussiness_partner_bill_addr.get('city_code').value == 0) {
          alert("  Please Enter City In Billing Address Tab!!!");
          this.status = true;
        }
        else if (this.cust_bussiness_partner_bill_addr.get('pincode').value == null || this.cust_bussiness_partner_bill_addr.get('pincode').value == "" || this.cust_bussiness_partner_bill_addr.get('pincode').value == 0) {
          alert(" Please Enter Pin Code In Billing Address Tab!!!");
          this.status = true;
        }
        else if (this.cust_bussiness_partner_bill_addr_dtls.at(0).get('mobile').value == null || this.cust_bussiness_partner_bill_addr_dtls.at(0).get('mobile').value == "" || this.cust_bussiness_partner_bill_addr_dtls.at(0).get('mobile').value == 0 ||
          this.cust_bussiness_partner_bill_addr_dtls.at(0).get("contact_person").value == null || this.cust_bussiness_partner_bill_addr_dtls.at(0).get("contact_person").value == "" || this.cust_bussiness_partner_bill_addr_dtls.at(0).get('contact_person').value == 0) {
          alert(" Please Enter Contact Person & Mob No. In Billing Address Tab!!!");
          this.status = true;
        }

        else if (this.cust_bussiness_partner_statutory.get('pan_no').value == "") {
          alert("Please Select PAN no. In statutory Details Tab!!!");
          this.status = true;

        }
        else if (this.cust_bussiness_partner_statutory.get("pan_no").value.length != '10') {
          alert("Please Enter Valid PAN No In statutory Details Tab!!");

          this.status = true;
        }
        else if (this.cust_bussiness_partner_statutory.get('registered').value == true && (this.cust_bussiness_partner_statutory.get('gst_no').value == "" || this.cust_bussiness_partner_statutory.get('gst_no').value == null)) {
          alert("Please Enter GST No. In Statutory Details Tab as Party is Check Register !!!");
          this.status = true;
        }
        else if (this.cust_bussiness_partner_statutory.get('registered').value == true && this.cust_bussiness_partner_statutory.get("gst_no").value.length != '15') {
          alert("Please Enter Valid GST No In statutory Details Tab!!");
          this.status = true;
        }
        else if (this.cust_bussiness_partner_statutory.get('registered').value == true && this.GstPanCheck == false) {
          alert("PAN No. is not includes in GSTIN!! Please Enter Valid GST No In statutory Details Tab!!!!");
          this.status = true;
        }
        else if (this.cust_bussiness_partner_statutory.get('registered').value == true && (this.cust_bussiness_partner_statutory.get('customer_type').value == "" || this.cust_bussiness_partner_statutory.get('customer_type').value == null || this.cust_bussiness_partner_statutory.get('customer_type').value == "NA")) {
          alert("Please Enter Customer Type In Statutory Details Tab as Party is Check Register !!!");
          this.status = true;
        }
        else {

          if (this.cust_bussiness_partner_addr_dtls.at(0).get("contact_person").value == null || this.cust_bussiness_partner_addr_dtls.at(0).get("contact_person").value == "") {
            this.cust_bussiness_partner_addr_dtls.at(0).patchValue({ contact_person: "NA", designation: 0, phone: 0, mobile: 0, fax: 0, email: "NA" });
          }
          for (let b = 0; b < this.cust_bussiness_partner_delv_to.length; b++) {
            if (this.cust_bussiness_partner_delv_to.at(b).get("transport_own").value == "" || this.cust_bussiness_partner_delv_to.at(b).get("transport_own").value == 0) {
              alert(" Please Select Transport Own In Delivery From Tab");
              this.status = true;
              this.transportstatus.push("false")
            }
          }

          for (let c = 0; c < this.cust_bussiness_partner_broker.length; c++) {
            if (this.cust_bussiness_partner_broker.at(c).get("ven_code_name").value == null || this.cust_bussiness_partner_broker.at(c).get("ven_code_name").value == "" || this.cust_bussiness_partner_broker.at(c).get("ven_code_name").value == "0") {
              alert("Please Enter Broker Name In Broker Details Tab!!");
              this.status = true;
              this.brokerstatus.push("false")
            }
          }

          if (this.transportstatus.includes("false") || this.brokerstatus.includes("false")) {
            this.status = true;
          }
          else {

            let UnitA = this.userForm.get("unita").value;
            this.userForm.patchValue({ business_unit: UnitA.toString() });

            if (this.Id > 0) {
              this.status = false;
              //this.isRegisteredChecked = false;
              this.err_message = "";


              this.Service.updateCustomerMaster(this.userForm.getRawValue(), this.Id).subscribe(data => {
                console.log(this.userForm.getRawValue());
                alert("Customer Master Updated Successfully.");
                this.userForm.reset();
                this.status = true;
                this.ngOnInit();
                this.isHidden = false;
                this.cust_bussiness_partner_address.patchValue({ country: "INDIA" });
                this.group_type1 = "0";
                this.cust_bussiness_partner_broker.at(0).patchValue({ sl_no: this.broker_sl_no });
                this.cust_bussiness_partner_delv_to.at(0).patchValue({ sl_no: this.dlv_to_sl_no });
                this.trans_currency1 = "INR";
                this.onChangeBrokerDtlsStatus(false);
                this.cust_bussiness_partner_bill_addr.patchValue({ country: "INDIA" });
                this.DropDownListService.stateListByCountry(this.Country).subscribe(data => {
                  this.statesList = data;
                  this.status = true;
                });

                this.DropDownListService.stateListByCountry(this.Country1).subscribe(data => {
                  this.statesListOfBilling = data;
                  this.status = true;
                });
                //this.isRegisteredChecked = false;
              }, (error) => {
                this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("Customer Master Updation Unsuccessfull...");
                //this.ngOnInit()
              });


            }

            else {

              this.status = false;
              //this.isRegisteredChecked = false;
              this.err_message = "";
              this.Service.createCustomerBussinessPartner(this.userForm.getRawValue()).subscribe(data => {
                console.log(this.userForm.getRawValue());
                alert("New Customer Master Created Successfully.");
                this.userForm.patchValue({ cp_code: this.seq_no });
                //window.location.reload();
                this.userForm.reset();
                this.status = true;
                this.ngOnInit();
                this.isHidden = false;
                this.cust_bussiness_partner_address.patchValue({ country: "INDIA" });
                this.group_type1 = "0";
                this.cust_bussiness_partner_broker.at(0).patchValue({ sl_no: this.broker_sl_no });
                this.cust_bussiness_partner_delv_to.at(0).patchValue({ sl_no: this.dlv_to_sl_no });
                this.trans_currency1 = "INR";
                this.onChangeBrokerDtlsStatus(false);
                this.cust_bussiness_partner_bill_addr.patchValue({ country: "INDIA" });
                this.DropDownListService.stateListByCountry(this.Country).subscribe(data => {
                  this.statesList = data;
                  this.status = true;
                });

                this.DropDownListService.stateListByCountry(this.Country1).subscribe(data => {
                  this.statesListOfBilling = data;
                  this.status = true;
                });
                //this.isRegisteredChecked = false;
              }, (error) => {
                this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("New Customer Master Creation Unsuccessfull...");
                //this.ngOnInit()
              });
            }

          }
        }

      }
    }//here ends
  }

  chkCustCodeStatus(event: any) {
    if (event.target.value != null && event.target.value != '') {
      this.DropDownListService.chkCustCodeStatus(event.target.value).subscribe(data => {
        if (data.status == 'EXIST') {
          alert("Already Exist Code : " + event.target.value + " . Please Change !!!");
          this._CustCode.nativeElement.focus();
          this.userForm.patchValue({ cp_code: null });
          this.customermastersave = false;
        } else {
          this.customermastersave = true;
        }
      });
    }
  }

  onUpdate(id: any, cp_Id: string, action) {
    this.customermastersave = true;
    this.lockcustomername = true;
    this.isTypeChecked = false;
    this.isHidden = true;
    this.isRegister = true;
    //this.registercheck = false;
    this.statutoryinsert = false;
    this.statutoryupdate = true;
    this.basedOnList = [];
    this.selectedCity = [];
    this.selectedDist = [];
    this.selectedCityBill = [];
    this.selectedDistBill = [];
    this.selectedDistrictName=[];

    if (action == 'view') { this.action = 'view'; }
    else { this.action = 'update'; }

    if (localStorage.getItem("username") == 'JITESH' || localStorage.getItem("username") == 'ANUJ' || localStorage.getItem("username") == 'RADHIKA' || localStorage.getItem("username") == 'KHUSBOO' || localStorage.getItem("username") == 'superaayog') {
      this.isAdmin = true;
    }
    else {
      this.isAdmin = false;
    }

    this.Service.retriveCustomer(id).subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.isBrokerDtlsChecked = true;
        this.selectssiapp(data["ssi_app"]);
        this.UnitA = data.business_unit.split(',');
        this.userForm.patchValue({ unita: this.UnitA });
        this.userForm.patchValue(data);
      });

    this.Service.custAddRetriveList(cp_Id).subscribe(data => {
      this.selectedCity = data["city_code"];
      this.selectedDist = data["dist_code"];
      this.selectedPostOffice = data["postid"];
      this.DropDownListService.stateListByCountry(data.country).subscribe(data => {
        this.statesList = data;
        this.status = true;
      });
      this.DropDownListService.getDistrictThruState(data.state_code).subscribe(data => {
        this.districtsList = data;
        this.districtsListOfShip = data;
        this.status = true;
      });
      this.DropDownListService.getCityListThruDistrict(data.dist_code).subscribe(data => {
        this.citiesList = data;
        this.status = true;
      });
      // this.DropDownListService.getPostOfficeThruDist(data.postid).subscribe(data=>
      //   {
      //     this.PostOfficeList  = data;
      //     this.status = true;
      //   });  
      if (data.pincode != "") {
        this.DropDownListService.findPostOffice(data.pincode, data["dist_code"]).subscribe(data => {
          this.PostOfficeList = data;
          this.status = true;
        });
      }
      //  this.onChangeCountry(data.country)
      //  this.onChangeState(data.state);
      //  this.onChangeDistrict(data.district);
      this.cust_bussiness_partner_address.patchValue(data), (error) => {
        this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
        this.ngOnInit()
      }
    });

    //this.Service.custAddDtlsRetriveList(cp_Id).subscribe(data=>
    this.Service.custAddDtlsRetriveListnew(cp_Id).subscribe(data => {
      console.log("VALUE : : " + JSON.stringify(data));
      while (this.cust_bussiness_partner_addr_dtls.length > 0 && data.length > 0) { this.cust_bussiness_partner_addr_dtls.removeAt(0); }
      for (let data1 of data) { this.add3(); }
      this.cust_bussiness_partner_addr_dtls.patchValue(data), (error) => {
        this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
        this.ngOnInit()
      }
    });


    this.Service.custBillAddRetriveList(cp_Id).subscribe(data => {
      this.selectedCityBill = data["city_code"];
      this.selectedDistBill = data["dist_code"];
      this.selectedPostOfficeBill = data["postid"];
      this.DropDownListService.stateListByCountry(data.country).subscribe(data => {
        this.statesListOfBilling = data;
        this.status = true;
      });

      this.DropDownListService.getDistrictThruState(data.state_code).subscribe(data => {
        this.districtsListOfBilling = data;
        this.status = true;
      }, (error) => {
        this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
        this.ngOnInit()
      });

      this.DropDownListService.getCityListThruDistrict(data.dist_code).subscribe(data => {
        this.citiesListOfBilling = data;
        this.status = true;
      }, (error) => {
        this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
        this.ngOnInit()
      });

      if (data.pincode != "") {
        this.DropDownListService.findPostOffice(data.pincode, data["dist_code"]).subscribe(data => {
          this.PostOfficeListBill = data;
          this.status = true;
        });
      }
      // this.onChangeCountryBill(data.country)
      // this.onChangeStateBill(data.state);
      // this.onChangeDistrictBill(data.district);
      this.cust_bussiness_partner_bill_addr.patchValue(data), (error) => {
        this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
        this.ngOnInit()
      }
    });


    this.Service.custBillAddDtlsRetriveList(cp_Id).subscribe(data => {
      while (this.cust_bussiness_partner_bill_addr_dtls.length > 0 && data.length > 0) { this.cust_bussiness_partner_bill_addr_dtls.removeAt(0); }
      for (let data1 of data) { this.add4(); }
      this.cust_bussiness_partner_bill_addr_dtls.patchValue(data), (error) => {
        this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
        this.ngOnInit()
      }
    });

   
    /*this.Service.custShipAddDtlsRetriveList(cp_Id).subscribe(data => {
      //console.log("Shipping Address : : " + JSON.stringify(data)); 
      this.selectedDistrictName[k] = data["dist_code"];
      while (this.cust_bussiness_partner_shipping_addr_dtls.length > 0 && data.length > 0) 
      { 
        this.cust_bussiness_partner_shipping_addr_dtls.removeAt(0); 
      }
      for (let data1 of data) 
      { 
        this.addSAUpdate(); 
      }
      this.cust_bussiness_partner_shipping_addr_dtls.patchValue(data), (error) => 
      {
        this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
        this.ngOnInit()
      }
    });*/

    this.Service.custShipAddDtlsRetriveList(cp_Id).subscribe(data => {
          let k = 0;
         // console.log(JSON.stringify(data))
          this.addSAUpdate()
          
          while (this.cust_bussiness_partner_shipping_addr_dtls.length > 0 && data.length > 0) 
            { 
              this.cust_bussiness_partner_shipping_addr_dtls.removeAt(0); 
            }
          for (let data12 of data) {
            this.addSAUpdate();
            this.selectedDistrictName[k] = data12["dist_code"];
            this.cust_bussiness_partner_shipping_addr_dtls.at(k).patchValue({ slno: data12["slno"], shipping_name: data12["shipping_name"], country_shipping: data12["country_shipping"],
            state_shipping: data12["state_shipping"],dist_code: data12["dist_code"],city: data12["city"],pincode: data12["pincode"],address: data12["address"]})
            k = k + 1;

          }
        });


    this.Service.findCustDelvFromList(cp_Id).subscribe(data => {
      this.dlv_to_sl_no = 0;
      while (this.cust_bussiness_partner_delv_to.length > 0 && data.length > 0) { this.cust_bussiness_partner_delv_to.removeAt(0); }
      for (let data1 of data) { this.add1(); }
      if (data[0].transport_own == "YES") {
        this.showtransporterown = true;
      }
      else {
        this.showtransporterown = false;
      }



      this.cust_bussiness_partner_delv_to.patchValue(data)


      this.DropDownListService.transporterownlist(this.cust_bussiness_partner_delv_to.at(0).get("transporters").value)
        .subscribe(data123 => {
          // alert(JSON.stringify(data123))


          let k = 0;
          console.log(JSON.stringify(data123))
          this.addtransporterlistown()
          while (this.customer_transporterList.length)
            this.customer_transporterList.removeAt(0);
          for (let data12 of data123) {

            this.addtransporterlistown();
            this.customer_transporterList.at(k).patchValue({ transporterid: data12["bp_Id"], transportercode: data12["bp_code"], transportername: data12["bp_name"] })
            k = k + 1;

          }
        });




    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });

    this.Service.custAccountRetriveList(cp_Id).subscribe(data => {
      console.log("custAccountRetriveList: " + JSON.stringify(data))
      this.onChangeTcsApplicable(data["tcs_applicable"]);
      this.cust_bussiness_partner_accont.patchValue(data), (error) => {
        this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
        this.ngOnInit()
      }
    });




    this.Service.custStatutoryRetriveList(cp_Id).subscribe(data => {
      console.log("stat data:"+JSON.stringify(data))
      if (data["registered"] == true) {
        this.isRegisteredChecked = true;
        //this.registercheck = true;
      this.cust_bussiness_partner_statutory.patchValue({registered:data["registered"]})
        if (data["gst_no"].includes(data["pan_no"])) {
          this.GstPanCheck = true;
        }
        else {
          this.GstPanCheck = false;
        }
      }
      else {
        this.isRegisteredChecked = false;
        //this.registercheck = false;
      }
      
      this.cust_bussiness_partner_statutory.patchValue(data),
       (error) => {
        this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
        this.ngOnInit()
      }
    });


    let k = 0;
    this.Service.custBrokerRetriveList(cp_Id).subscribe(data => {
      console.log("broker data " + JSON.stringify(data))
      this.addBroker();
      this.broker_sl_no = 0;
      while (this.cust_bussiness_partner_broker.length > 0 && data.length > 0) { this.cust_bussiness_partner_broker.removeAt(0); }
      for (let data1 of data) {
        this.addBroker();
        this.onChangeBasis(data1.basis, k);
        this.cust_bussiness_partner_broker.at(k).patchValue(data1);
        k++;
      }

      // this.cust_bussiness_partner_broker.patchValue(data);
      console.log(this.cust_bussiness_partner_broker.at(0).get("ven_code_name").value)
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });

    this.Service.custDocRetriveList(cp_Id).subscribe(data => {
      while (this.cust_bussiness_partner_docs.length > 0 && data.length > 0) { this.cust_bussiness_partner_docs.removeAt(0); }
      for (let data1 of data) { this.addDocument(); }
      this.cust_bussiness_partner_docs.patchValue(data)
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });
  }


  getPanNoValid() {

    let pan_length = this.cust_bussiness_partner_statutory.get("pan_no").value;
    console.log("Length of Pan: " + pan_length.length)
    if (pan_length.length != '10') {
      alert("Please Enter Valid PAN No!!");
      this.status = true;

    }
  }

  getGstNoValid() {
    let gst_length = this.cust_bussiness_partner_statutory.get("gst_no").value;
    this.errormsggstn = "";
    //console.log("Check :: "+gst_length.substring(2,12));
    if (this.cust_bussiness_partner_statutory.get('registered').value == true) {
      if (gst_length.length != '15') {
        this.errormsggstn = "Please Enter Valid GST No!!";
        this.status = true;
      }
      else {
        if (gst_length.includes(this.cust_bussiness_partner_statutory.get("pan_no").value)) {
          this.errormsggstn = "";
          this.GstPanCheck = true;
        }
        else {
          this.errormsggstn = "PAN No. is not includes in GSTIN!! Please Enter Valid GST No!!";
          this.GstPanCheck = false;
        }
        this.status = true;
      }
    }
  }



  accountposting(id: any, action) {
    if (action == 'Posting') {
      this.DropDownListService.accountpostingCustomerMaster(id).subscribe(data => {
        if (data["export"] == 1) {
          alert("Data has been Exported Sucessfully !!!!!!!!!!!!! ");
        }
        else {
          alert("Data Didn't Exported  !!!!!!!!!!!!! ");
        }

        this.ngOnInit();
        this.isHidden = false;
        this.status = true;
      });
    }
    if (action == 'Undo') {
      alert
      if (confirm("Are you sure to Posting Undo Of this Customer ?")) {
        if (confirm("First Delete This Customer Ledger From Tally!!!")) {
          this.DropDownListService.accountpostingUndoCustomerMaster(id).subscribe(data => {
            if (data["export"] == 0) {
              alert("Account Posting Undo Sucessfully !!!!!!!!!!!!! ");
            }
            else {
              alert("Undo Unsucessfull  !!!!!!!!!!!!! ");
            }
            this.ngOnInit();
            this.isHidden = false;
            this.status = true;
          });
        }

      }
    }

  }

  search() {
    let customer_name1 = this.userForm1.get("customer_name1").value;
    let cust_group = this.userForm1.get("cust_group").value;
    let cust_type = this.userForm1.get("cust_type").value;
    let finyear = localStorage.getItem("financial_year");
    this.company_name = localStorage.getItem("company_name");

    this.status = false;
    this.DropDownListService.searchCustomerMasterData("customer_name1=" + customer_name1 + "&cust_group=" + cust_group + "&cust_type=" + cust_type + "&finyear=" + finyear + "&company_name=" + this.company_name).subscribe(data => {
      this.listcust_bussiness_partner = data;
      this.status = true;

    }, (error) => {
      this.status = true;
      alert("Customer Master Not Found !!!")
      this.listcust_bussiness_partner = [];
    })
  }

  addSA() {
    this.shipping_sl_no = this.shipping_sl_no + 1;
    this.cust_bussiness_partner_shipping_addr_dtls.push(this.fb.group({
      slno: this.shipping_sl_no,
      shipping_name: '',
      country_shipping: 'INDIA',
      state_shipping: this.cust_bussiness_partner_shipping_addr_dtls.at(0).get("state_shipping").value,
      dist_code: '',
      city: '',
      pincode: '',
      address: ''
    }));
  }

  addSAUpdate() {
    this.shipping_sl_no = this.shipping_sl_no + 1;
    this.cust_bussiness_partner_shipping_addr_dtls.push(this.fb.group({
      slno: this.shipping_sl_no,
      shipping_name: '',
      country_shipping: '',
      state_shipping: '',
      dist_code: '',
      city: '',
      pincode: '',
      address: ''
    }));
  }

  deleteSA(index) {
    if (this.shipping_sl_no > 1) {
      this.cust_bussiness_partner_shipping_addr_dtls.removeAt(index);
      this.shipping_sl_no = this.shipping_sl_no - 1;
    }
    else {
      this.shipping_sl_no = 1;
      alert("Can't Delete All Rows");
      this.cust_bussiness_partner_shipping_addr_dtls.reset();
      this.cust_bussiness_partner_shipping_addr_dtls.at(0).patchValue({ slno: this.shipping_sl_no });
    }

    for (let i = 1; i <= this.shipping_sl_no; i++) {
      this.cust_bussiness_partner_shipping_addr_dtls.at(i - 1).patchValue({ slno: i });
    }
  }
}