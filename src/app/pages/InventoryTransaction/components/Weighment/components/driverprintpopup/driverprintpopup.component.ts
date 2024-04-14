import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-driverprintpopup',
  templateUrl: './driverprintpopup.component.html',
  styleUrls: ['./driverprintpopup.component.scss']
})
export class DriverprintpopupComponent implements OnInit {

  public userForm1: FormGroup;
  driver_name1:any;
  phoneno1:any;
  address1:any;
  doc_type1:any;
  doc_no1:any;
 
  description1:any;
  imageURL1:any;

  imageURL12:any;
  


  constructor( private fb: FormBuilder,private dialogRef: MatDialogRef<DriverprintpopupComponent>, @Inject(MAT_DIALOG_DATA)data) {


    this.driver_name1 =data["drivername"]; 
    this.phoneno1 =data["phoneno"]; 
    this.address1 =data["address"]; 
    this.doc_type1 =data["doc_type"]; 
    this.doc_no1 =data["doc_no"]; 
    this.description1 =data["description"]; 
    this.imageURL1 =data["imageURL"];
   
  
  
  
    this.userForm1=fb.group
    ({

      driver_name:[''],
      phoneno:[''],
      address:[''],
      doc_type:[''],
      doc_no:[''],
      description:[''],
      imageURL:[''],
    });
    
   }

   
   get driver_name(){return this.userForm1.get("driver_name") as FormControl}
   get phoneno(){return this.userForm1.get("phoneno") as FormControl}
   get address(){return this.userForm1.get("address") as FormControl}
   get doc_type(){return this.userForm1.get("doc_type") as FormControl}
   get doc_no() { return this.userForm1.get("doc_no") as FormControl }
   get description() { return this.userForm1.get("description") as FormControl }
   get imageURL() { return this.userForm1.get("imageURL") as FormControl }

  ngOnInit() {
    

    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL12 = reader.result as string;
    }
    reader.readAsDataURL(this.imageURL1)

 

     this.userForm1.patchValue({driver_name:this.driver_name1,phoneno:this.phoneno1,address:this.address1,doc_type:this.doc_type1,doc_no:this.doc_no1,description:this.description1});




  }

}
