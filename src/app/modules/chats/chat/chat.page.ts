import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { io, Socket } from 'socket.io-client';
import { ChatsService } from 'src/app/services/chats.service';
import { UsertoolsService } from 'src/app/services/usertools.service';

const socket = io("http://localhost:3001", { transports: ['polling'] });

interface messages {
  id: number;
  idChat: number;
  sender: number;
  message: string;
}

interface messageRes {
  ok: boolean;
  messages: messages[];
}


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  usuarioSeleccionado: any;

  message: messages[] = [];
  messajeText = '';

  chatId = Number(localStorage.getItem('chatId'));
  sender = Number(localStorage.getItem('id'));
  receiver = Number(localStorage.getItem('id2'));

  @ViewChild('content') private content!: IonContent;

  constructor(
    private _chatService: ChatsService,
    private _userTools: UsertoolsService,
    private router: Router
  ) { }

  ngOnInit() {
    socket.emit('join-room', this.chatId);

    socket.on('new-message', (data) => {
      console.log('hola')
      this.message = data;
    })

    this.usuarioSeleccionado = this._userTools.getUsuario();
    this.bringMessages(this.chatId);
  }

  bringMessages(chatId: any) {
    // socket.on('new-message', chatId);
    this._chatService.findMessages(this.chatId).subscribe(
      (res: messageRes) => {
        this.message = res.messages;
        console.log(this.message)
      })


  }


  ionViewDidEnter() {
    this.content.scrollToBottom(0);
  }

  async sendMessage() {
    const message = {
      idchat: this.chatId,
      sender: this.sender,
      message: this.messajeText
    }
    try {
      const res = await this._chatService.sendMessage(message).toPromise();
      socket.emit('new-message', message);
      this.bringMessages(this.chatId);
      setTimeout(() => {
        this.content.scrollToBottom(5);
      }, 40);
      this.messajeText = '';
    } catch (error) {
      console.error(error);
    }
  }


  scrollToBottom() {
    this.content.scrollToBottom(1);
  }

  goBack() {
    localStorage.removeItem('id2');
    localStorage.removeItem('chatId');
    localStorage.removeItem('usuario');
  }

}
