import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {FormBuilder,FormControl } from '@angular/forms';
import { district } from '../../../../../../models/PlaceModel/district';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
  
  @Component({
    selector: 'app-district-master',
    templateUrl: './district-master.component.html',
    styleUrls: ['./district-master.component.scss']
  })

  export class DistrictMasterComponent implements OnInit 
  {
    submitted = false;
    model: district = new district();
    public userForm:FormGroup;
    isHidden=false;
    countryname: any; 
    Id: any;
    public searchText : string;
    Country="INDIA";
    listdistrict: district[];
    states:any = [];
    countries:{};
    status = false;
    districtmastersave:boolean=true;
    districtmasterupdate:boolean=true;
    districtmasterdelete:boolean=true;
    districtmasterview:boolean=true;

    constructor(private Service: Master, public fb:FormBuilder,
      private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group({  
        id: [''],
        country: [''],
        state_code: [''],
        dist_name: [''],     
        company_id: [''],
        fin_year: [''],
        username: ['']})
   }
    get id(){ return this.userForm.get("id") as FormControl }
    get country(){ return this.userForm.get("country") as FormControl }
    get state_code(){ return this.userForm.get("state_code") as FormControl }
    get dist_name(){ return this.userForm.get("dist_name") as FormControl }
    
    ngOnInit() 
    {
      //For User Role
      let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));

     this.districtmastersave=false;
     this.districtmasterupdate=false;
     this.districtmasterdelete=false;
     this.districtmasterview=false;
     
     if(accessdata.includes('district_master.save'))
     {
      this.districtmastersave = true;
     }
    if(accessdata.includes('district_master.update'))
     { 
       this.districtmasterupdate=true;
     }
     if(accessdata.includes('district_master.delete'))
     {
       this.districtmasterdelete=true;
     }
     if(accessdata.includes('district_master.view'))
     {
       this.districtmasterview=true;
     }

     
      this.userForm.patchValue({country:"INDIA"});
      this.Service.getDistrict().subscribe(data=>{this.listdistrict  = data;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.DropDownListService.countryList().subscribe(data=>{this.countries  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.status = true;
    }
    
    showList(s:string)
    {
      if(this.districtmastersave == true  && this.districtmasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.userForm.patchValue({country:"INDIA"});      
          this.isHidden=true;
          this.DropDownListService.stateListByCountry(this.Country).subscribe(data=>
            {
              this.states = data;
              console.log(JSON.stringify("get state: "+data));
              this.status = true;
            });
        }
      }
      if(this.districtmastersave == true  && this.districtmasterupdate == false)
      {
        if(s=="add")
        {
          this.userForm.patchValue({country:"INDIA"});      
          this.isHidden=true;
          this.DropDownListService.stateListByCountry(this.Country).subscribe(data=>
            {
              this.states = data;
              console.log(JSON.stringify("get state: "+data));
              this.status = true;
            });
        }
      }
      
      if(s=="list")
      {
        this.isHidden=false;
        this.districtmastersave=true;
        this.userForm.reset();
        this.userForm.patchValue({country:"INDIA"});
       // console.log(JSON.stringify(data));
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id: [''],
        country: [''],
        state_code: [''],
        dist_name: [''],     
        company_id: [''],
        fin_year: [''],
        username: ['']});
    }

    onchangeCountry(country_name)
    {
      this.states = [];
      if(country_name.length)
      {
        this.status = false;
        this.DropDownListService.stateListByCountry(country_name).subscribe(data=>
        {
          console.log("get state: "+JSON.stringify(data));
          this.states  = data;
          this.status = true;
        });  
      }
    }

    onUpdate(id:any,action)
    {
      if(action == 'update')
      {
        this.districtmastersave=true;
      }
      else
      {
        this.districtmastersave=false;
      }
      //tuhin here // this.districtmastersave=true;
      this.isHidden = true;
      this.status = false;
    
      this.Service.retriveDistrict(id).subscribe(data=>
      { 
        this.countryname = data["country"];
        this.onchangeCountry(this.countryname); 
       // this.userForm.patchValue(data); 
        // console.log("get state: "+data["state_code"].trim()+","+JSON.stringify(data));
        this.userForm.patchValue({id:data["id"],state_code:data["state_code"].trim(),country:data["country"],dist_name:data["dist_name"],company_id:["company_id"],
          fin_year:data["fin_year"],username:["username"]});
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
    }

    send()
    {
      this.Id= this.userForm.get("id").value as FormControl;
      this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
        fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
      this.submitted = true;
      if(this.userForm.get("state_code").value == null || this.userForm.get("state_code").value == 0 || this.userForm.get("state_code").value =='') 
      {
        alert("Please Select State Name");
        this.status=true;
      } 
      else if(this.userForm.get("dist_name").value == null || this.userForm.get("dist_name").value == 0 || this.userForm.get("dist_name").value =='') 
      {
        alert("Please Enter District Name");
        this.status=true;
      } 
      else 
      {
        if(this.Id>0)
          {
            this.status = false;
            this.Service.updateDistrict(this.userForm.getRawValue(), this.Id).subscribe(data => 
            {
              console.log(this.userForm.value);
              alert("District Updated successfully.");
              this.userForm.reset();
              //refresh List;
              this.ngOnInit();
              this.isHidden = false;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});  
          }

          else
            {
              this.status = false;
              this.Service.createDistrict(this.userForm.getRawValue()).subscribe(data => 
              {
                console.log(this.userForm.value);
                alert("New District created successfully.");
                this.userForm.reset();
                //refresh List;
                this.ngOnInit();
                this.isHidden = false;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
              this.ngOnInit()}); 
            }
      }   
    }

    company_name:any;
    search(event)
    {
      this.company_name = localStorage.getItem("company_name");
      let serchText = event.target.value;
      if(event.key == "Enter")
      {
        this.status = false;
        if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
        {
          this.DropDownListService.findDistricts( '0').subscribe(data=>
          {
            this.listdistrict = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findDistricts( serchText).subscribe(data=>
          {
            this.listdistrict = data;
            this.status = true;
          });     
        }
      }
    }

    onDelete(id:any,dist_code)
    {
      this.status = false;
      if(confirm("Are you sure to delete this District ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.DropDownListService.checkMisleniousDeletation(dist_code,"districtMaster").subscribe(checkBUData=> 
          {
         // alert("check::"+checkBUData.status)
           if(checkBUData.status=='No')
           {
            this.Service.deleteDistrict(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                //console.log("dist_name :"+JSON.stringify(data)+"/////"+data.dist_name);
                if(data.dist_name=='' || data.dist_name==null)
                {
                  alert("Opps!!! Can't delete this District !!!");
                }else{
                  alert("District Deleted successfully.");
                }
                this.status = true;
                this.ngOnInit()
              });
           }
           else{
            alert("This District is Already Used,Can not be Deleted!! ");
           }
          }); 
      }  
      this.status = true;
    }

  }
