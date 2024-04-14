import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { formatDate} from '@angular/common';
import { PurchaseBill} from '../../../../../../models/transaction/PurchaseTransaction/purchase-bill';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { PurchaseModuleServiceService } from '../../../../../../service/purchase-module-service.service';
import { TaxPopUpModalComponent } from '../tax-pop-up-modal/tax-pop-up-modal.component';
import { forkJoin } from 'rxjs';
import { GrnPopUpComponent } from '../../components/grn-pop-up/grn-pop-up.component';
import { MatDialog } from '@angular/material';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-purchase-bill-approval',
  templateUrl: './purchase-bill-approval.component.html',
  styleUrls: ['./purchase-bill-approval.component.scss']
})
export class PurchaseBillApprovalComponent implements OnInit 
{
  status:any;
  model: PurchaseBill = new PurchaseBill();
  isHidden:any;
  listPurchaseBill: PurchaseBill[];
  item_codes:{};
  supplier_id="0";
  supplierNames:any = [];
  vehicleList:any = []; 
  PurBillId :any; 
  submitted = false;
  seq_no:string;
  currentDate:any;
  payModes:any = [];
  itemId: any;
  capacity:any = [];
  show_Row = false;
  isActive=false;
  company_name:any;
  warehouses:{};
  ledgerNames:any=[];
  empty_bag_wt:any = [];
  empty_bag_wt_priceBasedOn:any = [];
  item_sl_no = 1; 
  employeeNames:any = [];
  brokerNameList:any = [];
  puSubTypeList:any=[];
  itemtypes:any = [];
  item_types:{};
  broker_sl_no = 1;
  public userForm:FormGroup;
  srvItemType:any;
  srvItemSubType:any;
  totalItem:number;
  totalDiscount:number;
  totalNetAmt:number;
  totalTaxAmt:number;
  totalQcDeduction:number;
  totalNetAmtAfterDeduction:number;
  totalGrossAmt:number;
  defaultValue:any;
  add:number;
  sub:number;
  otherCharges:number;
  alreadyPaid:number;
  action:any;
  pusubtype: any;
  Pur_Bill_Id:any;
  main_Id:any;
  editable: boolean = false;

  constructor( private fb: FormBuilder, private Service : Master,
    private DropDownListService: DropdownServiceService,
   
    private dialogRef: MatDialogRef<PurchaseBillApprovalComponent>, @Inject(MAT_DIALOG_DATA)data)
  {
    this.userForm=fb.group(
    {
      id:[''],
      referance_id: [''],
      pur_bill_id:[''],
      pur_bill_no:[''],
      bill_date :  [''],
      supplier_name :  [''],
      item_type : [''],
      ser_item_subtype :  [''],
      purchase_type:[''],
      purchase_subtype : [''],
      created_by : [''],
      truck_no:[''],
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
      payment_date:[''],
      business_unit:[''],
  
      pur_Bill_Item_Details: this.fb.array([this.fb.group(
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
        gl_acc:'',
        warehouse:'',	
        stack:''
      })]),
  
      pur_Bill_Broker_Details: this.fb.array([this.fb.group(
      {    
        sl_no : this.broker_sl_no,  
        broker_name: '',	
        brokerage_amt: '',	
        broker_other_info : '',	
        up_brokerage_amt : '',	
        total_brokerage :'' 
      })]),
        
      pur_Bill_Docs: this.fb.array([this.fb.group({
        doc_name: '' })]),

      pur_Bill_Musterroll_Details: this.fb.array([this.fb.group({
        muster_roll_name: '' })]),
        
      pur_Bill_Tax_Info:this.fb.group(
      {
        pan: '',
        gst :'',
        cin:'',
        tan: '' 
      }),

      pur_Bill_Bp_Details:this.fb.group(
      {
        supp_name: '',
        supp_phone: '',
        supp_fax: '',
        supp_email: '',
        supp_address: '',
        cp_name: '',
        cp_phone: '',
        cp_fax: '',
        cp_email: '',
        cp_address: '',
        cp_designation:''
      }),

      pur_Bill_Account_Info:this.fb.group(
      {
        mode_of_pay: '',
        payment_date:'',
        pay_term: '',
        credit_lim: '',
        bankname: '',
        accountholder: '',
        acc_no: '',
        ifsc: '',
        mobile: '',
        iban: '',
        bic_swift_code: '',
        branch:''
      })
    });

