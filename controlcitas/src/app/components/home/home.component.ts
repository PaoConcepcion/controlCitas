import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitasApiService } from '../../services/citas-api/citas-api.service';
import { strings } from '../../shared/models/strings-template';
import { UserResponse } from '../../shared/models/user.interface';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user$: Observable<UserResponse> = this.authSvc.user$;

  news: any [] = [];
  new = {
    id_sucursal: null,
    nombre: null,
    telefono: null,
    cp: null,
    colonia: null,
    calle: null,
    numero_exterior: null,
    numero_interior: null,
    latitud: null,
    longitud: null
  };
  id: number;
  zoom = 12;

  public imgCarrusel = [];
  public strings = strings;
  public servicios = [];

  constructor(private router: Router, private citasApiService: CitasApiService, private authSvc: AuthService) { }

  buscar(item: any) {
    this.router.navigate(['/buscador', item]);
  }

  ngOnInit(): void {
    this.actualizar();
    this.consultaSucursalN();
  }

  busSucursal(id_sucursal){
    this.citasApiService.busqueda(`/sucursales/${id_sucursal}`).subscribe((res: any) => {
      this.new = res;
      console.log(this.new)
      err =>{
        console.log(err);
      }
    });
    this.id = id_sucursal
  }

  consultaSucursalN(){
    this.citasApiService.consulta('/sucursales').subscribe((res: any) => {
      this.news = res;
      err =>{
        console.log(err);
      }
    });
  }

  private actualizar() {
    this.citasApiService.consulta('/news')
      .subscribe((res: any) => {
        this.imgCarrusel = res;
    });

    this.citasApiService
      .consulta('/active-services')
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
