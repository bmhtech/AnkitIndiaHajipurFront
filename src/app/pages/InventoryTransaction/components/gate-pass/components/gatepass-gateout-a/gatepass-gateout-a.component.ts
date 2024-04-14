import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { GatepassGateoutAuthorization } from '../../../../../../Models/Gatepass/GatepassGateoutAuthorization';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-gatepass-gateout-a',
  templateUrl: './gatepass-gateout-a.component.html',
  styleUrls: ['./gatepass-gateout-a.component.scss']
})
export class GatepassGateoutAComponent implements OnInit {


  public userForm:FormGroup;
  model: GatepassGateoutAuthorization = new GatepassGateoutAuthorization();
  submitted = false;
  isHidden:any;
  Id:any;
  veh_nos:any = [];
  status = false;
  checklist_slno = 1;
  checklist_slno_dummy=1;
  company_name:any;
  employeeNames:any = [];
  vechile_number:any;
  gatepassoutalist:any=[];
  updatedstatus:boolean=false;
  constructor(public fb:FormBuilder,private DropDownListService: DropdownServiceService,private Service:Master)
   { 
    this.userForm=fb.group({
      id : [''],
      vechileid:[''],
      vehicle_verification:[''],
      confirmed_by:[''],
      remarks:[''],
      company_id:[''],
      fin_year:[''],
      username:[''],


      gatepassGateoutAuthorization_details:this.fb.array([this.fb.group({
        sl_no : this.checklist_slno, 
        checkbox:'',
        checklist_code:'',
        checkin:'',
        description:''})])
        ,
        gatepassGateoutAuthorization_details_dummy:this.fb.array([this.fb.group({
          sl_no : this.checklist_slno_dummy, 
          checkbox:'',
          checklist_code:'',
          checkin:'',
          description:''})])
    });

   }

   get id() { return this.userForm.get("id") as FormControl;}
   get vechileid() { return this.userForm.get("vechileid") as FormControl;}  
   get vehicle_verification() { return this.userForm.get("vehicle_verification") as FormControl;} 
   get confirmed_by() { return this.userForm.get("confirmed_by") as FormControl;} 
   get remarks() { return this.userForm.get("remarks") as FormControl;} 

   get company_id() { return this.userForm.get("company_id") as FormControl;} 
   get fin_year() { return this.userForm.get("fin_year") as FormControl;} 
   get username() { return this.userForm.get("username") as FormControl;} 

   get gatepassGateoutAuthorization_details(){return this.userForm.get("gatepassGateoutAuthorization_details") as FormArray};
   get gatepassGateoutAuthorization_details_dummy(){return this.userForm.get("gatepassGateoutAuthorization_details_dummy") as FormArray};


   addgatepass_checklist_authorization()
   {
    this.checklist_slno =this.checklist_slno +1;
     this.gatepassGateoutAuthorization_details.push(this.fb.group({
        sl_no : this.checklist_slno, 
        checkbox:'',
        checklist_code:'',
        checkin:'',
        description:''
     }));
   }

   addgatepass_checklist_authorization_dummy()
   {
    this.checklist_slno_dummy =this.checklist_slno_dummy +1;
     this.gatepassGateoutAuthorization_details_dummy.push(this.fb.group({
        sl_no : this.checklist_slno_dummy, 
        checkbox:'',
        checklist_code:'',
        checkin:'',
        description:''
     }));
   }

