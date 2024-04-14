import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DropdownServiceService } from '../../../../service/dropdown-service.service';
import { Master } from '../../../../service/master.service';
import { Issuestock } from '../../../../Models/Storemodel/issuestock';
import { formatDate } from '@angular/common';
import { forkJoin } from 'rxjs';
import { IsssuestockitempopupComponent } from '../isssuestockitempopup/isssuestockitempopup.component';

@Component({
  selector: 'app-issuestock',
  templateUrl: './issuestock.component.html',
  styleUrls: ['./issuestock.component.scss']
})
export class IssuestockComponent implements OnInit {

  public userForm:FormGroup;
  model: Issuestock = new Issuestock();
  bussiness_unit_list:any=[];
  ShopFloorList: any=[];
  item_codes: any=[];
  packingItem:any=[];
  employeeNames:any=[];
  selectedItemName = [];
  selectedPackingItem:any = [];
  currentDate:any;
  financialYear:any;
  company_name:any;
  user_role:any;
  isHidden:any;
  status:any;
  RequisitionList:any = [];
  capacity:any = [];
  empty_bag_wt:any = [];
  tolerance:any = [];
  issuedtypestatus:boolean=true;
  _item_qty:any;
  _packing_qty:any;
  item_sl_no = 1;
  Id:any;
  issuelist:any = [];
  issuestocksave:boolean=true;
  slno:any;
  BuUnit:any;

  constructor(public fb:FormBuilder, public dialog: MatDialog,
  private Service : Master,private DropDownListService: DropdownServiceService)
  { 
      this.userForm=fb.group(
      {
        id: [''],
        issueno: [''],
        issuedatefrom: [''],
        issueto: [''],
        issuetype:[''],
        requesteddate: [''],
        business_unit: [''],
        shop_floor: [''],
        requisitionno: [''],
        requestedby: [''],
        approvedby: [''],
        company_id: [''],
        fin_year: [''],
        username: [''],
       
       
        issuestock_Item_Dtls: this.fb.array([this.fb.group({
          slno:'',
          item_code:'',
          item_name:'',
          packing_item:'',
          packing:'',
          itemqty:'',
          itemuom:'',
          packingqty:'',
          packinguom:'',
          toleranceqty:'0',
          reqpackingqty:'0',
          reqitemqty:'0'

        })])
      });
  }

  get id(){return this.userForm.get("id") as FormControl};
  get issueno(){return this.userForm.get("issueno") as FormControl};
  get issuedatefrom(){return this.userForm.get("issuedatefrom") as FormControl};
  get issueto(){return this.userForm.get("issueto") as FormControl};
  get issuetype(){return this.userForm.get("issuetype") as FormControl};
  get requesteddate(){return this.userForm.get("requesteddate") as FormControl};
  get business_unit(){return this.userForm.get("business_unit") as FormControl};
  get shop_floor(){return this.userForm.get("shop_floor") as FormControl};
  get requisitionno(){return this.userForm.get("requisitionno") as FormControl};
  get requestedby(){return this.userForm.get("requestedby") as FormControl};
  get approvedby(){return this.userForm.get("approvedby") as FormControl};
  get company_id(){return this.userForm.get("company_id") as FormControl};
  get fin_year(){return this.userForm.get("fin_year") as FormControl};
  get username(){return this.userForm.get("username") as FormControl};
  get issuestock_Item_Dtls(){return this.userForm.get("issuestock_Item_Dtls") as FormArray};

  ngOnInit()
  {
    this.isHidden=false;
    this.status=true;
    this.slno=1;
    this.company_name = localStorage.getItem("company_name");
 
    this.BuUnit = "0";
     this.issuestocksave=true;
    this.currentDate = formatDate(new Date(), 'dd-MM-yyyy', 'en');
    this.financialYear = localStorage.getItem("financial_year");
    this.selectedItemName = [];
    this.selectedPackingItem = [];
    this.company_name = localStorage.getItem("company_name");
    this.user_role=localStorage.getItem("user_role");
    
    this.DropDownListService.getIssueStocklist(this.financialYear).subscribe(issuedata=>
    {this.issuelist=issuedata;
    });

  }

