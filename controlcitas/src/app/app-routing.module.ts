import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanGuard } from './guards/can-guard';
import { CanAdminGuard } from './guards/can-admin-guard';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { EditServicesComponent } from './components/edit-services/edit-services.component';
import { RegisterComponent } from './components/register/register.component';
import { NewsComponent } from './components/news/news.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { SucursalComponent } from './components/sucursales/sucursal.component';
import { ServiceEmployeeComponent } from './components/service-employee/service-employee.component';
import { ServicesComponent } from './components/services-page/services.component';
import { ServiceClientComponent } from './components/service-client/service-client.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { CalendarEmployeeComponent } from './components/calendar-employee/calendar-employee.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'services-page', component: ServicesComponent},
  {path: 'buscador/:busqueda', component: BuscadorComponent},
  {path: 'service-client/:id', component: ServiceClientComponent},
  {path: 'employees', component: EmpleadosComponent, canActivate: [CanAdminGuard]},
  {path: 'news', component: NewsComponent, canActivate: [CanAdminGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [CanAdminGuard]},
  {path: 'edit-services', component: EditServicesComponent, canActivate: [CanAdminGuard]},
  {path: 'sucursal', component: SucursalComponent, canActivate: [CanAdminGuard]},
  {path: 'employee-sucursal', component: ServiceEmployeeComponent, canActivate: [CanAdminGuard]},
  {path: 'schedules', component: ScheduleComponent, canActivate: [CanAdminGuard]},
  {path: 'calendar-employee', component: CalendarEmployeeComponent, canActivate: [CanAdminGuard]},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', pathMatch: 'full', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

