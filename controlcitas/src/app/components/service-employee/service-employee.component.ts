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
  servicios = [];
  employees = [];
  serviceSigned: any [] = [];
  busqueda: any;
  strings = strings;
  employee = {
    id_empleado_servicio: null,
    id_empleado: null,
    id_servicio: null
  }

  constructor(private citasApiS: CitasApiService,
    private formB: FormBuilder) { }

  ngOnInit(): void {
    this.getService();
    this.employeeSigned();
    document.getElementById('uno').style.display = 'none';
  }

  getEmployee(id_empleado) {
    this.citasApiS.busqueda(`/employees/${id_empleado}`).subscribe((res: any) => {
      this.employees = res;
      err =>{
        console.log(err);
      }
    });
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
    this.citasApiS.consulta('/services').subscribe((res: any) => {
      for (const service of res) {
        if (service.estatus == 1) this.servicios.push(service);
      }
    });
  }

  employeeSigned(){
    this.citasApiS.consulta('/employee_service').subscribe((res: any) => {
      this.serviceSigned = res[0];
      err =>{
        console.log(err);
      }
      console.log(this.serviceSigned)
    });
  }

  employeeUnsigned(){
    
  }

  signServices(empleado){

  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}
