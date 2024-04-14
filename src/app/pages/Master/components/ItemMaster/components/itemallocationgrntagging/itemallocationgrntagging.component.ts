import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { JW_Grn_ItemTagging } from '../../../../../../Models/ItemModel/jw_grn_itemtagging';
import { forkJoin } from 'rxjs';
import { ItemallocationpartytaggingComponent } from '../itemallocationpartytagging/itemallocationpartytagging.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-itemallocationgrntagging',
  templateUrl: './itemallocationgrntagging.component.html',
  styleUrls: ['./itemallocationgrntagging.component.scss']
})
export class ItemallocationgrntaggingComponent implements OnInit {

  isHidden: boolean = false;
  public userForm: FormGroup;
  //model: JW_Grn_ItemTagging = new JW_Grn_ItemTagging();
  status: boolean = true;
  details_sl_no = 1;
  grnlist: any = [];
  partyList: any = [];
  selectedPartyName: any = [];
  Id: any;
  grntaglist: any = [];
  grnitemtagsave: boolean = false;
  grnenable: boolean = false;
  deleteblock: any = [];
  constructor(public fb: FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService, private dialog: MatDialog) {

    this.userForm = fb.group({
      id: [''],
      jw_grn_tag: [''],
      grn_id: [''],
      grn_no: [''],
      grn_date: [''],
      supplier_name: [''],
      totalqty: [''],
      company_id: [''],
      fin_year: [''],
      username: [''],

      jw_grn_partytag_details: this.fb.array([this.fb.group({
        slno: this.details_sl_no,
        jw_grn_tag: '',
        party: '',
        party_name: '',
        qty: '',
        allocated_qty: '',
        partyitem_qty: '',
        jw_grn_partywitem_details: this.fb.array([this.fb.group({
          slno: '',
          jw_grn_tag: '',
          party: '',
          party_name: '',
          job_item: '',
          job_item_name: '',
          qty: '',
          block: '',

        })])
      })])


    })
  }

  get id() { return this.userForm.get("id") as FormControl }
  get jw_grn_tag() { return this.userForm.get("jw_grn_tag") as FormControl }
  get grn_id() { return this.userForm.get("grn_id") as FormControl }
  get grn_no() { return this.userForm.get("grn_no") as FormControl }
  get grn_date() { return this.userForm.get("grn_date") as FormControl }
  get supplier_name() { return this.userForm.get("supplier_name") as FormControl }
  get totalqty() { return this.userForm.get("totalqty") as FormControl }
  get fin_year() { return this.userForm.get("fin_year") as FormControl }
  get username() { return this.userForm.get("username") as FormControl }
  get jw_grn_partytag_details() { return this.userForm.get('jw_grn_partytag_details') as FormArray; }
  get jw_grn_partywitem_details() {
    return (<FormArray>(<FormGroup>this.userForm.get('jw_grn_partytag_details')).get('jw_grn_partywitem_details')).controls;
  };


  ngOnInit() {
    this.isHidden = false;
    this.status = true;
    this.grnitemtagsave = true;
    this.grnenable = false;
    forkJoin(
      this.DropDownListService.getJobItemTagMaster(),
      this.DropDownListService.getJwGRNunique(),
      this.Service.getCustomerBussinessPartnerFastApi(localStorage.getItem("company_name"))
    ).subscribe(([grntag, allgrndata, customer]) => {

      this.grnlist = allgrndata;
      this.partyList = customer;
      this.grntaglist = grntag;
    });

  }

  showList(s: string) {
    if (s == "add") {
      this.isHidden = true;
      this.grnitemtagsave = true;
      this.grnenable = false;
    }
    if (s == "list") {
      this.isHidden = false;
      this.ResetAllValues();
      this.grnenable = false;
      this.details_sl_no = 0;
      this.selectedPartyName = [];
      this.status = false;
      this.DropDownListService.getJwGRNunique().subscribe(allgrndata => {
        this.grnlist = allgrndata;
        this.status = true;
      });

      while (this.jw_grn_partytag_details.length)
        this.jw_grn_partytag_details.removeAt(0);
      this.addDetails();
    }
  }

  addDetails() {
    this.details_sl_no = this.details_sl_no + 1;
    this.jw_grn_partytag_details.push(this.fb.group({
      slno: this.details_sl_no,
      jw_grn_tag: '',
      party: '',
      party_name: '',
      qty: '',
      allocated_qty: '',
      partyitem_qty: '',
      jw_grn_partywitem_details: this.fb.array([this.fb.group({
        slno: '',
        jw_grn_tag: '',
        party: '',
        party_name: '',
        job_item: '',
        job_item_name: '',
        qty: '',
        block: '',

      })])
    }));
    this.deleteblock[this.jw_grn_partytag_details.length] = false;
  }

