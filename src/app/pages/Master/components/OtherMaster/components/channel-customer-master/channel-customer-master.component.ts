import { Component, OnInit } from '@angular/core';
import { Master } from '../../../../../../service/master.service';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { cust_bussiness_partner } from '../../../../../../Models/CustomerModel/cust_bussiness_partner';
import { channel_cust_master } from '../../../../../../Models/OtherMaster/ChannelCustomerMaster';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { forkJoin } from 'rxjs';
import { customerList } from '../../../../../../Models/CustomerModel/customerList';
import { supplierList } from '../../../../../../Models/CustomerModel/supplierList';

@Component({
  selector: 'app-channel-customer-master',
  templateUrl: './channel-customer-master.component.html',
  styleUrls: ['./channel-customer-master.component.scss']
})

export class ChannelCustomerMasterComponent implements OnInit {
  submitted = false;
  public userForm: FormGroup;
  model: channel_cust_master = new channel_cust_master();
  listcust_bussiness_partner: cust_bussiness_partner[];
  channel_master_list: channel_cust_master[];
  showpurchase: boolean = false;
  showsale: boolean = false;
  listsup_bussiness_partner: any = [];
  status = false;
  isHidden = false;
  channelcustmastersave: boolean = true;
  channelcustmasterupdate: boolean = true;
  channelcustmasterdelete: boolean = true;
  channelcustmasterview: boolean = true;

  cid = "";
  suppGroups: any = [];
  customerNames: any = [];
  stopcheck: any = [];
  Updatedlist: any;
  UpdatedCustlist: any;

  constructor(private Service: Master, public fb: FormBuilder, private DropDownListService: DropdownServiceService) {
    this.userForm = fb.group({
      id: [''],
      custid: [''],
      channel_desc: [''],
      channeltype: [''],
      group_type: [''],
      company_id: [''],
      fin_year: [''],
      username: ['']
    });
  }
  get id() { return this.userForm.get("id") as FormControl }
  get custid() { return this.userForm.get("custid") as FormControl }
  get channel_desc() { return this.userForm.get("channel_desc") as FormControl }
  get channeltype() { return this.userForm.get("channeltype") as FormControl }
  get group_type() { return this.userForm.get("group_type") as FormControl }

  get company_id() { return this.userForm.get("company_id") as FormControl }
  get fin_year() { return this.userForm.get("fin_year") as FormControl }
  get username() { return this.userForm.get("username") as FormControl }



  ngOnInit() {
    //For User Role
    let accessdata = JSON.stringify(JSON.parse(localStorage.getItem("useraccessname")));

    this.channelcustmastersave = false;
    this.channelcustmasterupdate = false;
    this.channelcustmasterdelete = false;
    this.channelcustmasterview = false

    if (accessdata.includes('channel_customer_master.save')) {
      this.channelcustmastersave = true;
    }
    if (accessdata.includes('channel_customer_master.update')) {
      this.channelcustmasterupdate = true;
    }

    if (accessdata.includes('channel_customer_master.delete')) {
      this.channelcustmasterdelete = true;
    }
    if (accessdata.includes('channel_customer_master.view')) {
      this.channelcustmasterview = true;
    }

    this.status = false;

    //this.Service.getCustomerBussinessPartner().subscribe(data=>{this.listcust_bussiness_partner  = data;});
    //  this.Service.getChannelCust().subscribe(data=>{this.channel_master_list  = data;});
    this.Service.getChannelCustFastApi().subscribe(data => { this.channel_master_list = data; });
    this.status = true;
  }

  showList(s: string) {
    if (this.channelcustmastersave == true && this.channelcustmasterupdate == true)//true exist  false not exist 
    {
      if (s == "add") {
        this.isHidden = true;
        this.userForm.reset(this.ResetAllValues().value);
        //  this.DropDownListService.customerNameCodeListnew(localStorage.getItem("company_name")).subscribe(data=>{this.listcust_bussiness_partner  = data;});
        // this.Service.getCustomerBussinessPartner().subscribe(data=>{this.listcust_bussiness_partner  = data;});

        for (let i = 0; i < this.is_select_unit.length; i++) { this.is_select_unit[i] = null; }

      }
    }
    if (this.channelcustmastersave == true && this.channelcustmasterupdate == false) {
      if (s == "add") {
        this.isHidden = true;
        // this.DropDownListService.customerNameCodeListnew(localStorage.getItem("company_name")).subscribe(data=>{this.listcust_bussiness_partner  = data;});
        this.userForm.reset(this.ResetAllValues().value);
        for (let i = 0; i < this.is_select_unit.length; i++) { this.is_select_unit[i] = null; }

      }
    }

    if (s == "list") {
      this.isHidden = false;
      this.channelcustmastersave = true;
      this.userForm.reset(this.ResetAllValues().value);
      this.cid = '';
      for (let i = 0; i < this.is_select_unit.length; i++) { this.is_select_unit[i] = null; }
    }
  }

