import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import { WeighmentCharges } from '../../../../../../Models/OtherMaster/weighment-charges';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { OthermasterTaxPopupComponent } from '../othermaster-tax-popup/othermaster-tax-popup.component';

import {TaxModalComponent} from '../tax-modal/tax-modal.component';

@Component({
  selector: 'app-weighment-charges-master',
  templateUrl: './weighment-charges-master.component.html',
  styleUrls: ['./weighment-charges-master.component.scss']
})
export class WeighmentChargesMasterComponent implements OnInit
 {
  submitted = false;
  model: WeighmentCharges = new WeighmentCharges();
  public userForm:FormGroup;
  listWeighmentCharges: WeighmentCharges[];
  isHidden=false;
  Id:any;
  accountList:any = [];
  ledgerNames:any=[];
  seq_no:string;
  businesslists:any=[];
  company_name:any;
  vehicleCodes:any=[];
  status = false;
  weighmentchargesmastersave:boolean=true;
  weighmentchargesmasterupdate:boolean=true;
  weighmentchargesmasterdelete:boolean=true;
  weighmentchargesmasterview:boolean=true;

  constructor
  (
    public dialog: MatDialog,
    private Service: Master, 
    public fb:FormBuilder,
    private DropDownListService: DropdownServiceService) 
   {
    this.userForm=fb.group({ 
      id:[''],
      wm_charge_code: [''],
      wm_charge_desc: [''],
      vehicle_type: [''],
      bu_unit: [''],
      amount: [''],
      tax_code: [''],
      tax_rate: [''],
      wm_charge_acc: [''],
      company_id: [''],
      fin_year: [''],
      username: ['']});
  }
  get id(){ return this.userForm.get("id") as FormControl }
  get wm_charge_code(){ return this.userForm.get("wm_charge_code") as FormControl }
  get wm_charge_desc(){ return this.userForm.get("wm_charge_desc") as FormControl }
  get vehicle_type(){ return this.userForm.get("vehicle_type") as FormControl }
  get bu_unit(){ return this.userForm.get("bu_unit") as FormControl }
  get amount(){ return this.userForm.get("amount") as FormControl }
  get tax_code(){ return this.userForm.get("tax_code") as FormControl }
  get tax_rate(){ return this.userForm.get("tax_rate") as FormControl }
  get wm_charge_acc(){ return this.userForm.get("wm_charge_acc") as FormControl }
  get fin_year(){ return this.userForm.get("fin_year") as FormControl }
  get company_id(){ return this.userForm.get("company_id") as FormControl }

  showList(s:string)
    {
      if(this.weighmentchargesmastersave == true  && this.weighmentchargesmasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.DropDownListService.getSequenceId("WCMC-").subscribe(data=>{this.seq_no = data.sequenceid;});  
          this.userForm.reset(this.ResetAllValues().value);
        }
      }
      if(this.weighmentchargesmastersave == true  && this.weighmentchargesmasterupdate == false)
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.DropDownListService.getSequenceId("WCMC-").subscribe(data=>{this.seq_no = data.sequenceid;});  
          this.userForm.reset(this.ResetAllValues().value);
        }
      }
     
      if(s=="list")
      {
        this.isHidden=false;
        this.weighmentchargesmastersave=true;
        this.userForm.reset(this.ResetAllValues().value);
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id:[''],
        wm_charge_code: [''],
        wm_charge_desc: [''],
        vehicle_type: [''],
        bu_unit: [''],
        amount: [''],
        tax_code: [''],
        tax_rate: [''],
        wm_charge_acc: [''],
        company_id: [''],
        fin_year: [''],
        username: [''],});
    }

  showPopUp1(event) 
    {          
      let dialogref=this.dialog.open(OthermasterTaxPopupComponent);
      dialogref.afterClosed().subscribe(data => 
      {this.userForm.patchValue({tax_code: data.tax_id, tax_rate:data.tax_rate}) });      
    }

  ngOnInit() 
   {
     //For User Role
     let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
    
     this.weighmentchargesmastersave = false;
     this.weighmentchargesmasterupdate = false;
     this.weighmentchargesmasterdelete = false;
     this.weighmentchargesmasterview = false;

     if(accessdata.includes('weightment_charges_master.save'))
     {
      this.weighmentchargesmastersave = true;
     }
    if(accessdata.includes('weightment_charges_master.update'))
     { 
       this.weighmentchargesmasterupdate=true;
     }
     if(accessdata.includes('weightment_charges_master.delete'))
     {
       this.weighmentchargesmasterdelete=true;
     }
     if(accessdata.includes('weightment_charges_master.view'))
     {
       this.weighmentchargesmasterview=true;
     }
     
     
    this.company_name = localStorage.getItem("company_name");
    this.userForm.patchValue({bu_unit: '0', wm_charge_acc: '0'});
    this.DropDownListService.custometrBusList(this.company_name).subscribe(data=>{this.businesslists  = data;});   
    this.Service.getWeighmentChargeMasters().subscribe(data=>{this.listWeighmentCharges  = data;});                 
    this.DropDownListService.ledgerNameList().subscribe(data=>{this.ledgerNames  = data, this.accountList = data});
    this.DropDownListService.getSequenceId("WCMC-").subscribe(data=>{this.seq_no = data.sequenceid;});  
    this.DropDownListService.vehicleCodeList().subscribe(data=>{this.vehicleCodes  = data;});
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
          this.DropDownListService.findWeighmentCharges('0').subscribe(data=>
          {
            this.listWeighmentCharges = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findWeighmentCharges(serchText).subscribe(data=>
          {
            this.listWeighmentCharges = data;
            this.status = true;
          });  
          this.status = true;   
        }
      }
    }
  
    onDelete(id:any,wm_charge_id)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Weightment Charges ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.DropDownListService.checkWmChgsMasterUsage(wm_charge_id).subscribe(checkWmChgData=> 
          {
           //alert("bidhan here::"+checkWmChgData.status);
           if(checkWmChgData.status=='No')
           {
            this.Service.deleteWeighmentCharges(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                console.log("Cat id:"+data.wm_charge_desc);
        
                if(data.wm_charge_desc=='' || data.wm_charge_desc==null)
                {
                  alert("Opps!!! Can't delete this Weightment Charges !!!");
                }else{
                  alert("Weightment Charges deleted successfully.");
                }
                this.status = true;
                this.ngOnInit()
              });
           }
           else{
            alert("This Weightment Charges is Already Used,Can not be Deleted!! ");
           }
            
          }); 
      }  
      this.status = true;
    }

   onUpdate(id:any,action)
   {
    if(action == 'update')
    {
      this.weighmentchargesmastersave=true;
    }
    else{
      this.weighmentchargesmastersave=false;
    }
    
     this.isHidden = true;
     this.status = false;
     this.Service.retriveWeighmentChargeMasters(id).subscribe(data=>
     {
       this.userForm.patchValue(data); 
       this.status = true;
     });
   }

   send()
    {
      this.Id= this.userForm.get("id").value as FormControl; 
      this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
      fin_year:localStorage.getItem("financial_year"),username: localStorage.getItem("username")});
       this.submitted = true;
       if(!this.userForm.valid) 
      {
        alert('Please fill all fields!')
        return false;
      } 
      else 
      {
        this.status = false;
        if(this.userForm.get("wm_charge_desc").value == '' || this.userForm.get("wm_charge_desc").value == null || this.userForm.get("wm_charge_desc").value == 0)
        {
          alert("Please Enter Description");
          this.status=true;
        }
        else if(this.userForm.get("vehicle_type").value == '' || this.userForm.get("vehicle_type").value == null || this.userForm.get("vehicle_type").value == 0)
        {
          alert("Please Select Vehicle Type");
          this.status=true;
        }
        else if(this.userForm.get("bu_unit").value == '' || this.userForm.get("bu_unit").value == null || this.userForm.get("bu_unit").value == 0)
        {
          alert("Please Select Bussiness Unit");
          this.status=true;
        }
        else if(this.userForm.get("amount").value == '' || this.userForm.get("amount").value == null || this.userForm.get("amount").value == 0)
        {
          alert("Please Enter Amount");
          this.status=true;
        }
        else if(this.userForm.get("tax_code").value == '' || this.userForm.get("tax_code").value == null || this.userForm.get("tax_code").value == 0)
        {
          alert("Please Enter Tax Code");
          this.status=true;
        }
        else if(this.userForm.get("tax_rate").value == '' || this.userForm.get("tax_rate").value == null || this.userForm.get("tax_rate").value == 0)
        {
          alert("Please Enter Tax Rate");
          this.status=true;
        }
        else if(this.userForm.get("wm_charge_acc").value == '' || this.userForm.get("wm_charge_acc").value == null || this.userForm.get("wm_charge_acc").value == 0)
        {
          alert("Please Select Weighment Charge Account*");
          this.status=true;
        }
        else
        {
          if(this.Id>0)
          {
            this.Service.updateWeighmentChargeMaster(this.userForm.getRawValue(), this.Id).subscribe(data => 
            {
              console.log(this.userForm.value);
              alert("Weighment Charges Master Updated successfully.");
              //window.location.reload();
              this.userForm.reset();
              this.status = true;
              //refresh List;
              this.ngOnInit();
              this.isHidden=false;
            });  
          }
          else
            {
              this.Service.createWeighmentChargeMaster(this.userForm.getRawValue()).subscribe(data => 
              {
                console.log(this.userForm.value);
                alert("New Weighment Charges Master created successfully.");
                //window.location.reload();
                this.userForm.reset();
                this.status = true;
                //refresh List;
                this.ngOnInit();
                this.isHidden=false;
              });  
            }
        }
        

       
       }
    }

}
