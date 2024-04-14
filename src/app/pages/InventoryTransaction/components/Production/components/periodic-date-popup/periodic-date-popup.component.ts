import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import * as moment from 'moment';
import { PeriodicDatePopup, periodic_date_details } from '../../../../../../Models/ProductionModel/periodic-date-popup';
import { DatePipe } from '@angular/common';
import { Master } from '../../../../../../service/master.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
@Component({
  selector: 'app-periodic-date-popup',
  templateUrl: './periodic-date-popup.component.html',
  styleUrls: ['./periodic-date-popup.component.scss']
})
export class PeriodicDatePopupComponent implements OnInit 
{
  public userForm1:FormGroup;
  check:any;
  dateArray: any =[];
  ShiftArray: any =[];

  Rowindex:any;
  currentDate:any;
  StopDate:any;
  BUunit:any;
  Sfloor:any;
  shop_floor_sl_no = 0; 
  Process:any;
  company_name:any;
  StartDate:any;
  Days:any;
  updt1:any;
  ProcessPeriod:number;
  Rowlength:number;
  process_id:any;
  process_freq:any;
  perd_day:number;
  Con_value:any;
  _Production:any;
  Prod_P_Id:any;
  status = false;
  Ppd_Id:any;
  Id:any;
  From_Date:any;
  processmaintenance:boolean=true;
  disabledcheck: any =[];

  private datePipe: DatePipe
  constructor( private fb: FormBuilder, private Service : Master,
    private DropDownListService: DropdownServiceService,
   
    private dialogRef: MatDialogRef<PeriodicDatePopupComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.status = false;

      this.userForm1=fb.group
      ({
        popupstatus:[''],

        periodic_date_details: this.fb.array([this.fb.group({
          checkbox: '',
          sl_no:this.shop_floor_sl_no,
          fromdate: '',
          todate: '',
          shift: '',
          shift1:''
         // shift1:'',
          //disable:'0'
          })]),
        });

      this.status = false;
      this.Rowindex = data.index;
      this.StartDate = data.StartDate;
      this.StopDate = data.StopDate;
      this.updt1 = data.updt;
      this.Ppd_Id = data.Ppd_Id;
    
     
      //For update Purpose...
      this.Con_value = data.Con_value;
      this.Id =data.Id;
      this.Prod_P_Id = data.Prod_P_Id
      //end

      this.BUunit = data.BUunit;
      this.Sfloor = data.Shoop_Floor;
      this.Process = data.Process;
      this._Production = data._Production
      this.company_name = data.company_name;
      
      let a = moment(this.StartDate);
      let b = moment(this.StopDate);
      
      this.Days = b.diff(a, 'days');
      this.currentDate = moment(this.StartDate);
       
      this.StopDate = moment(this.StopDate);
      while (this.currentDate <= this.StopDate)
      {
        this.dateArray.push( moment(this.currentDate).format('DD-MM-YYYY') )
        this.currentDate = moment(this.currentDate).add(1, 'days');
      }

      forkJoin
      (
        this.DropDownListService.getProcessShift(this.Process),
        this.DropDownListService.getProcessThruBUSFProDesc("bunit="+this.BUunit+"&sfloor="+this.Sfloor+"&pdesc="+this.Process+"&company="+this.company_name)
      ).subscribe(([ProcessShift,data])=>
      {
           this.ShiftArray = ProcessShift;
           console.log("ProcessShift::  "+JSON.stringify(ProcessShift));
           if(data["process_mntnce"]=="No")
           {
            this.processmaintenance=false;
           }
           this.process_freq = data["process_freq"];
           this.perd_day= data["perd_day"];
           this.process_id = data["process_id"];
           this.periodic_date_details.removeAt(0);


            if(this.process_freq=="Periodic")
            {
                this.Rowlength = this.Days / this.perd_day; 
                for(let i=0;i<this.Rowlength;i++)
                {
                  this.add();
                  this.disabledcheck[i]=false;
                }
            }
            if(this.process_freq=="Daily")
            {
              this.Rowlength=this.Days;
              for(let i=0;i<this.dateArray.length;i++)
              {
                this.add();
                this.periodic_date_details.at(i).patchValue({fromdate:this.dateArray[i]});
                this.disabledcheck[i]=false;
              }
            }
          
            this.status = true;
            if(this.updt1 !="insert")
            {
              if(this.processmaintenance==false)
              {
                this.Service.getProdPlanPerDateDtlsShiftNo(this.Prod_P_Id,this.Ppd_Id).subscribe(shiftNo=>
                {
                  for(let data of shiftNo)
                  {
                    this.periodic_date_details.patchValue(shiftNo);
                  }
                });
              }
                  forkJoin(
                    this.Service.getProdPlanPerDateDtls(this.Prod_P_Id,this.Ppd_Id)
                    ).subscribe(([ProPlanData])=>
                    {  
                     
                      this.periodic_date_details.patchValue(ProPlanData); 
                      if(this.process_freq=="Daily")
                      {
                          let i=0;
                          //here start 
                          for(let data of ProPlanData)
                          {
                                this.onChangeDailyupdate(data["checkbox"],data["fromdate"],i);
                                i++;
                          }
                      }
                      else
                      {
                          let j=0;
                          for(let data of ProPlanData)
                          {
                                if(data["fromdate"]!="00-00-0000")
                                {
                                  console.log("fromdate "+ data["fromdate"] + " || "+this.Process + " || " + j)
                                  this.onchangeShift(data["fromdate"],this.Process,j);
                                }
                                j++;
                          }
                      }
                        this.status = true; 
                    });   
            }
      });    
     
    }


    
  