  ResetAllValues() {
    return this.userForm = this.fb.group({
      id: [''],
      custid: [''],
      channel_desc: [''],
      channeltype: [''],
      company_id: [''],
      fin_year: [''],
      username: [''],
      group_type: ['']
    });
  }

  check(event, index) {
    if (event.checked) {
      console.log(index)
      // console.log("cid" +  this.cid )
      if (this.userForm.get("channeltype").value == "Purchase") {

        this.cid = this.cid + this.sortedSuppData[index].bp_Id + ",";
        this.userForm.patchValue({ custid: this.cid.substring(0, this.cid.length - 1) })
      }
      if (this.userForm.get("channeltype").value == "Sale") {
        this.cid = this.cid + this.sortedData[index].cp_Id + ",";
        this.userForm.patchValue({ custid: this.cid.substring(0, this.cid.length - 1) })
      }


    }
    else {
      if (this.userForm.get("channeltype").value == "Purchase") {
        // this.cid = this.cid.replace(this.listsup_bussiness_partner[index].bp_Id + "," , "");
        this.cid = this.cid.replace(this.sortedSuppData[index].bp_Id + ",", "");

        this.userForm.patchValue({ custid: this.cid.substring(0, this.cid.length - 1) })
      }
      if (this.userForm.get("channeltype").value == "Sale") {
        //this.cid = this.cid.replace(this.listcust_bussiness_partner[index].cp_Id + "," , "");
        this.cid = this.cid.replace(this.sortedData[index].cp_Id + ",", "");

        this.userForm.patchValue({ custid: this.cid.substring(0, this.cid.length - 1) })
      }

    }
  }

  search(event) {
    let serchText = event.target.value;
    if (event.key == "Enter") {
      this.status = false;
      if (serchText == null || serchText == undefined || serchText == '' || serchText == '0') {
        this.DropDownListService.findChannelCustomer('0').subscribe(data => {
          this.channel_master_list = data;
          this.status = true;
        });
      }
      else {
        this.DropDownListService.findChannelCustomer(serchText).subscribe(data => {
          this.channel_master_list = data;
          this.status = true;
        });
        this.status = true;
      }
    }
  }

  sortedSuppData: supplierList[];
  searchSupp(event) {
    //console.log("Enter Method")
    if (event.key == "Enter") {
      if (event.target.value == "") {
        this.sortedSuppData = this.listsup_bussiness_partner.filter((supplier) =>
          (supplier.bp_Id.toLowerCase().includes((event.target.value).toLowerCase()))
          || ((supplier.bp_name.toLowerCase().includes((event.target.value).toLowerCase())))
        )

        for (let i = 0; i < this.sortedSuppData.length; i++) {
          // console.log(this.sortedSuppData[i].bp_Id)
          if (this.userForm.get("custid").value.includes(this.sortedSuppData[i].bp_Id)) {
            this.is_select_unit[i] = true;

          }
          else {
            this.is_select_unit[i] = false;
          }
          if (Number(this.userForm.get("id").value) > 0) {
            if (this.Updatedlist.includes(this.sortedSuppData[i].bp_Id)) {
              this.stopcheck[i] = true;
            }
            else {
              this.stopcheck[i] = false;
            }

          }
        }

      }
      else {
        this.sortedSuppData = this.listsup_bussiness_partner.filter((supplier) =>
          (supplier.bp_Id.toLowerCase().includes((event.target.value).toLowerCase()))
          || ((supplier.bp_name.toLowerCase().includes((event.target.value).toLowerCase())))
        )
        console.log(this.sortedSuppData.length)
        //here starts tuhin
        //this.userForm.get("custid").value


        for (let i = 0; i < this.sortedSuppData.length; i++) {
          // console.log(this.sortedSuppData[i].bp_Id)
          if (this.userForm.get("custid").value.includes(this.sortedSuppData[i].bp_Id)) {
            this.is_select_unit[i] = true;

          }
          else {
            this.is_select_unit[i] = false;
          }
          if (Number(this.userForm.get("id").value) > 0) {
            if (this.Updatedlist.includes(this.sortedSuppData[i].bp_Id)) {
              this.stopcheck[i] = true;
            }
            else {
              this.stopcheck[i] = false;
            }

          }
        }
      }

      //here ends tuhin
      //console.log("search data:"+JSON.stringify(this.sortedSuppData))
    }
  }

