import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitasApiService } from '../../services/citas-api/citas-api.service';
import { strings } from '../../shared/models/strings-template';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /* img1: Imagenes [] = [
    {nombre: 'Salad', src: '../../assets/food1.jpg', id: 9},
    {nombre: 'Shellfish', src: '../../assets/food2.jpg', id: 2},
    {nombre: 'Pasta', src: '../../assets/food3.jpg', id: 10}
  ];

  img2: Imagenes [] = [
    {nombre: 'Meat', src: '../../assets/food4.jpg', id: 3},
    {nombre: 'Dessert', src: '../../assets/food5.jpg', id: 8},
    {nombre: 'Breakfast', src: '../../assets/food6.jpg', id: 4},
  ];

  img3: Imagenes [] = [
    {nombre: 'Traditional', src: '../../assets/food7.jpg', id: 15},
    {nombre: 'Drinks', src: '../../assets/food8.jpg', id: 12},
    {nombre: 'Soups', src: '../../assets/food9.jpg', id: 14},
  ]; */

  public imgCarrusel = [];
  public strings = strings;
  public servicios = [];

  constructor(private router: Router, private citasApiService: CitasApiService) { }

  buscar(item: any) {
    this.router.navigate(['/buscador', item]);
  }

  ngOnInit(): void {
    this.actualizar();
  }

  private actualizar() {
    this.citasApiService.consulta('/news')
      .subscribe((res: any) => {
        this.imgCarrusel = res;
    });

    this.citasApiService
      .consulta('/services')
      .subscribe((res: any) => {
        let index = 0;
        for (let j = 0; index < res.length; j++) {
          this.servicios[j] = [];
          for ( let i = 0; i < 3; i++ ) {
            if ( index < res.length ) {
              this.servicios[j].push(res[index]);
              index ++;
            } else {
              break;
            }
          }
        }
    });
  }

}

interface Imagenes {
  nombre: string;
  src: string;
  id: number;
}
