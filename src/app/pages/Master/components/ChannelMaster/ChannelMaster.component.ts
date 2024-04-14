import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { channelPartner } from '../../../../Models/channelPartner/channelPartner';
import { Master } from '../../../../service/master.service';

  @Component({
    selector: 'app-levels-2',
    templateUrl: './ChannelMaster.component.html',
    styleUrls: ['./ChannelMaster.component.scss']
  })

  export class ChannelMasterComponent implements OnInit 
  {
    submitted = false;
    public userForm:FormGroup;
    model:channelPartner=new channelPartner();
    listChannelPartner: channelPartner[];
    isHidden=false;
    status = false;
    partner_sl_no=1;

    constructor(public fb:FormBuilder,private Service: Master) 
    { 
      this.userForm=fb.group(
      {
        channel_name:[''],
        channel_partner:[''],
        channel_active:[''],
        company_id: [''],
        fin_year: [''],
        username: [''],

        channel_partner_details: this.fb.array([this.fb.group({
          sl_no:this.partner_sl_no,
          cp_name:'',
          cp_active:'',
          cp_remarks:''
          })])
      });
    }

    get channel_name(){ return this.userForm.get("channel_name") as FormControl }
    get channel_partner(){ return this.userForm.get("channel_partner") as FormControl }
    get channel_active(){ return this.userForm.get("channel_active") as FormControl }
    get channel_partner_details(){return this.userForm.get('channel_partner_details') as FormArray;}

    ngOnInit()
   {
      this.Service.getChannel().subscribe( data=>{this.listChannelPartner = data; });
      this.status = true;
    }

    showList(s:string)
    {
      if(s=="add")
      {this.isHidden=true;}
      if(s=="list")
      {this.isHidden=false;}
    }
  
    add() 
    {
      this.partner_sl_no  = this.partner_sl_no  + 1;
      this.channel_partner_details.push(this.fb.group({
        sl_no:this.partner_sl_no,
        cp_name:'',
        cp_active:'',
        cp_remarks:''}));
    }

    delete(index) 
    {
      if(this.partner_sl_no > 1)
      { 
        this.channel_partner_details.removeAt(index);
        this.partner_sl_no = this.partner_sl_no - 1;
      }
      else
      {
        this.partner_sl_no = 1;
        alert("can't delete all rows");
        this.channel_partner_details.reset();
        this.channel_partner_details.at(0).patchValue({sl_no:  this.partner_sl_no});
      } 
      
      for(let i=1; i<=this.partner_sl_no; i++)
        this.channel_partner_details.at(i-1).patchValue({sl_no: i});
    }

    send()
    {
      this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
        fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
      this.submitted = true;
      if(!this.userForm.valid) 
      {
        alert('Please fill all fields!')
        return false;
      } 
      else 
      {
        this.status = false;
        this.Service.createChannel(this.userForm.value).subscribe(data => 
        {
          console.log(this.userForm.value);
          alert("New Channel Partner Master created successfully.");
          //window.location.reload();
          this.userForm.reset();
          this.status = true;
          //refresh List;
           this.Service.getChannel().subscribe(data=>{this.listChannelPartner = data;});
          //Refresh Dynemic Table
          this.partner_sl_no = 0;
          while(this.channel_partner_details.length)
          this.channel_partner_details.removeAt(0);
          this.add();
         });   
      }
    }

  }
