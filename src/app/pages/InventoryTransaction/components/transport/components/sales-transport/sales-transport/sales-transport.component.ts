import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { salestransport } from '../../../../../../../Models/SalesTransaction/salestransport';
import { DropdownServiceService } from '../../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../../service/master.service';
import { ExcelService } from '../../../../../../../service/excel.service';
import { TransportjvpostingComponent } from '../../transportjvposting/transportjvposting.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SalestransportimagepopupComponent } from '../../salestransportimagepopup/salestransportimagepopup.component';
import { DeletesalestransportremarkpopupComponent } from '../deletesalestransportremarkpopup/deletesalestransportremarkpopup.component';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-sales-transport',
  templateUrl: './sales-transport.component.html',
  styleUrls: ['./sales-transport.component.scss']
})
export class SalesTransportComponent implements OnInit {
  model: salestransport = new salestransport();
  
  public userForm:FormGroup;
  public userForm1:FormGroup;
  public userForm2:FormGroup;
  public userForm3:FormGroup;
  isHidden:any; 
  businesslists:any=[];
  challanlist:any = [];
  invoiceType:any = [];
  partyList:any=[];
  status = false;
  currentDate:any;
  BuUnit:any;
  partyNameList:any=[];
  veh_nos:any=[];
  Id:any;
  actualamt:number=0;
  balanceamt:number=0;
  transportList:any=[];
  headingtop:any;
  chargesIdList:any=[];
  ledgerNames:any=[];
  salesShow:boolean=false;
  purchaseShow:boolean=false;
  itemtypes:any=[];
  grnlist:any=[];
  seq_no:string;
  invoiceno:any;
  refno:any;
  usedinvoiceno:any;
  normalsearch:boolean=true;
  SearchType:any;
  currentToDate:any;
  searchdate:any;
  transRate:any = [];
  trans_codes:any = [];
  ShowTransporterName:boolean=false;
  bulksupplyshow:boolean=false;

  transId:any;
  filteredOptions: Observable<string[]>;
  custId:any;
  custFilteredOptions: Observable<string[]>;

  constructor(public fb:FormBuilder, public dialog: MatDialog,
    private Service: Master, private DropDownListService: DropdownServiceService,private excelService:ExcelService) 
    { 
      this.userForm=fb.group(
        {
          id : [''],
          company_id : [''],
          fin_year : [''],
          username:[''],
          trans_jv_no : [''],
          jvdate : [''],
          referance_no : [''],
          challandate : [''],
          challanno:[''],
          buname : [''],
          partyname : [''],
          vehicleno : [''],
          own_slip_no : [''],
          own_slip_nonew : [''],
          grosswt : [''],
          grosswtnew : [''],
          tarewt : [''],
          tarewtnew : [''],
          netwt : [''],
          netwtnew : [''],
          balancewt : [''],
          deduction_basedon : [''],
          allowed_shortage : [''],
          mat_price : [''],
          mat_amt : [''],
          price : [''],
          actual_amt : [''],
          adv_pay : [''],
          transname : [''],
          app_chgs_id : [''],
          remarks : [''],
          chgs_dedu : [''],
          tds_rate : [''],
          tds_amt : [''],
          tds_dedu_amt : [''],
          balance_amt : [''],
          round_off : [''],
          pay_amt : [''],
          final_pay : [''],
          transportqty:[''],
          loadingdate:[''],
          detaintionfromdate:[''],
          detaintiontodate:[''],
          currentdate:[''],
          transport_rate:[''],
          bags:[''],
          ailreturnweight:[''],
          bulksupply:[''],

          salestransport_app_chgs: this.fb.array([this.fb.group({    
            charges_name:'',
            add_less : '',
            rate_cal_method:'',
            app_rate: '',
            tax_rate: '',
            amount:''})])
        });
        this.userForm1=fb.group(
          {
          business_unit:[''],
          fromdate:[''],
          todate:[''],
          inv_type:[''],
          trans_type:[''],
          catagory:[''],
          pur_inv_type:[''],
          transporter_name:[''],
          customer:[''],
          });
        this.userForm2=fb.group(
          {
          fromdate:[''],
          todate:[''],
          search_type:[''],
          inv_typenew:[''],
          chlnno:[''],
          jvnum:[''],
          date_search_type:[''],
          transporter_name:[''],
          });
        this.userForm3=fb.group(
        {
        fromdate:[''],
        todate:[''],
        inv_type_search:[''],
        });
    }
    get id() {return this.userForm.get("id") as FormControl};
    get company_id() {return this.userForm.get("company_id") as FormControl};
    get fin_year() {return this.userForm.get("fin_year") as FormControl};
    get username() {return this.userForm.get("username") as FormControl};
    get trans_jv_no() {return this.userForm.get("trans_jv_no") as FormControl};
    get jvdate() {return this.userForm.get("jvdate") as FormControl};
    get referance_no() {return this.userForm.get("referance_no") as FormControl};
    get challandate() {return this.userForm.get("challandate") as FormControl};
    get buname() {return this.userForm.get("buname") as FormControl};
    get partyname() {return this.userForm.get("partyname") as FormControl};
    get own_slip_no() {return this.userForm.get("own_slip_no") as FormControl};
    get own_slip_nonew() {return this.userForm.get("own_slip_nonew") as FormControl};
    get grosswt() {return this.userForm.get("grosswt") as FormControl};
    get grosswtnew() {return this.userForm.get("grosswtnew") as FormControl};
    get tarewt() {return this.userForm.get("tarewt") as FormControl};
    get tarewtnew() {return this.userForm.get("tarewtnew") as FormControl};
    get netwt() {return this.userForm.get("netwt") as FormControl};
    get netwtnew() {return this.userForm.get("netwtnew") as FormControl};
    get balancewt() {return this.userForm.get("balancewt") as FormControl};
    get deduction_basedon() {return this.userForm.get("deduction_basedon") as FormControl};
    get allowed_shortage() {return this.userForm.get("allowed_shortage") as FormControl};
    get mat_price() {return this.userForm.get("mat_price") as FormControl};
    get mat_amt() {return this.userForm.get("mat_amt") as FormControl};
    get price() {return this.userForm.get("price") as FormControl};
    get actual_amt() {return this.userForm.get("actual_amt") as FormControl};
    get adv_pay() {return this.userForm.get("adv_pay") as FormControl};
    get transname() {return this.userForm.get("transname") as FormControl};
    get app_chgs_id() {return this.userForm.get("app_chgs_id") as FormControl};
    get remarks() {return this.userForm.get("remarks") as FormControl};
    get chgs_dedu() {return this.userForm.get("chgs_dedu") as FormControl};
    get balance_amt() {return this.userForm.get("balance_amt") as FormControl};
    get tds_rate() {return this.userForm.get("tds_rate") as FormControl};
    get tds_amt() {return this.userForm.get("tds_amt") as FormControl};
    get tds_dedu_amt() {return this.userForm.get("tds_dedu_amt") as FormControl};
    get round_off() {return this.userForm.get("round_off") as FormControl}; 
    get pay_amt() {return this.userForm.get("pay_amt") as FormControl}; 
    get final_pay() {return this.userForm.get("final_pay") as FormControl};
    get transportqty() {return this.userForm.get("transportqty") as FormControl};
    get loadingdate() {return this.userForm.get("loadingdate") as FormControl}; 
    get detaintionfromdate() {return this.userForm.get("detaintionfromdate") as FormControl};
    get detaintiontodate() {return this.userForm.get("detaintiontodate") as FormControl};
    get currentdate() {return this.userForm.get("currentdate") as FormControl};
    get bags() {return this.userForm.get("bags") as FormControl};
    get ailreturnweight() {return this.userForm.get("ailreturnweight") as FormControl};
    get bulksupply() {return this.userForm.get("bulksupply") as FormControl};

