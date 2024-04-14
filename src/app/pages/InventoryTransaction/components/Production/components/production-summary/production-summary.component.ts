import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { prodsummary } from '../../../../../../Models/ProductionModel/prodsummary';
import { Master } from '../../../../../..//service/master.service';
import { DropdownServiceService } from '../../../../../..//service/dropdown-service.service';
import { ExcelService } from '../../../../../..//service/excel.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-production-summary',
  templateUrl: './production-summary.component.html',
  styleUrls: ['./production-summary.component.scss']
})
export class ProductionSummaryComponent implements OnInit {

  public userForm: FormGroup;
  model: prodsummary = new prodsummary();
  isHidden = false;
  status = false;
  company_name: any;
  finYear: any;
  Id: any;
  seq_no: any;
  rate_sl_no = 1;
  summarysave: boolean = true;
  summaryList: any = [];
  itemlist: any = [];
  summaryadd: boolean = true;
  summaryexcel: boolean = false;
  selectedItemName = [];

  constructor(public fb: FormBuilder, private Service: Master, private DropDownListService: DropdownServiceService, private excelService: ExcelService) {
    this.userForm = fb.group({
      id: [''],
      prod_sum_id: [''],
      b_unit: [''],
      date: [''],
      totalbags: [''],
      totalqty: [''],
      totalrate: [''],
      totalamount: [''],
      company_id: [''],
      fin_year: [''],
      username: [''],

      prod_summary_dtls: this.fb.array([this.fb.group({
        sl_no: this.rate_sl_no,
        prod_sum_id: '',
        item: '',
        item_name: '',
        packing: '',
        packing_name: '',
        uom_basedon: '',
        capacity: '',
        empty_big_wt: '',
        empbagwt_based_on: '',
        production_qty: '',
        packing_qty: '',
        production_uom: '',
        packing_uom:'',
        rate: '',
        amount: '',
       // remarks: ''

      })])
    });
  }

  get id() { return this.userForm.get("id") as FormControl }
  get prod_sum_id() { return this.userForm.get("prod_sum_id") as FormControl }
  get date() { return this.userForm.get("date") as FormControl }
  get totalbags() { return this.userForm.get("totalbags") as FormControl }
  get totalqty() { return this.userForm.get("totalqty") as FormControl }
  get totalrate() { return this.userForm.get("totalrate") as FormControl }
  get totalamount() { return this.userForm.get("totalamount") as FormControl }

  get company_id() { return this.userForm.get("company_id") as FormControl }
  get fin_year() { return this.userForm.get("fin_year") as FormControl }
  get username() { return this.userForm.get("username") as FormControl }

  get prod_summary_dtls() { return this.userForm.get('prod_summary_dtls') as FormArray }


  ngOnInit() {

    this.company_name = localStorage.getItem("company_name");
    this.finYear = localStorage.getItem("financial_year");
    this.rate_sl_no = 1;
    this.isHidden = false;
    this.status = true;

    forkJoin(
      this.DropDownListService.getProductionSummurylist(),

    )
      .subscribe(([summarylist]) => {
        //console.log("budata:"+JSON.stringify(budata))
        this.summaryList = summarylist;
      });

  }

  showList(s: string) {
    if (s == "add") {
      this.isHidden = true;
      this.rate_sl_no = 0;
      while (this.prod_summary_dtls.length)
        this.prod_summary_dtls.removeAt(0);
      this.add();
      this.selectedItemName = [];
      this.userForm.reset(this.ResetAllValues().value);
      this.prod_summary_dtls.at(0).patchValue({ sln_no: this.rate_sl_no })
    }
    if (s == "list") {
      this.isHidden = false;
      this.rate_sl_no = 0;
      while (this.prod_summary_dtls.length)

        this.prod_summary_dtls.removeAt(0);
      this.add();
      this.userForm.reset(this.ResetAllValues().value);
      this.prod_summary_dtls.at(0).patchValue({ sln_no: this.rate_sl_no })
      this.DropDownListService.getRSequenceId(localStorage.getItem("financial_year")).subscribe(slno => {
        this.seq_no = slno.sequenceid;
      })
      //this.ratechartsave=false;
      //this.ratechartadd=false;
    }
  }

