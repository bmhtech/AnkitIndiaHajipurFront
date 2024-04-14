import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DropdownServiceService } from '../../../../../../service/dropdown-service.service';
import { Master } from '../../../../../../service/master.service';
import { forkJoin } from 'rxjs';
import { formatDate } from '@angular/common';
import { ExcelService } from '../../../../../../service/excel.service';

@Component({
  selector: 'app-pur-order-misc-rep-popup',
  templateUrl: './pur-order-misc-rep-popup.component.html',
  styleUrls: ['./pur-order-misc-rep-popup.component.scss']
})
export class PurOrderMiscRepPopupComponent implements OnInit {

  poid:any = [];
  status = false;
  fromdate:any;
  todate:any;
  catagory:any;
  po_value:any='';
  PurchaseorderList:any=[];
  pur_order_item:any=[];

  bags:number=0;
  qty:number=0;
  price:number=0;
  gamt:number=0;
  disc:number=0;
  qcded:number=0;
  daladriv:number=0;
  upf:number=0;
  tchgs:number=0;
  deds:number=0;
  fadv:number=0;
  mois:number=0;
  dala:number=0;
  upbrok:number=0;
  qc:number=0;
  wbchrgs:number=0;
  ofcexp:number=0;
  hdpe:number=0;
  tds:number=0;
  freadv:number=0;
  tax:number=0;
  add:number=0;
  minus:number=0;
  roffamt:number=0;
  payparty:number=0;
  i:number=0;

  bags1:any=[];
  qty1:any=[];
  price1:any=[];
  gamt1:any=[];
  disc1:any=[];
  qcded1:any=[];
  daladriv1:any=[];
  upf1:any=[];
  tchgs1:any=[];
  deds1:any=[];
  fadv1:any=[];
  mois1:any=[];
  dala1:any=[];
  upbrok1:any=[];
  qc1:any=[];
  wbchrgs1:any=[];
  ofcexp1:any=[];
  hdpe1:any=[];
  tds1:any=[];
  freadv1:any=[];
  tax1:any=[];
  add1:any=[];
  minus1:any=[];
  roffamt1:any=[];
  payparty1:any=[];

  constructor( private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,private excelService:ExcelService,
    private dialogRef: MatDialogRef<PurOrderMiscRepPopupComponent>, @Inject(MAT_DIALOG_DATA)data)
    {
      this.poid=data['poid'];
      this.fromdate=data['fromdate'];
      this.todate=data['todate'];
      this.catagory=data['catagory'];
    }

