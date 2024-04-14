
import { Component, OnInit } from '@angular/core';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { MatDialog } from '@angular/material';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { MatDialogConfig} from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { DebitNote } from '../../../../../../Models/transaction/PurchaseTransaction/debit-note';
import { PurReturnApprovalNotePopUpComponent } from '../pur-return-approval-note-pop-up/pur-return-approval-note-pop-up.component';
import { PurReturnNotePopUpComponent } from '../pur-return-note-pop-up/pur-return-note-pop-up.component';

  @Component({
    selector: 'app-debit-note',
    templateUrl: './debit-note.component.html',
    styleUrls: ['./debit-note.component.scss']})

  export class DebitNoteComponent implements OnInit 
  {
    public userForm:FormGroup;
    ledgerNames:any=[];
    model: DebitNote = new DebitNote();
    listDebitNote: DebitNote[];
    DebitNoteId:any;
    item_sl_no = 1; 
    broker_sl_no = 1;
    submitted = false;
    status = false; 
    isHidden:any;
    item_types: {};
    bussinessUnitList:any = [];
    itemtypes:any = [];
    vehicleList:any = [];
    employeeNames:any = [];
    packingItem:any = [];
    supplierList:any = [];
    capacity:any = [];
    empty_bag_wt:any = [];
    brokerNameList:any = [];
    transporterNames:any = [];
    contAddrs:any = [];
    delvAddrs:any = [];
    item_codes:any = [];
    currentDate:any;
    company_name:any;
    financialYear:any;
    _businessunit:any;
    _supplier="";
    debitNoteSeqNo:any;
    _serItemSubType:any;
    DebitNotetype : any;
    _serItemType:any;
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
    debitnotesave:boolean = true;
    debitnoteupdate:boolean = true;
    
    constructor(public fb:FormBuilder,private Service:Master,public dialog: MatDialog,
      private DropDownListService :DropdownServiceService) 
    { 
      this.userForm=fb.group(
      {
        id:[''],
        referance_id: [''],
        debitnoteid:[''],
        debitnoteno:[''],
        debitnotedate :  [''],
        debitnotetype :[''],
        supplier_id  :  [''],
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
        businessunit: [''],
    
        pur_debit_note_item_details: this.fb.array([this.fb.group(
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
          gl_acc:''})]),
      
        pur_debit_note_broker_details: this.fb.array([this.fb.group(
        {    
          sl_no : this.broker_sl_no,  
          broker_name: '',	
          brokerage_amt: '',	
          broker_other_info : '',	
          up_brokerage_amt : '',	
          total_brokerage :'' })]),
            
        pur_debit_note_docs: this.fb.array([this.fb.group({
          doc_name: '' })]),
  
        pur_debit_note_musterroll_details: this.fb.array([this.fb.group({
          muster_roll_name: '' })]),
            
        pur_debit_note_tax_info:this.fb.group(
        {
          pan: '',
          gst :'',
          cin:'',
          tan: '' 
        }),
    
        pur_debit_note_bp_details:this.fb.group(
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
  
        pur_debit_note_account_info:this.fb.group(
        {
          mode_of_pay: '',
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
    }
  
    get id(){ return this.userForm.get("id") as FormControl }
    get businessunit(){ return this.userForm.get("businessunit") as FormControl}
    get debitnoteid(){ return this.userForm.get("debitnoteid") as FormControl }
    get debitnoteno(){ return this.userForm.get("debitnoteno") as FormControl }
    get debitnotedate(){ return this.userForm.get("debitnotedate") as FormControl }
    get debitnotetype(){ return this.userForm.get("debitnotetype") as FormControl }
    get supplier_id (){ return this.userForm.get("supplier_id ") as FormControl }
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
    get pur_debit_note_item_details() { return this.userForm.get('pur_debit_note_item_details') as FormArray;}
    get pur_debit_note_account_info() { return this.userForm.get('pur_debit_note_account_info') as FormGroup;}
    get pur_debit_note_bp_details() { return this.userForm.get('pur_debit_note_bp_details') as FormGroup;}
    get pur_debit_note_tax_info() { return this.userForm.get('pur_debit_note_tax_info') as FormGroup;}
    get pur_debit_note_musterroll_details() { return this.userForm.get('pur_debit_note_musterroll_details') as FormArray;}
    get pur_debit_note_docs() { return this.userForm.get('pur_debit_note_docs') as FormArray;}
    get pur_debit_note_broker_details() { return this.userForm.get('pur_debit_note_broker_details') as FormArray;}
  
    ngOnInit() 
    {
      //For User Role
    let user_role=localStorage.getItem("user_role")+"tuhinabcd"+"purchase_inventory";
    this.DropDownListService.getRoleItemMaster(user_role).subscribe(data=>{
    let accessdata=JSON.stringify(data);
    this.debitnotesave=false;
    this.debitnoteupdate=false;

    if(accessdata.includes('debit_note.save'))
    {
     this.debitnotesave = true;
    }
   if(accessdata.includes('debit_note.update'))
    { 
      this.debitnoteupdate=true;
    }

    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
    
      this.status = false;
      this.isHidden = false;
      this._businessunit = "0";
      this._supplier = "0";
      this._serItemSubType = "0";
      this._serItemType = "0";
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
      this.packingItem = [];
      this.capacity = [];
      this.empty_bag_wt = [];
      this.brokerNameList = [];
      this.transporterNames = [];
      this.contAddrs = [];
      this.delvAddrs = [];
      this.DropDownListService.getAllItems().subscribe(data=>
        {
          this.item_codes = data;
          this.status = true;
        })
      this.userForm.patchValue({referance_id: "0", id: 0});
      this.item_codes = [];
      this.supplierList = [];
      //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      if((this.currentDate>=formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en'))  && (this.currentDate<=formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en')))
      {
      }
      else
      {
        alert("Selected  date is not in Selected Financial period!!!!!!")
        this.currentDate=formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
      }
      this.financialYear = localStorage.getItem("financial_year");
      this.company_name = localStorage.getItem("company_name");
      this.item_types=["Material","Service"];
      forkJoin(
        this.Service.getPurDebitNote(this.company_name, this.financialYear),
        this.DropDownListService.ledgerNameList(),
        this.DropDownListService.getVehicleNameCode(),
        this.DropDownListService.employeeNamesList(this.company_name),
       // this.DropDownListService.itemTypeList(this.company_name),
         this.DropDownListService.getCompanyBUMNCList(this.company_name),
      ).subscribe(([dabitNoteData, ledgerdata, vehicleData, 
          employeeData, BUMNCData])=>
        {
          this.bussinessUnitList  = BUMNCData;
          this.listDebitNote  = dabitNoteData;
          this.ledgerNames  = ledgerdata;
          this.vehicleList  = vehicleData;
          this.employeeNames = employeeData;
         // this.itemtypes  = itemTypedata;
          this.userForm.patchValue({supplier_id: "0", created_by: "0", businessunit: "0",
            truck_no: "0", item_total_gl_ac: "0", discount_gl_ac: "0", net_amt_gl_ac: "0",
            qc_deduction_gl_ac: "0", amt_after_deduction_gl_ac: "0", add_tax_gl_ac: "0", post_tax_amt_gl_ac: "0",
            other_charges_gl_ac: "0", payable_amt_gl_ac: "0", add1_gl_ac: "0", add2_gl_ac: "0",
            roundoff_gl_ac: "0", payable_party_gl_ac: "0", already_paid_gl_ac: "0", net_payable_party_gl_ac: "0"})
          this.pur_debit_note_item_details.at(0).patchValue({gl_acc: "0"})
          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});    
    }

    getAddAmt(event)
    {
      this.add = parseFloat(event.target.value);
      this.calculate(this.totalItem, this.totalDiscount, this.totalTaxAmt, this.totalNetAmt, 
        this.totalQcDeduction, this.totalNetAmtAfterDeduction, this.add, this.sub,
        this.otherCharges, this.alreadyPaid, this.totalGrossAmt)
    }

    getSubAmt(event)
    {
      this.sub = parseFloat(event.target.value);
      this.calculate(this.totalItem, this.totalDiscount, this.totalTaxAmt, this.totalNetAmt, 
        this.totalQcDeduction, this.totalNetAmtAfterDeduction, this.add, this.sub,
        this.otherCharges, this.alreadyPaid, this.totalGrossAmt)
    }

    getOtherCharges(event)
    {
      this.otherCharges = parseFloat(event.target.value);
       this.calculate(this.totalItem, this.totalDiscount, this.totalTaxAmt, this.totalNetAmt, 
        this.totalQcDeduction, this.totalNetAmtAfterDeduction, this.add, this.sub,
        this.otherCharges, this.alreadyPaid, this.totalGrossAmt)
    } 

    getAlreadyPaidAmt(event)
    {
      this.alreadyPaid = parseFloat(event.target.value)
      this.calculate(this.totalItem, this.totalDiscount, this.totalTaxAmt, this.totalNetAmt, 
        this.totalQcDeduction, this.totalNetAmtAfterDeduction, this.add, this.sub,
        this.otherCharges, this.alreadyPaid, this.totalGrossAmt)
    }

     calculate(amt, dscAmt, taxAmt, netAmt, qcDeduction, netAmtAfterDeduction, add, sub,
      otherCharges, alreadyPaid, grossAmt)
    {
      console.log("amt:"+amt+" dscAmt:"+dscAmt+" taxAmt:"+taxAmt+" netAmt:"+netAmt+" qcDeduction:"+qcDeduction+
        " netAmtAfterDeduction:"+netAmtAfterDeduction+" add:"+add+" sub:"+sub+" otherCharges:"+otherCharges+
        " alreadyPaid:"+alreadyPaid+" grossAmt:"+grossAmt)
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
        this.userForm.patchValue({roundoff_amt: (roundOfAmt)/100})
      }
      else
      {this.userForm.patchValue({roundoff_amt: (0 - roundOfAmt)/100});};
    }

    onChangeBusinessUnit(event)
    {
      this._businessunit = event;
      this.brokerNameList = [];
      if(event.length && event != "0")
      {
        this.status = false;
        this.DropDownListService.getSupplierThruBU(event).subscribe(data=>
        {
          this.supplierList = data;
          this.status = true;
        });
      }
    }

    onChangeSupplierName(suppid)
    {
      this._supplier = suppid;
      this.contAddrs = [];
      this.delvAddrs = [];
      this.transporterNames = [];
      this.pur_debit_note_tax_info.patchValue({pan: '', gst: '', cin: '', tan: '' });
      this.pur_debit_note_bp_details.patchValue({supp_phone: '', supp_fax: '', supp_email: '', supp_address: ''});
      this.pur_debit_note_bp_details.patchValue({cp_designation: '', cp_phone: '', cp_fax: '', cp_email: '', cp_address: ''}); 

      this.addBroker();
      this.broker_sl_no = 0;
      while(this.pur_debit_note_broker_details.length)
      this.pur_debit_note_broker_details.removeAt(0);
      this.addBroker();

      if(suppid.length && suppid != '0')
      {
        this.status = false;

        this.DropDownListService.getSuppliertransport(suppid).subscribe(data12=>
          {
                if(data12[0].transport_own == 'YES')
                {
                    forkJoin(
                      this.DropDownListService.supplierBrokerList(suppid),
                      this.DropDownListService.getTransporterThruSupplier(suppid),
                      this.DropDownListService.getSupplierStatDtls(suppid),
                      this.DropDownListService.getSuppAddrById(suppid),
                      this.DropDownListService.getDeliveryAddrById(suppid),
                      this.DropDownListService.getAddrById(suppid),
                    ).subscribe(([brokerList, transData, taxInfoData, bpSuppInfo, bpContactInfo, bpSuppAdd])=>
                      {
                        this.brokerNameList = brokerList;
                        this.transporterNames = transData;
                        this.status = true;
                        this.pur_debit_note_tax_info.patchValue({pan: taxInfoData["pan_no"], gst: taxInfoData["gst_no"], 
                          cin: taxInfoData["cin_no"], tan: taxInfoData["tan_no"] });
                        this.contAddrs  = bpSuppInfo;
                        this.delvAddrs  = bpContactInfo;
                        this.pur_debit_note_bp_details.patchValue({supp_address: bpSuppAdd["address"]});
                      })
                     
                }
                if(data12[0].transport_own == 'NO')
                {
                      forkJoin(
                        this.DropDownListService.supplierBrokerList(suppid),
                       // this.DropDownListService.getTransporterThruSupplier(suppid),
                        this.DropDownListService.getSupplierStatDtls(suppid),
                        this.DropDownListService.getSuppAddrById(suppid),
                        this.DropDownListService.getDeliveryAddrById(suppid),
                        this.DropDownListService.getAddrById(suppid),
                     // ).subscribe(([brokerList, transData, taxInfoData, bpSuppInfo, bpContactInfo, bpSuppAdd])=>
                     ).subscribe(([brokerList, taxInfoData, bpSuppInfo, bpContactInfo, bpSuppAdd])=>
                        {
                          this.brokerNameList = brokerList;
                        //  this.transporterNames = transData;
                          this.status = true;
                          this.pur_debit_note_tax_info.patchValue({pan: taxInfoData["pan_no"], gst: taxInfoData["gst_no"], 
                            cin: taxInfoData["cin_no"], tan: taxInfoData["tan_no"] });
                          this.contAddrs  = bpSuppInfo;
                          this.delvAddrs  = bpContactInfo;
                          this.pur_debit_note_bp_details.patchValue({supp_address: bpSuppAdd["address"]});
                        })  
                  
                }
              
          })

        }   




    }

    onChangeSuppInfoName(name:String)
    {
      this.pur_debit_note_bp_details.patchValue({supp_phone: null, supp_fax: null, supp_email: null});
      if(name != "0")
      {
        this.status = false;
        this.DropDownListService.getSupplierContDetails(this._supplier, name).subscribe(data=>
        {
          this.pur_debit_note_bp_details.patchValue({supp_phone:data["phone"],
          supp_fax:data["fax"],supp_email:data["email"]});
          this.status = true;
        });
      }
    }

    onChangeContInfoName(event)
    {
      this.pur_debit_note_bp_details.patchValue({cp_designation: null, cp_phone: null, cp_fax: null, cp_email: null, cp_address: null}); 
      if(event != '0' && this._supplier != "0")
      {
        this.status = false;
        this.DropDownListService.getSupplierDelvFromAdd(this._supplier, event).subscribe(data=>
        {
          this.pur_debit_note_bp_details.patchValue({cp_designation:data["designation"],
           cp_phone:data["phone"],cp_fax:data["fax"],
           cp_email:data["email"],cp_address:data["address"]}); 
          this.status = true;
        });
      }
    }

    // onChangeServicesItemSubType(event)
    // {
    //   this._serItemSubType = event
    //   if(event != '0')
    //   {
    //     this.status = false;
    //     this.packingItem = [];
    //     this.capacity = [];
    //     this.empty_bag_wt = [];
    //     this.DropDownListService.getItemThruType(event).subscribe(data=>
    //     {
    //       this.item_codes = data;
    //       this.status = true;
    //     })
    //   }
    // }

    // onChangeServicesItemType(event)
    // {this._serItemType = event;}

    getSeqId(currentDate,DebitNotetype)
    {
      this.DebitNotetype= this.userForm.get("debitnotetype").value as FormControl           
      if(this.currentDate != '0' && this.DebitNotetype !='0' )
      {
        this.status = false;
        this.DropDownListService.getDNSequenceId(this.currentDate+"/"+this.DebitNotetype).subscribe(data=>
        {
          this.debitNoteSeqNo = data.sequenceid;
          this.status = true;
        }); 
      }
    }

    getDebitNoteDate(event)
    {
       //this.getSeqId(this.currentDate, this.DebitNotetype);
      this.currentDate = event.target.value;
      if((this.currentDate>=formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en'))  && (this.currentDate<=formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en')))
      {
        this.getSeqId(this.currentDate, this.DebitNotetype);
      }
     else
     {
       alert("Selected  date is not in Selected Financial period!!!!!!")
       this.currentDate=formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
     }
    }

    onChangePurchaseReturnType(event)
    {
      this.status = false;
      this.getSeqId(this.currentDate, this.DebitNotetype);
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
          this.pur_debit_note_item_details.at(index).patchValue({itemname: itemNameData["item_name"]});
          this.packingItem[index] = packingItemData;
          this.DropDownListService.getUomName(itemNameData["mstock_unit"]).subscribe(data=>
          { 
            this.pur_debit_note_item_details.at(index).patchValue({uom: data.description}); 
            this.status = true;
          });
        });
      }
    }

    onchangeItemName1(index, itemcode)
    {
      if(itemcode != '0')
      {
        this.status = false;
        forkJoin(
          this.DropDownListService.getItemNameById(itemcode,this.company_name),
          this.DropDownListService.getItemMasterPackMat(itemcode)
        ).subscribe(([itemNameData, packingItemData])=>
        {      
          this.pur_debit_note_item_details.at(index).patchValue({itemname: itemNameData["item_name"]});
          this.packingItem[index] = packingItemData;
          this.DropDownListService.getUomName(itemNameData["mstock_unit"]).subscribe(data=>
          { 
            this.pur_debit_note_item_details.at(index).patchValue({uom: data.description}); 
            this.status = true;
          });
        });
      }
    }

    itemId:any;
    onchangePackingItem(index, event)
    {
      if(event.target.value != '0')
      {
        this.itemId =  this.pur_debit_note_item_details.at(index).get("itemcode").value as FormControl; 
        this.status = false;
        this.DropDownListService.getItemPackUom(this.itemId, event.target.value,this.company_name).subscribe(data=>
        {  
          this.capacity[index] = data.capacity; 
          this.empty_bag_wt[index] =  data.empty_big_wt;
          this.pur_debit_note_item_details.at(index).patchValue({suom: data.uom1}); 
          this.status = true;
        }); 
      }
    }

    showList(s:string)
    {
      if(this.debitnotesave == true  && this.debitnoteupdate == true)//true exist  false not exist 
    {
      if(s=="add")
      {this.isHidden=true;}
    }
    if(this.debitnotesave == true  && this.debitnoteupdate == false)
    {
      if(s=="add")
      {this.isHidden=true;}
    }
      
      if(s=="list")
      {this.isHidden=false;}
    }

    addItem() 
    {
      this.item_sl_no = this.item_sl_no + 1;
      this.pur_debit_note_item_details.push(this.fb.group({ 
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
      gl_acc:''}));
      this.pur_debit_note_item_details.at(this.item_sl_no - 1).patchValue({gl_acc: "0"})

    }
   
    deleteItem(index) 
    {
      if(this.item_sl_no > 1)
      { 
        this.pur_debit_note_item_details.removeAt(index);
        this.item_sl_no = this.item_sl_no - 1;
      }
      else
      {
        this.item_sl_no = 1;
        alert("can't delete all rows");
        this.pur_debit_note_item_details.reset();
        this.pur_debit_note_item_details.at(0).patchValue({slno:  this.item_sl_no});
      } 
      
      for(let i=1; i<=this.item_sl_no; i++)
      this.pur_debit_note_item_details.at(i-1).patchValue({slno: i});   
    }

    addBroker() 
    {
      this.broker_sl_no= this.broker_sl_no + 1;
      this.pur_debit_note_broker_details.push(this.fb.group({ 
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
        this.pur_debit_note_broker_details.removeAt(index);
        this.broker_sl_no = this.broker_sl_no - 1;
      }
      else
      {
        this.broker_sl_no = 1;
        alert("can't delete all rows");
        this.pur_debit_note_broker_details.reset();
        this.pur_debit_note_broker_details.at(0).patchValue({sl_no:  this.broker_sl_no});
      } 
      
      for(let i=1; i<=this.broker_sl_no; i++)
      this.pur_debit_note_broker_details.at(i-1).patchValue({sl_no: i});   
    }

    addMusterRoll() 
    {
      this.pur_debit_note_musterroll_details.push(this.fb.group({
      muster_roll_name : '' }));
    }
   
    deleteMusterRoll(index) 
    {
      if(index)
      {this.pur_debit_note_musterroll_details.removeAt(index);}
      else
      {
        alert("can't delete all rows");
        this.pur_debit_note_musterroll_details.reset();
      }
    }

    addDocument() 
    {
      this.pur_debit_note_docs.push(this.fb.group({
      doc_name : '' }));
    }

    deleteDocument(index) 
    {
      if(index)
      {this.pur_debit_note_docs.removeAt(index);}
      else
      {
        alert("can't delete all rows");
        this.pur_debit_note_docs.reset();
      }
    }

    openPurchaseRetApprovalPopUp()
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {b_unit: this._businessunit, supplier: this._supplier, item_type: this._serItemType, item_sub_type: this._serItemSubType,
        date: this.currentDate, company_id: this.company_name, fin_year: this.financialYear, file_name: 'Debit Note'};
      if(this._businessunit != "0")
      {
        const dialogRef = this.dialog.open(PurReturnApprovalNotePopUpComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => 
        {
          if(data != '' && data["purreturnid"] != "0")
          {
            this.DropDownListService.getAllItems().subscribe(data=>
              {
                this.item_codes = data;
                this.status = true;
              })

            this.totalItem = 0;
            this.totalDiscount = 0;
            this.totalNetAmt = 0;
            this.totalQcDeduction = 0;
            this.totalNetAmtAfterDeduction = 0;
            this.totalTaxAmt = 0;
            this.totalGrossAmt = 0;
            this.packingItem = [];
            let  j=0;

            this.addItem();
            this.item_sl_no = 0;
            while(this.pur_debit_note_item_details.length)
            this.pur_debit_note_item_details.removeAt(0); 

            for(let data1 of data.pur_return_approval_item_dtls)
            {
              if(data1.checkbox == true)
              {
                this.status = false;
                forkJoin(
                  this.DropDownListService.getItemPackUom(data1["itemcode"], data1["packing"],this.company_name),
                  this.DropDownListService.getItemMasterPackMat(data1["itemcode"]),
                ).subscribe(([packUomData, packingList])=>
                  {
                    this.status = true; 
                    this.onchangeItemName1(j,data1["itemcode"]);
                    this.addItem();
                    this.capacity[j] = packUomData["capacity"]; 
                    this.empty_bag_wt[j] = packUomData["empty_big_wt"]; 
                    this.packingItem[j] = packingList;  
                    this.totalItem = this.totalItem + parseFloat(data1["amount"]);
                    this.totalDiscount = this.totalDiscount + parseFloat(data1["discountamt"]);
                    this.totalTaxAmt = this.totalTaxAmt + parseFloat(data1["taxamt"]);
                    this.totalNetAmt = this.totalNetAmt + parseFloat(data1["net_amount"]);
                    this.totalGrossAmt =  this.totalGrossAmt + parseFloat(data1["gross_amt"]);
                    this.totalQcDeduction = this.totalQcDeduction + parseFloat(data1["qc_deduction"]);
                    this.totalNetAmtAfterDeduction = this.totalNetAmtAfterDeduction + parseFloat(data1["net_amt_after_qc"]);
                    this.pur_debit_note_item_details.at(j).patchValue({
                      adv_item_code: data1["itemcode"], adv_packing_item: data1["packing"], passed_item_qty: data1["quantity"],
                      passed_item_uom: data1["uom"], passed_packing_qty: data1["squantity"], passed_packing_uom: data1["suom"], matwt: data1["matwt"],
                      unit_rate: data1["price"], passed_mat_weight: data1['matwt'], price_based_on: data1["pricebasedon"], amount: data1["amount"],
                      discount: data1["discountrate"], discount_basedon: data1["discounttype"], discount_amount: data1["discountamt"], 
                      tax_code: data1["taxcode"], tax_rate: data1["taxrate"], tax_amt: data1["taxamt"],  
                      net_amount: data1['net_amount'], qc_deduction: data1['qc_deduction'], 
                      net_amt_after_qc: data1['net_amt_after_qc'], gross_amt: data1['gross_amt']});
                    j = j + 1;
                    this.calculate(this.totalItem, this.totalDiscount, this.totalTaxAmt, this.totalNetAmt, 
                      this.totalQcDeduction, this.totalNetAmtAfterDeduction, this.add, this.sub,
                      this.otherCharges, this.alreadyPaid, this.totalGrossAmt)
                  }); 
              }
            }

            this.status = false;
            forkJoin(
              this.DropDownListService.getPurRtnAppNoteDtls("purreturnid="+data["purreturnid"]),
              this.DropDownListService.getPurReturnAppDoc(data["purreturnid"]),
              this.DropDownListService.getPurReturnAppTI(data["purreturnid"]),
            ).subscribe(([purRetData, docData, transData])=>
              {
                this.DebitNoteId  = this.userForm.get("id").value as FormControl;
                console.log("purRetNoteData "+JSON.stringify(purRetData))
                this.userForm.patchValue({truck_no: transData['vehicleno'],referance_id: data["purreturnid"], id: this.DebitNoteId})

                console.log("docData "+JSON.stringify(docData))
                let j = 0;
                this.addDocument();
                while(this.pur_debit_note_docs.length)
                this.pur_debit_note_docs.removeAt(0);
                for(let data1 of docData)
                {
                  this.addDocument();
                  this.pur_debit_note_docs.at(j).patchValue({doc_name: data1['docname']});
                  j = j + 1;
                }

                if(purRetData['referance_id'] != "0")
                {
                  this.status = false;
                  if(purRetData['returnbasedon'] == "Purchase Order")
                  {
                    this.DropDownListService.purOrdBPDRetriveList(purRetData['referance_id']).subscribe(bpData=>
                    {
                      this.pur_debit_note_bp_details.patchValue({supp_name: bpData['supp_name'], supp_phone: bpData['supp_phone'], 
                        supp_fax: bpData['supp_fax'], supp_email: bpData['supp_email'], supp_address: bpData['supp_address'],
                        cp_name: bpData['cp_name'], cp_designation: bpData['cp_designation'], cp_phone: bpData['cp_phone'], 
                        cp_fax: bpData['cp_fax'], cp_email: bpData['cp_email'], cp_address: bpData['cp_address']});
                      this.status = true;
                    })
                  }
                  else  if(purRetData['returnbasedon'] == "GRN")
                  {
                    this.DropDownListService.getPurGoodRcptBPDtls(purRetData['referance_id']).subscribe(bpData=>
                    {
                      this.pur_debit_note_bp_details.patchValue({supp_name: bpData['sp_name'], supp_phone: bpData['supp_phone'], 
                        supp_fax: bpData['sp_fax'], supp_email: bpData['sp_email'], supp_address: bpData['sp_address'],
                        cp_name: bpData['cp_name'], cp_designation: bpData['cp_designation'], cp_phone: bpData['cp_phone'], 
                        cp_fax: bpData['cp_fax'], cp_email: bpData['cp_email'], cp_address: bpData['cp_address']});
                      this.status = true;
                    })
                  }
                  else
                  {
                    forkJoin(
                      this.DropDownListService.gePurBillBPRetrive(purRetData['referance_id']),
                      this.DropDownListService.purBillBrokerRetriveList(purRetData['referance_id'])
                    ).subscribe(([bpData, brokerData])=>
                    {
                      this.pur_debit_note_bp_details.patchValue({supp_name: bpData['supp_name'], supp_phone: bpData['supp_phone'], 
                        supp_fax: bpData['supp_fax'], supp_email: bpData['supp_email'], supp_address: bpData['supp_address'],
                        cp_name: bpData['cp_name'], cp_designation: bpData['cp_designation'], cp_phone: bpData['cp_phone'], 
                        cp_fax: bpData['cp_fax'], cp_email: bpData['cp_email'], cp_address: bpData['cp_address']});
                      
                      this.addBroker();
                      this.broker_sl_no = 0;
                      while(this.pur_debit_note_broker_details.length)
                      this.pur_debit_note_broker_details.removeAt(0); 
                      console.log("brokerData "+JSON.stringify(brokerData))
                      let k = 0;
                      for(let data1 of brokerData)
                      { 
                        this.addBroker();
                        this.pur_debit_note_broker_details.at(k).patchValue({broker_name: data1['broker_name'], 
                          brokerage_amt: data1['brokerage_amt'], broker_other_info: data1['broker_other_info'], 
                          up_brokerage_amt: data1['up_brokerage_amt'], total_brokerage: data1['total_brokerage']});
                        k = k + 1;
                      }
                      this.status = true;
                    })
                  }
                }
                else{this.status = true;} 
            }); 
          }
        });
      }else{alert("Select BusinessUnit First!")}
    }

    openPurchaseRetNotePopUp()
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {b_unit: this._businessunit, supplier: this._supplier, item_type: this._serItemType, item_sub_type: this._serItemSubType,
        date: this.currentDate, company_id: this.company_name, fin_year: this.financialYear};
      if(this._businessunit != "0")
      {
        const dialogRef = this.dialog.open(PurReturnNotePopUpComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => 
        {
          if(data != '' && data["purreturnnoteid"] != "0")
          {

            this.DropDownListService.getAllItems().subscribe(data=>
              {
                this.item_codes = data;
                this.status = true;
              })
            this.totalItem = 0;
            this.totalDiscount = 0;
            this.totalNetAmt = 0;
            this.totalQcDeduction = 0;
            this.totalNetAmtAfterDeduction = 0;
            this.totalTaxAmt = 0;
            this.totalGrossAmt = 0;
            this.packingItem = [];
            let  j=0;
            this.addItem();
            this.item_sl_no = 0;
            while(this.pur_debit_note_item_details.length)
            this.pur_debit_note_item_details.removeAt(0); 

            for(let data1 of data.pur_return_note_Item_Dtls)
            {
              if(data1.checkbox == true)
              {
                this.status = false;
                forkJoin(
                  this.DropDownListService.getItemPackUom(data1["itemcode"], data1["packing"],this.company_name),
                  this.DropDownListService.getItemMasterPackMat(data1["itemcode"]),
                ).subscribe(([packUomData, packingList])=>
                  {
                    this.status = true; 
                    this.onchangeItemName1(j,data1["itemcode"]);
                    this.addItem();
                    this.capacity[j] = packUomData["capacity"]; 
                    this.empty_bag_wt[j] = packUomData["empty_big_wt"]; 
                    this.packingItem[j] = packingList;  
                    this.totalItem = this.totalItem + parseFloat(data1["amount"]);
                    this.totalDiscount = this.totalDiscount + parseFloat(data1["discountamt"]);
                    this.totalTaxAmt = this.totalTaxAmt + parseFloat(data1["taxamt"]);
                    this.totalNetAmt = this.totalNetAmt + parseFloat(data1["net_amount"]);
                    this.totalGrossAmt =  this.totalGrossAmt + parseFloat(data1["gross_amt"]);
                    this.totalQcDeduction = this.totalQcDeduction + parseFloat(data1["qc_deduction"]);
                    this.totalNetAmtAfterDeduction = this.totalNetAmtAfterDeduction + parseFloat(data1["net_amt_after_qc"]);
                    this.pur_debit_note_item_details.at(j).patchValue({
                      adv_item_code: data1["itemcode"], adv_packing_item: data1["packing"], passed_item_qty: data1["quantity"],
                      passed_item_uom: data1["uom"], passed_packing_qty: data1["squantity"], passed_packing_uom: data1["suom"], matwt: data1["matwt"],
                      unit_rate: data1["price"], passed_mat_weight: data1['matwt'], price_based_on: data1["pricebasedon"], amount: data1["amount"],
                      discount: data1["discountrate"], discount_basedon: data1["discounttype"], discount_amount: data1["discountamt"], 
                      tax_code: data1["taxcode"], tax_rate: data1["taxrate"], tax_amt: data1["taxamt"], 
                      net_amount: data1['net_amount'], qc_deduction: data1['qc_deduction'], 
                      net_amt_after_qc: data1['net_amt_after_qc'], gross_amt: data1['gross_amt']});
                    j = j + 1;
                    this.calculate(this.totalItem, this.totalDiscount, this.totalTaxAmt, this.totalNetAmt, 
                      this.totalQcDeduction, this.totalNetAmtAfterDeduction, this.add, this.sub,
                      this.otherCharges, this.alreadyPaid, this.totalGrossAmt)
                  }); 
              }
            }

            this.status = false;
            forkJoin(
              this.DropDownListService.getPurRtnNoteDtls(data["purreturnnoteid"]),
              this.DropDownListService.getPurRtnNoteBrokerDtls(data["purreturnnoteid"]),
              this.DropDownListService.getPurRtnNoteDocs(data["purreturnnoteid"]),
              this.DropDownListService.getPurRtnNoteTransInfo(data["purreturnnoteid"]),
            ).subscribe(([purRetNoteData, brokerData, docData, transData])=>
              {
                this.DebitNoteId  = this.userForm.get("id").value as FormControl;
                console.log("purRetNoteData "+JSON.stringify(purRetNoteData))
                this.userForm.patchValue(purRetNoteData);

                this.userForm.patchValue({truck_no: transData['vehicleno'], referance_id: data["purreturnnoteid"], id: this.DebitNoteId})

                console.log("brokerData "+JSON.stringify(brokerData))
                let k = 0;
                this.addBroker();
                this.broker_sl_no = 0;
                while(this.pur_debit_note_broker_details.length)
                this.pur_debit_note_broker_details.removeAt(0); 
                for(let data1 of brokerData)
                { 
                  this.addBroker();
                  this.pur_debit_note_broker_details.at(k).patchValue({broker_name: data1['brokercode']});
                  k = k + 1;
                }

                console.log("docData "+JSON.stringify(docData))
                let j = 0;
                this.addDocument();
                while(this.pur_debit_note_docs.length)
                this.pur_debit_note_docs.removeAt(0);
                for(let data1 of docData)
                {
                  this.addDocument();
                  this.pur_debit_note_docs.at(j).patchValue({doc_name: data1['docname']});
                  j = j + 1;
                }

                console.log("pur ret note ref id: "+purRetNoteData['referance_id'])
                if(purRetNoteData['referance_id'] != "0")
                {
                  this.DropDownListService.getPurRtnAppNoteDtls("purreturnid="+purRetNoteData["referance_id"]).subscribe(purRetData=>
                  {
                    this.userForm.patchValue({ supplier_id: purRetData['supplier']})

                    console.log("pur ret app note ref id: "+purRetData['referance_id']+" ref type: "+ purRetData['returnbasedon'])
                    if(purRetData['referance_id'] != "0")
                    {
                      this.status = false
                      if(purRetData['returnbasedon'] == "Purchase Order")
                      {
                        this.DropDownListService.purOrdBPDRetriveList(purRetData['referance_id']).subscribe(bpData=>
                        {
                          console.log("pur order bp details: "+ JSON.stringify(data))
                          this.pur_debit_note_bp_details.patchValue({supp_name: bpData['supp_name'], supp_phone: bpData['supp_phone'], 
                            supp_fax: bpData['supp_fax'], supp_email: bpData['supp_email'], supp_address: bpData['supp_address'],
                            cp_name: bpData['cp_name'], cp_designation: bpData['cp_designation'], cp_phone: bpData['cp_phone'], 
                            cp_fax: bpData['cp_fax'], cp_email: bpData['cp_email'], cp_address: bpData['cp_address']});
                          this.status = true;
                        })
                      }
                      else  if(purRetData['returnbasedon'] == "GRN")
                      {
                        this.DropDownListService.getPurGoodRcptBPDtls(purRetData['referance_id']).subscribe(bpData=>
                        {
                          console.log("grn bp details: "+ JSON.stringify(data))
                          this.pur_debit_note_bp_details.patchValue({supp_name: bpData['sp_name'], supp_phone: bpData['supp_phone'], 
                            supp_fax: bpData['sp_fax'], supp_email: bpData['sp_email'], supp_address: bpData['sp_address'],
                            cp_name: bpData['cp_name'], cp_designation: bpData['cp_designation'], cp_phone: bpData['cp_phone'], 
                            cp_fax: bpData['cp_fax'], cp_email: bpData['cp_email'], cp_address: bpData['cp_address']});
                          this.status = true;
                        })
                      }
                      else
                      {
                        this.DropDownListService.gePurBillBPRetrive(purRetData['referance_id']).subscribe(bpData=>
                        {
                          console.log("pur bill bp details: "+ JSON.stringify(data))
                          this.pur_debit_note_bp_details.patchValue({supp_name: bpData['supp_name'], supp_phone: bpData['supp_phone'], 
                            supp_fax: bpData['supp_fax'], supp_email: bpData['supp_email'], supp_address: bpData['supp_address'],
                            cp_name: bpData['cp_name'], cp_designation: bpData['cp_designation'], cp_phone: bpData['cp_phone'], 
                            cp_fax: bpData['cp_fax'], cp_email: bpData['cp_email'], cp_address: bpData['cp_address']});
                          this.status = true;
                        })
                      }
                    }
                  })
                }else{this.status = true;} 
            }); 
          }
        });
      }else{alert("Select BusinessUnit First!")}
    }

    send()
    { 
      this.DebitNoteId= this.userForm.get("id").value as FormControl           
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
        if(this.DebitNoteId > 0)
        {
          this.status = false;      
          this.Service.updateDebitNote(this.userForm.getRawValue(), this.DebitNoteId).subscribe(data => 
          {
            console.log(this.userForm.value);
            alert("Debit Note Updated successfully.");
            this.userForm.reset();
            this.ngOnInit();  
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});    
        } 
        else
        {
          this.status = false;      
          console.log("userform: "+ JSON.stringify(this.userForm.value));
          this.Service.createPurDebitNote(this.userForm.getRawValue()).subscribe(data => 
          {
            alert("New Debit Note created successfully.");
            this.userForm.reset();
            this.ngOnInit();          
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});    
        }
      }  
    }

  
    onUpdate(id:any, debitnoteid:string, action)
    {
      this.debitnotesave=true;
      this.userForm.patchValue({id: id});	
      this.status = false;
      this.isHidden = true;
      this.packingItem = [];
      
      forkJoin(
        this.Service.purDebitNoteRetriveList(id),
        this.Service.purDebitNoteItemRetriveList(debitnoteid),      
        this.Service.purDebitNoteMusterRollRetriveList(debitnoteid),
        this.Service.purDebitNoteTaxInfoRetriveList(debitnoteid),
        this.Service.purDebitNoteBrokerRetriveList(debitnoteid),
        this.Service.purDebitNoteBpDtlsRetriveList(debitnoteid),
        this.Service.purDebitNoteAccountInfoRetriveList(debitnoteid),
        this.Service.purDebitNoteDocsRetriveList(debitnoteid),
      ).subscribe(([DebitNoteData, itemData, MusterrollData, 
          TaxInfo, brokerData, Bpdetails, AccountData, DocsData])=>
        {
          this.add = DebitNoteData['other_charges'];
          this.sub = DebitNoteData['add1'];
          this.otherCharges = DebitNoteData['add2'];
          this.alreadyPaid = DebitNoteData['already_paid'];
          this.onChangeBusinessUnit(DebitNoteData["businessunit"]);
          this.onChangeSupplierName(DebitNoteData["supplier_id"]);
          this.currentDate = DebitNoteData["bill_date"];

          this.userForm.patchValue({id: DebitNoteData["id"], debitnoteid: DebitNoteData["debitnoteid"], debitnoteno: DebitNoteData["debitnoteno"],
            businessunit: DebitNoteData["businessunit"], debitnotedate: DebitNoteData["debitnotedate"],supplier_name: DebitNoteData["supplier_name"],  created_by: DebitNoteData["created_by"], 
            truck_no: DebitNoteData["truck_no"], remarks: DebitNoteData["remarks"],company_id: DebitNoteData["company_id"], fin_year: DebitNoteData["fin_year"],
            supplier_id: DebitNoteData["supplier_id"], debitnotetype: DebitNoteData['debitnotetype'], referance_id: DebitNoteData['referance_id'],
            item_total: DebitNoteData["item_total"],item_total_gl_ac: DebitNoteData["item_total_gl_ac"], discount: DebitNoteData["discount"],discount_gl_ac: DebitNoteData["discount_gl_ac"],
            qc_deduction: DebitNoteData["qc_deduction"],net_amt: DebitNoteData["net_amt"],net_amt_gl_ac: DebitNoteData["net_amt_gl_ac"], 
            qc_deduction_gl_ac: DebitNoteData["qc_deduction_gl_ac"], amt_after_deduction: DebitNoteData["amt_after_deduction"], amt_after_deduction_gl_ac: DebitNoteData["amt_after_deduction_gl_ac"], 
            add_tax: DebitNoteData["add_tax"], add_tax_gl_ac: DebitNoteData["add_tax_gl_ac"], post_tax_amt: DebitNoteData["post_tax_amt"], 
            roundoff_amt: DebitNoteData["roundoff_amt"], roundoff_gl_ac: DebitNoteData["roundoff_gl_ac"], payable_party: DebitNoteData["payable_party"], 
            payable_party_gl_ac: DebitNoteData["payable_party_gl_ac"], already_paid: DebitNoteData["already_paid"], already_paid_gl_ac: DebitNoteData["already_paid_gl_ac"], 
            post_tax_amt_gl_ac: DebitNoteData["post_tax_amt_gl_ac"], other_charges: DebitNoteData["other_charges"], other_charges_gl_ac: DebitNoteData["other_charges_gl_ac"],
            net_payable_party: DebitNoteData["net_payable_party"], net_payable_party_gl_ac: DebitNoteData["net_payable_party_gl_ac"], 
            payable_amt: DebitNoteData["payable_amt"], payable_amt_gl_ac: DebitNoteData["payable_amt_gl_ac"], add1: DebitNoteData["add1"], 
            add1_gl_ac: DebitNoteData["add1_gl_ac"],add2: DebitNoteData["add2"],add2_gl_ac: DebitNoteData["add2_gl_ac"]});
            
          console.log("itemData: "+  JSON.stringify(itemData));
          let k = 0;  
          this.addItem()
          this.item_sl_no = 0;
          while (this.pur_debit_note_item_details.length) 
          this.pur_debit_note_item_details.removeAt(0);
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
                this.packingItem[k] = packingList; 
                this.capacity[k] = capacityEmptyWt["capacity"];
                this.empty_bag_wt[k] =  capacityEmptyWt["empty_big_wt"];
                this.pur_debit_note_item_details.at(k).patchValue(data1);
                k = k + 1;
              });
          }

          this.addMusterRoll()
          while (this.pur_debit_note_musterroll_details.length)
          this.pur_debit_note_musterroll_details.removeAt(0);
          for(let data1 of MusterrollData)
          this.addMusterRoll();
          this.pur_debit_note_musterroll_details.patchValue(MusterrollData);
          console.log("Musterdata: "+JSON.stringify(MusterrollData));

          console.log("Tax details: "+  JSON.stringify(TaxInfo));
          this.pur_debit_note_tax_info.patchValue(TaxInfo);

          this.addBroker();
          this.broker_sl_no = 0;
          while (this.pur_debit_note_broker_details.length)
          this.pur_debit_note_broker_details.removeAt(0);
          for(let data1 of brokerData)
          this.addBroker();
          this.pur_debit_note_broker_details.patchValue(brokerData);
          console.log("brokerData: "+JSON.stringify(brokerData));

          console.log("BP data: "+  JSON.stringify(Bpdetails));
          this.pur_debit_note_bp_details.patchValue(Bpdetails);

          console.log("Account: "+  JSON.stringify(AccountData));
          this.pur_debit_note_account_info.patchValue(AccountData);

          this.addDocument()
          while (this.pur_debit_note_docs.length)
          this.pur_debit_note_docs.removeAt(0);
          for(let data1 of DocsData)
          this.addDocument();
          this.pur_debit_note_docs.patchValue(DocsData);
          console.log("docData: "+JSON.stringify(DocsData));

          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});                              
    } 
  }
