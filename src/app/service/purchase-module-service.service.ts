import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

import{apiconfig} from '../Configuration/ApiConfig';
import{Indent, IndentorderDetails, pur_Indent_docs} from '../Models/transaction/PurchaseTransaction/IndentOrder';
import{Enquiry} from '../Models/transaction/PurchaseTransaction/PurchaseEnquiry';
import{Purl1Selection} from '../Models/transaction/PurchaseTransaction/Purchase_l1_selection';
import{Quotation} from '../Models/transaction/PurchaseTransaction/PurchaseQuotation';
import{QualityCheck} from '../Models/transaction/PurchaseTransaction/QualityCheck';
import{PurchaseGRN, ReceiptItemDetails, ReceiptOtherInformation, Pur_good_receipt_broker, RecieptTransInfo, BusinessPartnerdetails, ReceiptResourceCost, pur_good_receipt_docs} from '../Models/transaction/PurchaseTransaction/PurchaseGRN';
import{PurchaseOrder} from '../Models/transaction/PurchaseTransaction/PurchaseOrder';


import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { PurchaseBill } from '../Models/transaction/PurchaseTransaction/purchase-bill';
import { DriverMasterPopup } from '../Models/Weightment/driver-master-popup';
import { Vehicle } from '../Models/InventoryModel/vehicle';
import { StateMaster } from '../Models/OtherMaster/StateMaster';


@Injectable({
  providedIn: 'root'
})
export class PurchaseModuleServiceService {
  url:String;
  constructor( private httpClient: HttpClient,config:apiconfig) { 
    this.url=config.url;
  }

//Indent order
public createPurchaseIndent(Indent): Observable<Indent> {
  //alert();
   return this.httpClient.post<Indent>(this.url+"createPurchaseIndent", Indent).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
 }
 getPurchaseIndents(): Observable<Indent[]>{
  return this.httpClient.get<Indent[]>(this.url+'getPurchaseIndents').pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
}

//purchase enquiry
public createPurchaseEnquiry(Enquiry): Observable<Enquiry> {
  //alert();
   return this.httpClient.post<Enquiry>(this.url+'createPurchaseEnquiry',Enquiry).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
 }

 getPurchaseEnquiries(): Observable<Enquiry[]>{
  return this.httpClient.get<Enquiry[]>(this.url+'getPurchaseEnquiries').pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
}
public createVehiclepopup(Vehicle) : Observable<Vehicle> {
  //alert();
  return this.httpClient.post<Vehicle>(this.url+"createVehiclepopup", Vehicle).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
}

//purchase Order
// public createPurchaseOrder(PurchaseOrder): Observable<PurchaseOrder> {
//   //alert();
//    return this.httpClient.post<PurchaseOrder>(this.url+'createPurchaseOrder',PurchaseOrder).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
//  }
 public createPurchaseOrder(formdata:FormData) : Observable<PurchaseOrder> {
  //alert();
  return this.httpClient.post<PurchaseOrder>(this.url+"createPurchaseOrder", formdata).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
}
 getPurchaseOrders(): Observable<PurchaseOrder[]>{
  return this.httpClient.get<PurchaseOrder[]>(this.url+'getPurchaseOrders').pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
}
public deletePurchaseOrder(PurchaseOrder,id) : Observable<any>
{
  return this.httpClient.put<PurchaseOrder>(this.url+'deletePurchaseOrder/'+id,PurchaseOrder).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
}

//l1 selection
public createPurchaseL1Selection(Purl1Selection): Observable<Purl1Selection> {
  //alert();
   return this.httpClient.post<Purl1Selection>(this.url+'createPurchaseL1Selection',Purl1Selection).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
 }

 getPurchaseL1Selection(): Observable<Purl1Selection[]>{
  return this.httpClient.get<Purl1Selection[]>(this.url+'getPurchaseL1Selection').pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
}

//purchase uotation
public createPurchaseQuotation(Quotation): Observable<Quotation> {
  //alert();
   return this.httpClient.post<Quotation>(this.url+'createPurchaseQuotation',Quotation).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
 }

