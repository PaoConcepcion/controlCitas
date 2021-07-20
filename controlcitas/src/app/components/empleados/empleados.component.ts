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
  isDisable: Boolean = true;
  estado: number;
  busqueda: any;
  search = [];
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
      { type: "minLength", message: "longitud minima de 3"}
    ],
    apellido_materno: [
      { type: "required", message: "se requiere del apellido materno"},
      { type: "minLength", message: "longitud minima de 4"}
    ],
    apellido_paterno: [
      { type: "required", message: "se requiere del apellido paterno"},
      { type: "minLength", message: "longitud minima de 4"}
    ],
    correo: [
      { type: "required", message: "se requiere del correo"},
      { type: "pattern", message: "el correo no es valido" }
    ],
    telefono: [
      { type: "required", message: "se requiere del telefono"},
      { type: "minlength", message: "longitud minima de 8"},
      { type: "maxlength", message: "longitud maxima de 12"},
    ],
    contrasena: [
      { type: "required", message: "se requiere de una contraseña"},
      { type: "minLength", message: "longitud minima de 8"},
    ],
    verificar_contrasena: [
      { type: "required", message: "verifique su contraseña"},
      { type: "minLength", message: "longitud minima de 8"},
    ],
    rol: [
      { type: "required", message: "no se ha seleccido el tipo de usuario"},
    ]
  }

  constructor(private citasApiS: CitasApiService, private formB: FormBuilder) {
    this.employeeForm = this.formB.group({
      id_empleado: new FormControl(null),
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
        Validators.minLength(8),
        Validators.maxLength(12)
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
    document.getElementById('seis').style.display = 'none';
    document.getElementById('ceis').style.display = 'none';
    document.getElementById('kinto').style.display = 'none';
    this.employeeForm.disable();
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
      this.isDisable = false;
      this.employeeForm.enable();
      err =>{
        console.log(err);
      }
    });
  }

  getEmployees(){
    this.activeEmployees = [];
    this.deleteEmployees = [];
    this.citasApiS.consulta('/employees2').subscribe((res: any) => {
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

  searchActive(){
    this.activeEmployees = [];
    this.citasApiS.consulta('/employees').subscribe((res: any) => {
      for (const employee of res){
        if (employee.estatus == 1 && employee.nombre == this.busqueda ||
          employee.estatus == 1 && employee.apellido_materno == this.busqueda
          || employee.estatus == 1 && employee.apellido_paterno == this.busqueda
          || employee.estatus == 1 && employee.id_empleado == this.busqueda){
          this.activeEmployees.push(employee)
        }
      };
      if (this.activeEmployees.length <= 0){
        document.getElementById('seis').style.display = 'block';
        setTimeout(() => document.getElementById('seis').style.display = 'none', 3000);
      };
      err =>{
        console.log(err);
      }
    });
  }

  searchDesactive(){
    this.deleteEmployees = [];
    this.citasApiS.consulta('/employees').subscribe((res: any) => {
      for (const employee of res){
        if (employee.estatus == 0 && employee.nombre == this.busqueda ||
          employee.estatus == 0 && employee.id_empleado == this.busqueda ||
          employee.estatus == 0 && employee.apellido_materno == this.busqueda ||
          employee.estatus == 0 && employee.apellido_paterno == this.busqueda){
            this.deleteEmployees.push(employee);
        }
      };
      if (this.deleteEmployees.length <= 0){
        document.getElementById('ceis').style.display = 'block';
        setTimeout(() => document.getElementById('ceis').style.display = 'none', 3000);
      };
      err =>{
        console.log(err);
      }
    });
  }

  editEmployee(values){
    console.log(values.rol)
    if (!this.employeeForm.valid){
        document.getElementById('kinto').style.display = 'block';
        setTimeout(() => document.getElementById('kinto').style.display = 'none', 3000);
    }else {
      if(values.rol == 2){
        this.employee.rol = "admin"
      }else {
        this.employee.rol = "employee"
      }
      const emp = {
        id_empleado: this.id,
        id_sucursal: values.id_sucursal,
        nombre: values.nombre,
        apellido_paterno: values.apellido_paterno,
        apellido_materno: values.apellido_materno,
        correo: values.correo,
        contrasena: values.contrasena,
        telefono: values.telefono,
        rol: this.employee.rol
      }
      if (values.contrasena === values.verificar_contrasena){
        this.citasApiS.cambio(`/employees/${this.id}`, emp).subscribe((res: any) => {
          this.getEmployees();
          this.employeeForm.reset();
          this.isDisable = true;
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