  sortedData: customerList[];
  searchCust(event) {
    if (event.key == "Enter") {

      if (event.target.value == "") {
        this.sortedData = this.listcust_bussiness_partner.filter((cust) =>
          (cust.cp_Id.toLowerCase().includes((event.target.value).toLowerCase()))
          || ((cust.cp_name.toLowerCase().includes((event.target.value).toLowerCase())))
        )

        for (let i = 0; i < this.sortedData.length; i++) {
          // console.log(this.sortedData[i].cp_Id)
          if (this.userForm.get("custid").value.includes(this.sortedData[i].cp_Id)) {
            this.is_select_unit[i] = true;

          }
          else {
            this.is_select_unit[i] = false;
          }
          if (Number(this.userForm.get("id").value) > 0) {
            if (this.UpdatedCustlist.includes(this.sortedData[i].cp_Id)) {
              this.stopcheck[i] = true;
            }
            else {
              this.stopcheck[i] = false;
            }

          }
        }

      }
      else {
        this.sortedData = this.listcust_bussiness_partner.filter((cust) =>
          (cust.cp_Id.toLowerCase().includes((event.target.value).toLowerCase()))
          || ((cust.cp_name.toLowerCase().includes((event.target.value).toLowerCase())))
        )
        console.log(this.sortedData.length)

        //this.userForm.get("custid").value

        for (let i = 0; i < this.sortedData.length; i++) {
          // console.log(this.sortedData[i].cp_Id)
          if (this.userForm.get("custid").value.includes(this.sortedData[i].cp_Id)) {
            this.is_select_unit[i] = true;
          }
          else {
            this.is_select_unit[i] = false;
          }
          if (Number(this.userForm.get("id").value) > 0) {
            if (this.UpdatedCustlist.includes(this.sortedData[i].cp_Id)) {
              this.stopcheck[i] = true;
            }
            else {
              this.stopcheck[i] = false;
            }

          }
        }
      }

    }
  }

  onDelete(id: any, channel_custid) {
    this.status = false;
    if (confirm("Are you sure to delete this Channel Customer ?")) {
      this.userForm.patchValue({ username: localStorage.getItem("username") });
      this.DropDownListService.checkChennelCustomerMasterUsage(channel_custid).subscribe(checkChNlCustData => {
        //alert("bidhan here::"+checkChNlCustData.status);
        if (checkChNlCustData.status == 'No') {
          this.Service.deleteChannelCustomer(this.userForm.getRawValue(), id).subscribe(data => {
            console.log("Cat id:" + data.channel_desc);
            if (data.channel_desc == '' || data.channel_desc == null) {
              alert("Opps!!! Can't delete this Channel Customer  !!!");
            } else {
              alert("Channel Customer deleted successfully.");
            }
            this.status = true;
            this.ngOnInit()
          });
        }
        else {
          alert("This Channel Customer is Already Used,Can not be Deleted!! ");
        }

      });
    }
    this.status = true;
  }

  customer_Id: any;
  customerSplitId: any = [];
  is_select_unit: any = [];

  onUpdate(id: any, action) {
    if (action == 'update') {
      this.channelcustmastersave = true;
    }
    else {
      this.channelcustmastersave = false;
    }
    this.isHidden = true;
    this.status = false;
    forkJoin(
      this.Service.retriveChannelCust(id),

    )
      .subscribe(([data]) => {
        this.Channeltypechange(data["channeltype"]);
        if (data["channeltype"] == "Purchase") {
          this.DropDownListService.supplierNamesNewList(localStorage.getItem("company_name"))
            .subscribe(supllist => {
              this.listsup_bussiness_partner = supllist;
              this.sortedSuppData = supllist;
              this.showpurchase = true;
              this.showsale = false;
              this.customer_Id = data["custid"];
              this.Updatedlist = data["custid"];
              if (this.customer_Id != null) {
                for (let i = 0; i < this.is_select_unit.length; i++) { this.is_select_unit[i] = null; }
                this.customerSplitId = this.customer_Id.split(',');
                for (let i = 0; i < this.listsup_bussiness_partner.length; i++) {
                  for (let k = 0; k < this.customerSplitId.length; k++) {
                    if (this.listsup_bussiness_partner[i].bp_Id == this.customerSplitId[k]) {
                      this.is_select_unit[i] = true;
                      this.stopcheck[i] = true;
                      break;
                    }
                  }
                }
              }
              else if (this.is_select_unit = true) {
                this.check(true, 0)
              }
              this.cid = data["custid"] + ",";
              //console.log("hallu 1 "+ data["custid"])
              this.userForm.patchValue({
                id: data["id"], channel_custid: data["channel_custid"], company_id: data["company_id"],
                channel_desc: data["channel_desc"], fin_year: data["fin_year"], username: data["username"], custid: data["custid"],
                channeltype: data["channeltype"], group_type: data["group_type"]
              })

              this.status = true;

            });

        }
        if (data["channeltype"] == "Sale") {
          this.DropDownListService.customerNameCodeListnew(localStorage.getItem("company_name"))
            .subscribe(customerlist => {
              this.listcust_bussiness_partner = customerlist;
              this.sortedData = customerlist;
              this.showpurchase = false;
              this.showsale = true;

              this.customer_Id = data["custid"];
              this.UpdatedCustlist = data["custid"];
              if (this.customer_Id != null) {
                for (let i = 0; i < this.is_select_unit.length; i++) { this.is_select_unit[i] = null; }
                this.customerSplitId = this.customer_Id.split(',');
                for (let i = 0; i < this.listcust_bussiness_partner.length; i++) {
                  for (let k = 0; k < this.customerSplitId.length; k++) {
                    if (this.listcust_bussiness_partner[i].cp_Id == this.customerSplitId[k]) {
                      this.is_select_unit[i] = true;
                      this.stopcheck[i] = true;
                      break;
                    }
                  }
                }
              }
              else if (this.is_select_unit = true) {

                this.check(true, 0)
              }
              this.cid = data["custid"] + ",";
              //console.log("hallu 1 "+ data["custid"])

              this.userForm.patchValue({
                id: data["id"], channel_custid: data["channel_custid"], company_id: data["company_id"],
                channel_desc: data["channel_desc"], fin_year: data["fin_year"], username: data["username"], custid: data["custid"],
                channeltype: data["channeltype"], group_type: data["group_type"]
              })
              // console.log("hallu "+ this.cid)
              this.status = true;
            });

        }

      });
  }

