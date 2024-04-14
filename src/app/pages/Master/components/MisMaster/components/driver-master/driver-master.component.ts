import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

import { Driver } from '../../../../../../Models/InventoryModel/Driver';
import { forkJoin } from 'rxjs';
import { Alert } from 'selenium-webdriver';
import { MatDialog, MatDialogConfig } from '@angular/material';
//import { DriverprintpopupComponent } from '../../../../../../pages/InventoryTransaction/components/Weighment/components/driverprintpopup/driverprintpopup.component';
import { DriverprintpopupmisComponent } from '../driverprintpopupmis/driverprintpopupmis.component';

@Component({
  selector: 'app-driver-master',
  templateUrl: './driver-master.component.html',
  styleUrls: ['./driver-master.component.scss']
})
export class DriverMasterComponent implements OnInit {
  public userForm:FormGroup;
  model: Driver = new Driver();
  submitted = false;
  isHidden:any;
  status:any;
  vehclenos:any = [];
  myFiles:any = [];
  imageURL: string;
  listdriver:any = [];
  view_image:any;
  Id:any;
  imageURL1:any;
  drivermastersave:boolean=true;
  drivermasterupdate:boolean=true;
  drivermasterview:boolean=true;
  drivermasterdelete:boolean=true;

  constructor(public fb:FormBuilder,private DropDownListService: DropdownServiceService,private Service:Master, private dialog: MatDialog) 
    {
     
     
        this.userForm=fb.group({
          driver_name:[''],
          id : [''],
          doc_no:[''],
          veh_no:[''],
          phone_no:[''],
          address:[''],
          catagory:['']
         
       
        });


    }

    get driver_name(){return this.userForm.get("driver_name") as FormControl}
    get doc_no(){return this.userForm.get("doc_no") as FormControl}
    get veh_no(){return this.userForm.get("veh_no") as FormControl}
    get phone_no(){return this.userForm.get("phone_no") as FormControl}
    get address(){return this.userForm.get("address") as FormControl}
    get id(){return this.userForm.get("id") as FormControl}
    get file(){ return this.userForm.get("file") as FormControl }
    get catagory(){return this.userForm.get("catagory") as FormControl}
    

    
    ngOnInit()
    {
        this.status = false;
        this.isHidden=false;

        let accessdata=JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));

        this.drivermastersave=false;
        this.drivermasterupdate=false;
        this.drivermasterdelete=false;
        this.drivermasterview=false;
       // console.log(accessdata)
        if(accessdata.includes('driver_master.save'))
        {
         this.drivermastersave = true;
        
        }
        if(accessdata.includes('driver_master.update'))
        { 
          this.drivermasterupdate=true;
        }
        if(accessdata.includes('driver_master.delete'))
        {
          this.drivermasterdelete=true;
        }
        if(accessdata.includes('driver_master.view'))
        {
          this.drivermasterview=true;
        }
   
          //this.DropDownListService.getDriverList()
          this.DropDownListService.getDriverListnew()
          .subscribe((driverlist)=>
           {
            console.log("Driver : : "+JSON.stringify(driverlist))
            this.listdriver=driverlist;
            this.status = true;

          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});    
    }


    showList(s:string)
    {
      
        if(s=="add")
        {
           this.isHidden=true;
           this.userForm.patchValue({veh_no:"0"});

            this.DropDownListService.getVehiclenoall()
            .subscribe((vehclenosall)=>
             {
              this.vehclenos =vehclenosall;
              this.status = true;
  
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
            this.ngOnInit()}); 

        }
      
     
        if(s=="list")
        { 

             this.isHidden=false;
             this.drivermastersave=true;
             this.userForm.reset(); 
             this.myFiles=[];
             this.imageURL=""; 
         }
    }
    
