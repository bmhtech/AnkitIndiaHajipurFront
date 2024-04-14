import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProductionTransactionSpecial } from '../../../../../../Models/ProductionModel/production-transaction-special';
import { MatDialog } from '@angular/material';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { FormArray } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { PackingListPopUpComponent } from '../../../SalesTransaction/components/packing-list-pop-up/packing-list-pop-up.component';
import { InputItemPopupComponent } from '../../components/input-item-popup/input-item-popup.component';
import { formatDate } from '@angular/common';
import { OutputItemPopupComponent } from '../../components/output-item-popup/output-item-popup.component';


@Component({
  selector: 'app-production-transaction-special',
  templateUrl: './production-transaction-special.component.html',
  styleUrls: ['./production-transaction-special.component.scss']
})
export class ProductionTransactionSpecialComponent implements OnInit {

  submitted = false;
  model: ProductionTransactionSpecial = new ProductionTransactionSpecial();
  listProductionTransactionSpecial: ProductionTransactionSpecial[];
  public userForm: FormGroup;
  isHidden = false;
  status = false;
  input_sl_no = 1;
  currentDate: any;
  output_sl_no = 1;
  bunit: any;
  customUOMs: {};
  // isRatio=false;
  //prod_processlist1:any = [];
  // rationapplicablelist:any=[];
  bussiness_unit_list: any = [];
  prod_uomlist: any = [];
  company_name: any;
  seq_no: string;
  productionlist: any = [];
  packingItem: any = [];
  packingItem1: any = [];
  //customUOMs:{};
  ShopFloorList: any = [];
  item_codes: any = [];
  processlist: any = [];
  item_codes1: any = [];
  // _weighmentUom:any;
  // packingItem:any=[];
  selectedPackingItem: any = [];
  productiontransactionspcialsave: boolean = true;
  productiontransactionspcialupdate: boolean = true;
  capacity: any = [];
  _item_code: any;

  itemdisable: boolean = false;
  packingdisable: boolean = false;


  disableoutputitemqty: boolean = false;
  disableoutputpaclqty: boolean = false;
  disableinputitemqty: boolean = false;
  disableinputpackqty: boolean = false;

  inputcapacity: any = [];
  inputtolerance: any = [];

  outputcapacity: any = [];
  outputtolerance: any = [];

  inputpackinguom: any = [];
  intputitemuom: any = [];

  outputpackinguom: any = [];
  outputitemuom: any = [];


  packingqtytotalqty: any;
  itemqtytotalqty: any;
  prodqtytotalqty: any;

  outpackingqtytotalqty: any;
  outitemqtytotalqty: any;
  outprodqtytotalqty: any;

  constructor(public fb: FormBuilder,
    public dialog: MatDialog,
    private Service: Master,
    private DropDownListService: DropdownServiceService) {
    this.userForm = fb.group({
      id: [''],
      prod_trans_code: [''],
      prod_trans_id: [''],
      prod_trans_date: [''],
      prod_process: [''],
      prod_type: [''],
      prod_desc: [''],
      entry_mode: [''],
      company_id: [''],
      fin_year: [''],
      business_unit: [''],
      prod_description: [''],
      shop_floor: [''],
      username: [''],
      process: [''],
      io_ratio: [''],
      dev_percent: [''],

      production_transaction_spl_input_details: this.fb.array([this.fb.group({
        sl_no: this.input_sl_no,
        item: '',
        packing: '',
        packing_uom: '',
        item_uom: '',
        production_uom: '',
        con_factor: '',
        item_qty: '',
        packing_qty: '',
        production_qty: '',
        uom_basedon: '',
        ratio: '',
        deviation: '',
        scrap_packing: '',
        input_qty: '',
      })]),

      production_transaction_spl_output_details: this.fb.array([this.fb.group({
        sl_no: this.output_sl_no,
        item: '',
        packing: '',
        packing_uom: '',
        item_uom: '',
        production_uom: '',
        item_qty: '',
        packing_qty: '',
        production_qty: '',
        con_factor: '',
        uom_basedon: '',
        ratio: '',
        deviation: '',
        output_qty: ''
      })])
    });
  }


  get id() { return this.userForm.get("id") as FormControl }
  get prod_trans_id() { return this.userForm.get("prod_trans_id") as FormControl }
  get prod_trans_code() { return this.userForm.get("prod_trans_code") as FormControl }
  get prod_trans_date() { return this.userForm.get("prod_trans_date") as FormControl }
  get prod_process() { return this.userForm.get("prod_process") as FormControl }
  get entry_mode() { return this.userForm.get("entry_mode") as FormControl }
  get process() { return this.userForm.get("process") as FormControl }

  get io_ratio() { return this.userForm.get("io_ratio") as FormControl }
  get dev_percent() { return this.userForm.get("dev_percent") as FormControl }
  get prod_description() { return this.userForm.get("prod_description") as FormControl }
  get prod_desc() { return this.userForm.get("prod_desc") as FormControl }
  get prod_type() { return this.userForm.get("prod_type") as FormControl }
  get shop_floor() { return this.userForm.get("shop_floor") as FormControl }
  get business_unit() { return this.userForm.get("business_unit") as FormControl }
  get company_id() { return this.userForm.get("company_id") as FormControl }
  get fin_year() { return this.userForm.get("fin_year") as FormControl }
  get production_transaction_spl_input_details() { return this.userForm.get('production_transaction_spl_input_details') as FormArray; }
  get production_transaction_spl_output_details() { return this.userForm.get('production_transaction_spl_output_details') as FormArray; }

  ngOnInit() {
    //For User Role
    let user_role = localStorage.getItem("user_role") + "tuhinabcd" + "production_module";
    this.DropDownListService.getRoleItemMaster(user_role).subscribe(data => {
      let accessdata = JSON.stringify(data);

      this.productiontransactionspcialsave = false;
      this.productiontransactionspcialupdate = false;
      if (accessdata.includes('production_transaction_spc.save')) {
        this.productiontransactionspcialsave = true;
      }
      if (accessdata.includes('production_transaction_spc.update')) {
        this.productiontransactionspcialupdate = true;
      }

    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured please try again....");
      this.ngOnInit()
    });

    this.company_name = localStorage.getItem("company_name");

    // this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');

    this.Service.findAllProdTransSpl().subscribe(data => { this.listProductionTransactionSpecial = data; });

    this.DropDownListService.getCompanyBUMNCList(this.company_name).subscribe(data => { this.bussiness_unit_list = data; });
    this.DropDownListService.getStandardCustomUOM(this.company_name).subscribe(data => { this.customUOMs = data; this.productionlist = data });
    this.DropDownListService.getItemThruSales().subscribe(data => { this.item_codes = data });
    this.DropDownListService.getItemThruProcesse().subscribe(data => { this.item_codes1 = data });

    if (localStorage.getItem("svalue") == 'true') {
      //alert(localStorage.getItem("sid")+"//"+localStorage.getItem("sno")+"//"+localStorage.getItem("saction"));
      this.onUpdate(localStorage.getItem("sid"), localStorage.getItem("sno"), localStorage.getItem("saction"));
    }
    this.status = true;
  }

  showList(s: string) {
    if (this.productiontransactionspcialsave == true && this.productiontransactionspcialupdate == true)//true exist  false not exist 
    {
      if (s == "add") {
        this.isHidden = true;
        this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
        this.userForm.reset(this.ResetAllValues().value);
      }
    }
    if (this.productiontransactionspcialsave == true && this.productiontransactionspcialupdate == false) {
      if (s == "add") {
        this.isHidden = true;
        this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
        this.userForm.reset(this.ResetAllValues().value);
      }
    }

    if (s == "list") {
      this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      this.userForm.patchValue({ indent_date: this.currentDate });
      this.isHidden = false;
      this.userForm.reset(this.ResetAllValues().value);
    }
  }

