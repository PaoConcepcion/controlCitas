import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CitasApiService } from './../../services/citas-api/citas-api.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {

  servicios = [];
  bandera: boolean;
  busqueda: string;

  constructor( private activatedRoute: ActivatedRoute, private citasApiService: CitasApiService ) {
    this.activatedRoute.params.subscribe( params => {
      this.busqueda = params['busqueda'];
      this.bandera = false;
      this.buscarServ();
    });
  }

  buscarServ() {
    this.servicios = [];
    this.citasApiService
      .consulta(`/service-name/${this.busqueda}`)
      .subscribe((res: any) => {
        if (res) {
          this.servicios.push(res);
        }
      });
  }

}
