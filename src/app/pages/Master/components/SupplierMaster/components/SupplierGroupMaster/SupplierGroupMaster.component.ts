import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { Supplier_group } from '../../../../../../Models/SupplierModel/Supplier_group';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { stringify } from 'querystring';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

  @Component({
    selector: 'app-itemcategorymaster',
    templateUrl: './SupplierGroupMaster.component.html',
    styleUrls: ['./SupplierGroupMaster.component.scss']
  })

  export class SupplierGroupmasterComponent implements OnInit 
  { 
    submitted = false;
    public userForm:FormGroup;
    // public searchText: string
    model:Supplier_group=new Supplier_group();
    listSupplierGroup: Supplier_group[];
    subGroupNames:{};
    Id: any;
    company_name:any;
    userParentGroups:{};
    isHidden=false;
    status = false;
    seq_no: string;
    bp_type1:string;
    activeIsChecked:any;
    isValid:boolean=false;
    groupnme:string;
    suppliergroupsave:boolean=true;
    suppliergroupdelete:boolean=true;
    suppliergroupupdate:boolean=true;
    suppliergroupview:boolean=true;
    action:any;
    bpgrp_name:any;
    
    @ViewChild('iCodeInput') _SupplierGrpCode: ElementRef;
    businessunit_id:any;
  
    constructor(public fb:FormBuilder, private Service: Master,
      private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group({
        id:[''],
        bp_group_code: [''],
        bp_group_id: [''],
        bp_type: [''],
        bp_grp_name: [''],
        bp_grp_active: [''],
        control_acc: [''],
        parent_group: [''],
        company_id: [''],
        fin_year: [''],
        username: [''],
        unit:['']
      });
    }

    get id(){ return this.userForm.get("id") as FormControl }
    get bp_group_id(){ return this.userForm.get("bp_group_id") as FormControl }
    get bp_group_code(){ return this.userForm.get("bp_group_code") as FormControl }
    get bp_type(){ return this.userForm.get("bp_type") as FormControl }
    get bp_grp_name(){ return this.userForm.get("bp_grp_name") as FormControl }
    get bp_grp_active(){ return this.userForm.get("bp_grp_active") as FormControl }
    get control_acc(){ return this.userForm.get("control_acc") as FormControl }
    get parent_group(){ return this.userForm.get("parent_group") as FormControl }

    
    ngOnInit() 
    {
      let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
    
      this.suppliergroupsave=false;
      this.suppliergroupupdate=false;
      this.suppliergroupdelete=false;
      this.suppliergroupview=false;
    
      if(accessdata.includes('supplier_group.save'))
      { 
        this.suppliergroupsave = true;
      }
      if(accessdata.includes('supplier_group.update'))
      { 
        this.suppliergroupupdate=true;
      }
      if(accessdata.includes('supplier_group.delete'))
      {
        this.suppliergroupdelete=true;
      }
      if(accessdata.includes('supplier_group.view'))
      {
        this.suppliergroupview=true;
      }
 
      this.bpgrp_name='';
      //For User Role
      let user_role=localStorage.getItem("user_role")+"tuhinabcd"+"supplier_master";
      this.DropDownListService.getRoleItemMaster(user_role).subscribe(data=>{
      let itemtype=JSON.stringify(data);
    
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});  

     // this.user=this.mystring.split(',');
     //this.userForm.patchValue({businessunit_id: this.mystring.split(',')});
      this.bp_type1="Supplier";
      this.activeIsChecked = true
      this.company_name = localStorage.getItem("company_name");
      this.DropDownListService.getSupplierGroupSequenceId("prefix="+"SGR"+"&company="+this.company_name).subscribe(data=>{this.seq_no = data.sequenceid;});   
      this.userForm.patchValue({parent_group: "0",control_acc: "0"});
      this.status = true;
      // this.Service.getSupplierGroup().subscribe(data=>{this.listSupplierGroup  = data;});
      // this.DropDownListService.controlAccList().subscribe(data=>{this.subGroupNames  = data;});
      // this.DropDownListService.supplierNameCodeList().subscribe(data=>{ this.userParentGroups = data;});
      forkJoin(
        this.Service.getSupplierGroup(),
       // this.DropDownListService.controlAccList(),
       this.DropDownListService.ledgerList(),
       this.DropDownListService.supplierNameCodeList(),
        
      ).subscribe(([Supplier_group, SubGroupNames, GroupNames])=>
      {
        this.listSupplierGroup  = Supplier_group;
        this.subGroupNames  = SubGroupNames;
        this.userParentGroups  = GroupNames;  
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
      }
    groupstat:any;
    focusOutFunctionGroupName(event: any)
    {
          this.DropDownListService.chkSuppGroupStatus(event.target.value).subscribe(data=>
            {
               this.groupstat = data.group_name;
          
              if(this.groupstat=='EXIST')
              {
                window.alert(event.target.value +"  "+ "already exist please change" );
                this.suppliergroupsave=false;
              }
              else
              {
                this.suppliergroupsave=true;
              }
              
            });
            this.groupstat='';
            
        }
    
  ResetAllValues()
  {
    return this.userForm=this.fb.group({
      id:[''],
      bp_group_code: [''],
      bp_group_id: [''],
      bp_type: [''],
      bp_grp_name: [''],
      bp_grp_active: [''],
      control_acc: [''],
      parent_group: [''],
      company_id: [''],
      fin_year: [''],
      username: [''],
      unit:['']
        
      });
  }

    showList(s:string)
    {
      if(this.suppliergroupsave == true  && this.suppliergroupupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
        // this.userForm.reset();
          this.userForm.patchValue({parent_group: "0",control_acc: "0"});
          //this.userForm.reset(this.ResetAllValues().value);
        }  
      }
      if(this.suppliergroupsave == true  && this.suppliergroupupdate == false)
      {
        if(s=="add")
        {
          this.isHidden=true;
         // this.userForm.reset();
          this.userForm.patchValue({parent_group: "0",control_acc: "0"});
          //this.userForm.reset(this.ResetAllValues().value);
        }  
      }
     
      if(s=="list")
      {
        this.isHidden=false;
        this.userForm.reset();
        this.ngOnInit();
       //this.userForm.reset(this.ResetAllValues().value);
      }
    }

    onUpdate(id:any,action)
    {
      this.suppliergroupsave= true;
      this.isHidden = true;
      this.status = false;
      if(action == 'view')
       {this.suppliergroupsave= false;}
       else
       {this.suppliergroupsave= true; }
      this.Service.retriveSupplierGroup(id).subscribe(data=>
      {
        this.userForm.patchValue(data);
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
    }

    search(event)
    {
      let serchText = event.target.value;
      serchText=this.Service.replaceAllSpl(serchText,"&","ampersand");
      serchText=this.Service.replaceAllSpl(serchText,"/","backslash");
      this.status = false;
      if(event.key == "Enter")
      {
        this.status = false;
        if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
        {
          this.DropDownListService.findSupplierGrps('0',this.company_name).subscribe(data=>
          {
            this.listSupplierGroup = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findSupplierGrps(serchText,this.company_name).subscribe(data=>
          {
            this.listSupplierGroup = data;
            this.status = true;
          });     
        }
      }
    }

    onDelete(id:any)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Supplier Group ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.Service.deleteSupplierGroup(this.userForm.getRawValue(),id).subscribe(data=> 
        {
          console.log("Supplier Group :"+data.bp_group_code);
          if(data.bp_group_code=='' || data.bp_group_code==null)
          {
            alert("Opps!!! Can't delete this Supplier Group !!!");
          }else{
            alert("Supplier Group deleted successfully...");
          }
          this.status = true;
          this.ngOnInit()
        }); 
      }  
      this.status = true;
    }

    chkSupplierGrpCodeStatus(event: any)
    {
       this.status = false;
        if(event.target.value!=null && event.target.value!='')
          {
            this.DropDownListService.chkSupplierGrpCodeStatus(event.target.value).subscribe(data=>
            {
              if(data.status=='EXIST')
              {
                alert("Already Exist Code : "+event.target.value +" . Please Change !!!" );
                this._SupplierGrpCode.nativeElement.focus(); 
                this.status = true;
                this.userForm.patchValue({bp_group_code:null});  
                this.suppliergroupsave=false;
              } else {
                this.suppliergroupsave=true;
                this.status=true;
              }
            });
          }
    }

    send()
    {
      //this.userForm.patchValue({bp_group_code:this.seq_no})
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
        this.status = false;
        if(this.userForm.get("bp_grp_name").value == "" )
        {
          alert("Please Enter Supplier Group Name!!!!  ");
          this.status=true;
        }
        if(this.Id>0)
          {
               this.Service.updateSupplierGroup(this.userForm.getRawValue(), this.Id).subscribe(data=> 
               {
                 console.log(this.userForm.value); 
                 alert("Supplier Group Updated successfully.");
                 //window.location.reload();
                 this.userForm.reset();
                 this.status = true;
                 //refresh List;
                 this.userForm.patchValue({parent_group: "0"});
                 this.ngOnInit()
                 this.isHidden=false;
               }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Supplier Group Updation Unsuccessfull...");
               //this.ngOnInit()
              });
            }
              else{
                 this.Service.createSupplierGroup(this.userForm.getRawValue()).subscribe(data=> 
                 {
                   console.log(this.userForm.value); 
                   alert(" Supplier Group created successfully.");
                   //window.location.reload();
                  this.userForm.patchValue({bp_group_code:this.seq_no})
                   this.userForm.reset();
                   this.status = true;
                   //refresh List;
                   this.userForm.patchValue({parent_group: "0"});
                   this.ngOnInit()
                   this.isHidden=false;
                 }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Supplier Group creation Unsuccessfull...");
                // this.ngOnInit()
                });
              }
            } 
      }
  
  }





  //"CBU00006,CBU00005,CBU00079"