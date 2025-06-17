import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { forkJoin, Subscription } from "rxjs";
import { Bussiness_Unit } from "../../../../../../Models/ItemModel/ItemMaster";
import { SequenceId } from "../../../../../../Models/SalesTransaction/sales-enq";
import { DropdownServiceService } from "../../../../../../service/dropdown-service.service";
import { Master } from "../../../../../../service/master.service";
import { WheatFumigation, WheatFumigationDetails } from '../../../../../../Models/WheatFumigationModel/WheatFumigation';

@Component({
  selector: 'app-wheat-fumigation-record',
  templateUrl: './wheat-fumigation-record.component.html',
  styleUrls: ['./wheat-fumigation-record.component.scss']
})
export class WheatFumigationRecordComponent implements OnInit, OnDestroy {
  isHidden: boolean = false;
  saveEnabled: boolean = true;
  id: number;
  fumigationId: string | null = null;
  busy = 0;
  autoFumigationNumber: string = "";
  wfrList: WheatFumigation[] = [];
  bussinessUnitList: Bussiness_Unit[] = [];
  employeeList: any[] = [];
  warehouses: any[] = [];
  wfrDetailsMap: Map<string, WheatFumigationDetails[]> = new Map();
  warehousesMap: Map<string, any> = new Map();
  stackMap: Map<string, any> = new Map();
  currentDate: string = new Date().toISOString().substring(0, 10);
  companyName: string = localStorage.getItem("company_name") || "";
  finyear: string = localStorage.getItem("financial_year") || "";
  username: string = localStorage.getItem("username") || "";

  constructor(
    private fb: FormBuilder,
    private dropDownListService: DropdownServiceService,
    private masterService: Master
  ) {}

  wheatFumigationRecord: FormArray = this.fb.array([]);
  userForm: FormGroup = this.fb.group({
    fumigation_id: "",
    fumigation_no: this.autoFumigationNumber,
    fumigation_date: [this.currentDate, Validators.required],
    business_unit: ["0", Validators.required],
    wheat_fumigation_details: this.wheatFumigationRecord,
  });
  searchForm: FormGroup = this.fb.group({
    fumigationDate: "",
    businessUnit: "0",
  });

  get fumigation_date(): AbstractControl {
    return this.userForm.get("fumigation_date");
  }
  get business_unit(): AbstractControl {
    return this.userForm.get("business_unit");
  }
  businessUnitChangeSub: Subscription =
    this.business_unit.valueChanges.subscribe((b_id) => {
      if (b_id != "0") {
        let warehouses = this.warehousesMap.get(b_id);
        if (warehouses) {
          this.warehouses = warehouses;
          return;
        }
        this.status = false;
        //this.dropDownListService.getWarehouseListFromGRN(b_id).subscribe({ // Commented as no need to link to grn
        //this.dropDownListService.getWHListbyBUnit(b_id).subscribe({
        this.dropDownListService.getWHListbyBUnitFastApi(b_id).subscribe({
          next: (data: any[]) => {
            console.log(" ::WAREHOUSE DATA:: ");
            console.table(data);
            this.warehousesMap.set(b_id, data);
            this.warehouses = data;
            this.status = true;
            this.getStacksData();
          },
          error: (err) => {
            console.error(err);
            alert("Something went wrong!\nPlease reload.");
            this.status = true;
          },
        });
      }
    });

  get wheatFumigationRecordControls(): FormGroup[] {
    return this.wheatFumigationRecord.controls as FormGroup[];
  }

  get formData(): WheatFumigation {
    return this.userForm.value;
  }

  /**
   * @description
   * Gets/Sets the busy status of the component.
   * If set to true, increments the busy counter.
   * If set to false and the busy counter is greater than 0, decrements the busy counter.
   * @param value The new busy status.
   * NOTE: It's mostly made for convinience because all other components use status instead of this busy which is more accurate
  */
  get status(): boolean {
    return !(this.busy > 0);
  }
  set status(value: boolean) {
    if (!value) this.busy++;
    else if (this.busy > 0) this.busy--;
  }

