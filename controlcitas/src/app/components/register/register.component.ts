import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CitasApiService } from '../../services/citas-api/citas-api.service';
import { strings } from './../../shared/models/strings-template';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public strings = strings;
  public sucursales = [];

  public newUserForm = new FormGroup({
    nombre: new FormControl('',  Validators.compose([Validators.required, Validators.maxLength(30)])),
    correo: new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])),
    contrasena: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(6)])),
    apellido_paterno: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
    apellido_materno: new FormControl('',  Validators.compose([Validators.required, Validators.maxLength(30)])),
    telefono: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(10),
      Validators.maxLength(10)])),
    rol: new FormControl('', Validators.compose([Validators.required])),
    id_sucursal: new FormControl('', Validators.compose([Validators.required])),
    contrasenaVerf: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(6)]))
  });

  validation_messages = {
    nombre: [
      { type: "required", message: "Se requiere de un nombre"},
      { type: "maxLenght", message: "Longitud maxima de 30"}
    ],
    apellido_paterno: [
      { type: "required", message: "Se requiere de un apellido paterno"},
      { type: "maxLenght", message: "Longitud maxima de 30"}
    ],
    apellido_materno: [
      { type: "required", message: "Se requiere de un apellido materno"},
      { type: "maxLenght", message: "Longitud maxima de 30"}
    ],
    correo: [
      { type: "required", message: "Se requiere de un correo"},
      { type: "maxLenght", message: "Longitud maxima de 50"},
      { type: "email", message: "Ingrese un correo válido"},
    ],
    contrasena: [
      { type: "required", message: "Se requiere de una contraseña"},
      { type: "maxLenght", message: "Longitud maxima de 50"},
      { type: "minLength", message: "Longitud minima de 6"},
    ],
    contrasenaVerf: [
      { type: "required", message: "Verifica tu contraseña"},
      { type: "maxLenght", message: "Longitud maxima de 50"},
      { type: "minLength", message: "Longitud minima de 6"},
    ],
    telefono: [
      { type: "required", message: "Se requiere de un telefono"},
      { type: "maxLenght", message: "Longitud maxima de 10"},
      { type: "minLength", message: "Songitud minima de 10"},
      { type: "pattern", message: "Solo números son permitidos"},
    ],
    rol: [
      { type: "required", message: "Se requiere que se elija un rol"},
    ],
    id_sucursal: [
      { type: "required", message: "Se requiere que se elija una sucursal"},
    ],
  }

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
            console.log(data);
            if (!data['success']) {
              document.getElementById('tres').style.display = 'block';
              setTimeout(() => document.getElementById('tres').style.display = 'none', 5000);
            } else {
              document.getElementById('cuatro').style.display = 'block';
              setTimeout(() => document.getElementById('cuatro').style.display = 'none', 5000);
              this.newUserForm.reset();
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

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }
}
