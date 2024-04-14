import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { forkJoin } from 'rxjs';
import { StoreIssueNote } from '../../../../../../Models/StoreTransaction/StoreIssueNote';

@Component({
  selector: 'app-store-issue-note',
  templateUrl: './store-issue-note.component.html',
  styleUrls: ['./store-issue-note.component.scss']
})
export class StoreIssueNoteComponent implements OnInit {
  isHidden: boolean = false;
  public userForm: FormGroup;
  model: StoreIssueNote = new StoreIssueNote();
  status: boolean = true;
  details_sl_no = 1;
  storeIssuelist: any = [];
  storeItemList: any = [];
  selectedItemName: any = [];
  selectedWarehouseName: any = [];
  classifiedList: any = [];
  selectedClsItemName: any = [];
  Id: any;
  storeissuenotesave: boolean = false;
  UpdateReturn: boolean = true;
  warehouseList: any = [];
  globalStoredata: any = [];
  allWarehouseList: any = [];
  selectedTranWarehouse: any = [];
  Stockfixed: any;
  warehousediable: any = [];
 

  constructor(public fb: FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService, private dialog: MatDialog) {
    this.userForm = fb.group({
      id: [''],
      store_issue_id: [''],
      store_issue_date: [''],
      company_id: [''],
      fin_year: [''],
      username: [''],

      store_issue_note_details: this.fb.array([this.fb.group({
        slno: this.details_sl_no,
        store_issue_id: '',
        store_issue_date: '',
        item: '',
        item_name: '',
        classified_item: '',
        avail_qty: '',
        issue_qty: '',
        return_qty: '0',
        issue_for: '',
        warehouse: '',
        warehouse_name: '',
        transferable: 'No',
        transfer_warehouse: '',
        transfer_warehouse_name: ''
      })])
    })
  }

  get id() { return this.userForm.get("id") as FormControl }
  get store_issue_id() { return this.userForm.get("jw_grn_tag") as FormControl }
  get store_issue_date() { return this.userForm.get("grn_id") as FormControl }
  get company_id() { return this.userForm.get("company_id") as FormControl }
  get fin_year() { return this.userForm.get("fin_year") as FormControl }
  get username() { return this.userForm.get("username") as FormControl }
  get store_issue_note_details() { return this.userForm.get('store_issue_note_details') as FormArray; }

  ngOnInit() {
    this.isHidden = false;
    this.status = true;
    this.storeissuenotesave = true;
    this.UpdateReturn = false;
    this.classifiedList = [];
    forkJoin(
      this.DropDownListService.getstoreIssuelist(),
      //this.DropDownListService.getItemThruType("ITMT00004")
      this.DropDownListService.getItemThruGrn(),
      this.DropDownListService.getWarehouseFromPoStoreItem(),
      this.DropDownListService.getAllWarehouse(),
    ).subscribe(([storedata, storeitem, allStoredata, allwarehouse]) => {
      console.log("StoreItem: : " + JSON.stringify(storeitem));
      this.storeIssuelist = storedata;
      // this.storeItemList = storeitem;
      this.globalStoredata = allStoredata;
      this.warehouseList = Object.values(allStoredata.reduce((o, c) => {
        if (!o[c.warehouse_code]) o[c.warehouse_code] = c;
        return o;
      }, {}))

      this.allWarehouseList = allwarehouse;
      console.log("warehouse List::" + JSON.stringify(this.allWarehouseList))

    });
  }

  showList(s: string) {
    if (s == "add") {
      this.isHidden = true;
      this.UpdateReturn = false;
      this.storeissuenotesave = true;
      this.status = true;
      this.store_issue_note = "";
      this.classifiedList = [];
      this.Stockfixed = "No";
      this.warehousediable[0]=true;
    }
    if (s == "list") {
      this.isHidden = false;
      this.UpdateReturn = false;
      this.ResetAllValues();
      this.details_sl_no = 0;
      this.selectedWarehouseName = [];
      this.selectedItemName = [];
      this.selectedClsItemName = [];
      this.classifiedList = [];
      this.selectedTranWarehouse = [];

      while (this.store_issue_note_details.length)
        this.store_issue_note_details.removeAt(0);
      this.addDetails();
      this.warehousediable[0]=true;
      this.status = true;
      this.Stockfixed = "No";

    }
  }

