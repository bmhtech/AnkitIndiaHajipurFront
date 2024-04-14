import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { GatepassGetin } from '../../../../../../Models/Gatepass/GatepassGetin';
import { forkJoin } from 'rxjs';
import { Console } from 'console';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-gatepass-getin',
  templateUrl: './gatepass-getin.component.html',
  styleUrls: ['./gatepass-getin.component.scss']
})
export class GatepassGetinComponent implements OnInit {

  public userForm:FormGroup;
  model: GatepassGetin = new GatepassGetin();
  submitted = false;
  isHidden:any;
  myFiles:any = [];
  imageURL: string;
  Id:any;
  view_image:any;
  checklist_dumb_slno = 1;
  checklist_slno = 1;
  veh_nos:any = [];
  status = false;
  vechile_number:any;
  gatepassinlist:any = [];
  updatedstatus:boolean=false;

  constructor(public fb:FormBuilder,private DropDownListService: DropdownServiceService,private Service:Master) 
  {
        this.userForm=fb.group({
          id : [''],
          vechileid:[''],
          vehicle_verification:[''],
          remarks:[''],
          company_id:[''],
          fin_year:[''],
          username:[''],


          gatepassGetin_details:this.fb.array([this.fb.group({
            sl_no : this.checklist_slno, 
            checkbox:'',
            checklist_code:'',
            checkin:'',
            description:''})]),

          gatepass_checklist_dummy:this.fb.array([this.fb.group({
            sl_no : this.checklist_dumb_slno, 
            checkbox:'',
            checklist_code:'',
            checkin:'',
            description:''})])
    });
   }
   get id() { return this.userForm.get("id") as FormControl;}
   get vechileid() { return this.userForm.get("vechileid") as FormControl;}  
   get vehicle_verification() { return this.userForm.get("vehicle_verification") as FormControl;} 
   get remarks() { return this.userForm.get("remarks") as FormControl;} 
   get company_id(){return this.userForm.get("company_id") as FormControl}
   get fin_year(){return this.userForm.get("fin_year") as FormControl}
   get username(){return this.userForm.get("username") as FormControl}
   get gatepassGetin_details(){return this.userForm.get("gatepassGetin_details") as FormArray};
   get gatepass_checklist_dummy(){return this.userForm.get("gatepass_checklist_dummy") as FormArray};
   


   addgatepass_checklist()
   {
    
     this.gatepassGetin_details.push(this.fb.group({
        sl_no : '', 
        checkbox:'',
        checklist_code:'',
        checkin:'',
        description:''
     }));
   }
   addgatepass_checklist_dummy()
   {
   
     this.gatepass_checklist_dummy.push(this.fb.group({
        sl_no : '', 
        checkbox:'',
        checklist_code:'',
        checkin:'',
        description:''
     }));
   }


