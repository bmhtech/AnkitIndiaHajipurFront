
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin } from 'rxjs';
import { DropdownServiceService } from '../../../../../service/dropdown-service.service';
import { ExcelService } from '../../../../../service/excel.service';
import { Master } from '../../../../../service/master.service';

@Component({
  selector: 'app-wheatreceivingreportprintpopup',
  templateUrl: './wheatreceivingreportprintpopup.component.html',
  styleUrls: ['./wheatreceivingreportprintpopup.component.scss']
})
export class WheatreceivingreportprintpopupComponent implements OnInit {

  wheatreceiveid:any;
  wheatstacklist:any = [];
  wheatrecievelist:any = [];
  wheatissuelist:any = [];
  totalopeningbags:number=0;
  totalopeningqty:number=0;
  totalopeningloose:number=0;
  totalreceiptbags:number=0;
  totalreceiptqty:number=0;
  totalreceiptloose:number=0;
  totalissuebags:number=0;
  totalissueqty:number=0;
  totalissueloose:number=0;
  totalclosingbags:number=0;
  totalclosingqty:number=0;
  totalclosingloose:number=0;
  company_name:any;
  

  constructor(private fb: FormBuilder,private Service: Master,
    private DropDownListService: DropdownServiceService,
    private dialogRef: MatDialogRef<WheatreceivingreportprintpopupComponent>, 
    @Inject(MAT_DIALOG_DATA)data,private excelService:ExcelService) 
    {
      this.wheatreceiveid=data["alldata"];
    }

  ngOnInit()
  {
    forkJoin(
      this.DropDownListService.retrivewheatstock_Dtls(this.wheatreceiveid),
      this.DropDownListService.retriveWheatDetails(this.wheatreceiveid),
      this.DropDownListService.retriveWheatIssueDetails(this.wheatreceiveid),
      this.DropDownListService.getCompanyDetails(localStorage.getItem("company_name"))
      ).subscribe(([wheatstockDtls,recieveingcdetails,issueDetails,companydata])=> 
      {
        this.wheatstacklist=wheatstockDtls;
        this.wheatrecievelist=recieveingcdetails;
        this.wheatissuelist=issueDetails;
        this.company_name=companydata.company_name;

        wheatstockDtls.forEach(element => {
          console.log(element.openingbags)
          this.totalopeningbags+= Number(element.openingbags);
          this.totalopeningqty+=Number(element.openingqty);
          this.totalopeningloose+=Number(element.openingloose);
          this.totalreceiptbags+=Number(element.receiptbags);
          this.totalreceiptqty+=Number(element.receiptqty);
          this.totalreceiptloose+=Number(element.receiptloose);
          this.totalissuebags+=Number(element.issuebags);
          this.totalissueqty+=Number(element.issueqty);
          this.totalissueloose+=Number(element.issueloose);
          this.totalclosingbags+=Number(element.closingbags);
          this.totalclosingqty+=Number(element.closingqty);
          this.totalclosingloose+=Number(element.closingloose);
      });
      });
  }

}