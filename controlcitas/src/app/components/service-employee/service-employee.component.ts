import { Component, OnInit } from '@angular/core';
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
  serviceSigned = [];
  busqueda: any;
  busqueda2: any;
  strings = strings;
  nombre: string;
  apellidos: string;
  phone: any;
  employee = {
    id_empleado_servicio: null,
    id_empleado: null,
    id_servicio: null,
  };

  constructor(private citasApiS: CitasApiService) {}

  ngOnInit(): void {
    this.getService();
    this.employeeSigned();
    document.getElementById('uno').style.display = 'none';
    document.getElementById('unos').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
    document.getElementById('tres').style.display = 'none';
    document.getElementById('cuatro').style.display = 'none';
  }

  // obtener todos los empleados de la tabla empleados
  getAll(){
    this.employees = [];
    this.citasApiS.consulta('/employees').subscribe((res: any) => {
      this.employees = res;
      err =>{
        console.log(err);
      }
    });
  }

  // buscar empleado por la barra de busqueda
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

  // obtener los servicios disponibles
  getService(){
    this.services = [];
    this.citasApiS.consulta('/active-services').subscribe((res: any) => {
      this.services = res;
    });
  }

  // obtener todos los empleados con sus servicios asignados
  employeeSigned(){
    this.serviceSigned = null;
    this.citasApiS.consulta('/employee_service').subscribe((res: any) => {
      this.serviceSigned = res[0];
      err =>{
        console.log(err);
      }
    });
  }

  // buscar por id el empleado con sus servicios
  employeeSignSearch(){
    this.serviceSigned = [];
    this.citasApiS.consulta('/employee_service').subscribe((res: any) => {
      for (const employee of res[0]){
        if (employee.id_empleado == this.busqueda2 || employee.id_empleado_servicio == this.busqueda2
          || employee.nombre_empleado == this.busqueda2){
          this.serviceSigned.push(employee);
        }
      };
      if (this.serviceSigned.length <= 0){
        document.getElementById('unos').style.display = 'block';
        setTimeout(() => document.getElementById('unos').style.display = 'none', 3000);
      };
      console.log(this.serviceSigned);
      err =>{
        console.log(err);
      }
    });
  }

  // peticion para asignar un servicio al empleado
  signServices(){
    this.employee.id_empleado_servicio = 0;
    this.citasApiS.alta('/employee_service', this.employee).then((res: any) => {
      document.getElementById('dos').style.display = 'block';
      setTimeout(() => document.getElementById('dos').style.display = 'none', 3000);
      console.log(this.employee, res)
      this.employeeSigned();
    }).catch((error) => {
      console.log(error);
    });
  }

  // peticion borrar asignacion de servicio al empleado
  delete(){
    this.citasApiS.delete(`/employee_service/${this.employee.id_empleado_servicio}`)
    .subscribe((res: any) => {
      document.getElementById('cuatro').style.display = 'block';
      setTimeout(() => document.getElementById('cuatro').style.display = 'none', 3000);
      console.log(this.employee, res)
      this.employeeSigned();
    })
  }

  // peticion editar servicio asignado al empleado
  edit(){
    this.citasApiS.cambio(`/employee_service/${this.employee.id_empleado_servicio}`, this.employee)
    .subscribe((res: any) => {
      document.getElementById('tres').style.display = 'block';
      setTimeout(() => document.getElementById('tres').style.display = 'none', 3000);
      console.log(this.employee, res)
      this.employeeSigned();
      err =>{
        console.log(err);
      }
    })
  }

  // alerta: no se encontro el empleado
  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}
