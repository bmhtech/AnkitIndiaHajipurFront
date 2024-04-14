import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthly-price-list',
  templateUrl: './monthly-price-list.component.html',
  styleUrls: ['./monthly-price-list.component.scss']
})
export class MonthlyPriceListComponent implements OnInit {

  constructor() { }

  isHidden = false;
  showList(s:string)
    {
      if(s=="add")
      {this.isHidden=true;}
      if(s=="list")
      {this.isHidden=false;}
    }
  ngOnInit() {
  }

}
