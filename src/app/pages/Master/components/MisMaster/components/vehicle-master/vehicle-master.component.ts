import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Vehicle } from '../../../../../../Models/InventoryModel/vehicle';
import { Master } from '../../../../../../service/master.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { forkJoin } from 'rxjs';
import { vehicleList } from '../../../../../../Models/TransporterModal/vehicleList';

  @Component({
    selector: 'app-vehicle-master',
    templateUrl: './vehicle-master.component.html',
    styleUrls: ['./vehicle-master.component.scss']
  })

  export class VehicleMasterComponent implements OnInit 
  {
    submitted = false;
    Id: any;
    public userForm:FormGroup;
    Vehicle: Vehicle = new Vehicle();
    customUOMs:{};
    vehicleCodes:{};
    isHidden = false;
    listVehicle : Vehicle[];
    transporterList:{};
    company_name:any;
    vehicle:any;
    status = false;
    Transporter="0";
    Loadcapacity_Uom="0";
    TareweightUom="0";
    myFiles: string[] = []; 
    @ViewChild('myFileInput', {static: false} as any)
    InputVar: ElementRef;
    vehiclemastersave:boolean=true;
    vehiclemasterupdate:boolean=true;
    vehiclemasterdelete:boolean=true;
    vehiclemasterview:boolean=true;
    action:any;
  
    constructor(private Service: Master, public fb:FormBuilder,
      private DropDownListService: DropdownServiceService) 
    { 
      this.userForm=fb.group({ 
        id:[''],  
        vehicle_no: [''],
        vehicle_active: [''],
        vehtype_code: [''],
        onwer_phoneno: [''],
        vehicle_aliasno: [''],
        vehicle_chassisno: [''],
        tareweight_qty: [''],
        tareweight_uom: [''],
        load_capacity: [''],
        loadcapacity_uom: [''],
        onwer_name: [''],
        onwer_address: [''],
        transporter: [''],
        company_id: [''],
        fin_year: [''],
        username: [''],
       

        vehicle_master_doc_details: this.fb.array([this.fb.group({

          slno:this.item_sl_no,
          description:'' })])});
         
    }

    get id(){ return this.userForm.get("id") as FormControl }
    get vehicle_no(){ return this.userForm.get("vehicle_no") as FormControl }
    get vehicle_active(){ return this.userForm.get("vehicle_active") as FormControl }
    get vehtype_code(){ return this.userForm.get("vehtype_code") as FormControl }
    get onwer_phoneno(){ return this.userForm.get("onwer_phoneno") as FormControl }
    get vehicle_aliasno(){ return this.userForm.get("vehicle_aliasno") as FormControl }
    get vehicle_chassisno(){ return this.userForm.get("vehicle_chassisno") as FormControl }
    get tareweight_qty(){ return this.userForm.get("tareweight_qty") as FormControl }
    get tareweight_uom(){ return this.userForm.get("tareweight_uom") as FormControl }
    get load_capacity(){ return this.userForm.get("load_capacity") as FormControl }
    get loadcapacity_uom(){ return this.userForm.get("loadcapacity_uom") as FormControl }
    get onwer_name(){ return this.userForm.get("onwer_name") as FormControl }
    get onwer_address(){ return this.userForm.get("onwer_address") as FormControl }
    get transporter(){ return this.userForm.get("transporter") as FormControl }
    get company_id(){return this.userForm.get("company_id") as FormControl}
    get fin_year(){return this.userForm.get("fin_year") as FormControl}
    get username(){return this.userForm.get("username") as FormControl}
    get vehicle_master_doc_details() {return this.userForm.get('vehicle_master_doc_details') as FormArray;}
    
    isCheckedDoc = false;
    ngOnInit() 
    {
      this.action = 'save';
      
      //For User Role
     //let user_role=localStorage.getItem("user_role")+"tuhinabcd"+"mislenious_master";
     //this.DropDownListService.getRoleItemMaster(user_role).subscribe(data=>{
      let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
     
     this.vehiclemastersave=false;
     this.vehiclemasterupdate=false;
     this.vehiclemasterdelete=false;
     this.vehiclemasterview=false;

     if(accessdata.includes('vehicle_master.save'))
     {
      this.vehiclemastersave = true;
     }
    if(accessdata.includes('vehicle_master.update'))
     { 
       this.vehiclemasterupdate=true;
     }
     if(accessdata.includes('vehicle_master.delete'))
     {
       this.vehiclemasterdelete=true;
     }
     if(accessdata.includes('vehicle_master.view'))
     {
       this.vehiclemasterview=true;
     }

    
     this.vehicle='';
      this.DropDownListService.allVechileList().subscribe(data=>{this.listVehicle  = data;this.vehicleData  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      

      this.status = true;
    }

    item_sl_no = 0;
    showList(s:string)
    {
      if(this.vehiclemastersave == true  && this.vehiclemasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
      {
        this.isHidden=true;
        this.Transporter="0";
        this.Loadcapacity_Uom="0";
        this.TareweightUom="0";

        this.item_sl_no = 1;
        this.setDescription();


        forkJoin(
          this.DropDownListService.getSystemSettingsByComp("comp="+this.company_name),
          this.DropDownListService.vehicleCodeList(),
          //this.DropDownListService.transporterNamesList(),
          this.DropDownListService.getTransporterMNCListFast(),
         // this.DropDownListService.customUOMList()
         this.DropDownListService.getUomList()
        ).subscribe(([settingData,vehicletype,transporterdata,customuom])=>
          {
            if(settingData["vehicle_status"] == "Yes"){         
              this.isCheckedDoc=true;
            }else{
              this.isCheckedDoc=false;
            }
            this.vehicleCodes  = vehicletype;
            this.transporterList  = transporterdata;
            this.customUOMs  = customuom;

            this.status=true;
          })

      }
      }
      if(this.vehiclemastersave == true  && this.vehiclemasterupdate == false)
      {
        if(s=="add")
      {
        this.isHidden=true;
        this.Transporter="0";
        this.Loadcapacity_Uom="0";
        this.TareweightUom="0";

        this.item_sl_no = 1;
        this.setDescription();


        forkJoin(
          this.DropDownListService.getSystemSettingsByComp("comp="+this.company_name),
          this.DropDownListService.vehicleCodeList(),
          this.DropDownListService.transporterNamesList(),
          this.DropDownListService.customUOMList()
        ).subscribe(([settingData,vehicletype,transporterdata,customuom])=>
          {
            if(settingData["vehicle_status"] == "Yes"){         
              this.isCheckedDoc=true;
            }else{
              this.isCheckedDoc=false;
            }
            this.vehicleCodes  = vehicletype;
            this.transporterList  = transporterdata;
            this.customUOMs  = customuom;

            this.status=true;
          })
      }
      }
      
      if(s=="list")
      {
        this.isHidden=false;
        this.userForm.reset();
        this.ResetAllValues();
        this.myFiles=[];
        this.status=true;
        this.action = 'save';
       
      }
      
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id:[''],  
        vehicle_no: [''],
        vehicle_active: [''],
        vehtype_code: [''],
        onwer_phoneno: [''],
        vehicle_aliasno: [''],
        vehicle_chassisno: [''],
        tareweight_qty: [''],
        tareweight_uom: [''],
        load_capacity: [''],
        loadcapacity_uom: [''],
        onwer_name: [''],
        onwer_address: [''],
        company_id: [''],
        fin_year: [''], 
        username: [''],
        transporter: [''],
        vehicle_master_doc_details: this.fb.array([this.fb.group({
          slno:this.item_sl_no,
          description:'' })])});   
    }

    onchangeBUnitName(businessunit_code: String)
    {
      if(businessunit_code != "0")
      {
        this.status = false;
        this.DropDownListService.nameListByBUnitCode(businessunit_code).subscribe(data=>
        {
          this.userForm.patchValue(data);
          this.status = true;
        });    
      }
    }

   /* search(event)
    {
      this.company_name = localStorage.getItem("company_name");
      let serchText = event.target.value;
      if(event.key == "Enter")
      {
        this.status = false;
        if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
        {
          this.DropDownListService.findVehicles(this.company_name,'0').subscribe(data=>
          {
            this.listVehicle = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findVehicles(this.company_name,serchText).subscribe(data=>
          {
            console.log("data::"+JSON.stringify(data))
            this.listVehicle = data;
            this.status = true;
          });     
        }
      }
    }*/
    vehicleData: vehicleList[];
    search(event)
    {
    console.log("Enter Method")
    if(event.key == "Enter")
    {
      console.log("Enter event"+event.target.value) 
      this.vehicleData=this.listVehicle.filter((vehicle) => 
      (vehicle.vehicle_id.toLowerCase().includes((event.target.value).toLowerCase())) 
      || ((vehicle.vehicle_no.toLowerCase().includes((event.target.value).toLowerCase()))) 
      )
      console.log("search data:"+JSON.stringify(this.vehicleData))
    
    }
  }

    editable: boolean = false;

  
    setDescription()
    { 
        this.vehicle_master_doc_details.at(0).patchValue({description:"RC Copy"});
        this.vehicle_master_doc_details.at(0).get("description").disable();
        this.vehicle_master_doc_details.at(0).patchValue({slno:1});
        this.vehicle_master_doc_details.at(0).get("slno").disable();

        this.add();

        this.vehicle_master_doc_details.at(1).patchValue({description:"Fast Tag Copy"});
        this.vehicle_master_doc_details.at(1).get("description").disable();
    }
   
    add()
    {
      this.item_sl_no =this.item_sl_no +1;
      this.vehicle_master_doc_details.push(this.fb.group({
        slno:this.item_sl_no,
        description:''}));
    }

    delete(index) 
    {
     if(index==0 || index == 1)
     {
       alert("Opps!!! Can't delete this row !!!");
       return false;
     }
      if(this.item_sl_no > 2)
      {
        this.vehicle_master_doc_details.removeAt(index);
        this.item_sl_no = this.item_sl_no - 1;
      }
      else{
        alert("Opps!!! Can't delete all rows !");} 

      for(let i=1; i<=this.item_sl_no; i++)
      this.vehicle_master_doc_details.at(i-1).patchValue({slno: i});
    }

    onDelete(id:any,vehicle_id)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Vehicle ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        // this.DropDownListService.checkVehicleMasterUsage(vehicle_id).subscribe(checkvehicle=> 
          this.DropDownListService.checkMisleniousDeletation(vehicle_id,"vehicleMaster").subscribe(checkvehicle=> 
          {
           //alert(checkvehicle.status)
           if(checkvehicle.status=='No')
           {
            this.Service.deleteVehicleMaster(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                //console.log("vehicle_no:"+data.vehicle_no);
        
                if(data.vehicle_no=='' || data.vehicle_no==null)
                {
                  alert("Opps!!! Can't delete this Vehicle !!!");
                }else{
                  alert("Vehicle deleted successfully.");
                }
      
                this.DropDownListService.allVechileList().subscribe(data=>{this.listVehicle  = data;this.vehicleData  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
                this.ngOnInit()});
      
                this.status = true;
                //this.InputVar.nativeElement.value = ""; 
               // this.ngOnInit();
               // this.myFiles=[];
               // this.isHidden=false; 
                //this.showList("list");
              });
           }
          else{
           alert("This Vehicle is Already Used,Can not be Deleted!! ");
          }
         });   
      }  
      this.status = true;
    }
  
    onUpdate(id:any ,vehicle_id:string,action)
    {
      if(action == 'view')
      {
        this.action = 'view';
        this.showList("add");
      }
      else
      {
        this.action = 'update';
        this.showList("add");
      }
      this.vehiclemastersave=true;
      this.myFiles=[];
      //alert("file length: "+this.myFiles.length)
      this.isHidden = true;
      this.status = false;
      this.Service.retriveVehicle(id).subscribe(data=>
      { 
        this.userForm.patchValue(data); 
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Something error is occured please try again....");
      this.ngOnInit()});

      this.Service.getVehicleDocDtls(vehicle_id).subscribe(data=>
        {
          console.log("Dynamic : "+JSON.stringify(data))
          let k = 0;
          this.add()
          this.item_sl_no = 0;
          while (this.vehicle_master_doc_details.length) 
          this.vehicle_master_doc_details.removeAt(0);
          for(let data1 of data)
          {
            this.add();        
            this.vehicle_master_doc_details.at(k).patchValue(data1);
            k = k + 1;
          }
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});
    }

    send()
    {
      this.Id= this.userForm.get("id").value as FormControl; 
      this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
        fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
     // this.submitted = true;

     

      if(!this.userForm.valid) 
      {
        alert('Please fill all fields!')
        return false;
      } 
      else 
      {
        if(this.Id>0)  
          {
            this.status = false;
            const InputData = this.userForm.getRawValue(); 
            const frmData = new FormData();
            
            for (var i = 0; i < this.myFiles.length; i++) {  
             frmData.append("files", this.myFiles[i]);   
             
             if (i == 0) {  
              console.log(i+",files: "+this.myFiles[i])
             }  
           } 
           frmData.append("Input", JSON.stringify(InputData));
           //alert("update file length: "+this.myFiles.length)
           if(this.userForm.get("vehicle_no").value == "" )
              {
                alert("Please Enter Vehicle No!!!!  ");
                this.status=true;
              }
              else if(this.userForm.get("vehtype_code").value == null || this.userForm.get("vehtype_code").value == 0 )
              {
                alert("Please Select Vehicle Type!!!!  ");
                this.status=true;
              }
              // else if(this.userForm.get("transporter").value == null || this.userForm.get("transporter").value == 0 )
              // {
              //   alert("Please Select Transporter Name!!!!  ");
              //   this.status=true;
              // }
              else{
                  this.Service.updateVehicle(frmData).subscribe(data => 
                  {
                    console.log(this.userForm.value);
                    alert("Vehicle Updated successfully.");
                   
                   // this.InputVar.nativeElement.value = ""; 
                   // this.myFiles=[];//later remove
                    this.ngOnInit();  
                    this.isHidden=false;   
                    this.showList("list");  
                    this.status=true;              
                  }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Something error is occured please try again....");
                  this.ngOnInit()});
                }
          }
          else
            {
              this.status = false;
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
              //alert("insert file length: "+this.myFiles.length)
              
              if(this.userForm.get("vehicle_no").value == "" )
              {
                alert("Please Enter Vehicle No!!!!  ");
                this.status=true;
              }
              else if(this.userForm.get("vehtype_code").value == null || this.userForm.get("vehtype_code").value == 0 )
              {
                alert("Please Select Vehicle Type!!!!  ");
                this.status=true;
              }
              // else if(this.userForm.get("transporter").value == null || this.userForm.get("transporter").value == 0 )
              // {
              //   alert("Please Select Transporter Name!!!!  ");
              //   this.status=true;
              // }
              else{
                this.status=false;    
                
                console.log("hi/"+this.userForm.get("transporter").value)
                 
                
                //  console.log("Form data: "+JSON.stringify(frmData));
                  
                  
                   this.Service.createVehicle(frmData).subscribe(data => 
                      {
                        console.log(this.userForm.value);
                        alert("Vehicle created successfully.");

                        //this.InputVar.nativeElement.value = ""; 
                         this.status=true;    
                        this.ngOnInit();

                       // this.myFiles=[];//later remove
                        this.isHidden=false; 
                        this.showList("list");
                                   
                      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Something error is occured please try again....");
                      this.ngOnInit()});
                    
            
                    }

              
              
            }
      }
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
    groupstat1:any;
    onFocusoutCheckUnique(event: any)
    { 
          this.DropDownListService.chkVehicleNoStat(event.target.value).subscribe(data=>
            {
               this.groupstat1 = data.group_name;
              // this.status=true;
              //window.alert( data.group_name);
              if(this.groupstat1=='EXIST')
              {
                window.alert(event.target.value +" "+ " already exist please change !" );
                
                this.userForm.patchValue({vehicle_no:""});
                this.status=true;
              }
              else
              {
                this.status=true;
              }
              
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Please Input Valid Vehicle Number....");});
            this.groupstat1=''; 
            this.status=true;        
        }

  }
