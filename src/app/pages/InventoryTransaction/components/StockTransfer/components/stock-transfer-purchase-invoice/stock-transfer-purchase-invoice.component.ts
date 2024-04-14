import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { formatDate} from '@angular/common';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { MatDialog } from '@angular/material';
import { MatDialogConfig} from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { StockTransferPurchaseInvoice} from '../../../../../../models/StockTransfer/stock-transfer-purchase-invoice';
import { StockTaxPopupComponent } from '../stock-tax-popup/stock-tax-popup.component';
import { StkGrnPurchasePopupComponent } from '../stk-grn-purchase-popup/stk-grn-purchase-popup.component';
import { StockTransferPurchaseInvoiceAccountpostingComponent } from '../stock-transfer-purchase-invoice-accountposting/stock-transfer-purchase-invoice-accountposting.component';

@Component({
  selector: 'app-stock-transfer-purchase-invoice',
  templateUrl: './stock-transfer-purchase-invoice.component.html',
  styleUrls: ['./stock-transfer-purchase-invoice.component.scss']
})
export class StockTransferPurchaseInvoiceComponent implements OnInit {

  isHidden = false;
  model: StockTransferPurchaseInvoice = new StockTransferPurchaseInvoice();
  listStockTransferPurchaseInvoice: StockTransferPurchaseInvoice[];
  item_sl_no = 1;  
  BU_Unit:any;
  packingItem:any=[];
  status = false; 
  employeeNames:{};
  businesslists:any = [];
  vehicleList:any = [];
  company_name:any;
  financialYear:any;
  item_codes:{};
  submitted = false;
  currentDate:any;
  empty_bag_wt:any = [];
  capacity:any = [];
  itemId: any; 
  BU:any;
  Stk_PurInvDate:any;
  seq_no:string;
  ledgerNames:any=[];
  public userForm:FormGroup;
  stocktransferpurchaseinvoicesave:boolean = true;
  stocktransferpurchaseinvoiceupdate:boolean = true;
  stocktransferpurchaseinvoiceview:boolean = true;
  stocktransferpurchaseinvoicedelete:boolean=true;
  stocktransferpurchaseinvoiceprint:boolean=true;
  totalItem:any;
  totalDiscount:any;
  totalTaxAmt:any;
  totalNetAmt:any;
  totalGrossAmt:any;
  totalQcDeduction:any;
  totalNetAmtAfterDeduction:any;
  alreadyPaid:any;
  add:any;
  sub:any;
  Id:any;

  constructor(public fb:FormBuilder,private Service:Master,public dialog: MatDialog,
    private DropDownListService :DropdownServiceService,)
  {
    this.userForm=fb.group(
    {
      id:[''],
      reference_id: [''],
      stk_trans_pur_inv_id:[''],
      stk_trans_pur_inv_no:[''],
      stk_trans_pur_inv_date :[''],
      business_unit :  [''],
      created_by : [''],
      vehicle_id:[''],
      remarks:[''],
      company_id: [''],
      fin_year: [''],   
      item_total:[''],
      item_total_gl_ac:[''],
      discount:[''],
      discount_gl_ac :  [''],
      qc_deduction :  [''],
      qc_deduction_gl_ac : [''],
      net_amt : [''],
      net_amt_gl_ac : [''],
      amt_after_deduction :[''],
      amt_after_deduction_gl_ac : [''],
      add_tax  : [''],
      add_tax_gl_ac : [''],
      post_tax_amt :[''],
      post_tax_amt_gl_ac :[''],
      other_charges : [''],
      other_charges_gl_ac : [''],
      payable_amt: [''],
      payable_amt_gl_ac: [''],
      add1 : [''],
      add1_gl_ac : [''],
      add2 : [''],
      add2_gl_ac : [''],
      roundoff_amt : [''],
      roundoff_gl_ac : [''],
      payable_party : [''], 
      payable_party_gl_ac : [''],
      already_paid : [''],
      already_paid_gl_ac : [''],
      net_payable_party :[''],
      net_payable_party_gl_ac : [''],
      username: [''],
      send_business_unit: [''],
  
      stk_transfer_pur_inv_item_dtls: this.fb.array([this.fb.group(
      {
        slno:this.item_sl_no,
        adv_item_code:'',	
        adv_packing_item:'',
        passed_packing_qty:'',	
        passed_packing_uom:'',	
        passed_item_qty:'',	
        passed_mat_weight:'',	
        passed_item_uom:'',	
        unit_rate:'',	
        price_based_on:'',
        amount:'',	
        discount:'',	
        discount_basedon:'',	
        discount_amount:'',	 
        net_amount:'',	
        qc_deduction :'',
        net_amt_after_qc :'',
        tax_code:'',	
        tax_rate:'',
        tax_amt:'',	     
        gross_amt:'',	
        gl_acc:''
      })]),

      stk_transfer_pur_inv_bu_dtls: this.fb.group({ 
        businessunit_name: '',
        mobile_no: '',
        email_id: '',
        work_address: ''}),    
        
      stk_transfer_pur_inv_docs: this.fb.array([this.fb.group({
        doc_name: '' })]),

      stk_transfer_pur_inv_musterroll_dtls: this.fb.array([this.fb.group({
        muster_roll_name: '' })]),
        
      stk_transfer_pur_inv_tax_info:this.fb.group(
      {
        pan: '',
        gst :'',
        cin:'',
        tan: '' 
      }),
    });
  }