 getPurchaseQuotations(): Observable<Quotation[]>{
  return this.httpClient.get<Quotation[]>(this.url+'getPurchaseQuotations').pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
}
//purchase quality check
public createPurchaseQualityCheck(QualityCheck): Observable<QualityCheck> {
  //alert();
   return this.httpClient.post<QualityCheck>(this.url+'createPurchaseQualityCheck',QualityCheck).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
 }
 
 public updatePurchaseQualityCheck(QualityCheck,id): Observable<QualityCheck> {
  return this.httpClient.put<QualityCheck>(this.url+'updatePurchaseQualityCheck/'+id,QualityCheck).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
}
    
public deletePurchaseQualityCheck(QualityCheck,id): Observable<QualityCheck> {
  return this.httpClient.put<QualityCheck>(this.url+'deletePurchaseQualityCheck/'+id, QualityCheck).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
}

 getPurchaseQualityCheck(): Observable<QualityCheck[]>{
  return this.httpClient.get<QualityCheck[]>(this.url+'getPurchaseQualityCheck').pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
}

//purchase grn

public createPurchaseGoodReceipt(PurchaseGRN): Observable<PurchaseGRN> {
  //alert();
   return this.httpClient.post<PurchaseGRN>(this.url+'createPurchaseGoodReceipt',PurchaseGRN).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
 }

 getPurchaseGoodReceipt(): Observable<PurchaseGRN[]>{
  return this.httpClient.get<PurchaseGRN[]>(this.url+'getPurchaseGoodReceipt').pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
}

public deleteGRN(PurchaseGRN,id) : Observable<any>
{
  return this.httpClient.put<PurchaseGRN>(this.url+'deleteGRN/'+id,PurchaseGRN).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
}
retrivePurchaseGoodReceipt(id:any): Observable<PurchaseGRN>{ return this.httpClient.get<PurchaseGRN>(this.url+'retrivePurchaseGoodReceipt/'+id).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));}
grnItemDtlsRetriveList(grn_id:string): Observable<ReceiptItemDetails[]>{ return this.httpClient.get<ReceiptItemDetails[]>(this.url+'getPurGoodRcptItemDtlsList/'+grn_id).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));}
grnOtherInfoRetriveList(grn_id:string): Observable<ReceiptOtherInformation>{ return this.httpClient.get<ReceiptOtherInformation>(this.url+'grnOtherInfoRetriveList/'+grn_id).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));}
grnBrokerRetriveList(grn_id:string): Observable<Pur_good_receipt_broker[]>{ return this.httpClient.get<Pur_good_receipt_broker[]>(this.url+'getPurGoodRcptBrokerList/'+grn_id).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));}
grnTransInfoRetriveList(grn_id:string): Observable<RecieptTransInfo>{ return this.httpClient.get<RecieptTransInfo>(this.url+'grnTransInfoRetriveList/'+grn_id).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));}    
grnBPDtlsRetriveList(grn_id:string): Observable<BusinessPartnerdetails>{ return this.httpClient.get<BusinessPartnerdetails>(this.url+'getPurGoodRcptBPDtls/'+grn_id).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));}
grnResourceCostRetriveList(grn_id:string): Observable<ReceiptResourceCost[]>{ return this.httpClient.get<ReceiptResourceCost[]>(this.url+'grnResourceCostRetriveList/'+grn_id).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));}
grnDocRetriveList(grn_id:string): Observable<pur_good_receipt_docs[]>{ return this.httpClient.get<pur_good_receipt_docs[]>(this.url+'getPurGoodRcptDocList/'+grn_id).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));}
retrivePurchaseGoodReceiptPopup(id:any): Observable<any>{ return this.httpClient.get<any>(this.url+'retrivePurchaseGoodReceiptPopup/'+id).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));}
retrivePurchaseGRNUnloadAdvicePopup(id:any): Observable<any>{ return this.httpClient.get<any>(this.url+'retrivePurchaseGRNUnloadAdvicePopup/'+id).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));}
retrivePurchaseGRNMultipleUnloadAdvicePopup(id:any): Observable<any>{ return this.httpClient.get<any>(this.url+'retrivePurchaseGRNMultipleUnloadAdvicePopup/'+id).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));}
retriveGRNItemFormultiple(id:any): Observable<any>{ return this.httpClient.get<any>(this.url+'retriveGRNItemFormultiple/'+id).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));}


