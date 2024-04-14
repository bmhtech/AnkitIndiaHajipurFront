import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Solarpower } from '../../../../../../Models/Report/Solarpower';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { forkJoin } from 'rxjs';
import { formatDate } from '@angular/common';
import { ExcelService } from '../../../../../../service/excel.service';

@Component({
  selector: 'app-solarpowergeneration',
  templateUrl: './solarpowergeneration.component.html',
  styleUrls: ['./solarpowergeneration.component.scss']
})
export class SolarpowergenerationComponent implements OnInit {
  
  model: Solarpower = new Solarpower();
  public userForm:FormGroup;
  public userForm1:FormGroup;
  listsolarpower:any=[];
  bussiness_unit_list:any=[];
  isHidden=false;
  status = false;
  Id:any;
  company_name:any;
  soalrpowergenerationsave:boolean=false;
  no_oneTotal:number=0;
  no_twoTotal:number=0;
  no_threeTotal:number=0;
  no_fourTotal:number=0;
  no_fiveTotal:number=0;
  no_sixTotal:number=0;
  no_sevenTotal:number=0;
  no_eightTotal:number=0;
  no_nineTotal:number=0;
  no_tenTotal:number=0;
  no_elevenTotal:number=0;
  total_Total:number=0;
  headingtop:any;
  currentDate:any;
  noone:any;
  notwo:any;
  nothree:any;
  nofour:any;
  nofive:any;
  nosix:any;
  noseven:any;
  noeight:any;
  nonine:any;
  noten:any;
  noeleven:any;
  Total:any;
  BuUnit:any;
  company:any;

  constructor(public fb:FormBuilder,private DropDownListService: DropdownServiceService,private Service: Master,private excelService:ExcelService)
   {
    this.userForm=fb.group({
      id: [''],
      solar_power_id: [''],
      b_unit: [''],
      solar_date: [''],
      no_one: [''],
      no_two: [''],
      no_three: [''],
      no_four: [''],
      no_five: [''],
      no_six: [''],
      no_seven: [''],
      no_eight: [''],
      no_nine: [''],
      no_ten: [''],
      no_eleven: [''],
      total: [''],
      remarks: [''],
      company_id: [''],
      fin_year: [''],
      username: ['']
    });
    this.userForm1=fb.group(
      {
        business_unit:[''],
        fromdate:[''],
        todate:['']
      });
   }

   get id(){ return this.userForm.get("id") as FormControl }
   get solar_power_id(){ return this.userForm.get("solar_power_id") as FormControl }
   get b_unit(){ return this.userForm.get("b_unit") as FormControl }
   get solar_date(){ return this.userForm.get("solar_date") as FormControl }
   get no_one(){ return this.userForm.get("no_one") as FormControl }
   get no_two(){ return this.userForm.get("no_two") as FormControl }
   get no_three(){ return this.userForm.get("no_three") as FormControl }
   get no_four(){ return this.userForm.get("no_four") as FormControl }
   get no_five(){ return this.userForm.get("no_five") as FormControl }
   get no_six(){ return this.userForm.get("no_six") as FormControl }
   get no_seven(){ return this.userForm.get("no_seve") as FormControl }
   get no_eight(){ return this.userForm.get("no_eight") as FormControl }
   get no_nine(){ return this.userForm.get("no_nine") as FormControl }
   get no_ten(){ return this.userForm.get("no_ten") as FormControl }
   get no_eleven(){ return this.userForm.get("no_eleven") as FormControl }
   get total(){ return this.userForm.get("total") as FormControl }
   get remarks(){ return this.userForm.get("remarks") as FormControl }
   get company_id(){ return this.userForm.get("company_id") as FormControl }
   get fin_year(){ return this.userForm.get("fin_year") as FormControl }
   get username(){ return this.userForm.get("username") as FormControl }

   get business_unit(){ return this.userForm1.get("business_unit") as FormControl }
   get fromdate(){ return this.userForm1.get("fromdate") as FormControl }
   get todate(){ return this.userForm1.get("todate") as FormControl }

