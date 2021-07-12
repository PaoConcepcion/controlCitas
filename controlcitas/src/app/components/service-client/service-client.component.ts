import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CitasApiService } from './../../services/citas-api/citas-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { strings } from './../../shared/models/strings-template';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { format, addDays, addYears, getDay, addMinutes } from 'date-fns';

@Component({
  selector: 'app-service-client',
  templateUrl: './service-client.component.html',
  styleUrls: ['./service-client.component.css']
})
export class ServiceClientComponent implements OnInit {

  refresh: Subject<any> = new Subject();
  view: CalendarView = CalendarView.Day;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  startHour = 8;
  endHour = 20;
  startMinute = 0;
  endMinute = 0;

  public strings = strings;

  @Input() public id: any;
  public service: any;
  public bandera;
  public empleados;
  public sucursales;
  public usuario;

  public dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
  public fechaMinima;
  public fechaMaxima;

  public evento;

  public citaForm = new FormGroup({
    dia: new FormControl('', Validators.compose([Validators.required])),
    sucursal: new FormControl('', Validators.compose([Validators.required])),
    empleado: new FormControl('', Validators.compose([Validators.required])),
    hora: new FormControl('', Validators.compose([Validators.required])),
  });
  
  public usuarioForm = new FormGroup({
    nombre: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
    apellido_paterno: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
    apellido_materno: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
    correo: new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.maxLength(30)])),
    telefono: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(10),
      Validators.maxLength(10)])),
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
    nombre: [
      { type: "required", message: "Se requiere de un nombre"},
      { type: "maxLenght", message: "Longitud maxima de 30"}
    ],
    apellido_paterno: [
      { type: "required", message: "Se requiere de un apellido paterno"},
      { type: "maxLenght", message: "Longitud maxima de 30"}
    ],
    apellido_materno: [
      { type: "required", message: "Se requiere de un apellido materno"},
      { type: "maxLenght", message: "Longitud maxima de 30"}
    ],
    correo: [
      { type: "required", message: "Se requiere de un correo"},
      { type: "maxLenght", message: "Longitud maxima de 50"},
      { type: "email", message: "Ingrese un correo válido"},
    ],
    telefono: [
      { type: "required", message: "Se requiere de un telefono"},
      { type: "maxLenght", message: "Longitud maxima de 10"},
      { type: "minLength", message: "Songitud minima de 10"},
      { type: "pattern", message: "Solo números son permitidos"},
    ],
  }

  constructor(private activatedRoute: ActivatedRoute, private citasApiService: CitasApiService, private modalService: NgbModal) {
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.fechaMinima = format(addDays(new Date(), 1), 'yyyy-MM-dd');
    this.fechaMaxima = format(addYears(new Date(), 1), 'yyyy-MM-dd');
    this.usuario = null;

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

  getEmpleados(form) {
    if (form.sucursal && form.dia) {
      this.empleados = [];
      form.empleado = '';
      this.citaForm.setValue(form);
      this.events = [];

      this.viewDate = new Date(form.dia + ' 00:00:00');
      this.citasApiService.consulta(`/employees_available/${this.dias[getDay(this.viewDate)]}/${this.id}/${form.sucursal}`)
      .subscribe((res: any) => {
        this.empleados = res;
      });
    }
  }

  editarCorreo(correo) {
    this.usuario = null;
    this.usuarioForm.controls['correo'].enable();
    this.usuarioForm.reset();
    this.usuarioForm.controls['correo'].setValue(correo);
  }
  
  getUser(correo) {
    if (correo) {
      this.usuario = [];
      this.usuarioForm.controls['correo'].disable();
      this.citasApiService.consulta(`/users_email/${correo}`)
      .subscribe((res: any) => {
        this.usuarioForm.reset();
        this.usuarioForm.controls['correo'].setValue(correo);
        if (res) {
          this.usuario = res;
          this.usuarioForm.setValue({
            nombre: res.nombre,
            apellido_paterno: res.apellido_paterno,
            apellido_materno: res.apellido_materno,
            correo: res.correo,
            telefono: res.telefono
          });
        }
      });
    }
  }

  actualizaCalendario(empleado: string, dia: string) {
    if (empleado && dia) {
      this.citasApiService.consulta(`/schedules_hours/${empleado}`)
      .subscribe((res: any) => {
        const entrada = res.entrada.split(':', 2);
        const salida = res.salida.split(':', 2);

        this.startHour = entrada[0];
        this.endHour = salida[0];
        this.startMinute = entrada[1];
        this.endMinute = salida[1];

        this.events =[{
          title: 'Ocupado',
          start: new Date(dia + ' ' + res.descanso_inicio),
          end: new Date(dia + ' ' + res.descanso_fin),
          color: colors.blue
        }];

        this.citasApiService.consulta(`/datesEmployeeDay/${empleado}/${dia}`)
        .subscribe((res: any) => {
          for (const o of res) {
            this.events = [
              ...this.events,
              {
                title: 'Ocupado',
                start: new Date(dia + ' ' + o.hora_entrada),
                end: new Date(dia + ' ' + o.hora_salida),
                color: colors.blue,
              }
            ];
          }
          this.refresh.next();
        });
      });
    }
  }

  setCita(hora, dia, empleado){
    if (this.evento) {
      this.events = this.events.filter((event) => event !== this.evento);
    }
    
    this.evento = {
      title: this.service.nombre,
      start: new Date(dia + ' ' + hora),
      end: addMinutes(new Date(dia + ' ' + hora), this.service.duracion),
      color: colors.purple,
    }
    if (hora && empleado && dia) {
      this.events = [
        ...this.events,
        this.evento
      ];
    }
  }

  newCita(dateform, userForm) {

    if(this.citaForm.valid && this.usuarioForm) {
      if ( !this.usuario.id_usuario ) {
        this.usuario.id_usuario = 0;
      }
      const data = {
        id_usuario: this.usuario.id_usuario,
        nombre: userForm.nombre,
        apellido_paterno: userForm.apellido_paterno,
        apellido_materno: userForm.apellido_materno,
        correo: userForm.correo,
        telefono: userForm.telefono
      };
      this.citasApiService.alta(`/users`, data).then((res) => {
        console.log(res);
      });

      this.mostrarAlerta('cuatro');
    } else {
      this.mostrarAlerta('uno');
    }
  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  mostrarAlerta(alerta: string) {
    document.getElementById(alerta).style.display = 'block';
    setTimeout(() => document.getElementById(alerta).style.display = 'none', 5000);
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}

const colors: any = {
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#FFFC4C',
    secondary: '#FFFEC6',
  },
  purple: {
    primary: '#862BFF',
    secondary: '#D6B7FF',
  }
};