  get id(){ return this.userForm.get("id") as FormControl }
  
  get reference_id(){ return this.userForm.get("reference_id") as FormControl }

  get stk_trans_pur_inv_id(){ return this.userForm.get("stk_trans_pur_inv_id") as FormControl }
  get stk_trans_pur_inv_no(){ return this.userForm.get("stk_trans_pur_inv_no") as FormControl }
  get stk_trans_pur_inv_date(){ return this.userForm.get("stk_trans_pur_inv_date") as FormControl }
  get business_unit(){ return this.userForm.get("business_unit") as FormControl }
  get send_business_unit(){ return this.userForm.get("send_business_unit") as FormControl }
  get created_by(){ return this.userForm.get("created_by") as FormControl }
  get vehicle_id(){ return this.userForm.get("vehicle_id") as FormControl }
  get remarks(){ return this.userForm.get("remarks") as FormControl }
  get company_id(){ return this.userForm.get("company_id") as FormControl }
  get fin_year(){ return this.userForm.get("fin_year") as FormControl }
  get item_total(){ return this.userForm.get("item_total") as FormControl }
  get item_total_gl_ac(){ return this.userForm.get("item_total_gl_ac") as FormControl }
  get discount(){ return this.userForm.get("discount") as FormControl }
  get discount_gl_ac(){ return this.userForm.get("discount_gl_ac") as FormControl }
  get qc_deduction(){ return this.userForm.get("qc_deduction") as FormControl }
  get qc_deduction_gl_ac(){ return this.userForm.get("qc_deduction_gl_ac") as FormControl }
  get net_amt(){ return this.userForm.get("net_amt") as FormControl }
  get net_amt_gl_ac(){ return this.userForm.get("net_amt_gl_ac") as FormControl }
  get amt_after_deduction(){ return this.userForm.get("amt_after_deduction") as FormControl }
  get amt_after_deduction_gl_ac(){ return this.userForm.get("amt_after_deduction_gl_ac") as FormControl }  
  get add_tax(){ return this.userForm.get("add_tax") as FormControl }
  get add_tax_gl_ac(){ return this.userForm.get("add_tax_gl_ac") as FormControl }
  get post_tax_amt(){ return this.userForm.get("post_tax_amt") as FormControl }
  get post_tax_amt_gl_ac(){ return this.userForm.get("post_tax_amt_gl_ac") as FormControl }  
  get other_charges(){ return this.userForm.get("other_charges") as FormControl }
  get other_charges_gl_ac(){ return this.userForm.get("other_charges_gl_ac") as FormControl }
  get payable_amt(){ return this.userForm.get("payable_amt") as FormControl }
  get payable_amt_gl_ac(){ return this.userForm.get("payable_amt_gl_ac") as FormControl }  
  get add1(){ return this.userForm.get("add1") as FormControl }
  get add1_gl_ac(){ return this.userForm.get("add1_gl_ac") as FormControl }
  get add2(){ return this.userForm.get("add2") as FormControl }
  get add2_gl_ac(){ return this.userForm.get("add2_gl_ac") as FormControl }
  get roundoff_amt(){ return this.userForm.get("roundoff_amt") as FormControl }
  get roundoff_gl_ac(){ return this.userForm.get("roundoff_gl_ac") as FormControl }
  get payable_party(){ return this.userForm.get("payable_party") as FormControl }
  get payable_party_gl_ac(){ return this.userForm.get("payable_party_gl_ac") as FormControl }
  get already_paid(){ return this.userForm.get("already_paid") as FormControl }
  get already_paid_gl_ac(){ return this.userForm.get("already_paid_gl_ac") as FormControl } 
  get net_payable_party(){ return this.userForm.get("net_payable_party") as FormControl }
  get net_payable_party_gl_ac(){ return this.userForm.get("net_payable_party_gl_ac") as FormControl }   
  
  get stk_transfer_pur_inv_item_dtls() { return this.userForm.get('stk_transfer_pur_inv_item_dtls') as FormArray;}
  get stk_transfer_pur_inv_tax_info() { return this.userForm.get('stk_transfer_pur_inv_tax_info') as FormGroup;}
  get stk_transfer_pur_inv_musterroll_dtls() { return this.userForm.get('stk_transfer_pur_inv_musterroll_dtls') as FormArray;}
  get stk_transfer_pur_inv_docs() { return this.userForm.get('stk_transfer_pur_inv_docs') as FormArray;}
  get stk_transfer_pur_inv_bu_dtls() { return this.userForm.get('stk_transfer_pur_inv_bu_dtls') as FormGroup; }