    get salestransport_app_chgs() {return this.userForm.get('salestransport_app_chgs') as FormArray;}

    get business_unit(){return this.userForm1.get("business_unit") as FormControl};
    get fromdate(){return this.userForm1.get("fromdate") as FormControl};
    get todate(){return this.userForm1.get("todate") as FormControl};
    get inv_type(){return this.userForm1.get("inv_type") as FormControl};
    get trans_type(){return this.userForm1.get("trans_type") as FormControl};
    get catagory(){return this.userForm1.get("catagory") as FormControl};
    get pur_inv_type(){return this.userForm1.get("pur_inv_type") as FormControl};
    get transporter_name(){return this.userForm1.get("transporter_name") as FormControl};
    get customer() { return this.userForm1.get("customer") as FormControl };
    
    get fromdate1(){return this.userForm2.get("fromdate") as FormControl};
    get todate1(){return this.userForm2.get("todate") as FormControl};
    get search_type(){return this.userForm2.get("search_type") as FormControl};
    get inv_typenew(){return this.userForm2.get("inv_typenew") as FormControl};
    get chlnno(){return this.userForm2.get("chlnno") as FormControl};
    get jvnum(){return this.userForm2.get("jvnum") as FormControl};
    get date_search_type(){return this.userForm2.get("date_search_type") as FormControl};
    get transporter_name1(){return this.userForm2.get("transporter_name") as FormControl};

    get fromdate2(){return this.userForm3.get("fromdate") as FormControl};
    get todate2(){return this.userForm3.get("todate") as FormControl};
    get inv_type_search(){return this.userForm3.get("inv_type_search") as FormControl};

  ngOnInit() {
    this.isHidden=false;
    this.bulksupplyshow=false;
   // this.isHidden=true;
    //this.bulksupplyshow=false;
    this.transRate=["PER TRUCK","PER UOM"];
    this.status=true;
    this.invoiceno="";
    this.usedinvoiceno="";
    //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentDate =  formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
    this.currentToDate =  formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
    forkJoin(
      this.DropDownListService.getcompanyBUMNCListnew(localStorage.getItem("company_name")),
      this.DropDownListService.getInvSalesTypes(),
      this.DropDownListService.getChargeMasterList(),
      this.DropDownListService.ledgerNameListNew(),
      this.DropDownListService.itemTypeListFastAPI(localStorage.getItem("company_name")),
      this.DropDownListService.getTransJVCode("TRANS",this.currentDate),
      this.DropDownListService.getSalesTransactionReportList(this.currentDate),
      //this.DropDownListService.transporterNamesList(),
      this.DropDownListService.getTransporterListFastbp_Id(),
      this.DropDownListService.newfastcustomerList(localStorage.getItem("company_name")),
      ).subscribe(([bunit,invoiceData,ChargeMasterData,ledgerData,itemTypeData,TransCode,reportlist,transporterData,customerdata])=>
      {
        this.ledgerNames = ledgerData;
        this.trans_codes = [{ bp_Id: 'No', bp_name: 'ALL TRANSPORTER' }].concat(transporterData);
        console.log("transport: "+JSON.stringify(transporterData));
        //console.log("data:"+JSON.stringify(bunit))
       this.chargesIdList  = ChargeMasterData;
       this.businesslists=bunit;
       this.BuUnit = 'CBU00001';
       this.invoiceType = [{ invtype_id: 'All', invtype_name: 'ALL INVOICE' }].concat(invoiceData);
       this.itemtypes  = itemTypeData;
       this.seq_no = TransCode.sequenceid;
       //this.partyList=customerdata;
       this.partyList=[{ cp_Id: 'No', cp_name: 'ALL CUSTOMER' }].concat(customerdata);
       console.log("Party list: "+JSON.stringify(this.partyList));
       this.userForm.patchValue({id: 0,currentdate:this.currentDate,jvdate:this.currentDate});
       console.log(JSON.stringify(TransCode))
       this.transportList=reportlist;
    });

    this.SearchType="Normal";

    // Search Text Field Starts
    this.filteredOptions = this.userForm1.controls['transporter_name'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.custFilteredOptions = this.userForm1.controls['customer'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterCustomer(value))
    );

  }

