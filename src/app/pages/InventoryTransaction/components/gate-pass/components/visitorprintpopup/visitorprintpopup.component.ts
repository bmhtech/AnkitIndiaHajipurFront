import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-visitorprintpopup',
  templateUrl: './visitorprintpopup.component.html',
  styleUrls: ['./visitorprintpopup.component.scss']
})
export class VisitorprintpopupComponent implements OnInit {

  public userForm1: FormGroup;
  visitor_name1:any;
  phoneno1:any;
  address1:any;
 
  imageURL1:any;

  imageURL12:any;
  vehicle:any;
  
  
  constructor( private fb: FormBuilder,private dialogRef: MatDialogRef<VisitorprintpopupComponent>, @Inject(MAT_DIALOG_DATA)data) 
  {
    this.visitor_name1 =data["visitorname"]; 
    this.phoneno1 =data["phoneno"]; 
    this.address1 =data["address"];
    this.imageURL1 =data["imageURL"];
    this.vehicle=data["veh_no"];
  }

  ngOnInit() {
   // alert("popup")

    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL12 = reader.result as string;
    }
    reader.readAsDataURL(this.imageURL1)

   

    




  }

}