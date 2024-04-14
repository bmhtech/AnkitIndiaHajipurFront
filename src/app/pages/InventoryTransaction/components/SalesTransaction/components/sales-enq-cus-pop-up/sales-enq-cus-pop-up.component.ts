import { Component, OnInit, Inject, ɵConsole} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { CustomerPopUp } from '../../../../../../Models/CustomerModel/CustomerPopUp';
import { cust_bussiness_partner} from '../../../../../../Models/CustomerModel/cust_bussiness_partner';
import { forkJoin } from 'rxjs';

  @Component({
    selector: 'app-sales-enq-cus-pop-up',
    templateUrl: './sales-enq-cus-pop-up.component.html',
    styleUrls: ['./sales-enq-cus-pop-up.component.scss']
  })
  
  export class SalesEnqCusPopUpComponent implements OnInit 
  {
    public userForm:FormGroup;
    model: CustomerPopUp=new CustomerPopUp();
    salesEnquiryDocsLists:{};
    channelDesc:any=[];
    customer_group:{};
    check : any;
    status = false;
    _cp_id = "0";
    _cp_name:any;
    customerNameList:any = [];
    customerNameListnew:any = [];
    constructor(public fb:FormBuilder, private DropDownListService: DropdownServiceService,
      private dialogRef: MatDialogRef<SalesEnqCusPopUpComponent>,@Inject(MAT_DIALOG_DATA)data)
      {
        this.userForm=fb.group({ 
          channel_desc:[''],
          cust_group:[''],
          cp_Id: [''],
         
          Customer_list: this.fb.array([this.fb.group({
            cp_Id :'',
            cp_name :'',
            checkbox:''
          })])
        });
      }
 
    get Customer_list() { return this.userForm.get('Customer_list') as FormArray;}
    get channel_desc() {return this.userForm.get("channel_desc") as FormControl;}
     get cp_Id() {return this.userForm.get("cp_Id") as FormControl;}
    get cust_group() {return this.userForm.get("cust_group") as FormControl;}

    ngOnInit() 
    {
      this.status = false;
      forkJoin(
        this.DropDownListService.custNameList(),
        this.DropDownListService.getChannelCustDesc(),
       // this.DropDownListService.getCustomerList(),
        this.DropDownListService.newfastcustomerList(localStorage.getItem("company_name")),
      ).subscribe(([custNameData, channelCustDescData, customerData])=>
        {
          this.status = true;
           this.customer_group = custNameData;
           let channel:any=[];
           console.log("check "+ JSON.stringify(channelCustDescData))
           channel=channelCustDescData;
           channel.forEach(element => {
            if(element.channeltype == "Sale")
            {
              this.channelDesc.push(element)
            }
           });
           //this.channelDesc = channelCustDescData;

           this.customerNameList = customerData;
           this.customerNameListnew= customerData;
           this.Customer_list.removeAt(0);
           for(let i=0;i<customerData.length;i++){ this.add(); }
            this.Customer_list.patchValue(customerData);

        }); 
    }

    onChangeChannelDesc(group:string)
    {
      this.status = false;
      while(this.Customer_list.length)
      this.Customer_list.removeAt(0);
      this.userForm.patchValue({cust_group: null});
      this.DropDownListService.getCustomerByChannel(group).subscribe(data=>{
        this.customerNameList = data;
        this.status = true;
        for(let i=0;i<data.length;i++){ this.add(); }
        this.Customer_list.patchValue(data);
        });     
    }

    onChangeCustomerGroup(group:string)
    {
      this.status = false;
      while(this.Customer_list.length)
      this.Customer_list.removeAt(0);
      this.userForm.patchValue({channel_desc: null});
      this.DropDownListService.getCustomerByGroup(group).subscribe(data=>
      {
        this.customerNameList = data;
        this.status = true;
        for(let i=0;i<data.length;i++)
        this.add();
        this.Customer_list.patchValue(data);
      });     
    }

    searchCustomer(event)
    {
      let serchText = event.target.value;
      if(event.key == "Enter")
      {
        this.status = false;
        if(serchText == null || serchText == undefined || serchText == '' || serchText == '0')
        {
          console.log("1");
          this.DropDownListService.findCustomers('0').subscribe(data=>
          {
            this.customerNameList = data;
            this.status = true;
          });
        }
        else
        {
          console.log("2" + serchText);
          this.DropDownListService.findCustomers(serchText).subscribe(data=>
          {
            this.customerNameList = data;
            console.log("tuhin here "+JSON.stringify(data));
            this.status = true;
          });     
        }
      }
    }

    searchCustomer2(event)
    {
      if(event.key == "Enter")
      {
        this.customerNameList=this.customerNameListnew.filter((cat) => (cat.cp_name.toLowerCase().includes((event.target.value).toLowerCase())) || ((cat.cp_code.toLowerCase().includes((event.target.value).toLowerCase()))) )
      
      
      }
    }

    add()
    {
      this.Customer_list.push(this.fb.group({
        cp_Id :'',
        cp_name :'',
        checkbox:''
      }))
    }

    check1(cust:cust_bussiness_partner)
    {
      this._cp_id = cust["cp_Id"];
      this._cp_name = cust["cp_name"];
    }
    
    SendDataToDifferentComponenet()
    {
      this.userForm.patchValue({cp_Id:this._cp_id});
     // this.dialogRef.close(this.userForm.value);  //06062022 by bidhan      
      // this.dialogRef.close(this.Customer_list.value);  
      
      if(this._cp_id == '0' || this._cp_id == null)
      {
        //alert("Please Select Atleast One Customer");
      }
      else{
        this.dialogRef.close(this.userForm.value);
      }
    }

  }
