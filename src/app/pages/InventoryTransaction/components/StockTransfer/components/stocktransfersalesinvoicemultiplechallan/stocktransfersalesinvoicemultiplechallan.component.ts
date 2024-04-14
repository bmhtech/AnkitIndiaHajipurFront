import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';

@Component({
  selector: 'app-stocktransfersalesinvoicemultiplechallan',
  templateUrl: './stocktransfersalesinvoicemultiplechallan.component.html',
  styleUrls: ['./stocktransfersalesinvoicemultiplechallan.component.scss']
})
export class StocktransfersalesinvoicemultiplechallanComponent implements OnInit {


  public userForm: FormGroup;
  list:any = [];
  bussinessUnitId:any;
  challan_id = "0";
  callingFileName:any;
  status = false;
  date:any;
  company_name:any;
  fin_year:any;
  Id:any;
  showbutton:boolean=true;
  staticArray:any = [];
  finalstk_challan_id:any;
  checkboxcheck:boolean=false;
  recieving_buan:any;

  constructor( private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<StocktransfersalesinvoicemultiplechallanComponent>, @Inject(MAT_DIALOG_DATA)data)
     {
        this.userForm=fb.group
        ({
          stk_challan_id: [''],
          recieving_bu:[''],
       
          stk_challan: this.fb.array([this.fb.group({
            checkbox: '',
            stk_challan_no:'',
            stk_challan_date:'',
            confirmed_by:'',
            delivery_business_unit:'',
            stk_challan_id:'',
            })])
          ,

          stk_challan__Item_Dtls: this.fb.array([this.fb.group({
            checkbox: '',
            item_code:'',
            item_name: '',
            packing:'',
            packing_name: '',
            quantity:'',
            uom:'',
            squantity:'',
            suom:'',
            mat_wt:'',
            price:'',
            price_based_on:'',
            amount:'',
            tax_code:'',
            tax_rate: '',
            tax_amt:'',
            total_amt:'',
            acc_norms:''})])
          });
          this.bussinessUnitId = data["bussinessUnit_id"];
         
          this.date = data['date'];
          this.Id=data["id"];
   }
   get recieving_bu(){return this.userForm.get("recieving_bu") as FormControl};
   get stk_challan_id(){return this.userForm.get("stk_challan_id") as FormControl};
   get stk_challan(){{ return this.userForm.get('stk_challan') as FormArray;}}
   get stk_challan__Item_Dtls(){{ return this.userForm.get('stk_challan__Item_Dtls') as FormArray;}}
  

   addstk_challan()
     {
       this.stk_challan.push(this.fb.group({
        checkbox: '',
        stk_challan_no:'',
        stk_challan_date:'',
        confirmed_by:'',
        stk_challan_id:'',
        delivery_business_unit:'',
      }));
    }
    