  ngOnInit() 
  {
    //For User Role
    let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
    this.stocktransferpurchaseinvoicesave = false;
    this.stocktransferpurchaseinvoiceupdate = false;
    this.stocktransferpurchaseinvoiceview = false;
    this.stocktransferpurchaseinvoicedelete=false;
    this.stocktransferpurchaseinvoiceprint=false;

    if(accessdata.includes('stock_transfer_pur_inv.save'))
    {
     this.stocktransferpurchaseinvoicesave = true;
    }
    if(accessdata.includes('stock_transfer_pur_inv.update'))
    { 
      this.stocktransferpurchaseinvoiceupdate=true;
    }
    if(accessdata.includes('stock_transfer_pur_inv.view'))
    { 
      this.stocktransferpurchaseinvoiceview=true;
    }
    if(accessdata.includes('stock_transfer_pur_inv.delete'))
    { 
      this.stocktransferpurchaseinvoicedelete=true;
    }
    if(accessdata.includes('stock_transfer_pur_inv.print'))
    { 
      this.stocktransferpurchaseinvoiceprint=true;
    }
    
    this.company_name = localStorage.getItem("company_name");
    this.financialYear = localStorage.getItem("financial_year");
    this.userForm.patchValue({created_by:"0"});
    this.DropDownListService.employeeNamesList(this.company_name).subscribe(data=>{this.employeeNames = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});   
    //this.DropDownListService.itemNamesList()
    this.DropDownListService.itemNamesNewList()
    .subscribe(data=>{this.item_codes = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});   
    this.Service.getStkTranPurInvs("company="+this.company_name+"&finyear="+this.financialYear).subscribe(data=>{this.listStockTransferPurchaseInvoice  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});   
    this.DropDownListService.custometrBusList(this.company_name).subscribe(data=>{this.businesslists  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});   
    this.DropDownListService.ledgerNameList().subscribe(data=>{this.ledgerNames  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});   
    this.DropDownListService.getVehcleno().subscribe(data=>{this.vehicleList  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});   
    //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
    this.userForm.patchValue({created_by:"0"});
    this.userForm.patchValue({business_unit: "0", item_total_gl_ac: "0",
      discount_gl_ac: "0", net_total_gl_ac: "0", tax_total_gl_ac: "0",
      total_bill_amt_gl_ac: "0", applicable_gl_ac: "0", adj1_gl_ac: "0",
      adj2_gl_ac: "0", roundoff_gl_ac: "0", final_bill_amt_gl_ac: "0",
      payable_amt_gl_ac: "0", tcsglac: "0"});
   
    this.status = true;
  }

  addItem() 
   {
      this.item_sl_no= this.item_sl_no + 1;
      this.stk_transfer_pur_inv_item_dtls.push(this.fb.group({ 
      slno:this.item_sl_no,
      adv_item_code:'',	
      adv_packing_item:'',
      passed_packing_qty:'',	
      passed_packing_uom:'',	
      passed_item_qty:'',	
      passed_mat_weight:'',	
      passed_item_uom:'',	
      unit_rate:'',	
      price_based_on:'',
      amount:'',	
      discount:'',	
      discount_basedon:'',	
      discount_amount:'',	 
      net_amount:'',	
      qc_deduction :'',
      net_amt_after_qc :'',
      gross_amt:'',
      tax_code:'',
      tax_rate:'',	
      tax_amt:'',	     
      gl_acc:''}));
   }
 
  deleteItem(index) 
  {
    if(this.item_sl_no > 1)
     { 
      this.stk_transfer_pur_inv_item_dtls.removeAt(index);
      this.item_sl_no = this.item_sl_no - 1;
     }
    else
     {
      this.item_sl_no = 1;
      alert("can't delete all rows");
      this.stk_transfer_pur_inv_item_dtls.reset();
      this.stk_transfer_pur_inv_item_dtls.at(0).patchValue({slno: this.item_sl_no});
     } 
    
    for(let i=1; i<=this.item_sl_no; i++)
    this.stk_transfer_pur_inv_item_dtls.at(i-1).patchValue({slno: i});   
  }

  addMusterRoll() 
   {
    this.stk_transfer_pur_inv_musterroll_dtls.push(this.fb.group({
    muster_roll_name : '' }));
   }
 
  deleteMusterRoll(index) 
   {
    if(index)
    {this.stk_transfer_pur_inv_musterroll_dtls.removeAt(index);}
    else
    {
      alert("can't delete all rows");
      this.stk_transfer_pur_inv_musterroll_dtls.reset();
    }
   }

  addDocument() 
   {
    this.stk_transfer_pur_inv_docs.push(this.fb.group({
    doc_name : '' }));
   }

  deleteDocument(index) 
   {
    if(index)
    {this.stk_transfer_pur_inv_docs.removeAt(index);}
    else
    {
      alert("can't delete all rows");
      this.stk_transfer_pur_inv_docs.reset();
    }
   }