  /* Search Text Field Starts */
  private _filter(value: string): any[] {
    const filterValue = value.toLocaleLowerCase();
    //console.log("filterValue: "+filterValue)
    return this.trans_codes.filter(option => option.bp_name.toLocaleLowerCase().includes(filterValue));
  }

  onTransSelectionChanged(event) {
    // I want to get the full object and display the name
    this.transId=event.option.id;
    //alert(event.option.id)
    return event;
  }

  private _filterCustomer(value: string): any[] {
    const filterValue = value.toLocaleLowerCase();
    //console.log("filterValue: "+filterValue)
    return this.partyList.filter(option => option.cp_name.toLocaleLowerCase().includes(filterValue));
  }

  onCustSelectionChanged(event) {
    // I want to get the full object and display the name
    this.custId=event.option.id;
    //alert(event.option.id)
    return event;
  }
  /* Search Text Field Ends */

  /* Clear TextField Search Starts */
  ClearTransporterText(){
    this.userForm1.get("transporter_name").setValue("");
    //this.userForm1.get("transporter_name").patchValue({transporter_name: ''});
    this.transId='No';
  }

  ClearCustomerText(){
    this.userForm1.get("customer").setValue("");
    //this.userForm1.get("customer").patchValue({customer: ''});
    this.custId='No';
  }
  /* Clear TextField Search Ends */

  OnChangeSearchType(event)
  {
    if(event=="Checkbalance")
    {
      this.ShowTransporterName=true;
    }
    else
    {
      this.ShowTransporterName=false;
    }
  }
  
  showList(s:string)
  {
    
    if(s=="list")
    {
      this.isHidden=false;
      this.userForm.reset();
      this.currentDate =  formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
      this.DropDownListService.getTransJVCode("TRANS",this.currentDate).subscribe(TransCode=>
        {
          this.seq_no = TransCode.sequenceid;
          this.userForm.patchValue({id: 0,currentdate:this.currentDate,jvdate:this.currentDate});
         // console.log(JSON.stringify(TransCode))
         this.SearchType="Normal";
        });
    }
  }
  searchChallan()
  {
    this.status=false;
   // console.log("purinv type::"+this.userForm1.get("pur_inv_type").value)
    if(this.userForm1.get("business_unit").value == '' || this.userForm1.get("business_unit").value == null || this.userForm1.get("business_unit").value == 0)
    {
      alert("Please Select Bussiness Unit Name");
      this.status=true;
    }
    else if(this.userForm1.get("fromdate").value == '' || this.userForm1.get("fromdate").value == null || this.userForm1.get("fromdate").value == 0)
    {
      alert("Please Select From Date");
      this.status=true;
    }
    else if(this.userForm1.get("todate").value == '' || this.userForm1.get("todate").value == null || this.userForm1.get("todate").value == 0)
    {
      alert("Please Select To Date");
      this.status=true;
    }
    else if(this.userForm1.get("catagory").value == '' || this.userForm1.get("catagory").value == null || this.userForm1.get("catagory").value == 0)
    {
      alert("Please Select Catagory");
      this.status=true;
    }
    else if(this.userForm1.get("catagory").value == 'Sales' && (this.userForm1.get("inv_type").value == '' || this.userForm1.get("inv_type").value == null || this.userForm1.get("inv_type").value == 0))
    {
      alert("Please Select Sales Type");
      this.status=true;
    }
    else if(this.userForm1.get("catagory").value == 'Purchase' && (this.userForm1.get("pur_inv_type").value == '' || this.userForm1.get("pur_inv_type").value == null || this.userForm1.get("pur_inv_type").value == 0))
    {
      alert("Please Select Purchase Type");
      this.status=true;
    }
    else if(this.userForm1.get("trans_type").value == '' || this.userForm1.get("trans_type").value == null || this.userForm1.get("trans_type").value == 0)
    {
      alert("Please Select Transport Type");
      this.status=true;
    }
    
    else
    {
      if(this.userForm1.get("catagory").value == 'Sales')
      {
        //let trans_code = this.userForm1.get("transporter_name").value;
        let trans_code = this.transId;  // For TextField Search
        this.searchdate = this.userForm1.get("todate").value;
        //let customer_code = this.userForm1.get("customer").value;
        let customer_code = this.custId;

        if(trans_code==null || trans_code=="")
        {
          trans_code="No";
        }
        if (customer_code == null || customer_code == "") {
          customer_code = "No";
        }

        this.DropDownListService.getSalesTransportReport(this.userForm1.get("business_unit").value,
                                                         this.userForm1.get("fromdate").value,
                                                         this.userForm1.get("todate").value,
                                                         this.userForm1.get("inv_type").value,
                                                         this.userForm1.get("trans_type").value,
                                                         trans_code,customer_code).subscribe(salesdata=>
          {
           console.log("AVG :"+JSON.stringify(salesdata))
            this.challanlist = salesdata;
            this.invoiceno=salesdata["challan_no"];
            this.status=true;
            
          });
      }
      else{
        console.log("Enter else:")
        this.DropDownListService.getPurchaseTransportReport(this.userForm1.get("business_unit").value,this.userForm1.get("fromdate").value,this.userForm1.get("todate").value,this.userForm1.get("pur_inv_type").value,this.userForm1.get("trans_type").value).subscribe(purchasedata=>
          {
           console.log("data Pur:"+JSON.stringify(purchasedata))
            this.grnlist = purchasedata;
            this.invoiceno=purchasedata["challan_no"];
            this.status=true;
          });
      }
      
    } 
  }
  onChangeCatagory(catagory)
  {
    if(catagory=="Sales")
    {
      this.salesShow=true;
      this.purchaseShow=false;
    }
    else if(catagory=="Purchase"){
      this.salesShow=false;
      this.purchaseShow=true;
    }
    else{
      this.salesShow=false;
      this.purchaseShow=false;
    }
    this.userForm.patchValue({trans_catagory:catagory});
  }

