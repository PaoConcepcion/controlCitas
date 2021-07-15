import { Component, OnInit } from '@angular/core';
import { strings } from './../models/strings-template';
import { UserResponse } from '../../shared/models/user.interface';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CitasApiService } from '../.././services/citas-api/citas-api.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public strings = strings;
  nombre: string;
  datos = {
    nombre_sitio: null,
    logotipo: null,
  };
  public user$: Observable<UserResponse> = this.authSvc.user$;

  constructor(private authSvc: AuthService, private router: Router,
    private citasA: CitasApiService) { }

  ngOnInit(): void {
    this.getOptions();
  }

  onLogout() {
    this.authSvc.logout();
    this.router.navigate(['/login']);
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
