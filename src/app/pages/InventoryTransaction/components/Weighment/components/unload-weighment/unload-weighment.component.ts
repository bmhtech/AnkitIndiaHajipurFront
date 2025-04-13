import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import { UnloadWeightment } from '../../../../../../Models/Weightment/unload-weightment';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { UnloadAdviceItemListPopUpComponent } from '../../components/unload-advice-item-list-pop-up/unload-advice-item-list-pop-up.component';
import { LoadingAdviceItemListPopUpComponent } from '../../components/loading-advice-item-list-pop-up/loading-advice-item-list-pop-up.component';
import { forkJoin } from 'rxjs';
import { timer } from 'rxjs';
import { WeightmentBillPrintComponent } from '../weightment-bill-print/weightment-bill-print.component';
import * as fileSaver from 'file-saver';
//import { Terminal } from "xterm";
//import { FitAddon } from 'xterm-addon-fit';

import { SerialPort, SerialOptions } from "./serial";
import { element } from 'protractor';
import { PageEvent } from '@angular/material';
import { WeighmentterminatepopupComponent } from '../weighmentterminatepopup/weighmentterminatepopup.component';
import { WeightmentKata1BillPrintComponent } from '../weightment-kata1-bill-print/weightment-kata1-bill-print.component';

//new measure
let val: any;
//var TextDecoderStream;
declare var TextDecoderStream: any;

//const textDecoder = new (window as any).TextDecoder('utf-8');//


@Component({
  selector: 'app-unload-weighment',
  templateUrl: './unload-weighment.component.html',
  styleUrls: ['./unload-weighment.component.scss']
})

export class UnloadWeighmentComponent implements OnInit {
  submitted = false;
  isHidden: any;
  status = false;
  veh_nos: any = [];
  customList: any = [];
  public userForm: FormGroup;
  model: UnloadWeightment = new UnloadWeightment();
  listUnloadWeightment: any = [];
  party_sl_no = 1;
  company_name: any;
  vehicleTypeList: any = [];
  customerNameList: any = [];
  businesslists: any = [];
  supplierNames: any = [];
  seq_no: string;
  currentDate: any;
  currentDate1: any;
  currentDate2: any;
  currentTime: any;
  currentTime1: any;
  _weight2: any;
  _weighmentFor: any;
  action: any;
  adviceId: any = [];
  _gross_weight: number;
  _tare_weight: number;
  weighmentsave: boolean = true;
  weighmentview: boolean = true;
  weighmentbillprint: boolean = true;
  digitalweight1: any;
  gw_unituom: any;
  tare_weightuom: any;
  vehicle_id_no: any;
  gross_weightcheck: any;
  tare_weightcheck: any;
  bagscheck: any;
  grossstauts: boolean = true;
  tarestatus: boolean = true;
  bagscheck_2nd: boolean = true;

  outernostatus: boolean = true;
  outernetstatus: boolean = true;

  reference_name: any;

  digital_weightmodel: any;
  ref_type_name: any;


  public userForm1: FormGroup;
  business_Partner_List: any = [];

  getstatus: boolean = true;
  fetchstatus: boolean = true;
  myFiles: any = [];
  file_name: string;
  //new measurement 
  title = 'serialport';

  port: any;
  a: any;
  encoder = new TextEncoder();
  decoder = new TextDecoder();
  //TextDecoderStream: any;
  totalElements: number = 0;
  supplierNames_List: any = [];
  customerNames_List: any = [];

  reference_id: any;
  loading_weight_tolerance: boolean = false;
  item_wt: number = 0;
  weight_unit: any;
  remarkscheck: boolean = false;
  advice1: any = '';
  bulksupplyshow: boolean = false;
  bridge_location:any;
  outsideShow: boolean = false;
  outside:any;

  //end
  constructor(public fb: FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService, private dialog: MatDialog) {
    this.userForm = fb.group({
      wgment_no: [''],
      weight1: [''],
      weight2: [''],
      wgment_date: [''],
      wgment_for: [''],
      ref_doc_no: [''],
      ref_doc_date: [''],
      vehicle_id: [''],
      vehicle_no: [''],
      veh_type: [''],
      //  customer:[''],
      gross_weight: [''],
      gw_unit: [''],
      gw_date: [''],
      gw_time: [''],
      gw_remarks: [''],
      tare_weight: [''],
      tw_unit: [''],
      tw_date: [''],
      tw_time: [''],
      tw_remarks: [''],
      net_weight: [''],
      nw_unit: [''],
      digital_weight: [''],
      digital_weight1: [''],
      wgment_charge: [''],
      wgment_rs: [''],
      company_id: [''],
      fin_year: [''],
      username: [''],
      port_value: [''],
      tarebags: [''],
      vehicle_ref_name: [''],
      digital_weight_backup: [''],
      remarks: [''],
      tare_weight_bulker: [''],
      net_weight_bulker: [''],
      weight_bridge_location:[''],
      outside_weighment:[''],
      outside_weighmentno:[''],
      outside_netwt:[''],
      outer_date:[''],

      wm_unload_wgmnt_dtls: this.fb.array([this.fb.group({
        sl_no: this.party_sl_no,
        customer: '',
        supplier: '',
        business_unit: '',
        advice: '',
        wgment_date: '',
        advice_no: ''
      })]),

      weighment_doc: this.fb.array([this.fb.group({
        doc_name: '',
        doc_pdf: '',
        // fetch_doc:''
      })]),

      weighment_doc_list: this.fb.array([this.fb.group({
        doc_name: '',
        doc_pdf: '',

      })])
    });

    this.userForm1 = fb.group({
      wgment1_no: [''],
      fromdate: [''],
      todate: [''],
      customer_name1: [''],
      supplier_name1: ['']

    });
  }

  get wgment1_no() { return this.userForm1.get("wgment1_no") as FormControl }
  get fromdate() { return this.userForm1.get("fromdate") as FormControl }
  get todate() { return this.userForm1.get("todate") as FormControl }
  get customer_name1() { return this.userForm1.get("customer_name1") as FormControl }
  get supplier_name1() { return this.userForm1.get("supplier_name1") as FormControl }

  get wgment_no() { return this.userForm.get("wgment_no") as FormControl; }
  get weight1() { return this.userForm.get("weight1") as FormControl }
  get weight2() { return this.userForm.get("weight2") as FormControl }
  get wgment_date() { return this.userForm.get("wgment_date") as FormControl }
  get wgment_for() { return this.userForm.get("wgment_for") as FormControl }
  get ref_doc_no() { return this.userForm.get("ref_doc_no") as FormControl }
  get ref_doc_date() { return this.userForm.get("ref_doc_date") as FormControl }
  get vehicle_id() { return this.userForm.get("vehicle_id") as FormControl }
  get vehicle_no() { return this.userForm.get("vehicle_no") as FormControl }
  get veh_type() { return this.userForm.get("veh_type") as FormControl }

  get remarks() { return this.userForm.get("remarks") as FormControl }
  get digital_weight_backup() { return this.userForm.get("digital_weight_backup") as FormControl }

  // get customer() { return this.userForm.get("customer") as FormControl }
  get gross_weight() { return this.userForm.get("gross_weight") as FormControl }
  get gw_date() { return this.userForm.get("gw_date") as FormControl }
  get gw_time() { return this.userForm.get("gw_time") as FormControl }
  get gw_remarks() { return this.userForm.get("gw_remarks") as FormControl }
  get tare_weight() { return this.userForm.get("tare_weight") as FormControl }
  get tw_unit() { return this.userForm.get("tw_unit") as FormControl }
  get tw_date() { return this.userForm.get("tw_date") as FormControl }
  get tw_time() { return this.userForm.get("tw_time") as FormControl }
  get tw_remarks() { return this.userForm.get("tw_remarks") as FormControl }
  get net_weight() { return this.userForm.get("net_weight") as FormControl }
  get nw_unit() { return this.userForm.get("nw_unit") as FormControl }
  get digital_weight() { return this.userForm.get("digital_weight") as FormControl }
  get digital_weight1() { return this.userForm.get("digital_weight1") as FormControl }
  get wgment_charge() { return this.userForm.get("wgment_charge") as FormControl }
  get wgment_rs() { return this.userForm.get("wgment_rs") as FormControl }
  get wm_unload_wgmnt_dtls() { return this.userForm.get('wm_unload_wgmnt_dtls') as FormArray; }
  get tarebags() { return this.userForm.get("tarebags") as FormControl }
  get port_value() { return this.userForm.get("port_value") as FormControl; }
  get vehicle_ref_name() { return this.userForm.get("vehicle_ref_name") as FormControl; }
  get weight_bridge_location() { return this.userForm.get("weight_bridge_location") as FormControl }
  get tare_weight_bulker() { return this.userForm.get("tare_weight_bulker") as FormControl }
  get net_weight_bulker() { return this.userForm.get("net_weight_bulker") as FormControl }
  get outside_weighment() { return this.userForm.get("outside_weighment") as FormControl }
  get outside_weighmentno() { return this.userForm.get("outside_weighmentno") as FormControl }
  get outside_netwt() { return this.userForm.get("outside_netwt") as FormControl }
  get outer_date() { return this.userForm.get("outer_date") as FormControl }

  get weighment_doc() { return this.userForm.get('weighment_doc') as FormArray; }

  get weighment_doc_list() { return this.userForm.get('weighment_doc_list') as FormArray; }

