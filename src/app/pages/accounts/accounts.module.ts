import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './accounts-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './components/account/account.component';
import { AccountledgerpostingComponent } from './components/accountledgerposting/accountledgerposting.component';
import { AccountsComponent } from './accounts.component';

@NgModule({

  imports: [
    CommonModule,
    routing,
    FormsModule,
    ReactiveFormsModule
  ],


  declarations: [
    AccountComponent,
     AccountledgerpostingComponent,
     AccountsComponent
    ]

 
})
export class AccountsModule { }