  Id: any;
  send() {

    this.Id = this.userForm.get("id").value as FormControl;
    this.userForm.patchValue({
      company_id: localStorage.getItem("company_name"),
      fin_year: localStorage.getItem("financial_year"), username: localStorage.getItem("username")
    });
    this.submitted = true;
    if (!this.userForm.valid) {
      alert('Please fill all fields!')
      return false;
    }
    else {
      if (this.userForm.get("channel_desc").value == '' || this.userForm.get("channel_desc").value == null || this.userForm.get("channel_desc").value == 0) {
        alert("Please Enter Description");
        this.status = true;
      }
      else {
        if (this.Id > 0) {
          this.status = false;
          this.userForm.patchValue({ custid: this.cid.substring(0, this.cid.length - 1) })
          this.Service.updateChannelCust(this.userForm.getRawValue(), this.Id).subscribe(data => {
            console.log(this.userForm.value);
            alert("Customer Master Updated successfully.");
            this.userForm.reset();
            //refresh List;
            this.status = true;
            this.ngOnInit();
            this.isHidden = false;
          });
        }
        else {
          this.status = false;
          this.userForm.patchValue({ custid: this.cid.substring(0, this.cid.length - 1) })
          this.Service.createChannelCust(this.userForm.value).subscribe(data => {
            console.log(this.userForm.value);
            alert("New Customer Master created successfully.");
            this.userForm.reset();
            //refresh List;
            this.status = true;
            this.ngOnInit();
            this.isHidden = false;
          });
        }
      }

    }
  }


  Channeltypechange(event) {
    if (event.length) {
      this.is_select_unit = [];
      this.cid = '';
      this.userForm.patchValue({ custid: '' })

      if (event == "Purchase") {

        // Vineet Starts Here
        this.DropDownListService.supplierNameCodeList().subscribe(data => {
          this.suppGroups = data;

        });
        // Vineet Ends Here
        this.showpurchase = true;
        this.showsale = false;


      }
      else if (event == "Sale") {

        // Vineet Starts Here
        this.DropDownListService.custNameList().subscribe(data => {
          this.customerNames = data;

        });
        // Vineet Ends Here
        this.showpurchase = false;
        this.showsale = true;

      }
      else {
        this.listcust_bussiness_partner = [];
        this.sortedData = [];
        this.listsup_bussiness_partner = [];
        this.sortedSuppData = [];
        this.showpurchase = false;
        this.showsale = false;

      }

    }
  }

  onChangeGroup(group_type: String) {
    if (group_type) {

      this.DropDownListService.getChannelPartyList(group_type, this.userForm.get("channeltype").value).subscribe(data => {

        if (this.userForm.get("channeltype").value == "Sale") {
          this.listcust_bussiness_partner = data;
          this.sortedData = data;
        }
        else {
          this.listsup_bussiness_partner = data;
          this.sortedSuppData = data;
        }

      });


    }

  }


  terminate(id: any) {
    this.status = false;
    this.DropDownListService.terminatechannel(id)
      .subscribe(res => {
        if (res["status"] == "Yes") {
          alert("Channel Master Terminated!!")
          this.Service.getChannelCustFastApi().subscribe(data => { this.channel_master_list = data; });

        }
        else {
          alert("Channel Master didn't Terminated!!")
        }
        this.status = true;
      });
  }
}
