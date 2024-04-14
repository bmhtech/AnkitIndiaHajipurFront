import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { forkJoin } from 'rxjs';
import { Visitor } from '../../../../../../Models/InventoryModel/Visitor';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { VisitorprintpopupComponent } from '../visitorprintpopup/visitorprintpopup.component';

@Component({
  selector: 'app-visitor-master',
  templateUrl: './visitor-master.component.html',
  styleUrls: ['./visitor-master.component.scss']
})
export class VisitorMasterComponent implements OnInit {

  public userForm:FormGroup;
  model: Visitor = new Visitor();
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
  visitormastersave:boolean=true;
  visitormasterupdate:boolean=true;
  visitormasterview:boolean=true;
  visitormasterdelete:boolean=true;
  visitormasterprint:boolean=true;
  listvisitors:any=[];

  constructor(public fb:FormBuilder,private DropDownListService: DropdownServiceService,private Service:Master, private dialog: MatDialog) 
  {
   
   
      this.userForm=fb.group({
        visitor_id:[''],
        visitor_name:[''],
        id : [''],
        doc_no:[''],
        veh_no:[''],
        phone_no:[''],
        address:[''],
        catagory:['']
       
     
      });


  }

  get visitor_name(){return this.userForm.get("visitor_name") as FormControl}
  get visitor_id(){return this.userForm.get("visitor_id") as FormControl}
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

       this.visitormastersave=false;
       this.visitormasterupdate=false;
       this.visitormasterdelete=false;
       this.visitormasterview=false;
       this.visitormasterprint=false;
      // console.log(accessdata)
       if(accessdata.includes('visitor_master.save'))
       {
        this.visitormastersave = true;
       }
       if(accessdata.includes('visitor_master.update'))
       { 
         this.visitormasterupdate=true;
       }
       if(accessdata.includes('visitor_master.delete'))
       {
         this.visitormasterdelete=true;
       }
       if(accessdata.includes('visitor_master.view'))
       {
         this.visitormasterview=true;
       }
       if(accessdata.includes('visitor_master.print'))
       {
         this.visitormasterprint=true;
       }

      this.DropDownListService.visitorsList().subscribe((visitordata)=>
        { 
          this.listvisitors=visitordata;
        });
      this.status=true;
         
  }


  showList(s:string)
  {
    
      if(s=="add")
      {
         this.isHidden=true;
         this.status=true;
      }
      if(s=="list")
      { 

           this.isHidden=false;
           this.visitormastersave=true;
           this.userForm.reset(); 
           this.myFiles=[];
           this.imageURL=""; 
           this.status=true;
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
    this.Id= this.userForm.get("id").value as FormControl;         
    this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
    fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});

    if(this.userForm.get("visitor_name").value == null || this.userForm.get("visitor_name").value == "")
    {
      alert("Please Enter Visitor Name!!!!  ");
      this.status=true;
    }
    else{
      const InputData = this.userForm.getRawValue(); 
      const frmData = new FormData();
        
        //console.log(" length "+this.myFiles.length);
         
      

      this.Id= this.userForm.get("id").value as FormControl;
      if(this.Id >0)
      {
        
                frmData.append("Input", JSON.stringify(InputData));
                frmData.append("files", this.myFiles[0]);   
              
                  this.Service.updateVisitorMaster(frmData).subscribe(data => 
                  {
                    
                    alert("Visitor Master has been Updated successfully.");
                    this.status=true;
                    this.userForm.reset();
                    this.ngOnInit();          
                  }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));
                  alert("something error is occured in Visitor Master Updation !!! please Reload the page and  try again....");
                
                }); 
              
      }
      else
      {
        frmData.append("Input", JSON.stringify(InputData));
        frmData.append("files", this.myFiles[0]); 
              this.Service.createVisitorMaster(frmData).subscribe(data=> 
                {
                      //console.log("Driver Details: "+JSON.stringify(data));
                      alert("New Visitor master created successfully.");   
                      this.status = true;
                      this.userForm.reset();
                      this.ngOnInit();
                      
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));
                alert("something error is occured in New Visitor Master !!! please Reload the page and  try again....");
              }); 
              
      }
    }
    
    
  }
 
    onUpdate(id,action)
      {
        this.isHidden=true;
        if(action == "view")
        {
          this.visitormastersave=false;
        }
        if(action == "update")
        {
          this.visitormastersave=true;
        }

            this.DropDownListService.retrieveVisitorById(id).subscribe((visitorsData)=>
            {
             
            this.userForm.patchValue(visitorsData);

              let filename=visitorsData["doc_img"].substring(35,visitorsData["doc_img"].length);
              this.DropDownListService.getVisitorsimageimage(filename)
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

              
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));
            alert("something error is occured please try again....");
            this.ngOnInit()
          }); 

      }

      onDelete(id:any,visitor_id)
      {
        this.status = false;
        if(confirm("Are you sure to delete this Visitor ?"))
        { 
          this.userForm.patchValue({username: localStorage.getItem("username")});
          this.DropDownListService.checkVisitorMasterDeletion(visitor_id).subscribe(checkVMData=> 
            {
           //alert("check::"+checkVMData.status)
             if(checkVMData.status=='No')
             {
              this.Service.deleteVisitorMaster(this.userForm.getRawValue(),id).subscribe(data=> 
                {
                  
          
                  if(data.visitor_name=='' || data.visitor_name==null)
                  {
                    alert("Opps!!! Can't delete this Visitor !!!");
                  }else{
                    alert("Visitor deleted successfully.");
                  }
                  this.status = true;
                  this.ngOnInit()
                });
             }
             else{
              alert("This Visitor is Already Used,Can not be Deleted!! ");
             }
            }); 
        }  
        this.status = true;
      }

      printVisitors(visitor_name,phoneno,address,veh_no,imagepath)
      { 
        const dialogConfig = new MatDialogConfig();
         dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        
         dialogConfig.data = { index: 0,};
        let dialogref;
        console.log(imagepath);
        if(imagepath == null)
        {
          this.view_image="";
          dialogref=this.dialog.open(VisitorprintpopupComponent, {data:{visitorname: visitor_name,phoneno:phoneno,address:address,veh_no:veh_no,imageURL: this.view_image} , height: '40%',
          width: '60%'
          } );
          dialogref.afterClosed().subscribe(data =>
          { 
          });
        }
          else
          { //starts 
            let filename=imagepath.substring(35,imagepath.length);
            this.DropDownListService.getVisitorsimageimage(filename)
            .subscribe(data=>
              {
              
                
                    this.view_image = data;
                    const reader = new FileReader();
                    reader.onload = () => {
                      this.imageURL = reader.result as string;
                    }
                    reader.readAsDataURL(data)

                    dialogref=this.dialog.open(VisitorprintpopupComponent, {data:{visitorname: visitor_name,phoneno:phoneno,address:address,veh_no:veh_no,imageURL: this.view_image} , height: '40%',
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
