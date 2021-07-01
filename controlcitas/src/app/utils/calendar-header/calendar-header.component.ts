import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { strings } from '../../shared/models/strings-template';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styles: []
})
export class CalendarHeaderComponent {

  public strings = strings;

  @Input() view: CalendarView;

  @Input() viewDate: Date;

  @Input() locale: string = 'en';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;
}