    get periodic_date_details(){{ return this.userForm1.get('periodic_date_details') as FormArray;}}

    add()
    {
      this.shop_floor_sl_no =this.shop_floor_sl_no +1;
      this.periodic_date_details.push(this.fb.group({
        checkbox: '',
        sl_no:this.shop_floor_sl_no,	
        fromdate: '',
        todate: '',
        shift:'',
        shift1:''
      //  shift1:'',
       // disable:'0'
       }));
    }


    ShiftJsonData:any=[];
 
    Start_Date:any;
    End_Date:any;
    rowenddate:any;
    selected_days:any=[];
     c:any=[];
     d:any=[];
     Status:any;

    onChangeStartDate(event, index)
      {
        let x1:string=event;
        
       this.Status ="EXIST";

        this.DropDownListService.getProdPlanShiftStatus("process="+ this.Process+"&shopfl="+ this.Sfloor+"&sdate="+ x1).subscribe(data=>
          {
            this.Status=data["status"];
            // alert(this.Status);
            if(this.Status=="NOTEXIST")
              {

                let x:string=event;
                let result=x.split("-");
               /// this.ShiftArray1 = null;
                let date: Date = new Date(result[2]+"-"+result[1]+"-"+result[0]); 
                let date1: Date = new Date(result[2]+"-"+result[1]+"-"+result[0]); 
                let maxDateof= this.maxDateCalculate(result[2]+"-"+result[1]+"-"+result[0]);
             // alert(moment(date).format('YYYY-MM-DD')+ "fchh "+moment(maxDateof).toDate());
                //alert(date+ "fchh "+maxDateof);
               //checking wheather the selected vdate is greater from previously selected max date... 
               if(date > maxDateof)
                {
                    let DateDiff = this.perd_day;
                     this.Start_Date=moment(date).format('DD-MM-YYYY');
                    //1.calculating the days from current selected date as per periodic days and added on the selected date
                     while (DateDiff > 1) {
                    date = moment(date).add(1, 'days').toDate();
                      DateDiff--;
                      }
                    // 1. end
                    this.End_Date=moment(date).format('DD-MM-YYYY');
                    this.rowenddate=this.StopDate;
        
                   // alert(date+","+this.End_Date +","+ this.rowenddate.format('DD-MM-YYYY')+","+this.StopDate.toDate())
                    //this is a simple validation to check max selectionn date.. 
                   // alert(date1+ "fchh "+this.StopDate.toDate());
                    if(date1 > this.StopDate.toDate())
                    {
                      alert("Please select 'Start Date' between date period beacuse your periodic day is: "+this.perd_day);
                      this.periodic_date_details.at(index).patchValue({fromdate:'',todate:''});
                    }
                    else
                    {
                      this.periodic_date_details.at(index).patchValue({todate:this.End_Date});
                   
                      this.ShiftArray = null;


                      this.status = false;
                      forkJoin(
                        this.DropDownListService.getProcessShiftThruDate(this.Process,event),
                        this.DropDownListService.getProdPlanShifts("process="+ this.Process+"&shopfl="+ this.Sfloor+"&startdate="+ x+"&enddate="+this.End_Date)
                       
                      ).subscribe(([ShiftThruDate, ProdShift])=>
                        {
                          this.ShiftArray = ShiftThruDate;
                          console.log(" ShiftThruDate : "+ JSON.stringify(ShiftThruDate));
          
                          console.log(" ProdShift : "+ JSON.stringify(ProdShift));
                          this.ShiftJsonData = ProdShift;
                          let a:any= this.ShiftArray;
                          let b:any =ProdShift;
                         this.c[index]= a.filter(item => !b.some(other => item.shiftno === other.shiftno));
                         if(this.c[index].length<1)
                          {
                            alert("No Shifts are available in this time slot");
                            this.periodic_date_details.at(index).patchValue({fromdate:'',todate:''});

                          }
                         
                          console.log("got: "+this.c+"  ,  "+JSON.stringify(this.c));
                          
                          this.status=true;
                        });


                    // this.DropDownListService.getProcessShiftThruDate(this.Process,event).subscribe(data=>{this.ShiftArray = data;
                    //   console.log("ShiftArray : "+ JSON.stringify(this.ShiftArray)); 
                    // }); 
        
                    // this.DropDownListService.getProdPlanShifts("process="+ this.Process+"&shopfl="+ this.Sfloor+"&startdate="+ x+"&enddate="+this.End_Date).subscribe(data=>
                    //   {
                      
        
                    //     this.ShiftJsonData = data;
                    //     console.log(" pre ShiftJsonData : "+ JSON.stringify(data));
        
                    //     let a:any= this.ShiftArray;
                    //     let b:any =data;
                    //    this.c= a.filter(item => !b.some(other => item.shiftno === other.shiftno));
                    //     console.log("got: "+this.c+"  ,  "+JSON.stringify(this.c));
                    //   });  
                      //let intersection = arrA.filter(x => arrB.includes(x));
                    }
                }
                else
                {
                  alert("oops this is invalid date...Please select maximum date of 'End Date' !!!");
                  this.periodic_date_details.at(index).patchValue({fromdate:'',todate:''});
                }


              }
             else {alert("This Date is Already Booked");this.periodic_date_details.at(index).patchValue({fromdate:''}); }
          });
        }
      
