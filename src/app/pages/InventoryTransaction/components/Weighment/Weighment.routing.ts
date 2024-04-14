import { Routes, RouterModule } from '@angular/router';
import { WeighmentComponent } from './Weighment.component';
import { LoadingAdviceComponent } from './components/loading-advice/loading-advice.component';
import { UnloadAdviceComponent } from './components/unload-advice/unload-advice.component'
import { UnloadWeighmentComponent } from './components/unload-weighment/unload-weighment.component';
import { LoadingWeighmentComponent } from './components/loading-weighment/loading-weighment.component';
import { TagAdviceWithPoComponent } from './components/tag-advice-with-po/tag-advice-with-po.component';
import { OtherWeighmentComponent } from './components/other-weighment/other-weighment.component';

const childRoutes: Routes = [
    {
        path: '',
        component: WeighmentComponent,
        children: [
            { path: '', redirectTo: 'loadingAdvice', pathMatch: 'full' },
            { path: 'loadingAdvice', component: LoadingAdviceComponent },
            { path: 'unloadAdvice', component: UnloadAdviceComponent },
            { path: 'unloadWeightment', component: UnloadWeighmentComponent },
            { path: 'loadingWeightment', component: LoadingWeighmentComponent },
            { path: 'TagAdviceWithPo', component: TagAdviceWithPoComponent },
            { path: 'OtherWeighment', component: OtherWeighmentComponent }
           
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);