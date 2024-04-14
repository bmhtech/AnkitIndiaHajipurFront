import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialreportsComponent } from './specialreports.component';
import { routing } from './specialreports-routing.module';

@NgModule({
  declarations: [
        SpecialreportsComponent,
      ],
  imports: [
    CommonModule,
    routing,
  ]
})
export class SpecialreportsModule { }
