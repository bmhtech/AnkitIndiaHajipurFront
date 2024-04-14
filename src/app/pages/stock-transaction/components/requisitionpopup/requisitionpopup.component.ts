import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../service/dropdown-service.service';
import { Master } from '../../../../service/master.service';

@Component({
  selector: 'app-requisitionpopup',
  templateUrl: './requisitionpopup.component.html',
  styleUrls: ['./requisitionpopup.component.scss']
})


export class RequisitionpopupComponent implements OnInit {
  
    ID:any;
    Requisitionno:any;
    Company_id:any;
    Fin_year:any;
    Username:any;
    public userForm: FormGroup;
    item_sl_no = 1; 



    constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<RequisitionpopupComponent>, @Inject(MAT_DIALOG_DATA)data)
    { 

      this.ID=data.alldata;
      this.Requisitionno=data.requisitionno;
      this.Company_id=data.company_id;
      this.Fin_year=data.fin_year;
      this.Username=data.username;


      this.userForm=fb.group(
        {
          id: [''],
          requisitionid: [''],
          business_unit: [''],
          requisitionno: [''],
          requestedby: [''],
          shop_floor: [''],
          requesteddate: [''],
          approvedby:[''],
          company_id: [''],
          fin_year: [''],
          username: [''],
          reject:[''],

          requisition_Item_Dtls: this.fb.array([this.fb.group({
            slno:this.item_sl_no,
            item_code:'',
            item_name:'',
            packing_item:'',
            packing:'',
            itemqty:'',
            itemuom:'',
            packingqty:'',
            packinguom:'',
            priority:'',
            purpose:'',
            wheretouse:'',
            itemquality: '',
            remarks:'',
            toleranceqty:'0',
          })]),
        })

   
    }
      
      get id(){return this.userForm.get("id") as FormControl};
      get requisitionid(){return this.userForm.get("requisitionid") as FormControl};
      get business_unit(){return this.userForm.get("business_unit") as FormControl};
      get requisitionno(){return this.userForm.get("requisitionno") as FormControl};
      get requestedby(){return this.userForm.get("requestedby") as FormControl};
      get shop_floor(){return this.userForm.get("shop_floor") as FormControl};
      get requesteddate(){return this.userForm.get("requesteddate") as FormControl};
      get approvedby(){return this.userForm.get("approvedby") as FormControl};
      get company_id(){return this.userForm.get("company_id") as FormControl};
      get fin_year(){return this.userForm.get("fin_year") as FormControl};
      get username(){return this.userForm.get("username") as FormControl};
      get reject(){return this.userForm.get("reject") as FormControl};
      get requisition_Item_Dtls(){return this.userForm.get("requisition_Item_Dtls") as FormArray};
      
      addItems()
      {
        
        this.item_sl_no =this.item_sl_no +1;
        
        this.requisition_Item_Dtls.push(this.fb.group({
          slno:this.item_sl_no,
          item_code:'',
          item_name:'',
          packing_item:'',
          packing:'',
          itemqty:'',
          itemuom:'',
          packingqty:'',
          packinguom:'',
          priority:'',
          purpose:'',
          wheretouse:'',
          itemquality: '',
          remarks:'',
          toleranceqty:'0'}))
  
        this.requisition_Item_Dtls.at(this.item_sl_no - 1).patchValue({
          item_code:'',
          item_name:'',
          packing_item:'',
          packing:'',
          itemqty:'',
          itemuom:'',
          packingqty:'',
          packinguom:'',
          priority:'',
          purpose:'',
          wheretouse:'',
          itemquality: '',
          remarks:'',
          toleranceqty:'0'
        });
      }
  
    ngOnInit() 
    {
      forkJoin(
     
        this.DropDownListService.getRequisitiondetails(this.ID),
        this.DropDownListService.getRequisitionitemdetails(this.Requisitionno),
        ).subscribe(([ requisition,requisitionitem])=>
        {
          this.userForm.patchValue(requisition);

          let k = 0;
          this.addItems();
          this.item_sl_no = 0;
          while (this.requisition_Item_Dtls.length) 
          { this.requisition_Item_Dtls.removeAt(0);}
          for(let data1 of requisitionitem)
          { 
           
            this.addItems();
            this.requisition_Item_Dtls.at(k).patchValue(data1);
            this.requisition_Item_Dtls.at(k).patchValue({toleranceqty:data1["itemqty"]})
               
            }
        });

    }


    send()
    {

       
      
        this.Service.setreject(this.userForm.getRawValue(), this.ID).subscribe(data =>
        {
         
          this.dialogRef.close(this.userForm.value);
      
        });
    }

}
