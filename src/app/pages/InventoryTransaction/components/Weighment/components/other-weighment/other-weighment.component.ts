import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UnloadWeightment } from '../../../../../../Models/Weightment/unload-weightment';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { forkJoin, timer } from 'rxjs';
import * as fileSaver from 'file-saver';
import { PageEvent } from '@angular/material';
import { OtherWeighmentBillPrintComponent } from '../other-weighment-bill-print/other-weighment-bill-print.component';
import { AddNewVechilePopUpComponent } from '../add-new-vechile-pop-up/add-new-vechile-pop-up.component';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { apiconfig } from '../../../../../../Configuration/ApiConfig';
import { ImageViewModalComponent } from '../image-view-modal/image-view-modal.component';

let val: any;
//var TextDecoderStream;
declare var TextDecoderStream: any;

@Component({
  selector: 'app-other-weighment',
  templateUrl: './other-weighment.component.html',
  styleUrls: ['./other-weighment.component.scss']
})
export class OtherWeighmentComponent implements OnInit {

  submitted = false;
  isHidden: any;
  status = false;
  veh_nos: any = [];
  customList: any = [];
  public userForm: FormGroup;
  model: UnloadWeightment = new UnloadWeightment();
  listUnloadWeightment: UnloadWeightment[];
  party_sl_no = 1;
  company_name: any;
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
  action: any;
  adviceId: any = [];
  _gross_weight: number;
  _tare_weight: number;
  otherweighmentsave: boolean = true;
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
  nopartyList: any = [];
  wgcharge: boolean = false;
  grossunit: any;
  tareunit: any;
  partylist: any = [];
  itemlist: any = [];
  bridge_location:any;
  
  cameraserial: string = "";
  imgURL: string = "";
  images: string[] = [];


