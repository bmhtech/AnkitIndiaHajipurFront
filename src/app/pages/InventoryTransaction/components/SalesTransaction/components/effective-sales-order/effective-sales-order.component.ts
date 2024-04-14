import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange, MatDialog, MatDialogConfig, PageEvent } from '@angular/material';
import { forkJoin } from 'rxjs';
import { SalesOrder } from '../../../../../../Models/SalesTransaction/SalesOrder';
import { TransportationpopupmodalComponent } from '../../../../../../pages/Master/components/MisMaster/components/transportationpopupmodal/transportationpopupmodal.component';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { SalesQcPopupComponent } from '../sales-qc-popup/sales-qc-popup.component';
import { SalesEnqCusPopUpComponent } from '../sales-enq-cus-pop-up/sales-enq-cus-pop-up.component';
import { SalesQuoPopUpModalComponent } from '../sales-quo-pop-up-modal/sales-quo-pop-up-modal.component';
import { SalesEnquiryPopUpModalComponent } from '../sales-enquiry-pop-up-modal/sales-enquiry-pop-up-modal.component';
import { SalesQuoTaxModalComponent } from '../sales-quo-tax-modal/sales-quo-tax-modal.component';
import { PackingListPopUpComponent } from '../packing-list-pop-up/packing-list-pop-up.component';
import { TransporterListPopUpComponent } from '../transporter-list-pop-up/transporter-list-pop-up.component';
import { SalesOrderPrintComponent } from '../sales-order-print/sales-order-print.component';
import { SaleorderproformaprintComponent } from '../saleorderproformaprint/saleorderproformaprint.component';
import { LiewSaleorderPopupComponent } from '../liew-saleorder-popup/liew-saleorder-popup.component';

@Component({
  selector: 'app-effective-sales-order',
  templateUrl: './effective-sales-order.component.html',
  styleUrls: ['./effective-sales-order.component.scss']
})
export class EffectiveSalesOrderComponent implements OnInit {
    
    isHidden:any;
    operation:any;
    submitted = false;
    public userForm:FormGroup;
    public userForm1:FormGroup;
    model: SalesOrder = new SalesOrder();
    status = false;
    item_codes:any=[];
    selectedPartyName = [];
    listSalesOrder:any=[];
    ChargeList:any=[];
    financialYear:any;
    company_name:any;
    trans_codes:{};
    Reason="0";Approved="0";
    chargesIdList:{};
    orderType:any;
    selectedItemName = [];
    selectedBrokerName = [];
    selectedPackingItem:any = [];
    reasonIdList: {};
    Id:any;
    bussiness_unit_list:any = [];
    PartyAllList:any = [];
    brokerNames:any = [];
    order_types:{};
    channel_master_list:any = [];
    contNameList:any=[];
    packingItem:any=[];
    shipAddr:string;
    currentDate:any;
    seq_no:string;
    payTerms:any = [];
    payModes:{};
    BuUnit = "0";
    Price_term = "0";
    Weigmentuom="0";
    Q_status ="0";
    Inv_type = "0";
    Receipt_Criteria = "0";
    Shipment_Mode = "0";
    item_sl_no = 1; 
    broker_sl_no = 1;
    party_sl_no = 1;
    chgs_sl_no = 1;
    OrderType="0";
    employeeNames:any = [];
    invoiceType:any = [];
    basiss:{};
    businesslists:any=[];
    customUOMs:any = [];
    isChecked1=false;
    isChecked=false;
    bank_names:{};
    isPackingListReq:any = [];
    partyNameList:any = [];
    send_via_list:{};
    App_Chgs="0";
    Confirmed_By="0";
    isBankNameDisabled = false;
    is_order_type_formal="";
    is_payment_dis = false;
    cashLimit:any;
    transBrone:{};
    customerDelvAddList:any = [];
    partyList:any = [];
    modeOfTransport:any = [];
    _weighmentUom:any;
    _deliveryTerm:any;
    empty_bag_wt:any = [];
    action:any;
    salesordersave:boolean = true;
    salesorderupdate:boolean = true;
    salesorderview:boolean = true;
    salesorderdelete:boolean = true;
    salesorderprint:boolean = true;
    selectCustomerStatus:boolean=false;
    custid:any;
    custidNew:any;
    liewterstat:boolean=false;
    refordersalesta:boolean=false;
    partyNameList12:any=[];
    hallu:any=[];
    deliverychallanstatus:boolean=false;
    totalElements: number = 0;
    additemstatus:boolean=false;
    addratestatus:boolean=false;
    ratePointIndex:any=[];
    itemdisable:any=[];
    selectedTransacc = [];
    selectedTdsacc = [];
    areaList:any=[];
    transRate:any = [];
    uoms:any=[];
    ledgerNames:any = [];
    tdscode:any=[];
    listCharges:any=[];
    selectedChgCode =[];
    transChgsDyn:boolean=false;
    ordertypecheck:boolean=true;

    constructor(public fb:FormBuilder, public dialog: MatDialog,
      private Service : Master,private DropDownListService: DropdownServiceService)
    {
      this.userForm=fb.group(
      {
        id: [''],
        order_id: [''],
        pro_order:[''],
        order_no:[''],
        valid_till:[''],
        order_date:[''],
        order_type:[''],
        price_term:[''],
        cust_channel:[''],
        ref_type:[''],
        cust_refdocno:[''],
        business_unit:[''],
        receipt_criteria:[''],
        we_uom:[''],
        shipment_mode:[''],
        sales_person:[''],
        delivery_date:[''],
        q_status:[''],
        remarks:[''],
        confirmed_by:[''],
        approval:[''],
        reason:[''],
        delivery_term:[''],
        app_chgs_id:[''],
        company_id: [''],
        fin_year: [''],
        customer: [''],
        inv_type: [''],
        referance_id: [''],
        brokerage_app: [''],
        username: [''],
        cust_ref_doc_date:[''],
        trans_borne_by_chgs: [''],
        cust_channel_list:[''],

        sales_Order_Item_Dtls: this.fb.array([this.fb.group({
          slno:this.item_sl_no,
          item_code:'',
          packing:'',
          hsn_code:'',
          quantity:'',
          uom:'',
          squantity:'',
          suom:'',
          con_factor:'',
          mat_wt:'',
          price:'',
          price_based_on:'',
          amount:'',
          discount_type:'',
          discount_rate:'',
          tolerance:'',
          tax_code:'',
          tax_rate: '',
          acc_norms:'',
          discount_amt:'',
          tax_amt:'',
          total_amt:'',
          packing_list_req:'',
          packing_list:'',
          item_tolerance:'0',
          tolerance_qty:'0',
          cgst_amt:'',
          sgst_amt:'',
          igst_amt:'',
          ratechartamt:'',
          ratecharttol:'',
          rateres:''
        })]),

         sales_Order_Broker_Dtls: this.fb.array([this.fb.group({
          slno:this.broker_sl_no,
          p_code:'',
          broker_code:'',
          //broker_name:'',
          basis:'',
          based_on:'',
          rate:''})]),
  
        sales_Order_Summary:this.fb.group({
          item_total:'',
          discount:'',
          tax_total:'',
          net_amount:'',
          app_brokerage:'',
          net_r_value:'',
        }),

        sales_Order_Summary_dyn: this.fb.array([this.fb.group({
          // charge_name:'',
          // rate_cal_method:'',
          // amount:'',
          // tax_rate: ''
      
          charge_name:'',
          add_less:'',
          rate_cal_method:'',
          app_rate:'',
          amount:'',
          tax_rate:''
        })]),

        sales_Order_Party_Dtls:this.fb.array([this.fb.group({
          sl_no : this.party_sl_no, 
          p_code:'',
          cp_name:'',
          cp_contact:'',
          cp_city:'',
          city_approved:'',
          send_via:'',
          tcs_applicable:'',
          tcs_rate:''
        })]),

        sales_Order_Trans_Info:this.fb.group({
          trans_borne_by:'',
          mode_of_trans:'',
         // transporter_name:'',
          trans_code:'',
          charge_code:'',
          transporters:''}),

          sales_Order_Trans_Chgs_dyn:this.fb.array([this.fb.group({
            slno: this.chgs_sl_no,
            mode_of_trans:'',
            transport_from:'',
            transport_to: '',
            transporter_name: '',
            transport_rate: '',
            charge_code: '',
            chgs_rate_value: '',
            chgs_remarks:'' ,
            distance_in_km:'' ,
            uom:'' ,
            tax_code:'' ,
            tax_rate:'' ,
            transportation_acc:'' ,
            tds_code:'' ,
            tds_codename:'' ,
            tds_rate:'' ,
            tds_acc:'' ,
            tds_accname:'' ,
            allowed_shortage:'' ,
            deduction_basedon:'',
            charge_id:'' })]),
          
        
        sales_Order_Shipment_Dtls:this.fb.group({
            ship_addr:'',
            ship_details:'',
            pay_addr:'',
            pay_details:'' }),

        sales_Order_Terms_Con:this.fb.group({	
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
        }),

        sales_Order_Docs: this.fb.array([this.fb.group({
          doc_name:''})]),
      });

      
      
      this.userForm1=fb.group(
        {
          order1_no:[''],
          fromdate:[''],
          todate:[''],
          customername:[''],
        });
    }
    get order1_no(){return this.userForm1.get("order1_no") as FormControl};
    get fromdate(){return this.userForm1.get("fromdate") as FormControl};
    get todate(){return this.userForm1.get("todate") as FormControl};
    get customername(){return this.userForm1.get("customername") as FormControl};
    
    get cust_channel_list(){return this.userForm1.get("cust_channel_list") as FormControl};

    get id(){return this.userForm.get("id") as FormControl};
    get order_no(){return this.userForm.get("order_no") as FormControl};
    get order_id(){return this.userForm.get("order_id") as FormControl};
    get sales_person(){return this.userForm.get("sales_person") as FormControl};
    get shipment_mode(){return this.userForm.get("shipment_mode") as FormControl};
    get q_status(){return this.userForm.get("q_status") as FormControl};
    get valid_till(){return this.userForm.get("valid_till") as FormControl};
    get business_unit(){return this.userForm.get("business_unit") as FormControl};
    get pro_order(){return this.userForm.get("pro_order") as FormControl};
    get delivery_term(){return this.userForm.get("delivery_term") as FormControl};
    get order_date(){return this.userForm.get("order_date") as FormControl};
    get order_type(){return this.userForm.get("order_type") as FormControl};
    get price_term(){return this.userForm.get("price_term") as FormControl}; 
    get cust_channel(){return this.userForm.get("cust_channel") as FormControl};
    get ref_type(){return this.userForm.get("ref_type") as FormControl};
    get cust_refdocno(){return this.userForm.get("cust_refdocno") as FormControl};
    get receipt_criteria(){return this.userForm.get("receipt_criteria") as FormControl};
    get we_uom(){return this.userForm.get("we_uom") as FormControl};
    get delivery_date(){return this.userForm.get("delivery_date") as FormControl};
    get remarks(){return this.userForm.get("remarks") as FormControl};
    get confirmed_by(){return this.userForm.get("confirmed_by") as FormControl};
    get approval(){return this.userForm.get("approval") as FormControl};
    get reason(){return this.userForm.get("reason") as FormControl};
    get customer(){return this.userForm.get("customer") as FormControl};    
    get inv_type(){return this.userForm.get("inv_type") as FormControl};
    get trans_borne_by_chgs(){ return this.userForm.get("trans_borne_by_chgs") as FormControl }

    get sales_Order_Item_Dtls(){return this.userForm.get("sales_Order_Item_Dtls") as FormArray};
    get sales_Order_Broker_Dtls(){return this.userForm.get("sales_Order_Broker_Dtls") as FormArray};
    get sales_Order_Summary(){return this.userForm.get("sales_Order_Summary") as FormGroup};
    get sales_Order_Trans_Info(){return this.userForm.get("sales_Order_Trans_Info") as FormGroup};
    get sales_Order_Party_Dtls(){return this.userForm.get("sales_Order_Party_Dtls") as FormArray};
    get sales_Order_Terms_Con(){return this.userForm.get("sales_Order_Terms_Con") as FormGroup};
    get sales_Order_Docs(){return this.userForm.get("sales_Order_Docs") as FormArray};
    get sales_Order_Summary_dyn() {return this.userForm.get('sales_Order_Summary_dyn') as FormArray;}
    get sales_Order_Shipment_Dtls(){return this.userForm.get("sales_Order_Shipment_Dtls") as FormGroup};
    get cust_ref_doc_date(){return this.userForm.get("cust_ref_doc_date") as FormControl};
    get sales_Order_Trans_Chgs_dyn() {return this.userForm.get('sales_Order_Trans_Chgs_dyn') as FormArray;}
    
