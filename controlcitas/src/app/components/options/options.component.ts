import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CitasApiService } from './../../services/citas-api/citas-api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { strings } from './../../shared/models/strings-template';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  icono: any = [];
  logotipo: any = [];
  preview: string;
  preview2: string;
  imagenUpload: null;
  imagenUpload2: null;
  option = {
    id_opciones: null,
    nombre_sitio: null,
    logotipo: null,
    icono: null,
    facebook: null,
    instagram: null,
    contacto: null,
    acerca_de: null,
  }
  strings = strings;
  optionForm: FormGroup;

  validation_messages = {
    nombre_sitio: [
      { type: "required", message: "se requiere de un nombre"},
    ],
    logotipo: [
      { type: "required", message: "se requiere un logotipo"},
    ],
    icono: [
      { type: "required", message: "se requiere un icono"},
    ],
    contacto: [
      { type: "required", message: "se requiere la informacion de contacto del sitio"},
    ],
    acerca_de: [
      { type: "required", message: "se requiere un descripcion del sitio"},
    ]
  }

  constructor(private formB: FormBuilder, private citasA: CitasApiService,
    private sanitizer: DomSanitizer) {
      this.optionForm = this.formB.group({
        id_opciones: new FormControl(),
        nombre_sitio: new FormControl("", Validators.compose([
          Validators.required,
        ])),
        logotipo: new FormControl("", Validators.compose([
          Validators.required,
        ])),
        icono: new FormControl("", Validators.compose([
          Validators.required,
        ])),
        facebook: new FormControl(""),
        instagram: new FormControl(""),
        contacto: new FormControl("", Validators.compose([
          Validators.required,
        ])),
        acerca_de: new FormControl("", Validators.compose([
          Validators.required,
        ]))
      })
    }

  ngOnInit(): void {
    this.getOptions();
    document.getElementById('uno').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
  }

  getOptions(){
    this.citasA.consulta('/options').subscribe((res: any) => {
      this.option = res[0];
      console.log(this.option);
      err =>{
        console.log(err);
      }
    });
  }

  editOptions(value){
    if (!this.optionForm.valid){
      document.getElementById('dos').style.display = 'block';
      setTimeout(() => document.getElementById('dos').style.display = 'none', 3000);
    }else{
      const id = this.option.id_opciones;
      const options = {
        id_opciones: id,
        nombre_sitio: value.nombre_sitio,
        logotipo: this.logotipo[0].name,
        icono: this.icono[0].name,
        acerca_de: value.acerca_de,
        contacto: value.contacto,
        facebook: value.facebook,
        instagram: value.instagram
      }
      this.citasA.cambio(`/options/${id}`, options)
      .subscribe((res: any) => {
        console.log(res);
      });
      const form = new FormData();
      const formData = new FormData();
      this.icono.forEach(archivo => {
        form.append('imagen', archivo);
      });
      this.citasA.upload('/upload', form).subscribe((res: any) => {
        console.log(res);
      });
      this.logotipo.forEach(archivo => {
        formData.append('imagen', archivo);
      });
      this.citasA.upload('/upload', formData).subscribe((res: any) => {
        console.log(res);
      });
      this.getOptions();
      document.getElementById('uno').style.display = 'block';
      setTimeout(() => document.getElementById('uno').style.display = 'none', 3000);
      err => {
        console.log(err)
      }
    }
  }

  upload(event): any {
    this.imagenUpload = event.target.files[0];
    this.extraerBase64(this.imagenUpload).then((imagen: any) =>{
      this.preview = imagen.base;
    });
    this.logotipo.push(this.imagenUpload);
  }

  uploadIcon(event): any {
    this.imagenUpload2 = event.target.files[0];
    this.extraerBase64(this.imagenUpload2).then((imagen: any) =>{
      this.preview2 = imagen.base;
    });
    this.icono.push(this.imagenUpload2);
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
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

    } catch (e) {
      return null;
    }
  })

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }
}
