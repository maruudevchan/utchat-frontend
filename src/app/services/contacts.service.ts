import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrlLocal;
const current = localStorage.getItem('id');
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

}

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private http: HttpClient
  ) { }

  getUOnline(current: number): Observable<any> {
    return this.http.get(`${API_URL}getOnlineUsers/${current}`, httpOptions);
  }

  getChatsByUID(id: number): Observable<any> {
    return this.http.get(`${API_URL}findMyChats/${id}`, httpOptions);
  }

}