  addPartyitemdetails(userIndex: number, data?: any) {
    console.log('userIndex', userIndex, '-------', 'data', data);
    let fg = this.fb.group({
      slno: data.slno,
      jw_grn_tag: data.jw_grn_tag,
      party: data.party,
      party_name: data.party_name,
      job_item: data.job_item,
      job_item_name: data.job_item_name,
      qty: data.qty,
      block: data.block,
    });
    (<FormArray>(<FormGroup>(<FormArray>this.userForm.controls['jw_grn_partytag_details'])
      .controls[userIndex]).controls['jw_grn_partywitem_details']).push(fg);
  }

  addPartyitemdetailsupdate(userIndex: number, data?: any) {
    console.log('userIndex', userIndex, '-------', 'data', data);
    let fg = this.fb.group({
      slno: data.slno,
      jw_grn_tag: data.jw_grn_tag,
      party: data.party,
      party_name: data.party_name,
      job_item: data.job_item,
      job_item_name: data.job_item_name,
      qty: data.qty,
      block: 'Yes'
    });
    (<FormArray>(<FormGroup>(<FormArray>this.userForm.controls['jw_grn_partytag_details'])
      .controls[userIndex]).controls['jw_grn_partywitem_details']).push(fg);
  }

  deletedetails(index) {
    if (this.details_sl_no > 1) {
      this.jw_grn_partytag_details.removeAt(index);
      this.details_sl_no = this.details_sl_no - 1;
      this.selectedPartyName.splice(index, 1);
      this.deleteblock.splice(index, 1);
    }
    else {
      this.details_sl_no = 1;
      alert("can't delete all rows");
      this.jw_grn_partytag_details.reset();
      this.jw_grn_partytag_details.at(0).patchValue({ slno: this.details_sl_no });
    }

    for (let i = 1; i <= this.details_sl_no; i++)
      this.jw_grn_partytag_details.at(i - 1).patchValue({ slno: i });
  }

  ResetAllValues() {
    return this.userForm = this.fb.group({
      id: [''],
      jw_grn_tag: [''],
      grn_id: [''],
      grn_no: [''],
      grn_date: [''],
      supplier_name: [''],
      totalqty: [''],
      company_id: [''],
      fin_year: [''],
      username: [''],

      jw_grn_partytag_details: this.fb.array([this.fb.group({
        slno: this.details_sl_no,
        jw_grn_tag: '',
        party: '',
        party_name: '',
        qty: '',
        allocated_qty: '',
        partyitem_qty: '',
        jw_grn_partywitem_details: this.fb.array([this.fb.group({
          slno: '',
          jw_grn_tag: '',
          party: '',
          party_name: '',
          job_item: '',
          job_item_name: '',
          qty: '',
          block: '',
        })])
      })]),
    });
  }

  cal(index) {
    let amount = 0;
    for (let i = 1; i <= this.jw_grn_partytag_details.length; i++) {
      amount += this.jw_grn_partytag_details.at(i).get("qty").value;
    }

    if (Number(this.userForm.get("totalqty").value) < Number(amount)) {
      alert("Exceeded Grn Total qty with Wheat Grn Qty")
      this.jw_grn_partytag_details.at(index).patchValue({ qty: 0 });
    }
  }

