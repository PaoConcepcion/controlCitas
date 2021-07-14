import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
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

  refresh: Subject<any> = new Subject();
  view: CalendarView = CalendarView.Day;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  dayStartHour = Math.max(8);
  dayEndHour = Math.min(20);

  excludeDays: number[] = [];
  lista: string[] = [];
  strings = strings;
  
  constructor(private citasApiService: CitasApiService) { }

  ngOnInit(): void {
    this.actualizar();
  }

  mostrarEmpleado(){

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