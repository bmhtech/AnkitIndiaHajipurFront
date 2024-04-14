import { Component, OnInit,ViewChild } from '@angular/core';
import { Master } from '../../../../../../service/master.service';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { PartyBillPayment } from '../../../../../../Models/SalesTransaction/party-bill-payment';
import { forkJoin } from 'rxjs';
import { timer } from 'rxjs';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';

@Component({
  selector: 'app-party-bill-payment',
  templateUrl: './party-bill-payment.component.html',
  styleUrls: ['./party-bill-payment.component.scss']
})
export class PartyBillPaymentComponent implements OnInit 
{
  @ViewChild(SelectAutocompleteComponent) multiSelect: SelectAutocompleteComponent;
  public userForm:FormGroup;
    model: PartyBillPayment = new PartyBillPayment();
    submitted = false;
    status = false;
    currentDate:any;
    BusinessUnit="0";
    partyList:any=[];
    company_name:any;
    selectedPartyName:any = [];
    ledgerNames:any=[];
    PayToList:any=[];
    businesslists:any=[];
    Partydata:any=[];
    listPartydata:any=[];
    
    constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService) 
    {
      this.userForm=fb.group({
        id:[''],     
        party:[''],
        total_billamt:[''],
        total_adjamt:[''],
        total_dueamt:[''],
        total_payamt:[''],
        business_unit:[''],
        pledgerid:[''],
        pay_to:[''],
        entrydate:[''],
        company_id:[''],
        fin_year: [''],
        username: [''],
      
        party_bill_payment_details: this.fb.array([this.fb.group({
          invoice_no:'',
          invoice_number:'',
          invoice_date:'',
          bill_amt:'',
          adj_amt:'',
          due_amt:'',
          payable_amt:'',
          remarks:'',
        })])
      });
    }

    get id(){ return this.userForm.get("id") as FormControl }
    get party(){ return this.userForm.get("party") as FormControl }
    get total_billamt(){ return this.userForm.get("total_billamt") as FormControl }
    get total_adjamt(){ return this.userForm.get("total_adjamt") as FormControl }
    get total_dueamt(){ return this.userForm.get("total_dueamt") as FormControl }
    get total_payamt(){ return this.userForm.get("total_payamt") as FormControl }
    get business_unit(){ return this.userForm.get("business_unit") as FormControl }
    get pledgerid(){ return this.userForm.get("pledgerid") as FormControl }
    get pay_to(){ return this.userForm.get("pay_to") as FormControl }
    get entrydate(){ return this.userForm.get("entrydate") as FormControl }
    get company_id(){ return this.userForm.get("company_id") as FormControl }
    get fin_year(){ return this.userForm.get("fin_year") as FormControl }
    get username(){ return this.userForm.get("username") as FormControl }
    get party_bill_payment_details(){return this.userForm.get('party_bill_payment_details') as FormArray;}
  
  ngOnInit() 
  {
    this.BusinessUnit ="0";
    this.status =true;
    this.company_name = localStorage.getItem("company_name");
    this.selectedPartyName = [];
    //this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
    this.userForm.patchValue({party:"0",pledgerid:"0"});

    forkJoin(
      this.DropDownListService.customerNameCodeList(this.company_name),
      this.DropDownListService.ledgerNameList(),
     this.DropDownListService.getLedgerWithBACH(),
     this.DropDownListService.getPartyBillPayment(),
     this.DropDownListService.getCompanyBUMNCList(this.company_name),
    ).subscribe(([PartyData, LedgerData,PayTodata,PartyListData,companyBuData])=>
      {
        this.partyList = PartyData;
        this.ledgerNames = LedgerData;
        this.PayToList = PayTodata ;
        this.listPartydata =PartyListData;
        this.businesslists = companyBuData;
        this.status = true; 
      });
    //this.DropDownListService.customerNameCodeList().subscribe(data=>{this.partyList  = data}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....")});
  }

  add()
  {
    this.party_bill_payment_details.push(this.fb.group({
      invoice_no:'',
      invoice_number:'',
      invoice_date:'',
      bill_amt:'',
      adj_amt:'',
      due_amt:'',
      payable_amt:'',
      remarks:'',
    }));
  }

  onChangeBusinessName(Bussunit)
  {
    this.party_bill_payment_details.reset();
    this.userForm.patchValue({total_billamt:null,total_adjamt:null,total_dueamt:null,total_payamt:null,party:"0"}) ;
    this.DropDownListService.getCustomerThruBU(Bussunit).subscribe(data=>{this.partyList  = data}, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....")});
  }

  onChangePartyName(party_id)                  
  {
    //this.userForm.patchValue({business_unit:"0"});  
   this.party_bill_payment_details.reset();
   this.userForm.patchValue({total_billamt:null,total_adjamt:null,total_dueamt:null,total_payamt:null}) ;
    if(party_id != '0' && party_id != undefined)
    {
      forkJoin( 
        this.DropDownListService.getCustomerControlAccounts(party_id),     
      ).subscribe(([ControlData])=>
        {
          this.userForm.patchValue({pledgerid :ControlData.ctrl_acc});
          this.status = true; 
        });   
    }  
    
    let Bussunit =this.userForm.get("business_unit").value;
    if(Bussunit != '0' && Bussunit != undefined && party_id !='0' && party_id !=undefined)
    {
      this.DropDownListService.getPartyOutstanding(party_id,Bussunit).subscribe(data=>
        {
           console.log("data: "+  JSON.stringify(data));
          let j = 0;
          this.add();
          while (this.party_bill_payment_details.length) 
          this.party_bill_payment_details.removeAt(0);
          for(let data1 of data)
           { 
            this.add();
            this.party_bill_payment_details.at(j).patchValue({invoice_no:data1.invoice_id,bill_amt:data1.billamount,
            invoice_date:data1.bill_date,adj_amt:data1.adjustmentamount,due_amt:data1.duesamount,invoice_number:data1.invoice_no});
              j=j+1;
          }
            this.status = true;
          });
    }

      timer(1000).subscribe
      (x=>
         {
        let Bill_amt=0;
        let Adj_amt =0;
        let Due_amt =0;        
        for(let i=0;i<this.party_bill_payment_details.length;i++)
        {
          Bill_amt+= this.party_bill_payment_details.at(i).get("bill_amt").value;
          Adj_amt+= this.party_bill_payment_details.at(i).get("adj_amt").value;
          Due_amt+= this.party_bill_payment_details.at(i).get("due_amt").value;
          this.userForm.patchValue({total_billamt:Bill_amt.toFixed(2),total_adjamt:Adj_amt.toFixed(2),total_dueamt:Due_amt.toFixed(2)});
        }
      }
      ) 
  }

  onChangePayableAmt(Payableamt, index)
  { 
   let Payable_Amt= this.party_bill_payment_details.at(index).get("payable_amt").value
   let Due_amt  = this.party_bill_payment_details.at(index).get("due_amt").value;
    
   if(Payable_Amt>Due_amt)
    {
      alert("Payable Amount Must be less or equal to Due Amount: "+Due_amt);
      this.party_bill_payment_details.at(index).patchValue({payable_amt:null});
      this.userForm.patchValue({total_payamt:null});
    }  
    else
    {  
      let Payable_amt =0;  
      for(let i=0;i<this.party_bill_payment_details.length;i++)
      {Payable_amt+= this.party_bill_payment_details.at(i).get("payable_amt").value;}
      this.userForm.patchValue({total_payamt:Payable_amt     
      });
    }  
  }

  Id:any;
  Payable_Amt:any;
  send()
  {
    this.Id= this.userForm.get("id").value as FormControl;
    this.userForm.patchValue({company_id: localStorage.getItem("company_name"), 
    fin_year:localStorage.getItem("financial_year"), username: localStorage.getItem("username")});
    this.submitted = true;

    for(let i=0;i<this.party_bill_payment_details.length;i++)
    {
      this.Payable_Amt= this.party_bill_payment_details.at(i).get("payable_amt").value;
    }
    
    if(!this.userForm.valid) 
    {
      alert('Please fill all fields!')
      return false;
    } 
    else if(this.Payable_Amt ==0 || this.Payable_Amt =='' || this.Payable_Amt ==null)
    {
      alert(' Payable amount must be greater than 0 ..!');
      return false;
    }
    else 
    {    
            this.status = false;
            this.Service.createPartyBillPayment(this.userForm.getRawValue()).subscribe(data => 
            {
              console.log(this.userForm.value);
              alert("Party Bill Payment created successfully.");
              this.ngOnInit();
                     
              // this.userForm.get("party").value.reset();
              // this.userForm.get("pledgerid").value.reset();
              //this.userForm.get("pay_to").reset();
              //this.userForm.get("business_unit").reset();
              this.userForm.get("total_billamt").reset();
              this.userForm.get("total_adjamt").reset();
              this.userForm.get("total_dueamt").reset();
              this.userForm.get("total_payamt").reset();
              while(this.party_bill_payment_details.length)
              this.party_bill_payment_details.removeAt(0);
              this.add();
              this.userForm.patchValue({entrydate:this.currentDate})
            });
        
    }
  }
  

}
