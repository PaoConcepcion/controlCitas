import { Component, OnInit } from '@angular/core';
import { CitasApiService } from './../../services/citas-api/citas-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { strings } from '../../shared/models/strings-template';

@Component({
  selector: 'app-edit-services',
  templateUrl: './edit-services.component.html',
  styleUrls: ['./edit-services.component.css']
})
export class EditServicesComponent implements OnInit {

  public strings = strings;

  public servicios = [];
  public inactivos = [];

  public reactivar = 1;

  public tuplaId = null;
  public currentStatus = 1;

  public imagenUpload: null;
  public imagen: any = [];
  public preview: string;

  public newServicioForm = new FormGroup({
    id_servicio: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    descripcion: new FormControl('', Validators.required),
    imagen: new FormControl('',  Validators.required),
    costo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), Validators.maxLength(10)])
  });

  public buscarForm = new FormGroup({
    busqueda: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  });

  constructor(
    private citasApiService: CitasApiService,
    private sanitizer: DomSanitizer
  ) {
    this.newServicioForm.setValue({
      id_servicio: '',
      nombre: '',
      descripcion: '',
      imagen: '',
      costo: '',
    });
    this.buscarForm.setValue({
      busqueda: '',
    });
  }

  ngOnInit(): void {
    document.getElementById('uno').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
    document.getElementById('tres').style.display = 'none';
    this.actualizar();
  }

  public actualizar() {
    this.citasApiService
      .consulta('/services')
      .subscribe((res: any) => {
        console.log(res);
        this.servicios = [];
        this.inactivos = [];
        for (const o of res) {
          if (o.estatus == 1) {
            this.servicios.push(o);
          } else {
            this.inactivos.push(o);
          }
        }
      });
  }

  reactivarServicios() {
    if (this.reactivar === 1) {
      this.reactivar = 0;
    } else {
      this.reactivar = 1;
    }
  }

  public newServicio(form, tuplaId = this.tuplaId) {
    console.log('form img-> ' + form.imagen);
    if (this.newServicioForm.valid ) {
      // Guardar imagen en assets
      const formD = new FormData();
      this.imagen.forEach(archivo => {
        formD.append('imagen', archivo);
      });
      this.citasApiService.upload('/upload', formD).subscribe((res: any) => {
        console.log(res);
      });

      // Guardar el registro en la base de datos
      if (this.currentStatus == 1) {
        const data = {
          id_servicio: 0,
          nombre: form.nombre,
          descripcion: form.descripcion,
          // imagen: form.imagen,
          imagen: this.imagen[0].name,
          costo: form.costo,
        };

        this.citasApiService.alta(`/services`, data).then(() => {

          this.mostrarAlerta('dos');

          this.newServicioForm.setValue({
            id_servicio: '',
            nombre: '',
            descripcion: '',
            imagen: '',
            costo: '',
          });
          this.actualizar();

        }).catch((err) => {
          console.log(err);
        });

      } else {
        const data = {
          nombre: form.nombre,
          descripcion: form.descripcion,
          // imagen: form.imagen,
          imagen: this.imagen[0].name,
          costo: form.costo,
        };

        this.citasApiService.cambio(`/services/${form.id_servicio}`, data).subscribe((res: any) => {
            this.currentStatus = 1;

            this.newServicioForm.setValue({
              id_servicio: '',
              nombre: '',
              descripcion: '',
              imagen: '',
              costo: '',
            });
            this.actualizar();

            this.mostrarAlerta('dos');
        });
      }

      this.imagen = [];
    } else {
      this.mostrarAlerta('uno');
    }
  }

  public editServicio(tuplaId) {
    this.citasApiService.consulta(`/services/${tuplaId}` ).subscribe((res: any) => {

      this.currentStatus = 2;
      this.tuplaId = res.id_servicio;

      this.newServicioForm.setValue({
        id_servicio: res.id_servicio,
        nombre: res.nombre,
        descripcion: res.descripcion,
        costo: res.costo,
        // imagen: res.imagen
        imagen: ''
      });
    });
  }

  public deleteServicio(tuplaId, estado) {
    const data = {
      estatus: estado
    };
    this.citasApiService.cambio(`/deleteServices/${tuplaId}`, data)
      .subscribe((res: any) => {
        this.actualizar();

        this.mostrarAlerta('tres');
    });
  }

  buscar(form) {
    if (this.buscarForm.valid) {
      this.citasApiService.consulta(`/services-name/${form.busqueda}`).subscribe((res: any) => {
        this.servicios = res;
      });
    } else {
      this.mostrarAlerta('cuatro');
    }
  }

  upload(event): any {
    this.imagenUpload = event.target.files[0];
    this.extraerBase64(this.imagenUpload).then((imagen: any) => {
      this.preview = imagen.base;
    });
    this.imagen = [];
    this.imagen.push(this.imagenUpload);
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

  mostrarAlerta(alerta: string) {
    document.getElementById(alerta).style.display = 'block';
    setTimeout(() => document.getElementById(alerta).style.display = 'none', 5000);
  }
}
