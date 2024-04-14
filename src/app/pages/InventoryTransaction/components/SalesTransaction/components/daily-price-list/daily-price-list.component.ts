import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-daily-price-list',
  templateUrl: './daily-price-list.component.html',
  styleUrls: ['./daily-price-list.component.scss']
})
export class DailyPriceListComponent implements OnInit {

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