  ngOnInit() {
    this.company_name = localStorage.getItem("company_name");
    this.isHidden=false;
    this.soalrpowergenerationsave=true;
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    forkJoin(
      this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
      this.DropDownListService.getSolarPowerGeneration(this.company_name),
      this.DropDownListService.getCompanyDetails(this.company_name)
      ).subscribe(([bUnitData,solaerdata,companydata])=>
      { 
        this.company=companydata.company_name;
        this.bussiness_unit_list=bUnitData;
        this.BuUnit = 'CBU00001';
        this.listsolarpower=solaerdata;

        this.no_oneTotal=0;
        this.no_twoTotal=0;
        this.no_threeTotal=0;
        this.no_fourTotal=0;
        this.no_fiveTotal=0;
        this.no_sixTotal=0;
        this.no_sevenTotal=0;
        this.no_eightTotal=0;
        this.no_nineTotal=0;
        this.no_tenTotal=0;
        this.no_elevenTotal=0;
        this.total_Total=0;

        solaerdata.forEach(element => {
          this.no_oneTotal+=Number(element["no_one"]);
          this.no_twoTotal+=Number(element["no_two"]);
          this.no_threeTotal+=Number(element["no_three"]);
          this.no_fourTotal+=Number(element["no_four"]);
          this.no_fiveTotal+=Number(element["no_five"]);
          this.no_sixTotal+=Number(element["no_six"]);
          this.no_sevenTotal+=Number(element["no_seven"]);
          this.no_eightTotal+=Number(element["no_eight"]);
          this.no_nineTotal+=Number(element["no_nine"]);
          this.no_tenTotal+=Number(element["no_ten"]);
          this.no_elevenTotal+=Number(element["no_eleven"]);
          this.total_Total+=Number(element["total"]);
        });
      });
    this.status=true;
  }

