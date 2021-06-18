import { Component, OnInit } from '@angular/core';
import { strings } from './../models/strings-template';
import { UserResponse } from '../../shared/models/user.interface';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public strings = strings;
  public user$: Observable<UserResponse> = this.authSvc.user$;

  constructor( private authSvc: AuthService ) { }

  ngOnInit(): void {
  }

}
