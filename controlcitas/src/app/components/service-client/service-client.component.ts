import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Params} from '@angular/router';
import { CitasApiService } from './../../services/citas-api/citas-api.service';
import { strings } from '../../shared/models/strings-template';

@Component({
  selector: 'app-service-client',
  templateUrl: './service-client.component.html',
  styles: []
})
export class ServiceClientComponent implements OnInit {

  joya: any;
  public id: any;
  public service : any;
  public bandera;
  public strings = strings;
  

  constructor(private activatedRoute: ActivatedRoute, private citasApiS: CitasApiService) {
    this.activatedRoute.params.subscribe( params => {
      this.id = {id_servicio:params['id']};
      console.log(this.id.id_servicio);
    });
  }

  ngOnInit() {
    this.citasApiS.consulta(`/services/${this.id.id_servicio}`)
    .subscribe((res: any) => {
      console.log(res);
      console.log(this.id.id_servicio);
      this.service = res;
      console.log(this.service.nombre);
    });
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }
}




