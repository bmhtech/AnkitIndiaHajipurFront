import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ShopFloorAccess } from '../../../../Models/Storemodel/ShopFloorAccess';
import { DropdownServiceService } from '../../../../service/dropdown-service.service';
import { Master } from '../../../../service/master.service';

@Component({
  selector: 'app-shopflooraccess',
  templateUrl: './shopflooraccess.component.html',
  styleUrls: ['./shopflooraccess.component.scss']
})
export class ShopflooraccessComponent implements OnInit {

  public userForm:FormGroup;
  status = false;
  isHidden:any;
  model: ShopFloorAccess = new ShopFloorAccess();
  bussiness_unit_list:any=[];
  employeelist:any=[];
  ShopFloorList:any=[];
  accesslist:any=[];
  BuUnit = "0";
  company_name:any;
  Id:any;
  accesssave:boolean = true;
  unita:any;

  constructor(public fb:FormBuilder,private Service: Master, private DropDownListService: DropdownServiceService)
   { 
    this.userForm=fb.group(
      {
        id:[''],
        accessid:[''],
        business_unit:[''],     
        shop_floor:[''],   
        operator_name:[''],
        company_id:[''],
        fin_year:[''],
        username:['']
      });
   }
   get id(){ return this.userForm.get("id") as FormControl }
   get accessid(){ return this.userForm.get("accessid") as FormControl }
   get shop_floor(){ return this.userForm.get("shop_floor") as FormControl }
   get business_unit(){ return this.userForm.get("business_unit") as FormControl }
   get operator_name(){ return this.userForm.get("operator_name") as FormControl }
   get company_id(){ return this.userForm.get("company_id") as FormControl }
   get fin_year(){ return this.userForm.get("fin_year") as FormControl }
   get username(){ return this.userForm.get("username") as FormControl }

  ngOnInit() {
    this.isHidden=false;
    this.status=true;
    this.company_name = localStorage.getItem("company_name");
    let finyear =localStorage.getItem("financial_year");
    this.BuUnit = "0";
   forkJoin(
    this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
    this.DropDownListService.getEmployeeNamenew(this.company_name),
    this.DropDownListService.getAccesslist(finyear)
    )
   .subscribe(([budata,emplist,accesslists])=>
    {
    
        this.bussiness_unit_list=budata;
        this.employeelist=emplist;
        this.accesslist=accesslists;
        
    });
  }
  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
      this.userForm.reset();
    }
    if(s=="list")
    {
      this.isHidden=false;
      this.userForm.reset();
    }
  }

  sf:any;
  bunit:any;
  onChangeBusinessUnit(s:string)
    {
      if(s!='0')
      {
        this.bunit=s;
        this.DropDownListService.getShopFloorThruBU(s).subscribe(data=>{this.ShopFloorList = data;});
      }
    }
    shop:any;
    send(value1:any)
    {
      this.shop=value1;
      this.userForm.patchValue({shop_floor:this.shop.toString()});
      this.Id= this.userForm.get("id").value as FormControl; 
      this.userForm.patchValue({company_id: localStorage.getItem("company_name"),
      fin_year:localStorage.getItem("financial_year"), 
      username: localStorage.getItem("username")});
      this.status=false;
      
      if(this.userForm.get("business_unit").value == '' || this.userForm.get("business_unit").value == 0 || this.userForm.get("business_unit").value == null)
      {
        alert("Please Select Bussiness Unit Name!")
        this.status=true;
      }
      else if(this.userForm.get("shop_floor").value == null || this.userForm.get("shop_floor").value == 0)
      {
        alert("Please Select Shop Floor");
        this.status=true;
      }
      else
      {
        if(this.Id>0)
            {
              this.Service.updateFloorAccess(this.userForm.getRawValue(), this.Id).subscribe( data => 
                {
                  alert("Shop Floor Access Updated successfully.");
                  this.userForm.reset();
                  this.isHidden = false;
                  this.showList('list');
                  this.ngOnInit();
                  this.status=true;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in Store Floor Access !!! please Reload the page and try again....");
                }); 
            }
            else
            {
              this.Service.createFloorAccess(this.userForm.getRawValue())
              .subscribe(data =>
              {
                alert("Shop Floor Access Saved successfully.");
                this.userForm.reset();
                this.showList('list');
                this.ngOnInit();
                this.status=true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in Store Floor Access !!! please Reload the page and try again....");
              });
            }
      }

    }

    onUpdate(id,action)
    {
      this.isHidden=true;
       if(action == "view")
      {
        this.accesssave=false;
      }
      if(action == "update")
      {
        this.accesssave=true;
      }
      forkJoin(
        this.DropDownListService.retriveFloorAccess(id),
        this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
        this.DropDownListService.getEmployeeNamenew(this.company_name)
        ).subscribe(([accessdata,bUnitData,emplist])=>
        {
              this.onChangeBusinessUnit(accessdata["business_unit"]);
              this.unita=accessdata["shop_floor"].split(',');
              this.bussiness_unit_list=bUnitData;
              this.employeelist=emplist;
              this.userForm.patchValue(accessdata);
             
        });

    }
   
    onDelete(id)
    {
      if(confirm("Are you sure to delete this Shop Floor Access From List?"))
      { 
          this.userForm.patchValue({username: localStorage.getItem("username")});
          this.Service.deleteFloorAccess(this.userForm.getRawValue(),id).subscribe(data=> 
            {
              alert("Shop Floor Access Deleted successfully.");
              this.userForm.reset();
              this.status = true;
              this.ngOnInit();
            });
      }
    }

}
