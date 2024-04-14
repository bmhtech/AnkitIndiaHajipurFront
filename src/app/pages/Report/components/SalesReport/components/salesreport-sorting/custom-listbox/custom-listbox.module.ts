
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';
import { CustomListboxComponent } from './custom-listbox.component';

@NgModule({
  declarations: [CustomListboxComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
  ,exports: [
		CustomListboxComponent
	]
})
export class CustomListboxModule { }