    add()
     {
       this.stk_challan__Item_Dtls.push(this.fb.group({
        checkbox: '',
        item_code:'',
        item_name: '',
        packing:'',
        packing_name:'',
        quantity:'',
        uom:'',
        squantity:'',
        suom:'',
        mat_wt:'',
        price:'',
        price_based_on:'',
        amount:'',
        tax_code:'',
        tax_rate: '',
        tax_amt:'',
        total_amt:'',
        acc_norms:''}));
    }
    
  
   ngOnInit() 
   {
    this.company_name = localStorage.getItem("company_name");
    this.fin_year = localStorage.getItem("financial_year");
        if(this.Id == 0)//on first time 
        {
          this.showbutton=true;
          this.status = false;
          this.DropDownListService.getStkTransChallans("bunit="+this.bussinessUnitId+"&invdate="+this.date+"&comp="+this.company_name+"&finyear="+this.fin_year).subscribe(data=>
          {
            console.log("tuhin here " +JSON.stringify(data))
            while (this.stk_challan.length ) 
            {
              this.stk_challan.removeAt(0);
            }
            for(let staticdata of data)
            this.addstk_challan();
            this.stk_challan.patchValue(data);

           
            this.status = true;
          });
        }
        else
        {
          this.showbutton=false;

          forkJoin(
            this.DropDownListService.getmutiplegetStkTransChallans(this.Id),
            this.DropDownListService.getMultipleStkTransSalesInvItemDtlsupdate(this.Id)
            ).subscribe(([statc, itemdetails])=> {
              
              while (this.stk_challan.length ) 
              {
                this.stk_challan.removeAt(0);
              }
              for(let staticdata of statc)
              this.addstk_challan();
              this.stk_challan.patchValue(statc);
              for(let i=0;i<this.stk_challan.length;i++)
              {
              
                this.stk_challan.at(i).patchValue({checkbox:true});
              
              }

              while (this.stk_challan__Item_Dtls.length)
              this.stk_challan__Item_Dtls.removeAt(0);
              for(let data1 of itemdetails)
              this.add();
              this.status = true;        
              this.stk_challan__Item_Dtls.patchValue(itemdetails);

              for(let v=0;v<this.stk_challan__Item_Dtls.length;v++)
              {
                this.stk_challan__Item_Dtls.at(v).patchValue({checkbox:true})
              }
              this.status = true;
            });
             
             
             
         

           

        }
 }
  

        check1(index)
        {
                this.finalstk_challan_id="";
               
              

                let salesid_list="";
                let checkstatus:boolean=false; 
                for(let i=0;i<this.stk_challan.length;i++)
                {
                  
                  if(this.stk_challan.at(i).get("checkbox").value == true || this.stk_challan.at(i).get("checkbox").value == 'true')
                  {
                    salesid_list+=this.stk_challan.at(i).get("stk_challan_id").value+",";
                    this.recieving_buan=this.stk_challan.at(i).get("delivery_business_unit").value;

                    checkstatus=true;
                  }
                 
                }
                if(checkstatus ==false)
                {
                  //console.log(" length::  "+ this.sales_return_note_Item_Dtls.length );
                  while (this.stk_challan__Item_Dtls.length)
                  this.stk_challan__Item_Dtls.removeAt(0);
                  this.add();
                  this.stk_challan__Item_Dtls.at(0).patchValue({checkbox:false})

                }
                else
                {
                  this.finalstk_challan_id=salesid_list.substring(0,salesid_list.length-1);
                  console.log("tuhin here  :: " + this.finalstk_challan_id)
                  this.DropDownListService.getMultipleStkTransChallanDtls(this.finalstk_challan_id).subscribe(data=>
                    {
                      while (this.stk_challan__Item_Dtls.length)
                      this.stk_challan__Item_Dtls.removeAt(0);
                      for(let data1 of data)
                      this.add();
                      this.status = true;        
                      this.stk_challan__Item_Dtls.patchValue(data);

                      for(let v=0;v<this.stk_challan__Item_Dtls.length;v++)
                      {
                        this.stk_challan__Item_Dtls.at(v).patchValue({checkbox:true})
                      }
                    });

                      
                }
          }


          SendDataToDifferentComponenet()
          {
            this.userForm.patchValue({stk_challan_id: this.finalstk_challan_id,recieving_bu:this.recieving_buan});
            this.userForm.patchValue(this.stk_challan__Item_Dtls.value);
            for(let i=0;i<this.stk_challan__Item_Dtls.length;i++)
             {
               if(this.stk_challan__Item_Dtls.at(i).get("checkbox").value==true || this.stk_challan__Item_Dtls.at(i).get("checkbox").value=='true')
               {
                 this.checkboxcheck=true;
               }
             } 
             if(this.checkboxcheck == true)
             {
               this.dialogRef.close(this.userForm.getRawValue()); 
             }
             else
             {
               alert("Please tick on checkbox!!!!");
             }
            this.dialogRef.close(this.userForm.value);  
          }

          
      
  
}
