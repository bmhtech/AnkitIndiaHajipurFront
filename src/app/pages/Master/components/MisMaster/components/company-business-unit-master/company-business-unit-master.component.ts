import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import { CompanyBusinessPartnerUnit } from '../../../../../../Models/InventoryModel/CompanyBusinessUnit';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { forkJoin } from 'rxjs';
import { formatDate } from '@angular/common';

  @Component({
    selector: 'app-company-business-unit-master',
    templateUrl: './company-business-unit-master.component.html',
    styleUrls: ['./company-business-unit-master.component.scss']
  })

  export class CompanyBusinessUnitMasterComponent implements OnInit 
  {
    submitted = false;
    public userForm:FormGroup;
    model: CompanyBusinessPartnerUnit = new CompanyBusinessPartnerUnit();
    listCompanyBusinessPartnerUnit:CompanyBusinessPartnerUnit[];
    countries:any=[];
    states:any=[];
    Country="INDIA";
    PostOfficeList:any=[];
    Id:any;
    item_sl_no = 1;
    countryName: any;
    citiNames:any=[];
    employeeNames:any=[];
    Bu_ShortName:any;
    isHidden=false;
    status = false;
    myFiles: string[] = [];
    @ViewChild('myFileInput', {static: false} as any)
    InputVar: ElementRef;
    companybusinessunitsave:boolean = true;
    companybusinessunitupdate:boolean = true;
    companybusinessunitdelete:boolean= true;
    companybusinessunitview:boolean = true;

    constructor(public fb:FormBuilder, private Service: Master,
      private DropDownListService: DropdownServiceService) 
    { 
      this.userForm=fb.group({

        id: [''],
        businessunit_id: [''],
        businessunit_code:[''],
        businessunit_name:[''], 
        company_code:[''],
        mailing_address:[''],
        country_name:[''],
        dist_code:[''],
        state_code:[''],
        state_name:[''],
        postid:[''],
        city_name:[''],
        city_code:[],
        pin_code:[''],
        office_contactno:[''],
        work_phoneno:[''],
        mobile_no:[''],
        email_id:[''],
        website_name:[''],
        company_scode:[''],
        fin_period_from:[''],
        fin_period_to:[''],
        work_address:[''],
        use_audit_feature:[''],
        decimal_place:[''],
        businessunit_active:[''],
        maintain_warehouse:[''],
        maintain_department:[''],
        incometax_required:[''],
        // salestax_required:[''],
        // servicetax_required:[''],
        // roc_required:[''],
        tds_required:[''],
        maintain_licencedetails:[''],
        pan_no:[''],
        pan_circle_no:[''],
        pan_wardno:[''],
        pan_accessing_officer:[''],
        inhouse_responsibleperson:[''],
        outside_responsibleperson:[''],
        remarks_otherinfo:[''],
        circleno:[''],
        taxpayment_type:[''],
        taxpayment_date:[''],
        returnfilling_type:[''],
        returnfilling_date:[''],
        gstin_no:[''],
        tin_no:[''],
        cst_no:[''],
        sales_inhouse_responsibleperson:[''],
        sales_outside_responsibleperson:[''],
        sales_remarks_otherinfo:[''],
        sales_circleno:[''],
        sales_taxpayment_type:[''],
        sales_taxpayment_date:[''],
        sales_returnfilling_type:[''],
        sales_returnfilling_date:[''],
        servicetax_no:[''],
        service_nature:[''],
        service_inhouse_responsibleperson:[''],
        service_outside_responsibleperson:[''],
        service_remarks_otherinfo:[''],
        service_circleno:[''],
        service_taxpayment_type:[''],
        service_taxpayment_date:[''],
        service_returnfilling_type:[''],
        service_returnfilling_date:[''],
        roc_inhouse_responsibleperson:[''],
        roc_outside_responsibleperson:[''],
        roc_remarks_otherinfo:[''],
        roc_circleno:[''],
        roc_taxpayment_type:[''],
        roc_taxpayment_date:[''],
        roc_returnfilling_type:[''],
        roc_returnfilling_date:[''],
        otherdetails_remarks:[''],
        company_id: [''],
        fin_year:[''],
        username: [''],
      
        companyBusinessUnitDetails: this.fb.array([this.fb.group({
          sln_no:'',
          licence_no:'',
          licence_name:'',
          expiry_date:'',
          remarks:'',
          doc_name:'' })])
      });
    }
    
    get id(){ return this.userForm.get("id") as FormControl }
    get businessunit_id(){ return this.userForm.get("businessunit_id") as FormControl }
    get businessunit_code(){ return this.userForm.get("businessunit_code") as FormControl }
    get city_code(){ return this.userForm.get("city_code") as FormControl }
    get businessunit_name(){ return this.userForm.get("businessunit_name") as FormControl }
    get company_code(){ return this.userForm.get("company_code") as FormControl }
    get mailing_address(){ return this.userForm.get("mailing_address") as FormControl }
    get dist_code(){ return this.userForm.get("dist_code") as FormControl }
    get country_name(){ return this.userForm.get("country_name") as FormControl }
    get state_name(){ return this.userForm.get("state_name") as FormControl }
    get state_code(){ return this.userForm.get("state_code") as FormControl }
    get city_name(){ return this.userForm.get("city_name") as FormControl }
    get postid(){ return this.userForm.get("postid") as FormControl }
    get pin_code(){ return this.userForm.get("pin_code") as FormControl }
    get office_contactno(){ return this.userForm.get("office_contactno") as FormControl }
    get work_phoneno(){ return this.userForm.get("work_phoneno") as FormControl }
    get mobile_no(){ return this.userForm.get("mobile_no") as FormControl }
    get email_id(){ return this.userForm.get("email_id") as FormControl }
    get website_name(){ return this.userForm.get("website_name") as FormControl }
    get company_scode(){ return this.userForm.get("company_scode") as FormControl }
    get fin_period_from(){ return this.userForm.get("fin_period_from") as FormControl }
    get fin_period_to(){ return this.userForm.get("fin_period_to") as FormControl }
    get work_address(){ return this.userForm.get("work_address") as FormControl }
    get use_audit_feature(){ return this.userForm.get("use_audit_feature") as FormControl }
    get decimal_place(){ return this.userForm.get("decimal_place") as FormControl }
    get businessunit_active(){ return this.userForm.get("businessunit_active") as FormControl }
    get maintain_warehouse(){ return this.userForm.get("maintain_warehouse") as FormControl }
    get maintain_department(){ return this.userForm.get("maintain_department") as FormControl }
    get incometax_required(){ return this.userForm.get("incometax_required") as FormControl }
    // get salestax_required(){ return this.userForm.get("salestax_required") as FormControl }
    // get servicetax_required(){ return this.userForm.get("servicetax_required") as FormControl }
    // get roc_required(){ return this.userForm.get("roc_required") as FormControl }
    get tds_required(){ return this.userForm.get("tds_required") as FormControl }
    get maintain_licencedetails(){ return this.userForm.get("maintain_licencedetails") as FormControl }
    get pan_no(){ return this.userForm.get("pan_no") as FormControl }
    get pan_circle_no(){ return this.userForm.get("pan_circle_no") as FormControl }
    get pan_wardno(){ return this.userForm.get("pan_wardno") as FormControl }
    get pan_accessing_officer(){ return this.userForm.get("pan_accessing_officer") as FormControl }
    get inhouse_responsibleperson(){ return this.userForm.get("inhouse_responsibleperson") as FormControl }
    get outside_responsibleperson(){ return this.userForm.get("outside_responsibleperson") as FormControl }
    get remarks_otherinfo(){ return this.userForm.get("remarks_otherinfo") as FormControl }
    get circleno(){ return this.userForm.get("circleno") as FormControl }
    get taxpayment_type(){ return this.userForm.get("taxpayment_type") as FormControl }
    get taxpayment_date(){ return this.userForm.get("taxpayment_date") as FormControl }
    get returnfilling_type(){ return this.userForm.get("returnfilling_type") as FormControl }
    get returnfilling_date(){ return this.userForm.get("returnfilling_date") as FormControl }
    get gstin_no(){ return this.userForm.get("gstin_no") as FormControl }
    get tin_no(){ return this.userForm.get("tin_no") as FormControl }
    get cst_no(){ return this.userForm.get("cst_no") as FormControl }
    get sales_inhouse_responsibleperson(){ return this.userForm.get("sales_inhouse_responsibleperson") as FormControl }
    get sales_outside_responsibleperson(){ return this.userForm.get("sales_outside_responsibleperson") as FormControl }
    get sales_remarks_otherinfo(){ return this.userForm.get("sales_remarks_otherinfo") as FormControl }
    get sales_circleno(){ return this.userForm.get("sales_circleno") as FormControl }
    get sales_taxpayment_type(){ return this.userForm.get("sales_taxpayment_type") as FormControl }
    get sales_taxpayment_date(){ return this.userForm.get("sales_taxpayment_date") as FormControl }
    get sales_returnfilling_type(){ return this.userForm.get("sales_returnfilling_type") as FormControl }
    get sales_returnfilling_date(){ return this.userForm.get("sales_returnfilling_date") as FormControl }
    get servicetax_no(){ return this.userForm.get("servicetax_no") as FormControl }
    get service_nature(){ return this.userForm.get("service_nature") as FormControl }
    get service_inhouse_responsibleperson(){ return this.userForm.get("service_inhouse_responsibleperson") as FormControl }
    get service_outside_responsibleperson(){ return this.userForm.get("service_outside_responsibleperson") as FormControl }
    get service_remarks_otherinfo(){ return this.userForm.get("service_remarks_otherinfo") as FormControl }
    get service_circleno(){ return this.userForm.get("service_circleno") as FormControl }
    get service_taxpayment_type(){ return this.userForm.get("service_taxpayment_type") as FormControl }
    get service_taxpayment_date(){ return this.userForm.get("service_taxpayment_date") as FormControl }
    get service_returnfilling_type(){ return this.userForm.get("service_returnfilling_type") as FormControl }
    get service_returnfilling_date(){ return this.userForm.get("service_returnfilling_date") as FormControl }
    get roc_inhouse_responsibleperson(){ return this.userForm.get("roc_inhouse_responsibleperson") as FormControl }
    get roc_outside_responsibleperson(){ return this.userForm.get("roc_outside_responsibleperson") as FormControl }
    get roc_remarks_otherinfo(){ return this.userForm.get("roc_remarks_otherinfo") as FormControl }
    get roc_circleno(){ return this.userForm.get("roc_circleno") as FormControl }
    get roc_taxpayment_type(){ return this.userForm.get("roc_taxpayment_type") as FormControl }
    get roc_taxpayment_date(){ return this.userForm.get("roc_taxpayment_date") as FormControl }
    get roc_returnfilling_type(){ return this.userForm.get("roc_returnfilling_type") as FormControl }
    get roc_returnfilling_date(){ return this.userForm.get("roc_returnfilling_date") as FormControl }
    get otherdetails_remarks(){ return this.userForm.get("otherdetails_remarks") as FormControl }
    get companyBusinessUnitDetails() {return this.userForm.get('companyBusinessUnitDetails') as FormArray;}

    Localcompany_id:any;
    ngOnInit() 
    {
      //For User Role
      let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
     
     this.companybusinessunitsave=false;
     this.companybusinessunitupdate=false;
     this.companybusinessunitdelete=false;
     this.companybusinessunitview = false;

     if(accessdata.includes('company_business_unit.save'))
     {
      this.companybusinessunitsave = true;
     }
    if(accessdata.includes('company_business_unit.update'))
     { 
       this.companybusinessunitupdate=true;
     }
     if(accessdata.includes('company_business_unit.delete'))
     {
       this.companybusinessunitdelete=true;
     }
     if(accessdata.includes('company_business_unit.view'))
     {
       this.companybusinessunitview=true;
     }

     
     
      this.Localcompany_id= localStorage.getItem("company_name");
      this.InhouseResponsibleperson = "0";
      this.userForm.patchValue({country_name:"INDIA",dist_code:"0",city_code:"0",inhouse_responsibleperson:"0",outside_responsibleperson:"0",
      sales_inhouse_responsibleperson:"0",sales_outside_responsibleperson:"0",service_inhouse_responsibleperson:"0",service_outside_responsibleperson:"0",
      roc_inhouse_responsibleperson:"0",roc_outside_responsibleperson:"0"}); 
      this.Service.getCompanyBusiness().subscribe(data=>{this.listCompanyBusinessPartnerUnit  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.DropDownListService.countryList().subscribe(data=>{this.countries  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      // this.DropDownListService.citiNamesList().subscribe(data=>{this.citiNames = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      // this.ngOnInit()});
      this.DropDownListService.employeeNamesList(this.Localcompany_id).subscribe(data=>{this.employeeNames = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.status = true;
    }

    formatsDateTest: string[] = [
      'dd/MM',
    
      ];
    
    dateNow : Date = new Date();
   

    InhouseResponsibleperson = "0";

    showList(s:string)
    {
      if(this.companybusinessunitsave == true  && this.companybusinessunitupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          
          this.isHidden=true;
          this.item_sl_no=0;
          while(this.companyBusinessUnitDetails.length)
          this.companyBusinessUnitDetails.removeAt(0);
          this.add(); 
          this.userForm.patchValue({country_name:"INDIA",dist_code:"0",city_code:"0",inhouse_responsibleperson:"0",outside_responsibleperson:"0",
          sales_inhouse_responsibleperson:"0",sales_outside_responsibleperson:"0",service_inhouse_responsibleperson:"0",service_outside_responsibleperson:"0",
          roc_inhouse_responsibleperson:"0",roc_outside_responsibleperson:"0"});
          this.DropDownListService.stateListByCountry(this.Country).subscribe(data=>
            {
              this.states = data;
              this.status = true;
            });
          this.Country="INDIA";
          this.InhouseResponsibleperson ="0";
        }
      }
      if(this.companybusinessunitsave == true  && this.companybusinessunitupdate == false)
      {
        if(s=="add")
        {
          
          this.isHidden=true;
          this.item_sl_no=0;
          while(this.companyBusinessUnitDetails.length)
          this.companyBusinessUnitDetails.removeAt(0);
          this.add(); 
          this.userForm.patchValue({country_name:"INDIA",dist_code:"0",city_code:"0",inhouse_responsibleperson:"0",outside_responsibleperson:"0",
          sales_inhouse_responsibleperson:"0",sales_outside_responsibleperson:"0",service_inhouse_responsibleperson:"0",service_outside_responsibleperson:"0",
          roc_inhouse_responsibleperson:"0",roc_outside_responsibleperson:"0"});
          this.DropDownListService.stateListByCountry(this.Country).subscribe(data=>
            {
              this.states = data;
              this.status = true;
            });
          this.Country="INDIA";
          this.InhouseResponsibleperson ="0";
        }
      }
      
      if(s=="list")
      {
        this.isHidden=false;
        this.companybusinessunitsave=true;
        this.userForm.reset();
        this.DropDownListService.stateListByCountry(this.Country).subscribe(data=>
          {
            this.states = data;
            this.status = true;
          });
        this.Country="INDIA";
        this.InhouseResponsibleperson = "0";
        this.item_sl_no=0;
        while(this.companyBusinessUnitDetails.length)
        this.companyBusinessUnitDetails.removeAt(0);
        this.add(); 
        this.userForm.patchValue({country_name:"INDIA",dist_code:"0",city_code:"0",inhouse_responsibleperson:"0",outside_responsibleperson:"0",
        sales_inhouse_responsibleperson:"0",sales_outside_responsibleperson:"0",service_inhouse_responsibleperson:"0",service_outside_responsibleperson:"0",
        roc_inhouse_responsibleperson:"0",roc_outside_responsibleperson:"0"});
      }
    }

    // Entrydate:any;
    // isChecked1 = true;
    // isChecked11 = false;
    // onChangeDate(event)
    // {
    //   this.Entrydate =event.target.value
     
    //   this.Entrydate =this.Entrydate.substring(5,this.Entrydate.length);
    //  if(this.Entrydate){
    //    this.isChecked11=true;
    //   this.isChecked1=false;
    //  }
     
    // }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id: [''],
        businessunit_id: [''],
        businessunit_code:[''],
        businessunit_name:[''], 
        company_code:[''],
        mailing_address:[''],
        city_code:[''],
        country_name:[''],
        dist_code:[''],
        state_code:[''],
        postid:[''],
        state_name:[''],
        city_name:[''],
        pin_code:[''],
        office_contactno:[''],
        work_phoneno:[''],
        mobile_no:[''],
        email_id:[''],
        website_name:[''],
        company_scode:[''],
        fin_period_from:[''],
        fin_period_to:[''],
        work_address:[''],
        use_audit_feature:[''],
        decimal_place:[''],
        businessunit_active:[''],
        maintain_warehouse:[''],
        maintain_department:[''],
        incometax_required:[''],
        // salestax_required:[''],
        // servicetax_required:[''],
        // roc_required:[''],
        tds_required:[''],
        maintain_licencedetails:[''],
        pan_no:[''],
        pan_circle_no:[''],
        pan_wardno:[''],
        pan_accessing_officer:[''],
        inhouse_responsibleperson:[''],
        outside_responsibleperson:[''],
        remarks_otherinfo:[''],
        circleno:[''],
        taxpayment_type:[''],
        taxpayment_date:[''],
        returnfilling_type:[''],
        returnfilling_date:[''],
        gstin_no:[''],
        tin_no:[''],
        cst_no:[''],
        sales_inhouse_responsibleperson:[''],
        sales_outside_responsibleperson:[''],
        sales_remarks_otherinfo:[''],
        sales_circleno:[''],
        sales_taxpayment_type:[''],
        sales_taxpayment_date:[''],
        sales_returnfilling_type:[''],
        sales_returnfilling_date:[''],
        servicetax_no:[''],
        service_nature:[''],
        service_inhouse_responsibleperson:[''],
        service_outside_responsibleperson:[''],
        service_remarks_otherinfo:[''],
        service_circleno:[''],
        service_taxpayment_type:[''],
        service_taxpayment_date:[''],
        service_returnfilling_type:[''],
        service_returnfilling_date:[''],
        roc_inhouse_responsibleperson:[''],
        roc_outside_responsibleperson:[''],
        roc_remarks_otherinfo:[''],
        roc_circleno:[''],
        roc_taxpayment_type:[''],
        roc_taxpayment_date:[''],
        roc_returnfilling_type:[''],
        roc_returnfilling_date:[''],
        otherdetails_remarks:[''],
        company_id: [''],
        fin_year:[''],
        username: [''],
      
        companyBusinessUnitDetails: this.fb.array([this.fb.group({
          sln_no:'',
          licence_no:'',
          licence_name:'',
          expiry_date:'',
          remarks:'',
          doc_name:'' })])
      });
    }

    add()
    {
      this.item_sl_no =this.item_sl_no +1;
      this.companyBusinessUnitDetails.push(this.fb.group({
        sln_no:this.item_sl_no,
        licence_no:'',
        licence_name:'',
        expiry_date:'',
        remarks:'',
        doc_name:''}));
    }

    delete(index) 
    {
      if(this.item_sl_no > 1)
      {
        this.companyBusinessUnitDetails.removeAt(index);
        this.item_sl_no = this.item_sl_no - 1;
      }
      else
      {
        this.item_sl_no = 1;
        this.companyBusinessUnitDetails.reset();
        this.companyBusinessUnitDetails.at(0).patchValue({sln_no:  this.item_sl_no});
        alert("can't delete all rows");
      } 
      for(let i=1; i<=this.item_sl_no; i++)
      this.companyBusinessUnitDetails.at(i-1).patchValue({sln_no: i});
    }

    focusOutFunction()
      {
        this.Bu_ShortName= this.userForm.get("company_code").value ;
        this.Bu_ShortName=this.Bu_ShortName.toUpperCase();
       if(this.Bu_ShortName.length<3 || this.Bu_ShortName.length>3)
        {  
          alert("BU Short Name Must be in 3 Character");
          this.userForm.patchValue({company_code: null}); 
        }
        else
          {
            this.userForm.patchValue({company_code:this.Bu_ShortName});
          }
      }

      onchangeCountry(country_name)
      {
        this.states = [];
        this.selectedDist = [];
        this.selectedCity = [];
        if(country_name.length)
       {
          this.status= false;
          this.DropDownListService.stateListByCountry(country_name).subscribe(data=>
          {
            this.states  = data;
            this.status = true;
          });
        }
      }

    selectedDist:any=[];
    selectedCity:any=[];
    districtsList:any = [];
    onChangeState(state_id)
    {
      this.districtsList = [];
      this.selectedDist = [];
      this.selectedCity = [];
     this.userForm.patchValue({dist_code: null,city_code:null})
     if(state_id.length)
     {
        this.status = false;
        this.DropDownListService.getDistrictThruState(state_id).subscribe(data=>
        {
          this.districtsList  = data;
          this.status = true;
        });    
      }
    }
    onChangeDist(dist_id)
    {
      this.citiNames = [];
     // this.selectedDist = [];
      this.selectedCity = [];
      this.userForm.patchValue({city_code:null});
      if(dist_id.length)
      {
        this.status = false;
        this.DropDownListService.getCityListThruDistrict(dist_id).subscribe(data=>
        {
          this.citiNames = data;
          this.status = true;
        });    
      }
    }

    handlePincode(event: any){
      if(event.target.value.length > 6){
        //alert("Please Enter 6 digit Pincode !!!");
        let x=event.target.value.substring(0,6);
        this.userForm.patchValue({pin_code:x});
      }
    }

    sdistrict:any;
    onChangePinCode(event)
    {
      this.status = false;
      this.sdistrict=this.userForm.get('dist_code').value as FormControl;
      if(event.target.value !='' && event.target.value !="0")
      {
       this.DropDownListService.findPostOffice(event.target.value,this.sdistrict).subscribe(data=>
         {
           this.PostOfficeList = data;
           this.status = true;
         });
      }else{
        this.status = true;
       this.userForm.patchValue({postid:"0"})};
    }

    search(event)
    {
      let serchText = event.target.value;
      if(event.key == "Enter")
      {
        this.status = false;
        if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
        {
          this.DropDownListService.findCompanyBUMaster('0').subscribe(data=>
          {
            this.listCompanyBusinessPartnerUnit = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findCompanyBUMaster(serchText).subscribe(data=>
          {
            this.listCompanyBusinessPartnerUnit = data;
            this.status = true;
          });  
          this.status = true;   
        }
      }
    }

    onDelete(id:any,businessunit_id)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Business Unit ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.DropDownListService.checkMisleniousDeletation(businessunit_id,"Bussiness_Unit").subscribe(checkBUData=> 
          {
           if(checkBUData.status=='No')
           {
             this.Service.deleteCompanyBUMaster(this.userForm.getRawValue(),id).subscribe(data=> 
               {     
                 console.log("company_code:"+data.company_code);
                 if(data.company_code=='' || data.company_code==null)
                 {
                   alert("Opps!!! Can't delete this Business Unit !!!");
                 }else{
                   alert("Company Business Unit deleted successfully.");
                 }
                 this.status = true;
                 this.ngOnInit()
               });
           }
           else{
            alert("This Business Unit is Already Used,Can not be Deleted!! ");
           }
          });
        
      }  
      this.status = true;
    }
     
  getPanNoValid()
    {
      let pan_length = this.userForm.get("pan_no").value;
      console.log("Length of Pan: "+pan_length.length)
      if(pan_length.length!='10')
      {
        alert("Please Enter Valid PAN No!!");
        this.status=true;
      }
    }

    send()
    {
      this.Id= this.userForm.get("id").value as FormControl;
      this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
        fin_year:localStorage.getItem("financial_year"), 
        username: localStorage.getItem("username")});
      this.submitted = true;
      if(!this.userForm.valid) 
      {
        alert('Please fill all fields!')
        return false;
      } 
      else 
      {
        this.status  = false;
        if(this.userForm.get("businessunit_name").value == '' || this.userForm.get("businessunit_name").value == 0 || this.userForm.get("businessunit_name").value == null)
        {
          alert("Please Enter Business Unit Name");
          this.status=true;
        }
        else if(this.userForm.get("country_name").value == '' || this.userForm.get("country_name").value == 0 || this.userForm.get("country_name").value == null)
        {
          alert("Please Select Country Name");
          this.status=true;
        }
        else if(this.userForm.get("state_code").value == '' || this.userForm.get("state_code").value == 0 || this.userForm.get("state_code").value == null)
        {
          alert("Please Select State Name");
          this.status=true;
        }
        else if(this.userForm.get("dist_code").value == '' || this.userForm.get("dist_code").value == 0 || this.userForm.get("dist_code").value == null)
        {
          alert("Please Select District Name");
          this.status=true;
        }
        // else if(this.userForm.get("city_name").value == '' || this.userForm.get("city_name").value == 0 || this.userForm.get("city_name").value == null)
        // {
        //   alert(this.userForm.get("city_name").value);
        //   alert("Please Enter City Name");
        //   this.status=true;
        // }
        else if(this.userForm.get("pan_no").value == '' || this.userForm.get("pan_no").value == 0 || this.userForm.get("pan_no").value == null)
        {
          alert("Please Enter Pan No. in Income Tax Information Block");
          this.status=true;
        }
        else if(this.userForm.get("pan_no").value.length!='10')
        {
          alert("Please Enter Valid PAN No. in Income Tax Information Block");
          this.status=true;
        }
        else
        {
            //starts here
            if(this.Id>0)
            {
              const InputData = this.userForm.getRawValue(); 
              const frmData = new FormData();
              
              for (var i = 0; i < this.myFiles.length; i++) {  
              frmData.append("files", this.myFiles[i]);   
              
              if (i == 0) {  
                console.log(i+",files: "+this.myFiles[i])
              }  
              }  
              frmData.append("Input", JSON.stringify(InputData));
              this.Service.updateCompanyBusiness(frmData).subscribe(data => 
              {
                console.log(this.userForm.value);
                alert("Company Business Unit updated successfully.");
                //window.location.reload();
                this.userForm.reset();
                this.InputVar.nativeElement.value = "";
                this.myFiles=[];
                this.status = true;
                this.DropDownListService.stateListByCountry(this.Country).subscribe(data=>
                  {
                    this.states = data;
                    this.status = true;
                  });
                this.Country="INDIA";
                this.item_sl_no=0;
                while(this.companyBusinessUnitDetails.length)
                this.companyBusinessUnitDetails.removeAt(0);
                this.add(); 
                this.companyBusinessUnitDetails.at(0).patchValue({sln_no:this.item_sl_no})
                this.ngOnInit();
                this.isHidden=false;           
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
              this.ngOnInit()});
            }
            else
              {
              const InputData = this.userForm.getRawValue(); 
              const frmData = new FormData();
              
              for (var i = 0; i < this.myFiles.length; i++) {  
              frmData.append("files", this.myFiles[i]);   
              
              if (i == 0) {  
                console.log(i+",files: "+this.myFiles[i])
              }  
              }  
              frmData.append("Input", JSON.stringify(InputData));
              
              //  if(this.myFiles.length==0)
              //  {
              //    alert("Please Attach File...");
              
              //    return false;
              //  }
              this.Service.createCompanyBusiness(frmData).subscribe(data => 
              {
                alert("Company Business Unit created successfully.");
                this.userForm.reset();
                this.InputVar.nativeElement.value = "";
                this.status = true;
                this.DropDownListService.stateListByCountry(this.Country).subscribe(data=>
                  {
                    this.states = data;
                    this.status = true;
                  });
                this.Country="India";
                this.ngOnInit();
                this.myFiles=[];
                this.item_sl_no=0;
                while(this.companyBusinessUnitDetails.length)
                this.companyBusinessUnitDetails.removeAt(0);
                this.add(); 
                this.companyBusinessUnitDetails.at(0).patchValue({sln_no:this.item_sl_no})
                this.isHidden=false;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
              this.ngOnInit()});
          }
          //ends here
        }
      }
    }
    
    onUpdate(id:any, businessunit_id:string,action)
    {
      if(action =='update')
      {
        this.companybusinessunitsave=true;
      }
      else
      {
        this.companybusinessunitsave=false;
      }
      //tuhin here//this.companybusinessunitsave=true;
      this.myFiles=[];
      this.userForm.patchValue({id: id});
      this.isHidden = true;
      this.status = false;
      this.selectedCity = [];
      this.selectedDist = [];
    
      forkJoin(
        this.Service.retriveCompanyBusiness(id),
        this.Service.compBURetriveList(businessunit_id)
      ).subscribe(([CompanyBUDetails, LicenceDetails])=>
        {
          console.log("LicenceDetails: "+ JSON.stringify(LicenceDetails))
          this.selectedCity = CompanyBUDetails["city_code"]
          this.selectedDist = CompanyBUDetails["dist_code"]
          this.DropDownListService.stateListByCountry(CompanyBUDetails.country_name).subscribe(data=>
            {
              this.states = data;
              this.status = true;
            });
  
            this.DropDownListService.getDistrictThruState(CompanyBUDetails.state_code).subscribe(data=>
              {
                this.districtsList  = data;
                this.status = true;
              }); 
  
          this.DropDownListService.getCityListThruDistrict(CompanyBUDetails["dist_code"]).subscribe(data=>
            {
              this.citiNames = data;
              this.status = true;
            }); 
            
            if(CompanyBUDetails["pin_code"] !='' && CompanyBUDetails["pin_code"])
            {
             this.DropDownListService.findPostOffice(CompanyBUDetails["pin_code"],CompanyBUDetails["dist_code"]).subscribe(data=>
               {
                 this.PostOfficeList = data;
                 this.status = true;
               });
            }
          
          this.userForm.patchValue(CompanyBUDetails);
          console.log("CompanyBUDetails: "+JSON.stringify(CompanyBUDetails));       
 
         this.item_sl_no=0 ;
        while (this.companyBusinessUnitDetails.length ) 
        {this.companyBusinessUnitDetails.removeAt(0);}
        for(let i=0;i<LicenceDetails.length;i++)
        {this.add();}
        this.companyBusinessUnitDetails.patchValue(LicenceDetails);
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
     }

     onFileSelected(e)
     {
      const $pdf: any = document.querySelector('#file');
 
      if (typeof FileReader !== 'undefined') {
        const reader = new FileReader();
        // reader.onload = (e: any) => {
        //   this.pdfSrc = e.target.result;
        // };
        // reader.readAsArrayBuffer($pdf.files[0]);
        for (var i = 0; i < e.target.files.length; i++) {  
          this.myFiles.push(e.target.files[i]); 
         // alert("len: "+this.myFiles.length)
        } 
      }
     
     }

     

  }
