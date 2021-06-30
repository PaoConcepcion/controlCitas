import { Component, OnInit } from '@angular/core';
import { CitasApiService } from '../../services/citas-api/citas-api.service';
import { strings } from './../../shared/models/strings-template';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  schedules: any [] = [];
  employees: any [] = [];
  busqueda: any;
  strings = strings;
  new = {
    id_empleado: null,
    lunes: null,
    martes: null,
    entrada: null,
    salida: null,
    descanso_inicio: null,
    descanso_fin: null
  };

  constructor(private citasApi: CitasApiService) { }

  ngOnInit(): void {
    document.getElementById('uno').style.display = 'none';
    this.getEmployees();
  }

  getEmployees(){
    this.citasApi.consulta('/employees').subscribe((res: any) => {
      this.employees = res;
      err =>{
        console.log(err);
      }
    });
  }

  searchEmployee(){
    this.employees = [];
    this.citasApi.consulta(`/employees`).subscribe((res: any) => {
      for (const employee of res){
        if (employee.nombre === this.busqueda || employee.id_empleado === this.busqueda){
          this.employees.push(employee);
        }
      }
      if (this.employees.length <= 0){
        document.getElementById('dos').style.display = 'block';
        setTimeout(() => document.getElementById('dos').style.display = 'none', 3000);
      };
      err =>{
        console.log(err);
      }
    });
  }

  getAll(){
    this.schedules = [];
    this.citasApi.consulta('/').subscribe((res: any) => {
      this.schedules = res;
      err =>{
        console.log(err);
      }
    });
  }

  search(){
    this.schedules = [];
    this.citasApi.busqueda(`/./${this.busqueda}`)
    .subscribe((res: any) => {
      this.schedules = res;
      err =>{
        console.log(err);
      }
    });
  }

  signSchedule(){
    this.citasApi.alta('/./', this.new).then((res: any) => {
      console.log(res);
      document.getElementById('uno').style.display = 'block';
      setTimeout(() => document.getElementById('uno').style.display = 'none', 3000);
    }).catch((error) => {
      console.log(error)
    });
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }
}
