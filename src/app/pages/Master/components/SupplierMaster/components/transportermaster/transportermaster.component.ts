import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { Trans_bussiness_partner } from '../../../../../../Models/SupplierModel/Trans_bussiness_partner';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { TransMasterPopUpModalComponent } from '../trans-master-pop-up-modal/trans-master-pop-up-modal.component';
import { forkJoin } from 'rxjs';
import { data } from 'jquery';

@Component({
  selector: 'app-transportermaster',
  templateUrl: './transportermaster.component.html',
  styleUrls: ['./transportermaster.component.scss']
})
export class TransportermasterComponent implements OnInit {
  selected = '';
  submitted = false;
  public userForm:FormGroup;
  // public searchText:string;
  model:Trans_bussiness_partner=new Trans_bussiness_partner();
  listTransBussinessPartner: Trans_bussiness_partner[];
  countries:{};
  states:{};
  districts:{};
  Constitution="0";
  Ssi_App="0";
  basedOnList:any = [];
  _basis:any;
  cities:{};
  payTerms:{};
  statesBills:{};
  districtsBills:{};
  designationlists:{};
  citiesBills:{};
  company_name:any;
  subGroupNames:{};
  ledgerNames:{};
  ledgerName:{};
  citiNames:{};
  brokerNames:{};
  brokerCodess:{};
  payTermNames:{};
  ledgerbankacc:{};
  userParentGroups:{};
  basiss:{};
  tdsList:{};
  isChecked=false;
  isChecked1=false;
  isChecked2=false;
  isChecked3=false;
  isChecked4=false;
  isChecked5=false;
  suppGroups:{};
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
  advancePayment = false;
  gbrokername:any;
  id1:any;
  _broker_sl_no =1;
  Country="INDIA";
  vehname:any;
  vehicleTypes:any = [];
  vehicleNames:any = [];
  seq_no: string;
  bp_type1: any;
  trans_currency1="INR";
  activeIsChecked:any;
  isValid:boolean=false;
  group_type1="0"
  isAcctype=false;
  isRegister=false;
  transportmastersave:boolean=true;
  transportmasterupdate:boolean=true;
  transportmasterdelete:boolean=true;
  transportmasterview:boolean=true;
  action:any;
  transportstatus:any=[];
  gststatus:any=[];
  user_name:any;
  usernamelock:boolean=false;
  user_role:any;
  tdslist:any=[];
  tdsledgerNames:any=[];
  myFiles:any = [];
  view_image:any;
  imageURL: string;
  file_name:string;
  @ViewChild('iCodeInput') _TransCode: ElementRef;
  selectedvehicle:any = [];

  constructor(
    public fb:FormBuilder,
    private Service: Master,
    public dialog: MatDialog,
    private DropDownListService: DropdownServiceService) 
    { 
      this.userForm=fb.group({
      id: [''],
      bp_Id: [''],
      bp_code:[''],
      bp_type:[''],
      bp_name:[''],
      alt_name:[''],
      bp_active:[''],
      group_type:[''],
      sub_group_type:[''],
      trans_currency:[''],
      block_active:[''],
     // reason:[''],
      pak_mat_replc:[''],
      broker_status:[''],
      company_id: [''],
      fin_year: [''],
      username:[''],
      constitution: [''],
      ssi_app: [''],
      ssi_regno:[''] ,
     
      trans_bussiness_partner_doc: this.fb.array([this.fb.group({
        doc_name : '',  
        doc_pdf:'',
         })]),

         trans_bussiness_partner_doc_list: this.fb.array([this.fb.group({
          doc_name:'',
         doc_pdf:'',
         
         })]),

      trans_bussiness_partner_address: this.fb.group({
       // id:'',
        website:'',
        country:'',
        state_code:'',
        post_office:'',
        dist_code:'',
        city_code:'',
        pincode:'',
        add1:'',
        add2:'',
        add3:''
      }),

      trans_bussiness_partner_address_dtls: this.fb.array([this.fb.group({
        //id:'',
        contact_person:'',
        designation:'',
        phone:'',
        mobile:'',
        fax:'',
        email:''
        })]),

        trans_bussiness_partner_vehicle_dtls: this.fb.array([this.fb.group({      
            vehicle_type:'',
            vehicle_name:'',  
          })]),
   
        trans_bussiness_partner_accont: this.fb.group({
          pay_cont_acc:'',
          party_bank_acc :'',
          pay_term :'',   
          credit_lim :'',    
          cash_lim_status :'',     
          cash_limit :'',
          tcs_applicable:'',
          tcs_rate:'',
          tcs_date:'',
          adv_pay:'', 
          adv_pay_mode:'',
          mode_of_adv_pay:'',
          max_adv_vehi:'',
          acc_holder_name:'',
          acc_no:'',
          bank_name:'',
          branch:'',
          ifsc_code:'',
          mobile:'',
          tds_account:'',
          party_nature:'',
          default_tds_nature:'', 
          tds_rate:'',
          mode_of_pay:'',
          iban: '', 
          bic_swift_code: '',  
          acc_type: '',
          acc_remarks: '',
        }),
        
        trans_bussiness_partner_statutory : this.fb.group({
         // id:'',
          registered:'',
          pan_no:'',
          gst_no:'',
          cin_no:'',
          tan_no:'',
          
        }),
        trans_bussiness_partner_broker: this.fb.array([this.fb.group({
            sl_no : this._broker_sl_no,
            ven_code_name:'',
            basis:'',
            based_on:'',
            rate:'',
            effective_date:'',
            remarks:'',
            brokerage_acc:'',
            tds_rate:'',
            tds_acc:'',
        })]),
      
        trans_bussiness_partner_tds : this.fb.group({
          tds_id: '',
          tds_section: '',
          tds_rate: '',
          tds_acc: ''
         })
     });

     this.trans_bussiness_partner_accont.get('cash_lim_status').disable();
     this.trans_bussiness_partner_accont.get('cash_limit').disable();
  }
  get bp_Id(){ return this.userForm.get("bp_Id") as FormControl }
  get id(){ return this.userForm.get("id") as FormControl }
  get bp_code(){ return this.userForm.get("bp_code") as FormControl }
  get bp_type(){ return this.userForm.get("bp_type") as FormControl } 
  get bp_name(){ return this.userForm.get("bp_name") as FormControl }
  get broker_status(){ return this.userForm.get("broker_status") as FormControl }
  get alt_name(){ return this.userForm.get("alt_name") as FormControl }
  get bp_active(){ return this.userForm.get("bp_active") as FormControl }
  get group_type(){ return this.userForm.get("group_type") as FormControl }
  get trans_currency(){ return this.userForm.get("trans_currency") as FormControl }
  get block_active(){ return this.userForm.get("block_active") as FormControl }
  get  sub_group_type(){ return this.userForm.get(" sub_group_type") as FormControl }
  get pak_mat_replc(){ return this.userForm.get("pak_mat_replc") as FormControl }
  get party_nature(){ return this.userForm.get("party_nature") as FormControl }
  get def_tds_nature(){ return this.userForm.get("def_tds_nature") as FormControl }
  get doc_name(){ return this.userForm.get("doc_name") as FormControl }
  get constitution(){return this.userForm.get("constitution") as FormControl}
  get ssi_app(){return this.userForm.get("ssi_app") as FormControl}
  get ssi_regno(){return this.userForm.get("ssi_regno") as FormControl}
  get company_id(){return this.userForm.get("company_id") as FormControl}
  get fin_year(){return this.userForm.get("fin_year") as FormControl}
  get username(){return this.userForm.get("username") as FormControl}

