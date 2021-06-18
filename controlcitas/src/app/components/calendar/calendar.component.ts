import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { setHours, setMinutes } from 'date-fns';
import { colors } from './../../utils/colors';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: []
})
export class CalendarComponent {

  view: CalendarView = CalendarView.Day;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'No event end date',
      start: setHours(setMinutes(new Date(), 0), 3),
      color: colors.yellow,
    },
    {
      title: 'No event end date',
      start: setHours(setMinutes(new Date(), 0), 5),
      color: colors.purple,
    },
    {
      title: 'No event end date',
      start: setHours(setMinutes(new Date(), 0), 4),
      color: colors.blue,
    },
    {
      title: 'No event end date',
      start: setHours(setMinutes(new Date(), 0), 6),
      color: colors.red,
    },
    {
      title: 'No event end date',
      start: setHours(setMinutes(new Date(), 0), 2),
      color: colors.green,
    },
  ];
}
