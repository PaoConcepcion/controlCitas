import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CitasApiService } from './../../services/citas-api/citas-api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { strings } from '../../shared/models/strings-template';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styles: []
})
export class ServicesComponent implements OnInit {
  public services = [];
  public bandera;
  public strings = strings;

  constructor(private activatedRoute: ActivatedRoute, private citasApiS: CitasApiService, private router: Router) {

  }
  
ngOnInit(): void {
  this.citasApiS.consulta('/services').subscribe((res: any) => {
    console.log(res);
    this.services = res;
    console.log(this.services);
    console.log("Hola ");
  });
}

buscar(busqueda: string) {
  this.router.navigate(['/service-client', busqueda]);
  this.services = [];
  this.citasApiS.consulta(`/services/${busqueda}`)
    .subscribe((res: any) => {
      this.services = res.results;
      if (this.services.length > 0) {
        this.bandera = true;
      } else {
        this.bandera = false;
      }
    });
}

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}