  getBusinessUnitName(b_id: string): string {
    const b = this.bussinessUnitList.find((b) => b.businessunit_id === b_id);
    return b ? b.businessunit_name || b_id : b_id;
  }

  getStacks(idx: number): any[] {
    let stacks: any[] = [];
    try {
      stacks =
        this.stackMap.get(
          this.wheatFumigationRecord.at(idx).get("warehouse").value
        ) || [];
    } finally {
      return stacks;
    }
  }

  get filteredWfrList(): WheatFumigation[] {
    const { fumigationDate, businessUnit } = this.searchForm.value;
    return this.wfrList.filter((wfr) => {
      return !(
        (businessUnit &&
          businessUnit !== "0" &&
          wfr.business_unit !== businessUnit) ||
        (fumigationDate && wfr.fumigation_date !== fumigationDate)
      );
    });
  }

  resetUserForm(
    
    val: WheatFumigation = {
      fumigation_date: this.currentDate,
      fumigation_no: this.autoFumigationNumber,
      business_unit: "0",
      wheat_fumigation_details: [],
    }
  ): void {
    if (!val.wheat_fumigation_details) val.wheat_fumigation_details = [];
    let lenDif =
      this.wheatFumigationRecord.length - val.wheat_fumigation_details.length;
    while (lenDif) {
      if (lenDif > 0) {
        this.deleteItem();
        lenDif--;
      } else {
        this.addItem();
        lenDif++;
      }
    }
    this.userForm.reset(val);
    if (!this.wheatFumigationRecord.length) this.addItem();
  }

  addItem(): void {
    this.wheatFumigationRecord.push(
      this.fb.group({
        slno: this.wheatFumigationRecord.length + 1,
        wf_date: [this.currentDate, [Validators.required]],
        wf_time: ["", [Validators.required]],
        //abd_trader: ["", [Validators.required]],
        warehouse: ["", [Validators.required]],
        stack: ["", [Validators.required]],
        variety: ["", [Validators.required]],
        bags: [0, [Validators.required]],
        qty_mt: [0, [Validators.required]],
        fumigation_by: ["", [Validators.required]],
        reactant: ["", [Validators.required]],
        volume: [0, [Validators.required]],
        dose: [0, [Validators.required]],
        total_dose: [0, [Validators.required]],
        degassing_date: ["", [Validators.required]],
        degassing_time: ["", [Validators.required]],
        manpower: [0, [Validators.required]],
        expected_stack_opening_date: ["", [Validators.required]],
        pcmw_sign: ["", [Validators.required]],
        supervisor_sign: ["", [Validators.required]],
        lab_sign: ["", [Validators.required]],
        remarks: "",
      })
    );
  }

  deleteItem(idx?: number): void {
    const len = this.wheatFumigationRecord.length - 1;
    if (idx === undefined) idx = len;
    else if (!len) return;

    if (idx > -1) this.wheatFumigationRecord.removeAt(idx);
    const wfrArrCtrls = this.wheatFumigationRecord.controls;
    while (idx < len) {
      wfrArrCtrls[idx++].get("slno").setValue(idx);
    }
  }