  ngOnInit() {
    this.vehicle_id_no = "0";
    this.gw_unituom = "0";
    this.tare_weightuom = "0";
    this.gross_weightcheck = "0";
    this.tare_weightcheck = "0";
    this.digital_weightmodel = "0";
    this.bagscheck = "0";
    //For User Role
    let user_role = localStorage.getItem("user_role") + "tuhinabcd" + "weighment";
    //  this.DropDownListService.getRoleItemMaster(user_role).subscribe(data=>{
    //  let accessdata=JSON.stringify(data);
    this.weighmentsave = false;
    this.weighmentview = false;
    this.weighmentbillprint = false;
    this.loading_weight_tolerance = false;
    this.remarkscheck = false;
    this.bulksupplyshow = false;
    this.outsideShow=false;

    let accessdata = JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));

    if (accessdata.includes('weightment.save')) {
      this.weighmentsave = true;
    }
    if (accessdata.includes('weightment.view')) {
      this.weighmentview = true;
    }
    if (accessdata.includes('weightment.print')) {
      this.weighmentbillprint = true;
    }
    //this.getProducts({ page: "0", size: "10" });
    // }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    // this.ngOnInit()});

    //weighment for 'purchase order' static for vehicle list 15-05-2022 start
    //this.userForm.patchValue({wgment_for:'Purchase Order'})
    this.status = false;
    this.weighmentFor = 'Purchase Order';
    // this.DropDownListService.getUnloadVehiThruPurchase().subscribe(data=>
    //    this.DropDownListService.getVehicleListWeighmentnew().subscribe(data=>
    //   {
    //    this.veh_nos = data;
    //    this.status = true;
    //  });
    //end

    this.adviceId = [];
    this._gross_weight = 0;
    this._tare_weight = 0;
    this.company_name = localStorage.getItem("company_name");
    this.status = false;
    this.isHidden = false;
    // this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    // this.currentDate2=formatDate(new Date(), 'yyyy-MM-dd', 'en');
    // this.currentDate1=formatDate(new Date(), 'yyyy-MM-dd', 'en');
    // this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
    this.currentDate2 = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
    this.currentDate1 = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');

    if ((this.currentDate >= formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en')) && (this.currentDate <= formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en'))) {
      console.log("sucess");
    }
    else {
      alert("Current date is not in Selected Financial period!!!!!!")
      this.currentDate = formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
    }

    this.currentTime = new Date().toString().substr(16, 5);
    this.currentTime1 = new Date().toString().substr(16, 5);
    this._weight2 = '';
    this._weighmentFor = '';
    this.action = 'update';
    this.userForm.patchValue({
      gw_unit: "0", tw_unit: "0", nw_unit: "0", gross_weight: 0,
      tare_weight: 0, net_weight: 0,weight_bridge_location:'Weight Bridge 2',
      outside_weighment:'No',outside_weighmentno:'NA',outside_netwt:0.00,outer_date:''
    });
    this.bridge_location='Weight Bridge 2';
    this.outside="No";
    let finyear = localStorage.getItem("financial_year");
    forkJoin(
      //this.DropDownListService.getWeighmentDataList(this.currentDate,finyear) ,
      this.DropDownListService.getWeighmentDataFastList(this.currentDate),
      this.DropDownListService.supplierNamesNewList(this.company_name),
      this.DropDownListService.newcustomerList(this.company_name)
    ).subscribe(([weimentData, suppData, custdata]) => {
      console.log("weimentData:" + JSON.stringify(weimentData))
      this.listUnloadWeightment = weimentData;
      this.supplierNames_List = suppData;
      this.customerNames_List = custdata;
    });

    //forkJoin(
    // this.DropDownListService.vehicleCodeList(),
    //this.Service.getUnloadWeightments(),
    // this.DropDownListService.getWeighmentCustomUOM(),
    // this.DropDownListService.getCustomUOMs("WUOM"),
    // this.DropDownListService.getCompanyBUMNCList(this.company_name),
    //  this.DropDownListService.supplierNamesList(this.company_name),
    //  this.Service.getCustomerBussinessPartner()
    // ).subscribe(([vehicleData, uWgmtData, customUomData, bunitData, supplierData, customerData])=>
    // ).subscribe(([ uWgmtData])=>
    // {
    //  this.status = true;
    //  this.vehicleTypeList  = vehicleData;
    // this.listUnloadWeightment  = uWgmtData;
    //console.log(" uWgmtData :: " + JSON.stringify(uWgmtData));
    // this.customList = customUomData;
    //   this.businesslists  =   bunitData;
    //  this.supplierNames  = supplierData;
    //   this.customerNameList = customerData;
    //   this.userForm.patchValue({gw_unit: "0", tw_unit: "0", nw_unit: "0", gross_weight: 0,
    //     tare_weight: 0, net_weight: 0});
    //  }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    //   this.ngOnInit()}); 

    //weighment for 'purchase order' static for vehicle list 15-05-2022 start

    this.status = true;
    this.weighmentFor = 'Purchase Order';
    /*starts here   01-06-2022
          //   this.DropDownListService.getUnloadVehiThruPurchase().subscribe(data=>
       //   {
      //      this.veh_nos = data;
      //      this.status = true;
       //   });
       *///ends here 
    //end   
    /*
        this.DropDownListService.supplierorcustomerCodeList(this.company_name) .subscribe(data=>
          {
            //console.log(JSON.stringify(data))
            this.business_Partner_List=data;
          });
          */
  }

  onChangeLocation()
  {
    let location = this.userForm.get("weight_bridge_location").value;
    this.bridge_location=this.userForm.get("weight_bridge_location").value;
    this.DropDownListService.getVehicleLocationwiseWeighmentList(location).subscribe(data => {
      this.veh_nos = data;
      this.status = true;
    });
  }

  onChangeOutsideWeighment()
  {
    this.outside=this.userForm.get("outside_weighment").value;
    if(this.outside==='Yes')
    {
      this.outsideShow=true;
    }
    else{
      this.outsideShow=false;
      this.userForm.patchValue({outside_weighmentno:'NA',outside_netwt:0.00,outer_date:''})
    }
  }

  getNetQtyCheck()
  {
    this.outside=this.userForm.get("outside_weighment").value;
    let wei_net=this.userForm.get("net_weight").value;
    let out_net=this.userForm.get("outside_netwt").value;
    console.log(wei_net,"/net check/",out_net)
    if(this.outside =='Yes' && out_net !=wei_net)
    {
      alert("Kata Net Wt and Outside Net Wt Should be Same,Please Check it.");
      this.userForm.patchValue({outside_netwt:0.00});
      this.status=true;
    }
    else{this.status=true;}

  }
  onChangeWhgmtDate(wgmtDate) {
    this.userForm.patchValue({ wgment_no: '' });
    this.currentDate = wgmtDate.target.value;
    // if( this._weighmentFor != '' && this._weight2 != '')
    // { this.getWeighmentNo(this._weighmentFor, this.currentDate, this._weight2);}
    if ((this.currentDate >= formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en')) && (this.currentDate <= formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en'))) {
      if (this._weighmentFor != '' && this._weight2 != '') { this.getWeighmentNo(this._weighmentFor, this.currentDate, this._weight2); }
    }
    else {
      alert("Selected  date is not in Selected Financial period!!!!!!")
      this.currentDate = formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
    }
  }

  getWeighmentNo(wgmnt_for, wgmnt_date, wt2) {
    this.status = false;
    this.DropDownListService.getWeighmentSequenceId(wgmnt_for + "/" + wgmnt_date + "/" + wt2).subscribe(data => {
      this.seq_no = data.sequenceid;
      this.status = true;
    });

  }

  getWeighmentNonew(wgmnt_for, wgmnt_date, wt2, unadviceid) {
    this.status = false;
    this.DropDownListService.getWeighmentSequenceIdnew(wgmnt_for + "/" + wgmnt_date + "/" + wt2 + "/" + unadviceid).subscribe(data => {
      this.seq_no = data.sequenceid;
      this.status = true;
    });

  }
  getWeighmentNonewloading(wgmnt_for, wgmnt_date, wt2, adviceid) {
    this.status = false;
    this.DropDownListService.getWeighmentSequenceIdnewloading(wgmnt_for + "/" + wgmnt_date + "/" + wt2 + "/" + adviceid).subscribe(data => {
      this.seq_no = data.sequenceid;
      this.status = true;
    });

  }

  onChangeGrossUom(uom: string) {
    // this.userForm.patchValue({tw_unit: uom, nw_unit: uom});

    //this.userForm.patchValue({gw_unit: uom, nw_unit: uom});
    //starts here 

    let checkweight1: any = this.userForm.get("weight1").value as FormControl;
    let checkweight2: any = this.userForm.get("weight2").value as FormControl;
    let convertionfactor: any;

    //console.log("check "+this.userForm.get("gw_unit").value) 
    this.customList.forEach(element => {

      //  if(this.userForm.get("gw_unit").value == element.customuom_id)
      if (uom == element.customuom_id) {
        convertionfactor = element.uom_conv_fac;
      }
    });
    if (this.reference_name == 'Unload Advice') {


      if (this.ref_type_name == 'Purchase Order') {
        if (checkweight1 == "weight1" && checkweight2 == "" || checkweight2 == null) {

          let grossvalueafterconvertion: number;
          grossvalueafterconvertion = Number(this.userForm.get("digital_weight").value) * convertionfactor;

          this.userForm.patchValue({ gross_weight: (grossvalueafterconvertion).toFixed(3) });//this line paste

          this.userForm.patchValue({ net_weight: Math.abs(grossvalueafterconvertion).toFixed(3) });

          this.userForm.patchValue({ tw_unit: uom, nw_unit: uom });//here 1st time auto uom
        }
        if (checkweight1 == "weight1" && checkweight2 == "weight2") {
          let grossvalueafterconvertion = Number(this.userForm.get("digital_weight").value) * convertionfactor;


          this.userForm.patchValue({ tare_weight: (grossvalueafterconvertion).toFixed(3) });//this line paste
          this.userForm.patchValue({ net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) - Number(grossvalueafterconvertion)).toFixed(3) });
        }

      }
      if (this.ref_type_name == 'Open Advice') {
        if (checkweight1 == "weight1" && checkweight2 == "" || checkweight2 == null) {

          let grossvalueafterconvertion: number;
          grossvalueafterconvertion = Number(this.userForm.get("digital_weight").value) * convertionfactor;

          this.userForm.patchValue({ gross_weight: (grossvalueafterconvertion).toFixed(3) });//this line paste

          this.userForm.patchValue({ net_weight: Math.abs(grossvalueafterconvertion).toFixed(3) });

          this.userForm.patchValue({ tw_unit: uom, nw_unit: uom });//here 1st time auto uom
        }
        if (checkweight1 == "weight1" && checkweight2 == "weight2") {
          // console.log("here comes"+convertionfactor);
          let grossvalueafterconvertion = Number(this.userForm.get("digital_weight").value) * convertionfactor;


          this.userForm.patchValue({ tare_weight: (grossvalueafterconvertion).toFixed(3) });//this line paste
          this.userForm.patchValue({ net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) - Number(grossvalueafterconvertion)).toFixed(3) });
        }

      }
      if (this.ref_type_name == 'Sales Return') {
        if (checkweight1 == "weight1" && checkweight2 == "" || checkweight2 == null) {

          let grossvalueafterconvertion: number;
          grossvalueafterconvertion = Number(this.userForm.get("digital_weight").value) * convertionfactor;

          this.userForm.patchValue({ gross_weight: (grossvalueafterconvertion).toFixed(3) });//this line paste

          this.userForm.patchValue({ net_weight: Math.abs(grossvalueafterconvertion).toFixed(3) });

          this.userForm.patchValue({ tw_unit: uom, nw_unit: uom });//here 1st time auto uom
        }
        if (checkweight1 == "weight1" && checkweight2 == "weight2") {
          let grossvalueafterconvertion = Number(this.userForm.get("digital_weight").value) * convertionfactor;


          this.userForm.patchValue({ tare_weight: (grossvalueafterconvertion).toFixed(3) });//this line paste
          this.userForm.patchValue({ net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) - Number(grossvalueafterconvertion)).toFixed(3) });
        }

      }
      if (this.ref_type_name == 'Stock Transfer') {
        if (checkweight1 == "weight1" && checkweight2 == "" || checkweight2 == null) {

          let grossvalueafterconvertion: number;
          grossvalueafterconvertion = Number(this.userForm.get("digital_weight").value) * convertionfactor;

          this.userForm.patchValue({ gross_weight: (grossvalueafterconvertion).toFixed(3) });//this line paste

          this.userForm.patchValue({ net_weight: Math.abs(grossvalueafterconvertion).toFixed(3) });

          this.userForm.patchValue({ tw_unit: uom, nw_unit: uom });//here 1st time auto uom
        }
        if (checkweight1 == "weight1" && checkweight2 == "weight2") {
          let grossvalueafterconvertion = Number(this.userForm.get("digital_weight").value) * convertionfactor;


          this.userForm.patchValue({ tare_weight: (grossvalueafterconvertion).toFixed(3) });//this line paste
          this.userForm.patchValue({ net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) - Number(grossvalueafterconvertion)).toFixed(3) });
        }


      }
    }
    if (this.reference_name == 'Load Advice') {


      if (this.ref_type_name == 'Sales Order') {
        if (checkweight1 == "weight1" && checkweight2 == "" || checkweight2 == null) {

          let grossvalueafterconvertion: number;
          grossvalueafterconvertion = Number(this.userForm.get("digital_weight").value) * convertionfactor;

          // this.userForm.patchValue({tare_weight: (grossvalueafterconvertion).toFixed(3),gross_weight:0});//this line paste


          this.userForm.patchValue({ gw_unit: uom, nw_unit: uom });//here reverse set uom 


          console.log("reference_id Value::" + this.reference_id)
          this.DropDownListService.checkLooseItem(this.reference_id).subscribe(looseitem => {
            console.log(" looseitem here  " + looseitem.status)
            if (looseitem.status == 'YES') {
              //this.userForm.patchValue({tare_weight:143.80,gross_weight:0,tw_unit:'CUM00002',net_weight:143.80});//this line paste
              this.userForm.patchValue({
                tare_weight: (grossvalueafterconvertion).toFixed(3), gross_weight: 0, tw_unit: 'CUM00002',
                net_weight: Math.abs(grossvalueafterconvertion).toFixed(3), tare_weight_bulker: '143.80', net_weight_bulker: '0.00'
              });
            }
            else {
              grossvalueafterconvertion = Number(this.userForm.get("digital_weight").value) * convertionfactor;

              this.userForm.patchValue({ tare_weight: (grossvalueafterconvertion).toFixed(3), gross_weight: 0 });
              this.userForm.patchValue({ net_weight: Math.abs(grossvalueafterconvertion).toFixed(3), tare_weight_bulker: '0.00', net_weight_bulker: '0.00' });
            }
          });


        }
        if (checkweight1 == "weight1" && checkweight2 == "weight2") {
          this.DropDownListService.checkLooseItem(this.reference_id).subscribe(looseitem => {
            console.log(" looseitem here W2 : :  " + looseitem.status)

            let grossvalueafterconvertion = Number(this.userForm.get("digital_weight").value) * convertionfactor;

            this.userForm.patchValue({ gross_weight: (grossvalueafterconvertion).toFixed(3) });//this line paste
            this.userForm.patchValue({ net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) - Number(this.userForm.get("tare_weight").value)).toFixed(3) });


            if (looseitem.status == 'YES') {
              this.bulksupplyshow = true;
              this.userForm.patchValue({ net_weight_bulker: Math.abs(Number(this.userForm.get("gross_weight").value) - Number(this.userForm.get("tare_weight_bulker").value)).toFixed(3) });

            }
            else {
              this.bulksupplyshow = false;
              this.userForm.patchValue({ net_weight_bulker: '0.00' });
            }
          });

        }

      }
      if (this.ref_type_name == 'Open Advice') {

        if (checkweight1 == "weight1" && checkweight2 == "" || checkweight2 == null) {

          let grossvalueafterconvertion: number;
          grossvalueafterconvertion = Number(this.userForm.get("digital_weight").value) * convertionfactor;

          this.userForm.patchValue({ tare_weight: (grossvalueafterconvertion).toFixed(3) });//this line paste

          this.userForm.patchValue({ net_weight: Math.abs(grossvalueafterconvertion).toFixed(3), gross_weight: 0 });
          this.userForm.patchValue({ gw_unit: uom, nw_unit: uom });//here reverse set uom 
        }
        if (checkweight1 == "weight1" && checkweight2 == "weight2") {
          //  console.log("Hi1")

          let grossvalueafterconvertion = Number(this.userForm.get("digital_weight").value) * convertionfactor;

          this.userForm.patchValue({ gross_weight: (grossvalueafterconvertion).toFixed(3) });//this line paste
          this.userForm.patchValue({ net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) - Number(this.userForm.get("tare_weight").value)).toFixed(3) });

        }

      }
      if (this.ref_type_name == 'Purchase Return') {
        if (checkweight1 == "weight1" && checkweight2 == "" || checkweight2 == null) {

          let grossvalueafterconvertion: number;
          grossvalueafterconvertion = Number(this.userForm.get("digital_weight").value) * convertionfactor;

          this.userForm.patchValue({ tare_weight: (grossvalueafterconvertion).toFixed(3), gross_weight: 0 });//this line paste

          this.userForm.patchValue({ net_weight: Math.abs(grossvalueafterconvertion).toFixed(3) });
          this.userForm.patchValue({ gw_unit: uom, nw_unit: uom });//here reverse set uom 
        }
        if (checkweight1 == "weight1" && checkweight2 == "weight2") {
          //console.log("Hi2")

          let grossvalueafterconvertion = Number(this.userForm.get("digital_weight").value) * convertionfactor;

          this.userForm.patchValue({ gross_weight: (grossvalueafterconvertion).toFixed(3) });//this line paste
          this.userForm.patchValue({ net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) - Number(this.userForm.get("tare_weight").value)).toFixed(3) });

        }
      }
      if (this.ref_type_name == 'Stock Transfer') {
        if (checkweight1 == "weight1" && checkweight2 == "" || checkweight2 == null) {

          let grossvalueafterconvertion: number;
          grossvalueafterconvertion = Number(this.userForm.get("digital_weight").value) * convertionfactor;

          this.userForm.patchValue({ tare_weight: (grossvalueafterconvertion).toFixed(3), gross_weight: 0 });//this line paste

          this.userForm.patchValue({ net_weight: Math.abs(grossvalueafterconvertion).toFixed(3) });

          this.userForm.patchValue({ gw_unit: uom, nw_unit: uom });//here reverse set uom 
        }
        if (checkweight1 == "weight1" && checkweight2 == "weight2") {
          //console.log("Hi3")

          let grossvalueafterconvertion = Number(this.userForm.get("digital_weight").value) * convertionfactor;

          this.userForm.patchValue({ gross_weight: (grossvalueafterconvertion).toFixed(3) });//this line paste
          this.userForm.patchValue({ net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) - Number(this.userForm.get("tare_weight").value)).toFixed(3) });

        }

      }



    }

    //ends here 

  }

  onChangeTareUom(uom: string) {
    this.userForm.patchValue({ gw_unit: uom, nw_unit: uom });
  }

  add() {

    this.party_sl_no = this.party_sl_no + 1;
    this.wm_unload_wgmnt_dtls.push(this.fb.group({
      sl_no: this.party_sl_no,
      customer: '',
      supplier: '',
      business_unit: '',
      advice: '',
      wgment_date: '',
      advice_no: ''
    }));
  }

  delete(index) {
    if (this.party_sl_no > 1) {
      this.wm_unload_wgmnt_dtls.removeAt(index);
      this.party_sl_no = this.party_sl_no - 1;
    }
    else {
      this.party_sl_no = 1;
      alert("can't delete all rows");
      this.wm_unload_wgmnt_dtls.reset();
      this.wm_unload_wgmnt_dtls.at(0).patchValue({ sl_no: this.party_sl_no });
    }

    for (let i = 1; i <= this.party_sl_no; i++)
      this.wm_unload_wgmnt_dtls.at(i - 1).patchValue({ sl_no: i });

  }
  addDocument() {
    this.weighment_doc.push(this.fb.group({

      doc_name: '',
      doc_pdf: ''
    }));
  }
  addDocumentlist() {
    this.weighment_doc_list.push(this.fb.group({

      doc_name: '',
      doc_pdf: ''
    }));
  }

  showList(s: string) {
    if (this.weighmentsave == true)//true exist  false not exist 
    {
      // console.log("hello")
      if (s == "add") {
        this.isHidden = true;

        //this.DropDownListService.getVehicleListWeighmentnew().subscribe(data => {
          this.DropDownListService.getVehicleLocationwiseWeighmentList('Weight Bridge 2').subscribe(data => {
          this.veh_nos = data;
          this.status = true;
        });

        this.userForm.patchValue({});
      }
    }

    if (s == "list") {
      this.adviceId = [];
      this.isHidden = false;
      this.action = 'update';
      this.userForm.reset();
      this.wm_unload_wgmnt_dtls.reset();
      this.party_sl_no = 0;
      while (this.wm_unload_wgmnt_dtls.length)
        this.wm_unload_wgmnt_dtls.removeAt(0);
      this.add();

      this.weighment_doc.reset();
      while (this.weighment_doc.length)
        this.weighment_doc.removeAt(0);
      this.addDocument();
      this.weighment_doc_list.reset();
      while (this.weighment_doc_list.length)
        this.weighment_doc_list.removeAt(0);
      this.addDocumentlist();

      //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      this.userForm.patchValue({ advice_date: this.currentDate });
      this.ngOnInit();
    }
  }

  calNetWt(event, weight: string) {

    let Wgment_for = this.userForm.get("wgment_for").value;


    if (Wgment_for == 'Purchase Order' || Wgment_for == 'Stock Transfer Unloading' || Wgment_for == 'Sales Return') {
      if (weight == 'Gross wt') {
        this._gross_weight = event.target.value;
        this.userForm.patchValue({ net_weight: Math.abs(this._gross_weight).toFixed(3) });
        // alert(this.userForm.get("weight2").value+"//"+this.userForm.get("wgment_for").value+"/"+ this.userForm.get("tare_weight").value +" / " + this._gross_weight)
        if (this.userForm.get("weight2").value == "weight2" && this.userForm.get("wgment_for").value == "Sale") {
          this.userForm.patchValue({ net_weight: Math.abs(Number(this._gross_weight) - Number(this.userForm.get("tare_weight").value)).toFixed(3) });
        }
      }
      if (weight == 'Tare wt') {
        this._tare_weight = event.target.value;
        this.userForm.patchValue({ net_weight: Math.abs(this._gross_weight - this._tare_weight).toFixed(3) });
      }
      //this.toleranceCheckAndSend();
    }
    if (Wgment_for == 'Sale' || Wgment_for == 'Stock Transfer Loading' || Wgment_for == 'Purchase Return') {
      if (weight == 'Gross wt') {

        this._gross_weight = event.target.value;
        this.userForm.patchValue({ net_weight: Math.abs(this._gross_weight).toFixed(3) });
        // alert(this.userForm.get("weight2").value+"//"+this.userForm.get("wgment_for").value+"/"+ this.userForm.get("tare_weight").value +" / " + this._gross_weight)
        if (this.userForm.get("weight2").value == "weight2" && (this.userForm.get("wgment_for").value == "Sale" || this.userForm.get("wgment_for").value == "Stock Transfer Loading")) {
          this.userForm.patchValue({ net_weight: Math.abs(Number(this._gross_weight) - Number(this.userForm.get("tare_weight").value)).toFixed(3) });
          this.DropDownListService.checkLooseItem(this.reference_id).subscribe(looseitem => {
            console.log(" looseitem here Net wt " + looseitem.status)
            if (looseitem.status == 'YES') {
              this.userForm.patchValue({ net_weight_bulker: Math.abs(Number(this._gross_weight) - Number(this.userForm.get("tare_weight_bulker").value)).toFixed(3) });
            }
            else {
              this.userForm.patchValue({ net_weight_bulker: '0.00' });
            }
          });
        }
      }
      if (weight == 'Tare wt') {

        this._tare_weight = event.target.value;

      }

      //this.toleranceCheckAndSend();  
    }

    //this.toleranceCheckAndSend(); 
    // this.userForm.patchValue({net_weight: Math.abs(this._gross_weight -  this._tare_weight).toFixed(3)});


  }

  onClickBillPrint(id, weighmentid) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: 0 };
    let comp = this.company_name;
    //  let popupdata:any;

    // console.log("hello second"+popupdata);
    //let dialogRef = this.dialog.open(WeightmentBillPrintComponent, dialogConfig);
    let dialogRef = this.dialog.open(WeightmentBillPrintComponent, {
      data: { alldata: id, weighment_id: weighmentid, company_name: comp }, height: '500px',
      width: '1000px'
    });
    dialogRef.afterClosed().subscribe(data => {
      // this.sales_Invoice_Item_Dtls.at(index).patchValue({acc_norms: data["qc_code"]});
    });
  }
  onClickBillPrint1stkata(id,weighmentid)
  {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = { index: 0 };
      let comp = this.company_name;

      let dialogRef = this.dialog.open(WeightmentKata1BillPrintComponent, {
        data: { alldata: id, weighment_id: weighmentid, company_name: comp }, height: '500px',
        width: '1000px'
      });
      dialogRef.afterClosed().subscribe(data => {
        // this.sales_Invoice_Item_Dtls.at(index).patchValue({acc_norms: data["qc_code"]});
      });


  }


  onChangeNewNet(event) {
    let Gross = event.target.value;
    let Tarewt = this.userForm.get("tare_weight").value;
    //  this.userForm.patchValue({net_weight: Math.abs(Gross -  Tarewt).toFixed(3)});
    this.userForm.patchValue({ net_weight: Math.abs(Gross).toFixed(3) });
    let Wgment_for = this.userForm.get("wgment_for").value;
    if (Wgment_for == "Sales Return" || Wgment_for == "Purchase Order" || Wgment_for == "Stock Transfer Unloading") {
      this.userForm.patchValue({ net_weight: Math.abs(Gross).toFixed(3) });
    }

    if (this.userForm.get("weight2").value == "weight2" && (this.userForm.get("wgment_for").value == "Sale" || Wgment_for == "Stock Transfer Loading")) {

      this.userForm.patchValue({ net_weight: Math.abs(Number(Gross) - Number(this.userForm.get("tare_weight").value)).toFixed(3) });
    }
    //this.toleranceCheckAndSend();
  }

  onChangeNewTare(event) {
    let tarewt = event.target.value;
    let Gross = this.userForm.get("gross_weight").value;
    // this.userForm.patchValue({net_weight: Math.abs(tarewt).toFixed(3)});//changes made date on 24-04-2022 by tuhin 
    //this.userForm.patchValue({net_weight: Math.abs(Gross -  tarewt).toFixed(3)});

    let Wgment_for = this.userForm.get("wgment_for").value;
    //here Wgment_for is comming null please look after it later
    if (Wgment_for == "Sales Return" || Wgment_for == "Purchase Order" || Wgment_for == "Stock Transfer Unloading") {
      this.userForm.patchValue({ net_weight: Math.abs(Gross - tarewt).toFixed(3) });
    }

    if (Wgment_for == "Sale" || Wgment_for == 'Stock Transfer Loading' || Wgment_for == 'Purchase Return') {
      if (this.userForm.get("weight2").value == "weight2" && this.userForm.get("wgment_for").value == "Sale") {
        this.userForm.patchValue({ net_weight: Math.abs(Number(this._gross_weight) - Number(this.userForm.get("tare_weight").value)).toFixed(3) });
      }
    }
    //this.toleranceCheckAndSend();
  }

  weighmentFor: any;
  onChangeWeighmentFor(wegmntFor: string) {

    // alert(wegmntFor);
    this.userForm.patchValue({ wgment_no: '' });
    this.veh_nos = [];
    this._weighmentFor = wegmntFor;
    this.userForm.patchValue({ weight2: null, weight1: null, wgment_charge: null, wgment_rs: null, vehicle_id: '0', veh_type: null });
    this.add();
    this.party_sl_no = 0;
    while (this.wm_unload_wgmnt_dtls.length)
      this.wm_unload_wgmnt_dtls.removeAt(0);
    this.add();

    this.status = false;
    if (wegmntFor == 'Purchase Order') {
      this.weighmentFor = 'Purchase Order';
      this.DropDownListService.getUnloadVehiThruPurchase().subscribe(data => {
        // console.log("Vechile Details: "+JSON.stringify(data));
        this.veh_nos = data;
        this.status = true;
      });
    }
    else if (wegmntFor == 'Purchase Return') {
      this.weighmentFor = 'Purchase Return';
      this.DropDownListService.getLoadingVehiThruPR().subscribe(data => {
        this.veh_nos = data;
        this.status = true;
      });
    }
    else if (wegmntFor == 'Stock Transfer Unloading') {
      this.weighmentFor = 'Stock Transfer Unloading';
      this.DropDownListService.getUnloadVehiThruStkTransfer().subscribe(data => {
        this.veh_nos = data;
        this.status = true;
      });
    }
    else if (wegmntFor == 'Sale') {
      this.weighmentFor = 'Sale';
      this.DropDownListService.getLoadingVehiThruSales().subscribe(data => {
        this.veh_nos = data;
        this.status = true;
      });
    }
    else if (wegmntFor == 'Stock Transfer Loading') {
      this.weighmentFor = 'Stock Transfer Loading';
      this.DropDownListService.getLoadingVehiThruStkTransfer().subscribe(data => {
        this.veh_nos = data;
        this.status = true;
      });
    }
    else {
      this.weighmentFor = 'Sales Return';
      this.DropDownListService.getUnloadVehiThruSR().subscribe(data => {
        this.veh_nos = data;
        this.status = true;
      });
    }

  }

  WeightMentFor: any;
  vechileTypeCode: any;
  Weight1: any;
  Weight2: any;
  onChangeVechileNo(vechile_no: string) {


    if (vechile_no != "0") {
      forkJoin(
        this.DropDownListService.vehicleCodeList(),
        this.DropDownListService.getCustomUOMs("WUOM"),
        this.DropDownListService.getCompanyBUMNCList(this.company_name),
        this.DropDownListService.newsupplierNamesList(this.company_name),
        this.DropDownListService.newcustomerList(this.company_name)
      ).subscribe(([vehicleData, customUomData, bunitData, supplierData, customerData]) => {

        this.status = true;
        this.vehicleTypeList = vehicleData;
        this.customList = customUomData;
        this.businesslists = bunitData;
        this.supplierNames = supplierData;
        this.customerNameList = customerData;
        this.userForm.patchValue({ gw_unit: "0", tw_unit: "0", nw_unit: "0", gross_weight: 0, tare_weight: 0, net_weight: 0 });

        this.veh_nos.forEach(element => {
          if (vechile_no == element.vehicle_id) {
            this.reference_name = element.ref_name;
            this.ref_type_name = element.ref_name_type;
            this.reference_id = element.reference_id;
          }
        });
        console.log("reference_id:" + this.reference_id)
        if (this.reference_name == 'Unload Advice') {
          if (this.ref_type_name == 'Purchase Order') {
            this._weighmentFor = 'Purchase Order';
            this.weighmentFor = 'Purchase Order';
            this.userForm.patchValue({ wgment_for: 'Purchase Order' })

          }
          if (this.ref_type_name == 'Open Advice') {
            this._weighmentFor = 'Purchase Order';
            this.weighmentFor = 'Purchase Order';
            this.userForm.patchValue({ wgment_for: 'Purchase Order' })

          }
          if (this.ref_type_name == 'Sales Return') {
            this._weighmentFor = 'Sales Return';
            this.weighmentFor = 'Sales Return';
            this.userForm.patchValue({ wgment_for: 'Sales Return' })
          }
          if (this.ref_type_name == 'Stock Transfer') {
            this._weighmentFor = 'Stock Transfer Unloading';
            this.weighmentFor = 'Stock Transfer Unloading';
            this.userForm.patchValue({ wgment_for: 'Stock Transfer Unloading' })
          }
        }
        if (this.reference_name == 'Load Advice') {

          if (this.ref_type_name == 'Sales Order') {
            this._weighmentFor = 'Sale';
            this.weighmentFor = 'Sale';
            this.userForm.patchValue({ wgment_for: 'Sale' })
          }
          if (this.ref_type_name == 'Open Advice') {
            this._weighmentFor = 'Sale';
            this.weighmentFor = 'Sale';
            this.userForm.patchValue({ wgment_for: 'Sale' })

          }
          if (this.ref_type_name == 'Purchase Return') {
            this._weighmentFor = 'Purchase Return';
            this.weighmentFor = 'Purchase Return';
            this.userForm.patchValue({ wgment_for: 'Purchase Return' })
          }
          if (this.ref_type_name == 'Stock Transfer') {
            this._weighmentFor = 'Stock Transfer Loading';
            this.weighmentFor = 'Stock Transfer Loading';
            this.userForm.patchValue({ wgment_for: 'Stock Transfer Loading' })
          }
        }
        this.userForm.patchValue({ vehicle_ref_name: this.reference_name });

        this.status = false;
        this.DropDownListService.getVehicleTypeName(vechile_no).subscribe(vehTypeData => {
          this.userForm.patchValue({ veh_type: vehTypeData[0].vehtype_code });
          this.vechileTypeCode = vehTypeData[0].vehtype_code;
          this.status = true;
        });

        if (this.weighmentFor == 'Purchase Order' || this.weighmentFor == 'Stock Transfer Unloading' || this.weighmentFor == 'Sales Return') {
          let orderType = 'Purchase Order';
          if (this.weighmentFor == 'Stock Transfer Unloading')
            orderType = 'Stock Transfer';
          if (this.weighmentFor == 'Sales Return')
            orderType = 'Sales Return';

          this.status = false;

          // this.DropDownListService.getUnloadAdviceThruVehicle(vechile_no, orderType).subscribe(data=>
          this.DropDownListService.getUnloadAdviceThruVehiclefast(vechile_no, orderType).subscribe(data => {
            console.log("Cust purchase UoM:: ",JSON.stringify(data));
            this.userForm.patchValue({ gw_unit: data[0]["uom"], tw_unit: data[0]["uom"], nw_unit: data[0]["uom"] });
            this.status = true;

            this.DropDownListService.getGetDocuments(data[0]["unadviceid"]).subscribe(docData => {

              this.addDocument()
              while (this.weighment_doc.length)
                this.weighment_doc.removeAt(0);
              this.weighment_doc_list.removeAt(0);
              this.addDocument()
              for (let data1 of docData)
                this.addDocumentlist();
              this.weighment_doc_list.patchValue(docData);
              this.status = true;
            });
            let k = 0;

            this.add();
            this.party_sl_no = 0;
            while (this.wm_unload_wgmnt_dtls.length)
              this.wm_unload_wgmnt_dtls.removeAt(0);

            for (let data1 of data) {
              this.add();
              if (orderType == 'Sales Return') {
                this.adviceId[k] = data1.unadviceid;
                this.wm_unload_wgmnt_dtls.at(k).patchValue({
                  customer: data1.customer, advice_no: data1.unadviceno,
                  wgment_date: data1.ula_date, advice: data1.unadviceid
                });
              }
              else if (orderType == 'Stock Transfer') {
                this.adviceId[k] = data1.unadviceid;
                this.wm_unload_wgmnt_dtls.at(k).patchValue({
                  business_unit: data1.business_unit, advice_no: data1.unadviceno,
                  wgment_date: data1.ula_date, advice: data1.unadviceid
                });
              }
              if (orderType == 'Purchase Order') {
                this.adviceId[k] = data1.unadviceid;
                this.wm_unload_wgmnt_dtls.at(k).patchValue({
                  supplier: data1.busi_partner, advice_no: data1.unadviceno,
                  wgment_date: data1.ula_date, advice: data1.unadviceid
                });
              }
              k = k + 1;
            }

            if (orderType == 'Purchase Order') {
              // this.DropDownListService.getWeighmentcharges(this.wm_unload_wgmnt_dtls.at(0).get("advice").value).subscribe(data1=>
              this.DropDownListService.getUnloadDetailsFastApi(this.wm_unload_wgmnt_dtls.at(0).get("advice").value).subscribe(data1 => {
                if (data1.we_chg_app == true) {
                  this.userForm.patchValue({ wgment_charge: '1' })
                }
                if (data1.we_chg_app == false) {
                  this.userForm.patchValue({ wgment_charge: '0' })
                }

              });
            }



            if (data[0].we_chg_app == true) {
              this.status = false;
              alert(this.vechileTypeCode);
              this.DropDownListService.getWeighmentChargeThruVtype(this.vechileTypeCode).subscribe(wgChgData => {
                this.status = true;
                this.userForm.patchValue({ wgment_charge: '1', wgment_rs: wgChgData["amount"] })
              });
            }
            else { this.userForm.patchValue({ wgment_charge: '0', wgment_rs: 0 }) }

            if (data[0].weighment_status == 0) {
              this.userForm.patchValue({ weight1: 'weight1', weight2: '' })
              this._weight2 = "0";
              if (orderType == 'Purchase Order') {
                this.getWeighmentNonew(this._weighmentFor, this.currentDate, this._weight2, data[0]["unadviceid"]);
              }
              else {
                this.getWeighmentNo(this._weighmentFor, this.currentDate, this._weight2);
              }

            }
            else {

              this.DropDownListService.getUnloadWeightmentWt(data[0].weighment_id).subscribe(weigmtData => {
                let tare_time = new Date().toString().substr(16, 5);
                //let tare_date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
                let tare_date = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');

                this.userForm.patchValue({
                  gross_weight: weigmtData["gross_weight"], gw_unit: weigmtData["gw_unit"],
                  gw_date: weigmtData["gw_date"], ref_doc_no: weigmtData["ref_doc_no"], gw_time: weigmtData["gw_time"], gw_remarks: weigmtData["gw_remarks"],
                  nw_unit: weigmtData["nw_unit"], net_weight: weigmtData["net_weight"], tare_weight: weigmtData["tare_weight"], tw_unit: weigmtData["tw_unit"],

                  tw_date: tare_date, tw_remarks: weigmtData["tw_remarks"], ref_doc_date: weigmtData["ref_doc_date"], tw_time: tare_time,
                  digital_weight_backup: weigmtData["digital_weight"]
                });

                this.userForm.patchValue({ weight2: 'weight2', weight1: 'weight1' })
                this._weight2 = 'weight2';

                if (orderType == 'Purchase Order') {
                  //this.getWeighmentNonew(this._weighmentFor, this.currentDate, this._weight2,data[0]["unadviceid"]);  
                  this.getWeighmentNonew(this._weighmentFor, weigmtData["wgment_date"], this._weight2, data[0]["unadviceid"]);
                }
                else {
                  this.getWeighmentNo(this._weighmentFor, weigmtData["wgment_date"], this._weight2);
                }

                //this.getWeighmentNo(this._weighmentFor, weigmtData["wgment_date"], this._weight2);   


                this.status = true;
                this._gross_weight = weigmtData["gross_weight"];
                this._tare_weight = parseFloat(weigmtData["tare_weight"]);
                this.digitalweight1 = weigmtData["digital_weight"];
              })

            }

          });
          timer(2000).subscribe
            (x => {
              this.onChangeWeightment();
            })
        }

        if (this.weighmentFor == 'Sale' || this.weighmentFor == 'Stock Transfer Loading' || this.weighmentFor == 'Purchase Return') {

          let orderType = 'Sale';
          if (this.weighmentFor == 'Stock Transfer Loading')
            orderType = 'Stock Transfer';
          if (this.weighmentFor == 'Purchase Return')
            orderType = 'Purchase Return';

          this.status = false;
          this.userForm.patchValue({ wgment_charge: '0', wgment_rs: 0 });
          //  console.log("vechile no: "+vechile_no+",  orderType: "+orderType);


          //here need to change dublicate loading 


          //this.DropDownListService.getLoadngAdviceThruVehicle(vechile_no, orderType).subscribe(data=>
          this.DropDownListService.getLoadngAdviceThruVehiclefast(vechile_no, orderType).subscribe(data => {

            console.log("weighment For: "+this.weighmentFor+" :salesUom- "+JSON.stringify(data));
            this.userForm.patchValue({ gw_unit: data[0]["staticuom"], tw_unit: data[0]["staticuom"], nw_unit: data[0]["staticuom"] });//need to be done later
            //this.userForm.patchValue({gw_unit:'CUM00003',tw_unit:'CUM00003'});

            this.DropDownListService.checkLooseItem(this.reference_id).subscribe(looseitem => {
              console.log(" looseitem here Vehicle W1 " + looseitem.status)
              if (looseitem.status == 'YES') {
                this.bulksupplyshow = true;
              }
              else {
                this.bulksupplyshow = false;
              }
            });


            this.status = true;
            let k = 0;

            this.add();
            this.party_sl_no = 0;
            while (this.wm_unload_wgmnt_dtls.length)
              this.wm_unload_wgmnt_dtls.removeAt(0);

            for (let data1 of data) {
              this.add();
              if (orderType == 'Sale') {
                this.adviceId[k] = data1.advice_id;
                //.log("Sales order: "+JSON.stringify(data));
                this.wm_unload_wgmnt_dtls.at(k).patchValue({
                  customer: data1.bus_partner, advice_no: data1.advice_no,
                  wgment_date: data1.advice_date, advice: data1.advice_id
                });
                this.userForm.get("gross_weight").reset();
                this.userForm.get("net_weight").reset();
              }
              else if (orderType == 'Stock Transfer') {
                this.adviceId[k] = data1.advice_id;
                this.wm_unload_wgmnt_dtls.at(k).patchValue({
                  business_unit: data1.b_unit, advice_no: data1.advice_no,
                  wgment_date: data1.advice_date, advice: data1.advice_id
                });
              }
              if (orderType == 'Purchase Return') {
                this.adviceId[k] = data1.advice_id;
                // console.log("Purchase Return: "+JSON.stringify(data));
                this.wm_unload_wgmnt_dtls.at(k).patchValue({
                  supplier: data1.supplier, advice_no: data1.advice_no,
                  wgment_date: data1.advice_date, advice: data1.advice_id
                });
              }
              k = k + 1;
            }

            if (data[0].weighment_status == false) {
              this._weight2 = "0";

              if (orderType == 'Sale') {
                this.getWeighmentNonewloading(this._weighmentFor, this.currentDate, this._weight2, data[0]["advice_id"]);
              }
              else {
                this.getWeighmentNo(this._weighmentFor, this.currentDate, this._weight2);
              }


              this.userForm.patchValue({ weight1: 'weight1', weight2: '' });
            }
            else {
              //tuhin change on 04-05-2023 bcz 2nd weight date changes to current date 
              /*this.userForm.patchValue({weight2: 'weight2', weight1: 'weight1'})
              this._weight2 = 'weight2';
              this.getWeighmentNo(this._weighmentFor, this.currentDate, this._weight2);
              */
              this.status = false;
              this.DropDownListService.getUnloadWeightmentWt(data[0].weighment_id).subscribe(weigmtData => {
                let gross_time = new Date().toString().substr(16, 5);
                //let gross_date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
                let gross_date = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
                //  console.log("when weight 2 is true: "+JSON.stringify(weigmtData))
                this.userForm.patchValue({
                  gross_weight: weigmtData["gross_weight"], gw_unit: weigmtData["gw_unit"],
                  ref_doc_no: weigmtData["ref_doc_no"], gw_date: gross_date, gw_time: gross_time, gw_remarks: weigmtData["gw_remarks"],
                  nw_unit: weigmtData["nw_unit"], net_weight: weigmtData["net_weight"], tare_weight: weigmtData["tare_weight"],
                  tw_unit: weigmtData["tw_unit"], tw_date: weigmtData["tw_date"], tw_time: weigmtData["tw_time"], tw_remarks: weigmtData["tw_remarks"], ref_doc_date: weigmtData["ref_doc_date"],
                  digital_weight_backup: weigmtData["digital_weight"], tare_weight_bulker: weigmtData["tare_weight_bulker"], net_weight_bulker: weigmtData["net_weight_bulker"]
                });

                this.userForm.patchValue({ weight2: 'weight2', weight1: 'weight1' })
                this._weight2 = 'weight2';

                if (orderType == 'Sale') {
                  // this.getWeighmentNonew(this._weighmentFor, weigmtData["wgment_date"], this._weight2,data[0]["unadviceid"]);        
                  this.getWeighmentNonewloading(this._weighmentFor, weigmtData["wgment_date"], this._weight2, data[0]["advice_id"])
                }
                else {
                  this.getWeighmentNo(this._weighmentFor, weigmtData["wgment_date"], this._weight2)
                }

                this.DropDownListService.checkLooseItem(this.reference_id).subscribe(looseitem => {
                  console.log(" looseitem here Vehicle " + looseitem.status)
                  if (looseitem.status == 'YES') {
                    this.bulksupplyshow = true;
                  }
                  else {
                    this.bulksupplyshow = false;
                  }
                });


                this.status = true;
              })
            }
          });

          timer(2000).subscribe
            (x => {
              this.onChangeWeightment();
            })
        }
      }
      );

      //ends here
    }
    this.connectSerial();
    this.currentTime1 = new Date().toString().substr(16, 5);



  }

  isChecked2: boolean = false;
  isChecked1: boolean = false;
  isChecked3: boolean = false;
  GrossWeight: any;
  TareWeight: any;
  onChangeWeightment() {

    this.WeightMentFor = this.userForm.get("wgment_for").value;
    this.Weight1 = this.userForm.get("weight1").value;
    this.Weight2 = this.userForm.get("weight2").value;

    //alert("WeightMentFor : "+this.WeightMentFor)
    // alert("Weight1 : "+this.Weight1)
    // alert("Weight2 : "+this.Weight2)
    if (this.WeightMentFor == "Sale" || this.WeightMentFor == "Stock Transfer Loading" || this.WeightMentFor == "Purchase Return") {
      if (this.Weight1 == "weight1") {
        this.isChecked2 = true;       //Gross Weight
        this.isChecked1 = false;       //Tare Weight
        this.isChecked3 = true;       // no bags
      }
      if (this.Weight2 == "weight2") {
        this.isChecked2 = false;
        this.isChecked1 = true;
        this.isChecked3 = false
      }
    }

    //  if(this.WeightMentFor=="Sales Return" || this.WeightMentFor=="Purchase Order" || this.WeightMentFor=="Stock Transfer Unloading")
    //  {
    else {
      if (this.Weight1 == "weight1") {
        this.isChecked2 = false;
        this.isChecked1 = true;
        this.isChecked3 = true;
      }
      if (this.Weight2 == "weight2") {
        this.isChecked2 = true;
        this.isChecked1 = false;
        this.isChecked3 = false;
      }
    }
    // }
  }

  itemListPopUp(index, te) {
    console.log(index+" / " + te.at(index).get("advice").value)

    if (this.adviceId[index] != null || this.adviceId[index] != undefined && this.adviceId[index] != '') {
      console.log(" Wgt For:: " + this.weighmentFor)
      if (this.weighmentFor == 'Purchase Order' || this.weighmentFor == 'Stock Transfer Unloading' || this.weighmentFor == 'Sales Return') {
        let dialogref = this.dialog.open(UnloadAdviceItemListPopUpComponent, { data: { advice_id: te.at(index).get("advice").value } });
        dialogref.afterClosed().subscribe(result => { });
      }
      if (this.weighmentFor == 'Sale' || this.weighmentFor == 'Stock Transfer Loading' || this.weighmentFor == 'Purchase Return') {
        let dialogref = this.dialog.open(LoadingAdviceItemListPopUpComponent, { data: { advice_id: te.at(index).get("advice").value } });
        dialogref.afterClosed().subscribe(result => { });
      }
    } else { alert("Select Vehicle No. First !") }
  }

  send() {
    this.userForm.patchValue({
      company_id: localStorage.getItem("company_name"), fin_year: localStorage.getItem("financial_year"),
      username: localStorage.getItem("username")
    });
    this.submitted = true;
    this.status = false;
    if (this.userForm.get("vehicle_id").value == 0 || this.userForm.get("vehicle_id").value == null || this.userForm.get("vehicle_id").value == '') {
      alert("Please Select Vehicle No");
      this.status = true;

    }
    else if (this.userForm.get("gw_unit").value == 0 || this.userForm.get("gw_unit").value == '' || this.userForm.get("gw_unit").value == null) {
      alert("Please Select Gross Uom");
      this.status = true;

    }
    else {


      if (this.userForm.get("wgment_for").value == "Purchase Order" || this.userForm.get("wgment_for").value == "Sales Return" || this.userForm.get("wgment_for").value == "Stock Transfer Unloading") {
        if (this._weight2 == "0" || (this._weight2 == 'weight2' && this._gross_weight >= this._tare_weight)) {

          if (this.userForm.get("weight1").value == "weight1" && (this.userForm.get("weight2").value == "0" || this.userForm.get("weight2").value == null || this.userForm.get("weight2").value == '')) {

            this.tarestatus = true;
            this.bagscheck_2nd = true;
            this.outernostatus = true;
            this.outernetstatus =true;

            this.userForm.patchValue({ digital_weight1: '0.000' });
            if (this.userForm.get("gross_weight").value == 0 || this.userForm.get("gross_weight").value == '' || this.userForm.get("gross_weight").value == null) {
              //   console.log("if 3"); //purchase firs time gross wt
              alert("Please Select Gross Weight");
              this.status = true;
              this.grossstauts = false;
            }
            else {
              this.grossstauts = true;
            }

          }
          if (this.userForm.get("weight1").value == "weight1" && this.userForm.get("weight2").value == "weight2") {
            // console.log("else if 4");//purchase 2nd time tare weight
            this.userForm.patchValue({ digital_weight1: this.userForm.get("digital_weight").value });
            //   console.log("else if 1" + this.digitalweight1 + " / "+ this.userForm.get("digital_weight").value);
            this.userForm.patchValue({ digital_weight: this.digitalweight1 });


            if (this.userForm.get("tare_weight").value == 0 || this.userForm.get("tare_weight").value == '' || this.userForm.get("tare_weight").value == null) {
              //  console.log("else if 5");//no tare weight in purchase
              alert("Please Select Tare Weight");
              this.userForm.patchValue({ digital_weight: 0 });
              this.status = true;
              this.tarestatus = false;
            }
            else {
              this.tarestatus = true;
            }
            if ((this.userForm.get("tarebags").value == 0 || this.userForm.get("tarebags").value == null) && this.userForm.get("tare_weight").value != 0) {

              alert("Please Enter Bags Quantity!!!!");
              this.status = true;
              this.userForm.patchValue({ digital_weight: this.userForm.get("digital_weight1").value });
              this.bagscheck_2nd = false;
            } else {
              this.bagscheck_2nd = true;
            }
           
            if (this.userForm.get("outside_weighment").value === 'Yes' && (this.userForm.get("outside_weighmentno").value == 0 || this.userForm.get("outside_weighmentno").value == 'NA' || this.userForm.get("outside_weighmentno").value == '' || this.userForm.get("outside_weighmentno").value == null)) {
              alert("Please Enter Outside Weighment No.");
              this.status = true;
              this.outernostatus = false;
            } else {
              this.outernostatus = true;
            }

            if (this.userForm.get("outside_weighment").value === 'Yes' && (this.userForm.get("outside_netwt").value == 0 || this.userForm.get("outside_netwt").value == '' || this.userForm.get("outside_netwt").value == null)) {
              alert("Please Enter Outside Weighment Net Weight.");
              this.status = true;
              this.outernetstatus = false;
            } else {
              this.outernetstatus = true;
            }

          }

          if (this.tarestatus == true && this.grossstauts == true && this.bagscheck_2nd == true && this.outernostatus ==true && this.outernetstatus == true) {

            if (this.userForm.get("weight2").value == "weight2") {
              this.userForm.patchValue({ digital_weight: this.userForm.get("digital_weight_backup").value });
            }

            const InputData = this.userForm.getRawValue();

            const frmData = new FormData();

            for (let i = 0; i < this.myFiles.length; i++) {

              frmData.append("files", this.myFiles[i]);

              if (i == 0) {

              }
            }
            frmData.append("Input", JSON.stringify(InputData));




            //file ends here

            this.status = false;
            this.Service.createUnloadWeightment(frmData).subscribe(data =>

            //this.Service.createUnloadWeightment(this.userForm.getRawValue()).subscribe( data => 
            {

              alert("New Unload Weightment created successfully.");
              this.status = true;
              this.userForm.reset();

              //Refresh Dynemic table
              this.party_sl_no = 0;
              while (this.wm_unload_wgmnt_dtls.length)
                this.wm_unload_wgmnt_dtls.removeAt(0);
              this.add();
              this.fetchstatus = false;
              this.getstatus = true;
              window.location.reload();
            }, (error) => {
              this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
              this.ngOnInit()
            });
            this.status = true;
          }

        }
        else {
          alert("Gross Wt must be greater than Tare Wt!")
          this.status = true;
        }
      }

      //sales wt start here
      if (this.userForm.get("wgment_for").value == "Sale" || this.userForm.get("wgment_for").value == "Stock Transfer Loading" || this.userForm.get("wgment_for").value == "Purchase Return") {
        if (this._weight2 == "0" || (this._weight2 == 'weight2' && this._gross_weight >= this._tare_weight)) {
          //  console.log(" if1 ");//first time sales tare weight
          //  console.log(this.userForm.get("weight1").value+"//"+this.userForm.get("weight2").value) 
          if (this.userForm.get("weight1").value == "weight1" && (this.userForm.get("weight2").value == "0" || this.userForm.get("weight2").value == null || this.userForm.get("weight2").value == '')) {
            //   console.log("if 2");//first time weighment
            this.grossstauts = true;
            this.bagscheck_2nd = true;
            this.outernostatus ==true;
            this.outernetstatus == true;

            this.userForm.patchValue({ digital_weight1: '0.000' });
            //   console.log("tare wt::"+this.userForm.get("tare_weight").value) 
            if (this.userForm.get("tare_weight").value == 0 || this.userForm.get("tare_weight").value == '' || this.userForm.get("tare_weight").value == null) {
              //     console.log("if 3"); //sales firs time tare wt
              alert("Please Select Tare Weight");
              this.status = true;
              this.tarestatus = false;
            }
            else {
              this.tarestatus = true;
            }
            if (this.tarestatus == true && this.grossstauts == true && this.bagscheck_2nd == true  && this.outernostatus ==true && this.outernetstatus == true) {
              this.status = true;


              if (this.userForm.get("weight2").value == "weight2") {
                this.userForm.patchValue({ digital_weight: this.userForm.get("digital_weight_backup").value });
              }
              const InputData = this.userForm.getRawValue();

              const frmData = new FormData();

              for (let i = 0; i < this.myFiles.length; i++) {

                frmData.append("files", this.myFiles[i]);

                if (i == 0) {

                }
              }
              frmData.append("Input", JSON.stringify(InputData));



              this.Service.createUnloadWeightment(frmData).subscribe(data => {

                alert("New Loading Weightment created successfully.");
                this.userForm.reset();
                this.ngOnInit();

                this.party_sl_no = 0;
                while (this.wm_unload_wgmnt_dtls.length)
                  this.wm_unload_wgmnt_dtls.removeAt(0);
                this.add();
                this.fetchstatus = false;
                this.getstatus = true;
                window.location.reload();
              }, (error) => {
                this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
                this.ngOnInit()
              });

            }

          }
          if (this.userForm.get("weight1").value == "weight1" && this.userForm.get("weight2").value == "weight2") {
            //console.log("else if 4");//sales 2nd time gross weight

            this.userForm.patchValue({ digital_weight1: this.userForm.get("digital_weight").value });
            this.userForm.patchValue({ digital_weight: this.digitalweight1 });

            if (this.userForm.get("gross_weight").value == 0 || this.userForm.get("gross_weight").value == '' || this.userForm.get("gross_weight").value == null) {
              //console.log("else if 5");//no gross weight in sales
              alert("Please Select Gross Weight");
              this.userForm.patchValue({ digital_weight: 0 });
              this.status = true;
              this.grossstauts = false;
            }
            else {
              this.grossstauts = true;
            }
            if ((this.userForm.get("tarebags").value == 0 || this.userForm.get("tarebags").value==null) && this.userForm.get("gross_weight").value != 0) {
              //   console.log("if 6");
              alert("Please Enter Bags Quantity!!!!");
              this.status = true;
              this.userForm.patchValue({ digital_weight: this.userForm.get("digital_weight1").value });
              this.bagscheck_2nd = false;
            } else {
              this.bagscheck_2nd = true;
            }

            if (this.userForm.get("outside_weighment").value === 'Yes' && (this.userForm.get("outside_weighmentno").value == 0 || this.userForm.get("outside_weighmentno").value == 'NA' || this.userForm.get("outside_weighmentno").value == '' || this.userForm.get("outside_weighmentno").value == null)) {
              alert("Please Enter Outside Weighment No.");
              this.status = true;
              this.outernostatus = false;
            } else {
              this.outernostatus = true;
            }

            if (this.userForm.get("outside_weighment").value === 'Yes' && (this.userForm.get("outside_netwt").value == 0 || this.userForm.get("outside_netwt").value == '' || this.userForm.get("outside_netwt").value == null)) {
              alert("Please Enter Outside Weighment Net Weight.");
              this.status = true;
              this.outernetstatus = false;
            } else {
              this.outernetstatus = true;
            }
            /* let convertionfactor:any;
             let uom=this.userForm.get("gw_unit").value 

             this.customList.forEach(element=>
             {
               if(uom == element.customuom_id)
                 {
                   convertionfactor=element.uom_conv_fac;
                 }
             });*/


            if (this.tarestatus == true && this.grossstauts == true && this.bagscheck_2nd == true  && this.outernostatus ==true && this.outernetstatus == true) {
              this.status = true;

              // console.log("last" + this.remarkscheck +" / "+ this.userForm.get("remarks").value );
              /*  if( this.remarkscheck == true && (this.userForm.get("remarks").value == 0 || this.userForm.get("remarks").value == '' || this.userForm.get("remarks").value == null))
                {
                  alert("Please Enter Remarks For Extending Gross Weight With Respect (Tare+Loading Item Weight)..");
                  this.status=true;
                  
                  this.userForm.patchValue({digital_weight:this.userForm.get("digital_weight1").value});
                }
                else
                {*/
              // console.log("save section");

              if (this.userForm.get("weight2").value == "weight2") {
                this.userForm.patchValue({ digital_weight: this.userForm.get("digital_weight_backup").value });
              }
              const InputData = this.userForm.getRawValue();

              const frmData = new FormData();

              for (let i = 0; i < this.myFiles.length; i++) {

                frmData.append("files", this.myFiles[i]);

                if (i == 0) {

                }
              }
              frmData.append("Input", JSON.stringify(InputData));

              this.Service.createUnloadWeightment(frmData).subscribe(data => {

                alert("New Loading Weightment created successfully.");
                this.userForm.reset();
                this.ngOnInit();

                this.party_sl_no = 0;
                while (this.wm_unload_wgmnt_dtls.length)
                  this.wm_unload_wgmnt_dtls.removeAt(0);
                this.add();
                this.fetchstatus = false;
                this.getstatus = true;
                window.location.reload();
              }, (error) => {
                this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
                this.ngOnInit()
              });

              // }

            }


          }


        }
        else {
          alert("Gross Wt must be greater than Tare Wt!")
          this.status = true;
        }
      }

    }
    //}
  }

  toleranceCheckAndSend() {
    this.advice1 = "";
    // let advice=this.wm_unload_wgmnt_dtls.at(0).get("advice").value;
    // console.log("reference_id::"+advice)
    let totalitem = 0;

    if (this.userForm.get("wgment_for").value == "Sale") {

      if (this.userForm.get("weight1").value == "weight1" && this.userForm.get("weight2").value == "weight2") {
        this.DropDownListService.checkLooseItem(this.reference_id).subscribe(looseitem => {
          console.log(" looseitem here  " + looseitem.status)
          if (looseitem.status == 'YES') {

            this.bulksupplyshow = true;
            //let net=Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(this.userForm.get("tare_weight").value)).toFixed(3)
            
            //let net = Math.abs(Number(this.userForm.get("gross_weight").value) - Number(this.userForm.get("tare_weight_bulker").value)).toFixed(3)
            let net = Math.abs(Number(this.userForm.get("gross_weight").value) - Number(this.userForm.get("tare_weight").value)).toFixed(3)
            if (Number(net) <= 295.00) {
              if (confirm("Net Weight Less Than 295 Qtls,if you want to proceed press 'OK' else 'Cancel'.......")) {
                this.loading_weight_tolerance = true;
                this.remarkscheck = true;
                this.status = true;
                //console.log("remarks chk: "+this.remarkscheck)
                if (this.remarkscheck == true && (this.userForm.get("remarks").value == 0 || this.userForm.get("remarks").value == '' || this.userForm.get("remarks").value == null)) {
                  alert("Please Enter Remarks For Net Weight Less Than 295 Qtls..");
                  this.status = true;
                }
                else {
                  // console.log("Testing Successful 1");
                  this.send();
                }
              }
              else {
                this.loading_weight_tolerance = false;
                this.remarkscheck = false;
                this.weighmentsave = false;

              }
            }
            else {
              // console.log("Testing Successful 1");
              this.bulksupplyshow = false;
              this.send();
            }
          }
          else {
            this.bulksupplyshow = false;
            
            for (let v = 0; v < this.wm_unload_wgmnt_dtls.length; v++) {
              this.advice1 += this.wm_unload_wgmnt_dtls.at(v).get("advice").value + ",";
              // console.log(" CHECK Advice : : "+this.advice1)
            }
            this.advice1 = this.advice1.substring(0, this.advice1.length - 1);
            //console.log(" CHECK : : "+this.advice1)
            this.DropDownListService.getLoadItemTotalWt(this.advice1).subscribe(itemwt => {
              //console.log("//"+itemwt.totalitemwt+"/////////"+JSON.stringify(itemwt))
              this.item_wt = itemwt.totalitemwt;

              //console.log("total item weight::"+this.item_wt)

              // this.DropDownListService.getLoadItemTotalWt(advice).subscribe(itemwt=>
              //   {
              //     console.log(this.reference_id+"//"+itemwt.totalitemwt+"/////////"+JSON.stringify(itemwt))
              //     this.item_wt = itemwt.totalitemwt;
              //this.weight_unit=itemwt.weightunit;

              let convertionfactor: any;
              let uom = this.userForm.get("gw_unit").value

              this.customList.forEach(element => {
                if (uom == element.customuom_id) {
                  convertionfactor = element.uom_conv_fac;
                }
              });

              let mintolerence: number = (Number(this.userForm.get("tare_weight").value) + Number(this.item_wt)) - (0.3);
              let maxtolerence: number = (Number(this.userForm.get("tare_weight").value) + Number(this.item_wt)) + (0.3);

              let minstatus: boolean = true;
              let maxstatus: boolean = true;
              console.log(this.item_wt + "////" + Number(this.userForm.get("gross_weight").value) + "::mintolerence::" + mintolerence * 100 * convertionfactor + "::maxtolerence::" + maxtolerence * 100 * convertionfactor)
              if (uom == 'CUM00002') //for qtls
              {
                minstatus = Number(this.userForm.get("gross_weight").value) > Number(mintolerence * 100 * convertionfactor);
                maxstatus = Number(this.userForm.get("gross_weight").value) < Number(maxtolerence * 100 * convertionfactor);
                // console.log("qtls:"+mintolerence+"///"+maxtolerence+"//"+convertionfactor) 
              }
              else if (uom == 'CUM00011')//for matricton
              {
                minstatus = Number(this.userForm.get("gross_weight").value) > Number(mintolerence * 1000 * convertionfactor);
                maxstatus = Number(this.userForm.get("gross_weight").value) < Number(maxtolerence * 1000 * convertionfactor);
                // console.log("matricton:"+mintolerence+"///"+maxtolerence+"//"+convertionfactor) 
              }
              else //for kgs
              {
                minstatus = Number(this.userForm.get("gross_weight").value) > Number(mintolerence * convertionfactor);//24.60  and real 24.90 true
                maxstatus = Number(this.userForm.get("gross_weight").value) < Number(maxtolerence * convertionfactor); //25.20 real 24.90  true
                // console.log("kgs:"+mintolerence+"///"+maxtolerence+"//"+convertionfactor) 
              }

              //console.log( "CHECK :: " +minstatus+"//"+maxstatus)

              if (minstatus == true && maxstatus == true) {
                this.loading_weight_tolerance = false;
                this.remarkscheck = false;
              }
              else {
                this.loading_weight_tolerance = true;
                this.remarkscheck = true;
                //alert("Please Enter Remarks for Extending Gross Weight With respect to Tare+Loading Item Weight");
                this.status = true;
              }
              //console.log("remarks chk: "+this.remarkscheck)
              if (this.remarkscheck == true && (this.userForm.get("remarks").value == 0 || this.userForm.get("remarks").value == '' || this.userForm.get("remarks").value == null)) {
                alert("Please Enter Remarks For Extending Gross Weight With Respect (Tare+Loading Item Weight)..");

                this.status = true;
                this.userForm.patchValue({ digital_weight: this.userForm.get("digital_weight1").value });
              }
              /* else if (this.userForm.get("tarebags").value == 0 && this.userForm.get("tare_weight").value != 0) {

                alert("Please Enter Bags Quantity!!!!");
                this.status = true;
                this.userForm.patchValue({ digital_weight: this.userForm.get("digital_weight1").value });
              } */
              else {
                // console.log("Testing Successful 1");
                this.send();
              }
            });

          }


        });


      }
      else {
        // console.log("Testing Successful 2");
        this.send();
      }
    }
    else {
      // console.log("Testing Successful 3");
      this.send();
    }
  }

  onUpdate(id, wgmentid, action) {
    this.weighmentsave = true;
    this.status = false;
    this.isHidden = true;
    this.action = 'view';
    forkJoin(
      this.DropDownListService.vehicleCodeList(),
      this.DropDownListService.unloadWeightmentRetrive(id),
      this.DropDownListService.unloadWMDtlsRetriveList(wgmentid),
      //this.DropDownListService.getWeighmentCustomUOM(),
      this.DropDownListService.getCustomUOMs("WUOM"),
      this.DropDownListService.getCompanyBUMNCList(this.company_name),
      //this.DropDownListService.supplierNamesList(this.company_name),
      //this.Service.getCustomerBussinessPartner()
      this.DropDownListService.supplierNamesNewList(this.company_name),
      this.DropDownListService.newcustomerList(this.company_name)

    ).subscribe(([vehicleData, wgmntData, wgmntDtls, customUomData, bunitData, supplierData, customerData]) => {
      this._weighmentFor = wgmntData["wgment_for"];
      this.weighmentFor = wgmntData["wgment_for"];
      this.customList = customUomData;
      this.businesslists = bunitData;
      console.log("hello here " +wgmntData["wgment_for"])
      console.log("weighmentFor M " +this._weighmentFor)
      console.log("WeighmentFor POPup " +this.weighmentFor)

      if(wgmntData.outside_weighment==='Yes')
        {
          this.outsideShow=true;
        }
        else{
          this.outsideShow=false;
          this.userForm.patchValue({outside_weighmentno:'NA',outside_netwt:0.00,outer_date:''})
        }
      //console.log("hello here " +JSON.stringify(customerData))
      if (wgmntData.remarks == '' || wgmntData.remarks == null || wgmntData.remarks == 0) { this.loading_weight_tolerance = false; }
      else { this.loading_weight_tolerance = true; }
      this.DropDownListService.getGetDocuments(wgmntDtls[0].advice).subscribe(docData => {
        //      console.log("docdata: "+JSON.stringify(docData))     
        this.addDocument()
        while (this.weighment_doc.length)
          this.weighment_doc.removeAt(0);
        this.weighment_doc_list.removeAt(0);
        this.addDocument()
        for (let data1 of docData)
          this.addDocumentlist();
        this.weighment_doc_list.patchValue(docData);
        this.status = true;
      });
      // this.onChangeVechileNo = wgmntData['wgment_for'];
      // this.onChangeWeighmentFor(wgmntData['wgment_for'])
      this.userForm.patchValue(wgmntData);
      if (wgmntData['wgment_charge'] == 0)
        this.userForm.patchValue({ wgment_charge: "0" });
      else if (wgmntData['wgment_charge'] == 1)
        this.userForm.patchValue({ wgment_charge: "1" });

      let i = 0;
      this.add();
      this.party_sl_no = 0;
      while (this.wm_unload_wgmnt_dtls.length)
        this.wm_unload_wgmnt_dtls.removeAt(0);


      this.supplierNames = supplierData;
      this.customerNameList = customerData;
      this.vehicleTypeList = vehicleData;

      for (let data1 of wgmntDtls) {
        this.add();
        this.adviceId[i] = data1['advice'];
        //  console.log("hello here " +data1['customer'] + this._weighmentFor)
        this.wm_unload_wgmnt_dtls.at(i).patchValue({
          customer: data1['customer'], supplier: data1['supplier'],
          business_unit: data1['business_unit'], advice_no: data1['advice_no'], wgment_date: data1['wgment_date'], advice: data1['advice']
        });
        i = i + 1;
      }
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });
  }

  //new measurement starts
  async connectSerial() {

    //  console.log('serial' in navigator);
    if ('serial' in navigator) {
      this.fetchstatus = false;
      this.getstatus = true;
      // console.log("reference_name// "+this.reference_name+" //ref_type_name// "+this.ref_type_name+" //_weighmentFor "+this._weighmentFor+" //weighmentFor "+this.weighmentFor+" //wgment_for "+this.userForm.get("wgment_for").value);
      if (this.port) {
        // alert("this.port" + this.port);
        //this.term.write('\x1b[31mDisconnected from Serial Port\x1b[m\r\n');
        this.port.close();
        this.port = undefined;
        await this.port.close();

        //connectButton.innerText = 'Connect';

        //document.getElementById('SerialSpeed').disabled = false;

      }
      else {
        //alert('Avi')
        //connectButton.innerText = 'Disconnect';

        this.getReader();
        // (<HTMLInputElement> document.getElementById("connectport")).disabled = true;//tuhin changes 29-08-2022

        //document.getElementById("connectport").disabled = true;
        //alert("Connection Sucessfull");
      }
    }
    else {
      //alert("Avi");
      const error = document.createElement('p');
      error.innerHTML = '<p>Support for Serial Web API not enabled. Please enable it using chrome://flags/ and enable Experimental Web Platform fetures</p>';

    }

  }

  lineBuffer = '';
  latestValue = 0;

  async serialWrite(data: any) {
    //alert("Connection Made sucessfully");

    this.encoder = new TextEncoder();
    const dataArrayBuffer = this.encoder.encode(data);

    if (this.port && this.port.writable) {
      const writer = this.port.writable.getWriter();
      writer.write(dataArrayBuffer);
      //alert(dataArrayBuffer);
      writer.releaseLock();

      //  (<HTMLInputElement> document.getElementById("getport")).disabled = false;//tuhin changes 29-08-2022
      // (<HTMLInputElement> document.getElementById("fetchport")).disabled = true;//tuhin changes 29-08-2022
      //getport
      this.fetchstatus = true;
      this.getstatus = false;
    }

  }
  async getReader() {
    //alert("avi");
    this.port = await navigator.serial.requestPort({});
    //var e = document.getElementById("SerialSpeed");
    //var strSpd =1200;// e.options[e.selectedIndex].value;
    // alert(strSpd);
    if(this.bridge_location==='Weight Bridge 1')
    {
      console.log("Weight Bridge1/1200/7/EVEN::",this.bridge_location);
      var speed = 1200;//for aayogagro
      // var speed = 2400;
      //svar speed=1200;
      await this.port.open({ baudRate: [speed], dataBits: 7, stopBits: 1, parity: 'even' });//for aaagyog
    }
    if(this.bridge_location==='Weight Bridge 2')
      {
        console.log("Weight Bridge2/2400/7/NONE::",this.bridge_location);
        //var speed = 1200;//for aayogagro
         var speed = 2400;
        //svar speed=1200;
        //await this.port.open({ baudRate: [speed], dataBits: 7, stopBits: 1, parity: 'even' });//for aaagyog
        await this.port.open({ baudRate: [speed],dataBits: 8,stopBits: 1,parity: 'none'});
      }
    // await this.port.open({ baudRate: [speed],dataBits: 8,stopBits: 1,parity: 'none'});

    //document.getElementById('SerialSpeed').disabled = true;

    //connectButton.innerText = 'Disconnect';
    //this.term.write('\x1b[31mConnected using Web Serial API !\x1b[m\r\n');
    val = 0;
    const appendStream = new WritableStream({

      write(chunk) {
        //this.term.write(chunk);
        //const a=chunk;
        //avijit(chunk);
        val = val + chunk;
        //   console.log(val);
        //alert(val);           
      }

    });

    //var TextDecoderStream:any;
    this.port.readable.pipeThrough(new TextDecoderStream()).pipeTo(appendStream);


    //this.term.on('data', function(this: any,data: any) {
    this.serialWrite('data');


    //console.log("data",data);

    //});

    // (<HTMLInputElement> document.getElementById("fetchport")).disabled = false;//tuhin changes 29-08-2022
    // (<HTMLInputElement> document.getElementById("connectport")).disabled = true;//tuhin changes 29-08-2022
    //(<HTMLInputElement> document.getElementById("getport")).disabled = true;//tuhin changes 29-08-2022
    this.fetchstatus = false;
    this.getstatus = true;
    //


  }


  async getvalue() {
    //alert("Fetch value sucessfully");
    //var abc="hello";
    //alert("val  : " +  parseInt(val.substring(2,10)));
    //alert( 'Value Fetched'+parseInt(val.substring(2,10)));
    let tare_wt = val.substring(2, 10);
    this.userForm.patchValue({ port_value: parseInt(tare_wt) });
    let checkweight1: any = this.userForm.get("weight1").value as FormControl;
    let checkweight2: any = this.userForm.get("weight2").value as FormControl;
    let convertionfactor: any;
    let uom = this.userForm.get("gw_unit").value

    this.customList.forEach(element => {
      if (uom == element.customuom_id) {
        convertionfactor = element.uom_conv_fac;
      }
    });

    //  console.log("tuhin here "+checkweight1 + " / " + checkweight2 + " / " + this.reference_name  +" / " + this.ref_type_name);
    //reference_name// Unload Advice //ref_type_name// Purchase Order //_weighmentFor Purchase Order //weighmentFor Purchase Order //wgment_for Purchase Order
    //starts here 
    if (this.reference_name == 'Unload Advice') {
      this.remarkscheck = false;
      if (this.ref_type_name == 'Purchase Order') {
        if (checkweight1 == "weight1" && checkweight2 == "" || checkweight2 == null) {
          this.userForm.patchValue({ gross_weight: parseInt(val.substring(2, 10)), digital_weight: parseInt(val.substring(2, 10)) });//this line paste
          this._gross_weight = parseInt(val.substring(2, 10));
          //this.userForm.patchValue({net_weight: Math.abs(this._gross_weight ).toFixed(3)});
          this.onChangeGrossUom(this.userForm.get("gw_unit").value);
        }
        if (checkweight1 == "weight1" && checkweight2 == "weight2") {

          this.userForm.patchValue({ tare_weight: parseInt(val.substring(2, 10)), digital_weight: parseInt(val.substring(2, 10)) });//this line paste
          this.onChangeGrossUom(this.userForm.get("tw_unit").value);
          // this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(this.userForm.get("tare_weight").value)).toFixed(3)});
        }

      }
      if (this.ref_type_name == 'Open Advice') {
        if (checkweight1 == "weight1" && checkweight2 == "" || checkweight2 == null) {
          this.userForm.patchValue({ gross_weight: parseInt(val.substring(2, 10)), digital_weight: parseInt(val.substring(2, 10)) });//this line paste
          this._gross_weight = parseInt(val.substring(2, 10));
          this.onChangeGrossUom(this.userForm.get("gw_unit").value);
          // this.userForm.patchValue({net_weight: Math.abs(this._gross_weight ).toFixed(3)});
        }
        if (checkweight1 == "weight1" && checkweight2 == "weight2") {
          // console.log("let see here "+parseInt(val.substring(2,10)));
          this.userForm.patchValue({ tare_weight: parseInt(val.substring(2, 10)), digital_weight: parseInt(val.substring(2, 10)) });//this line paste
          this.onChangeGrossUom(this.userForm.get("tw_unit").value);


          // console.log("weight "+this.userForm.get("tare_weight").value + " / " + this.userForm.get("digital_weight").value);
          // this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(this.userForm.get("tare_weight").value)).toFixed(3)});
        }

      }
      if (this.ref_type_name == 'Sales Return') {
        if (checkweight1 == "weight1" && checkweight2 == "" || checkweight2 == null) {
          this.userForm.patchValue({ gross_weight: parseInt(val.substring(2, 10)), digital_weight: parseInt(val.substring(2, 10)) });//this line paste
          this._gross_weight = parseInt(val.substring(2, 10));
          //this.userForm.patchValue({net_weight: Math.abs(this._gross_weight ).toFixed(3)});
          this.onChangeGrossUom(this.userForm.get("gw_unit").value);
        }
        if (checkweight1 == "weight1" && checkweight2 == "weight2") {
          this.onChangeGrossUom(this.userForm.get("tw_unit").value);
          this.userForm.patchValue({ tare_weight: parseInt(val.substring(2, 10)), digital_weight: parseInt(val.substring(2, 10)) });//this line paste
          //this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(this.userForm.get("tare_weight").value)).toFixed(3)});
          this.onChangeGrossUom(this.userForm.get("tw_unit").value);
        }

      }
      if (this.ref_type_name == 'Stock Transfer') {
        if (checkweight1 == "weight1" && checkweight2 == "" || checkweight2 == null) {
          this.userForm.patchValue({ gross_weight: parseInt(val.substring(2, 10)), digital_weight: parseInt(val.substring(2, 10)) });//this line paste
          this._gross_weight = parseInt(val.substring(2, 10));
          //  this.userForm.patchValue({net_weight: Math.abs(this._gross_weight ).toFixed(3)});
          this.onChangeGrossUom(this.userForm.get("gw_unit").value);
        }
        if (checkweight1 == "weight1" && checkweight2 == "weight2") {
          this.onChangeGrossUom(this.userForm.get("tw_unit").value);
          this.userForm.patchValue({ tare_weight: parseInt(val.substring(2, 10)), digital_weight: parseInt(val.substring(2, 10)) });//this line paste
          // this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(this.userForm.get("tare_weight").value)).toFixed(3)});
          this.onChangeGrossUom(this.userForm.get("tw_unit").value);
        }


      }
    }
    if (this.reference_name == 'Load Advice') {

      if (this.ref_type_name == 'Sales Order') {
        if (checkweight1 == "weight1" && checkweight2 == "" || checkweight2 == null) {
          console.log("reference_id Value::" + this.reference_id)

          console.log(" tare here  " + tare_wt)
          this.DropDownListService.checkLooseItem(this.reference_id).subscribe(looseitem => {
            console.log(" looseitem here  " + looseitem.status)

            if (looseitem.status == 'YES') {
              //this.userForm.patchValue({tare_weight:'143.80',digital_weight: parseInt(tare_wt)});//this line paste
              this.userForm.patchValue({ tare_weight: parseInt(tare_wt), digital_weight: parseInt(tare_wt), tare_weight_bulker: '143.80', net_weight_bulker: '0.00' });
            }
            else {
              this.userForm.patchValue({ tare_weight: parseInt(tare_wt), digital_weight: parseInt(tare_wt), tare_weight_bulker: '0.00', net_weight_bulker: '0.00' });//this line paste
            }

            this._gross_weight = parseInt(tare_wt);
            // this.userForm.patchValue({net_weight: Math.abs(this._gross_weight ).toFixed(3)});
            this.onChangeGrossUom(this.userForm.get("tw_unit").value);
          });



        }
        if (checkweight1 == "weight1" && checkweight2 == "weight2") {
          this.userForm.patchValue({ gross_weight: parseInt(val.substring(2, 10)), digital_weight: parseInt(val.substring(2, 10)) });//this line paste
          this.onChangeGrossUom(this.userForm.get("gw_unit").value);
          //this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(this.userForm.get("tare_weight").value)).toFixed(3)});

        }

      }
      if (this.ref_type_name == 'Open Advice') {

        if (checkweight1 == "weight1" && checkweight2 == "" || checkweight2 == null) {

          this.userForm.patchValue({ tare_weight: parseInt(val.substring(2, 10)), digital_weight: parseInt(val.substring(2, 10)) });//this line paste
          this._gross_weight = parseInt(val.substring(2, 10));
          // console.log("tuhin tare " + this.userForm.get("tare_weight").value);
          // this.userForm.patchValue({net_weight: Math.abs(this._gross_weight ).toFixed(3)});
          this.onChangeGrossUom(this.userForm.get("tw_unit").value);
        }
        if (checkweight1 == "weight1" && checkweight2 == "weight2") {

          this.userForm.patchValue({ gross_weight: parseInt(val.substring(2, 10)), digital_weight: parseInt(val.substring(2, 10)) });//this line paste
          this.onChangeGrossUom(this.userForm.get("gw_unit").value);
          //this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(this.userForm.get("tare_weight").value)).toFixed(3)});

        }

      }
      if (this.ref_type_name == 'Purchase Return') {
        if (checkweight1 == "weight1" && checkweight2 == "" || checkweight2 == null) {
          this.userForm.patchValue({ tare_weight: parseInt(val.substring(2, 10)), digital_weight: parseInt(val.substring(2, 10)) });//this line paste
          this._gross_weight = parseInt(val.substring(2, 10));
          // this.userForm.patchValue({net_weight: Math.abs(this._gross_weight ).toFixed(3)});
          this.onChangeGrossUom(this.userForm.get("tw_unit").value);
        }
        if (checkweight1 == "weight1" && checkweight2 == "weight2") {
          // this.onChangeGrossUom(this.userForm.get("gw_unit").value);
          this.userForm.patchValue({ gross_weight: parseInt(val.substring(2, 10)), digital_weight: parseInt(val.substring(2, 10)) });//this line paste
          // this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(this.userForm.get("tare_weight").value)).toFixed(3)});
          this.onChangeGrossUom(this.userForm.get("gw_unit").value);

        }
      }
      if (this.ref_type_name == 'Stock Transfer') {
        if (checkweight1 == "weight1" && checkweight2 == "" || checkweight2 == null) {
          this.userForm.patchValue({ tare_weight: parseInt(val.substring(2, 10)), digital_weight: parseInt(val.substring(2, 10)) });//this line paste
          this._gross_weight = parseInt(val.substring(2, 10));
          // this.userForm.patchValue({net_weight: Math.abs(this._gross_weight ).toFixed(3)});
          this.onChangeGrossUom(this.userForm.get("tw_unit").value);
        }
        if (checkweight1 == "weight1" && checkweight2 == "weight2") {
          //this.onChangeGrossUom(this.userForm.get("gw_unit").value);
          this.userForm.patchValue({ gross_weight: parseInt(val.substring(2, 10)), digital_weight: parseInt(val.substring(2, 10)) });//this line paste
          // this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(this.userForm.get("tare_weight").value)).toFixed(3)});
          this.onChangeGrossUom(this.userForm.get("gw_unit").value);

        }

      }
      this.status = true;

    }
    //ends here
    /*
    
    if(checkweight1 =="weight1" && checkweight2 =="" ||checkweight2 ==null)
    {
      this.userForm.patchValue({gross_weight: parseInt(val.substring(2,10))});
    }
    if(checkweight1 =="weight1" && checkweight2 =="weight2")
    {
      this.userForm.patchValue({tare_weight: parseInt(val.substring(2,10))});
    }
    */

    //(<HTMLInputElement> document.getElementById("fetchport")).disabled = false;//tuhin changes 29-08-2022
    //(<HTMLInputElement> document.getElementById("getport")).disabled = true;//tuhin changes 29-08-2022

    this.fetchstatus = false;
    this.getstatus = true;

    val = 0;
    //
  }


  onchangeportvalue(event: string) {

    if (event == 'gross') {
      this.userForm.patchValue({ gross_weight: this.userForm.get("port_value").value as FormControl });
    }
    if (event == 'tyre') {
      this.userForm.patchValue({ tare_weight: this.userForm.get("port_value").value as FormControl });
    }

  }

  //new measurement ends



  deleteItemwm_unload_wgmnt_dtls(pointIndex) {
    if (this.wm_unload_wgmnt_dtls.length > 1) {
      this.wm_unload_wgmnt_dtls.removeAt(pointIndex);
      for (let v = 0; v < this.wm_unload_wgmnt_dtls.length; v++) {
        this.wm_unload_wgmnt_dtls.at(v).patchValue({ sl_no: v + 1 });
      }

      if (this.weighmentFor == 'Purchase Order') {



        this.DropDownListService.getWeighmentcharges(this.wm_unload_wgmnt_dtls.at(0).get("advice").value).subscribe(data1 => {

          // console.log(" tuhin here  "+JSON.stringify(data1))
          if (data1.we_chg_app == true) {
            this.userForm.patchValue({ wgment_charge: '1' })
          }
          else {
            this.userForm.patchValue({ wgment_charge: '0' })
          }
        });
      }



    }


  }


  deleteDocument(index) {
    if (index) {

      this.weighment_doc.removeAt(index);
      this.myFiles.splice(index, 1);
    }
    else {
      alert("can't delete all rows");
      this.weighment_doc.reset();

    }
  }

  deleteDocumentlist(index) {


    this.weighment_doc_list.removeAt(index);


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

  deletepdfwithid(dataid, i) {
    // console.log("dataid " +JSON.stringify(dataid));//here getting id now procede delte process
    //  alert(JSON.stringify(dataid.id));
    this.Service.getdeletefileSystem(dataid).subscribe(data => {

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
    var values = tm[i].controls.doc_pdf.value
    this.file_name = values.substring(23, tm[i].controls.doc_pdf.length);
    this.DropDownListService.getdocumentListwithfile(this.file_name)
      .subscribe(data => {

        //console.log("data " +JSON.stringify(data));
        this.deletepdfwithid(data[0].id, i);

        this.status = true;
      }, (error) => { this.status = true; console.log("ERROR get: " + JSON.stringify(error)); });


    // alert(JSON.stringify(this.process_no.value)); 


  }

  viewpdf(i, tm) {

    var values = tm[i].controls.doc_pdf.value
    // console.log("values:"+values)
    this.file_name = values.substring(32, tm[i].controls.doc_pdf.length);
    //alert(this.file_name);
    this.DropDownListService.downloadFileSystemForWeighment(this.file_name, 'weighment').subscribe(response => {

      //  console.log("backend data"+response);
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

      //  console.log(error);
    });

  }


  saveFile(data: any, filename?: string) {
    const blob = new Blob([data], { type: 'text/csv; charset=utf-8' });
    fileSaver.saveAs(blob, filename);
  }

  //getUnloadWeightments_pagination
  getProducts(request) {
    // console.log("tuhin req "+request.size);
    this.DropDownListService.getUnloadWeightments_pagination(request.page, request.size)
      .subscribe(data => {
        this.listUnloadWeightment = data['content'];
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
          this.listUnloadWeightment = data

          this.status = true;
        });
      }
    }

  }

  search() {
    let order1_no = this.userForm1.get("wgment1_no").value;
    let todate = this.userForm1.get("todate").value;
    let fromdate = this.userForm1.get("fromdate").value;
    let customer_name1 = this.userForm1.get("customer_name1").value;
    let supplier_name1 = this.userForm1.get("supplier_name1").value;
    // let bus_partner1="";
    let finyear = localStorage.getItem("financial_year");

    this.status = false;
    this.DropDownListService.searchWeighmentFast("orderno=" + order1_no + "&fromdate=" + fromdate + "&todate=" + todate + "&customer_name1=" + customer_name1 + "&supplier_name1=" + supplier_name1 + "&finyear=" + finyear).subscribe(data => {
      console.log("here data comses " + JSON.stringify(data))
      console.log("Party  " + data[0]["partyname"])
      this.listUnloadWeightment = data;
      this.listUnloadWeightment.forEach(element => {
        let partyid = element["partyname"];
        if (element.vehicle_ref_name == 'Unload Advice') {
          this.supplierNames_List.forEach(customer => {
            if (customer.bp_Id == partyid) {
              element.tw_remarks = customer.bp_name;
            }
          })
        }
        if (element.vehicle_ref_name == 'Load Advice') {
          this.customerNames_List.forEach(customer => {
            if (customer.cp_Id == partyid) {
              element.tw_remarks = customer.cp_name;
            }
          })
        }
      })
      this.status = true;
    }
      , (error) => {
        this.status = true;
        alert("Weighment  Not Found !!!")
        this.listUnloadWeightment = [];
      })
  }

  onTerminate(id, wgment_id, net_weight,wgment_for) {
    /* if (confirm("Are you sure to Terminate this Weighment ?")) 
    {
      this.status=false;
      this.DropDownListService.terminatekata(wgment_id,localStorage.getItem("username")).subscribe(data=>
        {
          alert("Weighment Terminated Successfully......")
          this.status=true;
          window.location.reload();
        })
    }
    else
    {

    } */

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {};

    let dialogRef = this.dialog.open(WeighmentterminatepopupComponent, {
      data: { id: id, wgmentid: wgment_id, net_weight: net_weight, wgment_for:wgment_for }, height: '80%',
      width: '80%'
    });
    dialogRef.afterClosed().subscribe(data => {

    });
  }

  
}


