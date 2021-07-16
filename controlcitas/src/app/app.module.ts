import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SucursalComponent } from './components/sucursales/sucursal.component';
import { EditServicesComponent } from './components/edit-services/edit-services.component';
import { NewsComponent } from './components/news/news.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { ServiceEmployeeComponent } from './components/service-employee/service-employee.component';
import { ServiceClientComponent } from './components/service-client/service-client.component';
import { ServicesComponent } from './components/services-page/services.component';
import { CalendarEmployeeComponent } from './components/calendar-employee/calendar-employee.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarHeaderComponent } from './utils/calendar-header/calendar-header.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { OptionsComponent } from './components/options/options.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    EditServicesComponent,
    NewsComponent,
    EmpleadosComponent,
    SucursalComponent,
    ServiceEmployeeComponent,
    ServiceClientComponent,
    ServicesComponent,
    CalendarHeaderComponent,
    CalendarComponent,
    BuscadorComponent,
    ScheduleComponent,
    OptionsComponent,
    CalendarEmployeeComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    // BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    FormsModule,
    CommonModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyD_U9guwLSKdvWs5XdGdr0esGBoLO5Sikw'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
