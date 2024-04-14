import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { screenMaster } from '../../../../../../models/InventoryModel/ScreenMaster';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

  @Component({
    selector: 'app-screen-master',
    templateUrl: './screen-master.component.html',
    styleUrls: ['./screen-master.component.scss']
  })

  export class ScreenMasterComponent implements OnInit 
  {
    isHidden=false;
    public userForm:FormGroup;
    model: screenMaster = new screenMaster();
    screenList:{};
    Id: any;
    screenType:any;
    submitted = false;
    listscreenMaster : screenMaster[];
    status = false;
    screenmastersave:boolean=true;
    screenmasterupdate:boolean=true;
    screenmasterdelete:boolean=true;
    screenmasterview:Boolean=true;

    constructor(public fb:FormBuilder, private Service: Master, private DropDownListService: DropdownServiceService)
    {
      this.userForm=fb.group({
        id: [''],
        screen_type: [''],
        screen_name: [''], 
        company_id: [''],
        fin_year: [''],
        username: ['']});
    }
    get id(){ return this.userForm.get("id") as FormControl }
    get screen_type(){ return this.userForm.get("screen_type") as FormControl }
    get screen_name(){ return this.userForm.get("screen_name") as FormControl }
    
  
    ngOnInit() 
    {
      //For User Role
      let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));
   
     this.screenmastersave=false;
     this.screenmasterupdate=false;
     this.screenmasterdelete=false;
     this.screenmasterview=false;

     if(accessdata.includes('screen_master.save'))
     {
      this.screenmastersave = true;
     }
    if(accessdata.includes('screen_master.update'))
     { 
       this.screenmasterupdate=true;
     }
     if(accessdata.includes('screen_master.delete'))
     {
       this.screenmasterdelete=true;
     }
     if(accessdata.includes('screen_master.view'))
     {
       this.screenmasterview=true;
     }

     
      this.Service.getScreenMaster().subscribe(data=>
      {
        this.listscreenMaster  = data;
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
    }

    showList(s:string)
    {
      if(this.screenmastersave == true  && this.screenmasterupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.reset(this.ResetAllValues().value);
        }
      }
      if(this.screenmastersave == true  && this.screenmasterupdate == false)
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
        this.screenmastersave=true;
        this.userForm.reset(this.ResetAllValues().value);
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id: [''],
        screen_type: [''],
        screen_name: [''], 
        company_id: [''],
        fin_year: [''],
        username: ['']});
    }

    search(event)
    {
      let serchText = event.target.value;
      if(event.key == "Enter")
      {
        this.status = false;
        if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
        {
          this.DropDownListService.findScreen('0').subscribe(data=>
          {
            this.listscreenMaster = data;
            this.status = true;
          });
        }
        else
        {
          this.DropDownListService.findScreen(serchText).subscribe(data=>
          {
            this.listscreenMaster = data;
            this.status = true;
          });     
        }
      }
    }
  
    onDelete(id:any,screen_id)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Screen ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.DropDownListService.checkMisleniousDeletation(screen_id,"screenMaster").subscribe(checkBUData=> 
          {
         // alert("check::"+checkBUData.status)
           if(checkBUData.status=='No')
           {
            this.Service.deleteScreen(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                console.log("Cat screen_type Type:"+data.screen_type);
        
                if(data.screen_type=='' || data.screen_type==null)
                {
                  alert("Opps!!! Can't delete this Screen !!!");
                }else{
                  alert("Screen deleted successfully.");
                }
                this.status = true;
                this.ngOnInit()
              });
           }
           else{
            alert("This Screen is Already Used,Can not be Deleted!! ");
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
        if(this.userForm.get("screen_type").value == '' || this.userForm.get("screen_type").value == null || this.userForm.get("screen_type").value == 0)
        {
          alert("Please Enter Screen Type");
          this.status=true;
        }
        else if(this.userForm.get("screen_name").value == '' || this.userForm.get("screen_name").value == null || this.userForm.get("screen_name").value == 0)
        {
          alert("Please Enter Screen Name");
          this.status=true;
        }
        else
        {
          if(this.Id>0)
          {
            this.status = false;
            this.Service.updateScreen(this.userForm.getRawValue(), this.Id).subscribe(data => 
            {
              console.log(this.userForm.value);
              alert("Screen master Updated successfully.");
              this.userForm.reset();
              //refresh List;
              this.ngOnInit();
              this.isHidden = false;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});
          }
          else
            {
              this.status = false;
              this.Service.createScreenMaster(this.userForm.value).subscribe(data => 
              {
                console.log(this.userForm.value);
                alert("New Screen master created successfully.");
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
      if(action =='update')
      {
        this.screenmastersave=true;
      }
      else
      {
        this.screenmastersave=false;
      }
     //tuhin here //  this.screenmastersave=true;
      this.isHidden = true;
      this.status = false;
      this.Service.retriveScreen(id).subscribe(data=>
      {
        this.userForm.patchValue(data); 
        this.status = true;
      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
    }
 
  }
