import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { SeivesMaster } from '../../../../../../Models/InventoryModel/SeivesMaster';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-seivesmaster',
  templateUrl: './seivesmaster.component.html',
  styleUrls: ['./seivesmaster.component.scss']
})
export class SeivesmasterComponent implements OnInit {

  public userForm:FormGroup;
  model: SeivesMaster = new SeivesMaster();
  status = false;
  isHidden:any;
  seiveslist:any = [];
  businesslists:any=[];
  company_name:any;
  Id:any;
  BuUnit = "0";
  seivessave:boolean=true;
  sl_no:number=1;
  itemList:any=[]; 

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService) 
  {
    this.userForm=fb.group({
      id:[''],
      seivesid:[''],
      business_unit:[''],
      itemid:[''],
      company_id:[''],
      fin_year:[''],
      username:[''],

      seives_Dtls: this.fb.array([this.fb.group({
        slno:this.sl_no,
        seivesid:'',
        seives_name:''
      })])

    });
  }

   get id(){ return this.userForm.get("id") as FormControl }
   get business_unit(){ return this.userForm.get("business_unit") as FormControl }
   get itemid(){ return this.userForm.get("itemid") as FormControl }
   get company_id(){ return this.userForm.get("company_id") as FormControl }
   get fin_year(){ return this.userForm.get("fin_year") as FormControl }
   get username(){ return this.userForm.get("username") as FormControl }

   get seives_Dtls(){return this.userForm.get("seives_Dtls") as FormArray};
   
  ngOnInit() {

    this.isHidden=false;
    this.status=true;
    this.sl_no=1;
    
    this.company_name = localStorage.getItem("company_name");
    let finyear =localStorage.getItem("financial_year");
    this.BuUnit = "0";
     this.seivessave=true;

   forkJoin(
    this.DropDownListService.getSeiveslist(),
    this.DropDownListService.getcompanyBUMNCListnew(this.company_name)
    )
   .subscribe(([seives,budata])=>
    {
      //console.log("budata:"+JSON.stringify(budata))
        this.seiveslist = seives;
        this.businesslists=budata;
    });
  }

  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
      this.seivessave=true;
    }
    if(s=="list")
    {
      this.isHidden=false;
      this.userForm.reset();
      this.ResetAllValues();
    }
  }
  ResetAllValues()
  {
    return this.userForm=this.fb.group({
    id:[''],
    seivesid:[''],
    business_unit:[''],
    itemid:[''],
    company_id:[''],
    fin_year:[''],
    username:[''],

    seives_Dtls: this.fb.array([this.fb.group({
      slno:this.sl_no,
       seivesid:'',
       seives_name:''
      })])
    });
  }

  addItems()
  {
   this.sl_no =this.seives_Dtls.length +1; 
    this.seives_Dtls.push(this.fb.group({
      slno:this.sl_no,
      seivesid:'',
      seives_name:'',
       }))
    }

    selectedItemName:any;
    getitemname(businessunit_id)
    {
        if(businessunit_id.length)
        {
            this.DropDownListService.getLabItemlist(businessunit_id).subscribe(data=>
            {
              this.itemList=data;
            });        
        }
    }
    onchangeItemNamestock(itemId)
    {
      
      if(itemId.length && itemId != "0")
      {
        this.userForm.patchValue({itemid: itemId});
      }
    }
    delete(index) 
    {
      if(index)
      {
        this.seives_Dtls.removeAt(index);
        for( let i=0;i<=this.seives_Dtls.length;i++)
        {
          this.seives_Dtls.at(i).patchValue({slno:i+1})
        }

      }
      else
      {
        if(this.seives_Dtls.length>1)
        {
          this.seives_Dtls.removeAt(index);
          for( let i=0;i<=this.seives_Dtls.length;i++)
        {
          this.seives_Dtls.at(i).patchValue({slno:i+1})
        }

        }
        else
        {
          alert("can't delete all rows");
        }} 
    }
   

    send()
    {
      this.Id= this.userForm.get("id").value as FormControl; 
      this.userForm.patchValue({ company_id: localStorage.getItem("company_name"),
        fin_year:localStorage.getItem("financial_year"), 
        username: localStorage.getItem("username")});
        this.status=false;
  
        if(this.userForm.get("business_unit").value == '' || this.userForm.get("business_unit").value == 0 || this.userForm.get("business_unit").value == null)
        {
          alert("Please Select Bussiness Unit Name!")
          this.status=true;
          }
        else if(this.userForm.get("itemid").value == '' || this.userForm.get("itemid").value == 0 || this.userForm.get("itemid").value == null)
        {
          alert("Please Select Item Name!")
          this.status=true;
        }
        else
        {
          let seives = false;
          
          for(let b=0;b<this.seives_Dtls.length;b++)
          {
            if(this.seives_Dtls.at(b).get("seives_name").value == null || this.seives_Dtls.at(b).get("seives_name").value == '' || this.seives_Dtls.at(b).get("seives_name").value == 0)
            {
              seives = true; 
            }
          }
          if(seives ==true)
          {
            alert("Please Enter Seives Name in Seives Details Tab!!!");
            this.status = true;
          }
          else
          {
            if(this.Id>0)
            {
              this.Service.updateSeives(this.userForm.getRawValue(), this.Id).subscribe( data => 
                {
                  alert("Seives Master Updated successfully.");
                  this.userForm.reset();
                  this.isHidden = false;
                  this.showList('list');
                  this.ngOnInit();
                  this.status=true;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Seives Mater !!! please Reload the page and try again....");
                }); 
            }
            else
            {
              this.Service.createSeives(this.userForm.getRawValue())
              .subscribe(data =>
              {
                alert("Seives Master Saved successfully.");
                this.userForm.reset();
                this.showList('list');
                this.ngOnInit();
                this.status=true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Seives Master !!! please Reload the page and try again....");
              });
            }
          }
        }
         
        }

        onDelete(id)
        {
          if(confirm("Are you sure to delete this Seives Master From List?"))
          { 
              this.userForm.patchValue({username: localStorage.getItem("username")});
              this.Service.deleteSeives(this.userForm.getRawValue(),id).subscribe(data=> 
                {
                  alert("Seives Master Deleted successfully.");
                  this.userForm.reset();
                  this.status = true;
                  this.ngOnInit();
                });
      
          }
        }
       
        onUpdate(id,action)
        {
          this.isHidden=true;
          if(action == "view")
          {
            this.seivessave=false;
          }
          if(action == "update")
          {
            this.seivessave=true;
          }
      
          forkJoin(
            this.DropDownListService.retriveSeives(id),
            this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
            ).subscribe(([seives,bUnitData])=>
            {
              this.businesslists=bUnitData;
              this.userForm.patchValue(seives);

              forkJoin(
                  this.DropDownListService.retriveSeivesDetails(seives['seivesid']),
                 this.DropDownListService.getLabItemlist(seives['business_unit'])
                  ).subscribe(([dynamicdetails,item_list])=>  
                    {
                      this.itemList=item_list;
                      let k=0;
                      this.sl_no = 0;
                      while (this.seives_Dtls.length) 
                      this.seives_Dtls.removeAt(0);
                      for(let data1 of dynamicdetails)
                      {   
                        this.selectedItemName = data1["itemid"];
                        this.addItems();
                       
                        this.seives_Dtls.patchValue(dynamicdetails);
                        k++;
                      }
                      this.status = true;
                    });
              
            
        
                 this.status = true;
             }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in Seives Master,please try again....");
             this.ngOnInit()}); 
        
      
      
        }
}
