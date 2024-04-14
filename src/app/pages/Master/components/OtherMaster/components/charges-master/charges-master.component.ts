import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { Charges } from '../../../../../../Models/OtherMaster/charges';
import { Master } from '../../../../../../service/master.service';
import { MatDialogRef, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {TaxModalComponent} from '../tax-modal/tax-modal.component';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { forkJoin } from 'rxjs';

  @Component({
    selector: 'app-charges-master',
    templateUrl: './charges-master.component.html',
    styleUrls: ['./charges-master.component.scss']
  })

  export class ChargesMasterComponent implements OnInit 
  {
    isHidden = false;
    basislist: {};
    submitted = false;
    model:Charges=new Charges();
    listCharges: Charges[];
    public userForm: FormGroup;
    ledgerName:{};
    Id:any;
    Screennames:{};
    status = false;
    chargesmastersave:boolean=true;
    chargesmasterupdate:boolean=true;
    chargesmasterdelete:boolean=true;
    chargesmasterview:boolean=true;

    constructor(public fb:FormBuilder,private Service: Master,
      private DropDownListService: DropdownServiceService,  private dialog: MatDialog) 
    {
      this.userForm=fb.group({
        id:[''],
        charge_id:[''],
        screen_id: [''],
        charge_desc: [''],
        company_id: [''],
        fin_year: [''],
        username: [''],

      charge_masterdtls: this.fb.array([this.fb.group({
        charge_name:'',
        charge_ac:'',
        rate_cal:'',
        method:'',
        tax_code:'',
        tax_rate:'',
        required:'',
        app_rate:''})])
      });
    }

    get id(){ return this.userForm.get("id") as FormControl }
    get charge_id(){ return this.userForm.get("charge_id") as FormControl }
    get screen_id(){ return this.userForm.get("screen_id") as FormControl }
    get charge_desc(){ return this.userForm.get("charge_desc") as FormControl }

    get company_id(){ return this.userForm.get("company_id") as FormControl }
    get fin_year(){ return this.userForm.get("fin_year") as FormControl }
    get username(){ return this.userForm.get("username") as FormControl }
    get charge_masterdtls(){return this.userForm.get('charge_masterdtls') as FormArray;}

    company_name:any;
    Username:any;
    financialYear:any;
    ngOnInit() 
    {
      //For User Role
      let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
   
     this.chargesmastersave=false;
     this.chargesmasterupdate=false;
     this.chargesmasterdelete=false;
     this.chargesmasterview=false;

     if(accessdata.includes('charges_master.save'))
     {
      this.chargesmastersave = true;
     }
     if(accessdata.includes('charges_master.update'))
     {
      this.chargesmasterupdate = true;
     }
     if(accessdata.includes('charges_master.delete'))
     {
      this.chargesmasterdelete = true;
     }
     if(accessdata.includes('charges_master.view'))
     {
      this.chargesmasterview = true;
     }
     
      this.company_name = localStorage.getItem("company_name");
      this.Username = localStorage.getItem("username");
      this.financialYear = localStorage.getItem("financial_year");
      this.Service.getCharges().subscribe(data=>{this.listCharges  = data;});
      this.DropDownListService.ledgerList().subscribe(data=>{this.ledgerName = data;});
      this.basislist = ["%", "UOM","Fixed"];
      this.DropDownListService.screenList().subscribe(data=>{this.Screennames = data;});
      this.status = true;
    }

    showList(s:string)
    {
      if(this.chargesmastersave == true  && this.chargesmasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.reset(this.ResetAllValues().value);
        }
      }
      if(this.chargesmastersave == true  && this.chargesmasterupdate == false)
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
        this.chargesmastersave=true;
        this.userForm.reset(this.ResetAllValues().value);
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id:[''],
        charge_id:[''],
        screen_id: [''],
        charge_desc: [''],
        company_id: [''],
        fin_year: [''],
        username: [''],

      charge_masterdtls: this.fb.array([this.fb.group({
        charge_name:'',
        charge_ac:'',
        rate_cal:'',
        method:'',
        tax_code:'',
        tax_rate:'',
        required:'',
        app_rate:''})])
      });
    }

    add() 
    {
      this.charge_masterdtls.push(this.fb.group({
        charge_name:'',
        charge_ac:'',
        rate_cal:'',
        method:'',
        tax_code:'',
        tax_rate:'',
        required:'',
        app_rate:''}));
    }

    delete(index) 
    {
      if(index)
      {this.charge_masterdtls.removeAt(index);}
      else
      {alert("can't delete all rows");} 
    }

    showPopUp1(index)
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {index: index};
      const dialogRef = this.dialog.open(TaxModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => 
      {this.charge_masterdtls.at(index).patchValue({tax_code: data["tax_id"], tax_rate: data["tax_rate"]});}); 
    }
    
    onUpdate(id:any, charge_id:string,action)
    {
      if(action == 'update')
      {
        this.chargesmastersave=true;
      }
      else
      {
        this.chargesmastersave=false;
      }
      this.userForm.patchValue({id: id});
      this.isHidden = true;
      this.status = false;
    
      forkJoin(
        this.Service.retriveChargesMaster(id),
        this.Service.chargeMasterRetriveList(charge_id)
      ).subscribe(([ChargeData, ChargeRetriveList])=>
        {
          this.userForm.patchValue(ChargeData);
          console.log("ChargeData: "+JSON.stringify(ChargeRetriveList));       
 
        while (this.charge_masterdtls.length ) 
        {this.charge_masterdtls.removeAt(0);}
        for(let i=0;i<ChargeRetriveList.length;i++)
        {this.add();
        
        }
        this.charge_masterdtls.patchValue(ChargeRetriveList);
        this.status = true;
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
           this.DropDownListService.findChargeMaster('0').subscribe(data=>
           {
             this.listCharges = data;
             this.status = true;
           });
         }
         else
         {
           this.DropDownListService.findChargeMaster(serchText).subscribe(data=>
           {
             this.listCharges = data;
             this.status = true;
           });  
           this.status = true;   
         }
       }
     }
   
     onDelete(id:any,chargecode)
     {
       this.status = false;

       if(confirm("Are you sure to delete this Charges ?"))
       { 
        this.userForm.patchValue({username: localStorage.getItem("username")});

        this.DropDownListService.checkChargeMasterUsage(chargecode).subscribe(checkChargeData=> 
          {
           ///let dataq=JSON.parse(checkItem);
           //console.log("bidhan here::"+checkChargeData.status);
           if(checkChargeData.status=='No')
           {
             this.Service.deleteChargeMaster(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                console.log("Cat id:"+data.charge_desc);
        
                if(data.charge_desc=='' || data.charge_desc==null)
                {
                  alert("Opps!!! Can't delete this Charges !!!");
                }else{
                  alert("Charges deleted successfully.");
                }
                this.userForm.reset();
                this.status = true;
                this.isHidden = false;
                this.ngOnInit();
                this.showList("list");
              });
           }
           else{
            alert("This Charge Matrix is Already Used,Can not be Deleted!! ");
           }
            
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
            this.status = false;
            if(this.userForm.get("charge_desc").value == '' || this.userForm.get("charge_desc").value == null)
            {
              alert("Please Enter Charges Description!!!");this.status = true;
            }
            else if(this.userForm.get("screen_id").value == '' || this.userForm.get("screen_id").value == null || this.userForm.get("screen_id").value == 0)
           {
             alert("Please Select Screen Name!!!");this.status = true;
           }
            
          else
          {
            let chname = false;
            let chname1 = false;
            let chname2 = false;
            let chname3 = false;
            let rate = false;
            let required = false;

            for(let b=0;b<this.charge_masterdtls.length;b++)
            {
              if(this.charge_masterdtls.at(b).get("charge_name").value == null || this.charge_masterdtls.at(b).get("charge_name").value == '')
              {
                chname = true;
              }
              if(this.charge_masterdtls.at(b).get("charge_ac").value == 0 || this.charge_masterdtls.at(b).get("charge_ac").value == '' || this.charge_masterdtls.at(b).get("charge_ac").value == null)
               {
                 chname1 = true;
               } 
              if(this.charge_masterdtls.at(b).get("rate_cal").value == 0 || this.charge_masterdtls.at(b).get("rate_cal").value == '' || this.charge_masterdtls.at(b).get("rate_cal").value == null)
               {
                 chname2 = true;
               }
              if(this.charge_masterdtls.at(b).get("method").value == 0 || this.charge_masterdtls.at(b).get("method").value == '' || this.charge_masterdtls.at(b).get("method").value == null)
               {
                 chname3 = true;
               }
               if(this.charge_masterdtls.at(b).get("app_rate").value == '' || this.charge_masterdtls.at(b).get("app_rate").value == null)
               {
                rate = true;
               }
               if(this.charge_masterdtls.at(b).get("required").value == 0 || this.charge_masterdtls.at(b).get("required").value == '' || this.charge_masterdtls.at(b).get("required").value == null)
               {
                required = true;
               }
            }
            if( chname == true)
            {
              alert("Please Enter Charges Name in  Charges Details Tab!!!");
              this.status = true;
            }
            else if(chname1 == true)
            {
              alert("Please Select Charges Account in Charges Details Tab!!!");
              this.status = true;
            }
            else if(chname2 == true)
            {
              alert("Please Select Rate Calculation in Charges Details Tab!!!");
              this.status = true;
            }
            else if(chname3 == true)
            {
              alert("Please Select Method in Charges Details Tab!!!");
              this.status = true;
            }
            else if(rate == true)
            {
              alert("Please Enter Rate  in Charges Details Tab!!!");
              this.status = true;
            }
            else if(required == true)
            {
              alert("Please Select Required in Charges Details Tab!!!");
              this.status = true;
            }
            else{
              if(this.Id>0)
              {
                this.Service.updateChargemaster(this.userForm.getRawValue(), this.Id).subscribe(data => 
                  {
                    console.log(this.userForm.getRawValue());
                    alert("Charges Master Updated successfully.");
                    this.userForm.reset();
                    //refresh dropdown list
                    this.ngOnInit();
                    this.isHidden = false;
                    this.status = true;
                    //Refresh Dynemic table
                    while(this.charge_masterdtls.length)
                    this.charge_masterdtls.removeAt(0);
                    this.add();
                  });
              }
              else
              {
                this.Service.createChargemaster(this.userForm.getRawValue()).subscribe(data => 
                  {
                    console.log(this.userForm.value);
                    alert("New Charges Master created successfully.");
                    this.userForm.reset();
                    //refresh dropdown list
                    this.ngOnInit();
                    this.isHidden = false;
                    this.status = true;
                    //Refresh Dynemic table
                    while(this.charge_masterdtls.length)
                    this.charge_masterdtls.removeAt(0);
                    this.add();
                  });
              }
            }
        }
      }
    } 

  }