  send(): void {
    // Form Validation
    console.log("submit formData: ", this.formData);
    if (this.userForm.invalid) {
      let msg = "";
      if (this.business_unit.invalid || this.business_unit.value === "0") {
        msg += "Choose a valid business unit.\n";
      }
      if (this.fumigation_date.invalid) {
        msg += "Choose a valid fumigation date.\n";
      }
      if (this.wheatFumigationRecord.invalid) {
        msg += "Invalid fumigation details:";
        this.wheatFumigationRecordControls.forEach((item, idx) => {
          Object.keys(item.value).forEach((key) => {
            if (item.get(key).invalid) {
              msg += `\n   Row ${idx + 1}: ${key} is invalid.`;
            }
          });
        });
      }
      alert(msg + "\n\nPlease correct and try again.");
      return;
    }

    const prepFormData: WheatFumigation = this.formData;
    prepFormData.company_id = this.companyName;
    prepFormData.fin_year = this.finyear;
    prepFormData.username = this.username;
    prepFormData.id = this.id || 0;

    this.status = false;
    if (this.fumigationId == null) {
      // create wfr
      this.masterService.createWheatFumigation(prepFormData).subscribe({
        next: (data: WheatFumigation) => {
          this.wfrList.unshift(data);
          this.wfrDetailsMap.set(
            data.fumigation_id,
            data.wheat_fumigation_details
          );
          alert("Wheat Fumigation Record created successfully!");
          this.changeMode("list");
          this.status = true;
        },
        error: (err) => {
          console.error(err);
          alert("Something went wrong!\nPlease reload.");
          this.status = true;
        },
      });
    } else {
      // update wfr
      this.masterService
        .updateWheatFumigation(prepFormData, this.id)
        .subscribe({
          next: (data: WheatFumigation) => {
            const index = this.wfrList.findIndex(
              (wfr) => wfr.fumigation_id === this.fumigationId
            );
            if (index === undefined) this.getWfrList();
            else {
              this.wfrList[index] = data;
            }
            this.wfrDetailsMap.set(
              this.fumigationId,
              data.wheat_fumigation_details
            );
            alert(`Wheat Fumigation Record ${this.fumigationId} updated successfully!`);
            this.changeMode("list");
            this.status = true;
          },
          error: (err) => {
            console.error(err);
            alert("Something went wrong!\nPlease reload.");
            this.status = true;
          },
        });
    }
  }

  changeMode(mode: string, fumigationId?: string, id?: number): void {
    this.isHidden = mode !== "list";
    switch (mode) {
      case "list":
        this.fumigationId = null;
        this.id = undefined;
        break;
      case "add":
        this.resetUserForm();
        this.updateFumigationSequenceId();
        this.fumigationId = null;
        this.id = undefined;
        this.saveEnabled = true;
        break;
      case "update":
        this.saveEnabled = true;
        this.optimizedPatch(fumigationId, id);
        break;
      case "view":
        this.saveEnabled = false;
        this.optimizedPatch(fumigationId, id);
        break;
      default:
        this.changeMode("list");
    }
  }

  optimizedPatch(fumigationId: string, id?: number): void {
    this.status = false;
    this.fumigationId = fumigationId;
    this.id = id;
    const wfr = this.wfrList.find(
      (wfr: WheatFumigation) => wfr.fumigation_id === fumigationId
    );
    const wfrDetails: WheatFumigationDetails[] | undefined =
      this.wfrDetailsMap.get(fumigationId);
    if (wfr) {
      if (wfrDetails) {
        wfr.wheat_fumigation_details = wfrDetails;
        this.resetUserForm(wfr);
        this.status = true;
      } else {
        this.dropDownListService
          .getWheatFumigationDetails(fumigationId)
          .subscribe({
            next: (wfrDetails: WheatFumigationDetails[]) => {
              this.wfrDetailsMap.set(fumigationId, wfrDetails);
              wfr.wheat_fumigation_details = wfrDetails;
              this.resetUserForm(wfr);
              this.status = true;
            },
            error: (err) => {
              console.error(err);
              alert("Something went wrong!\nPlease reload.");
              this.status = true;
            },
          });
      }
    } else {
      forkJoin([
        this.dropDownListService.retriveWheatFumigation(this.id),
        this.dropDownListService.getWheatFumigationDetails(fumigationId),
      ]).subscribe({
        next: (data: [WheatFumigation, WheatFumigationDetails[]]) => {
          const [wfr, wfrDetails] = data;
          wfr.wheat_fumigation_details = wfrDetails;
          this.resetUserForm(wfr);
          this.status = true;
        },
        error: (err) => {
          console.error(err);
          alert("Something went wrong!\nPlease reload.");
          this.status = true;
        },
      });
    }
  }

