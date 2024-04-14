import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { itemStock } from '../../../../../../Models/ItemModel/itemStock';
import { Master } from '../../../../../../service/master.service';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { forkJoin } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-item-stock',
  templateUrl: './item-stock.component.html',
  styleUrls: ['./item-stock.component.scss']
})
export class ItemStockComponent implements OnInit {
  public userForm:FormGroup;
  model: itemStock = new itemStock();
  status = false;
  isHidden:any;
  stocklist:any = [];
  employeeNames:any=[];
  company_name:any;
  Id:any;
  itemstocksave:boolean=true;
  addhide:boolean=false;
  sl_no:number=1;
  itemList:any=[];
  currentDate:any;
  finyear:any;
  stockDate:any;
  itemid:any;
  packingid:any;
  capacity:any;
  packigqty:any;
  itemqty:number=0;
  dateandfinyear:boolean=false;
  dateandfinyear1:boolean=false;

  constructor(public fb:FormBuilder,private Service: Master,private DropDownListService: DropdownServiceService) 
  { 
    this.userForm=fb.group({
      id:[''],
      stockid:[''],
      entryperson:[''],
      entrydate:[''],
      company_id:[''],
      fin_year:[''],
      username:[''],

      item_stock_dtls: this.fb.array([this.fb.group({
        slno:this.sl_no,
        stockid:'',
        itemname:'',
        itemcode:'',
        packingname:'',
        packingcode:'',
        itemtype:'',
        openitembal:'',
        openpackingbal:'',
        openingdate:'',
        openingfinyear:''
      })])
    });
  }

   get id(){ return this.userForm.get("id") as FormControl }
   get entryperson(){ return this.userForm.get("entryperson") as FormControl }
   get entrydate(){ return this.userForm.get("entrydate") as FormControl }
   get company_id(){ return this.userForm.get("company_id") as FormControl }
   get fin_year(){ return this.userForm.get("fin_year") as FormControl }
   get username(){ return this.userForm.get("username") as FormControl }

   get item_stock_dtls(){return this.userForm.get("item_stock_dtls") as FormArray};

  ngOnInit() {
    this.isHidden=false;
    this.status=true;
    this.dateandfinyear=true;
    this.dateandfinyear1=false;
    this.sl_no=1;
    this.stockDate=formatDate(new Date('2023-04-01'), 'yyyy-MM-dd', 'en');
    this.company_name = localStorage.getItem("company_name");
    this.finyear =localStorage.getItem("financial_year");
    this.currentDate = formatDate(new Date(localStorage.getItem("CurrentDate")), 'yyyy-MM-dd', 'en');
    this.itemstocksave=true;
    this.addhide=true;
    this.capacity=[];

    forkJoin(
      this.DropDownListService.getStocklist(),
      this.DropDownListService.getEmployeeNamenew(this.company_name)
      )
     .subscribe(([stockdata,empdata])=>
      {
       // console.log("stockdata:"+JSON.stringify(stockdata))
          this.stocklist = stockdata;
          this.employeeNames=empdata;
          if(stockdata=='')
          {
            this.addhide=true;
          }
          else{
            this.addhide=false;
          }
      });

  }
  showList(s:string)
  {
    if(s=="add")
    {
      this.status = false;
      this.isHidden=true;
      this.itemstocksave=true;
      this.DropDownListService.getAllItemFromStockView().subscribe(itemview=>  
        {
          let k=0;
          this.sl_no = 0;
          while (this.item_stock_dtls.length) 
          this.item_stock_dtls.removeAt(0);
          for(let data1 of itemview)
          {   
            this.addItems();
            
            this.item_stock_dtls.at(k).patchValue({itemname:data1["itemname"],itemcode:data1["itemcode"],packingname:data1["packingname"],packingcode:data1["packingcode"],itemtype:data1["item_type"]});
            k++;
          }
        });
        this.status = true;
    }
    if(s=="list")
    {
      this.isHidden=false;
      this.userForm.reset();
      this.ResetAllValues();
    }
  }
  ResetAllValues()
  {
    return this.userForm=this.fb.group({
      id:[''],
      stockid:[''],
      entryperson:[''],
      entrydate:[''],
      company_id:[''],
      fin_year:[''],
      username:[''],

      item_stock_dtls: this.fb.array([this.fb.group({
        slno:this.sl_no,
        stockid:'',
        itemname:'',
        itemcode:'',
        packingname:'',
        packingcode:'',
        itemtype:'',
        openitembal:'',
        openpackingbal:'',
        openingdate:'',
        openingfinyear:''
      })])
    });
  }

