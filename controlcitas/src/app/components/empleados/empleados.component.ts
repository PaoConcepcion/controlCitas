import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { CitasApiService } from '../../services/citas-api/citas-api.service';
import { strings } from './../../shared/models/strings-template';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  activeEmployees = [];
  deleteEmployees = [];
  show: Boolean = true;
  estado: number;
  employeeForm: FormGroup;
  employee = {
    id_empleado: null,
    id_sucursal: null,
    nombre: null,
    apellido_paterno: null,
    apellido_materno: null,
    correo: null,
    contrasena: null,
    telefono: null,
    rol: null
  }
  id: number;
  sucursales = [];
  strings = strings;

  validation_messages = {
    id_sucursal: [
      { type: "required", message: "sucursal no seleccionada"}
    ],
    nombre: [
      { type: "required", message: "se requiere del nombre"},
      { type: "minLenght", message: "longitud minima de 3"}
    ],
    apellido_materno: [
      { type: "required", message: "se requiere del apellido materno"},
      { type: "minLenght", message: "longitud minima de 4"}
    ],
    apellido_paterno: [
      { type: "required", message: "se requiere del apellido paterno"},
      { type: "minLenght", message: "longitud minima de 4"}
    ],
    correo: [
      { type: "required", message: "se requiere del correo"},
      { type: "pattern", message: "el correo no es valido" }
    ],
    telefono: [
      { type: "required", message: "se requiere del telefono"},
      { type: "maxLenght", message: "longitud minima de 10"},
    ],
    contrasena: [
      { type: "required", message: "se requiere de una contraseña"},
      { type: "minLenght", message: "longitud minima de 8"},
    ],
    verificar_contrasena: [
      { type: "required", message: "verifique su contraseña"},
      { type: "minLenght", message: "longitud minima de 6"},
    ],
    rol: [
      { type: "required", message: "no se ha seleccido el tipo de usuario"},
    ]
  }

  constructor(private citasApiS: CitasApiService, private formB: FormBuilder) {
    this.employeeForm = this.formB.group({
      id_sucursal: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])),
      nombre: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      apellido_paterno: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])),
      apellido_materno: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])),
      correo: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ])),
      contrasena: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])),
      verificar_contrasena: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])),
      telefono: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(10),
      ])),
      rol: new FormControl(null, Validators.compose([
        Validators.required,
      ]))
    })
   }

  ngOnInit(): void {
    this.getEmployees();
    this.getSucursales();
    document.getElementById('uno').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
    document.getElementById('tres').style.display = 'none';
    document.getElementById('cuatro').style.display = 'none';
    document.getElementById('kinto').style.display = 'none';
    this.employeeForm.disable();
  }

  changeState(value){
    if(value == true){
      this.show = false;
    }else {
      this.show = true;
    };
  }

  getSucursales() {
    this.citasApiS.consulta('/nomSucursales').subscribe((res: any) => {
        this.sucursales = res.array;
    });
  }

  getEmployee(id_empleado) {
    this.citasApiS.busqueda(`/employees/${id_empleado}`).subscribe((res: any) => {
      this.employee = res;
      console.log(this.employee);
      this.id = id_empleado;
      this.employeeForm.enable();
      err =>{
        console.log(err);
      }
    });
  }

  getEmployees(){
    this.activeEmployees = [];
    this.deleteEmployees = [];
    this.citasApiS.consulta('/employees').subscribe((res: any) => {
      for (const employee of res){
        if (employee.estatus == 1){
          this.activeEmployees.push(employee);
        }else {
          if (employee.estatus == 0){
            this.deleteEmployees.push(employee);
          }
        }
      };
      err =>{
        console.log(err);
      }
    });
  }

  editEmployee(values){
    if (values.id_sucursal === null || values.nombre === null
      || values.apellido_paterno === null || values.apellido_materno === null
      || values.correo === null || values.telefono === null ||
      values.contrasena === null || values.rol === null ||
      values.verificar_contrasena === null){
        document.getElementById('kinto').style.display = 'block';
        setTimeout(() => document.getElementById('kinto').style.display = 'none', 3000);
    }else {
      this.employee = values;
      this.employee.id_empleado = this.id;
      if (values.contrasena === values.verificar_contrasena){
        this.citasApiS.cambio(`/employees/${this.id}`, this.employee).subscribe((res: any) => {
          this.getEmployees();
          this.employeeForm.reset(); 
          document.getElementById('uno').style.display = 'block';
          setTimeout(() => document.getElementById('uno').style.display = 'none', 3000);
          this.id = null;
          this.employeeForm.disable();
          console.log(res);
        })
        err => {
          console.log(err)
        }
      }else {
        document.getElementById('cuatro').style.display = 'block';
        setTimeout(() => document.getElementById('cuatro').style.display = 'none', 3000);
      }
    }
  }

  desactiveEmployees(id, estado){
    const body = {
      estatus: estado
    }
    this.citasApiS.cambio(`/deleteEmployee/${id}`, body).subscribe((data: any) => {
      console.log(data);
      if (body.estatus == 0){
        document.getElementById('dos').style.display = 'block';
        setTimeout(() => document.getElementById('dos').style.display = 'none', 3000);
      }else {
        document.getElementById('tres').style.display = 'block';
        setTimeout(() => document.getElementById('tres').style.display = 'none', 3000);
      }
      this.getEmployees();
      err => {
        console.log(err)
      }
    });
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
  
}