  ResetAllValues() {
    return this.userForm = this.fb.group({
      id: [''],
      prod_sum_id: [''],
      date: [''],
      totalbags: [''],
      totalqty: [''],
      totalrate: [''],
      totalamount: [''],
      company_id: [''],
      fin_year: [''],
      username: [''],

      prod_summary_dtls: this.fb.array([this.fb.group({
        sl_no: this.rate_sl_no,
        prod_sum_id: '',
        item: '',
        item_name: '',
        packing: '',
        packing_name: '',
        uom_basedon: '',
        capacity: '',
        empty_big_wt: '',
        empbagwt_based_on: '',
        production_qty: '',
        packing_qty: '',
        production_uom: '',
        packing_uom: '',
        rate: '',
        amount: '',
        //remarks: ''
      })])
    });
  }

  onChangeDate(date) {
    this.status = false;
    this.DropDownListService.Productionsummarydatecheck(date.target.value).subscribe(checkdate => {
      if (checkdate["status"] == 'Yes') {
        alert("Dublicate Date Entry !!!!!!!!");
        this.status = true;
      }
      else {
        this.DropDownListService.Productionsummaryitemdetails(date.target.value).subscribe(itemdtls => {
          //console.log(JSON.stringify(itemdtls));
          let i = 0;
          let bags = 0;
          let qty = 0;
          let amount = 0;
          let rate = 0;
          this.add();
          this.rate_sl_no = 0;
          while (this.prod_summary_dtls.length)
            this.prod_summary_dtls.removeAt(0);

          for (let data1 of itemdtls) {
            this.add();
            this.prod_summary_dtls.at(i).patchValue(data1);
            rate += Number(data1["rate"]);
            amount += Number(data1["amount"]);
            bags += Number(data1["packing_qty"]);
            qty += Number(data1["production_qty"]);
            i = i + 1;
          }
          this.userForm.patchValue({ totalrate: rate, totalamount: amount, totalbags: bags, totalqty: this.round(qty, 2) });
          this.status = true;
        });

      }


    })



  }

  add() {
    this.rate_sl_no = this.rate_sl_no + 1;
    this.prod_summary_dtls.push(this.fb.group({
      sl_no: this.rate_sl_no,
      prod_sum_id: '',
      item: '',
      item_name: '',
      packing: '',
      packing_name: '',
      uom_basedon: '',
      capacity: '',
      empty_big_wt: '',
      empbagwt_based_on: '',
      production_qty: '',
      packing_qty: '',
      production_uom: '',
      packing_uom:'',
      rate: '',
      amount: '',
     // remarks: ''
    }));
  }

  deleteSummaryItem(index) {
    if (this.rate_sl_no > 1) {
      this.prod_summary_dtls.removeAt(index);
      this.selectedItemName.splice(index, 1);
      this.rate_sl_no = this.rate_sl_no - 1;
    }
    else {
      this.rate_sl_no = 1;
      this.prod_summary_dtls.reset();

      this.prod_summary_dtls.at(0).patchValue({ sl_no: this.rate_sl_no });
      alert("Can't Delete All Rows");
    }
    let bags = 0;
    let qty = 0;
    let amount = 0;
    let rate = 0;

    for (let i = 1; i <= this.rate_sl_no; i++) {
      this.prod_summary_dtls.at(i - 1).patchValue({ sl_no: i });

    }

    for (let k = 0; k < this.prod_summary_dtls.length; k++) {
      //console.log(k+"rate:"+this.prod_summary_dtls.at(k).get("packing_qty").value)
      rate += Number(this.prod_summary_dtls.at(k).get("rate").value);
      amount += Number(this.prod_summary_dtls.at(k).get("amount").value);
      bags += Number(this.prod_summary_dtls.at(k).get("packing_qty").value);
      qty += Number(this.prod_summary_dtls.at(k).get("production_qty").value);
    }
    this.userForm.patchValue({ totalrate: rate, totalamount: amount, totalbags: bags, totalqty: this.round(qty, 2) });
  }