  ResetAllValues() {
    return this.userForm = this.fb.group({
      id: [''],
      store_issue_id: [''],
      store_issue_date: [''],
      company_id: [''],
      fin_year: [''],
      username: [''],

      store_issue_note_details: this.fb.array([this.fb.group({
        slno: this.details_sl_no,
        store_issue_id: '',
        store_issue_date: '',
        item: '',
        item_name: '',
        classified_item: '',
        avail_qty: '',
        issue_qty: '',
        return_qty: '0',
        issue_for: '',
        warehouse: '',
        warehouse_name: '',
        transferable: '',
        transfer_warehouse: '',
        transfer_warehouse_name: ''
      })])
    });
  }
  addDetails() {
    this.details_sl_no = this.store_issue_note_details.length + 1;
    this.store_issue_note_details.push(this.fb.group({
      slno: this.details_sl_no,
      store_issue_id: '',
      store_issue_date: '',
      item: '',
      item_name: '',
      classified_item: '',
      avail_qty: '',
      issue_qty: '',
      return_qty: '0',
      issue_for: '',
      warehouse: '',
      warehouse_name: '',
      transferable: '',
      transfer_warehouse: '',
      transfer_warehouse_name: ''
    }))
  }

  deletedetails(index) {
    if (index) {
      this.store_issue_note_details.removeAt(index);
      for (let i = 0; i <= this.store_issue_note_details.length; i++) {
        this.store_issue_note_details.at(i).patchValue({ slno: i + 1 })
      }

    }
    else {
      if (this.store_issue_note_details.length > 1) {
        this.store_issue_note_details.removeAt(index);
        for (let i = 0; i <= this.store_issue_note_details.length; i++) {
          this.store_issue_note_details.at(i).patchValue({ slno: i + 1 })
        }
      }
      else {
        alert("can't delete all rows");
      }
    }
  }

  onChangeWarehouse(index, warehouseid) {
    if (warehouseid.length && warehouseid != "0") {
      this.store_issue_note_details.at(index).patchValue({ warehouse: warehouseid });
      let itemdata: any = [];
      this.globalStoredata.forEach(element => {
        if (element.warehouse_code == warehouseid) {
          itemdata.push(element);
          this.store_issue_note_details.at(index).patchValue({ warehouse_name: element.warehouse_name });
        }
      });

      this.storeItemList[index] = itemdata
      //console.log("store item list::" + JSON.stringify(this.storeItemList[index]))
    }
  }

  onChangeItemName(index, itemId) {
    if (itemId.length && itemId != "0") {
      this.selectedClsItemName[index] = [];
      this.store_issue_note_details.at(index).patchValue({ item: itemId, avail_qty: '' });
      let classdata: any = [];
      this.globalStoredata.forEach(element => {
        if (element.adv_item_code == itemId && element.warehouse_code == this.store_issue_note_details.at(index).get("warehouse").value) {
          classdata.push(element);
        }
      });
      this.classifiedList[index] = classdata;
    }
  }
  store_issue_note: string = "";
  onChangeClasItemName(index, classItem) {
    if (classItem.length && classItem != "0") {
      //console.log("Clas Item: " + classItem)
      this.DropDownListService.getPoStoreQty(this.store_issue_note_details.at(index).get("item").value
        , classItem, this.store_issue_note_details.at(index).get("warehouse").value)
        .subscribe(qtydata => {
          //console.log("Qty : " + JSON.stringify(qtydata));
          let exist: boolean = false;
          //console.log("Clas Item each: " + classItem)
          //console.log("Clas Item Qty: " + qtydata["classified_item_name"])
          if (classItem == qtydata["classified_item_name"]) {
            this.store_issue_note = "";
            exist = true;
            this.store_issue_note_details.at(index).patchValue({ classified_item: classItem, avail_qty: qtydata["restqty"] });
          }
          if (exist == false) {
            this.store_issue_note = "The Classified Item has not been Purchase Yet.";
            this.store_issue_note_details.at(index).patchValue({
              avail_qty: '0', issue_qty: '0',
            });
          }
        });
    }
  }

