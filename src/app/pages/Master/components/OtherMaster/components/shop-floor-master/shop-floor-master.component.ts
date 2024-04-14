import { Component, OnInit } from '@angular/core';
import { Shop_floor_master } from '../../../../../../Models/OtherMaster/Shopfloormodel';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FormControl,FormArray } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';

@Component({
  selector: 'app-shop-floor-master',
  templateUrl: './shop-floor-master.component.html',
  styleUrls: ['./shop-floor-master.component.scss']
})
export class ShopFloorMasterComponent implements OnInit {
  submitted = false;
  model: Shop_floor_master = new Shop_floor_master();
  listShop_floor_master: Shop_floor_master[];
  public userForm:FormGroup;
  isHidden=false;
  status = false;
  Id:any;
  bUnitCodes:any=[];
  company_name:any;
  seq_no:string;
  shopfloorsave:boolean=true;
  shopfloorupdate:boolean=true;
  shopfloordelete:boolean=true;
  shopfloorview:boolean=true;
  constructor
  (
    public fb:FormBuilder,
    public dialog: MatDialog,
    private Service : Master,
    private DropDownListService: DropdownServiceService
  ) 

  {
    this.userForm=fb.group
    ({
      id :[''],
      shop_floor_code: [''],  
      shop_floor_id: [''], 
      business_unit: [''],
      shop_floor_name: [''],
      shop_floor_active:[''],
      company_id:[''],
      fin_year:[''],   
      username:[''],
    });  
   }

   get id(){ return this.userForm.get("id") as FormControl }
   get shop_floor_id(){ return this.userForm.get("shop_floor_id") as FormControl }
   get shop_floor_code(){ return this.userForm.get("shop_floor_code") as FormControl }
   get business_unit(){ return this.userForm.get("business_unit") as FormControl }
   get shop_floor_name(){ return this.userForm.get("shop_floor_name") as FormControl }
   get shop_floor_active(){ return this.userForm.get("shop_floor_active") as FormControl }
   get company_id(){ return this.userForm.get("company_id") as FormControl }
   get fin_year(){ return this.userForm.get("fin_year") as FormControl }
   get username(){ return this.userForm.get("username") as FormControl }

  ngOnInit() 
   {
     //For User Role
     let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
     
     this.shopfloorsave=false;
     this.shopfloorupdate=false;
     this.shopfloordelete=false;
     this.shopfloorview=false;

     if(accessdata.includes('shop_floor_master.save'))
     { 
       this.shopfloorsave=true;
     }
     if(accessdata.includes('shop_floor_master.update'))
     { 
       this.shopfloorupdate=true;
     }
     if(accessdata.includes('shop_floor_master.delete'))
     { 
       this.shopfloordelete=true;
     }
     if(accessdata.includes('shop_floor_master.view'))
     { 
       this.shopfloorview=true;
     }

    this.company_name = localStorage.getItem("company_name");
    this.Service.findAllShopFloor().subscribe(data=>{this.listShop_floor_master  = data;});
    this.DropDownListService.getSFSequenceId(this.company_name).subscribe(data=>{this.seq_no = data.sequenceid;}); 
    this.userForm.patchValue({business_unit:"0"});
 //this.DropDownListService.getCompanyBUMNCList(this.company_name).subscribe(data=>{this.bussiness_unit_list = data;});
    this.DropDownListService.getCompanyBUMNCList(this.company_name).subscribe(data=>{this.bUnitCodes = data;});
    this.status = true;
   }