  ngOnInit() 
  {
    let arr=[];
   
    arr= this.poid;


    let unique = arr.filter((item, i, ar) => ar.indexOf(item) === i);

    // for(let k=0;k<unique.length;k++)
    // {
    //   this.PurchaseorderList.push(unique[k]);
    //   console.log(unique[k])
    // }

    this.bags=0;
    this.qty=0;
    this.price=0;
    this.gamt=0;
    this.disc=0;
    this.qcded=0;
    this.daladriv=0;
    this.upf=0;
    this.tchgs=0;
    this.deds=0;
    this.fadv=0;
    this.mois=0;
    this.dala=0;
    this.upbrok=0;
    this.qc=0;
    this.wbchrgs=0;
    this.ofcexp=0;
    this.hdpe=0;
    this.tds=0;
    this.freadv=0;
    this.tax=0;
    this.add=0;
    this.minus=0;
    this.roffamt=0;
    this.payparty=0;

    this.status=false;
    forkJoin(
      this.DropDownListService.getpoitemdetailsreport(unique),
      this.DropDownListService.getExecutionpo(unique)
      ).subscribe(([data,exc])=>
        {
            console.log("Check data: "+JSON.stringify(data));
            this.pur_order_item=data;
            this.PurchaseorderList=exc;
            console.log(JSON.stringify(exc));

            for(let purorder of exc )
            {
              
            for(let totsum of data)
            {
             
              if(totsum["pur_orderid"] ==  purorder["pur_orderid"])
              {


                if(this.po_value != totsum["pur_orderid"])
                {
                  console.log("pur_orderid: "+totsum["pur_orderid"]);
                  this.bags1[this.i]=this.bags;
                  this.qty1[this.i]=this.qty;
                  this.price1[this.i]=this.price;
                  this.gamt1[this.i]=this.gamt;
                  this.disc1[this.i]=this.disc;
                  this.qcded1[this.i]=this.qcded;
                  this.daladriv1[this.i]=this.daladriv;
                  this.upf1[this.i]=this.upf;
                  this.tchgs1[this.i]=this.tchgs;
                  this.deds1[this.i]=this.deds;
                  this.fadv1[this.i]=this.fadv;
                  this.mois1[this.i]=this.mois;
                  this.dala1[this.i]=this.dala;
                  this.upbrok1[this.i]=this.upbrok;
                  this.qc1[this.i]=this.qc;
                  this.wbchrgs1[this.i]=this.wbchrgs;
                  this.ofcexp1[this.i]=this.ofcexp;
                  this.hdpe1[this.i]=this.hdpe;
                  this.tds1[this.i]=this.tds;
                  this.freadv1[this.i]=this.freadv;
                  this.tax1[this.i]=this.tax;
                  this.add1[this.i]=this.add;
                  this.minus1[this.i]=this.minus;
                  this.roffamt1[this.i]=this.roffamt;
                  this.payparty1[this.i]=this.payparty;
                  
                  this.bags=0;
                  this.qty=0;
                  this.price=0;
                  this.gamt=0;
                  this.disc=0;
                  this.qcded=0;
                  this.daladriv=0;
                  this.upf=0;
                  this.tchgs=0;
                  this.deds=0;
                  this.fadv=0;
                  this.mois=0;
                  this.dala=0;
                  this.upbrok=0;
                  this.qc=0;
                  this.wbchrgs=0;
                  this.ofcexp=0;
                  this.hdpe=0;
                  this.tds=0;
                  this.freadv=0;
                  this.tax=0;
                  this.add=0;
                  this.minus=0;
                  this.roffamt=0;
                  this.payparty=0;
  
                  this.i=this.i+1;
                }
              
              
              this.bags+=Number(totsum["passed_packing_qty"])
              this.qty+=Number(totsum["passed_item_qty"])
              this.price+=Number(totsum["unit_rate"])
              this.gamt+=Number(totsum["gross_amt"])
              this.disc+=Number(totsum["discount"])
              this.qcded+=Number(totsum["qc_deduction"])
              this.daladriv+=Number(totsum["Dala_Charges_Driver"])
              this.upf+=Number(totsum["UP_Front_Brokerage"])
              this.tchgs+=Number(totsum["WB_Truck_Charges_Driver"])
              this.deds+=Number(totsum["Deduction_From_Supplier"])
              this.fadv+=Number(totsum["FREIGHT_ADV"])
              this.mois+=Number(totsum["MOISTURE"])
              this.dala+=Number(totsum["DALA_CHARGES"])
              this.upbrok+=Number(totsum["UP_BROKERAGE"])
              this.qc+=Number(totsum["QUALITY_CLAIM"])
              this.wbchrgs+=Number(totsum["WB_CHARGES"])
              this.ofcexp+=Number(totsum["OFFICE_EXP"])
              this.hdpe+=Number(totsum["HDPE_BAG"])
              this.tds+=Number(totsum["TDS_194Q"])
              this.freadv+=Number(totsum["FREIGHT_ADVANCE"])
              this.tax+=Number(totsum["add_tax"])
              this.add+=Number(totsum["addplus"])
              this.minus+=Number(totsum["addminus"])
              this.roffamt+=Number(totsum["roundoff_amt"])
              this.payparty+=Number(totsum["payable_party"])

              this.po_value=totsum["pur_orderid"];
              }
            }
          }
          console.log("this.bags1[1]: "+this.bags1.length);
          this.bags1[this.i]=this.bags;
                  this.qty1[this.i]=this.qty;
                  this.price1[this.i]=this.price;
                  this.gamt1[this.i]=this.gamt;
                  this.disc1[this.i]=this.disc;
                  this.qcded1[this.i]=this.qcded;
                  this.daladriv1[this.i]=this.daladriv;
                  this.upf1[this.i]=this.upf;
                  this.tchgs1[this.i]=this.tchgs;
                  this.deds1[this.i]=this.deds;
                  this.fadv1[this.i]=this.fadv;
                  this.mois1[this.i]=this.mois;
                  this.dala1[this.i]=this.dala;
                  this.upbrok1[this.i]=this.upbrok;
                  this.qc1[this.i]=this.qc;
                  this.wbchrgs1[this.i]=this.wbchrgs;
                  this.ofcexp1[this.i]=this.ofcexp;
                  this.hdpe1[this.i]=this.hdpe;
                  this.tds1[this.i]=this.tds;
                  this.freadv1[this.i]=this.freadv;
                  this.tax1[this.i]=this.tax;
                  this.add1[this.i]=this.add;
                  this.minus1[this.i]=this.minus;
                  this.roffamt1[this.i]=this.roffamt;
                  this.payparty1[this.i]=this.payparty;
                  
                  this.bags=0;
                  this.qty=0;
                  this.price=0;
                  this.gamt=0;
                  this.disc=0;
                  this.qcded=0;
                  this.daladriv=0;
                  this.upf=0;
                  this.tchgs=0;
                  this.deds=0;
                  this.fadv=0;
                  this.mois=0;
                  this.dala=0;
                  this.upbrok=0;
                  this.qc=0;
                  this.wbchrgs=0;
                  this.ofcexp=0;
                  this.hdpe=0;
                  this.tds=0;
                  this.freadv=0;
                  this.tax=0;
                  this.add=0;
                  this.minus=0;
                  this.roffamt=0;
                  this.payparty=0;

        });
    this.status=true;
  }

