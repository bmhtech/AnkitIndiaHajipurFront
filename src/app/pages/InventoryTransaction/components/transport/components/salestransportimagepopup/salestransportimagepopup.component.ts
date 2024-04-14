import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-salestransportimagepopup',
  templateUrl: './salestransportimagepopup.component.html',
  styleUrls: ['./salestransportimagepopup.component.scss']
})
export class SalestransportimagepopupComponent implements OnInit {
 
  public userForm1: FormGroup;
  salesinv:any;
  status=false;
  view_image:any;
  imageURL: string;
  myFiles:any = [];
  invimg:any;
  noimg:boolean=false;
  selectparent: string;
  filename:any;
  
  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<SalestransportimagepopupComponent>, @Inject(MAT_DIALOG_DATA)data)
   { 
    this.userForm1=fb.group
    ({
      party_slip: [''],
      partygross: [''],
      partytare: [''],
      });
      this.salesinv = data["salesinv"]; 
      this.filename=data["filename"];
    }
   

  ngOnInit() 
  { 
    //console.log("hello popup :: "+this.salesinv);
        if(this.filename == null || this.filename == "")
        {
          //this.invimg='D:/AayogAgroDocuments/SalesInvoice/noimg.jpg';
          this.invimg='noimg.jpg';
          this.getdriverImage(this.invimg);
          this.noimg=true;
        }
        else
        {
          this.noimg=false;
          this.getdriverImage(this.filename);
        }
        
        this.status = true;
   
  }

  getdriverImage(filename)
        {
         // console.log("imagepath :: "+imagepath)
    
          //let filename=imagepath.substring(35,imagepath.length);
         console.log("hello popup1 :: "+filename)
          this.DropDownListService.getTransportImage(filename)
          .subscribe(data=>
            {
            // console.log("after::"+JSON.stringify(data))
              this.createImage(data);
           
              this.status = true;
           }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));});
        }

        createImage(data: Blob)
        {
         // alert("enter create img"+data)
          this.view_image = data;
          const reader = new FileReader();
          reader.onload = () => {
            this.imageURL = reader.result as string;
           
          }
          reader.readAsDataURL(data)
        }
      
        SendDataToDifferentComponenet()
        {
         //this.userForm1.patchValue({party_slip: this._order_id,partygross:,partytare});
          this.dialogRef.close(this.userForm1.getRawValue()); 
        }   

}
