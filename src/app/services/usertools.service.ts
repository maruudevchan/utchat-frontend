import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsertoolsService {
  private USUARIO_KEY = 'usuario';
  usuarioSeleccionado: any;

  constructor() { }

  setUsuario(usuario: any) {
    this.usuarioSeleccionado = usuario;
    localStorage.setItem(this.USUARIO_KEY, JSON.stringify(usuario));
  }

  getUsuario() {
    const usuario = localStorage.getItem(this.USUARIO_KEY);
    return usuario ? JSON.parse(usuario) : null;
  }

}
