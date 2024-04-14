import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { PaymentApproval} from '../../../../../../models/transaction/PurchaseTransaction/payment-approval';
import { PurchaseBillApprovalComponent } from '../../components/purchase-bill-approval/purchase-bill-approval.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-payment-approval',
  templateUrl: './payment-approval.component.html',
  styleUrls: ['./payment-approval.component.scss']
})
export class PaymentApprovalComponent implements OnInit
 {
 
  submitted = false;
  status = false;
  model:PaymentApproval=new PaymentApproval();
  //listPaymentApproval: PaymentApproval[];
  listPaymentApproval:any=[];

  public userForm:FormGroup;
  
  constructor(public fb:FormBuilder, private Service: Master,
      private DropDownListService: DropdownServiceService , public dialog: MatDialog) 
    { 
      this.userForm=fb.group({       
        from_date: [''],
        to_date: [''],
        });
    }

    get from_date(){ return this.userForm.get("from_date") as FormControl }
    get to_date(){ return this.userForm.get("to_date") as FormControl }

    ngOnInit() {
      this.status = true;
      //For User Role
    let user_role=localStorage.getItem("user_role")+"tuhinabcd"+"purchase_inventory";
    this.DropDownListService.getRoleItemMaster(user_role).subscribe(data=>{
    let itemtype=JSON.stringify(data);
  
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
    
    }

    onUpdate(id:any, pbid:string)
    {
     // this.Id= this.userForm.get("id").value as FormControl;
  //  this.Ppd_Id= this.production_planning_shop_floor_dtls.at(index).get("ppd_id").value as FormControl;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {Pur_Bill_Id: pbid, id: id};
        const dialogRef = this.dialog.open(PurchaseBillApprovalComponent, dialogConfig);
        dialogRef.afterClosed().subscribe( data => 
        { 
          //  this.popup_data = data;         
          //   console.log("before: "+ JSON.stringify (data));
          //   delete data['popupstatus'];
          //   let StrJsonData =JSON.stringify(data);
          //   console.log("after: "+StrJsonData);
          //   this.production_planning_shop_floor_dtls.at(index).patchValue({process_date:StrJsonData});
          //   this.UpdateIsRow(index);       
       }); 
    }

    Fromdate:any;
    Todate:any;
    send()
    {
      this.Fromdate= this.userForm.get("from_date").value as FormControl;
      this.Todate= this.userForm.get("to_date").value as FormControl;                   
      // this.userForm.patchValue({ 
      //   company_id: localStorage.getItem("company_name"), fin_year: localStorage.getItem("financial_year"),
      //   username: localStorage.getItem("username")});
      this.submitted = true;
      if( this.Fromdate !="undefined" && this.Todate !="undefined" ) 
      {
        this.status = false;
        this.Service.getPaymentStatus("fromdate="+this.Fromdate+"&todate="+this.Todate).subscribe(data=> 
        {
          this.listPaymentApproval = data ;
          this.status = true;
          this.userForm.reset(); 
          this.ngOnInit()
        }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
        this.ngOnInit()});    
      } 
     
    }

    approval(id:any)
      {
        


      }
 

}