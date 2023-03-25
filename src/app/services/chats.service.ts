import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrlLocal;


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })

}

@Injectable({
  providedIn: 'root'
})

export class ChatsService {

  constructor(
    private http:HttpClient
  ) { }

  findChat(id1: number, id2: number): Observable<any> {
    return this.http.get(`${API_URL}findChat/${id1}/${id2}`, httpOptions);
  }

  findMessages(id: number): Observable<any> {
    return this.http.get(`${API_URL}findMessages/${id}`);
  }

  sendMessage(message: any): Observable<any> {
    return this.http.post(`${API_URL}sendMessage`,message, httpOptions);
  }
}
