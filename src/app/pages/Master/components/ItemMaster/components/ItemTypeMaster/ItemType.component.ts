import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { Item_type_master } from '../../../../../../Models/ItemModel/ItemTypeMaster';
import { Master } from '../../../../../../service/master.service'; 
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { forkJoin } from 'rxjs';
  
  @Component({
    selector: 'app-grn',
    templateUrl: './ItemType.component.html',
    styleUrls: ['./ItemType.component.scss']})

  export class ItemTypeComponent implements OnInit 
  {
    submitted = false;
    public userForm:FormGroup;
    model:Item_type_master=new Item_type_master();
    listItem_type_master: Item_type_master[];
    item_master:Item_type_master[];
    page=1;
    status = false;
    isHidden = false;
    no_of_page:any;
    seq_no: string;
    isValid: boolean = true;
    company_name:any;
    total_data:any;
    itemtypesave: boolean = true;
    itemtypeview:boolean = true;
    @ViewChild('iCodeInput') _ItemtypeCode: ElementRef;

    constructor(public fb:FormBuilder, private Service: Master,
      private DropDownListService: DropdownServiceService) 
    { 
      this.userForm=fb.group({       
        item_code: [''],
        item_name: [''],
        item_active:[''],
        company_id: [''],
        fin_year: [''],
        username: [''],
        user_role: [''],
      });
    }

    get item_active(){ return this.userForm.get("item_active") as FormControl }
    get item_code(){ return this.userForm.get("item_code") as FormControl }
    get item_name(){ return this.userForm.get("item_name") as FormControl }
  
    
    ngOnInit()
    { 
     //For User Role
     let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
    
          this.itemtypesave=false;
          this.itemtypeview=false;
          
            if(accessdata.includes("item_type.save"))
            {
              this.itemtypesave=true;
            }
            if(accessdata.includes("item_type.view"))
            {
              this.itemtypeview=true;
            }

      this.company_name = localStorage.getItem("company_name");
      this.DropDownListService.getItemTypeSequenceId("prefix="+"ITY"+"&company="+this.company_name).subscribe(data=>{this.seq_no = data.sequenceid;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});  
      this.Service.getItemtypes(this.company_name).subscribe(data=>{this.listItem_type_master  = data;this.no_of_page = Math.ceil(data.length / 10);}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      // alert("length: "+ data.length + "page size: "+ this.no_of_page);
      this.DropDownListService.getItemTypeList(10,1).subscribe(data=>{this.item_master= data}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.status = true;
    }

    search(event)
    {
      let serchText = event.target.value;
      //alert("Lower: "+serchText.toLowerCase());
      //alert("Upper: "+serchText.toUpperCase());
      
      serchText=this.Service.replaceAllSpl(serchText,"&","ampersand");
      serchText=this.Service.replaceAllSpl(serchText,"/","backslash");
      
      if(event.key == "Enter")
      {
        this.status = false;
        if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
        {
          this.DropDownListService.findItemTypes(this.company_name, '0').subscribe(data=>
          {
            this.listItem_type_master = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findItemTypes(this.company_name, serchText).subscribe(data=>
          {
            this.listItem_type_master = data;
            this.status = true;
          });     
        }
      }
    }

    OnClickNext(page_no)
    {
      if(this.page != this.no_of_page)
      {
        this.page = this.page + 1;
        this.DropDownListService.getItemTypeList(10,this.page).subscribe(data=>{this.item_master = data})
      }
    }

    OnClickPrevious(page_no)
    {
      if(this.page != 0)
      {
        this.DropDownListService.getItemTypeList(10, page_no).subscribe(data=>{this.item_master = data})
        this.page = this.page - 1;
        alert("previous: "+this.page);
      }
    }

    showList(s:string)
    {
        if(s=="add")
        {
          this.isHidden=true;
          this.ngOnInit();
        }
     

      
      if(s=="list")
      {
        this.isHidden=false;
        this.itemtypesave=true;
        this.ngOnInit();
      }
    }

    onDelete(id:any)
    {
      this.status = false;
      this.Service.deleteItemType(this.userForm.getRawValue(),id).subscribe(data=> 
        {
          this.status = true;
          alert("Item Type Deleted successfully.");
          this.ngOnInit()
        });   
    }

    chkItemtypeCodeStatus(event: any)
    {
        if(event.target.value!=null && event.target.value!='')
          {
            this.DropDownListService.chkItemTypeCodeStatus(event.target.value).subscribe(data=>
            {
              if(data.status=='EXIST')
              {
                alert("Already Exist Code : "+event.target.value +" . Please Change !!!" );
                this._ItemtypeCode.nativeElement.focus(); 
                this.userForm.patchValue({item_code:null});  
                this.itemtypesave=false;
              } else {
                this.itemtypesave=true;
              }
            });
          }
    }
 
    send(e)
    {

      if(e.clientX)
      {
        this.userForm.patchValue({ 
          company_id: localStorage.getItem("company_name"), fin_year: localStorage.getItem("financial_year"),
          username: localStorage.getItem("username")});
        this.submitted = true;
        if(!this.userForm.valid) 
        {
          alert('Please fill all fields!')
          return false;
        } 
        else 
        {
          this.status = false;
          if(this.userForm.get("item_name").value == '' || this.userForm.get("item_name").value == null || this.userForm.get("item_name").value == 0)
          {
            alert("Please Enter Item Type");
            this.status=true;
          }
          else
          {
            this.Service.createItemtype(this.userForm.getRawValue()).subscribe(data=> 
              {
                console.log(this.userForm.getRawValue());
                alert("New Item Type created successfully.");
                 //window.location.reload();
                this.status = true;
                this.userForm.reset(); 
                this.ngOnInit()
                this.isHidden=false;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("New Item Type creation Unsuccessfull...");
             // this.ngOnInit()
            });
          }       
        }
      }
      else
      {
        
      }
/*
      this.userForm.patchValue({ 
        company_id: localStorage.getItem("company_name"), fin_year: localStorage.getItem("financial_year"),
        username: localStorage.getItem("username")});
      this.submitted = true;
      if(!this.userForm.valid) 
      {
        alert('Please fill all fields!')
        return false;
      } 
      else 
      {
        this.status = false;
        if(this.userForm.get("item_name").value == '' || this.userForm.get("item_name").value == null || this.userForm.get("item_name").value == 0)
        {
          alert("Please Enter Item Type");
          this.status=true;
        }
        else
        {
          this.Service.createItemtype(this.userForm.getRawValue()).subscribe(data=> 
            {
              console.log(this.userForm.getRawValue());
              alert("New Item Type created successfully.");
               //window.location.reload();
              this.status = true;
              this.userForm.reset(); 
              this.ngOnInit()
              this.isHidden=false;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("New Item Type creation Unsuccessfull...");
           // this.ngOnInit()
          });
        }       
      }
      */
    }

    onUpdate(id:any,action)
    {
      if(action == 'view')
      {
        this.itemtypesave=false;
      }
      this.isHidden = true;
      this.Service.retriveItemType(id).subscribe(
      data=>{this.userForm.patchValue(data);  (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()}}); 
    }    
  }


