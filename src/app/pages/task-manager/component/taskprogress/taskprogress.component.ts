import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Master } from '../../../../service/master.service';
import { DropdownServiceService } from '../../../../service/dropdown-service.service';
import { forkJoin } from 'rxjs';
import { TaskProgress } from '../../../../Models/TaskManager/taskprogress';

@Component({
  selector: 'app-taskprogress',
  templateUrl: './taskprogress.component.html',
  styleUrls: ['./taskprogress.component.scss']
})
export class TaskprogressComponent implements OnInit {
  public userForm: FormGroup;
  model: TaskProgress = new TaskProgress();

  Id: any;
  currentDate: any;
  company_name: any;
  finYear: any;
  user:any;

  isHidden: boolean = false;
  status: boolean = false;
  taskprogresssave: boolean = true;
  tasklist:any=[];
  listTaskProgress: any = [];

  constructor(public fb: FormBuilder, private Service: Master, private DropDownListService: DropdownServiceService) {
    this.userForm = fb.group({
      id: [''],
      task_id: [''],
      task_name: [''],
      date: [''],
      description: [''],
      priority: [''],
      user_remarks: [''],
      progress: [''],
      valid_upto:[''],

      company_id: [''],
      fin_year: [''],
      username: ['']
    });
  }

  get id() { return this.userForm.get("id") as FormControl }
  get task_id() { return this.userForm.get("task_id") as FormControl }
  get task_name() { return this.userForm.get("task_name") as FormControl }
  get date() { return this.userForm.get("date") as FormControl }
  get description() { return this.userForm.get("description") as FormControl }
  get priority() { return this.userForm.get("priority") as FormControl }
  get user_remarks() { return this.userForm.get("user_remarks") as FormControl }
  get progress() { return this.userForm.get("progress") as FormControl }
  get valid_upto() { return this.userForm.get("valid_upto") as FormControl }

  get company_id() { return this.userForm.get("company_id") as FormControl }
  get fin_year() { return this.userForm.get("fin_year") as FormControl }
  get username() { return this.userForm.get("username") as FormControl }


  ngOnInit() {

    this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
    this.company_name = localStorage.getItem("company_name");
    this.finYear = localStorage.getItem("financial_year");
    this.user=localStorage.getItem("username");

    this.isHidden = false;
    this.status = true;
    this.taskprogresssave = true;

    forkJoin(
      this.DropDownListService.getProgresslist(),
      this.DropDownListService.getAllocationUsernameWiselist(this.currentDate,this.user)
    )
      .subscribe(([progress,task]) => {
      // console.log("task List :: " + JSON.stringify(task))
       this.tasklist=task;
        this.listTaskProgress = progress;
      });

  }

  showList(s: string) {
    if (s == "add") {
      this.isHidden = true;
      this.userForm.reset(this.ResetAllValues().value);
      this.taskprogresssave = true;
    }
    if (s == "list") {
      this.isHidden = false;
      this.userForm.reset(this.ResetAllValues().value);
    }
  }

  ResetAllValues() {
    return this.userForm = this.fb.group({
      id: [''],
      task_id: [''],
      task_name: [''],
      date: [''],
      description: [''],
      priority: [''],
      user_remarks: [''],
      progress: [''],
      valid_upto:[''],

      company_id: [''],
      fin_year: [''],
      username: [''],
    });
  }
  onChangeDate(taskdate)
  {
    console.log("date:"+taskdate.target.value)
    this.DropDownListService.getAllocationUsernameWiselist(taskdate.target.value,this.user).subscribe(task=> {
       console.log("task List date :: " + JSON.stringify(task))
       this.tasklist=task;
      });
  }

  onChangeTaskName(task)
  {
    if(task.length)
      {
        if( this.userForm.get("date").value==null ||this.userForm.get("date").value=="" || this.userForm.get("date").value==0)
        {
          alert("Please Select Date");
          this.status=true;
        } 
      else
      {
          this.DropDownListService.getTaskNameDetails(task).subscribe(taskdetails => {
            console.log("taskdetails :: " + JSON.stringify(taskdetails))
            this.userForm.patchValue({valid_upto:taskdetails.valid_upto,description:taskdetails.description,priority:taskdetails.priority})
          });
        }
      }
  }

  send() {
    this.Id = this.userForm.get("id").value as FormControl;
    this.userForm.patchValue({
      company_id: localStorage.getItem("company_name"),
      fin_year: localStorage.getItem("financial_year"),
      username: localStorage.getItem("username")
    });
    this.status = false;

    if (this.userForm.get("progress").value == '' || this.userForm.get("progress").value == 0 || this.userForm.get("progress").value == null) {
      alert("Please Choose Progess ! ")
      this.status = true;
    }
    else {
      if (this.Id > 0) {
        this.Service.updateTaskProgress(this.userForm.getRawValue(), this.Id).subscribe(data => {
          alert("Task Progress Updated Successfully.... ");
          this.userForm.reset(this.ResetAllValues().value);
          this.isHidden = false;
          this.showList('list');
          this.ngOnInit();
          this.status = true;
        }, (error) => {
          this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("something error is occured Task Progress !!! Please Reload the page and try again....");
        });
      }
      else {
        this.Service.createTaskProgress(this.userForm.getRawValue())
          .subscribe(data => {
            alert("Task Progress Saved Successfully.... ");
            this.userForm.reset(this.ResetAllValues().value);
            this.showList('list');
            this.ngOnInit();
            this.status = true;
          }, (error) => {
            this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("Something error is occured Task Progress !!! Please Reload the page and try again....");
          });
      }
    }
  }

  onUpdate(id, action) {
    this.isHidden = true;
    if (action == "view") {
      this.taskprogresssave = false;
    }
    if (action == "update") {
      this.taskprogresssave = true;
    }

    forkJoin(
      this.DropDownListService.retrivetaskProgress(id)
    ).subscribe(([taskProgress]) => {
      this.userForm.patchValue(taskProgress);
      this.status = true;
    }, (error) => {
      this.status = true; console.log("ERROR get: " + JSON.stringify(error)); alert("Something error is occured in Task Progress, Please try again....");
      this.ngOnInit()
    });
  }

  onDelete(id) {
    if (confirm("Are you sure to delete this Task Progress From List?")) {
      this.userForm.patchValue({ username: localStorage.getItem("username") });
      this.Service.deleteTaskProgress(this.userForm.getRawValue(), id).subscribe(data => {
        alert("Task Progress Deleted Successfully..... ");
        this.userForm.reset();
        this.status = true;
        this.ngOnInit();
      });

    }
  }

}
