import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { CitasApiService } from './../../services/citas-api/citas-api.service';

@Component({
  selector: 'app-service-client',
  templateUrl: './service-client.component.html',
  styles: []
})
export class ServiceClientComponent implements OnInit {

  @Input() public id: any;
  public service : any;
  public bandera;  

  constructor(private activatedRoute: ActivatedRoute, private citasApiS: CitasApiService) {
    this.activatedRoute.params.subscribe( params => {
      /* this.id = {id_servicio:params['id']}; */
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.citasApiS.consulta(`/services/${this.id}`)
    .subscribe((res: any) => {
      // console.log(this.id.id_servicio);
      this.service = res;
    });
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }
}