  ngOnInit() {
    this.isHidden=false;
    this.company_name = localStorage.getItem("company_name");
    forkJoin(
      this.DropDownListService.getVehicleListWeighmenOutAuth(),
      this.DropDownListService.getGatepasschecklistout(),
      this.DropDownListService.employeeNamesList(this.company_name),
      this.DropDownListService.getGatepassgetouta_List()
    ).subscribe(([vehicleData,gatepasschecklistout,employeelist,gateoutlist])=>
      {
       this.veh_nos=vehicleData;
       this.employeeNames = employeelist;
       this.status=true;
       this.gatepassoutalist=gateoutlist;

       this.checklist_slno_dummy=0;
       while (this.gatepassGateoutAuthorization_details_dummy.length) 
       this.gatepassGateoutAuthorization_details_dummy.removeAt(0);
       for(let i=0;i<gatepasschecklistout.length;i++)
       {
        this.addgatepass_checklist_authorization_dummy();
        this.gatepassGateoutAuthorization_details_dummy.at(i).patchValue({sl_no:i+1,checkbox:false,
          checklist_code:gatepasschecklistout[i]["checklist_code"],
          checkin:gatepasschecklistout[i]["checkin"],
          description:gatepasschecklistout[i]["description"]});
       }

      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()}); 

  }

  
  showList(s:string)
    {
      
        if(s=="add")
        {
           this.isHidden=true;
           this.updatedstatus=false;
           this.DropDownListService.getVehicleListWeighmenOutAuth().subscribe(data=>
            {
              this.veh_nos=data;
            });
        }
        if(s=="list")
        { 
             this.isHidden=false;
             this.updatedstatus=false;
           this.userForm.reset();
         }
    }


  vechile_veri()
  { 
    console.log(" tuhin :: "+this.vechile_number + " / "+ this.userForm.get("vehicle_verification").value)
    if(this.vechile_number == this.userForm.get("vehicle_verification").value)
    {
      
    }
    else
    {
      alert("Vechile Number is not matched with Vehicle Verification");
      this.userForm.patchValue({vehicle_verification:''});
    }
  }

  onChangeVechileNo()
  {
      let vehicle_id= this.userForm.get("vechileid").value;  
      this.veh_nos.forEach(element => { 
        if(vehicle_id == element.vehicle_id)
        {
          this.vechile_number=element.vehicle_no;
        }
      });
  }