  showList(s:string)
  {
      if(s=="add")
      {
        this.status=false;
        this.isHidden = true;
        forkJoin(
          this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
          this.DropDownListService.getEmployeeNamenew(this.company_name),
          //this.DropDownListService.getItemThruPurchase(),
          this.DropDownListService.getItemThruPurchasenew(),
          this.DropDownListService.getissuestocknumber(this.financialYear)
          ).subscribe(([ bUnitData,employeeData,ItemData,issuestockno])=>
          {
            this.bussiness_unit_list=bUnitData;
            this.employeeNames = employeeData;
            this.item_codes=ItemData; 
            this.userForm.patchValue({issueno:issuestockno.sequenceid});
            this.status=true;
          });
    
      }
      if(s=="list")
      { 
        this.isHidden = false;
        this.userForm.reset();
        while (this.issuestock_Item_Dtls.length) 
        this.issuestock_Item_Dtls.removeAt(0);
        this.addItems();

      }
  }

  addItems()
    {
      this.issuestock_Item_Dtls.push(this.fb.group({ slno:'',
      item_code:'',
      item_name:'',
      packing_item:'',
      packing:'',
      itemqty:'',
      itemuom:'',
      packingqty:'',
      packinguom:'',
      toleranceqty:'0',
      reqpackingqty:'0',
      reqitemqty:'0'
       }))
    }

  onChangeItemName(index, itemId)
  {
    if(itemId.length)
    {
      this.selectedPackingItem[index] = [];
      this.issuestock_Item_Dtls.at(index).patchValue({item_code: itemId});
     
      forkJoin(
        this.DropDownListService.getItemNameById(itemId,this.company_name),
        this.DropDownListService.getItemMasterPackMat(itemId)
      ).subscribe(([data, data1])=>
      {
          forkJoin(  
            this.DropDownListService.getUomName(data.mstock_unit)
            ).subscribe(([data])=>
          { 
            this.issuestock_Item_Dtls.at(index).patchValue({itemuom:data.description}); 
            this.packingItem[index] = data1;
        
          });
      }); 
    }
  }

  onChangePackingItem(index, packingId)
  {
    if(packingId.length)
    {
      this.selectedPackingItem[index] = packingId;
      this.issuestock_Item_Dtls.at(index).patchValue({packing: packingId})
      
      forkJoin(
      this.DropDownListService.getItemPackUom(this.issuestock_Item_Dtls.at(index).get("item_code").value, packingId,this.company_name),
      this.DropDownListService.getItemNameByIdNew(packingId,this.company_name),
      )
      .subscribe(([data,packingdata])=>
      {  
          this.capacity[index] = data.capacity; 
          this.empty_bag_wt[index] = data.empty_big_wt;
          this.tolerance[index]=data.tolerance;
          this.issuestock_Item_Dtls.at(index).patchValue({packinguom: packingdata.mstock_unit_name}); 
      });
    }
  }
 
  addItemsopen()
  {
    
    this.item_sl_no =this.item_sl_no +1;
    
    this.issuestock_Item_Dtls.push(this.fb.group({
      slno:this.item_sl_no,
          item_code:'',
          item_name:'',
          packing_item:'',
          packing:'',
          itemqty:'',
          itemuom:'',
          packingqty:'',
          packinguom:'',
          toleranceqty:'0',
          reqpackingqty:'0',
          reqitemqty:'0'
      }))

    this.issuestock_Item_Dtls.at(this.item_sl_no - 1).patchValue({
          item_code:'',
          item_name:'',
          packing_item:'',
          packing:'',
          itemqty:'',
          itemuom:'',
          packingqty:'',
          packinguom:'',
          toleranceqty:'0',
          reqpackingqty:'0',
          reqitemqty:'0'
    });
  }

