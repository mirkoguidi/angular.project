import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './auth/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
    { path: '', component: WelcomeComponent},
    { path: '', loadChildren: () => import('./training/training.module').then(m => m.TrainingModule)},
    { path: 'account', component: AccountComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule{

}