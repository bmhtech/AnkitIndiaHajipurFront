import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropdownServiceService } from '../../../../service/dropdown-service.service';
import { Master } from '../../../../service/master.service';
import { Accounts_ledger_master } from '../../../../Models/AccountsMaster/AccountsLedger';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-accountsmasterledger',
  templateUrl: './accountsmasterledger.component.html',
  styleUrls: ['./accountsmasterledger.component.scss']
})
export class AccountsmasterledgerComponent implements OnInit 
{
  public userForm:FormGroup;
  model:Accounts_ledger_master=new Accounts_ledger_master();

  listAccountsLedger:any=[];
  accountsGroups:any =[];
  accountsType:any=[];

  isHidden=false;
  status = false;
  seq_no: string;
  finYear:any;
  Id:any;

  ledgersave:boolean=true;

  constructor(public fb:FormBuilder, private Service: Master,
    private DropDownListService: DropdownServiceService) 
  {
    this.userForm=fb.group
    ({
      id:[''],
      accts_ledger_code: [''],
      accts_ledger_name: [''],
      accts_ledger_group: [''],
      alt_ledger_name: [''],
      openbal_ledger: [''],
      gross_profit: [''],
      gst_applicable: [''],
      gst_type: [''],
      accts_id: [''],
      maintainbalbillbybill: [''],
      inv_val_affected: [''],
      cost_center_ap: [''],


      company_id: [''],
      fin_year: [''],
      username: ['']
    });
  }

      get id(){ return this.userForm.get("id") as FormControl }
      get accts_ledger_code(){ return this.userForm.get("accts_ledger_code") as FormControl }
      get accts_ledger_name(){ return this.userForm.get("accts_ledger_name") as FormControl }
      get accts_ledger_group(){ return this.userForm.get("accts_ledger_group") as FormControl }
      get alt_ledger_name(){ return this.userForm.get("alt_ledger_name") as FormControl }
      get openbal_ledger(){ return this.userForm.get("openbal_ledger") as FormControl }
      get gross_profit(){ return this.userForm.get("gross_profit") as FormControl }
      get gst_applicable(){ return this.userForm.get("gst_applicable") as FormControl }
      get gst_type(){ return this.userForm.get("gst_type") as FormControl }
      get accts_id(){ return this.userForm.get("accts_id") as FormControl }
      get maintainbalbillbybill(){ return this.userForm.get("maintainbalbillbybill") as FormControl }
      get inv_val_affected(){ return this.userForm.get("inv_val_affected") as FormControl }
      get cost_center_ap(){ return this.userForm.get("cost_center_ap") as FormControl }

  ngOnInit() 
  {
    this.status = true;
    this.finYear = localStorage.getItem("financial_year");
    forkJoin(
      this.DropDownListService.accountledgerlist(),
      this.DropDownListService.accountGroupList(),
      this.DropDownListService.accountTypeList()
      )
   .subscribe(([ledgerlist,accgroup,acctype])=>
    {
    // console.log(JSON.stringify(ledgerlist))
       this.accountsGroups=accgroup;
       this.listAccountsLedger=ledgerlist;
       this.accountsType=acctype;
    });
   
  }

  showList(s:string)
    {
      if(s=="add")
      {       
        this.isHidden=true;    
        this.ledgersave=true;
        this.userForm.get("openbal_ledger").patchValue("0.00"); 
        this.DropDownListService.getAccountLedgerSequenceId(this.finYear).subscribe(slno=>
          {
            this.seq_no=slno.sequenceid;
          })
      }
    
      if(s=="list")
      {
        this.isHidden=false;
        this.userForm.reset();
        this.ngOnInit();
      }
    }

   
  send()
  {
       this.userForm.patchValue({company_id: localStorage.getItem("company_name"), fin_year: localStorage.getItem("financial_year"),username: localStorage.getItem("username")});
       this.Id= this.userForm.get("id").value as FormControl;    
       
       if(this.Id>0)
        {
          this.Service.updateAccLedger(this.userForm.getRawValue(),this.Id).subscribe(data=> 
            {
              alert("New Accounts Ledger Updated Successfully.....");
              this.status = true;
              this.userForm.reset(); 
              this.ngOnInit();
              this.isHidden=false;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));
                alert("New Accounts Ledger Creation Unsuccessfull...");
          });
        }
        else
        {
          this.Service.createAccLedger(this.userForm.getRawValue()).subscribe(data=> 
            {
              alert("New Accounts Ledger Created Successfully.....");
              this.status = true;
              this.userForm.reset(); 
              this.ngOnInit();
              this.isHidden=false;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));
                alert("New Accounts Ledger Creation Unsuccessfull...");
          });
        }    
  }


  onUpdate(id,action)
  {
    if(action=='view')
    {
       this.ledgersave=false;
    }
    else
    {
      this.ledgersave=true;
    }
      this.DropDownListService.retriveaccountsledger(id).subscribe(accoutledger=>
      {
          this.isHidden=true;
          console.log(JSON.stringify(accoutledger))
          this.userForm.patchValue(accoutledger);
          this.userForm.patchValue({id: id});
          this.seq_no=accoutledger["accts_ledger_code"];
          this.status=true;
      });

  }

  onDelete(id)
  {
    this.status=false;
    if(confirm("Are you sure to delete this Account Ledger?"))
    {
      this.userForm.patchValue({username: localStorage.getItem("username")});
     
          this.Service.deleteAccLedger(this.userForm.getRawValue(),id).subscribe(data=> 
            {
              alert("Account Ledger Deleted successfully.");
              this.userForm.reset();
              this.status = true;
              this.isHidden = false;
              this.ngOnInit();
              this.showList("list");
            });  
      }
      this.status=true;
    }

}
