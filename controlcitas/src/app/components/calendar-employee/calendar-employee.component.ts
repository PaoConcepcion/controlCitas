import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  public empleados = [];
  public inactivos = [];

  public reactivar = 1;
  
  refresh: Subject<any> = new Subject();
  view: CalendarView = CalendarView.Day;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  dayStartHour = Math.max(8);
  dayEndHour = Math.min(20);

  excludeDays: number[] = [];
  strings = strings;

  public buscarForm = new FormGroup({
    busqueda: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  });

  constructor(private citasApiService: CitasApiService) {
    this.buscarForm.setValue({
      busqueda: '',
    });
   }

  ngOnInit(): void {
    this.actualizar();
    this.getEmpleado();
    this.actualizarEmployee();
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

  public actualizarEmployee() {
    this.citasApiService
      .consulta('/employees')
      .subscribe((res: any) => {
        console.log(res);
        this.empleados = [];
        this.inactivos = [];
        for (const o of res) {
          if (o.estatus == 1) {
            this.empleados.push(o);
          } else {
            this.inactivos.push(o);
          }
        }
      });
  }

  reactivarServicios() {
    if (this.reactivar === 1) {
      this.reactivar = 0;
    } else {
      this.reactivar = 1;
    }
  }

  buscar(form) {
    if (this.buscarForm.valid) {
      this.citasApiService.consulta(`/employee-name/${form.busqueda}`).subscribe((res: any) => {
        this.empleados = res;
      });
    } else {
      console.log("Alert");
    }
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

}


const colors: any = {
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  }
};