import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
<<<<<<< HEAD
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
=======
import { RouterModule } from '@angular/router';
>>>>>>> f9a40d6171afdbef75f3c3f4e9d699e27031b62b

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
<<<<<<< HEAD
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarHeaderComponent } from './utils/calendar-header/calendar-header.component';
import { CalendarComponent } from './components/calendar/calendar.component';
=======
import { ServiceClientComponent } from './components/service-client/service-client.component';
import { ServicesComponent } from './components/services-page/services.component'

>>>>>>> f9a40d6171afdbef75f3c3f4e9d699e27031b62b

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
<<<<<<< HEAD
    CalendarHeaderComponent,
    CalendarComponent
=======
    ServiceClientComponent,
    ServicesComponent
>>>>>>> f9a40d6171afdbef75f3c3f4e9d699e27031b62b
  ],
  imports: [
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    FormsModule,
    CommonModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