      //this.selecteddate = this.periodic_date_details.at(index).get('todate').value as FormControl; 
       //alert(this.End_Date+ "perd_day "+DateDiff+ "index "+index);
    
      maxDateCalculate(MinDate:any)
      {
       this.selected_days.length=this.periodic_date_details.length;
        for(let i=0;i<this.periodic_date_details.length;i++)
        {
          let date_format: any=null;
        
          date_format=this.periodic_date_details.at(i).get('todate').value;//getting each row value of end date
          let dates: any=null;
          let redate=null;
        //  alert("total dates: "+date_format)
          if(date_format ==null || date_format=='' || date_format=='00-00-0000')
          {         
           
              dates  = new Date(MinDate); 
             // alert("for first row.."+dates);
              dates=dates.getDate()-1;
              this.selected_days[i]= dates; 
             // dates = moment(dates).subtract (1, 'days').toDate();
              // decrease the day by 1
         //  alert("if dates: "+dates);
          }
          else
          {
           //alert(date_format);
           // getting the actual end date of array
           let result=date_format.split("-");
           let date: Date = new Date(result[2]+"-"+result[1]+"-"+result[0]);
          // alert("else dates: "+date); 
           this.selected_days[i]= date; 
          }
         // alert( dates);
        }
        //calculate max date of the array
        let maxDate = new Date(Math.max.apply(null,this.selected_days));
      //alert(this.selected_days.length+","+maxDate );
       return maxDate;
      
      }
      isChecked: boolean = false;
      //isChecked = false;
      FromDate:any;
      onChangeDaily(event, index)
      {
        if(event.checked)
          {   
            console.log("inserted "+this.updt1)
            if(this.updt1 !="insert")
            {
              this.FromDate = this.periodic_date_details.at(index).get("fromdate").value;
              this.isChecked = true;
             console.log("yes:"+this.processmaintenance+"//"+event.checked + " || " +  index)
            if(this.processmaintenance==false)
            {
                this.periodic_date_details.at(index).patchValue({shift:"1-"+this.FromDate+" 00:00-"+this.FromDate+" 23:59"});
                this.status=true;
            }
            else
              {
                this.status = false;
                let checkexist:boolean=false;
                for(let i=0;i<this.periodic_date_details.length;i++)
                {
                      if(this.periodic_date_details.at(i).get("shift1").value !="")
                      {
                        checkexist=true;
                      }
                }
                console.log("checkexist : "+checkexist)
                forkJoin(
                  //this.DropDownListService.getProcessShift(this.Process),
                  this.DropDownListService.getProcessShiftThruDate(this.Process,this.FromDate),  
                  this.DropDownListService.getProdPlanShiftsFrom("process="+ this.Process+"&shopfl="+ this.Sfloor+"&startdate="+ this.FromDate),
                    
                ).subscribe(([ProcessShift, ProdPlanShiftFrom])=>
                  {
                    this.ShiftArray = ProcessShift;
                    console.log(" shifts "+ JSON.stringify(ProcessShift))
    
                    this.ShiftJsonData = ProdPlanShiftFrom;
                    console.log(" ProdPlanShiftFrom : "+ JSON.stringify(ProdPlanShiftFrom));
                    if(checkexist == true)
                    {
                      let a:any= this.ShiftArray;
                      let b:any =ProdPlanShiftFrom;      
                      this.d[index]= a.filter(item => b.some(other =>item.shiftno === other.shiftno));
                    }
                    else
                    {
                       let a:any= this.ShiftArray;
                      let b:any =ProdPlanShiftFrom;      
                      this.d[index]= a.filter(item => !b.some(other =>item.shiftno === other.shiftno));
                      
                    }
                   
                  
                   console.log("got: "+this.d+"  ||  "+JSON.stringify(this.d) + " || " + JSON.stringify(this.d[index]));
    
                    if(this.d[index].length<1)
                      {
                        this.periodic_date_details.at(index).patchValue({checkbox:false});
                        //this.isChecked = false;
    
                      }
                    this.status=true;
                  });
              }
              
            }
            else
            {
              this.FromDate = this.periodic_date_details.at(index).get("fromdate").value;
              this.isChecked = true;
             // console.log(event.checked + " || " +  index)
              if(this.processmaintenance==false)
              {
                //1-13-01-2023 00:00-13-01-2023 23:59
                //let shift="1-"+this.FromDate+" 00:00-"+this.FromDate+" 23:59";
                this.periodic_date_details.at(index).patchValue({shift:"1-"+this.FromDate+" 00:00-"+this.FromDate+" 23:59"});
              }
              else
              {
                this.status = false;
                forkJoin(
                  //this.DropDownListService.getProcessShift(this.Process),
                  this.DropDownListService.getProcessShiftThruDate(this.Process,this.FromDate),  
                  this.DropDownListService.getProdPlanShiftsFrom("process="+ this.Process+"&shopfl="+ this.Sfloor+"&startdate="+ this.FromDate),
                    
                ).subscribe(([ProcessShift, ProdPlanShiftFrom])=>
                  {
                    this.ShiftArray = ProcessShift;
                    console.log(" shifts "+ JSON.stringify(ProcessShift))
    
                    this.ShiftJsonData = ProdPlanShiftFrom;
                    console.log(" ProdPlanShiftFrom : "+ JSON.stringify(ProdPlanShiftFrom));
    
                    let a:any= this.ShiftArray;
                    let b:any =ProdPlanShiftFrom;      
                    this.d[index]= a.filter(item => !b.some(other =>item.shiftno === other.shiftno));
                   
                    //console.log("got: "+this.d+"  ||  "+JSON.stringify(this.d) + " || " + JSON.stringify(this.d[index]));
    
                    if(this.d[index].length<1)
                      {
                        this.periodic_date_details.at(index).patchValue({checkbox:false});
                        //this.isChecked = false;
                      }
                    this.status=true;
                  });
              }
            }
          }
          else
            {
              this.periodic_date_details.at(index).patchValue({shift:''});   
                this.d[index]=[];
            }
      }

