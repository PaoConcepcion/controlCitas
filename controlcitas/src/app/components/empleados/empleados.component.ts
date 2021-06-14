import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { CitasApiService } from '../../services/citas-api/citas-api.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  activeEmployees = [];
  deleteEmployees = [];
  show: Boolean = true;
  estado: number;
  employeeForm: FormGroup;
  employee = {
    id_empleado: null,
    id_sucursal: null,
    nombre: null,
    apellido_paterno: null,
    apellido_materno: null,
    correo: null,
    contrasena: null,
    telefono: null,
    rol: null
  }

  constructor(private citasApiS: CitasApiService, private formB: FormBuilder) {
    this.employeeForm = this.formB.group({
      id_empleado: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])),
      id_sucursal: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])),
      nombre: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(3)
      ])),
      apellido_paterno: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(4)
      ])),
      apellido_materno: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(4)
      ])),
      correo: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        Validators.maxLength(50),
      ])),
      contrasena: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(8),
      ])),
      telefono: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(8),
        Validators.pattern("^[0-9]+$"),
      ])),
      rol: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(7),
        Validators.minLength(5),
      ]))
    })
   }

  ngOnInit(): void {
    this.getEmployees();
  }

  changeState(value){
    if(value == true){
      this.show = false;
    }else {
      this.show = true;
    };
  }

  getEmployees(){
    this.citasApiS.consulta('/employees').subscribe((res: any) => {
      for (const employee of res){
        if (employee.estatus == 1){
          this.activeEmployees.push(employee);
        }else {
          if (employee.estatus == 0){
            this.deleteEmployees.push(employee);
          }
        }
      };
      err =>{
        console.log(err);
      }
    });
  }

  editEmployee(values){
    
  }

  desactiveEmployees(id, estado){
    const body = {
      estatus: estado
    }
    this.citasApiS.cambio(`/deleteEmployee/${id}`, body).subscribe((data: any) => {
      console.log(data);
      this.getEmployees();
      err => {
        console.log(err)
      }
    });
  }


}
