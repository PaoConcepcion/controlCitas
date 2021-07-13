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
  sche: boolean = false;
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
    jueves: 0,
    viernes: 0,
    sabado: 0,
    domingo: 0,
    entrada: null,
    salida: null,
    descanso_inicio: null,
    descanso_fin: null
  };

  validation_messages = {
    entrada: [
      { type: "required", message: "Ingrese la hora de entrada"}
    ],
    salida: [
      { type: "required", message: "Ingrese la hora de salida"},
    ],
    descanso_inicio: [
      { type: "required", message: "Ingresa la hora de descanso"},
    ],
    descanso_fin: [
      { type: "required", message: "Ingrese la hora de regreso del descanso"},
    ]
  }

  constructor(private citasApi: CitasApiService, 
    private formB: FormBuilder) {
    this.scheForm = this.formB.group({
      nombre: new FormControl(null),
      id_empleado: new FormControl(null),
      lunes: new FormControl(null),
      martes: new FormControl(null),
      miercoles: new FormControl(null),
      jueves: new FormControl(null),
      viernes: new FormControl(null),
      sabado: new FormControl(null),
      domingo: new FormControl(null),
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
    document.getElementById('dia').style.display = 'none';
    document.getElementById('dias').style.display = 'none';
    document.getElementById('uno').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
    document.getElementById('tres').style.display = 'none';
    document.getElementById('cuatro').style.display = 'none';
    document.getElementById('cuatros').style.display = 'none';
    document.getElementById('kinto').style.display = 'none';
    document.getElementById('alertas').style.display = 'none';
    this.getAll();
    this.getEmployees();
  }

  getEmployees(){
    this.citasApi.consulta('/employeesSchedule').subscribe((res: any) => {
      this.employees = res;
      err =>{
        console.log(err);
      }
    });
  }

  searchEmployee(){
    this.employees = [];
    this.citasApi.consulta(`/employeesSchedule`).subscribe((res: any) => {
      for (const employee of res){
        if (employee.nombre == this.busqueda || employee.id_empleado == this.busqueda){
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
    this.citasApi.consulta('/schedules').subscribe((res: any) => {
      this.schedules = res;
      err =>{
        console.log(err);
      }
    });
  }

  search(){
    this.schedules = [];
    this.citasApi.busqueda(`/schedules/${this.busqueda}`)
    .subscribe((res: any) => {
      const value = res;
      if (!value){
        document.getElementById('alertas').style.display = 'block';
        setTimeout(() => document.getElementById('alertas').style.display = 'none', 3000);
      }else {
        this.schedules.push(res);
        err =>{
          console.log(err);
        }
      }
    });
  }

  signSchedule(values){
    if(this.scheForm.valid){
      this.new = values;
      this.new.id_horario = 0;
      const dias = values.lunes + values.martes + values.miercoles
      + values.jueves + values.viernes + values.sabado + values.domingo;
      if (dias <= 3){
        document.getElementById('dias').style.display = 'block';
        setTimeout(() => document.getElementById('dias').style.display = 'none', 3000);
      }else {
        this.citasApi.alta('/schedules', this.new).then((res: any) => {
          console.log(this.new ,res);
          this.getEmployees();
          this.getAll();
          this.scheForm.reset();
          document.getElementById('uno').style.display = 'block';
          setTimeout(() => document.getElementById('uno').style.display = 'none', 3000);
        }).catch((error) => {
          console.log(error)
        });
      }
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
        jueves: this.new.jueves,
        viernes: this.new.viernes,
        sabado: this.new.sabado,
        domingo: this.new.domingo,
        entrada: value.entrada,
        salida: value.salida,
        descanso_inicio: value.descanso_inicio,
        descanso_fin: value.descanso_fin
      }
      console.log(value)
      console.log(schedule)
      const dias = schedule.lunes + schedule.martes + schedule.miercoles
      + schedule.jueves + schedule.viernes + schedule.sabado + schedule.domingo;
      if (dias <= 3){
        document.getElementById('dia').style.display = 'block';
        setTimeout(() => document.getElementById('dia').style.display = 'none', 3000);
      }else {
        this.citasApi.cambio(`/schedules/${schedule.id_horario}`, schedule)
        .subscribe((res: any) => {
          console.log(schedule, res);
          this.getAll();
          this.getEmployees();
          this.scheForm.reset();
          document.getElementById('tres').style.display = 'block';
          setTimeout(() => document.getElementById('tres').style.display = 'none', 3000);
          err => {
          console.log(err);
          }
        });
      }
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

  redo(){
    this.scheForm.reset();
      this.new.lunes = 0;
      this.new.martes = 0;
      this.new.miercoles = 0;
      this.new.jueves = 0;
      this.new.viernes = 0;
      this.new.sabado = 0;
      this.new.domingo = 0;
  }
}