  showList(s:string)
    {
      if(this.stocktransferpurchaseinvoicesave == true  && this.stocktransferpurchaseinvoiceupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.patchValue({created_by:"0"});
          this.userForm.patchValue({business_unit: "0", item_total_gl_ac: "0",
            discount_gl_ac: "0", qc_deduction_gl_ac: "0", net_amt_gl_ac: "0",
            amt_after_deduction_gl_ac: "0", add_tax_gl_ac: "0", post_tax_amt_gl_ac: "0",
            other_charges_gl_ac: "0", payable_amt_gl_ac: "0", add1_gl_ac: "0",net_payable_party_gl_ac:"0",
            add2_gl_ac: "0", roundoff_gl_ac: "0",payable_party_gl_ac:"0",already_paid_gl_ac:"0"});
        }
      }
      if(this.stocktransferpurchaseinvoicesave == true  && this.stocktransferpurchaseinvoiceupdate == false)
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.patchValue({created_by:"0"});
          this.userForm.patchValue({business_unit: "0", item_total_gl_ac: "0",
            discount_gl_ac: "0", qc_deduction_gl_ac: "0", net_amt_gl_ac: "0",
            amt_after_deduction_gl_ac: "0", add_tax_gl_ac: "0", post_tax_amt_gl_ac: "0",
            other_charges_gl_ac: "0", payable_amt_gl_ac: "0", add1_gl_ac: "0",net_payable_party_gl_ac:"0",
            add2_gl_ac: "0", roundoff_gl_ac: "0",payable_party_gl_ac:"0",already_paid_gl_ac:"0"});
        }
      }
      
      if(s=="list")
      {
        this.isHidden=false;
        this.userForm.reset(this.ResetAllValues().value);
        //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      }
    }

    ResetAllValues()
     {
        return this.userForm=this.fb.group({
          id:[''],
          reference_id: [''],
          stk_trans_pur_inv_id:[''],
          stk_trans_pur_inv_no:[''],
          stk_trans_pur_inv_date :[''],
          business_unit :  [''],
          created_by : [''],
          vehicle_id:[''],
          remarks:[''],
          company_id: [''],
          fin_year: [''],   
          item_total:[''],
          item_total_gl_ac:[''],
          discount:[''],
          discount_gl_ac :  [''],
          qc_deduction :  [''],
          qc_deduction_gl_ac : [''],
          net_amt : [''],
          net_amt_gl_ac : [''],
          amt_after_deduction :[''],
          amt_after_deduction_gl_ac : [''],
          add_tax  : [''],
          add_tax_gl_ac : [''],
          post_tax_amt :[''],
          post_tax_amt_gl_ac :[''],
          other_charges : [''],
          other_charges_gl_ac : [''],
          payable_amt: [''],
          payable_amt_gl_ac: [''],
          add1 : [''],
          add1_gl_ac : [''],
          add2 : [''],
          add2_gl_ac : [''],
          roundoff_amt : [''],
          roundoff_gl_ac : [''],
          payable_party : [''], 
          payable_party_gl_ac : [''],
          already_paid : [''],
          already_paid_gl_ac : [''],
          net_payable_party :[''],
          net_payable_party_gl_ac : [''],
          username: [''],
          send_business_unit:[''],
    
        stk_transfer_pur_inv_item_dtls: this.fb.array([this.fb.group(
        {
          slno:this.item_sl_no,
          adv_item_code:'',	
          adv_packing_item:'',
          passed_packing_qty:'',	
          passed_packing_uom:'',	
          passed_item_qty:'',	
          passed_mat_weight:'',	
          passed_item_uom:'',	
          unit_rate:'',	
          price_based_on:'',
          amount:'',	
          discount:'',	
          discount_basedon:'',	
          discount_amount:'',	 
          net_amount:'',	
          qc_deduction :'',
          net_amt_after_qc :'',
          tax_code:'',	
          tax_rate:'',
          tax_amt:'',	     
          gross_amt:'',	
          gl_acc:''
        })]),

        stk_transfer_pur_inv_bu_dtls: this.fb.group({ 
          businessunit_name: '',
          mobile_no: '',
          email_id: '',
          work_address: ''}),    
          
        stk_transfer_pur_inv_docs: this.fb.array([this.fb.group({
          doc_name: '' })]),

        stk_transfer_pur_inv_musterroll_dtls: this.fb.array([this.fb.group({
          muster_roll_name: '' })]),
          
        stk_transfer_pur_inv_tax_info:this.fb.group(
        {
          pan: '',
          gst :'',
          cin:'',
          tan: '' 
        })
      });
    }

    OnChangeStkDate(StkGrnDate:any, operation)
    {
      this.BU= this.userForm.get("business_unit").value as FormControl;
      this.status = false;
      if(this.BU!= null && this.BU!="0" && this.BU!="" && this.BU!=undefined)
      {
        this.DropDownListService.getSTPISequenceId(this.currentDate + "/"+ this.BU).subscribe(data=>
        {
          this.seq_no = data.sequenceid;
          this.status = true;
        }); 
      }   
    }

    openDialog()
    {
      this.BU_Unit= this.userForm.get("business_unit").value as FormControl;
      this.Id=this.userForm.get("id").value;
      if(this.Id == null || this.Id =='')
      {
        this.Id=0;
      //  console.log("tuhin here12345 :: "+this.Id)
      }
      
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      if(this.BU_Unit != "0" && this.BU_Unit !=null && this.BU_Unit !="")
      {
        dialogConfig.data = {BU_unit:this.BU_Unit,Company_Name:this.company_name,FinYear:this.financialYear,Stk_Date:this.currentDate,id:this.Id};
        const dialogRef = this.dialog.open(StkGrnPurchasePopupComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => 
        {  
          console.log("ewewr: "+ JSON.stringify (data));
          if(data != '' && data["stk_grn_id"] != "0" && data["stk_grn_id"] != undefined)
          {
           
            this.totalItem = 0;
            this.totalDiscount = 0;
            this.totalNetAmt = 0;
            this.totalQcDeduction = 0;
            this.totalNetAmtAfterDeduction = 0;
            this.totalTaxAmt = 0;
            this.totalGrossAmt = 0;
            this.alreadyPaid = 0;
            this.add = 0;
            this.sub = 0;
//console.log("hello here "+data["stk_grn_id"])
           
            let  i=0;
            this.addItem();
            this.item_sl_no = 0;
            while(this.stk_transfer_pur_inv_item_dtls.length)
            this.stk_transfer_pur_inv_item_dtls.removeAt(0);

            for(let data1 of data.stk_transfer_grn_item_details)
            { 
              if(data1.checkbox == true || data1.checkbox == "true")
              {
                this.status = false;
                forkJoin(
                  this.DropDownListService.getItemMasterPackMat(data1["adv_item_code"]),
                  this.DropDownListService.getItemPackUom(data1["adv_item_code"], data1["adv_packing"],this.company_name)
                ).subscribe(([packingList, capacityEmptyWt])=>
                  {
                    this.status = true;
                    this.capacity[i] = capacityEmptyWt.capacity;
                    this.empty_bag_wt[i] =  capacityEmptyWt.empty_big_wt;
                    this.onchangeItemName1(data1["adv_item_code"],i)
                    this.addItem();
                  
                    this.stk_transfer_pur_inv_item_dtls.at(i).patchValue({
                     adv_item_code: data1["adv_item_code"], adv_item_name: data1["adv_item_name"], adv_packing_item: data1["adv_packing"],
                      passed_packing_qty: data1["pssd_pack_qty"], passed_packing_uom: data1["pssd_pack_uom"],
                      passed_item_qty: data1["pssd_item_qty"], passed_mat_weight: data1["pssd_mat_wt"], passed_item_uom: data1["pssd_item_uom"],
                      unit_rate: data1["unit_rate"], price_based_on: data1["price_based_on"], net_amount:data1["net_amt"],
                      amount: data1["amount"], discount: data1["discount"], discount_basedon: data1["discount_based_on"],
                      discount_amount:data1["discount_amt"], discount_amt:data1["discount_amt"], qc_deduction: data1["qc_deduction"],  
                      net_amt_after_qc: data1["net_amt_after_qc"], tax_code: data1["tax_code"],
                      tax_rate: data1["tax_rate"], tax_amt: data1["tax_amt"], gross_amt: data1["gross_amt"]});
                    
                      this.totalItem = this.totalItem + parseFloat(data1["amount"]);
                      this.totalDiscount = this.totalDiscount + parseFloat(data1["discount_amt"]);
                      this.totalTaxAmt = this.totalTaxAmt + parseFloat(data1["tax_amt"]);
                      this.totalNetAmt = this.totalNetAmt + parseFloat(data1["net_amt"]);
                      this.totalGrossAmt =  this.totalGrossAmt + parseFloat(data1["gross_amt"]);
                      this.totalQcDeduction = this.totalQcDeduction + parseFloat(data1["qc_deduction"]);
                      this.totalNetAmtAfterDeduction = this.totalNetAmtAfterDeduction + parseFloat(data1["net_amt_after_qc"]);


                      this.calculatnew(this.totalItem, this.totalDiscount, this.totalTaxAmt, this.totalNetAmt, 
                        this.totalQcDeduction, this.totalNetAmtAfterDeduction, this.add, this.sub,
                        0, this.alreadyPaid, this.totalGrossAmt)
                    
                      i = i + 1;
                  });
              }
            }

            this.status = false;
            forkJoin(
              this.DropDownListService.getStkTranGrnDocs(data["stk_grn_id"]),
              this.DropDownListService.getStkTranGrnDtls("stkgrnid="+data["stk_grn_id"])
            ).subscribe(([Docdata, StkTranGrnDtls])=>
            {      
              this.stk_transfer_pur_inv_docs.patchValue(Docdata);
              this.userForm.patchValue({vehicle_id:StkTranGrnDtls["vehicle_id"]});       

              this.userForm.patchValue({reference_id: data["stk_grn_id"],send_business_unit:StkTranGrnDtls["b_unit"]});
           });
          }  
        }); 
       }else{alert("Select Business Unit First...")}
    }

    
    calculatnew(amt, dscAmt, taxAmt, netAmt, qcDeduction, netAmtAfterDeduction, add, sub,
      otherCharges, alreadyPaid, grossAmt)
    {
      //console.log(amt+" / "+ dscAmt+" / "+ taxAmt+" / "+ netAmt+" / "+ qcDeduction+" / "+ netAmtAfterDeduction+" / "+ add+" / "+ sub+" / "+
     // otherCharges+" / "+alreadyPaid+" / "+ grossAmt)
     let postamountcal:number=0,amountdefuction:number=0;

     amountdefuction = Number(netAmtAfterDeduction) - Number(qcDeduction);
   
     postamountcal= amountdefuction+Number(taxAmt);
     //console.log(amountdefuction + " / " + postamountcal +" / " +(Math.round(amt * 100) / 100).toFixed(2)+" / "+(Math.round(dscAmt  * 100) / 100).toFixed(2)+" / "+(Math.round(taxAmt * 100) / 100).toFixed(2)+" / "+(Math.round(netAmt  * 100) / 100).toFixed(2)+" / "+(Math.round(qcDeduction  * 100) / 100).toFixed(2)+" / "+(Math.round(amountdefuction  * 100) / 100).toFixed(2)+" / "+(Math.round(postamountcal* 100) / 100).toFixed(2)+" / "+(Math.round((postamountcal + add - sub))).toFixed(2)+" / "+(Math.round((postamountcal + add - sub - alreadyPaid))).toFixed(2) )
     this.userForm.patchValue({item_total: (Math.round(amt * 100) / 100).toFixed(2), 
        discount: (Math.round(dscAmt  * 100) / 100).toFixed(2), 
        add_tax: (Math.round(taxAmt * 100) / 100).toFixed(2), 
        net_amt: (Math.round(netAmt  * 100) / 100).toFixed(2),
        qc_deduction: (Math.round(qcDeduction  * 100) / 100).toFixed(2), 
        amt_after_deduction: (Math.round(amountdefuction  * 100) / 100).toFixed(2),
        post_tax_amt: (Math.round(postamountcal* 100) / 100).toFixed(2),
        payable_amt:  (Math.round((postamountcal)  * 100) / 100).toFixed(2), 
        payable_party: (Math.round((postamountcal + add - sub))).toFixed(2),
        net_payable_party: (Math.round((postamountcal + add - sub - alreadyPaid))).toFixed(2)});
      this.calRoundOfFigure(postamountcal + add - sub);
    }

    calRoundOfFigure(payableToPartyamount)
    {
      console.log("roudof "+ payableToPartyamount)
      let roundOfAmt = Math.round(payableToPartyamount * 100) % 100;
      console.log("roundOfAmt "+ roundOfAmt )
      if(roundOfAmt >= 50)
      {
        roundOfAmt = 100 - roundOfAmt;
        console.log("roundOfAmt if "+ roundOfAmt)
        this.userForm.patchValue({roundoff_amt: Number(Number(roundOfAmt)/100).toFixed(2)})
      }
      else
      {
        this.userForm.patchValue({roundoff_amt: Number(0 - Number(roundOfAmt)/100).toFixed(2)});};
    }

    showPopUp(index)
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index};

      const dialogRef = this.dialog.open(StockTaxPopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => 
      {
        this.stk_transfer_pur_inv_item_dtls.at(index).patchValue({tax_code: data["tax_id"], tax_rate: data["tax_rate"]});
      }); 
    }

    onchangeItemName(index, event)
    {
      if(event.target.value != '0')
      {
        this.status = false;
        forkJoin(
          this.DropDownListService.getItemNameById(event.target.value,this.company_name),
          this.DropDownListService.getItemMasterPackMat(event.target.value)
        ).subscribe(([itemNameData, packingItemData])=>
        {      
          this.stk_transfer_pur_inv_item_dtls.at(index).patchValue({adv_item_name: itemNameData["item_name"]});
          this.packingItem[index] = packingItemData;
          this.DropDownListService.getUomName(itemNameData["mstock_unit"]).subscribe(data=>
          { 
            this.stk_transfer_pur_inv_item_dtls.at(index).patchValue({passed_item_uom: data.description}); 
            this.status = true;
          });
        });
      }
    }

    onchangeItemName1(Itam:string,index)
    {
      if(Itam != '0')
      {
        this.status = false;
        forkJoin(
          this.DropDownListService.getItemMasterPackMat(Itam)
        ).subscribe(([packingItemData])=>
        {        
          this.packingItem[index] = packingItemData;
          this.status = true;
        });
      }
    }
 
    onchangePackingItem(index, event)
    {
      if(event.target.value != '0')
      {
        this.itemId =  this.stk_transfer_pur_inv_item_dtls.at(index).get("adv_item_code").value as FormControl; 
        this.status = false;
        this.DropDownListService.getItemPackUom(this.itemId, event.target.value,this.company_name).subscribe(data=>
        {  
          this.capacity[index] = data.capacity; 
          this.empty_bag_wt[index] =  data.empty_big_wt;
          this.stk_transfer_pur_inv_item_dtls.at(index).patchValue({passed_packing_uom: data.uom1}); 
          this.status = true;
        }); 
      }
    }

    getItemQty(event, index)
    {
      let itemQty = this.capacity[index] * event;
      let matwt = itemQty - this.empty_bag_wt[index];
      this.stk_transfer_pur_inv_item_dtls.at(index).patchValue({passed_item_qty: itemQty,
        passed_mat_weight: (Math.round(matwt * 1000) / 1000).toFixed(3)});
    }

    onChangeBusinessUnit(event)
    {
      this.Stk_PurInvDate = this.userForm.get("stk_trans_pur_inv_date").value as FormControl;
      if(event != "0")
      {
        this.status = false;

        forkJoin(
          this.DropDownListService.getSTPISequenceId(this.Stk_PurInvDate +"/"+event),
          this.DropDownListService.getCompanyBUAddress(event)
        ).subscribe(([seqdata, BUdata])=>
          {
            this.seq_no = seqdata.sequenceid;                 
            this.stk_transfer_pur_inv_tax_info.patchValue({pan: BUdata["pan_no"], gst: BUdata["gstin_no"]})  
            this.stk_transfer_pur_inv_bu_dtls.patchValue({mobile_no: BUdata["mobile_no"],
            email_id: BUdata["email_id"], work_address: BUdata["work_address"],businessunit_name:BUdata["businessunit_name"]});
            this.status=true; 
          })
       }
    }

  send()
  {
    this.userForm.patchValue({ 
      company_id: localStorage.getItem("company_name"), fin_year:localStorage.getItem("financial_year"),
      username: localStorage.getItem("username")});
    this.submitted = true;
    if(!this.userForm.valid) 
    {
      alert('Please fill all fields!')
      return false;
    } else {

      this.status = false;
      if(this.userForm.get("business_unit").value == null || this.userForm.get("business_unit").value == 0)
      {
        alert("Please Select Business Unit");
        this.status=true;
      }
      else if(this.userForm.get("created_by").value == null || this.userForm.get("created_by").value == 0)
      {
        alert("Please Select Created By");
        this.status=true;
      }
      // else if(this.userForm.get("vehicle_id").value == null || this.userForm.get("vehicle_id").value == 0)
      // {
      //   alert("Please Select Truck Number");
      //   this.status=true;
      // }
      else
      {
        let itemcheck = false;
        let packingcheck = false;
        let itemquantity = false;
        let packingquantity = false;
        let price = false;
        let pricebasedon = false;
        for(let b=0;b<this.stk_transfer_pur_inv_item_dtls.length;b++)
        {
          if(this.stk_transfer_pur_inv_item_dtls.at(b).get("adv_item_code").value == null || this.stk_transfer_pur_inv_item_dtls.at(b).get("adv_item_code").value == 0)
          {
             itemcheck = true;
          }
          if(this.stk_transfer_pur_inv_item_dtls.at(b).get("adv_packing_item").value == null || this.stk_transfer_pur_inv_item_dtls.at(b).get("adv_packing_item").value == 0)
          {
             packingcheck = true;
          }
          if(this.stk_transfer_pur_inv_item_dtls.at(b).get("passed_item_qty").value == null || this.stk_transfer_pur_inv_item_dtls.at(b).get("passed_item_qty").value == 0)
          {
            itemquantity = true;
          }
          if(this.stk_transfer_pur_inv_item_dtls.at(b).get("passed_packing_qty").value == null || this.stk_transfer_pur_inv_item_dtls.at(b).get("passed_packing_qty").value == 0)
          {
            packingquantity = true;
          }
          if(this.stk_transfer_pur_inv_item_dtls.at(b).get("unit_rate").value == null || this.stk_transfer_pur_inv_item_dtls.at(b).get("unit_rate").value == 0)
          {
             price = true;
          }
          if(this.stk_transfer_pur_inv_item_dtls.at(b).get("price_based_on").value == null || this.stk_transfer_pur_inv_item_dtls.at(b).get("price_based_on").value == 0)
          {
             pricebasedon = true;
          }
        }

        if(itemcheck == true)
        {
          alert("Please Select ADVICE ITEM NAME in SERVICE / ITEM DETAILS Tab!!!");this.status = true;
        }
        else if(packingcheck == true)
        {
          alert("Please Select ADVICE PACKING ITEM in SERVICE / ITEM DETAILS Tab!!!");this.status = true;
        }
        else if(packingquantity == true)
        {
          alert("Please Enter PASSED PACKING QTY in SERVICE / ITEM DETAILS Tab!!!");this.status = true;
        }
        else if(itemquantity == true)
        {
          alert("Please Enter PASSED ITEM QTY in SERVICE / ITEM DETAILS Tab!!!");this.status = true;
        }
        else if(price == true)
        {
          alert("Please Enter UNIT RATE in SERVICE / ITEM DETAILS Tab!!!");this.status = true;
        }
        else if(pricebasedon == true)
        {
          alert("Please Select PRICE BASED ON in SERVICE / ITEM DETAILS Tab!!!");this.status = true;
        }
        else if(this.stk_transfer_pur_inv_tax_info.get("pan").value == null || this.stk_transfer_pur_inv_tax_info.get("pan").value == 0)
        {
          alert("Please Enter PAN No. in Tax Information Tab!!!");this.status = true;
        }
        else if(this.stk_transfer_pur_inv_tax_info.get("gst").value == null || this.stk_transfer_pur_inv_tax_info.get("gst").value == 0)
        {
          alert("Please Enter GST No. in Tax Information Tab!!!");this.status = true;
        }
        else
        {
          console.log("here id " + this.userForm.get("reference_id").value)
          
         this.Service.createStkTranPurInv(this.userForm.getRawValue())
         .subscribe( data => {
          console.log(this.userForm.getRawValue());
           alert("New Stock Trans Purchase Inv created successfully.");
           this.status = true;
           this.ngOnInit();
           this.isHidden=false;          
         }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
       //  this.ngOnInit()
        });  
        }
      }
        
    }
  }

  onClickBillPrint(id,stk_trans_pur_inv_id)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { index: 0,};
    let dialogref;
  
    dialogref=this.dialog.open(StockTransferPurchaseInvoiceAccountpostingComponent, {data:{id: id,stk_trans_pur_inv_id:stk_trans_pur_inv_id},height: '80%',
    width: '60%' } );
    dialogref.afterClosed().subscribe(data =>
    { 

    });
  }

  onUpdate(id:any, pbid:string, action)
    {
      
      this.userForm.patchValue({id: id});	
      this.status = false;
      this.isHidden = true;
      this.packingItem = [];
      if(action == 'view')
      {this.stocktransferpurchaseinvoicesave=false;;}
    
      forkJoin(
        this.Service.stkPurInvRetriveList(id),
        this.Service.stkPurInvItemRetriveList(pbid),      
        this.Service.stkPurInvMusterRollRetriveList(pbid),
        this.Service.stkPurInvTaxInfoRetriveList(pbid),
        this.Service.stkPurInvBuRetriveList(pbid),
        this.Service.stkPurInvDocsRetriveList(pbid),
       
      ).subscribe(([purinv, itemData, MusterrollData, tax, budata,docdata])=>
        {
                //console.log("chk static data:"+JSON.stringify(purinv))
                //this.userForm.patchValue(purinv);
                this.userForm.patchValue({stk_trans_pur_inv_date:purinv["stk_trans_pur_inv_date"],business_unit:purinv["business_unit"],stk_trans_pur_inv_no:purinv["stk_trans_pur_inv_no"],
                created_by:purinv["created_by"],vehicle_id:purinv["vehicle_id"],remarks:purinv["remarks"],item_total:purinv["item_total"],discount:purinv["discount"],
                net_amt:purinv["net_amt"],qc_deduction:purinv["qc_deduction"],amt_after_deduction:purinv["amt_after_deduction"],add_tax:purinv["add_tax"],
                post_tax_amt:purinv["post_tax_amt"],other_charges:purinv["other_charges"],payable_amt:purinv["payable_amt"],add1:purinv["add1"],add2:purinv["add2"],
                roundoff_amt:purinv["roundoff_amt"],payable_party:purinv["payable_party"],already_paid:purinv["already_paid"],net_payable_party:purinv["net_payable_party"],
                reference_id:purinv["reference_id"],item_total_gl_ac:purinv["item_total_gl_ac"],discount_gl_ac:purinv["discount_gl_ac"],net_amt_gl_ac:purinv["net_amt_gl_ac"],
                  qc_deduction_gl_ac:purinv["qc_deduction_gl_ac"],amt_after_deduction_gl_ac:purinv["amt_after_deduction_gl_ac"],
                  add_tax_gl_ac:purinv["add_tax_gl_ac"],post_tax_amt_gl_ac:purinv["post_tax_amt_gl_ac"],other_charges_gl_ac:purinv["other_charges_gl_ac"],
                  payable_amt_gl_ac:purinv["payable_amt_gl_ac"],add1_gl_ac:purinv["add1_gl_ac"],add2_gl_ac:purinv["add2_gl_ac"],roundoff_gl_ac:purinv["roundoff_gl_ac"],
                  payable_party_gl_ac:purinv["already_paid_gl_ac"],already_paid_gl_ac:purinv["already_paid_gl_ac"],net_payable_party_gl_ac:purinv["net_payable_party_gl_ac"],id:purinv["id"],send_business_unit:purinv["send_business_unit"]})
               
                this.stk_transfer_pur_inv_tax_info.patchValue(tax);
                this.stk_transfer_pur_inv_bu_dtls.patchValue(budata);

                  let k=0;
                  this.addItem();
                  this.item_sl_no = 0;
                  while (this.stk_transfer_pur_inv_item_dtls.length) 
                  { this.stk_transfer_pur_inv_item_dtls.removeAt(0);}
                  for(let data1 of itemData)
                  { 
                    this.status = false;
                    forkJoin(
                      this.DropDownListService.getItemMasterPackMat(data1["adv_item_code"]),
                      this.DropDownListService.getItemPackUom(data1["adv_item_code"], data1["adv_packing_item"],this.company_name)
                    ).subscribe(([packingList, capacityEmptyWt])=>
                      {
                        this.status = true;
                        this.addItem();
                        //this.onChangeWarehouse(data1.warehouse, k);
                        this.packingItem[k] = packingList; 
                        this.capacity[k] = capacityEmptyWt["capacity"];
                        this.empty_bag_wt[k] =  capacityEmptyWt["empty_big_wt"];
                        this.stk_transfer_pur_inv_item_dtls.at(k).patchValue(data1);
                        k = k + 1;
                      });
                  }


                  this.addMusterRoll();
                  while (this.stk_transfer_pur_inv_musterroll_dtls.length) 
                  { this.stk_transfer_pur_inv_musterroll_dtls.removeAt(0);}
                  for(let data1 of MusterrollData)
                  { 
                    this.addMusterRoll() ;
                    this.stk_transfer_pur_inv_musterroll_dtls.patchValue(MusterrollData);
                  }

                  this.addDocument();
                  while (this.stk_transfer_pur_inv_docs.length) 
                  { this.stk_transfer_pur_inv_docs.removeAt(0);}
                  for(let data1 of docdata)
                  { 
                    this.addDocument() ;
                    this.stk_transfer_pur_inv_docs.patchValue(docdata);
                  } 


          this.status=true;

        });
      } 

      onDelete(id:any)
      {
        this.status = false;
        if(confirm("Are you sure to delete this Stock Transfer Purchase Invoice ?"))
        { 
          //normal delete process is done but checking usage in different table is pending
          this.userForm.patchValue({username: localStorage.getItem("username")});
          
              this.Service.deleteStocktransferPurInv(this.userForm.getRawValue(),id).subscribe(data=> 
                {        
                  alert("This Stock Transfer Purchase Invoice Deleted successfully.");
                  this.userForm.reset();
                  this.status = true;
                  this.isHidden = false;
                  this.ngOnInit();
                  this.showList("list");
                 
                });
              }
           
        } 
       
      
}
