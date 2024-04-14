import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Nongoodstypemaster } from '../../../../../../../../src/app/Models/JobWork/nongoodstypemaster';
import { DropdownServiceService } from '../../../../../../../../src/app/service/dropdown-service.service';
import { Master } from '../../../../../../../../src/app/service/master.service';

@Component({
  selector: 'app-nongoodstypemaster',
  templateUrl: './nongoodstypemaster.component.html',
  styleUrls: ['./nongoodstypemaster.component.scss']
})
export class NongoodstypemasterComponent implements OnInit {

  model: Nongoodstypemaster = new Nongoodstypemaster();
  public userForm:FormGroup;
  businesslist:any=[];
  company_name:any;
  isHidden=false;
  status = false;
  Id:any;
  finYear:any;
  listType:any=[];

  constructor(public fb:FormBuilder,private Service: Master, 
    private DropDownListService: DropdownServiceService) { 

      this.userForm=fb.group(
        {
          id:[''],
          business_unit:[''],
          typename:[''],
          company_id:[''],
          fin_year:[''],
          username:['']

        });
    }

    get id(){ return this.userForm.get("id") as FormControl}
    get business_unit(){ return this.userForm.get("business_unit") as FormControl}
    get typename(){ return this.userForm.get("typename") as FormControl}
    get company_id(){ return this.userForm.get("company_id") as FormControl}
    get fin_year(){ return this.userForm.get("fin_year") as FormControl}
    get username(){ return this.userForm.get("username") as FormControl}

  ngOnInit() {
    this.company_name = localStorage.getItem("company_name");
    this.finYear=localStorage.getItem("financial_year");
      this.status=true;
      this.isHidden=false;

      this.DropDownListService.getcompanyBUMNCListFastApi(this.company_name)
       .subscribe(data=>
         {
           this.businesslist  = data;
         });
   

    this.DropDownListService.getNonGoodsTypeList(this.finYear).subscribe(data=>
      {
        this.listType=data;
      })
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
       this.userForm.reset();
    }  

  }

  send(){
      this.Id= this.userForm.get("id").value as FormControl;
      this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
      fin_year:localStorage.getItem("financial_year"), 
      username: localStorage.getItem("username")});
      this.status=false;
    if(this.userForm.get("business_unit").value==null || this.userForm.get("business_unit").value==0)
    {
      alert("Please Select Business Unit");
      this.status=true;
    }
    else if (this.userForm.get("typename").value==null || this.userForm.get("typename").value==0)
    {
      alert("Please Fill Type Name");
      this.status=true;
    }
    else{
      if(this.Id>0)
      {
        this.Service.updateNonGoodsTypeMaster(this.userForm.getRawValue(), this.Id).subscribe(data=>
          {
            alert("Detail Updated");
            this.status=true;
          this.ngOnInit();
          this.isHidden=false;
          this.showList("list");
          })
      }
      else{
      this.Service.createNonGoodsTypeMaster(this.userForm.getRawValue()).subscribe(data=>
        {
          alert("Details Saved")
          this.status=true;
          this.ngOnInit();
          this.isHidden=false;
          this.showList("list");
        })
      }
    }
  }

  onUpdate(id:any)
  {
    this.userForm.patchValue({id: id});
    this.isHidden=true;

    this.Service.retriveNonGoodsTypeMaster(id).subscribe(data=>
      {
        this.userForm.patchValue(data);
      })
  }

  onDelete(id:any)
  {
    this.status=false;
    if(confirm("Are you sure to delete this Non Goods Type Master?"))
    {
      this.userForm.patchValue({username: localStorage.getItem("username")});
      
          this.Service.deleteNonGoodsTypeMaster(this.userForm.getRawValue(),id).subscribe(data=> 
            {
              alert("Non Goods Type Master Deleted successfully.");
              this.userForm.reset();
              this.status = true;
              this.isHidden = false;
              this.ngOnInit();
              this.showList("list");
            });  
      }
      this.status=true;
  }

}
