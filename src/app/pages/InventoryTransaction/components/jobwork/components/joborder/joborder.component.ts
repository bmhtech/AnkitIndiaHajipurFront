import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { JobOrder } from '../../../../../../Models/JobWork/job-order';
import { DropdownServiceService } from '../../../../../../../../src/app/service/dropdown-service.service';
import { Master } from '../../../../../../../../src/app/service/master.service';

@Component({
  selector: 'app-joborder',
  templateUrl: './joborder.component.html',
  styleUrls: ['./joborder.component.scss']
})
export class JoborderComponent implements OnInit {
  model: JobOrder = new JobOrder();
  public userForm:FormGroup;
  businesslists:any=[];
  company_name:any;
  seq_no:string;
  finYear:any;


  constructor(public fb:FormBuilder,private Service: Master, 
              private DropDownListService: DropdownServiceService) 
  { 
    this.userForm=fb.group(
      {
        business_unit:[''],
        order_no:['']
      });

  }
      get business_unit(){ return this.userForm.get("business_unit") as FormControl}
      get order_no(){ return this.userForm.get("order_no") as FormControl}

  ngOnInit() 
  {
    this.company_name = localStorage.getItem("company_name");
    this.finYear = localStorage.getItem("financial_year");

    this.DropDownListService.getcompanyBUMNCListFastApi(this.company_name)
    .subscribe(data=>
      {
        this.businesslists  = data;
      },(error) => {console.log("ERROR get: "+JSON.stringify(error));
      alert("something error is occured please try again....");
      this.ngOnInit()});

      this.DropDownListService.getOSequenceId(this.finYear)
      .subscribe(data=>{
        this.seq_no = data.sequenceid;
      }, 
      (error) => {console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()});
  }


}