  ResetAllValues() {
    return this.userForm = this.fb.group({
      id: [''],
      prod_trans_code: [''],
      prod_trans_id: [''],
      prod_trans_date: [''],
      prod_process: [''],
      prod_type: [''],
      prod_desc: [''],
      entry_mode: [''],
      company_id: [''],
      fin_year: [''],
      business_unit: [''],
      prod_description: [''],
      shop_floor: [''],
      username: [''],
      process: [''],
      io_ratio: [''],
      dev_percent: [''],


      production_transaction_spl_input_details: this.fb.array([this.fb.group({
        sl_no: this.input_sl_no,
        item: '',
        packing: '',
        packing_uom: '',
        item_uom: '',
        production_uom: '',
        con_factor: '',
        item_qty: '',
        packing_qty: '',
        production_qty: '',
        uom_basedon: '',
        ratio: '',
        deviation: '',
        scrap_packing: '',
        input_qty: '',
      })]),

      production_transaction_spl_output_details: this.fb.array([this.fb.group({
        sl_no: this.output_sl_no,
        item: '',
        packing: '',
        packing_uom: '',
        item_uom: '',
        production_uom: '',
        con_factor: '',
        item_qty: '',
        packing_qty: '',
        production_qty: '',
        uom_basedon: '',
        ratio: '',
        deviation: '',
        output_qty: '',
      })])
    });
  }

  addInput() {
    this.input_sl_no = this.input_sl_no + 1;
    this.production_transaction_spl_input_details.push(this.fb.group({
      sl_no: this.input_sl_no,
      item: '',
      packing: '',
      packing_uom: '',
      item_uom: '',
      production_uom: '',
      item_qty: '',
      packing_qty: '',
      production_qty: '',
      con_factor: '',
      uom_basedon: '',
      ratio: '',
      deviation: '',
      scrap_packing: '',
      input_qty: '',
    }));
  }

  deleteInput(index) {
    if (this.input_sl_no > 1) {
      this.production_transaction_spl_input_details.removeAt(index);
      this.input_sl_no = this.input_sl_no - 1;
    }
    else {
      this.input_sl_no = 1;
      alert("can't delete all rows");
      this.production_transaction_spl_input_details.at(0).patchValue({ sl_no: this.input_sl_no });

    }
    for (let i = 1; i <= this.input_sl_no; i++)
      this.production_transaction_spl_input_details.at(i - 1).patchValue({ sl_no: i });
  }

  addOutput() {
    this.output_sl_no = this.output_sl_no + 1;
    this.production_transaction_spl_output_details.push(this.fb.group({
      sl_no: this.output_sl_no,
      item: '',
      packing: '',
      packing_uom: '',
      item_uom: '',
      production_uom: '',
      con_factor: '',
      uom_basedon: '',
      item_qty: '',
      packing_qty: '',
      production_qty: '',
      ratio: '',
      deviation: '',
      output_qty: '',
    }));
  }

  deleteOutput(index) {
    if (this.output_sl_no > 1) {
      this.production_transaction_spl_output_details.removeAt(index);
      this.output_sl_no = this.output_sl_no - 1;
    }
    else {
      this.output_sl_no = 1;
      alert("can't delete all rows");
      this.production_transaction_spl_output_details.at(0).patchValue({ sl_no: this.output_sl_no });

    }
    for (let i = 1; i <= this.output_sl_no; i++)
      this.production_transaction_spl_output_details.at(i - 1).patchValue({ sl_no: i });
  }

  onChangeBusinessUnit(event) {
    if (event.length && event != "0") {
      this.status = false;
      this.DropDownListService.getShopFloorThruBU(event).subscribe(data => {
        this.ShopFloorList = data;
        this.status = true;
      });
    }
  }

  SFloor: any;
  Prod_date: any;
  b_unit: any;
  Process: any;
  prod: any;
  onChangeShopFloor(event) {

    this.Prod_date = this.userForm.get("prod_trans_date").value as FormControl;
    this.SFloor = this.userForm.get("shop_floor").value as FormControl;
    this.b_unit = this.userForm.get("business_unit").value as FormControl;
    this.Process = this.userForm.get("prod_process").value as FormControl;
    this.company_name = localStorage.getItem("company_name");
    if (event != "0") {
      this.status = false;
      this.DropDownListService.getProdPlanSplDtls("bunit=" + this.b_unit + "&sfloor=" + event +
        "&company=" + this.company_name).subscribe(data => {
          this.processlist = data;
          this.status = true;
        });
    }

    if (event != 0 && this.b_unit != 0) {
      this.DropDownListService.getPTSSequenceId("prefix=PT" + "&businessunit=" + this.b_unit + "&sfloor=" + event + "&company=" + this.company_name).subscribe(data => { this.seq_no = data.sequenceid; });
    }
  }

  production: any;
  Prod_Type: any;
  Entry_Type: any;