      onchangeShift(Startdate,Process,index)
      {
        forkJoin(
          this.DropDownListService.getProcessShiftThruDate(Process,Startdate),        
         
        ).subscribe(([ShiftThruDate])=>
          {
            this.c[index] = ShiftThruDate;
          }); 

      }

      onChangeDaily1(check,FromDate1, index)
      { 
            this.DropDownListService.getProdPlanShiftsFrom("process="+ this.Process+"&shopfl="+ this.Sfloor+"&startdate="+ FromDate1).subscribe(data=>
              {
                console.log("ShiftArray : "+ JSON.stringify(this.ShiftArray)); 

                this.ShiftJsonData = data;
                console.log(" pre ShiftJsonData : "+ JSON.stringify(data));

                let a:any= this.ShiftArray;
                let b:any =data;      
               this.d= a.filter(item => !b.some(other => item.shiftno === other.shiftno));
                console.log("got: "+this.d+"  ,  "+JSON.stringify(this.d));

               
              }); 

          
          
      }

      onChangeDailyupdate(check,FromDate1, index)
      {
       // console.log("check "+check)
        if(check == true)
        {
          this.disabledcheck[index]=true;
        }
        else
        {
          this.disabledcheck[index]=false;
        }
            forkJoin(            
            this.DropDownListService.getProcessShiftThruDate(this.Process,FromDate1),
            this.DropDownListService.getProdPlanShiftsFrom("process="+ this.Process+"&shopfl="+ this.Sfloor+"&startdate="+ FromDate1)
            ) .subscribe(([ProcessShift,data])=>
              {
                this.ShiftArray=ProcessShift;
               // console.log("ShiftArray : "+ JSON.stringify(this.ShiftArray)); 

                this.ShiftJsonData = data;
               // console.log(" pre ShiftJsonData : "+ JSON.stringify(data));

                let a:any= this.ShiftArray;
                let b:any =data;
                 
                this.d[index]=a.filter(item => !b.some(other => item.shiftno === other.shiftno)) ;
                console.log("got: "+this.d.length+"  ,  "+JSON.stringify(this.d) + " || "+this.d[0] );

                 
              }); 

          
          
      }

