import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CitasApiService } from './../../services/citas-api/citas-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { strings } from './../../shared/models/strings-template';
import { CalendarEvent, CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-service-client',
  templateUrl: './service-client.component.html',
  styleUrls: ['./service-client.component.css']
})
export class ServiceClientComponent implements OnInit {

  view: CalendarView = CalendarView.Day;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  startHour = 8;
  endHour = 20;

  public strings = strings;

  @Input() public id: any;
  public service: any;
  public bandera;
  public empleados;
  public sucursales;

  public dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

  public citaForm = new FormGroup({
    dia: new FormControl('', Validators.compose([Validators.required])),
    sucursal: new FormControl('', Validators.compose([Validators.required])),
    empleado: new FormControl('', Validators.compose([Validators.required])),
    hora: new FormControl('', Validators.compose([Validators.required])),
  });

  validation_messages = {
    dia: [
      { type: "required", message: "Elige un día"},
    ],
    sucursal: [
      { type: "required", message: "Elige una sucursal"},
    ],
    empleado: [
      { type: "required", message: "Elige un empleado"},
    ],
    hora: [
      { type: "required", message: "Elige una hora válida"},
    ],
  }

  constructor(private activatedRoute: ActivatedRoute, private citasApiService: CitasApiService, private modalService: NgbModal) {
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.citasApiService.consulta(`/services/${this.id}`)
      .subscribe((res: any) => {
        this.service = res;
      });
    this.citasApiService.consulta('/nomSucursales')
      .subscribe((res: any) => {
        this.sucursales = res.array;
      });
  }

  openXl(content) {
    this.modalService.open(content, { windowClass: 'my-class'});
  }

  getEmpleados(sucursal: string, dia: string) {
    if (sucursal && dia) {
      this.citasApiService.consulta(`/employees_available/${dia}/${this.id}/${sucursal}`)
      .subscribe((res: any) => {
        this.empleados = res;
      });
    }
  }

  actualizaCalendario(id_empleado: string) {
    if (id_empleado) {

    }
  }

  newCita(form) {

  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}
