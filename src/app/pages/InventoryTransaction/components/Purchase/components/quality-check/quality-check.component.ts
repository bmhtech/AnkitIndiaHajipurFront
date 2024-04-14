import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QualityCheck } from '../../../../../../Models/transaction/PurchaseTransaction/QualityCheck';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PurchaseModuleServiceService } from '../../../../../../service/purchase-module-service.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { formatDate } from '@angular/common';
import { UnloadAdviceWithoutpoPopupComponent } from '../unload-advice-withoutpo-popup/unload-advice-withoutpo-popup.component';
import { UnloadAdviceWithpoPopupComponent } from '../unload-advice-withpo-popup/unload-advice-withpo-popup.component';
import { QualityCheckQCPopUpComponent } from '../../components/quality-check-qcpop-up/quality-check-qcpop-up.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-quality-check',
  templateUrl: './quality-check.component.html',
  styleUrls: ['./quality-check.component.scss']
})
export class QualityCheckComponent implements OnInit {

  submitted = false;
  public userForm: FormGroup;
  public userForm1: FormGroup;
  model: QualityCheck = new QualityCheck();
  listQualityCheck: QualityCheck[];
  Id: any;
  isHidden = false;
  item_codes: any = [];
  itemtypes: {};
  item_sl_no = 1;
  seq_no: string;
  bussiness_unit_list: any = [];
  currentDate: any;
  warehouses: any = [];
  company_name: any;
  supplierNames: {};
  employeeNames: {};
  packingItem: any = [];
  referenceTypeList: any = [];
  customUOMDyns: {};
  qualitychecksave: boolean = true;
  veh_nos: any = [];

  constructor(public fb: FormBuilder, private Service: PurchaseModuleServiceService,
    private DropDownListService: DropdownServiceService,
    private dialog: MatDialog) {
    this.userForm = fb.group({
      id: [''],
      qcno: [''],
      qc_date: [''],
      supplier_name: [''],
      qc_by: [''],
      item_type: [''],
      item_sub_type: [''],
      ref_type: [''],
      business_unit: [''],
      approved_by: [''],
      vehicle_id: [''],
      per_obs_status: [''],
      referenceid: [''],
      company_id: [''],
      fin_year: [''],
      username: [''],

      pur_Quality_Check_Details: this.fb.array([this.fb.group({
        sl_no: this.item_sl_no,
        item_code: '',
        quantity: '',
        uom: '',
        packing: '',
        s_qty: '',
        s_uom: '',
        warehouse: '',
        stack: '',
        qc_status: '',
        qc: '',
        qc_id: '',

        pur_Quality_Check_Details_QcDetails: this.fb.array([this.fb.group({
          sl_no: '',
          qc_code: '',
          qc_param: '',
          cal_basis: '',
          basis_amt_UoM: '',
          min: '',
          max: '',
          sample: '',
          observation: ''

        })])

      })])
    });
    this.userForm1 = fb.group(
      {
        vehicle_id1: [''],
        fromdate: [''],
        todate: [''],
      });
  }

  get vehicle_id1() { return this.userForm1.get("vehicle_id1") as FormControl }
  get fromdate() { return this.userForm1.get("fromdate") as FormControl }
  get todate() { return this.userForm1.get("todate") as FormControl }

  get id() { return this.userForm.get("id") as FormControl }
  get business_unit() { return this.userForm.get("business_unit") as FormControl }
  get qcno() { return this.userForm.get("qcno") as FormControl }
  get qc_date() { return this.userForm.get("qc_date") as FormControl }
  get supplier_name() { return this.userForm.get("supplier_name") as FormControl }
  get item_type() { return this.userForm.get("item_type") as FormControl }
  get item_sub_type() { return this.userForm.get("item_sub_type") as FormControl }
  get ref_type() { return this.userForm.get("ref_type") as FormControl }
  get qc_by() { return this.userForm.get("qc_by") as FormControl }
  get approved_by() { return this.userForm.get("approved_by") as FormControl }
  get vehicle_id() { return this.userForm.get("vehicle_id") as FormControl }
  get per_obs_status() { return this.userForm.get("per_obs_status") as FormControl }
  get referenceid() { return this.userForm.get("referenceid") as FormControl }
  get pur_Quality_Check_Details_QcDetails() { return (<FormArray>(<FormGroup>this.userForm.get('pur_Quality_Check_Details_QcDetails')).get('pur_Quality_Check_Details_QcDetails')).controls; };