  showList(s:string)
  {
      if(s=="add")
      {     
        this.isHidden=true;
        this.soalrpowergenerationsave=true;
      }
    
    if(s=="list")
    {
      this.isHidden=false;
      this.soalrpowergenerationsave =true;
      this.userForm.reset();
      this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.BuUnit = 'CBU00001';
    }
  }
  getTotal()
  {
    this.noone=this.userForm.get("no_one").value;
    this.notwo=this.userForm.get("no_two").value;
    this.nothree=this.userForm.get("no_three").value;
    this.nofour=this.userForm.get("no_four").value;
    this.nofive=this.userForm.get("no_five").value;
    this.nosix=this.userForm.get("no_six").value;
    this.noseven=this.userForm.get("no_seven").value;
    this.noeight=this.userForm.get("no_eight").value;
    this.nonine=this.userForm.get("no_nine").value;
    this.noten=this.userForm.get("no_ten").value;
    this.noeleven=this.userForm.get("no_eleven").value;
    
    this.Total=(Number(this.noone)+Number(this.notwo)+Number(this.nothree)+Number(this.nofour)+Number(this.nofive)+Number(this.nosix)+Number(this.noseven)+Number(this.noeight)+Number(this.nonine)+Number(this.noten)+Number(this.noeleven)).toFixed(2);
    this.userForm.patchValue({total:this.Total});
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
          alert("Please Enter Date..!")
          this.status=true;
        }
          else
          {
            if(this.Id>0)
            {
              this.Service.updateSolarPowerGeneration(this.userForm.getRawValue(), this.Id).subscribe( data => 
                {
                  alert("Solar Power Generation Updated successfully.");
                  this.userForm.reset();
                  this.isHidden = false;
                  this.showList('list');
                  this.ngOnInit();
                  this.status=true;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in Solar Power Generation !!! please Reload the page and try again....");
                }); 
            }
            else
            {
              this.Service.createSolarPowerGeneration(this.userForm.getRawValue())
              .subscribe(data =>
              {
                alert("Solar Power Generation Saved successfully.");
                this.userForm.reset();
                this.showList('list');
                this.ngOnInit();
                this.status=true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in Solar Power Generation !!! please Reload the page and try again....");
              });
            }
          }
         
        }

        onDelete(id)
        {
          if(confirm("Are you sure to delete this Solar Power Generation From List?"))
          { 
              this.userForm.patchValue({username: localStorage.getItem("username")});
              this.Service.deleteSolarPowerGeneration(this.userForm.getRawValue(),id).subscribe(data=> 
                {
                  alert("Solar Power Generation Deleted successfully.");
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
            this.soalrpowergenerationsave=false;
          }
          if(action == "update")
          {
            this.soalrpowergenerationsave=true;
          }
      
          forkJoin(
            this.DropDownListService.retriveSolarPowerGeneration(id),
            this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
            ).subscribe(([seives,bUnitData])=>
            {
              this.bussiness_unit_list=bUnitData;
              this.userForm.patchValue(seives);
              this.status = true;
             }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in Solar Power Generation,please try again....");
             this.ngOnInit()}); 
        
        }
       
        
        search()
        {
          this.status=false;
          let business_unit= this.userForm1.get("business_unit").value;
          let fromdate=this.userForm1.get("fromdate").value;
          let todate=this.userForm1.get("todate").value;
          if(business_unit == '' || business_unit == null || business_unit == 0)
          {
            alert("Please Select Bussiness Unit Name");
            this.status=true;
          }
          else if(fromdate == '' || fromdate == null || fromdate == 0)
          {
            alert("Please Select From Date");
            this.status=true;
          }
          else if(todate == '' || todate == null || todate == 0)
          {
            alert("Please Select To Date");
            this.status=true;
          }
          else{
            this.DropDownListService.getSolarPorGenReport(business_unit,fromdate,todate).subscribe(data=>
            {
              //console.log(" report1  :: "+JSON.stringify(data))
                this.listsolarpower=data;

                this.no_oneTotal=0;
                this.no_twoTotal=0;
                this.no_threeTotal=0;
                this.no_fourTotal=0;
                this.no_fiveTotal=0;
                this.no_sixTotal=0;
                this.no_sevenTotal=0;
                this.no_eightTotal=0;
                this.no_nineTotal=0;
                this.no_tenTotal=0;
                this.no_elevenTotal=0;
                this.total_Total=0;
                
                data.forEach(element => {
                  this.no_oneTotal+=Number(element["no_one"]);
                  this.no_twoTotal+=Number(element["no_two"]);
                  this.no_threeTotal+=Number(element["no_three"]);
                  this.no_fourTotal+=Number(element["no_four"]);
                  this.no_fiveTotal+=Number(element["no_five"]);
                  this.no_sixTotal+=Number(element["no_six"]);
                  this.no_sevenTotal+=Number(element["no_seven"]);
                  this.no_eightTotal+=Number(element["no_eight"]);
                  this.no_nineTotal+=Number(element["no_nine"]);
                  this.no_tenTotal+=Number(element["no_ten"]);
                  this.no_elevenTotal+=Number(element["no_eleven"]);
                  this.total_Total+=Number(element["total"]);
                });

                this.headingtop=('RM Solar Power Generation As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm1.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm1.get("todate").value, 'dd-MM-yyyy', 'en'));
                this.status=true;

              }, (error) => {this.status=true;
                alert("Data Not Found !!!")
                this.listsolarpower=[];
              });
            }
          }
          
      exportAsXLSX():void 
      {
        let element = document.getElementById('dynamictable');
      
          this.excelService.exportAsExcelFile(element,'RM Solar Power Generation As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.userForm1.get("fromdate").value, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.userForm1.get("todate").value, 'dd-MM-yyyy', 'en'));
    }

    onChangeDate(event)
    {
      this.DropDownListService.checkSolarPowerDate(event).subscribe(checkSolar=> 
        {
         //alert(checkSolar.status)
         if(checkSolar.status=='NO')
         {
          this.status=true; 
          }
          else{
            this.userForm.patchValue({solar_date:''});
            alert("This Date is Already Used,Take Another Date..!! ");
            }
          });
    }

}