  onChangeProcess(event) {

    this.Prod_date = this.userForm.get("prod_trans_date").value as FormControl;
    this.SFloor = this.userForm.get("shop_floor").value as FormControl;
    this.b_unit = this.userForm.get("business_unit").value as FormControl;
    this.company_name = localStorage.getItem("company_name");

    if (event.length && event != "0") {
      this.status = false;

      this.DropDownListService.getProdPlanSplProcessDtls("bunit=" + this.b_unit + "&sfloor=" + this.SFloor + "&process=" + event + "&company=" + this.company_name).subscribe(data => {
        this.userForm.patchValue({ process: data["process"], prod_description: data["production_name"], prod_desc: data["production"], });
        this.status = true;

        this.DropDownListService.getBomDetails("bunit=" + this.b_unit + "&sfloor=" + this.SFloor + "&bomid=" + data["production"] + "&company=" + this.company_name).subscribe(data1 => {
          this.Prod_Type = data1["prod_type"];
          this.Entry_Type = data1["entry_mode"];

          this.userForm.patchValue({ prod_type: data1["prod_type"], entry_mode: data1["entry_mode"], io_ratio: data1["io_ratio"], dev_percent: data1["dev_percent"] });
          this.status = true;

          this.Service.getBomInputDetails(data["production"]).subscribe(data => { this.item_codes1 = data });
          this.Service.getBomOutputDetails(data["production"]).subscribe(data => { this.item_codes = data });

          if (this.Prod_Type == "Fixed") {

            if (this.Entry_Type == "Input") {
              this.disableoutputitemqty = true;
              this.disableoutputpaclqty = true;

              this.disableinputitemqty = false;
              this.disableinputpackqty = false;
            }
            else if (this.Entry_Type == "Output") {
              this.disableoutputitemqty = false;
              this.disableoutputpaclqty = false;

              this.disableinputitemqty = true;
              this.disableinputpackqty = true;
            }
            else {
              this.disableoutputitemqty = false;
              this.disableoutputpaclqty = false;

              this.disableinputitemqty = false;
              this.disableinputpackqty = false;
            }

            console.log("Fixed")
            //
            this.itemdisable = true;
            this.packingdisable = true;

            //
            forkJoin
              (
                this.Service.getBomInputDetails(data["production"]),
                this.Service.getBomOutputDetails(data["production"]),
              ).subscribe(([InputitemData, Outputitemdata]) => {


                let k = 0;
                this.addInput()
                this.input_sl_no = 0;
                while (this.production_transaction_spl_input_details.length)
                  this.production_transaction_spl_input_details.removeAt(0);
                for (let data1 of InputitemData) {
                  this.status = false;
                  forkJoin(
                    this.DropDownListService.getItemMasterPackMat(data1["item"]),
                    this.DropDownListService.getItemPackUom(data1["item"], data1["packing"], this.company_name)
                  ).subscribe(([packingList, capacityEmptyWt]) => {
                    this.status = true;
                    this.addInput();
                    this.packingItem1[k] = packingList;
                    this.production_transaction_spl_input_details.at(k).patchValue(data1);

                    if (data1["uom_basedon"] == "Packing_Uom")//true means  item entry // false emans packing entry
                    {
                      this.inputpackinguom[k] = false;
                      this.intputitemuom[k] = true;
                    }
                    else {
                      this.inputpackinguom[k] = true;
                      this.intputitemuom[k] = false;
                    }

                    this.inputcapacity[k] = capacityEmptyWt.capacity;
                    this.inputtolerance[k] = capacityEmptyWt["tolerance"];


                    k = k + 1;
                  });
                }

                console.log("Outputitemdata: " + JSON.stringify(Outputitemdata));
                let i = 0;
                this.addOutput()
                this.output_sl_no = 0;
                while (this.production_transaction_spl_output_details.length)
                  this.production_transaction_spl_output_details.removeAt(0);
                for (let data1 of Outputitemdata) {
                  this.status = false;
                  forkJoin(
                    this.DropDownListService.getItemMasterPackMat(data1["item"]),
                    this.DropDownListService.getItemPackUom(data1["item"], data1["packing"], this.company_name)
                  ).subscribe(([packingList, capacityEmptyWt]) => {
                    this.status = true;
                    this.addOutput();
                    this.packingItem[i] = packingList;
                    this.production_transaction_spl_output_details.at(i).patchValue(data1);

                    if (data1["uom_basedon"] == "Packing_Uom")//true means  item entry // false emans packing entry // shift must be  no
                    {
                      this.outputpackinguom[i] = false;
                      this.outputitemuom[i] = true;
                    }
                    else {
                      this.outputpackinguom[i] = true;
                      this.outputitemuom[i] = false;
                    }
                    console.log(" hello " + capacityEmptyWt.capacity)

                    this.outputcapacity[i] = capacityEmptyWt.capacity;
                    this.outputtolerance[i] = capacityEmptyWt["tolerance"];

                    i = i + 1;
                  });
                }
                this.status = true;
              });
          }
          else {
            console.log("Variable")
            if (this.Entry_Type == "Input") {
              this.itemdisable = false;
              this.packingdisable = false;

              this.disableoutputitemqty = true;
              this.disableoutputpaclqty = true;

              this.disableinputitemqty = false;
              this.disableinputpackqty = false;

              this.Service.getBomInputDetails(data["production"]).subscribe(data => { this.item_codes1 = data });
              forkJoin
                (
                  this.Service.getBomOutputDetails(data["production"])
                ).subscribe(([Outputitemdata]) => {

                  let i = 0;
                  this.addOutput()
                  this.output_sl_no = 0;
                  while (this.production_transaction_spl_output_details.length)
                    this.production_transaction_spl_output_details.removeAt(0);
                  for (let data1 of Outputitemdata) {
                    this.status = false;
                    forkJoin(
                      this.DropDownListService.getItemMasterPackMat(data1["item"]),
                      this.DropDownListService.getItemPackUom(data1["item"], data1["packing"], this.company_name)
                    ).subscribe(([packingList, capacityEmptyWt]) => {
                      this.status = true;
                      this.addOutput();
                      this.packingItem[i] = packingList;
                      this.production_transaction_spl_output_details.at(i).patchValue(data1);
                      if (data1["uom_basedon"] == "Packing_Uom")//true means  item entry // false emans packing entry // shift must be  no
                      {
                        this.outputpackinguom[i] = false;
                        this.outputitemuom[i] = true;
                      }
                      else {
                        this.outputpackinguom[i] = true;
                        this.outputitemuom[i] = false;
                      }
                      console.log(" hello " + capacityEmptyWt.capacity)

                      this.outputcapacity[i] = capacityEmptyWt.capacity;
                      this.outputtolerance[i] = capacityEmptyWt["tolerance"];


                      i = i + 1;
                    });
                  }
                  this.status = true;

                });
            }
            else if (this.Entry_Type == "Output") {
              console.log("Output")
              this.itemdisable = false;
              this.packingdisable = false;

              this.disableoutputitemqty = false;
              this.disableoutputpaclqty = false;

              this.disableinputitemqty = true;
              this.disableinputpackqty = true;

              this.Service.getBomOutputDetails(data["production"]).subscribe(data => { this.item_codes = data });

              forkJoin
                (
                  this.Service.getBomInputDetails(data["production"])
                ).subscribe(([InputitemData]) => {

                  console.log("InputitemData: " + JSON.stringify(InputitemData));
                  let k = 0;
                  this.addInput()
                  this.input_sl_no = 0;
                  while (this.production_transaction_spl_input_details.length)
                    this.production_transaction_spl_input_details.removeAt(0);
                  for (let data1 of InputitemData) {
                    this.status = false;
                    forkJoin(
                      this.DropDownListService.getItemMasterPackMat(data1["item"]),
                      this.DropDownListService.getItemPackUom(data1["item"], data1["packing"], this.company_name)
                    ).subscribe(([packingList, capacityEmptyWt]) => {
                      this.status = true;
                      this.addInput();
                      this.packingItem1[k] = packingList;
                      this.production_transaction_spl_input_details.at(k).patchValue(data1);


                      if (data1["uom_basedon"] == "Packing_Uom")//true means  item entry // false emans packing entry
                      {
                        this.inputpackinguom[k] = false;
                        this.intputitemuom[k] = true;
                      }
                      else {
                        this.inputpackinguom[k] = true;
                        this.intputitemuom[k] = false;
                      }

                      this.inputcapacity[k] = capacityEmptyWt.capacity;
                      this.inputtolerance[k] = capacityEmptyWt["tolerance"];

                      k = k + 1;
                    });
                  }
                });
            }
            else if (this.Entry_Type == "Both") {
              this.itemdisable = false;
              this.packingdisable = false;

              this.Service.getBomInputDetails(data["production"]).subscribe(data => { this.item_codes1 = data });
              this.Service.getBomOutputDetails(data["production"]).subscribe(data => { this.item_codes = data });
            }
          }
        })
      });
    }
  }


  onChangeProcess1(b_unit: string, sfloor: string, process: string, company_name: string) {
    if (process != "0") {
      this.status = false;
      this.DropDownListService.getProdPlanSplProcessDtls("bunit=" + b_unit + "&sfloor=" + sfloor +
        "&process=" + process + "&company=" + company_name).subscribe(data => {
          console.log("getProdPlanShiftDetails:  " + JSON.stringify(data));
          this.status = true;

          this.DropDownListService.getBomDetails("bunit=" + this.b_unit + "&sfloor=" + this.SFloor +
            "&bomid=" + data["production"] + "&company=" + this.company_name).subscribe(data1 => {
              this.Prod_Type = data1["prod_type"];
              this.Entry_Type = data1["entry_mode"];
              this.status = true;

              this.Service.getBomInputDetails(data["production"]).subscribe(data => { this.item_codes1 = data });
              this.Service.getBomOutputDetails(data["production"]).subscribe(data => { this.item_codes = data });
            }

            )
        });
    }
  }

  checkUniqueItem(index, itemcode) {
    this.status = false;
    if (itemcode != '0' && itemcode != null && itemcode != '') {
      for (let i = 0; i < this.production_transaction_spl_input_details.length; i++) {
        if (itemcode == this.production_transaction_spl_input_details.at(i).get("item").value &&
          i < index) {
          window.alert("Duplicate Row");
          this.deleteInput(index);
          this.status = true;
        }
      }
    }
  }

