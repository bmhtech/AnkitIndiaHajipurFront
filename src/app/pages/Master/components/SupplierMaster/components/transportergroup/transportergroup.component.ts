import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray } from '@angular/forms';
import { Transporter_group } from '../../../../../../Models/SupplierModel/Transporter_group';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

  @Component({
    selector: 'app-transportergroup',
    templateUrl: './transportergroup.component.html',
    styleUrls: ['./transportergroup.component.scss']
  })

  export class TransportergroupComponent implements OnInit 
  {
    submitted = false;
    public userForm:FormGroup;
    // public searchText:string;
    model:Transporter_group =new Transporter_group();
    listTransporter_group: Transporter_group[];
    subGroupNames:any = [];
    isHidden=false; 
    company_name:any;
    Id: any;
    userParentGroups:any = [];
    status = false;
    seq_no: any;
    bp_type1:any;
    activeIsChecked:any;
    isValid:boolean=false;
    transportgroupsave:boolean=true;
    transportgroupupdate:boolean=true;
    transportgroupdelete:boolean=true;
    transportgroupview:boolean=true;
    action:any;
    @ViewChild('iCodeInput') _TransGrpCode: ElementRef;
    @ViewChild('GrpNameInput') _GrpNameInput: ElementRef;
    

    constructor(public fb:FormBuilder, private Service: Master,
      private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group({
        id:[''],
        bp_trans_id:[''],
        bp_trans_code:[''],
        bp_type:[''],
        bp_grp_name:[''],
        parent_group:[''],
        bp_trans_active:[''],
        control_acc:[''],
        company_id: [''],
        fin_year: [''],
        username: ['']});
    }
    
    get bp_trans_id(){ return this.userForm.get("bp_trans_id") as FormControl }
    get id(){ return this.userForm.get("id") as FormControl }
    get bp_trans_code(){ return this.userForm.get("bp_trans_code") as FormControl }
    get bp_type(){ return this.userForm.get("bp_type") as FormControl }
    get bp_grp_name(){ return this.userForm.get("bp_grp_name") as FormControl }
    get parent_group(){ return this.userForm.get("parent_group") as FormControl }
    get bp_trans_active(){ return this.userForm.get("bp_trans_active") as FormControl }
    get control_acc(){ return this.userForm.get("control_acc") as FormControl }

    ngOnInit() 
    {
    let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
    this.transportgroupsave= false;
    this.transportgroupupdate=false;
    this.transportgroupdelete=false;
    this.transportgroupview=false;

    if(accessdata.includes('transporter_group.save'))
    {
      this.transportgroupsave = true;
    }
   if(accessdata.includes('transporter_group.update'))
    { 
      this.transportgroupupdate=true;
    }
    if(accessdata.includes('transporter_group.delete'))
    {
      this.transportgroupdelete=true;
    }
    if(accessdata.includes('transporter_group.view'))
    {
      this.transportgroupview=true;
    }
 
      this.company_name = localStorage.getItem("company_name");
      this.DropDownListService.getTransporterGroupSequenceId("prefix="+"TGR"+"&company="+this.company_name).subscribe(data=>{this.seq_no = data.sequenceid;});   
      this.userForm.patchValue({parent_group: "0", control_acc: "0"});
      this.activeIsChecked = true;
      this.bp_type1="TRANSPORTER";
      this.status = true;

      // this.Service.getTransporterGroup().subscribe(data=>{this.listTransporter_group  = data;});
      // this.DropDownListService.controlAccList().subscribe(data=>{this.subGroupNames  = data;});
      // this.DropDownListService.transportNameCodeList().subscribe(data=>{this.userParentGroups = data;});
  
      forkJoin(
        this.Service.getTransporterGroup(),
       // this.DropDownListService.controlAccList(),
       this.DropDownListService.ledgerList(),
       this.DropDownListService.transportNameCodeList(),
        
      ).subscribe(([listTransporter_group, subGroupNames, userParentGroups])=>
      {
        this.listTransporter_group  = listTransporter_group;
        this.subGroupNames  = subGroupNames;
        console.log("getdata:"+JSON.stringify(userParentGroups));
        this.userParentGroups  = userParentGroups;  
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
      }

    con_acc:any;
    groupstat:any;
   
    focusOutFunctionGroupName(event: any)
    {
          this.DropDownListService.chkTranGroupStatus(event.target.value).subscribe(data=>
            {
               this.groupstat = data.group_name;
              if(this.groupstat=='EXIST')
              {
                alert("Already exist transporter "+event.target.value +". Please change this name !!!");             
                this.userForm.patchValue({bp_grp_name:null});
                this._GrpNameInput.nativeElement.focus(); 
                this.transportgroupsave=false;
              }
              else
              {
                this.transportgroupsave=true;
              }
              
            });
            this.groupstat='';    
        }
       
    showList(s:string)
    {
      
      if(this.transportgroupsave == true  && this.transportgroupupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
        // this.userForm.reset();
          this.userForm.patchValue({parent_group: "0",control_acc: "0"});
        // this.userForm.reset(this.ResetAllValues().value);      
        }  
      }
      if(this.transportgroupsave == true  && this.transportgroupupdate == false)
      { if(s=="add")
        {
          this.isHidden=true;
        // this.userForm.reset();
          this.userForm.patchValue({parent_group: "0",control_acc: "0"});
        // this.userForm.reset(this.ResetAllValues().value);      
        } 
      }
     
      if(s=="list")
      {this.isHidden=false;
        this.userForm.reset();
        this.ngOnInit();
        //this.userForm.reset(this.ResetAllValues().value);
      }
    }

    ResetAllValues()
    {
     return this.userForm=this.fb.group({
      id:[''],
      bp_trans_id:[''],
      bp_trans_code:[''],
      bp_type:[''],
      bp_grp_name:[''],
      parent_group:[''],
      bp_trans_active:[''],
      control_acc:[''],
      company_id: [''],
      fin_year: [''],
      username: ['']
     });     
    }

    onUpdate(id:any,action)
    {
      this.transportgroupsave = true;
      this.isHidden = true;
      this.status = false;
      if(action == 'view')
       {this.transportgroupsave = false;}
       else
       {this.transportgroupsave = true;}
      this.Service.TransGrpRetrive(id).subscribe(data=>
      {
       // console.log(JSON.stringify(data));
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
        
      if(event.key == "Enter")
      {
        this.status = false;
        if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
        {
          this.DropDownListService.findTransporterGrps('0',this.company_name).subscribe(data=>
          {
            this.listTransporter_group = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findTransporterGrps(serchText,this.company_name).subscribe(data=>
          {
            this.listTransporter_group = data;
            this.status = true;
          });       
        }
      }
    }

    onDelete(id:any)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Transporter Group ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.Service.deleteTransporterGrp(this.userForm.getRawValue(),id).subscribe(data=> 
        {
          console.log("Transporter Group :"+data.bp_trans_code);
          if(data.bp_trans_code=='' || data.bp_trans_code==null)
          {
            alert("Opps!!! Can't delete this Transporter Group !!!");
          }else{
            alert("Transporter Group Deleted successfully.");
          }
          this.status = true;
          this.ngOnInit()
        }); 
      }  
      this.status = true;
    }

    chkTransGrpCodeStatus(event: any)
    {
        if(event.target.value!=null && event.target.value!='')
          {
            this.DropDownListService.chkTransporterGrpCodeStatus(event.target.value).subscribe(data=>
            {
              if(data.status=='EXIST')
              {
                alert("Already Exist Code : "+event.target.value +" . Please Change !!!" );
                this._TransGrpCode.nativeElement.focus(); 
                this.userForm.patchValue({bp_trans_code:null});  
                this.transportgroupsave=false;
              } else {
                this.transportgroupsave=true;
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
        if(this.userForm.get("bp_grp_name").value == null ||this.userForm.get("bp_grp_name").value == "" )
        {
          alert("Please Enter Transporter Group Name!!!!  ");
          this.status=true;
        }
        if(this.Id>0)
          {
            
                this.Service.updateTransGrp(this.userForm.getRawValue(), this.Id).subscribe(data => 
                {
                  console.log(this.userForm.value);
                  alert("Transporter Group Updated successfully.");
                  //window.location.reload();
                  this.userForm.reset();
                  this.status = true;
                  //refresh List;
                  //this.userForm.patchValue({parent_group: "0"});
                  this.ngOnInit();
                  this.isHidden=false;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("Transporter Group Updation Unsuccessfull...");
               // this.ngOnInit()
              });
              }
          
              else{
               this.Service.createTransporterGroup(this.userForm.getRawValue()).subscribe(data => 
                {
                  console.log(this.userForm.value);
                  alert("New Transporter Group created successfully.");
                  //window.location.reload();
                  this.userForm.patchValue({bp_trans_code:this.seq_no})
                  this.userForm.reset();
                  this.status = true;
                  //refresh List;
                  //this.userForm.patchValue({parent_group: "0"});
                  this.ngOnInit();
                  this.isHidden=false;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("New Transporter Group creation Unsuccessfull...");
                //this.ngOnInit()
              }); 
              }
            }
      }
  }
