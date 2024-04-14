import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { OtherPartyMaster} from '../../../../../../Models/OtherMaster/OtherPartyMaster';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-other-party-master',
  templateUrl: './other-party-master.component.html',
  styleUrls: ['./other-party-master.component.scss']
})
export class OtherPartyMasterComponent implements OnInit {

  isHidden=false;
  public userForm:FormGroup;
  model: OtherPartyMaster = new OtherPartyMaster();
  financialYear:any;
  Id : any;
  submitted = false;
  otherpartylist:any = [];
  status = false;
  otherpartysave:boolean=true;
  businesslists:any=[];
  company_name:any;
  BuUnit = "0";
  

  constructor(public fb:FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group({
        id: [''],
        nopartyname: [''], 
        nopartyid: [''],
        business_unit: [''],
        company_id: [''],
        fin_year: [''],
        username: ['']});
     }

    get id(){ return this.userForm.get("id") as FormControl }
    get nopartyname(){ return this.userForm.get("nopartyname") as FormControl }
    get business_unit(){ return this.userForm.get("business_unit") as FormControl }

  ngOnInit() {

    this.financialYear = localStorage.getItem("financial_year");
    this.company_name = localStorage.getItem("company_name");
    this.BuUnit = "0";
    forkJoin(
      this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
      this.DropDownListService.getOtherPartyList(localStorage.getItem("company_name"))
      )
     .subscribe(([budata,partydata])=>
      {
          this.businesslists=budata;
          this.otherpartylist=partydata;
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
      this.otherpartysave=true;
      this.userForm.reset(this.ResetAllValues().value);
   
    }
  }

  ResetAllValues()
  {
    return this.userForm=this.fb.group({
      id: [''],
      nopartyname: [''], 
      nopartyid: [''],
      business_unit: [''],
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
        this.DropDownListService.findOtherPartyMaster('0').subscribe(data=>
        {     
          this.otherpartylist = data;
          this.status = true;
        });
      }
      else
      {
        this.DropDownListService.findOtherPartyMaster(serchText).subscribe(data=>
        {
          this.otherpartylist = data;
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
          this.Service.updateOtherPartyMaster(this.userForm.getRawValue(), this.Id).subscribe(data => 
          {
            console.log(this.userForm.value);
            alert("Other Party Master Updated successfully.");
            this.userForm.reset();
            //refresh List;
            this.ngOnInit();
            this.isHidden = false;
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured On Other Party Master, please try again....");
          this.ngOnInit()});
        }

        else
          {
            this.Service.createOtherPartyMaster(this.userForm.getRawValue()).subscribe(data => 
            {
              console.log(this.userForm.value);
              alert("New Other Party Master created successfully.");
              this.userForm.reset();
              //refresh List;
              this.ngOnInit();
              this.isHidden = false;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured on Other Party Master, please try again....");
            this.ngOnInit()});
          }
      }     
  }

  onUpdate(id:any,action)
  {
    if(action =='update')
    {
      this.otherpartysave=true;
    }
    else
    {
      this.otherpartysave=false;
    }
    //tuhin here //this.invoicemastersave=true;
    this.isHidden = true;
    this.status = false;
    this.DropDownListService.retriveOtherPartyMaster(id).subscribe(data=>
    {
      this.userForm.patchValue(data); 
      this.status = true;
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured on Other Party Master, please try again....");
    this.ngOnInit()});
  }

  onDelete(id:any,invtype_id)
  {
    this.status = false;
    if(confirm("Are you sure to delete this Other Party Master ?"))
    { 
      this.userForm.patchValue({username: localStorage.getItem("username")});
      
          this.Service.deleteOtherPartyMaster(this.userForm.getRawValue(),id).subscribe(data=> 
            {
      
              if(data.nopartyname=='' || data.nopartyname==null)
              {
                alert("Opps!!! Can't delete this Other Party Master !!!");
              }else{
                alert("Other Party Master deleted successfully.");
              }
              this.status = true;
              this.ngOnInit()
            });
         
          
    }  
    this.status = true;
  }

}
