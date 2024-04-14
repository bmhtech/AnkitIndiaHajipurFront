import { Component, OnInit } from '@angular/core';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { OtherItemMaster} from '../../../../../../Models/OtherMaster/OtherItemMaster';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-other-item-master',
  templateUrl: './other-item-master.component.html',
  styleUrls: ['./other-item-master.component.scss']
})
export class OtherItemMasterComponent implements OnInit {

  isHidden=false;
  public userForm:FormGroup;
  model: OtherItemMaster = new OtherItemMaster();
  financialYear:any;
  Id : any;
  submitted = false;
  otheritemlist:any = [];
  status = false;
  otheritemsave:boolean=true;
  businesslists:any=[];
  company_name:any;
  BuUnit = "0";
  

  constructor(public fb:FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group({
        id: [''],
        noitemname: [''], 
        noitemid: [''],
        business_unit: [''],
        company_id: [''],
        fin_year: [''],
        username: ['']});
     }

    get id(){ return this.userForm.get("id") as FormControl }
    get noitemname(){ return this.userForm.get("noitemname") as FormControl }
    get business_unit(){ return this.userForm.get("business_unit") as FormControl }

  ngOnInit() {

    this.financialYear = localStorage.getItem("financial_year");
    this.company_name = localStorage.getItem("company_name");
    this.BuUnit = "0";
    forkJoin(
      this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
      this.DropDownListService.getOtherItemList(localStorage.getItem("company_name"))
      )
     .subscribe(([budata,partydata])=>
      {
          this.businesslists=budata;
          this.otheritemlist=partydata;
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
      this.otheritemsave=true;
      this.userForm.reset(this.ResetAllValues().value);
   
    }
  }

  ResetAllValues()
  {
    return this.userForm=this.fb.group({
      id: [''],
      nopitemname: [''], 
      noitemid: [''],
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
        this.DropDownListService.findOtherItemMaster('0').subscribe(data=>
        {     
          this.otheritemlist = data;
          this.status = true;
        });
      }
      else
      {
        this.DropDownListService.findOtherItemMaster(serchText).subscribe(data=>
        {
          this.otheritemlist = data;
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
          this.Service.updateOtherItemMaster(this.userForm.getRawValue(), this.Id).subscribe(data => 
          {
            console.log(this.userForm.value);
            alert("Other Item Master Updated successfully.");
            this.userForm.reset();
            //refresh List;
            this.ngOnInit();
            this.isHidden = false;
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured On Other Item Master, please try again....");
          this.ngOnInit()});
        }

        else
          {
            this.Service.createOtherItemMaster(this.userForm.getRawValue()).subscribe(data => 
            {
              console.log(this.userForm.value);
              alert("New Other Item Master created successfully.");
              this.userForm.reset();
              //refresh List;
              this.ngOnInit();
              this.isHidden = false;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured on Other Item Master, please try again....");
            this.ngOnInit()});
          }
      }     
  }

  onUpdate(id:any,action)
  {
    if(action =='update')
    {
      this.otheritemsave=true;
    }
    else
    {
      this.otheritemsave=false;
    }
    //tuhin here //this.invoicemastersave=true;
    this.isHidden = true;
    this.status = false;
    this.DropDownListService.retriveOtherItemMaster(id).subscribe(data=>
    {
      this.userForm.patchValue(data); 
      this.status = true;
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured on Other Item Master, please try again....");
    this.ngOnInit()});
  }

  onDelete(id:any,invtype_id)
  {
    this.status = false;
    if(confirm("Are you sure to delete this Other Item Master ?"))
    { 
      this.userForm.patchValue({username: localStorage.getItem("username")});
      
          this.Service.deleteOtherItemMaster(this.userForm.getRawValue(),id).subscribe(data=> 
            {
      
              if(data.noitemname=='' || data.noitemname==null)
              {
                alert("Opps!!! Can't delete this Other Item Master !!!");
              }else{
                alert("Other Item Master deleted successfully.");
              }
              this.status = true;
              this.ngOnInit()
            });
         
          
    }  
    this.status = true;
  }

}
