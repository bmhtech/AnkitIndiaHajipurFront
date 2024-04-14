import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { ZoneMaster } from '../../../../../../Models/OtherMaster/zone-master';

@Component({
  selector: 'app-zone-master',
  templateUrl: './zone-master.component.html',
  styleUrls: ['./zone-master.component.scss']
})
export class ZoneMasterComponent implements OnInit {

  submitted = false;
  public userForm:FormGroup;
  model: ZoneMaster = new ZoneMaster();
  listZoneMaster: ZoneMaster[];
  isHidden=false;
  Id:any;
  financialYear:any;
  company_name:any;
  status = false;
  zonemastersave:boolean=true;
  zonemasterupdate:boolean=true;
  zonemasterdelete:boolean=true;
  zonemasterview:boolean=true;

  constructor(private Service: Master, public fb:FormBuilder,
    private DropDownListService: DropdownServiceService) 
  {
    this.userForm=fb.group({ 
      id:[''],
      zone_name: [''],
      description: [''],
      company_id: [''],
      fin_year: [''],
      username: ['']});
  }
  get id(){ return this.userForm.get("id") as FormControl }
  get zone_name(){ return this.userForm.get("zone_name") as FormControl }
  get description(){ return this.userForm.get("description") as FormControl }
  get company_id(){ return this.userForm.get("company_id") as FormControl }
  get fin_year(){ return this.userForm.get("fin_year") as FormControl }
  get username(){ return this.userForm.get("username") as FormControl }

  showList(s:string)
  {
    if(this.zonemastersave == true  && this.zonemasterupdate == true)//true exist  false not exist 
    {
      if(s=="add")
      {
        this.isHidden=true;
        this.userForm.reset(this.ResetAllValues().value);
      }
    }
    if(this.zonemastersave == true  && this.zonemasterupdate == false)
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
      this.zonemastersave=true;
      this.userForm.reset(this.ResetAllValues().value);
    }
  }
  ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id:[''],
        zone_name: [''],
        description: [''],
        company_id: [''],
        fin_year: [''],
        username: ['']});
    }
  ngOnInit() 
  {
    //For User Role
    let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));

    this.zonemastersave=false;
    this.zonemasterupdate=false;
    this.zonemasterdelete=false;
    this.zonemasterview = false;
    if(accessdata.includes('zone_master.save'))
    {
     this.zonemastersave = true;
    }
    if(accessdata.includes('zone_master.update'))
    {
     this.zonemasterupdate = true;
    }
    if(accessdata.includes('zone_master.delete'))
    {
     this.zonemasterdelete = true;
    }
    if(accessdata.includes('zone_master.view'))
    {
     this.zonemasterview = true;
    }

    
    this.company_name = localStorage.getItem("company_name");
    this.status = true;
    this.Service.getZoneMaster().subscribe(data=>{this.listZoneMaster  = data;});
  }

  onUpdate(id:any,action)
  {
    if(action == 'update')
      {
        this.zonemastersave=true;
      }
      else
      {
        this.zonemastersave=false;
      }
    this.isHidden = true;
    this.status = false;
    this.Service.retriveZoneMaster(id).subscribe(data=>
    {
      this.userForm.patchValue(data); 
      this.status = true;
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
        this.DropDownListService.findZoneMaster('0').subscribe(data=>
        {
          this.listZoneMaster = data;
          this.status = true;
        });
      }
      else
      {
        this.DropDownListService.findZoneMaster(serchText).subscribe(data=>
        {
          this.listZoneMaster = data;
          this.status = true;
        });  
        this.status = true;   
      }
    }
  }

  onDelete(id:any,zone_id)
  {
    this.status = false;
    if(confirm("Are you sure to delete this Zone ?"))
    { 
      this.userForm.patchValue({username: localStorage.getItem("username")});
      this.DropDownListService.checkZoneMasterUsage(zone_id).subscribe(zoneData=> 
        {
         ///let dataq=JSON.parse(checkItem);
         console.log("bidhan here::"+zoneData.status);
         if(zoneData.status=='No')
         {
          this.Service.deleteZoneMaster(this.userForm.getRawValue(),id).subscribe(data=> 
            {
              console.log("zone_name :"+data.zone_name);
      
              if(data.zone_name=='' || data.zone_name==null)
              {
                alert("Opps!!! Can't delete this Zone !!!");
              }else{
                alert("Zone deleted successfully.");
              }
              this.status = true;
              this.ngOnInit()
            }); 
         }
         else{
          alert("This Zone is Already Used,Can not be Deleted!! ");
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
      if(this.userForm.get("zone_name").value == '' || this.userForm.get("zone_name").value == null || this.userForm.get("zone_name").value == 0)
      {
        alert("Please Enter Zone Name");
        this.status=true;
      }
      else if(this.userForm.get("description").value == '' || this.userForm.get("description").value == null || this.userForm.get("description").value == 0)
      {
        alert("Please Enter Description");
        this.status=true;
      }
      else
      {
        if(this.Id>0)
        {
          this.status = false;
          this.Service.updateZoneMaster(this.userForm.getRawValue(), this.Id).subscribe( data => 
          {
            console.log(this.userForm.value);
            alert("Zone Master Updated successfully.");
            //window.location.reload();
            this.userForm.reset();
            this.status = true;
            //refresh List;
            this.ngOnInit();
            this.isHidden = false;
          }); 
        }  
        
        else
          {
            this.status = false;
            this.Service.createZoneMaster(this.userForm.getRawValue()).subscribe( data => 
            {
              console.log(this.userForm.value);
              alert("Zone Master created successfully.");
              //window.location.reload();
              this.userForm.reset();
              this.status = true;
              //refresh List;
              this.ngOnInit();
              this.isHidden = false;
            }); 
          }
      }
      
      }
  }

}
