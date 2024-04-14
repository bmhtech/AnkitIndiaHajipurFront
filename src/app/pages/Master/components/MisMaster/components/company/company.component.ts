import { Component, OnInit } from '@angular/core';
import{Company}  from '../../../../../../Models/InventoryModel/company';
import { Master } from '../../../../../../service/master.service';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { forkJoin } from 'rxjs';

  @Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss']
  })

  export class CompanyComponent implements OnInit 
  {
    submitted = false;
    public userForm:FormGroup;
    model: Company = new Company();
    listCompany: Company[];
    ctypes:{};
    Id:any;
    Country="INDIA";
    countries:{};
    countryName: any;
    districts:{};
    cities:{};
    employeeNames:{};
    item_sl_no = 1;
    licence
    isHidden=false;
    status = false;
    companymastersave:boolean = true;
    companymasterupdate:boolean = true;
    companymasterdelete:boolean = true;
    companymasterview:boolean = true;

    constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group({
        id:[''],
        company_id:[''],
        company_code:[''],
        comp_prefix:[''],
        company_name:[''],
        comp_mailing_name:[''],
        company_address:[''],
        company_type:[''],
        parent_company:[''],
        country_name:[''],
        state_name:[''],
        city_name:[''],
        pin_code:[''],
        office_contactno:[''],
        work_phoneno:[''],
        mobile_no:[''],
        email_id:[''],
        website_name:[''],
        fin_period_from:[''],
        fin_period_to:[''],
        work_address:[''],
        use_audit_feature:[''],
        decimal_place:[''],
        incometax_required:[''],
        // salestax_required:[''],
        // servicetax_required:[''],
        // roc_required:[''],
        tds_required:[''],
        maintain_licencedetails:[''],
        maintain_businessunit:[''],
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
        fin_year: [''],
        username: [''],
      
        company_licence_details: this.fb.array([this.fb.group({
          sln_no:this.item_sl_no,
          licence_no:'',
          licence_name:'',
          expiry_date:'',
          remarks:''})])
      });
    }

    get id(){ return this.userForm.get("id") as FormControl }
    get company_id(){ return this.userForm.get("company_id") as FormControl }
    get company_code(){ return this.userForm.get("company_code") as FormControl }
    get comp_prefix(){ return this.userForm.get("comp_prefix") as FormControl }
    get company_name(){ return this.userForm.get("company_name") as FormControl }
    get comp_mailing_name(){ return this.userForm.get("comp_mailing_name") as FormControl }
    get company_address(){ return this.userForm.get("company_address") as FormControl }
    get company_type(){ return this.userForm.get("company_type") as FormControl }
    get parent_company(){ return this.userForm.get("parent_company") as FormControl }
    get country_name(){ return this.userForm.get("country_name") as FormControl }
    get state_name(){ return this.userForm.get("state_name") as FormControl }
    get city_name(){ return this.userForm.get("city_name") as FormControl }
    get pin_code(){ return this.userForm.get("pin_code") as FormControl }
    get office_contactno(){ return this.userForm.get("office_contactno") as FormControl }
    get work_phoneno(){ return this.userForm.get("work_phoneno") as FormControl }
    get mobile_no(){ return this.userForm.get("mobile_no") as FormControl }
    get email_id(){ return this.userForm.get("email_id") as FormControl }
    get website_name(){ return this.userForm.get("website_name") as FormControl }
    get fin_period_from(){ return this.userForm.get("fin_period_from") as FormControl }
    get fin_period_to(){ return this.userForm.get("fin_period_to") as FormControl }
    get work_address(){ return this.userForm.get("work_address") as FormControl }
    get use_audit_feature(){ return this.userForm.get("use_audit_feature") as FormControl }
    get decimal_place(){ return this.userForm.get("decimal_place") as FormControl }
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
    get serviremarks_otherinfotax_required(){ return this.userForm.get("remarks_otherinfo") as FormControl }
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
    get  roc_circleno(){ return this.userForm.get("roc_circleno") as FormControl }
    get roc_taxpayment_type(){ return this.userForm.get("roc_taxpayment_type") as FormControl }
    get roc_taxpayment_date(){ return this.userForm.get("roc_taxpayment_date") as FormControl }
    get roc_returnfilling_type(){ return this.userForm.get("roc_returnfilling_type") as FormControl }
    get roc_returnfilling_date(){ return this.userForm.get("roc_returnfilling_date") as FormControl }
    get otherdetails_remarks(){ return this.userForm.get("otherdetails_remarks") as FormControl }
    get company_licence_details(){return this.userForm.get('company_licence_details') as FormArray;}

    Localcompany_id:any;
    ngOnInit() 
    {
      //For User Role
      let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
   
     this.companymastersave=false;
     this.companymasterupdate=false;
     this.companymasterdelete=false;
     this.companymasterview=false;

        if(accessdata.includes('company_master.save'))
           {
            this.companymastersave = true;
           }
          if(accessdata.includes('company_master.update'))
           { 
             this.companymasterupdate=true;
           }
           if(accessdata.includes('company_master.delete'))
           {
             this.companymasterdelete=true;
           }
           if(accessdata.includes('company_master.view'))
           {
             this.companymasterview=true;
           }

      this.Localcompany_id= localStorage.getItem("company_name");
      this.Service.getCompanies().subscribe(data=>{this.listCompany  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.ctypes=["LIMITED","PARTNERSHIP","PRIVATE LIMITED","PROPRIETORSHIP"];  
      this.DropDownListService.countryList().subscribe(data=>{this.countries  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.item_sl_no = 1;
      this.DropDownListService.citiNamesList().subscribe(data=>{this.cities  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.DropDownListService.employeeNamesList(this.Localcompany_id).subscribe(data=>{this.employeeNames = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.status =true;
    }

    showList(s:string)
    {
      
      if(this.companymastersave == true  && this.companymasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.item_sl_no=0;
          while(this.company_licence_details.length)
          this.company_licence_details.removeAt(0);
          this.add(); 
          this.company_licence_details.at(0).patchValue({sln_no:this.item_sl_no})
          this.DropDownListService.stateListByCountry(this.Country).subscribe(data=>
            {
              this.statesList = data;
              this.status = true;
            });
        }
      }
      if(this.companymastersave == true  && this.companymasterupdate == false)
      {
        if(s=="add")
      {
        this.isHidden=true;
        this.item_sl_no=0;
        while(this.company_licence_details.length)
        this.company_licence_details.removeAt(0);
        this.add(); 
        this.company_licence_details.at(0).patchValue({sln_no:this.item_sl_no})
        this.DropDownListService.stateListByCountry(this.Country).subscribe(data=>
          {
            this.statesList = data;
            this.status = true;
          });
      }
      }
     
      if(s=="list")
      {
        this.isHidden=false;
        this.companymastersave=true;
        while(this.company_licence_details.length)
        this.company_licence_details.removeAt(0);
        this.add(); 
        this.item_sl_no=0;
        this.userForm.reset();
        this.userForm.patchValue({country_name:"INDIA"});
        this.company_licence_details.at(0).patchValue({sln_no:this.item_sl_no})
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id:[''],
        company_id:[''],
        company_code:[''],
        comp_prefix:[''],
        company_name:[''],
        comp_mailing_name:[''],
        company_address:[''],
        company_type:[''],
        parent_company:[''],
        country_name:[''],
        state_name:[''],
        city_name:[''],
        pin_code:[''],
        office_contactno:[''],
        work_phoneno:[''],
        mobile_no:[''],
        email_id:[''],
        website_name:[''],
        fin_period_from:[''],
        fin_period_to:[''],
        work_address:[''],
        use_audit_feature:[''],
        decimal_place:[''],
        incometax_required:[''],
        // salestax_required:[''],
        // servicetax_required:[''],
        // roc_required:[''],
        tds_required:[''],
        maintain_licencedetails:[''],
        maintain_businessunit:[''],
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
        fin_year: [''],
        username: [''],
      
        company_licence_details: this.fb.array([this.fb.group({
          sln_no:'',
          licence_no:'',
          licence_name:'',
          expiry_date:'',
          remarks:''})])
      });
    }

    add()
    {
      this.item_sl_no =this.item_sl_no +1;
      this.company_licence_details.push(this.fb.group({
        sln_no:this.item_sl_no,	
        licence_no:'',
        licence_name:'',
        expiry_date:'',
        remarks:''}));
    }

    delete(index) 
    {
      if(this.item_sl_no > 1)
      {
        this.company_licence_details.removeAt(index);
        this.item_sl_no = this.item_sl_no - 1;
      }
      else
      {
        this.item_sl_no = 1;
        this.company_licence_details.reset();
        this.company_licence_details.at(0).patchValue({sln_no:  this.item_sl_no});
        alert("can't delete all rows");    
      } 

      for(let i=1; i<=this.item_sl_no; i++)
      this.company_licence_details.at(i-1).patchValue({sln_no: i});
    }

    statesList: any = [];
    onChangeCountry(country_name: String) 
    {
      this.userForm.patchValue({state_name: null, city_name: null});
      if (country_name != '0') 
      {
        this.status = false;
        this.DropDownListService.stateListByCountry(country_name).subscribe(data =>
        { 
          this.statesList = data;
          this.status = true;
        }); 
      }
    }

    search(event)
  {
    let serchText = event.target.value;
    if(event.key == "Enter")
    {
      this.status = false;
      if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
      {
        this.DropDownListService.findCompanys('0').subscribe(data=>
        {
          this.listCompany = data;
          this.status = true;
        });
      }
      else
      {
        this.DropDownListService.findCompanys(serchText).subscribe(data=>
        {
          this.listCompany = data;
          this.status = true;
        });  
        this.status = true;   
      }
    }
  }

  onDelete(id:any,company_id)
  {
    this.status = false;
    if(confirm("Are you sure to delete this Company ?"))
    { 
      this.userForm.patchValue({username: localStorage.getItem("username")});
      this.DropDownListService.checkMisleniousDeletation(company_id,"Company_Master").subscribe(checkCompanyData=> 
        {
        // alert("bidhan here::"+checkCompanyData.status);
         if(checkCompanyData.status=='No')
         {
          this.Service.deleteCompany(this.userForm.getRawValue(),id).subscribe(data=> 
            {
              console.log("Cat id:"+data.comp_prefix);
      
              if(data.comp_prefix=='' || data.comp_prefix==null)
              {
                alert("Opps!!! Can't delete this Company !!!");
              }else{
                alert("Company deleted successfully.");
              }
              this.status = true;
              this.ngOnInit()
            }); 
         }
         else{
          alert("This Company is Already Used,Can not be Deleted!! ");
         }
        });
    
    }  
    this.status = true;
  }

    Prefix:any;
    focusOutFunction()
    {
      this.Prefix= this.userForm.get("comp_prefix").value as FormControl;
      this.Prefix = this.Prefix.toUpperCase();

     if(this.Prefix.length >2 || this.Prefix.length<2)
      {  
        alert("Company Prefix Name Must be in 2 Character");
        this.userForm.patchValue({comp_prefix: null}); 
      }
      else
        {
          this.userForm.patchValue({comp_prefix:this.Prefix});
        }
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
        fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
      this.submitted = true;
      if(!this.userForm.valid) 
      {
        alert('Please fill all fields!')
        return false;
      } 
     else 
       {
        this.status  = false;
        if(this.userForm.get("company_name").value == '' || this.userForm.get("company_name").value == 0 || this.userForm.get("company_name").value == null)
        {
          alert("Please Enter Company Name");
          this.status=true;
        }
        else if(this.userForm.get("country_name").value == '' || this.userForm.get("country_name").value == 0 || this.userForm.get("country_name").value == null)
        {
          alert("Please Select Country Name");
          this.status=true;
        }
        else if(this.userForm.get("state_name").value == '' || this.userForm.get("state_name").value == 0 || this.userForm.get("state_name").value == null)
        {
          alert("Please Select State Name");
          this.status=true;
        }
        // else if(this.userForm.get("city_name").value == '' || this.userForm.get("city_name").value == 0 || this.userForm.get("city_name").value == null)
        // {
        //   alert("Please Enter City Name");
        //   this.status=true;
        // }
        else if(this.userForm.get("pan_no").value == '' || this.userForm.get("pan_no").value == 0 || this.userForm.get("pan_no").value == null)
        {
          alert("Please Enter Pan No. in Income Tax Info Block");
          this.status=true;
        }
        else if(this.userForm.get("pan_no").value.length!='10')
        {
          alert("Please Enter Valid PAN No. in Income Tax Info Block");
          this.status=true;
        }
        else if(this.userForm.get("tin_no").value == '' || this.userForm.get("tin_no").value == 0 || this.userForm.get("tin_no").value == null)
        {
          alert("Please Enter CIN No");
          this.status=true;
        }
        else
        {
          //starts here
         if(this.Id>0)
         {
           this.Service.updateCompany(this.userForm.getRawValue(), this.Id).subscribe(data => 
           {
             console.log(this.userForm.value);
             alert("Company Updated successfully.");
             // window.location.reload();
             this.userForm.reset();
             this.status = true;
             this.ngOnInit();
             this.isHidden=false;
             this.Country="INDIA";

             while(this.company_licence_details.length)
             this.company_licence_details.removeAt(0);
             this.add(); 
             this.company_licence_details.at(0).patchValue({sln_no:this.item_sl_no})
           }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
           this.ngOnInit()});
         }
         else
           {
             this.Service.createCompany(this.userForm.getRawValue()).subscribe(data => 
             {
               console.log(this.userForm.value);
               alert("Company Master created successfully.");
               // window.location.reload();
               this.userForm.reset();
               this.status = true;
               this.ngOnInit();
               this.isHidden=false;

               while(this.company_licence_details.length)
               this.company_licence_details.removeAt(0);
               this.add(); 
               this.Country="INDIA";
               this.company_licence_details.at(0).patchValue({sln_no:this.item_sl_no})
             }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
             this.ngOnInit()});
           } 
        //ends here 
        }
            
      }
     }

    // onUpdate(id:any,company_id:string)
    // {
    //     this.isHidden = true;
    //     this.Service.retriveCompany(id).subscribe(
    //     data=>{
    //       this.countryName = data["country_name"];
    //       this.onChangeCountry(this.countryName); 
    //       // this.onchangeState(data.state);
    //       // this.onchangeDistrict(data.district);
    //       this.userForm.patchValue(data);});
    
    //      this.Service.compLiceRetriveList(company_id).subscribe(data=>
    //       {
    //         this.add();
    //         while (this.company_licence_details.length) 
    //         { this.company_licence_details.removeAt(0);}
    //         for(let data1 of data)
    //         { this.add();}
    //         this.company_licence_details.patchValue(data);});                  
    // }

    onUpdate(id:any,company_id:string,action)
    {
      if(action =='update')
      {
        this.companymastersave=true;
      }
      else
      {
        this.companymastersave=false;
      }
      
      this.userForm.patchValue({id: id});
      this.status = false;    
      this.isHidden = true;
      forkJoin(
        this.Service.retriveCompany(id),
        this.Service.compLiceRetriveList(company_id),
      ).subscribe(([CompanyDetails, LicenceDetails])=>
        {
          console.log("LicenceDetails: "+ JSON.stringify(LicenceDetails))
          this.onChangeCountry(CompanyDetails["country_name"])
          this.userForm.patchValue(CompanyDetails);

          this.item_sl_no=0;
          while (this.company_licence_details.length ) 
          {this.company_licence_details.removeAt(0);}
          for(let i=0;i<LicenceDetails.length;i++)
          {this.add();}
          this.company_licence_details.patchValue(LicenceDetails);
          this.status = true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});
    }

  }
