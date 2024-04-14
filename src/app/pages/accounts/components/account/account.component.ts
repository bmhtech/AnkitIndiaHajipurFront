import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor() {
 window.open("http://192.168.10.101:8080/AnkitIndiaAccounts/login.jsp")
 //window.open("http://localhost:8081/AnkitIndiaAccounts/login.jsp")
   }

  ngOnInit() {
  }

}
