import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PurposeMaster } from '../../../../../../models/InventoryModel/PurposeMaster';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

  @Component({
    selector: 'app-purpose-master',
    templateUrl: './purpose-master.component.html',
    styleUrls: ['./purpose-master.component.scss']
  })

  export class PurposeMasterComponent implements OnInit 
  {
    submitted = false;
    isHidden=false;
    Id: any;
    public userForm:FormGroup;
    model: PurposeMaster = new PurposeMaster();
    listPurposeMaster : PurposeMaster[];
    status = false;
    purposemastersave:boolean=true;
    purposemasterupdate:boolean=true;
    purposemasterdelete:boolean=true;
    purposemasterview:boolean=true;
    

    constructor(public fb:FormBuilder, private Service: Master,
      private DropDownListService: DropdownServiceService)
    {
      this.userForm=fb.group({
        id: [''],
        purpose_name: ['',Validators.required],
        purpose_desc: ['',Validators.required], 
        company_id: [''],
        fin_year: [''],
        username: ['']});
    }
    get id(){ return this.userForm.get("id") as FormControl }
    get purpose_name(){ return this.userForm.get("purpose_name") as FormControl }
    get purpose_desc(){ return this.userForm.get("purpose_desc") as FormControl }

    ngOnInit() 
    {
      //For User Role
    let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
  
     this.purposemastersave=false;
     this.purposemasterupdate=false;
     this.purposemasterdelete=false;
     this.purposemasterview=false;

     if(accessdata.includes('purpose_master.save'))
     {
      this.purposemastersave = true;
     }
    if(accessdata.includes('purpose_master.update'))
     { 
       this.purposemasterupdate=true;
     }
     if(accessdata.includes('purpose_master.delete'))
     {
       this.purposemasterdelete=true;
     }
     if(accessdata.includes('purpose_master.view'))
     {
       this.purposemasterview=true;
     }
     
     
      this.Service.getPurpose().subscribe(data=>
      {
        this.listPurposeMaster  = data;
      //console.log("chk "+JSON.stringify(data));
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
    }

    showList(s:string)
    {
      if(this.purposemastersave == true  && this.purposemasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.reset(this.ResetAllValues().value);
        }
      }
      if(this.purposemastersave == true  && this.purposemasterupdate == false)
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
        this.purposemastersave=true;
        this.userForm.reset(this.ResetAllValues().value);
      }
    }
    ResetAllValues()
  {
    return this.userForm=this.fb.group({
      id: [''],
      purpose_name: ['',Validators.required],
      purpose_desc: ['',Validators.required], 
      company_id: [''],
      fin_year: [''],
      username:['']
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
        this.DropDownListService.findPurpose('0').subscribe(data=>
        {
          this.listPurposeMaster = data;
          this.status = true;
        });
      }
      else
      {
        this.DropDownListService.findPurpose(serchText).subscribe(data=>
        {
          this.listPurposeMaster = data;
          this.status = true;
        });     
      }
    }
  }

  onDelete(id:any,purpose_id)
  {
    this.status = false;
    if(confirm("Are you sure to delete this Purpose Master ?"))
    { 
      this.userForm.patchValue({username: localStorage.getItem("username")});
      this.DropDownListService.checkMisleniousDeletation(purpose_id,"purposeMaster").subscribe(checkBUData=> 
        {
        //alert("check::"+checkBUData.status)
         if(checkBUData.status=='No')
         {
          this.Service.deletePurpose(this.userForm.getRawValue(),id).subscribe(data=> 
            {
              console.log("Cat purpose_name:"+data.purpose_name);
      
              if(data.purpose_name=='' || data.purpose_name==null)
              {
                alert("Opps!!! Can't delete this Purpose Master !!!");
              }else{
                alert("Purpose Master deleted successfully.");
              }
              this.status = true;
              this.ngOnInit()
            }); 
         }
         else{
          alert("This Purpose is Already Used,Can not be Deleted!! ");
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
        if(this.userForm.get("purpose_name").value == '' || this.userForm.get("purpose_name").value == null || this.userForm.get("purpose_name").value == 0)
        {
          alert("Please Enter Purpose Name");
          this.status=true;
        }
        else if(this.userForm.get("purpose_desc").value == '' || this.userForm.get("purpose_desc").value == null || this.userForm.get("purpose_desc").value == 0)
        {
          alert("Please Enter Purpose Description");
          this.status=true;
        }
        else 
        {
          if(this.Id>0)
          {
            this.Service.updatePurpose(this.userForm.getRawValue(), this.Id).subscribe(data => 
            {
              console.log(this.userForm.value);
              alert("Purpose master Updated successfully.");
              this.userForm.reset();
              //refresh List;
              this.ngOnInit();
              this.isHidden = false;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});
          }
          else
            {
              this.Service.createPurpose(this.userForm.getRawValue()).subscribe(data => 
              {
                console.log(this.userForm.value);
                alert("New Purpose master created successfully.");
                this.userForm.reset();
                //refresh List;
                this.ngOnInit();
                this.isHidden = false;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
              this.ngOnInit()});
            }
        }
        
      }
    }

    onUpdate(id:any,action)
    {
      if(action == 'update')
      {
        this.purposemastersave=true;
      }
      else
      {
        this.purposemastersave=false;
      }
      //tuhin here // this.purposemastersave=true;
      this.isHidden = true;
      this.status = false;
      this.Service.retrivePurpose(id).subscribe(data=>
      {
        this.userForm.patchValue(data); 
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
    }

  }
