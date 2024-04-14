import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {FormBuilder,FormControl } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { PostOffice } from '../../../../../../models/PlaceModel/post-office';

@Component({
  selector: 'app-post-office',
  templateUrl: './post-office.component.html',
  styleUrls: ['./post-office.component.scss']
})
export class PostOfficeComponent implements OnInit 
{
  model : PostOffice = new PostOffice();
  public userForm:FormGroup;
  isHidden=false;
  submitted = false;
  status = false;
  Country="INDIA";
  countryname: any;
  statename: any;
  listPostOffice: PostOffice[];
  countriesList:any = [];
  statesList:any = [];
  districtsList:any = [];

  constructor(private Service: Master, public fb:FormBuilder,
    private DropDownListService: DropdownServiceService) 
  { 
    this.userForm = fb.group({
      id:[''],
      post_office:[''],
      postid:[''],
      pincode:[''],
      country_name:[''],
      state_code:[''],
      dist_code:[''],
      company_id:[''],
      fin_year:[''],
      username:['']
    })
  }
  
  get id(){ return this.userForm.get("id") as FormControl }
  get postid(){ return this.userForm.get("postid") as FormControl }
  get country_name(){ return this.userForm.get("country_name") as FormControl }
  get state_code(){ return this.userForm.get("state_code") as FormControl }
  get pincode(){ return this.userForm.get("pincode") as FormControl }
  get dist_code(){ return this.userForm.get("dist_code") as FormControl }
  get post_office(){ return this.userForm.get("post_office") as FormControl }
  get company_id(){ return this.userForm.get("company_id") as FormControl }
  get fin_year(){ return this.userForm.get("fin_year") as FormControl }
  get username(){ return this.userForm.get("username") as FormControl }
 
  ngOnInit()
   {
    this.userForm.patchValue({country_name:"INDIA"});
    this.Service.getPostOffice().subscribe(data=>{this.listPostOffice  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
    this.status = true;
    this.DropDownListService.countryList().subscribe(data=>{this.countriesList  = data;}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});  
   }

   showList(s:string)
   {
     if(s=="add")
     {
       this.userForm.patchValue({country_name:"INDIA"});
      
       this.isHidden=true;
       this.DropDownListService.stateListByCountry(this.Country).subscribe(data=>
         {
           this.statesList = data;
           this.status = true;
         });
     }
     if(s=="list")
     {       
       this.isHidden=false;
       this.userForm.reset();
       this.userForm.patchValue({country_name:"INDIA"});
       // this.userForm.get("state_name").reset();
       // this.userForm.get("dist_name").reset();
       // this.userForm.get("city_name").reset();
     }
   }

   company_name:any;
   search(event)
   {
     this.company_name = localStorage.getItem("company_name");
     let serchText = event.target.value;
     if(event.key == "Enter")
     {
       this.status = false;
       if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
       {
         this.DropDownListService.findAllPostOffice('0').subscribe(data=>
         {
           this.listPostOffice = data;
           this.status = true;
         });
       }
       else
       {
         this.DropDownListService.findAllPostOffice( serchText).subscribe(data=>
         {
           this.listPostOffice = data;
           this.status = true;
         });     
       }
     }
   }

   selectedDist:any=[];
   onChangeCountry(country_name)
    {
      this.statesList = [], this.districtsList = [];
      this.userForm.patchValue({state_code: null, dist_code: null});
      if(country_name.length)
      {
        this.status = false
        this.DropDownListService.stateListByCountry(country_name).subscribe(data=>
        {
          this.statesList = data;
          this.status = true;
        });
      }
    }

    onChangeState(state_name)
    {
      this.districtsList = [];
      this.userForm.patchValue({dist_code: null})
      if(state_name.length)
      {
        this.status = false;
        this.DropDownListService.getDistrictThruState(state_name).subscribe(data=>
        {
          this.districtsList  = data;
          this.status = true;
        });     
      }
    }
    PinCode:any;
    focusOutFunction()
    {
     this.PinCode = this.userForm.get("pincode").value;
     // alert(this.PinCode.length)
      if(this.PinCode.length>6)
      {
        alert("PinCode must be in 6 digits !!.." );
        this.userForm.patchValue({pincode:null});
      }
    }

    onDelete(id:any)
    {
      this.status = false;
      if(confirm("Are you sure to delete this Post Office ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        this.Service.deletePostOffice(this.userForm.getRawValue(),id).subscribe(data=> 
        {
          console.log("post_office :"+data.post_office);
          if(data.post_office=='' || data.post_office==null)
          {
            alert("Opps!!! Can't delete this Post Office !!!");
          }else{
            alert("Post Office Deleted successfully.");
          }
          this.status = true;
          this.ngOnInit()
        }); 
      }  
      this.status = true;
    }

   onUpdate(id:any)
   {
     this.isHidden = true;
     this.status = false;
     this.selectedDist = [];
     this.Service.retrivePostOffice(id).subscribe(data=>
     { 
       this.countryname = data["country_name"];
       this.onChangeCountry(this.countryname); 
       this.selectedDist = data["dist_code"]
       this.DropDownListService.getDistrictThruState(data["state_code"]).subscribe(data=>
         {
           this.districtsList  = data;
           this.status = true;
         });
       this.userForm.patchValue(data); 
       this.status = true;
     }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
     this.ngOnInit()});
   }

   Id:any;
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
           this.Service.updatePostOffice(this.userForm.getRawValue(), this.Id).subscribe(data => 
           {
             console.log(this.userForm.value);
             alert("Post Office Master Updated successfully.");
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
             this.Service.createPostOffice(this.userForm.getRawValue()).subscribe(data => 
             {
               console.log(this.userForm.value);
               alert("Post Office Master created successfully.");
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
