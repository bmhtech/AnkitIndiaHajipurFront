import { Component, OnInit } from '@angular/core';
import { StoreCharges } from '../../../../../../Models/OtherMaster/StoreCharges';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-store-inventory-charges',
  templateUrl: './store-inventory-charges.component.html',
  styleUrls: ['./store-inventory-charges.component.scss']
})
export class StoreInventoryChargesComponent implements OnInit {
  isHidden = false;
  basislist: {};
  submitted = false;
  model:StoreCharges=new StoreCharges();
  ledgerName:any=[];
  listCharges:any=[];
  public userForm: FormGroup;
  Id:any;
  status = false;
  storechargesave:boolean=false;
  company_name:any;
  Username:any;
  financialYear:any;

  constructor(public fb: FormBuilder, private Service: Master,
     private DropDownListService: DropdownServiceService)
      { 
        this.userForm=fb.group({
          id:[''],
          store_charge_id:[''],
          store_charge_desc: [''],
          company_id: [''],
          fin_year: [''],
          username: [''],
  
          store_inv_charge_master_dtls: this.fb.array([this.fb.group({
            store_charge_id:'',
            store_charge_name:'',
            store_charge_ac:'',
            store_charge_ac_name:''})])
        });
      }
      get id(){ return this.userForm.get("id") as FormControl }
      get store_charge_id(){ return this.userForm.get("store_charge_id") as FormControl }
      get store_charge_desc(){ return this.userForm.get("store_charge_desc") as FormControl }
  
      get company_id(){ return this.userForm.get("company_id") as FormControl }
      get fin_year(){ return this.userForm.get("fin_year") as FormControl }
      get username(){ return this.userForm.get("username") as FormControl }
      get store_inv_charge_master_dtls(){return this.userForm.get('store_inv_charge_master_dtls') as FormArray;}

  ngOnInit() {
    this.storechargesave=true;
    this.company_name = localStorage.getItem("company_name");
    this.Username = localStorage.getItem("username");
    this.financialYear = localStorage.getItem("financial_year");
    forkJoin(
    this.DropDownListService.ledgerList(),
    this.DropDownListService.getStoreChargesList(),
    ).subscribe(([ledgerdata,storelist])=>
    {
      //console.log("storelist:"+JSON.stringify(storelist))
      this.ledgerName=ledgerdata;
      this.listCharges=storelist;
    });
    this.status = true;
  }

  showList(s:string)
  {
  
      if(s=="add")
      {
        this.isHidden=true;
        this.userForm.reset(this.ResetAllValues().value);
      }
   
    if(s=="list")
    {
      this.isHidden=false;
      this.storechargesave=true;
      this.userForm.reset(this.ResetAllValues().value);
    }
  }

  ResetAllValues()
  {
    return this.userForm=this.fb.group({
      id:[''],
      store_charge_id:[''],
      store_charge_desc: [''],
      company_id: [''],
      fin_year: [''],
      username: [''],

      store_inv_charge_master_dtls: this.fb.array([this.fb.group({
        store_charge_id:'',
        store_charge_name:'',
        store_charge_ac:'',
        store_charge_ac_name:''})])
    });
  }

