import { Component, OnInit } from '@angular/core';
import { CitasApiService } from './../../services/citas-api/citas-api.service';
import { strings } from './../../shared/models/strings-template';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styles: []
})
export class ServicesComponent implements OnInit {
  public strings = strings;
  public services = [];
  public band;

  constructor(private citasApiS: CitasApiService) {
  }

  ngOnInit(): void {
    this.actualizar();
    this.band = true;
  }

  public actualizar() {
    this.citasApiS.consulta(`${environment.API_URL}/services`)
      .subscribe((res: any) => {
        this.services = res.recipes;
      });
  }

  buscar(busqueda: string) {
    // this.router.navigate(['/buscador', busquedaEdaman]);
    this.services = [];
    this.citasApiS.consulta(`${environment.API_URL}/services/${busqueda}`)
      .subscribe((res: any) => {
        this.services = res.results;
        if (this.services.length > 0) {
          this.band = true;
        } else {
          this.band = false;
        }
      });
  }

  public agregar(receta) {
    this.citasApiS.consulta(`${environment.API_URL}/services/${receta.id}`)
      .subscribe((res: any) => {
        if (res.array.length > 0) {
          document.getElementById('dos').style.display = 'block';
          setTimeout(() => document.getElementById('dos').style.display = 'none', 2000);
        } else {
          const data = {
            id_receta: receta.id,
            title: receta.title,
            image: receta.image,
            creditsText: receta.creditsText,
          };
          this.citasApiS.alta(`${environment.API_URL}/services`, data)
          .then((laData) => {
            console.log(laData);
            document.getElementById('uno').style.display = 'block';
            setTimeout(() => document.getElementById('uno').style.display = 'none', 2000);
          })
          .catch((err) => {
            console.log(err);
          });
        }
      });
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}