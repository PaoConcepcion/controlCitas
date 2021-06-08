import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CitasApiService } from './../../services/citas-api/citas-api.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  id: number;
  imagen: any = [];
  preview: string;
  imagenUpload: null; 

  validation_messages = {
    titulo: [
      { type: "required", message: "se requiere de un titulo"},
      { type: "maxLenght", message: "longitud maxima de 40"}
    ],
    descripcion: [
      { type: "required", message: "se requiere de una descripcion"},
    ],
    imagen: [
      { type: "required", message: "imagen no insertada"},
    ],
  }

  constructor(private formB: FormBuilder, private citasApiS: CitasApiService,
    private sanitizer: DomSanitizer) { 
    this.newsForm = this.formB.group({
      id_noticia: new FormControl(),
      titulo: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(40),
      ])),
      descripcion: new FormControl("", Validators.compose([
        Validators.required,
      ])),
      imagen: new FormControl("", Validators.compose([
        Validators.required,
      ]))
    })
  }

  ngOnInit(): void {
    this.getNews();
  }

  getNew(id_noticia){
    this.citasApiS.busqueda(`/news/${id_noticia}`).subscribe((res: any) => {
      this.new = res;
      console.log(this.new)
      err =>{
        console.log(err);
      }
    });
    this.id = id_noticia
  }

  getNews(){
    this.citasApiS.consulta('/news').subscribe((res: any) => {
      this.news = res;
      err =>{
        console.log(err);
      }
    });
  }

  newRegister(values){
    if(this.id == null){
      this.id = 0;
    } else {
      this.id = this.new.id_noticia;
    }
    this.new = values;
    this.new.id_noticia = this.id;
    this.new.imagen = this.imagen[0].name
    this.citasApiS.alta('/news', this.new).then((res: any) => {
      this.getNews();
      console.log(values, res);
    }).catch((error) => {
      console.log(error);
    });
    const formD = new FormData();
    this.imagen.forEach(archivo => {
      formD.append('imagen', archivo)
    })
    this.citasApiS.upload('/upload', formD).subscribe((res: any) => {
      console.log(res)
    });
    this.id = null;
  }

  deleteNews(id){
    this.citasApiS.delete(`/news/${id}`).subscribe((data: any) => {
      console.log(data);
      this.getNews();
      err => {
        console.log(err)
      }
    });
  }

  upload(event): any {
    this.imagenUpload = event.target.files[0];
    this.extraerBase64(this.imagenUpload).then((imagen: any) =>{
      this.preview = imagen.base;
    })
    this.imagen.push(this.imagenUpload);
  };

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

    }catch (e) {
      return null;
    }
  });

}
