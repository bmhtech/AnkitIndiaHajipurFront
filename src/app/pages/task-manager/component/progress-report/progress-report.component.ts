import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../service/dropdown-service.service';
import { Master } from '../../../../service/master.service';
import { ExcelService } from '../../../../service/excel.service';

@Component({
  selector: 'app-progress-report',
  templateUrl: './progress-report.component.html',
  styleUrls: ['./progress-report.component.scss']
})
export class ProgressReportComponent implements OnInit {
  public userForm:FormGroup; 
  progresslist:any = [];
  status = false;

  constructor(public fb:FormBuilder,private Service: Master, private DropDownListService: DropdownServiceService,private excelService:ExcelService)
   {
    this.userForm=fb.group(
      {
        fromdate:[''],
        todate:['']
      });
   }
   get fromdate(){return this.userForm.get("fromdate") as FormControl};
   get todate(){return this.userForm.get("todate") as FormControl};


  ngOnInit() {
    this.status=true;
  }
  search()
  {
    this.status=false;
    let fromdate=this.userForm.get("fromdate").value;
    let todate=this.userForm.get("todate").value;
    if(fromdate=='' || fromdate==null)
    {
      alert("Please Select From Date");
      this.status=true;
    }
    else if(todate=='' || todate==null)
    {
      alert("Please Select To Date");
      this.status=true;
    }
    else
    {
      this.DropDownListService.getTaskProgressReport(fromdate,todate).subscribe(data=>
        {
        console.log(" report  :: "+JSON.stringify(data))
          this.progresslist = data;
          this.status=true;
        }); 
    }
  }

}
