import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Supp_bussiness_partner } from '../../../../../../Models/SupplierModel/Supp_bussiness_partner';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { MastermodalComponent } from '../mastermodal/mastermodal.component';
import { windowCount } from 'rxjs/operators';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Alert } from 'selenium-webdriver';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { JsonPipe } from '@angular/common';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-supplier-master',
  templateUrl: './SuppliersMaster.component.html',
  styleUrls: ['./SuppliersMaster.component.scss'],

})
export class SuppliersMasterComponent implements OnInit {

  selected = '';
  submitted = false;
  public userForm:FormGroup; 
  public userForm1:FormGroup;
  model: Supp_bussiness_partner = new Supp_bussiness_partner();
  listSupp_bussiness_partner:any=[];
  countries:{};
  //states:{};
  states:any=[];
  Constitution="0";
  Ssi_App="0";
  //districts:{};
  districts:any=[];
  basiss:{}
  cities:{};
  statesBills:{};
  districtsBills:{};
  UnitA:any
  citiesBills:{};
  bussiness_unit_list:any=[];
  subGroupNames:{};
  suppGroups:{};
  ledgerNames:{};
  ledgerName:{};
  ledgerbankacc:{};
  isTypeChecked = false;
  citiNames:{};
  brokerNames:{};
  Country="India";
  Country1="India";
  types:{};
  transCurrencis:{};
  company_name:any;
  designationlists:{};
  payTerms:{};
  isChecked1 = false;
  isChecked2 = false;
  isChecked3 = false;
  isChecked4 = false;
  isChecked5 = false;
  isChecked = false;
   isChecked14= false;
  Cash:string;
  scontact_person : any
  sdesignation : any
  sphone : any  
  smobile : any  
  sfax : any
  semail :any
  swebsite : any 
  scountry :any
  sstate : any 
  sdistrict : any  
  scity : any  
  spincode : any  
  sadd1 : any 
  sadd2 :any  
  sadd3 :any
  isHidden=false;
  staticpGroup:any;
  gbrokername:any;
  _broker_sl_no = 1;
  _dlv_from_sl_no = 1;
  basedOnList:any = [];
  //Supp_bussiness_partner: Supp_bussiness_partner[];
  bname:any;
  seq_no: string;
  isAcctype=false;
  isRegister=false;
  trans_currency1="INR";
  activeIsChecked:any;
  isValid:boolean=false;
  group_type1="0";
  bp_type1:any;
  bp_group_id:any;
  businessunit_id:any;
  state_code:any;
  suppliermastersave:boolean=true;
  suppliermasterupdate:boolean=true;
  suppliermasterview:boolean=true;
  suppliermasterdelete:boolean=true;
  suppliermasterposting:boolean=true;
  locksuppliername:boolean=true;
  transportstatus:any=[];
  unita1:any;
  brokerstatus:any=[];
  gststatus:any=[];
  transportownlist:any;
  abcdef:any;
  showtransporterown:boolean=false;
  registeredcheck:boolean=false;
  statutoryinsert:boolean=false;
  statutoryupdate:boolean=false;
  action:any;
  myFiles:any = [];
  supplierNames_List:any=[];
  supplierNames_List1:any=[];
  selectedcitydynamic:any=[];
  user_name:any;
  usernamelock:boolean=false;
  user_role:any;
  errormsg:any;
  errormsggstn:any;
  supplierId:any;

  stateCode:any;
  districtCode:any;

  isregistered:boolean=false;

  filteredOptions: Observable<string[]>;
  stateFilteredOptions: Observable<string[]>;
  districtFilteredOptions: Observable<string[]>;
  @ViewChild('iCodeInput') _SupplierCode: ElementRef;

  constructor(
    public fb:FormBuilder,
    public dialog: MatDialog,
    private Service : Master,
    private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group({
      id:[''],
      bp_Id:[''],
      bp_code :[''],
      company_id : [''], 
      unita : [''],
      fin_year :[''], 
      bp_type : [''],  
      bp_name : [''],  
      alt_name : [''],   
      bp_active : [''],  
      group_type : [''],  
      sub_group_type:[''],
      trans_currency :[''],
      block_active : [''],  
      reason : [''],  
      business_unit:[''],
     // pak_mat_replc : [''], 
      copy_bp_addr : [''],
      party_nature : [''],  
      def_tds_nature : [''],  
      broker_status : ['true'],
      username: [''],
      
      constitution: [''],
      ssi_app: [''],
      ssi_regno:[''] ,

      supp_bussiness_partner_docs: this.fb.array([this.fb.group({
       doc_name : '',  
        })]),

      supp_bussiness_partner_address:this.fb.group({      
        website:'', 
        country:'', 
        postid:'',
        state_code:'', 
        state:'',
        dist_code:'',
        district:'', 
        city_code:'', 
        city_name:'', 
        pincode:'', 
        add1:'', 
        add2:'', 
        add3:'', 
      }),
      supp_bussiness_partner_bill_addr:this.fb.group({        
          country :'',
          state_code : '',
          postid:''  ,
          dist_code : '',  
          city_code : '', 
          city_name : '', 
          pincode : '',  
          add1 : '',  
          add2 :'',
          add3 :'',
      }),
      supp_bussiness_partner_delv_from: this.fb.array([this.fb.group({   
             sl_no : this._dlv_from_sl_no,
              contact_person : '',  
              designation : '',  
              phone :'',
              mobile : '',  
              fax :'', 
              email :'', 
              city : '',  
              city_name : '', 
              pincode :'',
              address :'',
              bu_name:'',
              transport_own:'',
              transporters:'',
      })]),
      supp_bussiness_partner_accont:this.fb.group({
            pay_cont_acc : '',   
            party_bankacc :'',
            pay_term : '',  
            credit_lim :'',  
            cash_lim_status :'',      
            cash_limit :'',
            tcs_applicable:'',
            tcs_rate:'',
            tcs_date:'',
            mode_of_pay:'',   
            accountholder:'',
            acc_no:'',
            bankname:'',
            ifsc:'',
            mobile:'',
            iban: '', 
            bic_swift_code: '',
            branch: '',
            acc_type: '',
            acc_remarks: '',
      }),
      
      supp_bussiness_partner_statutory:this.fb.group({
          registered : '',  
          pan_no : '',  
          tan_no :'', 
          cin_no:'',
          gst_no:'',
          supplier_type:''
      }),
      supp_bussiness_partner_broker: this.fb.array([this.fb.group({    
        sl_no : this._broker_sl_no,
        ven_code_name : '',  
        ven_name :'',
        basis : '',  
        based_on: '',
        rate : '',  
        eff_date :'',
        remarks :'',
        brokerage_acc:'',
        tds_acc:'',
        tds_rate:''
      })
    ]),
    supp_bussiness_partner_addr_dtls: this.fb.array([this.fb.group({
        contact_person : '', 
        designation : '',  
        phone : '',  
        mobile : '',  
        fax : '',  
        email :''
          })
        ]),
       
      supp_bussiness_partner_bill_addr_dtls: this.fb.array([this.fb.group({
        contact_person : '', 
        designation : '',  
        phone : '',  
        mobile : '',  
        fax : '',  
        email :''
          })
        ]),
            suppliertransporterList:this.fb.array([this.fb.group({
              transporterid:'',
                transportercode:'',
                transportername:''
              })
            ])
      });

      this.userForm1=fb.group(
        {
          supplier_name1:[''],
          supp_group:[''],
          supp_type:[''],
        });

      this.supp_bussiness_partner_accont.get('cash_lim_status').disable();
      this.supp_bussiness_partner_accont.get('cash_limit').disable();
    }   
   get bp_code(){ return this.userForm.get("bp_code") as FormControl } 
   get bp_Id(){return this.userForm.get("bp_Id") as FormControl}
   get id(){return this.userForm.get("id") as FormControl}
   get unita(){ return this.userForm.get("unita") as FormControl }
   get sub_group_type(){ return this.userForm.get("sub_group_type") as FormControl }
   get bp_type(){ return this.userForm.get("bp_type") as FormControl }
   get bp_name(){ return this.userForm.get("bp_name") as FormControl }
   get broker_status(){ return this.userForm.get("broker_status") as FormControl }
   get alt_name(){ return this.userForm.get("alt_name") as FormControl }
   get bp_active(){ return this.userForm.get("bp_active") as FormControl }
   get company_id(){ return this.userForm.get("company_id") as FormControl }
   get fin_year(){ return this.userForm.get("fin_year") as FormControl }
   get group_type(){ return this.userForm.get("group_type") as FormControl }
   get trans_currency(){ return this.userForm.get("trans_currency") as FormControl }
   get block_active(){ return this.userForm.get("block_active") as FormControl }
   get reason(){ return this.userForm.get("reason") as FormControl }   
   get business_unit(){ return this.userForm.get("business_unit").value.toString() as FormControl }  
   get copy_bp_addr(){ return this.userForm.get("copy_bp_addr") as FormControl }
   get party_nature(){ return this.userForm.get("party_nature") as FormControl }
   get def_tds_nature(){ return this.userForm.get("def_tds_nature") as FormControl }
   get doc_name(){ return this.userForm.get("doc_name") as FormControl }
   get constitution(){return this.userForm.get("constitution") as FormControl}
   get ssi_app(){return this.userForm.get("ssi_app") as FormControl}
   get ssi_regno(){return this.userForm.get("ssi_regno") as FormControl}

   get supp_bussiness_partner_address() { return this.userForm.get('supp_bussiness_partner_address') as FormGroup;}
   get supp_bussiness_partner_bill_addr() { return this.userForm.get('supp_bussiness_partner_bill_addr') as FormGroup;}
   get supp_bussiness_partner_delv_from() { return this.userForm.get('supp_bussiness_partner_delv_from') as FormArray;}
   get supp_bussiness_partner_accont() { return this.userForm.get('supp_bussiness_partner_accont') as FormGroup;}
   get supp_bussiness_partner_statutory() { return this.userForm.get('supp_bussiness_partner_statutory') as FormGroup;}
   get supp_bussiness_partner_broker() { return this.userForm.get('supp_bussiness_partner_broker') as FormArray;}
   get supp_bussiness_partner_addr_dtls() { return this.userForm.get('supp_bussiness_partner_addr_dtls') as FormArray;}
   get supp_bussiness_partner_bill_addr_dtls() { return this.userForm.get('supp_bussiness_partner_bill_addr_dtls') as FormArray;}
   get supp_bussiness_partner_docs() { return this.userForm.get('supp_bussiness_partner_docs') as FormArray;}
   get suppliertransporterList() { return this.userForm.get('suppliertransporterList') as FormArray;}

   get supplier_name1(){ return this.userForm1.get("supplier_name1") as FormControl }
   get supp_group(){ return this.userForm1.get("supp_group") as FormControl }
   get supp_type(){ return this.userForm1.get("supp_type") as FormControl }
   
  status = false;
  
  private _filterState(value: string): any[] 
  {
  const filterStateValue = value.toLocaleLowerCase();
  //console.log("filterValueState: "+filterStateValue)
  return this.states.filter(option => option.state_name.toLocaleLowerCase().includes(filterStateValue));
  }

  private _filterDistrict(value: string): any[] 
  {
   const filterDistrictValue = value.toLocaleLowerCase();
   //console.log("filterValueState: "+filterStateValue)
   return this.districts.filter(option => option.dist_name.toLocaleLowerCase().includes(filterDistrictValue));
  }

