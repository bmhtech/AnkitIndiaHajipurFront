import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin } from 'rxjs';
import { Supp_bussiness_partner } from '../../../../../../Models/SupplierModel/Supp_bussiness_partner';
import { CustomerPopUp } from '../../../../../../Models/CustomerModel/CustomerPopUp';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-purchasechannelpopup',
  templateUrl: './purchasechannelpopup.component.html',
  styleUrls: ['./purchasechannelpopup.component.scss']
})
export class PurchasechannelpopupComponent implements OnInit {
  public userForm:FormGroup;
  model: CustomerPopUp=new CustomerPopUp();
  salesEnquiryDocsLists:{};
  channelDesc:any=[];
  customer_group:any=[];
  check : any;
  status = false;
  _cp_id = "0";
  _cp_name:any;
  customerNameList:any = [];
  customerNameListnew:any = [];
  constructor(public fb:FormBuilder, private DropDownListService: DropdownServiceService, private Service: Master,
    private dialogRef: MatDialogRef<PurchasechannelpopupComponent>,@Inject(MAT_DIALOG_DATA)data)
    {
      this.userForm=fb.group({ 
        channel_desc:[''],
        cust_group:[''],
        cp_Id: [''],
       
      /*  Customer_list: this.fb.array([this.fb.group({
          bp_Id :'',
          bp_name :'',
          checkbox:''
        })])*/
      });
    }

  //get Customer_list() { return this.userForm.get('Customer_list') as FormArray;}
  get channel_desc() {return this.userForm.get("channel_desc") as FormControl;}
   get cp_Id() {return this.userForm.get("cp_Id") as FormControl;}
  get cust_group() {return this.userForm.get("cust_group") as FormControl;}

  ngOnInit() 
  {
    this.status = false;
    forkJoin(
      this.Service.getSupplierGroup(),
      this.DropDownListService.getChannelCustDesc(),
     // this.DropDownListService.getCustomerList(),
      this.DropDownListService.supplierNamesNewList(localStorage.getItem("company_name"))
    ).subscribe(([custNameData, channelCustDescData, customerData])=>
      {
        this.status = true;
         this.customer_group = custNameData;
         let channel:any=[];
         //console.log("check "+ JSON.stringify(channelCustDescData))
         channel=channelCustDescData;
         channel.forEach(element => {
          if(element.channeltype == "Purchase")
          {
            this.channelDesc.push(element)
          }
         });
         //this.channelDesc = channelCustDescData;

         this.customerNameList = customerData;
         this.customerNameListnew= customerData;
         /*this.Customer_list.removeAt(0);
         for(let i=0;i<customerData.length;i++){ this.add(); }
          this.Customer_list.patchValue(customerData);
         */

      }); 
  }

  onChangeChannelDesc(group:string)
  {
    this.status = false;
   /* while(this.Customer_list.length)
    this.Customer_list.removeAt(0);
    */
    this.userForm.patchValue({cust_group: null});
   //this.DropDownListService.getCustomerByChannel(group).subscribe(data=>{
    this.DropDownListService.getSupplierByChannel(group).subscribe(data=>{
      this.customerNameList = data;
      this.status = true;
      /*for(let i=0;i<data.length;i++){ this.add(); }
      this.Customer_list.patchValue(data);
      */ 
      });    
  }

  onChangeCustomerGroup(group:string)
  {
    this.status = false;
   /* while(this.Customer_list.length)
    this.Customer_list.removeAt(0);
    */
    this.userForm.patchValue({channel_desc: null});

    //here 
    this.DropDownListService.getsupplierByGroup(group).subscribe(data=>
    {
      console.log(JSON.stringify(data))
      this.customerNameList = data;
      this.status = true;
    /*  for(let i=0;i<data.length;i++)
      this.add();
      this.Customer_list.patchValue(data);
      */
    });     
  }

  

  searchCustomer2(event)
  {
    if(event.key == "Enter")
    {

      this.customerNameList=this.customerNameListnew.filter((cat) => 
      (cat.bp_name.toLowerCase().includes((event.target.value).toLowerCase())) || ((cat.bp_code.toLowerCase().includes((event.target.value).toLowerCase()))) )
    
    }
  }

  /*add()
  {
    this.Customer_list.push(this.fb.group({
      bp_Id :'',
       bp_name :'',
      checkbox:''
    }))
  }
*/
  check1(cust:Supp_bussiness_partner)
  {
    console.log(cust["bp_Id"])
    this._cp_id = cust["bp_Id"];
    this._cp_name = cust["bp_name"];
  }
  
  SendDataToDifferentComponenet()
  {
    this.userForm.patchValue({cp_Id:this._cp_id});
   
    
    if(this._cp_id == '0' || this._cp_id == null)
    {
      //alert("Please Select Atleast One Customer");
    }
    else{
      this.dialogRef.close(this.userForm.value);
    }
  }

}