  deleteItemsopen(index) 
  {
    if(this.item_sl_no > 1)
    { 
      this.issuestock_Item_Dtls.removeAt(index);
      if(this.packingItem[index] != undefined)
      { 
        this.packingItem.splice(index, 1);
        this.selectedPackingItem.splice(index, 1);
        this.capacity.splice(index, 1);
        this.empty_bag_wt.splice(index, 1);
        this.tolerance.splice(index, 1);
      }
      this.item_sl_no = this.item_sl_no - 1;

      for(let v=0 ;v<=this.issuestock_Item_Dtls.length;v++)
      {
        this.issuestock_Item_Dtls.at(v).patchValue({slno: v+1});
      }
    }
    else
    {
      this.item_sl_no = 1;
      alert("can't delete all rows");
      this.selectedItemName[index] = "0";
      this.selectedPackingItem[index] = "0";
      this.issuestock_Item_Dtls.reset();
      this.issuestock_Item_Dtls.at(0).patchValue({slno:  this.item_sl_no});
     
      this.issuestock_Item_Dtls.at(0).patchValue({
       
          item_code:'',
          item_name:'',
          packing_item:'',
          packing:'',
          itemqty:'',
          itemuom:'',
          packingqty:'',
          packinguom:'',
          toleranceqty:'0',
          reqpackingqty:'0',
          reqitemqty:'0'
      });
    
    for(let i=1; i<=this.item_sl_no; i++)
      this.issuestock_Item_Dtls.at(i-1).patchValue({slno: i});
    
  }
}

  onChangeBuUnit(BuUnit:string)
  {    
    if(BuUnit!="0")
    {
      this.DropDownListService.getShopFloorThruBU(BuUnit).subscribe(data=>
      {
        this.ShopFloorList = data;
      });
    }  
  }

  onChangeRequisition()
  {    
      if(this.userForm.get("issuetype").value == "Issued")
      {
        this.userForm.patchValue({requesteddate:''});
        this.DropDownListService.getRequisitionnumberapprove(this.userForm.get("issueto").value).subscribe(data=>
          {
            this.RequisitionList = data;
            this.issuedtypestatus=true;
          });
      }
      else
      {
        this.issuedtypestatus=false;
        this.RequisitionList=[];

        this.selectedItemName = [];
        this.selectedPackingItem = [];

        this.userForm.patchValue({requisitionno:''});
        this.addItemsopen();
        this.item_sl_no = 0;
        while (this.issuestock_Item_Dtls.length) 
        {
           this.issuestock_Item_Dtls.removeAt(0);
        }
        this.addItemsopen();
      }
   
      
  }


  showpopup(index)
  {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = { index: 0  };
      let comp=this.company_name;

      let itemcode= this.issuestock_Item_Dtls.at(index).get("item_code").value;
      let packingcode=this.issuestock_Item_Dtls.at(index).get("packing").value;
      let capacity=this.capacity[index];
      let tolerance=this.tolerance[index];
      let packinguom=this.issuestock_Item_Dtls.at(index).get("packinguom").value;
      let itemuom=this.issuestock_Item_Dtls.at(index).get("itemuom").value;
      let Issuetype=this.userForm.get("issuetype").value;
      let Requisitionno=this.userForm.get("requisitionno").value;
      let Reqpackingqty= this.issuestock_Item_Dtls.at(index).get("reqpackingqty").value;
      let Reqitemqty=this.issuestock_Item_Dtls.at(index).get("reqitemqty").value;

      let packqty=this.issuestock_Item_Dtls.at(index).get("packingqty").value;
      let itemqty=this.issuestock_Item_Dtls.at(index).get("itemqty").value;
      console.log(packqty + " /  tu " + itemqty)

      let id =this.userForm.get("id").value;
     
      if(id == null || id =='')
      {
        id=0;
      
      }
        //  console.log(" checking "+this.issuestock_Item_Dtls.at(index).get("reqpackingqty").value + " / " + this.issuestock_Item_Dtls.at(index).get("reqitemqty").value)
     
      let dialogRef = this.dialog.open(IsssuestockitempopupComponent,{data: {itemcode:itemcode ,packingcode:packingcode,capacity:capacity,packinguom:packinguom,itemuom:itemuom,tolerance:tolerance,
        issuetype:Issuetype,requisitionno:Requisitionno,reqpackingqty:Reqpackingqty,reqitemqty:Reqitemqty,id:id,packqty:packqty,itemqty:itemqty}, height: '40%',
      width: '80%'});
      dialogRef.afterClosed().subscribe( data => 
      {
        console.log(JSON.stringify(data))
        if(data != '')
        {
          this.issuestock_Item_Dtls.at(index).patchValue({itemqty:data.issuepopup_Item_Dtls[0]["issueitemqty"],packingqty:data.issuepopup_Item_Dtls[0]["issuepackingqty"]});
        }
        
      });  
  }