  getQtyCheck(issue_qty, index) {
    let avail_qty = this.store_issue_note_details.at(index).get("avail_qty").value;
    console.log("Issue : " + issue_qty.target.value);
    console.log("Avail : " + avail_qty);
    if (issue_qty.target.value > avail_qty) {
      alert("Issue Qty Exceeds Available Qty.\nPlease Enter Carefully.")
      this.store_issue_note_details.at(index).patchValue({ issue_qty: '0' });
    }
  }

  returnQtyCheck(return_qty, index) {
    let issue_qty = this.store_issue_note_details.at(index).get("issue_qty").value;
    console.log("Return : " + return_qty.target.value);
    console.log("Avail : " + issue_qty);
    if (return_qty.target.value > issue_qty || return_qty.target.value < 0) {
      alert("Return Qty Exceeds Issued Qty.\nPlease Enter Carefully.")
      this.store_issue_note_details.at(index).patchValue({ return_qty: '0' });
    }
  }

  onChangetranWarehouse(index, warehouseid) {
    if (warehouseid.length && warehouseid != "0") {
      this.allWarehouseList.forEach(element => {
        if (element.warehouse_code == warehouseid) {
          this.store_issue_note_details.at(index).patchValue({ transfer_warehouse: element.warehouse_code, transfer_warehouse_name: element.warehouse_name });
        }
      });
    }
  }

  send() {
    this.Id = this.userForm.get("id").value as FormControl;
    this.userForm.patchValue({
      company_id: localStorage.getItem("company_name"),
      fin_year: localStorage.getItem("financial_year"),
      username: localStorage.getItem("username")
    });
    for (let u = 0; u < this.store_issue_note_details.length; u++) {
      this.store_issue_note_details.at(u).patchValue({ store_issue_date: this.userForm.get("store_issue_date").value });
    }

    this.status = false;

    if (this.userForm.get("store_issue_date").value == '' || this.userForm.get("store_issue_date").value == 0 || this.userForm.get("store_issue_date").value == null) {
      alert("Please Enter Store Issue date!")
      this.status = true;
    }
    else {
      let storeitem = false;
      let classitem = false;
      let issueqty = false;
      let issuefor = false;
      let transfer = false;

      for (let b = 0; b < this.store_issue_note_details.length; b++) {
        if (this.store_issue_note_details.at(b).get("item").value == null || this.store_issue_note_details.at(b).get("item").value == '' || this.store_issue_note_details.at(b).get("item").value == 0) {
          storeitem = true;
        }
        if (this.store_issue_note_details.at(b).get("classified_item").value == null || this.store_issue_note_details.at(b).get("classified_item").value == '' || this.store_issue_note_details.at(b).get("classified_item").value == 0) {
          classitem = true;
        }
        if (this.store_issue_note_details.at(b).get("issue_qty").value == null || this.store_issue_note_details.at(b).get("issue_qty").value == '' || this.store_issue_note_details.at(b).get("issue_qty").value == 0) {
          issueqty = true;
        }
        if (this.store_issue_note_details.at(b).get("issue_for").value == null || this.store_issue_note_details.at(b).get("issue_for").value == '' || this.store_issue_note_details.at(b).get("issue_for").value == 0) {
          issuefor = true;
        }
        if (this.store_issue_note_details.at(b).get("transferable").value == 'Yes' && (this.store_issue_note_details.at(b).get("transfer_warehouse").value == null || this.store_issue_note_details.at(b).get("transfer_warehouse").value == '' || this.store_issue_note_details.at(b).get("transfer_warehouse").value == 0)) {
          transfer = true;
        }
      }
      if (storeitem == true) {
        alert("Please Select Store Item Name in Details Tab!!!");
        this.status = true;
      }
      else if (classitem == true) {
        alert("Please Select Classified Item Name in Details Tab!!!");
        this.status = true;
      }
      else if (issueqty == true) {
        alert("Please Enter issue Quantity in Details Tab!!!");
        this.status = true;
      }
      else if (issuefor == true) {
        alert("Please Enter Issue For in Details Tab!!!");
        this.status = true;
      }
      else if (transfer == true) {
        alert("'Transferable' is 'Yes' So, Please Select Transfer Warehouse Name in Details Tab!!!");
        this.status = true;
      }
      else {
        if (this.Id > 0) {
          this.Service.updateStoreIssueNote(this.userForm.getRawValue(), this.Id).subscribe(data => {
            alert("Store Issue Note Updated successfully.");
            this.userForm.reset();
            this.isHidden = false;
            this.showList('list');
            this.ngOnInit();
            this.status = true;
          }, (error) => {
            this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured Store Issue Note !!! please Reload the page and try again....");
          });
        }
        else {
          this.Service.createStoreIssueNote(this.userForm.getRawValue())
            .subscribe(data => {
              alert("Store Issue Note Saved successfully.");
              this.userForm.reset();
              this.showList('list');
              this.ngOnInit();
              this.status = true;
            }, (error) => {
              this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured Store Issue Note !!! please Reload the page and try again....");
            });
        }
      }
    }

  }

