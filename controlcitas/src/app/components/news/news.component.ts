import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CitasApiService } from './../../services/citas-api/citas-api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { strings } from './../../shared/models/strings-template';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsForm: FormGroup;
  news: any [] = [];
  new = {
    id_noticia: null,
    titulo: null,
    descripcion: null,
    imagen: null
  };
  busqueda: any;
  imagen: any = [];
  preview: string;
  imagenUpload: null;
  strings = strings;

  validation_messages = {
    titulo: [
      { type: "required", message: "se requiere de un titulo"},
    ],
    descripcion: [
      { type: "required", message: "se requiere de una descripcion"},
    ],
    imagen: [
      { type: "required", message: "imagen no insertada"},
    ],
  }

  constructor(
    private formB: FormBuilder, private sanitizer: DomSanitizer,
    private citasApiS: CitasApiService) {
    this.newsForm = this.formB.group({
      id_noticia: new FormControl(),
      titulo: new FormControl("", Validators.compose([
        Validators.required,
      ])),
      descripcion: new FormControl("", Validators.compose([
        Validators.required,
      ])),
      imagen: new FormControl("", Validators.compose([
        Validators.required,
      ]))
    });
  }

  ngOnInit(): void {
    this.getNews();
    document.getElementById('uno').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
    document.getElementById('unos').style.display = 'none';
    document.getElementById('tres').style.display = 'none';
    document.getElementById('cuatro').style.display = 'none';
    document.getElementById('cuatros').style.display = 'none';
  }

  getNew(id_noticia) {
    this.citasApiS.busqueda(`/news/${id_noticia}`).subscribe((res: any) => {
      res.imagen = '';
      this.new = res;
      console.log(this.new);
      err =>{
        console.log(err);
      }
    });
  }

  getNews() {
    this.citasApiS.consulta('/news').subscribe((res: any) => {
      this.news = res;
      err =>{
        console.log(err);
      }
    });
  }

  search(){
    if (!this.busqueda){
      this.getNews();
    }else {
      this.news = [];
      this.citasApiS.consulta('/news').subscribe((res: any) => {
        for (const news of res){
          if (news.id_noticia == this.busqueda || news.titulo == this.busqueda){
            this.news.push(news);
          }
        };
        if (this.news.length <= 0){
          document.getElementById('dos').style.display = 'block';
          setTimeout(() => document.getElementById('dos').style.display = 'none', 3000);
        };
        err =>{
          console.log(err);
        }
      });
    }
  }

  newRegister(values){
    if (!this.newsForm.valid){
      document.getElementById('cuatro').style.display = 'block';
      setTimeout(() => document.getElementById('cuatro').style.display = 'none', 3000);
      document.getElementById('cuatros').style.display = 'block';
      setTimeout(() => document.getElementById('cuatros').style.display = 'none', 3000);
    }else {
      if(this.new.id_noticia == null || this.new.id_noticia == undefined){
        this.new.id_noticia = 0;
      }else {
        this.new = values;
      }
      this.new.imagen = this.imagen[0].name;
      console.log(values);
      this.citasApiS.alta('/news', this.new).then((res: any) => {
        console.log(this.new);
        this.newsForm.reset();
      }).catch((error) => {
        console.log(error);
      });
      const formD = new FormData();
      this.imagen.forEach(archivo => {
        formD.append('imagen', archivo);
      });
      this.citasApiS.upload('/upload', formD).subscribe((res: any) => {
        console.log(res);
      });
      document.getElementById('uno').style.display = 'block';
      setTimeout(() => document.getElementById('uno').style.display = 'none', 3000);
      document.getElementById('unos').style.display = 'block';
      setTimeout(() => document.getElementById('unos').style.display = 'none', 3000);
    }
  }

  deleteNews(id){
    this.citasApiS.delete(`/news/${id}`).subscribe((data: any) => {
      console.log(data);
      this.getNews();
      document.getElementById('tres').style.display = 'block';
      setTimeout(() => document.getElementById('tres').style.display = 'none', 3000);
      err => {
        console.log(err);
      }
    });
  }

  upload(event): any {
    this.imagenUpload = event.target.files[0];
    this.extraerBase64(this.imagenUpload).then((imagen: any) =>{
      this.preview = imagen.base;
    });
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

  cancel(){
    this.newsForm.reset();
  }
}
