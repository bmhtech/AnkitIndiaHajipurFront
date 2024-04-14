
import { Component, OnInit } from '@angular/core';
import { wareHouse } from '../../../../../../../../src/app/Models/InventoryModel/ware-house-master';
import { Master } from '../../../../../../service/master.service';
import { FormGroup, FormBuilder,FormControl, FormArray } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { forkJoin } from 'rxjs';

  @Component({
    selector: 'app-ware-house-master',
    templateUrl: './ware-house-master.component.html',
    styleUrls: ['./ware-house-master.component.scss']
  })

  export class WareHouseMasterComponent implements OnInit 
  {
    submitted = false;
    Id: any;
    public userForm:FormGroup;
    wareHouse: wareHouse = new wareHouse();
    bUnitCodes:{};
    listwareHouse : wareHouse[];
    status = false;
    countryName: any;
    financialYear:any;
    seq_no:string;
    countries:any = [];
    selectedDist:any=[];
    selectedCity:any=[];
    customUOMs:any=[];
    company_name:any;
    citiNames:{};
    Country="INDIA";
    states:any = [];
    isHidden = false;
    warehousemastersave:boolean = true;
    warehousemasterupdate:boolean = true;
    warehousemasterdelete:boolean = true;
    warehousemasterview:boolean=true;
    stack_sl_no=1;
    showstackdetails:boolean=false;

    constructor(private Service: Master, public fb:FormBuilder,
      private DropDownListService: DropdownServiceService)
    {
      this.userForm=fb.group({ 
        id: [''],      
        warehouse_code: [''],
        warehouse_name: [''],
        state_code:[''],
        warehouse_active: [''],     
        warehouse_remarks: [''],
        city_code:[''],
        businessunit_code: [''],
        maintain_stack: [''],        
        warehouse_address: [''],
        country_name: [''],
        state_name: [''],
        city_name: [''],
        dist_code:[''],
        pin_code: [''], 
        company_id: [''],
        fin_year: [''],
        username: [''],

        warehouse_stack_dtls: this.fb.array([this.fb.group({
          slno: this.stack_sl_no,
          stack_no: '',	
          packing_qty: '',	
          packing_uom: '',	
          item_qty: '',
          item_uom: '',
          opening_packing_qty: '',
          opening_item_qty: '',
          stack_date: '' 
         
        })])
      
      });
    }//warehouse_stack_dtls
    
    get id(){ return this.userForm.get("id") as FormControl }
    get warehouse_code(){ return this.userForm.get("warehouse_code") as FormControl }
    get warehouse_name(){ return this.userForm.get("warehouse_name") as FormControl }
    get warehouse_active(){ return this.userForm.get("warehouse_active") as FormControl }
    get warehouse_remarks(){ return this.userForm.get("warehouse_remarks") as FormControl }  
    get city_code(){ return this.userForm.get("city_code") as FormControl }
    get dist_code(){ return this.userForm.get("dist_code") as FormControl }
    get businessunit_code(){ return this.userForm.get("businessunit_code") as FormControl }
    get state_code(){ return this.userForm.get("state_code") as FormControl }
    get maintain_stack(){ return this.userForm.get("maintain_stack") as FormControl }
    get warehouse_address(){ return this.userForm.get("warehouse_address") as FormControl }
    get country_name(){ return this.userForm.get("country_name") as FormControl }
    get state_name(){ return this.userForm.get("state_name") as FormControl }
    get city_name(){ return this.userForm.get("city_name") as FormControl }
    get pin_code(){ return this.userForm.get("pin_code") as FormControl }

    get warehouse_stack_dtls(){return this.userForm.get("warehouse_stack_dtls") as FormArray};

    ngOnInit() 
    {
      //For User Role
    let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
   
     this.warehousemastersave=false;
     this.warehousemasterupdate=false;
     this.warehousemasterdelete =false;
     this.warehousemasterview = false;

          if(accessdata.includes('warehouse_master.save'))
           {
            this.warehousemastersave = true;
           }
          if(accessdata.includes('warehouse_master.update'))
           { 
             this.warehousemasterupdate=true;
           }
           if(accessdata.includes('warehouse_master.delete'))
           {
             this.warehousemasterdelete=true;
           }
           if(accessdata.includes('warehouse_master.view'))
           {
            this.warehousemasterview=true;
           }

     
      this.company_name = localStorage.getItem("company_name");
      this.financialYear = localStorage.getItem("financial_year");
      this.stack_sl_no = 1;
      this.userForm.patchValue({country_name:"INDIA",businessunit_code:"0"})
      this.Service.getWarehouses().subscribe(data=>{this.listwareHouse  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.DropDownListService.getSequenceId("WH-"+this.financialYear+"-").subscribe(data=>{this.seq_no = data.sequenceid;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()}); 
      this.DropDownListService.bUnitList(this.company_name).subscribe(data=>{this.bUnitCodes = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.DropDownListService.countryList().subscribe(data=>{this.countries  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.DropDownListService.getWeighmentCustomUOM().subscribe(data=>{this.customUOMs  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      
      this.status = true;
    }

    showList(s:string)
    {
      if(this.warehousemastersave == true  && this.warehousemasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.stack_sl_no=0;
          while(this.warehouse_stack_dtls.length)
          this.warehouse_stack_dtls.removeAt(0);
          this.add(); 
          this.warehouse_stack_dtls.at(0).patchValue({sln_no:this.stack_sl_no})
          this.userForm.patchValue({country_name:"INDIA",businessunit_code:"0"});
          this.DropDownListService.stateListByCountry(this.Country).subscribe(data=>
            {
              this.states = data;
              this.status = true;
            });
        }
      }
      if(this.warehousemastersave == true  && this.warehousemasterupdate == false)
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.stack_sl_no=0;
          while(this.warehouse_stack_dtls.length)
          this.warehouse_stack_dtls.removeAt(0);
          this.add(); 
          this.warehouse_stack_dtls.at(0).patchValue({sln_no:this.stack_sl_no})
          this.userForm.patchValue({country_name:"INDIA",businessunit_code:"0"});
          this.DropDownListService.stateListByCountry(this.Country).subscribe(data=>
            {
              this.states = data;
              this.status = true;
            });
        }
      }
     
      if(s=="list")
      {
        this.isHidden=false;
        this.showstackdetails=false;
        //console.log("1");
        this.stack_sl_no=0;
        while(this.warehouse_stack_dtls.length)
        this.warehouse_stack_dtls.removeAt(0);
        //console.log("2");
        this.add();
        //console.log("3"); 
        this.userForm.reset();
        this.warehouse_stack_dtls.at(0).patchValue({sln_no:this.stack_sl_no})
        this.userForm.patchValue({country_name:"India"});
        this.DropDownListService.getSequenceId("WH-"+this.financialYear+"-").subscribe(data=>{this.seq_no = data.sequenceid;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});
        this.userForm.patchValue({warehouse_code:this.seq_no,country_name:"India",businessunit_code:"0"});
      }
    }

    add() 
    {
      this.stack_sl_no =this.stack_sl_no +1;
      this.warehouse_stack_dtls.push(this.fb.group({
        sl_no:this.stack_sl_no,
        stack_no:'',
        packing_qty:'',
        packing_uom:'',
        item_qty:'',
        item_uom:'',
        opening_packing_qty: '',
        opening_item_qty: '',
        stack_date: '' }));
    }

  delete(index) 
    {
      if(this.stack_sl_no > 1)
      {
        this.warehouse_stack_dtls.removeAt(index);
        this.stack_sl_no = this.stack_sl_no - 1;
      }
      else
      {
        this.stack_sl_no = 1;
        this.warehouse_stack_dtls.reset();
        
        this.warehouse_stack_dtls.at(0).patchValue({sl_no:this.stack_sl_no});
        alert("Can't Delete All Rows");
      } 

      for(let i=1; i<=this.stack_sl_no; i++)
      this.warehouse_stack_dtls.at(i-1).patchValue({sl_no: i});
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id: [''],      
        warehouse_code: [''],
        warehouse_name: [''],
        warehouse_active: [''],     
        warehouse_remarks: [''],
        businessunit_code: [''],
        maintain_stack: [''],        
        warehouse_address: [''],
        country_name: [''],
        state_name: [''],
        state_code: [''],
        city_name: [''],
        city_code: [''],
        dist_code:[''],
        pin_code: [''], 
        company_id: [''],
        fin_year: [''],
        username: [''],
      
        warehouse_stack_dtls: this.fb.array([this.fb.group({
          slno: '',
          stack_no: '',	
          packing_qty: '',	
          packing_uom: '',	
          item_qty: '',
          item_uom: '',
          opening_packing_qty: '',
          opening_item_qty: '',
          stack_date: ''  
         
        })])

      });

        
    }

    onChangeCountry(country_name)
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

    onDelete(id:any,warehouse_code,warehouse_id:string)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Warehouse ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.DropDownListService.checkMisleniousDeletation(warehouse_code,"wareHouese").subscribe(checkBUData=> 
          {
          //alert("check::"+JSON.stringify(checkBUData))
           if(checkBUData.status=='No')
           {
            this.Service.deleteWarehouse(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                console.log("warehouse_name :"+data.warehouse_name);
                if(data.warehouse_name=='' || data.warehouse_name==null)
                {
                  alert("Opps!!! Can't delete this Warehouse !!!");
                }else{
                  alert("Warehouse Deleted successfully.");
                }
                this.status = true;
                this.ngOnInit()
              }); 
           }
           else{
            alert("This Warehouse is Already Used,Can not be Deleted!! ");
           }
          });
      }  
      this.status = true;
    }

    search(event)
    {
      let serchText = event.target.value;
      if(event.key == "Enter")
      {
        this.status = false;
        if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
        {
          this.DropDownListService.findWarehouse('0').subscribe(data=>
          {
            this.listwareHouse= data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findWarehouse(serchText).subscribe(data=>
          {
            this.listwareHouse = data;
            this.status = true;
          });     
        }
      }
    }

    onUpdate(id:any,warehouse_id:string,action)
    {
      if(action=='update')
      {
        this.warehousemastersave=true;
      }
      else
      {
        this.warehousemastersave=false;
      }
     //tuhin here //this.warehousemastersave=true;
      this.isHidden = true;
      this.status = false;
      this.selectedCity = [];
      this.selectedDist = [];
      forkJoin
      (
      this.Service.retriveWarehouse(id),
      this.Service.retriveWarehouseStackDtls(warehouse_id),
      this.DropDownListService.getWeighmentCustomUOM()
      )
      .subscribe(([data,stackData,uomdata])=>
      {
        
        this.selectedCity = data["city_code"];
        this.selectedDist = data["dist_code"];
        this.customUOMs  = uomdata;

       
        if(data["maintain_stack"] == true)
      {
           this.showstackdetails=true;
      }
      else
      {
        this.showstackdetails=false;
      }
    
        this.DropDownListService.stateListByCountry(data.country_name).subscribe(data=>
          {
            this.states = data;
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
        // this.countryName = data["country_name"];
        // this.onChangeCountry(this.countryName); 
        this.userForm.patchValue(data); 

        this.add();
        this.stack_sl_no=0;
        while(this.warehouse_stack_dtls.length)
        this.warehouse_stack_dtls.removeAt(0);
        for(let stack of stackData)
        this.add();
        this.warehouse_stack_dtls.patchValue(stackData);
        this.status = true;
      }, 
      (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
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
        if(this.userForm.get("warehouse_name").value == '' || this.userForm.get("warehouse_name").value == 0 || this.userForm.get("warehouse_name").value == null)
        {
          alert("Please Enter WareHouse Name");
          this.status=true;
        }
        else if(this.userForm.get("warehouse_address").value == '' || this.userForm.get("warehouse_address").value == 0 || this.userForm.get("warehouse_address").value == null)
        {
          alert("Please Enter WareHouse Address");
          this.status=true;
        }
        else if(this.userForm.get("businessunit_code").value == '' || this.userForm.get("businessunit_code").value == 0 || this.userForm.get("businessunit_code").value == null)
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
        // else if(this.userForm.get("city_code").value == '' || this.userForm.get("city_code").value == 0 || this.userForm.get("city_code").value == null)
        // {
        //   alert("Please Enter City Name");
        //   this.status=true;
        // }
        else
        {
          //starts here
            if(this.Id>0) 
            {
              this.Service.updateWarehouse(this.userForm.getRawValue(), this.Id).subscribe(data => 
              {
                console.log(this.userForm.value);
                alert("Warehouse Updated successfully.");
                this.userForm.reset();
                this.status = true;
                this.ngOnInit();
                this.isHidden=false;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
              this.ngOnInit()});
            }
          else
            {
              this.Service.createWarehouse(this.userForm.getRawValue()).subscribe(data => 
              {
                console.log(this.userForm.value);
                alert("Warehouse Master created successfully.");
                this.userForm.reset();
                this.status = true;
                this.ngOnInit();
                this.isHidden = false;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
              this.ngOnInit()});
            }
          //ends here
        }
      
      }
    }
    
    stackdetails(event)
    {
      if(event.checked == true)
      {
           this.showstackdetails=true;
      }
      else
      {
        this.showstackdetails=false;
      }
    
    }
    
  }
