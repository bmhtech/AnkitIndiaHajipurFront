import { Component, ChangeDetectorRef, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from "@angular/forms";
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
/*export class AppComponent {
  title = 'app';

  constructor(private formBuilder: FormBuilder) {}


}*/ // old code date not change when system date change

export class AppComponent implements OnInit { // date change when system date change
  title = 'app';
  constructor(private formBuilder: FormBuilder, private titleService: Title,
    private router: Router, private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    // Current Date in System
    localStorage.setItem(
      "CurrentDate",
      JSON.stringify(new Date()).split("T")[0].split('"')[1]
    );
  console.log("CurrentDateSys:: ",localStorage.getItem("CurrentDate"));

  // Title of webpage change to the page. 
  this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe(data => {
      //console.log(JSON.stringify(data));
      console.log("Page Title:: "+data.title);
      if (data.title) {
        console.log(" :: Page Title of Webpage :: ");
        this.titleService.setTitle(data.title);
      }
      else{
        console.log(" :: Comapany Title :: ");
        this.titleService.setTitle("Ankit India Hajipur");
      }
    });
  }
}