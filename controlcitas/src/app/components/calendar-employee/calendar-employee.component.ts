import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { CitasApiService } from '../../services/citas-api/citas-api.service';
import { strings } from './../../shared/models/strings-template';
import { Subject } from 'rxjs';
// import RRule from 'rrule';

@Component({
  selector: 'app-calendar-employee',
  templateUrl: './calendar-employee.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: []
})
export class CalendarEmployeeComponent implements OnInit  {
  activeEmployees = [];
  deleteEmployees = [];
  news: any [] = [];
  show: Boolean = true;
  busqueda: any;
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
  empleados = [];
  
  refresh: Subject<any> = new Subject();
  view: CalendarView = CalendarView.Day;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  dayStartHour = Math.max(8);
  dayEndHour = Math.min(20);

  excludeDays: number[] = [];
  strings = strings;

  constructor(private citasApiService: CitasApiService) { }

  ngOnInit(): void {
    this.actualizar();
    this.getEmpleado();
    console.log(this.news);
  }

  getEmployee(id_empleado) {
    this.citasApiService.busqueda(`/employees/${id_empleado}`).subscribe((res: any) => {
      this.employee = res;
      console.log(this.employee);
      this.id = id_empleado;
      this.employeeForm.enable();
      err =>{
        console.log(err);
      }
    });
  }

  getEmpleado(){
    this.citasApiService.consulta('/employees').subscribe((res: any) => {
      this.news = res;
      err =>{
        console.log(err);
      }
    });
  }

  private actualizar() {
    this.citasApiService.consulta('/schedules_employee')
      .subscribe((res: any) => {
        if (res) {
          this.dayStartHour = res.entrada;
          this.dayEndHour = res.salida;

          if (res.domingo == '0') {
            this.excludeDays.push(0);
          }
          if (res.lunes == '0') {
            this.excludeDays.push(1);
          }
          if (res.martes == '0') {
            this.excludeDays.push(2);
          }
          if (res.miercoles == '0') {
            this.excludeDays.push(3);
          }
          if (res.jueves == '0') {
            this.excludeDays.push(4);
          }
          if (res.viernes == '0') {
            this.excludeDays.push(5);
          }
          if (res.sabado == '0') {
            this.excludeDays.push(6);
          }

          this.citasApiService.consulta('/datesEmployee')
            .subscribe((res: any) => {
              for (const o of res) {
                this.events = [
                  ...this.events,
                  {
                    title: o.nombre,
                    start: new Date(o.fecha + ' ' + o.hora_entrada),
                    end: new Date(o.fecha + ' ' + o.hora_salida),
                    color: colors.blue,
                  }
                ];
              }
              this.refresh.next();
          });
        }
    });
  }

  searchActive(){
    this.activeEmployees = [];
    this.citasApiService.consulta('/employees').subscribe((res: any) => {
      for (const employee of res){
        if (employee.estatus == 1 && employee.nombre == this.busqueda ||
          employee.estatus == 1 && employee.apellido_materno == this.busqueda
          || employee.estatus == 1 && employee.apellido_paterno == this.busqueda){
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
    this.citasApiService.consulta('/employees').subscribe((res: any) => {
      for (const employee of res){
        if (employee.estatus == 0 && employee.nombre == this.busqueda ||
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

}

const colors: any = {
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  }
};