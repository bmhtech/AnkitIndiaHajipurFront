import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { solarpowergenerationwithpowercut } from '../../../../../../Models/Report/solarpowergenerationwithpowercut';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../../service/excel.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-solarpowergenerationwithpowercut',
  templateUrl: './solarpowergenerationwithpowercut.component.html',
  styleUrls: ['./solarpowergenerationwithpowercut.component.scss']
})
export class SolarpowergenerationwithpowercutComponent implements OnInit {
  public userForm:FormGroup;
  model: solarpowergenerationwithpowercut = new solarpowergenerationwithpowercut();
  powerlist:any=[];
  businesslists:any=[];
  isHidden=false;
  status = false;
  Id:any;
  company_name:any;
  BuUnit:any;
  solarpowercutsave:boolean=true;
  sl_no:number=1;

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService,private excelService:ExcelService)
   { 
    this.userForm=fb.group({
      id:[''],
      solar_powercut_id:[''],
      b_unit:[''],
      b_unit_name:[''],
      solar_date:[''],
      generation:[''],
      weather_condition:[''],
      company_id:[''],
      fin_year:[''],
      username:[''],

      solar_power_generation_with_powercut_dtls: this.fb.array([this.fb.group({
        slno:this.sl_no,
        solar_powercut_id:'',
        from_time:'',
        to_time:'',
        total_time:'',
        power_triping:''
      })])
    });
   }

   get id(){ return this.userForm.get("id") as FormControl }
   get b_unit(){ return this.userForm.get("b_unit") as FormControl }
   get solar_powercut_id(){ return this.userForm.get("solar_powercut_id") as FormControl }
   get b_unit_name(){ return this.userForm.get("b_unit_name") as FormControl }
   get solar_date(){ return this.userForm.get("solar_date") as FormControl }
   get generation(){ return this.userForm.get("generation") as FormControl }
   get weather_condition(){ return this.userForm.get("weather_condition") as FormControl }
   get company_id(){ return this.userForm.get("company_id") as FormControl }
   get fin_year(){ return this.userForm.get("fin_year") as FormControl }
   get username(){ return this.userForm.get("username") as FormControl }

   get solar_power_generation_with_powercut_dtls(){return this.userForm.get("solar_power_generation_with_powercut_dtls") as FormArray};

  ngOnInit() {
    this.isHidden=false;
    this.sl_no=1;
    this.solarpowercutsave=true;
    this.company_name = localStorage.getItem("company_name");
    forkJoin(
      this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
      this.DropDownListService.solarPowerGenerationWithPowerCutList(this.company_name)
      ).subscribe(([bUnitData,solaerdata])=>
      { 
        this.businesslists=bUnitData;
        this.BuUnit = 'CBU00001';
        this.powerlist=solaerdata;
      });
      this.status=true;
  }

  showList(s:string)
  {
    if(s=="add")
    {
      this.isHidden=true;
      this.solarpowercutsave=true;
      this.ResetAllValues();
    }
    if(s=="list")
    {
      this.isHidden=false;
      this.userForm.reset();
      this.ResetAllValues();
      this.BuUnit = 'CBU00001';
      this.sl_no=1;
    }
  }
  ResetAllValues()
  {
    return this.userForm=this.fb.group({
    id:[''],
    solar_powercut_id:[''],
    b_unit:[''],
    b_unit_name:[''],
    solar_date:[''],
    generation:[''],
    weather_condition:[''],
    company_id:[''],
    fin_year:[''],
    username:[''],

    solar_power_generation_with_powercut_dtls: this.fb.array([this.fb.group({
      slno:this.sl_no,
      solar_powercut_id:'',
      from_time:'',
      to_time:'',
      total_time:'',
      power_triping:''
      })])
    });
  }

  addTime()
  {
   this.sl_no =this.solar_power_generation_with_powercut_dtls.length +1; 
    this.solar_power_generation_with_powercut_dtls.push(this.fb.group({
      slno:this.sl_no,
      solar_powercut_id:'',
      from_time:'',
      to_time:'',
      total_time:'',
      power_triping:''
    }))
  }

  delete(index) 
  {
    if(this.sl_no>1)
    { 
      this.solar_power_generation_with_powercut_dtls.removeAt(index);
      this.sl_no = this.sl_no - 1;
    }
    else
    {
      this.sl_no = 1;
      alert("can't delete all rows");
      this.solar_power_generation_with_powercut_dtls.reset();
      this.solar_power_generation_with_powercut_dtls.at(0).patchValue({slno:  this.sl_no});
    } 
    
    for(let i=1; i<=this.sl_no; i++)
      this.solar_power_generation_with_powercut_dtls.at(i-1).patchValue({slno: i});     
   }

  onChangeDate(event)
  {
    this.DropDownListService.checkSolarPowerCut(event).subscribe(checkSolar=> 
      {
       //alert(checkSolar.status)
       if(checkSolar.status=='NO')
       {
        this.DropDownListService.getAllSolarData(event).subscribe(data=>
          {
            //console.log("data:"+JSON.stringify(data))
            this.userForm.patchValue({generation:data[0]["total"],weather_condition:data[0]["remarks"]});
          }); 
        }
        else{
          this.userForm.patchValue({solar_date:''});
          alert("This Date is Already Used,Take Another Date..!! ");
          }
        });
  }

  fromTime(index)
  {
    if(this.userForm.get("solar_date").value == '' || this.userForm.get("solar_date").value == 0 || this.userForm.get("solar_date").value == null)
      {
        alert("Please Enter Date!")
        this.status=true;
      }
      else{
        let firsttime = this.userForm.get("solar_date").value +" " +  this.solar_power_generation_with_powercut_dtls.at(index).get("from_time").value ;
        let secondtime = this.userForm.get("solar_date").value +" " + this.solar_power_generation_with_powercut_dtls.at(index).get("to_time").value;
   
         let date1 = new Date(firsttime);
         let date2 = new Date(secondtime);
         
         let date_diff = Number(date2.getTime() - date1.getTime());
         let diffHrs = Math.floor((date_diff % 86400000) / 3600000); // hours
         let diffMins = Math.round(((date_diff % 86400000) % 3600000) / 60000);
         let final_output="";
         if(Number(diffHrs)>0)
         {
           final_output+=diffHrs + " hours ";
         }
         if(Number(diffMins)>0)
         {
           final_output+=diffMins +" minutes";
         }
        this.solar_power_generation_with_powercut_dtls.at(index).patchValue({total_time:final_output});
      }
  }

  toTime(index)
  {
    if(this.userForm.get("solar_date").value == '' || this.userForm.get("solar_date").value == 0 || this.userForm.get("solar_date").value == null)
      {
        alert("Please Enter Date!")
        this.status=true;
      }
      else{
            let firsttime = this.userForm.get("solar_date").value +" " + this.solar_power_generation_with_powercut_dtls.at(index).get("from_time").value;
            let secondtime = this.userForm.get("solar_date").value +" " +  this.solar_power_generation_with_powercut_dtls.at(index).get("to_time").value;

            let date1 = new Date(firsttime);
            let date2 = new Date(secondtime);
            let date_diff = Number(date2.getTime() - date1.getTime());
            let diffHrs = Math.floor((date_diff % 86400000) / 3600000); // hours
            let diffMins = Math.round(((date_diff % 86400000) % 3600000) / 60000);
            let final_output="";
                if(Number(diffHrs)>0)
                {
                  final_output+=diffHrs + " hours ";
                }
                if(Number(diffMins)>0)
                {
                  final_output+=diffMins +" minutes";
                }
              this.solar_power_generation_with_powercut_dtls.at(index).patchValue({total_time:final_output});
      }
  }

  send()
  {
    this.Id= this.userForm.get("id").value as FormControl; 
    this.userForm.patchValue({ company_id: localStorage.getItem("company_name"),
      fin_year:localStorage.getItem("financial_year"), 
      username: localStorage.getItem("username")});
      this.status=false;

      if(this.userForm.get("b_unit").value == '' || this.userForm.get("b_unit").value == 0 || this.userForm.get("b_unit").value == null)
      {
        alert("Please Select Bussiness Unit Name!")
        this.status=true;
        }
      else if(this.userForm.get("solar_date").value == '' || this.userForm.get("solar_date").value == 0 || this.userForm.get("solar_date").value == null)
      {
        alert("Please Enter Date!")
        this.status=true;
      }
        else
        {
          if(this.Id>0)
          {
            this.Service.updateSolarPowerCut(this.userForm.getRawValue(), this.Id).subscribe( data => 
              {
                alert("Solar Power Generation With Powercut Updated successfully.");
                this.userForm.reset();
                this.isHidden = false;
                this.showList('list');
                this.ngOnInit();
                this.status=true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Solar Power Generation With Powercut !!! please Reload the page and try again....");
              }); 
          }
          else
          {
            this.Service.createSolarPowerCut(this.userForm.getRawValue())
            .subscribe(data =>
            {
              alert("Solar Power Generation With Powercut Saved successfully.");
              this.userForm.reset();
              this.showList('list');
              this.ngOnInit();
              this.status=true;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured Solar Power Generation With Powercut !!! please Reload the page and try again....");
            });
          }
        }
      
      }

      onDelete(id)
      {
        if(confirm("Are you sure to delete this Solar Power Generation With Powercut From List?"))
        { 
            this.userForm.patchValue({username: localStorage.getItem("username")});
            this.Service.deleteSolarPowerCut(this.userForm.getRawValue(),id).subscribe(data=> 
              {
                alert("Solar Power Generation With Powercut Deleted successfully.");
                this.userForm.reset();
                this.status = true;
                this.ngOnInit();
              });
    
        }
      }
     
      onUpdate(id,action)
      {
        this.isHidden=true;
        if(action == "view")
        {
          this.solarpowercutsave=false;
        }
        if(action == "update")
        {
          this.solarpowercutsave=true;
        }
    
        forkJoin(
          this.DropDownListService.retriveSolarPowerCut(id),
          this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
          ).subscribe(([solar,bUnitData])=>
          {
            this.businesslists=bUnitData;
            this.userForm.patchValue(solar);

            forkJoin(
                this.DropDownListService.retriveSolarPowercutDetails(solar['solar_powercut_id'])
                ).subscribe(([dynamicdetails])=>  
                  {
                    let k=0;
                    this.sl_no = 0;
                    while (this.solar_power_generation_with_powercut_dtls.length) 
                    this.solar_power_generation_with_powercut_dtls.removeAt(0);
                    for(let data1 of dynamicdetails)
                    {   
                      this.addTime();
                     
                      this.solar_power_generation_with_powercut_dtls.patchValue(dynamicdetails);
                      k++;
                    }
                    this.status = true;
                  });
            
          
      
               this.status = true;
           }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in Seives Master,please try again....");
           this.ngOnInit()}); 
      
    
    
      }
}