  get trans_bussiness_partner_address() {
    return this.userForm.get('trans_bussiness_partner_address') as FormControl;
  }
  get trans_bussiness_partner_accont() {
    return this.userForm.get('trans_bussiness_partner_accont') as FormControl;
  }

  get trans_bussiness_partner_statutory() {
    return this.userForm.get('trans_bussiness_partner_statutory') as FormControl;
  }

  get trans_bussiness_partner_broker() {
    return this.userForm.get('trans_bussiness_partner_broker') as FormArray;
  }

  get trans_bussiness_partner_address_dtls() {
    return this.userForm.get('trans_bussiness_partner_address_dtls') as FormArray;
  }

  get trans_bussiness_partner_vehicle_dtls() {
    return this.userForm.get('trans_bussiness_partner_vehicle_dtls') as FormArray;
  }
  
  get trans_bussiness_partner_doc() {
    return this.userForm.get('trans_bussiness_partner_doc') as FormArray;
  }
  get trans_bussiness_partner_doc_list()
  {return this.userForm.get('trans_bussiness_partner_doc_list') as FormArray;}

  get trans_bussiness_partner_tds() {
    return this.userForm.get('trans_bussiness_partner_tds') as FormControl;
  }
  

  status = false;
  ngOnInit() 
  {
    this.status = true;
    
  this.user_name = localStorage.getItem("username");
  this.user_role = localStorage.getItem("user_role");
   /*  if(this.user_role == 'RL00001')
     {
       this.usernamelock=true;
     }
     else
     {
       this.usernamelock=false;
     }*/
     this.usernamelock=true;// all users update 
     
            this.Service.getTransporterBussinessPartnerFast()
            .subscribe((listTransBussinessPartner)=>
              { 
               //console.log("trans list:"+JSON.stringify(listTransBussinessPartner))
                this.listTransBussinessPartner = listTransBussinessPartner;
             }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");});


       let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
  
       this.transportmastersave=false;
       this.transportmasterupdate=false;
       this.transportmasterdelete=false;
       this.transportmasterview=false;
      
       if(accessdata.includes('transporter_master.save'))
       {
         this.transportmastersave = true;
       }
      if(accessdata.includes('transporter_master.update'))
       { 
         this.transportmasterupdate=true;
       }
       if(accessdata.includes('transporter_master.delete'))
       {
         this.transportmasterdelete=true;
       }
       if(accessdata.includes('transporter_master.view'))
       {
         this.transportmasterview=true;
       }

       this.ledgerbankacc = JSON.parse(localStorage.getItem("ledgername"));

   }

   showList(s:string)
    {
      if(this.transportmastersave == true  && this.transportmasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
         
           this.isHidden=true;
           this.trans_bussiness_partner_address.patchValue({country:"INDIA"});
           this.trans_currency1="INR";
           this.group_type1="0";
           this.Ssi_App="0";
           this.Constitution="0";
           this.selectedvehicle=[];

           this.bp_type1="TRANSPORTER";
           this.activeIsChecked = true;
           this._broker_sl_no=1;
        //   this.group_type1="0"; 
       //    this.company_name = localStorage.getItem("company_name");
          // this.DropDownListService.getTransSequenceId("prefix="+"TRN"+"&company="+this.company_name).subscribe(data=>{this.seq_no = data.sequenceid;});   
          // this.status = true;
           //this.basiss=["%","UOM"];
          // this.trans_currency1="INR";
         //  this.trans_bussiness_partner_address.patchValue({country:"INDIA"});
          // this.trans_bussiness_partner_accont.patchValue({default_tds_nature:"0",party_bank_acc: "0", pay_term :"0", tds_account:"0"});
           

           //bp_type1
         
          forkJoin(
            this.DropDownListService.getTransSequenceId("prefix="+"TRN"+"&company="+localStorage.getItem("company_name")),
            this.DropDownListService.transportNameCodeList(),
            this.DropDownListService.tdsCode(),
            this.DropDownListService.ledgerNameListNew()
            ).subscribe(([data,userParentGroups,tdscode,ledgerData])=>
              {
            this.seq_no = data.sequenceid;
            this.tdslist=tdscode;
            this.tdsledgerNames = ledgerData;
            this.userParentGroups = userParentGroups;
          
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          });
      
          this.countries = JSON.parse(localStorage.getItem("countryname"));
          this.states = JSON.parse(localStorage.getItem("statename"));
          this.designationlists = JSON.parse(localStorage.getItem("designationname"));
          
        } 
      }
      if(this.transportmastersave == true  && this.transportmasterupdate == false)
      {
        if(s=="add")
        {
          this.isHidden=true;
           this.trans_currency1="INR";
           this.group_type1="0"; 
           this.Country="INDIA";
           this.Ssi_App="0";
           this.Constitution="0";
          
          forkJoin(
            this.DropDownListService.getTransSequenceId("prefix="+"TRN"+"&company="+this.company_name),
            this.DropDownListService.transportNameCodeList(),
            this.DropDownListService.tdsCode(),
            this.DropDownListService.ledgerNameListNew()
            ).subscribe(([data,userParentGroups,tdscode,ledgerData])=>
              {
            this.seq_no = data.sequenceid;
            this.tdslist=tdscode;
            this.tdsledgerNames = ledgerData;
            this.userParentGroups = userParentGroups;
          
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          });

          this.countries = JSON.parse(localStorage.getItem("countryname"));
          this.states = JSON.parse(localStorage.getItem("statename"));
          this.designationlists = JSON.parse(localStorage.getItem("designationname"));
        }  
      }
      
      if(s=="list")
      {
        this.isHidden=false;
        this.transportmastersave= true;
        this.userForm.reset();
        this.ResetAllValues();
      }
    }
    getIndexOfMatTab(event)
    {
      
      if(event.index == 1)
      {
       
        forkJoin(
          this.DropDownListService.payTermNameList(),
          this.DropDownListService.getTDSList()
          ).subscribe(([payTerms,tdsList])=>
            {
              this.payTerms = payTerms;
              this.tdsList = tdsList;
        
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        });
      }
      if(event.index == 3)
      {
        this.DropDownListService.brokerNamesList().subscribe((brokerNames)=>
            {
              this.brokerNames = brokerNames;
         }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        });
        this.ledgerName=JSON.parse(localStorage.getItem("ledgername"));
      }
      if(event.index == 4)
      {
        
          this.DropDownListService.vehicleCodeList()
          .subscribe((vehicleTypes)=>
            {
              this.vehicleTypes = vehicleTypes;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        });
      }
     
  }
    ResetAllValues()
    {
     return this.userForm=this.fb.group({
      id: [''],
      bp_Id: [''],
      bp_code:[''],
      bp_type:[''],
      bp_name:[''],
      alt_name:[''],
      bp_active:[''],
      group_type:[''],
      sub_group_type:[''],
      trans_currency:[''],
      block_active:[''],
     // reason:[''],
      pak_mat_replc:[''],
      broker_status:[''],
      username: [''],
      constitution:[''],
      ssi_app:[''],
      ssi_regno:[''],
      company_id: [''],
      fin_year: [''],

      trans_bussiness_partner_doc: this.fb.array([this.fb.group({
        doc_name : '',  
         })]),

      trans_bussiness_partner_doc_list: this.fb.array([this.fb.group({
      doc_name : '',  
        })]),

      trans_bussiness_partner_address: this.fb.group({
       // id:'',
        website:'',
        country:'',
        state_code:'',
        dist_code:'',
        city_code:'',
        post_office:'',
        pincode:'',
        add1:'',
        add2:'',
        add3:''
      }),

      trans_bussiness_partner_address_dtls: this.fb.array([this.fb.group({
        //id:'',
        contact_person:'',
        designation:'',
        phone:'',
        mobile:'',
        fax:'',
        email:''

        })]),

        trans_bussiness_partner_vehicle_dtls: this.fb.array([this.fb.group({      
            vehicle_type:'',
            vehicle_name:'',  
          })]),
   
        trans_bussiness_partner_accont: this.fb.group({
          pay_cont_acc:'',
          party_bank_acc :'',
          pay_term :'',   
          credit_lim :'',    
          cash_lim_status :'',     
          cash_limit :'',
          tcs_applicable:'',
          tcs_rate:'',
          tcs_date:'',  
          adv_pay:'', 
          adv_pay_mode:'',
          mode_of_adv_pay:'',
          max_adv_vehi:'',
          acc_holder_name:'',
          acc_no:'',
          bank_name:'',
          branch:'',
          ifsc_code:'',
          mobile:'',
          tds_account:'',
          party_nature:'',
          default_tds_nature:'', 
          tds_rate:'',
          mode_of_pay:'',
          iban: '', 
          bic_swift_code: '',  
          acc_type: '',
          acc_remarks: ''
        }),
        
        trans_bussiness_partner_statutory : this.fb.group({
         // id:'',
          registered:'',
          pan_no:'',
          gst_no:'',
          cin_no:'',
          tan_no:'',
          
        }),
        trans_bussiness_partner_broker: this.fb.array([this.fb.group({
            sl_no : this._broker_sl_no,
            ven_code_name:'',
            basis:'',
            based_on:'',
            rate:'',
            effective_date:'',
            remarks:'',
            brokerage_acc:'',
            tds_rate:'',
            tds_acc:'',
        })]),
        trans_bussiness_partner_tds : this.fb.group({
          tds_id: '',
          tds_section: '',
          tds_rate: '',
          tds_acc: ''
         })
     });    
    }

    con_acc:any;
    groupstat1:any;
    onFocusoutCheckUnique(event: any)
    {
  
      if(event.target.value!=null && event.target.value!='')
      {
          this.DropDownListService.chkTranNameStat(event.target.value).subscribe(data=>
            {
               this.groupstat1 = data.group_name;
              // this.status=true;
              //window.alert( data.group_name);
              if(this.groupstat1=='EXIST')
              {
                window.alert(event.target.value +"  "+ "already exist please change !!!" );
                this.userForm.patchValue({bp_name:null});
                this.transportmastersave=false;
              }
              else
              {
                this.transportmastersave=true;
              }
              
            });
          }
            this.groupstat1='';            
        }

    search(event)
    {
      let serchText = event.target.value;
      serchText=this.Service.replaceAllSpl(serchText,"&","ampersand");
      serchText=this.Service.replaceAllSpl(serchText,"/","backslash");
      
      if(event.key == "Enter")
      {
        this.status = false;
        if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
        {
          this.DropDownListService.findTransporters('0').subscribe(data=>
          {
            this.listTransBussinessPartner = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findTransporters(serchText).subscribe(data=>
          {
            this.listTransBussinessPartner = data;
            this.status = true;
          });     
        }
      }
    }

    err_message="";
    _tcs_appl = "No";
    onChangeTcsApplicable(tcs_appl:string)
    {
      if(tcs_appl == 'YES')
      {
        this.isChecked=true;
        this._tcs_appl = "Yes";
        this.err_message = "You have selected TCS applicable('Yes') so, here PAN No. is must.."
        this.trans_bussiness_partner_statutory.patchValue({registered: true});
        this.isChecked2 = true;
      }
      else
      {
        this.trans_bussiness_partner_statutory.patchValue({registered: false});
        this._tcs_appl = "No";
        this.isChecked2 = false;
        this.isChecked=false;
      }
    }

  // onChangeBasis(event, index)
  // {
  //   if(event.target.value)
  //   {
  //     this._basis = event.target.value;
  //   }
  // }

  onChangeBasis(event:string, index)
  {
    this._basis = event;
    if(event == 'UOM')
    this.basedOnList[index] = [{display: "GROSS AMT", value: "GROSS AMT"}, {display: "NET AMT", value: "NET AMT"}];
    if(event == '%')
    this.basedOnList[index] = [{display: "ITEM UOM", value: "ITEM UOM"}, {display: "PACKING UOM", value: "PACKING UOM"}];
  }

    showPopUp(index)
    {
     const dialogConfig = new MatDialogConfig();
     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     dialogConfig.data = {
     vechile_id: this.trans_bussiness_partner_vehicle_dtls.at(index).get("vehicle_name").value as FormControl,
    };
    const dialogRef = this.dialog.open(TransMasterPopUpModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {}); 
   }

  
    onchangeBrokerParentGroup(group_type: String)
    {
      //alert("Group: "+event.target.value);
      if(group_type)
      {
        //  this.DropDownListService.getSuppParentGroupName(groupname).subscribe(data=>{
        //  this.staticpGroup=data.bp_grp_name });

         //new
         this.DropDownListService.nameListByTransporterCode(group_type).subscribe(data=>{
          this.userForm.patchValue({sub_group_type:data["bp_grp_name"]});
         this.trans_bussiness_partner_accont.patchValue({pay_cont_acc:data["bp_grp_name"]});
        
        });
         //end

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

   selectpayment(event: string)
   {
        let gotval=event;
        if(gotval == "Select")
        {
           this.trans_bussiness_partner_accont.get('cash_lim_status').disable();
           this.trans_bussiness_partner_accont.get('cash_limit').disable();
        }
        else if(gotval == "CASH")
        {
          this.trans_bussiness_partner_accont.get('cash_lim_status').enable();
          this.trans_bussiness_partner_accont.get('cash_limit').enable();
        }
        else if(gotval == "CHEQUE")
        {
          this.trans_bussiness_partner_accont.get('cash_lim_status').disable();
          this.trans_bussiness_partner_accont.get('cash_limit').disable();
        }
        else if(gotval == "CARD")
        {
          this.trans_bussiness_partner_accont.get('cash_lim_status').disable();
          this.trans_bussiness_partner_accont.get('cash_limit').disable();
        }
        else
        {
          this.trans_bussiness_partner_accont.get('cash_lim_status').disable();
          this.trans_bussiness_partner_accont.get('cash_limit').disable();
        }
   }

  check5(event):void{
    this.isChecked5 = !this.isChecked5;}  

    isBrokerDtlsChecked = false;
    onChangeBrokerDtlsStatus(event)
    {
      if(event.checked == true)
      {
        this.isBrokerDtlsChecked = true;
        //this.isChecked4==true;

      }
     
      else
      this.isBrokerDtlsChecked = false;
    }   
 
  check3(event):void{
    this.isChecked3 = !this.isChecked3;}  

    check2(ev)
    {
      if(ev.checked == true)
      this.isChecked2 = true;
      else
      this.isChecked2 = false;
    }

  selectAdvancePayment(event:string)
  {
    // console.log("selectAdvancePayment: "+event);
    if(event == 'YES')
    {
      this.advancePayment = true;
    }
    else
    {
      this.advancePayment = false;
    }
  }

 
 /* add() {
    this.trans_bussiness_partner_delv.push(this.fb.group({
      sl_no:'',
      contact_person:'',
      designation:'',
      address:'',
      city_code:'',
      pincode:'',
      phone:'',
      mobile:'',
      fax:'',
      email:''
    
    }));
  }*/
  
  /*delete(index) {
    if(index)
    {
     this.trans_bussiness_partner_delv.removeAt(index);
    }
   else
   {
    alert("can't delete all rows");
   } 
  }*/
  add5() {
    this.trans_bussiness_partner_doc.push(this.fb.group({
      doc_name : '', 
      doc_pdf : ''
    
    }));
  }
  delete5(index) {
    if(index)
    {
     this.trans_bussiness_partner_doc.removeAt(index);
    }
   else
   {
    alert("can't delete all rows");
   }

  }
  addDocumentlist()
  {
    this.trans_bussiness_partner_doc_list.push(this.fb.group({
    doc_name : '',
    doc_pdf : '' 
  }));
  }

  deleteDocumentlist(index)
    {
        this.trans_bussiness_partner_doc_list.removeAt(index);
    }

  onchangeVehicleName(index, event)
   {
     if(event != "0" && event !="" && event != null)
     {
      	this.status = false;
        this.DropDownListService.getVehicleNumberByVtype(event).subscribe(data=>
        {
          this.vehicleNames[index] = data; 
          this.status = true;   
        });   
     }
   }
   
  add2() {
    this._broker_sl_no=this._broker_sl_no+1;
    this.trans_bussiness_partner_broker.push(this.fb.group({     
      sl_no : this._broker_sl_no, 
      ven_code_name:'',
      basis:'',
      based_on:'',
      rate:'',
      effective_date:'',
      remarks:'',
      brokerage_acc:'',
      tds_rate:'',
      tds_acc:'',
    
    }));
  }
  
  delete2(index) 
  {
    if(this._broker_sl_no > 1)
    { 
      this.trans_bussiness_partner_broker.removeAt(index);
      this._broker_sl_no = this._broker_sl_no - 1;
    }
    else
    {
      this._broker_sl_no = 1;
      alert("can't delete all rows");
      this.trans_bussiness_partner_broker.reset();
      this.trans_bussiness_partner_broker.at(0).patchValue({sl_no:  this._broker_sl_no});
    } 
    
    for(let i=1; i<=this._broker_sl_no; i++)
      this.trans_bussiness_partner_broker.at(i-1).patchValue({sl_no: i});
    
  }

  add3() {
    this.trans_bussiness_partner_address_dtls.push(this.fb.group({
      
      sl_no:'',
      contact_person:'',
      designation:'',
      phone:'',
      mobile:'',
      fax:'',
      email:'',
    
    }));
  }
  
  delete3(index) {
    if(index)
    {
     this.trans_bussiness_partner_address_dtls.removeAt(index);
    }
   else
   {
    alert("can't delete all rows");
   } 
  }

  add1() {
    this.trans_bussiness_partner_vehicle_dtls.push(this.fb.group({   
      vehicle_type:'',
      vehicle_name:'',
    }));
  }
  
  delete1(index) {
    if(this.trans_bussiness_partner_vehicle_dtls.length > 1)
    {
     this.trans_bussiness_partner_vehicle_dtls.removeAt(index);
    }
   else
   {
    alert("can't delete all rows");
   } 
  }
  
  onchangeCountry(country_name: String)
 {
  
   if(country_name.length)
   {
    this.status = false;
    this.DropDownListService.stateListByCountry(country_name).subscribe(data=>{this.states  = data;});
    this.status = true;
  }
   else
   {
     this.trans_bussiness_partner_address.get('state_code').reset();
     this.trans_bussiness_partner_address.get('dist_code').reset();
     this.trans_bussiness_partner_address.get('city_code').reset();
   }
 }

 selectedCity:any=[];
 selectedDist:any=[];
 onchangeState(state_name: String)
 {
  this.selectedDist = [];
  this.selectedCity = [];
   if(state_name.length)
   {
    this.status = false;
    this.DropDownListService.getDistrictThruState(state_name).subscribe(data=>{this.districts  = data;});
    this.status = true;
  }
   else
   {
    this.trans_bussiness_partner_address.get('dist_code').reset();
    this.trans_bussiness_partner_address.get('city_code').reset();
   }
  }

  PostOfficeList:any[];
  selectedPostOffice:any=[];
 onchangeDistrict(district_name: String)
 {
  this.selectedCity = [];
   if(district_name.length)
   {
     this.status = false;
     this.DropDownListService.getCityListThruDistrict(district_name).subscribe(data=>{this.cities  = data;});
    //  this.DropDownListService.getPostOfficeThruDist(district_name).subscribe(data=>
    //   {
    //     this.PostOfficeList  = data;
    //     this.status = true;
    //   });
     this.status = true;
    }
   else
   {
    this.trans_bussiness_partner_address.get('city_code').reset();
   }
 }

 onDelete(id:any,trans_id)
{
  this.status = false;
  if(confirm("Are you sure to delete this Transporter ?"))
  { 
    this.userForm.patchValue({username: localStorage.getItem("username")});
    this.DropDownListService.checkTransporterMasterUsage(trans_id).subscribe(checktransporter=> 
      {
      // alert(checktransporter.status)
       if(checktransporter.status=='No')
       {
        this.Service.deleteTransBussinessPartner(this.userForm.getRawValue(),id).subscribe(data=> 
          {
           // console.log("Transporter :"+data.bp_code);
            if(data.bp_code=='' || data.bp_code==null)
            {
              alert("Opps!!! Can't delete this Transporter !!!");
            }else{
              alert("Transporter Deleted successfully.");
            }
            this.status = true;
            this.ngOnInit()
          }); 
       }
      else{
       alert("This Transporter is Already Used,Can not be Deleted!! ");
      }
     });     
  }  
  this.status = true;
}

//  onChangePostOffice(event)
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
//       this.trans_bussiness_partner_address.patchValue({pincode:data.pincode});
//        this.status = true;
//      });
//   }   
//  }

 onChangePinCode(event)
 {
   this.status = false;
   this.sdistrict=this.trans_bussiness_partner_address.get('dist_code').value as FormControl;
   if(event.target.value !='' && event.target.value !="0")
   {
    this.DropDownListService.findPostOffice(event.target.value,this.sdistrict).subscribe(data=>
      {
        this.PostOfficeList = data;
        this.status = true;
      });
   }else{
     this.status = true;
    this.trans_bussiness_partner_address.patchValue({postid:"0"})};
 }

 onchangeLedger(ledger_name: String)
 {
   if(ledger_name)
   {
    this.status = false;
    this.DropDownListService.ledgerListBySubGroup(ledger_name).subscribe(data=>{this.ledgerNames  = data;});
    this.status = true;
  }
 }
  Id:any
 _pan_no:any;
 sq:any;
  send()
  {
    this.transportstatus=[];
    this.Id= this.userForm.get("id").value as FormControl
    this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
      fin_year:localStorage.getItem("financial_year"),
      username: localStorage.getItem("username")});

    this.submitted = true;
    this._pan_no = this.trans_bussiness_partner_statutory.get("pan_no").value as FormControl;

    if(!this.userForm.valid) 
    {
      alert('Please fill all fields!')
      return false;
    } 
    else 
    {
      this.userForm.patchValue({broker_code:this.sq});
      if(this._tcs_appl == 'Yes' && this._pan_no != '' || this._tcs_appl == 'No')
        {
          this.status = false;
          this.isChecked2 = false;
          this.err_message="";

          if(this.userForm.get("bp_type").value == null || this.userForm.get("bp_type").value == 0 )
          {
            alert("Please Select Type!!!!  ");
            this.status=true;
          }
          else if(this.userForm.get("bp_name").value == null || this.userForm.get("bp_name").value == "")
          {
            alert("Please Enter Transporter Name");
            this.status=true; 
          }
          else if(this.userForm.get("group_type").value == null || this.userForm.get("group_type").value == 0)
          {
            alert(" Please Select Group !!!!! ");
            this.status=true;
          }
          else if(this.userForm.get("constitution").value == null || this.userForm.get("constitution").value == "" || this.userForm.get("constitution").value == 0)
          {
            alert(" Please Select Constitution ");
            this.status=true;
          }
          else if( this.trans_bussiness_partner_address.get('country').value == null || this.trans_bussiness_partner_address.get('country').value == "" || this.trans_bussiness_partner_address.get('country').value == 0)
          {
            alert(" Please Select Country Name In Address Tab!!!");
            this.status=true;
          }
          else if(this.trans_bussiness_partner_address.get('state_code').value == null || this.trans_bussiness_partner_address.get('state_code').value == "" || this.trans_bussiness_partner_address.get('state_code').value == 0)
          {
            alert(" Please Select State Name In Address Tab!!!");
            this.status=true;
          }
          else if(this.trans_bussiness_partner_address.get('dist_code').value == null || this.trans_bussiness_partner_address.get('dist_code').value == "" || this.trans_bussiness_partner_address.get('dist_code').value == 0)
          {
            alert("  Please Select District In Address Tab!!!");
            this.status=true;
          }
          // else if(this.trans_bussiness_partner_address.get('city_code').value == null || this.trans_bussiness_partner_address.get('city_code').value == "" || this.trans_bussiness_partner_address.get('city_code').value == 0)
          // {
          //   alert(" Please Enter City In Address Tab!!!");
          //   this.status=true;
          // }
          else if( this.trans_bussiness_partner_statutory.get('pan_no').value == "" )
            {
              alert("Please Select PAN No. In statutory Details Tab!!!");
            this.status=true;
            
            }
            // let pan_length = this.trans_bussiness_partner_statutory.get("pan_no").value;
            else if(this.trans_bussiness_partner_statutory.get("pan_no").value.length!='10')
            {
              alert("Please Enter Valid PAN No In statutory Details Tab!!");
              // this.supp_bussiness_partner_statutory.patchValue({pan_no:''}); //for not blank pan no
              this.status=true;
            }
          else
          {
            this.gststatus.push(this.trans_bussiness_partner_statutory.get('registered').value);
            
            if(this.gststatus.includes(true))
              {
                
                if( this.trans_bussiness_partner_statutory.get('gst_no').value == "" )
                {
                  alert("Please Select GST No. In Statory Details Tab!!!");
                  this.status=true;
                  this.isChecked2 = true;
                }
              else if(this.trans_bussiness_partner_statutory.get("gst_no").value.length!='15')
                {
                  alert("Please Enter Valid GST No!!");
                // this.supp_bussiness_partner_statutory.patchValue({gst_no:''}); //for not blank gst no
                this.status=true;
                this.isChecked2 = true;
                }
                this.isChecked2 = true;
              }
            for(let b=0;b<this.trans_bussiness_partner_vehicle_dtls.length;b++)
            {
              
                    if( this.trans_bussiness_partner_vehicle_dtls.at(b).get("vehicle_type").value == 0 || this.trans_bussiness_partner_vehicle_dtls.at(b).get("vehicle_type").value == "")
                    {
                      alert(" Please Select Vehicle Type In Vehicle details Tab");
                      this.status=true;
                      this.transportstatus.push("false")
                    }
                  else if( this.trans_bussiness_partner_vehicle_dtls.at(b).get("vehicle_name").value == "" || this.trans_bussiness_partner_vehicle_dtls.at(b).get("vehicle_name").value == 0)
                    {
                      alert(" Please Select Vehicle No In Vehicle details Tab");
                      this.status=true;
                      this.transportstatus.push("false")
                    }
              }
              if(this.transportstatus.includes("false"))
              {
                this.status=true;
              }
              else
              {
               
                if(this.Id>0)
                {
                  this.userForm.removeControl('process_master_doc_list');
                  // alert(this.userForm.get("item_group").value)
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
                  this.Service.updateTransBussinessPartner(frmData).subscribe( data => 
                    {
                     // console.log(this.userForm.value);
                      alert("Transporter Master Updated successfully.");
                      this.userForm.reset();
                      this.status = true;
                      this.isHidden = false;
                      this.ngOnInit();
                      this.showList("list");
                      //window.location.reload();
                      // this.userForm.reset();
                      // this.status = true;
                      // this.ngOnInit()
                      // this.isHidden=false;
                      // this.trans_currency1="INR";
                      // this.group_type1="0"; 
                      // this.Country="INDIA";
                      // this.DropDownListService.getTransSequenceId("prefix="+"TRN"+"&company="+this.company_name).subscribe(data=>{this.seq_no = data.sequenceid;});   
                      // this.userForm.patchValue({bp_type:"Transporter",bp_code:this.seq_no});
                      // this.trans_bussiness_partner_broker.at(0).patchValue({sl_no:this._broker_sl_no});
                      // this.DropDownListService.stateListByCountry(this.Country).subscribe(data=>{this.states  = data;});
                    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Transporter Master Updation Unsuccessfull...");
                    //this.ngOnInit()
                  });
                  }
                  else
                {
                  const InputData = this.userForm.getRawValue(); 
                  console.log("input: "+JSON.stringify(InputData));
                  const frmData = new FormData();
                  console.log(" length "+this.myFiles.length);
                  for (let i = 0; i < this.myFiles.length; i++) 
                  {  
                    frmData.append("files", this.myFiles[i]);   
                    console.log();
                   if (i == 0) {  
                  //  console.log(i+",files: "+this.myFiles[i])
                   }  
                 }  
                // console.log(" length after loop: "+this.myFiles.length);
                 frmData.append("Input", JSON.stringify(InputData));
                  
                 // console.log("Form data: "+frmData);
                  this.Service.createTransporterBussinessPartner(frmData).subscribe( data => 
                    {
                     // console.log(this.userForm.value);
                      alert("New Transporter Master created successfully.");
                      this.userForm.reset();
                      this.status = true;
                      this.isHidden = false;
                      this.ngOnInit();
                      this.showList("list");
                     // this.userForm.patchValue({bp_code:this.seq_no});
                      //window.location.reload();
                      // this.userForm.reset();
                      // this.status = true;
                      // this.ngOnInit()
                      // this.isHidden=false;
                      // this.trans_currency1="INR";
                      // this.group_type1="0"; 
                      // this.Country="INDIA";
                      // this.DropDownListService.getTransSequenceId("prefix="+"TRN"+"&company="+this.company_name).subscribe(data=>{this.seq_no = data.sequenceid;});   
                      // this.userForm.patchValue({bp_type:"Transporter",bp_code:this.seq_no});
                      // this.trans_bussiness_partner_broker.at(0).patchValue({sl_no:this._broker_sl_no});
                      // this.DropDownListService.stateListByCountry(this.Country).subscribe(data=>{this.states  = data;});
                    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("New Transporter Master Creation Unsuccessfull...");
                    //this.ngOnInit()
                  }); 
                }
              }
            }
          }
          else
          {alert(this.err_message);}
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

   viewpdf(i,tm) 
   {
    var values=tm[i].controls.doc_pdf.value
    alert(values);
   this.file_name=values.substring(34,tm[i].controls.doc_pdf.length);
   alert(this.file_name);
    this.DropDownListService.downloadFileSystem(this.file_name).subscribe(response => {

        console.log("backend data"+response);
        var binaryData = [];
        binaryData.push(response.data);
        var url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/*"}));
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.setAttribute('target', 'blank');
        a.href = url;
        a.download = response.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();

    }, error => {

        console.log(error);
    });
    
}

   deleteDocument(index)
   {
     if(index)
     { 
       this.trans_bussiness_partner_doc.removeAt(index);
       this.myFiles.splice(index,1);
     }
     else
     {
       alert("can't delete all rows");
       this.trans_bussiness_partner_doc.reset();

     }
   }

  chkTransporterCodeStatus(event: any)
  {
      if(event.target.value!=null && event.target.value!='')
        {
          this.DropDownListService.chkTransBpCodeStatus(event.target.value).subscribe(data=>
          {
            if(data.status=='EXIST')
            {
              alert("Already Exist Code : "+event.target.value +" . Please Change !!!" );
              this._TransCode.nativeElement.focus(); 
              this.userForm.patchValue({bp_code:null});  
              this.transportmastersave=false;
            } else {
              this.transportmastersave=true;
            }
          });
        }
  }

  onUpdate(id:any,bp_Id:string,action)
  {
    this.transportmastersave= true;
    this.isRegister=true;
    this.status = false;
    this.isHidden = true;
    this.showList("add");
    this.selectedCity = [];
    this.selectedDist = [];
    if(action == 'view')
      {
        this.transportmastersave= false;
      }
      else
      {
        this.transportmastersave= true;
      }

    // this.vehicleNames = [];
    forkJoin(
      this.Service.TransBussPtRetrive(id),
      this.Service.getTransBPAddr(bp_Id),
      this.Service.getTransBPAddrDtls(bp_Id),
      this.Service.getTransBPVD(bp_Id),
      this.Service.getTransAccount(bp_Id),
      this.Service.getTransBPStatu(bp_Id),
      this.Service.getTransporterBrokerList(bp_Id),
      this.Service.getTransBPDocs(bp_Id),
      this.Service.getTranstds(bp_Id)
    ).subscribe(([transBusData, transBpAddData, transBpAddDtlsData, transBPVDData,
      transAccountData, transBPStatuData, brokerData, docData,tdsdetails])=>
      { 
       
      //console.log("tuhin "+JSON.stringify(transBpAddData));
        
        this.Constitution=transBusData["constitution"].toUpperCase();
        if(transBusData["ssi_app"] == null || transBusData["ssi_app"] == "")
        {
          
          this.Ssi_App="0";
        }
        else
        {
          this.Ssi_App=transBusData["ssi_app"].toUpperCase();
          
          //this.userForm.patchValue({ ssi_app: transBusData["ssi_app"]});
        }

        this.isChecked5 = transBusData["block_active"];
        this.isBrokerDtlsChecked = true;
        this.selectssiapp(transBusData["ssi_app"]);

       
        // this.userForm.patchValue(transBusData); 
        this.userForm.patchValue({id: transBusData["id"],bp_Id:transBusData["bp_Id"],
          bp_code: transBusData["bp_code"], company_id: transBusData["company_id"],
       
  //changes on 19-04-2022       // bp_type: transBusData["bp_type"], bp_name: transBusData["bp_name"], alt_name: transBusData["alt_name"],
  bp_type1: transBusData["bp_type"], bp_name: transBusData["bp_name"], alt_name: transBusData["alt_name"],
          bp_active: transBusData["bp_active"], group_type: transBusData["group_type"], sub_group_type: transBusData["sub_group_type"],
        trans_currency: transBusData["trans_currency"], block_active: transBusData["block_active"], pak_mat_replc: transBusData["pak_mat_replc"],
      //  fin_year: transBusData["fin_year"],broker_status: transBusData["broker_status"],constitution: transBusData["constitution"],ssi_app: transBusData["ssi_app"],ssi_regno: transBusData["ssi_regno"]})
      fin_year: transBusData["fin_year"],broker_status: transBusData["broker_status"],ssi_regno: transBusData["ssi_regno"]})
     // console.log("transBusData: "+JSON.stringify(transBusData));
      if(tdsdetails==null)
      {

      }
      else
      {
        this.trans_bussiness_partner_tds.patchValue(tdsdetails);
      }
          
        this.selectedCity =transBpAddData["city_code"];
        this.selectedDist = transBpAddData["dist_code"];
        

       // this.selectedPostOffice = transBpAddData["postid"];
        // this.onchangeCountry(transBpAddData["country"])
        // this.onchangeState(transBpAddData["state"]);
        // this.onchangeDistrict(transBpAddData["district"]);
        this.DropDownListService.stateListByCountry(transBpAddData["country"]).subscribe(data=>{this.states  = data;});
        this.DropDownListService.getDistrictThruState(transBpAddData["state_code"]).subscribe(data=>{this.districts  = data;});
        this.DropDownListService.getCityListThruDistrict(transBpAddData["dist_code"]).subscribe(data=>{this.cities  = data;});
        // this.DropDownListService.getPostOfficeThruDist(transBpAddData["dist_code"]).subscribe(data=>
        //   {
        //     this.PostOfficeList  = data;
        //     this.status = true;
        //   })

        this.DropDownListService.findPostOffice(transBpAddData["pincode"],transBpAddData["dist_code"]).subscribe(data=>
          {
            //this.PostOfficeList = data;
            this.status = true;
          });
        this.trans_bussiness_partner_address.patchValue(transBpAddData);
        this.trans_bussiness_partner_address.patchValue({post_office:transBpAddData["post_office"]})
       // console.log("transBpAddData: "+JSON.stringify(transBpAddData));

        while (this.trans_bussiness_partner_address_dtls.length) 
        { this.trans_bussiness_partner_address_dtls.removeAt(0);}
        for(let data1 of transBpAddDtlsData)
        { this.add3();}
        this.trans_bussiness_partner_address_dtls.patchValue(transBpAddDtlsData);
       // console.log("transBpAddDtlsData: "+JSON.stringify(transBpAddDtlsData));

        let i =0;
        while(this.trans_bussiness_partner_vehicle_dtls.length)
        { this.trans_bussiness_partner_vehicle_dtls.removeAt(0);}
        for(let data1 of transBPVDData)
        {
          if(data1["vehicle_type"] != "0" && data1["vehicle_type"] !="" && data1["vehicle_type"] != null)
          {
            this.status = false;
            this.DropDownListService.getVehicleNumberByVtype(data1["vehicle_type"]).subscribe(vName=>
            {
              this.vehicleNames[i] = vName; 
              this.selectedvehicle[i]=data1["vehicle_name"];
              this.add1();
              this.trans_bussiness_partner_vehicle_dtls.at(i).patchValue(data1);
              i=i+1;
              this.status = true; 
            });
          }          
        }
       // console.log("transBPVDData: "+JSON.stringify(transBPVDData));

        this.trans_bussiness_partner_accont.patchValue(transAccountData);
       // console.log("transAccountData: "+JSON.stringify(transAccountData));

        this.trans_bussiness_partner_statutory.patchValue(transBPStatuData);
       // console.log("transBPStatuData: "+JSON.stringify(transBPStatuData));

       // console.log("brokerData: "+  JSON.stringify(brokerData));
        let  j = 0;
        this.add2();
        this._broker_sl_no = 0;
        while (this.trans_bussiness_partner_broker.length) 
        this.trans_bussiness_partner_broker.removeAt(0);
        for(let data1 of brokerData)
        { 
          this.add2();
          this.basedOnList[j] = data1["based_on"]
          this.onChangeBasis(data1.basis, j);
          //this.selectedBrokerName[j] = data1["broker_code"];
          this.trans_bussiness_partner_broker.at(j).patchValue(data1);
          j = j + 1;
        }
        console.log("docData: "+JSON.stringify(docData));
        this.add5();
        while (this.trans_bussiness_partner_doc.length)
        this.trans_bussiness_partner_doc.removeAt(0);
        this.trans_bussiness_partner_doc_list.removeAt(0);
        this.add5();
        for(let data1 of docData)
        this.addDocumentlist();
        this.trans_bussiness_partner_doc_list.patchValue(docData);
             
      
      //   while (this.trans_bussiness_partner_doc.length)
      //   {this.trans_bussiness_partner_doc.removeAt(0);}
      //   for(let data1 of docData)
      //   { this.add5();}
      //   this.trans_bussiness_partner_doc.patchValue(docData);
      //  // console.log("docData: "+JSON.stringify(docData));
      //  let filename=docData["doc_pdf"].substring(35,docData["doc_pdf"].length);
      //         this.DropDownListService.getTransporterimageimage(filename)
      //         .subscribe(data=>
      //           {
                  
      //             this.view_image = data;
      //             const reader = new FileReader();
      //             reader.onload = () => {
      //               this.imageURL = reader.result as string;
      //             }
      //             reader.readAsDataURL(data)
              
      //             this.status = true;
      //         }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));});

        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});              
  }
  getPanNoValid()
  {
    
    let pan_length = this.trans_bussiness_partner_statutory.get("pan_no").value;
    if(pan_length.length!='10')
    {
     alert("Please Enter Valid PAN No!!");
    // this.supp_bussiness_partner_statutory.patchValue({pan_no:''}); //for not blank pan no
    }
  }
  getGstNoValid()
  {
    let gst_length = this.trans_bussiness_partner_statutory.get("gst_no").value;
    if( this.trans_bussiness_partner_statutory.get('registered').value == true )
    {
     if(gst_length.length!='15')
     {
       alert("Please Enter Valid GST No!!");
     //  this.trans_bussiness_partner_statutory.patchValue({gst_no:''}); //for not blank gst no
     }
   }
  }

  getTdschange(tdscode)
  {
    if(tdscode.length)
    {
     
     
      this.DropDownListService.gettdsdetails(tdscode).subscribe(data=>
      {
        this.trans_bussiness_partner_tds.patchValue({tds_id:tdscode,tds_section:data['tds_section'],tds_rate:data['tds_rate'],tds_acc:data['tds_acc']});
        
      });

    }
  }

  onChangevehicle(index,vechile)
  {

    if(vechile.length)
    {
         this.selectedvehicle[index]=vechile;
         this.trans_bussiness_partner_vehicle_dtls.at(index).patchValue({vehicle_name:vechile})
    }
  }
  
  accountposting(id)
  {
    this.DropDownListService.accountPostingTransporter(id).subscribe(data=>
      {
     
        console.log("export: "+data["export"]);
        console.log("response: "+data["response"]);
        if(data["export"] == 1)
        {
          alert("Data has been Exported Sucessfully !!!!!!!!!!!!! ");
        }
        else
        {
          /* let responsestring=data["response"];
          console.log("response: "+data["response"]);
          let split=responsestring.split("LINEERROR>");
          console.log("array "+split[1] );
          let mssg=split[1];
          let finalmssg=mssg.toString().substring(13,mssg.length-24);
          console.log("finalmssg " + finalmssg) */

          alert("Data Didn't Exported  !!!!!!!!!!!!! ");
        }
        
        this.ngOnInit();
      
        this.status = true;
      });
    
}


}
