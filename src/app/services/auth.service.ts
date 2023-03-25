import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import user from '../models/user.model';



const API_URL = environment.apiUrlLocal;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { }

  //metodo para iniciar sesión
  login(user:user){
    return this.http.post(`${API_URL}login`, user, httpOptions);
  }

  //metodo para registrar usuario
  register(user:user){
    return this.http.post(`${API_URL}register`, user, httpOptions);
  }

  setOnline(any:any){
    return this.http.post(`${API_URL}setOnline`,any, httpOptions);
  }

  setOffline(any:any){
    return this.http.post(`${API_URL}setOffline`,any, httpOptions);
  }

}
