import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { Item_category_master } from '../../../../../../Models/ItemModel/ItemCatagoryMaster';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { forkJoin } from 'rxjs';
  @Component({
    selector: 'app-itemcategorymaster',
    templateUrl: './ItemCategoryMaster.component.html',
    styleUrls: ['./ItemCategoryMaster.component.scss']
  })

  export class ItemcategorymasterComponent implements OnInit 
  {
    submitted = false;
    public userForm:FormGroup;
    public searchText : string;
    listItem_category_master: Item_category_master[];
    model:Item_category_master=new Item_category_master(); 
    itemtypes:any =[];
    Id: any;
    isHidden=false;
    status = false;
    isValid:boolean=false;
    seq_no: string;
    company_name:any;
    activeIsChecked: any;
    iCatCodeReadOnly:boolean = true;
    itemcatagorymastersave:boolean=true;
    itemcatagorymasterupdate:boolean=true;
    itemcatagorymasterdelete:boolean=true;
    itemcatagorymasterview:boolean=true;
    action:any;
    catagoryname:any;

    @ViewChild('iCodeInput') _itemCatCode: ElementRef;
    public fb1:FormBuilder;

    constructor(public fb:FormBuilder, private Service: Master,
      private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group({
        id:[''],
        catagory_id:[''],
        catagory_code: [''],
        catagory_name: [''],
        item_active: [''],
        item_type: [''],
        company_id: [''],
        fin_year: [''],
        username: ['']});
    }

    get id(){ return this.userForm.get("id") as FormControl }
    get catagory_id(){ return this.userForm.get("catagory_id") as FormControl }
    get catagory_code(){ return this.userForm.get("catagory_code") as FormControl }
    get catagory_name(){ return this.userForm.get("catagory_name") as FormControl }
    get item_active(){ return this.userForm.get("item_active") as FormControl }
    get item_type(){ return this.userForm.get("item_type") as FormControl }
  
    ngOnInit() 
    {
      this.action='save';
      //For User Role
      let user_role=localStorage.getItem("user_role")+"tuhinabcd"+"item_master";
           this.DropDownListService.getRoleItemMaster(user_role).subscribe(data=>{
           let accessdata=JSON.stringify(data);
         
           this.itemcatagorymastersave=false;
           this.itemcatagorymasterupdate=false;
           this.itemcatagorymasterdelete=false;
           this.itemcatagorymasterview=false;
        
           if(accessdata.includes('item_catagory.save'))
           {
            this.itemcatagorymastersave = true;
           }
          if(accessdata.includes('item_catagory.update'))
           { 
             this.itemcatagorymasterupdate=true;
           }
           if(accessdata.includes('item_catagory.delete'))
           {
             this.itemcatagorymasterdelete=true;
           }
           if(accessdata.includes('item_catagory.view'))
           {
             this.itemcatagorymasterview=true;
           }

           }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
           });  

      this.catagoryname = '';
      this.activeIsChecked = true;
      this.company_name = localStorage.getItem("company_name");
      this.userForm.patchValue({item_type: "0"});
      //this.DropDownListService.getItemCategorySequenceId("prefix="+"ICM"+"&company="+this.company_name).subscribe(data=>{this.seq_no = data.sequenceid;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      //this.ngOnInit()}); 
      this.DropDownListService.itemTypeList(this.company_name).subscribe(data=>{this.itemtypes  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      this.Service.getItemCategories(this.company_name) .subscribe( data=>{this.listItem_category_master  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
      forkJoin(
          this.DropDownListService.getItemCategorySequenceId("prefix="+"ICM"+"&company="+this.company_name),
          this.DropDownListService.getSystemSettingsByComp("comp="+this.company_name),
        ).subscribe(([seqId,settingData])=>
          {
            if(settingData["generator_status"] == "Yes"){
              this.seq_no = seqId["sequenceid"];

//console.log("tuhin " +  seqId["sequenceid"] + " // " + this.company_name);
            }
            else
            {
              //console.log("tuhin else" +  seqId["sequenceid"]);
              this.iCatCodeReadOnly=false;
            }
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Item catogary Code isn't generated and thus caused error ....");
      this.ngOnInit()});
      
      this.status = true;
    }

    search(event)
    {
      let serchText = event.target.value;
      serchText=this.Service.replaceAllSpl(serchText,"&","ampersand");
      serchText=this.Service.replaceAllSpl(serchText,"/","backslash");
      
      if(event.key == "Enter")
      {
        this.status = false;
        if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
        {
          this.DropDownListService.findItemCategories(this.company_name, '0').subscribe(data=>
          {
            this.listItem_category_master = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findItemCategories(this.company_name, serchText).subscribe(data=>
          {
            this.listItem_category_master = data;
            this.status = true;
          });     
        }
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id:[''],
        catagory_id:[''],
        catagory_code: [''],
        catagory_name: [''],
        item_active: [''],
        item_type: [''],
        company_id: [''],
        fin_year: [''],
        username: ['']});
       // this.ngOnInit();
    }

    showList(s:string)
    {
      
      if(this.itemcatagorymasterupdate == true  && this.itemcatagorymastersave == true)//true exist  false not exist 
      {
        if(s=="add")
        {       
          this.isHidden=true;    
          this.userForm.reset(this.ResetAllValues().value); 
          this.ngOnInit();
        }
      }
      if(this.itemcatagorymasterupdate == false && this.itemcatagorymastersave == true)
      {

        if(s=="add")
        {
        
          this.isHidden=true;
         
         this.userForm.reset(this.ResetAllValues().value); 
         this.ngOnInit();
         
        }
      }
      
      if(s=="list")
      {this.isHidden=false;
        this.ngOnInit();
        //this.userForm.reset(this.ResetAllValues().value);
      }
    }

    onUpdate(id:any,action)
    {
      this.itemcatagorymastersave =true;
      this.isHidden = true;
      this.status = false;
      if(action == 'view')
      {
        this.action = 'view';
      }
      else
      {this.action = 'update';}
      this.Service.retriveItemCatagory(id).subscribe(data=>
      {
        this.userForm.patchValue(data);
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
    }

    chkItemCodeStatus(event: any)
    {
        if(event.target.value !=null && event.target.value !='')
        {
          this.DropDownListService.chkItemCatagoryCodeStatus(event.target.value).subscribe(data=>
          {
            if(data.status=='EXIST')
            {
              alert("Already Exist Code : "+event.target.value +" . Please Change this Code !!!" );
              this._itemCatCode.nativeElement.focus(); 
              this.userForm.patchValue({catagory_code:null});  
              this.itemcatagorymastersave = false;// false  not show
            } else {
              this.itemcatagorymastersave = true;// true show
            }
          });
        }
    }
  
    send()
    {
      this.Id= this.userForm.get("id").value as FormControl;
      this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
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
        this.status = false
        if(this.userForm.get("item_type").value == null || this.userForm.get("catagory_name").value == "" )
        {
          alert("Please Enter Catagory Name!!!!  ");
          this.status=true;
        }
        else if(this.userForm.get("item_type").value == null || this.userForm.get("item_type").value == 0 )
          {
            alert("Please Select Item Type!!!!  ");
            this.status=true;
          }
          else{
            if(this.Id>0)
             {
                this.Service.updateItemCategory(this.userForm.getRawValue(), this.Id).subscribe(data => 
                {
                  console.log(this.userForm.value);
                  alert("Item Category updated successfully.");
                  this.userForm.reset(this.ResetAllValues().value);
                  //refresh List;
                  this.ngOnInit();
                  this.isHidden=false;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Item Category updation Unsuccessfull...");
               // this.ngOnInit()
               }); 
              }
              else{
                this.Service.createItemCategory(this.userForm.getRawValue()).subscribe(data => 
                {
                  console.log(this.userForm.value);
                  if(data.catagory_id =='' || data.catagory_id ==null)
                  {
                    alert("Opps !!! Can't save this Item Category !!!");
                  }else{
                    alert("Item Category created successfully.");
                  }
                  this.userForm.reset(this.ResetAllValues().value);
                  this.ngOnInit();
                  this.isHidden=false;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Item Category creation Unsuccessfull...");
                //this.ngOnInit()
              });
            }
          }  
      }
    }

    onDelete(id:any)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Item Category ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.Service.deleteItemCategory(this.userForm.getRawValue(),id).subscribe(data=> 
        {
          console.log("Cat id:"+data.catagory_id);
          if(data.catagory_id=='')
          {
            alert("Opps!!! Can't delete this Item Category !!!");
          }else{
            alert("Item Category deleted successfully.");
          }
          this.status = true;
          this.ngOnInit()
        }); 
      }  
      this.status = true;
    }

    con_acc:any;
    groupstat1:any;
    onFocusoutCheckUnique(event: any)
    {
      if(event.target.value != "" && event.target.value != "0" && event.target.value != null){
        this.DropDownListService.chkCatNameStat(event.target.value).subscribe(data=>
          {
            this.groupstat1 = data.group_name;
            if(this.groupstat1=='EXIST')
            {
              window.alert(event.target.value +"  "+ "already exist please change" );
              this.itemcatagorymastersave = false;
            }
            else
            {
              this.itemcatagorymastersave = true;
            }
          });
          this.groupstat1='';
      }
    }

 
 }

