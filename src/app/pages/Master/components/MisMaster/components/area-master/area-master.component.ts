import { Component, OnInit } from '@angular/core';
import { area } from '../../../../../../Models/PlaceModel/area';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

  @Component({
    selector: 'app-area-master',
    templateUrl: './area-master.component.html',
    styleUrls: ['./area-master.component.scss']
  })

  export class AreaMasterComponent implements OnInit 
  {
    submitted = false;
    model: area = new area();
    public userForm:FormGroup;
    listarea: area[];
    isHidden=false;
    status = false;
    Id:any;
    countriesList:any = [];
    statesList:any = [];
    districtsList:any = [];
    CityList:any = [];
    Country="INDIA";
    areamastersave:boolean=true;
    areamasterupdate:boolean=true;
    areamasterdelete:boolean=true;
    areamasterview:boolean=true;

    constructor(private Service: Master,
                private DropDownListService: DropdownServiceService,
                public fb:FormBuilder) 
    { 
      this.userForm=fb.group({ 
        id: [''],
        area_name: [''],
        description: [''],
        city_name: [''],
        city_code: [''],
        dist_code:[''],     
        country_name: [''],
        state_code: [''],
        state_name: [''],
        dist_name: [''],
        company_id: [''],
        fin_year:[''],
        username:[''],   
      });
    }

    get id(){ return this.userForm.get("id") as FormControl }
    get area_name(){ return this.userForm.get("area_name") as FormControl }
    get description(){ return this.userForm.get("description") as FormControl }
    get city_name(){ return this.userForm.get("city_name") as FormControl }
    get city_code(){ return this.userForm.get("city_code") as FormControl }
    get dist_code(){ return this.userForm.get("dist_code") as FormControl }
    get country_name(){ return this.userForm.get("country_name") as FormControl }
    get state_code(){ return this.userForm.get("state_code") as FormControl }
    get state_name(){ return this.userForm.get("state_name") as FormControl }
    get dist_name(){ return this.userForm.get("dist_name") as FormControl }
    get company_id(){ return this.userForm.get("company_id") as FormControl }
    get fin_year(){ return this.userForm.get("fin_year") as FormControl }
    get username(){ return this.userForm.get("username") as FormControl }

    ngOnInit() 
    {
      //For User Role
    let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
     
     this.areamastersave=false
     this.areamasterupdate=false
     this.areamasterdelete=false
     this.areamasterview=false;

     if(accessdata.includes('area_master.save'))
     {
      this.areamastersave = true;
     }
    if(accessdata.includes('area_master.update'))
     { 
       this.areamasterupdate=true;
     }
     if(accessdata.includes('area_master.delete'))
     {
       this.areamasterdelete=true;
     }
     if(accessdata.includes('area_master.view'))
     {
       this.areamasterview=true;
     }

    
      this.userForm.patchValue({country_name:"INDIA"});
      this.Service.getAreaMaster().subscribe(data=>{this.listarea  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.DropDownListService.countryList().subscribe(data=>{this.countriesList  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.status = true;
    }

    showList(s:string)
    {
      if(this.areamastersave == true  && this.areamasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {     
          this.isHidden=true;
          this.userForm.patchValue({country_name:"INDIA"});
          this.DropDownListService.stateListByCountry(this.Country).subscribe(data=>
            {
              this.statesList = data;
              this.status = true;
            });
        }
      }
      if(this.areamastersave == true  && this.areamasterupdate == false)
      {
        if(s=="add")
        {     
          this.isHidden=true;
          this.userForm.patchValue({country_name:"INDIA"});
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
        this.areamastersave =true;
        this.userForm.reset();
        this.userForm.patchValue({country_name:"INDIA"});
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id: [''],
        area_name: [''],
        description: [''],
        city_name: [''],
        city_code: [''],
        dist_code:[''],     
        country_name: [''],
        state_code: [''],
        state_name: [''],
        dist_name: [''],
        company_id: [''],
        fin_year:[''],
        username:[''], 
      });
    }
    getAreaDuplicate()
    {
      
      this.Service.getAreaMaster().subscribe(data=>
        {
          this.status=false;
          data.forEach(element => {
            if(element["area_name"]==this.userForm.get("area_name").value.toUpperCase())
            {
              alert("Duplicate Area Name "+this.userForm.get("area_name").value.toUpperCase()+" ,Please Change...")
              this.userForm.patchValue({area_name:''});
              this.status=true;
            }
            else{
              this.status=true;
            }
          });
        });
      
    }
    search(event)
    {
      let serchText = event.target.value;
      if(event.key == "Enter")
      {
        this.status = false;
        if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
        {
          this.DropDownListService.findArea('0').subscribe(data=>
          {
            this.listarea = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findArea(serchText).subscribe(data=>
          {
            this.listarea = data;
            this.status = true;
          });     
        }
      }
    }
  
    onDelete(id:any,area_id)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Area ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.DropDownListService.checkMisleniousDeletation(area_id,"areaMaster").subscribe(checkBUData=> 
          {
         // alert("check::"+checkBUData.status)
           if(checkBUData.status=='No')
           {
            this.Service.deleteArea(this.userForm.getRawValue(),id).subscribe(data=> 
              {     
                console.log("Cat area_name:"+data.area_name);
        
                if(data.area_name=='' || data.area_name==null)
                {
                  alert("Opps!!! Can't delete this Area !!!");
                }else{
                  alert("Area deleted successfully.");
                }
                this.status = true;
                this.ngOnInit()
              });
           }
           else{
            alert("This Area is Already Used,Can not be Deleted!! ");
           }
          }); 
      }  
      this.status = true;
    }

    onChangeCountry(country_name: String)
    {
      this.statesList = [], this.districtsList = [], this.CityList = [];
      this.userForm.patchValue({state_code: null, dist_code: null,city_code:null});
      if(country_name.length && country_name != "0")
      {
        this.status = false
        this.DropDownListService.stateListByCountry(country_name).subscribe(data=>
        {
          this.statesList = data;
          this.status = true;
        });
      }
    }

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
    citiNames:any=[];
    selectedCity:any=[];
    selectedDist:any=[];
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

    onChangeDist1(dist_id)
    {
        this.status = false;
        this.DropDownListService.getCityListThruDistrict(dist_id).subscribe(data=>
        {
          this.citiNames = data;
          this.status = true;
        });    
     
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
        if(this.userForm.get("country_name").value == '' || this.userForm.get("country_name").value == 0 || this.userForm.get("country_name").value == null)
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
        // else if(this.userForm.get("city_code").value == '' || this.userForm.get("city_code").value == 0 || this.userForm.get("city_code").value == null)
        // {
        //   alert("Please Enter City Name");
        //   this.status=true;
        // }
        else if(this.userForm.get("area_name").value == '' || this.userForm.get("area_name").value == 0 || this.userForm.get("area_name").value == null)
        {
          alert("Please Enter Area Name");
          this.status=true;
        }
        else
        {
          if(this.Id>0)
          {
            this.status = false;
            this.Service.updateAreaMaster(this.userForm.getRawValue(), this.Id).subscribe(data => 
            {
              console.log(this.userForm.value);
              alert("Area Master updated successfully.");
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
              this.Service.createAreaMaster(this.userForm.getRawValue()).subscribe(data => 
              {
                console.log(this.userForm.value);
                alert("New Area Master created successfully.");
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

    onUpdate(id:any,action)
    {
      if(action=='update')
      {
        this.areamastersave=true;
      }
      else
      {
        this.areamastersave=false;
      }
      //tuhin here // this.areamastersave=true;
      this.isHidden = true;
      this.status = false;
      this.showList("add");
      this.selectedCity = [];
      this.selectedDist = [];
      this.Service.retriveAreaMaster(id).subscribe(data=>
      {  
        console.log("Dta: "+ JSON.stringify(data))    
        this.selectedCity = data["city_code"];
        this.selectedDist = data["dist_code"];

        this.DropDownListService.stateListByCountry(data.country_name).subscribe(data=>
          {
            this.statesList = data;
            this.status = true;
          });

          this.DropDownListService.getDistrictThruState(data.state_code).subscribe(data=>
            {
    
              this.districtsList  = data;
              this.status = true;
            }); 

        this.DropDownListService.getCityListThruDistrict(data["dist_code"]).subscribe(data=>
          {
            this.citiNames = data;
            this.status = true;
          });  
        this.userForm.patchValue({id:data.id,country_name:data.country_name,state_code:data.state_code,dist_code:data.dist_code,dist_name:data.dist_name,
          company_id:data.company_id,fin_year:data.fin_year,username:data.username,area_name:data.area_name,description:data.description,city_code:data.city_code}); 
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
    }
  }
