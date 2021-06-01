import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanGuard } from './guards/can-guard';
import { CanAdminGuard } from './guards/can-admin-guard';

import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},

  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', pathMatch: 'full', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
