import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { HubMaster } from '../../../../../../Models/InventoryModel/HubMaster';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-hubmaster',
  templateUrl: './hubmaster.component.html',
  styleUrls: ['./hubmaster.component.scss']
})
export class HubmasterComponent implements OnInit {
  isHidden=false;
  public userForm:FormGroup;
  model: HubMaster = new HubMaster();
  financialYear:any;
  Id : any;
  submitted = false;
  listhubmaster:any = [];
  status = false;
  hubmastersave:boolean=true;
  businesslists:any=[];
  company_name:any;
  BuUnit = "0";
  

  constructor(public fb:FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group({
        id: [''],
        hubname: [''],
        business_unit: [''],
        hubtype: [''],
        hubid: [''],
        company_id: [''],
        fin_year: [''],
        username: ['']});
     }

    get id(){ return this.userForm.get("id") as FormControl }
    get hubname(){ return this.userForm.get("hubname") as FormControl }
    get business_unit(){ return this.userForm.get("business_unit") as FormControl }
    get hubtype(){ return this.userForm.get("hubtype") as FormControl }

  ngOnInit() {

    this.financialYear = localStorage.getItem("financial_year");
    this.company_name = localStorage.getItem("company_name");
    this.BuUnit = "0";
    forkJoin(
      this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
      this.DropDownListService.getHubList()
      )
     .subscribe(([budata,hubdata])=>
      {
          this.businesslists=budata;
          this.listhubmaster=hubdata;
      }); 
    this.status = true;
  }

  showList(s:string)
  {
        if(s=="add")
        {
          this.isHidden=true;
        }
      
    
    if(s=="list")
    {
      this.isHidden=false;
      this.hubmastersave=true;
      this.userForm.reset(this.ResetAllValues().value);
   
    }
  }

  ResetAllValues()
  {
    return this.userForm=this.fb.group({
      id: [''],
      hubname: [''],
      hubshortname: [''],
      hubtype: [''],
      hubid: [''], 
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
        this.DropDownListService.findHubMaster('0').subscribe(data=>
        {     
          this.listhubmaster = data;
          this.status = true;
        });
      }
      else
      {
        this.DropDownListService.findHubMaster(serchText).subscribe(data=>
        {
          this.listhubmaster = data;
          this.status = true;
        });     
      }
    }
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
     
        if(this.Id>0)
        {
          this.Service.updateHubMaster(this.userForm.getRawValue(), this.Id).subscribe(data => 
          {
            console.log(this.userForm.value);
            alert("Hub Master Updated successfully.");
            this.userForm.reset();
            //refresh List;
            this.ngOnInit();
            this.isHidden = false;
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});
        }

        else
          {
            this.Service.createHubMaster(this.userForm.getRawValue()).subscribe(data => 
            {
              console.log(this.userForm.value);
              alert("New Hub Master created successfully.");
              this.userForm.reset();
              //refresh List;
              this.ngOnInit();
              this.isHidden = false;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});
          }
      }     
  }

  onUpdate(id:any,action)
  {
    if(action =='update')
    {
      this.hubmastersave=true;
    }
    else
    {
      this.hubmastersave=false;
    }
    //tuhin here //this.invoicemastersave=true;
    this.isHidden = true;
    this.status = false;
    this.DropDownListService.retriveHubMaster(id).subscribe(data=>
    {
      this.userForm.patchValue(data); 
      this.status = true;
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
  }

  onDelete(id:any,invtype_id)
  {
    this.status = false;
    if(confirm("Are you sure to delete this Hub Master ?"))
    { 
      this.userForm.patchValue({username: localStorage.getItem("username")});
      
          this.Service.deleteHubMaster(this.userForm.getRawValue(),id).subscribe(data=> 
            {
      
              if(data.hubname=='' || data.hubname==null)
              {
                alert("Opps!!! Can't delete this Hub Master !!!");
              }else{
                alert("Hub Master deleted successfully.");
              }
              this.status = true;
              this.ngOnInit()
            });
         
          
    }  
    this.status = true;
  }
}
