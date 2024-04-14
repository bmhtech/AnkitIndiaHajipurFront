import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { LaodingPoint } from '../../../../../../Models/OtherMaster/laoding-point';

@Component({
  selector: 'app-loading-point',
  templateUrl: './loading-point.component.html',
  styleUrls: ['./loading-point.component.scss']
})
export class LoadingPointComponent implements OnInit 
{
  submitted = false;
  public userForm:FormGroup;
  model: LaodingPoint = new LaodingPoint();
  listLaodingPoint: LaodingPoint[];
  isHidden=false;
  Id:any;
  financialYear:any;
  company_name:any;
  seq_no:string;
  businesslists:any=[];
  status = false;
  loadingpointsave:boolean = true;
  loadingpointupdate:boolean = true;
  loadingpointdelete:boolean = true;
  loadingpointview:boolean = true;
  constructor(private Service: Master, public fb:FormBuilder,
    private DropDownListService: DropdownServiceService) 
  {
    this.userForm=fb.group({ 
      id:[''],
      loading_no: [''],
      loading_name: [''],
      business_unit:[''],
      company_id: [''],
      fin_year: [''],
      username: ['']});
  }

  get id(){ return this.userForm.get("id") as FormControl }
  get loading_no(){ return this.userForm.get("loading_no") as FormControl }
  get loading_name(){ return this.userForm.get("loading_name") as FormControl }
  get business_unit(){ return this.userForm.get("business_unit") as FormControl }
  get company_id(){ return this.userForm.get("company_id") as FormControl }
  get fin_year(){ return this.userForm.get("fin_year") as FormControl }
  get username(){ return this.userForm.get("username") as FormControl }

  showList(s:string)
    {
      if(this.loadingpointsave == true  && this.loadingpointupdate == true)//true exist  false not exist 
      {
        if(s=="add")
        {
          this.isHidden=true;
          this.userForm.reset();
        }
      }
      if(this.loadingpointsave == true  && this.loadingpointupdate == false)
      {
        if(s=="add")
      {
        this.isHidden=true;
        this.userForm.reset();
      }
      }
      
      if(s=="list")
      {
        this.isHidden=false;
        this.userForm.reset();
        this.loadingpointsave=true;
        this.DropDownListService.getSequenceId("LPC").subscribe(data=>{this.seq_no = data.sequenceid;});  
      }
    }

    ResetAllValues()
    {
      return this.userForm=this.fb.group({
        id:[''],
        loading_no: [''],
        loading_name: [''],
        business_unit:[''],
        company_id: [''],
        fin_year: [''],
        username: [''],});
    }

  ngOnInit() 
  {
    //For User Role
    let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));

    this.loadingpointsave = false;
    this.loadingpointupdate=false;
    this.loadingpointdelete=false;
    this.loadingpointview=false;

    if(accessdata.includes('loading_point.save'))
    {
     this.loadingpointsave = true;
    }
   if(accessdata.includes('loading_point.update'))
    { 
      this.loadingpointupdate=true;
    }
    if(accessdata.includes('loading_point.delete'))
    {
      this.loadingpointdelete=true;
    }
    if(accessdata.includes('loading_point.view'))
    {
      this.loadingpointview=true;
    }

    
    this.company_name = localStorage.getItem("company_name");
    this.Service.getLoadingPoints().subscribe(data=>{this.listLaodingPoint  = data;});
    this.financialYear = localStorage.getItem("financial_year");
    this.DropDownListService.getSequenceId("LPC").subscribe(data=>{this.seq_no = data.sequenceid;});  
    this.DropDownListService.custometrBusList(this.company_name).subscribe(data=>{this.businesslists = data;});
    this.status = true;
  }

  onUpdate(id:any,action)
  {
    if(action == 'update')
    {
      this.loadingpointsave = true;
    }
    else
    {
      this.loadingpointsave = false;
    }

    
    this.isHidden = true;
    this.status = false;
    this.Service.retriveLoadingPoints(id).subscribe(data=>
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
        this.DropDownListService.findLoadingPoint('0').subscribe(data=>
        {
          this.listLaodingPoint = data;
          this.status = true;
        });
      }
      else
      {
        this.DropDownListService.findLoadingPoint(serchText).subscribe(data=>
        {
          this.listLaodingPoint = data;
          this.status = true;
        });  
        this.status = true;   
      }
    }
  }

  onDelete(id:any,loading_id)
  {
    this.status = false;
    if(confirm("Are you sure to delete this Loading Point ?"))
    { 
      this.userForm.patchValue({username: localStorage.getItem("username")});
      this.DropDownListService.checkLoadingPointUsage(loading_id).subscribe(checkLoadingPointData=> 
        {
         //alert("bidhan here::"+checkLoadingPointData.status);
         if(checkLoadingPointData.status=='No')
         {
          this.Service.deleteLoadingPoint(this.userForm.getRawValue(),id).subscribe(data=> 
            {
              console.log("Cat id:"+data.loading_name);
      
              if(data.loading_name=='' || data.loading_name==null)
              {
                alert("Opps!!! Can't delete this Loading Point !!!");
              }else{
                alert("Loading Point deleted successfully.");
              }
              this.status = true;
              this.ngOnInit()
            }); 
         }
         else{
          alert("This Loading Point is Already Used,Can not be Deleted!! ");
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
      if(this.userForm.get("loading_name").value == '' || this.userForm.get("loading_name").value == null || this.userForm.get("loading_name").value == 0)
      {
        alert("Please Enter Loading Point Name");
        this.status=true;
      }
      else if(this.userForm.get("business_unit").value == '' || this.userForm.get("business_unit").value == null || this.userForm.get("business_unit").value == 0)
      {
        alert("Please Select Business Unit");
        this.status=true;
      }
      else{
        if(this.Id>0)
        {
          this.status = false;
          this.Service.updateLoadingPoint(this.userForm.getRawValue(), this.Id).subscribe( data => 
          {
            console.log(this.userForm.value);
            alert("Loading Point Master Updated successfully.");
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
            this.Service.createLoadingPoint(this.userForm.getRawValue()).subscribe( data => 
            {
              console.log(this.userForm.value);
              alert("New Loading Point Master created successfully.");
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
