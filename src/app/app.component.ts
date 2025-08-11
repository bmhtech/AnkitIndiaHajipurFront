import { Component, ChangeDetectorRef, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from "@angular/forms";


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
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    localStorage.setItem(
      "CurrentDate",
      JSON.stringify(new Date()).split("T")[0].split('"')[1]
    );
  }
}