  checkUniqueItemOutput(index, itemcode) {
    this.status = false;
    if (itemcode != '0' && itemcode != null && itemcode != '') {
      for (let i = 0; i < this.production_transaction_spl_output_details.length; i++) {
        if (itemcode == this.production_transaction_spl_output_details.at(i).get("item").value &&
          i < index) {
          window.alert("Duplicate Row");
          this.deleteOutput(index);
          this.status = true;
        }
      }
    }
  }


  // onChangeProcess(event)
  // {
  //   //this.Prod_Type = this.userForm.get("prod_type").value as FormControl;
  //   this.Prod_date = this.userForm.get("prod_trans_date").value as FormControl;
  //   this.SFloor = this.userForm.get("shop_floor").value as FormControl;
  //   this.b_unit = this.userForm.get("business_unit").value as FormControl;
  //  // this.Process = this.userForm.get("process").value as FormControl;
  //   this.company_name = localStorage.getItem("company_name");
  //   if(event.length && event != "0")
  //   {
  //     this.status = false;

  //     this.DropDownListService.getProdPlanSplProcessDtls("bunit="+this.b_unit+"&sfloor="+this.SFloor+
  //     "&process="+event+ "&company="+this.company_name).subscribe(data=>
  //     {
  //       console.log("getProcessThruProdPlan:  "+JSON.stringify(data))
  //       // this.ProductionList = data;
  //       this.userForm.patchValue({prod_description: data["production_name"],prod_desc:data["production"]});
  //       this.status = true;

  //       this.DropDownListService.getBomDetails("bunit="+this.b_unit+"&sfloor="+this.SFloor+
  //       "&bomid="+data["production"]+"&company="+this.company_name).subscribe(data1=>
  //       {
  //         this.Prod_Type = data1["prod_type"];
  //         this.userForm.patchValue({prod_type: data1["prod_type"],entry_mode:data1["entry_mode"]});
  //         this.status = true;

  //         if(this.Prod_Type=="Fixed")
  //         {
  //         forkJoin(

  //           this.Service.getBomInputDetails(data["production"]),         
  //           this.Service.getBomOutputDetails(data["production"]),   
  //         ).subscribe(([InputitemData,Outputitemdata])=>
  //           {  

  //              console.log("InputitemData: "+  JSON.stringify(InputitemData));
  //              let k = 0;  
  //              this.addInput()
  //              this.input_sl_no = 0;
  //              while (this.production_transaction_spl_input_details.length) 
  //              this.production_transaction_spl_input_details.removeAt(0);
  //              for(let data1 of InputitemData)
  //              { 
  //                this.status = false;
  //                forkJoin(
  //                  this.DropDownListService.getItemMasterPackMat(data1["item"]),
  //                  this.DropDownListService.getItemPackUom(data1["item"], data1["packing"])
  //                ).subscribe(([packingList, capacityEmptyWt])=>
  //                  {
  //                    this.status = true;
  //                    this.addInput();
  //                    this.packingItem1[k] = packingList;  
  //                    this.production_transaction_spl_input_details.at(k).patchValue(data1);
  //                    k = k + 1;
  //                  });                   
  //                }

  //                console.log("Outputitemdata: "+  JSON.stringify(Outputitemdata));
  //              let i = 0;  
  //              this.addOutput()
  //              this.output_sl_no = 0;
  //              while (this.production_transaction_spl_output_details.length) 
  //              this.production_transaction_spl_output_details.removeAt(0);
  //              for(let data1 of Outputitemdata)
  //              { 
  //                this.status = false;
  //                forkJoin(
  //                  this.DropDownListService.getItemMasterPackMat(data1["item"]),
  //                  this.DropDownListService.getItemPackUom(data1["item"], data1["packing"])
  //                ).subscribe(([packingList, capacityEmptyWt])=>
  //                  {
  //                    this.status = true;
  //                    this.addOutput();
  //                    this.packingItem[i] = packingList;  
  //                    this.production_transaction_spl_output_details.at(i).patchValue(data1);
  //                    i = i + 1;
  //                  });
  //                }
  //                this.status = true;           
  //            });   
  //           }

  //           else
  //           {
  //             this.Service.getBomInputDetails(data["production"]).subscribe(data=>{this.item_codes1=data});
  //             this.Service.getBomOutputDetails(data["production"]).subscribe(data=>{this.item_codes=data});
  //           }
  //        }); 
  //       });  
  //    }
  // }

  onChangePackingItem(index, packingId) {
    this._item_code = this.production_transaction_spl_input_details.at(index).get("item").value as FormControl;
    if (packingId.length) {

      let Production_Id = this.userForm.get("prod_desc").value;

      this.status = false;
      forkJoin(
        this.DropDownListService.getItemNameByIdNew(packingId, this.company_name),
        this.DropDownListService.getItemPackUom(this._item_code, packingId, this.company_name),
        this.DropDownListService.getBomInputDtls(Production_Id, this._item_code, packingId)
      ).subscribe(([data, data1, InputData]) => {
        this.production_transaction_spl_input_details.at(index).patchValue({ packing_uom: data.mstock_unit_name, production_uom: InputData.production_uom, con_factor: InputData.con_factor, uom_basedon: InputData.uom_basedon, ratio: InputData.ratio, deviation: InputData.deviation, scrap_packing: InputData.scrap_packing });
        //this.capacity[index] = data1.capacity;
        this.inputcapacity[index] = data1.capacity;
        this.inputtolerance[index] = data1["tolerance"];

        console.log(this.inputcapacity[index] + " input " + this.inputtolerance[index]);


        if (InputData["uom_basedon"] == "Packing_Uom")//true means  item entry // false emans packing entry
        {
          this.inputpackinguom[index] = false;
          this.intputitemuom[index] = true;
        }
        else {
          this.inputpackinguom[index] = true;
          this.intputitemuom[index] = false;
        }

        this.status = true;
      });
    }
  }

  onChangePackingNameoutput(index, event) {
    if (event.length) {

      let Production_Id = this.userForm.get("prod_desc").value;

      let item = this.production_transaction_spl_output_details.at(index).get("item").value;
      this.status = false;
      forkJoin(
        this.DropDownListService.getItemNameByIdNew(event, this.company_name),
        this.DropDownListService.getItemPackUom(item, event, this.company_name),
        this.DropDownListService.getBomOutputDtls(Production_Id, item, event),
      ).subscribe(([data, data1, OutputData]) => {
        this.production_transaction_spl_output_details.at(index).patchValue({ packing_uom: data.mstock_unit_name, production_uom: OutputData.production_uom, con_factor: OutputData.con_factor, uom_basedon: OutputData.uom_basedon, ratio: OutputData.ratio, deviation: OutputData.deviation });
        //this.capacity[index] = data1.capacity;
        this.outputcapacity[index] = data1.capacity;
        this.outputtolerance[index] = data1["tolerance"];

        console.log(this.outputcapacity[index] + " output " + this.outputtolerance[index])


        if (OutputData["uom_basedon"] == "Packing_Uom")//true means  item entry // false emans packing entry // shift must be  no
        {
          this.outputpackinguom[index] = false;
          this.outputitemuom[index] = true;
        }
        else {
          this.outputpackinguom[index] = true;
          this.outputitemuom[index] = false;
        }

        this.status = true;
      });
    }
  }



  _item_qty: any;
  _packing_qty: any;

