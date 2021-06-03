import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CitasApiService } from '../../services/citas-api/citas-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  public sucursales = [];

  public newUserForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', Validators.required),
    apellido_paterno: new FormControl('', Validators.required),
    apellido_materno: new FormControl('', Validators.required),
    telefono: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(10),
      Validators.maxLength(10)]),
    rol: new FormControl('', Validators.required),
    id_sucursal: new FormControl('', Validators.required),
    contrasenaVerf: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private citasApiService: CitasApiService) {
    this.newUserForm.setValue({
      nombre: '',
      correo: '',
      contrasena: '',
      apellido_paterno: '',
      apellido_materno: '',
      telefono: '',
      rol: '',
      contrasenaVerf: '',
      id_sucursal: ''
    });
  }


  ngOnInit(): void {
    document.getElementById('uno').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
    document.getElementById('tres').style.display = 'none';
    document.getElementById('cuatro').style.display = 'none';
    document.getElementById('cinco').style.display = 'none';
    this.actualizar();
  }

  private actualizar() {
    this.citasApiService.consulta('/nomSucursales')
      .subscribe((res: any) => {
        this.sucursales = res.array;
      });
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
          rol: form.rol,
          id_sucursal: form.id_sucursal
        };
        if (body.contrasena === form.contrasenaVerf) {
          this.authService.register(body).then((data) => {
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
                contrasenaVerf: '',
                id_sucursal: ''
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
