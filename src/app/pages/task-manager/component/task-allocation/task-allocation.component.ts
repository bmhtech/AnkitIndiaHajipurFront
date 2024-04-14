import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../service/dropdown-service.service';
import { Master } from '../../../../service/master.service';
import { TaskAllocation } from '../../../../Models/InventoryModel/TaskAllocation';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-task-allocation',
  templateUrl: './task-allocation.component.html',
  styleUrls: ['./task-allocation.component.scss']
})
export class TaskAllocationComponent implements OnInit {
  isHidden=false;
  public userForm:FormGroup;
  model: TaskAllocation = new TaskAllocation();
  Id : any;
  taskList:any=[];
  employeeNames:any=[]
  status = false;
  company_name:any;
  finyear:any;
  taskallocationsave:boolean=true; 
  
  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService)
   { 
    this.userForm=fb.group({
      id:[''],
      allocation_id:[''],
      task_name:[''],
      task_date:[''],
      priority:[''],
      valid_upto:[''],
      description:[''],
      alloted_to:[''],
      alloted_to_array:[''],
      company_id:[''],
      fin_year:[''],
      username:['']
    });
   }

   get id(){ return this.userForm.get("id") as FormControl }
   get task_name(){ return this.userForm.get("task_name") as FormControl }
   get task_date(){ return this.userForm.get("task_date") as FormControl }
   get priority(){ return this.userForm.get("priority") as FormControl }
   get valid_upto(){ return this.userForm.get("valid_upto") as FormControl }
   get description(){ return this.userForm.get("description") as FormControl }
   get alloted_to(){ return this.userForm.get("alloted_to") as FormControl }
   get alloted_to_array(){ return this.userForm.get("alloted_to_array") as FormControl }
   get company_id(){ return this.userForm.get("company_id") as FormControl }
   get fin_year(){ return this.userForm.get("fin_year") as FormControl }
   get username(){ return this.userForm.get("username") as FormControl }

  ngOnInit() {
    this.isHidden=false;
    this.status=true;
    this.company_name = localStorage.getItem("company_name");
    this.finyear =localStorage.getItem("financial_year");
     this.taskallocationsave=true;
     forkJoin(
      this.DropDownListService.getAllocationlist(),
      this.DropDownListService.getEmployeeNamenew(this.company_name)
      )
     .subscribe(([allocation,employeeData])=>
      {
        //console.log("budata:"+JSON.stringify(budata))
          this.taskList = allocation;
          this.employeeNames = employeeData;
      });

  }

  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
      this.taskallocationsave=true;
    }
    if(s=="list")
    {
      this.isHidden=false;
      this.userForm.reset();
    }
  }

  getallocationgetItemGroupjobwork(all:string)
  {
    if(all.length)
    {
      this.userForm.patchValue({alloted_to:all})
    }
  }

  send()
    {
      this.Id= this.userForm.get("id").value as FormControl; 
      this.userForm.patchValue({ company_id: localStorage.getItem("company_name"),
        fin_year:localStorage.getItem("financial_year"), 
        username: localStorage.getItem("username")});
        this.status=false;
  
        if(this.userForm.get("task_name").value == '' || this.userForm.get("task_name").value == 0 || this.userForm.get("task_name").value == null)
        {
          alert("Please Enter Task Name!")
          this.status=true;
          }
       
        else
        {
            if(this.Id>0)
            {
              let allocationarray:any=[];
              allocationarray=this.userForm.get("alloted_to").value;
              
              let allocatestring="";
            
              for(let i = 0; i < allocationarray.length; i++)
              {
                allocatestring+=allocationarray[i]+",";
              }
              console.log(allocationarray.length+"//"+allocationarray+"///"+allocatestring)
              this.userForm.patchValue({alloted_to_array:allocatestring.substring(0,allocatestring.length-1)});

              this.Service.updateTaskAllocation(this.userForm.getRawValue(), this.Id).subscribe( data => 
                {
                  alert("Task Allocation Updated successfully.");
                  this.userForm.reset();
                  this.isHidden = false;
                  this.showList('list');
                  this.ngOnInit();
                  this.status=true;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Task Allocation !!! please Reload the page and try again....");
                }); 
            }
            else
            {
              let allocationarray:any=[];
              allocationarray=this.userForm.get("alloted_to").value;
              
              let allocatestring="";
            
              for(let i = 0; i < allocationarray.length; i++)
              {
                allocatestring+=allocationarray[i]+",";
              }
              console.log(allocationarray.length+"//"+allocationarray+"///"+allocatestring)
              this.userForm.patchValue({alloted_to_array:allocatestring.substring(0,allocatestring.length-1)});
              
              this.Service.createTaskAllocation(this.userForm.getRawValue())
              .subscribe(data =>
              {
                alert("Task Allocation Saved successfully.");
                this.userForm.reset();
                this.showList('list');
                this.ngOnInit();
                this.status=true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Task Allocation !!! please Reload the page and try again....");
              });
            }
        }
         
        }

        onUpdate(id,action)
        {
          this.isHidden=true;
          if(action == "view")
          {
            this.taskallocationsave=false;
          }
          if(action == "update")
          {
            this.taskallocationsave=true;
          }
      
          forkJoin(
            this.DropDownListService.retrivetaskAllocation(id),
            this.DropDownListService.getEmployeeNamenew(this.company_name)
            ).subscribe(([task,employeeData])=>
            {
              this.employeeNames = employeeData;
              this.userForm.patchValue(task);

                 this.status = true;
             }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in Task Allocation,please try again....");
             this.ngOnInit()}); 
        }

        onDelete(id)
        {
          if(confirm("Are you sure to delete this task Allocation From List?"))
          { 
              this.userForm.patchValue({username: localStorage.getItem("username")});
              this.Service.deleteTaskAllocation(this.userForm.getRawValue(),id).subscribe(data=> 
                {
                  alert("Task Allocation Deleted successfully.");
                  this.userForm.reset();
                  this.status = true;
                  this.ngOnInit();
                });
      
          }
        }
       
}
