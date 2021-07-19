import { Component, OnInit } from '@angular/core';
import { CitasApiService } from './../../services/citas-api/citas-api.service';
import { strings } from '../../shared/models/strings-template';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styles: []
})
export class ServicesComponent implements OnInit {
  public services = [];
  public strings = strings;

  constructor( private citasApiS: CitasApiService) {

  }

  ngOnInit(): void {
    this.citasApiS.consulta('/active-services').subscribe((res: any) => {
      this.services = res;
    });
  }

}