import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Broker } from '../../../../../../Models/BrokerModel/Broker';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { map, startWith } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';

  @Component({
    selector: 'app-brokers-master',
    templateUrl: './brokers-master.component.html',
    styleUrls: ['./brokers-master.component.scss']
  })

  export class BrokersMasterComponent implements OnInit 
  {
    submitted = false;
    public userForm: FormGroup;
    model: Broker = new Broker();
    listBroker:any=[];
    countriesList: any = [];
    statesList: any = [];
    isTypeChecked = false;
    districtsList: any = [];
    citiesList: any = [];
    basislist: {};
    arealist: {};
    Constitution="0";
    Ssi_App="0";
    subGroupNames: {};
    brokerGroupNames: {};
    customerCodes: {};
    supplierCodes: {};
    supplierNames: {};
    isHidden:any;
    designationlists: {};
    payTerms: {};
    types: {};
    transCurrencis: {};
    transporterCodes:{};
    ledgerbankacc:{};
    bid:any;
    Brokerage_Acc="0";
    Tds_Acc="0";
    VendorBrokerage_Acc="0";
    VendorTds_Acc="0";
    TransBrokerage_Acc="0";
    TransTds_Acc="0";
    party_sl_no =1;
    vendor_sl_no=1;
    transporter_sl_no=1;
    partner_sl_no=1;
    brokerNames:{};
    vdr_code_names:any = [];
    status:any;
    seq_no: any;
    company_name:any;
    isAcctype=false;
    isRegister=false;
    unita: any;
    trans_currency1="INR";
    activeIsChecked:any;
    isValid=false;
    group_type1="0";
    broker_type1:any;
    Country="India";
    brokermastersave:boolean=true;
    brokermasterupdate:boolean=true;
    brokermasterdelete:boolean=true;
    brokermasterview:boolean=true;
    brokermasterposting:boolean=true;
    action:any;
    basedOnList:any = [];
    name1:any;
    myFiles:any = [];
    lockbrokername:boolean=false;
    user_name:any;
    usernamelock:boolean=false;
    user_roles:any;
    
    @ViewChild('iCodeInput') _BrokerCode: ElementRef;

    bdistrict : any;

    constructor(public fb: FormBuilder, private Service: Master,
     private DropDownListService: DropdownServiceService) 
    {
      this.userForm = fb.group({    
        broker_code: [''],
        id:[''],
        broker_type: [''],
        name: [''],
        alt_name: [''],
        bp_active: [''],
        group_type: [''],
        sub_group_type: [''],
        trans_curr: [''],
        broker_block: [''],
        broker_active:[''],
        broker_Id:[''],
        company_id: [''],
        fin_year: [''],
        username: [''],
        constitution: [''],
        ssi_app: [''],
        ssi_regno:[''] ,
        doc_list:[''],
     
        broker_master_add: this.fb.group({
          website: '',
          country: '',
          state_code: '',
          dist_code: '',
          postid:'',
          city_code: '',
          pin: '',
          address1: '',
          address2: '',
          address3: ''}),

        broker_master_add_dtls: this.fb.array([this.fb.group({
          contact_person: '',
          designation: '',
          tell_no: '',
          mob_no: '',
          fax_no: '',
          email: ''})]),

        broker_master_oth: this.fb.array([this.fb.group({
          srl_no : this.partner_sl_no,
          oth_code_name: '',
          oth_name: '',
          basis: '',
          rate: '',
          eff_date: '',
          remarks: ''})]),

        broker_master_pty: this.fb.array([this.fb.group({
          srl_no : this.party_sl_no,
          pty_code_name: '',
          basis: '',
          based_on:'',
          rate: '',
          eff_date: '',
          remarks: '',
          brokerage_acc:'',
          tds_rate:'',
          tds_acc:''})]),

        broker_master_vdr: this.fb.array([this.fb.group({
          srl_no : this.vendor_sl_no,
          vdr_code_name : '',
          basis :'',
          based_on:'',
          rate :'',
          eff_date :'',
          remarks : '',
          brokerage_acc:'',
          tds_rate:'',
          tds_acc:''})]),

        broker_master_transporter: this.fb.array([this.fb.group({
          srl_no : this.transporter_sl_no,
          trans_code_name : '',
          trans_name : '',
          basis :'',
          based_on:'',
          rate :'',
          eff_date :'',
          remarks : '',
          brokerage_acc:'',
          tds_rate:'',
          tds_acc:''})]),

        broker_master_doc: this.fb.array([this.fb.group({
          doc_name :''})]),

        broker_master_statutory: this.fb.group({
          registered: '',
          pan_no: '',
          gst_no: '',
          cin_no: '',
          tan_no: ''}),

        broker_master_account: this.fb.group({ 
          pay_cont_acc:'',      
          pref_bank_acc:'',
          pay_term:'',
          credit_lim:'',
          cash_lim:'',
          cash_lim_active:'',
          pay_mode:'',
          acc_holder_name:'',
          acc_no:'',
          bank_name:'',
          ifsc_code:'',
          mobile:'',
          acc_type: '',
          acc_remarks: ''
        
        })})
    }

    get id(){return this.userForm.get("id") as FormControl}
    get broker_code() { return this.userForm.get("broker_code") as FormControl }
    get doc_list() { return this.userForm.get("doc_list") as FormControl } 
    get broker_Id(){return this.userForm.get("broker_Id") as FormControl}
    get broker_type() { return this.userForm.get("broker_type") as FormControl }
    get name() { return this.userForm.get("name") as FormControl }
    get alt_name() { return this.userForm.get("alt_name") as FormControl }
    get broker_active() { return this.userForm.get("broker_active") as FormControl }
    get group_type() { return this.userForm.get("group_type") as FormControl }
    get trans_curr() { return this.userForm.get("trans_curr") as FormControl }
    get broker_block() { return this.userForm.get("broker_block") as FormControl }
    get sub_group_type() { return this.userForm.get("sub_group_type") as FormControl }
    get broker_master_add() { return this.userForm.get('broker_master_add') as FormGroup; }
    get broker_master_add_dtls() { return this.userForm.get('broker_master_add_dtls') as FormArray; }
    get broker_master_pty() { return this.userForm.get('broker_master_pty') as FormArray; }
    get broker_master_vdr() { return this.userForm.get('broker_master_vdr') as FormArray; }
    get broker_master_oth() { return this.userForm.get('broker_master_oth') as FormArray; }
    get broker_master_transporter() { return this.userForm.get('broker_master_transporter') as FormArray; }
    get broker_master_doc() { return this.userForm.get('broker_master_doc') as FormArray; }
    get broker_master_statutory() { return this.userForm.get('broker_master_statutory') as FormGroup; }
    get broker_master_account() { return this.userForm.get('broker_master_account') as FormGroup; }

    get constitution(){return this.userForm.get("constitution") as FormControl}
    get ssi_app(){return this.userForm.get("ssi_app") as FormControl}
    get ssi_regno(){return this.userForm.get("ssi_regno") as FormControl}


    ngOnInit() 
    {
      this.action = 'save';
      //For User Role
      let user_role=localStorage.getItem("user_role")+"tuhinabcd"+"broker_master";
      
      this.activeIsChecked = true;
      this.isHidden = false;
      
      this.company_name = localStorage.getItem("company_name");
      this.user_name = localStorage.getItem("username");
      this.user_roles=localStorage.getItem("user_role");
      /*  if(this.user_role == 'RL00001')
        {
          this.usernamelock=true;
        }
        else
        {
          this.usernamelock=false;
        }*/
        this.usernamelock=true;// all users update 

      forkJoin(
        this.Service.getBrokersFastApi(this.company_name),
        //this.DropDownListService.getRoleItemMaster(user_role)
          ).subscribe(([bData])=>
        {
          this.listBroker = bData;
          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});

        let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
          this.brokermastersave=false;
          this.brokermasterupdate=false;
          this.brokermasterdelete=false;
          this.brokermasterview=false;
          this.brokermasterposting=false;
          this.lockbrokername=false;

          if(accessdata.includes('broker_master.save'))
          {
           this.brokermastersave = true;
          }
          if(accessdata.includes('broker_master.update'))
          {
           this.brokermasterupdate = true;
          }
          if(accessdata.includes('broker_master.delete'))
          {
           this.brokermasterdelete = true;
          }
          if(accessdata.includes('broker_master.view'))
          {
           this.brokermasterview = true;
          }
          if(accessdata.includes('broker_master.posting'))
          {
           this.brokermasterposting = true;
          }
    }
    showList(s:string)
    {
      if(this.brokermastersave == true  && this.brokermasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        { 
            this.isHidden=true;
            this.isTypeChecked = true;
            this.broker_type1="0";
            this.name1="NA";
            this.group_type1="0";
            this.transCurrencis = ["INR"];
            this.Constitution = "0";
            this.Ssi_App="0";
            this.isRegister = false;
            this.activeIsChecked = true;
            this.Country="INDIA";
            this.broker_master_account.patchValue({pref_bank_acc:"0"});
            this.broker_master_account.patchValue({pay_term:"0"});
            this.broker_master_pty.at(0).patchValue({pty_code_name:"0",brokerage_acc:"0"});
            this.broker_master_vdr.at(0).patchValue({brokerage_acc:"0",tds_acc:"0"});
            this.broker_master_transporter.at(0).patchValue({brokerage_acc:"0",tds_acc:"0"});
            this.broker_master_pty.at(0).patchValue({srl_no:this.party_sl_no});
            this.basislist = ["%", "UOM"];
            
            this.userForm.patchValue({id: 0});
            this.party_sl_no=1;
            this.broker_master_add.patchValue({country:"INDIA"});
            this.vendor_sl_no=1;
            this.transporter_sl_no=1;
            this.partner_sl_no=1;
            //this.arealist = ["KOLKATA", "DUMDUM", "SOUTH", "NORTH", "EAST", "WEST", "WEST BENGAL"];
            

            forkJoin(
              this.DropDownListService.brokerGroupList(),
              // this.DropDownListService.countryList(),
              // this.DropDownListService.stateListByCountry(this.Country),
               //this.DropDownListService.designationList(),
              // this.DropDownListService.ledgerList()
              
             ).subscribe(([ bGroupData])=>
               {
                
                 this.brokerGroupNames = bGroupData;
                // this.countriesList = countryData;
                 //this.statesList = stateData;
                 //this.designationlists = destinationData;
                 //this.ledgerbankacc = ledgerData;
                 
                 this.status = true;
               }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
               this.ngOnInit()});

               this.countriesList = JSON.parse(localStorage.getItem("countryname"));
               this.statesList = JSON.parse(localStorage.getItem("statename"));
               this.designationlists = JSON.parse(localStorage.getItem("designationname"));
               this.ledgerbankacc = JSON.parse(localStorage.getItem("ledgername"));
          } 
      }
      if(this.brokermastersave == true  && this.brokermasterupdate == false)
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.isTypeChecked = true;
          this.broker_type1="0";
          this.name1="NA";
          this.group_type1="0";
          this.transCurrencis = ["INR"];
          this.Constitution = "0";
          this.Ssi_App="0";
          this.isRegister = false;
          this.activeIsChecked = true;
          this.Country="INDIA";
          this.broker_master_account.patchValue({pref_bank_acc:"0"});
          this.broker_master_account.patchValue({pay_term:"0"});
          this.broker_master_pty.at(0).patchValue({pty_code_name:"0",brokerage_acc:"0"});
          this.broker_master_vdr.at(0).patchValue({brokerage_acc:"0",tds_acc:"0"});
          this.broker_master_transporter.at(0).patchValue({brokerage_acc:"0",tds_acc:"0"});
          this.broker_master_pty.at(0).patchValue({srl_no:this.party_sl_no});
          this.basislist = ["%", "UOM"];
          
          this.userForm.patchValue({id: 0});
          this.party_sl_no=1;
          this.broker_master_add.patchValue({country:"INDIA"});
          this.vendor_sl_no=1;
          this.transporter_sl_no=1;
          this.partner_sl_no=1;
          //this.arealist = ["KOLKATA", "DUMDUM", "SOUTH", "NORTH", "EAST", "WEST", "WEST BENGAL"];
          

          forkJoin(
            this.DropDownListService.brokerGroupList(),
            // this.DropDownListService.countryList(),
            // this.DropDownListService.stateListByCountry(this.Country),
             //this.DropDownListService.designationList(),
            // this.DropDownListService.ledgerList()
            
           ).subscribe(([ bGroupData])=>
             {
              
               this.brokerGroupNames = bGroupData;
              // this.countriesList = countryData;
               //this.statesList = stateData;
               //this.designationlists = destinationData;
               //this.ledgerbankacc = ledgerData;
               
               this.status = true;
             }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
             this.ngOnInit()});

             this.countriesList = JSON.parse(localStorage.getItem("countryname"));
             this.statesList = JSON.parse(localStorage.getItem("statename"));
             this.designationlists = JSON.parse(localStorage.getItem("designationname"));
             this.ledgerbankacc = JSON.parse(localStorage.getItem("ledgername"));    
        }  
      }
     
      if(s=="list")
      {
        this.brokermastersave= true;
        this.isHidden=false;
        this.lockbrokername=false;
      /*  this.userForm.reset();
        this.broker_master_add.patchValue({country:"INDIA"});
        this.Brokerage_Acc="0";
        this.Tds_Acc="0";
        this.VendorBrokerage_Acc="0";
        this.VendorTds_Acc="0";
        this.TransBrokerage_Acc="0";
        this.TransTds_Acc="0";
        this.trans_currency1="INR";
        this.group_type1="0"; 
        this.Ssi_App="0";
        this.Constitution="0";
        this.Country="INDIA";
        this.broker_master_pty.at(0).patchValue({srl_no: this.party_sl_no});
        this.broker_master_vdr.at(0).patchValue({srl_no: this.vendor_sl_no});
        this.broker_master_oth.at(0).patchValue({srl_no: this.party_sl_no});
        this.broker_master_add.patchValue({country:"INDIA"});
        this.broker_master_transporter.at(0).patchValue({srl_no: this.transporter_sl_no});*/
        /*this.userForm.reset();
        this. broker_master_add.reset();
        this.broker_master_add_dtls
        this.broker_master_oth
        this.broker_master_pty
        this.broker_master_vdr
        this.broker_master_transporter
        this.broker_master_doc
        this.broker_master_statutory.reset();
        this.broker_master_account.reset();*/
        this.userForm.reset();
        this.ResetAllValues();
      }
    }
   
    ResetAllValues()
    {
     return this.userForm=this.fb.group({
      broker_code: [''],
      id:[''],
      broker_type: [''],
      name: [''],
      alt_name: [''],
      bp_active: [''],
      group_type: [''],
      sub_group_type: [''],
      trans_curr: [''],
      broker_block: [''],
      broker_active:[''],
      broker_Id:[''],
      company_id: [''],
      fin_year: [''],
      username: [''],
      constitution: [''],
      ssi_app: [''],
      ssi_regno:[''] ,
      doc_list:[''],

      broker_master_add: this.fb.group({
        website: '',
        country: '',
        state_code: '',
        dist_code: '',
        city_code: '',
        postid:'',
        pin: '',
        address1: '',
        address2: '',
        address3: ''}),

      broker_master_add_dtls: this.fb.array([this.fb.group({
        contact_person: '',
        designation: '',
        tell_no: '',
        mob_no: '',
        fax_no: '',
        email: ''})]),

      broker_master_oth: this.fb.array([this.fb.group({
        srl_no : this.partner_sl_no,
        oth_code_name: '',
        oth_name: '',
        basis: '',
        rate: '',
        eff_date: '',
        remarks: ''})]),

      broker_master_pty: this.fb.array([this.fb.group({
        srl_no : this.party_sl_no,
        pty_code_name: '',
        basis: '',
        based_on:'',
        rate: '',
        eff_date: '',
        remarks: '',
        brokerage_acc:'',
        tds_rate:'',
        tds_acc:''})]),

      broker_master_vdr: this.fb.array([this.fb.group({
        srl_no : this.vendor_sl_no,
        vdr_code_name : '',
        basis :'',
        based_on:'',
        rate :'',
        eff_date :'',
        remarks : '',
        brokerage_acc:'',
        tds_rate:'',
        tds_acc:''})]),

      broker_master_transporter: this.fb.array([this.fb.group({
        srl_no : this.transporter_sl_no,
        trans_code_name : '',
        trans_name : '',
        basis :'',
        based_on:'',
        rate :'',
        eff_date :'',
        remarks : '',
        brokerage_acc:'',
        tds_rate:'',
        tds_acc:''})]),

      broker_master_doc: this.fb.array([this.fb.group({
        doc_name :''})]),

      broker_master_statutory: this.fb.group({
        registered: '',
        pan_no: '',
        gst_no: '',
        cin_no: '',
        tan_no: ''}),

      broker_master_account: this.fb.group({ 
        pay_cont_acc:'',      
        pref_bank_acc:'',
        pay_term:'',
        credit_lim:'',
        cash_lim:'',
        cash_lim_active:'',
        pay_mode:'',
        acc_holder_name:'',
        acc_type: '',
        acc_remarks: '',
        acc_no:'',
        bank_name:'',
        ifsc_code:'',
        mobile:''
      })})    
    }

    selectcredit(event:String){
    
      this.DropDownListService.getBrokerSequenceId("prefix="+"BKR"+"&company="+this.company_name+"&wtype="+event).subscribe(data=>{this.seq_no = data.sequenceid;}
        , (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");});
    }
  
    con_acc:any;
    groupstat1:any;
    onFocusoutCheckUnique(event: any)
    { 
          this.DropDownListService.chkBrokNameStat(event.target.value).subscribe(data=>
            {
               this.groupstat1 = data.group_name;
              // this.status=true;
              //window.alert( data.group_name);
              if(this.groupstat1=='EXIST')
              {
                //window.alert(event.target.value +" "+ " already exist please change !" );
                //this.brokermastersave=false;
                //this.userForm.patchValue({name:""});
                this.status=true;
              }
              else
              {
                //this.brokermastersave=true;
                this.status=true;
              }
              
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Please Enter Valid Broker Name....");});
            this.groupstat1=''; 
            this.status=true;        
        }
       


    selectssiapp(s:string)
    {
      if(s=='Yes')
      {
        this.isRegister=true;
      }
      else
      {
        this.isRegister=false;
        this.userForm.patchValue({ssi_regno:''});
      }
      
    }

    onChangeAcctype(s:string)
    {
      if(s=='OTHERS')
      {
        this.isAcctype=true;
      }
      else
      {
        this.isAcctype=false;
      }
    }

    search(event, eventType)
    {
      let serchText = event.target.value;
      serchText=this.Service.replaceAllSpl(serchText,"&","ampersand");
      serchText=this.Service.replaceAllSpl(serchText,"/","backslash");
      
      if(event.key == "Enter")
      {
        this.status = false;
        if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
        {
          this.DropDownListService.findBrokers('0').subscribe(data=>
          {
            this.listBroker = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findBrokers(serchText).subscribe(data=>
          {
            this.listBroker = data;
            this.status = true;
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");});    
        }
      }
    }

    isCashLimitIsHidden = true;
    onChangePaymentMode(payment_mode:string) 
    {
      if (payment_mode == "CASH") 
      {this.isCashLimitIsHidden = false;}
      else
      {
        this.isCashLimitIsHidden = true;
        this.broker_master_account.patchValue({cash_lim_active: false, cash_lim: 0})
      } 
    }

    

    accountingData()
    {
        this.DropDownListService.payTermNameList().subscribe((payTermData)=>
         {
          this.payTerms = payTermData;  
           this.status = true;
         }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
         this.ngOnInit()});  
    }

    partyData()
    {
        this.DropDownListService.customerCodeList().subscribe(( customerCodeData)=>
         {
          this.customerCodes = customerCodeData;
           this.status = true;
         }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
         this.ngOnInit()}); 
    }

    vendorData()
    {
      //this.DropDownListService.supplierCodeList().subscribe(( supplierCodeData)=>
      let company=localStorage.getItem("company_name");
      this.DropDownListService.supplierorcustomerCodeList(company).subscribe(( supplierCodeData)=>
         {
          
          this.vdr_code_names = supplierCodeData;
           this.status = true;
         }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
         this.ngOnInit()}); 
    }

    transporterData()
    {
      this.DropDownListService.transporterCodeList().subscribe(( transList)=>
         {
          this.brokerNames = transList;
           this.status = true;
         }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
         this.ngOnInit()}); 
    }

    isRegisteredChecked = false;
    onChangeRegisteredStatus(event) 
    {
      if(event.checked == true)
      this.isRegisteredChecked = true;
      else
      this.isRegisteredChecked = false;
    }

    addParty() 
    {
      //this.broker_master_transporter.at(0).patchValue({brokerage_acc:"0",tds_acc:"0"});
      this.party_sl_no=this.party_sl_no+1;
      this.broker_master_pty.push(this.fb.group({
        srl_no : this.party_sl_no, 
        pty_code_name: '',
        basis: '',
        based_on:'',
        rate: '',
        eff_date: '',
        remarks: '',
        brokerage_acc:'',
        tds_rate:'',
        tds_acc:''}));
    }

    deleteParty(index) 
    {
      if(this.party_sl_no > 1)
      { 
        this.broker_master_pty.removeAt(index);
        this.party_sl_no = this.party_sl_no - 1;
      }
      else
      {
        this.party_sl_no = 1;
        alert("can't delete all rows");
        this.broker_master_pty.reset();
        this.broker_master_pty.at(0).patchValue({srl_no:  this.party_sl_no});
      } 
      
      for(let i=1; i<=this.party_sl_no; i++)
        this.broker_master_pty.at(i-1).patchValue({srl_no: i});  
    }

    addDocument() 
    {
      this.broker_master_doc.push(this.fb.group({
        doc_name: ''}));
    }

    // deleteDocument(index) 
    // {
    //   if (index) 
    //   {this.broker_master_doc.removeAt(index);}
    //   else 
    //   {alert("can't delete all rows");}
    // }

    addVendor() 
    {
      this.vendor_sl_no=this.vendor_sl_no+1;
      this.broker_master_vdr.push(this.fb.group({
        srl_no : this.vendor_sl_no, 
        vdr_code_name : '',
        basis :'',
        based_on:'',
        rate :'',
        eff_date :'',
        remarks : '',
        brokerage_acc:'',
        tds_rate:'',
        tds_acc:''}));
    }

    deleteVendor(index) 
    {
      this.Id= this.userForm.get("id").value as FormControl;
      if(this.Id>0)
      {

      }
      else
      {
        if(this.vendor_sl_no > 1)
        { 
          this.broker_master_vdr.removeAt(index);
          this.vendor_sl_no = this.vendor_sl_no - 1;
        }
        else
        {
          this.vendor_sl_no = 1;
          alert("can't delete all rows");
          //this.broker_master_vdr.reset();
         // this.broker_master_vdr.at(0).patchValue({srl_no:  this.vendor_sl_no});
        } 
        
        for(let i=1; i<=this.vendor_sl_no; i++)
          this.broker_master_vdr.at(i-1).patchValue({srl_no: i});  
      }
     
    }
    deleteVendor2(index) 
    {
      
        if(this.vendor_sl_no > 1)
        { 
          this.broker_master_vdr.removeAt(index);
          this.vendor_sl_no = this.vendor_sl_no - 1;
        }
        else
        {
          this.vendor_sl_no = 1;
          alert("can't delete all rows");
          //this.broker_master_vdr.reset();
         // this.broker_master_vdr.at(0).patchValue({srl_no:  this.vendor_sl_no});
        } 
        
        for(let i=1; i<=this.vendor_sl_no; i++)
          this.broker_master_vdr.at(i-1).patchValue({srl_no: i});  
      
     
    }

    addPartner() 
    {
      this.partner_sl_no  = this.partner_sl_no  + 1;
      this.broker_master_oth.push(this.fb.group({
        srl_no : this.partner_sl_no,  
        oth_code_name: '',
        oth_name: '',
        basis: '',
        rate: '',
        eff_date: '',
        remarks: ''}));
    }

    deletePartner(index) 
    {
      if(this.partner_sl_no > 1)
      { 
        this.broker_master_oth.removeAt(index);
        this.partner_sl_no = this.partner_sl_no - 1;
      }
      else
      {
        this.partner_sl_no = 1;
        alert("can't delete all rows");
        this.broker_master_oth.reset();
        this.broker_master_oth.at(0).patchValue({srl_no:  this.partner_sl_no});
      } 
      
      for(let i=1; i<=this.partner_sl_no; i++)
        this.broker_master_oth.at(i-1).patchValue({srl_no: i});
    }

    addTransporter() 
    {
      this.transporter_sl_no=this.transporter_sl_no+1;
      this.broker_master_transporter.push(this.fb.group({
        srl_no : this.transporter_sl_no, 
        trans_code_name : '',
        trans_name : '',
        basis :'',
        based_on:'',
        rate :'',
        eff_date :'',
        remarks : '',
        brokerage_acc:'',
        tds_rate:'',
        tds_acc:''}));
    }

    deleteTransporter(index) 
    {
      if(this.transporter_sl_no > 1)
      { 
        this.broker_master_transporter.removeAt(index);
        this.transporter_sl_no = this.transporter_sl_no - 1;
      }
      else
      {
        this.transporter_sl_no = 1;
        alert("can't delete all rows");
        this.broker_master_transporter.reset();
        this.broker_master_transporter.at(0).patchValue({srl_no:  this.transporter_sl_no});
      } 
      
      for(let i=1; i<=this.transporter_sl_no; i++)
        this.broker_master_transporter.at(i-1).patchValue({srl_no: i}); 
    }

    addContact() 
    {
      this.broker_master_add_dtls.push(this.fb.group({
        contact_person: '',
        designation: '',
        tell_no: '',
        mob_no: '',
        fax_no: '',
        email: ''}));
    }

    deleteContact(index) 
    {
      if (index) 
      {this.broker_master_add_dtls.removeAt(index);}
      else 
      {alert("can't delete all rows");}
    }

    OnChangeGroup(group_type: String)
    {
      this.userForm.patchValue({sub_group_type: null});
      if(group_type != '0')
      {
        //alert("group_type/"+group_type+"company/"+this.company_name);
        this.status = false;
        this.DropDownListService.nameListByBrokerCode(group_type,this.company_name).subscribe(data=>
        {
          this.userForm.patchValue({sub_group_type:data["group_name"]});
          this.broker_master_account.patchValue({pay_cont_acc: data["group_name"]})
          this.status = true;
        });
      }
    }

    PostOfficeList:any=[];
    onchangeCountry(country_name: String) 
    {
      this.statesList = [], this.districtsList = [], this.citiesList = []; //this.PostOfficeList =[];
      //this.broker_master_add.patchValue({state_code: null, dist_code: null, city_code: null});
      if (country_name.length) 
      {
        this.status = false;
        this.DropDownListService.stateListByCountry(country_name).subscribe(data =>
        { 
          this.statesList = data;
          this.status = true;
        }); 
      }
    }

    selectedCity:any=[];
    selectedDist:any=[];
    selectedPostOffice:any=[];
    onchangeState(state_name) 
    {
     // let id_check= this.userForm.get("id").value as FormControl;
      //alert(this.id);
     // this.districtsList = [], this.citiesList = [];
      this.selectedDist = [];
      this.selectedCity = [];
 //this.selectedPostOffice = [];
    //  this.broker_master_add.patchValue({dist_code: null, city_code: null});
      if (state_name.length) 
      {
        this.status = false;
        this.DropDownListService.getDistrictThruState(state_name).subscribe(data =>
        { 
          this.districtsList = data; 
          this.status = true;
        });  
      }
    }

    onchangeDistrict(district_name: String) 
    {
     
      //this.broker_master_add.patchValue({city_code: null});
      if (district_name.length) 
      {
        this.status = false;
        this.DropDownListService.getCityListThruDistrict(district_name).subscribe(data =>
        {
          this.citiesList = data; 
          this.status = true;
        });  
        // this.DropDownListService.getPostOfficeThruDist(district_name).subscribe(data=>
        //   {
        //     this.PostOfficeList  = data;
        //     this.status = true;
        //   }); 
      }
    }

    handlePincode(event: any){
      if(event.target.value.length > 6){
        //alert("Please Enter 6 digit Pincode !!!");
        let x=event.target.value.substring(0,6);
        this.broker_master_add.patchValue({pincode:x});
      }
    }

    onChangePinCode(event)
    {
      this.status = false;
      this.bdistrict=this.broker_master_add.get('dist_code').value as FormControl;
      if(event.target.value !='' && event.target.value !="0")
      {
       this.DropDownListService.findPostOffice(event.target.value,this.bdistrict).subscribe(data=>
         {
           this.PostOfficeList = data;
           this.status = true;
         });
      }else{
        this.status = true;
       this.broker_master_add.patchValue({postid:"0"})};
    }

    // onChangePostOffice(event)
    // {
    //   // this.citiesList = [];
    //   //this.selectedDist = [];
    //   // this.selectedCity = [];
    //   //this.selectedPostOffice = [];
    
    //  if(event.length)
    //  {
    //     this.status = false;
    //   this.DropDownListService.getPincodeThruPO(event).subscribe(data=>
    //     {
    //      this.broker_master_add.patchValue({pin:data.pincode});
    //       this.status = true;
    //     });
    //  }   
    // }

    getIndexOfMatTab(event)
    {
      //console.log("mat-tab index: "+event.index);
      this.bid=this.userForm.get("broker_Id").value as FormControl;
      if(this.bid != null)
      {
       // console.log("brokerid: "+this.bid);
        if(event.index == 0)
        {
          //console.log("I am in tab index Address: "+event.index);
        }
        if(event.index == 1)
        {
         // console.log("I am in tab index Statutory Details: "+event.index);
        }
        if(event.index == 2)
        {
          //console.log("I am in tab index Accounting: "+event.index);
          this.accountingData();
        }
        if(event.index == 3)
        {
          //console.log("I am in tab index Accounting: "+event.index);
          this.partyData();
        }
        if(event.index == 4)
        {
          this.vendorData();
        }
        if(event.index == 5)
        {
          this.transporterData();
        }
        if(event.index == 6)
        {
          //console.log("I am in tab index Other Partner: "+event.index);
        }
        if(event.index == 7)
        {
          //console.log("I am in tab index Document Attachment: "+event.index);
        }
      }
    }

    onDelete(id:any,brokerid)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Broker ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
       
        this.DropDownListService.checkBrokerMasterUsage(brokerid).subscribe(checkBroker=> 
          {
           ///let dataq=JSON.parse(checkItem);
           //alert("bidhan here::"+checkBroker.status);
           if(checkBroker.status=='No')
           {
            this.Service.deleteBrokerMaster(this.userForm.getRawValue(),id).subscribe(data=> 
              {
              //  console.log("Broker :"+data.broker_code);
                if(data.broker_code=='' || data.broker_code==null)
                {
                  alert("Opps!!! Can't delete this Broker !!!");
                }else{
                  alert("Broker Deleted successfully.");
                }
                this.userForm.reset();
                this.status = true;
                this.isHidden = false;
                this.ngOnInit();
                this.showList("list");
              });

           }
           else{
            alert("This Broker is Already Used,Can not be Deleted!! ");
           }
          });  
      }  
      this.status = true;
    }

    Id:any;
    sq:any;
    send() 
    {
      this.Id= this.userForm.get("id").value as FormControl;
      //this.sq=this.userForm.get("broker_code").value as FormControl;
      
      this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
        fin_year:localStorage.getItem("financial_year"),
        username: localStorage.getItem("username")});
      this.submitted = true;
      if (!this.userForm.valid) 
      {
        alert('Please fill all fields!')
        return false;
      } 
      else 
      {
        this.status = false;
        if(this.userForm.get("broker_type").value == 0)
            {

                  alert("Please Select Type");
                  this.status =true;

            }
            else  if(this.userForm.get("name").value == "NA")
            {

                  alert("Please Insert Name");
                  this.status =true;

            }
            else  if(this.userForm.get("group_type").value == 0)
            {

                  alert("Please Select Group");
                  this.status =true;

            }

            else  if(this.userForm.get("constitution").value == 0)
            {

                  alert("Please Select Constitution");
                  this.status =true;

            }

            else  if(this.broker_master_add.get("country").value == 0)
            {

                  alert("Please Country Name In Address Tab!!");
                  this.status =true;

            }
            else  if(this.broker_master_add.get("state_code").value == 0)
            {

                  alert("Please Select State Name In Address Tab!!");
                  this.status =true;

            }
            else  if(this.broker_master_add.get("dist_code").value == 0)
            {

                  alert("Please Select District Name In Address Tab!!");
                  this.status =true;

            }
            // else  if(this.broker_master_add.get("city_code").value == 0)
            // {
            //       alert("Please Select City Name In Address Tab!!");
            //       this.status =true;
            // }
            else  if(this.broker_master_statutory.get("pan_no").value == "")
            {

                  alert("Please Insert PAN No In Statutory Details Tab!!");
                  this.status =true;

            }
            // else  if(this.broker_master_statutory.get("registered").value == true)
            // {
            //         if(this.broker_master_statutory.get("gst_no").value == "")
            //         {
            //           alert("Please Insert GST No. In Statutory Details Tab!!");
            //           this.status =true;
            //         }
            // }
            
            else
            { 
              if(this.Id>0)
              {
                let gststatus:boolean=true;
              if( this.broker_master_statutory.get('registered').value == true )
              {
                 // console.log(" reg11 " +this.supp_bussiness_partner_statutory.get("registered").value+"/"+this.supp_bussiness_partner_statutory.get('gst_no').value)             
                  if(this.broker_master_statutory.get("gst_no").value.length!='15')
                 {
                   alert("Please Enter Valid GST No In statutory Details Tab!!");
                   gststatus=false;
                    this.status=true;
                 }  
              }
              this.Service.updateBrokerMaster(this.userForm.getRawValue(),this.Id).subscribe(data => 
              {
               // console.log(this.userForm.value);
                alert("Broker Master Updated Successfully.");
                this.userForm.reset();
                this.status = true;
                this.isHidden = false;
                this.ngOnInit();
                this.showList("list");
                  
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Broker Master Updation Unsuccessfull...");
                });
              }
              else
              {   
                  let gststatus:boolean=true;
                  if( this.broker_master_statutory.get('registered').value == true )
                  {
                    // console.log(" reg11 " +this.supp_bussiness_partner_statutory.get("registered").value+"/"+this.supp_bussiness_partner_statutory.get('gst_no').value)             
                      if(this.broker_master_statutory.get("gst_no").value.length!='15')
                    {
                      alert("Please Enter Valid GST No In statutory Details Tab!!");
                      gststatus=false;
                        this.status=true;
                    }  
                  }

                      if(this.broker_master_vdr.at(0).get("vdr_code_name").value == null || this.broker_master_vdr.at(0).get("vdr_code_name").value == "")
                      {
                        this.broker_master_vdr.at(0).patchValue({vdr_code_name:0,basis:0,based_on:0,rate:0,brokerage_acc:"",tds_rate:0,tds_acc:0,eff_date:"",remarks:"NA"});
                      }
                      const InputData = this.userForm.getRawValue(); 
                      //console.log("input: "+JSON.stringify(InputData));
                      const frmData = new FormData();
                     // console.log(" length "+this.myFiles.length);
                      for (let i = 0; i < this.myFiles.length; i++) {  
                       
                        frmData.append("files", this.myFiles[i]);   
                      //  console.log();
                       if (i == 0) {  
                      //  console.log(i+",files: "+this.myFiles[i])
                       }  
                     }  
                     frmData.append("Input", JSON.stringify(InputData));
                      
                     
                 
                     // console.log("Form data: "+frmData);



                   //this.Service.createBroker(this.userForm.getRawValue()).subscribe(data => 
                    this.Service.createBroker(frmData).subscribe(data => 
                    // this.Service.createBroker(this.userForm.getRawValue()).subscribe(data => 
                      {
                        // this.DropDownListService.bro_supp_updation(data.broker_Id)
                        // .subscribe(dataewe =>
                        //   {
                        //    // console.log("Unload advice1111: "+JSON.stringify(purid+reftype))
                        //   }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
                        //   this.ngOnInit()});

                       //   console.log("New Broker Master Created"+JSON.stringify(data));
                      //  console.log(this.userForm.value);
                        alert("New Broker Master Created Successfully.");
                        this.userForm.patchValue({broker_code:this.seq_no});
                        this.userForm.reset();
                        this.status = true;
                        this.isHidden = false;
                        this.ngOnInit();
                        this.showList("list");
                       
                      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("New Broker Master Creation Unsuccessfull...");
                    });
            }
        }
      }
    }
  
    chkBrokerCodeStatus(event: any)
    {
      if(event.target.value!=null && event.target.value!='')
        {
          this.DropDownListService.chkBrokerMasterCodeStatus(event.target.value).subscribe(data=>
          {
            if(data.status=='EXIST')
            {
              alert("Already Exist Code : "+event.target.value +" . Please Change !!!" );
              this._BrokerCode.nativeElement.focus(); 
              this.userForm.patchValue({broker_code:null});  
              this.brokermastersave=false;
            } else {
              this.brokermastersave=true;
            }
          });
        }
     } 

     districtselected(state_name,districtcode)
     {
      this.DropDownListService.getDistrictThruState(state_name).subscribe(data =>
        { 
          
          this.districtsList = data;
          this.selectedDist=districtcode; 
          this.status = true;
        });  
      
      
     // this.selectedDist
     }
     cityselected(district_name,citycode)
     {

      this.DropDownListService.getCityListThruDistrict(district_name).subscribe(data =>
        {
         
          this.citiesList = data; 
          this.selectedCity=citycode;
          this.status = true;
        });  
     }
     
     postofficeselected(pinno,districtcode,postcode)
     {

      this.DropDownListService.findPostOffice(pinno,districtcode).subscribe(data=>
        {
          this.PostOfficeList = data;
          this.selectedPostOffice=postcode;
          this.status = true;
        });
     }

  onUpdate(id:number, broker_id:string,action)
  {
    this.brokermastersave= true;
    this.isTypeChecked = false;
    this.isRegister=true;
    this.status = false;
    this.isHidden = true;
    this.lockbrokername=true;
    this.showList("add");
    if(action == 'view')
       {this.brokermastersave= false;}
     else
       {this.brokermastersave= true;}
    forkJoin(
      this.Service.getBrokerMaster(id),
      this.Service.getBrokerMasterAddr(broker_id),
      this.Service.getBrokerMasterAddrDtls(broker_id),
      this.Service.getBrokerMasterStatutory(broker_id),
      this.Service.getBrokerMasterAccount(broker_id),
     // this.DropDownListService.custBrokerByCode(broker_id),
      //this.DropDownListService.getBrokerDetailsByBrokerCode(broker_id),
      this.Service.getBrokerMasterPty(broker_id),
     // this.Service.getBrokerMasterVdr(broker_id),
      this.Service.getBrokerMasterVdrnew(broker_id),
      this.Service.getBrokerMasterTransporter(broker_id),
      //this.DropDownListService.getTransporterBrokers(broker_id),
      this.Service.brokerMasterOtherPartner(broker_id),
      this.Service.brokerMasterDocument(broker_id),
      this.DropDownListService.supplierorcustomerCodeListNew(this.company_name)

    ).subscribe(([bData, addrData, addrDtlsData, statutoryData, accData, customerData,
        supplierData, transporterData, partnerData, docData,vendercodes])=>
      {
        this.vdr_code_names=vendercodes;
        this.selectssiapp(bData["ssi_app"]);
      //  console.log("BrokerDetails: "+JSON.stringify(bData))
        this.userForm.patchValue({id: bData["id"], broker_Id: bData["broker_Id"],
          broker_type: bData["broker_type"], broker_code: bData["broker_code"],
          name: bData["name"], alt_name: bData["alt_name"], group_type: bData["group_type"],
          sub_group_type: bData["sub_group_type"], trans_curr: bData["trans_curr"],
          broker_active: bData["broker_active"], broker_block: bData["broker_block"],
          company_id: bData["company_id"], fin_year: bData["fin_year"],constitution: bData["constitution"],ssi_app: bData["ssi_app"],ssi_regno: bData["ssi_regno"]});

      //  console.log("addrData: "+JSON.stringify(addrData))
        this.onchangeCountry(addrData[0].country)

        this.districtselected(addrData[0].state_code,addrData[0].dist_code);
        //this.onchangeState(addrData[0].state_code);
       // this.onchangeDistrict(addrData[0].dist_code);
       this.cityselected(addrData[0].dist_code,addrData[0].city_code);

       if(addrData[0].pin !='' )
       {

         this.postofficeselected(addrData[0].pin,addrData[0].dist_code,addrData[0].postid);

        // this.DropDownListService.findPostOffice(addrData["pin"],addrData[0].dist_code).subscribe(data=>
         //  {
           //  this.PostOfficeList = data;
          //   this.status = true;
          // });
       }
       

        this.broker_master_add.patchValue(addrData[0]);

        //console.log("addrDtlsData: "+JSON.stringify(addrDtlsData))
        while (this.broker_master_add_dtls.length) 
        this.broker_master_add_dtls.removeAt(0);
        for(let data1 of addrDtlsData)
        this.addContact();
        this.broker_master_add_dtls.patchValue(addrDtlsData);

        //console.log("statutoryData: "+JSON.stringify(statutoryData))
        this.isRegisteredChecked = statutoryData["registered"];
        this.broker_master_statutory.patchValue(statutoryData);

       // console.log("accData: "+JSON.stringify(accData))
        this.broker_master_account.patchValue(accData);

       // console.log("customerData: "+JSON.stringify(customerData))
        let i = 0;
        this.addParty();
        this.party_sl_no = 0;
        while (this.broker_master_pty.length) 
        this.broker_master_pty.removeAt(0);
        for(let data1 of customerData)
        {
          this.addParty();
          this.broker_master_pty.at(i).patchValue(data1);
          //date function
        let finaldate = data1.eff_date;
        finaldate =new Date().toISOString().split('T')[0];
        //eff_date: finaldate
          this.broker_master_pty.at(i).patchValue
          ({
         
            eff_date: finaldate
           });
          
          i = i + 1;
        }

     //   console.log("supplierData: "+JSON.stringify(supplierData))
        if(supplierData == null || supplierData =="")
        {
          this.addVendor();
          this.deleteVendor2(1)
        // alert(this.broker_master_vdr.length)
        }else
        {


          let j = 0;
        this.addVendor();
        this.vendor_sl_no = 0;
        while (this.broker_master_vdr.length)
        this.broker_master_vdr.removeAt(0);
        for(let data1 of supplierData)
        {
          this.addVendor();
       //   this.broker_master_vdr.at(j).patchValue(data1);
          let finaldate = data1.eff_date;
        finaldate =new Date().toISOString().split('T')[0];
        //eff_date: finaldate
        ;
       // console.log("here tuhin "+this.onChangeBasis(data1.basis,j))
        this.onChangeBasis(data1.basis,j)
          this.broker_master_vdr.at(j).patchValue
          ({srl_no:j+1,vdr_code_name:data1.vdr_code_name,basis:data1.basis,based_on:data1.based_on,rate:data1.rate,brokerage_acc:data1.brokerage_acc,tds_rate:data1.tds_rate,tds_acc:data1.tds_acc,remarks:data1.remarks,eff_date: finaldate});
          j = j + 1;
        }
        }
        

       // console.log("transporterData: "+JSON.stringify(transporterData))
        let k = 0;
        this.addTransporter();
        this.transporter_sl_no = 0;
        while (this.broker_master_transporter.length)
        this.broker_master_transporter.removeAt(0);
        for(let data1 of transporterData)
        {
          this.addTransporter();
          this.broker_master_transporter.at(k).patchValue(data1);
        let finaldate = data1.eff_date;
        finaldate =new Date().toISOString().split('T')[0];

         this.broker_master_transporter.at(k).patchValue({
          eff_date: finaldate
          });
          k = k + 1;
        }

        let m = 0;
        //console.log("partnerData: "+JSON.stringify(partnerData))
        this.addPartner();
        this.partner_sl_no = 0;          
        while (this.broker_master_oth.length) 
        this.broker_master_oth.removeAt(0);
        for(let data1 of partnerData)
        {
          this.addPartner();
          this.broker_master_oth.at(m).patchValue(data1);

          let finaldate = data1.eff_date;
          finaldate =new Date().toISOString().split('T')[0];
          
           this.broker_master_oth.at(m).patchValue({
            eff_date: finaldate
            });
          m=m+1;
        }
       
        let n=0;
       // console.log("docData: "+JSON.stringify(docData))
        this.addDocument();
        while (this.broker_master_doc.length)
        this.broker_master_doc.removeAt(0);
        for(let data1 of docData)
        {
          this.addDocument();
          this.broker_master_doc.at(n).patchValue(data1); 
          n=n+1;
        }
         

        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");this.ngOnInit()});
    }
    _basis:any;
    onChangeBasis(event:string, index)
    {
      //alert(" hello :: " + event)
      this._basis = event;
      if(event == 'UOM')
      this.basedOnList[index] = [{display: "GROSS AMT", value: "GROSS AMT"}, {display: "NET AMT", value: "NET AMT"}];
      if(event == '%')
      this.basedOnList[index] = [{display: "ITEM UOM", value: "ITEM UOM"}, {display: "PACKING UOM", value: "PACKING UOM"}];
    }
  
    getPanNoValid()
   {
     
     let pan_length = this.broker_master_statutory.get("pan_no").value;
     if(pan_length.length!='10')
     {
      alert("Please Enter Valid PAN No!!");
      //this.broker_master_statutory.patchValue({pan_no:''});  //for pan no not blank
      this.status=true;
     }
   }
   
   getGstNoValid()
   {
     
     let gst_length = this.broker_master_statutory.get("gst_no").value;
    if(this.broker_master_statutory.get("registered").value == true)
     {
      if(gst_length.length!='15')
      {
        alert("Please Enter Valid GST No!!");
        this.broker_master_statutory.patchValue({gst_no:''});
        this.status=true;
      }
     }
   }

   onFileSelected(e,i,tm)
   {
  
     this.myFiles.push(e.target.files[0]);//abc
 
     for(let v =0;v<this.myFiles.length; v++)//v hoache files array length
     {
     
       if(this.myFiles.length>tm.length)
       {
           if(v == i)//if size greater than 1
               {

                this.myFiles[i]=e.target.files[0];
                 
                 this.myFiles.pop();

               }
       }
    
     }


    
   }


   deleteDocument(index)
   {
     if(index)
     { 
      
       this.broker_master_doc.removeAt(index);
       this.myFiles.splice(index,1);
     }
     else
     {
       alert("can't delete all rows");
       this.broker_master_doc.reset();

     }
   }

   accountposting(id:any,action)
   {
    if(action=='Posting')
      {
        this.DropDownListService.accountpostingBrokerMaster(id).subscribe(data=>
          {
            if(data["export"] == 1)
            {
              alert("Data has been Exported Sucessfully !!!!!!!!!!!!! ");
            }
            else
            {
              alert("Data Didn't Exported  !!!!!!!!!!!!! ");
            }
            
            this.ngOnInit();
            this.isHidden = false;
            this.status = true;
          });
      }
    if(action=='Undo')
      {
        alert
        if(confirm("Are you sure to Posting Undo Of this Broker ?"))
        {
          if(confirm("First Delete This Broker Ledger From Tally!!!"))
          {
            this.DropDownListService.accountpostingUndoBrokerMaster(id).subscribe(data=>
              {
                if(data["export"] == 0)
                {
                  alert("Account Posting Undo Sucessfully !!!!!!!!!!!!! ");
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
  
  