  /* onChangeDate(event)
  {
    this.currentDate = event;
    console.log("event:"+event)
    this.DropDownListService.getTransJVCode("TRANS",this.currentDate).subscribe(transCode=>
    {
      console.log("data Pur:"+transCode.sequenceid)
      this.seq_no = transCode.sequenceid;
       this.status=true;
     });
  } */
  
  disabledStatus:boolean=true;

  onCreate(id,challan_date,challan_no,party,vehle_no,own_gross,own_tare,own_net,adv_paid,own_slip_no,bunit,bags,qtls,transname,referance_id,delivery_cid,avg_price,itemqty,transport_rate,transportchargesadd)
  {
    //console.log("ENTER :: "+referance_id);
    //console.log("Delivery :: "+delivery_cid);
    this.status = false;
    this.isHidden = true;
    this.refno=challan_no;
    let trans_catagory=this.userForm1.get("catagory").value;
   console.log("CHSF ::  "+transportchargesadd)

   
    if(trans_catagory=='Sales')
    {/* 
      if(transportchargesadd == true)
      { */
        forkJoin( 
          this.DropDownListService.getdeliverychallanData(delivery_cid),
          this.DropDownListService.getLoadingDetails(referance_id),
          this.DropDownListService.getTransJVCode("TRANS",this.currentDate)
          ).subscribe(([data,unloaddetails,TransCode])=>
          {
           // alert(this.userForm1.get("inv_type").value) 
              this.DropDownListService.checkBulkSupply(referance_id).subscribe(checkjobitem=>
              {
                console.log("check status:"+checkjobitem.status)
                if(checkjobitem.status=='YES')
                {
                  this.bulksupplyshow=true;
                  this.userForm.patchValue({bulksupply:'Yes'});
                }
                else
                {
                  this.bulksupplyshow=false;
                  this.userForm.patchValue({bulksupply:'No'});
                }
                
            let remark="Against Invoice No: "+challan_no+",Dated: "+formatDate(challan_date, 'dd-MM-yyyy', 'en')+","
            console.log("remark:::::"+challan_date)
            if(challan_date>="2023-09-13")
            {
              console.log("Yes")//true
              this.disabledStatus=true;
            }
            else
            {
              console.log("No")//false
              this.disabledStatus=false;

            }
              console.log("DELIVERY : : "+JSON.stringify(data));
              this.userForm.patchValue({id:id,transname:transname,jvdate:this.currentDate,challandate:challan_date,
              challanno:challan_no,buname:bunit,partyname:party,vehicleno:vehle_no,
              adv_pay:adv_paid.toFixed(2),grosswt:own_gross,tarewt:own_tare,netwt:own_net,
              own_slip_no:own_slip_no,bags:bags,qtls:qtls,mat_price:Number(avg_price).toFixed(2),
              price:data["chgs_rate_value"],
              transportation_acc:data["transportation_acc"],
              tds_acc:data["tds_acc"],
              tds_rate:data["tds_rate"],
              app_chgs_id:data["charge_id"],
              tds_code:data["tds_code"],
              deduction_basedon:data["deduction_basedon"],
              allowed_shortage:data["allowed_shortage"],
              tax_code:data["tax_code"],
              tax_rate:data["tax_rate"],
              uom:data["uom"],
              trans_catagory:trans_catagory,transportqty:itemqty,
              loadingdate:unloaddetails["advice_date"],
              detaintionfromdate:unloaddetails["advice_date"],
              detaintiontodate:unloaddetails["advice_date"],remarks:remark,transport_rate:transport_rate});
              
             this.seq_no = TransCode.sequenceid;
            
             console.log(this.seq_no)
              this.onChangeReason(data["charge_id"]);
                 
              });
            }); 
      /* }
      else
      {
        forkJoin( 
          this.DropDownListService.getSalesOrderData(referance_id,delivery_cid),
          this.DropDownListService.getLoadingDetails(referance_id)
          ).subscribe(([data,unloaddetails])=>
          {
            let remark="Against Invoice No: "+challan_no+",Dated: "+formatDate(challan_date, 'dd-MM-yyyy', 'en')+","
            //console.log("remark:::::"+remark)
              //console.log("GETTER : : "+JSON.stringify(data));
              this.userForm.patchValue({id:id,transname:transname,challandate:challan_date,
                challanno:challan_no,buname:bunit,partyname:party,vehicleno:vehle_no,
                adv_pay:adv_paid.toFixed(2),grosswt:own_gross,tarewt:own_tare,netwt:own_net,
                own_slip_no:own_slip_no,bags:bags,qtls:qtls,mat_price:Number(avg_price).toFixed(2),
              price:data["chgs_rate_value"],
              transportation_acc:data["transportation_acc"],
              tds_acc:data["tds_acc"],
              tds_rate:data["tds_rate"],
              app_chgs_id:data["charge_id"],
              tds_code:data["tds_code"],
              deduction_basedon:data["deduction_basedon"],
              allowed_shortage:data["allowed_shortage"],
              tax_code:data["tax_code"],
              tax_rate:data["tax_rate"],
              uom:data["uom"],
              trans_catagory:trans_catagory,transportqty:itemqty,
              loadingdate:unloaddetails["advice_date"],
              detaintionfromdate:unloaddetails["advice_date"],
              detaintiontodate:unloaddetails["advice_date"],remarks:remark,transport_rate:transport_rate});
             
              this.onChangeReason(data["charge_id"]);
            });
      } */
     
        this.invoiceno=challan_no;
    }
    this.balanceWt();
    
    this.status = true;
  }
  