  //end
  constructor(public fb: FormBuilder, private Service: Master,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private config: apiconfig,
    private DropDownListService: DropdownServiceService, private dialog: MatDialog) {
    this.userForm = fb.group({
      wgment_no: [''],
      weight1: [''],
      weight2: [''],
      wgment_date: [''],
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
      firstbags: [''],
      vehicle_ref_name: [''],
      digital_weight_backup: [''],
      nopartyid: [''],
      noitemid: [''],
      wgment_for: [''],
      shifting_price: [''],
      total_sft_price: [''],
      weight_bridge_location:[''],

      wm_unload_wgmnt_dtls: this.fb.array([this.fb.group({
        sl_no: this.party_sl_no,
        customer: '0',
        supplier: '0',
        business_unit: '0',
        advice: '0',
        wgment_date: '0',
        advice_no: '0'
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
      nopartyname1: ['']

    });
    this.imgURL = config.url + "getKataImg/";
  }

  get wgment1_no() { return this.userForm1.get("wgment1_no") as FormControl }
  get fromdate() { return this.userForm1.get("fromdate") as FormControl }
  get todate() { return this.userForm1.get("todate") as FormControl }
  get nopartyname1() { return this.userForm1.get("nopartyname1") as FormControl }

  get wgment_for() { return this.userForm.get("wgment_for") as FormControl; }
  get wgment_no() { return this.userForm.get("wgment_no") as FormControl; }
  get weight1() { return this.userForm.get("weight1") as FormControl }
  get weight2() { return this.userForm.get("weight2") as FormControl }
  get wgment_date() { return this.userForm.get("wgment_date") as FormControl }
  get ref_doc_no() { return this.userForm.get("ref_doc_no") as FormControl }
  get ref_doc_date() { return this.userForm.get("ref_doc_date") as FormControl }
  get vehicle_id() { return this.userForm.get("vehicle_id") as FormControl }
  get vehicle_no() { return this.userForm.get("vehicle_no") as FormControl }
  get veh_type() { return this.userForm.get("veh_type") as FormControl }
  get weight_bridge_location() { return this.userForm.get("weight_bridge_location") as FormControl; }

  get digital_weight_backup() { return this.userForm.get("digital_weight_backup") as FormControl }
  get nopartyid() { return this.userForm.get("nopartyid") as FormControl }
  get noitemid() { return this.userForm.get("noitemid") as FormControl }

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
  get firstbags() { return this.userForm.get("firstbags") as FormControl }
  get port_value() { return this.userForm.get("port_value") as FormControl; }
  get vehicle_ref_name() { return this.userForm.get("vehicle_ref_name") as FormControl; }
  get shifting_price() { return this.userForm.get("shifting_price") as FormControl }
  get total_sft_price() { return this.userForm.get("total_sft_price") as FormControl }

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
    this.grossunit = 'CUM00002';
    this.tareunit = 'CUM00002';
    //For User Role
    let user_role = localStorage.getItem("user_role") + "tuhinabcd" + "weighment";
    //  this.DropDownListService.getRoleItemMaster(user_role).subscribe(data=>{
    //  let accessdata=JSON.stringify(data);
    this.otherweighmentsave = true;

    let accessdata = JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));



    this.status = false;
    this.weighmentFor = 'Purchase Order';

    this.adviceId = [];
    this._gross_weight = 0;
    this._tare_weight = 0;
    this.company_name = localStorage.getItem("company_name");
    this.status = false;
    this.isHidden = false;

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
    this.action = 'update';
    this.userForm.patchValue({
      gw_unit: "0", tw_unit: "0", nw_unit: "0", gross_weight: 0,
      tare_weight: 0, net_weight: 0
    });
    let finyear = localStorage.getItem("financial_year");
    forkJoin(
      this.DropDownListService.getOtherWeighmentDataList(this.currentDate, finyear),
      this.DropDownListService.getNopartyList(),
      this.DropDownListService.getOtherPartyMasterList(localStorage.getItem("company_name")),
      this.DropDownListService.getOtherItemMasterList(localStorage.getItem("company_name")),
    ).subscribe(([weimentData, noparty, partylists, itemlists]) => {
      // console.log("noparty:"+JSON.stringify(noparty))
      this.listUnloadWeightment = weimentData;
      this.nopartyList = noparty;
      this.partylist = partylists;
      this.itemlist = itemlists;
    });


    this.status = true;
    this.weighmentFor = 'Purchase Order';

  }

  onChangeLocation()
  {
    this.bridge_location=this.userForm.get("weight_bridge_location").value
  }

  onChangeVechile(vechile_no: string) {
    if (vechile_no.length) {
      this.status = false;
      this.DropDownListService.getWeighmentNumber(vechile_no + "/" + this.userForm.get("wgment_date").value).subscribe(data => {
        //console.log("WGHT VE : : "+JSON.stringify(data));
        this.seq_no = data.sequenceid;
        let gross_date = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
        let tare_date = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
        let gross_time = new Date().toString().substr(16, 5);
        let tare_time = new Date().toString().substr(16, 5);
        this.reference_name = this.userForm.get("wgment_for").value;
        this.bridge_location = this.userForm.get("weight_bridge_location").value;

        if (data.sequenceid.substring(10, 7) == '1ST') {
          this.userForm.patchValue({ weight1: 'weight1', weight2: '' });
          this.userForm.patchValue({
            nopartyid: "", noitemid: "", ref_doc_no: "", ref_doc_date: "", gross_weight: "", gw_unit: "CUM00002", gw_date: gross_date, gw_time: gross_time, gw_remarks: "",
            tare_weight: "", tw_unit: "CUM00002", tw_date: tare_date, tw_time: tare_time,
            tw_remarks: "", tarebags: "", firstbags: "", net_weight: "", nw_unit: "", wgment_charge: '0', wgment_rs: ""
          });
          this.onChangeCharge('0');
        }
        else if (data.sequenceid.substring(10, 7) == '2ND') {
          this.userForm.patchValue({ weight1: 'weight1', weight2: 'weight2' });

          //this.DropDownListService.getOtherWgFirstData(this.userForm.get("vehicle_id").value).subscribe(data => {
            this.DropDownListService.getOtherWgFirstDataWtWgtFor(this.userForm.get("vehicle_id").value).subscribe(data => {
            console.log(data["wgment_charge"] + "wg 1st:" + JSON.stringify(data))
            if(this.reference_name === data["wgment_for"] && this.bridge_location===data["weight_bridge_location"])
              {
                if (this.reference_name == 'Unloading') {
                  console.log("Unloading")
                  this.userForm.patchValue({
                    wgment_date: data["wgment_date"], nopartyid: data["nopartyid"], noitemid: data["noitemid"], ref_doc_no: data["ref_doc_no"], ref_doc_date: data["ref_doc_date"],
                    gross_weight: data["gross_weight"], gw_unit: data["gw_unit"], gw_remarks: data["gw_remarks"], tare_weight: data["tare_weight"], tw_unit: data["tw_unit"],
                    tw_remarks: data["tw_remarks"], tarebags: data["tarebags"], firstbags: data["firstbags"], net_weight: data["net_weight"], nw_unit: data["nw_unit"], wgment_charge: data["wgment_charge"], wgment_rs: data["wgment_rs"],
                    gw_date: data["gw_date"], gw_time: data["gw_time"], tw_date: tare_date, tw_time: tare_time
                  });
                  this.onChangeCharge(data["wgment_charge"]);
                  this.onChangeParty(data["nopartyid"]);
                }
                else {
                  console.log("loading")
                  this.userForm.patchValue({
                    wgment_date: data["wgment_date"], nopartyid: data["nopartyid"], noitemid: data["noitemid"], ref_doc_no: data["ref_doc_no"], ref_doc_date: data["ref_doc_date"],
                    gross_weight: data["gross_weight"], gw_unit: data["gw_unit"], gw_remarks: data["gw_remarks"], tare_weight: data["tare_weight"], tw_unit: data["tw_unit"],
                    tw_remarks: data["tw_remarks"], tarebags: data["tarebags"], firstbags: data["firstbags"], net_weight: data["net_weight"], nw_unit: data["nw_unit"], wgment_charge: data["wgment_charge"], wgment_rs: data["wgment_rs"],
                    gw_date: gross_date, gw_time: gross_time, tw_date: data["tw_date"], tw_time: data["tw_time"]
                  });
              this.onChangeCharge(data["wgment_charge"]);
              this.onChangeParty(data["nopartyid"]);
            }
          }
          else
          {
            console.log("Wgt For Different");
            alert("Please select "+data["weight_bridge_location"]+" for Weight Bridge Location And "+data["wgment_for"]+" in (Weightment For) as same in 1st Weightment !!!");
            window.location.reload();
          }
          });

        }
        else {
          this.userForm.patchValue({ weight1: '', weight2: '' });
        }
        this.status = true;
      });

      this.status = true;
      this.connectSerial();

    }
    timer(2000).subscribe
      (x => {
        this.onChangeWeightment();
      })
  }

  shiftingPrice: boolean = false;
  onChangeParty(party_id) {
    if(party_id.length)
    {
      //alert(party_id);
      if (party_id == "OPM00001") {
        this.shiftingPrice = true;
      }
      else {
        this.shiftingPrice = false;
      }
    }
  }

  onChangeCharge(charge) {
    if (charge.length != 0) {
      if (charge == '1') {
        this.wgcharge = true;
        this.userForm.patchValue({ wgment_charge: '1' });
      }
      else if (charge == '0') {
        this.wgcharge = false;
        this.userForm.patchValue({ wgment_charge: '0', wgment_rs: "" });
      }
      else {
        this.wgcharge = false;
        this.userForm.patchValue({ wgment_charge: '0', wgment_rs: "" });
      }
    }
  }

  isChecked2: boolean = false;
  isChecked1: boolean = false;
  isChecked3: boolean = false;
  GrossWeight: any;
  TareWeight: any;
  isChecked4Price: boolean = false;

  onChangeWeightment() {

    this.WeightMentFor = this.userForm.get("wgment_for").value;
    this.Weight1 = this.userForm.get("weight1").value;
    this.Weight2 = this.userForm.get("weight2").value;

    // console.log("WeightMentFor : "+this.WeightMentFor)
    // console.log("Weight1 : "+this.Weight1)
    // console.log("Weight2 : "+this.Weight2)
    if (this.WeightMentFor == "Loading") {
      if (this.Weight1 == "weight1") {
        this.isChecked2 = true;       //Gross Weight
        this.isChecked1 = false;       //Tare Weight
        this.isChecked3 = true;       // no bags
        this.isChecked4Price = true;  // No price on first Weighment
      }
      if (this.Weight2 == "weight2") {
        this.isChecked2 = false;
        this.isChecked1 = true;
        this.isChecked3 = false;
        this.isChecked4Price = false;
      }
    }
    else {
      if (this.Weight1 == "weight1") {
        this.isChecked2 = false;
        this.isChecked1 = true;
        this.isChecked3 = true;
        this.isChecked4Price = true;
      }
      if (this.Weight2 == "weight2") {
        this.isChecked2 = true;
        this.isChecked1 = false;
        this.isChecked3 = false;
        this.isChecked4Price = false;
      }
    }
  }

  onChangeGrossUom(uom) {
    // this.userForm.patchValue({tw_unit: uom, nw_unit: uom});

    //this.userForm.patchValue({gw_unit: uom, nw_unit: uom});
    //starts here 

    let checkweight1: any = this.userForm.get("weight1").value as FormControl;
    let checkweight2: any = this.userForm.get("weight2").value as FormControl;
    let convertionfactor: any;
    //console.log("check "+this.userForm.get("gw_unit").value) 
    this.customList.forEach(element => {
      console.log("uom" + uom + " element.customuom_id " + element.customuom_id)
      //  if(this.userForm.get("gw_unit").value == element.customuom_id)
      if (uom == element.customuom_id) {
        convertionfactor = element.uom_conv_fac;
      }
    });
    this.reference_name = this.userForm.get("wgment_for").value;
    if (this.reference_name == 'Unloading') {

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

      /* if( this.ref_type_name =='Purchase Order')
       {
           if(checkweight1 =="weight1" && checkweight2 =="" ||checkweight2 ==null)
           {
 
             let grossvalueafterconvertion:number;
             grossvalueafterconvertion=Number(this.userForm.get("digital_weight").value)*convertionfactor;
 
            this.userForm.patchValue({gross_weight:(grossvalueafterconvertion).toFixed(3)});//this line paste
           
            this.userForm.patchValue({net_weight: Math.abs(grossvalueafterconvertion).toFixed(3)});
 
            this.userForm.patchValue({tw_unit: uom, nw_unit: uom});//here 1st time auto uom
           }
           if(checkweight1 =="weight1" && checkweight2 =="weight2")
           {
             let grossvalueafterconvertion=Number(this.userForm.get("digital_weight").value)*convertionfactor;
 
 
             this.userForm.patchValue({tare_weight: (grossvalueafterconvertion).toFixed(3)});//this line paste
             this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(grossvalueafterconvertion)).toFixed(3)});
           }
           
       }
       if( this.ref_type_name =='Open Advice')
       {
         if(checkweight1 =="weight1" && checkweight2 =="" ||checkweight2 ==null)
         {
 
           let grossvalueafterconvertion:number;
           grossvalueafterconvertion=Number(this.userForm.get("digital_weight").value)*convertionfactor;
 
          this.userForm.patchValue({gross_weight:(grossvalueafterconvertion).toFixed(3)});//this line paste
         
          this.userForm.patchValue({net_weight: Math.abs(grossvalueafterconvertion).toFixed(3)});
 
          this.userForm.patchValue({tw_unit: uom, nw_unit: uom});//here 1st time auto uom
         }
         if(checkweight1 =="weight1" && checkweight2 =="weight2")
         {
          // console.log("here comes"+convertionfactor);
           let grossvalueafterconvertion=Number(this.userForm.get("digital_weight").value)*convertionfactor;
 
 
           this.userForm.patchValue({tare_weight: (grossvalueafterconvertion).toFixed(3)});//this line paste
           this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(grossvalueafterconvertion)).toFixed(3)});
         }
   
       }
       if( this.ref_type_name =='Sales Return')
       {
         if(checkweight1 =="weight1" && checkweight2 =="" ||checkweight2 ==null)
           {
 
             let grossvalueafterconvertion:number;
             grossvalueafterconvertion=Number(this.userForm.get("digital_weight").value)*convertionfactor;
 
            this.userForm.patchValue({gross_weight:(grossvalueafterconvertion).toFixed(3)});//this line paste
           
            this.userForm.patchValue({net_weight: Math.abs(grossvalueafterconvertion).toFixed(3)});
 
            this.userForm.patchValue({tw_unit: uom, nw_unit: uom});//here 1st time auto uom
           }
           if(checkweight1 =="weight1" && checkweight2 =="weight2")
           {
             let grossvalueafterconvertion=Number(this.userForm.get("digital_weight").value)*convertionfactor;
 
 
             this.userForm.patchValue({tare_weight: (grossvalueafterconvertion).toFixed(3)});//this line paste
             this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(grossvalueafterconvertion)).toFixed(3)});
           }
        
       }   
       if( this.ref_type_name =='Stock Transfer')
       {
         if(checkweight1 =="weight1" && checkweight2 =="" ||checkweight2 ==null)
         {
 
           let grossvalueafterconvertion:number;
           grossvalueafterconvertion=Number(this.userForm.get("digital_weight").value)*convertionfactor;
 
          this.userForm.patchValue({gross_weight:(grossvalueafterconvertion).toFixed(3)});//this line paste
         
          this.userForm.patchValue({net_weight: Math.abs(grossvalueafterconvertion).toFixed(3)});
 
          this.userForm.patchValue({tw_unit: uom, nw_unit: uom});//here 1st time auto uom
         }
         if(checkweight1 =="weight1" && checkweight2 =="weight2")
         {
           let grossvalueafterconvertion=Number(this.userForm.get("digital_weight").value)*convertionfactor;
 
 
           this.userForm.patchValue({tare_weight: (grossvalueafterconvertion).toFixed(3)});//this line paste
           this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(grossvalueafterconvertion)).toFixed(3)});
         }
   
   
       } */
    }
    if (this.reference_name == 'Loading') {

      if (checkweight1 == "weight1" && checkweight2 == "" || checkweight2 == null) {

        let grossvalueafterconvertion: number;
        grossvalueafterconvertion = Number(this.userForm.get("digital_weight").value) * convertionfactor;

        this.userForm.patchValue({ tare_weight: (grossvalueafterconvertion).toFixed(3), gross_weight: 0 });//this line paste

        this.userForm.patchValue({ net_weight: Math.abs(grossvalueafterconvertion).toFixed(3) });
        this.userForm.patchValue({ gw_unit: uom, nw_unit: uom });//here reverse set uom 
      }
      if (checkweight1 == "weight1" && checkweight2 == "weight2") {

        let grossvalueafterconvertion = Number(this.userForm.get("digital_weight").value) * convertionfactor;

        this.userForm.patchValue({ gross_weight: (grossvalueafterconvertion).toFixed(3) });//this line paste
        this.userForm.patchValue({ net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) - Number(this.userForm.get("tare_weight").value)).toFixed(3) });
      }

      /* if( this.ref_type_name =='Sales Order')
         {
             if(checkweight1 =="weight1" && checkweight2 =="" ||checkweight2 ==null)
             {
   
               let grossvalueafterconvertion:number;
               grossvalueafterconvertion=Number(this.userForm.get("digital_weight").value)*convertionfactor;
   
             this.userForm.patchValue({tare_weight: (grossvalueafterconvertion).toFixed(3),gross_weight:0});//this line paste
            
             this.userForm.patchValue({net_weight: Math.abs(grossvalueafterconvertion).toFixed(3)});
             this.userForm.patchValue({gw_unit: uom, nw_unit: uom});//here reverse set uom 
             }
             if(checkweight1 =="weight1" && checkweight2 =="weight2")
             {
               let grossvalueafterconvertion=Number(this.userForm.get("digital_weight").value)*convertionfactor;
   
               this.userForm.patchValue({gross_weight: (grossvalueafterconvertion).toFixed(3)});//this line paste
               this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(this.userForm.get("tare_weight").value)).toFixed(3)});
             }
     
         }
         if( this.ref_type_name =='Open Advice')
         {
           
           if(checkweight1 =="weight1" && checkweight2 =="" ||checkweight2 ==null)
           {
   
             let grossvalueafterconvertion:number;
             grossvalueafterconvertion=Number(this.userForm.get("digital_weight").value)*convertionfactor;
   
           this.userForm.patchValue({tare_weight: (grossvalueafterconvertion).toFixed(3)});//this line paste
          
           this.userForm.patchValue({net_weight: Math.abs(grossvalueafterconvertion).toFixed(3),gross_weight:0});
           this.userForm.patchValue({gw_unit: uom, nw_unit: uom});//here reverse set uom 
           }
           if(checkweight1 =="weight1" && checkweight2 =="weight2")
           {
             let grossvalueafterconvertion=Number(this.userForm.get("digital_weight").value)*convertionfactor;
   
             this.userForm.patchValue({gross_weight: (grossvalueafterconvertion).toFixed(3)});//this line paste
             this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(this.userForm.get("tare_weight").value)).toFixed(3)});
           }
   
       }
         if( this.ref_type_name =='Purchase Return')
         {
           if(checkweight1 =="weight1" && checkweight2 =="" ||checkweight2 ==null)
           {
   
             let grossvalueafterconvertion:number;
             grossvalueafterconvertion=Number(this.userForm.get("digital_weight").value)*convertionfactor;
   
           this.userForm.patchValue({tare_weight: (grossvalueafterconvertion).toFixed(3),gross_weight:0});//this line paste
          
           this.userForm.patchValue({net_weight: Math.abs(grossvalueafterconvertion).toFixed(3)});
           this.userForm.patchValue({gw_unit: uom, nw_unit: uom});//here reverse set uom 
           }
           if(checkweight1 =="weight1" && checkweight2 =="weight2")
           {
             let grossvalueafterconvertion=Number(this.userForm.get("digital_weight").value)*convertionfactor;
   
             this.userForm.patchValue({gross_weight: (grossvalueafterconvertion).toFixed(3)});//this line paste
             this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(this.userForm.get("tare_weight").value)).toFixed(3)});
           }
         }
         if( this.ref_type_name =='Stock Transfer')
         {
           if(checkweight1 =="weight1" && checkweight2 =="" ||checkweight2 ==null)
           {
   
             let grossvalueafterconvertion:number;
             grossvalueafterconvertion=Number(this.userForm.get("digital_weight").value)*convertionfactor;
   
           this.userForm.patchValue({tare_weight: (grossvalueafterconvertion).toFixed(3),gross_weight:0});//this line paste
          
           this.userForm.patchValue({net_weight: Math.abs(grossvalueafterconvertion).toFixed(3)});
   
           this.userForm.patchValue({gw_unit: uom, nw_unit: uom});//here reverse set uom 
           }
           if(checkweight1 =="weight1" && checkweight2 =="weight2")
           {
             let grossvalueafterconvertion=Number(this.userForm.get("digital_weight").value)*convertionfactor;
   
             this.userForm.patchValue({gross_weight: (grossvalueafterconvertion).toFixed(3)});//this line paste
             this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(this.userForm.get("tare_weight").value)).toFixed(3)});
           }
     
         } */
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
      customer: '0',
      supplier: '0',
      business_unit: '0',
      advice: '0',
      wgment_date: '0',
      advice_no: '0'
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

    if (s == "add") {
      this.isHidden = true;

      // this.DropDownListService.getVehicleListWeighmentnew().subscribe(data=>
      forkJoin(
        this.DropDownListService.getVehiclenoallNew(),
        this.DropDownListService.getCustomUOMs("WUOM")
      ).subscribe(([data, uomlist]) => {
        //console.log("vehicletype:"+JSON.stringify(vehicletype))
        this.veh_nos = data;;
        this.customList = uomlist;
        this.status = true;
      });

      this.userForm.patchValue({});
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

    if (weight == 'Gross wt') {
      this._gross_weight = event.target.value;
      this.userForm.patchValue({ net_weight: Math.abs(this._gross_weight).toFixed(3) });

    }
    if (weight == 'Tare wt') {
      this._tare_weight = event.target.value;
      this.userForm.patchValue({ net_weight: Math.abs(this._gross_weight - this._tare_weight).toFixed(3) });
    }
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
    let dialogRef = this.dialog.open(OtherWeighmentBillPrintComponent, {
      data: { alldata: id, weighment_id: weighmentid, company_name: comp }, height: '500px',
      width: '1000px'
    });
    dialogRef.afterClosed().subscribe(data => {
      // this.sales_Invoice_Item_Dtls.at(index).patchValue({acc_norms: data["qc_code"]});
    });
  }

  addNewVechile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: 0, };
    const dialogRef = this.dialog.open(AddNewVechilePopUpComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result != '') {
        this.status = false;
        //console.log("Vechile details: "+JSON.stringify(result));
        //this.Service.createVehicle(result).subscribe(data => // changes on 06062022 for create vehicle new model.
        this.Service.createVehiclepopup(result).subscribe(data => {
          // console.log("Vechile details: "+JSON.stringify(data));
          alert("New Vehicle created successfully.");
          this.DropDownListService.getVehiclenoallNew().subscribe(vehicleData => {
            this.veh_nos = vehicleData;
            this.status = true;
          })
        });
      }
    });
  }

  onChangeNewNet(event) {
    let Gross = event.target.value;
    this.userForm.patchValue({ net_weight: Math.abs(Number(Gross) - Number(this.userForm.get("tare_weight").value)).toFixed(3) });
  }

  onChangeNewTare(event) {
    let tarewt = event.target.value;
    let Gross = this.userForm.get("gross_weight").value;

    this.userForm.patchValue({ net_weight: Math.abs(Gross - tarewt).toFixed(3) });



  }

  weighmentFor: any;

  WeightMentFor: any;
  vechileTypeCode: any;
  Weight1: any;
  Weight2: any;



  /* itemListPopUp(index,te)
   {
//alert(index+" / " + te.at(index).get("advice").value)

     if(this.adviceId[index] != null || this.adviceId[index] != undefined && this.adviceId[index] != '')
     {
     
       if(this.weighmentFor == 'Purchase Order' || this.weighmentFor == 'Stock Transfer Unloading' || this.weighmentFor == 'Sales Return')
       { 
         let dialogref=this.dialog.open(UnloadAdviceItemListPopUpComponent, {data: {advice_id: te.at(index).get("advice").value}});
           dialogref.afterClosed().subscribe(result => {});
       }
       if(this.weighmentFor == 'Sale' || this.weighmentFor == 'Stock Transfer Loading' || this.weighmentFor == 'Purchase Return')
       {
         let dialogref=this.dialog.open(LoadingAdviceItemListPopUpComponent, {data: {advice_id: te.at(index).get("advice").value}});
         dialogref.afterClosed().subscribe(result => {});
       }
     }else{alert("Select Vehicle No. First !")}
   }*/

  send() {
    this.userForm.patchValue({
      company_id: localStorage.getItem("company_name"), fin_year: localStorage.getItem("financial_year"),
      username: localStorage.getItem("username")
    });
    this.submitted = true;
    this.status = false;
    console.log("wg for:" + this.userForm.get("wgment_for").value + "///" + this.userForm.get("weight1").value + "///" + this.userForm.get("weight2").value + "///" + this.userForm.get("tw_unit").value)
    if (this.userForm.get("weight_bridge_location").value == 0 || this.userForm.get("weight_bridge_location").value == null || this.userForm.get("weight_bridge_location").value == '') {
      alert("Please Select Weight Bridge Location");
      this.status = true;
    }
    else if (this.userForm.get("wgment_for").value == 0 || this.userForm.get("wgment_for").value == null || this.userForm.get("wgment_for").value == '') {
      alert("Please Select Weighment For");
      this.status = true;
    }
    else if (this.userForm.get("vehicle_id").value == 0 || this.userForm.get("vehicle_id").value == null || this.userForm.get("vehicle_id").value == '') {
      alert("Please Select Vehicle No");
      this.status = true;
    }
    else if (this.userForm.get("nopartyid").value == 0 || this.userForm.get("nopartyid").value == null || this.userForm.get("nopartyid").value == '') {
      alert("Please Enter party Name");
      this.status = true;
    }
    else if (this.userForm.get("noitemid").value == 0 || this.userForm.get("noitemid").value == null || this.userForm.get("noitemid").value == '') {
      alert("Please Enter Item Name");
      this.status = true;
    }
    else if (this.userForm.get("wgment_for").value == 'Loading' && this.userForm.get("weight1").value == 'weight1' && (this.userForm.get("tw_unit").value == 0 || this.userForm.get("tw_unit").value == '' || this.userForm.get("tw_unit").value == null)) {
      alert("Please Select Tare Uom");
      this.status = true;
    }
    else if (this.userForm.get("wgment_for").value == 'Loading' && this.userForm.get("weight2").value == 'weight2' && (this.userForm.get("gw_unit").value == 0 || this.userForm.get("gw_unit").value == '' || this.userForm.get("gw_unit").value == null)) {
      alert("Please Select Gross Uom");
      this.status = true;
    }
    else if (this.userForm.get("wgment_for").value == 'Unloading' && this.userForm.get("weight1").value == 'weight1' && (this.userForm.get("gw_unit").value == 0 || this.userForm.get("gw_unit").value == '' || this.userForm.get("gw_unit").value == null)) {
      alert("Please Select Gross Uom");
      this.status = true;
    }
    else if (this.userForm.get("wgment_for").value == 'Unloading' && this.userForm.get("weight2").value == 'weight2' && (this.userForm.get("tw_unit").value == 0 || this.userForm.get("tw_unit").value == '' || this.userForm.get("tw_unit").value == null)) {
      alert("Please Select Tare Uom");
      this.status = true;
    }
    //  else if(this.userForm.get("digital_weight").value == 0 || this.userForm.get("digital_weight").value == '' || this.userForm.get("digital_weight").value == null)
    //  {
    //    alert("Please Enter Digital Weight");
    //    this.status=true;

    //  }
    else {

      const InputData = this.userForm.getRawValue();
      // console.log("input: "+JSON.stringify(InputData));
      const frmData = new FormData();
      //  console.log(" length "+this.myFiles.length);
      for (let i = 0; i < this.myFiles.length; i++) {

        frmData.append("files", this.myFiles[i]);
        //   console.log();
        if (i == 0) {
          //   console.log(i+",files: "+this.myFiles[i])
        }
      }
      frmData.append("Input", JSON.stringify(InputData));



      // console.log("Form data: "+frmData);
      //file ends here

      this.status = false;
      this.Service.createWeightment(frmData).subscribe(data =>

      //this.Service.createUnloadWeightment(this.userForm.getRawValue()).subscribe( data => 
      {
        //  console.log(this.userForm.value);
        alert("New Unload Weightment created successfully.");
        this.status = true;
        this.userForm.reset();
        // this.ngOnInit();
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


    }

  }

  onUpdate(id, wgmentid, action) {
    this.otherweighmentsave = true;
    this.status = false;
    this.isHidden = true;
    this.action = 'view';
    forkJoin(
      this.DropDownListService.unloadWeightmentRetrive(id),
      this.DropDownListService.unloadWMDtlsRetriveList(wgmentid),
      //this.DropDownListService.getWeighmentCustomUOM(),
      this.DropDownListService.getCustomUOMs("WUOM"),
      this.DropDownListService.getCompanyBUMNCList(this.company_name),
      //this.DropDownListService.supplierNamesList(this.company_name),
      //this.Service.getCustomerBussinessPartner()
      //this.DropDownListService.supplierNamesList(this.company_name),
      this.DropDownListService.supplierNamesNewList(this.company_name),
      this.DropDownListService.newcustomerList(this.company_name),
      this.DropDownListService.getVehiclenoallNew()
    ).subscribe(([wgmntData, wgmntDtls, customUomData, bunitData, supplierData, customerData, vehicleData]) => {

      this.bridge_location = wgmntData['weight_bridge_location'];
      this.cameraserial = wgmntData['wgment_id'];
      this.fetchAndSetImage();  //Camera image Show 

      this.veh_nos = vehicleData;
      this.customList = customUomData;
      this.businesslists = bunitData;
      //console.log("hello here " +wgmntData["wgment_for"])

      //console.log("hello here " + JSON.stringify(wgmntData))

      /* this.DropDownListService.getGetDocuments(wgmntDtls[0].advice).subscribe(docData => {
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
      }); */     // Other Wgt Document not have advice

      // this.onChangeVechileNo = wgmntData['wgment_for'];
      // this.onChangeWeighmentFor(wgmntData['wgment_for'])
      this.onChangeParty(wgmntData["nopartyid"]);

      this.userForm.patchValue(wgmntData);
      if (wgmntData['wgment_charge'] == 0) {
        this.userForm.patchValue({ wgment_charge: "0" });
      }
      else if (wgmntData['wgment_charge'] == 1) {
        this.userForm.patchValue({ wgment_charge: "1" });
        this.onChangeCharge(wgmntData['wgment_charge']);
      }
      else {
        this.userForm.patchValue({ wgment_charge: "0" });
      }

      let i = 0;
      this.add();
      this.party_sl_no = 0;
      while (this.wm_unload_wgmnt_dtls.length)
        this.wm_unload_wgmnt_dtls.removeAt(0);


      this.supplierNames = supplierData;
      this.customerNameList = customerData;

      for (let data1 of wgmntDtls) {
        this.add();
        this.adviceId[i] = data1['advice'];
        this.wm_unload_wgmnt_dtls.at(i).patchValue({
          customer: data1['customer'], supplier: data1['supplier'],
          business_unit: data1['business_unit'], advice_no: data1['advice_no'], wgment_date: data1['wgment_date'], advice: data1['advice']
        });
        i = i + 1;
      }
      this.status = true;
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
    this.DropDownListService.getSecondkataSrlnoCamera(this.bridge_location).subscribe(serialno => {   // bridge location to difference between wb1 & wb2
      console.log("Camera Serial No::"+serialno.sequenceid)
      this.cameraserial = serialno.sequenceid;   //Camera image Show 

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
    }); //Camera image Show 
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
          //var speed = 1200;   //for aayogagro
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

    this.fetchAndSetImage();      //Camera image Show 

    this.userForm.patchValue({ port_value: parseInt(val.substring(2, 10)) });
    let checkweight1: any = this.userForm.get("weight1").value as FormControl;
    let checkweight2: any = this.userForm.get("weight2").value as FormControl;
    this.reference_name = this.userForm.get("wgment_for").value;

    console.log("tuhin here " + checkweight1 + " / " + checkweight2 + " / " + this.reference_name + " / " + this.ref_type_name);
    //reference_name// Unload Advice //ref_type_name// Purchase Order //_weighmentFor Purchase Order //weighmentFor Purchase Order //wgment_for Purchase Order
    //starts here 
    if (this.reference_name == 'Unloading') {
      if (checkweight1 == "weight1" && checkweight2 == "" || checkweight2 == null) {
        console.log("Unloading wt1:" + checkweight1)
        this.userForm.patchValue({ gross_weight: parseInt(val.substring(2, 10)), digital_weight: parseInt(val.substring(2, 10)) });//this line paste
        this._gross_weight = parseInt(val.substring(2, 10));
        //this.userForm.patchValue({net_weight: Math.abs(this._gross_weight ).toFixed(3)});
        this.onChangeGrossUom(this.userForm.get("gw_unit").value);
      }
      if (checkweight1 == "weight1" && checkweight2 == "weight2") {
        console.log("Unloading wt1:" + checkweight1 + " wt2:" + checkweight2)
        this.userForm.patchValue({ tare_weight: parseInt(val.substring(2, 10)), digital_weight: parseInt(val.substring(2, 10)) });//this line paste
        this.onChangeGrossUom(this.userForm.get("tw_unit").value);
        // this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(this.userForm.get("tare_weight").value)).toFixed(3)});
      }
      /* if( this.ref_type_name =='Purchase Order')
        {
            if(checkweight1 =="weight1" && checkweight2 =="" ||checkweight2 ==null)
            {
              console.log("reftype:"+this.ref_type_name+" wt1:"+checkweight1)
             this.userForm.patchValue({gross_weight: parseInt(val.substring(2,10)),digital_weight: parseInt(val.substring(2,10))});//this line paste
             this._gross_weight = parseInt(val.substring(2,10));
             //this.userForm.patchValue({net_weight: Math.abs(this._gross_weight ).toFixed(3)});
             this.onChangeGrossUom(this.userForm.get("gw_unit").value);
            }
            if(checkweight1 =="weight1" && checkweight2 =="weight2")
            {
              console.log("reftype:"+this.ref_type_name+" wt1:"+checkweight1+" wt2:"+checkweight2)
              this.userForm.patchValue({tare_weight: parseInt(val.substring(2,10)),digital_weight: parseInt(val.substring(2,10))});//this line paste
              this.onChangeGrossUom(this.userForm.get("tw_unit").value);
             // this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(this.userForm.get("tare_weight").value)).toFixed(3)});
            }
    
        }
        if( this.ref_type_name =='Open Advice')
        {
              if(checkweight1 =="weight1" && checkweight2 =="" ||checkweight2 ==null)
              {
              this.userForm.patchValue({gross_weight: parseInt(val.substring(2,10)),digital_weight: parseInt(val.substring(2,10))});//this line paste
              this._gross_weight = parseInt(val.substring(2,10));
              this.onChangeGrossUom(this.userForm.get("gw_unit").value);
             // this.userForm.patchValue({net_weight: Math.abs(this._gross_weight ).toFixed(3)});
              }
              if(checkweight1 =="weight1" && checkweight2 =="weight2")
              {
               // console.log("let see here "+parseInt(val.substring(2,10)));
                this.userForm.patchValue({tare_weight: parseInt(val.substring(2,10)),digital_weight: parseInt(val.substring(2,10))});//this line paste
                this.onChangeGrossUom(this.userForm.get("tw_unit").value);
                
               
               // console.log("weight "+this.userForm.get("tare_weight").value + " / " + this.userForm.get("digital_weight").value);
               // this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(this.userForm.get("tare_weight").value)).toFixed(3)});
              }
    
        }
        if( this.ref_type_name =='Sales Return')
        {
          if(checkweight1 =="weight1" && checkweight2 =="" ||checkweight2 ==null)
            {
             this.userForm.patchValue({gross_weight: parseInt(val.substring(2,10)),digital_weight: parseInt(val.substring(2,10))});//this line paste
             this._gross_weight = parseInt(val.substring(2,10));
             //this.userForm.patchValue({net_weight: Math.abs(this._gross_weight ).toFixed(3)});
             this.onChangeGrossUom(this.userForm.get("gw_unit").value);
            }
            if(checkweight1 =="weight1" && checkweight2 =="weight2")
            {
              this.onChangeGrossUom(this.userForm.get("tw_unit").value);
              this.userForm.patchValue({tare_weight: parseInt(val.substring(2,10)),digital_weight: parseInt(val.substring(2,10))});//this line paste
              //this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(this.userForm.get("tare_weight").value)).toFixed(3)});
              this.onChangeGrossUom(this.userForm.get("tw_unit").value);
            }
         
        }   
        if( this.ref_type_name =='Stock Transfer')
        {
              if(checkweight1 =="weight1" && checkweight2 =="" ||checkweight2 ==null)
              {
              this.userForm.patchValue({gross_weight: parseInt(val.substring(2,10)),digital_weight: parseInt(val.substring(2,10))});//this line paste
              this._gross_weight = parseInt(val.substring(2,10));
            //  this.userForm.patchValue({net_weight: Math.abs(this._gross_weight ).toFixed(3)});
            this.onChangeGrossUom(this.userForm.get("gw_unit").value);
              }
              if(checkweight1 =="weight1" && checkweight2 =="weight2")
              {
                this.onChangeGrossUom(this.userForm.get("tw_unit").value);
                this.userForm.patchValue({tare_weight: parseInt(val.substring(2,10)),digital_weight: parseInt(val.substring(2,10))});//this line paste
               // this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(this.userForm.get("tare_weight").value)).toFixed(3)});
               this.onChangeGrossUom(this.userForm.get("tw_unit").value);
              }
    
    
        }  */
    }
    if (this.reference_name == 'Loading') {
      if (checkweight1 == "weight1" && checkweight2 == "" || checkweight2 == null) {
        console.log("Loading wt1:" + checkweight1)
        this.userForm.patchValue({ tare_weight: parseInt(val.substring(2, 10)), digital_weight: parseInt(val.substring(2, 10)) });//this line paste
        this._gross_weight = parseInt(val.substring(2, 10));
        // this.userForm.patchValue({net_weight: Math.abs(this._gross_weight ).toFixed(3)});
        this.onChangeGrossUom(this.userForm.get("tw_unit").value);
      }
      if (checkweight1 == "weight1" && checkweight2 == "weight2") {
        console.log("Loading wt1:" + checkweight1 + " wt2:" + checkweight2)
        this.userForm.patchValue({ gross_weight: parseInt(val.substring(2, 10)), digital_weight: parseInt(val.substring(2, 10)) });//this line paste
        this.onChangeGrossUom(this.userForm.get("gw_unit").value);
        //this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(this.userForm.get("tare_weight").value)).toFixed(3)});
      }

      /*if( this.ref_type_name =='Sales Order')
        {
            if(checkweight1 =="weight1" && checkweight2 =="" ||checkweight2 ==null)
            {
              console.log("reftype:"+this.ref_type_name+" wt1:"+checkweight1)
            this.userForm.patchValue({tare_weight: parseInt(val.substring(2,10)),digital_weight: parseInt(val.substring(2,10))});//this line paste
            this._gross_weight = parseInt(val.substring(2,10));
           // this.userForm.patchValue({net_weight: Math.abs(this._gross_weight ).toFixed(3)});
           this.onChangeGrossUom(this.userForm.get("tw_unit").value);
            }
            if(checkweight1 =="weight1" && checkweight2 =="weight2")
            {
              console.log("reftype:"+this.ref_type_name+" wt1:"+checkweight1+" wt2:"+checkweight2)
              this.userForm.patchValue({gross_weight: parseInt(val.substring(2,10)),digital_weight: parseInt(val.substring(2,10))});//this line paste
              this.onChangeGrossUom(this.userForm.get("gw_unit").value);
              //this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(this.userForm.get("tare_weight").value)).toFixed(3)});
            }
    
        }
        if( this.ref_type_name =='Open Advice')
        {
          
          if(checkweight1 =="weight1" && checkweight2 =="" ||checkweight2 ==null)
          {
            
          this.userForm.patchValue({tare_weight: parseInt(val.substring(2,10)),digital_weight: parseInt(val.substring(2,10))});//this line paste
          this._gross_weight = parseInt(val.substring(2,10));
         // console.log("tuhin tare " + this.userForm.get("tare_weight").value);
         // this.userForm.patchValue({net_weight: Math.abs(this._gross_weight ).toFixed(3)});
         this.onChangeGrossUom(this.userForm.get("tw_unit").value);
          }
          if(checkweight1 =="weight1" && checkweight2 =="weight2")
          {
            
            this.userForm.patchValue({gross_weight: parseInt(val.substring(2,10)),digital_weight: parseInt(val.substring(2,10))});//this line paste
            this.onChangeGrossUom(this.userForm.get("gw_unit").value);
            //this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(this.userForm.get("tare_weight").value)).toFixed(3)});
          }
    
      }
        if( this.ref_type_name =='Purchase Return')
        {
          if(checkweight1 =="weight1" && checkweight2 =="" ||checkweight2 ==null)
          {
          this.userForm.patchValue({tare_weight: parseInt(val.substring(2,10)),digital_weight: parseInt(val.substring(2,10))});//this line paste
          this._gross_weight = parseInt(val.substring(2,10));
         // this.userForm.patchValue({net_weight: Math.abs(this._gross_weight ).toFixed(3)});
         this.onChangeGrossUom(this.userForm.get("tw_unit").value);
          }
          if(checkweight1 =="weight1" && checkweight2 =="weight2")
          {
           // this.onChangeGrossUom(this.userForm.get("gw_unit").value);
            this.userForm.patchValue({gross_weight: parseInt(val.substring(2,10)),digital_weight: parseInt(val.substring(2,10))});//this line paste
           // this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(this.userForm.get("tare_weight").value)).toFixed(3)});
           this.onChangeGrossUom(this.userForm.get("gw_unit").value);
          }
        }
        if( this.ref_type_name =='Stock Transfer')
        {
          if(checkweight1 =="weight1" && checkweight2 =="" ||checkweight2 ==null)
          {
          this.userForm.patchValue({tare_weight: parseInt(val.substring(2,10)),digital_weight: parseInt(val.substring(2,10))});//this line paste
          this._gross_weight = parseInt(val.substring(2,10));
         // this.userForm.patchValue({net_weight: Math.abs(this._gross_weight ).toFixed(3)});
         this.onChangeGrossUom(this.userForm.get("tw_unit").value);
          }
          if(checkweight1 =="weight1" && checkweight2 =="weight2")
          {
            //this.onChangeGrossUom(this.userForm.get("gw_unit").value);
            this.userForm.patchValue({gross_weight: parseInt(val.substring(2,10)),digital_weight: parseInt(val.substring(2,10))});//this line paste
           // this.userForm.patchValue({net_weight: Math.abs(Number(this.userForm.get("gross_weight").value) -  Number(this.userForm.get("tare_weight").value)).toFixed(3)});
           this.onChangeGrossUom(this.userForm.get("gw_unit").value);
          }
    
        } */
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
    let nopartyname1 = this.userForm1.get("nopartyname1").value;
    // let bus_partner1="";
    let finyear = localStorage.getItem("financial_year");

    this.status = false;
    this.DropDownListService.searchOtherWeighmentFast("orderno=" + order1_no + "&fromdate=" + fromdate + "&todate=" + todate + "&nopartyname1=" + nopartyname1 + "&finyear=" + finyear).subscribe(data => {
      //console.log("here data comses " + JSON.stringify(data))
      this.listUnloadWeightment = data;
      this.status = true;

    }, (error) => {
      this.status = true;
      alert("Weighment  Not Found !!!")
      this.listUnloadWeightment = [];
    })
  }

  fetchAndSetImage(): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.images.push(reader.result as string);
    };

    let imagename1 = this.cameraserial + '_1.jpg';
    let imagename2 = this.cameraserial + '_2.jpg';

    this.http
      //.get(this.imgURL+ imagename1, {
      .get(this.imgURL+this.bridge_location+"/"+imagename1, {
        responseType: 'blob',
      })
      .subscribe((img) => {
        reader.readAsDataURL(img);
        this.images = [];
        this.sanitizer.bypassSecurityTrustUrl(
          this.images[0]
        );
        this.http
          //.get(this.imgURL + imagename2, {
          .get(this.imgURL+this.bridge_location+"/"+imagename2, {
            responseType: 'blob',
          })
          .subscribe((img) => {
            console.log(img);
            reader.readAsDataURL(img);
            this.sanitizer.bypassSecurityTrustUrl(
              this.images[1]
            );
          });
      });

    return;
  }

  onViewImg(src: string) {
    let dialogRef = this.dialog.open(ImageViewModalComponent, {
      data: { src },
      backdropClass: "img-backdrop",
      panelClass: "img-panel",
    });
    dialogRef.afterClosed().subscribe();
  }

}
