import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Bin } from '../../../../../../Models/InventoryModel/Bin';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Console } from 'console';
import { forkJoin } from 'rxjs';

  @Component({
    selector: 'app-bin-master',
    templateUrl: './bin-master.component.html',
    styleUrls: ['./bin-master.component.scss']
  })

  export class BinMasterComponent implements OnInit 
  {  
    submitted = false;
    public userForm:FormGroup;
    Bin: Bin = new Bin();
    listBin: Bin[];
    Id: any;
    bUnitCodes:any=[];
    company_name:any;
    buisnesscode:string
    wareHouseCodes:any=[];
    binTypeList:any=[];
    warehouseCode:any=[];
    isHidden=false;
    status = false;
    binmastersave:boolean = true;
    binmasterupdate:boolean = true;
    binmasterdelete:boolean=true;
    binmasterview:boolean=true;

    constructor(private Service: Master, public fb:FormBuilder,
      private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group
      ({
        id: [''], 
        bin_description: [''],
        warehouse_name: [''],
        businessunit_code: [''],
        businessunit_name: [''],        
        bin_active: [''],
        bin_type: [''],
        empty_bin_height: [''],
        empty_bin_length: [''],
        bin_volume: [''],
        bin_capacity_kg: [''],
        bin_code: [''],
        warehouse_code:[''],
        company_id: [''],
        fin_year: [''],
        username:['']});
    }

    get id(){ return this.userForm.get("id") as FormControl }
    get bin_description(){ return this.userForm.get("bin_description") as FormControl }
    get warehouse_code(){ return this.userForm.get("warehouse_code") as FormControl }
    get warehouse_name(){ return this.userForm.get("warehouse_name") as FormControl }
    get businessunit_code(){ return this.userForm.get("businessunit_code") as FormControl }
    get businessunit_name(){ return this.userForm.get("businessunit_name") as FormControl }
    get bin_active(){ return this.userForm.get("bin_active") as FormControl }
    get bin_type(){ return this.userForm.get("bin_type") as FormControl }
    get empty_bin_height(){ return this.userForm.get("empty_bin_height") as FormControl }
    get empty_bin_length(){ return this.userForm.get("empty_bin_length") as FormControl }
    get bin_volume(){ return this.userForm.get("bin_volume") as FormControl }
    get bin_capacity_kg(){ return this.userForm.get("bin_capacity_kg") as FormControl }
    get bin_code(){ return this.userForm.get("bin_code") as FormControl }

    ngOnInit() 
    {
      //For User Role
    let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));

     this.binmastersave=false;
     this.binmasterupdate=false;
     this.binmasterdelete=false;
     this.binmasterview=false;

     if(accessdata.includes('bin_master.save'))
     {
      this.binmastersave = true;
     }
    if(accessdata.includes('bin_master.update'))
     { 
       this.binmasterupdate=true;
     }
     if(accessdata.includes('bin_master.delete'))
     {
       this.binmasterdelete=true;
     }
     if(accessdata.includes('bin_master.view'))
     {
       this.binmasterview=true;
     }
     
      this.company_name = localStorage.getItem("company_name");
      forkJoin(
        this.Service.getBin(),
        this.DropDownListService.bUnitList(this.company_name),
        this.DropDownListService.bingroupList()
      ).subscribe(([bindata,budata,groupdata])=>
      {
        //console.log("groupdata:"+JSON.stringify(groupdata))
        this.listBin=bindata;
        this.bUnitCodes=budata;
        this.binTypeList=groupdata;
      });
      this.status = true;
    }

    showList(s:string)
    {
      if(this.binmastersave == true  && this.binmasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.reset(this.ResetAllValues().value);
        }
      }
      if(this.binmastersave == true  && this.binmasterupdate == false)
      {
        if(s=="add")
      {
        this.isHidden=true;
        this.userForm.reset(this.ResetAllValues().value);
      }
      }
      
      if(s=="list")
      {
        this.isHidden=false;
        this.binmastersave = true;
        this.userForm.reset(this.ResetAllValues().value);
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id: [''], 
        bin_description: [''],
        warehouse_name: [''],
        businessunit_code: [''],
        businessunit_name: [''],        
        bin_active: [''],
        bin_type: [''],
        empty_bin_height: [''],
        empty_bin_length: [''],
        bin_volume: [''],
        bin_capacity_kg: [''],
        bin_code: [''],
        warehouse_code:[''],
        company_id: [''],
        fin_year: [''],
        username: ['']});
    }
 
    onChangeBUnitName(businessunit_code)
    {
      if(businessunit_code.length)
      { 
        this.DropDownListService.getWHListbyBUnit(businessunit_code).subscribe(data=>
          {
            console.log("data "+JSON.stringify(data))
            this.warehouseCode = data;
          }); 
      }
    }

    onChangeWareHouseName(warehouse_code: String)
    {
      if(warehouse_code != '0')
      {
        this.status = false;
        this.DropDownListService.nameListByWreHouseCode(warehouse_code).subscribe(data=>
        {
          console.log("warehouse"+JSON.stringify(data));
          this.userForm.patchValue({warehouse_name:data["warehouse_name"]});
          this.status = true;
        });    
      }
    }

    onUpdate(id:any,action)
    {

      if(action=='update')
      {
        this.binmastersave=true;
      }
      else
      {
        this.binmastersave=false;
      }
     //tuhin here // this.binmastersave=true;
      this.isHidden = true;
      this.status = false;
      
      forkJoin(
      this.Service.retriveBin(id),
      this.DropDownListService.bingroupList()
      ).subscribe(([data,groupdata])=>
      { 
        this.binTypeList=groupdata;
        this.buisnesscode = data["businessunit_code"];
        this.onChangeBUnitName(this.buisnesscode); 
        this.userForm.patchValue(data); 
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
    }

    search(event)
  {
    let serchText = event.target.value;
    if(event.key == "Enter")
    {
      this.status = false;
      if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
      {
        this.DropDownListService.findBin('0').subscribe(data=>
        {
          this.listBin = data;
          this.status = true;
        });
      }
      else
      {
        this.DropDownListService.findBin(serchText).subscribe(data=>
        {
          this.listBin = data;
          this.status = true;
        });     
      }
    }
  }

  onDelete(id:any,bin_code)
  {
    this.status = false;
    if(confirm("Are you sure to delete this Bin ?"))
    { 
      this.userForm.patchValue({username: localStorage.getItem("username")});
      this.DropDownListService.checkMisleniousDeletation(bin_code,"binMaster").subscribe(checkBUData=> 
        {
        //alert("check::"+checkBUData.status)
         if(checkBUData.status=='No')
         {
          this.Service.deleteBin(this.userForm.getRawValue(),id).subscribe(data=> 
            {   
              console.log("Cat id:"+data.bin_description);
      
              if(data.bin_description=='' || data.bin_description==null)
              {
                alert("Opps!!! Can't delete this Bin !!!");
              }else{
                alert("Bin deleted successfully.");
              }
              this.status = true;
              this.ngOnInit()
            }); 
         }
         else{
          alert("This Bin is Already Used,Can not be Deleted!! ");
         }
        });
    }  
    this.status = true;
  }

    send()
    {
      console.log(this.userForm.get("warehouse_code").value)
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
        if(this.userForm.get("bin_description").value == '' || this.userForm.get("bin_description").value == 0 || this.userForm.get("bin_description").value == null)
        {
          alert("Please Enter Bin Name")
          this.status=true;
        }
        else if(this.userForm.get("businessunit_code").value == '' || this.userForm.get("businessunit_code").value == 0 || this.userForm.get("businessunit_code").value == null)
        {
          alert("Please Select Business Unit");
          this.status=true;
        }
        else if(this.userForm.get("bin_type").value == '' || this.userForm.get("bin_type").value == 0 || this.userForm.get("bin_type").value == null)
        {
          alert("Please Select Bin Group");
          this.status=true;
        }
        else if(this.userForm.get("bin_capacity_kg").value == '' || this.userForm.get("bin_capacity_kg").value == 0 || this.userForm.get("bin_capacity_kg").value == null)
        {
          alert("Please Enter Bin Capacity(QTLS)");
          this.status=true;
        }
        else
        {
          if(this.Id>0)
          {
            this.status = false;
            this.Service.updateBin(this.userForm.getRawValue(),this.Id).subscribe( data => 
            {
              console.log(this.userForm.value);
              alert("Bin master Updated successfully.");
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
              this.Service.createBin(this.userForm.getRawValue()).subscribe( data => 
              {
                console.log(this.userForm.value);
                alert("Bin master created successfully.");
                //window.location.reload();
                this.userForm.reset();
                this.status = true;
                this.ngOnInit();
                this.isHidden=false; 
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
              this.ngOnInit()});
            }
        }
        
      }
    }
 
  }
