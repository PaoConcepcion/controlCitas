import { Component, OnInit } from '@angular/core';
import { strings } from './../models/strings-template';
import { UserResponse } from '../../shared/models/user.interface';
import { AuthService } from '../../services/auth/auth.service';
import { CitasApiService } from './../../services/citas-api/citas-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public strings = strings;
  public user$: Observable<UserResponse> = this.authSvc.user$;
  option = {
    nombre_sitio: null,
    facebook: null,
    instagram: null,
    contacto: null,
    acerca_de: null
  }

  constructor( private authSvc: AuthService,
    private citasA: CitasApiService ) { }

  ngOnInit(): void {
    this.getOptions();
  }

  getOptions(){
    this.citasA.consulta('/options').subscribe((res: any) => {
      this.option = res[0];
      err =>{
        console.log(err);
      }
    });
  }

}