  getPackingQty(packingQty, index) {
    this._packing_qty = packingQty.target.value;
    let alluom: any = [];
    alluom = JSON.parse(localStorage.getItem("ALLUOM"));
    //starts 
    if (this.intputitemuom[index] == false)//based on item this.inputshiftreqswtichuomitem[k]=false;
    {

      let itemstatusmin: boolean = false;
      let itemstatus: boolean = false;
      let defaultpackingqty = Math.round(Number(this.production_transaction_spl_input_details.at(index).get("item_qty").value) / Number(this.inputcapacity[index]));
      let minqty: number = (Number(defaultpackingqty) * ((100 - Number(this.inputtolerance[index])) / 100));
      let maxqty: number = (Number(defaultpackingqty) * ((100 + Number(this.inputtolerance[index])) / 100));
      itemstatusmin = Number(packingQty.target.value) >= minqty;
      itemstatus = Number(packingQty.target.value) <= maxqty;

      console.log("check here packingqty " + defaultpackingqty + " / " + minqty + " / " + maxqty)
      if (itemstatus == true && itemstatusmin == true) {
        this.getItemQtyproduction(index);
      }
      else {
        alert("Item Quantity is not Valid according to tolerance.Range must be in between  " + minqty.toFixed(3) + " to " + maxqty.toFixed(3));
        this.production_transaction_spl_input_details.at(index).patchValue({ packing_qty: defaultpackingqty.toFixed(3) });
        this.getItemQtyproduction(index);

      }
    }
    else {

      if (this.production_transaction_spl_input_details.at(index).get("item_uom").value == "PCS") {
        this._item_qty = Math.round(this.inputcapacity[index] * this._packing_qty);
      }
      else {
        alluom.forEach(element => {
          if (element.description == this.production_transaction_spl_input_details.at(index).get("item_uom").value) {
            this._item_qty = Number(this.inputcapacity[index] * this._packing_qty).toFixed(Number(element.decimalv));
          }
        });

      }
      this.production_transaction_spl_input_details.at(index).patchValue({ item_qty: this._item_qty, production_qty: this._item_qty });


      this.getItemQtyproduction(index);

    }

    //ends

  }

  packingcal(itemqty, index) {
    if (this.inputpackinguom[index] == false)//based on packingthis.inputshiftreqswtichuompacking[k]=false;
    {
      if (this.production_transaction_spl_input_details.at(index).get("packing").value == "IM00021")//IM00021//DAFAULT
      {
        this.production_transaction_spl_input_details.at(index).patchValue({ packing_qty: 0 });
      }
      else {
        let itemstatusmin: boolean = false;
        let itemstatus: boolean = false;
        let defaultitemqty: number = Number(this.inputcapacity[index]) * Number(this.production_transaction_spl_input_details.at(index).get("packing_qty").value);
        let minqty: number = (Number(defaultitemqty) * ((100 - Number(this.inputtolerance[index])) / 100));
        let maxqty: number = (Number(defaultitemqty) * ((100 + Number(this.inputtolerance[index])) / 100));
        itemstatusmin = Number(itemqty.target.value) >= minqty;
        itemstatus = Number(itemqty.target.value) <= maxqty;
        console.log("check here itemqty " + defaultitemqty + " / " + minqty + " / " + maxqty)
        if (itemstatus == true && itemstatusmin == true) {
          this.getItemQtyproduction(index);
        }
        else {
          alert("Item Quantity is not Valid according to tolerance.Range must be in between  " + minqty.toFixed(3) + " to " + maxqty.toFixed(3));
          this.production_transaction_spl_input_details.at(index).patchValue({ item_qty: defaultitemqty.toFixed(3) });
          this.getItemQtyproduction(index);
        }
      }
    }
    else//original
    {
      if (this.production_transaction_spl_input_details.at(index).get("packing").value == "IM00021")//IM00021//DAFAULT
      {
        this.production_transaction_spl_input_details.at(index).patchValue({ packing_qty: 0 });
      }
      else {
        let packingQty = Math.round(Number(itemqty.target.value) / Number(this.inputcapacity[index]));
        this.production_transaction_spl_input_details.at(index).patchValue({ packing_qty: packingQty });
      }
      this.getItemQtyproduction(index);
    }

  }

  getPackingQtyoutput(packingQty, index) {
    if (this.outputitemuom[index] == false) {
      let itemstatusmin: boolean = false;
      let itemstatus: boolean = false;
      let defaultpackingqty = Math.round(Number(this.production_transaction_spl_output_details.at(index).get("item_qty").value) / Number(this.outputcapacity[index]));
      let minqty: number = (Number(defaultpackingqty) * ((100 - Number(this.outputtolerance[index])) / 100));
      let maxqty: number = (Number(defaultpackingqty) * ((100 + Number(this.outputtolerance[index])) / 100));
      itemstatusmin = Number(packingQty.target.value) >= minqty;
      itemstatus = Number(packingQty.target.value) <= maxqty;


      //if(itemstatus==true && itemstatusmin ==true)//chanegs bcz 0 on packing cant be tolereated so default 0 is also put under if condition
      if (defaultpackingqty == 0 || (itemstatus == true && itemstatusmin == true)) {

      }
      else {
        alert("Item Quantity is not Valid according to tolerance.Range must be in between  " + minqty.toFixed(3) + " to " + maxqty.toFixed(3));
        this.production_transaction_spl_output_details.at(index).patchValue({ packing_qty: defaultpackingqty.toFixed(3) });

      }
    }
    else {
      let itemqty = Number(packingQty.target.value) * Number(this.outputcapacity[index]);
      this.production_transaction_spl_output_details.at(index).patchValue({ item_qty: itemqty.toFixed(3), production_qty: itemqty.toFixed(3) });
    }
    this.getItemQtyproductionoutput(index)

  }

  packingcaloutputforshiftno(itemqty, index) {
    if (this.outputpackinguom[index] == false)//based on packingthis.inputshiftreqswtichuompacking[k]=false;
    {
      if (this.production_transaction_spl_output_details.at(index).get("packing").value == "IM00021")//IM00021//DAFAULT
      {
        this.production_transaction_spl_output_details.at(index).patchValue({ packing_qty: 0 });
      }
      else {
        let itemstatusmin: boolean = false;
        let itemstatus: boolean = false;
        let defaultitemqty: number = Number(this.outputcapacity[index]) * Number(this.production_transaction_spl_output_details.at(index).get("packing_qty").value);
        let minqty: number = (Number(defaultitemqty) * ((100 - Number(this.outputtolerance[index])) / 100));
        let maxqty: number = (Number(defaultitemqty) * ((100 + Number(this.outputtolerance[index])) / 100));
        itemstatusmin = Number(itemqty.target.value) >= minqty;
        itemstatus = Number(itemqty.target.value) <= maxqty;
        if (itemstatus == true && itemstatusmin == true) {

        }
        else {
          alert("Item Quantity is not Valid according to tolerance.Range must be in between  " + minqty.toFixed(3) + " to " + maxqty.toFixed(3));
          this.production_transaction_spl_output_details.at(index).patchValue({ item_qty: defaultitemqty.toFixed(3) });

        }
      }
    }
    else {
      if (this.production_transaction_spl_output_details.at(index).get("packing").value == "IM00021")//IM00021//DAFAULT
      {
        this.production_transaction_spl_output_details.at(index).patchValue({ packing_qty: 0 });
      }
      else {
        let packingQty = Math.round(Number(itemqty.target.value) / Number(this.outputcapacity[index]));
        this.production_transaction_spl_output_details.at(index).patchValue({ packing_qty: packingQty });
      }
    }

    this.getItemQtyproductionoutput(index)
  }
  onChangeItemName(index, itemId) {
    if (itemId != "0") {

      this.status = false;
      this.production_transaction_spl_input_details.at(index).patchValue({ item: itemId });
      forkJoin(
        this.DropDownListService.getItemMasterPackMat(itemId),
        this.DropDownListService.getItemNameById(itemId, this.company_name),

      ).subscribe(([data1, data]) => {
        this.DropDownListService.getUomName(data.mstock_unit).subscribe(data => {

          this.production_transaction_spl_input_details.at(index).patchValue({ item_uom: data.description, production_uom: data["customuom_id"] });
        });
        this.packingItem1[index] = data1;
        this.status = true;
      });

      this.checkUniqueItem(index, itemId);
    }
  }