  ngOnInit() {
    this.isHidden=false;
    this.status=true;
    forkJoin(
      this.DropDownListService.getVehicleListWeighment(),
      this.DropDownListService.getGatepasschecklistin(),
      this.DropDownListService.getGatepassgetin_List()
      
    ).subscribe(([vehicleData,gatepasschecklistin,list])=>
      {
        console.log("chk list"+JSON.stringify(gatepasschecklistin))
       this.veh_nos=vehicleData;
       this.status=true;
       this.gatepassinlist=list;
      
       while (this.gatepass_checklist_dummy.length) 
       this.gatepass_checklist_dummy.removeAt(0);
       for(let i=0;i<gatepasschecklistin.length;i++)
       {
        this.addgatepass_checklist_dummy();
        this.gatepass_checklist_dummy.at(i).patchValue({sl_no:i+1,checkbox:false,
          checklist_code:gatepasschecklistin[i]["checklist_code"],
          checkin:gatepasschecklistin[i]["checkin"],
          description:gatepasschecklistin[i]["description"]});
       }

      }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
      this.ngOnInit()
    }); 


  }

  showList(s:string)
    {
      
        if(s=="add")
        {
           this.isHidden=true;
           this.imageURL ="";
           this.updatedstatus=false;
           this.DropDownListService.getVehicleListWeighment().subscribe(vehicleData=>{

            this.veh_nos=vehicleData;
           })

        }
        if(s=="list")
        { 
             this.isHidden=false;
             this.imageURL ="";
             this.updatedstatus=false;
             this.DropDownListService.getVehicleListWeighment().subscribe(vehicleData=>{

              this.veh_nos=vehicleData;
             })
             this.userForm.reset();
          
         }
    }


  onChangeVechileNo()
  {
      let vehicle_id= this.userForm.get("vechileid").value;  
      console.log(vehicle_id)
      this.veh_nos.forEach(element => { 
        if(vehicle_id == element.vehicle_id)
        {
          this.vechile_number=element.vehicle_no;
          console.log("hello matched "+this.vechile_number +" / "+ element.vehicle_no)
        }
      });
  }

  vechile_veri()
  { 

    
    this.DropDownListService.getVehicleDetails(this.userForm.get("vechileid").value).subscribe(vehicleData=>{

      if(vehicleData["vehicle_no"] == this.userForm.get("vehicle_verification").value)
      {
        
      }
      else
      {
        console.log(" tuhin :: "+vehicleData["vehicle_no"] + " / "+ this.userForm.get("vehicle_verification").value)
   
        alert("Vechile Number is not matched with Vehicle Verification");
        this.userForm.patchValue({vehicle_verification:''});
      }
    });

   
  }


  onFileSelected(e)
  {
    if(this.myFiles.length>0)
    {
      this.myFiles.pop();
      this.myFiles.push(e.target.files[0]);//file name
    
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      }
      reader.readAsDataURL(e.target.files[0])




    }
    else
    {
      this.myFiles.push(e.target.files[0]);//file name 

      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  viewimg(event)
  {
    this.Id= this.userForm.get("id").value;
    if(this.Id >0)
    {
      var left = (screen.width/2)-(450/2);
      var top = (screen.height/2)-(450/2);
      // alert(this.view_image)
       var file = new Blob([this.view_image], {type: 'image/jpeg'});
       var fileURL = URL.createObjectURL(file);
   
       
        let param="scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,, width='450', height='450', top='+top+', left='+left";
   
   
       window.open(fileURL,"_blank",param);
    }
    else
    {
      var left = (screen.width/2)-(450/2);
      var top = (screen.height/2)-(450/2);
        //this.imageURL1
        
     

     var file = new Blob([this.myFiles[0]], {type: 'image/jpeg'});
      var fileURL = URL.createObjectURL(file);
    
        
       let param="scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,, width='450', height='450', top='+top+', left='+left";
    
    
        window.open(fileURL,"_blank",param);
    }
   
   
  }

  send()
  {
    this.Id= this.userForm.get("id").value as FormControl;         
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
    else
    {
          let detailschecklist = false;

          for(let b=0;b<this.gatepass_checklist_dummy.length;b++)
          {
            console.log("checkbox"+this.gatepass_checklist_dummy.at(b).get("checkbox").value);
            if(this.gatepass_checklist_dummy.at(b).get("checkbox").value == true || this.gatepass_checklist_dummy.at(b).get("checkbox").value == 'true')
            {
              detailschecklist = true;
            }
          }
          if(detailschecklist== false)
          {
                alert("Please Check at least one option !!!!");
                this.status=true;
          }
         
          else
          {
            let k=0;
            let ib=0;
                while (this.gatepassGetin_details.length) 
                this.gatepassGetin_details.removeAt(0);
                
                for(let c=0;c<this.gatepass_checklist_dummy.length;c++)
                {
                  if(this.gatepass_checklist_dummy.at(c).get("checkbox").value == true || this.gatepass_checklist_dummy.at(c).get("checkbox").value == 'true')
                  {
                    this.addgatepass_checklist();
                    k=k+1;
                    this.gatepassGetin_details.at(ib).patchValue({sl_no:k,checkbox:this.gatepass_checklist_dummy.at(c).get("checkbox").value,
                      checklist_code:this.gatepass_checklist_dummy.at(c).get("checklist_code").value,
                      checkin:this.gatepass_checklist_dummy.at(c).get("checkin").value,
                      description:this.gatepass_checklist_dummy.at(c).get("description").value});
                      ib=ib+1;

                  }
                }


                    if(this.Id>0)
                    {
                      const InputData = this.userForm.getRawValue(); 
                      const frmData = new FormData();
                      frmData.append("Input", JSON.stringify(InputData));
                      frmData.append("files", this.myFiles[0]);   
                    
                        this.Service.updategatepassGetin(frmData).subscribe(data => 
                        {
                          
                          alert(" Gate Pass Get In has been Updated successfully.");
                          this.status=true;
                          this.userForm.reset();
                          this.ngOnInit();          
                        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));
                        alert("something error is occured in New Gate Pass Get In !!! please Reload the page and  try again....");
                      
                      }); 
          
                    }
                    else
                    {

                      const InputData = this.userForm.getRawValue(); 
                      const frmData = new FormData();
                      frmData.append("Input", JSON.stringify(InputData));
                      frmData.append("files", this.myFiles[0]);   
                    
                        this.Service.creategatepassGetin(frmData).subscribe(data => 
                        {
                          
                          alert("New Gate Pass Get In has been created successfully.");
                          this.status=true;
                          this.userForm.reset();
                          this.ngOnInit();          
                        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));
                        alert("something error is occured in New Gate Pass Get In !!! please Reload the page and  try again....");
                      
                      });    
                      }
            }

          }
  }

  onUpdate(id,gp_gi_id,action)
  {
this.isHidden=true;
      if(action='update')
      { 
        
      }

      forkJoin(
       
        this.DropDownListService.getGatepassgetinretrivebyid(id),
        this.DropDownListService.getGatepassgetinretrivedetails(gp_gi_id),
        this.DropDownListService.getGatepasschecklistin(),
        this.DropDownListService.getVehiclenoall()
      ).subscribe(([staticData,details,wholegetchecklist,vehi])=>
        {
          this.veh_nos=vehi;
        this.userForm.patchValue(staticData);

        let gateinupdate:any;
        for(let v=0;v<details.length;v++)
        {
          gateinupdate+=details[v]["checklist_code"]+",";
        }
       
        let finallist=gateinupdate.substring(0,gateinupdate.length-1);
        console.log("hello here :: " + finallist)
         while (this.gatepass_checklist_dummy.length) 
         this.gatepass_checklist_dummy.removeAt(0);
         for(let i=0;i<wholegetchecklist.length;i++)
         {
          this.addgatepass_checklist_dummy();
          if(finallist.includes(wholegetchecklist[i]["checklist_code"]))
          {
            this.gatepass_checklist_dummy.at(i).patchValue({sl_no:i+1,checkbox:true,
              checklist_code:wholegetchecklist[i]["checklist_code"],
              checkin:wholegetchecklist[i]["checkin"],
              description:wholegetchecklist[i]["description"]});
          }
          else
          {
            this.gatepass_checklist_dummy.at(i).patchValue({sl_no:i+1,checkbox:false,
              checklist_code:wholegetchecklist[i]["checklist_code"],
              checkin:wholegetchecklist[i]["checkin"],
              description:wholegetchecklist[i]["description"]});
          }

         
         }

         let filename=staticData["doc_pdf"].substring(35,staticData["doc_pdf"].length);
          this.DropDownListService.getgatepassimageimage(filename)
          .subscribe(data=>
            {
              
              this.view_image = data;
              const reader = new FileReader();
              reader.onload = () => {
                this.imageURL = reader.result as string;
              }
              reader.readAsDataURL(data)
          
              this.status = true;
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));});

          this.updatedstatus=true;
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));
        alert("something error is occured please try again....");
        this.ngOnInit()
      }); 

  }


}
