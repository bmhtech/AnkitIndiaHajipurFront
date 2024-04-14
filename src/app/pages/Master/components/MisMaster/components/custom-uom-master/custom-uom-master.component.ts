import { Component, OnInit } from '@angular/core';
import { Master } from '../../../../../../service/master.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { CustomUom } from '../../../../../../models/InventoryModel/CustomUom';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

  @Component({
    selector: 'app-custom-uom-master',
    templateUrl: './custom-uom-master.component.html',
    styleUrls: ['./custom-uom-master.component.scss']
  })

  export class CustomUomMasterComponent implements OnInit 
  {
    submitted = false;
    public userForm:FormGroup;
    model: CustomUom = new CustomUom();
    listCustomUom: CustomUom[];
    catagoryList:any = [];
    Id: any;
    calculationList:{};
    termList:{};
    isHidden=false;
    status = false;
    selectedCalMethod:any;
    typeTerm = "Default";
    uomConvFac = '0';
    customuommastersave:boolean = true;
    customuommasterupdate:boolean = true;
    customuommasterdelete:boolean = true;
    customuommasterview:boolean = true;

    constructor(private Service: Master,public fb:FormBuilder,private DropDownListService:DropdownServiceService) 
    {
      this.userForm=fb.group({
        id: [''],
        customuom_code:[''],
        customuom_catg: [''],
        uom_conv_fac: [''],
        cal_method: [''],
        description: [''],
        type_term:[''],
        decimalv:[''],
        uom_active:[''],
        remarks:[''],
        company_id: [''],
        fin_year: [''],
        username: ['']}); 
    }
    get id(){ return this.userForm.get("id") as FormControl }
    get customuom_code(){ return this.userForm.get("customuom_code") as FormControl }
    get customuom_catg(){ return this.userForm.get("customuom_catg") as FormControl }
    get decimalv(){ return this.userForm.get("decimalv") as FormControl }
    get uom_conv_fac(){ return this.userForm.get("uom_conv_fac") as FormControl }
    get cal_method(){ return this.userForm.get("cal_method") as FormControl }
    get description(){ return this.userForm.get("description") as FormControl }
    get type_term(){ return this.userForm.get("type_term") as FormControl }
    get uom_active(){ return this.userForm.get("uom_active") as FormControl }
    get remarks(){ return this.userForm.get("remarks") as FormControl }

    ngOnInit() 
    {
      //For User Role
      let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
   
     this.customuommastersave=false;
     this.customuommasterupdate=false;
     this.customuommasterdelete=false;
     this.customuommasterview = false;

        if(accessdata.includes('custom_uom_master.save'))
           {
            this.customuommastersave = true;
           }
          if(accessdata.includes('custom_uom_master.update'))
           { 
             this.customuommasterupdate=true;
           }
           if(accessdata.includes('custom_uom_master.delete'))
           {
             this.customuommasterdelete=true;
           }
           if(accessdata.includes('custom_uom_master.view'))
           {
             this.customuommasterview=true;
           }

     
      this.selectedCalMethod = "MULTIPLY";
      this.typeTerm = "Default";
      this.uomConvFac = '0';
      this.Service.getCustomUoms().subscribe(data=>{this.listCustomUom  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.catagoryList=[{display: "STANDARD UOM", value: "SUOM"}, {display: "WEIGHMENT UOM", value: "WUOM"}];
      this.calculationList=["DIVISION","MULTIPLY"];
      this.status=true;
    }

    showList(s:string)
    {
      if(this.customuommastersave == true  && this.customuommasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.typeTerm = "Default";
        }
      }
      if(this.customuommastersave == true  && this.customuommasterupdate == false)
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.typeTerm = "Default";
        }
      }
     
      if(s=="list")
      {
        this.isHidden=false;
        this.customuommastersave=true;
        this.userForm.reset(this.ResetAllValues().value);
        this.selectedCalMethod = "MULTIPLY";
        this.typeTerm = "Default";
        this.uomConvFac = '0';
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id: [''],
        customuom_code:[''],
        customuom_catg: [''],
        uom_conv_fac: [''],
        decimalv:[''],
        cal_method: [''],
        description: [''],
        type_term:[''],
        uom_active:[''],
        remarks:[''],
        company_id: [''],
        fin_year: [''],
        username: ['']}); 
    }

    onChangeCatagory(category)
    {
      if(category == 'SUOM')
      this.selectedCalMethod = "Division";
      else
      this.selectedCalMethod = "MULTIPLY";
    }

    onUpdate(id:any,action)
    {
      if(action=='update')
      {
        this.customuommastersave=true;
      }
      else
      {
        this.customuommastersave=false;
      }

      //tuhin here // this.customuommastersave=true;
      this.isHidden = true;
      this.status = false;
      this.Service.retriveCustomerUom(id).subscribe(data=>
      {
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
          this.DropDownListService.findCustomUom('0').subscribe(data=>
          {
            this.listCustomUom = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findCustomUom(serchText).subscribe(data=>
          {
            this.listCustomUom = data;
            this.status = true;
          });     
        }
      }
    }
  
    onDelete(id:any,customuom_id)
    {
      this.status = false;
      if(confirm("Are you sure to delete this CustomUom ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.DropDownListService.checkMisleniousDeletation(customuom_id,"CustomUomMaster").subscribe(checkBUData=> 
          {
          //alert("check::"+checkBUData.status)
           if(checkBUData.status=='No')
           {
            this.Service.deleteCustomUom(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                console.log("Cat CustomUom:"+data.customuom_catg);
        
                if(data.customuom_catg=='' || data.customuom_catg==null)
                {
                  alert("Opps!!! Can't delete this CustomUom !!!");
                }else{
                  alert("CustomUom deleted successfully.");
                }
                this.status = true;
                this.ngOnInit()
              });
           }
           else{
            alert("This CustomUom is Already Used,Can not be Deleted!! ");
           }
          });
         
      }  
      this.status = true;
    }

    send()
    {
      this.Id= this.userForm.get("id").value as FormControl;
      this.userForm.patchValue({
      company_id: localStorage.getItem("company_name"),
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
        this.status=false;
        if(this.userForm.get("customuom_catg").value == '' || this.userForm.get("customuom_catg").value == null || this.userForm.get("customuom_catg").value == 0)
        {
          alert("Please Select Catagory")
          this.status=true;
        }
        else if(this.userForm.get("description").value == '' || this.userForm.get("description").value == null || this.userForm.get("description").value == 0)
        {
          alert("Please Enter UOM")
          this.status=true;
        }
        else
        {
          if(this.Id>0)
          {
            this.Service.updateCustomUom(this.userForm.getRawValue(), this.Id).subscribe( data => 
            {
              console.log("check: "+JSON.stringify(this.userForm.getRawValue()));
              alert("CustomUom Master Updated successfully.");
              this.userForm.reset();
              //refresh List
              this.ngOnInit();
              this.isHidden = false;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});
          }  
        else
          {
            this.Service.createCustomUom(this.userForm.getRawValue()).subscribe( data => 
            {
              console.log(this.userForm.value);+
              alert("New CustomUom created successfully.");
              this.userForm.reset();
              //refresh List
              this.ngOnInit();
              this.isHidden = false;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});
          }
        }
        
      }
    }


    onexport(id)
    {
      this.status = false;
      
      this.DropDownListService.exportuom(id).subscribe(data=>
        {
          if(data["export"] == 1)
          {
            alert("Data has been Exported Sucessfully !!!!!!!!!!!!! ");
          }
          else
          {
            
            alert("Data Didn't Exported  !!!!!!!!!!!!! ");
          }
          
          this.ngOnInit();
          this.isHidden = false;
          this.status = true;
        });
    }

  }
