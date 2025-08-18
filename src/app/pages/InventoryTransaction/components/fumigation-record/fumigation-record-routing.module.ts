import { Routes, RouterModule } from '@angular/router';
import { FumigationStkOpnDateComponent } from './components/fumigation-stk-opn-date/fumigation-stk-opn-date.component';
import { FumigationRecordComponent } from './fumigation-record.component';
import { WheatFumigationRecordComponent } from './components/wheat-fumigation-record/wheat-fumigation-record.component';

const childRoutes: Routes = [
  {
    path: "",
    component: FumigationRecordComponent,
    children: [
      { path: "", redirectTo: "wheat-fumigation-record", pathMatch: "full" },
      {
        path: "wheat-fumigation-record",
        component: WheatFumigationRecordComponent,
      },
      {
        path: "fumigation-stk-opn-date",
        component: FumigationStkOpnDateComponent,
      },
      {
        path: "**",
        redirectTo: "wheat-fumigation-record",
      },
    ],
  },
];

export const routing = RouterModule.forChild(childRoutes);