  getFocusRate()
  {
    alert("You Put Rate: "+this.userForm.get("price").value+", Click 'OK' and Continue...");
  }

  onCreatePur(id,challan_date,challan_no,party,vehle_no,own_gross,own_tare,own_net,adv_paid,own_slip_no,bunit,bags,qtls,transname,referance_id,grn_id,avg_price,ref_doc_no,gross,tare)
  {
    //console.log("ENTER :: "+referance_id);
    //console.log("Delivery :: "+delivery_cid);
    this.status = false;
    this.isHidden = true;
    let trans_catagory=this.userForm1.get("catagory").value;
    let newnetwt=Number(gross)-Number(tare)
   
    //console.log("CHSF ::  "+trans_catagory)netwtnew
    if(trans_catagory=='Purchase')
    {
      // console.log(challan_date+"//"+party+"//"+vehle_no+"//"+own_gross+"//"+own_tare+"//"+own_net+"//"+adv_paid+"//"+own_slip_no)
      console.log("challan_no::"+challan_no)
      this.DropDownListService.getPurOrderTransChgsData(referance_id,grn_id).subscribe(data=>
        {
          //console.log("GETTER : : "+JSON.stringify(data));
          let remark="Against Bill No: "+challan_no+",Dated: "+formatDate(challan_date, 'dd-MM-yyyy', 'en')+","
         // console.log("remark:::::"+remark)
          this.userForm.patchValue({id:id,transname:transname,challandate:challan_date,
            challanno:challan_no,buname:bunit,partyname:party,vehicleno:vehle_no,
            grosswt:own_gross,tarewt:own_tare,netwt:own_net,
            own_slip_no:own_slip_no,bags:bags,qtls:qtls,mat_price:avg_price,
          price:data["chgs_rate_value"],
          transportation_acc:data["transportation_acc"],
          tds_acc:data["tds_acc"],
          tds_rate:data["tds_rate"],
          app_chgs_id:data["charge_id"],
          tds_code:data["tds_code"],
          deduction_basedon:data["deduction_basedon"],
          allowed_shortage:data["allowed_shortage"],
          tax_code:data["tax_code"],
          tax_rate:data["tax_rate"],
          uom:data["uom"],
          trans_catagory:trans_catagory,own_slip_nonew:ref_doc_no,
          grosswtnew:gross,tarewtnew:tare,netwtnew:newnetwt,remarks:remark});
          this.onChangeReason(data["charge_id"]);
        });
        this.invoiceno=challan_no;
       
    }
    this.balanceWt();
    this.status = true;
  }