  onChangeItemNameoutput(index, itemId) {
    if (itemId != "0") {
      this.status = false;
      this.production_transaction_spl_output_details.at(index).patchValue({ item: itemId });
      forkJoin(
        this.DropDownListService.getItemMasterPackMat(itemId),
        this.DropDownListService.getItemNameById(itemId, this.company_name)
      ).subscribe(([data1, itemdata]) => {
        this.DropDownListService.getUomName(itemdata.mstock_unit).subscribe(data => {
          this.production_transaction_spl_output_details.at(index).patchValue({ item_uom: data.description, production_uom: data["customuom_id"] });
        });
        this.packingItem[index] = data1;
        this.status = true;
      });

      this.checkUniqueItemOutput(index, itemId);
    }
  }

  onUpdate(id: any, prod_trans_id: string, action) {
    //this.productiontransactionspcialsave = true;
    this.userForm.patchValue({ id: id });
    this.status = false;
    this.isHidden = true;
    if (action == "view") {
      this.productiontransactionspcialsave = false;
    }
    if (action == "update") {
      this.productiontransactionspcialsave = true;
    }
    this.packingItem = [];
    this.packingItem1 = [];

    forkJoin(
      this.Service.retriveProdTransSpl(id),
      this.Service.getProdTranSplInputDetails(prod_trans_id),
      this.Service.getProdTranSplOutputDetails(prod_trans_id)

    ).subscribe(([ProdTransData, InputitemData, Outputitemdata]) => {

      this.Service.getBomInputDetails(ProdTransData["prod_desc"]).subscribe(data => { this.item_codes1 = data });
      this.Service.getBomOutputDetails(ProdTransData["prod_desc"]).subscribe(data => { this.item_codes = data });

      this.onChangeBusinessUnit(ProdTransData["business_unit"]);
      this.userForm.patchValue({ business_unit: ProdTransData["business_unit"] });
      this.onChangeShopFloor(ProdTransData["shop_floor"]);

      //this.onChangeProcess1(ProdTransData["business_unit"],ProdTransData["shop_floor"],ProdTransData["prod_process"],ProdTransData["company_id"]);




      this.userForm.patchValue({
        id: ProdTransData["id"], prod_trans_code: ProdTransData["prod_trans_code"], prod_trans_id: ProdTransData["prod_trans_id"],
        prod_trans_date: ProdTransData["prod_trans_date"], business_unit: ProdTransData["business_unit"],
        shop_floor: ProdTransData["shop_floor"], prod_process: ProdTransData["prod_process"], process: ProdTransData["process"],

        prod_desc: ProdTransData["prod_desc"], prod_type: ProdTransData["prod_type"],

        prod_description: ProdTransData["prod_description"], entry_mode: ProdTransData["entry_mode"], company_id: ProdTransData["company_id"],
        fin_year: ProdTransData["fin_year"], username: ProdTransData["username"], dev_percent: ProdTransData["dev_percent"], io_ratio: ProdTransData["io_ratio"]
      });
      console.log("ProdTransData Details: " + JSON.stringify(ProdTransData));

      //console.log("InputitemData: "+  JSON.stringify(InputitemData));
      let k = 0;
      this.addInput()
      this.input_sl_no = 0;
      while (this.production_transaction_spl_input_details.length)
        this.production_transaction_spl_input_details.removeAt(0);
      for (let data1 of InputitemData) {
        this.status = false;
        forkJoin(
          this.DropDownListService.getItemMasterPackMat(data1["item"]),
          this.DropDownListService.getItemPackUom(data1["item"], data1["packing"], this.company_name)
        ).subscribe(([packingList, capacityEmptyWt]) => {
          this.status = true;
          this.addInput();
          this.packingItem1[k] = packingList;
          this.inputcapacity[k] = capacityEmptyWt.capacity;
          this.inputtolerance[k] = capacityEmptyWt["tolerance"];

          //  console.log( this.inputcapacity[k] + " input " + this.inputtolerance[k]);

          if (data1["uom_basedon"] == "Packing_Uom")//true means  item entry // false emans packing entry
          {
            this.inputpackinguom[k] = false;
            this.intputitemuom[k] = true;
          }
          else {
            this.inputpackinguom[k] = true;
            this.intputitemuom[k] = false;
          }

          this.production_transaction_spl_input_details.at(k).patchValue(data1);
          this.getItemQtyproduction(k);
          k = k + 1;
        });

      }

      //   console.log("Outputitemdata: "+  JSON.stringify(Outputitemdata));
      let i = 0;
      this.addOutput()
      this.output_sl_no = 0;
      while (this.production_transaction_spl_output_details.length)
        this.production_transaction_spl_output_details.removeAt(0);
      for (let data1 of Outputitemdata) {
        this.status = false;
        forkJoin(
          this.DropDownListService.getItemMasterPackMat(data1["item"]),
          this.DropDownListService.getItemPackUom(data1["item"], data1["packing"], this.company_name)
        ).subscribe(([packingList, capacityEmptyWt]) => {
          this.status = true;
          this.addOutput();
          this.packingItem[i] = packingList;

          this.outputcapacity[i] = capacityEmptyWt.capacity;
          this.outputtolerance[i] = capacityEmptyWt["tolerance"];

          //  console.log( this.outputcapacity[i] + " output " + this.outputtolerance[i])


          if (data1["uom_basedon"] == "Packing_Uom") {
            this.outputpackinguom[i] = false;
            this.outputitemuom[i] = true;
          }
          else {
            this.outputpackinguom[i] = true;
            this.outputitemuom[i] = false;
          }

          this.production_transaction_spl_output_details.at(i).patchValue(data1);
          this.getItemQtyproductionoutput(i);
          i = i + 1;
        });

      }

      this.status = true;
    });

    if (localStorage.getItem("svalue") == 'true') {
      localStorage.setItem("svalue", 'false');
    }
  }

