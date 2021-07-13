import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CitasApiService } from './../../services/citas-api/citas-api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { strings } from './../../shared/models/strings-template';

@Component({
  selector: 'app-news',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {
  public strings = strings;
  newsForm: FormGroup;
  news: any [] = [];
  new = {
    id_sucursal: null,
    nombre: null,
    telefono: null,
    cp: null,
    colonia: null,
    calle: null,
    numero_exterior: null,
    numero_interior: null,
    latitud: null,
    longitud: null
  };
  id: number;
  colonia: string;
  imagen: any = [];
  preview: string;
  imagenUpload: null; 

  validation_messages = {
    nombre: [
      { type: "required", message: "se requiere de un nombre de sucursal"},
      { type: "maxLength", message: "longitud maxima de 40"}
    ],
    telefono: [
      { type: "required", message: "se requiere telefono"},
      { type: "maxLength", message: "longitud maxima de 10"},
      { type: "minLength", message: "longitud minima de 10"},
    ],
    cp: [
        { type: "required", message: "se requiere C.P"},
        { type: "maxLength", message: "longitud maxima de 5"},
        { type: "minLength", message: "longitud minima de 5"},
      ],
      colonia: [
        { type: "required", message: "se requiere de nombre de colonia"},
        { type: "maxLength", message: "longitud maxima de 40"}
      ],
      calle: [
        { type: "required", message: "se requiere de nombre de la calle"},
        { type: "maxLength", message: "longitud maxima de 40"}
      ],  
      numero_exterior: [
        { type: "required", message: "se requiere del numero del lugar"},
        { type: "maxLength", message: "longitud maxima de 40"}
      ],
      latitud: [
        { type: "required", message: "se requiere latitud"},
        { type: "maxLength", message: "longitud maxima de 40"}
      ],
      longitud: [
        { type: "required", message: "se requiere longitud"},
        { type: "maxLength", message: "longitud maxima de 40"}
      ],
  }

  constructor(private formB: FormBuilder, private citasApiS: CitasApiService,
    private sanitizer: DomSanitizer) { 
    this.newsForm = this.formB.group({
      id_sucursal: new FormControl(),
      nombre: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(40),
      ])),
      telefono: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern('^[0-9]*$'),
      ])),
      cp: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(5),
      ])),
      colonia: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(40),
      ])),
      calle: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(40),
      ])),
      numero_exterior: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(5),
      ])),
      numero_interior: new FormControl("", Validators.compose([
        // Validators.required,
        Validators.maxLength(5),
      ])),
      latitud: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(40),
      ])),
      longitud: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(40),
      ])),
    })
  }

  ngOnInit(): void {
    this.getSucursalN();
    document.getElementById('cuatro').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
    document.getElementById('tres').style.display = 'none';
    document.getElementById('uno').style.display = 'none';
  }

  getSucursal(id_sucursal){
    this.citasApiS.busqueda(`/sucursales/${id_sucursal}`).subscribe((res: any) => {
      this.new = res;
      console.log(this.new)
      err =>{
        console.log(err);
      }
    });
    this.id = id_sucursal
  }

  getSucursalN(){
    this.citasApiS.consulta('/sucursales').subscribe((res: any) => {
      this.news = res;
      err =>{
        console.log(err);
      }
    });
  }

  sucursalRegister(values){
      if(this.id == null){
        this.id = 0;
      } else {
        this.id = this.new.id_sucursal;
      }
      if(this.new.nombre, this.new.telefono, this.new.cp, this.new.colonia, this.new.calle, this.new.numero_exterior, this.new.latitud, this.new.longitud == null){
        document.getElementById('dos').style.display = 'block';
        setTimeout(() => document.getElementById('dos').style.display = 'none', 10000);
      } else{
        if(this.new.telefono.length<10){
          document.getElementById('tres').style.display = 'block';
          setTimeout(() => document.getElementById('tres').style.display = 'none', 10000);
        } else{
          if(this.new.cp.length<5){
            document.getElementById('uno').style.display = 'block';
            setTimeout(() => document.getElementById('uno').style.display = 'none', 10000);
          } else{
    this.new = values;
    this.new.id_sucursal = this.id;
    this.citasApiS.alta('/sucursales', this.new).then((res: any) => {
      this.getSucursalN();
      console.log(values, res);
      document.getElementById('cuatro').style.display = 'block';
      setTimeout(() => document.getElementById('cuatro').style.display = 'none', 10000);
      this.new.nombre = this.new.telefono = this.new.cp = this.new.colonia = this.new.calle = this.new.numero_exterior = this.new.numero_interior = this.new.latitud = this.new.longitud = null;
    }).catch((error) => {
      console.log(error);
    });
    const formD = new FormData();
    this.id = null;
        }
      }
    }
  }

  deleteSucursal(id){
    this.citasApiS.delete(`/sucursales/${id}`).subscribe((data: any) => {
      console.log(data);
      this.getSucursalN();
      err => {
        console.log(err)
      }
    });
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    }catch (e) {
      return null;
    }
  });

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }
  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}
}