  onDeleteWfr(fumigationId: string, id: number): void {
    if (confirm("Are you sure to delete this record?")) {
      this.status = false;
      this.masterService.deleteWheatFumigation(id).subscribe({
        next: () => {
          this.wfrList = this.wfrList.filter((wfr) => wfr.fumigation_id !== fumigationId);
          this.wfrDetailsMap.delete(fumigationId);
          alert("The Wheat Fumigation Record is deleted successfully!")
          this.status = true;
        },
        error: (err) => {
          console.error(err);
          alert("Something went wrong!\nPlease reload.");
          this.status = true;
        },
      });
    }
  }

  getCompanyBUMNCList(): void {
    this.status = false;
    this.dropDownListService.getCompanyBUMNCList(this.companyName).subscribe({
      next: (company: Bussiness_Unit[]) => {
        this.bussinessUnitList = company;
        console.log("update bussinessUnitList: ", this.bussinessUnitList);
        this.status = true;
      },
      error: (err) => {
        console.error(err);
        alert("Something went wrong!\nPlease reload.");
        this.status = true;
      },
    });
  }

  updateFumigationSequenceId(): void {
    this.status = false;
    this.dropDownListService
      .getFumigationSequenceId(this.companyName)
      .subscribe({
        next: (data: SequenceId) => {
          this.autoFumigationNumber = data.sequenceid;
          this.userForm.patchValue({
            fumigation_no: this.autoFumigationNumber,
          });
          console.log("fetch autoFumigationNumber: ", data);
          this.status = true;
        },
        error: (err) => {
          console.error(err);
          alert("Something went wrong!\nPlease reload.");
          this.status = true;
        },
      });
  }

  getStacksData(): void {
    this.warehouses.forEach((warehouse: any) => {
      this.status = false;
      //this.dropDownListService.getStackNoByWarehouseFromProduction(warehouse.warehouse_code) // Commented as no need to link with production
      this.dropDownListService.getStackNoByWarehouse(warehouse.warehouse_code)
        .subscribe({
          next: (data) => {
            console.log(" ::WAREHOUSE STACK DATA:: ");
            console.table(data);
            this.stackMap.set(warehouse.warehouse_code, data);
            this.status = true;
          },
          error: (err) => {
            console.error(err);
            alert("Something went wrong!\nPlease reload.");
            this.status = true;
          },
        });
    });
  }

  getEmployeeList(): void {
    this.status = false;
    this.dropDownListService.getEmployeeNamenew(this.companyName).subscribe({
      next: (data: any[]) => {
        console.log("update employeeList: ", data);
        this.employeeList = data;
        this.status = true;
      },
      error: (err) => {
        console.error(err);
        alert("Something went wrong!\nPlease reload.");
        this.status = true;
      },
    });
  }

  getWfrList(): void {
    this.status = false;
    this.dropDownListService.getWheatFumigationList(this.finyear).subscribe({
      next: (data: WheatFumigation[]) => {
        console.log("update wfrList: ", data);
        this.clearCache();
        this.wfrList = data;
        this.status = true;
      },
      error: (err) => {
        console.error(err);
        alert("Something went wrong!\nPlease reload.");
        this.status = true;
      },
    });
  }

  clearCache(): void {
    this.wfrDetailsMap.clear();
    this.warehousesMap.clear();
    this.stackMap.clear();
  }

  ngOnInit() {
    this.clearCache();
    this.getCompanyBUMNCList();
    this.getEmployeeList();
    this.getWfrList();
  }

  ngOnDestroy(): void {
    this.businessUnitChangeSub.unsubscribe();
  }
}