  onDelete(id) {
    if (confirm("Are you sure to delete this Store Issue Note From List?")) {
      this.userForm.patchValue({ username: localStorage.getItem("username") });
      this.Service.deleteStoreIssueNote(this.userForm.getRawValue(), id).subscribe(data => {
        alert("Store Issue Note Deleted successfully.");
        this.userForm.reset();
        this.status = true;
        this.ngOnInit();
      });

    }
  }

  onUpdate(id, store_id, action) {
    console.log("Tut : " + action)
    this.isHidden = true;
    this.UpdateReturn = true;
    if (action == "view") {
      this.storeissuenotesave = false;
    }
    if (action == "update") {
      this.storeissuenotesave = true;
    }

    forkJoin(
      this.DropDownListService.retriveStoreIssueNote(id),
    ).subscribe(([store]) => {
      this.userForm.patchValue(store);

      forkJoin(
        //this.DropDownListService.retriveStoreIssueNoteDetails(store['store_issue_id']),
        this.DropDownListService.retriveStoreIssueNoteDetails(store_id),
      ).subscribe(([dynamicdetails]) => {

        //console.log("CHECK: : "+JSON.stringify(dynamicdetails));
        let k = 0;
        this.details_sl_no = 0;
        while (this.store_issue_note_details.length)
          this.store_issue_note_details.removeAt(0);
        for (let data1 of dynamicdetails) {
          forkJoin(
            //this.DropDownListService.retriveClassifiedItem(data1["item"], localStorage.getItem("company_name"))
            this.DropDownListService.retriveClassifiedItemThruGrn(data1["item"])
          ).subscribe(([item_list]) => {
            //console.log("CHECK Clas: : "+JSON.stringify(item_list));
            this.classifiedList[k] = item_list;
            this.addDetails();
            this.selectedWarehouseName[k] = data1["warehouse_code"]
            this.selectedItemName[k] = data1["item"];
            this.selectedClsItemName[k] = data1["classified_item"];
            //console.log("item : " + data1["item"])
            //console.log("clasItem : " + data1["classified_item"])
            this.store_issue_note_details.at(k).patchValue({
              slno: data1["slno"], item: data1["item"], item_name: data1["item_name"],
              classified_item: data1["classified_item"], avail_qty: data1["avail_qty"], issue_qty: data1["issue_qty"], return_qty: data1["return_qty"],
              issue_for: data1["issue_for"], store_issue_date: data1["store_issue_date"], warehouse: data1["warehouse"], warehouse_name: data1["warehouse_name"],
              transferable: data1["transferable"], transfer_warehouse: data1["transfer_warehouse"], transfer_warehouse_name: data1["transfer_warehouse_name"]
            });
            k++;
          });
        }
        this.status = true;
      });

      this.status = true;
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured in Store Issue Note,please try again....");
      this.ngOnInit()
    });



  }

  onChangewarehoseopen(index, transferable) {
    if (transferable == "Yes") {
      this.warehousediable[index]=false;
    }
    else {
        this.warehousediable[index]=true;
        this.store_issue_note_details.at(index).patchValue({transfer_warehouse:'0',transfer_warehouse_name:''});
        this.selectedTranWarehouse[index]="0";
    }
  }
}
