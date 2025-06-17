import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FumigationStkOpnDate } from '../../../../../../Models/WheatFumigationModel/WheatFumigation';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../../service/excel.service';
import { UpdateFumiOpenDatePopUpComponent } from '../update-fumi-open-date-pop-up/update-fumi-open-date-pop-up.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fumigation-stk-opn-date',
  templateUrl: './fumigation-stk-opn-date.component.html',
  styleUrls: ['./fumigation-stk-opn-date.component.scss']
})
export class FumigationStkOpnDateComponent{
  busy = 0;
  fumigationStkOpnDateList: FumigationStkOpnDate[] = [];
  typeField: string = "all";
  currentDate: string = new Date().toISOString().substring(0, 10);
  company: string = localStorage.getItem("company_name") || "";
  finyear: string = localStorage.getItem("financial_year") || "";
  username: string = localStorage.getItem("username") || "";

  constructor(public fb: FormBuilder, public dialog: MatDialog,private dropDownListService: DropdownServiceService, private excelService: ExcelService, private toast: ToastrService) {}

  /**
   * @description
   * Gets/Sets the busy status of the component.
   * If set to true, increments the busy counter.
   * If set to false and the busy counter is greater than 0, decrements the busy counter.
   * @param value The new busy status.
   * NOTE: It's mostly made for convinience because all other components use status instead of this busy which is more accurate
   */
  get status(): boolean {
    return !(this.busy > 0);
  }
  set status(value: boolean) {
    if (!value) this.busy++;
    else if (this.busy > 0) this.busy--;
  }

  onSearch() {
    this.status = false;
    this.dropDownListService.getAllWheatFumiDtlsList(this.typeField).subscribe({
      next: (data: FumigationStkOpnDate[]) => {
        this.fumigationStkOpnDateList = data;
        this.status = true;
      },
      error: (err) => {
        console.error(err);
        alert("Something went wrong!");
        this.status = true;
      },
    });
  }

  onSave(id, fumigation_id,fumigation_no,fumi_date,warehouse_name,stack,action,stack_open_date,allocate_status,pcmw_sign_name,supervisor_sign_name,lab_sign_name,manpower,degassing_date,degassing_time,wheat_fumi_qc) {
    console.log("test data: ",id," // ",fumigation_id," // ",fumigation_no," // ",fumi_date," // ",warehouse_name," // ",stack," // ",action, " // ",stack_open_date," // ",allocate_status," // ",manpower," // ",degassing_date," // ",degassing_time+" // "+wheat_fumi_qc)
    const dialogConfig = new MatDialogConfig();
       dialogConfig.disableClose = true;
       dialogConfig.autoFocus = true;
       dialogConfig.data = { id:id,fumigation_id:fumigation_id,fumi_no:fumigation_no,fumi_date:fumi_date,warehouse_name:warehouse_name,stack:stack,company:this.company,
        finyear:this.finyear,username:this.username,action:action,stack_open_date:stack_open_date,allocate_status:allocate_status,
        pcmw_sign_name:pcmw_sign_name,supervisor_sign_name:supervisor_sign_name,lab_sign_name:lab_sign_name,manpower:manpower,degassing_date:degassing_date,degassing_time:degassing_time,wheat_fumi_qc:wheat_fumi_qc};
       const dialogRef = this.dialog.open(UpdateFumiOpenDatePopUpComponent, dialogConfig);
       dialogRef.afterClosed().subscribe(data => {
        if(data==="Yes")
        {
          this.toast.success("Stack status changed successfully!","Well Done");
          this.onSearch();
          this.status = true;
        }
       });

      /*this.status = false;
      this.dropDownListService
        .updateWheatFumiDetails(
          id,
          fumigation_id,
          this.currentDate,
          this.company,
          this.finyear,
          this.username,
          action
        )
        .subscribe({
          next: (data) => {
            alert("Stack status changed  successfully!");
            this.onSearch();
            this.status = true;
          },
          error: (err) => {
            console.error(err);
            this.status = true;
          },
        });*/
  }
}
