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

  public imgCarrusel = [];
  public strings = strings;
  public servicios = [];

  constructor(private router: Router, private citasApiService: CitasApiService, private authSvc: AuthService) { }

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
