import { Component, OnInit } from '@angular/core';
import { Master } from '../../../../../../service/master.service';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { Sales_Quotation } from '../../../../../../Models/SalesTransaction/Sales_Quotation';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { SalesEnquiryPopUpModalComponent } from '../sales-enquiry-pop-up-modal/sales-enquiry-pop-up-modal.component';
import { SalesEnqCusPopUpComponent } from '../sales-enq-cus-pop-up/sales-enq-cus-pop-up.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { SalesQuoTaxModalComponent } from '../sales-quo-tax-modal/sales-quo-tax-modal.component';
import { SalesQuoTypePopUpModalComponent } from '../sales-quo-type-pop-up-modal/sales-quo-type-pop-up-modal.component';
import { forkJoin } from 'rxjs';
import { formatDate } from '@angular/common';
import { ChargeCodePopUpComponent } from '../charge-code-pop-up/charge-code-pop-up.component';
import { QcNormsPopUpComponent } from '../../components/qc-norms-pop-up/qc-norms-pop-up.component';
import { PackingListPopUpComponent } from '../../components/packing-list-pop-up/packing-list-pop-up.component';
import { TransporterListPopUpComponent } from '../../components/transporter-list-pop-up/transporter-list-pop-up.component';
import { Session } from 'protractor';
import { SalesQuoPopUpModalComponent } from '../sales-quo-pop-up-modal/sales-quo-pop-up-modal.component';
import { constants } from 'zlib';

  @Component({
    selector: 'app-sales-quotation',
    templateUrl: './sales-quotation.component.html',
    styleUrls: ['./sales-quotation.component.scss']
  })
  
  export class SalesQuotationComponent implements OnInit 
  {
    isHidden:any;
    operation:any;
    submitted = false;
    public userForm:FormGroup;
    public userForm1:FormGroup;
    model: Sales_Quotation = new Sales_Quotation();
    status:any;
    item_codes:any = [];
    company_name:any;
    listSalesQuotation:{};
    employeeNames:any = [];
    invoiceType:any = [];
    Id:any;
    chargesIdList:any = [];
    businesslists:any = [];
    brokerNames:any = [];
    quo_types:{};
    trans_codes:{};
    reasonIdList:any = [];
    seq_no:any;
    currentDate:any;
    channel_master_list:any = [];
    contNameList:any = [];
    payTerms:any = [];
    send_via_list:{};
    financialYear:any;
    customUOMs:any = [];
    bussiness_unit_data="";
    bussiness_unit_list:any = [];
    partyList:any = [];
    item_sl_no = 1; 
    bank_names:{};
    quoType:any;
    basiss:{};
    broker_sl_no = 1;
    selectedPackingItem:any = [];
    selectedItemName = [];
    selectedBrokerName = [];
    selectedPartyName = [];
    party_sl_no = 1;
    isPackingListReq:any = [];
    partyNameList:any = [];
    isBankNameDisabled = false;
    isChecked1=false;
    cashLimit:any;
    transBrone:{};
    is_quo_type_Formal="";
    _weighmentUom:any;
    _deliveryTerm:any;
    _ref_type:any;
    customerDelvAddList:any = [];
    isChecked=false;
    _customerId:any;
    validTill:any;
    action:any;
    salesquotationsave:boolean = true;
    salesquotationview:boolean = true;
    salesquotationupdate:boolean = true;
    quotationtypecheck:boolean=true;
    brokerage_appChecked:any;
    Payment_mode:any;
    Quotationcheckpoint:any;
    Userroles:boolean=true;
    fyear:any;
    allfin:any=[];

    constructor(public fb:FormBuilder, public dialog: MatDialog,
      private Service : Master,private DropDownListService: DropdownServiceService)
    {
      this.userForm=fb.group(
      {
        id:[''],
        quotation_id: [''],
        quotation_no:[''],
        quotation_date:[''],
        valid_till:[''],
        price_term:[''],
        pro_order:[''],
        cust_channel:[''],
        cust_ref:[''],
        receipt_ct:[''],
        we_uom:[''],
        business_unit:[''],
        delivery:[''],
        q_status:[''],
        shipment_mode:[''],
        ref_type:[''],
        sales_person:[''],
       // delivery_mode:[''],
        delivery_term:[''],
        remarks:[''],
        confirmed_by:[''],
        approved:[''],
        reason:[''],
        app_chgs_id:[''],
        quo_type:[''],
        company_id: [''],
        fin_year: [''],
        inv_type: [''],
        customer: [''],
        referance_id: [''],
        brokerage_app: [''],
        username: [''],
        sale_orderused: [''],
        quotationcheckpoint:[''],
        terminate:[''],
      
        sales_Quotation_Item_Dtls: this.fb.array([this.fb.group({
          slno:this.item_sl_no,
          item_code:'',
          packing:'',
          quantity:'',
          uom:'',
          squantity:'',
          suom:'',
          item_tolerance:'0',
          tolerance_qty:'0',
          con_factor:'',
          mat_wt:'',
          hsn_code:'',
          price:'',
          price_based_on:'',
          amount:'',
          discount_type:'',
          discount_rate:'',
          tolerance:'',
          tax_code:'',
          tax_rate: '',
          acc_norms:'',
          packing_list_req:'',
          packing_list:'',
          discount_amt:'',
          tax_amt:'',
          total_amt:'',
          cgst_amt:'',
          sgst_amt:'',
          igst_amt:''})]),


        sales_Quotation_Broker_Dtls: this.fb.array([this.fb.group({
          slno:this.broker_sl_no,
          broker_code:'',
          broker_name:'',
          basis:'',
          rate:'',
          based_on:''
         })]),

         sales_Quotation_Docs: this.fb.array([this.fb.group({       
          doc_name:'',       
         })]),
  
        sales_Quotation_Summary:this.fb.group({
          item_total:'',
          discount:'',
          tax_total:'',
          net_amount:'',
          app_brokerage:'',
          net_r_value:'',
        }),

        sales_Quotation_Trans_Info:this.fb.group({
          trans_borne_by:'',
          mode_of_trans:'',
          trans_code:'',
          charge_code:'',
          transporters:''}),

        sales_Quotation_Shipment_Dtls:this.fb.group({
          ship_addr:'',
          ship_details:'',
          pay_addr:'',
          pay_details:'' }),

        sales_Quotation_Terms_Con:this.fb.group({	
          payment_mode:'',
          payment_term:'',
          bank_name:'',
          account_no:'',
          ifsc_code:'',
          cash_limit:'',
          account_name:  '',  
          branch:  '',   
          iban:  '',   
          bic_swift_code:'',
         //delivery_mode:''
        }),

        sales_Quotation_Party_Dtls:this.fb.array([this.fb.group({
          sl_no : this.party_sl_no,  
          p_code:'',
          cp_name:'',
          cp_contact:'',
          send_via:'',
          tcs_applicable:'',
          tcs_rate:''
        })]),

        sales_Quotation_Summary_dyn: this.fb.array([this.fb.group({
          charge_name:'',
          rate_cal_method:'',
          amount:'',
          tax_rate: '' })]),
      });

      this.userForm1=fb.group(
        {
          fromdate:[''],
          todate:[''],
        });

    }
    
    get quotationcheckpoint(){return this.userForm.get("quotationcheckpoint") as FormControl};
    get id(){return this.userForm.get("id") as FormControl};
    get quotation_id(){return this.userForm.get("quotation_id") as FormControl};
    get quotation_no(){return this.userForm.get("quotation_no") as FormControl};
    get quo_type(){return this.userForm.get("quo_type") as FormControl};
    get quotation_date(){return this.userForm.get("quotation_date") as FormControl};
    get valid_till(){return this.userForm.get("valid_till") as FormControl};
    get price_term(){return this.userForm.get("price_term") as FormControl};
    get pro_order(){return this.userForm.get("pro_order") as FormControl};
    get cust_channel(){return this.userForm.get("cust_channel") as FormControl};
    get cust_ref(){return this.userForm.get("cust_ref") as FormControl};
    get receipt_ct(){return this.userForm.get("receipt_ct") as FormControl};
    get we_uom(){return this.userForm.get("we_uom") as FormControl};
    get business_unit(){return this.userForm.get("business_unit") as FormControl};
    get q_status(){return this.userForm.get("q_status") as FormControl};
    get shipment_mode(){return this.userForm.get("shipment_mode") as FormControl};
    get ref_type(){return this.userForm.get("ref_type") as FormControl};
    get sales_person(){return this.userForm.get("sales_person") as FormControl};
    get delivery_term(){return this.userForm.get("delivery_term") as FormControl};  
    get remarks(){return this.userForm.get("remarks") as FormControl};
    get confirmed_by(){return this.userForm.get("confirmed_by") as FormControl};
    get approved(){return this.userForm.get("approved") as FormControl};
    get reason(){return this.userForm.get("reason") as FormControl};    
    get inv_type(){return this.userForm.get("inv_type") as FormControl};
    get customer(){return this.userForm.get("customer") as FormControl};
    get terminate(){return this.userForm.get("terminate") as FormControl};
    get sale_orderused(){return this.userForm.get("sale_orderused") as FormControl};
    get sales_Quotation_Item_Dtls(){return this.userForm.get("sales_Quotation_Item_Dtls") as FormArray};
    get sales_Quotation_Broker_Dtls(){return this.userForm.get("sales_Quotation_Broker_Dtls") as FormArray};
    get sales_Quotation_Summary(){return this.userForm.get("sales_Quotation_Summary") as FormGroup};
    get sales_Quotation_Trans_Info(){return this.userForm.get("sales_Quotation_Trans_Info") as FormGroup};
    get sales_Quotation_Shipment_Dtls(){return this.userForm.get("sales_Quotation_Shipment_Dtls") as FormGroup};
    get sales_Quotation_Terms_Con(){return this.userForm.get("sales_Quotation_Terms_Con") as FormGroup};
    get sales_Quotation_Party_Dtls(){return this.userForm.get("sales_Quotation_Party_Dtls") as FormArray};
    get sales_Quotation_Docs() {return this.userForm.get('sales_Quotation_Docs') as FormArray;}
    get sales_Quotation_Summary_dyn() {return this.userForm.get('sales_Quotation_Summary_dyn') as FormArray;}

    get fromdate(){return this.userForm1.get("fromdate") as FormControl};
    get todate(){return this.userForm1.get("todate") as FormControl};


    ngOnInit() 
    {
      //For User Role
    let user_role=localStorage.getItem("user_role")+"tuhinabcd"+"sales_transaction";
    this.DropDownListService.getRoleItemMaster(user_role).subscribe(data=>{
    let accessdata=JSON.stringify(data);
  
    this.salesquotationsave=false;
    this.salesquotationview=false;
    this.salesquotationupdate=false;

    if(accessdata.includes('sales_quotation.save'))
    {
     this.salesquotationsave = true;
    }
   if(accessdata.includes('sales_quotation.update'))
    { 
      this.salesquotationupdate=true;
    }
    if(accessdata.includes('sales_quotation.view'))
    {
      this.salesquotationview=true;
    }

    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
    
      this.status = false;

      if(localStorage.getItem("user_role") == "RL00001")
      {
        this.Userroles=true;
      }
      else
      {
        this.Userroles=false;
        //this.Quotationcheckpoint="No";
        this.userForm.patchValue({quotationcheckpoint: "No"});
      }

      this.quo_types=["Formal","Informal"];
    // this.quo_types=["Formal"];
      this.transBrone=["FOB","FOR"];
      this.company_name = localStorage.getItem("company_name");
      this.validTill = this.currentDate;
      this.send_via_list=["COURIER","EMAIL","FAX","OTHER"];
      this.financialYear = localStorage.getItem("financial_year");
      this.basiss=["%","UOM"];
      this.financialYear = localStorage.getItem("financial_year");
      this.isPackingListReq[0] = "false";
      this.cashLimit = 0;
      this.operation = 'Create';
      this.isHidden = false;
      /* this._weighmentUom = 0;
      this._deliveryTerm = "0"; */
      this.action = 'update';

      this.Quotationcheckpoint="No";

      this.capacity = [];
      this.empty_bag_wt = [];
      this.packingItem = [];
      this.selectedBrokerName = [];
      this.selectedContName = [];
      this.selectedItemName = [];
      this.selectedPartyName = [];
      this.selectedPackingItem = [];
      /* this._ref_type = "0";
      this._customerId = "0"; */
      this.brokerage_appChecked=true;
      this.userForm.patchValue({id: 0, referance_id: 0});
      //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      
      this.DropDownListService.getCompanyBUMNCList(this.company_name).subscribe(data=>
      {
        this.bussiness_unit_list  = data;
        for(let data1 of data)
        { this.bussiness_unit_data+=data1.businessunit_id+",";} 
      }); 

      this.DropDownListService.getfinyearlist().subscribe(finyearlist=>
        {
          this.allfin=finyearlist;
          this.allfin.forEach(element => {
            if(element.year_active)
            {
              this.fyear=element.finyear;
            // console.log("fyear:"+this.fyear+"//"+this.financialYear)
              if(this.fyear==this.financialYear)
              {
                this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
              }
              else{
                this.currentDate='0000-00-00';
              }
            } 
          });
        forkJoin(
          this.DropDownListService.getInvSalesTypes(),
          this.DropDownListService.getWeighmentCustomUOM(),
          //this.Service.getSalesQuotations(),
          this.DropDownListService.getSalesQuotationsList(this.currentDate),
          this.DropDownListService.getBankLedger(),
          //this.DropDownListService.customerNameCodeList(this.company_name),
          this.DropDownListService.customerNameCodeListnew(this.company_name),
          this.DropDownListService.reasonList(),
          this.Service.getChannelCust(),
          this.DropDownListService.employeeNamesList(this.company_name),
          this.DropDownListService.getChargeMasterList(),
          this.DropDownListService.custometrBusList(this.company_name),
        // this.DropDownListService.transporterNamesList(),
          this.DropDownListService.getTransporterMNCListFast(),
          this.DropDownListService.payTermNameList(),
        ).subscribe(([invoiceData, customUomData, salesQuoData, bankLedgerData, CustomerData,
            reasonData, channelData, employeeData, chargeData, custBuData,
            TransporterData, payTermData])=>
          {
            console.log("payTermData"+JSON.stringify(payTermData));
            this.invoiceType  = invoiceData;
            this.customUOMs = customUomData;
            this.listSalesQuotation  = salesQuoData;
            this.bank_names  = bankLedgerData;
            this.partyNameList  = CustomerData;
            this.reasonIdList = reasonData;
            this.channel_master_list = channelData;
            this.employeeNames = employeeData;
            this.chargesIdList  = chargeData;
            this.businesslists  = custBuData;
            this.trans_codes  = TransporterData;
            this.payTerms = payTermData;
            /* this.userForm.patchValue({we_uom: "0", app_chgs_id: "0", sales_person: "0", inv_type: "0", 
              confirmed_by: "0", reason: "0", cust_channel: "0", quo_type: "0", business_unit: "0", customer: "0"});
            */         
            this.sales_Quotation_Item_Dtls.at(0).patchValue({uom: '', quantity: 0, squantity: 0, price: 0, tax_rate: 0,
              price_based_on: "0", discount_rate: 0, discount_type: "0"});
            this.sales_Quotation_Terms_Con.patchValue({payment_mode: "RTGS", bic_swift_code: '', payment_term: "APT00002"})
            this.sales_Quotation_Trans_Info.patchValue({trans_code: "0", trans_borne_by: "0"})
            this.sales_Quotation_Shipment_Dtls.patchValue({ship_addr: "0", pay_addr: "0"})
            this.sales_Quotation_Party_Dtls.at(0).patchValue({p_code: "0"});
            this.selectedPartyName[0] = "0";
            this.status = true;
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});
        });
        
        
    }

    Quo_type:any;
    ref_Type:any;
    orderType:any;
    Price_term:any;
    Receipt_Criteria:any;
    Shipment_Mode:any;
    Bunit:any;
    _invoiceType:any;
    Q_status:any;

    showList(s:string)
    {
      if(this.salesquotationsave == true  && this.salesquotationupdate == true)//true exist  false not exist 
      {
        if(s  ==  "add")
        {
          this.Bunit = this.userForm.get("business_unit").value as FormControl;
          this.isHidden  = true;
          this.quotationtypecheck=true;
          
          //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
          //this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
          this.allfin.forEach(element => {
            if(element.year_active)
            {
              this.fyear=element.finyear;
             // console.log("fyear2:"+this.fyear+"//"+this.financialYear)
              if(this.fyear==this.financialYear)
              {
                this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
              }
              else{
                this.currentDate='';
              }
              this.userForm.patchValue({id: 0, referance_id: 0, quotation_date: this.currentDate});
            /*  if ((this.currentDate >= formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en')) && (this.currentDate <= formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en'))) {
                //console.log("sucess");
              }
              else {
                alert("Selected  date is not in Selected Financial period!!!!!!")
                this.currentDate = formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
              }*/
            }
           });

          /* this.userForm.patchValue({we_uom: "CUM00002", app_chgs_id: "0", sales_person: "0", inv_type: "INV00001", 
            confirmed_by: "0", reason: "0", cust_channel: "0", quo_type: "0", business_unit: "0", customer: "0"});
          */            
           

          /* forkJoin(
            this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
            this.DropDownListService.getInvSalesTypes(),
             this.DropDownListService.getCustomUOMs("WUOM"),
            
         ).subscribe(([ bUnitData,invoiceData,customUomData])=> 
            {
              this.businesslists=bUnitData;
              this.invoiceType = invoiceData;
              this.customUOMs = customUomData; */

              this._deliveryTerm="FOB";
              this.Bunit="CBU00001";
              this._invoiceType="INV00001";
              this._weighmentUom="CUM00002";
              this.Quo_type="Formal";
              this.ref_Type="Open Quotation";
              this.Price_term="With Packing Weight";
              this.Receipt_Criteria="Own Weight";
              this.Shipment_Mode="By Road";
              this.Q_status="Finalise";
              this.Payment_mode="RTGS";
              this.Quotationcheckpoint="No";

              this.onChangeWgmtUom(this._weighmentUom);
              this.onChangePaymentMode(this.Payment_mode);

              forkJoin(
              this.DropDownListService.getSalesQuotSequenceId("QUOT/"+this.currentDate+"/"+this.Quo_type),
              this.DropDownListService.getItemThruSalesThruBU_inv_typeReg(this.Bunit,this.company_name),
              )
              .subscribe(([Code,RegItem])=>
                {
                  this.seq_no = Code.sequenceid;
                  this.item_codes = RegItem;
                  this.status = true;
                }); 

            // });

          this.userForm.patchValue({ we_uom: "CUM00002", app_chgs_id: "0", sales_person: "0", inv_type: "INV00001",
          confirmed_by: "0", reason: "0", cust_channel: "0",quo_type:"Formal" ,
          ref_type:"Open Quotation", customer: "0",business_unit:"CBU00001",price_term:"With Packing Weight",
          receipt_criteria:"Own Weight",delivery_term:"FOB",shipment_mode:"By Road",q_status:"Finalise"});

          this.sales_Quotation_Terms_Con.patchValue({payment_mode: "RTGS", bic_swift_code: '', payment_term: "APT00002"})
          this.sales_Quotation_Trans_Info.patchValue({trans_code: "0", trans_borne_by: "0"})
          this.sales_Quotation_Shipment_Dtls.patchValue({ship_addr: "0", pay_addr: "0"})
          this.sales_Quotation_Party_Dtls.at(0).patchValue({p_code: "0"});

        }
      }
      if(this.salesquotationsave == true  && this.salesquotationupdate == false)
      {
        if(s  ==  "add")
        {
          this.isHidden  = true;
          this.quotationtypecheck=true;
          //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
          //this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
          this.allfin.forEach(element => {
            if(element.year_active)
            {
              this.fyear=element.finyear;
              //console.log("fyear2:"+this.fyear+"//"+this.financialYear)
              if(this.fyear==this.financialYear)
              {
                this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
              }
              else{
                this.currentDate='';
              }
              this.userForm.patchValue({id: 0, referance_id: 0, quotation_date: this.currentDate});
            /*  if ((this.currentDate >= formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en')) && (this.currentDate <= formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en'))) {
                //console.log("sucess");
              }
              else {
                alert("Selected  date is not in Selected Financial period!!!!!!")
                this.currentDate = formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
              }*/
            }
           });
          

          /* this.userForm.patchValue({we_uom: "0", app_chgs_id: "0", sales_person: "0", inv_type: "0", 
            confirmed_by: "0", reason: "0", cust_channel: "0", quo_type: "0", business_unit: "0", customer: "0"});
             */
        console.log("CHECK :: "+this.userForm.get("quo_type").value)

          /* forkJoin(
            this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
            this.DropDownListService.getInvSalesTypes(),
            this.DropDownListService.getCustomUOMs("WUOM"),
            
         ).subscribe(([bUnitData,invoiceData,customUomData])=> 
            {
              this.businesslists=bUnitData;
              this.invoiceType = invoiceData;
              this.customUOMs = customUomData; */
                
              this._deliveryTerm="FOB";
              this.Bunit="CBU00001";
              this._invoiceType="INV00001";
              this._weighmentUom="CUM00002";
              this.Quo_type="Formal";
              this.ref_Type="Open Quotation";
              this.Price_term="With Packing Weight";
              this.Receipt_Criteria="Own Weight";
              this.Shipment_Mode="By Road";
              this.Q_status="Finalise";
              this.Payment_mode="RTGS";
              this.Quotationcheckpoint="No";


              this.onChangeWgmtUom(this._weighmentUom);
              this.onChangewithinvoicetype(this._invoiceType);
              this.onChangePaymentMode(this.Payment_mode);

              this.DropDownListService.getSalesQuotSequenceId("QUOT/"+this.currentDate+"/"+this.Quo_type).subscribe(data=>
                {
                  this.seq_no = data.sequenceid;
                  this.status = true;
                }); 
            //});

          this.userForm.patchValue({ we_uom: "CUM00002", app_chgs_id: "0", sales_person: "0", inv_type: "INV00001",
          confirmed_by: "0", reason: "0", cust_channel: "0", quo_type:"Formal" ,
          ref_type:"Open Quotation", customer: "0",business_unit:"CBU00001",price_term:"With Packing Weight",
          receipt_criteria:"Own Weight",delivery_term:"FOB",shipment_mode:"By Road",q_status:"Finalise"});
  
          this.sales_Quotation_Terms_Con.patchValue({payment_mode: "RTGS", bic_swift_code: '', payment_term: "APT00002"})
          this.sales_Quotation_Trans_Info.patchValue({trans_code: "0", trans_borne_by: "0"})
          this.sales_Quotation_Shipment_Dtls.patchValue({ship_addr: "0", pay_addr: "0"})
          this.sales_Quotation_Party_Dtls.at(0).patchValue({p_code: "0"});
        }
      }
      
      if(s  ==  "list")
      {
        this.isHidden  = false;
        this.action = 'update';
        this.Quotationcheckpoint="No";
        this.userForm.reset();
        this.sales_Quotation_Summary.reset();
        this.sales_Quotation_Trans_Info.reset();
        this.sales_Quotation_Terms_Con.reset();

        this.packingItem = [];
        this.selectedItemName = [];
        this.selectedPackingItem = [];
        this.item_sl_no = 0;
        while(this.sales_Quotation_Item_Dtls.length)
        this.sales_Quotation_Item_Dtls.removeAt(0);
        this.addItems();

        this.selectedPartyName = [];
        this.selectedContName = [];
        this.party_sl_no = 0;
        while(this.sales_Quotation_Party_Dtls.length)
        this.sales_Quotation_Party_Dtls.removeAt(0);
        this.addParty();

        this.selectedBrokerName = [];
        this.broker_sl_no = 0;
        while(this.sales_Quotation_Broker_Dtls.length)
        this.sales_Quotation_Broker_Dtls.removeAt(0);
        this.addBrokers();

        while(this.sales_Quotation_Docs.length)
        this.sales_Quotation_Docs.removeAt(0);
        this.addDocument();

        while(this.sales_Quotation_Summary_dyn.length)
        this.sales_Quotation_Summary_dyn.removeAt(0);
        this.add3();
        
        let accessdata = JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
      
        this.salesquotationsave=false;
        this.salesquotationview=false;
        this.salesquotationupdate=false;

        if(accessdata.includes('sales_quotation.save'))
        {
          this.salesquotationsave = true;
        }
        if(accessdata.includes('sales_quotation.update'))
        {
          this.salesquotationupdate=true;
        }
        if(accessdata.includes('sales_quotation.view'))
        {
          this.salesquotationview=true;
        }
      }
    }

    onChangeDeliveryTerm(del_term:string)
    {
      this._deliveryTerm = del_term;
      console.log("delv:"+del_term)
      if(this._deliveryTerm == "FOB")
      {
        this.sales_Quotation_Shipment_Dtls.patchValue({ship_addr: "0", ship_details: ''});
        this.sales_Quotation_Trans_Info.patchValue({trans_borne_by: "0", mode_of_trans: '', trans_code: "0", charge_code: '', transporters: ''})
      }
    }

    onChangeBuUnit(BuUnit)
    {  
     
     /*  this.DropDownListService.getItemThruSalesThruBU(BuUnit,this.company_name).subscribe(data=>
          {this.item_codes = data;
            // this.status = true;
          }); 
          */
    
    }

    onChangePaymentFromAddId(businessunit_code:string)
    {
      if(businessunit_code.length)
      {
        this.status = false;
        this.DropDownListService.getCompanyBUAddress(businessunit_code).subscribe(data=>
        {
          this.sales_Quotation_Shipment_Dtls.patchValue({pay_details: data["add"]});
          this.status = true;
        });
      }
    }

    onChangeShipToAddId(addId: string)
    {
      if(addId.length)
      {
        this.status = false;
        this.DropDownListService.getCustDelvFromAdd(this._customerId, addId).subscribe(data=>
        {
          this.sales_Quotation_Shipment_Dtls.patchValue({ship_details: data.address})
          this.status = true;
        })
      }
    }

    cal_method:any;
    con_factor:any;
    onChangeWgmtUom(wgmtUom)
    {
      if(wgmtUom.length && wgmtUom != "0")
      {
        this._weighmentUom = wgmtUom;
        this.status = false;
        this.DropDownListService.getCustomUomById(this._weighmentUom).subscribe(data=>
        {
          this.DropDownListService.getUomName(this._weighmentUom).subscribe(uomName=>
          {
            this._weighmentUom = uomName.description;
            this.cal_method = data.cal_method;
            this.con_factor = data.uom_conv_fac;
            this.status = true;
            for(let i = 0; i<this.sales_Quotation_Item_Dtls.length; i++)
            {
              this._item_uom = this.sales_Quotation_Item_Dtls.at(i).get("uom").value as FormControl;
              if(this._item_uom == this._weighmentUom)
              { 
                this.sales_Quotation_Item_Dtls.at(i).patchValue({con_factor: 0});
              }
              else
              {
                this._item_qty = this.sales_Quotation_Item_Dtls.at(i).get("quantity").value as FormControl;
                if(this.cal_method == "Multiply")
                this.sales_Quotation_Item_Dtls.at(i).patchValue({con_factor: parseFloat(this.con_factor) * parseFloat(this._item_qty)});
                if(this.cal_method == "Division")
                this.sales_Quotation_Item_Dtls.at(i).patchValue({con_factor: parseFloat(this._item_qty) / parseFloat(this.con_factor)}); 
              }
            }
          })
        })
      }
    }

    getQuoNo(quoDate, quoType)
    {
      this.status = false;
      this.DropDownListService.getSalesQuotSequenceId("QUOT/"+quoDate+"/"+quoType).subscribe(data=>
      {
        this.seq_no = data.sequenceid;
        this.status = true;
        console.log(data.sequenceid)
      });   
    }

    onChangeValidTill(event)
    {
      this.validTill = event;
      if((this.currentDate).toString() > (event).toString())
      {
        alert("Valit Till must be greater than Quotation Date!")
        this.userForm.get("valid_till").reset();
      }
    }

    onChangeQuoDate(quoDate)
    {
      this.currentDate = quoDate.target.value;
      //this.onChangeValidTill(this.validTill);
      if ((this.currentDate >= formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en')) && (this.currentDate <= formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en'))) {
      this.quoType = this.userForm.get("quo_type").value as FormControl;
      if(this.quoType != "0")
      {this.getQuoNo(this.currentDate, this.quoType)}
      }
      else {
        alert("Selected date is not in Selected Financial period!!!!!!")
        this.currentDate = formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
      }
    }

    onChangeQuotationType(quo_type:string)
    {
      this.quoType = quo_type;
      this.getQuoNo(this.currentDate , quo_type)
      console.log("quo_type:"+quo_type)
       if(quo_type == "Informal")
       {
        this.quotationtypecheck=false;
       /*  this.cashLimit = 0;
        this.party_sl_no = 0;
        this.is_quo_type_Formal = "Informal";
        this.sales_Quotation_Terms_Con.patchValue({cash_limit: this.cashLimit});

        while(this.sales_Quotation_Party_Dtls.length)
        this.sales_Quotation_Party_Dtls.removeAt(0);
        this.addParty(); 
        */
       }
       else
       {
        this.quotationtypecheck=true;
        this.userForm.patchValue({customer:0})
        this.is_quo_type_Formal = "Formal";
       }
       
    }

    _applicableBrokerage = 0;
    totalItem:any;
    totaldiscount:any;
    calNetRValue(app_bkr)
    {
      let _netRValue = 0;
      this.totalItem = this.sales_Quotation_Summary.get("item_total").value as FormControl;
      this.totaldiscount = this.sales_Quotation_Summary.get("discount").value as FormControl;
      this._applicableBrokerage = app_bkr.target.value;
      _netRValue = this.totalItem - this.totaldiscount - app_bkr.target.value;
      this.sales_Quotation_Summary.patchValue({net_r_value: _netRValue.toFixed(2)});
    }

    onChangePackingReqList(packing_req, index)
    {
      if(packing_req.target.value == "Yes")
      this.isPackingListReq[index] = "true";
      else
      { 
        this.isPackingListReq[index] = "false";
        this.sales_Quotation_Item_Dtls.at(index).patchValue({packing_list: "NA"});
      }
    }

    onChangeBrokerName(brokerId:string, index)
    {
      this.sales_Quotation_Broker_Dtls.at(index).patchValue({basis: "0", rate: 0, based_on: ''});
      if(brokerId.length && brokerId != "0")
      {
        this.status = false; 
        this.sales_Quotation_Broker_Dtls.at(index).patchValue({broker_code: brokerId})
       
        this.DropDownListService.getCustomerBrokerDtls(this._customerId, brokerId).subscribe(data=>          
        {
          this.sales_Quotation_Broker_Dtls.at(index).patchValue({
            basis: data.basis, rate: data.rate, based_on: data.based_on});
          this.status = true;   
        });
      }
      
    }

    rate_price_Based_on:any=[];
    _item_uom:any;
    _item_qty:any;
    _packing_qty:any;
    _mrp:any;
    amt:any;
    _taxrate:any;
    _taxAmt:any;
    _totalAmt:any;
    _netAmt:any;
    _priceBasedOn:any;
    _discount:any;
    _discountBasadOn:any;
    discountAmt:any;
    getPackingQty(packingQty, index)
    {
      /* this._packing_qty = packingQty.target.value;
      this._item_qty = this.capacity[index] * packingQty.target.value;
      this._item_uom = this.sales_Quotation_Item_Dtls.at(index).get("uom").value as FormControl;
      this.sales_Quotation_Item_Dtls.at(index).patchValue({quantity: this._item_qty, mat_wt: this._item_qty});

      this._mrp = this.sales_Quotation_Item_Dtls.at(index).get("price").value as FormControl;
      this._priceBasedOn = this.sales_Quotation_Item_Dtls.at(index).get('price_based_on').value as FormControl;
      this._discount = this.sales_Quotation_Item_Dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = this.sales_Quotation_Item_Dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.sales_Quotation_Item_Dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)   

      if(this._weighmentUom == this._item_uom)
      {
        this.sales_Quotation_Item_Dtls.at(index).patchValue({con_factor: 0});
      }
      else 
      {
        if(this._weighmentUom != 0)
        {
          if(this.cal_method == "Multiply")
          this.sales_Quotation_Item_Dtls.at(index).patchValue({con_factor: parseFloat(this.con_factor) * parseFloat(this._item_qty)});
          if(this.cal_method == "Division")
          this.sales_Quotation_Item_Dtls.at(index).patchValue({con_factor: parseFloat(this._item_qty) / parseFloat(this.con_factor)}); 
        }
      } */

      this._packing_qty = packingQty.target.value;

      this._item_uom = this.sales_Quotation_Item_Dtls.at(index).get("uom").value as FormControl;

      //her gunny bags 
      if(this.userForm.get("we_uom").value == null || this.userForm.get("we_uom").value == "0" || this.userForm.get("we_uom").value == "")
      {
      this.status = true;
      alert("Please Select Weighment UOM First !!!!!!!!!!!");
      }
      else
      {
        //this._item_qty = this.capacity[index] * packingQty.target.value;

        let alluom:any = [];
        alluom=JSON.parse(localStorage.getItem("ALLUOM"));

            //vineet Starts
            console.log("Check  :::  "+this.sales_Quotation_Item_Dtls.at(index).get("uom").value)
            if(this.sales_Quotation_Item_Dtls.at(index).get("uom").value=="PCS")
            {
              this._item_qty = Math.round(this.capacity[index] * this._packing_qty);
            }
            else
            {
              alluom.forEach(element => {
                if(element.description == this.sales_Quotation_Item_Dtls.at(index).get("uom").value)
                {
                  this._item_qty =  Number(this.capacity[index] * this._packing_qty).toFixed(Number(element.decimalv));
                }
              });
              
            }
             //this.sales_Order_Item_Dtls.at(index).patchValue({quantity: this._item_qty.toFixed(3), mat_wt: this._item_qty.toFixed(3),tolerance_qty:this._item_qty.toFixed(3)});
              this.sales_Quotation_Item_Dtls.at(index).patchValue({quantity: this._item_qty, mat_wt: this._item_qty, tolerance_qty: this._item_qty}); 
              
              //vineet ends

            

            this._mrp = this.sales_Quotation_Item_Dtls.at(index).get("price").value as FormControl;
            this._priceBasedOn = this.sales_Quotation_Item_Dtls.at(index).get('price_based_on').value as FormControl;
            this._discount = this.sales_Quotation_Item_Dtls.at(index).get('discount_rate').value as FormControl;
            this._discountBasadOn = this.sales_Quotation_Item_Dtls.at(index).get('discount_type').value as FormControl;
            this._taxrate = this.sales_Quotation_Item_Dtls.at(index).get('tax_rate').value as FormControl;
            this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
              this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)   
              let Idd:number = Number(this.userForm.get("id").value);
              if(Idd>0)
              {
                this.calNetAmt();
              }
      //console.log(this._weighmentUom +" // " + this._item_uom)
            if(this._weighmentUom == this._item_uom)
            { this.sales_Quotation_Item_Dtls.at(index).patchValue({con_factor: 0});}
            else 
            {
              if(this._weighmentUom != 0)
              {
                if( this.sales_Quotation_Item_Dtls.at(index).get("con_factor").value ==null || this.sales_Quotation_Item_Dtls.at(index).get("con_factor").value =="")
                {
                  
                }
                else
                {
                  if(this._weighmentUom == this._item_uom)
                  {
                    
                  }
                  else
                  {
                      let con_wt:number=0;
                      con_wt=Number(this._item_qty) * Number(this.sales_Quotation_Item_Dtls.at(index).get("con_factor").value);
                     
                      this.sales_Quotation_Item_Dtls.at(index).patchValue({mat_wt:con_wt.toFixed(3)});

                        this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
                        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index);
                        this.calNetAmt();  
                  }
                }
                //console.log("here check  tuhin "+ this._weighmentUom +" / " + this.con_factor + " / " + this._item_qty + " / " + this.cal_method)
                if(this.cal_method == "Multiply")
                {
                  this.sales_Quotation_Item_Dtls.at(index).patchValue({con_factor: parseFloat(this.con_factor) * parseFloat(this._item_qty)});
                }
                
                
                if(this.cal_method == "Division")
                {
                  this.sales_Quotation_Item_Dtls.at(index).patchValue({con_factor: parseFloat(this._item_qty) / parseFloat(this.con_factor)}); 
                }
              
              }
            }

      }

    }

    getItemQty(itemQty, index)
    {
      /* this._packing_qty = this.sales_Quotation_Item_Dtls.at(index).get("squantity").value as FormControl;
      this._item_qty = itemQty.target.value;
      this._mrp = this.sales_Quotation_Item_Dtls.at(index).get("price").value as FormControl;
      this._priceBasedOn = this.sales_Quotation_Item_Dtls.at(index).get('price_based_on').value as FormControl;
      this._discount = this.sales_Quotation_Item_Dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = this.sales_Quotation_Item_Dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.sales_Quotation_Item_Dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)   */ 

      this._item_qty = itemQty.target.value;

      //getItemQty
      //tolerance work starts
      console.log("check uom code :: "+this.sales_Quotation_Item_Dtls.at(index).get("uom").value)
      let mintolerence:number = Number(this.sales_Quotation_Item_Dtls.at(index).get("tolerance_qty").value) * (100-Number(this.sales_Quotation_Item_Dtls.at(index).get("item_tolerance").value))/100;
      let maxtolerence:number = Number(this.sales_Quotation_Item_Dtls.at(index).get("tolerance_qty").value) * (100+Number(this.sales_Quotation_Item_Dtls.at(index).get("item_tolerance").value))/100 ;
      
      let minstatus:boolean = false;
      let maxstatus:boolean = false;
      minstatus=Number(this._item_qty) >=mintolerence;
      maxstatus= Number(this._item_qty) <= maxtolerence;

      console.log("check Tol :: "+mintolerence+" // "+maxtolerence+" // "+minstatus+" // "+maxstatus)

     if( maxstatus==true && minstatus ==true)
      {
         console.log("check:::"+this._item_qty)
          // this.sales_Order_Item_Dtls.at(index).patchValue({mat_wt: (Math.round((this._item_qty - (this.empty_bag_wt[index] * (itemQty.target.value/this.capacity[index])))*1000)/1000).toFixed(3),squantity:Number(this._item_qty)/Number(this.capacity[index])});
          
          //here need changes for gunny bags
          if( this.sales_Quotation_Item_Dtls.at(index).get("con_factor").value ==null || this.sales_Quotation_Item_Dtls.at(index).get("con_factor").value =="")
          {
            if(this._weighmentUom == this._item_uom)
            {
              this.sales_Quotation_Item_Dtls.at(index).patchValue({mat_wt: Number(this._item_qty).toFixed(3),squantity:Math.round(Number(this._item_qty)/Number(this.capacity[index]))});
            }
          }
          else
          {
            if(this._weighmentUom == this._item_uom)
            {
              
            }
            else
            {
              let con_wt:number=0;
              con_wt=Number(this._item_qty) * Number(this.sales_Quotation_Item_Dtls.at(index).get("con_factor").value);
              
              this.sales_Quotation_Item_Dtls.at(index).patchValue({mat_wt:con_wt.toFixed(3)});
            }
                

                    
          }

         // this.sales_Quotation_Item_Dtls.at(index).patchValue({mat_wt: Number(this._item_qty).toFixed(3),squantity:Number(this._item_qty)/Number(this.capacity[index])});//changes due to weight change
        
          this._packing_qty = this.sales_Quotation_Item_Dtls.at(index).get("squantity").value as FormControl;
 
          this._mrp = this.sales_Quotation_Item_Dtls.at(index).get("price").value as FormControl;
          this._priceBasedOn = this.sales_Quotation_Item_Dtls.at(index).get('price_based_on').value as FormControl;
          this._discount = this.sales_Quotation_Item_Dtls.at(index).get('discount_rate').value as FormControl;
          this._discountBasadOn = this.sales_Quotation_Item_Dtls.at(index).get('discount_type').value as FormControl;
          this._taxrate = this.sales_Quotation_Item_Dtls.at(index).get('tax_rate').value as FormControl;
          this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
          this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)  
          this.calNetAmt();
          let Idd:number = Number(this.userForm.get("id").value);
          if(Idd>0)
          {
            this.calNetAmt();
          }
      }
      else
      {
        alert("Item Quantity Must Be In Range Of "+mintolerence+" To "+maxtolerence )
        // this.sales_Order_Item_Dtls.at(index).patchValue({mat_wt: (Math.round((this._item_qty - (this.empty_bag_wt[index] * (itemQty.target.value/this.capacity[index])))*1000)/1000).toFixed(3),squantity:Number(this._item_qty)/Number(this.capacity[index])});
      
      

        if(this._weighmentUom == this._item_uom)
        {
          this.sales_Quotation_Item_Dtls.at(index).patchValue({mat_wt: Number(this.sales_Quotation_Item_Dtls.at(index).get("tolerance_qty").value).toFixed(3),squantity:Math.round(Number(this.sales_Quotation_Item_Dtls.at(index).get("tolerance_qty").value)/Number(this.capacity[index])),quantity:this.sales_Quotation_Item_Dtls.at(index).get("tolerance_qty").value});
        }
        else
        {
          let con_wt:number=0;
          con_wt=Number(this._item_qty) * Number(this.sales_Quotation_Item_Dtls.at(index).get("con_factor").value);
          
          this.sales_Quotation_Item_Dtls.at(index).patchValue({mat_wt:con_wt.toFixed(3)});
        }


        this._packing_qty = this.sales_Quotation_Item_Dtls.at(index).get("squantity").value as FormControl;

        this._mrp = this.sales_Quotation_Item_Dtls.at(index).get("price").value as FormControl;
        this._priceBasedOn = this.sales_Quotation_Item_Dtls.at(index).get('price_based_on').value as FormControl;
        this._discount = this.sales_Quotation_Item_Dtls.at(index).get('discount_rate').value as FormControl;
        this._discountBasadOn = this.sales_Quotation_Item_Dtls.at(index).get('discount_type').value as FormControl;
        this._taxrate = this.sales_Quotation_Item_Dtls.at(index).get('tax_rate').value as FormControl;
        this.calculateItemData(this._packing_qty, this.sales_Quotation_Item_Dtls.at(index).get("tolerance_qty").value, this._mrp, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)   
        this.calNetAmt();
      }

       //tolerance work ends

     

        
    }

    getPrice(price, index)
    {
      /* this._packing_qty = this.sales_Quotation_Item_Dtls.at(index).get("squantity").value as FormControl;
      this._item_qty= this.sales_Quotation_Item_Dtls.at(index).get("quantity").value as FormControl;
      this._mrp  = price.target.value;
      this._priceBasedOn = this.sales_Quotation_Item_Dtls.at(index).get('price_based_on').value as FormControl;
      this._discount = this.sales_Quotation_Item_Dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = this.sales_Quotation_Item_Dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.sales_Quotation_Item_Dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)  */ 

        this._packing_qty = this.sales_Quotation_Item_Dtls.at(index).get("squantity").value as FormControl;
      this._item_qty= this.sales_Quotation_Item_Dtls.at(index).get("quantity").value as FormControl;
      this._mrp  = price.target.value;
      this._priceBasedOn = this.sales_Quotation_Item_Dtls.at(index).get('price_based_on').value as FormControl;
      this._discount = this.sales_Quotation_Item_Dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = this.sales_Quotation_Item_Dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.sales_Quotation_Item_Dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
        
        this.calNetAmt();
    }

    onChangePriceBasedOn(price_based_on, index)
    {
      /* this._packing_qty = this.sales_Quotation_Item_Dtls.at(index).get("squantity").value as FormControl;
      this._item_qty= this.sales_Quotation_Item_Dtls.at(index).get("quantity").value as FormControl;
      this._mrp  = this.sales_Quotation_Item_Dtls.at(index).get('price').value as FormControl;
      this._priceBasedOn = price_based_on.target.value;
      this._discount = this.sales_Quotation_Item_Dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = this.sales_Quotation_Item_Dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.sales_Quotation_Item_Dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)  */

        this._packing_qty = this.sales_Quotation_Item_Dtls.at(index).get("squantity").value as FormControl;
      this._item_qty= this.sales_Quotation_Item_Dtls.at(index).get("quantity").value as FormControl;
      this._mrp  = this.sales_Quotation_Item_Dtls.at(index).get('price').value as FormControl;
      this._priceBasedOn = price_based_on.target.value;
      this._discount = this.sales_Quotation_Item_Dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = this.sales_Quotation_Item_Dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.sales_Quotation_Item_Dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index) 

        this.calNetAmt();
    }

    getDiscount(discount, index)
    {
      this._packing_qty = this.sales_Quotation_Item_Dtls.at(index).get("squantity").value as FormControl;
      this._item_qty= this.sales_Quotation_Item_Dtls.at(index).get("quantity").value as FormControl;
      this._mrp  = this.sales_Quotation_Item_Dtls.at(index).get('price').value as FormControl;
      this._priceBasedOn = this.sales_Quotation_Item_Dtls.at(index).get('price_based_on').value as FormControl;
      this._discount = discount.target.value;
      this._discountBasadOn = this.sales_Quotation_Item_Dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.sales_Quotation_Item_Dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index) 
    }

    onChangeDiscountBasedOn(dis_based_on, index)
    {
      /* this._packing_qty = this.sales_Quotation_Item_Dtls.at(index).get("squantity").value as FormControl;
      this._item_qty= this.sales_Quotation_Item_Dtls.at(index).get("quantity").value as FormControl;
      this._mrp  = this.sales_Quotation_Item_Dtls.at(index).get('price').value as FormControl;
      this._priceBasedOn = this.sales_Quotation_Item_Dtls.at(index).get('price_based_on').value as FormControl;
      this._discount = this.sales_Quotation_Item_Dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = dis_based_on.target.value;
      this._taxrate = this.sales_Quotation_Item_Dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)  */

        this._packing_qty = this.sales_Quotation_Item_Dtls.at(index).get("squantity").value as FormControl;
      this._item_qty= this.sales_Quotation_Item_Dtls.at(index).get("quantity").value as FormControl;
      this._mrp  = this.sales_Quotation_Item_Dtls.at(index).get('price').value as FormControl;
      this._priceBasedOn = this.sales_Quotation_Item_Dtls.at(index).get('price_based_on').value as FormControl;
      this._discount = this.sales_Quotation_Item_Dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = dis_based_on.target.value;
      this._taxrate = this.sales_Quotation_Item_Dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index) 
        this. calNetAmt();
    }

    packingItem:any=[];
    capacity:any=[];
    onChangeItemName(index, itemId)
    {
      if(itemId.length)
      {
        this.status = false;
        this.selectedPackingItem[index] = [];
        this.sales_Quotation_Item_Dtls.at(index).patchValue({item_code: itemId});
        forkJoin(
          this.DropDownListService.getItemNameById(itemId,this.company_name),
          this.DropDownListService.getItemMasterPackMat(itemId),
          this.DropDownListService.getItemMasterInvData1(itemId,this.company_name),
          this.DropDownListService.retriveItemMasterStatInfo(itemId,this.company_name),
          this.DropDownListService.getItemQCDetails(itemId,this.company_name)
        ).subscribe(([data, data1, data2, data3, data4])=>
        {
          this.sales_Quotation_Item_Dtls.at(index).patchValue({hsn_code:data.hsn_code}); 

          //this.DropDownListService.getUomName(data.mstock_unit).subscribe(uomName=>
          forkJoin(  
            this.DropDownListService.getUomName(data.mstock_unit),
            this.DropDownListService.taxlistbycode(data3[0].tax_code)
            ).subscribe(([uomName,taxcode])=>
          { 
            this.sales_Quotation_Item_Dtls.at(index).patchValue({
              cgst_amt: taxcode["cgst_act_val"],sgst_amt: taxcode["sgst_act_val"],igst_amt: taxcode["igst_act_val"]});

            this.sales_Quotation_Item_Dtls.at(index).patchValue({uom: uomName.description}); 
            if(this._weighmentUom == uomName.description)
            {
              this.sales_Quotation_Item_Dtls.at(index).patchValue({con_factor: 0});
            }
            else
            {
              if(this._weighmentUom != 0)
              {
                this._item_qty = this.sales_Quotation_Item_Dtls.at(index).get("quantity").value as FormControl;
                if(this.cal_method == "Multiply")
                this.sales_Quotation_Item_Dtls.at(index).patchValue({con_factor: parseFloat(this.con_factor) * parseFloat(this._item_qty)});
                if(this.cal_method == "Division")
                this.sales_Quotation_Item_Dtls.at(index).patchValue({con_factor: parseFloat(this._item_qty) / parseFloat(this.con_factor)}); 
              }
            }
          });

          this.packingItem[index] = data1;
          this.sales_Quotation_Item_Dtls.at(index).patchValue({price: data2["mrp"]});
          this.sales_Quotation_Item_Dtls.at(index).patchValue({tax_code:data3[0].tax_code, tax_rate:data3[0].tax_rate});
          this.sales_Quotation_Item_Dtls.at(index).patchValue({acc_norms:data4[0].qc_code});
          this._packing_qty = this.sales_Quotation_Item_Dtls.at(index).get("squantity").value as FormControl;
          this._item_qty= this.sales_Quotation_Item_Dtls.at(index).get("quantity").value as FormControl;
          this._mrp  = data2["mrp"];
          this._priceBasedOn = this.sales_Quotation_Item_Dtls.at(index).get('price_based_on').value as FormControl;
          this._discount = this.sales_Quotation_Item_Dtls.at(index).get('discount_rate').value as FormControl;
          this._discountBasadOn = this.sales_Quotation_Item_Dtls.at(index).get('discount_type').value as FormControl;
          this._taxrate = data3[0].tax_rate;
          this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
          this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)  
          this.status = true;
        }); 
      }
    }

    _item_code: any;
    empty_bag_wt:any = [];
    onChangePackingItem(index, packingId)
    {
      if(packingId.length)
      {
        this.status = false;
        this.selectedPackingItem[index] = packingId;
        this.sales_Quotation_Item_Dtls.at(index).patchValue({packing: packingId})
        this._item_code =  this.sales_Quotation_Item_Dtls.at(index).get("item_code").value as FormControl;
        this._packing_qty =  this.sales_Quotation_Item_Dtls.at(index).get("squantity").value as FormControl;
        this._mrp  = this.sales_Quotation_Item_Dtls.at(index).get('price').value as FormControl;
        this._priceBasedOn = this.sales_Quotation_Item_Dtls.at(index).get('price_based_on').value as FormControl;
        this._discount = this.sales_Quotation_Item_Dtls.at(index).get('discount_rate').value as FormControl;
        this._discountBasadOn = this.sales_Quotation_Item_Dtls.at(index).get('discount_type').value as FormControl;
        this._taxrate = this.sales_Quotation_Item_Dtls.at(index).get('tax_rate').value as FormControl;

        forkJoin(
        //this.DropDownListService.getItemPackUom(this._item_code, packingId,this.company_name)
        this.DropDownListService.getItemPackUom(this._item_code, packingId,this.company_name),
        this.DropDownListService.getItemNameByIdNew(packingId,this.company_name)
        )
        .subscribe(([data,packingdata])=>
        {  
          this.capacity[index] = data.capacity; 
          this.empty_bag_wt[index] = data.empty_big_wt;
          this._item_qty = this.capacity[index] * this._packing_qty;

          console.log("UOM : : "+JSON.stringify(packingdata))

          //this.sales_Quotation_Item_Dtls.at(index).patchValue({suom: data.uom1, quantity: this._item_qty}); 
          this.sales_Quotation_Item_Dtls.at(index).patchValue({suom: packingdata.mstock_unit_name, quantity: this._item_qty,item_tolerance:data["tolerance"]}); 
          this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
          this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index) 
          this.status = true; 
        });
      }
    }

    calculateItemData(packingQty, ItemQty, price, PriceBasedOn, discount, discountBasedOn, taxrate, index)
    {
      if(PriceBasedOn == "Packing")
      {this.amt = price * packingQty}

      if(PriceBasedOn == "Item")
      {this.amt = price * ItemQty}

      if(PriceBasedOn == "0")
      {this.amt = 0}

      if(discountBasedOn == "Uom")
      {this.discountAmt = discount*Number(this.sales_Quotation_Item_Dtls.at(index).get("mat_wt").value)}

      if(discountBasedOn == "%")
      {this.discountAmt =  this.amt * (discount / 100);}

      if(discountBasedOn == "0")
      {this.discountAmt = 0}

      /* let netAmt = this.amt - this.discountAmt;
      if(taxrate == 0)
      {this._taxAmt = 0;}  
      else
      {this._taxAmt = netAmt *(taxrate/100);}
      this._totalAmt = this._taxAmt + netAmt;
      this.sales_Quotation_Item_Dtls.at(index).patchValue({amount: (Math.round(this.amt * 100) / 100).toFixed(2), discount_amt: (Math.round(this.discountAmt * 100) / 100).toFixed(2),
        tax_amt: (Math.round(this._taxAmt * 100) / 100).toFixed(2), total_amt: (Math.round(this._totalAmt * 100) / 100).toFixed(2)}); */

        let netAmt = this.amt - this.discountAmt;
        //console.log("taxrate :: "+taxrate)
        if(taxrate == 0  || this.sales_Quotation_Item_Dtls.at(index).get("cgst_amt").value==null)
        {
          this._taxAmt = 0;
        }  
        else
        {
  
          let cgst_amt = this.sales_Quotation_Item_Dtls.at(index).get("cgst_amt").value;
          let sgst_amt = this.sales_Quotation_Item_Dtls.at(index).get("sgst_amt").value;
          let igst_amt = this.sales_Quotation_Item_Dtls.at(index).get("igst_amt").value;
  
          //console.log("Enter :: "+ this.sales_Quotation_Item_Dtls.at(index).get("cgst_amt").value)

          if( cgst_amt == 0 && sgst_amt == 0 && igst_amt == 0)
          {
            //console.log("1")
            this._taxAmt = 0;
          }
          else if(cgst_amt == 0)
          {
            //console.log("2")
            //this._taxAmt = Number(netAmt *(taxrate/100)).toFixed(2);
            this._taxAmt =Number(this.round(Number(netAmt *(taxrate/100))))
          }
          else
          {
            //console.log("3")
          
            //let csgt_final=Number(netAmt *(cgst_amt/100)).toFixed(2);
            let csgt_final=Number(this.round(Number(netAmt *(cgst_amt/100)),2));
           
            //let sgst_final=Number(netAmt *(sgst_amt/100)).toFixed(2);
            let sgst_final=Number(this.round(Number(netAmt *(sgst_amt/100)),2));

            this._taxAmt = Number(csgt_final)+ Number(sgst_final);
            console.log(this._taxAmt + "  // " + Number(csgt_final)+" / "+ Number(sgst_final));
          }
        }
        this._totalAmt = Number(this._taxAmt + netAmt).toFixed(2);
        this.sales_Quotation_Item_Dtls.at(index).patchValue({amount: this.amt.toFixed(2), 
          discount_amt: this.discountAmt.toFixed(2), tax_amt: this._taxAmt, 
          total_amt: this._totalAmt});
    }

    onChangeMatTab(event)
    {
      if(event.index == 3)
      {
        this. calNetAmt();
      }
    }

    calNetAmt()
    {
      /* let totalDisAmt:number = 0;
      let totalTaxAmt:number = 0;
      let _totalAmt:number = 0;
      let _netAmt:number = 0;
      let _netRValue:number = 0;
      for(let index=0; index<this.sales_Quotation_Item_Dtls.length; index++)
      {
        this.discountAmt = this.sales_Quotation_Item_Dtls.at(index).get('discount_amt').value as FormControl;
        totalDisAmt = parseFloat(this.discountAmt) + totalDisAmt;
        this.amt = this.sales_Quotation_Item_Dtls.at(index).get('amount').value as FormControl;
        _totalAmt = _totalAmt + parseFloat(this.amt);
        this._taxAmt = this.sales_Quotation_Item_Dtls.at(index).get('tax_amt').value as FormControl;
        totalTaxAmt = totalTaxAmt + parseFloat(this._taxAmt); 

        // _netAmt =  (_netAmt + _totalAmt +  totalTaxAmt) - totalDisAmt;
        // alert(_netAmt);
      }

      _netRValue = _totalAmt - totalDisAmt - this._applicableBrokerage;
      _netAmt = _netRValue +  this._applicableBrokerage + totalTaxAmt;
      this.sales_Quotation_Summary.patchValue({item_total: (Math.round(_totalAmt * 100) / 100).toFixed(2), discount: (Math.round(totalDisAmt * 100) / 100).toFixed(2),
       tax_total: (Math.round(totalTaxAmt * 100) / 100).toFixed(2), net_amount: (Math.round(_netAmt * 100) / 100).toFixed(2)});
      this.sales_Quotation_Summary.patchValue({net_r_value: (Math.round(_netRValue * 100) / 100).toFixed(2)}); */

      let totalDisAmt:number = 0;
      let totalTaxAmt:number = 0;
      let _totalAmt:number = 0;
      let _netAmt:number = 0;
      let _netRValue:number = 0;
      for(let index=0; index<this.sales_Quotation_Item_Dtls.length; index++)
      {
        this.discountAmt = this.sales_Quotation_Item_Dtls.at(index).get('discount_amt').value as FormControl;
        totalDisAmt = parseFloat(this.discountAmt) + totalDisAmt;
        this.amt = this.sales_Quotation_Item_Dtls.at(index).get('amount').value as FormControl;
        _totalAmt = _totalAmt + parseFloat(this.amt);
        this._taxAmt = this.sales_Quotation_Item_Dtls.at(index).get('tax_amt').value as FormControl;
        totalTaxAmt = totalTaxAmt + parseFloat(this._taxAmt) 
      }
      _netRValue = _totalAmt - totalDisAmt - this._applicableBrokerage;
      _netAmt = _netRValue +  this._applicableBrokerage + totalTaxAmt;

      this.sales_Quotation_Summary.patchValue({item_total: _totalAmt.toFixed(2), discount:totalDisAmt.toFixed(2), 
       // tax_total: totalTaxAmt.toFixed(2), net_amount: _netAmt.toFixed(2),
      // tax_total: totalTaxAmt, net_amount: _netAmt.toFixed(2),
   
      tax_total:  Number(this.round(totalTaxAmt,2)), net_amount: _netAmt.toFixed(2),
        net_r_value: _netRValue.toFixed(2)});
    }

   
    addItems()
    {
      this.isPackingListReq[this.item_sl_no] = "false";
      this.item_sl_no = this.item_sl_no + 1;

      this.sales_Quotation_Item_Dtls.push(this.fb.group({
        slno: this.item_sl_no,
        item_code:'',
        packing:'',
        quantity:'',
        uom:'',
        squantity:'',
        suom:'',
        con_factor:'',
        mat_wt: '',
        hsn_code:'',
        price: '',
        price_based_on: '',
        amount: '',
        item_tolerance:'0',
        tolerance_qty:'0',
        discount_type:'',
        discount_rate:'',
        tolerance:'',
        tax_code:'',
        tax_rate:'',
        acc_norms:'',
        packing_list_req:'',
        packing_list:'',
        discount_amt:'',
        tax_amt:'',
        total_amt:'',
        cgst_amt:'',
        sgst_amt:'',
        igst_amt:''}))
        
       this.sales_Quotation_Item_Dtls.at(this.item_sl_no - 1).patchValue({uom: '', quantity: 0, squantity: 0, price: 0, tax_rate: 0,
         price_based_on: "0", discount_rate: 0, discount_type: "0"});
    }

    deleteItem(index) 
    {
      if(this.item_sl_no > 1)
      { 
        console.log("packing item: "+JSON.stringify(this.packingItem)+" selected: "+JSON.stringify(this.selectedPackingItem))
        this.sales_Quotation_Item_Dtls.removeAt(index);
        if(this.packingItem[index] != undefined)
        { 
          this.packingItem.splice(index, 1);
          this.selectedPackingItem.splice(index, 1);
          this.capacity.splice(index, 1);
          console.log("packing item: "+JSON.stringify(this.packingItem)+" selected: "+JSON.stringify(this.selectedPackingItem));
        }
        this.item_sl_no = this.item_sl_no - 1;
        this.isPackingListReq[index - 1] = "false";  
      }
      else
      {
        this.item_sl_no = 1;
        alert("can't delete all rows");
        this.selectedItemName[index] = "0";
        this.selectedPackingItem[index] = "0";
        this.sales_Quotation_Item_Dtls.reset();

        this.sales_Quotation_Item_Dtls.at(0).patchValue({slno:  this.item_sl_no});
        this.isPackingListReq[0] = "false"; 
        this.sales_Quotation_Item_Dtls.at(0).patchValue({item_code: "0", packing: "0", uom: '', quantity: 0, squantity: 0, price: 0, tax_rate: 0,
         price_based_on: "0", discount_rate: 0, discount_type: "0"});    
      } 
      
      for(let i=1; i<=this.item_sl_no; i++)
        this.sales_Quotation_Item_Dtls.at(i-1).patchValue({slno: i});
      
    }

    addBrokers()
    {
      this.broker_sl_no = this.broker_sl_no+1;
      this.sales_Quotation_Broker_Dtls.push(this.fb.group({
        slno:this.broker_sl_no,	
        broker_code:'',
        broker_name:'',
        basis:'',
        rate:'',
        based_on:''
       }))
    }

    deleteBrokers(index) 
    {
      if(this.broker_sl_no > 1)
      { 
        this.sales_Quotation_Broker_Dtls.removeAt(index);
        this.broker_sl_no = this.broker_sl_no - 1;
      }
      else
      {
        this.broker_sl_no = 1;
        alert("can't delete all rows");
        this.sales_Quotation_Broker_Dtls.reset();
        this.sales_Quotation_Broker_Dtls.at(0).patchValue({slno: this.broker_sl_no});
      } 
      
      for(let i=1; i<=this.broker_sl_no; i++)
      this.sales_Quotation_Broker_Dtls.at(i-1).patchValue({slno: i});     
    }

    addParty()
    {
      this.party_sl_no=this.party_sl_no+1;
      this.sales_Quotation_Party_Dtls.push(this.fb.group({
        sl_no : this.party_sl_no,  
        p_code:'',
        cp_name:'',
        cp_contact:'',
        send_via:'',
        tcs_applicable:'',
        tcs_rate:''
      }))
    this.sales_Quotation_Party_Dtls.at(this.party_sl_no - 1).patchValue({p_code: "0"});
    this.selectedPartyName[this.party_sl_no - 1] = "0";
    }

    deleteParty(index) 
    {
      if(this.party_sl_no > 1)
      { 
        this.sales_Quotation_Party_Dtls.removeAt(index);
        this.party_sl_no = this.party_sl_no - 1;
      }
      else
      {
        this.party_sl_no = 1;
        alert("can't delete all rows");
        this.sales_Quotation_Party_Dtls.reset();
        this.sales_Quotation_Party_Dtls.at(0).patchValue({sl_no:  this.party_sl_no});
      } 
      
      for(let i=1; i<=this.party_sl_no; i++)
        this.sales_Quotation_Party_Dtls.at(i-1).patchValue({sl_no: i});
      
    }

    add3()
    {
      this.sales_Quotation_Summary_dyn.push(this.fb.group({
        charge_name:'',
        rate_cal_method:'',
        amount:'',
        tax_rate: '' }));
    }

    addDocument()
    {
      this.sales_Quotation_Docs.push(this.fb.group({
        doc_name:'' }))
    }

    deleteDocument(index)
    {
      if(index)
      { this.sales_Quotation_Docs.removeAt(index);}
      else
      {
        alert("Can not delete all rows");
        this.sales_Quotation_Docs.reset();
      } 
    }

    onChangeApplicableCharges(applicable_charges_id:string)
    {
      if(applicable_charges_id.length && applicable_charges_id != "0")
      {
        this.status = false;
        this.DropDownListService.getChargeMasterDtlsList(applicable_charges_id).subscribe(data=>
        {
          this.status = true;
          let i =0;
          this.add3();
          while(this.sales_Quotation_Summary_dyn.length)
          this.sales_Quotation_Summary_dyn.removeAt(0);
          for(let data1 of data)
          {
            this.add3();
            this.sales_Quotation_Summary_dyn.at(i).patchValue({charge_name: data1.charge_name, 
              rate_cal_method: data1.method, tax_rate: data1.tax_rate});
            i=i+1;
          }
        });
      }
    }

    onChangePartyName(cp_id:string, index)
    {
      this.contNameList[index] = [];
      this.sales_Quotation_Party_Dtls.at(index).patchValue({tcs_rate: null,tcs_applicable: null, cp_contact: null});        
      if(cp_id.length && cp_id != "0")
      {
        this.status = false; 
        this.sales_Quotation_Party_Dtls.at(index).patchValue({p_code: cp_id})
        this.DropDownListService.custAddDtlsRetriveList(cp_id,this.company_name).subscribe(contactName=>
        { 
          this.DropDownListService.custAccountRetriveList(cp_id,this.company_name).subscribe(data=>
          { 
            this.status = true;  
            this.sales_Quotation_Party_Dtls.at(index).patchValue({tcs_rate: data["tcs_rate"],tcs_applicable: data["tcs_applicable"]});        
            this.contNameList[index] = contactName;  
          });  
        });
      }
    }

    partnerId:any;
    selectedContName:any = [];
    onChangeContactName(index, name:string)
    {
      this.sales_Quotation_Party_Dtls.at(index).patchValue({cp_contact: null}); 
      if(name.length)
      {
        this.status = false;
        this.partnerId = this.sales_Quotation_Party_Dtls.at(index).get("p_code").value as FormControl;
        this.DropDownListService.custContactByName(this.partnerId, name,this.company_name).subscribe(data=>
        {
          this.sales_Quotation_Party_Dtls.at(index).patchValue({cp_name: name, cp_contact: data.mobile});  
          this.status = true; 
        });
      }
    }

    onChangeCustomerChannel(channel_id:string)
    {
      if(channel_id.length && channel_id != "0")
      {
        this.selectedContName = [];
        this.selectedPartyName = [];
        let i =0 ;
        this.contNameList=[];
      
        this.addParty();
        this.party_sl_no = 0;
        while(this.sales_Quotation_Party_Dtls.length)
        this.sales_Quotation_Party_Dtls.removeAt(0);

        this.DropDownListService.getCustomerByChannel(channel_id).subscribe(data=>
        {
          this.partyList = data;
          for(let data1 of data)
          {
            this.status = false;
            forkJoin(
              this.DropDownListService.custAddDtlsRetriveList(data1["cp_Id"],this.company_name),
              this.DropDownListService.custAccountRetriveList(data1["cp_Id"],this.company_name)
            ).subscribe(([contactName, custAccountData])=>
              {
                this.addParty();
                this.contNameList[i]  = contactName; 
                this.selectedPartyName[i] = data1["cp_Id"]
                this.sales_Quotation_Party_Dtls.at(i).patchValue({p_code: data1["cp_Id"], tcs_rate: custAccountData["tcs_rate"], tcs_applicable: custAccountData["tcs_applicable"]});
                i = i + 1;
                this.status = true; 
              });
          }
        });       
      }
    }

    onChangePartyStatic(cpId)
    {
      this.sales_Quotation_Shipment_Dtls.patchValue({ship_addr: "0", ship_details: ''});
      if(cpId.length && cpId != "0")
      {
        this.status = false;
        this._customerId = cpId;
        forkJoin(
          this.DropDownListService.custBrokerRetriveList(cpId),
          this.DropDownListService.getTransporterThruCustomer(cpId),
          this.DropDownListService.custAccountRetriveList(cpId,this.company_name),
          this.DropDownListService.getCustDelvFromList(cpId)
        ).subscribe(([brokerData, transporterList, custAccData, custDelvData])=> 
          {
            console.log("broker data:"+JSON.stringify(brokerData))
            this.brokerNames = brokerData;
            this.sales_Quotation_Broker_Dtls.at(0).patchValue({broker_code:brokerData[0]["ven_code_name"]})
      this.selectedBrokerName[0]=brokerData[0]["ven_code_name"];
            this.trans_codes = transporterList;
            console.log("onChangePartyStatic: "+JSON.stringify(custAccData))
            this.onChangePaymentMode(custAccData["mode_of_pay"]);
            this.sales_Quotation_Terms_Con.patchValue({payment_mode: custAccData["mode_of_pay"],
              bank_name: custAccData["bankname"], account_no: custAccData["acc_no"], account_name: custAccData["accountholder"],
              branch: custAccData["branch"], iban: custAccData["iban"], bic_swift_code: custAccData["bic_swift_code"],
              ifsc_code: custAccData["ifsc"], cash_limit: custAccData["cash_limit"], payment_term: custAccData["pay_term"]})
            this.customerDelvAddList = custDelvData;
            this.status = true;
          });
      }
    }

    onChangeshipment(shipment_mode:string)
    {
      this.sales_Quotation_Trans_Info.get('mode_of_trans').reset();
      this.sales_Quotation_Trans_Info.patchValue({mode_of_trans: shipment_mode}); 
    }

    onChangeRefType(event:string)
    {
      this._ref_type = event 
      if (this._ref_type =="Open Quotation")
      {
        this.addParty();
        this.party_sl_no = 0;
        while(this.sales_Quotation_Party_Dtls.length)
        this.sales_Quotation_Party_Dtls.removeAt(0);
        this.addParty();

        this.addItems();
        this.item_sl_no = 0;
        while(this.sales_Quotation_Item_Dtls.length)
        this.sales_Quotation_Item_Dtls.removeAt(0);
        this.addItems();
       }
    }

    is_trans_Info = "";
    onChangeTransBornBy(event: string)
    {
      let gotval=event
      if(gotval=="FOB")
      {
        this.is_trans_Info = "FOB";
      }
      if(gotval=="FOR")
      {
        this.sales_Quotation_Trans_Info.patchValue({mode_of_trans: "NA", trans_code: "NA", charge_code:"NA", transporters: "NA"});
        this.is_trans_Info = "FOR";
      }
    }

    onChangePaymentMode(event: string)
    { 
     
      this.sales_Quotation_Terms_Con.patchValue({cash_limit: this.cashLimit});
      let gotbank=event
      if(gotbank=="RTGS" || gotbank == "NEFT")
      {
        this.isBankNameDisabled = true;
        this.isChecked =true;     
        console.log("hello tuhin  here if")
      }
      else
      {
        this.isBankNameDisabled = false;
        console.log("hello tuhin  here else")
        this.isChecked =false;
        this.sales_Quotation_Terms_Con.patchValue({bank_name: null,account_no: null,ifsc_code: null,account_name: null,branch: null,iban: null,bic_swift_code: null});
       
       
      }
      if(gotbank=='Cash')
      {
      this.isChecked1 =true;  
      }
      else{
      this.isChecked1 =false;  
      }            
    }

    taxAmt:any;
    showPopUp(index)
    {
      this._discount = this.sales_Quotation_Item_Dtls.at(index).get('discount_rate').value as FormControl;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
      index: index,};

      const dialogRef = this.dialog.open(SalesQuoTaxModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => 
      {
        this.sales_Quotation_Item_Dtls.at(index).patchValue({tax_code: data["tax_id"], tax_rate: data["tax_rate"]});
        this._packing_qty = this.sales_Quotation_Item_Dtls.at(index).get("squantity").value as FormControl;
        this._item_qty= this.sales_Quotation_Item_Dtls.at(index).get("quantity").value as FormControl;
        this._mrp  = this.sales_Quotation_Item_Dtls.at(index).get("price").value as FormControl;
        this._priceBasedOn = this.sales_Quotation_Item_Dtls.at(index).get('price_based_on').value as FormControl;
        this._discount = this.sales_Quotation_Item_Dtls.at(index).get('discount_rate').value as FormControl;
        this._discountBasadOn = this.sales_Quotation_Item_Dtls.at(index).get('discount_type').value as FormControl;
        this._taxrate = data["tax_rate"];
        this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
          this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)   
      }); 
    }

    itemCode:any;
    showPopUp2(index)
    {
      this.itemCode = this.sales_Quotation_Item_Dtls.at(index).get('item_code').value as FormControl;    
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index, item_code: this.itemCode};
      const dialogRef = this.dialog.open(QcNormsPopUpComponent, dialogConfig);
      dialogRef.afterClosed().subscribe( data => 
      {
        this.sales_Quotation_Item_Dtls.at(index).patchValue({acc_norms: data["qc_code"]});
      }); 
    }

    openDialog1(event) 
    {          
      let dialogref=this.dialog.open(ChargeCodePopUpComponent);
      dialogref.afterClosed().subscribe(data => 
      {this.sales_Quotation_Trans_Info.patchValue({charge_code: data.charge_id}) });      
    }

    custGroup:any;
    openDialog()
    {
      const dialogRef = this.dialog.open(SalesEnqCusPopUpComponent);
      dialogRef.afterClosed().subscribe(data=> 
      {  
        if(data != '' && data["cp_Id"] != "0")
        {
          this.contNameList = [];
          this.selectedPartyName = [];
          this.selectedContName = [];
          this.cashLimit = 0;
          this.addParty();
          this.party_sl_no = 0;
          while(this.sales_Quotation_Party_Dtls.length)
          this.sales_Quotation_Party_Dtls.removeAt(0);
        
          this.userForm.patchValue({customer: data["cp_Id"]});
          this.status = false;
          this._customerId = data["cp_Id"];
          this.is_trans_Info = "FOB";
          forkJoin(
            this.DropDownListService.partynameListById(data["cp_Id"]),
            this.DropDownListService.getTransporterThruCustomer(data["cp_Id"]),
            this.DropDownListService.getCustDelvFromList(data["cp_Id"]),
            this.DropDownListService.custAddDtlsRetriveList(data["cp_Id"],this.company_name),
            this.DropDownListService.custAccountRetriveList(data["cp_Id"],this.company_name)
          ).subscribe(([custDtls,transporterList, custDelvData, contactName, custAccData])=>
            {
              this.status = true;
              this.addParty();
              this.trans_codes = transporterList;
              console.log("customerDelvAddList: "+ JSON.stringify(custDelvData)+" cpId: "+data["cpId"]);
              console.log("custDtls: "+ JSON.stringify(custDtls));
              this.customerDelvAddList = custDelvData;
              this.contNameList[0] = contactName;
              this.selectedPartyName[0] = data["cp_Id"];
          
              this.sales_Quotation_Party_Dtls.at(0).patchValue({p_code: data["cp_Id"], tcs_rate: custAccData["tcs_rate"], tcs_applicable: custAccData["tcs_applicable"]});    

              this.cashLimit = custAccData["cash_limit"];
              this.custGroup=custDtls["group_type"];
              if(this.custGroup=="CG00019"){
                this.Quotationcheckpoint="Yes";
                this.userForm.patchValue({quotationcheckpoint: "Yes"});
              }
              else{
                this.Quotationcheckpoint="No";
                this.userForm.patchValue({quotationcheckpoint: "No"});
              }
              this.onChangePartyStatic(data["cp_Id"]);
            });
        }

      });
    }

    show_Row = false;
    QuotationId = "0";
    onClickShow()
    {
      this._ref_type = this.userForm.get("ref_type").value as FormControl;
      if(this._ref_type == "Sales Enquiry")
      {
        const dialogRef = this.dialog.open(SalesEnquiryPopUpModalComponent, {data:{sales_date: this.currentDate}});
        dialogRef.afterClosed().subscribe(data => 
        {
          if(data != '' && data["enquiry_id"] != "0")
          {
            

            this.status = false;
            forkJoin(
              this.DropDownListService.salesEnqPersonList(data["enquiry_id"]),
              this.DropDownListService.salesEnquiryByEnqId(data["enquiry_id"]),
              this.DropDownListService.getSalesEnqPartyDtls(data["enquiry_id"])
             // this.DropDownListService.customerNameCodeList(this.company_name)
            //).subscribe(([salesEnqPersonData, salesEnqData, partyData,partyList])=>
            ).subscribe(([salesEnqPersonData, salesEnqData, partyData])=>
              {    
                this.userForm.patchValue({sales_person: salesEnqPersonData["sales_person"]}); 
                this.userForm.patchValue({business_unit: salesEnqData["businessunit"]});
         
               // this.partyNameList = partyList;
                if(salesEnqData["enq_type"] == 'Formal') 
                {
                  let i = 0;
                  this.selectedContName = [];
                  this.selectedPartyName = [];
                  this.contNameList = [];
                  this.addParty();
                  this.party_sl_no = 0;
                  while(this.sales_Quotation_Party_Dtls.length)
                  this.sales_Quotation_Party_Dtls.removeAt(0);
                  this.userForm.patchValue({customer: partyData[0].p_code});
                  this.onChangePartyStatic(partyData[0].p_code);
                  //console.log(" party list details222 :: " + JSON.stringify(partyData))
                  for(let data1 of partyData) 
                  {
                    this.status = false;
                    this.DropDownListService.custAddDtlsRetriveList(data1.p_code,this.company_name).subscribe(contactName=>
                    {
                      this.addParty(); 
                      this.contNameList[i] = contactName;
                      this.selectedPartyName[i] = data1.p_code;
                      this.selectedContName[i] = data1.cp_name;
                      //console.log(" party list details :: " + JSON.stringify(data1[i]))
                      this.sales_Quotation_Party_Dtls.at(i).patchValue(data1); 
                      i = i + 1;
                      this.status = true;
                    });
                  }
                }


//starts here 

                          let j=0;
                          this.packingItem = [];
                          this.selectedItemName = [];
                          this.selectedPackingItem = [];
                          this.userForm.patchValue({referance_id: data["enquiry_id"]});
                          this.addItems();
                          while(this.sales_Quotation_Item_Dtls.length)
                          {
                            this.sales_Quotation_Item_Dtls.removeAt(0); 
                            this.item_sl_no = 0;
                          }

                          for(let data1 of data.sales_Enquiry_Item_Dtls)
                          {
                            if(data1.checkbox == true)
                            {
                              this.status = false;
                              forkJoin(
                              this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                              this.DropDownListService.getItemThruSalesThruBU(salesEnqData["businessunit"],this.company_name)
                                
                              ).subscribe(([packingList,itemdata])=>
                              {   
                                this.item_codes = itemdata;
                                this.addItems();
                                this.packingItem[j] = packingList; 
                                this.selectedItemName[j] = data1.item_code;
                                this.selectedPackingItem[j] = data1.packing_item;
                                this.status = true;
                                this.show_Row = true;
                                
                                if(this._weighmentUom == data1["uom"])
                                {
                                  this.sales_Quotation_Item_Dtls.at(j).patchValue({con_factor: 0});
                                }
                                else 
                                { 
                                  if(this._weighmentUom != 0)
                                  {
                                    if(this.cal_method == "Multiply")
                                    this.sales_Quotation_Item_Dtls.at(j).patchValue({con_factor: parseFloat(this.con_factor) * parseFloat(data1["quantity"])});
                                    if(this.cal_method == "Division")
                                    this.sales_Quotation_Item_Dtls.at(j).patchValue({con_factor: parseFloat(data1["quantity"]) / parseFloat(this.con_factor)}); 
                                  }
                                }
                      
                                this.sales_Quotation_Item_Dtls.at(j).patchValue({item_code: data1["item_code"], acc_norms: data1["qc_norms"], 
                                  quantity: data1["quantity"], uom: data1["uom"], packing: data1["packing_item"], suom: data1["packing_uom"], 
                                  squantity: data1["packing_quantity"], mat_wt: data1["mat_wt"], price: data1["price"], tax_code: data1["tax_code"], tax_rate: data1["tax_rate"]});
                                j = j + 1;
                              }); 
                            }
                          }
//ends here 
              });
          } 
        });
      } 

      if(this._ref_type == "Previous Quotation")
      {
        const dialogRef = this.dialog.open(SalesQuoPopUpModalComponent, {data: {qu_type: "previous Quotation"}});
        dialogRef.afterClosed().subscribe(data => 
        {
         // console.log("chk data::"+JSON.stringify(data))
          if(data != '' && data["quotation_id"] != "0")
          {
            this.QuotationId = data["quotation_id"];
//start here 
          this.DropDownListService.getSalesQuotDetails(this.QuotationId).subscribe(quoData=>
          {
 

            let  j=0;
            this.packingItem = [];
            this.selectedItemName = [];
            this.selectedPackingItem = [];
            this.userForm.patchValue({referance_id: data["quotation_id"]});
            

            this.addItems();
            this.item_sl_no = 0;
            while(this.sales_Quotation_Item_Dtls.length)
            this.sales_Quotation_Item_Dtls.removeAt(0);

            for(let data1 of data.sales_Quotation_Item_Dtls)
            {
              if(data1.checkbox == true)
              {
              this.status = false;
              forkJoin(
                this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"],this.company_name),
                 //this.DropDownListService.getItemThruSalesThruBU(quoData["business_unit"],this.company_name)
                this.DropDownListService.getItemThruSalesThruBUFastApi(quoData["business_unit"],this.company_name)
              ).subscribe(([packingList, capacityEmptyWt,itemdata])=>
                {
                  this.status = true;
                  this.show_Row = true;
                  this.item_codes = itemdata;
                  this.addItems();
                  this.packingItem[j] = packingList; 
                  this.capacity[j] = capacityEmptyWt.capacity;
                  this.empty_bag_wt[j] =  capacityEmptyWt.empty_big_wt;
                  this.selectedPackingItem[j] = data1["packing"];
                  this.selectedItemName[j] = data1["item_code"];
                  this.sales_Quotation_Item_Dtls.at(j).patchValue(data1);
                  j = j + 1;
                });
              }
            }

            this.status = false;
            forkJoin(
              //this.DropDownListService.getSalesQuotDetails(this.QuotationId),
              this.DropDownListService.getSalesQuotSummary(this.QuotationId),
              this.DropDownListService.getSalesQuotTransInfo(this.QuotationId),
              this.DropDownListService.getSalesQuotShipDtls(this.QuotationId),
              this.DropDownListService.getSalesQuotTermsCon(this.QuotationId),
              this.DropDownListService.getSalesQuotSummDtls(this.QuotationId),
              this.DropDownListService.getSalesQuotBrokerDtls(this.QuotationId),
              this.DropDownListService.getSalesQuotPartyDtls(this.QuotationId)
            //).subscribe(([quoData, summaryData, transData, shipDtlsData, termsConData,
            ).subscribe(([ summaryData, transData, shipDtlsData, termsConData,
              summDtlsData, brokerData, partyData])=>
              {
                if(quoData["cust_channel"] != "0" && quoData["cust_channel"] != '' && quoData["cust_channel"] != null)
                {
                  this.status = false;
                  this.DropDownListService.getCustomerByChannel(quoData["cust_channel"]).subscribe(customerList=>
                  {
                    this.status = true;
                    this.partyList = customerList;
                    this.userForm.patchValue({customer : quoData["customer"]})
                  });
                }

                this.onChangeWgmtUom(quoData["we_uom"]);
                //console.log("chk data12::"+JSON.stringify(quoData))
                this.userForm.patchValue(quoData);
                this.status = false;
                this.DropDownListService.getSalesQuotSequenceId("QUOT/"+quoData["quotation_date"]+"/"+quoData["quotation_type"]).subscribe(data=>
                {
                  this.seq_no = data.sequenceid;
                  this.userForm.patchValue({quotation_no: this.seq_no, cust_ref: quoData["quotation_no"], id: 0});
                  this.status = true;
                }); 

                this.sales_Quotation_Summary.patchValue(summaryData);
                this.sales_Quotation_Trans_Info.patchValue(transData);

                if(quoData["customer"] != "0")
                {
                  this.status = false;
                  this.DropDownListService.getCustDelvFromList(quoData["customer"]).subscribe(custDelvAddList=>
                  {
                    this.customerDelvAddList = custDelvAddList;
                    this.sales_Quotation_Shipment_Dtls.patchValue(shipDtlsData);
                    this.status = true;
                  })
                }
                else{ this.sales_Quotation_Shipment_Dtls.patchValue(shipDtlsData)}

                this.onChangePaymentMode(termsConData["payment_mode"]);
                this.sales_Quotation_Terms_Con.patchValue(termsConData); 

                this.add3();
                while(this.sales_Quotation_Summary_dyn.length)
                this.sales_Quotation_Summary_dyn.removeAt(0);
                for(let data1 of summDtlsData) 
                this.add3(); 
                this.sales_Quotation_Summary_dyn.patchValue(summDtlsData);  

                let i = 0;
                this.selectedBrokerName = [];
                this.addBrokers();
                this.broker_sl_no = 0;
                while(this.sales_Quotation_Broker_Dtls.length)
                this.sales_Quotation_Broker_Dtls.removeAt(0);
                
                for(let data1 of brokerData) 
                {
                  this.addBrokers(); 
                  this.selectedBrokerName[i] = data1["broker_code"];
                  this.sales_Quotation_Broker_Dtls.at(i).patchValue(data1); 
                  i = i + 1; 
                } 

                let k = 0;
                this.contNameList = [];
                this.selectedPartyName = [];  
                this.addParty();
                this.party_sl_no = 0;
                while(this.sales_Quotation_Party_Dtls.length)
                this.sales_Quotation_Party_Dtls.removeAt(0);
               
                for(let data1 of partyData) 
                {
                  this.status = false;
                  this.DropDownListService.custAddDtlsRetriveList(data1["p_code"],this.company_name).subscribe(contactList=>
                  { 
                    this.status = true;
                    this.addParty(); 

                   
                   


                    this.selectedPartyName[k] = data1["p_code"];
                    this.selectedContName[k] = data1.cp_name;
                    this.contNameList[k]  = contactList; 
                   
                    this.sales_Quotation_Party_Dtls.at(k).patchValue(data1); 
                    k = k + 1;
                  });
                }

              });  

            });
              //here ends
          }    
        });
      } 
    }

    popup_data:any=[];
    packingListPopUp(index)
    {
      this.itemCode = this.sales_Quotation_Item_Dtls.at(index).get('item_code').value as FormControl;  
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index, item_id: this.itemCode, popup_data: this.popup_data};
      const dialogRef = this.dialog.open(PackingListPopUpComponent, dialogConfig);
      dialogRef.afterClosed().subscribe( data => 
      {
        this.popup_data = data;
        let list = "";
        for(let data1 of data)
        {
          if(data1["checkbox"] == true)
          list = list + data1.item_id + ",";
        }
        this.sales_Quotation_Item_Dtls.at(index).patchValue({packing_list: list.substr(0, list.length-1)});
      }); 
    }

    transporterPopUp()
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: 0, customer_id: this._customerId};
      if(this._customerId != "0")
      {
        const dialogRef = this.dialog.open(TransporterListPopUpComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => 
        {
          if(data != '' && data.transporter_id != '')
          {
            this.status = false;
            console.log("before transporter update: "+JSON.stringify(this.trans_codes))
            this.Service.updateCustomerTransporters(this._customerId, data.transporter_id).subscribe(data1=>
            { 
             // this.DropDownListService.transporterNamesList().subscribe(data=>
             this.DropDownListService.getTransporterMNCListFast().subscribe(data=>
              {
                this.trans_codes = data;
                console.log("after transporter update: "+JSON.stringify(this.trans_codes))
                this.status = true;
              });
              this.status = true;
              this.sales_Quotation_Trans_Info.patchValue({transporters: data.transporter_id});  
            });
          }
        }); 
      }
      else{alert("Select party First!")}
    }    

    _trans_code:any;
    send()
    {
      this.Id= this.userForm.get("id").value as FormControl;
      this._trans_code = this.sales_Quotation_Trans_Info.get("trans_code").value as FormControl;
      this._deliveryTerm = this.userForm.get("delivery_term").value as FormControl;
      this.userForm.patchValue({
      company_id: localStorage.getItem("company_name"), fin_year: this.financialYear,
      username: localStorage.getItem("username")});  
      this.submitted = true;
      if(localStorage.getItem("user_role") == "RL00001")
      {
        this.Userroles=true;
      }
      else
      {
        this.Userroles=false;
        console.log("Custome_id:: "+this.userForm.get('customer').value+" ::CUSTOMER_GROUP:: "+this.custGroup);
        this.DropDownListService.partynameListById(this.userForm.get('customer').value).subscribe(custDtls =>{
          console.log(" ::CUSTOMER_GROUP API:: "+custDtls["group_type"]);
          this.custGroup=custDtls["group_type"];
          if(this.custGroup=="CG00019"){
            console.log(" ::SAVE YES ARMY:: ");
            this.Quotationcheckpoint="Yes";
            this.userForm.patchValue({quotationcheckpoint: "Yes"});
          }
          else{
            console.log(" ::SAVE NO OTHERS:: ");
            this.Quotationcheckpoint="No";
            this.userForm.patchValue({quotationcheckpoint: "No"});
          }
        });
        
        //this.userForm.patchValue({quotationcheckpoint: "No"});
      }
      if(!this.userForm.valid) 
      {
        alert('Please fill all fields!')
        return false;
      } 
      else 
      {
        this.status = false;
        if(this.Id>0)
        {
          this.Service.updateSalesQuotation(this.userForm.getRawValue(),this.Id).subscribe( data =>
          {
            console.log(this.userForm.value);
            alert("Sales Quotation is Updated Successfully...");
            this.userForm.reset();
            this.ngOnInit();
            this.packingItem = [];
          
            this.item_sl_no = 0;
            while(this.sales_Quotation_Item_Dtls.length)
            this.sales_Quotation_Item_Dtls.removeAt(0);
            this.addItems();

            this.broker_sl_no = 0;
            while(this.sales_Quotation_Broker_Dtls.length)
            this.sales_Quotation_Broker_Dtls.removeAt(0);
            this.addBrokers();

            this.party_sl_no = 0;
            while(this.sales_Quotation_Party_Dtls.length)
            this.sales_Quotation_Party_Dtls.removeAt(0);
            this.addParty();

            while(this.sales_Quotation_Docs.length)
            this.sales_Quotation_Docs.removeAt(0);
            this.addDocument(); 
            
            while(this.sales_Quotation_Summary_dyn.length)
            this.sales_Quotation_Summary_dyn.removeAt(0);
            this.add3();
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()}); 
        }
        else
        {
         
             console.log("sales que: "+JSON.stringify(this.userForm.value));
            this.Service.createSalesQuotation(this.userForm.getRawValue()).subscribe( data =>
            {
              console.log(this.userForm.value);
              alert("Sales Quotation is Created Successfully...");
              this.userForm.reset();
              this.ngOnInit();
              this.packingItem = [];
            
              this.item_sl_no = 0;
              while(this.sales_Quotation_Item_Dtls.length)
              this.sales_Quotation_Item_Dtls.removeAt(0);
              this.addItems();

              this.broker_sl_no = 0;
              while(this.sales_Quotation_Broker_Dtls.length)
              this.sales_Quotation_Broker_Dtls.removeAt(0);
              this.addBrokers();

              this.party_sl_no = 0;
              while(this.sales_Quotation_Party_Dtls.length)
              this.sales_Quotation_Party_Dtls.removeAt(0);
              this.addParty();

              while(this.sales_Quotation_Docs.length)
              this.sales_Quotation_Docs.removeAt(0);
              this.addDocument(); 
              
              while(this.sales_Quotation_Summary_dyn.length)
              this.sales_Quotation_Summary_dyn.removeAt(0);
              this.add3();
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()}); 
       
        }   
      }
    }

    onUpdate(id:any, quotation_id:string, action)
    {
      this.salesquotationsave = true;
      //this.Quotationcheckpoint="No";

      this.userForm.patchValue({id: id});
      this.status = false;
      this.isHidden = true;
      this.operation = 'Update';
      this.packingItem = [];
      this.selectedItemName = [];
      this.selectedPackingItem = [];
      this.selectedPartyName = [];
      this.selectedContName = [];
      this.selectedBrokerName = [];
      if(action == 'view')
      {this.action = 'view';}
      else
      {this.action = 'update'; }

      forkJoin(
        this.Service.salesQuotationRetrive(id),
        this.Service.getSalesQuotItemDtls(quotation_id),      
        this.Service.getSalesQuotTransInfo(quotation_id),
        this.Service.getSalesQuotBrokerDtls(quotation_id),
        this.Service.getSalesQuotPartyDtls(quotation_id),
        this.Service.getSalesQuotDoc(quotation_id),
        this.Service.getSalesQuotTermsCon(quotation_id),
        this.Service.getSalesQuotSummary(quotation_id),
        this.Service.getSalesQuotShipDtls(quotation_id),
        this.Service.getSalesQuotSummDtls(quotation_id)
      ).subscribe(([salesQuoData, itemData,transData, brokerData,
        partyData, docData, termsConditionData, summData, shipmentData,summdynData])=>
        {
       

          this.quoType = salesQuoData["quo_type"];
          this.currentDate = salesQuoData["quotation_date"];
          if(this.quoType=='Formal' || salesQuoData["quo_type"]=='Formal')
          {
            this.quotationtypecheck=true;
          }
          else
          {
            this.quotationtypecheck=false;
          }
          if(salesQuoData["cust_channel"] != "0" && salesQuoData["cust_channel"] != '' &&  salesQuoData["cust_channel"] != null)
          {
            
            this.DropDownListService.getCustomerByChannel(salesQuoData["cust_channel"]).subscribe(customerList=>
            {
              
              this.partyList = customerList;
              this.userForm.patchValue({customer : salesQuoData["customer"]})
            });
          }

       //   this.onChangePartyStatic(salesQuoData["customer"])

          
          this.userForm.patchValue({id:salesQuoData["id"],quotation_no: salesQuoData["quotation_no"], quotation_id: salesQuoData["quotation_id"], quo_type: salesQuoData["quo_type"],
            quotation_date: salesQuoData["quotation_date"], valid_till: salesQuoData["valid_till"], price_term: salesQuoData["price_term"],
            pro_order: salesQuoData["pro_order"], cust_channel: salesQuoData["cust_channel"], cust_ref: salesQuoData["cust_ref"],
            receipt_ct: salesQuoData["receipt_ct"], we_uom: salesQuoData["we_uom"], business_unit: salesQuoData["business_unit"],
            delivery: salesQuoData["delivery"], q_status: salesQuoData["q_status"], shipment_mode: salesQuoData["shipment_mode"],
            ref_type: salesQuoData["ref_type"], sales_person: salesQuoData["sales_person"], delivery_term: salesQuoData["delivery_term"],
            remarks: salesQuoData["remarks"], confirmed_by: salesQuoData["confirmed_by"], approved: salesQuoData["approved"], inv_type: salesQuoData["inv_type"],
            reason: salesQuoData["reason"], app_chgs_id: salesQuoData["app_chgs_id"], company_id: salesQuoData["company_id"],
            fin_year: salesQuoData["fin_year"], brokerage_app: salesQuoData["brokerage_app"], customer: salesQuoData["customer"],
            sale_orderused:salesQuoData["sale_orderused"],quotationcheckpoint: salesQuoData["quotationcheckpoint"],terminate: salesQuoData["terminate"]});
           
           
            console.log("order Details: "+  JSON.stringify(salesQuoData));




         

          console.log("transData: "+  JSON.stringify(transData));
          this.sales_Quotation_Trans_Info.patchValue(transData);

          console.log("brokerData: "+  JSON.stringify(brokerData));

          
          if(salesQuoData["customer"] == '' || salesQuoData["customer"] ==null )
          {

          }else
          {
            forkJoin( 
              this.DropDownListService.custBrokerRetriveList(salesQuoData["customer"]),
              this.DropDownListService.getTransporterThruCustomer(salesQuoData["customer"]),
              this.DropDownListService.getCustDelvFromList(salesQuoData["customer"])
              ).subscribe(([brokerData, transporterList,custDelvData])=>
              {
    
                this.brokerNames = brokerData;
                this.trans_codes = transporterList;
                this.customerDelvAddList = custDelvData;
                
    
              });
          }
          //customer
         
         // console.log("BrokerData: "+JSON.stringify(brokerData));
          let  j = 0;
          this.selectedBrokerName=[];
          this.addBrokers();
          this.broker_sl_no = 0;
          while (this.sales_Quotation_Broker_Dtls.length) 
          this.sales_Quotation_Broker_Dtls.removeAt(0);
          for(let data1 of brokerData)
          { 
            this.addBrokers();
            this.selectedBrokerName[j] = data1["broker_code"];
            this.sales_Quotation_Broker_Dtls.at(j).patchValue(data1);
            j = j + 1;
          }

          let i = 0;
          console.log("partyData: "+JSON.stringify(partyData));
          this.addParty();
          this.party_sl_no = 0;
          while (this.sales_Quotation_Party_Dtls.length) 
          this.sales_Quotation_Party_Dtls.removeAt(0);

          for(let data1 of partyData)
          { 
            
            this.DropDownListService.custAddDtlsRetriveList(data1["p_code"],this.company_name).subscribe(cName=>
            {
              this.addParty();
              this.selectedPartyName[i] = data1["p_code"];
              this.selectedContName[i] = data1["cp_name"]
              this.contNameList[i]  = cName;
              this.sales_Quotation_Party_Dtls.at(i).patchValue(data1);
              i= i + 1;
              
            });  
          }

          console.log("docData: "+  JSON.stringify(docData));
          this.addDocument();
          while (this.sales_Quotation_Docs.length) 
          this.sales_Quotation_Docs.removeAt(0);
          for(let data1 of docData)
          this.addDocument();
          this.sales_Quotation_Docs.patchValue(docData);

       

          console.log("SummData: "+  JSON.stringify(summData));
          this.sales_Quotation_Summary.patchValue(summData);

          console.log("Shipment: "+  JSON.stringify(shipmentData));
          if(salesQuoData["customer"] != "0")
          {
            
            this.DropDownListService.getCustDelvFromList(salesQuoData["customer"]).subscribe(custDelvAddList=>
            {
              this.customerDelvAddList = custDelvAddList;
              this.sales_Quotation_Shipment_Dtls.patchValue(shipmentData);
              
            })
          }
          else{ this.sales_Quotation_Shipment_Dtls.patchValue(shipmentData)}

          console.log("appChgData: "+  JSON.stringify(summdynData));
          this.add3();
          while (this.sales_Quotation_Summary_dyn.length) 
          this.sales_Quotation_Summary_dyn.removeAt(0);
          for(let data1 of summdynData)
          this.add3();
          this.sales_Quotation_Summary_dyn.patchValue(summdynData);

          this.onChangeWgmtUom(salesQuoData["we_uom"])


          console.log("termsconData: "+  JSON.stringify(termsConditionData));
          this.onChangePaymentMode(termsConditionData["payment_mode"]);
          this.sales_Quotation_Terms_Con.patchValue(termsConditionData);

          console.log("itemData: "+  JSON.stringify(itemData));
          let k = 0;
          this.addItems();
          this.item_sl_no = 0;
          while (this.sales_Quotation_Item_Dtls.length) 
          this.sales_Quotation_Item_Dtls.removeAt(0);
          
          for(let data1 of itemData)
          { 
            
            forkJoin(
              this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
              this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"],this.company_name),
              //this.DropDownListService.getItemThruSalesThruBU(salesQuoData["business_unit"],this.company_name)
              this.DropDownListService.getItemThruSalesThruBUFastApi(salesQuoData["business_unit"],this.company_name)
            ).subscribe(([packingList, capacityEmptyWt,itemdata])=>
              {
                this.status = false;
                this.item_codes = itemdata;
                this.addItems();
                this.capacity[k] = capacityEmptyWt.capacity;
                this.empty_bag_wt[k] =  capacityEmptyWt.empty_big_wt;
                this.selectedItemName[k] = data1["item_code"];
                this.selectedPackingItem[k] = data1["packing"];
                this.packingItem[k] = packingList; 
                this.sales_Quotation_Item_Dtls.at(k).patchValue(data1);
                this.sales_Quotation_Item_Dtls.at(k).patchValue({item_tolerance:capacityEmptyWt["tolerance"],tolerance_qty:data1["quantity"]})
                k = k + 1;
                //console.log("length:"+itemData.length)
                if(k==itemData.length)
                this.status = true;
              });
              
            }


          
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});                            
       }


       onChangewithinvoicetype(inv_type:string)
       {   
        
         if(inv_type.length)
         {
           /* if(inv_type=="INV00006")
           {
             forkJoin
             (
               this.DropDownListService.getItemThruSalesThruBU_inv_type(this.userForm.get("business_unit").value,this.company_name,"INV00001"),
             )
             .subscribe(([data])=>
               {
               
                 this.item_codes = data;
                 this.status = true;
               }); 
           } */
           //else if(inv_type=="INV00001")
           if(inv_type=="INV00001")
           {
            this.DropDownListService.getItemThruSalesThruBU_inv_typeReg(this.userForm.get("business_unit").value,this.company_name).subscribe(data=>
              {
                this.item_codes = data;
                this.status = true;
              });
           }
           else if(inv_type=="INV00002")
           {
            this.DropDownListService.getItemThruSalesThruBU_inv_typeGST(this.userForm.get("business_unit").value,this.company_name).subscribe(data=>
              {
                this.item_codes = data;
                this.status = true;
              });
           }
           else
           {
            this.DropDownListService.getItemThruSalesThruBU_inv_type(this.userForm.get("business_unit").value,this.company_name,inv_type).subscribe(data=>
              {
                this.item_codes = data;
                this.status = true;
              });
           }
           
         }  
       }

    search()
    {
      let todate=this.userForm1.get("todate").value;
      let fromdate=this.userForm1.get("fromdate").value;

      let finyear =localStorage.getItem("financial_year");
      this.status=false;
      this.DropDownListService.searchSaleQuotation(fromdate,todate).subscribe(data=>
        {
          this.listSalesQuotation =data;
          this.status=true;
        }, (error) => {this.status=true;
          alert("Sale Quotation Not Found !!!")
          this.listSalesQuotation=[];
        })
    }



    round2(number, decimals = 0) {
      let strNum = '' + number;
      let negCoef = number < 0 ? -1 : 1;
      let dotIndex = strNum.indexOf('.');
      let start = dotIndex + decimals + 1;
      let dec = Number.parseInt(strNum.substring(start, start + 1));
      let remainder = dec >= 5 ? 1 / Math.pow(10, decimals) : 0;
      let result = Number.parseFloat(strNum.substring(0, start)) + remainder * negCoef;
      return result.toFixed(decimals);
  }
  
   round(num, decimalPlaces = 0) {
    var p = Math.pow(10, decimalPlaces);
    var n = (num * p) * (1 + Number.EPSILON);
    return Math.round(n) / p;
}

    onDelete(id,quote_id)
    {
      this.status=false;
      if(confirm("Are you sure to delete this Sales Quotation?"))
      {
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.DropDownListService.checkSalesQuotationUsage(quote_id).subscribe(chkSalesQuotation=> 
          {
          ///let dataq=JSON.parse(checkItem);
          // alert("bidhan here::"+chkSalesQuotation.status);
          if(chkSalesQuotation.status=='No')
          {
            this.Service.deleteSalesQuotation(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                alert("Sales Quotation Deleted successfully.");
                this.userForm.reset();
                this.status = true;
                this.isHidden = false;
                this.ngOnInit();
                this.showList("list");
              });
          }
          else
          {
            alert("This Sales Quotation is Already Used,Can not be Deleted!! ");
          }
          });
      }
      this.status=true;
    }

    onTerminate(id)
    {
      this.status=false;
      if(confirm("Are you sure to Terminate this Sales Quotation?"))
      {
        this.DropDownListService.SalesQuotationTerminate(id,localStorage.getItem("username")).subscribe(data=>
          {
            if(data["status"] =="Yes")
            {
              alert("Sales Quotation Terminated Successfully...");
              this.status = true;
              this.isHidden = false;
              this.ngOnInit();
              this.showList("list");
            }
            else
            {
              alert("Sales Quotation Not Terminated Successfully...");
            }
           
            this.status=true;
          });
      }
    }
  }
