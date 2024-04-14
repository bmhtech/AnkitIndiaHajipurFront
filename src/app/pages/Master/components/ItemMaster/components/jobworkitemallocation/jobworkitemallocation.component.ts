import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { JobWorkItemAllocation } from '../../../../../../Models/ItemModel/JobWorkItemAllocation';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-jobworkitemallocation',
  templateUrl: './jobworkitemallocation.component.html',
  styleUrls: ['./jobworkitemallocation.component.scss']
})
export class JobworkitemallocationComponent implements OnInit 
{
  public userForm:FormGroup;
  model: JobWorkItemAllocation = new JobWorkItemAllocation();

  isHidden=false;
  status=false;

  company_name:any;
  finYear:any;
  Id:any;
  action:any;

  jobitemlist:any=[];
  list_party:any=[];
  UOMs:any=[];
  listItemAllocation:any = [];

  itemallocationsave:boolean = true;
  submitsave:boolean = true;

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService) 
  { 
    this.userForm=fb.group({
      id:[''],
      job_item:[''],
      party:[''],
      qty_uom:[''],
      qty:[''],
      allocatedqty:[''],
      company_id:[''],
      fin_year:[''],
      username:[''],

    });
  }

  get id(){ return this.userForm.get("id") as FormControl}
  get job_item(){ return this.userForm.get("job_item") as FormControl }
  get party(){ return this.userForm.get("party") as FormControl}
  get qty_uom(){ return this.userForm.get("qty_uom") as FormControl}
  get qty(){ return this.userForm.get("qty") as FormControl}
  get allocatedqty(){ return this.userForm.get("allocatedqty") as FormControl}
  
  get company_id(){ return this.userForm.get("company_id") as FormControl}
  get fin_year(){ return this.userForm.get("fin_year") as FormControl}
  get username(){ return this.userForm.get("username") as FormControl}

  ngOnInit() 
  {
    this.company_name = localStorage.getItem("company_name");
    this.finYear = localStorage.getItem("financial_year");

    this.isHidden=false;
    this.status=true;

    forkJoin(
     this.DropDownListService.getItemThruSalesThruBU_inv_type('CBU00001',this.company_name,'INV00003'),
     this.DropDownListService.newfastcustomerList(this.company_name),
     this.Service.getCustomUoms(),
     this.DropDownListService.JobWorkItemAllocationList()
    ).subscribe(([jobItemData,partyData,UOMsdata,ItemAllocationListData])=>
      {
        console.log("Job Item List : : "+JSON.stringify(ItemAllocationListData));
        this.jobitemlist=jobItemData;
        this.list_party=partyData;
        this.UOMs=UOMsdata;
        this.listItemAllocation=ItemAllocationListData
      });
  }

  showList(s:string)
  {
    if(s=="add")
    {
       this.isHidden=true;

       this.userForm.reset(this.ResetAllValues().value);
    }
    if(s=="list")
    { 
       this.isHidden=false;
    
       this.userForm.reset(this.ResetAllValues().value);
    }  
  }

  ResetAllValues()
  {
    return this.userForm=this.fb.group({
      id:[''],
      job_item:[''],
      party:[''],
      qty_uom:[''],
      qty:[''],
      allocatedqty:[''],

      company_id:[''],
      fin_year:[''],
      username:[''],
    });
  }

  Qty:any;

  checkQtyUpdate(event)
  {
    this.Qty = event.target.value;
    this.DropDownListService.getItemQtythruLoading(this.userForm.get("job_item").value,this.userForm.get("party").value)
    .subscribe(data=>
      {
       //console.log("CHECK : : "+JSON.stringify(data)) 
       //console.log("JobItem : : "+this.Qty)
       //console.log("Loading : : "+data["loading_wt"])
       //console.log("Logic : : "+this.Qty<data["loading_wt"])
       if(this.Qty<data["loading_wt"])
       {
        alert("Qty can't be less than Loading Qty : : "+data["loading_wt"])
        this.userForm.patchValue({qty:''});
       }
      })
  }

  sendCheck()
  {
    this.DropDownListService.getItemQtythruLoading(this.userForm.get("job_item").value,this.userForm.get("party").value)
    .subscribe(data=>
      {
       //console.log("CHECK : : "+JSON.stringify(data)) 
       //console.log("JobItem : : "+this.Qty)
       //console.log("Loading : : "+data["loading_wt"])
       console.log("Logic Check Button : : "+this.Qty<data["loading_wt"])
       if(this.Qty<data["loading_wt"])
       {
        alert("Qty can't be less than Loading Qty : : "+data["loading_wt"])
        this.userForm.patchValue({qty:''});
       }
      });

    this.submitsave = false;
  }

  send()
  {
    this.submitsave = true;
    this.Id= this.userForm.get("id").value as FormControl;
    this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
    fin_year:localStorage.getItem("financial_year"), 
    username: localStorage.getItem("username")});

    this.status=false;

    if(this.userForm.get("job_item").value == "" || this.userForm.get("job_item").value == null || this.userForm.get("job_item").value == 0)
    {
      alert("Please Select Item Name....");
      this.status=true;
    }
    else if(this.userForm.get("party").value == "" || this.userForm.get("party").value == null || this.userForm.get("party").value == 0)
    {
      alert("Please Select Party Name....");
      this.status=true;
    }
    else if(this.userForm.get("qty_uom").value == "" || this.userForm.get("qty_uom").value == null || this.userForm.get("qty_uom").value == 0)
    {
      alert("Please Select UoM....");
      this.status=true;
    }
    else if(this.userForm.get("qty").value == "" || this.userForm.get("qty").value == null || this.userForm.get("qty").value == 0)
    {
      alert("Please Enter Qty....");
      this.status=true;
    }
    else
    {
      if(this.Id>0)
      {
        this.Service.updateJobItemAllocation(this.userForm.getRawValue(), this.Id).subscribe(data=>
        {
        alert(" Item Allocation Updated Successfully........ ");
        this.userForm.reset();
        this.status=true;
        this.ngOnInit();
        this.isHidden=false;
        this.showList("list");
        })
      }
      else
      {
        this.Service.createJobItemAllocation(this.userForm.getRawValue()).subscribe(data=>
          {
            alert("Item Allocation Saved Successfully........ ");
            this.userForm.reset();
            this.isHidden=false;
            this.ngOnInit();
            this.status=true;
            this.showList("list");
            
          })
      }
    }
  }

  onUpdate(id:any,action)
  {
    this.itemallocationsave=true;
    this.userForm.patchValue({id: id});
    this.isHidden=true;
    this.status = false;
    if(action == 'view')
    {
      this.action = 'view';
      this.itemallocationsave = false;
    }
    else
    {
      action = 'update'; 
    }

    forkJoin
    (
      this.Service.retriveJobItemAllocation(id),
    )
    .subscribe(([ItemAllocationData])=>
    {
      console.log("Check :: "+JSON.stringify(ItemAllocationData) )
      this.userForm.patchValue(ItemAllocationData);

      this.status = true;
    });
  }

    onDelete(id:any)
    {
      if(confirm("Are you sure to delete this Item Allocation Master ?"))
      { 
        this.userForm.patchValue({username: localStorage.getItem("username")});
        
            this.Service.DeleteJobItemAllocation(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                alert("Item Allocation Deleted Successfully....");
                this.userForm.reset();
                this.isHidden = false;
                this.ngOnInit();
                this.showList("list");
                this.status = true;
              });
            }
    }

    checkpartyitemname(event)
    {
      if(event.length)
      {
        this.DropDownListService.getJwAllocationRestWt(event).subscribe(restwt=> 
          {
            this.userForm.patchValue({allocatedqty:restwt["rest_wt"]});
            this.listItemAllocation.forEach(element => {
          
              if(element.party == event && element.job_item == this.userForm.get("job_item").value)
              {
                alert("Partyname cant be same with item name")
                this.userForm.patchValue({party:''})
              }
            });

            this.status=true;
          });
        
      }
    }

    checkitemnameparty(event)
    {
      if(event.length)
      {

        this.listItemAllocation.forEach(element => {
          
          if(element.job_item == event && element.party == this.userForm.get("party").value)
          {
            alert("Partyname cant be same with item name")
            this.userForm.patchValue({job_item:''})
          }
        });
      }
    }

}
