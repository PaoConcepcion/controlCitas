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
  employee = [];
  busqueda: any;
  strings = strings;

  constructor(private citasApiS: CitasApiService,
    private formB: FormBuilder) { }

  ngOnInit(): void {
    this.getService();
    document.getElementById('uno').style.display = 'none';
  }

  getAll(){
    this.employee = [];
    this.citasApiS.consulta('/employees').subscribe((res: any) => {
      this.employee = res;
      err =>{
        console.log(err);
      }
      console.log(this.employee)
    });
  }

  employeeSearch(){
    this.employee = [];
    this.citasApiS.consulta('/employees').subscribe((res: any) => {
      for (const employee of res){
        if (employee.nombre === this.busqueda || employee.id_empleado === this.busqueda || 
          employee.id_sucursal === this.busqueda || employee.apellido_paterno === this.busqueda || 
          employee.apellido_materno === this.busqueda){
          this.employee.push(employee);
        }
      };
      if (this.employee.length <= 0){
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

  employeeUnsigned(){
    
  }

  signServices(empleado){

  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}
