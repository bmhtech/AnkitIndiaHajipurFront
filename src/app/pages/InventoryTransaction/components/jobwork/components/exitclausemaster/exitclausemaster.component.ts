import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Exitclausemaster } from '../../../../../../../../src/app/Models/JobWork/exitclausemaster';
import { DropdownServiceService } from '../../../../../../../../src/app/service/dropdown-service.service';
import { Master } from '../../../../../../../../src/app/service/master.service';

@Component({
  selector: 'app-exitclausemaster',
  templateUrl: './exitclausemaster.component.html',
  styleUrls: ['./exitclausemaster.component.scss']
})
export class ExitclausemasterComponent implements OnInit {

  model: Exitclausemaster = new Exitclausemaster();
  public userForm:FormGroup;
  businesslist:any=[];
  company_name:any;
  finYear:any;
  isHidden=false;
  status = false;
  Id:any;
  seq_no:any;
  listExitClause:any=[];

  constructor(public fb:FormBuilder,private Service: Master, 
              private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group(
        {
          id:[''],
          business_unit:[''],
          exitclauseno:[''],
          exitclausename:[''],
          company_id:[''],
          fin_year:[''],
          username:['']
        });
    }

    get id(){ return this.userForm.get("id") as FormControl}
    get business_unit(){ return this.userForm.get("business_unit") as FormControl}
    get exitclauseno(){ return this.userForm.get("exitclauseno") as FormControl}
    get exitclausename(){ return this.userForm.get("exitclausename") as FormControl}
    get company_id(){ return this.userForm.get("company_id") as FormControl}
    get fin_year(){ return this.userForm.get("fin_year") as FormControl}
    get username(){ return this.userForm.get("username") as FormControl}

  ngOnInit() 
  {
    this.company_name = localStorage.getItem("company_name");
    this.finYear = localStorage.getItem("financial_year");
    this.status=true;
    this.isHidden=false;

    this.DropDownListService.getcompanyBUMNCListFastApi(this.company_name)
     .subscribe(data=>
       {
         this.businesslist  = data;
       });

    this.DropDownListService.getExitClauseMasterList(this.finYear).subscribe(data=>
    {
      this.listExitClause=data;
    });

    this.DropDownListService.getESequenceId(this.finYear)
    .subscribe(data=>{
      this.seq_no = data.sequenceid;
    });

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
  else if (this.userForm.get("exitclausename").value==null || this.userForm.get("exitclausename").value==0)
  {
    alert("Please Fill Exit Clause Name");
    this.status=true;
  }
  else{
    if(this.Id>0)
    {
      this.Service.updateExitClauseMaster(this.userForm.getRawValue(), this.Id).subscribe(data=>
        {
        alert("Detail Updated");
        this.status=true;
        this.ngOnInit();
        this.isHidden=false;
        this.showList("list");
        })
    }
    else{
      this.userForm.patchValue({exitclauseno:this.seq_no});
      this.Service.createExitClauseMaster(this.userForm.getRawValue()).subscribe(data=>
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

    this.Service.retriveExitClauseMaster(id).subscribe(data=>
      {
        this.userForm.patchValue(data);
      })
  }

  onDelete(id:any)
  {
    this.status=false;
    if(confirm("Are you sure to delete this Exit Clause Master?"))
    {
      this.userForm.patchValue({username: localStorage.getItem("username")});
      
          this.Service.deleteExitClauseMaster(this.userForm.getRawValue(),id).subscribe(data=> 
            {
              alert("Exit Clause Master Deleted successfully.");
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
