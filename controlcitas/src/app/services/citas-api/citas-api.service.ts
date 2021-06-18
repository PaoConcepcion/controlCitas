import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CitasApiService {

  private API_URL = environment.API_URL;

  constructor(private authSvc: AuthService, private httpClient: HttpClient) {}

  getToken(){
    const elUser = this.authSvc.userValue;
    if (elUser) {
      return elUser.token;
    }
    return "No User";
  }

  busqueda(params: string) {
    return this.httpClient.get(this.API_URL + params, {
      headers: new HttpHeaders().set(
       'user_token',
        this.getToken()
      ),
    });
  }

  consulta(params: string) {
    return this.httpClient.get(this.API_URL + params, {
      headers: new HttpHeaders().set(
       'user_token',
        this.getToken()
      ),
    });
  }

  delete(params: string) {
    return this.httpClient.delete(this.API_URL + params, {
      headers: new HttpHeaders().set(
       'user_token',
        this.getToken()
      ),
    });
  }

  cambio(params: string, body: any) {
    return this.httpClient.put(this.API_URL + params, body, {
      headers: new HttpHeaders().set(
       'user_token',
        this.getToken()
      ),
    });
  }

  alta(params: string, body: any) {
    return this.httpClient.post(this.API_URL + params, body, {
      headers: new HttpHeaders().set(
       'user_token',
        this.getToken()
      ),
    }).toPromise();
  }

  upload(params: string, imagen) {
    return this.httpClient.post(this.API_URL + params, imagen, {
      headers: new HttpHeaders().set(
       'user_token',
        this.getToken()
      ),
    });
  }
}
