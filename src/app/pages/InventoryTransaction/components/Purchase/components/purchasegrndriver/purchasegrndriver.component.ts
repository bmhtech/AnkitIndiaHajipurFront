import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DriverMasterPopup } from '../../../../../../Models/Weightment/driver-master-popup';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-purchasegrndriver',
  templateUrl: './purchasegrndriver.component.html',
  styleUrls: ['./purchasegrndriver.component.scss']
})
export class PurchasegrndriverComponent implements OnInit {
   
  submitted= false;
  public userForm: FormGroup;
  model:DriverMasterPopup=new DriverMasterPopup();
  listDriverMasterPopup:DriverMasterPopup[];
  veh_nos:{};
  
  vehicleId:any;
  status=false;
  documentType:any;
  errorMessage:any;
  myFiles:any = [];
  imageURL: string;

  constructor(private Service:Master,public fb:FormBuilder,
    private DropDownListService :DropdownServiceService,
    private dialogRef: MatDialogRef<PurchasegrndriverComponent>, @Inject(MAT_DIALOG_DATA)data) 
  { 
    this.userForm=fb.group({
      driver_name: [''],
      phone_no: [''],
      address: [''],
      doc_type: [''],
      doc_no: [''],
      veh_no: [''],
      exp_date: [''],
  
    });

    this.vehicleId = data["vehicle_id"];
  }

  get driver_name(){ return this.userForm.get("driver_name") as FormControl }
  get phone_no(){ return this.userForm.get("phone_no") as FormControl } 
  get address(){ return this.userForm.get("address") as FormControl }
  get veh_no(){ return this.userForm.get("veh_no") as FormControl }
  get doc_type(){ return this.userForm.get("doc_type") as FormControl }
  get doc_no(){ return this.userForm.get("doc_no") as FormControl }
  get file(){ return this.userForm.get("file") as FormControl }
  get exp_date(){ return this.userForm.get("exp_date") as FormControl }

  ngOnInit()
  {
    this.status = false;
    this.documentType = "Driving Licence";
      this.DropDownListService.getVehicleNameCode().subscribe(data=>
        {
          
          this.veh_nos = data;
          this.status = true;
        });



     
     
    this.userForm.patchValue({veh_no:this.vehicleId});
  }

  searchDriver(event)
  {
    if(event.length != 0)
    {
      this.status = false;
      this.DropDownListService.chkDriverStatus(event).subscribe(data=>
      {
        if(data.length)
        {
          this.userForm.patchValue({driver_name: data[0].driver_name, phone_no: data[0].phone_no,
            address: data[0].address, doc_type: data[0].doc_type, doc_no: data[0].doc_no,exp_date:data[0].exp_date});
        }
        else
        {
          this.errorMessage="No Driver Found With this Document No...";
          //alert("No Driver Found With this Document No...");
        }
        this.status = true;
      });
    }
  }
//file upload work starts here  on on change 
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



//file upload work ends here on onchange


  send()
  {
    console.log(this.documentType.value +" / " + this.vehicleId.value)
    if(this.driver_name.value == '' || this.driver_name.value == null )
    {
      this.errorMessage=" Please input Valid Driver Name";
    }
    else if(this.doc_no.value == '' || this.doc_no.value == null )
    {
      this.errorMessage=" Please input Valid Document No.";
    }
   // else if(this.documentType.value == '' || this.documentType.value == null )
   // {
   //   this.errorMessage=" Please input Valid Document Type";
   // }
    //else if(this.vehicleId.value == '' || this.vehicleId.value == null || this.vehicleId.value == 0)
   // {
    //  this.errorMessage=" Please input Valid Vehicle No.";
   // }
    else if(this.exp_date.value == '' || this.exp_date.value == null )
    {
      this.errorMessage=" Please input Expiry Date";
    }
    
    else
    {
   //   const InputData = this.userForm.getRawValue(); 
   const InputData = this.userForm.value;
      console.log("input: "+JSON.stringify(InputData));
      const frmData = new FormData();
      console.log(" see here  "+this.myFiles + " / " + this.myFiles.length);
      frmData.append("files",this.myFiles[0]); 

      frmData.append("Input", JSON.stringify(InputData));


         this.dialogRef.close(frmData);
    }

   
  } 
}

