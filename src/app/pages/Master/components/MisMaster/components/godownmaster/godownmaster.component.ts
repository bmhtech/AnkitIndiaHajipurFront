import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { GodownMaster } from '../../../../../../Models/InventoryModel/GodownMaster';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-godownmaster',
  templateUrl: './godownmaster.component.html',
  styleUrls: ['./godownmaster.component.scss']
})
export class GodownmasterComponent implements OnInit {

  isHidden=false;
  public userForm:FormGroup;
  model: GodownMaster = new GodownMaster();
  financialYear:any;
  Id : any;
  submitted = false;
  listgodownmaster:any = [];
  status = false;
  godownemastersave:boolean=true;
  businesslists:any=[];
  company_name:any;
  BuUnit = "0";
  

  constructor(public fb:FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group({
        id: [''],
        godownname: [''], 
        godownid: [''],
        business_unit: [''],
        godowntype: [''], 
        company_id: [''],
        fin_year: [''],
        username: ['']});
     }

    get id(){ return this.userForm.get("id") as FormControl }
    get godownname(){ return this.userForm.get("godownname") as FormControl }
    get business_unit(){ return this.userForm.get("business_unit") as FormControl }
    get godowntype(){ return this.userForm.get("godowntype") as FormControl }

  ngOnInit() {

    this.financialYear = localStorage.getItem("financial_year");
    this.company_name = localStorage.getItem("company_name");
    this.BuUnit = "0";
    forkJoin(
      this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
      this.DropDownListService.getGodownList()
      )
     .subscribe(([budata,godowndata])=>
      {
          this.businesslists=budata;
          this.listgodownmaster=godowndata;
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
      this.godownemastersave=true;
      this.userForm.reset(this.ResetAllValues().value);
   
    }
  }

  ResetAllValues()
  {
    return this.userForm=this.fb.group({
      id: [''],
      godownname: [''], 
      godownid: [''],
      shortname: [''],
      godowntype: [''], 
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
        this.DropDownListService.findGodownMaster('0').subscribe(data=>
        {     
          this.listgodownmaster = data;
          this.status = true;
        });
      }
      else
      {
        this.DropDownListService.findGodownMaster(serchText).subscribe(data=>
        {
          this.listgodownmaster = data;
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
          this.Service.updateGodownMaster(this.userForm.getRawValue(), this.Id).subscribe(data => 
          {
            console.log(this.userForm.value);
            alert("Godown Master Updated successfully.");
            this.userForm.reset();
            //refresh List;
            this.ngOnInit();
            this.isHidden = false;
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});
        }

        else
          {
            this.Service.createGodownMaster(this.userForm.getRawValue()).subscribe(data => 
            {
              console.log(this.userForm.value);
              alert("New Godown Master created successfully.");
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
      this.godownemastersave=true;
    }
    else
    {
      this.godownemastersave=false;
    }
    //tuhin here //this.invoicemastersave=true;
    this.isHidden = true;
    this.status = false;
    this.DropDownListService.retriveGodownMaster(id).subscribe(data=>
    {
      this.userForm.patchValue(data); 
      this.status = true;
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
  }

  onDelete(id:any,invtype_id)
  {
    this.status = false;
    if(confirm("Are you sure to delete this Godown Master ?"))
    { 
      this.userForm.patchValue({username: localStorage.getItem("username")});
      
          this.Service.deleteGodownMaster(this.userForm.getRawValue(),id).subscribe(data=> 
            {
      
              if(data.godownname=='' || data.godownname==null)
              {
                alert("Opps!!! Can't delete this Godown Master !!!");
              }else{
                alert("Godown Master deleted successfully.");
              }
              this.status = true;
              this.ngOnInit()
            });
         
          
    }  
    this.status = true;
  }

}