  balanceWt()
  {

    let grosswtnew=this.userForm.get("grosswtnew").value;
    let tarewtnew=this.userForm.get("tarewtnew").value;
    let netwt=this.userForm.get("netwt").value;
    let shortage=this.userForm.get("allowed_shortage").value;
    let newnet=(grosswtnew-tarewtnew);
    let balance=(netwt-newnet);
    console.log("newnet " + this.userForm.get("netwt").value + " / " + this.userForm.get("grosswtnew").value + " / " +this.userForm.get("tarewtnew").value )
    balance=balance/100;
    
    if(this.userForm.get("tds_rate").value){
      alert("You Put TDS Rate of: " + this.userForm.get("tds_rate").value + "%, Click 'OK' and Continue...");
    }

    let dedu_wt:number=0;
    if(this.userForm.get("deduction_basedon").value=="Excess Shortage")
    {
      dedu_wt=balance-shortage;
    }
    else
    {
      dedu_wt=balance;
    }
console.log("balance "+balance)
    let mt_amt:number=0.00;
    if(balance>=0)
    {
      mt_amt=dedu_wt*Number(this.userForm.get("mat_price").value);

      console.log("mt_amt if "+ mt_amt + ' / '+ dedu_wt + ' / ' + this.userForm.get("mat_price").value)
      if(mt_amt<0)
      mt_amt=0.00;
    }
    else // -ve Balance Amt
    {
      mt_amt=dedu_wt*0;
      console.log("mt_amt else "+ mt_amt)
    }

    //let act_amt=Number(Number(this.userForm.get("price").value)*Number(this.userForm.get("transportqty").value))-Number(mt_amt);
   
   // let act_amt=Number(Number(this.userForm.get("price").value)*Number(this.userForm.get("transportqty").value))-Number(mt_amt);
   console.log(" tuhin here  " +this.userForm.get("transport_rate").value)
   let act_amt=0;
   if(this.userForm.get("transport_rate").value=="PER UOM")
    {
       act_amt=Number(Number(this.userForm.get("price").value)*Number(this.userForm.get("transportqty").value))-Number(mt_amt);
    }
    else
    {
       act_amt=Number(Number(this.userForm.get("price").value)*1)-Number(mt_amt);
    }

    console.log("act_amt  "+act_amt)
    let totalchargematrix:number=0;

    for(let v=0;v<this.salestransport_app_chgs.length;v++)
    {
      if(this.salestransport_app_chgs.at(v).get("add_less").value=='less')//less means plus
      {
        totalchargematrix += Number(this.salestransport_app_chgs.at(v).get("amount").value);   
      }
      else//add means -
      {
        totalchargematrix -= Number(this.salestransport_app_chgs.at(v).get("amount").value);
      }
    }
    let bal_amt=Number(act_amt)-Number(totalchargematrix);
    console.log("VALUE : : "+bal_amt);

    let tds_amt:number=0.00;
    if(bal_amt<0)
    {
      tds_amt=Number(bal_amt)*Number(this.userForm.get("tds_rate").value)/100;
      tds_amt=Math.round(tds_amt);
     

    }
    else
    {
      tds_amt=Number(bal_amt)*Number(this.userForm.get("tds_rate").value)/100;
      tds_amt=Math.round(tds_amt);
     console.log(" tds" + tds_amt)
    }
    let tds_dedu_amt:number=0.00;
    tds_dedu_amt=Number(bal_amt)-Number(tds_amt);

    let roundOffAmt = Math.round(tds_dedu_amt * 100) % 100;
   // console.log("RRRR : :"+roundOffAmt)
    if(roundOffAmt>0)
    {
      if(roundOffAmt >= 50)
      {
       // console.log("RRRR if 111  : :"+roundOffAmt)
        roundOffAmt = 100 - roundOffAmt;
        this.userForm.patchValue({round_off: Number(Number(roundOffAmt)/100).toFixed(2)})
       // console.log("RRRR if 222222: :"+Number(Number(roundOffAmt)/100).toFixed(2))
      }
      else
      {
       //console.log("RRRR if else 333  : :"+roundOffAmt)
        this.userForm.patchValue({round_off: Number(0 - Number(roundOffAmt)/100).toFixed(2)});
      };
    }
    else
    {
      roundOffAmt=Math.abs(roundOffAmt);
      if(roundOffAmt >= 50)
      {
       // console.log("RRRR else 111  : :"+roundOffAmt)
        roundOffAmt = 100 - roundOffAmt;
        this.userForm.patchValue({round_off: -Number(Number(roundOffAmt)/100).toFixed(2)})
        //console.log("RRRR else 222222: :"+Number(Number(roundOffAmt)/100).toFixed(2))
      }
      else
      {
        //console.log("RRRR else else 333  : :"+roundOffAmt)
        this.userForm.patchValue({round_off: -Number(0 - Number(roundOffAmt)/100).toFixed(2)});
      };
    }
    let pay_amt=Number(Number(tds_dedu_amt)+Number(this.userForm.get("round_off").value)).toFixed(2);
    
    let final_pay=Number(Number(pay_amt)-Number(this.userForm.get("adv_pay").value)).toFixed(2);
   // console.log("final_pay: "+pay_amt+" :final_pay:"+final_pay)
    this.userForm.patchValue({netwtnew:newnet,balancewt:balance,
      mat_amt:mt_amt.toFixed(2),actual_amt:act_amt.toFixed(2),
      chgs_dedu:Number(totalchargematrix).toFixed(2),balance_amt:Number(bal_amt).toFixed(2),
      tds_amt:Number(tds_amt),
      tds_dedu_amt:Number(tds_dedu_amt).toFixed(2),
      pay_amt:Number(pay_amt).toFixed(2),final_pay:Number(final_pay).toFixed(2)
    });
  }

  onChangeTrans_Mode(event)
  {
    this.userForm.patchValue({transport_rate:event});
    this.balanceWt()
  }