    // Start_Date:any;
    // End_Date:any;
    // rowenddate:any;
    // selected_days:any=[];
    // onChangeStartDate(event, index)
    //   {

     
    //     let x:string=event;
        
    //     let result=x.split("-");
       
    //     let date: Date = new Date(result[2]+"-"+result[1]+"-"+result[0]); 
    //     let maxDateof= this.maxDateCalculate(result[2]+"-"+result[1]+"-"+result[0]);
    //    //alert(moment(date).format('YYYY-MM-DD')+ "fchh "+moment(maxDateof).format('YYYY-MM-DD'));
    //    //checking wheather the selected vdate is greater from previously selected max date... 
    //  //  alert(date+","+maxDateof);
    //    if(moment(date).format('YYYY-MM-DD') > moment(maxDateof).format('YYYY-MM-DD'))
    //     {
    //         let DateDiff = this.perd_day;
    //          this.Start_Date=moment(date).format('DD-MM-YYYY');
    //         //1.calculating the days from current selected date as per periodic days and added on the selected date
    //          while (DateDiff > 1) {
    //         date = moment(date).add(1, 'days').toDate();
    //           DateDiff--;
    //           }
    //         // 1. end
    //         this.End_Date=moment(date).format('DD-MM-YYYY');
    //         this.rowenddate=this.StopDate;
    //        // alert(this.End_Date +","+ this.rowenddate.format('DD-MM-YYYY'))
    //         //this is a simple validation to check max selectionn date.. 
    //         if(this.End_Date > this.rowenddate.format('DD-MM-YYYY'))
    //         {
    //           alert("Please select 'Start Date' between date period beacuse your periodic day is: "+this.perd_day);
    //           this.periodic_date_details.at(index).patchValue({fromdate:'',todate:''});
    //         }
    //         else
    //         {
    //           this.periodic_date_details.at(index).patchValue({todate:this.End_Date});
            
            
    //         }
    //     }
    //     else
    //     {
    //       //alert("oops this is invalid date...Please select maximum date of 'End Date' !!!");
    //       this.periodic_date_details.at(index).patchValue({fromdate:'',todate:''});
    //     }
       