  send() {
    this.Id = this.userForm.get("id").value as FormControl;
    this.userForm.patchValue({
      company_id: localStorage.getItem("company_name"),
      fin_year: localStorage.getItem("financial_year"),
      username: localStorage.getItem("username")
    });


    if (this.userForm.get("grn_id").value == "" || this.userForm.get("grn_id").value == null) {
      alert("Grn No is Missing !!!!!!!");
    }
    else if (this.userForm.get("grn_date").value == "" || this.userForm.get("grn_date").value == null) {
      alert("Grn Date is Missing !!!!!!!");
    }
    else if (this.userForm.get("supplier_name").value == "" || this.userForm.get("supplier_name").value == null) {
      alert("Supplier Name is Missing !!!!!!!");
    }
    else if (this.userForm.get("totalqty").value == "" || this.userForm.get("totalqty").value == null) {
      alert("Total Qty is Missing !!!!!!!");
    }
    else {
      let customername: boolean = false;
      let wheatgrnqty: boolean = false;
      let allocatedqty: boolean = false;
      let finalQtyCheck: boolean = false;

      for (let i = 0; i < this.jw_grn_partytag_details.length; i++) {
        if (this.jw_grn_partytag_details.at(i).get("party").value == "" || this.jw_grn_partytag_details.at(i).get("party").value == null) {
          customername = true;
        }
        if (this.jw_grn_partytag_details.at(i).get("qty").value == "" || this.jw_grn_partytag_details.at(i).get("qty").value == null) {
          wheatgrnqty = true;
        }
        if (this.jw_grn_partytag_details.at(i).get("allocated_qty").value == "" || this.jw_grn_partytag_details.at(i).get("allocated_qty").value == null) {
          allocatedqty = true;
        }
        if (this.jw_grn_partytag_details.at(i).get("allocated_qty").value != this.jw_grn_partytag_details.at(i).get("partyitem_qty").value) {
          finalQtyCheck = true;
        }
      }

      if (customername == true) {
        alert(" Please insert valid Customer Name in Details  !!!!!!!");
      }
      else if (wheatgrnqty == true) {
        alert(" Please insert valid Wheat Grn Qty in Details  !!!!!!!");
      }
      else if (allocatedqty == true) {
        alert(" Please insert valid Allocation Qty in Details  !!!!!!!");
      }
      else if (finalQtyCheck == true) {
        alert(" Please Check Allocate Quantity And Total Job Item Quantity in Details  !!!!!!!");
      }
      else {

        let amount = 0;
        for (let i = 0; i < this.jw_grn_partytag_details.length; i++) {
          amount += Number(this.jw_grn_partytag_details.at(i).get("qty").value);
        }
        //console.log("totqty::" + Number(this.userForm.get("totalqty").value) + " <<< " + Number(amount))
        if (Number(this.userForm.get("totalqty").value) == Number(amount.toFixed(3))) {
          this.status = false;
          console.log(" check data final " + JSON.stringify(this.userForm.getRawValue()))
          if (this.Id > 0) {
            this.Service.updateJobItemTagMaster(this.userForm.getRawValue(), this.Id).subscribe(data => {
              alert("Job Item Tagging With Party Updated successfully.");
              this.userForm.reset();
              this.isHidden = false;
              this.showList('list');
              this.ngOnInit();
              this.status = true;
            }, (error) => {
              this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured On Job Item Tagging With Party Master !!! please Reload the page and try again....");
            });
          }
          else {
            this.Service.createJobItemTagMaster(this.userForm.getRawValue())
              .subscribe(data => {
                alert("Job Item Tagging With Party Saved successfully.");
                this.userForm.reset();
                this.showList('list');
                this.ngOnInit();
                this.status = true;
              }, (error) => {
                this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured On Job Item Tagging With Party!!! please Reload the page and try again....");
              });
          }
        }
        else {
          alert("Total allocation hasnt been distributed properly !!!!!!!");
        }

      }

    }
  }

  onChangeGRN(grnid) {
    this.grnlist.forEach(element => {
      if (element.grn_id == grnid) {
        this.userForm.patchValue({ grn_date: element.grn_date, grn_no: element.grn_no, supplier_name: element.supplier, totalqty: element.tot_wt });
      }
    });
  }

  onChangePartyName(index, party) {
    if (party.length && party != null) {
      this.partyList.forEach(element => {
        if (element.cp_Id == party) {
          this.jw_grn_partytag_details.at(index).patchValue({ party: element.cp_Id, party_name: element.cp_name });
        }
      });
      for (let k = 0; k < this.jw_grn_partytag_details.length; k++) {
        if (this.jw_grn_partytag_details.at(index).get("party").value == this.jw_grn_partytag_details.at(k).get("party").value && k != index) {
          window.alert("Duplicate Row For Party Name");
          this.deletedetails(index);
          this.selectedPartyName[index] = '';
        }
      }
    }
  }

