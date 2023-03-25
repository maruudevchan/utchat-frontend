import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsertoolsService } from 'src/app/services/usertools.service';
import { ContactsService } from 'src/app/services/contacts.service';
import { ChatsService } from 'src/app/services/chats.service';
//interfaces necesarias para contactos


interface User {
  id: number;
  nombre: string;
  isOnline: boolean;
}

interface userRes{
  ok: boolean;
  data: User[];
}


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  chatId:number=0;
  data: User[] = [];
  usuarios: User[] = [];

  usuarioSeleccionado: any;


  constructor(
    private _usertoolsService: UsertoolsService,
    private _contactsService: ContactsService,
    private _chatService: ChatsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getOnlineUsers()
  }

  getOnlineUsers() {
    const current = localStorage.getItem('id');
    if (current !== null) {
      const id = parseInt(current, 10);
      this._contactsService.getUOnline(id).subscribe(
        (res: userRes) => {
          this.usuarios = res.data
          console.log(this.usuarios);
        }
      );
    }
  }

  openChat(usuario:any) {
    this._usertoolsService.setUsuario(usuario);
    const queryUser = this.usuarios.filter((user) => user.id === usuario.id);
    this.usuarioSeleccionado = queryUser[0];
    this._chatService.findChat(this.usuarioSeleccionado.id, Number(localStorage.getItem('id'))).subscribe(
      (res: any) => {
        const chat = res;
        this.chatId = chat.cid;
        localStorage.setItem('chatId', this.chatId.toString());
        this.router.navigate(['/chat', this.chatId]);
      }
    );
  }
}
