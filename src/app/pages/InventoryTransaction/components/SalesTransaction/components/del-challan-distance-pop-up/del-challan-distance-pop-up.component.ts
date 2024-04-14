import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-del-challan-distance-pop-up',
  templateUrl: './del-challan-distance-pop-up.component.html',
  styleUrls: ['./del-challan-distance-pop-up.component.scss']
})
export class DelChallanDistancePopUpComponent implements OnInit 
{
  public userForm1: FormGroup;
  areaList:any=[];
  status = false;
  ID:any;
  delv_id:any;

  constructor(public fb:FormBuilder,
    private Service : Master,private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<DelChallanDistancePopUpComponent>,@Inject(MAT_DIALOG_DATA) data) 
  { 
    this.userForm1=fb.group({
      delivery_id:[''],
      transport_from:[''],
      transport_to:[''],
      distance_in_km:[''] });

      this.ID=data["id"];
      this.delv_id=data["deliveryid"];
  }

  get delivery_id(){ return this.userForm1.get("delivery_id") as FormControl }
  get transport_from(){ return this.userForm1.get("transport_from") as FormControl }           
  get transport_to(){ return this.userForm1.get("transport_to") as FormControl }
  get distance_in_km(){ return this.userForm1.get("distance_in_km") as FormControl }

  ngOnInit() 
  {
    this.status = false;

    forkJoin(
    this.DropDownListService.areaList(),
    this.Service.getDelivery_challan_Chgs_dynDtls(this.delv_id),
    ).subscribe(([areaData,transportData])=>
    {
      console.log("Del Trans data::"+JSON.stringify(transportData))
      this.areaList = areaData;
      this.userForm1.patchValue({transport_from:transportData[0]["transport_from"],transport_to:transportData[0]["transport_to"],distance_in_km:transportData[0]["distance_in_km"]});
      this.status = true;
    });
  }

  SendDataToDifferentComponenet()
  {
   // this.userForm1.patchValue({delivery_id: this.delv_id});
   this.DropDownListService.updateTransporterDetailsthruPopup(this.delv_id,this.userForm1.get("distance_in_km").value)
        .subscribe(transData=>
          {
            alert("Delivery Challan Transportation Details Updated Successfully.....");
            this.status = true;
            this.ngOnInit();
            this.dialogRef.close();
          })
    
  }


}
