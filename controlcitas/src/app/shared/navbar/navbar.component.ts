import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { strings } from './../models/strings-template';
import { UserResponse } from '../../shared/models/user.interface';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public strings = strings;
  public user$: Observable<UserResponse> = this.authSvc.user$;

  constructor(private router: Router, private authSvc: AuthService) { }

  ngOnInit(): void {
  }

  buscar(busqueda: string) {
    this.router.navigate(['/buscador', busqueda]);
  }

}