//file nio work
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




    send()
    {

      this.status = false;

      if(this.userForm.get("driver_name").value == null || this.userForm.get("driver_name").value == "")
      {
        alert("Please Enter Driver Name!!!!  ");
        this.status=true;
      }
     else if(this.userForm.get("veh_no").value == null || this.userForm.get("veh_no").value == 0)
      {
        alert("Please Select Vehicle No.!!!!  ");
        this.status=true;
      }
      else{
        const InputData = this.userForm.getRawValue(); 
         // console.log("input: "+JSON.stringify(InputData));
          const frmData = new FormData();
          //console.log(" length "+this.myFiles.length);
          for (let i = 0; i < this.myFiles.length; i++)
          {  
              frmData.append("files", this.myFiles[i]);   
            //  console.log();
              if (i == 0) 
              {  
              //  console.log(i+",files: "+this.myFiles[i])
              }  
          }  
        frmData.append("Input", JSON.stringify(InputData));
       // console.log("Form data: "+frmData);

        this.Id= this.userForm.get("id").value as FormControl;
        if(this.Id >0)
        {
          
                this.Service.updateDriverpopup(frmData).subscribe(data=> 
                  {
                     //   console.log("Driver Details: "+JSON.stringify(data));
                        alert("New Driver master created successfully.");   
                        
                        this.isHidden = false ;     
                        this.status = true;         
                        this.userForm.reset();
                        this.ngOnInit();
                        this.showList("list")
                        
                  }); 
                
        }
        else
        {
          
                this.Service.createDriverpopup(frmData).subscribe(data=> 
                  {
                        //console.log("Driver Details: "+JSON.stringify(data));
                        alert("New Driver master created successfully.");   
                        this.status = true;
                        this.userForm.reset();
                        this.ngOnInit();
                        
                  }); 
                
        }
      }
      
      
    }
   
      onUpdate(id,action)
      {
          if(action == "view")
          {
            this.drivermastersave=false;
          }
          if(action == "update")
          {
            this.drivermastersave=true;
          }  

            

        this.isHidden = true;
        this.status=false;
       
        forkJoin(
          this.DropDownListService.getVehiclenoall(),
          this.Service.retrieveDriver(id)
        ).subscribe(([vehclenosall,data])=>
          { 
            this.vehclenos =vehclenosall;
           // console.log("check driver data:"+JSON.stringify(data));
            this.userForm.patchValue(data);

            if(data.doc_img == null || data.doc_img == "")
            {

            }
            else
            {
              this.getdriverImage(data.doc_img);
            }
            
            this.status = true;
                
          }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
          this.ngOnInit()});
        
      }

      onDelete(id)
      {this.status=false;
        this.Service.deleteDriver(id,this.userForm.getRawValue()).subscribe(data=> 
          {
            
          //  console.log("Driver Details: "+JSON.stringify(data));
            alert("Driver master  Successfully Deleted."); 
            this.status = true;
            this.userForm.reset();
            this.ngOnInit();
                
          }); 
      }

        getdriverImage(imagepath)
        {
         // console.log("imagepath :: "+imagepath)
    
          let filename=imagepath.substring(29,imagepath.length);
          this.DropDownListService.getdriverimage(filename)
          .subscribe(data=>
            {
             
              this.createImage(data);
           
              this.status = true;
           }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));});
    
    
        }
        createImage(data: Blob)
        {
          this.view_image = data;
          const reader = new FileReader();
          reader.onload = () => {
            this.imageURL = reader.result as string;
          }
          reader.readAsDataURL(data)
        }
      
        viewimg(event)
        {
          this.Id= this.userForm.get("id").value as FormControl;
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

        
      
      
        printdriverdetails(driver_name,phoneno,address,doc_type,doc_no,description,imagepath,veh_id,catagory,exp_date)
        { // alert(e.get("driver_name").value + " / " + e.get("phone").value)
          const dialogConfig = new MatDialogConfig();
           dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          
           dialogConfig.data = { index: 0,};
          let dialogref;
          console.log(imagepath);
          if(imagepath == null)
          {
            this.view_image="";
            dialogref=this.dialog.open(DriverprintpopupmisComponent, {data:{drivername: driver_name,phoneno:phoneno,address:address,doc_type:doc_type,doc_no:doc_no,description:description,imageURL: this.view_image,veh_id:veh_id,catagory:catagory,exp_date:exp_date} , height: '40%',
            width: '60%'
            } );
            dialogref.afterClosed().subscribe(data =>
            { 
            });
          }
            else
            { //starts 
              let filename=imagepath.substring(29,imagepath.length);
              this.DropDownListService.getdriverimage(filename)
              .subscribe(data=>
                {
                
                  
                      this.view_image = data;
                      const reader = new FileReader();
                      reader.onload = () => {
                        this.imageURL = reader.result as string;
                      }
                      reader.readAsDataURL(data)

                      dialogref=this.dialog.open(DriverprintpopupmisComponent, {data:{drivername: driver_name,phoneno:phoneno,address:address,doc_type:doc_type,doc_no:doc_no,description:description,imageURL: this.view_image,veh_id:veh_id,catagory:catagory,exp_date:exp_date} , height: '40%',
                      width: '60%'
                      } );
                      dialogref.afterClosed().subscribe(data =>
                      { 
                      });

              
                  this.status = true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));});


          

  //ends





 

}
           
    
        }

  
        
      }