  detailsPopUp(index) {

    let party = this.jw_grn_partytag_details.at(index).get("party").value
    let party_name = this.jw_grn_partytag_details.at(index).get("party_name").value
    let jw_grn_tag = this.jw_grn_partytag_details.at(index).get("jw_grn_tag").value
    let allocated_qty = this.jw_grn_partytag_details.at(index).get("allocated_qty").value
    let id = this.userForm.get("id").value;
    let partyitem_qty = this.jw_grn_partytag_details.at(index).get("partyitem_qty").value
    if (id == null || id == '') {
      id = 0;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {};

    const dialogRef = this.dialog.open(ItemallocationpartytaggingComponent, {
      data: {
        id: id, party: party, party_name: party_name,
        jw_grn_tag: jw_grn_tag, allocated_qty: allocated_qty,
        partyitem_qty: partyitem_qty,
        jw_grn_partywitem_details:
          <FormArray>(<FormGroup>(<FormArray>this.userForm.controls['jw_grn_partytag_details'])
            .controls[index]).controls['jw_grn_partywitem_details'].value
      }, height: '80%',
      width: '70%'
    });

    dialogRef.afterClosed().subscribe(data => {

      if (data != '') {
        //console.log("check point :: " + data["partyitem_qty"])
        this.jw_grn_partytag_details.at(index).patchValue({ partyitem_qty: data["partyitem_qty"] });
        if ((Number(data["partyitem_qty"]) == 0) && (this.jw_grn_partytag_details.at(index).get("allocated_qty").value == 0)) {
          this.deleteblock[index] = false;
        }
        while ((<FormArray>(<FormGroup>(<FormArray>this.userForm.controls['jw_grn_partytag_details'])
          .controls[index]).controls['jw_grn_partywitem_details']).length)


          (<FormArray>(<FormGroup>(<FormArray>this.userForm.controls['jw_grn_partytag_details'])
            .controls[index]).controls['jw_grn_partywitem_details']).removeAt(0);

        for (let data1 of data.jw_grn_partywitem_details) {
          this.addPartyitemdetails(index, data1);
        }
      }
    });
  }

  convertqty(index, qty: number) {


    let alloted: number = (qty * 72 / 100);
    this.jw_grn_partytag_details.at(index).patchValue({ allocated_qty: alloted.toFixed(3) })

    let amount = 0;
    for (let i = 0; i < this.jw_grn_partytag_details.length; i++) {
      amount += Number(this.jw_grn_partytag_details.at(i).get("qty").value)
    }
    console.log("amount :: " + amount)
    if (Number(this.userForm.get("totalqty").value) < Number(amount.toFixed(3))) {
      alert("Total allocation hasnt been distributed properly !!!!!!!");
      this.jw_grn_partytag_details.at(index).patchValue({ allocated_qty: 0, qty: 0 })
    }
  }

  onDelete(id: any, jw_grn_tag) {
    this.status = false;
    if (confirm("Are you sure to delete this Job work Grn Tagging Master ?")) {
      this.userForm.patchValue({ username: localStorage.getItem("username") });

      this.DropDownListService.checkdeleteJobItemTagMaster(jw_grn_tag).subscribe(checkGrn => {
        if (checkGrn.status == 'Yes') {
          this.Service.DeleteJobItemTagMaster(this.userForm.getRawValue(), id).subscribe(data => {
            if (data.jw_grn_tag == '' || data.jw_grn_tag == null) {
              alert("Opps!!! Can't delete this Job work Grn Tagging Master !!!");
            } else {
              alert("Job work Grn Tagging Master Deleted successfully.");
            }
            this.userForm.reset();
            this.status = true;
            this.isHidden = false;
            this.ngOnInit();
            this.showList("list");
          });
        }
        else {
          alert("This Job work Grn Tagging Master is Already Used,Can not be Deleted!! ");
        }
      });
    }
    this.status = true;
  }

  onUpdate(id, jw_grn_tag, action) {
    this.isHidden = true;
    if (action == "view") {
      this.grnitemtagsave = false;
    }
    if (action == "update") {
      this.grnitemtagsave = true;
    }
    this.grnenable = true;
    forkJoin(
      this.DropDownListService.retriveJobItemTagMaster(id),
      this.DropDownListService.getJwGrnPartytagDetails(jw_grn_tag),
      this.DropDownListService.getJwGRN(),
      //   this.Service.getCustomerBussinessPartnerFastApi(localStorage.getItem("company_name"))
      // ).subscribe(([jobGrn, jobparty, allgrndata, customer]) => {
    ).subscribe(([jobGrn, jobparty, allgrndata]) => {
      this.grnlist = allgrndata;
      //this.partyList = customer;
      //console.log("retrive data " + JSON.stringify(jobGrn))
      this.userForm.patchValue(jobGrn);
      // console.log("check"+this.userForm.get("grn_id").value)
      let k = 0;
      this.details_sl_no = 0;
      while (this.jw_grn_partytag_details.length)
        this.jw_grn_partytag_details.removeAt(0);
      for (let data1 of jobparty) {
        this.addDetails();
        this.DropDownListService.getJwGrnPartywitemDetails(jw_grn_tag, data1["party"]).subscribe(itemdynamic => {
          this.selectedPartyName[k] = data1["party"];

          this.jw_grn_partytag_details.at(k).patchValue({
            slno: data1["slno"], jw_grn_tag: data1["jw_grn_tag"], party: data1["party"], party_name: data1["party_name"]
            , qty: data1["qty"], allocated_qty: data1["allocated_qty"], partyitem_qty: data1["partyitem_qty"]
          });
          this.deleteblock[k] = true;
          console.log("check point :: " + data1["partyitem_qty"])
          while ((<FormArray>(<FormGroup>(<FormArray>this.userForm.controls['jw_grn_partytag_details'])
            .controls[k]).controls['jw_grn_partywitem_details']).length)


            (<FormArray>(<FormGroup>(<FormArray>this.userForm.controls['jw_grn_partytag_details'])
              .controls[k]).controls['jw_grn_partywitem_details']).removeAt(0);

          for (let item of itemdynamic) {
            this.addPartyitemdetailsupdate(k, item);
          }

          k++;
        });

      }

    });
  }
}