  get pur_Quality_Check_Details() {
    return this.userForm.get('pur_Quality_Check_Details') as FormArray;
  }

  itemCode: any;
  qcId: any;
  showPopUp2(index) {
    let QcDetails: any = [];
    this.Id = this.userForm.get("id").value;
    console.log("QC ACTION Pop :: " + this.actionType)
    this.qcId = this.pur_Quality_Check_Details.at(index).get('qc_id').value as FormControl;
    const dialogRef = this.dialog.open(QualityCheckQCPopUpComponent, {
      data: {
        qc_id: this.qcId, Id: this.Id, action: this.actionType,
        QcDetails: (<FormArray>(<FormGroup>(<FormArray>this.userForm.controls['pur_Quality_Check_Details'])
          .controls[index]).controls['pur_Quality_Check_Details_QcDetails']).value
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log(JSON.stringify(data))

      if (data != '') {

        while ((<FormArray>(<FormGroup>(<FormArray>this.userForm.controls['pur_Quality_Check_Details'])
          .controls[index]).controls['pur_Quality_Check_Details_QcDetails']).length)

          (<FormArray>(<FormGroup>(<FormArray>this.userForm.controls['pur_Quality_Check_Details'])
            .controls[index]).controls['pur_Quality_Check_Details_QcDetails']).removeAt(0);

        for (let data1 of data.QcDetails) {
          this.addQcDetails(index, data1);

        }
      }


    });
  }


  addQcDetails(userIndex: number, data?: any) {

    //console.log('userIndex', userIndex, '-------', 'data', data);

    let fg = this.fb.group({
      sl_no: data.sl_no,
      qc_code: data.qc_code,
      qc_param: data.qc_param,
      cal_basis: data.cal_basis,
      basis_amt_UoM: data.basis_amt_UoM,
      min: data.min,
      max: data.max,
      sample: data.sample,
      observation: data.observation,
      out_qc_param: data.out_qc_param,
      master_observation: data.master_observation,
      qc_remarks: data.qc_remarks
    });

    (<FormArray>(<FormGroup>(<FormArray>this.userForm.controls['pur_Quality_Check_Details'])
      .controls[userIndex]).controls['pur_Quality_Check_Details_QcDetails']).push(fg);

  }

  status = false;
  ngOnInit() {
    //For User Role
    let accessdata = JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
    this.qualitychecksave = false;
    this.actionType = "";
    if (accessdata.includes('quality_check.save')) {
      this.qualitychecksave = true;
    }
    this.company_name = localStorage.getItem("company_name");
    //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
    forkJoin(
      this.DropDownListService.getSequenceId("QCN"),
      this.DropDownListService.getCompanyBUMNCList(this.company_name),
      this.DropDownListService.getItemThruPurchasenew(),
      //this.Service.getPurchaseQualityCheck(),
      this.DropDownListService.getQClist(localStorage.getItem("financial_year")),
      this.DropDownListService.itemTypeList(this.company_name),
      this.DropDownListService.supplierNamesNewList(this.company_name),
      this.DropDownListService.employeeNamesList(this.company_name),
      this.DropDownListService.customUOMList(),
      this.DropDownListService.getVehiclenoallNew()
    ).subscribe(([seqdata, budata, itemdata, qclistdata, itemtypedata, supplierdata, empdata, uomdata, vehicle]) => {
      console.log("seqdata::::" + JSON.stringify(qclistdata))
      this.seq_no = seqdata.sequenceid;
      this.bussiness_unit_list = budata;
      this.item_codes = itemdata;
      this.listQualityCheck = qclistdata;
      this.itemtypes = itemtypedata;
      this.supplierNames = supplierdata;
      this.employeeNames = empdata;
      this.customUOMDyns = uomdata;
      this.veh_nos = vehicle;
    });

    this.referenceTypeList = [{ "name": "Unload Advice With PO", "value": "Unload Advice With PO" },
    { "name": "Unload Advice Without PO", "value": "Unload Advice Without PO" }];
    this.status = true;
  }

  showList(s: string) {

    if (s == "add") {
      this.isHidden = true;
      this.actionType = "";
    }
    if (s == "list") {
      this.isHidden = false;
      this.userForm.reset();
      this.actionType = "";
    }
  }

  add() {
    this.item_sl_no = this.item_sl_no + 1;
    this.pur_Quality_Check_Details.push(this.fb.group({
      sl_no: this.item_sl_no,
      item_code: '',
      quantity: '',
      uom: '',
      packing: '',
      s_qty: '',
      s_uom: '',
      warehouse: '',
      stack: '',
      qc_status: '',
      qc: '',
      qc_id: '',

      pur_Quality_Check_Details_QcDetails: this.fb.array([this.fb.group({
        sl_no: '',
        qc_code: '',
        qc_param: '',
        cal_basis: '',
        basis_amt_UoM: '',
        min: '',
        max: '',
        sample: '',
        observation: ''

      })])
    }));
  }

  delete(index) {
    if (this.item_sl_no > 1) {
      this.pur_Quality_Check_Details.removeAt(index);
      this.item_sl_no = this.item_sl_no - 1;
      this.packingItem[index + 1] = this.packingItem[index];
    }
    else {
      this.item_sl_no = 1;
      alert("can't delete all rows");
      this.pur_Quality_Check_Details.reset();
      this.pur_Quality_Check_Details.at(0).patchValue({ sl_no: this.item_sl_no });
      //this.packingItem[index] = [];
    }
    for (let i = 1; i <= this.item_sl_no; i++)
      this.pur_Quality_Check_Details.at(i - 1).patchValue({ sl_no: i });
  }
  refNo = false;
  _referenceNo: any;
  openbuttonstatus(referenceNo: string) {
    if (referenceNo == "Unload Advice Without PO") {
      this.refNo = true;
      this._referenceNo = referenceNo;
    }
    else if (referenceNo == "Unload Advice With PO") {
      this.refNo = true;
      this._referenceNo = referenceNo;
    }
    else { this.refNo = false; }
  }

  onChangeBusinessUnit(b_id: string) {
    if (b_id != "0") {
      this.status = false;
      this.DropDownListService.getWHListbyBUnit(b_id).subscribe(data1 => {
        this.warehouses = data1;
        this.status = true;
      });
    }
  }
  stackList: any = [];
  onChangeWarehouse(warehouse_code, index) {
    if (warehouse_code != "0") {
      this.status = false;
      /*  this.DropDownListService.getBinDescByWarehouse(warehouse_code).subscribe(data=>
       {      
         this.stackList[index]=data ;  
         this.status=true; 
       }); */
      this.DropDownListService.getStackNoByWarehouse(warehouse_code).subscribe(data1 => {
        console.log("stackListData: " + JSON.stringify(data1))
        this.status = true;
        this.stackList[index] = data1;
      });
    }
  }

  unloadingAdvId: any;
  reference_type: any;
  unloadingAdvNo: any;
  show_Row = false;
  onClickShow() {
    this.reference_type = this.userForm.get("ref_type").value as FormControl;
    if (this.reference_type == "Unload Advice Without PO") {
      const dialogRef = this.dialog.open(UnloadAdviceWithoutpoPopupComponent);
      dialogRef.afterClosed().subscribe(data => {
        this.packingItem = [];
        let k = 0;
        this.stackList = [];
        this.item_sl_no = 0;
        while (this.pur_Quality_Check_Details.length && data.length > 0)
          this.pur_Quality_Check_Details.removeAt(0);
        this.pur_Quality_Check_Details.reset();

        for (let data1 of data) {
          if (data1.checkbox == true) {
            this.status = false;
            this.unloadingAdvId = data1["unadviceid"];
            this.unloadingAdvNo = data1["unadviceno"];
            this.DropDownListService.getItemMasterPackMat(data1.item_code).subscribe(packingList => {
              this.DropDownListService.getBinDescByWarehouse(data1.warehouse).subscribe(warehouseList => {
                this.stackList[k] = warehouseList;
                this.status = true;
                this.packingItem[k] = packingList;
                this.add();
                this.pur_Quality_Check_Details.at(k).patchValue(
                  {
                    item_code: data1.item_code, packing: data1.packing,
                    s_qty: data1.s_qty, s_uom: data1.s_uom, quantity: data1.quantity,
                    uom: data1.uom, qc: data1.qc_norms, qc_id: data1.qc_norms
                  });
                k = k + 1;
              });
            });
            // this.DropDownListService.getUnloadDetails(this.unloadingAdvId).subscribe(data=>
            // console.log(this.unloadingAdvId+"data::"+JSON.stringify(data))
            this.DropDownListService.getUnloadDetailsFastApi(this.unloadingAdvId).subscribe(data => {
              //console.log("data::"+JSON.stringify(data))
              this.userForm.patchValue({
                item_type: data["item_type"],
                item_sub_type: data["item_subtype"],
                business_unit: data["business_unit"],
                supplier_name: data["busi_partner"],
                vehicle_id: data["vehicle_id"],
                referenceid: this.unloadingAdvId
              });
            });

            //this.DropDownListService.getUnloadDetails(this.unloadingAdvId).subscribe(data=>
            this.DropDownListService.getUnloadDetailsFastApi(this.unloadingAdvId).subscribe(data => { this.onChangeBusinessUnit(data["business_unit"]); });
          }
        }

      });
    }
    if (this.reference_type == "Unload Advice With PO") {
      const dialogRef = this.dialog.open(UnloadAdviceWithpoPopupComponent);
      dialogRef.afterClosed().subscribe(data => {
        this.packingItem = [];
        let k = 0;
        this.stackList = [];
        this.item_sl_no = 0;
        while (this.pur_Quality_Check_Details.length && data.length > 0)
          this.pur_Quality_Check_Details.removeAt(0);
        this.pur_Quality_Check_Details.reset();

        for (let data1 of data) {
          if (data1.checkbox == true) {
            this.status = false;
            this.unloadingAdvId = data1["unadviceid"];
            this.unloadingAdvNo = data1["unadviceno"];
            this.DropDownListService.getItemMasterPackMat(data1.item_code).subscribe(packingList => {
              this.DropDownListService.getBinDescByWarehouse(data1.warehouse).subscribe(warehouseList => {
                this.stackList[k] = warehouseList;
                this.status = true;
                this.packingItem[k] = packingList;
                this.add();
                this.pur_Quality_Check_Details.at(k).patchValue(
                  {
                    item_code: data1.item_code, packing: data1.packing,
                    s_qty: data1.s_qty, s_uom: data1.s_uom, quantity: data1.quantity,
                    uom: data1.uom, qc: data1.qc_norms, qc_id: data1.qc_norms
                  });
                k = k + 1;
              });
            });
          }
          //this.DropDownListService.getUnloadDetails(this.unloadingAdvId).subscribe(data=>
          this.DropDownListService.getUnloadDetailsFastApi(this.unloadingAdvId).subscribe(data => {
            this.userForm.patchValue({
              item_type: data["item_type"],
              item_sub_type: data["item_subtype"],
              business_unit: data["business_unit"],
              supplier_name: data["busi_partner"],
              vehicle_id: data["vehicle_id"],
              referenceid: this.unloadingAdvId
            });
          });
        }
        //this.DropDownListService.getUnloadDetails(this.unloadingAdvId).subscribe(data=>
        this.DropDownListService.getUnloadDetailsFastApi(this.unloadingAdvId).subscribe(data => { this.onChangeBusinessUnit(data["business_unit"]); });

      });
    }
  }

  itemId: any;
  onchangeItemName(index, event) {
    if (event) {
      this.status = false;
      this.itemId = event.target.value;
      this.DropDownListService.getItemNameById(this.itemId, this.company_name).subscribe(data => {

        this.DropDownListService.getUomName(data.mstock_unit).subscribe(data => { this.pur_Quality_Check_Details.at(index).patchValue({ uom: data.description }); });

        this.DropDownListService.getItemMasterPackMat(this.itemId).subscribe(data1 => {
          this.packingItem[index] = data1;
        });

        this.DropDownListService.getItemQCDetails(this.itemId, this.company_name).subscribe(data => {
          this.pur_Quality_Check_Details.at(index).patchValue({ qc: data[0].qc_code, qc_id: data[0].qc_id });
        });

        this.status = true;
      });
    }
  }
  capacity: any;
  packingQty: any;
  empty_bag_wt: any;
  onchangePackingItem(index, event,) {
    if (event) {
      this.status = false;
      this.itemId = this.pur_Quality_Check_Details.at(index).get("item_code").value as FormControl;
      this.DropDownListService.getItemPackUom(this.itemId, event.target.value, this.company_name).subscribe(data => {
        this.capacity = data.capacity;
        this.pur_Quality_Check_Details.at(index).patchValue({ s_uom: data.uom1, item_qty: this.capacity * this.packingQty });
        this.status = true;
      });

    }
  }
  calItemQty(packing_qty, index) {
    this.pur_Quality_Check_Details.at(index).patchValue({
      quantity: this.capacity * packing_qty.target.value,
      mat_wt: this.capacity * packing_qty.target.value - this.empty_bag_wt
    });
  }


  send() {
    this.Id = this.userForm.get("id").value;
    this.userForm.patchValue({
      qc_date: this.currentDate, qcno: this.seq_no,
      company_id: localStorage.getItem("company_name"), fin_year: localStorage.getItem("financial_year"),
      username: localStorage.getItem("username")
    });

    console.log("Check : " + this.userForm.get("per_obs_status").value)
    this.submitted = true;
    if (!this.userForm.valid) {
      alert('Please fill all fields!')
      return false;
    }
    else if (this.userForm.get("per_obs_status").value == "" || this.userForm.get("per_obs_status").value == "0" || this.userForm.get("per_obs_status").value == null || this.userForm.get("per_obs_status").value == "NA") {
      alert("Please Select Peripheral Observation of QC....");
      this.status = true;
    }
    else {
      this.status = false;
      if (this.Id > 0) {
        this.Service.updatePurchaseQualityCheck(this.userForm.getRawValue(), this.Id)
          .subscribe(data => {
            alert("Quality Check Updated successfully.");
            this.userForm.reset();
            this.isHidden = false;
            this.showList('list');
            this.ngOnInit();
            this.status = true;
          }, (error) => {
            this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured Quality Check !!! please Reload the page and try again....");
          });
      }
      else {
        this.Service.createPurchaseQualityCheck(this.userForm.getRawValue())
          .subscribe(data => {
            alert("New Quality Check created successfully.");
            this.userForm.reset();
            this.isHidden = false;
            this.showList('list');
            this.ngOnInit();
            this.status = true;
          }, (error) => {
            this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured Quality Check !!! please Reload the page and try again....");
          });
      }
      /*   this.Service.createPurchaseQualityCheck(this.userForm.value).subscribe( data => 
            {
              console.log(this.userForm.getRawValue());
              alert("New Quality Check created successfully.");
              this.userForm.reset();
              this.status = true;
              //refresh List;
              this.DropDownListService.getItemThruPurchase().subscribe(data=>{this.item_codes = data;});
              this.Service.getPurchaseQualityCheck().subscribe(data=>{this.listQualityCheck  = data;});
              this.DropDownListService.getSequenceId("QCN").subscribe(data=>{this.seq_no = data.sequenceid;}); 
              this.DropDownListService.getCompanyBUMNCList(this.company_name).subscribe(data=>{this.bussiness_unit_list  = data;});
              this.DropDownListService.itemTypeList(this.company_name).subscribe(data=>{this.itemtypes  = data;});
              this.DropDownListService.supplierNamesList(this.company_name).subscribe(data=>{this.supplierNames  = data;});
              this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
              this.DropDownListService.employeeNamesList(this.company_name).subscribe(data=>{this.employeeNames = data;});
              this.referenceTypeList = [{"name": "Unload Advice With PO", "value": "Unload Advice With PO"}, 
              {"name": "Unload Advice Without PO", "value": "Unload Advice Without PO"}];
              this.DropDownListService.customUOMList().subscribe(data=>{
              console.log("uom: "+JSON.stringify(data));
              this.customUOMDyns  = data;});                  
         }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
         this.ngOnInit()});  
         */
    }

  }
  actionType: any;
  onUpdate(id, quality_check_id, action) {
    this.actionType = action;
    console.log("QC ACTION :: " + this.actionType)
    this.status = false;
    this.userForm.patchValue({ id: id });
    this.isHidden = true;
    if (action == 'update') {
      this.qualitychecksave = true;
    }
    else {
      this.qualitychecksave = false;
    }
    forkJoin(
      this.DropDownListService.retriveQualityCheck(id),
      this.DropDownListService.retriveQualityCheckDetails(quality_check_id),
      this.DropDownListService.getCompanyBUMNCList(this.company_name),
      this.DropDownListService.getItemThruPurchasenew(),
      this.DropDownListService.itemTypeList(this.company_name),
      this.DropDownListService.supplierNamesNewList(this.company_name),
      this.DropDownListService.employeeNamesList(this.company_name),
      this.DropDownListService.customUOMList()

    ).subscribe(([qcdata, qcitemdata, budata, itemdata, itemtypedata, supplierdata, empdata, uomdata]) => {
      this.status = false;
      this.bussiness_unit_list = budata;
      this.item_codes = itemdata;
      this.itemtypes = itemtypedata;
      this.supplierNames = supplierdata;
      this.employeeNames = empdata;
      this.customUOMDyns = uomdata;
      //console.log("QC : "+JSON.stringify(qcdata));
      this.onChangeBusinessUnit(qcdata["business_unit"]);
      this.userForm.patchValue(qcdata);
      // this.onChangeBusinessUnit(qcdata["bussiness_unit"]);
      //console.log("QC ITEM : "+JSON.stringify(qcitemdata));
      let k = 0;
      this.item_sl_no = 0;
      while (this.pur_Quality_Check_Details.length)
        this.pur_Quality_Check_Details.removeAt(0);
      for (let data1 of qcitemdata) {
        this.status = false;
        this.add();
        forkJoin(
          this.DropDownListService.retriveQualityCheckDetailsQcDetails(data1["qc"], data1["quality_check_id"]),
          this.DropDownListService.getItemMasterPackMat(data1["item_code"])
        ).subscribe(([qcitemdataQcdetails, packingList]) => {
          this.packingItem[k] = packingList;
          if (data1["warehouse"] == "" || data1["warehouse"] == null) {

          }
          else {
            this.onChangeWarehouse(data1["warehouse"], k);
          }

          this.pur_Quality_Check_Details.at(k).patchValue({
            slno: data1["slno"], item_code: data1["item_code"], packing: data1["packing"], s_qty: data1["s_qty"]
            , s_uom: data1["s_uom"], quantity: data1["quantity"], uom: data1["uom"], warehouse: data1["warehouse"], stack: data1["stack"],
            qc: data1["qc"], qc_status: data1["qc_status"]
          });


          while ((<FormArray>(<FormGroup>(<FormArray>this.userForm.controls['pur_Quality_Check_Details'])
            .controls[k]).controls['pur_Quality_Check_Details_QcDetails']).length)

            (<FormArray>(<FormGroup>(<FormArray>this.userForm.controls['pur_Quality_Check_Details'])
              .controls[k]).controls['pur_Quality_Check_Details_QcDetails']).removeAt(0);

          for (let item of qcitemdataQcdetails) {
            this.addQcDetails(k, item);
          }

          k++;
        });
        this.status = true;
      }
      this.status = true;
    });
    this.status = true;
  }

  search() {
    let vehicle = this.userForm1.get("vehicle_id1").value;
    let fromdate = this.userForm1.get("fromdate").value;
    let todate = this.userForm1.get("todate").value;
    let finyear = localStorage.getItem("financial_year");

    this.status = false;
    if (vehicle == null || vehicle == '' || vehicle == 0) {
      vehicle = "All";
    }
    if ((fromdate == null || fromdate == '' || fromdate == 0) && (todate == null || todate == '' || todate == 0)) {
      fromdate = "wtfdate";
      todate = "wttdate";
    }
    console.log("Check :: " + vehicle + " / " + finyear + " / " + fromdate + " / " + todate)
    this.DropDownListService.searchQC(fromdate, todate, vehicle, finyear).subscribe(data => {
      console.log("here data comses " + JSON.stringify(data))
      this.listQualityCheck = data;
      this.status = true;
    }, (error) => {
      this.status = true;
      alert("QC with Vehicle Not Found !!!")
      this.listQualityCheck = [];
    })
  }

  onDelete(id, quality_check_id, advice_id)
  {
    this.status = false;
    if (confirm("Are you sure to delete this Quality Check ?")) {
      this.userForm.patchValue({ username: localStorage.getItem("username") });

      //this.DropDownListService.checkQCUsed(advice_id).subscribe(checkQC => {
        //console.log("QC Check:: "+checkQC.status);
        /* if (checkQC.status == 'NO') {*/
          this.Service.deletePurchaseQualityCheck(this.userForm.getRawValue(), id).subscribe(data => {
            alert("Quality Check Deleted successfully.");
            this.userForm.reset();
            this.status = true;
            this.isHidden = false;
            this.ngOnInit();
            this.showList("list");
          });

       /* }
        else {
          alert("This Quality Check is Already Used,Can not be Deleted!! ");
        } */

      //});
    }
    this.status = true;
  }

}
