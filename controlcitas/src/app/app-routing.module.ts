import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanGuard } from './guards/can-guard';
import { CanAdminGuard } from './guards/can-admin-guard';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { EditServicesComponent } from './components/edit-services/edit-services.component';
import { RegisterComponent } from './components/register/register.component';
import { NewsComponent } from './components/news/news.component';
import { SucursalComponent } from './components/sucursales/sucursal.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'news', component: NewsComponent, canActivate: [CanGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [CanAdminGuard]},
  {path: 'edit-services', component: EditServicesComponent, canActivate: [CanAdminGuard]},
  {path: 'sucursal', component: SucursalComponent, canActivate: [CanAdminGuard]},

  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', pathMatch: 'full', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