  addItems()
  {
   this.sl_no =this.item_stock_dtls.length +1; 
    this.item_stock_dtls.push(this.fb.group({
      slno:this.sl_no,
      stockid:'',
      itemname:'',
      itemcode:'',
      packingname:'',
      packingcode:'',
      itemtype:'',
      openitembal:'',
      openpackingbal:'',
      openingdate:'',
      openingfinyear:''
       }))
    }
    //openitembal
    getItemWt(index)
    {
      this.status=false;
      this.itemid =  this.item_stock_dtls.at(index).get("itemcode").value as FormControl;
      this.packingid =  this.item_stock_dtls.at(index).get("packingcode").value as FormControl;
      this.packigqty =  this.item_stock_dtls.at(index).get("openpackingbal").value as FormControl;
      
      this.DropDownListService.getItemPackUom(this.itemid,this.packingid,this.company_name).subscribe(capacitydata=>  
        {
          //console.log(this.capacity[index]+"capacitydata:"+JSON.stringify(capacitydata))
          this.capacity[index] = capacitydata.capacity;
          this.itemqty = Math.round(this.capacity[index] * this.packigqty);
          console.log(this.capacity[index]+"enter here:"+this.packigqty+"///"+this.itemqty)
          this.item_stock_dtls.at(index).patchValue({openitembal:this.itemqty});
        });
        this.status=true;; 
    }

    send()
    {
      this.Id= this.userForm.get("id").value as FormControl; 
      this.userForm.patchValue({ company_id: localStorage.getItem("company_name"),
        fin_year:localStorage.getItem("financial_year"), 
        username: localStorage.getItem("username")});
        this.status=false;
  
        if(this.userForm.get("entryperson").value == '' || this.userForm.get("entryperson").value == 0 || this.userForm.get("entryperson").value == null)
        {
          alert("Please Select Entry Person Name!")
          this.status=true;
          }
        else if(this.userForm.get("entrydate").value == '' || this.userForm.get("entrydate").value == 0 || this.userForm.get("entrydate").value == null)
        {
          alert("Please Select Entry Date!")
          this.status=true;
        }
        else
        {
            if(this.Id>0)
            {
              this.Service.updateItemStock(this.userForm.getRawValue(), this.Id).subscribe( data => 
                {
                  alert("Item Stock Updated successfully.");
                  this.userForm.reset();
                  this.isHidden = false;
                  this.showList('list');
                  this.ngOnInit();
                  this.status=true;
                }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured On Item Stock !!! please Reload the page and try again....");
                }); 
            }
            else
            {
              this.Service.createItemStock(this.userForm.getRawValue())
              .subscribe(data =>
              {
                alert("Item Stock Saved successfully.");
                this.userForm.reset();
                this.showList('list');
                this.ngOnInit();
                this.status=true;
              }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured On Item Stock!!! please Reload the page and try again....");
              });
            }
          }
        }

        onUpdate(id,stockid,action)
        {
          this.status = false;
          this.isHidden=true;
          if(action == "view")
          {
            this.itemstocksave=false;
            this.dateandfinyear=false;
            this.dateandfinyear1=true;
          }
          if(action == "update")
          {
            this.itemstocksave=true;
            this.dateandfinyear=false;
            this.dateandfinyear1=true;
          }

         // this.stockDate=formatDate(new Date('2023-04-01'), 'yyyy-MM-dd', 'en');
         // this.finyear =localStorage.getItem("financial_year");

          forkJoin(
            this.DropDownListService.retriveItemStock(id),
            this.DropDownListService.getEmployeeNamenew(this.company_name),
            this.DropDownListService.retriveStockDetails(stockid),
            
            ).subscribe(([stock,empdata,stockdetails])=>
            {
              this.status = false;
              console.log("stockdetails:"+JSON.stringify(stockdetails))
              this.employeeNames=empdata;
              this.userForm.patchValue(stock);
              let k=0;
              this.sl_no = 0;
              while (this.item_stock_dtls.length) 
              this.item_stock_dtls.removeAt(0);
              for(let data1 of stockdetails)
              {   
                this.addItems();
                
                this.item_stock_dtls.at(k).patchValue({itemname:data1["itemname"],itemcode:data1["itemcode"],
                packingname:data1["packingname"],packingcode:data1["packingcode"],itemtype:data1["itemtype"],
                openitembal:data1["openitembal"],openpackingbal:data1["openpackingbal"],
                openingdate:data1["openingdate"],openingfinyear:data1["openingfinyear"]});
                k++;
              }
              this.status = true;
             }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured On Item Stock,please try again....");
             this.ngOnInit()}); 
          this.status = false;
        }

}
