import { Component, OnInit, Input } from '@angular/core';
import { CitasApiService } from './../../services/citas-api/citas-api.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-client',
  templateUrl: './service-client.component.html',
  styles: []
})
export class RecetaSpoonacularComponent implements OnInit {

  joya: any;
  @Input() idReceta: any;
  public receta;
  public bandera;

  public ejeX = [];
  public ejeY = [];

  public ejeX2 = [];
  public ejeY2 = [];

  public ejeX3 = [];
  public ejeY3 = [];

  constructor(private activatedRoute: ActivatedRoute, private citasApiS: CitasApiService) {
    this.activatedRoute.params.subscribe( params => {
      this.idReceta = params['id_receta'];
    });
  }

  ngOnInit(): void {
    this.citasApiS.consulta(`${environment.API_URL}/recipeSpoonacular/${this.idReceta}` )
    .subscribe((res: any) => {
      console.log(res);
      this.receta = res;

      res.nutrition.nutrients.map(o => {
        if (o.unit === 'g' ) {
          this.ejeX.push(o.title);
          this.ejeY.push(o.amount);
        } else if (o.unit === 'mg') {
          this.ejeX2.push(o.title);
          this.ejeY2.push(o.amount);
        } else if (o.unit === 'µg') {
          this.ejeX3.push(o.title);
          this.ejeY3.push(o.amount);
        }
      });

    });
  }

  public agregar(laReceta) {
    this.citasApiS.consulta(`${environment.API_URL}/userRecipeSpoonacular/${laReceta.id}`)
      .subscribe((res: any) => {
        if (res.array.length > 0) {
          this.citasApiS.delete(`${environment.API_URL}/userRecipeSpoonacular/${res.array[0].id}`)
          .subscribe((res2: any) => {
            document.getElementById('dos').style.display = 'block';
            setTimeout(() => document.getElementById('dos').style.display = 'none', 2000);
          });
        } else {
          const data = {
            id_receta: laReceta.id,
            title: laReceta.title,
            image: laReceta.image,
            creditsText: laReceta.creditsText,
          };
          this.citasApiS.alta(`${environment.API_URL}/userRecipeSpoonacular`, data)
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
