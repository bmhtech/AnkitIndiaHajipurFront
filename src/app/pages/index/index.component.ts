import { Component, OnInit } from '@angular/core';
// import { ChartsService } from '../charts/components/echarts/charts.service';
import { Router, NavigationStart } from '@angular/router';
import { PlatformLocation, LocationStrategy  } from '@angular/common';
import { GlobalService } from '../../shared/services/global.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  //providers: [ChartsService]
})
export class IndexComponent implements OnInit {
  showloading: boolean = false;
  purchaseorder: boolean = false;
  purchasegrn: boolean = false;
  purchasebill: boolean = false;
  purchasereturnApproval: boolean = false;
  purchasereturnNote: boolean = false;
  debitnote: boolean = false;
  salesorder: boolean = false;
  deliverychallan: boolean = false;
  salesinvoice: boolean = false;
  returnappNote: boolean = false;
  salesreturnNote: boolean = false;
  creditnote: boolean = false;
  tagadviceWithPo: boolean = false;
  loadadvice: boolean = false;
  unloadadvice: boolean = false;
  kata: boolean = false;
  gatepasschecklist: boolean = false;
  gatein: boolean = false;
  gateoutauthorization: boolean = false;
  gatepassgateout: boolean = false;
  purchase: boolean = false;
  sales: boolean = false;
  weight: boolean = false;
  gatepass: boolean = false;
  user_name:any;
  production:boolean = false;
  
  public AnimationBarOption;

 url:string;
  constructor( private router: Router, private location: PlatformLocation,private _globalService: GlobalService)
   { 

   // this._globalService.dataBusChanged('isActived', item);
    //
    let item = JSON.stringify({"path":"index","title":"Dashboard","icon":"dashboard","routerLink":["/","pages","index"],"isActive":true});

    this._globalService.dataBusChanged('isActived', item);

      history.pushState(null, null, null);
      location.onPopState(() => {
       this.url = JSON.stringify(window.location);
       if(this.url.includes("pages/index")) 
       history.pushState(null, null, null);});

      
       
  }
 

  ngOnInit() {
    // this.AnimationBarOption = this._chartsService.getAnimationBarOption();
    localStorage.setItem("loginstatus",'1');
    this.user_name = localStorage.getItem("username");
    console.log("Username  "+this.user_name )
    if(this.user_name == 'JITESH' || this.user_name == 'ANUJ' || this.user_name == 'RADHIKA' || this.user_name == 'KHUSBOO' || this.user_name == 'superaayog')
    {
      this.purchase=true;
      this.sales=true;
      this.weight=true;
      this.gatepass=true;
      this.purchaseorder=true;
      this.purchasegrn=true;
      this.purchasebill=true;
      this.purchasereturnApproval=true;
      this.purchasereturnNote=true;
      this.debitnote=true;
      this.salesorder=true;
      this.deliverychallan=true;
      this.salesinvoice=true;
      this.returnappNote=true;
      this.salesreturnNote=true;
      this.creditnote=true;
      this.tagadviceWithPo=true;
      this.loadadvice=true;
      this.unloadadvice=true;
      this.kata=true;
      this.gatepasschecklist=true;
      this.gatein=true;
      this.gateoutauthorization=true;
      this.gatepassgateout=true;
      this.production=true;
    }
    else if(this.user_name == 'RAKESH')
    {
      this.purchase=true;
      this.sales=true;
      this.weight=true;
      this.purchaseorder=true;
      this.purchasegrn=true;
      this.purchasebill=true;
      this.purchasereturnApproval=true;
      this.purchasereturnNote=true;
      this.debitnote=true;
      this.salesorder=true;
      this.deliverychallan=true;
      this.salesinvoice=true;
      this.returnappNote=true;
      this.salesreturnNote=true;
      this.creditnote=true;
      this.tagadviceWithPo=true;
      this.loadadvice=true;
      this.unloadadvice=true;
      this.kata=true;
    }
    else if(this.user_name == 'ASHISH')
    {
      this.purchase=true;
      this.sales=true;
      this.weight=true;
      this.purchaseorder=true;
      this.purchasegrn=true;
      this.purchasebill=true;
      this.purchasereturnApproval=true;
      this.purchasereturnNote=true;
      this.debitnote=true;
      this.salesorder=true;
      this.deliverychallan=true;
      this.salesinvoice=true;
      this.returnappNote=true;
      this.salesreturnNote=true;
      this.creditnote=true;
      this.tagadviceWithPo=true;
      this.loadadvice=true;
      this.unloadadvice=true;
      this.kata=true;
    }
    else if(this.user_name == 'AMIT')
    {
      this.weight=true;
      this.gatepass=true;
      this.loadadvice=true;
      this.unloadadvice=true;
      this.kata=true;
      this.gatein=true;
    }
    else if(this.user_name == 'PRATIM')
    {
      this.purchase=true;
      this.sales=true;
      this.weight=true;
      this.gatepass=true;
      this.purchaseorder=true;
      this.purchasegrn=true;
      this.purchasebill=true;
      this.purchasereturnApproval=true;
      this.purchasereturnNote=true;
      this.debitnote=true;
      this.salesorder=true;
      this.deliverychallan=true;
      this.salesinvoice=true;
      this.returnappNote=true;
      this.salesreturnNote=true;
      this.creditnote=true;
      this.tagadviceWithPo=true;
      this.loadadvice=true;
      this.unloadadvice=true;
      this.kata=true;
      this.gatepasschecklist=true;
      this.gatein=true;
      this.gateoutauthorization=true;
      this.gatepassgateout=true;
    }
    else if(this.user_name == 'SAMAR')
    {

    }
    else if(this.user_name == 'AMITKR')
    {
      this.purchase=true;
      this.sales=true;
      this.weight=true;
      this.purchaseorder=true;
      this.purchasegrn=true;
      this.purchasebill=true;
      this.purchasereturnApproval=true;
      this.purchasereturnNote=true;
      this.debitnote=true;
      this.salesorder=true;
      this.deliverychallan=true;
      this.salesinvoice=true;
      this.returnappNote=true;
      this.salesreturnNote=true;
      this.creditnote=true;
      this.tagadviceWithPo=true;
      this.loadadvice=true;
      this.unloadadvice=true;
      this.kata=true;
    }
    else if(this.user_name == 'Production')
    {
      this.production=true;
    }
    else
    {
      this.purchase=false;
      this.sales=false;
      this.weight=false;
      this.gatepass=false;
      this.purchaseorder=false;
      this.purchasegrn=false;
      this.purchasebill=false;
      this.purchasereturnApproval=false;
      this.purchasereturnNote=false;
      this.debitnote=false;
      this.salesorder=false;
      this.deliverychallan=false;
      this.salesinvoice=false;
      this.returnappNote=false;
      this.salesreturnNote=false;
      this.creditnote=false;
      this.tagadviceWithPo=false;
      this.loadadvice=false;
      this.unloadadvice=false;
      this.kata=false;
      this.gatepasschecklist=false;
      this.gatein=false;
      this.gateoutauthorization=false;
      this.gatepassgateout=false;
    }
  
  }

