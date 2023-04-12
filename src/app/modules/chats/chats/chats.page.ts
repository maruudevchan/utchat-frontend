import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatsService } from 'src/app/services/chats.service';
import { ContactsService } from 'src/app/services/contacts.service';
import { UsertoolsService } from 'src/app/services/usertools.service';


interface User {
  id: number;
  nombre: string;
  isOnline: boolean;
}

interface userRes{
  ok: boolean;
  data: User[];
}

interface chat {
  id: number;
  user1: number;
  user2: number;
}

interface ResponseData {
  ok: boolean;
  data: {
    users: User[],
    chats: chat[]
  }
}

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  chatId:number=0;
  data: ResponseData[] = [];
  chats: chat[] = [];
  users: User[] = [];
  usuariosConChats=[];
  usuarioSeleccionado: any;
  constructor(
    private _usertoolsService: UsertoolsService,
    private _contactsService: ContactsService,
    private _chatService: ChatsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getChatsfromUser()
  }

  getChatsfromUser() {
    const current = localStorage.getItem('id');
    if (current !== null) {
      const id = parseInt(current, 10);
      this._contactsService.getChatsByUID(id).subscribe(
        (res: ResponseData) => {
          if (res && res.ok && res.data && res.data.chats) {
            // Asignar el array de chats a la variable chats en el componente
            this.chats= res.data.chats;
            this.users = res.data.users;
            console.log(this.users);
            console.log(this.chats);

          }}
      );
    }
  }

  openChat(usuario:any) {
    this._usertoolsService.setUsuario(usuario);
    const queryUser = this.chats.filter((user) => user.id === usuario.id);
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
