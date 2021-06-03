import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  public newUserForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required),
    apellido_paterno: new FormControl('', Validators.required),
    apellido_materno: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    rol: new FormControl('', Validators.required),
    contrasenaVerf: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private router: Router) {
    this.newUserForm.setValue({
      nombre: '',
      correo: '',
      contrasena: '',
      apellido_paterno: '',
      apellido_materno: '',
      telefono: '',
      rol: '',
      contrasenaVerf: ''
    });
  }


  ngOnInit(): void {
    document.getElementById('uno').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
    document.getElementById('tres').style.display = 'none';
    document.getElementById('cuatro').style.display = 'none';
    document.getElementById('cinco').style.display = 'none';
  }

  public newUser(form) {
    if (this.newUserForm.valid) {
        const body = {
          nombre: form.nombre,
          correo: form.correo,
          contrasena: form.contrasena,
          apellido_paterno: form.apellido_paterno,
          apellido_materno: form.apellido_materno,
          telefono: form.telefono,
          rol: form.rol
        };
        if (body.contrasena === form.contrasenaVerf) {
          this.authService.register(body).then((data) => {
            console.log(data);
            if (!data['success']) {
              document.getElementById('tres').style.display = 'block';
              setTimeout(() => document.getElementById('tres').style.display = 'none', 5000);
            } else {
              document.getElementById('cinco').style.display = 'block';
              setTimeout(() => document.getElementById('cinco').style.display = 'none', 5000);
              this.newUserForm.setValue({
                nombre: '',
                correo: '',
                contrasena: '',
                apellido_paterno: '',
                apellido_materno: '',
                telefono: '',
                rol: '',
                contrasenaVerf: ''
              }); 
            }
          })
          .catch((err) => {
            console.log(err);
          });
        } else {
          document.getElementById('dos').style.display = 'block';
          setTimeout(() => document.getElementById('dos').style.display = 'none', 5000);
        }
    } else {
      document.getElementById('uno').style.display = 'block';
      setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);
    }
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }
}