import { Component } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})

export class PagesComponent  {
  showLoadingIndicator = true;

  constructor(private router: Router)
  {
    this.router.events.subscribe((routerEvent: Event) => { 
      
      if(routerEvent instanceof NavigationStart)
      {this.showLoadingIndicator = true;}
      if(routerEvent instanceof NavigationEnd)
      {this.showLoadingIndicator = false;}
    });
  }
  
 
 }
