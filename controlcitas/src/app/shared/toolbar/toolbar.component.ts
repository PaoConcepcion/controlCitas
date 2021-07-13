import { Component, OnInit } from '@angular/core';
import { strings } from './../models/strings-template';
import { UserResponse } from '../../shared/models/user.interface';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public strings = strings;

  public user$: Observable<UserResponse> = this.authSvc.user$;

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.authSvc.logout();
    this.router.navigate(['/login']);
  }

}