grnItemDtlsRetriveListFast(grnid): Observable<any> {
  return this.httpClient.get<any>(this.url + 'grnItemDtlsRetriveListFast/' + grnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
}
grnOtherInfoRetriveListFast(grnid): Observable<any> {
  return this.httpClient.get<any>(this.url + 'grnOtherInfoRetriveListFast/' + grnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
}
grnBrokerRetriveListFast(grnid): Observable<any> {
  return this.httpClient.get<any>(this.url + 'grnBrokerRetriveListFast/' + grnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
}
grnTransInfoRetriveListFast(grnid): Observable<any> {
  return this.httpClient.get<any>(this.url + 'grnTransInfoRetriveListFast/' + grnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
}
grnBPDtlsRetriveListFast(grnid): Observable<any> {
  return this.httpClient.get<any>(this.url + 'grnBPDtlsRetriveListFast/' + grnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
}
grnResourceCostRetriveListFast(grnid): Observable<any> {
  return this.httpClient.get<any>(this.url + 'grnResourceCostRetriveListFast/' + grnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
}
grnDocRetriveListFast(grnid): Observable<any> {
  return this.httpClient.get<any>(this.url + 'grnDocRetriveListFast/' + grnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
}
grndriverdetailsFast(grnid): Observable<any> {
  return this.httpClient.get<any>(this.url + 'grndriverdetailsFast/' + grnid).pipe(catchError((err) => { console.log("error in service: " + JSON.stringify(err)); return throwError(err.status); }))
}

grndriverdetails(grn_id:string): Observable<any>{ return this.httpClient.get<any>(this.url+'grndriverdetails/'+grn_id).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));}    
// end



public updatePurIndent(Indent,id): Observable<Indent> {
  return this.httpClient.put<Indent>(this.url+'updatePurIndent/'+id, Indent).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
             }    
public updatePurEnquiry(Enquiry,id): Observable<Enquiry> {
  return this.httpClient.put<Enquiry>(this.url+'updatePurEnquiry/'+id, Enquiry).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
  }
public updatePurQuotation(Quotation,id): Observable<Quotation> {
    return this.httpClient.put<Quotation>(this.url+'updatePurQuotation/'+id, Quotation).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
               }   
public updatePurOrder(PurchaseOrder,id): Observable<PurchaseOrder> {
  return this.httpClient.put<PurchaseOrder>(this.url+'updatePurOrder/'+id, PurchaseOrder).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
    }  
    
public updatePurchaseGoodReceipt(PurchaseGRN,id) : Observable<PurchaseGRN>{
  return this.httpClient.put<PurchaseGRN>(this.url+'updatePurchaseGoodReceipt/'+id, PurchaseGRN).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
    }

    public createDriverpopup(formdata:FormData) : Observable<DriverMasterPopup> {
      //alert();
      return this.httpClient.post<DriverMasterPopup>(this.url+"createDriverpopup", formdata).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
    }
    
private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
     // A client-side or network error occurred. Handle it accordingly.
     console.error('An error occurred:', error.error.message);
   } else {
// The backend returned an unsuccessful response code.
//     // The response body may contain clues as to what went wrong,
    console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
   }
// return an observable with a user-facing error message
   
 return throwError("Somtning Bad happened . Please Try Again");
}


public uploadstatemasterexcel(formdata:FormData) : Observable<any> {
  //alert();
  return this.httpClient.post<any>(this.url+"uploadstatemasterexcel", formdata).pipe(catchError((err) => {console.log("error in service: "+JSON.stringify(err));return throwError(err.status);}));
}

}


