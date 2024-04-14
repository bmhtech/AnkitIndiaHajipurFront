import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import {FormBuilder,FormControl } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import {Settings} from '../../../../../../Models/settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit 
{
  submitted = false;
  model: Settings = new Settings();
  public userForm:FormGroup;
  isHidden=false;
  listSettings:Settings[];
  Id: any;
  status = false;

  constructor(private Service: Master, public fb:FormBuilder,
    private DropDownListService: DropdownServiceService) 
  {
    this.userForm=fb.group({
      id:[''],
      code_generator: [''],
      vehicle_doc: [''],
      company_id: [''],
      fin_year: [''],
      username: ['']});
  }

  get id(){ return this.userForm.get("id") as FormControl }
  get code_generator(){ return this.userForm.get("code_generator") as FormControl }
  get vehicle_doc(){ return this.userForm.get("vehicle_doc") as FormControl }
  get company_id(){ return this.userForm.get("company_id") as FormControl }
  get fin_year(){ return this.userForm.get("fin_year") as FormControl }
  get username(){ return this.userForm.get("username") as FormControl }

  ngOnInit() 
  {
    this.Service.getSystemSettings().subscribe(data=>{this.listSettings  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
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
    }
  }

  onUpdate(id:any)
  {
    this.isHidden = true;
    this.status = false;
    this.Service.retriveSystemSettings(id).subscribe(data=>
    { 
      if(data["code_generator"]==true)
      {
        this.userForm.patchValue({code_generator:'true'});
      }
      else
      {this.userForm.patchValue({code_generator:'false'})}
      this.userForm.patchValue({id:data["id"],company_id:data["company_id"],fin_year:data["fin_year"],username:data["username"]}); 
      this.status = true;
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
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
      if(this.Id>0)
        {
          this.status = false;
          this.Service.updateSystemSettings(this.userForm.getRawValue(), this.Id).subscribe(data => 
          {
            console.log(this.userForm.value);
            alert("Settings updated successfully.");
            //window.location.reload();
            this.userForm.reset();
            this.status = true;
            this.ngOnInit();
            this.isHidden = false;
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});
        }

        else
          {
            this.status = false;
            this.Service.createSystemSettings(this.userForm.getRawValue()).subscribe(data => 
            {
              console.log(this.userForm.value);
              alert("Settings created successfully.");
              //window.location.reload();
              this.userForm.reset();
              this.status = true;
              this.ngOnInit();
              this.isHidden = false;          
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()});
          }
    }
  }

}