  onChangeRequisitionno(event)
  {
    if(event.length)
    {
      
      console.log("event :: " + event)
      forkJoin(
      this.DropDownListService.getRequisitionitemdetails(event),
      this.DropDownListService.getRequisition(event)
      ).subscribe(([requisitionitem,requisition])=>
      {
        //console.log(JSON.stringify(requisitionitem))
        //console.log(JSON.stringify(requisition))
        this.userForm.patchValue({requesteddate:requisition["requesteddate"]});
        let k = 0;
          this.addItems();
          this.item_sl_no = 0;
          while (this.issuestock_Item_Dtls.length) 
          {
             this.issuestock_Item_Dtls.removeAt(0);
          }
          for(let data1 of requisitionitem)
          { 
            
            this.addItems();
            forkJoin(
              this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
              this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"],this.company_name)
            ).subscribe(([packingList, capacityEmptyWt])=>
              {
                this.status = true;
                this.capacity[k] = capacityEmptyWt.capacity;
                this.empty_bag_wt[k] =  capacityEmptyWt.empty_big_wt;
                this.tolerance[k]=capacityEmptyWt.tolerance;

                this.selectedPackingItem[k] = data1["packing"];
                this.selectedItemName[k] = data1["item_code"];

                this.packingItem[k] = packingList; 
                this.issuestock_Item_Dtls.at(k).patchValue(data1);
                this.issuestock_Item_Dtls.at(k).patchValue({toleranceqty:data1["itemqty"],itemqty:'0',packingqty:'0',reqpackingqty:data1["packingqty"],reqitemqty:data1["itemqty"]});
               
              
                k = k + 1;
              });
          }
      });
    }
  }