  ngOnInit() 
  {
    let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
  
    this.suppliermastersave= false;
    this.suppliermasterupdate=false;
    this.suppliermasterdelete=false;
    this.suppliermasterview=false;
    this.suppliermasterposting=false;
    this.locksuppliername=false;
    this.isregistered = false;
    this.registeredcheck=false;
    this.statutoryinsert=true;
    this.statutoryupdate=false;
    if(accessdata.includes('supplier_master.save'))
    {
      this.suppliermastersave = true;
    }
    if(accessdata.includes('supplier_master.update'))
    { 
      this.suppliermasterupdate=true; 
    }
    if(accessdata.includes('supplier_master.delete'))
    {
      this.suppliermasterdelete=true;
    }
    if(accessdata.includes('supplier_master.view'))
    {
      this.suppliermasterview=true;
    }
    if(accessdata.includes('supplier_master.posting'))
    {
      this.suppliermasterposting=true;
    }

   this.activeIsChecked = true;
   this.bp_group_id="0";
//changes 25-04-2012
   this.group_type1="0"; 
   this.state_code="0";
   this.businessunit_id="0";

//changes ends 25-04-2012
   this.bp_type1="0";
   this.user_name = localStorage.getItem("username");
   this.user_role=localStorage.getItem("user_role");
      /* if(this.user_role == 'RL00001')
       {
         this.usernamelock=true;
       }
       else
       {
         this.usernamelock=false;
       }*/ 
       this.usernamelock=true;// all users update 

   this.supp_bussiness_partner_delv_from.at(0).patchValue({contact_person:"NA"});
   this.company_name = localStorage.getItem("company_name");
   this.supp_bussiness_partner_accont.patchValue({party_bankacc :"0", pay_term:"0"});
   this.supp_bussiness_partner_broker.at(0).patchValue({brokerage_acc:"0"})
   this.supp_bussiness_partner_accont.patchValue({party_bankacc: "0", pay_term: "0"});
   this.types=["SUPPLIER FOR MATERIAL","SUPPLIER FOR SERVICES","SUPPLIER FOR BOTH"];
   this._broker_sl_no=1;
   this._dlv_from_sl_no=1;
   this.transCurrencis=["INR"];
   
   this.trans_currency1="INR";
   this.basiss=["%","UOM"];
   this.status = true;
   this.supp_bussiness_partner_address.patchValue({country:"INDIA"});
   this.supp_bussiness_partner_bill_addr.patchValue({country:"INDIA"});
   this.supp_bussiness_partner_delv_from.at(0).patchValue({transport_own:"0"})
       
   this.DropDownListService.countryList().subscribe(data=>{this.countries  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");this.ngOnInit()});
   this.Service.getSupplierBPartnersFastApi(this.company_name).subscribe(data=>{this.listSupp_bussiness_partner  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");this.ngOnInit()});
   this.DropDownListService.supplierNameCodeList().subscribe(data=>{this.suppGroups = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");this.ngOnInit()});
   this.DropDownListService.controlAccList().subscribe(data=>{this.subGroupNames = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");this.ngOnInit()});
   this.DropDownListService.citiNamesList().subscribe(data=>{this.citiNames = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");this.ngOnInit()});
   this.DropDownListService.brokerNameList().subscribe(data=>{this.brokerNames = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");this.ngOnInit()});
   this.DropDownListService.ledgerList().subscribe(data=>{this.ledgerName = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");this.ngOnInit()});  
   this.DropDownListService.ledgerList().subscribe(data=>{this.ledgerbankacc = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");this.ngOnInit()});
   this.DropDownListService.designationList().subscribe(data=>{this.designationlists = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");this.ngOnInit()});
   this.DropDownListService.payTermNameList().subscribe(data=>{this.payTerms = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");this.ngOnInit()});
   this.DropDownListService.getCompanyBUMNCList(this.company_name).subscribe(data=>{this.bussiness_unit_list = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");this.ngOnInit()});
  // this.DropDownListService.supplierNamesList(this.company_name).subscribe(suppData=>{this.supplierNames_List=suppData;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");this.ngOnInit()});
  this.DropDownListService.supplierNamesNewList(this.company_name).subscribe(suppData=>
    {this.supplierNames_List=suppData;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");this.ngOnInit()});
  
  //   forkJoin(
  //     this.DropDownListService.countryList(),
  //     this.Service.getSupplierBPartners(),
  //     this.DropDownListService.supplierNameCodeList(),
  //     this.DropDownListService.controlAccList(),
  //     this.DropDownListService.citiNamesList(),
  //     this.DropDownListService.brokerNameList(),
  //     this.DropDownListService.ledgerList(),
  //     this.DropDownListService.ledgerList(),
  //     this.DropDownListService.designationList(),
  //     this.DropDownListService.payTermNameList(),
  //     this.DropDownListService.getCompanyBUMNCList(this.company_name),
      
  //   ).subscribe(([CountryList, SupplierList, SupplierName, subGroupName, citiNames,brokerNames,ledgerName,ledgerbankacc,designationlists,bussiness_unit_list])=>
  //   {
  //     this.countries  = CountryList;
  //     this.listSupp_bussiness_partner  = SupplierList;
  //     this.suppGroups = SupplierName;
  //     this.subGroupNames = subGroupName;
  //     this.citiNames = citiNames;
  //     this.brokerNames = brokerNames;
  //     this.ledgerName = ledgerName;
  //     this.ledgerbankacc = ledgerbankacc;
  //     this.designationlists = designationlists;
  //     this.bussiness_unit_list =bussiness_unit_list;
  //     this.status = true;
  //   }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
  // this.ngOnInit()});
  

  this.filteredOptions = this.userForm1.controls['supplier_name1'].valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value))
  );
    }

    private _filter(value: string): any[] {
      const filterValue = value.toLocaleLowerCase();
      //console.log("filterValue: "+filterValue)
    
      return this.supplierNames_List.filter(option => option.bp_name.toLocaleLowerCase().includes(filterValue));
    }

    onShopSelectionChanged(event) {
      // I want to get the full object and display the name
      this.supplierId=event.option.id;
      //alert(event.option.id)
      return event;
    }

  con_acc:any;
  groupstat1:any;
  onFocusoutCheckUnique2(event: any)
  {
    //alert("Check : : "+event.target.value)
    //console.log(event.target.value.replace("/","").toUpperCase())
    let supplier=event.target.value.split("/").join("").toUpperCase();
    //this.DropDownListService.chkSuppNameStat(event.target.value).subscribe(data=>
    this.DropDownListService.chkSuppNameStat(supplier).subscribe(data=>
    {
      //console.log("Value : : "+JSON.stringify(data));
        this.groupstat1 = data.group_name;
        this.status=true;
      //window.alert( data.group_name);
      if(this.groupstat1=='EXIST')
      {
        window.alert(event.target.value +"  "+ "Already Exist Please Change ..... " );
        this.suppliermastersave=false;
        this.userForm.patchValue({bp_name:""});
        this.status=true;
      }
      else
      {
        this.suppliermastersave=true;
        this.status=true;
      }
      
    });
    this.groupstat1='';         
  }
  
  //sup_name:any;
  nameExist:any;
  onFocusoutCheckUnique(event)
  {
      this.nameExist="";
      //let sname=event.target.value;
      let sname=event.target.value.toUpperCase();
      console.log("Name  : : "+sname.trim().toUpperCase())
      for(let name of this.listSupp_bussiness_partner)
      {
        if(sname==(name["bp_name"]))
        {
          console.log("Name List if : : "+(name["bp_name"]));
          //this.sup_name=name["bp_name"];
          this.nameExist=" Name Already Exist!!! Please Change";
          break;
        }
        else
        {
          console.log("Name List else : : "+(name["bp_name"]))
          //this.sup_name="";
          this.nameExist="";
        }
      }
      //console.log("S : : "+this.sup_name);
       
      //this.listSupp_bussiness_partner
  }
 /* search(event)
  {
    let serchText = event.target.value;
    serchText=this.Service.replaceAllSpl(serchText,"&","ampersand");
    serchText=this.Service.replaceAllSpl(serchText,"/","backslash");
      
    if(event.key == "Enter")
    {
      this.status = false;
      if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
      {
        this.DropDownListService.findSuppliers('0').subscribe(data=>
        {
          this.listSupp_bussiness_partner = data;
          this.status = true;
        });
      }
      else
      {
        this.DropDownListService.findSuppliers(serchText).subscribe(data=>
        {
          this.listSupp_bussiness_partner = data;
          this.status = true;
        });     
      }
    }
  }*/

  err_message="";
  _tcs_appl = "No";
  onChangeTcsApplicable(tcs_appl:string)
  {
    if(tcs_appl == 'Yes')
    {
      this.isChecked=true;
      this._tcs_appl = "Yes";
      this.err_message = "You have selected TCS applicable('Yes') so, here PAN No. is must.."
      this.supp_bussiness_partner_statutory.patchValue({registered: true});
      this.isChecked2 = true;

    }
    else
    {
      this.supp_bussiness_partner_statutory.patchValue({registered: false});
      this._tcs_appl = "No";
      this.isChecked2 = false;
      this.isChecked=false;
    }
  }

  handlePincode(event: any){
    if(event.target.value.length > 6){
      //alert("Please Enter 6 digit Pincode !!!");
      let x=event.target.value.substring(0,6);
      this.supp_bussiness_partner_address.patchValue({pincode:x});
    }
  }

  handlePincodeBill(event: any){
    if(event.target.value.length > 6){
      //alert("Please Enter 6 digit Pincode !!!");
      let x=event.target.value.substring(0,6);
      this.supp_bussiness_partner_bill_addr.patchValue({pincode:x});
    }
  }

  onChangePinCode(event)
  {
    this.status = false;
    this.sdistrict=this.supp_bussiness_partner_address.get('dist_code').value as FormControl;
    if(event.target.value !='' && event.target.value !="0")
    {
     this.DropDownListService.findPostOffice(event.target.value,this.sdistrict).subscribe(data=>
       {
         this.PostOfficeList = data;
         this.status = true;
       });
    }else{
      this.status = true;
     this.supp_bussiness_partner_address.patchValue({postid:"0"})};
  }

  onChangePinCodeBill(event)
  {
    this.status = false;
    this.sdistrict=this.supp_bussiness_partner_bill_addr.get('dist_code').value as FormControl;
    if(event.target.value !='' && event.target.value !="0")
    {
     this.DropDownListService.findPostOffice(event.target.value,this.sdistrict).subscribe(data=>
       {
         this.PostOfficeListBill = data;
         this.status = true;
       });
    
      
      }else
      {
      this.status = true;
     this.supp_bussiness_partner_bill_addr.patchValue({postid:"0"})};
  }

  _basis:any;
  onChangeBasis(event:string, index)
  {
    this._basis = event;
    if(event == 'UOM')
    this.basedOnList[index] = [{display: "GROSS AMT", value: "GROSS AMT"}, {display: "NET AMT", value: "NET AMT"}];
    if(event == '%')
    this.basedOnList[index] = [{display: "ITEM UOM", value: "ITEM UOM"}, {display: "PACKING UOM", value: "PACKING UOM"}];
  }

  trans:any;
  in:any;
  Transcode:any;

  showPopUp(index)
  {
    this.trans = this.supp_bussiness_partner_delv_from.at(index).get('transport_own').value as FormControl;
   // alert("index: "+index+" :"+this.trans);
   if(this.trans == "YES")
   {
     this.showtransporterown=true;
     const dialogConfig = new MatDialogConfig();
     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     dialogConfig.data = {
       index: index,
      // title: 'Angular For Beginners'
   };
   //  this.dialog.open(MastermodalComponent, dialogConfig);
   
     const dialogRef = this.dialog.open(MastermodalComponent, dialogConfig);
     

   dialogRef.afterClosed().subscribe(
       data => {
         //alert("chk1l"+JSON.stringify(data))
         if(data=="" || data == null || data.bp_code =="")
         {
           alert("Please Check Transporter Name from Transporter List !!!!!!!!");
          this.supp_bussiness_partner_delv_from.at(0).patchValue({transport_own:"NO"})
          this.showtransporterown=false;
         }
         else
         {
          this.Transcode = data["bp_code"] ;
          this.in=data["index"];
          console.log(this.Transcode+" got "+this.in);
          this.supp_bussiness_partner_delv_from.at(this.in).patchValue({transporters: this.Transcode});


//here need to changes things

             this.DropDownListService.transporterownlist(this.supp_bussiness_partner_delv_from.at(0).get("transporters").value)
             .subscribe(data123=>
              {
               // alert(JSON.stringify(data123))
                

                let k =0;
              //console.log(JSON.stringify(data123))
              this.addtransporterlistown()
              while (this.suppliertransporterList.length) 
              this.suppliertransporterList.removeAt(0);
                  for(let data12 of data123)
                  {
                  
                    this.addtransporterlistown();
                    this.suppliertransporterList.at(k).patchValue({transporterid:data12["bp_Id"],transportercode:data12["bp_code"],transportername:data12["bp_name"]})
                       k=k+1;
                    
                  }
              });


         }
        
      
      
        }
   ); 
   }
   else
   {
     this.showtransporterown=false;
     this.supp_bussiness_partner_delv_from.at(0).patchValue({transporters:""});
   }
  }
 
  showList(s:string)
    {
      if(this.suppliermastersave == true  && this.suppliermasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.isTypeChecked = true;
          this.DropDownListService.stateListByCountry(this.Country).subscribe(data=>{this.states  = data;
          console.log("states " + JSON.stringify(data))}); 

          this.stateFilteredOptions = this.supp_bussiness_partner_address.controls['state'].valueChanges.pipe(
            startWith(''),
            map(value => this._filterState(value))
          );

          this.DropDownListService.stateListByCountry(this.Country1).subscribe(data=>{this.statesBills  = data;});             
          this.trans_currency1="INR";
          this.Country="INDIA";
          this.Country1="INDIA";
          this.activeIsChecked = true;
          this.Ssi_App="0";
          this.Constitution="0";
          this.supp_bussiness_partner_address.patchValue({country:"INDIA"});
          this.supp_bussiness_partner_bill_addr.patchValue({country:"INDIA"});
          this.supp_bussiness_partner_delv_from.at(0).patchValue({transport_own:"NO"});
          this.group_type1="0"; 
          this.check4(false);
          this.userForm.patchValue({broker_status:true})
       //   alert("list "+this.isChecked4);
          this.supp_bussiness_partner_broker.at(0).patchValue({sl_no:  this._broker_sl_no});
          this.supp_bussiness_partner_delv_from.at(0).patchValue({sl_no:this._dlv_from_sl_no});
         //=this.bussiness_unit_list[0].businessunit_id;
          //console.log(this.UnitA)
        //  this.userForm.patchValue({unita:this.UnitA});
        //this.unita1= [this.UnitA];
        } 
      }
      if(this.suppliermastersave == true  && this.suppliermasterupdate == false)
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.isTypeChecked = true;
          this.DropDownListService.stateListByCountry(this.Country).subscribe(data=>{this.states  = data;}); 

          this.stateFilteredOptions = this.supp_bussiness_partner_address.controls['state'].valueChanges.pipe(
            startWith(''),
            map(value => this._filterState(value))
          );

          this.DropDownListService.stateListByCountry(this.Country1).subscribe(data=>{this.statesBills  = data;});             
          this.trans_currency1="INR";
          this.Country="INDIA";
          this.activeIsChecked = true;
          this.Country1="INDIA";
          this.Ssi_App="0";
          this.Constitution="0";
          this.supp_bussiness_partner_address.patchValue({country:"INDIA"});
          this.supp_bussiness_partner_bill_addr.patchValue({country:"INDIA"});
          this.supp_bussiness_partner_delv_from.at(0).patchValue({transport_own:"NO"});
          this.group_type1="0"; 
          this.userForm.patchValue({broker_status:true})
          this.check4(false);
          this.supp_bussiness_partner_broker.at(0).patchValue({sl_no:  this._broker_sl_no});
          this.supp_bussiness_partner_delv_from.at(0).patchValue({sl_no:this._dlv_from_sl_no});
         // alert("list "+this.isChecked4);
          //this.UnitA=this.bussiness_unit_list[0].businessunit_id;
          //console.log(this.UnitA)
        //  this.userForm.patchValue({unita:this.UnitA});
       //this.unita1= [this.UnitA];
        } 
      }

      if(s=="list")
      {
        this.isHidden=false;
        this.suppliermastersave == true
        this.locksuppliername=false;
        this.userForm.reset();
        this.activeIsChecked = true;
        this.nameExist="";
        this.errormsggstn="";
        this.supp_bussiness_partner_address.patchValue({country:"INDIA"});
        this.supp_bussiness_partner_bill_addr.patchValue({country:"INDIA"});
        this.trans_currency1="INR";
        this.Country="INDIA";
        this.Country1="INDIA";
        this.Ssi_App="0";
        this.Constitution="0";
        this.group_type1="0"; 
        this.userForm.patchValue({broker_status:true})
        this.check4(false);
        this.supp_bussiness_partner_broker.at(0).patchValue({sl_no:  this._broker_sl_no});
        this.supp_bussiness_partner_delv_from.at(0).patchValue({sl_no:this._dlv_from_sl_no});
        this.supp_bussiness_partner_statutory.reset();
        //this.userForm.reset(this.ResetAllValues().value);
       // alert("list "+this.isChecked4);
      }
    }

    selectssiapp(s:string)
    {
      if(s=='YES')
      {
        this.isRegister=true;
      }
      else
      {
        this.isRegister=false;
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

  ResetAllValues()
{
  return this.userForm=this.fb.group({
    id:[''],
    bp_Id:[''],
    bp_code :[''],
    company_id : [''],  
    unita : [''],
    fin_year : [''],
    bp_type : [''],  
    bp_name : [''],  
    alt_name : [''],   
    bp_active : [''],  
    group_type : [''],  
    sub_group_type:[''],
    trans_currency :[''],
    block_active : [''],  
    reason : [''],  
    business_unit:[''],
   // pak_mat_replc : [''], 
    copy_bp_addr : [''],
    party_nature : [''],  
    def_tds_nature : [''],   
    broker_status : ['true'],
    username: [''],

    constitution: [''],
    ssi_app: [''],
    ssi_regno:[''] ,

    supp_bussiness_partner_docs: this.fb.array([this.fb.group({
     doc_name : '',  
      })]),

    supp_bussiness_partner_address:this.fb.group({      
      website:'', 
      country:'', 
      state_code:'', 
      state:'',
      dist_code:'',
      district:'', 
      city_code:'', 
      pincode:'', 
      add1:'', 
      add2:'', 
      add3:'', 
    }),
    supp_bussiness_partner_bill_addr:this.fb.group({        
        country :'',
        state_code : '',  
        dist_code : '',  
        city_code : '',  
        pincode : '',  
        add1 : '',  
        add2 :'',
        add3 :'',
    }),
    supp_bussiness_partner_delv_from: this.fb.array([this.fb.group({   
           sl_no : this._dlv_from_sl_no,
            contact_person : '',  
            designation : '',  
            phone :'',
            mobile : '',  
            fax :'', 
            email :'', 
            city : '',  
            pincode :'',
            address :'',
            bu_name:'',
            transport_own:'',
            transporters:'',
    })]),
    supp_bussiness_partner_accont:this.fb.group({
          pay_cont_acc : '',   
          party_bankacc :'',
          pay_term : '',  
          credit_lim :'',  
          cash_lim_status :'',      
          cash_limit :'',
          tcs_applicable:'',
          tcs_rate:'',
          tcs_date:'',
          mode_of_pay:'',   
          accountholder:'',
          acc_no:'',
          bankname:'',
          ifsc:'',
          mobile:'',
          iban: '', 
          bic_swift_code: '',
          branch: '',
          acc_type: '',
          acc_remarks: '',
    }),
    
    supp_bussiness_partner_statutory:this.fb.group({
        registered : '',  
        pan_no : '',  
        tan_no :'', 
        cin_no:'',
        gst_no:'',
        supplier_type:''
    }),
    supp_bussiness_partner_broker: this.fb.array([this.fb.group({    
      sl_no : this._broker_sl_no,
      ven_code_name : '',  
      ven_name :'',
      basis : '',  
      based_on: '',
      rate : '',  
      eff_date :'',
      remarks :'',
      brokerage_acc:'',
      tds_acc:'',
      tds_rate:''
    })
  ]),
  supp_bussiness_partner_addr_dtls: this.fb.array([this.fb.group({
      contact_person : '', 
      designation : '',  
      phone : '',  
      mobile : '',  
      fax : '',  
      email :'',
        })
      ]),
     
    supp_bussiness_partner_bill_addr_dtls: this.fb.array([this.fb.group({
      contact_person : '', 
      designation : '',  
      phone : '',  
      mobile : '',  
      fax : '',  
      email :'',
        })
      ])
    });

}

     is_cash_limit_active = false;
     onChangePaymentMode(payment_mode: string)
     {
        if(payment_mode == "CASH")
        {
          this.is_cash_limit_active = true;
          this.supp_bussiness_partner_accont.get('cash_lim_status').enable();
          this.supp_bussiness_partner_accont.get('cash_limit').enable();
        }
        else
        {
          this.is_cash_limit_active = false;
          this.supp_bussiness_partner_accont.patchValue({cash_lim_status: false, cash_limit: 0});
          this.supp_bussiness_partner_accont.get('cash_lim_status').disable();
          this.supp_bussiness_partner_accont.get('cash_limit').disable();
        }
        
      }
  
    check5(ev):void{
    this.isChecked5 = !this.isChecked5;
    if(this.isChecked5 == false)
    {
      this.userForm.patchValue({reason: null});
    }
    else{
      this.isChecked5 == true;
    }
  }

  check4(ev):void{
    this.isChecked4 = !this.isChecked4;}

  check3(ev):void{
    this.isChecked3 = !this.isChecked3;}
  
  check2(ev)
  {
    if(ev.checked == true)
    this.isregistered = true;
    else
    this.isregistered = false;
  }

  PostOffice:any;
  PostOfficeListBill:any=[];
  PinCode:any;
  check1(event,index):void {
    console.log(this.isChecked1);
    if(event.checked)
    {    
      this.swebsite=this.supp_bussiness_partner_address.get('website').value as FormControl; 
      this.scountry=this.supp_bussiness_partner_address.get('country').value as FormControl;
      this.sstate =this.supp_bussiness_partner_address.get('state_code').value as FormControl;
      this.sdistrict=this.supp_bussiness_partner_address.get('dist_code').value as FormControl; 
      this.scity=this.supp_bussiness_partner_address.get('city_code').value as FormControl;
      //this.scity=this.supp_bussiness_partner_address.get('city_name').value as FormControl;
      this.spincode=this.supp_bussiness_partner_address.get('pincode').value as FormControl;  
      this.sadd1=this.supp_bussiness_partner_address.get('add1').value as FormControl;
      this.sadd2=this.supp_bussiness_partner_address.get('add2').value as FormControl;  
      this.sadd3=this.supp_bussiness_partner_address.get('add3').value as FormControl;
      this.PostOffice=this.supp_bussiness_partner_address.get('postid').value as FormControl;
      //  this.onchangeCountryBill(this.scountry);
      // this.onchangeStateBill(this.sstate);
      // this.onchangeDistrictBill(this.sdistrict);
      // if(this.scountry!="")
      //   {
      //     this.DropDownListService.stateListByCountry( this.scountry).subscribe(data=>{this.statesBills = data;});
      //   }

      if(this.sstate!="")
        {
          this.DropDownListService.getDistrictThruState(this.sstate ).subscribe(data=>{this.districtsBills = data;});
        }
        if(this.sdistrict!="")
        { 
          this.DropDownListService.getCityListThruDistrict( this.sdistrict).subscribe(data=>{this.citiesBills = data;}); 
        }
 

        if( this.spincode !=''){
          this.DropDownListService.findPostOffice(this.spincode,this.sdistrict).subscribe(data=>
            {
              this.PostOfficeListBill = data;      
              this.status = true;
            });
        }
        this.selectedCityBill = this.scity;
        this.selectedDistBill = this.sdistrict;
        this.selectedPostOfficeBill = this.PostOffice;

        this.supp_bussiness_partner_bill_addr.patchValue({country: this.scountry,postid:this.PostOffice,
          state_code: this.sstate, dist_code: this.sdistrict, city_code: this.scity, pincode:this.spincode,
       //  state_code: this.sstate, dist_code: this.sdistrict, city_name: this.scity, pincode:this.spincode,
          add1:this.sadd1, add2: this.sadd2, add3:this.sadd3});
      
        // if(this.sdistrict!="")
        // { 
        //   this.DropDownListService.getPostOfficeThruDist(this.sdistrict).subscribe(data=>
        //     {
        //       this.PostOfficeListBill  = data;
        //       this.status = true;
        //     }); 
        // }

        for(let i=0; i<this.supp_bussiness_partner_addr_dtls.length; i++)
        {
        
        if(i!=0)
        {
          this.add4();
        }
        this.scontact_person = this.supp_bussiness_partner_addr_dtls.at(i).get('contact_person').value as FormControl;
        this.sdesignation  = this.supp_bussiness_partner_addr_dtls.at(i).get('designation').value as FormControl;
        this.sphone  = this.supp_bussiness_partner_addr_dtls.at(i).get('phone').value as FormControl;
        this.smobile = this.supp_bussiness_partner_addr_dtls.at(i).get('mobile').value as FormControl;  
        this.sfax  = this.supp_bussiness_partner_addr_dtls.at(i).get('fax').value as FormControl; 
        this.semail = this.supp_bussiness_partner_addr_dtls.at(i).get('email').value as FormControl;

        this.supp_bussiness_partner_bill_addr_dtls.at(i).patchValue({contact_person: this.scontact_person});
        this.supp_bussiness_partner_bill_addr_dtls.at(i).patchValue({designation: this.sdesignation});
        this.supp_bussiness_partner_bill_addr_dtls.at(i).patchValue({phone: this.sphone});
        this.supp_bussiness_partner_bill_addr_dtls.at(i).patchValue({mobile: this.smobile});
        this.supp_bussiness_partner_bill_addr_dtls.at(i).patchValue({fax: this.sfax});
        this.supp_bussiness_partner_bill_addr_dtls.at(i).patchValue({email: this.semail});
      }
      //
     }

    else{
      this.swebsite=""; 
      this.scountry="";
      this.sstate="";
      this.sdistrict="";  
      this.scity="";
      this.spincode="";  
      this.sadd1="";
      this.sadd2="";  
      this.sadd3="";
      this.scontact_person="";
      this.sdesignation="";
      this.sphone="";
      this.smobile="";
      this.smobile="";
      this.semail="";
      this.sfax="";
      this.PostOffice="";
      this.supp_bussiness_partner_bill_addr.patchValue({country: "India",
      state_code: "0", dist_code: "0", pincode:this.spincode,
      city_code: "0",add1:null, add2: null, add3:null,postid:"0"});
     // city_name: "0",add1:null, add2: null, add3:null,postid:"0"});
      // console.log("2nd array length: "+this.supp_bussiness_partner_bill_addr_dtls.length);
      this.supp_bussiness_partner_bill_addr_dtls.reset();
      while (this.supp_bussiness_partner_bill_addr_dtls.length ) {
        this.supp_bussiness_partner_bill_addr_dtls.removeAt(0);
     }
     this.add4();
      console.log("2nd array length after deleted : "+this.supp_bussiness_partner_addr_dtls.length);
      //this.Supp_bussiness_partner_addr_dtls.length
      //this.Supp_bussiness_partner_bill_addr_dtls.
     
     // this.add4();
    }

  }

  add1() {
    this._dlv_from_sl_no=this._dlv_from_sl_no+1;
    this.supp_bussiness_partner_delv_from.push(this.fb.group({
      sl_no : this._dlv_from_sl_no, 
      contact_person : '',  
      designation : '',  
      phone :'',
      mobile : '',  
      fax :'', 
      email :'', 
      city : '',  
      pincode :'',
      address :'',
      bu_name:'',
      transport_own:'',
      transporters:'',
    }));
  }
  delete1(index) 
    {
      if(this._dlv_from_sl_no > 1)
      { 
        this.supp_bussiness_partner_delv_from.removeAt(index);
        this._dlv_from_sl_no = this._dlv_from_sl_no - 1;
      }
      else
      {
        this._dlv_from_sl_no = 1;
        alert("can't delete all rows");
        this.supp_bussiness_partner_delv_from.reset();
        this.supp_bussiness_partner_delv_from.at(0).patchValue({sl_no:  this._dlv_from_sl_no});
      } 
      
      for(let i=1; i<=this._dlv_from_sl_no; i++)
        this.supp_bussiness_partner_delv_from.at(i-1).patchValue({sl_no: i});
      
    }

  add2() {
    this._broker_sl_no=this._broker_sl_no+1;
    this.supp_bussiness_partner_broker.push(this.fb.group({
      sl_no : this._broker_sl_no, 
      ven_code_name : '',  
      ven_name :'',
      basis : '',  
      based_on:'',
      rate : '',  
      eff_date :'',
      remarks :'',
      brokerage_acc:'',
      tds_acc:'',
      tds_rate:''
    }));
  }
  delete2(index) 
    {
      if(this._broker_sl_no > 1)
      { 
        this.supp_bussiness_partner_broker.removeAt(index);
        this._broker_sl_no = this._broker_sl_no - 1;
      }
      else
      {
        this._broker_sl_no = 1;
        alert("can't delete all rows");
        this.supp_bussiness_partner_broker.reset();
        this.supp_bussiness_partner_broker.at(0).patchValue({sl_no:  this._broker_sl_no});
      } 
      
      for(let i=1; i<=this._broker_sl_no; i++)
        this.supp_bussiness_partner_broker.at(i-1).patchValue({sl_no: i});
      
    }

  add3() {
    this.supp_bussiness_partner_addr_dtls.push(this.fb.group({
      contact_person : '', 
      designation : '',  
      phone : '',  
      mobile : '',  
      fax : '',  
      email :''
    }));
  }
  delete3(index) {
    if(index)
    {
     this.supp_bussiness_partner_addr_dtls.removeAt(index);
    }
   else
   {
    alert("can't delete all rows");
   }

  }

  add4() {
    this.supp_bussiness_partner_bill_addr_dtls.push(this.fb.group({
      contact_person : '', 
      designation : '',  
      phone : '',  
      mobile : '',  
      fax : '',  
      email :''
    }));
  }
  delete4(index) {
    if(index)
    {
     this.supp_bussiness_partner_bill_addr_dtls.removeAt(index);
    }
   else 
   {
    alert("can't delete all rows");
   }

  }

  add5() {
    this.supp_bussiness_partner_docs.push(this.fb.group({
      doc_name : '', 
    
    }));
  }

  addtransporterlistown() {
    this.suppliertransporterList.push(this.fb.group({
      transporterid : '', 
      transportercode:'',
      transportername:''
    
    }));
  }
  delete5(index) {
    if(index)
    {
     this.supp_bussiness_partner_docs.removeAt(index);
    }
   else
   {
    alert("can't delete all rows");
   }

  }

  // onchangeBrokerName(index,event)
  //  {
  //    if(event)
  //    {
  //     	   this.status = false;
  //          this.DropDownListService.brokerListById(event.target.value).subscribe(data=>{
          
  //          this.gbrokername = data.name;
          
  //          console.log("Got Row Data: "+JSON.stringify(data)+","+ this.gbrokername);
  //          this.supp_bussiness_partner_broker.at(index).patchValue({ven_name:this.gbrokername});
          
  //     });
  //     this.status = true;
  //    }
  //  }

  onchangeBroker(broker_code: String)
  {
    if(broker_code)
    {
      this.status = false;
      this.DropDownListService.brokerListByCode(broker_code).subscribe(data=>{
        console.log("got Broker Name: "+JSON.stringify(data));
        this.userForm.patchValue(data);
        //getFormsVal=data;
        });
        this.status = true;
    }
  }
  onchangeGetParentGroup(groupname: String)
  {
    //alert("Group: "+event.target.value);
    if(groupname)
    {
      //this.status = false;
      //  this.DropDownListService.getSuppParentGroupName(groupname).subscribe(data=>{
      //  this.staticpGroup=data.bp_grp_name });


      //new
      this.DropDownListService.getSuppParentGroupName(groupname).subscribe(data=>{
        this.userForm.patchValue({sub_group_type:data["bp_grp_name"]});
        this.supp_bussiness_partner_accont.patchValue({pay_cont_acc:data["bp_grp_name"]});
      
      });
  //end


      // this.status = true;
    }
  }


  onchangeLedger(ledger_name: String)
 {
  // alert();
   if(ledger_name)
   {
    this.status = false;
    this.DropDownListService.ledgerListBySubGroup(ledger_name).subscribe(data=>{this.ledgerNames  = data;});
    this.status = true;
  }
 }
onchangeCountry(country_name)
 {
  //console.log(" Country : :"+country_name)
   if(country_name.length)
   {
    this.status = false;
    this.DropDownListService.stateListByCountry(country_name).subscribe(data=>{this.states  = data;});

    this.stateFilteredOptions = this.supp_bussiness_partner_address.controls['state'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterState(value))
    );
    this.status = true;
  }
   else
   {
    this.supp_bussiness_partner_address.get('state_code').reset();
    this.supp_bussiness_partner_address.get('dist_code').reset();
    this.supp_bussiness_partner_address.get('city_code').reset();
   }
 }
 selectedCity:any=[];
 selectedDist:any=[];
 onchangeState(state_name)
 {
  //this.selectedDist = [];
  //this.selectedCity = [];

  console.log("STATE  : : "+state_name.option.id)
   if(state_name.option.id.length)
   {
     this.status = false;
     this.stateCode=state_name.option.id;  // I want to get the full object and display the name
     this.supp_bussiness_partner_address.patchValue({state_code:state_name.option.id});
     //console.log("noob " +  this.supp_bussiness_partner_address.get("state_code").value)
     this.DropDownListService.getDistrictThruState(this.stateCode).subscribe(data=>{this.districts  = data;});

     this.districtFilteredOptions = this.supp_bussiness_partner_address.controls['district'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterDistrict(value))
      );

     this.status = true;
   }
   else
   {
    this.supp_bussiness_partner_address.get('dist_code').reset();
    this.supp_bussiness_partner_address.get('city_code').reset();
   }
   
    
 }
 PostOfficeList:any[];
 onchangeDistrict(district_name)
 {
  this.selectedCity = [];
  //console.log("Distict  : : "+district_name.option.id)
   if(district_name.option.id.length)
   //if(district_name.length)
   {
    
     this.status = false;
     this.districtCode=district_name.option.id;  // I want to get the full object and display the name
     this.supp_bussiness_partner_address.patchValue({dist_code:district_name.option.id});
     this.DropDownListService.getCityListThruDistrict(district_name).subscribe(data=>{this.cities  = data;});
     this.status = true;

    // this.DropDownListService.getPostOfficeThruDist(district_name).subscribe(data=>
    //   {
    //     this.PostOfficeList  = data;
    //     this.status = true;
    //   }); 
  }
   else
   {
    this.supp_bussiness_partner_address.get('city_code').reset();
   }  
 }

 selectedPostOffice:any=[];
//  onChangePostOffice(event)
//  {
//    // this.citiesList = [];
//    //this.selectedDist = [];
//    // this.selectedCity = [];
//    //this.selectedPostOffice = [];
 
//   if(event.length)
//   {
//      this.status = false;
//    this.DropDownListService.getPincodeThruPO(event).subscribe(data=>
//      {
//       this.supp_bussiness_partner_address.patchValue({pincode:data.pincode});
//        this.status = true;
//      });
//   }   
//  }

 selectedPostOfficeBill:any=[];
//  onChangePostOfficeBill(event)
//  {
//    // this.citiesList = [];
//    //this.selectedDist = [];
//    // this.selectedCity = [];
//    //this.selectedPostOfficeBill = [];
 
//   if(event.length)
//   {
//      this.status = false;
//    this.DropDownListService.getPincodeThruPO(event).subscribe(data=>
//      {
//       this.supp_bussiness_partner_bill_addr.patchValue({pincode:data.pincode});
//        this.status = true;
//      });
//   }   
//  }

 selectedCityBill:any=[];
 selectedDistBill:any=[];
 onchangeCountryBill(country_name: String)
 {
  this.selectedCityBill = [];
  this.selectedDistBill = [];
   //alert(country_name);
   if(country_name.length)
   {
    this.status = false;
    this.DropDownListService.stateListByCountry(country_name).subscribe(data=>{this.statesBills = data;});
    this.status = true;
  }
   else
   {
    this.supp_bussiness_partner_bill_addr.get('state_code').reset();
    this.supp_bussiness_partner_bill_addr.get('dist_code').reset();
    this.supp_bussiness_partner_bill_addr.get('city_code').reset();
   }
 }
 onchangeStateBill(state_name:String)
 {
  this.selectedCityBill = [];
  this.selectedDistBill = [];
  // alert(state_name);
   if(state_name.length)
   {
     this.status = false;
    this.DropDownListService.getDistrictThruState(state_name).subscribe(data=>{this.districtsBills = data;});
    this.status = true;
  }
   else
   {
    this.supp_bussiness_partner_bill_addr.get('dist_code').reset();
    this.supp_bussiness_partner_bill_addr.get('city_code').reset();
   }
 }
 onchangeDistrictBill(district_name)
 {
  this.selectedCityBill = [];
   //alert(district_name);
   if(district_name.length)
   {
     this.status = false;
    this.DropDownListService.getCityListThruDistrict(district_name).subscribe(data=>{this.citiesBills = data;});
    // this.DropDownListService.getPostOfficeThruDist(district_name).subscribe(data=>
    //   {
    //     this.PostOfficeListBill  = data;
    //     this.status = true;
    //   });
    this.status = true;
  }
   else
   {
    this.supp_bussiness_partner_bill_addr.get('city_code').reset();
   }
 }
 
   Id:any;
  _pan_no:any;
  busi:any;
  
  send()
  {
    this.transportstatus=[];
    this.brokerstatus=[];
    //let UnitA = this.userForm.get("unita").value; 
    
    //this.userForm.patchValue({business_unit:UnitA.toString()});
    
    this.Id= this.userForm.get("id").value as FormControl;
    this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
      fin_year:localStorage.getItem("financial_year"),
      username: localStorage.getItem("username")});
     
    this.submitted = true;
   
    this._pan_no = this.supp_bussiness_partner_statutory.get("pan_no").value as FormControl;
    
    if(!this.userForm.valid) 
    {
      alert('Please fill all fields!')
      return false;
    } 
    else 
    {
      if(this.Id>0)
      {
        if( this._tcs_appl == 'Yes' && this._pan_no != '' || this._tcs_appl == 'No')
        {
          this.status = false;
          this.isChecked2 = false;
          this.err_message="";
          let UnitA = this.userForm.get("unita").value; 

          if(this.userForm.get("bp_type").value == null || this.userForm.get("bp_type").value == 0 )
          {
          alert("Please Select Type!!!!  ");
          this.status=true;
          }
          else if(this.userForm.get("bp_name").value == null || this.userForm.get("bp_name").value == "")
          {
            alert("Please Insert Name");
            this.status=true;
            
          }
          else if(this.userForm.get("group_type").value == null || this.userForm.get("group_type").value == 0)
          {
            
            alert(" Please Select Group !!!!! ");
            this.status=true;
          }
         else if(UnitA == 0  || UnitA == '' || UnitA == null)
          {
            alert("Please Select Bussiness Unit!!")
            this.status=true;
          }
          // else if(this.userForm.get("unita").value == null || this.userForm.get("unita").value == 0)
          // {
          //   alert("Please Select Bussiness Unit!!!!  ");
          //   this.status=true;
          // }
          else if(this.userForm.get("constitution").value == null || this.userForm.get("constitution").value == "" || this.userForm.get("constitution").value == 0)
          {
            alert(" Please Select Constitution ");
            this.status=true;
          }
          else if( this.supp_bussiness_partner_address.get('country').value == null || this.supp_bussiness_partner_address.get('country').value == "" || this.supp_bussiness_partner_address.get('country').value == 0)
          {
            alert(" Please Select Country Name In Address Tab!!!");
            this.status=true;
          }
          else if(this.supp_bussiness_partner_address.get('state_code').value == null || this.supp_bussiness_partner_address.get('state_code').value == "" || this.supp_bussiness_partner_address.get('state_code').value == 0)
          {
            alert(" Please Select State Name In Address Tab!!!");
            this.status=true;
          }
          else if(this.supp_bussiness_partner_address.get('dist_code').value == null || this.supp_bussiness_partner_address.get('dist_code').value == "" || this.supp_bussiness_partner_address.get('dist_code').value == 0)
          {
            alert("  Please Select District In Address Tab!!!");
            this.status=true;
          }
          else if(this.supp_bussiness_partner_address.get('pincode').value == null || this.supp_bussiness_partner_address.get('pincode').value == "" || this.supp_bussiness_partner_address.get('pincode').value == 0)
          {
            alert(" Please Enter Pin Code In Address Tab!!!");
            this.status=true;
          }
          // else if(this.supp_bussiness_partner_address.get('city_code').value == null || this.supp_bussiness_partner_address.get('city_code').value == "" || this.supp_bussiness_partner_address.get('city_code').value == 0)
          // {
          //   alert(" Please Select City In Address Tab!!!");
          //   this.status=true;
          // }
          // else if(this.supp_bussiness_partner_address.get('pincode').value == null || this.supp_bussiness_partner_address.get('pincode').value == "" || this.supp_bussiness_partner_address.get('pincode').value == 0)
          // {
          //   alert(" Please Enter Pin Code In Address Tab!!!");
          //   this.status=true;
          // }
          else if(this.supp_bussiness_partner_bill_addr.get('country').value == null || this.supp_bussiness_partner_bill_addr.get('country').value == "" || this.supp_bussiness_partner_bill_addr.get('country').value == 0)
          {
            alert(" Please Select Country Name In Billing Address Tab!!!");
            this.status=true;
          }
          else if(this.supp_bussiness_partner_bill_addr.get('state_code').value == null || this.supp_bussiness_partner_bill_addr.get('state_code').value == "" || this.supp_bussiness_partner_bill_addr.get('state_code').value == 0)
          {
            alert(" Please Select State Name In Billing Address Tab!!!");
            this.status=true;
          }
          else if(this.supp_bussiness_partner_bill_addr.get('dist_code').value == null || this.supp_bussiness_partner_bill_addr.get('dist_code').value == "" || this.supp_bussiness_partner_bill_addr.get('dist_code').value == 0)
          {
            alert("Please Select District In Billing Address Tab!!!");
            this.status=true;
          }
          // else if(this.supp_bussiness_partner_bill_addr.get('city_code').value == null || this.supp_bussiness_partner_bill_addr.get('city_code').value == "" || this.supp_bussiness_partner_bill_addr.get('city_code').value == 0)
          // {
          //   alert("  Please Select City In Billing Address Tab!!!");
          //   this.status=true;
          // }
          // else if(this.supp_bussiness_partner_bill_addr.get('pincode').value == null || this.supp_bussiness_partner_bill_addr.get('pincode').value == "" || this.supp_bussiness_partner_bill_addr.get('pincode').value == 0)
          // {
          //   alert(" Please Enter Pin Code In Billing Address Tab!!!");
          //   this.status=true;
          // }
         
          else if( this.supp_bussiness_partner_statutory.get('pan_no').value == "" || this.supp_bussiness_partner_statutory.get('pan_no').value == null )
          {
            alert("Please Enter PAN No. In statutory Details Tab!!!");
           this.status=true;
          }
          else if(this.supp_bussiness_partner_statutory.get("pan_no").value.length!='10')
          {
            alert("Please Enter Valid PAN No In statutory Details Tab!!");
           // this.supp_bussiness_partner_statutory.patchValue({pan_no:''}); //for not blank pan no
            this.status=true;
          }
          else if( this.supp_bussiness_partner_statutory.get('registered').value == true && (this.supp_bussiness_partner_statutory.get('gst_no').value == "" || this.supp_bussiness_partner_statutory.get('gst_no').value == null ))
          {
            alert("Please Enter GST No. In Statutory Details Tab as Party is Check Register !!!");
            this.status=true;
          }
          else if( this.supp_bussiness_partner_statutory.get('registered').value == true  && this.supp_bussiness_partner_statutory.get("gst_no").value.length!='15')
          {
            alert("Please Enter Valid GST No In statutory Details Tab!!");
            this.status=true;
          }
          else if(this.supp_bussiness_partner_statutory.get('registered').value == true  && this.GstPanCheck == false)
          {
            alert("PAN No. is not includes in GSTIN!! Please Enter Valid GST No In statutory Details Tab!!!!");
            this.status=true;
          }
          else if( this.supp_bussiness_partner_statutory.get('registered').value == true && (this.supp_bussiness_partner_statutory.get('supplier_type').value == "" || this.supp_bussiness_partner_statutory.get('supplier_type').value == null || this.supp_bussiness_partner_statutory.get('supplier_type').value =="NA"))
          {
            alert("Please Enter Supplier Type In Statutory Details Tab as Party is Check Register !!!");
            this.status=true;
          }
        /* else if( this.supp_bussiness_partner_statutory.get('registered').value == true )
         {
          console.log(" reg11 " +this.supp_bussiness_partner_statutory.get("registered").value+"/"+this.supp_bussiness_partner_statutory.get('gst_no').value)
        
             if(this.supp_bussiness_partner_statutory.get("gst_no").value.length!='15')
            {
              alert("Please Enter Valid GST No In statutory Details Tab!!");
           
               this.status=true;
               //this.isChecked2 = true;
               console.log("here0 ")
            }
            console.log("here1 ")
        }*/
          else
          {
          //console.log("here2 ")
           
                this.userForm.patchValue({business_unit:UnitA.toString()});
              // this.model.business_unit.value.toString();
              if(this.supp_bussiness_partner_addr_dtls.at(0).get("contact_person").value == null || this.supp_bussiness_partner_addr_dtls.at(0).get("contact_person").value == "")
              {
                this.supp_bussiness_partner_addr_dtls.at(0).patchValue({contact_person:"NA",designation:0,phone:0,mobile:0,fax:0,email:"NA"});
              }
              
              //if(this.supp_bussiness_partner_broker.at(0).get("ven_code_name").value == null || this.supp_bussiness_partner_broker.at(0).get("ven_code_name").value == "")
             // {
             //   this.supp_bussiness_partner_broker.at(0).patchValue({ven_code_name:0,basis:0,based_on:0,rate:0,brokerage_acc:"",tds_rate:0,tds_acc:0,eff_date:"",remarks:"NA"});
             // }

                for(let b=0;b<this.supp_bussiness_partner_delv_from.length;b++)
                {
                  if( this.supp_bussiness_partner_delv_from.at(b).get("transport_own").value == "" || this.supp_bussiness_partner_delv_from.at(b).get("transport_own").value == 0)
                  {
                    alert(" Please Select Transport Own In Delivery From Tab");
                    this.status=true;
                    this.transportstatus.push("false")
                  }
                }
                //Broker name validation
                for(let c=0;c<this.supp_bussiness_partner_broker.length;c++)
                {
                  if(this.supp_bussiness_partner_broker.at(c).get("ven_code_name").value == null || this.supp_bussiness_partner_broker.at(c).get("ven_code_name").value == "" || this.supp_bussiness_partner_broker.at(c).get("ven_code_name").value == "0")
                  {
                    alert("Please Enter Broker Name In Broker Details Tab!!");
                    this.status=true;
                    this.brokerstatus.push("false")
                  }
                }
                let gststatus:boolean=true;

                if( this.supp_bussiness_partner_statutory.get('pan_no').value == "" || this.supp_bussiness_partner_statutory.get('pan_no').value == null )
                {
                  alert("Please Enter PAN no. In Statutory Details Tab!!!");
                 this.status=true;
                }
                else if(this.supp_bussiness_partner_statutory.get("pan_no").value.length!='10')
                {
                  alert("Please Enter Valid PAN No In statutory Details Tab!!");
                  // this.supp_bussiness_partner_statutory.patchValue({pan_no:''}); //for not blank pan no
                  this.status=true;
                }
                else if( this.supp_bussiness_partner_statutory.get('registered').value == true && (this.supp_bussiness_partner_statutory.get('gst_no').value == "" || this.supp_bussiness_partner_statutory.get('gst_no').value == null ))
                {
                  alert("Please Enter GST no. In Statutory Details Tab as Party is Check Registered !!!");
                  this.status=true;
                }
                else if( this.supp_bussiness_partner_statutory.get('registered').value == true  && this.supp_bussiness_partner_statutory.get("gst_no").value.length!='15')
                {
                  alert("Please Enter Valid GST No In Statutory Details Tab!!");
                  this.status=true;
                }
                else if(this.supp_bussiness_partner_statutory.get('registered').value == true  && this.GstPanCheck == false)
                {
                  alert("PAN No. is not includes in GSTIN!! Please Enter Valid GST No In statutory Details Tab!!!!");
                  this.status=true;
                }
                else if( this.supp_bussiness_partner_statutory.get('registered').value == true && (this.supp_bussiness_partner_statutory.get('supplier_type').value == "" || this.supp_bussiness_partner_statutory.get('supplier_type').value == null || this.supp_bussiness_partner_statutory.get('supplier_type').value =="NA"))
                {
                  alert("Please Enter Supplier Type In Statutory Details Tab as Party is Check Register !!!");
                  this.status=true;
                }
                else if(this.transportstatus.includes("false") || this.brokerstatus.includes("false") )
                {
                  this.status=true;
                }
                else
                {
            
                    this.Service.updateSuppBussinessPartner(this.userForm.getRawValue(),this.Id).subscribe( data => 
                    {
                      console.log("supplier Master data"+this.userForm.value);
                      alert("Supplier Master Updated successfully.");
                      //window.location.reload();
                    this.userForm.reset();
                      this.status = true;
                      //refresh List;
                      this.userForm.patchValue({group_type: "0", trans_currency:"0", business_unit:"0"});
                      this.ngOnInit();
                      this.isHidden=false;
                      this.DropDownListService.stateListByCountry(this.Country).subscribe(data=>{this.states  = data;}); 
                      this.DropDownListService.stateListByCountry(this.Country1).subscribe(data=>{this.statesBills  = data;});             
                      this.trans_currency1="INR";
                      this.Country="INDIA";
                      this.Country1="INDIA";
                      this.group_type1="0"; 
                      this.group_type1="0"; 
                      this.check4(false);
                      this.supp_bussiness_partner_broker.at(0).patchValue({sl_no:  this._broker_sl_no});
                      this.supp_bussiness_partner_delv_from.at(0).patchValue({sl_no:this._dlv_from_sl_no});
                    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Supplier Master Updation Unsuccessfull...");
                    //this.ngOnInit()
                  });
                  }
              }   
        }
        else
        {alert(this.err_message)}  

      }
      else
      {
   
        if( this._tcs_appl == 'Yes' && this._pan_no != '' || this._tcs_appl == 'No')
        {


          this.status = false;
          this.isChecked2 = false;
          this.err_message="";
//alert(this.supp_bussiness_partner_delv_from.at(0).get("transport_own").value)

          let UnitA = this.userForm.get("unita").value; 
           if(this.userForm.get("bp_type").value == null || this.userForm.get("bp_type").value == 0 )
            {
            alert("Please Select Type!!!!  ");
            this.status=true;
            }
            else if(this.userForm.get("bp_name").value == null || this.userForm.get("bp_name").value == "")
            {
              alert("Please Insert Name");
              this.status=true;
              
            }
            else if(this.userForm.get("group_type").value == null || this.userForm.get("group_type").value == 0)
            {
              
              alert(" Please Select Group !!!!! ");
              this.status=true;
            }
            else if(UnitA == 0 || UnitA == '' || UnitA == null)
            {
              alert("Please Select Bussiness Unit!!")
              this.status=true;
            }
            // else if(this.userForm.get("unita").value == null || this.userForm.get("unita").value == 0)
            // {
            //   alert("Please Select Bussiness Unit!!!!  ");
            //   this.status=true;
            // }
            else if(this.userForm.get("constitution").value == null || this.userForm.get("constitution").value == "" || this.userForm.get("constitution").value == 0)
            {
              alert(" Please Select Constitution ");
              this.status=true;
            }
            else if( this.supp_bussiness_partner_address.get('country').value == null || this.supp_bussiness_partner_address.get('country').value == "" || this.supp_bussiness_partner_address.get('country').value == 0)
            {
              alert(" Please Select Country Name In Address Tab!!!");
              this.status=true;
            }
            else if(this.supp_bussiness_partner_address.get('state_code').value == null || this.supp_bussiness_partner_address.get('state_code').value == "" || this.supp_bussiness_partner_address.get('state_code').value == 0)
            {
              alert(" Please Select State Name In Address Tab!!!");
              this.status=true;
            }
            else if(this.supp_bussiness_partner_address.get('dist_code').value == null || this.supp_bussiness_partner_address.get('dist_code').value == "" || this.supp_bussiness_partner_address.get('dist_code').value == 0)
            {
              alert("  Please Select District In Address Tab!!!");
              this.status=true;
            }
            else if(this.supp_bussiness_partner_address.get('pincode').value == null || this.supp_bussiness_partner_address.get('pincode').value == "" || this.supp_bussiness_partner_address.get('pincode').value == 0)
            {
              alert(" Please Enter Pin Code In Address Tab!!!");
              this.status=true;
            }
            // else if(this.supp_bussiness_partner_address.get('city_code').value == null || this.supp_bussiness_partner_address.get('city_code').value == "" || this.supp_bussiness_partner_address.get('city_code').value == 0)
            // {
            //   alert(" Please Select City In Address Tab!!!");
            //   this.status=true;
            // }
            // else if(this.supp_bussiness_partner_address.get('pincode').value == null || this.supp_bussiness_partner_address.get('pincode').value == "" || this.supp_bussiness_partner_address.get('pincode').value == 0)
            // {
            //   alert(" Please Enter Pin Code In Address Tab!!!");
            //   this.status=true;
            // }
            else if(this.supp_bussiness_partner_bill_addr.get('country').value == null || this.supp_bussiness_partner_bill_addr.get('country').value == "" || this.supp_bussiness_partner_bill_addr.get('country').value == 0)
            {
              alert(" Please Select Country Name In Billing Address Tab!!!");
              this.status=true;
            }
            else if(this.supp_bussiness_partner_bill_addr.get('state_code').value == null || this.supp_bussiness_partner_bill_addr.get('state_code').value == "" || this.supp_bussiness_partner_bill_addr.get('state_code').value == 0)
            {
              alert(" Please Select State Name In Billing Address Tab!!!");
              this.status=true;
            }
            else if(this.supp_bussiness_partner_bill_addr.get('dist_code').value == null || this.supp_bussiness_partner_bill_addr.get('dist_code').value == "" || this.supp_bussiness_partner_bill_addr.get('dist_code').value == 0)
            {
              alert("Please Select District In Billing Address Tab!!!");
              this.status=true;
            }
            // else if(this.supp_bussiness_partner_bill_addr.get('city_code').value == null || this.supp_bussiness_partner_bill_addr.get('city_code').value == "" || this.supp_bussiness_partner_bill_addr.get('city_code').value == 0)
            // {
            //   alert("  Please Select City In Billing Address Tab!!!");
            //   this.status=true;
            // }
            // else if(this.supp_bussiness_partner_bill_addr.get('pincode').value == null || this.supp_bussiness_partner_bill_addr.get('pincode').value == "" || this.supp_bussiness_partner_bill_addr.get('pincode').value == 0)
            // {
            //   alert(" Please Enter Pin Code In Billing Address Tab!!!");
            //   this.status=true;
            // }
            else if( this.supp_bussiness_partner_statutory.get('pan_no').value == "" || this.supp_bussiness_partner_statutory.get('pan_no').value == null )
            {
              alert("Please Enter PAN no. In Statutory Details Tab!!!");
             this.status=true;
            }
            else if(this.supp_bussiness_partner_statutory.get("pan_no").value.length!='10')
            {
              alert("Please Enter Valid PAN No In statutory Details Tab!!");
              // this.supp_bussiness_partner_statutory.patchValue({pan_no:''}); //for not blank pan no
              this.status=true;
            }
            else if( this.supp_bussiness_partner_statutory.get('registered').value == true && (this.supp_bussiness_partner_statutory.get('gst_no').value == "" || this.supp_bussiness_partner_statutory.get('gst_no').value == null ))
            {
              alert("Please Enter GST no. In Statutory Details Tab as Party is Check Registered !!!");
              this.status=true;
            }
            else if( this.supp_bussiness_partner_statutory.get('registered').value == true  && this.supp_bussiness_partner_statutory.get("gst_no").value.length!='15')
            {
              alert("Please Enter Valid GST No In Statutory Details Tab!!");
              this.status=true;
            }
            else if(this.supp_bussiness_partner_statutory.get('registered').value == true  && this.GstPanCheck == false)
            {
              alert("PAN No. is not includes in GSTIN!! Please Enter Valid GST No In statutory Details Tab!!!!");
              this.status=true;
            }
            else if( this.supp_bussiness_partner_statutory.get('registered').value == true && (this.supp_bussiness_partner_statutory.get('supplier_type').value == "" || this.supp_bussiness_partner_statutory.get('supplier_type').value == null || this.supp_bussiness_partner_statutory.get('supplier_type').value =="NA"))
            {
              alert("Please Enter Supplier Type In Statutory Details Tab as Party is Check Register !!!");
              this.status=true;
            }
          //  else if( this.supp_bussiness_partner_statutory.get('registered').value == true )
          //  {
           
          //    //
          //     if( this.supp_bussiness_partner_statutory.get('gst_no').value == "" ||this.supp_bussiness_partner_statutory.get('gst_no').value ==null)
          //     {
          //       alert("Please Select GST no. In Statory Details Tab!!!");
          //       this.status=true;
          //     }
          // }
           
          // }
           
            else
            {
              
              // this.gststatus.push(this.supp_bussiness_partner_statutory.get('registered').value);
              // if(this.gststatus.includes(true))
              //   {
              //     if( this.supp_bussiness_partner_statutory.get('gst_no').value == "" )
              //     {
              //       alert("Please Select GST No. In Statory Details Tab!!!");
              //       this.status=true;
              //       this.isChecked2 = true;
              //     }
              //   else if(this.supp_bussiness_partner_statutory.get("gst_no").value.length!='15')
              //     {
              //       alert("Please Enter Valid GST No In Statory Details Tab!!");
              //      // this.supp_bussiness_partner_statutory.patchValue({gst_no:''}); //for not blank gst no
              //      this.status=true;
              //      this.isChecked2 = true;
              //     }
              //     this.isChecked2 = true;
              //   }
                
                if(this.supp_bussiness_partner_addr_dtls.at(0).get("contact_person").value == null || this.supp_bussiness_partner_addr_dtls.at(0).get("contact_person").value == "")
                {
                  this.supp_bussiness_partner_addr_dtls.at(0).patchValue({contact_person:"NA",designation:0,phone:0,mobile:0,fax:0,email:"NA"});
                }
                // if(this.supp_bussiness_partner_broker.at(0).get("ven_code_name").value == null || this.supp_bussiness_partner_broker.at(0).get("ven_code_name").value == "")
                // {
                //   this.supp_bussiness_partner_broker.at(0).patchValue({ven_code_name:0,basis:0,based_on:0,rate:0,brokerage_acc:"",tds_rate:0,tds_acc:0,eff_date:"",remarks:"NA"});
                // }


                              for(let b=0;b<this.supp_bussiness_partner_delv_from.length;b++)
                              {
                                
                                      if( this.supp_bussiness_partner_delv_from.at(b).get("transport_own").value == "" || this.supp_bussiness_partner_delv_from.at(b).get("transport_own").value == 0 )
                                      {
                                        alert(" Please Select Transport Own In Delivery From Tab");
                                        this.status=true;
                                        this.transportstatus.push("false")
                                      }
                                }
                                //Broker name validation
                                for(let c=0;c<this.supp_bussiness_partner_broker.length;c++)

                                {
                                  if(this.supp_bussiness_partner_broker.at(c).get("ven_code_name").value == null || this.supp_bussiness_partner_broker.at(c).get("ven_code_name").value == "" || this.supp_bussiness_partner_broker.at(c).get("ven_code_name").value == "0")
                                  {
                                    alert("Please Enter Broker Name In Broker Details Tab!!");
                                    this.status=true;
                                    this.brokerstatus.push("false")
                                  }
                                }
                                let gststatus:boolean=true;
                                /*if( this.supp_bussiness_partner_statutory.get('registered').value == true )
                                {
                                   
                                    if(this.supp_bussiness_partner_statutory.get("gst_no").value.length!='15')
                                   {
                                     alert("Please Enter Valid GST No In statutory Details Tab!!");
                                    // gststatus=false;
                                      this.status=true;
                                   }
                                  
                               }*/

                               if( this.supp_bussiness_partner_statutory.get('pan_no').value == "" || this.supp_bussiness_partner_statutory.get('pan_no').value == null )
                               {
                                 alert("Please Enter PAN no. In Statutory Details Tab!!!");
                                this.status=true;
                               }
                               else if(this.supp_bussiness_partner_statutory.get("pan_no").value.length!='10')
                               {
                                 alert("Please Enter Valid PAN No In statutory Details Tab!!");
                                 // this.supp_bussiness_partner_statutory.patchValue({pan_no:''}); //for not blank pan no
                                 this.status=true;
                               }
                               else if( this.supp_bussiness_partner_statutory.get('registered').value == true && (this.supp_bussiness_partner_statutory.get('gst_no').value == "" || this.supp_bussiness_partner_statutory.get('gst_no').value == null ))
                               {
                                 alert("Please Enter GST no. In Statutory Details Tab as Party is Check Registered !!!");
                                 this.status=true;
                               }
                               else if( this.supp_bussiness_partner_statutory.get('registered').value == true  && this.supp_bussiness_partner_statutory.get("gst_no").value.length!='15')
                               {
                                 alert("Please Enter Valid GST No In Statutory Details Tab!!");
                                 this.status=true;
                               }
                               else if(this.supp_bussiness_partner_statutory.get('registered').value == true  && this.GstPanCheck == false)
                               {
                                 alert("PAN No. is not includes in GSTIN!! Please Enter Valid GST No In statutory Details Tab!!!!");
                                 this.status=true;
                               }
                               else if( this.supp_bussiness_partner_statutory.get('registered').value == true && (this.supp_bussiness_partner_statutory.get('supplier_type').value == "" || this.supp_bussiness_partner_statutory.get('supplier_type').value == null || this.supp_bussiness_partner_statutory.get('supplier_type').value =="NA"))
                                {
                                  alert("Please Enter Supplier Type In Statutory Details Tab as Party is Check Register !!!");
                                  this.status=true;
                                }
                               else if(this.transportstatus.includes("false") || this.brokerstatus.includes("false"))
                                {
                                  this.status=true;
                                }
                                else
                                {
                                 
                                  this.userForm.patchValue({business_unit:UnitA.toString()});
                                  const InputData = this.userForm.getRawValue(); 
                                  console.log("input: "+JSON.stringify(InputData));
                                  const frmData = new FormData();
                                  console.log(" length "+this.myFiles.length);
                                  for (let i = 0; i < this.myFiles.length; i++) {  
                                   
                                    frmData.append("files", this.myFiles[i]);   
                                    console.log();
                                   if (i == 0) {  
                                    console.log(i+",files: "+this.myFiles[i])
                                   }  
                                 }  
                                 frmData.append("Input", JSON.stringify(InputData));
                                  
                                 
                             
                                  console.log("Form data: "+frmData);


                                  this.userForm.patchValue({business_unit:UnitA.toString()});
                                      //this.Service.createSupplierBPartner(this.userForm.getRawValue()).subscribe( data => 
              //changeson10may-2022                     //   this.Service.createSupplierBPartner(this.userForm.getRawValue()).subscribe( data => 
                                         this.Service.createSupplierBPartner(frmData).subscribe( data =>
                                      //this.Service.createSupplierBPartner(this.userForm.getRawValue()).subscribe( data => 
                                        {
                        
                        
                                          // this.DropDownListService.supp_bro_updation(data.bp_Id)
                                          // .subscribe(dataewe =>
                                          //   {
                                          //    // console.log("Unload advice1111: "+JSON.stringify(purid+reftype))
                                          //   }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
                                          //   this.ngOnInit()});
                                          console.log("supplier Master data"+JSON.stringify(data));
                                          alert("New Supplier Master created successfully.");
                                          this.userForm.patchValue({bp_code:this.seq_no});
                                          //window.location.reload();
                                          this.userForm.reset();
                                          this.userForm.patchValue({group_type: "0", trans_currency:"0", business_unit:"0"});
                                          this.status = true;
                                          //refresh List;
                                          this.ngOnInit();
                                          this.isHidden=false;
                                          this.DropDownListService.stateListByCountry(this.Country).subscribe(data=>{this.states  = data;}); 
                                          this.DropDownListService.stateListByCountry(this.Country1).subscribe(data=>{this.statesBills  = data;});             
                                          this.trans_currency1="INR";
                                          this.Country="INDIA";
                                          this.Country1="INDIA";
                                          this.group_type1="0"; 
                                          this.check4(false);
                                          this.group_type1="0"; 
                                          this.supp_bussiness_partner_broker.at(0).patchValue({sl_no:  this._broker_sl_no});
                                          this.supp_bussiness_partner_delv_from.at(0).patchValue({sl_no:this._dlv_from_sl_no});
                                        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("New Supplier Master creation Unsuccessfull...");
                                        //this.ngOnInit()
                                      }); 
                                      
                                }



         



            }






       
        }
        else
        {alert(this.err_message)}  
      }
    }

  }
 
  selectcredit(event:String){
    

    this.DropDownListService.getSuppSequenceId("prefix="+"SUP"+"&company="+this.company_name+"&wtype="+event).subscribe(data=>{this.seq_no = data.sequenceid;});

    //  if(event=="Supplier For Services")
    //  {
    //    this.isChecked14=true;
       
    //  }
    // else{this.isChecked14=false;}

  }

  getIndexOfMatTab(event)
  {
    console.log("mat-tab index: "+event.index);
    //this.id1 = this.listTransBussinessPartner[this.listTransBussinessPartner.length-1].id;
    if(event.index == 0)
    {
      console.log("I am in tab index: "+event.index);
    }
    if(event.index == 5)
    {
          // console.log("I am in tab index: "+event.index);
          // let number=2047;
          // this.Service.getSupplierBrokerList(number).subscribe(data=>{
          //   //alert();
          //   console.log("got HArry:"+JSON.stringify(data)+","+data.length);
          //   //this.supp_bussiness_partner_broker  = data;
          //   while (this.supp_bussiness_partner_broker.length ) {
          //     this.supp_bussiness_partner_broker.removeAt(0);
          // }
          //   for(let i=0;i<data.length;i++)
          //   {
          //     this.add2();
          //   // console.log("line: "+i);
          //   }
          // this.supp_bussiness_partner_broker.patchValue(data);
        
          // });
    } 
}

onDelete(id:any,supp_id)
{
  this.status = false;
  if(confirm("Are you sure to delete this Supplier ?"))
  { 
    this.userForm.patchValue({username: localStorage.getItem("username")});

    this.DropDownListService.checkSupplierMasterUsage(supp_id).subscribe(checksupplier=> 
      {
      // alert(checksupplier.status)
       if(checksupplier.status=='No')
       {
        this.Service.deleteSuppBussinessPartner(this.userForm.getRawValue(),id).subscribe(data=> 
          {
            console.log("Supplier :"+data.bp_code);
            if(data.bp_code=='' || data.bp_code==null)
            {
              alert("Opps!!! Can't delete this Supplier !!!");
            }else{
              alert("Supplier Deleted successfully.");
            }
            this.status = true;
            this.ngOnInit()
          }); 
       }
      else{
       alert("This Supplier is Already Used,Can not be Deleted!! ");
      }
     }); 

  }  
  this.status = true;
}

chkSupplierCodeStatus(event: any)
{
    if(event.target.value!=null && event.target.value!='')
      {
        this.DropDownListService.chkSuppBpCodeStatus(event.target.value).subscribe(data=>
        {
          if(data.status=='EXIST')
          {
            alert("Already Exist Code : "+event.target.value +" . Please Change !!!" );
            this._SupplierCode.nativeElement.focus(); 
            this.userForm.patchValue({bp_code:null});  
            this.suppliermastersave=false;
          } else {
            this.suppliermastersave=true;
          }
        });
      }
}

  onUpdate(id:any,bp_Id:string,action)
   {
    this.suppliermastersave= true;
    this.isTypeChecked = false;
    this.locksuppliername=true;
    this.registeredcheck=false;
    this.isRegister=true;
     this.isHidden = true;
     this.statutoryinsert=false;
    this.statutoryupdate=true;
     this.selectedCity = [];
     this.selectedDist = [];
     this.selectedCityBill = [];
     this.selectedDistBill = [];

     if(action == 'view')
     {this.suppliermastersave= false;}
     else
     {this.suppliermastersave= true; }
       this.Service.retriveSupplierBPartner(id).subscribe(data=>
      {


       //console.log("hello :: " + JSON.stringify(data));
          this.isChecked5 = data["block_active"];
          //CHENGES ON 19 APRIL 2022
         // this.check4("broker_status");
        // this.check4(data["broker_status"]);
          this.UnitA=data.business_unit.split(',');
          this.userForm.patchValue({unita:this.UnitA});
          this.selectssiapp(data["ssi_app"]);   
          this.userForm.patchValue(data);  
          this.userForm.patchValue({broker_status:true});
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
     // this.test1 = this.userForm.get("business_unit").value as FormControl;
      this.Service.getSuppBPAddr(bp_Id).subscribe(data=>
        {
          
          this.selectedCity = data["city_code"];
          this.selectedDist = data["dist_code"];
          this.selectedPostOffice = data["postid"];
          this.DropDownListService.stateListByCountry(data["country"]).subscribe(data=>{this.states  = data;});
          this.DropDownListService.getDistrictThruState(data["state_code"]).subscribe(data=>{this.districts  = data;});
          this.DropDownListService.getCityListThruDistrict(data["dist_code"]).subscribe(data=>{this.cities  = data;});
          this.DropDownListService.findPostOffice(data["pincode"],data["dist_code"]).subscribe(data=>
            {
              this.PostOfficeList = data;
              this.status = true;
            });
          // this.DropDownListService.getPostOfficeThruDist(data.postid).subscribe(data=>
          //   {
          //     this.PostOfficeList  = data;
          //     this.status = true;
          //   });
          // this.onchangeCountry(data.country)
          // this.onchangeState(data.state);
          // this.onchangeDistrict(data.district);
          this.supp_bussiness_partner_address.patchValue(data);}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});
   
        this.Service.getSuppContById(bp_Id).subscribe(data=>
         {
           
           while (this.supp_bussiness_partner_addr_dtls.length > 0 && data.length > 0) 
           { this.supp_bussiness_partner_addr_dtls.removeAt(0);}
           for(let data1 of data)
           { 
             this.add3();
          }
           
           this.supp_bussiness_partner_addr_dtls.patchValue(data);
         
           //this.transportownlist= this.supp_bussiness_partner_addr_dtls.at(0).get("transporters").value;


        

          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("No Contact Details Have been attacted in first place....");
          });







        this.Service.getSuppBPBillAddr(bp_Id).subscribe(data=>
         {
          this.selectedCityBill = data["city_code"];
          this.selectedDistBill = data["dist_code"];
          this.selectedPostOfficeBill = data["postid"];
          this.DropDownListService.stateListByCountry(data["country"]).subscribe(data=>{this.statesBills = data;});
          this.DropDownListService.getDistrictThruState(data["state_code"]).subscribe(data=>{this.districtsBills = data;});
          this.DropDownListService.getCityListThruDistrict(data["dist_code"]).subscribe(data=>{this.citiesBills = data;});
          if( data["pincode"]!='')
          {
            this.DropDownListService.findPostOffice(data["pincode"],data["dist_code"]).subscribe(data=>
              {
                this.PostOfficeListBill = data;
                this.status = true;
              });
          }
         
          //  this.onchangeCountryBill(data.country)
          //  this.onchangeStateBill(data.state);
          //  this.onchangeDistrictBill(data.district);
           this.supp_bussiness_partner_bill_addr.patchValue(data);}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
           this.ngOnInit()});
                
        this.Service.getSuppBPBillAddrDtls(bp_Id).subscribe(data=>
         {
          while (this.supp_bussiness_partner_bill_addr_dtls.length > 0 && data.length > 0) 
              { this.supp_bussiness_partner_bill_addr_dtls.removeAt(0);}
              for(let data1 of data)
              { this.add4();}
              this.supp_bussiness_partner_bill_addr_dtls.patchValue(data);}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
              this.ngOnInit()});

        this.Service.getSuppContactNameList(bp_Id).subscribe(data=>
          {
            console.log("check here: "+JSON.stringify(data));

     


            this._dlv_from_sl_no =0;
            while (this.supp_bussiness_partner_delv_from.length > 0 && data.length > 0) 
            { this.supp_bussiness_partner_delv_from.removeAt(0);}
            for(let data1 of data)
            { this.add1();}
           if(data[0].transport_own == "YES")
           {
            this.showtransporterown=true;
           }
           else
           {
            this.showtransporterown=false;
           }
           

             this.supp_bussiness_partner_delv_from.patchValue(data);
             //alert("hi" +this.supp_bussiness_partner_delv_from.at(0).get("transporters").value);
             this.DropDownListService.transporterownlist(this.supp_bussiness_partner_delv_from.at(0).get("transporters").value)
             .subscribe(data123=>
              {
               // alert(JSON.stringify(data123))
                

                let k =0;
                          console.log(JSON.stringify(data123))
              this.addtransporterlistown()
              while (this.suppliertransporterList.length) 
              this.suppliertransporterList.removeAt(0);
                  for(let data12 of data123)
                  {
                  
                    this.addtransporterlistown();
                    this.suppliertransporterList.at(k).patchValue({transporterid:data12["bp_Id"],transportercode:data12["bp_code"],transportername:data12["bp_name"]})
                       k=k+1;
                    
                  }
              });



            // this.selectedcitydynamic = data["city_name"];
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
             this.ngOnInit()});

         this.Service.getSuppBPAcc(bp_Id).subscribe(data=>
        {this.supp_bussiness_partner_accont.patchValue(data);}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});

        this.Service.getSupplierStatDtls(bp_Id).subscribe(data=>
        {
          this.supp_bussiness_partner_statutory.patchValue(data);
          console.log("register:"+data["registered"])
          if(data["registered"] == true)
          {
            this.isregistered = true;
            this.registeredcheck=true;
            if(data["gst_no"].includes(data["pan_no"]))
                {
                  this.GstPanCheck=true;
                }
            else
                {
                  this.GstPanCheck=false;
                }
          }
          else
          {this.isregistered = false;
            this.registeredcheck=false;}
        
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});

        this.Service.getSuppBPBroker(bp_Id).subscribe(data=>
        {
          this.isChecked4=true;
          let k = 0;
          this.add2()
          this._broker_sl_no = 0;
          while (this.supp_bussiness_partner_broker.length) 
          this.supp_bussiness_partner_broker.removeAt(0);
          for(let data1 of data)
          {
            this.add2();
            this.onChangeBasis(data1.basis, k);
            this.supp_bussiness_partner_broker.at(k).patchValue(data1);
            k = k + 1;
          }
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});

        this.Service.getSuppBPDoc(bp_Id).subscribe(data=>
          {
            while (this.supp_bussiness_partner_docs.length > 0 && data.length > 0)
            {this.supp_bussiness_partner_docs.removeAt(0);}
            for(let data1 of data)
            { this.add5();}
            this.supp_bussiness_partner_docs.patchValue(data);}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});  
            
         console.log("hello over here "+this.userForm.get("sub_group_type").value)
   }

   getPanNoValid()
   {
     
     let pan_length = this.supp_bussiness_partner_statutory.get("pan_no").value;
     console.log("Length of Pan: "+pan_length.length)
     if(pan_length.length!='10')
     {
      this.errormsg="Please Enter Valid PAN No!!";
    //  alert("Please Enter Valid PAN No!!");
      this.status=true;
     // this.supp_bussiness_partner_statutory.patchValue({pan_no:''}); //for not blank pan no
     }

     else
     {
      this.DropDownListService.checkValidPANNo(pan_length).subscribe(data=>
        {
          //console.log("status::"+data.status)
          if(data.status=='EXIST')
          {
            alert("PAN No Already Exists,Please Check..");
          }
          else{
          this.errormsg="";
          this.status=true;
        }
      });
    }

   }

   GstPanCheck:boolean=false;
   getGstNoValid()
   {
     
     let gst_length = this.supp_bussiness_partner_statutory.get("gst_no").value;
     this.errormsggstn="";
     //console.log("Check :: "+gst_length.substring(2,12));
     if( this.supp_bussiness_partner_statutory.get('registered').value == true )
     {
      if(gst_length.length!='15')
      {
        
        this.errormsggstn="Please Enter Valid GST No!!";
        //alert("Please Enter Valid GST No!!");
        //this.supp_bussiness_partner_statutory.patchValue({gst_no:''});
        
        this.status=true;
      }
      else
     {
      this.DropDownListService.checkValidGstNo(gst_length).subscribe(data=>
        {
          //console.log("status::"+data.status)
          if(data.status=='EXIST')
          {
            alert("GST No Already Exists,Please Check..");
          }
          else{
            if(gst_length.includes(this.supp_bussiness_partner_statutory.get("pan_no").value))
            {
              this.errormsggstn="";
              this.GstPanCheck=true;
            }
            else
            {
              this.errormsggstn="PAN No. is not includes in GSTIN!! Please Enter Valid GST No!!";
              this.GstPanCheck=false;
            }
          }
          this.status=true;
        });
        
      
        
     }
    }
    
   }


   removeowntransporterlist(index)
   {
     this.suppliertransporterList.removeAt(index);
     console.log("finaltrans :: "+this.suppliertransporterList.length);
      if(this.suppliertransporterList.length>0)
      {
        let finaltrans:string;

          for(let i=0;i<this.suppliertransporterList.length;i++)
          {
            finaltrans +=this.suppliertransporterList.at(i).get("transporterid").value+","
          }

//let output:string=finaltrans.substring(finaltrans.length-1, finaltrans.length);
let output:string=finaltrans.substring(9,finaltrans.length);
console.log("finaltrans :: "+output);
console.log("finaltrans2 :: "+output.slice(0, -1));
          this.supp_bussiness_partner_delv_from.at(0).patchValue({transporters:output.slice(0, -1)})
        
      }
      else
      {
              alert("You Have deleted All transported and the Transporter Own Is set To Nothing!!!");
              this.supp_bussiness_partner_delv_from.at(0).patchValue({transport_own:"0",transporters:""})
              this.showtransporterown=false;
              
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
      
       this.supp_bussiness_partner_docs.removeAt(index);
       this.myFiles.splice(index,1);
     }
     else
     {
       alert("can't delete all rows");
       this.supp_bussiness_partner_docs.reset();

     }
   }
   accountposting(id:any,action)
   {
    if(action == 'Posting')
    {
      this.DropDownListService.accountpostingSupplierBPartner(id).subscribe(data=>
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
    if(action == 'Undo')
    {
      alert
      if(confirm("Are you sure to Posting Undo Of this Supplier ?"))
      {
        if(confirm("First Delete This Supplier Ledger From Tally!!!"))
        {
          this.DropDownListService.accountpostingUndoSupplierBPartner(id).subscribe(data=>
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

search(event)
 {
   //let supp_name=this.userForm1.get("supplier_name1").value;
   let supp_name=this.supplierId;
   let supp_group=this.userForm1.get("supp_group").value;
   let supp_type=this.userForm1.get("supp_type").value;
   let finyear =localStorage.getItem("financial_year");
   this.company_name = localStorage.getItem("company_name");
 
   this.status=false;
   this.DropDownListService.searchSupplierMasterData("supp_name="+supp_name+"&supp_group="+supp_group+"&supp_type="+supp_type+"&finyear="+finyear+"&company_name="+this.company_name).subscribe(data=>
     {
       console.log("here data comses " + JSON.stringify(data))
       this.listSupp_bussiness_partner =data;
       this.status=true;

     }, (error) => {this.status=true;
       alert("Supplier Master Not Found !!!")
       this.listSupp_bussiness_partner=[];
     })
 }

 

}