  exportAsXLSX():void 
  {
    /*let element = document.getElementById('popopup');
    console.log("fromdate "+this.fromdate+" todate "+this.todate+" catagory "+this.catagory)
    if(this.catagory=='Brokerwise')
    {
      this.excelService.exportAsExcelFile(element, 'RM Purchase Contract Brokerwise As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.fromdate, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.todate, 'dd-MM-yyyy', 'en'));
    }
    if(this.catagory=='Partywise')
    {
      this.excelService.exportAsExcelFile(element, 'RM Purchase Contract Partywise As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.fromdate, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.todate, 'dd-MM-yyyy', 'en'));
    }
    if(this.catagory=='All')
    {
      this.excelService.exportAsExcelFile(element, 'RM Purchase Contract All As On '+formatDate(new Date(), 'dd-MM-yyyy', 'en')+' At '+ new Date().toString().substr(16, 5)+' Report From ' + formatDate(this.fromdate, 'dd-MM-yyyy', 'en') +' To ' + formatDate(this.todate, 'dd-MM-yyyy', 'en'));
    }*/
    //let file = new Blob([$('.popopupc').html()], {type:"application/vnd.ms-excel;charset=utf-8"});
    const str = $('.popopupc').html();

    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    
    function removeEmpty(doc, type) {
      const els = doc.querySelectorAll(type);
      els.forEach(el => {
        //console.log("el.textContent: "+el.textContent +"el.textContentlength: "+el.textContent.length)
        if (el.textContent.length == 53)
        {
        //alert('Avi')
        el.remove();
        }
      });
      return doc;
    }
    
    const els = ['td', 'th', 'tr'];
    
    for (const el of els) {
      removeEmpty(doc, el);
    }
    
    document.body.insertAdjacentHTML('beforeend', doc.body.innerHTML);
    
    //console.log(doc)
  

    let file = new Blob([doc.body.innerHTML], {type:"application/vnd.ms-excel;charset=utf-8"});
    
    

    let url = URL.createObjectURL(file);
    
    
    let filename = 'filename.xls';
    const link = document.createElement('a');
    link.href=url;
    //link.setAttribute('target', '_blank');
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();

    
 }

 

}