    this.Pur_Bill_Id = data.Pur_Bill_Id;
    this.main_Id = data.id;

    this.onUpdate(this.main_Id,this.Pur_Bill_Id);
  }

  get id(){ return this.userForm.get("id") as FormControl }
  get pur_bill_id(){ return this.userForm.get("pur_bill_id") as FormControl }
  get pur_bill_no(){ return this.userForm.get("pur_bill_no") as FormControl }
  get bill_date(){ return this.userForm.get("bill_date") as FormControl }
  get supplier_name(){ return this.userForm.get("supplier_name") as FormControl }
  get item_type(){ return this.userForm.get("item_type") as FormControl }
  get purchase_type(){ return this.userForm.get("purchase_type") as FormControl }
  get purchase_subtype(){ return this.userForm.get("purchase_subtype") as FormControl }    
  get business_unit(){ return this.userForm.get("business_unit") as FormControl }
  get payment_date(){ return this.userForm.get("payment_date") as FormControl }
  get created_by(){ return this.userForm.get("created_by") as FormControl }
  get truck_no(){ return this.userForm.get("truck_no") as FormControl }
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
  get pur_Bill_Item_Details() { return this.userForm.get('pur_Bill_Item_Details') as FormArray;}
  get pur_Bill_Account_Info() { return this.userForm.get('pur_Bill_Account_Info') as FormGroup;}
  get pur_Bill_Bp_Details() { return this.userForm.get('pur_Bill_Bp_Details') as FormGroup;}
  get pur_Bill_Tax_Info() { return this.userForm.get('pur_Bill_Tax_Info') as FormGroup;}
  get pur_Bill_Musterroll_Details() { return this.userForm.get('pur_Bill_Musterroll_Details') as FormArray;}
  get pur_Bill_Docs() { return this.userForm.get('pur_Bill_Docs') as FormArray;}
  get pur_Bill_Broker_Details() { return this.userForm.get('pur_Bill_Broker_Details') as FormArray;}

  ngOnInit() 
  {
    this.status = false;
    this.srvItemType = true;
    this.srvItemSubType = '0';
    this.totalItem = 0;
    this.totalDiscount = 0;
    this.totalNetAmt = 0;
    this.totalQcDeduction = 0;
    this.totalNetAmtAfterDeduction = 0;
    this.totalTaxAmt = 0;
    this.totalGrossAmt = 0;
    this.add = 0;
    this.sub = 0;
    this.defaultValue = 0;
    this.otherCharges = 0;
    this.alreadyPaid = 0;
    this.action = 'update';
    this.isHidden = false;
    this.empty_bag_wt_priceBasedOn = [];
    this.empty_bag_wt = [];
    this.capacity = [];
    this.packingItem = [];
    //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
    this.item_types=["Service","Material"];
    this.company_name = localStorage.getItem("company_name");
    this.payModes=["Cash","RTGS","DD","Cheque","NEFT", "Card"];
    this.puSubTypeList=[{display: "PDS Purchase"},{display: "E-Open Purchase"},{display: "Hat Purchase"},{display: "Camp Purchase"}];
    this.userForm.patchValue({referance_id: '0', id: 0});
    forkJoin(
      this.Service.getPurchaseBill(),
      this.DropDownListService.getCompanyBUMNCList(this.company_name),
      this.DropDownListService.getVehicleNameCode(),
      this.DropDownListService.employeeNamesList(this.company_name),
      this.DropDownListService.itemTypeList(this.company_name),
      this.DropDownListService.ledgerNameList(),
      this.DropDownListService.supplierNamesList(this.company_name),
      this.DropDownListService.itemNamesList()
    ).subscribe(([pBillData, companyBUMNCList,vehicleData, employeeData, itemTypedata,
        ledgerdata, supplierData, itemNameData])=>
      {
        this.listPurchaseBill  = pBillData;
        this.bussiness_unit_list  = companyBUMNCList;
        console.log("vehicleData: "+JSON.stringify(vehicleData));
        this.vehicleList  = vehicleData;
        this.employeeNames  = employeeData;
        this.itemtypes  = itemTypedata;
        this.ledgerNames  = ledgerdata;
        this.supplierNames  = supplierData;
        this.item_codes = itemNameData;
        this.userForm.patchValue({item_total_gl_ac: "0", discount_gl_ac:"0",
          qc_deduction_gl_ac:"0", amt_after_deduction_gl_ac:"0",
          add_tax_gl_ac:"0", post_tax_amt_gl_ac:"0",ser_item_subtype:"0",
          other_charges_gl_ac:"0", other_charges: 0, payable_amt_gl_ac:"0", created_by:"0",
          add1_gl_ac:"0", add1: 0, add2_gl_ac:"0", add2: 0, roundoff_gl_ac:"0",
          payable_party_gl_ac:"0", already_paid_gl_ac:"0", already_paid: 0,
          net_payable_party_gl_ac:"0", net_amt :"0", net_amt_gl_ac :"0"}); 
        this.status = true; 
      });  
  }

  getAddAmt(event)
  {
    this.amt = this.userForm.get("item_total").value as FormControl;
    this.discountAmt = this.userForm.get("discount").value as FormControl;
    this.netAmt = this.userForm.get("net_amt").value as FormControl;
    this.qcDeduction = this.userForm.get("qc_deduction").value as FormControl;
    this.amtAfterDeduction = this.userForm.get("amt_after_deduction").value as FormControl;
    this.taxAmt = this.userForm.get("add_tax").value as FormControl;
    this.grossAmt = this.userForm.get("post_tax_amt").value as FormControl;
    this.add = parseFloat(event.target.value);

    this.calculate((this.totalItem), this.totalDiscount, this.totalTaxAmt, this.totalNetAmt, 
      this.totalQcDeduction, this.totalNetAmtAfterDeduction, (this.add), (this.sub),
      (this.otherCharges), (this.alreadyPaid), this.totalGrossAmt)
  }

  getSubAmt(event)
  {
    this.amt = this.userForm.get("item_total").value as FormControl;
    this.discountAmt = this.userForm.get("discount").value as FormControl;
    this.netAmt = this.userForm.get("net_amt").value as FormControl;
    this.qcDeduction = this.userForm.get("qc_deduction").value as FormControl;
    this.amtAfterDeduction = this.userForm.get("amt_after_deduction").value as FormControl;
    this.taxAmt = this.userForm.get("add_tax").value as FormControl;
    this.grossAmt = this.userForm.get("post_tax_amt").value as FormControl;
    this.sub = parseFloat(event.target.value);
    
    this.calculate((this.totalItem), this.totalDiscount, this.totalTaxAmt, this.totalNetAmt, 
      this.totalQcDeduction, this.totalNetAmtAfterDeduction, (this.add), (this.sub),
      (this.otherCharges), (this.alreadyPaid), this.totalGrossAmt)
  }

  getOtherCharges(event)
  {
    this.amt = this.userForm.get("item_total").value as FormControl;
    this.discountAmt = this.userForm.get("discount").value as FormControl;
    this.netAmt = this.userForm.get("net_amt").value as FormControl;
    this.qcDeduction = this.userForm.get("qc_deduction").value as FormControl;
    this.amtAfterDeduction = this.userForm.get("amt_after_deduction").value as FormControl;
    this.taxAmt = this.userForm.get("add_tax").value as FormControl;
    this.grossAmt = this.userForm.get("post_tax_amt").value as FormControl;
    this.otherCharges = parseFloat(event.target.value);

    this.calculate((this.totalItem), this.totalDiscount, this.totalTaxAmt, this.totalNetAmt, 
      this.totalQcDeduction, this.totalNetAmtAfterDeduction, (this.add), (this.sub),
      (this.otherCharges), (this.alreadyPaid), this.totalGrossAmt)
  } 

  businessUnit:any;
  stackList:any=[];
  bussiness_unit_list:any = [];
  onChangeBussinessUnit(buss_id:string, operation)
  {
    this.warehouses = []
    this.stackList = [];
    this.businessUnit = buss_id;

    if(buss_id != '0')
    {      
      this.status = false;
      forkJoin(
        this.DropDownListService.getWHListbyBUnit(buss_id)
        
      ).subscribe(([wearHouseData])=>
        {
          this.warehouses = wearHouseData; 
      
          this.status=true;
        })       
    }
  }
  onChangeBussUnit(buss_id:string)
  {
    this.warehouses = []
    this.stackList = [];
      this.status = false;
      forkJoin(
        this.DropDownListService.getWHListbyBUnit( buss_id)
        
      ).subscribe(([wearHouseData])=>
        {
          this.warehouses = wearHouseData;      
          this.status=true;
        })       
  }

  getAlreadyPaidAmt(event)
  {
    this.amt = this.userForm.get("item_total").value as FormControl;
    this.discountAmt = this.userForm.get("discount").value as FormControl;
    this.netAmt = this.userForm.get("net_amt").value as FormControl;
    this.qcDeduction = this.userForm.get("qc_deduction").value as FormControl;
    this.amtAfterDeduction = this.userForm.get("amt_after_deduction").value as FormControl;
    this.taxAmt = this.userForm.get("add_tax").value as FormControl;
    this.grossAmt = this.userForm.get("post_tax_amt").value as FormControl;
    this.alreadyPaid = parseFloat(event.target.value)

    this.calculate((this.totalItem), this.totalDiscount, this.totalTaxAmt, this.totalNetAmt, 
      this.totalQcDeduction, this.totalNetAmtAfterDeduction, (this.add), (this.sub),
      (this.otherCharges), (this.alreadyPaid), this.totalGrossAmt)
  }

   calculate(amt, dscAmt, taxAmt, netAmt, qcDeduction, netAmtAfterDeduction, add, sub,
    otherCharges, alreadyPaid, grossAmt)
  {
    this.userForm.patchValue({item_total: (Math.round(amt * 100) / 100).toFixed(2), 
      discount: (Math.round(dscAmt  * 100) / 100).toFixed(2), 
      add_tax: (Math.round(taxAmt * 100) / 100).toFixed(2), 
      net_amt: (Math.round(netAmt  * 100) / 100).toFixed(2),
      qc_deduction: (Math.round(qcDeduction  * 100) / 100).toFixed(2), 
      amt_after_deduction: (Math.round(netAmtAfterDeduction  * 100) / 100).toFixed(2),
      post_tax_amt: (Math.round(grossAmt  * 100) / 100).toFixed(2),
      payable_amt:  (Math.round((grossAmt + otherCharges)  * 100) / 100).toFixed(2), 
      payable_party: (Math.round((grossAmt + otherCharges + add - sub))).toFixed(2),
      net_payable_party: (Math.round((grossAmt + otherCharges + add - sub - alreadyPaid))).toFixed(2)});
    this.calRoundOfFigure(grossAmt + otherCharges + add - sub);
  }

  calRoundOfFigure(payableToPartyamount)
  {
    let roundOfAmt = Math.round(payableToPartyamount * 100) % 100;
    if(roundOfAmt >= 50)
    {
      roundOfAmt = 100 - roundOfAmt;
      this.userForm.patchValue({roundoff_amt: roundOfAmt})
    }
    else
    {this.userForm.patchValue({roundoff_amt: 0 - roundOfAmt});};
  }
 
  onChangePBillDate(event)
  {
    this.currentDate = event.target.value;
    if(this.pusubtype != '' && this.srvItemSubType != '0')
    this.getBillNo(this.currentDate,this.srvItemType, this.srvItemSubType, this.pusubtype)
  }

  onChangeServicesItemSubType(event, operation)
  {
    this.srvItemSubType = event;

  
    if(this.srvItemSubType != '0' && this.pusubtype!='')
    {
      this.status = false;
      this.packingItem = [];
      this.capacity = [];
      this.empty_bag_wt = [];
      this.DropDownListService.getItemThruType(event).subscribe(data=>
      {
        this.item_codes = data;
        this.status = true;
      })
      if(operation != 'update')
      { this.getBillNo(this.currentDate,this.srvItemType, this.srvItemSubType,this.pusubtype)}
    }
  }

  onChangeServicesItemType(event)
  {
    this.srvItemType = event;
    if(this.srvItemSubType != '0' && this.pusubtype!='')
    this.getBillNo(this.currentDate, this.srvItemType,this.srvItemSubType,this.pusubtype)
  }



  onChangePOSubType(event)
  {
    this.pusubtype = event;

   // window.alert()
    
    if(this.pusubtype != '' && this.srvItemSubType != '0')
    
    { this.getBillNo(this.currentDate, this.srvItemType,this.srvItemSubType,this.pusubtype)}
   
  }

  getBillNo(date,itemType,srvItemSubType,pursub )
  {
    this.status = false;
    this.DropDownListService.getPBSequenceId(date+"/"+itemType+"/"+srvItemSubType+"/"+pursub).subscribe(data=>
    {
      this.seq_no = data["sequenceid"];
      this.status = true;
    })
  }

  addItem() 
  {
    this.item_sl_no= this.item_sl_no + 1;
    this.pur_Bill_Item_Details.push(this.fb.group({ 
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
    gl_acc:'',
    warehouse:'',	
    stack:''}));
  }
 
  deleteItem(index) 
  {
    if(this.item_sl_no > 1)
    { 
      this.packingItem.slice(index, 1);
      this.capacity.slice(index, 1);
      this.pur_Bill_Item_Details.removeAt(index);
      this.item_sl_no = this.item_sl_no - 1;
    }
    else
    {
      this.item_sl_no = 1;
      alert("can't delete all rows");
      this.pur_Bill_Item_Details.reset();
      this.pur_Bill_Item_Details.at(0).patchValue({slno:  this.item_sl_no});
    } 
    
    for(let i=1; i<=this.item_sl_no; i++)
    this.pur_Bill_Item_Details.at(i-1).patchValue({slno: i});   
  }

  addBroker() 
  {
    this.broker_sl_no= this.broker_sl_no + 1;
    this.pur_Bill_Broker_Details.push(this.fb.group({ 
    sl_no : this.broker_sl_no,  
    broker_name: '',	
    brokerage_amt: '',	
    broker_other_info : '',	
    up_brokerage_amt : '',	
    total_brokerage :''}));
  }
 
  deleteBroker(index) 
  {
    if(this.broker_sl_no > 1)
    { 
      this.pur_Bill_Broker_Details.removeAt(index);
      this.broker_sl_no = this.broker_sl_no - 1;
    }
    else
    {
      this.broker_sl_no = 1;
      alert("can't delete all rows");
      this.pur_Bill_Broker_Details.reset();
      this.pur_Bill_Broker_Details.at(0).patchValue({sl_no:  this.broker_sl_no});
    } 
    
    for(let i=1; i<=this.broker_sl_no; i++)
    this.pur_Bill_Broker_Details.at(i-1).patchValue({sl_no: i});
    
  }

  addMusterRoll() 
  {
    this.pur_Bill_Musterroll_Details.push(this.fb.group({
    muster_roll_name : '' }));
  }
 
  deleteMusterRoll(index) 
  {
    if(index)
    {this.pur_Bill_Musterroll_Details.removeAt(index);}
    else
    {
      alert("can't delete all rows");
      this.pur_Bill_Musterroll_Details.reset();
    }
  }

  addDocument() 
  {
    this.pur_Bill_Docs.push(this.fb.group({
    doc_name : '' }));
  }

  deleteDocument(index) 
  {
    if(index)
    {this.pur_Bill_Docs.removeAt(index);}
    else
    {
      alert("can't delete all rows");
      this.pur_Bill_Docs.reset();
    }
  }
   
 

  packingItem:any=[];
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
        this.pur_Bill_Item_Details.at(index).patchValue({adv_item_name: itemNameData["item_name"]});
        this.packingItem[index] = packingItemData;
        this.DropDownListService.getUomName(itemNameData["mstock_unit"]).subscribe(data=>
        { 
          this.pur_Bill_Item_Details.at(index).patchValue({passed_item_uom: data.description}); 
          this.status = true;
        });
      });
    }
  }

  getItemQty(event, index)
  {
    let itemQty = this.capacity[index] * event;
    let matwt = itemQty - this.empty_bag_wt[index];
    this.pur_Bill_Item_Details.at(index).patchValue({passed_item_qty: itemQty,
      passed_mat_weight: (Math.round(matwt * 1000) / 1000).toFixed(3)});
  }

  onchangePackingItem(index, event)
  {
    if(event.target.value != '0')
    {
      this.itemId =  this.pur_Bill_Item_Details.at(index).get("adv_item_code").value as FormControl; 
      this.status = false;
      this.DropDownListService.getItemPackUom(this.itemId, event.target.value,this.company_name).subscribe(data=>
      {  
        this.capacity[index] = data.capacity; 
        this.empty_bag_wt[index] =  data.empty_big_wt;
        this.pur_Bill_Item_Details.at(index).patchValue({passed_packing_uom: data.uom1}); 
        this.status = true;
      }); 
    }
  }

  onChangeSupplierName(suppid:string)
  {
    this.userForm.patchValue({pan_no: null, gst_no: null, cin_no: null,tan_no: null});
    this.pur_Bill_Broker_Details.reset();
    this.brokerNameList = [];
    this.onChangePaymentMode("0");
    this.pur_Bill_Account_Info.patchValue({mode_of_pay: "0", accountholder: null, 
      acc_no: null,bankname: null, ifsc: null, mobile: null, iban: null, bic_swift_code: null, branch: null});
    this.pur_Bill_Account_Info.patchValue({bic_swift_code: null,iban: null, payment_mode: "0", payment_terms: "0",
      bank_name: null, account_name: null, account_no: null, ifsc_code: null, mobile: null,branch: null, cash_limit: 0});
   
    if(suppid.length && suppid != '0')
    { 
      this.status = false;
      this.supplier_id = suppid;
      forkJoin(
        this.DropDownListService.getSuppBPAcc(suppid),
        this.DropDownListService.getSupplierStatDtls(suppid),
        this.DropDownListService.getBrokerListBySupplierCode(suppid),
        this.DropDownListService.getAddrById(suppid),
        this.DropDownListService.getSuppAddrById(suppid),
        this.DropDownListService.getDeliveryAddrById(suppid),
        this.DropDownListService.getSuppContactNameList(suppid),
        this.DropDownListService.getTransporterThruSupplier(suppid)
      ).subscribe(([data, data1, data2, data3, data4, data5, data6, data7])=>
        {
          this.onChangePaymentMode(data["mode_of_pay"]);
          this.pur_Bill_Account_Info.patchValue({mode_of_pay: data["mode_of_pay"], pay_term: data["pay_term"],
            accountholder: data["accountholder"], acc_no: data["acc_no"], bankname: data["bankname"], 
            ifsc: data["ifsc"], mobile: data["mobile"], iban: data["iban"], bic_swift_code: data["bic_swift_code"], 
            branch: data["branch"]}); 
   
          this.pur_Bill_Tax_Info.patchValue({pan: data1["pan_no"], gst: data1["gst_no"], cin: data1["cin_no"],tan: data1["tan_no"] });
          this.brokerNameList = data2;
          this.status = true;
        });    
    }
  }

  is_cash_limit_active = false;
  onChangePaymentMode(payment_mode: string)
  {
    if(payment_mode == "Cash")
    {this.is_cash_limit_active = true;}
    else
    {
      this.is_cash_limit_active = false;
      this.pur_Bill_Account_Info.patchValue({cash_limit: 0});
    }
  }

  Payment_date:any
  onChangePaymentdate(event)
  {
    this.userForm.get("id").value as FormControl 
    this.Payment_date = this.pur_Bill_Account_Info.get("payment_date").value as FormControl;
    this.userForm.patchValue({payment_date:this.Payment_date})
  }

  onChangeWarehouse(event, index)
  {
    this.status = false;
    this.DropDownListService.getBinDescByWarehouse(event).subscribe(data1=>
    {      
      console.log("stackListData: "+JSON.stringify(data1))  
      this.status=true; 
      this.stackList[index] = data1;
    });     
  }

  onChangeWarehouse1(warehouse, index)
  {
    this.status = false;
    this.DropDownListService.getBinDescByWarehouse(warehouse).subscribe(data1=>
    {      
      console.log("stackListData: "+JSON.stringify(data1))  
      this.status=true; 
      this.stackList[index] = data1;
    });     
  }

  amt:any;
  discountAmt:any;
  netAmt:any;
  qcDeduction:any;
  amtAfterDeduction:any;
  taxAmt:any;
  grossAmt:any;
  BusinessUnit:any;


  

  send()
  { 
    this.PurBillId= this.userForm.get("id").value as FormControl           
    this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
      fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
    this.submitted = true;
    if(!this.userForm.valid)
    {
      alert('Please fill all fields!')
      return false;
    } 
    else
    {
      if(this.PurBillId > 0)
      {
        this.status = false;      
        this.Service.updatePurBill(this.userForm.getRawValue(), this.PurBillId).subscribe(data => 
        {
          console.log(this.userForm.value);
          alert("Purchase Bill Updated successfully.");
          this.userForm.reset();
          this.ngOnInit();  
        });  
      } 
      else
      {
        this.status = false;      
        this.Service.createPurchaseBill(this.userForm.getRawValue()).subscribe(data => 
        {
          console.log(this.userForm.value);
          alert("New Purchase Bill created successfully.");
          this.userForm.reset();
          this.ngOnInit();          
        });  
      }
    }  
  }

  onUpdate(id:any, pbid:string)
  {
  
    this.status = false;
    this.isHidden = true;
    this.packingItem = [];
   
    forkJoin(
      this.Service.purBillRetriveList(this.main_Id),
      this.Service.purBillItemRetriveList(this.Pur_Bill_Id),      
      this.Service.purBillMusterRollRetriveList(this.Pur_Bill_Id),
      this.Service.purBillTaxInfoRetriveList(this.Pur_Bill_Id),
      this.Service.purBillBrokerRetriveList(this.Pur_Bill_Id),
      this.Service.purBillBpDtlsRetriveList(this.Pur_Bill_Id),
      this.Service.purBillAccountInfoRetriveList(this.Pur_Bill_Id),
      this.Service.purBillDocsRetriveList(this.Pur_Bill_Id),
    ).subscribe(([purBillData, itemData, MusterrollData, 
        TaxInfo, brokerData, Bpdetails, AccountData, DocsData])=>
      {
        this.onChangeServicesItemSubType(purBillData["ser_item_subtype"], 'update');
        console.log("BillDetails:"+JSON.stringify(purBillData))
        this.srvItemSubType = purBillData["ser_item_subtype"];
        this.srvItemType = purBillData["ser_item_type"];
        this.currentDate = purBillData["bill_date"];
        this.totalItem = purBillData["item_total"];
        this.totalDiscount = purBillData["discount"];
        this.totalNetAmt = purBillData["net_amt"];
        this.totalQcDeduction = purBillData["qc_deduction"];
        this.totalNetAmtAfterDeduction = purBillData["amt_after_deduction"];
        this.totalTaxAmt = purBillData["add_tax"];
        this.totalGrossAmt = purBillData["post_tax_amt"];
        this.add = purBillData["add1"];
        this.sub = purBillData["add2"];
        this.otherCharges = purBillData["other_charges"];
        this.alreadyPaid = purBillData["already_paid"];
        this.onChangeSupplierName(purBillData["supplier_name"]);
        this.onChangeBussinessUnit(purBillData["business_unit"],'update');

        this.userForm.patchValue({id: purBillData["id"],pbid: purBillData["pbid"], pur_bill_no: purBillData["pur_bill_no"],
          bill_date: purBillData["bill_date"],supplier_name: purBillData["supplier_name"], ser_item_type: purBillData["ser_item_type"],
          ser_item_subtype: purBillData["ser_item_subtype"], created_by: purBillData["created_by"], truck_no: purBillData["truck_no"],         
          remarks: purBillData["remarks"],company_id: purBillData["company_id"], fin_year: purBillData["fin_year"], 
          item_total: purBillData["item_total"],item_total_gl_ac: purBillData["item_total_gl_ac"], discount: purBillData["discount"],discount_gl_ac: purBillData["discount_gl_ac"],
          qc_deduction: purBillData["qc_deduction"],net_amt: purBillData["net_amt"],net_amt_gl_ac: purBillData["net_amt_gl_ac"], 
          qc_deduction_gl_ac: purBillData["qc_deduction_gl_ac"], amt_after_deduction: purBillData["amt_after_deduction"], amt_after_deduction_gl_ac: purBillData["amt_after_deduction_gl_ac"], 
          add_tax: purBillData["add_tax"], add_tax_gl_ac: purBillData["add_tax_gl_ac"], post_tax_amt: purBillData["post_tax_amt"], 
          roundoff_amt: purBillData["roundoff_amt"], roundoff_gl_ac: purBillData["roundoff_gl_ac"], payable_party: purBillData["payable_party"], 
          payable_party_gl_ac: purBillData["payable_party_gl_ac"], already_paid: purBillData["already_paid"], already_paid_gl_ac: purBillData["already_paid_gl_ac"], 
          post_tax_amt_gl_ac: purBillData["post_tax_amt_gl_ac"], other_charges: purBillData["other_charges"], other_charges_gl_ac: purBillData["other_charges_gl_ac"],
          net_payable_party: purBillData["net_payable_party"], net_payable_party_gl_ac: purBillData["net_payable_party_gl_ac"], 
          payable_amt: purBillData["payable_amt"], payable_amt_gl_ac: purBillData["payable_amt_gl_ac"], add1: purBillData["add1"], 
          add1_gl_ac: purBillData["add1_gl_ac"],add2: purBillData["add2"],add2_gl_ac: purBillData["add2_gl_ac"]});
          
        console.log("itemData: "+  JSON.stringify(itemData));
        let k = 0;  
        this.addItem()
        this.item_sl_no = 0;
        while (this.pur_Bill_Item_Details.length) 
        this.pur_Bill_Item_Details.removeAt(0);
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
              this.onChangeWarehouse(data1.warehouse, k);
              this.packingItem[k] = packingList; 
              this.capacity[k] = capacityEmptyWt["capacity"];
              this.empty_bag_wt[k] =  capacityEmptyWt["empty_big_wt"];
              this.pur_Bill_Item_Details.at(k).patchValue(data1);
              k = k + 1;
            });
        }

        this.addMusterRoll()
        while (this.pur_Bill_Musterroll_Details.length)
        this.pur_Bill_Musterroll_Details.removeAt(0);
        for(let data1 of MusterrollData)
        this.addMusterRoll();
        this.pur_Bill_Musterroll_Details.patchValue(MusterrollData);
        console.log("Musterdata: "+JSON.stringify(MusterrollData));

        console.log("Tax details: "+  JSON.stringify(TaxInfo));
        this.pur_Bill_Tax_Info.patchValue(TaxInfo);

        this.addBroker();
        this.broker_sl_no = 0;
        while (this.pur_Bill_Broker_Details.length)
        this.pur_Bill_Broker_Details.removeAt(0);
        for(let data1 of brokerData)
        this.addBroker();
        this.pur_Bill_Broker_Details.patchValue(brokerData);
        console.log("brokerData: "+JSON.stringify(brokerData));

        console.log("BP data: "+  JSON.stringify(Bpdetails));
        this.pur_Bill_Bp_Details.patchValue(Bpdetails);

        console.log("Account: "+  JSON.stringify(AccountData));
        this.pur_Bill_Account_Info.patchValue(AccountData);

        this.addDocument()
        while (this.pur_Bill_Docs.length)
        this.pur_Bill_Docs.removeAt(0);
        for(let data1 of DocsData)
        this.addDocument();
        this.pur_Bill_Docs.patchValue(DocsData);
        console.log("docData: "+JSON.stringify(DocsData));

        this.status = true;
      });                              
  } 


}
