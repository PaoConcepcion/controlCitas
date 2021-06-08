import { Component, OnInit } from '@angular/core';
import { CitasApiService } from '../../services/citas-api/citas-api.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  employees: any [] = [];

  constructor(private citasA: CitasApiService) { }

  ngOnInit(): void {
  }

}
