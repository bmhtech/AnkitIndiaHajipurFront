import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { forkJoin } from 'rxjs';
import { nongoodsservice } from '../../../../../../Models/JobWork/nongoodsservice';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../../service/excel.service';
import { Master } from '../../../../../../service/master.service';
import { NongoodsservicepopupComponent } from '../nongoodsservicepopup/nongoodsservicepopup.component';

@Component({
  selector: 'app-nongoodsservice',
  templateUrl: './nongoodsservice.component.html',
  styleUrls: ['./nongoodsservice.component.scss']
})
export class NongoodsserviceComponent implements OnInit {
  
  submitted = false;
  public userForm:FormGroup;
  model: nongoodsservice = new nongoodsservice();
  listnongoodsservice:any = [];
  bussiness_unit_list:any = [];
  isHidden:any;
  company_name:any;
  Id:any;
  rowamount:any;
  currentDate:any;
  BuUnit = "0";
  status = false;
  nongoodsservicesave:boolean=true;
  checked:boolean=false;
  Serviceno:any;
  item_sl_no = 1;
  time_sl_no = 1;
  party_sl_no = 1;
  payModes:any = [];
  serviceSales:boolean=false;
  servicePurchase:boolean=false;
  partylist:any=[];
 
  servicesublist:any=[];
  servicelist:any=[];
  selectedItemName = [];
  timeList:any=[];
  approve:any=[];
  employeeNames:any=[];
  reasonList:any=[];
  chargesIdList:any=[];
  basislist:any=[];
  ledgerNames:any=[];
  send_via_list:any=[];

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService,private excelService:ExcelService,private dialog: MatDialog) 
  { 
    this.userForm=fb.group({
      id:[''],
      nongoodsserviceid:[''],
      service_type:[''],
      serviceno:[''],
      ordertype:[''],
      b_unit:[''],
      billing_from:[''],
      billing_to:[''],
      party:[''],
      billdate:[''],
      remarks:[''],
      pan_no:[''],
      gst_no:[''],
      cin_no:[''],
      tan_no:[''],
      company_id:[''],
      fin_year:[''],
      username:[''],
      confirmed_by:[''],
      approved:[''],
      reason:[''],
      app_chgs_id:[''],
 
      nongoodsservice_item_details:this.fb.array([this.fb.group({
        slno:this.item_sl_no,
        service_types:'',
        services : '',
        account_code:'',
        amount:'',
        taxable_amount:'',
        discount : '',
        discount_basedon:'',
        discount_amount: '',
        net_amount : '',
        tax_code:'',
        tax_rate: '',
        tax_amount : '',
        total_amount:'',

          nonservice_desc_details:this.fb.array([this.fb.group({
            slno:'',
            desc_name:'',
            bill_period:'',
            bill_on:'',
            amount_change:'',
            desc_qty:'',
            desc_uom:'',
            desc_price:'',
            desc_total:'',
            billing_from:'',
            billing_to:'',
            duedate:'',
            remarks:'',
            serviceno:''
          })])    
      })]),

        nongoodsservice_terms_con:this.fb.group({
          paymenttype: '',
          payment_mode: '',
          cash_limit :'',
        	tcs_applicable:'',
	        tcs_rate: '',
          payment_terms: '',
          bank_name: '', 
          account_name: '', 
          account_no: '',
          branch: '', 
          ifsc: '',
    	    mobile: '',
          iban: '', 
          bic_swift_code: '' }),

        nongoodsservice_party_dtls:this.fb.array([this.fb.group({
          sl_no : this.party_sl_no, 
          party_name:'',
          cp_name:'',
          cp_contact:'',
          send_via:'',
          tcs_applicable:'',
          tcs_rate:'' })]),

        nongoodsservice_bank_dtls:this.fb.group({	
          pay_mode:'',
          pay_term:'',
          bank_name:'',
          account_no:'',
          ifsc_code:'',
          cash_limit:'',
          account_name:  '',  
          branch:  '',   
          iban:  '',   
          bic_swift_code:''}),
        
        nongoodsservice_summary:this.fb.group({
          item_total:'',
          discount:'',
          tax_total:'',
          net_amount:'',
          app_brokerage:'',
          net_r_value:''
        }),
        nongoodsservice_summary_dyn: this.fb.array([this.fb.group({
          charge_name:'',
          add_less:'',
          rate_cal_method:'',
          app_rate:'',
          tax_rate:''
        })]),

      nongoodsservice_time_service:this.fb.array([this.fb.group({
        slno:this.time_sl_no,
        //term_check : '',
        description : ''})]),

        nongoodsservice_docs: this.fb.array([this.fb.group({
          doc_name: '' })]),

        nongoodsservice_exit_clause:this.fb.group({
          term_nongoods_service: '',
          order_by: '',
          charges_descpt:'',
          reason: '',
          remarks: '',
          tot_term_chg: '',
          term_add: '',
          term_deduct: '',
          net_term_chg: '' }),
        
        nongoodsservice_exit_clause_dyn:this.fb.array([this.fb.group({
          charge_name:'',
          termination_cal:'',
          method: '',
          cal_qty:'',
          qty:'',
          amount:'', 
          rate: '',
          gl_account: '',
          tax_rate: '',
          tax_amount: '',
          total_amount:'' })]),    
    });
  }
  get id(){ return this.userForm.get("id") as FormControl }
  get service_type(){ return this.userForm.get("service_type") as FormControl }
  get serviceno(){ return this.userForm.get("serviceno") as FormControl }
  get ordertype(){ return this.userForm.get("ordertype") as FormControl }
  get b_unit(){ return this.userForm.get("b_unit") as FormControl }
  get billing_from(){ return this.userForm.get("billing_from") as FormControl }
  get billing_to(){ return this.userForm.get("billing_to") as FormControl }
  get party(){ return this.userForm.get("party") as FormControl }
  get billdate(){ return this.userForm.get("billdate") as FormControl }
  get remarks(){ return this.userForm.get("remarks") as FormControl }
  get pan_no(){ return this.userForm.get("pan_no") as FormControl }
  get gst_no(){ return this.userForm.get("gst_no") as FormControl }
  get cin_no(){ return this.userForm.get("cin_no") as FormControl }
  get tan_no(){ return this.userForm.get("tan_no") as FormControl }
  get company_id(){ return this.userForm.get("company_id") as FormControl }
  get fin_year(){ return this.userForm.get("fin_year") as FormControl }
  get username(){ return this.userForm.get("username") as FormControl }
  get confirmed_by(){ return this.userForm.get("confirmed_by") as FormControl }
  get approved(){ return this.userForm.get("approved") as FormControl }
  get reason(){ return this.userForm.get("reason") as FormControl }
  get app_chgs_id(){ return this.userForm.get("app_chgs_id") as FormControl }

  
  get nongoodsservice_item_details(){return this.userForm.get("nongoodsservice_item_details") as FormArray};

  get nonservice_desc_details()
  {
    return (<FormArray>(<FormGroup>this.userForm.get('nongoodsservice_item_details')).get('nonservice_desc_details')).controls;
  };
  get nongoodsservice_terms_con() { return this.userForm.get('nongoodsservice_terms_con') as FormGroup;}
  get nongoodsservice_party_dtls() { return this.userForm.get('nongoodsservice_party_dtls') as FormArray;}
  get nongoodsservice_bank_dtls() { return this.userForm.get('nongoodsservice_bank_dtls') as FormGroup;}
  get nongoodsservice_summary() { return this.userForm.get('nongoodsservice_summary') as FormGroup;}
  get nongoodsservice_summary_dyn() { return this.userForm.get('nongoodsservice_summary_dyn') as FormArray;}
  get nongoodsservice_time_service(){return this.userForm.get("nongoodsservice_time_service") as FormArray};
  get nongoodsservice_docs() { return this.userForm.get('nongoodsservice_docs') as FormArray;}
  get nongoodsservice_exit_clause() { return this.userForm.get('nongoodsservice_exit_clause') as FormGroup;}
  get nongoodsservice_exit_clause_dyn() { return this.userForm.get('nongoodsservice_exit_clause_dyn') as FormArray;}
  
  
  
  
  
  
  ngOnInit() 
  {
    //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
    this.isHidden=false;
    this.status=true;
    this.company_name = localStorage.getItem("company_name");
    let finyear =localStorage.getItem("financial_year");
    this.BuUnit = "0";
    this.nongoodsservicesave=true;
    
    this.servicePurchase=true;
    this.serviceSales=false;
    this.userForm.patchValue({service_type:true});
    this.approve=["NO","PENDING","YES"];
    this.basislist = ["Fixed","%", "UOM"];
    this.send_via_list=["Email","Fax","Courier","Other"];

   forkJoin(
    this.DropDownListService.getNonGoodsServicelist(finyear),
    this.DropDownListService.getcompanyBUMNCListFastApi(this.company_name),
    this.DropDownListService.getServiceNo(true,finyear),

    this.DropDownListService.getServiceTypeList(),

    this.DropDownListService.getTermAsService(),
    this.DropDownListService.getEmployeeNamenew(this.company_name),
    this.DropDownListService.getPurTermReasons(),
    this.DropDownListService.getChargeMasterList(),
    this.DropDownListService.ledgerNameListNew()


    )
   .subscribe(([servicedata,budata,serviceno,service,desclist,employeeData,reasonData,ChargeMasterData,
    ledgerData])=>
    {
      console.log("service:"+JSON.stringify(desclist));
      this.Serviceno=serviceno.sequenceid;
        this.listnongoodsservice = servicedata;
        this.bussiness_unit_list=budata;
        this.servicesublist=service;
        this.timeList=desclist
        this.employeeNames = employeeData;
        this.reasonList = reasonData;
        this.chargesIdList  = ChargeMasterData;
        this.ledgerNames = ledgerData;
    });

  }

  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
      this.nongoodsservicesave=true;
    }
    if(s=="list")
    {
      this.isHidden=false;
      this.item_sl_no=0;
    while(this.nongoodsservice_item_details.length)
        this.nongoodsservice_item_details.removeAt(0);
        this.add(); 
      this.userForm.reset();
       this.ResetAllValues();
    }
  }
  onChangeParty(party)
  {
    console.log("check::"+this.userForm.get("service_type").value)

    if(this.userForm.get("service_type").value==true)
    {
      this.DropDownListService.getSupplierStatDtls(party).subscribe(data1=>
        {
          console.log("Party:"+JSON.stringify(data1))
          this.userForm.patchValue({pan_no: data1["pan_no"], gst_no: data1["gst_no"], cin_no: data1["cin_no"],
                              tan_no: data1["tan_no"] });
        });
    }
    else
    {
      this.Service.custStatutoryRetriveList(party).subscribe(party=>
        {
          console.log("Party1:"+JSON.stringify(party))
          this.userForm.patchValue({pan_no: party["pan_no"], gst_no: party["gst_no"], cin_no: party["cin_no"],
                              tan_no: party["tan_no"] });
        });
    }
    
    
  }

  onChangeOrderFor(checked)
  {
    
    this.userForm.patchValue({service_type:checked});
    forkJoin(
    this.DropDownListService.getServiceNo(checked,localStorage.getItem("financial_year")),
    this.DropDownListService.getCustomerSupplierList(this.userForm.get("b_unit").value,this.userForm.get("service_type").value)
    ).subscribe(([data,PartyData])=>
      {
        //console.log("data:"+JSON.stringify(data))
        this.userForm.patchValue({serviceno:data.sequenceid});
        this.partylist = PartyData;
      });
      
          if(checked=='true')
          {
            //console.log("pur");
            this.serviceSales=false;
            this.servicePurchase=true;
          }
          if(checked=='false')
          {
            //console.log("sales");
            this.serviceSales=true;
            this.servicePurchase=false;
          }
         
  }
  onChangeBuUnit(BuUnit:string)
  { 
  //console.log("BuUnit:"+BuUnit+"//"+this.userForm.get("service_type").value)
    if(BuUnit!="0")
    {
      console.log("BuUnit:"+BuUnit+"//"+this.userForm.get("service_type").value)
        this.DropDownListService.getCustomerSupplierList(BuUnit,this.userForm.get("service_type").value).subscribe(PartyData=>
        {
          console.log("PartyData:"+JSON.stringify(PartyData))
          this.partylist = PartyData;
        });
    }  
  }
 
  onChangeServiceName(index,servicetype)
  {
   this.nongoodsservice_item_details.at(index).patchValue({service_types: servicetype});
    if(servicetype.length && servicetype !=null)
    {
      this.status = false;
      this.nongoodsservice_item_details.at(index).patchValue({item: servicetype});
       
      this.DropDownListService.getServiceList(servicetype).subscribe(serlist=>
      {
       // console.log("serlist:"+JSON.stringify(serlist))
        this.servicelist[index] = serlist;
        this.selectedItemName[index]=servicetype;
        this.status = true;
      }); 

    }
  }

 
  detailsPopUp(index)
  {
    let ordertype1=this.userForm.get("ordertype").value;
    let billing_from1=this.userForm.get("billing_from").value;
    let billing_to1=this.userForm.get("billing_to").value;
    let services = this.nongoodsservice_item_details.at(index).get('services').value;    
    if(ordertype1 == '' || ordertype1=='undefined' || ordertype1 == null)
    {
      alert("Please Select Order Type !!!!!")
    }
    if(billing_from1 == '' || billing_from1=='undefined' || billing_from1 == null)
    {
      alert("Please Select Billing From !!!!!")
    }
    if(billing_to1 == '' || billing_to1=='undefined' || billing_to1 == null)
    {
      alert("Please Select Billing To !!!!!")
    }
    else if(services == '' || services=='undefined' || services == null)
    {
        alert("Please Select Service Name !!!!!")
    }
    else
    {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.Id= this.userForm.get("id").value;
        this.rowamount=this.nongoodsservice_item_details.at(index).get('amount').value; 
        if(this.Id == null || this.Id =='')
        {
          this.Id=0;
          this.rowamount=0
        }

        dialogConfig.data = {id: this.Id, services: services,ordertype:ordertype1,billing_from:billing_from1,billing_to:billing_to1,rowamount:this.rowamount};
        const dialogRef = this.dialog.open(NongoodsservicepopupComponent, dialogConfig);
        dialogRef.afterClosed().subscribe( data => 
        {
// tuhinlook here
              if(data != '')
              {
                console.log("popupdata :: "+JSON.stringify(data))
                this.nongoodsservice_item_details.at(index).patchValue({amount:data['totalamt']});

              
                while ((<FormArray>(<FormGroup>(<FormArray>this.userForm.controls['nongoodsservice_item_details'])
                .controls[index]).controls['nonservice_desc_details']).length)


                (<FormArray>(<FormGroup>(<FormArray>this.userForm.controls['nongoodsservice_item_details'])
                .controls[index]).controls['nonservice_desc_details']).removeAt(0);

                for(let data1 of data.nonservice_desc_details)
                {
                  this.addPhone(index, data1);
                }
              }
        });
    }
    
  }
  
  addPhone(userIndex: number, data?: any) {
    
    console.log('userIndex', userIndex, '-------', 'data', data);
  
    let fg = this.fb.group({
      slno:data.slno,
      desc_name:data.desc_name,
      bill_period:data.bill_period,
      bill_on:data.bill_on,
      amount_change:data.amount_change,
      desc_qty:data.desc_qty,
      desc_uom:data.desc_uom,
      desc_price:data.desc_price,
      desc_total:data.desc_total,
      billing_from:data.billing_from,
      billing_to:data.billing_to,
      duedate:data.duedate,
      remarks:data.remarks,
      serviceno:data.serviceno
    });
    
    (<FormArray>(<FormGroup>(<FormArray>this.userForm.controls['nongoodsservice_item_details'])
        .controls[userIndex]).controls['nonservice_desc_details']).push(fg);

}