  add() 
    {
      this.store_inv_charge_master_dtls.push(this.fb.group({
        store_charge_id:'',
        store_charge_name:'',
        store_charge_ac:'',
        store_charge_ac_name:''}));
    }
  delete(index) 
  {
    if(index)
    {this.store_inv_charge_master_dtls.removeAt(index);}
    else
    {alert("can't delete all rows");} 
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
            if(this.userForm.get("store_charge_desc").value == '' || this.userForm.get("store_charge_desc").value == null)
            {
              alert("Please Enter Store Charges Description!!!");this.status = true;
            }
          else
          {
            let chname = false;
            let chname1 = false;
            for(let b=0;b<this.store_inv_charge_master_dtls.length;b++)
            {
              if(this.store_inv_charge_master_dtls.at(b).get("store_charge_name").value == null || this.store_inv_charge_master_dtls.at(b).get("store_charge_name").value == '')
              {
                chname = true;
              }
              if(this.store_inv_charge_master_dtls.at(b).get("store_charge_ac").value == 0 || this.store_inv_charge_master_dtls.at(b).get("store_charge_ac").value == '' || this.store_inv_charge_master_dtls.at(b).get("store_charge_ac").value == null)
               {
                 chname1 = true;
               } 
            }
            if( chname == true)
            {
              alert("Please Enter Store Charges Name in Details Tab!!!");
              this.status = true;
            }
            else if(chname1 == true)
            {
              alert("Please Select Charges Account in Details Tab!!!");
              this.status = true;
            }
            else{
              if(this.Id>0)
              {
                this.Service.updateStoreChargeMaster(this.userForm.getRawValue(), this.Id).subscribe(data => 
                  {
                    console.log(this.userForm.getRawValue());
                    alert("Store Charges Master Updated successfully.");
                    this.userForm.reset();
                    //refresh dropdown list
                    this.ngOnInit();
                    this.isHidden = false;
                    this.status = true;
                    //Refresh Dynemic table
                    while(this.store_inv_charge_master_dtls.length)
                    this.store_inv_charge_master_dtls.removeAt(0);
                    this.add();
                  });
              }
              else
              {
                this.Service.createStoreChargeMaster(this.userForm.getRawValue()).subscribe(data => 
                  {
                    console.log(this.userForm.value);
                    alert("New Store Charges Master created successfully.");
                    this.userForm.reset();
                    //refresh dropdown list
                    this.ngOnInit();
                    this.isHidden = false;
                    this.status = true;
                    //Refresh Dynemic table
                    while(this.store_inv_charge_master_dtls.length)
                    this.store_inv_charge_master_dtls.removeAt(0);
                    this.add();
                  });
              }
            }
        }
      }
    } 

    onUpdate(id,store_charge_id,action)
    {
      this.isHidden = true;
      this.status = false;
      if(action=='update')
      {
        this.storechargesave=true;
      }
      else
      {
        this.storechargesave=false;
      }
      forkJoin(
        this.DropDownListService.retriveStoreInventoryChgs(id),
        this.DropDownListService.getStoreChargeMasterDtlsList(store_charge_id)
      ).subscribe(([storeInventory, storeInventoryDtls])=>
        {
          this.userForm.patchValue(storeInventory);
         //console.log("Transdetails: "+JSON.stringify(storeInventory));       
 
        let k = 0;
        while (this.store_inv_charge_master_dtls.length ) 
        {this.store_inv_charge_master_dtls.removeAt(0);}
        for(let data1 of storeInventoryDtls)
        {
          this.add(); 
          this.store_inv_charge_master_dtls.patchValue(storeInventoryDtls);
          k = k + 1;
        }
        //this.transportation_chgs_matrix_details.patchValue(ChgsMatrixDtls);
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured on Store Inventory Charges Master,please try again....");
      this.ngOnInit()});
     }

    onDelete(id:any,chargecode)
     {
       this.status = false;

       if(confirm("Are you sure to delete this Store Charges Master ?"))
       { 
        this.userForm.patchValue({username: localStorage.getItem("username")});

        this.DropDownListService.checkStoreChargeMasterUsage(chargecode).subscribe(checkStoreChargeData=> 
          {
           ///let dataq=JSON.parse(checkItem);
           //console.log("bidhan here::"+checkChargeData.status);
           if(checkStoreChargeData.status=='No')
           {
             this.Service.deleteStoreChargeMaster(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                console.log("Cat id:"+data.store_charge_desc);
        
                if(data.store_charge_desc=='' || data.store_charge_desc==null)
                {
                  alert("Opps!!! Can't delete this Store Inventory Charges Master !!!");
                }else{
                  alert("Store Inventory Charges Master deleted successfully.");
                }
                this.userForm.reset();
                this.status = true;
                this.isHidden = false;
                this.ngOnInit();
                this.showList("list");
              });
           }
           else{
            alert("This Store Inventory Charges Master is Already Used,Can not be Deleted!! ");
           }
            
          });
 
       }  
       this.status = true;
     }

}