  Id: any;
  send(value: any) {
    this.Id = this.userForm.get("id").value as FormControl;
    this.userForm.patchValue({
      company_id: localStorage.getItem("company_name"),
      fin_year: localStorage.getItem("financial_year"), username: localStorage.getItem("username")
    });
    this.submitted = true;
    if (!this.userForm.valid) {
      alert('Please fill all fields!')
      return false;
    }
    else {
      if (this.userForm.get("business_unit").value == null || this.userForm.get("business_unit").value == 0) {
        alert("Please Select Bussiness Unit");
        this.status = true;
      }
      else if (this.userForm.get("shop_floor").value == null || this.userForm.get("shop_floor").value == 0) {
        alert("Please Select Shop Floor");
        this.status = true;
      }
      else if (this.userForm.get("prod_process").value == null || this.userForm.get("prod_process").value == 0) {
        alert("Please Select Shift Id");
        this.status = true;
      }
      else if (this.userForm.get("prod_type").value == null || this.userForm.get("prod_type").value == 0) {
        alert("Please Select Production Type");
        this.status = true;
      }
      else if (this.userForm.get("entry_mode").value == null || this.userForm.get("entry_mode").value == 0) {
        alert("Please Select Entry Mode");
        this.status = true;
      }
      else {
        let itemcheck = false;
        let packingcheck = false;
        let parckingqty = false;
        let itemqty = false;
        let opitemcheck = false;
        let oppackingcheck = false;
        let opparckingqty = false;
        let opitemqty = false;

        let totalinputproductionqty: number = 0;
        let totaloutputproductionqty: number = 0;

        for (let b = 0; b < this.production_transaction_spl_input_details.length; b++) {
          if (this.production_transaction_spl_input_details.at(b).get("item").value == null || this.production_transaction_spl_input_details.at(b).get("item").value == 0) {
            itemcheck = true;
          }
          if (this.production_transaction_spl_input_details.at(b).get("packing").value == null || this.production_transaction_spl_input_details.at(b).get("packing").value == 0) {
            packingcheck = true;
          }
          if (this.production_transaction_spl_input_details.at(b).get("packing_qty").value == null || this.production_transaction_spl_input_details.at(b).get("packing_qty").value == 0) {
            parckingqty = true;
          }
          if (this.production_transaction_spl_input_details.at(b).get("item_qty").value == null || this.production_transaction_spl_input_details.at(b).get("item_qty").value == 0) {
            itemqty = true;
          }

          totalinputproductionqty += Number(this.production_transaction_spl_input_details.at(b).get("production_qty").value)
        }

        for (let b = 0; b < this.production_transaction_spl_output_details.length; b++) {
          if (this.production_transaction_spl_output_details.at(b).get("item").value == null || this.production_transaction_spl_output_details.at(b).get("item").value == 0) {
            opitemcheck = true;
          }
          if (this.production_transaction_spl_output_details.at(b).get("packing").value == null || this.production_transaction_spl_output_details.at(b).get("packing").value == 0) {
            oppackingcheck = true;
          }
          if (this.production_transaction_spl_output_details.at(b).get("packing_qty").value == null || this.production_transaction_spl_output_details.at(b).get("packing_qty").value == 0) {
            opparckingqty = true;
          }
          if (this.production_transaction_spl_output_details.at(b).get("item_qty").value == null || this.production_transaction_spl_output_details.at(b).get("item_qty").value == 0) {
            opitemqty = true;
          }

          totaloutputproductionqty += Number(this.production_transaction_spl_output_details.at(b).get("production_qty").value)
        }

        if (itemcheck == true) {
          alert("Please Select ITEM in Input Details Tab!!!"); this.status = true;
        }
        else if (packingcheck == true) {
          alert("Please Select PACKING in Input Details Tab!!!"); this.status = true;
        }
        else if (parckingqty == true) {
          alert("Please Enter PACKING Quantity in Input Details Tab!!!"); this.status = true;
        }
        else if (itemqty == true) {
          alert("Please Enter ITEM Quantity in Input Details Tab!!!"); this.status = true;
        }
        else if (opitemcheck == true) {
          alert("Please Select ITEM in Output Details Tab!!!"); this.status = true;
        }
        else if (oppackingcheck == true) {
          alert("Please Select PACKING in Output Details Tab!!!"); this.status = true;
        }
        else if (opparckingqty == true) {
          alert("Please Enter PACKING Quantity in Output Details Tab!!!"); this.status = true;
        }
        else if (opitemqty == true) {
          alert("Please Enter ITEM Quantity in Output Details Tab!!!"); this.status = true;
        }
        else {

          if (this.userForm.get("entry_mode").value == "Both") {

            let dev_percent = this.userForm.get("dev_percent").value



            console.log("dev_percent: " + dev_percent + " / " + totalinputproductionqty + " / " + this.userForm.get("io_ratio").value);

            let original: number = 0;
            //let originalfig:number=0;

            original = (totalinputproductionqty * Number(this.userForm.get("io_ratio").value)) / 100;
            console.log(" check " + dev_percent + " / " + original + " / " + totalinputproductionqty)

            let minnew: boolean = true;
            let maxnew: boolean = true;

            let max = (Number(original) * (100 + Number(dev_percent)) / 100).toFixed(3);
            let min = (Number(original) * (100 - Number(dev_percent)) / 100).toFixed(3);

            //originalfig=totaloutputproductionqty;
            console.log("Original Fig.: " + original + " // totaloutputproductionqty: " + totaloutputproductionqty);

            minnew = Number(totaloutputproductionqty.toFixed(3)) >= Number(min);
            maxnew = Number(totaloutputproductionqty.toFixed(3)) <= Number(max);

            console.log(" check 1" + max + " / " + min + " / " + minnew + " / " + maxnew + " / " + (100 - Number(dev_percent)) + ' // ' + original)

            // console.log("max:"+max+"min"+min)
            if (minnew == true && maxnew == true) {

              alert("saved successfully ");
              this.status = true;
              if (this.Id > 0) {
                this.status = false;
                this.Service.updateProdTransSpl(this.userForm.getRawValue(), this.Id).subscribe(data => {
                  console.log(this.userForm.value);
                  alert("Production Transaction updated successfully.");
                  this.userForm.reset(this.ResetAllValues().value);
                  //refresh List;
                  this.ngOnInit();
                  this.isHidden = false;
                  this.status = true;
                });
              }
              else {
                this.status = false;
                this.userForm.patchValue({ prod_trans_code: this.seq_no });
                this.Service.createProdTransSpl(this.userForm.getRawValue()).subscribe(data => {
                  console.log(this.userForm.value);
                  alert("Production Transaction created successfully.");
                  this.userForm.reset(this.ResetAllValues().value);
                  //refresh List;
                  this.ngOnInit();
                  this.isHidden = false;
                  this.status = true;
                });

              }


            }
            else {
              alert("Extends Daviation Percentage Value,Please Put Correct Amount with in output " + min + " And " + max);
              this.status = true;
            }

          }
          else {

            alert("saved successfully ");
            this.status = true;

            if (this.Id > 0) {
              this.status = false;
              this.Service.updateProdTransSpl(this.userForm.getRawValue(), this.Id).subscribe(data => {
                console.log(this.userForm.value);
                alert("Production Transaction updated successfully.");
                this.userForm.reset(this.ResetAllValues().value);
                //refresh List;
                this.ngOnInit();
                this.isHidden = false;
                this.status = true;
              });
            }
            else {
              this.status = false;
              this.userForm.patchValue({ prod_trans_code: this.seq_no });

              this.Service.createProdTransSpl(this.userForm.getRawValue()).subscribe(data => {
                console.log(this.userForm.value);
                alert("Production Transaction created successfully.");
                this.userForm.reset(this.ResetAllValues().value);
                //refresh List;
                this.ngOnInit();
                this.isHidden = false;
                this.status = true;
              });

            }

          }
        }

      }
    }
  }


