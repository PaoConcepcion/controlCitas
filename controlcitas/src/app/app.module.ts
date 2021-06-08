import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
=======
import { HttpClientModule } from '@angular/common/http';
>>>>>>> 88bd15bfe2056c9a6b357bf74b7a6dec2f9afb42
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
<<<<<<< HEAD
import { NewsComponent } from './components/news/news.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EditServicesComponent } from './components/edit-services/edit-services.component';
=======
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EditServicesComponent } from './components/edit-services/edit-services.component';
import { NewsComponent } from './components/news/news.component';
>>>>>>> 88bd15bfe2056c9a6b357bf74b7a6dec2f9afb42

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    NavbarComponent,
    FooterComponent,
<<<<<<< HEAD
    NewsComponent,
    EmpleadosComponent,
    LoginComponent,
    RegisterComponent,
    EditServicesComponent
=======
    LoginComponent,
    RegisterComponent,
    EditServicesComponent,
    NewsComponent,
>>>>>>> 88bd15bfe2056c9a6b357bf74b7a6dec2f9afb42
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
<<<<<<< HEAD
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
=======
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    FormsModule,
    CommonModule,
>>>>>>> 88bd15bfe2056c9a6b357bf74b7a6dec2f9afb42
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