    ngOnInit() 
    {
     // this.getProducts({ page: "0", size: "10" });
      //For User Role
    let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));

    this.salesordersave = false;
    this.salesorderupdate = false;
    this.salesorderview = false;
    this.salesorderdelete = false;
    this.salesorderprint = false;

    if(accessdata.includes('sales_order.save'))
    {
     this.salesordersave = true;
    }
   if(accessdata.includes('sales_order.update'))
    { 
      this.salesorderupdate=true;
    }
    if(accessdata.includes('sales_order.view'))
    {
      this.salesorderview=true;
    }
    if(accessdata.includes('sales_order.delete'))
    {
      this.salesorderdelete=true;
    }
    if(accessdata.includes('sales_order.print'))
    {
      this.salesorderprint=true;
    }
    
      this.onChangeMatTab(0);
      this.deliverychallanstatus=false;
      this.company_name = localStorage.getItem("company_name");
      this.order_types=["Formal","Informal"];
      this.BuUnit = "0";
      this.Approved = "0";
      this.Reason ="0"
      this.App_Chgs="0";
      for(let i=0;i<this.sales_Order_Party_Dtls.length;i++)
      {
        this.sales_Order_Party_Dtls.at(i).patchValue({p_code:"0",cp_name:"0"});
      }
      for(let i=0;i<this.sales_Order_Broker_Dtls.length;i++)
      {
        this.sales_Order_Broker_Dtls.at(i).patchValue({p_code:"0",broker_code:"0"});
      }
     
      this.Price_term = "0";
      this.Receipt_Criteria = "0";
      this.Shipment_Mode = "0";
      this.transBrone=["FOB","FOR"];
      //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');

       if((this.currentDate>=formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en'))  && (this.currentDate<=formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en')))
       {
        console.log("sucess");
       }
      else
      {
        alert("Current date is not in Selected Financial period!!!!!!")
        this.currentDate=formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
      }

      this.send_via_list=["Email","Fax","Courier","Other"];
      this.modeOfTransport=["By Air","By Rail","By Road","By Ship","By Train", "By Water", "By Other"];
      this.transRate=["PER TRUCK","PER UOM"];
      this.financialYear = localStorage.getItem("financial_year");
      this.basiss=["%","UOM"];
      this.isPackingListReq[0] = "false";
      this.operation = 'Create';
      this.OrderType="0";
      this.cashLimit = 0;
      this.isHidden = false;
      this._weighmentUom = 0;
      this._deliveryTerm = "0";
      this.action = 'update';
      this.capacity = [];
      this.empty_bag_wt = [];
      this.packingItem = [];
      this.selectedItemName = [];
      this.selectedPackingItem = [];
      this.selectedPartyName = [];
      this.selectedBrokerName = [];
      this.userForm.patchValue({id: 0, referance_id: 0,business_unit:"0"});
      forkJoin( 
      //this.DropDownListService.getAll(0,10),
      this.DropDownListService.getSaleOrderList(this.currentDate,this.financialYear),
      //this.DropDownListService.customerList(this.company_name)
      this.DropDownListService.newcustomerList(this.company_name),
      this.DropDownListService.ledgerNameListNew(),
      this.DropDownListService.tdsCode(),
        this.DropDownListService.getCharges()
      
      ).subscribe(([data ,CustomerData,ledgerData,tdsdata,chargematrix])=> {
       // console.log(JSON.stringify(data))
        //  this.listSalesOrder = data['content'];
         // this.totalElements = data['totalElements'];
          this.listSalesOrder = data;
          this.partyNameList12  = CustomerData;
          this.ledgerNames = ledgerData;
          this.tdscode = tdsdata;
          this.listCharges  = chargematrix;
          this.status=true;
      });

    }

    onChangeDeliveryTerm(del_term:string)
    {
      this._deliveryTerm = del_term;
      if(this._deliveryTerm == "FOB")
      { 
        this.transChgsDyn=false;
        this.sales_Order_Shipment_Dtls.patchValue({ship_addr: "0", ship_details: ''});
        this.userForm.patchValue({trans_borne_by_chgs:"FOB"});
        this.sales_Order_Trans_Info.patchValue({trans_borne_by: "FOB", mode_of_trans: '', trans_code: "0", charge_code: '', transporters: ''})
        this.sales_Order_Trans_Chgs_dyn.at(0).patchValue({slno:0,mode_of_trans:0,transport_from:0,transport_to:0,transporter_name:0,transport_rate:0,
          charge_code:0,chgs_rate_value:0,chgs_remarks:0,distance_in_km:0,uom:0,tax_code:0,tax_rate:0,transportation_acc:0,
          tds_code:0,
          tds_codename:0,
          tds_rate:0,
          tds_acc:0,
          tds_accname:0,
          
          allowed_shortage:0,deduction_basedon:0,charge_id:0});
      }
      else
      {
        this.sales_Order_Trans_Info.patchValue({trans_borne_by: "FOR"});
        this.userForm.patchValue({trans_borne_by_chgs:"FOR"});
        this.transChgsDyn=true;
      }
    }


      onChangewithinvoicetype(inv_type:string)
      {   
        console.log("Check :::  "+inv_type); 
        if(inv_type!="0")
        {
          if(inv_type=="INV00005")
          {
            forkJoin
            (
              this.DropDownListService.getItemThruSalesThruBU_inv_type(this.userForm.get("business_unit").value,this.company_name,"INV00001"),
              this.DropDownListService.getSalesOrdSequenceIdWarehouse("SO/"+this.userForm.get("order_date").value),
            )
            .subscribe(([data,SOno])=>
              {
                this.seq_no = SOno.sequenceid;
                this.item_codes = data;
                this.status = true;
              }); 
          }
          else if(inv_type=="INV00001")
          {
            this.getOrderNo(this.userForm.get("order_date").value, this.userForm.get("order_type").value);
            
            this.DropDownListService.getItemThruSalesThruBU_inv_typeReg(this.userForm.get("business_unit").value,this.company_name).subscribe(data=>
              {
                this.item_codes = data;
                this.status = true;
              }); 
          }
          else if(inv_type=="INV00002")
          {
            this.getOrderNo(this.userForm.get("order_date").value, this.userForm.get("order_type").value);
            
            this.DropDownListService.getItemThruSalesThruBU_inv_typeGST(this.userForm.get("business_unit").value,this.company_name).subscribe(data=>
              {
                this.item_codes = data;
                this.status = true;
              }); 
          }
          else
          {
            this.getOrderNo(this.userForm.get("order_date").value, this.userForm.get("order_type").value);
            
            this.DropDownListService.getItemThruSalesThruBU_inv_type(this.userForm.get("business_unit").value,this.company_name,inv_type).subscribe(data=>
              {
                this.item_codes = data;
                this.status = true;
              }); 
          }
          
        }  
      }

    isHide=false;
    onChangeOrderType(order_type:string)
    {
     // console.log("hi :: ")
      this.orderType = order_type;

      if(this.userForm.get("inv_type").value=="INV00005")
      {
        this.getOrderNoWarehouse(this.currentDate)
      }
      else
      {
        this.getOrderNo(this.currentDate, order_type)
      }
      
      if(order_type == "Informal")
       {
        this.userForm.patchValue({customer:0,cust_channel:''})
        this.ordertypecheck=false;
        this.cashLimit = 0;
        this.isHide = false;
        this.show_Row1 = false;
        this.party_sl_no = 0;
        this.is_order_type_formal = "Informal";
        this.refordersalesta=true;
        this.sales_Order_Terms_Con.patchValue({cash_limit: this.cashLimit});

        while(this.sales_Order_Party_Dtls.length)
        this.sales_Order_Party_Dtls.removeAt(0);
        this.addParty();
       }
       else
       {
        this.userForm.patchValue({customer:0,cust_channel:''})
        this.ordertypecheck=true;
        this.is_order_type_formal = "Formal";
        this.show_Row1 = true;
        this.isHide = true;
        this.refordersalesta=false;
       }
     
    }

    onChangeOrderDate(orderDate)
    {

      this.currentDate = orderDate.target.value;

      if((this.currentDate>=formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en'))  && (this.currentDate<=formatDate(new Date(localStorage.getItem("endfinancialdate")), 'yyyy-MM-dd', 'en')))
      {
       //console.log("sucess");
       this.orderType = this.userForm.get("order_type").value as FormControl;
       if(this.orderType != "0")
       {
        if(this.userForm.get("inv_type").value=="INV00005")
        {
          this.getOrderNoWarehouse(this.currentDate)
        }
        else
        {
          this.getOrderNo(this.currentDate, this.orderType)
        }
        
       }
      }
     else
     {
       alert("Selected  date is not in Selected Financial period!!!!!!")
       this.currentDate=formatDate(new Date(localStorage.getItem("startfinancialdate")), 'yyyy-MM-dd', 'en');
     }

     /* this.orderType = this.userForm.get("order_type").value as FormControl;
      if(this.orderType != "0")
      {this.getOrderNo(this.currentDate, this.orderType)}
      */
    }

    getOrderNo(orderDate, orderType)
    {
      this.status = false;
      this.DropDownListService.getSalesOrdSequenceId("SO/"+orderDate+"/"+orderType).subscribe(data=>
      {
        this.seq_no = data.sequenceid;
        this.status = true;
      });   
    }

    getOrderNoWarehouse(orderDate)
    {
      this.status = false;
      this.DropDownListService.getSalesOrdSequenceIdWarehouse("SO/"+orderDate).subscribe(data=>
      {
        this.seq_no = data.sequenceid;
        this.status = true;
      });   
    }

    onChangeReferenceType(ref_type:string)
     {
       this.reference_type = ref_type;
       if(ref_type=='Sales Order')
       {
            this.liewterstat=true;
       }
       else
       {
        this.liewterstat=false;
       }
     }

   

    _customerId:any;
    onChangePartyStatic(cpId)
    {
       this.sales_Order_Shipment_Dtls.patchValue({ship_details: ''});
      if(cpId.length)
      {
        this.status = false;
        this._customerId = cpId;
         this.customer_id = cpId;
        forkJoin(
          this.DropDownListService.custBrokerRetriveList(cpId),
          this.DropDownListService.getTransporterThruCustomer(cpId),
          this.DropDownListService.custAccountRetriveList(cpId,this.company_name),
          this.DropDownListService.getCustDelvFromList(cpId)
        ).subscribe(([brokerData, transporterList, custAccData, custDelvData])=> 
          {
            this.brokerNames[0] = brokerData;
            this.trans_codes = transporterList;
           // console.log("transporterList: "+JSON.stringify(transporterList))
            this.onChangePaymentMode(custAccData["mode_of_pay"]);
            this.sales_Order_Terms_Con.patchValue({payment_mode: custAccData["mode_of_pay"],
              bank_name: custAccData["bankname"], account_no: custAccData["acc_no"], account_name: custAccData["accountholder"],
              branch: custAccData["branch"], iban: custAccData["iban"], bic_swift_code: custAccData["bic_swift_code"],
              ifsc_code: custAccData["ifsc"], cash_limit: custAccData["cash_limit"], payment_term: custAccData["pay_term"]})
             
            this.customerDelvAddList = custDelvData;
            this.status = true;
          });
      }
    }
    
    CpId:any;
    onChangePartyStatic1()
    {
      this.CpId = this.userForm.get("customer").value as FormControl;
        forkJoin(
          this.DropDownListService.custBrokerRetriveList(this.CpId),
        ).subscribe(([brokerData])=> 
          {
            this.brokerNames = brokerData;
         })  
    }

    onChangeshipment(shipment_mode:string)
    {   
      this.sales_Order_Trans_Info.patchValue({mode_of_trans: shipment_mode}); 
    }

    onChangePackingReqList(packing_req, index)
    {
      if(packing_req.target.value == "Yes")
      this.isPackingListReq[index] = "true";
      else
      { 
        this.isPackingListReq[index] = "false";
        this.sales_Order_Item_Dtls.at(index).patchValue({packing_list: "NA"});
      }
    }

    totaldiscount:any;
    totalItem:any;
    _applicableBrokerage = 0;
    calNetRValue(app_bkr)
    {
      let _netRValue = 0;
      this.totalItem = this.sales_Order_Summary.get("item_total").value as FormControl;
      this.totaldiscount = this.sales_Order_Summary.get("discount").value as FormControl;
      this._applicableBrokerage = app_bkr.target.value;
       _netRValue = this.totalItem - this.totaldiscount - app_bkr.target.value;
      this.sales_Order_Summary.patchValue({net_r_value: _netRValue.toFixed(2)})
    }

    onChangePaymentMode(event: string)
    { 
      this.sales_Order_Terms_Con.patchValue({cash_limit: this.cashLimit});
      let gotbank=event
      if(gotbank=="RTGS" || gotbank=="NEFT")
      {
        this.isBankNameDisabled = true;
        this.isChecked =true;     
      }
      else
      {
        this.sales_Order_Terms_Con.patchValue({bank_name: null});
        this.isBankNameDisabled = false;
        this.sales_Order_Terms_Con.patchValue({account_no: null});
        this.isChecked =false;
        this.sales_Order_Terms_Con.patchValue({ifsc_code: null});
        this.sales_Order_Terms_Con.patchValue({account_name: null});
        this.sales_Order_Terms_Con.patchValue({branch: null});
        this.sales_Order_Terms_Con.patchValue({iban: null});
        this.sales_Order_Terms_Con.patchValue({bic_swift_code: null});
      }
      if(gotbank=='Cash')
      {
      this.isChecked1 =true;  
      }
      else{
      this.isChecked1 =false;  
      }            
    }

    is_trans_Info = "";
    onChangeTransBornBy(event: string)
    {
      let gotval=event
      if(gotval=="Own Account")
      {
        this.is_trans_Info = "Own Account";
      }
      if(gotval=="Party Account")
      {
        this.sales_Order_Trans_Info.patchValue({mode_of_trans: "NA", trans_code: "NA", charge_code:"NA", transporters: "NA"});
        this.is_trans_Info = "Party Account";
      }
    }

    OnChangeTransporterNameChgs(transporter_id,index)
    {
   
      if(transporter_id.length)
      {
        let transport_from=this.sales_Order_Trans_Chgs_dyn.at(index).get("transport_from").value;
        let transport_to=this.sales_Order_Trans_Chgs_dyn.at(index).get("transport_to").value;
        forkJoin
        (
          this.DropDownListService.getTransChargeCode(transporter_id,transport_from,transport_to,'Sales'),
          this.Service.getTranstds(transporter_id)
        )
        .subscribe(([chgs,tds])=>
          {
          
            this.ChargeList[index]=chgs;
            this.sales_Order_Trans_Chgs_dyn.at(index).patchValue({tds_code:tds['tds_id'],
              tds_codename:tds['tds_type'],
              tds_rate:tds['tds_rate'],
              tds_acc:tds['tds_acc'],
              tds_accname:tds['tds_accname']})
            this.status=true;
          });
      }
    }

    OnChangeTransportatinRate(transporter_rate, index)
      {
        console.log("enter")
        let chargecode=this.sales_Order_Trans_Chgs_dyn.at(index).get("charge_code").value;
        if(transporter_rate.length)
        {
          this.ChargeList[index].forEach(ele=>
            {
              if(ele.trans_charge_code==chargecode)
              {
                if( this.sales_Order_Trans_Chgs_dyn.at(index).get("transport_rate").value == "PER TRUCK")
                {
                  this.sales_Order_Trans_Chgs_dyn.at(index).patchValue({chgs_rate_value:ele.full_truck_load_rate});
                }
                else
                {
                  this.sales_Order_Trans_Chgs_dyn.at(index).patchValue({chgs_rate_value:ele.rate_uom});
                }
              }
            })
        }   
      }


    showPopUp1(index)
    { 
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index};
      const dialogRef = this.dialog.open(TransportationpopupmodalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => 
      {this.sales_Order_Trans_Chgs_dyn.at(index).patchValue({tax_code: data["tax_id"], tax_rate: data["tax_rate"]});}); 
    }

    onchangeTransChargeCode(index, chargeId)
      {
        if(chargeId.length)
        {
          this.ChargeList[index].forEach(ele=>
            {
              if(ele.trans_charge_code==chargeId)
              {

                if( this.sales_Order_Trans_Chgs_dyn.at(index).get("transport_rate").value == "PER TRUCK")
                {
                  this.selectedTransacc[index] =ele.transportation_acc;
                  this.selectedTdsacc[index] = ele.tds_acc;
                  this.sales_Order_Trans_Chgs_dyn.at(index).patchValue({chgs_rate_value:ele.full_truck_load_rate,distance_in_km:ele.distance_in_km,
                    uom:ele.uom,
                    tax_code:ele.tax_code,
                    tax_rate:ele.tax_rate,
                    transportation_acc:ele.transportation_acc,
                   
                    allowed_shortage:ele.allowed_shortage,
                    deduction_basedon:ele.deduction_basedon});
                 
                }
                else
                {
                  this.selectedTransacc[index] =ele.transportation_acc;
                  this.selectedTdsacc[index] = ele.tds_acc;
                  this.sales_Order_Trans_Chgs_dyn.at(index).patchValue({chgs_rate_value:ele.rate_uom,distance_in_km:ele.distance_in_km,
                    uom:ele.uom,
                    tax_code:ele.tax_code,
                    tax_rate:ele.tax_rate,
                    transportation_acc:ele.transportation_acc,
                  
                    allowed_shortage:ele.allowed_shortage,
                    deduction_basedon:ele.deduction_basedon});
                }
              

              }
            })
          this.sales_Order_Trans_Chgs_dyn.at(index).patchValue({charge_code:chargeId});
        }   
      }

    itemCode:any;
    showPopUp2(index)
    {
      this.itemCode = this.sales_Order_Item_Dtls.at(index).get('item_code').value as FormControl;    
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index, item_code: this.itemCode};
      const dialogRef = this.dialog.open(SalesQcPopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe( data => 
      {
        this.sales_Order_Item_Dtls.at(index).patchValue({acc_norms: data["qc_code"]});
      }); 
    }

    getTransacc(transacc,index)
    {
      //console.log("transacc:"+transacc)
        if(transacc.length)
        {
          this.sales_Order_Trans_Chgs_dyn.at(index).patchValue({transportation_acc:transacc})
        }
    }
    
    getTdsacc(trans,index)
    {
        if(trans.length)
        {
          this.sales_Order_Trans_Chgs_dyn.at(index).patchValue({tds_acc:trans})
        }
    }
    onchangeTdsCode(event, index)
    {
      if(event.target.value !="0")
      {
        this.status = false;
        this.DropDownListService.tdsAccount(event.target.value).subscribe(data=>
        {
          this.sales_Order_Trans_Chgs_dyn.at(index).patchValue({tds_rate: data.tds_rate});   
          this.status = true;
        });     
      }     
    }

    _item_qty:any;
    _packing_qty:any;
    _mrp:any;
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
      this._packing_qty = packingQty.target.value;
     // this._item_qty = this.capacity[index] * packingQty.target.value;
      this._item_uom = this.sales_Order_Item_Dtls.at(index).get("uom").value as FormControl;

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
            console.log("Check  :::  "+this.sales_Order_Item_Dtls.at(index).get("uom").value)
            if(this.sales_Order_Item_Dtls.at(index).get("uom").value=="PCS")
            {
              this._item_qty = Math.round(this.capacity[index] * this._packing_qty);
            }
            else
            {
              alluom.forEach(element => {
                if(element.description == this.sales_Order_Item_Dtls.at(index).get("uom").value)
                {
                  this._item_qty =  Number(this.capacity[index] * this._packing_qty).toFixed(Number(element.decimalv));
                }
              });
              
            }
             //this.sales_Order_Item_Dtls.at(index).patchValue({quantity: this._item_qty.toFixed(3), mat_wt: this._item_qty.toFixed(3),tolerance_qty:this._item_qty.toFixed(3)});
              this.sales_Order_Item_Dtls.at(index).patchValue({quantity: this._item_qty, mat_wt: this._item_qty, toleranceqty: this._item_qty}); 
              
              //vineet ends

            

            this._mrp = this.sales_Order_Item_Dtls.at(index).get("price").value as FormControl;
            this._priceBasedOn = this.sales_Order_Item_Dtls.at(index).get('price_based_on').value as FormControl;
            this._discount = this.sales_Order_Item_Dtls.at(index).get('discount_rate').value as FormControl;
            this._discountBasadOn = this.sales_Order_Item_Dtls.at(index).get('discount_type').value as FormControl;
            this._taxrate = this.sales_Order_Item_Dtls.at(index).get('tax_rate').value as FormControl;
            this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
              this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)   
              let Idd:number = Number(this.userForm.get("id").value);
              if(Idd>0)
              {
                this.calNetAmt();
              }
      //console.log(this._weighmentUom +" // " + this._item_uom)
            if(this._weighmentUom == this._item_uom)
            { this.sales_Order_Item_Dtls.at(index).patchValue({con_factor: 0});}
            else 
            {
              if(this._weighmentUom != 0)
              {
                if( this.sales_Order_Item_Dtls.at(index).get("con_factor").value ==null || this.sales_Order_Item_Dtls.at(index).get("con_factor").value =="")
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
                      con_wt=Number(this._item_qty) * Number(this.sales_Order_Item_Dtls.at(index).get("con_factor").value);
                     
                      this.sales_Order_Item_Dtls.at(index).patchValue({mat_wt:con_wt.toFixed(3)});

                        this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
                        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index);
                        this.calNetAmt();  
                  }
                }
                //console.log("here check  tuhin "+ this._weighmentUom +" / " + this.con_factor + " / " + this._item_qty + " / " + this.cal_method)
                if(this.cal_method == "Multiply")
                {
                  this.sales_Order_Item_Dtls.at(index).patchValue({con_factor: parseFloat(this.con_factor) * parseFloat(this._item_qty)});
                }
                
                
                if(this.cal_method == "Division")
                {
                  this.sales_Order_Item_Dtls.at(index).patchValue({con_factor: parseFloat(this._item_qty) / parseFloat(this.con_factor)}); 
                }
              
              }
            }

      }



      
    }

    getconfactorwt(index)
    {
      this._item_uom = this.sales_Order_Item_Dtls.at(index).get("uom").value as FormControl;
      if(this._weighmentUom == this._item_uom)
      {
        
      }
      else
      {
              
            this._packing_qty = this.sales_Order_Item_Dtls.at(index).get("squantity").value;
            this._item_qty = this.sales_Order_Item_Dtls.at(index).get("quantity").value;
          
            let con_wt:number=0;
            con_wt=Number(this._item_qty) * Number(this.sales_Order_Item_Dtls.at(index).get("con_factor").value);
          
            this.sales_Order_Item_Dtls.at(index).patchValue({mat_wt:con_wt.toFixed(3)});
            

            this._mrp = this.sales_Order_Item_Dtls.at(index).get("price").value as FormControl;
            this._priceBasedOn = this.sales_Order_Item_Dtls.at(index).get('price_based_on').value as FormControl;
            this._discount = this.sales_Order_Item_Dtls.at(index).get('discount_rate').value as FormControl;
            this._discountBasadOn = this.sales_Order_Item_Dtls.at(index).get('discount_type').value as FormControl;
            this._taxrate = this.sales_Order_Item_Dtls.at(index).get('tax_rate').value as FormControl;
            this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
            this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)   


      }
      
      
    }

    getItemQty(itemQty, index)
    {
     
      this._item_qty = itemQty.target.value;

      //getItemQty
      //tolerance work starts
      console.log("check uom code :: "+this.sales_Order_Item_Dtls.at(index).get("uom").value)
      let mintolerence:number = Number(this.sales_Order_Item_Dtls.at(index).get("tolerance_qty").value) * (100-Number(this.sales_Order_Item_Dtls.at(index).get("item_tolerance").value))/100;
      let maxtolerence:number = Number(this.sales_Order_Item_Dtls.at(index).get("tolerance_qty").value) * (100+Number(this.sales_Order_Item_Dtls.at(index).get("item_tolerance").value))/100 ;
      
      let minstatus:boolean = false;
      let maxstatus:boolean = false;
      minstatus=Number(this._item_qty) >=mintolerence;
      maxstatus= Number(this._item_qty) <= maxtolerence;

      console.log("check Tol :: "+mintolerence+" // "+maxtolerence+" // "+minstatus+" // "+maxstatus)

     if( maxstatus==true && minstatus ==true)
      {
         // console.log("check:::"+this._item_qty)
          // this.sales_Order_Item_Dtls.at(index).patchValue({mat_wt: (Math.round((this._item_qty - (this.empty_bag_wt[index] * (itemQty.target.value/this.capacity[index])))*1000)/1000).toFixed(3),squantity:Number(this._item_qty)/Number(this.capacity[index])});
          
          //here need changes for gunny bags
          if( this.sales_Order_Item_Dtls.at(index).get("con_factor").value ==null || this.sales_Order_Item_Dtls.at(index).get("con_factor").value =="")
          {
            if(this._weighmentUom == this._item_uom)
            {
              this.sales_Order_Item_Dtls.at(index).patchValue({mat_wt: Number(this._item_qty).toFixed(3),squantity:Number(this._item_qty)/Number(this.capacity[index])});
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
              con_wt=Number(this._item_qty) * Number(this.sales_Order_Item_Dtls.at(index).get("con_factor").value);
              
              this.sales_Order_Item_Dtls.at(index).patchValue({mat_wt:con_wt.toFixed(3)});
            }
                

                    
          }

         // this.sales_Order_Item_Dtls.at(index).patchValue({mat_wt: Number(this._item_qty).toFixed(3),squantity:Number(this._item_qty)/Number(this.capacity[index])});//changes due to weight change
        
          this._packing_qty = this.sales_Order_Item_Dtls.at(index).get("squantity").value as FormControl;
 
          this._mrp = this.sales_Order_Item_Dtls.at(index).get("price").value as FormControl;
          this._priceBasedOn = this.sales_Order_Item_Dtls.at(index).get('price_based_on').value as FormControl;
          this._discount = this.sales_Order_Item_Dtls.at(index).get('discount_rate').value as FormControl;
          this._discountBasadOn = this.sales_Order_Item_Dtls.at(index).get('discount_type').value as FormControl;
          this._taxrate = this.sales_Order_Item_Dtls.at(index).get('tax_rate').value as FormControl;
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
          this.sales_Order_Item_Dtls.at(index).patchValue({mat_wt: Number(this.sales_Order_Item_Dtls.at(index).get("tolerance_qty").value).toFixed(3),squantity:Number(this.sales_Order_Item_Dtls.at(index).get("tolerance_qty").value)/Number(this.capacity[index]),quantity:this.sales_Order_Item_Dtls.at(index).get("tolerance_qty").value});
        }
        else
        {
          let con_wt:number=0;
          con_wt=Number(this._item_qty) * Number(this.sales_Order_Item_Dtls.at(index).get("con_factor").value);
          
          this.sales_Order_Item_Dtls.at(index).patchValue({mat_wt:con_wt.toFixed(3)});
        }


        this._packing_qty = this.sales_Order_Item_Dtls.at(index).get("squantity").value as FormControl;

        this._mrp = this.sales_Order_Item_Dtls.at(index).get("price").value as FormControl;
        this._priceBasedOn = this.sales_Order_Item_Dtls.at(index).get('price_based_on').value as FormControl;
        this._discount = this.sales_Order_Item_Dtls.at(index).get('discount_rate').value as FormControl;
        this._discountBasadOn = this.sales_Order_Item_Dtls.at(index).get('discount_type').value as FormControl;
        this._taxrate = this.sales_Order_Item_Dtls.at(index).get('tax_rate').value as FormControl;
        this.calculateItemData(this._packing_qty, this.sales_Order_Item_Dtls.at(index).get("tolerance_qty").value, this._mrp, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)   
        this.calNetAmt();
      }

       //tolerance work ends

     

        

    }

    getPrice(price, index)
    {
      this._packing_qty = this.sales_Order_Item_Dtls.at(index).get("squantity").value as FormControl;
      this._item_qty= this.sales_Order_Item_Dtls.at(index).get("quantity").value as FormControl;
      this._mrp  = price.target.value;
      this._priceBasedOn = this.sales_Order_Item_Dtls.at(index).get('price_based_on').value as FormControl;
      this._discount = this.sales_Order_Item_Dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = this.sales_Order_Item_Dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.sales_Order_Item_Dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)
        
        this.calNetAmt();
    }

    onChangePriceBasedOn(price_based_on, index)
    {
      this._packing_qty = this.sales_Order_Item_Dtls.at(index).get("squantity").value as FormControl;
      this._item_qty= this.sales_Order_Item_Dtls.at(index).get("quantity").value as FormControl;
      this._mrp  = this.sales_Order_Item_Dtls.at(index).get('price').value as FormControl;
      this._priceBasedOn = price_based_on.target.value;
      this._discount = this.sales_Order_Item_Dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = this.sales_Order_Item_Dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.sales_Order_Item_Dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index) 

        this.calNetAmt();
    }

    getDiscount(discount, index)
    {
      this._packing_qty = this.sales_Order_Item_Dtls.at(index).get("squantity").value as FormControl;
      this._item_qty= this.sales_Order_Item_Dtls.at(index).get("quantity").value as FormControl;
      this._mrp  = this.sales_Order_Item_Dtls.at(index).get('price').value as FormControl;
      this._priceBasedOn = this.sales_Order_Item_Dtls.at(index).get('price_based_on').value as FormControl;
      this._discount = discount.target.value;
      this._discountBasadOn = this.sales_Order_Item_Dtls.at(index).get('discount_type').value as FormControl;
      this._taxrate = this.sales_Order_Item_Dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index) 
        this.calNetAmt();
    }

    onChangeDiscountBasedOn(dis_based_on, index)
    {
      this._packing_qty = this.sales_Order_Item_Dtls.at(index).get("squantity").value as FormControl;
      this._item_qty= this.sales_Order_Item_Dtls.at(index).get("quantity").value as FormControl;
      this._mrp  = this.sales_Order_Item_Dtls.at(index).get('price').value as FormControl;
      this._priceBasedOn = this.sales_Order_Item_Dtls.at(index).get('price_based_on').value as FormControl;
      this._discount = this.sales_Order_Item_Dtls.at(index).get('discount_rate').value as FormControl;
      this._discountBasadOn = dis_based_on.target.value;
      this._taxrate = this.sales_Order_Item_Dtls.at(index).get('tax_rate').value as FormControl;
      this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
        this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index) 
        this. calNetAmt();
    }

    capacity:any = [];
    //starts here 
    onChangeItemName(index, itemId)
    {
      if(itemId.length)
      {
        this.status = false;
        this.selectedPackingItem[index] = [];
        this.sales_Order_Item_Dtls.at(index).patchValue({item_code: itemId});
        forkJoin(
          this.DropDownListService.getItemNameById(itemId,this.company_name),
          this.DropDownListService.getItemMasterPackMat(itemId),
          this.DropDownListService.getItemMasterInvData1(itemId,this.company_name),
          this.DropDownListService.retriveItemMasterStatInfo(itemId,this.company_name),
          this.DropDownListService.getItemQCDetails(itemId,this.company_name)
        ).subscribe(([data, data1, data2, data3, data4])=>
        {
          //console.log("Hello "+JSON.stringify(data3))
          //add tax api
          this.sales_Order_Item_Dtls.at(index).patchValue({hsn_code:data.hsn_code}); 
          forkJoin(  
            this.DropDownListService.getUomName(data.mstock_unit),
            this.DropDownListService.taxlistbycode(data3[0].tax_code)
            ).subscribe(([data,taxcode])=>
          { 
           // console.log(JSON.stringify(taxcode));

            this.sales_Order_Item_Dtls.at(index).patchValue({
            cgst_amt: taxcode["cgst_act_val"],sgst_amt: taxcode["sgst_act_val"],igst_amt: taxcode["igst_act_val"]});
             
            
          //  console.log("tax rate tuhin  :: " + taxcode["tax_rate"]);


          //  this._taxrate = taxcode.tax_rate;

            this.status = true;
            this.sales_Order_Item_Dtls.at(index).patchValue({uom:data.description}); 
            if(this._weighmentUom == data.description)
            {
              this.sales_Order_Item_Dtls.at(index).patchValue({con_factor: 0});
            }
            else
            {
              if(this._weighmentUom != 0)
              {
                this._item_qty = this.sales_Order_Item_Dtls.at(index).get("quantity").value as FormControl;
                if(this.cal_method == "Multiply")
                this.sales_Order_Item_Dtls.at(index).patchValue({con_factor: parseFloat(this.con_factor) * parseFloat(this._item_qty)});
                if(this.cal_method == "Division")
                this.sales_Order_Item_Dtls.at(index).patchValue({con_factor: parseFloat(this._item_qty) / parseFloat(this.con_factor)}); 
              }
            }


            
          this.packingItem[index] = data1;
          this.sales_Order_Item_Dtls.at(index).patchValue({price: data2["mrp"]});
          this.sales_Order_Item_Dtls.at(index).patchValue({tax_code:data3[0].tax_code, tax_rate:data3[0].tax_rate});
          this.sales_Order_Item_Dtls.at(index).patchValue({acc_norms:data4[0].qc_code});
          this._packing_qty = this.sales_Order_Item_Dtls.at(index).get("squantity").value as FormControl;
          this._item_qty= this.sales_Order_Item_Dtls.at(index).get("quantity").value as FormControl;
          this._mrp  = data2["mrp"];
          this._priceBasedOn = this.sales_Order_Item_Dtls.at(index).get('price_based_on').value as FormControl;
          this._discount = this.sales_Order_Item_Dtls.at(index).get('discount_rate').value as FormControl;
          this._discountBasadOn = this.sales_Order_Item_Dtls.at(index).get('discount_type').value as FormControl;
          //this._taxrate = data3[0].tax_rate;
          this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
          this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)  
          this.status = true;

          });
/*
          if(this.userForm.get("id").value>0)
          {
            this.sales_Order_Item_Dtls.at(index).patchValue({packing:'',quantity:0,squantity:0,mat_wt:0});
          }
*/
this.sales_Order_Item_Dtls.at(index).patchValue({packing:'',quantity:0,squantity:0,mat_wt:0});
        }); 
      }
    }

    _item_code:any;
    onChangePackingItem(index, packingId)
    {
      if(packingId.length)
      {
        this.status = false;
        this.selectedPackingItem[index] = packingId;
        this.sales_Order_Item_Dtls.at(index).patchValue({packing: packingId})
        this._item_code =  this.sales_Order_Item_Dtls.at(index).get("item_code").value as FormControl;
        this._packing_qty =  this.sales_Order_Item_Dtls.at(index).get("squantity").value as FormControl;
        this._mrp  = this.sales_Order_Item_Dtls.at(index).get('price').value as FormControl;
        this._priceBasedOn = this.sales_Order_Item_Dtls.at(index).get('price_based_on').value as FormControl;
        this._discount = this.sales_Order_Item_Dtls.at(index).get('discount_rate').value as FormControl;
        this._discountBasadOn = this.sales_Order_Item_Dtls.at(index).get('discount_type').value as FormControl;
        this._taxrate = this.sales_Order_Item_Dtls.at(index).get('tax_rate').value as FormControl;
        
        let checkpackingalreadyexist:boolean=false;
        for(let p=0;p<this.sales_Order_Item_Dtls.length;p++)
        { 
           if(this.sales_Order_Item_Dtls.at(p).get("item_code").value && p!=index && this.sales_Order_Item_Dtls.at(p).get("packing").value==packingId) 
           {
            checkpackingalreadyexist=true;
           }
        }
        if(checkpackingalreadyexist ==true)
           {
            this.sales_Order_Item_Dtls.at(index).patchValue({item_code:'0',packing:'0'});
            //this.selectedItemName[index]="0";
            this.deleteItems(index);
            alert("Item And Packing Name Are Same,Please Change...");
            this.status = true; 
           }
        else
        {
        forkJoin(
        this.DropDownListService.getItemPackUom(this._item_code, packingId,this.company_name),
        this.DropDownListService.getWeighmentCustomUOM(),
        this.DropDownListService.getItemNameByIdNew(packingId,this.company_name),
        
        )
        .subscribe(([data,customUomList,packingdata])=>
        {  
          this.status = true; 
          //console.log("empty bag wt: "+JSON.stringify(packingdata)); 
          this.capacity[index] = data.capacity; 
          this.empty_bag_wt[index] = data.empty_big_wt;
          this._item_qty = this.capacity[index] * this._packing_qty;
         
         /* this.DropDownListService.getRateChartItemSO(this._item_code, packingId,this.company_name,this.userForm.get("business_unit").value,this.userForm.get("order_date").value)
          .subscribe(rate=>
            {
              this.sales_Order_Item_Dtls.at(index).patchValue({ratechartamt:rate["rate"],ratecharttol:rate["tolerance"]}); 
              this.status = true; 
            })
            */
          //this.sales_Order_Item_Dtls.at(index).patchValue({suom: data.uom1, quantity: this._item_qty,item_tolerance:data["tolerance"]}); 
          this.sales_Order_Item_Dtls.at(index).patchValue({suom: packingdata.mstock_unit_name, quantity: this._item_qty,item_tolerance:data["tolerance"]}); 
          this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
            this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index) 
            
          });
        }
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
      {this.discountAmt = discount*Number(this.sales_Order_Item_Dtls.at(index).get("mat_wt").value)}

      if(discountBasedOn == "%")
      {this.discountAmt =  this.amt * (discount / 100);}

      if(discountBasedOn == "0")
      {this.discountAmt = 0}
/*
      // Vineet Start Here
      let rateamt=this.sales_Order_Item_Dtls.at(index).get("ratechartamt").value;
      //console.log("AMT: "+rateamt);
      let ratetol=this.sales_Order_Item_Dtls.at(index).get("ratecharttol").value;
      //console.log("TOL: "+ratetol);
      let minratetol=Number(rateamt)*(100-Number(ratetol))/100;
      //console.log("MIN: "+minratetol);
      let maxratetol=Number(rateamt)*(100+Number(ratetol))/100;
      //console.log("MAX: "+maxratetol);
      let mincheck:boolean=false;
      let maxcheck:boolean=false;
      mincheck=Number(this.sales_Order_Item_Dtls.at(index).get("price").value)>=Number(minratetol);
      //console.log("T/F: "+mincheck);
      maxcheck=Number(this.sales_Order_Item_Dtls.at(index).get("price").value)<=Number(maxratetol);
      //console.log("T1/F1: "+maxcheck);
      if(mincheck==true && maxcheck==true)
      {

        this.sales_Order_Item_Dtls.at(index).patchValue({rateres:"YES"});
        this.hallu[index]="YES"
      }
      else
      {
        this.sales_Order_Item_Dtls.at(index).patchValue({rateres:"NO"});
        this.hallu[index]="NO"
      }
      // Vineet Ends Here
*/
      let netAmt = this.amt - this.discountAmt;
      //console.log("taxrate :: "+taxrate)
      if(taxrate == 0  || this.sales_Order_Item_Dtls.at(index).get("cgst_amt").value==null)
      {
        this._taxAmt = 0;
      }  
      else
      {

        let cgst_amt = this.sales_Order_Item_Dtls.at(index).get("cgst_amt").value;
        let sgst_amt = this.sales_Order_Item_Dtls.at(index).get("sgst_amt").value;
        let igst_amt = this.sales_Order_Item_Dtls.at(index).get("igst_amt").value;

        if( cgst_amt == 0 && sgst_amt == 0 && igst_amt == 0)
        {
          //console.log("1")
          this._taxAmt = 0;
        }
        else if(cgst_amt == 0)
        {
         // console.log("2")
          this._taxAmt = Number(netAmt *(taxrate/100)).toFixed(2);
        }
        else
        {
         // console.log("3")
        
          let csgt_final=Number(netAmt *(cgst_amt/100)).toFixed(2);
         
          
          let sgst_final=Number(netAmt *(sgst_amt/100)).toFixed(2);
          this._taxAmt = Number(csgt_final)+ Number(sgst_final);
        //  console.log(this._taxAmt + "  // " + Number(csgt_final)+ Number(sgst_final));
        }


        
      }
      this._totalAmt = Number(this._taxAmt + netAmt).toFixed(2);
      this.sales_Order_Item_Dtls.at(index).patchValue({amount: this.amt.toFixed(2), 
        discount_amt: this.discountAmt.toFixed(2), tax_amt: this._taxAmt, 
        total_amt: this._totalAmt});
    }

    reftype:any;
    onChangeMatTab(event)
    {
      this.reftype = this.userForm.get("ref_type").value as FormControl;
      if(event.index == 3)
      {
        this.calNetAmt();
      }
    }

    calNetAmt()
    {
      let totalDisAmt:number = 0;
      let totalTaxAmt:number = 0;
      let _totalAmt:number = 0;
      let _netAmt:number = 0;
      let _netRValue:number = 0;
      for(let index=0; index<this.sales_Order_Item_Dtls.length; index++)
      {
        this.discountAmt = this.sales_Order_Item_Dtls.at(index).get('discount_amt').value as FormControl;
        totalDisAmt = parseFloat(this.discountAmt) + totalDisAmt;
        this.amt = this.sales_Order_Item_Dtls.at(index).get('amount').value as FormControl;
        _totalAmt = _totalAmt + parseFloat(this.amt);
        this._taxAmt = this.sales_Order_Item_Dtls.at(index).get('tax_amt').value as FormControl;
        totalTaxAmt = totalTaxAmt + parseFloat(this._taxAmt) 
      }
      _netRValue = _totalAmt - totalDisAmt - this._applicableBrokerage;
      _netAmt = _netRValue +  this._applicableBrokerage + totalTaxAmt;
      this.sales_Order_Summary.patchValue({item_total: _totalAmt.toFixed(2), discount:totalDisAmt.toFixed(2), 
        tax_total: totalTaxAmt.toFixed(2), net_amount: _netAmt.toFixed(2),
        net_r_value: _netRValue.toFixed(2)});
    }

    onChangeApplicableCharges(applicable_charges_id:string)
    {
      if(applicable_charges_id != "0")
      {
        this.status = false;
        this.DropDownListService.getChargeMasterDtlsList(applicable_charges_id).subscribe(data=>
        {
          this.status = true;;
          let i =0;
          this.add3();
          while(this.sales_Order_Summary_dyn.length)
          this.sales_Order_Summary_dyn.removeAt(0);

          for(let data1 of data)
          {
            this.add3();
            this.sales_Order_Summary_dyn.at(i).patchValue({charge_name: data1.charge_name,add_less:data1.method,
            rate_cal_method: data1.rate_cal,tax_rate: data1.tax_rate});
            i=i+1;
          }
        });
      }
      else
      {
       
        while(this.sales_Order_Summary_dyn.length)
        this.sales_Order_Summary_dyn.removeAt(0);
        this.add3();
      }
    }

    onChangeBrokerName(brokerId:string, index)
    {
      this.sales_Order_Broker_Dtls.at(index).patchValue({basis: "0", rate: 0, based_on: ''});
      if(brokerId != "0")
      {
        this.status = false; 
        this.sales_Order_Broker_Dtls.at(index).patchValue({broker_code: brokerId})
       
        this.DropDownListService.getCustomerBrokerDtls(this._customerId, brokerId).subscribe(data=>          
        {
          this.sales_Order_Broker_Dtls.at(index).patchValue({
            basis: data.basis, rate: data.rate, based_on: data.based_on});
          this.status = true; 
        });
      }
      
    }

    getBrokerName(_customerId:string, index)
    {
      this.brokerNames[index] = [];
      //alert(_customerId);
      this.DropDownListService.custBrokerRetriveList(_customerId).subscribe(data=>          
        {
         //  console.log("Broker data: "+JSON.stringify(data));
         this.brokerNames[index]=data;
          this.status = true; 
        });
    }

    partnerId:any;
    onChangeContactName(index, event)
    {
      this.sales_Order_Party_Dtls.at(index).patchValue({cp_contact: null}); 
      if(event != "0")
      {
        this.status = false;
        this.partnerId = this.sales_Order_Party_Dtls.at(index).get("p_code").value as FormControl;
        this.DropDownListService.custContactByName(this.partnerId, event,this.company_name).subscribe(data=>{
        this.sales_Order_Party_Dtls.at(index).patchValue({cp_contact: data.mobile});  this.status = true; });
      }
    }

    onChangePartyName(party_id:string, index)
    {
      this.contNameList[index] = [];
      this.sales_Order_Party_Dtls.at(index).patchValue({tcs_rate: null,tcs_applicable: null, cp_contact: null});        
      if(party_id != "0")
      {
        this.status = false; 
        this.DropDownListService.custAddDtlsRetriveList(party_id,this.company_name).subscribe(contactName=>
        { 
          this.DropDownListService.custAccountRetriveList(party_id,this.company_name).subscribe(data=>
          { 
           // console.log("here13::"+data["tcs_applicable"])
            this.status = true;  
            this.sales_Order_Party_Dtls.at(index).patchValue({tcs_rate: data["tcs_rate"],tcs_applicable: data["tcs_applicable"]});        
            this.contNameList[index] = contactName;  
          });  
        });
      }
    }

    onChangeCustomerChannel(channel_id:string)
    {
      if(channel_id.length && channel_id != "0")
      {
        let i =0 ;
        this.contNameList=[];
        this.selectedPartyName = [];
      
        this.addParty();
        this.party_sl_no = 0;
        while(this.sales_Order_Party_Dtls.length)
        this.sales_Order_Party_Dtls.removeAt(0);

        this.DropDownListService.getCustomerByChannel(channel_id).subscribe(data=>
        {
          this.partyList = data;

          let channelsup:any=[];
          channelsup=this.partyList;
          let channelsuplist='';
  
          channelsup.forEach(element => {
            channelsuplist+=element.cp_Id+',';
          });
          
          this.userForm.patchValue({cust_channel_list:channelsuplist.substring(0,channelsuplist.length-1)});

          this.partyNameList=data;
          for(let data1 of data)
          {
            this.status = false;
            forkJoin(
              this.DropDownListService.custAddDtlsRetriveList(data1["cp_Id"],this.company_name),
              this.DropDownListService.custAccountRetriveList(data1["cp_Id"],this.company_name)
            ).subscribe(([contactName, custAccountData])=>
              {
                console.log("here 12::"+JSON.stringify(contactName))
                console.log("Account v::"+JSON.stringify(custAccountData))
                this.addParty();
                this.contNameList[i]  = contactName; 
                this.selectedPartyName[i] = data1["cp_Id"]
                this.sales_Order_Party_Dtls.at(i).patchValue({p_code: data1["cp_Id"], tcs_rate: custAccountData["tcs_rate"], tcs_applicable: custAccountData["tcs_applicable"]});
                i = i + 1;
                this.status = true; 
              });
          }

        });        
      }
    }


    showList(s:string)
    {
      this.Id= this.userForm.get("id").value as FormControl;
      this.status = false;
     
      if(this.salesordersave == true  && this.salesorderupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        { 
          this.BuUnit = "0";
          this.Shipment_Mode = "0";
          this.App_Chgs="0";
          this.Approved = "0";
          this.Reason ="0";
          this.deliverychallanstatus=true;
          this.status=false;

          forkJoin(
            this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
            this.DropDownListService.getInvSalesTypes(),
            this.DropDownListService.payTermNameList(),
           // this.DropDownListService.getWeighmentCustomUOM(),  //06062022 off 
            this.DropDownListService.getCustomUOMs("WUOM"), //06062022 add for weighment uom
            this.DropDownListService.getBankLedger(),
            this.DropDownListService.newcustomerList(this.company_name),
            this.DropDownListService.reasonList(),
            //this.Service.getChannelCust(),
            this.Service.getChannelCustForSales(),
            this.DropDownListService.getEmployeeNamenew(this.company_name),
            this.DropDownListService.getChargeMasterList(),
            this.DropDownListService.transporterNamesList(),
            this.DropDownListService.areaList()
         ).subscribe(([ bUnitData,invoiceData, payTermData, customUomData, bankLedgerData, CustomerData,reasonData, channelData, employeeData, chargeData, TransporterData, area])=>
            {
              this.bussiness_unit_list=bUnitData;
              this.invoiceType = invoiceData;
              this.payTerms  = payTermData;
              this.customUOMs = customUomData;
              this.uoms = customUomData;
             // this.listSalesOrder  = salesOrderData;
              this.bank_names  = bankLedgerData;
              this.partyNameList  = CustomerData;
              this.reasonIdList = reasonData;
              this.channel_master_list = channelData;
              this.employeeNames = employeeData;
              this.chargesIdList  = chargeData;
              this.businesslists=bUnitData;
              this.trans_codes  = TransporterData;
              this.areaList  =area;
              this.Confirmed_By="0";
              //console.log("custo :: "+JSON.stringify(customUomData))
              this.Weigmentuom="CUM00002";
              this.Inv_type="INV00001";
              console.log(localStorage.getItem("username"));
              console.log("custo :: "+JSON.stringify(employeeData))

              this.userForm.patchValue({we_uom: "CUM00002", app_chgs_id: "0", sales_person: "0", inv_type: "INV00001",
                confirmed_by: "0", reason: "0", cust_channel: "0", customer: "0"});
                this.onChangeWgmtUom(this.Weigmentuom);
                this.onChangewithinvoicetype(this.Inv_type);

              this.sales_Order_Item_Dtls.at(0).patchValue({item_code: "0", packing: "0", uom: '', quantity: 0, squantity: 0, price: 0, tax_rate: 0,
                price_based_on: "0", discount_rate: 0, discount_type: "0"}); 
              this.sales_Order_Terms_Con.patchValue({payment_mode: "0", bic_swift_code: '', payment_term: "0"})
              this.sales_Order_Trans_Info.patchValue({trans_code: "0", trans_borne_by: "FOB"})
              this.sales_Order_Shipment_Dtls.patchValue({ pay_addr: "0"});
              this.sales_Order_Party_Dtls.at(0).patchValue({p_code: "0"});
              this.selectedPartyName[0] = "0";
              this.PartyAllList = CustomerData;
    //this.BuUnit=
              this.BuUnit = "CBU00001";
    
              this.status = true;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()}); 
        



          for(let i=0;i<this.sales_Order_Party_Dtls.length;i++)
          {
            this.sales_Order_Party_Dtls.at(i).patchValue({p_code:"0",cp_name:"0"});
          }
          for(let i=0;i<this.sales_Order_Broker_Dtls.length;i++)
          {
            this.sales_Order_Broker_Dtls.at(i).patchValue({p_code:"0",broker_code:"0"});
          }
          this.userForm.patchValue({business_unit:"0"});
          if(this.Id>0)
          {
            this.OrderStatusList = [{display: "-Select-", value: "0"},{display: "Close", value: "Close"},{display: "Finalise", value: "Finalise"}];
          }
          else
          {
            this.OrderStatusList = [{display: "Finalise", value: "Finalise"},{display: "Pending", value: "Pending"}];
          }
  
          this.isHidden=true;
         
          this.Shipment_Mode = "0";
          for(let i=0;i<this.sales_Order_Party_Dtls.length;i++)
          {
            this.sales_Order_Party_Dtls.at(i).patchValue({p_code:"0",cp_name:"0"});
          }
          for(let i=0;i<this.sales_Order_Broker_Dtls.length;i++)
          {
            this.sales_Order_Broker_Dtls.at(i).patchValue({p_code:"0",broker_code:"0"});
          }
          //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
          this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
          this.userForm.patchValue({order_date: this.currentDate});

          this.orderType="Formal";
          this.reference_type="Open Sales Order";
          this.Price_term = "With Packing Weight";
          this.Receipt_Criteria="Own Weight";
          this._deliveryTerm="FOB";
          this.Shipment_Mode="By Road";
          this.Q_status="Finalise";
          

          this.userForm.patchValue({ app_chgs_id: "0", sales_person: "0",
          confirmed_by: "0", reason: "0", cust_channel: "0",order_type:"Formal" ,
          ref_type:"Open Sales Order", customer: "0",business_unit:"0",price_term:"With Packing Weight",
          receipt_criteria:"Own Weight",delivery_term:"FOB",shipment_mode:"By Road",q_status:"Finalise",trans_borne_by_chgs:"FOB"});

          this.transChgsDyn=false;
      
        
          this.onChangeOrderType(this.orderType);
          this.onChangeReferenceType(this.reference_type);
          this.onChangeDeliveryTerm(this._deliveryTerm);
          this.onChangeshipment(this.Shipment_Mode="By Road");

          this.sales_Order_Item_Dtls.at(0).patchValue({slno: 1, item_code: "0", packing: "0", uom: '', quantity: 0, squantity: 0, price: 0, tax_rate: 0,
            price_based_on: "0", discount_rate: 0, discount_type: "0"}); 
          this.sales_Order_Terms_Con.patchValue({payment_mode: "0", bic_swift_code: '', payment_term: "0"})
          this.sales_Order_Trans_Info.patchValue({trans_code: "0", trans_borne_by: "FOB"})
          this.sales_Order_Shipment_Dtls.patchValue({ pay_addr: "0"});
          this.sales_Order_Broker_Dtls.at(0).patchValue({slno: 1, broker_code: '0'})
          this.sales_Order_Party_Dtls.at(0).patchValue({sl_no: 1, p_code: "0"});
          this.sales_Order_Trans_Chgs_dyn.at(0).patchValue({slno: 1});
          this.status=true;
        }
      }

      if(this.salesordersave == true  && this.salesorderupdate == false)
      {
      if(s=="add")
        { 
         
          this.BuUnit = "0";
          this.Confirmed_By="0";
         
          this.Receipt_Criteria = "0";
          this.Shipment_Mode = "0";
          this.App_Chgs="0";
          this.Approved = "0";
          this.Reason ="0";
 
          forkJoin(
            this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
            this.DropDownListService.getInvSalesTypes(),
            this.DropDownListService.payTermNameList(),
           // this.DropDownListService.getWeighmentCustomUOM(),  //06062022 off 
            this.DropDownListService.getCustomUOMs("WUOM"), //06062022 add for weighment uom
            this.DropDownListService.getBankLedger(),
            this.DropDownListService.newcustomerList(this.company_name),
            this.DropDownListService.reasonList(),
           // this.Service.getChannelCust(),
            this.Service.getChannelCustForSales(),
            this.DropDownListService.getEmployeeNamenew(this.company_name),
            this.DropDownListService.getChargeMasterList(),
            this.DropDownListService.transporterNamesList(),
            this.DropDownListService.areaList()
        ).subscribe(([ bUnitData,invoiceData, payTermData, customUomData, bankLedgerData, CustomerData,reasonData, channelData, employeeData, chargeData, TransporterData, area ])=>
            {
            
              this.bussiness_unit_list =bUnitData;
              this.invoiceType = invoiceData;
              this.payTerms  = payTermData;
              this.customUOMs = customUomData;
           
              this.bank_names  = bankLedgerData;
              this.partyNameList  = CustomerData;
              this.reasonIdList = reasonData;
              this.channel_master_list = channelData;
              this.employeeNames = employeeData;
              this.chargesIdList  = chargeData;
             
              this.businesslists =bUnitData;
              this.trans_codes  = TransporterData;
              this.areaList  = area;
              this.Confirmed_By="0";
              this.Weigmentuom="CUM00002";
              this.Inv_type="INV00001";
             // console.log("custo :: "+JSON.stringify(customUomData))
             console.log(localStorage.getItem("username"));
             console.log("custo :: "+JSON.stringify(employeeData))
            
              this.userForm.patchValue({we_uom: "CUM00002", app_chgs_id: "0", sales_person: "0", inv_type: "INV00001",
              confirmed_by: "0", reason: "0", cust_channel: "0", customer: "0"});

              this.onChangeWgmtUom(this.Weigmentuom);
              this.onChangewithinvoicetype(this.Inv_type);

              this.sales_Order_Item_Dtls.at(0).patchValue({item_code: "0", packing: "0", uom: '', quantity: 0, squantity: 0, price: 0, tax_rate: 0,
              price_based_on: "0", discount_rate: 0, discount_type: "0"}); 
              this.sales_Order_Terms_Con.patchValue({payment_mode: "0", bic_swift_code: '', payment_term: "0"})
              this.sales_Order_Trans_Info.patchValue({trans_code: "0", trans_borne_by: "FOB"})
              this.sales_Order_Shipment_Dtls.patchValue({ pay_addr: "0"});
              this.sales_Order_Party_Dtls.at(0).patchValue({p_code: "0"});
              this.selectedPartyName[0] = "0";
              this.PartyAllList = CustomerData;
              this.BuUnit = "CBU00001";
              this.status = true;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()}); 
        


          for(let i=0;i<this.sales_Order_Party_Dtls.length;i++)
          {
            this.sales_Order_Party_Dtls.at(i).patchValue({p_code:"0",cp_name:"0"});
          }
          for(let i=0;i<this.sales_Order_Broker_Dtls.length;i++)
          {
            this.sales_Order_Broker_Dtls.at(i).patchValue({p_code:"0",broker_code:"0"});
          }
          this.userForm.patchValue({business_unit:"0"});
          if(this.Id>0)
          {
            this.OrderStatusList = [{display: "-Select-", value: "0"},{display: "Close", value: "Close"},
            {display: "Finalise", value: "Finalise"}];
          }
          else
          {
            this.OrderStatusList = [ {display: "Finalise", value: "Finalise"},{display: "Pending", value: "Pending"},
          ];
          }

          this.isHidden=true;
          
          this.Receipt_Criteria = "0";
          this.Shipment_Mode = "0";
          for(let i=0;i<this.sales_Order_Party_Dtls.length;i++)
          {
            this.sales_Order_Party_Dtls.at(i).patchValue({p_code:"0",cp_name:"0"});
          }
          for(let i=0;i<this.sales_Order_Broker_Dtls.length;i++)
          {
            this.sales_Order_Broker_Dtls.at(i).patchValue({p_code:"0",broker_code:"0"});
          }
          //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
          this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
         
          this.orderType="Formal";
          this.reference_type="Open Sales Order";
          this.Price_term = "With Packing Weight";
          this.Receipt_Criteria="Own Weight";
          this._deliveryTerm="FOB";
          this.Shipment_Mode="By Road";
          this.Q_status="Finalise";
          
          this.userForm.patchValue({order_date: this.currentDate});
          this.userForm.patchValue({ app_chgs_id: "0", sales_person: "0",
            confirmed_by: "0", reason: "0", cust_channel: "0", order_type: "Formal",ref_type:"Open Sales Order",
             customer: "0",business_unit:"0",price_term:"With Packing Weight",receipt_criteria:"Own Weight",
             delivery_term:"FOB",shipment_mode:"By Road",q_status:"Finalise"});

            this.onChangeOrderType(this.orderType);
            this.onChangeReferenceType(this.reference_type);
            this.onChangeDeliveryTerm(this._deliveryTerm);
            this.onChangeshipment(this.Shipment_Mode="By Road");
           
          this.sales_Order_Item_Dtls.at(0).patchValue({slno: 1, item_code: "0", packing: "0", uom: '', quantity: 0, squantity: 0, price: 0, tax_rate: 0,
            price_based_on: "0", discount_rate: 0, discount_type: "0"}); 
          this.sales_Order_Terms_Con.patchValue({payment_mode: "0", bic_swift_code: '', payment_term: "0"})
          this.sales_Order_Trans_Info.patchValue({trans_code: "0", trans_borne_by: "FOB"})
          this.sales_Order_Shipment_Dtls.patchValue({ pay_addr: "0"});
          this.sales_Order_Broker_Dtls.at(0).patchValue({slno: 1, broker_code: '0'})
          this.sales_Order_Party_Dtls.at(0).patchValue({sl_no: 1, p_code: "0"});
          this.sales_Order_Trans_Chgs_dyn.at(0).patchValue({slno: 1});
          this.status = true;
        }
      }
     
      if(s=="list")
      {
        this.OrderType="0";
        this.isHidden=false;
        this.Confirmed_By="0";
        this.Reason ="0"
        this.action = 'update';
        this.BuUnit = "0";
        this.userForm.reset();
        this.Confirmed_By="0";
        this.App_Chgs="0";
        this.item_sl_no = 0;
        this.Approved = "0";
        this.packingItem = [];
        this.selectedItemName = [];
        this.selectedPackingItem = [];
        while(this.sales_Order_Item_Dtls.length)
        this.sales_Order_Item_Dtls.removeAt(0);
        this.addItems();

        this.broker_sl_no = 0;
        this.selectedBrokerName = [];
        while(this.sales_Order_Broker_Dtls.length)
        this.sales_Order_Broker_Dtls.removeAt(0);
        this.addBrokers();

        this.party_sl_no = 0;
        this.selectedPartyName = [];
        while(this.sales_Order_Party_Dtls.length)
        this.sales_Order_Party_Dtls.removeAt(0);
        this.addParty();

        while(this.sales_Order_Docs.length)
        this.sales_Order_Docs.removeAt(0);
        this.add2(); 
        
        while(this.sales_Order_Summary_dyn.length)
        this.sales_Order_Summary_dyn.removeAt(0);
        this.add3(); 
        
        let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
           this.salesordersave= false;
           this.salesorderupdate=false;
           this.salesorderview=false;
           this.salesorderdelete=false;
           this.salesorderprint = false
         
           if(accessdata.includes('sales_order.save'))
           {
            this.salesordersave = true;
           }
          if(accessdata.includes('sales_order.update'))
           { 
             this.salesorderupdate=true;
           }
           if(accessdata.includes('sales_order.view'))
           {
             this.salesorderview=true;
           }
           if(accessdata.includes('sales_order.delete'))
           {
             this.salesorderdelete=true;
           }
           if(accessdata.includes('sales_order.print'))
           {
             this.salesorderprint=true;
           }

        this.status = true;
      }
    
    }

    addItems()
    {
      this.isPackingListReq[this.item_sl_no] = "false";
      this.item_sl_no =this.item_sl_no +1;
      
      this.sales_Order_Item_Dtls.push(this.fb.group({
        slno:this.item_sl_no,
        item_code:'',
        packing:'',
        hsn_code:'',
        quantity:'',
        uom:'',
        squantity:'',
        suom:'',
        con_factor:'',
        mat_wt:'',
        price:'',
        price_based_on:'',
        amount:'',
        discount_type:'',
        discount_rate:'',
        tolerance:'',
        tax_code:'',
        tax_rate: '',
        acc_norms:'',
        discount_amt:'',
        tax_amt:'',
        total_amt:'',
        packing_list_req:'',
        packing_list:'',
        item_tolerance:'0',
        tolerance_qty:'0',
        cgst_amt:'',
        sgst_amt:'',
        igst_amt:'',
        ratechartamt:'',
        ratecharttol:'',
        rateres:''}))
       
      this.sales_Order_Item_Dtls.at(this.item_sl_no - 1).patchValue({item_code: "0", packing: "0", uom: '', quantity: 0, squantity: 0, price: 0, tax_rate: 0,
        price_based_on: "0", discount_rate: 0, discount_type: "0"});
    }

    deleteItems(index) 
    {
      if(this.item_sl_no > 1)
      { 
        this.sales_Order_Item_Dtls.removeAt(index);
        if(this.packingItem[index] != undefined)
        { 
          this.packingItem.splice(index, 1);
          this.selectedPackingItem.splice(index, 1);
          this.capacity.splice(index, 1);
          this.hallu.splice(index, 1);
         // console.log("packing item: "+JSON.stringify(this.packingItem)+" selected: "+JSON.stringify(this.selectedPackingItem));
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
        this.sales_Order_Item_Dtls.reset();
        this.sales_Order_Item_Dtls.at(0).patchValue({slno:  this.item_sl_no});
         this.sales_Order_Item_Dtls.at(0).patchValue({item_code: "0", packing: "0", uom: '', quantity: 0, squantity: 0, price: 0, tax_rate: 0,
        price_based_on: "0", discount_rate: 0, discount_type: "0"});
        this.isPackingListReq[0] = "false";
      } 
      
      for(let i=1; i<=this.item_sl_no; i++)
        this.sales_Order_Item_Dtls.at(i-1).patchValue({slno: i});
      
    }

    addBrokers()
    {
      this.broker_sl_no=this.broker_sl_no+1;
      this.sales_Order_Broker_Dtls.push(this.fb.group({
        slno:this.broker_sl_no,	
        p_code:'',
        broker_code:'',
        basis:'',
        based_on:'',
        rate:''}))

        for(let i=0;i<this.sales_Order_Broker_Dtls.length;i++)
        {
          //this.sales_Order_Broker_Dtls.at(i).patchValue({p_code:"0"});
        }
    }

    deleteBrokers(index) 
    {
      if(this.broker_sl_no > 1)
      { 
        this.sales_Order_Broker_Dtls.removeAt(index);
        this.broker_sl_no = this.broker_sl_no - 1;
      }
      else
      {
        this.broker_sl_no = 1;
        alert("can't delete all rows");
        this.sales_Order_Broker_Dtls.reset();
        this.sales_Order_Broker_Dtls.at(0).patchValue({slno:  this.broker_sl_no});
      } 
      
      for(let i=1; i<=this.broker_sl_no; i++)
        this.sales_Order_Broker_Dtls.at(i-1).patchValue({slno: i});     
     }
    add2()
    {
      this.sales_Order_Docs.push(this.fb.group({
        doc_name:'' }))
    }

    delete2(index)
    {
      if(index)
      { this.sales_Order_Docs.removeAt(index);}
      else
      {
        alert("Can not delete all rows");
        this.sales_Order_Docs.reset();
      } 
    }

    add3()
    {
      this.sales_Order_Summary_dyn.push(this.fb.group({
        // charge_name:'',
        // rate_cal_method:'',
        // amount:'',
        // tax_rate: ''
        charge_name:'',
        add_less:'',
        rate_cal_method:'',
        app_rate:'',
        amount:'',
        tax_rate:'' }));
    }

    addParty()
    {
      this.party_sl_no=this.party_sl_no+1;
      this.sales_Order_Party_Dtls.push(this.fb.group({
        sl_no : this.party_sl_no,  
        p_code:'',
        cp_name:'',
        cp_contact:'',
        cp_city:'',
        city_approved:'',
        send_via:'',
        tcs_applicable:'',
        tcs_rate:''
      }))
      //this.sales_Order_Party_Dtls.at(this.party_sl_no - 1).patchValue({p_code: "0"});
      this.selectedPartyName[this.party_sl_no - 1] = "0";
    }

    deleteParty(index) 
    {
      if(this.party_sl_no > 1)
      { 
        this.sales_Order_Party_Dtls.removeAt(index);
        this.party_sl_no = this.party_sl_no - 1;
      }
      else
      {
        this.party_sl_no = 1;
        alert("can't delete all rows");
        this.sales_Order_Party_Dtls.reset();
        this.sales_Order_Party_Dtls.at(0).patchValue({sl_no:  this.party_sl_no});
      } 
      
      for(let i=1; i<=this.party_sl_no; i++)
        this.sales_Order_Party_Dtls.at(i-1).patchValue({sl_no: i});
      
    }

    addChgs()
    {
      this.chgs_sl_no =this.chgs_sl_no +1;
    
      this.sales_Order_Trans_Chgs_dyn.push(this.fb.group({
        slno:this.chgs_sl_no,
        mode_of_trans:'',
        transport_from:'',
        transport_to: '',
        transporter_name: '',
        transport_rate: '',
        charge_code: '',
        chgs_rate_value: '',
        chgs_remarks:'',
        distance_in_km:'',
        uom:'',
        tax_code:'',
        tax_rate:'',
        transportation_acc:'',
        tds_code:'' ,
        tds_codename:'' ,
        tds_rate:'' ,
        tds_acc:'' ,
        tds_accname:'' ,
        allowed_shortage:'',
        deduction_basedon:'',
        charge_id:''

        }));
    }

    deleteChgs(index) 
    {
      if(this.chgs_sl_no > 1)
      { 
        this.sales_Order_Trans_Chgs_dyn.removeAt(index);
        this.chgs_sl_no = this.chgs_sl_no - 1;
        this.sales_Order_Trans_Chgs_dyn.at(index).patchValue({slno :this.chgs_sl_no}); 
      }
      else
      {
        this.chgs_sl_no = 1;
        alert("can't delete all rows");
        this.sales_Order_Trans_Chgs_dyn.reset();
        this.sales_Order_Trans_Chgs_dyn.at(0).patchValue({slno:this.chgs_sl_no});
      }
      for(let i=1; i<=this.chgs_sl_no; i++)
        this.sales_Order_Trans_Chgs_dyn.at(i-1).patchValue({slno:i});
    }
    
    customer_id:any;
    openDialog()
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: 0};
      const dialogRef = this.dialog.open(SalesEnqCusPopUpComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => 
      {  
        if(data != '' && data["cp_Id"] != "0")
        {
          
          this.DropDownListService.checkcustomersaleclosed(data["cp_Id"]).subscribe(res=>
          {
            
           if(res["status"]=="Yes")
           {
             alert("SALE is Closed For this party !!")
           }
           else
           {

            this.selectCustomerStatus=true;
            this.cashLimit = 0;
            this.contNameList = [];
            this.selectedPartyName = [];
            this.customerDelvAddList = [];
         //  console.log("customerData: "+ JSON.stringify(data))
            // alert( data["cp_Id"]);
            this.partyNameList=data["Customer_list"];
            this.sales_Order_Broker_Dtls.at(0).patchValue({p_code: data["cp_Id"]});
            this.sales_Order_Shipment_Dtls.patchValue({pay_addr:data.cp_Id}) ; 
            this.addParty();
            this.party_sl_no = 0;
            while(this.sales_Order_Party_Dtls.length)
            this.sales_Order_Party_Dtls.removeAt(0);
  
            this.userForm.patchValue({customer: data["cp_Id"]});
            this.is_trans_Info = "Own Account";
         
          
            this.status = false;
            this.customer_id = data["cp_Id"];
            this._customerId = data["cp_Id"];
            forkJoin(
              this.DropDownListService.getTransporterThruCustomer(data["cp_Id"]),
              this.DropDownListService.getCustDelvFromList(data["cp_Id"]),
              this.DropDownListService.custAddDtlsRetriveList(data["cp_Id"],this.company_name),
              this.DropDownListService.custAccountRetriveList(data["cp_Id"],this.company_name),
              this.Service.custBillAddRetriveList(data["cp_Id"]),
              this.Service.custAddRetriveList(data["cp_Id"])
            ).subscribe(([transporterList, custDelvData, contactName, custAccData,CustAddress,cityname])=>
            {
              this.status = true;
              this.trans_codes = transporterList;
              console.log("transporterList: "+ JSON.stringify(transporterList))
              //console.log("customerDelvAddList: "+ JSON.stringify(custDelvData)+" cpId: "+data["cp_Id"])
              this.customerDelvAddList = custDelvData;
  
              this.contNameList[0] = contactName;
              this.selectedPartyName[0] = data["cp_Id"];
              this.addParty();
              this.sales_Order_Party_Dtls.at(0).patchValue({p_code: data["cp_Id"], tcs_rate: custAccData["tcs_rate"],tcs_applicable: custAccData["tcs_applicable"],cp_city:cityname["city_code"]});  
            
              this.cashLimit = custAccData["cash_limit"];
              //changes here
              
              this.onChangePartyStatic(data["cp_Id"]);
              
              this.sales_Order_Shipment_Dtls.patchValue({pay_details:CustAddress["address"]});
  
            })
           }

          })

          
        }
      });
    }

    show_Row = false;
    show_Row1= false;
    reference_type:any;
    onClickShow()
    {
      this.reference_type = this.userForm.get("ref_type").value as FormControl;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: 0,};

      if(this.reference_type == "Sales Quotation")
      {
        const dialogRef = this.dialog.open(SalesQuoPopUpModalComponent, {data: {qu_type: "finalize"}});
        dialogRef.afterClosed().subscribe(data => 
        {
          if(data != '' && data["quotation_id"] != "0")
          {
            let  j=0;
            this.packingItem = [];
            this.selectedItemName = [];
            this.selectedPackingItem = [];
            this.userForm.patchValue({referance_id: data["quotation_id"]});
            this.addItems();
            this.item_sl_no = 0;
            while(this.sales_Order_Item_Dtls.length)
            this.sales_Order_Item_Dtls.removeAt(0);
         
            for(let data1 of data.sales_Quotation_Item_Dtls)
            {
              if(data1.checkbox == true)
              {
                this.status = false;
                forkJoin(
                  this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                  this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"],this.company_name)
                ).subscribe(([packingList, capacityEmptyWt])=>
                  {
                    this.addItems();
                    this.status = true;
                    this.show_Row = true;
                    this.packingItem[j] = packingList; 
                    this.capacity[j] = capacityEmptyWt.capacity;
                    this.empty_bag_wt[j] =  capacityEmptyWt.empty_big_wt;
                    this.selectedPackingItem[j] = data1["packing"];
                    this.selectedItemName[j] = data1["item_code"];
                    this.sales_Order_Item_Dtls.at(j).patchValue(
                    {
                      item_code: data1["item_code"], packing: data1["packing"], quantity: data1["quantity"], 
                      uom: data1["uom"], squantity: data1["squantity"], suom: data1["suom"], con_factor: data1["con_factor"],
                      mat_wt: data1["mat_wt"], price: data1["price"], price_based_on: data1["price_based_on"], amount: data1["amount"],
                      discount_type: data1["discount_type"], discount_rate: data1["discount_rate"], tolerance: data1["tolerance"], tax_code: data1["tax_code"],
                      tax_rate: data1["tax_rate"], acc_norms: data1["acc_norms"], discount_amt: data1["discount_amt"], tax_amt: data1["tax_amt"],
                      total_amt: data1["total_amt"]
                    });
                    j = j + 1;
                  });
              }
            }

            this.status = false;
            forkJoin(
              this.DropDownListService.getSalesQuotDetails(data["quotation_id"]),
              this.DropDownListService.getSalesQuotSummary(data["quotation_id"]),
              this.DropDownListService.getSalesQuotTransInfo(data["quotation_id"]),
              this.DropDownListService.getSalesQuotShipDtls(data["quotation_id"]),
              this.DropDownListService.getSalesQuotTermsCon(data["quotation_id"]),
              this.DropDownListService.getSalesQuotSummDtls(data["quotation_id"]),
              this.DropDownListService.getSalesQuotBrokerDtls(data["quotation_id"]),
              this.DropDownListService.getSalesQuotPartyDtls(data["quotation_id"])
            ).subscribe(([salesQuoData, summaryData, transData, shipData, termsConData,
              summDtlsData, brokarData, partyData])=>
            {
              if(salesQuoData["cust_channel"] != "0" && salesQuoData["cust_channel"] != '' && salesQuoData["cust_channel"] != null)
              {
                this.status = false;
                this.DropDownListService.getCustomerByChannel(salesQuoData["cust_channel"]).subscribe(customerList=>
                {
                  this.status = true;
                  this.partyList = customerList;
                  this.userForm.patchValue({customer : salesQuoData["customer"]})
                });
              }
  
              this.onChangeWgmtUom(salesQuoData["we_uom"]);
              this.userForm.patchValue({shipment_mode: salesQuoData["shipment_mode"],
                sales_person: salesQuoData["sales_person"], business_unit: salesQuoData["business_unit"], delivery_date: salesQuoData["delivery"],valid_till: data.valid_till,
                cust_refdocno: salesQuoData["cust_ref"], cust_channel: salesQuoData["cust_channel"], price_term: salesQuoData["price_term"], 
                order_date: salesQuoData["quotation_date"], pro_order: salesQuoData["pro_order"], q_status: salesQuoData["q_status"], app_chgs_id: salesQuoData["app_chgs_id"], remarks: salesQuoData["remarks"],
                confirmed_by: salesQuoData["confirmed_by"], approval: salesQuoData["approved"], reason: salesQuoData["reason"], 
                receipt_criteria: salesQuoData["receipt_ct"], we_uom: salesQuoData["we_uom"], delivery_term: salesQuoData["delivery_term"], customer: salesQuoData["customer"]});  

              this.sales_Order_Summary.patchValue({item_total: summaryData["item_total"], discount: summaryData["discount"], 
              tax_total: summaryData["tax_total"], net_amount: summaryData["net_amount"], app_brokerage: summaryData["app_brokerage"], 
              net_r_value: summaryData["net_r_value"]}); 

              this.sales_Order_Trans_Info.patchValue(transData);

              this.onChangePaymentMode(termsConData["payment_mode"]);
              this.is_payment_dis = true;
              this.sales_Order_Terms_Con.patchValue(termsConData);

              this.add3();
              while(this.sales_Order_Summary_dyn.length)
              this.sales_Order_Summary_dyn.removeAt(0);
              for(let data1 of summDtlsData) 
              this.add3(); 
              this.sales_Order_Summary_dyn.patchValue(summDtlsData);  

              let i = 0;
              this.selectedBrokerName = [];
              this.addBrokers(); 
              this.broker_sl_no = 0;
              while(this.sales_Order_Broker_Dtls.length)
              this.sales_Order_Broker_Dtls.removeAt(0);
           
              for(let data1 of brokarData) 
              {
                this.addBrokers(); 
                this.sales_Order_Broker_Dtls.at(i).patchValue({broker_code: data1["broker_code"],
                basis: data1["basis"], rate: data1["rate"],based_on: data1["based_on"]});
                i = i + 1;
              }  
              //console.log("Broker : : "+JSON.stringify(brokarData))
              this.partyList = partyData;
              let k = 0;
              this.selectedPartyName = [];
              this.contNameList = [];
              this.addParty(); 
              this.party_sl_no = 0;
              while(this.sales_Order_Party_Dtls.length)
              this.sales_Order_Party_Dtls.removeAt(0);

              for(let data1 of partyData) 
              {
                this.status = false;
                this.DropDownListService.custAddDtlsRetriveList(data1["p_code"],this.company_name).subscribe(contactList=>
                { 
                  this.status = true;
                  this.addParty(); 
                  this.selectedPartyName[k] = data1["p_code"]
                  this.contNameList[k]  = contactList; 
                  this.sales_Order_Broker_Dtls.at(k).patchValue({p_code:data1["p_code"]});
                  this.getBrokerName(data1["p_code"],k)
                  this.sales_Order_Party_Dtls.at(k).patchValue(data1); 
                  k = k + 1;
                });
              }

              if(salesQuoData["customer"] != "0")
              {
                this.status = false;
                this.DropDownListService.getCustDelvFromList(salesQuoData["customer"]).subscribe(custDelvAddList=>
                {
                  this.customerDelvAddList = custDelvAddList;
                  this.sales_Order_Shipment_Dtls.patchValue(shipData);
                  this.status = true;
                })
              }
              else{ this.sales_Order_Shipment_Dtls.patchValue(shipData)}
              this.status = true;
            });
          }
        });
      } 


      if(this.reference_type == "Sales Enquiry")
      {
        const dialogRef = this.dialog.open(SalesEnquiryPopUpModalComponent, {data:{sales_date: this.currentDate}});
        dialogRef.afterClosed().subscribe(data => 
        {
          if(data != '' && data["enquiry_id"] != "0")
          {
            let j=0;
            this.packingItem = [];
            this.selectedItemName = [];
            this.selectedPackingItem = [];
            this.userForm.patchValue({referance_id: data["enquiry_id"]});
            this.addItems();
            this.item_sl_no = 0;
            while(this.sales_Order_Item_Dtls.length)
            this.sales_Order_Item_Dtls.removeAt(0); 
          
            for(let data1 of data.sales_Enquiry_Item_Dtls)
            {
              if(data1.checkbox == true)
              {
                this.status = false;
                this.DropDownListService.getItemMasterPackMat(data1["item_code"]).subscribe(data=>
                { 
                  this.addItems();  
                  this.packingItem[j] = data; 
                  this.status = true;
                  this.show_Row = true;
                  this.selectedItemName[j] = data1.item_code;
                  this.selectedPackingItem[j] = data1.packing_item;
                  
                  if(this._weighmentUom == data1["uom"])
                  {
                    this.sales_Order_Item_Dtls.at(j).patchValue({con_factor: 0});
                  }
                  else 
                  { 
                    if(this._weighmentUom != 0)
                    {
                      if(this.cal_method == "Multiply")
                      this.sales_Order_Item_Dtls.at(j).patchValue({con_factor: parseFloat(this.con_factor) * parseFloat(data1["quantity"])});
                      if(this.cal_method == "Division")
                      this.sales_Order_Item_Dtls.at(j).patchValue({con_factor: parseFloat(data1["quantity"]) / parseFloat(this.con_factor)}); 
                    }
                  }
                  this.sales_Order_Item_Dtls.at(j).patchValue(
                  {
                    item_code: data1["item_code"], quantity: data1["quantity"], uom: data1["uom"], acc_norms: data1["qc_norms"], 
                    packing: data1["packing_item"], suom: data1["packing_uom"], squantity: data1["packing_quantity"],
                    mat_wt: data1["mat_wt"], price: data1["price"], tax_code: data1["tax_code"], tax_rate: data1["tax_rate"]
                  });
                  j = j + 1;
                }); 
              }
            }

            this.status = false;
            forkJoin(
              this.DropDownListService.salesEnqPersonList(data["enquiry_id"]),
              this.DropDownListService.salesEnquiryByEnqId(data["enquiry_id"]),
              this.DropDownListService.getSalesEnqPartyDtls(data["enquiry_id"])
            ).subscribe(([salesEnqPersonData, salesEnqData, partyData])=>
              { 
                this.userForm.patchValue({sales_person: salesEnqPersonData["sales_person"]});
                this.userForm.patchValue({business_unit: salesEnqData["businessunit"]});
            
                if(salesEnqData["enq_type"] == 'Formal') 
                {
                  let i = 0;
                  this.selectedPartyName = [];
                  this.contNameList = [];
                  this.addParty();
                  this.party_sl_no = 0;
                  while(this.sales_Order_Party_Dtls.length)
                  this.sales_Order_Party_Dtls.removeAt(0);
                  this.userForm.patchValue({customer: partyData[0].p_code});
                  this.onChangePartyStatic(partyData[0].p_code);
                  for(let data1 of partyData) 
                  {
                    this.status = false;
                    this.onChangePartyStatic(data1.p_code);
                    this.userForm.patchValue({customer: data1.p_code})
                    this.DropDownListService.custAddDtlsRetriveList(data1.p_code,this.company_name).subscribe(contactName=>
                    {
                      this.addParty(); 
                      this.contNameList[i] = contactName;
                      this.selectedPartyName[i] = data1.p_code;
                      this.sales_Order_Party_Dtls.at(i).patchValue(data1); 
                      i = i + 1;
                      this.status = true;
                    });
                  }
                }   
              });
          }
        });
      } 
    }

    onChangeCheckbox(event:MatCheckboxChange,index): void 
    {
      if(event.checked==false)
      {
        this.addBrokers(); 
        this.broker_sl_no = 0;
        while(this.sales_Order_Broker_Dtls.length)
        this.sales_Order_Broker_Dtls.removeAt(index);
        this.addBrokers(); 
      }
    }

    amt:any;
    taxAmt:any;
    showPopUp(index)
    {
      this._discount = this.sales_Order_Item_Dtls.at(index).get('discount_rate').value as FormControl;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
      index: index,};

      const dialogRef = this.dialog.open(SalesQuoTaxModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => 
      {  

        this.sales_Order_Item_Dtls.at(index).patchValue({tax_code: data["tax_id"], tax_rate: data["tax_rate"],
        cgst_amt: data["cgst_act_val"],sgst_amt: data["sgst_act_val"],igst_amt: data["igst_act_val"]});


        this._packing_qty = this.sales_Order_Item_Dtls.at(index).get("squantity").value as FormControl;
        this._item_qty= this.sales_Order_Item_Dtls.at(index).get("quantity").value as FormControl;
        this._mrp  = this.sales_Order_Item_Dtls.at(index).get("price").value as FormControl;
        this._priceBasedOn = this.sales_Order_Item_Dtls.at(index).get('price_based_on').value as FormControl;
        this._discount = this.sales_Order_Item_Dtls.at(index).get('discount_rate').value as FormControl;
        this._discountBasadOn = this.sales_Order_Item_Dtls.at(index).get('discount_type').value as FormControl;
        this._taxrate = data["tax_rate"];
        this.calculateItemData(this._packing_qty, this._item_qty, this._mrp, 
          this._priceBasedOn, this._discount, this._discountBasadOn, this._taxrate, index)    
      }); 
    }

    popup_data:any=[];
    packingListPopUp(index)
    {
      this.itemCode = this.sales_Order_Item_Dtls.at(index).get('item_code').value as FormControl;  
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
        this.sales_Order_Item_Dtls.at(index).patchValue({packing_list: list.substr(0, list.length-1)});
      }); 
    }

    /* openDialog1(event) 
    {          
        let dialogref=this.dialog.open(ChargeCodePopUpComponent);
        dialogref.afterClosed().subscribe(data => 
        {this.sales_Order_Trans_Info.patchValue({charge_code: data.charge_id})});      
    } */

    

    GetDeliveryBuisnessUnit(businessunit_code:string)
    {
      //alert(businessunit_code+","+this.sales_Order_Shipment_Dtls.get("pay_addr").value);
      if(businessunit_code != '0')
      {
        this.status = false;
        
        this.DropDownListService.getCustDelvFromAdd(this.sales_Order_Shipment_Dtls.get("pay_addr").value,businessunit_code).subscribe(data=>
        {
          this.sales_Order_Shipment_Dtls.patchValue({ship_details: data["ship_to"]});
          this.status = true;
        });
      }
    }

    onChangeShipToAddId(addId: String)
    {
      if(addId != '0')
      {
        this.status = false;
        this.DropDownListService.getCustDelvFromAdd(this._customerId, addId).subscribe(data=>
        {
          this.sales_Order_Shipment_Dtls.patchValue({ship_details: data.address})
          this.status = true;
        })
      }
    }

    _item_uom:any;
    cal_method:any;
    con_factor:any;
    onChangeWgmtUom(wgmtUom)
    {
      if(wgmtUom.length && wgmtUom != "0")
      {
        this._weighmentUom = wgmtUom;
         this.status = false;
         forkJoin(
        this.DropDownListService.getCustomUomById(this._weighmentUom),
        this.DropDownListService.getWeighmentCustomUOM()
        ).subscribe(([data,customUomList])=>
        {
          customUomList.forEach(element => {
            if(element.customuom_id == wgmtUom)
            {
              this.custidNew = element.description;
            }
            
            
          });

          this.DropDownListService.getUomName(this._weighmentUom).subscribe(uomName=>
          {
            this._weighmentUom = uomName.description;
            this.cal_method = data.cal_method;
            this.con_factor = data.uom_conv_fac;
            this.status = true;
            for(let i = 0; i<this.sales_Order_Item_Dtls.length; i++)
            {
              this._item_uom = this.sales_Order_Item_Dtls.at(i).get("uom").value as FormControl;
              if(this._item_uom == this._weighmentUom)
              { 
                this.sales_Order_Item_Dtls.at(i).patchValue({con_factor: 0});
              }
              else
              {
                this._item_qty = this.sales_Order_Item_Dtls.at(i).get("quantity").value as FormControl;
                if(this.cal_method == "Multiply")
                this.sales_Order_Item_Dtls.at(i).patchValue({con_factor: parseFloat(this.con_factor) * parseFloat(this._item_qty)});
                if(this.cal_method == "Division")
                this.sales_Order_Item_Dtls.at(i).patchValue({con_factor: parseFloat(this._item_qty) / parseFloat(this.con_factor)}); 
              }
            }
          });
        })
      }
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
           // console.log("before transporter update: "+JSON.stringify(this.trans_codes))
            this.Service.updateCustomerTransporters(this._customerId, data.transporter_id).subscribe(data1=>
            { 
              this.DropDownListService.transporterNamesList().subscribe(data=>
              {
                this.trans_codes = data;
               // console.log("after transporter update: "+JSON.stringify(this.trans_codes))
                this.status = true;
              });
              this.status = true;
             this.sales_Order_Trans_Info.patchValue({transporters: data.transporter_id});
            });
          }
        }); 
      }
      else{alert("Select party First!")}     
    }   

    onDelete(id:any)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Order ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.Service.deleteEffectiveSalesOrder(this.userForm.getRawValue(),id).subscribe(data=> 
        {        
         // console.log("Cat id:"+data.order_id);

          if(data.order_id=='' || data.order_id==null)
          {
            alert("Opps!!! Can't delete this Order !!!");
          }else{
            alert("Order Deleted successfully.");
          }
          this.status = true;
          this.ngOnInit()
        }); 
      }  
      this.status = true;
    }

    _trans_code:any;  
    
    send()
    {
      this.Id= this.userForm.get("id").value as FormControl;
      this._trans_code = this.sales_Order_Trans_Info.get("trans_code").value as FormControl;
      this._deliveryTerm = this.userForm.get("delivery_term").value as FormControl;
      this.userForm.patchValue({
        company_id: localStorage.getItem("company_name"), fin_year: this.financialYear,
        username: localStorage.getItem("username")}); 
      this.submitted = true;




      if(!this.userForm.valid) 
      {
        alert('Please fill all fields!')
        return false;
      } 
      else 
      {
        this.status = false;

        if(this.userForm.get("order_type").value == '' || this.userForm.get("order_type").value == null || this.userForm.get("order_type").value == 0)
        {
          alert("Please Select Order Type");
          this.status=true;
        }
        else if(this.userForm.get("business_unit").value == '' || this.userForm.get("business_unit").value == null || this.userForm.get("business_unit").value == 0)
        {
          alert("Please Select Business Unit");
          this.status=true;
        }
        else if(this.userForm.get("ref_type").value == '' || this.userForm.get("ref_type").value == null || this.userForm.get("ref_type").value == 0)
        {
          alert("Please Select Reference Type");
          this.status=true;
        }
        else if(this.userForm.get("ref_type").value=="Open Sales Order" && this.userForm.get("order_type").value=="Formal" && this.selectCustomerStatus == false)
        {
          alert("Please Select Customer Name From Select Customer Button");
          this.status=true;
        }
        else if(this.userForm.get("ref_type").value=="Open Sales Order" && this.userForm.get("order_type").value=="Formal" && (this.Id == null || this.Id == 0 || this.Id =='') && (this.userForm.get("customer").value==null || this.userForm.get("customer").value== '0'))
        {
          alert("Please Select Atleast One Customer From Select Customer Button");
          this.status=true;
        }
        else if(this.userForm.get("price_term").value == '' || this.userForm.get("price_term").value == null || this.userForm.get("price_term").value == 0)
        {
          alert("Please Select Price Term");
          this.status=true;
        }
        else if(this.userForm.get("receipt_criteria").value == '' || this.userForm.get("receipt_criteria").value == null || this.userForm.get("receipt_criteria").value == 0)
        {
          alert("Please Select Receipt Criteria");
          this.status=true;
        }
        else if(this.userForm.get("we_uom").value == '' || this.userForm.get("we_uom").value == null || this.userForm.get("we_uom").value == 0)
        {
          alert("Please Select Weighment UOM");
          this.status=true;
        }
        else if(this.userForm.get("delivery_term").value == '' || this.userForm.get("delivery_term").value == null || this.userForm.get("delivery_term").value == 0)
        {
          alert("Please Select Delivery Term");
          this.status=true;
        }
        else if(this.userForm.get("shipment_mode").value == '' || this.userForm.get("shipment_mode").value == null || this.userForm.get("shipment_mode").value == 0)
        {
          alert("Please Select Shipment Mode");
          this.status=true;
        }
        else if(this.userForm.get("order_type").value == 'Informal' && (this.userForm.get("cust_channel").value == '' || this.userForm.get("cust_channel").value == null || this.userForm.get("cust_channel").value == 0))
        {
          alert("Please Select Customer Channel");
          this.status=true;
        }
      else if(this.userForm.get("q_status").value == '' || this.userForm.get("q_status").value == null || this.userForm.get("q_status").value == 0)
      {
        alert("Please Select Order status");
        this.status=true;
      }
      else if(this.userForm.get("inv_type").value == '' || this.userForm.get("inv_type").value == null || this.userForm.get("inv_type").value == 0)
      {
        alert("Please Select Sales Invoice Type");
        this.status=true;
      }
        else
        {
          let itemcheck = false;
          let packingcheck = false;
          let partychk = false;
          let brokerpartychk = false;
          let brokerckeck = false;
          let price = false;
          let price_based_on = false;
          let tax_code = false;
          let itemqty = false;
          let pckingqty = false;
          let matwterror=false;
          let itemsnames:string="";
         // let cityapproved=false;

          let transportname=false;
          let transportrate=false;
          let transportchargecode=false;
         // let rateamt=false;
        //  let ratetolcheck=false;

        
          //let weighmentUomCheck = false;
         // let appratechk = false;

          for(let b=0;b<this.sales_Order_Item_Dtls.length;b++)
          {
            /*
            if(this.sales_Order_Item_Dtls.at(b).get("ratechartamt").value == null || this.sales_Order_Item_Dtls.at(b).get("ratechartamt").value == '' || this.sales_Order_Item_Dtls.at(b).get("ratechartamt").value == 0)
            {
              rateamt = true;
              itemsnames+=this.sales_Order_Item_Dtls.at(b).get("slno").value +" , ";
            }
            if(this.sales_Order_Item_Dtls.at(b).get("rateres").value == "NO")
            {
              ratetolcheck=true;
            }
            */

            if(this.sales_Order_Item_Dtls.at(b).get("item_code").value == null || this.sales_Order_Item_Dtls.at(b).get("item_code").value == '' || this.sales_Order_Item_Dtls.at(b).get("item_code").value == 0)
            {
              itemcheck = true;
            }
            if(this.sales_Order_Item_Dtls.at(b).get("packing").value == null || this.sales_Order_Item_Dtls.at(b).get("packing").value == '' || this.sales_Order_Item_Dtls.at(b).get("packing").value == 0)
            {
              packingcheck = true;
            }
            if(this.sales_Order_Item_Dtls.at(b).get("squantity").value == null || this.sales_Order_Item_Dtls.at(b).get("squantity").value == '' || this.sales_Order_Item_Dtls.at(b).get("squantity").value == 0)
            {
              pckingqty = true;
            }
            if(this.sales_Order_Item_Dtls.at(b).get("quantity").value == null || this.sales_Order_Item_Dtls.at(b).get("quantity").value == '' || this.sales_Order_Item_Dtls.at(b).get("quantity").value == 0)
            {
              itemqty = true;
            }
            if(this.sales_Order_Item_Dtls.at(b).get("price").value == null || this.sales_Order_Item_Dtls.at(b).get("price").value == '' || this.sales_Order_Item_Dtls.at(b).get("price").value == 0)
            {
              price = true;
            }
            if(this.sales_Order_Item_Dtls.at(b).get("price_based_on").value == null || this.sales_Order_Item_Dtls.at(b).get("price_based_on").value == '' || this.sales_Order_Item_Dtls.at(b).get("price_based_on").value == 0)
            {
              price_based_on = true;
            }
            if(this.sales_Order_Item_Dtls.at(b).get("tax_code").value == null || this.sales_Order_Item_Dtls.at(b).get("tax_code").value == '' || this.sales_Order_Item_Dtls.at(b).get("tax_code").value == 0)
            {
              tax_code = true;
            }
            // if(this.custidNew != this.sales_Order_Item_Dtls.at(b).get("suom").value || this.custidNew != this.sales_Order_Item_Dtls.at(b).get("uom").value)
            // {
            //   weighmentUomCheck=true;
            // }
            if(this.sales_Order_Item_Dtls.at(b).get("quantity").value != this.sales_Order_Item_Dtls.at(b).get("mat_wt").value)
            {
              matwterror=true;
            }

          }
          for(let b=0;b<this.sales_Order_Party_Dtls.length;b++)
          {
            // if(this.sales_Order_Party_Dtls.at(b).get("city_approved").value==false)
            // {
            //   cityapproved=true;
            // }

            if(this.sales_Order_Party_Dtls.at(b).get("p_code").value == null || this.sales_Order_Party_Dtls.at(b).get("p_code").value == '' || this.sales_Order_Party_Dtls.at(b).get("p_code").value == 0)
            {
              partychk = true;
            }
          }
          for(let b=0;b<this.sales_Order_Broker_Dtls.length;b++)
          {
            if(this.sales_Order_Broker_Dtls.at(b).get("p_code").value == null || this.sales_Order_Broker_Dtls.at(b).get("p_code").value == '' || this.sales_Order_Broker_Dtls.at(b).get("p_code").value == 0)
            {
              brokerpartychk = true;
            }
            if(this.sales_Order_Broker_Dtls.at(b).get("broker_code").value == null || this.sales_Order_Broker_Dtls.at(b).get("broker_code").value == '' || this.sales_Order_Broker_Dtls.at(b).get("broker_code").value == 0)
            {
              brokerckeck = true;
            }
          }
          for(let b=0;b<this.sales_Order_Trans_Chgs_dyn.length;b++)
          {
           

            if(this.sales_Order_Trans_Chgs_dyn.at(b).get("transporter_name").value == null || this.sales_Order_Trans_Chgs_dyn.at(b).get("transporter_name").value == '' || this.sales_Order_Trans_Chgs_dyn.at(b).get("transporter_name").value == 0)
            {
              transportname = true;
            }
            if(this.sales_Order_Trans_Chgs_dyn.at(b).get("charge_code").value == null || this.sales_Order_Trans_Chgs_dyn.at(b).get("charge_code").value == '' || this.sales_Order_Trans_Chgs_dyn.at(b).get("charge_code").value == 0)
            {
              transportchargecode = true;
            }
            if(this.sales_Order_Trans_Chgs_dyn.at(b).get("chgs_rate_value").value == null || this.sales_Order_Trans_Chgs_dyn.at(b).get("chgs_rate_value").value == '' || this.sales_Order_Trans_Chgs_dyn.at(b).get("chgs_rate_value").value == 0)
            {
              transportrate = true;
            }
          
          }

          
          //  if(cityapproved == true)
          //    {
          //      alert("Please Approve the City in Party Details Tab!!!");this.status = true;
          //    }
          if(itemcheck == true)
            {
              alert("Please Select Item Name in Item Details Tab!!!");this.status = true;
            }
          else if(packingcheck == true)
            {
              alert("Please Select Packing Name in Item Details Tab!!!");this.status = true;
            }
          else if(pckingqty == true)
          {
            alert("Please Enter PACKING QTY. in Item Details Tab!!!");this.status = true;
          }
          else if(itemqty == true)
          {
            alert("Please Enter ITEM QTY. in Item Details Tab!!!");this.status = true;
          }
          // else if(weighmentUomCheck == true)
          // {
          //   alert("Please Select Valid Weighment UOM With Respect To Packing UOM OR Item UOM in Item Details Tab!!!");this.status = true;
          // }
          else if(price == true)
          {
            alert("Please Enter Price in Item Details Tab!!!");this.status = true;
          }
          else if(price_based_on == true)
          {
            alert("Please Select Price Based On in Item Details Tab!!!");this.status = true;
          }
          else if(tax_code == true)
          {
            alert("Please Select Tax Code in Item Details Tab!!!");this.status = true;
          }
          //let rateamt=false;
          //let ratetolcheck=false;
           /*
          else if(rateamt == true)
          {
            alert("Item is not listed in Rate Chart Page!! the Sl Numbers are  as Follows :: " +itemsnames.substring(0,itemsnames.length-2));this.status = true;
          }
          else if(ratetolcheck == true && this.userForm.get("remarks").value == null)
          {
            alert("Please Enter Remarks for Change in Price with Rate Chart in Remarks Tab!!!");this.status = true;
          }
          */
          else if(matwterror == true)
          {
            alert("Item Qty and Gross Wt Miss Matched in  in Item Details Tab!!!");this.status = true;
          }
          else if(partychk == true)
          {
            alert("Please Select Party Name in Party Details Tab!!!");this.status = true;
          }
          //
          else if(this.sales_Order_Terms_Con.get("payment_mode").value == null || this.sales_Order_Terms_Con.get("payment_mode").value == '' || this.sales_Order_Terms_Con.get("payment_mode").value == 0)
          {
            alert("Please Select Payment Mode in PARTY DETAILS Tab");
            this.status=true;
          }
          else if(this.sales_Order_Terms_Con.get("payment_term").value == null || this.sales_Order_Terms_Con.get("payment_term").value == '' || this.sales_Order_Terms_Con.get("payment_term").value == 0)
          {
            alert("Please Select Payment Term in PARTY DETAILS Tab");
            this.status=true;
          }
          else if(brokerpartychk == true)
          {
            alert("Please Select PARTY NAME in Broker Details Tab!!!");this.status = true;
          }
          else if(brokerckeck == true)
            {
              alert("Please Select BROKER NAME in Broker Details Tab!!!");this.status = true;
            }
          // else if(this.userForm.get("delivery_term").value == 'FOR' && (this.sales_Order_Trans_Info.get("trans_code").value == '' || this.sales_Order_Trans_Info.get("trans_code").value == null || this.sales_Order_Trans_Info.get("trans_code").value == 0))
          // {
          //   alert("Delivery Term 'Own Site' , Please Select Transporter Name in Transport Information Tab!!");
          //   this.status=true;
          // }
          // else if(appratechk == true)
          // {
          //   alert("Please Check Applicable Charge in Summary Tab");
          //   this.status=true;
          // }
          else if(this.userForm.get("confirmed_by").value == '' || this.userForm.get("confirmed_by").value == null || this.userForm.get("confirmed_by").value == 0)
          {
            alert("Please Select Confirmed By in APPROVAL Tab");
            this.status=true;
          }
          else if(this.userForm.get("approval").value == '' || this.userForm.get("approval").value == null || this.userForm.get("approval").value == 0)
          {
            alert("Please Select Approved in APPROVAL Tab");
            this.status=true;
          }
          else if(this.userForm.get("reason").value == '' || this.userForm.get("reason").value == null || this.userForm.get("reason").value == 0)
          {
            alert("Please Select Reason in APPROVAL Tab");
            this.status=true;
          }
          
          else
          {
    //start here
                      this.calNetAmt();
                      if(this.Id>0 && this.deliverychallanstatus==true)
                      {
                        let totalcheck=false;

                        if(this._deliveryTerm == 'FOR' && transportname==true)
                        {
                           alert("Please Select Transporter Name In Transport Charges Tab")
                           this.status=true;
                        }
                        else if(this._deliveryTerm == 'FOR' && transportchargecode==true)
                        {
                          alert("Please Select Charge Code  In Transport Charges Tab")
                          this.status=true;
                        } 
                        else if(this._deliveryTerm == 'FOR' && transportrate==true)
                        {
                          alert("Please Enter Rate Value In Transport Charges Tab")
                          this.status=true;
                        } 
                        else
                        {

                          this.Service.updateEffectiveSalesOrder(this.userForm.getRawValue(), this.Id).subscribe(data =>
                            {
                              if(data.order_id=='' || data.order_id==null)
                              {
                                alert("Opps!!! Can't Update this Sales Order !!!");
                                this.status = true;
                              }
                              else
                              {
                             
                                alert("Sales Order is Updated Successfully...");
                                this.userForm.reset();
                                this.ngOnInit();
                              
                                this.item_sl_no = 0;
                                while(this.sales_Order_Item_Dtls.length)
                                this.sales_Order_Item_Dtls.removeAt(0);
                                this.addItems();
    
                                this.broker_sl_no = 0;
                                while(this.sales_Order_Broker_Dtls.length)
                                this.sales_Order_Broker_Dtls.removeAt(0);
                                this.addBrokers();
    
                                this.party_sl_no = 0;
                                while(this.sales_Order_Party_Dtls.length)
                                this.sales_Order_Party_Dtls.removeAt(0);
                                this.addParty();
    
                                while(this.sales_Order_Docs.length)
                                this.sales_Order_Docs.removeAt(0);
                                this.add2(); 
                                
                                while(this.sales_Order_Summary_dyn.length)
                                this.sales_Order_Summary_dyn.removeAt(0);
                                this.add3(); 
                                this.status = true;
                              }
                            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
                            this.ngOnInit()}); 
                            this.status = true;
                        }
                          
                       // }
                       
                      }
                      else if(this.Id>0 && this.deliverychallanstatus==false)
                      {
                        if(this._deliveryTerm == 'FOR' && transportname==true)
                        {
                           alert("Please Select Transporter Name In Transport Charges Tab")
                           this.status=true;
                        }
                        else if(this._deliveryTerm == 'FOR' && transportchargecode==true)
                        {
                          alert("Please Select Charge Code  In Transport Charges Tab")
                          this.status=true;
                        } 
                        else if(this._deliveryTerm == 'FOR' && transportrate==true)
                        {
                          alert("Please Enter Rate Value In Transport Charges Tab")
                          this.status=true;
                        } 
                        else
                        {
                          this.Service.updateEffectiveSalesOrderWithLoading(this.userForm.getRawValue(),this.Id).subscribe(data =>
                            {
                              alert("This Sales Order is Updated Successfully...");
                              this.userForm.reset();
                              this.ngOnInit();
                            
                              this.item_sl_no = 0;
                              while(this.sales_Order_Item_Dtls.length)
                              this.sales_Order_Item_Dtls.removeAt(0);
                              this.addItems();
  
                              this.broker_sl_no = 0;
                              while(this.sales_Order_Broker_Dtls.length)
                              this.sales_Order_Broker_Dtls.removeAt(0);
                              this.addBrokers();
  
                              this.party_sl_no = 0;
                              while(this.sales_Order_Party_Dtls.length)
                              this.sales_Order_Party_Dtls.removeAt(0);
                              this.addParty();
  
                              while(this.sales_Order_Docs.length)
                              this.sales_Order_Docs.removeAt(0);
                              this.add2(); 
                              
                              while(this.sales_Order_Summary_dyn.length)
                              this.sales_Order_Summary_dyn.removeAt(0);
                              this.add3(); 
                              this.status = true;
                            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
                            this.ngOnInit()}); 
                            this.status = true;
                        }
                        
                      }

                      else
                      {  
                        
                          if(this._deliveryTerm == 'FOR' && transportname==true)
                          {
                             alert("Please Select Transporter Name In Transport Charges Tab")
                             this.status=true;
                          }
                          else if(this._deliveryTerm == 'FOR' && transportchargecode==true)
                          {
                            alert("Please Select Charge Code  In Transport Charges Tab")
                            this.status=true;
                          } 
                          else if(this._deliveryTerm == 'FOR' && transportrate==true)
                          {
                            alert("Please Enter Rate Value In Transport Charges Tab")
                            this.status=true;
                          } 
                          else
                          {
                           
                            this.Service.createEffectiveSalesOrder(this.userForm.getRawValue()).subscribe(data =>
                              {
                             
                                alert("Sales Order is Created Successfully...");
                               
                                this.userForm.reset();
                                this.ngOnInit();
                                
                              
                                this.item_sl_no = 0;
                                while(this.sales_Order_Item_Dtls.length)
                                this.sales_Order_Item_Dtls.removeAt(0);
                                this.addItems();
    
                                this.broker_sl_no = 0;
                                while(this.sales_Order_Broker_Dtls.length)
                                this.sales_Order_Broker_Dtls.removeAt(0);
                                this.addBrokers();
    
                                this.party_sl_no = 0;
                                while(this.sales_Order_Party_Dtls.length)
                                this.sales_Order_Party_Dtls.removeAt(0);
                                this.addParty();
    
                                while(this.sales_Order_Docs.length)
                                this.sales_Order_Docs.removeAt(0);
                                this.add2(); 
                                
                                while(this.sales_Order_Summary_dyn.length)
                                this.sales_Order_Summary_dyn.removeAt(0);
                                this.add3(); 
  
                                this.status=true;
                                
                              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
                              this.ngOnInit()});
                              this.status=true;
                              
                          }
                       
                          this.status=true;        
        
                      } 
   
            }
        }


        
      }
    }

    OrderStatusList:any=[];
    onUpdate(id:any, order_id:string, action)
    {
      this.salesordersave = true;
      this.deliverychallanstatus=true;
      this.userForm.patchValue({id: id});

      if(id>0)
      {
        this.OrderStatusList = [{display: "-Select-", value: "0"},{display: "Close", value: "Close"},
        {display: "Finalise", value: "Finalise"}];
      }
      else
      {
        this.OrderStatusList = [{display: "Pending", value: "Pending"},
        {display: "Finalise", value: "Finalise"}];
      }
      this.status = false;
      this.isHidden = true;
      this.operation = 'Update';
      this.packingItem = [];
      this.selectedItemName = [];
      this.selectedPackingItem = [];
      this.selectedPartyName = [];
      this.selectedBrokerName = [];
      this.selectedTransacc=[];
      this.selectedTdsacc=[];
      this.selectedChgCode=[];
      if(action == 'view')
      {
        this.action = 'view';
        this.salesordersave = false;
      }
      else
      {this.action = 'update'; 
      this.salesordersave = true;}
      
      forkJoin(
        this.Service.salesOrderRetrive(id),
        this.Service.getSalesOrdItemDtls(order_id),      
        this.Service.getSalesOrdTransInfo(order_id),
        this.Service.getSalesOrdBrokerDtls(order_id),
        this.Service.getSalesOrdPartyDtls(order_id),
        this.Service.getSalesOrdDocs(order_id),
        this.Service.getSalesOrdTermsCon(order_id),
        this.Service.getSalesOrdSumm(order_id),
        this.Service.getSalesOrdShipDtls(order_id),
        this.Service.getSalesOrdSummDyna(order_id),
        //this.DropDownListService.getCompanyBUMNCList(this.company_name),
        this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
        this.DropDownListService.getInvSalesTypes(),
        this.DropDownListService.payTermNameList(),

        this.DropDownListService.getCustomUOMs("WUOM"),
       
        this.DropDownListService.getBankLedger(),
        //this.DropDownListService.customerNameCodeList(this.company_name),
        this.DropDownListService.customerNameCodeListnew(this.company_name),
        this.DropDownListService.reasonList(),
        //this.Service.getChannelCust(),
        this.Service.getChannelCustForSales(),
       // this.DropDownListService.employeeNamesList(this.company_name),
       this.DropDownListService.getEmployeeNamenew(this.company_name),
        this.DropDownListService.getChargeMasterList(),
       // this.DropDownListService.getCompanyBUMNCList(this.company_name),
        this.DropDownListService.transporterNamesList(),
        this.Service.getSalesOrdTransChgsDynList(order_id),
        this.DropDownListService.areaList(),
        this.DropDownListService.getCustomUOMs("WUOM"),
      //  this.DropDownListService.customerNameCodeList(this.company_name)
      ).subscribe(([salesOrderData, itemData,transData, brokerData,
        partyData,docData,termsConditionData, summData, shipmentData,summdynData,bUnitData, invoiceData, payTermData, customUomData, bankLedgerData, CustomerData,
       // reasonData, channelData, employeeData, chargeData, bunitData, TransporterData,PartyallData])=>
       reasonData, channelData, employeeData, chargeData, TransporterData,chgDyndata,area,uomdata])=>
          {
        console.log("chgDyndata:"+JSON.stringify(chgDyndata));

          this.bussiness_unit_list  = bUnitData;  
          this.invoiceType = invoiceData;
          this.payTerms  = payTermData;
          this.customUOMs = customUomData;
          this.bank_names  = bankLedgerData;
          this.partyNameList  = CustomerData;
          this.reasonIdList = reasonData;
          this.channel_master_list = channelData;
          this.employeeNames = employeeData;
          this.chargesIdList  = chargeData;
          this.businesslists  = bUnitData;
          this.trans_codes  = TransporterData;
          this.areaList=area;
          this.uoms=uomdata;
        //  this.PartyAllList = PartyallData;//CustomerData
          this.PartyAllList = CustomerData;
          if(salesOrderData["order_type"]== "Informal")
          {
            this.isHide = false;
          }
          else{
            this.isHide = true;
          }
          if(salesOrderData["ref_type"]=="Open Sales Order" && salesOrderData["order_type"]=="Formal")
          {
            this.selectCustomerStatus=true;
          }
          if(salesOrderData["ref_type"]=="Sales Order")
          {
            this.liewterstat=true;
          }
          else
          {
            this.liewterstat=false;
          }
          this.orderType = salesOrderData["order_type"];
          this.currentDate = salesOrderData["order_date"];
          if(salesOrderData["cust_channel"] != "0" && salesOrderData["cust_channel"] != '' && salesOrderData["cust_channel"] != null)
          {
            this.status = false;
            this.DropDownListService.getCustomerByChannel(salesOrderData["cust_channel"]).subscribe(customerList=>
            {
              this.status = true;
              this.partyList = customerList;
              this.userForm.patchValue({customer : salesOrderData["customer"]})
            });
          }

        //  this.onChangePartyStatic(salesOrderData["customer"]);
         // this.onChangeBuUnit(salesOrderData["business_unit"]);
         this.userForm.patchValue({business_unit: salesOrderData["business_unit"]})
         this.onChangewithinvoicetype(salesOrderData["inv_type"]);
         
          this.userForm.patchValue({id: salesOrderData["id"],order_no: salesOrderData["order_no"], order_id: salesOrderData["order_id"], order_type: salesOrderData["order_type"],
            order_date: salesOrderData["order_date"], valid_till: salesOrderData["valid_till"], price_term: salesOrderData["price_term"],
            pro_order: salesOrderData["pro_order"], cust_channel: salesOrderData["cust_channel"], cust_refdocno: salesOrderData["cust_refdocno"],
            receipt_criteria: salesOrderData["receipt_criteria"], we_uom: salesOrderData["we_uom"], 
            delivery_date: salesOrderData["delivery_date"], q_status: salesOrderData["q_status"], shipment_mode: salesOrderData["shipment_mode"],
            ref_type: salesOrderData["ref_type"], sales_person: salesOrderData["sales_person"], delivery_term: salesOrderData["delivery_term"],
            remarks: salesOrderData["remarks"], confirmed_by: salesOrderData["confirmed_by"], approval: salesOrderData["approval"], inv_type: salesOrderData["inv_type"],
            reason: salesOrderData["reason"], app_chgs_id: salesOrderData["app_chgs_id"], company_id: salesOrderData["company_id"],
            fin_year: salesOrderData["fin_year"], customer: salesOrderData["customer"],trans_borne_by_chgs:salesOrderData["trans_borne_by_chgs"],cust_channel_list:salesOrderData["cust_channel_list"],cust_ref_doc_date:salesOrderData["cust_ref_doc_date"]});
         // console.log("order Details: "+  JSON.stringify(salesOrderData));

        //  console.log("All-itemData: "+  JSON.stringify(itemData));
          let k = 0;
          this.addItems();
          this.item_sl_no = 0;
          while (this.sales_Order_Item_Dtls.length) 
          { this.sales_Order_Item_Dtls.removeAt(0);}
          for(let data1 of itemData)
          { 
            this.status = false;
            this.addItems();
            forkJoin(
              this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
              this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"],this.company_name)
            ).subscribe(([packingList, capacityEmptyWt])=>
              {
                this.status = true;
                this.capacity[k] = capacityEmptyWt.capacity;
                this.empty_bag_wt[k] =  capacityEmptyWt.empty_big_wt;
                this.selectedPackingItem[k] = data1["packing"];
                this.selectedItemName[k] = data1["item_code"];
                this.packingItem[k] = packingList; 
                this.sales_Order_Item_Dtls.at(k).patchValue(data1);
                this.sales_Order_Item_Dtls.at(k).patchValue({item_tolerance:capacityEmptyWt["tolerance"],tolerance_qty:data1["quantity"]})
                k = k + 1;
              });
            }

            //console.log("transData: "+  JSON.stringify(transData));
            this.sales_Order_Trans_Info.patchValue(transData);

          //  console.log("brokerData: "+  JSON.stringify(brokerData));
            let j = 0;
            this.addBrokers();
            this.broker_sl_no = 0;
            while (this.sales_Order_Broker_Dtls.length) 
            this.sales_Order_Broker_Dtls.removeAt(0);
            for(let data1 of brokerData)
            { 
              this.addBrokers();
              this.getBrokerName(data1["p_code"],j);
              this.selectedBrokerName[j] = data1["broker_code"];
              this.sales_Order_Broker_Dtls.at(j).patchValue(data1);
              j = j + 1;
            }
              
            let i = 0;
            console.log("partyData: "+JSON.stringify(partyData));

            this.addParty();
            this.party_sl_no = 0;
            while (this.sales_Order_Party_Dtls.length) 
            this.sales_Order_Party_Dtls.removeAt(0);

            for(let data1 of partyData)
            { 
              this.addParty();
              this.onChangePartyName(data1["p_code"],i)
             // console.log("FIND DATA:::"+data1["p_code"])
              this.sales_Order_Party_Dtls.at(i).patchValue(data1);
              i = i + 1;
            }
           
            if(salesOrderData["delivery_term"]=='FOR')
            {this.transChgsDyn=true;}
            else
            {this.transChgsDyn=false;}
            let y = 0;
            this.addChgs();
            this.chgs_sl_no = 0;
            while (this.sales_Order_Trans_Chgs_dyn.length)
            {this.sales_Order_Trans_Chgs_dyn.removeAt(0);}
            for(let chgsdyndata of chgDyndata)
            { 
             
              this.DropDownListService.getTransChargeCode(chgsdyndata['transporter_name'],chgsdyndata['transport_from'],chgsdyndata['transport_to'],'Sales').subscribe(chrgcode=>
              {
                this.ChargeList[y]=chrgcode;
                this.addChgs();
                this.selectedTransacc[y] = chgsdyndata["transportation_acc"];
                this.selectedTdsacc[y] = chgsdyndata["tds_acc"];
                this.selectedChgCode[y] = chgsdyndata["charge_code"];
            
                this.sales_Order_Trans_Chgs_dyn.at(y).patchValue({transport_from:chgsdyndata["transport_from"],transport_to:chgsdyndata["transport_to"]});
               
                this.sales_Order_Trans_Chgs_dyn.at(y).patchValue(chgsdyndata);
                y = y + 1;
              })
            

             
            }

            while (this.sales_Order_Docs.length)
            {this.sales_Order_Docs.removeAt(0);}
            for(let data1 of docData)
            { this.add2();}
            this.sales_Order_Docs.patchValue(docData);
            //console.log("docData: "+JSON.stringify(docData));
    

          
            this.sales_Order_Terms_Con.patchValue(termsConditionData);
       
            //console.log("termsconData: "+this.sales_Order_Terms_Con.get("payment_term").value);

          // console.log("summData::"+JSON.stringify(summData));
            this.sales_Order_Summary.patchValue(summData)
           
          //  console.log("order Details: "+  JSON.stringify(shipmentData));

           
            if(salesOrderData["customer"] != "0")
            {
              this.status = false;
              this.DropDownListService.getCustDelvFromList(salesOrderData["customer"]).subscribe(custDelvAddList=>
              {
                this.customerDelvAddList = custDelvAddList;
                this.sales_Order_Shipment_Dtls.patchValue({ship_addr: shipmentData["ship_addr"],
                ship_details: shipmentData["ship_details"],pay_addr: shipmentData["pay_addr"],pay_details: shipmentData["pay_details"]});
                this.status = true;
              })
            }
            else{ this.sales_Order_Shipment_Dtls.patchValue(shipmentData)}
          //  console.log("termsconData1: "+this.sales_Order_Terms_Con.get("payment_term").value);
           // console.log("appChgData: "+  JSON.stringify(summdynData));
          
            while (this.sales_Order_Summary_dyn.length) 
            this.sales_Order_Summary_dyn.removeAt(0);
            for(let data1 of summdynData) 
            this.add3();
            this.sales_Order_Summary_dyn.patchValue(summdynData);

            this.onChangeWgmtUom(salesOrderData["we_uom"])
            this.status = true;
           // console.log("termsconData2: "+this.sales_Order_Terms_Con.get("payment_term").value);
          //  console.log("payTerms:"+JSON.stringify(this.payTerms))
           
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});                               
        }
      
   onUpdateChallan(id:any, order_id:string,item,rate)
    {
      //console.log(item+"//"+rate)
      this.deliverychallanstatus=false;
      console.log(" challan "+ this.deliverychallanstatus);
      this.salesordersave = true;
      this.userForm.patchValue({id: id});
      console.log("item :: "+ item)
      if(item=="true")
      {
        this.additemstatus=true;
        console.log(this.additemstatus)
      }
      
      if(rate=="true")
      {
        this.addratestatus=false;
       // console.log(this.additemstatus+"/2/"+this.addratestatus)
      }
      else{
        this.addratestatus=true;
      }
     
//console.log(this.additemstatus+"///"+this.addratestatus)
    if(id>0)
    {
      this.OrderStatusList = [{display: "-Select-", value: "0"},{display: "Close", value: "Close"},
      {display: "Finalise", value: "Finalise"}];
    }
    else
    {
      this.OrderStatusList = [{display: "Pending", value: "Pending"},
      {display: "Finalise", value: "Finalise"}];
    }
      

      this.status = false;
      this.isHidden = true;
      this.operation = 'Update';
      this.packingItem = [];
      this.selectedItemName = [];
      this.selectedPackingItem = [];
      this.selectedPartyName = [];
      this.selectedBrokerName = [];
      this.itemdisable=[];
      this.selectedTransacc=[];
      this.selectedTdsacc=[];
      
      forkJoin(
        this.Service.salesOrderRetrive(id),
        this.Service.getSalesOrdItemDtls(order_id),      
        this.Service.getSalesOrdTransInfo(order_id),
        this.Service.getSalesOrdBrokerDtls(order_id),
        this.Service.getSalesOrdPartyDtls(order_id),
        this.Service.getSalesOrdDocs(order_id),
        this.Service.getSalesOrdTermsCon(order_id),
        this.Service.getSalesOrdSumm(order_id),
        this.Service.getSalesOrdShipDtls(order_id),
        this.Service.getSalesOrdSummDyna(order_id),
        //this.DropDownListService.getCompanyBUMNCList(this.company_name),
        this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
        this.DropDownListService.getInvSalesTypes(),
        this.DropDownListService.payTermNameList(),

        this.DropDownListService.getCustomUOMs("WUOM"),
       
        this.DropDownListService.getBankLedger(),
        //this.DropDownListService.customerNameCodeList(this.company_name),
        this.DropDownListService.customerNameCodeListnew(this.company_name),
        this.DropDownListService.reasonList(),
        //this.Service.getChannelCust(),
        this.Service.getChannelCustForSales(),
       // this.DropDownListService.employeeNamesList(this.company_name),
       this.DropDownListService.getEmployeeNamenew(this.company_name),
        this.DropDownListService.getChargeMasterList(),
       // this.DropDownListService.getCompanyBUMNCList(this.company_name),
        this.DropDownListService.transporterNamesList(),
        this.Service.getSalesOrdSummDyna(order_id),
        this.DropDownListService.areaList(),
        this.DropDownListService.getCustomUOMs("WUOM"),
      //  this.DropDownListService.customerNameCodeList(this.company_name)
      ).subscribe(([salesOrderData, itemData,transData, brokerData,
        partyData,docData,termsConditionData, summData, shipmentData,summdynData,bUnitData, invoiceData, payTermData, customUomData, bankLedgerData, CustomerData,
       // reasonData, channelData, employeeData, chargeData, bunitData, TransporterData,PartyallData])=>
       reasonData, channelData, employeeData, chargeData, TransporterData,chgDyndata,area,uomdata])=>
          {
        console.log(JSON.stringify(itemData));

          this.bussiness_unit_list  = bUnitData;
          this.areaList=area;
          this.uoms=uomdata;
          this.invoiceType = invoiceData;
          this.payTerms  = payTermData;
          this.customUOMs = customUomData;
        
          this.bank_names  = bankLedgerData;
          this.partyNameList  = CustomerData;
          this.reasonIdList = reasonData;
          this.channel_master_list = channelData;
          this.employeeNames = employeeData;
          this.chargesIdList  = chargeData;
          this.businesslists  = bUnitData;
          this.trans_codes  = TransporterData;
        //  this.PartyAllList = PartyallData;//CustomerData
        this.PartyAllList = CustomerData;
        
          if(salesOrderData["order_type"]== "Informal")
          {
            this.isHide = false;
          }
          else{
            this.isHide = true;
          }

          if(salesOrderData["ref_type"]=="Open Sales Order" && salesOrderData["order_type"]=="Formal")
          {
            this.selectCustomerStatus=true;
          }

          if(salesOrderData["ref_type"]=="Sales Order")
          {
            this.liewterstat=true;
          }
          else
          {
            this.liewterstat=false;
          }
          this.orderType = salesOrderData["order_type"];
          this.currentDate = salesOrderData["order_date"];
          if(salesOrderData["cust_channel"] != "0" && salesOrderData["cust_channel"] != '' && salesOrderData["cust_channel"] != null)
          {
            this.status = false;
            this.DropDownListService.getCustomerByChannel(salesOrderData["cust_channel"]).subscribe(customerList=>
            {
              this.status = true;
              this.partyList = customerList;
              this.userForm.patchValue({customer : salesOrderData["customer"]})
            });
          }

        //  this.onChangePartyStatic(salesOrderData["customer"]);
         // this.onChangeBuUnit(salesOrderData["business_unit"]);
         this.userForm.patchValue({business_unit: salesOrderData["business_unit"]})
         this.onChangewithinvoicetype(salesOrderData["inv_type"]);
         
          this.userForm.patchValue({id: salesOrderData["id"],order_no: salesOrderData["order_no"], order_id: salesOrderData["order_id"], order_type: salesOrderData["order_type"],
            order_date: salesOrderData["order_date"], valid_till: salesOrderData["valid_till"], price_term: salesOrderData["price_term"],
            pro_order: salesOrderData["pro_order"], cust_channel: salesOrderData["cust_channel"], cust_refdocno: salesOrderData["cust_refdocno"],
            receipt_criteria: salesOrderData["receipt_criteria"], we_uom: salesOrderData["we_uom"], 
            delivery_date: salesOrderData["delivery_date"], q_status: salesOrderData["q_status"], shipment_mode: salesOrderData["shipment_mode"],
            ref_type: salesOrderData["ref_type"], sales_person: salesOrderData["sales_person"], delivery_term: salesOrderData["delivery_term"],
            remarks: salesOrderData["remarks"], confirmed_by: salesOrderData["confirmed_by"], approval: salesOrderData["approval"], inv_type: salesOrderData["inv_type"],
            reason: salesOrderData["reason"], app_chgs_id: salesOrderData["app_chgs_id"], company_id: salesOrderData["company_id"],
            fin_year: salesOrderData["fin_year"], customer: salesOrderData["customer"],trans_borne_by_chgs:salesOrderData["trans_borne_by_chgs"]});
         // console.log("order Details: "+  JSON.stringify(salesOrderData));

        //  console.log("All-itemData: "+  JSON.stringify(itemData));
          let k = 0;
          this.addItems();
          this.item_sl_no = 0;
          while (this.sales_Order_Item_Dtls.length) 
          { this.sales_Order_Item_Dtls.removeAt(0);}
          for(let data1 of itemData)
          { 
            this.status = false;
            this.addItems();
            forkJoin(
              this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
              this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"],this.company_name)
            ).subscribe(([packingList, capacityEmptyWt])=>
              {
                this.status = true;
                this.capacity[k] = capacityEmptyWt.capacity;
                this.empty_bag_wt[k] =  capacityEmptyWt.empty_big_wt;
                this.selectedPackingItem[k] = data1["packing"];
                this.selectedItemName[k] = data1["item_code"];
                this.ratePointIndex[k]=this.addratestatus;
                this.packingItem[k] = packingList; 
                this.itemdisable[k]=true;

                this.sales_Order_Item_Dtls.at(k).patchValue(data1);
                this.sales_Order_Item_Dtls.at(k).patchValue({item_tolerance:capacityEmptyWt["tolerance"],tolerance_qty:data1["quantity"]})
                k = k + 1;
              });
            }

            //console.log("transData: "+  JSON.stringify(transData));
            this.sales_Order_Trans_Info.patchValue(transData);

          //  console.log("brokerData: "+  JSON.stringify(brokerData));
            let j = 0;
            this.addBrokers();
            this.broker_sl_no = 0;
            while (this.sales_Order_Broker_Dtls.length) 
            this.sales_Order_Broker_Dtls.removeAt(0);
            for(let data1 of brokerData)
            { 
              this.addBrokers();
              this.getBrokerName(data1["p_code"],j);
              this.selectedBrokerName[j] = data1["broker_code"];
              this.sales_Order_Broker_Dtls.at(j).patchValue(data1);
              j = j + 1;
            }
              
            let i = 0;
           // console.log("partyData: "+JSON.stringify(partyData));

            this.addParty();
            this.party_sl_no = 0;
            while (this.sales_Order_Party_Dtls.length) 
            this.sales_Order_Party_Dtls.removeAt(0);

            for(let data1 of partyData)
            { 

              this.addParty();
              this.onChangePartyName(data1["p_code"],i)
             // console.log("FIND DATA:::"+data1["p_code"])
              this.sales_Order_Party_Dtls.at(i).patchValue(data1);
              i = i + 1;
            }
           
            if(salesOrderData["delivery_term"]=='FOR')
            {this.transChgsDyn=true;}
            else
            {this.transChgsDyn=false;}
            let y = 0;
            this.addChgs();
            this.chgs_sl_no = 0;
            while (this.sales_Order_Trans_Chgs_dyn.length)
            {this.sales_Order_Trans_Chgs_dyn.removeAt(0);}
            for(let chgsdyndata of chgDyndata)
            { 
              this.addChgs();
              this.selectedTransacc[y] = chgsdyndata["transportation_acc"];
              this.selectedTdsacc[y] = chgsdyndata["tds_acc"];
              this.selectedChgCode[y] = chgsdyndata["charge_code"];
             // console.log("Enter update:"+chgsdyndata["transporter_name"]+"//"+y);
              this.sales_Order_Trans_Chgs_dyn.at(y).patchValue({transport_from:chgsdyndata["transport_from"],transport_to:chgsdyndata["transport_to"]});
              this.OnChangeTransporterNameChgs(chgsdyndata["transporter_name"],y);
              this.sales_Order_Trans_Chgs_dyn.at(y).patchValue(chgsdyndata);
              y = y + 1;
            }

            while (this.sales_Order_Docs.length)
            {this.sales_Order_Docs.removeAt(0);}
            for(let data1 of docData)
            { this.add2();}
            this.sales_Order_Docs.patchValue(docData);
            //console.log("docData: "+JSON.stringify(docData));
    

          
            this.sales_Order_Terms_Con.patchValue(termsConditionData);
       
            //console.log("termsconData: "+this.sales_Order_Terms_Con.get("payment_term").value);

          // console.log("summData::"+JSON.stringify(summData));
            this.sales_Order_Summary.patchValue(summData)
           
          //  console.log("order Details: "+  JSON.stringify(shipmentData));

           
            if(salesOrderData["customer"] != "0")
            {
              this.status = false;
              this.DropDownListService.getCustDelvFromList(salesOrderData["customer"]).subscribe(custDelvAddList=>
              {
                this.customerDelvAddList = custDelvAddList;
                this.sales_Order_Shipment_Dtls.patchValue({ship_addr: shipmentData["ship_addr"],
                ship_details: shipmentData["ship_details"],pay_addr: shipmentData["pay_addr"],pay_details: shipmentData["pay_details"]});
                this.status = true;
              })
            }
            else{ this.sales_Order_Shipment_Dtls.patchValue(shipmentData)}
          //  console.log("termsconData1: "+this.sales_Order_Terms_Con.get("payment_term").value);
           // console.log("appChgData: "+  JSON.stringify(summdynData));
          
            while (this.sales_Order_Summary_dyn.length) 
            this.sales_Order_Summary_dyn.removeAt(0);
            for(let data1 of summdynData) 
            this.add3();
            this.sales_Order_Summary_dyn.patchValue(summdynData);

            this.onChangeWgmtUom(salesOrderData["we_uom"])
            this.status = true;
           // console.log("termsconData2: "+this.sales_Order_Terms_Con.get("payment_term").value);
          //  console.log("payTerms:"+JSON.stringify(this.payTerms))
           
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});                               
        }
        
      onPrint(id,order_id)
        {      
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.data = {  };
          let comp=this.company_name;

          let dialogRef = this.dialog.open(SalesOrderPrintComponent, {data: {alldata: id,orderid:order_id,company_name:comp}, height: '80%',
          width: '70%'});
          dialogRef.afterClosed().subscribe( data => 
          {
          // this.sales_Invoice_Item_Dtls.at(index).patchValue({acc_norms: data["qc_code"]});
          });      
      }
       
      onProformainvoice(id,order_id)
      {      
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {  };
        let comp=this.company_name;

        let dialogRef = this.dialog.open(SaleorderproformaprintComponent, {data: {alldata: id,orderid:order_id,company_name:comp}, height: '80%',
        width: '70%'});
        dialogRef.afterClosed().subscribe( data => 
        {
        });      
    }



      delete(index) 
      {
        if(index)
        {this.sales_Order_Summary_dyn.removeAt(index);}
        else
        {
          if(this.sales_Order_Summary_dyn.length>1)
          {
            this.sales_Order_Summary_dyn.removeAt(index);
          }
          else
          {
            alert("can't delete all rows");
          }} 
      }


        onClickShowLiewTermination()
        {

          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.data = {  };
          let comp=this.company_name;
          if(this.userForm.get("order_type").value == "Informal")
          {
            let dialogRef = this.dialog.open(LiewSaleorderPopupComponent);
            dialogRef.afterClosed().subscribe( data => 
            {
            //  console.log(JSON.stringify(data)) 
              
              if(data.sale_id !=null || data.sale_id !='')
              {
                forkJoin(
                  this.Service.salesOrderRetrive(data.sale_id),
                  this.Service.getSalesOrdItemDtls(data.sale_order_id)
                )
                .subscribe(([salesOrderData, itemData])=>
                  {

                        this.userForm.patchValue({
                       
                        order_no:salesOrderData["order_no"],
                        valid_till:salesOrderData["valid_till"],
                        order_date:salesOrderData["order_date"],
                       
                        price_term:salesOrderData["price_term"],
                       
                        cust_refdocno:salesOrderData["cust_refdocno"],
                        business_unit:salesOrderData["business_unit"],
                        receipt_criteria:salesOrderData["receipt_criteria"],
                        we_uom:salesOrderData["we_uom"],
                        shipment_mode:salesOrderData["shipment_mode"],
                        sales_person:salesOrderData["sales_person"],
                        delivery_date:salesOrderData["delivery_date"],
                        q_status:salesOrderData["q_status"],
                        confirmed_by:salesOrderData["confirmed_by"],
                        approval:salesOrderData["approval"],
                        reason:salesOrderData["reason"],
                        delivery_term:salesOrderData["delivery_term"],
                        app_chgs_id:salesOrderData["app_chgs_id"],
                        inv_type: salesOrderData["inv_type"],
                        brokerage_app: salesOrderData["brokerage_app"]});

                    
                                  let k = 0;
                                  this.addItems();
                                  this.item_sl_no = 0;
                                  while (this.sales_Order_Item_Dtls.length) 
                                  { this.sales_Order_Item_Dtls.removeAt(0);}
                                  for(let data1 of itemData)
                                  { 
                                    this.status = false;
                                    this.addItems();
                                    forkJoin(
                                      this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                                      this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"],this.company_name)
                                    ).subscribe(([packingList, capacityEmptyWt])=>
                                      {
                                        this.status = true;
                                        this.capacity[k] = capacityEmptyWt.capacity;
                                        this.empty_bag_wt[k] =  capacityEmptyWt.empty_big_wt;
                                        this.selectedPackingItem[k] = data1["packing"];
                                        this.selectedItemName[k] = data1["item_code"];
                                        this.packingItem[k] = packingList; 
                                        this.sales_Order_Item_Dtls.at(k).patchValue(data1);
                                        this.sales_Order_Item_Dtls.at(k).patchValue({item_tolerance:capacityEmptyWt["tolerance"],tolerance_qty:data1["quantity"]})
                                        k = k + 1;
                                      });
                                    }
                  });
                            
                }
            });
        }
    } 

     getProducts(request) {
     // console.log("tuhin req "+request.size);
      this.DropDownListService.getAll(request.page,request.size)
      .subscribe(data => {
          this.listSalesOrder = data['content'];
          this.totalElements = data['totalElements'];
      }
      
      );
  }
  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getProducts(request);
}

      searchsaleorder(event)
      {
        this.status=true;
      let serchText = event.target.value;
      if(event.key == "Enter")
      {
          
          if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
          {
            this.getProducts({ page: "0", size: "10" });
            this.status=true;
          }
          else
          {
            //console.log("2" + serchText);
            this.DropDownListService.findsaleorder(serchText).subscribe(data=>
            {
              this.listSalesOrder =data
             
              this.status = true;
            });     
          }
      }
    
      }

      search()
      {
        let order1_no=this.userForm1.get("order1_no").value;
        let todate=this.userForm1.get("todate").value;
        let fromdate=this.userForm1.get("fromdate").value;
        let customername=this.userForm1.get("customername").value;
        let finyear =localStorage.getItem("financial_year");
        this.status=false;
        this.DropDownListService.searchsaleorder("orderno="+order1_no+"&fromdate="+fromdate+"&todate="+todate+"&customername="+customername+"&finyear="+finyear).subscribe(data=>
          {
           // console.log("here data comses " + JSON.stringify(data))
            this.listSalesOrder =data;
            this.status=true;

          }, (error) => {this.status=true;
            alert("Sale Order Not Found !!!")
            this.listSalesOrder=[];
          })
      }

      

  }
