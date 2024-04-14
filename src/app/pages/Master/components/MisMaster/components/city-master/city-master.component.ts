import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {FormBuilder,FormControl } from '@angular/forms';
import { city } from '../../../../../../models/PlaceModel/city';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

  @Component({
    selector: 'app-city-master',
    templateUrl: './city-master.component.html',
    styleUrls: ['./city-master.component.scss']
  })

  export class CityMasterComponent implements OnInit 
  {
    submitted = false;
    model: city = new city();
    public userForm:FormGroup;
    isHidden=false;
    Id: any;
    public searchText : string;
    countryname: any;
    statename: any;
    listcity: city[];
    countriesList:any = [];
    statesList:any = [];
    districtsList:any = [];
    status = false;
    Country="INDIA";
    citymastersave:boolean=true;
    citymasterupdate:boolean=true;
    citymasterdelete:boolean=true;
    citymasterview:boolean=true;
 
    constructor(private Service: Master, public fb:FormBuilder,
      private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group({
        id:[''],
        country_name: [''],
        state_code: [''],
        dist_code: [''], 
        city_name:[''],    
        company_id: [''],
        fin_year: [''],
        username: ['']});
    }

    get id(){ return this.userForm.get("id") as FormControl }
    get country_name(){ return this.userForm.get("country_name") as FormControl }
    get state_code(){ return this.userForm.get("state_code") as FormControl }
    get dist_code(){ return this.userForm.get("dist_code") as FormControl }
    get city_name(){ return this.userForm.get("city_name") as FormControl }

    ngOnInit() 
    {
      //For User Role
    let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
   
     this.citymastersave=false;
     this.citymasterupdate=false;
     this.citymasterdelete=false;
     this.citymasterview=false;
     
     if(accessdata.includes('city_master.save'))
     {
      this.citymastersave = true;
     }
    if(accessdata.includes('city_master.update'))
     { 
       this.citymasterupdate=true;
     }
     if(accessdata.includes('city_master.delete'))
     {
       this.citymasterdelete=true;
     }
     if(accessdata.includes('city_master.view'))
     {
       this.citymasterview=true;
     }
     
      this.userForm.patchValue({country_name:"INDIA"});
      this.Service.getCity().subscribe(data=>{this.listcity  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.DropDownListService.countryList().subscribe(data=>{this.countriesList  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.status = true;
    }
  
    showList(s:string)
    {
      if(this.citymastersave == true  && this.citymasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
      {
        this.userForm.patchValue({country_name:"INDIA"});
       
        this.isHidden=true;
        this.DropDownListService.stateListByCountry(this.Country).subscribe(data=>
          {
            this.statesList = data;
            this.status = true;
          });
      }
      }
      if(this.citymastersave == true  && this.citymasterupdate == false)
      {
        if(s=="add")
        {
          this.userForm.patchValue({country_name:"INDIA"});
         
          this.isHidden=true;
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
        this.citymastersave=true;
        this.userForm.reset();
        this.userForm.patchValue({country_name:"INDIA"});
        // this.userForm.get("state_name").reset();
        // this.userForm.get("dist_name").reset();
        // this.userForm.get("city_name").reset();
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id:[''],
        country_name: [''],
        state_code: [''],
        dist_code: [''], 
        city_name:[''],    
        company_id: [''],
        fin_year: [''],
        username: ['']});
    }

    selectedDist:any=[];
    onChangeCountry(country_name)
    {
      this.statesList = [], this.districtsList = [];
      this.userForm.patchValue({state_code: null, dist_code: null});
      if(country_name.length)
      {
        this.status = false
        this.DropDownListService.stateListByCountry(country_name).subscribe(data=>
        {
          this.statesList = data;
          this.status = true;
        });
      }
    }

    onChangeState(state_name)
    {
      this.districtsList = [];
      this.userForm.patchValue({dist_code: null})
      if(state_name.length)
      {
        this.status = false;
        this.DropDownListService.getDistrictThruState(state_name).subscribe(data=>
        {
          this.districtsList  = data;
          this.status = true;
        });
      
      }
    }

    onUpdate(id:any,action)
    {
      if(action =='update')
      {
        this.citymastersave=true;
      }
      else
      {
        this.citymastersave=false;
      }
      //tuhin here // this.citymastersave=true;
      this.isHidden = true;
      this.status = false;
      this.selectedDist = [];
      this.Service.retriveCity(id).subscribe(data=>
      { 
        this.countryname = data["country_name"];
        this.onChangeCountry(this.countryname); 
        this.selectedDist = data["dist_code"]
        this.DropDownListService.getDistrictThruState(data["state_code"]).subscribe(data=>
          {
            this.districtsList  = data;
            this.status = true;
          });
        this.userForm.patchValue(data); 
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
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
          this.DropDownListService.findCities('0').subscribe(data=>
          {
            this.listcity = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findCities( serchText).subscribe(data=>
          {
            this.listcity = data;
            this.status = true;
          });     
        }
      }
    }

    onDelete(id:any)
    {
      this.status = false;
      if(confirm("Are you sure to delete this City ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.Service.deleteCity(this.userForm.getRawValue(),id).subscribe(data=> 
        {
          console.log("city_name :"+data.city_name);
          if(data.city_name=='' || data.city_name==null)
          {
            alert("Opps!!! Can't delete this City !!!");
          }else{
            alert("City Deleted successfully.");
          }
          this.status = true;
          this.ngOnInit()
        }); 
      }  
      this.status = true;
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
        if(this.userForm.get("city_name").value == '' || this.userForm.get("city_name").value == 0 || this.userForm.get("city_name").value == null)
        {
          alert("Please Enter City Name");
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
        else
        {
          if(this.Id>0)
          {
            this.status = false;
            this.Service.updateCity(this.userForm.getRawValue(), this.Id).subscribe(data => 
            {
              console.log(this.userForm.value);
              alert("City Master Updated successfully.");
              //window.location.reload();
              this.userForm.reset();
              this.status = true;
              this.ngOnInit();
              this.isHidden = false;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});
          }
          else
            {
              this.status = false;
              this.Service.createCity(this.userForm.getRawValue()).subscribe(data => 
              {
                console.log(this.userForm.value);
                alert("New City Master created successfully.");
                //window.location.reload();
                this.userForm.reset();
                this.status = true;
                this.ngOnInit();
                this.isHidden = false;          
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
              this.ngOnInit()});
            }
        }
        
      }
    }

  }
