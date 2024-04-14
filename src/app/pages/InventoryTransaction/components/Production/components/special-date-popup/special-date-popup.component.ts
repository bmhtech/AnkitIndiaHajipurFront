import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import * as moment from 'moment';
import { SpecialDatePopup, Special_date_details } from '../../../../../../Models/ProductionModel/special-date-popup';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-special-date-popup',
  templateUrl: './special-date-popup.component.html',
  styleUrls: ['./special-date-popup.component.scss']
})
export class SpecialDatePopupComponent implements OnInit {
  public userForm1:FormGroup;
  check:any;
  dateArray: any =[];
  special_shop_floor_sl_no = 0; 
  //ShiftArray: any =[];
  Rowindex:any;
  currentDate:any;
  Con_value:any;
  Prod_P_Id:any;
  Id:any;
  StopDate:any;
  BUunit:any;
  Sfloor:any;
  Process:any;
  company_name:any;
  StartDate:any;
  Days:any;
  ProcessPeriod:number;
  Rowlength:number;
  process_id:any;
  process_freq:any;
  perd_day:number;
  status = false;
  updt1:any;
  Pps_Id:any;

  private datePipe: DatePipe
  constructor( private fb: FormBuilder,private Service : Master,
    private DropDownListService: DropdownServiceService,
   
    private dialogRef: MatDialogRef<SpecialDatePopupComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.status = false;

      this.userForm1=fb.group
      ({
        popupstatus:[''],

        special_date_details: this.fb.array([this.fb.group({
          checkbox: '',
          sl_no:this.special_shop_floor_sl_no,	
          fromdate: '',
          })]),
        });

      this.status = false;
      this.Rowindex = data.index;
      this.StartDate = data.StartDate;
      this.StopDate = data.StopDate;
      this.updt1 = data.updt;
      this.Pps_Id = data.Pps_Id;

      
      //For update Purpose...
      this.Con_value = data.Con_value;
      this.Id =data.Id;
      this.Prod_P_Id = data.Prod_P_Id
      //end

      this.BUunit = data.BUunit;
      this.Sfloor = data.Shoop_Floor;
      this.Process = data.Process;
      this.company_name = data.company_name;
      //alert("inside popup"+this.BUunit+','+this.Sfloor+','+this.Process+','+this.company_name);
   // this.ProcessPeriod = data.ProcessPeriod;
      let a = moment(this.StartDate);
      let b = moment(this.StopDate);
      console.log(a +','+b);
       this.Days = b.diff(a, 'days');
       this.currentDate = moment(this.StartDate);
       
       this.StopDate = moment(this.StopDate);
       while (this.currentDate <= this.StopDate) {
           this.dateArray.push( moment(this.currentDate).format('DD-MM-YYYY') )
          this.currentDate = moment(this.currentDate).add(1, 'days');
       }
      
       //alert(this.Days +','+this.ProcessPeriod+","+this.Rowlength);
     
       this.DropDownListService.getProcessThruBUSFProDesc("bunit="+this.BUunit+"&sfloor="+this.Sfloor+"&pdesc="+this.Process+"&company="+this.company_name).subscribe(data=>
         {
           console.log(JSON.stringify(data));
           this.process_freq = data["process_freq"];
           this.perd_day= data["perd_day"];
           this.process_id = data["process_id"]
          // alert(data["process_freq"]+','+ data["perd_day"]);
          //alert( this.process_freq+','+ this.perd_day);
           this.special_date_details.removeAt(0);
         
        this.Rowlength=this.Days;
        //alert("Daily: "+this.Rowlength+','+this.Days);
        for(let i=0;i<this.dateArray.length;i++)
        {
          this.add();
          this.special_date_details.at(i).patchValue({fromdate:this.dateArray[i]});
    
      }
          
         });    
         this.status = true;

         if(this.updt1 !="insert")
         {
         forkJoin(
          this.Service.getProdPlanSplDateDtls(this.Prod_P_Id, this.Pps_Id),          
        ).subscribe(([ProPlanData])=>
          {  
           this.special_date_details.patchValue(ProPlanData); 
               this.status = true; 
           });  
          }
    }
  

    get special_date_details(){{ return this.userForm1.get('special_date_details') as FormArray;}}

    add()
    {
      this.special_shop_floor_sl_no =this.special_shop_floor_sl_no +1;
      this.special_date_details.push(this.fb.group({
        checkbox: '',
        sl_no:this.special_shop_floor_sl_no,	
        fromdate: '',
       }));
    }
    Start_Date:any;
    End_Date:any;
    rowenddate:any;
    selected_days:any=[];
  
    SendDataToDifferentComponenet()
    {
      this.userForm1.patchValue({popupstatus:'saving'});
      this.userForm1.patchValue(this.special_date_details.value);
      //this.userForm1.patchValue({prod_process:this.procs.toString()});
      this.dialogRef.close(this.userForm1.getRawValue());
    } 

  ngOnInit() {
   // alert(this.process_freq)  
    this.status = true;
  }

}