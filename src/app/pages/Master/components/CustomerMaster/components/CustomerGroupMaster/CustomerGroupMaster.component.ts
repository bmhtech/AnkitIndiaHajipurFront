import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Cust_group } from '../../../../../../Models/CustomerModel/CustGroup';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

  @Component({
    selector: 'app-itemcategorymaster',
    templateUrl: './CustomerGroupMaster.component.html',
    styleUrls: ['./CustomerGroupMaster.component.scss']
  })

  export class CustomerGroupMasterComponent implements OnInit 
  {
    submitted = false;
    Id: any;
    public userForm:FormGroup;
    // public searchText:string;
    model: Cust_group = new Cust_group();
    listCust_group: Cust_group[];
    subGroupNames:{};
    customerNames:any = [];
    isHidden=false;
    status = false;
    company_name: any;
    seq_no: any;
    isValid:boolean=false;
    groupnme:string;
    bus_part_name1:any;
    activeIsChecked:any;
    customergroupupdate:boolean=true;
    customergroupdelete:boolean=true;
    customergroupsave:boolean=true;
    customergroupview:boolean=true;
    action:any;
    @ViewChild('iCodeInput') _CustGrpCode: ElementRef;

    constructor(public fb:FormBuilder, private Service: Master,
      private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group({
        id:[''],
        cp_code: [''],
        bus_part_name: [''],
        bus_part_active: [''],
        parent_group: [''],
        grp_code: [''],
        grp_name: [''],   
        ctrl_acc: [''],
        company_id: [''],
        fin_year: [''],
        username: ['']});
    }

    get id(){ return this.userForm.get("id") as FormControl }
    get cp_code(){ return this.userForm.get("cp_code") as FormControl }
    get bus_part_name(){ return this.userForm.get("bus_part_name") as FormControl }
    get parent_group(){ return this.userForm.get("parent_group") as FormControl }
    get bus_part_active(){ return this.userForm.get("bus_part_active") as FormControl }
    get grp_code(){ return this.userForm.get("grp_code") as FormControl }
    get grp_name(){ return this.userForm.get("grp_name") as FormControl }
    get ctrl_acc(){ return this.userForm.get("ctrl_acc") as FormControl }
      
    ngOnInit() 
    {
      let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
  
      this.customergroupsave=false;
      this.customergroupupdate=false;
      this.customergroupdelete=false;
      this.customergroupview=false;
      this.isValid= false;
    
      if(accessdata.includes('customer_group.save'))
      {
      this.customergroupsave = true;
      }
    if(accessdata.includes('customer_group.update'))
      { 
        this.customergroupupdate=true;
      }
      if(accessdata.includes('customer_group.delete'))
      {
        this.customergroupdelete=true;
      }
      if(accessdata.includes('customer_group.view'))
      {
        this.customergroupview=true;
      }

      this.bus_part_name1="Customer";
      this.activeIsChecked = true;
      this.company_name = localStorage.getItem("company_name");
      this.userForm.patchValue({parent_group: "0", ctrl_acc: "0"});
      this.DropDownListService.getCustomerGroupSequenceId("prefix="+"CGR"+"&company="+this.company_name).subscribe(data=>{this.seq_no = data.sequenceid;});   
      this.status = true;
      
      // this.Service.getCustomerGroup().subscribe(data=>{this.listCust_group  = data;});
      // this.DropDownListService.controlAccList().subscribe(data=>{this.subGroupNames  = data;});
      // this.DropDownListService.custNameList().subscribe(data=>{this.customerNames  = data;});
      forkJoin(
        this.Service.getCustomerGroup(),
        //this.DropDownListService.controlAccList(),
        this.DropDownListService.ledgerList(),
        this.DropDownListService.custNameList(),
        
      ).subscribe(([Cus_group, SubGroupNames, GroupNames])=>
      {
        this.listCust_group  = Cus_group;
        this.subGroupNames  = SubGroupNames;
        this.customerNames  = GroupNames;  
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
      }
  
   
    con_acc:any;
    groupstat:any;
    focusOutFunctionGroupName(event: any)
    {

       
          this.DropDownListService.chkCustGroupStatus(event.target.value).subscribe(data=>
            {
               this.groupstat = data.group_name;
              // this.status=true;
              //window.alert( data.group_name);
              if(this.groupstat=='EXIST')
              {
                window.alert(event.target.value +"  "+ "already exist please change" );
                this.customergroupsave=false;
              }
              else
              {
                this.customergroupsave=true;
              }
              
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});
            this.groupstat='';
            
        }
        

    showList(s:string)
    {
      if(this.customergroupsave == true  && this.customergroupupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
         // this.userForm.reset(this.ResetAllValues().value);      
        }
      }
      if(this.customergroupsave == true  && this.customergroupupdate == false)
      {
        if(s=="add")
        {
          this.isHidden=true;
         // this.userForm.reset(this.ResetAllValues().value);      
        }
      }
     
      if(s=="list")
      {
        this.isHidden=false;
        this.customergroupsave= true;
        //this.userForm.reset(this.ResetAllValues().value);
      }
    }

    ResetAllValues()
    {
     return this.userForm=this.fb.group({
      id:[''],
      cp_code: [''],
      bus_part_name: [''],
      bus_part_active: [''],
      parent_group: [''],
      grp_code: [''],
      grp_name: [''],   
      ctrl_acc: [''],
      company_id: [''],
      fin_year: [''],
      username: ['']});     
    }
    
    chkCustGrpCodeStatus(event: any)
    {
        if(event.target.value!=null && event.target.value!='')
          {
            this.DropDownListService.chkCustGrpCodeStatus(event.target.value).subscribe(data=>
            {
              if(data.status=='EXIST')
              {
                alert("Already Exist Code : "+event.target.value +" . Please Change !!!" );
                this._CustGrpCode.nativeElement.focus(); 
                this.userForm.patchValue({bp_trans_code:null});  
                this.customergroupsave=false;
              } else {
                this.customergroupsave=true;
              }
            });
          }
    }
  
    onDelete(id:any)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Customer Group ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.Service.deleteCustGrp(this.userForm.getRawValue(),id).subscribe(data=> 
        {
          console.log("Customer Group :"+data.grp_code);
          if(data.grp_code=='' || data.grp_code==null)
          {
            alert("Opps!!! Can't delete this Customer Group !!!");
          }else{
            alert("Customer Group deleted successfully...");
          }
          this.status = true;
          this.ngOnInit()
        }); 
      }  
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
          this.DropDownListService.findCustomerGrps('0',this.company_name).subscribe(data=>
          {
            this.listCust_group = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findCustomerGrps(serchText,this.company_name).subscribe(data=>
          {
            this.listCust_group = data;
            this.status = true;
          });     
        }
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
        if(this.userForm.get("grp_name").value == null || this.userForm.get("grp_name").value == "" )
        {
          alert("Please Enter Customer Group Name!!!!  ");
          this.status=true;
        }
        if(this.Id>0) 
          {
             this.Service.updateCustomerGrp(this.userForm.getRawValue(), this.Id).subscribe(data => 
              {
                console.log(this.userForm.value);
                alert("Customer Group Updated successfully.");
                //window.location.reload();
                this.userForm.reset();
                this.status = true;
                this.ngOnInit();
                this.isHidden=false;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Customer Group Updation Unsuccessfull...");
             // this.ngOnInit()
            });
            }
            else
            {
              this.Service.createCustomerGroup(this.userForm.getRawValue()).subscribe(data => 
              {
                console.log(this.userForm.value);
                alert("New Customer Group master created successfully.");
                this.userForm.patchValue({grp_code:this.seq_no})
                //window.location.reload();
                this.userForm.reset();
                this.status = true;
                this.ngOnInit();
                this.isHidden=false;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("New Customer Group master creation Unsuccessfull...");
              //this.ngOnInit()
            });
            }
          }
        }

    onUpdate(id:any,action)
    {
      this.customergroupsave= true;
      this.isHidden = true;
      this.status = false;
      if(action == 'view')
       {this.customergroupsave= false;}
       else
       {this.customergroupsave= true;}
      this.Service.retriveCustomerGrp(id).subscribe(data=>
      {
        this.userForm.patchValue(data);
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
    }

  }