  balanceWt() {
    let bags = 0;
    let qty = 0;
    let amount = 0;
    let rate = 0;

    for (let k = 0; k < this.prod_summary_dtls.length; k++) {
      // console.log(k+"rate:"+this.prod_summary_dtls.at(k).get("packing_qty").value)
      rate += Number(this.prod_summary_dtls.at(k).get("rate").value);
      amount += Number(this.prod_summary_dtls.at(k).get("amount").value);
      bags += Number(this.prod_summary_dtls.at(k).get("packing_qty").value);
      qty += Number(this.prod_summary_dtls.at(k).get("production_qty").value);
    }
    this.userForm.patchValue({ totalrate: rate, totalamount: amount, totalbags: bags, totalqty: this.round(qty, 2) });
  }

  round(num, decimalPlaces = 0) {
    var p = Math.pow(10, decimalPlaces);
    var n = (num * p) * (1 + Number.EPSILON);
    return Math.round(n) / p;
  }

  getProdPackingQty(packingQty, index) {
    this.prod_summary_dtls.at(index).patchValue({ production_qty: this.round(((this.prod_summary_dtls.at(index).get("capacity").value) * packingQty.target.value), 2) });
  }

  getProdItemQty(itemQty, index) {
    this.prod_summary_dtls.at(index).patchValue({ packing_qty: this.round(Number(itemQty.target.value) / Number(this.prod_summary_dtls.at(index).get("capacity").value), 0) });
  }



  send() {
    this.Id = this.userForm.get("id").value as FormControl;
    this.userForm.patchValue({
      company_id: localStorage.getItem("company_name"),
      fin_year: localStorage.getItem("financial_year"),
      username: localStorage.getItem("username")
    });
    this.status = false;

    if (this.userForm.get("date").value == '' || this.userForm.get("date").value == 0 || this.userForm.get("date").value == null) {
      alert("Please Enter Production Date!")
      this.status = true;
    }
    else {
      if (this.Id > 0) {
        this.Service.updateProdSummary(this.userForm.getRawValue(), this.Id).subscribe(data => {
          alert("Production Summary Updated successfully.");
          this.userForm.reset();
          this.isHidden = false;
          this.showList('list');
          this.ngOnInit();
          this.status = true;
        }, (error) => {
          this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured in Production Summary !!! please Reload the page and try again....");
        });
      }
      else {
        this.Service.createProdsummary(this.userForm.getRawValue())
          .subscribe(data => {
            alert("Production Summary Saved successfully.");
            this.userForm.reset();
            this.showList('list');
            this.ngOnInit();
            this.status = true;
          }, (error) => {
            this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured in Production Summary !!! please Reload the page and try again....");
          });
      }

    }

  }

  onDelete(id) {
    if (confirm("Are you sure to delete this Production Summary From List?")) {
      this.userForm.patchValue({ username: localStorage.getItem("username") });
      this.Service.deleteProdSummary(this.userForm.getRawValue(), id).subscribe(data => {
        alert("This Production Summary Deleted successfully.");
        this.userForm.reset();
        this.status = true;
        this.ngOnInit();
      });

    }
  }

  onUpdate(id, prod_sum_id, action) {
    this.isHidden = true;
    if (action == "view") {
      this.summarysave = false;
    }
    if (action == "update") {
      this.summarysave = true;
    }

    forkJoin(
      this.DropDownListService.retriveProdSummary(id),
      this.DropDownListService.retriveProdSummaryDetails(prod_sum_id),
    ).subscribe(([summary, summarydtls]) => {
      this.userForm.patchValue(summary);

      let k = 0;
      this.rate_sl_no = 0;
      while (this.prod_summary_dtls.length)
        this.prod_summary_dtls.removeAt(0);
      for (let data1 of summarydtls) {
        this.add();
        this.prod_summary_dtls.patchValue(summarydtls);
        k++;
      }


      this.status = true;
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured in Production Summary,please try again....");
      this.ngOnInit()
    });
  }

  posting(id,action)
  {
    if(action=='Posting')
      {
      this.DropDownListService.ProdSummaryPosting(id).subscribe(data=>
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
        if(confirm("Are you sure to Posting Undo Of this Production Summary ?"))
        {
          if(confirm("First Delete This Production Summary From Tally!!!"))
          {
            this.DropDownListService.prodSummaryPostingUndo(id,localStorage.getItem("username")).subscribe(data=>
              {
                if(data["status"] =='Done')
                {
                  alert("Production Summary Posting Undo Sucessfully !!!!!!!!!!!!! ");
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
