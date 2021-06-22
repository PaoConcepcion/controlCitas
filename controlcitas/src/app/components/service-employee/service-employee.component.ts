import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { CitasApiService } from '../../services/citas-api/citas-api.service';
import { strings } from './../../shared/models/strings-template';

@Component({
  selector: 'app-service-employee',
  templateUrl: './service-employee.component.html',
  styleUrls: ['./service-employee.component.css']
})
export class ServiceEmployeeComponent implements OnInit {
  services = [];
  employees = [];
  serviceSigned: any [] = [];
  busqueda: any;
  strings = strings;
  signForm: FormGroup;
  formEm = {
    id_empleado_servicio: null,
    id_empleado: null,
    id_servicio: null,
    nombre: null,
    apellidos: null,
    phone: null
  };
  employee = {
    id_empleado_servicio: null,
    id_empleado: null,
    id_servicio: null,
  };

  validation_messages = {
    id_servicio: [
      { type: "required", message: "servicio no seleccionado"}
    ],
  }

  constructor(private citasApiS: CitasApiService,
    private formB: FormBuilder) {
      this.signForm = this.formB.group({
        id_empleado: new FormControl({value: "", disabled: true}, Validators.compose([
          Validators.required,
          Validators.minLength(1)
        ])),
        id_servicio: new FormControl("", Validators.compose([
          Validators.required,
        ])),
        nombre: new FormControl({value: "", disabled: true}, Validators.compose([
          Validators.required,
        ])),
        apellidos: new FormControl({value: "", disabled: true}, Validators.compose([
          Validators.required,
        ])),
        phone: new FormControl({value: "", disabled: true}, Validators.compose([
          Validators.required,
        ]))
      });
    }

  ngOnInit(): void {
    this.getService();
    this.employeeSigned();
    document.getElementById('uno').style.display = 'none';
  }

  getAll(){
    this.employees = [];
    this.citasApiS.consulta('/employees').subscribe((res: any) => {
      this.employees = res;
      err =>{
        console.log(err);
      }
    });
  }

  employeeSearch(){
    this.employees = [];
    this.citasApiS.consulta('/employees').subscribe((res: any) => {
      for (const employee of res){
        if (employee.nombre === this.busqueda || employee.id_empleado === this.busqueda || 
          employee.id_sucursal === this.busqueda || employee.apellido_paterno === this.busqueda || 
          employee.apellido_materno === this.busqueda){
          this.employees.push(employee);
        }
      };
      if (this.employees.length <= 0){
        document.getElementById('uno').style.display = 'block';
        setTimeout(() => document.getElementById('uno').style.display = 'none', 3000);
      };
      err =>{
        console.log(err);
      }
    });
  }

  getService(){
    this.services = [];
    this.citasApiS.consulta('/active-services').subscribe((res: any) => {
      this.services = res;
    });
  }

  employeeSigned(){
    this.citasApiS.consulta('/employee_service').subscribe((res: any) => {
      this.serviceSigned = res[0];
      err =>{
        console.log(err);
      }
    });
  }

  employeeUnsigned(){

  }

  signServices(values){
    this.employee.id_empleado = values.id_empleado;
    this.employee.id_servicio = values.id_servicio;
    this.employee.id_empleado_servicio = 0;
    this.citasApiS.alta('/employee_service', this.employee).then((res: any) => {
      console.log(this.employee)
      console.log(res);
      this.signForm.reset();
      this.employeeSigned();
    }).catch((error) => {
      console.log(error);
    });
  }

  edit(id_empleado){

  }

  actualizar(id_empleado, nombre, apellido_paterno, apellido_materno, phone){
      this.formEm.nombre = nombre;
      this.formEm.apellidos = apellido_paterno + " " + apellido_materno;
      this.formEm.phone = phone;
      this.formEm.id_empleado = id_empleado;
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}