  onUpdate(id)
  {
    this.status = false;
    this.isHidden = true;
    forkJoin(
    this.DropDownListService.retriveSalesTransport(id)
    ).subscribe(([transport])=>
    {
      console.log("Enter : : "+JSON.stringify(transport))
      if(transport["challandate"]>="2023-09-13")
      {
        console.log("Yes")//true
        this.disabledStatus=true;
      }
      else
      {
        console.log("No")//false
        this.disabledStatus=false;

      }
     // console.log("hi......."+transport["bulksupply"])
      if(transport["bulksupply"]=='Yes')
      {
        this.bulksupplyshow=true;
      }
      else
      {
        this.bulksupplyshow=false;
      }

      this.userForm.patchValue({id: transport["id"],challandate:transport["challandate"],challanno:transport["challanno"],buname:transport["buname"],partyname:transport["partyname"],vehicleno:transport["vehicleno"],own_slip_no:transport["own_slip_no"],own_slip_nonew:transport["own_slip_nonew"],
      grosswt:transport["grosswt"],grosswtnew:transport["grosswtnew"],tarewt:transport["tarewt"],tarewtnew:transport["tarewtnew"],netwt:transport["netwt"],netwtnew:transport["netwtnew"],balancewt:transport["balancewt"],bags:transport["bags"],qtls:transport["qtls"],
      paymentson:transport["paymentson"],price:transport["price"],adv_pay:transport["adv_pay"],actual_amt:transport["actual_amt"],balance_amt:transport["balance_amt"],sales_transport_date:transport["sales_transport_date"],adv_voucher_no:transport["adv_voucher_no"],transname:transport["transname"],
      mat_price:transport["mat_price"],mat_amt:transport["mat_amt"],
      app_chgs_id:transport["app_chgs_id"],
      tds_rate:transport["tds_rate"],
      tds_amt:transport["tds_amt"],
      tds_dedu_amt:transport["tds_dedu_amt"],
      chgs_dedu:transport["chgs_dedu"],round_off:transport["round_off"],
      remarks:transport["remarks"],pay_amt:transport["pay_amt"],
      final_pay:transport["final_pay"],
      deduction_basedon:transport["deduction_basedon"],
      allowed_shortage:transport["allowed_shortage"],transportqty:transport["transportqty"],
      loadingdate:transport["loadingdate"],detaintionfromdate:transport["detaintionfromdate"],
      detaintiontodate:transport["detaintiontodate"],trans_jv_no: transport["trans_jv_no"],referance_no:transport["referance_no"],
      currentdate:transport["currentdate"],jvdate:transport["jvdate"],transport_rate:transport["transport_rate"],
      ailreturnweight:transport["ailreturnweight"],bulksupply:transport["bulksupply"]});
      //this.onChangeReason(transport["app_chgs_id"]);
      this.invoiceno=transport["challanno"];
      this.DropDownListService.getSalesTransportChgs(transport["sales_tranport_id"]).subscribe(chgsdtls=>
        {
         // console.log("chgsdtls : : "+JSON.stringify(chgsdtls))
        let j = 0;
        this.add8();
        while (this.salestransport_app_chgs.length) 
        this.salestransport_app_chgs.removeAt(0);
        for(let data1 of chgsdtls)
        { 
          this.add8();
          this.salestransport_app_chgs.at(j).patchValue(data1);
          // this.salestransport_app_chgs.at(j).patchValue({
          //   charges_name: data1.charge_name, add_less: data1.method, rate_cal_method: data1.rate_cal,
          //   tax_rate: data1.tax_rate,required:data1.required,app_rate:data1.app_rate,
          //   amount:data1.app_rate});
          j = j + 1;
        }
      });

     


         this.status = true;
     }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in Sales Transport Report,please try again....");
     this.ngOnInit()}); 

  }
  send()
  {
    this.Id= this.userForm.get("id").value as FormControl  
    this.userForm.patchValue({ company_id: localStorage.getItem("company_name"),
      fin_year:localStorage.getItem("financial_year"), 
      username: localStorage.getItem("username"),
      sales_transport_date:formatDate(new Date(), 'yyyy-MM-dd', 'en')});
      //let paymentson=this.userForm.get("paymentson").value;
      let price=this.userForm.get("price").value;
      this.status=false;
      /* if(paymentson == '' || paymentson == null || paymentson == 0)
      {
        alert("Please Select Payment On Name!!");
        this.status=true;
      } */
      if(price == '' || price == null || price == 0)
      {
        alert("Please Enter Price!!");
        this.status=true;
      }
      else if(this.userForm.get("referance_no").value =="" ||this.userForm.get("referance_no").value ==null || this.userForm.get("referance_no").value =="undefined" )
      {
      }
      else{
        
        if(this.Id>0)
        {
          this.Service.updateSalesTransport(this.userForm.getRawValue(), this.Id).subscribe( data => 
            {
              console.log("check: "+JSON.stringify(this.userForm.getRawValue()));
              alert("Sales Transport Report Updated successfully.");
              this.userForm.reset();
              this.isHidden = false;
              this.showList('list');
              this.ngOnInit();
              this.status=true;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Sales Transport Report !!! please Reload the page and try again....");
            }); 
        }
        else
        {
          this.Service.createSalesTransport(this.userForm.getRawValue())
          .subscribe(data =>
          {
            alert("Sales Transport report Saved successfully.");
            this.userForm.reset();
            this.ngOnInit();
            this.showList('list');
       
            this.userForm1.patchValue({todate:this.searchdate})
            this.searchChallan();
            this.status=true;
          });
        }
      }
  } 

  searchReport()
  {
    let fromdate=this.userForm2.get("fromdate").value;
    let todate=this.userForm2.get("todate").value;
    let inv_typenew=this.userForm2.get("inv_typenew").value;
    let chllanno=this.userForm2.get("chlnno").value;
    let jvnum=this.userForm2.get("jvnum").value;
    let date_search_type=this.userForm2.get("date_search_type").value;

    let trans_code=this.userForm2.get("transporter_name").value;

    if(trans_code==null || trans_code=="")
    {
      trans_code="No";
    }

    let invtype="";
    this.status = false;
    if(fromdate == '' || fromdate == null || fromdate == 0)
    {
      alert("Please Select From Date");
      this.status=true;
    }
    else if(todate == '' || todate == null || todate == 0)
    {
      alert("Please Select To Date");
      this.status=true;
    }
    else{

      if(this.userForm2.get("search_type").value=="Checkbalance")
      {
        this.normalsearch=false;
        this.DropDownListService.getSalesTransactionReportCheckbalance(fromdate,todate,inv_typenew,trans_code).subscribe(data=>
          {
        
          this.transportList=data;
          this.status=true;
          }, (error) => {this.status=true;
            alert("Data Not Found !!!")
            this.transportList=[];
          });
      }
      else
      {
        this.normalsearch=true;
        if(this.userForm2.get("inv_typenew").value=='INV00001')
        {
          invtype='REG';
        }
        else if(this.userForm2.get("inv_typenew").value=='INV00002')
        {
          invtype='GSI';
        }
        else if(this.userForm2.get("inv_typenew").value=='INV00003')
        {
          invtype='JWI';
        }
        else
        {
          invtype='';
        }

        //this.DropDownListService.getSalesTransactionReport(fromdate,todate,chllanno,invtype,localStorage.getItem("financial_year")).subscribe(data=>
        this.DropDownListService.getSalesTransactionReport("fromdate="+fromdate+"&todate="+todate+"&chllanno="+chllanno+"&invtype="+invtype+"&finyear="+localStorage.getItem("financial_year")+"&jvnum="+jvnum+"&date_search_type="+date_search_type).subscribe(data=>
          {
          //console.log(" report1  :: "+JSON.stringify(data))
          this.transportList=data;
          this.status=true;
          }, (error) => {this.status=true;
            alert("Data Not Found !!!")
            this.transportList=[];
          });
      }

      
    }  
    this.status=true;
  }

  exportAsXLSX():void 
  {
    let element = document.getElementById('dynamictable'); 
      this.excelService.exportAsExcelFile(element, 'Sales Transport As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm2.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm2.get("todate").value, 'dd-MM-yyyy', 'en'));
    }


    onChangeReason(applicable_charges_id:string)
    {
      if(applicable_charges_id.length && applicable_charges_id != '0')
      { 
        this.status = false;
        this.DropDownListService.getChargeMasterDtlsList(applicable_charges_id).subscribe(data=>
        {
          console.log(JSON.stringify(data))
          let i =0;
          this.add8();
          while(this.salestransport_app_chgs.length)
          {this.salestransport_app_chgs.removeAt(0);}
          
          for(let data1 of data)
          {
            this.add8();
        
            this.salestransport_app_chgs.at(i).patchValue({
              charges_name: data1.charge_name, add_less: data1.method, rate_cal_method: data1.rate_cal,
              tax_rate: data1.tax_rate,required:data1.required,app_rate:data1.app_rate,
              amount:data1.app_rate});
           console.log(data1.charge_name)
           
            i=i+1;
          }
          this.status = true;
        });
      }
    }

    chargematrixcalculation()
    {
      this.balanceWt();
    }
              

    add8()
    {
      this.salestransport_app_chgs.push(this.fb.group({
        charges_name:'',
        add_less : '',
        rate_cal_method:'',
        app_rate: '',
        tax_rate: '0',
        amount:'0',
        required:'' }));
    }

    accountpostingpopup(id,transport_id)
      {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { index: 0,};
        let dialogref;
      
        dialogref=this.dialog.open(TransportjvpostingComponent, {data:{id: id, sales_tranport_id:transport_id },height: '80%',
        width: '60%' } );
        dialogref.afterClosed().subscribe(data =>
        { 

        });
      }

      salesinvtrans:any;
      salesfilesname:any
      onClickImageShow()
      {
        console.log("IMG : : " + this.refno)
        this.DropDownListService.getTransportimage1(this.refno).subscribe(imgdata=>
          {
           // console.log("popup:"+JSON.stringify(imgdata))
            //this.salesinvtrans=imgdata["doc_pdf"];
            this.salesfilesname=imgdata["doc_file_name"];
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          let dialogRef = this.dialog.open(SalestransportimagepopupComponent, {data: {salesinv:this.salesinvtrans,filename:this.salesfilesname},height: '90%',
          width: '60%'});
          dialogRef.afterClosed().subscribe( data =>
          {
            //console.log("popup:"+JSON.stringify(data))
            this.userForm.patchValue({own_slip_nonew:data["party_slip"],grosswtnew:data["partygross"],tarewtnew:data["partytare"]});
            this.balanceWt();
          });
        });
      }
    multichallan:any = [];
    onDuplicateRefNo(refno)
    {
      this.multichallan = [];
      this.usedinvoiceno='';
      this.DropDownListService.getDuplicateRefTransport().subscribe(refdata=>
        {
          this.multichallan=refdata;
            for(let p=0;p<this.multichallan.length;p++)
            { 
              if(this.multichallan[p]["referance_no"]==refno)
              {
                this.usedinvoiceno+=this.multichallan[p]["challanno"]+","
              }
            }
            this.usedinvoiceno=this.usedinvoiceno.substring(0,this.usedinvoiceno.length-1);
            //console.log("refdata112::"+this.usedinvoiceno)
            if(this.usedinvoiceno=='' || this.usedinvoiceno==0 || this.usedinvoiceno==null)
            {
              this.usedinvoiceno="";
              this.status=true;
          }
          else{
            alert("Duplicate Reference No: "+refno+" Wth Tagged Invoice No: "+this.usedinvoiceno);
            this.status=true;
          }
      });
      
      
    }
    onChangeJVDate(date)
    {
    this.DropDownListService.getTransJVCode("TRANS",date).subscribe(transCode=>
    {
      console.log("data Pur:"+transCode.sequenceid)
      this.seq_no = transCode.sequenceid;
      this.status=true;
     });
    }

  transportStatementList:any=[];
  searchTransportStatement()
  {
    let fromdate=this.userForm3.get("fromdate").value;
    let todate=this.userForm3.get("todate").value;
    let invoicetype=this.userForm3.get("inv_type_search").value;

    this.status = false;
    if(fromdate == '' || fromdate == null || fromdate == 0)
    {
      alert("Please Select From Date");
      this.status=true;
    }
    else if(todate == '' || todate == null || todate == 0)
    {
      alert("Please Select To Date");
      this.status=true;
    }
    else if(invoicetype == '' || invoicetype == null || invoicetype == 0)
    {
      alert("Please Select To Sales Type");
      this.status=true;
    }
    else{
      this.DropDownListService.searchTransportStatement(fromdate,todate,invoicetype).subscribe(data=>
        {
        //console.log(" Transport Statement  :: "+JSON.stringify(data))
        this.transportStatementList=data;
        this.status=true;
        }, (error) => {this.status=true;
          alert("Data Not Found !!!")
          this.transportStatementList=[];
        });
    }  
    this.status=true;
  }

  exportAsXLSX1():void 
  {
    let element = document.getElementById('dynamictable1'); 
    this.excelService.exportAsExcelFile(element, 'Transportation Statement As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm3.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm3.get("todate").value, 'dd-MM-yyyy', 'en'));
  }

  onDelete(id) {
    this.status = false;
    if (confirm("Are you sure to delete this Sales Transport ?")) {
      this.userForm.patchValue({ username: localStorage.getItem("username") });
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = { id: id, obj: this.userForm.getRawValue() };
      const dialogRef = this.dialog.open(DeletesalestransportremarkpopupComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => {
        this.ngOnInit();
      });
    }
    this.status = true;
  }
}
