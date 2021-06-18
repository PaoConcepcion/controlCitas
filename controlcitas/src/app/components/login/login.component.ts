import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { strings } from '../../shared/models/strings-template';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public strings = strings;

  loginForm = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
    contrasena: new FormControl('',  [Validators.required, Validators.maxLength(30)])
  });

  private subscription: Subscription = new Subscription();

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
    document.getElementById('uno').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  login() {
    if (this.loginForm.valid) {
      this.subscription.add(
        this.authSvc.login(this.loginForm.value).subscribe((res) => {
          if (res) {
            this.router.navigate(['']);
          }
        })
      );
    } else {
      document.getElementById('uno').style.display = 'block';
      setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);
    }
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}
