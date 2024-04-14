import { Component, OnInit } from '@angular/core';
import { Master } from '../../../../service/master.service';

@Component({
  selector: 'app-accountledgerposting',
  templateUrl: './accountledgerposting.component.html',
  styleUrls: ['./accountledgerposting.component.scss']
})

export class AccountledgerpostingComponent implements OnInit {
  status:any;
  listofLedgers:any;

  constructor(private Service : Master) { }

  ngOnInit() {

    this.Service.getAccountPostingFor()
    .subscribe((data)=>
    {
      this.listofLedgers  = data;
       
      this.status = true;
    }, (error) => {this.status=true;console.log("ERROR get: "+JSON.stringify(error));alert("something error is occured please try again....");
    this.ngOnInit()});
  }

}
