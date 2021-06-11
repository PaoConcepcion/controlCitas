import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitasApiService {

  private API_URL = environment.API_URL;

  constructor(private httpClient: HttpClient) {}

  busqueda(params: string) {
    return this.httpClient.get(this.API_URL + params);
  }

  consulta(params: string) {
    return this.httpClient.get(this.API_URL + params);
  }

  delete(params: string) {
    return this.httpClient.delete(this.API_URL + params);
  }

  cambio(params: string, body: any) {
    return this.httpClient.put(this.API_URL + params, body);
  }

  alta(params: string, body: any) {
    return this.httpClient.post(this.API_URL + params, body).toPromise();
  }

  upload(params: string, imagen) {
    return this.httpClient.post(this.API_URL + params, imagen);
  }
}