  getItemQtyproduction(index) {

    let totalinputitem = 0;
    let itemId = this.production_transaction_spl_input_details.at(index).get("item").value as FormControl;
    let packingId = this.production_transaction_spl_input_details.at(index).get("packing").value as FormControl;
    let con_fac = this.production_transaction_spl_input_details.at(index).get("con_factor").value as FormControl;
    let packing_qty = this.production_transaction_spl_input_details.at(index).get("packing_qty").value as FormControl;
    let item_qty = this.production_transaction_spl_input_details.at(index).get("item_qty").value as FormControl;



    let pro_qty = Number(item_qty) * Number(con_fac);
    this.production_transaction_spl_input_details.at(index).patchValue({ production_qty: Number(pro_qty).toFixed(3) });



    this.packingqtytotalqty = 0;
    this.itemqtytotalqty = 0;
    this.prodqtytotalqty = 0;

    for (let p = 0; p < this.production_transaction_spl_input_details.length; p++) {
      totalinputitem = Number(totalinputitem) + Number(this.production_transaction_spl_input_details.at(p).get("production_qty").value);

      this.packingqtytotalqty += Number(this.production_transaction_spl_input_details.at(p).get("packing_qty").value);
      this.itemqtytotalqty += Number(this.production_transaction_spl_input_details.at(p).get("item_qty").value);
      this.prodqtytotalqty += Number(this.production_transaction_spl_input_details.at(p).get("production_qty").value);
    }

    this.packingqtytotalqty = Number(this.packingqtytotalqty.toFixed(3));

    //console.log (" test check Avijit: "+ this.packingqtytotalqty.toFixed(3));

    if (this.userForm.get("entry_mode").value == 'Both') {
      this.outpackingqtytotalqty = 0;
      this.outitemqtytotalqty = 0;
      this.outprodqtytotalqty = 0;
      for (let q = 0; q < this.production_transaction_spl_output_details.length; q++) {


        this.outpackingqtytotalqty += Number(this.production_transaction_spl_output_details.at(q).get("packing_qty").value);
        this.outitemqtytotalqty += Number(this.production_transaction_spl_output_details.at(q).get("item_qty").value);
        this.outprodqtytotalqty += Number(this.production_transaction_spl_output_details.at(q).get("production_qty").value);

      }


    }
    else {
      //console.log(" io ratio tuhin here "+this.userForm.get("io_ratio").value)
      let ioratiototal = (Number(totalinputitem) * Number(this.userForm.get("io_ratio").value)) / 100;
      this.outpackingqtytotalqty = 0;
      this.outitemqtytotalqty = 0;
      this.outprodqtytotalqty = 0;

      for (let q = 0; q < this.production_transaction_spl_output_details.length; q++) {
        let out_production = Number(ioratiototal) * Number(this.production_transaction_spl_output_details.at(q).get("ratio").value) / 100;

        let outitemqty = Number(out_production) / Number(this.production_transaction_spl_output_details.at(q).get("con_factor").value);

        let outpacking = Math.round(Number(outitemqty) / Number(this.outputcapacity[q]));

        console.log(outitemqty + " / " + this.outputcapacity[q] + " / " + out_production + " / " + ioratiototal)
        console.log(this.production_transaction_spl_output_details.at(q).get("ratio").value + " / " + this.production_transaction_spl_output_details.at(q).get("con_factor").value)
        this.production_transaction_spl_output_details.at(q).patchValue({
          production_qty: Number(out_production).toFixed(3)
          , item_qty: Number(outitemqty).toFixed(3), packing_qty: outpacking, deviation_production_qty: Number(out_production).toFixed(3)
        });

        this.outpackingqtytotalqty += Number(outpacking);
        this.outitemqtytotalqty += Number(outitemqty);
        this.outprodqtytotalqty += Number(out_production);

      }

    }
    // console.log("getItemQtyproduction "+ this.prodqtytotalqty+"//"+this.outprodqtytotalqty)
  }

  getItemQtyproductionoutput(index) {
    // console.log(" hi tuhin output ")
    let totalinputitem = 0;
    let itemId = this.production_transaction_spl_output_details.at(index).get("item").value as FormControl;
    let packingId = this.production_transaction_spl_output_details.at(index).get("packing").value as FormControl;
    let con_fac = this.production_transaction_spl_output_details.at(index).get("con_factor").value as FormControl;
    let packing_qty = this.production_transaction_spl_output_details.at(index).get("packing_qty").value as FormControl;
    let item_qty = this.production_transaction_spl_output_details.at(index).get("item_qty").value as FormControl;


    this.outpackingqtytotalqty = 0;
    this.outitemqtytotalqty = 0;
    this.outprodqtytotalqty = 0;

    this.packingqtytotalqty = 0;
    this.itemqtytotalqty = 0;
    this.prodqtytotalqty = 0;



    let pro_qty = Number(item_qty) * Number(con_fac);
    this.production_transaction_spl_output_details.at(index).patchValue({ production_qty: Number(pro_qty).toFixed(3) });

    for (let p = 0; p < this.production_transaction_spl_output_details.length; p++) {
      totalinputitem = Number(totalinputitem) + Number(this.production_transaction_spl_output_details.at(p).get("production_qty").value);
      this.outpackingqtytotalqty += Number(this.production_transaction_spl_output_details.at(p).get("packing_qty").value);
      this.outitemqtytotalqty += Number(this.production_transaction_spl_output_details.at(p).get("item_qty").value);
      this.outprodqtytotalqty += Number(this.production_transaction_spl_output_details.at(p).get("production_qty").value);
    }
    if (this.userForm.get("entry_mode").value == 'Both') {
      for (let q = 0; q < this.production_transaction_spl_input_details.length; q++) {
        this.packingqtytotalqty += Number(this.production_transaction_spl_input_details.at(q).get("packing_qty").value);
        this.itemqtytotalqty += Number(this.production_transaction_spl_input_details.at(q).get("item_qty").value);
        this.prodqtytotalqty += Number(this.production_transaction_spl_input_details.at(q).get("production_qty").value);
      }
    }
    else {

      let ioratiototal = (Number(totalinputitem) * 100 / Number(this.userForm.get("io_ratio").value));
      for (let q = 0; q < this.production_transaction_spl_input_details.length; q++) {
        let outitemId = this.production_transaction_spl_input_details.at(q).get("item").value as FormControl;
        let outpackingId = this.production_transaction_spl_input_details.at(q).get("packing").value as FormControl;
        // this.DropDownListService.getItemPackUom(this.outitemId, this.outpackingId,this.company_name).subscribe((capacitydata)=>
        //  {  

        let out_production = Number(ioratiototal) * Number(this.production_transaction_spl_input_details.at(q).get("ratio").value) / 100;

        let outitemqty = Number(out_production) / Number(this.production_transaction_spl_input_details.at(q).get("con_factor").value);

        let outpacking = Math.round(Number(outitemqty) / Number(this.inputcapacity[q]));
        if (this.production_transaction_spl_input_details.at(q).get("packing").value == "IM00021") {
          this.production_transaction_spl_input_details.at(q).patchValue({ production_qty: Number(out_production).toFixed(3), item_qty: Number(outitemqty).toFixed(3), packing_qty: 0, deviation_production_qty: Number(out_production).toFixed(3) });




          this.packingqtytotalqty += Number(this.production_transaction_spl_input_details.at(q).get("packing_qty").value);
          this.itemqtytotalqty += Number(this.production_transaction_spl_input_details.at(q).get("item_qty").value);
          this.prodqtytotalqty += Number(this.production_transaction_spl_input_details.at(q).get("production_qty").value);
        }
        else {


          this.production_transaction_spl_input_details.at(q).patchValue({ production_qty: Number(out_production).toFixed(3), item_qty: Number(outitemqty).toFixed(3), packing_qty: outpacking, deviation_production_qty: Number(out_production).toFixed(3) });

          this.packingqtytotalqty += Number(this.production_transaction_spl_input_details.at(q).get("packing_qty").value);
          this.itemqtytotalqty += Number(this.production_transaction_spl_input_details.at(q).get("item_qty").value);
          this.prodqtytotalqty += Number(this.production_transaction_spl_input_details.at(q).get("production_qty").value);
        }

        //  });


      }
      // console.log(" check here plz prod "+ this.prodqtytotalqty)
    }
    //console.log("getItemQtyproductionoutput "+ this.prodqtytotalqty+"//"+this.outprodqtytotalqty)
  }


  posting(prod_trans_id,id,action) {

      if(action=='Posting')
      {
        this.Service.Prodtransaction_spl_Posting(prod_trans_id,id).subscribe(data=>
        {
          console.log("export :: "+data["status"])
              if(data["status"] =='Done')
              {
                alert("Data has been Exported Sucessfully !!!!!!!!!!!!! ");
              }
              else
              {
                alert("Data Didn't Exported  !!!!!!!!!!!!! ");
              }
              this.ngOnInit();
              this.status = true;
        })
      }
      if(action=='Undo')
      {
        alert
        if(confirm("Are you sure to Posting Undo Of this Special Production ?"))
        {
          if(confirm("First Delete This Special Production From Tally!!!"))
          {
            this.Service.prodtransaction_spl_Posting_Undo(id,localStorage.getItem("username")).subscribe(data=>
              {
                if(data["status"] =='Done')
                {
                  alert("Special Production Posting Undo Sucessfully !!!!!!!!!!!!! ");
                }
                else
                {
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
}