   showList(s:string)
   {
    if(this.shopfloorsave == true  && this.shopfloorupdate == true)//true exist  false not exist 
    {
      if(s=="add")
        {
          this.isHidden=true;
          this.userForm.patchValue({business_unit:"0"})
          this.userForm.reset(this.ResetAllValues().value);
        }
    }
    if(this.shopfloorsave == true  && this.shopfloorupdate == false) 
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.patchValue({business_unit:"0"})
          this.userForm.reset(this.ResetAllValues().value);
        }
      }
     if(s=="list")
     {
       this.isHidden=false;
       this.shopfloorsave=true;
       this.userForm.reset(this.ResetAllValues().value);
     }
   }

   ResetAllValues()
   {
     return this.userForm=this.fb.group({
      id :[''],
      shop_floor_id:[''],
      shop_floor_code: [''],   
      business_unit: [''],
      shop_floor_name: [''],
      shop_floor_active:[''],
      company_id:[''],
      fin_year:[''],   
      username:[''],   
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
         this.DropDownListService.findShopFloor('0').subscribe(data=>
         {
           this.listShop_floor_master = data;
           this.status = true;
         });
       }
       else
       {
         this.DropDownListService.findShopFloor(serchText).subscribe(data=>
         {
           this.listShop_floor_master = data;
           this.status = true;
         });  
         this.status = true;   
       }
     }
   }
 
   onDelete(id:any,shop_floor_id)
   {
     this.status = false;
     if(confirm("Are you sure to delete this Shop Floor ?"))
     { 
      this.userForm.patchValue({username: localStorage.getItem("username")});

      this.DropDownListService.checkShopFloorUsage(shop_floor_id).subscribe(shopFloor=> 
        {
           // alert("bidhan here::"+checkCustomer.status);
          if(shopFloor.status=='No')
          {
            this.Service.deleteShopFloor(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                console.log("Cat id:"+data.shop_floor_code);
        
                if(data.shop_floor_code=='' || data.shop_floor_code==null)
                {
                  alert("Opps!!! Can't delete this Shop Floor !!!");
                }else{
                  alert("Shop Floor deleted successfully.");
                }
                this.status = true;
                this.ngOnInit()
              }); 
          }
          else
          {
            alert("This Shop Floor is Already Used,Can not be Deleted!! ");
          }
        });
     
     }  
     this.status = true;
   }

   onUpdate(id:any,action)
   {
    if(action == 'update' )
    {
      this.shopfloorsave=true;
    }
    else
    {
      this.shopfloorsave=false;
    }
    
     this.isHidden = true;
     this.status = false;
     this.Service.retriveShopFloor(id).subscribe(data=>
     {  
       this.userForm.patchValue(data); 
       this.status = true;
     });
   }

   send()
   {
     this.Id= this.userForm.get("id").value as FormControl; 
    
     if(!this.userForm.valid) 
     {
       alert('Please fill all fields!')
       return false;
     } 
     else 
     {
      this.status=false;
      if(this.userForm.get("shop_floor_name").value == '' || this.userForm.get("shop_floor_name").value == null || this.userForm.get("shop_floor_name").value == 0)
      {
        alert("Please Enter Shop Floor Name");
        this.status=true;
      }
      else if(this.userForm.get("business_unit").value == '' || this.userForm.get("business_unit").value == null || this.userForm.get("business_unit").value == 0)
      {
        alert("Please Select Bussiness Unit Name");
        this.status=true;
      }
      else
      {
        if(this.Id>0)
         {
           this.Service.updateShopFloor(this.userForm.getRawValue(), this.Id).subscribe(data => 
           {
             //console.log(this.userForm.value);
             alert("Shop Floor Master updated successfully.");
             this.userForm.reset();
             //refresh List;
             this.ngOnInit();   
             this.isHidden = false; 
             this.status = true;         
           });
         }
         else
           {
             this.userForm.patchValue({shop_floor_code: this.seq_no,company_id: localStorage.getItem("company_name"), 
             fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
             this.submitted = true;
             this.Service.createShopFloor(this.userForm.getRawValue()).subscribe(data => 
             {
               //console.log(this.userForm.value);
               alert("Shop Floor Master created successfully.");
               this.userForm.reset();
               //refresh List;
               this.ngOnInit();   
               this.isHidden = false; 
               this.status = true;         
             });
           }
      }
       
       }
   }

}
