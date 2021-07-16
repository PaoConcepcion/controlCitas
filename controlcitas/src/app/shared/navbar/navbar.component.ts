import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { strings } from './../models/strings-template';
import { UserResponse } from '../../shared/models/user.interface';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { CitasApiService } from '../.././services/citas-api/citas-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public strings = strings;
  public user$: Observable<UserResponse> = this.authSvc.user$;
  datos = {
    icono: null
  };

  constructor(private router: Router, private authSvc: AuthService,
    private citasA: CitasApiService) { }

  ngOnInit(): void {
    this.getOptions();
  }

  buscar(busqueda: string) {
    this.router.navigate(['/buscador', busqueda]);
  }

  getOptions(){
    this.citasA.consulta('/options').subscribe((res: any) => {
      this.datos = res[0];
      err =>{
        console.log(err);
      }
    });
  }
}