    //   }

      
      //this.selecteddate = this.periodic_date_details.at(index).get('todate').value as FormControl; 
       //alert(this.End_Date+ "perd_day "+DateDiff+ "index "+index);
    
      // maxDateCalculate(MinDate:any)
      // {
      //   for(let i=0;i<this.periodic_date_details.length;i++)
      //   {
      //     let date_format: any=null;
      //     date_format=this.periodic_date_details.at(i).get('todate').value as FormControl;//getting each row value of end date
       
      //     let dates: any=null;
      //     let redate=null;
      //     if(date_format ==null || date_format=='')
      //     {
           
      //       dates  = new Date(MinDate); 
      //       dates=moment(dates).format('YYYY-MM-DD');
      //           if(this.selected_days.length == 0)// if no row is selected
      //           {
      //             dates = moment(dates).subtract (1, 'days').toDate();// decrease the day by 1
      //           }
      //           else{
      //             dates=this.selected_days[0];//for rest of the balnk row setting 1st value of existing array..
      //           }
            
      //       this.selected_days[i]= dates; 
      //      // alert(dates);
      //     }
      //     else
      //     {
      //      // let datee=date_format.toString;
      //    //  alert(date_format);
      //      dates=moment(date_format).format('YYYY-DD-MM');// getting the actual end date of array
      //      this.selected_days[i]= dates; 
      //     // alert(dates);
      //     }
      //    // alert( this.selected_days[i]);
      //   }
      //   let moments = this.selected_days.map(d => moment(d)),
      //  maxDate = moment.max(moments);//calculate max date of the array
      // // alert(maxDate );
      //  return maxDate;
      
      // }


  
    SendDataToDifferentComponenet()
    {
//alert();
this.userForm1.patchValue({popupstatus:'saving'});

        for(let i=0;i< this.periodic_date_details.length;i++)
        {
          this.periodic_date_details.at(i).patchValue({ shift1: this.periodic_date_details.at(i).get('shift').value.toString()  });
          delete this.userForm1.value.periodic_date_details[i].shift;
          
          
        }  
       
    //  this.userForm1.patchValue(this.periodic_date_details.value);
    
      //console.log("Userform : "+JSON.stringify(this.userForm1.value));
      //this.userForm1.patchValue({prod_process:this.procs.toString()});
      this.dialogRef.close(this.userForm1.value);
    }

    ShiftVal:any;
    ShiftVal1:any;
  ngOnInit() {
   
    
   
        this.status = true;
      
   
  }


  selectallnew(event)
  {
    
           for(let i=0;i<this.periodic_date_details.length;i++)
           {
            this.onChangeDaily(event,i);
            if(event.checked)
            {
              this.periodic_date_details.at(i).patchValue({checkbox:true})
            }
            else
            {
              this.periodic_date_details.at(i).patchValue({checkbox:false})
            }
            
           }
    
    

  }

}