  send()
  {
    this.Id= this.userForm.get("id").value as FormControl; 
    this.userForm.patchValue({ company_id: localStorage.getItem("company_name"),
      fin_year:localStorage.getItem("financial_year"), 
      username: localStorage.getItem("username")});
      console.log("username:"+localStorage.getItem("username"))
      this.status=false;

      if(this.userForm.get("issueno").value == '' || this.userForm.get("issueno").value == 0 || this.userForm.get("issueno").value == null)
      {
        alert("Please Enter Issue No!")
        this.status=true;
      }
      else if(this.userForm.get("business_unit").value == '' || this.userForm.get("business_unit").value == 0 || this.userForm.get("business_unit").value == null)
      {
        alert("Please Select Bussiness Unit Name!")
        this.status=true;
      }
      else if(this.userForm.get("issueto").value == '' || this.userForm.get("issueto").value == 0 || this.userForm.get("issueto").value == null)
      {
        alert("Please Select Issue To!")
        this.status=true;
      }
      else if(this.userForm.get("issuetype").value == '' || this.userForm.get("issuetype").value == 0 || this.userForm.get("issuetype").value == null)
      {
        alert("Please Select Issue Type!")
        this.status=true;
      }
      // else if(this.userForm.get("requisitionno").value == '' || this.userForm.get("requisitionno").value == 0 || this.userForm.get("requisitionno").value == null)
      // {
      //   alert("Please Select Requisition No!")
      //   this.status=true;
      // }
      else if(this.userForm.get("requestedby").value == '' || this.userForm.get("requestedby").value == 0 || this.userForm.get("requestedby").value == null)
      {
        alert("Please Select Request By!")
        this.status=true;
      }
      else if(this.userForm.get("approvedby").value == '' || this.userForm.get("approvedby").value == 0 || this.userForm.get("approvedby").value == null)
      {
        alert("Please Select Approved By!")
        this.status=true;
      }
      else
      {
          if(this.Id>0)
          {
            this.Service.updateIssueStock(this.userForm.getRawValue(),this.Id).subscribe( data => 
              {
                alert("Issue Stock Updated successfully.");
                this.userForm.reset();
                this.isHidden = false;
                this.showList('list');
                this.ngOnInit();
                this.status=true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is Occured Issue Stock Report !!! please Reload the page and try again....");
              }); 
          }
          else
          {
            this.Service.createIssueStock(this.userForm.getRawValue())
            .subscribe(data =>
            {
              alert("Issue Stock Saved successfully.");
              this.userForm.reset();
              this.showList('list');
              this.ngOnInit();
              this.status=true;
            }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is Occured Issue Stock Report !!! please Reload the page and try again....");
            });
          }
        }
      }

  onUpdate(id,issueno,action)
  {
    this.isHidden=true;
    if(action == "view")
    {
      this.issuestocksave=false;
    }
    if(action == "update")
    {
      this.issuestocksave=true;
    }
    this.packingItem = [];
    this.status=false;
   
    forkJoin(
      this.DropDownListService.retriveIssueStock(id),
      this.DropDownListService.getcompanyBUMNCListnew(this.company_name),
      this.DropDownListService.getEmployeeNamenew(this.company_name),
      //this.DropDownListService.getItemThruPurchase(),
      this.DropDownListService.getItemThruPurchasenew(),
      this.DropDownListService.getIssueItemDetails(issueno),
      ).subscribe(([issuedata,bUnitData,emplist,ItemData,itemDetails])=>
      {
        this.bussiness_unit_list=bUnitData;
        this.employeeNames=emplist;
        this.item_codes=ItemData; 
        this.userForm.patchValue(issuedata);
        this.onChangeRequisition();
        this.onChangeBuUnit(issuedata["business_unit"]);
       
        this.userForm.patchValue({requesteddate:issuedata["requesteddate"]});
       
        if(issuedata["requisitionno"]=="NA")
        {
          console.log(" if ")
          let k = 0;  
          this.addItems()
          this.slno = 0;
          while (this.issuestock_Item_Dtls.length) 
          this.issuestock_Item_Dtls.removeAt(0);
          for(let data1 of itemDetails)
          { 
            this.status = false;
            forkJoin(
              this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
              this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"],this.company_name)
            ).subscribe(([packingList, capacityEmptyWt])=>
              {
                this.status = true;
                this.addItems();
                this.packingItem[k] = packingList;  
                this.capacity[k] = capacityEmptyWt.capacity;
                this.empty_bag_wt[k] =  capacityEmptyWt.empty_big_wt;
                this.tolerance[k]=capacityEmptyWt.tolerance;

                this.selectedPackingItem[k] = data1["packing"];
                this.selectedItemName[k] = data1["item_code"];
                this.issuestock_Item_Dtls.at(k).patchValue(data1);
                k = k + 1;
              });
            }
          
        }
        else
        {
          console.log(" else ")
          this.DropDownListService.getRequisitionitemdetails(issuedata["requisitionno"]).subscribe(data=>
            {
              console.log(" check "+JSON.stringify(data))

              let k = 0;  
              this.addItems()
              this.slno = 0;
              while (this.issuestock_Item_Dtls.length) 
              this.issuestock_Item_Dtls.removeAt(0);
              for(let data1 of itemDetails)
              { 
                this.status = false;
                forkJoin(
                  this.DropDownListService.getItemMasterPackMat(data1["item_code"]),
                  this.DropDownListService.getItemPackUom(data1["item_code"], data1["packing"],this.company_name)
                ).subscribe(([packingList, capacityEmptyWt])=>
                  {
                    this.status = true;
                    this.addItems();
                    this.packingItem[k] = packingList;  
                    this.capacity[k] = capacityEmptyWt.capacity;
                    this.empty_bag_wt[k] =  capacityEmptyWt.empty_big_wt;
                    this.tolerance[k]=capacityEmptyWt.tolerance;
    
                    this.selectedPackingItem[k] = data1["packing"];
                    this.selectedItemName[k] = data1["item_code"];
                    this.issuestock_Item_Dtls.at(k).patchValue(data1);
                    for(let v=0;v<data.length ;v++)
                    {
                      if(data[v]["item_code"] ==this.issuestock_Item_Dtls.at(k).get("item_code").value && data[v]["packing"] ==this.issuestock_Item_Dtls.at(k).get("packing").value )
                      {
                        this.issuestock_Item_Dtls.at(k).patchValue({toleranceqty:data[v]["itemqty"],reqpackingqty:data[v]["packingqty"],reqitemqty:data[v]["itemqty"]});
                      }
                    }    
                    k = k + 1;
                  });
                }


                
            })
        }

       
  
           this.status = true;
       }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured in power cut,please try again....");
       this.ngOnInit()}); 
  }
  
onDelete(id)
{
  this.status=false;
  if(confirm("Are you sure to delete this Issue Stock?"))
  {
    this.userForm.patchValue({username: localStorage.getItem("username")});
   
        this.Service.deleteIssueStock(this.userForm.getRawValue(),id).subscribe(data=> 
          {
            alert("Issue Stock Deleted successfully.");
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