  purchaseOrder()
  {
    window.open("#/pages/invTrans/purchase/purchase-order");
  }
  purchaseGrn()
  {
    window.open("#/pages/invTrans/purchase/grn");
  }
  purchaseBill()
  {
    window.open("#/pages/invTrans/purchase/purchase-bill");
  }
  purchaseReturnApproval()
  {
    window.open("#/pages/invTrans/purchase/pur-return-approval-note");
  }
  purchaseReturnNote()
  {
    window.open("#/pages/invTrans/purchase/pur-return-note");
  }
  debitNote()
  {
    window.open("#/pages/invTrans/purchase/debit-note");
  }
  salesOrder()
  {
    window.open("#/pages/invTrans/salestransaction/SalesOrder");
  }
  deliveryChallan()
  {
    window.open("#/pages/invTrans/salestransaction/DeliveryChallan");
  }
  salesInvoice()
  {
    window.open("#/pages/invTrans/salestransaction/SalesInvoice");
  }
  returnAppNote()
  {
    window.open("#/pages/invTrans/salestransaction/ReturnApprovalNote");
  }
  salesReturnNote()
  {
    window.open("#/pages/invTrans/salestransaction/SalesReturnNote");
  }
  creditNote()
  {
    window.open("#/pages/invTrans/salestransaction/CreditNote");
  }
  tagAdviceWithPo()
  {
    window.open("#/pages/invTrans/weighment/TagAdviceWithPo");
  }
  loadAdvice()
  {
    window.open("#/pages/invTrans/weighment/loadingAdvice");
  }
  unloadAdvice()
  {
    window.open("#/pages/invTrans/weighment/unloadAdvice");
  }
  weighment()
  {
    window.open("#/pages/invTrans/weighment/unloadWeightment");
  }
  gatepassCheckList()
  {
    window.open("#/pages/invTrans/gatepass/gatepass_checklist");
  }
  gateIn()
  {
    window.open("#/pages/invTrans/gatepass/gatepass-gatin");
  }
  gateOutAuthorization()
  {
    window.open("#/pages/invTrans/gatepass/gatepass-gateout-a");
  }
  gatePassGateOut()
  {
    window.open("#/pages/invTrans/gatepass/gatepass-geteout");
  }
  productiontransreg()
  {
    window.open("#/pages/invTrans/production/production-transaction");
  }
  productiontransspc()
  {
    window.open("#/pages/invTrans/production/production-transaction-special");
  }
}
