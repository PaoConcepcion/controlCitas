import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { CitasApiService } from '../../services/citas-api/citas-api.service';
import { strings } from './../../shared/models/strings-template';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  schedules: any [] = [];
  employees: any [] = [];
  busqueda: any;
  nombre: string;
  scheForm: FormGroup;
  strings = strings;
  new = {
    id_horario: null,
    id_empleado: null,
    lunes: 0,
    martes: 0,
    miercoles: 0,
    entrada: null,
    salida: null,
    descanso_inicio: null,
    descanso_fin: null
  };

  // validation_messages = {
  //   id_sucursal: [
  //     { type: "required", message: "sucursal no seleccionada"}
  //   ],
  //   nombre: [
  //     { type: "required", message: "se requiere del nombre"},
  //     { type: "minLength", message: "longitud minima de 3"}
  //   ],
  //   apellido_materno: [
  //     { type: "required", message: "se requiere del apellido materno"},
  //     { type: "minLength", message: "longitud minima de 4"}
  //   ],
  //   apellido_paterno: [
  //     { type: "required", message: "se requiere del apellido paterno"},
  //     { type: "minLength", message: "longitud minima de 4"}
  //   ],
  //   correo: [
  //     { type: "required", message: "se requiere del correo"},
  //     { type: "pattern", message: "el correo no es valido" }
  //   ],
  //   telefono: [
  //     { type: "required", message: "se requiere del telefono"},
  //     { type: "minlength", message: "longitud minima de 8"},
  //     { type: "maxlength", message: "longitud maxima de 12"},
  //   ],
  //   contrasena: [
  //     { type: "required", message: "se requiere de una contraseña"},
  //     { type: "minLength", message: "longitud minima de 8"},
  //   ],
  //   verificar_contrasena: [
  //     { type: "required", message: "verifique su contraseña"},
  //     { type: "minLength", message: "longitud minima de 8"},
  //   ],
  //   rol: [
  //     { type: "required", message: "no se ha seleccido el tipo de usuario"},
  //   ]
  // }

  constructor(private citasApi: CitasApiService, 
    private formB: FormBuilder) {
    this.scheForm = this.formB.group({
      nombre: new FormControl(null),
      id_empleado: new FormControl(null, Validators.compose([
        Validators.required,
      ])),
      lunes: new FormControl(null),
      martes: new FormControl(null),
      miercoles: new FormControl(null),
      entrada: new FormControl(null, Validators.compose([
        Validators.required,
      ])),
      salida: new FormControl(null, Validators.compose([
        Validators.required,
      ])),
      descanso_inicio: new FormControl(null, Validators.compose([
        Validators.required,
      ])),
      descanso_fin: new FormControl(null, Validators.compose([
        Validators.required,
      ]))
    })
  }

  ngOnInit(): void {
    document.getElementById('uno').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
    document.getElementById('tres').style.display = 'none';
    document.getElementById('cuatro').style.display = 'none';
    document.getElementById('cuatros').style.display = 'none';
    document.getElementById('kinto').style.display = 'none';
    this.getAll();
  }

  getEmployees(){
    this.citasApi.consulta('/employees').subscribe((res: any) => {
      this.employees = res;
      err =>{
        console.log(err);
      }
    });
  }

  searchEmployee(){
    this.employees = [];
    this.citasApi.consulta(`/employees`).subscribe((res: any) => {
      for (const employee of res){
        if (employee.nombre === this.busqueda || employee.id_empleado === this.busqueda){
          this.employees.push(employee);
        }
      }
      if (this.employees.length <= 0){
        document.getElementById('dos').style.display = 'block';
        setTimeout(() => document.getElementById('dos').style.display = 'none', 3000);
      };
      err =>{
        console.log(err);
      }
    });
  }

  getAll(){
    this.schedules = [];
    this.citasApi.consulta('/schedules').subscribe((res: any) => {
      this.schedules = res;
      err =>{
        console.log(err);
      }
    });
  }

  search(){
    this.schedules = [];
    this.citasApi.busqueda(`/./${this.busqueda}`)
    .subscribe((res: any) => {
      this.schedules = res;
      err =>{
        console.log(err);
      }
    });
  }

  signSchedule(values){
    if(this.scheForm.valid){
      this.new = values;
      this.new.id_horario = 0;
      this.citasApi.alta('/schedules', this.new).then((res: any) => {
        console.log(res);
        this.getAll();
        this.scheForm.reset();
        document.getElementById('uno').style.display = 'block';
        setTimeout(() => document.getElementById('uno').style.display = 'none', 3000);
      }).catch((error) => {
        console.log(error)
      });
    }else {
      document.getElementById('cuatro').style.display = 'block';
      setTimeout(() => document.getElementById('cuatro').style.display = 'none', 3000);
    }
  }

  editSchedule(value){
    if (this.scheForm.valid){
      const schedule = {
        id_horario: this.new.id_horario,
        id_empleado: value.id_empleado,
        lunes: this.new.lunes,
        martes: this.new.martes,
        miercoles: this.new.miercoles,
        entrada: value.entrada,
        salida: value.salida,
        descanso_inicio: value.descanso_inicio,
        descanso_fin: value.descanso_fin
      }
      this.citasApi.cambio(`/schedules/${schedule.id_horario}`, schedule)
      .subscribe((res: any) => {
        console.log(schedule, res);
        this.getAll();
        this.scheForm.reset();
        document.getElementById('tres').style.display = 'block';
        setTimeout(() => document.getElementById('tres').style.display = 'none', 3000);
        err => {
        console.log(err)
        }
      });
    }else {
      document.getElementById('cuatros').style.display = 'block';
      setTimeout(() => document.getElementById('cuatros').style.display = 'none', 3000);
    }
  }

  deleteSchedule(){
    this.citasApi.delete(`/schedules/${this.new.id_horario}`)
    .subscribe((res: any) => {
      console.log(res);
      this.getAll();
      document.getElementById('kinto').style.display = 'block';
      setTimeout(() => document.getElementById('kinto').style.display = 'none', 3000);
      err => {
        console.log(err)
      }
    })
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }
}
