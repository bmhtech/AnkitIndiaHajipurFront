import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthHtppInterceptorService } from './service/basic-auth-htpp-interceptor.service';
import { Master } from './service/master.service';
import {MatAutocompleteModule,MatInputModule} from '@angular/material';
import {apiconfig} from './Configuration/ApiConfig';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import {NgxPrintModule} from 'ngx-print';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




import { ItemMaster } from './Models/ItemModel/ItemMaster';
import {ToastrModule} from 'ngx-toastr';
//import { LogoutpopupmodalComponent } from './shared/layouts/logoutpopupmodal/logoutpopupmodal.component';




//import { OtherMasterServiceService } from './service/other-master-service.service';
//import { AccountMasterServiceService } from './service/account-master-service.service';
//import { Master } from './service/dept.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({closeButton:true,positionClass:'toast-top-center',
              timeOut:2000,progressBar:true}),
    NgxPrintModule,
  //  FormsModule,
    PagesModule,
    routing,
    HttpClientModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    SelectAutocompleteModule,
   // NgbModule
    // <============ Don't forget to call 'forRoot()'!
    
   
  ],


  exports: [MatAutocompleteModule,MatInputModule],

  declarations: [
    AppComponent,
    
  ],
 
  providers: [{
    // provide: HTTP_INTERCEPTORS,
    //  useClass:BasicAuthHtppInterceptorService, multi:true,
        provide: LocationStrategy,
       useClass: HashLocationStrategy
     },
     {
       provide: HTTP_INTERCEPTORS,
       useClass:BasicAuthHtppInterceptorService, multi:true,
      },
     apiconfig,
      
   ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