onUpdate(id,nongoodsid,bunit,sertype,action)
    {
      this.isHidden=true;
      if(action == "view")
      {
        this.nongoodsservicesave=false;
      }
      if(action == "update")
      {
        this.nongoodsservicesave=true;
      }
      this.userForm.patchValue({id:id});
      this.approve=["NO","PENDING","YES"];
      this.basislist = ["Fixed","%", "UOM"];
      this.send_via_list=["Email","Fax","Courier","Other"];

      forkJoin(
        this.DropDownListService.retriveNongoodsService(id),
        this.DropDownListService.getcompanyBUMNCListFastApi(this.company_name),
        this.DropDownListService.getServiceTypeList(),
        this.DropDownListService.getTermAsService(),
        this.DropDownListService.getEmployeeNamenew(this.company_name),
        this.DropDownListService.getPurTermReasons(),
        this.DropDownListService.getChargeMasterList(),
        this.DropDownListService.ledgerNameListNew(),
        this.DropDownListService.retriveNongoodsServiceItem(nongoodsid),
        this.DropDownListService.retriveNongoodsServiceTermsCon(nongoodsid),
        this.DropDownListService.retriveNongoodsServiceParty(nongoodsid),
        this.DropDownListService.retriveNongoodsServiceBankDtls(nongoodsid),
        this.DropDownListService.retriveNongoodsServiceSummary(nongoodsid),
        this.DropDownListService.retriveNongoodsServiceSummaryDyn(nongoodsid),
        this.DropDownListService.retriveNongoodsServiceTimeService(nongoodsid),
        this.DropDownListService.retriveNongoodsServiceDocs(nongoodsid),
        this.DropDownListService.retriveNongoodsServiceExitClause(nongoodsid),
        this.DropDownListService.retriveNongoodsServiceExitClauseDyn(nongoodsid),
        this.DropDownListService.getCustomerSupplierList(bunit,sertype)

        
        ).subscribe(([nongoods,budata,service,desclist,employeeData,reasonData,ChargeMasterData,ledgerData,
          itemData,termConData,partyData,bankData,summaryData,summaryDyn,timeData,docsData,exitClauseData,exitDynData,partydata])=>
        {
         // console.log("nongoods"+JSON.stringify(partydata))
          this.bussiness_unit_list=budata;
          this.servicesublist=service;
          this.timeList=desclist
          this.employeeNames = employeeData;
          this.reasonList = reasonData;
          this.chargesIdList  = ChargeMasterData;
          this.ledgerNames = ledgerData;
          this.partylist=partydata;
          console.log("type:"+nongoods["service_type"]+" / "+ this.checked)
          if(nongoods["service_type"]==true)
          {
            this.checked=true;
          }
          else{
            this.checked=false;
          }
          console.log("type12:"+nongoods["service_type"]+" / "+ this.checked)
          this.userForm.patchValue({service_type:nongoods["service_type"]});
          this.userForm.patchValue({serviceno:nongoods["serviceno"],ordertype:nongoods["ordertype"],b_unit:nongoods["b_unit"],billing_from:nongoods["billing_from"],
          billing_to:nongoods["billing_to"],party:nongoods["party"],billdate:nongoods["billdate"],pan_no:nongoods["pan_no"],gst_no:nongoods["gst_no"],cin_no:nongoods["cin_no"],tan_no:nongoods["tan_no"],
          confirmed_by:nongoods["confirmed_by"],approved:nongoods["approved"],reason:nongoods["reason"],remarks:nongoods["remarks"],app_chgs_id:nongoods["app_chgs_id"]});
         
          this.time_sl_no = 0;
          
          let k=0;
          this.item_sl_no = 0;
          while (this.nongoodsservice_item_details.length) 
          this.nongoodsservice_item_details.removeAt(0);
          for(let data1 of itemData)
          {   
            
            this.add();
          
           
            forkJoin(
            this.DropDownListService.getItemDetailsSerList(nongoodsid,data1["services"]),
            this.DropDownListService.getServiceList(data1["service_types"])
            ).subscribe(([itemdynamic,serlist])=>
              {
                this.selectedItemName[k] = data1["service_types"];
                this.servicelist[k] = serlist;

                this.nongoodsservice_item_details.at(k).patchValue({slno:data1["slno"],service_types:data1["service_types"],services:data1["services"],account_code:data1["account_code"]
                ,amount:data1["amount"],taxable_amount:data1["taxable_amount"],discount:data1["discount"],discount_basedon:data1["discount_basedon"],discount_amount:data1["discount_amount"],
                net_amount:data1["net_amount"],tax_code:data1["tax_code"],tax_rate:data1["tax_rate"],tax_amount:data1["tax_amount"],total_amount:data1["total_amount"]});

                
                while ((<FormArray>(<FormGroup>(<FormArray>this.userForm.controls['nongoodsservice_item_details'])
                .controls[k]).controls['nonservice_desc_details']).length)


                (<FormArray>(<FormGroup>(<FormArray>this.userForm.controls['nongoodsservice_item_details'])
                .controls[k]).controls['nonservice_desc_details']).removeAt(0);

                for(let item of itemdynamic)
                {
                  this.addPhone(k, item);
                }

                k++;
              });
         
          }
          
          this.nongoodsservice_terms_con.patchValue(termConData);
          
          let l=0;
          this.party_sl_no = 0;
          while (this.nongoodsservice_party_dtls.length) 
          this.nongoodsservice_party_dtls.removeAt(0);
          for(let data7 of partyData)
          {   
            this.addParty();
            this.nongoodsservice_party_dtls.at(l).patchValue(data7);
            l++;
          }

          this.nongoodsservice_bank_dtls.patchValue(bankData);
          this.nongoodsservice_summary.patchValue(summaryData);
    
          let m=0;
          while (this.nongoodsservice_summary_dyn.length) 
          this.nongoodsservice_summary_dyn.removeAt(0);
          for(let data6 of summaryDyn)
          {   
            this.addSummaryDyn();
            this.nongoodsservice_party_dtls.at(m).patchValue(data6);
            m++;
          }

          let n=0;
          while (this.nongoodsservice_time_service.length) 
          this.nongoodsservice_time_service.removeAt(0);
          for(let dataa2 of timeData)
          {   
            this.addTime();
            this.nongoodsservice_time_service.at(n).patchValue(dataa2);
            n++;
          }

          let p=0;
          while (this.nongoodsservice_docs.length) 
          this.nongoodsservice_docs.removeAt(0);
          for(let data2 of docsData)
          {   
            this.addDoc();
            this.nongoodsservice_docs.at(p).patchValue(docsData);
            p++;
          }
         
          if(exitClauseData["term_nongoods_service"] == 'true')
          {
            this.is_tporder_checked = true;
           // console.log("exitDynData true:"+JSON.stringify(exitDynData))
            while(this.nongoodsservice_exit_clause_dyn.length)
            this.nongoodsservice_exit_clause_dyn.removeAt(0);
            this.addExitclause();
            let a=0;
            for(let dataa of exitDynData)
            {   
              this.addExitclause();
              console.log(dataa["to"])
              this.nongoodsservice_exit_clause_dyn.at(a).patchValue(dataa);
              a++;
            }
          }
          else
          {
            this.is_tporder_checked = false;
           // console.log("exitDynData false:"+JSON.stringify(exitDynData))
            this.nongoodsservice_exit_clause.patchValue({order_by: "0", charges_descpt: "0", reason: "0",
              remarks: "", tot_term_chg: 0, term_add: 0, term_deduct: 0, net_term_chg: 0});

            while(this.nongoodsservice_exit_clause_dyn.length)
            this.nongoodsservice_exit_clause_dyn.removeAt(0);
            this.addExitclause();
          }
          
          this.nongoodsservice_exit_clause.patchValue(exitClauseData);
    
          let q=0;
          while (this.nongoodsservice_exit_clause_dyn.length) 
          this.nongoodsservice_exit_clause_dyn.removeAt(0);
          for(let data2 of exitDynData)
          {   
            this.addExitclause();
            this.nongoodsservice_exit_clause_dyn.at(q).patchValue(data2);
            q++;
          }
         
             this.status = true;
         }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in Non Goods Service,please try again....");
         this.ngOnInit()}); 
    }
    ResetAllValues()
    {
    return this.userForm=this.fb.group({
      id:[''],
      nongoodsserviceid:[''],
      service_type:[''],
      serviceno:[''],
      ordertype:[''],
      b_unit:[''],
      billing_from:[''],
      billing_to:[''],
      party:[''],
      billdate:[''],
      remarks:[''],
      pan_no:[''],
      gst_no:[''],
      cin_no:[''],
      tan_no:[''],
      company_id:[''],
      fin_year:[''],
      username:[''],
      confirmed_by:[''],
      approved:[''],
      reason:[''],
      app_chgs_id:[''],

      nongoodsservice_item_details:this.fb.array([this.fb.group({
        slno:this.item_sl_no,
        service_types:'',
        services : '',
        account_code:'',
        amount:'',
        taxable_amount:'',
        discount : '',
        discount_basedon:'',
        discount_amount: '',
        net_amount : '',
        tax_code:'',
        tax_rate: '',
        tax_amount : '',
        total_amount:'',

          nonservice_desc_details:this.fb.array([this.fb.group({
            slno:'',
            desc_name:'',
            bill_period:'',
            bill_on:'',
            amount_change:'',
            desc_qty:'',
            desc_uom:'',
            desc_price:'',
            desc_total:'',
            billing_from:'',
            billing_to:'',
            duedate:'',
            remarks:'',
            serviceno:''
          })])    
      })]),
   
      nongoodsservice_terms_con:this.fb.group({
        paymenttype: '',
        payment_mode: '',
        cash_limit :'',
        tcs_applicable:'',
        tcs_rate: '',
        payment_terms: '',
        bank_name: '', 
        account_name: '', 
        account_no: '',
        branch: '', 
        ifsc: '',
        mobile: '',
        iban: '', 
        bic_swift_code: '' }),

      nongoodsservice_party_dtls:this.fb.array([this.fb.group({
        sl_no : this.party_sl_no, 
        party_name:'',
        cp_name:'',
        cp_contact:'',
        send_via:'',
        tcs_applicable:'',
        tcs_rate:'' })]),

      nongoodsservice_bank_dtls:this.fb.group({	
        pay_mode:'',
        pay_term:'',
        bank_name:'',
        account_no:'',
        ifsc_code:'',
        cash_limit:'',
        account_name:  '',  
        branch:  '',   
        iban:  '',   
        bic_swift_code:''}),
      
      nongoodsservice_summary:this.fb.group({
        item_total:'',
        discount:'',
        tax_total:'',
        net_amount:'',
        app_brokerage:'',
        net_r_value:''
      }),
      nongoodsservice_summary_dyn: this.fb.array([this.fb.group({
        charge_name:'',
        add_less:'',
        rate_cal_method:'',
        app_rate:'',
        tax_rate:''
      })]),

    nongoodsservice_time_service:this.fb.array([this.fb.group({
      slno:this.time_sl_no,
      //term_check : '',
      description : ''})]),

      nongoodsservice_docs: this.fb.array([this.fb.group({
        doc_name: '' })]),

      nongoodsservice_exit_clause:this.fb.group({
        term_nongoods_service: '',
        order_by: '',
        charges_descpt:'',
        reason: '',
        remarks: '',
        tot_term_chg: '',
        term_add: '',
        term_deduct: '',
        net_term_chg: '' }),
      
      nongoodsservice_exit_clause_dyn:this.fb.array([this.fb.group({
        charge_name:'',
        termination_cal:'',
        method: '',
        cal_qty:'',
        qty:'',
        amount:'', 
        rate: '',
        gl_account: '',
        tax_rate: '',
        tax_amount: '',
        total_amount:'' })])
    });
  }

  add()
  {
    this.item_sl_no =this.item_sl_no +1;
    this.nongoodsservice_item_details.push(this.fb.group({
        slno:this.item_sl_no,
        service_types:'',
        services : '',
        account_code:'',
        details:'',
        service_uom:'',
        service_quantity:'',
        price : '',
        amount:'',
        taxable_amount: '',
        discount : '',
        discount_basedon:'',
        discount_amount: '',
        net_amount : '',
        tax_code:'',
        tax_rate: '',
        tax_amount : '',
        total_amount:'',

        nonservice_desc_details:this.fb.array([this.fb.group({
          slno:'',
          desc_name:'',
          bill_period:'',
          bill_on:'',
          amount_change:'',
          desc_qty:'',
          desc_uom:'',
          desc_price:'',
          desc_total:'',
          billing_from:'',
          billing_to:'',
          duedate:'',
          remarks:'',
          serviceno:''
        })])

     }));
  }

  addTime()
  {
    this.time_sl_no =this.time_sl_no +1;
    this.nongoodsservice_time_service.push(this.fb.group({
      slno:this.time_sl_no,
      //term_check : '',
      description : ''
    }));
  }
  addParty()
    {
      this.party_sl_no =this.party_sl_no +1;
      this.nongoodsservice_party_dtls.push(this.fb.group({
        sl_no : this.party_sl_no, 
        party_name:'',
        cp_name:'',
        cp_contact:'',
        send_via:'',
        tcs_applicable:'',
        tcs_rate:''}));
    }
  addExitclause()
    {
      this.nongoodsservice_exit_clause_dyn.push(this.fb.group({
        charge_name:'',
        termination_cal:'',
        cal_qty:'',
        amount:'', 
        method: '',
        tax_rate: '',
        qty:'',
        rate: '',
        gl_account: '',
        tax_amount: '',
        total_amount:''}));
    }

    addSummaryDyn()
    {
      this.nongoodsservice_summary_dyn.push(this.fb.group({
        charge_name:'',
        add_less:'',
        rate_cal_method:'',
        app_rate:'',
        tax_rate:''
      }))
    }

    addDoc()
    {
      this.nongoodsservice_docs.push(this.fb.group({
        doc_name:''
      }))
    }

  timedelete(index) 
    {
      if(index)
      {
        this.nongoodsservice_time_service.removeAt(index);}
      else
      {
        if(this.nongoodsservice_time_service.length>1)
        {
          this.nongoodsservice_time_service.removeAt(index);
        }
        else
        {
          alert("can't delete all rows");
        }
      }
      for(let i=1; i<=this.nongoodsservice_time_service.length; i++)
      {
        this.nongoodsservice_time_service.at(i-1).patchValue({slno: i});
        this.time_sl_no=i;
      } 
    }

  itemdelete(index) 
    {
      if(index)
      {
        this.nongoodsservice_item_details.removeAt(index);}
      else
      {
        if(this.nongoodsservice_item_details.length>1)
        {
          this.nongoodsservice_item_details.removeAt(index);
        }
        else
        {
          alert("can't delete all rows");
        }
        
      } 
      for(let i=1; i<=this.nongoodsservice_item_details.length; i++)
      {
        this.nongoodsservice_item_details.at(i-1).patchValue({slno: i});
        this.item_sl_no=i;
      } 
    }

    onChangeDescription(index,event)
    {
      this.DropDownListService.getDescCode(event).subscribe(serCode=>
        {
         // console.log("serCode:"+JSON.stringify(serCode)+"//"+serCode["service_acc_code"]+"//"+serCode.service_acc_code)
         this.nongoodsservice_item_details.at(index).patchValue({account_code:serCode["service_acc_code"]});
        }); 
    }
    
    is_tporder_checked = false;
    onChangeTermination(event, calFrom)
    {
      
      let tporder;
      if(calFrom == 'CFT')
      tporder = event.checked;
      else
      tporder = event;

      if(tporder == true)
      {
        this.is_tporder_checked = true;
      }
      else
      {
        this.is_tporder_checked = false;
        this.nongoodsservice_exit_clause.patchValue({order_by: "0", charges_descpt: "0", reason: "0",
          remarks: "", tot_term_chg: 0, term_add: 0, term_deduct: 0, net_term_chg: 0});

        while(this.nongoodsservice_exit_clause_dyn.length)
        this.nongoodsservice_exit_clause_dyn.removeAt(0);
        this.addExitclause();
      }
    }

    onChangeReason(applicable_charges_id)
    {
      if(applicable_charges_id != '0')
      { 
        this.status = false;
         this.DropDownListService.getChargeMasterDtlsList(applicable_charges_id).subscribe(data=>
        {
          let i =0;
          while(this.nongoodsservice_exit_clause_dyn.length)
          {this.nongoodsservice_exit_clause_dyn.removeAt(0);}
          
          for(let data1 of data)
          {
            this.addExitclause();
            this.nongoodsservice_exit_clause_dyn.at(i).patchValue({
            charge_name: data1.charge_name, tax_rate: data1.tax_rate,
              method: data1.method, termination_cal: data1.rate_cal});
            i=i+1;
          }
          this.status = true;
        });
      }
    }

    onChangeApplicableCharges(applicable_charges_id:string)
    {
      if(applicable_charges_id != '0')
      {
        this.status = false
        this.DropDownListService.getChargeMasterDtlsList(applicable_charges_id).subscribe(data=>
        {
          console.log("charge:"+JSON.stringify(data))
          let i =0;
          while(this.nongoodsservice_summary_dyn.length)
          { this.nongoodsservice_summary_dyn.removeAt(0);}
          for(let data1 of data)
          {
            this.addSummaryDyn();
            this.nongoodsservice_summary_dyn.at(i).patchValue({
              charge_name: data1.charge_name, add_less: data1.method, rate_cal_method: data1.rate_cal,
              tax_rate: data1.tax_rate});
            i=i+1;
          }
          this.status = true;
        });
      }
      else
      {
        while(this.nongoodsservice_summary_dyn.length)
        this.nongoodsservice_summary_dyn.removeAt(0);
        this.addSummaryDyn();
      }
    }

    
  /*
    search()
        {
          let fromdate=this.userForm1.get("fromdate").value;
          let todate=this.userForm1.get("todate").value;
         
          let finyear =localStorage.getItem("financial_year");
          
          this.status=false;
          this.DropDownListService.searchWheatreceiving("fromdate="+fromdate+"&todate="+todate+"&finyear="+finyear).subscribe(data=>
            {
          
              this.wheatreceivinglist =data;
              this.status=true;
      
            }, (error) => {this.status=true;
              alert("Wheat Receiving Report Data Not Found !!!")
              this.wheatreceivinglist=[];
            })
        }
       
            selectedItemName = [];
            selectedItemName1=[];
            selectedItemName3=[];
            getitemname(businessunit_id)
            {
                if(businessunit_id.length)
                {
                    this.DropDownListService.getweatreceivingitemlist(businessunit_id).subscribe(data=>
                    {
                      this.itemList=data;
                    });        
                }
            }

            print(wheatreceiveid)
            {
              const dialogConfig = new MatDialogConfig(); 
              dialogConfig.disableClose = true;
              dialogConfig.autoFocus = true;
              dialogConfig.data = {  };
              
              let dialogRef = this.dialog.open(WheatreceivingreportprintpopupComponent, {data: {alldata: wheatreceiveid}, height: '80%',
              width: '80%'});
              dialogRef.afterClosed().subscribe( data => 
              {
              
              }); 
          
            }*/

        send()
        {
          this.Id= this.userForm.get("id").value as FormControl; 
          this.userForm.patchValue({ company_id: localStorage.getItem("company_name"),
          fin_year:localStorage.getItem("financial_year"), 
          username: localStorage.getItem("username")});
          this.status=false;
          //.log(JSON.stringify(this.userForm.getRawValue()))

         if(this.Id> 0)
          {
            this.Service.updateNongoodservice(this.userForm.getRawValue(),this.Id)
            .subscribe(data =>
            {
              alert("Non Goods Service Updated successfully.");
              this.userForm.reset();
              this.isHidden = false;
              this.showList('list');
              this.ngOnInit();
              this.status=true;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Non Goods Service !!! please Reload the page and try again....");
              });
          }
          else{
            this.Service.createnongoodservice(this.userForm.getRawValue())
            .subscribe(data =>
            {
              alert("Non Goods Service Created successfully.");
              this.userForm.reset();
              this.isHidden = false;
              this.showList('list');
              this.ngOnInit();
              this.status=true;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Wheat Receiveing Report !!! please Reload the page and try again....");
            });
          }
     
          
        }

      onDelete(id)
      {
        if(confirm("Are you sure to delete this Non Goods Service List?"))
        { 
            this.userForm.patchValue({username: localStorage.getItem("username")});
            this.Service.deleteNonGoodsService(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                alert("Non Goods Service Report Deleted successfully.");
                this.userForm.reset();
                this.status = true;
                this.ngOnInit();
              });
    
        }
      }
}