  send()
  {
    this.Id= this.userForm.get("id").value as FormControl; 
    console.log("hello id "+this.Id)     ;   
    this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
    fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
    this.submitted = true;
    this.status=false;

    if(this.userForm.get("vechileid").value =='' ||this.userForm.get("vechileid").value ==null  || this.userForm.get("vechileid").value =='0' )
    {
      alert("Please Select Vehicle Number !!!!!!!");
      this.status=true;
    }
    else if(this.userForm.get("vehicle_verification").value == '' ||this.userForm.get("vehicle_verification").value == null )
    {
      alert("Please Enter Vechile Verification !!!!!!!");
      this.status=true;
    }
    else if(this.userForm.get("confirmed_by").value == '' ||this.userForm.get("confirmed_by").value == null || this.userForm.get("confirmed_by").value == '0')
    {
      alert("Please Select Approved By !!!!!!!");
      this.status=true;
    }
    else
    {
          let detailschecklist = false;

          for(let b=0;b<this.gatepassGateoutAuthorization_details_dummy.length;b++)
          {
            if(this.gatepassGateoutAuthorization_details_dummy.at(b).get("checkbox").value == true || this.gatepassGateoutAuthorization_details_dummy.at(b).get("checkbox").value == 'true')
            {
              detailschecklist = true;
            }
          }
          if(detailschecklist==false)
          {
                alert("Please Check at least one option !!!!");
                this.status=true;
          }
          else
          {
                while (this.gatepassGateoutAuthorization_details.length) 
                this.gatepassGateoutAuthorization_details.removeAt(0);
                let slnodetails:number=0;
                let ib=0;
                for(let c=0;c<this.gatepassGateoutAuthorization_details_dummy.length;c++)
                {
                  if(this.gatepassGateoutAuthorization_details_dummy.at(c).get("checkbox").value == true || this.gatepassGateoutAuthorization_details_dummy.at(c).get("checkbox").value == 'true')
                  {
                    this.addgatepass_checklist_authorization();
                    slnodetails=slnodetails+1;
                    this.gatepassGateoutAuthorization_details.at(ib).patchValue({sl_no:slnodetails,checkbox:this.gatepassGateoutAuthorization_details_dummy.at(c).get("checkbox").value,
                      checklist_code:this.gatepassGateoutAuthorization_details_dummy.at(c).get("checklist_code").value,
                      checkin:this.gatepassGateoutAuthorization_details_dummy.at(c).get("checkin").value,
                      description:this.gatepassGateoutAuthorization_details_dummy.at(c).get("description").value});
                      ib=ib+1;

                  }
                }


                    if(this.Id>0)
                    {
          
  
                        this.Service.updategatepassGetouta(this.userForm.getRawValue(),this.Id).subscribe(data => 
                          {
                            
                            alert("Gate Pass Get Out Authorization has been Updated successfully.");
                            this.status=true;
                            this.userForm.reset();
                            this.ngOnInit();          
                          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));
                          alert("something error is occured in New Gate Pass Get Out Authorization !!! please Reload the page and  try again....");
                        
                        });    


                    }
                    else
                    {
                      
                          this.Service.creategatepassGetouta(this.userForm.getRawValue()).subscribe(data => 
                          {
                            
                            alert("New Gate Pass Get Out Authorization has been created successfully.");
                            this.status=true;
                            this.userForm.reset();
                            this.ngOnInit();          
                          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));
                          alert("something error is occured in New Gate Pass Get Out Authorization !!! please Reload the page and  try again....");
                        
                        });    
                      }
            }

         

          }
  }


  onUpdate(id,gp_go_auth_id,action)
  {
      this.isHidden=true;
    
      if(action='update')
      { 
        
      }
      this.veh_nos=[];
      forkJoin(
       
        this.DropDownListService.getGatepassgetoutaretrivebyid(id),
        this.DropDownListService.getGatepassgetoutaretrivedetails(gp_go_auth_id),
        this.DropDownListService.getGatepasschecklistout(),
        this.DropDownListService.getVehiclenoall()
      ).subscribe(([staticData,details,wholegetchecklist,vehicledata])=>
        {
              console.log(JSON.stringify(vehicledata))
              this.veh_nos=vehicledata;
              this.userForm.patchValue({vechileid:staticData["vechileid"],vehicle_verification:staticData["vehicle_verification"],
              confirmed_by:staticData["confirmed_by"],remarks:staticData["remarks"],id:staticData["id"]});
   
              let gateinupdate:any;
              for(let v=0;v<details.length;v++)
              {
                gateinupdate+=details[v]["checklist_code"]+",";
              }
            
              let finallist=gateinupdate.substring(0,gateinupdate.length-1);
              console.log("hello here :: " + finallist)
              while (this.gatepassGateoutAuthorization_details_dummy.length) 
              this.gatepassGateoutAuthorization_details_dummy.removeAt(0);
              for(let i=0;i<wholegetchecklist.length;i++)
              {
                this.addgatepass_checklist_authorization_dummy();
                if(finallist.includes(wholegetchecklist[i]["checklist_code"]))
                {
                  this.gatepassGateoutAuthorization_details_dummy.at(i).patchValue({sl_no:i+1,checkbox:true,
                    checklist_code:wholegetchecklist[i]["checklist_code"],
                    checkin:wholegetchecklist[i]["checkin"],
                    description:wholegetchecklist[i]["description"]});
                }
                else
                {
                  this.gatepassGateoutAuthorization_details_dummy.at(i).patchValue({sl_no:i+1,checkbox:false,
                    checklist_code:wholegetchecklist[i]["checklist_code"],
                    checkin:wholegetchecklist[i]["checkin"],
                    description:wholegetchecklist[i]["description"]});
                }

         
         }
         this.updatedstatus=true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));
        alert("something error is occured please try again....");
        this.ngOnInit()
      }); 

  }

}
