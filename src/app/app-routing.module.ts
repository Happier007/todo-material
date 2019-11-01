import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent, DetailComponent, ListComponent } from './modules/main/components';
import { AuthGuardService } from './modules/main/services';


const routes: Routes = [
  {path: '', redirectTo: '/todo', pathMatch: 'full'},
  {path: 'todo', component: ListComponent, canActivate: [AuthGuardService]},
  {path: 'detail/:id', component: DetailComponent},
  {path: 'auth', component: AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
