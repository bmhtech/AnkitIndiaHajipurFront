import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { Broker_group } from '../../../../../../Models/BrokerModel/BrokerGroup';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

  @Component({
    selector: 'app-itemcategorymaster',
    templateUrl: './BrokerGroupMaster.component.html',
    styleUrls: ['./BrokerGroupMaster.component.scss']
  })

  export class BrokerGroupMasterComponent implements OnInit 
  {
    submitted = false;
    public userForm:FormGroup;
    model:Broker_group=new Broker_group();
    listBroker_group: Broker_group[];
    subGroupNames:any=[];
    brokerGroupNames:{};
    Id: any;
    company_name: any;
    isHidden=false;
    status = false;
    seq_no: any;
    isValid=false;
    groupnme:string;
    bus_part_name1:any;
    activeIsChecked:any;
    
    brokergroupsave:boolean=true;
    brokergroupupdate:boolean=true;
    brokergroupdelete:boolean=true;
    brokergroupview:boolean=true;
    action:any;

    @ViewChild('iCodeInput') _BrokerGrpCode: ElementRef;

    constructor(public fb:FormBuilder, private Service: Master,
      private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group({
        id:[''],
        group_id: [''],
        group_code: [''],
        group_name: [''],
        parent_group: [''],
        bg_active: [''],
        control_acc: [''],
        company_id: [''],
        fin_year: [''],
        username: ['']});
    }
    
    get id(){ return this.userForm.get("id") as FormControl }
    get group_id(){ return this.userForm.get("group_id") as FormControl }
    get group_code(){ return this.userForm.get("group_code") as FormControl }
    get parent_group(){ return this.userForm.get("parent_group") as FormControl }
    get group_name(){ return this.userForm.get("group_name") as FormControl }
    get bg_active(){ return this.userForm.get("bg_active") as FormControl }
    get control_acc(){ return this.userForm.get("control_acc") as FormControl }
  
    ngOnInit() 
    {
      let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
      
      this.brokergroupsave=false;
      this.brokergroupupdate=false;
      this.brokergroupdelete=false;
      this.brokergroupview=false;

      if(accessdata.includes('broker_group.save'))
      {
       this.brokergroupsave = true;
      }
     if(accessdata.includes('broker_group.update'))
      { 
        this.brokergroupupdate=true;
      }
      if(accessdata.includes('broker_group.delete'))
      {
        this.brokergroupdelete=true;
      }
      if(accessdata.includes('broker_group.view'))
      {
        this.brokergroupview=true;
      }
    
      this.activeIsChecked = true;
      this.company_name = localStorage.getItem("company_name");
      this.DropDownListService.getBrokerGroupSequenceId("prefix="+"BGR"+"&company="+this.company_name).subscribe(data=>{this.seq_no = data.sequenceid;});   
      this.userForm.patchValue({parent_group: "0", control_acc: "0"});
      // this.Service.getBrokerGroup().subscribe(data=>{this.listBroker_group  = data;});
      // this.DropDownListService.controlAccList().subscribe(data=>{this.subGroupNames  = data;});
      // this.DropDownListService.brokerGroupList().subscribe(data=>{this.brokerGroupNames  = data;});
      forkJoin(
        this.Service.getBrokerGroup(this.company_name),
        //this.DropDownListService.controlAccList(),
        this.DropDownListService.ledgerList(),
        this.DropDownListService.brokerGroupList(),
        
      ).subscribe(([Broker_group, SubGroupNames, GroupNames])=>
      {
        console.log("chk grp names::/"+JSON.stringify(Broker_group));
        this.listBroker_group  = Broker_group;
        this.subGroupNames  = SubGroupNames;
       
        this.brokerGroupNames  = GroupNames;  
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
      }


    con_acc:any;
    groupstat:any;
    focusOutFunctionGroupName(event: any)
    {   
          this.DropDownListService.chkBrokGroupStatus(event.target.value).subscribe(data=>
            {
               this.groupstat = data.group_name;
              // this.status=true;
              //window.alert( data.group_name);
              if(this.groupstat=='EXIST')
              {
                window.alert(event.target.value +"  "+ "already exist please change" );
                this.brokergroupsave=false;
              }
              else
              {
                this.brokergroupsave=true;
              }
              
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");});
            this.groupstat='';
            
        }
       
    
    showList(s:string)
    {
      if(this.brokergroupsave == true  && this.brokergroupupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
         // this.userForm.reset();
          this.userForm.patchValue({parent_group: "0", control_acc: "0"});
         // this.userForm.reset(this.ResetAllValues().value);      
        }  
      }
      if(this.brokergroupsave == true  && this.brokergroupupdate == false)
      {
        if(s=="add")
        {
          this.isHidden=true;
         // this.userForm.reset();
          this.userForm.patchValue({parent_group: "0", control_acc: "0"});
         // this.userForm.reset(this.ResetAllValues().value);      
        }  
      }
     
      if(s=="list")
      {
        this.isHidden=false;
        this.brokergroupsave = true;
       // this.userForm.reset(this.ResetAllValues().value);
      }
    }

    ResetAllValues()
    {
     return this.userForm=this.fb.group({
      id:[''],
      group_id: [''],
      group_code: [''],
      group_name: [''],
      parent_group: [''],
      bg_active: [''],
      control_acc: [''],
      company_id: [''],
      fin_year: [''],
      username: ['']}); 
    }

    onUpdate(id:any,action)
    {
      this.brokergroupsave=true;
      this.isHidden = true;
      this.status = false;
      if(action == 'view')
       {this.brokergroupsave=false;}
       else
       {this.brokergroupsave=true;}
      this.Service.retriveBrokerGrp(id).subscribe(data=>
      {
       // console.log("chk:"+JSON.stringify(data))
        this.userForm.patchValue(data);
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");});
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
          this.DropDownListService.findBrokerGrps('0',this.company_name).subscribe(data=>
          {
            this.listBroker_group = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findBrokerGrps(serchText,this.company_name).subscribe(data=>
          {
            this.listBroker_group = data;
            this.status = true;
          });     
        }
      }
    }

    onDelete(id:any)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Broker Group ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.Service.deleteBrokerGrp(this.userForm.getRawValue(),id).subscribe(data=> 
        {
          console.log("Broker Group :"+data.group_code);
          if(data.group_code=='' || data.group_code==null)
          {
            alert("Opps!!! Can't delete this Broker Group !!!");
          }else{
            alert("Broker Group Deleted successfully.");
          }
          this.status = true;
          this.ngOnInit()
        }); 
      }  
      this.status = true;
    }

    chkBrokerGrpCodeStatus(event: any)
    {
      if(event.target.value!=null && event.target.value!='')
        {
          this.DropDownListService.chkBrokerGrpCodeStatus(event.target.value).subscribe(data=>
          {
            if(data.status=='EXIST')
            {
              alert("Already Exist Code : "+event.target.value +" . Please Change !!!" );
              this._BrokerGrpCode.nativeElement.focus(); 
              this.userForm.patchValue({group_code:null});  
              this.brokergroupsave=false;
            } else {
              this.brokergroupsave=true;
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
        
            this.status = false;
            if(this.userForm.get("group_name").value == null || this.userForm.get("group_name").value == "")
            {
              alert("Please Enter Broker Group Name!!!!  ");
              this.status=true;
            }
            else{
            if(this.Id>0) 
            {
              this.Service.updateBrokerGrp(this.userForm.getRawValue(),  this.Id).subscribe(data => 
              {
              console.log(this.userForm.value);
              alert("Broker group Updated successfully.");
              // window.location.reload();
              this.userForm.reset();
              this.status = true;
              this.ngOnInit();
              this.isHidden=false;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Broker group Updation Unsuccessfull...");});
              }
         
            else{
              this.Service.createBrokerGroup(this.userForm.getRawValue()).subscribe(data => 
                {
                  console.log(this.userForm.value);
                  alert("New Broker group master created successfully.");
                // window.location.reload();
                this.userForm.patchValue({group_code:this.seq_no})
                  this.userForm.reset();
                  this.status = true;
                  this.ngOnInit();
                  this.isHidden=false;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("New Broker group master creation Unsuccessfull...");});
              }
          }     
       }
     }

  }
