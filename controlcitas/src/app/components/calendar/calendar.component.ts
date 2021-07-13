import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { CitasApiService } from '../../services/citas-api/citas-api.service';
import { getHours } from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: []
})
export class CalendarComponent implements OnInit  {

  view: CalendarView = CalendarView.Day;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  dayStartHour = Math.max(8);
  dayEndHour = Math.min(20);

  constructor(private citasApiService: CitasApiService) { }

  ngOnInit(): void {
    this.actualizar();
  }

  private actualizar() {
    this.citasApiService.consulta('/datesEmployee')
      .subscribe((res: any) => {
        for (const o of res) {
          this.events.push(
            {
              title: o.nombre,
              start: new Date(o.fecha +' '+ o.hora_entrada),
              end: new Date(o.fecha +' '+ o.hora_salida),
              color: colors.blue,
            }
          );
        }
    });
  }

}

const colors: any = {
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
};
