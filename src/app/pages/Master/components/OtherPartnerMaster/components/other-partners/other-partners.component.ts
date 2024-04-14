import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { otherPartner } from '../../../../../../Models/OtherPartnerMaster/otherPartner';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

  @Component({
    selector: 'app-other-partners',
    templateUrl: './other-partners.component.html',
    styleUrls: ['./other-partners.component.scss']
  })

  export class OtherPartnersComponent implements OnInit 
  {
    submitted = false;
    public userForm:FormGroup;
    model:otherPartner=new otherPartner();
    listOtherPartner: otherPartner[];
    currs:{};
    countries:any = [];
    states:any = [];
    districts:any = [];
    cities:any = [];
    statesBills:any = [];
    districtsBills:any = [];
    citiesBills:any = [];
    natures:{};
    tdsnatures:{};
    subGroupNames:{};
    ledgerNames:{};
    citiNames:{};
    brokerNames:{};
    brokerCodess:{};
    payTermNames:{};
    isRegisteredChecked=false;
    isExciseApleChecked=false;
    isBrokerDtlsChecked=false;
    isBlockChecked=false;
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
    status = false;
    otherpartnermastersave:boolean=true;
    broker_sl_no = 1;

    constructor(public fb:FormBuilder, private Service: Master,
      private DropDownListService: DropdownServiceService)  
    { 
      this.userForm=fb.group({  
        bp_code:[''],
        bp_type:[''],
        bp_name:[''],
        alt_name:[''],
        bp_active:[''],
        group_type:[''],
        sub_group_type:[''],
        area:[''],
        trans_currency:[''],
        block_active:[''],
        reason:[''],
        copy_bp_addr:[''],
        party_nature:[''],
        def_tds_nature:[''],
        doc_name:[''],
        company_id: [''],
        fin_year: [''],
        username: [''],

        op_bussiness_partner_address: this.fb.group({
          contact_person:'',
          designation:'',
          phone:'',
          mobile:'',
          fax:'',
          email:'',
          website:'',
          country:'',
          state:'',
          district:'',
          city:'',
          pincode:'',
          add1:'',
          add2:'',
          add3:''}),

        op_bussiness_partner_bill_addr: this.fb.group({
          contact_person:'',
          designation:'',
          phone:'',
          mobile:'',
          fax:'',
          email:'',
          country:'',
          state:'',
          district:'',
          city:'',
          pincode:'',
          add1:'',
          add2:'',
          add3:''}),

        op_bussiness_partner_delv_from: this.fb.array([this.fb.group({
          sl_no:'',
          contact_person:'',
          designation:'',
          address:'',
          city:'',
          pincode:'',
          phone:'',
          mobile:'',
          fax:'',
          email:''})]),

          op_bussiness_partner_accont: this.fb.group({
            pay_cont_acc:'',
            adv_pay_acc:'',
            pay_term:'',
            discount:'',
            credit_lim:'',
            credit_days:'',
            cash_lim_status:'',
            cash_limit:''}),

          op_bussiness_partner_statutory: this.fb.group({
            registered:'',
            pan_no:'',
            vat_no:'',
            tin_no:'',
            cst_no:'',
            tan_no:'',
            service_tax:'',
            excise_app:'',
            ecc_no:'',
            ce_reg_no:'',
            ce_range:'',
            ce_dev:'',
            ce_comm:''}),

          op_bussiness_partner_broker: this.fb.array([this.fb.group({
            sl_no: this.broker_sl_no,
            broker_name:'',
            broker_code:''})]) 
      });
    }
  
    get bp_type(){ return this.userForm.get("bp_type") as FormControl }
    get bp_name(){ return this.userForm.get("bp_name") as FormControl }
    get alt_name(){ return this.userForm.get("alt_name") as FormControl }
    get bp_active(){ return this.userForm.get("bp_active") as FormControl }
    get group_type(){ return this.userForm.get("group_type") as FormControl }
    get area(){ return this.userForm.get("area") as FormControl }
    get trans_currency(){ return this.userForm.get("trans_currency") as FormControl }
    get block_active(){ return this.userForm.get("block_active") as FormControl }
    get reason(){ return this.userForm.get("reason") as FormControl }
    get copy_bp_addr(){ return this.userForm.get("copy_bp_addr") as FormControl }
    get party_nature(){ return this.userForm.get("party_nature") as FormControl }
    get def_tds_nature(){ return this.userForm.get("def_tds_nature") as FormControl }
    get doc_name(){ return this.userForm.get("doc_name") as FormControl }
    get op_bussiness_partner_address(){return this.userForm.get('op_bussiness_partner_address') as FormControl;} 
    get op_bussiness_partner_bill_addr(){return this.userForm.get('op_bussiness_partner_bill_addr') as FormControl;}
    get op_bussiness_partner_delv_from(){return this.userForm.get('op_bussiness_partner_delv_from') as FormArray;}
    get op_bussiness_partner_accont(){return this.userForm.get('op_bussiness_partner_accont') as FormControl;}
    get op_bussiness_partner_statutory(){return this.userForm.get('op_bussiness_partner_statutory') as FormControl;}
    get op_bussiness_partner_broker(){return this.userForm.get('op_bussiness_partner_broker') as FormArray;}
  
    ngOnInit() 
    {

      //For User Role
      let user_role=localStorage.getItem("user_role")+"tuhinabcd"+"other_partner_master";
      this.DropDownListService.getRoleItemMaster(user_role).subscribe(data=>{
      let accessdata=JSON.stringify(data);
      this.otherpartnermastersave=false;
      if(accessdata.includes('other_partner_master.save'))
        {
        this.otherpartnermastersave = true;
        }
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});

      this.DropDownListService.countryList().subscribe(data=>{this.countries  = data;});
      this.Service.getOtherPartnerBussinessPartner().subscribe(data=>{this.listOtherPartner  = data;});
      this.DropDownListService.controlAccList().subscribe(data=>{this.subGroupNames = data;});
      this.DropDownListService.citiNamesList().subscribe(data=>{this.citiNames = data;});
      this.DropDownListService.brokerNamesList().subscribe(data=>{this.brokerNames = data;});
      this.DropDownListService.brokerCodeList().subscribe(data=>{this.brokerCodess = data;});
      this.DropDownListService.payTermList().subscribe(data=>{this.payTermNames = data;});
      this.currs=["All","Rupees"];
      this.natures=["Company","Firm","Individual"];
      this.tdsnatures=["Professional tax"];
      this.status = true;
    }

    showList(s:string)
    {
      if(this.otherpartnermastersave == true )//true exist  false not exist 
      {
        if(s=="add")
        {this.isHidden=true;}
      }
      if(s=="list")
      {this.isHidden=false;}
    }
  
    onChangeBlockStatus(event)
    {
      if(event.checked == true)
      this.isBlockChecked = true;
      else
      this.isBlockChecked = false;
    }  
  
    onChangeBrokerDtlsStatus(event) 
    {
      if(event.checked == true)
      this.isBrokerDtlsChecked = true;
      else
      this.isBrokerDtlsChecked = false;
    }  
  
    onChangeExciseApleStatus(event)
    {
      if(event.checked == true)
      this.isExciseApleChecked = true;
      else
      this.isExciseApleChecked = false;
    }  
  
    onChangeRegisteredStatus(event)
    {  
      if(event.checked == true)
      this.isRegisteredChecked = true;
      else
      this.isRegisteredChecked = false;
    }
  
    onChangeCopyBpAddrStatus(event)
    {
      if(event.checked == true)
      {
        this.scontact_person =this.op_bussiness_partner_address.get('contact_person').value as FormControl;
        this.sdesignation=this.op_bussiness_partner_address.get('designation').value as FormControl;
        this.sphone=this.op_bussiness_partner_address.get('phone').value as FormControl;
        this.smobile=this.op_bussiness_partner_address.get('mobile').value as FormControl;
        this.sfax=this.op_bussiness_partner_address.get('fax').value as FormControl;
        this.semail=this.op_bussiness_partner_address.get('email').value as FormControl;
        this.swebsite=this.op_bussiness_partner_address.get('website').value as FormControl; 
        this.scountry=this.op_bussiness_partner_address.get('country').value as FormControl;
        this.onChangeCountryBill(this.scountry);
        this.sstate =this.op_bussiness_partner_address.get('state').value as FormControl;
        this.onChangeStateBill(this.sstate);
        this.sdistrict=this.op_bussiness_partner_address.get('district').value as FormControl; 
        this.onChangeDistrictBill(this.sdistrict);
        this.scity=this.op_bussiness_partner_address.get('city').value as FormControl;
        this.spincode=this.op_bussiness_partner_address.get('pincode').value as FormControl;  
        this.sadd1=this.op_bussiness_partner_address.get('add1').value as FormControl;
        this.sadd2=this.op_bussiness_partner_address.get('add2').value as FormControl;  
        this.sadd3=this.op_bussiness_partner_address.get('add3').value as FormControl;
        this.op_bussiness_partner_bill_addr.patchValue({contact_person: this.scontact_person, designation: this.sdesignation,
          phone: this.sphone, mobile: this.smobile, fax: this.sfax, email: this.semail, country: this.scountry,
          state: this.sstate, district:  this.sdistrict, city: this.scity, pincode:this.spincode,  
          add1: this.sadd1, add2: this.sadd2, add3: this.sadd3});
      }
      else
      {
        this.scontact_person="", this.sdesignation="", this.sphone="", this.smobile="",
        this.sfax="", this.semail="", this.swebsite="", this.scountry="", this.sstate="",
        this.sdistrict="", this.scity="", this.spincode="", this.sadd1="", this.sadd2="",this.sadd3="";
        this.onChangeCountryBill('0');
        this.op_bussiness_partner_bill_addr.patchValue({contact_person: this.scontact_person, designation: this.sdesignation,
          phone: this.sphone, mobile: this.smobile, fax: this.sfax, email: this.semail, country: this.scountry,
          state: this.sstate, district:  this.sdistrict, city: this.scity, pincode:this.spincode,  
          add1: this.sadd1, add2: this.sadd2, add3: this.sadd3});
      }
    }
  
    add() 
    {
      this.op_bussiness_partner_delv_from.push(this.fb.group({
        sl_no:'',
        contact_person:'',
        designation:'',
        address:'',
        city:'',
        pincode:'',
        phone:'',
        mobile:'',
        fax:'',
        email:'' }));
    }
    
    delete(index) 
    {
      if(index)
      {this.op_bussiness_partner_delv_from.removeAt(index);}
      else
      {alert("can't delete all rows");} 
    }
    
    addBroker() 
    {
      this.broker_sl_no=this.broker_sl_no+1;
      this.op_bussiness_partner_broker.push(this.fb.group({
        sl_no:this.broker_sl_no, 
        broker_name:'',
        broker_code:''  
      }));
    }
    
    deleteBroker(index) 
    {
      this.op_bussiness_partner_broker.removeAt(index);
      if(this.broker_sl_no > 1)
      { 
        this.op_bussiness_partner_broker.removeAt(index);
        this.broker_sl_no = this.broker_sl_no - 1;
      }
      else
      {
        this.broker_sl_no = 1;
        alert("can't delete all rows");
        this.op_bussiness_partner_broker.reset();
        this.op_bussiness_partner_broker.at(0).patchValue({sl_no:  this.broker_sl_no});
      } 
      
      for(let i=1; i<=this.broker_sl_no; i++)
        this.op_bussiness_partner_broker.at(i-1).patchValue({sl_no: i});  
    }
    
    onChangeCountry(country_name: String)
    {
      this.states = [], this.districts = [], this.cities = [];
      this.op_bussiness_partner_address.patchValue({state: null, district: null, city: null});
      if(country_name != '0')
      {
        this.status = false;
        this.DropDownListService.stateListByCountry(country_name).subscribe(data=>
        {
          this.states  = data;
          this.status = true;
        }); 
      }
    }

    onChangeState(state_name: String)
    {
      this.districts = [], this.cities = [];
      this.op_bussiness_partner_address.patchValue({district: null, city: null});
      if(state_name != '0')
      {
        this.status = false;
        this.DropDownListService.districtListByState(state_name).subscribe(data=>
        {
          this.districts  = data;
          this.status = true;
        });
      }
    }

    onChangeDistrict(district_name: String)
    {
      this.cities = [];
      this.op_bussiness_partner_address.patchValue({city: null});
      if(district_name != '0')
      {
        this.status = false;
        this.DropDownListService.cityListByDistrict(district_name).subscribe(data=>
        {
          this.cities  = data;
          this.status = true;
        });     
      }
    }
   
    onChangeCountryBill(country_name: String)
    {
      this.statesBills = [], this.districtsBills = [], this.citiesBills = [];
      this.op_bussiness_partner_bill_addr.patchValue({state: null, district: null, city: null});
      if(country_name != '0')
      {
        this.status = false;
        this.DropDownListService.stateListByCountry(country_name).subscribe(data=>
        {
          this.statesBills  = data;
          this.status = true;
        });  
      }
    }

    onChangeStateBill(state_name: String)
    {
      this.districtsBills = [], this.citiesBills = [];
      this.op_bussiness_partner_bill_addr.patchValue({district: null, city: null});
      if(state_name != '0')
      {
        this.status = false;
        this.DropDownListService.districtListByState(state_name).subscribe(data=>
        {
          this.districtsBills  = data;
          this.status = true;
        });
      }
    }

    onChangeDistrictBill(district_name: String)
    {
      this.citiesBills = [];
      this.op_bussiness_partner_bill_addr.patchValue({city: null});
      if(district_name != '0')
      {
        this.status = false;
        this.DropDownListService.cityListByDistrict(district_name).subscribe(data=>
        {
          this.citiesBills  = data;
          this.status = true;
        });
      }
    }

    onChangeLedger(ledger_name: String)
    {
      if(ledger_name != '0')
      {
        this.status = false;
        this.DropDownListService.ledgerListBySubGroup(ledger_name).subscribe(data=>
        {
          this.ledgerNames  = data;
          this.status = true;});
      }
    }

    send()
    {
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
        this.status = false;
        this.Service.createOtherPartnerBussinessPartner(this.userForm.value).subscribe(data => 
        {
          console.log(this.userForm.value); 
          alert("New Other Partner Master created successfully.");
          this.userForm.reset();
          //refresh List;
          this.ngOnInit();   
          //Refresh Dynemic Table
          this.broker_sl_no = 1;
          while(this.op_bussiness_partner_broker.length)
          this.op_bussiness_partner_broker.removeAt(0);
          this.addBroker();
        }); 
      } 
    }
    
  }
